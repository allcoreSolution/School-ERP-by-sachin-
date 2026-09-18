import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Settings, HelpCircle, Upload, GraduationCap, User, Users, HeartPulse, FileText, Calendar, ShieldCheck, PlusCircle, EyeOff } from 'lucide-react';
import { studentService } from '../../api/studentService';
import Swal from 'sweetalert2';

const StudentAdmission = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('academic');
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const fileInputRef = useRef(null);
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    aparId: '',
    firstName: '',
    middleName: '',
    lastName: '',
    gender: 'Select',
    dateOfBirth: '',
    admissionNo: '',
    rollNo: '',
    category: 'General',
    house: '',
    religion: '',
    aadhaar: '',
    caste: '',
    subCaste: '',
    placeOfBirth: '',
    nationality: 'Indian',
    bpl: 'false',
    rte: 'false',
    studentPhone: '',
    studentEmail: '',
    height: '',
    weight: '',
    medicalHistory: '',
    bloodGroup: '',
    admissionDate: new Date().toISOString().split('T')[0],
    classId: '',
    sectionId: '',
  });

  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  
  // Dummy fetch for classes for now - assuming API doesn't exist yet
  // In a real scenario, we'd fetch this from academicService
  useEffect(() => {
    setClasses([
      { _id: 'c1', className: 'Class 1' },
      { _id: 'c2', className: 'Class 2' },
      { _id: 'c3', className: 'Class 3' }
    ]);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked.toString() : value 
    }));
  };

  const handleFinalSubmit = async () => {
    if(!formData.aparId || !formData.firstName || formData.gender === 'Select' || !formData.dateOfBirth) {
       Swal.fire('Validation Error', "Please fill all mandatory fields (*) like Name, Gender, APAR ID, and DOB!", 'warning');
       return;
    }
    try {
      setLoading(true);
      
      // Simulate multipart form data by wrapping in FormData
      const fd = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== '' && formData[key] !== null) {
          fd.append(key, formData[key]);
        }
      });
      
      await studentService.createStudent(fd);
      
      Swal.fire('Success!', 'Student Successfully Admitted to the Database!', 'success').then(() => {
        navigate('/students/list');
      });
    } catch (err) {
      Swal.fire('Submission Failed', err.response?.data?.message || err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'academic', label: '1. Academic', icon: GraduationCap },
    { id: 'personal', label: '2. Personal Info', icon: User },
    { id: 'parents', label: '3. Parents', icon: Users },
    { id: 'health', label: '4. Health', icon: HeartPulse },
    { id: 'documents', label: '5. Documents', icon: FileText },
  ];

  return (
    <div className="p-6 h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Student Admission</h1>
        <div className="flex gap-3 relative">
          <button 
            onClick={() => setIsCustomizeOpen(!isCustomizeOpen)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-none bg-white text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium shadow-sm"
          >
            <Settings className="w-4 h-4" /> Customize Form
          </button>
          
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-[#5F52FF] text-white rounded-none hover:bg-[#4E41E6] transition-colors text-sm font-medium shadow-sm"
          >
            <Upload className="w-4 h-4" /> Bulk Upload
          </button>
          <input type="file" ref={fileInputRef} className="hidden" accept="*/*" onChange={(e)=>{if(e.target.files.length) Swal.fire('Ready', 'Bulk upload processing ready', 'info')}} />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex gap-6 flex-1 min-h-0">
        
        {/* Sidebar Tabs */}
        <div className="w-64 flex-shrink-0 flex flex-col gap-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-none text-sm font-semibold transition-colors text-left border ${
                  isActive ? 'bg-[#5F52FF] text-white border-[#5F52FF] shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* Form Content */}
        <div className="flex-1 bg-white rounded-none border border-gray-200 shadow-sm overflow-y-auto relative">
          <div className="absolute top-0 left-0 w-48 h-1.5 bg-[#5F52FF] opacity-80" style={{ background: 'repeating-linear-gradient(45deg, #5F52FF, #5F52FF 10px, #7A70FF 10px, #7A70FF 20px)'}}></div>

          <div className="p-8 mt-2">
            
            {/* ------- ACADEMIC TAB ------- */}
            {activeTab === 'academic' && (
              <div className="animate-fade-in">
                <div className="flex items-center gap-3 text-[#5F52FF] mb-6">
                  <GraduationCap className="w-5 h-5" />
                  <h2 className="font-bold uppercase text-sm tracking-wide">Academic Details</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Admission No <span className="text-red-500">*</span></label>
                    <input type="text" name="admissionNo" value={formData.admissionNo} onChange={handleInputChange} className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#5F52FF]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Roll Number</label>
                    <input type="text" name="rollNo" value={formData.rollNo} onChange={handleInputChange} className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#5F52FF]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Admission Date</label>
                    <input type="date" name="admissionDate" value={formData.admissionDate} onChange={handleInputChange} className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#5F52FF]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Class <span className="text-red-500">*</span></label>
                    <select name="classId" value={formData.classId} onChange={handleInputChange} className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#5F52FF]">
                      <option value="">Select Class</option>
                      {classes.map(c => <option key={c._id} value={c._id}>{c.className}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Section <span className="text-red-500">*</span></label>
                    <select name="sectionId" value={formData.sectionId} onChange={handleInputChange} className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#5F52FF]">
                      <option value="">Select Section</option>
                      <option value="A">Section A</option>
                      <option value="B">Section B</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">RTE Qualified</label>
                    <select name="rte" value={formData.rte} onChange={handleInputChange} className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#5F52FF]">
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* ------- PERSONAL TAB ------- */}
            {activeTab === 'personal' && (
              <div className="animate-fade-in">
                <div className="flex items-center gap-3 text-[#5F52FF] mb-6">
                  <User className="w-5 h-5" />
                  <h2 className="font-bold uppercase text-sm tracking-wide">Personal Information</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">APAR ID <span className="text-red-500">*</span></label>
                    <input type="text" name="aparId" value={formData.aparId} onChange={handleInputChange} className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#5F52FF]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">First Name <span className="text-red-500">*</span></label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#5F52FF]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Last Name</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#5F52FF]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Gender <span className="text-red-500">*</span></label>
                    <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#5F52FF]">
                      <option value="Select">Select</option><option>Male</option><option>Female</option><option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Date of Birth <span className="text-red-500">*</span></label>
                    <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#5F52FF]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Religion</label>
                    <input type="text" name="religion" value={formData.religion} onChange={handleInputChange} className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#5F52FF]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Aadhaar No</label>
                    <input type="text" name="aadhaar" value={formData.aadhaar} onChange={handleInputChange} className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#5F52FF]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone</label>
                    <input type="text" name="studentPhone" value={formData.studentPhone} onChange={handleInputChange} className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#5F52FF]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
                    <input type="email" name="studentEmail" value={formData.studentEmail} onChange={handleInputChange} className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#5F52FF]" />
                  </div>
                </div>
              </div>
            )}

            {/* ------- PARENTS, HEALTH & OTHER PLACEHOLDERS ------- */}
            {(activeTab === 'parents' || activeTab === 'health' || activeTab === 'documents') && (
              <div className="flex flex-col items-center justify-center p-12 text-center text-gray-500 animate-fade-in">
                <ShieldCheck className="w-16 h-16 text-gray-200 mb-4" />
                <h3 className="text-lg font-bold text-gray-700 mb-2">{tabs.find(t=>t.id===activeTab).label} Module API</h3>
                <p className="max-w-md text-sm">
                  This segment will be connected to the specialized Database Collections.
                  For basic student admission processing, Academic and Personal Details are fully ready!
                </p>
              </div>
            )}
           
          </div>
          
          {/* Action Bar inside form container */}
          <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-between items-center z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div className="text-xs text-gray-500 font-medium">* Mandatory completion required for initial admission.</div>
            <button 
              disabled={loading}
              onClick={handleFinalSubmit} 
              className="bg-[#5F52FF] hover:bg-[#4E41E6] text-white px-8 py-2.5 rounded-none font-bold text-sm transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                 <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin flex-shrink-0"></span>
              ) : null}
              {loading ? 'Saving Student...' : 'Confirm & Generate ID'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAdmission;
