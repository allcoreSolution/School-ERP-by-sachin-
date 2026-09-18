import React, { useState } from 'react';
import { ArrowLeft, Eye, Image as ImageIcon, LayoutGrid, Info, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function GenerateDocument() {
  const navigate = useNavigate();
  const [archive, setArchive] = useState(false);
  const [showPrintLayout, setShowPrintLayout] = useState(true);

  return (
    <div className="bg-[#f4f7fc] min-h-screen font-sans p-6 flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-[24px] font-semibold text-gray-800">Generate Documents</h1>
          <p className="text-gray-500 text-sm mt-1">Print certificates & ID cards for your students</p>
        </div>
        <button 
          onClick={() => navigate('/certificates/templates')}
          className="flex items-center px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-none text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Templates
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column - Steps 1 & 2 */}
        <div className="flex-1 space-y-6">
          <div className="bg-white rounded-none border border-gray-200 shadow-sm p-6">
            
            {/* Step 1 */}
            <div className="mb-8">
              <div className="flex items-start mb-4">
                <div className="w-6 h-6 rounded-none bg-indigo-100 text-[#5542f6] flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-800">Who is this for?</h3>
                  <p className="text-xs text-gray-500">Pick a class & section, then a single student or the whole section.</p>
                </div>
              </div>
              
              <div className="pl-9 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Class</label>
                    <select className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none bg-white focus:border-[#5542f6] focus:ring-1 focus:ring-[#5542f6]">
                      <option>Select class...</option>
                      <option>Class X</option>
                      <option>Class IX</option>
                      <option>Class VIII</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Section</label>
                    <select className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none bg-white focus:border-[#5542f6] focus:ring-1 focus:ring-[#5542f6]">
                      <option>Select section...</option>
                      <option>Section A</option>
                      <option>Section B</option>
                      <option>Section C</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Student</label>
                  <select className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none bg-white focus:border-[#5542f6] focus:ring-1 focus:ring-[#5542f6]">
                    <option>Select student...</option>
                    <option>All Students (Bulk Print)</option>
                    <option>Rahul Sharma (Roll: 101)</option>
                    <option>Priya Singh (Roll: 102)</option>
                    <option>Amit Kumar (Roll: 103)</option>
                  </select>
                </div>
              </div>
            </div>

            <hr className="border-gray-100 mb-6" />

            {/* Step 2 */}
            <div>
              <div className="flex items-start mb-4">
                <div className="w-6 h-6 rounded-none bg-indigo-100 text-[#5542f6] flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-800">Choose a design</h3>
                  <p className="text-xs text-gray-500">Select a template and how it should be laid out.</p>
                </div>
              </div>

              <div className="pl-9 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Template</label>
                    <select className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none bg-white focus:border-[#5542f6] focus:ring-1 focus:ring-[#5542f6]">
                      <option>Select template...</option>
                      <option>Bonafide Certificate A12</option>
                      <option>Board Style Admit Card</option>
                      <option>Pro Corporate Fee Receipt</option>
                      <option>Holistic Progress Card</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">Layout</label>
                    <input type="text" value="ID Card Grid" readOnly className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none bg-white text-gray-700" />
                  </div>
                </div>

                <div className="bg-gray-50 rounded-none border border-gray-200 p-3 flex items-center mt-2">
                  <div 
                    className={`w-10 h-5 rounded-none mr-3 relative cursor-pointer transition-colors ${archive ? 'bg-red-700' : 'bg-gray-300'}`}
                    onClick={() => setArchive(!archive)}
                  >
                    <div className={`w-4 h-4 bg-white rounded-none absolute top-0.5 transition-all ${archive ? 'left-5' : 'left-0.5'}`}></div>
                  </div>
                  <div>
                    <span className="text-sm font-bold text-gray-800 mr-2">Archive a digital copy</span>
                    <span className="text-xs text-gray-500">Saves an exact replica to the system for future auditing and re-downloads.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column - Live Preview */}
        <div className="w-full lg:w-[450px] flex-shrink-0">
          <div className="bg-white rounded-none border border-gray-200 shadow-sm p-4 h-full flex flex-col min-h-[400px]">
            <div className="flex items-center text-gray-400 text-[11px] font-bold uppercase tracking-wider mb-3">
              <Eye className="w-3.5 h-3.5 mr-1.5" />
              Live Preview
            </div>
            <div className="flex-1 border-2 border-dashed border-gray-200 rounded-none bg-gray-50 flex flex-col items-center justify-center text-gray-400 p-6">
              <ImageIcon className="w-12 h-12 mb-3 text-gray-300" />
              <p className="text-sm text-center">Select a template to preview it here</p>
            </div>
          </div>
        </div>
      </div>

      {/* Step 3 */}
      <div className="mt-6 bg-white rounded-none border border-gray-200 shadow-sm p-6">
        <div className="flex items-start mb-6">
          <div className="w-6 h-6 rounded-none bg-indigo-100 text-[#5542f6] flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
            3
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-800">Sheet & cutting setup</h3>
            <p className="text-xs text-gray-500">Fine-tune the paper, card size and cut marks. Sensible defaults are ready to go.</p>
          </div>
        </div>

        <div className="pl-9">
          <div className="border border-gray-200 rounded-none overflow-hidden">
            <button 
              className="w-full bg-gray-50 flex items-center p-3 text-sm font-bold text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setShowPrintLayout(!showPrintLayout)}
            >
              <LayoutGrid className="w-4 h-4 mr-2 text-gray-600" />
              Print Layout — Sheet & Card Setup
            </button>
            
            {showPrintLayout && (
              <div className="p-4 bg-white border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="col-span-1 lg:col-span-2">
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">Card Size</label>
                    <select className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none bg-white">
                      <option>Use template size (not set — defaults to CR80)</option>
                      <option>CR80 (86 x 54 mm) - Standard ID</option>
                      <option>A5 (148 x 210 mm)</option>
                      <option>A6 (105 x 148 mm)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">Paper</label>
                    <select className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none bg-white">
                      <option>A4 (210 x 297 mm)</option>
                      <option>A3 (297 x 420 mm)</option>
                      <option>US Letter (215.9 x 279.4 mm)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">Sheet Orientation</label>
                    <select className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none bg-white">
                      <option>Portrait</option>
                      <option>Landscape</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-600 mb-1">Margin (mm)</label>
                      <input type="number" defaultValue="10" className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none bg-white" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-600 mb-1">Gap (mm)</label>
                      <input type="number" defaultValue="3" className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none bg-white" />
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex items-center text-xs text-gray-500 bg-gray-50 p-2 rounded-none border border-gray-100 flex-1 md:mr-6">
                    <Info className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                    Cards are tiled edge-accurate on the sheet at the physical size above; content auto-scales to fit each card.
                  </div>
                  
                  <div className="flex flex-col space-y-2 mt-4 md:mt-0 flex-shrink-0">
                    <label className="flex items-center text-xs font-semibold text-gray-700 cursor-pointer">
                      <input type="checkbox" defaultChecked className="mr-2 rounded-none text-[#5542f6] focus:ring-[#5542f6]" />
                      Cut marks
                    </label>
                    <label className="flex items-center text-xs font-semibold text-gray-700 cursor-pointer">
                      <input type="checkbox" defaultChecked className="mr-2 rounded-none text-[#5542f6] focus:ring-[#5542f6]" />
                      Align center
                    </label>
                    <label className="flex items-center text-xs font-semibold text-gray-500 cursor-pointer">
                      <input type="checkbox" className="mr-2 rounded-none text-gray-400 focus:ring-gray-400" />
                      Cut & stack order
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer sticky / floating bar */}
      <div className="sticky bottom-0 -mx-6 -mb-6 mt-8 bg-white border-t border-gray-200 p-4 px-6 flex flex-col md:flex-row justify-between items-center z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="flex items-center text-xs text-gray-500 font-medium mb-4 md:mb-0">
          <div className="w-5 h-5 rounded-none bg-gray-100 flex items-center justify-center mr-2">
            <Info className="w-3 h-3 text-gray-500" />
          </div>
          Opens in a new tab — nothing is saved unless you enable archiving.
        </div>
        <div className="flex space-x-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center px-6 py-2 border border-[#b2b5ff] text-[#5542f6] bg-white rounded-none text-sm font-bold hover:bg-indigo-50 transition-colors">
            <Eye className="w-4 h-4 mr-2" />
            Print Preview
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center px-6 py-2 bg-[#5542f6] text-white rounded-none text-sm font-bold hover:bg-[#4a3ae0] transition-colors shadow-sm">
            <FileText className="w-4 h-4 mr-2" />
            Generate PDF
          </button>
        </div>
      </div>
    </div>
  );
}
