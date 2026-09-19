import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, BookOpen, List, Tags, Award, LayoutGrid, Calendar, Edit3, Star, MessageSquare, PenTool, CheckSquare, FileText, TrendingUp, History, ClipboardList,
  Plus, Grid as GridIcon, Copy, Printer, Search, ChevronDown, Edit, Trash2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area,
  PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';

const COLORS = ['#0ea5e9', '#f59e0b', '#8b5cf6', '#ec4899', '#10b981'];
const ATTENDANCE_COLORS = ['#10b981', '#ef4444'];

export default function OfflineExaminations({ initialTab = 'Dashboard' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [examTypes, setExamTypes] = useState([]);
  const [typesViewMode, setTypesViewMode] = useState('list');
  const navigate = useNavigate();

  // Dashboard stats state
  const [examScheduleData, setExamScheduleData] = useState([]);
  const [examTypeData, setExamTypeData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([{ name: 'Present', value: 0 }, { name: 'Absent', value: 0 }]);
  const [marksEntryProgress, setMarksEntryProgress] = useState([]);
  const [passFailData, setPassFailData] = useState([]);
  const [recentExams, setRecentExams] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({ examsThisSession: 0, upcomingExams: 0, marksEntryPercent: 0, publishedMarksheets: 0 });
  const [operations, setOperations] = useState([
    { label: 'Exam Types', count: 0, icon: Tags, color: 'text-orange-500' },
    { label: 'Grades', count: 0, icon: Award, color: 'text-purple-500' },
    { label: 'Scheduled Papers', count: 0, icon: Calendar, color: 'text-green-500' },
    { label: 'Report Card Setups', count: 0, icon: LayoutGrid, color: 'text-teal-500' },
    { label: 'Uploaded Marksheets', count: 0, icon: FileText, color: 'text-yellow-500' },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API calls e.g. assessmentService.getDashboard()
        // const res = await assessmentService.getDashboard();
        // setExamScheduleData(res.scheduleData || []);
        // setExamTypeData(res.typeData || []);
        // setRecentExams(res.recentExams || []);
        // setMarksEntryProgress(res.marksProgress || []);
        // setPassFailData(res.passFailData || []);
        // setDashboardStats(res.stats || {});
      } catch (err) {
        console.error('Failed to load exam dashboard:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  useEffect(() => {
    const fetchExamTypes = async () => {
      try {
        // TODO: Replace with actual API call e.g. assessmentService.getExamTypes()
        // const res = await assessmentService.getExamTypes();
        // setExamTypes(res.data || []);
      } catch (err) {
        console.error('Failed to load exam types:', err);
      }
    };
    if (activeTab === 'Exam Types') fetchExamTypes();
  }, [activeTab]);

  const handleExport = (type) => {
    if (type === 'print') {
      window.print();
    } else {
      alert(`Exporting data as ${type}...`);
    }
  };

  const handleDeleteExamType = (id) => {
    if (window.confirm('Are you sure you want to delete this exam type?')) {
      setExamTypes(examTypes.filter(et => et.id !== id));
    }
  };

  const tabs = [
    { id: 'Dashboard', icon: LayoutDashboard },
    { id: 'Guide', icon: BookOpen },
    { id: 'Manage Exams', icon: List },
    { id: 'Exam Types', icon: Tags },
    { id: 'Manage Grades', icon: Award },
    { id: 'Cocurricular Areas', icon: LayoutGrid },
    { id: 'Schedule & Marks Setup', icon: Calendar },
    { id: 'Enter Marks', icon: Edit3 },
    { id: 'Cocurricular Grades', icon: Star },
    { id: 'Teacher Remarks', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-10">
      {/* Header */}
      <div className="bg-white px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Offline Examinations</h1>
          <p className="text-sm text-slate-500 mt-1">
            Set up exams, schedule papers, enter marks, and generate report cards across the school.
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => navigate('/offline-exams/quick-setup')}
            className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-bold text-sm rounded-none shadow-sm hover:bg-slate-50 flex items-center gap-2 cursor-pointer transition-colors"
          >
            <PenTool className="w-4 h-4" /> Quick Setup
          </button>
          <button 
            onClick={() => navigate('/offline-exams/manage')}
            className="px-4 py-2 bg-[#5b5fcf] hover:bg-[#4a4db5] text-white font-bold text-sm rounded-none shadow-sm flex items-center gap-2 cursor-pointer transition-colors border-none"
          >
            <List className="w-4 h-4" /> Manage Exams
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b border-slate-200 px-6">
        <div className="flex gap-6 overflow-x-auto whitespace-nowrap scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.id === 'Schedule & Marks Setup') {
                  navigate('/offline-exams/schedule-marks');
                } else if (tab.id === 'Enter Marks') {
                  navigate('/offline-exams/enter-marks');
                } else if (tab.id === 'Cocurricular Areas') {
                  navigate('/offline-exams/cocurricular-areas');
                } else if (tab.id === 'Cocurricular Grades') {
                  navigate('/offline-exams/cocurricular-grades');
                } else if (tab.id === 'Manage Grades') {
                  navigate('/offline-exams/manage-grades');
                } else {
                  setActiveTab(tab.id);
                }
              }}
              className={`pb-3 pt-3 font-bold text-sm flex items-center gap-2 border-b-2 transition-colors cursor-pointer bg-transparent ${
                activeTab === tab.id 
                  ? 'border-indigo-600 text-indigo-700' 
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <tab.icon className="w-4 h-4" /> {tab.id}
            </button>
          ))}
          <button className="pb-3 pt-3 font-bold text-sm flex items-center gap-2 border-b-2 border-transparent text-slate-500 hover:text-slate-800 ml-auto cursor-pointer bg-transparent">
             ... More Menu 
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 max-w-[1400px] mx-auto">
        {activeTab === 'Dashboard' && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white border-t-2 border-t-[#0ea5e9] border-x border-b border-slate-200 rounded-none p-5 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-none bg-[#e0f2fe] flex items-center justify-center text-[#0ea5e9] shrink-0">
                  <List className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Exams This Session</div>
                  <div className="text-3xl font-black text-slate-800 mb-1">{dashboardStats.examsThisSession ?? 0}</div>
                  <div className="text-[11px] text-[#0ea5e9] font-medium">{dashboardStats.examsThisSession ?? 0} total all-time</div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-none p-5 shadow-sm flex items-start gap-4 relative overflow-hidden before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-[#8b5cf6]">
                <div className="w-10 h-10 rounded-none bg-[#f3e8ff] flex items-center justify-center text-[#9333ea] shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Upcoming Exams</div>
                  <div className="text-3xl font-black text-slate-800 mb-1">{dashboardStats.upcomingExams ?? 0}</div>
                  <div className="text-[11px] text-[#0ea5e9] font-medium">0 ongoing now</div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-none p-5 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-none bg-[#fef3c7] flex items-center justify-center text-[#d97706] shrink-0">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Marks Entry</div>
                  <div className="text-3xl font-black text-slate-800 mb-1">{dashboardStats.marksEntryPercent ?? 0}%</div>
                  <div className="text-[11px] text-slate-500 font-medium">marks entry progress</div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-none p-5 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-none bg-[#dcfce7] flex items-center justify-center text-[#16a34a] shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Published Marksheets</div>
                  <div className="text-3xl font-black text-slate-800 mb-1">{dashboardStats.publishedMarksheets ?? 0}</div>
                  <div className="text-[11px] text-[#16a34a] font-medium">uploaded &amp; published</div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white border border-slate-200 rounded-none p-5 shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <div className="w-4 h-4 rounded-none border-2 border-blue-500 flex items-center justify-center">
                       <div className="w-2 h-2 rounded-none bg-blue-500"></div>
                    </div>
                    Overall Marks Entry Progress
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Percentage of class-subject distributions that have marks entered.</p>
                </div>
                <div className="text-2xl font-bold text-[#f59e0b]">{dashboardStats.marksEntryPercent ?? 0}%</div>
              </div>
              <div className="w-full bg-slate-100 rounded-none h-2.5 mt-4">
                <div className="bg-[#f59e0b] h-2.5 rounded-none" style={{ width: `${dashboardStats.marksEntryPercent ?? 0}%` }}></div>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white border border-slate-200 rounded-none shadow-sm min-h-[300px]">
                <div className="p-4 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" /> Upcoming Exam Schedule (Next 15 Days)
                  </h3>
                </div>
                <div className="p-4 h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={examScheduleData} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" tick={{fontSize: 10, fill: '#64748b'}} tickLine={false} axisLine={false} />
                      <YAxis tick={{fontSize: 10, fill: '#64748b'}} tickLine={false} axisLine={false} tickCount={4} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }} />
                      <Area type="monotone" dataKey="count" stroke="#0ea5e9" fill="#e0f2fe" strokeWidth={2} dot={{r: 4, fill: "#0ea5e9", strokeWidth: 0}} activeDot={{r: 6, fill: "#0ea5e9", strokeWidth: 0}} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-none shadow-sm min-h-[300px]">
                <div className="p-4 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <Tags className="w-4 h-4 text-orange-500" /> By Exam Type
                  </h3>
                </div>
                <div className="p-4 h-[250px] flex items-center justify-center relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={examTypeData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={2} dataKey="value" stroke="none">
                        {examTypeData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-none shadow-sm min-h-[300px]">
                <div className="p-4 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <CheckSquare className="w-4 h-4 text-purple-500" /> Exam Attendance
                  </h3>
                </div>
                <div className="p-4 h-[250px] flex flex-col items-center justify-center relative">
                  <div className="h-[180px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={attendanceData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={2} dataKey="value" startAngle={90} endAngle={-270} stroke="none">
                          {attendanceData.map((entry, index) => <Cell key={`cell-${index}`} fill={ATTENDANCE_COLORS[index % ATTENDANCE_COLORS.length]} />)}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex gap-4 mt-2">
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium"><div className="w-2.5 h-2.5 bg-[#10b981] rounded-none"></div> present</div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium"><div className="w-2.5 h-2.5 bg-[#ef4444] rounded-none"></div> absent</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: Marks Entry & Pass/Fail */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-none shadow-sm">
                <div className="p-4 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-500" /> Marks Entry Progress by Exam
                  </h3>
                </div>
                <div className="p-4 space-y-4 max-h-[350px] overflow-y-auto">
                  {marksEntryProgress.length === 0 ? (
                    <div className="text-center text-slate-400 text-xs py-6">No marks entry data available.</div>
                  ) : marksEntryProgress.map((exam, idx) => {
                    const percent = exam.total > 0 ? Math.round((exam.current / exam.total) * 100) : 0;
                    return (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-slate-700">{exam.name}</span>
                          <span className="text-slate-400 font-medium">{exam.current}/{exam.total} - {percent}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-none overflow-hidden">
                          <div className={`${exam.color} h-full rounded-none`} style={{ width: `${percent}%` }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-none shadow-sm">
                <div className="p-4 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-500" /> Pass vs Fail by Class
                  </h3>
                </div>
                <div className="p-4 h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={passFailData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                      <XAxis type="number" tick={{fontSize: 10, fill: '#64748b'}} axisLine={false} tickLine={false} />
                      <YAxis dataKey="name" type="category" tick={{fontSize: 10, fill: '#64748b'}} axisLine={false} tickLine={false} width={60} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Legend iconType="square" wrapperStyle={{ fontSize: '10px' }} />
                      <Bar dataKey="passed" name="Passed" stackId="a" fill="#10b981" barSize={20} />
                      <Bar dataKey="failed" name="Failed" stackId="a" fill="#ef4444" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Row 3: Bottom Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-slate-200 rounded-none shadow-sm flex flex-col h-[350px]">
                <div className="p-4 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <History className="w-4 h-4 text-slate-400" /> Recent Exams
                  </h3>
                </div>
                <div className="flex-1 overflow-y-auto p-2">
                  {recentExams.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-slate-400 text-xs">No recent exams.</div>
                  ) : recentExams.map((exam, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-none cursor-pointer">
                      <FileText className="w-4 h-4 text-[#0ea5e9] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-slate-800 leading-tight mb-0.5">{exam.title}</div>
                        <div className="text-[10px] text-slate-400">{exam.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-none shadow-sm flex flex-col h-[350px]">
                <div className="p-4 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-500" /> Upcoming Exams
                  </h3>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="flex items-center justify-center h-full text-slate-400 text-xs py-6">No upcoming exams.</div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-none shadow-sm flex flex-col h-[350px]">
                <div className="p-4 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <ClipboardList className="w-4 h-4 text-slate-500" /> Operations
                  </h3>
                </div>
                <div className="flex-1 overflow-y-auto p-2 flex flex-col justify-between">
                  <div>
                    {operations.map((op, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-none cursor-pointer">
                        <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                          <op.icon className={`w-4 h-4 ${op.color}`} /> {op.label}
                        </div>
                        <div className="text-xs font-black text-slate-800">{op.count}</div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 mt-auto">
                    <button className="w-full bg-[#1e293b] hover:bg-[#0f172a] text-white font-bold text-xs py-2.5 rounded-none shadow-sm flex items-center justify-center gap-2 transition-colors cursor-pointer border-none">
                      <Edit3 className="w-4 h-4" /> Enter Marks
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Exam Types' && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <button 
                onClick={() => navigate('/offline-exams/types/add')}
                className="px-4 py-2 bg-[#5b5fcf] hover:bg-[#4a4db5] text-white font-bold text-sm rounded-none shadow-sm flex items-center gap-2 cursor-pointer transition-colors border-none"
              >
                <Plus className="w-4 h-4" /> Add New Exam Type
              </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-none shadow-sm">
              <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Tags className="w-4 h-4 text-[#6f42c1]" /> All Exam Types
                </h2>
                <div className="flex bg-slate-100 rounded-none border border-slate-200 p-0.5">
                  <button 
                    onClick={() => setTypesViewMode('list')}
                    className={`p-1 rounded-none cursor-pointer border-none ${typesViewMode === 'list' ? 'bg-white shadow-sm text-[#6f42c1]' : 'bg-transparent text-slate-400 hover:text-slate-600'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setTypesViewMode('grid')}
                    className={`p-1 rounded-none cursor-pointer border-none ${typesViewMode === 'grid' ? 'bg-white shadow-sm text-[#6f42c1]' : 'bg-transparent text-slate-400 hover:text-slate-600'}`}
                  >
                    <GridIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    Show
                    <select className="border border-slate-300 rounded-none px-2 py-1 bg-white focus:outline-none">
                      <option>10</option>
                      <option>25</option>
                      <option>50</option>
                    </select>
                  </div>
                  <div className="flex rounded-none border border-slate-300 overflow-hidden ml-2">
                    <button onClick={() => handleExport('Copy')} className="px-2.5 py-1 bg-white hover:bg-slate-50 border-r border-slate-300 text-slate-600 cursor-pointer"><Copy className="w-3.5 h-3.5" /></button>
                    <button onClick={() => handleExport('CSV')} className="px-2.5 py-1 bg-white hover:bg-slate-50 border-r border-slate-300 text-xs font-bold text-slate-600 cursor-pointer">CSV</button>
                    <button onClick={() => handleExport('Excel')} className="px-2.5 py-1 bg-white hover:bg-slate-50 border-r border-slate-300 text-xs font-bold text-slate-600 cursor-pointer">Excel</button>
                    <button onClick={() => handleExport('PDF')} className="px-2.5 py-1 bg-white hover:bg-slate-50 border-r border-slate-300 text-xs font-bold text-slate-600 cursor-pointer">PDF</button>
                    <button onClick={() => handleExport('print')} className="px-2.5 py-1 bg-white hover:bg-slate-50 text-slate-600 cursor-pointer"><Printer className="w-3.5 h-3.5" /></button>
                  </div>
                  <button className="px-3 py-1 bg-white border border-slate-300 rounded-none text-xs font-bold text-slate-600 flex items-center gap-2 hover:bg-slate-50 cursor-pointer">
                    Columns <ChevronDown className="w-3 h-3" />
                  </button>
                </div>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search exam types..." 
                    className="pl-8 pr-3 py-1.5 border border-slate-300 rounded-none text-sm w-full md:w-64 focus:outline-none focus:border-[#6f42c1]"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2" />
                </div>
              </div>

              {typesViewMode === 'list' ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse whitespace-nowrap">
                    <thead>
                      <tr className="bg-[#f8f9fc] border-b border-slate-200 text-[10px] font-bold text-[#6f42c1] uppercase tracking-wider">
                        <th className="py-3 px-4 border-r border-slate-200 text-center w-16">#</th>
                        <th className="py-3 px-4 border-r border-slate-200">NAME</th>
                        <th className="py-3 px-4 border-r border-slate-200">ABBREVIATION</th>
                        <th className="py-3 px-4 text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs text-slate-700">
                      {examTypes.map((type, idx) => (
                        <tr key={type.id} className={`border-b border-slate-100 hover:bg-slate-50 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                          <td className="py-3 px-4 text-center border-r border-slate-100 text-slate-500">{type.id}</td>
                          <td className="py-3 px-4 font-bold border-r border-slate-100">{type.name}</td>
                          <td className="py-3 px-4 border-r border-slate-100 text-[#6f42c1] font-bold">{type.abbreviation}</td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-none cursor-pointer border-none">
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button onClick={() => handleDeleteExamType(type.id)} className="p-1.5 bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-red-600 rounded-none cursor-pointer border-none">
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 bg-slate-50">
                  {examTypes.map((type) => (
                    <div key={type.id} className="bg-white border border-slate-200 rounded-none p-4 shadow-sm hover:border-[#6f42c1] transition-colors relative group">
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                        <button className="p-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-none cursor-pointer border-none">
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleDeleteExamType(type.id)} className="p-1 bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-red-600 rounded-none cursor-pointer border-none">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-xs text-slate-500 font-bold mb-1">#{type.id}</div>
                      <h3 className="font-bold text-slate-800 text-sm mb-2 pr-16">{type.name}</h3>
                      <div className="inline-block px-2 py-1 bg-[#f0ebfa] text-[#6f42c1] text-[10px] font-bold rounded">
                        {type.abbreviation}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
