import React, { useState, useEffect } from 'react';
import { 
  Plus, LayoutDashboard, List, UserCheck, CheckSquare, BarChart, BookOpen,
  ClipboardList, Edit3, Hourglass, CheckCircle2, RotateCcw, Calendar, Leaf, 
  Filter, Eye, Copy, Trash2, LineChart, FileText
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const mockPlans = [
  { id: 1, title: 'Demo: Mathematics — week of 22 Jun', version: 'v2', class: 'Nursery / A', subject: 'Mathematics', weekInfo: '22 Jun - 28 Jun 2026', topics: 6, periods: 5, status: 'Approved' },
  { id: 2, title: 'Demo: English — week of 15 Jun', version: '', class: 'Nursery / A', subject: 'English', weekInfo: '15 Jun - 21 Jun 2026', topics: 3, periods: 5, status: 'Approved' },
  { id: 3, title: 'Demo: English — week of 18 May', version: '', class: 'Nursery / A', subject: 'English', weekInfo: '18 May - 24 May 2026', topics: 3, periods: 5, status: 'Approved' }
];

const LessonPlanner = () => {
  const [activeTab, setActiveTab] = useState('Lesson Plans');
  const [plans, setPlans] = useState(mockPlans);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPlan, setNewPlan] = useState({ title: '', class: 'Nursery / A', subject: 'Mathematics', weekInfo: '01 Jul - 07 Jul 2026', topics: 1, periods: 1 });
  
  // Filters for Lesson Plans Tab
  const [statusFilter, setStatusFilter] = useState('All statuses');
  const [classFilter, setClassFilter] = useState('All classes');
  const [weekFilter, setWeekFilter] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const p = location.pathname;
    if (p.includes('/lesson-plans')) setActiveTab('Lesson Plans');
    else if (p.includes('/lesson-planner-guide')) setActiveTab('Guide');
    else if (p.includes('/lesson-plan-review')) setActiveTab('Review (HOD)');
    else if (p.includes('/lesson-plan-coverage')) setActiveTab('Coverage');
    else if (p.includes('/lesson-plan-reports')) setActiveTab('Reports');
    else setActiveTab('Dashboard');
  }, [location.pathname]);

  const handleTabClick = (t) => {
    let p = '/lesson-planner';
    if (t.name === 'Lesson Plans') p = '/lesson-plans';
    if (t.name === 'Guide') p = '/lesson-planner-guide';
    if (t.name === 'Review (HOD)') p = '/lesson-plan-review';
    if (t.name === 'Coverage') p = '/lesson-plan-coverage';
    if (t.name === 'Reports') p = '/lesson-plan-reports';
    navigate(p);
  };

  const tabs = [
    { name: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4 text-orange-500" /> },
    { name: 'Lesson Plans', icon: <List className="w-4 h-4 text-blue-500" /> },
    { name: 'Review (HOD)', icon: <UserCheck className="w-4 h-4 text-pink-500" /> },
    { name: 'Coverage', icon: <CheckSquare className="w-4 h-4 text-green-500" /> },
    { name: 'Reports', icon: <BarChart className="w-4 h-4 text-purple-500" /> },
    { name: 'Guide', icon: <BookOpen className="w-4 h-4 text-cyan-500" /> },
  ];

  const filteredPlans = plans.filter(p => {
    const sMatch = statusFilter === 'All statuses' || p.status === statusFilter;
    const cMatch = classFilter === 'All classes' || p.class.includes(classFilter) || p.class === classFilter;
    const wMatch = !weekFilter || p.weekInfo.includes(weekFilter);
    return sMatch && cMatch && wMatch;
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if(!newPlan.title) return alert('Title required');
    
    setPlans([{
      id: Date.now(),
      ...newPlan,
      version: 'v1',
      status: 'Pending'
    }, ...plans]);
    setShowAddModal(false);
    setNewPlan({ title: '', class: 'Nursery / A', subject: 'Mathematics', weekInfo: '01 Jul - 07 Jul 2026', topics: 1, periods: 1 });
  };

  const handleDelete = (id) => {
    if(window.confirm('Delete lesson plan?')) {
      setPlans(plans.filter(p => p.id !== id));
    }
  };

  // KPIs
  const totalPlans = plans.length;
  const approvedPlans = plans.filter(p => p.status === 'Approved').length;
  const pendingPlans = plans.filter(p => p.status === 'Pending').length;
  
  const renderTabContent = () => {
    if (activeTab === 'Lesson Plans') {
      return (
        <div className="bg-white rounded border border-gray-200 shadow-sm overflow-hidden animate-in fade-in">
          
          {/* Filter Bar */}
          <div className="p-4 border-b border-gray-200 bg-white flex flex-wrap items-end gap-4">
             <div className="flex-1 min-w-[200px]">
               <label className="block text-[11px] font-bold text-gray-700 mb-1 tracking-wide">Status</label>
               <select 
                 value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                 className="w-full border border-gray-300 rounded px-3 py-1.5 text-[13px] text-gray-600 focus:outline-none focus:border-blue-400"
               >
                 <option>All statuses</option>
                 <option>Approved</option>
                 <option>Pending</option>
                 <option>Draft</option>
               </select>
             </div>
             <div className="flex-1 min-w-[200px]">
               <label className="block text-[11px] font-bold text-gray-700 mb-1 tracking-wide">Class</label>
               <select 
                 value={classFilter} onChange={e => setClassFilter(e.target.value)}
                 className="w-full border border-gray-300 rounded px-3 py-1.5 text-[13px] text-gray-600 focus:outline-none focus:border-blue-400"
               >
                 <option>All classes</option>
                 <option>Nursery / A</option>
                 <option>Class X / A</option>
               </select>
             </div>
             <div className="flex-1 min-w-[200px]">
               <label className="block text-[11px] font-bold text-gray-700 mb-1 tracking-wide">Week of</label>
               <input 
                 type="date"
                 value={weekFilter} onChange={e => setWeekFilter(e.target.value)}
                 className="w-full border border-gray-300 rounded px-3 py-1.5 text-[13px] text-gray-600 focus:outline-none focus:border-blue-400"
               />
             </div>
             <div className="flex items-center gap-3">
               <button className="bg-[#353a40] hover:bg-[#2a2e33] text-white px-4 py-1.5 rounded-none flex items-center gap-2 text-[13px] font-semibold transition-colors shadow-sm">
                 <Filter className="w-3.5 h-3.5" /> Filter
               </button>
               <button 
                 onClick={() => { setStatusFilter('All statuses'); setClassFilter('All classes'); setWeekFilter(''); }}
                 className="text-gray-500 hover:text-gray-800 text-[13px] font-medium"
               >
                 Reset
               </button>
             </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-widest bg-gray-50/50">
                  <th className="px-5 py-3">Plan</th>
                  <th className="px-5 py-3">Class / Subject</th>
                  <th className="px-5 py-3">Week</th>
                  <th className="px-5 py-3 text-center">Topics</th>
                  <th className="px-5 py-3 text-center">Periods</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPlans.length > 0 ? filteredPlans.map(plan => (
                  <tr key={plan.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[13px] text-gray-800">{plan.title}</span>
                        {plan.version && <span className="bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded text-[10px] font-bold">{plan.version}</span>}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-[13px] text-gray-600">{plan.class}</div>
                      <div className="text-[12px] text-gray-400">{plan.subject}</div>
                    </td>
                    <td className="px-5 py-4 text-[13px] text-gray-600">{plan.weekInfo}</td>
                    <td className="px-5 py-4 text-center text-[13px] font-bold text-gray-700">{plan.topics}</td>
                    <td className="px-5 py-4 text-center text-[13px] font-bold text-gray-700">{plan.periods}</td>
                    <td className="px-5 py-4">
                      {plan.status === 'Approved' ? (
                        <span className="bg-[#28a745] text-white px-2 py-0.5 rounded-[4px] text-[11px] font-bold uppercase tracking-wide">Approved</span>
                      ) : (
                        <span className="bg-yellow-500 text-white px-2 py-0.5 rounded-[4px] text-[11px] font-bold uppercase tracking-wide">{plan.status}</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-center flex items-center justify-center gap-2">
                      <button className="text-[#008cba] hover:text-[#005f7d] border border-[#008cba] rounded-none p-1 transition-colors bg-blue-50/50"><Eye className="w-3.5 h-3.5" /></button>
                      <button className="text-[#008cba] hover:text-[#005f7d] border border-[#008cba] rounded-none p-1 transition-colors bg-blue-50/50"><Copy className="w-3.5 h-3.5" /></button>
                      <button onClick={() => handleDelete(plan.id)} className="text-red-500 hover:text-red-700 border border-red-200 hover:bg-red-50 rounded-none p-1 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={7} className="px-5 py-10 text-center text-gray-500 text-[13px]">
                      No lesson plans match the current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    
    if (activeTab === 'Review (HOD)') {
      return (
        <div className="bg-white border border-gray-200 shadow-sm overflow-hidden animate-in fade-in rounded-none">
          <div className="px-5 py-4 border-b border-gray-200">
             <h3 className="font-bold text-[15px] text-gray-800 tracking-tight">Plans awaiting your review (HOD)</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-widest bg-gray-50/50">
                  <th className="px-5 py-3">Plan</th>
                  <th className="px-5 py-3">Teacher</th>
                  <th className="px-5 py-3">Class / Subject</th>
                  <th className="px-5 py-3">Week</th>
                  <th className="px-5 py-3 text-center">Topics</th>
                  <th className="px-5 py-3">Submitted</th>
                  <th className="px-5 py-3 text-center">Action</th>
                </tr>
              </thead>
            </table>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center py-24 text-center">
             <CheckCircle2 className="w-10 h-10 text-gray-300 mb-3" />
             <p className="text-gray-400 text-[14px]">
                Nothing awaiting your review.
             </p>
          </div>
        </div>
      );
    }
    
    if (activeTab === 'Coverage') {
      return (
        <div className="bg-white border border-gray-200 shadow-sm overflow-hidden animate-in fade-in rounded-none">
          <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
             <div>
               <h3 className="font-bold text-[15px] text-gray-800 tracking-tight inline-block">Plans to reconcile</h3>
               <span className="text-[12px] text-gray-400 ml-2">(period started)</span>
             </div>
             
             <div className="flex border border-gray-300 rounded-none overflow-hidden">
               <button className="bg-gray-500 text-white px-3 py-1 text-[12px] font-bold">All</button>
               <button className="bg-white text-gray-600 hover:bg-gray-50 px-3 py-1 text-[12px] font-bold border-l border-gray-300">Needs marking</button>
             </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-widest bg-gray-50/50">
                  <th className="px-5 py-3">Plan</th>
                  <th className="px-5 py-3">Class / Subject</th>
                  <th className="px-5 py-3">Week</th>
                  <th className="px-5 py-3 w-[250px]">Coverage</th>
                  <th className="px-5 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="px-5 py-4 text-[13px] font-bold text-gray-800">Demo: Mathematics — week of 22 Jun</td>
                  <td className="px-5 py-4">
                    <div className="text-[13px] text-gray-600">Nursery/A</div>
                    <div className="text-[12px] text-gray-400">Mathematics</div>
                  </td>
                  <td className="px-5 py-4 text-[13px] text-gray-600">22 Jun - 28 Jun</td>
                  <td className="px-5 py-4">
                    <div className="w-full bg-gray-200 h-4 mb-1"></div>
                    <div className="text-[10px] text-gray-500">0/6 covered - 6 pending</div>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button className="bg-[#ea580c] hover:bg-[#c2410c] text-white px-3 py-1.5 rounded-none text-[12px] font-bold transition-colors inline-flex items-center gap-2 shadow-sm">
                       <CheckSquare className="w-3.5 h-3.5" /> Mark coverage
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-5 py-4 text-[13px] font-bold text-gray-800">Demo: English — week of 15 Jun</td>
                  <td className="px-5 py-4">
                    <div className="text-[13px] text-gray-600">Nursery/A</div>
                    <div className="text-[12px] text-gray-400">English</div>
                  </td>
                  <td className="px-5 py-4 text-[13px] text-gray-600">15 Jun - 21 Jun</td>
                  <td className="px-5 py-4">
                    <div className="w-full bg-gray-200 h-4 mb-1"></div>
                    <div className="text-[10px] text-gray-500">0/3 covered - 3 pending</div>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button className="bg-[#ea580c] hover:bg-[#c2410c] text-white px-3 py-1.5 rounded-none text-[12px] font-bold transition-colors inline-flex items-center gap-2 shadow-sm">
                       <CheckSquare className="w-3.5 h-3.5" /> Mark coverage
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-5 py-4 flex items-center gap-2">
                     <span className="text-[13px] font-bold text-gray-800">Demo: English — week of 18 May</span>
                     <span className="bg-[#198754] text-white p-0.5 rounded-none"><CheckSquare className="w-3 h-3" /></span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-[13px] text-gray-600">Nursery/A</div>
                    <div className="text-[12px] text-gray-400">English</div>
                  </td>
                  <td className="px-5 py-4 text-[13px] text-gray-600">18 May - 24 May</td>
                  <td className="px-5 py-4">
                    <div className="w-full bg-[#198754] h-4 mb-1 flex items-center justify-center text-white text-[10px] font-bold">100%</div>
                    <div className="text-[10px] text-gray-500">3/3 covered - 0 pending</div>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button className="bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 px-3 py-1.5 rounded-none text-[12px] font-bold transition-colors inline-flex items-center gap-2 shadow-sm">
                       <ClipboardList className="w-3.5 h-3.5" /> Review
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (activeTab === 'Reports') {
      return (
        <div className="space-y-6 animate-in fade-in">
          <div className="bg-white border border-gray-200 shadow-sm overflow-hidden p-5 rounded-none flex items-end gap-3 flex-wrap">
             <div className="flex-1 min-w-[200px] max-w-xs">
               <label className="block text-[11px] font-bold text-gray-700 mb-1 tracking-wide">Class</label>
               <select className="w-full border border-gray-300 rounded px-3 py-1.5 text-[13px] text-gray-600 focus:outline-none bg-white">
                 <option>All classes</option>
               </select>
             </div>
             <div className="flex-1 min-w-[200px] max-w-xs">
               <label className="block text-[11px] font-bold text-gray-700 mb-1 tracking-wide">Subject</label>
               <select className="w-full border border-gray-300 rounded px-3 py-1.5 text-[13px] text-gray-400 focus:outline-none bg-gray-50/50" disabled>
                 <option>Select a class first</option>
               </select>
             </div>
             
             <div className="flex gap-2 ml-4">
               <button className="bg-[#353a40] hover:bg-[#2a2e33] text-white px-4 py-1.5 flex items-center gap-2 text-[13px] font-semibold transition-colors shadow-sm rounded-none">
                  <Filter className="w-3.5 h-3.5 text-gray-400" /> Apply
               </button>
               <button className="bg-white text-red-500 border border-red-200 hover:bg-red-50 px-4 py-1.5 flex items-center gap-1.5 text-[13px] font-semibold transition-colors shadow-sm rounded-none">
                  <FileText className="w-3.5 h-3.5 text-red-400" /> PDF
               </button>
             </div>
          </div>
          
          <div className="bg-white border border-gray-200 shadow-sm overflow-hidden p-20 flex flex-col items-center justify-center rounded-none text-center min-h-[400px]">
             <LineChart className="w-12 h-12 text-gray-200 mb-4" />
             <p className="text-[13px] text-gray-500">No completed-week coverage data for these filters yet.</p>
          </div>
        </div>
      );
    }

    if (activeTab === 'Guide') {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in">
          
          {/* Left Column (Main Content) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Intro Card */}
            <div className="bg-white rounded-[8px] border border-gray-200 shadow-sm p-6">
              <h2 className="text-[16px] font-bold text-gray-800 mb-3">What is a lesson plan — and how is it different from Classwork?</h2>
              <p className="text-[13px] text-gray-600 leading-relaxed">
                A <strong>lesson plan</strong> is what you submit <em>before</em> a teaching week — objectives, methods, teaching aids and the syllabus topics you intend to cover. Your <strong>Classwork & Logbook</strong> records what was <em>actually</em> taught. The planner closes the loop: chapters come from the <strong>Syllabus</strong>, the plan is approved, and after the week you mark each topic covered — which feeds the logbook and the principal's <strong>syllabus-completion report</strong> (the document CBSE inspections check).
              </p>
            </div>

            {/* Tabs at a glance */}
            <div className="bg-white rounded-[8px] border border-gray-200 shadow-sm overflow-hidden">
               <div className="px-6 py-4 border-b border-gray-100">
                 <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">The tabs at a glance</h3>
               </div>
               <div className="p-6 space-y-5">
                 <div className="flex gap-4">
                   <LayoutDashboard className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                   <div>
                     <p className="text-[13px] text-gray-600"><strong className="text-gray-800">Dashboard</strong> — your at-a-glance counts: drafts, pending review, approved, items needing revision, this week's plans, and overall syllabus coverage.</p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <List className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                   <div>
                     <p className="text-[13px] text-gray-600"><strong className="text-gray-800">Lesson Plans</strong> — create, edit, submit and clone your plans. (Admins see every teacher's plans here.)</p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <UserCheck className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                   <div>
                     <p className="text-[13px] text-gray-600"><strong className="text-gray-800">Review (HOD)</strong> — if you are a department head, plans routed to you wait here to be approved (forwarded to the principal) or returned to the teacher with comments.</p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <CheckSquare className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                   <div>
                     <p className="text-[13px] text-gray-600"><strong className="text-gray-800">Coverage</strong> — after a week ends, mark each planned topic <em className="text-green-600 not-italic font-semibold">Covered</em> / <em className="text-yellow-600 not-italic font-semibold">Partial</em> / <em className="text-red-500 not-italic font-semibold">Not covered</em>. Covered & partial topics are auto-logged to Classwork & Logbook.</p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <BarChart className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                   <div>
                     <p className="text-[13px] text-gray-600"><strong className="text-gray-800">Reports</strong> — syllabus completion % by class, subject and teacher, per-plan detail, chronic non-coverage flags, and a one-click PDF for inspections.</p>
                   </div>
                 </div>
               </div>
            </div>

            {/* Weekly Flow */}
            <div className="bg-white rounded-[8px] border border-gray-200 shadow-sm overflow-hidden">
               <div className="px-6 py-4 border-b border-gray-100">
                 <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">The Weekly Flow</h3>
               </div>
               <div className="p-6 space-y-5">
                 <div className="flex gap-4">
                   <span className="w-6 h-6 rounded-full bg-[#008cba] text-white flex items-center justify-center font-bold text-[12px] flex-shrink-0 mt-0.5">1</span>
                   <p className="text-[13px] text-gray-600"><strong className="text-gray-800">Plan (teacher).</strong> Create a plan per subject/section/week. Pick chapters & topics from the syllabus, set learning objectives, choose teaching methods and aids, add homework. <em className="text-gray-500">Planned periods auto-suggest from your timetable.</em> Save as a draft and edit anytime.</p>
                 </div>
                 <div className="flex gap-4">
                   <span className="w-6 h-6 rounded-full bg-[#008cba] text-white flex items-center justify-center font-bold text-[12px] flex-shrink-0 mt-0.5">2</span>
                   <p className="text-[13px] text-gray-600"><strong className="text-gray-800">Submit.</strong> One click sends it for review. If your school uses HODs, it goes to your department head first, then the principal; otherwise straight to the principal. Once submitted you can't edit it unless it's returned.</p>
                 </div>
                 <div className="flex gap-4">
                   <span className="w-6 h-6 rounded-full bg-[#008cba] text-white flex items-center justify-center font-bold text-[12px] flex-shrink-0 mt-0.5">3</span>
                   <p className="text-[13px] text-gray-600"><strong className="text-gray-800">Review (HOD, optional).</strong> The department head approves (forwarding to the principal) or returns it with comments on specific sections.</p>
                 </div>
                 <div className="flex gap-4">
                   <span className="w-6 h-6 rounded-full bg-[#008cba] text-white flex items-center justify-center font-bold text-[12px] flex-shrink-0 mt-0.5">4</span>
                   <p className="text-[13px] text-gray-600"><strong className="text-gray-800">Approve (principal).</strong> The principal approves — individually with inline comments, or in bulk — or returns it for revision.</p>
                 </div>
                 <div className="flex gap-4">
                   <span className="w-6 h-6 rounded-full bg-[#008cba] text-white flex items-center justify-center font-bold text-[12px] flex-shrink-0 mt-0.5">5</span>
                   <p className="text-[13px] text-gray-600"><strong className="text-gray-800">Revise & resubmit.</strong> If returned, the reviewer's comments show <span className="bg-red-100 text-red-800 px-1 rounded">highlighted on the plan</span>. Fix the flagged parts and resubmit — every revision is counted in the audit trail.</p>
                 </div>
                 <div className="flex gap-4">
                   <span className="w-6 h-6 rounded-full bg-[#008cba] text-white flex items-center justify-center font-bold text-[12px] flex-shrink-0 mt-0.5">6</span>
                   <p className="text-[13px] text-gray-600"><strong className="text-gray-800">Cover.</strong> After the week ends, open <strong>Coverage</strong> and mark each topic Covered / Partial / Not covered (with a reason). This updates your logbook and the syllabus-completion report automatically.</p>
                 </div>
               </div>
            </div>

            {/* Who Does What */}
            <div className="bg-white rounded-[8px] border border-gray-200 shadow-sm overflow-hidden">
               <div className="px-6 py-4 border-b border-gray-100">
                 <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Who Does What</h3>
               </div>
               <div className="p-6 flex flex-col gap-5">
                 <div className="border-b border-gray-100 pb-5">
                   <h4 className="font-bold text-[14px] text-gray-800 flex items-center gap-2 mb-1.5"><List className="w-4 h-4 text-blue-500" /> Teachers</h4>
                   <p className="text-[12px] text-gray-500 leading-relaxed">Create & submit plans for their own classes only, revise returned plans, and mark coverage after the week. They see their own plans and reports.</p>
                 </div>
                 <div className="border-b border-gray-100 pb-5">
                   <h4 className="font-bold text-[14px] text-gray-800 flex items-center gap-2 mb-1.5"><UserCheck className="w-4 h-4 text-blue-500" /> Heads of Department (HOD)</h4>
                   <p className="text-[12px] text-gray-500 leading-relaxed">A teacher mapped as a department head in Settings. They review plans from their department in the Review tab — approve to forward, or return with comments. Only plans routed to them appear.</p>
                 </div>
                 <div>
                   <h4 className="font-bold text-[14px] text-gray-800 flex items-center gap-2 mb-1.5"><UserCheck className="w-4 h-4 text-blue-500" /> Principal / Admin</h4>
                   <p className="text-[12px] text-gray-500 leading-relaxed">Final approval (single or bulk), see every plan and the school-wide reports, and configure the module in Settings.</p>
                 </div>
               </div>
            </div>

            {/* Minor Cards */}
            <div className="bg-white rounded-[8px] border border-gray-200 shadow-sm p-6 space-y-3">
               <h4 className="font-bold text-[14px] text-gray-800 flex items-center gap-2"><RotateCcw className="w-4 h-4 text-blue-500" /> Coverage & the syllabus-completion report</h4>
               <p className="text-[13px] text-gray-600 leading-relaxed">Marking a topic <strong>Covered</strong> or <strong>Partial</strong> automatically creates a matching entry in <strong>Classwork & Logbook</strong> — so you never write the same thing twice, and the "what was taught" record stays truthful. Changing it back to <em>Not covered</em> removes that logbook entry.</p>
               <p className="text-[13px] text-gray-600 leading-relaxed">The <strong>Reports</strong> tab rolls this up into a completion percentage (Covered = full, Partial = half) by class, subject and teacher. Anyone consistently below the threshold is flagged as <strong>chronic non-coverage</strong>, and the whole report exports to <strong>PDF</strong> for CBSE inspection.</p>
            </div>

            <div className="bg-white rounded-[8px] border border-gray-200 shadow-sm p-6 space-y-3">
               <h4 className="font-bold text-[14px] text-gray-800 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-500" /> Weekly reminders</h4>
               <p className="text-[13px] text-gray-600 leading-relaxed">Teachers who haven't submitted for the coming week get an automatic reminder on the day/time set in <strong>Settings</strong> (default Friday 3 PM). It lists how many plans are still pending and the submission deadline. Delivery channels (in-app, email, SMS, WhatsApp) are chosen per school in Settings Notification.</p>
            </div>

            {/* Tip */}
            <div className="bg-[#17a2b8] rounded-[8px] shadow-sm p-5 flex gap-3 text-white">
               <BookOpen className="w-5 h-5 flex-shrink-0 mt-0.5" />
               <p className="text-[13px] font-medium leading-relaxed">Tip: use <strong>Clone to next week</strong> on any plan to carry its structure forward — then just swap the topics. Great for recurring weekly subjects.</p>
            </div>

          </div>

          {/* Right Column (Sidebar) */}
          <div className="space-y-6">
            
            {/* Status Meanings */}
            <div className="bg-white rounded-[8px] border border-gray-200 shadow-sm overflow-hidden">
               <div className="px-5 py-4 border-b border-gray-100">
                 <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Status Meanings</h3>
               </div>
               <div className="p-5 flex flex-col gap-4">
                 <div className="flex items-start gap-3">
                   <span className="bg-gray-500 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest mt-0.5 whitespace-nowrap">Draft</span>
                   <span className="text-[12px] text-gray-600">— yours to edit, not yet submitted.</span>
                 </div>
                 <div className="flex items-start gap-3">
                   <span className="bg-[#0dcaf0] text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest mt-0.5 whitespace-nowrap">Pending HOD</span>
                   <span className="text-[12px] text-gray-600">— waiting on the department head.</span>
                 </div>
                 <div className="flex items-start gap-3">
                   <span className="bg-[#0d6efd] text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest mt-0.5 whitespace-nowrap">Pending Principal</span>
                   <span className="text-[12px] text-gray-600">— waiting on the principal.</span>
                 </div>
                 <div className="flex items-start gap-3">
                   <span className="bg-[#198754] text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest mt-0.5 whitespace-nowrap">Approved</span>
                   <span className="text-[12px] text-gray-600">— locked and approved.</span>
                 </div>
                 <div className="flex items-start gap-3">
                   <span className="bg-[#dc3545] text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest mt-0.5 whitespace-nowrap">Needs Revision</span>
                   <span className="text-[12px] text-gray-600">— returned to you with comments.</span>
                 </div>
               </div>
            </div>

            {/* Coverage Labels */}
            <div className="bg-white rounded-[8px] border border-gray-200 shadow-sm overflow-hidden">
               <div className="px-5 py-4 border-b border-gray-100">
                 <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Coverage Labels</h3>
               </div>
               <div className="p-5 flex flex-col gap-4">
                 <div className="flex items-start gap-3">
                   <span className="bg-[#198754] text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest mt-0.5 whitespace-nowrap">Covered</span>
                   <span className="text-[12px] text-gray-600">— taught as planned (logged to Classwork).</span>
                 </div>
                 <div className="flex items-start gap-3">
                   <span className="bg-[#ffc107] text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest mt-0.5 whitespace-nowrap">Partial</span>
                   <span className="text-[12px] text-gray-600">— partly taught; add a reason.</span>
                 </div>
                 <div className="flex items-start gap-3">
                   <span className="bg-[#dc3545] text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest mt-0.5 whitespace-nowrap">Not Covered</span>
                   <span className="text-[12px] text-gray-600">— missed; add a reason. Counts against completion.</span>
                 </div>
                 <div className="flex items-start gap-3">
                   <span className="bg-[#6c757d] text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest mt-0.5 whitespace-nowrap">Pending</span>
                   <span className="text-[12px] text-gray-600">— not yet reconciled after the week.</span>
                 </div>
               </div>
            </div>

            {/* Good to Know */}
            <div className="bg-[#fafafa] rounded-[8px] border border-gray-200 shadow-sm overflow-hidden">
               <div className="px-5 py-4 border-b border-gray-100 bg-white">
                 <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Good To Know</h3>
               </div>
               <div className="p-5">
                 <ul className="list-disc pl-4 space-y-3 text-[12px] text-gray-600">
                   <li>Teachers only ever see and plan for <strong className="text-gray-800">their own allotted classes</strong>.</li>
                   <li>The <strong className="text-gray-800">HOD step is optional</strong> — schools without HODs go teacher → principal.</li>
                   <li>Topics pulled from the <strong className="text-gray-800">syllabus</strong> drive the completion %; you can still add ad-hoc topics.</li>
                   <li>Every submit, approval and return is kept in the plan's <strong className="text-gray-800">audit history</strong>.</li>
                 </ul>
               </div>
            </div>

          </div>
        </div>
      );
    }

    // Default: Dashboard
    return (
      <div className="space-y-6 animate-in fade-in">
        {/* KPI Summary Cards - Row of 6 */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="bg-white border border-gray-200 rounded-[8px] shadow-sm p-4 relative flex flex-col justify-between h-[90px]">
             <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Total Plans</h3>
             <span className="text-2xl font-bold text-gray-800 block">{totalPlans}</span>
             <ClipboardList className="w-5 h-5 text-blue-500 absolute top-4 right-4" />
          </div>
          <div className="bg-white border border-gray-200 rounded-[8px] shadow-sm p-4 relative flex flex-col justify-between h-[90px]">
             <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Drafts</h3>
             <span className="text-2xl font-bold text-gray-800 block">0</span>
             <Edit3 className="w-5 h-5 text-gray-400 absolute top-4 right-4" />
          </div>
          <div className="bg-white border border-gray-200 rounded-[8px] shadow-sm p-4 relative flex flex-col justify-between h-[90px]">
             <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Pending Review</h3>
             <span className="text-2xl font-bold text-gray-800 block">{pendingPlans}</span>
             <Hourglass className="w-5 h-5 text-orange-400 absolute top-4 right-4" />
          </div>
          <div className="bg-white border border-gray-200 rounded-[8px] shadow-sm p-4 relative flex flex-col justify-between h-[90px]">
             <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Approved</h3>
             <span className="text-2xl font-bold text-gray-800 block">{approvedPlans}</span>
             <CheckCircle2 className="w-5 h-5 text-green-500 absolute top-4 right-4" />
          </div>
          <div className="bg-white border border-gray-200 rounded-[8px] shadow-sm p-4 relative flex flex-col justify-between h-[90px]">
             <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Needs Revision</h3>
             <span className="text-2xl font-bold text-gray-800 block">0</span>
             <RotateCcw className="w-5 h-5 text-red-500 absolute top-4 right-4" />
          </div>
          <div className="bg-white border border-gray-200 rounded-[8px] shadow-sm p-4 relative flex flex-col justify-between h-[90px]">
             <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">This Week</h3>
             <span className="text-2xl font-bold text-gray-800 block">1</span>
             <Calendar className="w-5 h-5 text-purple-500 absolute top-4 right-4" />
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Large Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded border border-gray-200 shadow-sm overflow-hidden h-full min-h-[400px] flex flex-col">
               <div className="px-5 py-4 border-b border-gray-200">
                  <h3 className="font-bold text-[15px] text-gray-800 tracking-tight">Recent lesson plans</h3>
               </div>
               
               <table className="w-full text-left">
                 <thead>
                   <tr className="border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-widest bg-gray-50/50">
                     <th className="px-5 py-3">Plan</th>
                     <th className="px-5 py-3">Week</th>
                     <th className="px-5 py-3 text-center">Topics</th>
                     <th className="px-5 py-3 text-right">Status</th>
                   </tr>
                 </thead>
                 <tbody>
                   {plans.slice(0,3).map(p => (
                     <tr key={p.id} className="border-b border-gray-100">
                       <td className="px-5 py-3 text-[13px] font-bold text-gray-800">{p.title}</td>
                       <td className="px-5 py-3 text-[13px] text-gray-600">{p.weekInfo}</td>
                       <td className="px-5 py-3 text-center text-[13px] font-bold text-gray-700">{p.topics}</td>
                       <td className="px-5 py-3 text-right">
                         <span className={`px-2 py-0.5 rounded-[4px] text-[10px] font-bold uppercase ${p.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{p.status}</span>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
               
               {plans.length === 0 && (
                 <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gray-50/30">
                    <ClipboardList className="w-12 h-12 text-gray-300 mb-3" />
                    <p className="text-gray-500 text-[13px]">
                       No lesson plans yet. <button onClick={() => setShowAddModal(true)} className="text-[#ea580c] font-medium hover:underline">Create your first one.</button>
                    </p>
                 </div>
               )}
            </div>
          </div>

          {/* Right Smaller Section */}
          <div className="space-y-6">
            
            {/* Card 1: HOD Review */}
            <div className="bg-white rounded border border-gray-200 shadow-sm p-5 text-center flex flex-col items-center justify-center min-h-[200px]">
               <h3 className="font-bold text-[14px] text-gray-800 self-start w-full text-left tracking-tight mb-8">Awaiting my review (HOD)</h3>
               <span className="text-5xl font-extrabold text-[#ea580c] mb-2 leading-none">{pendingPlans}</span>
               <p className="text-gray-400 text-[12px]">plan(s) pending action</p>
            </div>

            {/* Card 2: Syllabus Coverage */}
            <div className="bg-white rounded border border-gray-200 shadow-sm p-5 text-center flex flex-col items-center min-h-[200px] justify-between">
               <h3 className="font-bold text-[14px] text-gray-800 self-start w-full text-left tracking-tight">Syllabus coverage</h3>
               
               <div className="flex flex-col items-center justify-center mt-6 mb-6">
                 <Leaf className="w-6 h-6 text-gray-300 mb-2" />
                 <p className="text-gray-500 text-[11px] max-w-[200px] leading-relaxed">
                   Coverage appears here once weeks end and topics are marked covered.
                 </p>
               </div>
               
               <button className="text-[12px] font-medium text-gray-600 border border-gray-300 rounded-none px-4 py-1.5 hover:bg-gray-50 shadow-sm transition-colors">
                 Full report
               </button>
            </div>
          </div>

        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#f4f7f6] theme-app-bg text-sm">
      
      {/* Header */}
      <div className="px-6 py-5 bg-white border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Lesson Planner</h1>
          <p className="text-[13px] text-gray-500 mt-1">Plan the week ahead — objectives, methods, syllabus topics — submit for approval, then track coverage.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-[#008cba] hover:bg-[#007399] text-white px-4 py-2 rounded-none shadow-sm font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" /> New Lesson Plan
        </button>
      </div>

      {/* Tabs Menu */}
      <div className="px-6 bg-white border-b border-gray-200 flex overflow-x-auto hide-scrollbar">
        {tabs.map(t => (
          <button 
            key={t.name}
            onClick={() => handleTabClick(t)}
            className={`flex items-center gap-2 px-5 py-4 font-bold text-[13px] whitespace-nowrap transition-colors border-b-[3px] ${
              activeTab === t.name 
                ? 'text-gray-800 border-gray-800' 
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            {t.icon} {t.name}
          </button>
        ))}
      </div>

      <div className="p-6 max-w-[1400px] mx-auto min-h-[500px]">
        {renderTabContent()}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-800">Create New Lesson Plan</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold leading-none">&times;</button>
            </div>
            
            <form onSubmit={handleAdd} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Plan Title / Name *</label>
                <input 
                  type="text" required
                  value={newPlan.title} onChange={e => setNewPlan({...newPlan, title: e.target.value})}
                  placeholder="e.g. Science Chapter 3 — Week 1" 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Class / Section</label>
                  <select 
                    value={newPlan.class} onChange={e => setNewPlan({...newPlan, class: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option>Nursery / A</option>
                    <option>Class X / A</option>
                    <option>Class X / B</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input 
                    type="text" required
                    value={newPlan.subject} onChange={e => setNewPlan({...newPlan, subject: e.target.value})}
                    placeholder="e.g. Science" 
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-3 sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Topics</label>
                  <input 
                    type="number" min="1"
                    value={newPlan.topics} onChange={e => setNewPlan({...newPlan, topics: parseInt(e.target.value)})}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" 
                  />
                </div>
                <div className="col-span-3 sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Periods</label>
                  <input 
                    type="number" min="1"
                    value={newPlan.periods} onChange={e => setNewPlan({...newPlan, periods: parseInt(e.target.value)})}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" 
                  />
                </div>
                <div className="col-span-3 sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Week of</label>
                  <input 
                    type="text" 
                    value={newPlan.weekInfo} onChange={e => setNewPlan({...newPlan, weekInfo: e.target.value})}
                    placeholder="e.g. 01 Jul - 07 Jul 2026"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" 
                  />
                </div>
              </div>
              <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-none text-sm font-medium hover:bg-gray-50 transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#008cba] text-white rounded-none text-sm font-medium hover:bg-[#007399] transition-colors">Submit Plan</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default LessonPlanner;
