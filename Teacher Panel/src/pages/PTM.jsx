import React, { useState, useEffect } from 'react';
import { 
  Handshake, Calendar, Video, Clock, 
  LayoutDashboard, ClipboardCheck, PhoneCall, BookOpen, 
  Search, Plus, CheckCircle, XCircle, FileText, 
  ChevronRight, User, MessageSquare, Phone
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const initialPtmMeetings = [
  { id: 1, student: 'Aarav Sharma', class: 'Class VI', parent: 'Mr. Rajesh Sharma', date: '10 Sep 2026', time: '14:00', type: 'Virtual', status: 'Scheduled', issues: 'Academic decline in Math' },
  { id: 2, student: 'Neha Gupta', class: 'Class IX', parent: 'Mrs. Sunita Gupta', date: '12 Sep 2026', time: '15:30', type: 'In-Person', status: 'Pending Approval', issues: 'Behavioral changes' },
  { id: 3, student: 'Rohan Verma', class: 'Class X', parent: 'Mr. Anil Verma', date: '12 Sep 2026', time: '16:00', type: 'Virtual', status: 'Completed', issues: 'Career counseling' },
  { id: 4, student: 'Sneha Patil', class: 'Class III', parent: 'Ms. Kavita Patil', date: '15 Sep 2026', time: '09:00', type: 'In-Person', status: 'Scheduled', issues: 'General progress' },
];

const followupList = [
  { id: 1, student: 'Rohan Verma', parent: 'Mr. Anil Verma', contact: '+91 9876543210', reason: 'Follow up on Physics project', status: 'Pending Call' },
  { id: 2, student: 'Kabir Das', parent: 'Mrs. Anjali Das', contact: '+91 8765432109', reason: 'Absent for 3 days post PTM', status: 'Resolved' },
];

const tabs = [
  { name: 'PTM Dashboard', icon: LayoutDashboard, route: '/ptm-dashboard' },
  { name: 'Attendance & Remarks', icon: ClipboardCheck, route: '/ptm-attendance' },
  { name: 'Follow-ups', icon: PhoneCall, route: '/ptm-followups' },
  { name: 'PTM Guide', icon: BookOpen, route: '/ptm-guide' },
];

const PTM = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [meetings, setMeetings] = useState(initialPtmMeetings);
  const [activeTab, setActiveTab] = useState('PTM Dashboard');
  const [search, setSearch] = useState('');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  
  const [form, setForm] = useState({
     student: 'Aarav Sharma',
     date: '',
     time: '',
     type: 'Virtual (Google Meet)'
  });

  useEffect(() => {
    const currentTab = tabs.find(t => location.pathname.includes(t.route));
    if (currentTab) setActiveTab(currentTab.name);
  }, [location]);

  const handleTabClick = (tab) => {
    setActiveTab(tab.name);
    navigate(tab.route);
  };

  const handleSchedulePTM = () => {
    setShowScheduleModal(false);
    
    const newMeeting = {
       id: Date.now(),
       student: form.student,
       class: 'Class Temp',
       parent: form.student === 'Aarav Sharma' ? 'Mr. Rajesh Sharma' : 'Unknown Parent',
       date: form.date || 'TBD',
       time: form.time || 'TBD',
       type: form.type.includes('Virtual') ? 'Virtual' : 'In-Person',
       status: 'Scheduled',
       issues: 'General Follow-up'
    };
    
    setMeetings([newMeeting, ...meetings]);

    Swal.fire({
      title: 'Meeting Scheduled!',
      text: 'The parent has been notified via Email and SMS.',
      icon: 'success',
      confirmButtonColor: '#e11d48', // rose-600
      customClass: {
        popup: 'rounded-none border-2 border-gray-200',
        confirmButton: 'rounded-none uppercase tracking-wide font-bold px-5'
      }
    });
    
    setForm({ student: 'Aarav Sharma', date: '', time: '', type: 'Virtual (Google Meet)' });
  };

  const handleCopyLink = () => {
    Swal.fire({
      title: 'Link Copied',
      text: 'Virtual meeting link copied to clipboard.',
      icon: 'info',
      timer: 1500,
      showConfirmButton: false,
      customClass: { popup: 'rounded-none border border-gray-200' }
    });
  };

  const handleApprove = (id) => {
    setMeetings(meetings.map(m => m.id === id ? { ...m, status: 'Scheduled' } : m));
    Swal.fire({
      title: 'Approved!',
      text: 'The meeting has been confirmed with the parent.',
      icon: 'success',
      confirmButtonColor: '#059669',
      customClass: { popup: 'rounded-none border-2 border-gray-200', confirmButton: 'rounded-none uppercase tracking-wide font-bold px-5' }
    });
  };

  const handleStartSession = (id) => {
    Swal.fire({
      title: 'Connecting...',
      text: 'Redirecting to meeting room...',
      icon: 'info',
      timer: 1500,
      showConfirmButton: false,
      customClass: { popup: 'rounded-none border-2 border-gray-200' }
    }).then(() => {
       setMeetings(meetings.map(m => m.id === id ? { ...m, status: 'Completed' } : m));
    });
  };

  const handleLogFollowupCall = (parent) => {
    Swal.fire({
      title: 'Log Call',
      text: `Record call details with ${parent}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#9ca3af',
      confirmButtonText: 'Yes, log it',
      customClass: {
        popup: 'rounded-none border-2 border-gray-200',
        confirmButton: 'rounded-none uppercase tracking-wide font-bold px-5',
        cancelButton: 'rounded-none uppercase tracking-wide font-bold px-5'
      }
    }).then((result) => {
      if(result.isConfirmed){
         Swal.fire({
            title: 'Logged!',
            text: 'Call successfully logged into CRM.',
            icon: 'success',
            confirmButtonColor: '#059669', // emerald
            customClass: { popup: 'rounded-none', confirmButton: 'rounded-none' }
         })
      }
    });
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search student or parent..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 border-2 border-gray-300 text-[13px] font-bold w-64 rounded-none focus:outline-none focus:border-rose-500"
          />
        </div>
        <button
          onClick={() => setShowScheduleModal(true)}
          className="bg-rose-600 hover:bg-rose-700 text-white font-black px-5 py-2 flex items-center gap-2 text-[12px] uppercase tracking-wider rounded-none shadow-sm transition-all active:scale-95 border border-rose-800"
        >
          <Plus className="w-4 h-4" /> Schedule PTM
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {meetings.filter(m => m.student.toLowerCase().includes(search.toLowerCase()) || m.parent.toLowerCase().includes(search.toLowerCase())).map(m => (
          <div key={m.id} className="bg-white border-2 border-gray-300 shadow-sm p-0 rounded-none flex flex-col hover:border-rose-400 transition-colors">
            <div className="p-5 flex-1 relative overflow-hidden">
               <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-[16px] font-black text-gray-800 leading-tight">{m.student}</h3>
                    <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">{m.class} • {m.parent}</p>
                  </div>
                  <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider border rounded-none shadow-sm ${
                    m.status === 'Scheduled' ? 'bg-green-100 text-green-700 border-green-300' :
                    m.status === 'Completed' ? 'bg-blue-100 text-blue-700 border-blue-300' : 'bg-yellow-100 text-yellow-700 border-yellow-300'
                  }`}>{m.status}</span>
               </div>
               
               <div className="space-y-2">
                 <div className="flex items-center gap-3 text-[13px] font-bold text-gray-600">
                   <div className="w-6 h-6 flex items-center justify-center bg-gray-100 border border-gray-200"><Calendar className="w-3 h-3 text-gray-500"/></div>
                   {m.date}
                 </div>
                 <div className="flex items-center gap-3 text-[13px] font-bold text-gray-600">
                   <div className="w-6 h-6 flex items-center justify-center bg-gray-100 border border-gray-200"><Clock className="w-3 h-3 text-gray-500"/></div>
                   {m.time} ({m.type})
                 </div>
                 <div className="flex items-start gap-3 text-[13px] font-bold text-gray-600">
                   <div className="w-6 h-6 flex items-center justify-center bg-gray-100 border border-gray-200"><MessageSquare className="w-3 h-3 text-gray-500"/></div>
                   <span className="mt-0.5">Focus: {m.issues}</span>
                 </div>
               </div>
               
               {m.type === 'Virtual' && (
                 <div className="absolute top-0 right-0 w-16 h-16 bg-rose-50 rounded-bl-full flex items-center justify-center opacity-50"><Video className="w-6 h-6 text-rose-300 ml-4 mb-4"/></div>
               )}
            </div>
            
            <div className="border-t border-gray-200 bg-gray-50 p-4 flex gap-3 justify-end">
               {m.type === 'Virtual' && m.status === 'Scheduled' && (
                 <button onClick={handleCopyLink} className="flex-1 bg-white border-2 border-gray-300 text-gray-700 font-black text-[11px] uppercase tracking-wider py-2 transition-colors hover:bg-gray-100 rounded-none flex items-center justify-center gap-2">
                    <FileText className="w-3.5 h-3.5" /> Copy Link
                 </button>
               )}
               {m.status === 'Pending Approval' ? (
                 <button onClick={() => handleApprove(m.id)} className="flex-1 bg-rose-600 text-white font-black text-[11px] uppercase tracking-wider py-2 transition-colors hover:bg-rose-700 rounded-none flex items-center justify-center gap-2 shadow-sm border border-rose-800">
                    <CheckCircle className="w-3.5 h-3.5" /> Approve
                 </button>
               ) : (
                 <button disabled={m.status === 'Completed'} onClick={() => handleStartSession(m.id)} className={`flex-1 ${m.status === 'Completed' ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm border border-indigo-800'} font-black text-[11px] uppercase tracking-wider py-2 transition-colors rounded-none flex items-center justify-center gap-2`}>
                    {m.status === 'Completed' ? 'Meeting Concluded' : 'Start Session'} <ChevronRight className="w-3.5 h-3.5" />
                 </button>
               )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAttendance = () => (
    <div className="bg-white border-2 border-gray-300 shadow-sm rounded-none">
       <div className="px-6 py-4 border-b border-gray-300 bg-gray-50">
         <h2 className="text-[14px] font-black text-gray-800 uppercase tracking-tight">Record PTM Remarks</h2>
       </div>
       <table className="w-full text-left border-collapse">
         <thead>
           <tr className="bg-gray-100 border-b border-gray-300">
             {['Student', 'Parent', 'Status', 'Remarks / Notes', 'Action'].map(h => (
               <th key={h} className="px-5 py-3.5 text-[11px] font-black text-gray-500 uppercase tracking-wider border-r border-gray-300">{h}</th>
             ))}
           </tr>
         </thead>
         <tbody>
           {meetings.map((m, i) => (
             <tr key={i} className="border-b border-gray-300 hover:bg-gray-50/50">
               <td className="px-5 py-4 border-r border-gray-300 font-bold text-[13px] text-gray-800">{m.student}</td>
               <td className="px-5 py-4 border-r border-gray-300 text-[13px] font-bold text-gray-600">{m.parent}</td>
               <td className="px-5 py-4 border-r border-gray-300">
                 <select className="border-2 border-gray-300 text-[12px] font-bold p-1 rounded-none outline-none focus:border-rose-500 bg-white">
                   <option>Present</option>
                   <option>Absent</option>
                   <option>Rescheduled</option>
                 </select>
               </td>
               <td className="px-5 py-4 border-r border-gray-300">
                 <input type="text" placeholder="Type remarks here..." className="w-full border-2 border-gray-300 text-[12px] font-bold p-1.5 rounded-none outline-none focus:border-rose-500" />
               </td>
               <td className="px-5 py-4">
                 <button onClick={() => Swal.fire({title:'Saved!', icon:'success', customClass:{popup:'rounded-none', confirmButton:'rounded-none'}})} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold p-1.5 w-full rounded-none tracking-widest uppercase text-[10px] shadow-sm">Save</button>
               </td>
             </tr>
           ))}
         </tbody>
       </table>
    </div>
  );

  const renderFollowups = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {followupList.map(f => (
        <div key={f.id} className="bg-white border-2 border-gray-300 flex items-center p-5 shadow-sm rounded-none border-l-4 border-l-orange-500">
          <div className="flex-1">
             <h3 className="text-[15px] font-black text-gray-800">{f.parent}</h3>
             <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mt-1">Parent of {f.student}</p>
             <p className="text-[13px] font-bold text-gray-700 mt-2 bg-gray-50 p-2 border border-gray-200">{f.reason}</p>
          </div>
          <div className="flex flex-col gap-2 ml-4">
             <button onClick={() => handleLogFollowupCall(f.parent)} className="w-10 h-10 flex items-center justify-center bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-200 transition-colors shadow-sm rounded-none active:scale-95" title="Call">
                <Phone className="w-4 h-4" />
             </button>
             <button onClick={() => Swal.fire({title:'Marked Resolved', icon:'success', customClass:{popup:'rounded-none', confirmButton:'rounded-none'}})} className="w-10 h-10 flex items-center justify-center bg-green-50 text-green-600 hover:bg-green-600 hover:text-white border border-green-200 transition-colors shadow-sm rounded-none active:scale-95" title="Mark Resolved">
                <CheckCircle className="w-4 h-4" />
             </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderGuide = () => (
    <div className="bg-white border-2 border-gray-300 p-8 shadow-sm max-w-3xl rounded-none">
       <h2 className="text-[18px] font-black text-gray-900 border-b-2 border-gray-100 pb-4 mb-6 flex items-center gap-2"><BookOpen className="w-5 h-5 text-rose-500"/> Guidelines for Effective PTMs</h2>
       <div className="space-y-6 text-[13.5px] font-medium text-gray-700 leading-relaxed">
         <p><strong>1. Preparation is Key:</strong> Always review the student's academic and holistic progress cards prior to the meeting. Keep specific examples of work ready.</p>
         <p><strong>2. The 'Sandwich' Feedback Method:</strong> Start with positive remarks, discuss areas of improvement critically but respectfully, and end with an actionable, positive note.</p>
         <p><strong>3. Time Management:</strong> Stick to the allocated 15-minute slot per parent. If a discussion requires more time, schedule a follow-up via the Follow-ups tab.</p>
         <p><strong>4. Active Listening:</strong> Listen to parental concerns without interruption. Often, behavioral traits observed at home co-relate with classroom activities.</p>
       </div>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto bg-gray-100 theme-app-bg">
      <div className="bg-white border-b border-gray-300 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-rose-600 text-white flex items-center justify-center rounded-none shadow-sm">
            <Handshake className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-[20px] font-black text-gray-800 tracking-tight">Parent-Teacher Meetings</h1>
            <p className="text-[12px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Virtual & In-Person Meet Management</p>
          </div>
        </div>
      </div>
      
      <div className="px-6 bg-white border-b border-gray-300 flex overflow-x-auto hide-scrollbar">
        {tabs.map(t => {
          const isActive = activeTab === t.name;
          return (
            <button 
              key={t.name}
              onClick={() => handleTabClick(t)}
              className={`flex items-center gap-2 px-5 py-4 font-black text-[12px] uppercase tracking-wider whitespace-nowrap transition-colors border-b-[3px] 
              ${isActive 
                  ? 'text-rose-700 border-rose-600 bg-rose-50/50' 
                  : 'text-gray-500 border-transparent hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              {React.createElement(t.icon, { className: `w-4 h-4 ${isActive ? 'text-rose-600' : 'text-gray-400'}` })}
              {t.name}
            </button>
          )
        })}
      </div>

      <div className="p-7 max-w-7xl mx-auto min-h-[500px]">
        {activeTab === 'PTM Dashboard' && renderDashboard()}
        {activeTab === 'Attendance & Remarks' && renderAttendance()}
        {activeTab === 'Follow-ups' && renderFollowups()}
        {activeTab === 'PTM Guide' && renderGuide()}
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in p-4" onClick={() => setShowScheduleModal(false)}>
          <div className="bg-white w-full max-w-md shadow-2xl rounded-none border border-gray-300" onClick={e => e.stopPropagation()}>
             <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-[15px] font-black text-gray-800 uppercase tracking-tight flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-rose-600" /> Schedule Meeting
                </h2>
                <button onClick={() => setShowScheduleModal(false)} className="text-gray-400 hover:text-red-500"><X className="w-5 h-5"/></button>
             </div>
             <div className="p-6 space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1.5">Select Student</label>
                  <select value={form.student} onChange={(e) => setForm({...form, student: e.target.value})} className="w-full border-2 border-gray-300 px-3 py-2 text-[13px] font-bold focus:border-rose-500 outline-none rounded-none bg-white">
                     <option>Aarav Sharma</option>
                     <option>Neha Gupta</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1.5">Date</label>
                    <input type="date" value={form.date} onChange={(e) => setForm({...form, date: e.target.value})} className="w-full border-2 border-gray-300 px-3 py-2 text-[13px] font-bold focus:border-rose-500 outline-none rounded-none bg-white"/>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1.5">Time</label>
                    <input type="time" value={form.time} onChange={(e) => setForm({...form, time: e.target.value})} className="w-full border-2 border-gray-300 px-3 py-2 text-[13px] font-bold focus:border-rose-500 outline-none rounded-none bg-white"/>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1.5">Meeting Mode</label>
                  <select value={form.type} onChange={(e) => setForm({...form, type: e.target.value})} className="w-full border-2 border-gray-300 px-3 py-2 text-[13px] font-bold focus:border-rose-500 outline-none rounded-none bg-white">
                     <option>Virtual (Google Meet)</option>
                     <option>In-Person (Room 204)</option>
                  </select>
                </div>
             </div>
             <div className="flex gap-2 px-6 py-4 border-t border-gray-200 bg-gray-50 flex-row-reverse">
                <button onClick={handleSchedulePTM} className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2.5 font-black uppercase text-[11px] tracking-widest shadow-sm rounded-none border border-rose-800">Dispatch Invite</button>
                <button onClick={() => setShowScheduleModal(false)} className="bg-white border-2 border-gray-300 px-5 py-2.5 font-black uppercase text-[11px] tracking-widest text-gray-700 hover:bg-gray-100 rounded-none">Cancel</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PTM;
