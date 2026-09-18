import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Info, Zap, Search, Download, Printer, LayoutGrid, List as ListIcon, Grid,
  Users, FileText, CheckCircle, Tag, AlertCircle, Send, CreditCard, ChevronRight, PlusCircle, Filter, XCircle, FileDigit,
  Gauge, BookOpen, HandCoins, FileSearch, ArrowRightLeft, Globe, UserPlus, MoreHorizontal, MoreVertical,
  WalletCards, Percent, Hash, Receipt, Clock, HelpCircle, FilePlus, Copy, ArrowRight, Eye, Check
} from 'lucide-react';
import QuickSetupModal from '../../components/finance/QuickSetupModal';
import FinanceTabs from '../../components/finance/FinanceTabs';
import HowItWorksModal from '../../components/finance/HowItWorksModal';

const initialChallans = [
  { id: '1', challanNo: 'VCH/YIS/2026/00001', student: 'Krish Yadav', admissionNo: 'YISADM 012', class: 'Nursery (A)', type: 'Fee Payment', amount: 15000, dueDate: '20 Aug, 2026', status: 'Paid' },
  { id: '2', challanNo: 'VCH/YIS/2026/00002', student: 'Daksh Tiwari', admissionNo: 'YISADM 018', class: 'Nursery (A)', type: 'Fee Payment', amount: 2000, dueDate: '26 Aug, 2026', status: 'Paid' },
  { id: '3', challanNo: 'VCH/YIS/2026/00003', student: 'Raaj kumar Rai', admissionNo: 'YISADM 53', class: 'Class II (A)', type: 'Fee Payment', amount: 9000, dueDate: '26 Aug, 2026', status: 'Paid' },
  { id: '4', challanNo: 'VCH/YIS/2026/00004', student: 'Raaj kumar Rai', admissionNo: 'YISADM 53', class: 'Class II (A)', type: 'Fee Payment', amount: 2000, dueDate: '26 Aug, 2026', status: 'Paid' },
  { id: '5', challanNo: 'VCH/YIS/2026/00005', student: 'Diya Reddy', admissionNo: 'YISADM 007', class: 'Nursery (A)', type: 'Fee Payment', amount: 300, dueDate: '31 Aug, 2026', status: 'Paid' },
  { id: '6', challanNo: 'VCH/YIS/2026/00006', student: 'Amit Singh', admissionNo: 'YISADM 022', class: 'Class I (B)', type: 'Fee Payment', amount: 2000, dueDate: '05 Sep, 2026', status: 'Awaiting Payment' },
];

