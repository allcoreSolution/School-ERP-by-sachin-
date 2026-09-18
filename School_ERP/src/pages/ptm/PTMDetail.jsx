import React, { useState } from 'react';
import { 
  ArrowLeft, Calendar, Handshake, Info, Users, Clock, Edit, RefreshCw, Send, CheckSquare
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function PTMDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock list of students
  const [students, setStudents] = useState([
    { id: 1, name: 'Kiara Kapoor', roll: 'YISADM 072 / 12', phone: '9876500143', slot: '--', notified: '--', attendance: 'Pending' },
    { id: 2, name: 'Vivaan Prakash', roll: 'YISADM 073 / 13', phone: '9876500145', slot: '--', notified: '--', attendance: 'Pending' },
    { id: 3, name: 'Kriti Garg', roll: 'YISADM 074 / 14', phone: '9876500147', slot: '--', notified: '--', attendance: 'Pending' },
    { id: 4, name: 'Ananya Kaur', roll: 'YISADM 075 / 15', phone: '9876500149', slot: '--', notified: '--', attendance: 'Pending' },
    { id: 5, name: 'Diya Nath', roll: 'YISADM 076 / 16', phone: '9876500151', slot: '--', notified: '--', attendance: 'Pending' },
    { id: 6, name: 'Advik Jha', roll: 'YISADM 077 / 17', phone: '9876500153', slot: '--', notified: '--', attendance: 'Pending' },
    { id: 7, name: 'Myra Menon', roll: 'YISADM 078 / 18', phone: '9876500155', slot: '--', notified: '--', attendance: 'Pending' },
    { id: 8, name: 'Kabir Dubey', roll: 'YISADM 079 / 19', phone: '9876500157', slot: '--', notified: '--', attendance: 'Pending' },
    { id: 9, name: 'Navya Sinha', roll: 'YISADM 080 / 20', phone: '9876500159', slot: '--', notified: '--', attendance: 'Pending' },
    { id: 10, name: 'Ansh Bose', roll: 'YISADM 081 / 1', phone: '9876500161', slot: '--', notified: '--', attendance: 'Pending' },
    { id: 11, name: 'Neha Sheikh', roll: 'YISADM 082 / 2', phone: '9876500163', slot: '--', notified: '--', attendance: 'Pending' },
    { id: 12, name: 'Ishaan Khatri', roll: 'YISADM 083 / 3', phone: '9876500165', slot: '--', notified: '--', attendance: 'Pending' },
    { id: 13, name: 'Nitya Rana', roll: 'YISADM 084 / 4', phone: '9876500167', slot: '--', notified: '--', attendance: 'Pending' },
  ]);

  const handleRefresh = () => {
    alert('Roster refreshed successfully!');
  };

  const handleSend = () => {
    alert('Invitations sent to 283 guardians!');
  };

  const handleRecord = () => {
    alert('Attendance recording mode activated (Feature preview)');
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-10">
      
      {/* Top Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-6 py-3 flex items-center gap-4 border-b border-slate-100">
          <button onClick={() => navigate('/ptm/attendance')} className="text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1 text-[12px] font-bold">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>
        
        <div className="px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-xl font-bold text-slate-800">Term 1 PTM</h1>
              <span className="px-2 py-0.5 bg-[#17a2b8] text-white text-[10px] font-bold tracking-wider rounded">Scheduled</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-slate-500">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Thursday, 03 Sep 2026</span>
              <span className="flex items-center gap-1"><Handshake className="w-3.5 h-3.5" /> In person</span>
              <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> Whole school</span>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <button className="px-3 py-1.5 border border-[#007bff] text-[#007bff] bg-white rounded-none text-[12px] font-bold flex items-center gap-1.5 hover:bg-blue-50 transition-colors shadow-sm">
              <Edit className="w-3.5 h-3.5" /> Edit
            </button>
            <button onClick={handleRefresh} className="px-3 py-1.5 bg-[#343a40] text-white rounded-none text-[12px] font-bold flex items-center gap-1.5 hover:bg-[#23272b] transition-colors shadow-sm">
              <RefreshCw className="w-3.5 h-3.5" /> Refresh Roster
            </button>
            <button onClick={handleSend} className="px-3 py-1.5 bg-[#fd7e14] text-white rounded-none text-[12px] font-bold flex items-center gap-1.5 hover:bg-[#e86e0c] transition-colors shadow-sm">
              <Send className="w-3.5 h-3.5" /> Send Invitations
            </button>
            <button onClick={handleRecord} className="px-3 py-1.5 bg-[#28a745] text-white rounded-none text-[12px] font-bold flex items-center gap-1.5 hover:bg-[#218838] transition-colors shadow-sm">
              <CheckSquare className="w-3.5 h-3.5" /> Record
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-[1400px] mx-auto space-y-4">
        
        {/* Info Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-none p-3 flex items-start gap-2 text-[12px] text-slate-600">
          <Info className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
          <p>Please be present as your ward's assessment will be given with all socio-economic aspects</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white border border-slate-200 rounded-none p-4 text-center shadow-sm">
            <div className="flex justify-center mb-1"><Users className="w-5 h-5 text-[#007bff]" /></div>
            <div className="text-xl font-bold text-slate-800">283</div>
            <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Invited</div>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-none p-4 text-center shadow-sm">
            <div className="flex justify-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#28a745]"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>
            </div>
            <div className="text-xl font-bold text-[#28a745]">0</div>
            <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Present</div>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-none p-4 text-center shadow-sm">
            <div className="flex justify-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#dc3545]"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="17" y1="8" x2="23" y2="14"/><line x1="23" y1="8" x2="17" y2="14"/></svg>
            </div>
            <div className="text-xl font-bold text-[#dc3545]">0</div>
            <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Absent</div>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-none p-4 text-center shadow-sm">
            <div className="flex justify-center mb-1"><Users className="w-5 h-5 text-slate-400" /></div>
            <div className="text-xl font-bold text-slate-800">283</div>
            <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Pending</div>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-none p-4 text-center shadow-sm">
            <div className="flex justify-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#007bff]"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <div className="text-xl font-bold text-slate-800">0</div>
            <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Remarked</div>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-none p-4 text-center shadow-sm">
            <div className="flex justify-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#ffc107]"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
            </div>
            <div className="text-xl font-bold text-slate-800">0</div>
            <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Follow-ups</div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-slate-200 rounded-none shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200">
            <h2 className="text-[13px] font-bold text-slate-800">Guardian Roster (283)</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">#</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Student</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Adm/Roll</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Guardian Phone</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Slot</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Notified</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Attendance</th>
                </tr>
              </thead>
              <tbody className="text-[12px] text-slate-700">
                {students.map((s, index) => (
                  <tr key={s.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-2.5 text-slate-400">{index + 1}</td>
                    <td className="px-4 py-2.5 font-medium text-slate-800">{s.name}</td>
                    <td className="px-4 py-2.5 text-slate-500">{s.roll}</td>
                    <td className="px-4 py-2.5">{s.phone}</td>
                    <td className="px-4 py-2.5 text-slate-400">{s.slot}</td>
                    <td className="px-4 py-2.5 text-slate-400">{s.notified}</td>
                    <td className="px-4 py-2.5">
                      <span className="inline-block px-2 py-1 bg-slate-600 text-white rounded-none text-[10px] font-bold">
                        {s.attendance}
                      </span>
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
