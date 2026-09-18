import React from 'react';
import { Routes, Route, useNavigate, useParams, Link } from 'react-router-dom';
import { LifeBuoy, Plus, ArrowRight, ArrowLeft, Edit, Info, Paperclip, Send, CornerDownRight, CheckCircle2 } from 'lucide-react';

const TicketList = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState('All');

  const tabs = [
    { name: 'All', count: 1 },
    { name: 'Open', count: 1 },
    { name: 'Resolved', count: 0 }
  ];

  return (
    <div className="bg-white min-h-[calc(100vh-[header-height])] w-full">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-6 py-6 border-b border-gray-100/80 bg-white">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-none bg-[#f0f0ff] flex items-center justify-center text-[#5F52FF] flex-shrink-0">
            <LifeBuoy className="w-6 h-6" strokeWidth={2}/>
          </div>
          <div>
            <h1 className="text-[22px] font-bold text-gray-800 leading-tight">Support</h1>
            <p className="text-[13px] text-gray-500 mt-1">Raise a query to the platform team and track its resolution</p>
          </div>
        </div>
        <button 
          onClick={() => navigate('/contact-support/new')}
          className="mt-4 sm:mt-0 bg-[#5F52FF] hover:bg-[#4E41E6] text-white px-4 py-2.5 font-bold rounded-none flex items-center gap-2 text-sm shadow-sm transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" strokeWidth={3} /> New Ticket
        </button>
      </div>

      {/* Classic Tabs (Interactive) */}
      <div className="px-6 py-5 flex gap-3 overflow-x-auto bg-white border-b border-gray-100/60">
        {tabs.map((tab) => (
          <div 
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex items-center gap-2.5 px-6 py-2 rounded-none text-[13px] cursor-pointer transition-colors ${
              activeTab === tab.name 
                ? 'bg-[#5F52FF] text-white font-semibold shadow-sm' 
                : 'bg-white border border-gray-200 text-gray-700 font-medium hover:bg-gray-50'
            }`}
          >
            {tab.name} 
            <span className={`w-5 h-5 flex items-center justify-center rounded-none text-[11px] font-bold ${
              activeTab === tab.name ? 'bg-white/20 text-white' : 'bg-[#f0f2f5] text-gray-600'
            }`}>
              {tab.count}
            </span>
          </div>
        ))}
      </div>

      {/* List Area (Modern Classic Grid) */}
      <div className="px-6 py-6 pb-20">
        <div className="border border-gray-200/80 rounded-none bg-white shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex flex-col">
          
          {/* List Header */}
          <div className="hidden md:grid grid-cols-[1fr_120px_100px_100px_60px] gap-6 px-6 py-4 border-b border-gray-100 bg-gray-50/50 rounded-t-xl text-[11px] font-bold text-gray-500 uppercase tracking-widest">
            <div>Ticket Overview</div>
            <div>Priority</div>
            <div>Status</div>
            <div>Last Update</div>
            <div className="text-right">Action</div>
          </div>

          {/* List Items (Rows) */}
          <div 
            onClick={() => navigate('/contact-support/2')}
            className="group flex flex-col md:grid md:grid-cols-[1fr_120px_100px_100px_60px] gap-4 md:gap-6 px-6 py-5 items-start md:items-center border-b border-gray-50 hover:bg-gray-50/70 transition-all cursor-pointer last:border-0 last:rounded-b-xl"
          >
            {/* Title & Meta */}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-gray-400 font-bold text-[11px] uppercase tracking-wide">TKT-000001</span>
                <span className="w-1 h-1 rounded-none bg-gray-300"></span>
                <span className="text-gray-500 text-[12px] font-medium">Billing & subscription</span>
                <span className="w-1 h-1 rounded-none bg-gray-300"></span>
                <span className="text-gray-400 text-[11px] font-medium flex items-center gap-1"><Paperclip className="w-3 h-3" /> 1</span>
              </div>
              <h3 className="text-gray-800 font-bold text-[15px] group-hover:text-[#5F52FF] transition-colors leading-tight pr-4">We are facing plan upgrade related issue</h3>
            </div>

            {/* Priority */}
            <div>
              <span className="text-blue-600 font-bold text-[12px] tracking-wide flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-none bg-blue-600 opacity-80"></div> Normal
              </span>
            </div>

            {/* Status */}
            <div>
              <span className="bg-amber-50 text-amber-600 px-3 py-1 rounded-none text-[11px] font-bold tracking-wide border border-amber-100/60 inline-block">
                Open
              </span>
            </div>

            {/* Date */}
            <div>
              <span className="text-gray-500 font-medium text-[13px]">1 month ago</span>
            </div>

            {/* Action */}
            <div className="text-right w-full md:w-auto flex justify-end">
              <button 
                onClick={(e) => { e.stopPropagation(); navigate('/contact-support/2'); }}
                className="w-9 h-9 flex items-center justify-center rounded-none text-gray-400 group-hover:text-[#5F52FF] group-hover:bg-[#5F52FF]/10 transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const CreateTicket = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#f4f7fc] w-full min-h-[calc(100vh-[header-height])] p-6 pb-20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-none bg-[#5F52FF] flex items-center justify-center text-white flex-shrink-0 shadow-sm border border-indigo-500">
            <LifeBuoy className="w-4 h-4" strokeWidth={2.5}/>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800 leading-tight">New Support Ticket</h1>
            <p className="text-[13px] text-gray-500 mt-0.5">Describe your issue or request — the platform team will respond here</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden min-h-[500px] flex flex-col">
            <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2 bg-gray-50/50">
              <Edit className="w-4 h-4 text-[#5F52FF] stroke-[2.5]" />
              <h2 className="text-sm font-bold text-gray-800 tracking-wide">Ticket details</h2>
            </div>
            
            <div className="p-6 flex-grow">
              <div className="mb-6">
                <label className="block text-[13px] font-bold text-gray-800 mb-1.5">Subject <span className="text-red-500">*</span></label>
                <input type="text" placeholder="e.g. Unable to generate fee receipts" className="w-full border border-gray-300 rounded-none p-2.5 text-sm outline-none focus:border-[#5F52FF] transition-colors shadow-sm" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                <div>
                  <label className="block text-[13px] font-bold text-gray-800 mb-1.5">Category <span className="text-red-500">*</span></label>
                  <select className="w-full border border-gray-300 rounded-none p-2.5 text-sm outline-none bg-white focus:border-[#5F52FF] transition-colors shadow-sm">
                    <option>Technical issue</option>
                    <option>Billing & subscription</option>
                    <option>Feature request</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-gray-800 mb-1.5">Priority <span className="text-red-500">*</span></label>
                  <select className="w-full border border-gray-300 rounded-none p-2.5 text-sm outline-none bg-white focus:border-[#5F52FF] transition-colors shadow-sm">
                    <option>Normal</option>
                    <option>High</option>
                    <option>Urgent</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-[13px] font-bold text-gray-800 mb-1.5">Message <span className="text-red-500">*</span></label>
                <textarea placeholder="Tell us what happened, what you expected, and any steps to reproduce it." rows="6" className="w-full border border-gray-300 rounded-none p-3 text-sm outline-none focus:border-[#5F52FF] transition-colors resize-y shadow-sm"></textarea>
              </div>
              
              <div>
                <label className="flex items-center gap-1.5 text-[13px] font-bold text-gray-800 mb-2">
                  <Paperclip className="w-3.5 h-3.5 text-gray-500" /> Attachment <span className="text-gray-500 font-normal text-xs">(optional)</span>
                </label>
                <div className="flex items-center gap-2">
                  <button className="border border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-1.5 rounded-none text-[13px] font-medium transition-colors shadow-sm cursor-pointer">Choose File</button>
                  <span className="text-[13px] text-gray-600">No file chosen</span>
                </div>
                <p className="text-[11px] text-gray-400 mt-2 font-medium">Screenshot or document up to 5 MB (jpg, png, pdf, doc, xls, txt, zip).</p>
              </div>
            </div>

            <div className="px-6 py-4 flex items-center justify-end gap-3 border-t border-gray-100 bg-gray-50/50">
              <button onClick={() => navigate('/contact-support')} className="px-4 py-2 bg-white border border-gray-300 rounded-none text-sm text-gray-700 font-bold hover:bg-gray-50 transition-colors shadow-sm cursor-pointer">
                Cancel
              </button>
              <button onClick={() => navigate('/contact-support')} className="px-4 py-2 bg-[#5F52FF] text-white rounded-none text-sm font-bold flex items-center gap-2 hover:bg-[#4E41E6] transition-colors shadow-sm cursor-pointer">
                <Send className="w-3.5 h-3.5" /> Submit Ticket
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-none border border-gray-200 shadow-sm sticky top-6">
            <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2 bg-gray-50/50">
              <div className="w-5 h-5 rounded-none bg-[#f0f0ff] flex items-center justify-center text-[#5F52FF]">
                <Info className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <h2 className="text-sm font-bold text-gray-800 tracking-wide">Before you submit</h2>
            </div>
            <div className="p-6">
              <ul className="space-y-4 text-[13px] text-gray-600 font-medium pb-2">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-none bg-gray-400 mt-2 shrink-0"></span>
                  <span className="leading-relaxed">Check the <Link to="/help-center/ai-chatbot" className="text-orange-500 font-bold hover:underline">Help Center</Link> — your answer may already be there.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-none bg-gray-400 mt-2 shrink-0"></span>
                  <span className="leading-relaxed">Pick <b className="text-gray-800">Urgent</b> only for outages blocking daily operations.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-none bg-gray-400 mt-2 shrink-0"></span>
                  <span className="leading-relaxed">Attach a screenshot for anything visual — it speeds up resolution.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-none bg-gray-400 mt-2 shrink-0"></span>
                  <span className="leading-relaxed">You'll get replies in your notification bell and by email.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TicketDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="bg-[#f4f7fc] w-full min-h-[calc(100vh-[header-height])] p-6 pb-20">
      <div className="max-w-[1400px] w-full mx-auto">
        {/* Detail Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6">
          <div>
            <h1 className="text-[24px] font-bold text-gray-800 leading-tight">We are facing plan upgrade related issue</h1>
            <p className="text-[12px] text-gray-400 mt-1 font-medium">TKT-000001 - opened 21 Jul 2026</p>
          </div>
          <button 
            onClick={() => navigate('/contact-support')}
            className="mt-4 sm:mt-0 bg-white border border-gray-200 text-gray-700 font-bold px-3.5 py-2 rounded-none text-xs hover:bg-gray-50 flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All tickets
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6">
          {/* Left Content */}
          <div className="space-y-6">
            
            {/* Timeline Container */}
            <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden flex flex-col">
              {/* Meta Header */}
              <div className="px-5 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3 bg-gray-50/30">
                <span className="bg-amber-50 text-amber-600 border border-amber-100 px-3 py-1 rounded-none shadow-sm text-[11px] font-bold tracking-wide">Open</span>
                
                <span className="text-blue-600 text-[11px] font-bold tracking-wide">Normal priority</span>
                
                <span className="text-gray-800 text-[11px] font-bold tracking-wide">Billing & subscription</span>
              </div>
              
              {/* Chat Flow */}
              <div className="p-6 min-h-[150px]">
                {/* Message Bubble */}
                <div className="flex flex-col items-end mb-4">
                  <p className="text-[10px] text-gray-400 font-semibold mb-1.5 pr-1">school admin - 21 Jul 2026, 02:38 PM</p>
                  <div className="flex items-start justify-end gap-3 max-w-[80%]">
                    <div className="bg-[#1f2937] text-white p-3.5 rounded-none rounded-tr-sm text-[13px] shadow-sm text-right leading-relaxed">
                      We are facing plan upgrade related issue .
                    </div>
                    <div className="w-8 h-8 rounded-none bg-[#3b82f6] text-white font-bold flex items-center justify-center flex-shrink-0 text-xs shadow-sm">
                      S
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Add a reply section */}
            <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2 bg-gray-50/50">
                <CornerDownRight className="w-4 h-4 text-[#5F52FF] stroke-[2.5]" />
                <h2 className="text-sm font-bold text-[#5F52FF] tracking-wide">Add a reply</h2>
              </div>
              
              <div className="p-5">
                <div className="mb-4">
                  <textarea 
                    placeholder="Type your reply..." 
                    rows="4" 
                    className="w-full border border-gray-200 rounded-none p-3 text-sm outline-none focus:border-[#5F52FF] transition-colors resize-y text-gray-700"
                  ></textarea>
                </div>
                
                <div className="flex flex-col gap-1.5 mb-6">
                  <label className="flex items-center gap-1.5 text-[12px] font-bold text-gray-800">
                    <Paperclip className="w-3.5 h-3.5 text-gray-500" /> Attach a file <span className="text-gray-500 font-normal text-xs">(optional)</span>
                  </label>
                  <div className="flex items-center gap-2">
                      <button className="border border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-1 rounded-none text-[13px] font-medium transition-colors cursor-pointer shadow-sm">Choose File</button>
                      <span className="text-[12px] text-gray-500">No file chosen</span>
                  </div>
                </div>

                <div className="flex justify-end border-t border-gray-100 pt-4">
                  <button className="px-5 py-2.5 bg-[#5F52FF] text-white rounded-none text-sm font-bold flex items-center gap-2 hover:bg-[#4E41E6] transition-colors shadow-sm cursor-pointer">
                    <Send className="w-3.5 h-3.5" /> Send Reply
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Right Side / Meta */}
          <div>
            <div className="bg-white rounded-none border border-gray-200 shadow-sm sticky top-6">
              <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2 bg-gray-50/50">
                <Info className="w-4 h-4 text-[#5F52FF] stroke-[2.5]" />
                <h2 className="text-sm font-bold text-gray-800 tracking-wide">Ticket info</h2>
              </div>
              <div className="p-6">
                <div className="mb-5">
                  <p className="text-[11px] text-gray-400 font-bold mb-1 uppercase tracking-wider">Reference</p>
                  <p className="text-[13px] text-gray-800 font-medium">TKT-000001</p>
                </div>
                <div className="mb-5">
                  <p className="text-[11px] text-gray-400 font-bold mb-1.5 uppercase tracking-wider">Status</p>
                  <span className="bg-amber-50 text-amber-600 border border-amber-100 px-2.5 py-0.5 rounded-none text-[10px] font-bold tracking-wide">Open</span>
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 font-bold mb-1 uppercase tracking-wider">Last update</p>
                  <p className="text-[13px] text-gray-800 font-medium">21 Jul 2026, 02:38 PM</p>
                </div>
              </div>
              <div className="px-5 py-3 border-t border-gray-100 flex justify-center bg-gray-50/50">
                <button className="w-full bg-white border border-gray-200 text-gray-700 font-bold px-3 py-2 rounded-none text-xs hover:bg-gray-50 flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gray-500" /> Mark as closed
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const ContactSupport = () => {
  return (
    <Routes>
      <Route path="/" element={<TicketList />} />
      <Route path="new" element={<CreateTicket />} />
      <Route path=":id" element={<TicketDetail />} />
    </Routes>
  );
};

export default ContactSupport;
