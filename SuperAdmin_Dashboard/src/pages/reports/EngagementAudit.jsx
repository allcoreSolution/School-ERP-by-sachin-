import React, { useState } from 'react';
import { FileDown, Filter, GraduationCap, Megaphone, Users, MinusCircle, Info } from 'lucide-react';

const mockAudits = [
  {
    id: 1,
    name: 'Yug International',
    code: 'YIS',
    score: 85,
    status: 'DEEPLY INTEGRATED',
    statusColor: 'bg-[#22c55e]',
    academic: 11,
    communication: 5,
    logistics: 26,
    activity: 'Dormant',
    actions: 0
  },
  {
    id: 2,
    name: 'Beer School',
    code: 'DISCxxxxx',
    score: 70,
    status: 'ACTIVE',
    statusColor: 'bg-[#3b82f6]',
    academic: 3,
    communication: 1,
    logistics: 22,
    activity: 'Dormant',
    actions: 0
  },
  {
    id: 3,
    name: 'xyz',
    code: 'XYZ',
    score: 65,
    status: 'ACTIVE',
    statusColor: 'bg-[#3b82f6]',
    academic: 1,
    communication: 5,
    logistics: 1,
    activity: 'Steady',
    activityColor: 'text-[#3b82f6]',
    actions: 4
  },
  {
    id: 4,
    name: 'Flow nue',
    code: '24234',
    score: 55,
    status: 'ACTIVE',
    statusColor: 'bg-[#3b82f6]',
    academic: 2,
    communication: 1,
    logistics: 19,
    activity: 'Dormant',
    actions: 0
  },
  {
    id: 5,
    name: 'SSVP 2.0',
    code: '',
    score: 55,
    status: 'ACTIVE',
    statusColor: 'bg-[#3b82f6]',
    academic: 4,
    communication: 4,
    logistics: 18,
    activity: 'Dormant',
    actions: 0
  },
  {
    id: 6,
    name: 'ZIDO INTERNATIONAL SCHOOL',
    code: '',
    score: 55,
    status: 'ACTIVE',
    statusColor: 'bg-[#3b82f6]',
    academic: 1,
    communication: 4,
    logistics: 18,
    activity: 'Dormant',
    actions: 0
  },
  {
    id: 7,
    name: 'SUDHAKAR',
    code: '',
    score: 55,
    status: 'ACTIVE',
    statusColor: 'bg-[#3b82f6]',
    academic: 1,
    communication: 369,
    logistics: 18,
    activity: 'Steady',
    activityColor: 'text-[#3b82f6]',
    actions: 1
  }
];

