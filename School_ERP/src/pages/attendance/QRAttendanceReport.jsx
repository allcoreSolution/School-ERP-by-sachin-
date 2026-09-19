import React, { useState, useMemo } from 'react';
import { 
  BarChart2, ShieldAlert, FileDown, Users, 
  UserSquare2, CheckCircle2, Clock, ArrowLeftRight, 
  Filter, LayoutList
} from 'lucide-react';

import { attendanceService } from '../../api/attendanceService';

export default function QRAttendanceReport() {
  const [fromDate, setFromDate] = useState('2026-08-23');
  const [toDate, setToDate] = useState('2026-08-23');
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('Any');
  const [searchQuery, setSearchQuery] = useState('');
  const [logData, setLogData] = useState([]);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        const res = await attendanceService.getQRAttendanceReport({ fromDate, toDate });
        if (res.success && res.data) {
          setLogData(res.data);
        }
      } catch (error) {
        console.error("Error fetching QR report:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [fromDate, toDate]);

  // Filtering Logic
  const filteredData = useMemo(() => {
    return logData.filter(row => {
      const matchType = filterType === 'All' || row.type === filterType;
      const matchStatus = filterStatus === 'Any' || row.status === filterStatus;
      const matchSearch = row.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          row.admStaffId.toLowerCase().includes(searchQuery.toLowerCase());
      return matchType && matchStatus && matchSearch;
    });
  }, [filterType, filterStatus, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BarChart2 className="w-6 h-6 text-slate-800" />
            <h1 className="text-xl font-bold text-slate-800">QR Attendance Report</h1>
          </div>
          <p className="text-sm text-slate-500 font-medium mt-0.5">
            Every scan recorded at the QR attendance station
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-bold rounded-none flex items-center gap-2 shadow-sm cursor-pointer transition-colors">
            <ShieldAlert className="w-4 h-4" /> Scan Audit Log
          </button>
          <button className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-bold rounded-none flex items-center gap-2 shadow-sm cursor-pointer transition-colors">
            <FileDown className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      <div className="p-6 space-y-4">
        
        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="bg-white border border-slate-200 rounded-none p-4 flex items-center gap-3 shadow-3xs">
            <div className="w-8 h-8 rounded-none bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
              <LayoutList className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-black text-slate-800 leading-tight">0</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Total Scans</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-none p-4 flex items-center gap-3 shadow-3xs">
            <div className="w-8 h-8 rounded-none bg-purple-50 flex items-center justify-center text-purple-500 shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-black text-slate-800 leading-tight">0</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Students</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-none p-4 flex items-center gap-3 shadow-3xs opacity-60">
            <div className="w-8 h-8 rounded-none bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
              <UserSquare2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-black text-slate-800 leading-tight">0</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Staff</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-none p-4 flex items-center gap-3 shadow-3xs">
            <div className="w-8 h-8 rounded-none bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-black text-slate-800 leading-tight">0</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Present</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-none p-4 flex items-center gap-3 shadow-3xs opacity-60">
            <div className="w-8 h-8 rounded-none bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-black text-slate-800 leading-tight">0</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Late</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-none p-4 flex items-center gap-3 shadow-3xs">
            <div className="w-8 h-8 rounded-none bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
              <ArrowLeftRight className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-black text-slate-800 leading-tight">0</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">In & Out</div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white border border-slate-200 rounded-none p-4 flex flex-wrap items-end gap-4 shadow-3xs">
          <div className="flex-1 min-w-[150px] space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">From</label>
            <input 
              type="date" 
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm font-semibold focus:outline-none focus:border-indigo-600 bg-white"
            />
          </div>
          <div className="flex-1 min-w-[150px] space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">To</label>
            <input 
              type="date" 
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm font-semibold focus:outline-none focus:border-indigo-600 bg-white"
            />
          </div>
          <div className="flex-1 min-w-[150px] space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Type</label>
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm font-semibold focus:outline-none focus:border-indigo-600 bg-white"
            >
              <option>All</option>
              <option>Student</option>
              <option>Staff</option>
            </select>
          </div>
          <div className="flex-1 min-w-[150px] space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status</label>
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm font-semibold focus:outline-none focus:border-indigo-600 bg-white"
            >
              <option>Any</option>
              <option>Present</option>
              <option>Late</option>
              <option>Absent</option>
            </select>
          </div>
          <div className="flex-[2] min-w-[200px] space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Search</label>
            <input 
              type="text" 
              placeholder="Name / ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm font-semibold focus:outline-none focus:border-indigo-600 bg-white"
            />
          </div>
          <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-none flex items-center justify-center gap-2 cursor-pointer border-none shadow-sm transition-colors text-sm font-bold h-[38px] shrink-0">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>

        {/* Table */}
        <div className="bg-white border border-slate-200 rounded-none overflow-hidden shadow-3xs">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
              <LayoutList className="w-4 h-4 text-indigo-600" /> Scan Records
            </div>
            <div className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-none">{filteredData.length} records</div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-indigo-50/50 border-b border-slate-100 text-[10px] font-black text-indigo-600 uppercase tracking-wider">
                  <th className="py-3 px-4 border-r border-slate-100">DATE</th>
                  <th className="py-3 px-4 border-r border-slate-100">NAME</th>
                  <th className="py-3 px-4 border-r border-slate-100">TYPE</th>
                  <th className="py-3 px-4 border-r border-slate-100">CLASS / DESIGNATION</th>
                  <th className="py-3 px-4 border-r border-slate-100">ADM / STAFF ID</th>
                  <th className="py-3 px-4 border-r border-slate-100">IN</th>
                  <th className="py-3 px-4 border-r border-slate-100">OUT</th>
                  <th className="py-3 px-4 border-r border-slate-100">DURATION</th>
                  <th className="py-3 px-4">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                {loading ? (
                  <tr>
                    <td colSpan="9" className="py-8 text-center text-slate-500 font-medium">Loading report data...</td>
                  </tr>
                ) : filteredData.length > 0 ? (
                  filteredData.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/50">
                      <td className="py-3.5 px-4 border-r border-slate-100 text-slate-500 font-medium">{row.date}</td>
                      <td className="py-3.5 px-4 border-r border-slate-100 font-bold text-slate-800">{row.name}</td>
                      <td className="py-3.5 px-4 border-r border-slate-100">
                        <span className="px-2 py-0.5 rounded-none bg-purple-50 text-purple-600 text-[10px] font-bold">
                          {row.type}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 border-r border-slate-100 text-slate-600">{row.classDesig}</td>
                      <td className="py-3.5 px-4 border-r border-slate-100 text-slate-500">{row.admStaffId}</td>
                      <td className="py-3.5 px-4 border-r border-slate-100 text-indigo-900">{row.in}</td>
                      <td className="py-3.5 px-4 border-r border-slate-100 text-slate-500">{row.out}</td>
                      <td className="py-3.5 px-4 border-r border-slate-100 text-slate-500">{row.duration}</td>
                      <td className="py-3.5 px-4">
                        <span className="text-emerald-500 text-[10px] font-extrabold">{row.status}</span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="py-8 text-center text-slate-400 font-medium text-sm">
                      No records found for the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
