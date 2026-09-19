import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wand2, Plus, Pencil, ArrowUpFromLine, Trash2, EyeOff, CheckCircle2, FileText, X } from 'lucide-react';

export default function ReportCardSetups() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [setups, setSetups] = useState([]);

  const togglePublish = (id) => {
    setSetups(setups.map(s => {
      if (s.id === id) {
        const newPublished = !s.published;
        alert(`Report Card Setup is now ${newPublished ? 'Published to Parents' : 'Hidden from Parents'}.`);
        return { ...s, published: newPublished };
      }
      return s;
    }));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this report card setup?')) {
      setSetups(setups.filter(s => s.id !== id));
      alert('Setup deleted successfully.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-10">
      <div className="bg-white p-6 border-b border-slate-200 flex justify-between items-center shadow-sm relative z-10">
        <h1 className="text-xl font-bold text-slate-800">Report Card Setups</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-[#17a2b8] text-[#17a2b8] hover:bg-[#17a2b8]/5 font-bold text-sm rounded-none transition-colors cursor-pointer"
        >
          <Wand2 className="w-4 h-4" /> How Report Cards Work
        </button>
      </div>

      <div className="p-6 max-w-[1400px] mx-auto">
        <div className="bg-white border border-[#fd7e14] rounded-none shadow-sm overflow-hidden">
          
          <div className="px-4 py-3 border-b border-slate-200 flex justify-between items-center bg-white">
            <h2 className="text-sm font-bold text-[#007bff] flex items-center gap-2">
              <FileText className="w-4 h-4" /> Manage Report Card Configurations
            </h2>
            <button 
              onClick={() => navigate('/offline-exams/report-card-setups/add')}
              className="px-4 py-2 bg-[#fd7e14] hover:bg-[#e86e10] text-white font-bold text-xs rounded-none flex items-center gap-2 transition-colors cursor-pointer border-none shadow-sm"
            >
              <Plus className="w-3 h-3" /> Add New Setup
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-[#17a2b8] text-white text-xs font-bold">
                  <th className="py-3 px-4 w-[20%] border-r border-[#138496]">Name</th>
                  <th className="py-3 px-4 w-[25%] border-r border-[#138496]">Template Used</th>
                  <th className="py-3 px-4 border-r border-[#138496]">Exams & Weightage Included</th>
                  <th className="py-3 px-4 w-[15%] text-center border-r border-[#138496]">Visible to Parents</th>
                  <th className="py-3 px-4 w-[15%] text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {setups.map((setup) => (
                  <tr key={setup.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-800 border-r border-slate-200">{setup.name}</td>
                    <td className="py-3 px-4 text-slate-500 text-xs border-r border-slate-200">{setup.template}</td>
                    <td className="py-3 px-4 border-r border-slate-200">
                      <div className="flex flex-wrap gap-2">
                        {setup.exams.map((exam, idx) => (
                          <span key={idx} className="bg-[#17a2b8] text-white text-[11px] font-bold px-2 py-0.5 rounded-none flex items-center gap-1">
                            <span className="font-serif italic">%</span> {exam.replace('% ', '')}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center border-r border-slate-200">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-none text-xs font-bold ${setup.published ? 'bg-[#28a745] text-white' : 'bg-slate-500 text-white'}`}>
                        {setup.published ? <CheckCircle2 className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        {setup.published ? 'Published' : 'Hidden'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => navigate('/offline-exams/report-card-setups/edit')}
                          className="w-7 h-7 bg-[#17a2b8] hover:bg-[#138496] text-white rounded-none flex items-center justify-center transition-colors cursor-pointer border-none"
                          title="Edit"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => togglePublish(setup.id)}
                          className="w-7 h-7 bg-[#28a745] hover:bg-[#218838] text-white rounded-none flex items-center justify-center transition-colors cursor-pointer border-none"
                          title={setup.published ? 'Hide from Parents' : 'Publish to Parent App'}
                        >
                          <ArrowUpFromLine className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(setup.id)}
                          className="w-7 h-7 bg-[#dc3545] hover:bg-[#c82333] text-white rounded-none flex items-center justify-center transition-colors cursor-pointer border-none"
                          title="Delete"
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

      {/* How Report Cards Work Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4">
          <div className="bg-[#f0f2f5] rounded-none shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-[#343a40] px-6 py-4 flex justify-between items-center shrink-0">
              <h2 className="text-white font-bold flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-[#17a2b8]" /> Mastering Report Card Setups
              </h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white bg-transparent border-none cursor-pointer">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              <div className="bg-[#17a2b8] rounded-none p-5 text-white shadow-sm">
                <h3 className="font-bold flex items-center gap-2 mb-2">
                  <span className="text-yellow-300">💡</span> The core concept: Exams vs. Report Cards
                </h3>
                <p className="text-sm text-white/90 leading-relaxed">
                  Entering marks into an 'Exam' merely saves raw data. A <strong>Report Card Setup</strong> is the actual printing engine. It tells the system <em>how</em> to calculate those marks, what design to use, and when to show it to parents.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-200 rounded-none p-5 shadow-sm h-full">
                  <h3 className="font-bold text-[#007bff] flex items-center gap-2 mb-3">
                    <span className="text-xl">⚖️</span> The Weightage Engine (Combining Exams)
                  </h3>
                  <p className="text-xs text-slate-600 mb-4">You are not restricted to generating a report for just a single exam! You can combine multiple historical exams together to formulate a final grade.</p>
                  <div className="bg-slate-50 border border-slate-200 rounded-none p-4 text-xs font-mono text-slate-700">
                    <div className="font-bold mb-2 flex items-center gap-2 text-slate-800"><span className="text-lg">⚙️</span> Example Architecture:</div>
                    <ul className="list-disc pl-5 space-y-1 mb-3 text-slate-600">
                      <li>Term 1 Exam: <span className="font-bold">[50% Weightage]</span></li>
                      <li>Term 2 Exam: <span className="font-bold">[50% Weightage]</span></li>
                    </ul>
                    <div className="text-[#007bff] font-bold">Result = 100% Final Yearly Score calculated automatically.</div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-none p-5 shadow-sm h-full">
                  <h3 className="font-bold text-[#28a745] flex items-center gap-2 mb-3">
                    <span className="text-xl">📱</span> The "Publish" Mechanics
                  </h3>
                  <p className="text-xs text-slate-600 mb-4">By default, every setup you create is hidden (Unpublished). This is a safety feature.</p>
                  <ul className="space-y-3 text-xs text-slate-600 list-disc pl-4">
                    <li><strong>Unpublished:</strong> Allows you, the admin, to generate and review the PDFs internally to ensure the math is flawless.</li>
                    <li><strong>Published:</strong> Instantly pushes the finalized digital Report Card directly into the Student/Parent Mobile App. Unpublishing it pulls it right back down!</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-none p-5 shadow-sm">
                <h3 className="font-bold text-[#ffc107] flex items-center gap-2 mb-2">
                  <span className="text-xl">🎨</span> Selecting a Template
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  When you click "Add New Setup", you will be forced to select a <strong>Template</strong>. The template dictates the structural design (portrait vs landscape, layout of tables, graphical analytics) of the final PDF. The platform math dynamically shapes itself to fit whichever aesthetic template you choose.
                </p>
              </div>
            </div>

            <div className="bg-white border-t border-slate-200 px-6 py-4 flex justify-center shrink-0">
              <button 
                onClick={() => setShowModal(false)}
                className="px-8 py-2.5 bg-[#6c757d] hover:bg-[#5a6268] text-white font-bold rounded-none shadow-sm transition-colors cursor-pointer border-none"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
