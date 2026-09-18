import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Plus, List, Grid, Search, Eye, Edit2, Phone, Mail, FileText, Download, Printer, LayoutGrid, ChevronRight
} from 'lucide-react';

const ParentsList = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'grid'
  const [searchQuery, setSearchQuery] = useState('');

  const parents = [
    { id: 1, name: 'Alok Nath', phone: '9876500267', login: 'P9876500267', children: 2, added: '25 Feb, 2026' },
    { id: 2, name: 'Alok Nath', phone: '9876500547', login: 'P9876500547', children: 1, added: '25 Feb, 2026' },
    { id: 3, name: 'Alok Nath', phone: '9876500067', login: 'P9876500067', children: 1, added: '25 Feb, 2026' },
    { id: 4, name: 'Alok Nath', phone: '9876500387', altPhone: 'P9876500387', login: 'P9876500387', children: 2, added: '25 Feb, 2026' },
    { id: 5, name: 'Alok Nath', phone: '9876500151', login: 'P9876500151', children: 1, added: '25 Feb, 2026' },
    { id: 6, name: 'Alok Nath', phone: '9876500467', login: 'P9876500467', children: 1, added: '25 Feb, 2026' },
    { id: 7, name: 'Aman Kapoor', phone: '9876500259', login: 'P9876500259', children: 1, added: '25 Feb, 2026' },
    { id: 8, name: 'Aman Kapoor', phone: '9876500539', login: 'P9876500539', children: 1, added: '25 Feb, 2026' },
    { id: 9, name: 'Aman Kapoor', phone: '9876500059', login: 'P9876500059', children: 1, added: '25 Feb, 2026' },
  ];

  const filteredParents = parents.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.login.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopy = () => {
    const text = filteredParents.map(p => `${p.name}\t${p.login}\t${p.phone}\t${p.children} children\t${p.added}`).join('\n');
    navigator.clipboard.writeText(`Name\tLogin\tPhone\tChildren\tAdded\n${text}`);
    alert('Copied to clipboard!');
  };

  const handleExportCSV = (isExcel = false) => {
    const header = "Name,Login,Phone,Children,Added\n";
    const csvContent = filteredParents.map(p => 
      `"${p.name}","${p.login}","${p.phone}","${p.children} children","${p.added}"`
    ).join('\n');
    const blob = new Blob([header + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `parents_list.${isExcel ? 'xls' : 'csv'}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 h-full flex flex-col bg-gray-50 overflow-y-auto">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Parents & Guardians</h1>
          <p className="text-sm text-gray-500 mt-1">Every parent account in your school, with the children linked to each one.</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs font-semibold text-[#5F52FF]">284 Parent Accounts</span>
          <button 
            onClick={() => navigate('/students/parents/add')}
            className="flex items-center gap-2 px-4 py-2 bg-[#5F52FF] text-white rounded-none font-semibold text-sm hover:bg-[#4E41E6] shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Parent
          </button>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-none shadow-sm border border-gray-200 flex flex-col flex-1 min-h-0">
        
        {/* Card Header & Toolbar */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[15px] font-bold text-gray-800 flex items-center gap-2">
              <Users className="w-4 h-4 text-[#5F52FF]" /> Parent Accounts
            </h2>
            <div className="flex border border-gray-300 rounded-none overflow-hidden shadow-sm">
              <button 
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 flex items-center justify-center transition-colors ${viewMode === 'list' ? 'bg-[#EEEDFF] text-[#5F52FF]' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
              >
                <List className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 flex items-center justify-center border-l border-gray-300 transition-colors ${viewMode === 'grid' ? 'bg-[#EEEDFF] text-[#5F52FF]' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Left Toolbar */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Show</span>
                <select className="border border-gray-300 rounded-none px-2 py-1 text-sm focus:outline-none focus:border-[#5F52FF]">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
              </div>
              
              <div className="h-6 w-px bg-gray-300 mx-1"></div>
              
              <button onClick={handleCopy} className="p-1.5 border border-gray-300 rounded-none hover:bg-gray-50 text-gray-600 tooltip" title="Copy">
                <FileText className="w-4 h-4" />
              </button>
              <button onClick={() => handleExportCSV(false)} className="px-3 py-1.5 border border-gray-300 rounded-none hover:bg-gray-50 text-gray-600 text-xs font-semibold">
                CSV
              </button>
              <button onClick={() => handleExportCSV(true)} className="px-3 py-1.5 border border-gray-300 rounded-none hover:bg-gray-50 text-gray-600 text-xs font-semibold">
                Excel
              </button>
              <button onClick={handlePrint} className="px-3 py-1.5 border border-gray-300 rounded-none hover:bg-gray-50 text-gray-600 text-xs font-semibold">
                PDF
              </button>
              <button onClick={handlePrint} className="p-1.5 border border-gray-300 rounded-none hover:bg-gray-50 text-gray-600" title="Print">
                <Printer className="w-4 h-4" />
              </button>
              
              <div className="h-6 w-px bg-gray-300 mx-1"></div>

              <button className="px-3 py-1.5 border border-gray-300 rounded-none hover:bg-gray-50 text-gray-600 text-xs font-semibold flex items-center gap-1.5">
                <LayoutGrid className="w-3.5 h-3.5" /> Columns <ChevronRight className="w-3 h-3 rotate-90" />
              </button>
            </div>

            {/* Right Toolbar */}
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search by name or username..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-gray-300 rounded-none pl-3 pr-8 py-1.5 text-sm w-64 focus:outline-none focus:border-[#5F52FF]"
              />
              <Search className="w-4 h-4 text-gray-400 absolute right-2.5 top-2" />
            </div>
          </div>
        </div>

        {/* Dynamic Content Area (List or Grid) */}
        <div className="flex-1 overflow-auto bg-gray-50/30">
          {viewMode === 'list' ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8F7FF] border-b border-gray-200 text-[11px] font-bold text-gray-600 uppercase tracking-wider">
                  <th className="px-5 py-3 border-r border-gray-200 w-[30%]">Parent</th>
                  <th className="px-5 py-3 border-r border-gray-200 w-[25%]">Login / Username</th>
                  <th className="px-5 py-3 border-r border-gray-200 w-[15%]">Children</th>
                  <th className="px-5 py-3 border-r border-gray-200 w-[15%]">Added</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {filteredParents.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-5 py-8 text-center text-gray-500 bg-white">
                      No parents found matching "{searchQuery}"
                    </td>
                  </tr>
                ) : (
                  filteredParents.map((parent) => (
                    <tr key={parent.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors bg-white">
                      <td className="px-5 py-3 border-r border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-none bg-[#EEEDFF] text-[#5F52FF] flex items-center justify-center font-bold text-sm">
                            {parent.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800 text-[13px]">{parent.name}</div>
                            <div className="flex items-center gap-3 text-[11px] text-gray-500 mt-0.5">
                              <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {parent.phone}</span>
                              {parent.altPhone && (
                                <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {parent.altPhone}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3 border-r border-gray-100 font-medium text-gray-700 text-[13px]">
                        {parent.login}
                      </td>
                      <td className="px-5 py-3 border-r border-gray-100">
                        <span className="text-[#5F52FF] hover:underline cursor-pointer text-[13px] font-medium">
                          {parent.children} {parent.children === 1 ? 'child' : 'children'}
                        </span>
                      </td>
                      <td className="px-5 py-3 border-r border-gray-100 text-gray-600 text-[13px]">
                        {parent.added}
                      </td>
                      <td className="px-5 py-3 text-right">
                        <div className="flex items-center justify-end gap-3 text-gray-400">
                          <Eye className="w-4 h-4 hover:text-[#5F52FF] cursor-pointer transition-colors" />
                          <Edit2 className="w-4 h-4 hover:text-[#5F52FF] cursor-pointer transition-colors" />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          ) : (
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-in fade-in duration-300">
              {filteredParents.length === 0 ? (
                <div className="col-span-full py-8 text-center text-gray-500">
                  No parents found matching "{searchQuery}"
                </div>
              ) : (
                filteredParents.map((parent) => (
                  <div key={parent.id} className="bg-white border border-gray-200 rounded-none p-5 shadow-sm hover:shadow-md transition-shadow relative group flex flex-col">
                    
                    {/* Actions (visible on hover) */}
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button className="p-1.5 bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-none border border-gray-200"><Eye className="w-3.5 h-3.5" /></button>
                       <button className="p-1.5 bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-none border border-gray-200"><Edit2 className="w-3.5 h-3.5" /></button>
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-none bg-[#EEEDFF] text-[#5F52FF] flex items-center justify-center font-bold text-lg">
                        {parent.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-gray-800">{parent.name}</div>
                        <div className="text-xs text-gray-500">Added: {parent.added}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm mt-auto">
                      <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                        <span className="text-gray-500 text-xs font-semibold uppercase">Login</span>
                        <span className="font-medium text-gray-800">{parent.login}</span>
                      </div>
                      <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                        <span className="text-gray-500 text-xs font-semibold uppercase">Phone</span>
                        <span className="font-medium text-gray-800 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-gray-400" />{parent.phone}</span>
                      </div>
                      <div className="flex justify-between items-center py-1.5 pt-2">
                        <span className="text-gray-500 text-xs font-semibold uppercase">Linked</span>
                        <span className="text-[#5F52FF] hover:underline cursor-pointer font-bold text-xs bg-[#F8F7FF] px-2 py-1 rounded">
                          {parent.children} {parent.children === 1 ? 'CHILD' : 'CHILDREN'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ParentsList;
