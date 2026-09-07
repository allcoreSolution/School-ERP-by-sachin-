import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { 
  Users, DollarSign, CheckCircle, Briefcase, AlertCircle,
  Search, Bell, Volume2, Calendar, FileText, Gift, Book, Grid, CheckSquare, HelpCircle,
  Video, Heart, CalendarDays, LayoutDashboard, Plus, Settings, UserCheck, Monitor, 
  UploadCloud, BookOpen, Award, ClipboardCheck, PhoneCall, PieChart, Clipboard, 
  Layers, BarChart, Edit, FileSpreadsheet, FileCheck, LineChart, LayoutTemplate, 
  List, FileQuestion, MessageSquare, MessageCircle, Activity, CreditCard, X
} from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color, percent }) => (
  <div className="bg-white rounded-none p-4 shadow-sm border border-gray-200 flex flex-col relative overflow-hidden h-auto justify-between transition-colors hover:border-gray-300">
    <div className="flex flex-col h-full z-10">
      <div className="flex justify-between items-start mb-2">
        <div className={`w-9 h-9 rounded-none flex items-center justify-center text-white shadow-sm ${color}`}>
          <Icon className="w-4 h-4" />
        </div>
        {percent && <span className="text-[9px] font-black uppercase tracking-widest text-green-700 bg-green-100 border border-green-200 px-1.5 py-0.5 rounded-none flex items-center shadow-sm">{percent}</span>}
      </div>
      <div>
        <h3 className="text-2xl font-black text-gray-800 leading-none mb-1">{value}</h3>
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{title}</p>
      </div>
    </div>
    {/* Decorative blur/chart at bottom */}
    <div className="absolute -bottom-8 -right-8 w-32 h-32 opacity-[0.03] rounded-none" style={{ background: 'radial-gradient(circle, currentcolor, transparent)' }}></div>
  </div>
);

const AppIcon = ({ title, icon: Icon, colorName, onClick }) => (
  <div onClick={onClick} className="flex flex-col items-center justify-center gap-2 p-3 bg-white border border-gray-100 rounded-none shadow-sm hover:border-gray-300 hover:shadow-md cursor-pointer transition-all">
    <div className={`w-12 h-12 rounded-none flex items-center justify-center bg-${colorName}-100 text-${colorName}-600`}>
      <Icon className="w-6 h-6" />
    </div>
    <span className="text-[10px] text-center font-bold text-gray-700 theme-text leading-tight">{title}</span>
  </div>
);

