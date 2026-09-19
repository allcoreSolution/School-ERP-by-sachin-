import React, { useState, useEffect } from 'react';
import {
  Video, Plus, Search, Eye, Trash2, Edit, Users,
  Clock, Calendar, Play, StopCircle, Radio, X, CheckCircle, Link
} from 'lucide-react';
import { liveClassService } from '../api/liveClassService';
import { academicService } from '../api/academicService';

const statusStyle = {
  Live: 'bg-red-100 text-red-600 border border-red-200 animate-pulse',
  Scheduled: 'bg-blue-100 text-blue-600 border border-blue-200',
  Completed: 'bg-green-100 text-green-700 border border-green-200',
};

const ManageLiveClasses = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [classes, setClasses] = useState([]);
  
  const [academicClasses, setAcademicClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [form, setForm] = useState({ title: '', classId: '', sectionId: '', subjectId: '', date: '', time: '', duration: '45', platform: 'Zoom', link: '' });

  useEffect(() => {
    fetchMetadata();
    fetchLiveClasses();
  }, []);

  const fetchMetadata = async () => {
    try {
      const clsM = await academicService.getClasses();
      const secM = await academicService.getSections();
      const subM = await academicService.getSubjects();
      
      if(clsM.data) setAcademicClasses(clsM.data);
      if(secM.data) setSections(secM.data);
      if(subM.data) setSubjects(subM.data);
    } catch(e) { console.error(e); }
  };

  const fetchLiveClasses = async () => {
    try {
      const res = await liveClassService.getLiveClasses();
      if (res.success) {
        setClasses(res.data.map(c => ({
          id: c._id,
          title: c.title,
          subject: c.subject?.subjectName || 'N/A',
          class: 'Academic', // can combine class/section if populated
          date: new Date(c.startTime).toLocaleDateString(),
          time: new Date(c.startTime).toLocaleTimeString(),
          duration: `${c.durationMinutes} min`,
          status: c.status,
          students: 0,
          link: c.meetingUrl
        })));
      }
    } catch(e) { console.error(e); }
  };

  const handleSchedule = async () => {
    try {
      const loggedUser = JSON.parse(localStorage.getItem('user') || '{}'); 
      const payload = {
        title: form.title,
        hostId: loggedUser.id || loggedUser._id || '65fac00d41e7d23a670dbfed',
        academicClass: form.classId,
        section: form.sectionId,
        subject: form.subjectId,
        meetingUrl: form.link || 'https://zoom.us/j/12345678',
        platform: form.platform,
        startTime: `${form.date}T${form.time}:00`,
        durationMinutes: parseInt(form.duration),
        status: 'Scheduled'
      };
      
      const res = await liveClassService.scheduleClass(payload);
      if(res.success) {
         setShowModal(false);
         fetchLiveClasses();
         setForm({ title: '', classId: '', sectionId: '', subjectId: '', date: '', time: '', duration: '45', platform: 'Zoom', link: '' });
      }
    } catch (e) {
      console.error(e);
      alert("Error scheduling class");
    }
  };

  const filtered = classes.filter(c =>
    (filter === 'All' || c.status === filter) &&
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto bg-[#f4f7f6] theme-app-bg">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-red-100 text-red-500 flex items-center justify-center">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Manage Live Classes</h1>
            <p className="text-sm text-gray-500">Schedule, host and manage all your live sessions</p>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto space-y-5">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Classes', val: 4, icon: Video, color: 'text-indigo-500 bg-indigo-50' },
            { label: 'Live Now', val: 1, icon: Radio, color: 'text-red-500 bg-red-50' },
            { label: 'Scheduled', val: 1, icon: Calendar, color: 'text-blue-500 bg-blue-50' },
            { label: 'Completed', val: 2, icon: CheckCircle, color: 'text-green-500 bg-green-50' },
          ].map(({ label, val, icon: Icon, color }) => (
            <div key={label} className="bg-white border border-gray-200 p-4 flex items-center gap-4 shadow-sm">
              <div className={`w-12 h-12 flex items-center justify-center flex-shrink-0 ${color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-black text-gray-800">{val}</p>
                <p className="text-xs text-gray-500 font-medium">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            {['All', 'Live', 'Scheduled', 'Completed'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 text-xs font-bold border transition-colors ${filter === f ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'}`}
              >
                {f}
              </button>
            ))}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search classes..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 border border-gray-200 text-xs w-48 focus:outline-none focus:ring-1 focus:ring-indigo-300"
              />
            </div>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 flex items-center gap-2 text-sm transition-colors"
          >
            <Plus className="w-4 h-4" /> Schedule Live Class
          </button>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 shadow-sm overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {['#', 'Class Title', 'Subject / Class', 'Date & Time', 'Duration', 'Students', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider border border-gray-200">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((cls, i) => (
                <tr key={cls.id} className="hover:bg-indigo-50/20 transition-colors">
                  <td className="px-4 py-3 border border-gray-200 text-gray-500 font-medium">{i + 1}</td>
                  <td className="px-4 py-3 border border-gray-200">
                    <p className="font-semibold text-gray-800">{cls.title}</p>
                    {cls.link && (
                      <a href={cls.link} target="_blank" rel="noreferrer" className="text-[11px] text-blue-500 hover:underline flex items-center gap-1 mt-0.5">
                        <Link className="w-2.5 h-2.5" /> Join Link
                      </a>
                    )}
                  </td>
                  <td className="px-4 py-3 border border-gray-200">
                    <p className="font-medium text-gray-700">{cls.subject}</p>
                    <p className="text-xs text-gray-400">{cls.class}</p>
                  </td>
                  <td className="px-4 py-3 border border-gray-200">
                    <p className="text-gray-700">{cls.date}</p>
                    <p className="text-xs text-gray-400">{cls.time}</p>
                  </td>
                  <td className="px-4 py-3 border border-gray-200 text-gray-600">{cls.duration}</td>
                  <td className="px-4 py-3 border border-gray-200">
                    <span className="flex items-center gap-1 text-gray-700"><Users className="w-3.5 h-3.5 text-gray-400" />{cls.students}</span>
                  </td>
                  <td className="px-4 py-3 border border-gray-200">
                    <span className={`text-xs font-bold px-2 py-1 ${statusStyle[cls.status]}`}>
                      {cls.status === 'Live' && '● '}{cls.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 border border-gray-200">
                    <div className="flex items-center gap-1">
                      {cls.status === 'Live' && (
                        <button className="p-1.5 bg-red-50 text-red-500 border border-red-200 hover:bg-red-100 transition-colors" title="Stop"><StopCircle className="w-3.5 h-3.5" /></button>
                      )}
                      {cls.status === 'Scheduled' && (
                        <button className="p-1.5 bg-green-50 text-green-600 border border-green-200 hover:bg-green-100 transition-colors" title="Start"><Play className="w-3.5 h-3.5" /></button>
                      )}
                      <button className="p-1.5 bg-blue-50 text-blue-500 border border-blue-200 hover:bg-blue-100 transition-colors" title="Edit"><Edit className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100 transition-colors" title="View"><Eye className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 bg-red-50 text-red-400 border border-red-100 hover:bg-red-100 transition-colors" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="text-center py-12 text-gray-400 border border-gray-200">No classes found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Schedule Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white w-full max-w-lg shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Video className="w-5 h-5 text-red-500" /> Schedule New Live Class
              </h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 hover:bg-gray-100 text-gray-500"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Class Title</label>
                <input type="text" placeholder="e.g. Chapter 5: Polynomials" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                    className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400/20" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Class</label>
                  <select value={form.classId} onChange={e => setForm({ ...form, classId: e.target.value })} className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none">
                    <option value="">Select</option>
                    {academicClasses.map(c => <option key={c._id} value={c._id}>{c.className}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Section</label>
                  <select value={form.sectionId} onChange={e => setForm({ ...form, sectionId: e.target.value })} className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none">
                    <option value="">Select</option>
                    {sections.map(s => <option key={s._id} value={s._id}>{s.sectionName}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Subject</label>
                  <select value={form.subjectId} onChange={e => setForm({ ...form, subjectId: e.target.value })} className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none">
                    <option value="">Select</option>
                    {subjects.map(s => <option key={s._id} value={s._id}>{s.subjectName}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Date</label>
                  <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Time</label>
                  <input type="time" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Duration (min)</label>
                  <select value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none">
                    {[30, 45, 60, 90].map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Platform</label>
                  <select value={form.platform} onChange={e => setForm({ ...form, platform: e.target.value })} className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none">
                    {['Google Meet', 'Zoom', 'MS Teams', 'Custom'].map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Meeting Link (optional)</label>
                <input type="url" placeholder="https://meet.google.com/..." value={form.link} onChange={e => setForm({ ...form, link: e.target.value })}
                  className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none" />
              </div>
            </div>
            <div className="flex gap-3 px-6 py-4 border-t border-gray-100">
              <button onClick={handleSchedule} className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 text-sm transition-colors">
                Schedule Class
              </button>
              <button onClick={() => setShowModal(false)} className="px-5 border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageLiveClasses;
