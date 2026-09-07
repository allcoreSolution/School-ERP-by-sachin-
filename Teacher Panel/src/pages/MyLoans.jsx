import React, { useState } from 'react';
import {
  Users, CalendarDays, CreditCard, Plus, History,
  Wallet, Clock, TrendingDown, Eye, FileText, X, CheckCircle,
  AlertCircle, Calendar
} from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, iconBg }) => (
  <div className="bg-white border border-gray-200 shadow-sm p-5 flex items-center gap-5">
    <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${iconBg}`}>
      <Icon className="w-7 h-7" />
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      <p className="text-2xl font-black text-gray-800 mt-0.5">{value}</p>
    </div>
  </div>
);

const applyTabs = ['Attendance', 'Apply Leave', 'Loans'];

const loanHistory = [
  {
    date: '19 May, 2026',
    requested: '₹10,000.00',
    duration: '6 Months',
    emi: '₹1,666.67',
    remaining: '₹10,000.00',
    status: 'Active',
  },
];

const scheduleData = Array.from({ length: 6 }, (_, i) => ({
  month: `Month ${i + 1}`,
  dueDate: `19 ${['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'][i]}, 2026`,
  emi: '₹1,666.67',
  status: i === 0 ? 'Paid' : i === 1 ? 'Pending' : 'Upcoming',
}));

const MyLoans = () => {
  const [activeTab, setActiveTab] = useState('Loans');
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [form, setForm] = useState({ amount: '', duration: '6', reason: '', type: 'Loan' });

  return (
    <div className="flex-1 overflow-y-auto bg-[#f4f7f6] theme-app-bg">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <h1 className="text-2xl font-bold text-gray-800">Human Resource</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage staff, <span className="text-blue-500">attendance</span>,{' '}
          <span className="text-blue-500">leaves</span>,{' '}
          <span className="text-blue-500">payroll</span>, and{' '}
          <span className="text-blue-500">loans</span> across the school.
        </p>

        {/* Tabs */}
        <div className="flex items-center gap-0 mt-5">
          {applyTabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === tab
                  ? 'text-indigo-600 border-indigo-600'
                  : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
            >
              {tab === 'Attendance' && <Users className="w-4 h-4" />}
              {tab === 'Apply Leave' && <CalendarDays className="w-4 h-4" />}
              {tab === 'Loans' && <CreditCard className="w-4 h-4" />}
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 max-w-6xl mx-auto space-y-6">

        {/* Loans Content */}
        {activeTab === 'Loans' && (
          <>
            {/* Apply Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setShowApplyModal(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 flex items-center gap-2 text-sm transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Apply for Loan / Advance
              </button>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard
                icon={Wallet}
                label="Active Loan Amount"
                value="₹10,000.00"
                iconBg="bg-indigo-100 text-indigo-500"
              />
              <StatCard
                icon={Clock}
                label="Remaining Balance"
                value="₹10,000.00"
                iconBg="bg-orange-100 text-orange-500"
              />
              <StatCard
                icon={TrendingDown}
                label="Monthly EMI Deduction"
                value="₹1,666.67"
                iconBg="bg-emerald-100 text-emerald-500"
              />
            </div>

            {/* Loan History Table */}
            <div className="bg-white border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
                <History className="w-4 h-4 text-indigo-500" />
                <h2 className="text-base font-bold text-gray-800">Loan Application History</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-gray-200" style={{borderCollapse:'collapse'}}>
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left px-4 py-3 text-xs font-bold text-indigo-600 uppercase tracking-wider border border-gray-200">Application Date</th>
                      <th className="text-left px-4 py-3 text-xs font-bold text-indigo-600 uppercase tracking-wider border border-gray-200">Requested Amount</th>
                      <th className="text-left px-4 py-3 text-xs font-bold text-indigo-600 uppercase tracking-wider border border-gray-200">Duration</th>
                      <th className="text-left px-4 py-3 text-xs font-bold text-indigo-600 uppercase tracking-wider border border-gray-200">Monthly EMI</th>
                      <th className="text-left px-4 py-3 text-xs font-bold text-indigo-600 uppercase tracking-wider border border-gray-200">Remaining Balance</th>
                      <th className="text-left px-4 py-3 text-xs font-bold text-indigo-600 uppercase tracking-wider border border-gray-200">Status</th>
                      <th className="text-left px-4 py-3 text-xs font-bold text-indigo-600 uppercase tracking-wider border border-gray-200">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loanHistory.map((row, i) => (
                      <tr key={i} className="hover:bg-indigo-50/30 transition-colors">
                        <td className="px-4 py-3 text-gray-700 font-medium border border-gray-200">{row.date}</td>
                        <td className="px-4 py-3 text-gray-800 font-semibold border border-gray-200">{row.requested}</td>
                        <td className="px-4 py-3 text-gray-600 border border-gray-200">{row.duration}</td>
                        <td className="px-4 py-3 text-gray-700 border border-gray-200">{row.emi}</td>
                        <td className="px-4 py-3 text-orange-500 font-bold border border-gray-200">{row.remaining}</td>
                        <td className="px-4 py-3 border border-gray-200">
                          <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 border border-green-200">
                            {row.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 border border-gray-200">
                          <button
                            onClick={() => setShowScheduleModal(true)}
                            className="flex items-center gap-1.5 bg-gray-100 hover:bg-indigo-50 hover:text-indigo-600 text-gray-600 border border-gray-200 hover:border-indigo-200 px-3 py-1.5 text-xs font-semibold transition-colors"
                          >
                            <Calendar className="w-3.5 h-3.5" />
                            View Schedule
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {loanHistory.length === 0 && (
                  <div className="text-center py-16 text-gray-400">
                    <CreditCard className="w-10 h-10 mx-auto mb-3 opacity-40" />
                    <p className="text-sm">No loan applications found.</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Attendance Tab */}
        {activeTab === 'Attendance' && (
          <div className="bg-white border border-gray-200 p-16 text-center shadow-sm">
            <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <h3 className="text-lg font-bold text-gray-700">Attendance Records</h3>
            <p className="text-sm text-gray-400 mt-1">Your monthly attendance report will appear here.</p>
          </div>
        )}

        {/* Apply Leave Tab */}
        {activeTab === 'Apply Leave' && (
          <div className="bg-white border border-gray-200 p-16 text-center shadow-sm">
            <CalendarDays className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <h3 className="text-lg font-bold text-gray-700">Apply Leave</h3>
            <p className="text-sm text-gray-400 mt-1">Submit and track your leave requests here.</p>
          </div>
        )}

      </div>

      {/* ===== Apply for Loan Modal ===== */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowApplyModal(false)}>
          <div className="bg-white w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-indigo-500" /> Apply for Loan / Advance
              </h2>
              <button onClick={() => setShowApplyModal(false)} className="p-1.5 hover:bg-gray-100 text-gray-500 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Type</label>
                <select
                  value={form.type}
                  onChange={e => setForm({ ...form, type: e.target.value })}
                  className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option>Loan</option>
                  <option>Advance Salary</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Amount (₹)</label>
                <input
                  type="number"
                  placeholder="e.g. 10000"
                  value={form.amount}
                  onChange={e => setForm({ ...form, amount: e.target.value })}
                  className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Repayment Duration</label>
                <select
                  value={form.duration}
                  onChange={e => setForm({ ...form, duration: e.target.value })}
                  className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  {[3, 6, 9, 12, 18, 24].map(m => (
                    <option key={m} value={m}>{m} Months</option>
                  ))}
                </select>
              </div>
              {form.amount && form.duration && (
                <div className="bg-indigo-50 border border-indigo-100 px-4 py-3 text-sm">
                  <p className="text-indigo-700 font-semibold">
                    Monthly EMI: ₹{(Number(form.amount) / Number(form.duration)).toFixed(2)}
                  </p>
                </div>
              )}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Reason</label>
                <textarea
                  rows={3}
                  placeholder="Briefly describe the reason..."
                  value={form.reason}
                  onChange={e => setForm({ ...form, reason: e.target.value })}
                  className="w-full border border-gray-200 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>
            <div className="flex gap-3 px-6 py-4 border-t border-gray-100">
              <button
                onClick={() => {
                  setShowApplyModal(false);
                  setForm({ amount: '', duration: '6', reason: '', type: 'Loan' });
                  alert('Application submitted! It will be reviewed by admin.');
                }}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 text-sm transition-colors"
              >
                Submit Application
              </button>
              <button
                onClick={() => setShowApplyModal(false)}
                className="px-5 border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== EMI Schedule Modal ===== */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowScheduleModal(false)}>
          <div className="bg-white w-full max-w-lg shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-500" /> EMI Repayment Schedule
              </h2>
              <button onClick={() => setShowScheduleModal(false)} className="p-1.5 hover:bg-gray-100 text-gray-500">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-2">
              <table className="w-full text-sm border border-gray-200" style={{borderCollapse:'collapse'}}>
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-4 py-2.5 text-xs font-bold text-gray-600 uppercase border border-gray-200">Installment</th>
                    <th className="text-left px-4 py-2.5 text-xs font-bold text-gray-600 uppercase border border-gray-200">Due Date</th>
                    <th className="text-left px-4 py-2.5 text-xs font-bold text-gray-600 uppercase border border-gray-200">EMI Amount</th>
                    <th className="text-left px-4 py-2.5 text-xs font-bold text-gray-600 uppercase border border-gray-200">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduleData.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-700 font-medium border border-gray-200">{row.month}</td>
                      <td className="px-4 py-3 text-gray-600 border border-gray-200">{row.dueDate}</td>
                      <td className="px-4 py-3 text-gray-800 font-semibold border border-gray-200">{row.emi}</td>
                      <td className="px-4 py-3 border border-gray-200">
                        <span className={`text-xs font-bold px-2 py-0.5 ${
                          row.status === 'Paid' ? 'bg-green-100 text-green-700' :
                          row.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-500'
                        }`}>{row.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center">
              <p className="text-xs text-gray-400">Total Loan: ₹10,000.00 | Paid: ₹0.00 | Remaining: ₹10,000.00</p>
              <button onClick={() => setShowScheduleModal(false)} className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 text-sm font-semibold transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MyLoans;
