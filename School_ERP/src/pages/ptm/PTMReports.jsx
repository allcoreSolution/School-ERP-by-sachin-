import React, { useState } from 'react';
import { 
  LayoutDashboard, Calendar, ClipboardList, MessageSquare, BarChart2, HelpCircle, 
  Plus, BarChart
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PTMReports() {
  const navigate = useNavigate();
  const [selectedMeeting, setSelectedMeeting] = useState('');

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
        <button onClick={() => navigate('/ptm/attendance')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer whitespace-nowrap">
          <ClipboardList className="w-3.5 h-3.5" /> Attendance & Remarks
        </button>
        <button onClick={() => navigate('/ptm/followups')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer whitespace-nowrap">
          <MessageSquare className="w-3.5 h-3.5" /> Follow-ups
        </button>
        <button className="flex items-center gap-2 py-3 text-slate-800 border-b-2 border-slate-800 cursor-pointer whitespace-nowrap">
          <BarChart2 className="w-3.5 h-3.5" /> Reports
        </button>
        <button onClick={() => navigate('/ptm/guide')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer whitespace-nowrap">
          <HelpCircle className="w-3.5 h-3.5" /> Guide
        </button>
      </div>

      <div className="p-6 max-w-[1400px] mx-auto space-y-6">
        
        {/* Selection Card */}
        <div className="bg-white border border-slate-200 rounded-none p-6 shadow-sm">
          <div className="max-w-3xl">
            <label className="block text-[11px] font-bold text-slate-600 mb-1.5">Select a meeting</label>
            <select 
              value={selectedMeeting}
              onChange={(e) => setSelectedMeeting(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] text-slate-600 focus:outline-none focus:border-slate-400"
            >
              <option value="">-- Choose a PTM --</option>
              <option value="1">Term 1 PTM (03 Sep 2026)</option>
              <option value="2">Exam Discussion (21 Aug 2026)</option>
            </select>
          </div>
        </div>

        {/* Empty State / Report Content */}
        {!selectedMeeting ? (
          <div className="bg-white border border-slate-200 rounded-none shadow-sm p-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-none flex items-center justify-center mb-4">
              <BarChart className="w-8 h-8 text-slate-300" />
            </div>
            <h2 className="text-[16px] font-bold text-slate-600 mb-2">Select a meeting to view its report</h2>
            <p className="text-[13px] text-slate-400">Class-wise summary and student-wise breakdown, with PDF export.</p>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-none shadow-sm p-8 text-center text-slate-500">
            Report data for the selected meeting would be displayed here.
          </div>
        )}

      </div>
    </div>
  );
}