const FeeChallans = () => {
  const navigate = useNavigate();
  const [isQuickSetupOpen, setIsQuickSetupOpen] = useState(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);

  // Filters
  const [statusFilter, setStatusFilter] = useState('All');
  const [classFilter, setClassFilter] = useState('All Classes');
  const [studentSearch, setStudentSearch] = useState('');
  const [tableSearch, setTableSearch] = useState('');

  // Apply Search
  const [appliedSearch, setAppliedSearch] = useState({
    status: 'All',
    class: 'All Classes',
    student: ''
  });

  const handleSearch = () => {
    setAppliedSearch({
      status: statusFilter,
      class: classFilter,
      student: studentSearch
    });
  };

  const filteredChallans = useMemo(() => {
    return initialChallans.filter(c => {
      // Main Filter Bar
      if (appliedSearch.status !== 'All' && c.status !== appliedSearch.status) return false;
      if (appliedSearch.class !== 'All Classes' && !c.class.includes(appliedSearch.class)) return false;
      if (appliedSearch.student) {
        const q = appliedSearch.student.toLowerCase();
        if (!c.student.toLowerCase().includes(q) && !c.admissionNo.toLowerCase().includes(q)) return false;
      }

      // Table Search
      if (tableSearch) {
        const tq = tableSearch.toLowerCase();
        if (!c.challanNo.toLowerCase().includes(tq) && !c.student.toLowerCase().includes(tq) && !c.admissionNo.toLowerCase().includes(tq)) return false;
      }
      return true;
    });
  }, [appliedSearch, tableSearch]);

  // Export Functions
  const downloadCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "CHALLAN NO,STUDENT,ADMISSION NO,CLASS,TYPE,AMOUNT,DUE DATE,STATUS\n";
    filteredChallans.forEach(row => {
      csvContent += `${row.challanNo},${row.student},${row.admissionNo},${row.class},${row.type},${row.amount},${row.dueDate},${row.status}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "fee_challans.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = () => {
    let text = "CHALLAN NO\tSTUDENT\tADMISSION NO\tCLASS\tTYPE\tAMOUNT\tDUE DATE\tSTATUS\n";
    filteredChallans.forEach(row => {
      text += `${row.challanNo}\t${row.student}\t${row.admissionNo}\t${row.class}\t${row.type}\t${row.amount}\t${row.dueDate}\t${row.status}\n`;
    });
    navigator.clipboard.writeText(text).then(() => {
      alert("Table data copied to clipboard!");
    });
  };

  const printTable = () => {
    window.print();
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

      {/* Title & Actions Row */}
      <div className="flex justify-between items-center mb-4 print:hidden">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <FileText className="w-6 h-6" /> Fee Challans
        </h2>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsHowItWorksOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-none shadow-sm hover:bg-gray-50 transition-colors"
          >
            <HelpCircle className="w-4 h-4" /> How it Works
          </button>
          <button 
            onClick={() => navigate('/finance/generate-challan')}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-white bg-[#5a67d8] rounded-none shadow-sm hover:bg-[#4c51bf] transition-colors"
          >
            <FilePlus className="w-4 h-4" /> Generate Challan
          </button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white p-4 rounded-none shadow-sm border border-gray-200 mb-4 print:hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="col-span-1 md:col-span-3">
            <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1.5 tracking-wider">Status</label>
            <div className="relative">
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-none py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white text-gray-700"
              >
                <option value="All">All</option>
                <option value="Awaiting Payment">Awaiting Payment</option>
                <option value="Paid">Paid</option>
                <option value="Overdue">Overdue</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <ChevronRight className="w-4 h-4 rotate-90" />
              </div>
            </div>
          </div>
          <div className="col-span-1 md:col-span-3">
            <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1.5 tracking-wider">Class</label>
            <div className="relative">
              <select 
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-none py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white text-gray-700"
              >
                <option value="All Classes">All Classes</option>
                <option value="Nursery">Nursery</option>
                <option value="Class I">Class I</option>
                <option value="Class II">Class II</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <ChevronRight className="w-4 h-4 rotate-90" />
              </div>
            </div>
          </div>
          <div className="col-span-1 md:col-span-4">
            <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1.5 tracking-wider">Search Student</label>
            <input 
              type="text" 
              value={studentSearch}
              onChange={(e) => setStudentSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Name or Admission No..." 
              className="w-full border border-gray-300 rounded-none py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <button 
              onClick={handleSearch}
              className="w-full flex justify-center items-center gap-1.5 py-2 px-4 bg-[#5a67d8] hover:bg-[#4c51bf] text-white font-bold rounded-none shadow-sm transition-colors text-sm"
            >
              <Search className="w-4 h-4" /> Search
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 print:hidden">
        {/* Yellow Card */}
        <div className="bg-[#dca11d] rounded-none p-4 text-white relative overflow-hidden shadow-sm">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold">1</h3>
            <p className="text-sm font-bold mt-1">Awaiting Payment</p>
            <p className="text-xs opacity-90">₹2,000.00 outstanding</p>
            <button onClick={() => setStatusFilter('Awaiting Payment')} className="mt-3 flex items-center gap-1 text-[11px] font-bold hover:underline">
              View Pending <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <Clock className="w-20 h-20 absolute -right-4 -bottom-4 opacity-20 z-0" />
        </div>

        {/* Green Card */}
        <div className="bg-[#38a169] rounded-none p-4 text-white relative overflow-hidden shadow-sm">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold">4</h3>
            <p className="text-sm font-bold mt-1">Paid</p>
            <p className="text-xs opacity-90">₹21,300.00 collected</p>
            <button onClick={() => setStatusFilter('Paid')} className="mt-3 flex items-center gap-1 text-[11px] font-bold hover:underline">
              View Paid <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <CheckCircle className="w-20 h-20 absolute -right-4 -bottom-4 opacity-20 z-0" />
        </div>

        {/* Red Card */}
        <div className="bg-[#e53e3e] rounded-none p-4 text-white relative overflow-hidden shadow-sm">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold">0</h3>
            <p className="text-sm font-bold mt-1">Overdue</p>
            <p className="text-xs opacity-90">Past due date & unpaid</p>
            <button onClick={() => setStatusFilter('Overdue')} className="mt-3 flex items-center gap-1 text-[11px] font-bold hover:underline">
              Filter Overdue <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <AlertCircle className="w-20 h-20 absolute -right-4 -bottom-4 opacity-20 z-0" />
        </div>

        {/* Gray Card */}
        <div className="bg-[#718096] rounded-none p-4 text-white relative overflow-hidden shadow-sm">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold">0</h3>
            <p className="text-sm font-bold mt-1">Cancelled</p>
            <p className="text-xs opacity-90">Voided challans</p>
            <button onClick={() => setStatusFilter('Cancelled')} className="mt-3 flex items-center gap-1 text-[11px] font-bold hover:underline">
              View Cancelled <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <XCircle className="w-20 h-20 absolute -right-4 -bottom-4 opacity-20 z-0" />
        </div>
      </div>

      {/* Main Table Section */}
      <div className="bg-white rounded-none shadow-sm border border-gray-200 p-4">
        <h3 className="text-[14px] font-bold text-gray-800 flex items-center gap-1.5 mb-4">
          <FileText className="w-4 h-4 text-indigo-600" /> Fee Challans
        </h3>

        {/* Toolbars */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 print:hidden">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                Show 
                <select className="border border-gray-300 rounded-none p-1.5 focus:outline-none focus:border-indigo-500">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
            </div>
            <div className="flex gap-1">
              <button onClick={copyToClipboard} className="px-2.5 py-1.5 text-xs font-semibold border border-gray-300 text-gray-600 rounded-none hover:bg-gray-50 flex items-center gap-1 transition-colors"><Copy className="w-3.5 h-3.5"/> Copy</button>
              <button onClick={downloadCSV} className="px-2.5 py-1.5 text-xs font-semibold border border-gray-300 text-gray-600 rounded-none hover:bg-gray-50 transition-colors">CSV</button>
              <button onClick={downloadCSV} className="px-2.5 py-1.5 text-xs font-semibold border border-gray-300 text-gray-600 rounded-none hover:bg-gray-50 transition-colors">Excel</button>
              <button onClick={printTable} className="px-2.5 py-1.5 text-xs font-semibold border border-gray-300 text-gray-600 rounded-none hover:bg-gray-50 transition-colors">PDF</button>
              <button onClick={printTable} className="px-2.5 py-1.5 text-xs border border-gray-300 text-gray-600 rounded-none hover:bg-gray-50 transition-colors"><Printer className="w-3.5 h-3.5" /></button>
              <button className="px-2.5 py-1.5 text-xs font-semibold border border-gray-300 text-gray-600 rounded-none flex items-center gap-1 hover:bg-gray-50 transition-colors"><LayoutGrid className="w-3.5 h-3.5" /> Columns</button>
            </div>
          </div>
          
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-2" />
            <input 
              type="text" 
              value={tableSearch}
              onChange={(e) => setTableSearch(e.target.value)}
              placeholder="Search challans..." 
              className="border border-gray-300 rounded-none py-1.5 pl-8 pr-3 text-xs w-64 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" 
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-gray-200 rounded-none">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#f5f7fa] text-[#4a5568] uppercase font-bold text-[10px] tracking-wider border-b border-gray-200">
                <th className="p-3 border-r border-gray-200 text-center w-12">#</th>
                <th className="p-3 border-r border-gray-200">CHALLAN NO</th>
                <th className="p-3 border-r border-gray-200">STUDENT</th>
                <th className="p-3 border-r border-gray-200">ADMISSION NO</th>
                <th className="p-3 border-r border-gray-200">CLASS</th>
                <th className="p-3 border-r border-gray-200">TYPE</th>
                <th className="p-3 border-r border-gray-200 text-right">AMOUNT</th>
                <th className="p-3 border-r border-gray-200">DUE DATE</th>
                <th className="p-3 border-r border-gray-200 text-center">STATUS</th>
                <th className="p-3 text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-700">
              {filteredChallans.length > 0 ? filteredChallans.map((c, i) => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors font-medium">
                  <td className="p-3 border-r border-gray-200 text-center text-gray-500">{i + 1}</td>
                  <td className="p-3 border-r border-gray-200">{c.challanNo}</td>
                  <td className="p-3 border-r border-gray-200 text-gray-600">{c.student}</td>
                  <td className="p-3 border-r border-gray-200 text-gray-600">{c.admissionNo}</td>
                  <td className="p-3 border-r border-gray-200 text-gray-600">{c.class}</td>
                  <td className="p-3 border-r border-gray-200">
                    <span className="px-2 py-1 bg-teal-500 text-white text-[10px] font-bold rounded-none shadow-sm">
                      {c.type}
                    </span>
                  </td>
                  <td className="p-3 border-r border-gray-200 text-right text-gray-900 font-bold">₹{c.amount.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
                  <td className="p-3 border-r border-gray-200 text-gray-600">{c.dueDate}</td>
                  <td className="p-3 border-r border-gray-200 text-center">
                    {c.status === 'Paid' ? (
                      <span className="px-2 py-1 bg-[#48bb78] text-white text-[10px] font-bold rounded-none shadow-sm uppercase">Paid</span>
                    ) : c.status === 'Awaiting Payment' ? (
                      <span className="px-2 py-1 bg-[#ecc94b] text-white text-[10px] font-bold rounded-none shadow-sm uppercase">Awaiting</span>
                    ) : (
                      <span className="px-2 py-1 bg-gray-500 text-white text-[10px] font-bold rounded-none shadow-sm uppercase">{c.status}</span>
                    )}
                  </td>
                  <td className="p-3 text-center align-middle">
                    <div className="flex items-center justify-center gap-1">
                      <button 
                        onClick={() => navigate(`/finance/challan/${c.id}`)}
                        className="p-1.5 text-white bg-[#0bc5ea] rounded-none hover:bg-[#099ab7] transition-colors shadow-sm" 
                        title="View"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => navigate(`/finance/print-challan/${c.id}`)}
                        className="p-1.5 text-white bg-[#ecc94b] rounded-none hover:bg-[#d69e2e] transition-colors shadow-sm" 
                        title="Print"
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </button>
                      {c.status === 'Paid' && (
                         <button 
                           onClick={() => navigate(`/finance/receipt/${c.id}`)}
                           className="p-1.5 text-white bg-[#10b981] rounded-none hover:bg-[#059669] transition-colors shadow-sm" 
                           title="View Receipt"
                         >
                           <Receipt className="w-3.5 h-3.5" />
                         </button>
                      )}
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="10" className="p-6 text-center text-gray-500">
                    No challans found matching the criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination (Static for now) */}
        <div className="flex justify-between items-center mt-4 text-xs text-gray-500 print:hidden">
          <div>Showing 1 to {filteredChallans.length} of {filteredChallans.length} entries</div>
          <div className="flex gap-1">
            <button className="px-3 py-1.5 border border-gray-300 rounded-none text-gray-400 cursor-not-allowed bg-gray-50 font-medium">Previous</button>
            <button className="px-3 py-1.5 bg-[#5a67d8] text-white rounded-none font-medium shadow-sm">1</button>
            <button className="px-3 py-1.5 border border-gray-300 rounded-none hover:bg-gray-50 font-medium transition-colors">Next</button>
          </div>
        </div>

      </div>
      
      {/* Quick Setup Modal */}
      <QuickSetupModal isOpen={isQuickSetupOpen} onClose={() => setIsQuickSetupOpen(false)} />

      {/* How it Works Modal */}
      <HowItWorksModal 
        isOpen={isHowItWorksOpen} 
        onClose={() => setIsHowItWorksOpen(false)} 
        onGenerate={() => navigate('/finance/generate-challan')}
      />
    </div>
  );
};

export default FeeChallans;
