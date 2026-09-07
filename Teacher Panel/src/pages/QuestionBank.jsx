import React, { useState, useMemo } from 'react';
import {
  List, Plus, Search, Eye, Edit, Trash2, 
  Filter, X, BookOpen, Tag, Target, CheckCircle,
  HelpCircle, Upload, Download, Copy
} from 'lucide-react';

const initialQuestions = [
  { id: 'Q-001', subject: 'Mathematics', class: 'Class X', topic: 'Polynomials', type: 'MCQ', difficulty: 'Medium', marks: 2, question: 'What is the sum of the zeros of the polynomial p(x) = ax^2 + bx + c?', options: ['-b/a', 'c/a', 'b/a', '-c/a'], answer: '-b/a' },
  { id: 'Q-002', subject: 'Mathematics', class: 'Class X', topic: 'Trigonometry', type: 'Subjective', difficulty: 'Hard', marks: 5, question: 'Prove that (sin A + cosec A)^2 + (cos A + sec A)^2 = 7 + tan^2 A + cot^2 A', answer: 'Steps involving expansion and trigonometric identities leading to RHS.' },
  { id: 'Q-003', subject: 'Science', class: 'Class IX', topic: 'Motion', type: 'True/False', difficulty: 'Easy', marks: 1, question: 'Displacement can be zero even if distance is not zero.', answer: 'True' },
  { id: 'Q-004', subject: 'English', class: 'Class VIII', topic: 'Grammar', type: 'MCQ', difficulty: 'Medium', marks: 1, question: 'Identify the adverb in the sentence: "She sang beautifully."', options: ['She', 'sang', 'beautifully', 'None of the above'], answer: 'beautifully' },
  { id: 'Q-005', subject: 'History', class: 'Class XI', topic: 'World War I', type: 'Subjective', difficulty: 'Hard', marks: 5, question: 'Discuss the main causes that led to the outbreak of World War I.', answer: 'Militarism, Alliances, Imperialism, Nationalism.' },
];

const subjects = ['All', 'Mathematics', 'Science', 'English', 'History'];
const classesList = ['All', 'Class VIII', 'Class IX', 'Class X', 'Class XI', 'Class XII'];
const difficulties = ['All', 'Easy', 'Medium', 'Hard'];
const questionTypes = ['All', 'MCQ', 'Subjective', 'True/False'];

const difficultyStyle = {
  Easy: 'bg-green-100 text-green-700 border border-green-200',
  Medium: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
  Hard: 'bg-red-100 text-red-600 border border-red-200',
};

const typeStyle = {
  'MCQ': 'bg-blue-50 text-blue-600 border border-blue-100',
  'Subjective': 'bg-purple-50 text-purple-600 border border-purple-100',
  'True/False': 'bg-teal-50 text-teal-600 border border-teal-100',
};

