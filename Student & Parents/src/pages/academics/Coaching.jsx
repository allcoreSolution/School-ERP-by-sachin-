import React from 'react';
import { Target, Search, BookOpen, Clock } from 'lucide-react';

export default function Coaching() {
  return (
    <div className="h-full flex flex-col p-6 overflow-hidden">
      
      {/* HEADER */}
      <div className="flex items-center justify-between flex-shrink-0 mb-6">
        <div>
          <h1 className="text-[22px] font-black uppercase text-gray-800 tracking-tighter leading-none">
            Coaching Center
          </h1>
          <p className="text-[11px] font-bold text-gray-400 tracking-widest uppercase mt-1">
            Extra-curricular & Competitive Training
          </p>
        </div>
        <div className="relative w-64 block">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search programs..." 
            className="w-full bg-white border border-gray-300 rounded-none pl-9 pr-3 py-2 text-[11px] font-bold uppercase tracking-widest focus:outline-none focus:border-indigo-500 placeholder-gray-400 shadow-sm"
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pb-8">
         
         {/* Card 1 */}
         <div className="bg-white border border-gray-200 shadow-sm flex flex-col hover:border-indigo-300 transition-colors cursor-pointer group">
            <div className="h-32 bg-indigo-50 flex items-center justify-center border-b border-gray-200 relative overflow-hidden">
               <Target className="w-12 h-12 text-indigo-300 group-hover:scale-110 transition-transform duration-500" />
               <div className="absolute top-2 right-2 px-2 py-0.5 bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest shadow-sm">
                  Active
               </div>
            </div>
            <div className="p-5 flex flex-col flex-1">
               <h3 className="text-[14px] font-black text-gray-800 uppercase tracking-tight mb-2 group-hover:text-indigo-600 transition-colors">JEE Advanced Prep</h3>
               <p className="text-[11px] font-medium text-gray-500 leading-relaxed mb-4 flex-1">Intensive coaching module for IIT-JEE Mathematics and Physics.</p>
               
               <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest pt-4 border-t border-gray-100">
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 4:00 PM (Daily)</span>
               </div>
            </div>
         </div>

         {/* Card 2 */}
         <div className="bg-white border border-gray-200 shadow-sm flex flex-col hover:border-green-300 transition-colors cursor-pointer group">
            <div className="h-32 bg-green-50 flex items-center justify-center border-b border-gray-200 relative overflow-hidden">
               <BookOpen className="w-12 h-12 text-green-300 group-hover:scale-110 transition-transform duration-500" />
               <div className="absolute top-2 right-2 px-2 py-0.5 bg-green-600 text-white text-[9px] font-black uppercase tracking-widest shadow-sm">
                  Available
               </div>
            </div>
            <div className="p-5 flex flex-col flex-1">
               <h3 className="text-[14px] font-black text-gray-800 uppercase tracking-tight mb-2 group-hover:text-green-600 transition-colors">Debate & Oratory</h3>
               <p className="text-[11px] font-medium text-gray-500 leading-relaxed mb-4 flex-1">Public speaking and debating skills development program for structural arguments.</p>
               
               <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest pt-4 border-t border-gray-100">
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Sat 10:00 AM</span>
               </div>
            </div>
         </div>

      </div>
    </div>
  );
}
