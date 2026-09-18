import React, { useState } from 'react';
import { PenTool, Download, Upload, Lock, Send, Search, ArrowDownToLine, ArrowUpToLine, FileSpreadsheet } from 'lucide-react';

export default function EnterMarks() {
  const [showStudents, setShowStudents] = useState(false);

  const students = [
    { id: 1, name: 'Dhruv Agarwal', roll: '1', adm: 'YISADM-021', marks: '' },
    { id: 2, name: 'Prisha Iyer', roll: '2', adm: 'YISADM-022', marks: '' },
    { id: 3, name: 'Jay Mehta', roll: '3', adm: 'YISADM-023', marks: '' },
    { id: 4, name: 'Riya Das', roll: '4', adm: 'YISADM-024', marks: '' },
    { id: 5, name: 'Karan Shukla', roll: '5', adm: 'YISADM-025', marks: '' },
    { id: 6, name: 'Saanvi Bhatt', roll: '6', adm: 'YISADM-026', marks: '' },
    { id: 7, name: 'Laksh Chaudhary', roll: '7', adm: 'YISADM-027', marks: '' },
  ];

  const handleAction = (actionName) => {
    alert(`${actionName} functionality triggered!`);
  };

  const handleDownloadTemplate = () => {
    handleAction('Download Template (CSV/Excel)');
  };

  const handleExportMarks = () => {
    handleAction('Export Marks (Excel)');
  };

  const handleImportMarks = () => {
    handleAction('Import Marks (File Picker)');
  };

  return (
    <div className="min-h-screen bg-[#f4f6f9] font-sans pb-10">
      <div className="bg-white p-6 border-b border-slate-200">
        <h1 className="text-xl font-bold text-slate-800">Enter Exam Marks</h1>
      </div>

      <div className="p-6 max-w-[1400px] mx-auto space-y-6">
        {/* Top Criteria Selection */}
        <div className="bg-white border border-slate-200 rounded-none shadow-sm">
          <div className="px-4 py-3 border-b border-slate-200">
            <h2 className="text-sm font-bold text-slate-800">Select Criteria</h2>
          </div>
          <div className="p-4 flex flex-wrap items-end gap-4">
            <div className="flex-1 min-w-[150px] space-y-1">
              <label className="text-xs font-bold text-slate-800">Exam</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 bg-white focus:outline-none focus:border-orange-500">
                <option>Select Exam</option>
                <option>Annual</option>
                <option>Half Yearly</option>
              </select>
            </div>
            <div className="flex-1 min-w-[150px] space-y-1">
              <label className="text-xs font-bold text-slate-800">Class</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 bg-white focus:outline-none focus:border-orange-500">
                <option>Select Class</option>
                <option>Class I</option>
                <option>Class II</option>
              </select>
            </div>
            <div className="flex-1 min-w-[150px] space-y-1">
              <label className="text-xs font-bold text-slate-800">Section</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 bg-white focus:outline-none focus:border-orange-500">
                <option>-- Select Section --</option>
                <option>A</option>
                <option>B</option>
              </select>
            </div>
            <div className="flex-1 min-w-[150px] space-y-1">
              <label className="text-xs font-bold text-slate-800">Subject</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 bg-white focus:outline-none focus:border-orange-500">
                <option>-- Select Subject --</option>
                <option>English</option>
                <option>Hindi</option>
              </select>
            </div>
            <div className="flex-1 min-w-[150px] space-y-1">
              <label className="text-xs font-bold text-slate-800">Show</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 bg-white focus:outline-none focus:border-orange-500">
                <option>Full register (incl. promote...</option>
                <option>Active Students only</option>
              </select>
            </div>
            <div className="min-w-[120px]">
              <button 
                onClick={() => setShowStudents(true)}
                className="w-full px-4 py-2 bg-[#f47f24] hover:bg-[#d96a1a] text-white font-bold text-sm rounded-none shadow-sm transition-colors cursor-pointer border-none"
              >
                Load Students
              </button>
            </div>
          </div>
        </div>

        {/* Marks Entry Table */}
        {showStudents && (
          <div className="bg-white border border-slate-200 rounded-none shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <PenTool className="w-4 h-4" />
                <span>Marks are <strong>open</strong> for entry.</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleAction('Submit for Review')}
                  className="px-4 py-1.5 bg-[#ffc107] hover:bg-[#e0a800] text-slate-800 font-bold text-xs rounded-none flex items-center gap-2 cursor-pointer transition-colors border-none"
                >
                  <Send className="w-3.5 h-3.5" /> Submit for Review
                </button>
                <button 
                  onClick={() => handleAction('Finalise & Lock')}
                  className="px-4 py-1.5 bg-[#dc3545] hover:bg-[#c82333] text-white font-bold text-xs rounded-none flex items-center gap-2 cursor-pointer transition-colors border-none"
                >
                  <Lock className="w-3.5 h-3.5" /> Finalise & Lock
                </button>
              </div>
            </div>

            <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50">
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleDownloadTemplate}
                  className="px-3 py-1.5 bg-[#28a745] hover:bg-[#218838] text-white font-bold text-xs rounded-none flex items-center gap-2 cursor-pointer transition-colors border-none"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" /> Download Template
                </button>
                <button 
                  onClick={handleExportMarks}
                  className="px-3 py-1.5 bg-[#17a2b8] hover:bg-[#138496] text-white font-bold text-xs rounded-none flex items-center gap-2 cursor-pointer transition-colors border-none"
                >
                  <ArrowDownToLine className="w-3.5 h-3.5" /> Export Marks
                </button>
                <button 
                  onClick={handleImportMarks}
                  className="px-3 py-1.5 bg-[#fd7e14] hover:bg-[#e86e10] text-white font-bold text-xs rounded-none flex items-center gap-2 cursor-pointer transition-colors border-none"
                >
                  <ArrowUpToLine className="w-3.5 h-3.5" /> Import Marks
                </button>
              </div>
            </div>

            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="text-xs text-slate-500 flex items-center gap-2">
                  Show 
                  <select className="border border-slate-300 rounded-none px-2 py-1 bg-white focus:outline-none">
                    <option>50</option>
                    <option>100</option>
                  </select> 
                  entries
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  Search: 
                  <input type="text" className="border border-slate-300 rounded-none px-2 py-1 focus:outline-none focus:border-slate-400" />
                </div>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-800 text-sm font-bold border-b border-slate-200">
                      <th className="py-3 px-4 w-[60%] flex items-center justify-between">
                        Student Name
                        <span className="text-slate-300 text-[10px]">↑↓</span>
                      </th>
                      <th className="py-3 px-4 border-l border-slate-200 text-center w-[40%]">
                        Marks
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {students.map((student, idx) => (
                      <tr key={student.id} className={`border-b border-slate-200 hover:bg-slate-50 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-800">{student.name}</div>
                          <div className="text-xs text-slate-500 mt-1">Roll: {student.roll} | Adm: {student.adm}</div>
                        </td>
                        <td className="py-3 px-4 border-l border-slate-200 text-center">
                          <input 
                            type="number" 
                            className="w-20 px-2 py-1 border border-slate-300 rounded-none text-center text-sm focus:outline-none focus:border-indigo-500" 
                            placeholder="---"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
