import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  CheckSquare, LayoutDashboard, List, BarChart3, FileText, 
  Trophy, BookOpen, Plus, Eye, History, Layers, CheckCircle, Percent,
  Filter, Edit, Trash2, Database,
  PenSquare, MonitorPlay, Grid, Send, TrendingUp, Info, FileSpreadsheet, Printer, Laptop
} from 'lucide-react';

const mockAssessments = [
  { id: 1, title: 'ass', type: 'Quiz', subject: 'Drawing & Coloring', classSec: 'Nursery', marks: 20, sittings: 1 },
  { id: 2, title: 'Itaque soluta sit r', type: 'Quiz', subject: 'Biology', classSec: 'Class 11 science', marks: 50, sittings: 1 },
  { id: 3, title: 'Maths Half Book Test', type: 'Test', subject: 'Mathematics', classSec: 'Nursery', marks: 50, sittings: 1 },
  { id: 4, title: 'DEMO — Assessment — Unit Test — Mathematics — Nursery', type: 'Assignment', subject: 'Mathematics', classSec: 'Nursery / B', marks: 50, sittings: 1 },
  { id: 5, title: 'DEMO — Assessment — Weekly Quiz — English Core — Class XII', type: 'Quiz', subject: 'English Core', classSec: 'Class XII / A', marks: 20, sittings: 4 },
  { id: 6, title: 'DEMO — Assessment — Unit Test — English Core — Class XII', type: 'Test', subject: 'English Core', classSec: 'Class XII / A', marks: 50, sittings: 1 },
  { id: 7, title: 'DEMO — Assessment — Weekly Quiz — Physics — Class XII', type: 'Quiz', subject: 'Physics', classSec: 'Class XII / A', marks: 20, sittings: 4 },
  { id: 8, title: 'DEMO — Assessment — Unit Test — Physics — Class XII', type: 'Assignment', subject: 'Physics', classSec: 'Class XII / A', marks: 50, sittings: 1 },
  { id: 9, title: 'DEMO — Assessment — Weekly Quiz — English — Class VII', type: 'Quiz', subject: 'English', classSec: 'Class VII / A', marks: 20, sittings: 4 },
];

