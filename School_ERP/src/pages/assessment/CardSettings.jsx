import React from 'react';
import { Lock, FileText, ArrowLeft, PenTool, LayoutTemplate, RefreshCw, Calendar, IndianRupee, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CardSettings() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-10 p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          Admit Card Settings <span className="text-slate-400 font-normal">| Annual Examination</span>
        </h1>
        <button 
          onClick={() => navigate('/offline-exams/manage')}
          className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 font-bold text-xs rounded-none shadow-sm hover:bg-slate-50 flex items-center gap-2 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Admit Cards
        </button>
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
                  <div className="text-sm font-bold text-slate-800">Release admit cards to parents / students</div>
                  <div className="text-xs text-slate-400">When OFF, parents cannot download admit cards from their portal (school office can still print).</div>
                </div>
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1 relative">
                  <label className="text-xs font-bold text-slate-500">Available from <span className="font-normal">(optional)</span></label>
                  <input type="text" defaultValue="01-08-2026 02:41" className="w-full pl-3 pr-10 py-2 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#6f42c1]" />
                  <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-7" />
                </div>
                <div className="space-y-1 relative">
                  <label className="text-xs font-bold text-slate-500">Available until <span className="font-normal">(optional)</span></label>
                  <input type="text" defaultValue="31-08-2026 02:41" className="w-full pl-3 pr-10 py-2 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#6f42c1]" />
                  <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-7" />
                </div>
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
                  <option>Off — no fee check</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Max allowed due</label>
                <div className="flex">
                  <span className="px-3 py-2 border border-r-0 border-slate-300 bg-slate-50 text-slate-500 rounded-l text-sm">₹</span>
                  <input type="text" defaultValue="0" className="w-full px-3 py-2 border border-slate-300 rounded-r text-sm text-slate-700 focus:outline-none focus:border-[#6f42c1]" />
                </div>
                <div className="text-[10px] text-slate-400 mt-1">Students owing more than this are locked.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Admit Card Design */}
          <div className="bg-white border border-slate-200 rounded-none shadow-sm">
            <div className="px-4 py-3 border-b border-slate-200 bg-[#f8f9fc] flex items-center gap-2">
              <PenTool className="w-4 h-4 text-[#6f42c1]" />
              <h2 className="text-sm font-bold text-[#6f42c1]">Admit Card Design</h2>
            </div>
            <div className="p-4 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Design used for this exam</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#6f42c1] bg-white">
                  <option>Use the school default — Classic Admit Card</option>
                </select>
                <div className="text-[10px] text-slate-400 mt-1">The layout, logo placement and wording all come from the design. The fields below fill it in.</div>
              </div>
              <label className="flex items-start gap-2 cursor-pointer mt-2">
                <input type="checkbox" className="mt-0.5 w-3.5 h-3.5 rounded-none border-slate-300 text-[#6f42c1]" />
                <div>
                  <div className="text-xs font-bold text-slate-700">Also make this the school default</div>
                  <div className="text-[10px] text-slate-400">Every other exam that hasn't chosen its own design will use it.</div>
                </div>
              </label>
              <div className="flex flex-wrap gap-2 pt-2">
                <button className="px-3 py-1.5 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 rounded-none text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer transition-colors">
                  <LayoutTemplate className="w-3.5 h-3.5" /> Preview
                </button>
                <button className="px-3 py-1.5 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 rounded-none text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer transition-colors">
                  <PenTool className="w-3.5 h-3.5" /> Edit this design
                </button>
                <button className="px-3 py-1.5 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 rounded-none text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer transition-colors">
                  + Create a new design
                </button>
              </div>
            </div>
          </div>

          {/* Admit Card Content */}
          <div className="bg-white border border-slate-200 rounded-none shadow-sm">
            <div className="px-4 py-3 border-b border-slate-200 bg-[#f8f9fc] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#6f42c1]" />
              <h2 className="text-sm font-bold text-[#6f42c1]">Admit Card Content</h2>
            </div>
            <div className="p-4 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Instructions for candidates</label>
                <textarea rows="3" placeholder="e.g. Carry this admit card and a valid ID. Reach the centre 30 minutes early." className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#6f42c1] resize-none"></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">Reporting time</label>
                  <input type="text" defaultValue="09:30 AM" className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#6f42c1]" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">Exam centre</label>
                  <input type="text" defaultValue="Main Campus" className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#6f42c1]" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">Principal name</label>
                  <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#6f42c1]" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">Controller of Exams</label>
                  <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#6f42c1]" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Hall-ticket prefix <span className="font-normal">(optional)</span></label>
                <input type="text" placeholder="e.g. YIS2026/" className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#6f42c1]" />
              </div>
              <div className="space-y-2 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-3.5 h-3.5 rounded-none border-slate-300 text-[#0d6efd]" />
                  <span className="text-xs font-bold text-slate-700">Show student photo</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-3.5 h-3.5 rounded-none border-slate-300 text-[#0d6efd]" />
                  <span className="text-xs font-bold text-slate-700">Show signature lines</span>
                </label>
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
