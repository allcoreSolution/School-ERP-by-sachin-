import React from 'react';
import { Lock, IndianRupee, Camera, XCircle, ArrowLeft, Info, Save, ShieldAlert, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ResultSettings() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-10 p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          Result Release Settings <span className="text-slate-400 font-normal">| Annual Examination</span>
        </h1>
        <button 
          onClick={() => navigate('/offline-exams/manage')}
          className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 font-bold text-xs rounded-none shadow-sm hover:bg-slate-50 flex items-center gap-2 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Exams
        </button>
      </div>

      <div className="bg-[#f0ebfa] border border-[#d6c3f8] p-3 rounded-none mb-6 text-xs text-[#6f42c1] flex items-start gap-2">
        <Info className="w-4 h-4 shrink-0 mt-0.5" />
        <p><strong>These controls are an overlay.</strong> A result becomes visible to a parent only when (a) the Report Card / Uploaded Marksheet is published and (b) it is not restricted here (withheld, scheduled, fee-locked, or on hold).</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column */}
        <div className="space-y-6">
          {/* Release Control */}
          <div className="bg-white border border-slate-200 rounded-none shadow-sm">
            <div className="px-4 py-3 border-b border-slate-200 bg-[#f8f9fc] flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#6f42c1]" />
              <h2 className="text-sm font-bold text-[#6f42c1]">Release Control</h2>
            </div>
            <div className="p-4 space-y-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <div className="relative">
                  <input type="checkbox" className="sr-only" defaultChecked />
                  <div className="w-10 h-6 bg-[#0d6efd] rounded-none flex items-center p-1">
                    <div className="w-4 h-4 bg-white rounded-none translate-x-4"></div>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800">Results released to parents</div>
                  <div className="text-xs text-slate-400">Turn OFF to withhold all results for this exam (overrides the report card / marksheet publish).</div>
                </div>
              </label>

              <div className="space-y-1 relative pt-2">
                <label className="text-xs font-bold text-slate-500">Scheduled release <span className="font-normal">(optional — hide until this time)</span></label>
                <input type="text" placeholder="dd-mm-yyyy --:--" className="w-full pl-3 pr-10 py-2 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#6f42c1]" />
              </div>
            </div>
          </div>

          {/* Fee-Defaulter Lock */}
          <div className="bg-white border border-slate-200 rounded-none shadow-sm">
            <div className="px-4 py-3 border-b border-slate-200 bg-[#f8f9fc] flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-[#fd7e14]" />
              <h2 className="text-sm font-bold text-[#fd7e14]">Fee-Defaulter Lock</h2>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Lock mode</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#6f42c1] bg-white">
                  <option>Off</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Max allowed due</label>
                <div className="flex">
                  <span className="px-3 py-2 border border-r-0 border-slate-300 bg-slate-50 text-slate-500 rounded-l text-sm">₹</span>
                  <input type="text" defaultValue="0" className="w-full px-3 py-2 border border-slate-300 rounded-r text-sm text-slate-700 focus:outline-none focus:border-[#6f42c1]" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Result Snapshot */}
          <div className="bg-white border border-slate-200 rounded-none shadow-sm">
            <div className="px-4 py-3 border-b border-slate-200 bg-[#f8f9fc] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#6f42c1]" />
                <h2 className="text-sm font-bold text-[#6f42c1]">Result Snapshot</h2>
              </div>
              <button className="px-3 py-1 bg-white border border-slate-300 text-slate-700 font-bold text-xs rounded-none shadow-sm hover:bg-slate-50 flex items-center gap-2 cursor-pointer">
                <RefreshCw className="w-3.5 h-3.5" /> Recompute
              </button>
            </div>
            <div className="p-4">
              <div className="text-sm font-bold text-slate-800">281 current student result(s) frozen for this exam.</div>
              <div className="text-xs text-slate-500 mt-1">Recompute after entering or correcting marks. Locked snapshots create a new "Revised Result" version.</div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Public Result Portal */}
          <div className="bg-white border border-slate-200 rounded-none shadow-sm">
            <div className="px-4 py-3 border-b border-slate-200 bg-[#f8f9fc] flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#10b981]" />
              <h2 className="text-sm font-bold text-[#10b981]">Public Result Portal</h2>
            </div>
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-3.5 h-3.5 rounded-none border-slate-300 text-[#0d6efd]" />
                  <span className="text-xs font-bold text-slate-700">Enable public lookup (Admission No + DOB)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-3.5 h-3.5 rounded-none border-slate-300 text-[#0d6efd]" />
                  <span className="text-xs font-bold text-slate-700">Show toppers / merit list publicly</span>
                </label>
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Rank to display</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#6f42c1] bg-white">
                  <option>By total marks</option>
                </select>
              </div>
              <div className="text-[10px] text-slate-400">Public lookup uses <strong>Admission No + Date of Birth</strong>. Frozen snapshots: 281.</div>
            </div>
          </div>

          {/* Per-Student Result Holds */}
          <div className="bg-white border border-slate-200 rounded-none shadow-sm">
            <div className="px-4 py-3 border-b border-slate-200 bg-[#f8f9fc] flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#dc3545]" />
              <h2 className="text-sm font-bold text-[#dc3545]">Per-Student Result Holds</h2>
            </div>
            <div className="p-4">
              <div className="flex gap-2 items-end mb-4">
                <div className="flex-1 space-y-1">
                  <input type="text" placeholder="Admission No" className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#6f42c1]" />
                </div>
                <div className="flex-1 space-y-1">
                  <input type="text" placeholder="Reason (optional)" className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#6f42c1]" />
                </div>
                <button className="px-4 py-2 bg-[#dc3545] hover:bg-[#c82333] text-white font-bold text-sm rounded-none shadow-sm flex items-center gap-2 cursor-pointer transition-colors border-none h-[38px]">
                  <XCircle className="w-4 h-4" /> Place Hold
                </button>
              </div>
              <div className="text-xs text-slate-400 py-2">
                No active result holds.
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="mt-6 flex justify-end">
        <button className="px-6 py-2 bg-[#5b5fcf] hover:bg-[#4a4db5] text-white font-bold text-sm rounded-none shadow-sm flex items-center gap-2 cursor-pointer transition-colors border-none">
          <Save className="w-4 h-4" /> Save Settings
        </button>
      </div>
    </div>
  );
}
