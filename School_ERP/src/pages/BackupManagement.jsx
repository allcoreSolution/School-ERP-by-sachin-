import React, { useState } from "react";
import { 
  Clock, 
  Plus, 
  Info, 
  Database, 
  Cloud, 
  Download, 
  Trash2, 
  X, 
  Settings, 
  Check, 
  Send, 
  Sliders, 
  HardDrive,
  AlertTriangle,
  Play,
  Grid,
  List,
  Save,
  Plug
} from "lucide-react";

export default function BackupManagement() {
  // Demo Mode Error Banner state
  const [showErrorBanner, setShowErrorBanner] = useState(false);
  
  // Modal States
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showDestinationModal, setShowDestinationModal] = useState(false);

  // Scheduling Preferences
  const [dailySummary, setDailySummary] = useState(false);
  const [summaryTime, setSummaryTime] = useState("08:00");
  const [deliveryEmail, setDeliveryEmail] = useState(false);
  const [deliveryWhatsApp, setDeliveryWhatsApp] = useState(false);
  
  const [systemBackup, setSystemBackup] = useState(false);
  const [backupTime, setBackupTime] = useState("02:00");

  // Destination states
  const [selectedProvider, setSelectedProvider] = useState("Cloudflare R2");
  
  // Available manual backups list
  const [backups, setBackups] = useState([
    { id: 1, date: "2026-08-04 07:48:49", filename: "backup-2026-08-04-07-47-37.zip", size: "18.91 MB" }
  ]);

  const handleCreateBackup = () => {
    // Triggers the demo mode error banner at the top
    setShowErrorBanner(true);
  };

  const handleTestConnection = () => {
    alert(`Connection to ${selectedProvider} was successful!`);
  };

  const handleSaveDestination = () => {
    alert(`Off-site destination (${selectedProvider}) saved successfully in configuration.`);
    setShowDestinationModal(false);
  };

  const handleSavePreferences = () => {
    alert("System automation preferences updated successfully.");
    setShowScheduleModal(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-4 pb-20 font-sans">
      
      {/* Title & Action Buttons */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Backup Management</h1>
          <p className="text-slate-500 text-sm">Nightly automated backups & manual snapshots of your school data</p>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Scheduling Settings */}
          <button 
            onClick={() => setShowScheduleModal(true)}
            className="px-4 py-2 border border-slate-300 text-slate-700 bg-white font-semibold text-xs rounded-none hover:bg-slate-50 transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer active:scale-95"
          >
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            Scheduling Settings
          </button>

          {/* Create New Backup */}
          <button 
            onClick={handleCreateBackup}
            className="px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-none hover:bg-indigo-700 transition-all flex items-center gap-1.5 shadow-md cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4 text-white" />
            Create New Backup
          </button>
        </div>
      </div>

      {/* Red Error Banner (disabled in demo mode) */}
      {showErrorBanner && (
        <div className="bg-rose-600 text-white px-4 py-3 rounded-none text-sm flex items-center justify-between shadow-md transition-all animate-in fade-in duration-200">
          <div className="flex items-center gap-2 font-medium">
            <span>This action is disabled in demo mode for security.</span>
          </div>
          <button 
            onClick={() => setShowErrorBanner(false)}
            className="p-1 hover:bg-white/10 rounded-none text-white/80 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Purple Informational Note Banner */}
      <div className="bg-indigo-50 border border-indigo-100 text-indigo-700 p-3.5 rounded-none text-xs flex items-start gap-2.5 shadow-3xs leading-relaxed">
        <Info className="w-4.5 h-4.5 text-indigo-500 flex-shrink-0 mt-0.5" />
        <p>
          Backups are automatically generated every night. You can also create a manual backup at any time using the button above. Backups older than 30 days are automatically deleted.
        </p>
      </div>

      {/* Available Backups Table Block */}
      <div className="bg-white border border-slate-200 rounded-none overflow-hidden shadow-3xs">
        
        {/* Table Title and Layout controllers */}
        <div className="px-5 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/30">
          <div className="flex items-center gap-2">
            <Database className="w-4.5 h-4.5 text-indigo-650" />
            <h2 className="font-bold text-slate-800 text-sm">Available Backups</h2>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-semibold">{backups.length} backup</span>
            
            {/* View Mode controls */}
            <div className="flex bg-white border border-slate-250 rounded-none p-0.5 overflow-hidden">
              <button className="p-1 text-indigo-600 bg-indigo-50 border-slate-100 rounded-none"><List className="w-3.5 h-3.5" /></button>
              <button className="p-1 text-slate-400 hover:text-slate-600"><Grid className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        </div>

        {/* Available Backups Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-55 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-5 w-16 text-center">#</th>
                <th className="py-3 px-5">Date Created</th>
                <th className="py-3 px-5">Filename</th>
                <th className="py-3 px-5">Size</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-600">
              {backups.map((bk, idx) => (
                <tr key={bk.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-5 text-center text-slate-400 font-medium">{idx + 1}</td>
                  <td className="py-4 px-5 font-semibold text-slate-800">{bk.date}</td>
                  <td className="py-4 px-5 font-medium text-slate-700">{bk.filename}</td>
                  <td className="py-4 px-5 font-semibold text-slate-400">{bk.size}</td>
                  <td className="py-4 px-5 text-right">
                    <div className="inline-flex items-center gap-3">
                      <button 
                        onClick={() => alert(`Starting download for ${bk.filename}...`)}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-none transition-colors cursor-pointer"
                        title="Download backup"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => {
                          if (confirm("Are you sure you want to delete this backup?")) {
                            setBackups(backups.filter(b => b.id !== bk.id));
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-none transition-colors cursor-pointer"
                        title="Delete backup"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {backups.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-slate-400 font-medium">
                    No backups available. Click "Create New Backup" to generate one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Off-site Copies Section */}
      <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs space-y-4">
        
        {/* Box Header */}
        <div className="flex justify-between items-center border-b pb-3.5">
          <div className="flex items-center gap-2">
            <Cloud className="w-5 h-5 text-indigo-600" />
            <h2 className="font-bold text-slate-800 text-sm">Off-site Copies</h2>
          </div>
          
          <button 
            onClick={() => setShowDestinationModal(true)}
            className="px-4 py-2 bg-indigo-650 text-white font-bold text-xs rounded-none hover:bg-indigo-700 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4 text-white" />
            Add destination
          </button>
        </div>

        {/* Context instructions */}
        <p className="text-xs text-slate-500 font-medium leading-relaxed">
          Automatically send a copy of every backup to storage <span className="font-bold text-slate-700">you</span> control, so your data survives even if this server is lost. Cloudflare R2 and Backblaze B2 store the full backup; Telegram receives the database only (files up to 50 MB — larger ones trigger an alert instead).
        </p>

        {/* Empty state graphic container */}
        <div className="border border-dashed border-slate-200 rounded-none p-10 flex flex-col items-center justify-center text-center space-y-3 bg-slate-50/30">
          <div className="w-12 h-12 rounded-none bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100 shadow-2xs">
            <Cloud className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-850 text-xs">No off-site copies yet</h3>
            <p className="text-[10px] text-slate-450 font-medium mt-1">
              Add Cloudflare R2, Backblaze B2, or Telegram to keep your data safe off this server.
            </p>
          </div>
        </div>

      </div>

      {/* AUTOMATION & SCHEDULING SETTINGS MODAL */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-none shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
              <div className="flex items-center gap-2.5 text-indigo-600">
                <Clock className="w-5 h-5" />
                <h3 className="font-bold text-slate-800 text-sm">Automation & Scheduling</h3>
              </div>
              <button 
                onClick={() => setShowScheduleModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-650 hover:bg-slate-100 rounded-none transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 space-y-5 overflow-y-auto">
              
              {/* Option 1: Automated Daily Summary */}
              <div className="border border-slate-200/80 rounded-none p-4 space-y-4 bg-white shadow-3xs">
                <div className="flex justify-between items-start">
                  <div className="flex gap-2">
                    <Sliders className="w-4.5 h-4.5 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-xs text-slate-850">Automated Daily Summary</h4>
                      <p className="text-[10px] text-slate-450 leading-relaxed mt-0.5">
                        Receive a comprehensive daily heartbeat summary (Attendance metrics, Fees collected, Income & Expenses).
                      </p>
                    </div>
                  </div>
                  
                  {/* Slide switch */}
                  <button 
                    onClick={() => setDailySummary(!dailySummary)}
                    className={`relative inline-flex h-5.5 w-10 flex-shrink-0 cursor-pointer rounded-none border-2 border-transparent transition-colors duration-200 ease-in-out ${dailySummary ? 'bg-indigo-600' : 'bg-slate-200'}`}
                  >
                    <span className={`pointer-events-none inline-block h-4.5 w-4.5 transform rounded-none bg-white transition duration-200 ease-in-out ${dailySummary ? 'translate-x-4.5' : 'translate-x-0'}`} />
                  </button>
                </div>

                {/* Sub-inputs when summary active */}
                {dailySummary && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100 animate-in slide-in-from-top duration-250">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-600">Preferred Time</label>
                      <div className="relative flex items-center">
                        <input 
                          type="text" 
                          value={summaryTime}
                          onChange={(e) => setSummaryTime(e.target.value)}
                          className="w-full pl-3 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-none text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-slate-400 focus:bg-white transition-all"
                        />
                        <Clock className="absolute right-3 w-4 h-4 text-slate-400 pointer-events-none" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-600">Delivery Channels</label>
                      <div className="flex items-center gap-4 pt-1.5">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={deliveryEmail}
                            onChange={(e) => setDeliveryEmail(e.target.checked)}
                            className="rounded border-slate-300 text-indigo-600 w-4.5 h-4.5 cursor-pointer"
                          />
                          <span className="text-xs font-bold text-slate-600">Email</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={deliveryWhatsApp}
                            onChange={(e) => setDeliveryWhatsApp(e.target.checked)}
                            className="rounded border-slate-300 text-indigo-600 w-4.5 h-4.5 cursor-pointer"
                          />
                          <span className="text-xs font-bold text-slate-600">WhatsApp</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Option 2: Scheduled System Backups */}
              <div className="border border-slate-200/80 rounded-none p-4 space-y-4 bg-white shadow-3xs">
                <div className="flex justify-between items-start">
                  <div className="flex gap-2">
                    <Cloud className="w-4.5 h-4.5 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-xs text-slate-850">Scheduled System Backups</h4>
                      <p className="text-[10px] text-slate-450 leading-relaxed mt-0.5">
                        Automatically generate a full backup zip (database & tenant files) every night.
                      </p>
                    </div>
                  </div>
                  
                  {/* Slide switch */}
                  <button 
                    onClick={() => setSystemBackup(!systemBackup)}
                    className={`relative inline-flex h-5.5 w-10 flex-shrink-0 cursor-pointer rounded-none border-2 border-transparent transition-colors duration-200 ease-in-out ${systemBackup ? 'bg-indigo-600' : 'bg-slate-200'}`}
                  >
                    <span className={`pointer-events-none inline-block h-4.5 w-4.5 transform rounded-none bg-white transition duration-200 ease-in-out ${systemBackup ? 'translate-x-4.5' : 'translate-x-0'}`} />
                  </button>
                </div>

                {/* Sub-inputs when backup active */}
                {systemBackup && (
                  <div className="pt-2 border-t border-slate-100 animate-in slide-in-from-top duration-250">
                    <div className="space-y-1.5 w-1/2">
                      <label className="text-[10px] font-bold text-slate-600">Execution Time</label>
                      <div className="relative flex items-center">
                        <input 
                          type="text" 
                          value={backupTime}
                          onChange={(e) => setBackupTime(e.target.value)}
                          className="w-full pl-3 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-none text-xs text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-slate-400 focus:bg-white transition-all"
                        />
                        <Clock className="absolute right-3 w-4 h-4 text-slate-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Modal Actions Footer */}
            <div className="p-4 border-t bg-slate-50 flex justify-end gap-2">
              <button 
                onClick={() => setShowScheduleModal(false)}
                className="px-4 py-2 border rounded-none text-xs font-semibold text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={handleSavePreferences}
                className="px-4 py-2 bg-indigo-600 text-white rounded-none text-xs font-bold hover:bg-indigo-700 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer active:scale-95"
              >
                <Save className="w-3.5 h-3.5" />
                Save Preferences
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ADD OFF-SITE DESTINATION MODAL */}
      {showDestinationModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-none shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
              <div className="flex items-center gap-2 text-indigo-600">
                <Cloud className="w-5 h-5" />
                <h3 className="font-bold text-slate-800 text-sm">Add off-site destination</h3>
              </div>
              <button 
                onClick={() => setShowDestinationModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-655 hover:bg-slate-100 rounded-none transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content Body */}
            <div className="p-6 space-y-6">
              
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 block">Provider</label>
                
                {/* Providers Selector Row */}
                <div className="grid grid-cols-3 gap-3">
                  
                  {/* Provider 1: Cloudflare R2 */}
                  <button
                    type="button"
                    onClick={() => setSelectedProvider("Cloudflare R2")}
                    className={`py-3 px-2.5 border rounded-none text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      selectedProvider === "Cloudflare R2"
                        ? "border-indigo-600 text-indigo-600 bg-indigo-50/15"
                        : "border-slate-200 text-slate-600 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <Database className="w-3.5 h-3.5" />
                    Cloudflare R2
                  </button>

                  {/* Provider 2: Backblaze B2 */}
                  <button
                    type="button"
                    onClick={() => setSelectedProvider("Backblaze B2")}
                    className={`py-3 px-2.5 border rounded-none text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      selectedProvider === "Backblaze B2"
                        ? "border-indigo-600 text-indigo-600 bg-indigo-50/15"
                        : "border-slate-200 text-slate-600 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <Database className="w-3.5 h-3.5" />
                    Backblaze B2
                  </button>

                  {/* Provider 3: Telegram */}
                  <button
                    type="button"
                    onClick={() => setSelectedProvider("Telegram")}
                    className={`py-3 px-2.5 border rounded-none text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      selectedProvider === "Telegram"
                        ? "border-indigo-600 text-indigo-600 bg-indigo-50/15"
                        : "border-slate-200 text-slate-600 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    Telegram
                  </button>

                </div>
              </div>

            </div>

            {/* Modal Actions Footer */}
            <div className="p-4 border-t bg-slate-50 flex items-center justify-between">
              
              {/* Test Connection Button */}
              <button
                type="button"
                onClick={handleTestConnection}
                className="px-4 py-2 border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 rounded-none text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
              >
                <Plug className="w-3.5 h-3.5 text-slate-500" />
                Test connection
              </button>

              <div className="flex gap-2">
                <button 
                  onClick={() => setShowDestinationModal(false)}
                  className="px-4 py-2 border rounded-none text-xs font-semibold text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveDestination}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-none text-xs font-bold hover:bg-indigo-700 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer active:scale-95"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
