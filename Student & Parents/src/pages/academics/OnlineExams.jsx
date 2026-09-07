import React, { useState } from 'react';
import { 
  GraduationCap, Zap, Target, TrendingUp, Lightbulb, 
  MonitorPlay, List, LayoutGrid, Search, ChevronDown, ListFilter,
  User, Calendar as CalendarIcon, Check, Clock, FileSpreadsheet
} from 'lucide-react';

const STUDENT_PROFILES = {
  1: { name: 'Kabir Singh', class: 'Class V (A)', avatar: 'K' },
  2: { name: 'Shlok Verma', class: 'Class III (B)', avatar: 'S' },
  3: { name: 'Rajesh Singh', class: 'Class II (A)', avatar: 'R' },
};

const EXAMS_DATA = [
  { id: 1, title: 'Mid-Term Mathematics', type: 'Objective', marks: 50, subject: 'Maths', date: '10 Sept, 2026', time: '10:00 AM - 11:30 AM', duration: '90 Mins', status: 'Pending', actionStr: 'Starts Soon' },
  { id: 2, title: 'Science Mock Test', type: 'MCQ', marks: 20, subject: 'Science', date: '12 Sept, 2026', time: '09:00 AM - 09:30 AM', duration: '30 Mins', status: 'Active', actionStr: 'Start Now' },
  { id: 3, title: 'English Grammar', type: 'Subjective', marks: 100, subject: 'English', date: '15 Sept, 2026', time: '11:00 AM - 01:00 PM', duration: '120 Mins', status: 'Completed', actionStr: 'View Result' },
];

const SummaryCard = ({ title, sub, badge, colorClass, textClass, iconClass, Icon }) => (
  <div className={`${colorClass} rounded-none p-4 flex flex-col items-start transition-transform hover:-translate-y-0.5 border border-black/5 shadow-sm`}>
    <div className="flex items-center justify-between w-full mb-3">
      <div className="w-8 h-8 bg-white/80 rounded-none flex items-center justify-center border border-white flex-shrink-0 shadow-sm">
        <Icon className={`w-4 h-4 ${iconClass}`} strokeWidth={2.5} />
      </div>
      <div className={`bg-white px-2.5 py-1 rounded-none text-[9px] font-black uppercase tracking-widest shadow-sm border border-black/10 flex-shrink-0 ${textClass}`}>
        {badge}
      </div>
    </div>
    <h3 className={`font-black text-[14px] uppercase tracking-wider leading-none mb-1 ${textClass}`}>{title}</h3>
    <p className={`text-[9.5px] font-bold uppercase tracking-widest opacity-80 ${textClass}`}>{sub}</p>
  </div>
);

