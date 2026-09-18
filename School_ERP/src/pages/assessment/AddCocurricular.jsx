import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, BookOpen, Users, Star } from 'lucide-react';

export default function AddCocurricular() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f4f6f9] font-sans pb-10">
      <div className="bg-white p-6 border-b border-slate-200">
        <h1 className="text-xl font-bold text-slate-800">Add New Cocurricular Area</h1>
      </div>

      <div className="p-6 max-w-[1200px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Left Form Panel */}
          <div className="flex-1 bg-white border border-slate-200 rounded-none shadow-sm overflow-hidden h-fit">
            <div className="px-4 py-3 border-t-2 border-t-[#fd7e14] border-b border-slate-200 flex items-center gap-2 text-[#007bff]">
              <Globe className="w-4 h-4" />
              <h2 className="text-sm font-bold">Area Details</h2>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">
                  Area Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="e.g., Art & Culture, Health & Physical Education"
                  className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#fd7e14]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-2">
                  Assign to Specific Classes 
                  <span className="bg-[#17a2b8] text-white text-[10px] px-1.5 py-0.5 rounded">Optional</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Choose specific classes..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-none text-sm text-slate-700 focus:outline-none focus:border-[#fd7e14]"
                />
                <p className="text-[11px] text-[#17a2b8] flex items-start gap-1 mt-1">
                  <span className="font-bold">i</span> 
                  If you leave this box completely empty, the area will automatically become available to all classes across the school.
                </p>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
              <button 
                onClick={() => navigate('/offline-exams/cocurricular-areas')}
                className="px-6 py-2 bg-[#6c757d] hover:bg-[#5a6268] text-white font-bold text-sm rounded-none shadow-sm transition-colors cursor-pointer border-none"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  alert('Area saved successfully!');
                  navigate('/offline-exams/cocurricular-areas');
                }}
                className="px-6 py-2 bg-[#fd7e14] hover:bg-[#e86e10] text-white font-bold text-sm rounded-none shadow-sm flex items-center gap-2 transition-colors cursor-pointer border-none"
              >
                <span className="text-sm">💾</span> Save Area
              </button>
            </div>
          </div>

          {/* Right Documentation Panel */}
          <div className="w-full lg:w-[350px] space-y-4">
            <div className="flex items-center gap-2 text-[#17a2b8] mb-2 px-2">
              <BookOpen className="w-4 h-4" />
              <h2 className="text-sm font-bold">Documentation</h2>
            </div>
            
            <div className="bg-white border-l-4 border-l-[#17a2b8] border border-slate-200 rounded-none shadow-sm p-4">
              <h3 className="text-[13px] font-bold text-[#17a2b8] flex items-center gap-2 mb-2">
                <Globe className="w-4 h-4" /> What are they?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cocurricular areas are non-scholastic domains where a student's personal growth is assessed. Common examples include <em>Discipline</em>, <em>Work Education</em>, and <em>Art & Culture</em>.
              </p>
            </div>
            
            <div className="bg-white border-l-4 border-l-[#28a745] border border-slate-200 rounded-none shadow-sm p-4">
              <h3 className="text-[13px] font-bold text-[#28a745] flex items-center gap-2 mb-2">
                <Users className="w-4 h-4" /> Class Assignments
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Some areas are age-specific. For example, Nursery might be assessed on "Motor Skills", while Grade 10 is assessed on "Work Education". Select exactly which classes this applies to.
              </p>
            </div>
            
            <div className="bg-white border-l-4 border-l-[#ffc107] border border-slate-200 rounded-none shadow-sm p-4">
              <h3 className="text-[13px] font-bold text-[#ffc107] flex items-center gap-2 mb-2">
                <Star className="w-4 h-4" /> How are they graded?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Unlike scholastic exams, cocurricular areas do not utilize numerical marks (e.g., 90/100). They are assessed strictly using Grade Scales (e.g., "A", "B", "C") or Descriptive Indicators.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
