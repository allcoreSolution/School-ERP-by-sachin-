import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Mail, Save } from 'lucide-react';

const AddPostalRecord = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    recordType: 'Receive',
    date: '2026-08-22',
    fromName: '',
    toName: '',
    toAddress: '',
    referenceNo: '',
    notes: ''
  });

  useEffect(() => {
    if (isEditMode) {
      // Simulate fetching data for edit
      setFormData({
        recordType: 'Dispatch',
        date: '2026-08-22',
        fromName: 'School Admin',
        toName: 'Supplier XYZ',
        toAddress: '123 Market St, City',
        referenceNo: 'REF-001',
        notes: 'Monthly order dispatch'
      });
    }
  }, [isEditMode]);

  return (
    <div className="flex flex-col h-full bg-[#f4f6f8] overflow-y-auto">
      
      {/* Header */}
      <div className="px-8 pt-6 pb-6 bg-white border-b border-gray-200 shrink-0">
        <h1 className="text-2xl font-bold text-[#1a1a2e]">
          {isEditMode ? 'Edit Postal Record' : 'Add Postal Record'}
        </h1>
        <p className="text-[13px] text-gray-500 mt-1">
          {isEditMode ? 'Update existing dispatch details' : 'Log an incoming or outgoing dispatch'}
        </p>
      </div>

      <div className="p-8 w-full">
        
        <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden max-w-5xl mx-auto">
          <div className="p-4 border-b border-gray-200 bg-white">
            <h2 className="text-[14px] font-bold text-[#5F52FF] flex items-center gap-2">
              <Mail className="w-4 h-4" /> {isEditMode ? 'Edit Postal Record' : 'New Postal Record'}
            </h2>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            <div>
              <label className="block text-[12px] font-bold text-gray-700 mb-1.5">
                Record Type <span className="text-red-500">*</span>
              </label>
              <select 
                value={formData.recordType}
                onChange={(e) => setFormData({...formData, recordType: e.target.value})}
                className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF] bg-white"
              >
                <option value="Receive">Receive</option>
                <option value="Dispatch">Dispatch</option>
              </select>
            </div>
            
            <div>
              <label className="block text-[12px] font-bold text-gray-700 mb-1.5">
                Date <span className="text-red-500">*</span>
              </label>
              <input 
                type="date" 
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF]" 
              />
            </div>

            <div>
              <label className="block text-[12px] font-bold text-gray-700 mb-1.5">
                From Name <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                value={formData.fromName}
                onChange={(e) => setFormData({...formData, fromName: e.target.value})}
                className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF]" 
              />
            </div>

            <div>
              <label className="block text-[12px] font-bold text-gray-700 mb-1.5">
                To Name <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                value={formData.toName}
                onChange={(e) => setFormData({...formData, toName: e.target.value})}
                className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF]" 
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[12px] font-bold text-gray-700 mb-1.5">
                To Address <span className="text-red-500">*</span>
              </label>
              <textarea 
                rows={3} 
                value={formData.toAddress}
                onChange={(e) => setFormData({...formData, toAddress: e.target.value})}
                className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF] resize-none"
              ></textarea>
            </div>

            <div className="md:col-span-2">
              <label className="block text-[12px] font-bold text-gray-700 mb-1.5">
                Reference Number
              </label>
              <input 
                type="text" 
                value={formData.referenceNo}
                onChange={(e) => setFormData({...formData, referenceNo: e.target.value})}
                className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF]" 
              />
            </div>

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

          <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
            <button 
              onClick={() => navigate('/front-office/postal-records')}
              className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-none text-[14px] font-bold hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={() => { alert(isEditMode ? 'Record updated!' : 'Record saved!'); navigate('/front-office/postal-records'); }}
              className="bg-[#5F52FF] text-white px-6 py-2.5 rounded-none text-[14px] font-bold hover:bg-[#4E41E6] shadow-sm flex items-center gap-2 transition-colors"
            >
              <Save className="w-5 h-5" /> {isEditMode ? 'Update Record' : 'Save Record'}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AddPostalRecord;
