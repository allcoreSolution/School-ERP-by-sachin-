import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Gauge, BookOpen, HandCoins, FileSearch, ArrowLeftRight, Globe, FileText, 
  MoreHorizontal, Search, PenTool, HelpCircle, UserPlus, FastForward,
  Plus, Tag, List, Grid, Copy, FileSpreadsheet, File, Printer, Columns,
  Edit, Trash2, Upload, Download, XCircle
} from 'lucide-react';
import { accountantService } from '../api/accountantService';
import Swal from 'sweetalert2';

const ToolbarButton = ({ label, icon: Icon }) => (
  <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-gray-600 text-[13px] bg-white hover:bg-gray-50 transition-colors">
    {Icon && <Icon className="w-3.5 h-3.5" />}
    {label}
  </button>
);

const FeeTypes = () => {
  const [typesData, setTypesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', code: '', description: '' });

  const fetchTypes = async () => {
    try {
      setLoading(true);
      const res = await accountantService.getFeeTypes();
      if(res.success) setTypesData(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if(!form.name) return Swal.fire('Error', 'Name is required.', 'error');
    try {
      const res = await accountantService.addFeeType({ feeType: form.name, feeCode: form.code, description: form.description });
      if(res.success) {
        Swal.fire('Success', 'Fee Type added', 'success');
        fetchTypes();
        setShowModal(false);
        setForm({name: '', code: '', description: ''});
      }
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || err.message, 'error');
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({ title: 'Are you sure?', icon: 'warning', showCancelButton: true });
    if(confirm.isConfirmed) {
      try {
        await accountantService.deleteFeeType(id);
        Swal.fire('Deleted', 'Fee type has been deleted', 'success');
        fetchTypes();
      } catch (err) {
        Swal.fire('Error', 'Cannot delete this fee type', 'error');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#ecf0f5] text-[#333] p-4 sm:p-6 font-sans">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-4 border-b border-gray-300 pb-4">
        <div>
          <h1 className="text-[24px] font-bold text-[#333] mb-1">Finance & Fees</h1>
          <p className="text-[13px] text-gray-500">Manage fee types, groups, collection, challans, and reports across the school.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-[3px] bg-white text-[#333] text-[13px] font-semibold hover:bg-gray-50">
            <PenTool className="w-4 h-4" /> Quick Setup
          </button>
        </div>
      </div>

      {/* Nav Tabs */}
      <div className="flex flex-wrap gap-6 mb-8 text-[14px]">
        {[
          { label: 'Dashboard', icon: Gauge , path: '/accounts/dashboard' },
          { label: 'Guide', icon: BookOpen },
          { label: 'Collect Fees', icon: HandCoins , path: '/fees/collect' },
          { label: 'Search Due Fees', icon: FileSearch , path: '/fees/due' },
          { label: 'All Transactions', icon: ArrowLeftRight },
          { label: 'Online Transactions', icon: Globe },
          { label: 'Fee Challans', icon: FileText },
          { label: 'Assign Fees', icon: UserPlus , path: '/fees/assign' },
          { label: 'Fees Carry Forward', icon: FastForward },
          { label: 'More Menu', icon: MoreHorizontal },
        ].map((tab, idx) => (
          <div key={idx} className={`flex items-center gap-2 pb-2 cursor-pointer transition-colors text-gray-500 hover:text-[#333]`}>
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-end items-end md:items-center mb-6 gap-2 w-full">
        <div className="flex flex-wrap items-center justify-end gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-[3px] bg-white text-gray-600 font-semibold text-[13px] hover:bg-gray-50 shadow-sm">
            <HelpCircle className="w-4 h-4 text-gray-500" />
            How Fee Types Work
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-[3px] bg-white text-gray-600 font-semibold text-[13px] hover:bg-gray-50 shadow-sm">
            <Upload className="w-4 h-4 text-gray-500" />
            Import
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-[3px] bg-white text-gray-600 font-semibold text-[13px] hover:bg-gray-50 shadow-sm">
            <Download className="w-4 h-4 text-gray-500" />
            Export Template
          </button>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-1.5 rounded-[3px] border border-[#5a52d7] bg-[#5a52d7] text-white font-semibold text-[13px] hover:bg-[#4a42c0] shadow-sm">
            <Plus className="w-4 h-4" />
            Add New Fee Type
          </button>
        </div>
      </div>

      {/* Table Panel */}
      <div className="bg-white rounded-[3px] border border-gray-200 shadow-sm flex flex-col">
        
        {/* Table Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-[#fefefe]">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-[#5a52d7]" />
            <h2 className="text-[16px] font-bold text-[#333]">Fee Types</h2>
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
              placeholder="Search fee types..." 
              className="w-full border border-gray-200 rounded-[3px] pl-3 pr-10 py-1.5 text-[13px] focus:outline-none focus:border-[#5a52d7]"
            />
            <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-[#f4f2ff] text-[#5a52d7] text-[11px] font-bold tracking-[0.5px] uppercase border-b border-purple-100/50">
                <th className="py-4 px-5 w-16 text-center">#</th>
                <th className="py-4 px-5 border-l border-purple-100/60 w-1/3">NAME <span className="text-[10px] text-purple-300 ml-1">↑↓</span></th>
                <th className="py-4 px-5 border-l border-purple-100/60 w-1/4">FEE CODE <span className="text-[10px] text-purple-300 ml-1">↑↓</span></th>
                <th className="py-4 px-5 border-l border-purple-100/60">DESCRIPTION <span className="text-[10px] text-purple-300 ml-1">↑↓</span></th>
                <th className="py-4 px-5 border-l border-purple-100/60 text-center w-[100px]">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-[#333]">
              {loading ? (
                <tr><td colSpan={5} className="py-6 text-center text-gray-500">Loading fee types from server...</td></tr>
              ) : typesData.map((type, i) => (
                <tr key={type._id || type.id || i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-5 text-center text-gray-500">{i + 1}</td>
                  <td className="py-4 px-5 border-l border-gray-100 font-medium text-gray-700">{type.feeType || type.name}</td>
                  <td className="py-4 px-5 border-l border-gray-100 text-gray-500">
                    {type.feeCode || type.code ? (
                      <span className="bg-[#eff2ff] text-[#5a52d7] font-bold px-2 py-0.5 rounded-[3px] text-[11px] uppercase tracking-wider">{type.feeCode || type.code}</span>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td className="py-4 px-5 border-l border-gray-100 text-gray-400 font-medium">{type.description || '--'}</td>
                  <td className="py-4 px-5 border-l border-gray-100">
                    <div className="flex items-center justify-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                      <button className="text-gray-500 hover:text-[#3c8dbc] p-1"><Edit className="w-3.5 h-3.5" /></button>
                      <button onClick={() => handleDelete(type._id)} className="text-gray-500 hover:text-[#d9534f] p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {typesData.length === 0 && !loading && (
                <tr><td colSpan={5} className="py-6 text-center text-gray-400">No fee types configured yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Modal logic */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[3px] shadow-lg w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-[#fefefe]">
               <h3 className="font-bold text-[#333]">Add Fee Type</h3>
               <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><XCircle className="w-5 h-5"/></button>
            </div>
            <form onSubmit={handleCreate} className="p-5 flex flex-col gap-4">
               <div>
                  <label className="block text-[12px] font-bold text-gray-600 mb-1">Fee Type Name *</label>
                  <input required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full border border-gray-300 rounded-[3px] px-3 py-2 text-[13px] focus:outline-none focus:border-[#5a52d7]" placeholder="e.g. Tuition Fee" />
               </div>
               <div>
                  <label className="block text-[12px] font-bold text-gray-600 mb-1">Fee Code</label>
                  <input type="text" value={form.code} onChange={e => setForm({...form, code: e.target.value})} className="w-full border border-gray-300 rounded-[3px] px-3 py-2 text-[13px] focus:outline-none focus:border-[#5a52d7]" placeholder="e.g. TF" />
               </div>
               <div>
                  <label className="block text-[12px] font-bold text-gray-600 mb-1">Description</label>
                  <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full border border-gray-300 rounded-[3px] px-3 py-2 text-[13px] focus:outline-none focus:border-[#5a52d7]" rows={2} />
               </div>
               <div className="flex gap-2 mt-2">
                 <button type="submit" className="px-4 py-2 bg-[#5a52d7] text-white text-[13px] font-semibold rounded-[3px] hover:bg-[#4a42c0] flex-1">Save Fee Type</button>
                 <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border border-gray-300 text-gray-600 text-[13px] font-semibold rounded-[3px] hover:bg-gray-50">Cancel</button>
               </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default FeeTypes;
