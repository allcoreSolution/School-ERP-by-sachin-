import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Info, Zap, ArrowLeft, Download, CreditCard, ChevronDown, ChevronRight, CheckSquare, Square
} from 'lucide-react';

const StudentFeeCollection = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data for fees
  const [fees, setFees] = useState({
    installment4: [
      { id: 'inst4-1', type: '1st Installment Fees - Q...', dueDate: '05 Jan 2024', status: 'paid', amount: 5000, paid: 5000, discount: 0, fine: 0, balance: 0 },
      { id: 'inst4-2', type: '2nd Installment Fees - Q...', dueDate: '05 Apr 2024', status: 'paid', amount: 5000, paid: 5000, discount: 0, fine: 0, balance: 0 },
      { id: 'inst4-3', type: '3rd Installment Fees - Q...', dueDate: '05 Jul 2024', status: 'paid', amount: 5000, paid: 5000, discount: 0, fine: 0, balance: 0 },
    ],
    monthly: [
      { id: 'mon-1', type: 'Jan 2024', dueDate: '05 Jan 2024', status: 'unpaid', amount: 2000, paid: 0, discount: 0, fine: 0, balance: 2000 },
      { id: 'mon-2', type: 'Feb 2024', dueDate: '05 Feb 2024', status: 'unpaid', amount: 2000, paid: 0, discount: 0, fine: 0, balance: 2000 },
      { id: 'mon-3', type: 'March 2024', dueDate: '05 Mar 2024', status: 'unpaid', amount: 2000, paid: 0, discount: 0, fine: 0, balance: 2000 },
      { id: 'mon-4', type: 'April 2024', dueDate: '05 Apr 2024', status: 'unpaid', amount: 2000, paid: 0, discount: 0, fine: 0, balance: 2000 },
      { id: 'mon-5', type: 'May 2024', dueDate: '05 May 2024', status: 'unpaid', amount: 2000, paid: 0, discount: 0, fine: 0, balance: 2000 },
      { id: 'mon-6', type: 'June 2024', dueDate: '05 Jun 2024', status: 'unpaid', amount: 2000, paid: 0, discount: 0, fine: 0, balance: 2000 },
      { id: 'mon-7', type: 'July 2024', dueDate: '05 Jul 2024', status: 'unpaid', amount: 2000, paid: 0, discount: 0, fine: 0, balance: 2000 },
      { id: 'mon-8', type: 'Aug 2024', dueDate: '05 Aug 2024', status: 'unpaid', amount: 2000, paid: 0, discount: 0, fine: 0, balance: 2000 },
    ]
  });

  const [selectedFeeIds, setSelectedFeeIds] = useState([]);
  const [receipts, setReceipts] = useState([
    { id: '1', no: '101-2024-2025 (45070-2024)', date: '08 Aug 2024, 01:25:31 PM', amount: '₹4,500.00', mode: 'Cash', group: '4th Installment Fees 2024-2025' }
  ]);

  const toggleSelection = (feeId) => {
    setSelectedFeeIds(prev => 
      prev.includes(feeId) ? prev.filter(id => id !== feeId) : [...prev, feeId]
    );
  };

  const handleCollect = () => {
    if (selectedFeeIds.length === 0) return;

    let totalCollected = 0;

    // Update fees state
    const updatedFees = { ...fees };
    
    // Update monthly fees
    updatedFees.monthly = updatedFees.monthly.map(fee => {
      if (selectedFeeIds.includes(fee.id) && fee.status === 'unpaid') {
        totalCollected += fee.balance;
        return { ...fee, status: 'paid', paid: fee.amount, balance: 0 };
      }
      return fee;
    });

    setFees(updatedFees);
    setSelectedFeeIds([]);

    // Add receipt
    const newReceipt = {
      id: Date.now().toString(),
      no: `102-2024-2025 (${Date.now().toString().slice(-4)})`,
      date: new Date().toLocaleString(),
      amount: `₹${totalCollected.toFixed(2)}`,
      mode: 'Cash',
      group: 'Collected Fees'
    };
    setReceipts([...receipts, newReceipt]);
  };

  // Helper to render accordion rows
  const renderFeeGroup = (title, items, isExpandedDefault = true) => {
    const [expanded, setExpanded] = useState(isExpandedDefault);
    const hasUnpaid = items.some(i => i.status === 'unpaid');
    
    const subTotalAmount = items.reduce((sum, item) => sum + item.amount, 0);
    const subTotalPaid = items.reduce((sum, item) => sum + item.paid, 0);
    const subTotalBalance = items.reduce((sum, item) => sum + item.balance, 0);

    return (
      <div className="mb-4 bg-white border border-gray-200 rounded-none shadow-sm overflow-hidden text-xs text-gray-700">
        <div 
          className="flex justify-between items-center p-3 bg-blue-50/50 cursor-pointer border-b border-gray-100 hover:bg-blue-50"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex items-center gap-2 font-bold text-gray-800">
            {expanded ? <ChevronDown className="w-4 h-4 text-gray-500" /> : <ChevronRight className="w-4 h-4 text-gray-500" />}
            {title} 
            {hasUnpaid ? <span className="bg-red-100 text-red-600 px-1.5 py-0.5 rounded-none text-[9px] uppercase">Unpaid</span> : <span className="bg-green-100 text-green-600 px-1.5 py-0.5 rounded-none text-[9px] uppercase">Paid</span>}
          </div>
          <button className="text-blue-600 font-semibold border border-blue-200 bg-white px-2 py-1 rounded-none shadow-sm hover:bg-blue-50 text-[10px]" onClick={(e) => e.stopPropagation()}>
            Apply Discount
          </button>
        </div>
        
        {expanded && (
          <div>
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 font-semibold uppercase text-[10px]">
                <tr>
                  <th className="p-2 w-8 text-center">
                     {/* Select All Checkbox could go here */}
                  </th>
                  <th className="p-2">Fee Type</th>
                  <th className="p-2">Due Date</th>
                  <th className="p-2 text-center">Status</th>
                  <th className="p-2 text-right">Amount</th>
                  <th className="p-2 text-right">Paid</th>
                  <th className="p-2 text-right">Discount</th>
                  <th className="p-2 text-right">Fine</th>
                  <th className="p-2 text-right">Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map((item) => (
                  <tr key={item.id} className={item.status === 'paid' ? 'bg-green-50/30' : 'bg-red-50/30'}>
                    <td className="p-2 text-center cursor-pointer" onClick={() => item.status === 'unpaid' && toggleSelection(item.id)}>
                      {item.status === 'unpaid' && (
                        selectedFeeIds.includes(item.id) 
                          ? <CheckSquare className="w-4 h-4 text-blue-600 inline" /> 
                          : <Square className="w-4 h-4 text-gray-300 inline" />
                      )}
                    </td>
                    <td className="p-2 font-medium">{item.type}</td>
                    <td className="p-2">{item.dueDate}</td>
                    <td className="p-2 text-center">
                      <span className={`px-1.5 py-0.5 text-[10px] rounded-none font-bold uppercase ${item.status === 'paid' ? 'bg-green-500 text-white' : 'border border-red-500 text-red-500'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-2 text-right">₹{item.amount.toFixed(2)}</td>
                    <td className="p-2 text-right">₹{item.paid.toFixed(2)}</td>
                    <td className="p-2 text-right text-gray-400">₹0.00</td>
                    <td className="p-2 text-right text-gray-400">₹0.00</td>
                    <td className="p-2 text-right font-bold">₹{item.balance.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-yellow-100/50 font-bold border-t border-yellow-200 text-yellow-900">
                <tr>
                  <td colSpan="4" className="p-2">Sub Total ({items.length})</td>
                  <td className="p-2 text-right">₹{subTotalAmount.toFixed(2)}</td>
                  <td className="p-2 text-right text-green-700">₹{subTotalPaid.toFixed(2)}</td>
                  <td className="p-2 text-right text-gray-400">₹0.00</td>
                  <td className="p-2 text-right text-gray-400">₹0.00</td>
                  <td className="p-2 text-right text-red-600">₹{subTotalBalance.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-4 max-w-[1600px] mx-auto bg-gray-50 min-h-screen text-gray-800 pb-20">
      {/* Banner */}
      <div className="bg-[#009b9f] text-white p-2.5 rounded-none text-xs flex items-center gap-2 mb-4">
        <Info className="w-4 h-4 flex-shrink-0" />
        <p>
          <strong>New: academic-session scoping.</strong> Lists and dashboard numbers now show the selected academic session only, so totals may look smaller than before — nothing was deleted.
        </p>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-4 bg-white p-3 border border-gray-200 rounded-none shadow-sm">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold text-gray-900">Collect Student Fees</h1>
          <button className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-semibold text-gray-700 bg-white border border-gray-200 rounded-none shadow-sm hover:bg-gray-50">
            <Zap className="w-3.5 h-3.5 text-yellow-500" /> Rapid Mode (Tally Style)
          </button>
        </div>
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 border border-gray-200 rounded-none shadow-sm hover:bg-gray-50">
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </button>
      </div>

      {/* Profile Section */}
      <div className="bg-white border border-gray-200 rounded-none shadow-sm p-4 mb-4 flex flex-col md:flex-row gap-6 justify-between items-start">
        {/* Left: Info */}
        <div className="flex gap-4">
           <div className="w-20 h-20 bg-blue-50 border-2 border-blue-100 rounded-none flex flex-col items-center justify-center text-blue-400">
             <div className="w-8 h-8 rounded-none border-2 border-blue-400 mb-1"></div>
             <span className="text-[9px] font-bold uppercase">View Profile</span>
           </div>
           <div className="text-xs text-gray-600 leading-relaxed">
             <h2 className="text-lg font-bold text-gray-900 mb-1">Zain Khan <span className="bg-blue-100 text-blue-600 text-[10px] px-1.5 py-0.5 rounded-none ml-2 uppercase">Active</span></h2>
             <p className="font-semibold text-gray-800">2024-2025</p>
             <p>Class I (A)</p>
             <p>Zabir Khan</p>
           </div>
           <div className="text-xs text-gray-600 leading-relaxed ml-12 border-l border-gray-200 pl-6">
             <p className="flex items-center gap-2"><span className="text-gray-400">ADMISSION NO</span> <span className="font-semibold text-gray-800">{id || 'YUGADM - 205'}</span></p>
             <p className="flex items-center gap-2 mt-2"><span className="text-gray-400">CONTACT</span> <span className="font-semibold text-gray-800">9876543210</span></p>
           </div>
        </div>

        {/* Right: Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
           {[
             { label: 'TOTAL ASSIGNED', value: '₹22,000.00', color: 'text-blue-600', bg: 'bg-blue-50' },
             { label: 'TOTAL CONCESSION', value: '₹2,000.00', color: 'text-green-600', bg: 'bg-green-50' },
             { label: 'TOTAL PAID', value: '₹0.00', color: 'text-orange-500', bg: 'bg-orange-50' },
             { label: 'TOTAL FINE', value: '₹0.00', color: 'text-red-500', bg: 'bg-red-50' },
             { label: 'TOTAL REFUND', value: '₹14,400.00', color: 'text-purple-600', bg: 'bg-purple-50' },
             { label: 'TOTAL DUE', value: '₹0.00', color: 'text-green-600', bg: 'bg-green-50' },
           ].map((s, i) => (
             <div key={i} className={`p-2 border border-gray-100 rounded-none flex flex-col justify-center min-w-[120px] ${s.bg}`}>
               <p className="text-[9px] font-bold text-gray-500 uppercase">{s.label}</p>
               <p className={`text-sm font-bold mt-0.5 ${s.color}`}>{s.value}</p>
             </div>
           ))}
        </div>
      </div>

      {/* Collect Button */}
      <div className="bg-blue-50 p-3 rounded-none border border-blue-100 mb-4 flex justify-between items-center">
        <button 
          onClick={handleCollect}
          disabled={selectedFeeIds.length === 0}
          className={`px-5 py-2 text-sm font-bold text-white rounded-none flex items-center gap-2 shadow-sm transition-colors ${selectedFeeIds.length > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed'}`}
        >
          <CreditCard className="w-4 h-4" /> Collect Selected ({selectedFeeIds.length})
        </button>
      </div>

      {/* Fee Accordions */}
      <div className="space-y-4 mb-6">
        {renderFeeGroup("4th Installment Fees 2024-2025", fees.installment4, true)}
        {renderFeeGroup("Monthly Fees 2024-2025", fees.monthly, true)}
      </div>

      {/* Overall Payment History */}
      <div className="bg-white border border-gray-200 rounded-none shadow-sm overflow-hidden">
         <div className="bg-gray-500 text-white p-3 font-bold text-sm">
           Overall Payment History
         </div>
         <table className="w-full text-left text-xs">
           <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
             <tr>
               <th className="p-3">Receipt No</th>
               <th className="p-3">Payment Date</th>
               <th className="p-3">Amount Paid</th>
               <th className="p-3">Payment Mode</th>
               <th className="p-3">Fee Group</th>
               <th className="p-3 text-center">Action</th>
             </tr>
           </thead>
           <tbody className="divide-y divide-gray-100">
             {receipts.length > 0 ? receipts.map((r, i) => (
               <tr key={i} className="hover:bg-gray-50">
                 <td className="p-3 font-medium text-gray-800">{r.no}</td>
                 <td className="p-3 text-gray-600">{r.date}</td>
                 <td className="p-3 font-bold text-green-600">{r.amount}</td>
                 <td className="p-3 text-gray-600">{r.mode}</td>
                 <td className="p-3 text-gray-600">{r.group}</td>
                 <td className="p-3 text-center">
                   <div className="flex justify-center gap-2">
                     <button className="bg-gray-800 text-white px-2 py-1 text-[10px] rounded-none hover:bg-black font-semibold">Print</button>
                     <button className="bg-red-600 text-white px-2 py-1 text-[10px] rounded-none hover:bg-red-700 font-semibold">Revert</button>
                   </div>
                 </td>
               </tr>
             )) : (
               <tr><td colSpan="6" className="p-4 text-center text-gray-400">No payment history found.</td></tr>
             )}
           </tbody>
         </table>
      </div>

    </div>
  );
};

export default StudentFeeCollection;
