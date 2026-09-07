import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Wallet, ClipboardCheck, FileText, BookOpen, Phone, MessageSquare,
  Mail, Zap, Calendar, Clock, GraduationCap, ChevronLeft, ChevronRight,
  Megaphone, User
} from 'lucide-react';

const quickActions = [
  { label: 'Pay Fees',    icon: Wallet,         bg: 'bg-green-500',  route: '/fee-payments' },
  { label: 'Attendance',  icon: ClipboardCheck, bg: 'bg-blue-500',   route: '/attendance'   },
  { label: 'Exam Report', icon: FileText,       bg: 'bg-yellow-500', route: '/exams'        },
  { label: 'Documents',   icon: BookOpen,       bg: 'bg-teal-500',   route: '/documents'    },
  { label: 'WhatsApp',    icon: Phone,          bg: 'bg-green-400',  route: '/whatsapp'     },
  { label: 'SMS',         icon: MessageSquare,  bg: 'bg-cyan-500',   route: '/sms'          },
  { label: 'Mail',        icon: Mail,           bg: 'bg-red-500',    route: '/email'        },
];

const calendarEvents = {
  '2026-09-01': [{ title: 'Field Trip to Science Mu...', color: 'bg-blue-500' }],
  '2026-09-02': [{ title: 'Digsidgsigsitvitz',           color: 'bg-red-400'  }],
  '2026-09-04': [
    { title: 'Janmashtami',           color: 'bg-pink-400' },
    { title: 'Notice: Happy Janm...', color: 'bg-gray-500' },
    { title: 'Republic Day Function', color: 'bg-pink-600' },
  ],
  '2026-09-09': [{ title: 'Health & Wellness Car...', color: 'bg-blue-500' }],
  '2026-09-17': [{ title: 'Annual Day & Prize Dis...', color: 'bg-blue-500' }],
};

const DAYS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const getDaysInMonth  = (y, m) => new Date(y, m + 1, 0).getDate();
const getFirstDay     = (y, m) => new Date(y, m, 1).getDay();

const notices = [
  {
    id: 1, type: 'notice',
    title: 'Demo: Library week — bring back borrowed books',
    date:  '30 Jul, 2026',
    body:  'It is Library Week. Please return any borrowed books by the end of this week to avoid a late fee.',
  },
  {
    id: 2, type: 'alert',
    title: 'NEWS ALERT',
    date:  '01 Jul, 2026',
    body:  "Dear Parents, Greetings! We are pleased to inform you that the school is launching a new AI mobile application designed to streamline fee payments and facilitate various school-related activities. The app will provide a convenient and easy-to-use interface...",
  },
];

const STUDENT_PROFILES = {
  1: { name: 'Kabir Singh',  class: 'Class V (A)',   avatar: 'K', admn: 'YISADMA-10', roll: '5121401', dob: '15 Aug, 2012', feesPaid: '₹33,300.00', feesBalance: 'All Clear' },
  2: { name: 'Shlok Verma',  class: 'Class III (B)', avatar: 'S', admn: 'YISADMA-05', roll: '4122108', dob: '22 Jan, 2014', feesPaid: '₹12,000.00', feesBalance: '₹8,500.00' },
  3: { name: 'Rajesh Singh', class: 'Class II (A)',  avatar: 'R', admn: 'YISADMA-01', roll: '3121212', dob: '01 Apr, 2015', feesPaid: '₹20,000.00', feesBalance: '₹2,500.00' },
};

