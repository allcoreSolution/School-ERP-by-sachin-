import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  Gauge, BookOpen, HandCoins, FileSearch, ArrowLeftRight, Globe, FileText, 
  MoreHorizontal, Search, Info, Users, FileSignature, Coins, Tag, AlertCircle,
  Copy, FileSpreadsheet, File, Printer, Columns, PlusCircle, PenTool
} from 'lucide-react';

const studentsData = [
  { id: 1, adm: 'YISADM202620260014', name: 'nn tt', parent: 'nn', groups: '6 fee groups', date: '05 Jan 2026 - 05 Dec 2026', total: 47800, paid: 15000, balance: 32800 },
  { id: 2, adm: 'YISADM-054', name: 'Chhavi Desai', parent: 'Vikram Desai', groups: '2 fee groups', date: '05 Jan 2026 - 05 Dec 2026', total: 44000, paid: 12000, balance: 32000 },
  { id: 3, adm: 'YISADM-018', name: 'Daksh Tiwari', parent: 'Sanjay Tiwari', groups: '5 fee groups', date: '05 Jan 2026 - 05 Dec 2026', total: 45800, paid: 15000, balance: 30800 },
  { id: 4, adm: 'YISADM-019', name: 'Pihu Nair', parent: 'Rahul Nair', groups: '5 fee groups', date: '05 Jan 2026 - 05 Dec 2026', total: 45800, paid: 15000, balance: 30800 },
  { id: 5, adm: 'YISADM-020', name: 'Dev Rajput', parent: 'Vijay Rajput', groups: '4 fee groups', date: '05 Jan 2026 - 05 Dec 2026', total: 45300, paid: 15000, balance: 30300, left: true },
];

const StatCard = ({ title, value, subValue, bgClass, icon: Icon }) => (
  <div className={`${bgClass} text-white p-4 rounded-[3px] shadow-sm flex flex-col justify-between relative overflow-hidden h-24`}>
    <div className="z-10">
      <h3 className="text-[11px] font-bold uppercase tracking-wider mb-1 opacity-90">{title}</h3>
      <div className="flex items-baseline gap-1">
        <span className="text-[20px] font-bold leading-none">{value}</span>
        {subValue && <span className="text-[12px] opacity-90">{subValue}</span>}
      </div>
    </div>
    {Icon && <Icon className="absolute right-[-10px] bottom-[-10px] w-16 h-16 opacity-20" />}
  </div>
);

const ToolbarButton = ({ label, icon: Icon }) => (
  <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-gray-600 text-[13px] bg-white hover:bg-gray-50 transition-colors">
    {Icon && <Icon className="w-3.5 h-3.5" />}
    {label}
  </button>
);

