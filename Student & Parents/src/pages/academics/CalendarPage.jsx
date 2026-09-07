import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, ArrowRight } from 'lucide-react';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Dummy events mapped to YYYY-MM-DD
const eventsData = {
  '2026-09-02': [{ title: 'Science Exhibition', time: '10:00 AM', type: 'academic' }],
  '2026-09-04': [{ title: 'Math Quiz', time: '12:00 PM', type: 'exam' }],
  '2026-09-09': [{ title: 'Sports Day Practice', time: '08:00 AM', type: 'sports' }],
  '2026-09-17': [{ title: 'Annual Function', time: '05:00 PM', type: 'cultural' }],
};

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 1)); // Sept 1, 2026
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 8, 5)); // Selected: Sept 5, 2026 
  const [tab, setTab] = useState('Monthly');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const getDateKey = (y, m, d) => {
    return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  };

  const selectedDateKey = getDateKey(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
  const selectedEvents = eventsData[selectedDateKey] || [];

  return (
    <div className="p-4 md:p-5 max-w-[1200px] mx-auto h-full flex flex-col">
      
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-200 flex-shrink-0">
        <div>
           <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
              <CalendarIcon className="w-6 h-6 text-indigo-600" /> Academic Calendar
           </h1>
           <p className="text-sm font-medium text-gray-500 mt-1">Session 2026-2027</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex max-w-4xl mx-auto border-b border-gray-200 mb-5 bg-white/50 flex-shrink-0">
        <button 
          onClick={() => setTab('Monthly')}
          className={`flex-1 py-3 text-[13px] uppercase tracking-widest font-bold transition-all border-b-[3px] ${
            tab === 'Monthly' ? 'text-indigo-600 border-indigo-600 bg-indigo-50' : 'text-gray-400 border-transparent hover:text-gray-600 hover:bg-gray-50'
          }`}
        >
          Monthly View
        </button>
        <button 
          onClick={() => setTab('Yearly')}
          className={`flex-1 py-3 text-[13px] uppercase tracking-widest font-bold transition-all border-b-[3px] ${
            tab === 'Yearly' ? 'text-indigo-600 border-indigo-600 bg-indigo-50' : 'text-gray-400 border-transparent hover:text-gray-600 hover:bg-gray-50'
          }`}
        >
          Yearly Overview
        </button>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-5 items-start flex-1 min-h-0">
        
        {tab === 'Monthly' && (
          <React.Fragment>
            {/* Calendar Card */}
            <div className="bg-white rounded-none border border-gray-200 shadow-sm p-5 w-full md:w-[60%] flex-shrink-0">
              
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-100">
                <button onClick={handlePrevMonth} className="w-7 h-7 rounded-none border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-indigo-600 transition-colors">
                  <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                </button>
                <h2 className="text-[15px] font-extrabold text-gray-800 uppercase tracking-widest">
                  {MONTHS[month]} {year}
                </h2>
                <button onClick={handleNextMonth} className="w-7 h-7 rounded-none border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-indigo-600 transition-colors">
                  <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>

              {/* Grid Headers */}
              <div className="grid grid-cols-7 gap-y-4 gap-x-1">
                {DAYS.map(day => (
                  <div key={day} className="text-center">
                    <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">{day.substring(0,1)}</span>
                  </div>
                ))}

                {/* Empty slots before day 1 */}
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-8"></div>
                ))}

                {/* Days */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dateObj = new Date(year, month, day);
                  const dateKey = getDateKey(year, month, day);
                  const hasEvents = !!eventsData[dateKey];
                  
                  const isSelected = 
                    selectedDate.getDate() === day &&
                    selectedDate.getMonth() === month &&
                    selectedDate.getFullYear() === year;

                  return (
                    <div key={day} className="flex justify-center mb-1">
                      <button
                        onClick={() => setSelectedDate(dateObj)}
                        className="relative w-8 h-8 flex flex-col items-center justify-center transition-all group outline-none focus:ring-2 focus:ring-indigo-300 rounded-none bg-transparent"
                      >
                        <span 
                          className={`text-[12.5px] font-bold relative z-10 w-8 h-8 flex items-center justify-center rounded-none shadow-sm
                            ${isSelected 
                              ? 'bg-indigo-600 text-white border border-indigo-700' 
                              : 'text-gray-700 hover:bg-gray-100 border border-transparent'
                            }`}
                        >
                          {day}
                        </span>
                        
                        {/* Event Dot */}
                        {hasEvents && (
                          <div className={`absolute -bottom-1 w-full h-[3px] rounded-none shadow-sm
                            ${isSelected ? 'bg-orange-400' : 'bg-indigo-400'}`}>
                          </div>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Events List */}
            <div className="w-full md:w-[40%] flex flex-col gap-4 flex-shrink-0">
              <div className="bg-indigo-900 border border-indigo-800 p-4 rounded-none shadow-sm text-white">
                <h3 className="text-[10.5px] font-bold text-indigo-300 uppercase tracking-widest mb-1">Schedule For</h3>
                <p className="text-[16px] font-extrabold tracking-tight">
                    {selectedDate.getDate()} {MONTHS[selectedDate.getMonth()]}, {selectedDate.getFullYear()}
                </p>
              </div>
              
              <div className="bg-white border border-gray-200 p-4 rounded-none shadow-sm flex-1 min-h-[200px] overflow-y-auto custom-scrollbar">
                {selectedEvents.length === 0 ? (
                  <div className="h-full flex flex-col justify-center items-center gap-3 text-center opacity-70 py-8">
                      <CalendarIcon className="w-8 h-8 text-gray-300" strokeWidth={1.5} />
                      <p className="text-[12px] text-gray-500 font-bold uppercase tracking-wider">No events scheduled</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <h4 className="text-[10.5px] font-extrabold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Upcoming Activities</h4>
                    {selectedEvents.map((ev, i) => (
                      <div key={i} className="flex flex-col gap-1.5 p-2.5 bg-gray-50 border border-gray-200 rounded-none hover:border-indigo-300 transition-colors cursor-pointer group">
                        <span className="font-extrabold text-gray-800 text-[12px] group-hover:text-indigo-600 transition-colors flex items-center justify-between">
                            {ev.title}
                            <ArrowRight className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                        </span>
                        <div className="flex items-center gap-2">
                            <span className="text-[9px] text-indigo-700 font-bold bg-indigo-100/50 border border-indigo-200 px-1.5 py-0.5 flex items-center gap-1 rounded-none">
                              <Clock className="w-2.5 h-2.5" /> {ev.time}
                            </span>
                            {ev.type && (
                              <span className="text-[9px] text-orange-700 font-bold bg-orange-100/50 border border-orange-200 px-1.5 py-0.5 flex items-center gap-1 rounded-none capitalize uppercase">
                                  {ev.type}
                              </span>
                            )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </React.Fragment>
        )}

        {tab === 'Yearly' && (
          <div className="w-full bg-white border border-gray-200 p-5 shadow-sm rounded-none">
            <h3 className="text-sm font-extrabold text-gray-800 uppercase tracking-widest mb-5 border-b border-gray-100 pb-3">{year} Academic Year Highlights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
               {MONTHS.map((m, idx) => {
                 // Count events for this month conceptually
                 const monthStr = String(idx+1).padStart(2, '0');
                 const evKeys = Object.keys(eventsData).filter(k => k.startsWith(`${year}-${monthStr}`));
                 const count = evKeys.reduce((acc, k) => acc + eventsData[k].length, 0);

                 return (
                   <div key={m} className={`border p-4 flex flex-col gap-2 rounded-none transition-colors cursor-pointer ${count > 0 ? 'bg-indigo-50/30 border-indigo-200 hover:bg-indigo-50/60' : 'bg-gray-50/30 border-gray-100 hover:bg-gray-50/80'}`}>
                     <span className="text-[13px] font-extrabold text-gray-700 uppercase">{m}</span>
                     {count > 0 ? (
                        <div className="mt-1">
                          <span className="text-[10px] font-bold text-indigo-600 bg-indigo-100 border border-indigo-200 px-2 py-0.5 inline-block">
                            {count} Event{count > 1 ? 's' : ''} Scheduled
                          </span>
                        </div>
                     ) : (
                        <div className="mt-1">
                          <span className="text-[10px] font-bold text-gray-400">No major events</span>
                        </div>
                     )}
                   </div>
                 );
               })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
