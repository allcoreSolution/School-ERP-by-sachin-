import React, { useState } from 'react';
import { 
  FileText, Printer, BarChart2, Plus, List, Grid, Copy, Download, FileSpreadsheet, File, Search, ChevronDown, Calendar, CreditCard, Settings, Edit, Trash2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const initialMockExams = [
  { id: 1, name: 'Annual Examination', session: '2026-2027', appliesTo: '13 classes', start: '12 Jul, 2026', end: '12 Jul, 2026' },
  { id: 2, name: 'Half-Yearly Examination 2026-2027', session: '2026-2027', appliesTo: 'All classes', start: '01 Apr, 2026', end: '01 Apr, 2026' },
  { id: 3, name: 'Half-Yearly Examination 2026-2027', session: '2026-2027', appliesTo: 'All classes', start: '01 Apr, 2026', end: '01 Apr, 2026' },
  { id: 4, name: 'Half-Yearly Examination 2026-2027', session: '2026-2027', appliesTo: 'All classes', start: '01 Apr, 2026', end: '01 Apr, 2026' },
  { id: 5, name: 'New Exam Test', session: '2026-2027', appliesTo: '1 class', start: '01 Aug, 2026', end: '14 Aug, 2026' },
  { id: 6, name: 'Term 1', session: '2026-2027', appliesTo: 'All classes', start: '01 Feb, 2026', end: '26 Feb, 2026' },
  { id: 7, name: 'Term 2', session: '2026-2027', appliesTo: 'All classes', start: '01 Feb, 2026', end: '26 Feb, 2026' },
  { id: 8, name: 'Term 3', session: '2026-2027', appliesTo: 'All classes', start: '01 Feb, 2026', end: '26 Feb, 2026' },
  { id: 9, name: 'Term 3 Nov', session: '2026-2027', appliesTo: 'All classes', start: '13 Nov, 2026', end: '27 Nov, 2026' },
  { id: 10, name: 'Term 4', session: '2026-2027', appliesTo: 'All classes', start: '01 Feb, 2026', end: '26 Feb, 2026' },
];

export default function ManageOfflineExams() {
  const navigate = useNavigate();
  const [exams, setExams] = useState(initialMockExams);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this exam?')) {
      setExams(exams.filter(exam => exam.id !== id));
    }
  };

  const handleExport = (type) => {
    if (type === 'print') {
      window.print();
    } else {
      alert(`Exporting data as ${type}...`);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-10 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Manage Exams</h1>
        <div className="flex flex-wrap gap-2">
          <button className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 font-bold text-xs rounded-none shadow-sm hover:bg-slate-50 flex items-center gap-2 cursor-pointer">
            <List className="w-3.5 h-3.5" /> View all sessions
          </button>
          <button className="px-3 py-1.5 bg-[#ffc107] hover:bg-[#e0a800] text-slate-900 font-bold text-xs rounded-none shadow-sm flex items-center gap-2 cursor-pointer border-none">
            <Printer className="w-3.5 h-3.5" /> Print Admit Cards
          </button>
          <button className="px-3 py-1.5 bg-[#28a745] hover:bg-[#218838] text-white font-bold text-xs rounded-none shadow-sm flex items-center gap-2 cursor-pointer border-none">
            <BarChart2 className="w-3.5 h-3.5" /> Result Analytics
          </button>
          <button 
            onClick={() => navigate('/offline-exams/quick-setup')}
            className="px-3 py-1.5 bg-[#6f42c1] hover:bg-[#5a32a3] text-white font-bold text-xs rounded-none shadow-sm flex items-center gap-2 cursor-pointer border-none"
          >
            <Plus className="w-3.5 h-3.5" /> Add New Exam
          </button>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white border border-slate-200 rounded-none shadow-sm">
        {/* Card Header */}
        <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <List className="w-4 h-4 text-purple-600" /> Exams — this session
          </h2>
          <div className="flex bg-slate-100 rounded-none border border-slate-200 p-0.5">
            <button 
              onClick={() => setViewMode('list')}
              className={`p-1 rounded-none cursor-pointer border-none ${viewMode === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'bg-transparent text-slate-400 hover:text-slate-600'}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1 rounded-none cursor-pointer border-none ${viewMode === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'bg-transparent text-slate-400 hover:text-slate-600'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              Show
              <select className="border border-slate-300 rounded-none px-2 py-1 bg-white focus:outline-none">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
            </div>
            <div className="flex rounded-none border border-slate-300 overflow-hidden ml-2">
              <button onClick={() => handleExport('Copy')} className="px-2.5 py-1 bg-white hover:bg-slate-50 border-r border-slate-300 text-slate-600 cursor-pointer"><Copy className="w-3.5 h-3.5" /></button>
              <button onClick={() => handleExport('CSV')} className="px-2.5 py-1 bg-white hover:bg-slate-50 border-r border-slate-300 text-xs font-bold text-slate-600 cursor-pointer">CSV</button>
              <button onClick={() => handleExport('Excel')} className="px-2.5 py-1 bg-white hover:bg-slate-50 border-r border-slate-300 text-xs font-bold text-slate-600 cursor-pointer">Excel</button>
              <button onClick={() => handleExport('PDF')} className="px-2.5 py-1 bg-white hover:bg-slate-50 border-r border-slate-300 text-xs font-bold text-slate-600 cursor-pointer">PDF</button>
              <button onClick={() => handleExport('print')} className="px-2.5 py-1 bg-white hover:bg-slate-50 text-slate-600 cursor-pointer"><Printer className="w-3.5 h-3.5" /></button>
            </div>
            <button className="px-3 py-1 bg-white border border-slate-300 rounded-none text-xs font-bold text-slate-600 flex items-center gap-2 hover:bg-slate-50 cursor-pointer">
              Columns <ChevronDown className="w-3 h-3" />
            </button>
          </div>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-8 pr-3 py-1.5 border border-slate-300 rounded-none text-sm w-full md:w-64 focus:outline-none focus:border-indigo-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2" />
          </div>
        </div>

        {viewMode === 'list' ? (
          /* List View */
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-[#f8f9fc] border-b border-slate-200 text-[10px] font-bold text-[#6f42c1] uppercase tracking-wider">
                  <th className="py-3 px-4 border-r border-slate-200">EXAM NAME</th>
                  <th className="py-3 px-4 border-r border-slate-200">SESSION</th>
                  <th className="py-3 px-4 border-r border-slate-200">APPLIES TO</th>
                  <th className="py-3 px-4 border-r border-slate-200">START DATE</th>
                  <th className="py-3 px-4 border-r border-slate-200">END DATE</th>
                  <th className="py-3 px-4">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="text-xs text-slate-700">
                {exams.map((exam, idx) => (
                  <tr key={exam.id} className={`border-b border-slate-100 hover:bg-slate-50 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                    <td className="py-3 px-4 text-slate-700">{exam.name}</td>
                    <td className="py-3 px-4">{exam.session}</td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded-none bg-[#17a2b8] text-white font-bold text-[10px]">
                        {exam.appliesTo}
                      </span>
                    </td>
                    <td className="py-3 px-4">{exam.start}</td>
                    <td className="py-3 px-4">{exam.end}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <button onClick={() => navigate('/offline-exams/datesheet')} className="px-2 py-1 bg-[#fd7e14] hover:bg-[#e8700d] text-white rounded-none font-bold text-[10px] flex items-center gap-1 cursor-pointer border-none shadow-sm">
                          <Calendar className="w-3 h-3" /> Datesheet
                        </button>
                        <button onClick={() => navigate('/offline-exams/admit-cards')} className="px-2 py-1 bg-[#ffc107] hover:bg-[#e0a800] text-slate-900 rounded-none font-bold text-[10px] flex items-center gap-1 cursor-pointer border-none shadow-sm">
                          <CreditCard className="w-3 h-3" /> Admit Cards
                        </button>
                        <button onClick={() => navigate('/offline-exams/card-settings')} className="px-2 py-1 bg-[#6c757d] hover:bg-[#5a6268] text-white rounded-none font-bold text-[10px] flex items-center gap-1 cursor-pointer border-none shadow-sm">
                          <Settings className="w-3 h-3" /> Card Settings
                        </button>
                        <button onClick={() => navigate('/offline-exams/result-settings')} className="px-2 py-1 bg-[#28a745] hover:bg-[#218838] text-white rounded-none font-bold text-[10px] flex items-center gap-1 cursor-pointer border-none shadow-sm">
                          <BarChart2 className="w-3 h-3" /> Result Settings
                        </button>
                        <button onClick={() => navigate('/offline-exams/edit')} className="px-2 py-1 bg-[#0dcaf0] hover:bg-[#0bacce] text-white rounded-none font-bold text-[10px] flex items-center gap-1 cursor-pointer border-none shadow-sm">
                          <Edit className="w-3 h-3" /> Edit
                        </button>
                        <button onClick={() => handleDelete(exam.id)} className="px-2 py-1 bg-[#dc3545] hover:bg-[#c82333] text-white rounded-none font-bold text-[10px] flex items-center gap-1 cursor-pointer border-none shadow-sm">
                          <Trash2 className="w-3 h-3" /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* Grid View */
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-slate-50">
            {exams.map((exam) => (
              <div key={exam.id} className="bg-white border border-slate-200 rounded-none p-4 shadow-sm hover:border-[#6f42c1] transition-colors">
                <h3 className="font-bold text-slate-800 text-sm mb-1">{exam.name}</h3>
                <div className="text-xs text-slate-500 mb-3">{exam.session}</div>
                <div className="flex gap-4 text-[10px] font-bold text-slate-600 mb-4 bg-slate-50 p-2 rounded">
                  <div>
                    <span className="text-slate-400 block mb-0.5">START</span>
                    {exam.start}
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">END</span>
                    {exam.end}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                  <button onClick={() => navigate('/offline-exams/datesheet')} className="px-2 py-1 bg-[#fd7e14] text-white rounded-none font-bold text-[10px] cursor-pointer border-none shadow-sm">Datesheet</button>
                  <button onClick={() => navigate('/offline-exams/admit-cards')} className="px-2 py-1 bg-[#ffc107] text-slate-900 rounded-none font-bold text-[10px] cursor-pointer border-none shadow-sm">Admit Cards</button>
                  <button onClick={() => navigate('/offline-exams/card-settings')} className="px-2 py-1 bg-[#6c757d] text-white rounded-none font-bold text-[10px] cursor-pointer border-none shadow-sm">Card Settings</button>
                  <button onClick={() => navigate('/offline-exams/result-settings')} className="px-2 py-1 bg-[#28a745] text-white rounded-none font-bold text-[10px] cursor-pointer border-none shadow-sm">Result Settings</button>
                  <button onClick={() => navigate('/offline-exams/edit')} className="px-2 py-1 bg-[#0dcaf0] text-white rounded-none font-bold text-[10px] cursor-pointer border-none shadow-sm">Edit</button>
                  <button onClick={() => handleDelete(exam.id)} className="px-2 py-1 bg-[#dc3545] text-white rounded-none font-bold text-[10px] cursor-pointer border-none shadow-sm">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="p-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div>Showing 1–{exams.length} of {exams.length}</div>
          <div className="flex gap-1">
            <button className="w-6 h-6 rounded-none border border-slate-200 flex items-center justify-center text-slate-400 bg-white cursor-pointer">&lt;</button>
            <button className="w-6 h-6 rounded-none bg-[#6f42c1] text-white flex items-center justify-center font-bold border-none shadow-sm cursor-pointer">1</button>
            <button className="w-6 h-6 rounded-none border border-slate-200 flex items-center justify-center text-slate-400 bg-white cursor-pointer">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
}
