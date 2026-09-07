import React from 'react';
import { CheckCircle2, XCircle, Share2, Download, Search, Eye, Filter, Calendar, ChevronDown } from 'lucide-react';

const CommunicationsReport = () => {
  const commData = [
    {
      id: "1",
      date: "Sep 03, 2026 09:27 PM",
      school: "Platform",
      channel: "FCMCHANNEL",
      recipient: "P9876500089",
      status: "Sent",
      reason: "N/A",
      highlight: true
    },
    {
      id: "2",
      date: "Sep 03, 2026 09:27 PM",
      school: "Platform",
      channel: "FCMCHANNEL",
      recipient: "P9876500089",
      status: "Sent",
      reason: "N/A",
      highlight: false
    },
    {
      id: "3",
      date: "Sep 03, 2026 08:27 PM",
      school: "Platform",
      channel: "FCMCHANNEL",
      recipient: "P9876500109",
      status: "Sent",
      reason: "N/A",
      highlight: false
    },
    {
      id: "4",
      date: "Sep 03, 2026 08:27 PM",
      school: "Platform",
      channel: "FCMCHANNEL",
      recipient: "P9876500109",
      status: "Sent",
      reason: "N/A",
      highlight: false
    },
    {
      id: "5",
      date: "Sep 03, 2026 08:14 PM",
      school: "Platform",
      channel: "FCMCHANNEL",
      recipient: "parent@projectworlds.com",
      status: "Sent",
      reason: "N/A",
      highlight: false
    }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto bg-[#f4f7fa] min-h-[calc(100vh-70px)]">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[22px] font-semibold text-gray-800 tracking-tight">Global Communications Report</h1>
      </div>

      {/* Top 3 Metric Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        <div className="bg-gradient-to-br from-[#28a745] to-[#218838] text-white p-6 rounded-[3px] shadow-[0_4px_12px_rgba(40,167,69,0.2)] flex items-center gap-5 relative overflow-hidden group h-[140px]">
          <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-300">
             <CheckCircle2 className="w-32 h-32" />
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3.5 shrink-0 border border-white/30 shadow-inner">
             <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
          <div className="relative z-10 flex flex-col justify-center">
            <div className="text-[13px] font-bold text-white/80 uppercase tracking-widest mb-1">Total Sent</div>
            <div className="text-[32px] font-black leading-none drop-shadow-sm">1,620</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-[#dc3545] to-[#c82333] text-white p-6 rounded-[3px] shadow-[0_4px_12px_rgba(220,53,69,0.2)] flex items-center gap-5 relative overflow-hidden group h-[140px]">
          <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-300">
             <XCircle className="w-32 h-32" />
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3.5 shrink-0 border border-white/30 shadow-inner">
             <XCircle className="w-8 h-8 text-white" />
          </div>
          <div className="relative z-10 flex flex-col justify-center">
            <div className="text-[13px] font-bold text-white/80 uppercase tracking-widest mb-1">Total Failed</div>
            <div className="text-[32px] font-black leading-none drop-shadow-sm">126</div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-[#17a2b8] to-[#138496] text-white p-5 rounded-[3px] shadow-[0_4px_12px_rgba(23,162,184,0.2)] flex items-start gap-4 relative overflow-hidden group h-[140px]">
          <div className="absolute -right-4 -top-4 opacity-10 group-hover:rotate-12 transition-transform duration-300 pointer-events-none">
             <Share2 className="w-32 h-32" />
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-[3px] p-2.5 shrink-0 border border-white/30 mt-0.5">
             <Share2 className="w-6 h-6 text-white" />
          </div>
          <div className="relative z-10 w-full flex flex-col h-full">
            <div className="text-[13px] font-bold text-white/90 uppercase tracking-widest mb-2 border-b border-white/20 pb-1.5">Breakdown by Channel</div>
            <div className="flex flex-wrap gap-1.5 overflow-y-auto pr-1 stylish-scrollbar">
              {[': 126', 'DATABASE: 332', 'FCMCHANNEL: 486', 'MAIL: 260', 'SMS: 508', 'TELEGRAMCHANNEL: 32', 'WHATSAPP: 2'].map(tag => (
                <span key={tag} className="bg-white/10 hover:bg-white/25 border border-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-[3px] shadow-sm tracking-wide uppercase transition-colors cursor-default backdrop-blur-sm">
                   {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-[3px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 mb-6">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="text-[14px] font-bold text-gray-800">Filter Communications</div>
          <button 
            onClick={() => alert("CSV Export in progress...")}
            className="bg-[#28a745] hover:bg-[#218838] text-white px-3 py-1.5 rounded-[3px] text-[12px] font-bold shadow-sm flex items-center gap-1.5 transition-colors focus:ring-2 focus:ring-[#28a745]/50"
          >
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
        </div>
        
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            <div>
              <label className="block text-[12px] font-bold text-gray-800 mb-2">School</label>
              <div className="relative">
                <select className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-[3px] text-[13.5px] text-gray-600 bg-white focus:outline-none focus:border-[#fd7e14]">
                  <option>All Schools</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-2.5 top-[11px] text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-[12px] font-bold text-gray-800 mb-2">Channel</label>
              <div className="relative">
                <select className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-[3px] text-[13.5px] text-gray-600 bg-white focus:outline-none focus:border-[#fd7e14]">
                  <option>All Channels</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-2.5 top-[11px] text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-[12px] font-bold text-gray-800 mb-2">Status</label>
              <div className="relative">
                <select className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-[3px] text-[13.5px] text-gray-600 bg-white focus:outline-none focus:border-[#fd7e14]">
                  <option>All Statuses</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-2.5 top-[11px] text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-[12px] font-bold text-gray-800 mb-2">Date Range (Start)</label>
              <div>
                <input 
                  type="date" 
                  defaultValue="2026-09-01" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-[3px] text-[13.5px] text-gray-600 focus:outline-none focus:border-[#fd7e14] bg-white cursor-pointer"
                />
              </div>
            </div>
            <div>
              <label className="block text-[12px] font-bold text-gray-800 mb-2">Date Range (End)</label>
              <div>
                <input 
                  type="date" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-[3px] text-[13.5px] text-gray-600 focus:outline-none focus:border-[#fd7e14] bg-white cursor-pointer"
                />
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
             <input 
                type="text" 
                placeholder="Search by recipient, subject or message..." 
                className="flex-grow px-3 py-2 border border-gray-300 rounded-[3px] text-[13.5px] focus:outline-none focus:border-[#fd7e14]"
             />
             <button 
               onClick={() => alert("Applying filters to communication logs...")}
               className="md:w-64 flex items-center justify-center gap-2 bg-[#fd7e14] hover:bg-[#e86e04] text-white px-6 py-2 rounded-[3px] text-[13.5px] font-bold shadow-sm transition-colors cursor-pointer shrink-0 focus:ring-2 focus:ring-[#fd7e14]/50"
             >
               <Filter className="w-4 h-4 fill-white" /> Apply Filters
             </button>
          </div>
        </div>
      </div>

      {/* Excel Styled Table */}
      <div className="bg-white rounded-[3px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="border-b border-gray-200 text-left text-[11.5px] font-bold text-gray-800 tracking-wider">
                <th className="border border-gray-200 py-3 px-3 whitespace-nowrap w-[15%]">Date</th>
                <th className="border border-gray-200 py-3 px-3 w-[15%]">School</th>
                <th className="border border-gray-200 py-3 px-3 w-[15%]">Channel</th>
                <th className="border border-gray-200 py-3 px-3 w-[20%]">Recipient</th>
                <th className="border border-gray-200 py-3 px-3 w-[10%]">Status</th>
                <th className="border border-gray-200 py-3 px-3 w-[20%]">Subject / Reason</th>
                <th className="border border-gray-200 py-3 px-3 text-center w-[60px]">Action</th>
              </tr>
            </thead>
            <tbody className="text-[13px]">
              {commData.map((row, i) => (
                <tr 
                  key={i} 
                  className={`border-b border-gray-200 transition-colors ${row.highlight ? 'bg-[#fff5f0]' : 'hover:bg-gray-50'}`}
                >
                  <td className="border border-gray-200 py-3 px-3 text-gray-700 font-medium whitespace-nowrap">{row.date}</td>
                  <td className="border border-gray-200 py-3 px-3 text-gray-700 break-words">{row.school}</td>
                  <td className="border border-gray-200 py-3 px-3 break-words">
                    <span className="bg-[#17a2b8] text-white px-2 py-1 rounded-[3px] text-[10px] font-bold tracking-widest uppercase shadow-sm whitespace-nowrap">
                      {row.channel}
                    </span>
                  </td>
                  <td className="border border-gray-200 py-3 px-3 text-gray-700 font-medium break-all">{row.recipient}</td>
                  <td className="border border-gray-200 py-3 px-3">
                    <span className="bg-[#28a745] text-white px-2.5 py-1.5 rounded-[3px] text-[10px] font-bold tracking-wider uppercase shadow-sm whitespace-nowrap">
                      {row.status}
                    </span>
                  </td>
                  <td className="border border-gray-200 py-3 px-3 text-gray-600 font-medium break-words">
                    {row.reason}
                  </td>
                  <td className="border border-gray-200 py-3 px-3">
                    <div className="flex justify-center">
                      <button 
                        onClick={() => alert(`Viewing communication details for ${row.recipient}`)}
                        className="border border-gray-300 text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-1.5 rounded-[3px] transition-colors focus:ring-2 focus:ring-gray-200"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
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

export default CommunicationsReport;
