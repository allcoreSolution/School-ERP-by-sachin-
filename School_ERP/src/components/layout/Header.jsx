import { 
  Menu, 
  ChevronDown, 
  CalendarDays, 
  Globe, 
  Search, 
  Plus, 
  Bell, 
  Settings, 
  Palette,
  Grid,
  User,
  LogOut,
  Building,
  CheckCircle2,
  FileText,
  UserPlus,
  MessageSquare
} from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import DashboardDesignsModal from './DashboardDesignsModal';
import LanguageDropdown from './LanguageDropdown';
import AcademicYearDropdown from './AcademicYearDropdown';

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [isDesignsModalOpen, setIsDesignsModalOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const menuRef = useRef(null);

  const userStr = localStorage.getItem('user');
  let userData = null;
  if (userStr) {
    try {
      userData = JSON.parse(userStr);
    } catch(e) {}
  }
  
  const displayName = userData?.username || 'Admin User';
  const displayEmail = userData?.email || 'admin@schoolerp.com';
  const initials = displayName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'AU';
  const schoolName = userData?.tenant?.schoolName || 'Yug International';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white h-14 border-b flex items-center justify-between px-4 sticky top-0 z-50">
      {/* Left side */}
      <div className="flex items-center gap-2 sm:gap-4">
        <button onClick={toggleSidebar} className="p-2 hover:bg-gray-100 rounded text-gray-500 md:hidden">
          <Menu className="w-5 h-5" />
        </button>
        <button onClick={toggleSidebar} className="p-2 hover:bg-gray-100 rounded text-gray-500 hidden md:block">
          <Menu className="w-5 h-5" />
        </button>
        
        <div className="flex items-center gap-2 md:gap-6 border-l border-gray-200 pl-4">
          <span className="text-lg text-slate-700 tracking-wide font-semibold hidden sm:block">
            {schoolName}
          </span>
          
          <button 
            onClick={() => setIsDesignsModalOpen(true)}
            className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full text-xs text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors relative"
          >
            <Palette className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
            <span className="hidden md:inline">Command Center</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-70 hidden sm:block" />
            
            {/* The modal component */}
            <DashboardDesignsModal 
              isOpen={isDesignsModalOpen} 
              onClose={(e) => {
                if(e) e.stopPropagation();
                setIsDesignsModalOpen(false);
              }} 
            />
          </button>
        </div>
      </div>

      {/* Right side */}
      <div ref={menuRef} className="flex items-center gap-2 sm:gap-4">
        {/* Session & Language */}
        <div className="hidden lg:flex items-center gap-4 border-r pr-4 text-sm text-gray-600">
          <AcademicYearDropdown />
          
          <LanguageDropdown />
        </div>

        {/* Global Search Button */}
        <button className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors hidden sm:flex">
          <Search className="w-[18px] h-[18px]" />
        </button>

        {/* Action Icons */}
        <div ref={menuRef} className="flex items-center gap-1 sm:gap-1.5 mr-1 sm:mr-2">
          
          {/* Quick Add */}
          <div className="relative">
            <button 
              onClick={() => setActiveMenu(activeMenu === 'add' ? null : 'add')}
              className={`w-[34px] h-[34px] rounded-full flex items-center justify-center transition-colors relative group ${activeMenu === 'add' ? 'bg-orange-50 text-orange-600' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'}`}
            >
              <Plus className="w-[18px] h-[18px]" />
            </button>
            {activeMenu === 'add' && (
              <div className="absolute top-[calc(100%+8px)] right-0 w-48 bg-white border border-slate-100 rounded-xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.15)] ring-1 ring-slate-900/5 z-50 py-1.5 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-2 border-b border-slate-100/80 mb-1"><p className="text-xs font-bold text-slate-400 uppercase">Quick Add</p></div>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-orange-600"><UserPlus className="w-4 h-4"/> New Student</button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-orange-600"><FileText className="w-4 h-4"/> Collect Fees</button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-orange-600"><MessageSquare className="w-4 h-4"/> Send Notice</button>
              </div>
            )}
          </div>
          
          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setActiveMenu(activeMenu === 'notif' ? null : 'notif')}
              className={`w-[34px] h-[34px] rounded-full flex items-center justify-center transition-colors relative group ${activeMenu === 'notif' ? 'bg-orange-50 text-orange-600' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'}`}
            >
              <Bell className="w-[18px] h-[18px]" />
              <span className="absolute top-[8px] right-[8px] w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            {activeMenu === 'notif' && (
              <div className="absolute top-[calc(100%+8px)] right-0 w-64 bg-white border border-slate-100 rounded-xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.15)] ring-1 ring-slate-900/5 z-50 py-1.5 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-2 border-b border-slate-100/80 flex justify-between items-center"><p className="text-xs font-bold text-slate-400 uppercase">Notifications (2)</p><span className="text-[10px] text-orange-500 font-medium cursor-pointer">Mark all read</span></div>
                <div className="p-2 flex gap-3 hover:bg-slate-50 border-b border-slate-50 cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0"><CheckCircle2 className="w-4 h-4"/></div>
                  <div><p className="text-[13px] font-medium text-slate-700">Backup Completed</p><p className="text-[11px] text-slate-500">Database backup was successful</p></div>
                </div>
                <div className="p-2 flex gap-3 hover:bg-slate-50 cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0"><Building className="w-4 h-4"/></div>
                  <div><p className="text-[13px] font-medium text-slate-700">New Branch Added</p><p className="text-[11px] text-slate-500">South wing campus configured</p></div>
                </div>
              </div>
            )}
          </div>
          
          {/* Settings */}
          <div className="relative">
            <button 
              onClick={() => setActiveMenu(activeMenu === 'settings' ? null : 'settings')}
              className={`w-[34px] h-[34px] rounded-full flex items-center justify-center transition-all group ${activeMenu === 'settings' ? 'bg-blue-100 text-blue-700' : 'text-blue-500 bg-blue-50 hover:bg-blue-100 hover:text-blue-700'}`}
            >
              <Settings className={`w-[18px] h-[18px] transition-transform duration-300 ${activeMenu === 'settings' ? 'rotate-90' : 'group-hover:rotate-90'}`} />
            </button>
            {activeMenu === 'settings' && (
              <div className="absolute top-[calc(100%+8px)] right-0 w-48 bg-white border border-slate-100 rounded-xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.15)] ring-1 ring-slate-900/5 z-50 p-2 animate-in fade-in slide-in-from-top-2">
                <button className="w-full flex items-center gap-2 px-2 py-2 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg"><Settings className="w-4 h-4"/> System Settings</button>
                <button className="w-full flex items-center gap-2 px-2 py-2 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg"><User className="w-4 h-4"/> Role Manager</button>
              </div>
            )}
          </div>
          
          {/* Apps / Modules Grid */}
          <Link to="/erp-navigator" className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors hidden sm:flex">
            <Grid className="w-[18px] h-[18px]" />
          </Link>
        </div>

        {/* User Profile */}
        <div className="relative group">
          <div 
            onClick={() => setActiveMenu(activeMenu === 'profile' ? null : 'profile')}
            className={`flex items-center gap-2 pl-2 border-l border-slate-200 cursor-pointer p-1 pr-2 rounded-full transition-colors ${activeMenu === 'profile' ? 'bg-slate-100' : 'hover:bg-slate-50'}`}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-orange-400 flex items-center justify-center text-white font-bold text-xs ring-2 ring-white shadow-sm transition-shadow">
              {initials}
            </div>
            <ChevronDown className={`w-3 h-3 transition-colors ${activeMenu === 'profile' ? 'text-slate-700 rotate-180' : 'text-slate-400'}`} />
          </div>
          {activeMenu === 'profile' && (
            <div className="absolute top-[calc(100%+8px)] right-0 w-52 bg-white border border-slate-100 rounded-xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.15)] ring-1 ring-slate-900/5 z-50 py-2 animate-in fade-in slide-in-from-top-2">
              <div className="px-4 py-2 border-b border-slate-100/80 mb-1 truncate">
                <p className="text-sm font-bold text-slate-800 truncate">{displayName}</p>
                <p className="text-[11px] text-slate-500 truncate">{displayEmail}</p>
              </div>
              <button 
                onMouseDown={(e) => { e.preventDefault(); setActiveMenu(null); navigate('/profile'); }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
              >
                <User className="w-4 h-4"/> My Profile
              </button>
              <button onMouseDown={(e) => {
                e.preventDefault();
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/login';
              }} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 hover:text-rose-700">
                <LogOut className="w-4 h-4"/> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
