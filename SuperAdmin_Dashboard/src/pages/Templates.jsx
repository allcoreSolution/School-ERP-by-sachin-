import React, { useState } from 'react';
import { Plus, Search, Wand2, LayoutGrid, Edit2, ZoomIn, FileText, QrCode } from 'lucide-react';

const mockTemplates = [
  { id: 1, title: 'Standard ID Card (Vertical)', type: 'placeholder', color: 'blue', tags: ['ID Card', 'Staff'] },
  { id: 2, title: 'CBSE Term Wise Report', type: 'report', color: 'red', tags: ['Marksheet', 'Academic'] },
  { id: 3, title: 'State Board Weightage Mark...', type: 'report', color: 'blue', tags: ['Marksheet', 'Academic'] },
  { id: 4, title: 'Primary Progress Report', type: 'report', color: 'green', tags: ['Marksheet'] },
  { id: 5, title: 'Standard Secondary Report', type: 'report', color: 'purple', tags: ['Marksheet'] },
  { id: 6, title: 'Annual Sports Meet Cert.', type: 'report', color: 'red', tags: ['Certificate'] },
  { id: 7, title: 'Fee Payment Slip Formatting', type: 'placeholder', color: 'blue', tags: ['Fee Receipt'] },
  { id: 8, title: 'Secondary Board Admit Card', type: 'placeholder', color: 'green', tags: ['Admit Card'] },
  { id: 9, title: 'School Transfer Certificate', type: 'placeholder', color: 'purple', tags: ['Transfer Certificate'] },
  { id: 10, title: 'Staff Identity Card (Hori...)', type: 'placeholder', color: 'gray', tags: ['ID Card', 'Staff'] },
  { id: 11, title: 'Student Bonafide Template', type: 'placeholder', color: 'green', tags: ['Certificate'] },
  { id: 12, title: 'Birthday Card Template', type: 'placeholder', color: 'blue', tags: ['Interactive', 'General'] },
];

