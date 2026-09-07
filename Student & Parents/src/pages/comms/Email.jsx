import React, { useState } from 'react';
import { Mail, RefreshCw, MoreVertical, Printer, X, School } from 'lucide-react';

const mails = [
  { 
    id: 1, 
    sender: 'Yug International School', 
    subject: 'New Leave Request from Amit Sharma', 
    preview: 'A new leave request has been submitted by **Amit Sharma** and requires your appr...', 
    date: 'Sep 4',
    timestamp: 'Sep 4, 2026, 05:49 PM',
    fullBody: 'A new leave request has been submitted by **Amit Sharma** and requires your approval.\n\n**Reason:** Family Emergency\n**Dates:** 04 Sep to 06 Sep, 2026\n\nPlease approve or reject this request.'
  },
  { 
    id: 2, 
    sender: 'Yug International School', 
    subject: 'New Leave Request from Amit Sharma', 
    preview: 'A new leave request has been submitted by **Amit Sharma** and requires your appr...', 
    date: 'Sep 4',
    timestamp: 'Sep 4, 2026, 02:30 PM',
    fullBody: 'A new leave request has been submitted by **Amit Sharma** and requires your approval.\n\n**Reason:** Medical Checkup\n**Dates:** 05 Sep, 2026\n\nPlease approve or reject this request.'
  },
  { 
    id: 3, 
    sender: 'Yug International School', 
    subject: 'New Notice Published: Happy Janmastami', 
    preview: 'A new notice has been published on the school notice board. **Title:** Happy Jan...', 
    date: 'Sep 4',
    timestamp: 'Sep 4, 2026, 09:00 AM',
    fullBody: 'A new notice has been published on the school notice board.\n\n**Title:** Happy Janmastami\n\nPlease check the notice board module for complete details and holiday schedules.'
  },
  { 
    id: 4, 
    sender: 'Yug International School', 
    subject: 'New Leave Request from Rajesh Kumar', 
    preview: 'A new leave request has been submitted by **Rajesh Kumar** and requires your app...', 
    date: 'Sep 3',
    timestamp: 'Sep 3, 2026, 01:15 PM',
    fullBody: 'A new leave request has been submitted by **Rajesh Kumar** and requires your approval.\n\n**Reason:** Out of Station\n**Dates:** 05 Sep to 08 Sep, 2026\n\nPlease approve or reject this request.'
  },
  { 
    id: 5, 
    sender: 'Yug International School', 
    subject: 'New Leave Request from Rajesh Kumar', 
    preview: 'A new leave request has been submitted by **Rajesh Kumar** and requires your app...', 
    date: 'Sep 3',
    timestamp: 'Sep 3, 2026, 11:10 AM',
    fullBody: 'A new leave request has been submitted by **Rajesh Kumar** and requires your approval.\n\n**Reason:** Personal Work\n**Dates:** 04 Sep, 2026\n\nPlease approve or reject this request.'
  }
];

