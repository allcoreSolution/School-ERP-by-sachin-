import React, { useState } from 'react';
import { 
  Plus, BookOpen, Layers, Edit, Video, 
  Calendar, Search, ChevronDown, ChevronLeft, ChevronRight, Eye, Trash2, DownloadCloud
} from 'lucide-react';

const mockEntries = [
  { id: 1, date: '10/12/2024', type: 'Classwork', topic: 'Quadratic Equations', classSec: 'X - A', subject: 'Mathematics', teacher: 'Ramesh Sharma' },
  { id: 2, date: '10/14/2024', type: 'Logbook', topic: 'Lab Experiment #3', classSec: 'IX - B', subject: 'Science', teacher: 'Pallavi Joshi' },
];

const mockResources = [
  { id: 1, title: 'Chapter 2 Physics Notes', type: 'PDF', classSec: 'X', subject: 'Science', size: '2.4 MB' },
  { id: 2, title: 'Trigonometry Formulas', type: 'Image', classSec: 'IX', subject: 'Mathematics', size: '1.1 MB' },
];

const mockHomework = [
  { id: 1, title: 'Solve Ex 4.1', deadline: '15/12/2024', classSec: 'X - A', subject: 'Mathematics', status: 'Active' },
];

const mockLive = [
  { id: 1, topic: 'Doubt Clearing Session', date: 'Tomorrow, 4:00 PM', classSec: 'X', subject: 'Science', status: 'Scheduled' },
];

