import React, { useState } from 'react';

const mockStudents = [
  { id: 1, name: 'Aarav Sharma', roll: '101', marks: '' },
  { id: 2, name: 'Neha Gupta', roll: '102', marks: '' },
  { id: 3, name: 'Kabir Singh', roll: '103', marks: '' },
];

const EnterMarks = () => {
  const [formData, setFormData] = useState({
    exam: '', class: '', section: '', subject: '', show: 'full'
  });
  const [loaded, setLoaded] = useState(false);
  const [students, setStudents] = useState(mockStudents);

  const handleLoad = () => {
    if (formData.exam && formData.class) {
      setLoaded(true);
    } else {
      alert("Please select at least Exam and Class to load students.");
    }
  };

  const handleMarkChange = (id, val) => {
    setStudents(students.map(s => s.id === id ? { ...s, marks: val } : s));
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
                <option value="half-yearly">Half Yearly Examination</option>
                <option value="annual">Annual Examination</option>
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
                <option value="10">Class 10</option>
                <option value="9">Class 9</option>
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
                <option value="A">A</option>
                <option value="B">B</option>
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
                <option value="Maths">Mathematics</option>
                <option value="Science">Science</option>
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
              <h2 className="font-semibold text-[#5d78ff] text-sm uppercase tracking-wide">Enter Marks — {formData.subject || 'Subject'}</h2>
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
                  onClick={() => alert('Marks saved successfully!')}
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
