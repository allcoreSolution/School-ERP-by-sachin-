import React from 'react';
import AccountsTabs from '../../components/accounts/AccountsTabs';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Info, Tags, Save, Lightbulb
} from 'lucide-react';

const AddNewExpenseHead = () => {
  const navigate = useNavigate();

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
        <h1 className="text-[22px] font-bold text-gray-900">Create New Expense Head</h1>
        <p className="text-[12px] text-gray-500 mt-1">Group expense records under a category</p>
      </div>

      <form onSubmit={(e) => {
        e.preventDefault();
        alert("Expense head created successfully!");
        navigate('/accounts/expense-heads');
      }}>
        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Column - Form */}
        <div className="flex-1">
          <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex items-center gap-2">
              <Tags className="w-4 h-4 text-[#5b5bcf] fill-[#5b5bcf]" />
              <h2 className="text-[14px] font-bold text-gray-900">New Expense Head</h2>
            </div>
            
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1.5">
                  Head Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Salaries, Utilities, Maintenance" 
                  className="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#5b5bcf] focus:border-[#5b5bcf]"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1.5">
                  Description
                </label>
                <textarea 
                  rows="3"
                  placeholder="Optional — what this head is used for"
                  className="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#5b5bcf] focus:border-[#5b5bcf]"
                ></textarea>
              </div>
            </div>

            {/* Form Actions */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
              <button 
                type="button"
                onClick={() => navigate('/accounts/expense-heads')}
                className="px-4 py-2 border border-gray-300 rounded-none text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 rounded-none text-sm font-bold text-white bg-[#5b5bcf] hover:bg-blue-700 transition-colors shadow-sm"
              >
                <Save className="w-4 h-4" /> Create Head
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Info Card */}
        <div className="w-full lg:w-[350px]">
          <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 flex items-center gap-2">
              <div className="bg-purple-50 p-1.5 rounded-none">
                <Lightbulb className="w-4 h-4 text-[#5b5bcf] fill-[#5b5bcf]" />
              </div>
              <h2 className="text-[14px] font-bold text-gray-800">About expense heads</h2>
            </div>
            <div className="p-4 pt-2 text-[12px] text-gray-600">
              <ul className="space-y-4">
                <li className="flex gap-2">
                  <span className="text-[#5b5bcf] mt-1">•</span>
                  <span>Heads <strong>group your expenses</strong> for cleaner reports and ledgers.</span>
                </li>
                <li className="flex gap-2 border-t border-gray-100 pt-4">
                  <span className="text-[#5b5bcf] mt-1">•</span>
                  <span>Typical values: <strong>Salaries, Utilities, Maintenance, Supplies.</strong></span>
                </li>
                <li className="flex gap-2 border-t border-gray-100 pt-4">
                  <span className="text-[#5b5bcf] mt-1">•</span>
                  <span>Once created, pick a head when recording an expense entry.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
      </div>
      </form>
    </div>
  );
};

export default AddNewExpenseHead;
