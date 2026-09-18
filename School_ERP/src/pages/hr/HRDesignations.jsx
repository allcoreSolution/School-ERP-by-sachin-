import React, { useState } from 'react';
import HRTabs from '../../components/hr/HRTabs';
import { 
  LayoutDashboard, HelpCircle, Users, CalendarCheck, CheckCircle, List, Send, 
  IndianRupee, FileText, Calculator, CreditCard, Star, RefreshCw, CheckSquare, 
  Building, Briefcase, IdCard, Settings, MoreVertical, ChevronDown, 
  Plus, Edit2, Trash2, Shield, X, Save, Copy, Printer, LayoutGrid
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { exportToCSV, exportToExcel, exportToPDF, printTable } from '../../utils/exportUtils';

export default function HRDesignations() {
  const navigate = useNavigate();

  const tabs = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/hr/dashboard' },
    { name: 'Guide', icon: HelpCircle, path: '/hr/guide' },
    { name: 'Staff Directory', icon: Users, path: '/hr/staff' },
    { name: 'Attendance', icon: CalendarCheck, path: '/hr/attendance' },
    { name: 'Approve Leave', icon: CheckCircle, path: '/hr/approve-leave' },
    { name: 'Leave Types', icon: List, path: '/hr/leave-types' },
    { name: 'Apply Leave', icon: Send, path: '/hr/apply-leave' },
    { name: 'Set Salary', icon: IndianRupee, path: '/hr/set-salary' },
    { name: 'Salary Templates', icon: FileText, path: '/hr/salary-templates' },
    { name: 'Payroll', icon: Calculator, path: '/hr/payroll' },
    { name: 'Loans', icon: CreditCard, path: '/hr/manage-loans' },
    { name: 'Appraisals', icon: Star, path: '/hr/appraisals' },
    { name: 'Appraisal Cycles', icon: RefreshCw, path: '/hr/appraisal-cycles' },
    { name: 'Criteria', icon: CheckSquare, path: '/hr/appraisal-criteria' },
    { name: 'Departments', icon: Building, path: '/hr/departments' },
    { name: 'Designations', icon: Briefcase, path: '/hr/designations', active: true },
    { name: 'ID Cards', icon: IdCard, path: '/hr/id-cards' },
    { name: 'Settings', icon: Settings, path: '/hr/settings' },
  ];

  const [designations, setDesignations] = useState([
    { id: 1, name: 'HOD' },
    { id: 2, name: 'Staff' },
    { id: 3, name: 'Senior Teacher' },
    { id: 4, name: 'tes' },
    { id: 5, name: 'soni tiwari' },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({ id: null, name: '' });

  // EXPORT UTILS
  const exportHeaders = ['name'];
  const handleCSV = () => exportToCSV(exportHeaders, designations, 'designations.csv');
  const handleExcel = () => exportToExcel(exportHeaders, designations, 'designations.xls');
  const handlePDF = () => exportToPDF('Designations Report', exportHeaders, designations);
  const handlePrint = () => printTable('Designations Report', exportHeaders, designations);

  // CRUD ACTIONS
  const handleAddNew = () => {
    setFormData({ id: null, name: '' });
    setIsAddModalOpen(true);
  };

  const handleEdit = (designation) => {
    setFormData({ id: designation.id, name: designation.name });
    setIsEditModalOpen(true);
  };

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this designation?')) {
      setDesignations(designations.filter(d => d.id !== id));
    }
  };

  const handleSave = () => {
    if (!formData.name) {
      alert("Please enter a designation name");
      return;
    }
    const newDesig = {
      id: Date.now(),
      name: formData.name
    };
    setDesignations([...designations, newDesig]);
    setIsAddModalOpen(false);
  };

  const handleUpdate = () => {
    if (!formData.name) {
      alert("Please enter a designation name");
      return;
    }
    setDesignations(designations.map(d => d.id === formData.id ? { ...d, name: formData.name } : d));
    setIsEditModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-10 relative">
      
      {/* Header */}
      <div className="bg-white px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Human Resource</h1>
          <p className="text-[11px] text-slate-500 mt-1">Manage staff, attendance, leaves, payroll, and loans across the school.</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <HRTabs />

      <div className="p-6 max-w-[1400px] mx-auto">
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-slate-800">Designations</h1>
          <button 
            onClick={handleAddNew}
            className="bg-[#5F52FF] hover:bg-[#4f42e6] text-white px-4 py-2 rounded-none font-bold text-[13px] flex items-center gap-2 transition-colors cursor-pointer border-none shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add New Designation
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-none shadow-sm">
          <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#5F52FF]" />
              <h2 className="text-[15px] font-bold text-slate-800">Designations</h2>
            </div>
          </div>
          
          <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-[13px] text-slate-600">
              <span>Show</span>
              <select className="border border-slate-300 rounded-none px-2 py-1 focus:outline-none focus:border-[#5F52FF]">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              <div className="flex ml-2 gap-1">
                <button className="px-3 py-1 border border-slate-300 rounded-none bg-white hover:bg-slate-50 flex items-center justify-center cursor-pointer"><Copy className="w-3.5 h-3.5 text-slate-500" /></button>
                <button onClick={handleCSV} className="px-3 py-1 border border-slate-300 rounded-none bg-white hover:bg-slate-50 font-bold text-[12px] text-slate-600 cursor-pointer">CSV</button>
                <button onClick={handleExcel} className="px-3 py-1 border border-slate-300 rounded-none bg-white hover:bg-slate-50 font-bold text-[12px] text-slate-600 cursor-pointer">Excel</button>
                <button onClick={handlePDF} className="px-3 py-1 border border-slate-300 rounded-none bg-white hover:bg-slate-50 font-bold text-[12px] text-slate-600 cursor-pointer">PDF</button>
                <button onClick={handlePrint} className="px-3 py-1 border border-slate-300 rounded-none bg-white hover:bg-slate-50 flex items-center justify-center cursor-pointer"><Printer className="w-3.5 h-3.5 text-slate-500" /></button>
                <button className="px-3 py-1 border border-slate-300 rounded-none bg-white hover:bg-slate-50 font-bold text-[12px] text-slate-600 flex items-center gap-1 cursor-pointer"><LayoutDashboard className="w-3.5 h-3.5" /> Columns <ChevronDown className="w-3 h-3" /></button>
              </div>
            </div>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search designations..." 
                className="pl-3 pr-8 py-1.5 border border-slate-300 rounded-none text-[13px] w-[200px] focus:outline-none focus:border-[#5F52FF]"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50 text-[11px] font-bold text-[#5F52FF] uppercase tracking-wider">
                  <th className="px-5 py-3 w-16 cursor-pointer hover:bg-slate-100"># <span className="text-slate-300 ml-1">↑↓</span></th>
                  <th className="px-5 py-3 cursor-pointer hover:bg-slate-100 w-1/2">Name <span className="text-slate-300 ml-1">↑↓</span></th>
                  <th className="px-5 py-3 cursor-pointer hover:bg-slate-100 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-slate-700">
                {designations.map((designation, index) => (
                  <tr key={designation.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4">{index + 1}</td>
                    <td className="px-5 py-4">{designation.name}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-3">
                        <button onClick={() => handleEdit(designation)} className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer" title="Edit">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(designation.id)} className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {designations.length === 0 && (
                  <tr>
                    <td colSpan="3" className="px-5 py-8 text-center text-slate-500 text-[13px]">
                      No designations found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="px-5 py-3 border-t border-slate-200 flex items-center justify-between bg-slate-50/50">
            <div className="text-[12px] text-slate-500">
              Showing 1–{designations.length} of {designations.length}
            </div>
            <div className="flex items-center gap-1">
              <button className="w-7 h-7 flex items-center justify-center rounded-none border border-slate-200 bg-white text-slate-400 text-[12px]">«</button>
              <button className="w-7 h-7 flex items-center justify-center rounded-none bg-[#5F52FF] text-white text-[12px] font-bold shadow-sm">1</button>
              <button className="w-7 h-7 flex items-center justify-center rounded-none border border-slate-200 bg-white text-slate-400 text-[12px]">»</button>
            </div>
          </div>
        </div>

      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-none shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-[#007bff] px-5 py-3 flex items-center justify-between text-white">
              <h2 className="text-[16px] font-bold">Add New Designation</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-white/80 hover:text-white transition-colors cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 border-b border-slate-200">
              <label className="block text-[13px] font-bold text-slate-800 mb-2">Designation Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g., Principal"
                className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] text-slate-700 focus:outline-none focus:border-[#007bff]" 
              />
              <button 
                onClick={handleSave}
                className="mt-4 px-4 py-2 bg-[#5F52FF] hover:bg-[#4f42e6] text-white rounded-none font-bold text-[13px] flex items-center gap-2 transition-colors cursor-pointer border-none shadow-sm"
              >
                <Save className="w-4 h-4" /> Save Designation
              </button>
            </div>
            <div className="px-5 py-3 flex justify-end bg-slate-50">
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-1.5 bg-[#007bff] hover:bg-[#0069d9] text-white rounded-none font-bold text-[13px] transition-colors cursor-pointer border-none"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-none shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-[#007bff] px-5 py-3 flex items-center justify-between text-white">
              <h2 className="text-[16px] font-bold">Edit Designation</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="text-white/80 hover:text-white transition-colors cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 border-b border-slate-200">
              <label className="block text-[13px] font-bold text-slate-800 mb-2">Designation Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] text-slate-700 focus:outline-none focus:border-[#007bff]" 
              />
              <button 
                onClick={handleUpdate}
                className="mt-4 px-4 py-2 bg-[#5F52FF] hover:bg-[#4f42e6] text-white rounded-none font-bold text-[13px] flex items-center gap-2 transition-colors cursor-pointer border-none shadow-sm"
              >
                <Save className="w-4 h-4" /> Update Designation
              </button>
            </div>
            <div className="px-5 py-3 flex justify-end bg-slate-50">
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-1.5 bg-[#007bff] hover:bg-[#0069d9] text-white rounded-none font-bold text-[13px] transition-colors cursor-pointer border-none"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