export default function AssessmentDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const isNew = location.pathname.includes('/new');
  const isList = location.pathname.includes('/assessments') || location.pathname.includes('/list');
  const isAnalytics = location.pathname.includes('/analytics') || location.pathname.includes('/reports');
  const isStudentReport = location.pathname.includes('/student-report');
  const isRankList = location.pathname.includes('/rank-list');
  const isGuide = location.pathname.includes('/guide');
  const isDashboard = location.pathname.endsWith('/dashboard');

  let activeTab = 'Dashboard';
  if (isList) activeTab = 'Assessments';
  else if (isAnalytics) activeTab = 'Analytics';
  else if (isStudentReport) activeTab = 'Student Report';
  else if (isRankList) activeTab = 'Rank List';
  else if (isGuide) activeTab = 'Guide';

  // Filters State
  const [filterType, setFilterType] = useState('All');
  const [filterClass, setFilterClass] = useState('All');
  const [filterSubject, setFilterSubject] = useState('All');

  // Filter Logic
  const filteredAssessments = mockAssessments.filter(item => {
    let typeMatch = filterType === 'All' || item.type === filterType;
    let classMatch = filterClass === 'All' || item.classSec.includes(filterClass);
    let subjectMatch = filterSubject === 'All' || item.subject === filterSubject;
    return typeMatch && classMatch && subjectMatch;
  });

  // Extract unique options for dropdowns
  const uniqueTypes = ['All', ...new Set(mockAssessments.map(i => i.type))];
  const uniqueClasses = ['All', ...new Set(mockAssessments.map(i => i.classSec.split(' / ')[0]))];
  const uniqueSubjects = ['All', ...new Set(mockAssessments.map(i => i.subject))];

  // Student Report State
  const [reportClass, setReportClass] = useState('');
  const [reportStudent, setReportStudent] = useState('');
  const [reportSubject, setReportSubject] = useState('');

  // Mock Students based on Class
  const mockStudents = reportClass ? ['Rahul Kumar', 'Priya Singh', 'Amit Patel', 'Sneha Sharma'] : [];

  // Analytics State
  const [analyticsClass, setAnalyticsClass] = useState('');
  const [analyticsSubject, setAnalyticsSubject] = useState('');
  const [analyticsType, setAnalyticsType] = useState('All');

  // Rank List State
  const [rankClass, setRankClass] = useState('');
  const [rankScope, setRankScope] = useState('Overall — all assessments');
  const [rankSubject, setRankSubject] = useState('');

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-indigo-600" />
            Assessment
          </h1>
          <p className="text-xs font-medium text-slate-500 mt-1">
            Lightweight daily & weekly tests — fast mark entry, auto marksheets, and over-time analytics.
          </p>
        </div>
        <button 
          onClick={() => navigate('/assessment/new')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-none font-bold text-sm flex items-center gap-2 shadow-sm transition-colors border-none cursor-pointer"
        >
          <Plus className="w-4 h-4" /> New Assessment
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-slate-200 px-6">
        <div className="flex gap-6 overflow-x-auto">
          {[
            { id: 'Dashboard', icon: LayoutDashboard, path: '/assessment/dashboard' },
            { id: 'Assessments', icon: List, path: '/assessment/assessments' },
            { id: 'Analytics', icon: BarChart3, path: '/assessment/analytics' },
            { id: 'Student Report', icon: FileText, path: '/assessment/student-report' },
            { id: 'Rank List', icon: Trophy, path: '/assessment/rank-list' },
            { id: 'Guide', icon: BookOpen, path: '/assessment/guide' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`pb-3 pt-3 font-bold text-sm cursor-pointer transition-colors border-b-2 flex items-center gap-2 whitespace-nowrap bg-transparent ${
                activeTab === tab.id && !isNew ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <tab.icon className="w-4 h-4" /> {tab.id}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 max-w-[1400px] mx-auto space-y-6">
        
        {isNew ? (
          /* New Assessment View */
          <div className="bg-white border border-slate-200 rounded-none shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200 text-blue-600 font-bold text-sm flex items-center gap-2">
              <Plus className="w-4 h-4" /> New Assessment
            </div>
            
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-1 md:col-span-1">
                  <label className="text-xs font-bold text-slate-700">Title <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="e.g. Unit 3 Quiz" className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm font-medium focus:outline-none focus:border-blue-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Type <span className="text-red-500">*</span></label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm font-medium focus:outline-none focus:border-blue-500">
                    <option>Quiz</option>
                    <option>Test</option>
                    <option>Assignment</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Conducted via</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm font-medium focus:outline-none focus:border-blue-500">
                    <option>— Not recorded —</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Class <span className="text-red-500">*</span></label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm font-medium focus:outline-none focus:border-blue-500 text-slate-500">
                    <option>Select class</option>
                  </select>
                  <p className="text-[10px] text-slate-400">Pick the class first — its subjects and sections load below.</p>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Subject <span className="text-red-500">*</span></label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm font-medium focus:outline-none focus:border-blue-500 text-slate-500">
                    <option>Select a class first</option>
                  </select>
                  <p className="text-[10px] text-slate-400">Only subjects taught in the selected class are listed.</p>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Section <span className="text-slate-400 font-normal">(blank = whole class)</span></label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm font-medium focus:outline-none focus:border-blue-500">
                    <option>Whole class</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Total marks <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm font-medium focus:outline-none focus:border-blue-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Passing marks</label>
                  <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm font-medium focus:outline-none focus:border-blue-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Recurrence <span className="text-red-500">*</span></label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm font-medium focus:outline-none focus:border-blue-500">
                    <option>One-off</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">First sitting date <span className="text-red-500">*</span></label>
                  <input type="date" defaultValue="2026-08-23" className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm font-medium focus:outline-none focus:border-blue-500" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Instructions</label>
                <textarea rows="3" placeholder="Optional notes for this test" className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm font-medium focus:outline-none focus:border-blue-500 resize-none"></textarea>
              </div>
            </div>

            <div className="px-5 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
              <button 
                onClick={() => navigate('/assessment/dashboard')}
                className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-bold text-sm rounded-none shadow-sm hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-[#fd7e14] hover:bg-[#e8700d] text-white font-bold text-sm rounded-none border-none shadow-sm cursor-pointer">
                Create Assessment
              </button>
              </div>
            </div>
          ) : isList ? (
            /* Assessments List View */
            <div className="bg-white border border-slate-200 rounded-none shadow-3xs overflow-hidden">
              <div className="p-4 border-b border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs font-bold text-slate-500 flex items-center gap-2">
                    <Database className="w-4 h-4" /> Showing this session
                  </div>
                  <button className="px-3 py-1.5 border border-slate-300 rounded-none hover:bg-slate-50 text-xs font-bold text-slate-600 flex items-center gap-2 shadow-sm cursor-pointer">
                    <Layers className="w-3.5 h-3.5" /> View all sessions
                  </button>
                </div>
                
                <div className="flex flex-wrap items-end gap-3">
                  <div className="flex-1 min-w-[120px]">
                    <label className="text-[10px] font-bold text-slate-700 block mb-1">Type</label>
                    <select 
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="w-full px-2 py-1.5 border border-slate-300 rounded-none text-xs font-medium focus:outline-none focus:border-indigo-500 bg-white"
                    >
                      {uniqueTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="flex-[1.5] min-w-[150px]">
                    <label className="text-[10px] font-bold text-slate-700 block mb-1">Class</label>
                    <select 
                      value={filterClass}
                      onChange={(e) => setFilterClass(e.target.value)}
                      className="w-full px-2 py-1.5 border border-slate-300 rounded-none text-xs font-medium focus:outline-none focus:border-indigo-500 bg-white"
                    >
                      {uniqueClasses.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="flex-[1.5] min-w-[150px]">
                    <label className="text-[10px] font-bold text-slate-700 block mb-1">Subject</label>
                    <select 
                      value={filterSubject}
                      onChange={(e) => setFilterSubject(e.target.value)}
                      className="w-full px-2 py-1.5 border border-slate-300 rounded-none text-xs font-medium focus:outline-none focus:border-indigo-500 bg-white"
                    >
                      {uniqueSubjects.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="flex-1 min-w-[120px]">
                    <label className="text-[10px] font-bold text-slate-700 block mb-1">From</label>
                    <input type="date" className="w-full px-2 py-1.5 border border-slate-300 rounded-none text-xs font-medium focus:outline-none focus:border-indigo-500 bg-white" />
                  </div>
                  <div className="flex-1 min-w-[120px]">
                    <label className="text-[10px] font-bold text-slate-700 block mb-1">To</label>
                    <input type="date" className="w-full px-2 py-1.5 border border-slate-300 rounded-none text-xs font-medium focus:outline-none focus:border-indigo-500 bg-white" />
                  </div>
                  <button className="px-5 py-1.5 bg-[#596472] hover:bg-[#4a5460] text-white rounded-none text-sm flex items-center justify-center shadow-sm cursor-pointer border-none h-[28px]">
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-xs font-bold text-slate-800">
                      <th className="py-3 px-5">Title</th>
                      <th className="py-3 px-5">Type</th>
                      <th className="py-3 px-5">Subject</th>
                      <th className="py-3 px-5">Class / Section</th>
                      <th className="py-3 px-5 text-center">Marks</th>
                      <th className="py-3 px-5 text-center">Sittings</th>
                      <th className="py-3 px-5 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs font-bold">
                    {filteredAssessments.length > 0 ? filteredAssessments.map(item => (
                      <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-3 px-5 text-[#fd7e14]">{item.title}</td>
                        <td className="py-3 px-5">
                          <span className="px-2 py-0.5 bg-white border border-slate-200 text-slate-600 rounded-none text-[10px] font-medium tracking-wide">
                            {item.type}
                          </span>
                        </td>
                        <td className="py-3 px-5 text-slate-600 font-medium">{item.subject}</td>
                        <td className="py-3 px-5 text-slate-600 font-medium">{item.classSec}</td>
                        <td className="py-3 px-5 text-slate-600 text-center font-medium">{item.marks}</td>
                        <td className="py-3 px-5 text-slate-600 text-center font-medium">{item.sittings}</td>
                        <td className="py-3 px-5">
                          <div className="flex items-center justify-center gap-2">
                            <button className="w-6 h-6 rounded-none border border-blue-200 bg-white text-blue-500 hover:bg-blue-50 flex items-center justify-center cursor-pointer transition-colors shadow-3xs">
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button className="w-6 h-6 rounded-none border border-slate-300 bg-white text-slate-500 hover:bg-slate-100 flex items-center justify-center cursor-pointer transition-colors shadow-3xs">
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button className="w-6 h-6 rounded-none border border-red-200 bg-white text-red-500 hover:bg-red-50 flex items-center justify-center cursor-pointer transition-colors shadow-3xs">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="7" className="py-8 text-center text-slate-500 font-medium">
                          No assessments match the selected filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : isAnalytics ? (
            /* Analytics View */
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-700">Class <span className="text-red-500">*</span></label>
                    <select 
                      value={analyticsClass}
                      onChange={(e) => {
                        setAnalyticsClass(e.target.value);
                        setAnalyticsSubject('');
                      }}
                      className="w-full px-2 py-1.5 border border-slate-300 rounded-none text-xs font-medium focus:outline-none focus:border-indigo-500 bg-white"
                    >
                      <option value="">Select class</option>
                      {uniqueClasses.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-700">Subject</label>
                    <select 
                      value={analyticsSubject}
                      onChange={(e) => setAnalyticsSubject(e.target.value)}
                      disabled={!analyticsClass}
                      className={`w-full px-2 py-1.5 border border-slate-300 rounded-none text-xs font-medium focus:outline-none focus:border-indigo-500 ${!analyticsClass ? 'bg-slate-100 text-slate-500' : 'bg-white'}`}
                    >
                      {!analyticsClass ? (
                        <option>Pick a class first</option>
                      ) : (
                        <>
                          <option value="">All subjects</option>
                          {uniqueSubjects.filter(s => s !== 'All').map(s => <option key={s} value={s}>{s}</option>)}
                        </>
                      )}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-700">Type</label>
                    <select 
                      value={analyticsType}
                      onChange={(e) => setAnalyticsType(e.target.value)}
                      className="w-full px-2 py-1.5 border border-slate-300 rounded-none text-xs font-medium focus:outline-none focus:border-indigo-500 bg-white"
                    >
                      {uniqueTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-700">From</label>
                    <input type="date" className="w-full px-2 py-1.5 border border-slate-300 rounded-none text-xs font-medium focus:outline-none focus:border-indigo-500 bg-white" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-700">To</label>
                    <input type="date" className="w-full px-2 py-1.5 border border-slate-300 rounded-none text-xs font-medium focus:outline-none focus:border-indigo-500 bg-white" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-700">Student trend</label>
                    <select className="w-full px-2 py-1.5 border border-slate-300 rounded-none text-xs font-medium focus:outline-none focus:border-indigo-500 bg-white">
                      <option>— none —</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="px-4 py-1.5 bg-[#fd7e14] hover:bg-[#e8700d] text-white rounded-none text-sm font-bold flex items-center justify-center gap-2 shadow-sm cursor-pointer border-none">
                    <BarChart3 className="w-4 h-4" /> Run
                  </button>
                </div>
              </div>

              {/* Info Banner */}
              <div className="bg-white border border-slate-200 border-l-4 border-l-[#17a2b8] rounded-none p-4 shadow-3xs flex items-center gap-2 text-sm">
                <div className="w-5 h-5 rounded-none bg-slate-800 text-white flex items-center justify-center shrink-0">
                  <span className="font-bold text-xs">i</span>
                </div>
                <div className="text-slate-600">
                  {analyticsClass ? (
                    <span>Click <strong>Run</strong> to generate analytics for {analyticsClass} {analyticsSubject ? `(${analyticsSubject})` : ''}.</span>
                  ) : (
                    <span>Select a class and run the report to see analytics.</span>
                  )}
                </div>
              </div>
            </div>
          ) : isRankList ? (
            /* Rank List View */
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-700">Class <span className="text-red-500">*</span></label>
                    <select 
                      value={rankClass}
                      onChange={(e) => {
                        setRankClass(e.target.value);
                        setRankSubject('');
                      }}
                      className="w-full px-2 py-1.5 border border-slate-300 rounded-none text-xs font-medium focus:outline-none focus:border-indigo-500 bg-white"
                    >
                      <option value="">Select class</option>
                      {uniqueClasses.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1 md:col-span-1 min-w-[140px]">
                    <label className="text-[10px] font-bold text-slate-700">Scope</label>
                    <select 
                      value={rankScope}
                      onChange={(e) => setRankScope(e.target.value)}
                      className="w-full px-2 py-1.5 border border-slate-300 rounded-none text-xs font-medium focus:outline-none focus:border-indigo-500 bg-white"
                    >
                      <option>Overall — all assessments</option>
                      <option>Single Sitting</option>
                    </select>
                  </div>
                  <div className="space-y-1 md:col-span-1">
                    <label className="text-[10px] font-bold text-slate-700">Subject</label>
                    <select 
                      value={rankSubject}
                      onChange={(e) => setRankSubject(e.target.value)}
                      disabled={!rankClass}
                      className={`w-full px-2 py-1.5 border border-slate-300 rounded-none text-xs font-medium focus:outline-none focus:border-indigo-500 ${!rankClass ? 'bg-slate-100 text-slate-500' : 'bg-white'}`}
                    >
                      {!rankClass ? (
                        <option>Pick a class first</option>
                      ) : (
                        <>
                          <option value="">All subjects</option>
                          {uniqueSubjects.filter(s => s !== 'All').map(s => <option key={s} value={s}>{s}</option>)}
                        </>
                      )}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-700">From</label>
                    <input type="date" className="w-full px-2 py-1.5 border border-slate-300 rounded-none text-xs font-medium focus:outline-none focus:border-indigo-500 bg-white" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-700">To</label>
                    <input type="date" className="w-full px-2 py-1.5 border border-slate-300 rounded-none text-xs font-medium focus:outline-none focus:border-indigo-500 bg-white" />
                  </div>
                  <div className="mb-0">
                    <button className="w-full px-4 py-1.5 bg-[#6c757d] hover:bg-[#5a6268] text-white rounded-none text-sm font-bold flex items-center justify-center gap-2 shadow-sm cursor-pointer border-none h-[28px]">
                      <Trophy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Info Banner */}
              <div className="bg-white border border-slate-200 border-l-4 border-l-[#17a2b8] rounded-none p-4 shadow-3xs flex items-center gap-2 text-sm">
                <div className="w-5 h-5 rounded-none bg-slate-800 text-white flex items-center justify-center shrink-0">
                  <span className="font-bold text-xs">i</span>
                </div>
                <div className="text-slate-600">
                  {rankClass ? (
                    <span>Click the <strong>Trophy</strong> button to generate the rank list for {rankClass} ({rankScope}).</span>
                  ) : (
                    <span>Select a class to see the rank list. Leave scope as <strong>Overall</strong> for cumulative ranking, or pick one sitting to rank a single test.</span>
                  )}
                </div>
              </div>
            </div>
          ) : isGuide ? (
            /* Guide View */
            <div className="space-y-8">
              
              {/* Top Banner */}
              <div className="bg-[#f8f9fc] border border-blue-100 rounded-none p-6 shadow-3xs flex items-start gap-4">
                <div className="w-12 h-12 rounded-none bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 shadow-sm">
                  <CheckSquare className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Run frequent classroom tests — the easy way</h2>
                  <p className="text-sm text-slate-500 mt-1">
                    A lightweight tool for teachers to give daily / weekly tests, enter marks fast, and watch progress over time — without ever touching report cards or the formal exam system.
                  </p>
                </div>
              </div>

              {/* How it works */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-500" /> How it works
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {[
                    { id: 1, icon: PenSquare, color: 'text-blue-500', bg: 'bg-blue-50', title: 'Create a test', desc: 'Title, type, subject, class / section, total marks and recurrence.' },
                    { id: 2, icon: MonitorPlay, color: 'text-cyan-500', bg: 'bg-cyan-50', title: 'Conduct it your way', desc: 'On paper, orally, or via the Online Exam module. The app stays out of delivery.' },
                    { id: 3, icon: Grid, color: 'text-purple-500', bg: 'bg-purple-50', title: 'Enter marks', desc: 'A fast inline grid with autosave, plus an optional answer-sheet upload.' },
                    { id: 4, icon: Send, color: 'text-emerald-500', bg: 'bg-emerald-50', title: 'Publish', desc: 'Results reach parents / students; the next sitting auto-schedules if recurring.' },
                    { id: 5, icon: TrendingUp, color: 'text-amber-500', bg: 'bg-amber-50', title: 'Track progress', desc: 'Percentage-based analytics show improvement over time.' }
                  ].map(step => (
                    <div key={step.id} className="bg-white border border-slate-200 rounded-none p-4 shadow-3xs relative overflow-hidden group hover:border-blue-300 transition-colors">
                      <div className="absolute top-2 right-3 text-6xl font-black text-slate-50 opacity-50 select-none group-hover:scale-110 transition-transform">{step.id}</div>
                      <div className="relative z-10 space-y-3">
                        <div className={`w-8 h-8 rounded-none ${step.bg} ${step.color} flex items-center justify-center`}>
                          <step.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-800 text-xs mb-1">{step.title}</div>
                          <div className="text-[10px] text-slate-500 leading-relaxed">{step.desc}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What it is not */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Info className="w-4 h-4 text-slate-400" /> What it is <span className="text-slate-800">not</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { icon: FileSpreadsheet, title: 'Not report cards', desc: 'Stays clear of formal term exams & report cards.' },
                    { icon: Printer, title: 'Not paper printing', desc: 'Use the QP Generator for question papers.' },
                    { icon: Laptop, title: 'Not online delivery', desc: 'Use the Online Exam module to deliver tests.' }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 rounded-none p-4 shadow-3xs flex items-start gap-3">
                      <div className="w-8 h-8 rounded-none bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 text-xs mb-0.5">{item.title}</div>
                        <div className="text-[10px] text-slate-500">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button 
                  onClick={() => navigate('/assessment/new')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-none font-bold text-sm flex items-center gap-2 shadow-sm transition-colors border-none cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Create an assessment
                </button>
                <button 
                  onClick={() => navigate('/assessment/list')}
                  className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-4 py-2 rounded-none font-bold text-sm flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
                >
                  <List className="w-4 h-4 text-slate-400" /> View assessments
                </button>
                <button 
                  onClick={() => navigate('/assessment/analytics')}
                  className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-4 py-2 rounded-none font-bold text-sm flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
                >
                  <BarChart3 className="w-4 h-4 text-slate-400" /> Open analytics
                </button>
              </div>
              
            </div>
          ) : isStudentReport ? (
            /* Student Report View */
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-700">Class</label>
                    <select 
                      value={reportClass}
                      onChange={(e) => {
                        setReportClass(e.target.value);
                        setReportStudent('');
                        setReportSubject('');
                      }}
                      className="w-full px-2 py-1.5 border border-slate-300 rounded-none text-xs font-medium focus:outline-none focus:border-indigo-500 bg-white"
                    >
                      <option value="">Select class</option>
                      {uniqueClasses.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-700">Student</label>
                    <select 
                      value={reportStudent}
                      onChange={(e) => setReportStudent(e.target.value)}
                      disabled={!reportClass}
                      className={`w-full px-2 py-1.5 border border-slate-300 rounded-none text-xs font-medium focus:outline-none focus:border-indigo-500 ${!reportClass ? 'bg-slate-100 text-slate-500' : 'bg-white'}`}
                    >
                      {!reportClass ? (
                        <option>Pick a class first</option>
                      ) : (
                        <>
                          <option value="">Select student</option>
                          {mockStudents.map(s => <option key={s} value={s}>{s}</option>)}
                        </>
                      )}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-700">Subject (optional)</label>
                    <select 
                      value={reportSubject}
                      onChange={(e) => setReportSubject(e.target.value)}
                      disabled={!reportClass}
                      className={`w-full px-2 py-1.5 border border-slate-300 rounded-none text-xs font-medium focus:outline-none focus:border-indigo-500 ${!reportClass ? 'bg-slate-100 text-slate-500' : 'bg-white'}`}
                    >
                      {!reportClass ? (
                        <option>Pick a class first</option>
                      ) : (
                        <>
                          <option value="">All subjects</option>
                          {uniqueSubjects.filter(s => s !== 'All').map(s => <option key={s} value={s}>{s}</option>)}
                        </>
                      )}
                    </select>
                  </div>
                </div>
              </div>

              {/* Info Banner */}
              <div className="bg-white border border-slate-200 border-l-4 border-l-[#17a2b8] rounded-none p-4 shadow-3xs flex items-center gap-2 text-sm">
                <div className="w-5 h-5 rounded-none bg-slate-800 text-white flex items-center justify-center shrink-0">
                  <span className="font-bold text-xs">i</span>
                </div>
                <div className="text-slate-600">
                  {reportStudent ? (
                    <span>Progress report for <strong>{reportStudent}</strong> {reportSubject ? `in ${reportSubject}` : ''} will be displayed here.</span>
                  ) : (
                    <span>Pick a class and a student to see their full progress report.</span>
                  )}
                </div>
              </div>
            </div>
          ) : isDashboard ? (
            /* Dashboard View */
            <>
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs flex items-center gap-4">
                <div className="w-10 h-10 rounded-none bg-blue-100 flex items-center justify-center text-blue-500 shrink-0">
                  <List className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-0.5">Assessments</div>
                  <div className="text-2xl font-black text-slate-800">28</div>
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs flex items-center gap-4">
                <div className="w-10 h-10 rounded-none bg-purple-100 flex items-center justify-center text-purple-500 shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-0.5">Sittings</div>
                  <div className="text-2xl font-black text-slate-800">64</div>
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs flex items-center gap-4">
                <div className="w-10 h-10 rounded-none bg-emerald-100 flex items-center justify-center text-emerald-500 shrink-0">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-0.5">Published</div>
                  <div className="text-2xl font-black text-slate-800">60</div>
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs flex items-center gap-4">
                <div className="w-10 h-10 rounded-none bg-amber-100 flex items-center justify-center text-amber-500 shrink-0">
                  <Percent className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-0.5">Average Score</div>
                  <div className="text-2xl font-black text-slate-800">71.6%</div>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white border border-slate-200 rounded-none shadow-3xs overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
                <div className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <History className="w-4 h-4 text-slate-400" /> Recent assessments
                </div>
                <button className="px-3 py-1.5 border border-slate-300 rounded-none bg-white hover:bg-slate-50 text-xs font-bold text-slate-600 cursor-pointer shadow-sm">
                  View all
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="py-3 px-5">TITLE</th>
                      <th className="py-3 px-5">TYPE</th>
                      <th className="py-3 px-5">SUBJECT</th>
                      <th className="py-3 px-5">CLASS / SECTION</th>
                      <th className="py-3 px-5">SITTINGS</th>
                      <th className="py-3 px-5">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs font-bold text-slate-700">
                    {mockAssessments.slice(0, 6).map(item => (
                      <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-4 px-5">{item.title}</td>
                        <td className="py-4 px-5">
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-none text-[9px] uppercase tracking-wide border border-slate-200">
                            {item.type}
                          </span>
                        </td>
                        <td className="py-4 px-5 text-slate-600">{item.subject}</td>
                        <td className="py-4 px-5 text-slate-600">{item.classSec}</td>
                        <td className="py-4 px-5 text-slate-500 text-center">{item.sittings}</td>
                        <td className="py-4 px-5 text-center">
                          <button className="w-7 h-7 rounded-none border border-blue-200 bg-blue-50 text-blue-500 hover:bg-blue-100 inline-flex items-center justify-center cursor-pointer">
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : null}

      </div>
    </div>
  );
}
