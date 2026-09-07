import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowDownToLine, ArrowUpFromLine, Calendar, Wallet, 
  Printer, ArrowDown, ArrowUp, BarChart, Calendar as CalendarIcon,
  Megaphone, ChevronLeft, ChevronRight, User, FileText, Send, Users,
  HandCoins, FileSearch, UserPlus, Layers, Tags, Tag, Gauge, LayoutDashboard, SlidersHorizontal
} from 'lucide-react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Sep 25', income: 0, expense: 0 },
  { name: 'Feb 26', income: 500000, expense: 50000 },
  { name: 'Mar 26', income: 120000, expense: 10000 },
  { name: 'Apr 26', income: 120000, expense: 5000 },
  { name: 'May 26', income: 280000, expense: 10000 },
  { name: 'Jun 26', income: 20000, expense: 5000 },
  { name: 'Jul 26', income: 130000, expense: 0 },
  { name: 'Aug 26', income: 1107503.83, expense: 50000 },
];

const vouchers = [
  { id: 'RCT/26-27/0139', type: 'Receipt', date: '21 Aug 2026', amount: '₹5,360.00' },
  { id: 'RCT/26-27/0138', type: 'Receipt', date: '21 Aug 2026', amount: '₹2,000.00' },
  { id: 'RCT/26-27/0137', type: 'Receipt', date: '21 Aug 2026', amount: '₹4,950.00' },
  { id: 'RCT/26-27/0136', type: 'Receipt', date: '21 Aug 2026', amount: '₹10,000.00' },
  { id: 'RCT/26-27/0135', type: 'Receipt', date: '21 Aug 2026', amount: '₹105,000.00' },
  { id: 'PMT/26-27/0004', type: 'Payment', date: '21 Aug 2026', amount: '₹15,000.00' },
  { id: 'PMT/26-27/0003', type: 'Payment', date: '21 Aug 2026', amount: '₹150,000.00' },
];

import Swal from 'sweetalert2';