export default function Email() {
  const [selectedMail, setSelectedMail] = useState(null);

  // Helper to parse basic bold markdown `**text**` inline
  const parseMarkdown = (text) => {
    if (!text) return null;
    return text.split('**').map((part, index) => 
      index % 2 === 1 ? <strong key={index} className="text-gray-900 font-extrabold">{part}</strong> : part
    );
  };

  return (
    <div className="p-4 md:p-6 max-w-[1400px] mx-auto min-h-screen bg-[#f8f9fa] space-y-4 relative">
      
      {/* Header */}
      <div className="flex items-center gap-3">
         <Mail className="w-7 h-7 text-[#dc2626]" strokeWidth={2.5}/>
         <h1 className="text-[22px] font-bold text-[#1f2937] tracking-tight">Mail History</h1>
      </div>

      {/* Main List Container */}
      <div className="bg-white border border-gray-200 rounded-none shadow-[0_1px_4px_rgba(0,0,0,0.03)] flex flex-col">
         
         {/* Toolbar */}
         <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-[#fefefe]">
            <div className="flex items-center gap-1 text-gray-500">
               <button className="p-1 hover:bg-gray-100 rounded-none transition-colors"><RefreshCw className="w-[18px] h-[18px]" strokeWidth={2}/></button>
               <button className="p-1 hover:bg-gray-100 rounded-none transition-colors"><MoreVertical className="w-[18px] h-[18px]" strokeWidth={2}/></button>
            </div>
            <span className="text-[11.5px] text-gray-400 font-medium tracking-wide">Showing latest notifications</span>
         </div>

         {/* Mail List */}
         <div className="flex flex-col divide-y divide-gray-100/80">
            {mails.map(mail => (
              <div 
                key={mail.id} 
                onClick={() => setSelectedMail(mail)}
                className="flex px-4 py-3.5 hover:bg-[#f8f9fa] transition-colors cursor-pointer items-center min-w-[700px] hover:shadow-[inset_2px_0_0_#dc2626]"
              >
                 <div className="w-[220px] flex-shrink-0">
                    <span className="font-extrabold text-[12.5px] text-gray-800 tracking-tight">{mail.sender}</span>
                 </div>
                 <div className="flex-1 truncate pr-6">
                    <span className="font-extrabold text-[12.5px] text-gray-800">{mail.subject}</span>
                    <span className="text-gray-400 mx-1.5">-</span>
                    <span className="text-gray-500 text-[12.5px]">{parseMarkdown(mail.preview)}</span>
                 </div>
                 <div className="flex-shrink-0 text-right w-[60px]">
                    <span className="font-bold text-[12px] text-gray-800">{mail.date}</span>
                 </div>
              </div>
            ))}
         </div>
      </div>

      {/* Footer Text */}
      <div className="px-2">
         <span className="text-[11.5px] text-gray-400 font-medium">Powered by School Mail System</span>
      </div>

      {/* EMAIL MODAL (POPUP) */}
      {selectedMail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/30 backdrop-blur-[2px] transition-all">
           <div 
              className="bg-white rounded-none shadow-2xl w-full max-w-2xl flex flex-col overflow-hidden animate-in zoom-in-[0.98] duration-200 border border-gray-200"
              onClick={(e) => e.stopPropagation()}
           >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                 <h2 className="text-[16.5px] font-extrabold text-gray-900 tracking-tight leading-tight pr-4">
                    {selectedMail.subject}
                 </h2>
                 <div className="flex items-center gap-3 flex-shrink-0">
                    <button onClick={() => window.print()} className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-none transition-colors" title="Print">
                       <Printer className="w-[18px] h-[18px]"/>
                    </button>
                    <div className="w-[1px] h-5 bg-gray-300"></div>
                    <button onClick={() => setSelectedMail(null)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-none transition-colors" title="Close">
                       <X className="w-[20px] h-[20px]"/>
                    </button>
                 </div>
              </div>

              {/* Sender Metadata */}
              <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-50">
                 <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-none bg-[#2563eb] flex items-center justify-center text-white shadow-sm flex-shrink-0">
                       <School className="w-[22px] h-[22px]" />
                    </div>
                    <div className="flex flex-col">
                       <span className="font-extrabold text-[14px] text-gray-900 tracking-tight">{selectedMail.sender}</span>
                       <span className="text-[12px] text-gray-500 font-medium">to me &lt;parent@projectworlds.com&gt;</span>
                    </div>
                 </div>
                 <span className="text-[11.5px] font-bold text-gray-400 whitespace-nowrap">{selectedMail.timestamp}</span>
              </div>

              {/* Mail Body */}
              <div className="px-6 py-6 text-[13.5px] text-gray-700 leading-relaxed whitespace-pre-line bg-white min-h-[150px]">
                 {parseMarkdown(selectedMail.fullBody)}
                 
                 {/* Action Buttons (Render if approval is mentioned) */}
                 {selectedMail.fullBody.toLowerCase().includes('approve or reject') && (
                    <div className="mt-8 flex items-center gap-3 pt-6 border-t border-gray-100">
                       <button onClick={() => {alert('Request Approved!'); setSelectedMail(null);}} className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-none shadow-sm transition-colors text-[13px]">
                          Approve Request
                       </button>
                       <button onClick={() => {alert('Request Rejected.'); setSelectedMail(null);}} className="px-5 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold rounded-none shadow-sm transition-colors text-[13px]">
                          Reject
                       </button>
                    </div>
                 )}
              </div>

           </div>
           
           {/* Click Outside Listener (Invisible Backdrop) */}
           <div className="absolute inset-0 -z-10 bg-transparent cursor-pointer" onClick={() => setSelectedMail(null)}></div>
        </div>
      )}

    </div>
  );
}
