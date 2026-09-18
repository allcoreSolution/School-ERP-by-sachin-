import React, { useState } from 'react';
import { 
  LayoutDashboard, HelpCircle, Users, CalendarCheck, CheckCircle, List, Send, 
  IndianRupee, FileText, Calculator, CreditCard, Star, RefreshCw, CheckSquare, 
  Building, Briefcase, IdCard, Settings, MoreVertical, ChevronDown, 
  Plus, Filter, RotateCcw, Search, Printer, Download, LayoutGrid, Image as ImageIcon, Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HRIdCards() {
  const navigate = useNavigate();

  const [activeSubTab, setActiveSubTab] = useState('Staff ID Cards');

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
    { name: 'Designations', icon: Briefcase, path: '/hr/designations' },
    { name: 'ID Cards', icon: IdCard, path: '/hr/id-cards', active: true },
    { name: 'Settings', icon: Settings, path: '/hr/settings' },
  ];

  const subTabs = [
    { name: 'Student ID Cards', icon: Users },
    { name: 'Staff ID Cards', icon: IdCard },
    { name: 'Card Designs', icon: LayoutGrid },
  ];

  const staffList = [
    { id: 1, name: 'Accountant1', staffId: 'V15AC1', dept: 'Finance', desig: 'Staff', phone: '6263056773', hasPhoto: true, photoColor: 'bg-blue-100' },
    { id: 2, name: 'Amit Sharma', staffId: 'STF-001', dept: 'Mathematics', desig: 'Senior Teacher', phone: '9876543210', hasPhoto: true, photoColor: 'bg-orange-100' },
    { id: 3, name: 'Rajat kumar', staffId: '6543', dept: 'Academic', desig: 'Staff', phone: '-', hasPhoto: false, initial: 'R' },
    { id: 4, name: 'Rajesh Kumar', staffId: 'STF-003', dept: 'Finance', desig: 'Staff', phone: '9876543212', hasPhoto: false, initial: 'R' },
    { id: 5, name: 'Sajan Bhabha', staffId: '23622566', dept: 'Academic', desig: 'Senior Teacher', phone: '-', hasPhoto: false, initial: 'S' },
    { id: 6, name: 'Sneha Desai', staffId: 'STF-004', dept: 'Academic', desig: 'Staff', phone: '9876543213', hasPhoto: false, initial: 'S' },
    { id: 7, name: 'Sourabh Banna', staffId: '2632565', dept: 'Academic', desig: 'Staff', phone: '-', hasPhoto: false, initial: 'S' },
    { id: 8, name: 'teacher2', staffId: '34134', dept: 'Academic', desig: 'Senior Teacher', phone: '-', hasPhoto: false, initial: 'T' },
    { id: 9, name: 'Vikram Singh', staffId: 'STF-005', dept: 'Academic', desig: 'Staff', phone: '9876543214', hasPhoto: false, initial: 'V' },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-20 relative">
      
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-slate-200">
        <h1 className="text-xl font-bold text-[#5F52FF] flex items-center gap-2">
          <IdCard className="w-6 h-6" /> ID Cards
        </h1>
        <p className="text-[13px] text-slate-500 mt-1">Print student and staff identity cards — pick people, pick a design, print the sheet.</p>
      </div>

      {/* HR Tabs */}
      <div className="bg-white border-b border-slate-200 shadow-sm overflow-x-auto custom-scrollbar">
        <div className="flex px-6 gap-6 min-w-max">
          {tabs.slice(0, 15).map((tab) => (
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
              {tab.name}
            </button>
          ))}
          
          <div className="relative group flex items-center">
            <button className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors whitespace-nowrap cursor-pointer">
              <MoreVertical className="w-4 h-4" />
              More
              <ChevronDown className="w-3 h-3" />
            </button>
            
            <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-none shadow-lg border border-slate-200 py-1 hidden group-hover:block z-50">
              {tabs.slice(15).map((tab) => (
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

      <div className="bg-white px-6 border-b border-slate-200 flex justify-between items-center">
        <div className="flex items-center gap-6 text-[13px] font-bold">
          {subTabs.map((tab) => (
            <button 
              key={tab.name}
              onClick={() => setActiveSubTab(tab.name)}
              className={`flex items-center gap-2 py-3 border-b-2 transition-colors cursor-pointer ${
                activeSubTab === tab.name 
                  ? 'text-[#5F52FF] border-[#5F52FF]' 
                  : 'text-slate-500 border-transparent hover:text-slate-800'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.name}
            </button>
          ))}
        </div>
        <button 
          onClick={() => navigate('/id-cards/templates')}
          className="bg-[#5F52FF] hover:bg-[#4f42e6] text-white px-4 py-1.5 rounded-none font-bold text-[13px] flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <Plus className="w-4 h-4" /> New Card Design
        </button>
      </div>

      <div className="p-6 max-w-full mx-auto space-y-6">
        
        {/* Select Criteria */}
        <div className="bg-white border border-slate-200 rounded-none shadow-sm">
          <div className="px-5 py-3 border-b border-slate-200 flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#5F52FF]" />
            <h2 className="text-[14px] font-bold text-slate-800">Select Criteria</h2>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-[12px] font-bold text-slate-700 mb-1">Role</label>
                <select className="w-full border border-slate-300 rounded-none px-3 py-2 text-[13px] text-slate-600 focus:outline-none focus:border-[#5F52FF]">
                  <option>-- All Roles --</option>
                  <option>Teaching Staff</option>
                  <option>Non-Teaching Staff</option>
                </select>
              </div>
              <div>
                <label className="block text-[12px] font-bold text-slate-700 mb-1">Department</label>
                <select className="w-full border border-slate-300 rounded-none px-3 py-2 text-[13px] text-slate-600 focus:outline-none focus:border-[#5F52FF]">
                  <option>-- All Departments --</option>
                  <option>Academic</option>
                  <option>Finance</option>
                </select>
              </div>
              <div>
                <label className="block text-[12px] font-bold text-slate-700 mb-1">Designation</label>
                <select className="w-full border border-slate-300 rounded-none px-3 py-2 text-[13px] text-slate-600 focus:outline-none focus:border-[#5F52FF]">
                  <option>-- All Designations --</option>
                  <option>Staff</option>
                  <option>Senior Teacher</option>
                </select>
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button className="px-4 py-2 border border-slate-300 rounded-none text-[13px] font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-2 cursor-pointer">
                <RotateCcw className="w-4 h-4" /> Reset
              </button>
              <button className="px-4 py-2 bg-[#5F52FF] hover:bg-[#4f42e6] text-white rounded-none text-[13px] font-bold flex items-center gap-2 shadow-sm cursor-pointer">
                <Search className="w-4 h-4" /> Search
              </button>
            </div>
          </div>
        </div>

        {/* Print Cards Section */}
        <div className="bg-white border border-slate-200 rounded-none shadow-sm">
          <div className="px-5 py-3 border-b border-slate-200 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Printer className="w-4 h-4 text-[#5F52FF]" />
              <h2 className="text-[14px] font-bold text-slate-800">Print Cards</h2>
            </div>
            <span className="bg-blue-100 text-[#007bff] text-[11px] font-bold px-2 py-0.5 rounded-none">0 selected</span>
          </div>

          <div className="p-5 flex flex-col lg:flex-row gap-6">
            
            {/* Left side: Setup */}
            <div className="flex-1 space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[12px] font-bold text-slate-700 mb-1">Card Design <span className="text-red-500">*</span></label>
                  <select className="w-full border border-slate-300 rounded-none px-3 py-2 text-[13px] text-slate-600 focus:outline-none focus:border-[#5F52FF]">
                    <option>-- Select a design --</option>
                    <option>Standard Staff ID</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-slate-700 mb-1">Print As</label>
                  <select className="w-full border border-slate-300 rounded-none px-3 py-2 text-[13px] text-slate-600 focus:outline-none focus:border-[#5F52FF]">
                    <option>Sheet of cards (many per page)</option>
                    <option>Single card per page</option>
                  </select>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-3 rounded-none flex items-center gap-3">
                <div className="w-8 h-4 bg-[#8b1a1a] rounded-none flex items-center px-0.5 cursor-pointer">
                  <div className="w-3 h-3 bg-white rounded-none"></div>
                </div>
                <div className="text-[13px]">
                  <span className="font-bold text-[#8b1a1a]">Archive a digital copy</span>
                  <span className="text-slate-500 ml-2">Saves an exact replica to the system for auditing and re-downloads.</span>
                </div>
              </div>

              <div className="border border-slate-200 rounded">
                <div className="px-4 py-2 border-b border-slate-200 flex items-center gap-2 bg-slate-50/50">
                  <LayoutGrid className="w-4 h-4 text-slate-600" />
                  <h3 className="text-[13px] font-bold text-slate-700">Print Layout — Sheet & Card Setup</h3>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-5 gap-4">
                    <div className="col-span-2">
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">Card Size</label>
                      <select className="w-full border border-slate-300 rounded-none px-2 py-1.5 text-[12px] text-slate-600">
                        <option>Use template size (not set — defaults to CR80 Portrait)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">Paper</label>
                      <select className="w-full border border-slate-300 rounded-none px-2 py-1.5 text-[12px] text-slate-600">
                        <option>A4 (210 × 297 mm)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">Sheet Orientation</label>
                      <select className="w-full border border-slate-300 rounded-none px-2 py-1.5 text-[12px] text-slate-600">
                        <option>Portrait</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-1">Margin (mm)</label>
                        <input type="number" defaultValue={10} className="w-full border border-slate-300 rounded-none px-2 py-1.5 text-[12px] text-slate-600" />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-1">Gap (mm)</label>
                        <input type="number" defaultValue={3} className="w-full border border-slate-300 rounded-none px-2 py-1.5 text-[12px] text-slate-600" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex flex-col gap-2">
                    <label className="flex items-center gap-2 text-[12px] text-slate-700 font-bold cursor-pointer">
                      <input type="checkbox" className="accent-[#007bff] w-3.5 h-3.5" defaultChecked /> Cut marks
                    </label>
                    <label className="flex items-center gap-2 text-[12px] text-slate-700 font-bold cursor-pointer">
                      <input type="checkbox" className="accent-[#007bff] w-3.5 h-3.5" defaultChecked /> Align center
                    </label>
                    <label className="flex items-center gap-2 text-[12px] text-slate-400 font-bold cursor-pointer">
                      <input type="checkbox" className="accent-[#007bff] w-3.5 h-3.5" disabled /> Cut & stack order
                    </label>
                  </div>
                  
                  <p className="text-[11px] text-slate-500 mt-4 flex items-center gap-1">
                    <span className="w-3 h-3 rounded-none bg-slate-200 text-slate-500 flex items-center justify-center text-[8px] font-bold">i</span>
                    Cards are tiled edge-accurate on the sheet at the physical size above; content auto-scales to fit each card.
                  </p>
                </div>
              </div>
            </div>

            {/* Right side: Preview */}
            <div className="w-full lg:w-[400px]">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-4 h-4 text-slate-400" />
                <span className="text-[11px] font-bold text-slate-400 tracking-wider">LIVE PREVIEW</span>
              </div>
              <div className="border border-slate-200 shadow-xl rounded-none h-[420px] w-full max-w-[280px] mx-auto bg-white overflow-hidden flex flex-col relative group">
                
                {/* ID Card Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#5F52FF 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
                
                {/* ID Card Header */}
                <div className="bg-gradient-to-r from-[#5F52FF] to-[#4f42e6] px-4 py-4 text-center relative">
                  {/* Fake School Logo */}
                  <div className="w-10 h-10 bg-white rounded-none mx-auto mb-2 flex items-center justify-center shadow-sm">
                    <span className="text-[#5F52FF] font-black text-lg">AC</span>
                  </div>
                  <h3 className="text-white font-black text-[15px] uppercase tracking-wide">ACS School</h3>
                  <p className="text-white/80 text-[9px] uppercase tracking-wider font-semibold mt-0.5">Education for Excellence</p>
                </div>
                
                {/* ID Card Body */}
                <div className="flex-1 flex flex-col items-center pt-6 pb-4 px-5 relative z-10">
                  {/* Photo Profile */}
                  <div className="w-24 h-24 rounded-none border-4 border-white shadow-lg overflow-hidden bg-orange-100 mb-3 relative z-10 -mt-12">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Amit Sharma" alt="Staff Photo" className="w-full h-full object-cover" />
                  </div>
                  
                  {/* Name & Designation */}
                  <h2 className="text-[18px] font-black text-slate-800 uppercase tracking-tight text-center leading-tight">Amit Sharma</h2>
                  <p className="text-[12px] font-bold text-[#5F52FF] mt-1 mb-4">Senior Teacher</p>
                  
                  {/* Details Grid */}
                  <div className="w-full space-y-2 text-[11px]">
                    <div className="flex border-b border-slate-100 pb-1">
                      <span className="w-20 font-bold text-slate-500">ID No</span>
                      <span className="font-bold text-slate-800">: STF-001</span>
                    </div>
                    <div className="flex border-b border-slate-100 pb-1">
                      <span className="w-20 font-bold text-slate-500">Dept</span>
                      <span className="font-bold text-slate-800">: Mathematics</span>
                    </div>
                    <div className="flex border-b border-slate-100 pb-1">
                      <span className="w-20 font-bold text-slate-500">Phone</span>
                      <span className="font-bold text-slate-800">: 9876543210</span>
                    </div>
                    <div className="flex pb-1">
                      <span className="w-20 font-bold text-slate-500">Blood Grp</span>
                      <span className="font-bold text-red-600">: O+</span>
                    </div>
                  </div>
                </div>
                
                {/* ID Card Footer */}
                <div className="bg-slate-50 px-4 py-3 flex justify-between items-end border-t border-slate-200">
                  <div className="flex flex-col items-center">
                    <div className="w-12 border-b border-slate-400 mb-1"></div>
                    <span className="text-[8px] font-bold text-slate-500 uppercase">Holder Sign</span>
                  </div>
                  
                  {/* Fake Barcode */}
                  <div className="flex flex-col items-center opacity-70">
                    <div className="flex gap-[1px] h-6 items-end">
                      <div className="w-[2px] h-full bg-slate-800"></div><div className="w-[1px] h-5 bg-slate-800"></div><div className="w-[3px] h-full bg-slate-800"></div><div className="w-[1px] h-full bg-slate-800"></div><div className="w-[2px] h-4 bg-slate-800"></div><div className="w-[3px] h-full bg-slate-800"></div><div className="w-[1px] h-6 bg-slate-800"></div><div className="w-[2px] h-5 bg-slate-800"></div><div className="w-[1px] h-full bg-slate-800"></div><div className="w-[2px] h-4 bg-slate-800"></div>
                    </div>
                    <span className="text-[7px] tracking-[2px] font-bold text-slate-800 mt-0.5">STF001</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-12 border-b border-slate-400 mb-1 relative">
                       <img src="https://upload.wikimedia.org/wikipedia/commons/f/f8/Stylized_signature_of_John_Hancock.svg" className="absolute bottom-0 w-full opacity-40 mix-blend-multiply" />
                    </div>
                    <span className="text-[8px] font-bold text-slate-500 uppercase">Auth Sign</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="px-5 py-2 flex justify-end items-center gap-2">
            <span className="text-[13px] text-slate-600">Search:</span>
            <input type="text" className="border border-slate-300 rounded-none px-2 py-1 w-[150px] focus:outline-none focus:border-[#5F52FF]" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-[#f8f9fc] text-[11px] font-bold text-[#5F52FF] uppercase tracking-wider">
                  <th className="px-4 py-3 w-10"><input type="checkbox" className="rounded border-slate-300" /></th>
                  <th className="px-4 py-3 w-16">PHOTO</th>
                  <th className="px-4 py-3 cursor-pointer hover:bg-slate-100">NAME <span className="text-slate-300 ml-1">↑↓</span></th>
                  <th className="px-4 py-3 cursor-pointer hover:bg-slate-100">STAFF ID <span className="text-slate-300 ml-1">↑↓</span></th>
                  <th className="px-4 py-3 cursor-pointer hover:bg-slate-100">DEPARTMENT <span className="text-slate-300 ml-1">↑↓</span></th>
                  <th className="px-4 py-3 cursor-pointer hover:bg-slate-100">DESIGNATION <span className="text-slate-300 ml-1">↑↓</span></th>
                  <th className="px-4 py-3 cursor-pointer hover:bg-slate-100">PHONE <span className="text-slate-300 ml-1">↑↓</span></th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-slate-700">
                {staffList.map((staff, index) => (
                  <tr key={staff.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'} border-b border-slate-100 hover:bg-slate-100 transition-colors`}>
                    <td className="px-4 py-3"><input type="checkbox" className="rounded border-slate-300" /></td>
                    <td className="px-4 py-3">
                      {staff.hasPhoto ? (
                        <div className={`w-8 h-8 rounded-none ${staff.photoColor} flex items-center justify-center border border-slate-200 overflow-hidden`}>
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${staff.name}`} alt={staff.name} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-none bg-[#fde68a] text-yellow-700 font-bold flex items-center justify-center border border-yellow-200">
                          {staff.initial}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-800">
                      {staff.name}
                      {!staff.hasPhoto && (
                        <span className="ml-2 inline-block bg-[#fde68a] text-yellow-800 text-[10px] font-bold px-1.5 py-0.5 rounded">no photo</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-[#ff5252] font-medium">{staff.staffId}</td>
                    <td className="px-4 py-3">{staff.dept}</td>
                    <td className="px-4 py-3">{staff.desig}</td>
                    <td className="px-4 py-3 text-slate-500">{staff.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Fixed Action Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-4 flex justify-end gap-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40">
        <button className="px-5 py-2 bg-white border border-slate-300 rounded-none font-bold text-[13px] text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer transition-colors shadow-sm">
          <Eye className="w-4 h-4" /> Print Preview
        </button>
        <button className="px-5 py-2 bg-[#5F52FF] hover:bg-[#4f42e6] text-white border border-[#5F52FF] rounded-none font-bold text-[13px] flex items-center gap-2 cursor-pointer transition-colors shadow-sm">
          <Download className="w-4 h-4" /> Download PDF
        </button>
        <button className="px-5 py-2 bg-[#00a65a] hover:bg-[#008d4c] text-white border border-[#00a65a] rounded-none font-bold text-[13px] flex items-center gap-2 cursor-pointer transition-colors shadow-sm">
          <ImageIcon className="w-4 h-4" /> Download as Images (ZIP)
        </button>
      </div>

    </div>
  );
}
