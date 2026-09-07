import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Gauge, BookOpen, ArrowDown, ArrowUp, FileSearch, Network, Tag, Building2,
  Plus, List, Grid, Copy, FileSpreadsheet, File, Printer, Columns, Search, Edit, Trash2
} from 'lucide-react';

const expenseData = [
  { id: 1, name: 'Miscellaneous', head: 'Miscellaneous', date: '26 Feb, 2026', amount: 50000 },
];

const ToolbarButton = ({ label, icon: Icon }) => (
  <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-gray-600 text-[13px] bg-white hover:bg-gray-50 transition-colors">
    {Icon && <Icon className="w-3.5 h-3.5" />}
    {label}
  </button>
);

const Expense = () => {
  return (
    <div className="min-h-screen bg-[#ecf0f5] text-[#333] p-4 sm:p-6 font-sans">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-4 border-b border-gray-300 pb-4">
        <div>
          <h1 className="text-[24px] font-bold text-[#333] mb-1">Accounts & Bookkeeping</h1>
          <p className="text-[13px] text-gray-500">Track Income, expenses, ledgers and hand audit-ready books to your accountant.</p>
        </div>
      </div>

      {/* Nav Tabs */}
      <div className="flex flex-wrap gap-6 mb-8 text-[14px]">
        {[
          { label: 'Dashboard', icon: Gauge , path: '/accounts/dashboard' },
          { label: 'Guide', icon: BookOpen },
          { label: 'Income', icon: ArrowDown , path: '/accounts/income' },
          { label: 'Expense', icon: ArrowUp, active: true, path: '/accounts/expense' },
          { label: 'Day Book', icon: FileSearch , path: '/accounts/day-book' },
          { label: 'Chart of Accounts', icon: Network },
          { label: 'Income Heads', icon: Tag , path: '/accounts/income-heads' },
          { label: 'Expense Heads', icon: Tag , path: '/accounts/expense-heads' },
          { label: 'Bank Accounts', icon: Building2 },
        ].map((tab, idx) => (
          <Link key={idx} to={tab.path || '#'}  className={`flex items-center gap-2 pb-2 cursor-pointer transition-colors ${tab.active ? 'text-[#333] font-bold border-b-[3px] border-[#333]' : 'text-gray-500 hover:text-[#333]'}`}>
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </Link>
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-end items-end md:items-center mb-6 gap-2 w-full">
        <button className="flex items-center gap-2 px-4 py-1.5 rounded-[3px] border border-[#5a52d7] bg-[#5a52d7] text-white font-semibold text-[13px] hover:bg-[#4a42c0] shadow-sm">
          <Plus className="w-4 h-4" />
          Add New Expense
        </button>
      </div>

      {/* Table Panel */}
      <div className="bg-white rounded-[3px] border border-gray-200 shadow-sm flex flex-col mb-4">
        
        {/* Table Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-[#fefefe]">
          <div className="flex items-center gap-2">
            <ArrowUp className="w-5 h-5 text-[#5a52d7]" />
            <h2 className="text-[16px] font-bold text-[#333]">All Expense Records</h2>
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
              placeholder="Search expense..." 
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
                <th className="py-4 px-5 border-l border-purple-100/60 w-1/3">NAME <span className="text-[10px] text-purple-300 ml-1">↑↓</span></th>
                <th className="py-4 px-5 border-l border-purple-100/60 w-[200px]">HEAD <span className="text-[10px] text-purple-300 ml-1">↑↓</span></th>
                <th className="py-4 px-5 border-l border-purple-100/60 w-[200px]">DATE <span className="text-[10px] text-purple-300 ml-1">↑↓</span></th>
                <th className="py-4 px-5 border-l border-purple-100/60 text-right w-[150px]">AMOUNT <span className="text-[10px] text-purple-300 ml-1">↑↓</span></th>
                <th className="py-4 px-5 border-l border-purple-100/60 text-center w-[100px]">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-[#333]">
              {expenseData.map((expense, i) => (
                <tr key={expense.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-5 text-center text-gray-500">{i + 1}</td>
                  <td className="py-4 px-5 border-l border-gray-100 font-medium text-gray-700">{expense.name}</td>
                  <td className="py-4 px-5 border-l border-gray-100 text-gray-500">
                    {expense.head ? (
                      <span className="bg-[#fff9eb] text-[#e69818] font-semibold px-2.5 py-1 rounded-[3px] text-[11px] border border-[#fce3a2]">{expense.head}</span>
                    ) : (
                      '--'
                    )}
                  </td>
                  <td className="py-4 px-5 border-l border-gray-100 text-gray-600">{expense.date}</td>
                  <td className="py-4 px-5 border-l border-gray-100 text-right font-medium text-gray-700">
                    ₹{expense.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-4 px-5 border-l border-gray-100">
                    <div className="flex items-center justify-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                      <button className="text-gray-500 hover:text-[#3c8dbc]"><Edit className="w-3.5 h-3.5" /></button>
                      <button className="text-gray-500 hover:text-[#d9534f]"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-[12px] text-gray-500 pl-1 flex items-center justify-between">
        <span>Showing 1 to {expenseData.length} of {expenseData.length}</span>
        <div className="flex items-center gap-1">
          <button className="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100">&lt;</button>
          <button className="w-6 h-6 rounded-full flex items-center justify-center bg-[#5a52d7] text-white">1</button>
          <button className="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100">&gt;</button>
        </div>
      </div>

    </div>
  );
};

export default Expense;
