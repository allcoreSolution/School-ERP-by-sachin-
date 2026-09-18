import React, { useState, useRef } from 'react';
import { 
  Plus, Upload, Camera, FileText, Key, Settings, Filter, X, 
  Search, Copy, Printer, Eye, Edit2, UserX, Trash2, Users, Send,
  FileSpreadsheet, Download, ChevronDown, List, Grid
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { studentService } from '../../api/studentService';

import Swal from 'sweetalert2';

const StudentList = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [isCredentialsModalOpen, setIsCredentialsModalOpen] = useState(false);

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await studentService.getStudents();
      const dataList = res.data || [];
      const mappedData = dataList.map((s, index) => ({
        id: s._id,
        admNo: s.admissionNo || `ADM-${index + 100}`,
        rollNo: s.rollNo || '-',
        photo: s.profileImg || `https://ui-avatars.com/api/?name=${encodeURIComponent(s.firstName + ' ' + s.lastName)}&background=random`,
        name: `${s.firstName} ${s.lastName}`,
        class: s.academicClass ? s.academicClass.className : 'N/A',
        outcome: s.status || 'Active',
        siblings: 0,
        fatherName: s.fatherName || 'Not Set',
        fatherPhone: s.fatherPhone || '-',
        assigned: '₹ 50,000.00',
        due: '₹ 0.00'
      }));
      setStudents(mappedData);
    } catch (err) {
      console.error("Failed to fetch students", err);
      setError("Could not connect to live backend properly.");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchStudents();
  }, []);

  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSendWhatsApp = () => {
    // Placeholder message for WhatsApp
    const message = encodeURIComponent("Hello! Here are the login credentials for your student portal...");
    window.open(`https://api.whatsapp.com/send?text=${message}`, '_blank');
  };

  return (
    <div className="p-6 h-full flex flex-col bg-gray-100 overflow-hidden">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Student List</h1>
          <div className="flex gap-4 mt-1 text-sm font-medium">
            <span className="text-[#5F52FF]">217 Session Total</span>
            <span className="text-gray-500">280 All Time</span>
            <span className="text-amber-600 flex items-center gap-1"><Users className="w-3 h-3"/> 63 Unassigned</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => navigate('/students/admission')}
            className="flex items-center gap-2 px-4 py-2 bg-[#5F52FF] text-white rounded-none hover:bg-[#4E41E6] transition-colors text-sm font-semibold shadow-sm"
          >
            <Plus className="w-4 h-4" /> Admit Student
          </button>
          
          <button onClick={handleFileUploadClick} className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-none bg-white text-gray-700 hover:bg-gray-50 text-sm font-medium shadow-sm">
            <Upload className="w-4 h-4 text-gray-500" /> Bulk Upload
          </button>
          
          <button onClick={handleFileUploadClick} className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-none bg-white text-gray-700 hover:bg-gray-50 text-sm font-medium shadow-sm">
            <Camera className="w-4 h-4 text-gray-500" /> Bulk Photos
          </button>
          
          <button onClick={handleFileUploadClick} className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-none bg-white text-gray-700 hover:bg-gray-50 text-sm font-medium shadow-sm">
            <FileText className="w-4 h-4 text-gray-500" /> Bulk Docs
          </button>
          
          <button 
            onClick={() => setIsCredentialsModalOpen(true)}
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-none bg-white text-gray-700 hover:bg-gray-50 text-sm font-medium shadow-sm"
          >
            <Key className="w-4 h-4 text-gray-500" /> Credentials
          </button>
          
          {/* Customize Form Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsCustomizeOpen(!isCustomizeOpen)}
              className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-none bg-white text-gray-700 hover:bg-gray-50 text-sm font-medium shadow-sm"
            >
              <Settings className="w-4 h-4 text-gray-500" /> Customize Form <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>
            
            {isCustomizeOpen && (
              <div className="absolute top-full right-0 mt-1 w-64 bg-white border border-gray-200 rounded-none shadow-lg z-20 py-2">
                <div className="text-center px-4 py-1 text-xs text-gray-500 font-medium border-b border-gray-100 mb-2">
                  Tailor the admission form
                </div>
                <Link to="/students/custom-fields" className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-start gap-3">
                  <Plus className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">Add / Edit Fields</div>
                    <div className="text-xs text-gray-500">Create your own extra fields (text, dropdown...)</div>
                  </div>
                </Link>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-start gap-3">
                  <Eye className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0 line-through" />
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">Show / Hide Fields</div>
                    <div className="text-xs text-gray-500">Turn built-in fields on or off</div>
                  </div>
                </button>
              </div>
            )}
          </div>
          
          {/* Hidden File Input */}
          <input type="file" ref={fileInputRef} className="hidden" accept="*/*" onChange={(e) => {
            if(e.target.files[0]) {
              alert(`File ${e.target.files[0].name} ready for processing.`);
              e.target.value = null;
            }
          }}/>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-none border border-gray-200 shadow-sm p-4 mb-4 flex flex-wrap items-end gap-4">
        <div className="flex-1 min-w-[150px]">
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Class</label>
          <select className="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:ring-[#5F52FF] bg-white">
            <option>-- All Classes --</option>
          </select>
        </div>
        <div className="flex-1 min-w-[150px]">
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Section</label>
          <select className="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:ring-[#5F52FF] bg-white text-gray-500">
            <option>-- Select Class First --</option>
          </select>
        </div>
        <div className="flex-1 min-w-[150px]">
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Siblings</label>
          <select className="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:ring-[#5F52FF] bg-white">
            <option>-- All Students --</option>
          </select>
        </div>
        <div className="flex-1 min-w-[150px]">
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Enrollment</label>
          <select className="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:ring-[#5F52FF] bg-white">
            <option>Currently studying</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-6 py-2 bg-[#5F52FF] text-white rounded-none hover:bg-[#4E41E6] transition-colors text-sm font-semibold shadow-sm">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-none hover:bg-gray-50 transition-colors text-sm font-medium shadow-sm">
            <X className="w-4 h-4" /> Clear
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-none border border-gray-200 shadow-sm flex-1 flex flex-col min-h-0 overflow-hidden">
        
        {/* Table Title Bar */}
        <div className="px-5 py-3 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
          <div className="flex items-center gap-2 text-gray-800 font-semibold text-sm">
            <Users className="w-4 h-4 text-[#5F52FF]" /> Student Records
          </div>
          <div className="flex gap-1 border border-gray-200 rounded-none overflow-hidden bg-white">
            <button className="p-1.5 bg-[#eef2ff] text-[#5F52FF]"><List className="w-4 h-4" /></button>
            <button className="p-1.5 text-gray-400 hover:bg-gray-50"><Grid className="w-4 h-4" /></button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600">Show</span>
            <select className="border border-gray-300 rounded-none px-2 py-1 text-sm bg-white">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            
            <div className="flex ml-2 shadow-sm rounded-none overflow-hidden border border-gray-300">
              <button className="px-3 py-1.5 bg-white hover:bg-gray-50 border-r border-gray-300 text-gray-600 flex items-center justify-center" title="Copy"><Copy className="w-3.5 h-3.5" /></button>
              <button className="px-3 py-1.5 bg-white hover:bg-gray-50 border-r border-gray-300 text-gray-600 text-xs font-semibold">CSV</button>
              <button className="px-3 py-1.5 bg-white hover:bg-gray-50 border-r border-gray-300 text-gray-600 text-xs font-semibold">Excel</button>
              <button className="px-3 py-1.5 bg-white hover:bg-gray-50 border-r border-gray-300 text-gray-600 text-xs font-semibold">PDF</button>
              <button className="px-3 py-1.5 bg-white hover:bg-gray-50 text-gray-600 flex items-center justify-center" title="Print"><Printer className="w-3.5 h-3.5" /></button>
            </div>

            <button className="flex items-center gap-1.5 ml-2 px-3 py-1.5 border border-gray-300 rounded-none bg-white text-gray-700 hover:bg-gray-50 text-sm font-medium shadow-sm">
              <Columns className="w-3.5 h-3.5 text-gray-500" /> Columns <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-none bg-gray-50 text-gray-400 text-sm font-medium shadow-sm cursor-not-allowed">
              <Edit2 className="w-3.5 h-3.5" /> Bulk Edit
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-none bg-gray-50 text-gray-400 text-sm font-medium shadow-sm cursor-not-allowed">
              <Trash2 className="w-3.5 h-3.5" /> Bulk Delete
            </button>
          </div>

          <div className="relative">
            <input type="text" placeholder="Search students..." className="border border-gray-300 rounded-none pl-3 pr-8 py-1.5 text-sm focus:ring-[#5F52FF] w-64 shadow-sm" />
            <Search className="w-4 h-4 text-gray-400 absolute right-2.5 top-2" />
          </div>
        </div>

        {/* Table Data */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap min-w-[1200px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-[#5F52FF] uppercase tracking-wider">
                <th className="px-4 py-3 text-center border-r border-gray-200 w-12"><input type="checkbox" className="rounded border-gray-300 text-[#5F52FF] focus:ring-[#5F52FF]" /></th>
                <th className="px-4 py-3 border-r border-gray-200">Adm No.</th>
                <th className="px-4 py-3 border-r border-gray-200">Roll No.</th>
                <th className="px-4 py-3 border-r border-gray-200 text-center">Photo</th>
                <th className="px-4 py-3 border-r border-gray-200">Name</th>
                <th className="px-4 py-3 border-r border-gray-200">Class</th>
                <th className="px-4 py-3 border-r border-gray-200">Outcome</th>
                <th className="px-4 py-3 border-r border-gray-200">Siblings</th>
                <th className="px-4 py-3 border-r border-gray-200">Father Name</th>
                <th className="px-4 py-3 border-r border-gray-200">Father Phone</th>
                <th className="px-4 py-3 border-r border-gray-200">Total Assigned</th>
                <th className="px-4 py-3 border-r border-gray-200">Total Due</th>
                <th className="px-4 py-3 text-center sticky right-0 bg-gray-50 border-l border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {loading ? (
                <tr>
                  <td colSpan="13" className="px-4 py-8 text-center text-gray-500 font-semibold bg-gray-50">
                    <div className="flex justify-center items-center gap-2">
                       <span className="w-4 h-4 rounded-full border-2 border-t-[#5F52FF] border-[#5F52FF]/20 animate-spin"></span>
                       Loading students from database...
                    </div>
                  </td>
                </tr>
              ) : students.length === 0 ? (
                 <tr>
                  <td colSpan="13" className="px-4 py-8 text-center text-gray-500 font-semibold bg-gray-50">
                    No students currently enrolled in the database.
                  </td>
                </tr>
              ) : students.map((student) => (
                <tr key={student.id} className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors">
                  <td className="px-4 py-3 text-center border-r border-gray-100"><input type="checkbox" className="rounded border-gray-300 text-[#5F52FF] focus:ring-[#5F52FF]" /></td>
                  <td className="px-4 py-3 border-r border-gray-100 font-medium text-gray-800">{student.admNo}</td>
                  <td className="px-4 py-3 border-r border-gray-100">{student.rollNo}</td>
                  <td className="px-4 py-3 border-r border-gray-100 text-center">
                    <img src={student.photo} alt={student.name} className="w-8 h-8 rounded-none border border-gray-200 mx-auto object-cover" />
                  </td>
                  <td className="px-4 py-3 border-r border-gray-100 font-medium text-gray-800">{student.name}</td>
                  <td className="px-4 py-3 border-r border-gray-100 text-gray-600">{student.class}</td>
                  <td className="px-4 py-3 border-r border-gray-100">
                    <span className={`inline-flex px-2 py-0.5 text-white text-[11px] font-bold rounded-none shadow-sm tracking-wide ${student.outcome.toLowerCase() === 'active' || student.outcome.toLowerCase() === 'studying' ? 'bg-green-500' : 'bg-gray-400'}`}>
                      {student.outcome.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3 border-r border-gray-100">
                    {student.siblings > 0 ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-cyan-100 text-cyan-700 text-xs font-semibold rounded-none border border-cyan-200">
                        <Users className="w-3.5 h-3.5" /> {student.siblings} Sibling{student.siblings > 1 ? 's' : ''}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3 border-r border-gray-100 text-gray-600">{student.fatherName}</td>
                  <td className="px-4 py-3 border-r border-gray-100 text-gray-600">{student.fatherPhone}</td>
                  <td className="px-4 py-3 border-r border-gray-100 text-gray-600">{student.assigned}</td>
                  <td className="px-4 py-3 border-r border-gray-100">
                    <span className="inline-flex px-2 py-0.5 bg-red-50 text-red-600 text-xs font-semibold rounded-none border border-red-100">
                      {student.due}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center sticky right-0 bg-white border-l border-gray-100 shadow-[-4px_0_6px_-1px_rgba(0,0,0,0.05)]">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1 rounded-none bg-green-50 border border-green-200 text-green-600 hover:bg-green-100" title="View"><Eye className="w-3.5 h-3.5" /></button>
                      <button className="p-1 rounded-none bg-blue-50 border border-blue-200 text-blue-600 hover:bg-blue-100" title="Edit"><Edit2 className="w-3.5 h-3.5" /></button>
                      <button className="p-1 rounded-none bg-amber-50 border border-amber-200 text-amber-600 hover:bg-amber-100" title="Disable Login"><UserX className="w-3.5 h-3.5" /></button>
                      <button onClick={() => {
                         Swal.fire({
                           title: 'Delete Student?',
                           text: 'Are you sure you want to completely delete this student record? This cannot be undone.',
                           icon: 'warning',
                           showCancelButton: true,
                           confirmButtonColor: '#ef4444',
                           cancelButtonColor: '#9ca3af',
                           confirmButtonText: 'Yes, delete it!'
                         }).then(async (result) => {
                           if(result.isConfirmed) {
                              try {
                                await studentService.deleteStudent(student.id);
                                Swal.fire('Deleted!', 'Student record has been deleted.', 'success');
                                fetchStudents(); // Refresh the list
                              } catch(e) {
                                Swal.fire('Error', e.response?.data?.message || e.message, 'error');
                              }
                           }
                         });
                      }} className="p-1 rounded-none bg-red-50 border border-red-200 text-red-600 hover:bg-red-100" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Credentials Modal */}
      {isCredentialsModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-none shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="bg-[#5F52FF] text-white px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-[15px]">
                <Key className="w-5 h-5 fill-white rotate-90" />
                Student & Parent Credentials
              </div>
              <button onClick={() => setIsCredentialsModalOpen(false)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5">
              <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-1.5">Accounts</label>
                  <select className="w-full border border-gray-300 rounded-none px-3 py-1.5 text-sm focus:ring-[#5F52FF] focus:border-[#5F52FF] bg-white">
                    <option>Student & Parent</option>
                    <option>Student Only</option>
                    <option>Parent Only</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-1.5">Which students</label>
                  <select className="w-full border border-gray-300 rounded-none px-3 py-1.5 text-sm focus:ring-[#5F52FF] focus:border-[#5F52FF] bg-white">
                    <option>Selected rows only</option>
                    <option>All in current view</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-800 mb-2">Password handling</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300 text-[#5F52FF] focus:ring-[#5F52FF] w-4 h-4" />
                    Only students who never logged in
                  </label>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300 text-[#5F52FF] focus:ring-[#5F52FF] w-4 h-4" />
                    Force reset password to default
                  </label>
                </div>
              </div>

              <div className="bg-[#109CAE] rounded-none p-3 flex gap-2 text-white text-[13px] leading-relaxed mb-2 shadow-inner">
                <div className="mt-0.5 flex-shrink-0">
                  <div className="w-4 h-4 rounded-none bg-white text-[#109CAE] flex items-center justify-center font-bold text-[10px]">i</div>
                </div>
                <p>
                  Passwords are the import-time defaults (student = admission no + date of birth, parent = mobile number). Students who already logged in are skipped unless you tick <strong>Force reset</strong>. Downloaded files contain live passwords — handle them confidentially.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
              <button className="flex items-center gap-2 border border-red-500 text-red-500 hover:bg-red-50 px-4 py-2 rounded-none text-sm font-semibold transition-colors bg-white">
                <FileText className="w-4 h-4" /> Download PDF slips
              </button>
              <button className="flex items-center gap-2 border border-green-600 text-green-600 hover:bg-green-50 px-4 py-2 rounded-none text-sm font-semibold transition-colors bg-white">
                <FileSpreadsheet className="w-4 h-4" /> Download CSV
              </button>
              <button 
                onClick={handleSendWhatsApp}
                className="flex items-center gap-2 bg-[#5F52FF] text-white hover:bg-[#4E41E6] px-5 py-2 rounded-none text-sm font-semibold shadow-md transition-colors"
              >
                <Send className="w-4 h-4" /> Send <ChevronDown className="w-3.5 h-3.5 ml-1 opacity-80" />
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

// Simple Columns icon since lucide doesn't have an exact match for the one in the UI
const Columns = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
    <path d="M12 3v18"/>
  </svg>
);

export default StudentList;
