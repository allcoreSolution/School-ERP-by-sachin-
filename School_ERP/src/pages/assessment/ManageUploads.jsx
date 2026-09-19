import React, { useState } from 'react';
import { 
  FileText, Copy, FileSpreadsheet, Printer, Columns, 
  RotateCcw, Eye, CheckCircle2, Clock, Trash2, Check, X,
  LayoutGrid, List as ListIcon, FileIcon
} from 'lucide-react';

export default function ManageUploads() {
  const [viewMode, setViewMode] = useState('list');
  const [uploads, setUploads] = useState([]);

  const togglePublish = (id) => {
    setUploads(uploads.map(u => {
      if (u.id === id) {
        return { ...u, published: !u.published };
      }
      return u;
    }));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this uploaded marksheet?')) {
      setUploads(uploads.filter(u => u.id !== id));
    }
  };

  const handleAction = (action) => {
    alert(`${action} action triggered!`);
  };

  return (
    <div className="min-h-screen bg-[#f4f6f9] font-sans pb-10">
      
      {/* Header */}
      <div className="bg-white p-6 border-b border-slate-200">
        <h1 className="text-2xl font-bold text-slate-800">Manage Uploaded Marksheets</h1>
      </div>

      <div className="p-6 max-w-[1400px] mx-auto space-y-6">
        
        {/* Filters */}
        <div className="bg-white border border-slate-200 rounded-none shadow-sm p-5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600">Class</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#5e35b1] bg-white">
                <option>All Classes</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600">Section</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#5e35b1] bg-white">
                <option>All Sections</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600">Exam</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#5e35b1] bg-white">
                <option>All Exams</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600">Status</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#5e35b1] bg-white">
                <option>All Statuses</option>
              </select>
            </div>
          </div>
          <button 
            onClick={() => handleAction('Reset Filters')}
            className="px-4 py-1.5 border border-slate-300 bg-white hover:bg-slate-50 text-slate-600 font-medium text-sm rounded-none flex items-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset filters
          </button>
        </div>

        {/* Main Table Container */}
        <div className="bg-white border border-slate-200 rounded-none shadow-sm overflow-hidden">
          
          <div className="px-4 py-3 border-b border-slate-200 flex justify-between items-center bg-white">
            <h2 className="text-sm font-bold text-[#5e35b1] flex items-center gap-2">
              <FileText className="w-4 h-4" /> Uploaded Marksheets
            </h2>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setViewMode('list')} 
                className={`p-1.5 rounded-none cursor-pointer border ${viewMode === 'list' ? 'bg-[#5e35b1]/10 border-[#5e35b1] text-[#5e35b1]' : 'border-slate-300 text-slate-500 hover:bg-slate-50'}`}
              >
                <ListIcon className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('grid')} 
                className={`p-1.5 rounded-none cursor-pointer border ${viewMode === 'grid' ? 'bg-[#5e35b1]/10 border-[#5e35b1] text-[#5e35b1]' : 'border-slate-300 text-slate-500 hover:bg-slate-50'}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-4 flex flex-wrap justify-between items-center gap-4 bg-white border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 border border-slate-300 rounded-none px-2 py-1 bg-white">
                <span className="text-xs text-slate-500">Show</span>
                <select className="text-xs outline-none bg-transparent">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
              </div>
              
              <div className="flex gap-1">
                <button onClick={() => handleAction('Copy')} className="px-3 py-1 bg-white border border-slate-300 rounded-none text-xs text-slate-600 hover:bg-slate-50 cursor-pointer flex items-center justify-center" title="Copy"><Copy className="w-3.5 h-3.5" /></button>
                <button onClick={() => handleAction('CSV')} className="px-3 py-1 bg-white border border-slate-300 rounded-none text-xs text-slate-600 hover:bg-slate-50 cursor-pointer font-medium">CSV</button>
                <button onClick={() => handleAction('Excel')} className="px-3 py-1 bg-white border border-slate-300 rounded-none text-xs text-slate-600 hover:bg-slate-50 cursor-pointer font-medium">Excel</button>
                <button onClick={() => handleAction('PDF')} className="px-3 py-1 bg-white border border-slate-300 rounded-none text-xs text-slate-600 hover:bg-slate-50 cursor-pointer font-medium">PDF</button>
                <button onClick={() => handleAction('Print')} className="px-3 py-1 bg-white border border-slate-300 rounded-none text-xs text-slate-600 hover:bg-slate-50 cursor-pointer flex items-center justify-center" title="Print"><Printer className="w-3.5 h-3.5" /></button>
                <button onClick={() => handleAction('Columns')} className="px-3 py-1 bg-white border border-slate-300 rounded-none text-xs text-slate-600 hover:bg-slate-50 cursor-pointer flex items-center gap-1 font-medium"><Columns className="w-3.5 h-3.5" /> Columns <span className="text-[10px]">▼</span></button>
              </div>
            </div>
            
            <div className="w-full md:w-auto">
              <input 
                type="text" 
                placeholder="Search student, title or exa..." 
                className="w-full md:w-64 px-3 py-1.5 border border-slate-300 rounded-none text-sm focus:outline-none focus:border-[#5e35b1]"
              />
            </div>
          </div>

          {viewMode === 'list' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f8f9fc] text-[#5e35b1] text-xs font-bold border-b border-slate-200 uppercase">
                    <th className="py-3 px-4 border-r border-slate-200 text-center w-12">#</th>
                    <th className="py-3 px-4 border-r border-slate-200 cursor-pointer hover:bg-slate-100">Student <span className="text-[10px] text-slate-400 ml-1">↑↓</span></th>
                    <th className="py-3 px-4 border-r border-slate-200 cursor-pointer hover:bg-slate-100">Class <span className="text-[10px] text-slate-400 ml-1">↑↓</span></th>
                    <th className="py-3 px-4 border-r border-slate-200 cursor-pointer hover:bg-slate-100">Section <span className="text-[10px] text-slate-400 ml-1">↑↓</span></th>
                    <th className="py-3 px-4 border-r border-slate-200 cursor-pointer hover:bg-slate-100">Title <span className="text-[10px] text-slate-400 ml-1">↑↓</span></th>
                    <th className="py-3 px-4 border-r border-slate-200 cursor-pointer hover:bg-slate-100">Exam <span className="text-[10px] text-slate-400 ml-1">↑↓</span></th>
                    <th className="py-3 px-4 border-r border-slate-200 cursor-pointer hover:bg-slate-100">Status <span className="text-[10px] text-slate-400 ml-1">↑↓</span></th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {uploads.map((upload, idx) => (
                    <tr key={upload.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors bg-white">
                      <td className="py-3 px-4 text-center border-r border-slate-200 text-slate-500">{idx + 1}</td>
                      <td className="py-3 px-4 border-r border-slate-200">
                        <div className="font-bold text-slate-800">{upload.student}</div>
                        <div className="text-xs text-slate-400">{upload.adm}</div>
                      </td>
                      <td className="py-3 px-4 border-r border-slate-200 text-slate-700">{upload.class}</td>
                      <td className="py-3 px-4 border-r border-slate-200 text-slate-700">{upload.section}</td>
                      <td className="py-3 px-4 border-r border-slate-200 text-slate-700">{upload.title}</td>
                      <td className="py-3 px-4 border-r border-slate-200 text-slate-700">{upload.exam}</td>
                      <td className="py-3 px-4 border-r border-slate-200">
                        {upload.published ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-none text-xs font-bold bg-green-50 text-green-700 border border-green-200">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-none text-xs font-bold bg-orange-50 text-orange-600 border border-orange-200">
                            <Clock className="w-3.5 h-3.5" /> Not Published
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-center gap-2">
                          <button 
                            onClick={() => handleAction('View')}
                            className="w-8 h-8 flex items-center justify-center rounded-none border border-slate-300 text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer bg-white"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          
                          {upload.published ? (
                            <button 
                              onClick={() => togglePublish(upload.id)}
                              className="px-3 h-8 flex items-center gap-1.5 rounded-none border border-slate-300 text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer bg-white font-bold text-xs"
                            >
                              <X className="w-3.5 h-3.5 text-slate-400" /> Unpublish
                            </button>
                          ) : (
                            <button 
                              onClick={() => togglePublish(upload.id)}
                              className="px-3 h-8 flex items-center gap-1.5 rounded-none bg-[#28a745] hover:bg-[#218838] text-white transition-colors cursor-pointer border-none font-bold text-xs shadow-sm"
                            >
                              <Check className="w-3.5 h-3.5" /> Publish
                            </button>
                          )}

                          <button 
                            onClick={() => handleDelete(upload.id)}
                            className="w-8 h-8 flex items-center justify-center rounded-none border border-red-200 text-red-500 hover:bg-red-50 transition-colors cursor-pointer bg-white"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {uploads.length === 0 && (
                     <tr>
                       <td colSpan="8" className="py-6 text-center text-slate-500 italic">No marksheets found.</td>
                     </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {uploads.map((upload) => (
                <div key={upload.id} className="border border-slate-200 rounded-none p-4 bg-white shadow-sm hover:shadow-md transition-shadow relative">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="font-bold text-slate-800 text-lg">{upload.student}</div>
                      <div className="text-xs text-slate-400">{upload.adm}</div>
                    </div>
                    {upload.published ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-none text-[10px] font-bold bg-green-50 text-green-700 border border-green-200">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-none text-[10px] font-bold bg-orange-50 text-orange-600 border border-orange-200">
                        <Clock className="w-3 h-3 mr-1" /> Unpub.
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm mb-4 bg-slate-50 p-2 rounded-none border border-slate-100">
                    <div><span className="text-xs text-slate-400 block">Class</span><span className="font-medium text-slate-700">{upload.class} {upload.section}</span></div>
                    <div><span className="text-xs text-slate-400 block">Exam</span><span className="font-medium text-slate-700 truncate block">{upload.exam}</span></div>
                    <div className="col-span-2"><span className="text-xs text-slate-400 block">Title</span><span className="font-medium text-slate-700 truncate block">{upload.title}</span></div>
                  </div>
                  
                  <div className="flex justify-end gap-2 border-t border-slate-100 pt-3 mt-2">
                    <button 
                      onClick={() => handleAction('View')}
                      className="w-8 h-8 flex items-center justify-center rounded-none border border-slate-300 text-slate-500 hover:bg-slate-100 bg-white cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    
                    {upload.published ? (
                      <button 
                        onClick={() => togglePublish(upload.id)}
                        className="px-3 h-8 flex items-center gap-1.5 rounded-none border border-slate-300 text-slate-600 hover:bg-slate-100 bg-white font-bold text-xs cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5 text-slate-400" /> Unpublish
                      </button>
                    ) : (
                      <button 
                        onClick={() => togglePublish(upload.id)}
                        className="px-3 h-8 flex items-center gap-1.5 rounded-none bg-[#28a745] hover:bg-[#218838] text-white font-bold text-xs border-none cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" /> Publish
                      </button>
                    )}

                    <button 
                      onClick={() => handleDelete(upload.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-none border border-red-200 text-red-500 hover:bg-red-50 bg-white cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="px-4 py-3 border-t border-slate-200 text-xs text-slate-500 bg-white flex justify-between items-center">
            Showing 1-{uploads.length} of {uploads.length}
            <div className="flex gap-1">
              <button className="w-6 h-6 flex items-center justify-center rounded-none border border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed">{'<'}</button>
              <button className="w-6 h-6 flex items-center justify-center rounded-none bg-[#5e35b1] text-white font-bold border-none">1</button>
              <button className="w-6 h-6 flex items-center justify-center rounded-none border border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed">{'>'}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
