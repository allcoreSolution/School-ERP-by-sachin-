import React from 'react';
import { 
  LayoutDashboard, Layers, CheckSquare, Settings2, FileText, HelpCircle, Plus,
  Edit, PieChart, FileQuestion, Users, Bold, Italic, Underline, Strikethrough,
  Subscript, Superscript, Heading1, AlignLeft, AlignCenter, AlignRight,
  List, Image as ImageIcon, Link2, Code, X, Save
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function OSMSessionDetails() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-10">
      
      {/* Top Navigation / Header */}
      <div className="bg-white px-6 pt-4 border-b border-slate-200">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-bold text-slate-800">Digital Evaluation</h1>
            <p className="text-[11px] text-slate-500 mt-1">On-screen marking of scanned answer sheets — upload, evaluate question-by-question, and report.</p>
          </div>
          <button 
            onClick={() => navigate('/osm-module/sessions/new')}
            className="px-4 py-2 bg-[#6f42c1] hover:bg-[#5a32a3] text-white font-bold text-xs rounded-none shadow-sm flex items-center gap-2 transition-colors border-none cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> New Session
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 text-[11px] font-bold">
          <div 
            onClick={() => navigate('/osm-module/dashboard')}
            className="flex items-center gap-1.5 pb-2 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
          >
            <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
          </div>
          <div 
            onClick={() => navigate('/osm-module/sessions')}
            className="flex items-center gap-1.5 pb-2 border-b-2 border-[#6f42c1] text-slate-800 cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5" /> Sessions
          </div>
          <div className="flex items-center gap-1.5 pb-2 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">
            <CheckSquare className="w-3.5 h-3.5" /> Evaluate
          </div>
          <div className="flex items-center gap-1.5 pb-2 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">
            <Settings2 className="w-3.5 h-3.5" /> Moderation
          </div>
          <div className="flex items-center gap-1.5 pb-2 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">
            <FileText className="w-3.5 h-3.5" /> Reports
          </div>
          <div className="flex items-center gap-1.5 pb-2 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">
            <HelpCircle className="w-3.5 h-3.5" /> Guide
          </div>
        </div>
      </div>

      <div className="p-6 max-w-[1400px] mx-auto space-y-4">
        
        {/* Session Info Banner */}
        <div className="bg-white border border-slate-200 rounded-none p-5 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-xl font-black text-slate-800">A</h2>
              <span className="bg-slate-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-none shadow-sm">Draft</span>
            </div>
            <p className="text-[11px] text-slate-500">English • Class I / A - Max 0 marks</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex gap-4 text-center">
              <div>
                <div className="text-xl font-black text-slate-800">0</div>
                <div className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">Sheets</div>
              </div>
              <div>
                <div className="text-xl font-black text-yellow-500">0</div>
                <div className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">Pending</div>
              </div>
              <div>
                <div className="text-xl font-black text-[#28a745]">0</div>
                <div className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">Evaluated</div>
              </div>
              <div>
                <div className="text-xl font-black text-slate-800">0</div>
                <div className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">Questions</div>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 border-l border-slate-200 pl-6">
              <button className="flex items-center gap-1.5 px-3 py-1 bg-white border border-[#007bff] text-[#007bff] hover:bg-[#007bff]/5 font-bold text-[11px] rounded-none transition-colors cursor-pointer w-24 justify-center">
                <Edit className="w-3 h-3" /> Edit
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-500 text-slate-600 hover:bg-slate-50 font-bold text-[11px] rounded-none transition-colors cursor-pointer w-24 justify-center">
                <PieChart className="w-3 h-3" /> Analytics
              </button>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="bg-white border border-slate-200 rounded-none shadow-sm">
          
          {/* Inner Tabs */}
          <div className="flex gap-6 text-[12px] font-bold px-5 pt-3 border-b border-slate-200">
            <div className="flex items-center gap-2 pb-3 border-b-2 border-slate-600 text-slate-700">
              <FileQuestion className="w-4 h-4" /> Question Paper
            </div>
            <div className="flex items-center gap-2 pb-3 text-orange-500 hover:text-orange-600 cursor-pointer transition-colors">
              <FileText className="w-4 h-4" /> Answer Sheets (0)
            </div>
            <div className="flex items-center gap-2 pb-3 text-orange-500 hover:text-orange-600 cursor-pointer transition-colors">
              <Users className="w-4 h-4" /> Evaluators
            </div>
          </div>

          <div className="p-5">
            <p className="text-[11px] text-slate-500 mb-6">
              Define each question, its full text (optional rich text — formatting, sub-parts, images, equations), and its maximum marks. Compulsory questions must be marked before a paper can be finished.
            </p>

            {/* Question Editor Block */}
            <div className="border border-slate-200 rounded-none p-5 relative bg-white shadow-sm mb-6">
              
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="w-48">
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Q. No. <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full border border-slate-300 rounded-none px-3 py-1.5 text-sm focus:outline-none focus:border-[#6f42c1]" />
                </div>
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Short label (optional)</label>
                  <input type="text" className="w-full border border-slate-300 rounded-none px-3 py-1.5 text-sm focus:outline-none focus:border-[#6f42c1]" />
                </div>
                <div className="w-48">
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Max marks <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full border border-slate-300 rounded-none px-3 py-1.5 text-sm focus:outline-none focus:border-[#6f42c1]" />
                </div>
                <div className="w-24 flex flex-col items-center">
                  <label className="block text-[11px] font-bold text-slate-700 mb-2">Compulsory</label>
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#007bff] cursor-pointer" />
                </div>
                <div className="w-10 flex items-center justify-end mt-4">
                  <button className="text-red-500 hover:text-red-600 p-1 border border-red-200 rounded-none hover:bg-red-50 cursor-pointer transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Question text (optional rich text)</label>
                <div className="border border-slate-300 rounded-none overflow-hidden bg-slate-50">
                  {/* Fake Rich Text Toolbar */}
                  <div className="flex flex-wrap items-center gap-1 p-2 border-b border-slate-300 bg-[#f1f3f4]">
                    <div className="flex items-center gap-1 pr-2 border-r border-slate-300">
                      <button className="p-1 hover:bg-slate-200 rounded-none text-slate-700"><Bold className="w-3.5 h-3.5" /></button>
                      <button className="p-1 hover:bg-slate-200 rounded-none text-slate-700"><Italic className="w-3.5 h-3.5" /></button>
                      <button className="p-1 hover:bg-slate-200 rounded-none text-slate-700"><Underline className="w-3.5 h-3.5" /></button>
                      <button className="p-1 hover:bg-slate-200 rounded-none text-slate-700"><Strikethrough className="w-3.5 h-3.5" /></button>
                    </div>
                    <div className="flex items-center gap-1 px-2 border-r border-slate-300">
                      <button className="p-1 hover:bg-slate-200 rounded-none text-slate-700"><Superscript className="w-3.5 h-3.5" /></button>
                      <button className="p-1 hover:bg-slate-200 rounded-none text-slate-700"><Subscript className="w-3.5 h-3.5" /></button>
                      <div className="px-2 py-0.5 bg-white border border-slate-300 rounded-none text-[11px] flex items-center gap-2 cursor-pointer ml-1">
                        16 <ChevronDownIcon className="w-3 h-3" />
                      </div>
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
                    </div>
                  </div>
                  {/* Fake Editor Area */}
                  <textarea 
                    className="w-full h-32 p-3 text-sm focus:outline-none resize-y bg-white"
                  ></textarea>
                  <div className="h-1 bg-slate-200 cursor-row-resize flex justify-center items-center group">
                    <div className="w-8 h-0.5 bg-slate-300 group-hover:bg-slate-400 rounded-none"></div>
                  </div>
                </div>
              </div>
              
            </div>

            {/* Footer Actions */}
            <div className="flex justify-between items-center mt-4">
              <button className="px-4 py-2 bg-white border border-slate-400 text-slate-600 hover:bg-slate-50 font-bold text-[11px] rounded-none flex items-center gap-2 transition-colors cursor-pointer shadow-sm">
                <Plus className="w-3.5 h-3.5" /> Add Question
              </button>
              
              <button className="px-6 py-2 bg-[#6f42c1] hover:bg-[#5a32a3] text-white font-bold text-[11px] rounded-none shadow-sm flex items-center gap-2 transition-colors border-none cursor-pointer">
                <Save className="w-3.5 h-3.5" /> Save Question Paper
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// Helper icon component since it wasn't imported at top
function ChevronDownIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m6 9 6 6 6-6"/>
    </svg>
  );
}
