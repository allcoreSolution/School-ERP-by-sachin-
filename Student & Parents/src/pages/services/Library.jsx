import React, { useState } from 'react';
import { BookOpen, Search, Star, History, ChevronDown, Copy, FileText, Download, Printer, Columns, LayoutGrid, List, LibraryBig } from 'lucide-react';

const recentlyAdded = [
  { id: 1, title: 'The Very Hungry Caterpillar', author: 'Eric Carle', cover: 'T', tag: 'TEST', stock: '9/10', color: 'bg-[#1f2937]' },
  { id: 2, title: 'Panchatantra Tales', author: 'Vishnu Sharma', cover: 'P', tag: 'TEST', stock: '15/15', readOnline: true, color: 'bg-[#111827]' },
  { id: 3, title: 'Mathematics for Class VI', author: 'R.D. Sharma', cover: 'M', tag: 'TEST', stock: '30/30', color: 'bg-[#0ea5e9]' },
  { id: 4, title: 'Science for Tenth Class', author: 'Lakhmir Singh', cover: 'S', tag: '', stock: '24/25', color: 'bg-[#22c55e]' },
  { id: 5, title: 'Concepts of Physics - Part 1', author: 'H.C. Verma', cover: 'C', tag: '', stock: '20/20', color: 'bg-[#f59e0b]' },
  { id: 6, title: 'Harry Potter and the Sorcerer...', author: 'J.K. Rowling', cover: 'H', tag: '', stock: '8/8', color: 'bg-[#c084fc]' },
  { id: 7, title: 'Charlotte\'s Web', author: 'E.B. White', cover: 'C', tag: '', stock: '5/5', color: 'bg-[#6366f1]' },
  { id: 8, title: 'Oxford English Mini Dictionary', author: 'Oxford Press', cover: 'O', tag: '', stock: '12/12', color: 'bg-[#ec4899]' },
];

