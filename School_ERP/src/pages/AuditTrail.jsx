import React from 'react';
import { 
  Trash2, History, List, LayoutGrid, Copy, FileSpreadsheet, 
  FileText, Printer, Columns, ChevronDown, Wand2
} from 'lucide-react';

const AUDIT_LOGS = [
  {
    id: 1,
    user: 'school admin',
    activity: 'Updated',
    platform: 'Web',
    date: '23 Aug, 2026 02:05 AM',
    eventTitle: 'User updated a Staff record (ID: 5).',
    changes: [
      { field: 'Photo', from: 'staff_photos/zxyOJfzLPt8bWiVb1ozhM0OrhLNpIXJHNReqt6Wd.jpg', to: 'staff_photos/9SbjhzYga5eSgqwqPlzULZToFXhpbtgMJEnHhxae.jpg' }
    ]
  },
  {
    id: 2,
    user: 'school admin',
    activity: 'Updated',
    platform: 'Web',
    date: '23 Aug, 2026 01:15 AM',
    eventTitle: 'User updated a AdmissionEnquiry record (ID: 36).',
    changes: [
      { field: 'Assigned To', from: '1', to: '5' }
    ]
  },
  {
    id: 3,
    user: 'school admin',
    activity: 'Created',
    platform: 'Web',
    date: '23 Aug, 2026 01:15 AM',
    eventTitle: 'User created a LeadActivity record (ID: 117).',
    changes: []
  },
  {
    id: 4,
    user: 'school admin',
    activity: 'Created',
    platform: 'Web',
    date: '23 Aug, 2026 01:14 AM',
    eventTitle: 'User created a FeeDeposit record (ID: 1330).',
    changes: []
  },
  {
    id: 5,
    user: 'school admin',
    activity: 'Updated',
    platform: 'Web',
    date: '23 Aug, 2026 01:14 AM',
    eventTitle: 'User updated a StudentFee record (ID: 44).',
    changes: [
      { field: 'Paid Amount', from: '1060.00', to: '1090.00' },
      { field: 'Due Amount', from: '40.00', to: '10' }
    ]
  },
  {
    id: 6,
    user: 'Rajesh Kumar',
    activity: 'Created',
    platform: 'Web',
    date: '23 Aug, 2026 12:59 AM',
    eventTitle: 'User created a FeeDeposit record (ID: 1329).',
    changes: []
  },
  {
    id: 7,
    user: 'Rajesh Kumar',
    activity: 'Updated',
    platform: 'Web',
    date: '23 Aug, 2026 12:59 AM',
    eventTitle: 'User updated a Student record (ID: 3).',
    changes: [
      { field: 'Wallet Balance', from: '1000.00', to: '26000' }
    ]
  },
  {
    id: 8,
    user: 'Rajesh Kumar',
    activity: 'Updated',
    platform: 'Web',
    date: '23 Aug, 2026 12:59 AM',
    eventTitle: 'User updated a FeeDeposit record (ID: 1329).',
    changes: [
      { field: 'Amount', from: '0', to: '42000' }
    ]
  },
  {
    id: 9,
    user: 'Rajesh Kumar',
    activity: 'Updated',
    platform: 'Web',
    date: '23 Aug, 2026 12:59 AM',
    eventTitle: 'User updated a StudentFee record (ID: 3).',
    changes: [
      { field: 'Paid Amount', from: '14000.00', to: '19000.00' },
      { field: 'Due Amount', from: '5000.00', to: '0' },
      { field: 'Status', from: 'partial', to: 'paid' }
    ]
  },
  {
    id: 10,
    user: 'Rajesh Kumar',
    activity: 'Updated',
    platform: 'Web',
    date: '23 Aug, 2026 12:59 AM',
    eventTitle: 'User updated a StudentFee record (ID: 4536).',
    changes: [
      { field: 'Paid Amount', from: '12000.00', to: '24000.00' },
      { field: 'Due Amount', from: '12000.00', to: '0' },
      { field: 'Status', from: 'partial', to: 'paid' }
    ]
  }
];

