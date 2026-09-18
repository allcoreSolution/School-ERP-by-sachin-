import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, Copy, FileText, Settings2, ArrowLeft } from 'lucide-react';

const CampusWorkerInOutLog = () => {
  const navigate = useNavigate();

  const logs = [
    { id: 1, date: '22 Aug 2026', worker: 'Rahul Singh (CW/YIS/2026/00001)', inTime: '08:15 AM', outTime: '05:30 PM', gate: 'Main Gate' },
    { id: 2, date: '21 Aug 2026', worker: 'Rahul Singh (CW/YIS/2026/00001)', inTime: '08:20 AM', outTime: '05:45 PM', gate: 'Main Gate' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#f4f6f8] overflow-y-auto">
      
      {/* Header */}
      <div className="px-8 pt-6 pb-6 bg-white border-b border-gray-200 shrink-0 flex items-center gap-4">
        <button 
          onClick={() => navigate('/front-office/campus-workers')}
          className="p-2 border border-gray-300 rounded-none hover:bg-gray-50 text-gray-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a2e]">Campus Workers In/Out Log</h1>
          <p className="text-[13px] text-gray-500 mt-1">Track daily entry and exit of contracted staff</p>
        </div>
      </div>

      <div className="p-8 w-full max-w-6xl mx-auto">
        <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
          
          <div className="p-4 border-b border-gray-200 bg-[#F8F7FF]">
            <h2 className="text-[14px] font-bold text-[#5F52FF] flex items-center gap-2">
              <ClipboardList className="w-4 h-4" /> Entry / Exit Logs
            </h2>
          </div>

          <div className="p-4 border-b border-gray-100 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-[12px] text-gray-600">
                Date Range
                <input type="date" className="border border-gray-300 rounded-none px-2 py-1 text-[12px] focus:outline-none focus:border-[#5F52FF]" />
                <span>to</span>
                <input type="date" className="border border-gray-300 rounded-none px-2 py-1 text-[12px] focus:outline-none focus:border-[#5F52FF]" />
              </div>
              <div className="flex items-center gap-2">
                <button className="border border-gray-300 bg-white text-gray-600 px-3 py-1.5 rounded-none hover:bg-gray-50 text-[12px] font-bold shadow-sm flex items-center gap-1.5">
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button className="border border-gray-300 bg-white text-gray-600 px-3 py-1.5 rounded-none hover:bg-gray-50 text-[12px] font-bold shadow-sm">CSV</button>
                <button className="border border-gray-300 bg-white text-gray-600 px-3 py-1.5 rounded-none hover:bg-gray-50 text-[12px] font-bold shadow-sm">Excel</button>
                <button className="border border-gray-300 bg-white text-gray-600 px-3 py-1.5 rounded-none hover:bg-gray-50 text-[12px] font-bold shadow-sm">PDF</button>
                <button onClick={() => window.print()} className="border border-gray-300 bg-white text-gray-600 px-3 py-1.5 rounded-none hover:bg-gray-50 text-[12px] font-bold shadow-sm flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="relative">
              <input 
                type="text" 
                placeholder="Search logs..." 
                className="w-full md:w-64 border border-gray-300 rounded-none pl-3 pr-4 py-1.5 text-[13px] focus:outline-none focus:border-[#5F52FF]"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8f9fa] border-b border-gray-200 text-[#5F52FF]">
                  <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider border-r border-gray-100">DATE</th>
                  <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider border-r border-gray-100">WORKER</th>
                  <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider border-r border-gray-100">IN TIME</th>
                  <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider border-r border-gray-100">OUT TIME</th>
                  <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider border-r border-gray-100">GATE</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-[13px] text-gray-800 border-r border-gray-100">{log.date}</td>
                    <td className="py-3 px-4 text-[13px] text-gray-800 font-bold border-r border-gray-100">{log.worker}</td>
                    <td className="py-3 px-4 text-[13px] text-[#28a745] font-medium border-r border-gray-100">{log.inTime}</td>
                    <td className="py-3 px-4 text-[13px] text-[#dc3545] font-medium border-r border-gray-100">{log.outTime}</td>
                    <td className="py-3 px-4 text-[13px] text-gray-600 border-r border-gray-100">{log.gate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampusWorkerInOutLog;
