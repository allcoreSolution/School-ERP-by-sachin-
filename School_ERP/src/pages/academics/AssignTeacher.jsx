import React, { useState } from 'react';
import AcademicsTabs from '../../components/academics/AcademicsTabs';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Book, Layers, LayoutGrid, Link2, Users, 
  Clock, Save, ChevronDown, X
} from 'lucide-react';

// Reusable MultiSelect Component
const MultiSelect = ({ options, selected, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (optionId) => {
    if (!selected.includes(optionId)) {
      onChange([...selected, optionId]);
    }
    setIsOpen(false);
  };

  const handleRemove = (optionId, e) => {
    e.stopPropagation();
    onChange(selected.filter(id => id !== optionId));
  };

  return (
    <div className="relative w-full min-w-[200px]">
      <div 
        className="min-h-[38px] border border-gray-300 rounded-none bg-white px-2 py-1 flex items-center justify-between cursor-pointer focus-within:border-[#5F52FF] shadow-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-1 items-center flex-1">
          {selected.length === 0 ? (
            <span className="text-gray-400 text-[12px] px-1">{placeholder}</span>
          ) : (
            selected.map(id => {
              const opt = options.find(o => o.id === id);
              if (!opt) return null;
              return (
                <span key={id} className="bg-[#EEEDFF] text-[#5F52FF] text-[11px] font-bold px-2 py-0.5 rounded-none flex items-center gap-1">
                  {opt.name}
                  <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={(e) => handleRemove(id, e)} />
                </span>
              );
            })
          )}
        </div>
        <ChevronDown className="w-4 h-4 text-gray-400 ml-1 shrink-0" />
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-none shadow-lg z-20 max-h-48 overflow-y-auto">
            {options.filter(o => !selected.includes(o.id)).length === 0 ? (
              <div className="p-2 text-center text-[12px] text-gray-500">All assigned</div>
            ) : (
              options.filter(o => !selected.includes(o.id)).map(opt => (
                <div 
                  key={opt.id} 
                  className="px-3 py-2 text-[12px] font-medium text-gray-700 hover:bg-[#F8F7FF] hover:text-[#5F52FF] cursor-pointer"
                  onClick={() => handleSelect(opt.id)}
                >
                  {opt.name}
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

const AssignTeacher = () => {
  const navigate = useNavigate();

  const data = [];
  const teachers = [];

  // Initialize state: { classId: { subjectId: { sectionName: [teacherIds] } } }
  const [assignments, setAssignments] = useState(() => {
    const initialState = {};
    data.forEach(cls => {
      initialState[cls.id] = {};
      cls.subjects.forEach(sub => {
        initialState[cls.id][sub.id] = {};
        cls.sections.forEach(sec => {
          // Pre-populate some dummy data to match screenshots
          if (cls.id === 'nursery' && sub.id === 'sub1' && sec === 'A') {
             initialState[cls.id][sub.id][sec] = ['t1', 't2'];
          } else {
             initialState[cls.id][sub.id][sec] = [];
          }
        });
      });
    });
    return initialState;
  });

  const handleAssignmentChange = (classId, subjectId, section, selectedTeachers) => {
    setAssignments(prev => ({
      ...prev,
      [classId]: {
        ...prev[classId],
        [subjectId]: {
          ...prev[classId][subjectId],
          [section]: selectedTeachers
        }
      }
    }));
  };

  const handleSaveClass = (classData) => {
    console.log(`Saved assignments for ${classData.name}:`, assignments[classData.id]);
    alert(`Assignments for ${classData.name} saved successfully!`);
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f9fc] overflow-y-auto">
      {/* Header */}
      <div className="px-8 pt-6 pb-2 bg-white">
        <h1 className="text-2xl font-bold text-[#1a1a2e]">Academic Management</h1>
        <p className="text-[13px] text-gray-500 mt-1">Configure and manage sessions, classes, sections, subjects, and timetables.</p>
        
        {/* Tabs */}
        <AcademicsTabs />
      </div>

      <div className="px-8 py-6 flex flex-col gap-6">
        
        <div className="mb-2">
          <h2 className="text-[16px] font-bold text-[#1a1a2e]">Assign teachers to subjects per section</h2>
          <p className="text-[12px] text-gray-500">Auto-save is not supported here.</p>
        </div>

        {/* Classes Accordions / Blocks */}
        {data.map(cls => (
          <div key={cls.id} className="bg-white border border-gray-200 rounded-none shadow-sm overflow-hidden">
            
            {/* Block Header */}
            <div className="p-3 bg-[#F8F7FF] border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4 rounded-none border-gray-300 text-[#5F52FF] focus:ring-[#5F52FF]" />
                <span className="font-bold text-[14px] text-[#1a1a2e]">{cls.name}</span>
              </div>
              <button 
                onClick={() => handleSaveClass(cls)}
                className="bg-[#5F52FF] text-white px-4 py-1.5 rounded-none text-[12px] font-bold hover:bg-[#4E41E6] shadow-sm flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" /> Save {cls.name}
              </button>
            </div>

            {/* Matrix Data Grid */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-white border-b border-gray-200">
                    <th className="py-3 px-4 w-[250px] text-[11px] font-bold text-gray-400 uppercase tracking-wider border-r border-gray-100">SUBJECTS</th>
                    {cls.sections.map(sec => (
                      <th key={sec} className="py-3 px-4 text-[12px] font-bold text-[#5F52FF] border-r border-gray-100">{sec}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cls.subjects.map(sub => (
                    <tr key={sub.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 border-r border-gray-100 align-top">
                        <div className="text-[13px] font-bold text-gray-800">{sub.name}</div>
                        <div className="text-[10px] text-gray-400 mt-0.5">{sub.code}</div>
                      </td>
                      {cls.sections.map(sec => (
                        <td key={sec} className="py-4 px-4 border-r border-gray-100 align-top w-[350px]">
                          <MultiSelect 
                            options={teachers}
                            selected={assignments[cls.id]?.[sub.id]?.[sec] || []}
                            onChange={(selected) => handleAssignmentChange(cls.id, sub.id, sec, selected)}
                            placeholder="Select teacher(s)..."
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default AssignTeacher;
