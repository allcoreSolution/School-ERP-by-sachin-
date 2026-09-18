import React, { useState } from 'react';
import { 
  Tags, Plus, List, Grid as GridIcon, Copy, Printer, Search, ChevronDown, Edit, Trash2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const initialExamTypes = [
  { id: 1, name: '1st Term', abbreviation: '—' },
  { id: 2, name: 'ANNUAL EXAMINATIO', abbreviation: 'ANN' },
  { id: 3, name: 'HALF YEARLY', abbreviation: 'HY' },
  { id: 4, name: 'NOTE BOOK', abbreviation: 'NB' },
  { id: 5, name: 'Oral', abbreviation: 'Or' },
  { id: 6, name: 'Oral Exam', abbreviation: 'OR' },
];

export default function OfflineExamTypes() {
  const [examTypes, setExamTypes] = useState(initialExamTypes);
  const [typesViewMode, setTypesViewMode] = useState('list');
  const navigate = useNavigate();

  const handleExport = (type) => {
    if (type === 'print') {
      window.print();
    } else {
      alert(`Exporting data as ${type}...`);
    }
  };

  const handleDeleteExamType = (id) => {
    if (window.confirm('Are you sure you want to delete this exam type?')) {
      setExamTypes(examTypes.filter(et => et.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button 
          onClick={() => navigate('/offline-exams/types/add')}
          className="px-4 py-2 bg-[#5b5fcf] hover:bg-[#4a4db5] text-white font-bold text-sm rounded-none shadow-sm flex items-center gap-2 cursor-pointer transition-colors border-none"
        >
          <Plus className="w-4 h-4" /> Add New Exam Type
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-none shadow-sm">
        <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Tags className="w-4 h-4 text-[#6f42c1]" /> All Exam Types
          </h2>
          <div className="flex bg-slate-100 rounded-none border border-slate-200 p-0.5">
            <button 
              onClick={() => setTypesViewMode('list')}
              className={`p-1 rounded-none cursor-pointer border-none ${typesViewMode === 'list' ? 'bg-white shadow-sm text-[#6f42c1]' : 'bg-transparent text-slate-400 hover:text-slate-600'}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setTypesViewMode('grid')}
              className={`p-1 rounded-none cursor-pointer border-none ${typesViewMode === 'grid' ? 'bg-white shadow-sm text-[#6f42c1]' : 'bg-transparent text-slate-400 hover:text-slate-600'}`}
            >
              <GridIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

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
              placeholder="Search exam types..." 
              className="pl-8 pr-3 py-1.5 border border-slate-300 rounded-none text-sm w-full md:w-64 focus:outline-none focus:border-[#6f42c1]"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2" />
          </div>
        </div>

        {typesViewMode === 'list' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-gray-300 whitespace-nowrap">
              <thead>
                <tr className="bg-gray-100 text-xs font-bold text-slate-600 uppercase tracking-wider">
                  <th className="py-3 px-4 border border-gray-300 text-center w-16">#</th>
                  <th className="py-3 px-4 border border-gray-300">NAME</th>
                  <th className="py-3 px-4 border border-gray-300">ABBREVIATION</th>
                  <th className="py-3 px-4 border border-gray-300 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="text-xs text-slate-700">
                {examTypes.map((type, idx) => (
                  <tr key={type.id} className={`border-b border-slate-100 hover:bg-slate-50 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                    <td className="py-3 px-4 text-center border-r border-slate-100 text-slate-500 border border-gray-300">{type.id}</td>
                    <td className="py-3 px-4 font-bold border-r border-slate-100 border border-gray-300">{type.name}</td>
                    <td className="py-3 px-4 border-r border-slate-100 text-[#6f42c1] font-bold border border-gray-300">{type.abbreviation}</td>
                    <td className="py-3 px-4 text-right border border-gray-300">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-none cursor-pointer border-none">
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleDeleteExamType(type.id)} className="p-1.5 bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-red-600 rounded-none cursor-pointer border-none">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 bg-slate-50">
            {examTypes.map((type) => (
              <div key={type.id} className="bg-white border border-slate-200 rounded-none p-4 shadow-sm hover:border-[#6f42c1] transition-colors relative group">
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <button className="p-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-none cursor-pointer border-none">
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDeleteExamType(type.id)} className="p-1 bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-red-600 rounded-none cursor-pointer border-none">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="text-xs text-slate-500 font-bold mb-1">#{type.id}</div>
                <h3 className="font-bold text-slate-800 text-sm mb-2 pr-16">{type.name}</h3>
                <div className="inline-block px-2 py-1 bg-[#f0ebfa] text-[#6f42c1] text-[10px] font-bold rounded">
                  {type.abbreviation}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
