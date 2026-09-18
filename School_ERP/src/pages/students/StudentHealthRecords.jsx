import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  HeartPulse, List, Grid, Search, FileText, Download, Printer, LayoutGrid, Activity
} from 'lucide-react';

const StudentHealthRecords = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');

  const [students] = useState([
    { id: 'YISADM-021', roll: 1, name: 'Dhruv Agarwal', class: 'Nursery - B', bloodGroup: 'B+', checkup: 'No Records', allergies: '—', avatar: 'https://ui-avatars.com/api/?name=Dhruv+Agarwal&background=EEEDFF&color=5F52FF' },
    { id: 'YISADM-041', roll: 1, name: 'Rishi Khatri', class: 'Class I - A', bloodGroup: 'A+', checkup: 'No Records', allergies: '—', avatar: 'https://ui-avatars.com/api/?name=Rishi+Khatri&background=F3F4F6&color=6B7280' },
    { id: 'YISADM-061', roll: 1, name: 'Yug Nair', class: 'Class II - A', bloodGroup: 'B+', checkup: 'No Records', allergies: '—', avatar: 'https://ui-avatars.com/api/?name=Yug+Nair&background=F3F4F6&color=6B7280' },
    { id: 'YISADM-081', roll: 1, name: 'Ansh Bose', class: 'Class III - A', bloodGroup: 'A+', checkup: 'No Records', allergies: '—', avatar: 'https://ui-avatars.com/api/?name=Ansh+Bose&background=F3F4F6&color=6B7280' },
    { id: 'YISADM-121', roll: 1, name: 'Pranav Agarwal', class: 'Class V - A', bloodGroup: 'B+', checkup: 'No Records', allergies: '—', avatar: 'https://ui-avatars.com/api/?name=Pranav+Agarwal&background=F3F4F6&color=6B7280' },
    { id: 'YISADM-141', roll: 1, name: 'Rishi Khatri', class: 'Class VI - A', bloodGroup: 'A+', checkup: 'No Records', allergies: '—', avatar: 'https://ui-avatars.com/api/?name=Rishi+Khatri&background=F3F4F6&color=6B7280' },
    { id: 'YISADM-161', roll: 1, name: 'Yug Sharma', class: 'Class VII - A', bloodGroup: 'O+', checkup: 'No Records', allergies: '—', avatar: 'https://ui-avatars.com/api/?name=Yug+Sharma&background=F3F4F6&color=6B7280' },
    { id: 'YISADM-181', roll: 1, name: 'Ansh Agarwal', class: 'Class VIII - A', bloodGroup: 'B+', checkup: 'No Records', allergies: '—', avatar: 'https://ui-avatars.com/api/?name=Ansh+Agarwal&background=F3F4F6&color=6B7280' },
    { id: 'YISADM-221', roll: 1, name: 'Yug Agarwal', class: 'Class I - A', bloodGroup: 'B+', checkup: 'No Records', allergies: '—', avatar: 'https://ui-avatars.com/api/?name=Yug+Agarwal&background=F3F4F6&color=6B7280' },
    { id: 'YISADM-241', roll: 1, name: 'Ansh Sharma', class: 'Class I - A', bloodGroup: 'O+', checkup: 'No Records', allergies: '—', avatar: 'https://ui-avatars.com/api/?name=Ansh+Sharma&background=F3F4F6&color=6B7280' },
  ]);

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopy = () => {
    const text = filteredStudents.map(s => `${s.roll}\t${s.name}\t${s.id}\t${s.class}\t${s.bloodGroup}`).join('\n');
    navigator.clipboard.writeText(`ROLL NO\tNAME\tID\tCLASS\tBLOOD GROUP\n${text}`);
    alert('Copied to clipboard!');
  };

  const handleExportCSV = (isExcel = false) => {
    const header = "ROLL NO,NAME,ID,CLASS,BLOOD GROUP,LATEST CHECKUP,ALLERGIES\n";
    const csvContent = filteredStudents.map(s => `"${s.roll}","${s.name}","${s.id}","${s.class}","${s.bloodGroup}","${s.checkup}","${s.allergies}"`).join('\n');
    const blob = new Blob([header + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `health_records.${isExcel ? 'xls' : 'csv'}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleManage = (id) => {
    navigate(`/students/health/${id}`);
  };

  return (
    <div className="p-6 h-full flex flex-col bg-gray-50 overflow-y-auto">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <HeartPulse className="w-7 h-7 text-red-500" /> Student Health Records
          </h1>
          <p className="text-sm text-gray-500 mt-1">Blood group, checkups, allergies & alerts for every student</p>
        </div>
        <div className="text-sm text-gray-500">
          <Link to="/" className="text-orange-500 hover:underline">Home</Link> / <Link to="/students/list" className="text-orange-500 hover:underline">Students</Link> / Health Records
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-none shadow-sm border border-gray-200 flex flex-col flex-1 min-h-0">
        
        {/* Card Header & Toolbar */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[15px] font-bold text-gray-800 flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#5F52FF]" /> Health Overview
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
                placeholder="Search students..." 
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
                <tr className="bg-[#F8F7FF] border-b border-gray-200 text-[10px] font-bold text-[#5F52FF] uppercase tracking-wider">
                  <th className="px-4 py-3 border-r border-gray-200 w-12 text-center">#</th>
                  <th className="px-4 py-3 border-r border-gray-200 w-20">ROLL NO</th>
                  <th className="px-4 py-3 border-r border-gray-200">NAME</th>
                  <th className="px-4 py-3 border-r border-gray-200">CLASS & SECTION</th>
                  <th className="px-4 py-3 border-r border-gray-200">BLOOD GROUP</th>
                  <th className="px-4 py-3 border-r border-gray-200">LATEST CHECKUP</th>
                  <th className="px-4 py-3 border-r border-gray-200">ALLERGIES / ALERTS</th>
                  <th className="px-4 py-3 text-center">ACTION</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-gray-700">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                      No students found.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student, index) => (
                    <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 border-r border-gray-100 text-center text-gray-500">{index + 1}</td>
                      <td className="px-4 py-3 border-r border-gray-100 font-semibold">{student.roll}</td>
                      <td className="px-4 py-3 border-r border-gray-100">
                        <div className="flex items-center gap-3">
                          <img src={student.avatar} alt={student.name} className="w-8 h-8 rounded-none border border-gray-200" />
                          <div>
                            <div className="font-bold text-gray-800">{student.name}</div>
                            <div className="text-[11px] text-gray-400">{student.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 border-r border-gray-100">{student.class}</td>
                      <td className="px-4 py-3 border-r border-gray-100">
                        <span className="text-red-500 font-bold">{student.bloodGroup}</span>
                      </td>
                      <td className="px-4 py-3 border-r border-gray-100 text-gray-400 font-medium">{student.checkup}</td>
                      <td className="px-4 py-3 border-r border-gray-100 text-gray-400 font-medium">{student.allergies}</td>
                      <td className="px-4 py-3 text-center">
                        <button 
                          onClick={() => handleManage(student.id)}
                          className="bg-[#5F52FF] text-white px-3 py-1.5 rounded-none text-[11px] font-bold hover:bg-[#4E41E6] shadow-sm flex items-center justify-center gap-1.5 mx-auto"
                        >
                          <Activity className="w-3.5 h-3.5" /> Manage Records
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          ) : (
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 animate-in fade-in duration-300 bg-gray-50/50">
              {filteredStudents.length === 0 ? (
                <div className="col-span-full py-8 text-center text-gray-500">
                  No students found.
                </div>
              ) : (
                filteredStudents.map((student) => (
                  <div key={student.id} className="bg-white border border-gray-200 rounded-none p-5 shadow-sm hover:shadow-md transition-shadow relative">
                    <div className="flex items-start gap-4 mb-4">
                      <img src={student.avatar} alt={student.name} className="w-12 h-12 rounded-none border border-gray-200" />
                      <div>
                        <div className="font-bold text-gray-800 text-[15px]">{student.name}</div>
                        <div className="text-xs text-gray-400 mb-1">{student.id} | Roll: {student.roll}</div>
                        <div className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded-none inline-block">{student.class}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-[12px] mb-5">
                      <div>
                        <div className="text-gray-400 font-semibold mb-0.5">Blood Group</div>
                        <div className="text-red-500 font-bold">{student.bloodGroup}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 font-semibold mb-0.5">Checkup</div>
                        <div className="text-gray-700 font-medium">{student.checkup}</div>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleManage(student.id)}
                      className="w-full bg-gray-50 text-[#5F52FF] border border-gray-200 px-3 py-2 rounded-none text-[13px] font-bold hover:bg-[#5F52FF] hover:text-white transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Activity className="w-4 h-4" /> Manage Health Records
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
        
        {/* Footer Pagination */}
        <div className="p-4 border-t border-gray-200 flex justify-between items-center bg-gray-50/50">
          <div className="text-[13px] text-gray-500 font-medium">
            Showing 1-{filteredStudents.length} of {students.length}
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

export default StudentHealthRecords;
