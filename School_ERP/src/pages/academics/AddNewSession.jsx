import React from 'react';
import { Calendar, Lightbulb, Save, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddNewSession = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-y-auto">
      
      {/* Header */}
      <div className="px-8 pt-8 pb-4">
        <h1 className="text-2xl font-bold text-[#1a1a2e]">Add New Academic Session</h1>
        <p className="text-[13px] text-gray-500 mt-1">Create a school year to scope attendance, fees & exams</p>
      </div>

      <div className="px-8 py-4 flex flex-col lg:flex-row gap-6">
        
        {/* Left Form */}
        <div className="flex-1 bg-white border border-gray-200 rounded-none shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-[15px] font-bold text-[#5F52FF] flex items-center gap-2">
              <Calendar className="w-5 h-5" /> New Academic Session
            </h2>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Session Name <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                placeholder="e.g., 2025-2026"
                className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF] text-gray-800"
              />
              <p className="text-xs text-gray-400 mt-1.5 font-medium">The official title for this academic school year.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5 flex items-center gap-1"><span className="text-gray-400">▶</span> Start Date</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="dd-mm-yyyy"
                    className="w-full border border-gray-300 rounded-none pl-3 pr-8 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF] text-gray-800"
                  />
                  <Calendar className="w-4 h-4 text-gray-400 absolute right-3 top-2.5" />
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5 flex items-center gap-1"><span className="text-gray-400">🏁</span> End Date</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="dd-mm-yyyy"
                    className="w-full border border-gray-300 rounded-none pl-3 pr-8 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF] text-gray-800"
                  />
                  <Calendar className="w-4 h-4 text-gray-400 absolute right-3 top-2.5" />
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2 bg-gray-50 p-3 rounded-none border border-gray-100">
              <div className="w-4 h-4 rounded-none bg-gray-300 flex items-center justify-center text-white text-[10px] font-bold shrink-0 mt-0.5">i</div>
              <p className="text-[12px] text-gray-500 font-medium leading-relaxed">
                Recommended. Dates let the system validate records, power "this year" reports, and detect the current session automatically. You can add them later.
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-start gap-3">
                <div className="relative inline-block w-9 h-5 cursor-pointer mt-1">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none rounded-none peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-none after:h-4 after:w-4 after:transition-all peer-checked:bg-[#5F52FF]"></div>
                </div>
                <div>
                  <div className="text-[13px] font-bold text-gray-700">Set as Current Active Session</div>
                  <div className="text-xs font-bold text-red-500 mt-1 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> Checking this immediately transitions the entire school software into this new academic year.
                  </div>
                </div>
              </div>
            </div>

          </div>
          
          <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3 rounded-b-lg">
            <button 
              onClick={() => navigate('/academics/sessions')}
              className="px-5 py-2.5 border border-gray-300 rounded-none text-[13px] font-bold text-gray-600 hover:bg-gray-100 bg-white shadow-sm"
            >
              Cancel
            </button>
            <button className="px-5 py-2.5 bg-[#5F52FF] text-white rounded-none text-[13px] font-bold hover:bg-[#4E41E6] shadow-sm flex items-center gap-2">
              <Save className="w-4 h-4" /> Save Session
            </button>
          </div>
        </div>

        {/* Right Info Card */}
        <div className="w-full lg:w-[350px]">
          <div className="bg-white border border-gray-200 rounded-none p-6 shadow-sm">
            <h3 className="text-[15px] font-bold text-[#1a1a2e] flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-none bg-[#EEEDFF] flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-[#5F52FF]" />
              </div>
              About academic sessions
            </h3>
            <ul className="space-y-4 text-[13px] text-gray-600">
              <li className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-none bg-[#5F52FF] mt-1.5 shrink-0"></div>
                <span><strong>Data separation</strong> — attendance, fees and exam marks are all tied to the session they happened in.</span>
              </li>
              <li className="border-t border-gray-100 pt-4 flex gap-2">
                <div className="w-1.5 h-1.5 rounded-none bg-[#5F52FF] mt-1.5 shrink-0"></div>
                <span><strong>Naming standard</strong> — use <strong>YYYY-YYYY</strong> (e.g. 2024-2025) for consistency.</span>
              </li>
              <li className="border-t border-gray-100 pt-4 flex gap-2">
                <div className="w-1.5 h-1.5 rounded-none bg-[#5F52FF] mt-1.5 shrink-0"></div>
                <span><strong>Current session</strong> is a major system event — only switch it when the new school year officially begins.</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AddNewSession;
