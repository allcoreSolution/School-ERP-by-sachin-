import React, { useState, useEffect } from 'react';
import { 
  Book, ArrowUpRight, AlertCircle, FileDown, Plus, LayoutGrid, HelpCircle, 
  ArrowLeftRight, Tags, Settings, FileText, Search, Eye, Edit2, BarChart2,
  Bell, ChevronDown, Share2, ArrowRight, Clock, ScanBarcode, Printer, User,
  Calendar, RotateCcw, Zap, CreditCard, CheckCircle, Hourglass, Check, 
  BookOpen, X, Compass, Users, Columns
} from 'lucide-react';
import { libraryService } from '../api/libraryService';

const CATALOG_DATA = [
  { id: 1, initial: 'P', color: 'bg-blue-500', title: 'PC HARDWARE', isbn: 'N/A', author: 'Unknown', publisher: '—', category: 'GENERAL', status: 'Available', qty: 1 },
  { id: 2, cover: true, title: 'The Very Hungry Caterpillar', isbn: '9780241003008', author: 'Eric Carle', publisher: 'Penguin Books', category: 'TEST', status: 'Available', qty: 9 },
  { id: 3, cover: true, title: 'Panchatantra Tales', isbn: '9788170110076', author: 'Vishnu Sharma', publisher: 'Childrens Book Trust', category: 'TEST', status: 'Available', qty: 15 },
  { id: 4, initial: 'M', color: 'bg-blue-500', title: 'Mathematics for Class VI', isbn: '9789383182441', author: 'R.D. Sharma', publisher: 'Dhanpat Rai & Co.', category: 'TEST', status: 'Available', qty: 29 },
  { id: 5, initial: 'S', color: 'bg-blue-500', title: 'Science for Tenth Class', isbn: '9789352530281', author: 'Lakhmir Singh', publisher: 'S. Chand', category: 'GENERAL', status: 'Available', qty: 24 },
];

