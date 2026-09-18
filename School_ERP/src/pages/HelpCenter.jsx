import React, { useState } from 'react';
import { 
  LifeBuoy, Plus, Search, List, LayoutGrid, Copy, FileSpreadsheet, 
  FileText, Printer, Columns, ChevronDown, Eye, ArrowLeft, BookOpen, Send, Paperclip
} from 'lucide-react';

const CATEGORIES = [
  { name: 'All', count: null, active: true },
  { name: 'Getting Started', count: 3 },
  { name: 'Dashboard & Navigation', count: 1 },
  { name: 'Student Management', count: 3 },
  { name: 'Academics', count: 1 },
  { name: 'Attendance', count: 1 },
  { name: 'Fees & Accounts', count: 2 },
  { name: 'Examinations', count: 1 },
  { name: 'Online Examinations', count: 1 },
  { name: 'HR & Staff Management', count: 1 },
  { name: 'Timetable', count: 1 },
  { name: 'Library', count: 1 },
  { name: 'Transport', count: 1 },
  { name: 'Hostel', count: 1 },
  { name: 'Homework', count: 1 },
  { name: 'Notice Board & Communication', count: 1 },
  { name: 'Study Center', count: 1 },
  { name: 'Documents & Certificates', count: 1 },
  { name: 'Settings & Configuration', count: 1 },
  { name: 'Mobile Apps', count: 2 },
  { name: 'Platform Administration', count: 1 },
];

const ARTICLES = [
  { id: 1, title: '📌 Welcome to the School Management System', category: 'Getting Started', status: 'Published', source: 'Platform' },
  { id: 2, title: 'Understanding User Roles & Permissions', category: 'Getting Started', status: 'Published', source: 'Platform' },
  { id: 3, title: 'Transport & Bus Route Management', category: 'Transport', status: 'Published', source: 'Platform' },
  { id: 4, title: 'Taking Daily Attendance', category: 'Attendance', status: 'Published', source: 'Platform' },
  { id: 5, title: 'Study Materials & Live Classes', category: 'Study Center', status: 'Published', source: 'Platform' },
  { id: 6, title: 'Student Promotion & Session Transfer', category: 'Student Management', status: 'Published', source: 'Platform' },
  { id: 7, title: 'Student Profile & Documents', category: 'Student Management', status: 'Published', source: 'Platform' },
  { id: 8, title: 'Staff Management & Payroll', category: 'HR & Staff Management', status: 'Published', source: 'Platform' },
  { id: 9, title: 'Staff App — Complete Guide', category: 'Mobile Apps', status: 'Published', source: 'Platform' },
];

