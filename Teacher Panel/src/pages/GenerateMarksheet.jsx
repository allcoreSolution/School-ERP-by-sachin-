import React, { useState, useEffect } from 'react';
import { Download, Monitor, CheckSquare } from 'lucide-react';
import { academicService } from '../api/academicService';
import { studentService } from '../api/studentService';
import { examService } from '../api/examService';

const GenerateMarksheet = () => {
  const [formData, setFormData] = useState({
    exam: '', class: '', section: '', show: 'full'
  });
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [exams, setExams] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchMetadata();
  }, []);

  const fetchMetadata = async () => {
    try {
      const cls = await academicService.getClasses();
      const sec = await academicService.getSections();
      const ex = await examService.getExams();
      if(cls.data) setClasses(cls.data);
      if(sec.data) setSections(sec.data);
      if(ex.data) setExams(ex.data);
    } catch(e) { console.error(e); }
  };

  const handleSearch = async () => {
    if (formData.exam && formData.class) {
      setLoading(true);
      try {
        const resp = await studentService.getStudents({ limit: 100 });
        if(resp.data) {
           const classStudents = resp.data.filter(s => s.classId?._id === formData.class || s.classId === formData.class);
           setStudents(classStudents.map(s => ({
             id: s._id,
             name: `${s.firstName||''} ${s.lastName||''}`.trim(),
             roll: s.aparId || s.enrollmentNumber || '-',
             status: 'Generated' // Assuming marks exist for mock demo. 
           })));
           setLoaded(true);
        }
      } catch(e) { console.error("Error fetching students", e); }
      setLoading(false);
    } else {
      alert("Please select an Exam and Class to search students.");
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#f4f7f6] theme-app-bg text-sm">
      {/* Page Header */}
      <div className="px-6 py-5">
        <h1 className="text-2xl font-semibold text-gray-800">Generate Marksheet</h1>
      </div>

      <div className="px-6 pb-6 mt-1">
        {/* Select Criteria Card */}
        <div className="bg-white rounded border border-gray-200 shadow-sm mb-6">
          <div className="px-5 py-3 border-b border-gray-100">
            <h2 className="font-semibold text-gray-700 text-base">Select Criteria</h2>
          </div>
          
          <div className="p-5 flex flex-wrap items-end gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-bold text-gray-800 mb-2">Exam</label>
              <select 
                value={formData.exam} 
                onChange={e => setFormData({...formData, exam: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
              >
                <option value="">Select Exam</option>
                {exams.map(ex => <option key={ex._id} value={ex._id}>{ex.examName}</option>)}
              </select>
            </div>
            
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-bold text-gray-800 mb-2">Class</label>
              <select 
                value={formData.class} 
                onChange={e => setFormData({...formData, class: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
              >
                <option value="">Select Class</option>
                {classes.map(c => <option key={c._id} value={c._id}>{c.className}</option>)}
              </select>
            </div>
            
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-bold text-gray-800 mb-2">Section</label>
              <select 
                value={formData.section} 
                onChange={e => setFormData({...formData, section: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
              >
                <option value="">-- Select Section --</option>
                {sections.map(s => <option key={s._id} value={s._id}>{s.sectionName}</option>)}
              </select>
            </div>
            
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-bold text-gray-800 mb-2">Show</label>
              <select 
                value={formData.show} 
                onChange={e => setFormData({...formData, show: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
              >
                <option value="full">Full register (incl. promoted)</option>
                <option value="active">Active Only</option>
              </select>
            </div>

            <div className="mt-4 lg:mt-0 xl:ml-2">
              <button 
                onClick={handleSearch} disabled={loading}
                className="bg-[#f06e33] hover:bg-[#de5e24] text-white font-medium px-6 py-2 rounded transition-colors shadow-sm w-full md:w-auto text-[15px]"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>
        </div>

        {/* Results Area after Search */}
        {loaded && (
          <div className="bg-white rounded border border-gray-200 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center bg-[#f8f9fe]">
              <h2 className="font-semibold text-gray-800">Generate Report Cards</h2>
              <div className="flex gap-2">
                 <button className="flex items-center gap-2 bg-[#5d78ff] hover:bg-[#4b65e6] text-white px-4 py-1.5 rounded text-xs font-medium cursor-pointer">
                    <Monitor className="w-4 h-4"/> Preview Web View
                 </button>
                 <button className="flex items-center gap-2 bg-[#1dc9b7] hover:bg-[#19b1a1] text-white px-4 py-1.5 rounded text-xs font-medium cursor-pointer">
                    <Download className="w-4 h-4"/> Download Bulk PDF
                 </button>
              </div>
            </div>
            
            <div className="overflow-x-auto p-0">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-5 py-3 w-10 text-center"><input type="checkbox" className="w-4 h-4 rounded text-blue-600" /></th>
                    <th className="px-5 py-3 text-xs font-bold text-gray-500 uppercase">Roll No</th>
                    <th className="px-5 py-3 text-xs font-bold text-gray-500 uppercase">Student Name</th>
                    <th className="px-5 py-3 text-xs font-bold text-gray-500 uppercase">Status</th>
                    <th className="px-5 py-3 text-xs font-bold text-gray-500 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} className="border-bottom border-gray-100 hover:bg-gray-50">
                      <td className="px-5 py-3 text-center"><input type="checkbox" className="w-4 h-4 rounded text-blue-600" /></td>
                      <td className="px-5 py-3 text-gray-800 font-medium">{student.roll}</td>
                      <td className="px-5 py-3 text-gray-700">{student.name}</td>
                      <td className="px-5 py-3">
                        <span className={`text-[11px] font-bold px-2 py-1 rounded inline-flex items-center gap-1 bg-green-100 text-green-700`}>
                          <CheckSquare className="w-3 h-3" />
                          {student.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <button className="text-gray-500 hover:text-gray-800 text-[13px] font-medium" onClick={() => alert('PDF downloading... (WIP)')}>
                          Download PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                  {students.length === 0 && (
                     <tr><td colSpan={5} className="py-8 text-center text-gray-500">No students found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateMarksheet;
