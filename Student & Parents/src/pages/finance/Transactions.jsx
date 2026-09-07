import React, { useState, useRef, useEffect } from 'react';
import { List, LayoutGrid, ChevronDown, Copy, FileText, Download, Printer, Columns, Search, FileSymlink, ReceiptText } from 'lucide-react';

const rawHistory = [
  { id: 'FEE_APP_594_1788347212', date: '02 Sep, 2026', group: 'Transport Fee Monthly', mode: 'Online', amount: 12000, status: 'Incomplete' },
  { id: 'FEE_44_1788322783', date: '02 Sep, 2026', group: 'Admission Fees 2026-2027', mode: 'Online', amount: 1000, status: 'Incomplete' },
  { id: 'FEE_84_1788312547', date: '02 Sep, 2026', group: 'Transport 300 2026-2027', mode: 'Online', amount: 300, status: 'Incomplete' },
  { id: 'YIS-2026-2027-26-0029', date: '02 Sep, 2026', group: '4th Installment Fees 2026-2027', mode: 'Cash', amount: 20000, status: 'Successful', receipt: true },
  { id: 'YIS-2026-2027-26-0028', date: '02 Sep, 2026', group: 'Admission Fees 2026-2027', mode: 'Cash', amount: 13300, status: 'Reverted', note: 'Reversed by school — contact the office' },
  { id: 'YIS-2026-2027-26-0030', date: '02 Sep, 2026', group: 'Admission Fees 2026-2027', mode: 'Cash', amount: 13300, status: 'Successful', receipt: true },
  { id: 'FEE_APP_594_1788263423', date: '01 Sep, 2026', group: 'Transport Fee Monthly', mode: 'Online', amount: 12000, status: 'Incomplete' },
  { id: 'FEE_44_1788260302', date: '01 Sep, 2026', group: 'Admission Fees 2026-2027', mode: 'Online', amount: 1000, status: 'Incomplete' },
  { id: 'FEE_APP_594_1785769848', date: '03 Aug, 2026', group: 'Transport Fee Monthly', mode: 'Online', amount: 12000, status: 'Incomplete' },
  { id: 'FEE_APP_594_1785754297', date: '03 Aug, 2026', group: 'Transport Fee Monthly', mode: 'Online', amount: 12000, status: 'Failed' },
  { id: 'TRX_884_1785753000', date: '10 Jul, 2026', group: 'Tuition Term 1', mode: 'NetBank', amount: 45000, status: 'Successful', receipt: true },
  { id: 'TRX_112_1785710000', date: '05 Jun, 2026', group: 'Uniform Charges', mode: 'Cash', amount: 2500, status: 'Successful', receipt: true },
];

