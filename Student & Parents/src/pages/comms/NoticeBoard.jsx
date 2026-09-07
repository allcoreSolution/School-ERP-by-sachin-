import React from 'react';
import { Clock, Megaphone, ArrowRight } from 'lucide-react';

const notices = [
  { 
    id: 1, 
    date: '04 Sep, 2026', 
    title: 'Happy Janmastami',
    timeAgo: '1 day ago',
    body: '🌲 *श्री कृष्ण जन्माष्टमी की हार्दिक शुभकामनाएं* 🌟 🌲मुरली की धुन और राधा-कृष्ण के प्रेम से आपके जीवन में सुख, शांति और समृद्धि बनी रहे।🙏 कान्हा जी की कृपा सदैव आप और आपके परिवार पर बनी रहे।🙏 *जय श्री कृष्ण* 💙🌸 *राधे-राधे* 🌸❤️ श्री कृष्ण जन्माष्टमी...' 
  },
  { 
    id: 2, 
    date: '30 Jul, 2026', 
    title: 'Demo: Library week — bring back borrowed books',
    timeAgo: '1 month ago',
    body: 'It is Library Week. Please return any borrowed books by the end of this week to avoid a late fee.' 
  },
  { 
    id: 3, 
    date: '26 Feb, 2026', 
    title: 'Parent-Teacher Meeting',
    timeAgo: '6 months ago',
    body: 'A Parent-Teacher Meeting (PTM) is scheduled on 18th February 2026. Parents are requested to attend and discuss their child\'s academic progress.' 
  },
];

export default function NoticeBoard() {
  return (
    <div className="p-4 md:p-6 max-w-[1200px] mx-auto space-y-8 bg-[#f8f9fa] min-h-screen">
      <h1 className="text-[22px] font-bold text-[#1f2937] tracking-tight">Notice Board</h1>

      <div className="ml-5 md:ml-8 border-l border-gray-200 mt-10 pt-2 pb-10">
        {notices.map((notice, idx) => (
          <div key={notice.id} className={`relative ${idx !== notices.length - 1 ? 'mb-14' : ''}`}>
            
            {/* Date Pill */}
            <div className="absolute -left-[45px] -top-6">
               <span className="bg-[#4f46e5] text-white px-3.5 py-1.5 rounded-full text-[10px] font-black tracking-widest shadow-sm">
                 {notice.date}
               </span>
            </div>

            {/* Megaphone Icon on the Line */}
            <div className="absolute -left-[14px] top-[14px] w-7 h-7 rounded-full bg-[#f2f4ff] border-[3px] border-[#f8f9fa] flex items-center justify-center z-10 shadow-sm">
               <Megaphone className="w-3.5 h-3.5 text-[#4f46e5]" />
            </div>

            {/* Content Box */}
            <div className="ml-8 border border-gray-200 rounded-none bg-white shadow-sm hover:shadow-md transition-shadow">
               
               <div className="px-5 py-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 gap-2">
                     <h3 className="text-[14px] font-bold text-gray-800 tracking-tight leading-snug">
                        {notice.title}
                     </h3>
                     <span className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 whitespace-nowrap">
                        <Clock className="w-3 h-3" strokeWidth={2.5}/> {notice.timeAgo}
                     </span>
                  </div>
                  <p className="text-[12.5px] text-gray-600 leading-relaxed font-medium">
                     {notice.body}
                  </p>
               </div>
               
               <div className="px-5 py-2.5 border-t border-gray-50 flex justify-end bg-white relative overflow-hidden">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-[11.5px] font-bold text-gray-700 bg-white border border-gray-300 rounded-none shadow-sm hover:bg-gray-50 hover:text-gray-900 transition-colors focus:ring-2 focus:ring-indigo-100 z-10">
                     Read more <ArrowRight className="w-3.5 h-3.5" />
                  </button>
               </div>

            </div>
          </div>
        ))}

        {/* Bottom Cap for Timeline (Optional) */}
        <div className="absolute -left-[4.5px] -bottom-2 w-[9px] h-[9px] bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
}
