import React, { useState } from 'react';
import { Menu, Search, Bell, Settings as SettingsIcon, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = ({ toggleSidebar }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="h-[55px] bg-white border-b border-gray-200 flex items-center justify-between px-3 sm:px-5 sticky top-0 z-50 shrink-0 font-sans relative">
      <div className="flex items-center gap-2 sm:gap-4">
        <button onClick={toggleSidebar} className="text-[#555] hover:text-[#3c8dbc] transition-colors focus:outline-none flex items-center justify-center p-1 sm:p-2">
          <Menu className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px]" />
        </button>
        <span className="text-[#3b4351] font-semibold tracking-wide text-[14px] sm:text-[16px] truncate max-w-[130px] sm:max-w-none">Yug International School</span>
      </div>
      
      {showSearch && (
        <div className="absolute inset-0 bg-white z-10 flex items-center px-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <Search className="w-5 h-5 text-gray-400 mr-2" />
          <input 
            autoFocus
            type="text" 
            placeholder="Search across modules..." 
            className="flex-1 bg-transparent text-[15px] outline-none text-[#333]" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={() => { setShowSearch(false); setSearchQuery(''); }} className="text-gray-400 hover:text-red-500 p-2">
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      <div className="flex items-center">
        {/* Search */}
        <button onClick={() => setShowSearch(true)} className="text-gray-500 hover:text-[#3c8dbc] transition-colors px-2 sm:px-3 py-2 flex items-center focus:outline-none">
          <Search className="w-[18px] h-[18px] sm:w-[19px] sm:h-[19px]" />
        </button>
        
        {/* Notifications */}
        <Link to="/notifications" className="relative px-2 sm:px-3 py-2 flex items-center cursor-pointer text-gray-500 hover:text-[#3c8dbc] transition-colors focus:outline-none">
          <Bell className="w-[18px] h-[18px] sm:w-[19px] sm:h-[19px]" />
          <span className="absolute top-[8px] right-[8px] sm:right-[10px] w-2 h-2 bg-[#ff4d4f] rounded-full border border-white"></span>
        </Link>
        
        {/* Vertical Divider */}
        <div className="hidden sm:block h-[22px] w-[1px] bg-gray-200 mx-1 sm:mx-2"></div>
        
        {/* Settings */}
        <Link to="/settings" className="hidden sm:flex text-gray-500 hover:text-[#3c8dbc] transition-colors px-2 sm:px-3 py-2 items-center focus:outline-none">
          <SettingsIcon className="w-[19px] h-[19px]" />
        </Link>
        
        {/* User Avatar */}
        <Link to="/profile" className="ml-1 sm:ml-3 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#f97316] hover:bg-[#ea580c] transition-colors text-white flex items-center justify-center font-bold text-[12px] sm:text-[14px] shadow-sm transform hover:scale-105 duration-200 focus:outline-none">
          AC
        </Link>
      </div>
    </header>
  );
};

export default Header;
