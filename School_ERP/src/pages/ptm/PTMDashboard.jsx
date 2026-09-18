import React from 'react';
import { 
  LayoutDashboard, Calendar, Users, ClipboardList, BarChart2, HelpCircle, 
  Plus, Handshake, MessageSquare
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PTMDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-10">
      
      {/* Header */}
      <div className="bg-white px-6 py-4 flex justify-between items-center border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Parent-Teacher Meetings</h1>
          <p className="text-[11px] text-slate-500 mt-1">Schedule PTMs, invite guardians, record attendance & remarks, and capture feedback.</p>
        </div>
        <button 
          onClick={() => navigate('/ptm/schedule')}
          className="px-4 py-2 bg-[#007bff] hover:bg-[#0056b3] text-white font-bold text-[12px] rounded-none flex items-center gap-2 transition-colors cursor-pointer border-none shadow-sm"
        >
          <Plus className="w-4 h-4" /> Schedule Meeting
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white px-6 border-b border-slate-200 flex items-center gap-6 text-[12px] font-bold overflow-x-auto">
        <button className="flex items-center gap-2 py-3 text-slate-800 border-b-2 border-slate-800 cursor-pointer whitespace-nowrap">
          <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
        </button>
        <button onClick={() => navigate('/ptm/schedule')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer whitespace-nowrap">
          <Calendar className="w-3.5 h-3.5" /> Schedule Meetings
        </button>
        <button onClick={() => navigate('/ptm/attendance')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer whitespace-nowrap">
          <ClipboardList className="w-3.5 h-3.5" /> Attendance & Remarks
        </button>
        <button onClick={() => navigate('/ptm/followups')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer whitespace-nowrap">
          <MessageSquare className="w-3.5 h-3.5" /> Follow-ups
        </button>
        <button onClick={() => navigate('/ptm/reports')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer whitespace-nowrap">
          <BarChart2 className="w-3.5 h-3.5" /> Reports
        </button>
        <button onClick={() => navigate('/ptm/guide')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer whitespace-nowrap">
          <HelpCircle className="w-3.5 h-3.5" /> Guide
        </button>
      </div>

      <div className="p-6 max-w-[1400px] mx-auto space-y-4">
        
        {/* KPI Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-none p-5 shadow-sm flex items-start gap-4">
            <div className="bg-blue-50 p-2.5 rounded-none text-[#007bff]">
              <Handshake className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Meetings This Session</div>
              <div className="text-2xl font-bold text-slate-800 leading-none mb-1">8</div>
              <div className="text-[11px] text-slate-400">8 total all-time</div>
            </div>
          </div>
          
          <div className="bg-white border border-slate-200 border-r-4 border-r-[#007bff] rounded-none p-5 shadow-sm flex items-start gap-4">
            <div className="bg-indigo-50 p-2.5 rounded-none text-indigo-500">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Upcoming Meetings</div>
              <div className="text-2xl font-bold text-slate-800 leading-none mb-1">1</div>
              <div className="text-[11px] text-slate-400">0 completed</div>
            </div>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-none p-5 shadow-sm flex items-start gap-4">
            <div className="bg-emerald-50 p-2.5 rounded-none text-emerald-500">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Parent Attendance</div>
              <div className="text-2xl font-bold text-emerald-500 leading-none mb-1">1%</div>
              <div className="text-[11px] text-slate-400">5 of 906 invited</div>
            </div>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-none p-5 shadow-sm flex items-start gap-4">
            <div className="bg-amber-50 p-2.5 rounded-none text-amber-500">
              <ClipboardList className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Open Follow-ups</div>
              <div className="text-2xl font-bold text-slate-800 leading-none mb-1">0</div>
              <div className="text-[11px] text-slate-400">0 feedback received</div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white border border-slate-200 rounded-none p-4 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-1.5 text-[12px] font-bold text-slate-700">
              <span className="w-2.5 h-2.5 rounded-none bg-slate-400"></span> Remark completion (this session)
            </div>
            <div className="text-[12px] font-bold text-slate-700">0%</div>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-none overflow-hidden mb-1">
            <div className="bg-slate-400 h-full w-0"></div>
          </div>
          <div className="text-[10px] text-slate-400">0 students with remarks</div>
        </div>

        {/* Lists Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          
          {/* Upcoming Meetings */}
          <div className="bg-white border border-slate-200 rounded-none shadow-sm h-full flex flex-col">
            <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-[14px] font-bold text-slate-800">Upcoming Meetings</h2>
              <button className="text-[11px] text-[#007bff] hover:underline">View all</button>
            </div>
            <div className="p-0 flex-1">
              <div className="px-5 py-4 flex justify-between items-start hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-100 last:border-0">
                <div>
                  <h3 className="text-[13px] font-bold text-slate-800 mb-0.5">Term 1 PTM</h3>
                  <p className="text-[11px] text-slate-500">03 Sep 2026 - Whole school</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-600 rounded-none text-[9px] font-bold tracking-wider mb-1">SCHEDULED</span>
                  <div className="text-[10px] text-slate-400">283 invited</div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Meetings */}
          <div className="bg-white border border-slate-200 rounded-none shadow-sm h-full flex flex-col">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="text-[14px] font-bold text-slate-800">Recent Meetings</h2>
            </div>
            <div className="p-0 flex-1">
              
              <div className="px-5 py-4 flex justify-between items-start hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-100">
                <div>
                  <h3 className="text-[13px] font-bold text-slate-800 mb-0.5">Exam Discussion</h3>
                  <p className="text-[11px] text-slate-500">21 Aug 2026 · 20 invited · 0 remarks</p>
                </div>
                <div>
                  <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-600 rounded-none text-[9px] font-bold tracking-wider">SCHEDULED</span>
                </div>
              </div>

              <div className="px-5 py-4 flex justify-between items-start hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-100">
                <div>
                  <h3 className="text-[13px] font-bold text-slate-800 mb-0.5">Term 1 - Meeting</h3>
                  <p className="text-[11px] text-slate-500">15 Aug 2026 · 19 invited · 0 remarks</p>
                </div>
                <div>
                  <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-600 rounded-none text-[9px] font-bold tracking-wider">SCHEDULED</span>
                </div>
              </div>

              <div className="px-5 py-4 flex justify-between items-start hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-100">
                <div>
                  <h3 className="text-[13px] font-bold text-slate-800 mb-0.5">Pre exam</h3>
                  <p className="text-[11px] text-slate-500">13 Aug 2026 · 280 invited · 0 remarks</p>
                </div>
                <div>
                  <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-600 rounded-none text-[9px] font-bold tracking-wider">SCHEDULED</span>
                </div>
              </div>

              <div className="px-5 py-4 flex justify-between items-start hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-100">
                <div>
                  <h3 className="text-[13px] font-bold text-slate-800 mb-0.5">URGENT</h3>
                  <p className="text-[11px] text-slate-500">22 Jul 2026 · 283 invited · 0 remarks</p>
                </div>
                <div>
                  <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-600 rounded-none text-[9px] font-bold tracking-wider">SCHEDULED</span>
                </div>
              </div>

              <div className="px-5 py-4 flex justify-between items-start hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-100">
                <div>
                  <h3 className="text-[13px] font-bold text-slate-800 mb-0.5">Quick Sync (Draft)</h3>
                  <p className="text-[11px] text-slate-500">04 Jul 2026 · 0 invited · 0 remarks</p>
                </div>
                <div>
                  <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-500 rounded-none text-[9px] font-bold tracking-wider">DRAFT</span>
                </div>
              </div>

              <div className="px-5 py-4 flex justify-between items-start hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-100 last:border-0">
                <div>
                  <h3 className="text-[13px] font-bold text-slate-800 mb-0.5">Annual Whole-School PTM</h3>
                  <p className="text-[11px] text-slate-500">25 Jun 2026 · 9 invited · 0 remarks</p>
                </div>
                <div>
                  <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-600 rounded-none text-[9px] font-bold tracking-wider">SCHEDULED</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
