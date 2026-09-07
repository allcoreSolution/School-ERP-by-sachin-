import React from 'react';
import { Clock, Check, History, Folder } from 'lucide-react';

export default function Homework() {
  return (
    <div className="p-4 md:p-6 max-w-[1200px] mx-auto space-y-6">
      <h1 className="text-[22px] font-bold text-[#1f2937] tracking-tight">Homework & Assignments</h1>
      
      {/* Pending Assignments */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-[0_2px_8px_-3px_rgba(0,0,0,0.04)] flex flex-col min-h-[300px]">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2.5">
           <Clock className="w-4 h-4 text-indigo-600" />
           <span className="font-bold text-[#1f2937] text-[15px]">Pending Assignments</span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
           <div className="w-[50px] h-[50px] bg-[#f3f0ff] rounded-none flex items-center justify-center mb-3.5">
              <Check className="w-6 h-6 text-[#6366f1]" strokeWidth={2.5} />
           </div>
           <h3 className="text-[15px] font-bold text-[#1f2937] mb-1">All caught up</h3>
           <p className="text-[12.5px] text-[#9ca3af]">No pending homework assignments.</p>
        </div>
      </div>

      {/* Past Assignments */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-[0_2px_8px_-3px_rgba(0,0,0,0.04)] flex flex-col min-h-[380px]">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2.5">
           <History className="w-4 h-4 text-indigo-600" />
           <span className="font-bold text-[#1f2937] text-[15px]">Past Assignments</span>
        </div>
        
        {/* Table representation */}
        <table className="w-full text-left border-collapse border border-gray-300">
           <thead className="bg-indigo-50 border-b border-gray-300 text-[10px] uppercase font-bold text-indigo-700 tracking-widest text-center">
             <tr>
               <th className="py-3.5 px-4 border border-gray-300">Subject</th>
               <th className="py-3.5 px-4 border border-gray-300">Assignment Title</th>
               <th className="py-3.5 px-4 border border-gray-300">Due Date</th>
               <th className="py-3.5 px-4 border border-gray-300">Status</th>
               <th className="py-3.5 px-4 border border-gray-300">Marks</th>
             </tr>
           </thead>
           <tbody>
             <tr>
               <td colSpan={5} className="p-0 border border-gray-300">
                 <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
                   <div className="w-[50px] h-[50px] bg-[#f3f0ff] rounded-none flex items-center justify-center mb-3.5">
                      <Folder className="w-5 h-5 text-[#6366f1]" />
                   </div>
                   <h3 className="text-[15px] font-bold text-[#1f2937] mb-1">No past assignments</h3>
                   <p className="text-[12.5px] text-[#9ca3af]">Completed and expired assignments will be listed here.</p>
                 </div>
               </td>
             </tr>
           </tbody>
        </table>
      </div>
    </div>
  );
}
