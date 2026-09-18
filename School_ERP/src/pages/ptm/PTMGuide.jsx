import React from 'react';
import { 
  LayoutDashboard, Calendar, Users, ClipboardList, BarChart2, HelpCircle, 
  Plus, MessageSquare, Handshake, Check
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PTMGuide() {
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
        <button onClick={() => navigate('/ptm/reports')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer whitespace-nowrap">
          <BarChart2 className="w-3.5 h-3.5" /> Reports
        </button>
        <button className="flex items-center gap-2 py-3 text-slate-800 border-b-2 border-slate-800 cursor-pointer whitespace-nowrap">
          <HelpCircle className="w-3.5 h-3.5" /> Guide
        </button>
      </div>

      <div className="p-6 max-w-[1400px] mx-auto space-y-6">
        
        {/* Section 1 */}
        <div className="bg-white border border-slate-200 rounded-none shadow-sm">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
            <div className="w-6 h-6 rounded-none bg-slate-800 text-white flex items-center justify-center text-[12px] font-bold">1</div>
            <h2 className="text-[15px] font-bold text-slate-800">How the PTM workflow runs</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              
              <div className="border border-slate-200 rounded-none p-4 text-center">
                <div className="w-10 h-10 mx-auto bg-blue-50 rounded-none flex items-center justify-center text-blue-500 mb-3">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="text-[12px] font-bold text-slate-800 mb-1.5">Schedule</h3>
                <p className="text-[10px] text-slate-500 leading-relaxed">Admin sets date, time, mode & scope (class/section/whole school).</p>
              </div>

              <div className="border border-slate-200 rounded-none p-4 text-center">
                <div className="w-10 h-10 mx-auto bg-indigo-50 rounded-none flex items-center justify-center text-indigo-500 mb-3">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-[12px] font-bold text-slate-800 mb-1.5">Build Roster</h3>
                <p className="text-[10px] text-slate-500 leading-relaxed">System pulls enrolled students & snapshots guardian phones.</p>
              </div>

              <div className="border border-slate-200 rounded-none p-4 text-center">
                <div className="w-10 h-10 mx-auto bg-amber-50 rounded-none flex items-center justify-center text-amber-500 mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-2z"/><path d="M22 12h-2"/><path d="M20 16h-2"/><path d="M20 8h-2"/></svg>
                </div>
                <h3 className="text-[12px] font-bold text-slate-800 mb-1.5">Invite</h3>
                <p className="text-[10px] text-slate-500 leading-relaxed">WhatsApp/SMS invitations sent (wallet billed) - next phase.</p>
              </div>

              <div className="border border-slate-200 rounded-none p-4 text-center">
                <div className="w-10 h-10 mx-auto bg-emerald-50 rounded-none flex items-center justify-center text-emerald-500 mb-3">
                  <Check className="w-5 h-5" />
                </div>
                <h3 className="text-[12px] font-bold text-slate-800 mb-1.5">Attendance</h3>
                <p className="text-[10px] text-slate-500 leading-relaxed">Teachers mark which guardians attended on the day.</p>
              </div>

              <div className="border border-slate-200 rounded-none p-4 text-center">
                <div className="w-10 h-10 mx-auto bg-cyan-50 rounded-none flex items-center justify-center text-cyan-500 mb-3">
                  <ClipboardList className="w-5 h-5" />
                </div>
                <h3 className="text-[12px] font-bold text-slate-800 mb-1.5">Remarks</h3>
                <p className="text-[10px] text-slate-500 leading-relaxed">Per-student performance, attendance & behaviour notes.</p>
              </div>

              <div className="border border-slate-200 rounded-none p-4 text-center">
                <div className="w-10 h-10 mx-auto bg-rose-50 rounded-none flex items-center justify-center text-rose-500 mb-3">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h3 className="text-[12px] font-bold text-slate-800 mb-1.5">Follow-up</h3>
                <p className="text-[10px] text-slate-500 leading-relaxed">Action plans, parent feedback & reports.</p>
              </div>

            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="bg-white border border-slate-200 rounded-none shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
            <div className="w-6 h-6 rounded-none bg-slate-800 text-white flex items-center justify-center text-[12px] font-bold">2</div>
            <h2 className="text-[15px] font-bold text-slate-800">Roles & what they can do</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#0f172a] text-white">
                  <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider">Capability</th>
                  <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider">Admin</th>
                  <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider">Teacher</th>
                </tr>
              </thead>
              <tbody className="text-[12px] text-slate-700">
                <tr className="border-b border-slate-100">
                  <td className="px-6 py-3">Schedule meetings & send invitations</td>
                  <td className="px-6 py-3"><Check className="w-4 h-4 text-slate-600" /></td>
                  <td className="px-6 py-3 text-slate-400">-</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="px-6 py-3">View dashboard & guide</td>
                  <td className="px-6 py-3"><Check className="w-4 h-4 text-slate-600" /></td>
                  <td className="px-6 py-3"><Check className="w-4 h-4 text-slate-600" /></td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="px-6 py-3">Record parent attendance</td>
                  <td className="px-6 py-3"><Check className="w-4 h-4 text-slate-600" /></td>
                  <td className="px-6 py-3 flex items-center gap-1.5"><Check className="w-4 h-4 text-slate-600" /> <span className="text-slate-400">(own classes)</span></td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="px-6 py-3">Write student remarks</td>
                  <td className="px-6 py-3"><Check className="w-4 h-4 text-slate-600" /></td>
                  <td className="px-6 py-3 flex items-center gap-1.5"><Check className="w-4 h-4 text-slate-600" /> <span className="text-slate-400">(own classes)</span></td>
                </tr>
                <tr>
                  <td className="px-6 py-3">Manage follow-ups & view reports</td>
                  <td className="px-6 py-3"><Check className="w-4 h-4 text-slate-600" /></td>
                  <td className="px-6 py-3 flex items-center gap-1.5"><Check className="w-4 h-4 text-slate-600" /> <span className="text-slate-400">(own classes)</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3 */}
        <div className="bg-white border border-slate-200 rounded-none shadow-sm">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
            <div className="w-6 h-6 rounded-none bg-slate-800 text-white flex items-center justify-center text-[12px] font-bold">3</div>
            <h2 className="text-[15px] font-bold text-slate-800">Good to know</h2>
          </div>
          <div className="p-6">
            <ul className="list-disc pl-5 space-y-2 text-[12px] text-slate-600 mb-6">
              <li><strong className="text-slate-800">Scope is flexible:</strong> a single section, an entire class, or a whole-school PTM - pick when scheduling.</li>
              <li><strong className="text-slate-800">Roster is non-destructive:</strong> refreshing it only adds newly-enrolled students; existing attendance & remarks are kept.</li>
              <li><strong className="text-slate-800">Appointment slots & online/hybrid meetings</strong> are supported - add a meeting link or per-guardian slot times.</li>
            </ul>

            <div className="bg-[#e6f4ea] border border-[#a8dab5] rounded-none p-3 flex items-start gap-2">
              <ClipboardList className="w-4 h-4 text-[#1e8e3e] mt-0.5 flex-shrink-0" />
              <p className="text-[12px] text-[#1e8e3e] font-medium leading-relaxed">
                Invitations are sent over your school's WhatsApp/SMS wallet. You'll see an estimated cost and confirm before any billable send (next phase).
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
