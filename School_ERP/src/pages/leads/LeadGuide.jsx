import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Users, Columns, Bell, Layers, Book, CheckCircle, Smartphone } from 'lucide-react';

const LeadGuide = () => {
  const navigate = useNavigate();

  const subNav = [
    { name: 'Dashboard', icon: TrendingUp, path: '/leads/dashboard' },
    { name: 'Pipeline Board', icon: Columns, path: '/leads/pipeline' },
    { name: 'All Leads', icon: Users, path: '/leads/all' },
    { name: 'Follow-ups', icon: Bell, path: '/leads/follow-ups' },
    { name: 'Sources & Stages', icon: Layers, path: '/leads/sources-stages' },
    { name: 'Guide', icon: Book, path: '/leads/guide', active: true },
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

      <div className="p-5 sm:p-8 w-full max-w-4xl mx-auto flex flex-col gap-8">
        
        {/* Sub-page Title */}
        <div className="flex items-center gap-2 mb-2">
          <Book className="w-5 h-5 text-[#5F52FF]" />
          <h2 className="text-xl font-bold text-[#1a1a2e]">Lead Management Guide</h2>
        </div>

        <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6">
                   <div className="w-12 h-12 rounded-none bg-orange-100 flex items-center justify-center">
                      <Layers className="w-6 h-6 text-orange-600" />
                   </div>
                   <div>
                       <h2 className="text-lg font-bold text-gray-800">1. Master the Pipeline</h2>
                       <p className="text-[13px] text-gray-500">How to process candidates smoothly</p>
                   </div>
                </div>
                
                <div className="prose prose-sm text-gray-600 max-w-none">
                    <p>The Pipeline Board is the heart of your admissions. Instead of sorting through spreadsheets, you drag and drop student enquiries across customizable stages (e.g., <strong>New Enquiry</strong> &rarr; <strong>Contacted</strong> &rarr; <strong>Application Received</strong>).</p>
                    <ul className="list-disc pl-5 my-4 space-y-2">
                       <li>Use the <strong className="text-gray-800">Pipeline Board</strong> to visually track your admission velocity.</li>
                       <li>Click any student card to add direct calling notes or schedule an interview.</li>
                       <li>If an enquiry becomes unresponsive, drag them to the "Lost / Rejected" stage rather than deleting them. This retains valuable historical conversion data.</li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6">
                   <div className="w-12 h-12 rounded-none bg-blue-100 flex items-center justify-center">
                      <Bell className="w-6 h-6 text-blue-600" />
                   </div>
                   <div>
                       <h2 className="text-lg font-bold text-gray-800">2. Track every Follow-up</h2>
                       <p className="text-[13px] text-gray-500">Never let a prospective parent fall through the cracks</p>
                   </div>
                </div>
                
                <div className="prose prose-sm text-gray-600 max-w-none border-l-4 border-blue-500 bg-blue-50/50 p-4 rounded-r-lg mb-6">
                    <strong>Pro Tip:</strong> Setting a designated Date & Time for every active Lead ensures that your follow-up dashboard automatically segregates today's critical calls from upcoming tasks.
                </div>
                
                <p className="text-[13px] text-gray-600">You can organize Follow-ups based on action types, primarily:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                     <div className="px-4 py-3 rounded-none border border-gray-200 bg-gray-50 text-center"><p className="font-bold text-sm text-gray-800">Calls</p></div>
                     <div className="px-4 py-3 rounded-none border border-gray-200 bg-gray-50 text-center"><p className="font-bold text-sm text-gray-800">Meetings</p></div>
                     <div className="px-4 py-3 rounded-none border border-gray-200 bg-gray-50 text-center"><p className="font-bold text-sm text-gray-800">Campus Visit</p></div>
                     <div className="px-4 py-3 rounded-none border border-gray-200 bg-gray-50 text-center"><p className="font-bold text-sm text-gray-800">Emails</p></div>
                </div>
            </div>
        </div>

        <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6">
                   <div className="w-12 h-12 rounded-none bg-emerald-100 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-emerald-600" />
                   </div>
                   <div>
                       <h2 className="text-lg font-bold text-gray-800">3. One-Click Admission</h2>
                       <p className="text-[13px] text-gray-500">The transition from Lead to Enrolled Student</p>
                   </div>
                </div>
                
                <div className="prose prose-sm text-gray-600 max-w-none">
                    <p>Once a candidate completes your required stages (e.g. Clears the Entrance Test and Document Verification), they are flagged as <strong>Admit Ready</strong>.</p>
                    <p className="my-2">A single action will automatically migrate the Lead profile (carrying over documents, parent info, and photos) directly into the core ERP <strong>Student Roster</strong>. This creates their institutional login credentials and generates the initial tuition fee challan concurrently.</p>
                </div>
                
                <div className="mt-6 flex flex-wrap gap-4">
                     <button onClick={() => navigate('/leads/pipeline')} className="px-5 py-2.5 bg-[#5F52FF] text-white text-[13px] rounded-none font-bold hover:shadow-md transition-shadow">Try the Pipeline Board</button>
                     <button onClick={() => navigate('/front-office/admission-enquiries')} className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 text-[13px] rounded-none font-bold hover:bg-gray-50 transition-colors flex items-center gap-2"><Smartphone className="w-4 h-4"/> View Public Form</button>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default LeadGuide;
