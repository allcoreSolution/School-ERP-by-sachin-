import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  BarChart, Bar, Legend
} from 'recharts';
import { 
  Download, Zap, Info, ChevronRight, FileText, CheckCircle, AlertTriangle, 
  ArrowUpRight, IndianRupee, Clock, ListFilter, SlidersHorizontal, Users,
  Gauge, BookOpen, HandCoins, FileSearch, ArrowRightLeft, Globe, UserPlus, 
  WalletCards, LayoutGrid, Percent, Hash, Receipt
} from 'lucide-react';
import QuickSetupModal from '../../components/finance/QuickSetupModal';
import FinanceTabs from '../../components/finance/FinanceTabs';
import { feeCollectionService } from '../../api/feeCollectionService';

const FinanceDashboard = () => {
  const navigate = useNavigate();
  const [isQuickSetupOpen, setIsQuickSetupOpen] = useState(false);
  const [stats, setStats] = useState(null);
  const [recentTxns, setRecentTxns] = useState([]);
  const [topDefaulters, setTopDefaulters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [dashRes, txnRes] = await Promise.all([
          feeCollectionService.getFinanceDashboard(),
          feeCollectionService.getAllTransactions({ limit: 4 })
        ]);
        if(dashRes.data) setStats(dashRes.data);
        if(txnRes.data) {
          const sorted = [...(txnRes.data || [])].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setRecentTxns(sorted.slice(0, 5));
          // Top Defaulters - students with highest due balances from search-due-fees
          const dueRes = await feeCollectionService.searchDueFees({ limit: 6 });
          if(dueRes.data) setTopDefaulters(dueRes.data.slice(0, 6));
        }
      } catch (err) {
        console.error('Finance dashboard error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const fmt = (val) => `₹${(val || 0).toLocaleString('en-IN', { minimumFractionDigits: 0 })}`;
  const pct = stats ? Math.min(100, ((stats.totalCollected || 0) / Math.max(stats.totalAssigned || 1, 1)) * 100).toFixed(1) : '0.0';

  // Chart data from stats or fallback empty
  const trendData = (stats?.collectionTrend || []).map(d => ({ name: d.date, amount: d.amount }));
  const paymentModeData = (stats?.paymentModes || []).map((m, i) => ({ name: m.mode, value: m.count, color: ['#10b981','#3b82f6','#f59e0b'][i] || '#8b5cf6' }));
  const feeTypeData = (stats?.feeTypes || []).map((m, i) => ({ name: m.type, value: m.amount, color: ['#10b981','#3b82f6','#f59e0b','#f43f5e'][i] || '#8b5cf6' }));
  const dueVsPaidData = (stats?.dueVsPaidByClass || []).map(d => ({ name: d.className, paid: d.paid, due: d.due }));

  return (
    <div className="p-4 max-w-[1600px] mx-auto bg-gray-50 min-h-screen text-gray-800 pb-20">
      {/* Banner */}
      <div className="bg-[#009b9f] text-white p-2.5 rounded-none text-xs flex items-center gap-2 mb-4">
        <Info className="w-4 h-4 flex-shrink-0" />
        <p>
          <strong>New: academic-session scoping.</strong> Lists and dashboard numbers now show the selected academic session only, so totals may look smaller than before — nothing was deleted.
        </p>
      </div>

      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Finance & Fees</h1>
          <p className="text-xs text-gray-500 mt-1">Manage fee types, groups, collection, challans, and reports across the school.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsQuickSetupOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white border rounded-none shadow-sm hover:bg-gray-50"
          >
            <Zap className="w-3.5 h-3.5 text-yellow-500" />
            Quick Setup
          </button>
          <button onClick={() => navigate('/finance/collect')} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-none shadow-sm hover:bg-blue-700">
            <Download className="w-3.5 h-3.5" />
            Collect Fees
          </button>
        </div>
      </div>

      {/* Tabs */}
      <FinanceTabs />

      {/* Top Stats Cards */}
      <div className="grid grid-cols-6 gap-3 mb-4">
        {[
          { label: 'TOTAL ASSIGNED', value: loading ? '...' : fmt(stats?.totalAssigned), sub: `${stats?.totalAssignedCount || 0} fees assigned`, iconColor: 'text-blue-500', borderColor: 'border-blue-200' },
          { label: 'TOTAL COLLECTED', value: loading ? '...' : fmt(stats?.totalCollected), sub: `${fmt(stats?.onlineCollected || 0)} online`, iconColor: 'text-green-500', borderColor: 'border-green-200' },
          { label: 'CONCESSION', value: loading ? '...' : fmt(stats?.totalConcession), sub: 'Total discounts granted', iconColor: 'text-orange-400', borderColor: 'border-orange-200' },
          { label: 'TOTAL FINE', value: loading ? '...' : fmt(stats?.totalFine), sub: 'Total fine collected', iconColor: 'text-orange-500', borderColor: 'border-orange-300' },
          { label: 'TOTAL DUE (ALL YEARS)', value: loading ? '...' : fmt(stats?.totalDue), sub: `${stats?.studentsWithDue || 0} students with dues`, iconColor: 'text-red-500', borderColor: 'border-red-200' },
          { label: 'COLLECTED TODAY', value: loading ? '...' : fmt(stats?.collectedToday), sub: new Date().toLocaleDateString('en-IN', {day: '2-digit', month: 'short', year: 'numeric'}), iconColor: 'text-purple-500', borderColor: 'border-purple-200' },
        ].map((stat, i) => (
          <div key={i} className={`bg-white rounded-none p-3 border-l-4 ${stat.borderColor} shadow-sm border border-y-gray-100 border-r-gray-100 flex flex-col justify-center`}>
             <h4 className="text-[9px] font-bold text-gray-400 uppercase tracking-wide mb-1">{stat.label}</h4>
             <div className="flex items-center gap-1.5">
               <span className={`text-[10px] ${stat.iconColor}`}>■</span>
               <span className="text-base font-bold text-gray-800">{stat.value}</span>
             </div>
             <p className="text-[9px] text-gray-500 mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Info Notice */}
      <div className="bg-indigo-50/50 border border-indigo-100 text-indigo-800 p-3 rounded-none text-xs flex items-start gap-2 mb-4">
        <Info className="w-4 h-4 text-indigo-600 mt-0.5" />
        <div>
          <p><strong>These cards cover the whole school, across all academic years</strong> — every fee ever assigned, including students who have already paid in full.</p>
          <a href="#" className="text-indigo-600 hover:underline">Why does Total Due look smaller than before?</a>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-none p-4 border border-gray-100 shadow-sm mb-4 flex items-center justify-between">
        <div className="flex-1 mr-8">
           <h3 className="text-xs font-bold text-gray-800 flex items-center gap-1.5 mb-1">
             <CheckCircle className="w-4 h-4 text-blue-500" /> Overall Collection Progress
           </h3>
           <p className="text-[10px] text-gray-500 mb-2">Percentage of net payable fees (after concessions) successfully collected.</p>
           <div className="w-full h-1.5 bg-gray-100 rounded-none overflow-hidden">
             <div className="h-full bg-yellow-400 rounded-none" style={{width: `${pct}%`}}></div>
           </div>
        </div>
        <div className="text-xl font-bold text-yellow-500">{pct}%</div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-12 gap-4 mb-4">
        {/* Trend Chart */}
        <div className="col-span-6 bg-white rounded-none p-4 border border-gray-100 shadow-sm h-64">
           <h3 className="text-xs font-bold text-gray-800 mb-4 flex items-center gap-1.5">
             <SlidersHorizontal className="w-4 h-4 text-gray-400" /> Collection Trend (Last 15 Days)
           </h3>
           <ResponsiveContainer width="100%" height="80%">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" tick={{fontSize: 9, fill: '#9ca3af'}} axisLine={false} tickLine={false} />
              <YAxis tick={{fontSize: 9, fill: '#9ca3af'}} axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
              <RechartsTooltip contentStyle={{fontSize: '11px', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
              <Area type="monotone" dataKey="amount" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorAmount)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* By Fee Type */}
        <div className="col-span-3 bg-white rounded-none p-4 border border-gray-100 shadow-sm h-64 flex flex-col">
           <h3 className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
             <ListFilter className="w-4 h-4 text-orange-400" /> By Fee Type (Month)
           </h3>
           <div className="flex-1 mt-4">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={feeTypeData} innerRadius={40} outerRadius={60} paddingAngle={2} dataKey="value">
                    {feeTypeData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                </PieChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* By Payment Mode */}
        <div className="col-span-3 bg-white rounded-none p-4 border border-gray-100 shadow-sm h-64 flex flex-col">
           <h3 className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
             <ArrowUpRight className="w-4 h-4 text-blue-500" /> By Payment Mode
           </h3>
           <div className="flex-1 mt-4">
             <ResponsiveContainer width="100%" height="80%">
                <PieChart>
                  <Pie data={paymentModeData} innerRadius={45} outerRadius={60} paddingAngle={0} dataKey="value">
                    {paymentModeData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                </PieChart>
             </ResponsiveContainer>
             <div className="flex flex-wrap justify-center gap-2 mt-2">
                <span className="flex items-center gap-1 text-[9px] text-gray-500"><div className="w-1.5 h-1.5 bg-green-500 rounded-none"></div> Cash</span>
                <span className="flex items-center gap-1 text-[9px] text-gray-500"><div className="w-1.5 h-1.5 bg-blue-500 rounded-none"></div> Online/UPI</span>
             </div>
           </div>
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-2 gap-4 mb-4">
         {/* Top Defaulters */}
         <div className="bg-white rounded-none p-4 border border-gray-100 shadow-sm h-72 flex flex-col">
            <h3 className="text-xs font-bold text-gray-800 mb-3 flex items-center gap-1.5">
             <AlertTriangle className="w-4 h-4 text-red-500" /> Top Defaulters
            </h3>
            <div className="flex-1 overflow-auto hide-scroll">
               <table className="w-full text-left text-[10px]">
                 <thead className="text-gray-400 border-b border-gray-100 uppercase sticky top-0 bg-white">
                   <tr>
                     <th className="font-semibold py-2">Student Name</th>
                     <th className="font-semibold py-2">Adm. No</th>
                     <th className="font-semibold py-2">Class</th>
                     <th className="font-semibold py-2 text-right">Total Due</th>
                     <th className="font-semibold py-2 text-center">Action</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50 text-gray-600">
                   {topDefaulters.length === 0 ? (
                     <tr><td colSpan="5" className="py-4 text-center text-gray-400">No defaulters found.</td></tr>
                   ) : topDefaulters.map((s, i) => (
                     <tr key={i} className="hover:bg-gray-50/50">
                       <td className="py-2.5 font-medium text-gray-800">{`${s.firstName || ''} ${s.lastName || ''}`.trim()}</td>
                       <td className="py-2.5">{s.admissionNo || '-'}</td>
                       <td className="py-2.5">{s.academicClass?.className || 'N/A'}</td>
                       <td className="py-2.5 text-right font-semibold text-red-500">{fmt(s.totalDue)}</td>
                       <td className="py-2.5 flex justify-center">
                         <button className="text-blue-500 hover:bg-blue-50 p-1 rounded"><FileText className="w-3.5 h-3.5" /></button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
            </div>
         </div>

         {/* Due vs Paid by Class */}
         <div className="bg-white rounded-none p-4 border border-gray-100 shadow-sm h-72 flex flex-col">
            <h3 className="text-xs font-bold text-gray-800 mb-3 flex items-center gap-1.5">
             <IndianRupee className="w-4 h-4 text-blue-500" /> Due vs Paid by Class
            </h3>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={dueVsPaidData} margin={{top: 0, right: 10, left: -20, bottom: 0}}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                  <XAxis type="number" tick={{fontSize: 9, fill: '#9ca3af'}} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" tick={{fontSize: 9, fill: '#6b7280'}} axisLine={false} tickLine={false} />
                  <RechartsTooltip cursor={{fill: '#f9fafb'}} contentStyle={{fontSize: '11px', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Bar dataKey="paid" fill="#10b981" radius={[0, 2, 2, 0]} barSize={6} name="Paid" />
                  <Bar dataKey="due" fill="#ef4444" radius={[0, 2, 2, 0]} barSize={6} name="Due" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-2">
               <span className="flex items-center gap-1 text-[10px] text-gray-500 font-medium"><div className="w-2 h-2 bg-green-500 rounded-none"></div> Paid</span>
               <span className="flex items-center gap-1 text-[10px] text-gray-500 font-medium"><div className="w-2 h-2 bg-red-500 rounded-none"></div> Due</span>
            </div>
         </div>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-4 gap-4">
        {/* Recent */}
        <div className="bg-white rounded-none p-4 border border-gray-100 shadow-sm h-60 overflow-hidden flex flex-col">
           <h3 className="text-xs font-bold text-gray-800 mb-3 flex items-center gap-1.5">
             <Clock className="w-4 h-4 text-gray-400" /> Recent Collections
           </h3>
           <div className="flex-1 overflow-y-auto hide-scroll space-y-3">
             {recentTxns.length === 0 ? (
               <p className="text-xs text-gray-400 text-center mt-4">No recent transactions.</p>
             ) : recentTxns.map((r, i) => {
               const colors = ['bg-green-100 text-green-600','bg-blue-100 text-blue-600','bg-purple-100 text-purple-600','bg-orange-100 text-orange-600'];
               const name = `${r.student?.firstName || '?'} ${r.student?.lastName || ''}`.trim();
               return (
                 <div key={i} className="flex items-center gap-3">
                   <div className={`w-7 h-7 rounded-none flex items-center justify-center font-bold text-[10px] ${colors[i % 4]}`}>{name.charAt(0)}</div>
                   <div>
                     <p className="text-[11px] font-bold text-gray-800">{name}</p>
                     <p className="text-[9px] text-gray-500">{r.paymentMode} - ₹{(r.amount || 0).toLocaleString('en-IN')}</p>
                   </div>
                 </div>
               );
             })}
           </div>
        </div>

        {/* Upcoming */}
        <div className="bg-white rounded-none p-4 border border-gray-100 shadow-sm h-60 flex flex-col">
           <h3 className="text-xs font-bold text-gray-800 mb-3 flex items-center gap-1.5">
             <div className="w-2 h-2 bg-green-500 rounded-none"></div> Upcoming
           </h3>
           <div className="flex-1 flex items-center justify-center">
             <p className="text-xs text-gray-400 font-medium">No upcoming dues in the next 14 days.</p>
           </div>
        </div>

        {/* Today's Cashier */}
        <div className="bg-white rounded-none p-4 border border-gray-100 shadow-sm h-60">
           <h3 className="text-xs font-bold text-gray-800 mb-4 flex items-center gap-1.5">
             <Users className="w-4 h-4 text-blue-500" /> Today's Cashier
           </h3>
           <div className="flex justify-between items-center mb-2">
             <p className="text-xs text-gray-600 font-medium">school admin</p>
             <p className="text-xs font-bold text-green-600">₹0.00</p>
           </div>
           <div className="flex items-center gap-1 text-[10px] text-gray-500 bg-gray-50 p-2 rounded-none border border-gray-100">
             <FileText className="w-3 h-3" /> 0 Receipts Processed
           </div>
        </div>

        {/* Operations */}
        <div className="bg-white rounded-none p-4 border border-gray-100 shadow-sm h-60">
           <h3 className="text-xs font-bold text-gray-800 mb-4 flex items-center gap-1.5">
             <SlidersHorizontal className="w-4 h-4 text-gray-500" /> Operations
           </h3>
           <div className="space-y-3">
             <div className="flex justify-between items-center text-xs">
               <span className="flex items-center gap-2 text-gray-600"><div className="w-4 h-4 bg-orange-100 text-orange-500 rounded-none flex items-center justify-center text-[10px] font-bold">G</div> Fee Groups</span>
               <span className="font-bold text-gray-800">0</span>
             </div>
             <div className="flex justify-between items-center text-xs">
               <span className="flex items-center gap-2 text-gray-600"><div className="w-4 h-4 bg-blue-100 text-blue-500 rounded-none flex items-center justify-center text-[10px] font-bold">T</div> Fee Types</span>
               <span className="font-bold text-gray-800">0</span>
             </div>
             <div className="flex justify-between items-center text-xs">
               <span className="flex items-center gap-2 text-gray-600"><div className="w-4 h-4 bg-green-100 text-green-500 rounded-none flex items-center justify-center text-[10px] font-bold">%</div> Discounts</span>
               <span className="font-bold text-gray-800">0</span>
             </div>
             <div className="flex justify-between items-center text-xs mt-4 pt-3 border-t border-gray-100">
               <span className="flex items-center gap-2 text-orange-500 font-medium"><div className="w-2 h-2 bg-orange-500 rounded-none"></div> Pending Online</span>
               <span className="font-bold text-gray-800">0</span>
             </div>
           </div>
        </div>
      </div>
      
      <QuickSetupModal isOpen={isQuickSetupOpen} onClose={() => setIsQuickSetupOpen(false)} />
    </div>
  );
};

export default FinanceDashboard;
