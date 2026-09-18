import React, { useState } from "react";
import { 
  Save, 
  Info, 
  Check, 
  HelpCircle, 
  Smartphone, 
  Lock, 
  User, 
  BookOpen, 
  Settings, 
  Globe, 
  Edit3, 
  Package, 
  Tag, 
  Cpu, 
  MessageSquare, 
  Monitor, 
  Video, 
  DollarSign, 
  Building, 
  ListTodo, 
  Volume2, 
  FileQuestion, 
  Fingerprint, 
  Award, 
  Heart, 
  Grid, 
  Handshake, 
  BookOpenCheck, 
  PenTool,
  CheckCircle,
  Eye,
  Camera,
  Activity,
  BarChart,
  Truck,
  FileText
} from "lucide-react";

// Core Modules List configuration
const CORE_MODULES = [
  { name: "Student Information", icon: "🎓" },
  { name: "Academics", icon: "📖" },
  { name: "Fees Collection", icon: "💵" },
  { name: "Human Resource", icon: "💼" },
  { name: "Offline Examinations", icon: "📝" },
  { name: "Certificates & Documents", icon: "📜" },
  { name: "ID Cards", icon: "💳" }
];

// Optional / Toggleable Modules List matching Screenshot 1 & 2 sequence
const OPTIONAL_MODULES = [
  { key: "schoolWebsite", name: "School Website", icon: Globe },
  { key: "homework", name: "Homework", icon: Edit3 },
  { key: "libraryManagement", name: "Library Management", icon: BookOpen },
  { key: "transport", name: "Transport", icon: Truck },
  { key: "hostel", name: "Hostel", icon: Building },
  { key: "inventory", name: "Inventory", icon: Package },
  { key: "assetManagement", name: "Asset Management", icon: Tag },
  { key: "aiAssistant", name: "AI Assistant & Analytics", icon: Cpu },
  { key: "chatbot", name: "Knowledge Base & Chatbot", icon: MessageSquare },
  { key: "studyCenter", name: "Study Center", icon: Monitor },
  { key: "liveClasses", name: "Live Classes", icon: Video },
  { key: "finance", name: "Accounts & Finance", icon: DollarSign },
  { key: "frontOffice", name: "Front Office", icon: Building },
  { key: "leadManagement", name: "Lead Management", icon: ListTodo },
  { key: "communications", name: "Communications", icon: Volume2 },
  { key: "onlineExams", name: "Online Examinations", icon: FileQuestion },
  { key: "biometricAttendance", name: "Biometric Attendance", icon: Fingerprint },
  { key: "cbcAcademics", name: "CBC / Competency Academics", icon: Award },
  { key: "healthRecords", name: "Student Health Records", icon: Heart },
  { key: "appsCenter", name: "Apps Center", icon: Grid },
  { key: "ptm", name: "Parent-Teacher Meetings", icon: Handshake },
  { key: "lessonPlanner", name: "Lesson Planner", icon: BookOpenCheck },
  { key: "osmEvaluation", name: "Digital Evaluation (OSM)", icon: PenTool }
];

// Parent App Visibility Modules List matching Screenshot 3
const PARENT_VISIBILITY_MODULES = [
  { key: "aiAssistant", name: "AI Assistant & Analytics", icon: Cpu },
  { key: "assessment", name: "Assessment", icon: CheckCircle },
  { key: "cbcAcademics", name: "CBC / Competency Academics", icon: Award },
  { key: "cctvSurveillance", name: "CCTV / Live Surveillance", icon: Camera },
  { key: "osmEvaluation", name: "Digital Evaluation (OSM)", icon: PenTool },
  { key: "healthRecords", name: "Student Health Records", icon: Heart },
  { key: "homework", name: "Homework", icon: Edit3 },
  { key: "chatbot", name: "Knowledge Base & Chatbot", icon: MessageSquare },
  { key: "lessonPlanner", name: "Lesson Planner", icon: BookOpenCheck },
  { key: "libraryManagement", name: "Library Management", icon: BookOpen },
  { key: "onlineExams", name: "Online Examinations", icon: FileQuestion },
  { key: "ptm", name: "Parent-Teacher Meetings", icon: Handshake },
  { key: "studyCenter", name: "Study Center", icon: Monitor },
  { key: "surveysFeedback", name: "Surveys & Feedback", icon: BarChart },
  { key: "transport", name: "Transport", icon: Truck }
];

