import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Info, Settings, Search, Save } from 'lucide-react';
import FinanceTabs from '../../components/finance/FinanceTabs';

const FeesCarryForward = () => {
  const [showTable, setShowTable] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');

  const handleSearch = () => {
    if (selectedClass && selectedSection) {
      setShowTable(true);
    }
  };

  const handleSave = () => {
    alert("Fees carry forward saved successfully!");
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
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-none shadow-sm hover:bg-gray-50 transition-colors">
          <Settings className="w-3.5 h-3.5" /> Quick Setup
        </button>
      </div>

      {/* Tabs */}
      {/* Tabs */}
      <FinanceTabs />

      {/* Main Content Area */}
      <h2 className="text-[22px] font-bold text-gray-800 mb-4">Bulk Fee Entry / Carry Forward</h2>

      <div className="bg-white rounded-none shadow-sm border border-gray-200 p-5 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">CLASS <span className="text-red-500">*</span></label>
            <select 
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full border border-gray-300 rounded-none text-sm px-3 py-2 text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select Class</option>
              <option value="1">Class 1</option>
              <option value="2">Class 2</option>
              <option value="3">Class 3</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">SECTION <span className="text-red-500">*</span></label>
            <select 
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-full border border-gray-300 rounded-none text-sm px-3 py-2 text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select Section</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">FEE GROUP <span className="text-red-500">*</span></label>
            <select className="w-full border border-gray-300 rounded-none text-sm px-3 py-2 text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option value="">Select Fee Group</option>
              <option value="tuition">Tuition Fee</option>
              <option value="transport">Transport Fee</option>
            </select>
          </div>
        </div>

        <button 
          onClick={handleSearch}
          className="flex items-center gap-1.5 bg-[#5b5bcf] hover:bg-blue-700 text-white px-5 py-2 rounded-none text-sm font-medium transition-colors"
        >
          <Search className="w-4 h-4" /> Search
        </button>
      </div>

      {/* Table section */}
      {showTable && (
        <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
            <h3 className="font-semibold text-gray-800 text-sm">Student List (Class {selectedClass} - {selectedSection})</h3>
            <button onClick={handleSave} className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-none text-xs font-medium transition-colors">
              <Save className="w-3.5 h-3.5" /> Save Changes
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  <th className="p-3 pl-4">Admission No</th>
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Roll No</th>
                  <th className="p-3">Previous Dues Amount (₹)</th>
                  <th className="p-3">Remarks</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-3 pl-4 text-blue-600 font-medium">YISADM-004</td>
                  <td className="p-3 font-semibold text-gray-800">Kabir Singh</td>
                  <td className="p-3 text-gray-600">4</td>
                  <td className="p-3">
                    <input type="number" defaultValue="1500" className="border border-gray-300 rounded-none px-2 py-1.5 w-32 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  </td>
                  <td className="p-3">
                    <input type="text" placeholder="Optional remark" className="border border-gray-300 rounded-none px-2 py-1.5 w-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  </td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-3 pl-4 text-blue-600 font-medium">YISADM-006</td>
                  <td className="p-3 font-semibold text-gray-800">Vihan Gupta</td>
                  <td className="p-3 text-gray-600">6</td>
                  <td className="p-3">
                    <input type="number" defaultValue="0" className="border border-gray-300 rounded-none px-2 py-1.5 w-32 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  </td>
                  <td className="p-3">
                    <input type="text" placeholder="Optional remark" className="border border-gray-300 rounded-none px-2 py-1.5 w-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  </td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-3 pl-4 text-blue-600 font-medium">YISADM-008</td>
                  <td className="p-3 font-semibold text-gray-800">Shaurya Mishra</td>
                  <td className="p-3 text-gray-600">8</td>
                  <td className="p-3">
                    <input type="number" defaultValue="2500" className="border border-gray-300 rounded-none px-2 py-1.5 w-32 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  </td>
                  <td className="p-3">
                    <input type="text" placeholder="Optional remark" className="border border-gray-300 rounded-none px-2 py-1.5 w-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};

export default FeesCarryForward;
