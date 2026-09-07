import React from 'react';
import { Filter, ChevronDown, Download, RotateCcw } from 'lucide-react';

const SchoolsUsage = () => {
  const usageData = [
    {
      id: "1.",
      name: "Aksya School",
      plan: "Trial Plan",
      students: "0",
      staff: "0",
      classes: "0",
      expiryDate: "Apr 02, 2027",
      expiryDays: "209 days left",
      status: "ACTIVE",
      revenue: "0.00",
      currency: "INR"
    },
    {
      id: "2.",
      name: "SSVP 3.0",
      plan: "Enterprise Plan",
      students: "482",
      staff: "0",
      classes: "17",
      expiryDate: "May 08, 2027",
      expiryDays: "245 days left",
      status: "ACTIVE",
      revenue: "0.00",
      currency: "INR"
    },
    {
      id: "3.",
      name: "Risma high school",
      plan: "Growth Plan",
      students: "34",
      staff: "31",
      classes: "9",
      expiryDate: "May 24, 2027",
      expiryDays: "261 days left",
      status: "ACTIVE",
      revenue: "0.00",
      currency: "KES"
    },
    {
      id: "4.",
      name: "CLOUDWAVE INTERNATIONAL SCHOOL",
      plan: "Enterprise Plan",
      students: "0",
      staff: "0",
      classes: "5",
      expiryDate: "Jul 03, 2027",
      expiryDays: "301 days left",
      status: "ACTIVE",
      revenue: "0.00",
      currency: "INR"
    }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto bg-[#f4f7fa] min-h-[calc(100vh-70px)]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-[22px] font-semibold text-gray-800 tracking-tight">Schools Usage & Health Report</h1>
        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => alert("Initiating CSV export...")}
            className="bg-[#28a745] hover:bg-[#218838] text-white px-4 py-2 rounded-[3px] text-[13.5px] font-bold shadow-sm flex items-center gap-2 transition-colors focus:ring-2 focus:ring-[#28a745]/50"
          >
            <Download className="w-4 h-4" /> Export to CSV
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-[3px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 mb-6">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[15px] font-bold text-gray-800">
            <Filter className="w-4.5 h-4.5 text-gray-800 fill-gray-800" /> Search & Filters
          </div>
        </div>
        
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-5">
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Status</label>
              <div className="relative">
                <select className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-[3px] text-[13.5px] text-gray-700 bg-white focus:outline-none focus:border-[#fd7e14]">
                  <option>All Statuses</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-2.5 top-[11px] text-gray-400 pointer-events-none" />
              </div>
            </div>
            
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Plan Tier</label>
              <div className="relative">
                <select className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-[3px] text-[13.5px] text-gray-700 bg-white focus:outline-none focus:border-[#fd7e14]">
                  <option>All Plans</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-2.5 top-[11px] text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Expiry Window</label>
              <div className="relative">
                <select className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-[3px] text-[13.5px] text-gray-700 bg-white focus:outline-none focus:border-[#fd7e14]">
                  <option>Any Expiry</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-2.5 top-[11px] text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Keywords</label>
              <input 
                type="text" 
                placeholder="Name, Code, or Email..." 
                className="w-full px-3 py-2 border border-gray-300 rounded-[3px] text-[13.5px] focus:outline-none focus:border-[#fd7e14]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4">
             <button 
               onClick={() => alert("Search filters applied.")}
               className="flex items-center justify-center gap-2 bg-[#fd7e14] hover:bg-[#e86e04] text-white px-6 py-2 rounded-[3px] text-[13.5px] font-bold shadow-sm transition-colors cursor-pointer focus:ring-2 focus:ring-[#fd7e14]/50"
             >
               <Filter className="w-4 h-4 fill-white" /> Apply Filters
             </button>
             <button 
               onClick={() => alert("Search filters reset.")}
               className="flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-5 py-2 rounded-[3px] text-[13.5px] font-bold shadow-sm transition-colors focus:ring-2 focus:ring-gray-200"
             >
               <RotateCcw className="w-4 h-4" /> Reset
             </button>
          </div>
        </div>
      </div>

      {/* Table Section (with Excel lines as per global rule) */}
      <div className="bg-white rounded-[3px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white">
            <thead className="bg-[#fafbfc]">
              <tr className="border-b-2 border-gray-200 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="border border-gray-200 py-3 px-3 w-[60px] whitespace-nowrap">#</th>
                <th className="border border-gray-200 py-3 px-3 w-[30%] min-w-[200px]">Institution</th>
                <th className="border border-gray-200 py-3 px-3 text-center whitespace-nowrap">Students</th>
                <th className="border border-gray-200 py-3 px-3 text-center whitespace-nowrap">Staff</th>
                <th className="border border-gray-200 py-3 px-3 text-center whitespace-nowrap">Classes</th>
                <th className="border border-gray-200 py-3 px-3 whitespace-nowrap">Expiry</th>
                <th className="border border-gray-200 py-3 px-3 text-center whitespace-nowrap">Status</th>
                <th className="border border-gray-200 py-3 px-3 text-right whitespace-nowrap">LTV Revenue</th>
              </tr>
            </thead>
            <tbody className="text-[13px]">
              {usageData.map((row, i) => (
                <tr 
                  key={i} 
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="border border-gray-200 py-3 px-3 text-center text-gray-500 font-medium whitespace-nowrap">{row.id}</td>
                  <td className="border border-gray-200 py-3 px-3 break-words">
                    <div className="font-bold text-gray-800 text-[13.5px] break-words">{row.name}</div>
                    <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                       <span className="bg-gray-100 text-gray-600 border border-gray-200 px-1.5 py-0.5 rounded-[3px] text-[10px] font-bold tracking-wide shadow-sm flex items-center gap-1">
                          <svg className="w-3 h-3 text-gray-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                          {row.plan}
                       </span>
                    </div>
                  </td>
                  <td className="border border-gray-200 py-3 px-3 text-center font-bold text-gray-800 whitespace-nowrap">{row.students}</td>
                  <td className="border border-gray-200 py-3 px-3 text-center text-gray-500 font-medium whitespace-nowrap">{row.staff}</td>
                  <td className="border border-gray-200 py-3 px-3 text-center text-gray-500 font-medium whitespace-nowrap">{row.classes}</td>
                  <td className="border border-gray-200 py-3 px-3 whitespace-nowrap">
                    <div className="font-bold text-[#28a745] text-[12px] tracking-tight mb-0.5">{row.expiryDate}</div>
                    <div className="text-[11px] text-[#28a745]/80 font-medium">{row.expiryDays}</div>
                  </td>
                  <td className="border border-gray-200 py-3 px-3 text-center whitespace-nowrap">
                    <span className="bg-[#28a745] text-white px-2.5 py-1 rounded-[3px] text-[10px] font-bold tracking-wider shadow-sm">
                      {row.status}
                    </span>
                  </td>
                  <td className="border border-gray-200 py-3 px-3 text-right whitespace-nowrap">
                    <div className="font-bold text-gray-800 text-[13.5px]">{row.revenue}</div>
                    <div className="text-gray-400 text-[11px] font-semibold tracking-wider mt-0.5">{row.currency}</div>
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

export default SchoolsUsage;
