import React, { useState } from 'react';
import { Building2, Plus, Search, Eye, Edit, Trash2, CheckCircle, XCircle, Clock, X, Save, AlertTriangle, Mail, Info, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { initSchools } from '../../data/schoolsData';

const planColors = { Premium: 'bg-purple-100 text-purple-700', Standard: 'bg-blue-100 text-blue-700', Basic: 'bg-gray-100 text-gray-600' };

const StatusBadge = ({ status }) => {
  if (status === 'Active') return <span className="bg-[#22c55e] text-white px-2 py-0.5 rounded-none text-[11px] font-bold">Active</span>;
  if (status === 'Inactive') return <span className="bg-red-500 text-white px-2 py-0.5 rounded-none text-[11px] font-bold">Inactive</span>;
  return <span className="bg-orange-500 text-white px-2 py-0.5 rounded-none text-[11px] font-bold">Pending</span>;
};

const Field = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-400 font-semibold mb-0.5">{label}</p>
    <p className="text-sm text-gray-800 font-medium">{value || '—'}</p>
  </div>
);

const emptyForm = { name: '', email: '', phone: '', city: '', state: '', address: '', website: '', plan: 'Basic', status: 'Active', adminName: '', established: '', students: 0 };

export default function Schools() {
  const [schools, setSchools] = useState(initSchools);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [editSchool, setEditSchool] = useState(null);
  const [deleteSchool, setDeleteSchool] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const navigate = useNavigate();

  const filtered = schools.filter(s => {
    const q = search.toLowerCase();
    return (s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q)) &&
      (filter === 'All' || s.status === filter);
  });

  const handleSaveEdit = () => {
    setSchools(prev => prev.map(s => s.id === editSchool.id ? { ...editSchool } : s));
    setEditSchool(null);
  };

  const handleAdd = () => {
    const newSchool = { ...form, id: Date.now(), joined: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) };
    setSchools(prev => [newSchool, ...prev]);
    setShowAdd(false);
    setForm(emptyForm);
  };

  const handleDelete = () => {
    setSchools(prev => prev.filter(s => s.id !== deleteSchool.id));
    setDeleteSchool(null);
  };

  const InputField = ({ label, name, value, onChange, type = 'text', options }) => (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
      {options ? (
        <select name={name} value={value} onChange={onChange} className="w-full border border-gray-200 rounded-none px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300">
          {options.map(o => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <input type={type} name={name} value={value} onChange={onChange} className="w-full border border-gray-200 rounded-none px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300" />
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-none border border-gray-100 shadow-sm p-6 max-w-[1150px] w-full mx-auto min-h-[85vh]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-end gap-3">
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight leading-none">Manage Schools</h1>
          <span className="text-[13px] text-gray-500 font-medium pb-0.5">{schools.length} total</span>
        </div>
        <button onClick={() => { setForm(emptyForm); setShowAdd(true); }} className="flex items-center gap-2 bg-[#f97316] hover:bg-orange-600 text-white px-4 py-2 rounded-none font-bold text-[13px] transition-colors shadow-sm">
          <Plus className="w-4 h-4" strokeWidth={3} /> Add New School
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-gray-100 mb-6">
        {[
          { label: 'All', count: schools.length },
          { label: 'Active', count: schools.filter(s => s.status === 'Active').length },
          { label: 'Inactive', count: schools.filter(s => s.status === 'Inactive').length },
          { label: 'Pending', count: schools.filter(s => s.status === 'Pending').length },
        ].map(f => (
          <button key={f.label} onClick={() => setFilter(f.label)}
            className={`pb-3 text-[13px] font-bold transition-colors flex items-center gap-2 relative ${filter === f.label || (filter === 'All' && f.label === 'All') ? 'text-[#0891b2]' : 'text-gray-500 hover:text-gray-700'}`}>
            <span>{f.label}</span>
            <span className={filter === f.label || (filter === 'All' && f.label === 'All') ? 'text-[#0891b2]' : 'text-gray-300 font-medium'}>{f.count}</span>
            {(filter === f.label || (filter === 'All' && f.label === 'All')) && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0891b2]"></div>}
          </button>
        ))}
      </div>

      {/* Table Section */}
      <div>
        <div className="flex items-center justify-between gap-4 mb-5">
          <div className="relative w-full max-w-2xl">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search name or email..." value={search} onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-none text-[13px] focus:outline-none focus:ring-1 focus:ring-[#0891b2] w-full" />
          </div>
          <div className="flex gap-2">
             <select className="border border-gray-200 rounded-none px-4 py-2 text-[13px] text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#0891b2] min-w-[120px] bg-white">
               <option>Plan</option>
             </select>
             <select className="border border-gray-200 rounded-none px-4 py-2 text-[13px] text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#0891b2] min-w-[120px] bg-white">
               <option>Registered</option>
             </select>
             <select className="border border-gray-200 rounded-none px-4 py-2 text-[13px] text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#0891b2] min-w-[120px] bg-white">
               <option>Sort</option>
             </select>
             <button className="bg-[#0891b2] hover:bg-cyan-700 text-white px-6 py-2 rounded-none text-[13px] font-bold transition-colors shadow-sm ml-1">
               Search
             </button>
          </div>
        </div>

        <div className="overflow-x-auto pb-4">
          <table className="w-full text-sm border-collapse border border-slate-300 shadow-sm bg-white">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-300">
                {['ID', 'School Details', 'Plan', 'Status', 'DB Rows', 'Registered', 'Subscription', 'Action'].map((h, i) => (
                  <th key={h} className="text-left px-3 py-2.5 text-[12px] font-bold text-slate-700 tracking-wide border-x border-slate-200 whitespace-nowrap">
                    <span className="flex items-center gap-1.5">
                      {h}
                      {h === 'DB Rows' && <Info className="w-4 h-4 text-slate-400" />}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((school, i) => {
                const plans = ['Enterprise Plan', 'Basic Plan', 'Trial Plan', 'Growth Plan', 'Starter Plan'];
                const displayPlan = plans[i % plans.length];
                const dbRows = [12793, 11028, 4819, 2393, 2189][i % 5];
                const subs = ['26 Feb 2027', '08 Oct 2027', '19 Sep 2030', '24 May 2027', '27 Apr 2027'][i % 5];
                return (
                  <tr key={school.id} className="hover:bg-slate-50 transition-colors bg-white group border-b border-slate-200">
                    <td className="px-3 py-2.5 text-slate-500 text-[13px] font-medium align-middle w-12 border-x border-slate-200 bg-slate-50/50 text-center">
                      {school.id || (i === 0 ? 1 : i === 1 ? 346 : i === 2 ? 172 : i === 3 ? 122 : 429)}
                    </td>
                    <td className="px-3 py-2.5 align-middle border-x border-slate-200">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-800 text-[13px]">{school.name}</span>
                        <span className="text-[12px] text-slate-500 mt-0.5">{school.email}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 align-middle border-x border-slate-200">
                      <span className="text-slate-700 text-[13px] font-medium whitespace-nowrap">{displayPlan}</span>
                    </td>
                    <td className="px-3 py-2.5 align-middle border-x border-slate-200 text-center">
                      <StatusBadge status={school.status} />
                    </td>
                    <td className="px-3 py-2.5 align-middle border-x border-slate-200 font-mono text-slate-700 text-[13px] text-right bg-slate-50/30">
                      {dbRows.toLocaleString()}
                    </td>
                    <td className="px-3 py-2.5 align-middle border-x border-slate-200 text-slate-600 text-[13px] whitespace-nowrap">
                      {school.joined.replace(',', '')}
                    </td>
                    <td className="px-3 py-2.5 align-middle border-x border-slate-200 text-slate-600 text-[13px] whitespace-nowrap">
                      {subs}
                    </td>
                    <td className="px-3 py-2.5 align-middle border-x border-slate-200 text-center bg-slate-50/50">
                      <button onClick={() => navigate(`/schools/${school.id}`)} className="text-[#0891b2] hover:text-cyan-700 text-[13px] font-bold hover:underline underline-offset-2">
                        Manage
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT MODAL */}
      {editSchool && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-none shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white">
              <h2 className="font-bold text-gray-800">Edit School</h2>
              <button onClick={() => setEditSchool(null)} className="p-2 hover:bg-gray-100 rounded-none"><X className="w-5 h-5 text-gray-500" /></button>
            </div>
            <div className="p-5 grid grid-cols-2 gap-4">
              {[
                { label: 'School Name', name: 'name' }, { label: 'Email', name: 'email', type: 'email' },
                { label: 'Phone', name: 'phone' }, { label: 'City', name: 'city' },
                { label: 'State', name: 'state' }, { label: 'Website', name: 'website' },
                { label: 'Admin Name', name: 'adminName' }, { label: 'Established', name: 'established' },
              ].map(f => (
                <div key={f.name}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">{f.label}</label>
                  <input type={f.type || 'text'} value={editSchool[f.name] || ''} onChange={e => setEditSchool({ ...editSchool, [f.name]: e.target.value })}
                    className="w-full border border-gray-200 rounded-none px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300" />
                </div>
              ))}
              {[
                { label: 'Plan', name: 'plan', options: ['Basic', 'Standard', 'Premium'] },
                { label: 'Status', name: 'status', options: ['Active', 'Inactive', 'Pending'] },
              ].map(f => (
                <div key={f.name}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">{f.label}</label>
                  <select value={editSchool[f.name]} onChange={e => setEditSchool({ ...editSchool, [f.name]: e.target.value })}
                    className="w-full border border-gray-200 rounded-none px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300">
                    {f.options.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-gray-600 mb-1">Address</label>
                <textarea value={editSchool.address || ''} onChange={e => setEditSchool({ ...editSchool, address: e.target.value })} rows={2}
                  className="w-full border border-gray-200 rounded-none px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none" />
              </div>
            </div>
            <div className="p-5 pt-0 flex gap-3">
              <button onClick={handleSaveEdit} className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-none text-sm font-semibold">
                <Save className="w-4 h-4" /> Save Changes
              </button>
              <button onClick={() => setEditSchool(null)} className="px-5 py-2 border border-gray-200 rounded-none text-sm font-semibold text-gray-600 hover:bg-gray-50">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteSchool && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-none shadow-2xl w-full max-w-sm p-6 text-center">
            <div className="w-14 h-14 bg-red-50 rounded-none flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-7 h-7 text-red-500" />
            </div>
            <h2 className="font-bold text-gray-800 text-lg mb-2">Delete School?</h2>
            <p className="text-sm text-gray-500 mb-6">Are you sure you want to delete <span className="font-semibold text-gray-700">{deleteSchool.name}</span>? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteSchool(null)} className="flex-1 py-2 border border-gray-200 rounded-none text-sm font-semibold text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={handleDelete} className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-none text-sm font-semibold">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* ADD MODAL */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-none shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white">
              <h2 className="font-bold text-gray-800">Add New School</h2>
              <button onClick={() => setShowAdd(false)} className="p-2 hover:bg-gray-100 rounded-none"><X className="w-5 h-5 text-gray-500" /></button>
            </div>
            <div className="p-5 grid grid-cols-2 gap-4">
              {[
                { label: 'School Name *', name: 'name' }, { label: 'Email *', name: 'email', type: 'email' },
                { label: 'Phone', name: 'phone' }, { label: 'City', name: 'city' },
                { label: 'State', name: 'state' }, { label: 'Website', name: 'website' },
                { label: 'Admin Name', name: 'adminName' }, { label: 'Established Year', name: 'established' },
              ].map(f => (
                <div key={f.name}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">{f.label}</label>
                  <input type={f.type || 'text'} value={form[f.name] || ''} onChange={e => setForm({ ...form, [f.name]: e.target.value })}
                    className="w-full border border-gray-200 rounded-none px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300" />
                </div>
              ))}
              {[
                { label: 'Plan', name: 'plan', options: ['Basic', 'Standard', 'Premium'] },
                { label: 'Status', name: 'status', options: ['Active', 'Inactive', 'Pending'] },
              ].map(f => (
                <div key={f.name}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">{f.label}</label>
                  <select value={form[f.name]} onChange={e => setForm({ ...form, [f.name]: e.target.value })}
                    className="w-full border border-gray-200 rounded-none px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300">
                    {f.options.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-gray-600 mb-1">Address</label>
                <textarea value={form.address || ''} onChange={e => setForm({ ...form, address: e.target.value })} rows={2}
                  className="w-full border border-gray-200 rounded-none px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none" />
              </div>
            </div>
            <div className="p-5 pt-0 flex gap-3">
              <button onClick={handleAdd} className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-none text-sm font-semibold">
                <Plus className="w-4 h-4" /> Add School
              </button>
              <button onClick={() => setShowAdd(false)} className="px-5 py-2 border border-gray-200 rounded-none text-sm font-semibold text-gray-600 hover:bg-gray-50">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
