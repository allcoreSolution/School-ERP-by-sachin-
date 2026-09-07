import React from 'react';
import { Bed, Building2 } from 'lucide-react';

export default function Hostel() {
  return (
    <div className="p-4 md:p-6 max-w-[1400px] mx-auto min-h-screen bg-[#f8f9fa] space-y-6">
      
      {/* Page Title */}
      <div className="flex items-center justify-between">
         <h1 className="text-[22px] font-bold text-[#1f2937] tracking-tight">Hostel Details</h1>
      </div>
      
      {/* Main Card */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-none w-full max-w-[1000px]">
         
         {/* Card Header */}
         <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-100 bg-white">
            <Bed className="w-5 h-5 text-indigo-800" strokeWidth={2.5}/>
            <h2 className="text-[15px] font-extrabold text-[#1e1b4b] tracking-tight">Room Allocation Information</h2>
         </div>

         {/* Middle Section (Hostel Base Info) */}
         <div className="px-5 py-4 bg-[#fcfcfd] border-b border-gray-100 flex items-center gap-4">
            
            {/* Building Icon Box */}
            <div className="w-[46px] h-[46px] flex-shrink-0 bg-indigo-50 flex items-center justify-center rounded-none shadow-sm border border-indigo-100/50">
               <Building2 className="w-[22px] h-[22px] text-indigo-600" />
            </div>

            <div className="flex flex-col gap-1.5">
               <h3 className="font-extrabold text-[15px] text-gray-900 tracking-tight leading-none">ABC Hostel</h3>
               <div className="flex items-center gap-2">
                  <span className="bg-[#f5f3ff] text-[#5b21b6] text-[10px] font-bold px-2 py-0.5 rounded-none border border-[#ede9fe] tracking-wide">
                     Room 1
                  </span>
                  <span className="bg-[#f5f3ff] text-[#5b21b6] text-[10px] font-bold px-2 py-0.5 rounded-none border border-[#ede9fe] tracking-wide">
                     AC
                  </span>
               </div>
            </div>
         </div>

         {/* Bottom Section (Details Grid) */}
         <div className="px-5 py-5 space-y-6 bg-white min-h-[300px]">
            
            {/* Detail Block 1 */}
            <div className="flex flex-col">
               <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Allocated On</span>
               <span className="text-[13px] font-medium text-gray-800 tracking-wide">21 Jul, 2026</span>
            </div>

            {/* Detail Block 2 */}
            <div className="flex flex-col">
               <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Hostel Address</span>
               <span className="text-[13px] font-medium text-gray-800 tracking-wide">TEST address</span>
            </div>

         </div>

      </div>

    </div>
  );
}
