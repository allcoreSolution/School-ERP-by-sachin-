import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, Search, Upload, CheckCircle2, XCircle, Clock, Check, X } from 'lucide-react';
import { studentService } from '../../api/studentService';
import { academicService } from '../../api/academicService';

const StudentAttendance = () => {
  const navigate = useNavigate();
  const [hasSearched, setHasSearched] = useState(false);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    fetchClassesAndSections();
  }, []);

  const fetchClassesAndSections = async () => {
    try {
      const [classRes, secRes] = await Promise.all([
        academicService.getClasses(),
        academicService.getSections()
      ]);
      setClasses(classRes.data || []);
      setSections(secRes.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = async () => {
    if (!selectedClass) {
      alert("Please select a class");
      return;
    }
    try {
      setLoading(true);
      setHasSearched(true);
      const res = await studentService.getStudents({ classId: selectedClass, sectionId: selectedSection });
      const fetched = (res.data || res || []).map(s => ({
        id: s._id,
        admNo: s.admissionNo || s.admissionNumber || '-',
        name: `${s.firstName || ''} ${s.lastName || ''}`.trim(),
        status: ''
      }));
      setStudents(fetched);
    } catch (err) {
      console.error(err);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  const markAll = (status) => {
    setStudents(prev => prev.map(s => ({ ...s, status })));
  };

  const saveAttendance = () => {
    const records = students.map(s => ({ studentId: s.id, status: s.status || 'Present' }));
    console.log("Saving Attendance", { date: selectedDate, records });
    alert("Attendance marked successfully (simulated)");
  };

  return (
    <div className="p-6 h-full flex flex-col bg-gray-50 overflow-y-auto">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Student Attendance</h1>
        <p className="text-sm text-gray-500 mt-1">Mark daily attendance by Class & Section</p>
      </div>

      {/* Filter Card */}
      <div className="bg-white rounded-none shadow-sm border border-gray-200 mb-6">
        <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2 font-bold text-[14px] text-gray-800">
          <Filter className="w-4 h-4 text-[#5F52FF] fill-current" /> Mark Attendance
        </div>
        
        <div className="p-5 flex flex-col md:flex-row items-end gap-4">
          
          <div className="flex-1 w-full">
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Class *</label>
            <select 
              value={selectedClass} 
              onChange={e => setSelectedClass(e.target.value)} 
              className="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:outline-none focus:border-[#5F52FF]"
            >
              <option value="">-- Select Class --</option>
              {classes.map(c => (
                <option key={c._id} value={c._id}>{c.className || c.name}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1 w-full">
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Section</label>
            <select 
              value={selectedSection} 
              onChange={e => setSelectedSection(e.target.value)} 
              className="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:outline-none focus:border-[#5F52FF]"
            >
              <option value="">-- Select Section --</option>
              {sections.map(s => (
                <option key={s._id} value={s._id}>{s.sectionName || s.name}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1 w-full">
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Date</label>
            <input 
              type="date" 
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              className="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:outline-none focus:border-[#5F52FF]"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto mt-4 md:mt-0">
            <button 
              onClick={handleSearch}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#5F52FF] text-white px-5 py-2 rounded-none font-semibold text-sm hover:bg-[#4E41E6] transition-colors shadow-sm"
            >
              <Search className="w-4 h-4" /> Find Students
            </button>
            <button 
              onClick={() => navigate('/students/attendance/import')}
              className="flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-none font-semibold text-sm hover:bg-gray-50 transition-colors shadow-sm"
            >
              <Upload className="w-4 h-4" /> Import
            </button>
          </div>
        </div>
      </div>

      {/* Results View */}
      {hasSearched && (
        <div className="bg-white rounded-none shadow-sm border border-gray-200 flex-1 flex flex-col min-h-0 animate-in fade-in duration-300">
          
          <div className="px-5 py-3 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
            <div className="font-bold text-[14px] text-gray-800">
              Students List
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => markAll('Present')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 border border-green-200 rounded-none text-xs font-bold hover:bg-green-100 transition-colors"
              >
                <Check className="w-3.5 h-3.5" /> Mark All Present
              </button>
              <button 
                onClick={() => markAll('Absent')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-none text-xs font-bold hover:bg-red-100 transition-colors"
              >
                <X className="w-3.5 h-3.5" /> Mark All Absent
              </button>
            </div>
          </div>

          <div className="overflow-auto flex-1 p-5">
            {loading ? (
               <div className="flex justify-center p-8 text-gray-500 font-bold">Loading students...</div>
            ) : students.length === 0 ? (
               <div className="flex justify-center p-8 text-gray-500">No students found matching criteria.</div>
            ) : (
                <div className="space-y-4">
                  {students.map((student) => (
                    <div key={student.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-200 rounded-none hover:border-gray-300 transition-colors">
                      <div className="mb-4 md:mb-0">
                        <div className="font-bold text-gray-800">{student.name}</div>
                        <div className="text-xs text-gray-500 font-medium">Adm: {student.admNo}</div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleStatusChange(student.id, 'Present')} className={`flex items-center gap-1.5 px-4 py-2 rounded-none border text-sm font-semibold transition-colors ${student.status === 'Present' ? 'bg-green-600 border-green-600 text-white shadow-sm' : 'bg-white border-gray-300 text-gray-600 hover:bg-green-50 hover:border-green-300'}`}>
                          <CheckCircle2 className="w-4 h-4" /> Present
                        </button>
                        <button onClick={() => handleStatusChange(student.id, 'Absent')} className={`flex items-center gap-1.5 px-4 py-2 rounded-none border text-sm font-semibold transition-colors ${student.status === 'Absent' ? 'bg-red-600 border-red-600 text-white shadow-sm' : 'bg-white border-gray-300 text-gray-600 hover:bg-red-50 hover:border-red-300'}`}>
                          <XCircle className="w-4 h-4" /> Absent
                        </button>
                        <button onClick={() => handleStatusChange(student.id, 'Late')} className={`flex items-center gap-1.5 px-4 py-2 rounded-none border text-sm font-semibold transition-colors ${student.status === 'Late' ? 'bg-amber-500 border-amber-500 text-white shadow-sm' : 'bg-white border-gray-300 text-gray-600 hover:bg-amber-50 hover:border-amber-300'}`}>
                          <Clock className="w-4 h-4" /> Late
                        </button>
                        <button onClick={() => handleStatusChange(student.id, 'Half Day')} className={`flex items-center gap-1.5 px-4 py-2 rounded-none border text-sm font-semibold transition-colors ${student.status === 'Half Day' ? 'bg-blue-500 border-blue-500 text-white shadow-sm' : 'bg-white border-gray-300 text-gray-600 hover:bg-blue-50 hover:border-blue-300'}`}>
                          Half Day
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
            )}
            
            {!loading && students.length > 0 && (
              <div className="mt-6 flex justify-end">
                <button onClick={saveAttendance} className="bg-[#5F52FF] text-white px-6 py-2.5 rounded-none font-bold text-sm hover:bg-[#4E41E6] shadow-sm">
                  Save Attendance
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default StudentAttendance;
