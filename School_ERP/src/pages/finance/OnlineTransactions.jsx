import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Info, Zap, Search, Download, Printer, LayoutGrid, List as ListIcon, 
  FileText, CheckCircle, AlertCircle, ChevronRight, Filter, XCircle,
  Gauge, BookOpen, HandCoins, FileSearch, ArrowRightLeft, Globe, UserPlus, 
  MoreHorizontal, WalletCards, Percent, Hash, Receipt, Clock, Ban, Copy, Check
} from 'lucide-react';
import QuickSetupModal from '../../components/finance/QuickSetupModal';
import FinanceTabs from '../../components/finance/FinanceTabs';

const OnlineTransactions = () => {
  const navigate = useNavigate();
  const [isQuickSetupOpen, setIsQuickSetupOpen] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

  // Modals state
  const [approveModalData, setApproveModalData] = useState(null);
  const [rejectModalData, setRejectModalData] = useState(null);

  const [transactions, setTransactions] = useState([
    { no: 1, orderId: 'FEE_44_1787254355', student: 'Kabir Singh', baseAmount: 100, totalAmount: 103.54, status: 'Pending', proof: '—', date: '21 Aug 2026 01:02 AM' },
    { no: 2, orderId: 'FEE_APP_5122_1787240752', student: 'Kabir Singh', baseAmount: 99, totalAmount: 102.50, status: 'Pending', proof: '—', date: '20 Aug 2026 09:15 PM' },
    { no: 3, orderId: 'FEE_363_1787240637', student: 'Rajesh Singh', baseAmount: 20000, totalAmount: 20708.00, status: 'Pending', proof: '—', date: '20 Aug 2026 09:13 PM' },
    { no: 4, orderId: 'FEE_APP_5122_1787227376', student: 'Kabir Singh', baseAmount: 99, totalAmount: 102.50, status: 'Pending', proof: '—', date: '20 Aug 2026 05:32 PM' },
    { no: 5, orderId: 'FEE_APP_5122_1787227367', student: 'Kabir Singh', baseAmount: 99, totalAmount: 102.50, status: 'Pending', proof: '—', date: '20 Aug 2026 05:32 PM' },
    { no: 6, orderId: 'FEE_APP_64_1787199038', student: 'Kabir Singh', baseAmount: 300, totalAmount: 310.62, status: 'Pending', proof: '—', date: '20 Aug 2026 09:40 AM' },
    { no: 7, orderId: 'FEE_44_1787183664', student: 'Kabir Singh', baseAmount: 100, totalAmount: 103.54, status: 'Pending', proof: '—', date: '20 Aug 2026 05:24 AM' },
    { no: 8, orderId: 'FEE_44_1787149369', student: 'Kabir Singh', baseAmount: 100, totalAmount: 103.54, status: 'Pending', proof: '—', date: '19 Aug 2026 07:52 PM' },
    { no: 9, orderId: 'FEE_44_1787131418', student: 'Kabir Singh', baseAmount: 100, totalAmount: 103.54, status: 'Pending', proof: '—', date: '19 Aug 2026 02:53 PM' },
    { no: 10, orderId: 'FEE_44_1787117850', student: 'Kabir Singh', baseAmount: 100, totalAmount: 103.54, status: 'Pending', proof: '—', date: '19 Aug 2026 11:07 AM' },
  ]);

  const handleApprove = (orderId) => {
    setTransactions(transactions.map(t => t.orderId === orderId ? { ...t, status: 'Approved' } : t));
    setApproveModalData(null);
  };

  const handleReject = (orderId) => {
    setTransactions(transactions.map(t => t.orderId === orderId ? { ...t, status: 'Rejected' } : t));
    setRejectModalData(null);
  };

  // Helper functions for exports
  const downloadCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "ORDER DETAILS,STUDENT,AMOUNT,TOTAL,STATUS,PROOF,DATE\n";
    transactions.forEach(row => {
      csvContent += `${row.orderId},${row.student},${row.baseAmount},${row.totalAmount},${row.status},${row.proof},"${row.date}"\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "online_transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = () => {
    let text = "ORDER DETAILS\tSTUDENT\tAMOUNT\tTOTAL\tSTATUS\tPROOF\tDATE\n";
    transactions.forEach(row => {
      text += `${row.orderId}\t${row.student}\t${row.baseAmount}\t${row.totalAmount}\t${row.status}\t${row.proof}\t${row.date}\n`;
    });
    navigator.clipboard.writeText(text).then(() => {
      alert("Table data copied to clipboard!");
    });
  };

  return (
    <div className="p-4 max-w-[1600px] mx-auto bg-gray-50 min-h-screen text-gray-800 pb-20">
      {/* Banner */}
      <div className="bg-[#009b9f] text-white p-2.5 rounded-none text-xs flex items-center gap-2 mb-4 print:hidden">
        <Info className="w-4 h-4 flex-shrink-0" />
        <p>
          <strong>New: academic-session scoping.</strong> Lists and dashboard numbers show the selected academic session only, so totals may look smaller than before — nothing was deleted. Use the session switcher in the top bar to view another year.
        </p>
      </div>

      {/* Header */}
      <div className="flex justify-between items-start mb-4 print:hidden">
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
      <FinanceTabs />

      {/* Content Area */}
      <div className="bg-white border border-gray-200 rounded-none shadow-sm p-4 print:border-none print:shadow-none print:p-0">
        <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-4">
           <h3 className="text-[15px] font-bold text-[#334155] flex items-center gap-2">
             <div className="bg-purple-100 p-1.5 rounded-none">
               <Globe className="w-4 h-4 text-purple-600" />
             </div>
             Payment Attempts & Verifications
           </h3>
           <div className="flex gap-1 bg-gray-100 p-1 rounded-none shadow-inner border border-gray-200 print:hidden">
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 print:hidden">
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
                <button onClick={copyToClipboard} className="px-2.5 py-1 text-xs font-medium border border-gray-200 text-gray-600 rounded-none hover:bg-gray-50 flex items-center gap-1.5"><Copy className="w-3.5 h-3.5"/> Copy</button>
                <button onClick={downloadCSV} className="px-2.5 py-1 text-xs font-medium border border-gray-200 text-gray-600 rounded-none hover:bg-gray-50">CSV</button>
                <button onClick={downloadCSV} className="px-2.5 py-1 text-xs font-medium border border-gray-200 text-gray-600 rounded-none hover:bg-gray-50">Excel</button>
                <button onClick={() => window.print()} className="px-2.5 py-1 text-xs font-medium border border-gray-200 text-gray-600 rounded-none hover:bg-gray-50">PDF</button>
                <button onClick={() => window.print()} className="px-2.5 py-1 text-xs border border-gray-200 text-gray-600 rounded-none hover:bg-gray-50"><Printer className="w-3.5 h-3.5" /></button>
                <button className="px-2.5 py-1 text-xs font-medium border border-gray-200 text-gray-600 rounded-none flex items-center gap-1 hover:bg-gray-50"><LayoutGrid className="w-3.5 h-3.5" /> Columns</button>
              </div>
           </div>
           
           <div className="relative">
             <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-2" />
             <input type="text" placeholder="Search payments..." className="border border-gray-300 rounded-none py-1.5 pl-8 pr-3 text-xs w-64 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" />
           </div>
        </div>

        {/* Content Area (Grid or List) */}
        {viewMode === 'list' ? (
          <div className="overflow-x-auto rounded-none border border-gray-200">
            <table className="w-full text-left text-[11px] border-collapse">
              <thead>
                <tr className="bg-[#f8f9fa] border-b border-gray-200 text-[#475569] uppercase font-bold tracking-wide">
                  <th className="p-3 border-r border-gray-100 text-center w-10">#</th>
                  <th className="p-3 border-r border-gray-100">Order Details <span className="text-gray-300 float-right">↑↓</span></th>
                  <th className="p-3 border-r border-gray-100">Student <span className="text-gray-300 float-right">↑↓</span></th>
                  <th className="p-3 border-r border-gray-100">Amount <span className="text-gray-300 float-right">↑↓</span></th>
                  <th className="p-3 border-r border-gray-100 text-center">Status <span className="text-gray-300 float-right">↑↓</span></th>
                  <th className="p-3 border-r border-gray-100 text-center">Proof <span className="text-gray-300 float-right">↑↓</span></th>
                  <th className="p-3 border-r border-gray-100">Date <span className="text-gray-300 float-right">↑↓</span></th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {transactions.map((t, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-3 border-r border-gray-100 text-center font-medium text-gray-500">{t.no}</td>
                    <td className="p-3 border-r border-gray-100 font-bold text-[#5c6eb1]">{t.orderId}</td>
                    <td className="p-3 border-r border-gray-100 font-medium text-gray-700">{t.student}</td>
                    <td className="p-3 border-r border-gray-100">
                      <div className="font-bold text-gray-900">₹{t.baseAmount.toLocaleString('en-IN', {minimumFractionDigits: 2})}</div>
                      <div className="text-[9px] text-gray-400">Total: ₹{t.totalAmount.toLocaleString('en-IN', {minimumFractionDigits: 2})}</div>
                    </td>
                    <td className="p-3 border-r border-gray-100 text-center">
                      <span className={`px-2.5 py-1 text-[10px] rounded-none border ${t.status === 'Pending' ? 'bg-gray-100 border-gray-200 text-gray-600' : t.status === 'Approved' ? 'bg-green-100 border-green-200 text-green-700' : 'bg-red-100 border-red-200 text-red-700'}`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="p-3 border-r border-gray-100 text-center text-gray-400 font-bold">
                      {t.proof}
                    </td>
                    <td className="p-3 border-r border-gray-100">
                      <div className="text-gray-700">{t.date.split(' ')[0]} {t.date.split(' ')[1]} {t.date.split(' ')[2]}</div>
                      <div className="text-[10px] text-gray-400">{t.date.split(' ')[3]} {t.date.split(' ')[4]}</div>
                    </td>
                    <td className="p-2 text-center align-middle">
                      {t.status === 'Pending' ? (
                        <div className="flex items-center justify-center gap-2">
                           <button 
                             title="Approve Payment"
                             onClick={() => setApproveModalData(t)}
                             className="p-1 text-green-600 bg-green-50 border border-green-200 rounded-none hover:bg-green-100 transition-colors"
                           >
                             <Check className="w-3.5 h-3.5 font-bold" />
                           </button>
                           <button 
                             title="Reject Payment"
                             onClick={() => setRejectModalData(t)}
                             className="p-1 text-red-600 bg-red-50 border border-red-200 rounded-none hover:bg-red-100 transition-colors"
                           >
                             <Ban className="w-3.5 h-3.5" />
                           </button>
                        </div>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
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
                <div className="p-3 border-b border-gray-100 flex justify-between items-center bg-[#f8f9fa]">
                  <div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase mb-0.5">Order Details</p>
                    <p className="text-xs font-bold text-[#5c6eb1] break-all">{t.orderId}</p>
                  </div>
                  <div>
                    <span className={`px-2 py-1 text-[10px] rounded-none border ${t.status === 'Pending' ? 'bg-gray-100 border-gray-200 text-gray-600' : t.status === 'Approved' ? 'bg-green-100 border-green-200 text-green-700' : 'bg-red-100 border-red-200 text-red-700'}`}>
                      {t.status}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                       <p className="text-[10px] text-gray-500 font-semibold mb-0.5">Student</p>
                       <p className="text-sm font-bold text-gray-800">{t.student}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] text-gray-500 font-semibold mb-0.5">Proof</p>
                       <p className="text-xs font-medium text-gray-400">{t.proof}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 bg-gray-50 p-2 rounded-none mb-3 border border-gray-100">
                     <div className="text-center border-r border-gray-200">
                        <p className="text-[9px] text-gray-500 uppercase font-bold mb-1">Base Amount</p>
                        <p className="text-xs font-bold text-gray-900">₹{t.baseAmount.toLocaleString('en-IN', {minimumFractionDigits: 2})}</p>
                     </div>
                     <div className="text-center">
                        <p className="text-[9px] text-indigo-600 uppercase font-bold mb-1">Total</p>
                        <p className="text-xs font-bold text-indigo-700">₹{t.totalAmount.toLocaleString('en-IN', {minimumFractionDigits: 2})}</p>
                     </div>
                  </div>

                  <div className="flex justify-between items-center mt-2 border-t border-gray-100 pt-3">
                    <p className="text-[10px] text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" /> {t.date}</p>
                    <div className="flex items-center justify-center gap-2">
                         {t.status === 'Pending' ? (
                           <>
                             <button 
                               title="Approve Payment"
                               onClick={() => setApproveModalData(t)}
                               className="p-1.5 text-green-600 bg-green-50 border border-green-200 rounded-none hover:bg-green-100 transition-colors"
                             >
                               <Check className="w-3.5 h-3.5 font-bold" />
                             </button>
                             <button 
                               title="Reject Payment"
                               onClick={() => setRejectModalData(t)}
                               className="p-1.5 text-red-600 bg-red-50 border border-red-200 rounded-none hover:bg-red-100 transition-colors"
                             >
                               <Ban className="w-3.5 h-3.5" />
                             </button>
                           </>
                         ) : (
                            <span className="text-gray-400 text-xs px-2">—</span>
                         )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-xs text-gray-500 print:hidden">
          <div>Showing 1-10 of 42</div>
          <div className="flex items-center gap-1 font-medium">
            <button className="px-3 py-1.5 border border-gray-200 rounded-none text-gray-400 cursor-not-allowed bg-gray-50">Previous</button>
            <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-none shadow-sm">1</button>
            <button className="px-3 py-1.5 border border-gray-200 rounded-none hover:bg-gray-50 transition-colors">2</button>
            <button className="px-3 py-1.5 border border-gray-200 rounded-none hover:bg-gray-50 transition-colors">3</button>
            <span className="px-2">...</span>
            <button className="px-3 py-1.5 border border-gray-200 rounded-none hover:bg-gray-50 transition-colors">Next</button>
          </div>
        </div>
      </div>
      
      <QuickSetupModal isOpen={isQuickSetupOpen} onClose={() => setIsQuickSetupOpen(false)} />

      {/* Approve Modal */}
      {approveModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-none shadow-xl w-full max-w-md overflow-hidden">
            <div className="bg-[#28a745] text-white p-3 flex justify-between items-center">
              <h3 className="font-bold flex items-center gap-2"><CheckCircle className="w-5 h-5" /> Approve Payment</h3>
              <button onClick={() => setApproveModalData(null)} className="text-white hover:text-green-200"><XCircle className="w-5 h-5" /></button>
            </div>
            <div className="p-5">
              <div className="bg-indigo-50/50 border border-indigo-100 rounded-none p-3 mb-5">
                 <p className="text-indigo-800 text-sm font-semibold mb-1">Amount: <span className="font-normal">₹{approveModalData.totalAmount.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span></p>
                 <p className="text-indigo-800 text-sm font-semibold">Order ID: <span className="font-normal">{approveModalData.orderId}</span></p>
              </div>
              
              <div className="mb-2">
                <label className="block text-xs font-bold text-[#343a40] mb-1.5">Transaction ID / UTR <span className="text-red-500">*</span></label>
                <input type="text" className="w-full border border-gray-300 rounded-none p-2 text-sm focus:outline-none focus:border-[#28a745]" />
              </div>
              <p className="text-xs text-gray-500 mb-6">Ensure this matches your bank statement.</p>
              
              <div className="flex justify-end gap-2 border-t border-gray-100 pt-4 mt-2">
                <button onClick={() => setApproveModalData(null)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-none text-sm font-medium hover:bg-gray-50">Cancel</button>
                <button onClick={() => handleApprove(approveModalData.orderId)} className="px-4 py-2 bg-[#28a745] text-white rounded-none text-sm font-bold flex items-center gap-1.5 hover:bg-[#218838]">
                  <Check className="w-4 h-4 font-bold" /> Confirm & Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {rejectModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-[#dc3545] rounded-none shadow-xl w-full max-w-md overflow-hidden">
            <div className="text-white p-3 flex justify-between items-center border-b border-red-700">
              <h3 className="font-bold flex items-center gap-2"><Ban className="w-5 h-5" /> Reject Payment</h3>
              <button onClick={() => setRejectModalData(null)} className="text-white hover:text-red-200"><XCircle className="w-5 h-5" /></button>
            </div>
            <div className="p-5 bg-white">
              <p className="text-[#dc3545] font-bold text-sm mb-5">Are you sure you want to reject this payment?</p>
              
              <div className="mb-6">
                <label className="block text-xs font-bold text-[#343a40] mb-1.5">Reason for Rejection <span className="text-red-500">*</span></label>
                <textarea rows="3" placeholder="e.g. Invalid screenshot, Amount mismatch, Duplicate entry..." className="w-full border border-gray-300 rounded-none p-2 text-sm focus:outline-none focus:border-[#dc3545] resize-none"></textarea>
              </div>
              
              <div className="flex justify-end gap-2 border-t border-gray-100 pt-4">
                <button onClick={() => setRejectModalData(null)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-none text-sm font-medium hover:bg-gray-50">Cancel</button>
                <button onClick={() => handleReject(rejectModalData.orderId)} className="px-4 py-2 bg-[#dc3545] text-white rounded-none text-sm font-bold flex items-center gap-1.5 hover:bg-[#c82333]">
                  <XCircle className="w-4 h-4 font-bold" /> Reject Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnlineTransactions;
