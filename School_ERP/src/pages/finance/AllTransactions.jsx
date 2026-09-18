import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Info, Zap, Search, Download, Printer, LayoutGrid, List as ListIcon, Grid,
  Users, FileText, CheckCircle, Tag, AlertCircle, Send, CreditCard, ChevronRight, PlusCircle, Filter, XCircle, FileDigit,
  Gauge, BookOpen, HandCoins, FileSearch, ArrowRightLeft, Globe, UserPlus, MoreHorizontal, MoreVertical
} from 'lucide-react';
import QuickSetupModal from '../../components/finance/QuickSetupModal';
import FinanceTabs from '../../components/finance/FinanceTabs';
import { feeCollectionService } from '../../api/feeCollectionService';

const AllTransactions = () => {
  const navigate = useNavigate();
  const [isQuickSetupOpen, setIsQuickSetupOpen] = useState(false);
  const [viewMode, setViewMode] = useState('list');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const fetchTransactions = async (params = {}) => {
    try {
      setLoading(true);
      const res = await feeCollectionService.getAllTransactions(params);
      const mapped = (res.data || []).map((t, i) => ({
        no: i + 1,
        orderId: t.receiptNo || t._id,
        student: `${t.student?.firstName || ''} ${t.student?.lastName || ''}`.trim() || 'N/A',
        mode: t.paymentMode || 'Cash',
        amount: t.amount || 0,
        gateway: t.gatewayCharge || 0,
        total: (t.amount || 0) + (t.gatewayCharge || 0),
        status: t.status || 'Success',
        date: t.createdAt ? new Date(t.createdAt).toLocaleString() : 'N/A',
        _id: t._id
      }));
      setTransactions(mapped);
    } catch (err) {
      console.error('Failed to load transactions:', err);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTransactions(); }, []);

  return (
    <div className="p-4 max-w-[1600px] mx-auto bg-gray-50 min-h-screen text-gray-800 pb-20">
      {/* Banner */}
      <div className="bg-[#009b9f] text-white p-2.5 rounded-none text-xs flex items-center gap-2 mb-4">
        <Info className="w-4 h-4 flex-shrink-0" />
        <p>
          <strong>New: academic-session scoping.</strong> Lists and dashboard numbers show the selected academic session only, so totals may look smaller than before — nothing was deleted. Use the session switcher in the top bar to view another year.
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
        </div>
      </div>

      {/* Tabs */}
      {/* Tabs */}
      <FinanceTabs />

      {/* Date Filters */}
      <div className="bg-white border border-gray-200 rounded-none shadow-sm p-4 mb-4">
        <div className="flex items-end gap-4">
          <div className="w-48">
            <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-1.5">From</label>
            <input type="date" className="w-full border border-gray-200 rounded-none p-2 text-xs text-gray-700 focus:outline-none focus:border-indigo-500" />
          </div>
          <div className="w-48">
            <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-1.5">To</label>
            <input type="date" className="w-full border border-gray-200 rounded-none p-2 text-xs text-gray-700 focus:outline-none focus:border-indigo-500" />
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => fetchTransactions({ from: dateFrom, to: dateTo })}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold py-2 px-4 rounded-none flex items-center gap-1.5 shadow-sm"
            >
              <Filter className="w-3.5 h-3.5" /> Filter
            </button>
            <button 
              onClick={() => { setDateFrom(''); setDateTo(''); fetchTransactions(); }}
              className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-600 text-xs font-semibold py-2 px-4 rounded-none flex items-center gap-1.5 shadow-sm"
            >
              <XCircle className="w-3.5 h-3.5" /> Clear
            </button>
          </div>
        </div>
      </div>

      {/* List Table Area */}
      <div className="bg-white border border-gray-200 rounded-none shadow-sm p-4">
        <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-4">
           <h3 className="text-[14px] font-bold text-[#334155] flex items-center gap-1.5">
             <ArrowRightLeft className="w-4 h-4 text-indigo-500" /> All Fee Transactions
           </h3>
           <div className="flex gap-1 bg-gray-100 p-1 rounded-none shadow-inner border border-gray-200">
              <button 
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-none transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <ListIcon className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-none transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
           </div>
        </div>
        
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
           <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                 Show 
                 <select className="border border-gray-200 rounded-none p-1.5 focus:outline-none focus:border-indigo-500">
                   <option>10</option>
                   <option>25</option>
                   <option>50</option>
                 </select>
              </div>
              <div className="flex gap-1.5">
                <button className="px-2.5 py-1 text-xs font-medium border border-gray-200 text-gray-600 rounded-none hover:bg-gray-50">Copy</button>
                <button className="px-2.5 py-1 text-xs font-medium border border-gray-200 text-gray-600 rounded-none hover:bg-gray-50">CSV</button>
                <button className="px-2.5 py-1 text-xs font-medium border border-gray-200 text-gray-600 rounded-none hover:bg-gray-50">Excel</button>
                <button className="px-2.5 py-1 text-xs font-medium border border-gray-200 text-gray-600 rounded-none hover:bg-gray-50">PDF</button>
                <button className="px-2.5 py-1 text-xs border border-gray-200 text-gray-600 rounded-none hover:bg-gray-50"><Printer className="w-3.5 h-3.5" /></button>
                <button className="px-2.5 py-1 text-xs font-medium border border-gray-200 text-gray-600 rounded-none flex items-center gap-1 hover:bg-gray-50"><LayoutGrid className="w-3.5 h-3.5" /> Columns</button>
              </div>
           </div>
           
           <div className="relative">
             <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-2" />
             <input type="text" placeholder="Search transactions..." className="border border-gray-300 rounded-none py-1.5 pl-8 pr-3 text-xs w-64 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" />
           </div>
        </div>

        {/* Content Area (Grid or List) */}
        {viewMode === 'list' ? (
          <div className="overflow-x-auto rounded-none border border-gray-200">
            <table className="w-full text-left text-[11px] border-collapse">
              <thead>
                <tr className="bg-indigo-50/50 border-b border-gray-200 text-[#475569] uppercase font-bold tracking-wide">
                  <th className="p-3 border-r border-gray-100 text-center w-10">#</th>
                  <th className="p-3 border-r border-gray-100">Order ID / Receipt # <span className="text-gray-300 float-right">↑↓</span></th>
                  <th className="p-3 border-r border-gray-100">Student <span className="text-gray-300 float-right">↑↓</span></th>
                  <th className="p-3 border-r border-gray-100">Payment Mode <span className="text-gray-300 float-right">↑↓</span></th>
                  <th className="p-3 border-r border-gray-100 text-right">Amount <span className="text-gray-300 float-right">↑↓</span></th>
                  <th className="p-3 border-r border-gray-100 text-right">Gateway Charge <span className="text-gray-300 float-right">↑↓</span></th>
                  <th className="p-3 border-r border-gray-100 text-right">Total Paid <span className="text-gray-300 float-right">↑↓</span></th>
                  <th className="p-3 border-r border-gray-100 text-center">Status <span className="text-gray-300 float-right">↑↓</span></th>
                  <th className="p-3 border-r border-gray-100">Date <span className="text-gray-300 float-right">↑↓</span></th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {loading ? (
                  <tr><td colSpan="10" className="p-6 text-center text-gray-500 font-semibold">Loading transactions from database...</td></tr>
                ) : transactions.length === 0 ? (
                  <tr><td colSpan="10" className="p-6 text-center text-gray-400 font-medium">No transactions found.</td></tr>
                ) : transactions.map((t, i) => (
                  <tr key={i} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="p-3 border-r border-gray-100 text-center font-medium text-gray-500">{t.no}</td>
                    <td className="p-3 border-r border-gray-100 font-medium text-gray-900">{t.orderId}</td>
                    <td className="p-3 border-r border-gray-100 text-indigo-600 font-medium">{t.student}</td>
                    <td className="p-3 border-r border-gray-100">{t.mode}</td>
                    <td className="p-3 border-r border-gray-100 text-right">₹{t.amount.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
                    <td className="p-3 border-r border-gray-100 text-right">₹{t.gateway.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
                    <td className="p-3 border-r border-gray-100 text-right font-bold text-gray-900">₹{t.total.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
                    <td className="p-3 border-r border-gray-100 text-center">
                      {t.status === 'Success' ? (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[9px] font-bold rounded-none uppercase">Success</span>
                      ) : (
                        <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-[9px] font-bold rounded-none uppercase">Pending</span>
                      )}
                    </td>
                    <td className="p-3 border-r border-gray-100 text-gray-500">{t.date}</td>
                    <td className="p-2 text-center align-middle">
                      <div className="flex items-center justify-center gap-1.5">
                        {t.status === 'Success' && (
                           <button 
                             onClick={() => navigate(`/finance/receipt/${t._id}`)}
                             title="View Receipt"
                             className="p-1.5 text-white bg-indigo-500 rounded-none hover:bg-indigo-600 transition-colors shadow-sm"
                           >
                             <FileDigit className="w-3.5 h-3.5" />
                           </button>
                        )}
                        <button 
                          title="Send via WhatsApp"
                          className="p-1.5 text-green-600 bg-green-50 border border-green-200 rounded-none hover:bg-green-100 transition-colors shadow-sm"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {transactions.map((t, i) => (
              <div key={i} className="border border-gray-200 rounded-none shadow-sm hover:shadow-md transition-shadow bg-white overflow-hidden">
                <div className="p-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase mb-0.5">Order ID / Receipt #</p>
                    <p className="text-xs font-bold text-gray-900">{t.orderId}</p>
                  </div>
                  <div>
                    {t.status === 'Success' ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-none uppercase shadow-sm">Success</span>
                    ) : (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-[10px] font-bold rounded-none uppercase shadow-sm">Pending</span>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                       <p className="text-[10px] text-gray-500 font-semibold mb-0.5">Student</p>
                       <p className="text-sm font-bold text-indigo-600">{t.student}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] text-gray-500 font-semibold mb-0.5">Payment Mode</p>
                       <p className="text-xs font-medium text-gray-700">{t.mode}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 bg-gray-50 p-2 rounded-none mb-3 border border-gray-100">
                     <div className="text-center border-r border-gray-200">
                        <p className="text-[9px] text-gray-500 uppercase font-bold mb-1">Amount</p>
                        <p className="text-xs font-semibold text-gray-700">₹{t.amount.toLocaleString('en-IN')}</p>
                     </div>
                     <div className="text-center border-r border-gray-200">
                        <p className="text-[9px] text-gray-500 uppercase font-bold mb-1">Gateway</p>
                        <p className="text-xs font-semibold text-gray-700">₹{t.gateway.toLocaleString('en-IN', {minimumFractionDigits: 2})}</p>
                     </div>
                     <div className="text-center">
                        <p className="text-[9px] text-indigo-600 uppercase font-bold mb-1">Total</p>
                        <p className="text-xs font-bold text-gray-900">₹{t.total.toLocaleString('en-IN', {minimumFractionDigits: 2})}</p>
                     </div>
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <p className="text-[10px] text-gray-500 flex items-center gap-1"><Info className="w-3 h-3" /> {t.date}</p>
                    <div className="flex gap-2">
                        {t.status === 'Success' && (
                           <button 
                             onClick={() => navigate(`/finance/receipt/${t.orderId}`)}
                             title="View Receipt"
                             className="p-1.5 text-white bg-indigo-500 rounded-none hover:bg-indigo-600 transition-colors shadow-sm"
                           >
                             <FileDigit className="w-3.5 h-3.5" />
                           </button>
                        )}
                        <button 
                          onClick={() => window.open(`https://wa.me/?text=Hello parent of ${t.student}, your transaction ${t.orderId} is ${t.status}.`, '_blank')}
                          title="Send via WhatsApp"
                          className="p-1.5 text-green-600 bg-green-50 border border-green-200 rounded-none hover:bg-green-100 transition-colors shadow-sm"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
          <div>Showing {transactions.length} records</div>
          <div className="flex items-center gap-1 font-medium">
            <button className="px-3 py-1.5 border border-gray-200 rounded-none text-gray-400 cursor-not-allowed bg-gray-50">Previous</button>
            <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-none shadow-sm">1</button>
            <button className="px-3 py-1.5 border border-gray-200 rounded-none hover:bg-gray-50 transition-colors">2</button>
            <button className="px-3 py-1.5 border border-gray-200 rounded-none hover:bg-gray-50 transition-colors">3</button>
            <button className="px-3 py-1.5 border border-gray-200 rounded-none hover:bg-gray-50 transition-colors">4</button>
            <button className="px-3 py-1.5 border border-gray-200 rounded-none hover:bg-gray-50 transition-colors">5</button>
            <span className="px-2">...</span>
            <button className="px-3 py-1.5 border border-gray-200 rounded-none hover:bg-gray-50 transition-colors">25</button>
            <button className="px-3 py-1.5 border border-gray-200 rounded-none hover:bg-gray-50 transition-colors">Next</button>
          </div>
        </div>
      </div>
      
      <QuickSetupModal isOpen={isQuickSetupOpen} onClose={() => setIsQuickSetupOpen(false)} />
    </div>
  );
};

export default AllTransactions;
