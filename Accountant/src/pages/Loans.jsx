import React from 'react';
import { NavLink } from 'react-router-dom';
import { Send, HandCoins, Plus, Hourglass, Coins, History } from 'lucide-react';

const StatCard = ({ icon: Icon, iconBg, iconColor, label, value }) => (
  <div className="bg-white p-4 rounded-[3px] border border-gray-100 shadow-sm flex items-center gap-4">
    <div className={`w-12 h-12 rounded-[10px] flex items-center justify-center ${iconBg} ${iconColor}`}>
      <Icon className="w-6 h-6" />
    </div>
    <div className="flex flex-col">
      <span className="text-[12px] font-semibold text-[#666] uppercase tracking-wide">{label}</span>
      <span className="text-[22px] font-bold text-[#333] leading-none mt-1">{value}</span>
    </div>
  </div>
);

const Loans = () => {
  return (
    <div className="min-h-screen bg-[#ecf0f5] text-[#333] p-4 sm:p-6 font-sans">
      
      {/* Header section */}
      <div className="mb-6">
        <h1 className="text-[22px] font-bold text-[#333] mb-1">Human Resource</h1>
        <p className="text-[13px] text-gray-500">Manage staff, attendance, leaves, payroll, and loans across the school.</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6 flex gap-6">
        <NavLink 
          to="/leave" 
          className="flex items-center gap-2 pb-3 px-1 text-[14px] font-medium text-gray-500 hover:text-gray-700 transition-colors"
        >
          <Send className="w-4 h-4" />
          Apply Leave
        </NavLink>
        <NavLink 
          to="/loans" 
          className="flex items-center gap-2 pb-3 px-1 text-[14px] font-medium text-[#5a52d7] border-b-2 border-[#5a52d7]"
        >
          <HandCoins className="w-4 h-4" />
          Loans
        </NavLink>
      </div>

      {/* Button Row */}
      <div className="flex justify-end mb-6">
        <button className="bg-[#5a52d7] hover:bg-[#4a42c0] text-white px-4 py-2 rounded-[3px] flex items-center gap-2 text-[14px] font-medium transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          Apply for Loan / Advance
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard 
          icon={HandCoins}
          iconBg="bg-blue-50"
          iconColor="text-[#5a52d7]"
          label="Active Loan Amount"
          value="â‚¹0.00"
        />
        <StatCard 
          icon={Hourglass}
          iconBg="bg-orange-50"
          iconColor="text-orange-500"
          label="Remaining Balance"
          value="â‚¹0.00"
        />
        <StatCard 
          icon={Coins}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          label="Monthly EMI Deduction"
          value="â‚¹0.00"
        />
      </div>

      {/* Main Panel */}
      <div className="bg-white rounded-[3px] border border-gray-100 shadow-sm flex flex-col min-h-[400px]">
        {/* Panel Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <History className="w-4 h-4 text-[#5a52d7]" />
          <h2 className="text-[15px] font-bold text-[#333]">Loan Application History</h2>
        </div>
        
        {/* Empty State Body */}
        <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6">
            <HandCoins className="w-8 h-8 text-[#5a52d7]" />
          </div>
          <h3 className="text-[16px] font-bold text-[#333] mb-1">
            You have no loan history.
          </h3>
          <p className="text-[13px] text-gray-500 max-w-sm">
            Apply above for a short-term advance or salary loan.
          </p>
        </div>
      </div>

    </div>
  );
};

export default Loans;
