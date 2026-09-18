import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HardHat, Calendar, UserCheck } from 'lucide-react';

const RegisterCampusWorker = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: id ? 'Rahul Singh' : '',
    mobile: id ? '9876543210' : '',
    workType: id ? 'Housekeeping' : '',
    agency: id ? 'Who employs them' : '',
    agencyContact: id ? 'Supervisor to call' : '',
    idProof: id ? '1234' : '',
    fromDate: '2026-08-22',
    untilDate: '2026-08-22',
    verificationOnRecord: false,
    verifiedOn: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Campus worker ${id ? 'updated' : 'registered'} successfully!`);
    navigate('/front-office/campus-workers');
  };

  return (
    <div className="flex flex-col h-full bg-[#f4f6f8] overflow-y-auto">
      
      {/* Header */}
      <div className="px-8 pt-6 pb-6 bg-white border-b border-gray-200 shrink-0">
        <h1 className="text-2xl font-bold text-[#1a1a2e]">
          {id ? 'Edit Campus Worker' : 'Register Campus Worker'}
        </h1>
        <p className="text-[13px] text-gray-500 mt-1">Contract and third-party people — housekeeping, canteen, security, a one-day repair</p>
      </div>

      <div className="p-8 w-full max-w-6xl mx-auto">
        <form onSubmit={handleSubmit}>
          
          <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden mb-6">
            <div className="p-4 border-b border-gray-200 bg-white">
              <h2 className="text-[14px] font-bold text-[#5F52FF] flex items-center gap-2">
                <HardHat className="w-4 h-4" /> Worker Details
              </h2>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1.5">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF]" 
                    required
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1.5">
                    Mobile number
                  </label>
                  <input 
                    type="text" 
                    value={formData.mobile}
                    onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                    className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF]" 
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1.5">
                    Type of work <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text"
                    placeholder="housekeeping"
                    value={formData.workType}
                    onChange={(e) => setFormData({...formData, workType: e.target.value})}
                    className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF]" 
                    required
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1.5">
                    Agency / contractor
                  </label>
                  <input 
                    type="text" 
                    placeholder="Who employs them"
                    value={formData.agency}
                    onChange={(e) => setFormData({...formData, agency: e.target.value})}
                    className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF]" 
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1.5">
                    Agency contact
                  </label>
                  <input 
                    type="text" 
                    placeholder="Supervisor to call about them"
                    value={formData.agencyContact}
                    onChange={(e) => setFormData({...formData, agencyContact: e.target.value})}
                    className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF]" 
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1.5">
                    ID proof
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. Aadhaar last 4 / DL number"
                    value={formData.idProof}
                    onChange={(e) => setFormData({...formData, idProof: e.target.value})}
                    className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF]" 
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden mb-6">
            <div className="p-4 border-b border-gray-200 bg-white">
              <h2 className="text-[13px] font-bold text-gray-700 flex items-center gap-2 uppercase tracking-wide">
                <Calendar className="w-4 h-4 text-[#5F52FF]" /> HOW LONG ARE THEY HERE?
              </h2>
              <p className="text-[11px] text-gray-400 mt-1">Leave both dates on today for a one-off worker. For a contract, set the end date — the gate refuses the badge automatically the day after it passes.</p>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1.5">
                    From <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="date" 
                    value={formData.fromDate}
                    onChange={(e) => setFormData({...formData, fromDate: e.target.value})}
                    className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF]" 
                    required
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1.5">
                    Until <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="date" 
                    value={formData.untilDate}
                    onChange={(e) => setFormData({...formData, untilDate: e.target.value})}
                    className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF]" 
                    required
                  />
                  <p className="text-[10px] text-gray-400 mt-1">One day only.</p>
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1.5">
                    Photo <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <input type="file" className="text-[12px] text-gray-600 file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-[12px] file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer" />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">Required for anyone here more than one day — a badge with no photo verifies nothing.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden mb-6">
            <div className="p-4 border-b border-gray-200 bg-white">
              <h2 className="text-[13px] font-bold text-gray-700 flex items-center gap-2 uppercase tracking-wide">
                <UserCheck className="w-4 h-4 text-[#5F52FF]" /> POLICE VERIFICATION
              </h2>
              <p className="text-[11px] text-gray-400 mt-1">Not recording this does not block anyone — the register and the gate simply flag them, so the office can chase the agency.</p>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="flex items-center gap-2 cursor-pointer pt-6">
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        className="sr-only" 
                        checked={formData.verificationOnRecord}
                        onChange={(e) => setFormData({...formData, verificationOnRecord: e.target.checked})}
                      />
                      <div className={`block w-10 h-6 rounded-none transition-colors ${formData.verificationOnRecord ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-none transition-transform ${formData.verificationOnRecord ? 'transform translate-x-4' : ''}`}></div>
                    </div>
                    <span className="text-[13px] font-bold text-gray-700">Verification on record</span>
                  </label>
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1.5">
                    Verified on
                  </label>
                  <input 
                    type="date" 
                    value={formData.verifiedOn}
                    onChange={(e) => setFormData({...formData, verifiedOn: e.target.value})}
                    className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF]" 
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1.5">
                    Document
                  </label>
                  <div className="flex items-center gap-3">
                    <input type="file" className="text-[12px] text-gray-600 file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-[12px] file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Notes</label>
                <textarea 
                  rows={4} 
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF] resize-none"
                ></textarea>
              </div>

            </div>

            <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
              <button 
                type="button"
                onClick={() => navigate('/front-office/campus-workers')}
                className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-none text-[14px] font-bold hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="bg-[#5F52FF] text-white px-6 py-2.5 rounded-none text-[14px] font-bold hover:bg-[#4E41E6] shadow-sm transition-colors"
              >
                {id ? 'Update Badge' : 'Register & Issue Badge'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterCampusWorker;
