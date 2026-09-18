import React from 'react';
import { 
  LayoutDashboard, Layers, CheckSquare, Settings2, FileText, HelpCircle, Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function OSMNewSession() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-10">
      
      {/* Top Navigation / Header */}
      <div className="bg-white px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Digital Evaluation</h1>
          <p className="text-[11px] text-slate-500 mt-1">On-screen marking of scanned answer sheets — upload, evaluate question-by-question, and report.</p>
        </div>
        <button className="mt-4 md:mt-0 px-4 py-2 bg-[#6f42c1] hover:bg-[#5a32a3] text-white font-bold text-[11px] rounded-none flex items-center gap-2 transition-colors cursor-pointer border-none shadow-sm">
          <Plus className="w-3.5 h-3.5" /> New Session
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white px-6 border-b border-slate-200 flex items-center gap-6 text-[12px] font-bold">
        <button onClick={() => navigate('/osm-module/dashboard')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">
          <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
        </button>
        <button onClick={() => navigate('/osm-module/sessions')} className="flex items-center gap-2 py-3 text-slate-800 border-b-2 border-slate-800 cursor-pointer">
          <Layers className="w-3.5 h-3.5" /> Sessions
        </button>
        <button onClick={() => navigate('/osm-module/evaluate')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">
          <CheckSquare className="w-3.5 h-3.5" /> Evaluate
        </button>
        <button onClick={() => navigate('/osm-module/moderation')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">
          <Settings2 className="w-3.5 h-3.5" /> Moderation
        </button>
        <button onClick={() => navigate('/osm-module/reports')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">
          <FileText className="w-3.5 h-3.5" /> Reports
        </button>
        <button className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">
          <HelpCircle className="w-3.5 h-3.5" /> Guide
        </button>
      </div>

      <div className="p-6 max-w-[1200px] mx-auto space-y-6">
        
        {/* Form Container */}
        <div className="bg-white border border-slate-200 rounded-none shadow-sm">
          <div className="px-5 py-4 border-b border-slate-200">
            <h2 className="text-sm font-bold text-slate-800">New Evaluation Session</h2>
          </div>
          
          <div className="p-6 space-y-6">
            
            {/* Row 1: Title & Total Marks */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Title <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  placeholder="e.g. Term 1 - Mathematics - Class 10A"
                  className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm focus:outline-none focus:border-[#6f42c1]"
                />
              </div>
              <div className="w-full md:w-1/3">
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Total Marks</label>
                <input 
                  type="text" 
                  value="0"
                  readOnly
                  className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm bg-slate-50 text-slate-500 focus:outline-none"
                />
                <p className="text-[10px] text-slate-400 mt-1">Auto-recalculated when you save the question paper.</p>
              </div>
            </div>

            {/* Row 2: Class, Section, Subject */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Class <span className="text-red-500">*</span></label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm focus:outline-none focus:border-[#6f42c1] bg-white text-slate-600">
                  <option>-- Select Class --</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Section</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm focus:outline-none focus:border-[#6f42c1] bg-white text-slate-600">
                  <option>-- All sections --</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Subject <span className="text-red-500">*</span></label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm focus:outline-none focus:border-[#6f42c1] bg-white text-slate-600">
                  <option>-- Select Subject --</option>
                </select>
              </div>
            </div>

            {/* Row 3: Linked Exam, Exam Type, Deadline */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Linked Exam <span className="text-slate-400 font-normal">(optional)</span></label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm focus:outline-none focus:border-[#6f42c1] bg-white text-slate-600">
                  <option>— Standalone (no exam link) —</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Exam Type <span className="text-slate-400 font-normal">(for report-card sync)</span></label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm focus:outline-none focus:border-[#6f42c1] bg-white text-slate-600">
                  <option>—</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Evaluation Deadline</label>
                <input 
                  type="date" 
                  className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm focus:outline-none focus:border-[#6f42c1] text-slate-600"
                />
              </div>
            </div>

            {/* Row 4: Moderation, Report Card, Parent Portal */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Moderation</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm focus:outline-none focus:border-[#6f42c1] bg-white text-slate-600 mb-1">
                  <option>None — evaluator marks are final</option>
                </select>
                <p className="text-[10px] text-slate-500 leading-tight">When enabled, evaluated papers wait for a moderator to approve or override before they're finalized.</p>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">Report Card</label>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-4 bg-slate-300 rounded-none relative cursor-pointer">
                    <div className="w-3.5 h-3.5 bg-white rounded-none absolute top-[1px] left-[2px]"></div>
                  </div>
                  <span className="text-xs font-bold text-slate-700">Allow sync to report card (exam marks)</span>
                </div>
                <p className="text-[10px] text-slate-500">Requires a linked Exam + Exam Type. Sync is triggered from the session page.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">Parent Portal</label>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-4 bg-slate-300 rounded-none relative cursor-pointer">
                    <div className="w-3.5 h-3.5 bg-white rounded-none absolute top-[1px] left-[2px]"></div>
                  </div>
                  <span className="text-xs font-bold text-slate-700">Show evaluated copy to parents</span>
                </div>
                <p className="text-[10px] text-slate-500">Parents see finalized papers + per-question marks for their child.</p>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Additional Settings Toggles */}
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-4 bg-slate-300 rounded-none relative cursor-pointer">
                  <div className="w-3.5 h-3.5 bg-white rounded-none absolute top-[1px] left-[2px]"></div>
                </div>
                <span className="text-xs font-bold text-slate-700">Anonymous evaluation <span className="text-slate-500 font-normal">(hide student identity from evaluators — coded papers)</span></span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-4 bg-[#007bff] rounded-none relative cursor-pointer">
                  <div className="w-3.5 h-3.5 bg-white rounded-none absolute top-[1px] right-[2px]"></div>
                </div>
                <span className="text-xs font-bold text-slate-700">Allow on-image annotations <span className="text-slate-500 font-normal">(Phase 2)</span></span>
              </div>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3 rounded-b-lg">
            <button 
              onClick={() => navigate('/osm-module/dashboard')}
              className="px-5 py-2 bg-white border border-slate-300 text-slate-700 font-bold text-xs rounded-none hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button className="px-5 py-2 bg-[#6f42c1] hover:bg-[#5a32a3] text-white font-bold text-xs rounded-none shadow-sm flex items-center gap-2 transition-colors border-none cursor-pointer">
              <Plus className="w-3.5 h-3.5" /> Create Session
            </button>
          </div>
          
        </div>

      </div>
    </div>
  );
}