const Classwork = () => {
  const [activeTab, setActiveTab] = useState('Classwork & Logbook');

  const tabs = [
    { name: 'Classwork & Logbook', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'Manage Resources', icon: <Layers className="w-4 h-4" /> },
    { name: 'Homework & Assignments', icon: <Edit className="w-4 h-4" /> },
    { name: 'Live Classes', icon: <Video className="w-4 h-4" /> },
  ];

  // Logic for Classwork Table
  const [entries, setEntries] = useState(mockEntries);
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('All Classes');
  const [dateFilter, setDateFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEntry, setNewEntry] = useState({ date: '', type: 'Classwork', topic: '', classSec: '', subject: 'Mathematics' });

  const filteredEntries = entries.filter(e => {
    const searchMatch = e.topic.toLowerCase().includes(searchTerm.toLowerCase()) || 
      e.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.classSec.toLowerCase().includes(searchTerm.toLowerCase());
      
    const clsPart = classFilter.replace('Class ', ''); // e.g. "X"
    const classMatch = classFilter === 'All Classes' || e.classSec.includes(clsPart);
    
    let dateMatch = true;
    if (dateFilter) {
       const [em, ed, ey] = e.date.split('/');
       const eDateReformatted = `${ey}-${em.padStart(2, '0')}-${ed.padStart(2, '0')}`;
       dateMatch = eDateReformatted === dateFilter;
    }
    return searchMatch && classMatch && dateMatch;
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newEntry.date || !newEntry.topic || !newEntry.classSec) {
      alert("Please fill required fields.");
      return;
    }
    let formattedDate = newEntry.date;
    if (newEntry.date.includes('-')) {
       const [y, m, d] = newEntry.date.split('-');
       formattedDate = `${parseInt(m)}/${parseInt(d)}/${y}`;
    }
    const entry = { id: Date.now(), ...newEntry, date: formattedDate, teacher: 'Current User' };
    setEntries([entry, ...entries]);
    setShowAddModal(false);
    setNewEntry({ date: '', type: 'Classwork', topic: '', classSec: '', subject: 'Mathematics' });
  };

  const renderTabContent = () => {
    if (activeTab === 'Manage Resources') {
      return (
        <div className="bg-white rounded border border-gray-200 shadow-sm overflow-hidden animate-in fade-in">
          <div className="bg-[#008cba] px-5 py-3 flex justify-between items-center text-white">
            <h2 className="font-bold text-[15px] flex items-center gap-2"><Layers className="w-4 h-4 fill-white" /> Study Resources</h2>
          </div>
          <div className="p-5 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-[13px] font-bold text-gray-800">Resource Title</th>
                  <th className="px-4 py-3 text-[13px] font-bold text-gray-800">Type & Size</th>
                  <th className="px-4 py-3 text-[13px] font-bold text-gray-800">Class</th>
                  <th className="px-4 py-3 text-[13px] font-bold text-gray-800">Action</th>
                </tr>
              </thead>
              <tbody>
                {mockResources.map(r => (
                  <tr key={r.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3 text-[13px] font-medium text-gray-800">{r.title}</td>
                    <td className="px-4 py-3 text-[13px] text-gray-600">{r.type} • {r.size}</td>
                    <td className="px-4 py-3 text-[13px] text-gray-600">{r.classSec} - {r.subject}</td>
                    <td className="px-4 py-3"><button className="text-blue-500 hover:underline text-[13px] flex items-center gap-1"><DownloadCloud className="w-3.5 h-3.5"/> Download</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    
    if (activeTab === 'Homework & Assignments') {
      return (
        <div className="bg-white rounded border border-gray-200 shadow-sm overflow-hidden animate-in fade-in">
          <div className="bg-[#fd7e14] px-5 py-3 flex justify-between items-center text-white">
            <h2 className="font-bold text-[15px] flex items-center gap-2"><Edit className="w-4 h-4 fill-white" /> Active Assignments</h2>
          </div>
          <div className="p-5 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-[13px] font-bold text-gray-800">Title</th>
                  <th className="px-4 py-3 text-[13px] font-bold text-gray-800">Deadline</th>
                  <th className="px-4 py-3 text-[13px] font-bold text-gray-800">Class</th>
                  <th className="px-4 py-3 text-[13px] font-bold text-gray-800">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockHomework.map(h => (
                  <tr key={h.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3 text-[13px] font-medium text-gray-800">{h.title}</td>
                    <td className="px-4 py-3 text-[13px] text-gray-700">{h.deadline}</td>
                    <td className="px-4 py-3 text-[13px] text-gray-600">{h.classSec} - {h.subject}</td>
                    <td className="px-4 py-3"><span className="bg-green-100 text-green-700 px-2 py-0.5 text-[11px] rounded uppercase font-bold">{h.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (activeTab === 'Live Classes') {
      return (
        <div className="bg-white rounded border border-gray-200 shadow-sm overflow-hidden animate-in fade-in">
          <div className="bg-purple-600 px-5 py-3 flex justify-between items-center text-white">
            <h2 className="font-bold text-[15px] flex items-center gap-2"><Video className="w-4 h-4 fill-white" /> Live Sessions</h2>
          </div>
          <div className="p-5 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-[13px] font-bold text-gray-800">Topic</th>
                  <th className="px-4 py-3 text-[13px] font-bold text-gray-800">Schedule</th>
                  <th className="px-4 py-3 text-[13px] font-bold text-gray-800">Class</th>
                  <th className="px-4 py-3 text-[13px] font-bold text-gray-800">Action</th>
                </tr>
              </thead>
              <tbody>
                {mockLive.map(l => (
                  <tr key={l.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3 text-[13px] font-medium text-gray-800">{l.topic}</td>
                    <td className="px-4 py-3 text-[13px] text-gray-700">{l.date}</td>
                    <td className="px-4 py-3 text-[13px] text-gray-600">{l.classSec} - {l.subject}</td>
                    <td className="px-4 py-3"><button className="bg-purple-100 text-purple-700 px-3 py-1 rounded text-[12px] font-bold hover:bg-purple-200">Start Meet</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    // Default: Classwork & Logbook
    return (
      <div className="space-y-5 animate-in fade-in">
        <div className="bg-white rounded border border-gray-200 shadow-sm p-5 flex flex-wrap gap-6 items-end">
          <div className="flex-1 min-w-[200px]">
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
          <div className="flex-1 min-w-[200px]">
             <label className="block text-[13px] font-bold text-gray-600 mb-1.5">Date:</label>
             <div className="relative">
               <input 
                 type="date"
                 value={dateFilter}
                 onChange={e => setDateFilter(e.target.value)}
                 className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] text-gray-600 focus:outline-none focus:border-blue-400" 
               />
             </div>
          </div>
        </div>

        <div className="bg-white rounded border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-[#17a2b8] px-5 py-3 flex justify-between items-center text-white">
            <h2 className="font-bold text-[15px] flex items-center gap-2">
              <BookOpen className="w-4 h-4 fill-white" /> Entries List — this session
            </h2>
            <button className="bg-white text-gray-800 px-3 py-1.5 rounded text-[13px] font-semibold flex items-center gap-1.5 shadow-sm hover:bg-gray-50 flex-shrink-0">
               <Layers className="w-3.5 h-3.5" /> View all sessions
            </button>
          </div>

          <div className="p-5">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto">
                <div className="flex items-center gap-2 text-[13px] text-gray-600 border border-transparent">
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

            <div className="overflow-x-auto border-t border-gray-200">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    {['Date', 'Type', 'Topic', 'Class & Section', 'Subject', 'Teacher'].map(h => (
                      <th key={h} className="px-4 py-3 text-[13px] font-bold text-gray-800 border-b border-gray-200">
                        {h} <span className="text-gray-300 inline-block ml-1 opacity-60">↕</span>
                      </th>
                    ))}
                    <th className="px-4 py-3 text-[13px] font-bold text-gray-800 border-b border-gray-200 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEntries.length > 0 ? (
                    filteredEntries.map(e => (
                      <tr key={e.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-3 text-[13px] font-medium text-gray-800">{e.date}</td>
                        <td className="px-4 py-3 text-[13px] font-bold text-[#17a2b8]">{e.type}</td>
                        <td className="px-4 py-3 text-[13px] text-gray-700">{e.topic}</td>
                        <td className="px-4 py-3 text-[13px] text-gray-600">{e.classSec}</td>
                        <td className="px-4 py-3 text-[13px] text-gray-600">{e.subject}</td>
                        <td className="px-4 py-3 text-[13px] text-gray-600">{e.teacher}</td>
                        <td className="px-4 py-3 text-center">
                          <button className="text-gray-400 hover:text-[#008cba] px-1 transition-colors"><Eye className="w-4 h-4" /></button>
                          <button className="text-gray-400 hover:text-green-500 px-1 transition-colors"><Edit className="w-4 h-4" /></button>
                          <button onClick={() => {
                             if(window.confirm('Delete entry?')) setEntries(entries.filter(x => x.id !== e.id));
                          }} className="text-gray-400 hover:text-red-500 px-1 transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-[13px] text-gray-500 bg-gray-50/50">
                        No data available in table
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row justify-between items-center text-[13px] text-gray-500 gap-3">
              <span>{filteredEntries.length === 0 ? 'Showing 0 to 0 of 0 entries' : `Showing 1 to ${filteredEntries.length} of ${filteredEntries.length} entries`}</span>
              <div className="flex bg-white border border-gray-300 rounded self-end">
                <button className="px-3 py-1.5 border-r border-gray-300 text-gray-400 hover:bg-gray-50 text-[13px]">Previous</button>
                {filteredEntries.length > 0 && <button className="px-3 py-1.5 text-white bg-blue-600 border-r border-blue-600 hover:bg-blue-700 text-[13px] font-bold">1</button>}
                <button className="px-3 py-1.5 text-gray-400 hover:bg-gray-50 text-[13px]">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#f4f7f6] theme-app-bg text-sm">
      <div className="px-6 py-5 bg-white border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Study Center</h1>
          <p className="text-[13px] text-gray-500 mt-1">Manage syllabus, learning resources, classwork, homework, and live sessions.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-[#008cba] hover:bg-[#007399] text-white px-4 py-2 rounded shadow-sm font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" /> Create New Entry
        </button>
      </div>

      {/* Dynamic Tabs Menu */}
      <div className="px-6 bg-white border-b border-gray-200 flex overflow-x-auto hide-scrollbar">
        {tabs.map(t => (
          <button 
            key={t.name}
            onClick={() => setActiveTab(t.name)}
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

      <div className="p-6 max-w-[1400px] mx-auto min-h-[500px]">
        {renderTabContent()}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded shadow-2xl w-full max-w-lg overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-800">Create New Entry</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold leading-none">&times;</button>
            </div>
            
            <form onSubmit={handleAdd} className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                    <input 
                      type="date" 
                      required
                      value={newEntry.date}
                      onChange={e => setNewEntry({...newEntry, date: e.target.value})}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select 
                      value={newEntry.type}
                      onChange={e => setNewEntry({...newEntry, type: e.target.value})}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                    >
                      <option>Classwork</option>
                      <option>Logbook</option>
                      <option>Assignment</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Topic *</label>
                  <input 
                    type="text" 
                    required
                    value={newEntry.topic}
                    onChange={e => setNewEntry({...newEntry, topic: e.target.value})}
                    placeholder="e.g. History Chapter 2 Overview" 
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Class & Section *</label>
                    <input 
                      type="text" 
                      required
                      value={newEntry.classSec}
                      onChange={e => setNewEntry({...newEntry, classSec: e.target.value})}
                      placeholder="e.g. X - A" 
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <select 
                      value={newEntry.subject}
                      onChange={e => setNewEntry({...newEntry, subject: e.target.value})}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                    >
                      <option>Mathematics</option>
                      <option>Science</option>
                      <option>English</option>
                      <option>History</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end gap-3">
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
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Classwork;
