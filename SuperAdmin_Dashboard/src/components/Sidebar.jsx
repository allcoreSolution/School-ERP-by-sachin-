import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Search, LayoutDashboard, User, Building2, Layers,
  Users, LayoutTemplate, BarChart3,
  Settings, FileText, LifeBuoy, Server,
  MonitorPlay, Rss, BookOpen, BrainCircuit, LayoutList,
  LogOut, ChevronDown, Sparkles, Zap, Bell, X, Puzzle, CreditCard, Wallet, Plug,
  Megaphone, Headset
} from 'lucide-react';

const navSections = [
  {
    label: 'PLATFORM',
    items: [
      { to: '/', icon: LayoutDashboard, label: 'Dashboard', color: '#fb923c', bg: 'rgba(251,146,60,0.15)' },
      { to: '/profile', icon: User, label: 'My Profile', color: '#f472b6', bg: 'rgba(244,114,182,0.15)' },
      { to: '/schools', icon: Building2, label: 'Schools', color: '#818cf8', bg: 'rgba(129,140,248,0.15)' },
      { to: '/plans', icon: Layers, label: 'Plans', color: '#2dd4bf', bg: 'rgba(45,212,191,0.15)' },
      { to: '/plan-addons', icon: Puzzle, label: 'Plan Add-ons', color: '#fb923c', bg: 'rgba(251,146,60,0.15)' },
      { to: '/team', icon: Users, label: 'Team', color: '#f472b6', bg: 'rgba(244,114,182,0.15)' },
      { to: '/payments', icon: CreditCard, label: 'Payments', color: '#4ade80', bg: 'rgba(74,222,128,0.15)' },
      { to: '/templates', icon: LayoutTemplate, label: 'Templates', color: '#c084fc', bg: 'rgba(192,132,252,0.15)' },
      {
        icon: BarChart3, label: 'Reports', color: '#60a5fa', bg: 'rgba(96,165,250,0.15)',
        children: [
          { to: '/reports/login-logs', label: 'Login Logs' },
          { to: '/reports/schools-usage', label: 'Schools Usage' },
          { to: '/reports/fee-collections', label: 'Fee Collections' },
          { to: '/reports/attendance-trends', label: 'Attendance Trends' },
          { to: '/reports/engagement-audit', label: 'Engagement Audit' },
          { to: '/reports/communications', label: 'Communications' }
        ]
      },
      {
        icon: Settings, label: 'Settings', color: '#4ade80', bg: 'rgba(74,222,128,0.15)',
        children: [
          { to: '/settings-center', label: 'Settings Center' },
          { to: '/settings-general', label: 'General' },
          { to: '/settings-menu', label: 'Menu Builder' },
          { to: '/settings-payments', label: 'Payments' },
          { to: '/settings-sms', label: 'SMS' },
          { to: '/settings-notifications', label: 'Notifications' },
          { to: '/settings-appearance', label: 'Appearance' },
          { to: '/settings-face-vectors', label: 'Face Vectors' }
        ]
      },
      {
        icon: Wallet, label: 'Comms Wallet', color: '#fbbf24', bg: 'rgba(251,191,36,0.15)',
        children: [
          { to: '/comms/wallets', label: 'Wallet Oversight' },
          { to: '/comms/rate-cards', label: 'Rate Cards' },
          { to: '/comms/meta-dlt', label: 'Meta / DLT Config' }
        ]
      },
      { to: '/api-docs', icon: Plug, label: 'API Docs', color: '#f87171', bg: 'rgba(248,113,113,0.15)' },
      { to: '/support', icon: Headset, label: 'Support Tickets', color: '#9333ea', bg: 'rgba(147,51,234,0.15)' },
      {
        icon: Server, label: 'Server & Health', color: '#06b6d4', bg: 'rgba(6,182,212,0.15)',
        children: [
          { to: '/server',           label: 'Server Health' },
          { to: '/storage-center',   label: 'Storage' },
          { to: '/backup-center',    label: 'Backups' },
          { to: '/software-updates', label: 'Software Updates' },
          { to: '/server-settings',  label: 'Server Settings' }
        ]
      }
    ]
  },
  {
    label: 'WEBSITE',
    items: [
      {
        icon: Megaphone, label: 'Landing Page', color: '#f472b6', bg: 'rgba(244,114,182,0.15)',
        children: [
          { to: '/landing-page/visual-builder', label: 'Visual Builder' },
          { to: '/landing-page/full-templates', label: 'Full Templates' },
          { to: '/website-pages', label: 'Pages' },
          { to: '/website-menu', label: 'Navigation & Footer' },
          { to: '/sitemap', label: 'Sitemap' },
          { to: '/landing-page/school-templates', label: 'School Site Templates' },
          { to: '/landing-page/preview', label: 'Preview Site' }
        ]
      }
    ]
  },
  {
    label: 'AI & CONTENT',
    items: [
      {
        icon: Rss, label: 'Blog', color: '#a855f7', bg: 'rgba(168,85,247,0.15)',
        children: [
          { to: '/blog/posts', label: 'Posts' },
          { to: '/blog/categories', label: 'Categories' }
        ]
      },
      {
        icon: BookOpen, label: 'Knowledge Base', color: '#3b82f6', bg: 'rgba(59,130,246,0.15)',
        children: [
          { to: '/knowledge-base/articles', label: 'Articles' },
          { to: '/knowledge-base/categories', label: 'Categories' }
        ]
      },
      {
        icon: BrainCircuit, label: 'AI Management', color: '#22c55e', bg: 'rgba(34,197,94,0.15)',
        children: [
          { to: '/ai-analytics', label: 'Analytics' },
          { to: '/settings-ai-mgmt', label: 'Configuration' }
        ]
      },
      { to: '/onboarding-templates', icon: LayoutList, label: 'Onboarding Templates', color: '#eab308', bg: 'rgba(234,179,8,0.15)' }
    ]
  },
  {
    label: 'ACCOUNT',
    items: []
  }
];

