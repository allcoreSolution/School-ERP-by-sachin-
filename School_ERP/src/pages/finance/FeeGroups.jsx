import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Info, Settings, Search, Plus, HelpCircle, Edit2, Trash2, Download, FileText, Printer, Columns, ChevronDown } from 'lucide-react';
import UnderstandingFeeGroupsModal from '../../components/finance/UnderstandingFeeGroupsModal';
import FinanceTabs from '../../components/finance/FinanceTabs';
import { financeService } from '../../api/financeService';

const FeeGroups = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feeGroups, setFeeGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetchFeeGroups();
  }, []);

  const fetchFeeGroups = async () => {
    try {
      setLoading(true);
      const res = await financeService.getFeeGroups();
      if(res.data) {
        setFeeGroups(res.data);
      }
    } catch(err) {
      console.error(err);
      setFeeGroups([]);
    } finally {
      setLoading(false);
    }
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
      <FinanceTabs />

      {/* Title & Action Buttons */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[22px] font-bold text-gray-800">Fee Groups</h2>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-none shadow-sm hover:bg-gray-50 transition-colors"
          >
            <HelpCircle className="w-4 h-4" /> How it works
          </button>
          <Link to="/finance/groups/add" className="flex items-center gap-1.5 bg-[#5b5bcf] hover:bg-blue-700 text-white px-4 py-1.5 rounded-none text-sm font-medium transition-colors shadow-sm">
            <Plus className="w-4 h-4" /> Add New Fee Group
          </Link>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
        
        {/* Table Header Controls */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2 text-[#5b5bcf] font-semibold text-sm mb-4">
            <Settings className="w-4 h-4" /> Fee Groups
          </div>
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Show</span>
              <select className="border border-gray-300 rounded-none text-xs px-2 py-1 text-gray-700 focus:outline-none focus:border-blue-500">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              <div className="flex bg-white rounded-none border border-gray-300 overflow-hidden ml-2">
                <button className="px-2.5 py-1 text-gray-600 hover:bg-gray-50 border-r border-gray-300 transition-colors" title="CSV">
                  <FileText className="w-4 h-4" />
                </button>
                <button className="px-2.5 py-1 text-gray-600 hover:bg-gray-50 border-r border-gray-300 transition-colors" title="Excel">
                  Excel
                </button>
                <button className="px-2.5 py-1 text-gray-600 hover:bg-gray-50 border-r border-gray-300 transition-colors" title="PDF">
                  PDF
                </button>
                <button className="px-2.5 py-1 text-gray-600 hover:bg-gray-50 border-r border-gray-300 transition-colors" title="Print">
                  <Printer className="w-4 h-4" />
                </button>
                <button className="flex items-center gap-1 px-2.5 py-1 text-gray-600 hover:bg-gray-50 transition-colors">
                  <Columns className="w-4 h-4" /> Columns <ChevronDown className="w-3 h-3" />
                </button>
              </div>
            </div>
            
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search fee groups..." 
                className="border border-gray-300 rounded-none pl-3 pr-8 py-1.5 text-sm w-64 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <Search className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f8f9fc] text-[10px] font-bold text-[#5b5bcf] uppercase tracking-wider border-b border-gray-200">
                <th className="p-4 border-r border-gray-100 w-16 text-center">#</th>
                <th className="p-4 border-r border-gray-100">NAME</th>
                <th className="p-4 border-r border-gray-100">FEE TYPES & DETAILS</th>
                <th className="p-4 border-r border-gray-100 text-right w-40">TOTAL AMOUNT (₹)</th>
                <th className="p-4 text-center w-32">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading ? (
                <tr><td colSpan="5" className="p-4 text-center text-gray-500 font-semibold bg-gray-50">Loading fee groups...</td></tr>
              ) : feeGroups.length === 0 ? (
                <tr><td colSpan="5" className="p-4 text-center text-gray-500 font-semibold bg-gray-50">No Fee Groups Found.</td></tr>
              ) : feeGroups.map((group, idx) => (
                <tr key={group._id || idx} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="p-4 border-r border-gray-100 text-center text-gray-500">{idx + 1}</td>
                  <td className="p-4 border-r border-gray-100 font-medium text-gray-700 align-top">{group.name}</td>
                  <td className="p-0 border-r border-gray-100">
                    <div className="flex flex-col">
                      {(group.feeTypes || []).map((ft, ftIdx) => (
                        <div key={ftIdx} className="p-3 border-b border-gray-100 last:border-0">
                          <div className="font-semibold text-gray-800 text-[13px]">{ft.feeType?.name || 'Fee Type'}: ₹{ft.amount?.toFixed(2)}</div>
                          <div className="text-[11px] text-gray-500 mt-0.5">Due: {ft.dueDate ? new Date(ft.dueDate).toLocaleDateString() : 'N/A'}</div>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 border-r border-gray-100 text-right font-bold text-gray-800 align-middle">
                    ₹{group.feeTypes?.reduce((acc, curr) => acc + (curr.amount || 0), 0).toFixed(2) || '0.00'}
                  </td>
                  <td className="p-4 text-center align-middle">
                    <div className="flex justify-center items-center gap-3 text-gray-400">
                      <button className="hover:text-blue-600 transition-colors"><Edit2 className="w-4 h-4" /></button>
                      <button className="hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <UnderstandingFeeGroupsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default FeeGroups;
