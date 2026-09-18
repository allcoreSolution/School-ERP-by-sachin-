import React from 'react';
import { Monitor, Lightbulb, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddNewClass = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-y-auto">
      
      {/* Header */}
      <div className="px-8 pt-8 pb-4">
        <h1 className="text-2xl font-bold text-[#1a1a2e]">Add New Class</h1>
        <p className="text-[13px] text-gray-500 mt-1">Create a class and assign its coordinator</p>
      </div>

      <div className="px-8 py-4 flex flex-col lg:flex-row gap-6">
        
        {/* Left Form */}
        <div className="flex-1 bg-white border border-gray-200 rounded-none shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-[15px] font-bold text-[#5F52FF] flex items-center gap-2">
              <Monitor className="w-5 h-5" /> New Class
            </h2>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Class Name</label>
              <input 
                type="text" 
                placeholder="e.g., Grade 10"
                className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF] text-gray-800"
              />
            </div>
            
            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Class Coordinator / Head Teacher</label>
              <select className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF] text-gray-700 bg-white">
                <option value="">-- Select Coordinator --</option>
                <option value="amit">Amit Sharma</option>
                <option value="priya">Priya Singh</option>
              </select>
              <p className="text-xs text-gray-400 mt-1.5 font-medium">The coordinator oversees all sections and subjects for this grade.</p>
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3 rounded-b-lg">
            <button 
              onClick={() => navigate('/academics/dashboard')}
              className="px-5 py-2.5 border border-gray-300 rounded-none text-[13px] font-bold text-gray-600 hover:bg-gray-100 bg-white shadow-sm"
            >
              Cancel
            </button>
            <button className="px-5 py-2.5 bg-[#5F52FF] text-white rounded-none text-[13px] font-bold hover:bg-[#4E41E6] shadow-sm flex items-center gap-2">
              <Save className="w-4 h-4" /> Create Class
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
              About Classes
            </h3>
            <ul className="space-y-4 text-[13px] text-gray-600">
              <li className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-none bg-[#5F52FF] mt-1.5 shrink-0"></div>
                <span>The <strong>name</strong> shows everywhere a class is listed — keep it clear (e.g. "Grade 10").</span>
              </li>
              <li className="border-t border-gray-100 pt-4 flex gap-2">
                <div className="w-1.5 h-1.5 rounded-none bg-[#5F52FF] mt-1.5 shrink-0"></div>
                <span>The <strong>coordinator</strong> oversees all sections and subjects for this class.</span>
              </li>
              <li className="border-t border-gray-100 pt-4 flex gap-2">
                <div className="w-1.5 h-1.5 rounded-none bg-[#5F52FF] mt-1.5 shrink-0"></div>
                <span>After creating, add sections and use <strong>Reorder</strong> on the list to set display order.</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AddNewClass;
