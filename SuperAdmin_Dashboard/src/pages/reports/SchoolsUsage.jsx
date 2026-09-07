import React, { useState } from 'react';
import { FileDown, Filter, RefreshCcw, Crown, Shield } from 'lucide-react';

const mockSchools = [
  {
    id: 1,
    name: 'Yug International',
    plan: 'Enterprise Plan',
    planIcon: Crown,
    students: 281,
    staff: 6,
    classes: 15,
    expiryDate: 'Feb 26, 2027',
    expiryText: '176 days left',
    isExpired: false,
    status: 'ACTIVE',
    revenue: '0.00'
  },
  {
    id: 2,
    name: 'Test',
    plan: 'Trial Plan',
    planIcon: Shield,
    students: 0,
    staff: 0,
    classes: 0,
    expiryDate: 'Mar 26, 2026',
    expiryText: 'Expired',
    isExpired: true,
    status: 'SUSPENDED',
    revenue: '0.00'
  },
  {
    id: 3,
    name: 'My School high school',
    plan: 'Trial Plan',
    planIcon: Shield,
    students: 3,
    staff: 1,
    classes: 9,
    expiryDate: 'Mar 26, 2026',
    expiryText: 'Expired',
    isExpired: true,
    status: 'SUSPENDED',
    revenue: '0.00'
  },
  {
    id: 4,
    name: 'Ratnakar North Point School',
    plan: 'Enterprise Plan',
    planIcon: Crown,
    students: 52,
    staff: 0,
    classes: 1,
    expiryDate: 'Dec 26, 2026',
    expiryText: '114 days left',
    isExpired: false,
    status: 'ACTIVE',
    revenue: '0.00'
  }
];

