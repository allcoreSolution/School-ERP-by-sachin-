import React, { useState } from 'react';
import { Search, Info, FileText, UserCircle, Grid, ArrowRightLeft, PieChart, MonitorPlay, ArrowRight, GraduationCap, Lightbulb, Wrench, BarChart2 } from 'lucide-react';

const appsData = [
  {
    id: 1,
    title: 'Question Paper Generator',
    description: 'Generate offline exam papers with Excel import, multi-section support, and print-ready PDFs.',
    icon: <FileText className="w-8 h-8 text-white" />,
    iconBg: 'bg-blue-600',
    category: 'Academic',
    categoryIcon: <GraduationCap className="w-4 h-4 mr-1" />,
    categoryColor: 'text-blue-600 bg-blue-50 border-blue-200',
    badge: null,
  },
  {
    id: 2,
    title: 'Student 360 View',
    description: 'Unified student profile — attendance, fees, marks, and notes in one page.',
    icon: <UserCircle className="w-8 h-8 text-white" />,
    iconBg: 'bg-emerald-500',
    category: 'Insights',
    categoryIcon: <Lightbulb className="w-4 h-4 mr-1" />,
    categoryColor: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    badge: { text: 'Popular', color: 'bg-orange-500' },
  },
  {
    id: 3,
    title: 'Seating Arrangement Generator',
    description: 'Auto-generate exam hall seating with class interleaving and hall tickets.',
    icon: <Grid className="w-8 h-8 text-white" />,
    iconBg: 'bg-amber-500',
    category: 'Utility',
    categoryIcon: <Wrench className="w-4 h-4 mr-1" />,
    categoryColor: 'text-amber-600 bg-amber-50 border-amber-200',
    badge: null,
  },
  {
    id: 4,
    title: 'Data Export Hub',
    description: 'Export any module\'s data with column-level selection, custom fields, filters, and Excel/CSV downloads.',
    icon: <ArrowRightLeft className="w-8 h-8 text-white" />,
    iconBg: 'bg-orange-500',
    category: 'Utility',
    categoryIcon: <Wrench className="w-4 h-4 mr-1" />,
    categoryColor: 'text-amber-600 bg-amber-50 border-amber-200',
    badge: { text: 'New', color: 'bg-pink-500' },
  },
  {
    id: 5,
    title: 'Financial Analytics & Reports',
    description: 'Advanced P&L, Cash Flow summaries, and Tally exports.',
    icon: <PieChart className="w-8 h-8 text-white" />,
    iconBg: 'bg-blue-400',
    category: 'Analytics',
    categoryIcon: <BarChart2 className="w-4 h-4 mr-1" />,
    categoryColor: 'text-teal-600 bg-teal-50 border-teal-200',
    badge: { text: 'New', color: 'bg-pink-500' },
  },
  {
    id: 6,
    title: 'Digital Whiteboard',
    description: 'Create, save, and share digital whiteboards for teaching and planning using Excalidraw.',
    icon: <MonitorPlay className="w-8 h-8 text-white" />,
    iconBg: 'bg-indigo-600',
    category: 'Academic',
    categoryIcon: <GraduationCap className="w-4 h-4 mr-1" />,
    categoryColor: 'text-blue-600 bg-blue-50 border-blue-200',
    badge: { text: 'Popular', color: 'bg-orange-500' },
  },
];

const tabs = [
  { id: 'All', label: 'All', count: 6 },
  { id: 'Academic', label: 'Academic', count: 2, icon: <GraduationCap className="w-4 h-4 mr-1" /> },
  { id: 'Insights', label: 'Insights', count: 1, icon: <Lightbulb className="w-4 h-4 mr-1" /> },
  { id: 'Utility', label: 'Utility', count: 2, icon: <Wrench className="w-4 h-4 mr-1" /> },
  { id: 'Analytics', label: 'Analytics', count: 1, icon: <BarChart2 className="w-4 h-4 mr-1" /> },
];

export default function AppsCenter() {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredApps = appsData.filter(app => {
    const matchesTab = activeTab === 'All' || app.category === activeTab;
    const matchesSearch = app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Apps Center</h1>
        <p className="text-gray-500 text-sm mt-1">
          6 ready-to-use tools that sit on top of your data — question papers, exam-hall seating, student 360, financial reports and exports. Nothing to install.
        </p>
      </div>

      <div className="bg-white rounded-none p-3 shadow-sm mb-6 flex items-center justify-between border border-gray-200">
        <div className="relative w-[400px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search tools..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-none focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex space-x-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-none text-sm font-medium transition-colors border ${activeTab === tab.id
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
            >
              {tab.icon && React.cloneElement(tab.icon, { className: `w-4 h-4 mr-1.5 ${activeTab === tab.id ? 'text-white' : 'text-gray-400'}` })}
              {tab.label}
              <span className={`ml-2 px-2 py-0.5 rounded-none text-xs ${activeTab === tab.id ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-500 border border-gray-200'
                }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      <button className="flex items-center text-gray-600 hover:text-gray-800 text-sm font-medium mb-6 border border-gray-200 bg-white px-4 py-2 rounded-none shadow-sm">
        <Info className="w-4 h-4 mr-2 text-gray-400" /> Show what's coming next <span className="ml-2 px-1.5 py-0.5 bg-gray-100 border border-gray-200 rounded-none text-xs text-gray-500">9</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredApps.map(app => (
          <div key={app.id} className="bg-white rounded-none shadow-sm border border-gray-200 p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className={`w-16 h-16 rounded-none flex items-center justify-center mb-5 ${app.iconBg} shadow-sm`}>
              {app.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{app.title}</h3>
            <p className="text-gray-500 text-sm mb-6 flex-grow">{app.description}</p>

            <div className="w-full flex justify-between items-center mb-6">
              <span className={`flex items-center px-3 py-1 rounded-none text-xs font-medium border ${app.categoryColor}`}>
                {app.categoryIcon}
                {app.category}
              </span>
              {app.badge && (
                <span className={`${app.badge.color} text-white px-3 py-1 rounded-none text-[10px] uppercase font-bold flex items-center`}>
                  {app.badge.text === 'Popular' && <span className="mr-1">🔥</span>}
                  {app.badge.text === 'New' && <span className="mr-1">⭐</span>}
                  {app.badge.text}
                </span>
              )}
            </div>

            <button className="w-full py-2.5 border border-gray-200 rounded-none text-gray-600 font-medium text-sm flex items-center justify-center hover:bg-gray-50 transition-colors">
              <ArrowRight className="w-4 h-4 mr-2" /> Open Tool
            </button>
          </div>
        ))}
        {filteredApps.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500">
            No tools found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}
