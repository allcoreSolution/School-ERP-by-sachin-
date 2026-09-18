import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Info, Settings, Search, Calendar, HelpCircle, 
  FileText, Printer, Columns, ChevronDown, List, Grid,
  FileDown, Send
} from 'lucide-react';
import QuickSetupModal from '../../components/finance/QuickSetupModal';
import FinanceTabs from '../../components/finance/FinanceTabs';

const GenerateDueSlip = () => {
  const [isGenerated, setIsGenerated] = useState(false);
  const [isQuickSetupOpen, setIsQuickSetupOpen] = useState(false);
  const [month, setMonth] = useState('March');
  const [year, setYear] = useState('2023');

  const handleGenerate = () => {
    setIsGenerated(true);
  };

  const handleDownloadPDF = (className) => {
    alert(`Downloading Due Slip PDF for ${className}...`);
  };

  const handleSendWhatsApp = (className) => {
    const message = encodeURIComponent(`Dear Parents of ${className},\n\nYour due fee slip for ${month} ${year} has been generated. Please clear the dues at the earliest.\n\nThank you,\nACS School`);
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  return (
    <div className="p-4 max-w-[1600px] mx-auto bg-gray-50 min-h-screen text-gray-800 pb-20">
      {/* Banner */}
      <div className="bg-[#009b9f] text-white p-2.5 rounded-none text-xs flex items-center gap-2 mb-4 shadow-sm">
        <Info className="w-5 h-5 flex-shrink-0" />
        <p>
          <strong>New: academic-session scoping.</strong> Lists and dashboard numbers (students, exams, assessments, homework, notices...) now show the <em>selected academic session</em> only, so totals may look smaller than before — nothing was deleted. Use the session switcher in the top bar to view another year, the "View all sessions" button on lists to see everything, and note that money totals marked "(All Years)" still include every session.
        </p>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-2">
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

      {/* Select Month Card */}
      <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-100 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#5b5bcf]" />
          <h2 className="text-[15px] font-bold text-gray-800">Select Month</h2>
        </div>
        
        <div className="p-5">
          <div className="flex flex-col md:flex-row items-end gap-6">
            <div className="flex-1 w-full">
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">MONTH</label>
              <select 
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full border border-gray-300 rounded-none text-[13px] px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#5b5bcf] focus:border-[#5b5bcf]"
              >
                <option>-- Select Month --</option>
                <option>January</option>
                <option>February</option>
                <option>March</option>
                <option>April</option>
                <option>May</option>
                <option>June</option>
                <option>July</option>
                <option>August</option>
                <option>September</option>
                <option>October</option>
                <option>November</option>
                <option>December</option>
              </select>
            </div>
            
            <div className="flex-1 w-full">
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">YEAR</label>
              <select 
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full border border-gray-300 rounded-none text-[13px] px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#5b5bcf] focus:border-[#5b5bcf]"
              >
                <option>-- Select Year --</option>
                <option>2023</option>
                <option>2024</option>
                <option>2025</option>
                <option>2026</option>
                <option>2027</option>
              </select>
            </div>
            
            <div className="flex-[1.5] w-full">
              <label className="flex items-center gap-1 text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                DUE BASIS <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
              </label>
              <select className="w-full border border-gray-300 rounded-none text-[13px] px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#5b5bcf] focus:border-[#5b5bcf]">
                <option>Till this Month (arrears + current)</option>
                <option>Only this Month</option>
              </select>
            </div>
            
            <div className="flex-[1.2] w-full">
              <button 
                onClick={handleGenerate}
                className="w-full flex justify-center items-center gap-2 bg-[#5b5bcf] hover:bg-blue-700 text-white px-6 py-2 rounded-none text-[14px] font-semibold transition-colors shadow-sm h-[38px]"
              >
                <Search className="w-4 h-4" /> Generate
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Generated Table Section */}
      {isGenerated && (
        <>
          <div className="bg-[#f3e8ff] border border-[#d8b4fe] text-[#6b21a8] p-3 rounded-none text-[13px] flex items-center gap-2 mb-4">
            <Settings className="w-4 h-4 text-[#7e22ce] flex-shrink-0" />
            <p>
              Showing <strong>Up to {month} {year} (arrears + this month)</strong>. Every <strong>Download PDF</strong> and <strong>Send to Parents</strong> below uses this basis — change <em>Due Basis</em> above and re-generate to switch.
            </p>
          </div>

          <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-[17px] font-bold text-[#5b5bcf] flex items-center gap-2">
                <FileText className="w-5 h-5 fill-current" /> Due Slips for {month} {year}
              </h2>
              <div className="flex bg-gray-100 rounded-none p-0.5">
                <button className="p-1.5 bg-white shadow-sm rounded-none text-gray-700"><List className="w-4 h-4" /></button>
                <button className="p-1.5 text-gray-500 hover:text-gray-700"><Grid className="w-4 h-4" /></button>
              </div>
            </div>

            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Show</span>
                  <select className="border border-gray-300 rounded-none text-xs px-2 py-1.5 text-gray-700 focus:outline-none focus:border-blue-500">
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                  </select>
                  <div className="flex bg-white rounded-none border border-gray-300 overflow-hidden ml-2">
                    <button className="px-2.5 py-1.5 text-gray-600 hover:bg-gray-50 border-r border-gray-300 transition-colors" title="Copy">
                      <FileText className="w-4 h-4" />
                    </button>
                    <button className="px-3 py-1.5 text-[11px] font-medium text-gray-600 hover:bg-gray-50 border-r border-gray-300 transition-colors" title="CSV">
                      CSV
                    </button>
                    <button className="px-3 py-1.5 text-[11px] font-medium text-gray-600 hover:bg-gray-50 border-r border-gray-300 transition-colors" title="Excel">
                      Excel
                    </button>
                    <button className="px-3 py-1.5 text-[11px] font-medium text-gray-600 hover:bg-gray-50 border-r border-gray-300 transition-colors" title="PDF">
                      PDF
                    </button>
                    <button className="px-2.5 py-1.5 text-gray-600 hover:bg-gray-50 border-r border-gray-300 transition-colors" title="Print">
                      <Printer className="w-4 h-4" />
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 text-[11px] font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                      <Columns className="w-3.5 h-3.5" /> Columns <ChevronDown className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    className="border border-gray-300 rounded-none pl-3 pr-8 py-1.5 text-sm w-64 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f8f9fc] text-[10px] font-bold text-[#5b5bcf] uppercase tracking-wider border-b border-gray-200">
                    <th className="p-4 border-r border-gray-100 w-16 text-center">#</th>
                    <th className="p-4 border-r border-gray-100">MONTH</th>
                    <th className="p-4 border-r border-gray-100">CLASS & SECTION</th>
                    <th className="p-4 border-r border-gray-100">STUDENTS</th>
                    <th className="p-4 text-center w-48">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="text-[13px]">
                  {[
                    { id: 1, class: 'Nursery A', students: 17 },
                    { id: 2, class: 'Nursery B', students: 20 },
                    { id: 3, class: 'Class I A', students: 42 },
                    { id: 4, class: 'Class II A', students: 24 },
                    { id: 5, class: 'Class III A', students: 20 },
                  ].map((row) => (
                    <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="p-4 border-r border-gray-100 text-center text-gray-500">{row.id}</td>
                      <td className="p-4 border-r border-gray-100 text-gray-600">{month} {year}</td>
                      <td className="p-4 border-r border-gray-100 font-medium text-gray-700">{row.class}</td>
                      <td className="p-4 border-r border-gray-100">
                        <span className="text-[#5b5bcf] font-bold">{row.students}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-2">
                          <button 
                            onClick={() => handleDownloadPDF(row.class)}
                            className="flex justify-center items-center gap-1.5 px-3 py-1.5 border border-red-500 text-red-600 hover:bg-red-50 rounded-none text-[11px] font-bold transition-colors"
                          >
                            <FileDown className="w-3.5 h-3.5" /> Download PDF
                          </button>
                          <button 
                            onClick={() => handleSendWhatsApp(row.class)}
                            className="flex justify-center items-center gap-1.5 px-3 py-1.5 bg-[#5b5bcf] hover:bg-blue-700 text-white rounded-none text-[11px] font-bold transition-colors shadow-sm"
                          >
                            <Send className="w-3.5 h-3.5" /> Send to Parents
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="p-4 border-t border-gray-200 flex justify-between items-center bg-gray-50">
              <span className="text-xs text-gray-500">
                Showing 1 to 5 of 5 entries
              </span>
              <div className="flex items-center gap-1">
                <button className="px-3 py-1.5 border border-gray-300 rounded-none text-xs font-medium text-gray-500 bg-white hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
                <button className="px-3 py-1.5 border border-[#5b5bcf] rounded-none text-xs font-bold text-white bg-[#5b5bcf]">1</button>
                <button className="px-3 py-1.5 border border-gray-300 rounded-none text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50" disabled>Next</button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Quick Setup Modal */}
      <QuickSetupModal isOpen={isQuickSetupOpen} onClose={() => setIsQuickSetupOpen(false)} />
    </div>
  );
};

export default GenerateDueSlip;
