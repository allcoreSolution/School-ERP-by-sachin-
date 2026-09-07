import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FileText, LayoutDashboard, Target, Users, BookOpen, Sparkles, Filter, Download, Plus, ChevronRight, BarChart2, Accessibility, CheckCircle, HelpCircle, Palette, List, ChevronDown, X } from 'lucide-react';

const HolisticProgress = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);

  const getActiveTab = () => {
    if (location.pathname.includes('activities')) return 'activities';
    if (location.pathname.includes('progress-cards')) return 'cards';
    return 'dashboard';
  };

  const activeTab = getActiveTab();

  // Handle Tab Changing via React Router
  const handleTabChange = (tabName) => {
    if (tabName === 'dashboard') navigate('/hpc-dashboard');
    if (tabName === 'activities') navigate('/hpc-activities');
    if (tabName === 'cards') navigate('/progress-cards');
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50/50 theme-app-bg text-sm">
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        
        {/* Header Title & Tabs */}
        <div className="space-y-4">
          <div>
            <h1 className="text-[24px] font-black text-gray-800 tracking-tight">Holistic Progress Card (HPC)</h1>
          </div>
          
          <div className="flex px-1 space-x-6 border-b border-gray-200">
             <button 
               onClick={() => handleTabChange('dashboard')}
               className={`pb-3 text-[14px] font-bold transition-all border-b-2 flex items-center gap-2 ${activeTab === 'dashboard' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
               <LayoutDashboard className="w-4 h-4" /> HPC Dashboard
             </button>
             <button 
               onClick={() => handleTabChange('activities')}
               className={`pb-3 text-[14px] font-bold transition-all border-b-2 flex items-center gap-2 ${activeTab === 'activities' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
               <Target className="w-4 h-4" /> HPC Activities
             </button>
             <button 
               onClick={() => handleTabChange('cards')}
               className={`pb-3 text-[14px] font-bold transition-all border-b-2 flex items-center gap-2 ${activeTab === 'cards' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
               <FileText className="w-4 h-4" /> Progress Cards
             </button>
          </div>
        </div>

        {/* Tab Content Areas */}

        {activeTab === 'dashboard' && (
           <div className="space-y-8 animate-in fade-in">
              
              {/* Vibrant Banner */}
              <div className="bg-gradient-to-r from-[#4f46e5] via-[#8b5cf6] to-[#d946ef] px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-none text-white shadow-sm relative overflow-hidden">
                 <div className="flex items-center gap-4 z-10">
                    <div className="bg-white/20 p-2.5 rounded-none">
                       <Accessibility className="w-6 h-6" />
                    </div>
                    <div>
                       <h2 className="text-[22px] font-black tracking-tight">Holistic Progress Card</h2>
                       <p className="text-white/80 font-medium text-[13px] mt-1">A whole-child report — the three abilities, no marks or grades</p>
                    </div>
                 </div>
                 <button onClick={() => handleTabChange('cards')} className="mt-4 sm:mt-0 bg-white text-[#d946ef] font-bold text-[13px] px-4 py-2.5 rounded-none flex items-center gap-2 shadow-sm focus:outline-none hover:bg-gray-50 transition-colors z-10 active:scale-95">
                    <FileText className="w-4 h-4" /> Progress Cards
                 </button>
                 {/* Decorative background circle */}
                 <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
              </div>

              {/* How it works */}
              <div>
                 <h3 className="text-[14px] font-bold text-gray-800 flex items-center gap-2 mb-4">
                    <span className="text-indigo-600"><CheckCircle className="w-4 h-4" /></span> How it works — your steps
                 </h3>
                 <div className="space-y-3">
                    {/* Step 1 */}
                    <div className="bg-white border border-indigo-200 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-none shadow-sm hover:border-indigo-400 transition-colors">
                       <div className="flex gap-4 items-start">
                          <div className="w-8 h-8 shrink-0 bg-indigo-50 text-indigo-600 font-black text-[14px] flex items-center justify-center rounded-none border border-indigo-100">1</div>
                          <div>
                             <div className="flex items-center gap-2">
                                <h4 className="font-bold text-gray-800 text-[15px]">Create cards for a class</h4>
                                <span className="bg-indigo-50 text-indigo-600 text-[10px] font-bold px-2 py-0.5 rounded-none uppercase tracking-wider">Start here</span>
                             </div>
                             <p className="text-gray-500 font-medium text-[13px] mt-1">One click makes a card for every learner in the class.</p>
                          </div>
                       </div>
                       <button onClick={() => setIsCreating(true)} className="shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 text-[13px] font-bold rounded-none flex items-center gap-2 transition-colors active:scale-95">
                          Create cards <ChevronRight className="w-4 h-4" />
                       </button>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-white border border-gray-200 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-none shadow-sm hover:border-gray-300 transition-colors">
                       <div className="flex gap-4 items-start">
                          <div className="w-8 h-8 shrink-0 bg-gray-50 text-gray-500 font-black text-[14px] flex items-center justify-center rounded-none border border-gray-200">2</div>
                          <div>
                             <h4 className="font-bold text-gray-800 text-[15px]">Fill in the parts</h4>
                             <p className="text-gray-500 font-medium text-[13px] mt-1">Type the written parts; tick the assessment grids. Some parts the parent fills.</p>
                          </div>
                       </div>
                       <button onClick={() => handleTabChange('cards')} className="shrink-0 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-5 py-2 text-[13px] font-bold rounded-none flex items-center gap-2 transition-colors active:scale-95">
                          Progress Cards <ChevronRight className="w-4 h-4" />
                       </button>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-white border border-gray-200 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-none shadow-sm hover:border-gray-300 transition-colors">
                       <div className="flex gap-4 items-start">
                          <div className="w-8 h-8 shrink-0 bg-gray-50 text-gray-500 font-black text-[14px] flex items-center justify-center rounded-none border border-gray-200">3</div>
                          <div>
                             <h4 className="font-bold text-gray-800 text-[15px]">Review, publish & hand out</h4>
                             <p className="text-gray-500 font-medium text-[13px] mt-1">Send for review, publish, then print the official card — or the colour card for parents.</p>
                          </div>
                       </div>
                       <button onClick={() => handleTabChange('cards')} className="shrink-0 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-5 py-2 text-[13px] font-bold rounded-none flex items-center gap-2 transition-colors active:scale-95">
                          Progress Cards <ChevronRight className="w-4 h-4" />
                       </button>
                    </div>
                 </div>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                 {/* Card 1 */}
                 <div className="bg-white border border-indigo-200 p-4 rounded-none shadow-sm flex gap-4 items-center">
                    <div className="w-12 h-12 bg-[#8b5cf6] text-white rounded-[4px] flex justify-center items-center shrink-0">
                       <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                       <h3 className="text-xl font-black text-indigo-900">2</h3>
                       <p className="text-gray-800 font-bold text-[12px]">Editions adopted</p>
                    </div>
                 </div>
                 {/* Card 2 */}
                 <div className="bg-white border border-blue-200 p-4 rounded-none shadow-sm flex gap-4 items-center">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-[4px] flex justify-center items-center shrink-0">
                       <Users className="w-6 h-6" />
                    </div>
                    <div>
                       <h3 className="text-xl font-black text-blue-900 flex items-center gap-2">3 <span className="text-[12px] font-bold text-gray-800">Classes on an edition</span></h3>
                       <p className="text-gray-400 font-bold text-[11px]">14 not yet assigned</p>
                    </div>
                 </div>
                 {/* Card 3 */}
                 <div className="bg-white border border-green-200 p-4 rounded-none shadow-sm flex gap-4 items-center">
                    <div className="w-12 h-12 bg-green-500 text-white rounded-[4px] flex justify-center items-center shrink-0">
                       <FileText className="w-6 h-6" />
                    </div>
                    <div>
                       <h3 className="text-xl font-black text-green-900 flex items-center gap-2">0 <span className="text-[12px] font-bold text-gray-800">Cards this year</span></h3>
                       <p className="text-gray-400 font-bold text-[11px]">0 published - 0 draft</p>
                    </div>
                 </div>
                 {/* Card 4 */}
                 <div className="bg-white border border-orange-200 p-4 rounded-none shadow-sm flex gap-4 items-center">
                    <div className="w-12 h-12 bg-orange-500 text-white rounded-[4px] flex justify-center items-center shrink-0">
                       <Target className="w-6 h-6" />
                    </div>
                    <div>
                       <h3 className="text-xl font-black text-orange-900 flex items-center gap-2">0 <span className="text-[12px] font-bold text-gray-800">Activities set up</span></h3>
                    </div>
                 </div>
              </div>

              {/* Go to & What the card is */}
              <div className="space-y-6">
                 <div>
                    <h3 className="text-[14px] font-bold text-gray-800 flex items-center gap-2 mb-4">
                       <span className="text-blue-600"><ChevronRight className="w-4 h-4" /></span> Go to
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                       <div onClick={() => handleTabChange('cards')} className="cursor-pointer bg-white border border-gray-200 p-4 flex gap-4 items-center hover:border-indigo-300 transition-colors rounded-none shadow-sm group">
                          <div className="bg-blue-600 text-white p-2 rounded-[4px]"><FileText className="w-5 h-5" /></div>
                          <div>
                             <h4 className="font-bold text-gray-800 text-[13px] group-hover:text-blue-600 transition-colors">Progress Cards</h4>
                             <p className="text-[11px] font-medium text-gray-500 mt-0.5">Create, fill in, review and print cards</p>
                          </div>
                       </div>
                       <div onClick={() => setIsCreating(true)} className="cursor-pointer bg-white border border-gray-200 p-4 flex gap-4 items-center hover:border-green-300 transition-colors rounded-none shadow-sm group">
                          <div className="bg-green-600 text-white p-2 rounded-[4px]"><Plus className="w-5 h-5" /></div>
                          <div>
                             <h4 className="font-bold text-gray-800 text-[13px] group-hover:text-green-600 transition-colors">Create cards</h4>
                             <p className="text-[11px] font-medium text-gray-500 mt-0.5">Make cards for a whole class at once</p>
                          </div>
                       </div>
                       <div onClick={() => handleTabChange('activities')} className="cursor-pointer bg-white border border-gray-200 p-4 flex gap-4 items-center hover:border-orange-300 transition-colors rounded-none shadow-sm group">
                          <div className="bg-orange-500 text-white p-2 rounded-[4px]"><Target className="w-5 h-5" /></div>
                          <div>
                             <h4 className="font-bold text-gray-800 text-[13px] group-hover:text-orange-600 transition-colors">Activities</h4>
                             <p className="text-[11px] font-medium text-gray-500 mt-0.5">Set up and observe classroom activities</p>
                          </div>
                       </div>
                    </div>
                 </div>

                 <div>
                    <h3 className="text-[14px] font-bold text-gray-800 flex items-center gap-2 mb-3">
                       <span className="text-gray-400"><HelpCircle className="w-4 h-4" /></span> What the card is
                    </h3>
                    <p className="text-[13px] text-gray-700 font-medium leading-relaxed bg-white border border-gray-200 p-5 rounded-none shadow-sm">
                       The Holistic Progress Card describes how a child is growing across three abilities — <strong className="text-blue-600">Awareness</strong>, <strong className="text-pink-600">Sensitivity</strong> and <strong className="text-orange-500">Creativity</strong> — with <strong>no marks, grades or percentages</strong>, by design. Every card has <strong>two printouts</strong>: the plain <em>official</em> card that matches the government form for inspection, and a warm, school-branded <em>colour</em> card the teacher prints for the family.
                    </p>
                 </div>
              </div>

           </div>
        )}

        {activeTab === 'activities' && (
           <div className="space-y-6 animate-in fade-in">
              {/* Vibrant Banner */}
              <div className="bg-gradient-to-r from-[#8b5cf6] via-[#d946ef] to-[#f43f5e] px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-none text-white shadow-sm relative overflow-hidden">
                 <div className="flex items-center gap-4 z-10">
                    <div className="bg-white/20 p-2.5 rounded-none">
                       <Palette className="w-6 h-6" />
                    </div>
                    <div>
                       <h2 className="text-[22px] font-black tracking-tight">Activities</h2>
                       <p className="text-white/90 font-medium text-[13px] mt-1">The tasks learners are assessed on</p>
                    </div>
                 </div>
                 <button onClick={() => handleTabChange('cards')} className="mt-4 sm:mt-0 bg-white/20 hover:bg-white/30 text-white font-bold text-[13px] px-4 py-2.5 rounded-none flex items-center gap-2 shadow-sm border border-white/30 focus:outline-none transition-colors z-10 active:scale-95">
                    <FileText className="w-4 h-4" /> Progress Cards
                 </button>
                 {/* Decorative background circle */}
                 <div className="absolute left-[80%] bottom-0 translate-x-1/4 translate-y-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
              </div>

              {/* Intro Text */}
              <p className="text-[13px] text-gray-800 leading-relaxed font-medium">
                 <strong className="font-black text-gray-900">Why activities exist.</strong> The card never asks "how good is this child at Science?" in the abstract — it asks how they did on something they actually did. So you set up the task once for the whole section, then assess every learner against it in one pass. Setting one up takes a few minutes; assessing forty learners after that is one tap each.
              </p>

              {/* Table Area */}
              <div className="bg-white border border-gray-200 rounded-none shadow-sm flex flex-col min-h-[400px]">
                 <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white">
                    <div className="flex items-center gap-2">
                       <List className="w-4 h-4 text-indigo-700" />
                       <h2 className="font-black text-gray-900 text-[14px]">Activities</h2>
                    </div>
                    <div className="bg-gray-100 text-gray-500 font-bold text-[10px] px-2.5 py-0.5 rounded-full">0</div>
                 </div>
                 
                 <div className="p-4 border-b border-gray-100">
                    <div className="relative inline-block w-full max-w-sm">
                        <select className="appearance-none w-full bg-white border border-gray-200 text-gray-600 py-2 px-3 pr-8 rounded-none text-[13px] font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none">
                           <option>All types</option>
                           <option>Observation</option>
                           <option>Project</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                           <ChevronDown className="w-4 h-4" />
                        </div>
                    </div>
                 </div>

                 {/* Table Header */}
                 <div className="grid grid-cols-12 border-b border-gray-100 bg-[#f8f9fc] text-[10px] font-black text-indigo-700 uppercase tracking-widest px-4 py-4">
                    <div className="col-span-1 border-r border-indigo-100/50 pl-2">#</div>
                    <div className="col-span-3 border-r border-indigo-100/50 pl-4">ACTIVITY</div>
                    <div className="col-span-2 border-r border-indigo-100/50 pl-4">TYPE</div>
                    <div className="col-span-2 border-r border-indigo-100/50 pl-4">CLASS</div>
                    <div className="col-span-2 border-r border-indigo-100/50 pl-4">LEARNERS</div>
                    <div className="col-span-2 text-right pr-4">ACTIONS</div>
                 </div>

                 {/* Empty State */}
                 <div className="p-12 flex-1 flex flex-col items-center justify-center">
                     <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                        <List className="w-5 h-5 text-indigo-600" />
                     </div>
                     <h3 className="text-gray-900 font-black text-[14px] mb-2">No activities yet</h3>
                     <p className="text-gray-500 text-[13px] max-w-2xl text-center font-medium leading-relaxed">Set up the task your class is doing — a group project, an inquiry, a classroom discussion — and you can then assess the whole section against it.</p>
                 </div>
              </div>

           </div>
        )}

        {activeTab === 'cards' && (
           <div className="space-y-6 animate-in fade-in">
              
              {/* Vibrant Banner */}
              <div className="bg-gradient-to-r from-[#8b5cf6] via-[#d946ef] to-[#f43f5e] px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-none text-white shadow-sm relative overflow-hidden">
                 <div className="flex items-center gap-4 z-10">
                    <div className="bg-white/20 p-2.5 rounded-none">
                       <FileText className="w-6 h-6" />
                    </div>
                    <div>
                       <h2 className="text-[22px] font-black tracking-tight">Progress Cards</h2>
                       <p className="text-white/90 font-medium text-[13px] mt-1">Create, fill in, review and print cards for your class</p>
                    </div>
                 </div>
                 <button onClick={() => handleTabChange('dashboard')} className="mt-4 sm:mt-0 bg-white/20 hover:bg-white/30 text-white font-bold text-[13px] px-4 py-2.5 rounded-none flex items-center gap-2 shadow-sm border border-white/30 focus:outline-none transition-colors z-10 active:scale-95">
                    <LayoutDashboard className="w-4 h-4" /> HPC Dashboard
                 </button>
                 {/* Decorative background circle */}
                 <div className="absolute left-[80%] bottom-0 translate-x-1/4 translate-y-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
              </div>

              {/* Table Area */}
              <div className="bg-white border border-gray-200 rounded-none shadow-sm min-h-[500px]">
                 <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white">
                    <div className="flex items-center gap-2">
                       <h2 className="font-black text-gray-900 text-[14px]">Progress Cards Generator</h2>
                    </div>
                    <button onClick={() => setIsCreating(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 font-bold text-[13px] rounded-none shadow-sm flex items-center gap-2 transition-colors active:scale-95">
                       <Plus className="w-4 h-4" /> Create Cards
                    </button>
                 </div>
                 
                 <div className="p-6">
                    {/* Filter and Selection */}
                    <div className="flex gap-4 mb-6">
                       <div className="relative inline-block w-full max-w-xs">
                           <select className="appearance-none w-full bg-white border border-gray-200 text-gray-600 py-2.5 px-3 pr-8 rounded-none text-[13px] font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none">
                              <option>All Classes</option>
                              <option>Class VI - A</option>
                              <option>Class VII - B</option>
                           </select>
                           <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                              <ChevronDown className="w-4 h-4" />
                           </div>
                       </div>
                       
                       <div className="relative inline-block w-full max-w-xs">
                           <select className="appearance-none w-full bg-white border border-gray-200 text-gray-600 py-2.5 px-3 pr-8 rounded-none text-[13px] font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none">
                              <option>Status: Any</option>
                              <option>Ready</option>
                              <option>Draft</option>
                              <option>Pending</option>
                           </select>
                           <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                              <ChevronDown className="w-4 h-4" />
                           </div>
                       </div>
                    </div>

                    <div className="p-4 border border-blue-100 bg-blue-50/50 rounded-none mb-6 flex items-start gap-4">
                       <div className="shrink-0 text-blue-500 mt-0.5"><CheckCircle className="w-5 h-5" /></div>
                       <div>
                          <h3 className="font-bold text-blue-900 text-[14px]">HPC Readiness</h3>
                          <p className="text-blue-700 font-medium text-[13px] mt-1">Class VI - A has pending evaluations. Ensure all subjects are mapped before printing final reports.</p>
                       </div>
                    </div>

                    {/* Table Header */}
                    <div className="grid grid-cols-12 border-b border-gray-100 bg-[#f8f9fc] text-[10px] font-black text-indigo-700 uppercase tracking-widest px-4 py-4">
                       <div className="col-span-4 border-r border-indigo-100/50 pl-2">STUDENT NAME</div>
                       <div className="col-span-2 border-r border-indigo-100/50 pl-4">ROLL NO</div>
                       <div className="col-span-3 border-r border-indigo-100/50 pl-4">STATUS</div>
                       <div className="col-span-3 text-right pr-4">ACTIONS</div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-gray-100">
                       {[
                         { name: 'Kabir Singh', roll: 'VI-A / 01', status: 'Ready to Print', ready: true },
                         { name: 'Shlok Verma', roll: 'VI-A / 02', status: 'Pending Evaluation', ready: false },
                         { name: 'Aaryan Rao', roll: 'VI-A / 03', status: 'Reviewing Draft', ready: false },
                       ].map((student, idx) => (
                          <div key={idx} className="grid grid-cols-12 items-center px-4 py-3 hover:bg-gray-50/50 transition-colors">
                             <div className="col-span-4 font-bold text-[#374151] text-[13px] pl-2">{student.name}</div>
                             <div className="col-span-2 text-gray-500 text-[13px] font-medium pl-4">{student.roll}</div>
                             <div className="col-span-3 pl-4">
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-none text-[10px] font-bold uppercase tracking-wider border ${student.ready ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                                   <div className={`w-1.5 h-1.5 rounded-full ${student.ready ? 'bg-green-500' : 'bg-amber-500'}`}></div> {student.status}
                                </span>
                             </div>
                             <div className="col-span-3 text-right pr-4 flex justify-end items-center gap-4">
                                <button 
                                   onClick={() => alert(`Opening Student Review Panel for ${student.name}.`)}
                                   className="text-indigo-600 hover:text-indigo-900 font-bold text-[12px] uppercase tracking-wide active:scale-95 transition-transform">
                                   Review
                                </button>
                                {student.ready && (
                                   <button 
                                      onClick={() => alert(`Downloading final official Progress Card for ${student.name}...`)}
                                      className="text-gray-400 hover:text-indigo-600 transition-colors active:scale-90"
                                      title="Download Official Card">
                                      <Download className="w-[18px] h-[18px]" />
                                   </button>
                                )}
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        )}

      </div>
      
      {/* Create Cards Modal */}
      {isCreating && (
         <div className="fixed inset-0 z-50 bg-gray-900/40 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200 backdrop-blur-sm">
            <div className="bg-white rounded-none w-full max-w-lg shadow-2xl flex flex-col animate-in zoom-in-95 duration-200 border-t-4 border-indigo-600">
               {/* Modal Header */}
               <div className="px-6 py-4 flex justify-between items-center bg-white border-b border-gray-100 rounded-none shrink-0">
                  <h2 className="font-black text-gray-800 text-[15px] flex items-center gap-2">
                     <FileText className="w-4 h-4 text-indigo-600" /> Create Progress Cards
                  </h2>
                  <button onClick={() => setIsCreating(false)} className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors p-1 rounded-none">
                     <X className="w-5 h-5" />
                  </button>
               </div>
               
               {/* Modal Body */}
               <div className="p-6 space-y-5">
                  <p className="text-gray-500 text-[13px] font-medium">Select a class to generate holistic progress cards for all enrolled learners.</p>
                  
                  <div className="space-y-4">
                     <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Target Class / Section</label>
                        <div className="relative">
                            <select className="appearance-none w-full bg-white border border-gray-200 text-gray-800 py-2.5 px-4 pr-10 rounded-none text-[13px] font-bold focus:outline-none focus:border-indigo-500 transition-colors">
                               <option value="">Select a Class...</option>
                               <option value="vi-a">Class VI - A</option>
                               <option value="vi-b">Class VI - B</option>
                               <option value="vii-a">Class VII - A</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                               <ChevronDown className="w-4 h-4" />
                            </div>
                        </div>
                     </div>

                     <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Template Version</label>
                        <div className="relative">
                            <select className="appearance-none w-full bg-white border border-gray-200 text-gray-800 py-2.5 px-4 pr-10 rounded-none text-[13px] font-bold focus:outline-none focus:border-indigo-500 transition-colors">
                               <option value="v2">HPC Standard v2.0 (Latest)</option>
                               <option value="v1">HPC Legacy v1.4</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                               <ChevronDown className="w-4 h-4" />
                            </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Modal Footer */}
               <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3 shrink-0">
                  <button 
                     onClick={() => setIsCreating(false)}
                     className="px-5 py-2 border border-gray-200 text-gray-600 bg-white hover:bg-gray-50 font-bold text-[13px] transition-colors rounded-none outline-none">
                     Cancel
                  </button>
                  <button 
                     onClick={() => {
                        setIsCreating(false);
                        alert("Progress Cards are being generated for this class.");
                     }}
                     className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[13px] transition-colors rounded-none outline-none shadow-sm flex items-center gap-2">
                     Generate <ChevronRight className="w-4 h-4" />
                  </button>
               </div>
            </div>
         </div>
      )}

    </div>
  );
};

export default HolisticProgress;
