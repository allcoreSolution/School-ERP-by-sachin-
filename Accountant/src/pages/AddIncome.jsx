import React from 'react';
import { Save, X, Calendar as CalendarIcon, Tag, CreditCard, Link as LinkIcon, FileText } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AddIncome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#ecf0f5] text-[#333] p-4 sm:p-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-[24px] font-normal text-[#333] flex items-center gap-2">
          Add Income
        </h1>
        <div className="text-[13px] text-gray-500 flex items-center gap-2 bg-white px-3 py-1.5 rounded-[3px] border border-gray-200 shadow-sm">
          <Link to="/accounts/dashboard" className="hover:text-[#3c8dbc]">Home</Link>
          <span>&gt;</span>
          <Link to="/accounts/income" className="hover:text-[#3c8dbc]">Income</Link>
          <span>&gt;</span>
          <span className="text-gray-400">Add</span>
        </div>
      </div>

      <div className="bg-white rounded-[3px] border-t-[3px] border-t-[#3c8dbc] shadow-sm max-w-4xl mx-auto">
        <div className="border-b border-gray-100 px-4 py-3 bg-[#fdfdfd]">
          <h3 className="text-[15px] font-semibold text-[#333]">Fill Income Details</h3>
        </div>
        
        <form className="p-5" onSubmit={(e) => { e.preventDefault(); navigate('/accounts/income'); }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-[14px]">
            
            <div className="flex flex-col gap-1.5 focus-within:text-[#3c8dbc]">
              <label className="font-semibold text-[#333]">Income Head *</label>
              <div className="relative">
                <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select className="w-full border border-[#d2d6de] rounded-[3px] pl-9 pr-3 py-1.5 bg-white focus:outline-none focus:border-[#3c8dbc] appearance-none" required>
                  <option value="">Select Income Head</option>
                  <option value="fees">Tuition Fees</option>
                  <option value="donation">Donation</option>
                  <option value="misc">Miscellaneous</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 focus-within:text-[#3c8dbc]">
              <label className="font-semibold text-[#333]">Name *</label>
              <input type="text" placeholder="Enter person or entity name" className="w-full border border-[#d2d6de] rounded-[3px] px-3 py-1.5 bg-white focus:outline-none focus:border-[#3c8dbc]" required />
            </div>

            <div className="flex flex-col gap-1.5 focus-within:text-[#3c8dbc]">
              <label className="font-semibold text-[#333]">Date *</label>
              <div className="relative">
                <CalendarIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="date" className="w-full border border-[#d2d6de] rounded-[3px] pl-9 pr-3 py-1.5 bg-white focus:outline-none focus:border-[#3c8dbc]" required defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 focus-within:text-[#3c8dbc]">
              <label className="font-semibold text-[#333]">Amount (₹) *</label>
              <input type="number" placeholder="0.00" min="0" step="0.01" className="w-full border border-[#d2d6de] rounded-[3px] px-3 py-1.5 bg-white focus:outline-none focus:border-[#3c8dbc]" required />
            </div>

            <div className="flex flex-col gap-1.5 focus-within:text-[#3c8dbc]">
              <label className="font-semibold text-[#333]">Payment Mode</label>
              <div className="relative">
                <CreditCard className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select className="w-full border border-[#d2d6de] rounded-[3px] pl-9 pr-3 py-1.5 bg-white focus:outline-none focus:border-[#3c8dbc] appearance-none">
                  <option value="cash">Cash</option>
                  <option value="cheque">Cheque</option>
                  <option value="transfer">Bank Transfer</option>
                  <option value="card">Card</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 focus-within:text-[#3c8dbc]">
              <label className="font-semibold text-[#333]">Attach Document</label>
              <div className="relative">
                <LinkIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="file" className="w-full border border-[#d2d6de] rounded-[3px] pl-9 pr-3 py-[3px] bg-white text-[13px] focus:outline-none focus:border-[#3c8dbc]" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2 focus-within:text-[#3c8dbc]">
              <label className="font-semibold text-[#333]">Description</label>
              <div className="relative">
                <FileText className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <textarea rows="3" placeholder="Enter income details..." className="w-full border border-[#d2d6de] rounded-[3px] pl-9 pr-3 py-2 bg-white focus:outline-none focus:border-[#3c8dbc] resize-y"></textarea>
              </div>
            </div>
            
          </div>
          
          <div className="mt-8 flex justify-end gap-3 bg-[#fdfdfd] -mx-5 -mb-5 px-5 py-4 border-t border-gray-100">
            <Link to="/accounts/income" className="px-5 py-2 text-[14px] bg-white border border-[#d2d6de] text-[#444] rounded-[3px] hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
              <X className="w-4 h-4" /> Cancel
            </Link>
            <button type="submit" className="px-6 py-2 text-[14px] bg-[#3c8dbc] text-white rounded-[3px] hover:bg-[#367fa9] flex items-center justify-center gap-2 shadow-sm transition-colors">
              <Save className="w-4 h-4" /> Save Income
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddIncome;
