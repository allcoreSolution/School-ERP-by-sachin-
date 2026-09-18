import React, { useState } from 'react';
import AcademicsTabs from '../../components/academics/AcademicsTabs';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Book, Layers, LayoutGrid, Link2, Users, 
  Clock, Calendar, UserPlus, Search, BookOpen, ShieldAlert, 
  IndianRupee, Activity, CheckCircle2, RotateCcw, Lock, AlertTriangle,
  ChevronDown, ChevronUp
} from 'lucide-react';

const Promote = () => {
  const navigate = useNavigate();

  const [expandedSection, setExpandedSection] = useState('guide'); // 'guide', 'safety', 'fees', 'status'

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
    { name: 'Timetable', icon: Calendar, path: '/academics/timetable' },
    { name: 'Teacher View', icon: Users, path: '#' },
    { name: 'Substitutions', icon: Users, path: '#' },
    { name: 'Promote', icon: UserPlus, path: '/academics/promote', active: true },
  ];

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
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

      {/* Main Content */}
      <div className="p-8 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
            
            <div className="p-4 border-b border-gray-200 flex items-center gap-2">
              <Search className="w-5 h-5 text-[#5F52FF]" />
              <h2 className="text-[15px] font-bold text-[#5F52FF]">Step 1 — Select Class to promote from</h2>
            </div>
            
            <div className="p-6">
              <div className="flex items-end gap-6">
                <div className="flex-1">
                  <label className="block text-[12px] font-bold text-gray-700 mb-1.5">
                    Current Class <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF] bg-white">
                    <option>-- Select Class --</option>
                    <option>Nursery</option>
                    <option>KG</option>
                    <option>Class I</option>
                  </select>
                </div>
                
                <div className="flex-1">
                  <label className="block text-[12px] font-bold text-gray-700 mb-1.5">
                    Current Section <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF] bg-white">
                    <option>-- Select Class First --</option>
                  </select>
                </div>
                
                <button 
                  onClick={() => alert('Searching for students...')}
                  className="bg-[#5F52FF] text-white px-8 py-2 rounded-none text-[13px] font-bold hover:bg-[#4E41E6] flex items-center gap-2 h-[38px]"
                >
                  <Search className="w-4 h-4" /> Find
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column - Accordions */}
        <div className="flex flex-col gap-4">
          
          {/* Promotion Guide */}
          <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
            <div 
              className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleSection('guide')}
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#5F52FF]" />
                <h3 className="text-[14px] font-bold text-[#1a1a2e]">Promotion guide</h3>
              </div>
              {expandedSection === 'guide' ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
            </div>
            
            {expandedSection === 'guide' && (
              <div className="px-4 pb-4 border-t border-gray-100 pt-3">
                <ul className="space-y-3 text-[12px] text-gray-600 leading-relaxed list-none p-0 m-0">
                  <li className="flex gap-2 items-start">
                    <span className="font-bold text-[#5F52FF] shrink-0">1.</span>
                    <p><strong>Pick the right mode</strong> — Promote moves students into the <strong>next</strong> session (end of year). Transfer moves them to another class/section <strong>inside the session you are already in</strong> (mid-year section change), with no session switching.</p>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="font-bold text-[#5F52FF] shrink-0">2.</span>
                    <p><strong>Pre-requisite (promote only)</strong> — create the <strong>next Academic Session</strong> first (Sessions → Add New). Transfer needs nothing.</p>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="font-bold text-[#5F52FF] shrink-0">3.</span>
                    <p><strong>Select source</strong> — pick the current class & section to load eligible students.</p>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="font-bold text-[#5F52FF] shrink-0">4.</span>
                    <p><strong>Choose destination</strong> — select the target class and section (plus the session, when promoting). All checked students move there.</p>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="font-bold text-[#5F52FF] shrink-0">5.</span>
                    <p><strong>Review & confirm</strong> — uncheck anyone who should <strong>not</strong> move, then confirm.</p>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Safety Information */}
          <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
            <div 
              className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleSection('safety')}
            >
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-orange-500" />
                <h3 className="text-[14px] font-bold text-[#1a1a2e]">Safety Information</h3>
              </div>
              {expandedSection === 'safety' ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
            </div>
            
            {expandedSection === 'safety' && (
              <div className="px-4 pb-4 border-t border-gray-100 pt-3 space-y-3">
                <div className="flex gap-2 items-start">
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <p className="text-[12px] text-gray-600"><strong>Promotion is non-destructive.</strong> No attendance, fees, or exam data is deleted or modified.</p>
                </div>
                <div className="flex gap-2 items-start">
                  <RotateCcw className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-[12px] text-gray-600"><strong>Reversible.</strong> If you promote by mistake, the old session record is preserved. Contact support to restore.</p>
                </div>
                <div className="flex gap-2 items-start">
                  <Lock className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-[12px] text-gray-600"><strong>Class editing is locked.</strong> Students' class/section can only be changed here — Promote for the next session, Transfer for a move inside the current one.</p>
                </div>
                <div className="flex gap-2 items-start">
                  <AlertTriangle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                  <p className="text-[12px] text-gray-600"><strong>Don't switch "Current Session"</strong> until all promotions are complete. A Transfer never needs a session switch.</p>
                </div>
              </div>
            )}
          </div>

          {/* Fees After Promotion */}
          <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
            <div 
              className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleSection('fees')}
            >
              <div className="flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-teal-600" />
                <h3 className="text-[14px] font-bold text-[#1a1a2e]">Fees After Promotion</h3>
              </div>
              {expandedSection === 'fees' ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
            </div>
            
            {expandedSection === 'fees' && (
              <div className="px-4 pb-4 border-t border-gray-100 pt-3">
                <p className="text-[12px] text-gray-600">Information about fees after promotion will be shown here.</p>
              </div>
            )}
          </div>

          {/* Session Status */}
          <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
            <div 
              className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleSection('status')}
            >
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#5F52FF]" />
                <h3 className="text-[14px] font-bold text-[#1a1a2e]">Session Status</h3>
              </div>
              {expandedSection === 'status' ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
            </div>
            
            {expandedSection === 'status' && (
              <div className="px-4 pb-4 border-t border-gray-100 pt-3">
                <p className="text-[12px] text-gray-600">Current session status information will be shown here.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default Promote;
