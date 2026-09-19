import React from 'react';
import { 
  FileText, PlayCircle, Edit3, Database, Bell, Edit, ArrowRight,
  HelpCircle, Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function OnlineExamDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans">
      <div className="p-6 max-w-[1400px] mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
          <h1 className="text-[28px] font-medium text-slate-800 tracking-tight">Online examinations</h1>
          
          <div className="flex flex-wrap items-center gap-3">
            <button className="px-4 py-2 bg-white text-indigo-700 border border-slate-200 hover:bg-indigo-50 font-semibold text-sm rounded-none flex items-center gap-2 transition-colors">
              <HelpCircle className="w-4 h-4" /> How it works
            </button>
            <button 
              onClick={() => navigate('/online-exams/question-bank')}
              className="px-4 py-2 bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 font-semibold text-sm rounded-none flex items-center gap-2 transition-colors"
            >
              <Database className="w-4 h-4" /> Question bank
            </button>
            <button 
              onClick={() => navigate('/online-exams/manage')}
              className="px-4 py-2 bg-[#5d5fef] hover:bg-[#4b4dec] text-white font-semibold text-sm rounded-none flex items-center gap-2 transition-colors border-none shadow-sm"
            >
              <Plus className="w-4 h-4" /> New paper
            </button>
          </div>
        </div>

        {/* Top 4 Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-[#eef2fe] border border-[#d8e2fd] rounded-none p-5 hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between">
            <div className="w-8 h-8 rounded-none bg-white flex items-center justify-center shadow-sm mb-4">
              <FileText className="w-4 h-4 text-[#4a63e0]" />
            </div>
            <div>
              <div className="text-sm font-semibold text-[#4a63e0] mb-0.5">Live papers</div>
              <div className="text-3xl font-bold text-[#1e3a8a] mb-1">0</div>
              <div className="text-xs text-[#6074b6]">0 drafts</div>
            </div>
          </div>

          <div className="bg-[#e9fbf2] border border-[#c4f1d7] rounded-none p-5 hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between">
            <div className="w-8 h-8 rounded-none bg-white flex items-center justify-center shadow-sm mb-4">
              <PlayCircle className="w-4 h-4 text-[#10b981]" />
            </div>
            <div>
              <div className="text-sm font-semibold text-[#10b981] mb-0.5">Sitting right now</div>
              <div className="text-3xl font-bold text-[#065f46] mb-1">0</div>
              <div className="text-xs text-[#34d399]">nobody is mid-paper</div>
            </div>
          </div>

          <div className="bg-[#fef4e5] border border-[#fce4c4] rounded-none p-5 hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between">
             <div className="w-8 h-8 rounded-none bg-white flex items-center justify-center shadow-sm mb-4">
              <Edit3 className="w-4 h-4 text-[#f59e0b]" />
            </div>
            <div>
              <div className="text-sm font-semibold text-[#d97706] mb-0.5">Awaiting your marking</div>
              <div className="text-3xl font-bold text-[#92400e] mb-1">0</div>
              <div className="text-xs text-[#fbbf24]">nothing waiting</div>
            </div>
          </div>

          <div className="bg-[#f5efff] border border-[#e6d8fd] rounded-none p-5 hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between">
            <div className="w-8 h-8 rounded-none bg-white flex items-center justify-center shadow-sm mb-4">
              <Database className="w-4 h-4 text-[#8b5cf6]" />
            </div>
            <div>
              <div className="text-sm font-semibold text-[#7c3aed] mb-0.5">Question bank</div>
              <div className="text-3xl font-bold text-[#4c1d95] mb-1">0</div>
              <div className="text-xs text-[#a78bfa]">0 types · 0 topics</div>
            </div>
          </div>

        </div>

        {/* Middle Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column (Needs Attention & Module Capabilities) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Needs Attention */}
            <div className="bg-white border border-slate-200 rounded-none shadow-sm overflow-hidden">
              <div className="bg-white px-5 py-4 border-b border-slate-100 flex items-center gap-2">
                <Bell className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-800 text-[15px]">Needs attention</h3>
              </div>
              <div className="p-5 flex items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-none bg-slate-100 flex items-center justify-center shrink-0">
                    <Edit className="w-5 h-5 text-slate-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">All caught up</h4>
                    <p className="text-sm text-slate-500">No papers need attention right now.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Module Capabilities */}
            <div className="bg-white border border-slate-200 rounded-none shadow-sm outline outline-1 outline-offset-1 outline-indigo-50">
               <div className="p-5 flex items-center justify-between">
                 <div className="flex items-center gap-2 text-[#db5a42]">
                    <Edit3 className="w-4 h-4" />
                    <span className="font-bold text-slate-800 text-[15px]">Everything this module can do</span>
                 </div>
                 <a href="#" className="text-indigo-600 text-sm font-semibold hover:underline">See how it works</a>
               </div>
               
               <div className="px-5 pb-6">
                 <div className="flex flex-wrap gap-2">
                   {/* Pills */}
                   <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-[#eef2fe] border border-[#d8e2fd] text-xs font-bold text-[#4a63e0]">
                     <Database className="w-3.5 h-3.5" /> 9 question types
                   </span>
                   <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-[#e9fbf2] border border-[#c4f1d7] text-xs font-bold text-[#10b981]">
                     <FileText className="w-3.5 h-3.5" /> Sectioned papers
                   </span>
                   <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-[#f3f0ff] border border-[#eadaff] text-xs font-bold text-[#8b5cf6]">
                     <ArrowRight className="w-3.5 h-3.5" /> Difficulty blueprints
                   </span>
                   <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-[#fef4e5] border border-[#fce4c4] text-xs font-bold text-[#d97706]">
                     <PlayCircle className="w-3.5 h-3.5" /> Randomised variants
                   </span>
                   <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-[#ffebee] border border-[#ffcdd2] text-xs font-bold text-[#f43f5e]">
                     <Edit className="w-3.5 h-3.5" /> Multi-class schedules
                   </span>
                   <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-[#e0f2fe] border border-[#bae6fd] text-xs font-bold text-[#0284c7]">
                     <Bell className="w-3.5 h-3.5" /> Instant practice feedback
                   </span>
                   <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-[#edfae1] border border-[#d3f4b5] text-xs font-bold text-[#65a30d]">
                     <ArrowRight className="w-3.5 h-3.5" /> Adaptive difficulty ladder
                   </span>
                   <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-[#f5f3ff] border border-[#ede9fe] text-xs font-bold text-[#7c3aed]">
                     <Edit3 className="w-3.5 h-3.5" /> Manual grading queue
                   </span>
                   <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-[#fffbeb] border border-[#fef3c7] text-xs font-bold text-[#b45309]">
                     <Database className="w-3.5 h-3.5" /> Item analysis
                   </span>
                   <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-[#fff0f2] border border-[#ffe4e6] text-xs font-bold text-[#e11d48]">
                     <PlayCircle className="w-3.5 h-3.5" /> Answer-key calibration
                   </span>
                   <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-[#ecfeff] border border-[#cffafe] text-xs font-bold text-[#0891b2]">
                     <ArrowRight className="w-3.5 h-3.5" /> One-click re-grade
                   </span>
                   <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-[#ecfdf5] border border-[#d1fae5] text-xs font-bold text-[#059669]">
                     <FileText className="w-3.5 h-3.5" /> CSV exports
                   </span>
                 </div>
               </div>
            </div>
          </div>

          {/* Right Column (What the bank holds) */}
          <div className="bg-white border border-slate-200 rounded-none shadow-sm">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
              <Database className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-slate-800 text-[15px]">What the bank holds</h3>
            </div>
            <div className="p-8 text-center text-slate-500 text-sm font-medium">
              The question bank is currently empty.
            </div>
          </div>
        </div>

        {/* Recent Papers */}
        <div className="bg-white border border-slate-200 rounded-none shadow-sm overflow-hidden">
           <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
             <div className="flex items-center gap-2">
                <Edit className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-800 text-[15px]">Recent papers</h3>
             </div>
             <a href="#" className="text-indigo-600 text-sm font-semibold hover:underline">All papers</a>
           </div>
           
           <div className="overflow-x-auto">
             <table className="w-full text-left bg-white text-sm border-collapse border border-gray-300">

                    <thead><tr className="bg-gray-100">

                    <th className="py-4 px-6 text-xs uppercase tracking-wider border border-gray-300">PAPER</th>
                    <th className="py-4 px-6 text-xs uppercase tracking-wider border border-gray-300">KIND</th>
                    <th className="py-4 px-6 text-xs uppercase tracking-wider border border-gray-300">SAT</th>
                    <th className="py-4 px-6 text-xs uppercase tracking-wider border border-gray-300">AVERAGE</th>
                    <th className="py-4 px-6 text-xs uppercase tracking-wider border border-gray-300">HARD BAND</th>
                    <th className="py-4 px-6 border border-gray-300"></th>
                  </tr>
                </thead>
                <tbody className="text-slate-800 font-medium">
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-slate-500 text-sm">
                      No recent papers available.
                    </td>
                  </tr>
                </tbody>
             </table>
           </div>
        </div>

        {/* Adaptive Practice Section */}
        <div className="bg-[#f5f3ff] border border-[#ede9fe] rounded-none shadow-sm p-5 mb-8">
          <div className="flex items-center gap-2 mb-4">
             <div className="w-6 h-6 rounded-none border-2 border-indigo-600 flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-indigo-600 rounded-none"></div>
             </div>
             <h3 className="font-bold text-indigo-900 text-[15px]">Adaptive practice</h3>
             <span className="text-indigo-600 text-xs ml-2">0 students practising · 0 answers · 0% correct overall</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-none px-4 py-3 border border-[#ede9fe]">
               <div className="text-[11px] text-indigo-400 uppercase font-semibold mb-1">Weakest topic, whole school</div>
               <div className="text-sm font-semibold text-slate-800">Not enough practice yet</div>
            </div>
            
            <div className="bg-white rounded-none px-4 py-3 border border-[#ede9fe]">
               <div className="text-[11px] text-indigo-400 uppercase font-semibold mb-1">Students under 40%</div>
               <div className="text-sm font-semibold text-slate-800">0</div>
            </div>
            
            <div className="bg-white rounded-none px-4 py-3 border border-[#ede9fe]">
               <div className="text-[11px] text-indigo-400 uppercase font-semibold mb-1">Answers graded instantly</div>
               <div className="text-sm font-semibold text-slate-800">0</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
