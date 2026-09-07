import React, { useState } from 'react';
import Swal from 'sweetalert2';
import {
  PenTool, Plus, Eye, Edit, Trash2, Search,
  Clock, CheckCircle, AlertTriangle, X, Users,
  Calendar, BookOpen, FileText, Play, Square,
  BarChart2, Download, Copy, Settings
} from 'lucide-react';

const exams = [
  { id: 1, title: 'Mid-Term Math Test - Chapter 5', subject: 'Mathematics', class: 'X – A', date: '06 Sep 2026', time: '10:00 AM', duration: '60 min', totalQ: 30, marks: 60, status: 'Upcoming', attempts: 0,  maxStudents: 28 },
  { id: 2, title: 'Algebra Unit Test', subject: 'Algebra', class: 'IX – B', date: '05 Sep 2026', time: '09:00 AM', duration: '45 min', totalQ: 20, marks: 40, status: 'Live',     attempts: 18, maxStudents: 32 },
  { id: 3, title: 'Geometry Basics Quiz', subject: 'Geometry', class: 'VIII – A', date: '03 Sep 2026', time: '11:00 AM', duration: '30 min', totalQ: 15, marks: 30, status: 'Completed', attempts: 28, maxStudents: 30 },
  { id: 4, title: 'Statistics Weekly Test', subject: 'Statistics', class: 'XI – C', date: '01 Sep 2026', time: '02:00 PM', duration: '45 min', totalQ: 25, marks: 50, status: 'Completed', attempts: 22, maxStudents: 25 },
  { id: 5, title: 'Trigonometry Practice', subject: 'Mathematics', class: 'X – B', date: '10 Sep 2026', time: '10:00 AM', duration: '60 min', totalQ: 30, marks: 60, status: 'Draft',    attempts: 0,  maxStudents: 29 },
];

const statusStyle = {
  Upcoming:  { cls: 'bg-blue-100 text-blue-700 border border-blue-200',   dot: 'bg-blue-400'   },
  Live:      { cls: 'bg-red-100 text-red-600 border border-red-200',      dot: 'bg-red-500 animate-pulse' },
  Completed: { cls: 'bg-green-100 text-green-700 border border-green-200', dot: 'bg-green-400'  },
  Draft:     { cls: 'bg-gray-100 text-gray-500 border border-gray-200',   dot: 'bg-gray-400'   },
};

const subjects = ['Mathematics', 'Algebra', 'Geometry', 'Statistics'];
const classes  = ['X – A', 'X – B', 'IX – A', 'IX – B', 'VIII – A', 'VIII – B', 'XI – C'];

const resultData = [
  { name: 'Ananya Desai', roll: 'STU-001', score: 54, total: 60, time: '48 min', status: 'Pass', photo: 'https://i.pravatar.cc/60?img=1' },
  { name: 'Kabir Sharma', roll: 'STU-002', score: 42, total: 60, time: '55 min', status: 'Pass', photo: 'https://i.pravatar.cc/60?img=2' },
  { name: 'Priya Nair',   roll: 'STU-003', score: 58, total: 60, time: '40 min', status: 'Pass', photo: 'https://i.pravatar.cc/60?img=5' },
  { name: 'Rohit Gupta',  roll: 'STU-004', score: 22, total: 60, time: '60 min', status: 'Fail', photo: 'https://i.pravatar.cc/60?img=7' },
  { name: 'Sanya Mehta',  roll: 'STU-005', score: 48, total: 60, time: '52 min', status: 'Pass', photo: 'https://i.pravatar.cc/60?img=9' },
];

