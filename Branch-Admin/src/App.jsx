import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Menu, Bell, User, Search, Globe, ChevronDown, ChevronRight,
  LogOut, Contact, BookOpen, CreditCard, LayoutTemplate, BarChart2
} from 'lucide-react';
import Dashboard from './pages/Dashboard';
import GenericPage from './pages/GenericPage';
import Profile from './pages/Profile';
import Branches from './pages/Branches';
import Payments from './pages/Payments';
import Templates from './pages/Templates';
import LoginLogs from './pages/LoginLogs';
import SchoolsUsage from './pages/SchoolsUsage';
import FeeCollections from './pages/FeeCollections';
import IncomeExpense from './pages/IncomeExpense';
import AttendanceTrends from './pages/AttendanceTrends';
import EngagementAudit from './pages/EngagementAudit';
import CommunicationsReport from './pages/CommunicationsReport';
import Login from './pages/Login';
import Swal from 'sweetalert2';

const Sidebar = ({ isOpen, setOpen, onLogout }) => {
  const location = useLocation();
  const [reportsOpen, setReportsOpen] = useState(location.pathname.startsWith('/reports'));

  const links = [
    { name: 'Branch Overview', path: '/', icon: <BarChart2 className="w-4 h-4" /> },
    { name: 'My Profile', path: '/profile', icon: <User className="w-4 h-4" /> },
    { name: 'My Branches', path: '/branches', icon: <Contact className="w-4 h-4" /> },
    { name: 'Payments', path: '/payments', icon: <CreditCard className="w-4 h-4" /> },
    { name: 'Templates', path: '/templates', icon: <LayoutTemplate className="w-4 h-4" /> },
  ];

  return (
    <div className={`fixed inset-y-0 left-0 bg-[#0f172a] w-[220px] text-gray-300 flex flex-col z-50 transform transition-transform duration-200 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 shadow-[4px_0_24px_rgba(0,0,0,0.05)]`}>
      {/* Branding */}
      <div className="h-[70px] flex items-center px-4 border-b border-[#1e293b]">
        <div className="flex items-center gap-2 text-white">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center font-bold shadow-lg">
            M
          </div>
          <span className="font-semibold text-[15px]">Multi School ERP ...</span>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto py-4 font-medium text-[14px]">
        <div className="px-5 mb-2 text-[11px] uppercase tracking-wider text-gray-400 font-bold">
          Platform
        </div>
        
        {links.map((link, idx) => {
          const isActive = location.pathname === link.path;
          return (
            <Link key={idx} to={link.path} className={`flex items-center gap-3 px-6 py-3 transition-colors text-[14px] font-medium ${isActive ? 'text-white border-l-[3px] border-orange-500 bg-gradient-to-r from-orange-500/10 to-transparent' : 'text-gray-400 hover:text-white hover:bg-[#1e293b]'}`}>
              <span className={`${isActive ? 'text-orange-500' : 'text-gray-400'}`}>{link.icon}</span>
              {link.name}
            </Link>
          );
        })}

        {/* Dropsdown Example */}
        <div>
          <button 
            onClick={() => setReportsOpen(!reportsOpen)}
            className={`w-full flex items-center justify-between px-6 py-3 font-medium transition-colors ${
              location.pathname.startsWith('/reports') ? 'text-white bg-[#1e293b]' : 'text-gray-400 hover:text-white hover:bg-[#1e293b]'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={location.pathname.startsWith('/reports') ? 'text-white' : 'text-gray-400'}><BookOpen className="w-4 h-4" /></span>
              Reports
            </div>
            <ChevronRight className={`w-3.5 h-3.5 transition-transform ${reportsOpen ? 'rotate-90' : ''}`} />
          </button>
          
          {reportsOpen && (
              <div className="bg-[#0b1121] py-2 flex flex-col font-medium shadow-inner">
                {[
                  { name: 'Login Logs', path: '/reports/login-logs' },
                  { name: 'Schools Usage', path: '/reports/schools-usage' },
                  { name: 'Fee Collections', path: '/reports/fee-collections' },
                  { name: 'Income & Expense', path: '/reports/income-expense' },
                  { name: 'Attendance Trends', path: '/reports/attendance-trends' },
                  { name: 'Engagement Audit', path: '/reports/engagement-audit' },
                  { name: 'Communications', path: '/reports/communications' }
                ].map((link, idx) => {
                  const isSubActive = location.pathname === link.path;
                  return (
                    <Link 
                      key={idx}
                      to={link.path} 
                      className={`px-10 py-2.5 text-[13.5px] transition-colors flex items-center gap-2 ${
                        isSubActive 
                          ? 'text-white bg-gradient-to-r from-orange-500/10 to-transparent border-l-[3px] border-orange-500' 
                          : 'text-gray-400 hover:text-white hover:bg-[#1e293b]'
                      }`}
                    >
                      <span className={`text-[10px] ${isSubActive ? 'text-orange-500' : ''}`}>»</span> {link.name}
                    </Link>
                  );
                })}
              </div>
            )}
        </div>

        <div className="px-5 mt-8 mb-2 text-[11px] uppercase tracking-wider text-gray-400 font-bold">
          Account
        </div>
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-6 py-3 font-medium hover:text-white hover:bg-[#1e293b] transition-colors text-gray-400 focus:outline-none"
        >
          <span className="text-gray-400"><LogOut className="w-4 h-4" /></span> Logout
        </button>
      </div>

      <div className="bg-[#0b1121] px-4 py-3 text-center border-t border-[#1e293b]">
        <p className="text-[10px] text-gray-500">&copy; {new Date().getFullYear()} Multi School ERP</p>
        <p className="text-[10px] text-gray-400 font-bold">Developed by <span className="text-orange-400">Sachin</span> @ALLCORE SOLUTION</p>
      </div>
    </div>
  );
};

const Header = ({ setOpen, onLogout }) => {
  const [langOpen, setLangOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Close others when one opens
  const toggleMenu = (menu) => {
    if (menu === 'lang') { setLangOpen(!langOpen); setNotifOpen(false); setProfileOpen(false); }
    if (menu === 'notif') { setNotifOpen(!notifOpen); setLangOpen(false); setProfileOpen(false); }
    if (menu === 'profile') { setProfileOpen(!profileOpen); setLangOpen(false); setNotifOpen(false); }
  };

  return (
    <div className="h-[70px] bg-white flex items-center justify-between px-4 sm:px-6 shadow-sm sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button className="text-gray-500 hover:text-gray-700 md:hidden" onClick={() => setOpen(old => !old)}>
          <Menu className="w-5 h-5" />
        </button>
        <button className="text-gray-500 hover:text-gray-700 hidden md:block">
          <Menu className="w-5 h-5" />
        </button>
        
        <div className="hidden sm:flex relative items-center">
          <input 
            type="text" 
            placeholder="Search Menu..." 
            className="bg-[#f3f7f9] text-[13px] border-none rounded-sm pl-4 pr-10 py-1.5 w-60 focus:outline-none focus:ring-1 focus:ring-gray-300"
            onKeyDown={(e) => e.key === 'Enter' && alert("Searching for: " + e.target.value)}
          />
          <button 
            onClick={() => alert("Search functionality triggered")}
            className="absolute right-3 text-gray-500 hover:text-gray-800 focus:outline-none"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-5 relative">
        
        {/* Language Selection */}
        <div className="relative">
          <div 
            onClick={() => toggleMenu('lang')}
            className={`flex items-center gap-1.5 cursor-pointer hover:text-gray-900 text-sm font-medium transition-colors ${langOpen ? 'text-orange-500' : 'text-gray-600'}`}
          >
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline">English</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
          </div>

          {langOpen && (
            <div className="absolute right-0 mt-3 w-40 bg-white border border-gray-100 rounded-[3px] shadow-lg py-1.5 z-50">
              <div className="px-4 py-2 text-sm font-bold text-gray-800 hover:bg-gray-50 cursor-pointer">English (US)</div>
              <div className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer">Spanish</div>
              <div className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer">French</div>
              <div className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer">Hindi</div>
            </div>
          )}
        </div>
        
        {/* Notifications */}
        <div className="relative">
          <div 
            onClick={() => toggleMenu('notif')}
            className={`relative cursor-pointer transition-colors ${notifOpen ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'}`}
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </div>

          {notifOpen && (
            <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-100 rounded-[3px] shadow-lg z-50 overflow-hidden flex flex-col">
              <div className="px-4 py-3 bg-[#f8f9fa] border-b border-gray-100 flex justify-between items-center">
                <span className="font-bold text-[13px] text-gray-800">Notifications</span>
                <span className="text-[11px] text-orange-500 hover:underline cursor-pointer font-bold">Mark all read</span>
              </div>
              <div className="max-h-64 overflow-y-auto">
                 <div className="px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer">
                    <div className="text-[13px] font-bold text-gray-800 mb-0.5">New payment received</div>
                    <div className="text-[12px] text-gray-500 line-clamp-1">Received ₹50,000 from SUDHAKAR branch...</div>
                    <div className="text-[10px] text-gray-400 mt-1">2 mins ago</div>
                 </div>
                 <div className="px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer">
                    <div className="text-[13px] font-bold text-gray-800 mb-0.5">System Update</div>
                    <div className="text-[12px] text-gray-500 line-clamp-1">Module engagement audit completed.</div>
                    <div className="text-[10px] text-gray-400 mt-1">1 hr ago</div>
                 </div>
              </div>
              <div className="px-4 py-2 text-center border-t border-gray-100 text-[12px] text-orange-500 font-bold hover:bg-gray-50 cursor-pointer transition-colors">
                View All Notifications
              </div>
            </div>
          )}
        </div>
        
        {/* Profile */}
        <div className="relative">
          <div 
            onClick={() => toggleMenu('profile')}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className={`w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-xs shadow-sm transition-all ${profileOpen ? 'ring-2 ring-red-500/50' : 'hover:ring-2 hover:ring-red-500/50'}`}>
              BA
            </div>
          </div>

          {profileOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 rounded-[3px] shadow-lg py-1.5 z-50">
              <div className="px-4 py-3 border-b border-gray-50 mb-1">
                <div className="font-bold text-[14px] text-gray-900">Branch Admin</div>
                <div className="text-[12px] text-gray-500 truncate">admin@branch.com</div>
              </div>
              <Link to="/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-[13px] text-gray-700 hover:bg-gray-50 hover:text-orange-500 transition-colors">
                <User className="w-3.5 h-3.5" /> My Profile
              </Link>
              <div onClick={onLogout} className="flex items-center gap-2 px-4 py-2 text-[13px] text-gray-700 hover:bg-gray-50 hover:text-orange-500 transition-colors cursor-pointer">
                <LogOut className="w-3.5 h-3.5" /> Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out of the Branch Admin Portal.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#fd7e14',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, log out!'
    }).then((result) => {
      if (result.isConfirmed) {
        setIsAuthenticated(false);
        Swal.fire({
          icon: 'success',
          title: 'Logged out',
          text: 'Successfully logged out.',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });
      }
    });
  };

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <BrowserRouter>
      <div className="flex h-screen overflow-hidden bg-[#f4f7fa]">
        <Sidebar isOpen={sidebarOpen} setOpen={setSidebarOpen} onLogout={handleLogout} />
        
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
           <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        <div className="flex-1 flex flex-col overflow-hidden md:ml-[220px] transition-all">
          <Header setOpen={setSidebarOpen} onLogout={handleLogout} />
          
          <main className="flex-1 overflow-y-auto bg-white md:bg-[#f4f7fa]">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/branches" element={<Branches />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/reports/login-logs" element={<LoginLogs />} />
              <Route path="/reports/schools-usage" element={<SchoolsUsage />} />
              <Route path="/reports/fee-collections" element={<FeeCollections />} />
              <Route path="/reports/income-expense" element={<IncomeExpense />} />
              <Route path="/reports/attendance-trends" element={<AttendanceTrends />} />
              <Route path="/reports/engagement-audit" element={<EngagementAudit />} />
              <Route path="/reports/communications" element={<CommunicationsReport />} />
              <Route path="/*" element={<GenericPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
