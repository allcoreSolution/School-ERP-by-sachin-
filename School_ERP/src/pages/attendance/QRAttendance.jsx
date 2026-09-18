import React, { useState } from 'react';
import { 
  QrCode, Camera, ScanLine, Maximize, Contact, RotateCcw, Info
} from 'lucide-react';

export default function QRAttendance() {
  const [deviceType, setDeviceType] = useState('camera'); // 'camera' or 'sensor'

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <QrCode className="w-6 h-6 text-slate-800" />
            <h1 className="text-xl font-bold text-slate-800">QR Code Attendance</h1>
          </div>
          <p className="text-sm text-slate-500 font-medium mt-0.5">
            Scan an ID card to mark the IN and OUT time for students and staff
          </p>
        </div>
        
        {/* Device Toggles */}
        <div className="flex items-center bg-slate-100 rounded-none p-1 border border-slate-200">
          <button 
            onClick={() => setDeviceType('camera')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-none text-xs font-bold transition-colors cursor-pointer border-none ${
              deviceType === 'camera' 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'text-slate-500 hover:text-slate-700 bg-transparent'
            }`}
          >
            <Camera className="w-4 h-4" /> Camera-based device
          </button>
          <button 
            onClick={() => setDeviceType('sensor')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-none text-xs font-bold transition-colors cursor-pointer border-none ${
              deviceType === 'sensor' 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'text-slate-500 hover:text-slate-700 bg-transparent'
            }`}
          >
            <ScanLine className="w-4 h-4" /> Sensor-based device
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          
          {/* Left Panel - Scanner */}
          <div className="flex-1 bg-white border border-slate-200 rounded-none overflow-hidden shadow-3xs flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                <Maximize className="w-4 h-4 text-indigo-600" /> Scan Your ID Card QR Code / Barcode
              </div>
              <div className="text-emerald-500 text-xs font-bold">Auto submit on</div>
            </div>
            
            <div className="p-4 flex-1 flex flex-col">
              <div className="bg-[#0f172a] rounded-none w-full h-[300px] flex items-center justify-center relative overflow-hidden">
                <div className="w-full bg-red-500 py-4 px-6 absolute top-1/2 -translate-y-1/2">
                  <span className="text-white font-medium text-sm">Camera not available. Check permissions / HTTPS.</span>
                </div>
              </div>
              
              <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-slate-400">
                <Info className="w-3.5 h-3.5 shrink-0" />
                Allow camera access. The camera works only over a secure (HTTPS) connection.
              </div>
            </div>
          </div>

          {/* Right Panel - Result/ID Card */}
          <div className="flex-1 bg-white border border-slate-200 rounded-none p-8 flex flex-col items-center justify-center text-center shadow-3xs min-h-[400px]">
            <div className="w-32 h-32 mb-6 opacity-30">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-slate-600">
                <rect x="3" y="7" width="18" height="13" rx="2" ry="2"></rect>
                <path d="M8 7v-2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <circle cx="9" cy="13" r="2"></circle>
                <path d="M6 18c0-1.66 1.34-3 3-3h0c1.66 0 3 1.34 3 3"></path>
                <path d="M15 12h3"></path>
                <path d="M15 15h3"></path>
                <path d="M15 18h3"></path>
              </svg>
            </div>
            <h3 className="text-slate-700 font-bold text-lg">Scan an ID card to begin.</h3>
            <p className="text-slate-400 text-sm font-medium mt-1">The card holder's details appear here once a code is read.</p>
          </div>

        </div>

        {/* Bottom Status Bar */}
        <div className="mt-4 bg-white border border-slate-200 rounded-none p-3 flex flex-wrap items-center justify-between shadow-3xs gap-4">
          <div className="flex items-center gap-6 text-xs text-slate-500 font-medium px-2">
            <div><span className="font-bold text-slate-800 text-sm">0</span> marked IN</div>
            <div><span className="font-bold text-slate-800 text-sm">0</span> marked OUT</div>
            <div><span className="font-bold text-slate-800 text-sm">0</span> already done</div>
            <div><span className="font-bold text-slate-800 text-sm">0</span> not recognised</div>
            <div><span className="font-bold text-slate-800 text-sm">0</span> not confirmed</div>
          </div>
          <button className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold rounded-none flex items-center gap-2 cursor-pointer shadow-sm transition-colors">
            <RotateCcw className="w-3.5 h-3.5" /> Reset count
          </button>
        </div>
        
      </div>
    </div>
  );
}
