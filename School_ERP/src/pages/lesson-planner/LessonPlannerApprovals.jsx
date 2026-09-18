import React, { useState } from 'react';
import { 
  LayoutDashboard, BookOpen, Users, CheckSquare, BarChart2, Settings, HelpCircle, 
  Plus, CheckCircle2, Eye, Check, X, Inbox, FolderOpen
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LessonPlannerApprovals() {
  const navigate = useNavigate();

  // Mock data for approvals
  const [plans, setPlans] = useState([
    {
      id: 1,
      plan: 'test',
      teacher: 'Rajesh Kumar',
      class: 'Class IX/A',
      subject: 'Mathematics Standard',
      week: '27 Aug - 27 Aug',
      topics: 1,
      selected: false,
    }
  ]);

  const toggleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setPlans(plans.map(p => ({ ...p, selected: isChecked })));
  };

  const toggleSelect = (id) => {
    setPlans(plans.map(p => p.id === id ? { ...p, selected: !p.selected } : p));
  };

  const handleApproveSelected = () => {
    const selectedCount = plans.filter(p => p.selected).length;
    if (selectedCount === 0) {
      alert('Please select at least one plan to approve.');
      return;
    }
    alert(`Approved ${selectedCount} selected plans!`);
    setPlans(plans.filter(p => !p.selected));
  };

  const allSelected = plans.length > 0 && plans.every(p => p.selected);

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
        <button className="flex items-center gap-2 py-3 text-slate-800 border-b-2 border-slate-800 cursor-pointer whitespace-nowrap">
          <CheckSquare className="w-3.5 h-3.5" /> Approvals
        </button>
        <button onClick={() => navigate('/lesson-planner/coverage')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer whitespace-nowrap">
          <FileTextIcon /> Coverage
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
        
        {/* Main Content Area */}
        <div className="bg-white border border-slate-200 rounded-none shadow-sm overflow-hidden pb-4">
          
          <div className="px-6 py-4 flex justify-between items-center border-b border-slate-100">
            <h2 className="text-[15px] font-bold text-slate-800">Plans awaiting final approval</h2>
            <select className="px-3 py-1.5 border border-slate-300 rounded-none text-[12px] bg-white focus:outline-none focus:border-slate-400 min-w-[150px]">
              <option>All classes</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-6 py-3 w-[40px]">
                    <input 
                      type="checkbox" 
                      className="rounded border-slate-300 w-3.5 h-3.5"
                      checked={allSelected}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Plan</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Teacher</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Class / Subject</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Week</th>
                  <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center">Topics</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              
              {plans.length > 0 ? (
                <tbody className="text-[12px] text-slate-700">
                  {plans.map((plan) => (
                    <tr key={plan.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-6 py-3">
                        <input 
                          type="checkbox" 
                          className="rounded border-slate-300 w-3.5 h-3.5 cursor-pointer"
                          checked={plan.selected}
                          onChange={() => toggleSelect(plan.id)}
                        />
                      </td>
                      <td className="px-4 py-3 font-bold text-slate-800">{plan.plan}</td>
                      <td className="px-4 py-3 text-slate-600">{plan.teacher}</td>
                      <td className="px-4 py-3">
                        <div className="text-slate-600">{plan.class}</div>
                        <div className="text-[10px] text-slate-400">{plan.subject}</div>
                      </td>
                      <td className="px-4 py-3 text-slate-500">{plan.week}</td>
                      <td className="px-4 py-3 text-center">{plan.topics}</td>
                      <td className="px-6 py-3 text-right">
                        <button 
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#fd7e14] hover:bg-[#e86e0c] text-white rounded-none text-[11px] font-bold transition-colors"
                          title="Open Plan"
                        >
                          <Inbox className="w-3 h-3" /> Open
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan="7" className="py-16 text-center">
                      <div className="flex flex-col items-center justify-center text-slate-400">
                        <div className="w-10 h-10 rounded-none bg-slate-100 flex items-center justify-center mb-3">
                          <CheckCircle2 className="w-6 h-6 text-slate-300" />
                        </div>
                        <p className="text-[13px] font-medium text-slate-500">Nothing awaiting final approval.</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
          
          {/* Action Footer */}
          {plans.length > 0 && (
            <div className="px-6 pt-4">
              <button 
                onClick={handleApproveSelected}
                className="px-4 py-2 bg-[#28a745] hover:bg-[#218838] text-white text-[12px] font-bold rounded-none flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Check className="w-4 h-4" /> Approve selected
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

// Inline component for FileText to avoid import issues if missing
function FileTextIcon(props) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" height="24" 
      viewBox="0 0 24 24" fill="none" 
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
      className="w-3.5 h-3.5"
      {...props}
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <line x1="10" y1="9" x2="8" y2="9"/>
    </svg>
  );
}
