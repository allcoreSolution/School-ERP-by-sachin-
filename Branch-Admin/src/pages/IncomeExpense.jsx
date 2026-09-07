import React from 'react';
import { Filter, ChevronDown, Download, RotateCcw, Calendar, TrendingDown, TrendingUp, Scale, Building2, AlertTriangle, LineChart as LineChartIcon, Search } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const IncomeExpense = () => {
  const accountData = [
    {
      id: "1.",
      school: "SUDHAKAR",
      feeCol: "5,000.00",
      otherInc: "0.00",
      totalInc: "5,000.00",
      expense: "0.00",
      net: "5,000.00"
    }
  ];

  const chartData = [
    { name: 'Oct 25', income: 0, expense: 0 },
    { name: 'Nov 25', income: 0, expense: 0 },
    { name: 'Dec 25', income: 0, expense: 0 },
    { name: 'Jan 26', income: 0, expense: 0 },
    { name: 'Feb 26', income: 0, expense: 0 },
    { name: 'Mar 26', income: 0, expense: 0 },
    { name: 'Apr 26', income: 0, expense: 0 },
    { name: 'May 26', income: 3000, expense: 0 },
    { name: 'Jun 26', income: 5000, expense: 0 },
    { name: 'Jul 26', income: 5000, expense: 4000 },
    { name: 'Aug 26', income: 5000, expense: 0 },
    { name: 'Sep 26', income: 5000, expense: 0 },
  ];

  const kpiCards = [
    { title: 'Total Income (INR)', amount: '₹5,000.00', sub: 'Fees ₹5,000.00 + other ₹0.00', icon: TrendingDown, color: 'from-[#17a2b8] to-[#138496]', shadow: 'shadow-[0_4px_12px_rgba(23,162,184,0.2)]' },
    { title: 'Total Expense (INR)', amount: '₹0.00', sub: 'Posted in the expense ledger', icon: TrendingUp, color: 'from-[#dc3545] to-[#c82333]', shadow: 'shadow-[0_4px_12px_rgba(220,53,69,0.2)]' },
    { title: 'Net Surplus (INR)', amount: '₹5,000.00', sub: 'Income less expense', icon: Scale, color: 'from-[#28a745] to-[#218838]', shadow: 'shadow-[0_4px_12px_rgba(40,167,69,0.2)]' },
    { title: 'Sites in ₹ (INR)', amount: '4', sub: 'Reporting in this currency', icon: Building2, color: 'from-[#6c757d] to-[#5a6268]', shadow: 'shadow-[0_4px_12px_rgba(108,117,125,0.2)]' },
    { title: 'Total Income (KSh)', amount: 'KSh0.00', sub: 'Fees KSh0.00 + other KSh0.00', icon: TrendingDown, color: 'from-[#17a2b8] to-[#138496]', shadow: 'shadow-[0_4px_12px_rgba(23,162,184,0.2)]' },
    { title: 'Total Expense (KSh)', amount: 'KSh0.00', sub: 'Posted in the expense ledger', icon: TrendingUp, color: 'from-[#dc3545] to-[#c82333]', shadow: 'shadow-[0_4px_12px_rgba(220,53,69,0.2)]' },
    { title: 'Net Surplus (KSh)', amount: 'KSh0.00', sub: 'Income less expense', icon: Scale, color: 'from-[#28a745] to-[#218838]', shadow: 'shadow-[0_4px_12px_rgba(40,167,69,0.2)]' },
    { title: 'Sites in KSh (KES)', amount: '1', sub: 'Reporting in this currency', icon: Building2, color: 'from-[#6c757d] to-[#5a6268]', shadow: 'shadow-[0_4px_12px_rgba(108,117,125,0.2)]' }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto bg-[#f4f7fa] min-h-[calc(100vh-70px)]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-[22px] font-semibold text-gray-800 tracking-tight">Income &amp; Expense Report</h1>
        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => alert("Initiating CSV export...")}
            className="bg-[#28a745] hover:bg-[#218838] text-white px-4 py-2 rounded-[3px] text-[13.5px] font-bold shadow-sm flex items-center gap-2 transition-colors focus:ring-2 focus:ring-[#28a745]/50"
          >
            <Download className="w-4 h-4" /> Export to CSV
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-[3px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 mb-6">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[15px] font-bold text-gray-800 uppercase tracking-tight">
            <Filter className="w-4.5 h-4.5 text-gray-800 fill-gray-800" /> PERIOD & SCOPE
          </div>
        </div>
        
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-5">
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Institution</label>
              <div className="relative">
                <select className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-[3px] text-[13.5px] text-gray-700 bg-white focus:outline-none focus:border-[#fd7e14]">
                  <option>All Schools</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-2.5 top-[11px] text-gray-400 pointer-events-none" />
              </div>
            </div>
            
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Date From</label>
              <div>
                <input 
                  type="date" 
                  defaultValue="2026-09-01" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-[3px] text-[13.5px] text-gray-700 bg-white focus:outline-none focus:border-[#fd7e14] cursor-pointer"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Date To</label>
              <div>
                <input 
                  type="date" 
                  defaultValue="2026-09-04" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-[3px] text-[13.5px] text-gray-700 bg-white focus:outline-none focus:border-[#fd7e14] cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-2">
             <button 
               onClick={() => alert("Report generation started.")}
               className="flex items-center justify-center gap-2 bg-[#fd7e14] hover:bg-[#e86e04] text-white px-6 py-2 rounded-[3px] text-[13.5px] font-bold shadow-sm transition-colors cursor-pointer focus:ring-2 focus:ring-[#fd7e14]/50"
             >
               <Search className="w-4 h-4" /> Run Report
             </button>
             <button 
               onClick={() => alert("Filters reset.")}
               className="flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-5 py-2 rounded-[3px] text-[13.5px] font-bold shadow-sm transition-colors focus:ring-2 focus:ring-gray-200"
             >
               <RotateCcw className="w-4 h-4" /> Reset
             </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6 text-white font-sans">
        {kpiCards.map((kpi, idx) => (
          <div key={idx} className={`bg-gradient-to-br ${kpi.color} p-5 rounded-[3px] ${kpi.shadow} flex items-center gap-4 relative overflow-hidden group h-[130px]`}>
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-300 pointer-events-none">
               <kpi.icon className="w-28 h-28" />
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 shrink-0 border border-white/30 shadow-inner z-10">
               <kpi.icon className="w-6 h-6 text-white" />
            </div>
            <div className="relative z-10 flex flex-col justify-center w-full">
              <div className="text-[12px] font-bold text-white/90 uppercase tracking-wider mb-1 line-clamp-1">{kpi.title}</div>
              <div className="text-[26xl] font-black leading-none drop-shadow-sm mb-1.5 min-text-[22px] truncate" style={{ fontSize: kpi.amount.length > 8 ? '20px' : '26px' }}>{kpi.amount}</div>
              <div className="text-[10px] font-semibold text-white/75 truncate">{kpi.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-[3px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 mb-6">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[15px] font-bold text-[#1a2b4c] uppercase tracking-tight">
            <LineChartIcon className="w-4.5 h-4.5 text-[#1a2b4c]" /> INCOME VS EXPENSE — LAST 12 MONTHS
          </div>
          <div className="flex gap-4 text-[13px] font-bold">
            <span className="text-gray-500 hover:text-gray-800 cursor-pointer transition-colors">Top Expense Heads</span>
            <span className="text-[#fd7e14] border-b-2 border-[#fd7e14] pb-1 cursor-pointer">Top Income Heads</span>
          </div>
        </div>
        <div className="p-6">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 11}} dy={10} />
                <YAxis hide={true} />
                <Tooltip />
                <Line type="monotone" dataKey="income" stroke="#17a2b8" strokeWidth={2} dot={{r: 4, fill: '#17a2b8', strokeWidth: 2, stroke: '#fff'}} />
                <Line type="monotone" dataKey="expense" stroke="#dc3545" strokeWidth={2} dot={{r: 4, fill: '#dc3545', strokeWidth: 2, stroke: '#fff'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-2 mb-4 text-[12px] font-bold text-gray-600">
             <div className="flex items-center gap-2"><div className="w-6 h-3 bg-[#17a2b8]/20 border border-[#17a2b8]"></div> Income</div>
             <div className="flex items-center gap-2"><div className="w-6 h-3 bg-[#dc3545]/20 border border-[#dc3545]"></div> Expense</div>
          </div>
          <div className="bg-orange-50/50 p-3 rounded-[3px] border border-orange-100 mt-4 flex gap-2 text-[12px] text-gray-500 font-medium leading-relaxed">
            <AlertTriangle className="w-4 h-4 text-[#fd7e14] shrink-0 mt-0.5" />
            <div>
              <span className="text-[#fd7e14] font-semibold">Schools here report in more than one currency, so read this chart as a trend shape</span>, not a cash figure. <br/>
              <span className="text-blue-500 cursor-pointer hover:underline">Pick a single school for a true total.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section (Excel Lines apply) */}
      <div className="bg-white rounded-[3px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 mb-6 flex flex-col">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[15px] font-bold text-[#1a2b4c] uppercase tracking-tight">
              <svg className="w-4 h-4 text-[#1a2b4c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg> 
              ACCOUNT SUMMARY BY SCHOOL
            </div>
            <div className="text-[12px] text-gray-500 font-medium">
               01 Sep 2026 — 04 Sep 2026
            </div>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="w-full border-collapse bg-white">
              <thead className="bg-[#2a3038] text-white">
                <tr className="border-b border-gray-700 text-left text-[11px] font-bold uppercase tracking-wider">
                  <th className="border border-gray-400/30 py-3 px-2.5 w-[60px] whitespace-nowrap">#</th>
                  <th className="border border-gray-400/30 py-3 px-2.5 w-[30%]">School</th>
                  <th className="border border-gray-400/30 py-3 px-2.5 text-right whitespace-nowrap">Fee Collection</th>
                  <th className="border border-gray-400/30 py-3 px-2.5 text-right whitespace-nowrap">Other Income</th>
                  <th className="border border-gray-400/30 py-3 px-2.5 text-right whitespace-nowrap">Total Income</th>
                  <th className="border border-gray-400/30 py-3 px-2.5 text-right whitespace-nowrap">Expense</th>
                  <th className="border border-gray-400/30 py-3 px-2.5 text-right whitespace-nowrap">Net</th>
                </tr>
              </thead>
              <tbody className="text-[13px]">
                {accountData.map((row, i) => (
                  <tr 
                    key={i} 
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="border border-gray-200 py-3 px-2.5 text-gray-400 font-medium whitespace-nowrap">{row.id}</td>
                    <td className="border border-gray-200 py-3 px-2.5 font-bold text-[#fd7e14] uppercase text-[13px] break-words">{row.school}</td>
                    <td className="border border-gray-200 py-3 px-2.5 text-right font-medium text-gray-600 whitespace-nowrap">₹{row.feeCol}</td>
                    <td className="border border-gray-200 py-3 px-2.5 text-right font-medium text-gray-600 whitespace-nowrap">₹{row.otherInc}</td>
                    <td className="border border-gray-200 py-3 px-2.5 text-right font-bold text-gray-800 whitespace-nowrap">₹{row.totalInc}</td>
                    <td className="border border-gray-200 py-3 px-2.5 text-right text-[#dc3545] font-medium whitespace-nowrap">₹{row.expense}</td>
                    <td className="border border-gray-200 py-3 px-2.5 text-right font-bold text-[#28a745] whitespace-nowrap">₹{row.net}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>

    </div>
  );
};

export default IncomeExpense;
