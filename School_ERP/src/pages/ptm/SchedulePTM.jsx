import React from 'react';
import { 
  LayoutDashboard, Calendar, Users, ClipboardList, BarChart2, HelpCircle, 
  Plus, Handshake, MessageSquare, Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SchedulePTM() {
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
        <button className="flex items-center gap-2 py-3 text-slate-800 border-b-2 border-slate-800 cursor-pointer whitespace-nowrap">
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

      <div className="p-6 max-w-[1400px] mx-auto">
        
        <div className="bg-white border border-slate-200 rounded-none shadow-sm">
          {/* Form Header */}
          <div className="px-6 py-4 border-b border-slate-200 flex items-center gap-2">
            <Handshake className="w-5 h-5 text-[#007bff]" />
            <h2 className="text-[16px] font-bold text-slate-800">Schedule a Parent-Teacher Meeting</h2>
          </div>

          {/* Form Body */}
          <div className="p-6 space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[12px] font-bold text-slate-700 mb-1.5">
                  Title <span className="text-[#dc3545]">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Term 1 Parent-Teacher Meeting" 
                  className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] text-slate-800 focus:outline-none focus:border-slate-400" 
                />
              </div>
              <div>
                <label className="block text-[12px] font-bold text-slate-700 mb-1.5">
                  Meeting Date <span className="text-[#dc3545]">*</span>
                </label>
                <input 
                  type="date" 
                  className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] text-slate-800 focus:outline-none focus:border-slate-400" 
                />
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-bold text-slate-700 mb-1.5">
                Description / Agenda
              </label>
              <textarea 
                placeholder="Optional notes shown to staff and guardians" 
                rows="3"
                className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] text-slate-800 focus:outline-none focus:border-slate-400 resize-y" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[12px] font-bold text-slate-700 mb-1.5">
                  Scope <span className="text-[#dc3545]">*</span>
                </label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] text-slate-800 bg-white focus:outline-none focus:border-slate-400">
                  <option>Specific class</option>
                  <option>Whole school</option>
                </select>
              </div>
              <div>
                <label className="block text-[12px] font-bold text-slate-700 mb-1.5">
                  Class
                </label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] text-slate-800 bg-white focus:outline-none focus:border-slate-400">
                  <option>-- Select Class --</option>
                  <option>Nursery</option>
                  <option>LKG</option>
                  <option>UKG</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-[12px] font-bold text-slate-700 mb-1.5">
                  Mode <span className="text-[#dc3545]">*</span>
                </label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] text-slate-800 bg-white focus:outline-none focus:border-slate-400">
                  <option>In person</option>
                  <option>Online</option>
                  <option>Hybrid</option>
                </select>
              </div>
              <div>
                <label className="block text-[12px] font-bold text-slate-700 mb-1.5">
                  Start Time
                </label>
                <div className="relative">
                  <input 
                    type="time" 
                    className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] text-slate-400 focus:outline-none focus:border-slate-400 pl-3 pr-10" 
                  />
                  <Clock className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-bold text-slate-700 mb-1.5">
                  End Time
                </label>
                <div className="relative">
                  <input 
                    type="time" 
                    className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] text-slate-400 focus:outline-none focus:border-slate-400 pl-3 pr-10" 
                  />
                  <Clock className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-bold text-slate-700 mb-1.5">
                Venue
              </label>
              <input 
                type="text" 
                placeholder="e.g. School Auditorium" 
                className="w-full md:w-1/2 px-3 py-2 border border-slate-300 rounded-none text-[13px] text-slate-800 focus:outline-none focus:border-slate-400" 
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input 
                type="checkbox" 
                id="buildRoster" 
                defaultChecked
                className="w-4 h-4 text-[#007bff] rounded-none border-slate-300 focus:ring-[#007bff]"
              />
              <label htmlFor="buildRoster" className="text-[13px] font-bold text-slate-700 cursor-pointer">
                Build the guardian roster now from current enrolment (you can refresh it later)
              </label>
            </div>

          </div>

          {/* Form Actions */}
          <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center gap-3 rounded-b-lg">
            <button 
              onClick={() => {
                alert('Meeting scheduled successfully!');
                navigate('/ptm/dashboard');
              }}
              className="px-5 py-2 bg-[#fd7e14] hover:bg-[#e86e0c] text-white text-[13px] font-bold rounded-none flex items-center gap-2 transition-colors shadow-sm"
            >
              <CheckSquareIcon /> Create Meeting
            </button>
            <button 
              onClick={() => navigate('/ptm/dashboard')}
              className="px-5 py-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-[13px] font-bold rounded-none transition-colors shadow-sm"
            >
              Cancel
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

// Inline icon component
function CheckSquareIcon(props) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" height="24" 
      viewBox="0 0 24 24" fill="none" 
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
      className="w-4 h-4"
      {...props}
    >
      <polyline points="9 11 12 14 22 4"></polyline>
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
    </svg>
  );
}
