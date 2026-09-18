import React from 'react';
import { 
  LayoutDashboard, BookOpen, Users, CheckSquare, BarChart2, Settings, HelpCircle, 
  Plus, FileText, Filter, AlertTriangle, File
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LessonPlannerReports() {
  const navigate = useNavigate();

  const plans = [
    { id: 1, plan: 'Demo: English — week of 08 Jun', class: 'Nursery / A', subject: 'English', teacher: 'Rajesh Kumar', week: '08 Jun - 14 Jun', topics: 3, completion: 0, color: 'bg-slate-200' },
    { id: 2, plan: 'Demo: English — week of 15 Jun', class: 'Nursery / A', subject: 'English', teacher: 'Amit Sharma', week: '15 Jun - 21 Jun', topics: 3, completion: 0, color: 'bg-slate-200' },
    { id: 3, plan: 'test', class: 'Nursery / A', subject: 'English', teacher: 'Amit Sharma', week: '01 Aug - 30 Aug', topics: 2, completion: 0, color: 'bg-slate-200' },
    { id: 4, plan: 'Demo: Mathematics — week of 25 May', class: 'Nursery / A', subject: 'Mathematics', teacher: 'Rajesh Kumar', week: '25 May - 31 May', topics: 3, completion: 50, color: 'bg-[#dc3545]' },
    { id: 5, plan: 'Demo: English — week of 18 May', class: 'Nursery / A', subject: 'English', teacher: 'Amit Sharma', week: '18 May - 24 May', topics: 3, completion: 83, color: 'bg-[#ffc107]' },
    { id: 6, plan: 'Demo: Mathematics — week of 22 Jun', class: 'Nursery / A', subject: 'Mathematics', teacher: 'Amit Sharma', week: '22 Jun - 28 Jun', topics: 6, completion: 100, color: 'bg-[#28a745]' },
  ];

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
        <button className="flex items-center gap-2 py-3 text-slate-800 border-b-2 border-slate-800 cursor-pointer whitespace-nowrap">
          <BarChart2 className="w-3.5 h-3.5" /> Reports
        </button>
        <button onClick={() => navigate('/lesson-planner/settings')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer whitespace-nowrap">
          <Settings className="w-3.5 h-3.5" /> Settings
        </button>
        <button onClick={() => navigate('/lesson-planner/guide')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer whitespace-nowrap">
          <HelpCircle className="w-3.5 h-3.5" /> Guide
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex flex-wrap items-end gap-4">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-[10px] font-bold text-slate-500 mb-1">Class</label>
          <select className="w-full px-3 py-1.5 border border-slate-300 rounded-none text-[12px] focus:outline-none focus:border-slate-400">
            <option>All classes</option>
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-[10px] font-bold text-slate-500 mb-1">Subject</label>
          <select className="w-full px-3 py-1.5 border border-slate-300 rounded-none text-[12px] bg-slate-50 text-slate-400 focus:outline-none">
            <option>Select a class first</option>
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-[10px] font-bold text-slate-500 mb-1">Teacher</label>
          <select className="w-full px-3 py-1.5 border border-slate-300 rounded-none text-[12px] focus:outline-none focus:border-slate-400">
            <option>All teachers</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-1.5 bg-[#343a40] text-white rounded-none text-[12px] font-bold flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" /> Apply
          </button>
          <button className="px-4 py-1.5 border border-[#dc3545] text-[#dc3545] bg-white rounded-none text-[12px] font-bold flex items-center gap-1.5 hover:bg-[#dc3545] hover:text-white transition-colors">
            <File className="w-3.5 h-3.5" /> PDF
          </button>
        </div>
      </div>

      <div className="p-6 max-w-[1400px] mx-auto space-y-6">
        
        {/* Top Row: Overall Coverage & Chronic Alert */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-none p-6 shadow-sm flex flex-col items-center justify-center text-center">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Overall Syllabus Completion</h3>
            <div className="text-4xl font-bold text-slate-800 mb-4">50%</div>
            
            <div className="w-full h-2 bg-slate-100 rounded-none flex overflow-hidden mb-3">
              <div className="bg-[#28a745] h-full" style={{ width: '45%' }}></div>
              <div className="bg-[#ffc107] h-full" style={{ width: '10%' }}></div>
              <div className="bg-[#dc3545] h-full" style={{ width: '5%' }}></div>
              <div className="bg-slate-300 h-full" style={{ width: '40%' }}></div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px] text-slate-600">
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-none bg-[#28a745]"></div> 9 covered</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-none bg-[#ffc107]"></div> 2 partial</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-none bg-[#dc3545]"></div> 1 not covered</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-none bg-slate-300"></div> 8 pending</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-2">20 planned topics (weeks ended)</p>
          </div>

          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-none shadow-sm overflow-hidden flex flex-col">
            <div className="bg-[#dc3545] text-white px-4 py-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <h3 className="text-[13px] font-bold">Chronic non-coverage (below 60%)</h3>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-center">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[13px] font-bold text-slate-800">Rajesh Kumar</span>
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <span className="px-2 py-0.5 bg-[#dc3545] text-white rounded-none font-bold">25%</span>
                  <span>1 not covered / 5</span>
                </div>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-none">
                <div className="bg-[#dc3545] h-full rounded-none" style={{ width: '25%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Row: Breakdowns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-none shadow-sm p-5">
            <h3 className="text-[12px] font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">By class</h3>
            <div>
              <div className="flex justify-between items-end mb-1">
                <span className="text-[12px] text-slate-700">Nursery</span>
                <div className="text-right">
                  <div className="text-[12px] font-bold text-slate-800">50%</div>
                  <div className="text-[9px] text-slate-400">20 top.</div>
                </div>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-none">
                <div className="bg-[#dc3545] h-full rounded-none" style={{ width: '50%' }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-none shadow-sm p-5">
            <h3 className="text-[12px] font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">By subject</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-end mb-1">
                  <span className="text-[12px] text-slate-700">Mathematics</span>
                  <div className="text-right">
                    <div className="text-[12px] font-bold text-slate-800">83%</div>
                    <div className="text-[9px] text-slate-400">9 top.</div>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-none">
                  <div className="bg-[#28a745] h-full rounded-none" style={{ width: '83%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-end mb-1">
                  <span className="text-[12px] text-slate-700">English</span>
                  <div className="text-right">
                    <div className="text-[12px] font-bold text-slate-800">23%</div>
                    <div className="text-[9px] text-slate-400">11 top.</div>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-none">
                  <div className="bg-[#dc3545] h-full rounded-none" style={{ width: '23%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-none shadow-sm p-5">
            <h3 className="text-[12px] font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">By teacher</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-end mb-1">
                  <span className="text-[12px] text-slate-700">Amit Sharma</span>
                  <div className="text-right">
                    <div className="text-[12px] font-bold text-slate-800">61%</div>
                    <div className="text-[9px] text-slate-400">14 top.</div>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-none">
                  <div className="bg-[#ffc107] h-full rounded-none" style={{ width: '61%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-end mb-1">
                  <span className="text-[12px] text-slate-700">Rajesh Kumar</span>
                  <div className="text-right">
                    <div className="text-[12px] font-bold text-slate-800">25%</div>
                    <div className="text-[9px] text-slate-400">6 top.</div>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-none">
                  <div className="bg-[#dc3545] h-full rounded-none" style={{ width: '25%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Table: Per-plan completion */}
        <div className="bg-white border border-slate-200 rounded-none shadow-sm">
          <div className="p-4 border-b border-slate-200">
            <h2 className="text-[13px] font-bold text-slate-800">Per-plan completion <span className="text-slate-400 font-normal">(lowest first)</span></h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Plan</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Class</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Subject</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Teacher</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Week</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center">Topics</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider w-32">Completion</th>
                </tr>
              </thead>
              <tbody className="text-[12px] text-slate-700">
                {plans.map((plan) => (
                  <tr key={plan.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-800">{plan.plan}</td>
                    <td className="px-4 py-3 text-slate-500">{plan.class}</td>
                    <td className="px-4 py-3 text-slate-500">{plan.subject}</td>
                    <td className="px-4 py-3 text-slate-600">{plan.teacher}</td>
                    <td className="px-4 py-3 text-slate-500">{plan.week}</td>
                    <td className="px-4 py-3 text-center">{plan.topics}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-slate-100 rounded-none overflow-hidden">
                          {plan.completion > 0 && (
                            <div className={`h-full ${plan.color}`} style={{ width: `${plan.completion}%` }}></div>
                          )}
                        </div>
                        {plan.completion > 0 && (
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-none text-white ${plan.color}`}>
                            {plan.completion}%
                          </span>
                        )}
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
