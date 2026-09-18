import React from 'react';
import { 
  Info, Shield, FileText, Hourglass, FilePlus, 
  CheckCircle, Download, FileSearch, UserCheck
} from 'lucide-react';

const FeeDataAudit = () => {
  return (
    <div className="p-4 max-w-[1600px] mx-auto bg-gray-50 min-h-screen text-gray-800 pb-20">
      {/* Banner */}
      <div className="bg-[#009b9f] text-white p-2.5 rounded-none text-xs flex items-center gap-2 mb-6 shadow-sm">
        <Info className="w-5 h-5 flex-shrink-0" />
        <p>
          <strong>New: academic-session scoping.</strong> Lists and dashboard numbers (students, exams, assessments, homework, notices...) now show the <em>selected academic session</em> only, so totals may look smaller than before — nothing was deleted. Use the session switcher in the top bar to view another year, the "View all sessions" button on lists to see everything, and note that money totals marked "(All Years)" still include every session.
        </p>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[22px] font-bold text-gray-900 flex items-center gap-2">
          <UserCheck className="w-6 h-6 text-gray-800" /> Fee Data Integrity Audit
        </h1>
        <p className="text-[12px] text-gray-500 mt-1">Compares the tamper-proof audit trail against the live receipts table</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#38a169] text-white rounded-none p-5 flex justify-between items-center shadow-sm">
          <div>
            <h2 className="text-3xl font-bold mb-1">ON</h2>
            <p className="text-xs font-medium text-white/90">Database Delete Protection</p>
          </div>
          <Shield className="w-10 h-10 text-white/20" />
        </div>
        
        <div className="bg-[#38a169] text-white rounded-none p-5 flex justify-between items-center shadow-sm">
          <div>
            <h2 className="text-3xl font-bold mb-1">0</h2>
            <p className="text-xs font-medium text-white/90">Lost Receipts (total ₹0.00)</p>
          </div>
          <FileText className="w-10 h-10 text-white/20" />
        </div>
        
        <div className="bg-[#38a169] text-white rounded-none p-5 flex justify-between items-center shadow-sm">
          <div>
            <h2 className="text-3xl font-bold mb-1">0</h2>
            <p className="text-xs font-medium text-white/90">Pending Re-entry (₹0.00)</p>
          </div>
          <Hourglass className="w-10 h-10 text-white/20" />
        </div>
        
        <div className="bg-[#38a169] text-white rounded-none p-5 flex justify-between items-center shadow-sm">
          <div>
            <h2 className="text-3xl font-bold mb-1">0</h2>
            <p className="text-xs font-medium text-white/90">Orphan Journal Vouchers (₹0.00)</p>
          </div>
          <FilePlus className="w-10 h-10 text-white/20" />
        </div>
      </div>

      {/* Worksheet Card */}
      <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white">
          <h2 className="text-[14px] font-bold text-[#5b5bcf] flex items-center gap-2">
            <FileSearch className="w-4 h-4 fill-current" /> Lost Receipts Worksheet
          </h2>
          <button className="flex items-center gap-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-1.5 rounded-none text-[12px] font-semibold transition-colors shadow-sm">
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
        </div>
        
        <div className="p-6">
          <div className="bg-[#f0fff4] border border-[#c6f6d5] text-[#2f855a] p-4 rounded-none flex items-center gap-2 text-[13px]">
            <CheckCircle className="w-4 h-4 text-[#38a169] flex-shrink-0" />
            <p>No lost receipts detected. All receipts recorded in the audit trail still exist.</p>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex items-start gap-1.5 text-[11px] text-gray-500">
        <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
        <p>
          This audit compares the tamper-proof audit trail against the live receipts table, so it also detects any future incident automatically — a healthy system shows all cards green. Full technical background: <span className="text-red-400">FEE_RECEIPT_DATA_LOSS_REPORT.md</span>.
        </p>
      </div>

    </div>
  );
};

export default FeeDataAudit;
