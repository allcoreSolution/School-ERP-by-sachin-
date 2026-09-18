import React, { useState } from 'react';
import { 
  Plus, Contact, FileText, Palette, Filter, RotateCcw, 
  Search, LayoutGrid, Info, Eye, Download, Image as ImageIcon, Users,
  FolderOpen, Printer, Edit2, Wand2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const STAFF_DATA = [
  { id: 'YISAC1', name: 'Accountant1', dept: 'Finance', desig: 'Staff', phone: '6263056773', initials: 'A', noPhoto: false },
  { id: 'STF-001', name: 'Amit Sharma', dept: 'Mathematics', desig: 'Senior Teacher', phone: '9876543210', initials: 'A', noPhoto: false },
  { id: '6543', name: 'Rajat kumar', dept: 'Academic', desig: 'Staff', phone: '-', initials: 'R', noPhoto: true },
  { id: 'STF-003', name: 'Rajesh Kumar', dept: 'Finance', desig: 'Staff', phone: '9876543212', initials: 'R', noPhoto: true },
  { id: 'STF-004', name: 'Sneha Desai', dept: 'Academic', desig: 'Staff', phone: '9876543213', initials: 'S', noPhoto: true },
  { id: '34324', name: 'teacher2', dept: 'Academic', desig: 'Senior Teacher', phone: '-', initials: 'T', noPhoto: true },
  { id: 'STF-005', name: 'Vikram Singh', dept: 'Academic', desig: 'Staff', phone: '9876543214', initials: 'V', noPhoto: true },
];

const DESIGNS_DATA = [
  { id: 1, title: 'Classic Portrait ID Card', type: 'Student', size: 'Size not set', image: 'https://placehold.co/400x600/ffffff/5542f6?text=Portrait' },
  { id: 2, title: 'Classic Portrait ID Card', type: 'Student', size: 'Size not set', image: 'https://placehold.co/400x600/ffffff/5542f6?text=Portrait2' },
  { id: 3, title: 'Classic Red Landscape ID Card', type: 'Student', size: 'Size not set', image: 'https://placehold.co/600x400/ffffff/ea4335?text=Landscape' },
  { id: 4, title: 'Emerald Band (Canvas)', type: 'Student', size: '54 x 85.6 mm', image: 'https://placehold.co/400x600/ffffff/34a853?text=Emerald' },
  { id: 5, title: 'Golden Crest (Canvas)', type: 'Student', size: '54 x 85.6 mm', image: 'https://placehold.co/400x600/ffffff/fbbc04?text=Golden' },
  { id: 6, title: 'Azure Classic (Canvas)', type: 'Student', size: '54 x 85.6 mm', image: 'https://placehold.co/400x600/ffffff/4285f4?text=Azure' },
  { id: 7, title: 'Minimal Slate (Canvas)', type: 'Student', size: '54 x 85.6 mm', image: 'https://placehold.co/400x600/ffffff/5f6368?text=Slate' },
  { id: 8, title: 'Sunrise Orange (Canvas)', type: 'Student', size: '54 x 85.6 mm', image: 'https://placehold.co/400x600/ffffff/fa7b17?text=Orange' },
];

export default function IdCardsStudent({ initialTab = 'student' }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [archive, setArchive] = useState(false);
  const [showPrintLayout, setShowPrintLayout] = useState(true);
  const [showStaffTable, setShowStaffTable] = useState(false);

  // Update active tab if initialTab prop changes
  React.useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  return (
    <div className="bg-[#f4f7fc] min-h-[calc(100vh-64px)] font-sans flex flex-col p-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center">
          <Contact className="w-8 h-8 text-[#5542f6] mr-3" />
          <div>
            <h1 className="text-[24px] font-semibold text-gray-800">ID Cards</h1>
            <p className="text-gray-500 text-sm mt-1">Print student and staff identity cards — pick people, pick a design, print the sheet.</p>
          </div>
        </div>
        <button 
          onClick={() => navigate('/id-cards/templates')}
          className="flex items-center px-4 py-2 bg-[#5542f6] text-white rounded-none text-sm font-bold hover:bg-[#4a3ae0] transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Card Design
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
        <button 
          onClick={() => setActiveTab('student')}
          className={`flex items-center px-4 py-3 border-b-2 font-bold text-sm whitespace-nowrap transition-colors ${activeTab === 'student' ? 'border-[#5542f6] text-[#5542f6]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          <Contact className="w-4 h-4 mr-2" />
          Student ID Cards
        </button>
        <button 
          onClick={() => setActiveTab('staff')}
          className={`flex items-center px-4 py-3 border-b-2 font-bold text-sm whitespace-nowrap transition-colors ${activeTab === 'staff' ? 'border-[#5542f6] text-[#5542f6]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          <FileText className="w-4 h-4 mr-2" />
          Staff ID Cards
        </button>
        <button 
          onClick={() => setActiveTab('designs')}
          className={`flex items-center px-4 py-3 border-b-2 font-bold text-sm whitespace-nowrap transition-colors ${activeTab === 'designs' ? 'border-[#5542f6] text-[#5542f6]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          <Palette className="w-4 h-4 mr-2" />
          Card Designs
        </button>
      </div>

      {/* Main Content Areas */}
      <div className="space-y-6 flex-1">
        
        {activeTab === 'student' && (
          <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gray-50/50 border-b border-gray-100 p-4 flex items-center">
              <Filter className="w-5 h-5 text-[#5542f6] mr-2" />
              <h2 className="text-sm font-bold text-gray-800">Choose a Class</h2>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">Class</label>
                  <select className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none bg-white focus:border-[#5542f6]">
                    <option>-- Select Class --</option>
                    <option>Class X</option>
                  </select>
                </div>
                <div className="lg:col-span-2">
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">Section</label>
                  <select className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none bg-gray-50 text-gray-500">
                    <option>-- All Sections --</option>
                  </select>
                  <p className="text-xs text-gray-400 mt-1">Pick a Class first — Sections load automatically.</p>
                </div>
              </div>

              <div className="flex justify-end mt-6 space-x-3 border-t border-gray-100 pt-6">
                <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-600 rounded-none text-sm font-bold hover:bg-gray-50">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </button>
                <button className="flex items-center px-4 py-2 bg-[#5542f6] text-white rounded-none text-sm font-bold hover:bg-[#4a3ae0]">
                  <Search className="w-4 h-4 mr-2" />
                  Show Students
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'staff' && (
          <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gray-50/50 border-b border-gray-100 p-4 flex items-center">
              <Filter className="w-5 h-5 text-[#5542f6] mr-2" />
              <h2 className="text-sm font-bold text-gray-800">Select Criteria</h2>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">Role</label>
                  <select className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none bg-white focus:border-[#5542f6]">
                    <option>-- All Roles --</option>
                    <option>Teacher</option>
                    <option>Staff</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">Department</label>
                  <select className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none bg-white focus:border-[#5542f6]">
                    <option>-- All Departments --</option>
                    <option>Academic</option>
                    <option>Finance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">Designation</label>
                  <select className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none bg-white focus:border-[#5542f6]">
                    <option>-- All Designations --</option>
                    <option>Senior Teacher</option>
                    <option>Staff</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end mt-6 space-x-3 border-t border-gray-100 pt-6">
                <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-600 rounded-none text-sm font-bold hover:bg-gray-50">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </button>
                <button 
                  onClick={() => setShowStaffTable(true)}
                  className="flex items-center px-4 py-2 bg-[#5542f6] text-white rounded-none text-sm font-bold hover:bg-[#4a3ae0]"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </button>
              </div>
            </div>
          </div>
        )}

        {(activeTab === 'student' || activeTab === 'staff') && (
          <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="bg-gray-50/50 border-b border-gray-100 p-4 flex items-center justify-between">
              <div className="flex items-center">
                <Contact className="w-5 h-5 text-[#5542f6] mr-2" />
                <h2 className="text-sm font-bold text-gray-800">Print Cards</h2>
              </div>
              <span className="bg-indigo-50 text-[#5542f6] px-2 py-0.5 rounded-none text-xs font-bold border border-indigo-100">
                0 selected
              </span>
            </div>

            <div className="flex flex-col lg:flex-row p-6 gap-6">
              
              {/* Left controls */}
              <div className="flex-1 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-red-600 mb-1">Card Design *</label>
                    <select className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none bg-white">
                      <option>-- Select a design --</option>
                      <option>Classic Portrait</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">Print As</label>
                    <select className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none bg-white">
                      <option>Sheet of cards (many per page)</option>
                    </select>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-none border border-gray-200 p-3 flex items-center">
                  <div 
                    className={`w-10 h-5 rounded-none mr-3 relative cursor-pointer transition-colors flex-shrink-0 ${archive ? 'bg-red-700' : 'bg-gray-300'}`}
                    onClick={() => setArchive(!archive)}
                  >
                    <div className={`w-4 h-4 bg-white rounded-none absolute top-0.5 transition-all ${archive ? 'left-5' : 'left-0.5'}`}></div>
                  </div>
                  <div>
                    <span className="text-sm font-bold text-gray-800 mr-2">Archive a digital copy</span>
                    <span className="text-xs text-gray-500">Saves an exact replica to the system for auditing and re-downloads.</span>
                  </div>
                </div>

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
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="lg:col-span-1">
                          <label className="block text-[11px] font-bold text-gray-600 mb-1">Card Size</label>
                          <select className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none bg-white">
                            <option>Use template size (not set — ...</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-gray-600 mb-1">Paper</label>
                          <select className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none bg-white">
                            <option>A4 (210 x 297 mm)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-gray-600 mb-1">Sheet Orientation</label>
                          <select className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none bg-white">
                            <option>Portrait</option>
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

                      <div className="mt-4 flex flex-col lg:flex-row lg:items-center justify-between">
                        <div className="flex items-center text-xs text-gray-500 bg-gray-50 p-2 rounded-none border border-gray-100 flex-1 lg:mr-6 mb-4 lg:mb-0">
                          <Info className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                          Cards are tiled edge-accurate on the sheet at the physical size above.
                        </div>
                        <div className="flex flex-col space-y-2 flex-shrink-0">
                          <label className="flex items-center text-xs font-semibold text-gray-700 cursor-pointer">
                            <input type="checkbox" defaultChecked className="mr-2 rounded-none text-[#5542f6]" /> Cut marks
                          </label>
                          <label className="flex items-center text-xs font-semibold text-gray-700 cursor-pointer">
                            <input type="checkbox" defaultChecked className="mr-2 rounded-none text-[#5542f6]" /> Align center
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Live Preview */}
              <div className="w-full lg:w-[450px] flex-shrink-0 flex flex-col">
                <div className="flex items-center text-gray-400 text-[11px] font-bold uppercase tracking-wider mb-2">
                  <Eye className="w-3.5 h-3.5 mr-1.5" />
                  Live Preview
                </div>
                <div className="flex-1 min-h-[300px] border-2 border-dashed border-gray-200 rounded-none bg-gray-50 flex flex-col items-center justify-center text-gray-400 p-6">
                  <ImageIcon className="w-12 h-12 mb-3 text-gray-300" />
                  <p className="text-sm text-center">Select a design to preview it here</p>
                </div>
              </div>
            </div>
            
            {/* Table Area (Staff Search Results) */}
            {activeTab === 'staff' && showStaffTable ? (
              <div className="border-t border-gray-100">
                <div className="flex justify-end p-4 border-b border-gray-100 bg-white">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-2">Search:</span>
                    <input type="text" className="border border-gray-300 rounded-none px-2 py-1 text-sm outline-none focus:border-[#5542f6]" />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-indigo-50/50">
                        <th className="p-3 w-12 border-b border-gray-200">
                          <input type="checkbox" className="rounded border-gray-300 text-[#5542f6] focus:ring-[#5542f6]" />
                        </th>
                        <th className="p-3 text-[11px] font-bold text-[#5542f6] uppercase border-b border-gray-200">Photo</th>
                        <th className="p-3 text-[11px] font-bold text-[#5542f6] uppercase border-b border-gray-200">Name</th>
                        <th className="p-3 text-[11px] font-bold text-[#5542f6] uppercase border-b border-gray-200">Staff ID</th>
                        <th className="p-3 text-[11px] font-bold text-[#5542f6] uppercase border-b border-gray-200">Department</th>
                        <th className="p-3 text-[11px] font-bold text-[#5542f6] uppercase border-b border-gray-200">Designation</th>
                        <th className="p-3 text-[11px] font-bold text-[#5542f6] uppercase border-b border-gray-200">Phone</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {STAFF_DATA.map((staff, idx) => (
                        <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-3">
                            <input type="checkbox" className="rounded border-gray-300 text-[#5542f6] focus:ring-[#5542f6]" />
                          </td>
                          <td className="p-3">
                            {staff.noPhoto ? (
                              <div className="w-8 h-8 rounded-none bg-orange-100 text-orange-600 font-bold flex items-center justify-center">
                                {staff.initials}
                              </div>
                            ) : (
                              <div className="w-8 h-8 rounded-none bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                {staff.initials}
                              </div>
                            )}
                          </td>
                          <td className="p-3 text-gray-800">
                            {staff.name}
                            {staff.noPhoto && <span className="ml-2 bg-yellow-400 text-[10px] font-bold px-1.5 py-0.5 rounded-none text-gray-800">no photo</span>}
                          </td>
                          <td className="p-3 text-pink-500">{staff.id}</td>
                          <td className="p-3 text-gray-600">{staff.dept}</td>
                          <td className="p-3 text-gray-600">{staff.desig}</td>
                          <td className="p-3 text-gray-600">{staff.phone}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="py-16 flex flex-col items-center justify-center text-gray-400 border-t border-gray-100">
                <Users className="w-10 h-10 mb-3 text-gray-300" />
                <p className="text-sm font-medium">Choose a {activeTab === 'student' ? 'Class' : 'Criteria'} above to list {activeTab === 'student' ? 'students' : 'staff'}.</p>
              </div>
            )}
          </div>
        )}

        {/* Card Designs Tab */}
        {activeTab === 'designs' && (
          <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gray-50/50 border-b border-gray-100 p-4 flex items-center justify-between">
              <div className="flex items-center">
                <Contact className="w-5 h-5 text-[#5542f6] mr-2" />
                <h2 className="text-sm font-bold text-gray-800">Student Card Designs</h2>
              </div>
              <span className="bg-indigo-50 text-[#5542f6] px-2 py-0.5 rounded-none text-xs font-bold border border-indigo-100">
                {DESIGNS_DATA.length}
              </span>
            </div>

            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {DESIGNS_DATA.map((design) => (
                <div key={design.id} className="border border-gray-200 rounded-none overflow-hidden group hover:shadow-md transition-shadow flex flex-col">
                  <div className="relative h-48 bg-gray-50 border-b border-gray-100 flex items-center justify-center p-4">
                    <img src={design.image} alt={design.title} className="max-h-full max-w-full drop-shadow-md" />
                    <button className="absolute top-2 right-2 w-7 h-7 bg-indigo-50 rounded-none flex items-center justify-center text-[#5542f6] hover:bg-[#5542f6] hover:text-white transition-colors">
                      <Wand2 className="w-3.5 h-3.5" />
                    </button>
                    {design.id <= 2 && (
                      <div className="absolute bottom-2 left-2 bg-gray-600/80 text-white text-[10px] font-bold px-2 py-1 rounded-none flex items-center">
                        <ImageIcon className="w-3 h-3 mr-1" /> Original preview
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-sm font-bold text-gray-800 mb-2">{design.title}</h3>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center space-x-2">
                        <span className="text-[11px] font-semibold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-none border border-green-200">{design.type}</span>
                        <span className="text-[11px] text-gray-500">{design.size}</span>
                      </div>
                      <div className="flex space-x-2 text-gray-400">
                        <button className="hover:text-[#5542f6]"><Printer className="w-4 h-4" /></button>
                        <button className="hover:text-[#5542f6]"><Edit2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Footer sticky / floating bar (Contextual based on active tab) */}
      {(activeTab === 'student' || activeTab === 'staff') ? (
        <div className="sticky bottom-0 -mx-6 -mb-6 mt-8 bg-white border-t border-gray-200 p-4 px-6 flex flex-col md:flex-row justify-end items-center z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] space-y-3 md:space-y-0 md:space-x-3">
          <button className="w-full md:w-auto flex items-center justify-center px-6 py-2 border border-gray-300 text-gray-700 bg-white rounded-none text-sm font-bold hover:bg-gray-50 transition-colors">
            <Eye className="w-4 h-4 mr-2" />
            Print Preview
          </button>
          <button className="w-full md:w-auto flex items-center justify-center px-6 py-2 bg-[#5542f6] text-white rounded-none text-sm font-bold hover:bg-[#4a3ae0] transition-colors shadow-sm">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </button>
          <button className="w-full md:w-auto flex items-center justify-center px-6 py-2 bg-[#008f5d] text-white rounded-none text-sm font-bold hover:bg-[#007a4f] transition-colors shadow-sm">
            <ImageIcon className="w-4 h-4 mr-2" />
            Download as Images (ZIP)
          </button>
        </div>
      ) : (
        <div className="sticky bottom-0 -mx-6 -mb-6 mt-8 bg-white border-t border-gray-200 p-4 px-6 flex justify-end items-center z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] space-x-3">
          <button className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-none text-sm font-bold hover:bg-gray-50">
            <FolderOpen className="w-4 h-4 mr-2" />
            All Templates
          </button>
          <button className="flex items-center justify-center px-4 py-2 bg-[#5542f6] text-white rounded-none text-sm font-bold hover:bg-[#4a3ae0] shadow-sm">
            <Plus className="w-4 h-4 mr-2" />
            Add a Design
          </button>
        </div>
      )}
    </div>
  );
}
