import React, { useState } from "react";
import { 
  Info, 
  ExternalLink, 
  Eye, 
  EyeOff, 
  Save, 
  Check, 
  Database,
  User,
  Heart,
  Users
} from "lucide-react";

export default function AdmissionFormFields() {
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  // Grid fields state configuration matching screenshots
  const [fields, setFields] = useState({
    // Academic section
    biometricId: true,
    
    // Personal Info section
    aadhaarId: true,
    penSssmId: true,
    religion: true,
    caste: true,
    subCaste: true,
    motherTongue: true,
    bloodGroup: true,
    placeOfBirth: true,
    bplRteQuota: true,

    // Parents section
    fatherAadhaar: true,
    motherAadhaar: true,
    fatherIncome: true,

    // Health & Bank section
    heightWeight: true,
    bankDetails: true
  });

  const handleToggle = (key) => {
    setFields(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleShowAll = () => {
    const updated = {};
    Object.keys(fields).forEach(key => {
      updated[key] = true;
    });
    setFields(updated);
    setToastMsg("All fields have been enabled.");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleHideAll = () => {
    const updated = {};
    Object.keys(fields).forEach(key => {
      updated[key] = false;
    });
    setFields(updated);
    setToastMsg("All optional fields have been disabled.");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    setToastMsg("Admission form fields visibility settings saved successfully!");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-4 font-sans text-gray-800 relative">
      
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 right-6 bg-slate-900 text-white px-4 py-3 rounded-none shadow-lg flex items-center gap-2 border border-slate-700/50 animate-bounce z-50 text-xs">
          <Check className="w-4 h-4 text-emerald-400" />
          <span className="font-bold">{toastMsg}</span>
        </div>
      )}

      {/* Header bar */}
      <div className="flex justify-between items-center mb-1">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Admission Form Fields</h1>
        </div>
        <button
          onClick={() => window.open("/students/admission", "_blank")}
          className="px-4 py-2 border border-slate-300 text-slate-750 bg-white hover:bg-slate-50 font-bold text-xs rounded-none flex items-center gap-1.5 shadow-3xs cursor-pointer"
        >
          Open Admission Form
          <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
        </button>
      </div>

      {/* Alert Info Banner block */}
      <div className="bg-[#f8f9fa] border-l-4 border-slate-700 rounded-r p-4 text-[11px] font-semibold text-slate-650 leading-relaxed flex items-start gap-3 shadow-3xs">
        <Info className="w-4.5 h-4.5 text-slate-700 flex-shrink-0 mt-0.5" />
        <div>
          Untick a field to <span className="font-extrabold text-slate-850">hide</span> it from the student admission form, the student profile view, and the printed admission form. Only optional fields can be hidden — required fields (name, class, admission number, ...) are always shown. <span className="font-extrabold text-slate-850">Existing saved data is never deleted</span>; hiding a field only stops it being displayed or entered.
        </div>
      </div>

      {/* Show/Hide Bulk Toolbar */}
      <div className="flex justify-end gap-2 pr-1">
        <button
          onClick={handleShowAll}
          className="px-3.5 py-1.5 border border-gray-300 text-slate-700 bg-white font-bold rounded-none hover:bg-slate-50 transition-all flex items-center gap-1.5 shadow-3xs cursor-pointer text-xs"
        >
          <Check className="w-3.5 h-3.5 text-slate-500" />
          Show all
        </button>
        <button
          onClick={handleHideAll}
          className="px-3.5 py-1.5 border border-gray-300 text-slate-700 bg-white font-bold rounded-none hover:bg-slate-50 transition-all flex items-center gap-1.5 shadow-3xs cursor-pointer text-xs"
        >
          <EyeOff className="w-3.5 h-3.5 text-slate-500" />
          Hide all
        </button>
      </div>

      <form onSubmit={handleSaveChanges} className="space-y-5 pb-16">
        
        {/* Row 1: Academic & Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
          
          {/* Card: Academic */}
          <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs min-h-[160px]">
            <div className="flex items-center gap-2 text-slate-800 border-b pb-2.5 mb-4">
              <Database className="w-4 h-4 text-slate-500" />
              <h3 className="font-bold text-xs text-slate-850">Academic</h3>
            </div>
            
            {/* Switch wrapper */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleToggle("biometricId")}
                className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-none border-2 border-transparent transition-colors duration-150 ease-in-out focus:outline-none ${fields.biometricId ? 'bg-[#007bff]' : 'bg-slate-200'}`}
              >
                <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-none bg-white transition duration-150 ease-in-out ${fields.biometricId ? 'translate-x-4' : 'translate-x-0'}`} />
              </button>
              <span className="text-xs font-bold text-slate-750">Biometric ID</span>
            </div>
          </div>

          {/* Card: Personal Info */}
          <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs space-y-4">
            <div className="flex items-center gap-2 text-slate-800 border-b pb-2.5 mb-2">
              <User className="w-4 h-4 text-slate-500" />
              <h3 className="font-bold text-xs text-slate-850">Personal Info</h3>
            </div>

            {/* Switch list */}
            <div className="space-y-4">
              
              {/* Aadhaar */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleToggle("aadhaarId")}
                  className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-none border-2 border-transparent transition-colors duration-150 ease-in-out focus:outline-none ${fields.aadhaarId ? 'bg-[#007bff]' : 'bg-slate-200'}`}
                >
                  <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-none bg-white transition duration-150 ease-in-out ${fields.aadhaarId ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
                <span className="text-xs font-bold text-slate-750">Aadhaar / National ID</span>
              </div>

              {/* PEN / SSSM */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleToggle("penSssmId")}
                  className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-none border-2 border-transparent transition-colors duration-150 ease-in-out focus:outline-none ${fields.penSssmId ? 'bg-[#007bff]' : 'bg-slate-200'}`}
                >
                  <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-none bg-white transition duration-150 ease-in-out ${fields.penSssmId ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
                <span className="text-xs font-bold text-slate-750">PEN / SSSM ID</span>
              </div>

              {/* Religion */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleToggle("religion")}
                  className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-none border-2 border-transparent transition-colors duration-150 ease-in-out focus:outline-none ${fields.religion ? 'bg-[#007bff]' : 'bg-slate-200'}`}
                >
                  <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-none bg-white transition duration-150 ease-in-out ${fields.religion ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
                <span className="text-xs font-bold text-slate-750">Religion</span>
              </div>

              {/* Caste */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleToggle("caste")}
                  className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-none border-2 border-transparent transition-colors duration-150 ease-in-out focus:outline-none ${fields.caste ? 'bg-[#007bff]' : 'bg-slate-200'}`}
                >
                  <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-none bg-white transition duration-150 ease-in-out ${fields.caste ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
                <span className="text-xs font-bold text-slate-750">Caste</span>
              </div>

              {/* Sub-Caste */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleToggle("subCaste")}
                  className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-none border-2 border-transparent transition-colors duration-150 ease-in-out focus:outline-none ${fields.subCaste ? 'bg-[#007bff]' : 'bg-slate-200'}`}
                >
                  <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-none bg-white transition duration-150 ease-in-out ${fields.subCaste ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
                <span className="text-xs font-bold text-slate-750">Sub-Caste</span>
              </div>

              {/* Mother Tongue */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleToggle("motherTongue")}
                  className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-none border-2 border-transparent transition-colors duration-150 ease-in-out focus:outline-none ${fields.motherTongue ? 'bg-[#007bff]' : 'bg-slate-200'}`}
                >
                  <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-none bg-white transition duration-150 ease-in-out ${fields.motherTongue ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
                <span className="text-xs font-bold text-slate-750">Mother Tongue</span>
              </div>

              {/* Blood Group */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleToggle("bloodGroup")}
                  className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-none border-2 border-transparent transition-colors duration-150 ease-in-out focus:outline-none ${fields.bloodGroup ? 'bg-[#007bff]' : 'bg-slate-200'}`}
                >
                  <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-none bg-white transition duration-150 ease-in-out ${fields.bloodGroup ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
                <span className="text-xs font-bold text-slate-750">Blood Group</span>
              </div>

              {/* Place of birth */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleToggle("placeOfBirth")}
                  className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-none border-2 border-transparent transition-colors duration-150 ease-in-out focus:outline-none ${fields.placeOfBirth ? 'bg-[#007bff]' : 'bg-slate-200'}`}
                >
                  <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-none bg-white transition duration-150 ease-in-out ${fields.placeOfBirth ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
                <span className="text-xs font-bold text-slate-750">Place of Birth</span>
              </div>

              {/* BPL / RTE Quota */}
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => handleToggle("bplRteQuota")}
                  className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-none border-2 border-transparent transition-colors duration-150 ease-in-out focus:outline-none mt-0.5 ${fields.bplRteQuota ? 'bg-[#007bff]' : 'bg-slate-200'}`}
                >
                  <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-none bg-white transition duration-150 ease-in-out ${fields.bplRteQuota ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
                <div>
                  <span className="text-xs font-bold text-slate-750 block">BPL / RTE quota</span>
                  <p className="text-[10px] text-slate-400 font-semibold leading-normal mt-0.5">
                    Hides both the Below Poverty Line and Right to Education checkboxes.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Row 2: Parents & Health/Bank */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
          
          {/* Card: Parents */}
          <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs space-y-4">
            <div className="flex items-center gap-2 text-slate-800 border-b pb-2.5 mb-2">
              <Users className="w-4 h-4 text-slate-500" />
              <h3 className="font-bold text-xs text-slate-850">Parents</h3>
            </div>

            <div className="space-y-4">
              
              {/* Father Aadhaar */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleToggle("fatherAadhaar")}
                  className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-none border-2 border-transparent transition-colors duration-150 ease-in-out focus:outline-none ${fields.fatherAadhaar ? 'bg-[#007bff]' : 'bg-slate-200'}`}
                >
                  <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-none bg-white transition duration-150 ease-in-out ${fields.fatherAadhaar ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
                <span className="text-xs font-bold text-slate-750">Father Aadhaar No.</span>
              </div>

              {/* Mother Aadhaar */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleToggle("motherAadhaar")}
                  className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-none border-2 border-transparent transition-colors duration-150 ease-in-out focus:outline-none ${fields.motherAadhaar ? 'bg-[#007bff]' : 'bg-slate-200'}`}
                >
                  <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-none bg-white transition duration-150 ease-in-out ${fields.motherAadhaar ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
                <span className="text-xs font-bold text-slate-750">Mother Aadhaar No.</span>
              </div>

              {/* Father Income */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleToggle("fatherIncome")}
                  className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-none border-2 border-transparent transition-colors duration-150 ease-in-out focus:outline-none ${fields.fatherIncome ? 'bg-[#007bff]' : 'bg-slate-200'}`}
                >
                  <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-none bg-white transition duration-150 ease-in-out ${fields.fatherIncome ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
                <span className="text-xs font-bold text-slate-750">Father Annual Income</span>
              </div>

            </div>
          </div>

          {/* Card: Health & Bank */}
          <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs space-y-4">
            <div className="flex items-center gap-2 text-slate-800 border-b pb-2.5 mb-2">
              <Heart className="w-4 h-4 text-slate-500" />
              <h3 className="font-bold text-xs text-slate-850">Health & Bank</h3>
            </div>

            <div className="space-y-4">
              
              {/* Height & Weight */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleToggle("heightWeight")}
                  className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-none border-2 border-transparent transition-colors duration-150 ease-in-out focus:outline-none ${fields.heightWeight ? 'bg-[#007bff]' : 'bg-slate-200'}`}
                >
                  <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-none bg-white transition duration-150 ease-in-out ${fields.heightWeight ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
                <span className="text-xs font-bold text-slate-750">Height & Weight</span>
              </div>

              {/* Student Bank Details */}
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => handleToggle("bankDetails")}
                  className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-none border-2 border-transparent transition-colors duration-150 ease-in-out focus:outline-none mt-0.5 ${fields.bankDetails ? 'bg-[#007bff]' : 'bg-slate-200'}`}
                >
                  <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-none bg-white transition duration-150 ease-in-out ${fields.bankDetails ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
                <div>
                  <span className="text-xs font-bold text-slate-750 block">Student Bank Details</span>
                  <p className="text-[10px] text-slate-400 font-semibold leading-normal mt-0.5">
                    Hides Bank Name, Account Number and IFSC Code.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Save changes footer bar */}
        <div className="flex justify-end pt-4 border-t">
          <button 
            type="submit"
            className="px-5 py-2 bg-indigo-650 hover:bg-indigo-700 text-white font-bold text-xs rounded-none shadow-sm flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
          >
            <Save className="w-3.5 h-3.5" />
            Save Changes
          </button>
        </div>

      </form>

    </div>
  );
}