export default function SchoolsUsage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSchools = mockSchools.filter((school) => {
    const term = searchTerm.toLowerCase();
    return (
      school.name.toLowerCase().includes(term) ||
      school.plan.toLowerCase().includes(term)
    );
  });

  const handleExport = () => {
    if (filteredSchools.length === 0) return alert('No data to export');
    const headers = ['ID', 'Institution', 'Plan', 'Students', 'Staff', 'Classes', 'Expiry Date', 'Status', 'LTV Revenue'];
    const rows = filteredSchools.map(s => [
      s.id, 
      s.name, 
      s.plan, 
      s.students, 
      s.staff, 
      s.classes, 
      s.expiryDate, 
      s.status, 
      s.revenue
    ].map(val => `"${val}"`).join(',')).join('\n');
    
    const csv = `${headers.join(',')}\n${rows}`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'schools_usage.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-[1150px] w-full mx-auto min-h-[85vh] p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[26px] font-bold text-slate-800 tracking-tight">Schools Usage & Health Report</h1>
        <button onClick={handleExport} className="flex items-center gap-2 bg-[#22c55e] hover:bg-green-600 text-white px-4 py-2.5 rounded-none text-[13px] font-semibold transition-colors shadow-sm">
          <FileDown className="w-4 h-4" /> Export to CSV
        </button>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-none border border-gray-200 shadow-sm mb-6">
        <div className="flex items-center p-4 border-b border-gray-100 text-slate-800 font-bold gap-2">
          <Filter className="w-4 h-4" strokeWidth={2.5} /> Search & Filters
        </div>
        
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-5">
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1.5">Status</label>
              <select className="w-full border border-gray-200 rounded-none px-3 py-2 text-[13px] text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-orange-500">
                <option>All Statuses</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1.5">Plan Tier</label>
              <select className="w-full border border-gray-200 rounded-none px-3 py-2 text-[13px] text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-orange-500">
                <option>All Plans</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1.5">Expiry Window</label>
              <select className="w-full border border-gray-200 rounded-none px-3 py-2 text-[13px] text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-orange-500">
                <option>Any Expiry</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1.5">Keywords</label>
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Name, Code, or Email..." 
                className="w-full border border-gray-200 rounded-none px-3 py-2 text-[13px] text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-orange-500 placeholder-gray-400" 
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3 text-right">
            <button className="flex items-center gap-2 bg-[#f97316] hover:bg-orange-600 text-white px-6 py-2 rounded-none text-[13px] font-bold transition-colors shadow-sm">
              <Filter className="w-4 h-4" /> Apply Filters
            </button>
            <button className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-none text-[13px] font-bold transition-colors shadow-sm">
              <RefreshCcw className="w-4 h-4" /> Reset
            </button>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto pb-4 mt-2">
        <table className="w-full text-sm border-collapse border border-slate-300 shadow-sm bg-white">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-300">
              <th className="text-left px-3 py-2.5 text-[12px] font-bold text-slate-700 tracking-wide border-x border-slate-200 w-12">#</th>
              <th className="text-left px-3 py-2.5 text-[12px] font-bold text-slate-700 tracking-wide border-x border-slate-200">Institution</th>
              <th className="text-center px-3 py-2.5 text-[12px] font-bold text-slate-700 tracking-wide border-x border-slate-200 w-24">Students</th>
              <th className="text-center px-3 py-2.5 text-[12px] font-bold text-slate-700 tracking-wide border-x border-slate-200 w-24">Staff</th>
              <th className="text-center px-3 py-2.5 text-[12px] font-bold text-slate-700 tracking-wide border-x border-slate-200 w-24">Classes</th>
              <th className="text-left px-3 py-2.5 text-[12px] font-bold text-slate-700 tracking-wide border-x border-slate-200">Expiry</th>
              <th className="text-center px-3 py-2.5 text-[12px] font-bold text-slate-700 tracking-wide border-x border-slate-200">Status</th>
              <th className="text-right px-3 py-2.5 text-[12px] font-bold text-slate-700 tracking-wide border-x border-slate-200 w-32">LTV Revenue</th>
            </tr>
          </thead>
          <tbody>
            {filteredSchools.map((school, index) => (
              <tr key={index} className="hover:bg-slate-50 transition-colors bg-white group border-b border-slate-200">
                
                <td className="px-3 py-2.5 text-slate-500 text-[13px] font-medium align-middle w-12 border-x border-slate-200 bg-slate-50/50 text-center">
                  {school.id}
                </td>
                
                <td className="px-3 py-2.5 align-middle border-x border-slate-200 min-w-[200px]">
                  <div className="text-[13px] font-bold text-slate-800 leading-tight block">
                    {school.name}
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <school.planIcon className="w-3 h-3 text-slate-400" />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{school.plan}</span>
                  </div>
                </td>
                
                <td className="px-3 py-2.5 align-middle border-x border-slate-200 text-center bg-blue-50/20">
                  <span className="text-[14px] font-bold text-blue-700">{school.students}</span>
                </td>
                
                <td className="px-3 py-2.5 align-middle border-x border-slate-200 text-center font-mono">
                  <span className="text-[13px] text-slate-600 font-bold">{school.staff}</span>
                </td>
                
                <td className="px-3 py-2.5 align-middle border-x border-slate-200 text-center font-mono">
                  <span className="text-[13px] text-slate-600 font-bold">{school.classes}</span>
                </td>
                
                <td className="px-3 py-2.5 align-middle border-x border-slate-200 whitespace-nowrap">
                  <div className={`text-[12px] font-bold leading-snug ${school.isExpired ? 'text-red-600' : 'text-emerald-700'}`}>
                    {school.expiryDate}
                  </div>
                  <div className={`text-[10px] font-bold tracking-widest uppercase mt-0.5 inline-block px-1.5 py-0.5 border ${school.isExpired ? 'bg-red-50 text-red-600 border-red-200' : 'bg-emerald-50 text-emerald-600 border-emerald-200'}`}>
                    {school.expiryText}
                  </div>
                </td>
                
                <td className="px-3 py-2.5 align-middle border-x border-slate-200 text-center whitespace-nowrap">
                  <span className={`px-2 py-0.5 rounded-none text-[10px] font-bold uppercase tracking-widest text-white shadow-sm inline-block ${
                    school.status === 'ACTIVE' ? 'bg-[#22c55e]' : 'bg-[#ef4444]'
                  }`}>
                    {school.status}
                  </span>
                </td>
                
                <td className="px-3 py-2.5 text-right align-middle border-x border-slate-200 font-mono text-[13px] bg-slate-50/50 min-w-[120px]">
                  <span className="font-bold text-slate-800">
                    ₹{school.revenue}
                  </span>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
