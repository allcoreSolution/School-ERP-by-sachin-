import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import FooterLanding from '../components/landing/FooterLanding';

export default function ModulesPage() {
  const [filter, setFilter] = useState('All');

  const allModules = [
    { title: 'Student Information', label: 'CORE', category: 'Core', icon: '👤', desc: 'Manage student records, demographics & history.' },
    { title: 'Academics', label: 'CORE', category: 'Core', icon: '📚', desc: 'Classes, sections, subjects and syllabuses.' },
    { title: 'Fees Collection', label: 'CORE', category: 'Finance', icon: '💰', desc: 'Online/Offline fee collection, discounts, fines.' },
    { title: 'Human Resource', label: 'CORE', category: 'Staff', icon: '👥', desc: 'Staff directory, payroll, leave management.' },
    { title: 'Offline Exams', label: 'CORE', category: 'Academic', icon: '📝', desc: 'Printable marksheets, consolidated grading.' },
    { title: 'Certificates', label: 'CORE', category: 'Core', icon: '📜', desc: 'Generate ID cards and custom certificates.' },
    { title: 'ID Card Designer', label: 'CORE', category: 'Core', icon: '🪪', desc: 'Drag-and-drop ID card printing system.' },
    
    { title: 'CCTV Live View', label: 'NEW', category: 'Add-on', icon: '📹', desc: 'Embed NVR feeds for admin monitoring.' },
    { title: 'Parent–Teacher Chat', label: 'NEW', category: 'Comms', icon: '💬', desc: 'WhatsApp-style internal messaging.' },
    { title: 'Surveys & Feedback', label: 'NEW', category: 'Comms', icon: '📊', desc: 'Collect feedback from parents & staff.' },
    { title: 'Engagement & Creatives', label: 'NEW', category: 'Add-on', icon: '🎨', desc: 'Social media post maker integration.' },
    { title: 'Compliance & Governance', label: 'NEW', category: 'Staff', icon: '🛡️', desc: 'Store statutory documents safely.' },
    { title: 'Online Exams Pro (CBT)', label: 'NEW', category: 'Academic', icon: '💻', desc: 'Computer based testing with anti-cheat.' },
    { title: 'Admission CRM', label: 'NEW', category: 'Core', icon: '🎯', desc: 'Lead tracking and funnel management.' },
    { title: 'School Website Builder', label: 'NEW', category: 'Add-on', icon: '🌐', desc: 'CMS to generate front-facing websites.' },
    { title: 'Live Classes', label: 'NEW', category: 'Academic', icon: '🎥', desc: 'Zoom & Google Meet integration.' },
    { title: 'Biometric 2-Way Sync', label: 'NEW', category: 'Staff', icon: '🖐️', desc: 'Real-time ZKTeco/eSSL cloud push.' },
    
    { title: 'Homework', category: 'Academic', icon: '✏️', desc: 'Assign daily homework and track completion.' },
    { title: 'Library Management', category: 'Core', icon: '📖', desc: 'Book issues, returns, barcode scanning.' },
    { title: 'Transport', category: 'Core', icon: '🚌', desc: 'Routes, vehicle tracking via driver app.' },
    { title: 'Hostel', category: 'Core', icon: '🏠', desc: 'Room allocation and hostel fee tracking.' },
    { title: 'Inventory', category: 'Finance', icon: '📦', desc: 'Stock management, purchase orders.' },
    { title: 'Asset Management', category: 'Finance', icon: '🖨️', desc: 'Track school laptops, projectors, etc.' },
    { title: 'AI Assistant', category: 'Add-on', icon: '🤖', desc: 'LLM trained on school attendance/fees data.' },
    { title: 'Knowledge Base', category: 'Comms', icon: '🧠', desc: 'Articles for parent self-service portal.' },
    { title: 'Study Center', category: 'Academic', icon: '🎓', desc: 'Share PDFs, Videos, and notes instantly.' },
    { title: 'Accounts & Finance', category: 'Finance', icon: '📈', desc: 'Income, Expense, and comprehensive ledgers.' },
    { title: 'Front Office', category: 'Core', icon: '🏦', desc: 'Visitor log, postal dispatch, call logs.' },
    { title: 'Communications', category: 'Comms', icon: '📧', desc: 'Email, SMS, and Push notification center.' },
    { title: 'CBC / Competency', category: 'Academic', icon: '📋', desc: 'Competency-based curriculum grading.' },
    { title: 'Health Records', category: 'Staff', icon: '🩺', desc: 'Track student medical history & allergies.' },
    { title: 'Apps Center', category: 'Add-on', icon: '📱', desc: 'Manage API keys and mobile app configs.' },
    { title: 'Parent-Teacher Meetings', category: 'Comms', icon: '🤝', desc: 'Schedule PTM slots via mobile app.' },
    { title: 'Lesson Planner', category: 'Academic', icon: '📐', desc: 'Teacher syllabus tracking & daily logs.' },
    { title: 'Digital Evaluation', category: 'Academic', icon: '✅', desc: 'Scan and grade sheets digitally.' },
    { title: 'QR Code Attendance', category: 'Core', icon: '📲', desc: 'Mobile app scanning for fast ingress.' },
    { title: 'Assessment', category: 'Academic', icon: '📊', desc: 'Advanced analytics for student growth.' }
  ];

  const categories = ['All', 'Core', 'Academic', 'Finance', 'Staff', 'Comms', 'Add-on'];

  const filteredModules = filter === 'All' ? allModules : allModules.filter(m => m.category === filter);

  return (
    <div className="min-h-screen bg-[#fdfdfd] overflow-hidden">
      <Navbar />
      
      <main className="mt-[80px]">
        {/* Header Section */}
        <section className="py-8 lg:py-10 px-4 sm:px-6 lg:px-12 w-full border-b-[2px] border-gray-900 bg-[#111827] relative overflow-hidden">
           {/* Subtle Grid / Structural elements for classic brutalism */}
           <div className="absolute inset-0 bg-grid-pattern opacity-30" />
           
           <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
              <span className="inline-flex items-center gap-2 bg-white text-gray-900 font-black uppercase tracking-widest text-[9px] px-3 py-1 border-[2px] border-gray-900 shadow-[2px_2px_0_0_#F59E0B] mb-3">
                 <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                 38 Powerful Sub-Systems
              </span>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-50 tracking-tight mb-3 leading-none">
                 Module <span className="text-amber-400">Catalog</span>.
              </h1>
              
              <div className="h-0.5 w-12 bg-gray-700 mb-3" />
              
              <p className="text-gray-400 font-semibold text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
                 Explore the advanced architecture shipped within the Multi-School ERP package. Filter through the grid below to discover structural capabilities.
              </p>
           </div>
        </section>

        {/* Filter bar */}
        <div className="border-b-[1.5px] border-gray-900 sticky top-[80px] bg-white z-40 bg-grid-pattern shadow-[0_4px_0_0_#111827]">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
              {categories.map(cat => (
                 <button
                   key={cat}
                   onClick={() => setFilter(cat)}
                   className={`px-4 py-1.5 font-bold text-sm border-[1.5px] border-gray-900 whitespace-nowrap transition-transform hover:-translate-y-0.5 active:translate-y-0 ${
                     filter === cat 
                     ? 'bg-gray-900 text-amber-400 shadow-[1px_1px_0_0_#F59E0B]' 
                     : 'bg-white text-gray-700 shadow-[2px_2px_0_0_#111827]'
                   }`}
                 >
                    {cat}
                 </button>
              ))}
           </div>
        </div>

        {/* Grid Catalog */}
        <section className="py-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto min-h-[500px]">
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredModules.map((mod, i) => (
                <div key={i} className={`bg-gradient-to-b from-white to-gray-50 border-[1.5px] border-gray-900 p-3 shadow-[2px_2px_0_0_#111827] hover:shadow-[5px_5px_0_0_#111827] hover:-translate-y-[2px] hover:-translate-x-[2px] transition-all flex flex-col group relative overflow-hidden ${
                  mod.label === 'CORE' ? 'border-t-[3px] border-t-[#09B48E]' : 
                  mod.label === 'NEW' ? 'border-t-[3px] border-t-amber-500' : 
                  'border-t-[3px] border-t-gray-700'
                }`}>
                   <div className="flex items-center gap-3 mb-2 relative">
                      <div className="flex-shrink-0 w-8 h-8 bg-white border-[1.5px] border-gray-900 shadow-[1.5px_1.5px_0_0_#111827] flex items-center justify-center text-sm group-hover:-rotate-6 transition-transform">
                         {mod.icon}
                      </div>
                      <div className="flex flex-col min-w-0 pr-4">
                        <h3 className="font-bold text-gray-900 text-[13px] leading-tight truncate w-full">{mod.title}</h3>
                        {mod.label && (
                          <span className={`w-fit font-black tracking-widest text-[7px] px-1 py-[1px] mt-1 border-[1px] border-gray-900 shadow-[1px_1px_0_0_#111827] ${mod.label === 'CORE' ? 'bg-[#E8F8F5] text-[#09B48E]' : 'bg-amber-100 text-amber-800'}`}>
                            {mod.label}
                          </span>
                        )}
                      </div>
                   </div>
                   
                   <p className="text-gray-500 font-medium text-[11px] leading-tight flex-1 mb-2 line-clamp-2">
                     {mod.desc}
                   </p>
                   
                   <div className="mt-auto pt-2 border-t-[1.5px] border-dashed border-gray-300 w-full flex justify-between items-center">
                     <span className="text-[9px] uppercase font-black text-gray-900 tracking-widest bg-gray-100 px-1 py-0.5 rounded-sm">
                       {mod.category}
                     </span>
                     <span className="text-gray-300 group-hover:text-amber-500 transition-colors text-[10px] font-black">
                       ➜
                     </span>
                   </div>
                </div>
              ))}
           </div>
           
           {filteredModules.length === 0 && (
             <div className="text-center text-gray-500 py-20 font-semibold">
                No modules found for this category.
             </div>
           )}
        </section>

      </main>

      <FooterLanding />
    </div>
  );
}
