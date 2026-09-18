import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Book, Users, UserCheck, CreditCard, 
  HardHat, AlertCircle, Mail, Plus, Search,
  FileIcon, Copy, Settings2, Eye, Edit, Trash2, Layers,
  BookOpen
} from 'lucide-react';
import { frontOfficeService } from '../../api/frontOfficeService';

const VisitorBook = () => {
  const navigate = useNavigate();

  const subNav = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/front-office/dashboard' },
    { name: 'Guide', icon: Book, path: '#' },
    { name: 'Admission Enquiries', icon: Users, path: '/front-office/admission-enquiries' },
    { name: 'Visitor Book', icon: UserCheck, path: '/front-office/visitor-book', active: true },
    { name: 'Gate Passes', icon: CreditCard, path: '/front-office/gate-passes' },
    { name: 'Campus Workers', icon: HardHat, path: '/front-office/campus-workers' },
    { name: 'Complaints', icon: AlertCircle, path: '/front-office/complaints' },
    { name: 'Postal Records', icon: Mail, path: '/front-office/postal-records' },
  ];

  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchVisitors(); }, []);

  const fetchVisitors = async () => {
    try {
      setLoading(true);
      const res = await frontOfficeService.getVisitors();
      const data = (res.data || []).map(v => ({
        id: v._id,
        name: v.visitorName || v.name || 'N/A',
        badge: v.badge,
        phone: v.phone || '-',
        purpose: v.purpose || '-',
        inTime: v.inTime ? new Date(v.inTime).toLocaleString('en-IN') : '-',
        outTime: v.outTime ? new Date(v.outTime).toLocaleTimeString('en-IN') : (v.status === 'On Campus' ? 'On Campus' : '-'),
        outTimeBadge: v.status === 'On Campus'
      }));
      setVisitors(data);
    } catch (err) {
      console.error(err);
      setVisitors([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this visitor log?')) return;
    setVisitors(visitors.filter(v => v.id !== id));
  };

  const handleExport = (type) => alert(`Exporting as ${type}...`);

  const handleCheckOut = (id) => {
    setVisitors(visitors.map(v => v.id === id ? { ...v, outTime: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), outTimeBadge: false } : v));
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
            onClick={() => navigate('/front-office/visitor-book/add')}
            className="bg-[#5F52FF] text-white px-4 py-2 rounded-none text-[13px] font-bold hover:bg-[#4E41E6] shadow-sm flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> New Visitor
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

        {/* Visitor Table Card */}
        <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
          
          <div className="p-4 border-b border-gray-200 bg-[#F8F7FF]">
            <h2 className="text-[14px] font-bold text-[#5F52FF] flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> All Visitor Logs — this session
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
                placeholder="Search visitors..." 
                className="w-full md:w-64 border border-gray-300 rounded-none pl-3 pr-4 py-1.5 text-[13px] focus:outline-none focus:border-[#5F52FF]"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-[#f8f9fa] border-b border-gray-200 text-[#5F52FF]">
                  <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider text-center w-12 border-r border-gray-100">#</th>
                  <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider border-r border-gray-100">VISITOR NAME</th>
                  <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider border-r border-gray-100">PHONE</th>
                  <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider border-r border-gray-100">PURPOSE</th>
                  <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider border-r border-gray-100">IN-TIME</th>
                  <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider border-r border-gray-100">OUT-TIME</th>
                  <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="7" className="py-8 text-center text-gray-500 font-semibold">Loading visitor logs from database...</td></tr>
                ) : visitors.length === 0 ? (
                  <tr><td colSpan="7" className="py-8 text-center text-gray-400">No visitors recorded.</td></tr>
                ) : visitors.map((v, index) => (
                  <tr key={v.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 text-[13px] text-gray-500 text-center border-r border-gray-100">{index + 1}</td>
                    <td className="py-4 px-4 border-r border-gray-100">
                      <div className="text-[13px] font-medium text-gray-800">{v.name}</div>
                      {v.badge && (
                        <div className="mt-1">
                          <span className="bg-[#17a2b8] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">{v.badge}</span>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4 text-[13px] text-gray-600 border-r border-gray-100">{v.phone}</td>
                    <td className="py-4 px-4 text-[13px] text-gray-600 border-r border-gray-100">{v.purpose}</td>
                    <td className="py-4 px-4 text-[13px] text-gray-600 border-r border-gray-100">
                      {v.inTimeColor ? (
                        <div className="whitespace-pre-line text-[12px] text-orange-500 font-medium">{v.inTime}</div>
                      ) : (
                        v.inTime
                      )}
                    </td>
                    <td className="py-4 px-4 text-[13px] text-gray-600 border-r border-gray-100">
                      {v.outTimeBadge ? (
                        <span className="bg-[#17a2b8] text-white text-[11px] font-bold px-2 py-1 rounded">{v.outTime}</span>
                      ) : (
                        v.outTime
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex justify-center items-center gap-1.5">
                        <button 
                          onClick={() => navigate(`/front-office/visitor-book/view/${v.id}`)}
                          className="bg-[#17a2b8] hover:bg-[#138496] text-white p-1.5 rounded-none shadow-sm transition-colors" title="View"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => navigate(`/front-office/visitor-book/edit/${v.id}`)}
                          className="bg-[#fd7e14] hover:bg-[#e86f0b] text-white p-1.5 rounded-none shadow-sm transition-colors" title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        {v.outTimeBadge && (
                          <button 
                            onClick={() => handleCheckOut(v.id)}
                            className="bg-[#28a745] hover:bg-[#218838] text-white p-1.5 rounded-none shadow-sm transition-colors" title="Check-out"
                          >
                            <UserCheck className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button 
                          onClick={() => handleDelete(v.id)}
                          className="bg-[#dc3545] hover:bg-[#c82333] text-white p-1.5 rounded-none shadow-sm transition-colors" title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-white">
            <span className="text-[12px] text-gray-500 font-medium">Showing {visitors.length} records</span>
            <div className="flex items-center gap-2">
              <button className="w-6 h-6 flex items-center justify-center text-gray-400 cursor-not-allowed">
                <span className="text-xl leading-none">&lsaquo;</span>
              </button>
              <button className="w-7 h-7 flex items-center justify-center bg-[#5F52FF] text-white rounded-none text-[12px] font-bold shadow-sm">1</button>
              <button className="w-6 h-6 flex items-center justify-center text-gray-400 cursor-not-allowed">
                <span className="text-xl leading-none">&rsaquo;</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default VisitorBook;
