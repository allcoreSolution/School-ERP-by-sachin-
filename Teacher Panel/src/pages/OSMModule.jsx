import React, { useState, useEffect } from 'react';
import { PenTool, Target, FileText, BookOpen, TrendingUp } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const OSMModule = () => {
  const [activeTab, setActiveTab] = useState('OSM Dashboard');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const p = location.pathname;
    if (p.includes('/osm-evaluate')) setActiveTab('OSM Evaluate');
    else if (p.includes('/osm-reports')) setActiveTab('OSM Reports');
    else if (p.includes('/osm-guide')) setActiveTab('OSM Guide');
    else setActiveTab('OSM Dashboard');
  }, [location.pathname]);

  const handleTabClick = (tabName, route) => {
    setActiveTab(tabName);
    navigate(route);
  };

  const tabs = [
    { name: 'OSM Dashboard', icon: <TrendingUp className="w-4 h-4 text-orange-500" />, route: '/osm-dashboard' },
    { name: 'OSM Evaluate', icon: <Target className="w-4 h-4 text-blue-500" />, route: '/osm-evaluate' },
    { name: 'OSM Reports', icon: <FileText className="w-4 h-4 text-purple-500" />, route: '/osm-reports' },
    { name: 'OSM Guide', icon: <BookOpen className="w-4 h-4 text-cyan-500" />, route: '/osm-guide' }
  ];

  const renderTabContent = () => {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] bg-white border border-gray-200 shadow-sm rounded-none animate-in fade-in">
        <div className="w-16 h-16 bg-gray-50 flex flex-col items-center justify-center mb-4 rounded-full border border-gray-100">
           <PenTool className="text-gray-300 w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-gray-800">{activeTab}</h2>
        <p className="text-sm text-gray-500 mt-2">Under Development</p>
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#f4f7f6] theme-app-bg text-sm">
      <div className="px-6 py-5 bg-white border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
            OSM Module
          </h1>
          <p className="text-[13px] text-gray-500 mt-1">Manage and evaluate online submissions, track stats, and view OSM analytics.</p>
        </div>
      </div>
      <div className="px-6 bg-white border-b border-gray-200 flex overflow-x-auto hide-scrollbar">
        {tabs.map(t => (
          <button 
            key={t.name}
            onClick={() => handleTabClick(t.name, t.route)}
            className={`flex items-center gap-2 px-5 py-4 font-bold text-[13px] whitespace-nowrap transition-colors border-b-[3px] ${
              activeTab === t.name 
                ? 'text-gray-800 border-gray-800' 
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            {t.icon} {t.name}
          </button>
        ))}
      </div>
      <div className="p-6 max-w-[1400px] mx-auto min-h-[500px]">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default OSMModule;
