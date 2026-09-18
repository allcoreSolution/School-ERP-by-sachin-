import React, { useState } from 'react';
import { 
  LayoutDashboard, HelpCircle, Users, CalendarCheck, CheckCircle, List, Send, 
  IndianRupee, FileText, Calculator, CreditCard, Star, RefreshCw, CheckSquare, 
  Building, Briefcase, IdCard, Settings, MoreVertical, Plus, Edit2, Trash2,
  X, ListTodo
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HRAppraisalCriteria() {
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
    { name: 'Criteria', icon: CheckSquare, path: '/hr/appraisal-criteria', active: true },
    { name: 'Departments', icon: Building, path: '/hr/departments' },
    { name: 'Designations', icon: Briefcase, path: '/hr/designations' },
    { name: 'ID Cards', icon: IdCard, path: '/hr/id-cards' },
    { name: 'Settings', icon: Settings, path: '/hr/settings' },
  ];

  const [criteria, setCriteria] = useState([
    {
      id: 1,
      name: 'ganesh',
      description: 'asdfghj',
      category: 'fgdhf',
      sortOrder: '0',
      weight: '1',
      maxScore: '5',
      active: true
    },
    {
      id: 2,
      name: 'test',
      description: 'Test',
      category: 'test',
      sortOrder: '0',
      weight: '1',
      maxScore: '5',
      active: true
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'
  const [editingId, setEditingId] = useState(null);
  
  // Modal Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    sortOrder: '0',
    weight: '1',
    maxScore: '5',
    active: true
  });

  const handleDelete = (id) => {
    setCriteria(criteria.filter(c => c.id !== id));
  };

  const openNewModal = () => {
    setModalMode('create');
    setEditingId(null);
    setFormData({
      name: '',
      description: '',
      category: '',
      sortOrder: '0',
      weight: '1',
      maxScore: '5',
      active: true
    });
    setIsModalOpen(true);
  };

  const openEditModal = (criterion) => {
    setModalMode('edit');
    setEditingId(criterion.id);
    setFormData({
      name: criterion.name,
      description: criterion.description,
      category: criterion.category,
      sortOrder: criterion.sortOrder,
      weight: criterion.weight,
      maxScore: criterion.maxScore,
      active: criterion.active
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (modalMode === 'create') {
      const newCriterion = {
        id: Date.now(),
        ...formData
      };
      setCriteria([...criteria, newCriterion]);
    } else {
      setCriteria(criteria.map(c => {
        if (c.id === editingId) {
          return { ...c, ...formData };
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
        <h2 className="text-xl font-bold text-slate-800">Appraisal Criteria</h2>
        <button 
          onClick={openNewModal}
          className="bg-[#5F52FF] hover:bg-[#4f42e6] text-white px-5 py-2 rounded-none text-[14px] font-bold flex items-center gap-2 cursor-pointer shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Criterion
        </button>
      </div>

      {/* Main Content */}
      <div className="px-6 max-w-[1400px] mx-auto">
        <div className="bg-white border border-slate-200 rounded-none shadow-sm overflow-hidden">
          
          {/* Card Header */}
          <div className="px-5 py-4 border-b border-slate-200 flex items-center gap-2">
            <ListTodo className="w-4 h-4 text-[#5F52FF]" />
            <h2 className="text-[14px] font-bold text-slate-800">Rubric Items</h2>
          </div>
          
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-[#f8f9fc] border-b border-slate-200 text-[11px] font-bold text-[#5F52FF] uppercase tracking-wider">
                  <th className="p-4 w-12 text-center">#</th>
                  <th className="p-4">NAME</th>
                  <th className="p-4">CATEGORY</th>
                  <th className="p-4 text-center">WEIGHT</th>
                  <th className="p-4 text-center">MAX SCORE</th>
                  <th className="p-4 text-center">ACTIVE</th>
                  <th className="p-4 text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="text-[13px]">
                {criteria.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-500">No criteria found.</td>
                  </tr>
                ) : criteria.map((item) => (
                  <tr key={item.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                    <td className="p-4 text-center text-slate-400">{item.sortOrder}</td>
                    <td className="p-4">
                      <div className="font-bold text-slate-700">{item.name}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{item.description}</div>
                    </td>
                    <td className="p-4 text-slate-600 font-medium">{item.category}</td>
                    <td className="p-4 text-center text-[#5F52FF] font-bold">{item.weight}</td>
                    <td className="p-4 text-center text-slate-700 font-bold">{item.maxScore}</td>
                    <td className="p-4 text-center">
                      {item.active ? (
                        <span className="px-3 py-1 bg-[#ecfdf5] text-[#059669] rounded-none text-[11px] font-bold">Active</span>
                      ) : (
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-none text-[11px] font-bold">Inactive</span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center items-center gap-3">
                        <button 
                          onClick={() => openEditModal(item)}
                          className="text-slate-400 hover:text-[#5F52FF] transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
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
          <div className="bg-white rounded-none shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200">
              <h2 className="text-[18px] font-bold text-slate-800">
                {modalMode === 'create' ? 'Add Criterion' : 'Edit Criterion'}
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
                  Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] text-slate-700 focus:outline-none focus:border-[#5F52FF] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[12px] font-bold text-slate-800 mb-1.5">Description</label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] text-slate-700 focus:outline-none focus:border-[#5F52FF] transition-colors resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-[12px] font-bold text-slate-800 mb-1.5">Category</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Teaching"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] text-slate-700 focus:outline-none focus:border-[#5F52FF] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-slate-800 mb-1.5">Sort Order</label>
                  <input 
                    type="number" 
                    value={formData.sortOrder}
                    onChange={(e) => setFormData({...formData, sortOrder: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] text-slate-700 focus:outline-none focus:border-[#5F52FF] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-[12px] font-bold text-slate-800 mb-1.5">
                    Weight <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="number" 
                    value={formData.weight}
                    onChange={(e) => setFormData({...formData, weight: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] text-slate-700 focus:outline-none focus:border-[#5F52FF] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-slate-800 mb-1.5">
                    Max Score <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="number" 
                    value={formData.maxScore}
                    onChange={(e) => setFormData({...formData, maxScore: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] text-slate-700 focus:outline-none focus:border-[#5F52FF] transition-colors"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-3 cursor-pointer group w-fit">
                  <div className={`w-9 h-5 rounded-none flex items-center px-0.5 transition-colors ${formData.active ? 'bg-blue-500' : 'bg-slate-300'}`}>
                    <div className={`w-4 h-4 rounded-none bg-white transition-transform ${formData.active ? 'translate-x-4' : 'translate-x-0'}`}></div>
                  </div>
                  <span className="text-[13px] font-bold text-slate-800 group-hover:text-slate-900 transition-colors">
                    Active (included when generating appraisals)
                  </span>
                </label>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3 bg-slate-50/50">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-none text-[13.5px] font-bold hover:bg-slate-50 transition-colors bg-white"
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
