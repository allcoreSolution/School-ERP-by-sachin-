import React, { useState } from 'react';
import { 
  X, Wand2, Calendar, Plus, X as XIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function QuickExamSetup() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#f0f2f5] rounded-none shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-white px-6 py-4 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-none bg-[#6f42c1] text-white flex items-center justify-center shadow-sm">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800 leading-tight">Quick Exam Setup</h2>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">EXAM + MARK DISTRIBUTION</div>
            </div>
          </div>
          <button 
            onClick={() => navigate(-1)}
            className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer bg-transparent border-none"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Step 1 */}
          <div className="bg-white border border-slate-200 rounded-none overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-100 flex items-start gap-3 bg-[#f8f9fc]">
              <div className="w-6 h-6 rounded-none bg-[#6f42c1] text-white flex items-center justify-center font-bold text-xs shrink-0">
                1
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">Exam details</h3>
                <p className="text-xs text-slate-500">Name the exam and set its date range.</p>
              </div>
            </div>
            <div className="p-5 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Exam name</label>
                <input 
                  type="text" 
                  defaultValue="Half-Yearly Examination 2026-2027"
                  className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#6f42c1]"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5 relative">
                  <label className="text-xs font-bold text-slate-700">Start date</label>
                  <input 
                    type="text" 
                    defaultValue="01-04-2026"
                    className="w-full pl-3 pr-10 py-2 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#6f42c1]"
                  />
                  <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-8" />
                </div>
                <div className="space-y-1.5 relative">
                  <label className="text-xs font-bold text-slate-700">End date</label>
                  <input 
                    type="text" 
                    defaultValue="01-04-2026"
                    className="w-full pl-3 pr-10 py-2 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#6f42c1]"
                  />
                  <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-8" />
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white border border-slate-200 rounded-none overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-100 flex items-start gap-3 bg-[#f8f9fc]">
              <div className="w-6 h-6 rounded-none bg-[#6f42c1] text-white flex items-center justify-center font-bold text-xs shrink-0">
                2
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">How is each subject marked?</h3>
                <p className="text-xs text-slate-500">Add every component a subject carries — Theory, Practical, Periodic Test, Notebook, SEA... as many as you need.</p>
              </div>
            </div>
            <div className="p-5 border-b border-slate-100">
              <div className="text-xs text-slate-500 mb-2">Quick fill:</div>
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-none hover:bg-slate-100 text-left cursor-pointer">
                  <div className="text-xs font-bold text-slate-700">Single Paper</div>
                  <div className="text-[10px] text-slate-400">100 / pass 33</div>
                </button>
                <button className="px-4 py-2 bg-[#f0f4f8] border border-blue-200 rounded-none text-left cursor-pointer shadow-sm">
                  <div className="text-xs font-bold text-slate-800">Theory + Practical</div>
                  <div className="text-[10px] text-slate-500">80 + 20</div>
                </button>
                <button className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-none hover:bg-slate-100 text-left cursor-pointer">
                  <div className="text-xs font-bold text-slate-700">CBSE Term (PT + NB + SEA + Exam)</div>
                  <div className="text-[10px] text-slate-400">10 + 5 + 5 + 80</div>
                </button>
              </div>
            </div>
            
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-12 gap-3 items-end">
                <div className="col-span-12 md:col-span-5 space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">COMPONENT</label>
                  <input type="text" defaultValue="Written Exam" className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm focus:outline-none focus:border-[#6f42c1]" />
                </div>
                <div className="col-span-12 md:col-span-3 space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">SHORT CODE</label>
                  <input type="text" defaultValue="WE" className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm focus:outline-none focus:border-[#6f42c1]" />
                </div>
                <div className="col-span-5 md:col-span-1.5 space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">MAX</label>
                  <input type="text" defaultValue="100" className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm focus:outline-none focus:border-[#6f42c1]" />
                </div>
                <div className="col-span-5 md:col-span-1.5 space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">PASS</label>
                  <input type="text" defaultValue="33" className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm focus:outline-none focus:border-[#6f42c1]" />
                </div>
                <div className="col-span-2 md:col-span-1 flex items-center justify-center pb-2">
                  <button className="text-slate-300 hover:text-red-500 cursor-pointer bg-transparent border-none">
                    <XIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex justify-center items-center py-4 text-sm">
                <span className="text-slate-500">Total maximum</span>
                <span className="font-black text-slate-800 ml-2">100</span>
              </div>

              <button className="px-4 py-2 border border-dashed border-[#6f42c1] text-[#6f42c1] bg-[#f8f5ff] hover:bg-[#f0ebfa] rounded-none text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors">
                <Plus className="w-4 h-4" /> Add component
              </button>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white border border-slate-200 rounded-none overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-100 flex items-start gap-3 bg-[#f8f9fc]">
              <div className="w-6 h-6 rounded-none bg-[#6f42c1] text-white flex items-center justify-center font-bold text-xs shrink-0">
                3
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">Which classes sit this exam?</h3>
                <p className="text-xs text-slate-500">The pattern is applied to every subject of each class you pick.</p>
              </div>
            </div>
            <div className="p-5">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-4 cursor-pointer w-max">
                <input type="checkbox" className="w-4 h-4 rounded-none border-slate-300 text-[#6f42c1] focus:ring-[#6f42c1]" />
                Select all classes
              </label>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {[
                  { name: 'Nursery', sub: '6 subjects' },
                  { name: 'KG', sub: '7 subjects' },
                  { name: 'Class I', sub: '5 subjects' },
                  { name: 'Class II', sub: '5 subjects' },
                  { name: 'Class III', sub: '5 subjects' },
                  { name: 'Class IV', sub: '5 subjects' },
                  { name: 'Class V', sub: '5 subjects' },
                  { name: 'Class VI', sub: '5 subjects' },
                  { name: 'Class VII', sub: '5 subjects' },
                  { name: 'Class VIII', sub: '5 subjects' },
                  { name: 'Class IX', sub: '8 subjects' },
                  { name: 'Class XI', sub: '12 subjects' },
                  { name: 'Class XII', sub: '13 subjects' },
                  { name: 'Class 11 science', sub: '0 subjects', disabled: true },
                  { name: 'KG1', sub: '0 subjects', disabled: true },
                ].map((cls, idx) => (
                  <label key={idx} className={`flex items-start justify-between p-3 border rounded-none cursor-pointer ${cls.disabled ? 'bg-slate-50 border-slate-100 opacity-60' : 'bg-white border-slate-200 hover:border-[#6f42c1] hover:shadow-sm transition-all'}`}>
                    <div>
                      <div className="text-xs font-bold text-slate-800">{cls.name}</div>
                      <div className="text-[10px] text-slate-500">{cls.sub}</div>
                    </div>
                    <input type="checkbox" disabled={cls.disabled} className="mt-1 w-3.5 h-3.5 rounded-none border-slate-300 text-[#6f42c1]" />
                  </label>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-white px-6 py-4 border-t border-slate-200 flex justify-end shrink-0">
          <button className="px-6 py-2.5 bg-[#4facfe] hover:bg-[#3b9be8] text-white font-bold text-sm rounded-none shadow-sm flex items-center gap-2 border-none cursor-pointer">
             Create Exam & Mark Setup
          </button>
        </div>
      </div>
    </div>
  );
}
