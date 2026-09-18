import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  MessageSquare, BookOpen, LayoutTemplate, Plus,
  BarChart2, Radio, FileEdit, MessageCircle, TrendingUp, ClipboardList,
  RotateCcw, Eye, Zap, Copy, Inbox, Flag, ArrowLeft, Save,
  Settings, Users, Calendar, Trash2, ArrowUp, ArrowDown, X, Info, ChevronRight, Check, ArrowRight, Folder, AlertCircle, UserCheck, Lightbulb, Link2, Play, FilePlus2, Layers, Heart
} from 'lucide-react';

export default function SurveysDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isCreateView = location.pathname.includes('/create');
  const isAllView = location.pathname.includes('/all');
  const isMySurveysView = location.pathname.includes('/my-surveys');
  const isFeedbackTriageView = location.pathname.includes('/feedback-triage');
  const isGuideView = location.pathname.includes('/guide');
  const isTemplatesView = location.pathname.includes('/templates');

  if (isCreateView) {
    return <CreateSurveyView onBack={() => navigate('/surveys/all')} />;
  }

  if (isGuideView) {
    return <GuideView 
      onDashboard={() => navigate('/surveys/dashboard')}
      onTemplates={() => navigate('/surveys/templates')}
      onNewSurvey={() => navigate('/surveys/create')}
      onAllSurveys={() => navigate('/surveys/all')}
    />;
  }

  if (isTemplatesView) {
    return <TemplatesView onAllSurveys={() => navigate('/surveys/all')} />;
  }

  if (isAllView) {
    return <AllSurveysView 
      onNewSurvey={() => navigate('/surveys/create')} 
      onTemplates={() => navigate('/surveys/templates')}
    />;
  }

  if (isMySurveysView) {
    return <MySurveysView />;
  }

  if (isFeedbackTriageView) {
    return <FeedbackTriageView />;
  }

  return <DashboardView 
    onNewSurvey={() => navigate('/surveys/create')} 
    onMySurveys={() => navigate('/surveys/my-surveys')} 
    onTriage={() => navigate('/surveys/feedback-triage')}
    onTemplates={() => navigate('/surveys/templates')}
    onGuide={() => navigate('/surveys/guide')}
  />;
}

/* ==============================================================
   ALL SURVEYS VIEW
   ============================================================== */