const SearchDueFees = () => {
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
          <button className="flex items-center gap-2 px-4 py-2 rounded-[3px] bg-[#5a52d7] text-white text-[13px] font-semibold hover:bg-[#4a42c0]">
            <HandCoins className="w-4 h-4" /> Collect Fees
          </button>
        </div>
      </div>

      {/* Nav Tabs */}
      <div className="flex flex-wrap gap-6 mb-8 text-[14px]">
        {[
          { label: 'Dashboard', icon: Gauge , path: '/accounts/dashboard' },
          { label: 'Guide', icon: BookOpen },
          { label: 'Collect Fees', icon: HandCoins , path: '/fees/collect' },
          { label: 'Search Due Fees', icon: FileSearch, active: true, path: '/fees/due' },
          { label: 'All Transactions', icon: ArrowLeftRight },
          { label: 'Online Transactions', icon: Globe },
          { label: 'Fee Challans', icon: FileText },
          { label: 'More Menu', icon: MoreHorizontal },
        ].map((tab, idx) => (
          <Link key={idx} to={tab.path || '#'}  className={`flex items-center gap-2 pb-2 cursor-pointer transition-colors ${tab.active ? 'text-[#333] font-bold border-b-[3px] border-[#333]' : 'text-gray-500 hover:text-[#333]'}`}>
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </Link>
        ))}
      </div>

      <h1 className="text-[26px] font-bold text-[#333] mb-6">Search Due Fees Report</h1>

      {/* Filter Section */}
      <div className="bg-white rounded-[3px] border border-gray-200 shadow-sm mb-6 p-5">
        <div className="flex flex-col md:flex-row items-end gap-4 overflow-x-auto">
          <div className="flex-1 w-full min-w-[200px]">
            <label className="block text-[11px] font-bold text-[#333] uppercase mb-2">Class</label>
            <select className="w-full border border-gray-200 rounded-[3px] px-3 py-2 text-[13px] text-[#333] focus:outline-none">
              <option>-- Select Class --</option>
            </select>
          </div>
          
          <div className="flex-1 w-full min-w-[200px]">
            <label className="block text-[11px] font-bold text-[#b0b0b0] uppercase mb-2">Section (Optional)</label>
            <select className="w-full border border-gray-200 rounded-[3px] px-3 py-2 text-[13px] text-[#333] focus:outline-none">
              <option>-- All Sections --</option>
            </select>
          </div>

          <div className="flex-1 w-full min-w-[200px]">
            <label className="block text-[11px] font-bold text-[#333] uppercase mb-2">Filter Due Date</label>
            <select className="w-full border border-gray-200 rounded-[3px] px-3 py-2 text-[13px] text-[#333] focus:outline-none">
              <option>Full Due (All Time)</option>
            </select>
          </div>
          
          <div className="flex">
            <button className="bg-[#5a52d7] hover:bg-[#4a42c0] text-white px-8 py-2 rounded-[3px] text-[13px] font-bold flex items-center justify-center gap-2">
              <Search className="w-4 h-4" /> Search
            </button>
          </div>
        </div>
      </div>

      {/* Info Alert */}
      <div className="bg-[#f0edff] rounded-[3px] border border-purple-200 p-4 mb-6 flex gap-3 text-[#4638c2] text-[13px]">
        <Info className="w-5 h-5 shrink-0 mt-0.5" />
        <div>
          <p className="mb-1 text-[13px]">
            <strong>These totals cover only the students listed below</strong> — the ones who still owe. Students who have already cleared their fees are not counted here, so this page reads lower than the Fees Dashboard. That is expected, not an error.
          </p>
          <a href="#" className="underline font-medium">Why don't these match the Fees Dashboard?</a>
        </div>
      </div>

      {/* Stat Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <StatCard title="Students With Dues" value="249" bgClass="bg-[#2995c2]" icon={Users} />
        <StatCard title="Demand From Them" value="₹5,362,700.00" bgClass="bg-[#0eb9c5]" icon={FileSignature} />
        <StatCard title="Paid So Far" value="₹311,480.00" subValue="(5.8%)" bgClass="bg-[#2eb74b]" icon={Coins} />
        <StatCard title="Discount Given" value="₹28,920.00" subValue="(0.5%)" bgClass="bg-[#8b44d3]" icon={Tag} />
        <StatCard title="Still Outstanding" value="₹5,022,300.00" subValue="(93.7%)" bgClass="bg-[#e43f4c]" icon={AlertCircle} />
      </div>

      {/* Table Panel */}
      <div className="bg-white rounded-[3px] border border-gray-200 shadow-sm flex flex-col">
        
        {/* Table Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2 bg-[#fefefe]">
          <FileSearch className="w-5 h-5 text-[#5a52d7]" />
          <h2 className="text-[16px] font-bold text-[#333]">Due Fees List</h2>
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
              placeholder="Search students..." 
              className="w-full border border-gray-200 rounded-[3px] pl-3 pr-10 py-1.5 text-[13px] focus:outline-none focus:border-[#5a52d7]"
            />
            <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead>
              <tr className="bg-[#f4f2ff] text-[#5a52d7] text-[12px] font-bold uppercase border-b border-purple-100/50">
                <th className="py-4 px-3 w-16 text-center">#</th>
                <th className="py-4 px-4 border-l border-purple-100/60">ADMISSION NO <span className="text-[10px] text-purple-300 ml-1">↑↓</span></th>
                <th className="py-4 px-4 border-l border-purple-100/60">STUDENT NAME <span className="text-[10px] text-purple-300 ml-1">↑↓</span></th>
                <th className="py-4 px-4 border-l border-purple-100/60">PARENT NAME <span className="text-[10px] text-purple-300 ml-1">↑↓</span></th>
                <th className="py-4 px-4 border-l border-purple-100/60">FEE GROUPS</th>
                <th className="py-4 px-4 border-l border-purple-100/60">DUE DATE</th>
                <th className="py-4 px-4 border-l border-purple-100/60 text-right">TOTAL AMOUNT <span className="text-[10px] text-purple-300 ml-1">↑↓</span></th>
                <th className="py-4 px-4 border-l border-purple-100/60 text-right">PAID AMOUNT</th>
                <th className="py-4 px-4 border-l border-purple-100/60 text-right">BALANCE</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-[#333]">
              {studentsData.map((student, i) => (
                <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-3 text-center w-16 whitespace-nowrap">
                    <button className="text-[#3c8dbc] hover:text-[#216186] font-bold mr-2"><PlusCircle className="w-4 h-4 inline" /></button>
                    <span className="text-gray-500">{i + 1}</span>
                  </td>
                  <td className="py-3 px-4 border-l border-gray-100 text-gray-600">{student.adm}</td>
                  <td className="py-3 px-4 border-l border-gray-100 font-medium">
                    {student.name}
                    {student.left && <span className="ml-2 bg-gray-500 text-white text-[10px] px-1.5 py-0.5 rounded-[3px]">Left</span>}
                  </td>
                  <td className="py-3 px-4 border-l border-gray-100 text-gray-600">{student.parent}</td>
                  <td className="py-3 px-4 border-l border-gray-100 text-gray-600">
                    <span className="w-12 inline-block leading-tight">{student.groups}</span>
                  </td>
                  <td className="py-3 px-4 border-l border-gray-100 text-gray-600">{student.date}</td>
                  <td className="py-3 px-4 border-l border-gray-100 text-right text-gray-700">₹{student.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                  <td className="py-3 px-4 border-l border-gray-100 text-right text-gray-700">₹{student.paid.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                  <td className="py-3 px-4 border-l border-gray-100 text-right font-bold text-[#e43f4c]">₹{student.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  );
};

export default SearchDueFees;
