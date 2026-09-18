import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Info, FileText, Search, ArrowLeft } from 'lucide-react';

const GenerateFeeChallan = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="p-4 max-w-[1600px] mx-auto bg-gray-50 min-h-screen text-gray-800 pb-20">
      
      {/* Banner */}
      <div className="bg-[#009b9f] text-white p-2.5 rounded-none text-xs flex items-center gap-2 mb-4 shadow-sm">
        <Info className="w-4 h-4 flex-shrink-0" />
        <p>
          <strong>New: academic-session scoping.</strong> Lists and dashboard numbers (students, exams, assessments, homework, notices...) now show the <em>selected academic session</em> only, so totals may look smaller than before — nothing was deleted. Use the session switcher in the top bar to view another year, the "View all sessions" button on lists to see everything, and note that money totals marked "(All Years)" still include every session.
        </p>
      </div>

      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <FileText className="w-6 h-6 text-gray-800" />
        <h1 className="text-xl font-bold text-gray-900">Generate Fee Challan</h1>
      </div>
      <p className="text-[11px] text-gray-500 mb-6">Issue a demand slip to a student's guardian</p>

      {/* Step 1 Box */}
      <div className="bg-white border border-gray-200 rounded-none shadow-sm mb-4">
        <div className="border-b border-gray-100 p-3">
          <h2 className="text-[14px] font-bold text-indigo-700 flex items-center gap-1.5">
            <Search className="w-4 h-4" /> Step 1: Select Student
          </h2>
        </div>
        <div className="p-4 flex flex-col md:flex-row items-end gap-4">
          <div className="flex-1 w-full">
            <label className="block text-[11px] font-bold text-gray-600 mb-1.5">Search Student</label>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type admission no or name..." 
              className="w-full border border-gray-300 rounded-none py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
            />
          </div>
          <button className="w-full md:w-auto px-10 py-2 bg-[#5a67d8] hover:bg-[#4c51bf] text-white font-bold rounded-none shadow-sm transition-colors text-sm flex justify-center items-center gap-1.5">
            <Search className="w-4 h-4" /> Load Dues
          </button>
        </div>
      </div>

      {/* Empty State Box */}
      <div className="bg-white border border-gray-200 rounded-none shadow-sm p-16 flex flex-col items-center justify-center text-center min-h-[300px]">
        <div className="w-12 h-12 bg-indigo-50 rounded-none flex items-center justify-center mb-4">
          <Search className="w-6 h-6 text-indigo-500" />
        </div>
        <h3 className="text-[14px] font-bold text-gray-800 mb-1">Search for a student above</h3>
        <p className="text-xs text-gray-500">Load a student's dues to generate a Fee Challan.</p>
      </div>

    </div>
  );
};

export default GenerateFeeChallan;
