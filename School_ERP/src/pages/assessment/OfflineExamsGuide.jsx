import React from 'react';
import { BookOpen, HelpCircle, FileText, CheckCircle } from 'lucide-react';

export default function OfflineExamsGuide() {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-none shadow-sm p-6">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-indigo-600" /> Offline Exams Setup Guide
        </h2>
        <p className="text-slate-600 mb-6">Follow these basic steps to get your offline examinations up and running.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-slate-100 bg-slate-50 rounded-none p-5">
             <div className="flex items-center gap-3 mb-3">
               <div className="w-8 h-8 rounded-none bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center">1</div>
               <h3 className="font-bold text-slate-800">Set Exam Types</h3>
             </div>
             <p className="text-sm text-slate-600 ml-11">First, define the type of exams that your school conducts (e.g. Unit Test, Half Yearly, Term Exam) from the Exam Types tab.</p>
          </div>

          <div className="border border-slate-100 bg-slate-50 rounded-none p-5">
             <div className="flex items-center gap-3 mb-3">
               <div className="w-8 h-8 rounded-none bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center">2</div>
               <h3 className="font-bold text-slate-800">Manage Grading</h3>
             </div>
             <p className="text-sm text-slate-600 ml-11">Setup your grading scales in the Manage Grades tab to assign letter grades correctly according to score percentages.</p>
          </div>

          <div className="border border-slate-100 bg-slate-50 rounded-none p-5">
             <div className="flex items-center gap-3 mb-3">
               <div className="w-8 h-8 rounded-none bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center">3</div>
               <h3 className="font-bold text-slate-800">Schedule & Marks Setup</h3>
             </div>
             <p className="text-sm text-slate-600 ml-11">Create exam mappings for various subjects and setup max marks and pass marks. Link co-curricular subjects if applicable.</p>
          </div>

          <div className="border border-slate-100 bg-slate-50 rounded-none p-5">
             <div className="flex items-center gap-3 mb-3">
               <div className="w-8 h-8 rounded-none bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center">4</div>
               <h3 className="font-bold text-slate-800">Enter Marks</h3>
             </div>
             <p className="text-sm text-slate-600 ml-11">Finally, teachers and admins can begin entering marks from the Enter Marks section to automatically generate report cards.</p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100">
           <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-3">
             <HelpCircle className="w-4 h-4 text-orange-500" /> Need more help?
           </h3>
           <p className="text-sm text-slate-600">You can always find more in-depth documentation in the primary Help Center, or contact technical support for personalized assistance.</p>
        </div>
      </div>
    </div>
  );
}
