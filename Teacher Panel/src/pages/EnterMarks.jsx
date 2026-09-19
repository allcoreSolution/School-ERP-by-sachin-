import React, { useState, useEffect } from 'react';
import { studentService } from '../api/studentService';
import { examService } from '../api/examService';
import { academicService } from '../api/academicService';

const EnterMarks = () => {
  const [formData, setFormData] = useState({
    exam: '', class: '', section: '', subject: '', show: 'full'
  });
  const [loaded, setLoaded] = useState(false);
  const [students, setStudents] = useState([]);
  const [exams, setExams] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchMetadata();
  }, []);

  const fetchMetadata = async () => {
    try {
      const cls = await academicService.getClasses();
      const sec = await academicService.getSections();
      const sub = await academicService.getSubjects();
      const ex = await examService.getExams();
      if(cls.data) setClasses(cls.data);
      if(sec.data) setSections(sec.data);
      if(sub.data) setSubjects(sub.data);
      if(ex.data) setExams(ex.data);
    } catch(e) { console.error(e); }
  };

  const handleLoad = async () => {
    if (formData.exam && formData.class && formData.subject) {
      try {
        const resp = await studentService.getStudents({ limit: 100 });
        if(resp.data) {
           const classStudents = resp.data.filter(s => s.classId?._id === formData.class || s.classId === formData.class);
           setStudents(classStudents.map(s => ({
             id: s._id,
             name: `${s.firstName||''} ${s.lastName||''}`.trim(),
             roll: s.aparId || '-',
             marks: ''
           })));
           setLoaded(true);
        }
      } catch(e) { console.error("Error loading students"); }
    } else {
      alert("Please select at least Exam, Class, and Subject.");
    }
  };

  const handleMarkChange = (id, val) => {
    setStudents(students.map(s => s.id === id ? { ...s, marks: val } : s));
  };

  const handleSaveMarks = async () => {
     try {
       const payload = students.filter(s => s.marks !== '').map(s => ({
         exam: formData.exam,
         student: s.id,
         subject: formData.subject,
         marksObtained: Number(s.marks),
         maxMarks: 100,
         remarks: ''
       }));
       if(payload.length === 0) return alert("No marks entered.");
       
       const res = await examService.addResult(payload);
       if(res.success) {
         alert("Marks saved successfully!");
         setLoaded(false);
       }
     } catch (e) {
       console.error(e);
       alert("Error saving marks");
     }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#f4f7f6] theme-app-bg text-sm">
      {/* Page Header (No background from image) */}
      <div className="px-6 py-5">
        <h1 className="text-2xl font-semibold text-gray-800">Enter Exam Marks</h1>
      </div>

      <div className="px-6 pb-6 mt-1">
        {/* Select Criteria Card */}
        <div className="bg-white rounded border border-gray-200 shadow-sm">
          <div className="px-5 py-3 border-b border-gray-100">
            <h2 className="font-semibold text-gray-700 text-base">Select Criteria</h2>
          </div>
          
          <div className="p-5 flex flex-wrap items-end gap-4">
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-bold text-gray-800 mb-2">Exam</label>
              <select 
                value={formData.exam} 
                onChange={e => setFormData({...formData, exam: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
              >
                <option value="">Select Exam</option>
                {exams.map(e => <option key={e._id} value={e._id}>{e.examName}</option>)}
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
            
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-bold text-gray-800 mb-2">Subject</label>
              <select 
                value={formData.subject} 
                onChange={e => setFormData({...formData, subject: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
              >
                <option value="">-- Select Subject --</option>
                {subjects.map(sub => <option key={sub._id} value={sub._id}>{sub.subjectName}</option>)}
              </select>
            </div>

            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-bold text-gray-800 mb-2">Show</label>
              <select 
                value={formData.show} 
                onChange={e => setFormData({...formData, show: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
              >
                <option value="full">Full register (incl. absentees)</option>
                <option value="present">Present only</option>
              </select>
            </div>

            <div className="mt-4 lg:mt-0 lg:ml-2">
              <button 
                onClick={handleLoad} 
                className="bg-[#f06e33] hover:bg-[#de5e24] text-white font-medium px-5 py-2 rounded transition-colors shadow-sm w-full md:w-auto"
              >
                Load Students
              </button>
            </div>
          </div>
        </div>

        {/* Working Area: Student List after clicking Load Students */}
        {loaded && (
          <div className="bg-white rounded border border-gray-200 shadow-sm mt-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="px-5 py-3 border-b border-gray-100 flex justify-between items-center bg-[#f8f9fe]">
              <h2 className="font-semibold text-[#5d78ff] text-sm uppercase tracking-wide">Enter Marks</h2>
            </div>
            
            <div className="overflow-x-auto p-0">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-5 py-3 text-xs font-bold text-gray-500 uppercase">Roll Number</th>
                    <th className="px-5 py-3 text-xs font-bold text-gray-500 uppercase">Student Name</th>
                    <th className="px-5 py-3 text-xs font-bold text-gray-500 uppercase w-48">Marks Obtained</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} className="border-bottom border-gray-100 hover:bg-gray-50">
                      <td className="px-5 py-3 text-gray-800 font-medium">{student.roll}</td>
                      <td className="px-5 py-3 text-gray-700">{student.name}</td>
                      <td className="px-5 py-2">
                        <input 
                          type="number"
                          value={student.marks}
                          onChange={(e) => handleMarkChange(student.id, e.target.value)}
                          className="w-full border border-gray-300 rounded px-3 py-1.5 focus:border-blue-500 focus:outline-none"
                          placeholder="e.g. 85"
                        />
                      </td>
                    </tr>
                  ))}
                  {students.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-5 py-8 text-center text-gray-500">No students found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {students.length > 0 && (
              <div className="px-5 py-4 border-t border-gray-200 bg-gray-50 flex justify-end">
                <button 
                  onClick={handleSaveMarks}
                  className="bg-[#5d78ff] hover:bg-[#4b65e6] text-white font-medium px-6 py-2 rounded transition-colors shadow-sm"
                >
                  Save Marks
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default EnterMarks;
