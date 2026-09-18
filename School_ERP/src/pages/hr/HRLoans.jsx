import React, { useState } from 'react';
import { 
  LayoutDashboard, HelpCircle, Users, CalendarCheck, CheckCircle, List, Send, 
  IndianRupee, FileText, Calculator, CreditCard, Star, RefreshCw, CheckSquare, 
  Building, Briefcase, IdCard, Settings, MoreVertical, ChevronDown, 
  Hourglass, CheckCircle2, History, CheckCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HRLoans() {
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
    { name: 'Loans', icon: CreditCard, path: '/hr/manage-loans', active: true },
    { name: 'Appraisals', icon: Star, path: '/hr/appraisals' },
    { name: 'Appraisal Cycles', icon: RefreshCw, path: '/hr/appraisal-cycles' },
    { name: 'Criteria', icon: CheckSquare, path: '/hr/appraisal-criteria' },
    { name: 'Departments', icon: Building, path: '/hr/departments' },
    { name: 'Designations', icon: Briefcase, path: '/hr/designations' },
    { name: 'ID Cards', icon: IdCard, path: '/hr/id-cards' },
    { name: 'Settings', icon: Settings, path: '/hr/settings' },
  ];

  const [activeSubTab, setActiveSubTab] = useState('Pending Reviews');

  const subTabs = [
    { name: 'Pending Reviews', icon: Hourglass, count: 0 },
    { name: 'Active Loans', icon: CheckCircle2, count: 1 },
    { name: 'All Records', icon: History, count: 2 },
  ];

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

      {/* Main Content */}
      <div className="p-6 max-w-[1400px] mx-auto">
        <div className="bg-white border border-slate-200 rounded-none shadow-sm min-h-[400px] flex flex-col">
          
          {/* Sub Tabs */}
          <div className="border-b border-slate-200 px-2 flex items-center">
            {subTabs.map(tab => (
              <button
                key={tab.name}
                onClick={() => setActiveSubTab(tab.name)}
                className={`px-4 py-3 flex items-center gap-2 text-[13px] font-bold border-b-2 transition-colors ${
                  activeSubTab === tab.name 
                    ? 'text-[#5F52FF] border-[#5F52FF]' 
                    : 'text-slate-500 border-transparent hover:text-slate-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.name}
                <span className={`px-1.5 py-0.5 rounded-none text-[10px] ${
                  tab.name === 'Pending Reviews' ? 'bg-orange-50 text-orange-600' :
                  tab.name === 'Active Loans' ? 'bg-green-50 text-green-600' :
                  'bg-slate-100 text-slate-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
          
          {/* Content Area */}
          <div className="flex-1 p-6">
            
            {activeSubTab === 'Pending Reviews' && (
              <div className="h-full flex flex-col items-center justify-center py-20 text-center">
                <div className="w-12 h-12 bg-[#5F52FF]/10 rounded-none flex items-center justify-center mb-4">
                  <CheckCheck className="w-6 h-6 text-[#5F52FF]" />
                </div>
                <h3 className="text-[14px] font-bold text-slate-800">Excellent! No pending loan reviews left.</h3>
              </div>
            )}
            
            {activeSubTab === 'Active Loans' && (
              <div>
                <h3 className="text-[15px] font-bold text-slate-800 mb-4">Active Loans (1)</h3>
                <div className="border border-slate-200 rounded-none overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[12px] font-bold text-slate-600 uppercase tracking-wider">
                        <th className="p-3">Staff Name</th>
                        <th className="p-3">Loan Amount</th>
                        <th className="p-3">EMI Amount</th>
                        <th className="p-3">Remaining Balance</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-[13px] text-slate-700">
                      <tr className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="p-3 font-medium">Rajesh Kumar</td>
                        <td className="p-3">₹50,000</td>
                        <td className="p-3">₹5,000 / month</td>
                        <td className="p-3 text-red-600 font-medium">₹20,000</td>
                        <td className="p-3">
                          <span className="px-2 py-1 bg-green-50 text-green-700 text-[11px] font-bold rounded">Active</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {activeSubTab === 'All Records' && (
              <div>
                <h3 className="text-[15px] font-bold text-slate-800 mb-4">All Loan Records (2)</h3>
                <div className="border border-slate-200 rounded-none overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[12px] font-bold text-slate-600 uppercase tracking-wider">
                        <th className="p-3">Staff Name</th>
                        <th className="p-3">Loan Amount</th>
                        <th className="p-3">Duration</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-[13px] text-slate-700">
                      <tr className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="p-3 font-medium">Rajesh Kumar</td>
                        <td className="p-3">₹50,000</td>
                        <td className="p-3">10 Months</td>
                        <td className="p-3">
                          <span className="px-2 py-1 bg-green-50 text-green-700 text-[11px] font-bold rounded">Active</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-medium">Sunita Sharma</td>
                        <td className="p-3">₹30,000</td>
                        <td className="p-3">6 Months</td>
                        <td className="p-3">
                          <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[11px] font-bold rounded">Completed</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
      
    </div>
  );
}
