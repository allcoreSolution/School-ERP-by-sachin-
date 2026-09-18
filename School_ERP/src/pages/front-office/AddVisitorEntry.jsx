import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { User, Camera, LogIn, Save } from 'lucide-react';

const AddVisitorEntry = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    purpose: '',
    personToMeet: '',
    idCard: '',
    notes: ''
  });

  useEffect(() => {
    if (isEditMode) {
      // Simulate fetching data for edit
      setFormData({
        name: 'Anil Verma (Father)',
        phone: '6263056779',
        purpose: 'principal',
        personToMeet: 'School Staff',
        idCard: 'N/A',
        notes: 'Updating details for existing visitor.'
      });
    }
  }, [isEditMode]);

  return (
    <div className="flex flex-col h-full bg-[#f4f6f8] overflow-y-auto">
      
      {/* Header */}
      <div className="px-8 pt-6 pb-6 bg-white border-b border-gray-200 shrink-0">
        <h1 className="text-2xl font-bold text-[#1a1a2e]">
          {isEditMode ? 'Edit Visitor Entry' : 'Add Visitor Entry'}
        </h1>
        <p className="text-[13px] text-gray-500 mt-1">
          {isEditMode ? 'Update visitor details' : 'Check in a visitor at reception'}
        </p>
      </div>

      <div className="p-8 w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Details */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-3 border-b border-gray-200 bg-white">
              <h2 className="text-[14px] font-bold text-[#5F52FF] flex items-center gap-2">
                <User className="w-4 h-4" /> Visitor Details
              </h2>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              
              <div>
                <label className="block text-[12px] font-bold text-gray-700 mb-1.5">
                  Visitor Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF]" 
                />
              </div>
              
              <div>
                <label className="block text-[12px] font-bold text-gray-700 mb-1.5">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF]" 
                />
              </div>

              <div>
                <label className="block text-[12px] font-bold text-gray-700 mb-1.5">
                  Purpose of Visit <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={formData.purpose}
                  onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                  className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF]" 
                />
              </div>

              <div>
                <label className="block text-[12px] font-bold text-gray-700 mb-1.5">
                  Person to Meet <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={formData.personToMeet}
                  onChange={(e) => setFormData({...formData, personToMeet: e.target.value})}
                  className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF]" 
                />
              </div>

              <div>
                <label className="block text-[12px] font-bold text-gray-700 mb-1.5">ID Card Number</label>
                <input 
                  type="text" 
                  value={formData.idCard}
                  onChange={(e) => setFormData({...formData, idCard: e.target.value})}
                  className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF]" 
                />
              </div>
              <div className="hidden md:block"></div> {/* empty cell */}

              <div className="md:col-span-2">
                <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Notes</label>
                <textarea 
                  rows={3} 
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF] resize-none"
                ></textarea>
              </div>

            </div>
          </div>

          <div>
            <button 
              onClick={() => { alert(isEditMode ? 'Visitor updated successfully!' : 'Visitor checked in successfully!'); navigate('/front-office/visitor-book'); }}
              className="bg-[#5F52FF] text-white px-6 py-2.5 rounded-none text-[14px] font-bold hover:bg-[#4E41E6] shadow-sm flex items-center gap-2 transition-colors"
            >
              {isEditMode ? <Save className="w-5 h-5" /> : <LogIn className="w-5 h-5" />} 
              {isEditMode ? 'Update Visitor' : 'Check In Visitor'}
            </button>
          </div>

        </div>

        {/* Right Column - Photo */}
        <div>
          <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-3 border-b border-gray-200 bg-white">
              <h2 className="text-[14px] font-bold text-[#5F52FF] flex items-center gap-2">
                <Camera className="w-4 h-4" /> Visitor Photo
              </h2>
            </div>

            <div className="p-6 flex flex-col items-center">
              
              <div className="w-[200px] h-[150px] bg-[#f8f9fa] border border-gray-300 rounded-none flex items-center justify-center text-[12px] text-gray-500 mb-4">
                Camera Preview
              </div>

              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-1.5 rounded-none text-[13px] font-bold hover:bg-gray-50 shadow-sm flex items-center gap-2 mb-6 transition-colors">
                <Camera className="w-4 h-4" /> Start Camera
              </button>

              <div className="w-full border-t border-gray-200 relative mb-4">
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-[11px] text-gray-400 font-medium">Or Upload Photo</span>
              </div>

              <div className="w-full text-left mt-4">
                <div className="flex items-center gap-2">
                  <button className="bg-gray-200 border border-gray-300 text-gray-700 px-2 py-1 text-[12px] rounded-none hover:bg-gray-300">
                    Choose File
                  </button>
                  <span className="text-[12px] text-gray-500">No file chosen</span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AddVisitorEntry;
