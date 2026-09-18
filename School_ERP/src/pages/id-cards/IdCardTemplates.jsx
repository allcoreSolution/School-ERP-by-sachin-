import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, PenTool, Search } from 'lucide-react';

export default function IdCardTemplates() {
  const navigate = useNavigate();
  
  const categories = [
    { name: 'All', count: 111 },
    { name: 'Academic', count: 1 },
    { name: 'Admit Card', count: 3 },
    { name: 'Bonafide', count: 9 },
    { name: 'Certificate', count: 2 },
    { name: 'Character Certificate', count: 8 },
    { name: 'Dsf', count: 1 },
    { name: 'Fee Receipt', count: 15 },
    { name: 'General', count: 1 },
    { name: 'Id Card', count: 19 },
    { name: 'Interactive', count: 5 },
    { name: 'Marksheet', count: 23 },
    { name: 'Staff Id Card', count: 14 },
    { name: 'Transfer Certificate', count: 9 }
  ];

  const [activeCategory, setActiveCategory] = useState('Id Card');

  // Generate 10 dummy templates based on the active category
  const templates = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    name: `${activeCategory === 'All' ? 'Awesome' : activeCategory} Design ${i + 1}`,
    type: activeCategory === 'All' ? 'Id Card' : activeCategory,
    // Just using some nice varied colors for placeholder templates
    color: ['bg-blue-100', 'bg-red-100', 'bg-green-100', 'bg-orange-100', 'bg-purple-100'][i % 5]
  }));

  const handleStartDesign = () => {
    navigate('/id-cards/canvas-designer');
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 py-4 flex items-center justify-between shadow-sm z-10 relative">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Template Gallery</h1>
          <p className="text-[13px] text-slate-500 mt-1">Pick a pre-built design, or start fresh</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleStartDesign}
            className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-none font-bold text-[13px] flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
          >
            <FileText className="w-4 h-4" /> Start from Scratch
          </button>
          <button 
            onClick={handleStartDesign}
            className="px-4 py-2 bg-[#5F52FF] hover:bg-[#4f42e6] text-white border border-[#5F52FF] rounded-none font-bold text-[13px] flex items-center gap-2 transition-colors shadow-sm cursor-pointer"
          >
            <PenTool className="w-4 h-4" /> Canvas Designer
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border-t border-slate-200 px-6 py-3 flex items-center gap-4 overflow-x-auto custom-scrollbar shadow-sm">
        <div className="relative min-w-[200px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search templates..." 
            className="w-full pl-9 pr-3 py-1.5 border border-slate-300 rounded-none text-[13px] text-slate-600 focus:outline-none focus:border-[#5F52FF]"
          />
        </div>
        
        <div className="flex items-center gap-2 min-w-max">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-none border text-[12px] font-bold cursor-pointer transition-colors ${
                activeCategory === cat.name 
                  ? 'bg-[#5F52FF] text-white border-[#5F52FF]' 
                  : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
              }`}
            >
              {cat.name} <span className={`px-1.5 py-0.5 rounded-none text-[10px] ${activeCategory === cat.name ? 'bg-white/20' : 'bg-slate-100'}`}>{cat.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Template Grid */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-[1400px] mx-auto">
          {templates.map((template) => (
            <div key={template.id} className="bg-white rounded-none border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
              
              {/* Template Preview (Dummy UI for different cards) */}
              <div className={`h-[250px] w-full ${template.color} flex flex-col items-center justify-center p-4 relative`}>
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
                
                {/* Dummy ID Card Visual */}
                <div className="w-[140px] h-[210px] bg-white rounded-none shadow-lg flex flex-col overflow-hidden transform group-hover:scale-105 transition-transform duration-300">
                  <div className="h-[40px] bg-[#5F52FF] w-full"></div>
                  <div className="flex-1 flex flex-col items-center pt-4 px-3">
                    <div className="w-12 h-12 bg-slate-200 rounded-none mb-2"></div>
                    <div className="h-2 w-20 bg-slate-200 rounded-none mb-1"></div>
                    <div className="h-1.5 w-12 bg-slate-100 rounded-none mb-4"></div>
                    
                    <div className="w-full space-y-1.5">
                      <div className="h-1.5 w-full bg-slate-100 rounded"></div>
                      <div className="h-1.5 w-5/6 bg-slate-100 rounded"></div>
                      <div className="h-1.5 w-4/6 bg-slate-100 rounded"></div>
                    </div>
                  </div>
                  <div className="h-[30px] bg-slate-50 w-full mt-auto flex justify-center items-center">
                    <div className="w-10 h-3 bg-slate-200 rounded-none"></div>
                  </div>
                </div>
              </div>
              
              {/* Template Details */}
              <div className="p-3 border-t border-slate-200 bg-white">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[12px] font-bold text-slate-800">{template.name}</span>
                  <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{template.type}</span>
                </div>
                <button 
                  onClick={handleStartDesign}
                  className="w-full py-2 bg-[#f8f9ff] text-[#5F52FF] font-bold text-[12px] rounded-none hover:bg-[#5F52FF] hover:text-white transition-colors cursor-pointer"
                >
                  Use this template
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
