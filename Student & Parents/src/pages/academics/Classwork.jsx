import React from 'react';
import { Calendar, Filter, FolderClosed } from 'lucide-react';

export default function Classwork() {
  return (
    <div className="p-4 md:p-6 max-w-[1200px] mx-auto space-y-5">
      <h1 className="text-[22px] font-bold text-gray-800 tracking-tight">Classwork & Logbook</h1>
      
      {/* Top Filter Bar */}
      <div className="bg-white border border-gray-200 rounded-lg py-2 px-3 flex flex-col md:flex-row items-center gap-3">
        {/* Date */}
        <div className="flex-1 w-full relative border border-gray-300 rounded px-3 py-1.5 focus-within:border-blue-500">
           <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Date</label>
           <div className="flex items-center justify-between">
              <input type="text" placeholder="mm/dd/yyyy" className="outline-none text-sm w-full text-gray-700 placeholder-gray-400 bg-transparent" />
              <Calendar className="w-4 h-4 text-gray-400" />
           </div>
        </div>
        
        {/* Subject */}
        <div className="flex-1 w-full relative border border-gray-300 rounded px-3 py-1.5 focus-within:border-blue-500">
           <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Subject</label>
           <select className="w-full text-sm outline-none bg-transparent text-gray-700 cursor-pointer">
              <option>All Subjects</option>
           </select>
        </div>
        
        {/* Filter Btn */}
        <button className="md:w-32 w-full h-[52px] bg-[#5b21b6] hover:bg-[#4c1d95] transition-colors text-white font-bold rounded flex items-center justify-center gap-2 text-sm shadow-sm">
           <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      {/* Main Empty State */}
      <div className="bg-white border border-gray-200 rounded-lg min-h-[400px] flex flex-col items-center justify-center shadow-sm">
         <div className="w-[60px] h-[60px] bg-indigo-50 rounded-full flex items-center justify-center mb-4">
            <FolderClosed className="w-7 h-7 text-[#6366f1]" strokeWidth={2} />
         </div>
         <h2 className="text-[17px] font-bold text-gray-800 mb-1.5">No entries found</h2>
         <p className="text-[13px] text-gray-400 text-center">There are no classwork or logbook entries for the selected filters.</p>
      </div>
    </div>
  );
}
