import React from 'react';
import HRTabs from '../../components/hr/HRTabs';
import { 
  LayoutDashboard, HelpCircle, Users, CalendarCheck, CheckCircle, List, Send, 
  IndianRupee, FileText, Calculator, CreditCard, Star, RefreshCw, CheckSquare, 
  Building, Briefcase, IdCard, Settings, Plus, Users2, Hourglass, UserMinus, 
  Banknote, PieChart, Activity, Clock, Cake, Bell, Check, MoreVertical, ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HRDashboard() {
  const navigate = useNavigate();

  const tabs = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/hr/dashboard', active: true },
    { name: 'Guide', icon: HelpCircle, path: '/hr/guide' },
    { name: 'Staff Directory', icon: Users, path: '/hr/staff' },
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

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-10">
      
      {/* Header */}
      <div className="bg-white px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Human Resource</h1>
          <p className="text-[11px] text-slate-500 mt-1">Manage staff, attendance, leaves, payroll, and loans across the school.</p>
        </div>
        <button className="px-4 py-2 bg-[#6f42c1] hover:bg-[#59339e] text-white font-bold text-[12px] rounded-none flex items-center gap-2 transition-colors shadow-sm cursor-pointer border-none">
          <Plus className="w-4 h-4" /> Add Staff
        </button>
      </div>

      {/* Navigation Tabs */}
      <HRTabs />

      <div className="p-6 max-w-[1400px] mx-auto space-y-4">
        
        {/* KPI Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* TOTAL STAFF */}
          <div className="bg-white border border-slate-200 rounded-none p-5 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-none bg-blue-50 flex items-center justify-center shrink-0">
              <Users2 className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">TOTAL STAFF</div>
              <div className="text-2xl font-bold text-slate-800 leading-none mb-1">9</div>
              <div className="text-[11px] text-slate-400">3 depts · 5 roles</div>
            </div>
          </div>
          
          {/* PENDING LEAVES */}
          <div className="bg-white border-2 border-orange-300 rounded-none p-5 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-none bg-orange-50 flex items-center justify-center shrink-0">
              <Hourglass className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">PENDING LEAVES</div>
              <div className="text-2xl font-bold text-slate-800 leading-none mb-1">0</div>
              <div className="text-[11px] text-green-500 font-medium">All cleared</div>
            </div>
          </div>
          
          {/* ON LEAVE TODAY */}
          <div className="bg-white border border-slate-200 rounded-none p-5 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-none bg-red-50 flex items-center justify-center shrink-0">
              <UserMinus className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">ON LEAVE TODAY</div>
              <div className="text-2xl font-bold text-slate-800 leading-none mb-1">1</div>
              <div className="text-[11px] text-slate-400">0 present · 0 absent</div>
            </div>
          </div>
          
          {/* ACTIVE LOANS */}
          <div className="bg-white border border-slate-200 rounded-none p-5 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-none bg-green-50 flex items-center justify-center shrink-0">
              <Banknote className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">ACTIVE LOANS</div>
              <div className="text-2xl font-bold text-slate-800 leading-none mb-1">2</div>
              <div className="text-[11px] text-slate-400">₹15,833 outstanding</div>
            </div>
          </div>

        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          
          {/* Staff by Department (Pie Chart) */}
          <div className="bg-white border border-slate-200 rounded-none shadow-sm p-5 flex flex-col h-[300px]">
            <div className="flex items-center gap-2 mb-6">
              <PieChart className="w-4 h-4 text-slate-700" />
              <h2 className="text-[13px] font-bold text-slate-800">Staff by Department</h2>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center">
              {/* CSS Donut Chart representation */}
              <div className="relative w-40 h-40 rounded-none mb-6" style={{ background: 'conic-gradient(#007bff 0% 55%, #28a745 55% 70%, #fd7e14 70% 100%)' }}>
                <div className="absolute inset-0 m-auto w-20 h-20 bg-white rounded-none"></div>
              </div>
              <div className="flex gap-4 text-[11px] font-medium text-slate-600">
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-[#007bff] rounded-none"></div> Academic</div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-[#fd7e14] rounded-none"></div> Finance</div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-[#28a745] rounded-none"></div> Mathematics</div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white border border-slate-200 rounded-none shadow-sm p-5 lg:col-span-2 h-[300px] flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-slate-700" />
              <h2 className="text-[13px] font-bold text-slate-800">Recent Activity</h2>
            </div>
            <div className="flex-1 overflow-y-auto pr-2 space-y-4">
              
              <div className="flex justify-between items-start border-b border-slate-50 pb-3">
                <div className="flex gap-3">
                  <div className="mt-0.5"><div className="w-5 h-5 rounded-none bg-green-50 flex items-center justify-center"><Users className="w-3 h-3 text-green-500" /></div></div>
                  <div>
                    <div className="text-[13px] font-bold text-slate-700">Sajjan Bhabha</div>
                    <div className="text-[11px] text-slate-500">New staff added · Senior Teacher</div>
                  </div>
                </div>
                <div className="text-[11px] text-slate-400">8 hours ago</div>
              </div>

              <div className="flex justify-between items-start border-b border-slate-50 pb-3">
                <div className="flex gap-3">
                  <div className="mt-0.5"><div className="w-5 h-5 rounded-none bg-green-50 flex items-center justify-center"><Users className="w-3 h-3 text-green-500" /></div></div>
                  <div>
                    <div className="text-[13px] font-bold text-slate-700">Sourabh Banna</div>
                    <div className="text-[11px] text-slate-500">New staff added · Staff</div>
                  </div>
                </div>
                <div className="text-[11px] text-slate-400">11 hours ago</div>
              </div>

              <div className="flex justify-between items-start border-b border-slate-50 pb-3">
                <div className="flex gap-3">
                  <div className="mt-0.5"><div className="w-5 h-5 rounded-none bg-green-50 flex items-center justify-center"><Users className="w-3 h-3 text-green-500" /></div></div>
                  <div>
                    <div className="text-[13px] font-bold text-slate-700">Rajat kumar</div>
                    <div className="text-[11px] text-slate-500">New staff added · Staff</div>
                  </div>
                </div>
                <div className="text-[11px] text-slate-400">2 days ago</div>
              </div>
              
              <div className="flex justify-between items-start border-b border-slate-50 pb-3">
                <div className="flex gap-3">
                  <div className="mt-0.5"><div className="w-5 h-5 rounded-none bg-green-50 flex items-center justify-center"><CheckCircle className="w-3 h-3 text-green-500" /></div></div>
                  <div>
                    <div className="text-[13px] font-bold text-slate-700">Amit Sharma</div>
                    <div className="text-[11px] text-slate-500">Leave approved · 20 Aug - 29 Aug</div>
                  </div>
                </div>
                <div className="text-[11px] text-slate-400">3 days ago</div>
              </div>

            </div>
          </div>

        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          
          {/* Pending Leave Requests */}
          <div className="bg-white border border-slate-200 rounded-none shadow-sm p-5 min-h-[220px] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Hourglass className="w-4 h-4 text-slate-700" />
                <h2 className="text-[13px] font-bold text-slate-800">Pending Leave Requests</h2>
              </div>
              <a href="#" className="text-[11px] text-blue-500 hover:underline">View all</a>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 rounded-none bg-green-50 flex items-center justify-center mb-3">
                <Check className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-[13px] text-slate-400">No pending requests.</p>
            </div>
          </div>

          {/* Upcoming (30 days) */}
          <div className="bg-white border border-slate-200 rounded-none shadow-sm p-5 min-h-[220px]">
            <div className="flex items-center gap-2 mb-4">
              <Cake className="w-4 h-4 text-red-500" />
              <h2 className="text-[13px] font-bold text-slate-800">Upcoming (30 days)</h2>
            </div>
            <div className="space-y-4 mt-6">
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-none bg-red-50 flex items-center justify-center"><Cake className="w-3.5 h-3.5 text-red-500" /></div>
                  <div>
                    <div className="text-[13px] font-bold text-slate-700 leading-tight">Rajat kumar</div>
                    <div className="text-[10px] text-slate-400">Birthday</div>
                  </div>
                </div>
                <div className="text-[12px] text-slate-500 font-medium">28 Aug</div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-none bg-red-50 flex items-center justify-center"><Cake className="w-3.5 h-3.5 text-red-500" /></div>
                  <div>
                    <div className="text-[13px] font-bold text-slate-700 leading-tight">Vikram Singh</div>
                    <div className="text-[10px] text-slate-400">Birthday</div>
                  </div>
                </div>
                <div className="text-[12px] text-slate-500 font-medium">12 Sep</div>
              </div>

            </div>
          </div>

          {/* Operations */}
          <div className="bg-white border border-slate-200 rounded-none shadow-sm p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <List className="w-4 h-4 text-slate-700" />
                <h2 className="text-[13px] font-bold text-slate-800">Operations</h2>
              </div>
              <div className="space-y-3 mt-4">
                <div className="flex justify-between items-center text-[12px] font-bold">
                  <div className="flex items-center gap-2 text-slate-600">
                    <div className="w-2 h-2 rounded-none bg-purple-500"></div> Unpaid Payslips
                  </div>
                  <span className="text-slate-800">11</span>
                </div>
                <div className="flex justify-between items-center text-[12px] font-bold">
                  <div className="flex items-center gap-2 text-slate-600">
                    <div className="w-2 h-2 rounded-none bg-orange-400"></div> Unpaid Payroll Value
                  </div>
                  <span className="text-slate-800">₹0</span>
                </div>
                <div className="flex justify-between items-center text-[12px] font-bold">
                  <div className="flex items-center gap-2 text-slate-600">
                    <div className="w-2 h-2 rounded-none bg-green-500"></div> Attendance Marked Today
                  </div>
                  <span className="text-slate-800">1</span>
                </div>
                <div className="flex justify-between items-center text-[12px] font-bold">
                  <div className="flex items-center gap-2 text-slate-600">
                    <div className="w-2 h-2 rounded-none bg-slate-300"></div> Departments / Roles
                  </div>
                  <span className="text-slate-800">3 / 5</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2 mt-6">
              <button className="w-full py-2 bg-[#6f42c1] hover:bg-[#59339e] text-white font-bold text-[12px] rounded-none flex items-center justify-center gap-2 transition-colors cursor-pointer border-none shadow-sm">
                <FileText className="w-3.5 h-3.5" /> Run / View Payroll
              </button>
              <button className="w-full py-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-bold text-[12px] rounded-none flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm">
                <IdCard className="w-3.5 h-3.5 text-slate-500" /> Generate ID Cards
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
