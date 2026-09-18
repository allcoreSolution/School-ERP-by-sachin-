import React from 'react';
import { BarChart as BarChartIcon, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const attendanceData = [
  { name: 'Aug 18', attendance: 6 },
  { name: 'Aug 19', attendance: 4 },
  { name: 'Aug 20', attendance: 17 },
  { name: 'Aug 21', attendance: 27 },
  { name: 'Aug 22', attendance: 8 },
  { name: 'Aug 23', attendance: 9 },
  { name: 'Aug 24', attendance: 6 },
];

const AttendanceOverTimeWidget = () => (
  <div className="bg-white p-4 rounded-none shadow-sm border border-slate-200 h-full flex flex-col">
    <div className="flex items-center gap-2 mb-6">
      <div className="text-emerald-500">
        <BarChartIcon className="w-4 h-4" />
      </div>
      <h2 className="text-sm font-bold text-slate-800">Attendance Over Time <span className="text-[10px] text-slate-400 font-normal ml-1">(7 Days)</span></h2>
    </div>

    <div className="flex-1 min-h-[220px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={attendanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
          <Tooltip 
            cursor={{ fill: '#f8fafc' }}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            labelStyle={{ fontWeight: 'bold', color: '#1e293b' }}
          />
          <Bar dataKey="attendance" name="Attendance %" fill="#6ee7b7" radius={[2, 2, 0, 0]} barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
    
    <div className="flex justify-center mt-2">
      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
        <div className="w-4 h-2 bg-[#6ee7b7] rounded-none"></div> Attendance %
      </div>
    </div>
  </div>
);

const LiveProtocolStreamWidget = () => (
  <div className="bg-white p-4 rounded-none shadow-sm border border-slate-200 h-full flex flex-col">
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2">
        <div className="text-red-500">
          <Activity className="w-4 h-4" />
        </div>
        <h2 className="text-sm font-bold text-slate-800">Live Protocol Stream</h2>
      </div>
      <div className="bg-red-50 text-red-600 text-[9px] font-bold px-2 py-0.5 rounded-none border border-red-100 flex items-center gap-1">
        <div className="w-1.5 h-1.5 bg-red-500 rounded-none animate-pulse"></div>
        LIVE
      </div>
    </div>

    <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar" style={{ maxHeight: '240px' }}>
      <div className="flex gap-3 text-xs">
        <div className="text-slate-400 font-mono w-14 shrink-0">23:51:41</div>
        <div className="border-l-2 border-emerald-400 pl-3 text-slate-600">Fee Collected: Rajesh <strong>₹20000.00</strong></div>
      </div>
      <div className="flex gap-3 text-xs">
        <div className="text-slate-400 font-mono w-14 shrink-0">15:07:37</div>
        <div className="border-l-2 border-emerald-400 pl-3 text-slate-600">Fee Collected: Krish <strong>₹30599.00</strong></div>
      </div>
      <div className="flex gap-3 text-xs">
        <div className="text-slate-400 font-mono w-14 shrink-0">15:00:04</div>
        <div className="border-l-2 border-emerald-400 pl-3 text-slate-600">Fee Collected: Kabir <strong>₹300.00</strong></div>
      </div>
      <div className="flex gap-3 text-xs">
        <div className="text-slate-400 font-mono w-14 shrink-0">13:06:57</div>
        <div className="border-l-2 border-emerald-400 pl-3 text-slate-600">Fee Collected: Gauri <strong>₹2000.00</strong></div>
      </div>
      <div className="flex gap-3 text-xs">
        <div className="text-slate-400 font-mono w-14 shrink-0">11:58:29</div>
        <div className="border-l-2 border-blue-400 pl-3 text-slate-600">Attendance Marked: Arun is Present</div>
      </div>
      <div className="flex gap-3 text-xs">
        <div className="text-slate-400 font-mono w-14 shrink-0">11:58:29</div>
        <div className="border-l-2 border-blue-400 pl-3 text-slate-600">Attendance Marked: M is Present</div>
      </div>
      <div className="flex gap-3 text-xs">
        <div className="text-slate-400 font-mono w-14 shrink-0">11:58:29</div>
        <div className="border-l-2 border-blue-400 pl-3 text-slate-600">Attendance Marked: Kabir is Present</div>
      </div>
      <div className="flex gap-3 text-xs">
        <div className="text-slate-400 font-mono w-14 shrink-0">11:58:29</div>
        <div className="border-l-2 border-blue-400 pl-3 text-slate-600">Attendance Marked: Ishaan is Present</div>
      </div>
    </div>
  </div>
);

const RowThree = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
      <AttendanceOverTimeWidget />
      <LiveProtocolStreamWidget />
    </div>
  );
};

export default RowThree;