const ecosystemModules = [
  { title: "Manage Live Classes", icon: Video, colorName: "red", category: "Academics", route: "/live/manage" },
  { title: "Live Class Settings", icon: Settings, colorName: "green", category: "Academics", route: "/live/settings" },
  { title: "Complaints", icon: AlertCircle, colorName: "blue", category: "Operations", route: "/complaints" },
  { title: "Apply Leave", icon: CalendarDays, colorName: "teal", category: "Operations", route: "/leave" },
  { title: "Health Records", icon: Heart, colorName: "orange", category: "Students", route: "/health" },
  { title: "My Timetable", icon: Calendar, colorName: "teal", category: "Academics", route: "/timetable" },
  { title: "Student List", icon: Users, colorName: "blue", category: "Students", route: "/students" },
  { title: "Student Attendance", icon: UserCheck, colorName: "orange", category: "Students", route: "/student-attendance" },
  { title: "Manage Online Exams", icon: Monitor, colorName: "orange", category: "Academics", route: "/online-exams" },
  { title: "Question Bank", icon: HelpCircle, colorName: "purple", category: "Academics", route: "/question-bank" },
  { title: "Manage Offline Exams", icon: FileText, colorName: "orange", category: "Academics", route: "/offline-exams" },
  { title: "Enter Marks", icon: CheckSquare, colorName: "blue", category: "Academics", route: "/enter-marks" },
  { title: "Upload Marksheet", icon: UploadCloud, colorName: "blue", category: "Academics", route: "/upload-marksheet" },
  { title: "Generate Marksheet", icon: FileText, colorName: "green", category: "Academics", route: "/generate-marksheet" },
  { title: "Classwork & Logbook", icon: Book, colorName: "blue", category: "Academics", route: "/classwork" },
  { title: "Homework & Assignments", icon: BookOpen, colorName: "orange", category: "Academics", route: "/assignments" },
  { title: "Certificates & Documents", icon: Award, colorName: "blue", category: "Students", route: "/certificates" },
  { title: "Apps Center", icon: Grid, colorName: "green", category: "Operations", route: "/apps-center" },
  { title: "PTM Dashboard", icon: LayoutDashboard, colorName: "blue", category: "Operations", route: "/ptm-dashboard" },
  { title: "PTM Guide", icon: BookOpen, colorName: "green", category: "Operations", route: "/ptm-guide" },
  { title: "PTM Attendance & Remarks", icon: ClipboardCheck, colorName: "orange", category: "Operations", route: "/ptm-attendance" },
  { title: "PTM Follow-ups", icon: PhoneCall, colorName: "teal", category: "Operations", route: "/ptm-followups" },
  { title: "PTM Reports", icon: PieChart, colorName: "purple", category: "Operations", route: "/ptm" },
  { title: "Lesson Planner Dashboard", icon: LayoutDashboard, colorName: "blue", category: "Academics", route: "/lesson-planner" },
  { title: "Lesson Plans", icon: Clipboard, colorName: "green", category: "Academics", route: "/lesson-plans" },
  { title: "Lesson Planner Guide", icon: BookOpen, colorName: "orange", category: "Academics", route: "/lesson-planner-guide" },
  { title: "Lesson Plan Review", icon: CheckCircle, colorName: "teal", category: "Academics", route: "/lesson-plan-review" },
  { title: "Lesson Plan Coverage", icon: Layers, colorName: "purple", category: "Academics", route: "/lesson-plan-coverage" },
  { title: "Lesson Plan Reports", icon: BarChart, colorName: "orange", category: "Academics", route: "/lesson-plan-reports" },
  { title: "OSM Dashboard", icon: LayoutDashboard, colorName: "blue", category: "Operations", route: "/osm-dashboard" },
  { title: "OSM Evaluate", icon: Edit, colorName: "green", category: "Operations", route: "/osm-evaluate" },
  { title: "OSM Reports", icon: FileSpreadsheet, colorName: "orange", category: "Operations", route: "/osm-reports" },
  { title: "OSM Guide", icon: Book, colorName: "teal", category: "Operations", route: "/osm-guide" },
  { title: "Assessment Dashboard", icon: LayoutDashboard, colorName: "blue", category: "Academics", route: "/assessment-dashboard" },
  { title: "Assessments", icon: FileCheck, colorName: "green", category: "Academics", route: "/assessments" },
  { title: "Assessment Guide", icon: Book, colorName: "orange", category: "Academics", route: "/assessment-guide" },
  { title: "Assessment Reports", icon: LineChart, colorName: "teal", category: "Academics", route: "/assessment-reports" },
  { title: "Lead Dashboard", icon: LayoutDashboard, colorName: "blue", category: "Finance", route: "/lead-dashboard" },
  { title: "Lead Pipeline Board", icon: LayoutTemplate, colorName: "green", category: "Finance", route: "/lead-pipeline" },
  { title: "Lead Sources & Stages", icon: List, colorName: "orange", category: "Finance", route: "/lead-sources" },
  { title: "My Surveys", icon: FileQuestion, colorName: "blue", category: "Operations", route: "/my-surveys" },
  { title: "Feedback Triage", icon: MessageSquare, colorName: "green", category: "Operations", route: "/feedback-triage" },
  { title: "Messages", icon: MessageCircle, colorName: "blue", category: "Operations", route: "/messages" },
  { title: "HPC Dashboard", icon: LayoutDashboard, colorName: "blue", category: "Academics", route: "/hpc-dashboard" },
  { title: "HPC Activities", icon: Activity, colorName: "green", category: "Academics", route: "/hpc-activities" },
  { title: "Progress Cards", icon: CreditCard, colorName: "orange", category: "Academics", route: "/progress-cards" }
];

