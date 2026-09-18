import React, { useState } from 'react';
import { 
  LayoutDashboard, Calendar, ClipboardList, MessageSquare, BarChart2, HelpCircle, 
  Plus, Edit, Trash2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PTMFollowups() {
  const navigate = useNavigate();

  const [followUps, setFollowUps] = useState([
    { id: 1, student: 'Ishaan Gupta', meeting: '--', actionPlan: 'Weekly progress check with class teacher.', assignee: 'Rajesh Kumar', due: '16 Jun 2026', status: 'Done', statusColor: 'bg-[#28a745]' },
    { id: 2, student: 'Atharv Kumar', meeting: '--', actionPlan: 'Daily 30-min reading practice at home.', assignee: 'Rajesh Kumar', due: '20 Jun 2026', status: 'Open', statusColor: 'bg-[#ffc107] text-slate-800' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    student: '', meeting: '', actionPlan: '', assignee: '', due: '', status: 'Open'
  });

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this follow-up?')) {
      setFollowUps(followUps.filter(f => f.id !== id));
    }
  };

  const handleEdit = (followUp) => {
    setEditingId(followUp.id);
    setFormData(followUp);
    setShowModal(true);
  };

  const handleNew = () => {
    setEditingId(null);
    setFormData({ student: '', meeting: '', actionPlan: '', assignee: '', due: '', status: 'Open' });
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingId) {
      setFollowUps(followUps.map(f => f.id === editingId ? { ...formData, id: editingId, statusColor: formData.status === 'Done' ? 'bg-[#28a745]' : 'bg-[#ffc107] text-slate-800' } : f));
    } else {
      const newId = Math.max(...followUps.map(f => f.id), 0) + 1;
      setFollowUps([...followUps, { ...formData, id: newId, statusColor: formData.status === 'Done' ? 'bg-[#28a745]' : 'bg-[#ffc107] text-slate-800' }]);
    }
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-10">
      
      {/* Header */}
      <div className="bg-white px-6 py-4 flex justify-between items-center border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Parent-Teacher Meetings</h1>
          <p className="text-[11px] text-slate-500 mt-1">Schedule PTMs, invite guardians, record attendance & remarks, and capture feedback.</p>
        </div>
        <button 
          onClick={() => navigate('/ptm/schedule')}
          className="px-4 py-2 bg-[#007bff] hover:bg-[#0056b3] text-white font-bold text-[12px] rounded-none flex items-center gap-2 transition-colors cursor-pointer border-none shadow-sm"
        >
          <Plus className="w-4 h-4" /> Schedule Meeting
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white px-6 border-b border-slate-200 flex items-center gap-6 text-[12px] font-bold overflow-x-auto">
        <button onClick={() => navigate('/ptm/dashboard')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer whitespace-nowrap">
          <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
        </button>
        <button onClick={() => navigate('/ptm/schedule')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer whitespace-nowrap">
          <Calendar className="w-3.5 h-3.5" /> Schedule Meetings
        </button>
        <button onClick={() => navigate('/ptm/attendance')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer whitespace-nowrap">
          <ClipboardList className="w-3.5 h-3.5" /> Attendance & Remarks
        </button>
        <button className="flex items-center gap-2 py-3 text-slate-800 border-b-2 border-slate-800 cursor-pointer whitespace-nowrap">
          <MessageSquare className="w-3.5 h-3.5" /> Follow-ups
        </button>
        <button onClick={() => navigate('/ptm/reports')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer whitespace-nowrap">
          <BarChart2 className="w-3.5 h-3.5" /> Reports
        </button>
        <button onClick={() => navigate('/ptm/guide')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer whitespace-nowrap">
          <HelpCircle className="w-3.5 h-3.5" /> Guide
        </button>
      </div>

      <div className="p-6 max-w-[1400px] mx-auto space-y-4">
        
        {/* KPI Cards Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-none p-5 text-center shadow-sm">
            <div className="text-2xl font-bold text-slate-800 leading-none mb-1">
              {followUps.filter(f => f.status === 'Open').length}
            </div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Open</div>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-none p-5 text-center shadow-sm">
            <div className="text-2xl font-bold text-slate-800 leading-none mb-1">
              {followUps.filter(f => f.status === 'In Progress').length}
            </div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">In Progress</div>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-none p-5 text-center shadow-sm">
            <div className="text-2xl font-bold text-slate-800 leading-none mb-1">
              {followUps.filter(f => f.status === 'Done').length}
            </div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Done</div>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-none p-5 text-center shadow-sm">
            <div className="text-2xl font-bold text-slate-800 leading-none mb-1">
              {followUps.filter(f => f.status === 'Cancelled').length}
            </div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Cancelled</div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center">
          <select className="px-3 py-1.5 border border-slate-300 rounded-none text-[12px] focus:outline-none focus:border-slate-400 bg-white min-w-[120px]">
            <option>All statuses</option>
            <option>Open</option>
            <option>Done</option>
          </select>
          <button 
            onClick={handleNew}
            className="px-3 py-1.5 bg-[#fd7e14] hover:bg-[#e86e0c] text-white font-bold text-[12px] rounded-none flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" /> New follow-up
          </button>
        </div>

        {/* Table */}
        <div className="bg-white border border-slate-200 rounded-none shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-5 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Student</th>
                  <th className="px-5 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Meeting</th>
                  <th className="px-5 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Action Plan</th>
                  <th className="px-5 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Assignee</th>
                  <th className="px-5 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Due</th>
                  <th className="px-5 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-5 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-slate-700">
                {followUps.length > 0 ? followUps.map((followUp) => (
                  <tr key={followUp.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-5 py-3 font-bold text-slate-800">{followUp.student}</td>
                    <td className="px-5 py-3 text-slate-400">{followUp.meeting}</td>
                    <td className="px-5 py-3">{followUp.actionPlan}</td>
                    <td className="px-5 py-3">{followUp.assignee}</td>
                    <td className="px-5 py-3">{followUp.due}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-block px-2.5 py-1 ${followUp.statusColor || 'bg-slate-500 text-white'} ${followUp.status === 'Done' ? 'text-white' : ''} rounded-none text-[10px] font-bold tracking-wider`}>
                        {followUp.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-1.5">
                        <button 
                          onClick={() => handleEdit(followUp)}
                          className="w-7 h-7 flex items-center justify-center border border-[#007bff] rounded-none text-[#007bff] hover:bg-blue-50 cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(followUp.id)}
                          className="w-7 h-7 flex items-center justify-center border border-[#dc3545] rounded-none text-[#dc3545] hover:bg-red-50 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="7" className="px-5 py-8 text-center text-slate-400">
                      No follow-ups found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-none shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-800">{editingId ? 'Edit Follow-up' : 'New Follow-up'}</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 text-xl font-bold cursor-pointer">&times;</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Student</label>
                <input type="text" value={formData.student} onChange={(e) => setFormData({...formData, student: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] focus:outline-none focus:border-slate-400" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Meeting</label>
                <input type="text" value={formData.meeting} onChange={(e) => setFormData({...formData, meeting: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] focus:outline-none focus:border-slate-400" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Action Plan</label>
                <textarea value={formData.actionPlan} onChange={(e) => setFormData({...formData, actionPlan: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] focus:outline-none focus:border-slate-400 min-h-[80px]"></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Assignee</label>
                  <input type="text" value={formData.assignee} onChange={(e) => setFormData({...formData, assignee: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] focus:outline-none focus:border-slate-400" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Due Date</label>
                  <input type="text" value={formData.due} onChange={(e) => setFormData({...formData, due: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] focus:outline-none focus:border-slate-400" placeholder="e.g. 16 Jun 2026" />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Status</label>
                <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] focus:outline-none focus:border-slate-400 bg-white">
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Done</option>
                  <option>Cancelled</option>
                </select>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border border-slate-300 text-slate-600 rounded-none text-[12px] font-bold hover:bg-slate-100 transition-colors cursor-pointer">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 bg-[#fd7e14] text-white rounded-none text-[12px] font-bold hover:bg-[#e86e0c] transition-colors cursor-pointer">Save Follow-up</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