export default function AuditTrail() {
  return (
    <div className="bg-[#f4f7fc] min-h-[calc(100vh-64px)] font-sans p-6">
      
      {/* Header */}
      <div className="flex justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-[24px] font-semibold text-gray-800">Audit Trail</h1>
          <p className="text-gray-500 text-sm mt-1">Every change made in your school, recorded automatically</p>
        </div>
        <button className="flex items-center px-4 py-2 border border-[#dc3545] text-[#dc3545] bg-white rounded-none text-sm font-bold hover:bg-red-50 transition-colors shadow-sm">
          <Trash2 className="w-4 h-4 mr-2" />
          Clear Logs
        </button>
      </div>

      {/* Info Banner */}
      <div className="bg-indigo-50/80 border border-indigo-100 rounded-none p-3 mb-6 flex items-start sm:items-center">
        <Wand2 className="w-4 h-4 text-[#5542f6] mr-2 mt-0.5 sm:mt-0 flex-shrink-0" />
        <p className="text-[13px] text-gray-700">
          <span className="font-bold text-[#5542f6]">Automatic cleanup is on.</span> Every change in your school is recorded here, and the system automatically removes entries older than <span className="font-bold">90 days</span> each night — you never need to clear logs manually.
        </p>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden flex flex-col">
        
        {/* Panel Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center">
            <History className="w-4 h-4 text-[#5542f6] mr-2" />
            <h2 className="text-sm font-bold text-gray-800">System Activity Logs</h2>
          </div>
          <div className="flex bg-gray-100 p-0.5 rounded-none border border-gray-200">
            <button className="w-8 h-7 bg-white shadow-sm rounded-none flex items-center justify-center text-[#5542f6]">
              <List className="w-4 h-4" />
            </button>
            <button className="w-8 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center text-sm text-gray-600 mr-2">
              <span>Show</span>
              <div className="mx-2 px-2 py-1 border border-gray-300 rounded-none bg-white flex items-center">
                10 <ChevronDown className="w-3 h-3 ml-2 text-gray-400" />
              </div>
            </div>
            
            <div className="flex rounded-none border border-gray-300 overflow-hidden bg-white shadow-sm">
              <button className="px-3 py-1.5 border-r border-gray-300 hover:bg-gray-50 text-gray-600"><Copy className="w-4 h-4" /></button>
              <button className="px-3 py-1.5 border-r border-gray-300 hover:bg-gray-50 text-[13px] font-semibold text-gray-700">CSV</button>
              <button className="px-3 py-1.5 border-r border-gray-300 hover:bg-gray-50 text-[13px] font-semibold text-gray-700">Excel</button>
              <button className="px-3 py-1.5 border-r border-gray-300 hover:bg-gray-50 text-[13px] font-semibold text-gray-700">PDF</button>
              <button className="px-3 py-1.5 border-r border-gray-300 hover:bg-gray-50 text-gray-600"><Printer className="w-4 h-4" /></button>
              <button className="px-3 py-1.5 hover:bg-gray-50 text-[13px] font-semibold text-gray-700 flex items-center">
                <Columns className="w-4 h-4 mr-1.5" /> Columns <ChevronDown className="w-3 h-3 ml-1 text-gray-400" />
              </button>
            </div>
          </div>

          <div className="w-full md:w-64">
            <input 
              type="text" 
              placeholder="Search activity..."
              className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none focus:border-[#5542f6] shadow-sm"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-indigo-50/50 border-b border-gray-200">
                <th className="p-4 text-[11px] font-bold text-[#5542f6] uppercase w-48">USER</th>
                <th className="p-4 text-[11px] font-bold text-[#5542f6] uppercase w-32">ACTIVITY</th>
                <th className="p-4 text-[11px] font-bold text-[#5542f6] uppercase w-32">PLATFORM</th>
                <th className="p-4 text-[11px] font-bold text-[#5542f6] uppercase">EVENT DETAILS</th>
                <th className="p-4 text-[11px] font-bold text-[#5542f6] uppercase w-48 text-right">DATE & TIME</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-gray-600">
              {AUDIT_LOGS.map((log) => (
                <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50/30">
                  <td className="p-4 align-top">{log.user}</td>
                  <td className="p-4 align-top">
                    <span className={`px-2 py-0.5 rounded-none text-white text-[11px] font-bold ${log.activity === 'Created' ? 'bg-[#28a745]' : 'bg-[#007bff]'}`}>
                      {log.activity}
                    </span>
                  </td>
                  <td className="p-4 align-top">{log.platform}</td>
                  <td className="p-4 align-top">
                    <div className="text-gray-800 mb-2 font-medium">
                      {log.eventTitle.split(/(ID: \d+)/).map((part, i) => 
                        part.startsWith('ID:') ? <span key={i} className="text-gray-600 font-normal">({part})</span> : part.replace(/[()]/g, '')
                      )}
                    </div>
                    {log.changes.length > 0 && (
                      <div className="bg-gray-50 border border-gray-100 rounded-none p-2.5 text-[12px] space-y-1 inline-block min-w-full">
                        {log.changes.map((change, idx) => (
                          <div key={idx} className="flex flex-wrap items-center">
                            <span className="text-gray-500 mr-1">Changed</span>
                            <span className="font-semibold text-gray-700 mr-1">{change.field}</span>
                            <span className="text-gray-500 mr-1">from</span>
                            <span className="bg-white border border-gray-200 px-1.5 py-0.5 rounded-none text-gray-700 mr-1 break-all max-w-[200px] xl:max-w-md truncate" title={change.from}>{change.from}</span>
                            <span className="text-gray-500 mr-1">to</span>
                            <span className="bg-white border border-gray-200 px-1.5 py-0.5 rounded-none text-gray-700 break-all max-w-[200px] xl:max-w-md truncate" title={change.to}>{change.to}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="p-4 align-top text-right text-gray-500 whitespace-nowrap">{log.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white">
          <div className="text-[13px] text-gray-500">
            Showing 1-10 of 599
          </div>
          
          <div className="flex items-center space-x-1">
            <button className="w-8 h-8 rounded-none border border-transparent hover:bg-gray-100 flex items-center justify-center text-gray-500 text-sm">
              &lt;
            </button>
            <button className="w-8 h-8 rounded-none bg-[#5542f6] text-white flex items-center justify-center text-sm font-bold shadow-sm">
              1
            </button>
            <button className="w-8 h-8 rounded-none border border-transparent hover:bg-gray-100 flex items-center justify-center text-gray-600 text-sm font-medium">
              2
            </button>
            <button className="w-8 h-8 rounded-none border border-transparent hover:bg-gray-100 flex items-center justify-center text-gray-600 text-sm font-medium">
              3
            </button>
            <button className="w-8 h-8 rounded-none border border-transparent hover:bg-gray-100 flex items-center justify-center text-gray-600 text-sm font-medium">
              4
            </button>
            <button className="w-8 h-8 rounded-none border border-transparent hover:bg-gray-100 flex items-center justify-center text-gray-600 text-sm font-medium">
              5
            </button>
            <span className="text-gray-400 px-1">...</span>
            <button className="w-8 h-8 rounded-none border border-transparent hover:bg-gray-100 flex items-center justify-center text-gray-600 text-sm font-medium">
              60
            </button>
            <button className="w-8 h-8 rounded-none border border-transparent hover:bg-gray-100 flex items-center justify-center text-gray-500 text-sm">
              &gt;
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
