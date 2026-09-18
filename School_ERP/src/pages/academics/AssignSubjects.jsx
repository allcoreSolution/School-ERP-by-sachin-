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
  const classesData = [
    { id: 'nursery', name: 'Nursery', subjects: [
      { id: 's1', name: 'Hindi', code: 'NUR-HIN', type: 'Compulsory' },
      { id: 's2', name: 'Mathematics', code: 'NUR-MAT', type: 'Compulsory' },
      { id: 's3', name: 'Rhymes & Stories', code: 'NUR-RHY', type: 'Compulsory' },
      { id: 's4', name: 'Drawing & Coloring', code: 'NUR-ART', type: 'Compulsory' },
      { id: 's5', name: 'Environmental Studies', code: 'EVS-NUR', type: 'Compulsory' },
      { id: 's6', name: 'Science', code: 'SCI-NUR', type: 'Compulsory' },
    ]},
    { id: 'kg', name: 'KG', subjects: [
      { id: 's7', name: 'Hindi', code: 'LKG-HIN', type: 'Compulsory' },
      { id: 's8', name: 'Mathematics', code: 'LKG-MAT', type: 'Compulsory' },
      { id: 's9', name: 'General Awareness', code: 'LKG-GA', type: 'Compulsory' },
      { id: 's10', name: 'English', code: 'LKG-ENG', type: 'Compulsory' },
      { id: 's11', name: 'Environmental Studies', code: 'EVS-LKG', type: 'Compulsory' },
      { id: 's12', name: 'Science', code: 'SCI-LKG', type: 'Compulsory' },
    ]},
    { id: 'class1', name: 'Class I', subjects: [
      { id: 's13', name: 'Hindi', code: 'C01-HIN', type: 'Compulsory' },
      { id: 's14', name: 'Environmental Studies', code: 'C01-EVS', type: 'Compulsory' },
      { id: 's15', name: 'English', code: 'C01-ENG', type: 'Compulsory' },
      { id: 's16', name: 'Mathematics', code: 'C01-MAT', type: 'Compulsory' },
      { id: 's17', name: 'Computer Science', code: 'C01-COM', type: 'Compulsory' },
      { id: 's18', name: 'Science', code: 'C01-SCI', type: 'Compulsory' },
      { id: 's19', name: 'Social Science', code: 'C01-SST', type: 'Compulsory' },
    ]},
    { id: 'class2', name: 'Class II', subjects: [
      { id: 's20', name: 'Hindi', code: 'C02-HIN', type: 'Compulsory' },
      { id: 's21', name: 'Environmental Studies', code: 'C02-EVS', type: 'Compulsory' },
      { id: 's22', name: 'English', code: 'C02-ENG', type: 'Compulsory', offList: true },
      { id: 's23', name: 'Mathematics', code: 'C02-MAT', type: 'Compulsory' },
      { id: 's24', name: 'Computer Science', code: 'C02-COM', type: 'Compulsory' },
      { id: 's25', name: 'Science', code: 'C02-SCI', type: 'Compulsory' },
      { id: 's26', name: 'Social Science', code: 'C02-SST', type: 'Compulsory' },
    ]},
    { id: 'class3', name: 'Class III', subjects: [
      { id: 's27', name: 'Hindi', code: 'C03-HIN', type: 'Compulsory' },
      { id: 's28', name: 'Environmental Studies', code: 'C03-EVS', type: 'Compulsory' },
      { id: 's29', name: 'English', code: 'C03-ENG', type: 'Compulsory', offList: true },
      { id: 's30', name: 'Mathematics', code: 'C03-MAT', type: 'Compulsory', offList: true },
      { id: 's31', name: 'Computer Science', code: 'C03-COM', type: 'Compulsory', offList: true },
      { id: 's32', name: 'Science', code: 'C03-SCI', type: 'Compulsory' },
    ]},
    { id: 'class4', name: 'Class IV', subjects: [
      { id: 's33', name: 'Hindi', code: 'C04-HIN', type: 'Compulsory' },
      { id: 's34', name: 'Environmental Studies', code: 'C04-EVS', type: 'Compulsory' },
      { id: 's35', name: 'English', code: 'C04-ENG', type: 'Compulsory', offList: true },
      { id: 's36', name: 'Mathematics', code: 'C04-MAT', type: 'Compulsory', offList: true },
      { id: 's37', name: 'Computer Science', code: 'C04-COM', type: 'Compulsory', offList: true },
      { id: 's38', name: 'Science', code: 'C04-SCI', type: 'Compulsory' },
    ]},
    { id: 'class5', name: 'Class V', subjects: [
      { id: 's39', name: 'Hindi', code: 'C05-HIN', type: 'Compulsory' },
      { id: 's40', name: 'Environmental Studies', code: 'C05-EVS', type: 'Compulsory' },
      { id: 's41', name: 'English', code: 'C05-ENG', type: 'Compulsory', offList: true },
      { id: 's42', name: 'Mathematics', code: 'C05-MAT', type: 'Compulsory', offList: true },
      { id: 's43', name: 'Computer Science', code: 'C05-COM', type: 'Compulsory', offList: true },
      { id: 's44', name: 'Science', code: 'C05-SCI', type: 'Compulsory' },
    ]},
    { id: 'class6', name: 'Class VI', subjects: [
      { id: 's45', name: 'Hindi', code: 'C06-HIN', type: 'Compulsory' },
      { id: 's46', name: 'Environmental Studies', code: 'C06-EVS', type: 'Compulsory' },
      { id: 's47', name: 'English', code: 'C06-ENG', type: 'Compulsory', offList: true },
      { id: 's48', name: 'Mathematics', code: 'C06-MAT', type: 'Compulsory', offList: true },
      { id: 's49', name: 'Computer Science', code: 'C06-COM', type: 'Compulsory', offList: true },
      { id: 's50', name: 'Science', code: 'C06-SCI', type: 'Compulsory' },
    ]},
    { id: 'class7', name: 'Class VII', subjects: [
      { id: 's51', name: 'Hindi', code: 'C07-HIN', type: 'Compulsory' },
      { id: 's52', name: 'Environmental Studies', code: 'C07-EVS', type: 'Compulsory' },
      { id: 's53', name: 'English', code: 'C07-ENG', type: 'Compulsory', offList: true },
      { id: 's54', name: 'Mathematics', code: 'C07-MAT', type: 'Compulsory', offList: true },
      { id: 's55', name: 'Computer Science', code: 'C07-COM', type: 'Compulsory', offList: true },
      { id: 's56', name: 'Science', code: 'C07-SCI', type: 'Compulsory' },
    ]},
  ];

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
