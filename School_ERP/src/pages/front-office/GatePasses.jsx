import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Book, Users, UserCheck, CreditCard, 
  HardHat, AlertCircle, Mail, Plus, Search,
  FileIcon, Copy, Settings2, Eye, Printer, Layers, LogOut, ArrowRightLeft, CreditCard as TerminalIcon
} from 'lucide-react';

const GatePasses = () => {
  const navigate = useNavigate();

  const subNav = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/front-office/dashboard' },
    { name: 'Guide', icon: Book, path: '#' },
    { name: 'Admission Enquiries', icon: Users, path: '/front-office/admission-enquiries' },
    { name: 'Visitor Book', icon: UserCheck, path: '/front-office/visitor-book' },
    { name: 'Gate Passes', icon: CreditCard, path: '/front-office/gate-passes', active: true },
    { name: 'Campus Workers', icon: HardHat, path: '/front-office/campus-workers' },
    { name: 'Complaints', icon: AlertCircle, path: '/front-office/complaints' },
    { name: 'Postal Records', icon: Mail, path: '/front-office/postal-records' },
  ];

  const [activeTab, setActiveTab] = useState('All');

  // Mock data matching the screenshot
  const initialPasses = [
    { id: '1', passNo: 'GP/YIS/2026/00009', name: 'Ishaan Gupta', class: 'Nursery A', reason: 'Sick / unwell', out: '17 Aug, 02:21 PM', back: '--', status: 'Approved' },
    { id: '2', passNo: 'GP/YIS/2026/00008', name: 'Ishaan Gupta', class: 'Nursery A', reason: 'Doctor appointment', out: '11 Aug, 03:28 PM', back: '06:58 PM', status: 'Returned' },
    { id: '3', passNo: 'GP/YIS/2026/00007', name: 'Aarav Chaudhary', class: 'Class II A', reason: 'Parent pickup', out: '15 Aug, 07:41 PM', back: '--', status: 'Out' },
    { id: '4', passNo: 'GP/YIS/2026/00006', name: 'Aarav Chaudhary', class: 'Class II A', reason: 'Sick / unwell', out: '06 Aug, 10:16 PM', back: '10:11 PM', status: 'Returned' },
    { id: '5', passNo: 'GP/YIS/2026/00005', name: 'Kabir Desai', class: 'Class VII A', reason: 'Parent pickup', out: '05 Aug, 11:35 AM', back: '--', status: 'Out' },
    { id: '6', passNo: 'GP/YIS/2026/00004', name: 'Aarav Chaudhary', class: 'Class II A', reason: 'Sick / unwell', out: '04 Aug, 10:29 PM', back: '--', status: 'Out' },
    { id: '7', passNo: 'GP/YIS/2026/00001', name: 'Ishaan Gupta', class: 'Nursery A', reason: 'Parent pickup', out: '04 Aug, 10:18 PM', back: '--', status: 'Cancelled' },
    { id: '8', passNo: 'GP/YIS/2026/00002', name: 'Kabir Singh', class: 'Nursery A', reason: 'Sick / unwell', out: '04 Aug, 10:03 PM', back: '10:04 PM', status: 'Returned' },
    { id: '9', passNo: 'GP/YIS/2026/00001', name: 'Avani Verma', class: 'Class IV A', reason: 'Sick / unwell', out: '04 Aug, 10:04 PM', back: '11:12 PM', status: 'Returned' },
  ];

  const filteredPasses = activeTab === 'All' 
    ? initialPasses 
    : initialPasses.filter(p => p.status === activeTab);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved': return <span className="bg-[#17a2b8] text-white text-[11px] font-bold px-2 py-0.5 rounded-none shadow-sm">{status}</span>;
      case 'Returned': return <span className="bg-[#28a745] text-white text-[11px] font-bold px-2 py-0.5 rounded-none shadow-sm">{status}</span>;
      case 'Out': return <span className="bg-[#007bff] text-white text-[11px] font-bold px-2 py-0.5 rounded-none shadow-sm">{status}</span>;
      case 'Cancelled': return <span className="bg-[#dc3545] text-white text-[11px] font-bold px-2 py-0.5 rounded-none shadow-sm">{status}</span>;
      case 'Pending': return <span className="bg-[#ffc107] text-gray-900 text-[11px] font-bold px-2 py-0.5 rounded-none shadow-sm">{status}</span>;
      case 'Rejected': return <span className="bg-[#6c757d] text-white text-[11px] font-bold px-2 py-0.5 rounded-none shadow-sm">{status}</span>;
      case 'Expired': return <span className="bg-[#343a40] text-white text-[11px] font-bold px-2 py-0.5 rounded-none shadow-sm">{status}</span>;
      default: return <span className="bg-gray-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-none shadow-sm">{status}</span>;
    }
  };

  const handleExport = (type) => {
    alert(`Exporting data as ${type}...`);
  };

  return (
    <div className="flex flex-col h-full bg-[#f4f6f8] overflow-y-auto">
      
      {/* Header */}
      <div className="px-8 pt-6 pb-2 bg-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a2e]">Front Office Management</h1>
            <p className="text-[13px] text-gray-500 mt-1">Digitize reception activities, manage admission enquiries, and track visitor logs.</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => navigate('/front-office/gate-passes/terminal')}
              className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-none text-[13px] font-bold hover:bg-gray-50 shadow-sm flex items-center gap-2"
            >
              <TerminalIcon className="w-4 h-4" /> Gate Terminal
            </button>
            <button 
              onClick={() => navigate('/front-office/gate-passes/issue')}
              className="bg-[#5F52FF] text-white px-4 py-2 rounded-none text-[13px] font-bold hover:bg-[#4E41E6] shadow-sm flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Issue Gate Pass
            </button>
          </div>
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
        
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-none shadow-sm border border-gray-200 flex flex-col justify-center">
            <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Awaiting Approval</h3>
            <p className="text-2xl font-bold text-gray-800 mt-1">0</p>
          </div>
          <div className="bg-white p-4 rounded-none shadow-sm border border-gray-200 flex flex-col justify-center">
            <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Approved, Not Out</h3>
            <p className="text-2xl font-bold text-[#17a2b8] mt-1">1</p>
          </div>
          <div className="bg-white p-4 rounded-none shadow-sm border border-gray-200 flex flex-col justify-center">
            <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Currently Out</h3>
            <p className="text-2xl font-bold text-[#007bff] mt-1">3</p>
          </div>
          <div className="bg-white p-4 rounded-none shadow-sm border border-gray-200 flex flex-col justify-center">
            <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Issued Today</h3>
            <p className="text-2xl font-bold text-gray-800 mt-1">0</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-1 bg-white p-1 rounded-none border border-gray-200 shadow-sm">
            {['All', 'Pending', 'Approved', 'Rejected', 'Cancelled', 'Out', 'Returned', 'Expired'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 text-[12px] font-bold rounded-none transition-colors ${
                  activeTab === tab 
                    ? 'bg-[#5F52FF] text-white shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-none text-[13px] font-bold hover:bg-gray-50 shadow-sm flex items-center gap-2">
            <Layers className="w-4 h-4" /> View all sessions
          </button>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
          
          <div className="p-4 border-b border-gray-200 bg-[#F8F7FF]">
            <h2 className="text-[14px] font-bold text-[#5F52FF] flex items-center gap-2">
              <CreditCard className="w-4 h-4" /> Gate Pass Register — this session
            </h2>
          </div>

          <div className="p-4 border-b border-gray-100 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-[12px] text-gray-600">
                Show 
                <select className="border border-gray-300 rounded-none px-2 py-1 focus:outline-none focus:border-[#5F52FF]">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleExport('Copy')} className="border border-gray-300 bg-white text-gray-600 px-3 py-1.5 rounded-none hover:bg-gray-50 text-[12px] font-bold flex items-center gap-1.5 shadow-sm" title="Copy">
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleExport('CSV')} className="border border-gray-300 bg-white text-gray-600 px-3 py-1.5 rounded-none hover:bg-gray-50 text-[12px] font-bold flex items-center gap-1.5 shadow-sm">
                  CSV
                </button>
                <button onClick={() => handleExport('Excel')} className="border border-gray-300 bg-white text-gray-600 px-3 py-1.5 rounded-none hover:bg-gray-50 text-[12px] font-bold flex items-center gap-1.5 shadow-sm">
                  Excel
                </button>
                <button onClick={() => handleExport('PDF')} className="border border-gray-300 bg-white text-gray-600 px-3 py-1.5 rounded-none hover:bg-gray-50 text-[12px] font-bold flex items-center gap-1.5 shadow-sm">
                  PDF
                </button>
                <button onClick={() => handleExport('Print')} className="border border-gray-300 bg-white text-gray-600 px-3 py-1.5 rounded-none hover:bg-gray-50 text-[12px] font-bold flex items-center gap-1.5 shadow-sm">
                  <FileIcon className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleExport('Columns')} className="border border-gray-300 bg-white text-gray-600 px-3 py-1.5 rounded-none hover:bg-gray-50 text-[12px] font-bold flex items-center gap-1.5 shadow-sm">
                  <Settings2 className="w-3.5 h-3.5" /> Columns
                </button>
              </div>
            </div>

            <div className="relative max-w-sm w-full md:w-auto">
              <input 
                type="text" 
                placeholder="Search passes..." 
                className="w-full md:w-64 border border-gray-300 rounded-none pl-3 pr-4 py-1.5 text-[13px] focus:outline-none focus:border-[#5F52FF]"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-[#f8f9fa] border-b border-gray-200 text-[#5F52FF]">
                  <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider text-center w-12 border-r border-gray-100">#</th>
                  <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider border-r border-gray-100">PASS NO</th>
                  <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider border-r border-gray-100">NAME</th>
                  <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider border-r border-gray-100">REASON</th>
                  <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider border-r border-gray-100">OUT</th>
                  <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider border-r border-gray-100">BACK</th>
                  <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider border-r border-gray-100">STATUS</th>
                  <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredPasses.length > 0 ? filteredPasses.map((p, index) => (
                  <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-[13px] text-gray-500 text-center border-r border-gray-100">{index + 1}</td>
                    <td className="py-3 px-4 text-[13px] text-gray-800 border-r border-gray-100">{p.passNo}</td>
                    <td className="py-3 px-4 border-r border-gray-100">
                      <div className="text-[13px] font-bold text-gray-800">{p.name}</div>
                      <div className="text-[11px] text-gray-500 mt-0.5">{p.class}</div>
                    </td>
                    <td className="py-3 px-4 text-[13px] text-gray-600 border-r border-gray-100">{p.reason}</td>
                    <td className="py-3 px-4 text-[13px] text-gray-600 border-r border-gray-100">{p.out}</td>
                    <td className="py-3 px-4 text-[13px] text-gray-600 border-r border-gray-100">{p.back}</td>
                    <td className="py-3 px-4 border-r border-gray-100">
                      {getStatusBadge(p.status)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex justify-center items-center gap-1.5">
                        <button 
                          onClick={() => navigate(`/front-office/gate-passes/view/${p.id}`)}
                          className="bg-[#17a2b8] hover:bg-[#138496] text-white p-1 rounded-none shadow-sm transition-colors" title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        {(p.status === 'Approved' || p.status === 'Out') && (
                          <button 
                            onClick={() => {
                              const action = p.status === 'Approved' ? 'OUT' : 'RETURNED';
                              alert(`Student marked ${action} successfully!`);
                            }}
                            className={`${p.status === 'Approved' ? 'bg-[#fd7e14] hover:bg-[#e86f0b]' : 'bg-[#28a745] hover:bg-[#218838]'} text-white p-1 rounded-none shadow-sm transition-colors`} 
                            title={p.status === 'Approved' ? 'Mark Out' : 'Mark Returned'}
                          >
                            <LogOut className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button 
                          onClick={() => window.print()}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-1 rounded-none shadow-sm transition-colors border border-gray-200" title="Print"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="8" className="py-12 text-center text-[13px] text-gray-500">No gate passes found for this filter.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-white">
            <span className="text-[12px] text-gray-500 font-medium">Showing {filteredPasses.length > 0 ? '1' : '0'}-{filteredPasses.length} of {filteredPasses.length}</span>
            <div className="flex items-center gap-2">
              <button className="w-6 h-6 flex items-center justify-center text-gray-300 cursor-not-allowed">
                <span className="text-xl leading-none">&lsaquo;</span>
              </button>
              <button className="w-6 h-6 flex items-center justify-center bg-[#5F52FF] text-white rounded-none text-[12px] font-bold shadow-sm">1</button>
              <button className="w-6 h-6 flex items-center justify-center text-gray-300 cursor-not-allowed">
                <span className="text-xl leading-none">&rsaquo;</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default GatePasses;