export default function ModuleSettings() {
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  // 1. Modules active state
  const [modules, setModules] = useState({
    schoolWebsite: true,
    homework: true,
    libraryManagement: true,
    transport: true,
    hostel: true,
    inventory: true,
    assetManagement: true,
    aiAssistant: true,
    chatbot: true,
    studyCenter: true,
    liveClasses: true,
    finance: true,
    frontOffice: true,
    leadManagement: true,
    communications: true,
    onlineExams: true,
    biometricAttendance: true,
    cbcAcademics: true,
    healthRecords: true,
    appsCenter: true,
    ptm: true,
    lessonPlanner: true,
    osmEvaluation: true
  });

  // 2. Parent App Visibility active state (with iOS style switches)
  const [parentVisibility, setParentVisibility] = useState({
    aiAssistant: true,
    assessment: true,
    cbcAcademics: true,
    cctvSurveillance: true,
    osmEvaluation: true,
    healthRecords: true,
    homework: true,
    chatbot: true,
    lessonPlanner: true,
    libraryManagement: true,
    onlineExams: true,
    ptm: true,
    studyCenter: true,
    surveysFeedback: true,
    transport: true
  });

  const handleToggleModule = (key) => {
    setModules(prev => {
      const next = { ...prev, [key]: !prev[key] };
      localStorage.setItem(`module_${key}`, next[key] ? "active" : "inactive");
      return next;
    });
  };

  const handleToggleParentVisibility = (key) => {
    setParentVisibility(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSaveConfiguration = (e) => {
    e.preventDefault();
    setToastMsg("Module visibility and parent configurations updated successfully!");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-sans text-gray-800 relative">
      
      {/* Toast Success popup */}
      {showToast && (
        <div className="fixed top-20 right-6 bg-slate-900 text-white px-4 py-3 rounded-none shadow-lg flex items-center gap-2 border border-slate-700/50 animate-bounce z-50 text-xs">
          <Check className="w-4 h-4 text-emerald-400" />
          <span className="font-bold">{toastMsg}</span>
        </div>
      )}

      {/* Header Row */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Module Management</h1>
          <p className="text-slate-500 text-sm">Enable or disable features for your school</p>
        </div>
        <button
          onClick={handleSaveConfiguration}
          className="px-4 py-2 bg-indigo-650 hover:bg-indigo-700 text-white font-bold text-xs rounded-none flex items-center gap-1.5 shadow-md cursor-pointer transition-all active:scale-95"
        >
          <Save className="w-4 h-4 text-white" />
          Save Configuration
        </button>
      </div>

      {/* Info Banner block */}
      <div className="bg-[#f0f4f9] border-l-4 border-indigo-650 rounded-r p-4 text-[11px] font-semibold text-indigo-750 leading-relaxed flex items-start gap-3 shadow-3xs">
        <Info className="w-4.5 h-4.5 text-indigo-650 flex-shrink-0 mt-0.5" />
        <div>
          Disable modules that your school doesn't use to keep the side menu clean.
        </div>
      </div>

      {/* Main split grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 items-start">
        
        {/* Left Module cards area */}
        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* CORE MODULES (Always Active green labels) */}
            {CORE_MODULES.map((mod, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-slate-200 rounded-none p-4 flex flex-col justify-between shadow-3xs min-h-[120px]"
              >
                <div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-none bg-indigo-50/50 text-indigo-650 flex items-center justify-center text-xs font-bold shadow-3xs">
                      {mod.icon}
                    </div>
                    <h3 className="font-bold text-xs text-slate-800">{mod.name}</h3>
                  </div>
                  <p className="text-[10px] text-slate-400 font-semibold mt-2.5 leading-relaxed">
                    This is an essential system component and cannot be disabled.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-none border border-emerald-100/50 w-fit mt-3">
                  <span className="w-1.5 h-1.5 rounded-none bg-emerald-500"></span>
                  Core Module
                </span>
              </div>
            ))}

            {/* TOGGLEABLE MODULES (With flat active/inactive text buttons matching screenshots) */}
            {OPTIONAL_MODULES.map((mod) => {
              const isActive = !!modules[mod.key];
              const IconComp = mod.icon;
              
              return (
                <div 
                  key={mod.key} 
                  className="bg-white border border-slate-200 rounded-none p-4 flex flex-col justify-between shadow-3xs min-h-[120px]"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-none bg-indigo-50/50 text-indigo-650 flex items-center justify-center shadow-3xs">
                      <IconComp className="w-3.5 h-3.5 text-indigo-600" />
                    </div>
                    <h3 className="font-bold text-xs text-slate-800 leading-tight">{mod.name}</h3>
                  </div>

                  {/* Text-Only flat ACTIVE / INACTIVE Toggle Button */}
                  <button
                    type="button"
                    onClick={() => handleToggleModule(mod.key)}
                    className={`text-[10px] font-extrabold tracking-wider uppercase select-none text-left w-fit block mt-4 transition-colors hover:underline cursor-pointer ${
                      isActive 
                        ? "text-indigo-650 hover:text-indigo-800" 
                        : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    {isActive ? "Active" : "Inactive"}
                  </button>

                </div>
              );
            })}

          </div>
        </div>

        {/* Right Side Help guides */}
        <div className="lg:col-span-1 bg-white border border-slate-200 rounded-none p-5 shadow-3xs space-y-4">
          <div className="flex items-center gap-2 text-indigo-650 border-b pb-2.5">
            <HelpCircle className="w-4.5 h-4.5" />
            <h3 className="font-bold text-xs text-slate-850">Help & Guidance</h3>
          </div>

          <div className="space-y-4 text-[11px] font-semibold leading-relaxed text-slate-650">
            <div>
              <h4 className="font-extrabold text-slate-850">Why disable modules?</h4>
              <p className="text-slate-400 mt-0.5">Disabling unused modules keeps your sidebar clean and improves the focus of your staff. You can re-enable them at any time.</p>
            </div>
            
            <div>
              <h4 className="font-extrabold text-slate-850">Impact on data</h4>
              <p className="text-slate-400 mt-0.5">Disabling a module only hides the interface. Existing data remains safe in the database but will not be accessible until the module is re-enabled.</p>
            </div>

            <div>
              <h4 className="font-extrabold text-slate-850">Subscription impact</h4>
              <p className="text-slate-400 mt-0.5">Modules marked as "Not in Plan" are restricted based on your current subscription. Contact support to upgrade your plan.</p>
            </div>

            <div>
              <h4 className="font-extrabold text-slate-850">Staff vs parents</h4>
              <p className="text-slate-400 mt-0.5">Switching a module off above removes it for <span className="font-extrabold text-slate-800">everyone</span>, staff included. To keep a module for your team but hide it from families, leave it on and use <span className="font-extrabold text-indigo-600">Parent App Visibility</span> instead.</p>
            </div>
          </div>
        </div>

      </div>

      {/* PARENT APP VISIBILITY (Contains actual sliding switches matching Screenshot 3) */}
      <div className="bg-white border border-slate-200 rounded-none overflow-hidden shadow-3xs mt-6">
        
        {/* Section Header */}
        <div className="px-5 py-4 border-b flex items-center gap-2 bg-slate-50/30">
          <Smartphone className="w-4 h-4 text-indigo-650" />
          <h2 className="font-bold text-slate-850 text-sm">Parent App Visibility</h2>
        </div>

        <div className="p-5 space-y-5">
          
          {/* Inner banner */}
          <div className="bg-[#f0f4f9] border-l-4 border-indigo-600 rounded-r p-3.5 text-[11px] font-semibold text-indigo-750 leading-relaxed flex items-center gap-2">
            <Info className="w-4.5 h-4.5 text-indigo-650 flex-shrink-0" />
            Switch off anything you don't want <span className="font-extrabold text-slate-850 underline">parents</span> to see. Your staff keep full access — this does not disable the module.
          </div>

          {/* Visibility sliding switches grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PARENT_VISIBILITY_MODULES.map((mod) => {
              const isVisible = !!parentVisibility[mod.key];
              const IconComp = mod.icon;
              
              return (
                <div 
                  key={mod.key} 
                  className="bg-white border border-slate-200 rounded-none p-4 flex flex-col justify-between shadow-3xs min-h-[100px]"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-none bg-indigo-50/50 text-indigo-650 flex items-center justify-center text-xs">
                      <IconComp className="w-3.5 h-3.5 text-indigo-600" />
                    </div>
                    <h3 className="font-bold text-xs text-slate-800">{mod.name}</h3>
                  </div>

                  {/* Sliding switch buttons */}
                  <div className="flex items-center gap-2 mt-4">
                    <button
                      type="button"
                      onClick={() => handleToggleParentVisibility(mod.key)}
                      className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-none border-2 border-transparent transition-colors duration-150 ease-in-out focus:outline-none ${isVisible ? 'bg-indigo-650' : 'bg-slate-200'}`}
                    >
                      <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-none bg-white transition duration-150 ease-in-out ${isVisible ? 'translate-x-4' : 'translate-x-0'}`} />
                    </button>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">
                      {isVisible ? "Visible to parents" : "Hidden from parents"}
                    </span>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
}
