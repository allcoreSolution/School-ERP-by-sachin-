import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Users, Columns, Bell, Layers, Book, Search, Filter, Plus, Mail, Phone, MoreHorizontal } from 'lucide-react';

const AllLeads = () => {
  const navigate = useNavigate();

  const subNav = [
    { name: 'Dashboard', icon: TrendingUp, path: '/leads/dashboard' },
    { name: 'Pipeline Board', icon: Columns, path: '/leads/pipeline' },
    { name: 'All Leads', icon: Users, path: '/leads/all', active: true },
    { name: 'Follow-ups', icon: Bell, path: '/leads/follow-ups' },
    { name: 'Sources & Stages', icon: Layers, path: '/leads/sources-stages' },
    { name: 'Guide', icon: Book, path: '/leads/guide' },
  ];

  const leads = [
    { id: '1001', name: 'Aarav Sharma', guardian: 'Vivek Sharma', cls: 'Grade 1', source: 'Website', stage: 'New Enquiry', date: '21 Aug 2026', phone: '+91 9876543210', score: 30 },
    { id: '1002', name: 'Priya Patel', guardian: 'Sanjay Patel', cls: 'Grade 3', source: 'Walk-in', stage: 'Document Verification', date: '20 Aug 2026', phone: '+91 9876543211', score: 75 },
    { id: '1003', name: 'Rohan Gupta', guardian: 'Amit Gupta', cls: 'Grade 5', source: 'Facebook', stage: 'Contacted', date: '19 Aug 2026', phone: '+91 9876543212', score: 45 },
    { id: '1004', name: 'Ishita Singh', guardian: 'Rajesh Singh', cls: 'LKG', source: 'Google Ads', stage: 'Entrance Test', date: '18 Aug 2026', phone: '+91 9876543213', score: 85 },
    { id: '1005', name: 'Karan Malhotra', guardian: 'Vijay Malhotra', cls: 'Grade 9', source: 'Referral', stage: 'Lost / Rejected', date: '15 Aug 2026', phone: '+91 9876543214', score: 10 }
  ];

  const getStageColor = (stage) => {
    const map = {
      'New Enquiry': 'bg-slate-100 text-slate-700 border-slate-200',
      'Contacted': 'bg-blue-100 text-blue-700 border-blue-200',
      'Application Received': 'bg-purple-100 text-purple-700 border-purple-200',
      'Document Verification': 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200',
      'Entrance Test': 'bg-amber-100 text-amber-700 border-amber-200',
      'Lost / Rejected': 'bg-rose-100 text-rose-700 border-rose-200',
    };
    return map[stage] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <div className="flex flex-col h-full bg-[#f4f6f8] overflow-y-auto w-full">
      
      {/* Header */}
      <div className="px-8 pt-6 pb-2 bg-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a2e] flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-[#5F52FF]" /> Lead Management
            </h1>
            <p className="text-[13px] text-gray-500 mt-1">Capture every admission lead, work it through the pipeline, and convert the winners into students.</p>
          </div>
          <button 
            onClick={() => navigate('/leads/pipeline')}
            className="bg-[#5F52FF] text-white px-4 py-2 rounded-none text-[13px] font-bold hover:bg-[#4E41E6] shadow-sm flex items-center gap-2 transition-colors"
          >
            <Columns className="w-4 h-4" /> Pipeline Board
          </button>
        </div>
        
        {/* Sub Nav */}
        <div className="flex items-center gap-6 mt-6 overflow-x-auto border-b border-gray-200 pb-px">
          {subNav.map((item, index) => {
            const Icon = item.icon;
            return (
              <button 
                key={index}
                onClick={() => item.path !== '#' && navigate(item.path)}
                className={`flex items-center gap-2 pb-3 text-[12px] font-bold whitespace-nowrap border-b-2 transition-colors ${
                  item.active 
                    ? 'border-[#5F52FF] text-[#5F52FF]' 
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" /> {item.name}
              </button>
            )
          })}
        </div>
      </div>

      <div className="p-5 sm:p-8 w-full mx-auto flex flex-col gap-6 w-full">
        
        {/* Sub-page Title */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
             <Users className="w-5 h-5 text-[#5F52FF]" />
             <h2 className="text-xl font-bold text-[#1a1a2e]">All Leads (5)</h2>
          </div>
        </div>

        <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
            {/* Toolbar */}
            <div className="p-4 border-b border-gray-200 flex flex-wrap gap-3 justify-between items-center bg-gray-50/50">
                <div className="flex items-center gap-3 w-full max-w-sm relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3" />
                  <input type="text" placeholder="Search leads by name, phone, or guardian..." className="w-full pl-9 pr-4 py-2 rounded-none border border-gray-200 text-sm focus:outline-none focus:border-[#5F52FF]" />
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-none text-sm text-gray-600 font-medium hover:bg-gray-50"><Filter className="w-4 h-4"/> Filters (0)</button>
                </div>
            </div>

            {/* Table */}
            <div className="w-full overflow-x-auto bg-white p-4">
              <table className="w-full min-w-[900px] text-left text-[13px] border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-3 font-bold text-gray-700 border border-gray-300 bg-gray-100">ID</th>
                    <th className="py-2 px-3 font-bold text-gray-700 border border-gray-300 bg-gray-100">Lead Name</th>
                    <th className="py-2 px-3 font-bold text-gray-700 border border-gray-300 bg-gray-100">Class</th>
                    <th className="py-2 px-3 font-bold text-gray-700 border border-gray-300 bg-gray-100">Phone</th>
                    <th className="py-2 px-3 font-bold text-gray-700 border border-gray-300 bg-gray-100">Stage</th>
                    <th className="py-2 px-3 font-bold text-gray-700 border border-gray-300 bg-gray-100">Source</th>
                    <th className="py-2 px-3 font-bold text-gray-700 border border-gray-300 bg-gray-100 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="py-2 px-3 text-gray-600 font-medium border border-gray-300">#{lead.id}</td>
                      <td className="py-2 px-3 border border-gray-300">
                        <div className="font-bold text-gray-800">{lead.name}</div>
                        <div className="text-[11px] text-gray-500">{lead.guardian}</div>
                      </td>
                      <td className="py-2 px-3 font-medium text-gray-700 border border-gray-300">{lead.cls}</td>
                      <td className="py-2 px-3 text-gray-600 border border-gray-300">{lead.phone}</td>
                      <td className="py-2 px-3 border border-gray-300">
                        <span className={`px-2 py-0.5 rounded-none text-[11px] font-bold border ${getStageColor(lead.stage)}`}>
                          {lead.stage}
                        </span>
                      </td>
                      <td className="py-2 px-3 font-medium text-gray-600 border border-gray-300">{lead.source}</td>
                      <td className="py-2 px-3 border border-gray-300">
                        <div className="flex justify-end gap-1">
                           <button 
                             title={`Call ${lead.name}`}
                             onClick={() => window.location.href = `tel:${lead.phone}`}
                             className="w-6 h-6 rounded-none bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100 border border-green-200 transition-colors">
                             <Phone className="w-3.5 h-3.5"/>
                           </button>
                           <button 
                             title={`Email ${lead.name}`}
                             onClick={() => alert('Email functionality coming soon.')}
                             className="w-6 h-6 rounded-none bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 border border-blue-200 transition-colors">
                             <Mail className="w-3.5 h-3.5"/>
                           </button>
                           <button 
                             title="More Options"
                             onClick={() => alert(`View details for: ${lead.name}`)}
                             className="w-6 h-6 rounded-none bg-gray-50 text-gray-600 flex items-center justify-center hover:bg-gray-100 border border-gray-200 transition-colors">
                             <MoreHorizontal className="w-4 h-4"/>
                           </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="px-4 py-3 border-t border-gray-200 flex justify-between items-center text-[13px]">
              <span className="text-gray-500">Showing 1 to 5 of 5 entries</span>
              <div className="flex gap-1">
                <button className="px-3 py-1.5 border border-gray-200 rounded-none text-gray-400 bg-gray-50 cursor-not-allowed">Previous</button>
                <button className="px-3 py-1.5 border border-[#5F52FF] bg-[#5F52FF] text-white rounded">1</button>
                <button className="px-3 py-1.5 border border-gray-200 rounded-none text-gray-400 bg-gray-50 cursor-not-allowed">Next</button>
              </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default AllLeads;
