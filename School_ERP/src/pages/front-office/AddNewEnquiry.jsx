import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Save, Calendar as CalendarIcon } from 'lucide-react';

const AddNewEnquiry = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-[#f4f6f8] overflow-y-auto">
      
      {/* Header */}
      <div className="px-8 pt-6 pb-6 bg-white border-b border-gray-200 shrink-0">
        <h1 className="text-2xl font-bold text-[#1a1a2e]">Log Admission Enquiry</h1>
        <p className="text-[13px] text-gray-500 mt-1">Capture a new admission enquiry at reception</p>
      </div>

      <div className="p-8 w-full">
        
        <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
          
          <div className="p-4 border-b border-gray-200 bg-white">
            <h2 className="text-[15px] font-bold text-[#1a1a2e] flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-[#5F52FF]" /> New Enquiry
            </h2>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1.5">
                    Student Name <span className="text-red-500">*</span>
                  </label>
                  <input type="text" className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF]" />
                </div>
                
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1.5">
                    Class of Interest <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF] bg-white">
                    <option>Select Class</option>
                    <option>Nursery</option>
                    <option>KG</option>
                    <option>Class I</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1.5">
                    Parent Name <span className="text-red-500">*</span>
                  </label>
                  <input type="text" className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF]" />
                </div>
                
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1.5">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input type="text" className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF]" />
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Email</label>
                  <input type="email" className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF]" />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1.5">
                    Enquiry Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input type="text" defaultValue="22-08-2026" className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF] bg-white pr-10" />
                    <CalendarIcon className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Next Follow-up Date</label>
                  <div className="relative">
                    <input type="text" placeholder="dd-mm-yyyy" className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF] bg-white pr-10" />
                    <CalendarIcon className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Source</label>
                  <select className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF] bg-white mb-1">
                    <option>Select Source</option>
                    <option>Walk-in</option>
                    <option>Online</option>
                  </select>
                  <p className="text-[11px] text-gray-400">Manage sources under Lead Management → Sources & Stages.</p>
                </div>
                
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Assign To</label>
                  <select className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF] bg-white">
                    <option>Select Staff</option>
                    <option>Amit Sharma</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Notes</label>
                  <textarea rows={3} className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF] resize-none"></textarea>
                </div>
              </div>

            </div>
          </div>

          <div className="p-4 border-t border-gray-200 bg-[#F8F7FF] flex justify-end gap-3">
            <button 
              onClick={() => navigate('/front-office/admission-enquiries')}
              className="px-5 py-2 border border-gray-300 rounded-none text-[13px] font-bold text-gray-600 bg-white hover:bg-gray-50 shadow-sm transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={() => { alert('Enquiry saved successfully!'); navigate('/front-office/admission-enquiries'); }}
              className="px-5 py-2 bg-[#5F52FF] text-white rounded-none text-[13px] font-bold hover:bg-[#4E41E6] shadow-sm flex items-center gap-2 transition-colors"
            >
              <Save className="w-4 h-4" /> Save Enquiry
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AddNewEnquiry;