function AllSurveysView({ onNewSurvey, onTemplates }) {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 space-y-6 font-sans pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">Surveys & Feedback</h1>
          <p className="text-slate-500 text-sm font-semibold mt-0.5">Create surveys, polls and feedback forms — then publish and track responses.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onTemplates} className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-none flex items-center gap-2 cursor-pointer shadow-sm">
            <LayoutTemplate className="w-4 h-4" /> Templates
          </button>
          <button className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-none flex items-center gap-2 cursor-pointer shadow-sm">
            <Zap className="w-4 h-4 text-indigo-500" /> Quick poll
          </button>
          <button onClick={onNewSurvey} className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-none flex items-center gap-2 shadow-sm cursor-pointer border-none transition-colors">
            <Plus className="w-4 h-4" /> New survey
          </button>
        </div>
      </div>

      {/* Controls row */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
          <Settings className="w-3.5 h-3.5" /> Showing this session
        </div>
        <button className="px-3 py-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-[11px] font-bold rounded-none flex items-center gap-1.5 cursor-pointer shadow-sm">
          <LayoutTemplate className="w-3.5 h-3.5" /> View all sessions
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row items-end gap-3 pb-2">
        <div className="flex-1 w-full space-y-1.5">
          <label className="text-[11px] font-bold text-slate-700">Search</label>
          <input 
            type="text" 
            placeholder="Title..." 
            className="w-full px-3 py-2 border border-slate-300 rounded-none text-xs font-semibold focus:outline-none focus:border-indigo-600 bg-white"
          />
        </div>
        <div className="flex-1 w-full space-y-1.5">
          <label className="text-[11px] font-bold text-slate-700">Kind</label>
          <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-xs font-semibold focus:outline-none focus:border-indigo-600 bg-white">
            <option>All</option>
            <option>Poll</option>
            <option>Survey</option>
            <option>Feedback form</option>
          </select>
        </div>
        <div className="flex-1 w-full space-y-1.5">
          <label className="text-[11px] font-bold text-slate-700">Status</label>
          <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-xs font-semibold focus:outline-none focus:border-indigo-600 bg-white">
            <option>All</option>
            <option>Draft</option>
            <option>Published</option>
          </select>
        </div>
        <button className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-none flex items-center justify-center cursor-pointer border-none shadow-sm transition-colors mt-auto md:mt-0 h-[34px]">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/></svg>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-none overflow-hidden shadow-3xs">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 text-indigo-900 font-bold text-xs">
            <MessageSquare className="w-4 h-4 text-indigo-600 fill-indigo-600" /> Surveys
          </div>
          <div className="text-[10px] font-semibold text-slate-400">16 surveys</div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-indigo-50/50 border-b border-slate-100 text-[10px] font-black text-indigo-600 uppercase tracking-wider">
                <th className="py-3 px-4 border-r border-slate-100 w-10 text-center">#</th>
                <th className="py-3 px-4 border-r border-slate-100">TITLE</th>
                <th className="py-3 px-4 border-r border-slate-100">KIND</th>
                <th className="py-3 px-4 border-r border-slate-100 text-center">QUESTIONS</th>
                <th className="py-3 px-4 border-r border-slate-100 text-center">SENT</th>
                <th className="py-3 px-4 border-r border-slate-100 text-center">RESPONSES</th>
                <th className="py-3 px-4 border-r border-slate-100 text-center">STATUS</th>
                <th className="py-3 px-4 text-center w-32">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
              {[
                { title: "Net Promoter (NPS)", kind: "Poll", questions: 2, isAnon: false },
                { title: "Net Promoter (NPS)", kind: "Poll", questions: 2, isAnon: false },
                { title: "Parent Satisfaction", kind: "Feedback form", questions: 5, isAnon: false },
                { title: "Parent Satisfaction", kind: "Feedback form", questions: 5, isAnon: false },
                { title: "Teacher Evaluation", kind: "Survey", questions: 5, isAnon: true },
                { title: "Parent Satisfaction", kind: "Feedback form", questions: 5, isAnon: false },
                { title: "Parent Satisfaction", kind: "Feedback form", questions: 5, isAnon: false },
                { title: "Student Wellbeing Check", kind: "Feedback form", questions: 4, isAnon: true },
                { title: "Teacher Evaluation", kind: "Survey", questions: 5, isAnon: true },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 border-r border-slate-100 text-center text-slate-400">{i + 1}</td>
                  <td className="py-3 px-4 border-r border-slate-100 font-bold text-slate-800">
                    <div className="flex items-center gap-2">
                      {row.title}
                      {row.isAnon && (
                        <span className="px-1.5 py-0.5 rounded-none text-[9px] font-extrabold bg-purple-100 text-purple-600 flex items-center gap-1">
                          <Users className="w-2.5 h-2.5" /> Anon
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 border-r border-slate-100 text-slate-400">{row.kind}</td>
                  <td className="py-3 px-4 border-r border-slate-100 text-center text-slate-800">{row.questions}</td>
                  <td className="py-3 px-4 border-r border-slate-100 text-center text-slate-800">0</td>
                  <td className="py-3 px-4 border-r border-slate-100 text-center text-slate-800">0</td>
                  <td className="py-3 px-4 border-r border-slate-100 text-center">
                    <span className="text-slate-400 font-bold">Draft</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-slate-400">
                      <button className="p-1 hover:text-indigo-600 hover:bg-slate-100 rounded-none cursor-pointer bg-transparent border-none transition-colors">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1 hover:text-blue-600 hover:bg-slate-100 rounded-none cursor-pointer bg-transparent border-none transition-colors">
                        <BarChart2 className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1 hover:text-amber-600 hover:bg-slate-100 rounded-none cursor-pointer bg-transparent border-none transition-colors">
                        <FileEdit className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1 hover:text-red-600 hover:bg-slate-100 rounded-none cursor-pointer bg-transparent border-none transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
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
}

/* ==============================================================
   DASHBOARD VIEW
   ============================================================== */
function DashboardView({ onNewSurvey, onMySurveys, onTriage }) {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 space-y-6 font-sans">
      {/* Top Banner */}
      <div className="bg-indigo-600 rounded-none p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm text-white">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-none flex items-center justify-center shrink-0">
            <MessageSquare className="w-6 h-6 text-white fill-white/20" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">Surveys & Feedback</h1>
            <p className="text-indigo-200 text-xs md:text-sm font-medium mt-0.5">Your feedback command centre — surveys, responses and follow-ups at a glance.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onGuide} className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors rounded-none text-sm font-bold flex items-center gap-2 cursor-pointer border-none">
            <BookOpen className="w-4 h-4" /> Guide
          </button>
          <button onClick={onTemplates} className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors rounded-none text-sm font-bold flex items-center gap-2 cursor-pointer border-none">
            <LayoutTemplate className="w-4 h-4" /> Templates
          </button>
          <button onClick={onNewSurvey} className="px-4 py-2 bg-white text-indigo-600 hover:bg-slate-50 transition-colors rounded-none text-sm font-bold flex items-center gap-2 shadow-sm cursor-pointer border-none">
            <Plus className="w-4 h-4" /> New survey
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="flex flex-nowrap overflow-x-auto gap-3 pb-2 scrollbar-hide">
        {/* Metric 1 */}
        <div className="bg-white border-l-4 border-l-indigo-600 border border-slate-200 rounded-none p-4 flex items-center gap-4 min-w-[140px] shadow-3xs">
          <div className="w-10 h-10 rounded-none bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
            <BarChart2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-800">16</div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Surveys</div>
          </div>
        </div>
        
        {/* Metric 2 */}
        <div className="bg-white border-l-4 border-l-emerald-500 border border-slate-200 rounded-none p-4 flex items-center gap-4 min-w-[140px] shadow-3xs">
          <div className="w-10 h-10 rounded-none bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
            <Radio className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-800">4</div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Published</div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white border-l-4 border-l-slate-400 border border-slate-200 rounded-none p-4 flex items-center gap-4 min-w-[140px] shadow-3xs">
          <div className="w-10 h-10 rounded-none bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
            <FileEdit className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-800">11</div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Drafts</div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white border-l-4 border-l-purple-600 border border-slate-200 rounded-none p-4 flex items-center gap-4 min-w-[140px] shadow-3xs">
          <div className="w-10 h-10 rounded-none bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
            <MessageCircle className="w-5 h-5 fill-purple-100" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-800">119</div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Responses</div>
          </div>
        </div>

        {/* Metric 5 */}
        <div className="bg-white border-l-4 border-l-blue-600 border border-slate-200 rounded-none p-4 flex items-center gap-4 min-w-[150px] shadow-3xs">
          <div className="w-10 h-10 rounded-none bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-800">84%</div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Avg response rate</div>
          </div>
        </div>

        {/* Metric 6 */}
        <div className="bg-white border-l-4 border-l-orange-500 border border-slate-200 rounded-none p-4 flex items-center gap-4 min-w-[150px] shadow-3xs">
          <div className="w-10 h-10 rounded-none bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
            <ClipboardList className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-800">2</div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Open feedback</div>
          </div>
        </div>
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-none shadow-3xs overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <div className="flex items-center gap-2 text-indigo-900 font-bold">
                <RotateCcw className="w-4 h-4 text-indigo-500" /> Recent surveys
              </div>
              <button className="px-3 py-1.5 border border-slate-200 rounded-none text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer bg-white">
                View all
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-indigo-50/50 border-b border-slate-100 text-[10px] font-black text-indigo-600 uppercase tracking-wider">
                    <th className="py-3 px-4">TITLE</th>
                    <th className="py-3 px-4 border-l border-white">KIND</th>
                    <th className="py-3 px-4 border-l border-white">SENT</th>
                    <th className="py-3 px-4 border-l border-white">RESPONSES</th>
                    <th className="py-3 px-4 border-l border-white">STATUS</th>
                    <th className="py-3 px-4 border-l border-white text-center"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-semibold">
                  {[
                    { title: "Net Promoter (NPS)", kind: "Poll", icon: BarChart2, iconColor: "text-amber-500", bg: "bg-amber-50" },
                    { title: "Net Promoter (NPS)", kind: "Poll", icon: BarChart2, iconColor: "text-amber-500", bg: "bg-amber-50" },
                    { title: "Parent Satisfaction", kind: "Feedback form", icon: MessageSquare, iconColor: "text-purple-500", bg: "bg-purple-50" },
                    { title: "Parent Satisfaction", kind: "Feedback form", icon: MessageSquare, iconColor: "text-purple-500", bg: "bg-purple-50" },
                    { title: "Teacher Evaluation", kind: "Survey", icon: ClipboardList, iconColor: "text-blue-500", bg: "bg-blue-50" },
                    { title: "Parent Satisfaction", kind: "Feedback form", icon: MessageSquare, iconColor: "text-purple-500", bg: "bg-purple-50" },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-none flex items-center justify-center ${row.bg}`}>
                            <row.icon className={`w-3.5 h-3.5 ${row.iconColor}`} />
                          </div>
                          <span className="text-slate-800 font-bold">{row.title}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-500 border-l border-slate-100">{row.kind}</td>
                      <td className="py-3 px-4 text-slate-800 border-l border-slate-100 text-center">0</td>
                      <td className="py-3 px-4 text-slate-800 border-l border-slate-100 text-center">0</td>
                      <td className="py-3 px-4 border-l border-slate-100">
                        <span className="text-slate-500 font-bold">Draft</span>
                      </td>
                      <td className="py-3 px-4 border-l border-slate-100 text-center">
                        <button className="p-1 text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer bg-transparent border-none rounded">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (1/3) */}
        <div className="space-y-6">
          
          {/* Quick Actions */}
          <div className="bg-white border border-slate-200 rounded-none shadow-3xs overflow-hidden">
            <div className="flex items-center gap-2 p-4 border-b border-slate-100 text-indigo-900 font-bold">
              <Zap className="w-4 h-4 text-indigo-500 fill-indigo-100" /> Quick actions
            </div>
            <div className="p-2 space-y-1">
              <button onClick={onNewSurvey} className="w-full flex items-center justify-between p-3 rounded-none hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 cursor-pointer bg-white text-left group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-none bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors shrink-0">
                    <Zap className="w-5 h-5 text-blue-600 fill-blue-600" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-slate-800">Create a quick poll</div>
                    <div className="text-[11px] font-semibold text-slate-400">One question, 15 seconds</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </button>

              <button onClick={onTemplates} className="w-full flex items-center justify-between p-3 rounded-none hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 cursor-pointer bg-white text-left group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-none bg-purple-50 flex items-center justify-center group-hover:bg-purple-100 transition-colors shrink-0">
                    <Copy className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-slate-800">Start from a template</div>
                    <div className="text-[11px] font-semibold text-slate-400">Parent CSAT, NPS, event feedback...</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </button>

              <button onClick={onTriage} className="w-full flex items-center justify-between p-3 rounded-none hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 cursor-pointer bg-white text-left group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-none bg-orange-50 flex items-center justify-center group-hover:bg-orange-100 transition-colors shrink-0">
                    <ClipboardList className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-slate-800">Feedback triage board</div>
                    <div className="text-[11px] font-semibold text-slate-400">Review & action responses</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </button>

              <button onClick={onMySurveys} className="w-full flex items-center justify-between p-3 rounded-none hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 cursor-pointer bg-white text-left group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-none bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors shrink-0">
                    <Inbox className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-slate-800">My surveys</div>
                    <div className="text-[11px] font-semibold text-slate-400">Surveys addressed to you</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </button>
            </div>
          </div>

          {/* Open Feedback */}
          <div className="bg-white border border-slate-200 rounded-none shadow-3xs overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <div className="flex items-center gap-2 text-indigo-900 font-bold">
                <Flag className="w-4 h-4 text-indigo-500 fill-indigo-100" /> Open feedback
              </div>
              <button className="px-3 py-1 border border-slate-200 rounded-none text-[11px] font-bold text-slate-600 hover:bg-slate-50 cursor-pointer bg-white">
                All
              </button>
            </div>
            <div className="divide-y divide-slate-100">
              <div className="p-4 flex items-start gap-3 hover:bg-slate-50/50 transition-colors cursor-pointer">
                <div className="text-[10px] font-extrabold text-red-500 uppercase tracking-wider shrink-0 w-12 text-right">Urgent</div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-800 truncate">DEMO — Canteen food quality complaint</p>
                </div>
                <div className="text-[10px] font-bold text-indigo-500 shrink-0">In progress</div>
              </div>
              <div className="p-4 flex items-start gap-3 hover:bg-slate-50/50 transition-colors cursor-pointer">
                <div className="text-[10px] font-extrabold text-orange-500 uppercase tracking-wider shrink-0 w-12 text-right">High</div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-800 truncate">DEMO — Follow up: transport delays raised by a...</p>
                </div>
                <div className="text-[10px] font-bold text-red-500 shrink-0">New</div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}


/* ==============================================================
   CREATE SURVEY VIEW
   ============================================================== */
function CreateSurveyView({ onBack }) {
  const [questions, setQuestions] = useState([{ id: 1, text: '', helpText: '', type: 'Single choice', options: ['',''], required: true }]);
  const [whoCanRespond, setWhoCanRespond] = useState('Internal (app / panel users)');

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 space-y-6 font-sans pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button onClick={onBack} className="flex items-center gap-1 text-slate-500 hover:text-indigo-600 text-xs font-bold mb-1 transition-colors bg-transparent border-none cursor-pointer">
            <ArrowLeft className="w-3.5 h-3.5" /> All surveys
          </button>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">Create survey</h1>
        </div>
        <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-none flex items-center gap-2 shadow-sm cursor-pointer border-none transition-colors">
          <Save className="w-4 h-4" /> Save draft
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Details Card */}
          <div className="bg-white border border-slate-200 rounded-none shadow-3xs overflow-hidden">
            <div className="flex items-center gap-2 p-4 border-b border-slate-100 text-indigo-900 font-bold bg-slate-50/50">
              <Info className="w-4 h-4 text-indigo-500" /> Details
            </div>
            <div className="p-5 space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">Title <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  placeholder="e.g. Term 1 parent satisfaction"
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-none text-sm font-semibold focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">Description</label>
                <textarea 
                  rows={2}
                  placeholder="Shown to respondents at the top."
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-none text-sm font-semibold focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 resize-y"
                />
              </div>
            </div>
          </div>

          {/* Questions Card */}
          <div className="bg-white border border-slate-200 rounded-none shadow-3xs overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-2 text-indigo-900 font-bold">
                <ListFilterIcon className="w-4 h-4 text-indigo-500" /> Questions
              </div>
              <div className="text-xs font-semibold text-slate-500">1 question(s)</div>
            </div>
            
            <div className="p-5 space-y-6">
              {/* Question Block */}
              <div className="p-4 border border-slate-200 rounded-none bg-slate-50/30 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-extrabold text-slate-400 tracking-wider">Q1</div>
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-none bg-transparent border-none cursor-pointer transition-colors"><ArrowUp className="w-3.5 h-3.5" /></button>
                    <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-none bg-transparent border-none cursor-pointer transition-colors"><ArrowDown className="w-3.5 h-3.5" /></button>
                    <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-none bg-transparent border-none cursor-pointer transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-slate-700 block">Question <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      placeholder="Type your question..."
                      className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm font-semibold focus:outline-none focus:border-indigo-600"
                    />
                    <input 
                      type="text" 
                      placeholder="Optional helper text"
                      className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-none text-xs font-semibold focus:outline-none focus:border-indigo-600 text-slate-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 block">Type</label>
                    <select className="w-full px-3 py-2.5 border border-slate-300 rounded-none text-sm font-semibold focus:outline-none focus:border-indigo-600 appearance-none bg-white">
                      <option>Single choice</option>
                      <option>Multiple choice</option>
                      <option>Short text</option>
                      <option>Long text</option>
                      <option>Rating</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">Options</label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input 
                        type="text" 
                        placeholder="Option text"
                        className="flex-1 px-3 py-2 border border-slate-300 rounded-none text-sm font-semibold focus:outline-none focus:border-indigo-600"
                      />
                      <button className="p-2 text-slate-400 hover:text-red-500 rounded-none hover:bg-slate-100 bg-transparent border-none cursor-pointer transition-colors"><X className="w-4 h-4" /></button>
                    </div>
                    <div className="flex items-center gap-2">
                      <input 
                        type="text" 
                        placeholder="Option text"
                        className="flex-1 px-3 py-2 border border-slate-300 rounded-none text-sm font-semibold focus:outline-none focus:border-indigo-600"
                      />
                      <button className="p-2 text-slate-400 hover:text-red-500 rounded-none hover:bg-slate-100 bg-transparent border-none cursor-pointer transition-colors"><X className="w-4 h-4" /></button>
                    </div>
                  </div>
                  <button className="mt-2 text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 bg-transparent border-none cursor-pointer transition-colors">
                    <Plus className="w-3.5 h-3.5" /> Add option
                  </button>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <div className="relative inline-flex h-5 w-9 items-center rounded-none bg-indigo-600 cursor-pointer">
                    <span className="inline-block h-3.5 w-3.5 transform translate-x-4 rounded-none bg-white shadow" />
                  </div>
                  <span className="text-xs font-bold text-slate-700">Required</span>
                </div>
              </div>

              <button className="px-4 py-2 border-2 border-dashed border-slate-300 text-slate-600 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 rounded-none text-sm font-bold flex items-center gap-2 cursor-pointer w-full justify-center transition-all">
                <Plus className="w-4 h-4" /> Add question
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (1/3) */}
        <div className="space-y-6">
          
          {/* Settings Card */}
          <div className="bg-white border border-slate-200 rounded-none shadow-3xs overflow-hidden">
            <div className="flex items-center gap-2 p-4 border-b border-slate-100 text-indigo-900 font-bold bg-slate-50/50">
              <Settings className="w-4 h-4 text-indigo-500" /> Settings
            </div>
            <div className="p-5 space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">Kind</label>
                <select className="w-full px-3 py-2.5 border border-slate-300 rounded-none text-sm font-semibold focus:outline-none focus:border-indigo-600 bg-white">
                  <option>Survey</option>
                  <option>Poll</option>
                  <option>Feedback Form</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">Closes at</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="dd-mm-yyyy --:--"
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-none text-sm font-semibold focus:outline-none focus:border-indigo-600 bg-white"
                  />
                  <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
                <p className="text-[10px] text-slate-500 font-semibold">Leave empty to keep open until closed manually.</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">Repeat <RotateCcw className="w-3 h-3" /></label>
                <select className="w-full px-3 py-2.5 border border-slate-300 rounded-none text-sm font-semibold focus:outline-none focus:border-indigo-600 bg-white">
                  <option>Does not repeat (one-off)</option>
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
                <p className="text-[10px] text-slate-500 font-semibold leading-tight mt-1">A repeating feedback form re-opens each period for trend tracking.</p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 opacity-50">
                  <div className="relative inline-flex h-5 w-9 items-center rounded-none bg-slate-200 cursor-not-allowed">
                    <span className="inline-block h-3.5 w-3.5 transform translate-x-0.5 rounded-none bg-white shadow" />
                  </div>
                  <span className="text-xs font-bold text-slate-700">Anonymous responses</span>
                </div>
                <div className="flex items-start gap-2 opacity-50">
                  <div className="relative inline-flex h-5 w-9 items-center rounded-none bg-slate-200 cursor-not-allowed shrink-0 mt-0.5">
                    <span className="inline-block h-3.5 w-3.5 transform translate-x-0.5 rounded-none bg-white shadow" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-700 block">Allow changing the answer</span>
                    <span className="text-[10px] text-slate-500 font-semibold leading-tight">Important — prompt recipients on app open ⚠️</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Audience Card */}
          <div className="bg-white border border-slate-200 rounded-none shadow-3xs overflow-hidden">
            <div className="flex items-center gap-2 p-4 border-b border-slate-100 text-indigo-900 font-bold bg-slate-50/50">
              <Users className="w-4 h-4 text-indigo-500" /> Audience
            </div>
            <div className="p-5 space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">Who can respond</label>
                <select 
                  value={whoCanRespond}
                  onChange={(e) => setWhoCanRespond(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-none text-sm font-semibold focus:outline-none focus:border-indigo-600 bg-white"
                >
                  <option>Internal (app / panel users)</option>
                  <option>Public link (anyone)</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative inline-flex h-5 w-9 items-center rounded-none bg-indigo-600 cursor-pointer">
                  <span className="inline-block h-3.5 w-3.5 transform translate-x-4 rounded-none bg-white shadow" />
                </div>
                <span className="text-[11px] font-bold text-slate-700">Public link: one response per device</span>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-700 block">By role (internal / mixed)</label>
                <div className="space-y-2 h-40 overflow-y-auto">
                  {[
                    "Accademic Master",
                    "Accountant",
                    "Accounts Officer (Cashier)",
                    "Accounts Officer (Payable)",
                    "Administrator",
                    "Biology",
                    "Chemistry",
                    "Teacher",
                    "Parent"
                  ].map(role => (
                    <label key={role} className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 rounded">
                      <input type="checkbox" className="w-3.5 h-3.5 text-indigo-600 rounded-none border-slate-300 focus:ring-indigo-600" />
                      <span className="text-[11px] font-semibold text-slate-700">{role}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

// Simple icon for the questions header
function ListFilterIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="21" x2="14" y1="4" y2="4"/>
      <line x1="10" x2="3" y1="4" y2="4"/>
      <line x1="21" x2="12" y1="12" y2="12"/>
      <line x1="8" x2="3" y1="12" y2="12"/>
      <line x1="21" x2="16" y1="20" y2="20"/>
      <line x1="12" x2="3" y1="20" y2="20"/>
      <line x1="14" x2="14" y1="2" y2="6"/>
      <line x1="8" x2="8" y1="10" y2="14"/>
      <line x1="16" x2="16" y1="18" y2="22"/>
    </svg>
  );
}

/* ==============================================================
   MY SURVEYS VIEW
   ============================================================== */
function MySurveysView() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 space-y-6 font-sans">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">My Surveys</h1>
        <p className="text-slate-500 text-sm font-semibold mt-0.5">Surveys addressed to you — pending and completed.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-none shadow-3xs overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
            <Inbox className="w-4 h-4 text-indigo-600" /> Inbox
          </div>
          <div className="text-xs font-semibold text-slate-400">4 surveys</div>
        </div>

        <div className="divide-y divide-slate-100">
          
          {/* Item 1 */}
          <div className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800 text-sm">DEMO — Teacher Evaluation (Anonymous)</span>
                <span className="px-2 py-0.5 rounded-none bg-slate-100 text-[10px] font-bold text-slate-500">Survey</span>
              </div>
              <p className="text-xs font-semibold text-slate-500">Structured feedback on a teacher's clarity, engagement and support. Usually run anonymously.</p>
            </div>
            <button className="ml-4 shrink-0 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-none flex items-center gap-1.5 cursor-pointer shadow-sm border-none transition-colors">
              Respond <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Item 2 */}
          <div className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800 text-sm">DEMO — Monthly Wellbeing Pulse (Recurring)</span>
                <span className="px-2 py-0.5 rounded-none bg-slate-100 text-[10px] font-bold text-slate-500">Feedback form</span>
              </div>
              <p className="text-xs font-semibold text-slate-500">A gentle anonymous check-in on how students are feeling at school.</p>
            </div>
            <button className="ml-4 shrink-0 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-none flex items-center gap-1.5 cursor-pointer shadow-sm border-none transition-colors">
              Respond <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Item 3 */}
          <div className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800 text-sm">DEMO — Monthly Wellbeing Pulse (Recurring)</span>
                <span className="px-2 py-0.5 rounded-none bg-slate-100 text-[10px] font-bold text-slate-500">Feedback form</span>
              </div>
              <p className="text-xs font-semibold text-slate-500">A gentle anonymous check-in on how students are feeling at school.</p>
            </div>
            <button className="ml-4 shrink-0 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-none flex items-center gap-1.5 cursor-pointer shadow-sm border-none transition-colors">
              Respond <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Item 4 (Completed) */}
          <div className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors opacity-80">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800 text-sm">DEMO — Parent Satisfaction (Term 1)</span>
                <span className="px-2 py-0.5 rounded-none bg-slate-100 text-[10px] font-bold text-slate-500">Feedback form</span>
              </div>
              <p className="text-xs font-semibold text-slate-500">How happy are parents with teaching, communication and facilities. Great as a recurring termly pulse..</p>
            </div>
            <div className="ml-4 shrink-0 px-3 py-1.5 bg-emerald-50 text-emerald-600 text-[11px] font-extrabold rounded-none flex items-center gap-1">
              <Check className="w-3 h-3" /> Done
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

/* ==============================================================
   FEEDBACK TRIAGE VIEW
   ============================================================== */
function FeedbackTriageView() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 space-y-6 font-sans pb-20">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">Feedback Triage</h1>
        <p className="text-slate-500 text-sm font-semibold mt-0.5">Turn feedback into action — assign an owner, set a status, close the loop.</p>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1 */}
        <div className="bg-white border border-slate-200 rounded-none p-4 flex items-center gap-4 shadow-3xs">
          <div className="w-8 h-8 rounded-none bg-red-50 flex items-center justify-center text-red-500 shrink-0">
            <Folder className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-800 leading-tight">2</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Open</div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-slate-200 rounded-none p-4 flex items-center gap-4 shadow-3xs">
          <div className="w-8 h-8 rounded-none bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
            <AlertCircle className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-800 leading-tight">1</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Urgent open</div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-slate-200 rounded-none p-4 flex items-center gap-4 shadow-3xs">
          <div className="w-8 h-8 rounded-none bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
            <UserCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-800 leading-tight">1</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Assigned to me</div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-none p-4 flex flex-col md:flex-row items-end gap-4 shadow-3xs">
        <div className="flex-1 w-full space-y-1.5">
          <label className="text-[11px] font-bold text-slate-700">Status</label>
          <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-xs font-semibold focus:outline-none focus:border-indigo-600 bg-white appearance-none">
            <option>All</option>
            <option>New</option>
            <option>In progress</option>
            <option>Actioned</option>
          </select>
        </div>
        <div className="flex-1 w-full space-y-1.5">
          <label className="text-[11px] font-bold text-slate-700">Priority</label>
          <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-xs font-semibold focus:outline-none focus:border-indigo-600 bg-white appearance-none">
            <option>All</option>
            <option>Urgent</option>
            <option>High</option>
            <option>Low</option>
          </select>
        </div>
        <div className="flex-1 w-full space-y-1.5">
          <label className="text-[11px] font-bold text-slate-700">Assignee</label>
          <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-xs font-semibold focus:outline-none focus:border-indigo-600 bg-white appearance-none">
            <option>Anyone</option>
            <option>school admin</option>
          </select>
        </div>
        <div className="flex items-center gap-2 pb-2 pl-2">
          <div className="relative inline-flex h-5 w-9 items-center rounded-none bg-slate-200 cursor-pointer">
            <span className="inline-block h-3.5 w-3.5 transform translate-x-0.5 rounded-none bg-white shadow" />
          </div>
          <span className="text-xs font-bold text-slate-700">Open only</span>
        </div>
        <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-none flex items-center justify-center gap-2 cursor-pointer border-none shadow-sm transition-colors text-xs font-bold h-[34px]">
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/></svg> Filter
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-none overflow-hidden shadow-3xs">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 text-indigo-900 font-bold text-xs">
            <ClipboardList className="w-4 h-4 text-indigo-600" /> Feedback actions
          </div>
          <div className="text-[10px] font-semibold text-slate-400">3 items</div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-indigo-50/50 border-b border-slate-100 text-[10px] font-black text-indigo-600 uppercase tracking-wider">
                <th className="py-3 px-4 border-r border-slate-100 w-10 text-center">#</th>
                <th className="py-3 px-4 border-r border-slate-100">TITLE</th>
                <th className="py-3 px-4 border-r border-slate-100">SURVEY</th>
                <th className="py-3 px-4 border-r border-slate-100 text-center">PRIORITY</th>
                <th className="py-3 px-4 border-r border-slate-100 text-center">STATUS</th>
                <th className="py-3 px-4 border-r border-slate-100">OWNER</th>
                <th className="py-3 px-4 border-r border-slate-100">FLAGGED</th>
                <th className="py-3 px-4 text-center w-24">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
              
              <tr className="hover:bg-slate-50/50">
                <td className="py-4 px-4 border-r border-slate-100 text-center text-slate-400">1</td>
                <td className="py-4 px-4 border-r border-slate-100 font-bold text-slate-800">DEMO — Follow up: transport delays raised by a parent</td>
                <td className="py-4 px-4 border-r border-slate-100 text-slate-400 font-medium">DEMO — Parent Satisfaction (Term 1)</td>
                <td className="py-4 px-4 border-r border-slate-100 text-center">
                  <span className="px-2 py-0.5 rounded-none bg-orange-50 text-orange-600 text-[10px] font-extrabold">High</span>
                </td>
                <td className="py-4 px-4 border-r border-slate-100 text-center">
                  <span className="px-2 py-0.5 rounded-none bg-red-50 text-red-500 text-[10px] font-extrabold">New</span>
                </td>
                <td className="py-4 px-4 border-r border-slate-100 text-slate-500">—</td>
                <td className="py-4 px-4 border-r border-slate-100 text-slate-500">3 weeks ago</td>
                <td className="py-4 px-4 text-center">
                  <button className="p-1 hover:text-indigo-600 hover:bg-slate-100 rounded-none cursor-pointer bg-transparent border-none transition-colors text-slate-400">
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
              
              <tr className="hover:bg-slate-50/50">
                <td className="py-4 px-4 border-r border-slate-100 text-center text-slate-400">2</td>
                <td className="py-4 px-4 border-r border-slate-100 font-bold text-slate-800">DEMO — Canteen food quality complaint</td>
                <td className="py-4 px-4 border-r border-slate-100 text-slate-400 font-medium">DEMO — Parent Satisfaction (Term 1)</td>
                <td className="py-4 px-4 border-r border-slate-100 text-center">
                  <span className="px-2 py-0.5 rounded-none bg-red-50 text-red-500 text-[10px] font-extrabold">Urgent</span>
                </td>
                <td className="py-4 px-4 border-r border-slate-100 text-center">
                  <span className="px-2 py-0.5 rounded-none bg-blue-50 text-blue-600 text-[10px] font-extrabold">In progress</span>
                </td>
                <td className="py-4 px-4 border-r border-slate-100 text-slate-600 font-bold">school admin</td>
                <td className="py-4 px-4 border-r border-slate-100 text-slate-500">3 weeks ago</td>
                <td className="py-4 px-4 text-center">
                  <button className="p-1 hover:text-indigo-600 hover:bg-slate-100 rounded-none cursor-pointer bg-transparent border-none transition-colors text-slate-400">
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
              
              <tr className="hover:bg-slate-50/50">
                <td className="py-4 px-4 border-r border-slate-100 text-center text-slate-400">3</td>
                <td className="py-4 px-4 border-r border-slate-100 font-bold text-slate-800">DEMO — Positive: several parents praised the new library</td>
                <td className="py-4 px-4 border-r border-slate-100 text-slate-400 font-medium">DEMO — Parent Satisfaction (Term 1)</td>
                <td className="py-4 px-4 border-r border-slate-100 text-center">
                  <span className="px-2 py-0.5 rounded-none bg-slate-100 text-slate-500 text-[10px] font-extrabold">Low</span>
                </td>
                <td className="py-4 px-4 border-r border-slate-100 text-center">
                  <span className="text-emerald-500 text-[10px] font-extrabold">Actioned</span>
                </td>
                <td className="py-4 px-4 border-r border-slate-100 text-slate-600 font-bold">school admin</td>
                <td className="py-4 px-4 border-r border-slate-100 text-slate-500">3 weeks ago</td>
                <td className="py-4 px-4 text-center">
                  <button className="p-1 hover:text-indigo-600 hover:bg-slate-100 rounded-none cursor-pointer bg-transparent border-none transition-colors text-slate-400">
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

/* ==============================================================
   GUIDE VIEW
   ============================================================== */
function GuideView({ onDashboard, onTemplates, onNewSurvey, onAllSurveys }) {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 space-y-6 font-sans pb-20">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button onClick={onDashboard} className="flex items-center gap-1 text-slate-500 hover:text-indigo-600 text-xs font-bold mb-1 transition-colors bg-transparent border-none cursor-pointer">
            <ArrowLeft className="w-3.5 h-3.5" /> Dashboard
          </button>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">How Surveys & Feedback works</h1>
          <p className="text-slate-500 text-sm font-semibold mt-0.5">A quick tour of the module — from asking a question to acting on the answer.</p>
        </div>
        <button onClick={onTemplates} className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-none flex items-center gap-2 shadow-sm cursor-pointer border-none transition-colors">
          <LayoutTemplate className="w-4 h-4" /> Start from a template
        </button>
      </div>

      {/* Alert */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-none p-4 flex items-start gap-3">
        <Lightbulb className="w-5 h-5 text-indigo-600 mt-0.5" />
        <p className="text-sm text-indigo-900 font-medium">
          One engine powers everything: a <span className="font-bold">poll</span> is a one-question survey, and a <span className="font-bold">feedback form</span> is a survey you can repeat each term. Build once, reuse everywhere.
        </p>
      </div>

      {/* Lifecycle */}
      <div className="bg-white border border-slate-200 rounded-none shadow-3xs overflow-hidden">
        <div className="flex items-center gap-2 p-4 border-b border-slate-100 text-indigo-900 font-bold bg-slate-50/50">
          <Layers className="w-4 h-4 text-indigo-500" /> The lifecycle
        </div>
        <div className="p-6 space-y-6">
          
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-none bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center shrink-0">1</div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Build</h3>
              <p className="text-xs text-slate-500 font-medium mt-1">Create a survey, poll or feedback form — add questions (rating, choice, yes/no, text, date) in the builder, or start from a ready template.</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-none bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center shrink-0">2</div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Choose the audience</h3>
              <p className="text-xs text-slate-500 font-medium mt-1">Target by role (parents, staff, students) or class, and/or share a public no-login link for external audiences.</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-none bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center shrink-0">3</div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Publish</h3>
              <p className="text-xs text-slate-500 font-medium mt-1">Recipients are notified and the survey appears in their "My Surveys". Each person can answer once (unless you allow changes).</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-none bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center shrink-0">4</div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Analyse</h3>
              <p className="text-xs text-slate-500 font-medium mt-1">The report aggregates every answer — averages, distributions, NPS and response rate. Export CSV or publish a report snapshot.</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-none bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center shrink-0">5</div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Act</h3>
              <p className="text-xs text-slate-500 font-medium mt-1">Flag a response or a theme to the triage board, assign an owner and a priority, and close the loop from "we heard you" to "we did something".</p>
            </div>
          </div>

        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-white border border-slate-200 rounded-none shadow-3xs overflow-hidden flex flex-col">
          <div className="flex items-center gap-2 p-4 border-b border-slate-100 text-indigo-900 font-bold bg-slate-50/50">
            <Users className="w-4 h-4 text-indigo-500" /> Anonymity
          </div>
          <div className="p-5 flex-1 space-y-3 text-sm font-medium text-slate-600">
            <p>Turn on <span className="font-bold text-slate-800">Anonymous responses</span> when you want candid feedback. Answers are then stored with no link to the person — not even you can trace them back.</p>
            <p className="text-xs text-slate-500 flex gap-1"><Info className="w-4 h-4 shrink-0" /> The anonymity setting locks once the first response arrives, so results can never be re-identified later.</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-none shadow-3xs overflow-hidden flex flex-col">
          <div className="flex items-center gap-2 p-4 border-b border-slate-100 text-indigo-900 font-bold bg-slate-50/50">
            <RotateCcw className="w-4 h-4 text-indigo-500" /> Recurring feedback
          </div>
          <div className="p-5 flex-1 space-y-3 text-sm font-medium text-slate-600">
            <p>Set a feedback form to <span className="font-bold text-slate-800">repeat</span> weekly, monthly, quarterly or yearly. Each period re-opens automatically and re-invites recipients.</p>
            <p className="text-xs text-slate-500 flex gap-1"><Info className="w-4 h-4 shrink-0" /> Every cycle is tracked separately, so you can compare this term against the last.</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-none shadow-3xs overflow-hidden flex flex-col">
          <div className="flex items-center gap-2 p-4 border-b border-slate-100 text-indigo-900 font-bold bg-slate-50/50">
            <Link2 className="w-4 h-4 text-indigo-500" /> Public links
          </div>
          <div className="p-5 flex-1 space-y-3 text-sm font-medium text-slate-600">
            <p>Set the audience to <span className="font-bold text-slate-800">Public link</span> to collect feedback from anyone — no login needed. Copy the link from the survey page and share it anywhere.</p>
            <p className="text-xs text-slate-500 flex gap-1"><Info className="w-4 h-4 shrink-0" /> Public responses are always unattributed, and "one response per device" curbs duplicates.</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-none shadow-3xs overflow-hidden flex flex-col">
          <div className="flex items-center gap-2 p-4 border-b border-slate-100 text-indigo-900 font-bold bg-slate-50/50">
            <ClipboardList className="w-4 h-4 text-indigo-500" /> Triage board
          </div>
          <div className="p-5 flex-1 space-y-3 text-sm font-medium text-slate-600">
            <p>Open a survey's <span className="font-bold text-slate-800">Responses</span>, read what people said, and <span className="font-bold text-slate-800">Flag</span> anything that needs follow-up. Flagged items land on the triage board.</p>
            <p className="text-xs text-slate-500 flex gap-1"><Info className="w-4 h-4 shrink-0" /> Give each item an owner, priority, tags and notes; mark it Actioned when done.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border border-slate-200 rounded-none shadow-3xs overflow-hidden mt-6">
        <div className="flex items-center gap-2 p-4 border-b border-slate-100 text-indigo-900 font-bold bg-slate-50/50">
          <Play className="w-4 h-4 text-indigo-500" /> Get started
        </div>
        <div className="p-5 flex flex-wrap items-center gap-3">
          <button onClick={onNewSurvey} className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-none flex items-center gap-2 shadow-sm cursor-pointer border-none transition-colors">
            <Plus className="w-4 h-4" /> New survey
          </button>
          <button className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-bold rounded-none flex items-center gap-2 shadow-sm cursor-pointer transition-colors">
            <Zap className="w-4 h-4 text-indigo-500" /> Quick poll
          </button>
          <button onClick={onTemplates} className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-bold rounded-none flex items-center gap-2 shadow-sm cursor-pointer transition-colors">
            <LayoutTemplate className="w-4 h-4" /> Templates
          </button>
          <button onClick={onAllSurveys} className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-bold rounded-none flex items-center gap-2 shadow-sm cursor-pointer transition-colors">
            <MessageSquare className="w-4 h-4" /> All surveys
          </button>
        </div>
      </div>

    </div>
  );
}


/* ==============================================================
   TEMPLATES VIEW
   ============================================================== */
function TemplatesView({ onAllSurveys }) {
  const templates = [
    { title: "Parent Satisfaction", type: "Feedback form", icon: Heart, questions: 5, color: "text-indigo-500", bg: "bg-indigo-50", desc: "How happy are parents with teaching, communication and facilities. Great as a recurring termly pulse." },
    { title: "Teacher Evaluation", type: "Survey · Anonymous", icon: FileEdit, questions: 5, color: "text-purple-500", bg: "bg-purple-50", desc: "Structured feedback on a teacher's clarity, engagement and support. Usually run anonymously." },
    { title: "Event Feedback", type: "Survey", icon: Calendar, questions: 4, color: "text-blue-500", bg: "bg-blue-50", desc: "Quick post-event feedback — sports day, annual function, PTM. Share as a public link too." },
    { title: "Net Promoter (NPS)", type: "Poll", icon: BarChart2, questions: 2, color: "text-amber-500", bg: "bg-amber-50", desc: "The classic one-number loyalty pulse: \"How likely are you to recommend us?\" plus a reason." },
    { title: "Student Wellbeing Check", type: "Feedback form · Anonymous", icon: Users, questions: 4, color: "text-emerald-500", bg: "bg-emerald-50", desc: "A gentle anonymous check-in on how students are feeling at school." },
    { title: "Suggestion Box", type: "Survey · Anonymous", icon: Lightbulb, questions: 2, color: "text-orange-500", bg: "bg-orange-50", desc: "An always-open anonymous channel for ideas and concerns from anyone." },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 space-y-6 font-sans pb-20">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button onClick={onAllSurveys} className="flex items-center gap-1 text-slate-500 hover:text-indigo-600 text-xs font-bold mb-1 transition-colors bg-transparent border-none cursor-pointer">
            <ArrowLeft className="w-3.5 h-3.5" /> All surveys
          </button>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">Start from a template</h1>
          <p className="text-slate-500 text-sm font-semibold mt-0.5">Professionally-worded starting points. Pick one, then tweak and publish.</p>
        </div>
        <button className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-bold rounded-none flex items-center gap-2 shadow-sm cursor-pointer transition-colors">
          <FilePlus2 className="w-4 h-4" /> Start blank
        </button>
      </div>

      {/* Templates List */}
      <div className="flex gap-4 overflow-x-auto pb-4 pt-2 -mx-4 px-4 md:mx-0 md:px-0">
        {templates.map((tpl, i) => (
          <div key={i} className="min-w-[280px] w-[280px] bg-white border border-slate-200 rounded-none p-5 flex flex-col shadow-3xs shrink-0 hover:border-indigo-300 transition-colors">
            <div className="flex gap-3 mb-3">
              <div className={`w-10 h-10 rounded-none flex items-center justify-center shrink-0 ${tpl.bg}`}>
                <tpl.icon className={`w-5 h-5 ${tpl.color}`} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 leading-tight">{tpl.title}</h3>
                <p className="text-[11px] font-semibold text-slate-400 mt-0.5">{tpl.type}</p>
              </div>
            </div>
            
            <p className="text-xs text-slate-500 font-medium flex-1 mb-6 leading-relaxed">
              {tpl.desc}
            </p>
            
            <div className="flex items-center justify-between mt-auto">
              <div className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">
                {tpl.questions} questions
              </div>
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-none flex items-center gap-2 cursor-pointer shadow-sm border-none transition-colors">
                <Zap className="w-3.5 h-3.5 fill-current" /> Use template
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
