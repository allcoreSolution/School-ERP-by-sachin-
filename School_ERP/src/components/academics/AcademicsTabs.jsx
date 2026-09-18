import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Book, Layers, LayoutGrid, Link2, Users, 
  Clock, Calendar, Briefcase, ArrowRight
} from 'lucide-react';

const AcademicsTabs = () => {
  const location = useLocation();

  const tabs = [
    { name: 'Dashboard', path: '/academics/dashboard', icon: LayoutDashboard },
    { name: 'Sessions', path: '/academics/sessions', icon: Layers },
    { name: 'Classes', path: '/academics/classes', icon: LayoutGrid },
    { name: 'Sections', path: '/academics/sections', icon: LayoutGrid },
    { name: 'Subjects', path: '/academics/subjects', icon: Book },
    { name: 'Assign Subjects', path: '/academics/assign-subjects', icon: Link2 },
    { name: 'Assign Electives', path: '/academics/assign-electives', icon: Link2 },
    { name: 'Assign Teacher', path: '/academics/assign-teacher', icon: Users },
    { name: 'Manage Periods', path: '/academics/manage-periods', icon: Clock },
    { name: 'Timetable', path: '/academics/timetable', icon: Calendar },
    { name: 'Promote', path: '/academics/promote', icon: ArrowRight },
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

export default AcademicsTabs;
