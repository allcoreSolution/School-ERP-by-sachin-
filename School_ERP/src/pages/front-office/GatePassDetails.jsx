import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User, LogOut, XCircle, Printer, History } from 'lucide-react';

const GatePassDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-[#f4f6f8] overflow-y-auto">
      
      {/* Header */}
      <div className="px-8 pt-6 pb-6 bg-white border-b border-gray-200 shrink-0 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a2e]">GP/YIS/2026/00009</h1>
          <p className="text-[13px] text-gray-500 mt-1">Student Exit</p>
        </div>
        <span className="bg-[#17a2b8] text-white text-[12px] font-bold px-3 py-1 rounded-none shadow-sm">
          Approved
        </span>
      </div>

      <div className="p-8 w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
        
        {/* Left Column */}
        <div className="w-full md:w-2/3 flex flex-col gap-6">
          
          {/* Student Panel */}
          <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-3 border-b border-gray-200 bg-white">
              <h2 className="text-[13px] font-bold text-[#5F52FF] flex items-center gap-2">
                <User className="w-4 h-4" /> Ishaan Gupta
              </h2>
            </div>
            <div className="p-5">
              <table className="w-full text-left text-[13px]">
                <tbody>
                  <tr>
                    <td className="py-2 text-gray-500 w-1/3">Class</td>
                    <td className="py-2 text-gray-800">Nursery A</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-500">Admission no</td>
                    <td className="py-2 text-gray-800">YISADM-006</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-500">Reason</td>
                    <td className="py-2 text-gray-800">Sick / unwell</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-500">Expected out</td>
                    <td className="py-2 text-gray-800">17 Aug 2026, 02:21 PM</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-500">Actually out</td>
                    <td className="py-2 text-gray-800">--</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-500">Back in</td>
                    <td className="py-2 text-gray-800">Not expected back today</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-500">Gate</td>
                    <td className="py-2 text-gray-800">Main Gate</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-500">Attendance</td>
                    <td className="py-2 text-gray-800">No change</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Collected By Panel */}
          <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-3 border-b border-gray-200 bg-white">
              <h2 className="text-[13px] font-bold text-[#5F52FF] flex items-center gap-2">
                <User className="w-4 h-4" /> Collected by
              </h2>
            </div>
            <div className="p-5 flex gap-6">
              <div className="w-24 h-24 border border-dashed border-gray-300 rounded-none flex items-center justify-center bg-gray-50 text-[10px] text-gray-400 shrink-0">
                No photo
              </div>
              <table className="w-full text-left text-[13px]">
                <tbody>
                  <tr>
                    <td className="py-2 text-gray-500 w-1/3">Name</td>
                    <td className="py-2 text-gray-800">HHHh</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-500">Relation</td>
                    <td className="py-2 text-gray-800">Ggg</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-500">Mobile</td>
                    <td className="py-2 text-gray-800">9886377378737</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-500">ID proof</td>
                    <td className="py-2 text-gray-800">--</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="w-full md:w-1/3 flex flex-col gap-6">
          
          {/* Actions */}
          <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-3 border-b border-gray-200 bg-white">
              <h2 className="text-[13px] font-bold text-[#5F52FF] flex items-center gap-2">
                <LogOut className="w-4 h-4" /> Actions
              </h2>
            </div>
            <div className="p-4 flex flex-col gap-3">
              <button 
                onClick={() => window.print()}
                className="w-full border border-gray-300 bg-white text-gray-700 py-2 rounded-none text-[13px] font-bold flex justify-center items-center gap-2 hover:bg-gray-50 transition-colors"
              >
                <Printer className="w-4 h-4" /> Print pass
              </button>
              <button 
                onClick={() => { alert('Student marked OUT at the gate successfully!'); navigate('/front-office/gate-passes'); }}
                className="w-full bg-[#fd7e14] hover:bg-[#e86f0b] text-white py-2 rounded-none text-[13px] font-bold flex justify-center items-center gap-2 shadow-sm transition-colors"
              >
                <LogOut className="w-4 h-4" /> Mark out at gate
              </button>
              <button 
                onClick={() => { alert('Pass has been cancelled.'); navigate('/front-office/gate-passes'); }}
                className="w-full border border-gray-300 bg-white text-gray-700 py-2 rounded-none text-[13px] font-bold flex justify-center items-center gap-2 hover:bg-gray-50 transition-colors"
              >
                <XCircle className="w-4 h-4" /> Cancel pass
              </button>
            </div>
          </div>

          {/* Trail */}
          <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-3 border-b border-gray-200 bg-white">
              <h2 className="text-[13px] font-bold text-[#5F52FF] flex items-center gap-2">
                <History className="w-4 h-4" /> Trail
              </h2>
            </div>
            <div className="p-4">
              <p className="text-[10px] text-gray-400 mb-4">Append-only. This is the record an inquiry reads.</p>
              
              <div className="relative pl-4 border-l-2 border-gray-200 mb-4">
                <div className="absolute w-2 h-2 bg-gray-300 rounded-none -left-[5px] top-1"></div>
                <h4 className="text-[13px] font-bold text-gray-800">Pass created</h4>
                <p className="text-[11px] text-gray-500 mt-0.5">17 Aug 2026, 02:22 PM · school admin</p>
                <p className="text-[10px] text-gray-400 mt-1 font-mono">source: 'office' reason: 'Sick / unwell' ip: '2409:40e3:407e:5d9:28d8:b3ff:fecd:bdb1'</p>
              </div>

              <div className="relative pl-4 border-l-2 border-transparent">
                <div className="absolute w-2 h-2 bg-gray-300 rounded-none -left-[5px] top-1"></div>
                <h4 className="text-[13px] font-bold text-gray-800">Approved</h4>
                <p className="text-[11px] text-gray-500 mt-0.5">17 Aug 2026, 02:22 PM · school admin</p>
                <p className="text-[10px] text-gray-400 mt-1 font-mono">auto: true ip: '2409:40e3:407e:5d9:28d8:b3ff:fecd:bdb1'</p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default GatePassDetails;
