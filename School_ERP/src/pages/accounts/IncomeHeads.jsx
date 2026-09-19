import React, { useState, useMemo, useEffect } from 'react';
import AccountsTabs from '../../components/accounts/AccountsTabs';
import { Link } from 'react-router-dom';
import { 
  Info, LayoutDashboard, Book, ArrowDownToLine, ArrowUpFromLine, 
  Calendar, FileText, Tags, Wallet, FileText as FileTextIcon, 
  Printer, Columns, ChevronDown, List, Grid, Plus, Edit, Trash2, X
} from 'lucide-react';
import { financeService } from '../../api/financeService';

const IncomeHeads = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCount, setShowCount] = useState(10);
  const [viewMode, setViewMode] = useState('list');
  const [editingRecord, setEditingRecord] = useState(null);
  
  const [headsData, setHeadsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeads = async () => {
      try {
        setLoading(true);
        const res = await financeService.getIncomeHeads();
        const data = (res.data || []).map(hd => ({
          id: hd._id,
          name: hd.name,
          description: hd.description || '—'
        }));
        setHeadsData(data);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHeads();
  }, []);

  // Filtering Logic
  const filteredData = useMemo(() => {
    return headsData.filter(item => {
      if (!searchTerm) return true;
      const lowerSearch = searchTerm.toLowerCase();
      return (
        item.name.toLowerCase().includes(lowerSearch) ||
        item.description.toLowerCase().includes(lowerSearch)
      );
    }).slice(0, showCount);
  }, [headsData, searchTerm, showCount]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this head?")) {
      try {
        await financeService.deleteIncomeHead(id);
        setHeadsData(prev => prev.filter(item => item.id !== id));
        alert("Head deleted successfully!");
      } catch (err) {
        alert("Error deleting record");
      }
    }
  };

  const handleEdit = (record) => {
    setEditingRecord({ ...record });
  };

  const saveEdit = (e) => {
    e.preventDefault();
    setHeadsData(prev => prev.map(item => item.id === editingRecord.id ? editingRecord : item));
    setEditingRecord(null);
    alert("Head updated successfully!");
  };

  const exportToCSV = () => {
    if (filteredData.length === 0) {
      alert("No data to export!");
      return;
    }
    const headers = ["NAME", "DESCRIPTION"];
    const rows = filteredData.map(row => [
      `"${row.name}"`, 
      `"${row.description}"`
    ]);
    
    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(e => e.join(",")).join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "income_heads.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    window.print();
  };

  const handleCopy = () => {
    const textToCopy = filteredData.map(row => `${row.name}\t${row.description}`).join('\n');
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert("Table data copied to clipboard!");
    });
  };

  return (
    <div className="p-4 max-w-[1600px] mx-auto bg-gray-50 min-h-screen text-gray-800 pb-20 print:bg-white print:p-0">
      {/* Banner */}
      <div className="bg-[#009b9f] text-white p-2.5 rounded-none text-xs flex items-center gap-2 mb-4 shadow-sm print:hidden">
        <Info className="w-5 h-5 flex-shrink-0" />
        <p>
          <strong>New: academic-session scoping.</strong> Lists and dashboard numbers (students, exams, assessments, homework, notices...) now show the <em>selected academic session</em> only, so totals may look smaller than before — nothing was deleted. Use the session switcher in the top bar to view another year, the "View all sessions" button on lists to see everything, and note that money totals marked "(All Years)" still include every session.
        </p>
      </div>

      {/* Header */}
      <div className="mb-2 flex justify-between items-center print:hidden">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Accounts & Bookkeeping</h1>
          <p className="text-[11px] text-gray-500">Track income, expenses, ledgers and hand audit-ready books to your accountant.</p>
        </div>
      </div>

      {/* Tabs */}
      <AccountsTabs />

      <div className="flex justify-end mb-4 print:hidden">
        <Link 
          to="/accounts/income-heads/add"
          className="flex items-center gap-1.5 bg-[#5b5bcf] hover:bg-blue-700 text-white px-5 py-2 rounded-none text-[13px] font-semibold transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add New Head
        </Link>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden print:border-none print:shadow-none">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center print:hidden">
          <h2 className="text-[15px] font-bold text-[#5b5bcf] flex items-center gap-2">
            <Tags className="w-4 h-4 fill-[#5b5bcf] text-[#5b5bcf]" /> All Income Heads
          </h2>
          <div className="flex bg-gray-100 rounded-none p-0.5">
            <button 
              onClick={() => setViewMode('list')} 
              className={`p-1.5 rounded-none transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-gray-700' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('grid')} 
              className={`p-1.5 rounded-none transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-gray-700' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-4 border-b border-gray-200 print:hidden">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Show</span>
              <select 
                value={showCount}
                onChange={(e) => setShowCount(Number(e.target.value))}
                className="border border-gray-300 rounded-none text-xs px-2 py-1.5 text-gray-700 focus:outline-none focus:border-blue-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <div className="flex bg-white rounded-none border border-gray-300 overflow-hidden ml-2">
                <button onClick={handleCopy} className="px-2.5 py-1.5 text-gray-600 hover:bg-gray-50 border-r border-gray-300 transition-colors" title="Copy">
                  <FileTextIcon className="w-4 h-4" />
                </button>
                <button onClick={exportToCSV} className="px-3 py-1.5 text-[11px] font-medium text-gray-600 hover:bg-gray-50 border-r border-gray-300 transition-colors" title="CSV">
                  CSV
                </button>
                <button onClick={exportToCSV} className="px-3 py-1.5 text-[11px] font-medium text-gray-600 hover:bg-gray-50 border-r border-gray-300 transition-colors" title="Excel (Download CSV)">
                  Excel
                </button>
                <button onClick={exportToPDF} className="px-3 py-1.5 text-[11px] font-medium text-gray-600 hover:bg-gray-50 border-r border-gray-300 transition-colors" title="PDF">
                  PDF
                </button>
                <button onClick={exportToPDF} className="px-2.5 py-1.5 text-gray-600 hover:bg-gray-50 border-r border-gray-300 transition-colors" title="Print">
                  <Printer className="w-4 h-4" />
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 text-[11px] font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                  <Columns className="w-3.5 h-3.5" /> Columns <ChevronDown className="w-3 h-3" />
                </button>
              </div>
            </div>
            
            <div className="relative">
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search heads..." 
                className="border border-gray-300 rounded-none pl-3 pr-8 py-1.5 text-sm w-64 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Print Only Header */}
        <div className="hidden print:block p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-center">Income Heads Report</h2>
          <p className="text-sm text-center text-gray-500">Generated on {new Date().toLocaleDateString()}</p>
        </div>

        <div className="overflow-x-auto">
          {viewMode === 'list' ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8f9fc] text-[10px] font-bold text-[#5b5bcf] uppercase tracking-wider border-b border-gray-200 print:bg-gray-100">
                  <th className="p-4 border-r border-gray-100 w-16 text-center print:border-gray-300">#</th>
                  <th className="p-4 border-r border-gray-100 print:border-gray-300 w-[40%]">NAME</th>
                  <th className="p-4 border-r border-gray-100 print:border-gray-300">DESCRIPTION</th>
                  <th className="p-4 text-center w-24 print:hidden">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="text-[13px]">
                {filteredData.length > 0 ? (
                  filteredData.map((row, index) => (
                    <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors print:border-gray-300">
                      <td className="p-4 border-r border-gray-100 text-center text-gray-500 print:border-gray-300">{index + 1}</td>
                      <td className="p-4 border-r border-gray-100 font-medium text-gray-800 print:border-gray-300">{row.name}</td>
                      <td className="p-4 border-r border-gray-100 text-gray-600 print:border-gray-300">{row.description}</td>
                      <td className="p-4 text-center print:hidden">
                        <div className="flex items-center justify-center gap-3">
                          <button onClick={() => handleEdit(row)} className="text-gray-400 hover:text-blue-600 transition-colors"><Edit className="w-4 h-4" /></button>
                          <button onClick={() => handleDelete(row.id)} className="text-gray-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-6 text-center text-gray-500">No records found matching your search.</td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-50 print:block">
              {filteredData.length > 0 ? (
                filteredData.map(row => (
                  <div key={row.id} className="bg-white border border-gray-200 rounded-none p-4 shadow-sm hover:shadow-md transition-shadow print:mb-4 print:break-inside-avoid">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-gray-800 text-sm truncate pr-2">{row.name}</h3>
                      <span className="text-[10px] px-2 py-0.5 rounded-none font-medium whitespace-nowrap bg-gray-100 text-gray-600">
                        Income Head
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mb-4 h-8 overflow-hidden text-ellipsis line-clamp-2">{row.description}</div>
                    <div className="flex justify-end gap-2 border-t border-gray-100 pt-3 print:hidden">
                      <button onClick={() => handleEdit(row)} className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2.5 py-1.5 rounded-none transition-colors">
                        <Edit className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button onClick={() => handleDelete(row.id)} className="flex items-center gap-1 text-[11px] font-semibold text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-2.5 py-1.5 rounded-none transition-colors">
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full p-6 text-center text-gray-500 bg-white rounded-none border border-gray-200">No records found matching your search.</div>
              )}
            </div>
          )}
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-gray-200 flex justify-between items-center bg-white print:hidden">
          <span className="text-xs text-gray-500">
            Showing 1-{filteredData.length} of {headsData.length}
          </span>
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 flex items-center justify-center border border-[#5b5bcf] rounded-none text-xs font-bold text-white bg-[#5b5bcf]">1</button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingRecord && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-none shadow-xl max-w-md w-full overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="font-bold text-gray-800">Edit Income Head</h2>
              <button onClick={() => setEditingRecord(null)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={saveEdit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Name</label>
                <input 
                  type="text" 
                  value={editingRecord.name}
                  onChange={(e) => setEditingRecord({...editingRecord, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Description</label>
                <textarea 
                  value={editingRecord.description}
                  onChange={(e) => setEditingRecord({...editingRecord, description: e.target.value})}
                  className="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  rows="3"
                ></textarea>
              </div>
              <div className="pt-4 flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setEditingRecord(null)}
                  className="px-4 py-2 border border-gray-300 rounded-none text-sm font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-600 rounded-none text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default IncomeHeads;
