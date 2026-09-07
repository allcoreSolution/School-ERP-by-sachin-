import React from 'react';
import { Users, Filter, PhoneCall, CheckCircle, Search, Edit, Trash2 } from 'lucide-react';

const LeadDashboard = () => {
  return (
    <div className="min-h-screen bg-[#ecf0f5] text-[#333] p-4 sm:p-6 font-sans">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-[24px] font-bold text-[#333] mb-1">Lead Dashboard</h1>
          <p className="text-[13px] text-gray-500">Overview of all prospective leads and inquiries.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { title: 'Total Leads', val: '432', color: 'bg-[#3c8dbc]', icon: Users },
          { title: 'New Leads', val: '24', color: 'bg-[#f39c12]', icon: Filter },
          { title: 'To Follow Up', val: '15', color: 'bg-[#dd4b39]', icon: PhoneCall },
          { title: 'Converted', val: '109', color: 'bg-[#00a65a]', icon: CheckCircle }
        ].map((item, idx) => (
          <div key={idx} className={`${item.color} text-white rounded-[3px] p-4 relative overflow-hidden shadow-sm h-[110px] flex items-center`}>
            <div className="relative z-10 w-full">
              <h3 className="text-[32px] font-bold leading-none mb-1">{item.val}</h3>
              <p className="text-[14px] font-medium opacity-90">{item.title}</p>
            </div>
            <item.icon className="absolute -right-2 -bottom-2 w-20 h-20 text-black/10 pointer-events-none" />
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[3px] border border-gray-200 shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-[#fefefe]">
          <h2 className="text-[16px] font-bold text-[#333]">Recent Inquiries</h2>
          <div className="relative w-64">
            <input type="text" placeholder="Search leads..." className="w-full border border-gray-200 rounded-[3px] pl-3 pr-10 py-1 text-[13px] focus:outline-none focus:border-[#3c8dbc]"/>
            <Search className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f4f4f4] text-[#444] text-[12px] font-bold tracking-wide border-b border-gray-200">
              <th className="py-3 px-5">LEAD NAME</th>
              <th className="py-3 px-5">PHONE / EMAIL</th>
              <th className="py-3 px-5">SOURCE</th>
              <th className="py-3 px-5">STATUS</th>
              <th className="py-3 px-5 text-center">ACTION</th>
            </tr>
          </thead>
          <tbody className="text-[13px] text-[#333]">
            <tr className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3 px-5 font-semibold text-[#3c8dbc]">Rahul Sharma</td>
              <td className="py-3 px-5">9876543210</td>
              <td className="py-3 px-5">Facebook Ads</td>
              <td className="py-3 px-5"><span className="bg-[#f39c12] text-white px-2 py-0.5 rounded-[3px] text-[11px]">New</span></td>
              <td className="py-3 px-5 text-center text-gray-400">
                <Edit className="w-4 h-4 cursor-pointer hover:text-gray-700 inline mx-1" />
                <Trash2 className="w-4 h-4 cursor-pointer hover:text-red-500 inline mx-1" />
              </td>
            </tr>
            <tr className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3 px-5 font-semibold text-[#3c8dbc]">Priya Singh</td>
              <td className="py-3 px-5">priya@email.com</td>
              <td className="py-3 px-5">Direct Enquiry</td>
              <td className="py-3 px-5"><span className="bg-[#00a65a] text-white px-2 py-0.5 rounded-[3px] text-[11px]">Converted</span></td>
              <td className="py-3 px-5 text-center text-gray-400">
                <Edit className="w-4 h-4 cursor-pointer hover:text-gray-700 inline mx-1" />
                <Trash2 className="w-4 h-4 cursor-pointer hover:text-red-500 inline mx-1" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default LeadDashboard;
