import React, { useState, useMemo } from "react";
import { 
  Eye, 
  Edit3, 
  Trash2, 
  X, 
  Plus, 
  Check, 
  User, 
  AlertCircle,
  FileText
} from "lucide-react";

// Mock templates list matching Screenshots
const INITIAL_TEMPLATES = [
  { 
    id: 1, 
    name: "Festive Gold (Festival)", 
    type: "Festival Banner", 
    style: "gold-purple",
    title: "HAPPY",
    placeholder: "[festival_name]",
    year: "[year]",
    sub: "[greeting_line]"
  },
  { 
    id: 2, 
    name: "Diya Warm (Festival)", 
    type: "Festival Banner", 
    style: "diya-brown",
    title: "HAPPY",
    placeholder: "[festival_name]",
    year: "[year]",
    sub: "[greeting_line]"
  },
  { 
    id: 3, 
    name: "Bold Party (Birthday)", 
    type: "Birthday Card", 
    style: "bold-dark",
    title: "HAPPY BIRTHDAY",
    placeholder: "[student_name]",
    classSec: "[class_sec]",
    sub: "Let the celebrations begin!"
  },
  { 
    id: 4, 
    name: "Balloon Blue (Birthday)", 
    type: "Birthday Card", 
    style: "balloon-blue",
    title: "Happy Birthday!",
    placeholder: "[student_name]",
    classSec: "[class_sec]",
    sub: "Wishing you a fantastic year ahead! [age] years young"
  },
  { 
    id: 5, 
    name: "Night Sparkle (Festival)", 
    type: "Festival Banner", 
    style: "night-blue",
    title: "HAPPY",
    placeholder: "[festival_name]",
    year: "[year]",
    sub: "[greeting_line]"
  },
  { 
    id: 6, 
    name: "Pastel Kids (Birthday)", 
    type: "Birthday Card", 
    style: "pastel-kids",
    title: "HAPPY BIRTHDAY",
    placeholder: "[student_name]",
    age: "Turning [age]",
    sub: "Have a super fun day!"
  },
  { 
    id: 7, 
    name: "Rangoli Rose (Festival)", 
    type: "Festival Banner", 
    style: "rangoli-rose",
    title: "HAPPY",
    placeholder: "[festival_name]",
    year: "[year]",
    sub: "[greeting_line]"
  },
  { 
    id: 8, 
    name: "Confetti Cream (Birthday)", 
    type: "Birthday Card", 
    style: "confetti-cream",
    title: "HAPPY BIRTHDAY",
    placeholder: "[student_name]",
    age: "[age] years young",
    sub: "To our shining star!"
  }
];

