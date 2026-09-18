import React from 'react';
import { Filter, Search } from 'lucide-react';

export default function AdmitCards() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-10 p-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Bulk Download Admit Cards</h1>

      <div className="bg-white border border-slate-200 rounded-none shadow-sm">
        <div className="px-4 py-3 border-b border-slate-200 bg-[#f8f9fc] flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#6f42c1]" />
          <h2 className="text-sm font-bold text-[#6f42c1]">Select Criteria</h2>
        </div>
        <div className="p-6 flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 space-y-1">
            <label className="text-xs font-bold text-red-500">Exam *</label>
            <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#6f42c1] bg-white">
              <option>Annual Examination</option>
            </select>
          </div>
          <div className="flex-1 space-y-1">
            <label className="text-xs font-bold text-red-500">Class *</label>
            <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#6f42c1] bg-white">
              <option>Select Class</option>
            </select>
          </div>
          <div className="flex-1 space-y-1">
            <label className="text-xs font-bold text-red-500">Section *</label>
            <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#6f42c1] bg-white">
              <option>Select Section</option>
            </select>
          </div>
          <div className="pb-[1px]">
            <button className="px-6 py-2 bg-[#5b5fcf] hover:bg-[#4a4db5] text-white rounded-none text-sm font-bold flex items-center gap-2 shadow-sm cursor-pointer transition-colors border-none h-[38px]">
              <Search className="w-4 h-4" /> Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
