import React from 'react';
import { Bus, User, Phone, Gauge, ArrowUp, ArrowDown, MapPin } from 'lucide-react';

const stops = [
  { id: 1, name: 'Central City High School', pickup: '09:00 AM', drop: '04:00 PM', active: true },
  { id: 2, name: 'TEST OFFER1', pickup: '09:30 AM', drop: '04:30 PM', active: false },
  { id: 3, name: 'TEST3', pickup: '09:35 AM', drop: '04:45 PM', active: false },
];

export default function Transport() {
  return (
    <div className="p-4 md:p-6 max-w-[1400px] mx-auto min-h-screen bg-[#f8f9fa] space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
         <h1 className="text-[22px] font-bold text-[#1f2937] tracking-tight">Transport Tracking</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-5 h-full lg:h-[calc(100vh-140px)] min-h-[600px]">
         
         {/* LEFT COLUMN - Data */}
         <div className="w-full lg:w-[420px] flex flex-col gap-4 flex-shrink-0">
            
            {/* Top Vehicle Info Card */}
            <div className="bg-[#a16142] rounded-none p-5 shadow-sm text-white flex flex-col justify-between h-[180px]">
               {/* Top Row */}
               <div className="flex justify-between items-start">
                  <div className="flex items-start gap-4">
                     <div className="w-12 h-12 rounded-none bg-white/20 flex items-center justify-center flex-shrink-0">
                        <Bus className="w-7 h-7 text-white" />
                     </div>
                     <div className="flex flex-col mt-0.5">
                        <span className="font-bold text-[18px] tracking-wide">CG04HD7250</span>
                        <span className="text-[12.5px] font-medium text-white/80 tracking-widest uppercase">Van</span>
                     </div>
                  </div>
                  <div className="bg-[#fb7185] px-2.5 py-1 rounded-none flex items-center gap-1.5 shadow-sm">
                     <div className="w-1.5 h-2 rounded-none bg-white animate-pulse"></div>
                     <span className="text-[9.5px] font-extrabold uppercase tracking-widest">Offline</span>
                  </div>
               </div>

               {/* Bottom Row */}
               <div className="flex items-end justify-between">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-none bg-white/20 flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-white" />
                     </div>
                     <div className="flex flex-col">
                        <span className="font-bold text-[14px]">Demo Driver</span>
                        <span className="text-[11px] font-medium text-white/70">Updated 7:59 PM</span>
                     </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                     <div className="bg-black/20 px-3 py-1.5 rounded-none flex items-center gap-1.5">
                        <Gauge className="w-3.5 h-3.5 text-white/90" strokeWidth={2.5}/>
                        <span className="text-[12px] font-bold text-white tracking-wide">0 km/h</span>
                     </div>
                     <button className="w-8 h-8 rounded-none bg-black/20 flex items-center justify-center hover:bg-black/30 transition-colors">
                        <Phone className="w-3.5 h-3.5 text-white" />
                     </button>
                  </div>
               </div>
            </div>

            {/* Bottom Timeline Card */}
            <div className="bg-white border border-gray-200 rounded-none flex-1 shadow-sm overflow-hidden flex flex-col">
               <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                     <MapPin className="w-4 h-4 text-[#a16142]"/>
                     <h2 className="font-bold text-[15px] text-gray-800">Route: Raipur</h2>
                  </div>
                  <span className="text-[12px] font-bold text-gray-400">3 stops</span>
               </div>
               
               <div className="flex-1 p-6 overflow-y-auto relative">
                  
                  {/* Timeline Master Line */}
                  <div className="absolute left-[39px] top-[40px] bottom-[60px] w-[2px] bg-emerald-100"></div>

                  <div className="space-y-6">
                     {stops.map((stop, i) => (
                        <div key={stop.id} className="relative flex items-center justify-end w-full">
                           
                           {/* Stop Number Node placed exactly on the line */}
                           <div className="absolute left-0 w-6 h-6 rounded-none bg-[#f0fdf4] border-[2px] border-emerald-400 text-emerald-600 flex items-center justify-center font-bold text-[11px] z-10 shadow-sm">
                              {stop.id}
                           </div>
                           
                           {/* Content Box (Highlighted if active) */}
                           <div className={`w-[calc(100%-40px)] p-3 rounded-none border flex justify-between items-center transition-colors
                              ${stop.active ? 'bg-emerald-50 border-emerald-200 shadow-sm' : 'bg-transparent border-transparent'}`}>
                              
                              <div className="flex flex-col">
                                 <span className="font-bold text-[13.5px] text-gray-800 tracking-tight">{stop.name}</span>
                                 <div className="flex items-center gap-3 mt-1 text-[11px] font-bold text-gray-500">
                                    <div className="flex items-center gap-1 text-orange-500">
                                       <ArrowUp className="w-3.5 h-3.5" strokeWidth={3}/> {stop.pickup}
                                    </div>
                                    <div className="flex items-center gap-1 text-blue-500">
                                       <ArrowDown className="w-3.5 h-3.5" strokeWidth={3}/> {stop.drop}
                                    </div>
                                 </div>
                              </div>
                              
                              {stop.active && (
                                 <div className="px-3 py-1 bg-emerald-500 text-white text-[10px] font-black tracking-widest rounded-none uppercase ml-2 flex-shrink-0">
                                    Your Stop
                                 </div>
                              )}
                           </div>

                        </div>
                     ))}
                  </div>

               </div>
            </div>
         </div>

         {/* RIGHT COLUMN - Map */}
         <div className="flex-1 rounded-none bg-white border border-gray-200 shadow-sm overflow-hidden relative min-h-[400px]">
            {/* Embedded Native Interactive Map for absolute authentic premium tracking feel */}
            <iframe 
               width="100%" 
               height="100%" 
               frameBorder="0" 
               scrolling="no" 
               marginHeight="0" 
               marginWidth="0" 
               src="https://www.openstreetmap.org/export/embed.html?bbox=81.5%2C21.15%2C81.8%2C21.35&amp;layer=mapnik&amp;marker=21.2514%2C81.6296" 
               className="grayscale-[20%] opacity-90 transition-opacity"
               style={{ pointerEvents: 'auto' }}
               title="Raipur Transport Tracking"
            ></iframe>
            
            {/* Fake overlay elements to mimic screenshot precisely */}
            
            {/* Center Yellow Bus Marker */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 drop-shadow-xl animate-bounce">
               <div className="bg-[#fbbf24] p-2 rounded-none border-2 border-white shadow-lg flex items-center justify-center">
                  <Bus className="w-5 h-5 text-gray-900" />
               </div>
            </div>

            {/* Other Stop Markers (Cosmetic) */}
            <div className="absolute bottom-24 right-32 pointer-events-none drop-shadow-md flex flex-col items-center">
               <div className="bg-[#1e293b] p-1.5 rounded-none border-2 border-white shadow flex items-center justify-center mb-1">
                  <MapPin className="w-3 h-3 text-white" />
               </div>
               <span className="text-[10px] font-bold text-gray-700 bg-white/80 px-1.5 py-0.5 rounded-none backdrop-blur">Stop 3</span>
            </div>
            
            {/* Decorative connection line SVG on the map overlay */}
            <svg className="absolute inset-0 pointer-events-none opacity-40 z-0" style={{ width: '100%', height: '100%' }}>
               <path d="M 50% 50% Q 65% 60% 80% 85%" fill="transparent" stroke="#3b82f6" strokeWidth="4" strokeDasharray="6, 6" />
            </svg>
         </div>
      </div>
    </div>
  );
}
