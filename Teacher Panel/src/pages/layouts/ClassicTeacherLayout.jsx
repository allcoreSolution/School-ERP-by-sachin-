import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Volume2, Calendar as CalIcon, ChevronLeft, ChevronRight, Video, Settings, User } from 'lucide-react';

const ClassicTeacherLayout = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Live Classes');

  const tabs = [
    'Live Classes', 'General', 'Students', 'Online Exams', 'Exams', 
    'Study Management', 'Documents', 'PTM Meetings', 'Lesson Planner', 
    'OSM Module', 'Assessment', 'Lead Management', 'Surveys & Feedback', 
    'Communication', 'Holistic Progress Card'
  ];

  return (
    <div className="flex-1 bg-[#f4f7f6] overflow-y-auto w-full h-full text-gray-800">
      
      {/* Page Title */}
      <div className="bg-white px-4 py-3 border-b border-gray-200">
         <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Top Stat Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          
          {/* Blue Block */}
          <div className="bg-[#007bff] text-white p-4 relative overflow-hidden flex flex-col justify-between h-24">
            <span className="text-2xl font-bold z-10 relative">1</span>
            <span className="text-sm z-10 relative">Students Assigned</span>
            <User className="absolute right-4 top-1/2 -translate-y-1/2 w-16 h-16 opacity-20" />
          </div>

          {/* Teal Double Block */}
          <div className="flex bg-[#20c997] text-white h-24">
             <div className="flex-1 p-4 flex flex-col justify-between relative border-r border-white/20">
               <span className="text-2xl font-bold z-10">0</span>
               <span className="text-sm z-10">Pending Homework</span>
             </div>
             <div className="flex-1 p-4 flex flex-col justify-between relative">
               <span className="text-2xl font-bold z-10">15</span>
               <span className="text-sm z-10">Subjects Assigned</span>
             </div>
          </div>

          {/* Yellow Block */}
          <div className="bg-[#ffc107] text-[#856404] p-4 relative overflow-hidden flex flex-col justify-between h-24">
            <span className="text-2xl font-bold z-10 relative">1</span>
            <span className="text-sm z-10 relative">Pending Leave Requests</span>
          </div>

        </div>

        {/* Tab Bar & Action Buttons */}
        <div className="bg-white border border-gray-200">
           {/* Tabs */}
           <div className="flex items-center overflow-x-auto border-b border-gray-100 px-2 py-1 scrollbar-hide shrink-0">
              {tabs.map(tab => (
                 <button 
                   key={tab} 
                   onClick={() => setActiveTab(tab)}
                   className={`whitespace-nowrap px-3 py-2 text-xs font-semibold border-b-2 transition-colors ${activeTab === tab ? 'text-orange-500 border-orange-500' : 'text-orange-400/80 border-transparent hover:text-orange-500'} `}
                 >
                   {tab}
                 </button>
              ))}
           </div>
           
           {/* Action Buttons Space */}
            <div className="p-8 flex justify-center gap-4 min-h-[120px]">
              {activeTab === 'Live Classes' && (
                 <>
                   <button onClick={() => navigate('/live/manage')} className="bg-[#dc3545] hover:bg-[#c82333] text-white px-5 py-2.5 rounded-sm flex flex-col items-center justify-center gap-1 transition-colors shadow-sm">
                      <Video className="w-5 h-5" />
                      <span className="text-xs font-bold">Manage Live Classes</span>
                   </button>
                   <button onClick={() => navigate('/live/settings')} className="bg-[#28a745] hover:bg-[#218838] text-white px-5 py-2.5 rounded-sm flex flex-col items-center justify-center gap-1 transition-colors shadow-sm">
                      <Settings className="w-5 h-5" />
                      <span className="text-xs font-bold">Live Class Settings</span>
                   </button>
                 </>
              )}
              {activeTab !== 'Live Classes' && (
                 <div className="flex items-center justify-center text-gray-400 text-sm">
                   Select options for {activeTab}
                 </div>
              )}
           </div>
        </div>

        {/* Lower Main Content - Calendar & Profile */}
        <div className="flex flex-col lg:flex-row gap-4">
           
           {/* Left Col - Calendar */}
           <div className="lg:w-2/3 bg-white border border-gray-200">
              <div className="bg-[#007bff] text-white px-3 py-2 flex items-center gap-2">
                 <CalIcon className="w-4 h-4" />
                 <span className="text-sm font-semibold">School Calendar</span>
              </div>
              <div className="p-4">
                 <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                       <button className="bg-orange-500 text-white p-1 rounded-sm"><ChevronLeft className="w-4 h-4"/></button>
                       <button className="bg-orange-500 text-white p-1 rounded-sm"><ChevronRight className="w-4 h-4"/></button>
                       <button className="bg-[#007bff] text-white px-3 py-1 text-xs font-semibold rounded-sm ml-1">today</button>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">September 2026</h3>
                    <div className="flex items-center">
                       <button className="bg-[#007bff] text-white px-3 py-1 text-xs font-semibold rounded-none">month</button>
                       <button className="bg-orange-500 text-white px-3 py-1 text-xs font-semibold rounded-none">list</button>
                    </div>
                 </div>

                 {/* Mock Calendar Grid */}
                 <div className="border border-gray-200 text-xs">
                    <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50 uppercase font-bold text-center text-gray-700">
                       <div className="py-2 border-r border-gray-200">Sun</div>
                       <div className="py-2 border-r border-gray-200">Mon</div>
                       <div className="py-2 border-r border-gray-200">Tue</div>
                       <div className="py-2 border-r border-gray-200">Wed</div>
                       <div className="py-2 border-r border-gray-200">Thu</div>
                       <div className="py-2 border-r border-gray-200">Fri</div>
                       <div className="py-2">Sat</div>
                    </div>
                    {/* Rows */}
                    <div className="grid grid-cols-7 border-b border-gray-200 min-h-[120px]">
                       <div className="border-r border-gray-200 p-1 bg-gray-50/50">
                          <div className="text-right text-gray-400 mb-1">30</div>
                          <div className="space-y-1">
                             <div className="bg-[#28a745] text-white text-[9px] px-1 py-0.5 rounded-sm line-clamp-1 leading-tight">Ananya Desai</div>
                             <div className="bg-[#28a745] text-white text-[9px] px-1 py-0.5 rounded-sm line-clamp-1 leading-tight">Kabir Desai</div>
                             <div className="bg-[#28a745] text-white text-[9px] px-1 py-0.5 rounded-sm line-clamp-1 leading-tight">Kabir Desai</div>
                             <div className="text-[9px] text-gray-600 font-semibold">+7 more</div>
                          </div>
                       </div>
                       <div className="border-r border-gray-200 p-1 bg-gray-50/50"> <div className="text-right text-gray-400">31</div> </div>
                       <div className="border-r border-gray-200 p-1"> <div className="text-right text-gray-600">1</div> </div>
                       <div className="border-r border-gray-200 p-1">
                          <div className="text-right text-gray-600 mb-1">2</div>
                          <div className="bg-[#dc3545] text-white text-[9px] px-1 py-0.5 rounded-sm line-clamp-1 leading-tight">Digdigdigdibdib</div>
                       </div>
                       <div className="border-r border-gray-200 p-1"> <div className="text-right text-gray-600">3</div> </div>
                       <div className="border-r border-gray-200 p-1 bg-yellow-50">
                          <div className="text-right text-gray-600 mb-1">4</div>
                          <div className="space-y-1">
                             <div className="bg-[#ff8c00] text-white text-[9px] px-1 py-0.5 rounded-sm line-clamp-1 leading-tight">Amit Sharma on Leave</div>
                             <div className="bg-[#ff8c00] text-white text-[9px] px-1 py-0.5 rounded-sm line-clamp-1 leading-tight">Rajesh Kumar on Leave</div>
                             <div className="bg-[#dc3545] text-white text-[9px] px-1 py-0.5 rounded-sm line-clamp-1 leading-tight">Janmashtami</div>
                             <div className="text-[9px] text-gray-600 font-semibold">+1 more</div>
                          </div>
                       </div>
                       <div className="p-1"> <div className="text-right text-gray-600">5</div> </div>
                    </div>
                    {/* Row 2 */}
                    <div className="grid grid-cols-7 min-h-[120px]">
                       <div className="border-r border-gray-200 p-1"> <div className="text-right text-gray-600">6</div> </div>
                       <div className="border-r border-gray-200 p-1"> <div className="text-right text-gray-600">7</div> </div>
                       <div className="border-r border-gray-200 p-1">
                          <div className="text-right text-gray-600 mb-1">8</div>
                          <div className="space-y-1">
                             <div className="bg-[#28a745] text-white text-[9px] px-1 py-0.5 rounded-sm line-clamp-1 leading-tight">Daksh Tiwari</div>
                             <div className="bg-[#28a745] text-white text-[9px] px-1 py-0.5 rounded-sm line-clamp-1 leading-tight">Eva Jain</div>
                             <div className="bg-[#28a745] text-white text-[9px] px-1 py-0.5 rounded-sm line-clamp-1 leading-tight">Eva Jain</div>
                             <div className="text-[9px] text-gray-600 font-semibold">+5 more</div>
                          </div>
                       </div>
                       <div className="border-r border-gray-200 p-1">
                          <div className="text-right text-gray-600 mb-1">9</div>
                          <div className="bg-[#28a745] text-white text-[9px] px-1 py-0.5 rounded-sm line-clamp-1 leading-tight mb-1">HELLO HELLO</div>
                          <div className="bg-[#007bff] text-white text-[9px] px-1 py-0.5 rounded-sm line-clamp-1 leading-tight">Health & Wellness Camp</div>
                       </div>
                       <div className="border-r border-gray-200 p-1"> <div className="text-right text-gray-600">10</div> </div>
                       <div className="border-r border-gray-200 p-1">
                          <div className="text-right text-gray-600 mb-1">11</div>
                          <div className="bg-[#28a745] text-white text-[9px] px-1 py-0.5 rounded-sm line-clamp-1 leading-tight">Rajesh</div>
                       </div>
                       <div className="p-1">
                          <div className="text-right text-gray-600 mb-1">12</div>
                          <div className="space-y-1">
                             <div className="bg-[#28a745] text-white text-[9px] px-1 py-0.5 rounded-sm line-clamp-1 leading-tight">Ishaan Gupta</div>
                             <div className="bg-[#28a745] text-white text-[9px] px-1 py-0.5 rounded-sm line-clamp-1 leading-tight">Ishita Das</div>
                             <div className="text-[9px] text-gray-600 font-semibold">+7 more</div>
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="mt-4 flex items-center justify-center gap-4 text-[10px] font-semibold text-gray-600">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#007bff]"></span> Events</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#dc3545]"></span> School Holidays</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#28a745]"></span> Birthdays</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#ff8c00]"></span> Staff Leaves</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#6f42c1]"></span> Exam Schedules</span>
                 </div>
              </div>
           </div>

           {/* Right Col - Profile & Notices */}
           <div className="lg:w-1/3 flex flex-col gap-4">
              
              {/* Profile Card */}
              <div className="bg-white border border-gray-200">
                 <div className="border-b border-gray-200 flex px-3 py-2 items-center gap-2">
                    <User className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-semibold text-blue-600">Staff Panel</span>
                 </div>
                 <div className="p-6 flex flex-col items-center border-b border-gray-100">
                    <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-md mb-3">
                       <img src="https://i.pravatar.cc/150?img=11" alt="Amit Sharma" className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">Amit Sharma</h3>
                    <p className="text-xs text-gray-500 mt-1">Senior Teacher</p>
                 </div>
                 <div className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                       <FileText className="w-4 h-4 text-gray-600" />
                       <span className="text-sm font-semibold text-gray-800">Latest Salary</span>
                    </div>
                    <div className="border border-gray-200 rounded-sm">
                       <div className="flex justify-between items-center bg-gray-50 px-3 py-2 border-b border-gray-200 text-xs">
                          <span className="text-gray-600">August, 2026</span>
                          <span className="bg-[#28a745] text-white px-2 py-0.5 rounded-sm font-bold text-[9px] uppercase tracking-wider">Paid</span>
                       </div>
                       <div className="flex justify-between items-center px-3 py-2 text-xs font-semibold text-gray-700">
                          <span>Net Salary</span>
                          <span>₹0.00</span>
                       </div>
                    </div>
                    <button className="w-full bg-[#fd7e14] hover:bg-[#e86a0b] text-white font-bold py-2 px-4 rounded-sm text-xs mt-3 transition-colors">
                       View Payslip
                    </button>
                 </div>
              </div>

              {/* Notice Board */}
              <div className="bg-white border border-gray-200">
                 <div className="bg-[#dc3545] text-white px-3 py-2 flex items-center gap-2">
                    <Volume2 className="w-4 h-4" />
                    <span className="text-sm font-bold">Notice Board</span>
                 </div>
                 <div className="p-4 text-sm text-gray-500 min-h-[100px]">
                    No new notices.
                 </div>
              </div>

           </div>

        </div>
      </div>
      
      {/* Footer */}
      <div className="px-6 py-4 bg-white border-t border-gray-200 text-xs text-gray-500 flex justify-between mt-8">
         <span>© 2026 ProjectWorlds Multi School ERP SAAS. All rights reserved.</span>
         <span>Version: 3.0.0</span>
      </div>

    </div>
  );
};

export default ClassicTeacherLayout;
