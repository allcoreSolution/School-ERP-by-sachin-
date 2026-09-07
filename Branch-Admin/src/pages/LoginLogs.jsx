import React from 'react';
import { Filter, Trash2, ChevronDown, Download, RotateCcw, MapPin, Info, Calendar } from 'lucide-react';

const LoginLogs = () => {
  const logsData = [
    {
      id: "1.",
      date: "Sep 04, 2026",
      time: "01:19 AM",
      name: "Sudhakar Pandey",
      email: "cloudwaveindia@gmail.com",
      role: "SCHOOL ADMIN",
      school: "SUDHAKAR",
      ip: "61.2.58.216",
      location: "Puducherry, IN",
      device: "Chrome on\nWindows",
    },
    {
      id: "2.",
      date: "Sep 03, 2026",
      time: "04:33 PM",
      name: "Sudhakar Pandey",
      email: "cloudwaveindia@gmail.com",
      role: "SCHOOL ADMIN",
      school: "SUDHAKAR",
      ip: "2401:4900:88f2:9f11:548e:237f:7260:9afd",
      location: "Indore, IN",
      device: "Chrome on\nWindows",
    }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto bg-[#f4f7fa] min-h-[calc(100vh-70px)]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-[22px] font-semibold text-gray-800 tracking-tight">User Login Report</h1>
        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => { if(window.confirm('Are you sure you want to clear all logs?')) alert('Logs cleared successfully.'); }}
            className="bg-[#dc3545] hover:bg-[#c82333] text-white px-4 py-2 rounded-[3px] text-[13.5px] font-bold shadow-sm flex items-center gap-2 transition-colors focus:ring-2 focus:ring-[#dc3545]/50"
          >
            <Trash2 className="w-4 h-4" /> Clear Logs <ChevronDown className="w-3.5 h-3.5 border-l border-white/20 pl-1 ml-1" />
          </button>
          <button 
            onClick={() => alert('Initiating CSV export...')}
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
          <button className="text-gray-400 hover:text-gray-600 font-bold px-2">—</button>
        </div>
        
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-5">
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Institution</label>
              <div className="relative">
                <select className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-[3px] text-[13.5px] text-gray-700 bg-white focus:outline-none focus:border-[#fd7e14]">
                  <option>All Sites (Platform Wide)</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-2.5 top-[11px] text-gray-400 pointer-events-none" />
              </div>
            </div>
            
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">User Role</label>
              <div className="relative">
                <select className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-[3px] text-[13.5px] text-gray-700 bg-white focus:outline-none focus:border-[#fd7e14]">
                  <option>All Roles</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-2.5 top-[11px] text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Keyword Search</label>
              <input 
                type="text" 
                placeholder="Search by Name, Email, or IP Address..." 
                className="w-full px-3 py-2 border border-gray-300 rounded-[3px] text-[13.5px] focus:outline-none focus:border-[#fd7e14]"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-end justify-between gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full md:w-auto">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">From Date</label>
                <div>
                  <input 
                    type="date" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-[3px] text-[13.5px] text-gray-700 focus:outline-none focus:border-[#fd7e14] cursor-pointer"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">To Date</label>
                <div>
                  <input 
                    type="date" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-[3px] text-[13.5px] text-gray-700 focus:outline-none focus:border-[#fd7e14] cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 w-full md:w-auto">
               <button 
                 onClick={() => alert('Search filters applied.')}
                 className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#fd7e14] hover:bg-[#e86e04] text-white px-6 py-2 rounded-[3px] text-[13.5px] font-bold shadow-sm transition-colors cursor-pointer focus:ring-2 focus:ring-[#fd7e14]/50"
               >
                 <Filter className="w-4 h-4 fill-white" /> Apply Filters
               </button>
               <button 
                 onClick={() => alert('Search filters reset.')}
                 className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-5 py-2 rounded-[3px] text-[13.5px] font-bold shadow-sm transition-colors focus:ring-2 focus:ring-gray-200"
               >
                 <RotateCcw className="w-4 h-4" /> Reset
               </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[3px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white border border-gray-200">
            <thead className="bg-[#fafbfc]">
              <tr className="border-b-2 border-gray-200 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="border border-gray-200 py-3 px-3 w-[60px] whitespace-nowrap">#</th>
                <th className="border border-gray-200 py-3 px-3 whitespace-nowrap">Date & Time</th>
                <th className="border border-gray-200 py-3 px-3 whitespace-nowrap">User (Name & Email)</th>
                <th className="border border-gray-200 py-3 px-3 whitespace-nowrap">Role</th>
                <th className="border border-gray-200 py-3 px-3 whitespace-nowrap">School</th>
                <th className="border border-gray-200 py-3 px-3 whitespace-nowrap">IP Address</th>
                <th className="border border-gray-200 py-3 px-3 whitespace-nowrap">Device / Agent</th>
              </tr>
            </thead>
            <tbody className="text-[13px]">
              {logsData.map((log, i) => (
                <tr 
                  key={i} 
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="border border-gray-200 py-3 px-3 text-center text-gray-500 font-medium whitespace-nowrap">{log.id}</td>
                  <td className="border border-gray-200 py-3 px-3 whitespace-nowrap">
                    <div className="font-bold text-gray-800">{log.date}</div>
                    <div className="text-gray-500 text-[12px] mt-0.5">{log.time}</div>
                  </td>
                  <td className="border border-gray-200 py-3 px-3 whitespace-nowrap">
                    <div className="font-bold text-gray-800">{log.name}</div>
                    <div className="text-gray-400 text-[12px] mt-0.5">{log.email}</div>
                  </td>
                  <td className="border border-gray-200 py-3 px-3 whitespace-nowrap">
                    <span className="bg-[#0d6efd] text-white px-2 py-0.5 rounded-[3px] text-[10px] font-bold tracking-wide shadow-sm">
                      {log.role}
                    </span>
                  </td>
                  <td className="border border-gray-200 py-3 px-3 text-gray-800 uppercase tracking-tight font-medium whitespace-nowrap">
                    {log.school}
                  </td>
                  <td className="border border-gray-200 py-3 px-3 whitespace-nowrap">
                    <div className="text-gray-600 font-mono text-[12px] mb-1">{log.ip}</div>
                    <div className="text-gray-500 text-[11px] flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#dc3545]" /> {log.location}
                    </div>
                  </td>
                  <td className="border border-gray-200 py-3 px-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                       <div className="text-gray-700 whitespace-pre-line leading-tight text-[13px]">{log.device}</div>
                       <Info className="w-4 h-4 text-gray-400 cursor-help" />
                    </div>
                  </td>
                </tr>
              ))}
              
              {/* Padding rows if needed, omitted here since it's just a UI demo */}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default LoginLogs;
