import React from 'react';
import { Download, Calendar, RefreshCcw, Activity, ListChecks } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const AttendanceTrends = () => {
  const chartData = [
    { name: '2026-08-05', uv: 0 },
    { name: '2026-08-06', uv: 0 },
    { name: '2026-08-07', uv: 0 },
    { name: '2026-08-08', uv: 0 },
    { name: '2026-08-09', uv: 0 },
    { name: '2026-08-10', uv: 0 },
    { name: '2026-08-11', uv: 0 },
    { name: '2026-08-12', uv: 0 },
    { name: '2026-08-13', uv: 0 },
    { name: '2026-08-14', uv: 0 },
    { name: '2026-08-15', uv: 0 },
    { name: '2026-08-16', uv: 0 },
    { name: '2026-08-17', uv: 0 },
    { name: '2026-08-18', uv: 24 },
    { name: '2026-08-19', uv: 0 },
    { name: '2026-08-20', uv: 0 },
    { name: '2026-08-21', uv: 0 },
    { name: '2026-08-22', uv: 0 },
    { name: '2026-08-23', uv: 0 },
    { name: '2026-08-24', uv: 0 },
    { name: '2026-08-25', uv: 0 },
    { name: '2026-08-26', uv: 0 },
    { name: '2026-08-27', uv: 0 },
    { name: '2026-08-28', uv: 0 },
    { name: '2026-08-29', uv: 0 },
    { name: '2026-08-30', uv: 0 },
    { name: '2026-08-31', uv: 0 },
    { name: '2026-09-01', uv: 0 },
    { name: '2026-09-02', uv: 0 },
    { name: '2026-09-03', uv: 0 },
    { name: '2026-09-04', uv: 0 },
  ];

  const tableData = [
    {
      id: "1.",
      school: "Aksya School",
      students: "0 / 0",
      staff: "0 / 0",
      presence: "0.0%",
      status: "NO ACTIVE USERS",
      statusClass: "bg-gray-100 text-gray-500 border border-gray-200"
    },
    {
      id: "2.",
      school: "SSVP 3.0",
      students: "0 / 482",
      staff: "0 / 0",
      presence: "0.0%",
      status: "CRITICAL ABSENTEEISM (>-50%)",
      statusClass: "bg-[#dc3545] text-white",
      alert: true
    }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto bg-[#f4f7fa] min-h-[calc(100vh-70px)]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-[22px] font-semibold text-gray-800 tracking-tight">Global Attendance Trends</h1>
        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => alert("Initiating CSV export...")}
            className="bg-[#28a745] hover:bg-[#218838] text-white px-4 py-2 rounded-[3px] text-[13.5px] font-bold shadow-sm flex items-center gap-2 transition-colors focus:ring-2 focus:ring-[#28a745]/50"
          >
            <Download className="w-4 h-4" /> Export to CSV
          </button>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-[3px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 mb-6">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[13.5px] font-bold text-[#1a2b4c] uppercase tracking-tight">
            <Activity className="w-4.5 h-4.5 text-[#1a2b4c]" /> 30-DAY PLATFORM ACTIVE USAGE (STUDENT PRESENCE)
          </div>
        </div>
        
        <div className="p-6">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 40 }}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#17a2b8" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#17a2b8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="name" 
                  axisLine={true} 
                  tickLine={false} 
                  tick={{fill: '#6c757d', fontSize: 9}} 
                  interval={0}
                  angle={-35}
                  textAnchor="end"
                  dy={10}
                />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6c757d', fontSize: 11}} />
                <Tooltip />
                <Area type="monotone" dataKey="uv" stroke="#17a2b8" strokeWidth={2} fillOpacity={1} fill="url(#colorUv)" activeDot={{r: 6}} dot={{r: 4, fill: '#17a2b8', strokeWidth: 1, stroke: '#fff'}} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Audit Control Bar */}
      <div className="bg-white rounded-[3px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 mb-6 p-4 flex flex-col sm:flex-row items-center gap-4">
         <div className="text-[12px] font-bold text-gray-500 uppercase tracking-widest">
           Select Audit Date:
         </div>
         <div className="relative w-full sm:w-[200px]">
           <input 
             type="date" 
             defaultValue="2026-09-04" 
             className="w-full px-3 py-2 border border-gray-300 rounded-[3px] text-[13.5px] focus:outline-none focus:border-[#fd7e14] bg-white text-gray-700 font-medium cursor-pointer"
           />
         </div>
         <button 
           onClick={() => alert("Loading latest statistics...")}
           className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#fd7e14] hover:bg-[#e86e04] text-white px-5 py-2 rounded-[3px] text-[13.5px] font-bold shadow-sm transition-colors cursor-pointer focus:ring-2 focus:ring-[#fd7e14]/50"
         >
           <RefreshCcw className="w-4 h-4" /> Load Stats
         </button>
      </div>

      {/* Table Section (with Excel Lines) */}
      <div className="bg-white rounded-[3px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 mb-6">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[13.5px] font-bold text-[#1a2b4c] uppercase tracking-tight">
            <ListChecks className="w-4.5 h-4.5 text-[#1a2b4c]" /> INSTITUTION PERFORMANCE BREAKDOWN: SEP 04, 2026
          </div>
        </div>
        
        <div className="overflow-x-auto w-full">
          <table className="w-full border-collapse bg-white">
            <thead className="bg-[#2a3038] text-white">
              <tr className="border-b border-gray-700 text-left text-[11px] font-bold uppercase tracking-wider">
                <th className="border border-gray-400/30 py-3 px-2.5 w-[60px] whitespace-nowrap">#</th>
                <th className="border border-gray-400/30 py-3 px-2.5 w-[30%]">School Name</th>
                <th className="border border-gray-400/30 py-3 px-2.5 text-center whitespace-nowrap">Students (Present/Total)</th>
                <th className="border border-gray-400/30 py-3 px-2.5 text-center whitespace-nowrap">Staff (Present/Total)</th>
                <th className="border border-gray-400/30 py-3 px-2.5 text-center whitespace-nowrap">Total Presence</th>
                <th className="border border-gray-400/30 py-3 px-2.5 text-center whitespace-nowrap">Health Status</th>
              </tr>
            </thead>
            <tbody className="text-[13px]">
              {tableData.map((row, i) => (
                <tr 
                  key={i} 
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="border border-gray-200 py-3 px-2.5 text-gray-500 font-medium whitespace-nowrap">{row.id}</td>
                  <td className="border border-gray-200 py-3 px-2.5">
                    <div className="font-bold text-gray-800 text-[13.5px] break-words">{row.school}</div>
                  </td>
                  <td className="border border-gray-200 py-3 px-2.5 text-center text-gray-500 font-bold text-[13px] whitespace-nowrap">{row.students}</td>
                  <td className="border border-gray-200 py-3 px-2.5 text-center text-gray-500 font-bold text-[13px] whitespace-nowrap">{row.staff}</td>
                  <td className="border border-gray-200 py-3 px-2.5">
                    <div className="flex flex-col items-center">
                       <div className="font-bold text-gray-800 text-[12px] mb-1">{row.presence}</div>
                       <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                         <div className="h-full bg-blue-500 w-0"></div>
                       </div>
                    </div>
                  </td>
                  <td className="border border-gray-200 py-3 px-2.5 text-center whitespace-nowrap">
                    <span className={`inline-flex items-center justify-center px-3 py-1.5 rounded-[3px] text-[10px] font-bold tracking-widest uppercase shadow-sm ${row.statusClass}`}>
                      {row.alert && <svg className="w-3 h-3 mr-1.5 fill-white" viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>}
                      {row.status}
                    </span>
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

export default AttendanceTrends;
