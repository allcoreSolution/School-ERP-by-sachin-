import React, { useState } from 'react';
import { 
  LayoutDashboard, BookOpen, Users, CheckSquare, BarChart2, Settings, HelpCircle, 
  Plus, CheckCircle2, FileText, ArrowLeft, Save, Check
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LessonPlannerCoverage() {
  const navigate = useNavigate();

  // View state: 'list' or 'detail'
  const [view, setView] = useState('list');
  
  // Selected plan for detail view
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Filter state
  const [filter, setFilter] = useState('Needs marking'); // 'All' or 'Needs marking'

  // Mock data for coverage list
  const [plans, setPlans] = useState([
    {
      id: 1,
      plan: 'test',
      class: 'Nursery/A',
      subject: 'English',
      week: '03 Aug - 30 Aug',
      covered: 0,
      total: 2,
      pending: 2,
      status: 'Needs marking'
    },
    {
      id: 2,
      plan: 'Demo: Mathematics - week of 22 Jun',
      class: 'Nursery/A',
      subject: 'Mathematics',
      week: '22 Jun - 28 Jun',
      covered: 6,
      total: 6,
      pending: 0,
      status: 'Completed'
    },
    {
      id: 3,
      plan: 'Demo: English - week of 15 Jun',
      class: 'Nursery/A',
      subject: 'English',
      week: '15 Jun - 21 Jun',
      covered: 0,
      total: 3,
      pending: 3,
      status: 'Needs marking'
    },
    {
      id: 4,
      plan: 'Demo: English - week of 08 Jun',
      class: 'Nursery/A',
      subject: 'English',
      week: '08 Jun - 14 Jun',
      covered: 0,
      total: 3,
      pending: 3,
      status: 'Needs marking'
    },
    {
      id: 5,
      plan: 'Demo: Mathematics - week of 25 May',
      class: 'Nursery/A',
      subject: 'Mathematics',
      week: '25 May - 31 May',
      covered: 2,
      total: 3,
      pending: 0,
      status: 'Completed' // Partial completion example
    },
    {
      id: 6,
      plan: 'Demo: English - week of 18 May',
      class: 'Nursery/A',
      subject: 'English',
      week: '18 May - 24 May',
      covered: 3,
      total: 3,
      pending: 0,
      status: 'Completed'
    }
  ]);

  // Mock topics for detail view
  const [topics, setTopics] = useState([
    { id: 101, text: 'Develop vocabulary and communication skills.', type: 'Syllabus', status: 'Pending' },
    { id: 102, text: 'sder', type: '', status: 'Pending' }
  ]);

  const handleMarkCoverage = (plan) => {
    setSelectedPlan(plan);
    // Reset topics for demo purposes
    setTopics([
      { id: 101, text: 'Develop vocabulary and communication skills.', type: 'Syllabus', status: 'Pending' },
      { id: 102, text: 'sder', type: '', status: 'Pending' }
    ]);
    setView('detail');
  };

  const handleReview = (plan) => {
    setSelectedPlan(plan);
    // Mock completed topics
    setTopics([
      { id: 101, text: 'Develop vocabulary and communication skills.', type: 'Syllabus', status: 'Covered' },
      { id: 102, text: 'sder', type: '', status: 'Covered' }
    ]);
    setView('detail');
  };

  const handleBack = () => {
    setView('list');
    setSelectedPlan(null);
  };

  const handleMarkAllCovered = () => {
    setTopics(topics.map(t => ({ ...t, status: 'Covered' })));
  };

  const handleStatusChange = (id, newStatus) => {
    setTopics(topics.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const handleSaveCoverage = () => {
    alert('Coverage saved successfully!');
    // In a real app, you would update the main list state here
    setView('list');
  };

  const filteredPlans = filter === 'All' ? plans : plans.filter(p => p.status === 'Needs marking');

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
        <button className="flex items-center gap-2 py-3 text-slate-800 border-b-2 border-slate-800 cursor-pointer whitespace-nowrap">
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
        
        {view === 'list' ? (
          <div className="bg-white border border-slate-200 rounded-none shadow-sm overflow-hidden pb-4">
            
            <div className="px-6 py-4 flex justify-between items-center border-b border-slate-100">
              <h2 className="text-[14px] font-bold text-slate-800">Plans to reconcile <span className="text-slate-400 font-normal text-[12px]">(period started)</span></h2>
              <div className="flex bg-white border border-slate-300 rounded-none overflow-hidden">
                <button 
                  onClick={() => setFilter('All')}
                  className={`px-4 py-1.5 text-[12px] font-medium transition-colors ${filter === 'All' ? 'bg-[#6c757d] text-white' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  All
                </button>
                <div className="w-px bg-slate-300"></div>
                <button 
                  onClick={() => setFilter('Needs marking')}
                  className={`px-4 py-1.5 text-[12px] font-medium transition-colors ${filter === 'Needs marking' ? 'bg-[#6c757d] text-white' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  Needs marking
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Plan</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Class / Subject</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Week</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider w-[250px]">Coverage</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="text-[12px] text-slate-700">
                  {filteredPlans.map((plan) => {
                    const progressPercent = plan.total > 0 ? Math.round((plan.covered / plan.total) * 100) : 0;
                    const isOrange = plan.status === 'Needs marking';
                    const isCompleted = plan.status === 'Completed';

                    return (
                      <tr key={plan.id} className={`border-b border-slate-100 hover:bg-slate-50 ${isOrange ? 'bg-[#fff8f3]' : ''}`}>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-800">{plan.plan}</span>
                            {isCompleted && <div className="bg-[#28a745] rounded-none w-4 h-4 flex items-center justify-center"><Check className="w-3 h-3 text-white" /></div>}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-slate-600">{plan.class}</div>
                          <div className="text-[10px] text-slate-400">{plan.subject}</div>
                        </td>
                        <td className="px-4 py-4 text-slate-500">{plan.week}</td>
                        <td className="px-4 py-4">
                          <div className="flex flex-col gap-1">
                            <div className="w-full bg-slate-200 h-[10px] rounded-none overflow-hidden flex">
                              {progressPercent > 0 && (
                                <div 
                                  className={`h-full ${progressPercent === 100 ? 'bg-[#28a745]' : 'bg-[#ffc107]'}`} 
                                  style={{ width: `${progressPercent}%` }}
                                >
                                  <div className="text-[8px] text-white text-center leading-[10px] font-bold">
                                    {progressPercent}%
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="text-[10px] text-slate-500">
                              {plan.covered}/{plan.total} covered - {plan.pending} pending
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          {isOrange ? (
                            <button 
                              onClick={() => handleMarkCoverage(plan)}
                              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#fd7e14] hover:bg-[#e86e0c] text-white rounded-none text-[11px] font-bold transition-colors"
                            >
                              <CheckSquare className="w-3.5 h-3.5" /> Mark coverage
                            </button>
                          ) : (
                            <button 
                              onClick={() => handleReview(plan)}
                              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-600 rounded-none text-[11px] font-bold transition-colors shadow-sm"
                            >
                              <CheckSquare className="w-3.5 h-3.5 text-slate-400" /> Review
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {filteredPlans.length === 0 && (
                    <tr>
                      <td colSpan="5" className="py-16 text-center">
                        <div className="flex flex-col items-center justify-center text-slate-400">
                          <CheckCircle2 className="w-8 h-8 text-slate-300 mb-3" />
                          <p className="text-[13px] font-medium text-slate-500">All plans have been marked.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        ) : (
          <div className="space-y-4">
            
            {/* Back Button */}
            <div>
              <button 
                onClick={handleBack}
                className="flex items-center gap-1.5 text-[12px] text-slate-500 hover:text-slate-800 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to coverage
              </button>
            </div>

            {/* Plan Info */}
            <div className="pt-2">
              <h1 className="text-2xl font-bold text-slate-800 mb-1">{selectedPlan?.plan}</h1>
              <p className="text-[13px] text-slate-500">
                {selectedPlan?.class} · {selectedPlan?.subject} · {selectedPlan?.week} 2026
              </p>
            </div>

            {/* Coverage Form */}
            <div className="bg-white border border-slate-200 rounded-none shadow-sm pb-6">
              
              <div className="px-6 py-4 flex justify-between items-center border-b border-slate-100">
                <h2 className="text-[15px] font-bold text-slate-800">Topic coverage</h2>
                <button 
                  onClick={handleMarkAllCovered}
                  className="px-3 py-1.5 bg-white border border-[#28a745] text-[#28a745] hover:bg-green-50 rounded-none text-[12px] font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Check className="w-4 h-4" /> Mark all covered
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Topic</th>
                      <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider w-[200px]">Status</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Reason / Date</th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px] text-slate-700">
                    {topics.map((topic) => (
                      <tr key={topic.id} className="border-b border-slate-100">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span>{topic.text}</span>
                            {topic.type === 'Syllabus' && (
                              <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded">Syllabus</span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <select 
                            value={topic.status}
                            onChange={(e) => handleStatusChange(topic.id, e.target.value)}
                            className="w-full px-3 py-1.5 border border-slate-300 rounded-none text-[12px] bg-white focus:outline-none focus:border-slate-400"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Covered">Covered</option>
                            <option value="Partial">Partial</option>
                            <option value="Not covered">Not covered</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-slate-400 text-[12px]">
                          {topic.status === 'Covered' || topic.status === 'Partial' || topic.status === 'Not covered' ? (
                            <input type="text" placeholder="Add reason/date (optional)" className="w-full px-3 py-1.5 border border-slate-200 rounded-none focus:outline-none focus:border-slate-400 text-[12px]" />
                          ) : (
                            ''
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="px-6 pt-6 flex items-center gap-3">
                <button 
                  onClick={handleSaveCoverage}
                  className="px-4 py-2 bg-[#fd7e14] hover:bg-[#e86e0c] text-white text-[13px] font-bold rounded-none flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Save coverage
                </button>
                <span className="text-[11px] text-slate-500">Covered / partial topics are auto-logged to Classwork & Logbook.</span>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
