import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Book, Users, UserCheck, CreditCard, 
  HardHat, AlertCircle, Mail, Plus, Search, ChevronRight,
  TrendingUp, Activity, User, Globe, FileText, FileSpreadsheet,
  FileIcon, Copy, Settings2, Eye, Edit, Trash2, Layers
} from 'lucide-react';
import { frontOfficeService } from '../../api/frontOfficeService';

const AdmissionEnquiries = () => {
  const navigate = useNavigate();

  const subNav = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/front-office/dashboard' },
    { name: 'Guide', icon: Book, path: '#' },
    { name: 'Admission Enquiries', icon: Users, path: '/front-office/admission-enquiries', active: true },
    { name: 'Visitor Book', icon: UserCheck, path: '/front-office/visitor-book' },
    { name: 'Gate Passes', icon: CreditCard, path: '/front-office/gate-passes' },
    { name: 'Campus Workers', icon: HardHat, path: '/front-office/campus-workers' },
    { name: 'Complaints', icon: AlertCircle, path: '/front-office/complaints' },
    { name: 'Postal Records', icon: Mail, path: '/front-office/postal-records' },
  ];

  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchEnquiries(); }, []);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const res = await frontOfficeService.getEnquiries();
      const data = (res.data || []).map(e => ({
        id: e._id,
        name: e.studentName || e.name || 'N/A',
        parentName: e.parentName || '-',
        phone: e.phone || '-',
        date: e.enquiryDate ? new Date(e.enquiryDate).toLocaleDateString('en-IN') : '-',
        nextFollowUp: e.nextFollowUp ? new Date(e.nextFollowUp).toLocaleDateString('en-IN') : '-',
        paymentInfo: 'N/A',
        status: e.status || 'Pending',
        statusColor: e.status === 'Followed-up' ? 'bg-[#17a2b8]' : e.status === 'Lost' ? 'bg-[#dc3545]' : 'bg-[#ffc107] text-gray-800'
      }));
      setEnquiries(data);
    } catch (err) {
      console.error('Enquiries error:', err);
      setEnquiries([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this enquiry?')) return;
    try {
      await frontOfficeService.deleteEnquiry(id);
      setEnquiries(enquiries.filter(e => e.id !== id));
    } catch (err) { alert('Delete failed!'); }
  };

  const handleEdit = (id) => navigate(`/front-office/admission-enquiries/edit/${id}`);

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
            onClick={() => navigate('/front-office/admission-enquiries/add')}
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
        
        <div className="flex justify-end mb-4">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-none text-[13px] font-bold hover:bg-gray-50 shadow-sm flex items-center gap-2">
            <Layers className="w-4 h-4" /> View all sessions
          </button>
        </div>

        {/* Enquiries Table Card */}
        <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
          
          <div className="p-4 border-b border-gray-200 bg-[#F8F7FF]">
            <h2 className="text-[14px] font-bold text-[#5F52FF] flex items-center gap-2">
              <Users className="w-4 h-4" /> All Enquiries — this session
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
                <button className="border border-gray-300 bg-white text-gray-600 px-3 py-1.5 rounded-none hover:bg-gray-50 text-[12px] font-bold flex items-center gap-1.5 shadow-sm" title="Copy">
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button className="border border-gray-300 bg-white text-gray-600 px-3 py-1.5 rounded-none hover:bg-gray-50 text-[12px] font-bold flex items-center gap-1.5 shadow-sm">
                  CSV
                </button>
                <button className="border border-gray-300 bg-white text-gray-600 px-3 py-1.5 rounded-none hover:bg-gray-50 text-[12px] font-bold flex items-center gap-1.5 shadow-sm">
                  Excel
                </button>
                <button className="border border-gray-300 bg-white text-gray-600 px-3 py-1.5 rounded-none hover:bg-gray-50 text-[12px] font-bold flex items-center gap-1.5 shadow-sm">
                  PDF
                </button>
                <button className="border border-gray-300 bg-white text-gray-600 px-3 py-1.5 rounded-none hover:bg-gray-50 text-[12px] font-bold flex items-center gap-1.5 shadow-sm">
                  <FileIcon className="w-3.5 h-3.5" />
                </button>
                <button className="border border-gray-300 bg-white text-gray-600 px-3 py-1.5 rounded-none hover:bg-gray-50 text-[12px] font-bold flex items-center gap-1.5 shadow-sm">
                  <Settings2 className="w-3.5 h-3.5" /> Columns
                </button>
              </div>
            </div>

            <div className="relative max-w-sm w-full md:w-auto">
              <input 
                type="text" 
                placeholder="Search enquiries..." 
                className="w-full md:w-64 border border-gray-300 rounded-none pl-3 pr-4 py-1.5 text-[13px] focus:outline-none focus:border-[#5F52FF]"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-[#f8f9fa] border-b border-gray-200 text-[#5F52FF]">
                  <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider text-center w-12 border-r border-gray-100">#</th>
                  <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider border-r border-gray-100">STUDENT NAME</th>
                  <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider border-r border-gray-100">PARENT NAME</th>
                  <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider border-r border-gray-100">PHONE</th>
                  <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider border-r border-gray-100">ENQUIRY DATE</th>
                  <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider border-r border-gray-100">FOLLOW-UP</th>
                  <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider text-center border-r border-gray-100">PAYMENT INFO</th>
                  <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider text-center border-r border-gray-100">STATUS</th>
                  <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="9" className="py-8 text-center text-gray-500 font-semibold">Loading enquiries from database...</td></tr>
                ) : enquiries.length === 0 ? (
                  <tr><td colSpan="9" className="py-8 text-center text-gray-400">No enquiries found.</td></tr>
                ) : enquiries.map((enq, index) => (
                  <tr key={enq.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 text-[13px] text-gray-500 text-center border-r border-gray-100">{index + 1}</td>
                    <td className="py-4 px-4 text-[13px] font-medium text-gray-800 border-r border-gray-100">{enq.name}</td>
                    <td className="py-4 px-4 text-[13px] text-gray-600 border-r border-gray-100">{enq.parentName}</td>
                    <td className="py-4 px-4 text-[13px] text-gray-600 border-r border-gray-100">{enq.phone}</td>
                    <td className="py-4 px-4 text-[13px] text-gray-600 border-r border-gray-100">{enq.date}</td>
                    <td className="py-4 px-4 text-[13px] text-gray-600 border-r border-gray-100">{enq.nextFollowUp}</td>
                    <td className="py-4 px-4 text-center border-r border-gray-100">
                      <span className="bg-gray-500 text-white text-[10px] font-bold px-2 py-1 rounded-none shadow-sm">
                        {enq.paymentInfo}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center border-r border-gray-100">
                      <span className={`${enq.statusColor} text-white text-[11px] font-bold px-2 py-1 rounded-none shadow-sm`}>
                        {enq.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex justify-center items-center gap-1.5">
                        <button 
                          onClick={() => navigate(`/front-office/admission-enquiries/view/${enq.id}`)}
                          className="bg-[#17a2b8] hover:bg-[#138496] text-white p-1.5 rounded-none shadow-sm transition-colors" title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => handleEdit(enq.id)}
                          className="bg-[#fd7e14] hover:bg-[#e86f0b] text-white p-1.5 rounded-none shadow-sm transition-colors" title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(enq.id)}
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

          <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-[#F8F7FF]">
            <span className="text-[12px] text-gray-500 font-medium">Showing 1-5 of 5</span>
            <div className="flex items-center gap-2">
              <button className="w-6 h-6 flex items-center justify-center text-gray-400 cursor-not-allowed">
                <ChevronRight className="w-4 h-4 rotate-180" />
              </button>
              <button className="w-7 h-7 flex items-center justify-center bg-[#5F52FF] text-white rounded-none text-[12px] font-bold shadow-sm">1</button>
              <button className="w-6 h-6 flex items-center justify-center text-gray-400 cursor-not-allowed">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdmissionEnquiries;
