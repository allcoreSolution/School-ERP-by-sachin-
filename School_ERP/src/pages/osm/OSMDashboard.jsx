import React from 'react';
import { 
  LayoutDashboard, Layers, CheckSquare, Settings2, FileText, HelpCircle, Plus,
  Layers as LayersIcon, Clock, CheckCircle2, Droplet, ChevronRight, Filter, Search
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function OSMDashboard() {
  const navigate = useNavigate();

  const sessions = [
    { id: 1, name: 'A', date: 'Aug 8, 2026', classSub: 'Class 1 / A\nEnglish', sheets: 0, status: 'DRAFT', progress: 0 },
    { id: 2, name: 'TERM1', date: 'Jun 8, 2026', classSub: 'Class XII / A\nEnglish Core', sheets: 1, status: 'EVALUATING', progress: 10 },
    { id: 3, name: 'DEMO - OSM - English (Class I)', date: 'Jun 8, 2026', classSub: 'Class I / A\nEnglish', sheets: 12, status: 'COMPLETED', progress: 100 },
    { id: 4, name: 'DEMO - OSM - English (Class III)', date: 'Jun 8, 2026', classSub: 'Class III / A\nEnglish', sheets: 12, status: 'COMPLETED', progress: 100 },
    { id: 5, name: 'DEMO - OSM - English (Class V)', date: 'Jun 8, 2026', classSub: 'Class V / A\nEnglish', sheets: 12, status: 'COMPLETED', progress: 100 },
    { id: 6, name: 'DEMO - OSM - English (Class VI)', date: 'Jun 8, 2026', classSub: 'Class VI / A\nEnglish', sheets: 12, status: 'COMPLETED', progress: 100 },
    { id: 7, name: 'DEMO - OSM - English (Class IX)', date: 'Jun 8, 2026', classSub: 'Class IX / A\nEnglish', sheets: 12, status: 'COMPLETED', progress: 100 },
    { id: 8, name: 'DEMO - OSM - English Core (Class XI)', date: 'Jun 8, 2026', classSub: 'Class XI / A\nEnglish Core', sheets: 10, status: 'COMPLETED', progress: 100 },
    { id: 9, name: 'DEMO - OSM - English (Nursery)', date: 'Jun 8, 2026', classSub: 'Nursery / A\nEnglish', sheets: 10, status: 'COMPLETED', progress: 100 },
    { id: 10, name: 'DEMO - OSM - English (Nursery)', date: 'Jun 8, 2026', classSub: 'Nursery / B\nEnglish', sheets: 12, status: 'COMPLETED', progress: 100 },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-10">
      
      {/* Top Navigation / Header */}
      <div className="bg-white px-6 pt-4 border-b border-slate-200">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-bold text-slate-800">Digital Evaluation</h1>
            <p className="text-[11px] text-slate-500 mt-1">On-screen marking of scanned answer sheets — upload, evaluate question-by-question, and report.</p>
          </div>
          <button 
            onClick={() => navigate('/osm-module/sessions/new')}
            className="px-4 py-2 bg-[#6f42c1] hover:bg-[#5a32a3] text-white font-bold text-xs rounded-none shadow-sm flex items-center gap-2 transition-colors border-none cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> New Session
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 text-[11px] font-bold">
          <div className="flex items-center gap-1.5 pb-2 border-b-2 border-[#6f42c1] text-slate-800">
            <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
          </div>
          <div 
            onClick={() => navigate('/osm-module/sessions')}
            className="flex items-center gap-1.5 pb-2 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
          >
            <Layers className="w-3.5 h-3.5" /> Sessions
          </div>
          <div className="flex items-center gap-1.5 pb-2 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">
            <CheckSquare className="w-3.5 h-3.5" /> Evaluate
          </div>
          <div onClick={() => navigate('/osm-module/moderation')} className="flex items-center gap-1.5 pb-2 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">
            <Settings2 className="w-3.5 h-3.5" /> Moderation
          </div>
          <div className="flex items-center gap-1.5 pb-2 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">
            <FileText className="w-3.5 h-3.5" /> Reports
          </div>
          <div onClick={() => navigate('/osm-module/guide')} className="flex items-center gap-1.5 pb-2 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">
            <HelpCircle className="w-3.5 h-3.5" /> Guide
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white border-l-4 border-l-[#6f42c1] border border-slate-200 rounded-none p-4 flex items-start gap-4 shadow-sm">
            <div className="w-8 h-8 rounded-none bg-[#f3f0ff] flex items-center justify-center text-[#6f42c1] shrink-0">
              <LayersIcon className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Sessions This Year</div>
              <div className="text-2xl font-black text-slate-800">10</div>
              <div className="text-[10px] text-slate-500 mt-1">10 total • 1 active</div>
            </div>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-none p-4 flex items-start gap-4 shadow-sm">
            <div className="w-8 h-8 rounded-none bg-yellow-50 flex items-center justify-center text-yellow-500 shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Papers Pending</div>
              <div className="text-2xl font-black text-slate-800">1</div>
              <div className="text-[10px] text-slate-500 mt-1">of 95 total</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-none p-4 flex items-start gap-4 shadow-sm">
            <div className="w-8 h-8 rounded-none bg-green-50 flex items-center justify-center text-green-500 shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Evaluated Today</div>
              <div className="text-2xl font-black text-green-500">0</div>
              <div className="text-[10px] text-slate-500 mt-1">0 sessions active</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-none p-4 flex items-start gap-4 shadow-sm">
            <div className="w-8 h-8 rounded-none bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
              <Droplet className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Avg Evaluation Time</div>
              <div className="text-2xl font-black text-slate-800">5.8<span className="text-sm font-bold text-slate-500 ml-1">min</span></div>
              <div className="text-[10px] text-slate-500 mt-1">per paper • avg score 64.6%</div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex justify-between items-end mb-2">
            <div className="text-[11px] font-bold text-slate-600 flex items-center gap-2">
              <LayoutDashboard className="w-3.5 h-3.5" /> Overall evaluation progress
            </div>
            <div className="text-[10px] font-bold text-slate-800">99%</div>
          </div>
          <div className="w-full h-1.5 bg-slate-200 rounded-none overflow-hidden">
            <div className="h-full bg-[#6f42c1] w-[99%]"></div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-none p-5 shadow-sm min-h-[200px] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xs font-bold text-slate-800">Evaluation activity</h3>
              <span className="text-[10px] text-slate-400">last 7 days</span>
            </div>
            {/* Empty Line Chart Representation */}
            <div className="flex-1 relative flex items-end px-4 pb-6">
              <div className="absolute left-0 top-0 h-full border-r border-slate-100 flex flex-col justify-between items-end pr-2 py-4 pb-8 w-8">
                <span className="text-[8px] text-slate-300">1</span>
                <span className="text-[8px] text-slate-300">0</span>
              </div>
              <div className="w-full h-full border-b border-slate-100 flex items-end justify-between px-4 pb-2 relative ml-10">
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-slate-200"></div>
                <div className="text-[8px] text-slate-400 translate-y-6">Mon</div>
                <div className="text-[8px] text-slate-400 translate-y-6">Tue</div>
                <div className="text-[8px] text-slate-400 translate-y-6">Wed</div>
                <div className="text-[8px] text-slate-400 translate-y-6">Thu</div>
                <div className="text-[8px] text-slate-400 translate-y-6">Fri</div>
                <div className="text-[8px] text-slate-400 translate-y-6">Sat</div>
                <div className="text-[8px] text-slate-400 translate-y-6">Sun</div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-none p-5 shadow-sm min-h-[200px] flex flex-col">
            <h3 className="text-xs font-bold text-slate-800 mb-6">Papers by status</h3>
            <div className="flex-1 flex flex-col items-center justify-center">
              {/* CSS Doughnut Chart */}
              <div className="w-24 h-24 rounded-none relative bg-[#28a745] flex items-center justify-center mb-6">
                <div className="absolute top-0 w-1 h-full bg-white rotate-12"></div>
                <div className="w-16 h-16 bg-white rounded-none z-10"></div>
              </div>
              <div className="flex items-center gap-4 text-[9px] text-slate-500 font-bold">
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-none bg-orange-400"></div> Evaluating (1)</div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-none bg-[#28a745]"></div> Finalized (94)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Info Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xs font-bold text-slate-800 mb-3">Top evaluators</h3>
            <div className="bg-white border border-slate-200 rounded-none p-4 shadow-sm">
              <div className="flex justify-between text-[11px] mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-none bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-[10px]">S</div>
                  <span className="font-bold text-slate-700">Amit Sharma</span>
                </div>
                <span className="text-slate-500"><strong>94</strong> papers • 5.8 mins/paper</span>
              </div>
              <div className="w-full h-1 bg-slate-100 rounded-none">
                <div className="w-full h-full bg-slate-200 rounded-none"></div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-800 mb-3">Needs attention</h3>
            <div className="bg-white border border-slate-200 rounded-none p-4 shadow-sm flex justify-between items-center">
              <div>
                <div className="font-bold text-slate-800 text-xs">Term1</div>
                <div className="text-[10px] text-slate-400 mt-0.5">English Core • Class XII • due Jun 30</div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[9px] font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded">1 PENDING</span>
                <span className="text-[9px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded">OVERDUE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sessions Table */}
        <div className="bg-white border border-slate-200 rounded-none shadow-sm">
          <div className="px-5 py-4 border-b border-slate-200 flex justify-between items-center">
            <h3 className="text-xs font-bold text-slate-800">All sessions</h3>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-slate-300 rounded-none px-2 py-1 bg-white">
                <Search className="w-3.5 h-3.5 text-slate-400 mr-2" />
                <input type="text" placeholder="Search title..." className="text-[11px] outline-none w-24" />
              </div>
              <select className="border border-slate-300 rounded-none px-2 py-1 text-[11px] outline-none text-slate-600 bg-white">
                <option>All statuses</option>
              </select>
              <select className="border border-slate-300 rounded-none px-2 py-1 text-[11px] outline-none text-slate-600 bg-white">
                <option>All classes</option>
              </select>
              <button className="p-1 border border-slate-300 rounded-none text-slate-500 hover:bg-slate-50 bg-white">
                <Filter className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-5">SESSION</th>
                  <th className="py-3 px-5">CLASS - SUBJECT</th>
                  <th className="py-3 px-5 text-center">SHEETS</th>
                  <th className="py-3 px-5">PROGRESS</th>
                  <th className="py-3 px-5">STATUS</th>
                  <th className="py-3 px-5"></th>
                </tr>
              </thead>
              <tbody className="text-[11px]">
                {sessions.map((s, idx) => (
                  <tr key={s.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-5">
                      <div className="font-bold text-slate-800 mb-0.5">{s.name}</div>
                      <div className="text-[9px] text-slate-400">{s.date}</div>
                    </td>
                    <td className="py-3 px-5 text-slate-500">
                      <div className="whitespace-pre-line leading-relaxed">{s.classSub}</div>
                    </td>
                    <td className="py-3 px-5 text-center font-bold text-slate-700">{s.sheets}</td>
                    <td className="py-3 px-5 w-48">
                      <div className="flex items-center gap-3">
                        <div className="w-full h-1 bg-slate-100 rounded-none overflow-hidden">
                          {s.progress > 0 && <div className="h-full bg-[#6f42c1]" style={{ width: `${s.progress}%` }}></div>}
                        </div>
                        <span className="text-[9px] text-slate-400 whitespace-nowrap">{s.sheets > 0 ? (s.progress === 100 ? s.sheets : '1') : '0'}/{s.sheets}</span>
                      </div>
                    </td>
                    <td className="py-3 px-5">
                      {s.status === 'DRAFT' && <span className="font-bold text-slate-500 text-[9px]">DRAFT</span>}
                      {s.status === 'EVALUATING' && <span className="font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-none text-[9px]">EVALUATING</span>}
                      {s.status === 'COMPLETED' && <span className="font-bold text-[#28a745] text-[9px]">COMPLETED</span>}
                    </td>
                    <td className="py-3 px-5 text-right">
                      <button 
                        onClick={() => navigate('/osm-module/sessions/details')}
                        className="p-1 rounded-none hover:bg-slate-200 text-slate-400 transition-colors cursor-pointer border-none bg-transparent"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
