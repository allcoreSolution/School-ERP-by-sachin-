import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ClipboardList, Plus, List, Grid, Search, Edit2, Trash2, FileText, Download, Printer, LayoutGrid, FileType
} from 'lucide-react';

const BehaviorRecords = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'grid'
  const [searchQuery, setSearchQuery] = useState('');

  const [records, setRecords] = useState([
    { id: 1, student: 'Rishi Khatri', classSection: 'Class I (A)', title: 'Helped on class', type: 'Positive', date: '11 Aug, 2026', reportedBy: 'Amit Sharma' },
    { id: 2, student: 'Raaj kumar Rai', classSection: 'Class II (A)', title: 'Very naught', type: 'Negative', date: '04 Aug, 2026', reportedBy: 'Amit Sharma' },
  ]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      setRecords(records.filter(r => r.id !== id));
    }
  };

  const handleEdit = (record) => {
    navigate('/students/behavior/add', { state: { editData: record } });
  };

  const filteredRecords = records.filter(r => 
    r.student.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopy = () => {
    const text = filteredRecords.map(r => `${r.id}\t${r.student}\t${r.classSection}\t${r.title}\t${r.type}\t${r.date}\t${r.reportedBy}`).join('\n');
    navigator.clipboard.writeText(`#\tStudent\tClass\tTitle\tType\tDate\tReported By\n${text}`);
    alert('Copied to clipboard!');
  };

  const handleExportCSV = (isExcel = false) => {
    const header = "#,Student,Class,Title,Type,Date,Reported By\n";
    const csvContent = filteredRecords.map(r => 
      `"${r.id}","${r.student}","${r.classSection}","${r.title}","${r.type}","${r.date}","${r.reportedBy}"`
    ).join('\n');
    const blob = new Blob([header + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `behavior_records.${isExcel ? 'xls' : 'csv'}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 h-full flex flex-col bg-gray-50 overflow-y-auto">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Student Behavior Records</h1>
          <p className="text-sm text-gray-500 mt-1">Log positive & negative behavior notes for students</p>
        </div>
        <div>
          <button 
            onClick={() => navigate('/students/behavior/add')}
            className="flex items-center gap-2 px-4 py-2 bg-[#5F52FF] text-white rounded-none font-semibold text-sm hover:bg-[#4E41E6] shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" /> Add New Record
          </button>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-none shadow-sm border border-gray-200 flex flex-col flex-1 min-h-0">
        
        {/* Card Header & Toolbar */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[15px] font-bold text-gray-800 flex items-center gap-2">
              <FileType className="w-4 h-4 text-[#5F52FF]" /> All Behavior Records
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
                  <option>25</option>
                  <option>50</option>
                </select>
              </div>
              
              <div className="h-6 w-px bg-gray-300 mx-1"></div>
              
              <button onClick={handleCopy} className="p-1.5 border border-gray-300 rounded-none hover:bg-gray-50 text-gray-600 tooltip" title="Copy">
                <FileText className="w-4 h-4" />
              </button>
              <button onClick={() => handleExportCSV(false)} className="px-3 py-1.5 border border-gray-300 rounded-none hover:bg-gray-50 text-gray-600 text-xs font-semibold">
                CSV
              </button>
              <button onClick={() => handleExportCSV(true)} className="px-3 py-1.5 border border-gray-300 rounded-none hover:bg-gray-50 text-gray-600 text-xs font-semibold">
                Excel
              </button>
              <button onClick={handlePrint} className="px-3 py-1.5 border border-gray-300 rounded-none hover:bg-gray-50 text-gray-600 text-xs font-semibold">
                PDF
              </button>
              <button onClick={handlePrint} className="p-1.5 border border-gray-300 rounded-none hover:bg-gray-50 text-gray-600" title="Print">
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
                placeholder="Search records..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-gray-300 rounded-none pl-3 pr-8 py-1.5 text-sm w-64 focus:outline-none focus:border-[#5F52FF]"
              />
              <Search className="w-4 h-4 text-gray-400 absolute right-2.5 top-2" />
            </div>
          </div>
        </div>

        {/* Dynamic Content Area (List or Grid) */}
        <div className="flex-1 overflow-auto bg-white">
          {viewMode === 'list' ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8F7FF] border-b border-gray-200 text-[11px] font-bold text-[#5F52FF] uppercase tracking-wider">
                  <th className="px-5 py-3 border-r border-gray-200 w-12 text-center">#</th>
                  <th className="px-5 py-3 border-r border-gray-200">STUDENT</th>
                  <th className="px-5 py-3 border-r border-gray-200">CLASS</th>
                  <th className="px-5 py-3 border-r border-gray-200">TITLE</th>
                  <th className="px-5 py-3 border-r border-gray-200">TYPE</th>
                  <th className="px-5 py-3 border-r border-gray-200">DATE</th>
                  <th className="px-5 py-3 border-r border-gray-200">REPORTED BY</th>
                  <th className="px-5 py-3 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-5 py-8 text-center text-gray-500">
                      No records found.
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((record) => (
                    <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3 border-r border-gray-100 text-center text-gray-500 text-[13px]">{record.id}</td>
                      <td className="px-5 py-3 border-r border-gray-100 font-medium text-gray-800 text-[13px]">{record.student}</td>
                      <td className="px-5 py-3 border-r border-gray-100 text-gray-600 text-[13px]">{record.classSection}</td>
                      <td className="px-5 py-3 border-r border-gray-100 text-gray-800 text-[13px]">{record.title}</td>
                      <td className="px-5 py-3 border-r border-gray-100">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-none text-[11px] font-bold ${
                          record.type === 'Positive' ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'
                        }`}>
                          {record.type}
                        </span>
                      </td>
                      <td className="px-5 py-3 border-r border-gray-100 text-gray-600 text-[13px]">{record.date}</td>
                      <td className="px-5 py-3 border-r border-gray-100 text-gray-600 text-[13px]">{record.reportedBy}</td>
                      <td className="px-5 py-3 text-right">
                        <div className="flex items-center justify-end gap-3 text-gray-400">
                          <Edit2 onClick={() => handleEdit(record)} className="w-4 h-4 hover:text-[#5F52FF] cursor-pointer transition-colors" />
                          <Trash2 onClick={() => handleDelete(record.id)} className="w-4 h-4 hover:text-red-500 cursor-pointer transition-colors" />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          ) : (
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-in fade-in duration-300 bg-gray-50/50">
              {filteredRecords.length === 0 ? (
                <div className="col-span-full py-8 text-center text-gray-500">
                  No records found.
                </div>
              ) : (
                filteredRecords.map((record) => (
                  <div key={record.id} className="bg-white border border-gray-200 rounded-none p-5 shadow-sm hover:shadow-md transition-shadow relative group">
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button onClick={() => handleEdit(record)} className="p-1.5 bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-none border border-gray-200"><Edit2 className="w-3.5 h-3.5" /></button>
                       <button onClick={() => handleDelete(record.id)} className="p-1.5 bg-gray-50 hover:bg-red-50 text-gray-500 hover:text-red-500 rounded-none border border-gray-200"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>

                    <div className="flex items-start gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-none flex items-center justify-center font-bold text-lg flex-shrink-0 ${
                         record.type === 'Positive' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      }`}>
                        {record.student.charAt(0)}
                      </div>
                      <div className="pt-0.5">
                        <div className="font-bold text-gray-800 text-[15px]">{record.student}</div>
                        <div className="text-xs text-gray-500 font-medium">{record.classSection}</div>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="font-semibold text-gray-800 text-[14px]">{record.title}</div>
                      <div className="text-xs text-gray-500 mt-1 flex items-center justify-between">
                        <span>{record.date}</span>
                        <span className={`px-1.5 py-0.5 rounded-none text-[10px] font-bold ${
                          record.type === 'Positive' ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'
                        }`}>
                          {record.type.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div className="text-[11px] text-gray-400 font-medium border-t border-gray-100 pt-3">
                      Reported by <span className="text-gray-600 font-semibold">{record.reportedBy}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer Pagination */}
        <div className="p-4 border-t border-gray-200 flex justify-between items-center bg-gray-50/50">
          <div className="text-[13px] text-gray-500 font-medium">
            Showing 1-{filteredRecords.length} of {records.length}
          </div>
          <div className="flex items-center gap-1">
            <button className="px-2 py-1 border border-gray-300 rounded-none text-gray-400 bg-white">{'<'}</button>
            <button className="px-3 py-1 border border-[#5F52FF] bg-[#5F52FF] text-white rounded-none font-bold text-[13px]">1</button>
            <button className="px-2 py-1 border border-gray-300 rounded-none text-gray-400 bg-white">{'>'}</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BehaviorRecords;
