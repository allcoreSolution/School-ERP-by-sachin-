import React from 'react';
import { FileText, ArrowDownToLine, ArrowUpFromLine, Wallet } from 'lucide-react';

const installRows = [
  {type: '1st Installment Fees', due: '05 Jan 26, 12:00 AM', amount: 5000, paid: 5000},
  {type: '2nd Installment Fees', due: '05 Apr 26, 12:00 AM', amount: 5000, paid: 5000},
  {type: '3rd Installment Fees', due: '05 Aug 26, 12:00 AM', amount: 5000, paid: 5000},
  {type: '4th Installment Fees', due: '05 Dec 26, 12:00 AM', amount: 5000, paid: 5000},
];

const admRows = [
  {type: 'Admission Fee', due: '05 Jan 26, 12:00 AM', amount: 1000, paid: 1000},
];

const trans1Rows = [
  {type: 'Transport Fee', due: '05 Feb 26, 12:00 AM', amount: 300, paid: 300},
];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const transMonthlyRows = months.map(m => ({
  type: 'Transport Fee', due: `10 ${m} 26, 12:00 AM`, amount: 1000, paid: 1000
}));

const InvoiceTable = ({ title, status, rows }) => {
  const totalAmount = rows.reduce((acc, r) => acc + r.amount, 0);
  const totalPaid = rows.reduce((acc, r) => acc + r.paid, 0);
  
  return (
    <div className="bg-white rounded-none border border-gray-200 overflow-hidden shadow-sm transition-all duration-300">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-white">
        <div className="flex items-center gap-2.5">
          <FileText className="w-4 h-4 text-[#4f46e5]" />
          <h3 className="text-[14px] font-bold text-gray-800 tracking-tight">{title}</h3>
        </div>
        <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-none tracking-wide ${status === 'Paid' ? 'bg-[#dcfce7] text-[#166534]' : 'bg-[#fee2e2] text-[#991b1b]'}`}>
          {status}
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px] border border-gray-200">
          <thead className="bg-[#f8f9fc] text-[10px] font-extrabold uppercase tracking-widest border border-gray-200">
            <tr>
              <th className="px-4 py-3.5 text-left w-[22%] text-[#4338ca] border border-gray-200">Fee Type</th>
              <th className="px-4 py-3.5 text-left w-[18%] text-[#4338ca] border border-gray-200">Due Date</th>
              <th className="px-4 py-3.5 text-right w-[12%] text-[#4338ca] border border-gray-200">Amount</th>
              <th className="px-4 py-3.5 text-right w-[12%] text-[#4338ca] border border-gray-200">Discount</th>
              <th className="px-4 py-3.5 text-right w-[12%] text-[#4338ca] border border-gray-200">Fine</th>
              <th className="px-4 py-3.5 text-right w-[12%] text-[#4338ca] border border-gray-200">Paid (In)</th>
              <th className="px-4 py-3.5 text-right w-[12%] text-[#4338ca] border border-gray-200">Due (Out)</th>
            </tr>
          </thead>
          <tbody className="text-[12.5px] text-gray-600">
            {rows.map((r, i) => (
              <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-3.5 font-medium text-gray-700 border border-gray-200">{r.type}</td>
                <td className="px-4 py-3.5 text-gray-500 whitespace-nowrap border border-gray-200">{r.due}</td>
                <td className="px-4 py-3.5 text-right font-medium border border-gray-200">{r.amount.toLocaleString(undefined, {minimumFractionDigits:2})}</td>
                <td className="px-4 py-3.5 text-right text-gray-400 border border-gray-200">0.00</td>
                <td className="px-4 py-3.5 text-right text-gray-400 border border-gray-200">0.00</td>
                <td className="px-4 py-3.5 text-right text-gray-800 font-medium border border-gray-200">+{r.paid.toLocaleString(undefined, {minimumFractionDigits:2})}</td>
                <td className="px-4 py-3.5 text-right text-gray-800 font-medium whitespace-nowrap border border-gray-200">0.00</td>
              </tr>
            ))}
            {/* Total Row */}
            <tr className="bg-[#fcfdff]">
              <td className="px-4 py-4 font-bold text-gray-900 text-[13px] border border-gray-200">Total Summary</td>
              <td className="px-4 py-4 border border-gray-200"></td>
              <td className="px-4 py-4 text-right font-bold text-gray-900 text-[13px] border border-gray-200">{totalAmount.toLocaleString(undefined, {minimumFractionDigits:2})}</td>
              <td className="px-4 py-4 text-right text-gray-400 text-[13px] border border-gray-200">0.00</td>
              <td className="px-4 py-4 text-right text-gray-400 text-[13px] border border-gray-200">0.00</td>
              <td className="px-4 py-4 text-right font-bold text-[#16a34a] text-[13px] border border-gray-200">+{totalPaid.toLocaleString(undefined, {minimumFractionDigits:2})}</td>
              <td className="px-4 py-4 text-right font-bold text-gray-900 text-[13px] border border-gray-200">0.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function FeePayments() {
  return (
    <div className="p-4 md:p-6 max-w-[1240px] mx-auto space-y-6">
      <h1 className="text-[22px] font-bold text-[#1f2937] tracking-tight">Fee Invoices for Rajesh Singh</h1>
      
      {/* 4 Summary Cards - SQUARE (rounded-none) as requested */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Assigned */}
        <div className="bg-[#6366f1] text-white p-4 rounded-none shadow flex gap-3 relative overflow-hidden transition-transform hover:-translate-y-0.5">
          <div className="bg-white/20 w-10 h-10 rounded-none flex items-center justify-center flex-shrink-0">
             <FileText className="w-5 h-5 text-white" />
          </div>
          <div className="relative z-10 w-full overflow-hidden">
             <h3 className="text-[10px] font-bold uppercase tracking-wider mb-1 opacity-90 truncate">Total Assigned</h3>
             <p className="text-[19px] font-extrabold leading-tight tracking-tight">₹ 33,300.00</p>
             <p className="text-[10px] opacity-80 mt-1 truncate">Overall lifetime billed</p>
          </div>
        </div>
        
        {/* Total Paid */}
        <div className="bg-[#059669] text-white p-4 rounded-none shadow flex gap-3 relative overflow-hidden transition-transform hover:-translate-y-0.5">
          <div className="bg-white/20 w-10 h-10 rounded-none flex items-center justify-center flex-shrink-0">
             <ArrowDownToLine className="w-5 h-5 text-white" />
          </div>
          <div className="relative z-10 w-full overflow-hidden">
             <h3 className="text-[10px] font-bold uppercase tracking-wider mb-1 opacity-90 truncate">Total Paid</h3>
             <p className="text-[19px] font-extrabold leading-tight tracking-tight">+ ₹ 33,300.00</p>
             <p className="text-[10px] opacity-80 mt-1 truncate">Successful receipts</p>
          </div>
        </div>
        
        {/* Due Balance */}
        <div className="bg-[#ef4444] text-white p-4 rounded-none shadow flex gap-3 relative overflow-hidden transition-transform hover:-translate-y-0.5">
          <div className="bg-white/20 w-10 h-10 rounded-none flex items-center justify-center flex-shrink-0">
             <ArrowUpFromLine className="w-5 h-5 text-white" />
          </div>
          <div className="relative z-10 w-full overflow-hidden">
             <h3 className="text-[10px] font-bold uppercase tracking-wider mb-1 opacity-90 truncate">Due Balance</h3>
             <p className="text-[19px] font-extrabold leading-tight tracking-tight">- ₹ 0.00</p>
             <p className="text-[10px] opacity-80 mt-1 truncate">Pending clearance</p>
          </div>
        </div>
        
        {/* Wallet Balance */}
        <div className="bg-[#4f46e5] text-white p-4 rounded-none shadow flex gap-3 relative overflow-hidden transition-transform hover:-translate-y-0.5">
          <div className="bg-white/20 w-10 h-10 rounded-none flex items-center justify-center flex-shrink-0">
             <Wallet className="w-5 h-5 text-white" />
          </div>
          <div className="relative z-10 w-full overflow-hidden">
             <h3 className="text-[10px] font-bold uppercase tracking-wider mb-1 opacity-90 truncate">Wallet Balance</h3>
             <p className="text-[19px] font-extrabold leading-tight tracking-tight">₹ 0.00</p>
             <p className="text-[10px] opacity-80 mt-1 truncate">Available funds</p>
          </div>
        </div>
      </div>

      <div className="space-y-6 pt-2">
        <InvoiceTable title="4th Installment Fees 2026-2027" status="Paid" rows={installRows} />
        <InvoiceTable title="Admission Fees 2026-2027" status="Paid" rows={admRows} />
        <InvoiceTable title="Transport 300 2026-2027" status="Paid" rows={trans1Rows} />
        <InvoiceTable title="Transport Fee Monthly" status="Paid" rows={transMonthlyRows} />
      </div>
      <div className="h-4"></div>
    </div>
  );
}
