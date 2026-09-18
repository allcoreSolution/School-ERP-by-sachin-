import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Users, Columns, Bell, Layers, Book, Calendar, Check, MoreHorizontal, User, Phone, CheckCircle2 } from 'lucide-react';

const LeadFollowUps = () => {
  const navigate = useNavigate();

  const subNav = [
    { name: 'Dashboard', icon: TrendingUp, path: '/leads/dashboard' },
    { name: 'Pipeline Board', icon: Columns, path: '/leads/pipeline' },
    { name: 'All Leads', icon: Users, path: '/leads/all' },
    { name: 'Follow-ups', icon: Bell, path: '/leads/follow-ups', active: true },
    { name: 'Sources & Stages', icon: Layers, path: '/leads/sources-stages' },
    { name: 'Guide', icon: Book, path: '/leads/guide' },
  ];

  const tasks = [
    { id: 1, type: 'Call', title: 'Schedule campus tour', lead: 'Aarav Sharma', status: 'overdue', date: 'Yesterday' },
    { id: 2, type: 'Meet', title: 'Document verification', lead: 'Priya Patel', status: 'today', date: 'Today, 2:00 PM' },
    { id: 3, type: 'Email', title: 'Send fee structure', lead: 'Rohan Gupta', status: 'upcoming', date: 'Tomorrow' },
    { id: 4, type: 'Call', title: 'Entrance test results', lead: 'Ishita Singh', status: 'upcoming', date: '25 Aug 2026' }
  ];

  return (
    <div className="flex flex-col h-full bg-[#f4f6f8] overflow-y-auto w-full">
      
      {/* Header */}
      <div className="px-8 pt-6 pb-2 bg-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a2e] flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-[#5F52FF]" /> Lead Management
            </h1>
            <p className="text-[13px] text-gray-500 mt-1">Capture every admission lead, work it through the pipeline, and convert the winners into students.</p>
          </div>
          <button 
            onClick={() => navigate('/leads/pipeline')}
            className="bg-[#5F52FF] text-white px-4 py-2 rounded-none text-[13px] font-bold hover:bg-[#4E41E6] shadow-sm flex items-center gap-2 transition-colors"
          >
            <Columns className="w-4 h-4" /> Pipeline Board
          </button>
        </div>
        
        {/* Sub Nav */}
        <div className="flex items-center gap-6 mt-6 overflow-x-auto border-b border-gray-200 pb-px">
          {subNav.map((item, index) => {
            const Icon = item.icon;
            return (
              <button 
                key={index}
                onClick={() => item.path !== '#' && navigate(item.path)}
                className={`flex items-center gap-2 pb-3 text-[12px] font-bold whitespace-nowrap border-b-2 transition-colors ${
                  item.active 
                    ? 'border-[#5F52FF] text-[#5F52FF]' 
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" /> {item.name}
              </button>
            )
          })}
        </div>
      </div>

      <div className="p-5 sm:p-8 w-full mx-auto flex flex-col gap-6 max-w-5xl">

         {/* Sub-page Title */}
         <div className="flex items-center gap-2 mb-2">
           <Bell className="w-5 h-5 text-[#5F52FF]" />
           <h2 className="text-xl font-bold text-[#1a1a2e]">Follow-up inbox</h2>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Task List */}
            <div className="md:col-span-2 flex flex-col gap-4">
               {['overdue', 'today', 'upcoming'].map((groupStatus) => (
                  <div key={groupStatus} className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
                     <div className={`px-4 py-3 border-b flex justify-between items-center ${
                        groupStatus === 'overdue' ? 'bg-rose-50 border-rose-100 text-rose-800' :
                        groupStatus === 'today' ? 'bg-amber-50 border-amber-100 text-amber-800' :
                        'bg-slate-50 border-slate-100 text-slate-800'
                     }`}>
                        <h3 className="text-xs font-bold uppercase flex items-center gap-2">
                            {groupStatus === 'overdue' && <div className="w-2 h-2 rounded-none bg-rose-500"></div>}
                            {groupStatus === 'today' && <div className="w-2 h-2 rounded-none bg-amber-500"></div>}
                            {groupStatus === 'upcoming' && <div className="w-2 h-2 rounded-none bg-slate-500"></div>}
                            {groupStatus} Tasks
                        </h3>
                     </div>
                     <div className="divide-y divide-gray-100">
                        {tasks.filter(t => t.status === groupStatus).map(task => (
                           <div key={task.id} className="p-4 hover:bg-gray-50 flex items-start gap-3">
                              <button className="mt-0.5 w-5 h-5 rounded-none border border-gray-300 flex items-center justify-center text-transparent hover:border-emerald-500 hover:text-emerald-500 shadow-sm"><Check className="w-3.5 h-3.5"/></button>
                              <div className="flex-1">
                                 <h4 className="text-[13px] font-bold text-gray-800">{task.title}</h4>
                                 <div className="flex gap-4 mt-2 text-[11px] font-medium text-gray-500">
                                    <span className="flex items-center gap-1 text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded"><User className="w-3 h-3"/> {task.lead}</span>
                                    <span className="flex items-center gap-1 text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded"><Calendar className="w-3 h-3"/> {task.date}</span>
                                    <span className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded"><Phone className="w-3 h-3"/> {task.type}</span>
                                 </div>
                              </div>
                              <button className="w-8 h-8 rounded-none hover:bg-gray-200 text-gray-400 flex items-center justify-center"><MoreHorizontal className="w-4 h-4"/></button>
                           </div>
                        ))}
                        {tasks.filter(t => t.status === groupStatus).length === 0 && (
                            <div className="p-8 text-center text-[12px] text-gray-400">No {groupStatus} tasks.</div>
                        )}
                     </div>
                  </div>
               ))}
            </div>

            {/* Sidebar Summary */}
            <div className="flex flex-col gap-4">
                <div className="bg-white rounded-none shadow-sm border border-gray-200 p-5">
                    <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">Task Summary</h3>
                    
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-[13px] text-gray-600 flex items-center gap-2"><div className="w-2 h-2 rounded-none bg-rose-500"></div> Overdue</span>
                        <span className="font-bold text-gray-800">1</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-[13px] text-gray-600 flex items-center gap-2"><div className="w-2 h-2 rounded-none bg-amber-500"></div> Due Today</span>
                        <span className="font-bold text-gray-800">1</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-[13px] text-gray-600 flex items-center gap-2"><div className="w-2 h-2 rounded-none bg-slate-300"></div> Upcoming</span>
                        <span className="font-bold text-gray-800">2</span>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex justify-between items-center">
                            <span className="text-[13px] text-gray-600 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> Completed this week</span>
                            <span className="font-bold text-gray-800">12</span>
                        </div>
                    </div>
                </div>
            </div>

         </div>
      </div>
    </div>
  );
};

export default LeadFollowUps;
