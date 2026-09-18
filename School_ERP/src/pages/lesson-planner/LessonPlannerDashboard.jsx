import React, { useState } from 'react';
import { 
  LayoutDashboard, BookOpen, Users, CheckSquare, BarChart2, Settings, HelpCircle, 
  Plus, ClipboardList, PenTool, Hourglass, CheckCircle, RefreshCcw, Calendar, 
  AlertTriangle, FileText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LessonPlannerDashboard() {
  const navigate = useNavigate();

  const recentPlans = [
    { id: 1, plan: 'test', subtitle: 'Class IX / A - Mathematics Standard', teacher: 'Rajesh Kumar', week: '08 Sep - 08 Sep', topics: 0, status: 'Draft' },
    { id: 2, plan: 'test', subtitle: 'Class IX / A - Mathematics Standard', teacher: 'Rajesh Kumar', week: '27 Aug - 27 Aug', topics: 0, status: 'Pending Principal' },
    { id: 3, plan: 'test', subtitle: 'Nursery / A - English', teacher: 'Amit Sharma', week: '10 Aug - 06 Sep', topics: 0, status: 'Draft' },
    { id: 4, plan: 'test', subtitle: 'Nursery / A - English', teacher: 'Amit Sharma', week: '08 Aug - 30 Aug', topics: 0, status: 'Approved' },
    { id: 5, plan: 'Demo: English — week of 29 Jun', subtitle: 'Nursery / A - English', teacher: 'Rajesh Kumar', week: '29 Jun - 05 Jul', topics: 0, status: 'Draft' },
    { id: 6, plan: 'Demo: Mathematics — week of 22 Jun', subtitle: 'Nursery / A - Mathematics', teacher: 'Amit Sharma', week: '22 Jun - 28 Jun', topics: 0, status: 'Approved' },
    { id: 7, plan: 'Demo: English — week of 15 Jun', subtitle: 'Nursery / A - English', teacher: 'Amit Sharma', week: '15 Jun - 21 Jun', topics: 0, status: 'Approved' },
    { id: 8, plan: 'Demo: English — week of 08 Jun', subtitle: 'Nursery / A - English', teacher: 'Rajesh Kumar', week: '08 Jun - 14 Jun', topics: 0, status: 'Approved' },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Draft':
        return <span className="px-2 py-1 bg-slate-500 text-white text-[10px] font-bold rounded">Draft</span>;
      case 'Pending Principal':
        return <span className="px-2 py-1 bg-[#007bff] text-white text-[10px] font-bold rounded">Pending Principal</span>;
      case 'Approved':
        return <span className="px-2 py-1 bg-[#28a745] text-white text-[10px] font-bold rounded">Approved</span>;
      default:
        return <span className="px-2 py-1 bg-slate-500 text-white text-[10px] font-bold rounded">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-10">
      
      {/* Header */}
      <div className="bg-white px-6 py-4 flex justify-between items-center border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Lesson Planner</h1>
          <p className="text-[11px] text-slate-500 mt-1">Plan the week ahead — objectives, methods, syllabus topics — submit for approval, then track coverage.</p>
        </div>
        <button 
          onClick={() => navigate('/lesson-planner/new')}
          className="px-4 py-2 bg-[#007bff] hover:bg-[#0056b3] text-white font-bold text-[12px] rounded-none flex items-center gap-2 transition-colors cursor-pointer border-none shadow-sm"
        >
          <Plus className="w-4 h-4" /> New Lesson Plan
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white px-6 border-b border-slate-200 flex items-center gap-6 text-[12px] font-bold overflow-x-auto">
        <button onClick={() => navigate('/lesson-planner/dashboard')} className="flex items-center gap-2 py-3 text-slate-800 border-b-2 border-slate-800 cursor-pointer whitespace-nowrap">
          <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
        </button>
        <button onClick={() => navigate('/lesson-planner/plans')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer whitespace-nowrap">
          <BookOpen className="w-3.5 h-3.5" /> Lesson Plans
        </button>
        <button onClick={() => navigate('/lesson-planner/review')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer whitespace-nowrap">
          <Users className="w-3.5 h-3.5" /> Review (HOD)
        </button>
        <button onClick={() => navigate('/lesson-planner/approvals')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer whitespace-nowrap">
          <CheckSquare className="w-3.5 h-3.5" /> Approvals
        </button>
        <button onClick={() => navigate('/lesson-planner/coverage')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer whitespace-nowrap">
          <FileText className="w-3.5 h-3.5" /> Coverage
        </button>
        <button onClick={() => navigate('/lesson-planner/reports')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer whitespace-nowrap">
          <BarChart2 className="w-3.5 h-3.5" /> Reports
        </button>
        <button onClick={() => navigate('/lesson-planner/settings')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer whitespace-nowrap">
          <Settings className="w-3.5 h-3.5" /> Settings
        </button>
        <button onClick={() => navigate('/lesson-planner/guide')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer whitespace-nowrap">
          <HelpCircle className="w-3.5 h-3.5" /> Guide
        </button>
      </div>

      <div className="p-6 max-w-[1400px] mx-auto space-y-6">
        
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white border border-slate-200 rounded-none p-4 shadow-sm flex flex-col justify-between h-[80px]">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Total Plans</span>
              <ClipboardList className="w-4 h-4 text-[#007bff]" />
            </div>
            <span className="text-xl font-bold text-slate-800">10</span>
          </div>
          <div className="bg-white border border-slate-200 rounded-none p-4 shadow-sm flex flex-col justify-between h-[80px]">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Drafts</span>
              <PenTool className="w-4 h-4 text-slate-400" />
            </div>
            <span className="text-xl font-bold text-slate-800">3</span>
          </div>
          <div className="bg-white border border-slate-200 rounded-none p-4 shadow-sm flex flex-col justify-between h-[80px]">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Pending Review</span>
              <Hourglass className="w-4 h-4 text-[#fd7e14]" />
            </div>
            <span className="text-xl font-bold text-slate-800">1</span>
          </div>
          <div className="bg-white border border-slate-200 rounded-none p-4 shadow-sm flex flex-col justify-between h-[80px]">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Approved</span>
              <CheckCircle className="w-4 h-4 text-[#28a745]" />
            </div>
            <span className="text-xl font-bold text-slate-800">6</span>
          </div>
          <div className="bg-white border border-slate-200 rounded-none p-4 shadow-sm flex flex-col justify-between h-[80px]">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Needs Revision</span>
              <RefreshCcw className="w-4 h-4 text-[#dc3545]" />
            </div>
            <span className="text-xl font-bold text-slate-800">0</span>
          </div>
          <div className="bg-white border border-slate-200 rounded-none p-4 shadow-sm flex flex-col justify-between h-[80px]">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">This Week</span>
              <Calendar className="w-4 h-4 text-[#6f42c1]" />
            </div>
            <span className="text-xl font-bold text-slate-800">2</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column - Recent Plans Table */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-none shadow-sm">
            <div className="p-4 border-b border-slate-200">
              <h2 className="text-[14px] font-bold text-slate-800">Recent lesson plans</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Plan</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Teacher</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Week</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center">Topics</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="text-[12px] text-slate-700">
                  {recentPlans.map((plan, index) => (
                    <tr key={plan.id} className={`border-b border-slate-100 hover:bg-slate-50 ${plan.status === 'Pending Principal' ? 'bg-[#fff5e6]' : ''}`}>
                      <td className="px-4 py-3">
                        <div className="font-bold text-slate-800">{plan.plan}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{plan.subtitle}</div>
                      </td>
                      <td className="px-4 py-3">{plan.teacher}</td>
                      <td className="px-4 py-3 text-slate-500">{plan.week}</td>
                      <td className="px-4 py-3 text-center">{plan.topics}</td>
                      <td className="px-4 py-3">
                        {getStatusBadge(plan.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column - Summary Cards */}
          <div className="space-y-6">
            
            {/* Awaiting final approval */}
            <div className="bg-white border border-slate-200 rounded-none shadow-sm">
              <div className="p-4 border-b border-slate-200">
                <h2 className="text-[13px] font-bold text-slate-800">Awaiting final approval</h2>
              </div>
              <div className="p-8 flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-bold text-[#fd7e14] mb-2">1</span>
                <span className="text-[12px] text-slate-500">plan(s) pending action</span>
              </div>
            </div>

            {/* Syllabus coverage */}
            <div className="bg-white border border-slate-200 rounded-none shadow-sm">
              <div className="p-4 border-b border-slate-200">
                <h2 className="text-[13px] font-bold text-slate-800">Syllabus coverage</h2>
              </div>
              <div className="p-8 flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-bold text-[#28a745] mb-2">50%</span>
                <span className="text-[11px] text-slate-500 mb-4">topics covered vs. planned (reconciled)</span>
                
                <div className="flex items-center gap-1.5 bg-[#dc3545] text-white px-3 py-1.5 rounded-none text-[11px] font-bold mb-4 shadow-sm">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  1 topic(s) not covered
                </div>

                <button 
                  onClick={() => navigate('/lesson-planner/reports')}
                  className="px-4 py-1.5 border border-slate-300 rounded-none text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Full report
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
