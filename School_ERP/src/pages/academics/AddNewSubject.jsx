import React from 'react';
import { Book, Lightbulb, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddNewSubject = () => {
  const navigate = useNavigate();

  const classList = [
    'Nursery', 'KG', 'Class I', 'Class II', 'Class III', 'Class IV', 
    'Class V', 'Class VI', 'Class VII', 'Class VIII', 'Class IX', 'Class XI', 
    'Class XII', 'Class 11 science', 'KG1', 'c45', 'Gj', 'Gjgh', 'Class X', 
    '123', 'ASHWANI DUBEY'
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-y-auto">
      
      {/* Header */}
      <div className="px-8 pt-8 pb-4">
        <h1 className="text-2xl font-bold text-[#1a1a2e]">Add New Subject</h1>
        <p className="text-[13px] text-gray-500 mt-1">Add a compulsory or elective subject</p>
      </div>

      <div className="px-8 py-4 flex flex-col xl:flex-row gap-6">
        
        {/* Left Form */}
        <div className="flex-1 bg-white border border-gray-200 rounded-none shadow-sm">
          <div className="p-4 border-b border-gray-200 bg-[#F8F7FF] rounded-t-lg">
            <h2 className="text-[15px] font-bold text-[#5F52FF] flex items-center gap-2">
              <Book className="w-5 h-5" /> New Subject
            </h2>
          </div>
          
          <div className="p-6 space-y-6">
            
            {/* Subject Name */}
            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Subject Name</label>
              <input 
                type="text" 
                placeholder="e.g., Mathematics"
                className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF] text-gray-800"
              />
            </div>

            {/* Subject Code */}
            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Subject Code (Optional)</label>
              <input 
                type="text" 
                placeholder="e.g., MATH-101"
                className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF] text-gray-800"
              />
            </div>
            
            {/* Subject Type */}
            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Subject Type</label>
              <select className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF] text-gray-800 bg-white shadow-sm">
                <option value="compulsory">Compulsory (Default)</option>
                <option value="elective">Elective</option>
              </select>
              <p className="text-xs text-gray-400 mt-1.5 font-medium">
                Compulsory subjects are taken by everyone in the section. Electives are chosen by students.
              </p>
            </div>

            {/* Available for Classes */}
            <div className="pt-4 border-t border-gray-100">
              <label className="block text-[13px] font-bold text-gray-800 mb-1">Available for Classes <span className="text-gray-400 font-normal">(optional)</span></label>
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                Tick the classes this subject is offered in — the Assign Subjects screen then only shows it under those classes. Leave all unticked to keep it available to <strong>every</strong> class.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6">
                {classList.map((cls, idx) => (
                  <label key={idx} className="flex items-center gap-2 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input type="checkbox" className="w-4 h-4 rounded-none border-gray-300 text-[#5F52FF] focus:ring-[#5F52FF] cursor-pointer" />
                    </div>
                    <span className="text-[13px] font-semibold text-gray-700 group-hover:text-gray-900">{cls}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>
          
          <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3 rounded-b-lg">
            <button 
              onClick={() => navigate('/academics/subjects')}
              className="px-5 py-2.5 border border-gray-300 rounded-none text-[13px] font-bold text-gray-600 hover:bg-gray-100 bg-white shadow-sm"
            >
              Cancel
            </button>
            <button className="px-5 py-2.5 bg-[#5F52FF] text-white rounded-none text-[13px] font-bold hover:bg-[#4E41E6] shadow-sm flex items-center gap-2">
              <Save className="w-4 h-4" /> Save Subject
            </button>
          </div>
        </div>

        {/* Right Info Card */}
        <div className="w-full xl:w-[400px]">
          <div className="bg-white border border-gray-200 rounded-none p-6 shadow-sm sticky top-6">
            <h3 className="text-[15px] font-bold text-[#1a1a2e] flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-none bg-[#EEEDFF] flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-[#5F52FF]" />
              </div>
              Compulsory vs Elective
            </h3>
            <ul className="space-y-4 text-[13px] text-gray-600">
              <li className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-none bg-[#5F52FF] mt-1.5 shrink-0"></div>
                <span><strong>Compulsory subjects</strong> are taken by every student in the section.</span>
              </li>
              <li className="border-t border-gray-100 pt-4 flex gap-2">
                <div className="w-1.5 h-1.5 rounded-none bg-[#5F52FF] mt-1.5 shrink-0"></div>
                <span><strong>Elective subjects</strong> are chosen by students — they need an <strong>Elective Group</strong>.</span>
              </li>
              <li className="border-t border-gray-100 pt-4 flex gap-2">
                <div className="w-1.5 h-1.5 rounded-none bg-[#5F52FF] mt-1.5 shrink-0"></div>
                <span>Group related electives together, e.g. <strong>French & Spanish</strong> under "Second Language".</span>
              </li>
              <li className="border-t border-gray-100 pt-4 flex gap-2">
                <div className="w-1.5 h-1.5 rounded-none bg-[#5F52FF] mt-1.5 shrink-0"></div>
                <span>The <strong>subject code</strong> is optional but handy for report cards and imports.</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AddNewSubject;
