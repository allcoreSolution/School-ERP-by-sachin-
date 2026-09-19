import React, { useState, useMemo, useEffect } from 'react';
import {
  CheckCircle, XCircle, Clock, Users, Calendar,
  Save, ChevronLeft, ChevronRight, Download,
  BarChart2, Filter, Search, Eye, X, AlertTriangle
} from 'lucide-react';
import { studentService } from '../api/studentService';
import { attendanceService } from '../api/attendanceService';

const classes   = ['X – A', 'X – B', 'IX – A', 'IX – B', 'VIII – A', 'VIII – B', 'XI – C'];
const subjects  = ['Mathematics', 'Science', 'English', 'History'];

// Past days columns
const pastDays = ['01','02','03','04','05','08','09','10','11'];

const todayStr = new Date().toISOString().slice(8, 10);

const statusCycle = { P: 'A', A: 'L', L: 'P' };
const statusLabel = { P: 'Present', A: 'Absent', L: 'Late' };
const statusStyle = {
  P: { btn: 'bg-green-500 text-white border-green-500',  badge: 'bg-green-100 text-green-700 border border-green-200' },
  A: { btn: 'bg-red-500 text-white border-red-500',      badge: 'bg-red-100 text-red-600 border border-red-200' },
  L: { btn: 'bg-yellow-400 text-white border-yellow-400', badge: 'bg-yellow-100 text-yellow-700 border border-yellow-200' },
};

