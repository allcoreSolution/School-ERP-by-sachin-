import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { academicService } from '../../api/academicService';
import { studentService } from '../../api/studentService';

export default function GenerateMarksheet() {
  const navigate = useNavigate();
  const [showStudents, setShowStudents] = useState(false);
  const [archiveTrace, setArchiveTrace] = useState(false);
  const [loading, setLoading] = useState(false);

  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [students, setStudents] = useState([]);

  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  
  useEffect(() => {
    academicService.getClasses().then(res => setClasses(res.data || [])).catch(console.error);
    academicService.getSections().then(res => setSections(res.data || [])).catch(console.error);
  }, []);

  const handleSearch = async () => {
    if(!selectedClass || !selectedSection) {
       alert("Please select class and section tools!");
       return;
    }
    setShowStudents(true);
    setLoading(true);
    try {
      const res = await studentService.getStudents({ class: selectedClass, section: selectedSection });
      setStudents(res.data || []);
    } catch(err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-10">
      <div className="bg-white p-6 border-b border-slate-200">
        <h1 className="text-xl font-bold text-slate-800">Generate Marksheet</h1>
      </div>

      <div className="p-6 max-w-[1400px] mx-auto space-y-6">
        
        {/* Select Criteria Box */}
        <div className="bg-white border border-slate-200 rounded-none shadow-sm">
          <div className="px-4 py-3 border-b border-slate-200">
            <h2 className="text-sm font-bold text-slate-700">Select Criteria</h2>
          </div>
          <div className="p-4 flex flex-wrap items-end gap-4">
            <div className="flex-1 min-w-[200px] space-y-1">
              <label className="text-xs font-bold text-slate-800">Report Card Type</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#007bff] bg-white">
                <option value="">Select Report Card Type</option>
                <option value="1">Multi Term Exam</option>
                <option value="2">Single Chart Graphical</option>
              </select>
            </div>
            <div className="flex-1 min-w-[150px] space-y-1">
              <label className="text-xs font-bold text-slate-800">Class</label>
              <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#007bff] bg-white">
                <option value="">Select Class</option>
                {classes.map(c => <option key={c._id} value={c._id}>{c.className}</option>)}
              </select>
            </div>
            <div className="flex-1 min-w-[150px] space-y-1">
              <label className="text-xs font-bold text-slate-800">Section</label>
              <select value={selectedSection} onChange={e => setSelectedSection(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#007bff] bg-white">
                <option value="">-- Select Section --</option>
                {sections.map(s => <option key={s._id} value={s._id}>{s.name || s.sectionName}</option>)}
              </select>
            </div>
            <div className="flex-1 min-w-[200px] space-y-1">
              <label className="text-xs font-bold text-slate-800">Show</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#007bff] bg-white">
                <option value="full">Full register (incl. promoted)</option>
                <option value="active">Active students only</option>
              </select>
            </div>
            <div className="shrink-0">
              <button 
                onClick={handleSearch}
                disabled={loading}
                className="px-6 py-2 bg-[#fd7e14] hover:bg-[#e86e10] text-white font-bold text-sm rounded-none shadow-sm transition-colors cursor-pointer border-none h-[38px]"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>
        </div>

        {/* Student List Box */}
        {showStudents && (
          <div className="bg-white border border-slate-200 rounded-none shadow-sm overflow-hidden animate-in fade-in duration-300">
            <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200">
              <h2 className="text-sm font-bold text-slate-800">Student List</h2>
              
              {/* Archive Trace Toggle */}
              <div className="flex items-start gap-3">
                <div 
                  className={`w-10 h-5 rounded-none relative cursor-pointer mt-0.5 transition-colors ${archiveTrace ? 'bg-[#28a745]' : 'bg-slate-300'}`}
                  onClick={() => setArchiveTrace(!archiveTrace)}
                >
                  <div className={`absolute w-4 h-4 bg-white rounded-none top-0.5 transition-transform ${archiveTrace ? 'translate-x-5' : 'translate-x-1'}`}></div>
                </div>
                <div>
                  <div className="text-sm font-bold text-[#28a745] flex items-center gap-1">
                    <span className="text-sm">🗃️</span> Archive Report Card to System (HTML Trace)
                  </div>
                  <div className="text-[10px] text-slate-500">When on, generating a report card saves a digital replica — viewable & printable from Student 360.</div>
                </div>
              </div>
            </div>

            <div className="p-4 flex flex-wrap justify-between items-center gap-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Show</span>
                <select className="border border-slate-300 rounded-none px-2 py-1 text-xs outline-none bg-white">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
                <span className="text-xs text-slate-500">entries</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Search:</span>
                <input 
                  type="text" 
                  className="px-2 py-1 border border-slate-300 rounded-none text-sm focus:outline-none focus:border-[#007bff]"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#17a2b8] text-white text-xs font-bold border-b border-slate-200">
                    <th className="py-3 px-4 border-r border-[#138496] cursor-pointer hover:bg-[#138496] transition-colors w-24">
                      <div className="flex justify-between items-center">Roll No <span>↑↓</span></div>
                    </th>
                    <th className="py-3 px-4 border-r border-[#138496] cursor-pointer hover:bg-[#138496] transition-colors w-40">
                      <div className="flex justify-between items-center">Admission No <span>↑↓</span></div>
                    </th>
                    <th className="py-3 px-4 border-r border-[#138496] cursor-pointer hover:bg-[#138496] transition-colors">
                      <div className="flex justify-between items-center">Student Name <span>↑↓</span></div>
                    </th>
                    <th className="py-3 px-4 text-center cursor-pointer hover:bg-[#138496] transition-colors w-48">
                      <div className="flex justify-between items-center">Action <span>↑↓</span></div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {students.length === 0 && (
                    <tr><td colSpan="4" className="py-8 text-center text-slate-500 font-semibold">No students found.</td></tr>
                  )}
                  {students.map((student) => (
                    <tr key={student._id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                      <td className="py-2.5 px-4 text-slate-700 border-r border-slate-200">{student.rollNumber || '--'}</td>
                      <td className="py-2.5 px-4 text-slate-700 border-r border-slate-200">{student.admissionNo || '--'}</td>
                      <td className="py-2.5 px-4 font-bold text-slate-700 border-r border-slate-200">{student.firstName} {student.lastName}</td>
                      <td className="py-2.5 px-4 text-center">
                        <button 
                          onClick={() => navigate(`/offline-exams/report-card-view?studentId=${student._id}`)}
                          className="px-4 py-1.5 bg-[#28a745] hover:bg-[#218838] text-white font-bold text-xs rounded-none transition-colors cursor-pointer border-none shadow-sm"
                        >
                          Generate Report Card
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="px-4 py-3 border-t border-slate-200 text-xs text-slate-500 bg-slate-50 flex justify-between items-center">
              Showing 1 to {students.length} of {students.length} entries
              <div className="flex gap-1">
                <button className="px-3 py-1 border border-slate-300 rounded-l bg-slate-100 text-slate-500 cursor-not-allowed">Previous</button>
                <button className="px-3 py-1 border-t border-b border-slate-300 bg-[#007bff] text-white font-bold">1</button>
                <button className="px-3 py-1 border border-slate-300 rounded-r bg-slate-100 text-slate-500 cursor-not-allowed">Next</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
