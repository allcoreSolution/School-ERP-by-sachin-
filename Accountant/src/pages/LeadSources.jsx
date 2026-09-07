import React from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';

const LeadSources = () => {
  return (
    <div className="min-h-screen bg-[#ecf0f5] text-[#333] p-4 sm:p-6 font-sans">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-[24px] font-bold text-[#333] mb-1">Lead Sources & Stages</h1>
          <p className="text-[13px] text-gray-500">Configure where your leads come from.</p>
        </div>
        <button className="bg-[#3c8dbc] hover:bg-[#367fa9] text-white px-4 py-1.5 rounded-[3px] text-[13px] font-semibold flex items-center gap-1 shadow-sm">
          <Plus className="w-4 h-4"/> Add Source
        </button>
      </div>

      <div className="bg-white rounded-[3px] border border-gray-200 shadow-sm max-w-4xl">
        <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-[#fefefe]">
          <h2 className="text-[16px] font-bold text-[#333]">All Lead Sources</h2>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f4f4f4] text-[#444] text-[12px] font-bold tracking-wide border-b border-gray-200">
              <th className="py-3 px-5 w-16">#</th>
              <th className="py-3 px-5">SOURCE NAME</th>
              <th className="py-3 px-5">DESCRIPTION</th>
              <th className="py-3 px-5 text-center">ACTION</th>
            </tr>
          </thead>
          <tbody className="text-[13px] text-[#333]">
            {['Direct Enquiry', 'Website Registration', 'Facebook Ads', 'Reference'].map((src, i) => (
              <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-5">{i+1}</td>
                <td className="py-3 px-5 font-semibold text-[#3c8dbc]">{src}</td>
                <td className="py-3 px-5 text-gray-500">Leads generated via {src.toLowerCase()}</td>
                <td className="py-3 px-5 text-center text-gray-400">
                  <Edit className="w-4 h-4 cursor-pointer hover:text-gray-700 inline mx-1" />
                  <Trash2 className="w-4 h-4 cursor-pointer hover:text-red-500 inline mx-1" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default LeadSources;
