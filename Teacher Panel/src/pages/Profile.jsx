import React, { useState } from 'react';
import {
  User, Phone, Mail, MapPin, Calendar, Briefcase, Building2,
  CreditCard, Link, Shield, QrCode, BarChart2, ChevronRight,
  Link2, AtSign, Share2, Camera, Edit, Settings,
  Heart, Home, Banknote, AlertTriangle
} from 'lucide-react';

const InfoRow = ({ label, value, valueClass = '' }) => (
  <div className="flex items-center py-3 border-b border-gray-100 last:border-0">
    <span className="w-48 text-sm text-gray-600 flex-shrink-0">{label}</span>
    <span className={`text-sm flex-1 ${valueClass || 'text-gray-800'}`}>{value || 'N/A'}</span>
  </div>
);

const SectionTitle = ({ icon: Icon, title, color = 'text-orange-500' }) => (
  <h3 className={`text-base font-bold mb-3 mt-6 flex items-center gap-2 ${color}`}>
    {Icon && <Icon className="w-4 h-4" />}
    {title}
  </h3>
);

const tabs = ['Profile', 'Payroll', 'Leaves', 'Attendance', 'Documents', 'Career', 'Appraisals'];

const Profile = () => {
  const [activeTab, setActiveTab] = useState('Profile');

  return (
    <div className="flex-1 overflow-y-auto bg-[#f4f7f6] theme-app-bg">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-xl font-bold text-gray-800">Staff Profile</h1>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* ===== LEFT PANEL ===== */}
          <div className="w-full lg:w-[280px] flex-shrink-0 space-y-4">
            {/* Photo + Name Card */}
            <div className="bg-white border border-gray-200 shadow-sm text-center p-6">
              <div className="w-28 h-28 rounded-full bg-gray-100 mx-auto border-4 border-white shadow-md overflow-hidden mb-4">
                <img
                  src="https://i.pravatar.cc/150?img=11"
                  alt="Amit Sharma"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-lg font-bold text-gray-800">Amit Sharma</h2>
              <p className="text-sm text-gray-500 mt-0.5">Senior Teacher</p>

              <button className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2 px-4 rounded-none flex items-center justify-center gap-2 transition-colors">
                <Settings className="w-4 h-4" />
                Profile Settings
              </button>
            </div>

            {/* Info Card */}
            <div className="bg-white border border-gray-200 shadow-sm p-4 space-y-3">
              {[
                { label: 'Staff ID', value: 'STF-001', cls: 'text-blue-600 font-semibold' },
                { label: 'Biometric ID', value: 'Not Assigned', cls: 'text-orange-500 font-semibold' },
                { label: 'Role', value: 'Teacher', cls: 'text-orange-500 font-semibold' },
                { label: 'Designation', value: 'Senior Teacher', cls: 'text-orange-500 font-semibold' },
                { label: 'Department', value: 'Mathematics', cls: 'text-orange-500 font-semibold' },
                { label: 'Basic Salary', value: '₹35,000.00', cls: 'text-orange-500 font-semibold' },
                { label: 'Date Of Joining', value: '10/01/2023', cls: 'text-orange-500 font-semibold' },
              ].map(({ label, value, cls }) => (
                <div key={label} className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0">
                  <span className="text-xs text-gray-500 font-medium">{label}</span>
                  <span className={`text-xs ${cls}`}>{value}</span>
                </div>
              ))}
            </div>

            {/* Barcode */}
            <div className="bg-white border border-gray-200 shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <BarChart2 className="w-4 h-4 text-gray-400 rotate-90" />
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Barcode</span>
              </div>
              <div className="flex flex-col items-center">
                {/* Barcode SVG mockup */}
                <svg viewBox="0 0 200 60" className="w-full h-14">
                  {Array.from({ length: 60 }).map((_, i) => (
                    <rect
                      key={i}
                      x={i * 3.2 + 4}
                      y={0}
                      width={i % 3 === 0 ? 2.5 : i % 5 === 0 ? 1.5 : 2}
                      height={i % 7 === 0 ? 55 : 50}
                      fill="#1a1a1a"
                    />
                  ))}
                </svg>
                <span className="text-[9px] font-mono font-bold text-gray-600 mt-1 tracking-widest">STF-001</span>
              </div>
            </div>

            {/* QR Code */}
            <div className="bg-white border border-gray-200 shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <QrCode className="w-4 h-4 text-gray-400" />
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">QR Code</span>
              </div>
              <div className="flex justify-center">
                <svg viewBox="0 0 100 100" className="w-24 h-24">
                  {/* QR mockup */}
                  {[
                    [0,0,30,30],[70,0,30,30],[0,70,30,30],
                    [10,10,10,10],[80,10,10,10],[10,80,10,10],
                    [40,0,20,8],[0,40,8,20],[92,40,8,20],[40,92,20,8],
                    [40,15,5,5],[55,15,5,5],[40,40,5,5],[55,40,5,5],[70,40,5,5],[40,55,5,5],[55,55,5,5],[70,55,5,5],[80,80,15,15],[85,85,5,5]
                  ].map(([x,y,w,h], i) => (
                    <rect key={i} x={x} y={y} width={w} height={h} fill={i < 6 ? '#1a1a1a' : i < 9 ? '#fff' : '#1a1a1a'} />
                  ))}
                </svg>
              </div>
            </div>
          </div>

          {/* ===== RIGHT PANEL ===== */}
          <div className="flex-1 bg-white border border-gray-200 shadow-sm">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab
                      ? 'text-indigo-600 border-indigo-600 bg-indigo-50/50'
                      : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-6">
              {/* PROFILE TAB */}
              {activeTab === 'Profile' && (
                <div>
                  {/* Personal Info */}
                  <div>
                    <InfoRow label="Phone" value="9876543210" />
                    <InfoRow label="Email" value="amit@example.com" valueClass="text-blue-600" />
                    <InfoRow label="Gender" value="Male" valueClass="text-blue-600" />
                    <InfoRow label="Date of Birth" value="04/08/1985" />
                    <InfoRow label="Marital Status" value="N/A" />
                    <InfoRow label="Father Name" value="N/A" />
                    <InfoRow label="Mother Name" value="N/A" />
                    <InfoRow label="Qualification" value="N/A" />
                    <InfoRow label="Work Experience" value="N/A" />
                    <InfoRow label="Note" value="N/A" />
                  </div>

                  {/* Employment Details */}
                  <SectionTitle title="Employment Details" />
                  <div className="border border-gray-100 rounded-none">
                    <InfoRow label="Employee Code" value="N/A" />
                    <InfoRow label="Employment Type" value="N/A" />
                    <InfoRow label="Status" value="Suspended" valueClass="text-orange-500 font-semibold" />
                    <InfoRow label="Confirmation Date" value="N/A" />
                    <InfoRow label="Reporting Manager" value="N/A" />
                  </div>

                  {/* Emergency Contact */}
                  <SectionTitle title="Emergency Contact" />
                  <div className="border border-gray-100 rounded-none">
                    <InfoRow label="Contact Name" value="N/A" />
                    <InfoRow label="Contact Phone" value="N/A" />
                    <InfoRow label="Blood Group" value="N/A" />
                  </div>

                  {/* Address Details */}
                  <SectionTitle title="Address Details" />
                  <div className="border border-gray-100 rounded-none">
                    <InfoRow label="Current Address" value="123, Civil Lines, Delhi" valueClass="text-blue-600" />
                    <InfoRow label="Permanent Address" value="123, Civil Lines, Delhi" valueClass="text-blue-600" />
                  </div>

                  {/* Bank Account Details */}
                  <SectionTitle title="Bank Account Details" />
                  <div className="border border-gray-100 rounded-none">
                    <InfoRow label="Account Title" value="N/A" />
                    <InfoRow label="Bank Name" value="N/A" />
                    <InfoRow label="Bank Branch Name" value="N/A" />
                    <InfoRow label="Bank Account Number" value="N/A" />
                    <InfoRow label="IFSC Code" value="N/A" valueClass="bg-yellow-50 text-gray-700 px-1" />
                  </div>

                  {/* Social Media */}
                  <SectionTitle title="Social Media Links" />
                  <div className="border border-gray-100 rounded-none">
                    {[
                      { label: 'Facebook', icon: Link2 },
                      { label: 'Twitter', icon: AtSign },
                      { label: 'LinkedIn', icon: Share2 },
                      { label: 'Instagram', icon: Camera },
                    ].map(({ label, icon: Icon }) => (
                      <div key={label} className="flex items-center py-3 border-b border-gray-100 last:border-0">
                        <span className="w-48 text-sm text-gray-600 flex-shrink-0 flex items-center gap-2">
                          <Icon className="w-4 h-4 text-gray-400" />
                          {label}
                        </span>
                        <span className="text-sm text-gray-400">N/A</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PAYROLL TAB */}
              {activeTab === 'Payroll' && (
                <div>
                  <SectionTitle icon={Banknote} title="Salary Information" />
                  <div className="border border-gray-100">
                    <InfoRow label="Basic Salary" value="₹35,000.00" valueClass="text-orange-500 font-bold" />
                    <InfoRow label="HRA" value="₹8,750.00" valueClass="text-green-600 font-semibold" />
                    <InfoRow label="TA Allowance" value="₹2,000.00" valueClass="text-green-600 font-semibold" />
                    <InfoRow label="Medical Allowance" value="₹1,500.00" valueClass="text-green-600 font-semibold" />
                    <InfoRow label="PF Deduction" value="₹4,200.00" valueClass="text-red-500 font-semibold" />
                    <InfoRow label="TDS Deduction" value="₹0.00" />
                    <InfoRow label="Net Salary" value="₹43,050.00" valueClass="text-indigo-700 font-bold text-base" />
                  </div>

                  <SectionTitle icon={CreditCard} title="Recent Payslips" />
                  <div className="border border-gray-100 overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="text-left px-4 py-2.5 text-xs font-bold text-gray-500 uppercase">Month</th>
                          <th className="text-left px-4 py-2.5 text-xs font-bold text-gray-500 uppercase">Gross</th>
                          <th className="text-left px-4 py-2.5 text-xs font-bold text-gray-500 uppercase">Deductions</th>
                          <th className="text-left px-4 py-2.5 text-xs font-bold text-gray-500 uppercase">Net Pay</th>
                          <th className="text-left px-4 py-2.5 text-xs font-bold text-gray-500 uppercase">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { month: 'August, 2026', gross: '₹44,250', ded: '₹4,200', net: '₹0.00', status: 'Paid' },
                          { month: 'July, 2026', gross: '₹44,250', ded: '₹4,200', net: '₹0.00', status: 'Paid' },
                          { month: 'June, 2026', gross: '₹44,250', ded: '₹4,200', net: '₹0.00', status: 'Paid' },
                        ].map((row, i) => (
                          <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="px-4 py-3 text-gray-800">{row.month}</td>
                            <td className="px-4 py-3 text-green-600 font-semibold">{row.gross}</td>
                            <td className="px-4 py-3 text-red-500">{row.ded}</td>
                            <td className="px-4 py-3 text-gray-800 font-semibold">{row.net}</td>
                            <td className="px-4 py-3">
                              <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-none">{row.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* LEAVES TAB */}
              {activeTab === 'Leaves' && (
                <div>
                  <SectionTitle icon={Calendar} title="Leave Balance" />
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {[
                      { type: 'Casual Leave', total: 12, used: 3, color: 'blue' },
                      { type: 'Medical Leave', total: 10, used: 1, color: 'green' },
                      { type: 'Earned Leave', total: 15, used: 5, color: 'indigo' },
                      { type: 'Unpaid Leave', total: '—', used: 0, color: 'red' },
                    ].map(({ type, total, used, color }) => (
                      <div key={type} className={`bg-${color}-50 border border-${color}-200 p-4`}>
                        <p className="text-xs font-semibold text-gray-500 mb-2">{type}</p>
                        <p className={`text-2xl font-black text-${color}-600`}>{typeof total === 'number' ? total - used : total}</p>
                        <p className="text-[10px] text-gray-400 mt-1">{typeof used === 'number' ? `${used} used of ${total}` : 'N/A'}</p>
                      </div>
                    ))}
                  </div>
                  <SectionTitle title="Leave History" />
                  <div className="border border-gray-100 overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="text-left px-4 py-2.5 text-xs font-bold text-gray-500 uppercase">Type</th>
                          <th className="text-left px-4 py-2.5 text-xs font-bold text-gray-500 uppercase">From</th>
                          <th className="text-left px-4 py-2.5 text-xs font-bold text-gray-500 uppercase">To</th>
                          <th className="text-left px-4 py-2.5 text-xs font-bold text-gray-500 uppercase">Days</th>
                          <th className="text-left px-4 py-2.5 text-xs font-bold text-gray-500 uppercase">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { type: 'Casual Leave', from: '04 Sep 2026', to: '05 Sep 2026', days: 2, status: 'Approved', stClass: 'bg-green-100 text-green-700' },
                          { type: 'Medical Leave', from: '15 Aug 2026', to: '15 Aug 2026', days: 1, status: 'Approved', stClass: 'bg-green-100 text-green-700' },
                          { type: 'Casual Leave', from: '01 Aug 2026', to: '01 Aug 2026', days: 1, status: 'Pending', stClass: 'bg-yellow-100 text-yellow-700' },
                        ].map((r, i) => (
                          <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="px-4 py-3 text-gray-700">{r.type}</td>
                            <td className="px-4 py-3 text-gray-600">{r.from}</td>
                            <td className="px-4 py-3 text-gray-600">{r.to}</td>
                            <td className="px-4 py-3 text-gray-800 font-semibold">{r.days}</td>
                            <td className="px-4 py-3"><span className={`text-xs font-bold px-2 py-0.5 rounded-none ${r.stClass}`}>{r.status}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ATTENDANCE TAB */}
              {activeTab === 'Attendance' && (
                <div>
                  <SectionTitle icon={Shield} title="Attendance Summary — September 2026" />
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {[
                      { label: 'Present', val: 18, color: 'green' },
                      { label: 'Absent', val: 2, color: 'red' },
                      { label: 'Late', val: 1, color: 'yellow' },
                      { label: 'Half Day', val: 0, color: 'blue' },
                    ].map(({ label, val, color }) => (
                      <div key={label} className={`bg-${color}-50 border border-${color}-200 p-4 text-center`}>
                        <p className={`text-2xl font-black text-${color}-600`}>{val}</p>
                        <p className="text-xs text-gray-500 mt-1 font-semibold">{label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gray-50 border border-gray-200 p-4 text-sm text-gray-500 text-center py-16">
                    Detailed attendance calendar coming soon.
                  </div>
                </div>
              )}

              {/* DOCUMENTS TAB */}
              {activeTab === 'Documents' && (
                <div>
                  <SectionTitle icon={Briefcase} title="Uploaded Documents" />
                  <div className="border border-gray-100 overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="text-left px-4 py-2.5 text-xs font-bold text-gray-500 uppercase">Document</th>
                          <th className="text-left px-4 py-2.5 text-xs font-bold text-gray-500 uppercase">Status</th>
                          <th className="text-left px-4 py-2.5 text-xs font-bold text-gray-500 uppercase">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: 'Aadhaar Card', status: 'Uploaded' },
                          { name: 'PAN Card', status: 'Uploaded' },
                          { name: 'Degree Certificate', status: 'Pending' },
                          { name: 'Experience Letter', status: 'Not Uploaded' },
                          { name: 'Police Verification', status: 'Not Uploaded' },
                        ].map((d, i) => (
                          <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="px-4 py-3 text-gray-800">{d.name}</td>
                            <td className="px-4 py-3">
                              <span className={`text-xs font-bold px-2 py-0.5 rounded-none ${
                                d.status === 'Uploaded' ? 'bg-green-100 text-green-700' :
                                d.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-600'
                              }`}>{d.status}</span>
                            </td>
                            <td className="px-4 py-3">
                              <button className="text-xs text-blue-600 hover:underline font-semibold">
                                {d.status === 'Not Uploaded' ? 'Upload' : 'View'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* CAREER TAB */}
              {activeTab === 'Career' && (
                <div>
                  <SectionTitle icon={Briefcase} title="Career Timeline" />
                  <div className="space-y-4">
                    {[
                      { year: '2023 - Present', role: 'Senior Teacher', org: 'Yug International School', dept: 'Mathematics', type: 'Full Time' },
                      { year: '2019 - 2023', role: 'Teacher', org: 'Delhi Public School', dept: 'Science & Maths', type: 'Full Time' },
                      { year: '2016 - 2019', role: 'Assistant Teacher', org: 'Kendriya Vidyalaya', dept: 'Mathematics', type: 'Part Time' },
                    ].map((c, i) => (
                      <div key={i} className="flex gap-4 border-l-4 border-indigo-500 pl-4 py-2">
                        <div>
                          <p className="text-xs font-bold text-indigo-500 mb-1">{c.year}</p>
                          <p className="text-sm font-bold text-gray-800">{c.role}</p>
                          <p className="text-xs text-gray-500">{c.org} — {c.dept}</p>
                          <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 font-semibold mt-1 inline-block">{c.type}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* APPRAISALS TAB */}
              {activeTab === 'Appraisals' && (
                <div>
                  <SectionTitle title="Performance Appraisals" />
                  <div className="border border-gray-100 overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="text-left px-4 py-2.5 text-xs font-bold text-gray-500 uppercase">Year</th>
                          <th className="text-left px-4 py-2.5 text-xs font-bold text-gray-500 uppercase">Rating</th>
                          <th className="text-left px-4 py-2.5 text-xs font-bold text-gray-500 uppercase">Increment</th>
                          <th className="text-left px-4 py-2.5 text-xs font-bold text-gray-500 uppercase">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { year: '2025-26', rating: '4.2 / 5', inc: '₹2,500', status: 'Completed' },
                          { year: '2024-25', rating: '3.8 / 5', inc: '₹1,800', status: 'Completed' },
                          { year: '2026-27', rating: 'Pending', inc: '—', status: 'In Progress' },
                        ].map((r, i) => (
                          <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="px-4 py-3 text-gray-800 font-semibold">{r.year}</td>
                            <td className="px-4 py-3 text-indigo-600 font-bold">{r.rating}</td>
                            <td className="px-4 py-3 text-green-600 font-semibold">{r.inc}</td>
                            <td className="px-4 py-3">
                              <span className={`text-xs font-bold px-2 py-0.5 rounded-none ${
                                r.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                              }`}>{r.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
