import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Info, Settings, Search, History, RefreshCcw, 
  FileText, Printer, Columns, ChevronDown, List, Grid
} from 'lucide-react';
import QuickSetupModal from '../../components/finance/QuickSetupModal';
import FinanceTabs from '../../components/finance/FinanceTabs';

const DueSlipHistory = () => {
  const [isQuickSetupOpen, setIsQuickSetupOpen] = useState(false);

  // Filter States
  const [filterMonth, setFilterMonth] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [filterClass, setFilterClass] = useState('');
  const [filterSection, setFilterSection] = useState('');

  // Applied Filters (so filter only applies on clicking "Filter")
  const [appliedFilters, setAppliedFilters] = useState({
    month: '', year: '', class: '', section: ''
  });

  // Mock data for the table
  const slipsData = [
    { id: 1, code: 'DS-000054', student: 'Fatima Tiwari', admission: 'YISADM-060', classSec: 'Class I - A', month: 'December', year: '2026', basis: 'Till Month', prevDue: '₹37,000.00', currDue: '₹0.00', totalDue: '₹37,000.00', generated: '28 Feb 2026 23:50' },
    { id: 2, code: 'DS-000055', student: 'Rohan Pandey', admission: 'YISADM-043', classSec: 'Class I - A', month: 'December', year: '2026', basis: 'Till Month', prevDue: '₹37,000.00', currDue: '₹0.00', totalDue: '₹37,000.00', generated: '28 Feb 2026 23:50' },
    { id: 3, code: 'DS-000056', student: 'Priya Malhotra', admission: 'YISADM-044', classSec: 'Class I - A', month: 'December', year: '2026', basis: 'Till Month', prevDue: '₹37,000.00', currDue: '₹0.00', totalDue: '₹37,000.00', generated: '28 Feb 2026 23:50' },
    { id: 4, code: 'DS-000057', student: 'Rudra Chauhan', admission: 'YISADM-045', classSec: 'Class I - B', month: 'December', year: '2026', basis: 'Till Month', prevDue: '₹37,000.00', currDue: '₹0.00', totalDue: '₹37,000.00', generated: '28 Feb 2026 23:50' },
    { id: 5, code: 'DS-000059', student: 'Sai Pillai', admission: 'YISADM-047', classSec: 'Class II - A', month: 'January', year: '2026', basis: 'Till Month', prevDue: '₹37,000.00', currDue: '₹0.00', totalDue: '₹37,000.00', generated: '28 Jan 2026 14:10' },
    { id: 6, code: 'DS-000060', student: 'Ruchi Thakur', admission: 'YISADM-048', classSec: 'Class II - A', month: 'January', year: '2026', basis: 'Till Month', prevDue: '₹37,000.00', currDue: '₹0.00', totalDue: '₹37,000.00', generated: '28 Jan 2026 14:10' },
    { id: 7, code: 'DS-000061', student: 'Samarth Gowda', admission: 'YISADM-049', classSec: 'Class II - B', month: 'February', year: '2026', basis: 'Till Month', prevDue: '₹37,000.00', currDue: '₹0.00', totalDue: '₹37,000.00', generated: '28 Feb 2026 10:05' },
    { id: 8, code: 'DS-000058', student: 'Sneha Bhatia', admission: 'YISADM-046', classSec: 'Class II - B', month: 'February', year: '2026', basis: 'Till Month', prevDue: '₹37,000.00', currDue: '₹0.00', totalDue: '₹37,000.00', generated: '28 Feb 2026 10:05' },
    { id: 9, code: 'DS-000043', student: 'Swati Mishra', admission: 'YISADM-050', classSec: 'Class III - A', month: 'March', year: '2025', basis: 'Till Month', prevDue: '₹37,000.00', currDue: '₹0.00', totalDue: '₹37,000.00', generated: '28 Mar 2025 09:30' },
    { id: 10, code: 'DS-000046', student: 'Yash Singh', admission: 'YISADM-053', classSec: 'Class III - A', month: 'March', year: '2025', basis: 'Till Month', prevDue: '₹37,000.00', currDue: '₹0.00', totalDue: '₹37,000.00', generated: '28 Mar 2025 09:30' },
  ];

  // Filtering Logic
  const filteredData = useMemo(() => {
    return slipsData.filter(item => {
      let match = true;
      if (appliedFilters.month && item.month !== appliedFilters.month) match = false;
      if (appliedFilters.year && item.year !== appliedFilters.year) match = false;
      if (appliedFilters.class && !item.classSec.includes(appliedFilters.class)) match = false;
      if (appliedFilters.section && !item.classSec.includes(`- ${appliedFilters.section}`)) match = false;
      return match;
    });
  }, [appliedFilters]);

  const handleFilter = () => {
    setAppliedFilters({
      month: filterMonth,
      year: filterYear,
      class: filterClass,
      section: filterSection
    });
  };

  const handleReset = () => {
    setFilterMonth('');
    setFilterYear('');
    setFilterClass('');
    setFilterSection('');
    setAppliedFilters({ month: '', year: '', class: '', section: '' });
  };

  const exportToCSV = () => {
    if (filteredData.length === 0) {
      alert("No data to export!");
      return;
    }
    const headers = ["SLIP CODE", "STUDENT", "ADMISSION NO", "CLASS & SECTION", "MONTH", "BASIS", "PREVIOUS DUE", "CURRENT DUE", "TOTAL DUE", "GENERATED ON"];
    const rows = filteredData.map(row => [
      row.code, 
      row.student, 
      row.admission, 
      row.classSec, 
      `${row.month} ${row.year}`, 
      row.basis, 
      row.prevDue.replace('₹', '').replace(/,/g, ''), 
      row.currDue.replace('₹', '').replace(/,/g, ''), 
      row.totalDue.replace('₹', '').replace(/,/g, ''), 
      row.generated
    ]);
    
    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(e => e.join(",")).join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "due_slips_history.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    // Basic browser print acting as PDF export
    window.print();
  };

  return (
    <div className="p-4 max-w-[1600px] mx-auto bg-gray-50 min-h-screen text-gray-800 pb-20 print:bg-white print:p-0">
      {/* Banner */}
      <div className="bg-[#009b9f] text-white p-2.5 rounded-none text-xs flex items-center gap-2 mb-4 shadow-sm print:hidden">
        <Info className="w-5 h-5 flex-shrink-0" />
        <p>
          <strong>New: academic-session scoping.</strong> Lists and dashboard numbers (students, exams, assessments, homework, notices...) now show the <em>selected academic session</em> only, so totals may look smaller than before — nothing was deleted. Use the session switcher in the top bar to view another year, the "View all sessions" button on lists to see everything, and note that money totals marked "(All Years)" still include every session.
        </p>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-2 print:hidden">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Finance & Fees</h1>
          <p className="text-[11px] text-gray-500">Manage fee types, groups, collection, challans, and reports across the school.</p>
        </div>
        <button 
          onClick={() => setIsQuickSetupOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-none shadow-sm hover:bg-gray-50 transition-colors"
        >
          <Settings className="w-3.5 h-3.5" /> Quick Setup
        </button>
      </div>

      {/* Tabs */}
      {/* Tabs */}
      <FinanceTabs />

      {/* Filters Card */}
      <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden mb-6 print:hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">MONTH</label>
              <select 
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
                className="w-full border border-gray-300 rounded-none text-[12px] px-3 py-1.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#5b5bcf] focus:border-[#5b5bcf]"
              >
                <option value="">-- All --</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="December">December</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">YEAR</label>
              <select 
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                className="w-full border border-gray-300 rounded-none text-[12px] px-3 py-1.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#5b5bcf] focus:border-[#5b5bcf]"
              >
                <option value="">-- All --</option>
                <option value="2026">2026</option>
                <option value="2025">2025</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">CLASS</label>
              <select 
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
                className="w-full border border-gray-300 rounded-none text-[12px] px-3 py-1.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#5b5bcf] focus:border-[#5b5bcf]"
              >
                <option value="">-- All Classes --</option>
                <option value="Class I">Class I</option>
                <option value="Class II">Class II</option>
                <option value="Class III">Class III</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">SECTION</label>
              <select 
                value={filterSection}
                onChange={(e) => setFilterSection(e.target.value)}
                className="w-full border border-gray-300 rounded-none text-[12px] px-3 py-1.5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#5b5bcf] focus:border-[#5b5bcf]"
              >
                <option value="">-- All Sections --</option>
                <option value="A">A</option>
                <option value="B">B</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-gray-50 flex gap-3">
          <button 
            onClick={handleFilter}
            className="flex items-center gap-1.5 bg-[#5b5bcf] hover:bg-blue-700 text-white px-5 py-1.5 rounded-none text-[12px] font-semibold transition-colors shadow-sm"
          >
            <Search className="w-3.5 h-3.5" /> Filter
          </button>
          <button 
            onClick={handleReset}
            className="flex items-center gap-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-5 py-1.5 rounded-none text-[12px] font-semibold transition-colors shadow-sm"
          >
            <RefreshCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden print:border-none print:shadow-none">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center print:hidden">
          <h2 className="text-[15px] font-bold text-[#5b5bcf] flex items-center gap-2">
            <History className="w-4 h-4" /> Generated Due Slips
          </h2>
          <div className="flex bg-gray-100 rounded-none p-0.5">
            <button className="p-1 bg-white shadow-sm rounded-none text-gray-700"><List className="w-4 h-4" /></button>
            <button className="p-1 text-gray-500 hover:text-gray-700"><Grid className="w-4 h-4" /></button>
          </div>
        </div>

        <div className="p-4 border-b border-gray-200 print:hidden">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Show</span>
              <select className="border border-gray-300 rounded-none text-xs px-2 py-1 text-gray-700 focus:outline-none focus:border-blue-500">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              <div className="flex bg-white rounded-none border border-gray-300 overflow-hidden ml-2">
                <button className="px-2 py-1 text-gray-600 hover:bg-gray-50 border-r border-gray-300 transition-colors" title="Copy">
                  <FileText className="w-3.5 h-3.5" />
                </button>
                <button onClick={exportToCSV} className="px-2.5 py-1 text-[11px] font-medium text-gray-600 hover:bg-gray-50 border-r border-gray-300 transition-colors" title="CSV">
                  CSV
                </button>
                <button className="px-2.5 py-1 text-[11px] font-medium text-gray-600 hover:bg-gray-50 border-r border-gray-300 transition-colors" title="Excel">
                  Excel
                </button>
                <button onClick={exportToPDF} className="px-2.5 py-1 text-[11px] font-medium text-gray-600 hover:bg-gray-50 border-r border-gray-300 transition-colors" title="PDF">
                  PDF
                </button>
                <button onClick={exportToPDF} className="px-2 py-1 text-gray-600 hover:bg-gray-50 border-r border-gray-300 transition-colors" title="Print">
                  <Printer className="w-3.5 h-3.5" />
                </button>
                <button className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                  <Columns className="w-3 h-3" /> Columns <ChevronDown className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>
            
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search due slips..." 
                className="border border-gray-300 rounded-none text-xs pl-3 pr-8 py-1.5 w-64 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Print Only Header */}
        <div className="hidden print:block p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-center">Due Slips History Report</h2>
          <p className="text-sm text-center text-gray-500">Generated on {new Date().toLocaleDateString()}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f8f9fc] text-[9px] font-bold text-[#5b5bcf] uppercase tracking-wider border-b border-gray-200 print:bg-gray-100">
                <th className="p-3 border-r border-gray-100 text-center print:border-gray-300">#</th>
                <th className="p-3 border-r border-gray-100 print:border-gray-300">SLIP CODE</th>
                <th className="p-3 border-r border-gray-100 print:border-gray-300">STUDENT</th>
                <th className="p-3 border-r border-gray-100 print:border-gray-300">ADMISSION NO</th>
                <th className="p-3 border-r border-gray-100 print:border-gray-300">CLASS & SECTION</th>
                <th className="p-3 border-r border-gray-100 print:border-gray-300">MONTH</th>
                <th className="p-3 border-r border-gray-100 print:border-gray-300">BASIS</th>
                <th className="p-3 border-r border-gray-100 text-right print:border-gray-300">PREVIOUS DUE</th>
                <th className="p-3 border-r border-gray-100 text-right print:border-gray-300">CURRENT DUE</th>
                <th className="p-3 border-r border-gray-100 text-right print:border-gray-300">TOTAL DUE</th>
                <th className="p-3 print:border-gray-300">GENERATED ON</th>
              </tr>
            </thead>
            <tbody className="text-[11px]">
              {filteredData.length > 0 ? (
                filteredData.map((row, index) => (
                  <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors print:border-gray-300">
                    <td className="p-3 border-r border-gray-100 text-center text-gray-500 print:border-gray-300">{index + 1}</td>
                    <td className="p-3 border-r border-gray-100 text-gray-600 print:border-gray-300">{row.code}</td>
                    <td className="p-3 border-r border-gray-100 font-medium text-gray-800 print:border-gray-300">{row.student}</td>
                    <td className="p-3 border-r border-gray-100 text-gray-500 print:border-gray-300">{row.admission}</td>
                    <td className="p-3 border-r border-gray-100 text-[#5b5bcf] font-medium print:text-gray-800 print:border-gray-300">{row.classSec}</td>
                    <td className="p-3 border-r border-gray-100 text-gray-600 print:border-gray-300">{row.month} {row.year}</td>
                    <td className="p-3 border-r border-gray-100 text-gray-500 print:border-gray-300">{row.basis}</td>
                    <td className="p-3 border-r border-gray-100 text-right text-gray-600 print:border-gray-300">{row.prevDue}</td>
                    <td className="p-3 border-r border-gray-100 text-right text-gray-600 print:border-gray-300">{row.currDue}</td>
                    <td className="p-3 border-r border-gray-100 text-right font-bold text-gray-900 print:border-gray-300">{row.totalDue}</td>
                    <td className="p-3 text-gray-500 print:border-gray-300">{row.generated}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="p-6 text-center text-gray-500">No records found matching your filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-3 border-t border-gray-200 flex justify-between items-center bg-white print:hidden">
          <span className="text-[11px] text-gray-500">
            Showing 1 to {filteredData.length} of {filteredData.length}
          </span>
          <div className="flex items-center gap-1">
            <button className="px-2 py-1 border border-gray-300 rounded-none text-[11px] font-medium text-gray-500 bg-white hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
            <button className="w-6 h-6 flex items-center justify-center border border-[#5b5bcf] rounded-none text-[10px] font-bold text-white bg-[#5b5bcf]">1</button>
            <button className="px-2 py-1 border border-gray-300 rounded-none text-[11px] font-medium text-gray-500 bg-white hover:bg-gray-50 disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>

      {/* Quick Setup Modal */}
      <QuickSetupModal isOpen={isQuickSetupOpen} onClose={() => setIsQuickSetupOpen(false)} />
    </div>
  );
};

export default DueSlipHistory;
