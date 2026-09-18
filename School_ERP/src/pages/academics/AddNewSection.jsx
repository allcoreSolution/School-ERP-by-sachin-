import React from 'react';
import { Users, Lightbulb, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddNewSection = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-y-auto">
      
      {/* Header */}
      <div className="px-8 pt-8 pb-4">
        <h1 className="text-2xl font-bold text-[#1a1a2e]">Add New Section</h1>
        <p className="text-[13px] text-gray-500 mt-1">Create one or many sections for a class</p>
      </div>

      <div className="px-8 py-4 flex flex-col lg:flex-row gap-6">
        
        {/* Left Form */}
        <div className="flex-1 bg-white border border-gray-200 rounded-none shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-[15px] font-bold text-[#5F52FF] flex items-center gap-2">
              <Users className="w-5 h-5" /> New Section
            </h2>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Class</label>
              <select className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF] text-gray-700 bg-white">
                <option value="">-- Select Class --</option>
                <option value="nursery">Nursery</option>
                <option value="kg">KG</option>
                <option value="class-1">Class I</option>
              </select>
            </div>

            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Section Name</label>
              <input 
                type="text" 
                placeholder="e.g., A, B, Rose"
                className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF] text-gray-800"
              />
            </div>
            
            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Section In-charge / Coordinator</label>
              <select className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF] text-gray-700 bg-white">
                <option value="">-- Select Coordinator --</option>
                <option value="amit">Amit Sharma</option>
                <option value="sneha">Sneha Desai</option>
                <option value="rajesh">Rajesh Kumar</option>
              </select>
              <p className="text-xs text-gray-400 mt-1.5 font-medium leading-relaxed">
                The teacher responsible for this individual section. When creating multiple sections at once, the same in-charge is applied to all of them — you can change each one later from Edit.
              </p>
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3 rounded-b-lg">
            <button 
              onClick={() => navigate('/academics/sections')}
              className="px-5 py-2.5 border border-gray-300 rounded-none text-[13px] font-bold text-gray-600 hover:bg-gray-100 bg-white shadow-sm"
            >
              Cancel
            </button>
            <button className="px-5 py-2.5 bg-[#5F52FF] text-white rounded-none text-[13px] font-bold hover:bg-[#4E41E6] shadow-sm flex items-center gap-2">
              <Save className="w-4 h-4" /> Create Section
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
              Quick creation guide
            </h3>
            <ul className="space-y-4 text-[13px] text-gray-600">
              <li className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-none bg-[#5F52FF] mt-1.5 shrink-0"></div>
                <span><strong>Single section</strong> — just type the name (e.g. A or Rose).</span>
              </li>
              <li className="border-t border-gray-100 pt-4 flex gap-2">
                <div className="w-1.5 h-1.5 rounded-none bg-[#5F52FF] mt-1.5 shrink-0"></div>
                <span><strong>Batch creation</strong> — separate names with a comma. Typing <strong>A, B, C</strong> instantly generates three sections.</span>
              </li>
              <li className="border-t border-gray-100 pt-4 flex gap-2">
                <div className="w-1.5 h-1.5 rounded-none bg-[#5F52FF] mt-1.5 shrink-0"></div>
                <span><strong>Safe input</strong> — extra spaces are trimmed, formatting is fixed, and duplicates are blocked automatically.</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AddNewSection;
