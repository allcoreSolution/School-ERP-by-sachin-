import React, { useState } from 'react';
import {
  CalendarDays, Clock, BookOpen, Users,
  Download, Printer, ChevronLeft, ChevronRight,
  MapPin, Eye, X
} from 'lucide-react';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const shortDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const periods = [
  { period: 'P1', time: '08:00 – 08:45' },
  { period: 'P2', time: '08:45 – 09:30' },
  { period: 'P3', time: '09:30 – 10:15' },
  { period: 'Break', time: '10:15 – 10:30' },
  { period: 'P4', time: '10:30 – 11:15' },
  { period: 'P5', time: '11:15 – 12:00' },
  { period: 'Lunch', time: '12:00 – 12:45' },
  { period: 'P6', time: '12:45 – 01:30' },
  { period: 'P7', time: '01:30 – 02:15' },
  { period: 'P8', time: '02:15 – 03:00' },
];

// subject → color palette
const subjectColors = {
  'Mathematics': { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', dot: 'bg-blue-400' },
  'Algebra':     { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700', dot: 'bg-indigo-400' },
  'Geometry':    { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', dot: 'bg-purple-400' },
  'Statistics':  { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-700', dot: 'bg-teal-400' },
  'Free / Prep': { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-500', dot: 'bg-gray-300' },
  'Sport Duty':  { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', dot: 'bg-orange-400' },
};

// timetable[dayIndex][periodLabel] = { subject, class, room }  |  null = free
const timetable = {
  Monday:    { P1: { subject: 'Mathematics', class: 'X A', room: 'Room 204' }, P2: { subject: 'Algebra', class: 'IX B', room: 'Room 101' }, P3: { subject: 'Mathematics', class: 'X B', room: 'Room 204' }, P4: null, P5: { subject: 'Geometry', class: 'VIII A', room: 'Room 302' }, P6: { subject: 'Statistics', class: 'XI C', room: 'Lab 1' }, P7: { subject: 'Mathematics', class: 'X A', room: 'Room 204' }, P8: { subject: 'Free / Prep', class: '—', room: '—' } },
  Tuesday:   { P1: { subject: 'Geometry', class: 'VIII A', room: 'Room 302' }, P2: { subject: 'Mathematics', class: 'X B', room: 'Room 204' }, P3: { subject: 'Free / Prep', class: '—', room: '—' }, P4: { subject: 'Algebra', class: 'IX B', room: 'Room 101' }, P5: { subject: 'Mathematics', class: 'X A', room: 'Room 204' }, P6: null, P7: { subject: 'Statistics', class: 'XI C', room: 'Lab 1' }, P8: { subject: 'Sport Duty', class: 'All X', room: 'Ground' } },
  Wednesday: { P1: { subject: 'Mathematics', class: 'X A', room: 'Room 204' }, P2: { subject: 'Statistics', class: 'XI C', room: 'Lab 1' }, P3: { subject: 'Algebra', class: 'IX B', room: 'Room 101' }, P4: { subject: 'Geometry', class: 'VIII A', room: 'Room 302' }, P5: null, P6: { subject: 'Mathematics', class: 'X B', room: 'Room 204' }, P7: { subject: 'Free / Prep', class: '—', room: '—' }, P8: null },
  Thursday:  { P1: { subject: 'Algebra', class: 'IX B', room: 'Room 101' }, P2: { subject: 'Mathematics', class: 'X A', room: 'Room 204' }, P3: { subject: 'Statistics', class: 'XI C', room: 'Lab 1' }, P4: { subject: 'Free / Prep', class: '—', room: '—' }, P5: { subject: 'Mathematics', class: 'X B', room: 'Room 204' }, P6: { subject: 'Geometry', class: 'VIII A', room: 'Room 302' }, P7: null, P8: { subject: 'Mathematics', class: 'X A', room: 'Room 204' } },
  Friday:    { P1: { subject: 'Statistics', class: 'XI C', room: 'Lab 1' }, P2: { subject: 'Geometry', class: 'VIII A', room: 'Room 302' }, P3: { subject: 'Mathematics', class: 'X B', room: 'Room 204' }, P4: { subject: 'Algebra', class: 'IX B', room: 'Room 101' }, P5: { subject: 'Free / Prep', class: '—', room: '—' }, P6: { subject: 'Mathematics', class: 'X A', room: 'Room 204' }, P7: { subject: 'Statistics', class: 'XI C', room: 'Lab 1' }, P8: null },
  Saturday:  { P1: { subject: 'Mathematics', class: 'X A', room: 'Room 204' }, P2: { subject: 'Algebra', class: 'IX B', room: 'Room 101' }, P3: null, P4: null, P5: null, P6: null, P7: null, P8: null },
};

const todayIdx = Math.min(new Date().getDay() - 1, 5); // 0=Mon ... 5=Sat, clamp

const MyTimetable = () => {
  const [view, setView]         = useState('week');   // 'week' | 'day' | 'list'
  const [selectedDay, setDay]   = useState(Math.max(todayIdx, 0));
  const [viewSlot, setViewSlot] = useState(null);

  const classCount = Object.values(timetable).reduce((acc, day) =>
    acc + Object.values(day).filter(s => s && s.subject !== 'Free / Prep').length, 0);

  const todaySchedule = Object.entries(timetable[days[selectedDay]] || {})
    .filter(([, v]) => v !== null);

  return (
    <div className="flex-1 overflow-y-auto bg-[#f4f7f6] theme-app-bg">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-purple-100 text-purple-500 flex items-center justify-center">
              <CalendarDays className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">My Timetable</h1>
              <p className="text-sm text-gray-500">Academic Session 2026–27 | September 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {['week', 'day', 'list'].map(v => (
              <button key={v} onClick={() => setView(v)}
                className={`px-4 py-1.5 text-xs font-bold border capitalize transition-colors ${view === v ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'}`}>
                {v}
              </button>
            ))}
            <button className="p-2 border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 transition-colors" title="Print">
              <Printer className="w-4 h-4" />
            </button>
            <button className="p-2 border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 transition-colors" title="Download">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-full mx-auto space-y-5">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Classes / Week', val: classCount, icon: BookOpen, color: 'text-purple-500 bg-purple-50' },
            { label: 'Classes / Day (avg)', val: Math.round(classCount / 6), icon: Clock, color: 'text-blue-500 bg-blue-50' },
            { label: 'Classes Assigned', val: 5, icon: Users, color: 'text-indigo-500 bg-indigo-50' },
            { label: 'Free Periods / Week', val: Object.values(timetable).reduce((a, d) => a + Object.values(d).filter(s => s === null).length, 0), icon: CalendarDays, color: 'text-green-500 bg-green-50' },
          ].map(({ label, val, icon: Icon, color }) => (
            <div key={label} className="bg-white border border-gray-200 shadow-sm p-4 flex items-center gap-4">
              <div className={`w-11 h-11 flex items-center justify-center flex-shrink-0 ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-black text-gray-800">{val}</p>
                <p className="text-xs text-gray-500 font-medium">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Subject Legend */}
        <div className="bg-white border border-gray-200 shadow-sm px-5 py-3 flex items-center flex-wrap gap-4">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Subject Legend:</span>
          {Object.entries(subjectColors).map(([sub, cls]) => (
            <span key={sub} className={`flex items-center gap-1.5 text-xs font-semibold ${cls.text}`}>
              <span className={`w-2.5 h-2.5 rounded-full ${cls.dot}`}></span>{sub}
            </span>
          ))}
        </div>

        {/* ===== WEEK VIEW ===== */}
        {view === 'week' && (
          <div className="bg-white border border-gray-200 shadow-sm overflow-x-auto">
            <table className="w-full text-sm min-w-[900px]" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase border border-gray-200 w-32">Period / Time</th>
                  {days.map((d, i) => (
                    <th key={d} className={`px-3 py-3 text-xs font-bold uppercase border border-gray-200 text-center ${i === todayIdx ? 'bg-purple-50 text-purple-700' : 'text-gray-500'}`}>
                      <p>{d}</p>
                      {i === todayIdx && <span className="text-[9px] bg-purple-500 text-white px-1.5 py-0.5 rounded-full font-bold ml-1">TODAY</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {periods.map(({ period, time }) => {
                  const isBreak = period === 'Break' || period === 'Lunch';
                  return (
                    <tr key={period} className={isBreak ? 'bg-amber-50' : 'hover:bg-gray-50/50'}>
                      <td className="px-4 py-2 border border-gray-200">
                        <p className="text-xs font-bold text-gray-700">{period}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{time}</p>
                      </td>
                      {days.map((day, di) => {
                        if (isBreak) {
                          return (
                            <td key={day} className="px-3 py-2 border border-gray-200 text-center text-xs text-amber-600 font-bold">
                              {period === 'Break' ? '☕ Break' : '🍱 Lunch'}
                            </td>
                          );
                        }
                        const slot = timetable[day]?.[period];
                        const col = slot ? subjectColors[slot.subject] : null;
                        return (
                          <td key={day} className={`px-2 py-1.5 border border-gray-200 ${di === todayIdx ? 'bg-purple-50/30' : ''}`}>
                            {slot ? (
                              <button
                                onClick={() => setViewSlot({ ...slot, period, time, day })}
                                className={`w-full text-left p-2 border rounded-none transition-all hover:shadow-sm ${col.bg} ${col.border}`}>
                                <p className={`text-xs font-bold leading-tight ${col.text}`}>{slot.subject}</p>
                                <p className="text-[10px] text-gray-500 mt-0.5">{slot.class}</p>
                                <p className="text-[10px] text-gray-400 flex items-center gap-0.5 mt-0.5">
                                  <MapPin className="w-2 h-2" />{slot.room}
                                </p>
                              </button>
                            ) : (
                              <div className="w-full h-full flex items-center justify-center py-2 text-[10px] text-gray-300 font-medium">free</div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* ===== DAY VIEW ===== */}
        {view === 'day' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <button onClick={() => setDay(d => Math.max(0, d - 1))} className="p-2 bg-white border border-gray-200 hover:bg-gray-50"><ChevronLeft className="w-4 h-4" /></button>
              <div className="flex gap-1 flex-wrap">
                {days.map((d, i) => (
                  <button key={d} onClick={() => setDay(i)}
                    className={`px-3 py-1.5 text-xs font-bold border transition-colors ${selectedDay === i ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'}`}>
                    {shortDays[i]}
                    {i === todayIdx && <span className="ml-1 text-[9px] bg-yellow-300 text-yellow-900 px-1 rounded-full">•</span>}
                  </button>
                ))}
              </div>
              <button onClick={() => setDay(d => Math.min(5, d + 1))} className="p-2 bg-white border border-gray-200 hover:bg-gray-50"><ChevronRight className="w-4 h-4" /></button>
            </div>
            <div className="bg-white border border-gray-200 shadow-sm">
              <div className={`px-5 py-3 border-b border-gray-200 ${selectedDay === todayIdx ? 'bg-purple-50' : 'bg-gray-50'}`}>
                <p className="font-bold text-gray-800">{days[selectedDay]} Schedule</p>
                {selectedDay === todayIdx && <p className="text-xs text-purple-600 font-semibold">Today</p>}
              </div>
              <div className="divide-y divide-gray-100">
                {periods.map(({ period, time }) => {
                  const isBreak = period === 'Break' || period === 'Lunch';
                  const slot = !isBreak ? timetable[days[selectedDay]]?.[period] : null;
                  const col = slot ? subjectColors[slot.subject] : null;

                  if (isBreak) return (
                    <div key={period} className="px-5 py-3 bg-amber-50 flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-600">{period === 'Break' ? '☕ Short Break' : '🍱 Lunch Break'}</span>
                      <span className="text-xs text-gray-400">{time}</span>
                    </div>
                  );

                  return (
                    <div key={period} className="flex items-center px-5 py-3 gap-4 hover:bg-gray-50 transition-colors">
                      <div className="w-24 flex-shrink-0">
                        <p className="text-xs font-bold text-gray-600">{period}</p>
                        <p className="text-[10px] text-gray-400">{time}</p>
                      </div>
                      {slot ? (
                        <div className={`flex-1 flex items-center gap-4 border px-4 py-2.5 ${col.bg} ${col.border}`}>
                          <span className={`w-3 h-3 rounded-full flex-shrink-0 ${col.dot}`}></span>
                          <div className="flex-1">
                            <p className={`font-bold text-sm ${col.text}`}>{slot.subject}</p>
                            <p className="text-xs text-gray-500">{slot.class} &bull; <span className="flex-inline items-center gap-0.5"><MapPin className="w-2.5 h-2.5 inline" /> {slot.room}</span></p>
                          </div>
                          <button onClick={() => setViewSlot({ ...slot, period, time, day: days[selectedDay] })}
                            className="p-1.5 bg-white border border-gray-200 text-gray-400 hover:text-blue-500 hover:border-blue-200">
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex-1 border border-dashed border-gray-200 px-4 py-2.5 text-xs text-gray-300 font-medium">Free Period</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ===== LIST VIEW ===== */}
        {view === 'list' && (
          <div className="bg-white border border-gray-200 shadow-sm overflow-x-auto">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-800">All Classes — Weekly Schedule</h2>
            </div>
            <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr className="bg-gray-50">
                  {['#', 'Day', 'Period', 'Time', 'Subject', 'Class', 'Room'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase border border-gray-200">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {days.flatMap((day, di) =>
                  periods
                    .filter(p => p.period !== 'Break' && p.period !== 'Lunch')
                    .map(({ period, time }) => {
                      const slot = timetable[day]?.[period];
                      if (!slot || slot.subject === 'Free / Prep') return null;
                      const col = subjectColors[slot.subject];
                      return { day, di, period, time, slot, col };
                    })
                    .filter(Boolean)
                ).map(({ day, di, period, time, slot, col }, idx) => (
                  <tr key={idx} className={`hover:bg-purple-50/20 transition-colors ${di === todayIdx ? 'bg-purple-50/10' : ''}`}>
                    <td className="px-4 py-3 border border-gray-200 text-gray-400">{idx + 1}</td>
                    <td className="px-4 py-3 border border-gray-200 font-semibold text-gray-800">
                      {day} {di === todayIdx && <span className="ml-1 text-[10px] bg-purple-100 text-purple-600 font-bold px-1.5 py-0.5">Today</span>}
                    </td>
                    <td className="px-4 py-3 border border-gray-200 text-gray-600">{period}</td>
                    <td className="px-4 py-3 border border-gray-200 text-gray-500 whitespace-nowrap">{time}</td>
                    <td className="px-4 py-3 border border-gray-200">
                      <span className={`text-xs font-bold px-2 py-0.5 ${col.bg} ${col.text} border ${col.border}`}>{slot.subject}</span>
                    </td>
                    <td className="px-4 py-3 border border-gray-200 font-medium text-gray-700">{slot.class}</td>
                    <td className="px-4 py-3 border border-gray-200 text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gray-400" />{slot.room}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* ===== View Slot Modal ===== */}
      {viewSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setViewSlot(null)}>
          <div className="bg-white w-full max-w-sm shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-base font-bold text-gray-800">Period Details</h2>
              <button onClick={() => setViewSlot(null)} className="p-1.5 hover:bg-gray-100 text-gray-500"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-6 space-y-3">
              {(() => {
                const col = subjectColors[viewSlot.subject];
                return (
                  <div className={`border ${col.border} ${col.bg} p-4 rounded-none`}>
                    <p className={`text-lg font-black ${col.text}`}>{viewSlot.subject}</p>
                    <p className="text-sm text-gray-600 mt-1">{viewSlot.class}</p>
                  </div>
                );
              })()}
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  { label: 'Day',    val: viewSlot.day,    icon: CalendarDays },
                  { label: 'Period', val: viewSlot.period, icon: BookOpen },
                  { label: 'Time',   val: viewSlot.time,   icon: Clock },
                  { label: 'Room',   val: viewSlot.room,   icon: MapPin },
                ].map(({ label, val, icon: Icon }) => (
                  <div key={label} className="bg-gray-50 border border-gray-100 p-3">
                    <p className="text-xs text-gray-400 flex items-center gap-1 mb-1"><Icon className="w-3 h-3" />{label}</p>
                    <p className="text-sm font-semibold text-gray-800">{val}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
              <button onClick={() => setViewSlot(null)} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2 text-sm font-semibold">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTimetable;
