import React, { useState } from 'react';
import { 
  Eye, Edit2, Trash2, LayoutDashboard, Layers, FileSignature, Scale, LineChart, BookOpen, Filter, Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function OSMSessions() {
  const navigate = useNavigate();

  const [sessions, setSessions] = useState([
    { id: 1, title: 'A', marks: 0, class: 'Class I / A', subject: 'English', sheets: 0, evaluated: 0, total: 0, status: 'Draft' },
    { id: 2, title: 'Term1', marks: 40, anonymous: true, class: 'Class XI / A', subject: 'English Core', sheets: 1, evaluated: 0, total: 1, status: 'Evaluating' },
    { id: 3, title: 'DEMO — OSM — English (Class I)', marks: 50, class: 'Class I / A', subject: 'English', sheets: 12, evaluated: 12, total: 12, status: 'Completed' },
    { id: 4, title: 'DEMO — OSM — English (Class III)', marks: 50, class: 'Class III / A', subject: 'English', sheets: 12, evaluated: 12, total: 12, status: 'Completed' },
    { id: 5, title: 'DEMO — OSM — English (Class V)', marks: 50, class: 'Class V / A', subject: 'English', sheets: 12, evaluated: 12, total: 12, status: 'Completed' },
    { id: 6, title: 'DEMO — OSM — English (Class VI)', marks: 50, class: 'Class VI / A', subject: 'English', sheets: 12, evaluated: 12, total: 12, status: 'Completed' }
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this session?")) {
      setSessions(sessions.filter(s => s.id !== id));
    }
  };

  const getStatusColor = (status) => {
    if (status === 'Draft') return 'bg-slate-500 text-white';
    if (status === 'Evaluating') return 'bg-amber-500 text-white';
    if (status === 'Completed') return 'bg-green-500 text-white';
    return 'bg-slate-500 text-white';
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-10">
      {/* Header */}
      <div className="bg-white px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Digital Evaluation</h1>
          <p className="text-[11px] text-slate-500 mt-1">On-screen marking of scanned answer sheets — upload, evaluate question-by-question, and report.</p>
        </div>
        <button 
          onClick={() => navigate('/osm-module/sessions/new')}
          className="mt-4 md:mt-0 px-4 py-2 bg-[#6f42c1] hover:bg-[#5a32a3] text-white font-bold text-[11px] rounded-none flex items-center gap-2 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> New Session
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white px-6 border-b border-slate-200 flex items-center gap-6 text-[12px] font-bold">
        <button className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors">
          <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
        </button>
        <button className="flex items-center gap-2 py-3 text-slate-800 border-b-2 border-slate-800">
          <Layers className="w-3.5 h-3.5" /> Sessions
        </button>
        <button onClick={() => navigate('/osm-module/evaluate')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">
          <FileSignature className="w-3.5 h-3.5" /> Evaluate
        </button>
        <button onClick={() => navigate('/osm-module/moderation')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">
          <Scale className="w-3.5 h-3.5" /> Moderation
        </button>
        <button onClick={() => navigate('/osm-module/reports')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">
          <LineChart className="w-3.5 h-3.5" /> Reports
        </button>
        <button className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors">
          <BookOpen className="w-3.5 h-3.5" /> Guide
        </button>
      </div>

      <div className="p-6 max-w-[1400px] mx-auto space-y-4">
        {/* Filters */}
        <div className="flex gap-4 items-end bg-white p-4 border border-slate-200 rounded-none shadow-sm">
          <div className="w-64">
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Status</label>
            <select className="w-full px-3 py-1.5 border border-slate-300 rounded-none text-sm text-slate-700 bg-white focus:outline-none focus:border-[#6f42c1]">
              <option>All statuses</option>
            </select>
          </div>
          <div className="w-64">
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Class</label>
            <select className="w-full px-3 py-1.5 border border-slate-300 rounded-none text-sm text-slate-700 bg-white focus:outline-none focus:border-[#6f42c1]">
              <option>All classes</option>
            </select>
          </div>
          <button className="px-6 py-1.5 bg-[#343a40] hover:bg-[#23272b] text-white font-bold text-[11px] rounded-none flex items-center gap-2 transition-colors">
            <Filter className="w-3.5 h-3.5" /> Filter
          </button>
        </div>

        {/* Data Table */}
        <div className="bg-white border border-slate-200 rounded-none shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-white border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">SESSION</th>
                  <th className="py-3 px-4">CLASS / SUBJECT</th>
                  <th className="py-3 px-4 text-center">SHEETS</th>
                  <th className="py-3 px-4 text-center">PROGRESS</th>
                  <th className="py-3 px-4 text-center">STATUS</th>
                  <th className="py-3 px-4 text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="text-xs text-slate-700">
                {sessions.map((s) => (
                  <tr key={s.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-[13px] text-slate-800">{s.title}</div>
                      <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                        {s.anonymous && <span className="bg-[#343a40] text-white px-1.5 py-0.5 rounded-none text-[9px] font-bold">Anonymous</span>}
                        Max {s.marks}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-[11px] text-slate-800">{s.class}</div>
                      <div className="text-[11px] text-slate-500">{s.subject}</div>
                    </td>
                    <td className="py-3 px-4 text-center text-[13px] font-medium text-slate-800">
                      {s.sheets}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="w-48 mx-auto">
                        <div className="w-full bg-slate-200 rounded-none h-1.5 mb-1">
                          <div 
                            className="bg-[#6f42c1] h-1.5 rounded-none" 
                            style={{ width: `${s.total === 0 ? 0 : (s.evaluated / s.total) * 100}%` }}
                          ></div>
                        </div>
                        <div className="text-[10px] text-slate-500 font-medium">
                          {s.evaluated}/{s.total}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2.5 py-1 rounded-none text-[10px] font-bold ${getStatusColor(s.status)}`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button 
                          onClick={() => navigate('/osm-module/sessions/details')}
                          className="p-1 border border-slate-300 rounded-none text-slate-500 hover:text-blue-600 hover:border-blue-300 bg-white transition-colors cursor-pointer shadow-sm"
                          title="View"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => navigate('/osm-module/sessions/new')}
                          className="p-1 border border-slate-300 rounded-none text-slate-500 hover:text-blue-600 hover:border-blue-300 bg-white transition-colors cursor-pointer shadow-sm"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(s.id)}
                          className="p-1 border border-red-300 rounded-none text-red-500 hover:bg-red-50 bg-white transition-colors cursor-pointer shadow-sm"
                          title="Delete"
                        >
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
    </div>
  );
}