export default function EngagementAudit() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAudits = mockAudits.filter((audit) => {
    const term = searchTerm.toLowerCase();
    return (
      audit.name.toLowerCase().includes(term) ||
      audit.code.toLowerCase().includes(term) ||
      audit.status.toLowerCase().includes(term) ||
      audit.activity.toLowerCase().includes(term)
    );
  });

  const handleExport = () => {
    if (filteredAudits.length === 0) return alert('No data to export');
    const headers = ['ID', 'Institution', 'Code', 'Score', 'Status', 'Academic', 'Communication', 'Logistics', 'Activity', 'Actions'];
    const rows = filteredAudits.map(a => [
      a.id, 
      a.name, 
      a.code, 
      a.score, 
      a.status, 
      a.academic, 
      a.communication, 
      a.logistics, 
      a.activity, 
      a.actions
    ].map(val => `"${val}"`).join(',')).join('\n');
    
    const csv = `${headers.join(',')}\n${rows}`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'engagement_audit.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-[1150px] w-full mx-auto min-h-[85vh] p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[26px] font-bold text-slate-800 tracking-tight">Module Engagement Audit</h1>
        <button onClick={handleExport} className="flex items-center gap-2 bg-[#22c55e] hover:bg-green-600 text-white px-4 py-2.5 rounded-none text-[13px] font-semibold transition-colors shadow-sm">
          <FileDown className="w-4 h-4" /> Export Audit
        </button>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden">
        
        {/* Panel Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
           <div className="flex items-center gap-2 text-[14px] font-bold text-slate-800 uppercase tracking-wide">
             <Filter className="w-4 h-4" strokeWidth={3} /> FEATURE ADOPTION & AUDIT
           </div>
           <div className="text-[11px] font-semibold text-gray-500 bg-gray-50 border border-gray-200 px-3 py-1 rounded-none shadow-sm">
             Auditing 453 Institutions
           </div>
        </div>
        
      {/* Table Controls (Show entries, Search) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border-b border-gray-100 bg-white gap-3">
          <div className="text-[12px] font-bold text-gray-500 flex items-center gap-2">
            SHOW 
            <select className="border border-gray-300 rounded-none px-2 py-1 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-medium">
               <option>25</option>
               <option>50</option>
               <option>100</option>
            </select>
            ENTRIES
          </div>
          <div className="flex items-center gap-2 text-[12px] font-bold text-gray-500">
             SEARCH AUDIT:
             <input 
               type="text" 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="border border-gray-300 rounded-none px-3 py-1.5 w-full md:w-56 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-medium" 
             />
          </div>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto pb-4 pt-1">
          <table className="w-full text-sm border-collapse border border-slate-300 shadow-sm bg-white">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-300">
                <th className="text-left px-3 py-2.5 text-[12px] font-bold text-slate-700 tracking-wide border-x border-slate-200 w-12"># ⇅</th>
                <th className="text-left px-3 py-2.5 text-[12px] font-bold text-slate-700 tracking-wide border-x border-slate-200">Institution Name ⇅</th>
                <th className="text-center px-3 py-2.5 text-[12px] font-bold text-slate-700 tracking-wide border-x border-slate-200">Integration Score ⇅</th>
                <th className="text-center px-3 py-2.5 text-[12px] font-bold text-slate-700 tracking-wide border-x border-slate-200">Status ⇅</th>
                <th className="text-center px-3 py-2.5 text-[12px] font-bold text-slate-700 tracking-wide border-x border-slate-200">
                  <div className="flex items-center justify-center gap-1.5"><GraduationCap className="w-3.5 h-3.5 text-blue-500" /> Academic ⇅</div>
                </th>
                <th className="text-center px-3 py-2.5 text-[12px] font-bold text-slate-700 tracking-wide border-x border-slate-200">
                  <div className="flex items-center justify-center gap-1.5"><Megaphone className="w-3.5 h-3.5 text-blue-500" /> Communication ⇅</div>
                </th>
                <th className="text-center px-3 py-2.5 text-[12px] font-bold text-slate-700 tracking-wide border-x border-slate-200">
                  <div className="flex items-center justify-center gap-1.5"><Users className="w-3.5 h-3.5 text-blue-500" /> Logistics ⇅</div>
                </th>
                <th className="text-center px-3 py-2.5 text-[12px] font-bold text-slate-700 tracking-wide border-x border-slate-200">Recent Activity (30d) ⇅</th>
              </tr>
            </thead>
            <tbody>
              {filteredAudits.map((audit, index) => (
                <tr key={index} className="hover:bg-slate-50 transition-colors bg-white group border-b border-slate-200">
                  
                  <td className="px-3 py-2.5 text-slate-500 text-[13px] font-medium align-middle w-12 border-x border-slate-200 bg-slate-50/50 text-center">
                    {audit.id}
                  </td>
                  
                  <td className="px-3 py-2.5 align-middle border-x border-slate-200 min-w-[180px]">
                    <div className="text-[13px] font-bold text-slate-800 leading-snug">{audit.name}</div>
                    <div className="text-[11px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">{audit.code || '\u00A0'}</div>
                  </td>
                  
                  <td className="px-3 py-2.5 align-middle border-x border-slate-200 text-center bg-gray-50/30">
                    <div className="text-[14px] font-bold text-slate-800">
                      {audit.score}<span className="text-[11px] text-gray-400 font-medium ml-0.5">/100</span>
                    </div>
                  </td>
                  
                  <td className="px-3 py-2.5 align-middle border-x border-slate-200 text-center whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded-none text-[10px] font-bold uppercase tracking-widest text-white shadow-sm inline-block ${audit.statusColor}`}>
                      {audit.status}
                    </span>
                  </td>
                  
                  <td className="px-3 py-2.5 align-middle border-x border-slate-200 text-center bg-slate-50/50">
                     <span className="text-[13px] font-bold text-slate-800 font-mono">{audit.academic}</span>
                  </td>
                  
                  <td className="px-3 py-2.5 align-middle border-x border-slate-200 text-center">
                     <span className="text-[13px] font-bold text-slate-800 font-mono">{audit.communication}</span>
                  </td>
                  
                  <td className="px-3 py-2.5 align-middle border-x border-slate-200 text-center bg-slate-50/50">
                     <span className="text-[13px] font-bold text-slate-800 font-mono">{audit.logistics}</span>
                  </td>
                  
                  <td className="px-3 py-2.5 align-middle border-x border-slate-200 text-center whitespace-nowrap">
                    <div className={`flex items-center justify-center gap-1.5 text-[13px] font-bold ${audit.activityColor || 'text-red-500'}`}>
                      <MinusCircle className="w-3.5 h-3.5" /> {audit.activity}
                    </div>
                    <div className="text-[11px] text-gray-500 font-medium mt-0.5">
                      {audit.actions} actions
                    </div>
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