const StudentAttendance = () => {
  const today = new Date();
  const [selectedClass,   setClass]   = useState('X – A');
  const [selectedSubject, setSubject] = useState('Mathematics');
  const [date,            setDate]    = useState(today.toISOString().slice(0,10));
  const [tab,             setTab]     = useState('mark'); // 'mark' | 'report'
  const [search,          setSearch]  = useState('');
  const [saved,           setSaved]   = useState(false);
  const [viewSummary,     setViewSummary] = useState(null);

  const [students, setStudents] = useState([]);
  const [attendanceHistory, setAttendanceHistory] = useState({});
  const [loading, setLoading] = useState(false);
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    fetchStudents();
  }, [selectedClass]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await studentService.getStudents({ limit: 100 });
      if (response?.data) {
        // Map backend students to frontend format
        let mapped = response.data.map(item => ({
             id: item._id,
             name: `${item.firstName || ''} ${item.lastName || ''}`.trim(),
             roll: item.aparId || '-',
             photo: item.studentPhoto ? `http://192.168.1.12:5050/${item.studentPhoto}` : `https://ui-avatars.com/api/?name=${item.firstName}&background=A7F3D0`,
             classId: item.classId?._id || '',
             className: item.classId?.className || '',
             sectionId: item.sectionId?._id || ''
        }));
        
        setStudents(mapped);
        
        let initAtt = {};
        let initHist = {};
        mapped.forEach(s => { 
           initAtt[s.id] = 'P'; 
           initHist[s.id] = {};
           pastDays.forEach(d => {
             const r = Math.random();
             initHist[s.id][d] = r > 0.15 ? 'P' : r > 0.05 ? 'L' : 'A';
           });
        });
        setAttendance(initAtt);
        setAttendanceHistory(initHist);
      }
    } catch (e) {
      console.error('Failed to load students', e);
    } finally {
      setLoading(false);
    }
  };

  const toggle = (id) => setAttendance(prev => ({ ...prev, [id]: statusCycle[prev[id]] }));
  const markAll = (status) => {
    const next = {};
    students.forEach(s => { next[s.id] = status; });
    setAttendance(next);
  };

  const counts = useMemo(() => {
    const p = Object.values(attendance).filter(v => v === 'P').length;
    const a = Object.values(attendance).filter(v => v === 'A').length;
    const l = Object.values(attendance).filter(v => v === 'L').length;
    return { p, a, l, total: students.length };
  }, [attendance]);

  const handleSave = async () => {
    try {
      const payload = students.map(s => ({
         student: s.id,
         date: date,
         status: attendance[s.id] === 'P' ? 'Present' : attendance[s.id] === 'A' ? 'Absent' : 'Late',
         academicClass: s.classId || '65fac00d41e7d23a670dbfed',
         section: s.sectionId || '65fac00d41e7d23a670dbfef',
         remarks: ''
      }));
      await attendanceService.markStudentAttendance(payload);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      console.error("Save error", e);
    }
  };

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.roll.toLowerCase().includes(search.toLowerCase())
  );

  const getSummary = (sid) => {
    const hist = attendanceHistory[sid] || {};
    const total  = pastDays.length;
    const present = Object.values(hist).filter(v => v === 'P').length;
    const absent  = Object.values(hist).filter(v => v === 'A').length;
    const late    = Object.values(hist).filter(v => v === 'L').length;
    const pct = Math.round((present / total) * 100);
    return { total, present, absent, late, pct, hist };
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#f4f7f6] theme-app-bg">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-amber-100 text-amber-600 flex items-center justify-center">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Student Attendance</h1>
              <p className="text-sm text-gray-500">Mark and track daily student attendance</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {['mark', 'report'].map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-4 py-1.5 text-xs font-bold border capitalize transition-colors ${tab === t ? 'bg-amber-500 text-white border-amber-500' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'}`}>
                {t === 'mark' ? '✏️ Mark Attendance' : '📊 Attendance Report'}
              </button>
            ))}
            <button className="p-2 border border-gray-200 bg-white text-gray-500 hover:bg-gray-50"><Download className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto space-y-5">

        {/* Filters Row */}
        <div className="bg-white border border-gray-200 shadow-sm px-5 py-4 flex flex-wrap items-center gap-4">
          <div>
            <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1">Class</label>
            <select value={selectedClass} onChange={e => setClass(e.target.value)}
              className="border border-gray-200 px-3 py-1.5 text-sm focus:outline-none min-w-[110px]">
              {classes.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1">Subject</label>
            <select value={selectedSubject} onChange={e => setSubject(e.target.value)}
              className="border border-gray-200 px-3 py-1.5 text-sm focus:outline-none min-w-[130px]">
              {subjects.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1">Date</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)}
              className="border border-gray-200 px-3 py-1.5 text-sm focus:outline-none" />
          </div>
          <div className="flex-1 min-w-[180px]">
            <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1">Search Student</label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Name or roll..." value={search} onChange={e => setSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 border border-gray-200 text-sm w-full focus:outline-none" />
            </div>
          </div>
        </div>

        {/* ===== MARK ATTENDANCE TAB ===== */}
        {tab === 'mark' && (
          <>
            {/* Summary Counts */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Students', val: counts.total, icon: Users,       color: 'text-indigo-500 bg-indigo-50' },
                { label: 'Present',        val: counts.p,     icon: CheckCircle, color: 'text-green-500 bg-green-50'   },
                { label: 'Absent',         val: counts.a,     icon: XCircle,     color: 'text-red-500 bg-red-50'       },
                { label: 'Late',           val: counts.l,     icon: Clock,       color: 'text-yellow-500 bg-yellow-50' },
              ].map(({ label, val, icon: Icon, color }) => (
                <div key={label} className="bg-white border border-gray-200 shadow-sm p-4 flex items-center gap-4">
                  <div className={`w-11 h-11 flex items-center justify-center flex-shrink-0 ${color}`}><Icon className="w-5 h-5" /></div>
                  <div>
                    <p className="text-2xl font-black text-gray-800">{val}</p>
                    <p className="text-xs text-gray-500 font-medium">{label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Mark All Buttons */}
            <div className="bg-white border border-gray-200 shadow-sm px-5 py-3 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-500">Mark All:</span>
                <button onClick={() => markAll('P')} className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-bold transition-colors flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> All Present
                </button>
                <button onClick={() => markAll('A')} className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-bold transition-colors flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5" /> All Absent
                </button>
                <button onClick={() => markAll('L')} className="px-3 py-1.5 bg-yellow-400 hover:bg-yellow-500 text-white text-xs font-bold transition-colors flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> All Late
                </button>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-gray-400">
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-400 inline-block"></span>Click to cycle: P → A → L → P</span>
              </div>
            </div>

            {/* Attendance Table */}
            <div className="bg-white border border-gray-200 shadow-sm overflow-x-auto">
              <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr className="bg-gray-50">
                    {['#', 'Student', 'Roll No.', 'Status', 'Toggle', 'History (Sep)'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider border border-gray-200">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((s, i) => {
                    const st = attendance[s.id];
                    const hist = attendanceHistory[s.id] || {};
                    return (
                      <tr key={s.id} className={`transition-colors ${st === 'A' ? 'bg-red-50/40' : st === 'L' ? 'bg-yellow-50/40' : 'hover:bg-gray-50/50'}`}>
                        <td className="px-4 py-3 border border-gray-200 text-gray-400 text-xs">{i + 1}</td>
                        <td className="px-4 py-3 border border-gray-200">
                          <div className="flex items-center gap-2.5">
                            <img src={s.photo} alt={s.name} className="w-8 h-8 rounded-full object-cover border border-gray-200 flex-shrink-0" />
                            <p className="font-semibold text-gray-800">{s.name}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 border border-gray-200 text-amber-600 font-bold text-xs">{s.roll}</td>
                        <td className="px-4 py-3 border border-gray-200">
                          <span className={`text-xs font-bold px-3 py-1 ${statusStyle[st].badge}`}>{statusLabel[st]}</span>
                        </td>
                        <td className="px-4 py-3 border border-gray-200">
                          <button onClick={() => toggle(s.id)}
                            className={`text-xs font-bold px-4 py-1.5 border transition-all hover:opacity-90 ${statusStyle[st].btn}`}>
                            {st}
                          </button>
                        </td>
                        <td className="px-4 py-3 border border-gray-200">
                          <div className="flex items-center gap-0.5">
                            {pastDays.map(d => (
                              <div key={d} title={`Sep ${d}: ${statusLabel[hist[d] || 'P']}`}
                                className={`w-5 h-5 flex items-center justify-center text-[9px] font-black border
                                  ${hist[d] === 'P' ? 'bg-green-400 text-white border-green-500' :
                                    hist[d] === 'A' ? 'bg-red-400 text-white border-red-500' :
                                    'bg-yellow-400 text-white border-yellow-500'}`}>
                                {hist[d] || 'P'}
                              </div>
                            ))}
                          </div>
                          <p className="text-[9px] text-gray-400 mt-0.5">{pastDays.map(d => `${d}`).join(', ')} Sep</p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Save Button */}
            <div className="flex justify-between items-center bg-white border border-gray-200 shadow-sm px-5 py-4">
              <div className="text-xs text-gray-400">
                <span className="font-bold text-gray-600">{selectedClass}</span> — {selectedSubject} —
                <span className="ml-1">{new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
              </div>
              <button onClick={handleSave}
                className={`flex items-center gap-2 px-6 py-2.5 font-bold text-sm transition-colors ${saved ? 'bg-green-500 text-white' : 'bg-amber-500 hover:bg-amber-600 text-white'}`}>
                <Save className="w-4 h-4" />
                {saved ? '✓ Attendance Saved!' : 'Save Attendance'}
              </button>
            </div>
          </>
        )}

        {/* ===== REPORT TAB ===== */}
        {tab === 'report' && (
          <>
            <div className="bg-yellow-50 border border-yellow-200 px-4 py-3 flex items-center gap-2 text-sm text-yellow-800">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              Students below <strong className="mx-1">75%</strong> attendance are at risk. Contact parents immediately.
            </div>

            <div className="bg-white border border-gray-200 shadow-sm overflow-x-auto">
              <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-base font-bold text-gray-800">Monthly Attendance Report — September 2026</h2>
                <p className="text-xs text-gray-400 font-semibold">Class: {selectedClass} | Subject: {selectedSubject}</p>
              </div>
              <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr className="bg-gray-50">
                    {['#', 'Student', 'Roll', 'Present', 'Absent', 'Late',
                       ...pastDays.map(d => `${d}`), 'Attendance%', 'Remarks'].map(h => (
                      <th key={h} className="text-center px-3 py-3 text-xs font-bold text-gray-500 uppercase border border-gray-200 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((s, i) => {
                    const { present, absent, late, pct, hist } = getSummary(s.id);
                    const rowClr = pct < 75 ? 'bg-red-50/50' : pct < 90 ? 'bg-yellow-50/30' : '';
                    return (
                      <tr key={s.id} className={`hover:brightness-95 transition-colors ${rowClr}`}>
                        <td className="px-3 py-3 border border-gray-200 text-gray-400 text-center text-xs">{i + 1}</td>
                        <td className="px-3 py-3 border border-gray-200">
                          <div className="flex items-center gap-2">
                            <img src={s.photo} alt="" className="w-6 h-6 rounded-full object-cover border border-gray-200 flex-shrink-0" />
                            <span className="font-semibold text-gray-800 whitespace-nowrap text-xs">{s.name}</span>
                          </div>
                        </td>
                        <td className="px-3 py-3 border border-gray-200 text-amber-600 font-bold text-[11px] text-center">{s.roll}</td>
                        <td className="px-3 py-3 border border-gray-200 text-green-700 font-bold text-center">{present}</td>
                        <td className="px-3 py-3 border border-gray-200 text-red-600 font-bold text-center">{absent}</td>
                        <td className="px-3 py-3 border border-gray-200 text-yellow-600 font-bold text-center">{late}</td>
                        {pastDays.map(d => (
                          <td key={d} className="border border-gray-200 text-center">
                            <span className={`text-[10px] font-black block py-1 ${
                              hist[d] === 'P' ? 'text-green-600' :
                              hist[d] === 'A' ? 'text-red-500 bg-red-50' : 'text-yellow-600'}`}>
                              {hist[d] || 'P'}
                            </span>
                          </td>
                        ))}
                        <td className="px-3 py-3 border border-gray-200 text-center">
                          <span className={`text-xs font-black px-2 py-0.5 ${pct >= 90 ? 'bg-green-100 text-green-700' : pct >= 75 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-600'}`}>{pct}%</span>
                        </td>
                        <td className="px-3 py-3 border border-gray-200 text-center text-[10px] font-bold">
                          {pct >= 90
                            ? <span className="text-green-600">Excellent</span>
                            : pct >= 75
                            ? <span className="text-yellow-600">Satisfactory</span>
                            : <span className="text-red-500 flex items-center gap-0.5 justify-center"><AlertTriangle className="w-3 h-3" />At Risk</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}

      </div>

      {/* View Summary Modal */}
      {viewSummary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setViewSummary(null)}>
          <div className="bg-white w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="font-bold text-gray-800">Attendance Summary</h2>
              <button onClick={() => setViewSummary(null)} className="hover:bg-gray-100 p-1.5 text-gray-500"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-6 text-sm text-gray-700">Details coming soon.</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentAttendance;
