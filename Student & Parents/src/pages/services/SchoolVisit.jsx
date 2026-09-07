import React, { useState } from 'react';
import { CalendarX, CalendarClock, MessageCircle, Calendar, X } from 'lucide-react';

export default function SchoolVisit() {
  const [activeTab, setActiveTab] = useState('Walk-in'); // 'Walk-in' | 'Appointment'
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-4 md:p-6 max-w-[900px] mx-auto min-h-screen bg-[#f8f9fa] relative">
      
      {/* Header */}
      <h1 className="text-[26px] font-bold text-gray-900 tracking-tight mb-8">School Visit</h1>
      
      {/* Tabs */}
      <div className="flex w-full border-b border-gray-200 mb-6">
         <button 
            onClick={() => setActiveTab('Walk-in')}
            className={`flex-1 text-center py-3 text-[14px] font-bold transition-colors border-b-[3px] 
               ${activeTab === 'Walk-in' ? 'border-indigo-800 text-indigo-800' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
         >
            Walk-in
         </button>
         <button 
            onClick={() => setActiveTab('Appointment')}
            className={`flex-1 text-center py-3 text-[14px] font-bold transition-colors border-b-[3px] 
               ${activeTab === 'Appointment' ? 'border-indigo-800 text-indigo-800' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
         >
            Appointment
         </button>
      </div>

      {/* Tab Contents */}
      <div className="w-full flex justify-center animate-in fade-in duration-200">
         
         {activeTab === 'Walk-in' && (
            <div className="bg-white border border-gray-200 rounded-none shadow-sm w-full max-w-3xl flex flex-col items-center justify-center p-16 text-center">
               <CalendarX className="w-16 h-16 text-gray-300 mb-4" strokeWidth={1.5} />
               <h2 className="text-[20px] font-black text-[#1e3a8a] tracking-tight uppercase mb-1">No Walk-ins</h2>
               <p className="text-[13.5px] text-gray-400 font-medium tracking-wide">You have no recorded walk-in visits.</p>
            </div>
         )}

         {activeTab === 'Appointment' && (
            <div className="w-full max-w-3xl flex flex-col gap-4">
               {/* Appointment Card */}
               <div className="bg-white border border-gray-200 rounded-none shadow-sm flex items-start gap-4 p-5 hover:shadow-md transition-shadow">
                  
                  {/* Icon Block */}
                  <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 flex items-center justify-center rounded-none flex-shrink-0 shadow-sm mt-0.5">
                     <CalendarClock className="w-5 h-5 text-indigo-600" />
                  </div>
                  
                  <div className="flex-1 flex flex-col pt-0.5">
                     <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-[15px] font-extrabold text-[#111827] tracking-tight leading-none text-wrap">Anil Verma (Father)</h3>
                        <span className="bg-blue-50 text-blue-500 font-extrabold text-[9px] uppercase px-2 py-1 tracking-widest rounded-none border border-blue-100 shadow-sm flex-shrink-0">Scheduled</span>
                     </div>
                     
                     <div className="flex flex-col gap-1.5 mt-1">
                        <div className="flex items-center gap-2 text-gray-500 text-[12.5px] font-medium">
                           <Calendar className="w-3.5 h-3.5 flex-shrink-0" /> 07 Sep 2026, 12:00 PM
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 text-[12.5px] font-medium">
                           <MessageCircle className="w-3.5 h-3.5 flex-shrink-0" /> want to talk related to study
                        </div>
                     </div>
                  </div>
                  
               </div>
            </div>
         )}

      </div>

      {/* Floating Action Button */}
      {/* We apply 'rounded-none' to enforce strict square shape based on user preferences */}
      <button 
         onClick={() => setIsModalOpen(true)}
         className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 bg-[#f97316] hover:bg-[#ea580c] text-white px-6 py-3.5 font-bold text-[15px] rounded-none shadow-[0_5px_15px_rgba(249,115,22,0.3)] flex items-center gap-2 transition-all hover:-translate-y-1 z-40 outline-none focus:ring-4 focus:ring-orange-200"
      >
         <span className="text-xl leading-none font-medium mb-0.5">+</span> Add 
      </button>

      {/* Add Appointment Modal */}
      {isModalOpen && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div 
               className="bg-white rounded-none shadow-2xl w-full max-w-lg flex flex-col border border-gray-300 transform scale-100 transition-transform"
               onClick={(e) => e.stopPropagation()}
            >
               <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-[#fefefe]">
                  <h2 className="text-[17px] font-extrabold text-gray-900 tracking-tight">Request Appointment</h2>
                  <button onClick={() => setIsModalOpen(false)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-none transition-colors">
                     <X className="w-5 h-5"/>
                  </button>
               </div>
               
               <div className="p-6 flex flex-col gap-5 bg-white">
                  <div className="flex flex-col gap-1.5">
                     <label className="text-[11.5px] font-bold text-gray-500 uppercase tracking-widest">Purpose of Visit</label>
                     <input type="text" placeholder="e.g. Discuss academic performance" className="w-full px-4 py-2.5 border border-gray-200 rounded-none text-[13.5px] outline-none focus:border-indigo-500 transition-colors bg-gray-50/50" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                     <div className="flex flex-col gap-1.5">
                        <label className="text-[11.5px] font-bold text-gray-500 uppercase tracking-widest">Date</label>
                        <input type="date" className="w-full px-4 py-2.5 border border-gray-200 rounded-none text-[13.5px] outline-none focus:border-indigo-500 transition-colors bg-gray-50/50 text-gray-700" />
                     </div>
                     <div className="flex flex-col gap-1.5">
                        <label className="text-[11.5px] font-bold text-gray-500 uppercase tracking-widest">Time</label>
                        <input type="time" className="w-full px-4 py-2.5 border border-gray-200 rounded-none text-[13.5px] outline-none focus:border-indigo-500 transition-colors bg-gray-50/50 text-gray-700" />
                     </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                     <label className="text-[11.5px] font-bold text-gray-500 uppercase tracking-widest">Who to Meet?</label>
                     <select className="w-full px-4 py-2.5 border border-gray-200 rounded-none text-[13.5px] outline-none focus:border-indigo-500 transition-colors bg-gray-50/50 text-gray-700">
                        <option>Class Teacher</option>
                        <option>Principal</option>
                        <option>Accounts Department</option>
                     </select>
                  </div>
               </div>

               <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
                  <button onClick={() => setIsModalOpen(false)} className="px-5 py-2 text-[13px] font-bold text-gray-600 border border-gray-300 rounded-none hover:bg-gray-100 transition-colors">
                     Cancel
                  </button>
                  <button onClick={() => { alert('Appointment submitted!'); setIsModalOpen(false); }} className="px-5 py-2 text-[13px] font-bold text-white bg-[#f97316] rounded-none shadow-sm hover:bg-[#ea580c] transition-colors">
                     Submit Request
                  </button>
               </div>
            </div>
         </div>
      )}

    </div>
  );
}
