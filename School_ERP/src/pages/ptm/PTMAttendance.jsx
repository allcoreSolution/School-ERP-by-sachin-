import React from 'react';
import { 
  LayoutDashboard, Calendar, Users, ClipboardList, BarChart2, HelpCircle, 
  Plus, MessageSquare, Filter, Eye, Edit, Trash2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PTMAttendance() {
  const navigate = useNavigate();

  const meetings = [
    { id: 1, title: 'Term 1 PTM', mode: 'In person', date: '03 Sep 2026', scope: 'Whole school', invited: 283, present: 0, status: 'Scheduled', statusColor: 'bg-[#17a2b8]' },
    { id: 2, title: 'Exam Discussion', mode: 'In person - at School', date: '21 Aug 2026', time: '12:20 AM - 03:20 AM', scope: 'Class II / A', invited: 20, present: 0, status: 'Scheduled', statusColor: 'bg-[#17a2b8]' },
    { id: 3, title: 'Term 1 - Meeting', mode: 'In person - Auditorium', date: '15 Aug 2026', time: '05:15 PM - 08:22 PM', scope: 'Class IV / A', invited: 19, present: 0, status: 'Scheduled', statusColor: 'bg-[#17a2b8]' },
    { id: 4, title: 'Pre exam', mode: 'In person - class rooms', date: '13 Aug 2026', time: '09:00 AM - 01:00 PM', scope: 'Whole school', invited: 280, present: 0, status: 'Scheduled', statusColor: 'bg-[#17a2b8]' },
    { id: 5, title: 'URGENT', mode: 'Online', date: '22 Jul 2026', time: '10:30 AM - 11:31 AM', scope: 'Whole school', invited: 283, present: 0, status: 'Scheduled', statusColor: 'bg-[#17a2b8]' },
    { id: 6, title: 'Quick Sync (Draft)', mode: 'Online', date: '04 Jul 2026', scope: 'Nursery / A', invited: 0, present: 0, status: 'Draft', statusColor: 'bg-slate-500' },
    { id: 7, title: 'Annual Whole-School PTM', mode: 'In person - Main Campus', date: '25 Jun 2026', time: '08:00 AM - 02:00 PM', scope: 'Whole school', invited: 9, present: 0, status: 'Scheduled', statusColor: 'bg-[#17a2b8]' },
    { id: 8, title: 'Mid-Term Progress Meeting', mode: 'Hybrid - Classrooms', date: '11 Jun 2026', time: '09:30 AM - 12:30 PM', scope: 'Nursery / B', invited: 12, present: 5, status: 'Notified', statusColor: 'bg-[#007bff]' },
  ];

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
        <button onClick={() => navigate('/ptm/dashboard')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer whitespace-nowrap">
          <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
        </button>
        <button onClick={() => navigate('/ptm/schedule')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer whitespace-nowrap">
          <Calendar className="w-3.5 h-3.5" /> Schedule Meetings
        </button>
        <button className="flex items-center gap-2 py-3 text-slate-800 border-b-2 border-slate-800 cursor-pointer whitespace-nowrap">
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

      {/* Filter Bar */}
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex flex-wrap items-end gap-4">
        <div className="flex-1 min-w-[150px]">
          <label className="block text-[10px] font-bold text-slate-500 mb-1">Status</label>
          <select className="w-full px-3 py-1.5 border border-slate-300 rounded-none text-[12px] focus:outline-none focus:border-slate-400">
            <option>All statuses</option>
          </select>
        </div>
        <div className="flex-1 min-w-[150px]">
          <label className="block text-[10px] font-bold text-slate-500 mb-1">Class</label>
          <select className="w-full px-3 py-1.5 border border-slate-300 rounded-none text-[12px] focus:outline-none focus:border-slate-400">
            <option>All classes</option>
          </select>
        </div>
        <div className="flex-1 min-w-[150px]">
          <label className="block text-[10px] font-bold text-slate-500 mb-1">From</label>
          <input type="date" className="w-full px-3 py-1.5 border border-slate-300 rounded-none text-[12px] focus:outline-none focus:border-slate-400" />
        </div>
        <div className="flex-1 min-w-[150px]">
          <label className="block text-[10px] font-bold text-slate-500 mb-1">To</label>
          <input type="date" className="w-full px-3 py-1.5 border border-slate-300 rounded-none text-[12px] focus:outline-none focus:border-slate-400" />
        </div>
        <div className="w-[120px]">
          <button className="w-full py-1.5 bg-[#343a40] hover:bg-[#23272b] text-white rounded-none text-[12px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer">
            <Filter className="w-3.5 h-3.5" /> Filter
          </button>
        </div>
      </div>

      <div className="p-6 max-w-[1400px] mx-auto">
        <div className="bg-white border border-slate-200 rounded-none shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-5 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Meeting</th>
                  <th className="px-5 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Date / Time</th>
                  <th className="px-5 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Scope</th>
                  <th className="px-5 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center">Invited</th>
                  <th className="px-5 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center">Present</th>
                  <th className="px-5 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-5 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-slate-700">
                {meetings.map((meeting) => (
                  <tr key={meeting.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-5 py-3">
                      <div className="font-bold text-slate-800">{meeting.title}</div>
                      <div className="text-[11px] text-slate-400">{meeting.mode}</div>
                    </td>
                    <td className="px-5 py-3">
                      <div>{meeting.date}</div>
                      {meeting.time && <div className="text-[11px] text-slate-400">{meeting.time}</div>}
                    </td>
                    <td className="px-5 py-3">{meeting.scope}</td>
                    <td className="px-5 py-3 text-center">{meeting.invited}</td>
                    <td className="px-5 py-3 text-center">{meeting.present}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-block px-2 py-1 ${meeting.statusColor} text-white rounded-none text-[10px] font-bold tracking-wider`}>
                        {meeting.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-1.5">
                        <button 
                          onClick={() => navigate(`/ptm/details/${meeting.id}`)}
                          className="w-7 h-7 flex items-center justify-center border border-slate-300 rounded-none text-slate-600 hover:bg-slate-100 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button className="w-7 h-7 flex items-center justify-center border border-[#007bff] rounded-none text-[#007bff] hover:bg-blue-50 cursor-pointer">
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button className="w-7 h-7 flex items-center justify-center border border-[#dc3545] rounded-none text-[#dc3545] hover:bg-red-50 cursor-pointer">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
