import React, { useState, useEffect } from 'react';
import AcademicsTabs from '../../components/academics/AcademicsTabs';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Book, Layers, LayoutGrid, Link2, Users, 
  Clock, Calendar, Briefcase, Plus, List, Grid, Search, 
  FileText, Download, Printer, Edit, Trash2, DownloadCloud
} from 'lucide-react';
import { academicService } from '../../api/academicService';

const AcademicSubjects = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectsList, setSubjectsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchSubjects(); }, []);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const res = await academicService.getSubjects();
      const data = (res.data || []).map((s, idx) => ({
        id: s._id || idx + 1,
        name: s.subjectName || s.name || 'N/A',
        code: s.subjectCode || s.code || '-',
        type: s.type || 'compulsory',
        group: s.group || '-',
        available: s.availableFor || 'All'
      }));
      setSubjectsList(data);
    } catch (err) {
      console.error(err);
      setSubjectsList([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredSubjects = subjectsList.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopy = () => {
    const text = filteredSubjects.map(s => `${s.id}\t${s.name}\t${s.code}\t${s.type}\t${s.available}`).join('\n');
    navigator.clipboard.writeText(`ID\tNAME\tSUBJECT CODE\tTYPE\tAVAILABLE FOR\n${text}`);
    alert('Copied to clipboard!');
  };

  const handleExportCSV = (isExcel = false) => {
    const header = "ID,NAME,SUBJECT CODE,TYPE,AVAILABLE FOR\n";
    const csvContent = filteredSubjects.map(s => `"${s.id}","${s.name}","${s.code}","${s.type}","${s.available}"`).join('\n');
    const blob = new Blob([header + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `subjects.${isExcel ? 'xls' : 'csv'}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = (id) => {
    if(window.confirm("Delete this subject?")) {
      setSubjectsList(prev => prev.filter(s => s.id !== id));
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-y-auto">
      <div className="px-8 pt-6 pb-2">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a2e]">Academic Management</h1>
            <p className="text-[13px] text-gray-500 mt-1">Configure and manage sessions, classes, sections, subjects, and timetables.</p>
          </div>
          <button onClick={() => navigate('/academics/subjects/add')} className="bg-[#5F52FF] text-white px-4 py-2 rounded-none text-[13px] font-bold hover:bg-[#4E41E6] shadow-sm flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add New Subjects
          </button>
        </div>
        <AcademicsTabs />
      </div>

      <div className="px-8 py-4 flex flex-col flex-1 min-h-0">
        <div className="flex justify-end gap-3 mb-4">
          <button className="border border-gray-300 bg-white text-gray-700 px-3 py-1.5 rounded-none text-[12px] font-bold hover:bg-gray-50 shadow-sm flex items-center gap-2">
            <DownloadCloud className="w-3.5 h-3.5" /> Bulk Import
          </button>
          <button onClick={() => handleExportCSV(false)} className="border border-gray-300 bg-white text-gray-700 px-3 py-1.5 rounded-none text-[12px] font-bold hover:bg-gray-50 shadow-sm flex items-center gap-2">
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
        </div>

        <div className="bg-white rounded-none shadow-sm border border-gray-200 flex flex-col flex-1 min-h-0">
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[15px] font-bold text-[#1a1a2e] flex items-center gap-2">
                <Book className="w-4 h-4 text-[#5F52FF]" /> All Subjects
              </h2>
              <div className="flex border border-gray-300 rounded-none overflow-hidden shadow-sm">
                <button onClick={() => setViewMode('list')} className={`px-3 py-1.5 flex items-center justify-center transition-colors ${viewMode === 'list' ? 'bg-[#EEEDFF] text-[#5F52FF]' : 'bg-white text-gray-500 hover:bg-gray-50'}`}><List className="w-4 h-4" /></button>
                <button onClick={() => setViewMode('grid')} className={`px-3 py-1.5 flex items-center justify-center border-l border-gray-300 transition-colors ${viewMode === 'grid' ? 'bg-[#EEEDFF] text-[#5F52FF]' : 'bg-white text-gray-500 hover:bg-gray-50'}`}><Grid className="w-4 h-4" /></button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Show</span>
                  <select className="border border-gray-300 rounded-none px-2 py-1 text-sm focus:outline-none focus:border-[#5F52FF]"><option>10</option></select>
                </div>
                <div className="h-6 w-px bg-gray-300 mx-1"></div>
                <button onClick={handleCopy} className="p-1.5 border border-gray-300 rounded-none hover:bg-gray-50 text-gray-600"><FileText className="w-4 h-4" /></button>
                <button onClick={() => handleExportCSV(false)} className="px-3 py-1.5 border border-gray-300 rounded-none hover:bg-gray-50 text-gray-600 text-xs font-semibold">CSV</button>
                <button onClick={() => handleExportCSV(true)} className="px-3 py-1.5 border border-gray-300 rounded-none hover:bg-gray-50 text-gray-600 text-xs font-semibold">Excel</button>
                <button onClick={() => window.print()} className="px-3 py-1.5 border border-gray-300 rounded-none hover:bg-gray-50 text-gray-600 text-xs font-semibold">PDF</button>
                <button onClick={() => window.print()} className="p-1.5 border border-gray-300 rounded-none hover:bg-gray-50 text-gray-600"><Printer className="w-4 h-4" /></button>
                <div className="h-6 w-px bg-gray-300 mx-1"></div>
                <button className="px-3 py-1.5 border border-gray-300 rounded-none hover:bg-gray-50 text-gray-600 text-xs font-semibold flex items-center gap-1.5"><LayoutGrid className="w-3.5 h-3.5" /> Columns</button>
              </div>

              <div className="relative">
                <input type="text" placeholder="Search Subjects..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="border border-gray-300 rounded-none pl-3 pr-8 py-1.5 text-sm w-64 focus:outline-none focus:border-[#5F52FF]" />
                <Search className="w-4 h-4 text-gray-400 absolute right-2.5 top-2" />
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-auto bg-white">
            {viewMode === 'list' ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F8F7FF] border-b border-gray-200 text-[10px] font-bold text-[#5F52FF] uppercase tracking-wider">
                    <th className="px-5 py-3 border-r border-gray-200 w-16 text-center">ID</th>
                    <th className="px-5 py-3 border-r border-gray-200">NAME</th>
                    <th className="px-5 py-3 border-r border-gray-200">SUBJECT CODE</th>
                    <th className="px-5 py-3 border-r border-gray-200">TYPE</th>
                    <th className="px-5 py-3 border-r border-gray-200">GROUP</th>
                    <th className="px-5 py-3 border-r border-gray-200">AVAILABLE FOR</th>
                    <th className="px-5 py-3 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="text-[13px] text-gray-700">
                  {loading ? (
                    <tr><td colSpan="7" className="px-5 py-8 text-center text-gray-500 font-semibold">Loading subjects from database...</td></tr>
                  ) : filteredSubjects.length === 0 ? (
                    <tr><td colSpan="7" className="px-5 py-8 text-center text-gray-400">No subjects found.</td></tr>
                  ) : filteredSubjects.map((s, idx) => (
                    <tr key={s.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3 border-r border-gray-100 text-center text-[#5F52FF] font-bold">{idx + 1}</td>
                      <td className="px-5 py-3 border-r border-gray-100 font-bold text-gray-800">{s.name}</td>
                      <td className="px-5 py-3 border-r border-gray-100 font-bold text-gray-600">{s.code}</td>
                      <td className="px-5 py-3 border-r border-gray-100 font-bold"><span className="bg-green-500 text-white px-2 py-0.5 rounded-none text-[10px] uppercase shadow-sm">{s.type}</span></td>
                      <td className="px-5 py-3 border-r border-gray-100 font-bold text-gray-400">{s.group}</td>
                      <td className="px-5 py-3 border-r border-gray-100 font-bold"><span className="bg-[#00a8ff] text-white px-2 py-0.5 rounded-none text-[10px] shadow-sm">{s.available}</span></td>
                      <td className="px-5 py-3 text-right">
                        <div className="flex justify-end gap-1.5">
                          <button onClick={() => alert(`Editing subject: ${s.name}`)} className="bg-[#00b894] text-white px-2 py-1 rounded-none text-[11px] font-bold flex items-center gap-1 hover:bg-[#00a884] shadow-sm">Edit</button>
                          <button onClick={() => handleDelete(s.id)} className="bg-[#ff4757] text-white px-2 py-1 rounded-none text-[11px] font-bold flex items-center gap-1 hover:bg-[#ff3747] shadow-sm">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {loading ? (
                  <div className="col-span-full py-8 text-center text-gray-500 font-semibold">Loading subjects from database...</div>
                ) : filteredSubjects.map((s, idx) => (
                  <div key={s.id} className="border border-gray-200 rounded-none p-5 hover:shadow-md transition-shadow relative">
                    <span className="absolute top-4 right-4 bg-[#F8F7FF] text-[#5F52FF] px-2 py-0.5 rounded-none text-[10px] font-bold">ID: {idx + 1}</span>
                    <h3 className="font-bold text-[#1a1a2e] text-lg mb-1">{s.name}</h3>
                    <p className="text-gray-500 text-sm font-semibold mb-4">{s.code}</p>
                    <div className="mb-4 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-400 font-semibold">Type</span>
                        <span className="bg-green-500 text-white px-2 py-0.5 rounded-none text-[9px] uppercase shadow-sm">{s.type}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-400 font-semibold">Available</span>
                        <span className="bg-[#00a8ff] text-white px-2 py-0.5 rounded-none text-[9px] shadow-sm">{s.available}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                      <button onClick={() => alert(`Editing subject: ${s.name}`)} className="flex-1 bg-[#00b894] text-white px-2 py-1.5 rounded-none text-[11px] font-bold flex justify-center items-center gap-1 hover:bg-[#00a884] shadow-sm">Edit</button>
                      <button onClick={() => handleDelete(s.id)} className="flex-1 bg-[#ff4757] text-white px-2 py-1.5 rounded-none text-[11px] font-bold flex justify-center items-center gap-1 hover:bg-[#ff3747] shadow-sm">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-gray-200 flex justify-between items-center bg-gray-50/50">
            <div className="text-[13px] text-gray-500 font-medium">Showing {filteredSubjects.length} records</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AcademicSubjects;