export default function Creatives() {
  const [templates, setTemplates] = useState(INITIAL_TEMPLATES);
  const [activeTab, setActiveTab] = useState("All");
  
  // Modals & toast states
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [editName, setEditName] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  // Tab counters block
  const counts = useMemo(() => {
    return {
      All: templates.length,
      "Birthday Card": templates.filter(t => t.type === "Birthday Card").length,
      "Festival Banner": templates.filter(t => t.type === "Festival Banner").length,
      "Pop-up": 0,
      "Story": 0
    };
  }, [templates]);

  // Filter templates list by active category tab
  const displayedTemplates = useMemo(() => {
    if (activeTab === "All") return templates;
    return templates.filter(t => t.type === activeTab);
  }, [activeTab, templates]);

  // Delete card handler
  const handleDelete = (id, name) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      setTemplates(prev => prev.filter(t => t.id !== id));
      setToastMsg(`Deleted template "${name}" successfully.`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  // Edit card handler
  const handleOpenEdit = (temp) => {
    setEditingTemplate(temp);
    setEditName(temp.name);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingTemplate) return;

    setTemplates(prev => prev.map(t => t.id === editingTemplate.id ? { ...t, name: editName } : t));
    setEditingTemplate(null);
    setToastMsg("Creative template renamed successfully!");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Helper function to render mockup content preview of selected template in list/modal
  const renderTemplateMockup = (temp, isFullSize = false) => {
    const wrapperClass = `w-full relative overflow-hidden flex flex-col justify-between p-5 text-center transition-all ${
      isFullSize ? "h-[380px] rounded-none" : "h-[180px] rounded-t-xl"
    }`;

    // 1. Festive Gold (Festival)
    if (temp.style === "gold-purple") {
      return (
        <div className={`${wrapperClass} bg-gradient-to-br from-indigo-950 to-purple-800 text-white`}>
          <div className="mt-auto space-y-1">
            <h4 className="text-[10px] tracking-widest text-amber-400 font-extrabold uppercase">{temp.title}</h4>
            <h2 className="text-lg font-serif font-bold text-amber-350">{temp.placeholder}</h2>
            <p className="text-[9px] text-purple-300 font-semibold">{temp.year}</p>
          </div>
          <p className="text-[9px] text-slate-350 italic mt-3">{temp.sub}</p>
        </div>
      );
    }

    // 2. Diya Warm (Festival)
    if (temp.style === "diya-brown") {
      return (
        <div className={`${wrapperClass} bg-gradient-to-b from-amber-950 to-amber-900 text-white`}>
          <div className="mt-auto space-y-1">
            <h4 className="text-[10px] tracking-widest text-orange-400 font-extrabold uppercase">{temp.title}</h4>
            <h2 className="text-lg font-serif font-bold text-orange-300 flex items-center justify-center gap-1.5">
              🪔 {temp.placeholder}
            </h2>
            <p className="text-[9px] text-amber-450 font-semibold">{temp.year}</p>
          </div>
          <p className="text-[9px] text-amber-300 italic mt-3">{temp.sub}</p>
        </div>
      );
    }

    // 3. Bold Party (Birthday)
    if (temp.style === "bold-dark") {
      return (
        <div className={`${wrapperClass} bg-slate-900 text-white border-b-8 border-yellow-500`}>
          <h4 className="text-[9px] tracking-widest text-pink-500 font-extrabold uppercase pt-2">{temp.title}</h4>
          
          {/* Avatar card frame */}
          <div className="bg-slate-850/80 border border-slate-700/60 rounded-none p-3 mx-auto max-w-[130px] my-auto space-y-2">
            <div className="w-10 h-10 rounded-none bg-slate-700 flex items-center justify-center text-xs text-slate-350 mx-auto">
              👤
            </div>
            <div>
              <h5 className="font-extrabold text-[10px] text-slate-100">{temp.placeholder}</h5>
              <p className="text-[8px] text-yellow-500 font-bold">{temp.classSec}</p>
            </div>
          </div>

          <p className="text-[8px] text-slate-400 font-semibold italic">{temp.sub}</p>
        </div>
      );
    }

    // 4. Balloon Blue (Birthday)
    if (temp.style === "balloon-blue") {
      return (
        <div className={`${wrapperClass} bg-sky-50 text-sky-950 border border-sky-100`}>
          <h4 className="text-[10px] font-bold text-sky-600 tracking-tight pt-2">{temp.title}</h4>

          {/* Avatar card frame */}
          <div className="bg-white border border-sky-100 rounded-none p-2.5 mx-auto max-w-[130px] my-auto space-y-2 shadow-3xs">
            <div className="w-9 h-9 rounded-none bg-sky-100 flex items-center justify-center text-xs text-sky-400 mx-auto">
              👤
            </div>
            <div>
              <h5 className="font-extrabold text-[9px] text-sky-900">{temp.placeholder}</h5>
              <p className="text-[8px] text-sky-450 font-bold">{temp.classSec}</p>
            </div>
          </div>

          <p className="text-[8px] text-sky-500 font-semibold mt-1">{temp.sub}</p>
        </div>
      );
    }

    // 5. Night Sparkle (Festival)
    if (temp.style === "night-blue") {
      return (
        <div className={`${wrapperClass} bg-[#0b1329] text-white`}>
          <div className="mt-auto space-y-1">
            <h4 className="text-[10px] tracking-widest text-[#5c7eff] font-extrabold uppercase">{temp.title}</h4>
            <h2 className="text-lg font-serif font-bold text-amber-350">{temp.placeholder}</h2>
            <p className="text-[9px] text-slate-400 font-semibold">{temp.year}</p>
          </div>
          <p className="text-[9px] text-slate-400 italic mt-3">{temp.sub}</p>
        </div>
      );
    }

    // 6. Pastel Kids (Birthday)
    if (temp.style === "pastel-kids") {
      return (
        <div className={`${wrapperClass} bg-[#e8f5e9] text-[#1b5e20] border-t-8 border-yellow-300`}>
          <h4 className="text-[9px] tracking-widest text-emerald-600 font-extrabold uppercase pt-2">{temp.title}</h4>

          <div className="bg-white border border-emerald-100 rounded-none p-2.5 mx-auto max-w-[130px] my-auto space-y-1.5 shadow-3xs">
            <div className="w-9 h-9 rounded-none bg-emerald-50 flex items-center justify-center text-xs text-emerald-450 mx-auto">
              👤
            </div>
            <h5 className="font-extrabold text-[9px] text-emerald-950">{temp.placeholder}</h5>
            <span className="inline-block bg-orange-100 text-orange-700 text-[8px] font-extrabold px-1.5 py-0.2 rounded-none">
              {temp.age}
            </span>
          </div>

          <p className="text-[8px] text-emerald-500 font-semibold mt-1">{temp.sub}</p>
        </div>
      );
    }

    // 7. Rangoli Rose (Festival)
    if (temp.style === "rangoli-rose") {
      return (
        <div className={`${wrapperClass} bg-gradient-to-br from-rose-900 to-rose-950 text-white`}>
          <div className="mt-auto space-y-1">
            <h4 className="text-[10px] tracking-widest text-rose-350 font-extrabold uppercase">{temp.title}</h4>
            <h2 className="text-lg font-serif font-bold text-pink-300">{temp.placeholder}</h2>
            <p className="text-[9px] text-rose-450 font-semibold">{temp.year}</p>
          </div>
          <p className="text-[9px] text-rose-350 italic mt-3">{temp.sub}</p>
        </div>
      );
    }

    // 8. Confetti Cream (Birthday)
    if (temp.style === "confetti-cream") {
      return (
        <div className={`${wrapperClass} bg-[#fffef0] text-[#795548] border-b-8 border-purple-500`}>
          <h4 className="text-[9px] tracking-widest text-purple-600 font-extrabold uppercase pt-2">{temp.title}</h4>

          <div className="bg-white border border-purple-100 rounded-none p-2.5 mx-auto max-w-[130px] my-auto space-y-1.5 shadow-3xs">
            <div className="w-9 h-9 rounded-none bg-purple-50 flex items-center justify-center text-xs text-purple-450 mx-auto">
              👤
            </div>
            <h5 className="font-extrabold text-[9px] text-purple-950">{temp.placeholder}</h5>
            <span className="inline-block bg-purple-100 text-purple-700 text-[8px] font-extrabold px-1.5 py-0.2 rounded-none">
              {temp.age}
            </span>
          </div>

          <p className="text-[8px] text-purple-500 font-semibold mt-1">{temp.sub}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-sans text-gray-800 relative">
      
      {/* Toast Notification alert */}
      {showToast && (
        <div className="fixed top-20 right-6 bg-slate-900 text-white px-4 py-3 rounded-none shadow-lg flex items-center gap-2 border border-slate-700/50 animate-bounce z-50 text-xs">
          <Check className="w-4 h-4 text-emerald-400" />
          <span className="font-bold">{toastMsg}</span>
        </div>
      )}

      {/* Edit Rename Overlay Modal */}
      {editingTemplate && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white text-gray-800 rounded-none p-5 shadow-lg max-w-sm w-full space-y-4 border border-slate-200">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500">Rename Creative Template</h3>
            <form onSubmit={handleSaveEdit} className="space-y-3">
              <input 
                type="text" 
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-350 rounded-none text-xs font-semibold focus:outline-none focus:border-indigo-650 bg-white"
                required
              />
              <div className="flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setEditingTemplate(null)}
                  className="px-3 py-1.5 border border-slate-200 hover:bg-slate-100 rounded-none text-[10px] font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-3 py-1.5 bg-indigo-650 hover:bg-indigo-700 text-white rounded-none text-[10px] font-bold cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Enlarged template overlay Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 bg-slate-900/80 flex items-center justify-center z-50 animate-in fade-in duration-300">
          <div className="bg-slate-950 text-white rounded-none p-4 shadow-xl max-w-lg w-full relative space-y-4 border border-slate-800 m-4">
            
            <button 
              onClick={() => setPreviewTemplate(null)}
              className="absolute top-4 right-4 p-1.5 rounded-none bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4.5 h-4.5" />
            </button>

            <div className="pt-6">
              {renderTemplateMockup(previewTemplate, true)}
            </div>

            <div className="flex justify-between items-center text-xs font-semibold border-t border-slate-850 pt-3">
              <div>
                <h4 className="font-bold text-slate-200 text-sm">{previewTemplate.name}</h4>
                <p className="text-slate-500 text-[10px]">{previewTemplate.type}</p>
              </div>
              <button 
                onClick={() => setPreviewTemplate(null)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-none cursor-pointer"
              >
                Close Preview
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Header section (WITHOUT Browse Templates & + Blank buttons) */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Creatives</h1>
          <p className="text-slate-500 text-sm">Birthday cards, festival banners & pop-ups for the parent & staff apps</p>
        </div>
      </div>

      {/* Category Pills navigation row */}
      <div className="flex flex-wrap gap-2 items-center overflow-x-auto w-full pb-1 border-b border-slate-100">
        {Object.keys(counts).map((tabName) => {
          const isActive = activeTab === tabName;
          const count = counts[tabName];

          return (
            <button
              key={tabName}
              onClick={() => setActiveTab(tabName)}
              className={`px-3.5 py-1.5 font-bold text-xs rounded-none cursor-pointer transition-all border whitespace-nowrap flex items-center gap-1.5 select-none ${
                isActive 
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-3xs" 
                  : "bg-white text-slate-550 border-slate-200/90 hover:bg-slate-50"
              }`}
            >
              <span>{tabName}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-none font-bold ${
                isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-400"
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Cards list grid */}
      {displayedTemplates.length === 0 ? (
        <div className="border border-dashed border-slate-350 rounded-none p-12 text-center text-slate-400 bg-white">
          <AlertCircle className="w-8 h-8 mx-auto mb-2 text-slate-300" />
          <h4 className="font-extrabold text-xs text-slate-700">No creative templates found</h4>
          <p className="text-[10px] font-semibold mt-1">There are no designs available in the selected category tab yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayedTemplates.map((temp) => (
            <div 
              key={temp.id}
              className="bg-white border border-slate-200 rounded-none overflow-hidden shadow-3xs flex flex-col justify-between transition-all hover:shadow-2xs relative group"
            >
              
              {/* Dynamic Design Mockup */}
              <div className="relative">
                {renderTemplateMockup(temp, false)}
                
                {/* Small Edit icon overlaid on the image top right */}
                <button
                  onClick={() => handleOpenEdit(temp)}
                  className="absolute top-2.5 right-2.5 p-1.5 bg-white/90 hover:bg-white hover:scale-105 rounded-none text-slate-650 hover:text-slate-900 shadow-sm cursor-pointer select-none transition-all"
                  title="Rename template"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Bottom details block */}
              <div className="p-4 space-y-3.5 bg-white border-t border-slate-100 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-extrabold text-xs text-slate-800 leading-tight group-hover:text-indigo-650 transition-colors">
                    {temp.name}
                  </h3>
                  
                  {/* Category label badge pill */}
                  <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-none mt-2 border ${
                    temp.type === "Festival Banner" 
                      ? "bg-purple-50 text-purple-650 border-purple-100/50" 
                      : "bg-amber-50 text-amber-600 border-amber-100/50"
                  }`}>
                    {temp.type}
                  </span>
                </div>

                {/* Bottom action icons bar */}
                <div className="flex justify-end gap-2 border-t border-slate-50 pt-2.5 text-slate-400">
                  
                  {/* Preview button */}
                  <button
                    onClick={() => setPreviewTemplate(temp)}
                    className="p-1 hover:bg-slate-50 hover:text-indigo-600 rounded-none cursor-pointer transition-colors"
                    title="Preview Full Size"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>

                  {/* Rename button */}
                  <button
                    onClick={() => handleOpenEdit(temp)}
                    className="p-1 hover:bg-slate-50 hover:text-indigo-600 rounded-none cursor-pointer transition-colors"
                    title="Rename"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  {/* Delete button */}
                  <button
                    onClick={() => handleDelete(temp.id, temp.name)}
                    className="p-1 hover:bg-slate-55/10 hover:text-red-600 rounded-none cursor-pointer transition-colors"
                    title="Delete Design"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                </div>

              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