import { useTheme } from '../context/ThemeContext';
import ClassicTeacherLayout from './layouts/ClassicTeacherLayout';

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentTheme, currentLayout } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hubSearch, setHubSearch] = useState('');
  const [hubTab, setHubTab] = useState('All');
  const [modalSearch, setModalSearch] = useState('');

  const handleModuleClick = (route) => {
    setIsModalOpen(false);
    navigate(route);
  };

  const filteredHubModules = ecosystemModules.filter(m => 
    (hubTab === 'All' || m.category === hubTab) && 
    (m.title.toLowerCase().includes(hubSearch.toLowerCase()))
  );

  const filteredModalModules = ecosystemModules.filter(m => 
    m.title.toLowerCase().includes(modalSearch.toLowerCase())
  );

  useEffect(() => {
    if (!sessionStorage.getItem('welcomeShown')) {
      Swal.fire({
        title: 'Welcome back, Amit!',
        text: 'You have new notifications regarding online exams.',
        icon: 'info',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      sessionStorage.setItem('welcomeShown', 'true');
    }
  }, []);

  return (
    <>
      {currentLayout === 'layout-classic-teacher' ? (
        <ClassicTeacherLayout />
      ) : (
        <div className="flex-1 overflow-y-auto bg-[#f9fafb]">
          {/* Alert Banner */}
      <div className="bg-[#0ea5e9] text-white px-6 py-2.5 text-xs text-center font-medium flex items-center justify-center gap-2">
        <span className="font-bold bg-white/20 px-1.5 py-0.5 rounded-none text-[10px] uppercase">New</span>
        academic-session scoping. Lists and dashboard numbers now show the selected academic session only.
      </div>

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Good Afternoon, Amit 👋</h1>
          <p className="text-sm text-gray-500 mt-1">Here's what's happening at YUG-SCHOOL today — Wednesday, 26 August 2026</p>
        </div>
        
        {/* Dynamic Layout Engine based on Layout Configuration */}
        
        {/* Layout Pattern 1: Analytics / Reversed Hub displays Hub at top */}
        {(currentLayout === 'layout-analytics') && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-3">
              {/* Ecosystem Hub */}
              <div className="bg-white rounded-none shadow-sm border border-gray-100 p-5 theme-card">
                 {/* Hub Content Block */}
                 <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-4">
                  <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-none flex items-center justify-center theme-icon">
                    <Grid className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-gray-800 theme-text leading-tight">Ecosystem Hub</h2>
                    <p className="text-[11px] font-semibold text-gray-400">46 modules — everything your school runs on</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Search modules..." value={hubSearch} onChange={(e) => setHubSearch(e.target.value)} className="pl-8 pr-3 py-1.5 border border-gray-200 rounded-none text-xs w-48 focus:outline-none focus:ring-1 focus:ring-blue-500 theme-nav-item" />
                  </div>
                  {['All', 'Finance', 'Academics', 'Students', 'Operations'].map(tab => (
                    <button 
                      key={tab}
                      onClick={() => setHubTab(tab)}
                      className={`px-4 py-1.5 rounded-none text-xs font-bold border transition-colors theme-icon ${hubTab === tab ? 'bg-blue-50 text-blue-600 border-blue-100 theme-nav-active' : 'bg-transparent text-gray-500 hover:bg-gray-50 border-gray-200 theme-text font-medium'}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-3">
                  {filteredHubModules.slice(0, 29).map((mod, idx) => (
                    <AppIcon key={idx} title={mod.title} icon={mod.icon} colorName={mod.colorName} onClick={() => handleModuleClick(mod.route)} />
                  ))}
                  <div onClick={() => setIsModalOpen(true)} className="flex flex-col items-center justify-center gap-2 p-3 bg-white border-2 border-dashed border-indigo-400 rounded-none cursor-pointer hover:bg-indigo-50 transition-colors theme-card">
                    <div className="w-10 h-10 rounded-none flex items-center justify-center bg-indigo-500 text-white shadow-sm theme-icon">
                      <Plus className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] text-center font-bold text-indigo-600 leading-tight">More</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Top Stats */}
        <div className={`grid gap-4 ${
          currentLayout === 'layout-compact' ? 'grid-cols-2 lg:grid-cols-5 gap-8' : 
          currentLayout === 'layout-analytics' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8 mt-4' : 
          currentLayout === 'layout-focus' ? 'grid-cols-1 lg:grid-cols-2 gap-6' :
          'grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4'
        }`}>
          <StatCard title="Total Students" value="0" icon={Users} color="bg-blue-500" />
          <StatCard title="Fees Collected" value="₹0" icon={DollarSign} color="bg-emerald-500" percent="↑1133%" />
          <StatCard title="Attendance Today" value="0%" icon={CheckCircle} color="bg-indigo-500" />
          <StatCard title="Active Staff" value="0" icon={Briefcase} color="bg-purple-500" />
          <StatCard title="Pending Fees" value="₹0" icon={AlertCircle} color="bg-rose-500" />
        </div>

        {/* Middle Section: Hub & Live Activity for other themes */}
        {!(currentLayout === 'layout-analytics') && (
          <div className={`flex flex-col ${
            currentLayout === 'layout-reversed' ? 'lg:flex-row-reverse' :
            currentLayout === 'layout-focus' ? 'lg:flex-col' : 'lg:flex-row'
          } gap-6 mt-6`}>
            
            <div className={`w-full ${currentLayout === 'layout-compact' ? 'lg:w-[60%]' : currentLayout === 'layout-focus' ? 'lg:w-full' : 'lg:w-[66.666%]'} space-y-4`}>
              <div className="bg-white rounded-none shadow-sm border border-gray-100 p-5 theme-card">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-4">
                  <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-none flex items-center justify-center theme-icon">
                    <Grid className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-gray-800 theme-text leading-tight">Ecosystem Hub</h2>
                    <p className="text-[11px] font-semibold text-gray-400">46 modules — everything your school runs on</p>
                  </div>
                </div>
                
                {/* Category tabs */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Search modules..." value={hubSearch} onChange={(e) => setHubSearch(e.target.value)} className="pl-8 pr-3 py-1.5 border border-gray-200 rounded-none text-xs w-48 focus:outline-none focus:ring-1 focus:ring-blue-500 theme-nav-item" />
                  </div>
                  {['All', 'Finance', 'Academics', 'Students', 'Operations'].map(tab => (
                    <button 
                      key={tab}
                      onClick={() => setHubTab(tab)}
                      className={`px-4 py-1.5 rounded-none text-xs font-bold border transition-colors theme-icon ${hubTab === tab ? 'bg-blue-50 text-blue-600 border-blue-100 theme-nav-active' : 'bg-transparent text-gray-500 hover:bg-gray-50 border-gray-200 theme-text font-medium'}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Apps Grid */}
                <div className={`grid gap-3 ${currentLayout === 'layout-compact' ? 'grid-cols-4 sm:grid-cols-5 lg:grid-cols-6' : 'grid-cols-3 sm:grid-cols-5 lg:grid-cols-7'}`}>
                  {filteredHubModules.slice(0, 29).map((mod, idx) => (
                    <AppIcon key={idx} title={mod.title} icon={mod.icon} colorName={mod.colorName} onClick={() => handleModuleClick(mod.route)} />
                  ))}
                  
                  {/* + More Button */}
                  <div onClick={() => setIsModalOpen(true)} className="flex flex-col items-center justify-center gap-2 p-3 bg-white border-2 border-dashed border-indigo-400 rounded-none cursor-pointer hover:bg-indigo-50 transition-colors theme-card">
                    <div className="w-10 h-10 rounded-none flex items-center justify-center bg-indigo-500 text-white shadow-sm theme-icon">
                      <Plus className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] text-center font-bold text-indigo-600 leading-tight">More</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Activity Column */}
            <div className={`w-full ${currentLayout === 'layout-compact' ? 'lg:w-[40%]' : currentLayout === 'layout-focus' ? 'lg:w-full' : 'lg:w-[33.333%]'}`}>
              <div className="bg-white rounded-none shadow-sm border border-gray-100 p-5 h-full theme-card">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                  <div>
                    <h2 className="text-base font-bold text-gray-800 theme-text leading-tight">Live Activity</h2>
                    <p className="text-[11px] font-semibold text-gray-400">Real-time updates</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[10px] font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded-none theme-icon">All</span>
                    <span className="text-[10px] font-semibold text-gray-400 px-2 py-1">Fees</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-none bg-pink-100 text-pink-600 flex items-center justify-center flex-shrink-0 theme-icon">
                      <Volume2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 theme-text">Notice - test</h4>
                      <span className="text-[10px] font-bold text-pink-500 bg-pink-50 px-1.5 py-0.5 rounded-none theme-icon">Notice</span>
                      <p className="text-xs text-gray-500 mt-1">2 days ago</p>
                    </div>
                    <div className="ml-auto text-right">
                      <span className="text-[10px] text-gray-400">26 Aug<br/>12:00 AM</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-none bg-pink-100 text-pink-600 flex items-center justify-center flex-shrink-0 theme-icon">
                      <Volume2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 theme-text">Notice - for exam</h4>
                      <span className="text-[10px] font-bold text-pink-500 bg-pink-50 px-1.5 py-0.5 rounded-none theme-icon">Notice</span>
                      <p className="text-xs text-gray-500 mt-1">2 days ago</p>
                    </div>
                    <div className="ml-auto text-right">
                      <span className="text-[10px] text-gray-400">24 Aug<br/>12:00 AM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Lower Widget Grid (From second image) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="bg-white rounded-none shadow-sm border border-gray-100 p-5 min-h-[300px]">
            <h3 className="font-bold text-gray-800 theme-text text-sm">Today's Attendance</h3>
            <p className="text-xs text-gray-400 mb-6">Students — 04 Sep</p>
            <div className="flex items-center justify-center mb-6 relative">
              {/* Circular Chart Placeholder */}
              <div className="w-32 h-32 rounded-none border-[8px] border-gray-100 flex items-center justify-center">
                 <div className="text-center">
                    <span className="text-2xl font-black text-gray-800">0%</span>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Present</p>
                 </div>
              </div>
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Class-Wise Breakdown</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700 theme-text">Class XII</span>
                <div className="flex items-center gap-3">
                  <span className="text-green-500 font-bold text-xs"><CheckCircle className="w-3 h-3 inline mr-1" />0%</span>
                  <span className="text-red-500 font-bold text-xs"><AlertCircle className="w-3 h-3 inline mr-1" />21</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700 theme-text">KG</span>
                <div className="flex items-center gap-3">
                  <span className="text-green-500 font-bold text-xs"><CheckCircle className="w-3 h-3 inline mr-1" />0%</span>
                  <span className="text-red-500 font-bold text-xs"><AlertCircle className="w-3 h-3 inline mr-1" />1</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-none shadow-sm border border-gray-100 p-5 min-h-[300px] flex flex-col">
            <h3 className="font-bold text-gray-800 theme-text text-sm">Today's Timetable</h3>
            <p className="text-xs text-gray-400">My schedule</p>
            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm text-gray-400 font-medium">No periods scheduled today.</p>
            </div>
          </div>

          <div className="bg-white rounded-none shadow-sm border border-gray-100 p-5 min-h-[300px] flex flex-col">
            <h3 className="font-bold text-gray-800 theme-text text-sm">Upcoming Events</h3>
            <p className="text-xs text-gray-400">This week</p>
            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm text-gray-400 font-medium">No upcoming events.</p>
            </div>
          </div>

          <div className="bg-white rounded-none shadow-sm border border-gray-100 p-5 min-h-[200px] flex flex-col">
            <h3 className="font-bold text-gray-800 theme-text text-sm flex gap-2"><Volume2 className="w-4 h-4 text-blue-500" /> Announcements</h3>
            <p className="text-xs text-gray-400">Latest notices</p>
            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm text-gray-400 font-medium">No announcements yet.</p>
            </div>
          </div>

          <div className="bg-white rounded-none shadow-sm border border-gray-100 p-5 min-h-[200px] flex flex-col">
            <h3 className="font-bold text-gray-800 theme-text text-sm flex gap-2"><FileText className="w-4 h-4 text-purple-500" /> Upcoming Exams</h3>
            <p className="text-xs text-gray-400">Next scheduled papers</p>
            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm text-gray-400 font-medium">No upcoming exams.</p>
            </div>
          </div>

          <div className="bg-white rounded-none shadow-sm border border-gray-100 p-5 min-h-[200px] flex flex-col">
            <h3 className="font-bold text-gray-800 theme-text text-sm flex gap-2"><Gift className="w-4 h-4 text-purple-600" /> Today's Birthdays</h3>
            <p className="text-xs text-gray-400">Students & Staff</p>
            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm text-gray-400 font-medium">No birthdays this week.</p>
            </div>
          </div>

        </div>

      </div>

      {/* Full Ecosystem Modal */}
      {isModalOpen && (
        <div className="fixed top-[60px] left-[240px] right-0 bottom-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 overflow-hidden">
          <div className="bg-white rounded-none w-full max-w-[1000px] max-h-[90vh] flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-none bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800 leading-tight">All Ecosystem Modules</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Explore the full comprehensive suite of 46 premium modules.</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 rounded-none border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {/* Search Bar */}
            <div className="p-4 border-b border-gray-100 flex-shrink-0 bg-gray-50">
               <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" placeholder="Search all modules..." value={modalSearch} onChange={(e) => setModalSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-white border border-indigo-200 rounded-none text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
               </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto bg-gray-50 flex-1">
              {filteredModalModules.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3">
                  {filteredModalModules.map((mod, idx) => (
                    <AppIcon key={idx} title={mod.title} icon={mod.icon} colorName={mod.colorName} onClick={() => handleModuleClick(mod.route)} />
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-sm py-10">No modules found. Try another search.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
      )}
    </>
  );
};

export default Dashboard;
