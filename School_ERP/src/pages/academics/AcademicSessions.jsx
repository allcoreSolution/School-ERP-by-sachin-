import React, { useState } from 'react';
import AcademicsTabs from '../../components/academics/AcademicsTabs';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Book, Layers, LayoutGrid, Link2, Users, 
  Clock, Calendar, Briefcase, ArrowRight, Plus, GitMerge, 
  List, Grid, Search, FileText, Download, Printer, Edit2, 
  Check, Archive, Trash2
} from 'lucide-react';

const AcademicSessions = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');

  const subNav = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/academics/dashboard' },
    { name: 'Guide', icon: Book, path: '#' },
    { name: 'Sessions', icon: Layers, path: '/academics/sessions', active: true },
    { name: 'Classes', icon: LayoutGrid, path: '/academics/classes' },
    { name: 'Sections', icon: LayoutDashboard, path: '/academics/sections' },
    { name: 'Subjects', icon: Book, path: '/academics/subjects' },
    { name: 'Assign Subjects', icon: Link2, path: '/academics/assign-subjects' },
    { name: 'Assign Electives', icon: Link2, path: '/academics/assign-electives' },
    { name: 'Assign Teacher', icon: Users, path: '/academics/assign-class-teacher' },
    { name: 'More Menu', icon: Clock, path: '#' },
  ];

  const [sessions, setSessions] = useState([
    { id: 1, name: '2026-2027', code: '26-27', start: '01 Apr 2026', end: '31 Mar 2027', students: 282, status: 'Current' },
    { id: 2, name: '2027-2028', code: '27-28', start: '01 Apr 2027', end: '31 Mar 2028', students: 102, status: 'Active' }
  ]);

  const filteredSessions = sessions.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopy = () => {
    const text = filteredSessions.map(s => `${s.name}\t${s.start} - ${s.end}\t${s.students}\t${s.status}`).join('\n');
    navigator.clipboard.writeText(`NAME\tPERIOD\tSTUDENTS\tSTATUS\n${text}`);
    alert('Copied to clipboard!');
  };

  const handleExportCSV = (isExcel = false) => {
    const header = "NAME,PERIOD,STUDENTS,STATUS\n";
    const csvContent = filteredSessions.map(s => `"${s.name}","${s.start} - ${s.end}","${s.students}","${s.status}"`).join('\n');
    const blob = new Blob([header + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `sessions.${isExcel ? 'xls' : 'csv'}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Action Handlers
  const handleSetCurrent = (id) => {
    if(window.confirm("Are you sure you want to set this session as Current?")) {
      setSessions(prev => prev.map(s => {
        if (s.id === id) return { ...s, status: 'Current' };
        if (s.status === 'Current') return { ...s, status: 'Active' };
        return s;
      }));
    }
  };

  const handleArchive = (id) => {
    if(window.confirm("Are you sure you want to archive this session?")) {
      setSessions(prev => prev.map(s => s.id === id ? { ...s, status: 'Archived' } : s));
    }
  };

  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this session? This action cannot be undone.")) {
      setSessions(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleEdit = (session) => {
    // Navigate to Add session page with state (in a real app) or show alert
    alert(`Editing session: ${session.name}`);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="px-8 pt-6 pb-2">
        <h1 className="text-2xl font-bold text-[#1a1a2e]">Academic Management</h1>
        <p className="text-[13px] text-gray-500 mt-1">Configure and manage sessions, classes, sections, subjects, and timetables.</p>
        
        {/* Tabs */}
        <AcademicsTabs />
      </div>

      <div className="px-8 py-4 flex flex-col flex-1 min-h-0">
        
        {/* Actions Row */}
        <div className="flex justify-end gap-3 mb-6">
          <button 
            onClick={() => navigate('/academics/rollover')}
            className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-none text-[13px] font-bold hover:bg-gray-50 shadow-sm flex items-center gap-2"
          >
            <GitMerge className="w-4 h-4 text-gray-500" /> Year-End Rollover
          </button>
          <button 
            onClick={() => navigate('/academics/sessions/add')}
            className="bg-[#5F52FF] text-white px-4 py-2 rounded-none text-[13px] font-bold hover:bg-[#4E41E6] shadow-sm flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add New Session
          </button>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-none shadow-sm border border-gray-200 flex flex-col flex-1 min-h-0">
          
          {/* Card Header & Toolbar */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[15px] font-bold text-[#1a1a2e] flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#5F52FF]" /> All Sessions
              </h2>
              <div className="flex border border-gray-300 rounded-none overflow-hidden shadow-sm">
                <button 
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1.5 flex items-center justify-center transition-colors ${viewMode === 'list' ? 'bg-[#EEEDFF] text-[#5F52FF]' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                >
                  <List className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1.5 flex items-center justify-center border-l border-gray-300 transition-colors ${viewMode === 'grid' ? 'bg-[#EEEDFF] text-[#5F52FF]' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Left Toolbar */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Show</span>
                  <select className="border border-gray-300 rounded-none px-2 py-1 text-sm focus:outline-none focus:border-[#5F52FF]">
                    <option>10</option>
                  </select>
                </div>
                
                <div className="h-6 w-px bg-gray-300 mx-1"></div>
                
                <button onClick={handleCopy} className="p-1.5 border border-gray-300 rounded-none hover:bg-gray-50 text-gray-600">
                  <FileText className="w-4 h-4" />
                </button>
                <button onClick={() => handleExportCSV(false)} className="px-3 py-1.5 border border-gray-300 rounded-none hover:bg-gray-50 text-gray-600 text-xs font-semibold">CSV</button>
                <button onClick={() => handleExportCSV(true)} className="px-3 py-1.5 border border-gray-300 rounded-none hover:bg-gray-50 text-gray-600 text-xs font-semibold">Excel</button>
                <button onClick={() => window.print()} className="px-3 py-1.5 border border-gray-300 rounded-none hover:bg-gray-50 text-gray-600 text-xs font-semibold">PDF</button>
                <button onClick={() => window.print()} className="p-1.5 border border-gray-300 rounded-none hover:bg-gray-50 text-gray-600">
                  <Printer className="w-4 h-4" />
                </button>
                
                <div className="h-6 w-px bg-gray-300 mx-1"></div>

                <button className="px-3 py-1.5 border border-gray-300 rounded-none hover:bg-gray-50 text-gray-600 text-xs font-semibold flex items-center gap-1.5">
                  <LayoutGrid className="w-3.5 h-3.5" /> Columns
                </button>
              </div>

              {/* Right Toolbar */}
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search sessions..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border border-gray-300 rounded-none pl-3 pr-8 py-1.5 text-sm w-64 focus:outline-none focus:border-[#5F52FF]"
                />
                <Search className="w-4 h-4 text-gray-400 absolute right-2.5 top-2" />
              </div>
            </div>
          </div>

          {/* List/Grid View */}
          <div className="flex-1 overflow-auto bg-white">
            {viewMode === 'list' ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F8F7FF] border-b border-gray-200 text-[10px] font-bold text-[#5F52FF] uppercase tracking-wider">
                    <th className="px-5 py-3 border-r border-gray-200 w-16 text-center">#</th>
                    <th className="px-5 py-3 border-r border-gray-200">NAME</th>
                    <th className="px-5 py-3 border-r border-gray-200">PERIOD</th>
                    <th className="px-5 py-3 border-r border-gray-200">STUDENTS ENROLLED</th>
                    <th className="px-5 py-3 border-r border-gray-200 text-center">STATUS</th>
                    <th className="px-5 py-3 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="text-[13px] text-gray-700">
                  {filteredSessions.map((session, i) => (
                    <tr key={session.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4 border-r border-gray-100 text-center text-gray-500">{i + 1}</td>
                      <td className="px-5 py-4 border-r border-gray-100">
                        <span className="font-bold text-[#1a1a2e]">{session.name}</span>
                        <span className="text-gray-400 text-[11px] ml-1">({session.code})</span>
                      </td>
                      <td className="px-5 py-4 border-r border-gray-100 text-gray-500">
                        {session.start} <span className="text-gray-300 mx-1">→</span> {session.end}
                      </td>
                      <td className="px-5 py-4 border-r border-gray-100 font-semibold">{session.students}</td>
                      <td className="px-5 py-4 border-r border-gray-100 text-center">
                        {session.status === 'Current' ? (
                          <span className="bg-green-50 text-green-600 font-bold px-3 py-1 rounded-none text-[11px]">Current</span>
                        ) : session.status === 'Archived' ? (
                          <span className="bg-gray-100 text-gray-600 font-bold px-3 py-1 rounded-none text-[11px]">Archived</span>
                        ) : (
                          <span className="bg-blue-50 text-blue-600 font-bold px-3 py-1 rounded-none text-[11px]">Active</span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => handleEdit(session)} className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-none text-[11px] font-bold text-gray-600 hover:bg-gray-50">
                            <Edit2 className="w-3 h-3" /> Edit
                          </button>
                          {session.status !== 'Current' && (
                            <button onClick={() => handleSetCurrent(session.id)} className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-none text-[11px] font-bold text-gray-600 hover:bg-gray-50">
                              <Check className="w-3 h-3" /> Set Current
                            </button>
                          )}
                          {session.status !== 'Current' && session.status !== 'Archived' && (
                            <button onClick={() => handleArchive(session.id)} className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-none text-[11px] font-bold text-gray-600 hover:bg-gray-50">
                              <Archive className="w-3 h-3" /> Archive
                            </button>
                          )}
                          {session.status !== 'Current' && (
                            <button onClick={() => handleDelete(session.id)} className="flex items-center gap-1.5 px-2 py-1.5 border border-red-200 rounded-none text-[11px] font-bold text-red-500 hover:bg-red-50">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredSessions.map(session => (
                  <div key={session.id} className="border border-gray-200 rounded-none p-5 hover:shadow-md transition-shadow relative">
                    {session.status === 'Current' ? (
                      <span className="absolute top-4 right-4 bg-green-50 text-green-600 font-bold px-2 py-0.5 rounded-none text-[10px]">Current</span>
                    ) : session.status === 'Archived' ? (
                      <span className="absolute top-4 right-4 bg-gray-100 text-gray-600 font-bold px-2 py-0.5 rounded-none text-[10px]">Archived</span>
                    ) : (
                      <span className="absolute top-4 right-4 bg-blue-50 text-blue-600 font-bold px-2 py-0.5 rounded-none text-[10px]">Active</span>
                    )}
                    <h3 className="font-bold text-[#1a1a2e] text-lg">{session.name}</h3>
                    <p className="text-gray-400 text-xs mb-4">{session.start} to {session.end}</p>
                    <div className="bg-gray-50 rounded-none p-3 flex justify-between items-center mb-4">
                      <span className="text-gray-500 text-xs font-semibold">Students Enrolled</span>
                      <span className="font-bold">{session.students}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => handleEdit(session)} className="flex-1 flex justify-center items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-none text-[11px] font-bold text-gray-600 hover:bg-gray-50">
                        <Edit2 className="w-3 h-3" /> Edit
                      </button>
                      {session.status !== 'Current' && (
                        <button onClick={() => handleSetCurrent(session.id)} className="flex-1 flex justify-center items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-none text-[11px] font-bold text-gray-600 hover:bg-gray-50">
                          <Check className="w-3 h-3" /> Set Current
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Footer Pagination */}
          <div className="p-4 border-t border-gray-200 flex justify-between items-center bg-gray-50/50">
            <div className="text-[13px] text-gray-500 font-medium">
              Showing 1-{filteredSessions.length} of {sessions.length}
            </div>
            <div className="flex items-center gap-1">
              <button className="px-2 py-1 border border-gray-300 rounded-none text-gray-400 bg-white">{'<'}</button>
              <button className="px-3 py-1 border border-[#5F52FF] bg-[#5F52FF] text-white rounded-none font-bold text-[13px]">1</button>
              <button className="px-2 py-1 border border-gray-300 rounded-none text-gray-400 bg-white">{'>'}</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AcademicSessions;
