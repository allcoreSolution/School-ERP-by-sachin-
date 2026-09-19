import React, { useState } from 'react';
import { 
  LayoutDashboard, HelpCircle, Users, CalendarCheck, CheckCircle, List, Send, 
  IndianRupee, FileText, Calculator, CreditCard, Star, RefreshCw, CheckSquare, 
  Building, Briefcase, IdCard, Settings, Plus, Copy, FileSpreadsheet, FileIcon, 
  Printer, Columns, Search, Upload, Eye, Edit, Trash2, Users2, ChevronDown, MoreVertical
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { hrService } from '../../api/hrService';

export default function HRStaffDirectory() {
  const navigate = useNavigate();

  const tabs = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/hr/dashboard' },
    { name: 'Guide', icon: HelpCircle, path: '/hr/guide' },
    { name: 'Staff Directory', icon: Users, path: '/hr/staff', active: true },
    { name: 'Attendance', icon: CalendarCheck, path: '/hr/attendance' },
    { name: 'Approve Leave', icon: CheckCircle, path: '/hr/leaves/approve' },
    { name: 'Leave Types', icon: List, path: '/hr/leaves/types' },
    { name: 'Apply Leave', icon: Send, path: '/hr/leaves/apply' },
    { name: 'Set Salary', icon: IndianRupee, path: '/hr/salary/set' },
    { name: 'Salary Templates', icon: FileText, path: '/hr/salary/templates' },
    { name: 'Payroll', icon: Calculator, path: '/hr/payroll' },
    { name: 'Loans', icon: CreditCard, path: '/hr/manage-loans' },
    { name: 'Appraisals', icon: Star, path: '/hr/appraisals' },
    { name: 'Appraisal Cycles', icon: RefreshCw, path: '/hr/appraisal-cycles' },
    { name: 'Criteria', icon: CheckSquare, path: '/hr/appraisal-criteria' },
    { name: 'Departments', icon: Building, path: '/hr/departments' },
    { name: 'Designations', icon: Briefcase, path: '/hr/designations' },
    { name: 'ID Cards', icon: IdCard, path: '/hr/id-cards' },
    { name: 'Settings', icon: Settings, path: '/hr/settings' },
  ];

  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const res = await hrService.getStaff();
      if(res.data) {
        const mapped = res.data.map(s => ({
          id: s._id,
          name: (s.fullName || `${s.firstName || ''} ${s.lastName || ''}`).trim() || 'Unknown',
          email: s.email || 'N/A',
          role: s.role?.name || (typeof s.role === 'string' ? s.role : 'Staff'),
          designation: s.designation || 'Staff',
          phone: s.phone || '-'
        }));
        setStaffList(mapped);
      }
    } catch(err) {
      console.error(err);
      setStaffList([]);
    } finally {
      setLoading(false);
    }
  };

  const [showBulkUpload, setShowBulkUpload] = useState(false);

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this staff member?')) {
      try {
        await hrService.deleteStaff(id);
        setStaffList(staffList.filter(s => s.id !== id));
      } catch (err) {
        alert('Failed to delete staff member');
      }
    }
  };

  const handleGridAction = (action) => {
    alert(`Action "${action}" activated.`);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-10">
      
      {/* Header */}
      <div className="bg-white px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Human Resource</h1>
          <p className="text-[11px] text-slate-500 mt-1">Manage staff, attendance, leaves, payroll, and loans across the school.</p>
        </div>
        <button 
          onClick={() => navigate('/hr/staff/new')}
          className="px-4 py-2 bg-[#6f42c1] hover:bg-[#59339e] text-white font-bold text-[12px] rounded flex items-center gap-2 transition-colors shadow-sm cursor-pointer border-none"
        >
          <Plus className="w-4 h-4" /> Add Staff
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white px-6 border-b border-slate-200 flex items-center gap-4 lg:gap-6 text-[12px] font-bold">
        {tabs.slice(0, 13).map((tab) => (
          <button 
            key={tab.name}
            onClick={() => tab.path && navigate(tab.path)}
            className={`flex items-center gap-2 py-3 whitespace-nowrap cursor-pointer transition-colors ${
              tab.active 
                ? 'text-[#6f42c1] border-b-2 border-[#6f42c1]' 
                : 'text-slate-500 hover:text-slate-800 border-b-2 border-transparent'
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.name}
          </button>
        ))}

        {/* More Menu Dropdown */}
        <div className="relative group">
          <button className="flex items-center gap-2 py-3 whitespace-nowrap cursor-pointer text-slate-500 hover:text-slate-800 border-b-2 border-transparent transition-colors">
            <MoreVertical className="w-3.5 h-3.5" /> More Menu <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <div className="absolute right-0 top-full mt-0 w-48 bg-white border border-slate-200 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 py-1">
            {tabs.slice(13).map((tab) => (
              <button 
                key={tab.name}
                onClick={() => tab.path && navigate(tab.path)}
                className="w-full text-left px-4 py-2 flex items-center gap-2 text-[12px] text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <tab.icon className="w-3.5 h-3.5 text-slate-500" />
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 max-w-[1400px] mx-auto space-y-4">
        
        {/* Bulk Upload Dropdown (Top Right Corner inside main area) */}
        <div className="flex justify-end mb-2 relative">
          <button 
            onClick={() => setShowBulkUpload(!showBulkUpload)}
            className="px-4 py-1.5 bg-white border border-slate-300 text-slate-700 font-bold text-[12px] rounded flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" /> Bulk Upload <ChevronDown className="w-3.5 h-3.5" />
          </button>
          {showBulkUpload && (
            <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-slate-200 rounded shadow-lg z-10 py-1">
              <button className="w-full text-left px-4 py-2 text-[12px] text-slate-700 hover:bg-slate-50">Import CSV</button>
              <button className="w-full text-left px-4 py-2 text-[12px] text-slate-700 hover:bg-slate-50">Upload Photo Zip</button>
              <button className="w-full text-left px-4 py-2 text-[12px] text-slate-700 hover:bg-slate-50">Upload Document Zip</button>
            </div>
          )}
        </div>

        {/* Directory Card */}
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
          
          <div className="px-5 py-4 border-b border-slate-200 flex justify-between items-center">
            <h2 className="text-[14px] font-bold text-[#6f42c1] flex items-center gap-2">
              <Users2 className="w-4 h-4" /> All Staff
            </h2>
            <div className="flex gap-2">
              <button className="p-1.5 border border-[#6f42c1] text-[#6f42c1] rounded bg-purple-50"><List className="w-4 h-4" /></button>
              <button className="p-1.5 border border-slate-300 text-slate-500 rounded hover:bg-slate-50"><LayoutDashboard className="w-4 h-4" /></button>
            </div>
          </div>

          {/* Controls */}
          <div className="px-5 py-3 border-b border-slate-100 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-slate-500 font-bold">Show</span>
              <select className="px-2 py-1 border border-slate-300 rounded text-[12px] focus:outline-none">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              
              <div className="flex gap-1 ml-2">
                <button onClick={() => handleGridAction('Copy')} className="px-2.5 py-1 bg-white border border-slate-300 rounded hover:bg-slate-50 cursor-pointer" title="Copy"><Copy className="w-3.5 h-3.5 text-slate-600" /></button>
                <button onClick={() => handleGridAction('CSV')} className="px-3 py-1 bg-white border border-slate-300 rounded hover:bg-slate-50 cursor-pointer text-[11px] font-bold text-slate-600">CSV</button>
                <button onClick={() => handleGridAction('Excel')} className="px-3 py-1 bg-white border border-slate-300 rounded hover:bg-slate-50 cursor-pointer text-[11px] font-bold text-slate-600">Excel</button>
                <button onClick={() => handleGridAction('PDF')} className="px-3 py-1 bg-white border border-slate-300 rounded hover:bg-slate-50 cursor-pointer text-[11px] font-bold text-slate-600">PDF</button>
                <button onClick={() => handleGridAction('Print')} className="px-2.5 py-1 bg-white border border-slate-300 rounded hover:bg-slate-50 cursor-pointer" title="Print"><Printer className="w-3.5 h-3.5 text-slate-600" /></button>
                <button onClick={() => handleGridAction('Columns')} className="px-2.5 py-1 bg-white border border-slate-300 rounded hover:bg-slate-50 cursor-pointer flex items-center gap-1 text-[11px] font-bold text-slate-600"><Columns className="w-3 h-3" /> Columns <ChevronDown className="w-3 h-3" /></button>
              </div>
            </div>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2" />
              <input type="text" placeholder="Search staff..." className="pl-9 pr-3 py-1.5 border border-slate-300 rounded text-[12px] w-64 focus:outline-none focus:border-[#6f42c1]" />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-[#f8f5fd]">
                  <th className="px-5 py-3 text-[10px] font-bold text-[#6f42c1] uppercase tracking-wider">Name <span className="float-right font-normal">↑↓</span></th>
                  <th className="px-5 py-3 text-[10px] font-bold text-[#6f42c1] uppercase tracking-wider">Email <span className="float-right font-normal">↑↓</span></th>
                  <th className="px-5 py-3 text-[10px] font-bold text-[#6f42c1] uppercase tracking-wider">Role <span className="float-right font-normal">↑↓</span></th>
                  <th className="px-5 py-3 text-[10px] font-bold text-[#6f42c1] uppercase tracking-wider">Designation <span className="float-right font-normal">↑↓</span></th>
                  <th className="px-5 py-3 text-[10px] font-bold text-[#6f42c1] uppercase tracking-wider">Phone <span className="float-right font-normal">↑↓</span></th>
                  <th className="px-5 py-3 text-[10px] font-bold text-[#6f42c1] uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="text-[12px] text-slate-700 font-medium">
                {loading ? (
                  <tr><td colSpan="6" className="px-5 py-8 text-center text-slate-500 font-semibold bg-slate-50">Loading staff data...</td></tr>
                ) : staffList.length === 0 ? (
                  <tr><td colSpan="6" className="px-5 py-8 text-center text-slate-500 font-semibold bg-slate-50">No staff found on server. Add some staff to begin.</td></tr>
                ) : staffList.map((staff) => (
                  <tr key={staff.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-5 py-4">{staff.name}</td>
                    <td className="px-5 py-4 text-slate-500">{staff.email}</td>
                    <td className="px-5 py-4">{staff.role}</td>
                    <td className="px-5 py-4 text-slate-500">{staff.designation}</td>
                    <td className="px-5 py-4 text-slate-500">{staff.phone}</td>
                    <td className="px-5 py-4">
                      <div className="flex gap-1.5">
                        <button 
                          onClick={() => navigate(`/hr/staff/profile/${staff.id}`)}
                          className="w-7 h-7 flex items-center justify-center bg-[#17a2b8] text-white rounded-none hover:bg-[#138496] cursor-pointer" title="View Profile"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => navigate(`/hr/staff/edit/${staff.id}`)}
                          className="w-7 h-7 flex items-center justify-center bg-[#fd7e14] text-white rounded-none hover:bg-[#e86e0c] cursor-pointer" title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(staff.id)}
                          className="w-7 h-7 flex items-center justify-center bg-[#dc3545] text-white rounded-none hover:bg-[#c82333] cursor-pointer" title="Delete"
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

          {/* Footer */}
          <div className="px-5 py-3 border-t border-slate-200 flex justify-between items-center text-[11px] text-slate-500 font-bold">
            <div>Showing 1-{staffList.length} of {staffList.length}</div>
            <div className="flex gap-1">
              <button className="px-3 py-1 bg-white border border-slate-200 text-slate-400 rounded cursor-not-allowed">&lt;</button>
              <button className="px-3 py-1 bg-[#6f42c1] text-white rounded">1</button>
              <button className="px-3 py-1 bg-white border border-slate-200 text-slate-400 rounded cursor-not-allowed">&gt;</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
