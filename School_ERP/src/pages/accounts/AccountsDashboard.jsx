import React, { useState, useEffect } from 'react';
import AccountsTabs from '../../components/accounts/AccountsTabs';
import { Link } from 'react-router-dom';
import { 
  Info, Printer, ArrowDown, ArrowUp, CreditCard
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AccountsDashboard = () => {
  const [chartData, setChartData] = useState([]);
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    todaysCollection: 0,
    monthIncome: 0,
    monthExpense: 0,
    cashAndBank: 0
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API calls e.g. accountsService.getDashboard()
        // const res = await accountsService.getDashboard();
        // setChartData(res.data.chartData || []);
        // setVouchers(res.data.recentVouchers || []);
        // setStats(res.data.stats || {});
      } catch (err) {
        console.error('Accounts dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const fmt = (val) => `₹${(val || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

  return (
    <div className="p-4 max-w-[1600px] mx-auto bg-gray-50 min-h-screen text-gray-800 pb-20">
      {/* Banner */}
      <div className="bg-[#009b9f] text-white p-2.5 rounded-none text-xs flex items-center gap-2 mb-4 shadow-sm">
        <Info className="w-5 h-5 flex-shrink-0" />
        <p>
          <strong>New: academic-session scoping.</strong> Lists and dashboard numbers now show the <em>selected academic session</em> only. Use the session switcher in the top bar to view another year.
        </p>
      </div>

      {/* Header */}
      <div className="mb-2 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Accounts &amp; Bookkeeping</h1>
          <p className="text-[11px] text-gray-500">Track income, expenses, ledgers and hand audit-ready books to your accountant.</p>
        </div>
      </div>

      {/* Tabs */}
      <AccountsTabs />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-none p-5 flex items-center gap-4 shadow-sm border border-gray-200 border-l-[3px] border-l-blue-400">
          <div className="bg-blue-50 p-3 rounded-none text-blue-500">
            <Printer className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">TODAY'S COLLECTION</p>
            <h2 className="text-2xl font-bold text-gray-800">{loading ? '...' : fmt(stats.todaysCollection)}</h2>
            <p className="text-[11px] text-gray-400 mt-1">Fee receipts today</p>
          </div>
        </div>
        
        <div className="bg-white rounded-none p-5 flex items-center gap-4 shadow-sm border border-gray-200 border-l-[3px] border-l-green-400">
          <div className="bg-green-50 p-3 rounded-none text-green-500">
            <ArrowDown className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">THIS MONTH INCOME</p>
            <h2 className="text-2xl font-bold text-gray-800">{loading ? '...' : fmt(stats.monthIncome)}</h2>
            <p className="text-[11px] text-gray-400 mt-1">Fees + other income</p>
          </div>
        </div>
        
        <div className="bg-white rounded-none p-5 flex items-center gap-4 shadow-sm border border-gray-200 border-l-[3px] border-l-red-400">
          <div className="bg-red-50 p-3 rounded-none text-red-500">
            <ArrowUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">THIS MONTH EXPENSE</p>
            <h2 className="text-2xl font-bold text-gray-800">{loading ? '...' : fmt(stats.monthExpense)}</h2>
            <p className="text-[11px] text-gray-400 mt-1">Recorded payments</p>
          </div>
        </div>
        
        <div className="bg-white rounded-none p-5 flex items-center gap-4 shadow-sm border border-gray-200 border-l-[3px] border-l-yellow-400">
          <div className="bg-yellow-50 p-3 rounded-none text-yellow-600">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">CASH &amp; BANK</p>
            <h2 className="text-2xl font-bold text-gray-800">{loading ? '...' : fmt(stats.cashAndBank)}</h2>
            <p className="text-[11px] text-gray-400 mt-1">Live ledger balance</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Income vs Expense Chart */}
        <div className="lg:col-span-2 bg-white rounded-none shadow-sm border border-gray-200 p-5">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[15px] font-bold text-gray-800">Income vs Expense</h2>
            <span className="text-xs text-gray-400">last 12 months</span>
          </div>
          <div className="h-[400px] w-full">
            {chartData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                {loading ? 'Loading chart...' : 'No data available for the selected period.'}
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#6B7280' }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#6B7280' }}
                    tickFormatter={(value) => new Intl.NumberFormat('en-IN').format(value)}
                  />
                  <Tooltip 
                    formatter={(value) => ['₹' + new Intl.NumberFormat('en-IN').format(value)]}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Legend iconType="rect" wrapperStyle={{ fontSize: '11px', top: -30 }} />
                  <Bar dataKey="income" name="Income" fill="#059669" radius={[2, 2, 0, 0]} maxBarSize={30} />
                  <Bar dataKey="expense" name="Expense" fill="#EF4444" radius={[2, 2, 0, 0]} maxBarSize={30} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Recent Vouchers List */}
        <div className="bg-white rounded-none shadow-sm border border-gray-200 flex flex-col h-[480px]">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-[15px] font-bold text-gray-800">Recent Vouchers</h2>
            <Link to="/accounts/day-book" className="text-xs text-blue-600 hover:underline">Day Book →</Link>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-left">
              <thead className="bg-[#1a202c] sticky top-0">
                <tr>
                  <th className="py-2.5 px-4 text-[10px] font-bold text-white uppercase tracking-wider">VOUCHER</th>
                  <th className="py-2.5 px-4 text-[10px] font-bold text-white uppercase tracking-wider text-center">DATE</th>
                  <th className="py-2.5 px-4 text-[10px] font-bold text-white uppercase tracking-wider text-right">AMOUNT</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {loading ? (
                  <tr><td colSpan="3" className="py-8 text-center text-gray-400">Loading vouchers...</td></tr>
                ) : vouchers.length === 0 ? (
                  <tr><td colSpan="3" className="py-8 text-center text-gray-400">No recent vouchers found.</td></tr>
                ) : vouchers.map((voucher, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex flex-col gap-1">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-none font-medium w-max ${
                          voucher.type === 'Receipt' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {voucher.type}
                        </span>
                        <span className="text-gray-400 text-[10px]">{voucher.id}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center text-gray-600 font-medium">{voucher.date}</td>
                    <td className="py-3 px-4 text-right font-bold text-gray-800">{voucher.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AccountsDashboard;
