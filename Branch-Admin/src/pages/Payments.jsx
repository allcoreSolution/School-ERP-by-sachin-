import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

const Payments = () => {
  const [activeTab, setActiveTab] = useState('All');

  const paymentsData = [
    { id: '#60', name: 'SUDHAKAR', plan: 'Growth Plan', amount: '₹10,000.00', method: 'Razorpay', transId: '—', proof: '—', status: 'Pending', date: '12 Aug, 2026 08:11 PM' },
    { id: '#8', name: 'Aksya School', plan: 'Enterprise Plan', amount: '₹50,000.00', method: 'Razorpay', transId: '—', proof: '—', status: 'Pending', date: '02 Apr, 2026 10:26 PM' },
    { id: '#7', name: 'Aksya School', plan: 'Enterprise Plan', amount: '₹50,000.00', method: 'Flutterwave', transId: '—', proof: '—', status: 'Pending', date: '02 Apr, 2026 10:26 PM' },
  ];

  const tabs = [
    { name: 'All', count: paymentsData.length },
    { name: 'Paid', count: paymentsData.filter(p => p.status === 'Paid').length },
    { name: 'Pending', count: paymentsData.filter(p => p.status === 'Pending').length },
    { name: 'Verify', count: paymentsData.filter(p => p.status === 'Verify').length },
    { name: 'Failed', count: paymentsData.filter(p => p.status === 'Failed').length },
  ];

  const filteredPayments = activeTab === 'All' 
    ? paymentsData 
    : paymentsData.filter(payment => payment.status === activeTab);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto bg-white min-h-[calc(100vh-70px)]">
      
      {/* Header */}
      <div className="mb-6 flex items-baseline gap-2">
        <h1 className="text-[22px] font-semibold text-gray-800 tracking-tight">Payment History</h1>
        <span className="text-[14px] text-gray-400 font-medium">{filteredPayments.length} total</span>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6 font-medium text-[14px] overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`px-5 py-2.5 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === tab.name 
                ? 'text-[#17a2b8] border-b-2 border-[#17a2b8]' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.name} <span className="text-[12px] opacity-70">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-6">
        <div className="relative md:col-span-9 lg:col-span-10">
          <Search className="w-4 h-4 absolute left-3 top-[11px] text-gray-400" />
          <input 
            type="text" 
            placeholder="Search school, txn or order #..." 
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-[3px] text-[13.5px] focus:outline-none focus:border-[#17a2b8]"
          />
        </div>
        <div className="md:col-span-2 lg:col-span-1">
          <div className="relative">
            <select className="w-full appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-[3px] text-[13.5px] text-gray-600 bg-white focus:outline-none focus:border-[#17a2b8]">
              <option>Sort</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2.5 top-[11px] text-gray-400 pointer-events-none" />
          </div>
        </div>
        <div className="md:col-span-1 lg:col-span-1">
          <button className="w-full py-2 bg-[#17a2b8] hover:bg-[#138496] text-white font-medium text-[13.5px] rounded-[3px] transition-colors shadow-sm">
            Search
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-100 text-left text-[13px] font-bold text-gray-800">
              <th className="border border-gray-200 py-2.5 px-2.5 whitespace-nowrap">Order ID</th>
              <th className="border border-gray-200 py-2.5 px-2.5 w-[22%]">School Name</th>
              <th className="border border-gray-200 py-2.5 px-2.5">Plan</th>
              <th className="border border-gray-200 py-2.5 px-2.5 text-right whitespace-nowrap">Amount</th>
              <th className="border border-gray-200 py-2.5 px-2.5 text-center">Method</th>
              <th className="border border-gray-200 py-2.5 px-2.5 text-center">Trans. ID</th>
              <th className="border border-gray-200 py-2.5 px-2.5 text-center">Proof</th>
              <th className="border border-gray-200 py-2.5 px-2.5 whitespace-nowrap">Status</th>
              <th className="border border-gray-200 py-2.5 px-2.5">Date</th>
              <th className="border border-gray-200 py-2.5 px-2.5 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-[12.5px]">
            {filteredPayments.map((payment, i) => (
              <tr 
                key={i} 
                className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                style={{ backgroundColor: i % 2 !== 0 ? '#fafbfc' : 'transparent' }}
              >
                <td className="border border-gray-200 py-3 px-2.5 text-gray-600 font-bold whitespace-nowrap">{payment.id}</td>
                <td className="border border-gray-200 py-3 px-2.5 text-gray-800 break-words font-semibold leading-tight">{payment.name}</td>
                <td className="border border-gray-200 py-3 px-2.5 text-gray-600 break-words">{payment.plan}</td>
                <td className="border border-gray-200 py-3 px-2.5 font-bold text-gray-800 text-right whitespace-nowrap">{payment.amount}</td>
                <td className="border border-gray-200 py-3 px-2.5 text-center whitespace-nowrap">
                  <span className="bg-[#17a2b8] text-white px-2 py-0.5 rounded-[3px] text-[10.5px] font-semibold tracking-wide">
                    {payment.method}
                  </span>
                </td>
                <td className="border border-gray-200 py-3 px-2.5 text-gray-400 font-medium text-center break-words">{payment.transId}</td>
                <td className="border border-gray-200 py-3 px-2.5 text-gray-400 font-medium text-center break-words">{payment.proof}</td>
                <td className="border border-gray-200 py-3 px-2.5 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-[3px] text-[10.5px] font-bold shadow-sm uppercase ${
                    payment.status === 'Paid' ? 'bg-[#28a745] text-white' : 
                    payment.status === 'Verify' ? 'bg-[#1b8c56] text-white' : 
                    payment.status === 'Failed' ? 'bg-[#dc3545] text-white' : 'bg-[#ffc107] text-gray-900'
                  }`}>
                    {payment.status}
                  </span>
                </td>
                <td className="border border-gray-200 py-3 px-2.5 text-gray-500 font-medium sm:whitespace-normal whitespace-nowrap">{payment.date}</td>
                <td className="border border-gray-200 py-3 px-2.5 text-gray-400 text-center font-bold whitespace-nowrap">
                  —
                </td>
              </tr>
            ))}
            {filteredPayments.length === 0 && (
              <tr>
                <td colSpan="10" className="py-8 text-center text-gray-500 bg-gray-50 font-medium">
                  No payments found in this view.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Payments;