const ManageOnlineExams = () => {
  const [search, setSearch]         = useState('');
  const [filterStatus, setFilter]   = useState('All');
  const [activeView, setActiveView] = useState('list');
  const [selectedExam, setSelectedExam] = useState(null);
  const [form, setForm] = useState({
    title: '', subject: subjects[0], class: classes[0],
    date: '', time: '', duration: '60', marks: '100', instructions: '',
    shuffleQ: true, showResult: true, negativeMarking: false,
  });
  const [examList, setExamList] = useState(exams);

  const handleAction = (action, ex) => {
    if (action === 'delete') {
      Swal.fire({
        title: 'Are you sure?',
        text: `You want to delete exam "${ex.title}"`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          setExamList(prev => prev.filter(e => e.id !== ex.id));
          Swal.fire('Deleted!', 'The exam has been deleted.', 'success');
        }
      });
    } else if (action === 'duplicate' || action === 'edit') {
       setSelectedExam(ex);
       if (action === 'edit') {
         setForm({
            title: ex.title, subject: ex.subject, class: ex.class,
            date: ex.date, time: ex.time, duration: ex.duration.replace(' min',''), marks: ex.marks, instructions: '',
            shuffleQ: true, showResult: true, negativeMarking: false,
         });
       } else {
         setForm({
            title: ex.title + ' (Copy)', subject: ex.subject, class: ex.class,
            date: '', time: '', duration: ex.duration.replace(' min',''), marks: ex.marks, instructions: '',
            shuffleQ: true, showResult: true, negativeMarking: false,
         });
       }
       setActiveView('form');
    } else if (action === 'stop') {
       Swal.fire({
          title: 'Stop Live Exam?',
          text: `Are you sure you want to forcefully stop "${ex.title}"?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, stop it'
       }).then((result) => {
          if (result.isConfirmed) {
             setExamList(prev => prev.map(e => e.id === ex.id ? { ...e, status: 'Completed' } : e));
             Swal.fire('Stopped!', 'The exam is now marked as Completed.', 'success');
          }
       });
    }
  };

  const filtered = examList.filter(e =>
    (filterStatus === 'All' || e.status === filterStatus) &&
    (e.title.toLowerCase().includes(search.toLowerCase()) || e.subject.toLowerCase().includes(search.toLowerCase()))
  );

  const stats = [
    { label: 'Total Exams',  val: examList.length,                                    icon: FileText,  color: 'text-indigo-500 bg-indigo-50'  },
    { label: 'Live Now',     val: examList.filter(e => e.status === 'Live').length,     icon: Play,      color: 'text-red-500 bg-red-50'        },
    { label: 'Upcoming',     val: examList.filter(e => e.status === 'Upcoming').length, icon: Calendar,  color: 'text-blue-500 bg-blue-50'      },
    { label: 'Completed',    val: examList.filter(e => e.status === 'Completed').length,icon: CheckCircle, color: 'text-green-500 bg-green-50'  },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-[#f4f7f6] theme-app-bg">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-purple-100 text-purple-600 flex items-center justify-center">
              <PenTool className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Manage Online Exams</h1>
              <p className="text-sm text-gray-500">Create, schedule and manage online exams for your classes</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => Swal.fire({title:'Downloaded', text:'Exam report downloaded successfully!', icon:'success', toast:true, position:'top-end', showConfirmButton:false, timer:3000})} className="p-2 border border-gray-200 bg-white text-gray-500 hover:bg-gray-50"><Download className="w-4 h-4" /></button>
            <button onClick={() => { 
                setSelectedExam(null); 
                setForm({
                  title: '', subject: subjects[0], class: classes[0],
                  date: '', time: '', duration: '60', marks: '100', instructions: '',
                  shuffleQ: true, showResult: true, negativeMarking: false,
                });
                setActiveView('form'); 
              }}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-4 py-2 flex items-center gap-2 text-sm transition-colors">
              <Plus className="w-4 h-4" /> Create Exam
            </button>
          </div>
        </div>
      </div>

      {activeView === 'list' && (
        <div className="p-6 max-w-7xl mx-auto space-y-5">
          {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ label, val, icon: Icon, color }) => (
            <div key={label} className="bg-white border border-gray-200 shadow-sm p-4 flex items-center gap-4">
              <div className={`w-11 h-11 flex items-center justify-center flex-shrink-0 ${color}`}><Icon className="w-5 h-5" /></div>
              <div>
                <p className="text-2xl font-black text-gray-800">{val}</p>
                <p className="text-xs text-gray-500 font-medium">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center flex-wrap gap-2">
            {['All', 'Live', 'Upcoming', 'Completed', 'Draft'].map(s => (
              <button key={s} onClick={() => setFilter(s)}
                className={`px-3 py-1.5 text-xs font-bold border transition-colors flex items-center gap-1 ${filterStatus === s ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'}`}>
                {s === 'Live' && <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>}
                {s}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search exams..." value={search} onChange={e => setSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 border border-gray-200 text-xs w-52 focus:outline-none focus:ring-1 focus:ring-purple-300" />
          </div>
        </div>

        {/* Exams Table */}
        <div className="bg-white border border-gray-200 shadow-sm overflow-x-auto">
          <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr className="bg-gray-50">
                {['#', 'Exam Title', 'Subject', 'Class', 'Date & Time', 'Duration', 'Marks', 'Attempts', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider border border-gray-200">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((ex, i) => {
                const { cls, dot } = statusStyle[ex.status];
                return (
                  <tr key={ex.id} className="hover:bg-purple-50/20 transition-colors">
                    <td className="px-4 py-3 border border-gray-200 text-gray-400 text-xs">{i + 1}</td>
                    <td className="px-4 py-3 border border-gray-200">
                      <p className="font-semibold text-gray-800 max-w-[220px]">{ex.title}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{ex.totalQ} Questions</p>
                    </td>
                    <td className="px-4 py-3 border border-gray-200">
                      <span className="text-xs bg-indigo-50 text-indigo-600 border border-indigo-100 px-2 py-0.5 font-semibold">{ex.subject}</span>
                    </td>
                    <td className="px-4 py-3 border border-gray-200 text-gray-700 font-medium text-xs">{ex.class}</td>
                    <td className="px-4 py-3 border border-gray-200 text-xs">
                      <p className="text-gray-700">{ex.date}</p>
                      <p className="text-gray-400">{ex.time}</p>
                    </td>
                    <td className="px-4 py-3 border border-gray-200 text-gray-600 text-xs">{ex.duration}</td>
                    <td className="px-4 py-3 border border-gray-200 text-gray-700 font-semibold">{ex.marks}</td>
                    <td className="px-4 py-3 border border-gray-200">
                      <span className="text-xs font-bold text-gray-700">{ex.attempts}/{ex.maxStudents}</span>
                      <div className="w-20 h-1.5 bg-gray-100 mt-1 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-400 rounded-full" style={{ width: `${(ex.attempts / ex.maxStudents) * 100}%` }}></div>
                      </div>
                    </td>
                    <td className="px-4 py-3 border border-gray-200">
                      <span className={`flex items-center gap-1.5 text-xs font-bold px-2 py-0.5 w-fit ${cls}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${dot}`}></span>{ex.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 border border-gray-200">
                      <div className="flex items-center gap-1 flex-nowrap whitespace-nowrap">
                        <button onClick={() => { setSelectedExam(ex); setActiveView('view'); }} className="p-1.5 bg-blue-50 text-blue-500 border border-blue-200 hover:bg-blue-100" title="View"><Eye className="w-3.5 h-3.5" /></button>
                        {ex.status === 'Completed' && (
                          <button onClick={() => { setSelectedExam(ex); setActiveView('results'); }} className="p-1.5 bg-green-50 text-green-600 border border-green-200 hover:bg-green-100" title="Results"><BarChart2 className="w-3.5 h-3.5" /></button>
                        )}
                        {(ex.status === 'Draft' || ex.status === 'Upcoming') && (
                          <button onClick={() => handleAction('edit', ex)} className="p-1.5 bg-indigo-50 text-indigo-500 border border-indigo-200 hover:bg-indigo-100" title="Edit"><Edit className="w-3.5 h-3.5" /></button>
                        )}
                        {ex.status === 'Live' && (
                          <button onClick={() => handleAction('stop', ex)} className="p-1.5 bg-red-50 text-red-500 border border-red-200 hover:bg-red-100" title="Stop Exam"><Square className="w-3.5 h-3.5" /></button>
                        )}
                        <button onClick={() => handleAction('duplicate', ex)} className="p-1.5 bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100" title="Duplicate"><Copy className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleAction('delete', ex)} className="p-1.5 bg-red-50 text-red-400 border border-red-100 hover:bg-red-100" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={10} className="text-center py-14 text-gray-400 border border-gray-200">
                  <PenTool className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No exams found.</p>
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      )}

      {/* ===== EXAM FORM PAGE ===== */}
      {activeView === 'form' && (
        <div className="p-6 max-w-5xl mx-auto">
          <div className="bg-white w-full shadow-sm border border-gray-200 mb-6">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <PenTool className="w-5 h-5 text-purple-600" /> {selectedExam ? 'Edit Exam' : 'Create New Exam'}
              </h2>
              <button onClick={() => setActiveView('list')} className="p-1.5 hover:bg-gray-200 text-gray-500 rounded-sm font-semibold flex gap-1 items-center px-3"><X className="w-4 h-4" /> Cancel</button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Exam Title *</label>
                <input type="text" placeholder="e.g. Mid-Term Mathematics Test" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                  className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300/40" />
              </div>
              {[
                { label: 'Subject', key: 'subject', options: subjects },
                { label: 'Class', key: 'class', options: classes },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">{f.label}</label>
                  <select value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none">
                    {f.options.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Exam Date *</label>
                <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
                  className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Start Time *</label>
                <input type="time" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })}
                  className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Duration (min)</label>
                <select value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })}
                  className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none">
                  {['30','45','60','90','120'].map(v => <option key={v}>{v}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Total Marks</label>
                <input type="number" value={form.marks} onChange={e => setForm({ ...form, marks: e.target.value })}
                  className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Instructions</label>
                <textarea rows={3} placeholder="Exam instructions for students..." value={form.instructions}
                  onChange={e => setForm({ ...form, instructions: e.target.value })}
                  className="w-full border border-gray-200 px-3 py-2 text-sm resize-none focus:outline-none" />
              </div>
              {/* Toggles */}
              <div className="md:col-span-2 bg-gray-50 border border-gray-100 p-4 space-y-3">
                <p className="text-xs font-bold text-gray-500 uppercase">Exam Settings</p>
                {[
                  { label: 'Shuffle Questions',     key: 'shuffleQ'         },
                  { label: 'Show Result After Submit', key: 'showResult'     },
                  { label: 'Negative Marking',      key: 'negativeMarking'  },
                ].map(({ label, key }) => (
                  <label key={key} className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm text-gray-700">{label}</span>
                    <input type="checkbox" checked={form[key]} onChange={e => setForm({ ...form, [key]: e.target.checked })}
                      className="w-4 h-4 accent-purple-600" />
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-3 px-6 py-4 border-t border-gray-100">
              <button onClick={() => { setActiveView('list'); Swal.fire('Saved!', 'Exam saved as Draft.', 'success'); }}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 text-sm transition-colors">
                Create &amp; Save Draft
              </button>
              <button onClick={() => { setActiveView('list'); Swal.fire('Published!', 'Exam is now published.', 'success'); }}
                className="px-5 bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-sm transition-colors">
                Publish Now
              </button>
              <button onClick={() => setActiveView('list')} className="px-5 border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ===== VIEW EXAM DETAILS PAGE ===== */}
      {activeView === 'view' && selectedExam && (
        <div className="p-6 max-w-4xl mx-auto">
          <div className="bg-white w-full shadow-sm border border-gray-200 mb-6">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600" /> Exam Details
              </h2>
              <button onClick={() => setActiveView('list')} className="p-1.5 hover:bg-gray-200 text-gray-500 rounded-sm font-semibold flex items-center gap-1 px-3"><X className="w-4 h-4" /> Close</button>
            </div>
            <div className="p-6 flex flex-col gap-6">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-black text-gray-800 pr-4">{selectedExam.title}</h3>
                <span className={`text-xs font-bold px-3 py-1.5 flex-shrink-0 ${statusStyle[selectedExam.status]?.cls || ''}`}>{selectedExam.status}</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Subject', val: selectedExam.subject,  icon: BookOpen  },
                  { label: 'Class',   val: selectedExam.class,    icon: Users     },
                  { label: 'Date',    val: selectedExam.date,     icon: Calendar  },
                  { label: 'Time',    val: selectedExam.time,     icon: Clock     },
                  { label: 'Duration', val: selectedExam.duration, icon: Clock    },
                  { label: 'Total Marks', val: selectedExam.marks, icon: FileText },
                  { label: 'Questions', val: selectedExam.totalQ,  icon: PenTool  },
                  { label: 'Attempts', val: `${selectedExam.attempts}/${selectedExam.maxStudents}`, icon: Users },
                ].map(({ label, val, icon: Icon }) => (
                  <div key={label} className="bg-gray-50 border border-gray-100 p-3">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1"><Icon className="w-3 h-3" />{label}</p>
                    <p className="text-sm font-semibold text-gray-800">{val}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-between bg-gray-50">
              <button onClick={() => setActiveView('form')} className="px-5 py-2 font-bold bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100 transition-colors flex items-center gap-1"><Edit className="w-4 h-4" /> Edit Settings</button>
              <button onClick={() => setActiveView('list')} className="px-5 py-2 bg-gray-200 text-gray-700 font-bold hover:bg-gray-300">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* ===== RESULTS PAGE ===== */}
      {activeView === 'results' && selectedExam && (
        <div className="p-6 max-w-5xl mx-auto">
          <div className="bg-white w-full shadow-sm border border-gray-200 mb-6">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-green-100 text-green-600 flex items-center justify-center">
                  <BarChart2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800">Results: {selectedExam.title}</h2>
                  <p className="text-xs text-gray-500">View final scores and student performance</p>
                </div>
              </div>
              <button onClick={() => setActiveView('list')} className="p-1.5 hover:bg-gray-200 text-gray-500 rounded-sm font-semibold flex items-center gap-1 px-3"><X className="w-4 h-4" /> Close</button>
            </div>
            <div className="p-6">
              {/* Mini stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'Avg Score', val: `${Math.round(resultData.reduce((a,r)=>a+r.score,0)/resultData.length)}/${selectedExam.marks}` },
                  { label: 'Pass', val: resultData.filter(r=>r.status==='Pass').length },
                  { label: 'Fail', val: resultData.filter(r=>r.status==='Fail').length },
                ].map(({ label, val }) => (
                  <div key={label} className="bg-gray-50 border border-gray-200 p-3 text-center">
                    <p className="text-lg font-black text-gray-800">{val}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white border border-gray-200 shadow-sm overflow-x-auto">
                <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
                  <thead>
                    <tr className="bg-gray-50">
                      {['#', 'Student', 'Roll', 'Score', 'Time Taken', 'Result'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider border border-gray-200">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {resultData.map((r, i) => (
                      <tr key={i} className={`${r.status === 'Fail' ? 'bg-red-50/10' : 'hover:bg-gray-50'} transition-colors`}>
                        <td className="px-4 py-3 border border-gray-200 text-gray-400 text-xs">{i + 1}</td>
                        <td className="px-4 py-3 border border-gray-200">
                          <div className="flex items-center gap-2">
                            <img src={r.photo} alt="" className="w-7 h-7 rounded-full object-cover border border-gray-200" />
                            <span className="font-semibold text-gray-800 text-sm">{r.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 border border-gray-200 text-indigo-600 font-bold text-xs">{r.roll}</td>
                        <td className="px-4 py-3 border border-gray-200">
                          <span className="font-black text-gray-800 text-base">{r.score}</span>
                          <span className="text-gray-400 text-xs ml-0.5">/{r.total}</span>
                          <div className="w-20 h-1.5 bg-gray-100 mt-1 rounded-full overflow-hidden flex">
                            <div className={`h-full rounded-full ${(r.score/r.total)>=0.6?'bg-green-400':'bg-red-400'}`} style={{ width: `${(r.score/r.total)*100}%` }}></div>
                          </div>
                        </td>
                        <td className="px-4 py-3 border border-gray-200 text-gray-500 text-xs font-medium">{r.time}</td>
                        <td className="px-4 py-3 border border-gray-200">
                          <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 ${r.status==='Pass'?'bg-green-100 text-green-700':'bg-red-100 text-red-600'}`}>{r.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-between bg-gray-50">
              <button className="flex items-center gap-1.5 px-5 py-2 bg-indigo-50 text-indigo-600 border border-indigo-200 font-bold hover:bg-indigo-100 transition-colors">
                <Download className="w-4 h-4" /> Export Results
              </button>
              <button onClick={() => setActiveView('list')} className="px-5 py-2 bg-gray-200 text-gray-700 font-bold hover:bg-gray-300">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageOnlineExams;
