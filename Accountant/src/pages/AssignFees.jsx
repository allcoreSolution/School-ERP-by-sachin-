import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  Gauge, BookOpen, HandCoins, FileSearch, ArrowLeftRight, Globe, FileText, 
  MoreHorizontal, Search, PenTool, HelpCircle
} from 'lucide-react';

const AssignFees = () => {
  return (
    <div className="min-h-screen bg-[#ecf0f5] text-[#333] p-4 sm:p-6 font-sans">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-4 border-b border-gray-300 pb-4">
        <div>
          <h1 className="text-[24px] font-bold text-[#333] mb-1">Finance & Fees</h1>
          <p className="text-[13px] text-gray-500">Manage fee types, groups, collection, challans, and reports across the school.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-[3px] bg-white text-[#333] text-[13px] font-semibold hover:bg-gray-50">
            <PenTool className="w-4 h-4" /> Quick Setup
          </button>
        </div>
      </div>

      {/* Nav Tabs */}
      <div className="flex flex-wrap gap-6 mb-8 text-[14px]">
        {[
          { label: 'Dashboard', icon: Gauge , path: '/accounts/dashboard' },
          { label: 'Guide', icon: BookOpen },
          { label: 'Collect Fees', icon: HandCoins , path: '/fees/collect' },
          { label: 'Search Due Fees', icon: FileSearch , path: '/fees/due' },
          { label: 'All Transactions', icon: ArrowLeftRight },
          { label: 'Online Transactions', icon: Globe },
          { label: 'Fee Challans', icon: FileText },
          { label: 'More Menu', icon: MoreHorizontal },
        ].map((tab, idx) => (
          <div key={idx} className={`flex items-center gap-2 pb-2 cursor-pointer transition-colors text-gray-500 hover:text-[#333]`}>
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-[26px] font-bold text-[#333]">Manage Fee Assignments</h2>
        <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-[3px] bg-white text-gray-600 font-semibold text-[13px] hover:bg-gray-50 shadow-sm">
          <HelpCircle className="w-4 h-4 text-gray-500" />
          How Assignments Work
        </button>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-[3px] border border-gray-200 shadow-sm p-5">
        <div className="flex flex-col md:flex-row items-end gap-5 overflow-x-auto">
          
          <div className="flex-[1.5] w-full min-w-[150px]">
            <label className="block text-[11px] font-bold text-[#333] uppercase mb-2">Class</label>
            <select className="w-full border border-gray-200 rounded-[3px] px-3 py-2 text-[13px] text-gray-500 focus:outline-none">
              <option>-- Select Class --</option>
            </select>
          </div>
          
          <div className="flex-1 w-full min-w-[150px]">
            <label className="block text-[11px] font-bold text-[#b0b0b0] uppercase mb-2">Section (Optional)</label>
            <select className="w-full border border-gray-200 rounded-[3px] px-3 py-2 text-[13px] text-gray-500 focus:outline-none">
              <option>-- All Sections --</option>
            </select>
          </div>

          <div className="flex-1 w-full min-w-[150px]">
            <label className="block text-[11px] font-bold text-[#b0b0b0] uppercase mb-2">Category (Optional)</label>
            <select className="w-full border border-gray-200 rounded-[3px] px-3 py-2 text-[13px] text-gray-500 focus:outline-none">
              <option>-- All --</option>
            </select>
          </div>
          
          <div className="flex-1 w-full min-w-[150px]">
            <label className="block text-[11px] font-bold text-[#333] uppercase mb-2">Fee Status</label>
            <select className="w-full border border-gray-200 rounded-[3px] px-3 py-2 text-[13px] text-gray-500 focus:outline-none">
              <option>-- All --</option>
            </select>
          </div>
          
          <div className="flex w-full md:w-auto">
            <button className="bg-[#5a52d7] hover:bg-[#4a42c0] text-white px-8 py-2 rounded-[3px] text-[13px] font-bold flex items-center justify-center gap-2 w-full md:w-auto">
              <Search className="w-4 h-4" /> Retrieve
            </button>
          </div>
          
        </div>
      </div>

    </div>
  );
};

export default AssignFees;
