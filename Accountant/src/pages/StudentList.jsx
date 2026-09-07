import React from 'react';
import { 
  Users, UserPlus, Upload, Image as ImageIcon, FileText, Key, Filter, X,
  List, Grid, Copy, FileSpreadsheet, File, Printer, Columns, Search,
  Eye, Edit, Trash2, User, Plus
} from 'lucide-react';

const studentsData = [
  { id: 1, adm: 'YISADM-004', roll: 4, img: 'https://randomuser.me/api/portraits/men/11.jpg', name: 'Kabir Singh', class: 'Nursery (A)', outcome: 'Studying', siblings: 2, father: 'Anil Verma', phone: '6263056779', assigned: 33300.00, due: 0.00 },
  { id: 2, adm: 'YISADM-005', roll: 5, img: 'https://randomuser.me/api/portraits/women/12.jpg', name: 'Ananya Desai', class: 'Nursery (A)', outcome: 'Studying', siblings: 0, father: 'Vikram Desai', phone: '9876500009', assigned: 21800.00, due: 0.00 },
  { id: 3, adm: 'YISADM-006', roll: 6, img: 'https://randomuser.me/api/portraits/men/13.jpg', name: 'Ishaan Gupta', class: 'Nursery (A)', outcome: 'Studying', siblings: 0, father: 'Amit Gupta', phone: '9876500011', assigned: 21800.00, due: 0.00 },
  { id: 4, adm: 'YISADM-007', roll: 7, img: 'https://randomuser.me/api/portraits/women/14.jpg', name: 'Diya Reddy', class: 'Nursery (A)', outcome: 'Studying', siblings: 0, father: 'Srinivas Reddy', phone: '9876500013', assigned: 21800.00, due: 6800.00 },
  { id: 5, adm: 'YISADM-008', roll: 8, img: 'https://randomuser.me/api/portraits/men/15.jpg', name: 'Shaurya Mishra', class: 'Nursery (A)', outcome: 'Studying', siblings: 0, father: 'Suresh Mishra', phone: '9876500015', assigned: 21800.00, due: 11000.00 },
];

