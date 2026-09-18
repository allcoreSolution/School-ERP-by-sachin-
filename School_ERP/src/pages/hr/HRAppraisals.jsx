import React, { useState } from 'react';
import { 
  LayoutDashboard, HelpCircle, Users, CalendarCheck, CheckCircle, List, Send, 
  IndianRupee, FileText, Calculator, CreditCard, Star, RefreshCw, CheckSquare, 
  Building, Briefcase, IdCard, Settings, MoreVertical, Edit2, Zap, X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HRAppraisals() {
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
    { name: 'Appraisals', icon: Star, path: '/hr/appraisals', active: true },
    { name: 'Appraisal Cycles', icon: RefreshCw, path: '/hr/appraisal-cycles' },
    { name: 'Criteria', icon: CheckSquare, path: '/hr/appraisal-criteria' },
    { name: 'Departments', icon: Building, path: '/hr/departments' },
    { name: 'Designations', icon: Briefcase, path: '/hr/designations' },
    { name: 'ID Cards', icon: IdCard, path: '/hr/id-cards' },
    { name: 'Settings', icon: Settings, path: '/hr/settings' },
  ];

  const [appraisalList, setAppraisalList] = useState([
    {
      id: 1,
      staffName: 'Amit Sharma',
      designation: 'Senior Teacher',
      reviewer: 'Vikram Singh',
      status: 'Completed',
      score: '70.00%',
      grade: 'B'
    },
    {
      id: 2,
      staffName: 'Rajesh Kumar',
      designation: 'Staff',
      reviewer: 'Vikram Singh',
      status: 'In Review',
      score: '90.00%',
      grade: 'A+'
    },
    {
      id: 3,
      staffName: 'Vikram Singh',
      designation: 'Staff',
      reviewer: 'Vikram Singh',
      status: 'Pending',
      score: '-',
      grade: '-'
    }
  ]);

  const staffList = [
    'Amit Sharma', 'Rajesh Kumar', 'Vikram Singh', 'Sneha Desai', 
    'Accountant1', 'teacher2', 'Rajat kumar', 'Sourabh Banna', 'Sajjan Bhabha'
  ];

  const [selectedStaff, setSelectedStaff] = useState([]);
  const [reviewer, setReviewer] = useState('— Assign later —');
  const [cycle, setCycle] = useState('zxcvbnm');
  
  // Score Modal State
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const [scoringAppraisal, setScoringAppraisal] = useState(null);
  const [scoreInput, setScoreInput] = useState('');
  const [gradeInput, setGradeInput] = useState('');
  const [statusInput, setStatusInput] = useState('Completed');

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedStaff(staffList);
    } else {
      setSelectedStaff([]);
    }
  };

  const handleSelectStaff = (staff) => {
    if (selectedStaff.includes(staff)) {
      setSelectedStaff(selectedStaff.filter(s => s !== staff));
    } else {
      setSelectedStaff([...selectedStaff, staff]);
    }
  };

  const handleGenerate = () => {
    if (selectedStaff.length === 0) return;
    
    const newAppraisals = selectedStaff.map((staff, idx) => ({
      id: Date.now() + idx,
      staffName: staff,
      designation: staff === 'Amit Sharma' ? 'Senior Teacher' : 'Staff',
      reviewer: reviewer === '— Assign later —' ? 'Pending Assign' : reviewer,
      status: 'Pending',
      score: '-',
      grade: '-'
    }));

    setAppraisalList([...appraisalList, ...newAppraisals]);
    setSelectedStaff([]);
  };

  const openScoreModal = (appraisal) => {
    setScoringAppraisal(appraisal);
    setScoreInput(appraisal.score === '-' ? '' : appraisal.score.replace('%', ''));
    setGradeInput(appraisal.grade === '-' ? '' : appraisal.grade);
    setStatusInput(appraisal.status);
    setIsScoreModalOpen(true);
  };

  const handleSaveScore = () => {
    setAppraisalList(appraisalList.map(a => {
      if (a.id === scoringAppraisal.id) {
        return {
          ...a,
          score: scoreInput ? `${scoreInput}%` : '-',
          grade: gradeInput || '-',
          status: statusInput
        };
      }
      return a;
    }));
    setIsScoreModalOpen(false);
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

      {/* Main Content */}
      <div className="p-6 max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-6">
        
        {/* Left Column (Appraisals Table) */}
        <div className="flex-1 bg-white border border-slate-200 rounded-none shadow-sm overflow-hidden flex flex-col h-[700px]">
          <div className="px-5 py-4 border-b border-slate-200 flex justify-between items-center bg-white">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-[#5F52FF] fill-[#5F52FF]/20" />
              <h2 className="text-[14px] font-bold text-slate-800">Appraisals</h2>
            </div>
            <select className="px-3 py-1.5 border border-slate-300 rounded-none text-[12px] font-bold text-slate-700 bg-white focus:outline-none focus:border-[#5F52FF]">
              <option>zxcvbnm</option>
              <option>test</option>
            </select>
          </div>
          
          <div className="overflow-y-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-[#f8f9fc] z-10">
                <tr className="border-b border-slate-200 text-[11px] font-bold text-[#5F52FF] uppercase tracking-wider">
                  <th className="p-4">STAFF</th>
                  <th className="p-4">REVIEWER</th>
                  <th className="p-4 text-center">STATUS</th>
                  <th className="p-4 text-center">SCORE</th>
                  <th className="p-4 text-center">GRADE</th>
                  <th className="p-4 text-center">ACTION</th>
                </tr>
              </thead>
              <tbody className="text-[13px]">
                {appraisalList.map((item) => (
                  <tr key={item.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-slate-800">{item.staffName}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{item.designation}</div>
                    </td>
                    <td className="p-4 font-medium text-slate-700">{item.reviewer}</td>
                    <td className="p-4 text-center">
                      <span className={`px-3 py-1 rounded-none text-[11px] font-bold ${
                        item.status === 'Completed' ? 'bg-indigo-50 text-indigo-600' : 
                        item.status === 'In Review' ? 'bg-orange-50 text-orange-600' : 
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-center font-bold text-slate-700">{item.score}</td>
                    <td className="p-4 text-center font-bold text-slate-700">{item.grade}</td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => openScoreModal(item)}
                        className="bg-[#5F52FF] hover:bg-[#4f42e6] text-white px-4 py-1.5 rounded-none text-[12px] font-bold inline-flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                      >
                        <Edit2 className="w-3 h-3" /> Score
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column (Generate Appraisals) */}
        <div className="w-full lg:w-[380px] bg-white border border-slate-200 rounded-none shadow-sm flex flex-col h-[700px]">
          <div className="px-5 py-4 border-b border-slate-200 flex items-center gap-2 bg-white shrink-0">
            <Zap className="w-4 h-4 text-[#5F52FF] fill-[#5F52FF]/20" />
            <h2 className="text-[14px] font-bold text-slate-800">Generate Appraisals</h2>
          </div>
          
          <div className="p-5 flex-1 flex flex-col overflow-y-auto">
            <p className="text-[12px] text-slate-600 mb-6 font-medium">2 active criteria will be snapshotted onto each appraisal.</p>
            
            <div className="space-y-5 flex-1 flex flex-col">
              <div>
                <label className="block text-[12px] font-bold text-slate-800 mb-1.5">Cycle</label>
                <select 
                  value={cycle}
                  onChange={(e) => setCycle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] font-medium text-slate-700 focus:outline-none focus:border-[#5F52FF] bg-white"
                >
                  <option>zxcvbnm</option>
                  <option>test</option>
                </select>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-slate-800 mb-1.5">Reviewer (optional)</label>
                <select 
                  value={reviewer}
                  onChange={(e) => setReviewer(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] font-medium text-slate-700 focus:outline-none focus:border-[#5F52FF] bg-white"
                >
                  <option>— Assign later —</option>
                  <option>Vikram Singh</option>
                </select>
              </div>

              <div className="flex-1 flex flex-col min-h-0">
                <label className="block text-[12px] font-bold text-slate-800 mb-1.5">Staff to appraise</label>
                <div className="flex-1 border border-slate-300 rounded-none overflow-y-auto p-2 bg-white">
                  <label className="flex items-center gap-2 p-1.5 hover:bg-slate-50 cursor-pointer rounded">
                    <input 
                      type="checkbox" 
                      className="w-3.5 h-3.5 rounded-none border-slate-300 text-[#5F52FF] focus:ring-[#5F52FF] cursor-pointer"
                      checked={selectedStaff.length === staffList.length && staffList.length > 0}
                      onChange={handleSelectAll}
                    />
                    <span className="text-[12.5px] font-bold text-slate-800">Select all</span>
                  </label>
                  
                  {staffList.map((staff, idx) => (
                    <label key={idx} className="flex items-center gap-2 p-1.5 hover:bg-slate-50 cursor-pointer rounded-none mt-0.5">
                      <input 
                        type="checkbox" 
                        className="w-3.5 h-3.5 rounded-none border-slate-300 text-[#5F52FF] focus:ring-[#5F52FF] cursor-pointer"
                        checked={selectedStaff.includes(staff)}
                        onChange={() => handleSelectStaff(staff)}
                      />
                      <span className="text-[12.5px] text-slate-700 font-medium">{staff}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="pt-5 shrink-0">
              <button 
                onClick={handleGenerate}
                className="w-full bg-[#5F52FF] hover:bg-[#4f42e6] text-white py-2.5 rounded-none text-[13.5px] font-bold transition-colors shadow-sm cursor-pointer"
              >
                Generate Appraisals
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Score Modal */}
      {isScoreModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-none shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200">
              <h2 className="text-[18px] font-bold text-slate-800">Score Appraisal</h2>
              <button onClick={() => setIsScoreModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-[12px] font-bold text-slate-800 mb-1.5">Staff Name</label>
                <div className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-none text-[13.5px] text-slate-700 font-medium">
                  {scoringAppraisal?.staffName}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-bold text-slate-800 mb-1.5">Score (%)</label>
                  <input 
                    type="number" 
                    value={scoreInput} 
                    onChange={(e) => setScoreInput(e.target.value)} 
                    placeholder="e.g. 85" 
                    className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] text-slate-700 focus:outline-none focus:border-[#5F52FF]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-slate-800 mb-1.5">Grade</label>
                  <input 
                    type="text" 
                    value={gradeInput} 
                    onChange={(e) => setGradeInput(e.target.value)} 
                    placeholder="e.g. A" 
                    className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] text-slate-700 focus:outline-none focus:border-[#5F52FF]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-bold text-slate-800 mb-1.5">Status</label>
                <select 
                  value={statusInput} 
                  onChange={(e) => setStatusInput(e.target.value)} 
                  className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] text-slate-700 focus:outline-none focus:border-[#5F52FF] bg-white"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Review">In Review</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3 bg-slate-50/50">
              <button 
                onClick={() => setIsScoreModalOpen(false)} 
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-none text-[13.5px] font-bold hover:bg-slate-50 cursor-pointer bg-white"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveScore} 
                className="px-6 py-2 bg-[#5F52FF] hover:bg-[#4f42e6] text-white rounded-none text-[13.5px] font-bold shadow-sm cursor-pointer"
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
