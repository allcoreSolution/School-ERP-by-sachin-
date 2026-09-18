import React from 'react';
import { 
  FileText, LayoutGrid, List, Copy, Printer, Columns, ChevronDown, CreditCard
} from 'lucide-react';

const SUBSCRIPTION_DATA = [
  {
    id: 1,
    orderId: '#order_SrOv3QNEPhwD2n',
    plan: 'Growth Plan',
    amount: '₹10,000.00',
    method: 'Razorpay',
    transactionId: '-',
    proof: '-',
    status: 'Pending Payment',
    date: '20 May, 2026 04:46 AM'
  }
];

export default function SubscriptionHistory() {
  return (
    <div className="bg-[#f4f7fc] min-h-[calc(100vh-64px)] font-sans p-6">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[22px] font-semibold text-gray-800">Payment History</h1>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden flex flex-col">
        
        {/* Panel Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center">
            <FileText className="w-4 h-4 text-[#5542f6] mr-2" />
            <h2 className="text-sm font-bold text-gray-800">Your Subscription Payments</h2>
          </div>
          <div className="flex bg-gray-100 p-0.5 rounded-none border border-gray-200">
            <button className="w-8 h-7 bg-white shadow-sm rounded-none flex items-center justify-center text-[#5542f6]">
              <List className="w-4 h-4" />
            </button>
            <button className="w-8 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center text-sm text-gray-600 mr-2">
              <span>Show</span>
              <div className="mx-2 px-2 py-1 border border-gray-300 rounded-none bg-white flex items-center">
                10 <ChevronDown className="w-3 h-3 ml-2 text-gray-400" />
              </div>
            </div>
            
            <div className="flex rounded-none border border-gray-300 overflow-hidden bg-white shadow-sm">
              <button className="px-3 py-1.5 border-r border-gray-300 hover:bg-gray-50 text-gray-600"><Copy className="w-4 h-4" /></button>
              <button className="px-3 py-1.5 border-r border-gray-300 hover:bg-gray-50 text-[13px] font-semibold text-gray-700">CSV</button>
              <button className="px-3 py-1.5 border-r border-gray-300 hover:bg-gray-50 text-[13px] font-semibold text-gray-700">Excel</button>
              <button className="px-3 py-1.5 border-r border-gray-300 hover:bg-gray-50 text-[13px] font-semibold text-gray-700">PDF</button>
              <button className="px-3 py-1.5 border-r border-gray-300 hover:bg-gray-50 text-gray-600"><Printer className="w-4 h-4" /></button>
              <button className="px-3 py-1.5 hover:bg-gray-50 text-[13px] font-semibold text-gray-700 flex items-center">
                <Columns className="w-4 h-4 mr-1.5" /> Columns <ChevronDown className="w-3 h-3 ml-1 text-gray-400" />
              </button>
            </div>
          </div>

          <div className="w-full md:w-64">
            <input 
              type="text" 
              placeholder="Search payments..."
              className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none focus:border-[#5542f6] shadow-sm"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-indigo-50/50 border-b border-gray-200">
                <th className="p-4 text-[11px] font-bold text-[#5542f6] uppercase w-12 text-center">#</th>
                <th className="p-4 text-[11px] font-bold text-[#5542f6] uppercase">ORDER ID</th>
                <th className="p-4 text-[11px] font-bold text-[#5542f6] uppercase">PLAN</th>
                <th className="p-4 text-[11px] font-bold text-[#5542f6] uppercase">AMOUNT</th>
                <th className="p-4 text-[11px] font-bold text-[#5542f6] uppercase">METHOD</th>
                <th className="p-4 text-[11px] font-bold text-[#5542f6] uppercase">TRANSACTION ID</th>
                <th className="p-4 text-[11px] font-bold text-[#5542f6] uppercase">PROOF</th>
                <th className="p-4 text-[11px] font-bold text-[#5542f6] uppercase">STATUS</th>
                <th className="p-4 text-[11px] font-bold text-[#5542f6] uppercase">DATE</th>
                <th className="p-4 text-[11px] font-bold text-[#5542f6] uppercase text-center w-32">ACTION</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-gray-600">
              {SUBSCRIPTION_DATA.map((row) => (
                <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50/30">
                  <td className="p-4 text-center">{row.id}</td>
                  <td className="p-4">{row.orderId}</td>
                  <td className="p-4">{row.plan}</td>
                  <td className="p-4 font-medium text-gray-800">{row.amount}</td>
                  <td className="p-4">
                    <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-none text-[11px] font-bold">
                      {row.method}
                    </span>
                  </td>
                  <td className="p-4">{row.transactionId}</td>
                  <td className="p-4">{row.proof}</td>
                  <td className="p-4">
                    <span className="bg-orange-50 text-orange-500 px-2 py-0.5 rounded-none text-[11px] font-bold">
                      {row.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500 whitespace-nowrap">{row.date}</td>
                  <td className="p-4 text-center">
                    <button className="flex items-center justify-center w-full px-3 py-1.5 bg-[#5542f6] text-white rounded-none text-xs font-bold hover:bg-[#4a3ae0] shadow-sm">
                      <CreditCard className="w-3.5 h-3.5 mr-1.5" /> Pay Now
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white">
          <div className="text-[13px] text-gray-500">
            Showing 1-1 of 1
          </div>
          
          <div className="flex items-center space-x-1">
            <button className="w-8 h-8 rounded-none border border-transparent hover:bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
              &lt;
            </button>
            <button className="w-8 h-8 rounded-none bg-[#5542f6] text-white flex items-center justify-center text-sm font-bold shadow-sm">
              1
            </button>
            <button className="w-8 h-8 rounded-none border border-transparent hover:bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
              &gt;
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
