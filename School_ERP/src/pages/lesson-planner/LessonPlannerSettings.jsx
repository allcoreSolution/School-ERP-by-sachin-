import React, { useState } from 'react';
import { 
  LayoutDashboard, BookOpen, Users, CheckSquare, BarChart2, Settings, HelpCircle, 
  Plus, Save, Trash2, Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LessonPlannerSettings() {
  const navigate = useNavigate();

  // State for toggles
  const [enableHOD, setEnableHOD] = useState(true);
  const [allowEdit, setAllowEdit] = useState(true);
  const [sendReminder, setSendReminder] = useState(false);

  // State for department heads
  const [departments, setDepartments] = useState([
    { id: 1, name: 'Mathematics', head: 'Vikram Singh' }
  ]);
  const [newDept, setNewDept] = useState('');
  const [newHead, setNewHead] = useState('');

  const handleDeleteDept = (id) => {
    setDepartments(departments.filter(d => d.id !== id));
  };

  const handleAddDept = () => {
    if (newDept && newHead) {
      setDepartments([...departments, { id: Date.now(), name: newDept, head: newHead }]);
      setNewDept('');
      setNewHead('');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-10">
      
      {/* Header */}
      <div className="bg-white px-6 py-4 flex justify-between items-center border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Lesson Planner</h1>
          <p className="text-[11px] text-slate-500 mt-1">Plan the week ahead — objectives, methods, syllabus topics — submit for approval, then track coverage.</p>
        </div>
        <button 
          onClick={() => navigate('/lesson-planner/new')}
          className="px-4 py-2 bg-[#007bff] hover:bg-[#0056b3] text-white font-bold text-[12px] rounded-none flex items-center gap-2 transition-colors cursor-pointer border-none shadow-sm"
        >
          <Plus className="w-4 h-4" /> New Lesson Plan
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white px-6 border-b border-slate-200 flex items-center gap-6 text-[12px] font-bold overflow-x-auto">
        <button onClick={() => navigate('/lesson-planner/dashboard')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer whitespace-nowrap">
          <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
        </button>
        <button onClick={() => navigate('/lesson-planner/plans')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer whitespace-nowrap">
          <BookOpen className="w-3.5 h-3.5" /> Lesson Plans
        </button>
        <button onClick={() => navigate('/lesson-planner/review')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer whitespace-nowrap">
          <Users className="w-3.5 h-3.5" /> Review (HOD)
        </button>
        <button onClick={() => navigate('/lesson-planner/approvals')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer whitespace-nowrap">
          <CheckSquare className="w-3.5 h-3.5" /> Approvals
        </button>
        <button onClick={() => navigate('/lesson-planner/coverage')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer whitespace-nowrap">
          <FileTextIcon /> Coverage
        </button>
        <button onClick={() => navigate('/lesson-planner/reports')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer whitespace-nowrap">
          <BarChart2 className="w-3.5 h-3.5" /> Reports
        </button>
        <button className="flex items-center gap-2 py-3 text-slate-800 border-b-2 border-slate-800 cursor-pointer whitespace-nowrap">
          <Settings className="w-3.5 h-3.5" /> Settings
        </button>
        <button onClick={() => navigate('/lesson-planner/guide')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer whitespace-nowrap">
          <HelpCircle className="w-3.5 h-3.5" /> Guide
        </button>
      </div>

      <div className="p-6 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Column: Workflow & reminders */}
          <div className="bg-white border border-slate-200 rounded-none shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100">
              <h2 className="text-[15px] font-bold text-slate-800">Workflow & reminders</h2>
            </div>
            
            <div className="p-6 space-y-8">
              
              {/* Toggle: Enable HOD review step */}
              <div className="flex gap-4">
                <button 
                  onClick={() => setEnableHOD(!enableHOD)}
                  className={`relative w-[40px] h-5 rounded-none flex-shrink-0 transition-colors ${enableHOD ? 'bg-[#007bff]' : 'bg-slate-300'}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-none transition-transform ${enableHOD ? 'left-[22px]' : 'left-0.5'}`}></div>
                </button>
                <div>
                  <h3 className="text-[13px] font-bold text-slate-800 mb-1">Enable HOD review step</h3>
                  <p className="text-[11.5px] text-slate-500 leading-relaxed">
                    When on, a submitted plan goes to the teacher's department head first (if mapped below), then the principal. When off, it goes straight to the principal.
                  </p>
                </div>
              </div>

              {/* Toggle: Allow teachers to edit */}
              <div className="flex gap-4">
                <button 
                  onClick={() => setAllowEdit(!allowEdit)}
                  className={`relative w-[40px] h-5 rounded-none flex-shrink-0 transition-colors ${allowEdit ? 'bg-[#007bff]' : 'bg-slate-300'}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-none transition-transform ${allowEdit ? 'left-[22px]' : 'left-0.5'}`}></div>
                </button>
                <div>
                  <h3 className="text-[13px] font-bold text-slate-800 mb-1">Allow teachers to edit after submitting</h3>
                  <p className="text-[11.5px] text-slate-500 leading-relaxed">
                    Off by default - a submitted plan is locked until it's approved or returned.
                  </p>
                </div>
              </div>

              {/* Toggle: Send weekly submission reminder */}
              <div className="flex gap-4">
                <button 
                  onClick={() => setSendReminder(!sendReminder)}
                  className={`relative w-[40px] h-5 rounded-none flex-shrink-0 transition-colors ${sendReminder ? 'bg-[#007bff]' : 'bg-slate-300'}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-none transition-transform ${sendReminder ? 'left-[22px]' : 'left-0.5'}`}></div>
                </button>
                <div className="flex-1">
                  <h3 className="text-[13px] font-bold text-slate-800 mb-1">Send weekly submission reminder</h3>
                  <p className="text-[11.5px] text-slate-500 leading-relaxed mb-4">
                    Reminds teachers who haven't submitted for the coming week. Channels are configured in Settings - Notifications.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-500 mb-1.5">Reminder day</label>
                      <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] text-slate-700 focus:outline-none focus:border-slate-400 bg-white">
                        <option>Friday</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-500 mb-1.5">Reminder time</label>
                      <div className="relative">
                        <input type="time" defaultValue="15:00" className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] text-slate-700 focus:outline-none focus:border-slate-400 pl-3 pr-10" />
                        <Clock className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-500 mb-1.5">Submission deadline day</label>
                      <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] text-slate-700 focus:outline-none focus:border-slate-400 bg-white">
                        <option>Sunday</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-500 mb-1.5">Submission deadline time</label>
                      <div className="relative">
                        <input type="time" defaultValue="22:00" className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] text-slate-700 focus:outline-none focus:border-slate-400 pl-3 pr-10" />
                        <Clock className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-[11px] text-slate-400 italic">
                    The deadline is shown in the reminder text; the reminder itself is sent at the day/time above.
                  </p>
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-2">
                <button 
                  onClick={() => alert('Settings saved!')}
                  className="px-4 py-2 bg-[#fd7e14] hover:bg-[#e86e0c] text-white text-[13px] font-bold rounded-none flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Save settings
                </button>
              </div>

            </div>
          </div>

          {/* Right Column: Department heads */}
          <div className="bg-white border border-slate-200 rounded-none shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100">
              <h2 className="text-[15px] font-bold text-slate-800">Department heads (HOD routing)</h2>
            </div>
            
            <div className="p-6">
              <p className="text-[12px] text-slate-500 leading-relaxed mb-6">
                Maps a department (as written on staff records) to the head who reviews its plans. Only used when the HOD step is enabled.
              </p>

              <div className="overflow-x-auto mb-8">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="pb-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Department</th>
                      <th className="pb-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Head</th>
                      <th className="pb-2"></th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px] text-slate-700">
                    {departments.map((dept) => (
                      <tr key={dept.id} className="border-b border-slate-100 last:border-0">
                        <td className="py-3">{dept.name}</td>
                        <td className="py-3">{dept.head}</td>
                        <td className="py-3 text-right">
                          <button 
                            onClick={() => handleDeleteDept(dept.id)}
                            className="w-7 h-7 inline-flex items-center justify-center border border-[#dc3545] rounded-none text-[#dc3545] hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="space-y-4 max-w-sm">
                <div>
                  <label className="block text-[11px] font-medium text-slate-500 mb-1.5">Department</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Science" 
                    value={newDept}
                    onChange={(e) => setNewDept(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] focus:outline-none focus:border-slate-400" 
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-500 mb-1.5">Head of department</label>
                  <select 
                    value={newHead}
                    onChange={(e) => setNewHead(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] text-slate-700 bg-white focus:outline-none focus:border-slate-400"
                  >
                    <option value="">-- Select staff --</option>
                    <option value="Amit Sharma">Amit Sharma</option>
                    <option value="Rajesh Kumar">Rajesh Kumar</option>
                    <option value="Vikram Singh">Vikram Singh</option>
                  </select>
                </div>
                <div className="pt-1">
                  <button 
                    onClick={handleAddDept}
                    className="px-3 py-1.5 bg-white border border-[#007bff] text-[#007bff] hover:bg-blue-50 text-[12px] font-bold rounded-none flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Assign head
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Inline component for FileText to avoid import issues if missing
function FileTextIcon(props) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" height="24" 
      viewBox="0 0 24 24" fill="none" 
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
      className="w-3.5 h-3.5"
      {...props}
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <line x1="10" y1="9" x2="8" y2="9"/>
    </svg>
  );
}