export default function Templates() {
  const [activeTag, setActiveTag] = useState('All');
  const [search, setSearch] = useState('');
  
  // Modal states
  const [showAdd, setShowAdd] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const [editTemplate, setEditTemplate] = useState(null);

  // Dynamically compute tags & counts based purely on active templates
  const computedTags = React.useMemo(() => {
    const counts = {};
    mockTemplates.forEach(t => {
      t.tags.forEach(tag => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });
    const tagsArr = Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
    return [{ name: 'All', count: mockTemplates.length }, ...tagsArr];
  }, []);

  // Small internal component to render realistic mock document layouts
  const DocumentPreview = ({ type, color }) => {
    if (type === 'placeholder') {
      return (
        <div className="w-full h-[320px] bg-gray-200/50 flex flex-col items-center justify-center p-6 text-center relative border-b border-gray-100 group">
          <div className="absolute top-3 right-3 w-7 h-7 bg-white text-indigo-600 rounded-none flex items-center justify-center shadow-sm cursor-pointer hover:bg-indigo-50 hover:border hover:border-indigo-200 transition-colors z-10">
            <Edit2 className="w-3 h-3" />
          </div>
          <div className="flex flex-col items-center justify-center space-y-5 w-full">
             <div className="flex flex-col items-center">
               <div className="w-6 h-6 rounded-none border border-blue-400 flex items-center justify-center mb-1">
                 <FileText className="w-3 h-3 text-blue-500" />
               </div>
               <p className="text-[10px] font-bold text-gray-700">[school_name]</p>
             </div>
             
             <div className="relative w-20 h-20 bg-gray-300 rounded-none flex items-center justify-center">
               <svg className="w-12 h-12 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                 <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
               </svg>
               <div className="absolute -bottom-1 tracking-tighter -right-1 w-7 h-7 bg-white rounded-none flex items-center justify-center shadow-sm">
                 <ZoomIn className="w-4 h-4 text-gray-600" />
               </div>
             </div>

             <div className="space-y-1 w-full text-center">
               <p className="text-[12px] font-extrabold text-gray-800">[student_name]</p>
               <p className="text-[9px] text-gray-500 font-semibold">[class_section]</p>
               <p className="text-[9px] text-gray-500 font-semibold">[admission_no]</p>
             </div>

             <div className="mt-2">
               <QrCode className="w-10 h-10 text-gray-800 opacity-60" />
             </div>
          </div>
        </div>
      );
    }
    
    // Abstract report designs
    const borderColors = {
      red: 'border-red-600',
      blue: 'border-blue-600',
      green: 'border-teal-600',
      purple: 'border-purple-600'
    };
    const textColors = {
      red: 'text-red-700',
      blue: 'text-blue-700',
      green: 'text-teal-700',
      purple: 'text-purple-700'
    };
    const bgColors = {
      red: 'bg-red-700',
      blue: 'bg-blue-700',
      green: 'bg-teal-700',
      purple: 'bg-purple-700'
    };
    const lightBgs = {
      red: 'bg-red-50',
      blue: 'bg-blue-50',
      green: 'bg-teal-50',
      purple: 'bg-purple-50'
    };

    return (
      <div className={`w-full h-[320px] bg-white border ${borderColors[color]} flex flex-col p-4 relative shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)] mx-auto max-w-[280px] my-2`}>
        <div className="text-center mb-3">
          <div className="w-6 h-6 rounded-none border border-blue-400 mx-auto flex items-center justify-center mb-1">
            <span className="text-[8px] text-blue-500 font-bold">i</span>
          </div>
          <h4 className={`text-[11px] font-black ${textColors[color]} leading-tight`}>YOUR SCHOOL NAME</h4>
          <p className="text-[6px] text-gray-500 font-semibold mt-0.5">Affiliated to Central Board of Secondary Education, Delhi</p>
        </div>
        
        <div className={`${bgColors[color]} text-white text-[7px] font-bold text-center py-0.5 mb-2`}>
          CLASS X (A) - REPORT CARD - ACADEMIC SESSION
        </div>
        
        <div className="flex gap-2 mb-2">
          <div className="flex-1 space-y-1">
            <div className="flex text-[6px]"><span className="w-12 font-bold">STUDENT NAME</span><span>: [student_name]</span></div>
            <div className="flex text-[6px]"><span className="w-12 font-bold">FATHER NAME</span><span>: [father_name]</span></div>
            <div className="flex text-[6px]"><span className="w-12 font-bold">MOTHER NAME</span><span>: [mother_name]</span></div>
          </div>
          <div className="w-12 h-14 bg-gray-200 shrink-0 border border-gray-300 relative">
             <svg className="w-full h-full text-gray-400 absolute bottom-0" viewBox="0 0 24 24" fill="currentColor">
                 <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
             </svg>
          </div>
        </div>

        <div className="border border-gray-300 w-full mb-2">
          <div className={`${lightBgs[color]} border-b border-gray-300 text-[6px] font-bold p-1 italic`}>Scholastic Areas</div>
          <div className="text-[5px] text-gray-400 p-1 text-center border-b border-gray-300">[consolidated_marks_table]</div>
          <div className={`${lightBgs[color]} text-[5px] font-bold flex`}>
             <div className="flex-1 border-r border-gray-300 p-0.5 text-center">Co-Scholastic Areas</div>
             <div className="flex-1 p-0.5 text-center">Personal Qualities</div>
          </div>
        </div>
        
        <div className="mt-auto pt-2 border-t border-gray-300 flex justify-between px-2">
          <div className="w-10 border-t border-gray-400 text-[5px] text-center pt-0.5">Class Teacher</div>
          <div className="w-10 border-t border-gray-400 text-[5px] text-center pt-0.5">Principal</div>
          <div className="w-10 border-t border-gray-400 text-[5px] text-center pt-0.5">Parents</div>
        </div>
        
        <div className="absolute top-3 right-3 w-7 h-7 bg-white text-indigo-600 rounded-none flex items-center justify-center shadow-sm cursor-pointer hover:bg-indigo-50 hover:border hover:border-indigo-200 transition-colors opacity-0 group-hover:opacity-100 z-10">
          <Edit2 className="w-3 h-3" />
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-[1150px] w-full mx-auto min-h-[85vh] bg-transparent p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight mb-1">Ready Templates</h1>
          <p className="text-[13px] font-medium text-gray-500">Platform-wide certificate, ID card & document catalog</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-none font-bold text-[13px] transition-colors shadow-sm">
            <Plus className="w-4 h-4" strokeWidth={2.5} /> Add New Template
          </button>
          <button onClick={() => setShowCanvas(true)} className="flex items-center gap-2 bg-[#6366f1] hover:bg-indigo-600 text-white px-4 py-2 rounded-none font-bold text-[13px] transition-colors shadow-sm">
            <Wand2 className="w-4 h-4" strokeWidth={2.5} /> Canvas Designer
          </button>
        </div>
      </div>

      {/* Search and Filters Box */}
      <div className="bg-white rounded-none border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-6 mb-6">
        <div className="relative w-full mb-6">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search by name..." value={search} onChange={e => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-none text-[13px] focus:outline-none focus:ring-1 focus:ring-[#6366f1] w-full bg-white font-medium placeholder-gray-400 shadow-sm" />
        </div>
        
        <div className="flex flex-wrap gap-2.5">
          {computedTags.map((tag) => {
            const isActive = activeTag === tag.name;
            return (
              <button 
                key={tag.name} 
                onClick={() => setActiveTag(tag.name)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-none text-[12px] font-bold border transition-colors shadow-sm ${
                  isActive 
                    ? 'bg-[#6366f1] border-[#6366f1] text-white' 
                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {isActive && <LayoutGrid className="w-3.5 h-3.5" />}
                {tag.name}
                <span className={`px-2 py-0.5 rounded-none text-[10px] ${
                  isActive ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  {tag.count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockTemplates
          .filter(template => activeTag === 'All' || template.tags.includes(activeTag))
          .filter(template => search === '' || template.title.toLowerCase().includes(search.toLowerCase()))
          .map((template) => (
          <div key={template.id} onClick={() => setEditTemplate(template)} className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow group cursor-pointer relative">
            <div className="w-full flex-1 flex items-center justify-center p-2 bg-gray-50/50 relative">
              <DocumentPreview type={template.type} color={template.color} />
            </div>
            <div className="p-4 border-t border-gray-100 bg-white">
              <h3 className="font-extrabold text-[#111827] text-[14px] truncate">{template.title}</h3>
              <p className="text-[10px] uppercase font-bold text-gray-400 mt-1 tracking-wider">{template.tags[0]}</p>
            </div>
          </div>
        ))}
        {mockTemplates.filter(template => activeTag === 'All' || template.tags.includes(activeTag)).filter(template => search === '' || template.title.toLowerCase().includes(search.toLowerCase())).length === 0 && (
          <div className="col-span-full py-16 text-center text-gray-500 font-medium">
            No templates found for this filter.
          </div>
        )}
      </div>

      {/* ADD TEMPLATE MODAL */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-none shadow-2xl w-full max-w-lg flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-white">
              <h2 className="font-bold text-gray-800 text-lg">Add New Template</h2>
            </div>
            <div className="p-6 bg-slate-50">
              <div className="grid grid-cols-1 gap-5 bg-white p-5 border border-slate-200 w-full mb-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Template Title</label>
                  <input type="text" placeholder="e.g. 2026 Sports Certificate" className="w-full border border-gray-200 px-3 py-2 text-[13px] focus:outline-none focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Category Tag</label>
                  <select className="w-full border border-gray-200 px-3 py-2 text-[13px] focus:outline-none focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1] bg-white">
                    <option>Marksheet</option>
                    <option>ID Card</option>
                    <option>Certificate</option>
                    <option>Fee Receipt</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-5 flex gap-3 border-t border-gray-100 bg-white">
              <button onClick={() => setShowAdd(false)} className="flex-1 flex items-center justify-center gap-2 bg-[#6366f1] hover:bg-indigo-600 text-white py-2.5 rounded-none text-[13px] font-bold transition-colors">
                Create Template
              </button>
              <button onClick={() => setShowAdd(false)} className="px-5 py-2.5 border border-gray-200 rounded-none text-[13px] font-bold text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT TEMPLATE MODAL */}
      {editTemplate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-none shadow-2xl w-full max-w-sm flex flex-col overflow-hidden border-t-4 border-[#6366f1]">
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
              <h2 className="font-bold text-gray-800 text-[15px]">Edit Document Template</h2>
            </div>
            <div className="p-6 bg-slate-50 flex items-center justify-center flex-col text-center">
              <div className="w-20 h-20 bg-indigo-100 border border-indigo-200 mb-4 flex items-center justify-center flex-col text-indigo-600">
                <Edit2 className="w-7 h-7 mb-1" />
              </div>
              <p className="text-[13px] font-bold text-slate-800 truncate w-full px-2">{editTemplate.title}</p>
              <p className="text-[11px] font-medium text-slate-500 mt-1 pb-2 uppercase tracking-wide">{editTemplate.tags[0]}</p>
            </div>
            <div className="p-4 flex gap-3 bg-white border-t border-slate-100">
              <button onClick={() => setEditTemplate(null)} className="flex-1 py-2 bg-[#111827] hover:bg-gray-800 text-white rounded-none text-[12px] font-bold transition-colors shadow-sm">Open in Editor</button>
              <button onClick={() => setEditTemplate(null)} className="flex-1 py-2 border border-gray-200 rounded-none text-[12px] font-bold text-gray-600 hover:bg-gray-50 transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* CANVAS DESIGNER MODAL */}
      {showCanvas && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-none shadow-2xl w-full max-w-lg flex flex-col overflow-hidden">
            <div className="p-8 bg-slate-900 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-5 text-indigo-300">
                <Wand2 className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Canvas Designer Pro</h2>
              <p className="text-[13px] text-slate-300 font-medium pb-2">The drag-and-drop document editor is currently in active development. Stay tuned for seamless visual editing directly from your dashboard.</p>
            </div>
            <div className="p-4 bg-slate-800 flex justify-center">
              <button onClick={() => setShowCanvas(false)} className="px-8 py-2.5 bg-indigo-500 hover:bg-indigo-400 text-white rounded-none text-[13px] font-bold transition-colors">Dismiss</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
