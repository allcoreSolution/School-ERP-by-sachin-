import React from 'react';
import { 
  HelpCircle, Bold, Italic, Underline, Strikethrough, Subscript, Superscript,
  Heading1, AlignLeft, AlignCenter, AlignRight, List, Image as ImageIcon,
  Link2, Code, X, Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AddNewQuestion() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-10">
      
      {/* Header */}
      <div className="bg-white px-6 py-5 border-b border-slate-200 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Add New Question</h1>
          <p className="text-[11px] text-slate-500 mt-1">Nine question types — the form adapts to the one you pick</p>
        </div>
      </div>

      <div className="p-6 max-w-[1200px] mx-auto space-y-6">
        
        {/* Form Container */}
        <div className="bg-white border border-slate-200 rounded-none shadow-sm overflow-hidden">
          
          <div className="px-5 py-3 border-b border-slate-200 text-[#6f42c1] font-bold text-sm flex items-center gap-2 bg-white">
            <HelpCircle className="w-4 h-4" /> New Question
          </div>

          <div className="p-5 space-y-5">
            
            {/* Top Selects */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Question Type <span className="text-red-500">*</span></label>
                <select className="w-full px-3 py-1.5 border border-slate-300 rounded-none text-xs bg-white focus:outline-none focus:border-[#6f42c1] text-slate-700">
                  <option>Multiple Choice — Single Answer</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Class <span className="text-red-500">*</span></label>
                <select className="w-full px-3 py-1.5 border border-slate-300 rounded-none text-xs bg-white focus:outline-none focus:border-[#6f42c1] text-slate-500">
                  <option>-- Select Class --</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Subject <span className="text-red-500">*</span></label>
                <select className="w-full px-3 py-1.5 border border-slate-300 rounded-none text-xs bg-white focus:outline-none focus:border-[#6f42c1] text-slate-500">
                  <option>-- Select Subject --</option>
                </select>
              </div>
            </div>

            {/* Rich Text Editor */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Question <span className="text-red-500">*</span></label>
              <div className="border border-slate-300 rounded-none overflow-hidden bg-slate-50">
                {/* Fake Toolbar */}
                <div className="flex flex-wrap items-center gap-1 p-2 border-b border-slate-300 bg-[#f1f3f4]">
                  <div className="flex items-center gap-1 pr-2 border-r border-slate-300">
                    <button className="p-1 hover:bg-slate-200 rounded-none text-slate-700"><PenToolIcon className="w-3.5 h-3.5" /></button>
                  </div>
                  <div className="flex items-center gap-1 px-2 border-r border-slate-300">
                    <button className="p-1 hover:bg-slate-200 rounded-none text-slate-700 font-serif font-bold text-xs px-1.5">B</button>
                    <button className="p-1 hover:bg-slate-200 rounded-none text-slate-700 font-serif italic text-xs px-1.5">I</button>
                    <button className="p-1 hover:bg-slate-200 rounded-none text-slate-700 font-serif underline text-xs px-1.5">U</button>
                    <button className="p-1 hover:bg-slate-200 rounded-none text-slate-700 font-serif line-through text-xs px-1.5">S</button>
                  </div>
                  <div className="flex items-center gap-1 px-2 border-r border-slate-300">
                    <button className="p-1 hover:bg-slate-200 rounded-none text-slate-700"><Superscript className="w-3.5 h-3.5" /></button>
                    <button className="p-1 hover:bg-slate-200 rounded-none text-slate-700"><Subscript className="w-3.5 h-3.5" /></button>
                    <div className="px-2 py-0.5 bg-white border border-slate-300 rounded-none text-[11px] flex items-center gap-2 cursor-pointer ml-1 text-slate-700 font-bold">
                      16 <ChevronDownIcon className="w-3 h-3" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 px-2 border-r border-slate-300">
                    <button className="p-1 hover:bg-slate-200 rounded-none text-slate-700 font-bold text-xs bg-yellow-200 px-1.5">A</button>
                  </div>
                  <div className="flex items-center gap-1 px-2 border-r border-slate-300">
                    <button className="p-1 hover:bg-slate-200 rounded-none text-slate-700"><AlignLeft className="w-3.5 h-3.5" /></button>
                    <button className="p-1 hover:bg-slate-200 rounded-none text-slate-700"><AlignCenter className="w-3.5 h-3.5" /></button>
                    <button className="p-1 hover:bg-slate-200 rounded-none text-slate-700"><AlignRight className="w-3.5 h-3.5" /></button>
                  </div>
                  <div className="flex items-center gap-1 pl-2">
                    <button className="p-1 hover:bg-slate-200 rounded-none text-slate-700"><List className="w-3.5 h-3.5" /></button>
                    <button className="p-1 hover:bg-slate-200 rounded-none text-slate-700"><ImageIcon className="w-3.5 h-3.5" /></button>
                    <button className="p-1 hover:bg-slate-200 rounded-none text-slate-700"><Link2 className="w-3.5 h-3.5" /></button>
                    <button className="p-1 hover:bg-slate-200 rounded-none text-slate-700"><Code className="w-3.5 h-3.5" /></button>
                    <button className="p-1 hover:bg-slate-200 rounded-none text-slate-700 font-bold text-xs px-1.5">?</button>
                  </div>
                </div>
                {/* Fake Editor Area */}
                <textarea 
                  className="w-full h-40 p-3 text-sm focus:outline-none resize-y bg-white"
                ></textarea>
                <div className="h-1 bg-slate-200 cursor-row-resize flex justify-center items-center group">
                  <div className="w-8 h-0.5 bg-slate-300 group-hover:bg-slate-400 rounded-none"></div>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Maths renders with KaTeX — wrap inline formulas in <code>$..$</code> and display formulas in <code>$$..$$</code>. Tables come from the editor's own table button.</p>
            </div>

            {/* Alert */}
            <div className="bg-[#28a745] text-white p-2 rounded-none text-[11px] font-bold flex items-center gap-2 shadow-sm">
              <BoltIcon className="w-3.5 h-3.5" /> This type is graded automatically the moment the paper is submitted.
            </div>

          </div>
          
          <hr className="border-slate-200" />
          
          {/* Answer Definition */}
          <div className="p-5 space-y-5">
            <h3 className="text-[15px] font-bold text-slate-800">Answer Definition</h3>
            
            <div>
              <p className="text-[11px] font-bold text-slate-700 mb-2">Options — select the correct one</p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-white border border-slate-300 rounded-none cursor-pointer hover:bg-slate-50">
                    <div className="w-3.5 h-3.5 rounded-none border border-slate-400"></div>
                  </div>
                  <input type="text" placeholder="Option text" className="flex-1 px-3 py-1.5 border border-slate-300 rounded-none text-sm focus:outline-none focus:border-[#6f42c1]" />
                  <button className="p-1.5 border border-red-200 text-red-500 rounded-none hover:bg-red-50 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-white border border-slate-300 rounded-none cursor-pointer hover:bg-slate-50">
                    <div className="w-3.5 h-3.5 rounded-none border border-slate-400"></div>
                  </div>
                  <input type="text" placeholder="Option text" className="flex-1 px-3 py-1.5 border border-slate-300 rounded-none text-sm focus:outline-none focus:border-[#6f42c1]" />
                  <button className="p-1.5 border border-red-200 text-red-500 rounded-none hover:bg-red-50 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <button className="mt-3 px-4 py-1.5 bg-white border border-slate-300 text-slate-700 font-bold text-[11px] rounded-none flex items-center gap-1.5 hover:bg-slate-50 transition-colors shadow-sm">
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
              <p className="text-[10px] text-slate-500 mt-1">The radio button marks the answer.</p>
            </div>

            <hr className="border-slate-100" />

            {/* Lower Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Marks <span className="text-red-500">*</span></label>
                <input type="text" defaultValue="1" className="w-full px-3 py-1.5 border border-slate-300 rounded-none text-sm focus:outline-none focus:border-[#6f42c1]" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Negative Marks</label>
                <input type="text" defaultValue="0" className="w-full px-3 py-1.5 border border-slate-300 rounded-none text-sm focus:outline-none focus:border-[#6f42c1]" />
                <p className="text-[9px] text-slate-400 mt-1">Only applied when the paper enables negative marking.</p>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Difficulty</label>
                <select className="w-full px-3 py-1.5 border border-slate-300 rounded-none text-sm bg-white focus:outline-none focus:border-[#6f42c1] text-slate-700">
                  <option>Medium</option>
                </select>
                <p className="text-[9px] text-slate-400 mt-1">Drives paper blueprints, auto-marks and adaptive practice.</p>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-[11px] font-bold text-slate-700">Topic</label>
                  <span className="text-[9px] text-[#007bff] font-bold cursor-pointer">+ New</span>
                </div>
                <select className="w-full px-3 py-1.5 border border-slate-300 rounded-none text-sm bg-white focus:outline-none focus:border-[#6f42c1] text-slate-500">
                  <option>-- None --</option>
                </select>
                <p className="text-[9px] text-slate-400 mt-1">Tagged questions drive the practice ladder and the mastery report. <span className="text-[#007bff] cursor-pointer">Manage topics</span></p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Solution / Explanation</label>
                <textarea className="w-full h-20 px-3 py-2 border border-slate-300 rounded-none text-sm focus:outline-none focus:border-[#6f42c1] resize-y"></textarea>
                <p className="text-[9px] text-slate-400 mt-1">Shown after submission unless the paper hides solutions.</p>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Hint</label>
                <textarea className="w-full h-20 px-3 py-2 border border-slate-300 rounded-none text-sm focus:outline-none focus:border-[#6f42c1] resize-y"></textarea>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Tags</label>
                <input type="text" placeholder="mensuration, board-2024" className="w-full px-3 py-1.5 border border-slate-300 rounded-none text-sm focus:outline-none focus:border-[#6f42c1]" />
                <p className="text-[9px] text-slate-400 mt-1">Comma-separated.</p>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Attachments</label>
                <div className="flex items-center text-sm">
                  <button className="px-3 py-1 bg-slate-200 border border-slate-300 border-r-0 rounded-l text-slate-700 text-xs hover:bg-slate-300 transition-colors">Choose Files</button>
                  <div className="px-3 py-1 border border-slate-300 border-l-0 rounded-r text-slate-500 text-xs bg-white flex-1">No file chosen</div>
                </div>
                <p className="text-[9px] text-slate-400 mt-1">Image, audio, video or PDF. <strong>Any</strong> question type can carry them — which is why there is no separate "audio question" type: a listening comprehension is an ordinary MCQ with a clip attached.</p>
              </div>
            </div>

          </div>
          
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3 rounded-b-lg">
            <button 
              onClick={() => navigate('/online-exams/question-bank')}
              className="px-5 py-2 bg-white border border-slate-300 text-slate-700 font-bold text-[11px] rounded-none hover:bg-slate-100 transition-colors cursor-pointer shadow-sm"
            >
              Cancel
            </button>
            <button className="px-5 py-2 bg-white border border-[#007bff] text-[#007bff] font-bold text-[11px] rounded-none shadow-sm hover:bg-[#007bff]/10 transition-colors cursor-pointer">
              Save as Draft
            </button>
            <button className="px-5 py-2 bg-[#6f42c1] hover:bg-[#5a32a3] text-white font-bold text-[11px] rounded-none shadow-sm transition-colors border-none cursor-pointer">
              Publish Question
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

// Helpers
function ChevronDownIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m6 9 6 6 6-6"/>
    </svg>
  );
}

function PenToolIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/>
    </svg>
  );
}

function BoltIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>
  );
}
