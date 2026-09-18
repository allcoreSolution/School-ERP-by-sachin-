import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AlignJustify, ArrowLeft, Lightbulb, Filter, PlusCircle, Trash2, 
  Settings, Check, Info, FileEdit, Save, FileQuestion
} from 'lucide-react';

const StrandsAndOutcomes = () => {
  const navigate = useNavigate();

  // State
  const [selectedSubject, setSelectedSubject] = useState('');
  const [managingStrandId, setManagingStrandId] = useState(null);
  const [newStrandName, setNewStrandName] = useState('');
  
  // Sub-strand form state
  const [subStrandForm, setSubStrandForm] = useState({
    name: '',
    outcome: '',
    lvl4: '',
    lvl3: '',
    lvl2: '',
    lvl1: ''
  });

  // Data State
  const [strands, setStrands] = useState([
    {
      id: '1',
      subject: 'English',
      name: 'fgf',
      subStrands: [
        { id: '1-1', name: 'df', outcome: 'df', lvl4: 'fd', lvl3: 'd', lvl2: 'fd', lvl1: 'fd' }
      ]
    },
    {
      id: '2',
      subject: 'English',
      name: 'Listening & Speaking',
      subStrands: [
        { id: '2-1', name: 'Oral Presentation', outcome: 'Learner presents ideas clearly to an audience using appropriate language', lvl4: '', lvl3: '', lvl2: '', lvl1: '' }
      ]
    },
    {
      id: '3',
      subject: 'English',
      name: 'Reading & Comprehension',
      subStrands: [
        { id: '3-1', name: 'Fluency & Expression', outcome: 'Learner reads grade-level text fluently with expression', lvl4: '', lvl3: '', lvl2: '', lvl1: '' },
        { id: '3-2', name: 'Comprehension Strategies', outcome: 'Learner can infer meaning, identify main ideas, and summarize texts', lvl4: '', lvl3: '', lvl2: '', lvl1: '' }
      ]
    },
    {
      id: '4',
      subject: 'English',
      name: 'Soni Tiwari',
      subStrands: []
    },
    {
      id: '5',
      subject: 'English',
      name: 'Writing & Composition',
      subStrands: [
        { id: '5-1', name: 'Narrative Writing', outcome: 'Learner can write structured narratives with beginning, middle, and end', lvl4: '', lvl3: '', lvl2: '', lvl1: '' },
        { id: '5-2', name: 'Grammar & Punctuation', outcome: 'Learner uses correct grammar, spelling, and punctuation in writing', lvl4: '', lvl3: '', lvl2: '', lvl1: '' }
      ]
    }
  ]);

  const subjects = ['English', 'Mathematics', 'Science', 'Social Studies'];

  // Handlers
  const handleCreateStrand = () => {
    if (!newStrandName.trim()) return;
    const newStrand = {
      id: Date.now().toString(),
      subject: selectedSubject,
      name: newStrandName,
      subStrands: []
    };
    setStrands([...strands, newStrand]);
    setNewStrandName('');
  };

  const handleDeleteStrand = (id) => {
    if (window.confirm('Are you sure you want to delete this strand and all its sub-strands?')) {
      setStrands(strands.filter(s => s.id !== id));
    }
  };

  const handleAddSubStrand = () => {
    if (!subStrandForm.name.trim()) {
      alert("Sub-Strand Name is required.");
      return;
    }
    
    const newSub = {
      id: Date.now().toString(),
      name: subStrandForm.name,
      outcome: subStrandForm.outcome,
      lvl4: subStrandForm.lvl4,
      lvl3: subStrandForm.lvl3,
      lvl2: subStrandForm.lvl2,
      lvl1: subStrandForm.lvl1
    };

    setStrands(strands.map(s => {
      if (s.id === managingStrandId) {
        return { ...s, subStrands: [...s.subStrands, newSub] };
      }
      return s;
    }));

    // Reset form
    setSubStrandForm({ name: '', outcome: '', lvl4: '', lvl3: '', lvl2: '', lvl1: '' });
  };

  const activeStrands = strands.filter(s => s.subject === selectedSubject);
  const managingStrand = strands.find(s => s.id === managingStrandId);

  return (
    <div className="flex flex-col h-full bg-[#f4f6f8] overflow-y-auto">
      
      {/* Top Header */}
      <div className="px-6 py-4 bg-white border-b border-gray-200 flex justify-between items-center shrink-0">
        <h1 className="text-xl font-bold text-[#1a1a2e] flex items-center gap-2">
          <AlignJustify className="w-6 h-6 text-blue-500" /> Strands & Learning Outcomes
        </h1>
        <button 
          onClick={() => navigate('/cbc/dashboard')}
          className="bg-white border border-gray-300 text-gray-600 px-3 py-1.5 rounded-none text-[12px] font-bold hover:bg-gray-50 flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </button>
      </div>

      {/* Info Banner */}
      <div className="p-4 shrink-0">
        <div className="bg-[#17a2b8] text-white p-4 rounded-none shadow-sm flex items-start gap-3">
          <Lightbulb className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-[14px]">How it works</h3>
            <p className="text-[12px] mt-1 opacity-90 leading-relaxed">
              In the CBC framework, you don't just teach "Math". You teach a <strong>Strand</strong> (e.g., "Numbers") which is broken down into specific <strong>Sub-Strands</strong> (e.g., "Addition"). Each Sub-Strand has a specific <strong>Learning Outcome</strong> that students must achieve, measured on a 1-4 scale.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 pt-0">
        
        {/* VIEW 3: Manage Sub-Strands */}
        {managingStrandId ? (
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Left Table Area */}
            <div className="flex-1 bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden flex flex-col">
              <div className="bg-[#f8f9fa] border-b border-gray-200 p-4 flex items-center gap-2">
                <button 
                  onClick={() => setManagingStrandId(null)}
                  className="mr-2 p-1.5 hover:bg-gray-200 rounded-none transition-colors text-gray-600"
                  title="Back to Strands"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <AlignJustify className="w-5 h-5 text-gray-800" />
                <h2 className="text-lg font-bold text-gray-800">{managingStrand.name} <span className="text-gray-400 font-normal">{managingStrand.subject}</span></h2>
              </div>
              
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-[14px] font-bold text-gray-700">Sub-Strands</h3>
              </div>

              <div className="flex-1 overflow-x-auto">
                <table className="w-full text-left text-[12px]">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-600">
                      <th className="py-2.5 px-4 font-bold">Name</th>
                      <th className="py-2.5 px-4 font-bold">Learning Outcome</th>
                      <th className="py-2.5 px-4 font-bold">Lvl 4 (Exceeding)</th>
                      <th className="py-2.5 px-4 font-bold">Lvl 3 (Meeting)</th>
                      <th className="py-2.5 px-4 font-bold">Lvl 2 (Approaching)</th>
                      <th className="py-2.5 px-4 font-bold">Lvl 1 (Below)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {managingStrand.subStrands.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="py-8 text-center text-gray-500 text-[12px]">
                          No sub-strands added yet. Use the form on the right to add one.
                        </td>
                      </tr>
                    ) : (
                      managingStrand.subStrands.map((sub, idx) => (
                        <tr key={sub.id} className={idx % 2 === 0 ? 'bg-gray-50/50 border-b border-gray-100' : 'border-b border-gray-100'}>
                          <td className="py-3 px-4 text-gray-800 font-medium">{sub.name}</td>
                          <td className="py-3 px-4 text-gray-600">{sub.outcome}</td>
                          <td className="py-3 px-4 text-green-600">{sub.lvl4}</td>
                          <td className="py-3 px-4 text-blue-500">{sub.lvl3}</td>
                          <td className="py-3 px-4 text-orange-500">{sub.lvl2}</td>
                          <td className="py-3 px-4 text-red-500">{sub.lvl1}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Form Area */}
            <div className="w-full lg:w-80 bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden shrink-0 h-fit sticky top-4">
              <div className="bg-[#f8f9fa] border-b border-[#28a745] p-3 border-t-2 border-t-[#28a745]">
                <h3 className="text-[13px] font-bold text-gray-800 flex items-center gap-1.5">
                  <PlusCircle className="w-4 h-4 text-green-600" /> Add Sub-Strand
                </h3>
              </div>
              <div className="p-4 flex flex-col gap-3">
                
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Sub-Strand Name <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    value={subStrandForm.name}
                    onChange={(e) => setSubStrandForm({...subStrandForm, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-none px-2.5 py-1.5 text-[12px] focus:outline-none focus:border-green-500" 
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Learning Outcome</label>
                  <textarea 
                    rows="2"
                    value={subStrandForm.outcome}
                    onChange={(e) => setSubStrandForm({...subStrandForm, outcome: e.target.value})}
                    className="w-full border border-gray-300 rounded-none px-2.5 py-1.5 text-[12px] focus:outline-none focus:border-green-500 resize-none" 
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Level 4 — Exceeding Expectation</label>
                  <input 
                    type="text" 
                    placeholder="Descriptor"
                    value={subStrandForm.lvl4}
                    onChange={(e) => setSubStrandForm({...subStrandForm, lvl4: e.target.value})}
                    className="w-full border border-gray-300 rounded-none px-2.5 py-1.5 text-[12px] focus:outline-none focus:border-green-500" 
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Level 3 — Meeting Expectation</label>
                  <input 
                    type="text" 
                    placeholder="Descriptor"
                    value={subStrandForm.lvl3}
                    onChange={(e) => setSubStrandForm({...subStrandForm, lvl3: e.target.value})}
                    className="w-full border border-gray-300 rounded-none px-2.5 py-1.5 text-[12px] focus:outline-none focus:border-green-500" 
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Level 2 — Approaching Expectation</label>
                  <input 
                    type="text" 
                    placeholder="Descriptor"
                    value={subStrandForm.lvl2}
                    onChange={(e) => setSubStrandForm({...subStrandForm, lvl2: e.target.value})}
                    className="w-full border border-gray-300 rounded-none px-2.5 py-1.5 text-[12px] focus:outline-none focus:border-green-500" 
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Level 1 — Below Expectation</label>
                  <input 
                    type="text" 
                    placeholder="Descriptor"
                    value={subStrandForm.lvl1}
                    onChange={(e) => setSubStrandForm({...subStrandForm, lvl1: e.target.value})}
                    className="w-full border border-gray-300 rounded-none px-2.5 py-1.5 text-[12px] focus:outline-none focus:border-green-500" 
                  />
                </div>

                <button 
                  onClick={handleAddSubStrand}
                  className="mt-2 w-full bg-[#28a745] hover:bg-[#218838] text-white py-2 rounded-none text-[12px] font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Save className="w-3.5 h-3.5" /> Add Sub-Strand
                </button>
              </div>
            </div>

          </div>
        ) : (
          /* VIEWS 1 & 2: Subject Selection and Manage Strands */
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Left Column: Select Subject & Add Strand */}
            <div className="w-full lg:w-[300px] shrink-0 flex flex-col gap-6">
              
              {/* Select Subject Card */}
              <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-3 border-b border-gray-100">
                  <h3 className="text-[12px] font-bold text-gray-600 flex items-center gap-1.5 uppercase">
                    <Filter className="w-3.5 h-3.5" /> 1. SELECT SUBJECT
                  </h3>
                </div>
                <div className="p-4">
                  <select 
                    className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] text-gray-700 focus:outline-none focus:border-blue-500 bg-white"
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                  >
                    <option value="">-- Choose a Subject to begin --</option>
                    {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              {/* Add New Strand Card (Only visible if subject is selected) */}
              {selectedSubject && (
                <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-3 border-b border-gray-100">
                    <h3 className="text-[12px] font-bold text-green-600 flex items-center gap-1.5 uppercase">
                      <PlusCircle className="w-3.5 h-3.5" /> 2. Add New Strand
                    </h3>
                  </div>
                  <div className="p-4 flex flex-col gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">Strand Name <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        placeholder="e.g. Health Education"
                        value={newStrandName}
                        onChange={(e) => setNewStrandName(e.target.value)}
                        className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-green-500" 
                      />
                    </div>
                    <button 
                      onClick={handleCreateStrand}
                      className="w-full bg-[#28a745] hover:bg-[#218838] text-white py-2 rounded-none text-[13px] font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <PlusCircle className="w-4 h-4" /> Create Strand
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Right Column: Main Content */}
            <div className="flex-1 bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden flex flex-col min-h-[400px]">
              
              {!selectedSubject ? (
                // View 1: Empty State
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                  <FileQuestion className="w-16 h-16 text-gray-200 mb-4" />
                  <h2 className="text-xl font-light text-gray-500 mb-2">Select a subject on the left</h2>
                  <p className="text-[13px] text-gray-400">Choose a subject to view or manage its Strands and Learning Outcomes.</p>
                </div>
              ) : (
                // View 2: Manage Strands List
                <div className="flex flex-col h-full">
                  <div className="p-3 border-b border-gray-200 bg-gray-50">
                    <h3 className="text-[12px] font-bold text-gray-700 uppercase">3. MANAGE STRANDS</h3>
                  </div>
                  
                  <div className="p-4 flex flex-col gap-6 overflow-y-auto">
                    {activeStrands.length === 0 ? (
                      <div className="text-center py-12 text-gray-400 text-[13px]">
                        No strands found for this subject. Use the form on the left to add one.
                      </div>
                    ) : (
                      activeStrands.map((strand) => (
                        <div key={strand.id} className="border border-gray-200 rounded-none overflow-hidden">
                          {/* Strand Header */}
                          <div className="bg-white p-3 flex items-center justify-between border-b border-gray-200">
                            <h4 className="font-bold text-[14px] text-blue-600 flex items-center gap-2">
                              <AlignJustify className="w-4 h-4" /> {strand.name}
                            </h4>
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => setManagingStrandId(strand.id)}
                                className="border border-blue-300 text-blue-500 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-none text-[11px] font-bold flex items-center gap-1.5 transition-colors"
                              >
                                <Settings className="w-3 h-3" /> Manage Sub-Strands
                              </button>
                              <button 
                                onClick={() => handleDeleteStrand(strand.id)}
                                className="border border-red-200 text-red-500 hover:bg-red-50 p-1 rounded-none transition-colors"
                                title="Delete Strand"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          
                          {/* Sub-strands List */}
                          <div className="bg-[#f8f9fa] p-0">
                            <table className="w-full text-left text-[12px]">
                              <thead>
                                <tr className="border-b border-gray-200 text-gray-600 bg-white">
                                  <th className="py-2 px-4 font-bold w-1/4">Sub-Strand</th>
                                  <th className="py-2 px-4 font-bold w-1/2">Learning Outcome</th>
                                  <th className="py-2 px-4 font-bold w-1/4 text-center">Rubric Definition</th>
                                </tr>
                              </thead>
                              <tbody>
                                {strand.subStrands.length === 0 ? (
                                  <tr>
                                    <td colSpan="3" className="py-6 text-center text-gray-500 text-[12px]">
                                      <Info className="w-4 h-4 inline-block mr-1 mb-0.5 opacity-50" />
                                      No sub-strands added yet. Click <strong>Manage Sub-Strands</strong> to add them.
                                    </td>
                                  </tr>
                                ) : (
                                  strand.subStrands.map((sub, idx) => (
                                    <tr key={sub.id} className={idx !== strand.subStrands.length - 1 ? 'border-b border-gray-100' : ''}>
                                      <td className="py-2.5 px-4 font-medium text-gray-800">{sub.name}</td>
                                      <td className="py-2.5 px-4 text-gray-500 text-[11px]">{sub.outcome}</td>
                                      <td className="py-2.5 px-4">
                                        <div className="flex items-center justify-center gap-1 w-full">
                                          {/* Colored lines to represent levels 4,3,2,1 */}
                                          <div className="h-1.5 flex-1 bg-green-500 rounded-none" title="Exceeding"></div>
                                          <div className="h-1.5 flex-1 bg-blue-500 rounded-none" title="Meeting"></div>
                                          <div className="h-1.5 flex-1 bg-orange-400 rounded-none" title="Approaching"></div>
                                          <div className="h-1.5 flex-1 bg-red-500 rounded-none" title="Below"></div>
                                        </div>
                                      </td>
                                    </tr>
                                  ))
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default StrandsAndOutcomes;
