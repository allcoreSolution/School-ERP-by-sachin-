import React, { useState } from 'react';
import { Search, Mail, Info, ChevronDown } from 'lucide-react';

const Branches = () => {
  const [activeTab, setActiveTab] = useState('All');

  const branchesData = [
    { id: '#172', name: 'SUDHAKAR', email: 'cloudwaveindia@gmail.com', plan: 'Trial Plan', rows: '4,831', reg: '08 Jul, 2026', sub: '19 Sep, 2030', status: 'Active', highlight: true },
    { id: '#122', name: 'Risma high school', email: 'ramaictsolutions@gmail.com', plan: 'Growth Plan', rows: '2,394', reg: '24 May, 2026', sub: '24 May, 2027', status: 'Active' },
    { id: '#96', name: 'SSVP 3.0', email: 'rahulthakur01@gmail.com', plan: 'Enterprise Plan', rows: '1,812', reg: '08 May, 2026', sub: '08 May, 2027', status: 'Active' },
    { id: '#41', name: 'Aksya School', email: 'pixllerindia@gmail.com', plan: 'Trial Plan', rows: '88', reg: '02 Apr, 2026', sub: '02 Apr, 2027', status: 'Active' },
    { id: '#167', name: 'CLOUDWAVE INTERNATIONAL SCHOOL', email: 'pandey.sudhakar88@gmail.com', plan: 'Enterprise Plan', rows: '61', reg: '03 Jul, 2026', sub: '03 Jul, 2027', status: 'Active' },
  ];

  const tabs = [
    { name: 'All', count: branchesData.length },
    { name: 'Active', count: branchesData.filter(b => b.status === 'Active').length },
    { name: 'Inactive', count: branchesData.filter(b => b.status === 'Inactive').length },
    { name: 'Suspended', count: branchesData.filter(b => b.status === 'Suspended').length },
    { name: 'Expiring', count: branchesData.filter(b => b.status === 'Expiring').length },
  ];

  const filteredBranches = activeTab === 'All' 
    ? branchesData 
    : branchesData.filter(branch => branch.status === activeTab);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto bg-white min-h-[calc(100vh-70px)]">
      
      {/* Header */}
      <div className="mb-6 flex items-baseline gap-2">
        <h1 className="text-[22px] font-semibold text-gray-800 tracking-tight">Manage Schools</h1>
        <span className="text-[14px] text-gray-400 font-medium">{filteredBranches.length} total</span>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6 font-medium text-[14px] overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`px-5 py-2.5 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === tab.name 
                ? 'text-[#17a2b8] border-b-2 border-[#17a2b8]' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.name} <span className="text-[12px] opacity-70">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-6">
        <div className="relative md:col-span-5">
          <Search className="w-4 h-4 absolute left-3 top-[11px] text-gray-400" />
          <input 
            type="text" 
            placeholder="Search name or email..." 
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-[3px] text-[13.5px] focus:outline-none focus:border-[#17a2b8]"
          />
        </div>
        <div className="md:col-span-2">
          <div className="relative">
            <select className="w-full appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-[3px] text-[13.5px] text-gray-600 bg-white focus:outline-none focus:border-[#17a2b8]">
              <option>Plan</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2.5 top-[11px] text-gray-400 pointer-events-none" />
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="relative">
            <select className="w-full appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-[3px] text-[13.5px] text-gray-600 bg-white focus:outline-none focus:border-[#17a2b8]">
              <option>Registered</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2.5 top-[11px] text-gray-400 pointer-events-none" />
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="relative">
            <select className="w-full appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-[3px] text-[13.5px] text-gray-600 bg-white focus:outline-none focus:border-[#17a2b8]">
              <option>Sort</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2.5 top-[11px] text-gray-400 pointer-events-none" />
          </div>
        </div>
        <div className="md:col-span-1">
          <button className="w-full py-2 bg-[#17a2b8] hover:bg-[#138496] text-white font-medium text-[13.5px] rounded-[3px] transition-colors shadow-sm">
            Search
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-100 text-left text-[13px] font-bold text-gray-800">
              <th className="border border-gray-200 py-2.5 px-2.5 w-[60px] whitespace-nowrap">ID</th>
              <th className="border border-gray-200 py-2.5 px-2.5 w-[25%] min-w-[150px]">School Details</th>
              <th className="border border-gray-200 py-2.5 px-2.5">Plan</th>
              <th className="border border-gray-200 py-2.5 px-2.5 whitespace-nowrap">Status</th>
              <th className="border border-gray-200 py-2.5 px-2.5 flex items-center gap-1.5 whitespace-nowrap">
                DB Rows <Info className="w-3.5 h-3.5 text-gray-400" />
              </th>
              <th className="border border-gray-200 py-2.5 px-2.5 whitespace-nowrap">Registered</th>
              <th className="border border-gray-200 py-2.5 px-2.5 whitespace-nowrap">Subscription</th>
              <th className="border border-gray-200 py-2.5 px-2.5 text-center whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="text-[12.5px]">
            {filteredBranches.map((branch, i) => (
              <tr 
                key={i} 
                className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${branch.highlight ? 'bg-[#fff5ee] hover:bg-[#fff0e6]' : ''}`}
              >
                <td className="border border-gray-200 py-3 px-2.5 text-gray-600 font-semibold whitespace-nowrap">{branch.id}</td>
                <td className="border border-gray-200 py-3 px-2.5 break-words">
                  <div className="font-bold text-gray-800 uppercase tracking-tight">{branch.name}</div>
                  <div className="text-gray-500 text-[11.5px] flex items-center gap-1 mt-0.5 break-words">
                    <Mail className="w-3 h-3 text-gray-400 shrink-0" /> {branch.email}
                  </div>
                </td>
                <td className="border border-gray-200 py-3 px-2.5 break-words">
                  <span className="bg-[#17a2b8] text-white px-2 py-0.5 rounded-[3px] text-[10.5px] font-semibold shadow-sm tracking-wide inline-block">
                    {branch.plan}
                  </span>
                </td>
                <td className="border border-gray-200 py-3 px-2.5 whitespace-nowrap">
                  <span className={`text-white px-2 py-1 rounded-[3px] text-[10.5px] font-bold tracking-wider shadow-sm uppercase ${
                    branch.status === 'Active' ? 'bg-[#28a745]' : 
                    branch.status === 'Inactive' ? 'bg-gray-500' :
                    branch.status === 'Suspended' ? 'bg-[#dc3545]' : 'bg-[#fd7e14]'
                  }`}>
                    {branch.status}
                  </span>
                </td>
                <td className="border border-gray-200 py-3 px-2.5 font-bold text-gray-800 whitespace-nowrap">{branch.rows}</td>
                <td className="border border-gray-200 py-3 px-2.5 text-gray-500 font-medium whitespace-nowrap">{branch.reg}</td>
                <td className="border border-gray-200 py-3 px-2.5 text-gray-500 font-medium whitespace-nowrap">{branch.sub}</td>
                <td className="border border-gray-200 py-3 px-2.5 whitespace-nowrap">
                  <div className="flex justify-center">
                    <button className="flex items-center gap-1.5 bg-[#17a2b8] hover:bg-[#138496] text-white px-3 py-1.5 rounded-[3px] font-medium transition-colors text-[12.5px] shadow-sm">
                      Manage <ChevronDown className="w-3 h-3 border-l border-white/20 pl-1 ml-1" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredBranches.length === 0 && (
              <tr>
                <td colSpan="8" className="py-8 text-center text-gray-500 bg-gray-50 font-medium">
                  No branches found in this view.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Branches;
