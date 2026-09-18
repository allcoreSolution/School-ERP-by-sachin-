import React, { useState } from "react";
import { 
  MessageSquare, 
  Send, 
  Flag, 
  Lock, 
  Sliders, 
  Eye, 
  Filter as FilterIcon, 
  RotateCcw, 
  X, 
  ShieldAlert, 
  Check, 
  Sparkles,
  ArrowLeft,
  Settings,
  AlertCircle
} from "lucide-react";

const initialConversations = [
  { 
    id: 1, 
    teacher: "Amit Sharma", 
    withUser: "Anil Verma", 
    student: "Kabir Singh", 
    type: "Parent", 
    section: "Nursery - A",
    started: "30 Jul 2026",
    lastMsg: "Message removed", 
    lastActivity: "2 days ago", 
    isLocked: false, 
    transcript: [
      { sender: "Anil Verma", content: "Hello", time: "30 Jul, 04:02 AM", isSelf: false },
      { sender: "Amit Sharma", content: "Hello How are you?", time: "30 Jul, 04:12 AM", isSelf: true, isAuditRemoved: true },
      { sender: "Amit Sharma", content: "hello", time: "30 Jul, 04:12 AM", isSelf: true },
      { sender: "Anil Verma", content: "Hello", time: "30 Jul, 04:14 AM", isSelf: false },
      { sender: "Amit Sharma", content: "hello", time: "30 Jul, 04:43 AM", isSelf: true },
      { sender: "Amit Sharma", content: "hello", time: "30 Jul, 04:43 AM", isSelf: true },
      { sender: "Amit Sharma", content: "hello", time: "30 Jul, 04:43 AM", isSelf: true }
    ] 
  },
  { 
    id: 2, 
    teacher: "Amit Sharma", 
    withUser: "Dhruv Agarwal", 
    student: "Dhruv Agarwal", 
    type: "Student", 
    section: "Class 10 - B",
    started: "02 Aug 2026",
    lastMsg: "Hi", 
    lastActivity: "1 week ago", 
    isLocked: false, 
    transcript: [
      { sender: "Dhruv Agarwal", content: "Hi sir, can we submit the physics report tomorrow?", time: "1 week ago", isSelf: false },
      { sender: "Amit Sharma", content: "Yes Dhruv, upload it on the study center portal.", time: "1 week ago", isSelf: true }
    ] 
  },
  { 
    id: 3, 
    teacher: "Amit Sharma", 
    withUser: "Kabir Singh", 
    student: "Kabir Singh", 
    type: "Student", 
    section: "Class 10 - A",
    started: "03 Aug 2026",
    lastMsg: "Hi", 
    lastActivity: "1 week ago", 
    isLocked: false, 
    transcript: [
      { sender: "Kabir Singh", content: "Hi sir, what is the syllabus for class test?", time: "1 week ago", isSelf: false },
      { sender: "Amit Sharma", content: "Chapter 3 and 4 only.", time: "1 week ago", isSelf: true }
    ] 
  },
  { 
    id: 4, 
    teacher: "Amit Sharma", 
    withUser: "Ali Bansal", 
    student: "Ali Bansal", 
    type: "Student", 
    section: "Class 9 - C",
    started: "04 Aug 2026",
    lastMsg: "Hi", 
    lastActivity: "1 week ago", 
    isLocked: false, 
    transcript: [
      { sender: "Ali Bansal", content: "Hi sir", time: "1 week ago", isSelf: false },
      { sender: "Amit Sharma", content: "Hello Ali, how can I help you?", time: "1 week ago", isSelf: true }
    ] 
  },
  { 
    id: 5, 
    teacher: "Amit Sharma", 
    withUser: "Karan Shukla", 
    student: "Karan Shukla", 
    type: "Student", 
    section: "Class 10 - B",
    started: "05 Aug 2026",
    lastMsg: "Hi sir please check and confirm the status", 
    lastActivity: "1 week ago", 
    isLocked: true, 
    transcript: [
      { sender: "Karan Shukla", content: "Hi sir please check and confirm the status of the sports meet entry.", time: "1 week ago", isSelf: false },
      { sender: "Amit Sharma", content: "Confirmed Karan, you are on the list.", time: "1 week ago", isSelf: true }
    ] 
  },
  { 
    id: 6, 
    teacher: "Amit Sharma", 
    withUser: "Kiran Rao", 
    student: "Aaryan Rao", 
    type: "Parent", 
    section: "Class 10 - A",
    started: "06 Aug 2026",
    lastMsg: "—", 
    lastActivity: "—", 
    isLocked: false, 
    transcript: [] 
  },
  { 
    id: 7, 
    teacher: "Amit Sharma", 
    withUser: "Aaryan Rao", 
    student: "Aaryan Rao", 
    type: "Student", 
    section: "Class 10 - A",
    started: "07 Aug 2026",
    lastMsg: "—", 
    lastActivity: "—", 
    isLocked: false, 
    transcript: [] 
  },
  { 
    id: 8, 
    teacher: "Neha Gupta", 
    withUser: "Rohan Mehra", 
    student: "Rohan Mehra", 
    type: "Student", 
    section: "Class 8 - A",
    started: "10 Aug 2026",
    lastMsg: "Thank you ma'am", 
    lastActivity: "3 days ago", 
    isLocked: false, 
    transcript: [
      { sender: "Neha Gupta", content: "Your assignment is very well written Rohan.", time: "3 days ago", isSelf: true },
      { sender: "Rohan Mehra", content: "Thank you ma'am, I worked hard on it.", time: "3 days ago", isSelf: false }
    ] 
  },
  { 
    id: 9, 
    teacher: "Neha Gupta", 
    withUser: "Sunita Mehra", 
    student: "Rohan Mehra", 
    type: "Parent", 
    section: "Class 8 - A",
    started: "11 Aug 2026",
    lastMsg: "Will attend the meeting", 
    lastActivity: "4 days ago", 
    isLocked: true, 
    transcript: [
      { sender: "Neha Gupta", content: "Please attend the PTM meeting this Saturday.", time: "5 days ago", isSelf: true },
      { sender: "Sunita Mehra", content: "Will attend the meeting around 11:00 AM.", time: "4 days ago", isSelf: false }
    ] 
  }
];

