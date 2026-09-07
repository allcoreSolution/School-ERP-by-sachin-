import React from 'react';
import { Handshake } from 'lucide-react';

export default function Meetings() {
  return (
    <div className="p-4 md:p-6 max-w-[1200px] mx-auto space-y-5">
      <div>
        <h1 className="text-[22px] font-bold text-[#1f2937] tracking-tight">Parent-Teacher Meetings</h1>
        <p className="text-[#9ca3af] text-[14px] mt-0.5">For Rajesh Singh</p>
      </div>

      <div className="bg-white rounded-[14px] border border-gray-200/80 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
        
        <div className="flex flex-col items-center justify-center p-10 text-center">
          <div className="mb-5 text-gray-300 opacity-80 flex justify-center">
             <Handshake className="w-24 h-24" strokeWidth={1} />
          </div>
          <h2 className="text-[20px] font-bold text-[#2d3748] mb-2.5 tracking-tight">No meetings yet</h2>
          <p className="text-[14px] text-[#9ca3af] max-w-xl mx-auto leading-relaxed">
            When the school schedules a Parent-Teacher Meeting for Rajesh, it will appear here.
          </p>
        </div>

      </div>
    </div>
  );
}
