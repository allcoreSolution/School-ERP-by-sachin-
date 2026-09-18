import React, { useState, useEffect } from 'react';
import { 
  Megaphone, Plus, Layers, List, Grid, 
  FileText, FileSpreadsheet, File, Printer, Columns, 
  Search, Edit, Trash2, ChevronLeft, ChevronRight,
  Bold, Italic, Underline, Strikethrough, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Link2, Image, Video, Code, HelpCircle, Calendar
} from 'lucide-react';
import { noticeService } from '../api/noticeService';

export default function NoticeBoard() {
  const [isAdding, setIsAdding] = useState(false);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newNotice, setNewNotice] = useState({ title: '', sentTo: 'All (Entire School)', content: '', publishDate: '', priority: 'Normal' });

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const res = await noticeService.getNotices();
      setNotices(res.data || []);
    } catch (err) {
      console.error(err);
      setNotices([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePublishNotice = async () => {
    if (!newNotice.title) { alert('Title is required!'); return; }
    try {
      await noticeService.createNotice(newNotice);
      alert('Notice published!');
      setIsAdding(false);
      fetchNotices();
    } catch (err) {
      alert('Error publishing notice: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDeleteNotice = async (id) => {
    if (!window.confirm('Delete this notice?')) return;
    try {
      await noticeService.deleteNotice(id);
      setNotices(notices.filter(n => n._id !== id));
    } catch (err) {
      alert('Error: ' + (err.response?.data?.message || err.message));
    }
  };

  if (isAdding) {
    return (
      <div className="p-6">
        <div className="mb-6 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Add New Notice</h1>
            <p className="text-sm text-gray-500 mt-1">Publish an announcement to the whole school, a group, or one class</p>
          </div>
          <button 
            onClick={() => setIsAdding(false)}
            className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-none text-sm font-bold hover:bg-gray-50 shadow-sm"
          >
            Cancel
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex items-center">
                <Megaphone className="w-5 h-5 text-[#5542f6] mr-2" />
                <h2 className="text-base font-bold text-gray-800">Notice Details</h2>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g., Annual Day rehearsal schedule"
                    className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none focus:border-[#5542f6]"
                  />
                </div>
                
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">
                    Send To <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full max-w-md border border-gray-300 rounded-none p-2 text-sm outline-none focus:border-[#5542f6] bg-white">
                    <option>All (Entire School)</option>
                    <option>All Parents</option>
                    <option>All Staff</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">
                    Content <span className="text-red-500">*</span>
                  </label>
                  <div className="border border-gray-300 rounded-none overflow-hidden flex flex-col">
                    {/* Toolbar */}
                    <div className="bg-gray-50/50 border-b border-gray-200 p-2 flex flex-wrap gap-1 items-center">
                      <button className="p-1.5 hover:bg-gray-200 rounded-none text-gray-700"><Megaphone className="w-4 h-4" /></button>
                      <div className="w-px h-5 bg-gray-300 mx-1"></div>
                      <button className="p-1.5 hover:bg-gray-200 rounded-none text-gray-700"><Bold className="w-4 h-4" /></button>
                      <button className="p-1.5 hover:bg-gray-200 rounded-none text-gray-700"><Italic className="w-4 h-4" /></button>
                      <button className="p-1.5 hover:bg-gray-200 rounded-none text-gray-700 underline"><Underline className="w-4 h-4" /></button>
                      <button className="p-1.5 hover:bg-gray-200 rounded-none text-gray-700 line-through"><Strikethrough className="w-4 h-4" /></button>
                      <div className="w-px h-5 bg-gray-300 mx-1"></div>
                      <select className="text-sm bg-transparent border-none outline-none text-gray-700 cursor-pointer hover:bg-gray-200 py-1 px-2 rounded">
                        <option>Segoe UI</option>
                      </select>
                      <div className="w-px h-5 bg-gray-300 mx-1"></div>
                      <button className="p-1.5 hover:bg-gray-200 rounded-none font-bold text-black bg-yellow-200">A</button>
                      <div className="w-px h-5 bg-gray-300 mx-1"></div>
                      <button className="p-1.5 hover:bg-gray-200 rounded-none text-gray-700"><AlignLeft className="w-4 h-4" /></button>
                      <button className="p-1.5 hover:bg-gray-200 rounded-none text-gray-700"><AlignCenter className="w-4 h-4" /></button>
                      <button className="p-1.5 hover:bg-gray-200 rounded-none text-gray-700"><AlignRight className="w-4 h-4" /></button>
                      <button className="p-1.5 hover:bg-gray-200 rounded-none text-gray-700"><AlignJustify className="w-4 h-4" /></button>
                      <div className="w-px h-5 bg-gray-300 mx-1"></div>
                      <button className="p-1.5 hover:bg-gray-200 rounded-none text-gray-700"><Grid className="w-4 h-4" /></button>
                      <div className="w-px h-5 bg-gray-300 mx-1"></div>
                      <button className="p-1.5 hover:bg-gray-200 rounded-none text-gray-700"><Link2 className="w-4 h-4" /></button>
                      <button className="p-1.5 hover:bg-gray-200 rounded-none text-gray-700"><Image className="w-4 h-4" /></button>
                      <button className="p-1.5 hover:bg-gray-200 rounded-none text-gray-700"><Video className="w-4 h-4" /></button>
                      <button className="p-1.5 hover:bg-gray-200 rounded-none text-gray-700"><Code className="w-4 h-4" /></button>
                      <button className="p-1.5 hover:bg-gray-200 rounded-none text-gray-700"><HelpCircle className="w-4 h-4" /></button>
                    </div>
                    {/* Editor Area */}
                    <textarea 
                      className="w-full h-[250px] p-4 text-sm outline-none resize-none"
                    ></textarea>
                    {/* Footer resize handle placeholder */}
                    <div className="h-3 bg-gray-50 border-t border-gray-200 flex justify-center items-center cursor-row-resize">
                      <div className="w-8 h-1 bg-gray-300 rounded-none"></div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 max-w-md">
                  <div>
                    <label className="block text-[13px] font-bold text-gray-700 mb-1">
                      Publish Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input 
                        type="text" 
                        defaultValue="23-08-2026"
                        className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none focus:border-[#5542f6]"
                      />
                      <Calendar className="w-4 h-4 text-gray-500 absolute right-3 top-2.5 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-gray-700 mb-1">
                      Priority
                    </label>
                    <select className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none focus:border-[#5542f6] bg-white">
                      <option>Normal</option>
                      <option>High</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">
                    App Popup Alert
                  </label>
                  <div className="flex items-center space-x-3 mt-2">
                    <div className="w-10 h-5 bg-gray-200 rounded-none relative cursor-pointer">
                      <div className="w-4 h-4 bg-white rounded-none shadow absolute top-0.5 left-0.5"></div>
                    </div>
                    <span className="text-sm text-gray-600">Show as launch "News Alert" popup in the app</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button onClick={handlePublishNotice} className="px-6 py-2 bg-[#5542f6] text-white rounded-none text-sm font-bold hover:bg-[#4a3ae0] shadow-sm">
                 Publish Notice
               </button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden p-6">
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 rounded-none bg-[#f3f0ff] flex items-center justify-center mr-3">
                  <span className="text-[#5542f6] font-bold text-sm">?</span>
                </div>
                <h3 className="text-sm font-bold text-gray-800">Who sees this notice</h3>
              </div>
              
              <ul className="space-y-4">
                <li className="flex items-start text-[13px] text-gray-600 leading-relaxed">
                  <div className="w-1 h-1 rounded-none bg-[#5542f6] mt-2 mr-3 flex-shrink-0"></div>
                  <div><strong className="text-gray-700 font-bold">Entire School</strong> — everyone, staff and parents alike.</div>
                </li>
                <li className="flex items-start text-[13px] text-gray-600 leading-relaxed">
                  <div className="w-1 h-1 rounded-none bg-[#5542f6] mt-2 mr-3 flex-shrink-0"></div>
                  <div><strong className="text-gray-700 font-bold">All Staff</strong> or <strong className="text-gray-700 font-bold">All Parents</strong> — one side only; handy for internal circulars.</div>
                </li>
                <li className="flex items-start text-[13px] text-gray-600 leading-relaxed">
                  <div className="w-1 h-1 rounded-none bg-[#5542f6] mt-2 mr-3 flex-shrink-0"></div>
                  <div><strong className="text-gray-700 font-bold">A Specific Class</strong> — only that class's parents. Teachers see notices for the classes they are allotted.</div>
                </li>
                <li className="flex items-start text-[13px] text-gray-600 leading-relaxed">
                  <div className="w-1 h-1 rounded-none bg-[#5542f6] mt-2 mr-3 flex-shrink-0"></div>
                  <div><strong className="text-gray-700 font-bold">Popup alert</strong> — the notice also opens as a "News Alert" when the app launches, until the expiry date you set.</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Notice Board</h1>
          <p className="text-sm text-gray-500 mt-1">Announcements published to parents, staff and classes</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-none text-sm font-bold hover:bg-gray-50 shadow-sm">
            <Layers className="w-4 h-4 mr-2" /> View all sessions
          </button>
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center px-4 py-2 bg-[#5542f6] text-white rounded-none text-sm font-bold hover:bg-[#4a3ae0] shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" /> Add New Notice
          </button>
        </div>
      </div>

      <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center">
            <Megaphone className="w-4 h-4 text-[#5542f6] mr-2" />
            <h2 className="text-sm font-bold text-gray-800">Notices — this session</h2>
          </div>
          <div className="flex border border-gray-300 rounded-none overflow-hidden">
            <button className="p-1.5 bg-[#f3f0ff] text-[#5542f6] border-r border-gray-300"><List className="w-4 h-4" /></button>
            <button className="p-1.5 bg-white text-gray-500 hover:bg-gray-50"><Grid className="w-4 h-4" /></button>
          </div>
        </div>
        
        <div className="p-4 border-b border-gray-100 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">Show</span>
              <select className="border border-gray-300 rounded-none px-2 py-1.5 text-sm outline-none focus:border-[#5542f6] bg-white">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
            </div>
            
            <div className="flex space-x-1 ml-2">
              <button className="px-3 py-1.5 border border-gray-300 text-gray-600 rounded-none text-sm hover:bg-gray-50 flex items-center"><FileText className="w-3.5 h-3.5" /></button>
              <button className="px-3 py-1.5 border border-gray-300 text-gray-600 rounded-none text-sm hover:bg-gray-50">CSV</button>
              <button className="px-3 py-1.5 border border-gray-300 text-gray-600 rounded-none text-sm hover:bg-gray-50">Excel</button>
              <button className="px-3 py-1.5 border border-gray-300 text-gray-600 rounded-none text-sm hover:bg-gray-50">PDF</button>
              <button className="px-3 py-1.5 border border-gray-300 text-gray-600 rounded-none text-sm hover:bg-gray-50"><Printer className="w-3.5 h-3.5" /></button>
              <button className="px-3 py-1.5 border border-gray-300 text-gray-600 rounded-none text-sm hover:bg-gray-50 flex items-center ml-1"><Columns className="w-3.5 h-3.5 mr-1.5" /> Columns <ChevronRight className="w-3 h-3 ml-1 rotate-90" /></button>
            </div>
          </div>
          
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search notices..." 
              className="pl-3 pr-8 py-1.5 border border-gray-300 rounded-none text-sm outline-none focus:border-[#5542f6] w-[250px]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f8f9fe] border-b border-gray-200">
                <th className="p-3 text-[12px] font-bold text-[#5542f6] w-12 text-center">#</th>
                <th className="p-3 text-[12px] font-bold text-[#5542f6]">TITLE</th>
                <th className="p-3 text-[12px] font-bold text-[#5542f6]">SENT TO</th>
                <th className="p-3 text-[12px] font-bold text-[#5542f6]">PUBLISHED ON</th>
                <th className="p-3 text-[12px] font-bold text-[#5542f6]">SOCIAL</th>
                <th className="p-3 text-[12px] font-bold text-[#5542f6] text-center w-24">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-gray-700">
              {loading ? (
                <tr><td colSpan="6" className="p-6 text-center text-gray-500 font-semibold">Loading notices...</td></tr>
              ) : notices.length === 0 ? (
                <tr><td colSpan="6" className="p-6 text-center text-gray-400 font-medium">No notices found. Publish one above!</td></tr>
              ) : notices.map((notice, i) => (
                <tr key={notice._id || i} className="border-b border-gray-100 hover:bg-gray-50/50">
                  <td className="p-4 text-center text-gray-500">{i + 1}</td>
                  <td className="p-4 font-medium text-gray-800">{notice.title}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-none text-[11px] font-bold ${notice.sentTo === 'All (Entire School)' || notice.sentTo === 'Entire School' ? 'bg-[#e2e3ff] text-[#5542f6]' : 'bg-[#fff3cd] text-[#856404]'}`}>
                      {notice.sentTo || 'All'}
                    </span>
                  </td>
                  <td className="p-4 text-gray-800">{notice.publishDate ? new Date(notice.publishDate).toLocaleDateString('en-IN') : notice.publishedOn || '-'}</td>
                  <td className="p-4"></td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button className="text-gray-400 hover:text-[#5542f6]"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDeleteNotice(notice._id)} className="text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-600">Showing {notices.length} notices</p>
          <div className="flex items-center space-x-1">
            <button className="px-2 py-1 border border-gray-200 text-gray-400 rounded-none bg-gray-50 cursor-not-allowed">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="px-3 py-1 bg-[#5542f6] text-white rounded-none font-bold text-sm">
              1
            </button>
            <button className="px-2 py-1 border border-gray-200 text-gray-400 rounded-none bg-gray-50 cursor-not-allowed">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