export default function Dashboard({ activeChild }) {
  const navigate = useNavigate();
  const [curDate, setCurDate] = useState(new Date(2026, 8, 1));
  const [view, setView] = useState('month');

  const y = curDate.getFullYear();
  const m = curDate.getMonth();
  const daysInMonth = getDaysInMonth(y, m);
  const firstDay    = getFirstDay(y, m);
  const dk = (d) => `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
  const prevMonthLen = getDaysInMonth(y, m - 1);
  const trailingCount = (7 - ((firstDay + daysInMonth) % 7)) % 7;

  const student = STUDENT_PROFILES[activeChild] || STUDENT_PROFILES[3];

  return (
    <div className="p-5 space-y-5">
      <div className="flex items-center justify-between">
         <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      </div>

      {/* ── Top Row ─────────────────────────────────────── */}
      <div className="grid grid-cols-12 gap-5">

        {/* Student Profile + Notice */}
        <div className="col-span-12 xl:col-span-4 bg-white rounded-none border border-gray-200 p-5 shadow-sm transform transition-all duration-300">

          {/* Avatar */}
          <div className="flex flex-col items-center text-center mb-5">
            <div className="w-20 h-20 rounded-none bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md border-2 border-indigo-100 flex items-center justify-center mb-3">
              <span className="text-3xl font-black text-white">{student.avatar}</span>
            </div>
            <h2 className="text-lg font-extrabold text-gray-800 uppercase tracking-wide">{student.name}</h2>
            <p className="text-[13px] font-bold text-indigo-500 bg-indigo-50 px-3 py-1 mt-1 rounded-none">Class : {student.class}</p>
          </div>

          {/* Info rows */}
          <div className="divide-y divide-gray-100 mb-5">
            {[
              { icon: GraduationCap, label: 'Admission No.', val: student.admn },
              { icon: FileText,      label: 'Roll Number',   val: student.roll   },
              { icon: Calendar,      label: 'Date of Birth', val: student.dob    },
            ].map(({ icon: Icon, label, val }) => (
              <div key={label} className="flex items-center gap-3 py-3">
                <div className="w-8 h-8 rounded-none bg-gray-50 flex items-center justify-center">
                   <Icon className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                </div>
                <span className="text-[13px] font-bold text-gray-500 flex-1 uppercase tracking-wider">{label}</span>
                <span className="text-[13px] font-extrabold text-gray-800">{val}</span>
              </div>
            ))}
          </div>

          {/* Notice Board */}
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <Megaphone className="w-3.5 h-3.5 text-yellow-500" />
              <span className="text-sm font-bold text-gray-700">Notice Board</span>
            </div>
            <div className="space-y-4">
              {notices.map((n) => (
                <div key={n.id}>
                  <p className={`text-sm font-bold ${n.type === 'alert' ? 'text-red-500' : 'text-blue-600'} cursor-pointer hover:underline`}>
                    {n.title}
                  </p>
                  <p className="text-xs text-gray-400 mb-1">Published on {n.date}</p>
                  <p className="text-[12.5px] text-gray-600 leading-relaxed">{n.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-12 xl:col-span-8 flex flex-col gap-5">

          {/* Fee + Attendance */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => navigate('/fee-payments')}
              className="bg-gradient-to-r from-red-500 to-red-600 rounded-none p-4 text-white flex items-center gap-3 hover:shadow-lg transition-shadow text-left"
            >
              <div className="w-10 h-10 bg-white/20 rounded-none flex items-center justify-center flex-shrink-0 shadow-inner">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-red-100">Total Due Fees</p>
                <p className={`text-2xl font-black ${student.feesBalance === 'All Clear' ? 'text-green-300' : ''}`}>{student.feesBalance}</p>
              </div>
            </button>

            <button
              onClick={() => navigate('/attendance')}
              className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-none p-4 text-white flex items-center gap-3 hover:shadow-lg transition-shadow text-left"
            >
              <div className="w-10 h-10 bg-white/20 rounded-none flex items-center justify-center flex-shrink-0 shadow-inner">
                <ClipboardCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-teal-100">Today's Attendance</p>
                <p className="text-lg font-bold text-yellow-200">Not Marked Yet</p>
              </div>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-1.5 mb-3">
              <Zap className="w-3.5 h-3.5 text-yellow-500" />
              <span className="text-base font-bold text-gray-700">Quick Actions</span>
            </div>
            <div className="flex flex-wrap gap-4">
              {quickActions.map(({ label, icon: Icon, bg, route }) => (
                <button
                  key={label}
                  onClick={() => navigate(route)}
                  className="flex flex-col items-center gap-1.5"
                >
                  {/* SQUARE icon box */}
                  <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center hover:scale-105 transition-transform shadow-sm`}>
                    <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                  </div>
                  <span className="text-xs text-gray-500 font-semibold whitespace-nowrap">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Activity Calendar */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-base font-bold text-gray-700">Student Activity Calendar</span>
              </div>
              <div className="flex gap-1">
                {['month','list'].map((v) => (
                  <button key={v} onClick={() => setView(v)}
                    className={`text-[10px] px-2.5 py-1 rounded font-semibold border transition-colors
                      ${view === v ? 'bg-blue-500 text-white border-blue-500' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 mb-3">
              {[
                { label:'Present',      dot:'bg-green-500'  },
                { label:'Absent',       dot:'bg-red-500'    },
                { label:'Late',         dot:'bg-yellow-400' },
                { label:'Notice',       dot:'bg-gray-400'   },
                { label:'Event/Holiday',dot:'bg-pink-500'   },
              ].map(({ label, dot }) => (
                <span key={label} className="flex items-center gap-1">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${dot}`}></span>
                  <span className="text-[10px] text-gray-500">{label}</span>
                </span>
              ))}
            </div>

            {/* Nav */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <button onClick={() => setCurDate(new Date(y, m-1, 1))}
                  className="w-6 h-6 rounded-none bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center">
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => setCurDate(new Date(y, m+1, 1))}
                  className="w-6 h-6 rounded-none bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center">
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => setCurDate(new Date(2026, 8, 1))}
                  className="text-[10px] px-2.5 py-1 border border-gray-200 rounded-none text-gray-600 hover:bg-gray-50 font-semibold">
                  today
                </button>
              </div>
              <span className="text-sm font-bold text-gray-800">{MONTHS[m]} {y}</span>
            </div>

            {/* Calendar Grid */}
            <div className="w-full overflow-x-auto">
              <table className="w-full border-collapse" style={{ tableLayout: 'fixed' }}>
                <thead>
                  <tr>
                    {DAYS.map((d) => (
                      <th key={d} className="text-center text-[10px] font-bold text-gray-400 py-1.5 border border-gray-300 bg-gray-50">
                        {d}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    const cells = [];
                    // prev month tail
                    for (let i = 0; i < firstDay; i++) {
                      cells.push({ day: prevMonthLen - firstDay + i + 1, cur: false, key: `p-${i}` });
                    }
                    // current month
                    for (let d = 1; d <= daysInMonth; d++) {
                      cells.push({ day: d, cur: true, key: `c-${d}` });
                    }
                    // next month lead
                    for (let i = 0; i < trailingCount; i++) {
                      cells.push({ day: i + 1, cur: false, key: `n-${i}` });
                    }

                    const rows = [];
                    for (let r = 0; r < cells.length / 7; r++) {
                      rows.push(cells.slice(r * 7, r * 7 + 7));
                    }
                    return rows.map((row, ri) => (
                      <tr key={ri}>
                        {row.map((cell) => {
                          const events = cell.cur ? (calendarEvents[dk(cell.day)] || []) : [];
                          const isToday = cell.cur && cell.day === 5 && m === 8 && y === 2026;
                          return (
                            <td key={cell.key}
                              className={`border border-gray-300 align-top p-1 h-[70px]
                                ${!cell.cur ? 'bg-gray-50' : isToday ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                              <span className={`text-[11px] font-semibold inline-flex items-center justify-center w-5 h-5 rounded-full
                                ${isToday ? 'bg-blue-500 text-white' : cell.cur ? 'text-gray-700' : 'text-gray-300'}`}>
                                {cell.day}
                              </span>
                              <div className="mt-0.5 space-y-0.5">
                                {events.map((ev, ei) => (
                                  <div key={ei} className={`${ev.color} text-white text-[8.5px] px-1 py-px rounded truncate font-medium`}>
                                    {ev.title}
                                  </div>
                                ))}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ));
                  })()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="text-[10px] text-gray-400 text-center pb-2">© 2026 ProjectWorlds Multi School ERP SAAS. All rights reserved.</p>
    </div>
  );
}
