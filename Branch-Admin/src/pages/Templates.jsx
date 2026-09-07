import React, { useState } from 'react';
import { Search, Plus, Wand2, Calculator } from 'lucide-react';

const Templates = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    { name: 'All', count: 128 },
    { name: 'Academic', count: 1 },
    { name: 'Admit Card', count: 3 },
    { name: 'Birthday Card', count: 6 },
    { name: 'Bonafide', count: 9 },
    { name: 'Certificate', count: 2 },
    { name: 'Character Certificate', count: 8 },
    { name: 'Dsf', count: 1 },
    { name: 'Fee Receipt', count: 15 },
    { name: 'Festival Banner', count: 9 },
    { name: 'General', count: 1 },
    { name: 'Id Card', count: 1 },
    { name: 'Id Card', count: 19 },
    { name: 'Interactive', count: 6 },
    { name: 'Marksheet', count: 24 },
    { name: 'Staff Id Card', count: 14 },
    { name: 'Transfer Certificate', count: 9 },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto bg-[#f4f7fa] min-h-[calc(100vh-70px)]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[24px] font-bold text-gray-800 tracking-tight mb-1">Ready Templates</h1>
          <p className="text-[14px] text-gray-500 font-medium">Platform-wide certificate, ID card & document catalog</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => alert("Template builder module will open here in the next phase.")}
            className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-[3px] text-[14px] font-bold shadow-sm flex items-center gap-2 transition-colors focus:ring-2 focus:ring-gray-200"
          >
            <Plus className="w-4 h-4" /> Add New Template
          </button>
          <button 
            onClick={() => alert("Canva integration will launch here in the next phase.")}
            className="bg-[#5f52ff] hover:bg-[#4d42cc] text-white px-4 py-2 rounded-[3px] text-[14px] font-bold shadow-sm flex items-center gap-2 transition-colors border border-[#5f52ff] focus:ring-2 focus:ring-[#5f52ff]/50"
          >
            <Wand2 className="w-4 h-4" /> Canvas Designer
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-[3px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 p-5 mb-6">
        <div className="relative max-w-sm mb-5">
          <Search className="w-4 h-4 absolute left-3 top-[11px] text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by name..." 
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-[3px] text-[13.5px] focus:outline-none focus:border-[#5f52ff]"
          />
        </div>

        <div className="flex flex-wrap gap-2.5">
          {categories.map((cat, i) => {
            const isActive = activeCategory === cat.name;
            return (
              <button
                key={i}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center px-4 py-1.5 rounded-[3px] text-[13px] font-semibold transition-all border ${
                  isActive 
                    ? 'bg-[#5f52ff] border-[#5f52ff] text-white shadow-sm' 
                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {isActive && <div className="w-3 h-3 flex flex-wrap mr-1.5 opacity-80"><div className="w-1.5 h-1.5 border border-white"></div><div className="w-1.5 h-1.5 border border-white"></div><div className="w-1.5 h-1.5 border border-white"></div><div className="w-1.5 h-1.5 border border-white"></div></div>}
                {cat.name} 
              </button>
            )
          })}
        </div>
      </div>

      {/* Grid of Templates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Template 1 (Simple variable layout) */}
        {(activeCategory === 'All' || activeCategory === 'General') && (
        <div className="bg-white rounded-[3px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 p-4 aspect-[3/4] relative group">
          <button className="absolute top-3 right-3 bg-[#f5f3ff] text-[#5f52ff] w-7 h-7 rounded-[3px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
            <Wand2 className="w-3.5 h-3.5" />
          </button>
          
          <div className="border-2 border-dashed border-gray-100 h-full flex flex-col items-center justify-center gap-2 p-6 text-center">
             <div className="font-bold text-gray-800">[student_name]</div>
             <div className="text-gray-400 text-xs">[class_section]</div>
          </div>
          <div className="mt-4 font-semibold text-gray-800 text-[14px]">igi</div>
        </div>
        )}

        {/* Template 2 (ID Card Style) */}
        {(activeCategory === 'All' || activeCategory === 'Id Card') && (
        <div className="bg-white rounded-[3px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 p-4 aspect-[3/4] relative group flex flex-col">
          <button className="absolute top-3 right-3 bg-[#f5f3ff] text-[#5f52ff] w-7 h-7 rounded-[3px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
            <Wand2 className="w-3.5 h-3.5" />
          </button>
          
          <div className="border border-gray-100 h-full flex flex-col items-center p-6 text-center shadow-sm relative">
             <div className="w-8 h-8 rounded-full border-2 border-blue-400 text-blue-500 flex items-center justify-center mb-1 text-[10px]"><Calculator className="w-4 h-4"/></div>
             <div className="text-gray-800 text-[11px] font-bold mb-4">[school_name]</div>
             <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-white mb-4">
               <svg viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14 mt-4"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
             </div>
             <div className="font-bold text-gray-800 text-sm mb-1">[student_name]</div>
             <div className="text-gray-400 text-[10px]">[class_section]</div>
             <div className="text-gray-400 text-[10px]">[admission_no]</div>
             <div className="mt-auto grid grid-cols-2 gap-0.5 opacity-50">
                <div className="w-2 h-2 bg-gray-800"></div><div className="w-2 h-2 rounded-full border border-gray-800"></div>
                <div className="w-2 h-2 border border-black"></div><div className="w-2 h-2 bg-gray-800"></div>
             </div>
          </div>
          <div className="mt-4 font-semibold text-gray-800 text-[14px]">Argha Dev</div>
        </div>
        )}

        {/* Template 3 (Report Card Style) */}
        {(activeCategory === 'All' || activeCategory === 'Marksheet') && (
        <div className="bg-white rounded-[3px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 p-4 aspect-[3/4] relative group flex flex-col">
          <button className="absolute top-3 right-3 bg-[#f5f3ff] text-[#5f52ff] w-7 h-7 rounded-[3px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10">
            <Wand2 className="w-3.5 h-3.5" />
          </button>
          
          <div className="border border-red-800 h-full p-2 flex flex-col overflow-hidden text-[6px] tracking-tighter">
             <div className="text-center text-red-700 font-extrabold text-[12px] mb-1">YOUR SCHOOL NAME</div>
             <div className="text-center text-gray-800 mb-2 border-b border-red-800 pb-1">Affiliation No. _________ | School Code ________</div>
             <div className="bg-red-800 text-white font-bold p-1 text-center flex justify-between">
               <span>CLASS: X [A]</span> <span>REPORT CARD</span> <span>[ACADEMIC_SESSION]</span>
             </div>
             
             <div className="flex gap-2 mt-2 border-b border-gray-300 pb-2">
               <div className="flex-1 space-y-1 text-blue-900 font-bold">
                 <div className="flex justify-between border-b border-gray-200"><span>Student Name:</span> <span className="text-gray-500 font-normal">[student_name]</span></div>
                 <div className="flex justify-between border-b border-gray-200"><span>Father Name:</span> <span className="text-gray-500 font-normal">[father_name]</span></div>
                 <div className="flex justify-between border-b border-gray-200"><span>Mother Name:</span> <span className="text-gray-500 font-normal">[mother_name]</span></div>
               </div>
               <div className="w-8 h-10 bg-gray-200 border flex items-end justify-center pt-2"><div className="w-5 h-5 bg-gray-400 rounded-full"></div></div>
             </div>
             
             <div className="font-bold text-red-800 mt-2 border-b border-red-800">Scholastic Areas</div>
             <div className="h-6 bg-red-50 mt-1 mb-2 border border-red-200 flex items-center justify-center text-red-300">[consolidated_marks_table]</div>
             
             <div className="font-bold text-red-800 mb-1 border-b border-red-800 mt-auto">Health Status</div>
             <div className="h-3 bg-red-50 mb-2 text-center text-gray-400">[health_status_data]</div>
          </div>
          <div className="mt-4 font-semibold text-gray-800 text-[14px] truncate">CBSE Term Wise Report C...</div>
        </div>
        )}

        {/* Template 4 (Marksheet Style) */}
        {(activeCategory === 'All' || activeCategory === 'Marksheet') && (
        <div className="bg-white rounded-[3px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 p-4 aspect-[3/4] relative group flex flex-col">
          <button className="absolute top-3 right-3 bg-[#f5f3ff] text-[#5f52ff] w-7 h-7 rounded-[3px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10">
            <Wand2 className="w-3.5 h-3.5" />
          </button>
          
          <div className="border border-blue-900 h-full p-2 flex flex-col overflow-hidden text-[6px] tracking-tighter shadow-sm">
             <div className="text-center text-blue-800 font-bold text-[11px] mb-1">YOUR SCHOOL NAME</div>
             <div className="text-center text-red-600 font-bold mb-2">MARKSHEET - अंकसूची</div>
             
             <table className="w-full border-collapse border border-blue-900 text-left mb-2 text-blue-900 font-bold">
               <tbody>
                 <tr><th className="border border-blue-900 bg-blue-50 p-0.5">Roll No.</th><td className="border border-blue-900 p-0.5 text-gray-600">[roll_no]</td></tr>
                 <tr><th className="border border-blue-900 bg-blue-50 p-0.5">Name</th><td className="border border-blue-900 p-0.5 text-gray-600">[student_name]</td></tr>
                 <tr><th className="border border-blue-900 bg-blue-50 p-0.5">DOB</th><td className="border border-blue-900 p-0.5 text-gray-600">[dob]</td></tr>
               </tbody>
             </table>
             
             <div className="bg-blue-50 text-blue-800 font-bold p-0.5 text-center border border-blue-800">EDUCATIONAL PERFORMANCE</div>
             <div className="h-10 bg-gray-50 border border-gray-300 flex items-center justify-center text-gray-400 mt-1 mb-2">[consolidated_marks_table]</div>
             
             <div className="mt-auto flex justify-between pt-2 border-t border-blue-900 opacity-60">
               <span className="border-t border-black px-1">Class Teacher</span>
               <span className="border-t border-black px-1">Principal</span>
             </div>
          </div>
          <div className="mt-4 font-semibold text-gray-800 text-[14px] truncate">State Board Weightage M...</div>
        </div>
        )}

      </div>
    </div>
  );
};

export default Templates;
