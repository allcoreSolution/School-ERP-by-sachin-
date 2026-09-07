import React from 'react';

export default function Showcase() {
  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-t-[3px] border-gray-900 bg-white bg-grid-pattern relative overflow-hidden">
      
      {/* Clean Header Block */}
      <div className="relative z-10 text-center mb-8 flex flex-col items-center max-w-4xl mx-auto py-3 px-4 sm:py-4 sm:px-8">
        <span className="inline-block bg-[#E8F8F5] text-[#09B48E] font-black uppercase tracking-widest text-[8px] sm:text-[9px] px-2.5 py-1 mb-2 rounded-full shadow-sm">
          UI ENGINEERING
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-[1.1] tracking-tighter mb-1.5">
          A UI that actually <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700">looks good.</span>
        </h2>
        <p className="text-gray-600 font-bold leading-relaxed text-[11px] sm:text-[13px] max-w-2xl mx-auto">
          Built with React 18 framing a robust design system. It is clinically clean, inherently fast, and completely frictionless for school staff to utilize without extensive onboarding.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
        
        {/* Mockup 1: Dashboard */}
        <div className="relative group w-full h-[350px] sm:h-[450px] cursor-pointer">
           <div className="absolute inset-0 bg-gray-900 translate-x-3 translate-y-3 transition-transform duration-500 group-hover:translate-x-5 group-hover:translate-y-5 rounded-sm" />
           <div className="relative w-full h-full bg-white border-[3px] border-gray-900 rounded-sm flex flex-col transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1">
              
              <div className="w-full flex-1 bg-slate-50 p-2 sm:p-4 overflow-hidden relative border-b-[3px] border-gray-900">
                 {/* Fake Screenshot inner body */}
                 <div className="w-full h-[150%] bg-white border-[2px] border-gray-900 flex overflow-hidden shadow-[3px_3px_0_0_#111827] group-hover:-translate-y-2 transition-transform duration-500">
                    {/* Sidebar */}
                    <div className="w-[18%] h-full bg-gray-950 p-2 flex flex-col gap-2">
                       <div className="w-full h-3 bg-gray-700 mb-3" />
                       <div className="w-3/4 h-1.5 bg-emerald-500 mb-1" />
                       <div className="w-2/3 h-1.5 bg-gray-600" />
                       <div className="w-full h-1.5 bg-gray-600" />
                       <div className="w-1/2 h-1.5 bg-gray-600" />
                    </div>
                    {/* Main Content */}
                    <div className="flex-1 p-3 flex flex-col gap-3">
                       <div className="w-full flex justify-between">
                         <div className="w-1/3 h-4 bg-gray-200" />
                         <div className="w-1/6 h-4 bg-amber-200" />
                       </div>
                       <div className="grid grid-cols-4 gap-2 h-16">
                          <div className="bg-emerald-50 border-[2px] border-emerald-200" />
                          <div className="bg-blue-50 border-[2px] border-blue-200" />
                          <div className="bg-purple-50 border-[2px] border-purple-200" />
                          <div className="bg-amber-50 border-[2px] border-amber-300" />
                       </div>
                       <div className="grid grid-cols-6 grid-rows-4 gap-1.5 flex-1 mt-2">
                          {[...Array(24)].map((_, i) => (
                             <div key={i} className="bg-gray-100 border-[1px] border-gray-300 hover:bg-gray-200 transition-colors" />
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
              <div className="h-14 bg-white flex justify-between items-center px-4 sm:px-6">
                 <span className="font-black text-gray-900 text-[13px] sm:text-[15px] uppercase tracking-wide">Redesigned Dashboard</span>
                 <span className="text-gray-900 bg-amber-400 border-[2px] border-gray-900 px-3 py-1 text-[9px] font-black uppercase tracking-widest shadow-[2px_2px_0_0_#111827]">V 3.6 NEW</span>
              </div>

           </div>
        </div>

        {/* Mockup 2: Online Exams */}
        <div className="relative group w-full h-[350px] sm:h-[450px] cursor-pointer">
           <div className="absolute inset-0 bg-gray-900 translate-x-3 translate-y-3 transition-transform duration-500 group-hover:translate-x-5 group-hover:translate-y-5 rounded-sm" />
           <div className="relative w-full h-full bg-white border-[3px] border-gray-900 rounded-sm flex flex-col transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1">
              
              <div className="w-full flex-1 bg-slate-50 p-2 sm:p-4 overflow-hidden relative border-b-[3px] border-gray-900">
                 {/* Fake Screenshot inner body */}
                 <div className="w-full h-[150%] bg-white border-[2px] border-gray-900 flex overflow-hidden shadow-[3px_3px_0_0_#111827] group-hover:-translate-y-2 transition-transform duration-500 delay-75">
                    {/* Sidebar */}
                    <div className="w-[18%] h-full bg-gray-950 p-2 flex flex-col gap-2">
                       <div className="w-full h-3 bg-gray-700 mb-3" />
                       <div className="w-full h-1.5 bg-amber-500 mb-1" />
                       <div className="w-2/3 h-1.5 bg-gray-600" />
                       <div className="w-full h-1.5 bg-gray-600" />
                    </div>
                    {/* Main Content */}
                    <div className="flex-1 p-3 flex flex-col gap-3">
                       <div className="w-2/3 h-4 bg-gray-200 mb-1" />
                       <div className="grid grid-cols-3 gap-2 h-20">
                          <div className="bg-blue-50 border-[2px] border-gray-900 shadow-[1px_1px_0_0_#111827] group-hover:translate-y-2 transition-transform" />
                          <div className="bg-emerald-50 border-[2px] border-gray-900 shadow-[1px_1px_0_0_#111827] group-hover:translate-y-1 transition-transform delay-75" />
                          <div className="bg-amber-50 border-[2px] border-gray-900 shadow-[1px_1px_0_0_#111827] group-hover:translate-y-3 transition-transform delay-150" />
                       </div>
                       <div className="w-1/3 h-3 bg-gray-200 mt-2" />
                       <div className="flex flex-col gap-1.5 w-2/3 mt-1">
                          <div className="h-6 bg-gray-100 border-[1.5px] border-gray-400" />
                          <div className="h-6 bg-gray-100 border-[1.5px] border-gray-400" />
                          <div className="h-6 bg-gray-100 border-[1.5px] border-gray-400" />
                       </div>
                       <div className="w-full h-12 bg-indigo-50 border-[2px] border-indigo-400 mt-auto" />
                    </div>
                 </div>
              </div>

              <div className="h-14 bg-white flex justify-between items-center px-4 sm:px-6">
                 <span className="font-black text-gray-900 text-[13px] sm:text-[15px] uppercase tracking-wide">Online Exams Pro (CBT)</span>
                 <span className="text-gray-900 group-hover:translate-x-2 transition-transform font-bold">→</span>
              </div>

           </div>
        </div>

      </div>

    </section>
  );
}