export default function HelpCenter() {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className="bg-[#f4f7fc] min-h-[calc(100vh-64px)] font-sans p-6 pb-20">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <LifeBuoy className="w-6 h-6 text-gray-800 mr-2" />
          <div>
            <h1 className="text-[22px] font-semibold text-gray-800 leading-tight">
              {isCreating ? 'Create Article' : 'Help Center'}
            </h1>
            <p className="text-gray-500 text-[12px] mt-0.5">
              {isCreating ? 'Written for your school — platform articles cannot be edited here' : 'Platform guides plus any articles your school writes'}
            </p>
          </div>
        </div>
        
        {isCreating ? (
          <button 
            onClick={() => setIsCreating(false)}
            className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-none text-sm font-bold hover:bg-gray-50 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Help Center
          </button>
        ) : (
          <button 
            onClick={() => setIsCreating(true)}
            className="flex items-center px-4 py-2 bg-[#5542f6] text-white rounded-none text-sm font-bold hover:bg-[#4a3ae0] transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Your Article
          </button>
        )}
      </div>

      {!isCreating ? (
        <>
          {/* Filters & Tags */}
          <div className="bg-white rounded-none border border-gray-200 shadow-sm p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
              <div className="md:col-span-6">
                <label className="block text-[12px] font-bold text-gray-700 mb-1">Search</label>
                <div className="flex">
                  <input type="text" placeholder="Search articles, guides, FAQs..." className="flex-1 border border-gray-300 border-r-0 rounded-l p-2 text-sm outline-none focus:border-[#5542f6]" />
                  <button className="bg-[#5542f6] text-white px-4 py-2 rounded-r hover:bg-[#4a3ae0]"><Search className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="md:col-span-3">
                <label className="block text-[12px] font-bold text-gray-700 mb-1">Category</label>
                <select className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none bg-white focus:border-[#5542f6]">
                  <option>All Categories</option>
                </select>
              </div>
              <div className="md:col-span-3">
                <label className="block text-[12px] font-bold text-gray-700 mb-1">Status</label>
                <select className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none bg-white focus:border-[#5542f6]">
                  <option>Published</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat, idx) => (
                <button 
                  key={idx} 
                  className={`flex items-center px-3 py-1 rounded-none text-[12px] font-medium border transition-colors ${cat.active ? 'bg-[#5542f6] text-white border-[#5542f6]' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                >
                  {cat.active && <LayoutGrid className="w-3 h-3 mr-1.5" />}
                  {!cat.active && <BookOpen className="w-3 h-3 mr-1.5 text-gray-400" />}
                  {cat.name} 
                  {cat.count !== null && <span className={`ml-1.5 px-1.5 py-0.5 rounded-none text-[10px] ${cat.active ? 'bg-white/20' : 'bg-gray-100 text-gray-500'}`}>{cat.count}</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center">
                <BookOpen className="w-4 h-4 text-[#5542f6] mr-2" />
                <h2 className="text-sm font-bold text-gray-800">Articles</h2>
              </div>
              <div className="flex bg-gray-100 p-0.5 rounded-none border border-gray-200">
                <button className="w-8 h-7 bg-white shadow-sm rounded-none flex items-center justify-center text-[#5542f6]">
                  <List className="w-4 h-4" />
                </button>
                <button className="w-8 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Toolbar */}
            <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center text-sm text-gray-600 mr-2">
                  <span>Show</span>
                  <div className="mx-2 px-2 py-1 border border-gray-300 rounded-none bg-white flex items-center">
                    10 <ChevronDown className="w-3 h-3 ml-2 text-gray-400" />
                  </div>
                </div>
                
                <div className="flex rounded-none border border-gray-300 overflow-hidden bg-white shadow-sm">
                  <button className="px-3 py-1.5 border-r border-gray-300 hover:bg-gray-50 text-gray-600"><Copy className="w-4 h-4" /></button>
                  <button className="px-3 py-1.5 border-r border-gray-300 hover:bg-gray-50 text-[13px] font-semibold text-gray-700">CSV</button>
                  <button className="px-3 py-1.5 border-r border-gray-300 hover:bg-gray-50 text-[13px] font-semibold text-gray-700">Excel</button>
                  <button className="px-3 py-1.5 border-r border-gray-300 hover:bg-gray-50 text-[13px] font-semibold text-gray-700">PDF</button>
                  <button className="px-3 py-1.5 border-r border-gray-300 hover:bg-gray-50 text-gray-600"><Printer className="w-4 h-4" /></button>
                  <button className="px-3 py-1.5 hover:bg-gray-50 text-[13px] font-semibold text-gray-700 flex items-center">
                    <Columns className="w-4 h-4 mr-1.5" /> Columns <ChevronDown className="w-3 h-3 ml-1 text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="w-full md:w-64">
                <input type="text" placeholder="Search articles..." className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none focus:border-[#5542f6] shadow-sm" />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-indigo-50/50 border-b border-gray-200">
                    <th className="p-4 text-[11px] font-bold text-[#5542f6] uppercase">ARTICLE TITLE</th>
                    <th className="p-4 text-[11px] font-bold text-[#5542f6] uppercase w-48">CATEGORY</th>
                    <th className="p-4 text-[11px] font-bold text-[#5542f6] uppercase w-32 text-center">STATUS</th>
                    <th className="p-4 text-[11px] font-bold text-[#5542f6] uppercase w-32 text-center">SOURCE</th>
                    <th className="p-4 text-[11px] font-bold text-[#5542f6] uppercase w-24 text-center">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="text-[13px] text-gray-700">
                  {ARTICLES.map((article) => (
                    <tr key={article.id} className="border-b border-gray-100 hover:bg-gray-50/30">
                      <td className="p-4 font-medium text-gray-800">{article.title}</td>
                      <td className="p-4 text-gray-500">{article.category}</td>
                      <td className="p-4 text-center">
                        <span className="text-[#28a745] font-semibold text-[12px]">{article.status}</span>
                      </td>
                      <td className="p-4 text-center">
                        <span className="bg-gray-100 text-gray-500 px-2.5 py-0.5 rounded-none text-[11px] font-medium flex items-center justify-center w-max mx-auto">
                          <LifeBuoy className="w-3 h-3 mr-1" /> {article.source}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <button className="text-gray-400 hover:text-[#5542f6] transition-colors">
                          <Eye className="w-4 h-4 mx-auto" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="p-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white">
              <div className="text-[13px] text-gray-500">Showing 1-10 of 26</div>
              <div className="flex items-center space-x-1">
                <button className="w-8 h-8 rounded-none border border-transparent hover:bg-gray-100 flex items-center justify-center text-gray-400 text-sm">&lt;</button>
                <button className="w-8 h-8 rounded-none bg-[#5542f6] text-white flex items-center justify-center text-sm font-bold shadow-sm">1</button>
                <button className="w-8 h-8 rounded-none border border-transparent hover:bg-gray-100 flex items-center justify-center text-gray-600 text-sm font-medium">2</button>
                <button className="w-8 h-8 rounded-none border border-transparent hover:bg-gray-100 flex items-center justify-center text-gray-600 text-sm font-medium">3</button>
                <button className="w-8 h-8 rounded-none border border-transparent hover:bg-gray-100 flex items-center justify-center text-gray-400 text-sm">&gt;</button>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Create Article Form */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Main Form Fields */}
            <div className="bg-white rounded-none border border-gray-200 shadow-sm p-6">
              <div className="mb-6">
                <label className="block text-[12px] font-bold text-gray-700 mb-1">Article Title <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Enter article title" className="w-full border border-gray-300 rounded-none p-2.5 text-sm outline-none focus:border-[#5542f6]" />
              </div>

              <div className="mb-6">
                <label className="block text-[12px] font-bold text-gray-700 mb-1">Content <span className="text-red-500">*</span></label>
                <div className="border border-gray-300 rounded-none overflow-hidden">
                  <div className="bg-gray-50 border-b border-gray-300 p-2 flex gap-1 flex-wrap">
                    {/* Dummy Rich Text Toolbar */}
                    <button className="p-1.5 hover:bg-gray-200 rounded-none text-gray-700 font-bold">B</button>
                    <button className="p-1.5 hover:bg-gray-200 rounded-none text-gray-700 italic">I</button>
                    <button className="p-1.5 hover:bg-gray-200 rounded-none text-gray-700 underline">U</button>
                    <button className="p-1.5 hover:bg-gray-200 rounded-none text-gray-700 line-through">S</button>
                    <div className="w-px h-6 bg-gray-300 mx-1 my-auto"></div>
                    <button className="p-1.5 hover:bg-gray-200 rounded-none text-gray-700"><List className="w-4 h-4" /></button>
                    <button className="p-1.5 hover:bg-gray-200 rounded-none text-gray-700"><LayoutGrid className="w-4 h-4" /></button>
                    <div className="w-px h-6 bg-gray-300 mx-1 my-auto"></div>
                    <button className="p-1.5 hover:bg-gray-200 rounded-none text-gray-700 font-bold text-[12px] px-2">A</button>
                  </div>
                  <textarea rows="10" placeholder="Write your article..." className="w-full p-3 outline-none text-sm resize-none"></textarea>
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-gray-700 mb-1">Excerpt</label>
                <textarea rows="2" className="w-full border border-gray-300 rounded-none p-2.5 text-sm outline-none focus:border-[#5542f6] resize-none"></textarea>
                <p className="text-[11px] text-gray-400 mt-1">Short summary shown in search results and listings.</p>
              </div>
            </div>

            {/* Attachments Box */}
            <div className="bg-white rounded-none border border-gray-200 shadow-sm flex flex-col">
              <div className="p-3 border-b border-gray-100 flex items-center bg-gray-50/50">
                <Paperclip className="w-4 h-4 text-[#5542f6] mr-2" />
                <h2 className="text-sm font-bold text-gray-800">Attachments</h2>
              </div>
              <div className="p-5">
                <div className="flex items-center">
                  <button className="px-3 py-1 bg-gray-100 border border-gray-300 rounded-none text-sm text-gray-700 hover:bg-gray-200 mr-2">
                    Choose files
                  </button>
                  <span className="text-sm text-gray-500">No file chosen</span>
                </div>
                <p className="text-[11px] text-gray-400 mt-1">Max 10MB per file.</p>
              </div>
            </div>

          </div>

          {/* Right Column - Publish Settings */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-none border border-gray-200 shadow-sm flex flex-col sticky top-6">
              <div className="p-4 border-b border-gray-100 flex items-center bg-gray-50/50">
                <Send className="w-4 h-4 text-[#5542f6] mr-2" />
                <h2 className="text-sm font-bold text-gray-800">Publish Settings</h2>
              </div>
              
              <div className="p-5 space-y-5">
                
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1">Status</label>
                  <select className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none bg-white focus:border-[#5542f6]">
                    <option>Published</option>
                    <option>Draft</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1">Visibility</label>
                  <select className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none bg-white focus:border-[#5542f6]">
                    <option>Staff & Admin</option>
                    <option>Public</option>
                    <option>Students</option>
                  </select>
                  <p className="text-[11px] text-gray-400 mt-1">Articles are visible within your school only.</p>
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1">Category</label>
                  <select className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none bg-white focus:border-[#5542f6]">
                    <option>— Uncategorized —</option>
                    <option>Getting Started</option>
                    <option>Transport</option>
                    <option>Attendance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1">Tags (comma separated)</label>
                  <input type="text" defaultValue="fees, admission" className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none focus:border-[#5542f6]" />
                </div>

                <div className="flex items-center">
                  <div className="w-8 h-4 bg-gray-300 rounded-none mr-2 relative cursor-pointer">
                    <div className="w-3 h-3 bg-white rounded-none absolute top-0.5 left-0.5"></div>
                  </div>
                  <span className="text-[13px] font-medium text-gray-700 flex items-center">
                    📌 Pin to top
                  </span>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <button className="w-full py-2 bg-[#5542f6] text-white rounded-none text-sm font-bold hover:bg-[#4a3ae0] shadow-sm flex justify-center items-center">
                    <Send className="w-3.5 h-3.5 mr-2" /> Publish
                  </button>
                  <button 
                    onClick={() => setIsCreating(false)}
                    className="w-full py-2 border border-gray-300 bg-white text-gray-700 rounded-none text-sm font-bold hover:bg-gray-50 shadow-sm"
                  >
                    Cancel
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
