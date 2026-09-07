import React, { useState, useEffect } from 'react';
import { 
  ClipboardCheck, Target, FileText, BookOpen, TrendingUp,
  Plus, Layers, CheckCircle, Percent, Clock, ChevronRight,
  ListOrdered, Users, Filter, Info, Edit, Grid, Send, CreditCard, Printer, Monitor, BarChart
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Assessment = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const p = location.pathname;
    if (p.includes('/assessments')) setActiveTab('Assessments');
    else if (p.includes('/assessment-reports')) setActiveTab('Analytics');
    else if (p.includes('/assessment-guide')) setActiveTab('Guide');
    else setActiveTab('Dashboard');
  }, [location.pathname]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    // Since only 4 routes are mapped in App.jsx, we manage internal state without enforcing strict route jump for all
    if (tabName === 'Dashboard') navigate('/assessment-dashboard');
    if (tabName === 'Assessments') navigate('/assessments');
    if (tabName === 'Guide') navigate('/assessment-guide');
    if (tabName === 'Analytics') navigate('/assessment-reports');
  };

  const tabs = [
    { name: 'Dashboard', icon: <TrendingUp className="w-[14px] h-[14px]" /> },
    { name: 'Assessments', icon: <Target className="w-[14px] h-[14px]" /> },
    { name: 'Analytics', icon: <FileText className="w-[14px] h-[14px]" /> },
    { name: 'Student Report', icon: <Users className="w-[14px] h-[14px]" /> },
    { name: 'Rank List', icon: <ListOrdered className="w-[14px] h-[14px]" /> },
    { name: 'Guide', icon: <BookOpen className="w-[14px] h-[14px]" /> }
  ];

  const renderDashboard = () => (
    <div className="space-y-6 animate-in fade-in">
      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* KPI 1 */}
        <div className="bg-white border-t-[3px] border-t-blue-500 border-x border-b border-gray-200 shadow-sm rounded-b-lg p-5 flex items-center gap-4 transition-transform hover:-translate-y-1 duration-300">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
            <ClipboardCheck className="text-blue-500 w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-0.5">Assessments</p>
            <h3 className="text-2xl font-black text-gray-800 leading-none">0</h3>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white border-t-[3px] border-t-purple-500 border-x border-b border-gray-200 shadow-sm rounded-b-lg p-5 flex items-center gap-4 transition-transform hover:-translate-y-1 duration-300">
          <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
            <Layers className="text-purple-500 w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-0.5">Sittings</p>
            <h3 className="text-2xl font-black text-gray-800 leading-none">0</h3>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white border-t-[3px] border-t-green-500 border-x border-b border-gray-200 shadow-sm rounded-b-lg p-5 flex items-center gap-4 transition-transform hover:-translate-y-1 duration-300">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
            <CheckCircle className="text-green-500 w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-0.5">Published</p>
            <h3 className="text-2xl font-black text-gray-800 leading-none">0</h3>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white border-t-[3px] border-t-yellow-500 border-x border-b border-gray-200 shadow-sm rounded-b-lg p-5 flex items-center gap-4 transition-transform hover:-translate-y-1 duration-300">
          <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center flex-shrink-0">
            <Percent className="text-yellow-600 w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-0.5">Average Score</p>
            <h3 className="text-2xl font-black text-gray-800 leading-none">—</h3>
          </div>
        </div>

      </div>

      {/* Recent assessments specific section */}
      <div className="bg-white border border-gray-200 shadow-xl shadow-gray-100/50 rounded-[8px] overflow-hidden flex flex-col min-h-[400px]">
        {/* Header line */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-2">
             <Clock className="w-4 h-4 text-gray-400" />
             <h3 className="text-[14px] font-bold text-gray-800 tracking-tight">Recent assessments</h3>
          </div>
          <button className="text-[12px] font-bold text-gray-600 bg-white border border-gray-300 hover:bg-gray-50 transition-colors px-3 py-1.5 rounded-none shadow-sm h-[32px]">
             View all
          </button>
        </div>

        {/* Empty State */}
        <div className="flex-1 flex flex-col items-center justify-center py-16 px-4 bg-gradient-to-b from-white to-gray-50/50 relative">
          
          <div className="relative mb-6 group cursor-pointer">
             <div className="absolute inset-0 bg-blue-100 rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>
             <div className="w-20 h-20 bg-gradient-to-tr from-gray-50 to-gray-100 rounded-full border border-gray-200 shadow-sm flex items-center justify-center relative z-10 transform group-hover:scale-105 transition-transform duration-300">
               <ClipboardCheck className="w-10 h-10 text-gray-300" />
             </div>
          </div>
          
          <h3 className="text-[15px] font-bold text-gray-800 mb-1">No assessments yet.</h3>
          <p className="text-[13px] text-gray-500 mb-6 font-medium">Create your first assessment to begin.</p>
          
          <button className="bg-[#2463eb] hover:bg-[#1d4ed8] text-white px-6 py-4 rounded-none shadow-lg shadow-blue-500/30 flex flex-col items-center justify-center transition-all hover:scale-105 duration-200 border border-blue-600">
            <Plus className="w-6 h-6 mb-1 drop-shadow-sm" />
            <span className="font-bold text-[14px] tracking-wide">Create your first</span>
          </button>

        </div>
      </div>
    </div>
  );

  const renderAssessments = () => (
    <div className="space-y-6 animate-in fade-in">
      {/* Filter Block */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden p-6">
         <div className="flex justify-between items-center mb-5">
            <div className="flex items-center gap-2 text-gray-400">
               <Layers className="w-4 h-4" />
               <span className="text-[12px] font-medium tracking-wide">Showing this session</span>
            </div>
            <button className="flex items-center gap-2 text-gray-600 bg-white border border-gray-300 hover:bg-gray-50 transition-colors px-3 py-1.5 rounded-none shadow-sm text-[12px] font-bold">
               <Layers className="w-3.5 h-3.5" /> View all sessions
            </button>
         </div>

         <div className="flex flex-wrap items-end gap-4">
            <div className="flex-1 min-w-[150px]">
              <label className="block text-[12px] font-bold text-gray-800 mb-1.5">Type</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] text-gray-600 focus:outline-none focus:border-blue-500 bg-white shadow-sm">
                <option value="">All</option>
                <option value="daily">Daily Test</option>
                <option value="weekly">Weekly Test</option>
                <option value="monthly">Monthly Exam</option>
              </select>
            </div>
            <div className="flex-1 min-w-[150px]">
              <label className="block text-[12px] font-bold text-gray-800 mb-1.5">Class</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] text-gray-600 focus:outline-none focus:border-blue-500 bg-white shadow-sm">
                <option value="">All</option>
                <option value="nursery">Nursery</option>
                <option value="lkg">LKG</option>
                <option value="ukg">UKG</option>
                <option value="class1">Class 1</option>
              </select>
            </div>
            <div className="flex-1 min-w-[150px]">
              <label className="block text-[12px] font-bold text-gray-800 mb-1.5">Subject</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] text-gray-600 focus:outline-none focus:border-blue-500 bg-white shadow-sm">
                <option value="">All</option>
                <option value="math">Mathematics</option>
                <option value="eng">English</option>
                <option value="sci">Science</option>
              </select>
            </div>
            <div className="flex-1 min-w-[130px]">
              <label className="block text-[12px] font-bold text-gray-800 mb-1.5">From</label>
              <input type="date" className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] text-gray-600 focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
            </div>
            <div className="flex-1 min-w-[130px]">
              <label className="block text-[12px] font-bold text-gray-800 mb-1.5">To</label>
              <input type="date" className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] text-gray-600 focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
            </div>
            
            <button className="bg-[#6b7280] hover:bg-[#4b5563] text-white px-6 py-2 flex items-center justify-center gap-2 transition-colors shadow-sm rounded w-[60px] h-[38px]">
               <Filter className="w-4 h-4 text-white" />
            </button>
         </div>
      </div>

      {/* Main Table */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 text-[13px] font-extrabold text-gray-800 bg-white h-14">
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4 text-center">Type</th>
                <th className="px-6 py-4 text-center">Subject</th>
                <th className="px-6 py-4 text-center">Class / Section</th>
                <th className="px-6 py-4 text-center">Marks</th>
                <th className="px-6 py-4 text-center">Sittings</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={7} className="px-6 py-24 text-center text-gray-500 font-medium text-[14px]">
                  No assessments yet.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderGuide = () => (
    <div className="space-y-8 animate-in fade-in pb-10">
      
      {/* Banner */}
      <div className="bg-blue-50/40 border border-blue-100 rounded-lg p-6 flex items-center gap-5">
         <div className="w-12 h-12 bg-blue-500 rounded-xl shadow-sm flex items-center justify-center flex-shrink-0">
           <ClipboardCheck className="w-6 h-6 text-white" />
         </div>
         <div>
           <h2 className="text-[17px] font-extrabold text-gray-800 mb-1 tracking-tight">Run frequent classroom tests — the easy way</h2>
           <p className="text-[13px] text-gray-600 font-medium max-w-4xl leading-relaxed">A lightweight tool for teachers to give daily / weekly tests, enter marks fast, and watch progress over time — without ever touching report cards or the formal exam system.</p>
         </div>
      </div>

      {/* How it works */}
      <div>
         <h3 className="flex items-center gap-2 font-bold text-gray-800 text-[14px] mb-4">
           <Info className="w-4 h-4 text-blue-500" /> How it works
         </h3>
         <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm relative overflow-hidden group hover:border-blue-200 transition-colors">
               <span className="absolute top-2 right-4 text-5xl font-black text-gray-50 opacity-60 group-hover:text-blue-50 transition-colors">1</span>
               <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4 relative z-10 transition-transform group-hover:scale-110">
                 <Edit className="w-5 h-5 text-blue-500" />
               </div>
               <h4 className="font-bold text-gray-800 text-[13px] mb-2 relative z-10">Create a test</h4>
               <p className="text-[12px] text-gray-500 font-medium leading-relaxed relative z-10">Title, type, subject, class / section, total marks and recurrence.</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm relative overflow-hidden group hover:border-blue-200 transition-colors">
               <span className="absolute top-2 right-4 text-5xl font-black text-gray-50 opacity-60 group-hover:text-blue-50 transition-colors">2</span>
               <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4 relative z-10 transition-transform group-hover:scale-110">
                 <Monitor className="w-5 h-5 text-blue-500" />
               </div>
               <h4 className="font-bold text-gray-800 text-[13px] mb-2 relative z-10">Conduct it your way</h4>
               <p className="text-[12px] text-gray-500 font-medium leading-relaxed relative z-10">On paper, orally, or via the Online Exam module. The app stays out of delivery.</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm relative overflow-hidden group hover:border-purple-200 transition-colors">
               <span className="absolute top-2 right-4 text-5xl font-black text-gray-50 opacity-60 group-hover:text-purple-50 transition-colors">3</span>
               <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mb-4 relative z-10 transition-transform group-hover:scale-110">
                 <Grid className="w-5 h-5 text-purple-500" />
               </div>
               <h4 className="font-bold text-gray-800 text-[13px] mb-2 relative z-10">Enter marks</h4>
               <p className="text-[12px] text-gray-500 font-medium leading-relaxed relative z-10">A fast inline grid with autosave, plus an optional answer-sheet upload.</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm relative overflow-hidden group hover:border-green-200 transition-colors">
               <span className="absolute top-2 right-4 text-5xl font-black text-gray-50 opacity-60 group-hover:text-green-50 transition-colors">4</span>
               <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mb-4 relative z-10 transition-transform group-hover:scale-110">
                 <Send className="w-5 h-5 text-green-500" />
               </div>
               <h4 className="font-bold text-gray-800 text-[13px] mb-2 relative z-10">Publish</h4>
               <p className="text-[12px] text-gray-500 font-medium leading-relaxed relative z-10">Results reach parents / students; the next sitting auto-schedules if recurring.</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm relative overflow-hidden group hover:border-orange-200 transition-colors">
               <span className="absolute top-2 right-4 text-5xl font-black text-gray-50 opacity-60 group-hover:text-orange-50 transition-colors">5</span>
               <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center mb-4 relative z-10 transition-transform group-hover:scale-110">
                 <TrendingUp className="w-5 h-5 text-orange-500" />
               </div>
               <h4 className="font-bold text-gray-800 text-[13px] mb-2 relative z-10">Track progress</h4>
               <p className="text-[12px] text-gray-500 font-medium leading-relaxed relative z-10">Percentage-based analytics show improvement over time.</p>
            </div>
            
         </div>
      </div>

      {/* What it is not */}
      <div>
         <h3 className="flex items-center gap-2 font-bold text-gray-800 text-[14px] mb-4">
           <Info className="w-4 h-4 text-gray-400" /> What it is not
         </h3>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex items-start gap-4">
               <div className="w-10 h-10 bg-red-50/50 rounded-lg flex items-center justify-center flex-shrink-0">
                 <CreditCard className="w-5 h-5 text-red-500" />
               </div>
               <div>
                  <h4 className="font-bold text-gray-800 text-[13px] mb-1">Not report cards</h4>
                  <p className="text-[11px] text-gray-500 font-medium leading-relaxed">Stays clear of formal term exams & report cards.</p>
               </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex items-start gap-4">
               <div className="w-10 h-10 bg-red-50/50 rounded-lg flex items-center justify-center flex-shrink-0">
                 <Printer className="w-5 h-5 text-red-500" />
               </div>
               <div>
                  <h4 className="font-bold text-gray-800 text-[13px] mb-1">Not paper printing</h4>
                  <p className="text-[11px] text-gray-500 font-medium leading-relaxed">Use the QP Generator for question papers.</p>
               </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex items-start gap-4">
               <div className="w-10 h-10 bg-red-50/50 rounded-lg flex items-center justify-center flex-shrink-0">
                 <Monitor className="w-5 h-5 text-red-500" />
               </div>
               <div>
                  <h4 className="font-bold text-gray-800 text-[13px] mb-1">Not online delivery</h4>
                  <p className="text-[11px] text-gray-500 font-medium leading-relaxed">Use the Online Exam module to deliver tests.</p>
               </div>
            </div>
         </div>
      </div>
      
      {/* Bottom Buttons */}
      <div className="flex flex-wrap items-center gap-3 pt-4">
         <button className="bg-[#2463eb] hover:bg-[#1d4ed8] text-white px-5 py-2.5 rounded shadow-sm shadow-blue-500/20 flex items-center gap-2 text-[13px] font-bold transition-colors">
            <Plus className="w-4 h-4" /> Create an assessment
         </button>
         <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-600 px-5 py-2.5 rounded shadow-sm flex items-center gap-2 text-[13px] font-bold transition-colors">
            <ListOrdered className="w-4 h-4 text-gray-400" /> View assessments
         </button>
         <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-600 px-5 py-2.5 rounded shadow-sm flex items-center gap-2 text-[13px] font-bold transition-colors">
            <TrendingUp className="w-4 h-4 text-gray-400" /> Open analytics
         </button>
      </div>

    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6 animate-in fade-in">
      
      {/* Filter Options */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
         
         <div className="flex flex-wrap gap-4 items-end mb-5">
            <div className="flex-1 min-w-[150px]">
              <label className="block text-[12px] font-bold text-gray-800 mb-1.5 break-nowrap">Class <span className="text-red-500">*</span></label>
              <select className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] text-gray-600 focus:outline-none focus:border-blue-500 bg-white shadow-sm">
                <option value="">Select class</option>
                <option value="nursery">Nursery</option>
                <option value="lkg">LKG</option>
                <option value="ukg">UKG</option>
                <option value="class1">Class 1</option>
              </select>
            </div>
            
            <div className="flex-1 min-w-[150px]">
              <label className="block text-[12px] font-bold text-gray-800 mb-1.5">Subject</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] text-gray-600 focus:outline-none focus:border-blue-500 bg-white shadow-sm">
                <option value="">Pick a class first</option>
                <option value="math">Mathematics</option>
                <option value="eng">English</option>
                <option value="sci">Science</option>
              </select>
            </div>

            <div className="flex-1 min-w-[120px]">
              <label className="block text-[12px] font-bold text-gray-800 mb-1.5">Type</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] text-gray-600 focus:outline-none focus:border-blue-500 bg-white shadow-sm">
                <option value="">All</option>
                <option value="daily">Daily Test</option>
                <option value="weekly">Weekly Test</option>
                <option value="monthly">Monthly Exam</option>
              </select>
            </div>

            <div className="flex-1 min-w-[130px]">
              <label className="block text-[12px] font-bold text-gray-800 mb-1.5">From</label>
              <input type="date" className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] text-gray-600 focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
            </div>

            <div className="flex-1 min-w-[130px]">
              <label className="block text-[12px] font-bold text-gray-800 mb-1.5">To</label>
              <input type="date" className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] text-gray-600 focus:outline-none focus:border-blue-500 bg-white shadow-sm" />
            </div>

            <div className="flex-1 min-w-[140px]">
              <label className="block text-[12px] font-bold text-gray-800 mb-1.5">Student trend</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] text-gray-600 focus:outline-none focus:border-blue-500 bg-white shadow-sm">
                <option value="">— none —</option>
                <option value="improving">Improving</option>
                <option value="declining">Declining</option>
                <option value="consistent">Consistent</option>
              </select>
            </div>
         </div>
         
         <div>
            <button className="bg-[#f97316] hover:bg-[#ea580c] text-white px-5 py-2.5 rounded shadow-sm shadow-orange-500/20 flex items-center gap-2 text-[13px] font-bold transition-colors">
               <BarChart className="w-4 h-4" /> Run
            </button>
         </div>

      </div>

      {/* Info Alert */}
      <div className="bg-white border border-gray-200 border-l-4 border-l-teal-600 shadow-sm px-5 py-4 rounded-r-lg flex items-center gap-3 text-gray-700">
         <Info className="w-[18px] h-[18px] text-gray-800" />
         <p className="text-[13px] font-medium tracking-wide">Select a class and run the report to see analytics.</p>
      </div>

    </div>
  );

  const renderStudentReport = () => (
    <div className="space-y-6 animate-in fade-in">
      
      {/* Filter Options Custom Beautiful Card */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 relative overflow-hidden">
         {/* Top Accent Line */}
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-emerald-500"></div>

         <div className="flex flex-wrap gap-5 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-[12px] font-bold text-gray-800 mb-2">Class</label>
              <select className="w-full border border-gray-300 rounded px-4 py-2.5 text-[13px] text-gray-700 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-white shadow-sm transition-all cursor-pointer hover:border-gray-400">
                <option value="nursery">Nursery</option>
                <option value="lkg">LKG</option>
                <option value="ukg">UKG</option>
                <option value="class1">Class 1</option>
                <option value="class2">Class 2</option>
              </select>
            </div>
            
            <div className="flex-1 min-w-[200px]">
              <label className="block text-[12px] font-bold text-gray-800 mb-2">Student</label>
              <select className="w-full border border-gray-300 rounded px-4 py-2.5 text-[13px] text-gray-700 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-white shadow-sm transition-all cursor-pointer hover:border-gray-400">
                <option value="">Pick a class first</option>
                <option value="1">Aarav Sharma</option>
                <option value="2">Kavya Gupta</option>
                <option value="3">Reyansh Singh</option>
              </select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-[12px] font-bold text-gray-800 mb-2 flex items-center gap-1.5">
                Subject <span className="text-gray-400 font-medium text-[11px]">(optional)</span>
              </label>
              <select className="w-full border border-gray-300 rounded px-4 py-2.5 text-[13px] text-gray-700 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-white shadow-sm transition-all cursor-pointer hover:border-gray-400">
                <option value="math">Mathematics</option>
                <option value="eng">English</option>
                <option value="sci">Science</option>
                <option value="hin">Hindi</option>
              </select>
            </div>
         </div>
      </div>

      {/* Info Alert Tagda Version */}
      <div className="bg-white border border-gray-200 border-l-[4px] border-l-teal-500 shadow-sm pl-4 pr-6 py-4 rounded-r-xl flex items-center gap-4 text-gray-700 relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-full blur-3xl opacity-50"></div>
         <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0 border border-teal-100 z-10">
           <Info className="w-5 h-5 text-teal-600" />
         </div>
         <div className="z-10 text-[14px]">
           <span className="font-bold text-gray-800 tracking-wide block mb-0.5">Missing Information</span>
           <span className="font-medium text-gray-500">Pick a class and a student to see their full progress report.</span>
         </div>
      </div>

    </div>
  );

  const renderPlaceholder = () => (
    <div className="flex flex-col items-center justify-center h-[400px] bg-white border border-gray-200 shadow-sm rounded-[8px] animate-in fade-in">
      <div className="w-16 h-16 bg-gray-50 flex flex-col items-center justify-center mb-4 rounded-full border border-gray-100">
         <ClipboardCheck className="text-gray-300 w-8 h-8" />
      </div>
      <h2 className="text-xl font-bold text-gray-800">{activeTab}</h2>
      <p className="text-sm text-gray-500 mt-2">Under Development</p>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto bg-[#f4f7f6] theme-app-bg text-sm">
      
      {/* Header */}
      <div className="px-6 py-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500"></div>
        <div>
          <h1 className="text-[22px] font-black text-gray-800 tracking-tight flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/20">
              <ClipboardCheck className="w-5 h-5 text-white" />
            </div>
            Assessment
          </h1>
          <p className="text-[13px] text-gray-500 mt-2 font-medium">Lightweight daily & weekly tests — fast mark entry, auto marksheets, and over-time analytics.</p>
        </div>
        
        <button className="bg-[#2463eb] hover:bg-[#1d4ed8] text-white px-5 py-2.5 flex items-center gap-2 rounded-none font-bold text-[13px] shadow-md shadow-blue-500/20 transition-all hover:-translate-y-0.5 duration-200 border border-blue-600">
           <Plus className="w-4 h-4" /> New Assessment
        </button>
      </div>

      {/* Tabs Menu */}
      <div className="px-6 bg-white border-b border-gray-200 flex overflow-x-auto hide-scrollbar">
        {tabs.map(t => {
          const isActive = activeTab === t.name;
          return (
            <button 
              key={t.name}
              onClick={() => handleTabClick(t.name)}
              className={`flex items-center gap-2 px-5 py-4 font-bold text-[12px] uppercase tracking-wider whitespace-nowrap transition-colors border-b-[3px] 
              ${isActive 
                  ? 'text-blue-700 border-blue-600 bg-blue-50/30' 
                  : 'text-gray-500 border-transparent hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}>
                {React.cloneElement(t.icon, { className: isActive ? 'text-blue-600 w-4 h-4' : 'text-gray-400 w-4 h-4' })}
              </div>
              {t.name}
            </button>
          )
        })}
      </div>

      {/* Main Container */}
      <div className="p-7 max-w-[1500px] mx-auto min-h-[500px]">
        {activeTab === 'Dashboard' ? renderDashboard() : 
         activeTab === 'Assessments' ? renderAssessments() : 
         activeTab === 'Guide' ? renderGuide() : 
         activeTab === 'Analytics' ? renderAnalytics() : 
         activeTab === 'Student Report' ? renderStudentReport() : 
         renderPlaceholder()}
      </div>
      
    </div>
  );
};

export default Assessment;
