import React from 'react';
import { 
  Globe, Users, Handshake, User, BookOpen, Contact, CreditCard, ChevronRight, 
  Key, Scale, Settings, BarChart2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, icon, gradient }) => (
  <div className={`p-5 rounded-[3px] shadow-[0_4px_15px_rgba(0,0,0,0.08)] flex items-center transition-transform hover:-translate-y-1 duration-300 relative overflow-hidden text-white ${gradient}`}>
    <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10"></div>
    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-10 -mb-10"></div>
    <div className="w-12 h-12 rounded-[3px] flex items-center justify-center mr-4 shadow-sm bg-white/20 backdrop-blur-sm border border-white/20 relative z-10">
      {icon}
    </div>
    <div className="relative z-10">
      <h3 className="text-2xl font-bold leading-tight">{value}</h3>
      <p className="text-[13.5px] font-semibold opacity-90">{title}</p>
    </div>
  </div>
);

const BranchCard = ({ name, active, renews, stats }) => (
  <div className="bg-white rounded-[3px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 p-5 font-sans group hover:shadow-md transition-shadow duration-300">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-[15px] font-bold text-gray-800 tracking-tight">{name}</h3>
        <p className="text-[12px] text-gray-400 mt-1 flex items-center gap-1.5">
          <span className="w-4 h-4 bg-gray-100 rounded flex items-center justify-center text-[9px]">📅</span> Renews {renews}
        </p>
      </div>
      {active && (
        <span className="bg-[#e0f3e8] text-[#00a65a] text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">Active</span>
      )}
    </div>

    <div className="grid grid-cols-2 gap-2 mb-4">
      <div className="bg-[#f0f7ff] p-2.5 rounded-[3px] flex flex-col items-center justify-center min-h-[70px]">
        <span className="text-[#3c8dbc] font-bold text-xl leading-none">{stats.students}</span>
        <span className="text-gray-400 text-[11px] mt-1 font-medium">Students</span>
      </div>
      <div className="bg-[#f9f3ff] p-2.5 rounded-[3px] flex flex-col items-center justify-center min-h-[70px]">
        <span className="text-[#9b59b6] font-bold text-xl leading-none">{stats.staff}</span>
        <span className="text-gray-400 text-[11px] mt-1 font-medium">Staff</span>
      </div>
      <div className="bg-[#f0faeb]/70 p-2.5 rounded-[3px] flex flex-col items-center justify-center min-h-[70px]">
        <span className="text-gray-400 font-bold text-xl leading-none">{stats.notMarked}</span>
        <span className="text-gray-400 text-[11px] mt-1 font-medium">Not marked</span>
      </div>
      <div className="bg-[#f0faeb] p-2.5 rounded-[3px] flex flex-col items-center justify-center min-h-[70px]">
        <span className="text-[#00a65a] font-bold text-xl leading-none">{stats.collected}</span>
        <span className="text-gray-400 text-[11px] mt-1 text-center font-medium">Collected (MTD)</span>
      </div>
    </div>

    <Link to="/branches" className="w-full py-2 bg-white border border-gray-200 text-gray-600 rounded-[3px] text-[13px] font-semibold hover:bg-gray-50 hover:text-gray-900 transition-colors flex items-center justify-center gap-1.5 group-hover:border-gray-300">
      Branch details <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
    </Link>
  </div>
);

const ToolkitCard = ({ title, desc, icon, color, bg, link }) => (
  <Link to={link || "#"} className="bg-white rounded-[3px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 p-5 flex items-start gap-4 hover:shadow-md transition-all group">
    <div className={`w-12 h-12 rounded-[3px] flex items-center justify-center shrink-0 ${bg}`} style={{ color }}>
      {icon}
    </div>
    <div>
      <h4 className="text-[14px] font-bold text-gray-800 mb-1 group-hover:text-gray-900">{title}</h4>
      <p className="text-[12.5px] text-gray-500 leading-snug">{desc}</p>
    </div>
  </Link>
);