const QuestionBank = () => {
  const [search, setSearch] = useState('');
  const [filterSubject, setFilterSubject] = useState('All');
  const [filterClass, setFilterClass] = useState('All');
  const [filterDifficulty, setFilterDifficulty] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [viewQuestion, setViewQuestion] = useState(null);
  const [form, setForm] = useState({
    subject: 'Mathematics', class: 'Class X', topic: '', type: 'MCQ',
    difficulty: 'Medium', marks: '1', question: '', options: ['', '', '', ''], answer: ''
  });

  const filtered = useMemo(() => {
    return initialQuestions.filter(q =>
      (filterSubject === 'All' || q.subject === filterSubject) &&
      (filterClass === 'All' || q.class === filterClass) &&
      (filterDifficulty === 'All' || q.difficulty === filterDifficulty) &&
      (q.question.toLowerCase().includes(search.toLowerCase()) || q.topic.toLowerCase().includes(search.toLowerCase()) || q.id.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search, filterSubject, filterClass, filterDifficulty]);

  const stats = [
    { label: 'Total Questions', val: initialQuestions.length, icon: List, color: 'text-cyan-500 bg-cyan-50' },
    { label: 'MCQs', val: initialQuestions.filter(q => q.type === 'MCQ').length, icon: CheckCircle, color: 'text-blue-500 bg-blue-50' },
    { label: 'Subjective', val: initialQuestions.filter(q => q.type === 'Subjective').length, icon: BookOpen, color: 'text-purple-500 bg-purple-50' },
    { label: 'Hard Level', val: initialQuestions.filter(q => q.difficulty === 'Hard').length, icon: Target, color: 'text-red-500 bg-red-50' },
  ];

  const handleOptionChange = (index, value) => {
    const newOptions = [...form.options];
    newOptions[index] = value;
    setForm({ ...form, options: newOptions });
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#f4f7f6] theme-app-bg">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-cyan-100 text-cyan-600 flex items-center justify-center">
              <List className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Question Bank</h1>
              <p className="text-sm text-gray-500">Manage and organize all exam questions</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 flex items-center gap-1 text-sm font-semibold transition-colors">
              <Upload className="w-4 h-4" /> Import CSV
            </button>
            <button onClick={() => setShowModal(true)}
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold px-4 py-2 flex items-center gap-2 text-sm transition-colors">
              <Plus className="w-4 h-4" /> Add Question
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ label, val, icon: Icon, color }) => (
            <div key={label} className="bg-white border border-gray-200 shadow-sm p-4 flex items-center gap-4">
              <div className={`w-11 h-11 flex items-center justify-center flex-shrink-0 ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-black text-gray-800">{val}</p>
                <p className="text-xs text-gray-500 font-medium">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white border border-gray-200 shadow-sm px-5 py-4 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search by question, topic or ID..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-300/40" />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-gray-400" />
            <select value={filterSubject} onChange={e => setFilterSubject(e.target.value)} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none text-gray-600">
              {subjects.map(o => <option key={o} value={o}>Subject: {o}</option>)}
            </select>
            <select value={filterClass} onChange={e => setFilterClass(e.target.value)} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none text-gray-600">
              {classesList.map(o => <option key={o} value={o}>Class: {o}</option>)}
            </select>
            <select value={filterDifficulty} onChange={e => setFilterDifficulty(e.target.value)} className="border border-gray-200 px-3 py-2 text-sm focus:outline-none text-gray-600">
              {difficulties.map(o => <option key={o} value={o}>Difficulty: {o}</option>)}
            </select>
            <button onClick={() => { setSearch(''); setFilterSubject('All'); setFilterClass('All'); setFilterDifficulty('All'); }}
              className="text-xs text-gray-400 hover:text-red-500 border border-dashed border-gray-200 px-2 py-2 hover:border-red-300 transition-colors flex items-center gap-1">
              <X className="w-3 h-3" /> Clear
            </button>
          </div>
        </div>

        {/* Questions Table */}
        <div className="bg-white border border-gray-200 shadow-sm overflow-x-auto">
          <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr className="bg-gray-50">
                {['ID', 'Question & Topic', 'Subject & Class', 'Type', 'Difficulty', 'Marks', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider border border-gray-200">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((q, i) => (
                <tr key={q.id} className="hover:bg-cyan-50/20 transition-colors">
                  <td className="px-4 py-3 border border-gray-200 text-gray-500 font-semibold text-xs">{q.id}</td>
                  <td className="px-4 py-3 border border-gray-200 max-w-sm">
                    <p className="font-semibold text-gray-800 line-clamp-2">{q.question}</p>
                    <p className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 mt-1 inline-flex rounded-full border border-gray-200 items-center gap-1">
                      <Tag className="w-2.5 h-2.5" />{q.topic}
                    </p>
                  </td>
                  <td className="px-4 py-3 border border-gray-200">
                    <p className="font-semibold text-gray-700">{q.subject}</p>
                    <p className="text-xs text-gray-500">{q.class}</p>
                  </td>
                  <td className="px-4 py-3 border border-gray-200">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-none ${typeStyle[q.type]}`}>{q.type}</span>
                  </td>
                  <td className="px-4 py-3 border border-gray-200">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-none ${difficultyStyle[q.difficulty]}`}>{q.difficulty}</span>
                  </td>
                  <td className="px-4 py-3 border border-gray-200 text-gray-700 font-bold">{q.marks}</td>
                  <td className="px-4 py-3 border border-gray-200">
                    <div className="flex gap-1 flex-wrap">
                      <button onClick={() => setViewQuestion(q)} className="p-1.5 bg-blue-50 text-blue-500 border border-blue-200 hover:bg-blue-100 transition-colors" title="View"><Eye className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 bg-indigo-50 text-indigo-500 border border-indigo-200 hover:bg-indigo-100 transition-colors" title="Edit"><Edit className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100 transition-colors" title="Duplicate"><Copy className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 bg-red-50 text-red-500 border border-red-200 hover:bg-red-100 transition-colors" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="text-center py-14 text-gray-400 border border-gray-200">
                  <HelpCircle className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No questions match the current filters.</p>
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== Add Question Modal ===== */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto" onClick={() => setShowModal(false)}>
          <div className="bg-white w-full max-w-3xl shadow-2xl my-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Plus className="w-5 h-5 text-cyan-600" /> Add New Question
              </h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 hover:bg-gray-100 text-gray-500"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Subject</label>
                <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none">
                  {subjects.filter(s => s !== 'All').map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Class</label>
                <select value={form.class} onChange={e => setForm({ ...form, class: e.target.value })} className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none">
                  {classesList.filter(s => s !== 'All').map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Topic</label>
                <input type="text" placeholder="e.g. Polynomials" value={form.topic} onChange={e => setForm({ ...form, topic: e.target.value })}
                  className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-300/40" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Question Type</label>
                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none">
                  {questionTypes.filter(s => s !== 'All').map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Difficulty</label>
                <select value={form.difficulty} onChange={e => setForm({ ...form, difficulty: e.target.value })} className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none">
                  {difficulties.filter(s => s !== 'All').map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Marks</label>
                <input type="number" min="1" value={form.marks} onChange={e => setForm({ ...form, marks: e.target.value })}
                  className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-300/40" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Question Text *</label>
                <textarea rows={3} placeholder="Type the question here..." value={form.question} onChange={e => setForm({ ...form, question: e.target.value })}
                  className="w-full border border-gray-200 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-cyan-300/40" />
              </div>
              
              {form.type === 'MCQ' && (
                <div className="md:col-span-2 border border-blue-100 bg-blue-50/30 p-4">
                  <p className="text-xs font-bold text-blue-700 uppercase mb-3">Options & Answer</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    {form.options.map((opt, idx) => (
                      <div key={idx}>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Option {idx + 1}</label>
                        <input type="text" value={opt} onChange={e => handleOptionChange(idx, e.target.value)}
                          className="w-full border border-gray-200 px-3 py-1.5 text-sm focus:outline-none" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Correct Answer *</label>
                    <select value={form.answer} onChange={e => setForm({ ...form, answer: e.target.value })} className="w-full md:w-1/2 border border-gray-200 px-3 py-1.5 text-sm focus:outline-none">
                      <option value="">Select Correct Option...</option>
                      {form.options.map((opt, idx) => opt && <option key={idx} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {form.type === 'True/False' && (
                <div className="md:col-span-2 border border-teal-100 bg-teal-50/30 p-4">
                  <label className="block text-xs font-bold text-teal-700 uppercase mb-2">Correct Answer *</label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-1.5 text-sm cursor-pointer">
                      <input type="radio" name="tf" value="True" checked={form.answer === 'True'} onChange={e => setForm({ ...form, answer: e.target.value })} className="w-4 h-4 accent-cyan-600" />
                      True
                    </label>
                    <label className="flex items-center gap-1.5 text-sm cursor-pointer">
                      <input type="radio" name="tf" value="False" checked={form.answer === 'False'} onChange={e => setForm({ ...form, answer: e.target.value })} className="w-4 h-4 accent-cyan-600" />
                      False
                    </label>
                  </div>
                </div>
              )}

              {form.type === 'Subjective' && (
                <div className="md:col-span-2 border border-purple-100 bg-purple-50/30 p-4">
                  <label className="block text-xs font-bold text-purple-700 uppercase mb-2">Sample Answer / Marking Scheme</label>
                  <textarea rows={3} placeholder="Expected answer points..." value={form.answer} onChange={e => setForm({ ...form, answer: e.target.value })}
                    className="w-full border border-gray-200 px-3 py-2 text-sm resize-none focus:outline-none" />
                </div>
              )}
            </div>
            <div className="flex gap-3 px-6 py-4 border-t border-gray-100">
              <button onClick={() => setShowModal(false)} className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2.5 text-sm transition-colors">
                Save Question
              </button>
              <button onClick={() => setShowModal(false)} className="px-5 border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ===== View Question Modal ===== */}
      {viewQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setViewQuestion(null)}>
          <div className="bg-white w-full max-w-xl shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-base font-bold text-gray-800">Question Details <span className="text-gray-400 font-normal ml-1">({viewQuestion.id})</span></h2>
              <button onClick={() => setViewQuestion(null)} className="p-1.5 hover:bg-gray-100 text-gray-500"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${typeStyle[viewQuestion.type]}`}>{viewQuestion.type}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${difficultyStyle[viewQuestion.difficulty]}`}>{viewQuestion.difficulty}</span>
                <span className="text-[10px] font-bold bg-gray-100 text-gray-600 border border-gray-200 px-2 py-0.5 inline-flex items-center gap-1 rounded-full"><Tag className="w-2.5 h-2.5" />{viewQuestion.topic}</span>
                <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 ml-auto rounded-full">{viewQuestion.marks} Marks</span>
              </div>
              <div className="bg-gray-50 border border-gray-200 p-4 relative top-2">
                <p className="text-sm font-bold text-gray-700 mb-1 flex items-center gap-1.5"><HelpCircle className="w-4 h-4 text-cyan-500" /> QUESTION</p>
                <p className="text-base text-gray-900 leading-relaxed font-semibold">{viewQuestion.question}</p>
              </div>
              {viewQuestion.type === 'MCQ' && (
                <div className="grid grid-cols-2 gap-2 mt-4 ml-1">
                  {viewQuestion.options.map((opt, idx) => (
                    <div key={idx} className={`p-2 text-sm border ${opt === viewQuestion.answer ? 'bg-green-50 border-green-200 font-bold text-green-700' : 'bg-white border-gray-200 text-gray-600'}`}>
                      {String.fromCharCode(65 + idx)}. {opt}
                    </div>
                  ))}
                </div>
              )}
              <div className="border border-green-100 bg-green-50/50 p-4 mt-4">
                <p className="text-xs font-bold text-green-700 mb-1 flex items-center gap-1.5"><CheckCircle className="w-4 h-4" /> CORRECT ANSWER</p>
                <p className="text-sm text-gray-800 font-medium">{viewQuestion.answer}</p>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
              <button onClick={() => setViewQuestion(null)} className="px-5 py-2 bg-gray-100 text-gray-700 font-semibold text-sm hover:bg-gray-200 transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionBank;
