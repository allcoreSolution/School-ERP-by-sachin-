import React, { useState } from 'react';
import { 
  LayoutDashboard, Layers, FileSignature, Scale, LineChart, BookOpen, Plus, PenTool, Check
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function OSMEvaluate() {
  const navigate = useNavigate();

  const [bundles, setBundles] = useState([
    { id: 1, title: 'Term1', subtitle: 'English Core - Class XI / A', done: 0, total: 1, percent: 0, complete: false },
    { id: 2, title: 'DEMO — OSM — English (Class I)', subtitle: 'English - Class I / A', done: 12, total: 12, percent: 100, complete: true },
    { id: 3, title: 'DEMO — OSM — English (Class III)', subtitle: 'English - Class III / A', done: 12, total: 12, percent: 100, complete: true },
    { id: 4, title: 'DEMO — OSM — English (Class V)', subtitle: 'English - Class V / A', done: 12, total: 12, percent: 100, complete: true },
    { id: 5, title: 'DEMO — OSM — English (Class VI)', subtitle: 'English - Class VI / A', done: 12, total: 12, percent: 100, complete: true },
    { id: 6, title: 'DEMO — OSM — English (Class II)', subtitle: 'English - Class II / A', done: 12, total: 12, percent: 100, complete: true },
    { id: 7, title: 'DEMO — OSM — English Core (Class XI)', subtitle: 'English Core - Class XI / A', done: 12, total: 12, percent: 100, complete: true },
    { id: 8, title: 'DEMO — OSM — English (Nursery)', subtitle: 'English - Nursery / A', done: 10, total: 10, percent: 100, complete: true },
    { id: 9, title: 'DEMO — OSM — English (Nursery)', subtitle: 'English - Nursery / B', done: 12, total: 12, percent: 100, complete: true },
  ]);

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
          className="mt-4 md:mt-0 px-4 py-2 bg-[#6f42c1] hover:bg-[#5a32a3] text-white font-bold text-[11px] rounded-none flex items-center gap-2 transition-colors cursor-pointer border-none shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" /> New Session
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white px-6 border-b border-slate-200 flex items-center gap-6 text-[12px] font-bold">
        <button onClick={() => navigate('/osm-module/dashboard')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">
          <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
        </button>
        <button onClick={() => navigate('/osm-module/sessions')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">
          <Layers className="w-3.5 h-3.5" /> Sessions
        </button>
        <button className="flex items-center gap-2 py-3 text-slate-800 border-b-2 border-slate-800 cursor-pointer">
          <FileSignature className="w-3.5 h-3.5" /> Evaluate
        </button>
        <button onClick={() => navigate('/osm-module/moderation')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">
          <Scale className="w-3.5 h-3.5" /> Moderation
        </button>
        <button onClick={() => navigate('/osm-module/reports')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">
          <LineChart className="w-3.5 h-3.5" /> Reports
        </button>
        <button className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">
          <BookOpen className="w-3.5 h-3.5" /> Guide
        </button>
      </div>

      <div className="p-6 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {bundles.map(b => (
            <div key={b.id} className="bg-white border border-slate-200 rounded-none shadow-sm p-4 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-[14px] text-slate-800 mb-1">{b.title}</h3>
              <p className="text-[11px] text-slate-500 mb-4">{b.subtitle}</p>
              
              <div className="flex justify-between items-end mb-1 text-[11px] font-bold text-slate-600">
                <span>{b.done}/{b.total} done</span>
                <span>{b.percent}%</span>
              </div>
              
              <div className="w-full bg-slate-200 h-1.5 rounded-none mb-4">
                <div 
                  className="h-1.5 rounded-none bg-[#6f42c1]" 
                  style={{ width: `${b.percent}%` }}
                ></div>
              </div>

              {b.complete ? (
                <button className="w-full py-2 bg-[#63b378] text-white font-bold text-[12px] rounded-none flex justify-center items-center gap-2 border-none">
                  <Check className="w-3.5 h-3.5" /> Bundle complete
                </button>
              ) : (
                <button className="w-full py-2 bg-[#6f42c1] hover:bg-[#5a32a3] text-white font-bold text-[12px] rounded-none flex justify-center items-center gap-2 transition-colors cursor-pointer border-none shadow-sm">
                  <PenTool className="w-3.5 h-3.5" /> Evaluate ({b.total - b.done} pending)
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
