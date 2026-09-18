import React, { useState } from 'react';
import { 
  LayoutDashboard, Layers, FileSignature, Scale, LineChart, BookOpen, Plus, BarChart2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function OSMReports() {
  const navigate = useNavigate();

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
        <button onClick={() => navigate('/osm-module/evaluate')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">
          <FileSignature className="w-3.5 h-3.5" /> Evaluate
        </button>
        <button onClick={() => navigate('/osm-module/moderation')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">
          <Scale className="w-3.5 h-3.5" /> Moderation
        </button>
        <button className="flex items-center gap-2 py-3 text-slate-800 border-b-2 border-slate-800 cursor-pointer">
          <LineChart className="w-3.5 h-3.5" /> Reports
        </button>
        <button className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">
          <BookOpen className="w-3.5 h-3.5" /> Guide
        </button>
      </div>

      <div className="p-6 max-w-[1400px] mx-auto space-y-4">
        {/* Dropdown Container */}
        <div className="bg-white border border-slate-200 rounded-none shadow-sm p-5">
          <div className="max-w-md">
            <label className="block text-[11px] font-bold text-slate-600 mb-1.5">Evaluation Session</label>
            <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 bg-white focus:outline-none focus:border-[#6f42c1]">
              <option>-- Select a session --</option>
              <option>Term 1 - Mathematics</option>
              <option>DEMO — OSM — English</option>
            </select>
          </div>
        </div>

        {/* Empty State */}
        <div className="bg-white border border-slate-200 rounded-none shadow-sm p-16 flex flex-col items-center justify-center text-slate-400">
          <BarChart2 className="w-12 h-12 mb-3 opacity-30" />
          <p className="text-sm">Select a session to view its report.</p>
        </div>
      </div>
    </div>
  );
}
