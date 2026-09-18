import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Book, Users, UserCheck, CreditCard, 
  HardHat, AlertCircle, Mail, Plus, Search,
  FileIcon, Copy, Settings2, Edit, Trash2, Layers
} from 'lucide-react';

const PostalRecords = () => {
  const navigate = useNavigate();

  const subNav = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/front-office/dashboard' },
    { name: 'Guide', icon: Book, path: '#' },
    { name: 'Admission Enquiries', icon: Users, path: '/front-office/admission-enquiries' },
    { name: 'Visitor Book', icon: UserCheck, path: '/front-office/visitor-book' },
    { name: 'Gate Passes', icon: CreditCard, path: '/front-office/gate-passes' },
    { name: 'Campus Workers', icon: HardHat, path: '/front-office/campus-workers' },
    { name: 'Complaints', icon: AlertCircle, path: '/front-office/complaints' },
    { name: 'Postal Records', icon: Mail, path: '/front-office/postal-records', active: true },
  ];

  const [records, setRecords] = useState([]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      setRecords(records.filter(r => r.id !== id));
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
          <button 
            onClick={() => navigate('/front-office/postal-records/add')}
            className="bg-[#5F52FF] text-white px-4 py-2 rounded-none text-[13px] font-bold hover:bg-[#4E41E6] shadow-sm flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Record
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
        
        <div className="flex justify-end mb-4">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-none text-[13px] font-bold hover:bg-gray-50 shadow-sm flex items-center gap-2">
            <Layers className="w-4 h-4" /> View all sessions
          </button>
        </div>

        {/* Records Table Card */}
        <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
          
          <div className="p-4 border-b border-gray-200 bg-[#F8F7FF]">
            <h2 className="text-[14px] font-bold text-[#5F52FF] flex items-center gap-2">
              <Mail className="w-4 h-4" /> All Postal Records — this session
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
                placeholder="Search postal records..." 
                className="w-full md:w-64 border border-gray-300 rounded-none pl-3 pr-4 py-1.5 text-[13px] focus:outline-none focus:border-[#5F52FF]"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-[#f8f9fa] border-b border-gray-200 text-[#5F52FF]">
                  <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider text-center w-12 border-r border-gray-100">#</th>
                  <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider border-r border-gray-100">TYPE</th>
                  <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider border-r border-gray-100">FROM</th>
                  <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider border-r border-gray-100">TO</th>
                  <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider border-r border-gray-100">REFERENCE NO.</th>
                  <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider border-r border-gray-100">DATE</th>
                  <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {records.length > 0 ? records.map((r, index) => (
                  <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 text-[13px] text-gray-500 text-center border-r border-gray-100">{index + 1}</td>
                    <td className="py-4 px-4 text-[13px] font-medium text-gray-800 border-r border-gray-100">{r.type}</td>
                    <td className="py-4 px-4 text-[13px] text-gray-600 border-r border-gray-100">{r.from}</td>
                    <td className="py-4 px-4 text-[13px] text-gray-600 border-r border-gray-100">{r.to}</td>
                    <td className="py-4 px-4 text-[13px] text-gray-600 border-r border-gray-100">{r.referenceNo}</td>
                    <td className="py-4 px-4 text-[13px] text-gray-600 border-r border-gray-100">{r.date}</td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex justify-center items-center gap-1.5">
                        <button 
                          onClick={() => navigate(`/front-office/postal-records/edit/${r.id}`)}
                          className="bg-[#fd7e14] hover:bg-[#e86f0b] text-white p-1.5 rounded-none shadow-sm transition-colors" title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(r.id)}
                          className="bg-[#dc3545] hover:bg-[#c82333] text-white p-1.5 rounded-none shadow-sm transition-colors" title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="7" className="py-12 text-center text-[13px] text-gray-500">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-white">
            <span className="text-[12px] text-gray-500 font-medium">No records</span>
            <div className="flex items-center gap-2">
              <button className="w-6 h-6 flex items-center justify-center text-gray-300 cursor-not-allowed">
                <span className="text-xl leading-none">&lsaquo;</span>
              </button>
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

export default PostalRecords;
