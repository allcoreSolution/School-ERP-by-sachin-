import React from 'react';
import { Plus } from 'lucide-react';

const LeadPipeline = () => {
  const columns = [
    { title: 'New Leads', color: 'border-t-[#f39c12]', items: ['Sanjana Verma', 'Aakash Tiwari', 'Kunal Shah'] },
    { title: 'Following Up', color: 'border-t-[#dd4b39]', items: ['Meera Rajput'] },
    { title: 'Application Sent', color: 'border-t-[#3c8dbc]', items: ['Rohit Kumar', 'Divya R'] },
    { title: 'Converted', color: 'border-t-[#00a65a]', items: ['Priya Singh', 'Amit Patel'] }
  ];

  return (
    <div className="min-h-screen bg-[#ecf0f5] text-[#333] p-4 sm:p-6 font-sans">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-[24px] font-bold text-[#333] mb-1">Lead Pipeline</h1>
          <p className="text-[13px] text-gray-500">Drag and manage lead stages across the board.</p>
        </div>
        <button className="bg-[#3c8dbc] hover:bg-[#367fa9] text-white px-4 py-1.5 rounded-[3px] text-[13px] font-semibold flex items-center gap-1 shadow-sm">
          <Plus className="w-4 h-4"/> Add Lead
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((col, i) => (
          <div key={i} className={`min-w-[280px] flex-1 bg-[#f9fafc] rounded-[3px] border border-gray-200 border-t-[3px] ${col.color} flex flex-col shadow-sm h-[75vh]`}>
            <div className="p-3 border-b border-gray-200 font-bold text-[14px] text-[#444] bg-white flex justify-between">
              {col.title} <span className="text-gray-400 font-normal">{col.items.length}</span>
            </div>
            <div className="p-2 flex-grow overflow-y-auto">
              {col.items.map((item, j) => (
                <div key={j} className="bg-white p-3 mb-2 rounded-[2px] shadow-sm border border-gray-200 text-[13px] cursor-grab hover:border-[#3c8dbc] transition-colors border-l-2 border-l-[#3c8dbc]">
                  <div className="font-semibold text-[#333]">{item}</div>
                  <div className="text-gray-500 text-[11px] mt-1 flex justify-between">
                    <span>Grade 5 Enquiry</span>
                    <span>Just Now</span>
                  </div>
                </div>
              ))}
              <div className="text-center py-2 text-gray-400 hover:text-gray-600 cursor-pointer text-[13px] transition-colors">
                + Add Card
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default LeadPipeline;
