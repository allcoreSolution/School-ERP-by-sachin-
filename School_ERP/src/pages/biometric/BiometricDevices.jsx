import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Fingerprint, BookOpen, Terminal, CheckCircle, Video, Plus,
  Search, Monitor, Cloud, Camera, Cpu, Settings, Trash2, UserPlus,
  ArrowLeft, Check, AlertTriangle, PlayCircle, ClipboardList, LogIn,
  LogOut, Server, Filter as FilterIcon, RefreshCcw, FileDown,
  Eye, UserCheck, UserX, ShieldAlert, List, Shield, Info
} from 'lucide-react';

import { hardwareService } from '../../api/hardwareService';

export default function BiometricDevices() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAddDevice = location.pathname.includes('/add-device');
  
  let activeTab = 'All Devices';
  if (location.pathname.includes('/attendance-logs')) {
    activeTab = 'Attendance Logs';
  } else if (location.pathname.includes('/live-log')) {
    activeTab = 'Live Log';
  } else if (location.pathname.includes('/face-monitoring')) {
    activeTab = 'Face Monitoring';
  } else if (location.pathname.includes('/review-queue')) {
    activeTab = 'Review Queue';
  } else if (location.pathname.includes('/agent-logs')) {
    activeTab = 'Agent Logs';
  }
  const [integrationMode, setIntegrationMode] = useState('agent'); // agent, cloud, camera
  
  const [devices, setDevices] = useState([]);
  const [attendanceLogs, setAttendanceLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [devicesRes, logsRes] = await Promise.all([
          hardwareService.getDevices(),
          hardwareService.getAttendanceLogs()
        ]);
        if(devicesRes.data) setDevices(devicesRes.data);
        if(logsRes.data) setAttendanceLogs(logsRes.data);
      } catch (err) {
        console.error("Failed to load hardware data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Add Device View
  if (isAddDevice) {
    return (
      <div className="min-h-screen bg-slate-50 font-sans pb-20">
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-800">Add New Device</h1>
            <p className="text-sm text-slate-500 font-medium mt-0.5">
              Select an integration mode and configure your device
            </p>
          </div>
          <button 
            onClick={() => navigate('/biometric/all-devices')}
            className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-bold rounded-none flex items-center gap-2 cursor-pointer shadow-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Devices
          </button>
        </div>

        <div className="p-6 max-w-6xl mx-auto space-y-6">
          {/* Step 1 */}
          <div>
            <h2 className="text-sm font-black text-indigo-900 mb-3 flex items-center gap-2">
              <span className="text-indigo-600">1</span> Choose Integration Mode
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div 
                onClick={() => setIntegrationMode('agent')}
                className={`p-5 rounded-none border-2 cursor-pointer text-center relative transition-colors ${integrationMode === 'agent' ? 'border-indigo-500 bg-indigo-50/30' : 'border-slate-200 bg-white hover:border-indigo-200'}`}
              >
                <Monitor className={`w-6 h-6 mx-auto mb-2 ${integrationMode === 'agent' ? 'text-indigo-600' : 'text-slate-400'}`} />
                <h3 className={`font-bold mb-1 ${integrationMode === 'agent' ? 'text-indigo-900' : 'text-slate-700'}`}>Local Agent Sync</h3>
                <p className="text-[11px] font-medium text-slate-500 leading-tight">For legacy devices on your local network. Requires the Windows Sync Agent running on a local PC.</p>
                {integrationMode === 'agent' && <div className="absolute top-3 right-3 w-4 h-4 bg-indigo-600 rounded-none flex items-center justify-center"><Check className="w-3 h-3 text-white" /></div>}
              </div>

              <div 
                onClick={() => setIntegrationMode('cloud')}
                className={`p-5 rounded-none border-2 cursor-pointer text-center relative transition-colors ${integrationMode === 'cloud' ? 'border-emerald-500 bg-emerald-50/30' : 'border-slate-200 bg-white hover:border-emerald-200'}`}
              >
                <Cloud className={`w-6 h-6 mx-auto mb-2 ${integrationMode === 'cloud' ? 'text-emerald-600' : 'text-slate-400'}`} />
                <h3 className={`font-bold mb-1 ${integrationMode === 'cloud' ? 'text-emerald-900' : 'text-slate-700'}`}>Cloud Push (ADMS / Webhook)</h3>
                <p className="text-[11px] font-medium text-slate-500 leading-tight">Device connects straight to our cloud — zero local software. ZKTeco/eSSL/Realtime use ADMS; TimeWatch & others use a JSON webhook. Pick your brand next.</p>
                {integrationMode === 'cloud' && <div className="absolute top-3 right-3 w-4 h-4 bg-emerald-600 rounded-none flex items-center justify-center"><Check className="w-3 h-3 text-white" /></div>}
              </div>

              <div 
                onClick={() => setIntegrationMode('camera')}
                className={`p-5 rounded-none border-2 cursor-pointer text-center relative transition-colors ${integrationMode === 'camera' ? 'border-purple-500 bg-purple-50/30' : 'border-slate-200 bg-white hover:border-purple-200'}`}
              >
                <Video className={`w-6 h-6 mx-auto mb-2 ${integrationMode === 'camera' ? 'text-purple-600' : 'text-slate-400'}`} />
                <h3 className={`font-bold mb-1 ${integrationMode === 'camera' ? 'text-purple-900' : 'text-slate-700'}`}>AI IP Camera</h3>
                <p className="text-[11px] font-medium text-slate-500 leading-tight">For AI face-recognition cameras. Pushes an RTMP video stream directly to the platform for instant AI logging.</p>
                {integrationMode === 'camera' && <div className="absolute top-3 right-3 w-4 h-4 bg-purple-600 rounded-none flex items-center justify-center"><Check className="w-3 h-3 text-white" /></div>}
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div>
            <h2 className="text-sm font-black text-indigo-900 mb-3 flex items-center gap-2">
              <span className="text-indigo-600">2</span> Device Configuration
            </h2>
            <div className="bg-white border border-slate-200 rounded-none p-6 shadow-3xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Device Name <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="e.g. Main Gate Entrance" className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm font-semibold focus:outline-none focus:border-indigo-600" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Serial Number</label>
                  <input type="text" placeholder="e.g. ABCD123456789" className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm font-semibold focus:outline-none focus:border-indigo-600" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">IP Address <span className="text-red-500">*</span></label>
                  <input type="text" defaultValue="192.168.1.201" className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm font-semibold focus:outline-none focus:border-indigo-600" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Port <span className="text-red-500">*</span></label>
                  <input type="text" defaultValue="4370" className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm font-semibold focus:outline-none focus:border-indigo-600" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Attendance Direction</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm font-semibold focus:outline-none focus:border-indigo-600 bg-white">
                    <option>Auto (Depends on device status key)</option>
                    <option>In</option>
                    <option>Out</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Status</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm font-semibold focus:outline-none focus:border-indigo-600 bg-white">
                    <option>Active (Processing Logs)</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-none flex items-center gap-2 font-bold text-sm shadow-sm transition-colors border-none cursor-pointer">
                  Save Device
                </button>
                <button 
                  onClick={() => navigate('/biometric/all-devices')}
                  className="px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-none font-bold text-sm shadow-sm transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard View
  const tabs = ['All Devices', 'Attendance Logs', 'Live Log', 'Face Monitoring', 'Review Queue', '>_ Agent Logs'];

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-6 py-4 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Fingerprint className="w-6 h-6 text-indigo-600" />
              <h1 className="text-xl font-bold text-slate-800">Biometric Devices</h1>
            </div>
            <p className="text-sm text-slate-500 font-medium mt-0.5">
              Fingerprint, face and IP-camera hardware — connect, sync and monitor it from one place.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            {activeTab === 'Live Log' && (
              <div className="px-3 py-1.5 bg-emerald-500 text-white text-[11px] font-bold rounded-none flex items-center gap-1.5 shadow-sm">
                <div className="w-1.5 h-1.5 rounded-none bg-white animate-pulse" />
                Live — Auto-refreshing every 10s
              </div>
            )}
            
            <button className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-bold rounded-none flex items-center gap-2 shadow-sm cursor-pointer transition-colors">
              <BookOpen className="w-4 h-4" /> Integration Guide
            </button>
            <button className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-bold rounded-none flex items-center gap-2 shadow-sm cursor-pointer transition-colors">
              <Terminal className="w-4 h-4" /> API Playground
            </button>
            <button className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-bold rounded-none flex items-center gap-2 shadow-sm cursor-pointer transition-colors">
              <CheckCircle className="w-4 h-4" /> Recognition Readiness
            </button>
            <button className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-bold rounded-none flex items-center gap-2 shadow-sm cursor-pointer transition-colors">
              <Video className="w-4 h-4" /> Camera Wall
            </button>
            <button 
              onClick={() => navigate('/biometric/add-device')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-none flex items-center gap-2 shadow-sm cursor-pointer border-none transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Device
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 flex items-center gap-6 overflow-x-auto border-t border-slate-100">
          {tabs.map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-1 text-sm font-bold whitespace-nowrap transition-colors relative cursor-pointer border-none bg-transparent ${
                activeTab === tab ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab === 'All Devices' && <Monitor className="w-4 h-4 inline-block mr-1.5 -mt-0.5" />}
              {tab}
              {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-t-full" />}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 max-w-[1400px] mx-auto space-y-4">
        
        {activeTab === 'All Devices' && (
          <>
            {/* Banner */}
            <div className="bg-white border border-slate-200 rounded-none p-4 shadow-3xs">
              <div className="flex items-center gap-2 mb-3">
                <Cpu className="w-5 h-5 text-indigo-600" />
                <h2 className="text-slate-800 font-bold text-sm">Unified Hardware Ecosystem</h2>
              </div>
              <p className="text-xs text-slate-500 font-medium mb-3">Three ways to connect — tap a mode to learn how it works.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-slate-200 rounded-none p-3 flex items-start gap-3 cursor-pointer hover:border-indigo-300 hover:bg-slate-50 transition-colors">
                  <Monitor className="w-5 h-5 text-indigo-500 shrink-0" />
                  <div>
                    <div className="font-bold text-slate-800 text-sm">Agent Sync</div>
                    <div className="text-[10px] font-medium text-slate-400">LAN devices & full remote control</div>
                  </div>
                </div>
                <div className="border border-slate-200 rounded-none p-3 flex items-start gap-3 cursor-pointer hover:border-emerald-300 hover:bg-emerald-50 transition-colors">
                  <Cloud className="w-5 h-5 text-emerald-500 shrink-0" />
                  <div>
                    <div className="font-bold text-emerald-900 text-sm">Cloud Push</div>
                    <div className="text-[10px] font-medium text-emerald-600/70">ADMS (iclock) & JSON webhook — no software</div>
                  </div>
                </div>
                <div className="border border-slate-200 rounded-none p-3 flex items-start gap-3 cursor-pointer hover:border-purple-300 hover:bg-purple-50 transition-colors">
                  <Video className="w-5 h-5 text-purple-500 shrink-0" />
                  <div>
                    <div className="font-bold text-purple-900 text-sm">IP Cameras</div>
                    <div className="text-[10px] font-medium text-purple-600/70">RTSP feeds & AI recognition</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Search & Filters */}
            <div className="bg-white border border-slate-200 rounded-none p-3 shadow-3xs flex flex-wrap items-center justify-between gap-4">
              <div className="relative w-full max-w-xs">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search by name, IP, or SN..."
                  className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-none text-sm font-medium focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1 rounded-none border border-slate-200">
                <button className="px-4 py-1.5 bg-indigo-600 text-white text-[11px] font-bold rounded-none border-none shadow-sm flex items-center gap-1.5">
                  All <span className="bg-indigo-500 px-1.5 rounded-none text-[9px]">{devices.length}</span>
                </button>
                <button className="px-4 py-1.5 text-slate-600 hover:text-slate-800 text-[11px] font-bold rounded-none border-none bg-transparent flex items-center gap-1.5 cursor-pointer">
                  <Monitor className="w-3.5 h-3.5" /> Agent <span className="bg-slate-200 text-slate-500 px-1.5 rounded-none text-[9px]">0</span>
                </button>
                <button className="px-4 py-1.5 text-slate-600 hover:text-slate-800 text-[11px] font-bold rounded-none border-none bg-transparent flex items-center gap-1.5 cursor-pointer">
                  <Cloud className="w-3.5 h-3.5" /> Push <span className="bg-slate-200 text-slate-500 px-1.5 rounded-none text-[9px]">0</span>
                </button>
                <button className="px-4 py-1.5 text-slate-600 hover:text-slate-800 text-[11px] font-bold rounded-none border-none bg-transparent flex items-center gap-1.5 cursor-pointer">
                  <Camera className="w-3.5 h-3.5" /> Cameras <span className="bg-slate-200 text-slate-500 px-1.5 rounded-none text-[9px]">0</span>
                </button>
              </div>
              
              <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1 rounded-none border border-slate-200">
                <button className="px-4 py-1.5 bg-indigo-600 text-white text-[11px] font-bold rounded-none border-none shadow-sm">
                  Any Status
                </button>
                <button className="px-4 py-1.5 text-emerald-600 hover:bg-emerald-50 text-[11px] font-bold rounded-none border-none bg-transparent flex items-center gap-1.5 cursor-pointer transition-colors">
                  <div className="w-1.5 h-1.5 rounded-none bg-emerald-500" /> Online
                </button>
                <button className="px-4 py-1.5 text-slate-500 hover:bg-slate-200 text-[11px] font-bold rounded-none border-none bg-transparent flex items-center gap-1.5 cursor-pointer transition-colors">
                  <div className="w-1.5 h-1.5 rounded-none bg-slate-400" /> Offline
                </button>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {loading ? (
                <div className="col-span-full py-16 text-center text-slate-500 font-medium">Loading devices...</div>
              ) : devices.length === 0 ? (
                <div className="col-span-full py-16 text-center text-slate-500 font-medium">No devices connected.</div>
              ) : devices.map((device) => {
                const Icon = device.typeIcon;
                
                // Color logic based on type
                let typeColor = 'text-indigo-500';
                let typeText = 'text-indigo-600';
                if (device.type === 'Cloud Push') {
                  typeColor = 'text-emerald-500';
                  typeText = 'text-emerald-600';
                } else if (device.type === 'IP Camera AI') {
                  typeColor = 'text-purple-500';
                  typeText = 'text-purple-600';
                }

                return (
                  <div key={device.id} className="bg-white border border-slate-200 rounded-none p-4 flex flex-col shadow-3xs hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex flex-col gap-1.5">
                        <Icon className={`w-5 h-5 ${typeColor}`} />
                        <h3 className="font-bold text-slate-800 leading-tight">{device.name}</h3>
                      </div>
                      <span className={`text-[10px] font-bold ${typeText}`}>{device.type}</span>
                    </div>
                    
                    <div className="space-y-1 mb-4">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <span className="w-4 h-4 flex items-center justify-center shrink-0">IP</span>
                        {device.ip}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <span className="w-4 h-4 flex items-center justify-center shrink-0">SN</span>
                        {device.sn}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-500 uppercase tracking-wider">
                        ACTIVE
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        <div className="w-1.5 h-1.5 rounded-none bg-slate-300" /> Offline
                      </div>
                    </div>

                    {device.agentStatus && (
                      <div className="mb-2 flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-none text-[10px] font-bold text-white ${device.agentStatus === 'Agent silent' ? 'bg-red-500' : 'bg-slate-500'}`}>
                          {device.agentStatus}
                        </span>
                      </div>
                    )}

                    {device.warning && (
                      <div className="mb-3 text-[10px] font-medium text-slate-500 leading-tight flex items-start gap-1">
                        <AlertTriangle className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
                        {device.warning}
                      </div>
                    )}

                    {!device.warning && device.lastSync && (
                      <div className="mb-3 text-[10px] font-medium text-slate-400 flex items-center gap-1">
                        <PlayCircle className="w-3 h-3" /> Last sync {device.lastSync}
                      </div>
                    )}

                    <div className="mt-auto flex items-center gap-2 pt-2 border-t border-slate-100">
                      <button className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-none text-[11px] font-bold shadow-sm flex items-center justify-center gap-1.5 transition-colors border-none cursor-pointer">
                        <Settings className="w-3.5 h-3.5" /> Control Panel
                      </button>
                      <button className="p-2 border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-none bg-white cursor-pointer transition-colors">
                        <UserPlus className="w-4 h-4" />
                      </button>
                      <button className="p-2 border border-slate-200 text-slate-400 hover:text-red-600 hover:bg-red-50 hover:border-red-200 rounded-none bg-white cursor-pointer transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </>
        )}

        {activeTab === 'Attendance Logs' && (
          <div className="space-y-4">
            
            {/* Metric Cards Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white border border-slate-200 rounded-none p-4 flex items-center gap-3 shadow-3xs">
                <div className="w-8 h-8 rounded-none bg-purple-50 flex items-center justify-center text-purple-500 shrink-0">
                  <ClipboardList className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-lg font-black text-slate-800 leading-tight">0</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Punches</div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-none p-4 flex items-center gap-3 shadow-3xs">
                <div className="w-8 h-8 rounded-none bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
                  <LogIn className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-lg font-black text-slate-800 leading-tight">0</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Check-ins</div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-none p-4 flex items-center gap-3 shadow-3xs opacity-60">
                <div className="w-8 h-8 rounded-none bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
                  <LogOut className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-lg font-black text-slate-800 leading-tight">0</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Check-outs</div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-none p-4 flex items-center gap-3 shadow-3xs">
                <div className="w-8 h-8 rounded-none bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                  <Server className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-lg font-black text-slate-800 leading-tight">0</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Devices Reporting</div>
                </div>
              </div>
            </div>

            {/* Filter Section */}
            <div className="bg-white border border-slate-200 rounded-none shadow-3xs">
              <div className="flex items-center gap-2 p-3 border-b border-slate-100 text-indigo-900 font-bold text-sm bg-slate-50/50">
                <FilterIcon className="w-4 h-4 text-indigo-500" /> Filters
              </div>
              <div className="p-4 flex flex-wrap items-end gap-4">
                <div className="flex-[1.5] min-w-[200px] space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Device</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm font-semibold focus:outline-none focus:border-indigo-600 bg-white">
                    <option value="">-- All Devices --</option>
                    {devices.map(dev => (
                      <option key={dev._id} value={dev.deviceName}>{dev.deviceName}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1 min-w-[150px] space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">From</label>
                  <input type="date" className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm font-semibold focus:outline-none focus:border-indigo-600 bg-white" />
                </div>
                <div className="flex-1 min-w-[150px] space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">To</label>
                  <input type="date" className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm font-semibold focus:outline-none focus:border-indigo-600 bg-white" />
                </div>
                <div className="flex-1 min-w-[120px] space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Direction</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm font-semibold focus:outline-none focus:border-indigo-600 bg-white">
                    <option>All</option>
                    <option>Check-IN</option>
                    <option>Check-OUT</option>
                  </select>
                </div>
                <div className="flex-[2] min-w-[200px] space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Search</label>
                  <input type="text" placeholder="Name or device user ID..." className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm font-semibold focus:outline-none focus:border-indigo-600 bg-white" />
                </div>
              </div>
              <div className="p-3 bg-slate-50/50 border-t border-slate-100 flex items-center justify-end gap-3">
                <button className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-none flex items-center gap-2 cursor-pointer shadow-sm font-bold text-sm">
                  <RefreshCcw className="w-4 h-4" /> Reset
                </button>
                <button className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-none flex items-center gap-2 cursor-pointer border-none shadow-sm font-bold text-sm">
                  <Search className="w-4 h-4" /> Apply
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white border border-slate-200 rounded-none overflow-hidden shadow-3xs">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
                  <ClipboardList className="w-4 h-4 text-indigo-600" /> Attendance Records
                </div>
                <div className="text-[10px] font-medium text-slate-400">Raw punches straight off the devices — full history</div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[900px]">
                  <thead>
                    <tr className="bg-indigo-50/50 border-b border-slate-100 text-[10px] font-black text-indigo-600 uppercase tracking-wider">
                      <th className="py-3 px-4 border-r border-slate-100 w-[20%]">TIME</th>
                      <th className="py-3 px-4 border-r border-slate-100 w-[30%]">PERSON</th>
                      <th className="py-3 px-4 border-r border-slate-100">DEVICE</th>
                      <th className="py-3 px-4 border-r border-slate-100">DIRECTION</th>
                      <th className="py-3 px-4 border-r border-slate-100">METHOD</th>
                      <th className="py-3 px-4">PROCESSED</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                    {loading ? (
                      <tr><td colSpan="6" className="py-8 text-center text-slate-500 font-medium">Loading records...</td></tr>
                    ) : attendanceLogs.length === 0 ? (
                      <tr><td colSpan="6" className="py-8 text-center text-slate-500 font-medium">No attendance records</td></tr>
                    ) : attendanceLogs.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50/50">
                        <td className="py-3.5 px-4 border-r border-slate-100 text-slate-600">{row.time}</td>
                        <td className="py-3.5 px-4 border-r border-slate-100">
                          {row.person.unmapped ? (
                            <div className="flex items-center gap-2">
                              <span className="px-1.5 py-0.5 rounded-none bg-slate-500 text-white text-[10px] font-bold">{row.person.id}</span>
                              <span className="text-slate-400">{row.person.name}</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="text-slate-800 font-bold">{row.person.name}</span>
                              <span className="px-1.5 py-0.5 rounded-none bg-emerald-50 text-emerald-600 text-[9px] font-bold uppercase tracking-wider">{row.person.role}</span>
                              <span className="text-slate-400 text-[10px]">{row.person.extraId}</span>
                              <span className="px-1.5 py-0.5 border border-slate-200 bg-slate-50 text-slate-600 font-mono text-[10px] rounded">{row.person.id}</span>
                            </div>
                          )}
                        </td>
                        <td className="py-3.5 px-4 border-r border-slate-100 text-slate-600">{row.device}</td>
                        <td className="py-3.5 px-4 border-r border-slate-100">
                          <span className="px-2 py-0.5 rounded-none bg-emerald-500 text-white text-[10px] font-bold uppercase">{row.direction}</span>
                        </td>
                        <td className="py-3.5 px-4 border-r border-slate-100">
                          <div className="flex items-center gap-1.5 text-blue-500 text-[11px] font-bold">
                            <Fingerprint className="w-3 h-3" /> {row.method}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded-none bg-emerald-500 text-white text-[10px] font-bold">
                            {row.processed}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Live Log' && (
          <div className="space-y-4">
            
            {/* Colored Metric Cards Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#007bff] rounded-none p-5 flex flex-col items-center justify-center text-white shadow-sm">
                <div className="text-3xl font-black mb-1 leading-none">0</div>
                <div className="text-[11px] font-bold uppercase tracking-wide">Total Punches</div>
              </div>
              <div className="bg-[#28a745] rounded-none p-5 flex flex-col items-center justify-center text-white shadow-sm">
                <div className="text-3xl font-black mb-1 leading-none">0</div>
                <div className="text-[11px] font-bold uppercase tracking-wide">Check-ins</div>
              </div>
              <div className="bg-[#fd7e14] rounded-none p-5 flex flex-col items-center justify-center text-white shadow-sm">
                <div className="text-3xl font-black mb-1 leading-none">0</div>
                <div className="text-[11px] font-bold uppercase tracking-wide">Check-Outs</div>
              </div>
              <div className="bg-[#17a2b8] rounded-none p-5 flex flex-col items-center justify-center text-white shadow-sm">
                <div className="text-3xl font-black mb-1 leading-none">0</div>
                <div className="text-[11px] font-bold uppercase tracking-wide">Biometric Punches</div>
              </div>
            </div>

            {/* Filter Section */}
            <div className="bg-white border border-slate-200 rounded-none shadow-3xs">
              <div className="flex items-center gap-2 p-3 border-b border-slate-100 text-[#007bff] font-bold text-sm bg-slate-50/50">
                <FilterIcon className="w-4 h-4" /> Filters
              </div>
              
              <div className="p-4 flex flex-wrap items-end gap-3">
                <div className="flex-1 min-w-[140px]">
                  <label className="text-[11px] font-bold text-slate-600 flex items-center gap-1.5 mb-1.5">
                    <Monitor className="w-3.5 h-3.5" /> Date
                  </label>
                  <input type="date" defaultValue="2026-08-23" className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm font-medium focus:outline-none focus:border-[#007bff] bg-white" />
                </div>
                
                <div className="flex-1 min-w-[140px]">
                  <label className="text-[11px] font-bold text-slate-600 flex items-center gap-1.5 mb-1.5">
                    <UserPlus className="w-3.5 h-3.5" /> User Type
                  </label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm font-medium focus:outline-none focus:border-[#007bff] bg-white">
                    <option>All Users</option>
                    <option>Students</option>
                    <option>Staff</option>
                  </select>
                </div>
                
                <div className="flex-[1.5] min-w-[160px]">
                  <label className="text-[11px] font-bold text-slate-600 flex items-center gap-1.5 mb-1.5">
                    <Monitor className="w-3.5 h-3.5" /> Device
                  </label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm font-medium focus:outline-none focus:border-[#007bff] bg-white">
                    <option>All Devices</option>
                    {devices.map(dev => (
                      <option key={dev._id} value={dev.deviceName}>{dev.deviceName}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex-1 min-w-[120px]">
                  <label className="text-[11px] font-bold text-slate-600 flex items-center gap-1.5 mb-1.5">
                    <CheckCircle className="w-3.5 h-3.5" /> Status
                  </label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm font-medium focus:outline-none focus:border-[#007bff] bg-white">
                    <option>All</option>
                    <option>Processed</option>
                    <option>Unmapped</option>
                  </select>
                </div>
                
                <div className="flex-[2] min-w-[180px]">
                  <label className="text-[11px] font-bold text-slate-600 flex items-center gap-1.5 mb-1.5">
                    <Search className="w-3.5 h-3.5" /> Search
                  </label>
                  <input type="text" placeholder="Name, ID..." className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm font-medium focus:outline-none focus:border-[#007bff] bg-white" />
                </div>
                
                <div className="flex items-center gap-2 mt-2 lg:mt-0">
                  <button className="px-4 py-2 bg-[#fd7e14] hover:bg-[#e8700d] text-white rounded-none font-bold text-sm shadow-sm flex items-center justify-center gap-2 border-none cursor-pointer transition-colors h-[38px]">
                    <RefreshCcw className="w-4 h-4" /> Refresh
                  </button>
                  <button className="px-4 py-2 bg-[#28a745] hover:bg-[#218838] text-white rounded-none font-bold text-sm shadow-sm flex items-center justify-center gap-2 border-none cursor-pointer transition-colors h-[38px]">
                    <FileDown className="w-4 h-4" /> Export
                  </button>
                </div>
              </div>
            </div>

            {/* Dark Header Table */}
            <div className="bg-white border border-slate-200 rounded-none overflow-hidden shadow-3xs">
              <div className="px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">Show</span>
                <select className="border border-slate-300 rounded-none px-2 py-1 text-xs font-medium">
                  <option>50</option>
                  <option>100</option>
                </select>
                <span className="text-xs font-semibold text-slate-500">entries</span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[1000px]">
                  <thead>
                    <tr className="bg-[#343a40] text-white text-[11px] font-bold tracking-wide">
                      <th className="py-3 px-4 border-r border-[#454d55]">Timestamp <span className="ml-1 opacity-50">↑↓</span></th>
                      <th className="py-3 px-4 border-r border-[#454d55]">User <span className="ml-1 opacity-50">↑↓</span></th>
                      <th className="py-3 px-4 border-r border-[#454d55]">Type <span className="ml-1 opacity-50">↑↓</span></th>
                      <th className="py-3 px-4 border-r border-[#454d55]">Detail <span className="ml-1 opacity-50">↑↓</span></th>
                      <th className="py-3 px-4 border-r border-[#454d55]">ID / Adm <span className="ml-1 opacity-50">↑↓</span></th>
                      <th className="py-3 px-4 border-r border-[#454d55]">Status <span className="ml-1 opacity-50">↑↓</span></th>
                      <th className="py-3 px-4 border-r border-[#454d55]">Method <span className="ml-1 opacity-50">↑↓</span></th>
                      <th className="py-3 px-4 border-r border-[#454d55]">Device <span className="ml-1 opacity-50">↑↓</span></th>
                      <th className="py-3 px-4 border-r border-[#454d55]">Verification <span className="ml-1 opacity-50">↑↓</span></th>
                      <th className="py-3 px-4">Processed <span className="ml-1 opacity-50">↑↓</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan="10" className="py-16 bg-slate-50">
                        <div className="flex flex-col items-center justify-center text-slate-500">
                          <div className="w-12 h-12 rounded-none bg-slate-200 flex items-center justify-center mb-3">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-slate-600">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S10.01 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-7c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.5v3h3" />
                            </svg>
                          </div>
                          <h3 className="text-lg font-bold text-slate-700 mb-1">No records found.</h3>
                          <p className="text-sm font-medium">Adjust filters or wait for new punches.</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="px-4 py-3 border-t border-slate-200 flex items-center justify-between bg-slate-50 text-xs font-semibold text-slate-500">
                <div>Showing 0 to 0 of 0 entries</div>
                <div className="flex items-center gap-1">
                  <button className="px-3 py-1.5 border border-slate-200 bg-white text-slate-400 rounded-l cursor-not-allowed">Previous</button>
                  <button className="px-3 py-1.5 border border-slate-200 border-l-0 bg-white text-slate-400 rounded-r cursor-not-allowed">Next</button>
                </div>
              </div>
            </div>

          </div>
        )}

        {activeTab === 'Face Monitoring' && (
          <div className="space-y-4">
            
            {/* Collapsed Filters */}
            <div className="bg-white border border-slate-200 rounded-none shadow-3xs overflow-hidden">
              <div className="flex items-center justify-between p-3 bg-white text-slate-800 font-bold text-sm cursor-pointer hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-2">
                  <FilterIcon className="w-4 h-4" /> Filters
                </div>
                <Plus className="w-4 h-4 text-slate-400" />
              </div>
            </div>

            {/* Colored Metric Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-[#17a2b8] rounded-none p-5 flex flex-col justify-center text-white shadow-sm relative overflow-hidden">
                <Eye className="absolute -right-4 -bottom-4 w-24 h-24 text-black opacity-10" />
                <div className="text-3xl font-black mb-1 leading-none relative z-10">0</div>
                <div className="text-[11px] font-bold uppercase tracking-wide relative z-10">Total Detections</div>
              </div>
              <div className="bg-[#28a745] rounded-none p-5 flex flex-col justify-center text-white shadow-sm relative overflow-hidden">
                <UserCheck className="absolute -right-4 -bottom-4 w-24 h-24 text-black opacity-10" />
                <div className="text-3xl font-black mb-1 leading-none relative z-10">0</div>
                <div className="text-[11px] font-bold uppercase tracking-wide relative z-10">Recognized Faces</div>
              </div>
              <div className="bg-[#dc3545] rounded-none p-5 flex flex-col justify-center text-white shadow-sm relative overflow-hidden">
                <UserX className="absolute -right-4 -bottom-4 w-24 h-24 text-black opacity-10" />
                <div className="text-3xl font-black mb-1 leading-none relative z-10">0</div>
                <div className="text-[11px] font-bold uppercase tracking-wide relative z-10">Unknown Faces</div>
              </div>
              <div className="bg-[#ffc107] rounded-none p-5 flex flex-col justify-center text-white shadow-sm relative overflow-hidden">
                <ShieldAlert className="absolute -right-4 -bottom-4 w-24 h-24 text-black opacity-10" />
                <div className="text-3xl font-black mb-1 leading-none text-[#856404] relative z-10">0</div>
                <div className="text-[11px] font-bold uppercase tracking-wide text-[#856404] relative z-10">Spoof Attempts</div>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white border border-slate-200 rounded-none overflow-hidden shadow-3xs">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-white">
                <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                  <List className="w-4 h-4" /> Detection Events
                </div>
                <div className="px-2 py-0.5 bg-[#17a2b8] text-white text-[10px] font-bold rounded">
                  0 records
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[900px]">
                  <thead>
                    <tr className="bg-[#343a40] text-white text-[11px] font-bold tracking-wide">
                      <th className="py-3 px-4 border-r border-[#454d55]">Snapshot</th>
                      <th className="py-3 px-4 border-r border-[#454d55]">Person</th>
                      <th className="py-3 px-4 border-r border-[#454d55]">Camera</th>
                      <th className="py-3 px-4 border-r border-[#454d55]">Type</th>
                      <th className="py-3 px-4 border-r border-[#454d55]">Confidence</th>
                      <th className="py-3 px-4 border-r border-[#454d55]">Liveness</th>
                      <th className="py-3 px-4">Detected At</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan="7" className="py-16 bg-slate-50">
                        <div className="flex flex-col items-center justify-center text-slate-400">
                          <Shield className="w-10 h-10 mb-3 text-slate-400" />
                          <p className="text-sm font-medium text-slate-500">No monitoring detections found. Enable monitoring mode on a camera to start tracking.</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Data Retention Banner */}
            <div className="bg-white border border-slate-200 border-l-4 border-l-[#ffc107] rounded-none p-3 flex items-start gap-2 shadow-sm text-sm">
              <Info className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
              <div className="text-slate-700">
                <span className="font-bold text-slate-800">Data Retention:</span> Monitoring logs and snapshots are automatically purged after <span className="font-bold">7 days</span> to conserve storage.
              </div>
            </div>

          </div>
        )}

        {activeTab === 'Review Queue' && (
          <div className="space-y-4">
            
            {/* Info Banner */}
            <div className="bg-white border border-slate-200 border-l-4 border-l-[#17a2b8] rounded-none p-4 shadow-3xs text-sm text-slate-700 leading-relaxed">
              These are camera detections the server refused to turn into attendance — because the face was not similar enough, was too close to a second person's face to call, or failed the anti-spoof check. <span className="font-bold text-slate-900">Nothing here has been recorded as attendance.</span> Confirming releases the punch; rejecting leaves it refused.
            </div>

            {/* Sub-tabs */}
            <div className="flex items-center gap-4 border-b border-slate-200 pb-2">
              <button className="px-3 py-1.5 bg-[#007bff] text-white rounded-none font-bold text-sm flex items-center gap-2 border-none cursor-pointer shadow-sm">
                Waiting <span className="bg-white text-[#007bff] px-1.5 py-0.5 rounded-none text-[10px]">0</span>
              </button>
              <button className="px-3 py-1.5 bg-transparent text-slate-500 hover:text-slate-800 rounded-none font-bold text-sm flex items-center gap-2 border-none cursor-pointer transition-colors">
                Confirmed <span className="text-slate-400 text-[10px]">0</span>
              </button>
              <button className="px-3 py-1.5 bg-transparent text-slate-500 hover:text-slate-800 rounded-none font-bold text-sm flex items-center gap-2 border-none cursor-pointer transition-colors">
                Rejected <span className="text-slate-400 text-[10px]">0</span>
              </button>
            </div>

            {/* Empty State Box */}
            <div className="bg-white border border-slate-200 rounded-none p-16 shadow-3xs flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 rounded-none bg-[#28a745] text-white flex items-center justify-center mb-4 shadow-sm">
                <Check className="w-6 h-6" strokeWidth={3} />
              </div>
              <p className="text-slate-500 font-medium text-sm">
                Nothing is waiting for review. Every camera punch since the last check passed the school's similarity, margin and liveness gates.
              </p>
            </div>

            {/* Footer Hint */}
            <div className="flex items-start gap-2 text-xs text-slate-500 mt-2">
              <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-400" />
              <p className="leading-relaxed">
                Confirming a detection also keeps its face as an extra enrolment sample, so the same person is easier to recognise next time — enrolment photos are frontal and evenly lit, while the frames that fail are angled and backlit. Thresholds are set per camera under <span className="font-bold text-slate-700">Devices → Edit → Recognition Tuning</span>, and per school under <span className="font-bold text-slate-700">Settings → Biometric Attendance</span>.
              </p>
            </div>

          </div>
        )}

        {activeTab === 'Agent Logs' && (
          <div className="space-y-4">
            
            {/* Logs Table */}
            <div className="bg-white border border-slate-200 rounded-none overflow-hidden shadow-3xs">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-white">
                <div className="text-slate-800 font-bold text-sm">
                  Windows Agent Debug Logs
                </div>
                <div className="w-5 h-5 rounded-none hover:bg-slate-100 flex items-center justify-center cursor-pointer text-slate-400">
                  <span className="w-2.5 h-[2px] bg-slate-400 rounded-none"></span>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[900px]">
                  <thead>
                    <tr className="bg-white border-b border-slate-200 text-[11px] font-bold text-slate-700">
                      <th className="py-2.5 px-4 w-[15%]">Timestamp</th>
                      <th className="py-2.5 px-4 w-[10%]">Level</th>
                      <th className="py-2.5 px-4">Message</th>
                    </tr>
                  </thead>
                  <tbody className="text-[11px] font-medium text-slate-600">
                    {[] && [].length === 0 ? (
                      <tr><td colSpan="3" className="py-8 text-center text-slate-500 font-medium">No agent logs</td></tr>
                    ) : [].map((log, idx) => (
                      <tr key={log.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50 hover:bg-slate-50'}>
                        <td className="py-2 px-4 whitespace-pre-wrap">{log.time.replace(' ', '\n')}</td>
                        <td className="py-2 px-4">
                          <span className="px-2 py-0.5 bg-[#17a2b8] text-white rounded-none font-bold uppercase tracking-wider text-[10px]">
                            {log.level}
                          </span>
                        </td>
                        <td className="py-2 px-4">{log.msg}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
