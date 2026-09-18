import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Save, UserCheck, ToggleLeft, ToggleRight } from 'lucide-react';

const IssueGatePass = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    student: '',
    reason: '',
    leavingAt: '2026-08-22T15:48',
    note: '',
    collectorName: '',
    relation: '',
    mobile: '',
    idProof: '',
    effectOnAttendance: 'Decide automatically',
    gate: 'Main Gate',
    comingBackToday: true,
    internalNotes: ''
  });

  return (
    <div className="flex flex-col h-full bg-[#f4f6f8] overflow-y-auto">
      
      {/* Header */}
      <div className="px-8 pt-6 pb-6 bg-white border-b border-gray-200 shrink-0">
        <h1 className="text-2xl font-bold text-[#1a1a2e]">Issue Gate Pass</h1>
        <p className="text-[13px] text-gray-500 mt-1">Authorise a student to leave campus before dismissal</p>
      </div>

      <div className="p-8 w-full max-w-6xl mx-auto">
        
        <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden mb-8">
          
          <div className="p-4 border-b border-gray-200 bg-white">
            <h2 className="text-[14px] font-bold text-[#5F52FF] flex items-center gap-2">
              <CreditCard className="w-4 h-4" /> Student Exit Pass
            </h2>
          </div>

          <div className="p-6">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="md:col-span-1">
                <label className="block text-[12px] font-bold text-gray-700 mb-1.5">
                  Student <span className="text-red-500">*</span>
                </label>
                <select 
                  value={formData.student}
                  onChange={(e) => setFormData({...formData, student: e.target.value})}
                  className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF] bg-white"
                >
                  <option value="">Search student by name or admission no...</option>
                  <option value="Ishaan Gupta">Ishaan Gupta (YISADM-006)</option>
                  <option value="Aarav Chaudhary">Aarav Chaudhary (YISADM-007)</option>
                </select>
                <p className="text-[10px] text-gray-400 mt-1">Search by name or admission number.</p>
              </div>
              
              <div className="md:col-span-1">
                <label className="block text-[12px] font-bold text-gray-700 mb-1.5">
                  Reason <span className="text-red-500">*</span>
                </label>
                <select 
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF] bg-white"
                >
                  <option value="">Select reason</option>
                  <option value="Sick / unwell">Sick / unwell</option>
                  <option value="Parent pickup">Parent pickup</option>
                  <option value="Doctor appointment">Doctor appointment</option>
                </select>
              </div>

              <div className="md:col-span-1">
                <label className="block text-[12px] font-bold text-gray-700 mb-1.5">
                  Leaving at
                </label>
                <input 
                  type="datetime-local" 
                  value={formData.leavingAt}
                  onChange={(e) => setFormData({...formData, leavingAt: e.target.value})}
                  className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF]" 
                />
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Note</label>
              <input 
                type="text" 
                placeholder="Anything the gate should know"
                value={formData.note}
                onChange={(e) => setFormData({...formData, note: e.target.value})}
                className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF]" 
              />
            </div>

            <h3 className="text-[13px] font-bold text-gray-700 flex items-center gap-2 mb-1 uppercase tracking-wide">
              <UserCheck className="w-4 h-4 text-[#5F52FF]" /> WHO IS COLLECTING THE CHILD
            </h3>
            <p className="text-[11px] text-gray-400 mb-4">This block is the school's record of the handover. Fill it in from the ID the person is carrying, not from what they say.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-[12px] font-bold text-gray-700 mb-1.5">
                  Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={formData.collectorName}
                  onChange={(e) => setFormData({...formData, collectorName: e.target.value})}
                  className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF]" 
                />
              </div>
              
              <div>
                <label className="block text-[12px] font-bold text-gray-700 mb-1.5">
                  Relation to student <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Father, Uncle, Driver..."
                  value={formData.relation}
                  onChange={(e) => setFormData({...formData, relation: e.target.value})}
                  className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF]" 
                />
              </div>

              <div>
                <label className="block text-[12px] font-bold text-gray-700 mb-1.5">
                  Mobile number <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={formData.mobile}
                  onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                  className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF]" 
                />
              </div>

              <div className="md:col-span-1">
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

              <div className="md:col-span-2">
                <label className="block text-[12px] font-bold text-gray-700 mb-1.5">
                  Photo
                </label>
                <div className="flex items-center gap-3">
                  <input type="file" className="text-[12px] text-gray-600 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-[12px] file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer" />
                </div>
                <p className="text-[10px] text-gray-400 mt-1">Optional on this school's settings.</p>
              </div>
            </div>

            <hr className="my-6 border-gray-100" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Effect on attendance</label>
                <select 
                  value={formData.effectOnAttendance}
                  onChange={(e) => setFormData({...formData, effectOnAttendance: e.target.value})}
                  className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF] bg-white"
                >
                  <option value="Decide automatically">Decide automatically</option>
                  <option value="Mark absent">Mark absent</option>
                  <option value="Mark half day">Mark half day</option>
                </select>
                <p className="text-[10px] text-gray-400 mt-1">Left automatic, the exit time decides: Absent before 10:00 AM, Half Day before 12:30 PM.</p>
              </div>
              
              <div>
                <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Gate</label>
                <select 
                  value={formData.gate}
                  onChange={(e) => setFormData({...formData, gate: e.target.value})}
                  className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF] bg-white"
                >
                  <option value="Main Gate">Main Gate</option>
                  <option value="Back Gate">Back Gate</option>
                </select>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Coming back today?</label>
                <div 
                  className="flex items-center gap-2 cursor-pointer mt-1"
                  onClick={() => setFormData({...formData, comingBackToday: !formData.comingBackToday})}
                >
                  {formData.comingBackToday ? (
                    <ToggleRight className="w-6 h-6 text-green-500" />
                  ) : (
                    <ToggleLeft className="w-6 h-6 text-gray-400" />
                  )}
                  <span className="text-[13px] text-gray-600">Expect a return the same day</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-bold text-gray-700 mb-1.5">Internal notes</label>
              <textarea 
                rows={3} 
                value={formData.internalNotes}
                onChange={(e) => setFormData({...formData, internalNotes: e.target.value})}
                className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF] resize-none"
              ></textarea>
            </div>

          </div>

          <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
            <button 
              onClick={() => navigate('/front-office/gate-passes')}
              className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-none text-[14px] font-bold hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={() => { alert('Pass issued successfully!'); navigate('/front-office/gate-passes'); }}
              className="bg-[#5F52FF] text-white px-6 py-2.5 rounded-none text-[14px] font-bold hover:bg-[#4E41E6] shadow-sm flex items-center gap-2 transition-colors"
            >
              <CreditCard className="w-5 h-5" /> Issue Pass
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default IssueGatePass;
