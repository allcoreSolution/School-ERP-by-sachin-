import React from 'react';
import { ArrowLeft, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const YearEndRollover = () => {
  const navigate = useNavigate();

  const rows = [
    { from: 'Nursery — A', students: 18, promoteTo: '' },
    { from: 'Nursery — B', students: 4, promoteTo: '' },
    { from: 'Class I — A', students: 41, promoteTo: '' },
    { from: 'Class II — A', students: 1, promoteTo: '' },
    { from: 'Class III — A', students: 20, promoteTo: '' },
    { from: 'Class IV — A', students: 19, promoteTo: '' },
    { from: 'Class V — A', students: 19, promoteTo: '' },
    { from: 'Class VI — A', students: 17, promoteTo: '' },
    { from: 'Class VIII — A', students: 20, promoteTo: '' },
    { from: 'Class IX — A', students: 19, promoteTo: '' },
    { from: 'Class XII — A', students: 20, promoteTo: '' },
    { from: 'Class X — A', students: 20, promoteTo: '' },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-y-auto">
      
      {/* Top Nav/Header */}
      <div className="px-8 pt-6 pb-2 border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex justify-between items-center pb-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#EEEDFF] text-[#5F52FF] rounded-none flex items-center justify-center font-bold text-xs">H</div>
            <h1 className="text-xl font-bold text-[#1a1a2e]">Year-End Rollover</h1>
          </div>
          <button 
            onClick={() => navigate('/academics/sessions')}
            className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-none text-[13px] font-bold hover:bg-gray-50 shadow-sm flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Sessions
          </button>
        </div>
      </div>

      <div className="p-8 flex-1">
        <div className="bg-white border border-gray-200 rounded-none shadow-sm">
          
          <div className="p-6 border-b border-gray-200">
            {/* Info Alert */}
            <div className="bg-[#EEEDFF] text-[#5F52FF] px-4 py-3 rounded-none flex items-center gap-2 text-[13px] font-semibold mb-6">
              <Info className="w-4 h-4 shrink-0" />
              Promote each class into the next year, mark your final class as Graduate, and leave a class on Hold to skip it. You'll see a full preview before anything is saved.
            </div>

            {/* Selects */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">From (current year)</label>
                <select className="w-full md:w-64 border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF] font-semibold text-gray-700">
                  <option>2026-2027 (current)</option>
                </select>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-[11px] font-bold text-red-500 uppercase mb-1">Into (next year) *</label>
                  <select className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF] text-gray-700">
                    <option>-- select target session --</option>
                    <option>2027-2028</option>
                  </select>
                </div>
                
                {/* Toggle */}
                <div className="flex items-center gap-2 mt-4">
                  <div className="relative inline-block w-8 h-4 cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-8 h-4 bg-gray-300 peer-focus:outline-none rounded-none peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-none after:h-3 after:w-3.5 after:transition-all peer-checked:bg-[#5F52FF]"></div>
                  </div>
                  <span className="text-[12px] font-bold text-gray-700">Make the target session current after rollover</span>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#F8F7FF] border-b border-gray-200 text-[10px] font-bold text-[#5F52FF] uppercase tracking-wider">
                  <th className="px-6 py-3 border-r border-gray-200">FROM (CLASS — SECTION)</th>
                  <th className="px-6 py-3 border-r border-gray-200 text-center">STUDENTS</th>
                  <th className="px-6 py-3 border-r border-gray-200">ACTION</th>
                  <th className="px-6 py-3">PROMOTE TO (CLASS — SECTION)</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-gray-700">
                {rows.map((row, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-3 border-r border-gray-100 font-bold text-gray-800">{row.from}</td>
                    <td className="px-6 py-3 border-r border-gray-100 text-center font-bold text-[#5F52FF]">{row.students}</td>
                    <td className="px-6 py-3 border-r border-gray-100">
                      <select className="w-full border border-gray-300 rounded-none px-3 py-1.5 focus:outline-none focus:border-[#5F52FF] text-gray-600 bg-white">
                        <option>Promote</option>
                        <option>Hold</option>
                        <option>Graduate</option>
                      </select>
                    </td>
                    <td className="px-6 py-3">
                      <select className="w-full border border-gray-300 rounded-none px-3 py-1.5 focus:outline-none focus:border-[#5F52FF] text-gray-400 bg-white">
                        <option>-- select --</option>
                      </select>
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
};

export default YearEndRollover;
