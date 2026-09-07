import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, X, Clock, Star, CalendarDays, User, BookOpen } from 'lucide-react';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const stats = [
  { label: 'PRESENT', count: '14', color: 'bg-green-600', iconBg: 'bg-green-700', icon: Check, textColor: 'text-green-600' },
  { label: 'ABSENT', count: '02', color: 'bg-red-500', iconBg: 'bg-red-600', icon: X, textColor: 'text-red-500' },
  { label: 'LATE', count: '01', color: 'bg-orange-500', iconBg: 'bg-orange-600', icon: Clock, textColor: 'text-orange-500' },
  { label: 'HALF DAY', count: '00', color: 'bg-blue-500', iconBg: 'bg-blue-600', icon: Star, textColor: 'text-blue-500' },
  { label: 'HOLIDAY', count: '03', color: 'bg-purple-600', iconBg: 'bg-purple-700', icon: CalendarDays, textColor: 'text-purple-600' },
];

const dummyData = {
  '2026-09-02': { type: 'holiday', text: 'HOLIDAY' },
  '2026-09-04': { type: 'holiday', text: 'HOLIDAY' },
  '2026-09-17': { type: 'holiday', text: 'FESTIVAL' },
  '2026-09-01': { type: 'present' },
  '2026-09-03': { type: 'present' },
  '2026-09-05': { type: 'present' },
  '2026-09-07': { type: 'present' },
  '2026-09-08': { type: 'present' },
  '2026-09-09': { type: 'absent' },
  '2026-09-10': { type: 'present' },
  '2026-09-11': { type: 'late' },
  '2026-09-14': { type: 'present' },
  '2026-09-15': { type: 'absent' },
};

const STUDENT_PROFILES = {
  1: { name: 'Kabir Singh', class: 'Class V (A)', avatar: 'K' },
  2: { name: 'Shlok Verma', class: 'Class III (B)', avatar: 'S' },
  3: { name: 'Rajesh Singh', class: 'Class II (A)', avatar: 'R' },
};

export default function Attendance({ activeChild }) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 1)); // September 1, 2026
  const student = STUDENT_PROFILES[activeChild] || STUDENT_PROFILES[3];
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const handlePrev = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNext = () => setCurrentDate(new Date(year, month + 1, 1));

  const getDateKey = (y, m, d) => `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

  return (
    <div className="p-4 md:p-5 max-w-[1200px] mx-auto h-full flex flex-col gap-4">
      
      {/* Dynamic Header Block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-2 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-indigo-600" /> Attendance Register
          </h1>
          <p className="text-[13px] font-bold text-gray-500 mt-1 uppercase tracking-wider flex items-center gap-2">
             <User className="w-4 h-4 text-gray-400" /> Tracking for: <span className="text-indigo-600">{student.name}</span> <span className="opacity-50">|</span> {student.class}
          </p>
        </div>
        
        {/* Navigation Control */}
        <div className="flex items-center bg-white border border-gray-200 shadow-sm rounded-none">
          <button onClick={handlePrev} className="px-3 py-2 border-r border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors rounded-none outline-none focus:ring-1 focus:ring-indigo-500">
            <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
          </button>
          <span className="font-extrabold text-gray-800 text-[13px] uppercase tracking-widest px-5 min-w-[140px] text-center">
            {MONTHS[month]} {year}
          </span>
          <button onClick={handleNext} className="px-3 py-2 border-l border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors rounded-none outline-none focus:ring-1 focus:ring-indigo-500">
             <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 flex-shrink-0">
        {stats.map(({ label, count, color, iconBg, icon: Icon }) => (
          <div key={label} className={`${color} rounded-none p-2.5 flex items-center gap-3 text-white shadow-sm border border-black/10`}>
             <div className={`w-8 h-8 rounded-none flex items-center justify-center ${iconBg} shadow-inner`}>
                <Icon className="w-4 h-4" strokeWidth={2.5} />
             </div>
             <div>
               <p className="text-[9px] font-extrabold tracking-widest uppercase opacity-90">{label}</p>
               <p className="text-lg font-black leading-none mt-1">{count}</p>
             </div>
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 bg-white rounded-none border border-gray-200 shadow-sm flex flex-col min-h-0 overflow-y-auto">
        {/* Days Header */}
        <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50 top-0 sticky z-20 shadow-sm">
          {DAYS.map(day => (
            <div key={day} className="text-center py-3 text-[11px] font-extrabold text-gray-500 uppercase tracking-widest border-r border-gray-200 last:border-r-0">
              {day}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="flex-1 grid grid-cols-7 auto-rows-fr">
          
          {/* Empty Prefilling Slots */}
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="border-r border-b border-dashed border-gray-200 bg-[#f8f9fa] p-1.5 flex flex-col items-center"></div>
          ))}

          {/* Actual Days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateKey = getDateKey(year, month, day);
            const attendance = dummyData[dateKey];
            
            // Current day highlight (e.g. 5th)
            const isToday = day === 5 && month === 8 && year === 2026;

            let bgColor = 'bg-white';
            let mark = null;

            if (attendance?.type === 'holiday') {
                bgColor = 'bg-purple-50';
                mark = <div className="text-[8.5px] font-black tracking-widest text-white bg-purple-500 py-0.5 px-1 w-full text-center shadow-sm uppercase">{attendance.text}</div>;
            } else if (attendance?.type === 'present') {
                mark = <div><span className="text-green-600 font-black text-lg">P</span></div>;
            } else if (attendance?.type === 'absent') {
                bgColor = 'bg-red-50';
                mark = <div><span className="text-red-600 font-black text-lg">A</span></div>;
            } else if (attendance?.type === 'late') {
                mark = <div><span className="text-orange-500 font-black text-lg">L</span></div>;
            }

            return (
              <div 
                key={day} 
                className={`border-r border-b border-gray-200 p-1.5 flex flex-col items-center justify-center transition-colors group hover:bg-gray-50 relative
                  ${bgColor}
                  ${isToday ? 'outline outline-2 outline-indigo-500 outline-offset-[-2px] z-10' : ''}
                `}
              >
                <div className={`text-[12px] absolute top-1 left-1.5 font-extrabold ${isToday ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-700 transition-colors'}`}>
                  {day}
                </div>
                {mark}
              </div>
            );
          })}
          
          {/* Fill remaining boxes if grid isn't full */}
          {Array.from({ length: (7 - ((firstDayOfMonth + daysInMonth) % 7)) % 7 }).map((_, i) => (
             <div key={`end-empty-${i}`} className="border-r border-b border-dashed border-gray-200 bg-[#f8f9fa] p-1.5 flex flex-col items-center"></div>
          ))}

        </div>
      </div>

    </div>
  );
}
