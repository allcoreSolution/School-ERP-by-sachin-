import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Lightbulb } from 'lucide-react';

const AddBehaviorRecord = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 h-full flex flex-col bg-gray-50 overflow-y-auto">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add New Behavior Record</h1>
        <p className="text-sm text-gray-500 mt-1">Log a positive or negative note for a student</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        
        {/* Left Column: Form */}
        <div className="flex-1 bg-white rounded-none shadow-sm border border-gray-200 flex flex-col">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2 font-bold text-[14px] text-gray-800">
            <FileText className="w-4 h-4 text-[#5F52FF]" /> New Behavior Record
          </div>
          
          <div className="p-5 flex-1 space-y-5">
            
            <div className="flex flex-col md:flex-row gap-5">
              <div className="flex-1 w-full">
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Class <span className="text-red-500">*</span>
                </label>
                <select className="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:outline-none focus:border-[#5F52FF]">
                  <option>-- Select Class --</option>
                  <option>Class 1</option>
                  <option>Class 2</option>
                </select>
              </div>
              <div className="flex-1 w-full">
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Section <span className="text-red-500">*</span>
                </label>
                <select className="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:outline-none focus:border-[#5F52FF]">
                  <option>-- Select Section First --</option>
                  <option>Section A</option>
                  <option>Section B</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Student <span className="text-red-500">*</span>
              </label>
              <select className="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:outline-none focus:border-[#5F52FF]">
                <option>-- Select Section First --</option>
              </select>
            </div>

            <div className="flex flex-col md:flex-row gap-5">
              <div className="flex-1 w-full">
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Record Date <span className="text-red-500">*</span>
                </label>
                <input 
                  type="date" 
                  defaultValue="2026-08-22"
                  className="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:outline-none focus:border-[#5F52FF]"
                />
              </div>
              <div className="flex-1 w-full">
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Reported By <span className="text-red-500">*</span>
                </label>
                <select className="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:outline-none focus:border-[#5F52FF]">
                  <option>-- Select Staff --</option>
                  <option>Amit Sharma</option>
                  <option>Rajiv Kumar</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                Incident Type <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input type="radio" name="incidentType" className="text-[#5F52FF] focus:ring-[#5F52FF]" defaultChecked />
                  <span>Positive / Achievement</span>
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input type="radio" name="incidentType" className="text-red-600 focus:ring-red-600" />
                  <span>Negative / Misconduct</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Title <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                placeholder="e.g., Helped a classmate, Disruptive in class"
                className="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:outline-none focus:border-[#5F52FF]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea 
                rows="4"
                placeholder="Detailed notes about the incident..."
                className="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:outline-none focus:border-[#5F52FF] resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Action Taken (Optional)
              </label>
              <textarea 
                rows="3"
                placeholder="e.g., Praised in assembly, Detention assigned..."
                className="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:outline-none focus:border-[#5F52FF] resize-none"
              ></textarea>
            </div>

          </div>
          
          <div className="px-5 py-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50 rounded-b-lg mt-auto">
            <button 
              onClick={() => navigate('/students/behavior')}
              className="px-4 py-2 border border-gray-300 rounded-none text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 shadow-sm"
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-[#5F52FF] text-white rounded-none text-sm font-semibold hover:bg-[#4E41E6] shadow-sm flex items-center gap-2">
               <FileText className="w-4 h-4" /> Add Record
            </button>
          </div>
        </div>

        {/* Right Column: Instructions */}
        <div className="lg:w-[380px] h-fit">
          <div className="bg-white rounded-none shadow-sm border border-gray-200">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2 font-bold text-[14px] text-gray-800">
              <Lightbulb className="w-4 h-4 text-[#5F52FF]" /> Writing a good note
            </div>
            <div className="p-5">
              <ul className="text-[13px] text-gray-600 space-y-4 list-disc pl-4">
                <li>
                  Pick the <strong>Class</strong> and <strong>Section</strong> first — the student list loads from your choice.
                </li>
                <li>
                  Use <strong>Positive</strong> for achievements and good conduct, <strong>Negative</strong> for misconduct.
                </li>
                <li>
                  Keep the <strong>Title</strong> short and specific, e.g. "Helped a classmate".
                </li>
                <li>
                  Put the full story in <strong>Description</strong>, and any follow-up under <strong>Action Taken</strong>.
                </li>
                <li>
                  Records show up on the student's profile and (for negatives) can be shared with parents.
                </li>
              </ul>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default AddBehaviorRecord;
