import React from 'react';
import { Download, Award, GraduationCap, Megaphone, Bus, ArrowUpDown, Search } from 'lucide-react';

const EngagementAudit = () => {
  const auditData = [
    {
      id: "1.",
      school: "SUDHAKAR",
      subTitle: "",
      score: "55",
      status: "ACTIVE",
      statusClass: "bg-[#0d6efd] text-white",
      academic: "1",
      communications: "369",
      logistics: "18",
      activity: "Steady",
      activityColor: "text-[#0d6efd]",
      actions: "1 actions"
    },
    {
      id: "2.",
      school: "Risma high school",
      subTitle: "RIS1",
      score: "45",
      status: "ONBOARDING",
      statusClass: "bg-[#17a2b8] text-white",
      academic: "1",
      communications: "12",
      logistics: "18",
      activity: "Dormant",
      activityColor: "text-[#dc3545]",
      actions: "0 actions",
      alert: true
    },
    {
      id: "3.",
      school: "SSVP 3.0",
      subTitle: "",
      score: "30",
      status: "ONBOARDING",
      statusClass: "bg-[#17a2b8] text-white",
      academic: "1",
      communications: "0",
      logistics: "18",
      activity: "Dormant",
      activityColor: "text-[#dc3545]",
      actions: "0 actions",
      alert: true
    },
    {
      id: "4.",
      school: "Aksya School",
      subTitle: "",
      score: "10",
      status: "BASIC",
      statusClass: "bg-gray-500 text-white",
      academic: "0",
      communications: "0",
      logistics: "18",
      activity: "Dormant",
      activityColor: "text-[#dc3545]",
      actions: "0 actions",
      alert: true
    },
    {
      id: "5.",
      school: "CLOUDWAVE INTERNATIONAL SCHOOL",
      subTitle: "",
      score: "10",
      status: "BASIC",
      statusClass: "bg-gray-500 text-white",
      academic: "0",
      communications: "0",
      logistics: "18",
      activity: "Dormant",
      activityColor: "text-[#dc3545]",
      actions: "0 actions",
      alert: true
    }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto bg-[#f4f7fa] min-h-[calc(100vh-70px)] flex flex-col">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-[22px] font-semibold text-gray-800 tracking-tight">Module Engagement Audit</h1>
        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => alert("Initiating Audit CSV export...")}
            className="bg-[#28a745] hover:bg-[#218838] text-white px-4 py-2 rounded-[3px] text-[13.5px] font-bold shadow-sm flex items-center gap-2 transition-colors focus:ring-2 focus:ring-[#28a745]/50"
          >
            <Download className="w-4 h-4" /> Export Audit
          </button>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-[3px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 mb-6 flex-1 flex flex-col">
        
        {/* Card Header */}
        <div className="p-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[13.5px] font-bold text-[#1a2b4c] uppercase tracking-tight">
            <Award className="w-4.5 h-4.5 text-[#1a2b4c]" /> FEATURE ADOPTION &amp; AUDIT
          </div>
          <div className="bg-gray-50 border border-gray-200 text-gray-600 text-[11px] font-bold px-3 py-1.5 rounded-[3px] shadow-sm">
            Auditing 5 Institutions
          </div>
        </div>

        {/* Data Controls */}
        <div className="px-5 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[13px] text-gray-600">
            Show 
            <select className="border border-gray-300 rounded-[3px] px-2 py-1 focus:outline-none focus:border-[#fd7e14] bg-white">
              <option>25</option>
            </select>
            entries
          </div>
          <div className="flex items-center gap-2 text-[13px] text-gray-600">
            <span>Search Audit:</span>
            <input type="text" className="w-[200px] border border-gray-300 rounded-[3px] px-2.5 py-1 focus:outline-none focus:border-[#fd7e14]" />
          </div>
        </div>

        {/* Excel Styled Table */}
        <div className="overflow-x-auto w-full border-t border-gray-100">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="border-b border-gray-200 text-left text-[11px] font-bold text-gray-800 tracking-wider">
                <th className="border border-gray-200 py-3 px-3 w-[60px]">
                  <div className="flex items-center justify-between whitespace-nowrap"># <ArrowUpDown className="w-3 h-3 text-gray-300 ml-1" /></div>
                </th>
                <th className="border border-gray-200 py-3 px-3 w-[30%] min-w-[200px]">
                  <div className="flex items-center justify-between">Institution Name <ArrowUpDown className="w-3 h-3 text-gray-300 ml-1" /></div>
                </th>
                <th className="border border-gray-200 py-3 px-3 text-center">
                  <div className="flex items-center justify-center gap-1.5 whitespace-nowrap">Integration Score <ArrowUpDown className="w-3 h-3 text-gray-300" /></div>
                </th>
                <th className="border border-gray-200 py-3 px-3 text-center">
                  <div className="flex items-center justify-center gap-1.5 whitespace-nowrap">Status <ArrowUpDown className="w-3 h-3 text-gray-300" /></div>
                </th>
                <th className="border border-gray-200 py-3 px-3 text-center">
                  <div className="flex items-center justify-center gap-1.5 whitespace-nowrap">Academic <ArrowUpDown className="w-3 h-3 text-gray-300" /></div>
                </th>
                <th className="border border-gray-200 py-3 px-3 text-center">
                  <div className="flex items-center justify-center gap-1.5 whitespace-nowrap">Communication <ArrowUpDown className="w-3 h-3 text-gray-300" /></div>
                </th>
                <th className="border border-gray-200 py-3 px-3 text-center">
                  <div className="flex items-center justify-center gap-1.5 whitespace-nowrap">Logistics <ArrowUpDown className="w-3 h-3 text-gray-300" /></div>
                </th>
                <th className="border border-gray-200 py-3 px-3 text-center">
                  <div className="flex items-center justify-center gap-1.5 whitespace-nowrap">Recent Activity (30d) <ArrowUpDown className="w-3 h-3 text-gray-300" /></div>
                </th>
              </tr>
            </thead>
            <tbody className="text-[13px]">
              {auditData.map((row, i) => (
                <tr 
                  key={i} 
                  className={`border-b border-gray-200 transition-colors ${i % 2 !== 0 ? 'bg-[#fafbfc]' : 'bg-white'}`}
                >
                  <td className="border border-gray-200 py-3 px-3 text-gray-500 font-medium text-center whitespace-nowrap">{row.id}</td>
                  <td className="border border-gray-200 py-3 px-3 break-words">
                    <div className="font-bold text-gray-800 text-[13px] uppercase tracking-tight break-words">{row.school}</div>
                    {row.subTitle && <div className="text-[11px] text-gray-400 mt-0.5 uppercase tracking-wide break-words">{row.subTitle}</div>}
                  </td>
                  <td className="border border-gray-200 py-3 px-3 text-center font-bold text-gray-800 whitespace-nowrap">
                    {row.score}<span className="text-gray-400 font-normal">/100</span>
                  </td>
                  <td className="border border-gray-200 py-3 px-3 text-center whitespace-nowrap">
                    <span className={`inline-block px-2.5 py-1 rounded-[3px] text-[9.5px] font-bold tracking-widest uppercase shadow-sm ${row.statusClass}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="border border-gray-200 py-3 px-3 text-center font-bold text-gray-600 whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1.5"><GraduationCap className="w-4 h-4 text-[#0d6efd]" /> {row.academic}</div>
                  </td>
                  <td className="border border-gray-200 py-3 px-3 text-center font-bold text-gray-600 whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1.5"><Megaphone className="w-4 h-4 text-[#17a2b8]" /> {row.communications}</div>
                  </td>
                  <td className="border border-gray-200 py-3 px-3 text-center font-bold text-gray-600 whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1.5"><Bus className="w-4 h-4 text-gray-500" /> {row.logistics}</div>
                  </td>
                  <td className="border border-gray-200 py-3 px-3 text-center whitespace-nowrap">
                    <div className={`font-bold ${row.activityColor} flex items-center justify-center gap-1.5`}>
                      {row.alert && <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>}
                      {row.activity}
                    </div>
                    <div className="text-[11px] text-gray-400 font-medium mt-0.5">{row.actions}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="px-5 py-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4 mt-auto">
          <div className="text-[12.5px] text-gray-500 font-medium">Showing 1 to 5 of 5 entries</div>
          <div className="flex gap-1 text-[12.5px]">
            <button 
              onClick={() => alert("Previous page")}
              className="px-3 py-1.5 text-gray-500 hover:text-gray-800 font-medium transition-colors"
            >
              Prev
            </button>
            <button className="bg-[#5f52ff] text-white px-3 py-1.5 rounded-[3px] font-bold shadow-sm">1</button>
            <button 
              onClick={() => alert("Next page")}
              className="px-3 py-1.5 text-gray-500 hover:text-gray-800 font-medium transition-colors"
            >
              Next
            </button>
          </div>
        </div>

      </div>

      {/* Bottom KPI Bar */}
      <div className="bg-white rounded-[3px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 flex divide-x divide-gray-100 text-center uppercase tracking-widest text-[11px] font-bold">
        <div className="flex-1 p-5">
           <div className="text-[18px] text-[#28a745] font-bold mb-1">0</div>
           <div className="text-gray-500">Power Users</div>
        </div>
        <div className="flex-1 p-5">
           <div className="text-[18px] text-[#0d6efd] font-bold mb-1">1</div>
           <div className="text-gray-500">Active Schools</div>
        </div>
        <div className="flex-1 p-5">
           <div className="text-[18px] text-[#17a2b8] font-bold mb-1">2</div>
           <div className="text-gray-500">In Onboarding</div>
        </div>
        <div className="flex-1 p-5">
           <div className="text-[18px] text-[#dc3545] font-bold mb-1">2</div>
           <div className="text-gray-500">Risk of Churn</div>
        </div>
      </div>

    </div>
  );
};

export default EngagementAudit;
