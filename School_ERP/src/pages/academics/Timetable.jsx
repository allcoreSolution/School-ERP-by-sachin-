import React, { useState } from 'react';
import AcademicsTabs from '../../components/academics/AcademicsTabs';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Book, Layers, LayoutGrid, Link2, Users, 
  Clock, Calendar, Plus, Minus, Settings2
} from 'lucide-react';

const Timetable = () => {
  const navigate = useNavigate();
  
  // State for Load Rules accordion
  const [isRulesExpanded, setIsRulesExpanded] = useState(false);

  const subNav = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/academics/dashboard' },
    { name: 'Guide', icon: Book, path: '#' },
    { name: 'Sessions', icon: Layers, path: '/academics/sessions' },
    { name: 'Classes', icon: LayoutGrid, path: '/academics/classes' },
    { name: 'Sections', icon: LayoutDashboard, path: '/academics/sections' },
    { name: 'Subjects', icon: Book, path: '/academics/subjects' },
    { name: 'Assign Subjects', icon: Link2, path: '/academics/assign-subjects' },
    { name: 'Assign Electives', icon: Link2, path: '/academics/assign-electives' },
    { name: 'Assign Teacher', icon: Users, path: '/academics/assign-class-teacher' },
    { name: 'Manage Periods', icon: Clock, path: '/academics/manage-periods' },
    { name: 'Timetable', icon: Calendar, path: '/academics/timetable', active: true },
  ];

  return (
    <div className="flex flex-col h-full bg-[#f4f6f8] overflow-y-auto">
      
      {/* Header */}
      <div className="px-8 pt-6 pb-2 bg-white">
        <h1 className="text-2xl font-bold text-[#1a1a2e]">Academic Management</h1>
        <p className="text-[13px] text-gray-500 mt-1">Configure and manage sessions, classes, sections, subjects, and timetables.</p>
        
        {/* Tabs */}
        <AcademicsTabs />
      </div>

      <div className="p-8 max-w-7xl mx-auto w-full">
        
        {/* Select Class & Section Card */}
        <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="bg-[#17a2b8] px-4 py-3">
            <h2 className="text-white text-[15px] font-bold m-0">Select Class & Section</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Class</label>
                <select className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF] text-gray-700 bg-white">
                  <option>-- Select Class --</option>
                  <option>Nursery</option>
                  <option>KG</option>
                  <option>Class I</option>
                </select>
              </div>
              
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Section</label>
                <select className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF] text-gray-700 bg-white">
                  <option>-- Select Class First --</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Load Rules Accordion */}
        <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 ease-in-out">
          
          {/* Accordion Header */}
          <div 
            className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setIsRulesExpanded(!isRulesExpanded)}
          >
            <div className="flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-gray-600" />
              <span className="font-bold text-[14px] text-gray-800">Load Rules</span>
              <span className="text-[13px] text-gray-400 font-normal">(optional)</span>
            </div>
            <button className="text-gray-400 hover:text-gray-600 focus:outline-none">
              {isRulesExpanded ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            </button>
          </div>

          {/* Accordion Body */}
          {isRulesExpanded && (
            <div className="p-6 border-t border-gray-200 bg-white">
              <div className="flex items-end gap-6 mb-4">
                
                <div className="flex-1 max-w-[250px]">
                  <label className="block text-[12px] font-bold text-gray-800 mb-1.5">Max periods per day, per teacher</label>
                  <input 
                    type="number" 
                    placeholder="No limit" 
                    className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF]" 
                  />
                </div>
                
                <div className="flex-1 max-w-[250px]">
                  <label className="block text-[12px] font-bold text-gray-800 mb-1.5">Max consecutive periods, per teacher</label>
                  <input 
                    type="number" 
                    placeholder="No limit" 
                    className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF]" 
                  />
                </div>
                
                <button 
                  onClick={() => alert('Rules saved successfully!')}
                  className="bg-[#6c757d] hover:bg-[#5a6268] text-white px-5 py-2 rounded-none text-[13px] font-bold transition-colors flex items-center gap-2 h-[38px]"
                >
                  <Settings2 className="w-4 h-4" /> Save rules
                </button>
                
              </div>
              
              <p className="text-[12px] text-gray-500 mt-2">
                Leave blank for no limit. Enforced when saving a timetable — periods that would breach a limit are skipped and reported.
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Timetable;
