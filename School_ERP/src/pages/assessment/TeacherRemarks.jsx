import React, { useState } from 'react';
import { HelpCircle, Search, MessageSquare, Save, X, Calendar, User, Info, FileText } from 'lucide-react';

export default function TeacherRemarks() {
  const [showModal, setShowModal] = useState(false);
  const [showStudents, setShowStudents] = useState(false);

  const students = [
    { id: 1, name: 'Aarav Sharma', roll: '101', teacher: 'Very attentive.', principal: '' },
    { id: 2, name: 'Diya Patel', roll: '102', teacher: '', principal: 'Excellent progress.' },
    { id: 3, name: 'Rohan Gupta', roll: '103', teacher: 'Needs to focus more on Math.', principal: '' },
  ];

  const handleSearch = () => {
    setShowStudents(true);
  };

  const handleSave = () => {
    alert('Remarks saved successfully!');
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-10">
      
      {/* Header */}
      <div className="bg-white p-6 border-b border-slate-200 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <h1 className="text-2xl font-bold text-[#2d3748]">Enter Report Card Remarks</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-[#17a2b8] text-[#17a2b8] hover:bg-[#17a2b8]/5 font-bold text-sm rounded-none shadow-sm transition-colors cursor-pointer"
        >
          <HelpCircle className="w-4 h-4" /> How Remarks Work
        </button>
      </div>

      <div className="p-6 max-w-[1200px] mx-auto space-y-6">
        
        {/* Search Criteria Box */}
        <div className="bg-white border border-[#17a2b8] rounded-none shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200 flex items-center gap-2 text-[#17a2b8] bg-[#f8fbfe]">
            <Search className="w-4 h-4" />
            <h2 className="text-sm font-bold">Select Class & Section</h2>
          </div>
          
          <div className="p-5 flex flex-wrap items-end gap-5">
            <div className="flex-1 min-w-[200px] space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Class <span className="text-red-500">*</span></label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#17a2b8] bg-white">
                <option value="">Select Class</option>
                <option value="6">Class 6th</option>
                <option value="7">Class 7th</option>
              </select>
            </div>
            <div className="flex-1 min-w-[200px] space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Section <span className="text-red-500">*</span></label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#17a2b8] bg-white">
                <option value="">-- Select Class First --</option>
                <option value="A">A</option>
                <option value="B">B</option>
              </select>
            </div>
            <div className="flex-1 min-w-[250px] space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Term (Exam)</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#17a2b8] bg-white">
                <option value="">-- Session Level (Final / All Terms) --</option>
                <option value="1">Term 1</option>
                <option value="2">Term 2</option>
              </select>
            </div>
            <div className="flex-1 min-w-[250px] space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Show</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#17a2b8] bg-white">
                <option value="full">Full register (incl. promoted)</option>
                <option value="active">Active only</option>
              </select>
            </div>
            <div className="shrink-0 w-full md:w-auto mt-2 md:mt-0">
              <button 
                onClick={handleSearch}
                className="w-full md:w-auto px-6 py-2.5 bg-[#17a2b8] hover:bg-[#138496] text-white font-bold text-sm rounded-none shadow-sm transition-colors cursor-pointer border-none flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" /> Search Students
              </button>
            </div>
          </div>
        </div>

        {/* Student List & Remarks Form */}
        {showStudents && (
          <div className="bg-white border border-slate-200 rounded-none shadow-sm overflow-hidden animate-in fade-in duration-300">
            <div className="px-5 py-4 border-b border-slate-200 flex justify-between items-center bg-[#f8f9fa]">
              <h2 className="text-sm font-bold text-[#2d3748] flex items-center gap-2">
                <User className="w-4 h-4 text-[#17a2b8]" /> Enter Remarks for 3 Students
              </h2>
              <button onClick={handleSave} className="px-4 py-1.5 bg-[#28a745] hover:bg-[#218838] text-white font-bold text-xs rounded-none shadow-sm flex items-center gap-2 transition-colors cursor-pointer border-none">
                <Save className="w-4 h-4" /> Save All Remarks
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 text-[11px] font-bold uppercase border-b border-slate-200">
                    <th className="py-3 px-4 border-r border-slate-200 w-20 text-center">Roll No</th>
                    <th className="py-3 px-4 border-r border-slate-200 w-48">Student Name</th>
                    <th className="py-3 px-4 border-r border-slate-200">
                      <div className="flex items-center gap-2">
                        Class Teacher Remark
                        <span className="text-slate-400 font-normal lowercase">(For daily behavioral & academic)</span>
                      </div>
                    </th>
                    <th className="py-3 px-4">
                       <div className="flex items-center gap-2">
                        Principal Remark
                        <span className="text-slate-400 font-normal lowercase">(High-level endorsement)</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {students.map((student) => (
                    <tr key={student.id} className="border-b border-slate-200 hover:bg-slate-50">
                      <td className="py-3 px-4 text-center border-r border-slate-200 font-medium text-slate-500">{student.roll}</td>
                      <td className="py-3 px-4 border-r border-slate-200 font-bold text-slate-800">{student.name}</td>
                      <td className="py-3 px-4 border-r border-slate-200">
                        <textarea 
                          rows="2" 
                          placeholder="Leave blank to skip..."
                          defaultValue={student.teacher}
                          className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#17a2b8] resize-none"
                        ></textarea>
                      </td>
                      <td className="py-3 px-4">
                        <textarea 
                          rows="2" 
                          placeholder="Leave blank to skip..."
                          defaultValue={student.principal}
                          className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#17a2b8] resize-none"
                        ></textarea>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="px-5 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button onClick={handleSave} className="px-6 py-2 bg-[#28a745] hover:bg-[#218838] text-white font-bold text-sm rounded-none shadow-sm flex items-center gap-2 transition-colors cursor-pointer border-none">
                <Save className="w-4 h-4" /> Save All Remarks
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4">
          <div className="bg-[#f4f6f8] rounded-none shadow-2xl w-full max-w-3xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
            
            <div className="bg-[#343a40] px-6 py-4 flex justify-between items-center shrink-0">
              <h2 className="text-white font-bold flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#17a2b8]" /> Understanding Report Card Remarks
              </h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white bg-transparent border-none cursor-pointer">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6">
              <p className="text-[15px] text-slate-600 font-light">
                Remarks are the personalized, qualitative feedback printed at the bottom of a student's final physical marksheet.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="bg-white border border-slate-200 rounded-none p-5 shadow-sm">
                  <h3 className="font-bold text-[#007bff] flex items-center gap-2 mb-2 border-b border-slate-100 pb-2">
                    <User className="w-5 h-5" /> Dual-Layer Feedback
                  </h3>
                  <p className="text-xs text-slate-600 mb-4 pt-2">
                    The system supports two distinct remark layers dynamically printed on the PDFs:
                  </p>
                  <ul className="text-xs text-slate-700 space-y-2">
                    <li><strong>1. Class Teacher:</strong> For daily behavioral & academic observations.</li>
                    <li><strong>2. Principal:</strong> For high-level, official school endorsements.</li>
                  </ul>
                </div>

                <div className="bg-white border border-slate-200 rounded-none p-5 shadow-sm">
                  <h3 className="font-bold text-[#17a2b8] flex items-center gap-2 mb-2 border-b border-slate-100 pb-2">
                    <Calendar className="w-5 h-5" /> Term vs. Session Level
                  </h3>
                  <ul className="text-xs text-slate-700 space-y-3 pt-2 list-disc pl-4">
                    <li><strong>Term Level:</strong> If you select a specific Term (e.g., "Term 1"), these remarks will <em>only</em> print on the Term 1 specific report card.</li>
                    <li><strong>Session Level:</strong> If you leave the Exam dropdown blank, it applies to the "Session Level". This means the remark will print on massive, consolidated Year-End summary report cards.</li>
                  </ul>
                </div>

              </div>

              <div className="bg-white border border-yellow-200 rounded-none p-5 shadow-sm">
                <h3 className="font-bold text-[#e6a23c] flex items-center gap-2 mb-2 border-b border-yellow-100 pb-2">
                  <Info className="w-5 h-5" /> Do I have to fill all of them?
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed pt-2">
                  <strong>Absolutely not!</strong> You do not need to fill out remarks for every single student. If you leave a row blank, the system simply will not print a remarks section on that specific student's report card. It handles empty data elegantly.
                </p>
              </div>

            </div>

            <div className="bg-white border-t border-slate-200 px-6 py-4 flex justify-center shrink-0">
              <button 
                onClick={() => setShowModal(false)}
                className="px-8 py-2.5 bg-[#6c757d] hover:bg-[#5a6268] text-white font-bold text-sm rounded-none shadow-sm transition-colors cursor-pointer border-none"
              >
                I Understand
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
