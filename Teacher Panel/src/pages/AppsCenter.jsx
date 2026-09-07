import React, { useState } from 'react';
import { Search, Clock, FileText, UserSquare2, LayoutGrid, MonitorPlay, ArrowRight, Star } from 'lucide-react';

const appsData = [
  {
    id: 1,
    title: 'Question Paper Generator',
    description: 'Generate offline exam papers with Excel import, multi-section support, and print-ready PDFs.',
    category: 'Academic',
    icon: <FileText className="w-8 h-8 text-white" />,
    color: 'bg-[#5D5CFF]',
    popular: false
  },
  {
    id: 2,
    title: 'Student 360 View',
    description: 'Unified student profile — attendance, fees, marks, and notes in one page.',
    category: 'Insights',
    icon: <UserSquare2 className="w-8 h-8 text-white" />,
    color: 'bg-[#2ecc71]',
    popular: true
  },
  {
    id: 3,
    title: 'Seating Arrangement Generator',
    description: 'Auto-generate exam hall seating with class interleaving and hall tickets.',
    category: 'Utility',
    icon: <LayoutGrid className="w-8 h-8 text-white" />,
    color: 'bg-[#f39c12]',
    popular: false
  },
  {
    id: 4,
    title: 'Digital Whiteboard',
    description: 'Create, save, and share digital whiteboards for teaching and planning using Excalidraw.',
    category: 'Academic',
    icon: <MonitorPlay className="w-8 h-8 text-white" />,
    color: 'bg-[#5D5CFF]',
    popular: true
  }
];

const AppsCenter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  // Logic to filter the apps based on search term and category
  const filteredApps = appsData.filter(app => {
    const matchesSearch = app.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          app.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeFilter === 'All' || app.category === activeFilter;
    return matchesSearch && matchesCategory;
  });

  // Derived counts for filters
  const counts = {
    All: appsData.length,
    Academic: appsData.filter(a => a.category === 'Academic').length,
    Insights: appsData.filter(a => a.category === 'Insights').length,
    Utility: appsData.filter(a => a.category === 'Utility').length,
    Analytics: appsData.filter(a => a.category === 'Analytics').length
  };

  return (
    <div className="flex-1 overflow-y-auto bg-white theme-app-bg text-sm min-h-screen">
      
      {/* Page Header */}
      <div className="px-8 py-6 border-b border-gray-100">
        <h1 className="text-[26px] font-bold text-gray-800 tracking-tight">Apps Center</h1>
        <p className="text-[13px] text-gray-500 mt-1 max-w-4xl">
          {counts.All} ready-to-use tools that sit on top of your data — question papers, exam-hall seating, student 360, financial reports and exports. Nothing to install.
        </p>
      </div>

      <div className="px-8 py-6">
        
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search tools..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full md:w-72 pl-9 pr-4 py-2 border border-gray-300 rounded-[5px] text-[13px] focus:outline-none focus:border-[#5D5CFF]"
              />
            </div>
            <button className="flex items-center gap-1.5 text-gray-500 text-[12px] hover:text-gray-700 w-fit">
              <Clock className="w-3.5 h-3.5" /> Show what's coming next <span className="bg-gray-100 text-gray-600 px-1.5 rounded-full text-[10px] font-bold">5</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            {[
              { id: 'All', label: 'All' },
              { id: 'Academic', label: 'Academic' },
              { id: 'Insights', label: 'Insights' },
              { id: 'Utility', label: 'Utility' },
              { id: 'Analytics', label: 'Analytics' }
            ].map(filter => (
              <button 
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-[20px] text-[13px] font-medium transition-colors border ${
                  activeFilter === filter.id 
                    ? 'bg-[#5D5CFF] text-white border-[#5D5CFF]' 
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {/* Adding small icon conditionally just like the original if needed, sticking to plain text + badge */}
                {filter.label} <span className={`inline-block px-1.5 rounded text-[11px] font-bold ${activeFilter === filter.id ? 'bg-white/20' : 'bg-gray-100'}`}>{counts[filter.id]}</span>
              </button>
            ))}
          </div>

        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApps.map(app => (
            <div key={app.id} className="bg-white border border-gray-200 rounded-[8px] flex flex-col hover:shadow-lg hover:border-gray-300 transition-all">
              
              <div className="flex-1 p-6 flex flex-col items-center text-center relative pt-8">
                
                <div className={`w-16 h-16 rounded-[16px] flex items-center justify-center shadow-sm mb-4 ${app.color}`}>
                  {app.icon}
                </div>
                
                <h3 className="font-bold text-gray-800 text-[16px] mb-2">{app.title}</h3>
                <p className="text-gray-500 text-[12px] leading-relaxed max-w-sm">{app.description}</p>
                
                <div className="flex w-full items-center justify-between mt-6">
                  <div className={`flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider ${
                    app.category === 'Academic' ? 'text-blue-500' : 
                    app.category === 'Insights' ? 'text-green-500' : 'text-orange-500'
                  }`}>
                    <Star className="w-3.5 h-3.5" /> {app.category}
                  </div>
                  {app.popular && (
                    <span className="bg-[#ff9f43] text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">Popular</span>
                  )}
                </div>
                
              </div>
              
              <button 
                onClick={() => alert(`Launching ${app.title}...`)}
                className="w-full py-3.5 border-t border-gray-100 text-gray-600 hover:bg-gray-50 text-[13px] font-medium flex items-center justify-center gap-2 transition-colors rounded-b-[8px]"
              >
                <ArrowRight className="w-4 h-4" /> Open Tool
              </button>

            </div>
          ))}

          {filteredApps.length === 0 && (
            <div className="col-span-full py-16 text-center text-gray-500">
              No tools found matching your current filter.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AppsCenter;
