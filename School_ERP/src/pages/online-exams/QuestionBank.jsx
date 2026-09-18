import React, { useState } from 'react';
import { 
  Database, Network, Star, CheckCircle, Archive, PenTool,
  Upload, Plus, Search, ChevronDown, CheckSquare, Edit, Trash2, SlidersHorizontal, Settings, Copy
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function QuestionBank() {
  const navigate = useNavigate();

  const questions = [
    { id: 1, text: 'A is for...?', type: 'Multiple Choice - Single Answer', level: 'Hard', class: 'Nursery', subject: 'English (NUR ENG)', topic: '-', status: 'Draft', marks: 1, used: 0 },
    { id: 2, text: 'What comes after A?', type: 'Multiple Choice - Single Answer', level: 'Medium', class: 'Nursery', subject: 'English (NUR ENG)', topic: '-', status: 'Published', marks: 1, used: 0 },
    { id: 3, text: 'B is for...?', type: 'Multiple Choice - Single Answer', level: 'Medium', class: 'Nursery', subject: 'English (NUR ENG)', topic: '-', status: 'Published', marks: 1, used: 0 },
    { id: 4, text: 'C is for...?', type: 'Multiple Choice - Single Answer', level: 'Medium', class: 'Nursery', subject: 'English (NUR ENG)', topic: '-', status: 'Draft', marks: 1, used: 0 },
    { id: 5, text: 'What is the first letter of Dog?', type: 'Multiple Choice - Single Answer', level: 'Medium', class: 'Nursery', subject: 'English (NUR ENG)', topic: '-', status: 'Published', marks: 1, used: 0 },
    { id: 6, text: 'E is for...?', type: 'Multiple Choice - Single Answer', level: 'Medium', class: 'Nursery', subject: 'English (NUR ENG)', topic: '-', status: 'Published', marks: 1, used: 0 },
    { id: 7, text: 'F is for...?', type: 'Multiple Choice - Single Answer', level: 'Medium', class: 'Nursery', subject: 'English (NUR ENG)', topic: '-', status: 'Published', marks: 1, used: 0 },
    { id: 8, text: 'What comes after C?', type: 'Multiple Choice - Single Answer', level: 'Medium', class: 'Nursery', subject: 'English (NUR ENG)', topic: '-', status: 'Published', marks: 1, used: 0 },
    { id: 9, text: 'G is for...?', type: 'Multiple Choice - Single Answer', level: 'Medium', class: 'Nursery', subject: 'English (NUR ENG)', topic: '-', status: 'Published', marks: 1, used: 0 },
    { id: 10, text: 'What is the first letter of Apple?', type: 'Multiple Choice - Single Answer', level: 'Medium', class: 'Nursery', subject: 'English (NUR ENG)', topic: '-', status: 'Published', marks: 1, used: 1 },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-10">
      
      {/* Header */}
      <div className="bg-white px-6 py-5 border-b border-slate-200">
        <h1 className="text-2xl font-bold text-slate-800">Question Bank</h1>
        <p className="text-[11px] text-slate-500 mt-1">All questions available for online exams</p>
      </div>

      <div className="p-6 max-w-[1600px] mx-auto space-y-4">
        
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="bg-[#eef2fa] border border-[#d5e0f2] p-3 rounded-none flex items-center gap-3">
            <div className="bg-white p-1.5 rounded-none shadow-sm text-[#007bff]"><Database className="w-4 h-4" /></div>
            <div>
              <div className="text-lg font-black text-[#0056b3]">44</div>
              <div className="text-[9px] text-[#007bff] font-bold uppercase tracking-wider">Total questions</div>
            </div>
          </div>
          
          <div className="bg-[#f3f0ff] border border-[#e4dcf7] p-3 rounded-none flex items-center gap-3">
            <div className="bg-white p-1.5 rounded-none shadow-sm text-[#6f42c1]"><Network className="w-4 h-4" /></div>
            <div>
              <div className="text-lg font-black text-[#5a32a3]">9</div>
              <div className="text-[9px] text-[#6f42c1] font-bold uppercase tracking-wider">Question types</div>
            </div>
          </div>

          <div className="bg-[#ebf8f2] border border-[#d1efdf] p-3 rounded-none flex items-center gap-3">
            <div className="bg-white p-1.5 rounded-none shadow-sm text-[#28a745]"><Star className="w-4 h-4" /></div>
            <div>
              <div className="text-lg font-black text-[#1e7e34]">51</div>
              <div className="text-[9px] text-[#28a745] font-bold uppercase tracking-wider">Total marks</div>
            </div>
          </div>

          <div className="bg-[#eef8fb] border border-[#d7eef5] p-3 rounded-none flex items-center gap-3">
            <div className="bg-white p-1.5 rounded-none shadow-sm text-[#17a2b8]"><CheckCircle className="w-4 h-4" /></div>
            <div>
              <div className="text-lg font-black text-[#117a8b]">11</div>
              <div className="text-[9px] text-[#17a2b8] font-bold uppercase tracking-wider">Used on papers</div>
            </div>
          </div>

          <div className="bg-[#fff8e6] border border-[#ffeebf] p-3 rounded-none flex items-center gap-3">
            <div className="bg-white p-1.5 rounded-none shadow-sm text-orange-500"><Archive className="w-4 h-4" /></div>
            <div>
              <div className="text-lg font-black text-orange-700">33</div>
              <div className="text-[9px] text-orange-600 font-bold uppercase tracking-wider">Never used</div>
            </div>
          </div>

          <div className="bg-[#f8f9fa] border border-[#e9ecef] p-3 rounded-none flex items-center gap-3">
            <div className="bg-white p-1.5 rounded-none shadow-sm text-slate-500"><PenTool className="w-4 h-4" /></div>
            <div>
              <div className="text-lg font-black text-slate-700">2</div>
              <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Drafts</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button 
            onClick={() => navigate('/online-exams/question-bank/bulk-upload')}
            className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-bold text-[11px] rounded-none flex items-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer shadow-sm"
          >
            <Upload className="w-3.5 h-3.5" /> Bulk Upload
          </button>
          <button 
            onClick={() => navigate('/online-exams/question-bank/new')}
            className="px-4 py-2 bg-[#6f42c1] hover:bg-[#5a32a3] text-white font-bold text-[11px] rounded-none shadow-sm flex items-center gap-2 transition-colors border-none cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add New Question
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white border border-slate-200 rounded-none shadow-sm p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-700 mb-1">Type</label>
              <select className="w-full px-3 py-1.5 border border-slate-300 rounded-none text-xs bg-white focus:outline-none focus:border-[#6f42c1]">
                <option>All types</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-700 mb-1">Difficulty</label>
              <select className="w-full px-3 py-1.5 border border-slate-300 rounded-none text-xs bg-white focus:outline-none focus:border-[#6f42c1]">
                <option>All levels</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-700 mb-1">Class</label>
              <select className="w-full px-3 py-1.5 border border-slate-300 rounded-none text-xs bg-white focus:outline-none focus:border-[#6f42c1]">
                <option>All</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-700 mb-1">Subject</label>
              <select className="w-full px-3 py-1.5 border border-slate-300 rounded-none text-xs bg-white focus:outline-none focus:border-[#6f42c1]">
                <option>All</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-700 mb-1">Topic</label>
              <select className="w-full px-3 py-1.5 border border-slate-300 rounded-none text-xs bg-white focus:outline-none focus:border-[#6f42c1]">
                <option>All</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-700 mb-1">Status</label>
              <select className="w-full px-3 py-1.5 border border-slate-300 rounded-none text-xs bg-white focus:outline-none focus:border-[#6f42c1]">
                <option>All</option>
              </select>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-700 mb-1">Code</label>
              <input type="text" placeholder="que_..." className="w-48 px-3 py-1.5 border border-slate-300 rounded-none text-xs focus:outline-none focus:border-[#6f42c1]" />
            </div>
            <div className="flex items-center gap-2 mt-5">
              <input type="checkbox" className="w-3.5 h-3.5 accent-[#6f42c1] cursor-pointer" />
              <span className="text-xs text-slate-700 font-bold">Never used on a paper</span>
            </div>
            <button className="px-3 py-1.5 border border-slate-300 rounded-none text-xs text-slate-700 font-bold hover:bg-slate-50 mt-5">
              Clear filters
            </button>
            <div className="flex gap-2 mt-5 ml-auto">
              <select className="w-48 px-3 py-1.5 border border-slate-300 rounded-none text-xs bg-white focus:outline-none focus:border-[#6f42c1]">
                <option>Re-tag selected as...</option>
              </select>
              <button className="px-5 py-1.5 bg-[#6f42c1] text-white rounded-none font-bold text-xs hover:bg-[#5a32a3]">
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white border border-slate-200 rounded-none shadow-sm overflow-hidden">
          
          <div className="px-5 py-3 border-b border-slate-200 flex justify-between items-center bg-white">
            <div className="flex items-center gap-2 text-[#6f42c1] font-bold text-sm">
              <Database className="w-4 h-4" /> All Questions
            </div>
          </div>
          
          <div className="px-5 py-2 border-b border-slate-200 flex justify-between items-center bg-slate-50">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Show</span>
              <select className="border border-slate-300 rounded-none px-1 text-xs">
                <option>10</option>
              </select>
              <div className="flex items-center gap-1 ml-3">
                <button onClick={() => alert("Copied to clipboard!")} className="p-1 border border-slate-300 rounded-none bg-white hover:bg-slate-50 cursor-pointer"><Copy className="w-3.5 h-3.5 text-slate-500" /></button>
                <button onClick={() => alert("Exporting to CSV...")} className="px-2 py-1 border border-slate-300 rounded-none bg-white text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer">CSV</button>
                <button onClick={() => alert("Exporting to Excel...")} className="px-2 py-1 border border-slate-300 rounded-none bg-white text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer">Excel</button>
                <button onClick={() => alert("Exporting to PDF...")} className="px-2 py-1 border border-slate-300 rounded-none bg-white text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer">PDF</button>
                <button className="p-1 border border-slate-300 rounded-none bg-white hover:bg-slate-50 cursor-pointer"><CheckSquare className="w-3.5 h-3.5 text-slate-500" /></button>
                <button className="px-2 py-1 border border-slate-300 rounded-none bg-white text-[10px] font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-1 ml-1 cursor-pointer">
                  <SlidersHorizontal className="w-3 h-3" /> Columns <ChevronDown className="w-3 h-3" />
                </button>
              </div>
            </div>
            <div>
              <input type="text" placeholder="Search questions..." className="px-3 py-1 text-xs border border-slate-300 rounded-none focus:outline-none w-48" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-[#f8f9ff] border-b border-slate-200 text-[10px] font-bold text-[#6f42c1] uppercase tracking-wider">
                  <th className="py-3 px-3 border-r border-slate-200 w-10 text-center"><input type="checkbox" className="accent-[#6f42c1]" /></th>
                  <th className="py-3 px-3 border-r border-slate-200 w-12 text-center">#</th>
                  <th className="py-3 px-4 border-r border-slate-200">QUESTION</th>
                  <th className="py-3 px-4 border-r border-slate-200">TYPE</th>
                  <th className="py-3 px-4 border-r border-slate-200">LEVEL</th>
                  <th className="py-3 px-4 border-r border-slate-200">CLASS</th>
                  <th className="py-3 px-4 border-r border-slate-200">SUBJECT</th>
                  <th className="py-3 px-4 border-r border-slate-200">TOPIC</th>
                  <th className="py-3 px-4 border-r border-slate-200">STATUS</th>
                  <th className="py-3 px-4 border-r border-slate-200 text-center">MARKS</th>
                  <th className="py-3 px-4 border-r border-slate-200 text-center">USED</th>
                  <th className="py-3 px-4 text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="text-xs text-slate-700">
                {questions.map((q) => (
                  <tr key={q.id} className="border-b border-slate-100 bg-white hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 border-r border-slate-100 text-center"><input type="checkbox" className="accent-[#6f42c1]" /></td>
                    <td className="py-3 px-3 border-r border-slate-100 text-center text-slate-400">{q.id}</td>
                    <td className="py-3 px-4 border-r border-slate-100">{q.text}</td>
                    <td className="py-3 px-4 border-r border-slate-100 text-slate-500">{q.type}</td>
                    <td className="py-3 px-4 border-r border-slate-100 text-slate-500">{q.level}</td>
                    <td className="py-3 px-4 border-r border-slate-100 text-slate-500">{q.class}</td>
                    <td className="py-3 px-4 border-r border-slate-100 text-slate-500">{q.subject}</td>
                    <td className="py-3 px-4 border-r border-slate-100 text-slate-400 text-center">{q.topic}</td>
                    <td className="py-3 px-4 border-r border-slate-100">
                      {q.status === 'Draft' ? (
                        <span className="px-2 py-0.5 rounded-none text-[10px] font-bold bg-[#fff8e6] text-orange-600 shadow-sm">{q.status}</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-none text-[10px] font-bold bg-[#ebf8f2] text-[#28a745] shadow-sm">{q.status}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 border-r border-slate-100 text-center">{q.marks}</td>
                    <td className="py-3 px-4 border-r border-slate-100 text-center">{q.used}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button className={`p-1 rounded-none text-white ${q.status === 'Published' ? 'bg-slate-400 cursor-not-allowed' : 'bg-[#28a745] hover:bg-[#218838]'} transition-colors shadow-sm`}>
                          <CheckCircle className="w-3 h-3" />
                        </button>
                        <button className="p-1 rounded-none bg-[#17a2b8] hover:bg-[#138496] text-white transition-colors shadow-sm">
                          <Edit className="w-3 h-3" />
                        </button>
                        <button className="p-1 rounded-none bg-[#007bff] hover:bg-[#0056b3] text-white transition-colors shadow-sm">
                          <Copy className="w-3 h-3" />
                        </button>
                        <button className="p-1 rounded-none bg-[#dc3545] hover:bg-[#c82333] text-white transition-colors shadow-sm">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="px-5 py-3 bg-white border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
            <div>Showing 1 - 10 of 44</div>
            <div className="flex gap-1">
              <button className="w-6 h-6 rounded-none border border-slate-300 flex items-center justify-center text-slate-400 hover:bg-slate-50">&lt;</button>
              <button className="w-6 h-6 rounded-none bg-[#6f42c1] text-white flex items-center justify-center shadow-sm">1</button>
              <button className="w-6 h-6 rounded-none border border-slate-300 flex items-center justify-center hover:bg-slate-50 text-slate-600">2</button>
              <button className="w-6 h-6 rounded-none border border-slate-300 flex items-center justify-center hover:bg-slate-50 text-slate-600">3</button>
              <button className="w-6 h-6 rounded-none border border-slate-300 flex items-center justify-center hover:bg-slate-50 text-slate-600">4</button>
              <button className="w-6 h-6 rounded-none border border-slate-300 flex items-center justify-center hover:bg-slate-50 text-slate-600">5</button>
              <button className="w-6 h-6 rounded-none border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-50">&gt;</button>
            </div>
          </div>
          
        </div>

      </div>
    </div>
  );
}
