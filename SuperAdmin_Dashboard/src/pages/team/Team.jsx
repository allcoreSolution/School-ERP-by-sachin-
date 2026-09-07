import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Mail, Phone, X, Save, AlertTriangle, Circle } from 'lucide-react';

const initTeam = [
  { id: 1, name: 'Rahul Sharma', email: 'rahul@erp.com', phone: '+91 98765 43210', role: 'Super Admin', status: 'Active', joined: 'Jan 2023' },
  { id: 2, name: 'Priya Singh', email: 'priya@erp.com', phone: '+91 87654 32109', role: 'Support Manager', status: 'Active', joined: 'Mar 2023' },
  { id: 3, name: 'Amit Kumar', email: 'amit@erp.com', phone: '+91 76543 21098', role: 'Developer', status: 'Active', joined: 'Jun 2023' },
  { id: 4, name: 'Neha Gupta', email: 'neha@erp.com', phone: '+91 65432 10987', role: 'Sales Manager', status: 'Inactive', joined: 'Aug 2023' },
  { id: 5, name: 'Vikram Patel', email: 'vikram@erp.com', phone: '+91 54321 09876', role: 'Support Agent', status: 'Active', joined: 'Oct 2023' },
];

const roles = ['Super Admin', 'Support Manager', 'Developer', 'Sales Manager', 'Support Agent', 'Content Manager'];
const avatarColors = ['bg-[#2563eb]', 'bg-[#9333ea]', 'bg-[#16a34a]', 'bg-[#ef4444]', 'bg-[#f97316]'];
const emptyForm = { name: '', email: '', phone: '', role: 'Support Agent', status: 'Active' };

