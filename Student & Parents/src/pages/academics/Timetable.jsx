import React from 'react';
import { CalendarDays, CalendarX2 } from 'lucide-react';

export default function Timetable() {
  return (
    <div className="p-4 md:p-6 max-w-[1200px] mx-auto space-y-6 min-h-[calc(100vh-80px)]">
      <h1 className="text-2xl font-bold text-gray-800">Class Timetable for Rajesh Singh</h1>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)]" style={{ minHeight: '400px' }}>
        
        {/* Card Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2.5">
          <CalendarDays className="w-4 h-4 text-indigo-600" />
          <span className="font-bold text-gray-800 text-[15px]">Weekly Schedule</span>
        </div>

        {/* Empty State Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
          <div className="w-[60px] h-[60px] bg-[#f3f0ff] rounded-full flex items-center justify-center mb-4">
            <CalendarX2 className="w-7 h-7 text-[#6366f1]" strokeWidth={2} />
          </div>
          <h2 className="text-[16px] font-bold text-[#1f2937] mb-1.5">Timetable not available</h2>
          <p className="text-[13px] text-[#9ca3af] max-w-md mx-auto">
            The class timetable has not been set up by the school for Rajesh's section yet.
          </p>
        </div>

      </div>
    </div>
  );
}
