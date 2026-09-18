import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag, Plus, List, Grid, Search, Edit2, Trash2, FileText, Download, Printer, LayoutGrid } from 'lucide-react';

const StudentCategories = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'grid'
  const [searchQuery, setSearchQuery] = useState('');

  const [categories, setCategories] = useState([
    { id: 1, name: 'GENERAL' },
    { id: 2, name: 'OBC' },
    { id: 3, name: 'SC' },
    { id: 4, name: 'ST' },
  ]);

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  const handleEdit = (category) => {
    navigate('/students/categories/add', { state: { editData: category } });
  };

  const handleCopy = () => {
    const text = filteredCategories.map(c => `${c.id}\t${c.name}`).join('\n');
    navigator.clipboard.writeText(`#\tNAME\n${text}`);
    alert('Copied to clipboard!');
  };

  const handleExportCSV = (isExcel = false) => {
    const header = "#,NAME\n";
    const csvContent = filteredCategories.map(c => `"${c.id}","${c.name}"`).join('\n');
    const blob = new Blob([header + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `student_categories.${isExcel ? 'xls' : 'csv'}`);
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
          <h1 className="text-2xl font-bold text-gray-800">Student Categories</h1>
          <p className="text-sm text-gray-500 mt-1">Tag students by category (e.g. General, OBC, SC/ST)</p>
        </div>
        <div>
          <button 
            onClick={() => navigate('/students/categories/add')}
            className="flex items-center gap-2 px-4 py-2 bg-[#5F52FF] text-white rounded-none font-semibold text-sm hover:bg-[#4E41E6] shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" /> Add New Category
          </button>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-none shadow-sm border border-gray-200 flex flex-col flex-1 min-h-0">
        
        {/* Card Header & Toolbar */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[15px] font-bold text-gray-800 flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#5F52FF]" /> All Categories
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
                placeholder="Search categories..." 
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
                  <th className="px-5 py-3 border-r border-gray-200 w-16 text-center">#</th>
                  <th className="px-5 py-3 border-r border-gray-200">NAME</th>
                  <th className="px-5 py-3 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {filteredCategories.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="px-5 py-8 text-center text-gray-500">
                      No categories found.
                    </td>
                  </tr>
                ) : (
                  filteredCategories.map((category) => (
                    <tr key={category.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4 border-r border-gray-100 text-center text-gray-500 text-[13px]">{category.id}</td>
                      <td className="px-5 py-4 border-r border-gray-100 font-medium text-gray-800 text-[13px]">{category.name}</td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-3 text-gray-400">
                          <Edit2 onClick={() => handleEdit(category)} className="w-4 h-4 hover:text-[#5F52FF] cursor-pointer transition-colors" />
                          <Trash2 onClick={() => handleDelete(category.id)} className="w-4 h-4 hover:text-red-500 cursor-pointer transition-colors" />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          ) : (
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-in fade-in duration-300 bg-gray-50/50">
              {filteredCategories.length === 0 ? (
                <div className="col-span-full py-8 text-center text-gray-500">
                  No categories found.
                </div>
              ) : (
                filteredCategories.map((category) => (
                  <div key={category.id} className="bg-white border border-gray-200 rounded-none p-5 shadow-sm hover:shadow-md transition-shadow relative group flex items-center gap-4">
                    <div className="w-12 h-12 rounded-none bg-[#F8F7FF] flex items-center justify-center text-[#5F52FF] font-bold text-xl">
                      {category.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-gray-800 text-[15px]">{category.name}</div>
                      <div className="text-xs text-gray-400 mt-0.5">ID: {category.id}</div>
                    </div>
                    
                    <div className="absolute top-1/2 -translate-y-1/2 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button onClick={() => handleEdit(category)} className="p-2 bg-white hover:bg-gray-50 text-gray-500 hover:text-[#5F52FF] rounded-none shadow-sm border border-gray-200"><Edit2 className="w-3.5 h-3.5" /></button>
                       <button onClick={() => handleDelete(category.id)} className="p-2 bg-white hover:bg-red-50 text-gray-500 hover:text-red-500 rounded-none shadow-sm border border-gray-200"><Trash2 className="w-3.5 h-3.5" /></button>
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
            Showing 1-{filteredCategories.length} of {categories.length}
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

export default StudentCategories;
