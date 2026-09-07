import React, { useState, useEffect } from 'react';
import { 
  Menu, Calendar, Globe, Search, Plus, Bell, Grid, Palette, 
  User, Settings, LogOut, Check, Users, FileText, ChevronDown, X 
} from 'lucide-react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [session, setSession] = useState('27-28');
  const [lang, setLang] = useState('English');
  const navigate = useNavigate();
  const { currentTheme, changeTheme, themes, currentLayout, changeLayout, layouts } = useTheme();

  useEffect(() => {
    const handleClickOutside = () => {
      // Don't close if activeMenu is commandCenter since it's a fullscreen modal
      if (activeMenu !== 'commandCenter') {
         setActiveMenu(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [activeMenu]);

  const toggle = (e, menuName) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  const showToast = (msg, icon = 'info') => {
    Swal.fire({
      title: msg,
      icon: icon,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
    });
  };

  return (
    <>
    <header className="h-[60px] bg-white border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 z-10 box-border theme-header">
      {/* Left items */}
      <div className="flex items-center gap-4">
        <button className="text-gray-500 hover:text-gray-700 transition-colors" onClick={() => showToast('Sidebar toggled')}>
          <Menu className="w-5 h-5" />
        </button>
        <span className="text-[15px] font-semibold text-gray-700 tracking-tight hidden sm:block theme-text">
          Yug International School
        </span>
        
        <button 
          onClick={(e) => toggle(e, 'commandCenter')}
          className="hidden md:flex flex-wrap items-center gap-1.5 px-3 py-1.5 border border-orange-200 bg-orange-50 rounded-none text-xs font-semibold text-orange-600 ml-4 hover:bg-orange-100 transition-colors"
        >
          <Palette className="w-3.5 h-3.5" />
          Command Center
          <span className="bg-orange-400 text-white text-[9px] px-1.5 py-0.5 rounded-none uppercase tracking-wider font-bold ml-1">Preview</span>
        </button>
      </div>
      
      {/* Right Items */}
      <div className="flex items-center gap-4 text-gray-500">
        
        {/* Session */}
        <div className="relative">
          <div onClick={(e) => toggle(e, 'session')} className="hidden lg:flex items-center gap-1.5 cursor-pointer hover:text-gray-700 px-2 py-1">
            <Calendar className="w-4 h-4" />
            <span className="text-[13px] font-medium theme-text">{session}</span>
          </div>
          {activeMenu === 'session' && (
            <div className="absolute right-0 lg:left-0 top-full mt-2 w-32 bg-white border border-gray-200 shadow-lg rounded-none py-1 z-50 theme-card">
              {['27-28', '26-27', '25-26'].map(s => (
                 <div key={s} onClick={() => { setSession(s); showToast(`Session changed to ${s}`, 'success'); }} className="px-4 py-2 text-xs hover:bg-gray-50 cursor-pointer flex items-center justify-between text-gray-700">
                   {s} {session === s && <Check className="w-3 h-3 text-green-500"/>}
                 </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Language */}
        <div className="relative">
          <div onClick={(e) => toggle(e, 'lang')} className="hidden lg:flex items-center gap-1.5 cursor-pointer hover:text-gray-700 px-2 py-1">
            <Globe className="w-4 h-4" />
            <span className="text-[13px] font-medium theme-text">{lang} <ChevronDown className="w-3 h-3 inline"/></span>
          </div>
          {activeMenu === 'lang' && (
            <div className="absolute right-0 lg:left-0 top-full mt-2 w-32 bg-white border border-gray-200 shadow-lg rounded-none py-1 z-50 theme-card">
              {['English', 'Hindi', 'Gujarati'].map(l => (
                 <div key={l} onClick={() => { setLang(l); showToast(`Language changed to ${l}`, 'success'); }} className="px-4 py-2 text-xs hover:bg-gray-50 cursor-pointer flex items-center justify-between text-gray-700">
                   {l} {lang === l && <Check className="w-3 h-3 text-green-500"/>}
                 </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Search */}
        <div className="relative flex items-center">
          <button onClick={(e) => toggle(e, 'search')} className="hover:text-gray-700 text-gray-500 transition-colors flex items-center justify-center p-1"><Search className="w-5 h-5" /></button>
          {activeMenu === 'search' && (
            <div onClick={(e) => e.stopPropagation()} className="absolute right-0 top-full mt-2 w-72 bg-white border border-gray-200 shadow-lg rounded-none z-50 theme-card">
               <div className="flex items-center px-3 py-2 border-b border-gray-100">
                  <Search className="w-4 h-4 text-gray-400 mr-2" />
                  <input type="text" placeholder="Search students, exams, modules..." autoFocus className="w-full text-sm outline-none bg-transparent py-1 theme-text" />
               </div>
               <div className="p-4 text-center">
                  <span className="text-xs text-gray-400">Type at least 3 characters to search anything in the ERP.</span>
               </div>
            </div>
          )}
        </div>
        
        {/* Quick Add */}
        <div className="relative flex items-center">
          <button onClick={(e) => toggle(e, 'add')} className="hover:text-gray-700 text-gray-500 transition-colors flex items-center justify-center p-1"><Plus className="w-5 h-5" /></button>
          {activeMenu === 'add' && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-none py-1 z-50 theme-card">
               <div className="px-3 py-1.5 border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Quick Actions</div>
               <div onClick={() => { navigate('/students'); setActiveMenu(null); }} className="px-4 py-2 text-xs hover:bg-gray-50 cursor-pointer flex items-center gap-2 text-gray-700"><Users className="w-3.5 h-3.5"/> Add Student</div>
               <div onClick={() => { navigate('/enter-marks'); setActiveMenu(null); }} className="px-4 py-2 text-xs hover:bg-gray-50 cursor-pointer flex items-center gap-2 text-gray-700"><FileText className="w-3.5 h-3.5"/> Enter Marks</div>
               <div onClick={() => showToast('Create Event module launched')} className="px-4 py-2 text-xs hover:bg-gray-50 cursor-pointer flex items-center gap-2 text-gray-700"><Calendar className="w-3.5 h-3.5"/> Create Event</div>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative flex items-center">
          <button onClick={(e) => toggle(e, 'notify')} className="relative hover:text-gray-700 text-gray-500 transition-colors flex items-center justify-center p-1">
            <Bell className="w-5 h-5" />
            <span className="absolute items-center justify-center flex top-0 right-0 w-[15px] h-[15px] bg-yellow-400 text-black text-[10px] font-bold rounded-none shadow-sm translate-x-1/4 -translate-y-1/4 pb-px">4</span>
          </button>
          {activeMenu === 'notify' && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 shadow-lg rounded-none py-1 z-50 theme-card">
               <div className="px-3 py-2 border-b border-gray-100 flex justify-between items-center">
                 <span className="text-xs font-bold text-gray-700">Notifications</span>
                 <span className="text-[10px] text-blue-500 cursor-pointer hover:underline">Mark all read</span>
               </div>
               <div className="max-h-60 overflow-y-auto">
                 <div className="px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer">
                   <p className="text-xs font-semibold text-gray-800">New Exam Schedule</p>
                   <p className="text-[10px] text-gray-500 mt-0.5">Online Exams for Class 10th begin tomorrow.</p>
                 </div>
                 <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                   <p className="text-xs font-semibold text-gray-800">Pending Approvals</p>
                   <p className="text-[10px] text-gray-500 mt-0.5">3 student leaves are awaiting your approval.</p>
                 </div>
               </div>
               <div className="px-3 py-2 border-t border-gray-100 text-center cursor-pointer hover:bg-gray-50">
                 <span className="text-xs text-indigo-600 font-semibold">View All</span>
               </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center">
           <button onClick={() => showToast('Apps Center Modal Available in Dashboard View')} className="hover:text-gray-700 text-gray-500 transition-colors flex items-center justify-center p-1"><Grid className="w-5 h-5" /></button>
        </div>
        
        {/* Profile */}
        <div className="relative flex items-center ml-2 border-l border-gray-200 pl-4">
          <div onClick={(e) => toggle(e, 'profile')} className="w-8 h-8 rounded-none bg-slate-300 overflow-hidden border border-slate-200 cursor-pointer active:scale-95 transition-transform theme-image-radius">
            <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full object-cover" />
          </div>
          {activeMenu === 'profile' && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-none py-1 z-50 theme-card">
               <div className="px-4 py-2 border-b border-gray-100">
                 <p className="text-xs font-bold text-gray-800">Amit Kumar</p>
                 <p className="text-[10px] text-gray-500">Teacher Account</p>
               </div>
               <div onClick={() => navigate('/profile')} className="px-4 py-2 flex items-center gap-2 text-xs text-gray-700 hover:bg-gray-50 cursor-pointer">
                 <User className="w-3.5 h-3.5" /> My Profile
               </div>
               <div onClick={() => showToast('Settings opened')} className="px-4 py-2 flex items-center gap-2 text-xs text-gray-700 hover:bg-gray-50 cursor-pointer">
                 <Settings className="w-3.5 h-3.5" /> Settings
               </div>
               <div className="border-t border-gray-100 mt-1"></div>
               <div onClick={() => {
                   localStorage.clear();
                   sessionStorage.clear();
                   window.location.href = 'http://localhost:5173/login';
               }} className="px-4 py-2 flex items-center gap-2 text-xs text-red-600 hover:bg-red-50 cursor-pointer font-medium">
                 <LogOut className="w-3.5 h-3.5" /> Sign out
               </div>
            </div>
          )}
        </div>
      </div>
    </header>

    {/* Command Center Modal */}
    {activeMenu === 'commandCenter' && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto" onClick={() => setActiveMenu(null)}>
        <div className="bg-[#f8f9fa] w-full max-w-5xl rounded-none shadow-2xl flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
           <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
             <div>
               <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2"><Palette className="w-6 h-6 text-orange-500"/> Command Center : Theme & Layout Engine</h2>
               <p className="text-sm text-gray-500 mt-1">Select from different aesthetic themes and structural layouts to instantly transform your ERP.</p>
             </div>
             <button onClick={() => setActiveMenu(null)} className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-none transition-colors border-none cursor-pointer">
               <X className="w-5 h-5"/>
             </button>
           </div>
           
           <div className="p-8 overflow-y-auto flex-1 space-y-10">
             
             {/* THEMES SECTION */}
             <div>
               <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Color Themes & Aesthetics</h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                  {themes.map((theme) => (
                     <div 
                       key={theme.id}
                       onClick={() => { changeTheme(theme.id); showToast(`${theme.name} Theme Applied!`, 'success'); }}
                       className={`cursor-pointer transition-all duration-200 flex flex-col group ${currentTheme === theme.id ? 'ring-4 ring-orange-500 scale-105 shadow-xl' : 'hover:scale-105 shadow-md hover:shadow-lg ring-1 ring-gray-200'}`}
                     >
                       {/* Visual Mockup representation of the theme */}
                       <div className={`h-24 w-full bg-gray-100 relative overflow-hidden flex ${
                          theme.id === 'theme-modern' ? 'rounded-t-2xl' : 
                          theme.id === 'theme-dark' ? 'rounded-t-xl bg-[#222]' : 
                          theme.id === 'theme-glass' ? 'bg-gradient-to-r from-blue-400 to-purple-500' : 
                          theme.id === 'theme-neo' ? 'border-b-4 border-black' : 
                          theme.id === 'theme-nature' ? 'bg-[#2E4F32]/10' :
                          theme.id === 'theme-ocean' ? 'bg-[#0D3B66]/10' : 
                          theme.id === 'theme-monochrome' ? 'bg-black/5' : ''
                       }`}>
                          <div className={`w-1/4 h-full border-r ${
                            theme.id === 'theme-dark' ? 'bg-[#111] border-gray-800' :
                            theme.id === 'theme-enterprise' ? 'bg-[#353A40] border-[#2a2e33]' :
                            theme.id === 'theme-modern' ? 'bg-white border-gray-100' :
                            theme.id === 'theme-glass' ? 'bg-white/20 backdrop-blur-sm border-white/20' :
                            theme.id === 'theme-nature' ? 'bg-[#2E4F32] border-[#203D23]' :
                            theme.id === 'theme-ocean' ? 'bg-[#0D3B66]' :
                            theme.id === 'theme-sunset' ? 'bg-[#7A2828]' :
                            theme.id === 'theme-monochrome' ? 'bg-black' : 'bg-white'
                          }`}></div>
                          <div className="flex-1 flex flex-col">
                             <div className={`h-8 border-b ${
                               theme.id === 'theme-dark' ? 'bg-[#1a1a1a] border-gray-800' : 
                               theme.id === 'theme-glass' ? 'bg-white/10 backdrop-blur-sm border-white/10' : 
                               theme.id === 'theme-neo' ? 'bg-white border-black border-b-2' : 
                               'bg-white border-gray-100'
                             }`}></div>
                             <div className={`flex-1 p-2 flex gap-2 ${
                               theme.id === 'theme-dark' ? 'bg-[#0a0a0a]' : 
                               theme.id === 'theme-nature' ? 'bg-[#F2F4EB]' :
                               theme.id === 'theme-ocean' ? 'bg-[#EBF4F6]' : 
                               theme.id === 'theme-sunset' ? 'bg-[#FFF0E6]' :
                               theme.id === 'theme-neo' ? 'bg-[#FFE873]' :
                               theme.id === 'theme-glass' ? 'bg-transparent' :
                               'bg-[#f4f7f6]'
                             }`}>
                                <div className={`w-full h-full bg-white opacity-60 ${
                                  theme.id === 'theme-modern' ? 'rounded-xl' :
                                  theme.id === 'theme-dark' ? 'rounded-lg bg-gray-800 border border-gray-700' :
                                  theme.id === 'theme-glass' ? 'rounded-2xl bg-white/30 backdrop-blur-md' :
                                  theme.id === 'theme-neo' ? 'border-2 border-black shadow-[2px_2px_0px_black]' :
                                  theme.id === 'theme-playful' ? 'rounded-3xl bg-pink-100' :
                                  'rounded-none shadow-sm'
                                }`}></div>
                             </div>
                          </div>
                       </div>
                       <div className={`p-4 bg-white flex-1 flex flex-col justify-between ${
                          theme.id === 'theme-modern' ? 'rounded-b-2xl' : 
                          theme.id === 'theme-dark' ? 'bg-[#1a1a1a] rounded-b-xl border border-t-0 border-gray-800' : 
                          theme.id === 'theme-neo' ? 'border-t-0 border-4 border-black' : 
                          ''
                       }`}>
                          <h3 className={`text-sm font-bold ${theme.id === 'theme-dark' ? 'text-white' : 'text-gray-800'}`}>{theme.name}</h3>
                          <p className={`text-[10px] mt-1 line-clamp-2 ${theme.id === 'theme-dark' ? 'text-gray-400' : 'text-gray-500'}`}>{theme.desc}</p>
                          <div className="mt-3 flex items-center justify-between">
                             <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 ${currentTheme === theme.id ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{currentTheme === theme.id ? 'Active' : 'Select'}</span>
                          </div>
                       </div>
                     </div>
                  ))}
               </div>
             </div>

             {/* LAYOUTS SECTION */}
             <div>
               <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 border-t border-gray-200 pt-8">Dashboard Layout Structure</h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                  {layouts && layouts.map((layout) => (
                     <div 
                       key={layout.id}
                       onClick={() => { changeLayout(layout.id); showToast(`${layout.name} Layout Applied!`, 'success'); setActiveMenu(null); }}
                       className={`cursor-pointer transition-all duration-200 flex flex-col bg-white p-4 group ${currentLayout === layout.id ? 'ring-4 ring-blue-500 scale-105 shadow-xl' : 'hover:scale-105 shadow-sm ring-1 ring-gray-200'}`}
                     >
                        <div className="h-20 w-full bg-gray-50 border border-gray-100 mb-3 flex flex-col gap-1 p-1">
                           {/* Tiny wireframes representing layout logic */}
                           {layout.id === 'layout-default' && (
                             <>
                                <div className="flex gap-1 h-1/4 w-full"> <div className="bg-blue-200 flex-1"></div><div className="bg-blue-200 flex-1"></div><div className="bg-blue-200 flex-1"></div><div className="bg-blue-200 flex-1"></div> </div>
                                <div className="flex gap-1 h-3/4 w-full"> <div className="bg-gray-300 w-2/3"></div><div className="bg-gray-300 w-1/3"></div> </div>
                             </>
                           )}
                           {layout.id === 'layout-analytics' && (
                             <>
                                <div className="bg-gray-300 h-1/2 w-full"></div>
                                <div className="flex gap-1 h-1/2 w-full"> <div className="bg-blue-200 flex-1"></div><div className="bg-blue-200 flex-1"></div><div className="bg-blue-200 flex-1"></div> </div>
                             </>
                           )}
                           {layout.id === 'layout-compact' && (
                             <>
                                <div className="flex gap-px h-1/3 w-full"> <div className="bg-blue-200 flex-1"></div><div className="bg-blue-200 flex-1"></div><div className="bg-blue-200 flex-1"></div><div className="bg-blue-200 flex-1"></div><div className="bg-blue-200 flex-1"></div> </div>
                                <div className="flex gap-px h-2/3 w-full"> <div className="bg-gray-300 flex-1"></div><div className="bg-gray-300 flex-1"></div><div className="bg-gray-300 flex-1"></div> </div>
                             </>
                           )}
                           {layout.id === 'layout-focus' && (
                             <>
                                <div className="bg-gray-300 h-1/3 w-full"></div>
                                <div className="bg-blue-200 h-1/3 w-full"></div>
                                <div className="bg-gray-300 h-1/3 w-full"></div>
                             </>
                           )}
                           {layout.id === 'layout-classic-teacher' && (
                             <>
                                <div className="flex gap-1 h-1/4 w-full"> <div className="bg-blue-400 w-1/3"></div><div className="bg-teal-400 w-1/3"></div><div className="bg-yellow-400 w-1/3"></div> </div>
                                <div className="bg-gray-200 h-[2px] w-full mt-px border-b border-orange-400/30"></div>
                                <div className="flex gap-1 h-3/4 w-full mt-px"> <div className="bg-white border border-gray-300 w-2/3"></div><div className="bg-gray-100 border border-gray-200 w-1/3"></div> </div>
                             </>
                           )}
                           {layout.id === 'layout-reversed' && (
                             <>
                                <div className="flex gap-1 h-2/3 w-full"> <div className="bg-white border border-gray-300 w-1/3"></div><div className="bg-gray-700 w-2/3"></div> </div>
                                <div className="flex gap-1 h-1/3 w-full"> <div className="bg-blue-200 flex-1"></div><div className="bg-blue-200 flex-1"></div><div className="bg-blue-200 flex-1"></div> </div>
                             </>
                           )}
                        </div>
                        <h3 className="text-sm font-bold text-gray-800">{layout.name}</h3>
                        <p className="text-[10px] mt-1 text-gray-500">{layout.desc}</p>
                        <div className="mt-3 flex items-center justify-between">
                           <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 ${currentLayout === layout.id ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>{currentLayout === layout.id ? 'Active' : 'Select'}</span>
                        </div>
                     </div>
                  ))}
               </div>
             </div>
             
           </div>
        </div>
      </div>
    )}
    </>
  );
};

export default Header;
