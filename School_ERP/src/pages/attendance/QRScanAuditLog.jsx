import React, { useState } from 'react';
import { 
  Shield, BarChart2, FileDown, Settings2, Radio,
  LayoutList, CheckCircle2, Ban, MapPinOff, 
  NavigationOff, UserX, Filter, Trash2
} from 'lucide-react';

const mockData = [
  { id: 1, time: '23 Aug, 05:55', outcome: 'Accepted', resultReason: 'marked out', operator: 'school admin', targetName: 'Zara Sheikh', targetType: 'Student', mode: 'Gate', location: '—', device: '223.182.114.231' },
  { id: 2, time: '23 Aug, 05:45', outcome: 'Accepted', resultReason: 'marked out', operator: 'school admin', targetName: 'Shivam Sharma', targetType: 'Student', mode: 'Gate', location: '—', device: '223.182.114.231' },
  { id: 3, time: '23 Aug, 05:35', outcome: 'Accepted', resultReason: 'marked in', operator: 'school admin', targetName: 'Shivam Sharma', targetType: 'Student', mode: 'Gate', location: '—', device: '223.182.114.231' },
  { id: 4, time: '23 Aug, 05:32', outcome: 'Accepted', resultReason: 'marked in', operator: 'school admin', targetName: 'M', targetType: 'Student', mode: 'Gate', location: '—', device: '223.182.114.231' },
  { id: 5, time: '23 Aug, 05:32', outcome: 'Accepted', resultReason: 'marked in', operator: 'school admin', targetName: 'Zara Sheikh', targetType: 'Student', mode: 'Gate', location: '—', device: '223.182.114.231' },
  { id: 6, time: '23 Aug, 05:24', outcome: 'Accepted', resultReason: 'marked in', operator: 'school admin', targetName: 'Darsh Jain', targetType: 'Student', mode: 'Gate', location: '—', device: '223.182.114.231' },
  { id: 7, time: '23 Aug, 05:24', outcome: 'Accepted', resultReason: 'marked in', operator: 'Amit Sharma', targetName: 'Krish Yadav', targetType: 'Student', mode: 'Classroom', location: '—', device: '01635b96 5...' },
];

