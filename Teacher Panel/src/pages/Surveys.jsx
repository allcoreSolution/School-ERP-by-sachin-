import React, { useState, useEffect } from 'react';
import { 
  Inbox, Check, MessageSquare
} from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Surveys = () => {
  const [activeTab, setActiveTab] = useState('My Surveys');
  const location = useLocation();

  useEffect(() => {
    const p = location.pathname;
    if (p.includes('/feedback-triage')) setActiveTab('Feedback Triage');
    else setActiveTab('My Surveys');
  }, [location.pathname]);

  const renderMySurveys = () => {
    const surveyList = [
      {
        title: "DEMO — Teacher Evaluation (Anonymous)",
        type: "Survey",
        desc: "Structured feedback on a teacher's clarity, engagement and support. Usually run anonymously.",
        status: "Done"
      },
      {
        title: "DEMO — Monthly Wellbeing Pulse (Recurring)",
        type: "Feedback form",
        desc: "A gentle anonymous check-in on how students are feeling at school.",
        status: "Done"
      },
      {
        title: "DEMO — Monthly Wellbeing Pulse (Recurring)",
        type: "Feedback form",
        desc: "A gentle anonymous check-in on how students are feeling at school.",
        status: "Done"
      },
      {
        title: "DEMO — Parent Satisfaction (Term 1)",
        type: "Feedback form",
        desc: "How happy are parents with teaching, communication and facilities. Great as a recurring termly pulse...",
        status: "Done"
      }
    ];

    return (
      <div className="space-y-6 animate-in fade-in max-w-5xl">
        
        {/* Page Header matching the screenshot */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Surveys</h1>
          <p className="text-sm text-gray-500 mt-1">Surveys addressed to you — pending and completed.</p>
        </div>

        {/* Inbox Container */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
           
           {/* Inbox Header */}
           <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center bg-white">
              <div className="flex items-center gap-2 text-indigo-700 font-bold">
                 <Inbox className="w-5 h-5 text-indigo-600" />
                 Inbox
              </div>
              <div className="text-sm text-gray-400 font-medium">
                4 surveys
              </div>
           </div>

           {/* Survey List */}
           <div className="divide-y divide-gray-100">
              {surveyList.map((item, idx) => (
                 <div key={idx} className="p-5 flex justify-between items-center hover:bg-gray-50/50 transition-colors">
                    <div className="pr-10">
                       <div className="flex items-center gap-3 mb-1.5">
                          <h3 className="text-[15px] font-bold text-gray-800">{item.title}</h3>
                          <span className="text-[11px] font-medium text-gray-500 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-full">{item.type}</span>
                       </div>
                       <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                    <div>
                       <span className="flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full border border-green-100 whitespace-nowrap">
                         <Check className="w-4 h-4" /> {item.status}
                       </span>
                    </div>
                 </div>
              ))}
           </div>

        </div>
      </div>
    );
  };

  const renderFeedbackTriage = () => (
    <div className="space-y-6 animate-in fade-in max-w-5xl">
       {/* Page Header */}
       <div>
          <h1 className="text-2xl font-bold text-gray-800">Feedback Triage</h1>
          <p className="text-sm text-gray-500 mt-1">Review and action incoming feedback and suggestions.</p>
       </div>

       <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm flex flex-col md:flex-row h-full min-h-[500px]">
          {/* Sidebar block inside triage */}
          <div className="w-full md:w-1/3 bg-gray-50/50 border-r border-gray-200">
             <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white sticky top-0">
                <h3 className="font-bold text-[13px] text-gray-800">Feedback Inbox</h3>
                <span className="bg-yellow-100 text-yellow-700 text-[10px] font-black px-2 py-0.5 rounded">12 Unread</span>
             </div>
             
             <div className="divide-y divide-gray-100">
                <div className="p-4 bg-white border-l-4 border-l-yellow-500 cursor-pointer shadow-sm">
                   <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-[13px] text-gray-800">Anonymous</h4>
                      <span className="text-[10px] font-bold text-gray-400">2h ago</span>
                   </div>
                   <p className="text-[12px] font-bold text-gray-600 mb-2 truncate">Regarding math assignments...</p>
                   <span className="text-[10px] bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded uppercase tracking-wider">Requires Attention</span>
                </div>

                <div className="p-4 hover:bg-gray-50 cursor-pointer transition-colors border-l-4 border-transparent">
                   <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-[13px] text-gray-800">Ravi Desai (Class X)</h4>
                      <span className="text-[10px] font-bold text-gray-400">1d ago</span>
                   </div>
                   <p className="text-[12px] font-medium text-gray-500 mb-2 truncate">The doubt clearing session...</p>
                   <span className="text-[10px] bg-teal-100 text-teal-700 font-bold px-2 py-0.5 rounded uppercase tracking-wider">Positive</span>
                </div>
             </div>
          </div>
          
          {/* Main Reading Pane */}
          <div className="w-full md:w-2/3 flex flex-col bg-white">
             <div className="p-8 border-b border-gray-100 flex-1">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                   <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="font-black text-gray-400 text-lg">A</span>
                   </div>
                   <div>
                      <h3 className="font-black text-[18px] text-gray-800">Anonymous Response</h3>
                      <p className="text-[12px] text-gray-500 font-bold mt-1">From: Mid-Term Teaching Feedback</p>
                   </div>
                </div>
                <div className="bg-yellow-50/50 border border-yellow-100 rounded-xl p-6 mb-6">
                   <p className="text-sm text-gray-700 font-medium leading-relaxed">
                      "I really like the way the concepts are explained, but sometimes the math homework feels too heavy to complete in just one day. Could we please have weekend assignments instead of daily ones for the tough chapters?"
                   </p>
                </div>
                <div className="flex gap-3">
                   <button className="bg-yellow-50 text-yellow-700 hover:bg-yellow-100 font-bold text-[12px] uppercase tracking-wider border border-yellow-200 px-5 py-2.5 rounded transition-colors shadow-sm">Start Discussion</button>
                   <button className="bg-white hover:bg-gray-50 text-gray-600 font-bold text-[12px] uppercase tracking-wider border border-gray-200 px-5 py-2.5 rounded transition-colors shadow-sm">Mark as Resolved</button>
                </div>
             </div>
          </div>
       </div>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto bg-white sm:bg-[#f4f7f6] theme-app-bg">
      <div className="p-8 md:p-10 w-full min-h-screen">
        {activeTab === 'My Surveys' ? renderMySurveys() : 
         activeTab === 'Feedback Triage' ? renderFeedbackTriage() : 
         <></>}
      </div>
    </div>
  );
};
export default Surveys;
