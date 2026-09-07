import React, { useState, useEffect } from 'react';
import { 
  Filter, Phone, Mail, UserPlus, CheckCircle, 
  LayoutDashboard, Columns, Network,
  TrendingDown, TrendingUp, Users, MoreHorizontal, Clock, ArrowRight,
  PieChart as PieChartIcon, Activity, Share2, Globe, Target, X, Send
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const leads = [
  { id: 1, name: 'Vikram Singh', forClass: 'Class XI - Science', contact: '+91 9876543210', date: '04 Sep', status: 'New Lead' },
  { id: 2, name: 'Saba Khan', forClass: 'Class I', contact: 'saba.p@email.com', date: '03 Sep', status: 'Contacted' },
  { id: 3, name: 'Aarav Sharma', forClass: 'Nursery', contact: '+91 9988776655', date: '02 Sep', status: 'Campus Visit' },
  { id: 4, name: 'Kavya Gupta', forClass: 'Class V', contact: 'kgupta@email.com', date: '01 Sep', status: 'Enrolled' },
];

const LeadManagement = () => {
  const [activeTab, setActiveTab] = useState('Lead Dashboard');
  const [isAddingLead, setIsAddingLead] = useState(false);
  const [viewingLead, setViewingLead] = useState(null);
  const [emailingLead, setEmailingLead] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const p = location.pathname;
    if (p.includes('/lead-pipeline')) setActiveTab('Lead Pipeline Board');
    else if (p.includes('/lead-sources')) setActiveTab('Lead Sources & Stages');
    else setActiveTab('Lead Dashboard');
  }, [location.pathname]);

  const handleTabClick = (tabName, route) => {
    setActiveTab(tabName);
    navigate(route);
  };

  const handleSaveLead = () => {
    setIsAddingLead(false);
    Swal.fire({
      title: 'Lead Saved!',
      text: 'Lead successfully registered and passed to the CRM pipeline.',
      icon: 'success',
      confirmButtonColor: '#0d9488',
      confirmButtonText: 'Go to Pipeline',
      customClass: {
         popup: 'rounded-none border-2 border-gray-200',
         confirmButton: 'rounded-none uppercase tracking-wide font-bold px-5'
      }
    });
  };

  const handleSendEmail = () => {
    const toName = emailingLead?.name || 'Lead';
    setEmailingLead(null);
    Swal.fire({
      title: 'Email Delivered',
      text: `Your message has been successfully dispatched to ${toName}.`,
      icon: 'success',
      confirmButtonColor: '#2563eb',
      confirmButtonText: 'Okay',
      customClass: {
         popup: 'rounded-none border-2 border-gray-200',
         confirmButton: 'rounded-none uppercase tracking-wide font-bold px-5'
      }
    });
  };

  const handleLogCall = () => {
    Swal.fire({
       title: 'Call Logged!',
       text: `Your conversation with ${viewingLead?.name} is securely logged in the history.`,
       icon: 'success',
       confirmButtonColor: '#0d9488',
       confirmButtonText: 'Awesome',
       customClass: {
         popup: 'rounded-none border-2 border-gray-200',
         confirmButton: 'rounded-none uppercase tracking-wide font-bold px-5'
       }
    });
  };

  const tabs = [
    { name: 'Lead Dashboard', icon: <LayoutDashboard className="w-[14px] h-[14px]" />, route: '/lead-dashboard' },
    { name: 'Lead Pipeline Board', icon: <Columns className="w-[14px] h-[14px]" />, route: '/lead-pipeline' },
    { name: 'Lead Sources & Stages', icon: <Network className="w-[14px] h-[14px]" />, route: '/lead-sources' }
  ];

  const renderDashboard = () => (
    <div className="space-y-6 animate-in fade-in pb-10">
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         <div className="bg-white border-l-4 border-l-teal-500 border border-gray-200 shadow-sm rounded-none p-5">
           <div className="flex justify-between items-start mb-2">
             <span className="text-[12px] font-bold text-gray-500 uppercase tracking-wider">Total Leads</span>
             <Users className="w-4 h-4 text-teal-500" />
           </div>
           <h3 className="text-3xl font-black text-gray-800">142</h3>
           <p className="text-[11px] text-teal-600 font-bold mt-1 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> +12% this month</p>
         </div>

         <div className="bg-white border-l-4 border-l-blue-500 border border-gray-200 shadow-sm rounded-none p-5">
           <div className="flex justify-between items-start mb-2">
             <span className="text-[12px] font-bold text-gray-500 uppercase tracking-wider">New Inquiries</span>
             <Phone className="w-4 h-4 text-blue-500" />
           </div>
           <h3 className="text-3xl font-black text-gray-800">28</h3>
           <p className="text-[11px] text-gray-500 font-medium mt-1">Pending quick response</p>
         </div>

         <div className="bg-white border-l-4 border-l-emerald-500 border border-gray-200 shadow-sm rounded-none p-5">
           <div className="flex justify-between items-start mb-2">
             <span className="text-[12px] font-bold text-gray-500 uppercase tracking-wider">Converted</span>
             <CheckCircle className="w-4 h-4 text-emerald-500" />
           </div>
           <h3 className="text-3xl font-black text-gray-800">45</h3>
           <p className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> +5% conversion rate</p>
         </div>

         <div className="bg-white border-l-4 border-l-red-500 border border-gray-200 shadow-sm rounded-none p-5">
           <div className="flex justify-between items-start mb-2">
             <span className="text-[12px] font-bold text-gray-500 uppercase tracking-wider">Dropped</span>
             <TrendingDown className="w-4 h-4 text-red-500" />
           </div>
           <h3 className="text-3xl font-black text-gray-800">12</h3>
           <p className="text-[11px] text-gray-500 font-medium mt-1">Mainly due to location</p>
         </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white border-2 border-gray-300 shadow-sm rounded-none overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-300 flex justify-between items-center bg-gray-100">
          <h3 className="text-[14px] font-black text-gray-800 flex items-center gap-2"><LayoutDashboard className="w-4 h-4 text-teal-600" /> Fresh Leads List</h3>
          <button 
             onClick={() => setIsAddingLead(true)}
             className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 flex items-center gap-2 rounded-none shadow-sm text-[12px] font-bold transition-all active:scale-95 border border-teal-700">
             <UserPlus className="w-3.5 h-3.5" /> Add Manual Lead
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-gray-300">
            <thead>
              <tr className="border-b border-gray-300 text-[12px] font-black text-gray-700 bg-gray-100 uppercase tracking-wider h-12">
                <th className="px-6 py-3 font-black border-r border-gray-300">Contact Person</th>
                <th className="px-6 py-3 font-black text-center border-r border-gray-300">Class / Level</th>
                <th className="px-6 py-3 font-black text-center border-r border-gray-300">Date Received</th>
                <th className="px-6 py-3 font-black text-center border-r border-gray-300">Current Stage</th>
                <th className="px-6 py-3 font-black text-right">Quick Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map(lead => (
                <tr key={lead.id} className="border-b border-gray-300 hover:bg-teal-50/30 transition-colors">
                   <td className="px-6 py-4 border-r border-gray-300">
                     <div className="flex items-center gap-3">
                       <div className="w-9 h-9 rounded-none bg-teal-50 text-teal-800 font-black flex items-center justify-center text-sm border-2 border-teal-200 shadow-sm">
                         {lead.name.charAt(0)}
                       </div>
                       <div>
                         <h4 className="font-bold text-gray-900 text-[13px]">{lead.name}</h4>
                         <span className="text-[11px] text-gray-600 flex items-center gap-1 font-bold"><Phone className="w-3 h-3 text-teal-600" /> {lead.contact}</span>
                       </div>
                     </div>
                   </td>
                   <td className="px-6 py-4 text-center border-r border-gray-300">
                     <span className="bg-gray-100 text-gray-800 border border-gray-300 px-3 py-1.5 rounded-none text-[11px] font-bold tracking-wide shadow-sm">
                       {lead.forClass}
                     </span>
                   </td>
                   <td className="px-6 py-4 text-center text-[12px] text-gray-600 font-medium border-r border-gray-300">
                     <span className="flex items-center justify-center gap-1.5 font-bold"><Clock className="w-3.5 h-3.5 text-gray-400" /> {lead.date}</span>
                   </td>
                   <td className="px-6 py-4 text-center border-r border-gray-300">
                     <span className={`inline-flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-none border shadow-sm ${
                       lead.status === 'New Lead' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                       lead.status === 'Contacted' ? 'bg-yellow-50 text-yellow-800 border-yellow-200' :
                       lead.status === 'Enrolled' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                       'bg-orange-50 text-orange-800 border-orange-200'
                     }`}>
                       {lead.status === 'Enrolled' ? <CheckCircle className="w-3.5 h-3.5" /> : <Activity className="w-3.5 h-3.5" />}
                       {lead.status}
                     </span>
                   </td>
                   <td className="px-6 py-4 text-right border-r border-gray-300 bg-gray-50/20">
                      <div className="flex justify-center gap-3">
                         <button 
                            onClick={() => setEmailingLead(lead)}
                            className="w-8 h-8 rounded-none border border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-600 hover:text-blue-700 flex items-center justify-center transition-all bg-white shadow-sm active:scale-90"
                            title="Send Email">
                            <Mail className="w-4 h-4" />
                         </button>
                         <button 
                            onClick={() => setViewingLead(lead)}
                            className="w-8 h-8 rounded-none border border-gray-300 hover:border-teal-500 hover:bg-teal-50 text-gray-600 hover:text-teal-700 flex items-center justify-center transition-all bg-white shadow-sm active:scale-90"
                            title="View Full Profile">
                            <ArrowRight className="w-4 h-4" />
                         </button>
                      </div>
                   </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderPipelineBoard = () => {
    const stages = [
      { id: 'new', name: 'New Lead', color: 'blue', items: [
        leads[0]
      ]},
      { id: 'contacted', name: 'Contacted', color: 'yellow', items: [
        leads[1]
      ]},
      { id: 'visit', name: 'Campus Visit', color: 'orange', items: [
        leads[2]
      ]},
      { id: 'app', name: 'Application', color: 'purple', items: []},
      { id: 'enrolled', name: 'Enrolled', color: 'emerald', items: [
        leads[3]
      ]}
    ];

    return (
      <div className="flex gap-5 overflow-x-auto pb-6 hide-scrollbar animate-in fade-in h-[600px]">
        {stages.map(stage => {
            const empty = stage.items.length === 0;
            const colors = {
               'blue': 'bg-blue-500', 'yellow': 'bg-yellow-500', 'orange': 'bg-orange-500', 'purple': 'bg-purple-500', 'emerald': 'bg-emerald-500'
            };
            
            return (
              <div key={stage.id} className="min-w-[280px] w-[280px] flex flex-col bg-gray-50 border border-gray-300 rounded-none shadow-sm relative pt-1">
                 {/* Top thick border line */}
                 <div className={`absolute top-0 left-0 w-full h-1.5 rounded-none ${colors[stage.color]}`}></div>
                 
                 {/* Header */}
                 <div className="p-4 flex justify-between items-center bg-white border-b border-gray-200 rounded-none mt-1 shadow-sm">
                    <div className="flex items-center gap-2.5">
                       <h3 className="font-black text-gray-800 text-[13px] uppercase tracking-wider">{stage.name}</h3>
                    </div>
                    <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-none text-[11px] font-black border border-gray-300">{stage.items.length}</span>
                 </div>
                 
                 {/* Column Area */}
                 <div className="flex-1 overflow-y-auto p-3 space-y-3 hide-scrollbar">
                    {stage.items.map(item => (
                      <div key={item.id} className="bg-white border-2 border-gray-200 shadow-sm rounded-none p-3.5 cursor-grab hover:border-teal-400 hover:shadow-md transition-all group">
                         <div className="flex justify-between items-start mb-2.5">
                           <h4 className="font-bold text-gray-900 text-[13px] group-hover:text-teal-700 transition-colors">{item.name}</h4>
                           <button className="text-gray-400 hover:text-gray-800"><MoreHorizontal className="w-4 h-4" /></button>
                         </div>
                         <p className="text-[10px] text-teal-800 font-extrabold bg-teal-50 border border-teal-200 inline-block px-2 py-1 rounded-none uppercase tracking-wide mb-3 shadow-sm">{item.forClass}</p>
                         <div className="flex items-center justify-between text-gray-500 text-[11px] font-bold border-t border-gray-200 pt-3">
                           <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-gray-400"/> {item.date}</div>
                           <div className="flex gap-2">
                             <Mail className="w-4 h-4 hover:text-teal-600 transition-colors cursor-pointer" onClick={() => setEmailingLead(item)} />
                             <ArrowRight className="w-4 h-4 hover:text-teal-600 transition-colors cursor-pointer" onClick={() => setViewingLead(item)} />
                           </div>
                         </div>
                      </div>
                    ))}
                    {empty && (
                       <div className="border-2 border-dashed border-gray-300 bg-white/80 rounded-none h-24 flex items-center justify-center text-gray-500 text-[12px] font-bold">
                         Drag leads here
                       </div>
                    )}
                 </div>
              </div>
            )
        })}
      </div>
    )
  };

  const renderSourcesAndStages = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in pb-10">
       
       {/* Sources */}
       <div className="bg-white shadow-sm border border-gray-300 rounded-none overflow-hidden">
          <div className="p-5 border-b border-gray-200 bg-gray-50">
             <h3 className="font-black text-gray-800 flex items-center gap-2"><PieChartIcon className="w-5 h-5 text-purple-600" /> Lead Sources Analytics</h3>
          </div>
          <div className="p-6">
             <div className="h-[200px] flex items-center justify-center border-[8px] border-gray-50 rounded-full w-[200px] mx-auto mb-8 relative">
                {/* Donut chart visuals remain truly rounded to stay visual charts */}
                <div className="absolute inset-0 border-[16px] border-blue-500 rounded-full clip-half transform -rotate-45"></div>
                <div className="absolute inset-0 border-[16px] border-emerald-500 rounded-full clip-half transform rotate-45 opacity-60"></div>
                <div className="absolute inset-0 border-[16px] border-orange-400 rounded-full clip-quarter transform rotate-180 opacity-80"></div>
                <div className="text-center">
                  <p className="text-3xl font-black text-gray-800">142</p>
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Total</p>
                </div>
             </div>
             
             <ul className="space-y-4">
                <li className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-none border border-blue-200 bg-blue-50 text-blue-700 flex items-center justify-center shadow-sm"><Share2 className="w-4 h-4" /></div>
                      <div>
                         <p className="text-[13px] font-bold text-gray-800">Facebook Campaigns</p>
                         <p className="text-[11px] text-gray-500 font-medium">Digital Marketing</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-[14px] font-black text-gray-800">45%</p>
                      <p className="text-[11px] text-emerald-600 font-bold">+5% this wk</p>
                   </div>
                </li>
                <li className="flex items-center justify-between border-t border-gray-200 pt-4">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-none border border-orange-200 bg-orange-50 text-orange-700 flex items-center justify-center shadow-sm"><Globe className="w-4 h-4" /></div>
                      <div>
                         <p className="text-[13px] font-bold text-gray-800">Website Organic</p>
                         <p className="text-[11px] text-gray-500 font-medium">SEO & Direct Search</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-[14px] font-black text-gray-800">30%</p>
                      <p className="text-[11px] text-red-500 font-bold">-2% this wk</p>
                   </div>
                </li>
                <li className="flex items-center justify-between border-t border-gray-200 pt-4">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-none border border-emerald-200 bg-emerald-50 text-emerald-700 flex items-center justify-center shadow-sm"><Target className="w-4 h-4" /></div>
                      <div>
                         <p className="text-[13px] font-bold text-gray-800">Walk-ins</p>
                         <p className="text-[11px] text-gray-500 font-medium">Physical Visits</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-[14px] font-black text-gray-800">15%</p>
                      <p className="text-[11px] text-gray-400 font-bold">Stable</p>
                   </div>
                </li>
             </ul>
          </div>
       </div>

       {/* Config */}
       <div className="bg-white shadow-sm border border-gray-300 rounded-none overflow-hidden">
          <div className="p-5 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
             <h3 className="font-black text-gray-800 flex items-center gap-2"><Columns className="w-5 h-5 text-teal-600" /> Pipeline Stage Sequence</h3>
             <button className="text-[12px] font-bold text-teal-700 bg-teal-50 px-4 py-1.5 rounded-none hover:bg-teal-100 transition-colors border border-teal-200 shadow-sm active:scale-95">Add Stage</button>
          </div>
          <div className="p-6">
             <div className="relative border-l-2 border-gray-200 ml-4 space-y-6">
                
                <div className="relative pl-6">
                   <div className="absolute top-1 -left-[9px] w-4 h-4 rounded-none bg-blue-500 border border-blue-700 shadow-sm"></div>
                   <div className="bg-gray-50 border border-gray-300 rounded-none px-4 py-3 shadow-sm hover:border-blue-400 transition-colors cursor-pointer">
                      <h4 className="font-bold text-[14px] text-gray-800">New Lead</h4>
                      <p className="text-[12px] text-gray-500 mt-0.5 font-medium">Auto-assigned when an inquiry is received from any source.</p>
                   </div>
                </div>

                <div className="relative pl-6">
                   <div className="absolute top-1 -left-[9px] w-4 h-4 rounded-none bg-yellow-500 border border-yellow-700 shadow-sm"></div>
                   <div className="bg-gray-50 border border-gray-300 rounded-none px-4 py-3 shadow-sm hover:border-yellow-400 transition-colors cursor-pointer">
                      <h4 className="font-bold text-[14px] text-gray-800">Contacted</h4>
                      <p className="text-[12px] text-gray-500 mt-0.5 font-medium">Initial call or email communication has occurred.</p>
                   </div>
                </div>

                <div className="relative pl-6">
                   <div className="absolute top-1 -left-[9px] w-4 h-4 rounded-none bg-orange-500 border border-orange-700 shadow-sm"></div>
                   <div className="bg-gray-50 border border-gray-300 rounded-none px-4 py-3 shadow-sm hover:border-orange-400 transition-colors cursor-pointer">
                      <h4 className="font-bold text-[14px] text-gray-800">Campus Visit</h4>
                      <p className="text-[12px] text-gray-500 mt-0.5 font-medium">Family has visited the campus for a tour.</p>
                   </div>
                </div>
                
                <div className="relative pl-6">
                   <div className="absolute top-1 -left-[9px] w-4 h-4 rounded-none bg-purple-500 border border-purple-700 shadow-sm"></div>
                   <div className="bg-gray-50 border border-gray-300 rounded-none px-4 py-3 shadow-sm hover:border-purple-400 transition-colors cursor-pointer">
                      <h4 className="font-bold text-[14px] text-gray-800">Application</h4>
                      <p className="text-[12px] text-gray-500 mt-0.5 font-medium">Formal admission forms submitted, pending payment.</p>
                   </div>
                </div>

                <div className="relative pl-6">
                   <div className="absolute top-1 -left-[9px] w-4 h-4 rounded-none bg-emerald-500 border border-emerald-700 shadow-sm"></div>
                   <div className="bg-gray-50 border border-gray-300 rounded-none px-4 py-3 shadow-sm hover:border-emerald-400 transition-colors cursor-pointer">
                      <h4 className="font-bold text-[14px] text-gray-800">Enrolled</h4>
                      <p className="text-[12px] text-gray-500 mt-0.5 font-medium">Student successfully on-boarded to the ERP.</p>
                   </div>
                </div>

             </div>
          </div>
       </div>

    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto bg-gray-100 theme-app-bg text-sm">
      <div className="px-6 py-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 via-emerald-500 to-teal-400"></div>
        <div>
          <h1 className="text-[22px] font-black text-gray-800 tracking-tight flex items-center gap-3">
             <div className="w-8 h-8 rounded-none bg-teal-600 flex items-center justify-center shadow-sm border border-teal-700">
              <Filter className="w-4 h-4 text-white" />
            </div>
            Lead Management
          </h1>
          <p className="text-[13px] text-gray-500 mt-1 font-medium">Manage student admissions, track conversion funnels, and boost enrollments.</p>
        </div>
      </div>
      
      <div className="px-6 bg-white border-b border-gray-300 flex overflow-x-auto hide-scrollbar">
        {tabs.map(t => {
          const isActive = activeTab === t.name;
          return (
            <button 
              key={t.name}
              onClick={() => handleTabClick(t.name, t.route)}
              className={`flex items-center gap-2 px-5 py-4 font-bold text-[12px] uppercase tracking-wider whitespace-nowrap transition-colors border-b-[3px] 
              ${isActive 
                  ? 'text-teal-700 border-teal-600 bg-teal-50/30' 
                  : 'text-gray-500 border-transparent hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}>
                {React.cloneElement(t.icon, { className: isActive ? 'text-teal-600 w-4 h-4' : 'text-gray-400 w-4 h-4' })}
              </div>
              {t.name}
            </button>
          )
        })}
      </div>

      <div className="p-7 max-w-[1500px] mx-auto min-h-[500px]">
        {activeTab === 'Lead Dashboard' ? renderDashboard() : 
         activeTab === 'Lead Pipeline Board' ? renderPipelineBoard() : 
         activeTab === 'Lead Sources & Stages' ? renderSourcesAndStages() :
         <></>}
      </div>

      {/* Add Lead Modal */}
      {isAddingLead && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white max-w-lg w-full rounded-none shadow-2xl border border-gray-200 flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h2 className="text-[16px] font-black text-gray-800 uppercase tracking-tight flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-teal-600" /> Register New Lead
              </h2>
              <button 
                onClick={() => setIsAddingLead(false)}
                className="text-gray-400 hover:text-red-500 transition-colors">
                <ArrowRight className="w-5 h-5 rotate-45 transform" /> 
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
               <div className="grid grid-cols-2 gap-5 mb-5">
                  <div className="col-span-2">
                     <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-2">Student / Parent Name</label>
                     <input type="text" className="w-full border-2 border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none rounded-none" placeholder="e.g. Rahul Sharma" />
                  </div>
                  <div>
                     <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-2">Contact Number</label>
                     <input type="text" className="w-full border-2 border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none rounded-none" placeholder="e.g. +91 987654..." />
                  </div>
                  <div>
                     <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-2">Email Address</label>
                     <input type="email" className="w-full border-2 border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none rounded-none" placeholder="Optional" />
                  </div>
                  <div className="col-span-2">
                     <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-2">For Class / Grade</label>
                     <select className="w-full border-2 border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none rounded-none bg-white">
                        <option>Nursery</option>
                        <option>Class I</option>
                        <option>Class V</option>
                        <option>Class XI</option>
                     </select>
                  </div>
               </div>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
               <button 
                 onClick={() => setIsAddingLead(false)}
                 className="px-5 py-2 border-2 border-gray-300 text-gray-700 font-bold text-[12px] bg-white hover:bg-gray-100 transition-colors uppercase tracking-wider rounded-none">
                 Cancel
               </button>
               <button 
                 onClick={handleSaveLead}
                 className="px-5 py-2 bg-teal-600 text-white font-bold text-[12px] hover:bg-teal-700 transition-colors uppercase tracking-wider rounded-none shadow-sm flex items-center gap-2">
                 <CheckCircle className="w-4 h-4" /> Save Lead
               </button>
            </div>
          </div>
        </div>
      )}

      {/* Email Modal */}
      {emailingLead && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white max-w-lg w-full rounded-none shadow-2xl border border-gray-200 flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h2 className="text-[14px] font-black text-gray-800 uppercase tracking-tight flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600" /> Compose Email
              </h2>
              <button 
                onClick={() => setEmailingLead(null)}
                className="text-gray-400 hover:text-red-500 transition-colors">
                <X className="w-5 h-5" /> 
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">To</label>
                <div className="w-full border border-gray-300 px-3 py-2 text-sm bg-gray-50 font-bold text-gray-800 rounded-none">{emailingLead.name} ({emailingLead.contact})</div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Subject</label>
                <input type="text" className="w-full border-2 border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none rounded-none" defaultValue="Following up on your admission inquiry" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Message</label>
                <textarea rows={5} className="w-full border-2 border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none rounded-none" placeholder="Type your message here..."></textarea>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
               <button onClick={() => setEmailingLead(null)} className="px-5 py-2 border border-gray-300 text-gray-700 font-bold text-[12px] bg-white hover:bg-gray-100 uppercase rounded-none">Cancel</button>
               <button onClick={handleSendEmail} className="px-5 py-2 bg-blue-600 text-white font-bold text-[12px] hover:bg-blue-700 uppercase rounded-none shadow-sm flex items-center gap-2"><Send className="w-3.5 h-3.5"/> Send Email</button>
            </div>
          </div>
        </div>
      )}

      {/* Lead Profile Slide-over */}
      {viewingLead && (
        <>
          <div className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm animate-in fade-in" onClick={() => setViewingLead(null)}></div>
          <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl border-l border-gray-300 animate-in slide-in-from-right flex flex-col">
            <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
               <h2 className="text-[16px] font-black uppercase text-gray-800 tracking-tight flex items-center gap-2"><UserPlus className="w-5 h-5 text-teal-600"/> Lead Profile View</h2>
               <button onClick={() => setViewingLead(null)} className="text-gray-400 hover:text-red-500 transition-colors"><X className="w-6 h-6"/></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-0">
               {/* Header Banner */}
               <div className="bg-gradient-to-br from-teal-500 to-emerald-600 p-8 text-center text-white relative">
                 <div className="w-20 h-20 mx-auto rounded-none bg-white text-teal-600 font-black flex items-center justify-center text-3xl shadow-lg border-2 border-white/50 mb-3">
                    {viewingLead.name.charAt(0)}
                 </div>
                 <h2 className="text-2xl font-black">{viewingLead.name}</h2>
                 <p className="text-teal-100 font-medium text-sm mt-1">{viewingLead.forClass}</p>
                 <div className="absolute bottom-[-16px] left-1/2 transform -translate-x-1/2 bg-white text-blue-600 text-[11px] font-black uppercase px-4 py-1.5 border border-gray-200 shadow-sm rounded-none tracking-widest">{viewingLead.status}</div>
               </div>

               <div className="p-8 pt-10 space-y-8">
                 {/* Contact Details */}
                 <div>
                    <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Contact Details</h3>
                    <div className="space-y-4">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-none bg-gray-50 border border-gray-200 flex items-center justify-center"><Phone className="w-4 h-4 text-gray-500"/></div>
                          <div><p className="text-[11px] text-gray-500 uppercase font-bold">Primary Phone</p><p className="font-medium text-gray-900">{viewingLead.contact}</p></div>
                       </div>
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-none bg-gray-50 border border-gray-200 flex items-center justify-center"><Clock className="w-4 h-4 text-gray-500"/></div>
                          <div><p className="text-[11px] text-gray-500 uppercase font-bold">Last Activity</p><p className="font-medium text-gray-900">{viewingLead.date} - System Trigger</p></div>
                       </div>
                    </div>
                 </div>

                 {/* Action Buttons */}
                 <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => { setEmailingLead(viewingLead); setViewingLead(null); }} className="w-full py-3 bg-blue-50 text-blue-700 font-bold text-[12px] uppercase border border-blue-200 shadow-sm flex flex-col items-center justify-center gap-2 hover:bg-blue-100 active:scale-95 transition-all">
                       <Mail className="w-5 h-5"/> Send Email
                    </button>
                    <button onClick={handleLogCall} className="w-full py-3 bg-teal-50 text-teal-700 font-bold text-[12px] uppercase border border-teal-200 shadow-sm flex flex-col items-center justify-center gap-2 hover:bg-teal-100 active:scale-95 transition-all">
                       <Phone className="w-5 h-5"/> Log Call
                    </button>
                 </div>
               </div>
            </div>
            
            <div className="border-t border-gray-200 p-4 bg-gray-50">
               <button onClick={() => setViewingLead(null)} className="w-full py-2.5 bg-gray-800 text-white font-bold text-[13px] uppercase tracking-wider rounded-none shadow-sm hover:bg-black transition-colors">Close Profile</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default LeadManagement;
