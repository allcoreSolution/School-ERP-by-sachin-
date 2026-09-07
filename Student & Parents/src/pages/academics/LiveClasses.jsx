import React, { useState } from 'react';
import { List, Calendar as CalIcon, Video, VideoOff, History, Archive } from 'lucide-react';

export default function LiveClasses() {
  const [view, setView] = useState('List View');

  return (
    <div className="p-4 md:p-6 max-w-[1200px] mx-auto space-y-6">
      {/* Header */}
      <div>
         <h1 className="text-[22px] font-bold text-gray-800 tracking-tight">Live Classes</h1>
         <p className="text-[13px] text-gray-500 mt-1">Join interactive live classrooms and track upcoming schedules for Rajesh Singh</p>
      </div>
      
      {/* View Toggle */}
      <div className="flex border border-gray-200 w-fit rounded shadow-sm overflow-hidden bg-white">
         <button onClick={() => setView('List View')} className={`flex items-center gap-1.5 px-4 py-1.5 text-[12px] font-bold transition-colors ${view === 'List View' ? 'bg-[#3b82f6] text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
            <List className="w-4 h-4" /> List View
         </button>
         <button onClick={() => setView('Calendar View')} className={`flex items-center gap-1.5 px-4 py-1.5 text-[12px] font-bold transition-colors ${view === 'Calendar View' ? 'bg-[#3b82f6] text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
            <CalIcon className="w-4 h-4" /> Calendar View
         </button>
      </div>

      {/* Active table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
         <div className="bg-[#22c55e] text-white px-4 py-3 flex items-center gap-2">
            <Video className="w-5 h-5" strokeWidth={2.5} />
            <h2 className="text-[14px] font-bold tracking-wide">Active & Scheduled Classes</h2>
         </div>
         <table className="w-full text-left border-collapse">
            <thead className="bg-[#ffffff] border-b border-gray-200 text-[12px] font-bold text-[#1f2937]">
               <tr>
                  <th className="py-3 px-4 text-left">Title</th>
                  <th className="py-3 px-4 text-center">Subject</th>
                  <th className="py-3 px-4 text-center">Teacher</th>
                  <th className="py-3 px-4 text-center">Start Date & Time</th>
                  <th className="py-3 px-4 text-center">Duration</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-center">Action</th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td colSpan={7} className="py-[60px]">
                     <div className="flex flex-col items-center justify-center text-center">
                        <VideoOff className="w-12 h-12 text-gray-400 opacity-80 mb-3" strokeWidth={1.5} />
                        <p className="text-[13.5px] text-gray-500 font-medium">No active or scheduled classes found for your child.</p>
                     </div>
                  </td>
               </tr>
            </tbody>
         </table>
      </div>

      {/* Past Archive table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
         <div className="bg-[#6b7280] text-white px-4 py-3 flex items-center gap-2">
            <History className="w-5 h-5" strokeWidth={2.5} />
            <h2 className="text-[14px] font-bold tracking-wide">Past Classes Archive</h2>
         </div>
         <table className="w-full text-left border-collapse">
            <thead className="bg-[#ffffff] border-b border-gray-200 text-[12px] font-bold text-[#1f2937]">
               <tr>
                  <th className="py-3 px-4 text-left">Title</th>
                  <th className="py-3 px-4 text-center">Subject</th>
                  <th className="py-3 px-4 text-center">Teacher</th>
                  <th className="py-3 px-4 text-center">Date & Time</th>
                  <th className="py-3 px-4 text-center">Duration</th>
                  <th className="py-3 px-4 text-center">Recording</th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td colSpan={6} className="py-[60px]">
                     <div className="flex flex-col items-center justify-center text-center">
                        <Archive className="w-12 h-12 text-gray-400 opacity-80 mb-3" strokeWidth={1.5} />
                        <p className="text-[13.5px] text-gray-500 font-medium">No past classes archived.</p>
                     </div>
                  </td>
               </tr>
            </tbody>
         </table>
      </div>
    </div>
  );
}
