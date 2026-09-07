import React from 'react';

export default function Deliverables() {
  const items = [
    { title: 'Super Admin SaaS Panel', sub: 'REACT 18 • UNLIMITED ROUTING', desc: 'Centralized mega-dashboard to onboard unlimited schools, manage platform licenses, track global analytics, and handle super-admin communications.', icon: '👑' },
    { title: 'School ERP Web Panel', sub: 'REACT 18 • TAILWIND CSS', desc: 'The core administrative portal assigned to each school tenant. Manages HR, Academics, Finance, and 30+ sophisticated sub-modules out of the box.', icon: '🖥️' },
    { title: 'Student & Parent App', sub: 'FLUTTER • IOS & ANDROID', desc: 'Native mobile application for parents & students. Allows instant fee payments, live GPS bus tracking, CBT exam results, and biometric attendance sync.', icon: '📱' },
    { title: 'Staff & Teacher App', sub: 'FLUTTER • IOS & ANDROID', desc: 'Dedicated native app for teachers and management. Enables wireless QR attendance, leave approvals, lesson planning and instant parent messaging.', icon: '👩‍🏫' },
    { title: 'Dedicated Driver App', sub: 'FLUTTER • IOS & ANDROID', desc: 'GPS-enabled driver portal to livestream bus locations to parents, manage fuel logs, track routed maintenance, and broadcast emergency alerts.', icon: '🚌' },
    { title: 'Centralized API Gateway', sub: 'NODE.JS • MONGODB', desc: 'The core monolithic engine powering the entire ecosystem. Secured by JWT, advanced middleware, and RBAC tokenization. Engineered for heavy loads.', icon: '⚙️' },
    { title: 'Full Commercial License', sub: '100% OPEN SOURCE', desc: 'Unencrypted access to all repositories. No IonCube, no hidden API callbacks, no domain locks. White-label and sell it completely as your own software property.', icon: '📑' },
    { title: 'VIP Support & Updates', sub: '12 MONTHS INCLUDED', desc: 'Direct WhatsApp & Email access to our engineering team for setup assistance, bug-fixes, and free GitHub repository updates for your first entire year.', icon: '🛠️' },
  ];

  return (
    <section className="py-20 lg:py-24 px-4 sm:px-6 lg:px-12 max-w-[1400px] mx-auto border-t-[3px] border-gray-900 bg-[#FBFBFB]">
      
      {/* Top Tech Stack Banner */}
      <div className="w-full mb-16">
        <div className="flex justify-start sm:justify-center items-center bg-gray-950 text-white px-6 py-3 font-black uppercase text-[10px] lg:text-[11px] tracking-widest overflow-x-auto gap-8 hide-scrollbar flex-nowrap min-w-full rounded shadow-[4px_4px_0_0_#111827]">
          <span className="whitespace-nowrap flex items-center gap-2 text-cyan-400">100% Unencrypted Source</span>
          <span className="whitespace-nowrap flex items-center gap-2 text-emerald-400">Perpetual Commercial License</span>
          <span className="whitespace-nowrap flex items-center gap-2 text-amber-400">Deploy Anywhere</span>
        </div>
      </div>

      <div className="mb-14 text-center mx-auto flex flex-col items-center max-w-4xl">
         <span className="inline-block bg-white text-gray-900 font-black uppercase tracking-widest text-[11px] px-4 py-1.5 border-[2px] border-gray-900 mb-6 shadow-[3px_3px_0_0_#111827]">
           Complete Architectural Package
         </span>
         <h2 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-[1.1] mb-6">
           One payment. <span className="text-amber-500 underline decoration-gray-900 decoration-[4px]">Eight deliverables.</span>
         </h2>
         <p className="text-sm sm:text-base text-gray-600 font-bold leading-relaxed max-w-2xl px-4">
           We don't lock core features behind recurring SaaS taxes. You receive the complete frontend, backend, and all three mobile applications packed tightly into one unencrypted zip file. Hand it to your engineers and launch your own empire.
         </p>
      </div>

      {/* Luxury 2-Column Horizontal Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 lg:gap-4 max-w-6xl mx-auto">
        {items.map((item, i) => (
          <div key={i} className="relative group">
            {/* Hard offset shadow */}
            <div className="absolute inset-0 bg-gray-900 translate-x-[3px] translate-y-[3px] transition-transform group-hover:translate-x-[4px] group-hover:translate-y-[4px] rounded-sm" />
            
            {/* Main Card */}
            <div className="relative border-[2px] border-gray-900 p-3 sm:p-4 flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 bg-white hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all h-full rounded-sm">
              
              {/* Massive Icon Box (Shrunk) */}
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gray-50 border-[2px] border-gray-900 flex items-center justify-center text-xl sm:text-2xl shadow-[2px_2px_0_0_#111827] transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]">
                {item.icon}
              </div>
              
              {/* Content Panel */}
              <div className="flex flex-col flex-1 pl-1 border-l-0 sm:border-l-[2px] sm:border-gray-100 sm:border-dashed sm:pl-3 w-full text-center sm:text-left">
                 <p className="font-black tracking-widest uppercase text-amber-500 text-[8px] sm:text-[9px] mb-0.5 sm:mb-1">
                   {item.sub}
                 </p>
                 <h3 className="font-black text-gray-900 leading-tight mb-1 sm:mb-1.5 text-[14px] sm:text-[16px]">
                   {item.title}
                 </h3>
                 <p className="text-gray-500 font-medium text-[10px] sm:text-[11px] leading-tight">
                   {item.desc}
                 </p>
              </div>
              
            </div>
          </div>
        ))}
      </div>
      
    </section>
  );
}
