import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Gauge, BookOpen, HandCoins, FileSearch, ArrowLeftRight, Globe, FileText, 
  MoreHorizontal, Search, PenTool, HelpCircle, UserPlus, FastForward,
  Plus, Layers, List, Grid, Copy, FileSpreadsheet, File, Printer, Columns,
  Edit, Trash2
} from 'lucide-react';

const groupsData = [
  {
    id: 1,
    name: '4th Installment Fees 2026-2027',
    total: 20000.00,
    details: [
      { name: '1st Installment Fees', amount: 5000, due: '05th "Jan", "2026"', demand: '01st "Jan", "2026"' },
      { name: '2nd Installment Fees', amount: 5000, due: '05th "Apr", "2026"', demand: '01st "Apr", "2026"' },
      { name: '3rd Installment Fees', amount: 5000, due: '05th "Aug", "2026"', demand: '01st "Aug", "2026"' },
      { name: '4th Installment Fees', amount: 5000, due: '05th "Dec", "2026"', demand: '01st "Dec", "2026"' },
    ]
  },
  {
    id: 2,
    name: 'A,B,C,D,E',
    total: 200.00,
    details: [
      { name: 'Admission Fee', amount: 200, due: '01st "Jan", "2020"', demand: '30th "Sep", "2026"' },
    ]
  }
];

const ToolbarButton = ({ label, icon: Icon }) => (
  <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-gray-600 text-[13px] bg-white hover:bg-gray-50 transition-colors">
    {Icon && <Icon className="w-3.5 h-3.5" />}
    {label}
  </button>
);

const FeeGroups = () => {
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
          { label: 'Assign Fees', icon: UserPlus , path: '/fees/assign' },
          { label: 'Fees Carry Forward', icon: FastForward },
          { label: 'More Menu', icon: MoreHorizontal },
        ].map((tab, idx) => (
          <div key={idx} className={`flex items-center gap-2 pb-2 cursor-pointer transition-colors text-gray-500 hover:text-[#333]`}>
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-[26px] font-bold text-[#333]">Fee Groups</h2>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-[3px] bg-white text-gray-600 font-semibold text-[13px] hover:bg-gray-50 shadow-sm">
            <HelpCircle className="w-4 h-4 text-gray-500" />
            How it works
          </button>
          <button className="flex items-center gap-2 px-4 py-1.5 rounded-[3px] border border-[#5a52d7] bg-[#5a52d7] text-white font-semibold text-[13px] hover:bg-[#4a42c0] shadow-sm">
            <Plus className="w-4 h-4" />
            Add New Fee Group
          </button>
        </div>
      </div>

      {/* Table Panel */}
      <div className="bg-white rounded-[3px] border border-gray-200 shadow-sm flex flex-col">
        
        {/* Table Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-[#fefefe]">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#5a52d7]" />
            <h2 className="text-[16px] font-bold text-[#333]">Fee Groups</h2>
          </div>
          <div className="flex items-center gap-1 bg-gray-50 p-1 border border-gray-200 rounded-[3px]">
            <button className="p-1 px-2 text-[#5a52d7] bg-white shadow-sm border border-gray-100 rounded-[3px] text-[13px] font-semibold"><List className="w-4 h-4 inline" /></button>
            <button className="p-1 px-2 text-gray-400 hover:text-gray-600 text-[13px]"><Grid className="w-4 h-4 inline" /></button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="p-4 flex flex-col lg:flex-row justify-between items-center gap-4 bg-white border-b border-gray-100">
          <div className="flex flex-wrap items-center gap-3">
            <div className="text-[13px] text-gray-500 flex items-center gap-2">
              Show 
              <select className="border border-gray-200 rounded-[3px] px-2 py-1 bg-white focus:outline-none">
                <option>10</option>
              </select>
            </div>
            
            <div className="flex items-center gap-0 rounded-[3px] overflow-hidden">
              <ToolbarButton icon={Copy} />
              <ToolbarButton label="CSV" />
              <ToolbarButton label="Excel" />
              <ToolbarButton label="PDF" />
              <ToolbarButton icon={Printer} />
              <ToolbarButton label="Columns" />
            </div>
          </div>
          
          <div className="relative w-full lg:w-64">
            <input 
              type="text" 
              placeholder="Search fee groups..." 
              className="w-full border border-gray-200 rounded-[3px] pl-3 pr-10 py-1.5 text-[13px] focus:outline-none focus:border-[#5a52d7]"
            />
            <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-[#f4f2ff] text-[#5a52d7] text-[11px] font-bold tracking-[0.5px] uppercase border-b border-purple-100/50">
                <th className="py-4 px-5 w-16 text-center">#</th>
                <th className="py-4 px-5 border-l border-purple-100/60 w-1/4">NAME <span className="text-[10px] text-purple-300 ml-1">↑↓</span></th>
                <th className="py-4 px-5 border-l border-purple-100/60 w-1/2">FEE TYPES & DETAILS</th>
                <th className="py-4 px-5 border-l border-purple-100/60 text-right w-[150px]">TOTAL AMOUNT (₹) <span className="text-[10px] text-purple-300 ml-1">↑↓</span></th>
                <th className="py-4 px-5 border-l border-purple-100/60 text-center w-[120px]">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-[#333]">
              {groupsData.map((group, i) => (
                <tr key={group.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-6 px-5 text-center text-gray-500 align-top">{i + 1}</td>
                  <td className="py-6 px-5 border-l border-gray-100 text-gray-700 align-top">{group.name}</td>
                  <td className="p-0 border-l border-gray-100 align-top">
                    <div className="flex flex-col">
                      {group.details.map((detail, idx) => (
                        <div key={idx} className={`px-5 py-4 ${idx !== group.details.length - 1 ? 'border-b border-dashed border-gray-200' : ''}`}>
                          <div className="font-bold text-[#333] mb-1 leading-none">{detail.name}: ₹{detail.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
                          <div className="text-[11px] text-gray-500 flex items-center gap-1.5">
                            <span className="flex items-center gap-1">⌚ Due: {detail.due}</span>
                            <span className="text-gray-300">|</span>
                            <span className="flex items-center gap-1">📅 Demand: {detail.demand}</span>
                            <span className="text-gray-300">|</span>
                            <span>Fine: None</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-6 px-5 border-l border-gray-100 text-right font-bold text-[#333] align-top">
                    ₹{group.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-6 px-5 border-l border-gray-100 align-top">
                    <div className="flex items-center justify-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                      <button className="text-gray-500 hover:text-[#5a52d7] p-1"><FileText className="w-3.5 h-3.5" /></button>
                      <button className="text-gray-500 hover:text-[#3c8dbc] p-1"><Edit className="w-3.5 h-3.5" /></button>
                      <button className="text-gray-500 hover:text-[#d9534f] p-1"><Trash2 className="w-3.5 h-3.5" /></button>
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
};

export default FeeGroups;