export default function Library() {
  const [borrowHistory] = useState([]); // Empty array to show empty state

  return (
    <div className="p-4 md:p-6 max-w-[1400px] mx-auto min-h-screen bg-[#f8f9fa] space-y-6">
      
      {/* Top Banner */}
      <div className="bg-[#4f46e5] text-white p-6 shadow-sm rounded-none">
        <div className="flex items-center gap-3">
           <BookOpen className="w-8 h-8" />
           <div className="flex flex-col">
              <h1 className="text-[22px] font-bold tracking-tight">School Library</h1>
              <p className="text-[13px] opacity-90 mt-0.5">Discover books, track your reading, and explore the catalog</p>
           </div>
        </div>
        
        <div className="flex flex-wrap gap-4 mt-6">
           <div className="bg-white/10 px-8 py-2.5 flex flex-col items-center rounded-none backdrop-blur-sm shadow-sm border border-white/5">
              <span className="text-[22px] font-extrabold tracking-tight">0</span>
              <span className="text-[9.5px] uppercase tracking-widest font-bold opacity-80 mt-1">Issued</span>
           </div>
           <div className="bg-white/10 px-8 py-2.5 flex flex-col items-center rounded-none backdrop-blur-sm shadow-sm border border-white/5">
              <span className="text-[22px] font-extrabold tracking-tight">0</span>
              <span className="text-[9.5px] uppercase tracking-widest font-bold opacity-80 mt-1">Overdue</span>
           </div>
           <div className="bg-white/10 px-8 py-2.5 flex flex-col items-center rounded-none backdrop-blur-sm shadow-sm border border-white/5">
              <span className="text-[22px] font-extrabold tracking-tight">0</span>
              <span className="text-[9.5px] uppercase tracking-widest font-bold opacity-80 mt-1">Total Read</span>
           </div>
        </div>
      </div>

      {/* Search Bar Strip */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 border border-gray-200 shadow-sm rounded-none">
         <select className="border border-gray-300 rounded-none px-3 py-2 text-[13.5px] bg-white min-w-[180px] outline-none focus:border-indigo-500 cursor-pointer text-gray-700">
            <option>All Categories</option>
            <option>Fiction</option>
            <option>Science</option>
            <option>Mathematics</option>
         </select>
         <input 
            type="text" 
            placeholder="Search title, author or ISBN..." 
            className="flex-1 border border-gray-300 rounded-none px-4 py-2 text-[13.5px] outline-none focus:border-indigo-500 text-gray-700 placeholder-gray-400" 
         />
         <button className="bg-[#4f46e5] hover:bg-indigo-700 text-white font-bold text-[13.5px] px-8 py-2 flex items-center justify-center gap-2 rounded-none transition-colors shadow-sm focus:ring-2 focus:ring-indigo-100">
            <Search className="w-4 h-4"/> Search
         </button>
      </div>

      {/* Recently Added Books */}
      <div className="space-y-4">
         <h2 className="text-[15.5px] font-bold text-gray-800 flex items-center gap-2 tracking-tight">
            <Star className="w-4 h-4 text-[#3b82f6] fill-[#3b82f6]" /> Recently Added Books
         </h2>
         
         <div className="flex overflow-x-auto gap-4 pb-4 -mx-1 px-1 custom-scrollbar">
           {recentlyAdded.map(b => (
              <div key={b.id} className="min-w-[170px] max-w-[170px] flex flex-col border border-gray-200 bg-white rounded-none hover:shadow-md transition-shadow cursor-pointer">
                 
                 {/* Fake Book Cover Block */}
                 <div className={`h-[200px] w-full flex items-center justify-center text-white text-[60px] font-black ${b.color}`}>
                    {b.cover}
                 </div>
                 
                 <div className="p-3.5 flex-1 flex flex-col border-t border-gray-100">
                    <h3 className="font-bold text-[13px] text-gray-800 leading-snug mb-1 line-clamp-2" title={b.title}>{b.title}</h3>
                    <p className="text-[11.5px] text-gray-500 mb-3 font-medium truncate">{b.author}</p>
                    
                    <div className="mt-auto pt-1 flex items-center justify-between">
                       {b.tag ? (
                          <span className="bg-purple-50 text-purple-600 text-[9px] font-extrabold px-1.5 py-0.5 rounded-none border border-purple-100 tracking-wide uppercase">
                             {b.tag}
                          </span>
                       ) : <div/>}
                       <span className="text-[11px] font-bold text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded-none">{b.stock}</span>
                    </div>
                 </div>
              </div>
           ))}
         </div>
      </div>

      {/* Browse By Category */}
      <div className="space-y-4 pt-2">
         <h2 className="text-[15.5px] font-bold text-gray-800 flex items-center gap-2 tracking-tight">
            <LayoutGrid className="w-4 h-4 text-[#4f46e5]" /> Browse by Category
         </h2>
         <div className="flex gap-3">
            <div className="border border-gray-200 bg-white px-3.5 py-1.5 flex items-center gap-2.5 cursor-pointer hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm rounded-none">
               <span className="text-[12px] font-bold text-gray-700 tracking-wide">TEST</span>
               <span className="w-4 h-4 rounded-none bg-gray-100 border border-gray-200 text-[9px] flex items-center justify-center font-bold text-gray-500">3</span>
            </div>
         </div>
      </div>

      {/* Borrowing History */}
      <div className="space-y-4 pt-4 pb-10">
         <h2 className="text-[15.5px] font-bold text-gray-800 flex items-center gap-2 tracking-tight">
            <History className="w-4 h-4 text-[#4f46e5]" /> Borrowing History
         </h2>
         
         <div className="bg-white border border-gray-200 rounded-none shadow-sm flex flex-col">
            
            {/* Toolbar */}
            <div className="px-4 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-[#fefefe]">
               <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                     <span className="text-[13px] text-gray-500">Show</span>
                     <button className="border border-gray-300 rounded-none px-2 py-1 flex items-center gap-4 text-[13.5px] hover:bg-gray-50 outline-none">
                       10 <ChevronDown className="w-3.5 h-3.5" />
                     </button>
                  </div>
                  
                  <div className="flex items-center border border-gray-300 rounded-none p-0.5 max-w-full overflow-x-auto">
                     <button className="px-2.5 py-1 text-[13px] text-gray-600 hover:bg-gray-100 flex items-center gap-1.5 outline-none"><Copy className="w-3.5 h-3.5"/> Copy</button>
                     <div className="w-[1px] h-4 bg-gray-300 mx-0.5"></div>
                     <button className="px-2.5 py-1 text-[13px] text-gray-600 hover:bg-gray-100 flex items-center gap-1.5 outline-none"><FileText className="w-3.5 h-3.5"/> CSV</button>
                     <div className="w-[1px] h-4 bg-gray-300 mx-0.5"></div>
                     <button className="px-2.5 py-1 text-[13px] text-gray-600 hover:bg-gray-100 flex items-center gap-1.5 outline-none"><FileText className="w-3.5 h-3.5"/> Excel</button>
                     <div className="w-[1px] h-4 bg-gray-300 mx-0.5"></div>
                     <button className="px-2.5 py-1 text-[13px] text-gray-600 hover:bg-gray-100 flex items-center gap-1.5 outline-none"><Download className="w-3.5 h-3.5"/> PDF</button>
                     <div className="w-[1px] h-4 bg-gray-300 mx-0.5"></div>
                     <button className="px-2.5 py-1 text-[13px] text-gray-600 hover:bg-gray-100 flex items-center gap-1.5 outline-none"><Printer className="w-3.5 h-3.5"/> Print</button>
                     <div className="w-[1px] h-4 bg-gray-300 mx-0.5"></div>
                     <button className="px-2.5 py-1 text-[13px] text-gray-600 hover:bg-gray-100 flex items-center gap-2 outline-none"><Columns className="w-3.5 h-3.5 text-indigo-500"/> Columns <ChevronDown className="w-3.5 h-3.5"/></button>
                  </div>
               </div>

               <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
                  <div className="relative w-full md:w-auto flex-1">
                     <input 
                        type="text" 
                        placeholder="Search history..." 
                        className="border border-gray-300 rounded-none outline-none py-1.5 pl-3 pr-8 text-[13px] w-full md:w-[220px] text-gray-700 placeholder-gray-400 focus:border-indigo-500" 
                     />
                     <Search className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  <div className="flex items-center border border-gray-200 rounded-none bg-gray-50/50 p-0.5 flex-shrink-0">
                     <button className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded-none shadow-sm"><List className="w-[14px] h-[14px]"/></button>
                     <button className="px-2 py-1 text-gray-400 hover:text-gray-600 rounded-none"><LayoutGrid className="w-[14px] h-[14px]"/></button>
                  </div>
               </div>
            </div>

            {/* Table Header */}
            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead className="bg-[#f2f4ff]">
                     <tr>
                        <th className="px-4 py-3 border border-gray-200 text-left text-[10px] uppercase font-bold text-[#4f46e5] tracking-widest w-12">#</th>
                        <th className="px-4 py-3 border border-gray-200 text-left text-[10px] uppercase font-bold text-[#4f46e5] tracking-widest flex items-center justify-between">BOOK <span className="text-[8px] opacity-50">↑↓</span></th>
                        <th className="px-4 py-3 border border-gray-200 text-left text-[10px] uppercase font-bold text-[#4f46e5] tracking-widest w-40 flex-row items-center justify-between">ISSUED <span className="text-[8px] opacity-50 float-right mt-0.5">↑↓</span></th>
                        <th className="px-4 py-3 border border-gray-200 text-left text-[10px] uppercase font-bold text-[#4f46e5] tracking-widest w-40 flex-row items-center justify-between">RETURNED <span className="text-[8px] opacity-50 float-right mt-0.5">↑↓</span></th>
                        <th className="px-4 py-3 border border-gray-200 text-left text-[10px] uppercase font-bold text-[#4f46e5] tracking-widest w-32 flex-row items-center justify-between">FINE <span className="text-[8px] opacity-50 float-right mt-0.5">↑↓</span></th>
                     </tr>
                  </thead>
               </table>
            </div>
            
            {/* Table Empty State */}
            <div className="py-24 flex flex-col items-center justify-center border-t-0 border border-gray-200 bg-white">
               <div className="w-16 h-16 rounded-none bg-[#f8f9ff] flex items-center justify-center mb-4 border border-indigo-100">
                  <LibraryBig className="w-8 h-8 text-[#4f46e5]" strokeWidth={1.5} />
               </div>
               <h3 className="text-[15px] font-bold text-gray-800 mb-1">No borrowing history yet</h3>
               <p className="text-[13px] text-gray-500 font-medium">Books your child has borrowed and returned will be listed here.</p>
            </div>
            
            {/* Footer */}
            <div className="px-4 py-3 border-t border-gray-200">
               <span className="text-[12px] text-gray-500">No records</span>
            </div>
         </div>
      </div>
      
    </div>
  );
}
