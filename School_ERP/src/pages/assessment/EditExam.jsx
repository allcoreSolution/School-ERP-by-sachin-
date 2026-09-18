import React from 'react';
import { Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function EditExam() {
  const navigate = useNavigate();

  const classes = [
    { name: 'Nursery', checked: true }, { name: 'KG', checked: true }, { name: 'Class I', checked: true }, { name: 'Class II', checked: true },
    { name: 'Class III', checked: true }, { name: 'Class IV', checked: true }, { name: 'Class V', checked: true }, { name: 'Class VI', checked: true },
    { name: 'Class VII', checked: true }, { name: 'Class VIII', checked: true }, { name: 'Class IX', checked: true }, { name: 'Class XI', checked: true },
    { name: 'Class XII', checked: true }, { name: 'Class 11 science', checked: false }, { name: 'KG1', checked: false }, { name: 'c45', checked: false },
    { name: 'Gj', checked: false }, { name: 'Gjgh', checked: false }, { name: 'Class X', checked: true }, { name: '123', checked: false },
    { name: 'ASHWANI DUBEY', checked: false },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-10 p-6">
      <div className="bg-white border border-slate-200 rounded-none shadow-sm">
        <div className="px-6 py-4 border-b border-slate-200">
          <h1 className="text-xl font-bold text-slate-800">Edit Exam</h1>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Exam Name <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              defaultValue="Annual Examination"
              className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#fd7e14] focus:ring-1 focus:ring-[#fd7e14]"
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Academic Session <span className="text-red-500">*</span></label>
            <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#fd7e14] focus:ring-1 focus:ring-[#fd7e14] bg-white">
              <option>2026-2027</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5 relative">
              <label className="text-xs font-bold text-slate-700">Start Date <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                defaultValue="12-07-2026"
                className="w-full pl-3 pr-10 py-2 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#fd7e14] focus:ring-1 focus:ring-[#fd7e14]"
              />
              <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-8" />
            </div>
            <div className="space-y-1.5 relative">
              <label className="text-xs font-bold text-slate-700">End Date <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                defaultValue="12-07-2026"
                className="w-full pl-3 pr-10 py-2 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#fd7e14] focus:ring-1 focus:ring-[#fd7e14]"
              />
              <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-8" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Description</label>
            <textarea 
              rows="3"
              className="w-full px-3 py-2 border border-[#fd7e14] rounded-none text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#fd7e14] resize-none"
            ></textarea>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-800 block">Which classes sit this exam?</label>
              <span className="text-[10px] text-slate-500">Leave everything unticked to apply this exam to <strong>all classes</strong> — that is the default. Tick classes only when the exam is for some of them, e.g. a board practical. This controls which classes appear in Schedule & Marks Setup and Admit Cards.</span>
            </div>
            
            <div className="flex gap-2">
              <button className="px-2 py-0.5 border border-slate-300 text-xs text-slate-600 rounded-none bg-white hover:bg-slate-50 cursor-pointer">Select all</button>
              <button className="px-2 py-0.5 border border-slate-300 text-xs text-slate-600 rounded-none bg-white hover:bg-slate-50 cursor-pointer">Clear</button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-6 mt-2">
              {classes.map((cls, idx) => (
                <label key={idx} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked={cls.checked} className="w-3.5 h-3.5 rounded-none border-slate-300 text-[#0d6efd] focus:ring-0" />
                  <span className="text-xs font-bold text-slate-700">{cls.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button 
              onClick={() => navigate('/offline-exams/manage')}
              className="px-5 py-2 bg-[#fd7e14] hover:bg-[#e8700d] text-white font-bold text-sm rounded-none shadow-sm transition-colors border-none cursor-pointer"
            >
              Update Exam
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
