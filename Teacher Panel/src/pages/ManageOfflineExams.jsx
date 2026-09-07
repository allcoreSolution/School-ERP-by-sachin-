import React, { useState } from 'react';
import { 
  Building2, Printer, BarChart2, Plus, List, Grid, 
  Copy, FileText, Download, Columns, Search, ChevronLeft, ChevronRight,
  Eye, Edit, Trash2, X
} from 'lucide-react';

const initialExams = [
  { id: 1, name: 'Half Yearly Examination', session: '24-25', appliesTo: 'Class VI, VII, VIII', startDate: '15 Oct 2024', endDate: '25 Oct 2024' },
  { id: 2, name: 'Annual Examination', session: '24-25', appliesTo: 'Class IX, X', startDate: '01 Mar 2025', endDate: '15 Mar 2025' },
];

const ManageOfflineExams = () => {
  const [exams, setExams] = useState(initialExams);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // New Exam Form State
  const [newExam, setNewExam] = useState({ name: '', session: '24-25', appliesTo: '', startDate: '', endDate: '' });

  const filteredExams = exams.filter(exam => 
    exam.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    exam.appliesTo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddExam = (e) => {
    e.preventDefault();
    if (!newExam.name || !newExam.startDate || !newExam.endDate) {
      alert("Please fill required fields (Name, Start Date, End Date)");
      return;
    }
    const exam = {
      id: Date.now(),
      ...newExam
    };
    setExams([exam, ...exams]);
    setShowAddModal(false);
    setNewExam({ name: '', session: '24-25', appliesTo: '', startDate: '', endDate: '' });
  };

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this exam?')) {
      setExams(exams.filter(e => e.id !== id));
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#f4f7f6] theme-app-bg text-sm">
      
      {/* Header section matching the screenshot */}
      <div className="bg-white px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Manage Exams</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded shadow-sm hover:bg-gray-50 font-medium">
            <Building2 className="w-4 h-4" /> View all sessions
          </button>
          <button className="flex items-center gap-2 bg-[#ffb822] hover:bg-[#eaa411] text-white px-4 py-2 rounded shadow-sm font-medium">
            <Printer className="w-4 h-4" /> Print Admit Cards
          </button>
          <button className="flex items-center gap-2 bg-[#1dc9b7] hover:bg-[#19b1a1] text-white px-4 py-2 rounded shadow-sm font-medium">
            <BarChart2 className="w-4 h-4" /> Result Analytics
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-[#5d78ff] hover:bg-[#4b65e6] text-white px-4 py-2 rounded shadow-sm font-medium"
          >
            <Plus className="w-4 h-4" /> Add New Exam
          </button>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="p-6">
        <div className="bg-white rounded shadow-sm border border-gray-200">
          
          {/* Card Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-white rounded-t">
            <h2 className="font-semibold text-gray-800 flex items-center gap-2 text-base">
              <List className="w-4 h-4 text-purple-600" /> Exams — this session
            </h2>
            <div className="flex bg-gray-100 rounded p-0.5">
              <button 
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <List className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card Toolbar */}
          <div className="px-6 py-3 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4 bg-white">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <span>Show</span>
                <select className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-400">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1.5 border border-gray-300 rounded text-gray-600 hover:bg-gray-50" title="Copy"><Copy className="w-4 h-4"/></button>
                <button className="px-3 py-1.5 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 font-medium">CSV</button>
                <button className="px-3 py-1.5 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 font-medium">Excel</button>
                <button className="px-3 py-1.5 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 font-medium">PDF</button>
                <button className="p-1.5 border border-gray-300 rounded text-gray-600 hover:bg-gray-50" title="Print"><Printer className="w-4 h-4"/></button>
                <button className="px-3 py-1.5 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 font-medium flex items-center gap-1 ml-2">
                  <Columns className="w-4 h-4"/> Columns
                </button>
              </div>
            </div>
            
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-3 pr-8 py-1.5 border border-gray-300 rounded w-64 focus:outline-none focus:border-blue-400 text-sm" 
              />
              <Search className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {viewMode === 'list' ? (
              <table className="w-full text-left border-b border-gray-200">
                <thead>
                  <tr className="bg-[#f8f9fe]">
                    <th className="px-6 py-3 text-xs font-bold text-[#5d78ff] uppercase tracking-wider border-b border-gray-200 w-[20%]">Exam Name ↕</th>
                    <th className="px-6 py-3 text-xs font-bold text-[#5d78ff] uppercase tracking-wider border-b border-gray-200 border-l border-white w-[15%]">Session</th>
                    <th className="px-6 py-3 text-xs font-bold text-[#5d78ff] uppercase tracking-wider border-b border-gray-200 border-l border-white w-[25%]">Applies To ↕</th>
                    <th className="px-6 py-3 text-xs font-bold text-[#5d78ff] uppercase tracking-wider border-b border-gray-200 border-l border-white w-[15%]">Start Date ↕</th>
                    <th className="px-6 py-3 text-xs font-bold text-[#5d78ff] uppercase tracking-wider border-b border-gray-200 border-l border-white w-[15%]">End Date ↕</th>
                    <th className="px-6 py-3 text-xs font-bold text-[#5d78ff] uppercase tracking-wider border-b border-gray-200 border-l border-white w-[10%]">Actions ↕</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExams.length > 0 ? (
                    filteredExams.map(exam => (
                      <tr key={exam.id} className="hover:bg-gray-50 border-b border-gray-100 last:border-0">
                        <td className="px-6 py-4 text-gray-800 font-medium">{exam.name}</td>
                        <td className="px-6 py-4 text-gray-600">{exam.session}</td>
                        <td className="px-6 py-4 text-gray-600">{exam.appliesTo}</td>
                        <td className="px-6 py-4 text-gray-600">{exam.startDate}</td>
                        <td className="px-6 py-4 text-gray-600">{exam.endDate}</td>
                        <td className="px-6 py-4 flex items-center gap-2">
                          <button className="text-gray-400 hover:text-blue-500 transition-colors" title="View"><Eye className="w-4 h-4" /></button>
                          <button className="text-gray-400 hover:text-green-500 transition-colors" title="Edit"><Edit className="w-4 h-4" /></button>
                          <button onClick={() => handleDelete(exam.id)} className="text-gray-400 hover:text-red-500 transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-500 bg-white">
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            ) : (
              /* Grid View matching */
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-50">
                {filteredExams.length > 0 ? (
                  filteredExams.map(exam => (
                    <div key={exam.id} className="bg-white p-5 border border-gray-200 rounded shadow-sm">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-[#5d78ff] text-lg">{exam.name}</h3>
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 text-xs rounded">{exam.session}</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4"><span className="font-semibold">Applies To:</span> {exam.appliesTo}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                        <div className="bg-gray-50 p-2 rounded border border-gray-100">
                          <p className="text-gray-500 text-xs mb-1">Start Date</p>
                          <p className="font-medium text-gray-800">{exam.startDate}</p>
                        </div>
                        <div className="bg-gray-50 p-2 rounded border border-gray-100">
                          <p className="text-gray-500 text-xs mb-1">End Date</p>
                          <p className="font-medium text-gray-800">{exam.endDate}</p>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                        <button className="p-2 text-gray-500 hover:bg-blue-50 hover:text-blue-600 rounded"><Eye className="w-4 h-4" /></button>
                        <button className="p-2 text-gray-500 hover:bg-green-50 hover:text-green-600 rounded"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(exam.id)} className="p-2 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center text-gray-500 bg-white border border-gray-200 rounded">
                    No data available
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Pagination */}
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200 bg-white rounded-b">
            <span className="text-gray-500">{filteredExams.length === 0 ? 'No records' : `Showing 1 to ${filteredExams.length} of ${filteredExams.length} records`}</span>
            <div className="flex gap-1">
              <button className="px-2 py-1 border border-gray-200 text-gray-400 rounded hover:bg-gray-50 disabled:opacity-50"><ChevronLeft className="w-4 h-4"/></button>
              <button className="px-2 py-1 border border-gray-200 text-gray-400 rounded hover:bg-gray-50 disabled:opacity-50"><ChevronRight className="w-4 h-4"/></button>
            </div>
          </div>

        </div>
      </div>

      {/* ===== Add New Exam Modal ===== */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-800">Add New Exam</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5"/></button>
            </div>
            
            <form onSubmit={handleAddExam} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Exam Name *</label>
                  <input 
                    type="text" 
                    required
                    value={newExam.name}
                    onChange={e => setNewExam({...newExam, name: e.target.value})}
                    placeholder="e.g. Mid Term Examination" 
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Session</label>
                    <select 
                      value={newExam.session}
                      onChange={e => setNewExam({...newExam, session: e.target.value})}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                    >
                      <option value="24-25">2024-2025</option>
                      <option value="25-26">2025-2026</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Applies To</label>
                    <input 
                      type="text" 
                      value={newExam.appliesTo}
                      onChange={e => setNewExam({...newExam, appliesTo: e.target.value})}
                      placeholder="e.g. Class IX, X" 
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                    <input 
                      type="date" 
                      required
                      value={newExam.startDate}
                      onChange={e => setNewExam({...newExam, startDate: e.target.value})}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date *</label>
                    <input 
                      type="date" 
                      required
                      value={newExam.endDate}
                      onChange={e => setNewExam({...newExam, endDate: e.target.value})}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" 
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded text-sm font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-[#5d78ff] text-white rounded text-sm font-medium hover:bg-[#4b65e6]"
                >
                  Save Exam
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ManageOfflineExams;
