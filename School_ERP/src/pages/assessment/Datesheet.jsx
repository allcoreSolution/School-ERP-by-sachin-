import React from 'react';
import { Calendar, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Datesheet() {
  const navigate = useNavigate();

  const datesheets = [
    {
      id: 1,
      examName: 'Term 3 Nov',
      classes: 'All classes',
      session: '2026-2027',
      dates: '13 Nov, 2026 to 27 Nov, 2026',
      status: [{ label: 'Nursery · R3', color: 'bg-[#28a745]' }]
    },
    {
      id: 2,
      examName: 'New Exam Test',
      classes: 'Nursery',
      session: '2026-2027',
      dates: '01 Aug, 2026 to 14 Aug, 2026',
      status: [{ label: 'Not published', color: 'bg-[#6c757d]' }]
    },
    {
      id: 3,
      examName: 'Annual Examination',
      classes: 'KG, Class I, Class II, Class III, Class IV, Class V, Class VI, Class VII, Class VIII, Class IX, Class X, Class XII, Nursery',
      session: '2026-2027',
      dates: '12 Jul, 2026 to 12 Jul, 2026',
      status: [{ label: 'Nursery', color: 'bg-[#28a745]' }]
    },
    {
      id: 4,
      examName: 'Half-Yearly Examination 2026-2027',
      classes: 'All classes',
      session: '2026-2027',
      dates: '01 Apr, 2026 to 01 Apr, 2026',
      status: [{ label: 'Not published', color: 'bg-[#6c757d]' }]
    },
    {
      id: 5,
      examName: 'Term 1',
      classes: 'All classes',
      session: '2026-2027',
      dates: '01 Feb, 2026 to 26 Feb, 2026',
      status: [
        { label: 'Nursery · R8', color: 'bg-[#28a745]' },
        { label: 'Class I · R2', color: 'bg-[#28a745]' },
        { label: 'All classes · R2', color: 'bg-[#28a745]' },
        { label: 'Class XII · R2', color: 'bg-[#28a745]' }
      ]
    },
    {
      id: 6,
      examName: 'Term 2',
      classes: 'All classes',
      session: '2026-2027',
      dates: '01 Feb, 2026 to 26 Feb, 2026',
      status: [{ label: 'Not published', color: 'bg-[#6c757d]' }]
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-10">
      
      {/* Header */}
      <div className="bg-white p-6 border-b border-slate-200 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Datesheets</h1>
          <p className="text-sm text-slate-500 mt-1">Publish exam schedules to the notice board and the parent app</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-sm rounded-none transition-colors cursor-pointer shadow-sm">
          <Layers className="w-4 h-4" /> View all sessions
        </button>
      </div>

      <div className="p-6 max-w-[1400px] mx-auto">
        
        {/* Table Container */}
        <div className="bg-white border border-slate-200 rounded-none shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f3f0ff] border-b border-slate-200 text-xs font-bold text-[#6f42c1] uppercase">
                  <th className="py-4 px-6 border-r border-slate-200/50 w-[40%]">Exam</th>
                  <th className="py-4 px-6 border-r border-slate-200/50">Session</th>
                  <th className="py-4 px-6 border-r border-slate-200/50">Dates</th>
                  <th className="py-4 px-6 border-r border-slate-200/50">Datesheet</th>
                  <th className="py-4 px-6 text-center w-32"></th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-700">
                {datesheets.map((item, index) => (
                  <tr key={item.id} className={`border-b border-slate-200 hover:bg-slate-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-[#f8f9fc]/50'}`}>
                    <td className="py-4 px-6 border-r border-slate-200/50">
                      <div className="font-bold text-slate-800 text-[15px]">{item.examName}</div>
                      <div className="text-[11px] text-slate-500 mt-1 leading-snug pr-4">{item.classes}</div>
                    </td>
                    <td className="py-4 px-6 border-r border-slate-200/50 align-top pt-5">
                      {item.session}
                    </td>
                    <td className="py-4 px-6 border-r border-slate-200/50 align-top pt-5">
                      {item.dates}
                    </td>
                    <td className="py-4 px-6 border-r border-slate-200/50 align-top pt-5">
                      <div className="flex flex-wrap gap-1.5 max-w-[250px]">
                        {item.status.map((badge, idx) => (
                          <span 
                            key={idx} 
                            className={`px-2 py-0.5 rounded-none text-[11px] font-bold text-white shadow-sm ${badge.color}`}
                          >
                            {badge.label}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center align-top pt-4">
                      <button 
                        onClick={() => navigate(`/offline-exams/datesheet/manage?exam=${encodeURIComponent(item.examName)}`)}
                        className="w-full flex items-center justify-center gap-2 px-3 py-1.5 bg-[#6f42c1] hover:bg-[#5a32a3] text-white font-bold text-xs rounded-none transition-colors cursor-pointer shadow-sm border-none"
                      >
                        <Calendar className="w-3.5 h-3.5" /> Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