const Dashboard = () => (
  <div className="px-4 sm:px-6 lg:px-8 pb-8 pt-3 max-w-[1600px] mx-auto">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div>
        <div className="inline-flex items-center gap-1.5 bg-[#e0f3e8] text-[#00a65a] text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-full mb-3 uppercase tracking-wider">
          <Globe className="w-3.5 h-3.5" /> Head Office • Branch Network
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 flex items-center gap-2 tracking-tight">
          Good Morning, Branch 👋
        </h1>
        <p className="text-gray-500 text-[13px] sm:text-sm font-medium flex items-center gap-1.5">
          <Users className="w-4 h-4 text-[#00a65a]" /> 
          You manage 5 branches — {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>
      <Link to="/branches" className="bg-[#1b8c56] hover:bg-[#157145] text-white px-5 py-2.5 rounded-[3px] text-[14.5px] font-bold shadow-sm flex items-center gap-2 transition-colors whitespace-nowrap self-start md:self-auto inline-flex">
        <Handshake className="w-4.5 h-4.5" /> All Branches
      </Link>
    </div>

    {/* Top Stats */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      <StatCard title="Branches" value="5" icon={<User className="w-6 h-6"/>} gradient="bg-gradient-to-br from-[#3c8dbc] to-[#25688f]" />
      <StatCard title="Total Students" value="962" icon={<BookOpen className="w-6 h-6"/>} gradient="bg-gradient-to-br from-[#00a65a] to-[#008045]" />
      <StatCard title="Total Staff" value="33" icon={<Contact className="w-6 h-6"/>} gradient="bg-gradient-to-br from-[#9b59b6] to-[#7f3e9a]" />
      <StatCard title="Collected This Month" value="See per branch" icon={<CreditCard className="w-6 h-6"/>} gradient="bg-gradient-to-br from-[#f39c12] to-[#d68910]" />
    </div>

    {/* Branch Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
      <BranchCard name="Aksya School" active={true} renews="02 Apr 2027" stats={{ students: 0, staff: 0, notMarked: '-', collected: '₹0' }} />
      <BranchCard name="CLOUDWAVE INTERNATIONAL SCHOOL" active={true} renews="03 Jul 2027" stats={{ students: 0, staff: 0, notMarked: '-', collected: '₹0' }} />
      <BranchCard name="Risma high school" active={true} renews="24 May 2027" stats={{ students: 34, staff: 31, notMarked: '-', collected: 'KSh0' }} />
      <BranchCard name="SSVP 3.0" active={true} renews="08 May 2027" stats={{ students: 482, staff: 0, notMarked: '-', collected: '₹0' }} />
      <BranchCard name="SUDHAKAR" active={true} renews="19 Sep 2030" stats={{ students: 446, staff: 2, notMarked: '-', collected: '₹5,000' }} />
    </div>

    {/* Comparison & Sign-ins Row */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Branch Comparison Table */}
      <div className="lg:col-span-2 bg-white rounded-[3px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 p-6 flex flex-col">
        <div className="mb-5 flex flex-col justify-center">
          <h3 className="text-[17px] font-bold text-gray-800 flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#00a65a]" /> Branch Comparison
          </h3>
          <p className="text-[12.5px] text-gray-500 font-medium">Side by side, largest first</p>
        </div>
        
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <th className="border border-gray-200 pb-3 pr-4">Branch</th>
                <th className="border border-gray-200 pb-3 text-right pr-4">Students</th>
                <th className="border border-gray-200 pb-3 text-right pr-4">Staff</th>
                <th className="border border-gray-200 pb-3 text-center pr-4">Attendance</th>
                <th className="border border-gray-200 pb-3 text-right">Collected (MTD)</th>
              </tr>
            </thead>
            <tbody className="text-[13.5px] font-semibold text-gray-700">
              <tr className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="border border-gray-200 py-3.5 pr-4">SSVP 3.0</td>
                <td className="border border-gray-200 py-3.5 text-right pr-4">482</td>
                <td className="border border-gray-200 py-3.5 text-right pr-4">0</td>
                <td className="border border-gray-200 py-3.5 text-center text-gray-400 pr-4">—</td>
                <td className="border border-gray-200 py-3.5 text-right">₹0</td>
              </tr>
              <tr className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="border border-gray-200 py-3.5 pr-4">SUDHAKAR</td>
                <td className="border border-gray-200 py-3.5 text-right pr-4">446</td>
                <td className="border border-gray-200 py-3.5 text-right pr-4">2</td>
                <td className="border border-gray-200 py-3.5 text-center text-gray-400 pr-4">—</td>
                <td className="border border-gray-200 py-3.5 text-right font-bold text-[#00a65a]">₹5,000</td>
              </tr>
              <tr className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="border border-gray-200 py-3.5 pr-4">Risma high school</td>
                <td className="border border-gray-200 py-3.5 text-right pr-4">34</td>
                <td className="border border-gray-200 py-3.5 text-right pr-4">31</td>
                <td className="border border-gray-200 py-3.5 text-center text-gray-400 pr-4">—</td>
                <td className="border border-gray-200 py-3.5 text-right">KSh0</td>
              </tr>
              <tr className="hover:bg-gray-50/50">
                <td className="border border-gray-200 py-3.5 pr-4">Aksya School</td>
                <td className="border border-gray-200 py-3.5 text-right pr-4">0</td>
                <td className="border border-gray-200 py-3.5 text-right pr-4">0</td>
                <td className="border border-gray-200 py-3.5 text-center text-gray-400 pr-4">—</td>
                <td className="border border-gray-200 py-3.5 text-right">₹0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Sign-ins */}
      <div className="bg-white rounded-[3px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 p-6 flex flex-col">
        <div className="mb-5 flex flex-col justify-center">
          <h3 className="text-[17px] font-bold text-gray-800 flex items-center gap-2">
            <Key className="w-5 h-5 text-[#00a65a]" /> Recent Sign-ins
          </h3>
          <p className="text-[12.5px] text-gray-500 font-medium">Across your branches</p>
        </div>

        <div className="space-y-4 flex-1">
          {[{ color: 'bg-purple-500', name: 'Sudhakar Pandey', school: 'SUDHAKAR', time: '8 hours ago', date: 'Sep 03 04:33 PM' },
            { color: 'bg-blue-500', name: 'Sudhakar Pandey', school: 'SUDHAKAR', time: '12 hours ago', date: 'Sep 03 12:54 PM' },
            { color: 'bg-green-500', name: 'Ngugi', school: 'Risma high school', time: '13 hours ago', date: 'Sep 03 12:01 PM' },
            { color: 'bg-red-500', name: 'Sudhakar Pandey', school: 'SUDHAKAR', time: '1 day ago', date: 'Sep 02 06:24 AM' }
          ].map((s, i) => (
            <div key={i} className="flex gap-3 p-3 rounded-[3px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className={`w-8 h-8 rounded-full ${s.color} flex items-center justify-center text-white shrink-0 mt-0.5 shadow-sm`}>
                <Key className="w-4 h-4" />
              </div>
              <div className="flex-1 flex justify-between gap-2 overflow-hidden">
                <div className="overflow-hidden">
                  <p className="text-[13px] font-semibold text-gray-800 tracking-tight truncate">
                    {s.name} <span className="text-gray-400 font-medium">(School admin)</span>
                  </p>
                  <p className="text-[11.5px] text-gray-500 flex items-center gap-1.5 mt-0.5 truncate">
                    <span className="w-3.5 h-3.5 bg-gray-200 rounded flex items-center justify-center text-[7px] text-gray-500 shrink-0">🏛️</span> 
                    {s.school} <span className="text-gray-300">•</span> {s.time}
                  </p>
                </div>
                <div className="text-[11px] font-bold text-gray-400 text-right whitespace-nowrap leading-tight mt-0.5">
                  {s.date.split(' ')[0]} {s.date.split(' ')[1]} <br/> {s.date.split(' ')[2]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Your Toolkit */}
    <div className="bg-gradient-to-br from-[#f8f9fc] to-white rounded-[3px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 p-6 sm:p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#f4f7fa] rounded-bl-full opacity-50 pointer-events-none -mr-10 -mt-10"></div>
      <div className="absolute top-6 right-6 text-gray-200 pointer-events-none">
        <Settings className="w-16 h-16 opacity-50" />
      </div>

      <div className="mb-6 relative z-10">
        <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Your Toolkit</h3>
        <h4 className="text-[20px] font-bold text-gray-800 mb-1">Everything you can run across your branches</h4>
        <p className="text-[14px] text-gray-500">One login covers all 5 branches — compare them here, then drop into any one of them to do the work.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        <ToolkitCard title="Branch Analytics" desc="Enrolment, fees and activity trends for any one branch." icon={<BarChart2 className="w-6 h-6" />} color="#3b82f6" bg="bg-blue-50" link="/reports/schools-usage" />
        <ToolkitCard title="Work Inside a Branch" desc="Sign in to a branch and run it exactly as its admin would." icon={<Key className="w-6 h-6" />} color="#8b5cf6" bg="bg-purple-50" link="/branches" />
        <ToolkitCard title="Fee Collections" desc="Every receipt across your branches, by mode and date." icon={<CreditCard className="w-6 h-6" />} color="#10b981" bg="bg-green-50" link="/reports/fee-collections" />
        <ToolkitCard title="Attendance Trends" desc="Daily student and staff presence, branch by branch." icon={<Users className="w-6 h-6" />} color="#f59e0b" bg="bg-yellow-50" link="/reports/attendance-trends" />
        <ToolkitCard title="Engagement Audit" desc="Which branches actually use exams, homework and notices." icon={<User className="w-6 h-6" />} color="#ef4444" bg="bg-red-50" link="/reports/engagement-audit" />
        <ToolkitCard title="Communications" desc="SMS, WhatsApp and email volume sent from your branches." icon={<Globe className="w-6 h-6" />} color="#14b8a6" bg="bg-teal-50" link="/reports/communications" />
        <ToolkitCard title="Certificates & ID Cards" desc="Design and print templates your branches can reuse." icon={<Contact className="w-6 h-6" />} color="#ec4899" bg="bg-pink-50" link="/templates" />
        <ToolkitCard title="Subscriptions" desc="Plan, renewal dates and invoice history per branch." icon={<CreditCard className="w-6 h-6" />} color="#f97316" bg="bg-orange-50" link="/payments" />
      </div>
    </div>
  </div>
);

export default Dashboard;
