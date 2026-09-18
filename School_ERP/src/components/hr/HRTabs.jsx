import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, HelpCircle, Users, CalendarCheck, CheckCircle, List, Send, 
  IndianRupee, FileText, Calculator, CreditCard, Star, RefreshCw, CheckSquare, 
  Building, Briefcase, IdCard, Settings, MoreVertical, ChevronDown
} from 'lucide-react';

const HRTabs = () => {
  const location = useLocation();

  const tabs = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/hr/dashboard' },
    { name: 'Guide', icon: HelpCircle, path: '/hr/guide' },
    { name: 'Staff Directory', icon: Users, path: '/hr/staff' },
    { name: 'Attendance', icon: CalendarCheck, path: '/hr/attendance' },
    { name: 'Approve Leave', icon: CheckCircle, path: '/hr/leaves/approve' },
    { name: 'Leave Types', icon: List, path: '/hr/leaves/types' },
    { name: 'Apply Leave', icon: Send, path: '/hr/leaves/apply' },
    { name: 'Set Salary', icon: IndianRupee, path: '/hr/salary/set' },
    { name: 'Salary Templates', icon: FileText, path: '/hr/salary/templates' },
    { name: 'Payroll', icon: Calculator, path: '/hr/payroll' },
    { name: 'Loans', icon: CreditCard, path: '/hr/manage-loans' },
    { name: 'Appraisals', icon: Star, path: '/hr/appraisals' },
    { name: 'Appraisal Cycles', icon: RefreshCw, path: '/hr/appraisal-cycles' },
    { name: 'Criteria', icon: CheckSquare, path: '/hr/appraisal-criteria' },
    { name: 'Departments', icon: Building, path: '/hr/departments' },
    { name: 'Designations', icon: Briefcase, path: '/hr/designations' },
    { name: 'ID Cards', icon: IdCard, path: '/hr/id-cards' },
    { name: 'Settings', icon: Settings, path: '/hr/settings' },
  ];

  return (
    <div className="bg-white px-6 border-b border-slate-200 flex items-center gap-4 lg:gap-6 text-[12px] font-bold overflow-x-auto hide-scroll">
      <style dangerouslySetInnerHTML={{__html: `.hide-scroll::-webkit-scrollbar { display: none; }`}} />
      
      {tabs.slice(0, 13).map((tab) => {
        const isActive = location.pathname === tab.path || location.pathname.startsWith(tab.path + '/');
        const Icon = tab.icon;
        
        return (
          <Link
            key={tab.name}
            to={tab.path}
            className={`flex items-center gap-2 py-3 whitespace-nowrap cursor-pointer transition-colors ${
              isActive 
                ? 'text-[#6f42c1] border-b-[3px] border-[#6f42c1] font-bold' 
                : 'text-slate-500 hover:text-slate-800 border-b-[3px] border-transparent'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {tab.name}
          </Link>
        );
      })}
      
      {/* More Menu Dropdown */}
      <div className="relative group">
        <button className="flex items-center gap-2 py-3 whitespace-nowrap cursor-pointer text-slate-500 hover:text-slate-800 border-b-[3px] border-transparent transition-colors outline-none focus:outline-none">
          <MoreVertical className="w-3.5 h-3.5" /> More Menu <ChevronDown className="w-3.5 h-3.5" />
        </button>
        <div className="absolute right-0 top-[100%] mt-0 w-48 bg-white border border-slate-200 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 py-1 rounded-none">
          {tabs.slice(13).map((tab) => {
            const isActive = location.pathname === tab.path || location.pathname.startsWith(tab.path + '/');
            const Icon = tab.icon;
            
            return (
              <Link
                key={tab.name}
                to={tab.path}
                className={`w-full text-left px-4 py-2 flex items-center gap-2 text-[12px] transition-colors ${
                  isActive ? 'bg-purple-50 text-[#6f42c1] font-bold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#6f42c1]' : 'text-slate-500'}`} />
                {tab.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HRTabs;
