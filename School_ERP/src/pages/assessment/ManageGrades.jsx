import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, LayoutGrid, List, FileText, FileSpreadsheet, FileIcon, Printer, Columns, Pencil, Trash2, Award } from 'lucide-react';

export default function ManageGrades() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('list');

  const grades = [
    { id: 1, name: 'A1', range: '91% → 95%', desc: '—' },
    { id: 2, name: 'A2', range: '81% → 90%', desc: '—' },
    { id: 3, name: 'B1', range: '71% → 80%', desc: '—' },
    { id: 4, name: 'B2', range: '61% → 70%', desc: '—' },
    { id: 5, name: 'C1', range: '51% → 60%', desc: '—' },
    { id: 6, name: 'C2', range: '41% → 50%', desc: '—' },
    { id: 7, name: 'D', range: '0% → 40%', desc: '—' },
  ];

  const handleAction = (action) => {
    alert(`${action} action triggered successfully!`);
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto space-y-6">
      
      <div className="flex justify-end">
        <button 
          onClick={() => navigate('/offline-exams/manage-grades/add')}
          className="flex items-center gap-2 px-4 py-2 bg-[#5e35b1] hover:bg-[#512da8] text-white font-bold rounded-none shadow-sm transition-colors cursor-pointer border-none"
        >
          <Plus className="w-4 h-4" /> Add New Grade
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-none shadow-sm overflow-hidden">
        
        <div className="px-4 py-3 border-b border-slate-200 flex justify-between items-center bg-white">
          <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Award className="w-4 h-4 text-[#5e35b1]" /> All Grades
          </h2>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setViewMode('list')} 
              className={`p-1.5 rounded-none cursor-pointer border ${viewMode === 'list' ? 'bg-[#5e35b1]/10 border-[#5e35b1] text-[#5e35b1]' : 'border-slate-300 text-slate-500 hover:bg-slate-50'}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('grid')} 
              className={`p-1.5 rounded-none cursor-pointer border ${viewMode === 'grid' ? 'bg-[#5e35b1]/10 border-[#5e35b1] text-[#5e35b1]' : 'border-slate-300 text-slate-500 hover:bg-slate-50'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-4 flex flex-wrap justify-between items-center gap-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <div className="flex items-center gap-2 border border-slate-300 rounded-none px-2 py-1 bg-white">
              <span className="text-xs text-slate-500">Show</span>
              <select className="text-xs outline-none bg-transparent">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
            </div>
            
            <button onClick={() => handleAction('Copy')} className="px-3 py-1 bg-white border border-slate-300 rounded-none text-xs text-slate-600 hover:bg-slate-50 cursor-pointer flex items-center gap-1"><FileIcon className="w-3 h-3" /> Copy</button>
            <button onClick={() => handleAction('CSV')} className="px-3 py-1 bg-white border border-slate-300 rounded-none text-xs text-slate-600 hover:bg-slate-50 cursor-pointer flex items-center gap-1"><FileText className="w-3 h-3" /> CSV</button>
            <button onClick={() => handleAction('Excel')} className="px-3 py-1 bg-white border border-slate-300 rounded-none text-xs text-slate-600 hover:bg-slate-50 cursor-pointer flex items-center gap-1"><FileSpreadsheet className="w-3 h-3" /> Excel</button>
            <button onClick={() => handleAction('PDF')} className="px-3 py-1 bg-white border border-slate-300 rounded-none text-xs text-slate-600 hover:bg-slate-50 cursor-pointer flex items-center gap-1"><FileIcon className="w-3 h-3" /> PDF</button>
            <button onClick={() => handleAction('Print')} className="px-3 py-1 bg-white border border-slate-300 rounded-none text-xs text-slate-600 hover:bg-slate-50 cursor-pointer flex items-center gap-1"><Printer className="w-3 h-3" /> Print</button>
            
            <button onClick={() => handleAction('Columns Toggle')} className="px-3 py-1 bg-white border border-slate-300 rounded-none text-xs text-slate-600 hover:bg-slate-50 cursor-pointer flex items-center gap-1"><Columns className="w-3 h-3" /> Columns</button>
          </div>
          
          <div className="w-full md:w-auto flex">
            <input 
              type="text" 
              placeholder="Search grades..." 
              className="w-full md:w-64 px-3 py-1.5 border border-slate-300 rounded-none text-sm focus:outline-none focus:border-[#5e35b1]"
            />
          </div>
        </div>

        {viewMode === 'list' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#5e35b1]/10 text-[#5e35b1] text-xs font-bold border-b border-slate-200 uppercase tracking-wider">
                  <th className="py-3 px-4 border-r border-slate-200 text-center w-12">#</th>
                  <th className="py-3 px-4 border-r border-slate-200">Grade Name</th>
                  <th className="py-3 px-4 border-r border-slate-200">Percentage Range</th>
                  <th className="py-3 px-4 border-r border-slate-200">Description</th>
                  <th className="py-3 px-4 text-center w-24">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {grades.map((grade, idx) => (
                  <tr key={grade.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 text-center border-r border-slate-200 text-slate-500">{idx + 1}</td>
                    <td className="py-3 px-4 border-r border-slate-200">
                      <span className="bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-none text-xs">{grade.name}</span>
                    </td>
                    <td className="py-3 px-4 border-r border-slate-200 font-medium text-slate-700">{grade.range}</td>
                    <td className="py-3 px-4 border-r border-slate-200 text-slate-500">{grade.desc}</td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center gap-3">
                        <button onClick={() => navigate('/offline-exams/manage-grades/edit')} className="text-slate-400 hover:text-[#5e35b1] transition-colors cursor-pointer bg-transparent border-none p-0">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => {if(window.confirm('Delete this grade?')) handleAction('Delete')}} className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer bg-transparent border-none p-0">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {grades.map((grade) => (
              <div key={grade.id} className="border border-slate-200 rounded-none p-4 shadow-sm hover:shadow-md transition-shadow relative">
                <div className="absolute top-2 right-2 flex gap-2">
                  <button onClick={() => navigate('/offline-exams/manage-grades/edit')} className="text-slate-400 hover:text-[#5e35b1] bg-transparent border-none cursor-pointer"><Pencil className="w-3 h-3" /></button>
                  <button onClick={() => {if(window.confirm('Delete this grade?')) handleAction('Delete')}} className="text-slate-400 hover:text-red-500 bg-transparent border-none cursor-pointer"><Trash2 className="w-3 h-3" /></button>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-none text-sm">{grade.name}</span>
                </div>
                <div className="text-sm font-bold text-slate-700">{grade.range}</div>
                <div className="text-xs text-slate-500 mt-1">{grade.desc}</div>
              </div>
            ))}
          </div>
        )}
        
        <div className="px-4 py-3 border-t border-slate-200 text-xs text-slate-500 bg-slate-50 flex justify-between items-center">
          Showing 1-{grades.length} of {grades.length}
          <div className="flex gap-1">
            <button className="w-6 h-6 flex items-center justify-center rounded-none border border-slate-200 bg-white text-slate-400 cursor-not-allowed">{'<'}</button>
            <button className="w-6 h-6 flex items-center justify-center rounded-none bg-[#5e35b1] text-white font-bold cursor-pointer border-none">1</button>
            <button className="w-6 h-6 flex items-center justify-center rounded-none border border-slate-200 bg-white text-slate-400 cursor-not-allowed">{'>'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
