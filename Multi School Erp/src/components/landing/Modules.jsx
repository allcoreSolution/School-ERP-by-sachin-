import React from 'react';

export default function Modules() {
  const modules = [
    { title: 'Student Information', label: 'CORE', type: 'core', icon: '👤' },
    { title: 'Academics', label: 'CORE', type: 'core', icon: '📚' },
    { title: 'Fees Collection', label: 'CORE', type: 'core', icon: '💰' },
    { title: 'Human Resource', label: 'CORE', type: 'core', icon: '👥' },
    { title: 'Offline Exams', label: 'CORE', type: 'core', icon: '📝' },
    { title: 'Certificates', label: 'CORE', type: 'core', icon: '📜' },
    { title: 'ID Card Designer', label: 'CORE', type: 'core', icon: '🪪' },
    
    { title: 'CCTV Live View', label: 'NEW', type: 'new', icon: '📹' },
    { title: 'Parent–Teacher Chat', label: 'NEW', type: 'new', icon: '💬' },
    { title: 'Surveys & Feedback', label: 'NEW', type: 'new', icon: '📊' },
    { title: 'Engagement & Creatives', label: 'NEW', type: 'new', icon: '🎨' },
    { title: 'Compliance & Governance', label: 'NEW', type: 'new', icon: '🛡️' },
    { title: 'Online Exams Pro (CBT)', label: 'NEW', type: 'new', icon: '💻' },
    { title: 'Admission CRM', label: 'NEW', type: 'new', icon: '🎯' },
    { title: 'School Website Builder', label: 'NEW', type: 'new', icon: '🌐' },
    { title: 'Live Classes', label: 'NEW', type: 'new', icon: '🎥' },
    { title: 'Biometric 2-Way Sync', label: 'NEW', type: 'new', icon: '🖐️' },
    
    { title: 'Homework', type: 'standard', icon: '✏️' },
    { title: 'Library Management', type: 'standard', icon: '📖' },
    { title: 'Transport', type: 'standard', icon: '🚌' },
    { title: 'Hostel', type: 'standard', icon: '🏠' },
    { title: 'Inventory', type: 'standard', icon: '📦' },
    { title: 'Asset Management', type: 'standard', icon: '🖨️' },
    { title: 'AI Assistant', type: 'standard', icon: '🤖' },
    { title: 'Knowledge Base', type: 'standard', icon: '🧠' },
    { title: 'Study Center', type: 'standard', icon: '🎓' },
    { title: 'Accounts & Finance', type: 'standard', icon: '📈' },
    { title: 'Front Office', type: 'standard', icon: '🏦' },
    { title: 'Communications', type: 'standard', icon: '📧' },
    { title: 'CBC / Competency', type: 'standard', icon: '📋' },
    { title: 'Health Records', type: 'standard', icon: '🩺' },
    { title: 'Apps Center', type: 'standard', icon: '📱' },
    { title: 'Parent-Teacher Meetings', type: 'standard', icon: '🤝' },
    { title: 'Lesson Planner', type: 'standard', icon: '📐' },
    { title: 'Digital Evaluation', type: 'standard', icon: '✅' },
    { title: 'QR Code Attendance', type: 'standard', icon: '📲' },
    { title: 'Assessment', type: 'standard', icon: '📊' }
  ];

  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-12 w-full border-t-[3px] border-gray-900 overflow-hidden bg-white/50 bg-grid-pattern relative">
      
      {/* Clean Header Block */}
      <div className="relative z-10 text-center mb-8 flex flex-col items-center max-w-4xl mx-auto py-3 px-4 sm:py-4 sm:px-8">
        <span className="inline-block bg-[#E8F8F5] text-[#09B48E] font-black uppercase tracking-widest text-[8px] sm:text-[9px] px-2.5 py-1 mb-2 rounded-full shadow-sm">
          38 COMPREHENSIVE MODULES
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-[1.1] tracking-tighter mb-1.5">
          Every module a school needs. <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-700">Toggle on or off.</span>
        </h2>
        <p className="text-gray-600 font-bold leading-relaxed text-[11px] sm:text-[13px] max-w-2xl mx-auto">
          Core architecture remains permanently active. Selectively toggle optional modules per tenant to maintain cognitive absolute simplicity. <strong className="text-gray-900">9 new advanced endpoints shipped in v3.6</strong> — CCTV live view streaming, integrated Parent-Teacher matrix, CRM pipelines and autonomous compliance routing.
        </p>
      </div>

      {/* 38 Module Massive Horizontal Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4 mb-20 max-w-[1400px] mx-auto">
        {modules.map((mod, i) => {
          
          let cardTheme = "bg-white border border-gray-100 shadow-sm";
          let labelTheme = "";

          if (mod.type === 'core') {
            cardTheme = "bg-[#F3FFFC] border border-[#09B48E]/30 shadow-sm";
            labelTheme = "bg-[#09B48E] text-white";
          } else if (mod.type === 'new') {
            cardTheme = "bg-[#FFFBF0] border border-amber-500/30 shadow-sm";
            labelTheme = "bg-amber-500 text-white";
          }

          return (
            <div 
              key={i} 
              className={`relative group cursor-pointer block h-full`}
            >
              {/* Soft shadow background */}
              
              {/* Horizontal Pill Card */}
              <div 
                className={`relative p-3 px-4 rounded-xl transition-all h-full flex items-center justify-between gap-3 hover:-translate-y-1 hover:shadow-md ${cardTheme}`}
              >
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                   <div className="text-2xl rounded-md group-hover:rotate-[360deg] transition-transform duration-700 ease-in-out flex-shrink-0">
                     {mod.icon}
                   </div>
                   <h3 className="font-bold text-gray-900 text-[12px] sm:text-[13px] leading-tight tracking-tight flex-1 truncate">
                     {mod.title}
                   </h3>
                </div>
                {mod.label && (
                   <span className={`flex-shrink-0 font-bold uppercase tracking-widest text-[8px] sm:text-[9px] px-2 py-1 rounded whitespace-nowrap ${labelTheme}`}>
                     {mod.label}
                   </span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Embedded Sub-Features Banner */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-3 sm:gap-4 bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-sm">
         <div className="bg-emerald-50 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 flex items-center justify-center text-lg sm:text-xl text-emerald-500 transition-transform hover:rotate-12">
           ⚡
         </div>
         <p className="text-xs sm:text-[13px] font-[500] text-gray-600 leading-snug">
           <span className="text-gray-900 font-bold uppercase tracking-wide">Intrinsic Utilities included:</span> Gate Pass authorizations, Campus Worker Registries, Dynamic Exam Datesheet Engines, Universal Export Hubs, Azure/R2 Off-site Syncing, Internal Support Tickets, and complete White-label Tenant branding. All seamlessly managed natively.
         </p>
      </div>

    </section>
  );
}
