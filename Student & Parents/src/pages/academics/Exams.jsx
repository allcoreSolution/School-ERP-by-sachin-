import React from 'react';
import { PackageOpen } from 'lucide-react';

export default function Exams() {
  return (
    <div className="p-4 md:p-6 max-w-[1200px] mx-auto space-y-5">
      <h1 className="text-[22px] font-bold text-gray-800 flex items-center gap-2">
        Exams & Reports 
        <span className="text-gray-400 font-medium text-[20px] ml-1">| Rajesh Singh</span>
      </h1>

      <div className="bg-white rounded-[14px] border border-gray-200/80 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
        
        <div className="flex flex-col items-center justify-center p-10 text-center">
          <div className="mb-5 text-gray-300 opacity-80">
             <PackageOpen className="w-24 h-24" strokeWidth={1} />
          </div>
          <h2 className="text-[20px] font-bold text-[#2d3748] mb-2.5 tracking-tight">No Exams Scheduled</h2>
          <p className="text-[14px] text-[#9ca3af] max-w-xl mx-auto leading-relaxed">
            There are currently no upcoming exams or published reports available for this student. Please check back later.
          </p>
        </div>

      </div>
    </div>
  );
}