export default function OnlineExams({ activeChild }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  
  const student = STUDENT_PROFILES[activeChild] || STUDENT_PROFILES[3];

  const filteredExams = EXAMS_DATA.filter(ex => 
    ex.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    ex.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const exportToExcel = () => {
    const headers = ['ID', 'Exam Title', 'Type', 'Marks', 'Subject', 'Date', 'Time', 'Duration', 'Status'];
    const csvRows = [headers.join(',')];
    
    EXAMS_DATA.forEach(ex => {
      const row = [
        ex.id, `"${ex.title}"`, `"${ex.type}"`, ex.marks, `"${ex.subject}"`,
        `"${ex.date}"`, `"${ex.time}"`, `"${ex.duration}"`, `"${ex.status}"`
      ];
      csvRows.push(row.join(','));
    });
    
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'exams_list.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="p-4 md:p-5 max-w-[1200px] mx-auto h-full flex flex-col gap-4 overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-2 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            <MonitorPlay className="w-6 h-6 text-indigo-600" /> Online Exams Node
          </h1>
          <p className="text-[13px] font-bold text-gray-500 mt-1 uppercase tracking-wider flex items-center gap-2">
             <User className="w-4 h-4 text-gray-400" /> Active Student: <span className="text-indigo-600">{student.name}</span> <span className="opacity-50">|</span> {student.class}
          </p>
        </div>
      </div>
      
      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 flex-shrink-0">
        <SummaryCard 
          title="Exams" 
          sub="Graded • Timed" 
          badge="1 scheduled" 
          colorClass="bg-[#e0f2fe]" 
          textClass="text-[#0369a1]" 
          iconClass="text-[#0284c7]"
          Icon={GraduationCap}
        />
        <SummaryCard 
          title="Quizzes" 
          sub="Short Checks" 
          badge="0 to take" 
          colorClass="bg-[#ffedd5]" 
          textClass="text-[#9a3412]" 
          iconClass="text-[#ea580c]"
          Icon={Zap}
        />
        <SummaryCard 
          title="Practice" 
          sub="Unlimited Tries" 
          badge="0 sets open" 
          colorClass="bg-[#f3e8ff]" 
          textClass="text-[#6b21a8]" 
          iconClass="text-[#9333ea]"
          Icon={Target}
        />
        <SummaryCard 
          title="Progress" 
          sub="Results • Mastery" 
          badge="No Results Yet" 
          colorClass="bg-[#dcfce7]" 
          textClass="text-[#166534]" 
          iconClass="text-[#16a34a]"
          Icon={TrendingUp}
        />
      </div>

      {/* Info Banner */}
      <div className="bg-white border border-gray-200 rounded-none p-3.5 flex items-center gap-3 shadow-sm flex-shrink-0 border-l-[3px] border-l-yellow-400">
        <div className="bg-yellow-100 rounded-none w-7 h-7 flex items-center justify-center flex-shrink-0 shadow-inner">
          <Lightbulb className="w-4 h-4 text-yellow-600" />
        </div>
        <p className="text-[12.5px] font-bold text-gray-800 tracking-wide">
          Information: <span className="text-gray-500 font-semibold ml-1">Make sure you have a stable active internet connection during graded exams!</span>
        </p>
      </div>

      {/* Data Table Section */}
      <div className="bg-white rounded-none border border-gray-200 shadow-sm flex flex-col flex-1 min-h-0">
        
        {/* Table Header Controls */}
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex-shrink-0">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
             <div className="flex items-center gap-2">
               <CalendarIcon className="w-4 h-4 text-indigo-600" />
               <h2 className="text-[14px] font-extrabold text-gray-800 uppercase tracking-widest">Upcoming & Recent Exams</h2>
             </div>
             
             <div className="flex items-center gap-4">
               {/* Search Box */}
               <div className="relative">
                 <input 
                   type="text" 
                   value={searchQuery}
                   onChange={e => setSearchQuery(e.target.value)}
                   placeholder="Search exams..." 
                   className="py-1.5 pl-3 pr-8 border border-gray-200 rounded-none text-[12px] font-bold w-48 focus:outline-none focus:border-indigo-500 shadow-sm placeholder-gray-400"
                 />
                 <Search className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-2" />
               </div>

               {/* Actions: Export & View Toggles */}
               <div className="flex items-center gap-3">
                  <button onClick={exportToExcel} className="flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 px-3 py-1.5 rounded-none text-[11px] font-black uppercase tracking-widest shadow-sm hover:bg-green-100 transition-colors group">
                     <FileSpreadsheet className="w-3.5 h-3.5 text-green-600 group-hover:scale-110 transition-transform" />
                     Excel
                  </button>

                  <div className="flex items-center divide-x divide-gray-200 border border-gray-200 shadow-sm">
                    <button 
                      onClick={() => setViewMode('list')}
                      className={`px-3 py-1.5 rounded-none flex items-center gap-1.5 transition-colors ${viewMode === 'list' ? 'bg-indigo-50 text-indigo-600' : 'bg-white text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
                    >
                      <List className="w-3.5 h-3.5" /> <span className="text-[11px] font-bold uppercase tracking-widest hidden sm:inline">List</span>
                    </button>
                    <button 
                      onClick={() => setViewMode('grid')}
                      className={`px-3 py-1.5 rounded-none flex items-center gap-1.5 transition-colors ${viewMode === 'grid' ? 'bg-indigo-50 text-indigo-600' : 'bg-white text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
                    >
                      <LayoutGrid className="w-3.5 h-3.5" /> <span className="text-[11px] font-bold uppercase tracking-widest hidden sm:inline">Grid</span>
                    </button>
                  </div>
               </div>
             </div>
          </div>
        </div>

        {/* Content implementation */}
        <div className="overflow-y-auto flex-1 custom-scrollbar relative bg-gray-50/20">
          
          {filteredExams.length === 0 ? (
             <div className="flex-1 flex flex-col items-center justify-center text-center p-10 h-full">
                <div className="w-12 h-12 bg-white border border-gray-200 rounded-none flex items-center justify-center mb-3 shadow-sm">
                    <Check className="w-5 h-5 text-gray-300" strokeWidth={3} />
                </div>
                <h3 className="text-[13px] font-extrabold text-gray-500 uppercase tracking-widest mb-1.5">No exams found</h3>
                <p className="text-[11px] font-bold text-gray-400 max-w-sm">
                  Try adjusting your search query or check back later.
                </p>
             </div>
          ) : viewMode === 'list' ? (
             <table className="w-full text-left border-collapse border border-gray-300 tabular-nums">
                <thead className="bg-indigo-50/80 border-b border-gray-300 text-[10px] font-extrabold text-indigo-700 uppercase tracking-widest sticky top-0 z-10 backdrop-blur-sm shadow-sm">
                  <tr>
                    <th className="p-3 border border-gray-300 text-center w-12">#</th>
                    <th className="p-3 border border-gray-300">Exam Title</th>
                    <th className="p-3 border border-gray-300">Subject</th>
                    <th className="p-3 border border-gray-300">Time Window</th>
                    <th className="p-3 border border-gray-300">Duration</th>
                    <th className="p-3 border border-gray-300 text-center">Status</th>
                    <th className="p-3 border border-gray-300 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {filteredExams.map((exam, idx) => (
                    <tr key={exam.id} className="border border-gray-300 hover:bg-indigo-50/30 transition-colors group">
                      <td className="p-3 border border-gray-300 text-center text-xs font-bold text-gray-500">{idx + 1}</td>
                      <td className="p-3 border border-gray-300">
                        <div className="font-extrabold text-[13px] text-gray-800">{exam.title}</div>
                        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mt-0.5">{exam.type} • {exam.marks} Marks</div>
                      </td>
                      <td className="p-3 border border-gray-300 text-[12px] font-bold text-gray-700 uppercase tracking-widest">
                         {exam.subject}
                      </td>
                      <td className="p-3 border border-gray-300">
                        <div className="text-[12px] font-bold text-gray-800">{exam.date}</div>
                        <div className="text-[10px] font-bold text-gray-500 mt-0.5">{exam.time}</div>
                      </td>
                      <td className="p-3 border border-gray-300">
                        <span className="text-[11px] font-bold bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-none flex items-center gap-1.5 w-max shadow-sm">
                           <Clock className="w-3 h-3 text-gray-500" /> {exam.duration}
                        </span>
                      </td>
                      <td className="p-3 border border-gray-300 text-center">
                        <span className={`text-[9px] font-black tracking-widest uppercase px-2 py-1 shadow-sm border ${
                          exam.status === 'Active' ? 'text-green-700 bg-green-50 border-green-200' :
                          exam.status === 'Completed' ? 'text-gray-600 bg-gray-100 border-gray-200' :
                          'text-yellow-700 bg-yellow-50 border-yellow-200'
                        }`}>
                          {exam.status}
                        </span>
                      </td>
                      <td className="p-3 border border-gray-300 text-center">
                        <button className={`text-[9px] font-black tracking-widest uppercase px-3 py-1.5 border rounded-none shadow-sm transition-transform hover:-translate-y-0.5 ${
                          exam.status === 'Active' ? 'bg-indigo-600 text-white border-indigo-700 hover:bg-indigo-700' :
                          exam.status === 'Completed' ? 'bg-white text-indigo-600 border-indigo-200 hover:bg-indigo-50' :
                          'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed'
                        }`}>
                           {exam.actionStr}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
             </table>
          ) : (
             <div className="p-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
               {filteredExams.map(exam => (
                 <div key={exam.id} className="bg-white border border-gray-200 p-4 rounded-none flex flex-col shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
                   {/* Top Strip */}
                   <div className={`absolute top-0 left-0 w-full h-1 ${exam.status === 'Active' ? 'bg-green-500' : exam.status === 'Completed' ? 'bg-gray-300' : 'bg-yellow-400'}`}></div>
                   
                   <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-3 mt-1">
                     <span className={`text-[9px] font-black tracking-widest uppercase px-2 py-0.5 shadow-sm border ${
                          exam.status === 'Active' ? 'text-green-700 bg-green-50 border-green-200' :
                          exam.status === 'Completed' ? 'text-gray-600 bg-gray-100 border-gray-200' :
                          'text-yellow-700 bg-yellow-50 border-yellow-200'
                        }`}>
                        {exam.status}
                     </span>
                     <span className="text-[11px] font-bold bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-none flex items-center gap-1.5 shadow-sm">
                        <Clock className="w-3 h-3 text-gray-500" /> {exam.duration}
                     </span>
                   </div>
                   
                   <h4 className="font-black text-gray-800 text-[14px] leading-tight mb-1 group-hover:text-indigo-600 transition-colors">{exam.title}</h4>
                   <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-4">{exam.subject} • {exam.type} • {exam.marks} Marks</p>
                   
                   <div className="bg-gray-50 border border-gray-100 p-3 flex flex-col gap-1 mb-4 flex-1">
                      <div className="flex items-center justify-between">
                         <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Date</span>
                         <span className="text-[11px] font-extrabold text-gray-700">{exam.date}</span>
                      </div>
                      <div className="flex items-center justify-between">
                         <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Time</span>
                         <span className="text-[11px] font-extrabold text-gray-600">{exam.time}</span>
                      </div>
                   </div>

                   <button className={`w-full text-[10px] font-black tracking-widest uppercase px-3 py-2 border rounded-none shadow-sm transition-transform hover:-translate-y-0.5 ${
                      exam.status === 'Active' ? 'bg-indigo-600 text-white border-indigo-700 hover:bg-indigo-700' :
                      exam.status === 'Completed' ? 'bg-white text-indigo-600 border-indigo-200 hover:bg-indigo-50' :
                      'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed'
                    }`}>
                      {exam.actionStr}
                   </button>
                 </div>
               ))}
             </div>
          )}
        </div>

      </div>
    </div>
  );
}
