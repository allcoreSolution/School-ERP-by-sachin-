import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Search, PieChart, LayoutDashboard, User, DollarSign, Video, AlertCircle, FileText,
  Heart, CalendarDays, Users, CheckCircle, HelpCircle, ChevronLeft, ChevronDown,
  PenTool, List, Edit, UploadCloud, Printer, Book, Grid, Handshake, Clipboard, ClipboardCheck, 
  Filter, BarChart, MessageCircle, LogOut, PhoneCall, Accessibility
} from 'lucide-react';

const LiveClassesMenu = () => {
  const [open, setOpen] = useState(false);
  const location = window.location.pathname;
  const isChildActive = location.startsWith('/live');

  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium transition-colors ${
          isChildActive ? 'text-orange-500 font-bold bg-white/5' : 'text-gray-300 hover:text-white hover:bg-white/5'
        }`}
      >
        <div className="flex items-center gap-3">
          <Video className="w-[18px] h-[18px] text-blue-400 flex-shrink-0" />
          <span className="flex-1 text-left">Live Classes</span>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open || isChildActive ? 'rotate-180' : ''}`} />
      </button>
      {(open || isChildActive) && (
        <ul className="ml-6 mt-1 space-y-0.5 border-l border-white/10 pl-3">
          <li>
            <NavLink
              to="/live/manage"
              className={({ isActive }) =>
                `flex items-center gap-2 px-2 py-2 text-[13px] font-medium rounded-none transition-colors ${
                  isActive ? 'text-orange-400 bg-white/5 font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <span className="w-1 h-1 rounded-full bg-current opacity-60"></span>
              Manage Live Classes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/live/settings"
              className={({ isActive }) =>
                `flex items-center gap-2 px-2 py-2 text-[13px] font-medium rounded-none transition-colors ${
                  isActive ? 'text-orange-400 bg-white/5 font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <span className="w-1 h-1 rounded-full bg-current opacity-60"></span>
              Live Class Settings
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
};

const PTMMenu = () => {
  const [open, setOpen] = useState(false);
  const location = window.location.pathname;
  const isChildActive = location.startsWith('/ptm');

  return (
    <li>
      <button
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-none text-sm font-medium transition-colors ${
          isChildActive ? 'text-orange-500 font-bold border-l-2 border-orange-500 bg-white/5 -ml-1 pl-4' : 'text-gray-300 hover:text-white hover:bg-white/5'
        }`}
      >
        <div className="flex items-center gap-3">
          <Handshake className="w-[18px] h-[18px] text-pink-400 flex-shrink-0" />
          <span className="flex-1 text-left">PTM Meetings</span>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open || isChildActive ? 'rotate-180' : ''}`} />
      </button>
      {(open || isChildActive) && (
        <ul className="ml-6 mt-1 space-y-0.5 border-l border-white/10 pl-3">
          {[
             { path: '/ptm-dashboard', label: 'PTM Dashboard' },
             { path: '/ptm-guide', label: 'PTM Guide' },
             { path: '/ptm-attendance', label: 'PTM Attendance & Re...' },
             { path: '/ptm-followups', label: 'PTM Follow-ups' },
             { path: '/ptm', label: 'PTM Reports' }
          ].map(item => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-2 py-2 text-[13px] font-medium rounded-none transition-colors ${
                    isActive ? 'text-gray-200 bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <span className="text-[10px]">»</span>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

const LessonPlannerMenu = () => {
  const [open, setOpen] = useState(false);
  const location = window.location.pathname;
  const isChildActive = location.startsWith('/lesson-planner') || location.startsWith('/lesson-plans');

  return (
    <li>
      <button
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-none text-sm font-medium transition-colors ${
          isChildActive ? 'text-orange-500 font-bold border-l-2 border-orange-500 bg-white/5 -ml-1 pl-4' : 'text-gray-300 hover:text-white hover:bg-white/5'
        }`}
      >
        <div className="flex items-center gap-3">
          <Clipboard className="w-[18px] h-[18px] text-green-400 flex-shrink-0" />
          <span className="flex-1 text-left">Lesson Planner</span>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open || isChildActive ? 'rotate-180' : ''}`} />
      </button>
      {(open || isChildActive) && (
        <ul className="ml-6 mt-1 space-y-0.5 border-l border-white/10 pl-3">
          {[
             { path: '/lesson-planner', label: 'Lesson Planner Dashb...' },
             { path: '/lesson-plans', label: 'Lesson Plans' },
             { path: '/lesson-planner-guide', label: 'Lesson Planner Guide' },
             { path: '/lesson-plan-review', label: 'Lesson Plan Review' },
             { path: '/lesson-plan-coverage', label: 'Lesson Plan Coverage' },
             { path: '/lesson-plan-reports', label: 'Lesson Plan Reports' }
          ].map(item => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-2 py-2 text-[13px] font-medium rounded-none transition-colors ${
                    isActive ? 'text-orange-500 font-bold bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <span className="text-[10px]">»</span>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

const OSMMenu = () => {
  const [open, setOpen] = useState(false);
  const location = window.location.pathname;
  const isChildActive = location.startsWith('/osm');

  return (
    <li>
      <button
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-none text-sm font-medium transition-colors ${
          isChildActive ? 'text-orange-500 font-bold border-l-2 border-orange-500 bg-white/5 -ml-1 pl-4' : 'text-gray-300 hover:text-white hover:bg-white/5'
        }`}
      >
        <div className="flex items-center gap-3">
          <PenTool className={`w-[18px] h-[18px] ${isChildActive ? 'text-orange-500' : 'text-purple-400'} flex-shrink-0`} />
          <span className="flex-1 text-left">OSM Module</span>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open || isChildActive ? 'rotate-180' : ''}`} />
      </button>
      {(open || isChildActive) && (
        <ul className="ml-6 mt-1 space-y-0.5 border-l border-white/10 pl-3">
          {[
             { path: '/osm-dashboard', label: 'OSM Dashboard' },
             { path: '/osm-evaluate', label: 'OSM Evaluate' },
             { path: '/osm-reports', label: 'OSM Reports' },
             { path: '/osm-guide', label: 'OSM Guide' }
          ].map(item => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-2 py-2 text-[13px] font-medium rounded-none transition-colors ${
                    isActive ? 'text-gray-200 bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <span className="text-[10px]">»</span>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

const SurveysMenu = () => {
  const [open, setOpen] = useState(false);
  const location = window.location.pathname;
  const isChildActive = location.startsWith('/my-surveys') || location.startsWith('/feedback-triage') || location.startsWith('/surveys');

  return (
    <li>
      <button
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-none text-sm font-medium transition-colors ${
          isChildActive ? 'text-yellow-500 font-bold border-l-2 border-yellow-500 bg-white/5 -ml-1 pl-4' : 'text-gray-300 hover:text-white hover:bg-white/5'
        }`}
      >
        <div className="flex items-center gap-3">
          <BarChart className={`w-[18px] h-[18px] flex-shrink-0 ${isChildActive ? 'text-yellow-500' : 'text-yellow-500'}`} />
          <span className="flex-1 text-left">Surveys & Feedback</span>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open || isChildActive ? 'rotate-180' : ''}`} />
      </button>
      {(open || isChildActive) && (
        <ul className="ml-6 mt-1 space-y-0.5 border-l border-white/10 pl-3">
          {[
             { path: '/my-surveys', label: 'My Surveys' },
             { path: '/feedback-triage', label: 'Feedback Triage' }
          ].map(item => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-2 py-2 text-[13px] font-medium rounded-none transition-colors ${
                    isActive ? 'text-gray-200 bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <span className="text-[10px]">»</span>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

const AssessmentMenu = () => {
  const [open, setOpen] = useState(false);
  const location = window.location.pathname;
  const isChildActive = location.startsWith('/assessment');

  return (
    <li>
      <button
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-none text-sm font-medium transition-colors ${
          isChildActive ? 'text-orange-500 font-bold border-l-2 border-orange-500 bg-white/5 -ml-1 pl-4' : 'text-gray-300 hover:text-white hover:bg-white/5'
        }`}
      >
        <div className="flex items-center gap-3">
          <ClipboardCheck className={`w-[18px] h-[18px] flex-shrink-0 ${isChildActive ? 'text-orange-500' : 'text-blue-400'}`} />
          <span className="flex-1 text-left">Assessment</span>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open || isChildActive ? 'rotate-180' : ''}`} />
      </button>
      {(open || isChildActive) && (
        <ul className="ml-6 mt-1 space-y-0.5 border-l border-white/10 pl-3">
          {[
             { path: '/assessment-dashboard', label: 'Assessment Dashboard' },
             { path: '/assessments', label: 'Assessments' },
             { path: '/assessment-guide', label: 'Assessment Guide' },
             { path: '/assessment-reports', label: 'Assessment Reports' }
          ].map(item => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-2 py-2 text-[13px] font-medium rounded-none transition-colors ${
                    isActive ? 'text-orange-500 bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <span className="text-[10px]">»</span>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

const LeadManagementMenu = () => {
  const [open, setOpen] = useState(false);
  const location = window.location.pathname;
  const isChildActive = location.startsWith('/lead');

  return (
    <li>
      <button
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-none text-sm font-medium transition-colors ${
          isChildActive ? 'text-teal-400 font-bold border-l-2 border-teal-500 bg-white/5 -ml-1 pl-4' : 'text-gray-300 hover:text-white hover:bg-white/5'
        }`}
      >
        <div className="flex items-center gap-3">
          <Filter className={`w-[18px] h-[18px] flex-shrink-0 ${isChildActive ? 'text-teal-400' : 'text-teal-400'}`} />
          <span className="flex-1 text-left">Lead Management</span>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open || isChildActive ? 'rotate-180' : ''}`} />
      </button>
      {(open || isChildActive) && (
        <ul className="ml-6 mt-1 space-y-0.5 border-l border-white/10 pl-3">
          {[
             { path: '/lead-dashboard', label: 'Lead Dashboard' },
             { path: '/lead-pipeline', label: 'Lead Pipeline Board' },
             { path: '/lead-sources', label: 'Lead Sources & Stages' }
          ].map(item => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-2 py-2 text-[13px] font-medium rounded-none transition-colors ${
                    isActive ? 'text-gray-200 bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <span className="text-[10px]">»</span>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

const HolisticProgressMenu = () => {
  const [open, setOpen] = useState(false);
  const location = window.location.pathname;
  const isChildActive = location.startsWith('/hpc') || location.startsWith('/progress-cards');

  return (
    <li>
      <button
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-none text-sm font-medium transition-colors ${
          isChildActive ? 'text-[#0ea5e9] font-bold border-l-2 border-[#0ea5e9] bg-white/5 -ml-1 pl-4' : 'text-gray-300 hover:text-white hover:bg-white/5'
        }`}
      >
        <div className="flex items-center gap-3">
          <Accessibility className={`w-[18px] h-[18px] flex-shrink-0 ${isChildActive ? 'text-[#0ea5e9]' : 'text-[#0ea5e9]'}`} />
          <span className="flex-1 text-left">Holistic Progress C...</span>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open || isChildActive ? 'rotate-180' : ''}`} />
      </button>
      {(open || isChildActive) && (
        <ul className="ml-6 mt-1 space-y-0.5 border-l border-white/10 pl-3">
          {[
             { path: '/hpc-dashboard', label: 'HPC Dashboard' },
             { path: '/hpc-activities', label: 'HPC Activities' },
             { path: '/progress-cards', label: 'Progress Cards' }
          ].map(item => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-2 py-2 text-[13px] font-medium rounded-none transition-colors ${
                    isActive ? 'text-gray-200 bg-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <span className="text-[10px]">»</span>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

const navLinkClass = ({ isActive }) => 
  `flex items-center gap-3 px-3 py-2.5 rounded-none text-sm font-medium transition-colors ${
    isActive 
      ? 'text-orange-500 font-bold border-l-2 border-orange-500 bg-white/5 -ml-1 pl-4' 
      : 'text-gray-300 hover:text-white hover:bg-white/5'
  }`;

const navLinkFlexBetweenClass = ({ isActive }) => 
  `flex items-center justify-between px-3 py-2.5 rounded-none text-sm font-medium transition-colors ${
    isActive 
      ? 'text-orange-500 font-bold border-l-2 border-orange-500 bg-white/5 -ml-1 pl-4' 
      : 'text-gray-300 hover:text-white hover:bg-white/5'
  }`;

const Sidebar = () => {
  const [search, setSearch] = useState('');
  
  return (
    <aside className="w-[240px] h-screen bg-[#353A40] text-gray-300 flex flex-col overflow-hidden border-r border-[#2a2e33] flex-shrink-0">
      
      {/* Logo Area */}
      <div className="h-[60px] px-5 flex items-center flex-shrink-0 border-b border-[#2a2e33]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-none border border-orange-500/30 flex items-center justify-center relative">
            <PieChart className="w-5 h-5 text-orange-500" />
            <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-none"></div>
          </div>
          <span className="text-[15px] font-bold text-white tracking-wide">Y.U.G</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 flex-shrink-0">
         <div className="flex bg-[#2a2e33] rounded-none overflow-hidden border border-white/5">
           <input 
             type="text" 
             placeholder="Search Menu..." 
             className="w-full bg-transparent text-[13px] px-3 py-2 focus:outline-none placeholder-gray-500 text-gray-200"
             value={search}
             onChange={e => setSearch(e.target.value)}
           />
           <button className="px-3 bg-white/5 flex items-center justify-center border-l border-white/5 text-gray-400 hover:text-white transition-colors">
             <Search className="w-4 h-4" />
           </button>
         </div>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 overflow-y-auto px-4 pb-10" style={{ scrollbarWidth: 'none' }}>
        
        {/* MAIN NAVIGATION */}
        <div className="mb-6 mt-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 ml-1">Main Navigation</p>
          <ul className="space-y-1">
            <li><NavLink to="/" className={navLinkClass}><LayoutDashboard className="w-[18px] h-[18px]" /> Dashboard</NavLink></li>
            <li><NavLink to="/my-profile" className={navLinkClass}><User className="w-[18px] h-[18px] text-red-400" /> My Profile</NavLink></li>
            <li><NavLink to="/loans" className={navLinkClass}><DollarSign className="w-[18px] h-[18px] text-purple-400" /> My Loans &amp; Advances</NavLink></li>
            <li><LiveClassesMenu /></li>
            <li><NavLink to="/complaints" className={navLinkClass}><AlertCircle className="w-[18px] h-[18px] text-orange-400" /> Complaints</NavLink></li>
            <li><NavLink to="/leave" className={navLinkClass}><FileText className="w-[18px] h-[18px] text-pink-500" /> Apply Leave</NavLink></li>
            <li><NavLink to="/health" className={navLinkClass}><Heart className="w-[18px] h-[18px] text-green-400" /> Health Records</NavLink></li>
            <li><NavLink to="/timetable" className={navLinkClass}><CalendarDays className="w-[18px] h-[18px] text-purple-500" /> My Timetable</NavLink></li>
          </ul>
        </div>
        
        {/* STUDENTS */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 ml-1">Students</p>
          <ul className="space-y-1">
            <li><NavLink to="/students" className={navLinkClass}><Users className="w-[18px] h-[18px] text-teal-400" /> Student List</NavLink></li>
            <li><NavLink to="/student-attendance" className={navLinkClass}><CheckCircle className="w-[18px] h-[18px] text-amber-400" /> Student Attendance</NavLink></li>
          </ul>
        </div>

        {/* ONLINE EXAMS */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 ml-1">Online Exams</p>
          <ul className="space-y-1">
            <li><NavLink to="/online-exams" className={navLinkClass}><PenTool className="w-[18px] h-[18px] text-purple-400" /> Manage Online Exams</NavLink></li>
            <li><NavLink to="/question-bank" className={navLinkClass}><List className="w-[18px] h-[18px] text-cyan-400" /> Question Bank</NavLink></li>
          </ul>
        </div>

        {/* EXAMS */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 ml-1">Exams</p>
          <ul className="space-y-1">
            <li><NavLink to="/offline-exams" className={navLinkClass}><List className="w-[18px] h-[18px] text-pink-400" /> Manage Offline Exams</NavLink></li>
            <li><NavLink to="/enter-marks" className={navLinkClass}><Edit className="w-[18px] h-[18px] text-green-400" /> Enter Marks</NavLink></li>
            <li><NavLink to="/upload-marksheet" className={navLinkClass}><UploadCloud className="w-[18px] h-[18px] text-purple-400" /> Upload Marksheet</NavLink></li>
            <li><NavLink to="/generate-marksheet" className={navLinkClass}><Printer className="w-[18px] h-[18px] text-blue-400" /> Generate Marksheet</NavLink></li>
          </ul>
        </div>

        {/* STUDY MANAGEMENT */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 ml-1">Study Management</p>
          <ul className="space-y-1">
            <li><NavLink to="/classwork" className={navLinkClass}><Book className="w-[18px] h-[18px] text-yellow-500" /> Classwork & Logbook</NavLink></li>
            <li><NavLink to="/assignments" className={navLinkClass}><Edit className="w-[18px] h-[18px] text-red-400" /> Homework & Assignments</NavLink></li>
          </ul>
        </div>

        {/* DOCUMENTS */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 ml-1">Documents</p>
          <ul className="space-y-1">
            <li><NavLink to="/certificates" className={navLinkClass}><Printer className="w-[18px] h-[18px] text-cyan-500" /> Certificates & Documents</NavLink></li>
            <li><NavLink to="/apps-center" className={navLinkClass}><Grid className="w-[18px] h-[18px] text-orange-400" /> Apps Center</NavLink></li>
            <PTMMenu />
            <LessonPlannerMenu />
            <OSMMenu />
            <AssessmentMenu />
            <LeadManagementMenu />
            <SurveysMenu />
          </ul>
        </div>

        {/* COMMUNICATION */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 ml-1">Communication</p>
          <ul className="space-y-1">
            <li><NavLink to="/messages" className={navLinkClass}><MessageCircle className="w-[18px] h-[18px] text-purple-400" /> Messages</NavLink></li>
            <HolisticProgressMenu />
          </ul>
        </div>
        
        {/* ACCOUNT */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 ml-1">Account</p>
          <ul className="space-y-1">
            <li>
               <button 
                 onClick={() => {
                   localStorage.clear();
                   sessionStorage.clear();
                   // Redirect to the main root (which will redirect to Login if protected)
                   // Or directly to the port where ERP is running (5173 usually)
                   window.location.href = 'http://localhost:5173/login';
                 }} 
                 className="w-full flex items-center gap-3 px-3 py-2.5 rounded-none text-sm font-medium transition-colors text-gray-300 hover:text-white hover:bg-white/5"
               >
                 <LogOut className="w-[18px] h-[18px] text-pink-500" /> Logout
               </button>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
