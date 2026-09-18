import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, BarChart2, Users, Bell, Layers, Book, Columns, Edit3, 
  Settings, UserPlus, FileText, Smartphone, CheckCircle, Search, LayoutDashboard
} from 'lucide-react';

const LeadDashboard = () => {
  const navigate = useNavigate();

  const subNav = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/leads/dashboard', active: true },
    { name: 'Pipeline Board', icon: Columns, path: '/leads/pipeline' },
    { name: 'All Leads', icon: Users, path: '/leads/all' },
    { name: 'Follow-ups', icon: Bell, path: '/leads/follow-ups' },
    { name: 'Sources & Stages', icon: Layers, path: '/leads/sources-stages' },
    { name: 'Guide', icon: Book, path: '/leads/guide' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#f4f6f8] overflow-y-auto">
      
      {/* Header */}
      <div className="px-8 pt-6 pb-2 bg-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a2e] flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-[#5F52FF]" /> Lead Management
            </h1>
            <p className="text-[13px] text-gray-500 mt-1">Capture every admission lead, work it through the pipeline, and convert the winners into students.</p>
          </div>
          <button 
            onClick={() => navigate('/leads/pipeline')}
            className="bg-[#5F52FF] text-white px-4 py-2 rounded-none text-[13px] font-bold hover:bg-[#4E41E6] shadow-sm flex items-center gap-2 transition-colors"
          >
            <Columns className="w-4 h-4" /> Pipeline Board
          </button>
        </div>
        
        {/* Sub Nav */}
        <div className="flex items-center gap-6 mt-6 overflow-x-auto border-b border-gray-200 pb-px">
          {subNav.map((item, index) => {
            const Icon = item.icon;
            return (
              <button 
                key={index}
                onClick={() => item.path !== '#' && navigate(item.path)}
                className={`flex items-center gap-2 pb-3 text-[12px] font-bold whitespace-nowrap border-b-2 transition-colors ${
                  item.active 
                    ? 'border-[#5F52FF] text-[#5F52FF]' 
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" /> {item.name}
              </button>
            )
          })}
        </div>
      </div>

      <div className="p-8 w-full max-w-7xl mx-auto flex flex-col gap-6">
        
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-none shadow-sm border border-gray-200">
            <h3 className="text-[11px] font-bold text-gray-500 uppercase flex items-center gap-2">
              <div className="w-4 h-4 rounded-none bg-[#5F52FF]/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-none bg-[#5F52FF]"></div>
              </div> 
              Total leads
            </h3>
            <p className="text-2xl font-bold text-gray-800 mt-2">5</p>
          </div>
          
          <div className="bg-white p-4 rounded-none shadow-sm border border-gray-200">
            <h3 className="text-[11px] font-bold text-gray-500 uppercase flex items-center gap-2">
              <div className="w-4 h-4 rounded-none bg-green-500/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-none bg-green-500"></div>
              </div> 
              Converted
            </h3>
            <p className="text-2xl font-bold text-gray-800 mt-2">0</p>
          </div>

          <div className="bg-white p-4 rounded-none shadow-sm border border-gray-200">
            <h3 className="text-[11px] font-bold text-gray-500 uppercase flex items-center gap-2">
              <div className="w-4 h-4 rounded-none bg-blue-500/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-none bg-blue-500"></div>
              </div> 
              Conversion rate
            </h3>
            <p className="text-2xl font-bold text-gray-800 mt-2">0%</p>
          </div>

          <div className="bg-white p-4 rounded-none shadow-sm border border-gray-200">
            <h3 className="text-[11px] font-bold text-gray-500 uppercase flex items-center gap-2">
              <div className="w-4 h-4 rounded-none bg-orange-500/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-none bg-orange-500"></div>
              </div> 
              Open leads
            </h3>
            <p className="text-2xl font-bold text-gray-800 mt-2">0</p>
          </div>

          <div className="bg-white p-4 rounded-none shadow-sm border border-gray-200 flex flex-col justify-between">
            <div className="flex justify-between">
              <div>
                <h3 className="text-[11px] font-bold text-gray-500 uppercase flex items-center gap-2">
                  <div className="w-4 h-4 rounded-none bg-purple-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-none bg-purple-500"></div>
                  </div> 
                  New this month
                </h3>
                <p className="text-2xl font-bold text-gray-800 mt-2">4</p>
              </div>
              <div className="text-right">
                <h3 className="text-[11px] font-bold text-gray-500 uppercase flex items-center justify-end gap-2">
                  <div className="w-4 h-4 rounded-none bg-emerald-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-none bg-emerald-500"></div>
                  </div> 
                  Provided this month
                </h3>
                <p className="text-2xl font-bold text-gray-800 mt-2">0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Admission Funnel */}
          <div className="md:col-span-2 bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-[13px] font-bold text-gray-700 flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-[#5F52FF]" /> Admission funnel
              </h2>
            </div>
            <div className="p-6">
              {[
                { name: 'New Enquiry', color: 'bg-slate-500', percent: '15%' },
                { name: 'Contacted / Qualified', color: 'bg-[#3b82f6]', percent: '100%' },
                { name: 'Application Received', color: 'bg-[#8b5cf6]', percent: '100%' },
                { name: 'Document Verification', color: 'bg-[#a855f7]', percent: '100%' },
                { name: 'Entrance Test', color: 'bg-[#f59e0b]', percent: '10%' },
                { name: 'Counselling / Interview', color: 'bg-[#ec4899]', percent: '10%' },
                { name: 'Offer / Selected', color: 'bg-[#06b6d4]', percent: '10%' },
                { name: 'Enrolled', color: 'bg-[#10b981]', percent: '100%' },
                { name: 'Lost / Rejected', color: 'bg-[#ef4444]', percent: '100%' },
              ].map((stage, i) => (
                <div key={i} className="flex items-center gap-4 mb-3">
                  <div className="w-40 flex items-center gap-2 text-[12px] font-medium text-gray-600">
                    <div className={`w-2 h-2 rounded-none ${stage.color}`}></div>
                    {stage.name}
                  </div>
                  <div className="flex-1 bg-gray-100 rounded-none h-6 relative overflow-hidden flex items-center px-2">
                    <div className={`absolute top-0 left-0 h-full ${stage.color}`} style={{ width: stage.percent }}></div>
                    <span className="relative text-[11px] font-bold text-white z-10">{stage.percent === '100%' ? '1' : '0'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lead Sources */}
          <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-[13px] font-bold text-gray-700 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#5F52FF]" /> Lead sources
              </h2>
            </div>
            <div className="p-0">
              <table className="w-full text-left text-[13px]">
                <tbody>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-700">Website</td>
                    <td className="py-3 px-4 text-right font-bold text-[#5F52FF]">4</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-700">Walk-in</td>
                    <td className="py-3 px-4 text-right font-bold text-[#5F52FF]">1</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Guide Section */}
        <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-[13px] font-bold text-gray-700 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#5F52FF]" /> From enquiry to admitted student
            </h2>
            <button className="border border-gray-300 text-gray-600 px-3 py-1.5 rounded-none text-[11px] font-bold flex items-center gap-1.5 hover:bg-gray-50">
              <Book className="w-3.5 h-3.5" /> Read the guide
            </button>
          </div>
          <div className="p-6">
            <p className="text-[12px] text-gray-500 mb-8">Every enquiry is captured once and travels this path. Nothing is re-typed on the way — the child is admitted from what was already collected.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              {/* Step 1 */}
              <div>
                <div className="text-[10px] font-bold text-gray-400 mb-2">STEP 1</div>
                <div className="w-10 h-10 rounded-none bg-gray-100 flex items-center justify-center mb-3">
                  <UserPlus className="w-5 h-5 text-gray-600" />
                </div>
                <h4 className="text-[13px] font-bold text-gray-800 flex items-center gap-2 mb-2">
                  Enquiries arrive <span className="bg-blue-100 text-blue-600 text-[10px] px-1.5 py-0.5 rounded">0 here</span>
                </h4>
                <p className="text-[11px] text-gray-500 mb-2">From every direction, into one list — with the source recorded so you can see what actually works.</p>
                <ul className="text-[11px] text-gray-500 space-y-1">
                  <li className="flex gap-2 items-start"><div className="w-1 h-1 rounded-none bg-gray-400 mt-1.5"></div> Walk-in logged at the front desk</li>
                  <li className="flex gap-2 items-start"><div className="w-1 h-1 rounded-none bg-gray-400 mt-1.5"></div> Your website & the public application form</li>
                  <li className="flex gap-2 items-start"><div className="w-1 h-1 rounded-none bg-gray-400 mt-1.5"></div> Bulk import from a spreadsheet</li>
                  <li className="flex gap-2 items-start"><div className="w-1 h-1 rounded-none bg-gray-400 mt-1.5"></div> Source & campaign attribution</li>
                </ul>
              </div>

              {/* Step 2 */}
              <div>
                <div className="text-[10px] font-bold text-gray-400 mb-2">STEP 2</div>
                <div className="w-10 h-10 rounded-none bg-blue-100 flex items-center justify-center mb-3">
                  <LayoutDashboard className="w-5 h-5 text-blue-600" />
                </div>
                <h4 className="text-[13px] font-bold text-gray-800 flex items-center gap-2 mb-2">
                  You work the lead <span className="bg-blue-100 text-blue-600 text-[10px] px-1.5 py-0.5 rounded">1 here</span>
                </h4>
                <p className="text-[11px] text-gray-500 mb-2">A pipeline you can rename and reorder, with every conversation on one timeline.</p>
                <ul className="text-[11px] text-gray-500 space-y-1">
                  <li className="flex gap-2 items-start"><div className="w-1 h-1 rounded-none bg-gray-400 mt-1.5"></div> Drag cards across your own stages</li>
                  <li className="flex gap-2 items-start"><div className="w-1 h-1 rounded-none bg-gray-400 mt-1.5"></div> Calls, WhatsApp, visits & notes logged</li>
                  <li className="flex gap-2 items-start"><div className="w-1 h-1 rounded-none bg-gray-400 mt-1.5"></div> Follow-up tasks + daily reminders</li>
                  <li className="flex gap-2 items-start"><div className="w-1 h-1 rounded-none bg-gray-400 mt-1.5"></div> Owned by a counsellor, never dropped</li>
                </ul>
              </div>

              {/* Step 3 */}
              <div>
                <div className="text-[10px] font-bold text-gray-400 mb-2">STEP 3</div>
                <div className="w-10 h-10 rounded-none bg-purple-100 flex items-center justify-center mb-3">
                  <FileText className="w-5 h-5 text-purple-600" />
                </div>
                <h4 className="text-[13px] font-bold text-gray-800 flex items-center gap-2 mb-2">
                  The application fills up <span className="bg-blue-100 text-blue-600 text-[10px] px-1.5 py-0.5 rounded">2 here</span>
                </h4>
                <p className="text-[11px] text-gray-500 mb-2">Everything an admission needs — captured a bit at a time, mostly by the family themselves.</p>
                <ul className="text-[11px] text-gray-500 space-y-1">
                  <li className="flex gap-2 items-start"><div className="w-1 h-1 rounded-none bg-gray-400 mt-1.5"></div> Parents fill it in online — no login</li>
                  <li className="flex gap-2 items-start"><div className="w-1 h-1 rounded-none bg-gray-400 mt-1.5"></div> Documents uploaded & verified</li>
                  <li className="flex gap-2 items-start"><div className="w-1 h-1 rounded-none bg-gray-400 mt-1.5"></div> Entrance test scores & merit list</li>
                  <li className="flex gap-2 items-start"><div className="w-1 h-1 rounded-none bg-gray-400 mt-1.5"></div> Counselling notes & recommendation</li>
                </ul>
              </div>

              {/* Step 4 */}
              <div>
                <div className="text-[10px] font-bold text-gray-400 mb-2">STEP 4</div>
                <div className="w-10 h-10 rounded-none bg-green-100 flex items-center justify-center mb-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <h4 className="text-[13px] font-bold text-gray-800 flex items-center gap-2 mb-2">
                  One-click admit <span className="bg-blue-100 text-blue-600 text-[10px] px-1.5 py-0.5 rounded">1 here</span>
                </h4>
                <p className="text-[11px] text-gray-500 mb-2">When the application is complete, you confirm three things and the student exists. No form to re-type.</p>
                <ul className="text-[11px] text-gray-500 space-y-1">
                  <li className="flex gap-2 items-start"><div className="w-1 h-1 rounded-none bg-gray-400 mt-1.5"></div> Readiness meter says when it's ready</li>
                  <li className="flex gap-2 items-start"><div className="w-1 h-1 rounded-none bg-gray-400 mt-1.5"></div> Confirm admission no., roll no. & section</li>
                  <li className="flex gap-2 items-start"><div className="w-1 h-1 rounded-none bg-gray-400 mt-1.5"></div> Admitted — the lead closes itself</li>
                  <li className="flex gap-2 items-start"><div className="w-1 h-1 rounded-none bg-gray-400 mt-1.5"></div> Siblings linked, never duplicated</li>
                </ul>
              </div>
            </div>

            <div className="border border-green-200 bg-green-50 rounded-none p-4">
              <h4 className="text-[12px] font-bold text-green-800 flex items-center gap-2 mb-3">
                <CheckCircle className="w-4 h-4" /> The one-click creates all of this
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2 text-[11px] text-green-700">
                  <CheckCircle className="w-3.5 h-3.5" /> Student record
                </div>
                <div className="flex items-center gap-2 text-[11px] text-green-700">
                  <CheckCircle className="w-3.5 h-3.5" /> Class enrollment
                </div>
                <div className="flex items-center gap-2 text-[11px] text-green-700">
                  <CheckCircle className="w-3.5 h-3.5" /> Parent & student logins
                </div>
                <div className="flex items-center gap-2 text-[11px] text-green-700">
                  <CheckCircle className="w-3.5 h-3.5" /> Verified documents carried over
                </div>
                <div className="flex items-center gap-2 text-[11px] text-green-700">
                  <CheckCircle className="w-3.5 h-3.5" /> Applicant photo carried over
                </div>
                <div className="flex items-center gap-2 text-[11px] text-green-700">
                  <CheckCircle className="w-3.5 h-3.5" /> Fee groups assigned
                </div>
                <div className="flex items-center gap-2 text-[11px] text-green-700">
                  <CheckCircle className="w-3.5 h-3.5" /> Admission fee receipt <span className="text-gray-400 ml-1">(pdf)</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-green-700">
                  <CheckCircle className="w-3.5 h-3.5" /> Login sent to the parent
                </div>
              </div>
            </div>

          </div>

          <div className="p-4 bg-gray-50 border-t border-gray-200 flex flex-wrap gap-3">
            <button 
              onClick={() => navigate('/leads/pipeline')}
              className="bg-[#5F52FF] text-white px-4 py-2 rounded-none text-[13px] font-bold hover:bg-[#4E41E6] shadow-sm flex items-center gap-2"
            >
              <Columns className="w-4 h-4" /> Open the pipeline board!
            </button>
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-none text-[13px] font-bold hover:bg-gray-50 flex items-center gap-2">
              <Search className="w-4 h-4" /> All leads
            </button>
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-none text-[13px] font-bold hover:bg-gray-50 flex items-center gap-2">
              <Smartphone className="w-4 h-4" /> The page parents fill in
            </button>
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-none text-[13px] font-bold hover:bg-gray-50 flex items-center gap-2">
              <Settings className="w-4 h-4" /> Configure stages, forms & documents
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LeadDashboard;
