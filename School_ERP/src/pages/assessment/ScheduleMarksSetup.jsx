import React, { useState } from 'react';
import { HelpCircle, Search, Calendar, Clock, MapPin, Plus, X, Puzzle, Settings, AlertCircle } from 'lucide-react';

export default function ScheduleMarksSetup() {
  const [selectedExam, setSelectedExam] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const subjects = [
    'English',
    'Hindi',
    'Mathematics',
    'Environmental Studies',
    'Computer Science'
  ];

  const handleSelectExam = (e) => setSelectedExam(e.target.value);
  const handleSelectClass = (e) => setSelectedClass(e.target.value);

  const showTable = selectedExam && selectedClass;

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-10 p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <h1 className="text-xl font-bold text-slate-800">Exam Schedule & Marks Setup</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-3 py-1.5 bg-white border border-[#17a2b8] text-[#17a2b8] font-bold text-xs rounded-none shadow-sm hover:bg-[#e0f7fa] flex items-center gap-2 cursor-pointer transition-colors"
        >
          <HelpCircle className="w-4 h-4" /> How Setup Works
        </button>
      </div>

      <div className="bg-white border-t-2 border-t-[#17a2b8] border-x border-b border-slate-200 rounded-none shadow-sm">
        <div className="px-4 py-3 border-b border-slate-200 flex items-center gap-2">
          <Search className="w-4 h-4 text-[#17a2b8]" />
          <h2 className="text-sm font-bold text-[#17a2b8]">Select Exam & Class</h2>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-800">Exam <span className="text-red-500">*</span></label>
            <select 
              value={selectedExam} 
              onChange={handleSelectExam}
              className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#17a2b8] bg-white"
            >
              <option value="">-- Select Exam --</option>
              <option value="annual">Annual Examination</option>
              <option value="half-yearly">Half Yearly Examination</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-800">Class <span className="text-red-500">*</span></label>
            <select 
              value={selectedClass} 
              onChange={handleSelectClass}
              className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#17a2b8] bg-white"
            >
              <option value="">-- Select Class --</option>
              <option value="class-1">Class I</option>
              <option value="class-2">Class II</option>
              <option value="class-3">Class III</option>
            </select>
          </div>
        </div>
      </div>

      {showTable && (
        <div className="mt-6 bg-white border border-slate-200 rounded-none shadow-sm overflow-hidden">
          <div className="px-4 py-3 bg-[#17a2b8] flex items-center gap-2">
            <Settings className="w-4 h-4 text-white" />
            <h2 className="text-sm font-bold text-white">Setup configuration for Class III</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#17a2b8] text-white text-[11px] font-bold tracking-wider">
                  <th className="py-2.5 px-4 border-r border-[#138496] w-[20%]">Subject</th>
                  <th className="py-2.5 px-4 border-r border-[#138496] w-[35%]">Marks Distribution (Components)</th>
                  <th className="py-2.5 px-4 w-[45%]">Exam Date & Time Setup</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-700">
                {subjects.map((subject, idx) => (
                  <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-4 font-bold border-r border-slate-200 align-top">
                      {subject}
                    </td>
                    <td className="py-4 px-4 border-r border-slate-200 align-top">
                      <button className="px-3 py-1.5 border border-[#28a745] text-[#28a745] font-bold text-xs rounded-none hover:bg-[#d4edda] flex items-center gap-1 cursor-pointer transition-colors">
                        <Plus className="w-3.5 h-3.5" /> Add Mark Component
                      </button>
                    </td>
                    <td className="py-4 px-4 align-top">
                      <div className="space-y-3">
                        <div className="relative">
                          <input 
                            type="text" 
                            placeholder="dd-mm-yyyy" 
                            className="w-full pl-8 pr-3 py-1.5 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#17a2b8]" 
                          />
                          <Calendar className="w-4 h-4 text-slate-400 absolute left-2.5 top-2" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="relative">
                            <span className="absolute left-2.5 top-2 text-[10px] text-slate-400 font-bold">Start</span>
                            <input 
                              type="text" 
                              placeholder="--:--" 
                              className="w-full pl-10 pr-8 py-1.5 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#17a2b8]" 
                            />
                            <Clock className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5" />
                          </div>
                          <div className="relative">
                            <span className="absolute left-2.5 top-2 text-[10px] text-slate-400 font-bold">End</span>
                            <input 
                              type="text" 
                              placeholder="--:--" 
                              className="w-full pl-9 pr-8 py-1.5 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#17a2b8]" 
                            />
                            <Clock className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5" />
                          </div>
                        </div>
                        <div className="relative">
                          <input 
                            type="text" 
                            placeholder="Room No. (Optional)" 
                            className="w-full pl-8 pr-3 py-1.5 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#17a2b8] bg-slate-50" 
                          />
                          <MapPin className="w-4 h-4 text-slate-400 absolute left-2.5 top-2" />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: How Setup Works */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-[#f8f9fa] rounded-none shadow-xl w-full max-w-[800px] overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-4 py-3 bg-[#343a40] flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#17a2b8]" />
                <h2 className="text-lg font-bold">Understanding Exam Setup</h2>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer bg-transparent border-none">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <p className="text-sm text-slate-600 mb-6 leading-relaxed text-[15px]">
                This master interface serves a highly efficient dual-purpose role. It allows you to simultaneously configure <strong>WHEN</strong> an exam takes place, and exactly <strong>HOW</strong> its marks are structured for the report card.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white border border-slate-200 rounded-none p-5 shadow-sm">
                  <h3 className="text-[15px] font-bold text-[#007bff] flex items-center gap-2 mb-3 pb-2 border-b border-slate-100">
                    <Puzzle className="w-4 h-4" /> Marks Distribution (Components)
                  </h3>
                  <div className="text-xs text-slate-600 space-y-4">
                    <p>"Science" isn't strictly a single 100-mark paper anymore. It might actually consist of a Theory paper (Max 80) and a Practical lab (Max 20).</p>
                    <p>By clicking "<strong>+ Add Mark Component</strong>", you can split a single subject into as many distinct grading components as necessary. This determines exactly how columns render on the final Marksheet.</p>
                  </div>
                </div>
                
                <div className="bg-white border border-slate-200 rounded-none p-5 shadow-sm">
                  <h3 className="text-[15px] font-bold text-[#28a745] flex items-center gap-2 mb-3 pb-2 border-b border-slate-100">
                    <Calendar className="w-4 h-4" /> The Exam Schedule
                  </h3>
                  <div className="text-xs text-slate-600 space-y-4">
                    <p>While defining the Date, Start Time, and Room Number might feel strictly optional, filling them out unlocks massive platform advantages.</p>
                    <p>When dates are populated, the system can automatically generate beautiful <strong>Exam Admit Cards</strong> and publish dynamic <strong>Date Sheets</strong> directly to the parents' Mobile App!</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-slate-200 rounded-none p-5 shadow-sm">
                <h3 className="text-[15px] font-bold text-[#17a2b8] flex items-center gap-2 mb-3 pb-2 border-b border-slate-100">
                  <AlertCircle className="w-4 h-4" /> Missing a Component Name in the Dropdown?
                </h3>
                <div className="text-xs text-slate-600">
                  <p>The dropdown under Marks Distribution (Theory, Practical, Viva, etc.) pulls directly from the "<strong>Exam Types</strong>" database. If you require a completely new component (e.g., "Art Portfolio"), you must exit this screen and create it in the <strong>Exam Types</strong> menu first.</p>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-slate-200 bg-white flex justify-center">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 bg-[#6c757d] hover:bg-[#5a6268] text-white font-bold text-sm rounded-none shadow-sm transition-colors cursor-pointer border-none"
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
