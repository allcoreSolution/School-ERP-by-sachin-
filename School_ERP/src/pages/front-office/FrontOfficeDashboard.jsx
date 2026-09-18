import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Book, Users, UserCheck, CreditCard, 
  HardHat, AlertCircle, Mail, Plus, Search, ChevronRight,
  TrendingUp, Activity, User, Globe
} from 'lucide-react';

const FrontOfficeDashboard = () => {
  const navigate = useNavigate();

  const subNav = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/front-office/dashboard', active: true },
    { name: 'Guide', icon: Book, path: '#' },
    { name: 'Admission Enquiries', icon: Users, path: '/front-office/admission-enquiries' },
    { name: 'Visitor Book', icon: UserCheck, path: '/front-office/visitor-book' },
    { name: 'Gate Passes', icon: CreditCard, path: '/front-office/gate-passes' },
    { name: 'Campus Workers', icon: HardHat, path: '/front-office/campus-workers' },
    { name: 'Complaints', icon: AlertCircle, path: '/front-office/complaints' },
    { name: 'Postal Records', icon: Mail, path: '/front-office/postal-records' },
  ];

  const recentEnquiries = [
    { id: 1, name: 'stgunwrmki', class: 'Nursery', phone: '+1-927-460-2825', date: '11 Aug, 2026', nextFollowUp: '-', status: 'Followed up', statusColor: 'text-[#5F52FF]' },
    { id: 2, name: 'sxwwonoooj', class: 'Not Specified', phone: '+1-170-586-7156', date: '11 Aug, 2026', nextFollowUp: '-', status: 'Pending', statusColor: 'text-orange-400' },
    { id: 3, name: 'him', class: 'Class II', phone: '121212121212', date: '10 Aug, 2026', nextFollowUp: '-', status: 'Followed up', statusColor: 'text-[#5F52FF]', isHighlighted: true },
    { id: 4, name: 'Joan', class: 'Class I', phone: '231880055231', date: '06 Aug, 2026', nextFollowUp: '-', status: 'Lost', statusColor: 'text-red-500' },
    { id: 5, name: 'ytt', class: 'Nursery', phone: '6263056779', date: '05 May, 2026', nextFollowUp: '14 May, 2026', nextFollowUpColor: 'text-red-500 font-bold', status: 'Followed up', statusColor: 'text-[#5F52FF]' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#f4f6f8] overflow-y-auto">
      
      {/* Header */}
      <div className="px-8 pt-6 pb-2 bg-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a2e]">Front Office Management</h1>
            <p className="text-[13px] text-gray-500 mt-1">Digitize reception activities, manage admission enquiries, and track visitor logs.</p>
          </div>
          <button 
            onClick={() => navigate('/front-office/admission-enquiries')}
            className="bg-[#5F52FF] text-white px-4 py-2 rounded-none text-[13px] font-bold hover:bg-[#4E41E6] shadow-sm flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add New Enquiry
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

      <div className="p-8 w-full">
        
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          <div className="bg-white rounded-none shadow-sm border border-gray-100 p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-none bg-[#e8f0fe] flex items-center justify-center text-[#1a73e8] shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Total Enquiries</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-[#1a1a2e]">5</span>
                <span className="bg-[#e6f4ea] text-[#137333] text-[10px] font-bold px-1.5 py-0.5 rounded-none flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3" /> 12%
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-none shadow-sm border border-gray-100 p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-none bg-[#fce8e6] flex items-center justify-center text-[#d93025] shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Follow-ups Pending</p>
              <span className="text-2xl font-bold text-[#d93025]">1</span>
            </div>
          </div>

          <div className="bg-white rounded-none shadow-sm border border-gray-100 p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-none bg-[#e4f7fb] flex items-center justify-center text-[#129eaf] shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Source: Walk-in</p>
              <div className="text-2xl font-bold text-[#1a1a2e]">0 <span className="text-sm font-normal text-gray-400">(0%)</span></div>
            </div>
          </div>

          <div className="bg-white rounded-none shadow-sm border border-gray-100 p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-none bg-[#f3e8fd] flex items-center justify-center text-[#9334e6] shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Source: Online</p>
              <div className="text-2xl font-bold text-[#1a1a2e]">1 <span className="text-sm font-normal text-gray-400">(20%)</span></div>
            </div>
          </div>

        </div>

        {/* Recent Enquiries Table */}
        <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
          
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-[15px] font-bold text-[#1a1a2e] flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-gray-400" /> Recent Enquiries
            </h2>
            <div className="relative max-w-sm">
              <input 
                type="text" 
                placeholder="Filter enquiries..." 
                className="w-full border border-gray-300 rounded-none pl-9 pr-4 py-1.5 text-[13px] focus:outline-none focus:border-[#5F52FF]"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8f9fa] border-b border-gray-100">
                  <th className="py-3 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Student Name</th>
                  <th className="py-3 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="py-3 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="py-3 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Next Follow-up</th>
                  <th className="py-3 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="py-3 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentEnquiries.map((enq) => (
                  <tr key={enq.id} className={`border-b border-gray-50 hover:bg-gray-50 cursor-pointer ${enq.isHighlighted ? 'bg-[#fff4ed] hover:bg-[#ffeadd]' : 'bg-white'}`}>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-none bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center text-[12px] font-bold uppercase shrink-0">
                          {enq.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-[13px] font-bold text-gray-800">{enq.name}</div>
                          <div className="text-[11px] text-gray-400">{enq.class}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[13px] text-gray-600">{enq.phone}</td>
                    <td className="py-3 px-4 text-[13px] text-gray-600">{enq.date}</td>
                    <td className={`py-3 px-4 text-[13px] ${enq.nextFollowUpColor || 'text-gray-400'}`}>
                      {enq.nextFollowUp}
                    </td>
                    <td className={`py-3 px-4 text-[12px] font-semibold ${enq.statusColor}`}>
                      {enq.status}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button className="text-gray-400 hover:text-[#5F52FF]">
                        <ChevronRight className="w-5 h-5 inline-block" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-[12px] text-gray-500">Showing 1 to 5 of 5 entries</span>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-[12px] text-gray-400 cursor-not-allowed">Previous</button>
              <button className="w-6 h-6 flex items-center justify-center bg-[#5F52FF] text-white rounded-none text-[12px] font-bold">1</button>
              <button className="px-3 py-1 text-[12px] text-gray-400 cursor-not-allowed">Next</button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default FrontOfficeDashboard;
