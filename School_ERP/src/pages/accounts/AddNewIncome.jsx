import React from 'react';
import AccountsTabs from '../../components/accounts/AccountsTabs';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Info, ArrowDownToLine, Save, X
} from 'lucide-react';

const AddNewIncome = () => {
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
        <h1 className="text-[22px] font-bold text-gray-900">Record New Income</h1>
        <p className="text-[12px] text-gray-500 mt-1">Log money received into the school books</p>
      </div>

      <form onSubmit={(e) => {
        e.preventDefault();
        alert("Income recorded successfully!");
        navigate('/accounts/income');
      }}>
        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Column - Form */}
        <div className="flex-1">
          <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex items-center gap-2">
              <ArrowDownToLine className="w-4 h-4 text-[#5b5bcf]" />
              <h2 className="text-[14px] font-bold text-[#5b5bcf]">New Income Record</h2>
            </div>
            
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Row 1 */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1.5">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. Book fair collection" 
                    className="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#5b5bcf] focus:border-[#5b5bcf]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1.5">
                    Income Head <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full border border-gray-300 rounded-none px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#5b5bcf] focus:border-[#5b5bcf]">
                    <option value="">Select Head</option>
                    <option value="Donation">Donation</option>
                    <option value="Uniform Sale">Uniform Sale</option>
                  </select>
                </div>

                {/* Row 2 */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1.5">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="date" 
                    defaultValue="2026-08-21"
                    className="w-full border border-gray-300 rounded-none px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#5b5bcf] focus:border-[#5b5bcf]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1.5">
                    Amount <span className="text-red-500">*</span>
                  </label>
                  <div className="flex border border-gray-300 rounded-none overflow-hidden focus-within:ring-1 focus-within:ring-[#5b5bcf] focus-within:border-[#5b5bcf]">
                    <span className="bg-gray-100 text-gray-600 px-3 py-2 border-r border-gray-300 flex items-center text-sm">
                      ₹
                    </span>
                    <input 
                      type="number" 
                      placeholder="0.00" 
                      className="w-full px-3 py-2 text-sm focus:outline-none"
                    />
                  </div>
                </div>

                {/* Row 3 */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1.5">
                    Invoice Number
                  </label>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#5b5bcf] focus:border-[#5b5bcf]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1.5">
                    Bank Account <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <select className="w-full border border-gray-300 rounded-none px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#5b5bcf] focus:border-[#5b5bcf]">
                    <option value="">-- None (Cash / Other) --</option>
                    <option value="sbi">SBI Primary</option>
                  </select>
                </div>
              </div>

              {/* Row 4 */}
              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1.5">
                  Attachment <span className="text-gray-400 font-normal">(PDF, JPG, PNG)</span>
                </label>
                <div className="flex items-center gap-2">
                  <input 
                    type="file" 
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-1.5 file:px-3
                      file:rounded file:border file:border-gray-300
                      file:text-xs file:font-semibold
                      file:bg-gray-50 file:text-gray-700
                      hover:file:bg-gray-100"
                  />
                </div>
              </div>

              {/* Row 5 */}
              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1.5">
                  Description
                </label>
                <textarea 
                  rows="3"
                  placeholder="Optional notes for your records"
                  className="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#5b5bcf] focus:border-[#5b5bcf]"
                ></textarea>
              </div>
            </div>

            {/* Form Actions */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
              <button 
                type="button"
                onClick={() => navigate('/accounts/income')}
                className="px-4 py-2 border border-gray-300 rounded-none text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 rounded-none text-sm font-bold text-white bg-[#5b5bcf] hover:bg-blue-700 transition-colors shadow-sm"
              >
                <Save className="w-4 h-4" /> Record Income
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Info Card */}
        <div className="w-full lg:w-[350px]">
          <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 flex items-center gap-2">
              <div className="bg-blue-50 p-1.5 rounded-none">
                <Info className="w-4 h-4 text-blue-600" />
              </div>
              <h2 className="text-[14px] font-bold text-gray-800">Recording income</h2>
            </div>
            <div className="p-4 pt-2 text-[12px] text-gray-600">
              <ul className="space-y-4">
                <li className="flex gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Pick the right <strong>Income Head</strong> — it drives your reports and ledgers.</span>
                </li>
                <li className="flex gap-2 border-t border-gray-100 pt-4">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Link a <strong>Bank Account</strong> if the money was deposited; leave blank for cash.</span>
                </li>
                <li className="flex gap-2 border-t border-gray-100 pt-4">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Attach the receipt or invoice to keep your books <strong>audit-ready</strong>.</span>
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

export default AddNewIncome;