export default function QRScanAuditLog() {
  const [fromDate, setFromDate] = useState('2026-08-16');
  const [toDate, setToDate] = useState('2026-08-23');
  const [quickRange, setQuickRange] = useState('Last 7 days');
  const [isLive, setIsLive] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-slate-800" fill="currentColor" />
            <h1 className="text-xl font-bold text-slate-800">QR Scan Audit Log</h1>
          </div>
          <p className="text-sm text-slate-500 font-medium mt-0.5">
            Every scan decision — accepted and blocked — with who, where and on what device
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-bold rounded-none flex items-center gap-2 shadow-sm cursor-pointer transition-colors">
            <BarChart2 className="w-4 h-4" /> Attendance Report
          </button>
          <button className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-bold rounded-none flex items-center gap-2 shadow-sm cursor-pointer transition-colors">
            <FileDown className="w-4 h-4" /> Export CSV
          </button>
          <button className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-bold rounded-none flex items-center gap-2 shadow-sm cursor-pointer transition-colors">
            <Trash2 className="w-4 h-4" /> Manage Logs
          </button>
          <button 
            onClick={() => setIsLive(!isLive)}
            className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-bold rounded-none flex items-center gap-2 shadow-sm cursor-pointer transition-colors"
          >
            <input type="checkbox" checked={isLive} readOnly className="w-3.5 h-3.5 accent-indigo-600 rounded-none cursor-pointer" /> 
            <Radio className={`w-4 h-4 ${isLive ? 'text-red-500 animate-pulse' : 'text-slate-400'}`} /> Live
          </button>
        </div>
      </div>

      <div className="p-6 space-y-4">
        
        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          <div className="bg-white border border-slate-200 rounded-none p-4 flex items-center gap-3 shadow-3xs">
            <div className="w-8 h-8 rounded-none bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
              <LayoutList className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-black text-slate-800 leading-tight">16</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Total Scans</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-none p-4 flex items-center gap-3 shadow-3xs">
            <div className="w-8 h-8 rounded-none bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-black text-slate-800 leading-tight">16</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Accepted</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-none p-4 flex items-center gap-3 shadow-3xs opacity-70">
            <div className="w-8 h-8 rounded-none bg-red-50 flex items-center justify-center text-red-500 shrink-0">
              <Ban className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-black text-slate-800 leading-tight">0</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Blocked</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-none p-4 flex items-center gap-3 shadow-3xs opacity-70">
            <div className="w-8 h-8 rounded-none bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
              <NavigationOff className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-black text-slate-800 leading-tight">0</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Fake GPS</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-none p-4 flex items-center gap-3 shadow-3xs opacity-70">
            <div className="w-8 h-8 rounded-none bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
              <MapPinOff className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-black text-slate-800 leading-tight">0</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Off Campus</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-none p-4 flex items-center gap-3 shadow-3xs opacity-70">
            <div className="w-8 h-8 rounded-none bg-purple-50 flex items-center justify-center text-purple-500 shrink-0">
              <UserX className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-black text-slate-800 leading-tight">0</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Self-mark Blocked</div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white border border-slate-200 rounded-none p-4 shadow-3xs space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 mr-2">Quick range:</span>
            {['Today', 'Last 7 days', 'This month'].map((range) => (
              <button 
                key={range}
                onClick={() => setQuickRange(range)}
                className={`px-3 py-1.5 rounded-none text-xs font-bold border transition-colors cursor-pointer ${
                  quickRange === range 
                  ? 'border-slate-300 text-slate-800 bg-white shadow-sm' 
                  : 'border-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-end gap-4">
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
            <div className="flex-1 min-w-[120px] space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Outcome</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm font-semibold focus:outline-none focus:border-indigo-600 bg-white">
                <option>All</option>
                <option>Accepted</option>
                <option>Blocked</option>
              </select>
            </div>
            <div className="flex-1 min-w-[120px] space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Type</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm font-semibold focus:outline-none focus:border-indigo-600 bg-white">
                <option>All</option>
                <option>Student</option>
                <option>Staff</option>
              </select>
            </div>
            <div className="flex-1 min-w-[120px] space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Block Reason</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm font-semibold focus:outline-none focus:border-indigo-600 bg-white">
                <option>Any</option>
                <option>Fake GPS</option>
                <option>Off Campus</option>
              </select>
            </div>
            <div className="flex-[2] min-w-[200px] space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Search</label>
              <input 
                type="text" 
                placeholder="Operator / ID / device"
                className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm font-semibold focus:outline-none focus:border-indigo-600 bg-white"
              />
            </div>
          </div>
          
          <div>
            <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-none flex items-center justify-center gap-2 cursor-pointer border-none shadow-sm transition-colors text-sm font-bold">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-slate-200 rounded-none overflow-hidden shadow-3xs">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
              <LayoutList className="w-4 h-4 text-indigo-600" /> Scan Decisions
            </div>
            <div className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-none">16 records</div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-indigo-50/50 border-b border-slate-100 text-[10px] font-black text-indigo-600 uppercase tracking-wider">
                  <th className="py-3 px-4 border-r border-slate-100">TIME</th>
                  <th className="py-3 px-4 border-r border-slate-100">OUTCOME</th>
                  <th className="py-3 px-4 border-r border-slate-100">RESULT / REASON</th>
                  <th className="py-3 px-4 border-r border-slate-100">OPERATOR</th>
                  <th className="py-3 px-4 border-r border-slate-100">TARGET</th>
                  <th className="py-3 px-4 border-r border-slate-100">MODE</th>
                  <th className="py-3 px-4 border-r border-slate-100">LOCATION</th>
                  <th className="py-3 px-4">DEVICE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                {mockData.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-4 border-r border-slate-100 text-slate-600 font-medium">{row.time}</td>
                    <td className="py-3.5 px-4 border-r border-slate-100">
                      {row.outcome === 'Accepted' ? (
                        <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" /> {row.outcome}
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-red-600 font-bold text-[11px]">
                          <Ban className="w-3.5 h-3.5" /> {row.outcome}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 border-r border-slate-100 text-slate-600">{row.resultReason}</td>
                    <td className="py-3.5 px-4 border-r border-slate-100 text-slate-600">{row.operator}</td>
                    <td className="py-3.5 px-4 border-r border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-700">{row.targetName}</span>
                        <span className="px-1.5 py-0.5 rounded-none bg-purple-50 text-purple-600 text-[9px] font-bold">
                          {row.targetType}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 border-r border-slate-100 text-blue-500 font-bold text-[11px]">{row.mode}</td>
                    <td className="py-3.5 px-4 border-r border-slate-100 text-slate-400 font-bold">{row.location}</td>
                    <td className="py-3.5 px-4 text-slate-400 text-[10px] font-mono tracking-wide">{row.device}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
