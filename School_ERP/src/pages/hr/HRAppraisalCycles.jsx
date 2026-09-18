import React, { useState } from 'react';
import { 
  LayoutDashboard, HelpCircle, Users, CalendarCheck, CheckCircle, List, Send, 
  IndianRupee, FileText, Calculator, CreditCard, Star, RefreshCw, CheckSquare, 
  Building, Briefcase, IdCard, Settings, MoreVertical, Plus, Calendar, Edit2, Trash2,
  Users as UsersIcon, X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HRAppraisalCycles() {
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
    { name: 'Appraisal Cycles', icon: RefreshCw, path: '/hr/appraisal-cycles', active: true },
    { name: 'Criteria', icon: CheckSquare, path: '/hr/appraisal-criteria' },
    { name: 'Departments', icon: Building, path: '/hr/departments' },
    { name: 'Designations', icon: Briefcase, path: '/hr/designations' },
    { name: 'ID Cards', icon: IdCard, path: '/hr/id-cards' },
    { name: 'Settings', icon: Settings, path: '/hr/settings' },
  ];

  const [cycles, setCycles] = useState([
    {
      id: 1,
      name: 'zxcvbnm',
      startDate: '2026-08-12',
      endDate: '2026-08-18',
      window: '12 Aug 2026 - 18 Aug 2026',
      status: 'Open',
      appraisals: 3
    },
    {
      id: 2,
      name: 'test',
      startDate: '2026-08-13',
      endDate: '2026-08-14',
      window: '13 Aug 2026 - 14 Aug 2026',
      status: 'Open',
      appraisals: 6
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'
  const [editingId, setEditingId] = useState(null);
  
  // Modal Form State
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    status: 'Open'
  });

  const handleDelete = (id) => {
    setCycles(cycles.filter(c => c.id !== id));
  };

  const openNewModal = () => {
    setModalMode('create');
    setEditingId(null);
    setFormData({ name: '', startDate: '', endDate: '', status: 'Open' });
    setIsModalOpen(true);
  };

  const openEditModal = (cycle) => {
    setModalMode('edit');
    setEditingId(cycle.id);
    setFormData({
      name: cycle.name,
      startDate: cycle.startDate,
      endDate: cycle.endDate,
      status: cycle.status
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    // Format date for display (dummy format logic)
    const formatDisplay = (d1, d2) => {
      if(!d1 || !d2) return 'TBD';
      return `${new Date(d1).toLocaleDateString('en-GB', {day: '2-digit', month: 'short', year: 'numeric'})} - ${new Date(d2).toLocaleDateString('en-GB', {day: '2-digit', month: 'short', year: 'numeric'})}`;
    };

    if (modalMode === 'create') {
      const newCycle = {
        id: Date.now(),
        name: formData.name,
        startDate: formData.startDate,
        endDate: formData.endDate,
        window: formatDisplay(formData.startDate, formData.endDate),
        status: formData.status,
        appraisals: 0
      };
      setCycles([...cycles, newCycle]);
    } else {
      setCycles(cycles.map(c => {
        if (c.id === editingId) {
          return {
            ...c,
            name: formData.name,
            startDate: formData.startDate,
            endDate: formData.endDate,
            window: formatDisplay(formData.startDate, formData.endDate),
            status: formData.status
          };
        }
        return c;
      }));
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-10 relative">
      
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-slate-200">
        <h1 className="text-xl font-bold text-[#1e293b]">Human Resource</h1>
        <p className="text-[13px] text-slate-500 mt-1">Manage staff, attendance, leaves, payroll, and loans across the school.</p>
      </div>

      {/* HR Tabs */}
      <div className="bg-white border-b border-slate-200 shadow-sm overflow-x-auto custom-scrollbar">
        <div className="flex px-6 gap-6 min-w-max">
          {tabs.slice(0, 11).map((tab) => (
            <button 
              key={tab.name}
              onClick={() => tab.path && navigate(tab.path)}
              className={`flex items-center gap-2 py-3 whitespace-nowrap cursor-pointer transition-colors ${
                tab.active 
                  ? 'text-[#5F52FF] border-b-2 border-[#5F52FF]' 
                  : 'text-slate-500 hover:text-slate-800 border-b-2 border-transparent'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span className="text-[13px] font-bold">{tab.name}</span>
            </button>
          ))}
          
          <div className="relative group flex items-center">
            <button className="flex items-center gap-2 py-3 text-[#5F52FF] font-bold transition-colors whitespace-nowrap cursor-pointer">
              <MoreVertical className="w-4 h-4" />
              <span className="text-[13px]">More Menu</span>
            </button>
            
            <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-none shadow-lg border border-slate-200 py-1 hidden group-hover:block z-50">
              {tabs.slice(11).map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => tab.path && navigate(tab.path)}
                  className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 cursor-pointer hover:bg-slate-50 ${
                    tab.active ? 'text-[#5F52FF] font-medium bg-slate-50' : 'text-slate-600'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="px-6 py-6 flex justify-between items-center max-w-[1400px] mx-auto">
        <h2 className="text-xl font-bold text-slate-800">Appraisal Cycles</h2>
        <button 
          onClick={openNewModal}
          className="bg-[#5F52FF] hover:bg-[#4f42e6] text-white px-5 py-2 rounded-none text-[14px] font-bold flex items-center gap-2 cursor-pointer shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> New Cycle
        </button>
      </div>

      {/* Main Content */}
      <div className="px-6 max-w-[1400px] mx-auto">
        <div className="bg-white border border-slate-200 rounded-none shadow-sm overflow-hidden">
          
          {/* Card Header */}
          <div className="px-5 py-4 border-b border-slate-200 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#5F52FF]" />
            <h2 className="text-[14px] font-bold text-slate-800">Review Windows</h2>
          </div>
          
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-[#f8f9fc] border-b border-slate-200 text-[11px] font-bold text-[#5F52FF] uppercase tracking-wider">
                  <th className="p-4 w-12 text-center">#</th>
                  <th className="p-4">NAME</th>
                  <th className="p-4">WINDOW</th>
                  <th className="p-4 text-center">STATUS</th>
                  <th className="p-4 text-center">APPRAISALS</th>
                  <th className="p-4 text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="text-[12.5px]">
                {cycles.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">No appraisal cycles found.</td>
                  </tr>
                ) : cycles.map((cycle, index) => (
                  <tr key={cycle.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                    <td className="p-4 text-center text-slate-400">{index + 1}</td>
                    <td className="p-4 font-bold text-slate-700">{cycle.name}</td>
                    <td className="p-4 text-slate-600">{cycle.window}</td>
                    <td className="p-4 text-center">
                      <span className={`px-3 py-1 rounded-none text-[11px] font-bold ${
                        cycle.status === 'Open' ? 'bg-[#ecfdf5] text-[#059669]' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {cycle.status}
                      </span>
                    </td>
                    <td className="p-4 text-center font-bold text-[#d97706]">
                      {cycle.appraisals}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center items-center gap-4">
                        <button className="text-slate-400 hover:text-slate-600 transition-colors tooltip-trigger relative group">
                          <UsersIcon className="w-4 h-4" />
                          <div className="absolute bottom-full mb-2 hidden group-hover:block bg-slate-800 text-white text-[10px] px-2 py-1 rounded-none whitespace-nowrap">View Appraisals</div>
                        </button>
                        <button 
                          onClick={() => openEditModal(cycle)}
                          className="text-slate-400 hover:text-[#5F52FF] transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(cycle.id)}
                          className="text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-none shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200">
              <h2 className="text-[18px] font-bold text-slate-800">
                {modalMode === 'create' ? 'New Cycle' : 'Edit Cycle'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-[12px] font-bold text-slate-800 mb-1.5">
                  Cycle Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] text-slate-700 focus:outline-none focus:border-[#5F52FF] transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-bold text-slate-800 mb-1.5">Start Date</label>
                  <div className="relative">
                    <input 
                      type="date" 
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] text-slate-700 focus:outline-none focus:border-[#5F52FF] transition-colors [&::-webkit-calendar-picker-indicator]:opacity-50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-slate-800 mb-1.5">End Date</label>
                  <div className="relative">
                    <input 
                      type="date" 
                      value={formData.endDate}
                      onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] text-slate-700 focus:outline-none focus:border-[#5F52FF] transition-colors [&::-webkit-calendar-picker-indicator]:opacity-50"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-slate-800 mb-1.5">
                  Status <span className="text-red-500">*</span>
                </label>
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] text-slate-700 focus:outline-none focus:border-[#5F52FF] transition-colors bg-white"
                >
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3 bg-slate-50/50">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-none text-[13.5px] font-bold hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="px-6 py-2 bg-[#5F52FF] hover:bg-[#4f42e6] text-white rounded-none text-[13.5px] font-bold shadow-sm transition-colors"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}
      
    </div>
  );
}
