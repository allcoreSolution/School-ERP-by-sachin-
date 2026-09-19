import React, { useState } from 'react';
import AcademicsTabs from '../../components/academics/AcademicsTabs';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Book, Layers, LayoutGrid, Link2, Users, 
  Clock, Save
} from 'lucide-react';

const AssignSubjects = () => {
  const navigate = useNavigate();

  const subNav = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/academics/dashboard' },
    { name: 'Guide', icon: Book, path: '#' },
    { name: 'Sessions', icon: Layers, path: '/academics/sessions' },
    { name: 'Classes', icon: LayoutGrid, path: '/academics/classes' },
    { name: 'Sections', icon: LayoutDashboard, path: '/academics/sections' },
    { name: 'Subjects', icon: Book, path: '/academics/subjects' },
    { name: 'Assign Subjects', icon: Link2, path: '/academics/assign-subjects', active: true },
    { name: 'Assign Electives', icon: Link2, path: '/academics/assign-electives' },
    { name: 'Assign Teacher', icon: Users, path: '/academics/assign-class-teacher' },
    { name: 'Manage Periods', icon: Clock, path: '/academics/manage-periods' },
  ];

  // Dummy data representing classes and their subjects
  const classesData = [];

  // Initialize state with some default selections to match screenshot
  const [selectedSubjects, setSelectedSubjects] = useState(() => {
    const initial = {};
    classesData.forEach(cls => {
      initial[cls.id] = cls.subjects.map(s => s.id); // Default select all
    });
    return initial;
  });

  const handleSubjectToggle = (classId, subjectId) => {
    setSelectedSubjects(prev => {
      const classSelections = prev[classId] || [];
      if (classSelections.includes(subjectId)) {
        return { ...prev, [classId]: classSelections.filter(id => id !== subjectId) };
      } else {
        return { ...prev, [classId]: [...classSelections, subjectId] };
      }
    });
  };

  const handleClassToggle = (classId) => {
    setSelectedSubjects(prev => {
      const cls = classesData.find(c => c.id === classId);
      const isAllSelected = (prev[classId] || []).length === cls.subjects.length;
      
      if (isAllSelected) {
        // Deselect all
        return { ...prev, [classId]: [] };
      } else {
        // Select all
        return { ...prev, [classId]: cls.subjects.map(s => s.id) };
      }
    });
  };

  const handleSaveAll = () => {
    // Simulate saving logic
    console.log("Assignments saved:", selectedSubjects);
    alert("Assignments saved successfully!");
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-hidden">
      
      {/* Header - Fixed */}
      <div className="px-8 pt-6 pb-2 shrink-0 bg-gray-50">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a2e]">Academic Management</h1>
          <p className="text-[13px] text-gray-500 mt-1">Configure and manage sessions, classes, sections, subjects, and timetables.</p>
        </div>
        
        {/* Tabs */}
        <AcademicsTabs />
      </div>

      {/* Main Content Area - Scrollable */}
      <div className="flex flex-col flex-1 overflow-hidden">
        
        <div className="px-8 py-4 flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-[16px] font-bold text-[#1a1a2e]">Which subjects are taught in each class?</h2>
            <p className="text-[12px] text-gray-500 mt-1">
              Tick the subjects offered by each class, then save. Each class only lists subjects marked available for it — set that when creating or editing a subject.
            </p>
          </div>
          <button 
            onClick={handleSaveAll}
            className="bg-[#5F52FF] text-white px-5 py-2 rounded-none text-[13px] font-bold hover:bg-[#4E41E6] shadow-sm flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save All Assignments
          </button>
        </div>

        {/* Horizontal Scroll Grid */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden px-8 pb-8">
          <div className="flex gap-4 h-full min-w-max pb-2">
            
            {classesData.map(cls => {
              const isAllSelected = (selectedSubjects[cls.id] || []).length === cls.subjects.length;
              const isIndeterminate = (selectedSubjects[cls.id] || []).length > 0 && !isAllSelected;

              return (
                <div key={cls.id} className="w-[280px] flex flex-col bg-white border border-gray-200 rounded-none shadow-sm h-full overflow-hidden">
                  
                  {/* Column Header */}
                  <div className="p-3 border-b border-gray-200 bg-[#F8F7FF] flex items-center gap-3 shrink-0">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded-none border-gray-300 text-[#5F52FF] focus:ring-[#5F52FF] cursor-pointer"
                      checked={isAllSelected}
                      ref={input => {
                        if (input) input.indeterminate = isIndeterminate;
                      }}
                      onChange={() => handleClassToggle(cls.id)}
                    />
                    <span className="font-bold text-[14px] text-[#1a1a2e]">{cls.name}</span>
                  </div>

                  {/* Subjects List */}
                  <div className="flex-1 overflow-y-auto p-2">
                    <div className="space-y-1">
                      {cls.subjects.map(subject => {
                        const isSelected = (selectedSubjects[cls.id] || []).includes(subject.id);
                        return (
                          <div key={subject.id} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-none group">
                            <input 
                              type="checkbox" 
                              className="w-4 h-4 rounded-none border-gray-300 text-[#5F52FF] focus:ring-[#5F52FF] cursor-pointer mt-0.5"
                              checked={isSelected}
                              onChange={() => handleSubjectToggle(cls.id, subject.id)}
                            />
                            <div className="flex flex-col cursor-pointer flex-1" onClick={() => handleSubjectToggle(cls.id, subject.id)}>
                              <div className="flex items-center gap-2">
                                <span className={`text-[13px] font-bold ${isSelected ? 'text-gray-900' : 'text-gray-700'} group-hover:text-black`}>
                                  {subject.name}
                                </span>
                                {subject.offList && (
                                  <span className="bg-gray-100 text-gray-500 border border-gray-200 px-1.5 py-0.5 rounded-none text-[9px] font-bold uppercase">off-list</span>
                                )}
                              </div>
                              <span className="text-[11px] text-gray-400 font-medium">
                                {subject.code} • {subject.type}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              );
            })}

          </div>
        </div>

      </div>
    </div>
  );
};

export default AssignSubjects;
