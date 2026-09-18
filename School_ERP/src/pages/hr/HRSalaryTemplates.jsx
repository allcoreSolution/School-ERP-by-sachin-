import React from 'react';
import { 
  LayoutDashboard, HelpCircle, Users, CalendarCheck, CheckCircle, List, Send, 
  IndianRupee, FileText, Calculator, CreditCard, Star, RefreshCw, CheckSquare, 
  Building, Briefcase, IdCard, Settings, MoreVertical, Plus, Layers, Edit2, Trash2, 
  CheckCircle2, XCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HRSalaryTemplates() {
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
    { name: 'Salary Templates', icon: Layers, path: '/hr/salary-templates', active: true },
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

  const templates = [
    {
      id: 1,
      name: 'Senior Teacher',
      basic: '45,000.00',
      allowances: [{ name: 'HRA', amount: '5000' }],
      deductions: [{ name: 'Welfare Refund', amount: '100' }],
      statutory: [
        { name: 'PF (12.00%)', active: true },
        { name: 'ESI (0.75%)', active: true },
        { name: 'PT (Maharashtra)', active: true },
        { name: 'TDS (₹0.00)', active: false }
      ]
    },
    {
      id: 2,
      name: 'Senior Faculty (Grade 1)',
      basic: '35,000.00',
      allowances: [{ name: 'DA', amount: '4200' }, { name: 'TA', amount: '2000' }, { name: 'HRA', amount: '7000' }],
      deductions: [{ name: 'Welfare Fund', amount: '150' }],
      statutory: [
        { name: 'PF (12.00%)', active: true },
        { name: 'ESI (0.75%)', active: true },
        { name: 'PT (Maharashtra)', active: true },
        { name: 'TDS (₹0.00)', active: false }
      ]
    },
    {
      id: 3,
      name: 'Administrative Officer',
      basic: '25,000.00',
      allowances: [{ name: 'DA', amount: '3000' }, { name: 'HRA', amount: '5000' }, { name: 'Conveyance', amount: '1500' }],
      deductions: [{ name: 'Staff Association', amount: '100' }],
      statutory: [
        { name: 'PF (12.00%)', active: true },
        { name: 'ESI (0.75%)', active: true },
        { name: 'PT (Karnataka)', active: true },
        { name: 'TDS (₹0.00)', active: false }
      ]
    },
    {
      id: 4,
      name: 'Junior Assistant / Lab Staff',
      basic: '18,000.00',
      allowances: [{ name: 'DA', amount: '2160' }, { name: 'HRA', amount: '3600' }],
      deductions: [{ name: 'Welfare Fund', amount: '100' }],
      statutory: [
        { name: 'PF (12.00%)', active: true },
        { name: 'ESI (0.75%)', active: true },
        { name: 'PT (Telangana)', active: true },
        { name: 'TDS (₹0.00)', active: false }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-10 relative">
      
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-slate-200 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-[#1e293b]">Human Resource</h1>
          <p className="text-[13px] text-slate-500 mt-1">Manage staff, attendance, leaves, payroll, and loans across the school.</p>
        </div>
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
      <div className="px-6 py-4 flex justify-end">
        <button 
          onClick={() => navigate('/hr/salary-templates/create')}
          className="bg-[#5F52FF] hover:bg-[#4f42e6] text-white px-5 py-2 rounded-none text-[13px] font-bold flex items-center gap-2 cursor-pointer shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> Create Salary Template
        </button>
      </div>

      {/* Main Content */}
      <div className="px-6 max-w-[1400px] mx-auto">
        <div className="bg-white border border-slate-200 rounded-none shadow-sm overflow-hidden">
          
          {/* Card Header */}
          <div className="px-5 py-4 border-b border-slate-200 flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#5F52FF]" />
            <h2 className="text-[14px] font-bold text-slate-800">Pre-configured Salary Packages</h2>
          </div>
          
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-[#f8f9fc] border-b border-slate-200 text-[11px] font-bold text-[#5F52FF] uppercase tracking-wider">
                  <th className="p-4 w-12 text-center">#</th>
                  <th className="p-4">TEMPLATE NAME</th>
                  <th className="p-4">BASIC SALARY</th>
                  <th className="p-4">ALLOWANCES</th>
                  <th className="p-4">DEDUCTIONS</th>
                  <th className="p-4">STATUTORY SETTINGS</th>
                  <th className="p-4 text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="text-[12px]">
                {templates.map((template) => (
                  <tr key={template.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                    <td className="p-4 text-center text-slate-500 font-medium">{template.id}</td>
                    <td className="p-4 font-bold text-slate-700">{template.name}</td>
                    <td className="p-4 font-bold text-slate-800">₹{template.basic}</td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-2">
                        {template.allowances.map((allowance, idx) => (
                          <span key={idx} className="bg-[#ecfdf5] text-[#059669] px-2 py-0.5 rounded-none text-[11px] font-bold">
                            {allowance.name}: ₹{allowance.amount}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-2">
                        {template.deductions.map((deduction, idx) => (
                          <span key={idx} className="text-[#d97706] font-bold text-[11px]">
                            {deduction.name}: ₹{deduction.amount}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        {template.statutory.map((stat, idx) => (
                          <div key={idx} className="flex items-center gap-1.5">
                            {stat.active ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                            ) : (
                              <XCircle className="w-3.5 h-3.5 text-red-500" />
                            )}
                            <span className="text-slate-600 font-medium">{stat.name}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center items-center gap-3">
                        <button 
                          onClick={() => navigate(`/hr/salary-templates/edit/${template.id}`)}
                          className="text-slate-400 hover:text-[#5F52FF] transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="text-slate-400 hover:text-red-500 transition-colors">
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
    </div>
  );
}
