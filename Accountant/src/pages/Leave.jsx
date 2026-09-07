import React from 'react';
import { NavLink } from 'react-router-dom';
import { HandCoins, Plus, CheckCircle2, PlaneTakeoff } from 'lucide-react';

const Leave = () => {
  return (
    <div className="min-h-screen bg-[#ecf0f5] text-[#333] p-4 sm:p-6 font-sans">
      
      {/* Header section */}
      <div className="mb-6">
        <h1 className="text-[22px] font-bold text-[#333] mb-1">Human Resource</h1>
        <p className="text-[13px] text-gray-500">Manage staff, attendance, leaves, payroll, and loans across the school.</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6 flex gap-6">
        <NavLink 
          to="/leave" 
          className="flex items-center gap-2 pb-3 px-1 text-[14px] font-medium text-[#5a52d7] border-b-2 border-[#5a52d7]"
        >
          <PlaneTakeoff className="w-4 h-4" />
          Apply Leave
        </NavLink>
        <NavLink 
          to="/loans" 
          className="flex items-center gap-2 pb-3 px-1 text-[14px] font-medium text-gray-500 hover:text-gray-700 transition-colors"
        >
          <HandCoins className="w-4 h-4" />
          Loans
        </NavLink>
      </div>

      {/* White Panel */}
      <div className="bg-white rounded-[3px] border border-gray-100 shadow-sm overflow-hidden">
        
        {/* Panel Header */}
        <div className="px-5 py-5 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-2">
            <PlaneTakeoff className="w-5 h-5 text-[#5a52d7]" />
            <h2 className="text-[16px] font-bold text-[#333]">My Leave Requests</h2>
          </div>
          <button className="bg-[#5a52d7] hover:bg-[#4a42c0] text-white px-5 py-2.5 rounded-[3px] flex items-center gap-2 text-[14px] font-medium transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            Apply For Leave
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f4f2ff] text-[#5a52d7] text-[11px] font-bold tracking-[0.5px] uppercase border-b border-t border-purple-100/50">
                <th className="py-4 px-5 w-12 text-center">#</th>
                <th className="py-4 px-5 border-l border-purple-100/60">Leave Type</th>
                <th className="py-4 px-5 border-l border-purple-100/60">Dates</th>
                <th className="py-4 px-5 border-l border-purple-100/60 text-center">Requested Days</th>
                <th className="py-4 px-5 border-l border-purple-100/60">Reason</th>
                <th className="py-4 px-5 border-l border-purple-100/60 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-[#333]">
              <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                <td className="py-5 px-5 text-center text-gray-500">1</td>
                <td className="py-5 px-5 border-l border-gray-100">
                  <div className="flex gap-2 items-center">
                    <span className="font-bold text-[#333]">Medical Leave</span>
                    <span className="bg-gray-100 text-gray-500 text-[11px] px-2 py-0.5 rounded-[3px]">Unpaid (LOP)</span>
                  </div>
                </td>
                <td className="py-5 px-5 border-l border-gray-100 text-[#555]">
                  04 Sep, 2026 - 04 Sep, 2026
                </td>
                <td className="py-5 px-5 border-l border-gray-100 text-center font-bold text-[#333]">
                  30.0
                </td>
                <td className="py-5 px-5 border-l border-gray-100 text-[#555]">
                  Not well
                </td>
                <td className="py-5 px-5 border-l border-gray-100 text-center">
                  <div className="inline-flex items-center gap-1 text-[#00a65a] font-bold text-[12px]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Approved
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  );
};

export default Leave;
