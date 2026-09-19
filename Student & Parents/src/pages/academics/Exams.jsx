import React, { useEffect, useState } from 'react';
import { PackageOpen, FileText } from 'lucide-react';
import { academicService } from '../../api/academicService';
import { authService } from '../../api/authService';

export default function Exams() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = authService.getCurrentUser();

  useEffect(() => {
    if (user?._id) {
       academicService.getReportCard(user._id)
          .then(res => {
             if (res.success) setReports(res.data);
          })
          .catch(err => console.error(err))
          .finally(() => setLoading(false));
    } else {
       setLoading(false);
    }
  }, [user]);
  return (
    <div className="p-4 md:p-6 max-w-[1200px] mx-auto space-y-5">
      <h1 className="text-[22px] font-bold text-gray-800 flex items-center gap-2">
        Exams & Reports 
        <span className="text-gray-400 font-medium text-[20px] ml-1">| Rajesh Singh</span>
      </h1>

      <div className="bg-white rounded-[14px] border border-gray-200/80 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
        
        {reports.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-10 text-center">
            <div className="mb-5 text-gray-300 opacity-80">
               <PackageOpen className="w-24 h-24" strokeWidth={1} />
            </div>
            <h2 className="text-[20px] font-bold text-[#2d3748] mb-2.5 tracking-tight">No Exams Scheduled</h2>
            <p className="text-[14px] text-[#9ca3af] max-w-xl mx-auto leading-relaxed">
              There are currently no upcoming exams or published reports available for this student. Please check back later.
            </p>
          </div>
        ) : (
          <div className="w-full h-full p-6 print-container">
             <div className="flex items-center justify-between mb-4">
                <h2 className="text-[18px] font-bold text-[#2d3748]">Latest Published Results</h2>
                <button onClick={() => window.print()} className="flex items-center gap-2 bg-[#1dc9b7] hover:bg-[#19b1a1] text-white px-4 py-1.5 rounded-[4px] text-[13px] font-bold shadow-sm transition-colors no-print">
                   <FileText className="w-4 h-4" /> Download PDF
                </button>
             </div>
             <table className="w-full text-left border-collapse border border-gray-200">
                <thead className="bg-gray-50 border-b border-gray-200 text-sm font-bold text-gray-700">
                   <tr>
                      <th className="p-3 border-r border-gray-200">Exam Name</th>
                      <th className="p-3 border-r border-gray-200">Subject</th>
                      <th className="p-3 text-center">Marks Obtained</th>
                      <th className="p-3 text-center">Max Marks</th>
                      <th className="p-3 text-center">Grade</th>
                   </tr>
                </thead>
                <tbody>
                   {reports.map((r, i) => (
                      <tr key={i} className="border-b border-gray-200 text-sm text-gray-800">
                         <td className="p-3 border-r border-gray-200">{r.exam?.title || 'Main Exam'}</td>
                         <td className="p-3 border-r border-gray-200 font-bold">{r.subject?.subjectName || '-'}</td>
                         <td className="p-3 text-center text-blue-600 font-bold">{r.marksObtained}</td>
                         <td className="p-3 text-center">{r.maxMarks}</td>
                         <td className="p-3 text-center">
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">{r.grade || 'A'}</span>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
        )}

      </div>
    </div>
  );
}
