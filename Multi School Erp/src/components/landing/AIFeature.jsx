import React from 'react';

export default function AIFeature() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-t-[1.5px] border-gray-900">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Left Content */}
        <div className="order-2 lg:order-1">
          <span className="inline-block bg-amber-200 text-amber-900 font-black uppercase tracking-widest text-[10px] sm:text-xs px-3 py-1 border-[1.5px] border-gray-900 mb-6 shadow-[2px_2px_0_0_#111827]">
            AI-POWERED
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-gray-900 leading-[1.15] tracking-tight mb-6">
            AI assistant grounded on your school's actual data.
          </h2>
          <p className="text-gray-600 font-semibold text-[15px] leading-relaxed mb-8">
            Ask natural-language questions and get answers backed by your school's real records — not hallucinated data. Supports Gemini and OpenAI with role-based access controls.
          </p>
          <ul className="space-y-4 text-gray-800 font-bold text-[14px]">
            <li className="flex items-start gap-3">
              <span className="text-[#09B48E] text-lg leading-none mt-0.5">✓</span> 
              <span>"What's today's attendance summary?" — answered in seconds</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#09B48E] text-lg leading-none mt-0.5">✓</span> 
              <span>"Which students have pending fees over ₹5,000?"</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#09B48E] text-lg leading-none mt-0.5">✓</span> 
              <span>Zero hallucination — grounded on your database</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#09B48E] text-lg leading-none mt-0.5">✓</span> 
              <span>Role-based privacy: teachers can't access admin queries</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#09B48E] text-lg leading-none mt-0.5">✓</span> 
              <span>Knowledge Base & Chatbot for parent self-service</span>
            </li>
          </ul>
        </div>
        
        {/* Right Content - Mockup */}
        <div className="order-1 lg:order-2 relative group">
          <div className="absolute inset-0 bg-gray-900 translate-x-3 translate-y-3 transition-transform duration-300 group-hover:translate-x-5 group-hover:translate-y-5" />
          
          <div className="relative bg-white border-[2px] border-gray-900 p-2 sm:p-4 flex flex-col h-[400px] sm:h-[450px]">
            {/* Fake Dashboard Header */}
            <div className="flex border-b-[1.5px] border-gray-900 pb-2 mb-2 gap-2">
              <div className="w-1/4 bg-[#0F172A] border-[1.5px] border-gray-900 text-white flex items-center px-3 py-1 font-black text-[10px]">
                EduPortal
              </div>
              <div className="flex-1 border-[1.5px] border-gray-900 bg-gray-50 flex justify-between items-center px-3 py-1 text-gray-400 text-xs">
                <span>🔍 Search...</span>
                <div className="w-4 h-4 rounded-full bg-gray-300 border-[1px] border-gray-900" />
              </div>
            </div>

            {/* Fake Dashboard Body with Chat popup */}
            <div className="flex flex-1 relative gap-2">
              <div className="w-1/4 bg-[#0F172A] border-[1.5px] border-gray-900 hidden sm:block p-2">
                 <div className="h-6 w-full bg-indigo-500/20 border border-indigo-400 mb-2" />
                 <div className="h-2 w-3/4 bg-gray-700 mb-4" />
                 <div className="h-2 w-1/2 bg-gray-700 mb-4" />
                 <div className="h-2 w-2/3 bg-gray-700 mb-4" />
              </div>
              <div className="flex-1 bg-grid-pattern border-[1.5px] border-gray-900 relative">
                 {/* Dashboard placeholder UI */}
                 <div className="absolute inset-2 grid grid-cols-2 gap-2 opacity-50 pointer-events-none">
                    <div className="bg-white border-[1.5px] border-gray-900 h-20" />
                    <div className="bg-white border-[1.5px] border-gray-900 h-20" />
                    <div className="col-span-2 bg-white border-[1.5px] border-gray-900 h-32" />
                 </div>

                 {/* The AI Assistant Chatbox hovering over dashboard */}
                 <div className="absolute top-2 right-2 bottom-2 w-[240px] sm:w-[280px] bg-white border-[2px] border-gray-900 flex flex-col shadow-[4px_4px_0_0_#111827] z-10 transition-transform hover:-translate-y-1">
                    <div className="bg-amber-100 border-b-[1.5px] border-gray-900 px-3 py-2 flex justify-between items-center">
                       <span className="font-black text-gray-900 text-[11px] flex items-center gap-1.5">
                         <span className="text-amber-500">✨</span> AI Assistant
                       </span>
                       <span className="text-gray-900 font-bold">×</span>
                    </div>
                    
                    <div className="flex-1 p-3 overflow-y-hidden flex flex-col gap-3 text-[9px] sm:text-[10px]">
                       <div className="flex justify-end">
                         <div className="bg-[#0F172A] text-white px-2.5 py-1.5 rounded-l-md rounded-tr-md max-w-[85%] font-medium border border-gray-900 shadow-[1px_1px_0_0_#F59E0B]">
                           What's today's attendance summary?
                         </div>
                       </div>
                       
                       <div className="flex justify-start items-start gap-2">
                         <div className="w-5 h-5 rounded-full bg-purple-100 border border-purple-900 flex items-center justify-center text-[8px] flex-shrink-0">
                           AI
                         </div>
                         <div className="bg-gray-50 border border-gray-900 px-2.5 py-1.5 rounded-r-md rounded-tl-md font-semibold text-gray-700 shadow-[2px_2px_0_0_#111827]">
                           Here is today's summary:<br/><br/>
                           <span className="font-black text-gray-900">Total School:</span> 96.2%<br/>
                           <span className="font-black text-gray-900">Total Students:</span> 1,485 (1,428 Present, 57 Absent)<br/><br/>
                           <span className="text-amber-600 font-bold">1. Grade 9:</span> 97.1%<br/>
                           <span className="text-amber-600 font-bold">2. Grade 10:</span> 95.8%
                         </div>
                       </div>
                    </div>
                    
                    <div className="p-2 border-t-[1.5px] border-gray-900 bg-gray-50">
                       <div className="w-full bg-white border border-gray-900 h-7 flex items-center px-2 justify-between">
                          <span className="text-gray-400 text-[9px]">Type your query here...</span>
                          <div className="w-4 h-4 bg-[#0F172A] flex items-center justify-center text-white text-[8px]">↗</div>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
