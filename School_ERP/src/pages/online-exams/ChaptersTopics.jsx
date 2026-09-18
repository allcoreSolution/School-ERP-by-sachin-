import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Info, Plus, Edit2, Trash2, X } from 'lucide-react';

export default function ChaptersTopics() {
  const navigate = useNavigate();
  
  const [data, setData] = useState([
    {
      id: 'c1',
      name: 'FINANCE',
      type: 'chapter',
      subject: 'Accountancy',
      questions: 0,
      children: []
    },
    {
      id: 'c2',
      name: 'Grammar',
      type: 'chapter',
      subject: 'English',
      questions: 3,
      children: [
        {
          id: 't1',
          name: 'Tense',
          type: 'topic',
          subject: 'English',
          questions: 0,
          children: [
            { id: 'st1', name: 'Past', type: 'subtopic', subject: 'English', questions: 0 },
            { id: 'st2', name: 'Present', type: 'subtopic', subject: 'English', questions: 0 },
            { id: 'st3', name: 'Verbs', type: 'subtopic', subject: 'English', questions: 0 }
          ]
        }
      ]
    },
    {
      id: 'c3',
      name: 'Reading and Compresion',
      type: 'chapter',
      subject: 'English',
      questions: 0,
      children: []
    },
    {
      id: 'c4',
      name: 'Vocabulary',
      type: 'chapter',
      subject: 'English',
      questions: 2,
      children: []
    }
  ]);

  const [modalState, setModalState] = useState({ isOpen: false, type: null, parent: null, item: null });
  const [inputValue, setInputValue] = useState('');
  const [subjectValue, setSubjectValue] = useState('');

  const openModal = (type, parent = null, item = null) => {
    setModalState({ isOpen: true, type, parent, item });
    if (item) {
      setInputValue(item.name);
      if (item.type === 'chapter') setSubjectValue(item.subject);
    } else {
      setInputValue('');
      setSubjectValue('');
    }
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: null, parent: null, item: null });
    setInputValue('');
    setSubjectValue('');
  };

  const handleSave = () => {
    if (!inputValue) return;
    
    // Edit existing
    if (modalState.item) {
      const updateNode = (nodes) => {
        return nodes.map(n => {
          if (n.id === modalState.item.id) {
            return { ...n, name: inputValue, subject: modalState.item.type === 'chapter' ? subjectValue : n.subject };
          }
          if (n.children) return { ...n, children: updateNode(n.children) };
          return n;
        });
      };
      setData(updateNode(data));
    } 
    // Add New
    else {
      const newItem = {
        id: Math.random().toString(36).substr(2, 9),
        name: inputValue,
        type: modalState.type,
        subject: modalState.type === 'chapter' ? subjectValue : modalState.parent?.subject,
        questions: 0,
        children: modalState.type === 'subtopic' ? undefined : []
      };

      if (modalState.type === 'chapter') {
        setData([...data, newItem]);
      } else {
        const addChild = (nodes) => {
          return nodes.map(n => {
            if (n.id === modalState.parent.id) {
              return { ...n, children: [...(n.children || []), newItem] };
            }
            if (n.children) return { ...n, children: addChild(n.children) };
            return n;
          });
        };
        setData(addChild(data));
      }
    }
    closeModal();
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      const removeNode = (nodes) => {
        return nodes.filter(n => n.id !== id).map(n => {
          if (n.children) return { ...n, children: removeNode(n.children) };
          return n;
        });
      };
      setData(removeNode(data));
    }
  };

  const renderModal = () => {
    if (!modalState.isOpen) return null;

    let title = '';
    let placeholder = '';
    let hint = '';

    if (modalState.item) {
      title = `Edit ${modalState.item.type === 'chapter' ? 'chapter' : modalState.item.type === 'topic' ? 'topic' : 'sub-topic'}`;
    } else if (modalState.type === 'chapter') {
      title = 'New chapter';
      placeholder = 'e.g. Algebra';
    } else if (modalState.type === 'topic') {
      title = `New topic in ${modalState.parent?.name}`;
      placeholder = 'e.g. Quadratic Equations';
      hint = 'Sub-topics sharpen practice — the ladder steps per sub-topic — but the mastery report groups them back under their topic, so tagging finely never thins the report out.';
    } else if (modalState.type === 'subtopic') {
      title = `New sub-topic in ${modalState.parent?.subject} > ${modalState.parent?.name}`;
      placeholder = 'e.g. Factorising';
      hint = 'Sub-topics sharpen practice — the ladder steps per sub-topic — but the mastery report groups them back under their topic, so tagging finely never thins the report out.';
    }

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-none shadow-xl w-[400px] overflow-hidden">
          <div className="flex justify-between items-center px-4 py-3 border-b border-slate-200">
            <h2 className="text-[15px] font-bold text-slate-700">{title}</h2>
            <button onClick={closeModal} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
          </div>
          
          <div className="p-4 space-y-4">
            {(modalState.type === 'chapter' || (modalState.item && modalState.item.type === 'chapter')) && (
              <div>
                <label className="block text-[11px] font-bold text-slate-800 mb-1">Subject <span className="text-red-500">*</span></label>
                <select 
                  value={subjectValue}
                  onChange={(e) => setSubjectValue(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm bg-white focus:outline-none focus:border-[#6f42c1]"
                >
                  <option value="">-- Select --</option>
                  <option value="Accountancy">Accountancy</option>
                  <option value="English">English</option>
                  <option value="Mathematics">Mathematics</option>
                </select>
              </div>
            )}
            
            <div>
              <label className="block text-[11px] font-bold text-slate-800 mb-1">
                {modalState.type === 'chapter' ? 'Chapter name' : modalState.type === 'topic' ? 'Topic name' : 'Sub-topic name'} <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={placeholder} 
                className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm focus:outline-none focus:border-[#6f42c1]"
                autoFocus
              />
              {hint && <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">{hint}</p>}
            </div>
          </div>
          
          <div className="px-4 py-3 border-t border-slate-200 flex justify-end gap-2">
            <button onClick={closeModal} className="px-4 py-1.5 border border-slate-300 rounded-none text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors">Cancel</button>
            <button onClick={handleSave} className="px-4 py-1.5 bg-[#6f42c1] text-white rounded-none text-xs font-bold hover:bg-[#5a32a3] transition-colors">
              {modalState.item ? 'Save changes' : modalState.type === 'chapter' ? 'Add chapter' : 'Add'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderRow = (item, level = 0, index, parentNodes) => {
    const isChapter = item.type === 'chapter';
    const isTopic = item.type === 'topic';
    const isSubtopic = item.type === 'subtopic';

    let topicsCount = 0;
    let subtopicsCount = 0;

    if (isChapter) {
      topicsCount = item.children?.length || 0;
      subtopicsCount = item.children?.reduce((acc, curr) => acc + (curr.children?.length || 0), 0);
    } else if (isTopic) {
      subtopicsCount = item.children?.length || 0;
    }

    return (
      <React.Fragment key={item.id}>
        <div className="flex items-center border-b border-slate-200 bg-white hover:bg-slate-50 transition-colors py-2 px-4 group">
          
          {/* Name Column with Tree Lines */}
          <div className="flex-1 flex items-center min-w-[300px]">
            {level === 1 && (
              <div className="w-6 h-full flex justify-center mr-2">
                <div className="border-l border-slate-300 h-10 -mt-10"></div>
                <div className="border-b border-slate-300 w-4 h-0 mt-5"></div>
              </div>
            )}
            {level === 2 && (
              <div className="w-12 h-full flex items-center mr-2 relative">
                <div className="absolute left-[11px] top-[-20px] bottom-0 border-l border-slate-300"></div>
                <div className="absolute left-[27px] w-4 border-b border-slate-300"></div>
              </div>
            )}
            
            <span className={`${isChapter ? 'font-bold text-slate-800' : isTopic ? 'text-slate-700 ml-4' : 'text-slate-600 ml-8'} text-[13px]`}>
              {item.name}
            </span>
            
            {/* Meta info */}
            <span className="text-[10px] text-slate-400 ml-2">
              {isChapter && `${topicsCount} topics${subtopicsCount > 0 ? `, ${subtopicsCount} sub-topics` : ''}`}
              {isTopic && `${subtopicsCount} sub-topics`}
            </span>
          </div>

          {/* Subject Column */}
          <div className="w-48 text-[11px] text-slate-500">
            {item.subject}
          </div>

          {/* Questions Column */}
          <div className="w-32 text-[11px] text-slate-500 text-center">
            {item.questions}
          </div>

          {/* Actions Column */}
          <div className="w-48 flex justify-end items-center gap-2">
            {!isSubtopic && (
              <button 
                onClick={() => openModal(isChapter ? 'topic' : 'subtopic', item)}
                className="px-2 py-1 border border-slate-300 rounded-none text-slate-600 text-[10px] font-bold hover:bg-slate-100 transition-colors flex items-center gap-1 bg-white"
              >
                <Plus className="w-3 h-3" /> {isChapter ? 'Topic' : 'Sub-topic'}
              </button>
            )}
            <button 
              onClick={() => openModal(item.type, null, item)}
              className="p-1 border border-slate-300 rounded-none text-slate-600 hover:bg-slate-100 transition-colors bg-white"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => handleDelete(item.id, item.name)}
              className="p-1 border border-slate-300 rounded-none text-slate-600 hover:bg-slate-100 transition-colors bg-white"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Render Children */}
        {item.children && item.children.map((child, i) => renderRow(child, level + 1, i, [...parentNodes, item]))}
      </React.Fragment>
    );
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-10">
      
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-slate-200 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Chapters & Topics</h1>
          <p className="text-[11px] text-slate-500 mt-1">What the adaptive practice ladder and the topic heatmap are built on</p>
        </div>
        <button 
          onClick={() => navigate('/online-exams/question-bank')}
          className="px-4 py-2 border border-slate-300 rounded-none text-slate-600 font-bold text-[11px] hover:bg-slate-50 transition-colors flex items-center gap-2 bg-white shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Question Bank
        </button>
      </div>

      <div className="p-6 max-w-[1400px] mx-auto space-y-4">
        
        {/* Info Banner */}
        <div className="bg-[#17a2b8] text-white p-3 rounded-none text-[11px] font-bold flex items-center gap-2 shadow-sm">
          <div className="bg-white/20 p-1 rounded-none"><Info className="w-3.5 h-3.5" /></div>
          Tagging a question with a topic is what lets the module track strengths and weaknesses per student. An untagged question is still marked and still counts, but it never moves the practice ladder and never appears in the mastery report or the topic heatmap — so 'practice my weak topics' has nothing to offer on a bank with no topics.
        </div>

        {/* Filter and Add */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold text-slate-700">Subject</span>
            <select className="border border-slate-300 rounded-none px-3 py-1.5 text-xs text-slate-700 bg-white focus:outline-none w-48 shadow-sm">
              <option>All subjects</option>
              <option>Accountancy</option>
              <option>English</option>
            </select>
          </div>
          <button 
            onClick={() => openModal('chapter')}
            className="px-4 py-2 bg-[#6f42c1] hover:bg-[#5a32a3] text-white font-bold text-[11px] rounded-none shadow-sm flex items-center gap-2 transition-colors border-none cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> New chapter
          </button>
        </div>

        {/* Tree Table */}
        <div className="bg-white border border-slate-200 rounded-none shadow-sm overflow-hidden">
          {/* Header */}
          <div className="flex items-center px-4 py-3 bg-[#f8f9ff] border-b border-slate-200">
            <div className="flex-1 text-[10px] font-bold text-[#6f42c1] uppercase tracking-wider">CHAPTER / TOPIC / SUB-TOPIC</div>
            <div className="w-48 text-[10px] font-bold text-[#6f42c1] uppercase tracking-wider">SUBJECT</div>
            <div className="w-32 text-[10px] font-bold text-[#6f42c1] uppercase tracking-wider text-center">QUESTIONS</div>
            <div className="w-48 text-[10px] font-bold text-[#6f42c1] uppercase tracking-wider text-right pr-2">ACTIONS</div>
          </div>
          
          {/* Rows */}
          <div className="flex flex-col">
            {data.map((chapter, i) => renderRow(chapter, 0, i, []))}
            {data.length === 0 && (
              <div className="p-8 text-center text-slate-500 text-sm">No chapters found. Add one to get started.</div>
            )}
          </div>
        </div>

      </div>

      {renderModal()}
    </div>
  );
}