const ClassicStatCard = ({ title, subTitle, value, bgColor, icon: Icon }) => {
  return (
    <div className={`${bgColor} text-white rounded-[3px] relative overflow-hidden group shadow-sm h-[130px]`}>
      <div className="p-4 relative z-10 h-full flex flex-col justify-center">
        <h3 className="text-[34px] font-bold mb-0.5 tracking-tight">{value}</h3>
        <p className="text-[15px] font-medium leading-tight">{title}</p>
        {subTitle && <p className="text-[13px] opacity-90 mt-0.5">{subTitle}</p>}
      </div>
      
      {/* Huge Faded Icon */}
      <div className="absolute -right-2 top-4 text-black/10 group-hover:scale-110 transition-transform duration-300 pointer-events-none">
        <Icon className="w-24 h-24" />
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('General');

  return (
    <div className="min-h-screen bg-[#ecf0f5] text-[#333] p-4 font-sans pb-16">
      
      {/* Top Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-normal text-[#333] flex items-center gap-2">
          Dashboard
        </h1>
      </div>

      {/* Classic Solid Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <ClassicStatCard 
          title="Collected Today" 
          value="₹151,310" 
          icon={Printer} 
          bgColor="bg-[#00a65a]" 
        />
        <ClassicStatCard 
          title="Income This Month" 
          subTitle="(All Years)"
          value="₹1,107,503" 
          icon={ArrowDown} 
          bgColor="bg-[#dd4b39]" 
        />
        <ClassicStatCard 
          title="Expense This Month" 
          value="₹50,000" 
          icon={ArrowUp} 
          bgColor="bg-[#00c0ef]" 
        />
        <ClassicStatCard 
          title="Cash & Bank Balance" 
          value="₹989,503" 
          icon={Wallet} 
          bgColor="bg-[#f39c12]" 
        />
      </div>

      {/* Dynamic Navigation Tabs & Quick Action Blocks */}
      <div className="bg-white rounded-[3px] border-t-[3px] border-t-[#f39c12] shadow-sm mb-6">
        <div className="border-b border-[#f4f4f4] px-4">
          <ul className="flex flex-wrap text-[14px] font-medium m-0 p-0 list-none">
            {['General', 'Fees', 'Accounts Management', 'Lead Management'].map((tab) => (
              <li key={tab}>
                <button 
                  onClick={() => setActiveTab(tab)}
                  className={`inline-block px-4 py-3 bg-white focus:outline-none ${
                    activeTab === tab 
                      ? 'text-[#666] border-t border-l border-r border-[#f4f4f4] -mb-[1px] border-b border-b-white rounded-t-[3px]' 
                      : 'text-[#f39c12] hover:bg-[#f8f9fa] border border-transparent'
                  }`}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="p-6">
          {/* Quick Action Tiles */}
          <div className="flex flex-wrap gap-4 border-b border-[#f4f4f4] pb-6 mb-6">
            
            {activeTab === 'General' && (
              <>
                <button 
                  onClick={() => Swal.fire('Leave Application', 'This module will be ready soon!', 'info')}
                  className="bg-[#17a2b8] hover:bg-[#138496] text-white flex flex-col items-center justify-center p-4 rounded-[3px] transition-colors h-[90px] w-[120px]"
                >
                  <Send className="w-8 h-8 mb-2" />
                  <span className="text-[13px] font-semibold">Apply Leave</span>
                </button>
                <button className="bg-[#007bff] hover:bg-[#0069d9] text-white flex flex-col items-center justify-center p-4 rounded-[3px] transition-colors h-[90px] w-[120px]">
                  <Users className="w-8 h-8 mb-2" />
                  <span className="text-[13px] font-semibold">Student List</span>
                </button>
              </>
            )}

            {activeTab === 'Fees' && (
              <>
                <Link to="/fees/collect" className="bg-[#28a745] hover:bg-[#218838] text-white flex flex-col items-center justify-center p-4 rounded-[3px] transition-colors h-[90px] w-[120px]">
                  <HandCoins className="w-8 h-8 mb-2" />
                  <span className="text-[13px] font-semibold">Collect Fees</span>
                </Link>
                <Link to="/fees/due" className="bg-[#ffc107] hover:bg-[#e0a800] text-[#333] flex flex-col items-center justify-center p-4 rounded-[3px] transition-colors h-[90px] w-[120px]">
                  <FileSearch className="w-8 h-8 mb-2" />
                  <span className="text-[13px] font-semibold">Search Due Fees</span>
                </Link>
                <Link to="/fees/assign" className="bg-[#17a2b8] hover:bg-[#138496] text-white flex flex-col items-center justify-center p-4 rounded-[3px] transition-colors h-[90px] w-[120px]">
                  <UserPlus className="w-8 h-8 mb-2" />
                  <span className="text-[13px] font-semibold">Assign Fees</span>
                </Link>
                <Link to="/fees/groups" className="bg-[#6f42c1] hover:bg-[#5a32a3] text-white flex flex-col items-center justify-center p-4 rounded-[3px] transition-colors h-[90px] w-[120px]">
                  <Layers className="w-8 h-8 mb-2" />
                  <span className="text-[13px] font-semibold">Fee Groups</span>
                </Link>
                <Link to="/fees/types" className="bg-[#6c757d] hover:bg-[#5a6268] text-white flex flex-col items-center justify-center p-4 rounded-[3px] transition-colors h-[90px] w-[120px]">
                  <Tags className="w-8 h-8 mb-2" />
                  <span className="text-[13px] font-semibold">Fee Types</span>
                </Link>
              </>
            )}

            {activeTab === 'Accounts Management' && (
              <>
                <Link to="/accounts/income" className="bg-[#469b6b] hover:bg-[#347851] text-white flex flex-col items-center justify-center p-4 rounded-[3px] transition-colors h-[90px] w-[120px]">
                  <ArrowDown className="w-8 h-8 mb-2" />
                  <span className="text-[13px] font-semibold">Income</span>
                </Link>
                <Link to="/accounts/expense" className="bg-[#ce2b41] hover:bg-[#a62031] text-white flex flex-col items-center justify-center p-4 rounded-[3px] transition-colors h-[90px] w-[120px]">
                  <ArrowUp className="w-8 h-8 mb-2" />
                  <span className="text-[13px] font-semibold">Expense</span>
                </Link>
                <Link to="/accounts/income-heads" className="bg-[#469b6b] hover:bg-[#347851] text-white flex flex-col items-center justify-center p-4 rounded-[3px] transition-colors h-[90px] w-[120px]">
                  <Tag className="w-8 h-8 mb-2" />
                  <span className="text-[13px] font-semibold">Income Heads</span>
                </Link>
                <Link to="/accounts/expense-heads" className="bg-[#ce2b41] hover:bg-[#a62031] text-white flex flex-col items-center justify-center p-4 rounded-[3px] transition-colors h-[90px] w-[120px]">
                  <Tag className="w-8 h-8 mb-2" />
                  <span className="text-[13px] font-semibold">Expense Heads</span>
                </Link>
              </>
            )}

            {activeTab === 'Lead Management' && (
              <>
                <Link to="/leads/dashboard" className="bg-[#007bff] hover:bg-[#0069d9] text-white flex flex-col items-center justify-center p-4 rounded-[3px] transition-colors h-[90px] w-[140px]">
                  <Gauge className="w-8 h-8 mb-2" />
                  <span className="text-[13px] font-semibold text-center leading-tight">Lead Dashboard</span>
                </Link>
                <Link to="/leads/pipeline" className="bg-[#2a7a3b] hover:bg-[#205d2e] text-white flex flex-col items-center justify-center p-4 rounded-[3px] transition-colors h-[90px] w-[140px]">
                  <LayoutDashboard className="w-8 h-8 mb-2" />
                  <span className="text-[13px] font-semibold text-center leading-tight">Lead Pipeline Board</span>
                </Link>
                <Link to="/leads/sources" className="bg-[#ffc107] hover:bg-[#e0a800] text-[#333] flex flex-col items-center justify-center p-4 rounded-[3px] transition-colors h-[90px] w-[140px]">
                  <SlidersHorizontal className="w-8 h-8 mb-2" />
                  <span className="text-[13px] font-semibold text-center leading-tight">Lead Sources & Stages</span>
                </Link>
              </>
            )}

            {activeTab !== 'General' && activeTab !== 'Fees' && activeTab !== 'Accounts Management' && activeTab !== 'Lead Management' && (
              <div className="text-gray-400 text-sm h-[90px] flex items-center">
                Select an action for {activeTab}
              </div>
            )}
            
          </div>

          {/* Accounts Graph & Recent Vouchers Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Chart Area */}
            <div className="lg:col-span-2">
              <div className="bg-[#3c8dbc] text-white px-3 py-2 rounded-t-[3px] flex items-center gap-2">
                <BarChart className="w-4 h-4"/> 
                <h3 className="text-[15px] font-medium tracking-wide">Income & Expense Chart</h3>
              </div>
              <div className="bg-white border border-[#e0e0e0] border-t-0 p-4 h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barSize={30}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#666' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#666' }} tickFormatter={(val) => val/1000 + 'k'} />
                    <Tooltip cursor={{fill: '#f8f9fa'}} contentStyle={{ borderRadius: '0px', padding: '10px' }}/>
                    <Legend wrapperStyle={{ fontSize: '13px', paddingTop: '10px' }} />
                    <Bar dataKey="income" name="Income" fill="#00a65a" />
                    <Bar dataKey="expense" name="Expense" fill="#dd4b39" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Vouchers Table */}
            <div>
              <div className="bg-white border border-[#e0e0e0] rounded-[3px] overflow-hidden">
                <div className="bg-[#f4f4f4] border-b border-[#e0e0e0] px-4 py-[11px] flex justify-between items-center h-[42.5px]">
                  <h3 className="text-[14.5px] font-bold text-[#333]">Recent Vouchers</h3>
                  <Link to="/accounts/day-book" className="text-xs text-[#3c8dbc] hover:underline">View All</Link>
                </div>
                <div className="h-[350px] overflow-y-auto w-full p-3 bg-white">
                  {vouchers.map((v, i) => (
                    <div key={i} className="flex justify-between items-center p-3 mb-2 bg-[#fdfdfd] border-l-[3px] border-[#3c8dbc] border border-y-[#e0e0e0] border-r-[#e0e0e0] shadow-sm hover:bg-[#f8f9fa]">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] px-1.5 py-0.5 font-bold rounded-sm text-white ${v.type === 'Receipt' ? 'bg-[#00a65a]' : 'bg-[#dd4b39]'}`}>
                            {v.type}
                          </span>
                          <span className="text-[14px] font-bold text-[#333] tracking-tight">{v.amount}</span>
                        </div>
                        <p className="text-[12px] text-[#666]">{v.id}</p>
                      </div>
                      <div className="text-[11px] text-[#999] whitespace-nowrap">
                        {v.date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Extra Dashboard Gadgets (Calendar, Notices, Staff Panel) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Calendar (2/3 width) */}
        <div className="lg:col-span-2">
          <div className="bg-[#007bff] text-white px-3 py-2 rounded-t-[3px] flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />
            <h3 className="text-[15px] font-medium tracking-wide">School Calendar</h3>
          </div>
          <div className="bg-white border text-center border-gray-200 border-t-0 p-4">
            
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 mb-4">
              <div className="flex gap-[1px] order-2 sm:order-1 w-full sm:w-auto justify-center sm:justify-start">
                <button className="bg-[#f39c12] text-white px-2.5 py-1 rounded-l-[3px] text-sm"><ChevronLeft className="w-4 h-4"/></button>
                <button className="bg-[#f39c12] text-white px-2.5 py-1 rounded-r-[3px] text-sm"><ChevronRight className="w-4 h-4"/></button>
                <button className="bg-[#3c8dbc] text-white px-3 py-1 rounded-[3px] text-[13px] ml-1 opacity-90 cursor-not-allowed border border-[#367fa9]">today</button>
              </div>
              <h2 className="text-[20px] sm:text-2xl font-normal text-[#333] order-1 sm:order-2 text-center w-full sm:w-auto">September 2026</h2>
              <div className="flex gap-[1px] order-3 w-full sm:w-auto justify-center sm:justify-end">
                <button className="bg-[#0056b3] text-white px-3 py-1 rounded-l-[3px] text-[13px]">month</button>
                <button className="bg-[#f39c12] text-white px-3 py-1 rounded-r-[3px] text-[13px]">list</button>
              </div>
            </div>

            {/* Calendar Grid Mockup */}
            <div className="border border-gray-200 overflow-x-auto w-full rounded-[3px]">
              <div className="min-w-[550px]">
                <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50 text-[13px] font-bold text-gray-700 py-2">
                <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
              </div>
              
              {/* Week 1 */}
              <div className="grid grid-cols-7 h-[90px] border-b border-gray-100 text-right text-[13px] font-semibold text-gray-700 p-1">
                <div className="p-1 border-r border-gray-100 text-gray-400">30</div>
                <div className="p-1 border-r border-gray-100 text-gray-400">31</div>
                <div className="p-1 border-r border-gray-100">1</div>
                <div className="p-1 border-r border-gray-100">2<span className="bg-[#dd4b39] text-white rounded-[3px] px-1 text-[10px] block mt-1 text-left truncate font-normal">Digxigxigitxitz</span></div>
                <div className="p-1 border-r border-gray-100">3</div>
                <div className="p-1 border-r border-gray-100">4<span className="bg-[#f39c12] text-white rounded-[3px] px-1 text-[10px] block mt-1 text-left truncate font-normal">Rajesh Kumar</span><span className="bg-[#00c0ef] text-white rounded-[3px] px-1 text-[10px] block mt-1 text-left truncate font-normal">Republic Day Fun</span></div>
                <div className="p-1">5</div>
              </div>
              
              {/* Week 2 */}
              <div className="grid grid-cols-7 h-[110px] border-b border-gray-100 text-right text-[13px] font-semibold text-gray-700 p-1">
                <div className="p-1 border-r border-gray-100">6</div>
                <div className="p-1 border-r border-gray-100">7</div>
                <div className="p-1 border-r border-gray-100">8<span className="bg-[#00a65a] text-white rounded-[3px] px-1 text-[10px] block mt-1 text-left truncate font-normal">Daksh Tiwari</span><span className="bg-[#00a65a] text-white rounded-[3px] px-1 text-[10px] block mt-1 text-left truncate font-normal">Eva Jain</span><span className="text-gray-400 block text-left mt-1 text-[10px] font-normal">+6 more</span></div>
                <div className="p-1 border-r border-gray-100">9<span className="bg-[#00a65a] text-white rounded-[3px] px-1 text-[10px] block mt-1 text-left truncate font-normal">HELLO HELLO</span><span className="bg-[#007bff] text-white rounded-[3px] px-1 text-[10px] block mt-1 text-left truncate font-normal">Health & Wellnes</span></div>
                <div className="p-1 border-r border-gray-100">10</div>
                <div className="p-1 border-r border-gray-100">11<span className="bg-[#00a65a] text-white rounded-[3px] px-1 text-[10px] block mt-1 text-left truncate font-normal">Rajesh</span></div>
                <div className="p-1">12<span className="bg-[#00a65a] text-white rounded-[3px] px-1 text-[10px] block mt-1 text-left truncate font-normal">Ishaan Gupta</span><span className="bg-[#00a65a] text-white rounded-[3px] px-1 text-[10px] block mt-1 text-left truncate font-normal">Ishita Das</span><span className="text-gray-400 block text-left mt-1 text-[10px] font-normal">+7 more</span></div>
              </div>

              {/* Week 3 */}
              <div className="grid grid-cols-7 h-[90px] border-b border-gray-100 text-right text-[13px] font-semibold text-gray-700 p-1">
                <div className="p-1 border-r border-gray-100">13</div>
                <div className="p-1 border-r border-gray-100">14</div>
                <div className="p-1 border-r border-gray-100">15<span className="bg-[#00a65a] text-white rounded-[3px] px-1 text-[10px] block mt-1 text-left truncate font-normal">Myra Bhatt</span><span className="bg-[#00a65a] text-white rounded-[3px] px-1 text-[10px] block mt-1 text-left truncate font-normal">Pari Bhatt</span><span className="text-gray-400 block text-left mt-1 text-[10px] font-normal">+2 more</span></div>
                <div className="p-1 border-r border-gray-100">16</div>
                <div className="p-1 border-r border-gray-100">17<span className="bg-[#007bff] text-white rounded-[3px] px-1 text-[10px] block mt-1 text-left truncate font-normal">Annual Day & Pri..</span></div>
                <div className="p-1 border-r border-gray-100">18</div>
                <div className="p-1">19</div>
              </div>

              {/* Week 4 */}
              <div className="grid grid-cols-7 h-[90px] border-b border-gray-100 text-right text-[13px] font-semibold text-gray-700 p-1">
                <div className="p-1 border-r border-gray-100">20</div>
                <div className="p-1 border-r border-gray-100">21</div>
                <div className="p-1 border-r border-gray-100">22</div>
                <div className="p-1 border-r border-gray-100">23</div>
                <div className="p-1 border-r border-gray-100">24</div>
                <div className="p-1 border-r border-gray-100">25</div>
                <div className="p-1">26</div>
              </div>

              {/* Week 5 */}
              <div className="grid grid-cols-7 h-[90px] border-b border-gray-100 text-right text-[13px] font-semibold text-gray-700 p-1">
                <div className="p-1 border-r border-gray-100">27</div>
                <div className="p-1 border-r border-gray-100">28<span className="bg-[#00a65a] text-white rounded-[3px] px-1 text-[10px] block mt-1 text-left truncate font-normal">Eva Sinha</span><span className="bg-[#00a65a] text-white rounded-[3px] px-1 text-[10px] block mt-1 text-left truncate font-normal">Sara Sinha</span></div>
                <div className="p-1 border-r border-gray-100">29</div>
                <div className="p-1 border-r border-gray-100">30</div>
                <div className="p-1 border-r border-gray-100 text-gray-400">1</div>
                <div className="p-1 border-r border-gray-100 text-gray-400">2</div>
                <div className="p-1 text-gray-400">3</div>
              </div>

              {/* Week 6 */}
              <div className="grid grid-cols-7 h-[90px] text-right text-[13px] font-semibold text-gray-700 p-1">
                <div className="p-1 border-r border-gray-100 text-gray-400">4</div>
                <div className="p-1 border-r border-gray-100 text-gray-400">5</div>
                <div className="p-1 border-r border-gray-100 text-gray-400">6</div>
                <div className="p-1 border-r border-gray-100 text-gray-400">7</div>
                <div className="p-1 border-r border-gray-100 text-gray-400">8</div>
                <div className="p-1 border-r border-gray-100 text-gray-400">9</div>
                <div className="p-1 text-gray-400">10<span className="bg-[#00a65a] text-white rounded-[3px] px-1 text-[10px] block mt-1 text-left truncate font-normal">Ali Bose</span><span className="bg-[#00a65a] text-white rounded-[3px] px-1 text-[10px] block mt-1 text-left truncate font-normal">Dhruv Bose</span><span className="text-gray-400 block text-left mt-1 text-[10px] font-normal">+2 more</span></div>
              </div>
            </div>
          </div>

          {/* Legend */}
            <div className="flex flex-wrap justify-center gap-4 mt-6 mb-2 text-[12px] font-medium text-gray-600">
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#007bff]"></div> Events</div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#dd4b39]"></div> School Holidays</div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#00a65a]"></div> Birthdays</div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#f39c12]"></div> Staff Leaves</div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#605ca8]"></div> Exam Schedules</div>
            </div>
            
          </div>
        </div>

        {/* Right Column: Staff & Notices (1/3 width) */}
        <div className="space-y-6">
          
          {/* Staff Panel */}
          <div className="bg-white border-t-[3px] border-t-[#3c8dbc] shadow-sm rounded-[3px]">
            <div className="px-4 py-[11px] border-b border-[#f4f4f4] flex items-center gap-2 h-[42.5px]">
              <User className="w-4 h-4 text-[#3c8dbc]" />
              <h3 className="text-[#3c8dbc] font-medium text-[14.5px]">Staff Panel</h3>
            </div>
            <div className="p-4 flex flex-col items-center">
              <img 
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80" 
                alt="Rajesh Kumar" 
                className="w-[84px] h-[84px] rounded-full border-[3px] border-gray-200 mb-3 object-cover"
              />
              <h4 className="text-[17px] font-normal text-[#333] tracking-wide relative after:content-[''] after:absolute after:bottom-[-2px] after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-[1px] after:bg-gray-300">Rajesh Kumar</h4>
              <p className="text-[#777] text-[13px] mt-2 mb-6">Staff</p>
              
              <div className="w-full">
                <div className="flex items-center gap-2 text-[#333] font-bold text-[14px] mb-2">
                  <FileText className="w-4 h-4 text-gray-500" /> Latest Salary
                </div>
                <div className="text-[#777] text-[13px] text-center border-t border-gray-100 pt-3">
                  No paid salary slip found.
                </div>
              </div>
            </div>
          </div>

          {/* Notice Board */}
          <div className="bg-white shadow-sm rounded-[3px] overflow-hidden">
            <div className="bg-[#dd4b39] text-white px-3 py-[11px] flex items-center gap-2 h-[42.5px]">
              <Megaphone className="w-4 h-4" />
              <h3 className="text-[14.5px] font-medium">Notice Board</h3>
            </div>
            <div className="p-4 space-y-3 bg-[#fdfdfd]">
              <div className="border-l-[3px] border-[#3c8dbc] bg-white p-3 shadow-sm text-[13px] border-y border-y-gray-100 border-r border-r-gray-100">
                <h4 className="font-bold text-[#333] mb-1 leading-snug">Demo: Library week</h4>
                <p className="text-[#666] leading-relaxed">It is Library Week. Please return any borrowed books...</p>
              </div>
              <div className="border-l-[3px] border-[#3c8dbc] bg-white p-3 shadow-sm text-[13px] border-y border-y-gray-100 border-r border-r-gray-100">
                <h4 className="font-bold text-[#333] mb-1 leading-snug">NEWS ALERT</h4>
                <p className="text-[#666] leading-relaxed">Dear Parents, Greetings! We are pleased to inform...</p>
              </div>
              <div className="border-l-[3px] border-[#3c8dbc] bg-white p-3 shadow-sm text-[13px] border-y border-y-gray-100 border-r border-r-gray-100">
                <h4 className="font-bold text-[#333] mb-1 leading-snug">Fees Reminder</h4>
                <p className="text-[#666] leading-relaxed">Dear parents, Please clear pending amounts.</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
