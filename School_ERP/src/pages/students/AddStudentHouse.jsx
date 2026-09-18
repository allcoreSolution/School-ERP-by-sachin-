import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Lightbulb, Save } from 'lucide-react';

const AddStudentHouse = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 h-full flex flex-col bg-gray-50 overflow-y-auto">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add Student House</h1>
        <p className="text-sm text-gray-500 mt-1">Create a new house for sports & activities</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        
        {/* Left Column: Form */}
        <div className="flex-1 bg-white rounded-none shadow-sm border border-gray-200 flex flex-col">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2 font-bold text-[14px] text-gray-800">
            <Home className="w-4 h-4 text-[#5F52FF]" /> New House
          </div>
          
          <div className="p-5 flex-1">
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              House Name <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              placeholder="e.g. Red House"
              className="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:outline-none focus:border-[#5F52FF]"
            />
          </div>
          
          <div className="px-5 py-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50 rounded-b-lg mt-auto">
            <button 
              onClick={() => navigate('/students/houses')}
              className="px-4 py-2 border border-gray-300 rounded-none text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 shadow-sm"
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-[#5F52FF] text-white rounded-none text-sm font-semibold hover:bg-[#4E41E6] shadow-sm flex items-center gap-2">
               <Save className="w-4 h-4" /> Save House
            </button>
          </div>
        </div>

        {/* Right Column: Instructions */}
        <div className="lg:w-[450px] h-fit">
          <div className="bg-white rounded-none shadow-sm border border-gray-200">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2 font-bold text-[14px] text-gray-800">
              <Lightbulb className="w-4 h-4 text-[#5F52FF]" /> About houses
            </div>
            <div className="p-5">
              <ul className="text-[13px] text-gray-600 space-y-4 list-disc pl-4">
                <li>
                  Houses group students for <strong>sports days, competitions and points.</strong>
                </li>
                <li>
                  Common examples: <strong>Red, Blue, Green, Yellow</strong> — or named after founders/values.
                </li>
                <li>
                  After creating houses, assign each student to one from their profile.
                </li>
              </ul>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default AddStudentHouse;
