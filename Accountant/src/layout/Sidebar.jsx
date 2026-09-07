import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Gauge, UserCircle2, HandCoins, Send, Users, 
  HandHeart, FileSearch, UserPlus, Layers, Tags, 
  ArrowDown, ArrowUp, Tag, Filter, LogOut, ChevronLeft
} from 'lucide-react';

const NavItem = ({ to, icon: Icon, label, iconColor, subItems, closeSidebar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isDropdown = subItems && subItems.length > 0;
  
  if (isDropdown) {
    return (
      <li>
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-between px-5 py-3 text-[14px] transition-colors duration-150 border-l-[3px] cursor-pointer ${isOpen ? 'bg-[#2a2e33] text-white border-[#f97316]' : 'text-[#b8c7ce] hover:text-white hover:bg-[#2a2e33] border-transparent'}`}
        >
          <div className="flex items-center gap-3">
            <Icon className={`w-5 h-5 ${iconColor}`} />
            <span>{label}</span>
          </div>
          <ChevronLeft className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? '-rotate-90' : ''}`} />
        </div>
        {isOpen && (
          <ul className="bg-[#2c3b41] py-2">
            {subItems.map((item, idx) => (
              <li key={idx}>
                <NavLink 
                  to={item.to} 
                  onClick={closeSidebar}
                  className={({isActive}) => `flex items-center gap-3 pl-12 py-2 text-[13px] transition-colors duration-150 ${isActive ? 'text-white' : 'text-[#8aa4af] hover:text-white'}`}
                >
                  <span className="text-[11px] opacity-70">»</span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li>
      <NavLink 
        to={to} 
        onClick={closeSidebar}
        className={({isActive}) => `flex items-center justify-between px-5 py-3 text-[14px] transition-colors duration-150 border-l-[3px] ${isActive ? 'bg-[#2a2e33] text-white font-medium border-[#f97316]' : 'text-[#b8c7ce] hover:text-white hover:bg-[#2a2e33] border-transparent'}`}
      >
        <div className="flex items-center gap-3">
          <Icon className={`w-5 h-5 ${iconColor}`} />
          <span>{label}</span>
        </div>
      </NavLink>
    </li>
  );
};

const Sidebar = ({ isOpen, setIsOpen }) => {
  const closeSidebar = () => {
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <aside className={`w-[230px] bg-[#222d32] text-[#b8c7ce] h-full border-r border-[#1a2226] flex flex-col font-sans overflow-y-auto custom-scrollbar flex-shrink-0 absolute lg:relative z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      {/* Brand Logo Area */}
      <div className="h-14 flex items-center gap-3 px-4 bg-[#367fa9] text-white shrink-0">
        <div className="w-8 h-8 rounded-full border-2 border-white/20 flex items-center justify-center overflow-hidden bg-transparent">
          <svg viewBox="0 0 100 100" className="w-[120%] h-[120%] opacity-90">
            <path d="M50 50 L10 50 A40 40 0 0 1 50 10 Z" fill="#f97316" />
            <path d="M50 50 L90 50 A40 40 0 0 1 50 90" fill="#4b5563" />
            <path d="M10 50 A40 40 0 0 1 90 50 A40 40 0 0 1 10 50" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="4,4" />
          </svg>
        </div>
        <span className="font-semibold text-lg tracking-wide">Y.U.G</span>
      </div>

      <div className="py-2">
        {/* Search */}
        <div className="px-3 mb-4 mt-2">
          <div className="flex items-center bg-[#374850] rounded overflow-hidden border border-transparent focus-within:border-gray-500">
            <input 
              type="text" 
              placeholder="Search Menu..." 
              className="w-full bg-transparent text-sm text-white placeholder-gray-400 px-3 py-2 focus:outline-none"
            />
            <button className="px-3 bg-transparent text-white hover:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 font-bold" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Categories */}
        <ul className="space-y-0 text-sm pb-10">
          <li className="px-4 py-2.5 text-[12px] font-bold text-[#4b646f] uppercase tracking-wider bg-[#1a2226]">Main Navigation</li>
          
          <NavItem closeSidebar={closeSidebar} to="/accounts/dashboard" icon={Gauge} iconColor="text-[#f39c12]" label="Dashboard" />
          <NavItem closeSidebar={closeSidebar} to="/profile" icon={UserCircle2} iconColor="text-[#dd4b39]" label="My Profile" />
          <NavItem closeSidebar={closeSidebar} to="/loans" icon={HandCoins} iconColor="text-[#605ca8]" label="My Loans & Advances" />
          <NavItem closeSidebar={closeSidebar} to="/leave" icon={Send} iconColor="text-[#00c0ef]" label="Apply Leave" />
          <NavItem closeSidebar={closeSidebar} to="/students" icon={Users} iconColor="text-[#f39c12]" label="Student List" />
          
          <li className="px-4 py-2.5 text-[12px] font-bold text-[#4b646f] uppercase tracking-wider bg-[#1a2226] mt-1">Fees</li>
          
          <NavItem closeSidebar={closeSidebar} to="/fees/collect" icon={HandHeart} iconColor="text-[#00a65a]" label="Collect Fees" />
          <NavItem closeSidebar={closeSidebar} to="/fees/due" icon={FileSearch} iconColor="text-[#d81b60]" label="Search Due Fees" />
          <NavItem closeSidebar={closeSidebar} to="/fees/assign" icon={UserPlus} iconColor="text-[#3c8dbc]" label="Assign Fees" />
          <NavItem closeSidebar={closeSidebar} to="/fees/groups" icon={Layers} iconColor="text-[#00a65a]" label="Fee Groups" />
          <NavItem closeSidebar={closeSidebar} to="/fees/types" icon={Tags} iconColor="text-[#f39c12]" label="Fee Types" />

          <li className="px-4 py-2.5 text-[12px] font-bold text-[#4b646f] uppercase tracking-wider bg-[#1a2226] mt-1">Accounts Management</li>
          
          <NavItem closeSidebar={closeSidebar} to="/accounts/income" icon={ArrowDown} iconColor="text-[#605ca8]" label="Income" />
          <NavItem closeSidebar={closeSidebar} to="/accounts/expense" icon={ArrowUp} iconColor="text-[#00c0ef]" label="Expense" />
          <NavItem closeSidebar={closeSidebar} to="/accounts/income-heads" icon={Tag} iconColor="text-[#f39c12]" label="Income Heads" />
          <NavItem closeSidebar={closeSidebar} to="/accounts/expense-heads" icon={Tag} iconColor="text-[#e83e8c]" label="Expense Heads" />
          <NavItem 
            closeSidebar={closeSidebar}
            icon={Filter} 
            iconColor="text-[#00a65a]" 
            label="Lead Management" 
            subItems={[
              { label: 'Lead Dashboard', to: '/leads/dashboard' },
              { label: 'Lead Pipeline Board', to: '/leads/pipeline' },
              { label: 'Lead Sources & Stages', to: '/leads/sources' }
            ]} 
          />

          <li className="px-4 py-2.5 text-[12px] font-bold text-[#4b646f] uppercase tracking-wider bg-[#1a2226] mt-1">Account</li>
          
          <NavItem closeSidebar={closeSidebar} to="/logout" icon={LogOut} iconColor="text-[#3c8dbc]" label="Logout" />
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