const NavItem = ({ item, onClose }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isChildActive = item.children?.some(c => location.pathname === c.to);

  if (item.children) {
    return (
      <li className="mb-0.5">
        <button
          onClick={() => setOpen(o => !o)}
          className={`w-full flex items-center justify-between px-3 py-2 -ml-3 relative transition-all duration-200 border-l-[3px] ` +
            (isChildActive ? 'text-white shadow-sm' : 'text-gray-300 hover:text-white hover:bg-white/5 border-transparent')
          }
          style={isChildActive ? { backgroundColor: item.bg, borderColor: item.color } : {}}
        >
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 flex items-center justify-center flex-shrink-0 relative z-10 pl-3">
              <item.icon className="w-4 h-4 pointer-events-none transition-colors" style={{ color: isChildActive ? item.color : 'inherit', filter: isChildActive ? `drop-shadow(0 0 6px ${item.color}80)` : 'none' }} />
            </div>
            <span className={`text-[13px] tracking-wide relative z-10 pl-1 ${isChildActive ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
          </div>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open || isChildActive ? 'rotate-180 text-white' : 'text-gray-400'}`} />
        </button>
        {(open || isChildActive) && (
          <ul className="mt-1 ml-4 pl-3 border-l border-white/10 space-y-0.5">
            {item.children.map((child, i) => (
              <li key={i}>
                <NavLink to={child.to} onClick={onClose}
                  className={({ isActive }) =>
                    `block px-3 py-2 border-l-[3px] text-xs transition-all duration-150 ` +
                    (isActive 
                      ? 'text-white font-bold border-white/50' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5 border-transparent font-medium')
                  }
                  style={({ isActive }) => isActive ? { backgroundColor: 'rgba(255,255,255,0.06)' } : {}}
                >
                  {child.label}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li className="mb-0.5">
      <NavLink to={item.to} end={item.to === '/'} onClick={onClose}
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2 -ml-3 relative transition-all duration-200 border-l-[3px] ` +
          (isActive 
            ? 'text-white shadow-sm' 
            : 'text-gray-300 hover:text-white hover:bg-white/5 border-transparent')
        }
        style={({ isActive }) => isActive ? { backgroundColor: item.bg, borderColor: item.color } : {}}
      >
        {({ isActive }) => (
          <>
            <div className="w-7 h-7 flex items-center justify-center flex-shrink-0 relative z-10 pl-3">
              <item.icon className="w-4 h-4 pointer-events-none transition-colors" style={{ color: isActive ? item.color : 'inherit', filter: isActive ? `drop-shadow(0 0 6px ${item.color}80)` : 'none' }} />
            </div>
            <span className={`text-[13px] tracking-wide relative z-10 pl-1 ${isActive ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
          </>
        )}
      </NavLink>
    </li>
  );
};

const Sidebar = ({ open, onClose }) => {
  const [search, setSearch] = useState('');
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const flatItems = navSections.flatMap(s => s.items).flatMap(item =>
    item.children
      ? item.children.map(c => ({ ...c, icon: item.icon, color: item.color, bg: item.bg }))
      : [item]
  );

  const filteredItems = search
    ? flatItems.filter(item => item.label?.toLowerCase().includes(search.toLowerCase()))
    : null;

  return (
    <aside
      className={`
        fixed left-0 top-0 h-screen w-64 z-30 flex flex-col overflow-hidden
        transition-transform duration-300 ease-in-out
        ${open ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 bg-[#353A40] border-r border-[#2a2e33]
      `}
    >
      {/* Top glow */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(251,146,60,0.5), transparent)' }} />

      {/* Logo */}
      <div className="h-16 flex items-center px-5 flex-shrink-0 border-b border-[#2a2e33]">
        <div className="relative mr-3 w-[38px] h-[38px] flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 100 100" className="w-[120%] h-[120%] object-contain drop-shadow-md">
            <path d="M50 50 L20 20 A40 40 0 0 1 50 10 Z" fill="#f97316" />
            <path d="M50 50 L90 50 A40 40 0 1 1 20 20" fill="none" stroke="#f97316" strokeWidth="2.5" />
            <path d="M50 50 L50 90" stroke="#f97316" strokeWidth="1" strokeDasharray="3,3" />
          </svg>
        </div>
        <div>
          <p className="text-white font-bold text-[19px] leading-tight mt-1">YIS</p>
          <p className="text-gray-400 text-[10px] font-medium tracking-wide">ERP Platform</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center gap-1 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded-none">
            <Sparkles className="w-2.5 h-2.5 text-orange-400" />
            <span className="text-[9px] font-bold text-orange-400">PRO</span>
          </div>
          {/* Close button — mobile only */}
          <button onClick={onClose} className="lg:hidden w-7 h-7 flex items-center justify-center rounded-none text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 py-3 flex-shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-gray-600" />
          <input
            type="text"
            placeholder="Search menu..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full text-[13px] font-medium text-gray-200 placeholder-gray-500 pl-8 pr-3 py-2.5 rounded-none border border-white/10 focus:outline-none focus:border-orange-500/50 transition-colors"
            style={{ background: 'rgba(255,255,255,0.04)' }}
          />
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 min-h-0 px-3 pb-3 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
        {filteredItems ? (
          <div className="mb-2">
            <p className="px-3 text-[10px] font-semibold text-gray-600 uppercase tracking-widest mb-2">Results</p>
            <ul className="space-y-0.5">
              {filteredItems.length > 0
                ? filteredItems.map((item, i) => item.to && <NavItem key={i} item={item} onClose={onClose} />)
                : <li className="px-3 py-2 text-xs text-gray-600">No results found</li>
              }
            </ul>
          </div>
        ) : (
          navSections.map((section, si) => (
            <div key={si} className="mb-5">
              <p className="px-3 text-[10px] font-semibold uppercase tracking-widest mb-2"
                style={{ color: 'rgba(148,163,184,0.4)' }}>
                {section.label}
              </p>
              {section.label.toUpperCase() === 'ACCOUNT' ? (
                <ul className="space-y-0.5">
                  <li>
                    <button onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-none text-gray-400 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200 group">
                      <div className="w-7 h-7 rounded-none flex items-center justify-center group-hover:bg-red-500/10 transition-colors">
                        <LogOut className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium">Logout</span>
                    </button>
                  </li>
                </ul>
              ) : (
                <ul className="space-y-0.5">
                  {section.items.map((item, i) => <NavItem key={i} item={item} onClose={onClose} />)}
                </ul>
              )}
            </div>
          ))
        )}
      </nav>

      {/* Bottom User Card */}
      <div className="px-3 pb-3 flex-shrink-0">
        <div className="border border-white/5 rounded-none p-3 flex items-center gap-3 cursor-pointer hover:bg-white/5 transition-colors"
          style={{ background: 'rgba(255,255,255,0.03)' }}
          onClick={() => { window.location.href = '/profile'; onClose(); }}>
          <div className="w-8 h-8 rounded-none flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}>
            SA
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-semibold truncate">Super Admin</p>
            <p className="text-gray-600 text-[10px] truncate">superadmin@erp.com</p>
          </div>
          <div className="w-2 h-2 rounded-none bg-green-400 flex-shrink-0" style={{ boxShadow: '0 0 6px rgba(74,222,128,0.6)' }} />
        </div>

        {/* Developer Credit */}
        <div className="mt-2 text-center">
          <p className="text-[9px] text-gray-600 font-medium">Developed by <span className="text-orange-400 font-bold">Sachin</span></p>
          <p className="text-[9px] text-gray-600">@ALLCORE SOLUTION</p>
        </div>
      </div>

      {/* Bottom glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(251,146,60,0.3), transparent)' }} />
    </aside>
  );
};

export default Sidebar;
