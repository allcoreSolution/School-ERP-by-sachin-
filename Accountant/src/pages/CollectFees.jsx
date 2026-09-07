import React from 'react';
import { 
  Filter, X, Zap, DollarSign, List, Grid, Copy, FileSpreadsheet, 
  File, Printer, Columns, Search, HandCoins
} from 'lucide-react';

const studentsData = [
  { id: 1, adm: 'YISADM202620260014', name: 'nn tt', class: 'Class VII (A)', due: 32800.00 },
  { id: 2, adm: 'YISADM-054', name: 'Chhavi Desai', class: 'Class I (A)', due: 32000.00 },
  { id: 3, adm: 'YISADM-018', name: 'Daksh Tiwari', class: 'Nursery (A)', due: 30800.00 },
  { id: 4, adm: 'YISADM-019', name: 'Pihu Nair', class: 'Nursery (A)', due: 30800.00 },
];

const ActionButton = ({ icon: Icon, label, primary = false, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-[3px] border text-[13px] font-semibold transition-colors whitespace-nowrap
    ${primary 
      ? 'bg-[#5a52d7] border-[#5a52d7] text-white hover:bg-[#4a42c0]' 
      : 'bg-white border-gray-200 text-[#555] hover:bg-gray-50'}`}
  >
    {Icon && <Icon className="w-4 h-4" />}
    {label}
  </button>
);

const ToolbarButton = ({ label, icon: Icon }) => (
  <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-gray-600 text-[13px] bg-white hover:bg-gray-50 transition-colors">
    {Icon && <Icon className="w-3.5 h-3.5" />}
    {label}
  </button>
);

const CollectFees = () => {
  return (
    <div className="min-h-screen bg-[#ecf0f5] text-[#333] p-4 sm:p-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-start mb-5 gap-4">
        <h1 className="text-[24px] font-bold text-[#333] leading-tight">Collect Student Fees</h1>
        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-[3px] bg-white text-gray-700 text-[12px] font-bold hover:bg-gray-50 transition-colors">
          <Zap className="w-4 h-4 text-gray-600" />
          Rapid Mode (Tally Style)
        </button>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-[3px] border border-gray-200 shadow-sm mb-5">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <Filter className="w-5 h-5 text-[#5a52d7]" />
          <h2 className="text-[15px] font-bold text-[#333]">Filter Students with Due Fees</h2>
        </div>
        
        <div className="p-5 flex flex-col md:flex-row items-end gap-4 overflow-x-auto">
          <div className="flex-1 w-full min-w-[200px]">
            <label className="block text-[11px] font-bold text-[#333] uppercase tracking-wider mb-2">Class</label>
            <select className="w-full border border-gray-200 rounded-[3px] px-3 py-2 text-[13px] text-gray-500 focus:outline-none focus:border-gray-400">
              <option>-- All Classes --</option>
            </select>
          </div>
          
          <div className="flex-1 w-full min-w-[200px]">
            <label className="block text-[11px] font-bold text-[#333] uppercase tracking-wider mb-2">Section</label>
            <select className="w-full border border-gray-200 rounded-[3px] px-3 py-2 text-[13px] text-gray-500 focus:outline-none focus:border-gray-400">
              <option>-- All Sections --</option>
            </select>
          </div>
          
          <div className="flex-1 w-full min-w-[300px]">
            <label className="block text-[11px] font-bold text-[#333] uppercase tracking-wider mb-2">Search by Admission No or Name</label>
            <input 
              type="text" 
              placeholder="Type name or admission no..." 
              className="w-full border border-gray-200 rounded-[3px] px-3 py-2 text-[13px] text-[#333] focus:outline-none focus:border-[#5a52d7]"
            />
          </div>
          
          <div className="flex gap-2">
            <ActionButton primary label="Filter" onClick={() => alert('Filter applied')} />
            <ActionButton label="Clear" />
          </div>
        </div>
      </div>

      {/* Table Panel */}
      <div className="bg-white rounded-[3px] border border-gray-200 shadow-sm flex flex-col">
        
        {/* Table Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-[#fefefe]">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-[#5a52d7]" />
            <h2 className="text-[16px] font-bold text-[#333]">Students with Due Fees</h2>
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
              placeholder="Search..." 
              className="w-full border border-gray-200 rounded-[3px] pl-3 pr-10 py-1.5 text-[13px] focus:outline-none focus:border-[#5a52d7]"
            />
          </div>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-[#f4f2ff] text-[#5a52d7] text-[12px] font-bold uppercase border-b border-purple-100/50">
                <th className="py-4 px-5">ADMISSION NO <span className="text-[10px] text-purple-300 ml-1">↑↓</span></th>
                <th className="py-4 px-5 border-l border-purple-100/60">STUDENT NAME <span className="text-[10px] text-purple-300 ml-1">↑↓</span></th>
                <th className="py-4 px-5 border-l border-purple-100/60">CLASS (SECTION) <span className="text-[10px] text-purple-300 ml-1">↑↓</span></th>
                <th className="py-4 px-5 border-l border-purple-100/60">TOTAL DUE AMOUNT <span className="text-[10px] text-purple-300 ml-1">↑↓</span></th>
                <th className="py-4 px-5 border-l border-purple-100/60 text-center w-[180px]">ACTION</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-[#333]">
              {studentsData.map((student) => (
                <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-5 text-gray-600">{student.adm}</td>
                  <td className="py-4 px-5 border-l border-gray-100 text-gray-700">{student.name}</td>
                  <td className="py-4 px-5 border-l border-gray-100 text-gray-600">{student.class}</td>
                  <td className="py-4 px-5 border-l border-gray-100 text-gray-700">
                    ₹{student.due.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-2 px-5 border-l border-gray-100 text-center">
                    <ActionButton 
                      primary 
                      icon={HandCoins} 
                      label="View & Collect" 
                      onClick={() => alert(`Collecting fees for ${student.name}`)}
                    />
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

export default CollectFees;
