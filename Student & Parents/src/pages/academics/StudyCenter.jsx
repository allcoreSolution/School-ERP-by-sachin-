import React, { useState } from 'react';
import { BookOpen, FolderTree, Folder, Search, GraduationCap } from 'lucide-react';

export default function StudyCenter() {
  const [tab, setTab] = useState('Syllabus View');

  return (
    <div className="p-4 md:p-6 max-w-[1200px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Syllabus & Study Materials</h1>
           <p className="text-[13px] text-gray-500 mt-1">Access academic syllabus, chapter notes, and study resources for Rajesh Singh</p>
        </div>
        <div className="self-start md:self-auto bg-[#0ea5e9] text-white px-3.5 py-1.5 rounded-full flex items-center gap-1.5 text-[11px] font-bold shadow-sm cursor-default">
          <GraduationCap className="w-4 h-4" /> Class II - A
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <div className="bg-[#7c3aed] text-white rounded-lg p-5 relative overflow-hidden shadow-sm">
            <h3 className="text-[10px] font-bold tracking-widest opacity-90 mb-2 uppercase">Syllabus Subjects</h3>
            <p className="text-[32px] font-extrabold leading-none">0</p>
            <div className="absolute top-1/2 -translate-y-1/2 right-5 w-12 h-12 bg-white/20 rounded flex items-center justify-center shadow-inner">
               <BookOpen className="w-6 h-6 text-white" />
            </div>
         </div>
         <div className="bg-[#10b981] text-white rounded-lg p-5 relative overflow-hidden shadow-sm">
            <h3 className="text-[10px] font-bold tracking-widest opacity-90 mb-2 uppercase">Total Topics</h3>
            <p className="text-[32px] font-extrabold leading-none">0</p>
            <div className="absolute top-1/2 -translate-y-1/2 right-5 w-12 h-12 bg-white/20 rounded flex items-center justify-center shadow-inner">
               <FolderTree className="w-6 h-6 text-white" />
            </div>
         </div>
         <div className="bg-[#3b82f6] text-white rounded-lg p-5 relative overflow-hidden shadow-sm">
            <h3 className="text-[10px] font-bold tracking-widest opacity-90 mb-2 uppercase">General Resources</h3>
            <p className="text-[32px] font-extrabold leading-none">0</p>
            <div className="absolute top-1/2 -translate-y-1/2 right-5 w-12 h-12 bg-white/20 rounded flex items-center justify-center shadow-inner">
               <Folder className="w-6 h-6 text-white" />
            </div>
         </div>
      </div>

      {/* Search Filter */}
      <div className="relative border border-gray-200 rounded-lg bg-white overflow-hidden shadow-[0_2px_10px_-3px_rgba(0,0,0,0.03)] focus-within:border-blue-400 transition-colors">
         <Search className="w-[18px] h-[18px] text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
         <input type="text" placeholder="Search syllabus chapters, topic titles or resource names..." className="w-full pl-[46px] pr-4 py-3.5 outline-none text-[13px] text-gray-700 placeholder-gray-400 bg-transparent" />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 pb-2">
         <button onClick={() => setTab('Syllabus View')} className={`flex items-center gap-2 px-4 py-2 rounded text-[13.5px] font-bold transition-colors shadow-sm ${tab === 'Syllabus View' ? 'bg-[#5b21b6] text-white' : 'bg-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100/70 shadow-none'}`}>
            <BookOpen className="w-[18px] h-[18px]" strokeWidth={2.5} /> Syllabus View
         </button>
         <button onClick={() => setTab('General Resources')} className={`flex items-center gap-2 px-4 py-2 rounded text-[13.5px] font-bold transition-colors shadow-sm ${tab === 'General Resources' ? 'bg-[#5b21b6] text-white' : 'bg-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100/70 shadow-none'}`}>
            <Folder className="w-[18px] h-[18px]" strokeWidth={2.5} /> General Resources
         </button>
      </div>

      {/* Empty State */}
      <div className="bg-white border border-gray-200 rounded-lg min-h-[320px] shadow-[0_2px_8px_-3px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center">
         <div className="mb-4 text-gray-500 opacity-80">
            <BookOpen className="w-12 h-12" strokeWidth={1.5} />
         </div>
         <p className="text-[13.5px] font-bold text-gray-600">The syllabus for your class has not been configured yet.</p>
      </div>

    </div>
  );
}
