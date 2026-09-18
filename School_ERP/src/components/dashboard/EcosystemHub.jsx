import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Grid, Search, Wallet, IndianRupee, FileSearch, Banknote, 
  ReceiptText, Calculator, Landmark, AppWindow, CalendarDays, 
  FileCheck, CalendarClock, PenTool, Users, FileSignature, 
  UsersRound, LayoutDashboard, UserPlus, Fingerprint, 
  ListOrdered, Stethoscope, HeartHandshake, ShieldAlert 
} from "lucide-react";

const EcosystemHub = () => {
  const categories = ["All", "Finance", "Academics", "Students", "Operations", "Engagement", "Admin"];
  
  const [activeCategory, setActiveCategory] = useState("All");

  const navigate = useNavigate();

  const modules = [
    { name: "Fees Dashboard", icon: Wallet, color: "text-blue-500", bg: "bg-blue-50", category: "Finance", path: "/finance/dashboard" },
    { name: "Collect Fees", icon: IndianRupee, color: "text-green-600", bg: "bg-green-50", category: "Finance", path: "/finance/collect" },
    { name: "Search Due Fees", icon: FileSearch, color: "text-orange-500", bg: "bg-orange-50", category: "Finance", path: "/finance/search-due-fees" },
    { name: "Online Transactions", icon: Banknote, color: "text-blue-500", bg: "bg-blue-50", category: "Finance", path: "/finance/online-transactions" },
    { name: "Fee Challans", icon: ReceiptText, color: "text-orange-500", bg: "bg-orange-50", category: "Finance", path: "/finance/challans" },
    { name: "Accounts Dashboard", icon: Calculator, color: "text-blue-500", bg: "bg-blue-50", category: "Finance", path: "/accounts/dashboard" },
    { name: "All Transactions", icon: Landmark, color: "text-teal-500", bg: "bg-teal-50", category: "Finance", path: "/finance/transactions" },
    { name: "Academic Dashboard", icon: AppWindow, color: "text-blue-500", bg: "bg-blue-50", category: "Academics", path: "/academics/dashboard" },
    { name: "Class Timetable", icon: CalendarDays, color: "text-green-600", bg: "bg-green-50", category: "Academics", path: "/academics/timetable" },
    { name: "Exam Dashboard", icon: FileCheck, color: "text-blue-500", bg: "bg-blue-50", category: "Academics", path: "/assessment/dashboard" },
    { name: "Schedule & Marks", icon: CalendarClock, color: "text-green-600", bg: "bg-green-50", category: "Academics", path: "/offline-exams/schedule-marks" },
    { name: "Manage Offline Exams", icon: PenTool, color: "text-orange-500", bg: "bg-orange-50", category: "Academics", path: "/offline-exams/manage" },
    { name: "Promote Students", icon: Users, color: "text-teal-500", bg: "bg-teal-50", category: "Academics", path: "/academics/promote" },
    { name: "Teacher Remarks", icon: FileSignature, color: "text-purple-500", bg: "bg-purple-50", category: "Academics", path: "/offline-exams/teacher-remarks" },
    { name: "Student Dashboard", icon: LayoutDashboard, color: "text-blue-500", bg: "bg-blue-50", category: "Students", path: "/students/dashboard" },
    { name: "Student Admission", icon: UserPlus, color: "text-green-600", bg: "bg-green-50", category: "Students", path: "/students/admission" },
    { name: "Student Attendance", icon: Fingerprint, color: "text-orange-500", bg: "bg-orange-50", category: "Students", path: "/students/attendance" },
    { name: "Student List", icon: ListOrdered, color: "text-blue-500", bg: "bg-blue-50", category: "Students", path: "/students/list" },
    { name: "Health Records", icon: Stethoscope, color: "text-pink-500", bg: "bg-pink-50", category: "Students", path: "/students/health" },
    { name: "Behavior Records", icon: HeartHandshake, color: "text-orange-500", bg: "bg-orange-50", category: "Students", path: "/students/behavior" },
    { name: "Parents & Guardians", icon: ShieldAlert, color: "text-purple-500", bg: "bg-purple-50", category: "Students", path: "/students/parents" },
  ];

  const filteredModules = activeCategory === "All" ? modules : modules.filter(m => m.category === activeCategory);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 h-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <Grid className="w-5 h-5 text-indigo-500" />
        <h2 className="font-semibold text-gray-800">Ecosystem Hub</h2>
      </div>
      <p className="text-xs text-gray-500 mb-4">
        <strong className="text-indigo-600">221</strong> modules — everything your school runs, in one place
      </p>

      {/* Toolbar */}
      <div className="flex gap-4 items-center mb-6">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search modules..." 
            className="pl-8 pr-8 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 w-64"
          />
          <Search className="absolute left-2.5 top-2 w-4 h-4 text-gray-400" />
          <div className="absolute right-2 top-1.5 text-[10px] text-gray-400 border border-gray-200 px-1.5 rounded shadow-sm">/</div>
        </div>
        
        <div className="flex gap-2 text-xs font-medium text-gray-500 overflow-x-auto">
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-md cursor-pointer transition-colors whitespace-nowrap border-none border ${cat === activeCategory ? 'bg-indigo-50 text-indigo-700' : 'bg-transparent hover:bg-gray-50 text-gray-600'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-7 gap-3">
        {filteredModules.length > 0 ? (
          filteredModules.map((mod, idx) => (
            <button 
              key={idx} 
              onClick={() => navigate(mod.path)}
              className="flex flex-col items-center justify-center p-3 border border-gray-100 rounded-xl hover:shadow-md transition-shadow hover:border-gray-200 group bg-white cursor-pointer"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${mod.bg} group-hover:scale-110 transition-transform`}>
                <mod.icon className={`w-5 h-5 ${mod.color}`} />
              </div>
              <span className="text-[10px] font-medium text-gray-600 text-center leading-tight">
                {mod.name}
              </span>
            </button>
          ))
        ) : (
          <div className="col-span-7 py-10 text-center text-sm font-semibold text-gray-400">
            No modules found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default EcosystemHub;
