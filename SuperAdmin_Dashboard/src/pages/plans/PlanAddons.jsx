import React, { useState } from 'react';
import { Plus, Search, ChevronDown, CheckCircle, Info, ChevronUp, X } from 'lucide-react';

const mockAddons = [
  { id: 1, name: '[Showcase] WhatsApp Channel', desc: 'Send notices and fee reminders over WhatsApp.', type: 'Channel', grants: '—', monthly: '299.00', yearly: '2,990.00', plans: '2 plans', status: 'Active' },
  { id: 2, name: '[Showcase] Priority Support', desc: 'Named account manager and a 4-hour response target.', type: 'Flat', grants: '—', monthly: '999.00', yearly: '9,990.00', plans: '3 plans', status: 'Active' },
  { id: 3, name: '[Showcase] Online Exams Module', desc: 'Question banks, scheduled online tests and auto-marking.', type: 'Module', grants: 'online_exam', monthly: '399.00', yearly: '3,990.00', plans: '2 plans', status: 'Active' },
  { id: 4, name: '[Showcase] Transport Module', desc: 'Bus routes, stops, live tracking and the driver app.', type: 'Module', grants: 'transport', monthly: '499.00', yearly: '4,990.00', plans: '3 plans', status: 'Active' },
];

export default function PlanAddons() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [addons, setAddons] = useState(mockAddons);
  const [showAdd, setShowAdd] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const handleSave = (e) => {
    e.preventDefault();
    setShowAdd(false);
    setEditItem(null);
  };

  const filtered = addons.filter(p => {
    const q = search.toLowerCase();
    const matchSearch = p.name.toLowerCase().includes(q) || p.type.toLowerCase().includes(q);
    if (filter === 'Modules') return matchSearch && p.type === 'Module';
    if (filter === 'Storage') return matchSearch && p.type === 'Storage';
    if (filter === 'Seats') return matchSearch && p.type === 'Seat';
    if (filter === 'Channels') return matchSearch && p.type === 'Channel';
    if (filter === 'Flat') return matchSearch && p.type === 'Flat';
    return matchSearch;
  });
  
  return (
    <div className="max-w-[1150px] w-full mx-auto min-h-[85vh] p-4 md:p-6 lg:p-8">
      {/* Top Banner Info */}
      <div className="bg-white border border-gray-100 rounded-none p-4 flex items-center justify-between shadow-[0_2px_10px_rgba(0,0,0,0.02)] mb-5 cursor-pointer hover:bg-gray-50/50 transition-colors">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-[#0891b2]" />
          <span className="font-bold text-gray-800 text-[14px]">How add-ons work</span>
        </div>
        <ChevronDown className="w-5 h-5 text-gray-400" />
      </div>

      <div className="bg-white rounded-none border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-end gap-3">
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight leading-none">Plan Add-ons</h1>
            <span className="text-[13px] text-gray-500 font-medium pb-0.5">{addons.length} total</span>
          </div>
          <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 bg-[#f97316] hover:bg-orange-600 text-white px-4 py-2 rounded-none font-bold text-[13px] transition-colors shadow-sm">
            <Plus className="w-4 h-4" strokeWidth={3} /> New Add-on
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-gray-100 mb-6 overflow-x-auto">
          {[
            { label: 'All', count: addons.length },
            { label: 'Modules', count: addons.filter(a => a.type === 'Module').length },
            { label: 'Storage', count: addons.filter(a => a.type === 'Storage').length },
            { label: 'Seats', count: addons.filter(a => a.type === 'Seat').length },
            { label: 'Channels', count: addons.filter(a => a.type === 'Channel').length },
            { label: 'Flat', count: addons.filter(a => a.type === 'Flat').length },
          ].map(f => (
            <button key={f.label} onClick={() => setFilter(f.label)}
              className={`pb-3 text-[13px] font-bold transition-colors flex items-center gap-2 relative shrink-0 ${filter === f.label ? 'text-[#0891b2]' : 'text-gray-500 hover:text-gray-700'}`}>
              <span>{f.label}</span>
              <span className={filter === f.label ? 'text-[#0891b2]' : 'text-gray-300 font-medium'}>{f.count}</span>
              {filter === f.label && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0891b2]"></div>}
            </button>
          ))}
        </div>

        {/* Filters / Search Bar */}
        <div className="flex items-center justify-between gap-4 mb-5">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search add-ons..." value={search} onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-none text-[13px] focus:outline-none focus:ring-1 focus:ring-[#0891b2] w-full" />
          </div>
          <div className="flex gap-2">
             <select className="border border-gray-200 rounded-none px-4 py-2 text-[13px] text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#0891b2] min-w-[120px] bg-white">
               <option>Sort</option>
             </select>
             <button className="bg-[#0891b2] hover:bg-cyan-700 text-white px-6 py-2 rounded-none text-[13px] font-bold transition-colors shadow-sm ml-1">
               Search
             </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto pb-4">
          <table className="w-full text-sm border-collapse border border-slate-300 shadow-sm bg-white">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-300">
                {['Add-on', 'Type', 'Grants', 'Monthly', 'Yearly', 'Offered by', 'Status', 'Action'].map((h, i) => (
                  <th key={h} className="text-left px-3 py-2.5 text-[12px] font-bold text-slate-700 tracking-wide border-x border-slate-200 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, i) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors bg-white group border-b border-slate-200">
                  
                  <td className="px-3 py-2.5 align-middle border-x border-slate-200">
                    <p className="font-bold text-slate-800 text-[13px] leading-snug">{item.name}</p>
                    <p className="text-[12px] text-slate-500 font-medium mt-0.5">{item.desc}</p>
                  </td>
                  
                  <td className="px-3 py-2.5 align-middle border-x border-slate-200 whitespace-nowrap">
                    <span className="inline-block bg-slate-50 border border-slate-200 text-slate-700 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                      {item.type}
                    </span>
                  </td>
                  
                  <td className="px-3 py-2.5 align-middle border-x border-slate-200 whitespace-nowrap">
                    <span className="text-slate-500 font-medium text-[13px]">{item.grants}</span>
                  </td>
                  
                  <td className="px-3 py-2.5 align-middle border-x border-slate-200 whitespace-nowrap font-mono text-emerald-600 text-[13px] font-bold">
                    ₹{item.monthly}
                  </td>
                  
                  <td className="px-3 py-2.5 align-middle border-x border-slate-200 whitespace-nowrap font-mono text-emerald-600 text-[13px] font-bold">
                    ₹{item.yearly}
                  </td>
                  
                  <td className="px-3 py-2.5 align-middle border-x border-slate-200 whitespace-nowrap">
                    <span className="text-slate-700 font-medium text-[13px]">
                      {item.plans}
                    </span>
                  </td>
                  
                  <td className="px-3 py-2.5 align-middle border-x border-slate-200 whitespace-nowrap">
                    <span className="inline-block bg-emerald-50 text-emerald-600 border border-emerald-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                      {item.status}
                    </span>
                  </td>
                  
                  <td className="px-3 py-2.5 align-middle border-x border-slate-200 text-center bg-slate-50/50 whitespace-nowrap">
                    <button onClick={() => setEditItem(item)} className="text-[#0891b2] hover:text-cyan-700 text-[13px] font-bold hover:underline underline-offset-2 w-full text-center">
                      Manage
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD / EDIT ADD-ON MODAL */}
      {(showAdd || editItem) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-none shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-white">
              <h2 className="font-bold text-gray-800 text-lg">{editItem ? 'Edit Add-on' : 'New Add-on'}</h2>
              <button onClick={() => { setShowAdd(false); setEditItem(null); }} className="p-2 hover:bg-gray-100 rounded-none"><X className="w-5 h-5 text-gray-500" /></button>
            </div>
            
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 bg-slate-50">
              <div className="grid grid-cols-2 gap-5 mb-5 bg-white p-5 border border-slate-200">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Add-on Name</label>
                  <input required defaultValue={editItem?.name || ''} className="w-full border border-gray-200 px-3 py-2 text-[13px] focus:outline-none focus:border-[#0891b2] focus:ring-1 focus:ring-[#0891b2]" placeholder="e.g. Priority Support" />
                </div>
                
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Description</label>
                  <input required defaultValue={editItem?.desc || ''} className="w-full border border-gray-200 px-3 py-2 text-[13px] focus:outline-none focus:border-[#0891b2] focus:ring-1 focus:ring-[#0891b2]" placeholder="Short description" />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Type</label>
                  <select defaultValue={editItem?.type || 'Module'} className="w-full border border-gray-200 px-3 py-2 text-[13px] focus:outline-none focus:border-[#0891b2] focus:ring-1 focus:ring-[#0891b2] bg-white">
                    <option>Module</option>
                    <option>Channel</option>
                    <option>Storage</option>
                    <option>Seat</option>
                    <option>Flat</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Included in Plans</label>
                  <input defaultValue={editItem?.plans || '2 plans'} className="w-full border border-gray-200 px-3 py-2 text-[13px] focus:outline-none focus:border-[#0891b2] focus:ring-1 focus:ring-[#0891b2]" placeholder="e.g. 2 plans" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5 mb-5 bg-white p-5 border border-slate-200">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Pricing Strategy</label>
                  <select className="w-full border border-gray-200 px-3 py-2 text-[13px] focus:outline-none focus:border-[#0891b2] focus:ring-1 focus:ring-[#0891b2] bg-white">
                    <option>Flat rate (per school)</option>
                    <option>Per student scaling</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">System Grants</label>
                  <input defaultValue={editItem?.grants || '—'} className="w-full border border-gray-200 px-3 py-2 text-[13px] font-mono focus:outline-none focus:border-[#0891b2] focus:ring-1 focus:ring-[#0891b2]" placeholder="e.g. online_exam" />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Monthly Add-on Price (₹)</label>
                  <input required type="number" defaultValue={editItem?.monthly?.replace(',','') || ''} className="w-full border border-gray-200 px-3 py-2 text-[13px] font-mono focus:outline-none focus:border-[#0891b2] focus:ring-1 focus:ring-[#0891b2]" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Yearly Add-on Price (₹)</label>
                  <input required type="number" defaultValue={editItem?.yearly?.replace(',','') || ''} className="w-full border border-gray-200 px-3 py-2 text-[13px] font-mono focus:outline-none focus:border-[#0891b2] focus:ring-1 focus:ring-[#0891b2]" placeholder="0.00" />
                </div>
              </div>
            </form>
            
            <div className="p-5 flex gap-3 border-t border-gray-100 bg-white">
              <button type="submit" onClick={handleSave} className="flex-1 flex items-center justify-center gap-2 bg-[#0891b2] hover:bg-cyan-700 text-white py-2.5 rounded-none text-[13px] font-bold transition-colors">
                Save Add-on Details
              </button>
              <button onClick={() => { setShowAdd(false); setEditItem(null); }} className="px-5 py-2.5 border border-gray-200 rounded-none text-[13px] font-bold text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
