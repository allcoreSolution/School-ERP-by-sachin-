import React from 'react';
import { Printer, FileText, Megaphone, ArrowLeft, Calendar, MapPin, ArrowLeftCircle, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ManageDatesheet() {
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-10 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Datesheet — Term 3 Nov</h1>
          <p className="text-xs text-slate-500 mt-1">13 Nov, 2026 to 27 Nov, 2026 • All classes in scope</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 font-bold text-xs rounded-none shadow-sm hover:bg-slate-50 flex items-center gap-2 cursor-pointer transition-colors">
            <Calendar className="w-4 h-4" /> Edit dates
          </button>
          <button 
            onClick={() => navigate('/offline-exams/manage')}
            className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 font-bold text-xs rounded-none shadow-sm hover:bg-slate-50 flex items-center gap-2 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> All datesheets
          </button>
        </div>
      </div>

      {/* Notice-board sheet */}
      <div className="bg-white border border-slate-200 rounded-none shadow-sm mb-6 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#6f42c1] flex items-center gap-2">
            <MapPin className="w-4 h-4" /> Notice-board sheet
          </h2>
        </div>
        <div className="p-4">
          <p className="text-sm text-slate-600 mb-4">
            One document covering all 2 classes — the single sheet you pin up. Parents see it only if their own class has no sheet of its own.
          </p>
          <div className="flex gap-2">
            <button onClick={handlePrint} className="px-4 py-2 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 rounded-none text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer transition-colors">
              <Printer className="w-4 h-4" /> Print
            </button>
            <button onClick={handlePrint} className="px-4 py-2 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 rounded-none text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer transition-colors">
              <FileText className="w-4 h-4" /> PDF
            </button>
            <button className="px-4 py-2 bg-[#6f42c1] hover:bg-[#5a32a3] text-white rounded-none text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer transition-colors border-none">
              <Megaphone className="w-4 h-4" /> Publish to all classes
            </button>
          </div>
        </div>
      </div>

      {/* Nursery Section */}
      <div className="bg-white border border-slate-200 rounded-none shadow-sm overflow-hidden mb-6">
        <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between bg-white">
          <h2 className="text-sm font-bold text-[#6f42c1] flex items-center gap-2">
            <div className="w-3 h-3 rounded-none border-2 border-[#6f42c1]"></div> Nursery <span className="text-slate-400 font-normal">- 3 papers</span>
          </h2>
          <div className="flex gap-1.5">
            <span className="px-2 py-0.5 bg-[#28a745] text-white text-[10px] font-bold rounded-none shadow-sm">Ready</span>
            <span className="px-2 py-0.5 bg-[#007bff] text-white text-[10px] font-bold rounded-none shadow-sm">Published</span>
            <span className="px-2 py-0.5 bg-[#ffc107] text-slate-800 text-[10px] font-bold rounded-none shadow-sm">R3</span>
          </div>
        </div>
        
        {/* Yellow Alerts */}
        <div className="bg-[#ffc107] p-4 text-slate-900 border-b border-yellow-500/30">
          <div className="font-bold text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> No paper scheduled for: Rhymes & Stories, Mathematics Standard, Mathematics Basic
          </div>
          <div className="text-xs mt-1 opacity-90">If these subjects aren't being examined, that's fine — you'll be asked to confirm when publishing. Otherwise add them in Schedule & Marks Setup first.</div>
        </div>

        <div className="bg-[#ffc107] p-4 text-slate-900 border-b border-yellow-500/30">
          <div className="font-bold text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Worth checking (won't block publishing):
          </div>
          <ul className="text-xs mt-1 ml-6 list-disc opacity-90">
            <li>Mathematics — no room</li>
          </ul>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-[#f3f0ff] border-b border-slate-200 text-[10px] font-bold text-[#6f42c1] uppercase tracking-wider">
                <th className="py-3 px-4 border-r border-slate-200/50">DATE</th>
                <th className="py-3 px-4 border-r border-slate-200/50">DAY</th>
                <th className="py-3 px-4 border-r border-slate-200/50">SUBJECT</th>
                <th className="py-3 px-4 border-r border-slate-200/50">TIME</th>
                <th className="py-3 px-4">ROOM</th>
              </tr>
            </thead>
            <tbody className="text-xs text-slate-700">
              <tr className="border-b border-slate-100 bg-white hover:bg-slate-50 transition-colors">
                <td className="py-3 px-4 border-r border-slate-100">02 Feb, 2026</td>
                <td className="py-3 px-4 border-r border-slate-100">Mon</td>
                <td className="py-3 px-4 border-r border-slate-100">Drawing & Coloring</td>
                <td className="py-3 px-4 border-r border-slate-100">01:00 AM - 02:01 AM</td>
                <td className="py-3 px-4">89</td>
              </tr>
              <tr className="border-b border-slate-100 bg-[#f8f9fc]/50 hover:bg-slate-50 transition-colors">
                <td className="py-3 px-4 border-r border-slate-100">13 Aug, 2026</td>
                <td className="py-3 px-4 border-r border-slate-100">Thu</td>
                <td className="py-3 px-4 border-r border-slate-100">English</td>
                <td className="py-3 px-4 border-r border-slate-100">06:04 PM - 09:03 PM</td>
                <td className="py-3 px-4">343sdsfsdf</td>
              </tr>
              <tr className="border-b border-slate-100 bg-white hover:bg-slate-50 transition-colors">
                <td className="py-3 px-4 border-r border-slate-100">19 Aug, 2026</td>
                <td className="py-3 px-4 border-r border-slate-100">Wed</td>
                <td className="py-3 px-4 border-r border-slate-100">Mathematics</td>
                <td className="py-3 px-4 border-r border-slate-100">02:33 PM - 05:55 PM</td>
                <td className="py-3 px-4">—</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Action Footer */}
        <div className="p-4 bg-white flex items-center justify-between">
          <div className="flex gap-2 items-center flex-wrap">
            <button onClick={handlePrint} className="px-4 py-2 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 rounded-none text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer transition-colors">
              <Printer className="w-4 h-4" /> Print
            </button>
            <button onClick={handlePrint} className="px-4 py-2 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 rounded-none text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer transition-colors">
              <FileText className="w-4 h-4" /> PDF
            </button>
            <button className="px-4 py-2 bg-[#6f42c1] hover:bg-[#5a32a3] text-white rounded-none text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer transition-colors border-none">
              <Megaphone className="w-4 h-4" /> Re-publish
            </button>
            <span className="text-[10px] text-slate-500 ml-2">Published 17 Aug, 2026 - parents notified</span>
          </div>
          <button className="px-4 py-2 border border-red-500 text-red-500 bg-white hover:bg-red-50 rounded-none text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer transition-colors">
             <ArrowLeftCircle className="w-4 h-4" /> Withdraw
          </button>
        </div>
      </div>
    </div>
  );
}