export default function Team() {
  const [team, setTeam] = useState(initTeam);
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [editMember, setEditMember] = useState(null);
  const [deleteMember, setDeleteMember] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = team.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    setTeam(prev => [...prev, { ...form, id: Date.now(), joined: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) }]);
    setShowAdd(false);
    setForm(emptyForm);
  };

  const handleSaveEdit = () => {
    setTeam(prev => prev.map(m => m.id === editMember.id ? editMember : m));
    setEditMember(null);
  };

  const handleDelete = () => {
    setTeam(prev => prev.filter(m => m.id !== deleteMember.id));
    setDeleteMember(null);
  };

  const initials = (name) => name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  const MemberModal = ({ member, setMember, onSave, onClose, isAdd }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-none shadow-2xl w-full max-w-2xl flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-white">
          <h2 className="font-bold text-gray-800 text-lg">{isAdd ? 'Add Team Member' : 'Edit Member Details'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-none"><X className="w-5 h-5 text-gray-500" /></button>
        </div>
        
        <div className="p-6 bg-slate-50 flex-1 overflow-y-auto w-full">
          <div className="grid grid-cols-2 gap-5 mb-5 bg-white p-5 border border-slate-200 w-full">
            <div className="col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Full Name</label>
              <input value={member.name || ''} onChange={e => setMember({ ...member, name: e.target.value })}
                className="w-full border border-gray-200 px-3 py-2 text-[13px] focus:outline-none focus:border-[#0891b2] focus:ring-1 focus:ring-[#0891b2]" placeholder="e.g. John Doe" />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Email Address</label>
              <input type="email" value={member.email || ''} onChange={e => setMember({ ...member, email: e.target.value })}
                className="w-full border border-gray-200 px-3 py-2 text-[13px] focus:outline-none focus:border-[#0891b2] focus:ring-1 focus:ring-[#0891b2]" placeholder="john@company.com" />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Phone Number</label>
              <input value={member.phone || ''} onChange={e => setMember({ ...member, phone: e.target.value })}
                className="w-full border border-gray-200 px-3 py-2 text-[13px] focus:outline-none focus:border-[#0891b2] focus:ring-1 focus:ring-[#0891b2]" placeholder="+91 98765 43210" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-5 bg-white p-5 border border-slate-200 w-full">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Platform Role</label>
              <select value={member.role} onChange={e => setMember({ ...member, role: e.target.value })}
                className="w-full border border-gray-200 px-3 py-2 text-[13px] focus:outline-none focus:border-[#0891b2] focus:ring-1 focus:ring-[#0891b2] bg-white">
                {roles.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Status</label>
              <select value={member.status} onChange={e => setMember({ ...member, status: e.target.value })}
                className="w-full border border-gray-200 px-3 py-2 text-[13px] focus:outline-none focus:border-[#0891b2] focus:ring-1 focus:ring-[#0891b2] bg-white">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="p-5 flex gap-3 border-t border-gray-100 bg-white">
          <button onClick={onSave} className="flex-1 flex items-center justify-center gap-2 bg-[#0891b2] hover:bg-cyan-700 text-white py-2.5 rounded-none text-[13px] font-bold transition-colors shadow-sm">
            {isAdd ? 'Save New Member' : 'Update Member Details'}
          </button>
          <button onClick={onClose} className="px-5 py-2.5 border border-gray-200 rounded-none text-[13px] font-bold text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-[1150px] w-full mx-auto min-h-[85vh] p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight leading-none mb-1.5">Team</h1>
          <p className="text-[13px] font-medium text-gray-500">Manage platform team members and roles</p>
        </div>
        <button onClick={() => { setForm(emptyForm); setShowAdd(true); }} className="flex items-center gap-2 bg-[#f97316] hover:bg-orange-600 text-white px-4 py-2 rounded-none font-bold text-[13px] transition-colors shadow-sm">
          <Plus className="w-4 h-4" strokeWidth={3} /> Add Member
        </button>
      </div>

      {/* Stats Cards */}
      <div className="flex border border-slate-300 mb-6 shadow-sm">
        {[
          { label: 'Total Members', value: team.length },
          { label: 'Active', value: team.filter(m => m.status === 'Active').length },
          { label: 'Roles', value: roles.length },
        ].map((s, i) => (
          <div key={i} className="flex-1 flex flex-col justify-center items-center py-4 border-r border-slate-300 last:border-r-0 bg-white">
            <p className="text-2xl font-extrabold text-slate-800 mb-1 leading-none">{s.value}</p>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-none border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-6">
        
        {/* Search */}
        <div className="mb-6 flex justify-between items-center">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search team members by name or email..." value={search} onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-none text-[13px] focus:outline-none focus:border-[#0891b2] focus:ring-1 focus:ring-[#0891b2] w-full bg-white placeholder-gray-400" />
          </div>
        </div>

        {/* Team Excel Table */}
        <div className="overflow-x-auto pb-4">
          <table className="w-full text-sm border-collapse border border-slate-300 shadow-sm bg-white">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-300">
                {['ID', 'Team Member', 'Phone Number', 'Role', 'Status', 'Joined', 'Actions'].map((h, i) => (
                  <th key={h} className="text-left px-3 py-2.5 text-[12px] font-bold text-slate-700 tracking-wide border-x border-slate-200 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((member, i) => (
                <tr key={member.id} className="hover:bg-slate-50 transition-colors bg-white group border-b border-slate-200">
                   <td className="px-3 py-2.5 text-slate-500 text-[13px] font-medium align-middle w-12 border-x border-slate-200 bg-slate-50/50 text-center">
                    #{member.id}
                  </td>
                  
                  <td className="px-3 py-2.5 align-middle border-x border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-none ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>
                        {initials(member.name)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-800 text-[13px]">{member.name}</span>
                        <span className="text-[12px] text-slate-500 mt-0.5">{member.email}</span>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-3 py-2.5 align-middle border-x border-slate-200 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-[12px] text-slate-500 font-medium">
                      <Phone className="w-3.5 h-3.5 text-slate-400" /> {member.phone}
                    </div>
                  </td>
                  
                  <td className="px-3 py-2.5 align-middle border-x border-slate-200 whitespace-nowrap">
                    <span className="text-blue-600 font-bold text-[12px] flex items-center gap-1.5">
                      <Circle className="w-2.5 h-2.5" /> {member.role}
                    </span>
                  </td>
                  
                  <td className="px-3 py-2.5 align-middle border-x border-slate-200 whitespace-nowrap">
                    <span className={`inline-block border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap ${member.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                      {member.status}
                    </span>
                  </td>
                  
                  <td className="px-3 py-2.5 align-middle border-x border-slate-200 text-slate-600 font-medium text-[12px] whitespace-nowrap bg-slate-50/30">
                    {member.joined}
                  </td>
                  
                  <td className="px-3 py-2.5 align-middle border-x border-slate-200 text-center bg-slate-50/50 whitespace-nowrap">
                     <div className="flex gap-4 justify-center items-center">
                        <button onClick={() => setEditMember(member)} className="text-[#0891b2] hover:text-cyan-700 text-[12px] font-bold hover:underline underline-offset-2 flex items-center gap-1">
                          Manage
                        </button>
                        <span className="w-px h-3 bg-slate-300"></span>
                        <button onClick={() => setDeleteMember(member)} className="text-red-500 hover:text-red-700 text-[12px] font-bold hover:underline underline-offset-2 flex items-center gap-1">
                          Remove
                        </button>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAdd && <MemberModal member={form} setMember={setForm} onSave={handleAdd} onClose={() => setShowAdd(false)} isAdd />}
      {editMember && <MemberModal member={editMember} setMember={setEditMember} onSave={handleSaveEdit} onClose={() => setEditMember(null)} />}

      {deleteMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-none shadow-2xl w-full max-w-sm p-6 text-center border-t-4 border-red-500">
            <div className="w-14 h-14 bg-red-50 rounded-none flex items-center justify-center mx-auto mb-4 border border-red-100">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <h2 className="font-bold text-gray-800 text-lg mb-2">Remove Member?</h2>
            <p className="text-[13px] font-medium text-gray-500 mb-6 leading-relaxed">Are you sure you want to remove <span className="font-bold text-slate-800">{deleteMember.name}</span> from the platform team? This action is immediate.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteMember(null)} className="flex-1 py-2 border border-gray-200 rounded-none text-[13px] font-bold text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={handleDelete} className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-none text-[13px] font-bold transition-colors">Confirm Remove</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
