import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, UserCog, Calendar, LayoutGrid, ClipboardCheck,
  GraduationCap, Handshake, Monitor, PenLine, BookMarked,
  Wallet, RefreshCcw, Megaphone, MessageCircle, Phone, Mail,
  Bus, BookOpen, Building2, HeartPulse, FolderOpen, Image,
  CalendarCheck, Bot, LogOut, Search, Globe, Grid3X3, ChevronDown,
  ChevronLeft, ChevronRight, Menu, Target, FileWarning
} from 'lucide-react';

const children = [
  { id: 1, name: 'Kabir Singh',   class: 'Class V (A)',   avatar: 'K' },
  { id: 2, name: 'Shlok Verma',  class: 'Class III (B)', avatar: 'S' },
  { id: 3, name: 'Rajesh Singh', class: 'Class II (A)',  avatar: 'R' },
];

// Each item: label, icon, iconBg (colored box), route, sub (show arrow)
const navSections = [
  { title: 'PORTAL NAVIGATION', items: [
    { label: 'Dashboard',     icon: LayoutDashboard, iconBg: 'bg-yellow-500', route: '/dashboard'  },
    { label: 'My Profile',    icon: UserCog,         iconBg: 'bg-purple-500', route: '/my-profile' },
  ]},
  { title: 'ACADEMICS', items: [
    { label: 'Calendar',        icon: Calendar,      iconBg: 'bg-orange-500', route: '/calendar'       },
    { label: 'Timetable',       icon: LayoutGrid,    iconBg: 'bg-pink-500',   route: '/timetable'      },
    { label: 'Attendance',      icon: ClipboardCheck,iconBg: 'bg-green-500',  route: '/attendance'     },
    { label: 'Exams & Reports', icon: GraduationCap, iconBg: 'bg-purple-500', route: '/exams'          },
    { label: 'Coaching',        icon: Target,        iconBg: 'bg-indigo-500', route: '/coaching'       },
    { label: 'Meetings',        icon: Handshake,     iconBg: 'bg-blue-400',   route: '/meetings'       },
    { label: 'Online Exams',    icon: Monitor,       iconBg: 'bg-teal-500',   route: '/online-exams'   },
    { label: 'Homework',        icon: PenLine,       iconBg: 'bg-yellow-500', route: '/homework'       },
    { label: 'Study Center',    icon: BookMarked,    iconBg: 'bg-red-500',    subItems: [
       { label: 'Classwork & Logbook', route: '/classwork' },
       { label: 'Syllabus & Materials', route: '/study-center' },
       { label: 'Live Classes', route: '/live-classes' }
    ]},
  ]},
  { title: 'FINANCIALS', items: [
    { label: 'Fee Payments', icon: Wallet,      iconBg: 'bg-cyan-500',   route: '/fee-payments' },
    { label: 'Transactions', icon: RefreshCcw,  iconBg: 'bg-orange-400', route: '/transactions'  },
  ]},
  { title: 'COMMUNICATIONS', items: [
    { label: 'Notice Board', icon: Megaphone,      iconBg: 'bg-green-500',  route: '/notice-board' },
    { label: 'SMS',          icon: MessageCircle,  iconBg: 'bg-purple-500', route: '/sms'          },
    { label: 'WhatsApp',     icon: Phone,          iconBg: 'bg-blue-500',   route: '/whatsapp'     },
    { label: 'Email',        icon: Mail,           iconBg: 'bg-green-600',  route: '/email'        },
  ]},
  { title: 'SERVICES & RESOURCES', items: [
    { label: 'Transport',       icon: Bus,          iconBg: 'bg-red-500',    route: '/transport'      },
    { label: 'Library',         icon: BookOpen,     iconBg: 'bg-purple-600', route: '/library'        },
    { label: 'Hostel',          icon: Building2,    iconBg: 'bg-teal-500',   route: '/hostel'         },
    { label: 'Health Records',  icon: HeartPulse,   iconBg: 'bg-orange-500', route: '/health-records' },
    { label: 'Documents',       icon: FolderOpen,   iconBg: 'bg-pink-500',   route: '/documents'      },
    { label: 'Gallery',         icon: Image,        iconBg: 'bg-green-500',  route: '/gallery'        },
    { label: 'School Visit',    icon: CalendarCheck,iconBg: 'bg-purple-400', route: '/school-visit'   },
    { label: 'Leave Apply',     icon: FileWarning,  iconBg: 'bg-yellow-500', route: '/leave-management' },
  ]},
  { title: 'HELP & SUPPORT', items: [
    { label: 'AI Assistant', icon: Bot, iconBg: 'bg-green-500', route: '/ai-assistant' },
  ]},
];

