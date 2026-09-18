import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  QrCode, Maximize, Settings, Smartphone, ScanLine, 
  Camera, Check, QrCode as QrCodeIcon, Barcode, 
  Lightbulb, AlertTriangle, Save
} from 'lucide-react';

export default function QRAttendanceSettings() {
  const navigate = useNavigate();

  // States
  const [autoAttendance, setAutoAttendance] = useState(true);
  const [devices, setDevices] = useState({ sensor: true, camera: true });
  const [cameraType, setCameraType] = useState('primary'); // 'primary' or 'secondary'
  const [formats, setFormats] = useState({ qr: true, barcode: true });
  const [cooldown, setCooldown] = useState(2);
  const [securityMode, setSecurityMode] = useState(false);

  const handleDeviceToggle = (type) => {
    setDevices(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const handleFormatToggle = (type) => {
    setFormats(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const openScanStation = () => navigate('/qr-attendance/attendance');

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <QrCode className="w-6 h-6 text-slate-800" />
            <h1 className="text-xl font-bold text-slate-800">QR Code Attendance — Settings</h1>
          </div>
          <p className="text-sm text-slate-500 font-medium mt-0.5">
            Configure how the scan station reads ID cards and records attendance
          </p>
        </div>
        
        <button 
          onClick={openScanStation}
          className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-bold rounded-none flex items-center gap-2 shadow-sm cursor-pointer transition-colors"
        >
          <Maximize className="w-4 h-4" /> Open Scan Station
        </button>
      </div>

      <div className="p-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        
        {/* Left Column - Form */}
        <div className="flex-[2] bg-white border border-slate-200 rounded-none overflow-hidden shadow-3xs">
          <div className="flex items-center gap-2 p-4 border-b border-slate-100 text-indigo-900 font-bold bg-slate-50/50">
            <Settings className="w-4 h-4 text-indigo-500" /> Scan Station Configuration
          </div>
          
          <div className="divide-y divide-slate-100">
            
            {/* 1. Auto Attendance */}
            <div className="p-5 flex gap-8">
              <div className="w-1/3 shrink-0">
                <div className="font-bold text-sm text-slate-800">Auto Attendance</div>
                <div className="text-xs font-semibold text-slate-400 mt-0.5">Skips the confirm step at the station</div>
              </div>
              <div className="flex-1 flex items-start gap-3">
                <div 
                  onClick={() => setAutoAttendance(!autoAttendance)}
                  className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-none cursor-pointer transition-colors mt-0.5 ${autoAttendance ? 'bg-indigo-600' : 'bg-slate-200'}`}
                >
                  <span className={`inline-block h-3.5 w-3.5 transform rounded-none bg-white shadow transition-transform ${autoAttendance ? 'translate-x-4.5' : 'translate-x-0.5'}`} />
                </div>
                <span className="text-sm font-medium text-slate-600">Submit attendance automatically on a successful scan</span>
              </div>
            </div>

            {/* 2. Scanner Device Type */}
            <div className="p-5 flex gap-8">
              <div className="w-1/3 shrink-0">
                <div className="font-bold text-sm text-slate-800">Scanner Device Type <span className="text-red-500">*</span></div>
                <div className="text-xs font-semibold text-slate-400 mt-0.5">Pick one or both</div>
              </div>
              <div className="flex-1 space-y-3">
                <div 
                  onClick={() => handleDeviceToggle('sensor')}
                  className={`flex items-center justify-between p-3 rounded-none border-2 cursor-pointer transition-colors ${devices.sensor ? 'border-indigo-100 bg-indigo-50' : 'border-slate-100 hover:border-indigo-50 bg-white'}`}
                >
                  <div className="flex items-center gap-3">
                    <ScanLine className={`w-5 h-5 ${devices.sensor ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <div>
                      <div className={`font-bold text-sm ${devices.sensor ? 'text-indigo-900' : 'text-slate-700'}`}>Sensor-based device</div>
                      <div className={`text-xs font-semibold ${devices.sensor ? 'text-indigo-600/70' : 'text-slate-400'}`}>Barcode / QR scanner gun</div>
                    </div>
                  </div>
                  {devices.sensor && <Check className="w-4 h-4 text-indigo-600" />}
                </div>

                <div 
                  onClick={() => handleDeviceToggle('camera')}
                  className={`flex items-center justify-between p-3 rounded-none border-2 cursor-pointer transition-colors ${devices.camera ? 'border-indigo-100 bg-indigo-50' : 'border-slate-100 hover:border-indigo-50 bg-white'}`}
                >
                  <div className="flex items-center gap-3">
                    <Camera className={`w-5 h-5 ${devices.camera ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <div>
                      <div className={`font-bold text-sm ${devices.camera ? 'text-indigo-900' : 'text-slate-700'}`}>Camera-based device</div>
                      <div className={`text-xs font-semibold ${devices.camera ? 'text-indigo-600/70' : 'text-slate-400'}`}>Mobile phone or webcam</div>
                    </div>
                  </div>
                  {devices.camera && <Check className="w-4 h-4 text-indigo-600" />}
                </div>
              </div>
            </div>

            {/* 3. Select Camera */}
            <div className={`p-5 flex gap-8 transition-opacity ${devices.camera ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
              <div className="w-1/3 shrink-0">
                <div className="font-bold text-sm text-slate-800">Select Camera <span className="text-red-500">*</span></div>
                <div className="text-xs font-semibold text-slate-400 mt-0.5">Used by camera devices only</div>
              </div>
              <div className="flex-1 flex gap-3">
                <div 
                  onClick={() => setCameraType('primary')}
                  className={`flex-1 flex items-center justify-between p-3 rounded-none border-2 cursor-pointer transition-colors ${cameraType === 'primary' ? 'border-indigo-100 bg-indigo-50' : 'border-slate-100 hover:border-indigo-50 bg-white'}`}
                >
                  <div className="flex items-center gap-2">
                    <Smartphone className={`w-4 h-4 ${cameraType === 'primary' ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span className={`font-bold text-sm ${cameraType === 'primary' ? 'text-indigo-900' : 'text-slate-700'}`}>Primary (Back)</span>
                  </div>
                  {cameraType === 'primary' && <Check className="w-4 h-4 text-indigo-600" />}
                </div>
                
                <div 
                  onClick={() => setCameraType('secondary')}
                  className={`flex-1 flex items-center justify-between p-3 rounded-none border-2 cursor-pointer transition-colors ${cameraType === 'secondary' ? 'border-indigo-100 bg-indigo-50' : 'border-slate-100 hover:border-indigo-50 bg-white'}`}
                >
                  <div className="flex items-center gap-2">
                    <Camera className={`w-4 h-4 ${cameraType === 'secondary' ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span className={`font-bold text-sm ${cameraType === 'secondary' ? 'text-indigo-900' : 'text-slate-700'}`}>Secondary (Front)</span>
                  </div>
                  {cameraType === 'secondary' && <Check className="w-4 h-4 text-indigo-600" />}
                </div>
              </div>
            </div>

            {/* 4. Barcode Formats */}
            <div className="p-5 flex gap-8">
              <div className="w-1/3 shrink-0">
                <div className="font-bold text-sm text-slate-800">Barcode Formats</div>
                <div className="text-xs font-semibold text-slate-400 mt-0.5">What the scanner will try to read</div>
              </div>
              <div className="flex-1 flex gap-3">
                <div 
                  onClick={() => handleFormatToggle('qr')}
                  className={`flex-1 flex items-center justify-between p-3 rounded-none border-2 cursor-pointer transition-colors ${formats.qr ? 'border-indigo-100 bg-indigo-50' : 'border-slate-100 hover:border-indigo-50 bg-white'}`}
                >
                  <div className="flex items-center gap-2">
                    <QrCodeIcon className={`w-4 h-4 ${formats.qr ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span className={`font-bold text-sm ${formats.qr ? 'text-indigo-900' : 'text-slate-700'}`}>QR Code</span>
                  </div>
                  {formats.qr && <Check className="w-4 h-4 text-indigo-600" />}
                </div>
                
                <div 
                  onClick={() => handleFormatToggle('barcode')}
                  className={`flex-1 flex items-center justify-between p-3 rounded-none border-2 cursor-pointer transition-colors ${formats.barcode ? 'border-indigo-100 bg-indigo-50' : 'border-slate-100 hover:border-indigo-50 bg-white'}`}
                >
                  <div className="flex items-center gap-2">
                    <Barcode className={`w-4 h-4 ${formats.barcode ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span className={`font-bold text-sm ${formats.barcode ? 'text-indigo-900' : 'text-slate-700'}`}>Barcode (CODE 128)</span>
                  </div>
                  {formats.barcode && <Check className="w-4 h-4 text-indigo-600" />}
                </div>
              </div>
            </div>

            {/* 5. Scan Cooldown */}
            <div className="p-5 flex gap-8">
              <div className="w-1/3 shrink-0">
                <div className="font-bold text-sm text-slate-800">Scan Cooldown</div>
                <div className="text-xs font-semibold text-slate-400 mt-0.5">Ignores a repeat scan of the same person within this window</div>
              </div>
              <div className="flex-1 flex items-center">
                <div className="flex rounded-none border border-slate-300 overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all">
                  <input 
                    type="number" 
                    value={cooldown}
                    onChange={(e) => setCooldown(e.target.value)}
                    className="w-20 px-3 py-2 text-sm font-bold text-slate-800 outline-none border-none text-center"
                    min="0"
                  />
                  <div className="bg-slate-100 px-4 py-2 border-l border-slate-300 text-sm font-semibold text-slate-500 flex items-center">
                    seconds
                  </div>
                </div>
              </div>
            </div>

            {/* 6. Security Mode */}
            <div className="p-5 flex gap-8">
              <div className="w-1/3 shrink-0">
                <div className="font-bold text-sm text-slate-800">Security Mode</div>
                <div className="text-xs font-semibold text-slate-400 mt-0.5">Controls which codes the station accepts</div>
              </div>
              <div className="flex-1 flex flex-col gap-3">
                <div className="flex items-start gap-3 mt-0.5">
                  <div 
                    onClick={() => setSecurityMode(!securityMode)}
                    className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-none cursor-pointer transition-colors ${securityMode ? 'bg-indigo-600' : 'bg-slate-200'}`}
                  >
                    <span className={`inline-block h-3.5 w-3.5 transform rounded-none bg-white shadow transition-transform ${securityMode ? 'translate-x-4.5' : 'translate-x-0.5'}`} />
                  </div>
                  <span className="text-sm font-bold text-slate-700">Strict: accept only secure (signed) ID cards — <span className="font-medium text-slate-500">reject plain admission/staff numbers</span></span>
                </div>
                
                <div className="bg-amber-50 border border-amber-200 rounded-none p-3 flex gap-2.5 ml-12">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-amber-800">
                    Leave OFF (non-strict) to keep existing printed cards working. Turn ON only after re-issuing cards with secure QR codes.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-5 flex items-center justify-end gap-3 bg-slate-50/50">
              <button 
                onClick={openScanStation}
                className="px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-bold rounded-none cursor-pointer transition-colors shadow-sm"
              >
                Open Scan Station
              </button>
              <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-none flex items-center gap-2 cursor-pointer shadow-sm border-none transition-colors">
                <Save className="w-4 h-4" /> Save Settings
              </button>
            </div>

          </div>
        </div>

        {/* Right Column - How it works */}
        <div className="flex-1 h-fit bg-white border border-slate-200 rounded-none shadow-3xs overflow-hidden">
          <div className="flex items-center gap-2 p-4 border-b border-slate-100 text-indigo-900 font-bold bg-slate-50/50">
            <Lightbulb className="w-4 h-4 text-indigo-500" /> How it works
          </div>
          <div className="p-5 space-y-4">
            
            <div className="flex gap-2">
              <div className="w-1.5 h-1.5 rounded-none bg-indigo-500 mt-1.5 shrink-0" />
              <p className="text-sm font-medium text-slate-600">
                <span className="font-bold text-slate-800">Camera device</span> — opens your webcam or phone camera and reads the QR/barcode. Requires HTTPS.
              </p>
            </div>
            
            <div className="w-full h-px bg-slate-100" />
            
            <div className="flex gap-2">
              <div className="w-1.5 h-1.5 rounded-none bg-indigo-500 mt-1.5 shrink-0" />
              <p className="text-sm font-medium text-slate-600">
                <span className="font-bold text-slate-800">Scanner gun</span> — a USB/Bluetooth scanner behaves like a keyboard: it types the code and presses Enter. No driver or setup needed.
              </p>
            </div>
            
            <div className="w-full h-px bg-slate-100" />
            
            <div className="flex gap-2">
              <div className="w-1.5 h-1.5 rounded-none bg-indigo-500 mt-1.5 shrink-0" />
              <p className="text-sm font-medium text-slate-600">
                <span className="font-bold text-slate-800">Who scans what</span> — students scan their admission number QR; staff scan their staff ID QR.
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
