import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Book, UserPlus, List, Camera, ClipboardCheck, 
  Star, Home, Tags, LogOut, Upload, Image as ImageIcon, HeartPulse, Users
} from 'lucide-react';

const StudentsTabs = () => {
  const location = useLocation();

  const tabs = [
    { name: 'Dashboard', path: '/students/dashboard', icon: LayoutDashboard },
    { name: 'Student Admission', path: '/students/admission', icon: UserPlus },
    { name: 'Student List', path: '/students/list', icon: List },
    { name: 'Search by Photo', path: '/students/search-photo', icon: Camera },
    { name: 'Parents & Guardians', path: '/students/parents', icon: Users },
    { name: 'Student Attendance', path: '/students/attendance', icon: ClipboardCheck },
    { name: 'Behavior Records', path: '/students/behavior', icon: Star },
    { name: 'Student Houses', path: '/students/houses', icon: Home },
    { name: 'Student Categories', path: '/students/categories', icon: Tags },
    { name: 'TC & Exit', path: '/students/tc', icon: LogOut },
    { name: 'Health Records', path: '/students/health', icon: HeartPulse }
  ];

  return (
    <div className="flex items-center gap-5 border-b border-gray-200 mb-6 overflow-x-auto text-[11px] font-bold text-gray-500 uppercase tracking-wider pb-1 hide-scroll">
      <style dangerouslySetInnerHTML={{__html: `.hide-scroll::-webkit-scrollbar { display: none; }`}} />
      
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path || location.pathname.startsWith(tab.path + '/');
        const Icon = tab.icon;
        
        return (
          <Link
            key={tab.name}
            to={tab.path}
            className={`pb-2 px-1 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              isActive 
                ? 'text-gray-900 border-b-[3px] border-gray-900 font-bold' 
                : 'hover:text-blue-600'
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'fill-current' : ''}`} /> {tab.name}
          </Link>
        );
      })}
    </div>
  );
};

export default StudentsTabs;
