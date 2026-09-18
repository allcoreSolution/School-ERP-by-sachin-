import React from 'react';
import { 
  LayoutDashboard, BookOpen, Users, CheckSquare, BarChart2, Settings, HelpCircle, 
  Plus, Filter, FileText, Eye, Edit2, Copy, Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LessonPlans() {
  const navigate = useNavigate();

  const plans = [
    { id: 1, plan: 'test', class: 'Class IX / A', subject: 'Mathematics Standard', week: '08 Sep - 08 Sep 2026', topics: 1, periods: 4, status: 'Draft' },
    { id: 2, plan: 'test', class: 'Class IX / A', subject: 'Mathematics Standard', week: '27 Aug - 27 Aug 2026', topics: 1, periods: 4, status: 'Pending Principal' },
    { id: 3, plan: 'test', class: 'Nursery / A', subject: 'English', week: '10 Aug - 06 Sep 2026', topics: 2, periods: 5, status: 'Draft' },
    { id: 4, plan: 'test', class: 'Nursery / A', subject: 'English', week: '08 Aug - 30 Aug 2026', topics: 2, periods: 5, status: 'Approved' },
    { id: 5, plan: 'Demo: English — week of 29 Jun', class: 'Nursery / A', subject: 'English', week: '29 Jun - 05 Jul 2026', topics: 0, periods: 5, status: 'Draft' },
    { id: 6, plan: 'Demo: Mathematics — week of 22 Jun v2', class: 'Nursery / A', subject: 'Mathematics', week: '22 Jun - 28 Jun 2026', topics: 6, periods: 5, status: 'Approved' },
    { id: 7, plan: 'Demo: English — week of 15 Jun', class: 'Nursery / A', subject: 'English', week: '15 Jun - 21 Jun 2026', topics: 3, periods: 5, status: 'Approved' },
    { id: 8, plan: 'Demo: English — week of 08 Jun', class: 'Nursery / A', subject: 'English', week: '08 Jun - 14 Jun 2026', topics: 3, periods: 5, status: 'Approved' },
    { id: 9, plan: 'Demo: Mathematics — week of 25 May', class: 'Nursery / A', subject: 'Mathematics', week: '25 May - 31 May 2026', topics: 3, periods: 5, status: 'Approved' },
    { id: 10, plan: 'Demo: English — week of 18 May', class: 'Nursery / A', subject: 'English', week: '18 May - 24 May 2026', topics: 3, periods: 5, status: 'Approved' },
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
        <button onClick={() => navigate('/lesson-planner/dashboard')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer whitespace-nowrap">
          <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
        </button>
        <button className="flex items-center gap-2 py-3 text-slate-800 border-b-2 border-slate-800 cursor-pointer whitespace-nowrap">
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

      <div className="p-6 max-w-[1400px] mx-auto space-y-4">
        
        {/* Filter Bar */}
        <div className="flex flex-wrap items-end gap-4 bg-[#f8f9fa] py-2">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-[10px] font-bold text-slate-500 mb-1">Status</label>
            <select className="w-full px-3 py-1.5 border border-slate-300 rounded-none text-[12px] bg-white focus:outline-none focus:border-slate-400">
              <option>All statuses</option>
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-[10px] font-bold text-slate-500 mb-1">Class</label>
            <select className="w-full px-3 py-1.5 border border-slate-300 rounded-none text-[12px] bg-white focus:outline-none focus:border-slate-400">
              <option>All classes</option>
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-[10px] font-bold text-slate-500 mb-1">Week of</label>
            <div className="relative">
              <input type="text" placeholder="dd mm yyyy" className="w-full pl-3 pr-8 py-1.5 border border-slate-300 rounded-none text-[12px] bg-white focus:outline-none focus:border-slate-400" />
              <Calendar className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2" />
            </div>
          </div>
          <div className="flex items-center gap-3 h-[30px]">
            <button className="px-4 py-1.5 bg-[#343a40] text-white rounded-none text-[12px] font-bold flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" /> Filter
            </button>
            <button className="text-[12px] text-[#007bff] hover:underline font-medium">
              Reset
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white border border-slate-200 rounded-none shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Plan</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Class / Subject</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Week</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center">Topics</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center">Periods</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-[12px] text-slate-700">
                {plans.map((plan) => (
                  <tr key={plan.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3 font-bold text-slate-800">{plan.plan}</td>
                    <td className="px-4 py-3">
                      <div className="text-slate-600">{plan.class}</div>
                      <div className="text-[10px] text-slate-400">{plan.subject}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-500">{plan.week}</td>
                    <td className="px-4 py-3 text-center">{plan.topics}</td>
                    <td className="px-4 py-3 text-center">{plan.periods}</td>
                    <td className="px-4 py-3">
                      {getStatusBadge(plan.status)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <button className="w-7 h-7 flex items-center justify-center border border-slate-300 rounded-none text-[#007bff] hover:bg-slate-50 transition-colors">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        {plan.status !== 'Approved' && (
                          <button className="w-7 h-7 flex items-center justify-center border border-slate-300 rounded-none text-[#007bff] hover:bg-slate-50 transition-colors">
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button className="w-7 h-7 flex items-center justify-center border border-slate-300 rounded-none text-[#007bff] hover:bg-slate-50 transition-colors">
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
