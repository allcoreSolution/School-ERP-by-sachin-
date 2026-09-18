import React, { useState, useEffect } from 'react';
import { 
  Search, LayoutDashboard, Layers, Plus, 
  SlidersHorizontal, Copy, BarChart2, Trash2, ArrowDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { examService } from '../../api/examService';

export default function ManageOnlineExams() {
  const navigate = useNavigate();
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      setLoading(true);
      const res = await examService.getOnlineExams();
      const mapped = (res.data || res || []).map((p, idx) => ({
        id: p._id,
        title: p.title || 'Untitled Exam',
        kind: p.examType || 'EXAM',
        class: p.classId?._id ? "Class Selected" : 'All Classes',
        subject: p.subjectId?._id ? "Specific Subject" : 'All Subjects',
        start: p.startDate ? new Date(p.startDate).toLocaleString() : 'N/A',
        duration: p.duration ? `${p.duration} mins` : 'Untimed',
        status: p.status || 'Active',
        draft: p.isDraft || false
      }));
      setPapers(mapped);
    } catch(err) {
      console.error(err);
      setPapers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this session?")) {
      try {
        await examService.deleteOnlineExam(id);
        fetchExams();
      } catch (err) {
        alert("Delete failed.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-10">
      
      {/* Header */}
      <div className="bg-white px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-200">
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          Manage Online Exams <span className="text-slate-400 font-normal">— this session</span>
        </h1>
        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <button 
            onClick={() => navigate('/osm-module/dashboard')}
            className="px-4 py-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs rounded-none shadow-sm flex items-center gap-2 transition-colors cursor-pointer"
          >
            <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
          </button>
          <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs rounded-none shadow-sm flex items-center gap-2 transition-colors cursor-pointer">
            <Layers className="w-3.5 h-3.5" /> View all sessions
          </button>
          <button 
            onClick={() => navigate('/osm-module/sessions/new')}
            className="px-4 py-2 bg-[#6f42c1] hover:bg-[#5a32a3] text-white font-bold text-xs rounded-none shadow-sm flex items-center gap-2 transition-colors border-none cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> New paper
          </button>
        </div>
      </div>

      <div className="p-6 max-w-[1400px] mx-auto space-y-4">
        
        {/* Search & Filters Area */}
        <div className="bg-white border border-slate-200 rounded-none shadow-sm p-4 space-y-4">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input 
                type="text" 
                placeholder="Search by paper title..." 
                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-none text-sm focus:outline-none focus:border-[#6f42c1]"
              />
            </div>
            <select className="lg:w-48 px-3 py-2 border border-slate-300 rounded-none text-sm bg-white focus:outline-none focus:border-[#6f42c1] text-slate-700">
              <option>All Classes</option>
            </select>
            <select className="lg:w-64 px-3 py-2 border border-slate-300 rounded-none text-sm bg-white focus:outline-none focus:border-[#6f42c1] text-slate-700">
              <option>Pick a Class first...</option>
            </select>
            <select className="lg:w-48 px-3 py-2 border border-slate-300 rounded-none text-sm bg-white focus:outline-none focus:border-[#6f42c1] text-slate-700">
              <option>All Subjects</option>
            </select>
            <button className="px-6 py-2 bg-[#6f42c1] hover:bg-[#5a32a3] text-white font-bold text-sm rounded-none shadow-sm flex items-center gap-2 justify-center transition-colors cursor-pointer border-none">
              <Search className="w-4 h-4" /> Search
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-2">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-slate-500 tracking-wider">KIND</span>
              <div className="flex gap-1">
                <span className="px-3 py-1 bg-[#6f42c1] text-white rounded-none text-[11px] font-bold shadow-sm cursor-pointer">All</span>
                <span className="px-3 py-1 text-slate-500 hover:bg-slate-100 rounded-none text-[11px] font-bold cursor-pointer transition-colors">Exams</span>
                <span className="px-3 py-1 text-slate-500 hover:bg-slate-100 rounded-none text-[11px] font-bold cursor-pointer transition-colors">Quizzes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Data Table Container */}
        <div className="bg-white border border-slate-200 rounded-none shadow-sm overflow-hidden">
          
          <div className="px-5 py-3 border-b border-slate-200 flex justify-between items-center bg-white">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
              <Layers className="w-4 h-4 text-[#6f42c1]" /> {papers.length} papers
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-[#f3f0ff] border-b border-slate-200 text-[10px] font-bold text-[#6f42c1] uppercase tracking-wider">
                  <th className="py-3 px-4 border-r border-slate-200/50 w-12 text-center">#</th>
                  <th className="py-3 px-4 border-r border-slate-200/50">TITLE</th>
                  <th className="py-3 px-4 border-r border-slate-200/50">KIND</th>
                  <th className="py-3 px-4 border-r border-slate-200/50">CLASS & SECTION</th>
                  <th className="py-3 px-4 border-r border-slate-200/50">SUBJECT</th>
                  <th className="py-3 px-4 border-r border-slate-200/50">START TIME</th>
                  <th className="py-3 px-4 border-r border-slate-200/50">DURATION</th>
                  <th className="py-3 px-4 border-r border-slate-200/50 text-center">STATUS</th>
                  <th className="py-3 px-4 text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="text-xs text-slate-700">
                {loading ? (
                  <tr><td colSpan="9" className="py-8 text-center text-slate-500 font-bold">Loading exams...</td></tr>
                ) : papers.length === 0 ? (
                  <tr><td colSpan="9" className="py-8 text-center text-slate-400">No exams found. Create a new paper to see it here.</td></tr>
                ) : papers.map((p, index) => (
                  <tr key={p.id} className="border-b border-slate-100 bg-white hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-4 border-r border-slate-100 text-center text-slate-400">{index + 1}</td>
                    <td className="py-4 px-4 border-r border-slate-100 font-medium text-slate-800">{p.title}</td>
                    <td className="py-4 px-4 border-r border-slate-100">
                      <span className={`px-2 py-0.5 rounded-none text-[10px] font-bold shadow-sm ${
                        p.kind === 'QUIZ' ? 'bg-orange-100 text-orange-600' :
                        p.kind === 'EXAM' ? 'bg-blue-100 text-blue-600' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        {p.kind}
                      </span>
                    </td>
                    <td className="py-4 px-4 border-r border-slate-100">{p.class}</td>
                    <td className="py-4 px-4 border-r border-slate-100">{p.subject}</td>
                    <td className="py-4 px-4 border-r border-slate-100">{p.start}</td>
                    <td className="py-4 px-4 border-r border-slate-100">{p.duration}</td>
                    <td className="py-4 px-4 border-r border-slate-100 text-center">
                      <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold">
                        <span className="text-blue-500">{p.status}</span>
                        {p.draft && <span className="text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-none ml-1">Draft</span>}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-3 text-slate-400">
                        <button 
                          onClick={() => handleDelete(p.id)}
                          className="hover:text-red-500 transition-colors bg-transparent border-none cursor-pointer"
                          title="Delete Paper"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
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
  );
}