const ActionButton = ({ icon: Icon, label, primary = false, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-3 py-2 rounded-[3px] border text-[13px] font-semibold transition-colors whitespace-nowrap
    ${primary 
      ? 'bg-[#5a52d7] border-[#5a52d7] text-white hover:bg-[#4a42c0]' 
      : 'bg-white border-gray-200 text-[#555] hover:bg-gray-50'}`}
  >
    <Icon className="w-4 h-4" />
    {label}
  </button>
);

const IconButton = ({ icon: Icon, onClick }) => (
  <button className="p-2 border border-gray-200 rounded-[3px] text-gray-500 hover:bg-gray-50 bg-white" onClick={onClick}>
    <Icon className="w-4 h-4" />
  </button>
);

const ToolbarButton = ({ label, icon: Icon }) => (
  <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-gray-600 text-[13px] bg-white hover:bg-gray-50 transition-colors">
    {Icon && <Icon className="w-3.5 h-3.5" />}
    {label}
  </button>
);

const StudentList = () => {
  return (
    <div className="min-h-screen bg-[#ecf0f5] text-[#333] p-4 sm:p-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between mb-6 gap-4">
        <div className="shrink-0 flex flex-col justify-between">
          <h1 className="text-[24px] font-bold text-[#333] leading-tight">Student List</h1>
          <div className="flex items-center gap-4 text-[13px] font-semibold whitespace-nowrap mt-1">
            <span className="text-[#3c8dbc]">260 Session Total</span>
            <span className="text-gray-500">283 All Time</span>
            <span className="text-[#f39c12] flex items-center gap-1">
              <User className="w-3.5 h-3.5" /> 23 Unassigned
            </span>
          </div>
        </div>
        
        <div className="flex items-end gap-2 overflow-x-auto pb-1 scrollbar-hide lg:justify-end w-full lg:w-auto">
          <ActionButton primary icon={Plus} label="Admit Student" onClick={() => alert('Admit Student functionality coming soon!')} />
          <ActionButton icon={Upload} label="Bulk Upload" />
          <ActionButton icon={ImageIcon} label="Bulk Photos" />
          <ActionButton icon={FileText} label="Bulk Docs" />
          <ActionButton icon={Key} label="Credentials" />
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-[3px] border border-gray-200 shadow-sm p-5 mb-5 flex flex-col md:flex-row items-end gap-4 overflow-x-auto">
        
        <div className="flex-1 w-full min-w-[200px]">
          <label className="block text-[12px] font-bold text-[#333] mb-1.5">Class</label>
          <select className="w-full border border-gray-200 rounded-[3px] px-3 py-2 text-[13px] text-gray-500 focus:outline-none focus:border-gray-400">
            <option>-- All Classes --</option>
          </select>
        </div>
        
        <div className="flex-1 w-full min-w-[200px]">
          <label className="block text-[12px] font-bold text-[#333] mb-1.5">Section</label>
          <select className="w-full border border-gray-200 rounded-[3px] px-3 py-2 text-[13px] text-gray-500 focus:outline-none bg-gray-50">
            <option>-- Select Class First --</option>
          </select>
        </div>
        
        <div className="flex-1 w-full min-w-[200px]">
          <label className="block text-[12px] font-bold text-[#333] mb-1.5">Siblings</label>
          <select className="w-full border border-gray-200 rounded-[3px] px-3 py-2 text-[13px] text-gray-500 focus:outline-none focus:border-gray-400">
            <option>-- All Students --</option>
          </select>
        </div>
        
        <div className="flex-1 w-full min-w-[200px]">
          <label className="block text-[12px] font-bold text-[#333] mb-1.5">Enrollment</label>
          <select className="w-full border border-gray-200 rounded-[3px] px-3 py-2 text-[13px] text-[#333] focus:outline-none focus:border-gray-400">
            <option>Currently studying</option>
          </select>
        </div>
        
        <div className="flex gap-2">
          <ActionButton primary icon={Filter} label="Filter" />
          <ActionButton icon={X} label="Clear" />
        </div>
      </div>

      {/* Table Panel */}
      <div className="bg-white rounded-[3px] border border-gray-200 shadow-sm flex flex-col">
        
        {/* Table Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-[#fefefe]">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#5a52d7]" />
            <h2 className="text-[16px] font-bold text-[#333]">Student Records</h2>
          </div>
          <div className="flex items-center gap-1 bg-gray-50 p-1 border border-gray-200 rounded-[3px]">
            <button className="p-1 px-2 text-[#5a52d7] bg-white shadow-sm border border-gray-100 rounded-[3px] text-[13px] font-semibold"><List className="w-4 h-4 inline" /></button>
            <button className="p-1 px-2 text-gray-400 hover:text-gray-600 text-[13px]"><Grid className="w-4 h-4 inline" /></button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="p-4 flex flex-col lg:flex-row justify-between items-center gap-4 bg-white border-b border-gray-100">
          <div className="flex flex-wrap items-center gap-3">
            <div className="text-[13px] text-gray-500 flex items-center gap-2">
              Show 
              <select className="border border-gray-200 rounded-[3px] px-2 py-1 bg-white focus:outline-none">
                <option>10</option>
              </select>
            </div>
            
            <div className="flex items-center gap-0 rounded-[3px] overflow-hidden">
              <ToolbarButton icon={Copy} />
              <ToolbarButton label="CSV" />
              <ToolbarButton label="Excel" />
              <ToolbarButton label="PDF" />
              <ToolbarButton icon={Printer} />
              <ToolbarButton label="Columns" />
            </div>
          </div>
          
          <div className="relative w-full lg:w-64">
            <input 
              type="text" 
              placeholder="Search students..." 
              className="w-full border border-gray-200 rounded-[3px] pl-4 pr-10 py-1.5 text-[13px] focus:outline-none focus:border-[#5a52d7]"
            />
            <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead>
              <tr className="bg-[#f4f2ff] text-[#5a52d7] text-[11px] font-bold tracking-[0.5px] uppercase border-b border-purple-100/50">
                <th className="py-4 px-4 whitespace-nowrap">ADM NO. â†‘â†“</th>
                <th className="py-4 px-4 border-l border-purple-100/60 whitespace-nowrap">ROLL NO. â†‘â†“</th>
                <th className="py-4 px-4 border-l border-purple-100/60">PHOTO</th>
                <th className="py-4 px-4 border-l border-purple-100/60 whitespace-nowrap">NAME â†‘â†“</th>
                <th className="py-4 px-4 border-l border-purple-100/60">CLASS</th>
                <th className="py-4 px-4 border-l border-purple-100/60 text-center">OUTCOME</th>
                <th className="py-4 px-4 border-l border-purple-100/60 text-center">SIBLINGS</th>
                <th className="py-4 px-4 border-l border-purple-100/60 whitespace-nowrap">FATHER NAME â†‘â†“</th>
                <th className="py-4 px-4 border-l border-purple-100/60 whitespace-nowrap">FATHER PHONE â†‘â†“</th>
                <th className="py-4 px-4 border-l border-purple-100/60 text-right">TOTAL ASSIGNED</th>
                <th className="py-4 px-4 border-l border-purple-100/60 text-right">TOTAL DUE</th>
                <th className="py-4 px-4 border-l border-purple-100/60 text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-[#333]">
              {studentsData.map((student, i) => (
                <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-gray-600">{student.adm}</td>
                  <td className="py-3 px-4 border-l border-gray-100 text-gray-600">{student.roll}</td>
                  <td className="py-3 px-4 border-l border-gray-100">
                    <img src={student.img} alt={student.name} className="w-8 h-8 rounded-full border border-gray-200" />
                  </td>
                  <td className="py-3 px-4 border-l border-gray-100">
                    <span className="text-[#3c8dbc] hover:underline cursor-pointer">{student.name}</span>
                  </td>
                  <td className="py-3 px-4 border-l border-gray-100 text-gray-600">{student.class}</td>
                  <td className="py-3 px-4 border-l border-gray-100 text-center">
                    <span className="bg-[#28a745] text-white text-[11px] font-bold px-2 py-0.5 rounded-[3px]">{student.outcome}</span>
                  </td>
                  <td className="py-3 px-4 border-l border-gray-100 text-center">
                    {student.siblings > 0 ? (
                      <span className="bg-[#e8f2fc] text-[#3c8dbc] text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center justify-center gap-1 w-fit mx-auto">
                        <Users className="w-3.5 h-3.5" /> {student.siblings} Siblings
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4 border-l border-gray-100 text-gray-600">{student.father}</td>
                  <td className="py-3 px-4 border-l border-gray-100 text-gray-600">{student.phone}</td>
                  <td className="py-3 px-4 border-l border-gray-100 text-right text-gray-600">
                    â‚¹ {student.assigned.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-4 border-l border-gray-100 text-right">
                    <span className={`px-2 py-0.5 rounded-[3px] text-[11px] font-bold ${
                      student.due === 0 ? 'bg-[#dff0d8] text-[#3c763d]' : 'bg-[#f2dede] text-[#a94442]'
                    }`}>
                      â‚¹ {student.due.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-l border-gray-100 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button className="text-[#28a745] hover:bg-[#dff0d8] p-1.5 rounded-[3px] transition-colors border border-transparent hover:border-[#d6e9c6]">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-[#3c8dbc] hover:bg-[#d9edf7] p-1.5 rounded-[3px] transition-colors border border-transparent hover:border-[#bce8f1]">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-[#dd4b39] hover:bg-[#f2dede] p-1.5 rounded-[3px] transition-colors border border-transparent hover:border-[#ebccd1]">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  );
};

export default StudentList;
