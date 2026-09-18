import React, { useState } from 'react';
import { HelpCircle, FileText, UploadCloud, X, Hand, Smartphone, Eye } from 'lucide-react';

export default function UploadMarksheet() {
  const [showModal, setShowModal] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleUpload = () => {
    alert('Marksheet uploaded securely!');
    setFileName('');
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-10">
      
      {/* Header */}
      <div className="bg-white p-6 border-b border-slate-200 flex justify-between items-center shadow-sm sticky top-0 z-10">
        <h1 className="text-xl font-bold text-slate-800">Upload External Marksheet</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-[#17a2b8] text-[#17a2b8] hover:bg-[#17a2b8]/5 font-bold text-sm rounded-none transition-colors cursor-pointer"
        >
          <HelpCircle className="w-4 h-4" /> How Uploads Work
        </button>
      </div>

      <div className="p-6 max-w-[1200px] mx-auto">
        <div className="bg-white border border-[#fd7e14] rounded-none shadow-sm overflow-hidden">
          
          <div className="px-5 py-4 border-b border-slate-200 flex items-center gap-2 text-[#007bff]">
            <FileText className="w-4 h-4" />
            <h2 className="text-sm font-bold">Upload a PDF Marksheet for a Student</h2>
          </div>

          <div className="p-6 space-y-6">
            
            {/* Top Row: Class, Section, Student */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Class <span className="text-red-500">*</span></label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#fd7e14] bg-white">
                  <option value="">-- Select Class --</option>
                  <option value="6">Class 6th</option>
                  <option value="7">Class 7th</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Section <span className="text-red-500">*</span></label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#fd7e14] bg-white">
                  <option value="">-- Select Class First --</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Student <span className="text-red-500">*</span></label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#fd7e14] bg-white">
                  <option value="">-- Select Section First --</option>
                  <option value="1">Dhruv Agarwal</option>
                  <option value="2">Jay Mehta</option>
                </select>
              </div>
            </div>

            {/* Middle Row: Exam Link, Document Title */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Exam / Term Link <span className="text-red-500">*</span></label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#fd7e14] bg-white">
                  <option value="">-- Select Corresponding Exam --</option>
                  <option value="mid">Mid-Term Exam 2025</option>
                  <option value="final">Final Exam 2026</option>
                </select>
                <p className="text-[11px] text-[#17a2b8] flex items-center gap-1">
                  <span className="font-bold text-xs bg-[#17a2b8] text-white rounded-none w-3.5 h-3.5 flex items-center justify-center">i</span>
                  This ties the PDF to a specific examination history record.
                </p>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800">Document Title <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  placeholder="e.g., Mid-Term Report Card 2025"
                  className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#fd7e14] bg-white"
                />
                <p className="text-[11px] text-[#28a745] flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  This exact title is what the parents will see inside their Mobile App.
                </p>
              </div>
            </div>

            {/* Bottom Row: File Upload */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800">Marksheet PDF File <span className="text-red-500">*</span></label>
              <div className="flex w-full">
                <div className="w-12 bg-[#3498db] flex items-center justify-center text-white rounded-l border border-[#3498db]">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <div className="flex-1 px-3 py-2 border-t border-b border-slate-300 bg-white text-sm text-slate-500 overflow-hidden text-ellipsis whitespace-nowrap">
                  {fileName || 'Choose a highly optimized PDF file...'}
                </div>
                <label className="px-4 py-2 bg-[#ecf0f1] hover:bg-[#dfe6e9] border border-l-0 border-slate-300 text-slate-700 font-medium text-sm rounded-r cursor-pointer transition-colors">
                  Browse
                  <input type="file" accept=".pdf" className="hidden" onChange={handleFileChange} />
                </label>
              </div>
            </div>

          </div>

          {/* Footer Action */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
            <button 
              onClick={handleUpload}
              className="px-6 py-2 bg-[#fd7e14] hover:bg-[#e86e10] text-white font-bold text-sm rounded-none shadow-sm transition-colors cursor-pointer border-none flex items-center gap-2"
            >
              <UploadCloud className="w-4 h-4" /> Securely Upload Marksheet
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4">
          <div className="bg-[#f8f9fa] rounded-none shadow-2xl w-full max-w-3xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
            
            <div className="bg-[#343a40] px-6 py-4 flex justify-between items-center shrink-0">
              <h2 className="text-white font-bold flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#17a2b8]" /> Understanding External Marksheets
              </h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white bg-transparent border-none cursor-pointer">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6">
              <p className="text-sm text-slate-600">
                Most schools fully automate their report cards using our built-in <em>Report Card Setups</em> system. However, this fallback tool exists for absolute override scenarios.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="bg-white border border-slate-200 rounded-none p-5 shadow-sm">
                  <h3 className="font-bold text-[#007bff] flex items-center gap-2 mb-3">
                    <Hand className="w-5 h-5" /> What is this for?
                  </h3>
                  <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                    This module allows you to completely bypass the automatic generation engine and manually upload a static, pre-designed PDF directly to a student's profile.
                  </p>
                  <p className="text-[11px] text-slate-500 italic">
                    Note: Because this bypasses automation, you must unfortunately upload these PDFs completely manually, one student at a time.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-none p-5 shadow-sm">
                  <h3 className="font-bold text-[#28a745] flex items-center gap-2 mb-3">
                    <Smartphone className="w-5 h-5" /> Parent App Integration
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Once successfully uploaded here, this PDF is instantly beamed to the connected Parent Mobile App. It will beautifully appear under the <strong>Report Cards</strong> section precisely locked to the Exam/Term you tied it to.
                  </p>
                </div>

              </div>

              <div className="bg-white border border-slate-200 rounded-none p-5 shadow-sm">
                <h3 className="font-bold text-[#ffc107] flex items-center gap-2 mb-2 border-b border-slate-100 pb-2">
                  <Eye className="w-5 h-5" /> Document Title Visibility
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed pt-2">
                  The <strong>Document Title</strong> you provide here (e.g. "<em>Mid-Term 2025 Marksheet</em>") is not just for your internal records—it is the exact button-label the parent will click to open the document on their phone. Ensure the name is clear and professional!
                </p>
              </div>

            </div>

            <div className="bg-white border-t border-slate-200 px-6 py-4 flex justify-center shrink-0">
              <button 
                onClick={() => setShowModal(false)}
                className="px-8 py-2.5 bg-[#6c757d] hover:bg-[#5a6268] text-white font-bold text-sm rounded-none shadow-sm transition-colors cursor-pointer border-none"
              >
                I Understand
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
