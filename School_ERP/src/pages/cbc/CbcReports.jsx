import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileSpreadsheet, Download } from 'lucide-react';

const CbcReports = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-[#f4f6f8] overflow-y-auto">
      <div className="px-6 py-4 bg-white border-b border-gray-200 flex justify-between items-center shrink-0">
        <h1 className="text-xl font-bold text-[#1a1a2e] flex items-center gap-2">
          <FileSpreadsheet className="w-6 h-6 text-amber-500" /> CBC Reports
        </h1>
        <button 
          onClick={() => navigate('/cbc/dashboard')}
          className="bg-white border border-gray-300 text-gray-600 px-3 py-1.5 rounded-none text-[12px] font-bold hover:bg-gray-50 flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white m-6 rounded-none border border-gray-200 shadow-sm">
        <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center mb-4 border border-amber-100">
          <FileSpreadsheet className="w-10 h-10 text-amber-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Detailed Competency Reports</h2>
        <p className="text-[13px] text-gray-500 max-w-lg mb-6">
          Generate comprehensive competency report cards and progress portfolios. This section parses individual student rubrics and translates them into parent-friendly charts and insights. Data aggregation is currently being finalized.
        </p>
        <button 
          className="bg-amber-500 text-white px-6 py-2 rounded-none text-[13px] font-bold hover:bg-amber-600 shrink-0 shadow-sm transition-colors flex items-center gap-2 cursor-not-allowed opacity-70"
        >
          <Download className="w-4 h-4" /> Download Sample Report
        </button>
      </div>
    </div>
  );
};

export default CbcReports;
