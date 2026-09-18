import React from 'react';
import { 
  ShieldAlert, Info, AlertTriangle, Bot, Flag, CheckCircle2 
} from 'lucide-react';

export default function ContentSafety() {
  return (
    <div className="bg-[#f4f7fc] min-h-[calc(100vh-64px)] font-sans p-6 pb-20">
      
      {/* Header */}
      <div className="flex items-center mb-4">
        <ShieldAlert className="w-7 h-7 text-[#dc3545] mr-2" />
        <h1 className="text-[24px] font-semibold text-gray-800">Content Safety</h1>
      </div>

      {/* Dark Gray Banner */}
      <div className="bg-[#6c757d] text-white rounded-none p-3 mb-4 flex items-start">
        <Info className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
        <p className="text-[14px]">
          Content Safety scanning is currently turned off for the platform. Contact your provider to enable it.
        </p>
      </div>

      {/* Yellow Banner */}
      <div className="bg-[#ffc107] text-gray-900 rounded-none p-3 mb-6 flex items-start shadow-sm">
        <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
        <p className="text-[14px]">
          This is a <strong className="font-bold">first-line adult-content filter</strong> with human review — not CSAM detection. Flagged thumbnails are <strong className="font-bold">blurred by default</strong>; revealing one is logged. Report any illegal material to the authorities.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-none border border-gray-200 p-4 shadow-sm flex flex-col justify-center">
          <span className="text-[28px] font-bold text-gray-800 leading-none mb-1">0</span>
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">SCANNED</span>
        </div>
        <div className="bg-white rounded-none border border-gray-200 p-4 shadow-sm flex flex-col justify-center">
          <span className="text-[28px] font-bold text-[#ffc107] leading-none mb-1">0</span>
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">PENDING</span>
        </div>
        <div className="bg-white rounded-none border border-gray-200 p-4 shadow-sm flex flex-col justify-center">
          <span className="text-[28px] font-bold text-[#28a745] leading-none mb-1">0</span>
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">CLEAN</span>
        </div>
        <div className="bg-white rounded-none border border-gray-200 p-4 shadow-sm flex flex-col justify-center">
          <span className="text-[28px] font-bold text-[#dc3545] leading-none mb-1">0</span>
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">FLAGGED</span>
        </div>
      </div>

      {/* Scan Button Panel */}
      <div className="bg-white rounded-none border border-gray-200 shadow-sm p-4 mb-6 flex flex-col sm:flex-row items-center sm:items-start gap-4">
        <button className="flex items-center px-4 py-2.5 bg-[#fd7e14] text-white rounded-none text-[14px] font-bold hover:bg-[#e86f0b] transition-colors shadow-sm flex-shrink-0">
          <Bot className="w-5 h-5 mr-2" />
          Scan My Pending Images
        </button>
        <div className="flex items-center text-[13px] text-gray-500 mt-1">
          Runs in your browser — images never leave your device during scanning.
        </div>
      </div>

      {/* Review Queue Panel */}
      <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center bg-white">
          <Flag className="w-5 h-5 text-gray-700 mr-2" />
          <h2 className="text-[15px] font-bold text-gray-800">Review Queue</h2>
        </div>
        <div className="p-16 flex flex-col items-center justify-center bg-white">
          <CheckCircle2 className="w-10 h-10 text-[#28a745] mb-3" />
          <p className="text-gray-500 text-[15px]">Nothing awaiting review.</p>
        </div>
      </div>

    </div>
  );
}
