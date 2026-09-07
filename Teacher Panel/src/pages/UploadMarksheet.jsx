import React, { useState } from 'react';
import { HelpCircle, FileText, Info, Eye, UploadCloud, Upload } from 'lucide-react';

const UploadMarksheet = () => {
  const [formData, setFormData] = useState({
    class: '', section: '', student: '', examLink: '', docTitle: '', file: null
  });

  const handleUpload = (e) => {
    e.preventDefault();
    if (!formData.class || !formData.section || !formData.student || !formData.examLink || !formData.docTitle) {
      alert("Please fill all required fields.");
      return;
    }
    alert("Marksheet uploaded securely!");
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#f4f7f6] theme-app-bg text-sm">
      {/* Page Header */}
      <div className="px-6 py-5 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">Upload External Marksheet</h1>
        
        <button className="flex items-center gap-2 bg-white border border-[#17a2b8] text-[#17a2b8] px-4 py-1.5 rounded-full shadow-sm hover:bg-[#17a2b8] hover:text-white font-semibold transition-colors">
          <HelpCircle className="w-4 h-4" /> How Uploads Work
        </button>
      </div>

      <div className="px-6 pb-6">
        <div className="bg-white rounded border-t-2 border-t-[#fd7e14] border-x border-b border-gray-200 shadow-sm relative">
          
          <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#007bff]" />
            <h2 className="font-semibold text-[#007bff] text-base">Upload a PDF Marksheet for a Student</h2>
          </div>
          
          <form onSubmit={handleUpload} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-[13px] font-bold text-gray-800 mb-1.5">Class <span className="text-red-500">*</span></label>
                <select 
                  value={formData.class}
                  onChange={e => setFormData({...formData, class: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] text-gray-600 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                >
                  <option value="">-- Select Class --</option>
                  <option value="10">Class 10</option>
                  <option value="9">Class 9</option>
                </select>
              </div>
              
              <div>
                <label className="block text-[13px] font-bold text-gray-800 mb-1.5">Section <span className="text-red-500">*</span></label>
                <select 
                  value={formData.section}
                  onChange={e => setFormData({...formData, section: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] text-gray-600 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                >
                  <option value="">-- Select Class First --</option>
                  {formData.class && <option value="A">Section A</option>}
                  {formData.class && <option value="B">Section B</option>}
                </select>
              </div>
              
              <div>
                <label className="block text-[13px] font-bold text-gray-800 mb-1.5">Student <span className="text-red-500">*</span></label>
                <select 
                  value={formData.student}
                  onChange={e => setFormData({...formData, student: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] text-gray-600 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                >
                  <option value="">-- Select Section First --</option>
                  {formData.section && <option value="101">Aarav Sharma</option>}
                  {formData.section && <option value="102">Neha Gupta</option>}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[13px] font-bold text-gray-800 mb-1.5">Exam / Term Link <span className="text-red-500">*</span></label>
                <select 
                  value={formData.examLink}
                  onChange={e => setFormData({...formData, examLink: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] text-gray-600 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 mb-1.5"
                >
                  <option value="">-- Select Corresponding Exam --</option>
                  <option value="e1">Mid-Term Examination 2025</option>
                  <option value="e2">Final Examination 2024</option>
                </select>
                <p className="flex items-start md:items-center gap-1.5 text-[11px] text-[#17a2b8]">
                  <Info className="w-3.5 h-3.5 flex-shrink-0" /> This ties the PDF to a specific examination history record.
                </p>
              </div>
              
              <div>
                <label className="block text-[13px] font-bold text-gray-800 mb-1.5">Document Title <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={formData.docTitle}
                  onChange={e => setFormData({...formData, docTitle: e.target.value})}
                  placeholder="e.g., Mid-Term Report Card 2025"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 mb-1.5"
                />
                <p className="flex items-start md:items-center gap-1.5 text-[11px] text-[#28a745]">
                  <Eye className="w-3.5 h-3.5 flex-shrink-0" /> This exact title is what the parents will see inside their Mobile App.
                </p>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-[13px] font-bold text-gray-800 mb-1.5">Marksheet PDF File <span className="text-red-500">*</span></label>
              
              <div className="flex items-center w-full mt-1">
                <div className="bg-[#4680ff] w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-l cursor-pointer hover:bg-[#3468d9] transition-colors" onClick={() => document.getElementById('file-upload').click()}>
                  <UploadCloud className="w-5 h-5 text-white" />
                </div>
                
                <div className="flex-1 border-y border-gray-300 bg-white h-10 flex items-center px-4 cursor-pointer overflow-hidden" onClick={() => document.getElementById('file-upload').click()}>
                  <span className="text-[13px] text-gray-500 truncate">
                    {formData.file ? formData.file.name : 'Choose a highly optimized PDF file...'}
                  </span>
                </div>
                
                <div 
                  className="bg-[#f4f7fa] border-y border-r border-gray-300 h-10 px-4 flex items-center justify-center font-semibold text-gray-600 text-[13px] rounded-r cursor-pointer hover:bg-gray-200 transition-colors"
                  onClick={() => document.getElementById('file-upload').click()}
                >
                  Browse
                </div>
                
                <input 
                  id="file-upload" 
                  type="file" 
                  accept=".pdf" 
                  className="hidden" 
                  onChange={e => setFormData({...formData, file: e.target.files[0]})}
                />
              </div>
            </div>

            <div className="border-t border-gray-200 pt-5 flex justify-end">
              <button 
                type="submit"
                className="bg-[#fd7e14] hover:bg-[#e06602] text-white font-semibold flex items-center gap-2 px-6 py-2.5 rounded shadow-sm transition-colors text-[13px]"
              >
                <Upload className="w-4 h-4" /> Securely Upload Marksheet
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadMarksheet;
