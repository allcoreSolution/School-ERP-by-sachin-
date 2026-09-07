import React, { useState, useRef, useEffect } from 'react';
import { Menu, Settings, Globe, Bell, Search, ChevronDown, Sparkles, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const allPages = [
  { label: 'Schools', path: '/schools' },
  { label: 'Dashboard', path: '/' },
  { label: 'Plans', path: '/plans' },
  { label: 'Payments', path: '/payments' },
  { label: 'Reports', path: '/reports' },
  { label: 'Team', path: '/team' },
  { label: 'Support', path: '/support' },
  { label: 'Settings', path: '/settings' },
  { label: 'Server Health', path: '/server' },
  { label: 'Blog', path: '/blog' },
  { label: 'Landing Page', path: '/landing-page' },
  { label: 'AI Analytics', path: '/ai-analytics' },
  { label: 'Backup Center', path: '/backup-center' },
  { label: 'Storage Center', path: '/storage-center' },
  { label: 'Cron Monitor', path: '/cron-monitor' },
  { label: 'API Docs', path: '/api-docs' },
  { label: 'Profile', path: '/profile' },
];

const Header = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showNotif, setShowNotif] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);

  const searchResults = searchQuery.trim().length > 0
    ? allPages.filter(p => p.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearch(true);
        setTimeout(() => searchRef.current?.focus(), 50);
      }
      if (e.key === 'Escape') { setShowSearch(false); setSearchQuery(''); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleSelect = (path) => {
    navigate(path);
    setShowSearch(false);
    setSearchQuery('');
  };

  const notifications = [
    { title: 'New school registered', desc: 'Ali Public School joined', time: '5 min ago', dot: 'bg-blue-400' },
    { title: 'Payment received', desc: '₹4,999 from Montessori School', time: '1 hour ago', dot: 'bg-green-400' },
    { title: 'Server CPU alert', desc: 'CPU usage at 78%', time: '2 hours ago', dot: 'bg-red-400' },
  ];

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-6 fixed top-0 right-0 left-0 lg:left-64 z-10 shadow-sm">

      {/* Left */}
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="w-8 h-8 flex items-center justify-center rounded-none hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
          <Menu className="w-4 h-4" />
        </button>

        {/* Search bar */}
        <div
          onClick={() => { setShowSearch(true); setTimeout(() => searchRef.current?.focus(), 50); }}
          className="hidden md:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-none px-3 py-2 w-64 cursor-pointer hover:border-orange-300 transition-colors group">
          <Search className="w-3.5 h-3.5 text-gray-400 group-hover:text-orange-400 transition-colors" />
          <span className="text-xs text-gray-400">Quick search...</span>
          <div className="ml-auto flex items-center gap-1">
            <kbd className="text-[9px] bg-gray-200 text-gray-500 px-1.5 py-0.5 rounded-none font-mono">⌘K</kbd>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      {showSearch && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center pt-24" onClick={() => { setShowSearch(false); setSearchQuery(''); }}>
          <div className="bg-white rounded-none shadow-2xl w-full max-w-md mx-4 overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
              <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search pages..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && searchResults.length > 0) handleSelect(searchResults[0].path); }}
                className="flex-1 text-sm outline-none text-gray-800 placeholder-gray-400"
                autoFocus
              />
              <button onClick={() => { setShowSearch(false); setSearchQuery(''); }} className="p-1 hover:bg-gray-100 rounded-none">
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            {searchResults.length > 0 ? (
              <ul className="py-2 max-h-64 overflow-y-auto">
                {searchResults.map((r, i) => (
                  <li key={i}>
                    <button onClick={() => handleSelect(r.path)}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 flex items-center gap-3 transition-colors">
                      <Search className="w-3.5 h-3.5 text-gray-400" />
                      {r.label}
                    </button>
                  </li>
                ))}
              </ul>
            ) : searchQuery.trim() ? (
              <div className="px-4 py-6 text-center text-sm text-gray-400">No pages found for "{searchQuery}"</div>
            ) : (
              <div className="px-4 py-3">
                <p className="text-[10px] font-semibold text-gray-400 uppercase mb-2">Quick Links</p>
                <div className="flex flex-wrap gap-2">
                  {allPages.slice(0, 6).map((p, i) => (
                    <button key={i} onClick={() => handleSelect(p.path)}
                      className="text-xs bg-gray-100 hover:bg-orange-100 hover:text-orange-600 text-gray-600 px-3 py-1 rounded-none transition-colors">
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Right */}
      <div className="flex items-center gap-2">

        {/* Language */}
        <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-none text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors text-xs font-medium">
          <Globe className="w-3.5 h-3.5" />
          <span>EN</span>
          <ChevronDown className="w-3 h-3" />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotif(s => !s)}
            className="relative w-9 h-9 flex items-center justify-center rounded-none hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-none border-2 border-white" />
          </button>

          {showNotif && (
            <div className="absolute right-0 top-11 w-80 bg-white rounded-none shadow-2xl border border-gray-100 overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <p className="text-sm font-bold text-gray-800">Notifications</p>
                <span className="text-[10px] bg-red-50 text-red-500 font-bold px-2 py-0.5 rounded-none">3 new</span>
              </div>
              <div className="divide-y divide-gray-50">
                {notifications.map((n, i) => (
                  <div key={i} className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-none mt-1.5 flex-shrink-0 ${n.dot}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-800">{n.title}</p>
                      <p className="text-xs text-gray-500 truncate">{n.desc}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2.5 border-t border-gray-100 text-center">
                <button
                  onClick={() => { setShowNotif(false); navigate('/notifications'); }}
                  className="text-xs text-orange-500 font-semibold hover:text-orange-600">View all notifications</button>
              </div>
            </div>
          )}
        </div>

        {/* Settings */}
        <button
          onClick={() => navigate('/settings')}
          className="w-9 h-9 flex items-center justify-center rounded-none hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
          <Settings className="w-4 h-4" />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-200 mx-1" />

        {/* User */}
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-none hover:bg-gray-100 transition-colors group">
          <div className="w-8 h-8 rounded-none flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)', boxShadow: '0 2px 8px rgba(239,68,68,0.3)' }}>
            SA
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-gray-800 leading-tight">Super Admin</p>
            <div className="flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-orange-400" />
              <p className="text-[10px] text-orange-500 font-semibold">Platform Owner</p>
            </div>
          </div>
          <ChevronDown className="w-3 h-3 text-gray-400 hidden sm:block" />
        </button>
      </div>

      {/* Click outside to close notif */}
      {showNotif && <div className="fixed inset-0 z-40" onClick={() => setShowNotif(false)} />}
    </header>
  );
};

export default Header;
