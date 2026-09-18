import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, Users, Bell, Layers, Book, Columns, Plus, LayoutDashboard, Search, X
} from 'lucide-react';

const PipelineBoard = () => {
  const navigate = useNavigate();
  const [showNewLeadModal, setShowNewLeadModal] = useState(false);

  const subNav = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/leads/dashboard' },
    { name: 'Pipeline Board', icon: Columns, path: '/leads/pipeline', active: true },
    { name: 'All Leads', icon: Users, path: '/leads/all' },
    { name: 'Follow-ups', icon: Bell, path: '/leads/follow-ups' },
    { name: 'Sources & Stages', icon: Layers, path: '/leads/sources-stages' },
    { name: 'Guide', icon: Book, path: '/leads/guide' },
  ];

  const columns = [
    { id: 'new', name: 'New Enquiry', color: 'bg-slate-500', count: 0, leads: [] },
    { 
      id: 'contacted', name: 'Contacted / Qualified', color: 'bg-[#3b82f6]', count: 1, 
      leads: [
        { id: 1, name: 'ytt', class: 'Nursery', phone: '6263056779', source: 'Walk-in' }
      ] 
    },
    { 
      id: 'app_received', name: 'Application Received', color: 'bg-[#8b5cf6]', count: 1, 
      leads: [
        { id: 2, name: 'Joan', class: 'Class I', phone: '231880055231', source: 'Website' }
      ] 
    },
    { 
      id: 'doc_verified', name: 'Document Verification', color: 'bg-[#a855f7]', count: 1, 
      leads: [
        { id: 3, name: 'stgunwrnki', class: 'Nursery', phone: '+1-927-460-2825', source: 'Website' }
      ] 
    },
    { id: 'entrance_test', name: 'Entrance Test', color: 'bg-[#f59e0b]', count: 0, leads: [] },
    { id: 'counselling', name: 'Counselling / Interview', color: 'bg-[#ec4899]', count: 0, leads: [] },
    { id: 'offer', name: 'Offer / Selected', color: 'bg-[#06b6d4]', count: 0, leads: [] },
  ];

  return (
    <div className="flex flex-col h-full bg-[#f4f6f8]">
      
      {/* Header */}
      <div className="px-8 pt-6 pb-2 bg-white shrink-0">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a2e] flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-[#5F52FF]" /> Lead Management
            </h1>
            <p className="text-[13px] text-gray-500 mt-1">Capture every admission lead, work it through the pipeline, and convert the winners into students.</p>
          </div>
          <button className="bg-[#5F52FF] text-white px-4 py-2 rounded-none text-[13px] font-bold hover:bg-[#4E41E6] shadow-sm flex items-center gap-2 transition-colors">
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

      <div className="p-4 w-full flex justify-end shrink-0">
        <button 
          onClick={() => setShowNewLeadModal(true)}
          className="bg-[#5F52FF] text-white px-4 py-2 rounded-none text-[13px] font-bold hover:bg-[#4E41E6] shadow-sm flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" /> New Lead
        </button>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden px-4 pb-4 select-none">
        <div className="flex gap-4 h-full">
          {columns.map(col => (
            <div key={col.id} className="bg-[#f8f9fa] border border-gray-200 rounded-none w-80 shrink-0 flex flex-col h-full shadow-sm">
              <div className="p-3 border-b border-gray-200 flex justify-between items-center bg-white rounded-t-lg shrink-0">
                <h3 className="text-[13px] font-bold text-gray-700 flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-none ${col.color}`}></div>
                  {col.name}
                </h3>
                <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-none">
                  {col.count}
                </span>
              </div>
              
              <div className="flex-1 p-3 overflow-y-auto space-y-3">
                {col.leads.length > 0 ? (
                  col.leads.map(lead => (
                    <div key={lead.id} className="bg-white p-3 rounded-none shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow">
                      <div className="font-bold text-[14px] text-gray-800 mb-2">{lead.name}</div>
                      <div className="text-[12px] text-gray-500 flex items-center gap-1.5 mb-2">
                        <Book className="w-3.5 h-3.5" /> {lead.class} 
                        <span className="mx-1">·</span> 
                        <span className="flex items-center gap-1">📞 {lead.phone}</span>
                      </div>
                      <div className="text-left mt-2">
                        <span className="text-[10px] font-bold text-[#8b5cf6] bg-purple-50 px-2 py-0.5 rounded-none border border-purple-100">
                          {lead.source}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="h-20 flex items-center justify-center text-[12px] text-gray-400">
                    No leads
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scrollbar instruction hint */}
      <div className="px-4 py-2 bg-gray-100 border-t border-gray-200 shrink-0 flex justify-center">
        <div className="w-1/2 h-2 bg-gray-300 rounded-none overflow-hidden">
          <div className="w-1/3 h-full bg-gray-500 rounded-none"></div>
        </div>
      </div>


      {/* New Lead Modal */}
      {showNewLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-none shadow-xl w-full max-w-md flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#5F52FF]" /> Create New Lead
              </h2>
              <button 
                onClick={() => setShowNewLeadModal(false)}
                className="text-gray-400 hover:text-gray-700 hover:bg-gray-200 p-1 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="px-6 py-6 space-y-4">
              <div>
                <label className="block text-[12px] font-bold text-gray-700 mb-1">Student Name <span className="text-red-500">*</span></label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-none text-[13px] focus:outline-none focus:border-[#5F52FF]" placeholder="e.g. Rahul Sharma" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1">Class/Grade <span className="text-red-500">*</span></label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-none text-[13px] focus:outline-none focus:border-[#5F52FF] bg-white">
                    <option value="">Select Class</option>
                    <option value="Nursery">Nursery</option>
                    <option value="LKG">LKG</option>
                    <option value="UKG">UKG</option>
                    <option value="Grade 1">Grade 1</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1">Source</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-none text-[13px] focus:outline-none focus:border-[#5F52FF] bg-white">
                    <option value="Website">Website</option>
                    <option value="Walk-in">Walk-in</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Referral">Referral</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-gray-700 mb-1">Parent Phone <span className="text-red-500">*</span></label>
                <input type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-none text-[13px] focus:outline-none focus:border-[#5F52FF]" placeholder="+91 9876543210" />
              </div>
              
              <div>
                <label className="block text-[12px] font-bold text-gray-700 mb-1">Initial Remarks</label>
                <textarea rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-none text-[13px] focus:outline-none focus:border-[#5F52FF] resize-none" placeholder="Any specific requirements or notes..."></textarea>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
              <button 
                onClick={() => setShowNewLeadModal(false)}
                className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-none text-[13px] font-bold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  alert('New Lead saved successfully!');
                  setShowNewLeadModal(false);
                }}
                className="px-4 py-2 bg-[#5F52FF] text-white rounded-none text-[13px] font-bold hover:bg-[#4E41E6] transition-colors shadow-sm"
              >
                Save Lead
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PipelineBoard;