export default function Transactions() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  
  // 1. View Toggle State (list vs grid)
  const [view, setView] = useState('list');
  
  // 2. Columns Toggle State
  const [showColsMenu, setShowColsMenu] = useState(false);
  const colMenuRef = useRef(null);
  const [cols, setCols] = useState({
    id: true, date: true, group: true, mode: true, amount: true, status: true, actions: true
  });

  // Close cols menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (colMenuRef.current && !colMenuRef.current.contains(event.target)) setShowColsMenu(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filtering Logic
  const filtered = rawHistory.filter(t => 
    t.id.toLowerCase().includes(search.toLowerCase()) || 
    t.group.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination Logic
  const totalPages = Math.ceil(filtered.length / perPage) || 1;
  const startIdx = (page - 1) * perPage;
  const currentData = filtered.slice(startIdx, startIdx + perPage);

  // Function: CSV Export
  const downloadCSV = () => {
    const headers = ['ID/RECEIPT NO', 'DATE', 'FEE GROUP', 'PAYMENT MODE', 'AMOUNT PAID', 'STATUS'];
    const rows = filtered.map(t => [t.id, `"${t.date}"`, `"${t.group}"`, t.mode, t.amount, t.status]);
    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'transactions_history.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function: Copy to Clipboard
  const handleCopy = () => {
    const text = filtered.map(t => `${t.id}\t${t.date}\t${t.group}\t${t.amount}\t${t.status}`).join('\n');
    navigator.clipboard.writeText(text);
    alert('Table data copied to clipboard!');
  };

  // Function: Print Page
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-4 md:p-6 max-w-[1400px] mx-auto space-y-5 bg-[#f8f9fa] min-h-screen">
      <h1 className="text-[22px] font-bold text-[#1f2937] tracking-tight">Payment History for Rajesh Singh</h1>
      
      <div className="bg-white border border-gray-200 rounded-none overflow-hidden shadow-sm">
        
        {/* Header Title & VIEW TOGGLE */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
           <div className="flex items-center gap-2">
              <FileSymlink className="w-5 h-5 text-indigo-600" />
              <h2 className="text-[14.5px] font-bold text-[#1f2937]">All Transactions <span className="font-normal text-gray-400 text-[12px]">(Online & Offline)</span></h2>
           </div>
           
           {/* VIEW TOGGLE BUTTONS */}
           <div className="flex items-center border border-gray-200 rounded-none bg-gray-50/50 p-0.5">
             <button 
                onClick={() => setView('list')}
                className={`px-3 py-1 rounded-none shadow-sm transition-colors ${view === 'list' ? 'bg-[#eeefff] text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
             >
                <List className="w-[15px] h-[15px]"/>
             </button>
             <button 
                onClick={() => setView('grid')}
                className={`px-3 py-1 rounded-none shadow-sm transition-colors ${view === 'grid' ? 'bg-[#eeefff] text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
             >
                <LayoutGrid className="w-[15px] h-[15px]"/>
             </button>
           </div>
        </div>

        {/* Toolbar & SEARCH & COLUMNS */}
        <div className="px-4 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-[#fefefe]">
           <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                 <span className="text-[13px] text-gray-500">Show</span>
                 <select 
                    value={perPage} 
                    onChange={e => {setPerPage(Number(e.target.value)); setPage(1);}}
                    className="border border-gray-300 rounded-none px-2 py-1 text-[13.5px] hover:bg-gray-50 outline-none cursor-pointer focus:border-indigo-500"
                 >
                   <option value={10}>10</option>
                   <option value={20}>20</option>
                   <option value={50}>50</option>
                 </select>
              </div>
              
              <div className="flex items-center border border-gray-300 rounded-none p-0.5 max-w-full overflow-x-visible relative">
                 <button onClick={handleCopy} className="px-2.5 py-1 text-[13px] text-gray-600 hover:bg-gray-100 flex items-center gap-1.5 focus:outline-none focus:bg-gray-100"><Copy className="w-3.5 h-3.5"/> Copy</button>
                 <div className="w-[1px] h-4 bg-gray-300 mx-0.5"></div>
                 <button onClick={downloadCSV} className="px-2.5 py-1 text-[13px] text-gray-600 hover:bg-gray-100 flex items-center gap-1.5 focus:outline-none focus:bg-gray-100"><FileText className="w-3.5 h-3.5"/> CSV</button>
                 <div className="w-[1px] h-4 bg-gray-300 mx-0.5"></div>
                 <button onClick={downloadCSV} className="px-2.5 py-1 text-[13px] text-gray-600 hover:bg-gray-100 flex items-center gap-1.5 focus:outline-none focus:bg-gray-100"><FileText className="w-3.5 h-3.5"/> Excel</button>
                 <div className="w-[1px] h-4 bg-gray-300 mx-0.5"></div>
                 <button onClick={handlePrint} className="px-2.5 py-1 text-[13px] text-gray-600 hover:bg-gray-100 flex items-center gap-1.5 focus:outline-none focus:bg-gray-100"><Download className="w-3.5 h-3.5"/> PDF</button>
                 <div className="w-[1px] h-4 bg-gray-300 mx-0.5"></div>
                 <button onClick={handlePrint} className="px-2.5 py-1 text-[13px] text-gray-600 hover:bg-gray-100 flex items-center gap-1.5 focus:outline-none focus:bg-gray-100"><Printer className="w-3.5 h-3.5"/> Print</button>
                 <div className="w-[1px] h-4 bg-gray-300 mx-0.5"></div>
                 
                 {/* COLUMNS VISIBILITY MENU */}
                 <div className="relative" ref={colMenuRef}>
                   <button 
                      onClick={() => setShowColsMenu(!showColsMenu)} 
                      className={`px-2.5 py-1 text-[13px] flex items-center gap-2 focus:outline-none transition-colors border border-transparent ${showColsMenu ? 'bg-[#eeefff] text-indigo-600' : 'text-gray-600 hover:bg-gray-100'}`}
                   >
                      <Columns className={`w-3.5 h-3.5 ${showColsMenu ? 'text-indigo-600' : 'text-indigo-500'}`}/> Columns <ChevronDown className="w-3.5 h-3.5"/>
                   </button>
                   {showColsMenu && (
                     <div className="absolute top-full right-0 mt-1.5 w-44 bg-white border border-gray-200 shadow-xl z-50 py-1">
                        {Object.keys(cols).map(k => (
                          <label key={k} className="flex items-center gap-2.5 px-3 py-1.5 hover:bg-gray-50 cursor-pointer text-[12.5px] text-gray-700">
                             <input 
                                type="checkbox" 
                                checked={cols[k]} 
                                onChange={() => setCols({...cols, [k]: !cols[k]})} 
                                className="w-3.5 h-3.5 text-indigo-600 rounded-none focus:ring-0 cursor-pointer"
                             />
                             <span className="uppercase font-medium tracking-wide">{k}</span>
                          </label>
                        ))}
                     </div>
                   )}
                 </div>
              </div>
           </div>

           {/* SEARCH FILTER */}
           <div className="relative w-full md:w-auto">
              <input 
                 type="text" 
                 placeholder="Search transactions..." 
                 value={search}
                 onChange={e => {setSearch(e.target.value); setPage(1);}}
                 className="border border-gray-300 rounded-none outline-none py-1.5 pl-3 pr-9 text-[13px] w-full md:w-[240px] text-gray-700 placeholder-gray-400 focus:border-indigo-400" 
              />
              <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
           </div>
        </div>

        {/* Content Render based on view mode */}
        {view === 'grid' ? (
           <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 bg-gray-50/50 print:block print:w-full">
             {currentData.length > 0 ? currentData.map((t) => (
                <div key={t.id} className="bg-white border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between print:mb-4 print:break-inside-avoid">
                   <div>
                     <div className="flex justify-between items-start mb-2 border-b border-gray-100 pb-2">
                        <div className="w-[70%]">
                           <span className="text-[9px] text-gray-400 uppercase font-bold tracking-widest block mb-0.5">ID / RECEIPT NO</span>
                           <span className="font-bold text-[#4f46e5] text-[13px] break-all">{t.id}</span>
                        </div>
                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded flex-shrink-0 ${t.status === 'Successful' ? 'bg-[#dcfce7] text-[#166534]' : t.status === 'Failed' ? 'bg-[#fee2e2] text-[#991b1b]' : 'bg-[#f3f4f6] text-gray-500'}`}>
                           {t.status}
                        </span>
                     </div>
                     <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest block mb-0.5">FEE GROUP</span>
                     <p className="text-[13px] text-gray-700 font-medium mb-3">{t.group}</p>
                     
                     <div className="flex items-center justify-between mb-4">
                        <div>
                           <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest block mb-0.5">DATE</span>
                           <span className="text-[12.5px] text-gray-500 block">{t.date}</span>
                        </div>
                        <div className="text-right">
                           <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest block mb-0.5">AMOUNT</span>
                           <span className="font-black text-gray-900 text-[15px]">₹ {t.amount.toLocaleString()}</span>
                        </div>
                     </div>
                   </div>
                   
                   <div className="pt-3 border-t border-gray-50 flex items-center justify-between">
                     <span className={`inline-block px-2 py-0.5 border text-[10px] font-bold rounded-sm ${t.mode==='Online'?'text-green-600 border-green-200':'text-blue-500 border-blue-200'}`}>{t.mode}</span>
                     {t.receipt ? (
                        <button className="text-[11px] font-bold text-gray-700 bg-white border border-gray-200 px-2.5 py-1.5 flex items-center gap-1.5 hover:bg-gray-50 shadow-sm"><ReceiptText className="w-3.5 h-3.5 text-gray-500"/> Receipt </button>
                     ) : (
                        <span className="text-[10px] text-gray-400 italic">No Actions</span>
                     )}
                   </div>
                </div>
             )) : (
                <div className="col-span-full py-10 text-center text-gray-500 text-[13px] border border-gray-200 bg-white">
                   No matching transactions found.
                </div>
             )}
           </div>
        ) : (
          <div className="overflow-x-auto print:overflow-visible">
            <table className="w-full text-left border-collapse min-w-[1000px] border border-gray-200">
              <thead className="bg-[#f2f4ff]">
                <tr>
                  <th className="px-3 py-3 border border-gray-200 text-center text-[10px] uppercase font-bold text-[#4f46e5] tracking-widest w-12">#</th>
                  {cols.id && <th className="px-4 py-3 border border-gray-200 text-left text-[10px] uppercase font-bold text-[#4f46e5] tracking-widest">ID / RECEIPT NO</th>}
                  {cols.date && <th className="px-4 py-3 border border-gray-200 text-left text-[10px] uppercase font-bold text-[#4f46e5] tracking-widest w-28">DATE</th>}
                  {cols.group && <th className="px-4 py-3 border border-gray-200 text-left text-[10px] uppercase font-bold text-[#4f46e5] tracking-widest">FEE GROUP</th>}
                  {cols.mode && <th className="px-4 py-3 border border-gray-200 text-center text-[10px] uppercase font-bold text-[#4f46e5] tracking-widest w-32">PAYMENT MODE</th>}
                  {cols.amount && <th className="px-4 py-3 border border-gray-200 text-right text-[10px] uppercase font-bold text-[#4f46e5] tracking-widest w-32">AMOUNT PAID</th>}
                  {cols.status && <th className="px-4 py-3 border border-gray-200 text-center text-[10px] uppercase font-bold text-[#4f46e5] tracking-widest w-32">STATUS</th>}
                  {cols.actions && <th className="px-4 py-3 border border-gray-200 text-left text-[10px] uppercase font-bold text-[#4f46e5] tracking-widest">ACTIONS</th>}
                </tr>
              </thead>
              <tbody className="bg-white">
                {currentData.length > 0 ? currentData.map((t, idx) => (
                  <tr key={t.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="px-3 py-4 border border-gray-200 text-center text-[12px] text-gray-400">{startIdx + idx + 1}</td>
                    {cols.id && <td className="px-4 py-4 border border-gray-200 font-bold text-[#4f46e5] text-[12.5px] cursor-pointer hover:underline">{t.id}</td>}
                    {cols.date && <td className="px-4 py-4 border border-gray-200 text-gray-500 text-[12.5px] whitespace-nowrap">{t.date}</td>}
                    {cols.group && <td className="px-4 py-4 border border-gray-200 text-gray-600 text-[12.5px]">{t.group}</td>}
                    {cols.mode && (
                      <td className="px-4 py-4 border border-gray-200 text-center">
                        <span className={`inline-block px-2 py-0.5 border text-[10px] font-bold rounded-sm bg-transparent ${t.mode === 'Online' ? 'text-green-600 border-green-200' : 'text-blue-500 border-blue-200'}`}>{t.mode}</span>
                      </td>
                    )}
                    {cols.amount && (
                      <td className="px-4 py-4 border border-gray-200 text-right font-black text-gray-800 text-[13px]">
                        ₹ {t.amount.toLocaleString(undefined, {minimumFractionDigits:2})}
                      </td>
                    )}
                    {cols.status && (
                      <td className="px-4 py-4 border border-gray-200 text-center">
                        <span className={`inline-block px-2.5 py-0.5 text-[10.5px] font-bold rounded-lg ${t.status === 'Successful' ? 'bg-[#dcfce7] text-[#166534]' : t.status === 'Failed' ? 'bg-[#fee2e2] text-[#991b1b]' : 'bg-[#f3f4f6] text-gray-500'}`}>{t.status}</span>
                      </td>
                    )}
                    {cols.actions && (
                      <td className="px-4 py-4 border border-gray-200 text-[12px]">
                        {t.receipt ? (
                            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-none bg-white text-gray-700 font-bold hover:bg-gray-50 shadow-sm transition-colors text-xs tracking-wide mx-auto md:mx-0">
                              <ReceiptText className="w-3.5 h-3.5 opacity-70" /> Receipt
                            </button>
                        ) : t.note ? (
                            <span className="text-gray-400 italic text-[11px] block">{t.note}</span>
                        ) : (
                            <span className="text-gray-400 font-bold ml-2 block">—</span>
                        )}
                      </td>
                    )}
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={Object.values(cols).filter(Boolean).length + 1} className="px-4 py-10 text-center text-gray-500 text-[13px] border border-gray-200">
                        No matching transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        <div className="px-4 py-3 flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 bg-white print:hidden">
           <span className="text-[12px] text-gray-500">
             Showing {filtered.length > 0 ? startIdx + 1 : 0}-{Math.min(startIdx + perPage, filtered.length)} of {filtered.length}
           </span>
           <div className="flex items-center gap-1">
             <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-7 h-7 flex items-center justify-center text-xs font-bold text-gray-600 hover:bg-gray-100 disabled:opacity-30 rounded-none border border-transparent disabled:cursor-not-allowed cursor-pointer"
             >
                &lt;
             </button>

             {Array.from({ length: totalPages }, (_, i) => (
                <button 
                   key={i}
                   onClick={() => setPage(i + 1)}
                   className={`w-7 h-7 flex items-center justify-center text-xs font-bold rounded-none cursor-pointer ${page === i + 1 ? 'text-white bg-indigo-600' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                   {i + 1}
                </button>
             ))}

             <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-7 h-7 flex items-center justify-center text-xs font-bold text-gray-600 hover:bg-gray-100 disabled:opacity-30 rounded-none border border-transparent disabled:cursor-not-allowed cursor-pointer"
             >
                &gt;
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}
