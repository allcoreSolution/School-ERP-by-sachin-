import React from 'react';
import { FileSearch, Search, Printer, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const DayBook = () => {
  return (
    <div className="min-h-screen bg-[#ecf0f5] text-[#333] p-4 sm:p-6 font-sans">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-[24px] font-bold text-[#333] mb-1">Day Book</h1>
          <p className="text-[13px] text-gray-500">Daily ledger of transactions (Income and Expenses).</p>
        </div>
      </div>

      <div className="bg-white rounded-[3px] border border-[#e0e0e0] border-t-[3px] border-t-[#3c8dbc] shadow-sm mb-6">
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-[#fcfcfc]">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <label className="text-[12px] font-semibold text-[#555] mb-1">From Date</label>
              <input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="border border-gray-300 rounded-[3px] px-3 py-1.5 text-[13px] bg-white focus:outline-none focus:border-[#3c8dbc] w-[150px]"/>
            </div>
            <div className="flex flex-col">
              <label className="text-[12px] font-semibold text-[#555] mb-1">To Date</label>
              <input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="border border-gray-300 rounded-[3px] px-3 py-1.5 text-[13px] bg-white focus:outline-none focus:border-[#3c8dbc] w-[150px]"/>
            </div>
            <div className="flex flex-col justify-end">
              <button className="bg-[#3c8dbc] text-white px-4 py-1.5 rounded-[3px] text-[13px] hover:bg-[#367fa9] h-[34px] flex items-center justify-center gap-2 mt-[19px]">
                <Search className="w-4 h-4"/> Search
              </button>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button className="bg-gray-100 hover:bg-gray-200 text-[#444] px-3 py-1.5 rounded-[3px] text-[13px] flex items-center gap-2 border border-gray-300">
              <Printer className="w-4 h-4" /> Print
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-[#444] px-3 py-1.5 rounded-[3px] text-[13px] flex items-center gap-2 border border-gray-300">
              <Download className="w-4 h-4" /> Export
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-[#f8f9fa] text-[#444] text-[13px] font-bold tracking-wide border-b border-gray-200">
                <th className="py-3 px-5 w-24">Voucher No</th>
                <th className="py-3 px-5 w-24">Date</th>
                <th className="py-3 px-5">Type / Head</th>
                <th className="py-3 px-5">Participant</th>
                <th className="py-3 px-5 text-right w-32">Debit (₹)</th>
                <th className="py-3 px-5 text-right w-32">Credit (₹)</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-[#333]">
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-5 font-semibold text-[#3c8dbc]">RCT/0139</td>
                <td className="py-3 px-5">21 Aug 2026</td>
                <td className="py-3 px-5">
                  <span className="bg-[#00a65a] text-white px-2 py-0.5 rounded-[3px] text-[11px] mr-2">Income</span>
                  Fees Collection
                </td>
                <td className="py-3 px-5">Amit Student</td>
                <td className="py-3 px-5 text-right">0.00</td>
                <td className="py-3 px-5 text-right font-bold text-green-600">5,360.00</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-5 font-semibold text-[#3c8dbc]">PMT/0004</td>
                <td className="py-3 px-5">21 Aug 2026</td>
                <td className="py-3 px-5">
                  <span className="bg-[#d81b60] text-white px-2 py-0.5 rounded-[3px] text-[11px] mr-2">Expense</span>
                  Electricity Bill
                </td>
                <td className="py-3 px-5">Torrent Power</td>
                <td className="py-3 px-5 text-right font-bold text-red-600">15,000.00</td>
                <td className="py-3 px-5 text-right">0.00</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-5 font-semibold text-[#3c8dbc]">RCT/0138</td>
                <td className="py-3 px-5">21 Aug 2026</td>
                <td className="py-3 px-5">
                  <span className="bg-[#00a65a] text-white px-2 py-0.5 rounded-[3px] text-[11px] mr-2">Income</span>
                  Donation
                </td>
                <td className="py-3 px-5">Anonymous</td>
                <td className="py-3 px-5 text-right">0.00</td>
                <td className="py-3 px-5 text-right font-bold text-green-600">2,000.00</td>
              </tr>
            </tbody>
            <tfoot className="bg-[#fdfdfd] border-t border-gray-200 text-[#444] text-[13px] font-bold">
              <tr>
                <td colSpan="4" className="py-3 px-5 text-right bg-[#fcfcfc]">Totals (₹)</td>
                <td className="py-3 px-5 text-right text-red-600 bg-red-50/50">15,000.00</td>
                <td className="py-3 px-5 text-right text-green-600 bg-green-50/50">7,360.00</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
export default DayBook;
