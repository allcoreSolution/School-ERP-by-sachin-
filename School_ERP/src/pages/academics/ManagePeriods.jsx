import React, { useState } from 'react';
import AcademicsTabs from '../../components/academics/AcademicsTabs';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Book, Layers, LayoutGrid, Link2, Users, 
  Clock, Plus, Wand2, Edit, Trash2, Copy, Info, X, Clock4, Settings
} from 'lucide-react';

const ManagePeriods = () => {
  const navigate = useNavigate();

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
    { name: 'Manage Periods', icon: Clock, path: '/academics/manage-periods', active: true },
  ];

  const classList = [
    'Nursery', 'KG', 'Class I', 'Class II', 'Class III', 'Class IV', 'Class V', 
    'Class VI', 'Class VII', 'Class VIII', 'Class IX', 'Class XI', 'Class XII', 
    'Class 11 science', 'KG1', 'c45', 'Gj', 'Gjgh', 'Class X', '123', 'ASHWANI DUBEY'
  ];

  // State for Modals
  const [activeModal, setActiveModal] = useState(null); // 'quick', 'new', 'edit', 'assign'
  const [editingSet, setEditingSet] = useState(null);

  // State for Period Sets
  const [periodSets, setPeriodSets] = useState([]);

  // Handlers
  const handleCopySet = (set) => {
    const newSet = {
      ...set,
      id: Date.now(),
      name: `${set.name} (Copy)`,
      isDefault: false,
      usedBy: []
    };
    setPeriodSets([...periodSets, newSet]);
    alert('Period set copied successfully!');
  };

  const handleDeleteSet = (id) => {
    if(window.confirm('Are you sure you want to delete this period set?')) {
      setPeriodSets(periodSets.filter(s => s.id !== id));
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setEditingSet(null);
  };

  return (
    <div className="flex flex-col h-full bg-[#f4f6f8] overflow-y-auto">
      
      {/* Header */}
      <div className="px-8 pt-6 pb-2 bg-white">
        <h1 className="text-2xl font-bold text-[#1a1a2e]">Academic Management</h1>
        <p className="text-[13px] text-gray-500 mt-1">Configure and manage sessions, classes, sections, subjects, and timetables.</p>
        
        {/* Tabs */}
        <AcademicsTabs />
      </div>

      <div className="px-8 py-6 max-w-7xl mx-auto w-full">
        
        {/* Top Actions & Info */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex-1"></div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveModal('quick')}
              className="bg-[#5F52FF] text-white px-4 py-2 rounded-none text-[13px] font-bold hover:bg-[#4E41E6] shadow-sm flex items-center gap-2"
            >
              <Wand2 className="w-4 h-4" /> Quick Setup
            </button>
            <button 
              onClick={() => setActiveModal('new')}
              className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-none text-[13px] font-bold hover:bg-gray-50 shadow-sm flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> New (empty) Set
            </button>
          </div>
        </div>

        <div className="bg-[#EEEDFF] border border-[#d6d2ff] rounded-none p-3 mb-6 flex items-start gap-3">
          <Info className="w-5 h-5 text-[#5F52FF] shrink-0 mt-0.5" />
          <p className="text-[13px] text-[#5F52FF] leading-relaxed">
            <strong>Period sets are shifts.</strong> Create a set (e.g. Morning Shift, Evening Shift, or Primary Wing), give it its own periods, then assign the classes that follow it. A class with no set assigned uses the <strong>Default</strong> set. Drag the handle to reorder periods.
          </p>
        </div>

        {/* Period Sets List */}
        <div className="space-y-6">
          {periodSets.map(set => (
            <div key={set.id} className="bg-white border border-gray-200 rounded-none shadow-sm">
              
              {/* Set Header */}
              <div className="p-4 border-b border-gray-200 flex justify-between items-start">
                <div>
                  <h3 className="text-[15px] font-bold text-[#1a1a2e] flex items-center gap-2">
                    <Clock4 className="w-4 h-4 text-gray-400" />
                    {set.name}
                    {set.isDefault && <span className="bg-[#e6f4ea] text-[#137333] px-2 py-0.5 rounded-none text-[10px] uppercase font-bold">Default</span>}
                  </h3>
                  
                  {set.isDefault && (
                    <p className="text-xs text-gray-400 mt-1">{set.description}</p>
                  )}
                  
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="text-xs text-gray-500">Used by:</span>
                    {set.usedBy.length === 0 ? (
                      <span className="text-xs text-gray-400 italic">None</span>
                    ) : (
                      <div className="flex flex-wrap gap-1">
                        {set.usedBy.slice(0, 10).map(cls => (
                          <span key={cls} className="text-xs font-semibold text-[#5F52FF]">{cls}</span>
                        ))}
                        {set.usedBy.length > 10 && <span className="text-xs font-semibold text-[#5F52FF]">...</span>}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => { setEditingSet(set); setActiveModal('assign'); }}
                    className="border border-gray-300 bg-white text-gray-700 px-3 py-1.5 rounded-none text-[12px] font-bold hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Users className="w-3.5 h-3.5" /> Assign Classes ({set.usedBy.length})
                  </button>
                  <button 
                    onClick={() => handleCopySet(set)}
                    className="p-1.5 border border-gray-300 bg-white text-gray-600 rounded-none hover:bg-gray-50" title="Copy"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => { setEditingSet(set); setActiveModal('edit'); }}
                    className="p-1.5 border border-gray-300 bg-white text-gray-600 rounded-none hover:bg-gray-50" title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  {!set.isDefault && (
                    <button 
                      onClick={() => handleDeleteSet(set.id)}
                      className="p-1.5 border border-gray-300 bg-white text-gray-600 rounded-none hover:bg-gray-50" title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Set Periods List */}
              <div className="p-4">
                {set.periods.length === 0 ? (
                  <p className="text-[13px] text-gray-400 italic mb-4">No periods yet — add the first one below.</p>
                ) : (
                  <div className="space-y-2 mb-4">
                    {set.periods.map(period => (
                      <div key={period.id} className="flex items-center gap-4 bg-[#f8f9fa] border border-gray-100 rounded-none p-2">
                        <div className="flex items-center gap-2 w-48">
                          <LayoutGrid className="w-4 h-4 text-gray-400 cursor-move" />
                          <span className="text-[13px] font-bold text-gray-700">{period.name}</span>
                        </div>
                        <div className="w-32">
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-none ${period.type === 'Teaching' ? 'bg-[#e8f0fe] text-[#1a73e8]' : 'bg-[#fef7e0] text-[#f29900]'}`}>
                            {period.type}
                          </span>
                        </div>
                        <div className="flex-1 text-[13px] text-gray-600 font-medium">
                          {period.start} - {period.end}
                        </div>
                        <div className="flex gap-2">
                          <button className="p-1 text-gray-400 hover:text-[#5F52FF]"><Edit className="w-4 h-4" /></button>
                          <button className="p-1 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Period Row */}
                <div className="flex items-end gap-4 mt-2 pt-4 border-t border-dashed border-gray-200">
                  <div className="flex-1">
                    <label className="block text-[11px] font-bold text-gray-500 mb-1">Period name</label>
                    <input type="text" placeholder="e.g. Period 1" className="w-full border border-gray-300 rounded-none px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#5F52FF]" />
                  </div>
                  <div className="w-48">
                    <label className="block text-[11px] font-bold text-gray-500 mb-1">Type</label>
                    <select className="w-full border border-gray-300 rounded-none px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#5F52FF] bg-white">
                      <option>Teaching</option>
                      <option>Break</option>
                    </select>
                  </div>
                  <div className="w-32">
                    <label className="block text-[11px] font-bold text-gray-500 mb-1">Start</label>
                    <input type="time" className="w-full border border-gray-300 rounded-none px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#5F52FF]" />
                  </div>
                  <div className="w-32">
                    <label className="block text-[11px] font-bold text-gray-500 mb-1">End</label>
                    <input type="time" className="w-full border border-gray-300 rounded-none px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#5F52FF]" />
                  </div>
                  <button className="bg-[#5F52FF] text-white px-4 py-1.5 rounded-none text-[13px] font-bold hover:bg-[#4E41E6] flex items-center justify-center gap-2 h-[34px] min-w-[120px]">
                    <Plus className="w-4 h-4" /> Add period
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* --- MODALS --- */}

      {/* 1. Quick Period Setup Modal */}
      {activeModal === 'quick' && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-none shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h2 className="text-[18px] font-bold text-[#1a1a2e] flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-[#5F52FF]" /> Quick Period Setup
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <p className="text-[13px] text-gray-500 mb-6">Generate a full set of periods in one go. You can fine-tune any timing afterwards by editing individual periods.</p>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Set name <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="e.g. Morning Shift" className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF]" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Day starts at <span className="text-red-500">*</span></label>
                  <input type="time" defaultValue="08:00" className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF]" />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Description <span className="text-gray-400 font-normal">(optional)</span></label>
                <input type="text" placeholder="Who follows this shift?" className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF]" />
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Number of periods <span className="text-red-500">*</span></label>
                  <input type="number" defaultValue="8" className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF]" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Each period lasts (minutes) <span className="text-red-500">*</span></label>
                  <input type="number" defaultValue="45" className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF]" />
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-none p-4">
                <h3 className="text-[13px] font-bold text-gray-700 flex items-center gap-2 mb-4">
                  ☕ Breaks <span className="text-gray-400 font-normal">(optional)</span>
                </h3>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-[12px] font-bold text-gray-500 mb-1">Break 1 label</label>
                    <input type="text" defaultValue="Short Break" className="w-full border border-gray-300 rounded-none px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#5F52FF]" />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-gray-500 mb-1">After period #</label>
                    <input type="number" defaultValue="2" className="w-full border border-gray-300 rounded-none px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#5F52FF]" />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-gray-500 mb-1">Length (min)</label>
                    <input type="number" defaultValue="15" className="w-full border border-gray-300 rounded-none px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#5F52FF]" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[12px] font-bold text-gray-500 mb-1">Break 2 label</label>
                    <input type="text" defaultValue="Lunch Break" className="w-full border border-gray-300 rounded-none px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#5F52FF]" />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-gray-500 mb-1">After period #</label>
                    <input type="number" defaultValue="4" className="w-full border border-gray-300 rounded-none px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#5F52FF]" />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-gray-500 mb-1">Length (min)</label>
                    <input type="number" defaultValue="30" className="w-full border border-gray-300 rounded-none px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#5F52FF]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
              <button onClick={closeModal} className="px-4 py-2 border border-gray-300 rounded-none text-[13px] font-bold text-gray-600 bg-white hover:bg-gray-100">Cancel</button>
              <button onClick={() => { alert('Periods generated!'); closeModal(); }} className="px-4 py-2 bg-[#5F52FF] text-white rounded-none text-[13px] font-bold hover:bg-[#4E41E6] flex items-center gap-2">
                <Wand2 className="w-4 h-4" /> Generate periods
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. New Period Set Modal */}
      {activeModal === 'new' && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-none shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h2 className="text-[16px] font-bold text-[#1a1a2e]">New Period Set</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Name <span className="text-red-500">*</span></label>
                <input type="text" placeholder="e.g. Morning Shift" className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF]" />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Description <span className="text-gray-400 font-normal">(optional)</span></label>
                <input type="text" placeholder="Who follows this shift?" className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF]" />
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
              <button onClick={closeModal} className="px-4 py-2 border border-gray-300 rounded-none text-[13px] font-bold text-gray-600 bg-white hover:bg-gray-100">Cancel</button>
              <button onClick={() => { alert('Set created!'); closeModal(); }} className="px-4 py-2 bg-[#5F52FF] text-white rounded-none text-[13px] font-bold hover:bg-[#4E41E6]">
                Create set
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Edit Period Set Modal */}
      {activeModal === 'edit' && editingSet && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-none shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h2 className="text-[16px] font-bold text-[#1a1a2e]">Edit Period Set</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Name <span className="text-red-500">*</span></label>
                <input type="text" defaultValue={editingSet.name} className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF]" />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Description <span className="text-gray-400 font-normal">(optional)</span></label>
                <input type="text" defaultValue={editingSet.description} className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF]" />
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
              <button onClick={closeModal} className="px-4 py-2 border border-gray-300 rounded-none text-[13px] font-bold text-gray-600 bg-white hover:bg-gray-100">Cancel</button>
              <button onClick={() => { alert('Changes saved!'); closeModal(); }} className="px-4 py-2 bg-[#5F52FF] text-white rounded-none text-[13px] font-bold hover:bg-[#4E41E6]">
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Assign Classes Modal */}
      {activeModal === 'assign' && editingSet && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-none shadow-xl w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h2 className="text-[16px] font-bold text-[#1a1a2e]">Assign Classes — {editingSet.name}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <p className="text-[12px] text-gray-500 mb-4">Tick the classes that follow this shift. Unticking a class returns it to the Default set.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6">
                {classList.map((cls, idx) => (
                  <label key={idx} className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      defaultChecked={editingSet.usedBy.includes(cls)}
                      className="w-4 h-4 rounded-none border-gray-300 text-[#5F52FF] focus:ring-[#5F52FF] cursor-pointer" 
                    />
                    <span className="text-[13px] font-semibold text-gray-700 group-hover:text-gray-900">{cls}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
              <button onClick={closeModal} className="px-4 py-2 border border-gray-300 rounded-none text-[13px] font-bold text-gray-600 bg-white hover:bg-gray-100">Cancel</button>
              <button onClick={() => { alert('Assignments saved!'); closeModal(); }} className="px-4 py-2 bg-[#5F52FF] text-white rounded-none text-[13px] font-bold hover:bg-[#4E41E6]">
                Save assignment
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ManagePeriods;
