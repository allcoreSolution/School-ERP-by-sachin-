import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Printer, Download } from 'lucide-react';

export default function ReportCardView() {
  const [searchParams] = useSearchParams();
  const studentName = searchParams.get('student') || 'Jay';

  const marks = [
    { subject: 'Telugu', fa8: 12, sa: 17, annual: 33, total: 62, grade: 'B2', color: '#3498db' },
    { subject: 'Hindi', fa8: 10, sa: 18, annual: 36, total: 64, grade: 'B2', color: '#9b59b6' },
    { subject: 'English', fa8: 12, sa: 10, annual: 34, total: 56, grade: 'C1', color: '#e67e22' },
    { subject: 'Maths', fa8: 10, sa: 16, annual: 30, total: 56, grade: 'C1', color: '#f1c40f' },
    { subject: 'Science', fa8: 15, sa: 12, annual: 42, total: 69, grade: 'B2', color: '#2ecc71' },
    { subject: 'Social', fa8: 11, sa: 10, annual: 18, total: 39, grade: 'D', color: '#e74c3c' },
  ];

  const grandTotal = marks.reduce((sum, m) => sum + m.total, 0);

  return (
    <div className="min-h-screen bg-slate-100 font-sans pb-10">
      
      {/* Top Action Bar */}
      <div className="bg-[#2c3e50] p-4 flex justify-center gap-4 sticky top-0 z-10 shadow-md">
        <button className="px-6 py-2 bg-[#007bff] hover:bg-[#0056b3] text-white font-bold text-sm rounded-none transition-colors cursor-pointer border-none flex items-center gap-2">
          <Printer className="w-4 h-4" /> Print Marksheet
        </button>
        <button className="px-6 py-2 bg-[#28a745] hover:bg-[#218838] text-white font-bold text-sm rounded-none transition-colors cursor-pointer border-none flex items-center gap-2">
          <Download className="w-4 h-4" /> Download PDF
        </button>
      </div>

      {/* Report Card Paper */}
      <div className="max-w-[900px] mx-auto mt-8 bg-white border border-slate-300 shadow-xl p-2 pb-8 print:shadow-none print:border-none print:mt-0">
        <div className="border-[1.5px] border-[#2980b9] p-4">
          
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold text-[#2980b9] mb-1 tracking-wide">CONSOLIDATED ACADEMIC PERFORMANCE</h1>
            <h2 className="text-sm font-bold text-[#c0392b] mb-1">ACADEMIC YEAR: 2025 - 2026</h2>
            <div className="inline-block bg-[#2ecc71] text-white font-bold px-4 py-0.5 rounded-none text-lg uppercase shadow-sm">
              {studentName}
            </div>
          </div>

          {/* Student Info Table */}
          <table className="w-full border-collapse border border-[#2980b9] mb-6 text-xs font-bold text-slate-800">
            <tbody>
              <tr>
                <td className="border border-[#2980b9] p-2 w-[35%]">Name : <span className="uppercase">I. VIHAS</span></td>
                <td className="border border-[#2980b9] p-2 text-center">Father's Name : I. SAMYELU</td>
                <td className="border border-[#2980b9] p-2 text-center">Class : 6th</td>
                <td className="border border-[#2980b9] p-2 text-right">Result : <span className="text-[#2ecc71] uppercase">PASSED</span></td>
              </tr>
            </tbody>
          </table>

          {/* Middle Layout: Marks Table + Chart */}
          <div className="flex gap-2 mb-6">
            
            {/* Marks Table */}
            <div className="flex-[3]">
              <table className="w-full border-collapse border border-[#2980b9] text-[11px] text-center font-bold text-slate-800">
                <thead>
                  <tr className="bg-[#2980b9] text-white uppercase leading-tight">
                    <th className="border border-[#2980b9] p-2 text-left">Subject</th>
                    <th className="border border-[#2980b9] p-2">FA*8 AVG<br/>(25)</th>
                    <th className="border border-[#2980b9] p-2">SA AVG<br/>(25)</th>
                    <th className="border border-[#2980b9] p-2">ANNUAL<br/>(50)</th>
                    <th className="border border-[#2980b9] p-2">TOTAL<br/>(100)</th>
                    <th className="border border-[#2980b9] p-2">GRADE</th>
                  </tr>
                </thead>
                <tbody>
                  {marks.map((m, idx) => (
                    <tr key={idx}>
                      <td className="border border-[#2980b9] p-2 text-left text-[#2980b9]">{m.subject}</td>
                      <td className="border border-[#2980b9] p-2">{m.fa8}</td>
                      <td className="border border-[#2980b9] p-2">{m.sa}</td>
                      <td className="border border-[#2980b9] p-2">{m.annual}</td>
                      <td className="border border-[#2980b9] p-2">{m.total}</td>
                      <td className="border border-[#2980b9] p-2">{m.grade}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="4" className="border border-[#2980b9] p-2 text-right uppercase tracking-wider">Grand Total</td>
                    <td className="border border-[#2980b9] p-2 text-[#e74c3c] font-black">{grandTotal}</td>
                    <td className="border border-[#2980b9] p-2 font-black">C1</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Bar Chart */}
            <div className="flex-[2] border border-[#2980b9] p-1 pb-0 flex flex-col">
              <div className="text-center text-[11px] font-bold text-slate-800 mb-1">Subject Wise Scored Marks</div>
              <div className="flex-1 border border-slate-300 bg-white relative p-2 pt-6 pl-6 flex items-end justify-around pb-6 overflow-hidden">
                
                {/* Y-Axis lines and labels */}
                {[0, 20, 40, 60, 80, 100].map(val => (
                  <div key={val} className="absolute left-0 w-full border-t border-slate-200" style={{ bottom: `${val}%`, paddingBottom: '24px' }}>
                    <span className="absolute -left-1 text-[8px] text-slate-500 font-mono -translate-y-1/2">{val}</span>
                  </div>
                ))}
                
                {/* Bars */}
                {marks.map((m, idx) => (
                  <div key={idx} className="relative w-8 z-10 group flex flex-col items-center justify-end h-full">
                    <div 
                      className="w-full transition-all duration-500 shadow-sm" 
                      style={{ height: `${m.total}%`, backgroundColor: m.color }}
                    ></div>
                    <div className="absolute -bottom-5 text-[8px] font-bold text-slate-600 uppercase">
                      {m.subject.substring(0, 3)}
                    </div>
                  </div>
                ))}

              </div>
            </div>

          </div>

          {/* Stats Bar */}
          <table className="w-full border-collapse border border-[#2980b9] mb-6 text-xs font-bold text-slate-800">
            <tbody>
              <tr>
                <td className="border border-[#2980b9] p-2 w-[33%]">Percentage: <span className="text-[#e74c3c]">58%</span></td>
                <td className="border border-[#2980b9] p-2 w-[33%] text-center">Attendance: <span className="text-[#2980b9]">89%</span></td>
                <td className="border border-[#2980b9] p-2 text-right">Status: <span className="text-[#2ecc71]">Promoted to 7th</span></td>
              </tr>
            </tbody>
          </table>

          {/* Bottom Layout: Attendance + Remarks */}
          <div className="flex gap-2 mb-16">
            
            <div className="flex-[2]">
              <table className="w-full border-collapse border border-[#2980b9] text-[11px] text-center font-bold text-slate-800 h-full">
                <thead>
                  <tr>
                    <th colSpan="2" className="bg-[#2980b9] text-white p-1.5 uppercase">Attendance Record</th>
                  </tr>
                  <tr className="bg-slate-100">
                    <th className="border border-[#2980b9] p-1.5 text-[9px] uppercase">Total Working Days</th>
                    <th className="border border-[#2980b9] p-1.5 text-[9px] uppercase">Days Attended</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-[#2980b9] p-3 text-lg">228</td>
                    <td className="border border-[#2980b9] p-3 text-lg">204</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex-[3] border border-[#2980b9] p-2 text-[11px] text-slate-800">
              <div className="font-bold text-[#2980b9] underline mb-1">Teacher's Remarks:</div>
              <div className="italic mb-2 text-slate-700">"Be active in the class. Needs improvement in English and Social Studies."</div>
              
              <div className="font-bold text-slate-800 mt-3">Strengths: <span className="font-normal">Hindi</span></div>
              <div className="font-bold text-slate-800">Needs Improvement: <span className="font-normal">English, Social</span></div>
            </div>

          </div>

          {/* Signatures */}
          <div className="flex justify-between px-4 text-xs font-bold text-slate-800 mt-20 mb-2">
            <div>Parent's Signature</div>
            <div>Class Teacher</div>
            <div>Principal</div>
          </div>

        </div>
      </div>
    </div>
  );
}