export default function LibraryDashboard({ initialTab = 'Overview' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isAdding, setIsAdding] = useState(false);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    setActiveTab(initialTab);
    setIsAdding(false);
    setIsAddingCategory(false);
    fetchBooks();
  }, [initialTab]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await libraryService.getBooks();
      const mapped = (res?.data || res || []).map((b, i) => ({
        id: b._id || i,
        initial: (b.title || 'U').charAt(0).toUpperCase(),
        title: b.title || 'Untitled Book',
        author: b.author || 'Unknown',
        qty: b.quantity || 1,
        avail: b.available || 1
      }));
      setBooks(mapped);
    } catch (err) {
      console.error(err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const renderTabs = () => {
    const tabs = [
      { name: 'Overview', icon: LayoutGrid },
      { name: 'Guide', icon: HelpCircle },
      { name: 'Issue/Return Book', icon: ArrowLeftRight },
      { name: 'Categories', icon: Tags },
      { name: 'Manage Books', icon: Settings },
      { name: 'Book Requests', icon: FileText },
    ];

    return (
      <div className="flex space-x-6 border-b border-gray-200 mb-6 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.name;
          const Icon = tab.icon;
          return (
            <button
              key={tab.name}
              onClick={() => {
                setActiveTab(tab.name);
                setIsAdding(false);
                setIsAddingCategory(false);
              }}
              className={`pb-3 text-sm font-bold flex items-center whitespace-nowrap transition-colors border-b-2 ${
                isActive && !isAdding && !isAddingCategory
                  ? 'border-[#2d3748] text-[#2d3748]' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {tab.name}
            </button>
          );
        })}
      </div>
    );
  };

  if (isAdding) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Add New Book</h1>
          <p className="text-sm text-gray-500 mt-1">Search by ISBN to fill the details automatically, or enter them by hand</p>
        </div>

        {renderTabs()}

        <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden flex flex-col mb-6">
          <div className="p-4 border-b border-gray-100 flex items-center bg-[#f8f9fa]">
            <Book className="w-4 h-4 text-[#5542f6] mr-2" />
            <h2 className="text-sm font-bold text-[#5542f6]">Book Details</h2>
          </div>
          
          <div className="p-6">
            <div className="bg-[#f3f0ff] border border-[#e2e3ff] rounded-none p-4 mb-6">
              <div className="flex items-center text-[#5542f6] font-bold text-sm mb-3">
                <span className="w-5 h-5 bg-[#5542f6] text-white rounded-none flex items-center justify-center mr-2 text-xs">G</span>
                Auto-Fill from Google Books
              </div>
              <div className="flex">
                <input 
                  type="text" 
                  placeholder="Enter ISBN number or Book Title to auto-fill..."
                  className="flex-1 border border-r-0 border-[#d0d4e4] rounded-l p-2.5 text-sm outline-none focus:border-[#5542f6]"
                />
                <button className="px-6 bg-[#5542f6] text-white rounded-r font-bold text-sm hover:bg-[#4a3ae0]">
                  <Search className="w-4 h-4 inline mr-1" /> Fetch
                </button>
              </div>
              <p className="text-[11px] text-[#6b7280] mt-2">Type an ISBN (e.g., 9780141036144) or title, then click Fetch to auto-populate all fields.</p>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">Book Title <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none focus:border-gray-400" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">Category</label>
                  <select className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none focus:border-gray-400 bg-white">
                    <option>-- All Categories --</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">Class Restriction (optional)</label>
                  <select className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none focus:border-gray-400 bg-white">
                    <option>-- All Classes --</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">Author</label>
                  <input type="text" className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none focus:border-gray-400" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">Publisher</label>
                  <input type="text" className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none focus:border-gray-400" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">ISBN Number</label>
                  <input type="text" className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none focus:border-gray-400" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">Publication Year</label>
                  <input type="text" className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none focus:border-gray-400" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">Edition</label>
                  <input type="text" className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none focus:border-gray-400" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">Language</label>
                  <input type="text" className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none focus:border-gray-400" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">Page Count</label>
                  <input type="text" className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none focus:border-gray-400" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">Subject / Genre</label>
                  <input type="text" className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none focus:border-gray-400" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">Rack Number</label>
                  <input type="text" className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none focus:border-gray-400" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">Quantity <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none focus:border-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1">Description</label>
                <textarea 
                  placeholder="Book description or synopsis..."
                  className="w-full h-24 border border-gray-300 rounded-none p-3 text-sm outline-none focus:border-gray-400 resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1">Upload Cover Image</label>
                <div className="flex">
                  <div className="flex-1 border border-r-0 border-gray-300 rounded-l p-2 text-sm text-gray-500 bg-white">
                    Choose file
                  </div>
                  <button className="px-4 border border-gray-300 bg-gray-50 rounded-r text-sm font-bold text-gray-700 hover:bg-gray-100">
                    Browse
                  </button>
                </div>
                <p className="text-[11px] text-gray-500 mt-1">Leave blank if using the Google Books cover image.</p>
              </div>

              <div className="pt-2 flex items-center">
                <input type="checkbox" className="w-4 h-4 text-[#5542f6] border-gray-300 rounded-none mr-2" />
                <label className="text-[13px] font-bold text-gray-700">E-Library / Digital Book</label>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-gray-100 flex justify-end space-x-3 bg-gray-50">
            <button 
              onClick={() => setIsAdding(false)}
              className="px-6 py-2 border border-gray-300 text-gray-700 bg-white rounded-none text-sm font-bold hover:bg-gray-50 shadow-sm"
            >
              Cancel
            </button>
            <button className="px-6 py-2 bg-[#f39c12] text-white rounded-none text-sm font-bold hover:bg-[#e67e22] shadow-sm flex items-center">
              Save Book
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Library Management</h1>
          <p className="text-sm text-gray-500 mt-1">Real-time monitoring of campus-wide literary resources and circulation metrics.</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-none text-sm font-bold hover:bg-gray-50 shadow-sm">
            <FileDown className="w-4 h-4 mr-2" /> Export Inventory
          </button>
          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center px-4 py-2 bg-[#f39c12] text-white rounded-none text-sm font-bold hover:bg-[#e67e22] shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" /> New Acquisition
          </button>
        </div>
      </div>

      {renderTabs()}

      {activeTab === 'Issue/Return Book' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Issue Book Card */}
            <div className="bg-white rounded-none border border-gray-200 shadow-sm flex flex-col">
              <div className="p-4 border-b border-gray-100 flex items-center bg-[#fcfaff]">
                <ArrowLeftRight className="w-4 h-4 text-[#5542f6] mr-2" />
                <h3 className="text-sm font-bold text-[#5542f6]">Issue a Book</h3>
              </div>
              <div className="p-6 flex flex-col gap-4">
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1">Select Member (Student/Staff) <span className="text-red-500">*</span></label>
                  <select className="w-full border border-gray-300 rounded-none p-2 text-[13px] text-gray-500 outline-none focus:border-[#5542f6] appearance-none bg-white">
                    <option>Search by Name or Admission No...</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1">Search Book <span className="text-red-500">*</span></label>
                  <select className="w-full border border-gray-300 rounded-none p-2 text-[13px] text-gray-500 outline-none focus:border-[#5542f6] appearance-none bg-white">
                    <option>Search for an available book...</option>
                  </select>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-[12px] font-bold text-gray-700 mb-1">Issue Date <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <input type="text" value="23-08-2026" className="w-full border border-gray-300 rounded-none p-2 pr-8 text-[13px] text-gray-700 outline-none focus:border-[#5542f6]" readOnly />
                      <Calendar className="w-4 h-4 text-gray-400 absolute right-2.5 top-2.5" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-[12px] font-bold text-gray-700 mb-1">Due Date <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <input type="text" value="06-09-2026" className="w-full border border-gray-300 rounded-none p-2 pr-8 text-[13px] text-gray-700 outline-none focus:border-[#5542f6]" readOnly />
                      <Calendar className="w-4 h-4 text-gray-400 absolute right-2.5 top-2.5" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-2">
                  <button className="bg-[#5542f6] text-white px-6 py-2 rounded-none text-[13px] font-bold flex items-center hover:bg-[#4a3ae0]">
                    <Check className="w-4 h-4 mr-2" /> Issue Book
                  </button>
                </div>
              </div>
            </div>

            {/* Return Book Card */}
            <div className="bg-white rounded-none border border-gray-200 shadow-sm flex flex-col">
              <div className="p-4 border-b border-gray-100 flex items-center bg-[#fcfaff]">
                <RotateCcw className="w-4 h-4 text-[#5542f6] mr-2" />
                <h3 className="text-sm font-bold text-[#5542f6]">Return a Book</h3>
              </div>
              <div className="p-6 flex flex-col gap-4">
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1">Select Member to View Issued Books</label>
                  <select className="w-full border border-gray-300 rounded-none p-2 text-[13px] text-gray-500 outline-none focus:border-[#5542f6] appearance-none bg-white">
                    <option>Search for a member to return a book...</option>
                  </select>
                </div>
                <div className="flex items-start text-[12px] text-gray-500 mt-2">
                  <AlertCircle className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                  Select a member to see the books they have issued.
                </div>
              </div>
            </div>
          </div>

          {/* Recently Issued Books */}
          <div className="bg-white rounded-none border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-100 flex items-center bg-[#fcfaff]">
              <Clock className="w-4 h-4 text-[#5542f6] mr-2" />
              <h3 className="text-sm font-bold text-[#5542f6]">Recently Issued Books</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f3f0ff] text-[#5542f6]">
                    <th className="p-3 text-[11px] font-bold border-r border-white w-[30%]">BOOK TITLE</th>
                    <th className="p-3 text-[11px] font-bold border-r border-white w-[25%]">MEMBER NAME</th>
                    <th className="p-3 text-[11px] font-bold border-r border-white w-[15%]">ISSUE DATE</th>
                    <th className="p-3 text-[11px] font-bold border-r border-white w-[15%]">DUE DATE</th>
                    <th className="p-3 text-[11px] font-bold">STATUS</th>
                  </tr>
                </thead>
                <tbody className="text-[12px]">
                  <tr className="border-b border-gray-100">
                    <td className="p-3 text-gray-800">PC HARDWARE</td>
                    <td className="p-3 text-gray-800">Kabir Singh</td>
                    <td className="p-3 text-gray-600">22 Aug, 2026</td>
                    <td className="p-3 text-gray-600">05 Sep, 2026</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-none text-[10px] font-bold bg-[#fff3cd] text-[#856404]">Issued</span>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-3 text-gray-800">Panchatantra Tales</td>
                    <td className="p-3 text-gray-800">Anika Kumar</td>
                    <td className="p-3 text-gray-600">20 Aug, 2026</td>
                    <td className="p-3 text-gray-600">03 Sep, 2026</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-none text-[10px] font-bold bg-[#d4edda] text-[#155724]">Returned</span>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-3 text-gray-800">Mathematics for Class VI</td>
                    <td className="p-3 text-gray-800">Navya Iyer</td>
                    <td className="p-3 text-gray-600">17 Aug, 2026</td>
                    <td className="p-3 text-gray-600">31 Aug, 2026</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-none text-[10px] font-bold bg-[#fff3cd] text-[#856404]">Issued</span>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-3 text-gray-800">Malgudi Days</td>
                    <td className="p-3 text-red-400 bg-red-50 italic">Unknown / deleted member</td>
                    <td className="p-3 text-gray-600">13 May, 2026</td>
                    <td className="p-3 text-gray-600">27 May, 2026</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-none text-[10px] font-bold bg-[#d4edda] text-[#155724]">Returned</span>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-3 text-gray-800">Malgudi Days</td>
                    <td className="p-3 text-gray-800">Amit Sharma</td>
                    <td className="p-3 text-gray-600">13 May, 2026</td>
                    <td className="p-3 text-gray-600">27 May, 2026</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-none text-[10px] font-bold bg-[#d4edda] text-[#155724]">Returned</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 text-gray-800">The Very Hungry Caterpillar</td>
                    <td className="p-3 text-red-400 bg-red-50 italic">Unknown / deleted member</td>
                    <td className="p-3 text-gray-600">26 Feb, 2026</td>
                    <td className="p-3 text-gray-600">12 Mar, 2026</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-none text-[10px] font-bold bg-[#fff3cd] text-[#856404]">Issued</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : activeTab === 'Categories' ? (
        <div className="space-y-6 relative">
          <div className="flex justify-end">
            <button 
              onClick={() => setIsAddingCategory(true)}
              className="bg-[#5542f6] text-white px-4 py-2 rounded-none text-[13px] font-bold hover:bg-[#4a3ae0] flex items-center shadow-sm"
            >
              <Plus className="w-4 h-4 mr-1" /> Add New Category
            </button>
          </div>
          
          <div className="bg-white rounded-none border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-[#fcfaff]">
              <div className="flex items-center">
                <Tags className="w-4 h-4 text-[#5542f6] mr-2" />
                <h3 className="text-sm font-bold text-[#5542f6]">All Book Categories</h3>
              </div>
              <div className="flex space-x-1">
                <button className="p-1 bg-[#f3f0ff] text-[#5542f6] border border-[#d6ccff] rounded-l"><LayoutGrid className="w-4 h-4" /></button>
                <button className="p-1 bg-white text-gray-400 border border-gray-300 border-l-0 rounded-r hover:bg-gray-50"><LayoutGrid className="w-4 h-4" /></button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-sm text-gray-600">
                    Show 
                    <select className="mx-2 border border-gray-300 rounded-none px-2 py-1 outline-none text-sm">
                      <option>10</option>
                    </select>
                  </div>
                  <div className="flex border border-gray-300 rounded-none overflow-hidden">
                    <button className="px-3 py-1 border-r border-gray-300 text-xs font-medium text-gray-600 hover:bg-gray-50">CSV</button>
                    <button className="px-3 py-1 border-r border-gray-300 text-xs font-medium text-gray-600 hover:bg-gray-50">Excel</button>
                    <button className="px-3 py-1 border-r border-gray-300 text-xs font-medium text-gray-600 hover:bg-gray-50">PDF</button>
                    <button className="px-3 py-1 border-r border-gray-300 text-xs font-medium text-gray-600 hover:bg-gray-50"><Printer className="w-3.5 h-3.5" /></button>
                    <button className="px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50 flex items-center">Columns <ChevronDown className="w-3 h-3 ml-1" /></button>
                  </div>
                </div>
                <div>
                  <input type="text" placeholder="Search categories..." className="border border-gray-300 rounded-none px-3 py-1.5 text-sm outline-none focus:border-[#5542f6] min-w-[200px]" />
                </div>
              </div>

              <table className="w-full text-left border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-[#f3f0ff] text-[#5542f6]">
                    <th className="p-3 text-[11px] font-bold border-r border-white w-16 text-center">#</th>
                    <th className="p-3 text-[11px] font-bold border-r border-white">CATEGORY NAME <ArrowUpRight className="w-3 h-3 inline ml-1 opacity-50" /></th>
                    <th className="p-3 text-[11px] font-bold border-r border-white w-[30%]">BOOKS <ArrowUpRight className="w-3 h-3 inline ml-1 opacity-50" /></th>
                    <th className="p-3 text-[11px] font-bold text-center w-24">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="text-[13px]">
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 text-center text-gray-500 border-r border-gray-100">1</td>
                    <td className="p-3 text-gray-800 border-r border-gray-100">ganesh</td>
                    <td className="p-3 border-r border-gray-100">
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-none text-[10px] font-bold">0 books</span>
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex justify-center space-x-3 text-gray-400">
                        <button className="hover:text-[#5542f6]"><Edit2 className="w-4 h-4" /></button>
                        <button className="hover:text-red-500"><X className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 text-center text-gray-500 border-r border-gray-100">2</td>
                    <td className="p-3 text-gray-800 border-r border-gray-100">TEST</td>
                    <td className="p-3 border-r border-gray-100">
                      <span className="px-2 py-0.5 bg-[#f3f0ff] text-[#5542f6] rounded-none text-[10px] font-bold">3 books</span>
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex justify-center space-x-3 text-gray-400">
                        <button className="hover:text-[#5542f6]"><Edit2 className="w-4 h-4" /></button>
                        <button className="hover:text-red-500"><X className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="flex justify-between items-center mt-4 text-[12px] text-gray-500">
                <div>Showing 1-2 of 2</div>
                <div className="flex space-x-1">
                  <button className="px-2 py-1 border border-gray-300 rounded-none text-gray-400 bg-gray-50 flex items-center justify-center">{"<"}</button>
                  <button className="px-2.5 py-1 border border-[#5542f6] bg-[#5542f6] text-white rounded">1</button>
                  <button className="px-2 py-1 border border-gray-300 rounded-none text-gray-400 bg-gray-50 flex items-center justify-center">{">"}</button>
                </div>
              </div>
            </div>
          </div>

          {/* Add New Category Modal */}
          {isAddingCategory && (
            <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
              <div className="bg-white rounded-none shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <div className="flex items-center text-gray-800 font-bold text-base">
                    <Tags className="w-5 h-5 mr-2 text-gray-800" />
                    Add New Category
                  </div>
                  <button onClick={() => setIsAddingCategory(false)} className="text-gray-400 hover:text-gray-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-5">
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">
                    Category Name <span className="text-red-500">*</span>
                  </label>
                  <input type="text" placeholder="e.g., Science Fiction" className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none focus:border-[#5542f6]" />
                </div>
                <div className="p-4 border-t border-gray-100 flex justify-end space-x-3 bg-gray-50">
                  <button onClick={() => setIsAddingCategory(false)} className="px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-none text-sm font-bold hover:bg-gray-50 shadow-sm">
                    Close
                  </button>
                  <button className="px-4 py-2 bg-[#5542f6] text-white rounded-none text-sm font-bold hover:bg-[#4a3ae0] shadow-sm flex items-center">
                    <Settings className="w-4 h-4 mr-2" /> Save Category
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : activeTab === 'Manage Books' ? (
        <div className="space-y-6">
          <div className="flex justify-end space-x-3">
            <button className="px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-none text-[13px] font-bold hover:bg-gray-50 flex items-center shadow-sm">
              <ScanBarcode className="w-4 h-4 mr-2 text-gray-400" /> Download Barcodes
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-none text-[13px] font-bold hover:bg-gray-50 flex items-center shadow-sm">
              <FileDown className="w-4 h-4 mr-2 text-gray-400" /> Bulk Upload
            </button>
            <button 
              onClick={() => setIsAdding(true)}
              className="bg-[#5542f6] text-white px-4 py-2 rounded-none text-[13px] font-bold hover:bg-[#4a3ae0] flex items-center shadow-sm"
            >
              <Plus className="w-4 h-4 mr-1" /> Add New Book
            </button>
          </div>
          
          <div className="bg-white rounded-none border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-[#fcfaff]">
              <div className="flex items-center">
                <Book className="w-4 h-4 text-[#5542f6] mr-2" />
                <h3 className="text-sm font-bold text-[#5542f6]">All Library Books</h3>
              </div>
              <div className="flex space-x-1">
                <button className="p-1 bg-[#f3f0ff] text-[#5542f6] border border-[#d6ccff] rounded-l"><LayoutGrid className="w-4 h-4" /></button>
                <button className="p-1 bg-white text-gray-400 border border-gray-300 border-l-0 rounded-r hover:bg-gray-50"><LayoutGrid className="w-4 h-4" /></button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-sm text-gray-600">
                    Show 
                    <select className="mx-2 border border-gray-300 rounded-none px-2 py-1 outline-none text-sm">
                      <option>10</option>
                    </select>
                  </div>
                  <div className="flex border border-gray-300 rounded-none overflow-hidden">
                    <button className="px-3 py-1 border-r border-gray-300 text-xs font-medium text-gray-600 hover:bg-gray-50">CSV</button>
                    <button className="px-3 py-1 border-r border-gray-300 text-xs font-medium text-gray-600 hover:bg-gray-50">Excel</button>
                    <button className="px-3 py-1 border-r border-gray-300 text-xs font-medium text-gray-600 hover:bg-gray-50">PDF</button>
                    <button className="px-3 py-1 border-r border-gray-300 text-xs font-medium text-gray-600 hover:bg-gray-50"><Printer className="w-3.5 h-3.5" /></button>
                    <button className="px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50 flex items-center">Columns <ChevronDown className="w-3 h-3 ml-1" /></button>
                  </div>
                </div>
                <div>
                  <input type="text" placeholder="Search books..." className="border border-gray-300 rounded-none px-3 py-1.5 text-sm outline-none focus:border-[#5542f6] min-w-[200px]" />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-[#f3f0ff] text-[#5542f6]">
                      <th className="p-3 text-[11px] font-bold border-r border-white w-12 text-center">#</th>
                      <th className="p-3 text-[11px] font-bold border-r border-white w-16 text-center">COVER</th>
                      <th className="p-3 text-[11px] font-bold border-r border-white w-[30%]">TITLE <ArrowUpRight className="w-3 h-3 inline ml-1 opacity-50" /></th>
                      <th className="p-3 text-[11px] font-bold border-r border-white w-[20%]">AUTHOR <ArrowUpRight className="w-3 h-3 inline ml-1 opacity-50" /></th>
                      <th className="p-3 text-[11px] font-bold border-r border-white w-[15%]">CATEGORY</th>
                      <th className="p-3 text-[11px] font-bold border-r border-white text-center w-16">QTY <ArrowUpRight className="w-3 h-3 inline ml-1 opacity-50" /></th>
                      <th className="p-3 text-[11px] font-bold border-r border-white text-center w-24">AVAILABLE</th>
                      <th className="p-3 text-[11px] font-bold text-center w-24">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px]">
                    {loading ? (
                       <tr><td colSpan="8" className="p-4 text-center font-bold text-gray-400">Loading books...</td></tr>
                    ) : books.length === 0 ? (
                       <tr><td colSpan="8" className="p-4 text-center text-gray-400">No books found in Library.</td></tr>
                    ) : books.map((book) => (
                      <tr key={book.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="p-3 text-center text-gray-500 border-r border-gray-100">{String(book.id).slice(-4) || '—'}</td>
                        <td className="p-3 text-center border-r border-gray-100">
                          <div className="w-8 h-10 bg-blue-500 text-white font-bold flex items-center justify-center mx-auto text-sm">{book.initial}</div>
                        </td>
                        <td className="p-3 text-gray-800 border-r border-gray-100">{book.title}</td>
                        <td className="p-3 text-gray-600 border-r border-gray-100">{book.author}</td>
                        <td className="p-3 text-gray-400 border-r border-gray-100">—</td>
                        <td className="p-3 text-center font-medium border-r border-gray-100">{book.qty}</td>
                        <td className="p-3 text-center border-r border-gray-100">
                          <span className="text-[#2ecc71] font-bold">{book.avail}</span>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex justify-center space-x-3 text-gray-400">
                            <button className="hover:text-[#5542f6]"><Eye className="w-4 h-4" /></button>
                            <button className="hover:text-[#5542f6]"><Edit2 className="w-4 h-4" /></button>
                            <button className="hover:text-red-500"><X className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : activeTab === 'Guide' ? (
        <div className="space-y-6">
          <div className="bg-white rounded-none border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-2">How the Library module works</h2>
            <p className="text-[13px] text-gray-600 leading-relaxed">
              This module runs your library as a <strong className="font-bold text-gray-800">catalogue plus a circulation desk</strong>. You build the catalogue once (categories, then books), then issue and return copies to members — <strong className="font-bold text-gray-800">both students and staff</strong> — with automatic availability tracking and overdue fines. Parents and students can also request books from their app, which lands in your Book Requests queue.
            </p>
          </div>

          {/* 1. The big picture */}
          <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center bg-[#fcfaff]">
              <div className="w-6 h-6 rounded-none bg-[#f3f0ff] flex items-center justify-center mr-3">
                <Share2 className="w-3.5 h-3.5 text-[#5542f6]" />
              </div>
              <h3 className="text-sm font-bold text-[#5542f6]">The big picture</h3>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between gap-4 overflow-x-auto pb-2">
                <div className="flex-1 min-w-[200px] border border-gray-200 rounded-none p-5 flex flex-col items-center justify-center text-center">
                  <Tags className="w-6 h-6 text-gray-600 mb-3" />
                  <div className="text-[13px] font-bold text-gray-800 mb-1">Categories</div>
                  <div className="text-[11px] text-gray-500">shelf structure</div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-300 flex-shrink-0" />
                <div className="flex-1 min-w-[200px] border border-gray-200 rounded-none p-5 flex flex-col items-center justify-center text-center">
                  <Book className="w-6 h-6 text-[#5542f6] mb-3" />
                  <div className="text-[13px] font-bold text-gray-800 mb-1">Catalogue</div>
                  <div className="text-[11px] text-gray-500">books & copies</div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-300 flex-shrink-0" />
                <div className="flex-1 min-w-[200px] border border-gray-200 rounded-none p-5 flex flex-col items-center justify-center text-center">
                  <ArrowLeftRight className="w-6 h-6 text-[#3498db] mb-3" />
                  <div className="text-[13px] font-bold text-gray-800 mb-1">Circulate</div>
                  <div className="text-[11px] text-gray-500">issue & return</div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-300 flex-shrink-0" />
                <div className="flex-1 min-w-[200px] border border-gray-200 rounded-none p-5 flex flex-col items-center justify-center text-center">
                  <Clock className="w-6 h-6 text-[#e74c3c] mb-3" />
                  <div className="text-[13px] font-bold text-gray-800 mb-1">Overdue & Fines</div>
                  <div className="text-[11px] text-gray-500">chase late returns</div>
                </div>
              </div>
            </div>
          </div>

          {/* 1. Build the catalogue */}
          <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center bg-[#fcfaff]">
              <div className="w-6 h-6 rounded-none bg-[#5542f6] flex items-center justify-center mr-3">
                <span className="text-xs font-bold text-white">1</span>
              </div>
              <h3 className="text-sm font-bold text-[#5542f6]">Build the catalogue</h3>
            </div>
            <div className="p-6">
              <p className="text-[13px] text-gray-600 mb-6">
                Create <strong className="font-bold text-gray-800">categories</strong> first (Fiction, Reference, Science...), because every book belongs to one. Then add books — one at a time, in bulk, or by pulling details automatically from an ISBN.
              </p>
              <div className="flex items-center justify-between gap-4 overflow-x-auto mb-8 pb-2">
                <div className="flex-1 min-w-[200px] border border-gray-200 rounded-none p-5 flex flex-col items-center justify-center text-center">
                  <Tags className="w-6 h-6 text-gray-600 mb-3" />
                  <div className="text-[13px] font-bold text-gray-800 mb-1">Categories</div>
                  <div className="text-[11px] text-gray-500">define once</div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-300 flex-shrink-0" />
                <div className="flex-1 min-w-[200px] border border-gray-200 rounded-none p-5 flex flex-col items-center justify-center text-center">
                  <ScanBarcode className="w-6 h-6 text-[#3498db] mb-3" />
                  <div className="text-[13px] font-bold text-gray-800 mb-1">Fetch by ISBN</div>
                  <div className="text-[11px] text-gray-500">auto-fill details</div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-300 flex-shrink-0" />
                <div className="flex-1 min-w-[200px] border border-gray-200 rounded-none p-5 flex flex-col items-center justify-center text-center">
                  <Plus className="w-6 h-6 text-[#5542f6] mb-3" />
                  <div className="text-[13px] font-bold text-gray-800 mb-1">Add / Bulk Upload</div>
                  <div className="text-[11px] text-gray-500">single or spreadsheet</div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-300 flex-shrink-0" />
                <div className="flex-1 min-w-[200px] border border-gray-200 rounded-none p-5 flex flex-col items-center justify-center text-center">
                  <Printer className="w-6 h-6 text-[#2ecc71] mb-3" />
                  <div className="text-[13px] font-bold text-gray-800 mb-1">Print Barcodes</div>
                  <div className="text-[11px] text-gray-500">stick on spines</div>
                </div>
              </div>
              
              <h4 className="text-[13px] font-bold text-gray-800 mb-3">What a book record holds</h4>
              <ul className="space-y-2 text-[12px] text-gray-600 mb-4 pl-5 list-disc">
                <li><strong className="font-bold text-gray-800">Bibliographic:</strong> title, author, publisher, ISBN, edition, language, publication year, page count, cover image.</li>
                <li><strong className="font-bold text-gray-800">Physical:</strong> <span className="bg-[#f3f0ff] text-[#5542f6] px-1.5 py-0.5 rounded-none text-[10px] font-bold mx-1">quantity</span> total copies you own and <span className="bg-[#f3f0ff] text-[#5542f6] px-1.5 py-0.5 rounded-none text-[10px] font-bold mx-1">available</span> copies on the shelf right now — the available figure moves by itself as you issue and return.</li>
                <li><strong className="font-bold text-gray-800">Findability:</strong> rack number, category, class and subject tagging, and a barcode.</li>
                <li><strong className="font-bold text-gray-800">Book type:</strong> physical, e-book, or both. E-books carry a link instead of copies, and are excluded from barcode printing.</li>
              </ul>
              
              <ul className="space-y-2 text-[12px] text-gray-600 pl-5 list-disc mt-4">
                <li><strong className="font-bold text-gray-800">Fetch by ISBN</strong> pulls title, author, cover and more from Google Books so you're not typing a catalogue by hand.</li>
                <li><strong className="font-bold text-gray-800">Bulk upload</strong> has a downloadable template — the fastest way to load an existing collection. <strong className="font-bold text-gray-800">Export Inventory</strong> gives you the whole catalogue back out.</li>
                <li><strong className="font-bold text-gray-800">Print Barcodes</strong> generates labels for physical titles, which is what makes the rapid scan desk work.</li>
              </ul>
            </div>
          </div>

          {/* 2. Circulation */}
          <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center bg-[#fcfaff]">
              <div className="w-6 h-6 rounded-none bg-[#5542f6] flex items-center justify-center mr-3">
                <span className="text-xs font-bold text-white">2</span>
              </div>
              <h3 className="text-sm font-bold text-[#5542f6]">Circulation — issue & return</h3>
            </div>
            <div className="p-6">
              <p className="text-[13px] text-gray-600 mb-6">
                The <strong className="font-bold text-gray-800">Issue/Return</strong> screen is your desk. Pick a member, pick a book, set a due date. Members can be <strong className="font-bold text-gray-800">students or staff</strong> — search finds both.
              </p>
              <div className="flex items-center justify-between gap-4 overflow-x-auto mb-8 pb-2">
                <div className="flex-1 min-w-[200px] border border-gray-200 rounded-none p-5 flex flex-col items-center justify-center text-center">
                  <User className="w-6 h-6 text-[#3498db] mb-3" />
                  <div className="text-[13px] font-bold text-gray-800 mb-1">Find member</div>
                  <div className="text-[11px] text-gray-500">student or staff</div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-300 flex-shrink-0" />
                <div className="flex-1 min-w-[200px] border border-gray-200 rounded-none p-5 flex flex-col items-center justify-center text-center">
                  <Book className="w-6 h-6 text-[#5542f6] mb-3" />
                  <div className="text-[13px] font-bold text-gray-800 mb-1">Find book</div>
                  <div className="text-[11px] text-gray-500">must have a free copy</div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-300 flex-shrink-0" />
                <div className="flex-1 min-w-[200px] border border-gray-200 rounded-none p-5 flex flex-col items-center justify-center text-center">
                  <Calendar className="w-6 h-6 text-[#f39c12] mb-3" />
                  <div className="text-[13px] font-bold text-gray-800 mb-1">Set due date</div>
                  <div className="text-[11px] text-gray-500">issue recorded</div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-300 flex-shrink-0" />
                <div className="flex-1 min-w-[200px] border border-gray-200 rounded-none p-5 flex flex-col items-center justify-center text-center">
                  <RotateCcw className="w-6 h-6 text-[#2ecc71] mb-3" />
                  <div className="text-[13px] font-bold text-gray-800 mb-1">Return</div>
                  <div className="text-[11px] text-gray-500">copy back, fine if late</div>
                </div>
              </div>
              
              <ul className="space-y-2 text-[12px] text-gray-600 pl-5 list-disc">
                <li>Issuing decrements <strong className="font-bold text-gray-800">available copies</strong>; returning puts one back. You can't issue a title with nothing left on the shelf.</li>
                <li>The same member can't hold two active issues of the same title at once.</li>
                <li>The student's family is <strong className="font-bold text-gray-800">notified when a book is issued</strong>, with the due date — fewer surprises, fewer overdues.</li>
                <li>Due date must be on or after the issue date.</li>
              </ul>
            </div>
          </div>

          {/* 3. Rapid Scan */}
          <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center bg-[#fcfaff]">
              <div className="w-6 h-6 rounded-none bg-[#f3f0ff] flex items-center justify-center mr-3">
                <Zap className="w-3.5 h-3.5 text-[#5542f6]" />
              </div>
              <h3 className="text-sm font-bold text-[#5542f6]">Rapid Scan — the fast desk mode</h3>
            </div>
            <div className="p-6">
              <p className="text-[13px] text-gray-600 mb-6">
                For busy periods, <strong className="font-bold text-gray-800">Rapid Scan</strong> lets you work with a barcode scanner and no mouse. The order matters:
              </p>
              <div className="flex items-center justify-between gap-4 overflow-x-auto pb-2">
                <div className="flex-1 min-w-[200px] border border-gray-200 rounded-none p-5 flex flex-col items-center justify-center text-center">
                  <CreditCard className="w-6 h-6 text-[#3498db] mb-3" />
                  <div className="text-[13px] font-bold text-gray-800 mb-1">Scan ID Card</div>
                  <div className="text-[11px] text-gray-500">selects the member</div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-300 flex-shrink-0" />
                <div className="flex-1 min-w-[200px] border border-gray-200 rounded-none p-5 flex flex-col items-center justify-center text-center">
                  <ScanBarcode className="w-6 h-6 text-[#5542f6] mb-3" />
                  <div className="text-[13px] font-bold text-gray-800 mb-1">Scan Book Barcode</div>
                  <div className="text-[11px] text-gray-500">selects the book</div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-300 flex-shrink-0" />
                <div className="flex-1 min-w-[200px] border border-gray-200 rounded-none p-5 flex flex-col items-center justify-center text-center">
                  <CheckCircle className="w-6 h-6 text-[#2ecc71] mb-3" />
                  <div className="text-[13px] font-bold text-gray-800 mb-1">Issue automatically</div>
                  <div className="text-[11px] text-gray-500">with default due date</div>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Book Requests */}
          <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center bg-[#fcfaff]">
              <div className="w-6 h-6 rounded-none bg-[#5542f6] flex items-center justify-center mr-3">
                <span className="text-xs font-bold text-white">4</span>
              </div>
              <h3 className="text-sm font-bold text-[#5542f6]">Book Requests — reservations from the app</h3>
            </div>
            <div className="p-6">
              <p className="text-[13px] text-gray-600 mb-6">
                Students and parents can request a book from the parent app. Requests queue up here for you to action.
              </p>
              <div className="flex items-center justify-between gap-4 overflow-x-auto mb-8 pb-2">
                <div className="flex-1 min-w-[200px] border border-gray-200 rounded-none p-5 flex flex-col items-center justify-center text-center">
                  <Hourglass className="w-6 h-6 text-[#f39c12] mb-3" />
                  <div className="text-[13px] font-bold text-gray-800 mb-1">Pending</div>
                  <div className="text-[11px] text-gray-500">waiting on you</div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-300 flex-shrink-0" />
                <div className="flex-1 min-w-[200px] border border-gray-200 rounded-none p-5 flex flex-col items-center justify-center text-center">
                  <Check className="w-6 h-6 text-[#3498db] mb-3" />
                  <div className="text-[13px] font-bold text-gray-800 mb-1">Approved</div>
                  <div className="text-[11px] text-gray-500">go issue the book</div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-300 flex-shrink-0" />
                <div className="flex-1 min-w-[200px] border border-gray-200 rounded-none p-5 flex flex-col items-center justify-center text-center">
                  <BookOpen className="w-6 h-6 text-[#2ecc71] mb-3" />
                  <div className="text-[13px] font-bold text-gray-800 mb-1">Fulfilled</div>
                  <div className="text-[11px] text-gray-500">book handed over</div>
                </div>
                <Plus className="w-5 h-5 text-gray-300 flex-shrink-0" rotate={45} />
                <div className="flex-1 min-w-[200px] border border-gray-200 rounded-none p-5 flex flex-col items-center justify-center text-center">
                  <X className="w-6 h-6 text-[#e74c3c] mb-3" />
                  <div className="text-[13px] font-bold text-gray-800 mb-1">Rejected</div>
                  <div className="text-[11px] text-gray-500">not available</div>
                </div>
              </div>
              
              <ul className="space-y-2 text-[12px] text-gray-600 pl-5 list-disc">
                <li>Filter the queue by status; the pills show how many sit in each state.</li>
                <li><strong className="font-bold text-gray-800">Approving</strong> a request takes you straight to Issue/Return with the member in hand — approval is a decision, the issue is still a separate physical hand-over.</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
            <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden flex flex-col">
              <div className="p-4 border-b border-gray-100 flex items-center bg-[#fcfaff]">
                <div className="w-6 h-6 rounded-none bg-[#f3f0ff] flex items-center justify-center mr-3">
                  <Compass className="w-3.5 h-3.5 text-[#5542f6]" />
                </div>
                <h3 className="text-sm font-bold text-[#5542f6]">Tabs at a glance</h3>
              </div>
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse h-full">
                  <thead>
                    <tr className="bg-[#5542f6] text-white">
                      <th className="p-3 text-[11px] font-bold w-[30%]">TAB</th>
                      <th className="p-3 text-[11px] font-bold">WHAT YOU DO THERE</th>
                    </tr>
                  </thead>
                  <tbody className="text-[12px]">
                    <tr className="border-b border-gray-100">
                      <td className="p-3 font-bold text-gray-800">Overview</td>
                      <td className="p-3 text-gray-600">Total books, issued, overdue and new acquisitions, the searchable catalogue, and overdue alerts with Notify Student.</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-3 font-bold text-gray-800">Issue/Return Book</td>
                      <td className="p-3 text-gray-600">The circulation desk — issue to a member, record returns, calculate fines. Includes Rapid Scan.</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-3 font-bold text-gray-800">Categories</td>
                      <td className="p-3 text-gray-600">Create and manage the categories every book is filed under.</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-3 font-bold text-gray-800">Manage Books</td>
                      <td className="p-3 text-gray-600">Add / edit / delete titles, ISBN fetch, bulk upload, export inventory, print barcodes.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-gray-800">Book Requests</td>
                      <td className="p-3 text-gray-600">Approve, reject or fulfil requests raised from the parent app.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden flex flex-col">
              <div className="p-4 border-b border-gray-100 flex items-center bg-[#fcfaff]">
                <div className="w-6 h-6 rounded-none bg-[#f3f0ff] flex items-center justify-center mr-3">
                  <Users className="w-3.5 h-3.5 text-[#5542f6]" />
                </div>
                <h3 className="text-sm font-bold text-[#5542f6]">Access & related screens</h3>
              </div>
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse h-full">
                  <thead>
                    <tr className="bg-[#5542f6] text-white">
                      <th className="p-3 text-[11px] font-bold w-[30%]">ITEM</th>
                      <th className="p-3 text-[11px] font-bold">NOTES</th>
                    </tr>
                  </thead>
                  <tbody className="text-[12px]">
                    <tr className="border-b border-gray-100">
                      <td className="p-3 font-mono text-xs text-gray-800">library.manage</td>
                      <td className="p-3 text-gray-600">Single permission covering the whole module — catalogue, circulation and requests.</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-3 text-gray-800">Library module</td>
                      <td className="p-3 text-gray-600">Must be enabled for your school; otherwise the menu is hidden entirely.</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-3 text-gray-800">Book Issue Report</td>
                      <td className="p-3 text-gray-600">Under <strong className="font-bold text-gray-800">Reports</strong> — full circulation history with export.</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="p-3 text-gray-800">Parent app</td>
                      <td className="p-3 text-gray-600">Families browse the catalogue, see borrowed books and due dates, and raise requests.</td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="p-3 text-gray-500 bg-gray-50 text-[11px]">
                        Grant <code className="font-mono bg-gray-200 px-1 rounded-none text-[#5542f6]">library.manage</code> to your librarian under <strong className="font-bold">Settings → Roles & Permissions</strong>. There is no separate read-only library role.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-none border border-gray-200 shadow-sm p-4 flex flex-col justify-between h-28">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-500 text-xs font-bold tracking-wider">
                  <Book className="w-4 h-4 mr-2" /> TOTAL BOOKS
                </div>
                <div className="flex items-center text-[#28a745] text-xs font-bold">
                  <ArrowUpRight className="w-3 h-3 mr-1" /> 12%
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-800">271</div>
            </div>

            <div className="bg-white rounded-none border border-gray-200 shadow-sm p-4 flex flex-col justify-between h-28">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-500 text-xs font-bold tracking-wider">
                  <ArrowLeftRight className="w-4 h-4 mr-2" /> ISSUED BOOKS
                </div>
                <div className="text-gray-400 text-xs font-bold">
                  ACTIVE
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-800">3</div>
            </div>

            <div className="bg-white rounded-none border border-red-200 shadow-sm p-4 flex flex-col justify-between h-28 border-r-4 border-r-red-500">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-red-500 text-xs font-bold tracking-wider">
                  <AlertCircle className="w-4 h-4 mr-2" /> OVERDUE RETURNS
                </div>
                <div className="text-red-500 text-xs font-bold">
                  CRITICAL
                </div>
              </div>
              <div className="text-3xl font-bold text-red-500">1</div>
            </div>

            <div className="bg-white rounded-none border border-gray-200 shadow-sm p-4 flex flex-col justify-between h-28">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-500 text-xs font-bold tracking-wider">
                  <Book className="w-4 h-4 mr-2" /> NEW ACQUISITIONS
                </div>
                <div className="text-gray-400 text-xs font-bold">
                  THIS MONTH
                </div>
              </div>
              <div className="text-3xl font-bold text-[#3498db]">1</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 flex flex-col">
              <div className="bg-white rounded-none border border-gray-200 shadow-sm flex-1">
                <div className="p-4 flex items-center justify-between">
                  <h2 className="text-base font-bold text-gray-800">Library Catalog</h2>
                  <button className="p-1.5 border border-gray-300 rounded-none text-gray-600 hover:bg-gray-50">
                    <Search className="w-4 h-4" />
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#1a233a] text-white">
                        <th className="p-3 text-[11px] font-bold w-[40%]">BOOK TITLE</th>
                        <th className="p-3 text-[11px] font-bold w-[25%]">AUTHOR</th>
                        <th className="p-3 text-[11px] font-bold">CATEGORY</th>
                        <th className="p-3 text-[11px] font-bold">STATUS</th>
                        <th className="p-3 text-[11px] font-bold text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="text-[13px]">
                      {CATALOG_DATA.map((book) => (
                        <tr key={book.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                          <td className="p-3">
                            <div className="flex items-center">
                              {book.cover ? (
                                <div className="w-8 h-10 bg-gray-200 rounded-none flex items-center justify-center mr-3 overflow-hidden">
                                  <Book className="w-5 h-5 text-gray-400" />
                                </div>
                              ) : (
                                <div className={`w-8 h-10 ${book.color} text-white font-bold rounded-none flex items-center justify-center mr-3 text-sm`}>
                                  {book.initial}
                                </div>
                              )}
                              <div>
                                <div className="font-bold text-gray-800">{book.title}</div>
                                <div className="text-[11px] text-gray-400">ISBN: {book.isbn}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="text-gray-800 font-medium">{book.author}</div>
                            <div className="text-[11px] text-gray-400">{book.publisher}</div>
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-none text-[10px] font-bold bg-[#e2e8f0] text-gray-600 uppercase">
                              {book.category}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center text-gray-700">
                              <div className="w-2 h-2 rounded-none bg-[#28a745] mr-2"></div>
                              {book.status} <span className="text-gray-400 ml-1">({book.qty})</span>
                            </div>
                          </td>
                          <td className="p-3 text-right">
                            <div className="flex justify-end space-x-2">
                              <button className="text-gray-400 hover:text-[#5542f6]"><Eye className="w-4 h-4" /></button>
                              <button className="text-gray-400 hover:text-[#5542f6]"><Edit2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-[#fcf2f2] border border-[#f5c6cb] rounded-none p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-red-500 font-bold text-sm">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    Overdue Alerts
                  </div>
                  <div className="bg-[#dc3545] text-white px-2 py-0.5 rounded-none text-[10px] font-bold tracking-wider">
                    1 NEW
                  </div>
                </div>

                <div className="bg-white rounded-none border border-[#f5c6cb] p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-bold text-gray-800 text-sm">Unknown Member</div>
                      <div className="text-xs text-gray-500 italic mt-0.5">"The Very Hungry Caterpill..."</div>
                    </div>
                    <div className="text-[#dc3545] font-bold text-xs text-right whitespace-nowrap">
                      164 DAYS LATE
                    </div>
                  </div>
                  <button className="w-full mt-3 bg-[#dc3545] text-white py-1.5 rounded-none text-sm font-bold hover:bg-[#c82333]">
                    Notify Student
                  </button>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-none p-5 flex-1 flex flex-col">
                <div className="flex items-center font-bold text-gray-800 text-sm mb-6">
                  Circulation Trends
                </div>
                
                <div className="flex-1 flex flex-col justify-end">
                  <div className="flex justify-center mb-4">
                    <div className="flex items-center text-[10px] text-gray-500 font-bold">
                      <div className="w-6 h-2 bg-[#ff9b9b] mr-2"></div>
                      Books Issued
                    </div>
                  </div>
                  
                  <div className="flex items-end justify-between h-32 border-b border-l border-gray-200 pb-1 pl-1 ml-6 relative">
                    {/* Y Axis ticks */}
                    <div className="absolute -left-7 h-32 flex flex-col justify-between text-[10px] text-gray-400 py-1 pr-1 items-end w-6">
                      <span>1.0</span>
                      <span>0.8</span>
                      <span>0.6</span>
                      <span>0.4</span>
                      <span>0.2</span>
                      <span>0</span>
                    </div>
                    
                    {/* Bar Chart Mockup based on screenshot */}
                    <div className="w-[12%] h-[100%] bg-[#ff9b9b] mx-1 relative group cursor-pointer"></div>
                    <div className="w-[12%] h-0 bg-[#ff9b9b] mx-1 relative group cursor-pointer"></div>
                    <div className="w-[12%] h-0 bg-[#ff9b9b] mx-1 relative group cursor-pointer"></div>
                    <div className="w-[12%] h-[100%] bg-[#ff9b9b] mx-1 relative group cursor-pointer"></div>
                    <div className="w-[12%] h-0 bg-[#ff9b9b] mx-1 relative group cursor-pointer"></div>
                    <div className="w-[12%] h-[100%] bg-[#ff9b9b] mx-1 relative group cursor-pointer"></div>
                    <div className="w-[12%] h-0 bg-[#ff9b9b] mx-1 relative group cursor-pointer"></div>
                  </div>
                  
                  <div className="flex justify-between text-[10px] text-gray-400 font-bold mt-2 px-2 ml-6">
                    <span>MON</span>
                    <span>TUE</span>
                    <span>WED</span>
                    <span>THU</span>
                    <span>FRI</span>
                    <span>SAT</span>
                    <span>SUN</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
