import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Info, Zap, Search, Download, Printer, LayoutGrid, List as ListIcon, Grid,
  Users, FileText, CheckCircle, Tag, AlertCircle, Send, CreditCard, ChevronRight, PlusCircle,
  Gauge, BookOpen, HandCoins, FileSearch, ArrowRightLeft, Globe, 
  WalletCards, Percent, Hash, Receipt, Clock
} from 'lucide-react';
import QuickSetupModal from '../../components/finance/QuickSetupModal';
import FinanceTabs from '../../components/finance/FinanceTabs';

const SearchDueFees = () => {
  const navigate = useNavigate();
  const [isQuickSetupOpen, setIsQuickSetupOpen] = useState(false);

  const students = [
    { no: 1, adm: 'YISADM 055', name: 'Zain Khan', parent: 'Zakir Khan', groups: '5 fee groups', date: '05 Jan 2026  05 Dec 2026', total: 122000, paid: 14950, discount: 100, due: 106950 },
    { no: 2, adm: 'YISADM 046', name: 'Sneha Bhatia', parent: 'Gaurav Bhatia', groups: '6 fee groups', date: '10 Jan 2026  10 Dec 2026', total: 142400, paid: 26300, discount: 9780, due: 106320 },
    { no: 3, adm: 'YISADM 045', name: 'Rudra Chauhan', parent: 'Sanjeev Chauhan', groups: '5 fee groups', date: '05 Feb 2026  05 Dec 2026', total: 122000, paid: 17000, discount: 0, due: 105000 },
    { no: 4, adm: 'YISADM 043', name: 'Rohan Pandey', parent: 'Anand Pandey', groups: '5 fee groups', date: '05 Apr 2026  05 Dec 2026', total: 122000, paid: 14400, discount: 3400, due: 104200 },
    { no: 5, adm: 'YISADM 057', name: 'Ali Bansal', parent: 'Tarun Bansal', groups: '5 fee groups', date: '05 Jan 2026  05 Dec 2026', total: 122000, paid: 15000, discount: 4800, due: 102200 },
    { no: 6, adm: 'YISADM 044', name: 'Priya Malhotra', parent: 'Rakesh Malhotra', groups: '4 fee groups', date: '05 Jan 2026  05 Dec 2026', total: 102000, paid: 0, discount: 0, due: 102000 },
    { no: 7, adm: 'YISADM 047', name: 'Sai Pillai', parent: 'Krishna Pillai', groups: '4 fee groups', date: '05 Jan 2026  05 Dec 2026', total: 102000, paid: 0, discount: 0, due: 102000 },
    { no: 8, adm: 'YISADM 058', name: 'Eva Jain', parent: 'Nitin Jain', groups: '4 fee groups', date: '05 Jan 2026  05 Dec 2026', total: 102000, paid: 0, discount: 0, due: 102000 },
  ];

  return (
    <div className="p-4 max-w-[1600px] mx-auto bg-gray-50 min-h-screen text-gray-800 pb-20">
      {/* Banner */}
      <div className="bg-[#009b9f] text-white p-2.5 rounded-none text-xs flex items-center gap-2 mb-4">
        <Info className="w-4 h-4 flex-shrink-0" />
        <p>
          <strong>New: academic-session scoping.</strong> Lists and dashboard numbers show the selected academic session only, so totals may look smaller than before — nothing was deleted. Use the session switcher in the top bar to view another year.
        </p>
      </div>

      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Finance & Fees</h1>
          <p className="text-xs text-gray-500 mt-1">Manage fee types, groups, collection, challans, and reports across the school.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsQuickSetupOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white border rounded-none shadow-sm hover:bg-gray-50"
          >
            <Zap className="w-3.5 h-3.5 text-yellow-500" />
            Quick Setup
          </button>
          <button onClick={() => navigate('/finance/collect')} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-none shadow-sm hover:bg-blue-700">
            <Download className="w-3.5 h-3.5" />
            Collect Fees
          </button>
        </div>
      </div>

      {/* Tabs */}
      <FinanceTabs />

      {/* Title */}
      <h2 className="text-lg font-bold text-gray-800 mb-4">Search Due Fees Report</h2>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-none shadow-sm p-4 mb-4">
        <div className="flex items-end gap-4">
          <div className="flex-1">
            <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-1.5">Class</label>
            <select className="w-full border border-gray-200 rounded-none p-2 text-xs text-gray-700 focus:outline-none focus:border-blue-500">
              <option>-- Select Class --</option>
              <option>Class I</option>
              <option>Class II</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-1.5">Section <span className="text-gray-400 font-normal lowercase">(optional)</span></label>
            <select className="w-full border border-gray-200 rounded-none p-2 text-xs text-gray-700 focus:outline-none focus:border-blue-500">
              <option>-- All Sections --</option>
              <option>A</option>
              <option>B</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-1.5">Filter Due Date</label>
            <select className="w-full border border-gray-200 rounded-none p-2 text-xs text-gray-700 focus:outline-none focus:border-blue-500">
              <option>Full Due (All Time)</option>
              <option>This Month</option>
              <option>Next Month</option>
            </select>
          </div>
          <div className="w-48">
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold py-2 rounded-none flex items-center justify-center gap-1.5 shadow-sm">
              <Search className="w-3.5 h-3.5" /> Search
            </button>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50/80 border border-blue-200 p-3 rounded-none flex items-start gap-2 mb-4">
        <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
        <div className="text-xs text-blue-800">
          <p className="font-semibold">These totals cover only the students listed below — <span className="font-normal text-blue-700">the ones who still owe. Students who have already cleared their fees are not counted here, so this page reads lower than the Fees Dashboard. That is expected, not an error.</span></p>
          <a href="#" className="text-blue-600 underline text-[10px] font-semibold mt-1 inline-block">Why don't these match the Fees Dashboard?</a>
        </div>
      </div>

      {/* 5 Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-4">
        {/* Card 1 */}
        <div className="bg-[#2980b9] text-white p-3 rounded-none shadow-sm flex items-center justify-between relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-[9px] font-bold uppercase opacity-80 mb-0.5">Students With Dues</p>
            <p className="text-lg font-bold">275</p>
          </div>
          <Users className="w-8 h-8 opacity-20 absolute right-2 top-2 z-0" />
        </div>
        {/* Card 2 */}
        <div className="bg-[#16a085] text-white p-3 rounded-none shadow-sm flex items-center justify-between relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-[9px] font-bold uppercase opacity-80 mb-0.5">Demand From Them</p>
            <p className="text-lg font-bold">₹9,724,084.00</p>
          </div>
          <FileText className="w-8 h-8 opacity-20 absolute right-2 top-2 z-0" />
        </div>
        {/* Card 3 */}
        <div className="bg-[#27ae60] text-white p-3 rounded-none shadow-sm flex items-center justify-between relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-[9px] font-bold uppercase opacity-80 mb-0.5">Paid So Far</p>
            <p className="text-lg font-bold">₹378,553.75 <span className="text-[9px] font-normal opacity-80">(3.89%)</span></p>
          </div>
          <CheckCircle className="w-8 h-8 opacity-20 absolute right-2 top-2 z-0" />
        </div>
        {/* Card 4 */}
        <div className="bg-[#8e44ad] text-white p-3 rounded-none shadow-sm flex items-center justify-between relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-[9px] font-bold uppercase opacity-80 mb-0.5">Discount Given</p>
            <p className="text-lg font-bold">₹27,380.00 <span className="text-[9px] font-normal opacity-80">(0.3%)</span></p>
          </div>
          <Tag className="w-8 h-8 opacity-20 absolute right-2 top-2 z-0" />
        </div>
        {/* Card 5 */}
        <div className="bg-[#e74c3c] text-white p-3 rounded-none shadow-sm flex items-center justify-between relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-[9px] font-bold uppercase opacity-80 mb-0.5">Still Outstanding</p>
            <p className="text-lg font-bold">₹9,323,150.25 <span className="text-[9px] font-normal opacity-80">(95.9%)</span></p>
          </div>
          <AlertCircle className="w-8 h-8 opacity-20 absolute right-2 top-2 z-0" />
        </div>
      </div>

      {/* List Table Area */}
      <div className="bg-white border border-gray-200 rounded-none shadow-sm p-4">
        <h3 className="text-[13px] font-bold text-gray-800 mb-4 flex items-center gap-1.5">
          <FileText className="w-4 h-4 text-indigo-600" /> Due Fees List
        </h3>
        
        {/* Toolbar */}
        <div className="flex justify-between items-center mb-4">
           <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                 Show 
                 <select className="border border-gray-200 rounded-none p-1">
                   <option>10</option>
                   <option>25</option>
                   <option>50</option>
                 </select>
              </div>
              <div className="flex gap-1.5">
                <button className="px-2.5 py-1 text-xs border border-gray-200 text-gray-600 rounded-none flex items-center gap-1 hover:bg-gray-50">Copy</button>
                <button className="px-2.5 py-1 text-xs border border-gray-200 text-gray-600 rounded-none flex items-center gap-1 hover:bg-gray-50">CSV</button>
                <button className="px-2.5 py-1 text-xs border border-gray-200 text-gray-600 rounded-none flex items-center gap-1 hover:bg-gray-50">Excel</button>
                <button className="px-2.5 py-1 text-xs border border-gray-200 text-gray-600 rounded-none flex items-center gap-1 hover:bg-gray-50">PDF</button>
                <button className="px-2.5 py-1 text-xs border border-gray-200 text-gray-600 rounded-none flex items-center gap-1 hover:bg-gray-50"><Printer className="w-3 h-3" /></button>
                <button className="px-2.5 py-1 text-xs border border-gray-200 text-gray-600 rounded-none flex items-center gap-1 hover:bg-gray-50"><LayoutGrid className="w-3 h-3" /> Columns</button>
              </div>
           </div>
           
           <div>
             <input type="text" placeholder="Search students..." className="border border-gray-200 rounded-none p-1.5 text-xs w-56 focus:outline-none focus:border-indigo-500" />
           </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse border border-gray-100">
            <thead>
              <tr className="bg-indigo-50/50 border-y border-gray-200 text-[9px] text-indigo-800 uppercase tracking-wide">
                <th className="p-3 font-bold border-r border-gray-100 text-center w-10">#</th>
                <th className="p-3 font-bold border-r border-gray-100">Admission No <span className="text-gray-400 float-right">↑↓</span></th>
                <th className="p-3 font-bold border-r border-gray-100">Student Name <span className="text-gray-400 float-right">↑↓</span></th>
                <th className="p-3 font-bold border-r border-gray-100">Parent Name</th>
                <th className="p-3 font-bold border-r border-gray-100">Fee Groups</th>
                <th className="p-3 font-bold border-r border-gray-100">Due Date <span className="text-gray-400 float-right">↑↓</span></th>
                <th className="p-3 font-bold border-r border-gray-100 text-right">Total Amount <span className="text-gray-400 float-right">↑↓</span></th>
                <th className="p-3 font-bold border-r border-gray-100 text-right">Paid Amount <span className="text-gray-400 float-right">↑↓</span></th>
                <th className="p-3 font-bold border-r border-gray-100 text-right">Discount <span className="text-gray-400 float-right">↑↓</span></th>
                <th className="p-3 font-bold border-r border-gray-100 text-right text-red-600">Due Amount <span className="text-gray-400 float-right">↑↓</span></th>
                <th className="p-3 font-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
              {students.map((s, i) => (
                <tr key={i} className="hover:bg-gray-50/50">
                  <td className="p-3 border-r border-gray-100 text-center">
                    <button className="text-blue-500 hover:text-blue-700"><PlusCircle className="w-3 h-3 inline" /> {s.no}</button>
                  </td>
                  <td className="p-3 border-r border-gray-100">{s.adm}</td>
                  <td className="p-3 border-r border-gray-100">{s.name}</td>
                  <td className="p-3 border-r border-gray-100">{s.parent}</td>
                  <td className="p-3 border-r border-gray-100 text-gray-500">{s.groups}</td>
                  <td className="p-3 border-r border-gray-100 text-gray-500">{s.date}</td>
                  <td className="p-3 border-r border-gray-100 text-right">₹{s.total.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
                  <td className="p-3 border-r border-gray-100 text-right">₹{s.paid.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
                  <td className="p-3 border-r border-gray-100 text-right">₹{s.discount.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
                  <td className="p-3 border-r border-gray-100 text-right font-bold text-gray-900">₹{s.due.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
                  <td className="p-2 text-center align-middle">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => window.open(`https://wa.me/?text=Hello ${s.parent}, please note that the due fee for ${s.name} is ₹${s.due.toLocaleString('en-IN')}`, '_blank')}
                        className="flex items-center gap-1 px-2 py-1 text-[10px] text-green-600 bg-green-50 border border-green-200 rounded-none hover:bg-green-100"
                      >
                        <Send className="w-3 h-3" /> Send
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
          <div>Showing 1 to 8 of 275 entries</div>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1 border border-gray-200 rounded-none text-gray-400 cursor-not-allowed">Previous</button>
            <button className="px-3 py-1 bg-indigo-600 text-white rounded">1</button>
            <button className="px-3 py-1 border border-gray-200 rounded-none hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border border-gray-200 rounded-none hover:bg-gray-50">3</button>
            <button className="px-3 py-1 border border-gray-200 rounded-none hover:bg-gray-50">4</button>
            <button className="px-3 py-1 border border-gray-200 rounded-none hover:bg-gray-50">5</button>
            <span className="px-2">...</span>
            <button className="px-3 py-1 border border-gray-200 rounded-none hover:bg-gray-50">35</button>
            <button className="px-3 py-1 border border-gray-200 rounded-none hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
      
      <QuickSetupModal isOpen={isQuickSetupOpen} onClose={() => setIsQuickSetupOpen(false)} />
    </div>
  );
};

export default SearchDueFees;
