import React from 'react';

export default function Ecosystem() {
  const apps = [
    { title: 'Super Admin Control', sub: 'CLOUDFLARE ROUTING • SAAS', desc: 'Global visibility. Monitor all onboarded schools, control subscription plans, dispatch system-wide directives, and manage SaaS financial revenues.', icon: '🏛️', tag: 'SaaS Core' },
    { title: 'Multi-School Web ERP', sub: 'REACT DASHBOARD • TENANTS', desc: 'The powerhouse web dashboard for assigned schools. Provides complete HR, examination, fee collection, and administrative orchestration capabilities.', icon: '💻', tag: 'Admin Portal' },
    { title: 'Parent & Student App', sub: 'FLUTTER NATIVE • IOS/ANDROID', desc: 'A seamless mobile bridge. Enables instant PG fee payments, live CBT exam results, realtime GPS bus tracking, and direct push interactions.', icon: '👨‍👩‍👦', tag: 'User Mobile' },
    { title: 'Teacher & Staff App', sub: 'FLUTTER NATIVE • IOS/ANDROID', desc: 'Empower your educators on the go. Wireless QR/Biometric attendance marking, leave management, syllabus progression, and parent chatting.', icon: '👩‍🏫', tag: 'Staff Mobile' },
    { title: 'Driver GPS Agent', sub: 'MAPBOX / OSM SYNC', desc: 'Turn any smartphone into an advanced fleet tracker. Features live pathcasting, instant SOS broadcast triggers, and real-time student boarding logs.', icon: '🚌', tag: 'Logistics' },
    { title: 'Windows Biometric API', sub: 'ZKTECO ADMS PROTOCOL', desc: 'Standalone secure desktop executable bridging physical hardware directly with the cloud. Uninterrupted low-latency push synchronization.', icon: '🔒', tag: 'Hardware' },
  ];

  return (
    <section className="py-20 lg:py-24 px-4 sm:px-6 lg:px-12 bg-white border-t-[3px] border-gray-900 min-h-[90vh] flex flex-col justify-center">
      <div className="max-w-[1400px] mx-auto w-full">
        
        {/* Header Block */}
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="inline-block bg-[#E8F8F5] text-[#09B48E] font-black uppercase tracking-widest text-[11px] px-4 py-1.5 border-[2px] border-gray-900 mb-6 shadow-[3px_3px_0_0_#111827]">
            ✦ One Platform. Complete Solution
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tighter mb-4 leading-none">
            6 Apps. <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700">One Ecosystem.</span>
          </h2>
          <p className="text-gray-500 font-bold max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
            All six architecture layers are perfectly orchestrated to communicate via a centralized neural API. No data silos. No third-party API dependencies. 
          </p>
        </div>

        {/* 3x2 Massive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 max-w-6xl mx-auto">
          {apps.map((app, i) => (
            <div key={i} className="relative group cursor-pointer block h-full">
              
              {/* Thick brutalist shadow base */}
              <div className="absolute inset-0 bg-gray-900 translate-x-[3px] translate-y-[3px] transition-transform group-hover:translate-x-1 group-hover:translate-y-1 rounded-sm" />
              
              <div className="relative bg-white border-[2px] border-gray-900 p-3 sm:p-4 flex flex-col items-start hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all h-full rounded-sm">
                
                {/* Header Row: Icon + Tag */}
                <div className="flex justify-between items-start w-full mb-2.5 sm:mb-3">
                   <div className="bg-gray-50 border-[2px] border-gray-900 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-lg sm:text-xl shadow-[1.5px_1.5px_0_0_#111827] group-hover:rotate-[360deg] transition-transform duration-700 ease-in-out">
                     {app.icon}
                   </div>
                   <span className="bg-amber-100 text-amber-800 border-[1.5px] border-amber-900/50 font-black tracking-widest uppercase text-[7.5px] sm:text-[8px] px-2 py-0.5 shadow-[1px_1px_0_0_rgba(120,53,15,0.3)] mt-0.5">
                     {app.tag}
                   </span>
                </div>
                
                {/* Text Content */}
                <h3 className="text-base sm:text-[17px] font-black text-gray-900 mb-0.5 leading-tight tracking-tight">{app.title}</h3>
                <p className="font-black tracking-widest uppercase text-amber-500 text-[8px] sm:text-[8.5px] mb-2">
                  {app.sub}
                </p>
                <p className="text-gray-500 font-medium text-[10.5px] sm:text-[11px] leading-tight mb-4 flex-grow">
                  {app.desc}
                </p>
                
                {/* Footer Action */}
                <div className="mt-auto w-full pt-2.5 border-t-2 border-dashed border-gray-200">
                  <span className="text-gray-900 font-black uppercase tracking-widest text-[9.5px] flex items-center gap-1 group-hover:text-amber-500 transition-colors">
                    {app.title.includes('App') || app.title.includes('API') ? 'Download Package' : 'Enter Portal'}
                    <span className="text-xs font-bold group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </div>
                
              </div>
            </div>
          ))}
        </div>

        {/* Info Banner at Bottom */}
        <div className="mt-14 max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4 bg-gray-50 border-[2px] border-gray-900 p-4 sm:p-5 shadow-[4px_4px_0_0_#F59E0B]">
           <div className="bg-amber-400 border-[2px] border-gray-900 w-12 h-12 flex-shrink-0 flex items-center justify-center text-xl shadow-[2px_2px_0_0_#111827]">
             💡
           </div>
           <p className="text-sm font-bold text-gray-700 leading-snug">
             <span className="text-gray-900 font-black">Live Testing Note:</span> To experience the mobile ecosystem, simply enter the School Portal demo, retrieve a dummy student/staff credential, and immediately sign into the respective app to see real-time data sync in action!
           </p>
        </div>

      </div>
    </section>
  );
}
