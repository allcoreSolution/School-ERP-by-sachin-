import React, { useState } from 'react';
import AcademicsTabs from '../../components/academics/AcademicsTabs';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Book, Layers, LayoutGrid, Link2, Users, 
  Clock, Calendar, Briefcase, Plus, List, Grid, Search, 
  FileText, Download, Printer, Edit, Trash2, ArrowUpDown, DownloadCloud
} from 'lucide-react';
import { academicService } from '../../api/academicService';

const AcademicClasses = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');

  const subNav = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/academics/dashboard' },
    { name: 'Guide', icon: Book, path: '#' },
    { name: 'Sessions', icon: Layers, path: '/academics/sessions' },
    { name: 'Classes', icon: LayoutGrid, path: '/academics/classes', active: true },
    { name: 'Sections', icon: LayoutDashboard, path: '/academics/sections' },
    { name: 'Subjects', icon: Book, path: '/academics/subjects' },
    { name: 'Assign Subjects', icon: Link2, path: '/academics/assign-subjects' },
    { name: 'Assign Electives', icon: Link2, path: '/academics/assign-electives' },
    { name: 'Assign Teacher', icon: Users, path: '/academics/assign-class-teacher' },
    { name: 'Manage Periods', icon: Clock, path: '/academics/manage-periods' },
  ];

  const [classesList, setClassesList] = useState([]);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        const res = await academicService.getClasses();
        if (res.data) {
          const mappedArray = res.data.map((c, index) => ({
            id: c._id || index + 1,
            name: c.className,
            coordinator: c.classTeacher ? (c.classTeacher.firstName + ' ' + (c.classTeacher.lastName || '')).trim() : '-',
            enrolled: 0 // Mock for now
          }));
          setClassesList(mappedArray);
        }
      } catch (error) {
        console.error("Failed to fetch classes", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  const filteredClasses = classesList.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopy = () => {
    const text = filteredClasses.map(c => `${c.id}\t${c.name}\t${c.coordinator}\t${c.enrolled}`).join('\n');
    navigator.clipboard.writeText(`ID\tNAME\tCOORDINATOR\tSTUDENTS ENROLLED\n${text}`);
    alert('Copied to clipboard!');
  };

  const handleExportCSV = (isExcel = false) => {
    const header = "ID,NAME,COORDINATOR,STUDENTS ENROLLED\n";
    const csvContent = filteredClasses.map(c => `"${c.id}","${c.name}","${c.coordinator}","${c.enrolled}"`).join('\n');
    const blob = new Blob([header + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `classes.${isExcel ? 'xls' : 'csv'}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this class?")) {
      setClassesList(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="px-8 pt-6 pb-2">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a2e]">Academic Management</h1>
            <p className="text-[13px] text-gray-500 mt-1">Configure and manage sessions, classes, sections, subjects, and timetables.</p>
          </div>
          <button 
            onClick={() => navigate('/academics/classes/add')}
            className="bg-[#5F52FF] text-white px-4 py-2 rounded-none text-[13px] font-bold hover:bg-[#4E41E6] shadow-sm flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add New Classes
          </button>
        </div>
        
        {/* Tabs */}
        <AcademicsTabs />
      </div>

      <div className="px-8 py-4 flex flex-col flex-1 min-h-0">
        
        {/* Top Action Row */}
        <div className="flex justify-end gap-3 mb-4">
          <button className="border border-gray-300 bg-white text-gray-700 px-3 py-1.5 rounded-none text-[12px] font-bold hover:bg-gray-50 shadow-sm flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5" /> Reorder
          </button>
          <button className="border border-gray-300 bg-white text-gray-700 px-3 py-1.5 rounded-none text-[12px] font-bold hover:bg-gray-50 shadow-sm flex items-center gap-2">
            <DownloadCloud className="w-3.5 h-3.5" /> Bulk Import
          </button>
          <button onClick={() => handleExportCSV(false)} className="border border-gray-300 bg-white text-gray-700 px-3 py-1.5 rounded-none text-[12px] font-bold hover:bg-gray-50 shadow-sm flex items-center gap-2">
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-none shadow-sm border border-gray-200 flex flex-col flex-1 min-h-0">
          
          {/* Card Header & Toolbar */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[15px] font-bold text-[#1a1a2e] flex items-center gap-2">
                <LayoutGrid className="w-4 h-4 text-[#5F52FF]" /> All Classes
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
                  placeholder="Search Classes..." 
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
                    <th className="px-5 py-3 border-r border-gray-200 w-16 text-center">ID</th>
                    <th className="px-5 py-3 border-r border-gray-200">NAME</th>
                    <th className="px-5 py-3 border-r border-gray-200">COORDINATOR</th>
                    <th className="px-5 py-3 border-r border-gray-200">STUDENTS ENROLLED</th>
                    <th className="px-5 py-3 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="text-[13px] text-gray-700">
                  {loading ? (
                    <tr><td colSpan="5" className="px-5 py-8 text-center text-gray-500 font-medium">Loading classes...</td></tr>
                  ) : filteredClasses.length === 0 ? (
                    <tr><td colSpan="5" className="px-5 py-8 text-center text-gray-500 font-medium">No classes found.</td></tr>
                  ) : filteredClasses.map((c) => (
                    <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3 border-r border-gray-100 text-center text-[#5F52FF] font-bold">{c.id}</td>
                      <td className="px-5 py-3 border-r border-gray-100 font-bold text-gray-800">{c.name}</td>
                      <td className="px-5 py-3 border-r border-gray-100 font-bold">
                        {c.coordinator !== '-' ? (
                          <span className="bg-[#008080] text-white px-2 py-0.5 rounded-none text-[10px] uppercase">{c.coordinator}</span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-5 py-3 border-r border-gray-100 font-semibold">{c.enrolled}</td>
                      <td className="px-5 py-3 text-right">
                        <div className="flex justify-end gap-1.5">
                          <button onClick={() => alert(`Editing class: ${c.name}`)} className="bg-[#00b894] text-white px-2 py-1 rounded-none text-[11px] font-bold flex items-center gap-1 hover:bg-[#00a884]">
                            Edit
                          </button>
                          <button onClick={() => handleDelete(c.id)} className="bg-[#ff4757] text-white px-2 py-1 rounded-none text-[11px] font-bold flex items-center gap-1 hover:bg-[#ff3747]">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {loading ? (
                  <div className="col-span-full py-8 text-center text-gray-500 font-medium">Loading classes...</div>
                ) : filteredClasses.length === 0 ? (
                  <div className="col-span-full py-8 text-center text-gray-500 font-medium">No classes found.</div>
                ) : filteredClasses.map(c => (
                  <div key={c.id} className="border border-gray-200 rounded-none p-5 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-[#1a1a2e] text-lg">{c.name}</h3>
                      <span className="bg-[#F8F7FF] text-[#5F52FF] px-2 py-0.5 rounded-none text-[10px] font-bold">ID: {c.id}</span>
                    </div>
                    <div className="mb-4">
                      {c.coordinator !== '-' ? (
                        <span className="bg-[#008080] text-white px-2 py-0.5 rounded-none text-[10px] uppercase font-bold">{c.coordinator}</span>
                      ) : (
                        <span className="text-gray-400 text-xs italic">No Coordinator</span>
                      )}
                    </div>
                    <div className="bg-gray-50 rounded-none p-3 flex justify-between items-center mb-4">
                      <span className="text-gray-500 text-xs font-semibold">Students Enrolled</span>
                      <span className="font-bold">{c.enrolled}</span>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => alert(`Editing class: ${c.name}`)} className="flex-1 bg-[#00b894] text-white px-2 py-1.5 rounded-none text-[11px] font-bold flex justify-center items-center gap-1 hover:bg-[#00a884]">
                         Edit
                      </button>
                      <button onClick={() => handleDelete(c.id)} className="flex-1 bg-[#ff4757] text-white px-2 py-1.5 rounded-none text-[11px] font-bold flex justify-center items-center gap-1 hover:bg-[#ff3747]">
                         Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Footer Pagination */}
          <div className="p-4 border-t border-gray-200 flex justify-between items-center bg-gray-50/50">
            <div className="text-[13px] text-gray-500 font-medium">
              Showing 1-{filteredClasses.length} of {classesList.length}
            </div>
            <div className="flex items-center gap-1">
              <button className="px-2 py-1 border border-gray-300 rounded-none text-gray-400 bg-white">{'<'}</button>
              <button className="px-3 py-1 border border-[#5F52FF] bg-[#5F52FF] text-white rounded-none font-bold text-[13px]">1</button>
              <button className="px-3 py-1 border border-gray-300 rounded-none text-gray-600 bg-white hover:bg-gray-50 font-bold text-[13px]">2</button>
              <button className="px-3 py-1 border border-gray-300 rounded-none text-gray-600 bg-white hover:bg-gray-50 font-bold text-[13px]">3</button>
              <button className="px-2 py-1 border border-gray-300 rounded-none text-gray-400 bg-white">{'>'}</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AcademicClasses;
