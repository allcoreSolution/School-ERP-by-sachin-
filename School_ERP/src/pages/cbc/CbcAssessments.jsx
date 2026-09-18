import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ListChecks, ArrowLeft, Plus, Filter, Users, Calendar, Settings
} from 'lucide-react';

const CbcAssessments = () => {
  const navigate = useNavigate();

  // State
  const [view, setView] = useState('list'); // 'list' | 'create'
  
  // Form State
  const [form, setForm] = useState({
    classId: '',
    sectionId: '',
    subjectId: '',
    taskType: 'Written',
    assessmentName: '',
    date: '',
    maxRating: '4'
  });

  const handleCreate = () => {
    if(!form.classId || !form.sectionId || !form.subjectId || !form.assessmentName || !form.date) {
      alert("Please fill all required fields before creating.");
      return;
    }
    alert(`Assessment "${form.assessmentName}" created successfully!`);
    setView('list');
    setForm({
      classId: '',
      sectionId: '',
      subjectId: '',
      taskType: 'Written',
      assessmentName: '',
      date: '',
      maxRating: '4'
    });
  };

  return (
    <div className="flex flex-col h-full bg-[#f4f6f8] overflow-y-auto">
      
      {/* List View */}
      {view === 'list' && (
        <>
          {/* Header */}
          <div className="px-6 py-4 bg-white border-b border-gray-200 flex justify-between items-center shrink-0">
            <h1 className="text-xl font-bold text-[#1a1a2e] flex items-center gap-2">
              <ListChecks className="w-6 h-6 text-green-600" /> CBC Assessments
            </h1>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/cbc/dashboard')}
                className="bg-white border border-gray-300 text-gray-600 px-3 py-1.5 rounded-none text-[12px] font-bold hover:bg-gray-50 flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Dashboard
              </button>
              <button 
                onClick={() => setView('create')}
                className="bg-[#28a745] hover:bg-[#218838] text-white px-4 py-1.5 rounded-none text-[12px] font-bold shadow-sm flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" /> New Assessment
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="bg-white p-4 border-b border-gray-200 shrink-0 flex justify-between items-center">
            <div>
              <h2 className="text-[13px] font-bold text-gray-700 flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-green-600" /> Filter Assessments
              </h2>
              <p className="text-[11px] text-gray-500 mt-0.5">Select a class section to view its planned assessments.</p>
            </div>
            
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-gray-400" />
              <select className="border border-gray-300 rounded-none px-3 py-1.5 text-[13px] text-gray-700 focus:outline-none focus:border-green-500 bg-white min-w-[200px]">
                <option value="">-- Choose Class / Section --</option>
                <option value="1">Class 1 - A</option>
                <option value="2">Class 2 - B</option>
              </select>
            </div>
          </div>

          {/* Main Area (Empty State) */}
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white m-6 rounded-none border border-gray-200 shadow-sm">
            <Users className="w-16 h-16 text-gray-200 mb-4" />
            <h2 className="text-xl font-light text-gray-500 mb-2">Select a Class Section</h2>
            <p className="text-[13px] text-gray-400">You must select a class section from the dropdown above to view or grade its assessments.</p>
          </div>
        </>
      )}

      {/* Create View */}
      {view === 'create' && (
        <div className="p-6 w-full max-w-4xl mx-auto flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setView('list')}
              className="p-1.5 text-gray-500 hover:bg-gray-200 rounded-none transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-[#1a1a2e] flex items-center gap-2">
              <Plus className="w-6 h-6 text-gray-800" /> Create CBC Assessment
            </h1>
          </div>

          <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
            {/* Orange top border line */}
            <div className="h-1 bg-[#fd7e14] w-full"></div>
            
            <div className="p-8 flex flex-col gap-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Row 1 */}
                <div>
                  <label className="block text-[12px] font-bold text-gray-800 mb-1">Class <span className="text-red-500">*</span></label>
                  <select 
                    value={form.classId}
                    onChange={(e) => setForm({...form, classId: e.target.value})}
                    className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#fd7e14] bg-white text-gray-600"
                  >
                    <option value="">-- Select --</option>
                    <option value="c1">Class 1</option>
                    <option value="c2">Class 2</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-[12px] font-bold text-gray-800 mb-1">Section <span className="text-red-500">*</span></label>
                  <select 
                    value={form.sectionId}
                    onChange={(e) => setForm({...form, sectionId: e.target.value})}
                    className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#fd7e14] bg-white text-gray-600"
                    disabled={!form.classId}
                  >
                    <option value="">-- Select Class First --</option>
                    <option value="s1">Section A</option>
                    <option value="s2">Section B</option>
                  </select>
                </div>

                {/* Row 2 */}
                <div>
                  <label className="block text-[12px] font-bold text-gray-800 mb-1">Subject <span className="text-red-500">*</span></label>
                  <select 
                    value={form.subjectId}
                    onChange={(e) => setForm({...form, subjectId: e.target.value})}
                    className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#fd7e14] bg-white text-gray-600"
                  >
                    <option value="">-- Select --</option>
                    <option value="sub1">English</option>
                    <option value="sub2">Mathematics</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-[12px] font-bold text-gray-800 mb-1">Task Type <span className="text-red-500">*</span></label>
                  <select 
                    value={form.taskType}
                    onChange={(e) => setForm({...form, taskType: e.target.value})}
                    className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#fd7e14] bg-white text-gray-600"
                  >
                    <option value="Written">Written</option>
                    <option value="Oral">Oral</option>
                    <option value="Practical">Practical</option>
                    <option value="Project">Project</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Row 3 */}
                <div>
                  <label className="block text-[12px] font-bold text-gray-800 mb-1">Assessment Name <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    placeholder="e.g. Term 1 Task 1"
                    value={form.assessmentName}
                    onChange={(e) => setForm({...form, assessmentName: e.target.value})}
                    className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#fd7e14]" 
                  />
                </div>
                
                <div>
                  <label className="block text-[12px] font-bold text-gray-800 mb-1">Date <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input 
                      type="date" 
                      value={form.date}
                      onChange={(e) => setForm({...form, date: e.target.value})}
                      className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#fd7e14]" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-gray-800 mb-1">Max Rating <span className="text-red-500">*</span></label>
                  <input 
                    type="number" 
                    value={form.maxRating}
                    onChange={(e) => setForm({...form, maxRating: e.target.value})}
                    className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#fd7e14]" 
                    min="1"
                  />
                </div>
              </div>

              <button 
                onClick={handleCreate}
                className="w-full mt-4 bg-[#fd7e14] hover:bg-[#e86e0c] text-white py-2.5 rounded-none text-[13px] font-bold shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <Settings className="w-4 h-4" /> Create Assessment
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CbcAssessments;