export default function ChatModeration() {
  // Settings States
  const [chatEnabled, setChatEnabled] = useState(() => {
    return localStorage.getItem("chatEnabled") === "true";
  });
  const [teacherStudent, setTeacherStudent] = useState(true);
  const [teacherParent, setTeacherParent] = useState(true);
  const [showSaveToast, setShowSaveToast] = useState(false);

  // Filter States
  const [teacherFilter, setTeacherFilter] = useState("");
  const [studentFilter, setStudentFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [lockedOnly, setLockedOnly] = useState(false);

  // Conversations Lists
  const [conversations, setConversations] = useState(initialConversations);
  const [filteredConversations, setFilteredConversations] = useState(initialConversations);

  // Active Selected Transcript for full screen view details
  const [selectedTranscript, setSelectedTranscript] = useState(null);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [reportsCount, setReportsCount] = useState(1);

  // Apply filters
  const handleFilter = () => {
    const filtered = conversations.filter(item => {
      const matchTeacher = item.teacher.toLowerCase().includes(teacherFilter.toLowerCase());
      const matchStudent = item.student.toLowerCase().includes(studentFilter.toLowerCase());
      const matchType = typeFilter === "All" || item.type === typeFilter;
      const matchLocked = !lockedOnly || item.isLocked;

      return matchTeacher && matchStudent && matchType && matchLocked;
    });
    setFilteredConversations(filtered);
  };

  // Reset filters
  const handleReset = () => {
    setTeacherFilter("");
    setStudentFilter("");
    setTypeFilter("All");
    setLockedOnly(false);
    setFilteredConversations(conversations);
  };

  // Save Settings Configuration to localStorage
  const handleSaveSettings = () => {
    localStorage.setItem("chatEnabled", chatEnabled ? "true" : "false");
    setShowSaveToast(true);
    setTimeout(() => {
      setShowSaveToast(false);
    }, 3000);
  };

  // Toggle lock conversation status inside detail view
  const handleToggleLock = (id) => {
    setConversations(prev => prev.map(chat => {
      if (chat.id === id) {
        const nextState = !chat.isLocked;
        // Update selected view reference state
        setSelectedTranscript(curr => ({ ...curr, isLocked: nextState }));
        return { ...chat, isLocked: nextState };
      }
      return chat;
    }));
    // Re-trigger visual updates in filtered list
    setTimeout(() => {
      setFilteredConversations(prev => prev.map(chat => chat.id === id ? { ...chat, isLocked: !chat.isLocked } : chat));
    }, 50);
  };

  // RENDER DETAILED FULL PAGE TRANSCRIPT VIEW IF AN ITEM IS SELECTED
  if (selectedTranscript) {
    return (
      <div className="p-6 max-w-7xl mx-auto space-y-6 pb-20 font-sans">
        
        {/* Detail Header Bar */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSelectedTranscript(null)}
              className="p-1 text-slate-600 hover:bg-slate-100 rounded-none transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Transcript</h1>
          </div>

          <button 
            onClick={() => handleToggleLock(selectedTranscript.id)}
            className={`px-4 py-1.5 border rounded-none flex items-center gap-1.5 font-bold text-xs tracking-wide cursor-pointer transition-all active:scale-95 shadow-xs ${
              selectedTranscript.isLocked 
                ? 'bg-rose-50 border-rose-300 text-rose-600 hover:bg-rose-100' 
                : 'bg-white border-amber-400 text-amber-500 hover:bg-amber-50'
            }`}
          >
            <Lock className={`w-3.5 h-3.5 ${selectedTranscript.isLocked ? 'fill-current' : ''}`} />
            {selectedTranscript.isLocked ? 'Unlock conversation' : 'Lock conversation'}
          </button>
        </div>

        {/* Horizontal Metadata Summary Card */}
        <div className="bg-white border border-slate-200/80 rounded-none p-4 shadow-2xs">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-y-4 md:gap-x-8">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Teacher</p>
              <p className="text-sm font-bold text-slate-800 mt-1">{selectedTranscript.teacher}</p>
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">{selectedTranscript.type}</p>
              <p className="text-sm font-bold text-slate-800 mt-1">{selectedTranscript.withUser}</p>
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">About student</p>
              <p className="text-sm font-bold text-slate-800 mt-1">{selectedTranscript.student}</p>
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Section (at creation)</p>
              <p className="text-sm font-bold text-slate-800 mt-1">{selectedTranscript.section || "Nursery - A"}</p>
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Started</p>
              <p className="text-sm font-bold text-slate-800 mt-1">{selectedTranscript.started || "30 Jul 2026"}</p>
            </div>
          </div>
        </div>

        {/* Message Thread container */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-none p-6 min-h-[450px] space-y-6">
          {selectedTranscript.transcript.length > 0 ? (
            selectedTranscript.transcript.map((msg, index) => {
              return (
                <div key={index} className={`flex ${msg.isSelf ? 'justify-end' : 'justify-start'}`}>
                  <div className="max-w-[480px] w-full">
                    
                    {/* Left messages (from Parent/Student) */}
                    {!msg.isSelf ? (
                      <div className="bg-white border border-slate-200 rounded-none p-3.5 shadow-3xs relative">
                        <div className="flex items-center gap-2 mb-1.5 text-[11px]">
                          <span className="font-bold text-slate-800">{msg.sender}</span>
                          <span className="text-slate-400">{msg.time}</span>
                        </div>
                        <p className="text-[13px] text-slate-700 font-medium leading-relaxed">{msg.content}</p>
                      </div>
                    ) : (
                      // Right messages (from Teacher)
                      <div className="bg-[#eef2ff] border border-slate-200 rounded-none p-3.5 shadow-3xs relative">
                        <div className="flex items-center gap-2 mb-1.5 text-[11px]">
                          <span className="font-bold text-slate-800">{msg.sender}</span>
                          <span className="text-slate-400">{msg.time}</span>
                        </div>
                        
                        {msg.isAuditRemoved ? (
                          <div className="space-y-1">
                            <p className="text-[10px] text-slate-400 font-medium italic">
                              Message removed by sender (kept for audit)
                            </p>
                            <div className="border-l-2 border-slate-300 pl-2">
                              <p className="text-[13px] text-slate-400/80 italic leading-relaxed">{msg.content}</p>
                            </div>
                          </div>
                        ) : (
                          <p className="text-[13px] text-slate-700 font-medium leading-relaxed">{msg.content}</p>
                        )}
                      </div>
                    )}

                  </div>
                </div>
              );
            })
          ) : (
            <div className="h-[400px] flex flex-col items-center justify-center text-slate-400">
              <AlertCircle className="w-10 h-10 mb-2 opacity-40" />
              <p className="text-xs font-semibold">No messages recorded in this chat stream.</p>
            </div>
          )}
        </div>

      </div>
    );
  }

  // DEFAULT CHAT MODERATION MAIN VIEW (TABLE & SETTINGS)
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 pb-20 font-sans">
      
      {/* Toast Notification */}
      {showSaveToast && (
        <div className="fixed top-20 right-6 bg-slate-900 text-white px-4 py-3 rounded-none shadow-lg flex items-center gap-2 border border-slate-700/50 animate-bounce z-50 text-sm">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Chat settings saved and updated successfully!</span>
        </div>
      )}

      {/* Title & Reports Button */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Chat Moderation</h1>
          <p className="text-slate-500 text-sm">Monitor student-teacher communications, enforce guidelines, and review flags.</p>
        </div>
        
        <button 
          onClick={() => setShowReportsModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-rose-50 border border-rose-200 text-rose-600 rounded-none hover:bg-rose-100 hover:text-rose-700 transition-all font-semibold text-sm shadow-xs cursor-pointer"
        >
          <Flag className="w-4 h-4" />
          Reports
          {reportsCount > 0 && (
            <span className="bg-rose-600 text-white rounded-none text-[10px] w-4.5 h-4.5 flex items-center justify-center font-bold">
              {reportsCount}
            </span>
          )}
        </button>
      </div>

      {/* Metrics Row (4 Grid Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Card 1 */}
        <div className="bg-white border border-slate-200 rounded-none p-4 flex items-center gap-4 hover:shadow-xs transition-shadow">
          <div className="w-12 h-12 bg-indigo-50 rounded-none flex items-center justify-center text-indigo-600">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-800">{conversations.length}</div>
            <div className="text-xs text-slate-400 font-semibold tracking-wide uppercase">Conversations</div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-slate-200 rounded-none p-4 flex items-center gap-4 hover:shadow-xs transition-shadow">
          <div className="w-12 h-12 bg-teal-50 rounded-none flex items-center justify-center text-teal-600">
            <Send className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-800">24</div>
            <div className="text-xs text-slate-400 font-semibold tracking-wide uppercase">Messages Today</div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-slate-200 rounded-none p-4 flex items-center gap-4 hover:shadow-xs transition-shadow">
          <div className="w-12 h-12 bg-rose-50 rounded-none flex items-center justify-center text-rose-500">
            <Flag className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-800">{reportsCount}</div>
            <div className="text-xs text-slate-400 font-semibold tracking-wide uppercase">Open Reports</div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white border border-slate-200 rounded-none p-4 flex items-center gap-4 hover:shadow-xs transition-shadow">
          <div className="w-12 h-12 bg-amber-50 rounded-none flex items-center justify-center text-amber-500">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-800">
              {conversations.filter(c => c.isLocked).length}
            </div>
            <div className="text-xs text-slate-400 font-semibold tracking-wide uppercase">Locked Threads</div>
          </div>
        </div>

      </div>

      {/* Chat Settings Box */}
      <div className="bg-white border border-slate-200 rounded-none p-5 shadow-xs">
        <div className="flex items-center gap-2 border-b pb-3 mb-4">
          <Sliders className="w-5 h-5 text-indigo-600" />
          <h2 className="font-bold text-slate-800 text-md">Chat Settings</h2>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-6">
            
            {/* Toggle 1 */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setChatEnabled(!chatEnabled)}
                className={`relative inline-flex h-5.5 w-10 flex-shrink-0 cursor-pointer rounded-none border-2 border-transparent transition-colors duration-200 ease-in-out ${chatEnabled ? 'bg-indigo-600' : 'bg-slate-200'}`}
              >
                <span className={`pointer-events-none inline-block h-4.5 w-4.5 transform rounded-none bg-white transition duration-200 ease-in-out ${chatEnabled ? 'translate-x-4.5' : 'translate-x-0'}`} />
              </button>
              <span className="text-sm font-bold text-slate-700">Chat enabled</span>
            </div>

            {/* Toggle 2 */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setTeacherStudent(!teacherStudent)}
                className={`relative inline-flex h-5.5 w-10 flex-shrink-0 cursor-pointer rounded-none border-2 border-transparent transition-colors duration-200 ease-in-out ${teacherStudent ? 'bg-indigo-600' : 'bg-slate-200'}`}
              >
                <span className={`pointer-events-none inline-block h-4.5 w-4.5 transform rounded-none bg-white transition duration-200 ease-in-out ${teacherStudent ? 'translate-x-4.5' : 'translate-x-0'}`} />
              </button>
              <span className="text-sm font-bold text-slate-700">Teacher ↔ Student</span>
            </div>

            {/* Toggle 3 */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setTeacherParent(!teacherParent)}
                className={`relative inline-flex h-5.5 w-10 flex-shrink-0 cursor-pointer rounded-none border-2 border-transparent transition-colors duration-200 ease-in-out ${teacherParent ? 'bg-indigo-600' : 'bg-slate-200'}`}
              >
                <span className={`pointer-events-none inline-block h-4.5 w-4.5 transform rounded-none bg-white transition duration-200 ease-in-out ${teacherParent ? 'translate-x-4.5' : 'translate-x-0'}`} />
              </button>
              <span className="text-sm font-bold text-slate-700">Teacher ↔ Parent</span>
            </div>

            {/* Save Button */}
            <button 
              onClick={handleSaveSettings}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-5 py-2 rounded-none transition-transform hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
            >
              Save
            </button>

          </div>
        </div>

        {/* Detail Note */}
        <p className="mt-4 text-xs text-slate-400 font-medium leading-relaxed bg-slate-50 p-3 rounded-none border border-slate-100/80">
          Conversations are always between a teacher and a student (or their parent) of the teacher's own classes. 
          The school can read every transcript — the apps tell users chats are monitored.
        </p>
      </div>

      {/* Filter Row */}
      <div className="bg-slate-50 border border-slate-200 rounded-none p-4 flex flex-wrap items-center gap-4">
        
        {/* Teacher Input */}
        <div className="flex-1 min-w-[200px]">
          <input 
            type="text" 
            placeholder="Teacher name" 
            value={teacherFilter}
            onChange={(e) => setTeacherFilter(e.target.value)}
            className="w-full bg-white text-xs text-slate-800 placeholder-slate-400 rounded-none py-2 px-3 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-400"
          />
        </div>

        {/* Student Input */}
        <div className="flex-1 min-w-[200px]">
          <input 
            type="text" 
            placeholder="Student name" 
            value={studentFilter}
            onChange={(e) => setStudentFilter(e.target.value)}
            className="w-full bg-white text-xs text-slate-800 placeholder-slate-400 rounded-none py-2 px-3 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-400"
          />
        </div>

        {/* Dropdown Type */}
        <div className="w-36">
          <select 
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full bg-white text-xs text-slate-700 rounded-none py-2 px-2 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-400"
          >
            <option value="All">All types</option>
            <option value="Parent">Parent</option>
            <option value="Student">Student</option>
          </select>
        </div>

        {/* Checkbox locked */}
        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            id="locked" 
            checked={lockedOnly}
            onChange={(e) => setLockedOnly(e.target.checked)}
            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
          />
          <label htmlFor="locked" className="text-xs font-bold text-slate-600 cursor-pointer">Locked only</label>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button 
            onClick={handleFilter}
            className="px-4 py-2 border border-indigo-600 text-indigo-600 bg-white rounded-none hover:bg-indigo-50 transition-all font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <FilterIcon className="w-3.5 h-3.5" />
            Filter
          </button>
          
          <button 
            onClick={handleReset}
            className="px-4 py-2 border border-slate-300 text-slate-500 bg-white rounded-none hover:bg-slate-50 transition-all font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>

      </div>

      {/* Conversations Table */}
      <div className="bg-white border border-slate-200 rounded-none overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <th className="py-3 px-5">Teacher</th>
                <th className="py-3 px-5">With</th>
                <th className="py-3 px-5">Student</th>
                <th className="py-3 px-5 text-center">Type</th>
                <th className="py-3 px-5">Last message</th>
                <th className="py-3 px-5">Last activity</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/40 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-slate-700">{item.teacher}</td>
                    <td className="py-3.5 px-5 text-slate-600">{item.withUser}</td>
                    <td className="py-3.5 px-5 text-slate-600">{item.student}</td>
                    <td className="py-3.5 px-5 text-center">
                      <span className={`px-2 py-0.5 rounded-none font-bold text-[10px] uppercase tracking-wide border ${
                        item.type === "Parent"
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : "bg-teal-50 text-teal-700 border-teal-200"
                      }`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-5">
                      <span className={`${item.lastMsg.includes("removed") ? "text-rose-500 font-bold italic" : "text-slate-500"}`}>
                        {item.lastMsg}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-slate-400">{item.lastActivity}</td>
                    <td className="py-3.5 px-5 text-right">
                      {item.transcript.length > 0 ? (
                        <button 
                          onClick={() => setSelectedTranscript(item)}
                          className="px-3 py-1.5 border border-indigo-500 text-indigo-500 rounded-none hover:bg-indigo-50 transition-all font-semibold inline-flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95 animate-in fade-in duration-300"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Transcript
                        </button>
                      ) : (
                        <span className="text-slate-300 italic text-[11px] mr-4">No activity</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-400">
                    No active conversations matched this search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* REPORTS OVERVIEW DIALOG / MODAL */}
      {showReportsModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-none shadow-2xl overflow-hidden border border-slate-200">
            
            {/* Modal Header */}
            <div className="bg-rose-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-white" />
                <h3 className="font-bold text-sm">Active Moderation Flags</h3>
              </div>
              <button 
                onClick={() => setShowReportsModal(false)}
                className="p-1.5 hover:bg-white/10 rounded-none transition-colors text-white/80 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Reports List */}
            <div className="p-5 space-y-4 max-h-[300px] overflow-y-auto">
              <div className="p-4 bg-rose-50/50 border border-rose-200 rounded-none flex items-start gap-3">
                <Flag className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" />
                <div className="text-xs">
                  <div className="font-bold text-rose-800">Inappropriate Message Flagged</div>
                  <p className="text-[10px] text-slate-500 mt-0.5">Reported 2 days ago • From Parent: Anil Verma</p>
                  <p className="mt-2 text-slate-700 bg-white p-2 rounded-none border border-rose-100 font-semibold italic">
                    "[System removed message for containing standard-violating language]"
                  </p>
                  
                  <div className="mt-3 flex gap-2">
                    <button 
                      onClick={() => {
                        setReportsCount(0);
                        setShowReportsModal(false);
                      }}
                      className="px-3 py-1 bg-rose-600 text-white rounded-none text-[10px] font-bold hover:bg-rose-700 transition-colors shadow-sm cursor-pointer"
                    >
                      Clear Flag
                    </button>
                    <button 
                      onClick={() => {
                        alert("Parent Anil Verma notified regarding code of conduct.");
                        setShowReportsModal(false);
                      }}
                      className="px-3 py-1 bg-white border border-rose-300 text-rose-600 rounded-none text-[10px] font-bold hover:bg-rose-50 transition-colors cursor-pointer"
                    >
                      Warn Sender
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t bg-slate-50 flex justify-end">
              <button 
                onClick={() => setShowReportsModal(false)}
                className="px-4 py-2 border rounded-none text-xs font-semibold text-slate-500 hover:bg-slate-100 cursor-pointer"
              >
                Close Panel
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
