import React from 'react';
import { BookOpen, Calendar as CalendarIcon, Filter, Save, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NewLessonPlan() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-20">
      
      {/* Header */}
      <div className="bg-white px-6 py-4 flex items-center gap-2 border-b border-slate-200">
        <BookOpen className="w-5 h-5 text-[#007bff]" />
        <h1 className="text-[16px] font-bold text-slate-800">New Lesson Plan</h1>
      </div>

      <div className="p-6 max-w-[1200px] mx-auto space-y-5">
        
        {/* Row 1: Teacher, Class, Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Teacher <span className="text-red-500">*</span>
            </label>
            <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] focus:outline-none focus:border-[#007bff] bg-white">
              <option>-- Select teacher --</option>
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Class <span className="text-red-500">*</span>
            </label>
            <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] focus:outline-none focus:border-[#007bff] bg-white">
              <option>-- Select class --</option>
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Section <span className="text-red-500">*</span>
            </label>
            <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] focus:outline-none focus:border-[#007bff] bg-white text-slate-400">
              <option>-- Select section --</option>
            </select>
          </div>
        </div>

        {/* Row 2: Subject */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="md:col-span-1">
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Subject <span className="text-red-500">*</span>
            </label>
            <select className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] focus:outline-none focus:border-[#007bff] bg-white text-slate-400">
              <option>-- Select subject --</option>
            </select>
          </div>
        </div>

        {/* Row 3: Periods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Period start <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input type="text" placeholder="dd-mm-yyyy" className="w-full pl-3 pr-10 py-2 border border-slate-300 rounded-none text-[13px] focus:outline-none focus:border-[#007bff] bg-white" />
              <CalendarIcon className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
            </div>
            <p className="text-[9px] text-slate-400 mt-1">Can be a week, a month, or any custom range (up to 90 days).</p>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Period end <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input type="text" placeholder="dd-mm-yyyy" className="w-full pl-3 pr-10 py-2 border border-slate-300 rounded-none text-[13px] focus:outline-none focus:border-[#007bff] bg-white" />
              <CalendarIcon className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1 flex justify-between">
              <span>Planned periods</span>
              <span className="text-slate-400 font-normal">suggested from timetable</span>
            </label>
            <input type="number" placeholder="e.g. 5" className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] focus:outline-none focus:border-[#007bff] bg-white" />
          </div>
        </div>

        {/* Row 4: Title */}
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">
            Title <span className="text-slate-400 font-normal">(optional — auto-generated if blank)</span>
          </label>
          <input type="text" placeholder="e.g. Photosynthesis — Grade 7 (week of 08 Jun)" className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] focus:outline-none focus:border-[#007bff] bg-white" />
        </div>

        {/* Row 5: Chapter/unit names */}
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">
            Chapter / unit names <span className="text-slate-400 font-normal">(one per line)</span>
          </label>
          <textarea rows="3" placeholder="e.g. Missing Numbers&#10;Numbers 1-10" className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] focus:outline-none focus:border-[#007bff] bg-white resize-y"></textarea>
        </div>

        {/* Row 6: Learning objectives */}
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">
            Learning objectives <span className="text-red-500">*</span> <span className="text-slate-400 font-normal">(required to submit)</span>
          </label>
          <textarea rows="3" placeholder="What should students be able to do by the end of the period?" className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] focus:outline-none focus:border-[#007bff] bg-white resize-y"></textarea>
        </div>

        {/* Row 7: Checkboxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-2">Teaching methods</label>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {['Lecture', 'Activity', 'Demonstration', 'Discussion', 'Group work', 'Audio-visual', 'Experiment / Lab'].map(method => (
                <label key={method} className="flex items-center gap-1.5 text-[12px] text-slate-700 cursor-pointer">
                  <input type="checkbox" className="w-3.5 h-3.5 border-slate-300 text-[#007bff] focus:ring-[#007bff] rounded-none" />
                  {method}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-2">Teaching aids</label>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {['Textbook', 'Projector', 'Smart board', 'Lab equipment', 'Charts / Models', 'Worksheets', 'Digital content'].map(aid => (
                <label key={aid} className="flex items-center gap-1.5 text-[12px] text-slate-700 cursor-pointer">
                  <input type="checkbox" className="w-3.5 h-3.5 border-slate-300 text-[#007bff] focus:ring-[#007bff] rounded-none" />
                  {aid}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Row 8: Resources */}
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">
            Resources required <span className="text-slate-400 font-normal">(materials, equipment, etc.)</span>
          </label>
          <textarea rows="2" placeholder="e.g. Black board, chalk, flashcards, chart, crayon" className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] focus:outline-none focus:border-[#007bff] bg-white resize-y"></textarea>
        </div>

        {/* Row 9: Syllabus topics */}
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">
            Syllabus topics <span className="text-slate-400 font-normal">(pick chapters/topics from the syllabus — hold Ctrl/Cmd to select several)</span>
          </label>
          <div className="w-full h-32 border border-slate-300 rounded-none bg-white relative">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* This represents the empty state shown in the screenshot */}
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-8 border-l border-slate-200 bg-slate-50 flex flex-col">
              <button className="flex-1 flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors border-b border-slate-200">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 5L5 1L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button className="flex-1 flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Select a class and subject to load syllabus topics.</p>
        </div>

        {/* Row 10: Additional topics */}
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">
            Additional topics <span className="text-slate-400 font-normal">(one per line — for anything not in the syllabus)</span>
          </label>
          <textarea rows="2" placeholder="e.g. Revision of last week&#10;Surprise quiz" className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] focus:outline-none focus:border-[#007bff] bg-white resize-y"></textarea>
        </div>

        {/* Row 11: Homework */}
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">
            Homework / assignments planned
          </label>
          <textarea rows="2" placeholder="Homework / assignments you intend to set (e.g. Monthly evaluation, worksheets)" className="w-full px-3 py-2 border border-slate-300 rounded-none text-[13px] focus:outline-none focus:border-[#007bff] bg-white resize-y"></textarea>
        </div>
      </div>

      {/* Fixed Footer Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 flex gap-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10">
        <button className="px-4 py-2 bg-slate-500 hover:bg-slate-600 text-white font-bold text-[12px] rounded-none flex items-center gap-2 transition-colors">
          <Save className="w-3.5 h-3.5" /> Save draft
        </button>
        <button className="px-4 py-2 bg-[#fd7e14] hover:bg-[#e86e0c] text-white font-bold text-[12px] rounded-none flex items-center gap-2 transition-colors">
          <Send className="w-3.5 h-3.5" /> Save & submit for review
        </button>
        <button 
          onClick={() => navigate('/lesson-planner/dashboard')}
          className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-bold text-[12px] rounded-none transition-colors"
        >
          Cancel
        </button>
      </div>

    </div>
  );
}
