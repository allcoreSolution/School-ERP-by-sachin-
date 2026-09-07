import React, { useState } from 'react';
import { ArrowLeft, Image as ImageIcon, Eye, Info, Printer, FileText } from 'lucide-react';

const Certificates = () => {
  const [formData, setFormData] = useState({
    class: '', section: '', student: '', template: '', layout: 'ID Card Grid', archive: false,
    cardSize: 'Use template size', paper: 'A4 (210 x 297 mm)', orientation: 'Portrait', margin: '10', gap: '3',
    cutMarks: true, alignCenter: true, cutStack: false
  });
  const [previewMode, setPreviewMode] = useState(false);

  const handlePreview = () => {
    if(!formData.class || !formData.section || !formData.student || !formData.template) {
       alert("Please complete Steps 1 & 2 (including Template) to generate a preview.");
       return;
    }
    setPreviewMode(true);
  };

  const handleGenerate = () => {
    if(!formData.class || !formData.section || !formData.student || !formData.template) {
       alert("Please complete the required details before generating the PDF.");
       return;
    }
    alert("PDF generation started! Your document is being processed securely and will download shortly.");
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#f4f7f6] theme-app-bg text-sm">
      
      {/* Header */}
      <div className="px-6 py-5 flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 bg-white">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Generate Documents</h1>
          <p className="text-[13px] text-gray-500 mt-1">Print certificates & ID cards for your students</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded shadow-sm text-sm font-semibold hover:bg-gray-50 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Templates
        </button>
      </div>

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        
        {/* Main Form & Preview Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Step 1 & 2 */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Step 1 */}
            <div className="bg-white p-5 rounded border border-gray-200 shadow-sm">
              <div className="flex gap-3 mb-4">
                <div className="w-6 h-6 rounded-full bg-[#f4f7f6] border border-gray-200 text-[#5D5CFF] font-bold text-xs flex items-center justify-center flex-shrink-0">1</div>
                <div>
                  <h3 className="font-bold text-gray-800 text-[14px]">Who is this for?</h3>
                  <p className="text-gray-500 text-[12px]">Pick a class & section, then a single student or the whole section.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4 pl-9">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wide mb-1">Class</label>
                  <select 
                    value={formData.class}
                    onChange={e => setFormData({...formData, class: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] focus:outline-none focus:border-blue-400"
                  >
                    <option value="">Select class...</option>
                    <option value="X">Class X</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wide mb-1">Section</label>
                  <select 
                    value={formData.section}
                    onChange={e => setFormData({...formData, section: e.target.value})}
                    disabled={!formData.class}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] disabled:bg-gray-100 disabled:text-gray-400 focus:outline-none focus:border-blue-400"
                  >
                    <option value="">{formData.class ? "Select section..." : "Select a class first"}</option>
                    {formData.class && <option value="A">Section A</option>}
                    {formData.class && <option value="B">Section B</option>}
                  </select>
                </div>
              </div>
              <div className="pl-9">
                <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wide mb-1">Student</label>
                <select 
                  value={formData.student}
                  onChange={e => setFormData({...formData, student: e.target.value})}
                  disabled={!formData.section}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] disabled:bg-gray-100 disabled:text-gray-400 focus:outline-none focus:border-blue-400"
                >
                  <option value="">{formData.section ? "Select student..." : "Select a section first"}</option>
                  {formData.section && <option value="whole">Whole Section</option>}
                  {formData.section && <option value="1">Aarav Sharma</option>}
                  {formData.section && <option value="2">Neha Gupta</option>}
                </select>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-5 rounded border border-gray-200 shadow-sm">
              <div className="flex gap-3 mb-4">
                <div className="w-6 h-6 rounded-full bg-[#f4f7f6] border border-gray-200 text-[#5D5CFF] font-bold text-xs flex items-center justify-center flex-shrink-0">2</div>
                <div>
                  <h3 className="font-bold text-gray-800 text-[14px]">Choose a design</h3>
                  <p className="text-gray-500 text-[12px]">Select a template and how it should be laid out.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-5 pl-9">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wide mb-1">Template</label>
                  <select 
                    value={formData.template}
                    onChange={e => { setFormData({...formData, template: e.target.value}); setPreviewMode(false); }}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] focus:outline-none focus:border-blue-400"
                  >
                    <option value="">Select template...</option>
                    <option value="ID Card">Standard ID Card</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wide mb-1">Layout</label>
                  <select 
                    value={formData.layout}
                    onChange={e => setFormData({...formData, layout: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] focus:outline-none focus:border-blue-400"
                  >
                    <option>ID Card Grid</option>
                    <option>Single per page</option>
                  </select>
                </div>
              </div>

              <div className="pl-9">
                <div className="bg-gray-50 border border-gray-200 rounded p-4 flex items-center gap-3">
                  <button 
                    onClick={() => setFormData({...formData, archive: !formData.archive})}
                    className={`w-10 h-5 rounded-full relative transition-colors ${formData.archive ? 'bg-green-500' : 'bg-red-500'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${formData.archive ? 'left-5' : 'left-0.5'}`}></div>
                  </button>
                  <div>
                    <span className="font-bold text-gray-800 text-[13px]">Archive a digital copy</span>
                    <span className="text-gray-500 text-[12px] ml-1">Saves an exact replica to the system for future auditing and re-downloads.</span>
                  </div>
                </div>
              </div>
            </div>
            
          </div>

          {/* Right Column: Live Preview */}
          <div className="bg-white p-5 rounded border border-gray-200 shadow-sm flex flex-col h-full min-h-[300px]">
            <div className="flex justify-between items-center mb-4">
               <h3 className="font-bold text-gray-500 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                 <Eye className="w-3.5 h-3.5" /> Live Preview
               </h3>
               {previewMode && <span className="bg-green-100 text-green-700 px-2 py-0.5 text-[10px] uppercase font-bold rounded">Live Status: Ready</span>}
            </div>
            
            <div className={`flex-1 ${previewMode ? 'border border-gray-200' : 'border-2 border-dashed border-gray-200'} rounded flex flex-col items-center justify-center p-6 bg-gray-50/50 relative overflow-hidden transition-all delay-75`}>
              {previewMode ? (
                <div className="bg-white border border-gray-200 w-full max-w-[200px] h-full max-h-[320px] rounded-md shadow flex flex-col items-center p-4">
                   <div className="w-16 h-16 bg-blue-100 rounded-full border border-blue-200 mb-3 flex items-center justify-center overflow-hidden">
                      <div className="w-8 h-8 rounded-full bg-blue-300"></div>
                   </div>
                   <h4 className="font-bold text-gray-800 text-[14px]">YUG INTL. SCHOOL</h4>
                   <div className="w-8 h-0.5 bg-blue-600 my-2"></div>
                   <p className="font-bold text-gray-700 text-sm">{formData.student==='1' ? 'Aarav Sharma' : formData.student==='2' ? 'Neha Gupta' : 'Student Name'}</p>
                   <p className="text-[11px] text-gray-500 mt-1 uppercase font-semibold">CLASS: {formData.class} - {formData.section}</p>
                   <p className="text-[11px] text-gray-500 uppercase font-semibold">Roll: 10{formData.student}</p>
                   <div className="mt-auto pt-4 flex flex-col items-center">
                      <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=12345" alt="QR Code" className="w-12 h-12 opacity-80" />
                   </div>
                </div>
              ) : (
                <div className="text-center">
                  <ImageIcon className="w-12 h-12 text-gray-300 mb-3 mx-auto" />
                  <p className="text-gray-400 text-[13px]">Select a template and click "Print Preview" below.</p>
                </div>
              )}
            </div>
          </div>
          
        </div>

        {/* Bottom Container: Step 3 */}
        <div className="bg-white p-5 rounded border border-gray-200 shadow-sm">
          <div className="flex gap-3 mb-4">
            <div className="w-6 h-6 rounded-full bg-[#f4f7f6] border border-gray-200 text-[#5D5CFF] font-bold text-xs flex items-center justify-center flex-shrink-0">3</div>
            <div>
              <h3 className="font-bold text-gray-800 text-[14px]">Sheet & cutting setup</h3>
              <p className="text-gray-500 text-[12px]">Fine-tune the paper, card size and cut marks. Sensible defaults are ready to go.</p>
            </div>
          </div>

          <div className="pl-9">
            <div className="border border-gray-200 rounded">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 font-bold text-gray-700 text-[13px] flex items-center gap-2">
                <Printer className="w-4 h-4" /> Print Layout — Sheet & Card Setup
              </div>
              <div className="p-4 flex flex-wrap gap-5 items-start bg-white">
                
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wide mb-1">Card Size</label>
                  <select className="w-full border border-gray-300 rounded px-2 py-1.5 text-[13px] bg-white">
                    <option>Use template size (not set — defaults to CR80 Portrait)</option>
                  </select>
                </div>
                
                <div className="flex-1 min-w-[150px]">
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wide mb-1">Paper</label>
                  <select className="w-full border border-gray-300 rounded px-2 py-1.5 text-[13px] bg-white">
                    <option>A4 (210 x 297 mm)</option>
                  </select>
                </div>

                <div className="flex-1 min-w-[120px]">
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wide mb-1">Sheet Orientation</label>
                  <select className="w-full border border-gray-300 rounded px-2 py-1.5 text-[13px] bg-white">
                    <option>Portrait</option>
                  </select>
                </div>

                <div className="w-24">
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wide mb-1">Margin (mm)</label>
                  <input type="number" defaultValue="10" className="w-full border border-gray-300 rounded px-2 py-1.5 text-[13px]" />
                </div>

                <div className="w-24">
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wide mb-1">Gap (mm)</label>
                  <input type="number" defaultValue="3" className="w-full border border-gray-300 rounded px-2 py-1.5 text-[13px]" />
                </div>

                <div className="w-32 flex flex-col gap-2 pt-1">
                  <label className="flex items-center gap-2 text-[12px] font-semibold text-gray-700 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                    Cut marks
                  </label>
                  <label className="flex items-center gap-2 text-[12px] font-semibold text-gray-700 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                    Align center
                  </label>
                  <label className="flex items-center gap-2 text-[12px] font-semibold text-gray-700 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                    Cut & stack order
                  </label>
                </div>

              </div>
              <div className="bg-gray-50 px-4 py-2 border-t border-gray-200 text-[11px] text-gray-500 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" /> Cards are tiled edge-accurate on the sheet at the physical size above; content auto-scales to fit each card.
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50 border border-gray-200 rounded p-4 shadow-sm">
          <div className="flex items-center gap-2 text-[13px] text-gray-500">
            <Info className="w-4 h-4" /> Opens in a new tab — nothing is saved unless you enable archiving.
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handlePreview}
              className="flex items-center gap-2 bg-white border border-[#5D5CFF] text-[#5D5CFF] px-6 py-2 rounded shadow-sm text-[13px] font-bold hover:bg-[#5D5CFF]/10 transition-colors"
            >
              <Eye className="w-4 h-4" /> Print Preview
            </button>
            <button 
              onClick={handleGenerate}
              className="flex items-center gap-2 bg-[#5D5CFF] border border-[#5D5CFF] text-white px-6 py-2 rounded shadow-sm text-[13px] font-bold hover:bg-[#4b4ad4] transition-colors"
            >
              <FileText className="w-4 h-4" /> Generate PDF
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Certificates;
