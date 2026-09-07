import React, { useState, useEffect } from 'react';
import KpiCards from '../components/dashboard/KpiCards';
import PlatformHub from '../components/dashboard/PlatformHub';
import LiveActivity from '../components/dashboard/LiveActivity';
import BottomWidgets from '../components/dashboard/BottomWidgets';
import { Key } from 'lucide-react';

const getGreeting = (hour) => {
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
};

const Dashboard = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const greeting = getGreeting(now.getHours());
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="px-4 md:px-6 py-4 w-full">
      {/* Top Welcome Section */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[10px] font-bold tracking-wider text-emerald-600 bg-emerald-50 w-max px-2.5 py-1 rounded-none mb-3 border border-emerald-100 shadow-sm uppercase">
            <span className="w-1.5 h-1.5 rounded-none bg-emerald-500 mr-1 animate-pulse"></span>
            PLATFORM CONSOLE
          </div>
          <h1 className="text-[26px] font-extrabold text-slate-800 tracking-tight">
            Good Evening, Super <span className="text-[26px]">👋</span>
          </h1>
          <p className="text-[13px] font-medium text-slate-500 mt-1.5">
            Platform overview — {dateStr} · {timeStr}
          </p>
        </div>
        
        <div className="bg-white border text-center border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] rounded-none] flex items-center h-12 w-full md:w-auto overflow-hidden max-w-lg">
          <div className="bg-white px-4 h-full flex items-center border-r border-gray-100 font-bold text-[11px] text-emerald-600 z-10 flex-shrink-0 tracking-wider">
            <span className="w-2 h-2 rounded-none bg-emerald-500 mr-2 animate-pulse" />
            LIVE FEED
          </div>
          <div className="w-[400px] overflow-hidden whitespace-nowrap relative h-full flex items-center text-[12px] font-medium text-slate-600 pl-4">
            <div className="animate-[marquee_20s_linear_infinite] flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-emerald-500" /> User Logged In — Super Admin (Superadmin) <span className="text-slate-400 font-normal">({dateStr} — 05:42 PM)</span>
              <span className="opacity-0">___</span>
              <Key className="w-3.5 h-3.5 text-emerald-500" /> User Logged In — school admin (School admin) <span className="text-slate-400 font-normal">({dateStr} — 05:40 PM)</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <KpiCards />

      {/* Main Grid & Sidebar Area */}
      <div className="flex flex-col xl:flex-row gap-4 mb-6">
        {/* Left Side: Platform Hub */}
        <div className="flex-1 w-full xl:w-[75%]">
          <PlatformHub />
        </div>

        {/* Right Side: Live Activity */}
        <div className="w-full xl:w-[25%] xl:max-w-sm">
          <LiveActivity />
        </div>
      </div>
      
      {/* Bottom Widgets */}
      <BottomWidgets />
    </div>
  );
};

export default Dashboard;
