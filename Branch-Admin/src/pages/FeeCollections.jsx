import React from 'react';
import { Filter, ChevronDown, Download, RotateCcw, Calendar, Search, PieChart, Info } from 'lucide-react';

const FeeCollections = () => {
  const feeData = [
    {
      id: "1.",
      date: "02 Sep, 2026",
      time: "08:38 AM",
      receipt: "#SUD-26-27-0027",
      studentName: "SAKSHI KUMARI",
      admNo: "Adm: 2273",
      school: "SUDHAKAR",
      method: "CASH",
      amount: "5,000.00"
    }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto bg-[#f4f7fa] min-h-[calc(100vh-70px)]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-[22px] font-semibold text-gray-800 tracking-tight">Global Fees Collection Report</h1>
        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => alert("Initiating CSV export...")}
            className="bg-[#28a745] hover:bg-[#218838] text-white px-4 py-2 rounded-[3px] text-[13.5px] font-bold shadow-sm flex items-center gap-2 transition-colors focus:ring-2 focus:ring-[#28a745]/50"
          >
            <Download className="w-4 h-4" /> Export to CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        {/* Search & Filters */}
        <div className="xl:col-span-3 bg-white rounded-[3px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col h-full">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-2 text-[15px] font-bold text-gray-800 uppercase tracking-tight">
              <Filter className="w-4.5 h-4.5 text-gray-800 fill-gray-800" /> Search & Filters
            </div>
          </div>
          
          <div className="p-5 flex-1 flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-5">
              
              <div className="md:col-span-4">
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Institution</label>
                <div className="relative">
                  <select className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-[3px] text-[13.5px] text-gray-700 bg-white focus:outline-none focus:border-[#fd7e14]">
                    <option>All Schools</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-2.5 top-[11px] text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="md:col-span-4">
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Date From</label>
                <div>
                  <input 
                    type="date" 
                    defaultValue="2026-09-01" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-[3px] text-[13.5px] text-gray-700 bg-white focus:outline-none focus:border-[#fd7e14] cursor-pointer"
                  />
                </div>
              </div>

              <div className="md:col-span-4">
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Date To</label>
                <div>
                  <input 
                    type="date" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-[3px] text-[13.5px] text-gray-700 bg-white focus:outline-none focus:border-[#fd7e14] cursor-pointer"
                  />
                </div>
              </div>

              <div className="md:col-span-4">
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Payment Mode</label>
                <div className="relative">
                  <select className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-[3px] text-[13.5px] text-gray-700 bg-white focus:outline-none focus:border-[#fd7e14]">
                    <option>All Modes</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-2.5 top-[11px] text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="md:col-span-8">
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Search Keywords</label>
                <input 
                  type="text" 
                  placeholder="Receipt #, Student Name, or Admission No..." 
                  className="w-full px-3 py-2 border border-gray-300 rounded-[3px] text-[13.5px] focus:outline-none focus:border-[#fd7e14]"
                />
              </div>

            </div>

            <div className="flex justify-end gap-3 mt-auto pt-2">
               <button 
                 onClick={() => alert("Search records applied.")}
                 className="flex items-center justify-center gap-2 bg-[#fd7e14] hover:bg-[#e86e04] text-white px-6 py-2 rounded-[3px] text-[13.5px] font-bold shadow-sm transition-colors cursor-pointer focus:ring-2 focus:ring-[#fd7e14]/50"
               >
                 <Search className="w-4 h-4" /> Search Records
               </button>
               <button 
                 onClick={() => alert("Filters reset.")}
                 className="flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-5 py-2 rounded-[3px] text-[13.5px] font-bold shadow-sm transition-colors focus:ring-2 focus:ring-gray-200"
               >
                 <RotateCcw className="w-4 h-4" /> Reset
               </button>
            </div>
          </div>
        </div>

        {/* Mode Clustering Widgets */}
        <div className="xl:col-span-1 bg-white rounded-[3px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col h-full">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-2 text-[15px] font-bold text-[#1a2b4c] uppercase tracking-tight">
              <PieChart className="w-4.5 h-4.5 text-[#1a2b4c] fill-[#1a2b4c]" /> Mode Clustering
            </div>
          </div>
          <div className="p-0 flex-1 flex flex-col">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 text-[11px] text-gray-500 font-bold">
                  <th className="py-2 px-4">Mode</th>
                  <th className="py-2 px-4 text-right">Total Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-[#fafbfc]">
                  <td className="py-2.5 px-4 font-bold text-gray-800 text-[13.5px]">Cash</td>
                  <td className="py-2.5 px-4 text-right font-medium text-gray-600 text-[13.5px]">5,000.00</td>
                </tr>
              </tbody>
            </table>
            
            <div className="mt-auto p-3 text-[11px] text-gray-400 flex items-center gap-1.5 border-t border-gray-100 bg-gray-50/50">
              <Info className="w-3.5 h-3.5 fill-gray-400 text-white" /> Grouped by payment type.
            </div>
          </div>
        </div>
      </div>

      {/* Table Section (with Excel lines as per global rule and Dark Header) */}
      <div className="bg-white rounded-[3px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white">
            <thead className="bg-[#2a3038] text-white">
              <tr className="border-b border-gray-700 text-left text-[11px] font-bold uppercase tracking-wider">
                <th className="border border-gray-400/30 py-2.5 px-2.5 whitespace-nowrap">#</th>
                <th className="border border-gray-400/30 py-2.5 px-2.5 whitespace-nowrap">Date</th>
                <th className="border border-gray-400/30 py-2.5 px-2.5 w-[20%]">Receipt Details</th>
                <th className="border border-gray-400/30 py-2.5 px-2.5 w-[25%]">Student Name</th>
                <th className="border border-gray-400/30 py-2.5 px-2.5 w-[20%]">School</th>
                <th className="border border-gray-400/30 py-2.5 px-2.5 text-center whitespace-nowrap">Mode</th>
                <th className="border border-gray-400/30 py-2.5 px-2.5 text-right whitespace-nowrap">Amount</th>
              </tr>
            </thead>
            <tbody className="text-[13px]">
              {feeData.map((row, i) => (
                <tr 
                  key={i} 
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="border border-gray-200 py-3 px-2.5 text-center text-gray-500 font-medium whitespace-nowrap">{row.id}</td>
                  <td className="border border-gray-200 py-3 px-2.5 whitespace-nowrap">
                    <div className="font-bold text-gray-800 text-[13px]">{row.date}</div>
                    <div className="text-[11px] text-gray-400 mt-0.5 font-medium">{row.time}</div>
                  </td>
                  <td className="border border-gray-200 py-3 px-2.5 break-words">
                    <a href="#" className="font-bold text-[#0d6efd] hover:underline text-[13.5px] break-words">{row.receipt}</a>
                  </td>
                  <td className="border border-gray-200 py-3 px-2.5 break-words">
                    <div className="font-bold text-gray-800 uppercase text-[13.5px] break-words leading-tight">{row.studentName}</div>
                    <div className="text-[11px] text-gray-500 mt-0.5">{row.admNo}</div>
                  </td>
                  <td className="border border-gray-200 py-3 px-2.5 text-gray-600 font-medium uppercase tracking-tight break-words">
                    {row.school}
                  </td>
                  <td className="border border-gray-200 py-3 px-2.5 text-center whitespace-nowrap">
                    <span className="bg-white text-gray-500 border border-gray-200 px-2.5 py-1 rounded-[3px] text-[9.5px] font-bold tracking-widest uppercase shadow-sm">
                      {row.method}
                    </span>
                  </td>
                  <td className="border border-gray-200 py-3 px-2.5 text-right whitespace-nowrap">
                    <div className="font-bold text-gray-900 text-[15px]">₹ {row.amount}</div>
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

export default FeeCollections;