function NavItem({ item, active, navigate, location }) {
  const [open, setOpen] = useState(false);
  const Icon = item.icon;

  if (item.subItems) {
    const isChildActive = item.subItems.some(sub => location.pathname === sub.route);
    return (
      <div className="flex flex-col w-full">
        <button
          onClick={() => setOpen(!open)}
          className={`w-full flex items-center gap-3 pr-3 py-2 rounded-none mx-1 transition-all text-left group
            ${(active || isChildActive)
              ? 'bg-white/5 border-l-[3px] border-orange-400 pl-2.5'
              : 'hover:bg-white/5 border-l-[3px] border-transparent pl-2.5'}`}
          style={{ width: 'calc(100% - 8px)' }}
        >
          <div className={`w-7 h-7 ${item.iconBg} rounded-none flex items-center justify-center flex-shrink-0 shadow-sm`}>
            <Icon className="w-3.5 h-3.5 text-white" strokeWidth={2.2} />
          </div>
          <span className={`flex-1 text-[12.5px] font-medium truncate ${(active || isChildActive) ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
            {item.label}
          </span>
          <ChevronDown className={`w-3 h-3 text-gray-500 flex-shrink-0 transition-transform ${open || isChildActive ? 'rotate-180' : ''}`} />
        </button>
        {(open || isChildActive) && (
          <div className="flex flex-col ml-[42px] mt-1 space-y-1 relative mb-2">
            <div className="absolute left-[-16px] top-0 bottom-4 w-[1px] bg-white/10" />
            
            {item.subItems.map(subItem => (
              <div key={subItem.route} className="relative flex items-center">
                <div className="w-3 h-[1px] bg-white/10 absolute left-[-16px]" />
                <button
                  onClick={() => navigate(subItem.route)}
                  className={`w-full text-left flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-none transition-all text-[11.5px]
                    ${location.pathname === subItem.route ? 'text-gray-100 font-medium' : 'text-gray-400 hover:text-white'}`}
                >
                  <span className="text-[10px] opacity-70">»</span>
                  {subItem.label}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() => navigate(item.route)}
      className={`w-full flex items-center gap-3 pr-3 py-2 rounded-none mx-1 transition-all text-left group
        ${active
          ? 'bg-white/10 border-l-[3px] border-orange-400 pl-2.5'
          : 'hover:bg-white/5 border-l-[3px] border-transparent pl-2.5'}`}
      style={{ width: 'calc(100% - 8px)' }}
    >
      <div className={`w-7 h-7 ${item.iconBg} rounded-none flex items-center justify-center flex-shrink-0 shadow-sm`}>
        <Icon className="w-3.5 h-3.5 text-white" strokeWidth={2.2} />
      </div>
      <span className={`flex-1 text-[12.5px] font-medium truncate ${active ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
        {item.label}
      </span>
    </button>
  );
}

export default function Layout({ children: pageContent, activeChild, setActiveChild }) {
  const navigate   = useNavigate();
  const location   = useLocation();
  const [sideOpen, setSideOpen]   = useState(true);
  const [childOpen, setChildOpen] = useState(true);
  const [topChildOpen, setTopChildOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);

  const current = children.find(c => c.id === activeChild) || children[2];

  return (
    <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">

      {/* ── SIDEBAR ─────────────────────────────────────── */}
      <aside className={`${sideOpen ? 'w-60' : 'w-0'} transition-all duration-300 overflow-hidden flex-shrink-0 flex flex-col bg-[#353A40] border-r border-[#2a2e33]`}>

        {/* Logo */}
        <div className="flex items-center gap-2.5 px-[17px] py-3.5 flex-shrink-0 border-b border-[#2a2e33]">
          <div className="w-8 h-8 rounded-none flex-shrink-0 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
              <span className="text-white font-black text-[10px]">YJG</span>
            </div>
          </div>
          <span className="font-bold text-white text-sm truncate">Y.U.G</span>
        </div>

        {/* Search */}
        <div className="px-3 py-2.5 flex-shrink-0 border-b border-[#2a2e33]">
          <div className="flex items-center gap-2 bg-[#2a2e33] rounded-none px-3 py-2 border border-white/5 mx-1" style={{ width: 'calc(100% - 8px)' }}>
            <Search className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <input
              className="bg-transparent text-[12px] text-gray-300 outline-none flex-1 w-0 placeholder-gray-500"
              placeholder="Search Menu..."
            />
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-2 space-y-0.5"
          style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}>

          {/* PORTAL NAVIGATION — special: Dashboard, then Viewing dropdown, then My Profile */}
          <p className="px-4 pt-3 pb-1.5 text-[9.5px] font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.28)' }}>
            PORTAL NAVIGATION
          </p>

          {/* Dashboard */}
          <NavItem
            item={{ label: 'Dashboard', icon: LayoutDashboard, iconBg: 'bg-yellow-500', route: '/dashboard' }}
            active={location.pathname === '/dashboard'}
            navigate={navigate}
            location={location}
          />

          {/* Viewing: child dropdown */}
          <div className="flex flex-col w-full">
            <button
              onClick={() => setChildOpen(!childOpen)}
              className={`w-full flex items-center gap-3 pr-3 py-2 rounded-none mx-1 transition-all text-left group
                ${childOpen ? 'bg-white/10 border-l-[3px] border-white/20 pl-2.5' : 'hover:bg-white/5 border-l-[3px] border-transparent pl-2.5'}`}
              style={{ width: 'calc(100% - 8px)' }}
            >
              <div className="w-7 h-7 bg-pink-500 rounded-none flex items-center justify-center flex-shrink-0 shadow-sm">
                <Users className="w-3.5 h-3.5 text-white" strokeWidth={2.2} />
              </div>
              <span className="flex-1 text-[12.5px] font-medium text-gray-200 truncate">
                Viewing: {current.name.split(' ')[0]}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-gray-400 flex-shrink-0 transition-transform ${childOpen ? 'rotate-180' : ''}`} />
            </button>

            {childOpen && (
              <div className="flex flex-col ml-[42px] mt-1 space-y-1 relative mb-2">
                <div className="absolute left-[-16px] top-0 bottom-4 w-[1px] bg-white/10" />
                {children.map(child => (
                  <div key={child.id} className="relative flex items-center">
                    <div className="w-3 h-[1px] bg-white/10 absolute left-[-16px]" />
                    <button
                      onClick={() => { setActiveChild(child.id); navigate('/dashboard'); }}
                      className={`w-full text-left flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-none transition-all text-[11.5px]
                        ${activeChild === child.id ? 'text-gray-100 font-medium' : 'text-gray-400 hover:text-white'}`}
                    >
                      <span className="text-[10px] opacity-70">»</span>
                      {child.name}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* My Profile */}
          <NavItem
            item={{ label: 'My Profile', icon: UserCog, iconBg: 'bg-purple-500', route: '/my-profile' }}
            active={location.pathname === '/my-profile'}
            navigate={navigate}
            location={location}
          />

          {/* Other Sections */}
          {navSections.slice(1).map(sec => (
            <div key={sec.title}>
              <p className="px-4 pt-4 pb-1.5 text-[9.5px] font-bold uppercase tracking-widest whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.28)' }}>
                {sec.title}
              </p>
              {sec.items.map(item => (
                <NavItem
                  key={item.route || item.label}
                  item={item}
                  active={location.pathname === item.route}
                  navigate={navigate}
                  location={location}
                />
              ))}
            </div>
          ))}

          {/* ACCOUNT */}
          <p className="px-4 pt-4 pb-1.5 text-[9.5px] font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.28)' }}>ACCOUNT</p>
          <button
            onClick={() => navigate('/logout')}
            className="w-full flex items-center gap-3 pr-3 py-2 rounded-none mx-1 hover:bg-white/5 transition-all text-left group border-l-[3px] border-transparent pl-2.5"
            style={{ width: 'calc(100% - 8px)' }}
          >
            <div className="w-7 h-7 bg-orange-500 rounded-none flex items-center justify-center flex-shrink-0 shadow-sm">
              <LogOut className="w-3.5 h-3.5 text-white" strokeWidth={2.2} />
            </div>
            <span className="text-[12.5px] font-medium text-gray-300 group-hover:text-white">Logout</span>
          </button>
          
          <div className="mt-8 mb-4 px-4 text-center">
            <p className="text-[9px] font-black uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.15)' }}>
              Developed by Sachin<br/>@All Core Solution
            </p>
          </div>
          
        </nav>
      </aside>

      {/* ── MAIN ─────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 px-4 py-2.5 flex items-center justify-between flex-shrink-0">
          <button onClick={() => setSideOpen(!sideOpen)} className="p-1.5 rounded-none hover:bg-gray-100 text-gray-600 transition-colors">
            <Menu className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-3">
            
            {/* Active Student Pill Dropdown */}
            <div className="relative hidden sm:block">
              <div 
                onClick={() => { setTopChildOpen(!topChildOpen); setLangOpen(false); setAvatarOpen(false); }}
                className="flex items-center gap-2 px-3 py-1 bg-purple-50 border border-purple-200 rounded-none shadow-sm cursor-pointer hover:bg-purple-100 transition-colors"
              >
                <div className="w-5 h-5 rounded-none bg-purple-500 text-white flex items-center justify-center text-[10px] font-black shadow-inner">
                  {current.avatar}
                </div>
                <span className="text-[11px] uppercase tracking-wider font-extrabold text-purple-700">{current.name}</span>
                <span className="text-[10px] uppercase font-bold text-purple-400 opacity-70 border-l border-purple-300 pl-1.5 ml-1">• {current.class}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-purple-600 transition-transform ml-1 ${topChildOpen ? 'rotate-180' : ''}`} />
              </div>
              
              {topChildOpen && (
                <div className="absolute top-full mt-2 w-full right-0 bg-white border border-gray-200 shadow-md rounded-none z-50 flex flex-col">
                  {children.map(child => (
                    <button
                      key={child.id}
                      onClick={() => { setActiveChild(child.id); setTopChildOpen(false); navigate('/dashboard'); }}
                      className={`text-left px-3 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2 ${
                        activeChild === child.id ? 'bg-purple-50 text-purple-700 border-l-[3px] border-purple-500' : 'text-gray-600 hover:bg-gray-50 border-l-[3px] border-transparent'
                      }`}
                    >
                      <div className="w-4 h-4 bg-purple-500 text-white flex items-center justify-center text-[9px] shadow-sm">{child.avatar}</div>
                      {child.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Language Selector Dropdown */}
            <div className="relative">
              <div 
                onClick={() => { setLangOpen(!langOpen); setTopChildOpen(false); setAvatarOpen(false); }}
                className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-gray-600 border border-gray-200 rounded-none px-2.5 py-1.5 cursor-pointer hover:bg-gray-50 shadow-sm transition-colors select-none"
              >
                <Globe className="w-3.5 h-3.5" />
                English
                <ChevronDown className={`w-3 h-3 text-gray-400 opacity-80 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </div>

              {langOpen && (
                <div className="absolute top-full mt-2 right-0 w-32 bg-white border border-gray-200 shadow-md rounded-none z-50 flex flex-col">
                   <button className="px-3 py-2 text-left text-[10px] font-extrabold uppercase tracking-widest text-gray-800 bg-gray-50 border-l-[3px] border-gray-400">English</button>
                   <button onClick={() => setLangOpen(false)} className="px-3 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:bg-gray-50 border-l-[3px] border-transparent transition-colors">Hindi</button>
                   <button onClick={() => setLangOpen(false)} className="px-3 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:bg-gray-50 border-l-[3px] border-transparent transition-colors">Spanish</button>
                </div>
              )}
            </div>
            
            {/* Grid Apps Button */}
            <button className="p-1.5 rounded-none border border-transparent hover:border-gray-200 hover:bg-gray-50 transition-colors cursor-help group relative">
              <Grid3X3 className="w-4 h-4 text-gray-600" />
              <div className="absolute top-full right-0 mt-2 bg-gray-900 border border-black text-white text-[9px] font-black px-2.5 py-1.5 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-md">
                Application Menu
              </div>
            </button>
            
            {/* Profile Avatar Click Menu */}
            <div className="relative inline-block z-40">
              <div
                className={`w-8 h-8 rounded-none border border-orange-300 bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-black text-[13px] shadow-sm transition-transform cursor-pointer hover:scale-105 ${avatarOpen ? 'ring-2 ring-orange-300' : ''}`}
                onClick={() => { setAvatarOpen(!avatarOpen); setLangOpen(false); setTopChildOpen(false); }}
              >
                P
              </div>
              
              {avatarOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 shadow-xl rounded-none z-50 flex flex-col">
                   <div className="p-3 border-b border-gray-100 bg-orange-50/50">
                      <p className="text-[12px] font-black text-gray-800 leading-tight uppercase tracking-wide">Parent Account</p>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">parent@portal.edu</p>
                   </div>
                   <button onClick={() => { setAvatarOpen(false); navigate('/my-profile'); }} className="px-3 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:bg-orange-50 hover:text-orange-700 flex items-center gap-2 border-l-[3px] border-transparent hover:border-orange-400 transition-all"><UserCog className="w-3.5 h-3.5" /> Profile Settings</button>
                   <button onClick={() => { setAvatarOpen(false); navigate('/logout'); }} className="px-3 py-2 text-left text-[10px] font-bold uppercase tracking-widest text-red-600 hover:bg-red-50 flex items-center gap-2 border-l-[3px] border-transparent hover:border-red-400 transition-all"><LogOut className="w-3.5 h-3.5" /> Logout</button>
                </div>
              )}
            </div>
            
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {pageContent}
        </main>
      </div>
    </div>
  );
}
