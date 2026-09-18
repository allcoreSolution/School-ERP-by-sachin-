import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Info, Zap, Filter, Search, Grid, List as ListIcon, 
  FileText, File, Printer, LayoutGrid, Download, UserPlus
} from 'lucide-react';
import FinanceTabs from '../../components/finance/FinanceTabs';
import { feeCollectionService } from '../../api/feeCollectionService';

const CollectFees = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('list');
  const [allStudents, setAllStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('-- All Classes --');
  const [selectedSection, setSelectedSection] = useState('-- All Sections --');

  useEffect(() => {
    const fetchDueFees = async () => {
      try {
        setLoading(true);
        const res = await feeCollectionService.searchDueFees();
        const data = (res.data || []).map(s => ({
          adm: s.admissionNo || s._id,
          name: `${s.firstName || ''} ${s.lastName || ''}`.trim(),
          class: s.academicClass?.className || s.class || 'N/A',
          section: s.section || '-',
          due: `₹${(s.totalDue || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
          id: s._id
        }));
        setAllStudents(data);
        setFilteredStudents(data);
      } catch (err) {
        console.error('Failed to fetch due fees:', err);
        setAllStudents([]);
        setFilteredStudents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDueFees();
  }, []);

  const handleFilter = () => {
    let result = allStudents;
    if (selectedClass !== '-- All Classes --') result = result.filter(s => s.class === selectedClass);
    if (selectedSection !== '-- All Sections --') result = result.filter(s => s.section === selectedSection);
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(s => s.name.toLowerCase().includes(q) || s.adm.toLowerCase().includes(q));
    }
    setFilteredStudents(result);
  };

  const handleClear = () => {
    setSearchQuery('');
    setSelectedClass('-- All Classes --');
    setSelectedSection('-- All Sections --');
    setFilteredStudents(allStudents);
  };


  return (
    <div className="p-4 max-w-[1600px] mx-auto bg-gray-50 min-h-screen text-gray-800 pb-20">
      {/* Banner */}
      <div className="bg-[#009b9f] text-white p-2.5 rounded-none text-xs flex items-center gap-2 mb-4">
        <Info className="w-4 h-4 flex-shrink-0" />
        <p>
          <strong>New: academic-session scoping.</strong> Lists and dashboard numbers (students, exams, assessments, homework, notices...) now show the <i>selected academic session</i> only, so totals may look smaller than before — nothing was deleted. Use the session switcher in the top bar to view another year, the "<i>View all sessions</i>" button on lists to see everything, and note that money totals marked "(All Years)" still include every session.
        </p>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-gray-900">Collect Student Fees</h1>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold text-gray-700 bg-white border border-gray-200 rounded-none shadow-sm hover:bg-gray-50">
            <Zap className="w-3.5 h-3.5 text-yellow-500" />
            Rapid Mode (Tally Style)
          </button>
        </div>
      </div>

      <FinanceTabs />

      {/* Filter Section */}
      <div className="bg-white rounded-t-lg border border-gray-200 border-b-0 shadow-sm p-4">
        <h3 className="text-[13px] font-bold text-gray-800 mb-4 flex items-center gap-1.5">
          <Filter className="w-4 h-4 text-indigo-600" /> Filter Students with Due Fees
        </h3>
        
        <div className="flex items-end gap-4">
          <div className="flex-1">
            <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-1.5">Class</label>
            <select 
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full border border-gray-200 rounded-none p-2 text-sm text-gray-700 focus:outline-none focus:border-indigo-500"
            >
              <option>-- All Classes --</option>
              <option>Class I</option>
              <option>Class II</option>
            </select>
          </div>
          
          <div className="flex-1">
            <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-1.5">Section</label>
            <select 
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-full border border-gray-200 rounded-none p-2 text-sm text-gray-700 focus:outline-none focus:border-indigo-500"
            >
              <option>-- All Sections --</option>
              <option>A</option>
              <option>B</option>
            </select>
          </div>

          <div className="flex-[2]">
            <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-1.5">Search by Admission No or Name</label>
            <div className="relative">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type name or admission no..." 
                className="w-full border border-gray-200 rounded-none p-2 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={handleFilter}
              className="px-5 py-2 bg-indigo-500 text-white text-sm font-semibold rounded-none hover:bg-indigo-600"
            >
              Filter
            </button>
            <button 
              onClick={handleClear}
              className="px-5 py-2 bg-white border border-gray-200 text-gray-600 text-sm font-semibold rounded-none hover:bg-gray-50"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-b-lg border border-gray-200 shadow-sm p-4">
        {/* Toolbar */}
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
           <h3 className="text-[13px] font-bold text-gray-800 flex items-center gap-1.5">
             <FileText className="w-4 h-4 text-blue-600" /> Students with Due Fees
           </h3>
           <div className="flex items-center border border-gray-200 rounded-none overflow-hidden bg-gray-50">
             <button 
               onClick={() => setViewMode('list')} 
               className={`p-1.5 ${viewMode === 'list' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-400 hover:text-gray-600'}`}
             >
               <ListIcon className="w-4 h-4" />
             </button>
             <button 
               onClick={() => setViewMode('grid')} 
               className={`p-1.5 ${viewMode === 'grid' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-400 hover:text-gray-600'}`}
             >
               <Grid className="w-4 h-4" />
             </button>
           </div>
        </div>

        <div className="flex justify-between items-center mb-4">
           <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                 Show 
                 <select className="border border-gray-200 rounded-none p-1">
                   <option>10</option>
                   <option>25</option>
                   <option>50</option>
                 </select>
                 entries
              </div>
              <div className="flex gap-1.5">
                <button className="px-2.5 py-1 text-xs border border-gray-200 text-gray-600 rounded-none flex items-center gap-1 hover:bg-gray-50">Copy</button>
                <button className="px-2.5 py-1 text-xs border border-gray-200 text-gray-600 rounded-none flex items-center gap-1 hover:bg-gray-50">CSV</button>
                <button className="px-2.5 py-1 text-xs border border-gray-200 text-gray-600 rounded-none flex items-center gap-1 hover:bg-gray-50">Excel</button>
                <button className="px-2.5 py-1 text-xs border border-gray-200 text-gray-600 rounded-none flex items-center gap-1 hover:bg-gray-50">PDF</button>
                <button className="px-2.5 py-1 text-xs border border-gray-200 text-gray-600 rounded-none flex items-center gap-1 hover:bg-gray-50"><Printer className="w-3 h-3" /></button>
                <button className="px-2.5 py-1 text-xs border border-gray-200 text-gray-600 rounded-none flex items-center gap-1 hover:bg-gray-50"><LayoutGrid className="w-3 h-3" /> Columns</button>
              </div>
           </div>
           
           <div>
             <input type="text" placeholder="Search..." className="border border-gray-200 rounded-none p-1.5 text-xs w-48 focus:outline-none focus:border-indigo-500" />
           </div>
        </div>

        {/* List / Grid Content */}
        {viewMode === 'list' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-indigo-50/50 border-y border-gray-200 text-[10px] text-indigo-800 uppercase tracking-wide">
                  <th className="p-3 font-bold border-r border-gray-100">Admission No <span className="text-gray-400 float-right">↑↓</span></th>
                  <th className="p-3 font-bold border-r border-gray-100">Student Name <span className="text-gray-400 float-right">↑↓</span></th>
                  <th className="p-3 font-bold border-r border-gray-100">Class (Section) <span className="text-gray-400 float-right">↑↓</span></th>
                  <th className="p-3 font-bold border-r border-gray-100">Total Due Amount <span className="text-gray-400 float-right">↑↓</span></th>
                  <th className="p-3 font-bold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
                {loading ? (
                  <tr><td colSpan="5" className="p-6 text-center text-gray-500 font-semibold">Loading students with dues from database...</td></tr>
                ) : filteredStudents.length > 0 ? filteredStudents.map((s, i) => (
                  <tr key={i} className="hover:bg-gray-50/30">
                    <td className="p-3 border-r border-gray-100">{s.adm}</td>
                    <td className="p-3 border-r border-gray-100">{s.name}</td>
                    <td className="p-3 border-r border-gray-100 text-gray-500">{`${s.class} (${s.section})`}</td>
                    <td className="p-3 border-r border-gray-100 font-semibold text-red-600">{s.due}</td>
                    <td className="p-3 text-center">
                      <button 
                        onClick={() => navigate(`/finance/collect/${s.id || s.adm}`)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-semibold px-3 py-1.5 rounded-none flex items-center justify-center gap-1.5 mx-auto"
                      >
                        <UserPlus className="w-3 h-3" /> View & Collect
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="5" className="p-6 text-center text-gray-400 font-medium">No students with due fees found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredStudents.length > 0 ? filteredStudents.map((s, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-none p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 mb-2">{s.name}</h4>
                  
                  <div className="mb-2">
                    <p className="text-[10px] text-gray-500 uppercase font-semibold">Admission No</p>
                    <p className="text-xs text-gray-700">{s.adm}</p>
                  </div>
                  
                  <div className="mb-2">
                    <p className="text-[10px] text-gray-500 uppercase font-semibold">Class (Section)</p>
                    <p className="text-xs text-gray-700">{`${s.class} (${s.section})`}</p>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-[10px] text-gray-500 uppercase font-semibold">Total Due</p>
                    <p className="text-sm font-bold text-gray-800">{s.due}</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => navigate(`/finance/collect/${s.adm.replace(/\s+/g, '')}`)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold py-2 rounded-none flex items-center justify-center gap-1.5"
                >
                  <UserPlus className="w-3 h-3" /> View & Collect
                </button>
              </div>
            )) : (
              <div className="col-span-full p-6 text-center text-gray-400 font-medium border border-dashed border-gray-200 rounded-none">
                No students found with the selected filters.
              </div>
            )}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
          <div>Showing {filteredStudents.length} records</div>
          <div className="flex gap-1">
             <button className="w-6 h-6 flex items-center justify-center border border-gray-200 rounded-none text-gray-400 hover:bg-gray-50">&lt;</button>
             <button className="w-6 h-6 flex items-center justify-center border border-indigo-600 bg-indigo-600 text-white rounded">1</button>
             <button className="w-6 h-6 flex items-center justify-center border border-gray-200 rounded-none hover:bg-gray-50">2</button>
             <button className="w-6 h-6 flex items-center justify-center border border-gray-200 rounded-none hover:bg-gray-50">3</button>
             <button className="w-6 h-6 flex items-center justify-center border border-gray-200 rounded-none hover:bg-gray-50">4</button>
             <button className="w-6 h-6 flex items-center justify-center border border-gray-200 rounded-none hover:bg-gray-50">5</button>
             <span className="w-6 h-6 flex items-center justify-center">...</span>
             <button className="w-6 h-6 flex items-center justify-center border border-gray-200 rounded-none hover:bg-gray-50">29</button>
             <button className="w-6 h-6 flex items-center justify-center border border-gray-200 rounded-none hover:bg-gray-50">&gt;</button>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default CollectFees;
