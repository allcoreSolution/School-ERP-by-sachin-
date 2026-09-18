import React, { useState } from 'react';
import { Search } from 'lucide-react';

export default function CocurricularGrades() {
  const [showStudents, setShowStudents] = useState(false);

  const students = [
    { id: 1, name: 'Dhruv Agarwal', roll: '1', adm: 'YISADM-021' },
    { id: 2, name: 'Prisha Iyer', roll: '2', adm: 'YISADM-022' },
    { id: 3, name: 'Jay Mehta', roll: '3', adm: 'YISADM-023' },
    { id: 4, name: 'Riya Das', roll: '4', adm: 'YISADM-024' },
    { id: 5, name: 'Karan Shukla', roll: '5', adm: 'YISADM-025' },
    { id: 6, name: 'Saanvi Bhatt', roll: '6', adm: 'YISADM-026' },
    { id: 7, name: 'Laksh Chaudhary', roll: '7', adm: 'YISADM-027' },
  ];

  const areas = ['Activity', 'General Knowledge', 'Value Education', 'English'];

  return (
    <div className="min-h-screen bg-[#f4f6f9] font-sans pb-10">
      <div className="bg-white p-6 border-b border-slate-200">
        <h1 className="text-xl font-bold text-slate-800">Enter Cocurricular Grades</h1>
      </div>

      <div className="p-6 max-w-[1400px] mx-auto space-y-6">
        {/* Top Criteria Selection */}
        <div className="bg-white border border-slate-200 rounded-none shadow-sm">
          <div className="px-4 py-3 border-b border-slate-200">
            <h2 className="text-sm font-bold text-slate-800">Select Class & Section</h2>
          </div>
          <div className="p-4 flex flex-wrap items-end gap-4">
            <div className="flex-1 min-w-[150px] space-y-1">
              <label className="text-xs font-bold text-slate-800">Class</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 bg-white focus:outline-none focus:border-[#fd7e14]">
                <option>Select Class</option>
                <option>Class I</option>
                <option>Class II</option>
              </select>
            </div>
            <div className="flex-1 min-w-[150px] space-y-1">
              <label className="text-xs font-bold text-slate-800">Section</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 bg-white focus:outline-none focus:border-[#fd7e14]">
                <option>-- Select Class First --</option>
                <option>A</option>
                <option>B</option>
              </select>
            </div>
            <div className="flex-1 min-w-[150px] space-y-1">
              <label className="text-xs font-bold text-slate-800">Term (Exam)</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 bg-white focus:outline-none focus:border-[#fd7e14]">
                <option>-- Session Level (All Terms) --</option>
                <option>Term 1</option>
                <option>Term 2</option>
              </select>
            </div>
            <div className="flex-1 min-w-[150px] space-y-1">
              <label className="text-xs font-bold text-slate-800">Show</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 bg-white focus:outline-none focus:border-[#fd7e14]">
                <option>Full register (incl. promoted)</option>
                <option>Active Students only</option>
              </select>
            </div>
          </div>
          <div className="px-4 pb-4">
            <button 
              onClick={() => setShowStudents(true)}
              className="px-6 py-2 bg-[#fd7e14] hover:bg-[#e86e10] text-white font-bold text-sm rounded-none shadow-sm transition-colors cursor-pointer border-none flex items-center gap-2"
            >
              <Search className="w-4 h-4" /> Search Students
            </button>
          </div>
        </div>

        {/* Grades Entry Table */}
        {showStudents && (
          <div className="bg-white border border-slate-200 rounded-none shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-sm font-bold text-slate-800">Enter Grades for Section</h2>
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-[#17a2b8] text-white text-[11px] font-bold rounded">16 Students</span>
                  <span className="px-2 py-1 bg-[#28a745] text-white text-[11px] font-bold rounded">4 Areas</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  Quick Filter: 
                  <input type="text" className="border border-slate-300 rounded-none px-2 py-1 focus:outline-none focus:border-slate-400" />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead>
                  <tr className="bg-slate-50 text-slate-800 text-[12px] font-bold border-b border-slate-200">
                    <th className="py-3 px-3 text-center border-r border-slate-200 w-10">#</th>
                    <th className="py-3 px-3 border-r border-slate-200 w-16">Roll No</th>
                    <th className="py-3 px-3 border-r border-slate-200 w-28">Adm. No</th>
                    <th className="py-3 px-4 border-r border-slate-200 w-48">Student Name</th>
                    {areas.map((area, idx) => (
                      <th key={idx} className="py-3 px-4 text-center border-r border-slate-200 min-w-[180px]">
                        {area}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {students.map((student, idx) => (
                    <tr key={student.id} className="border-b border-slate-200 hover:bg-slate-50">
                      <td className="py-4 px-3 text-center border-r border-slate-200">{idx + 1}</td>
                      <td className="py-4 px-3 border-r border-slate-200">
                        <span className="bg-slate-500 text-white px-2 py-0.5 rounded-none text-xs font-bold">{student.roll}</span>
                      </td>
                      <td className="py-4 px-3 border-r border-slate-200">
                        <span className="text-[#dc3545] text-xs font-bold">{student.adm}</span>
                      </td>
                      <td className="py-4 px-4 border-r border-slate-200 font-bold text-slate-800">
                        {student.name}
                      </td>
                      {areas.map((area, areaIdx) => (
                        <td key={areaIdx} className="py-2 px-4 border-r border-slate-200">
                          <div className="flex flex-col gap-1.5">
                            <input 
                              type="text" 
                              placeholder="Grade (A+, B...)" 
                              className="w-full px-2 py-1.5 border border-slate-300 rounded-none text-xs text-slate-700 focus:outline-none focus:border-[#fd7e14]"
                            />
                            <input 
                              type="text" 
                              placeholder="Remarks..." 
                              className="w-full px-2 py-1.5 border border-slate-300 rounded-none text-xs text-slate-700 focus:outline-none focus:border-[#fd7e14]"
                            />
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
