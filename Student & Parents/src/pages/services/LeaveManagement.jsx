import React from 'react';
import { FileWarning, Plus, History } from 'lucide-react';

export default function LeaveManagement() {
  return (
    <div className="h-full flex flex-col p-6 overflow-hidden">
      
      {/* HEADER */}
      <div className="flex items-center justify-between flex-shrink-0 mb-6">
        <div>
          <h1 className="text-[22px] font-black uppercase text-gray-800 tracking-tighter leading-none">
            Leave Management
          </h1>
          <p className="text-[11px] font-bold text-gray-400 tracking-widest uppercase mt-1">
            Submit & Track Attendance Absences
          </p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-none flex items-center gap-2 text-[11px] font-black uppercase tracking-widest shadow-sm transition-colors border border-transparent shadow-[3px_3px_0px_0px_rgba(79,70,229,0.3)] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
          <Plus className="w-4 h-4" /> Apply Leave
        </button>
      </div>

      <div className="flex-1 grid grid-cols-3 gap-6 overflow-hidden">
         {/* LEFT/MAIN PANE: History */}
         <div className="col-span-2 bg-white border border-gray-200 shadow-sm flex flex-col h-full overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-200 px-5 py-4 flex items-center gap-2">
               <History className="w-4 h-4 text-indigo-600" />
               <h2 className="text-[12px] font-black text-gray-700 tracking-widest uppercase">Application History</h2>
            </div>
            
            <div className="flex-1 overflow-auto p-5">
               <div className="border border-gray-200 rounded-none mb-4">
                  <div className="bg-orange-50 border-b border-gray-200 px-4 py-3 flex justify-between items-center">
                     <span className="text-[10px] font-black uppercase tracking-widest text-orange-600 px-2 py-0.5 bg-orange-100 border border-orange-200">Pending Review</span>
                     <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Oct 12, 2026</span>
                  </div>
                  <div className="p-4">
                     <h3 className="text-[13px] font-black text-gray-800">Fever & Medical Checkup</h3>
                     <p className="text-[11px] text-gray-500 font-medium mt-1 leading-relaxed">Requesting 2 days leave due to viral fever. Medical certificate will be provided upon return.</p>
                     <div className="mt-3 flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        <span>From: Oct 14</span>
                        <span>To: Oct 15</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         
         {/* RIGHT PANE: Stats */}
         <div className="col-span-1 bg-white border border-gray-200 shadow-sm flex flex-col">
            <div className="bg-gray-50 border-b border-gray-200 px-5 py-4">
               <h2 className="text-[12px] font-black text-gray-700 tracking-widest uppercase">Leave Balance</h2>
            </div>
            <div className="p-5 flex flex-col gap-4">
               <div className="border border-gray-200 p-4">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Allowed</p>
                  <p className="text-2xl font-black text-gray-800">12</p>
               </div>
               <div className="border border-gray-200 p-4 bg-indigo-50 border-l-4 border-l-indigo-600">
                  <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Leaves Taken</p>
                  <p className="text-2xl font-black text-indigo-700">03</p>
               </div>
               <div className="border border-gray-200 p-4 bg-green-50 border-l-4 border-l-green-600">
                  <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Available</p>
                  <p className="text-2xl font-black text-green-700">09</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
