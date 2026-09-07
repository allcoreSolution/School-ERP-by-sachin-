import React, { useState } from 'react';
import { 
  Plus, BookOpen, Layers, Edit, Video, 
  Search, ChevronDown, Eye, Trash2, CheckCircle, FileText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockAssignments = [
  { id: 1, title: 'Chapter 1 Exercises', classSec: 'X - A', subject: 'Mathematics', dueDate: '15/12/2024', status: 'Active', submissions: '32/40', assignedBy: 'Ramesh Sharma' },
  { id: 2, title: 'Gravity Project Report', classSec: 'IX - B', subject: 'Science', dueDate: '10/11/2024', status: 'Overdue', submissions: '38/40', assignedBy: 'Ramesh Sharma' },
  { id: 3, title: 'Term 1 Revision Test', classSec: 'X - A', subject: 'Mathematics', dueDate: '01/10/2024', status: 'Evaluated', submissions: '40/40', assignedBy: 'Ramesh Sharma' },
];

const Assignments = () => {
  const navigate = useNavigate();
  const activeTab = 'Homework & Assignments';
  
  const [assignments, setAssignments] = useState(mockAssignments);
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('All Classes');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAssignment, setNewAssignment] = useState({ title: '', classSec: '', subject: 'Mathematics', dueDate: '' });

  const tabs = [
    { name: 'Classwork & Logbook', icon: <BookOpen className="w-4 h-4" />, path: '/classwork' },
    { name: 'Manage Resources', icon: <Layers className="w-4 h-4" />, path: '/classwork' },
    { name: 'Homework & Assignments', icon: <Edit className="w-4 h-4" />, path: '/assignments' },
    { name: 'Live Classes', icon: <Video className="w-4 h-4" />, path: '/live/manage' },
  ];

  // Filtering
  const filteredAssignments = assignments.filter(a => {
    const searchMatch = a.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      a.classSec.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.subject.toLowerCase().includes(searchTerm.toLowerCase());
      
    const clsPart = classFilter.replace('Class ', ''); // "X"
    const classMatch = classFilter === 'All Classes' || a.classSec.includes(clsPart);
    
    return searchMatch && classMatch;
  });

  // Calculate Stats dynamically
  const total = filteredAssignments.length;
  const activeCount = filteredAssignments.filter(a => a.status === 'Active').length;
  const overdueCount = filteredAssignments.filter(a => a.status === 'Overdue').length;
  const evaluatedCount = filteredAssignments.filter(a => a.status === 'Evaluated').length;

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newAssignment.title || !newAssignment.classSec || !newAssignment.dueDate) {
      alert("Please fill required fields.");
      return;
    }
    
    // Format YYYY-MM-DD -> DD/MM/YYYY for UI
    let formattedDate = newAssignment.dueDate;
    if (newAssignment.dueDate.includes('-')) {
       const [y, m, d] = newAssignment.dueDate.split('-');
       formattedDate = `${d}/${m}/${y}`;
    }

    const assignment = {
      id: Date.now(),
      ...newAssignment,
      dueDate: formattedDate,
      status: 'Active',
      submissions: '0/40',
      assignedBy: 'Current User'
    };
    
    setAssignments([assignment, ...assignments]);
    setShowAddModal(false);
    setNewAssignment({ title: '', classSec: '', subject: 'Mathematics', dueDate: '' });
  };

  const handleDelete = (id) => {
    if(window.confirm('Delete this assignment?')) {
      setAssignments(assignments.filter(a => a.id !== id));
    }
  };

  const handleTabClick = (path) => {
    navigate(path);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#f4f7f6] theme-app-bg text-sm">
      
      {/* Header */}
      <div className="px-6 py-5 bg-white border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Study Center</h1>
          <p className="text-[13px] text-gray-500 mt-1">Manage syllabus, learning resources, classwork, homework, and live sessions.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-[#008cba] hover:bg-[#007399] text-white px-4 py-2 rounded shadow-sm font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" /> Create New Homework
        </button>
      </div>

      {/* Tabs Menu */}
      <div className="px-6 bg-white border-b border-gray-200 flex overflow-x-auto hide-scrollbar">
        {tabs.map(t => (
          <button 
            key={t.name}
            onClick={() => handleTabClick(t.path)}
            className={`flex items-center gap-2 px-5 py-4 font-semibold text-[13px] whitespace-nowrap transition-colors border-b-[3px] ${
              activeTab === t.name 
                ? 'text-[#008cba] border-[#008cba]' 
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            {t.icon} {t.name}
          </button>
        ))}
      </div>

      <div className="p-6 max-w-[1400px] mx-auto space-y-6">
        
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           {/* Total */}
           <div className="bg-white border border-gray-200 rounded shadow-sm p-5 text-center flex flex-col justify-center items-center">
             <h3 className="text-[12px] font-bold text-gray-500 uppercase tracking-wide mb-2">Total Homeworks</h3>
             <span className="text-3xl font-bold text-[#007bff]">{total}</span>
           </div>
           {/* Active */}
           <div className="bg-white border border-gray-200 rounded shadow-sm p-5 text-center flex flex-col justify-center items-center">
             <h3 className="text-[12px] font-bold text-gray-500 uppercase tracking-wide mb-2">Active Assignments</h3>
             <span className="text-3xl font-bold text-[#28a745]">{activeCount}</span>
           </div>
           {/* Overdue */}
           <div className="bg-white border border-gray-200 rounded shadow-sm p-5 text-center flex flex-col justify-center items-center">
             <h3 className="text-[12px] font-bold text-gray-500 uppercase tracking-wide mb-2">Overdue / Pending</h3>
             <span className="text-3xl font-bold text-[#dc3545]">{overdueCount}</span>
           </div>
           {/* Evaluated */}
           <div className="bg-white border border-gray-200 rounded shadow-sm p-5 text-center flex flex-col justify-center items-center">
             <h3 className="text-[12px] font-bold text-gray-500 uppercase tracking-wide mb-2">Fully Evaluated</h3>
             <span className="text-3xl font-bold text-[#17a2b8]">{evaluatedCount}</span>
           </div>
        </div>

        {/* Filter Area */}
        <div className="bg-white rounded border border-gray-200 shadow-sm p-5 flex flex-wrap gap-6 items-end">
          <div className="flex-1 max-w-[300px]">
             <label className="block text-[13px] font-bold text-gray-600 mb-1.5">Filter By Class:</label>
             <select 
               value={classFilter}
               onChange={e => setClassFilter(e.target.value)}
               className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] text-gray-600 focus:outline-none focus:border-blue-400"
             >
               <option value="All Classes">All Classes</option>
               <option value="Class X">Class X</option>
               <option value="Class IX">Class IX</option>
             </select>
          </div>
        </div>

        {/* Main Table Card */}
        <div className="bg-white rounded border border-gray-200 shadow-sm overflow-hidden">
          
          {/* Header Row Teal */}
          <div className="bg-[#17a2b8] px-5 py-3 flex justify-between items-center text-white">
            <h2 className="font-bold text-[15px] flex items-center gap-2">
              <FileText className="w-4 h-4 fill-white" /> Assignments List — this session
            </h2>
            <button className="bg-white text-gray-800 px-3 py-1.5 rounded text-[13px] font-semibold flex items-center gap-1.5 shadow-sm hover:bg-gray-50 flex-shrink-0">
               <Layers className="w-3.5 h-3.5" /> View all sessions
            </button>
          </div>

          <div className="p-5">
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto">
                <div className="flex items-center gap-2 text-[13px] text-gray-600">
                  <span>Show</span>
                  <select className="border border-gray-300 rounded px-2 py-1 text-[13px] focus:outline-none focus:border-blue-400">
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                  </select>
                  <span>entries</span>
                </div>
                
                <div className="flex items-center flex-wrap gap-1">
                  {['Copy', 'CSV', 'Excel', 'PDF', 'Print'].map(btn => (
                    <button key={btn} className="px-3 py-1 text-[13px] border border-gray-300 rounded font-medium text-gray-600 hover:bg-gray-50 bg-white">
                      {btn}
                    </button>
                  ))}
                  <button className="px-3 py-1 text-[13px] border border-gray-300 rounded font-medium text-gray-600 hover:bg-gray-50 bg-white flex items-center gap-1">
                    Column visibility <ChevronDown className="w-3 h-3"/>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto mt-2 md:mt-0">
                <label className="text-[13px] text-gray-600 font-medium">Search:</label>
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full md:w-48 border border-gray-300 rounded px-2 py-1 text-[13px] focus:outline-none focus:border-[#17a2b8]" 
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border-t border-gray-200">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    {['Title \u2195', 'Class & Section \u2195', 'Subject \u2195', 'Due Date \u2195', 'Status', 'Submissions', 'Assigned By \u2195', 'Actions'].map((h, i) => (
                      <th key={i} className={`px-4 py-3 text-[13px] font-bold text-gray-800 border-b border-gray-200 ${h.includes('Actions') ? 'text-center' : ''}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredAssignments.length > 0 ? (
                    filteredAssignments.map(a => (
                      <tr key={a.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-3 text-[13px] font-bold text-[#008cba]">{a.title}</td>
                        <td className="px-4 py-3 text-[13px] font-semibold text-gray-700">{a.classSec}</td>
                        <td className="px-4 py-3 text-[13px] text-gray-600">{a.subject}</td>
                        <td className="px-4 py-3 text-[13px] font-medium text-gray-800">{a.dueDate}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-[11px] font-bold uppercase rounded ${
                            a.status==='Active' ? 'bg-green-100 text-green-700' :
                            a.status==='Overdue' ? 'bg-red-100 text-red-700' : 'bg-[#17a2b8]/10 text-[#17a2b8]'
                          }`}>
                            {a.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-[13px] font-medium text-gray-600">{a.submissions}</td>
                        <td className="px-4 py-3 text-[13px] text-gray-600">{a.assignedBy}</td>
                        <td className="px-4 py-3 text-center">
                          <button className="text-gray-400 hover:text-[#008cba] px-1 transition-colors"><Eye className="w-4 h-4" /></button>
                          <button className="text-gray-400 hover:text-green-500 px-1 transition-colors"><CheckCircle className="w-4 h-4" /></button>
                          <button onClick={() => handleDelete(a.id)} className="text-gray-400 hover:text-red-500 px-1 transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="px-4 py-8 text-center text-[13px] text-gray-500 bg-gray-50/50">
                        No data available in table
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row justify-between items-center text-[13px] text-gray-500 gap-3">
              <span>{filteredAssignments.length === 0 ? 'Showing 0 to 0 of 0 entries' : `Showing 1 to ${filteredAssignments.length} of ${filteredAssignments.length} entries`}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-800">Create New Homework</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold leading-none">&times;</button>
            </div>
            
            <form onSubmit={handleAdd} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input 
                  type="text" 
                  required
                  value={newAssignment.title}
                  onChange={e => setNewAssignment({...newAssignment, title: e.target.value})}
                  placeholder="e.g. Solve exercises 1 to 5" 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Class & Section *</label>
                  <input 
                    type="text" 
                    required
                    value={newAssignment.classSec}
                    onChange={e => setNewAssignment({...newAssignment, classSec: e.target.value})}
                    placeholder="e.g. X - A" 
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <select 
                    value={newAssignment.subject}
                    onChange={e => setNewAssignment({...newAssignment, subject: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option>Mathematics</option>
                    <option>Science</option>
                    <option>English</option>
                    <option>History</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date *</label>
                <input 
                  type="date" 
                  required
                  value={newAssignment.dueDate}
                  onChange={e => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" 
                />
              </div>
              
              <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-[#008cba] text-white rounded text-sm font-medium hover:bg-[#007399] transition-colors"
                >
                  Save Homework
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Assignments;
