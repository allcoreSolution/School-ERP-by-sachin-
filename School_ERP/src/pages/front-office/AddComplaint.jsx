import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AlertCircle, Save } from 'lucide-react';

const AddComplaint = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    type: '',
    description: '',
    date: '',
    assignTo: ''
  });

  useEffect(() => {
    if (isEditMode) {
      // Simulate fetching data for edit
      setFormData({
        name: 'Par',
        phone: '1234567890',
        type: 'Academic',
        description: 'Need assistance with academic schedule.',
        date: '2026-08-13',
        assignTo: 'Amit Sharma'
      });
    }
  }, [isEditMode]);

  return (
    <div className="flex flex-col h-full bg-[#f4f6f8] overflow-y-auto">
      
      {/* Header */}
      <div className="px-8 pt-6 pb-6 bg-white border-b border-gray-200 shrink-0">
        <h1 className="text-2xl font-bold text-[#1a1a2e]">
          {isEditMode ? 'Edit Complaint' : 'Log New Complaint'}
        </h1>
        <p className="text-[13px] text-gray-500 mt-1">
          {isEditMode ? 'Update existing complaint details' : 'Record a complaint received at reception'}
        </p>
      </div>

      <div className="p-8 w-full">
        
        <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden max-w-5xl mx-auto">
          <div className="p-4 border-b border-gray-200 bg-white">
            <h2 className="text-[14px] font-bold text-[#5F52FF] flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> {isEditMode ? 'Edit Complaint' : 'New Complaint'}
            </h2>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            <div>
              <label className="block text-[12px] font-bold text-gray-700 mb-1.5">
                Complainant Name <span className="text-red-500">*</span>
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
                Phone <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF]" 
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[12px] font-bold text-gray-700 mb-1.5">
                Complaint Type <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                placeholder="e.g. Academic, Transport"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF]" 
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[12px] font-bold text-gray-700 mb-1.5">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea 
                rows={5} 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF] resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-[12px] font-bold text-gray-700 mb-1.5">
                Complaint Date <span className="text-red-500">*</span>
              </label>
              <input 
                type="date" 
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF]" 
              />
            </div>

            <div>
              <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Assign To</label>
              <select 
                value={formData.assignTo}
                onChange={(e) => setFormData({...formData, assignTo: e.target.value})}
                className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF] bg-white"
              >
                <option value="">Select Staff</option>
                <option value="Amit Sharma">Amit Sharma</option>
                <option value="Rahul Verma">Rahul Verma</option>
              </select>
            </div>

          </div>

          <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
            <button 
              onClick={() => navigate('/front-office/complaints')}
              className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-none text-[14px] font-bold hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={() => { alert(isEditMode ? 'Complaint updated!' : 'Complaint saved!'); navigate('/front-office/complaints'); }}
              className="bg-[#5F52FF] text-white px-6 py-2.5 rounded-none text-[14px] font-bold hover:bg-[#4E41E6] shadow-sm flex items-center gap-2 transition-colors"
            >
              <Save className="w-5 h-5" /> {isEditMode ? 'Update Complaint' : 'Save Complaint'}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AddComplaint;
