import React from 'react';
import { 
  LayoutDashboard, Layers, FileSignature, Scale, LineChart, BookOpen, Plus, 
  Info, Navigation
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function OSMGuide() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-10">
      {/* Header */}
      <div className="bg-white px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Digital Evaluation</h1>
          <p className="text-[11px] text-slate-500 mt-1">On-screen marking of scanned answer sheets — upload, evaluate question-by-question, and report.</p>
        </div>
        <button 
          onClick={() => navigate('/osm-module/sessions/new')}
          className="mt-4 md:mt-0 px-4 py-2 bg-[#6f42c1] hover:bg-[#5a32a3] text-white font-bold text-[11px] rounded-none flex items-center gap-2 transition-colors cursor-pointer border-none shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" /> New Session
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white px-6 border-b border-slate-200 flex items-center gap-6 text-[12px] font-bold">
        <button onClick={() => navigate('/osm-module/dashboard')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">
          <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
        </button>
        <button onClick={() => navigate('/osm-module/sessions')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">
          <Layers className="w-3.5 h-3.5" /> Sessions
        </button>
        <button onClick={() => navigate('/osm-module/evaluate')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">
          <FileSignature className="w-3.5 h-3.5" /> Evaluate
        </button>
        <button onClick={() => navigate('/osm-module/moderation')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">
          <Scale className="w-3.5 h-3.5" /> Moderation
        </button>
        <button onClick={() => navigate('/osm-module/reports')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">
          <LineChart className="w-3.5 h-3.5" /> Reports
        </button>
        <button className="flex items-center gap-2 py-3 text-slate-800 border-b-2 border-slate-800 cursor-pointer">
          <BookOpen className="w-3.5 h-3.5" /> Guide
        </button>
      </div>

      <div className="p-6 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Content: Left Column (takes 2 cols) */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-none shadow-sm p-6 space-y-6">
            <div>
              <h2 className="text-[16px] font-bold text-slate-800 mb-1">How On-Screen Marking (OSM) works</h2>
              <p className="text-[12px] text-slate-500">Digitize paper evaluation: scan answer sheets, mark them on-screen question-by-question, and get instant score reports — no red pen required.</p>
            </div>

            <div className="space-y-6">
              
              {/* Step 1 */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-5 h-5 flex items-center justify-center bg-slate-600 text-white rounded-none text-[11px] font-bold">1</span>
                  <h3 className="text-[13px] font-bold text-slate-800">Create a session <span className="text-slate-400 font-normal text-[11px]">(admin)</span></h3>
                </div>
                <p className="text-[12px] text-slate-600 pl-7 leading-relaxed">
                  Go to <strong>Sessions &rarr; New Session</strong>. Choose the class/section, subject, and (optionally) link an exam & exam type. Turn on <strong>Anonymous evaluation</strong> if you want evaluators to mark coded papers without seeing student names.
                </p>
              </div>

              {/* Step 2 */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-5 h-5 flex items-center justify-center bg-slate-600 text-white rounded-none text-[11px] font-bold">2</span>
                  <h3 className="text-[13px] font-bold text-slate-800">Configure the question paper</h3>
                </div>
                <p className="text-[12px] text-slate-600 pl-7 leading-relaxed">
                  On the session page, open the <strong>Question Paper</strong> tab and add each question with its maximum marks. Compulsory questions must be marked before a paper can be finished. The total is calculated for you.
                </p>
              </div>

              {/* Step 3 */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-5 h-5 flex items-center justify-center bg-slate-600 text-white rounded-none text-[11px] font-bold">3</span>
                  <h3 className="text-[13px] font-bold text-slate-800">Upload answer sheets <span className="text-slate-400 font-normal text-[11px]">(PDF / image)</span></h3>
                </div>
                <div className="text-[12px] text-slate-600 pl-7 border-l-2 border-slate-200 ml-2 mt-2 pb-2">
                  <p className="mb-2 leading-relaxed">Open the session you created (click its row on the <strong>Sessions</strong> list), then switch to the <strong>Answer Sheets</strong> tab.</p>
                  <p className="mb-2 leading-relaxed">In the upload area at the top of the tab:</p>
                  <ol className="list-decimal pl-5 mb-2 space-y-1">
                    <li>Click <strong>Add Row</strong> to add a student-file pairing line.</li>
                    <li>Select a <strong>student</strong> from the dropdown (students enrolled in this session's class/section appear here).</li>
                    <li>Choose the <strong>scanned file</strong> — accepted formats: PDF, JPG, JPEG, PNG (max 20 MB each).</li>
                    <li>Add as many rows as needed — you can upload multiple students at once.</li>
                    <li>Click <strong>Upload</strong>.</li>
                  </ol>
                  <p className="flex items-start gap-1.5 leading-relaxed text-slate-500 mt-2">
                    <Info className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                    <span>Re-uploading for an existing student replaces the previous file. Multi-page PDFs are supported and each page becomes a separate canvas during evaluation.</span>
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-5 h-5 flex items-center justify-center bg-slate-600 text-white rounded-none text-[11px] font-bold">4</span>
                  <h3 className="text-[13px] font-bold text-slate-800">Assign evaluators</h3>
                </div>
                <p className="text-[12px] text-slate-600 pl-7 leading-relaxed">
                  In the <strong>Evaluators</strong> tab, pick one or more staff. Unassigned papers are shared out round-robin. Teachers only ever see the papers assigned to them.
                </p>
              </div>

              {/* Step 5 */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-5 h-5 flex items-center justify-center bg-slate-600 text-white rounded-none text-[11px] font-bold">5</span>
                  <h3 className="text-[13px] font-bold text-slate-800">Evaluate <span className="text-slate-400 font-normal text-[11px]">(evaluator)</span></h3>
                </div>
                <p className="text-[12px] text-slate-600 pl-7 leading-relaxed">
                  Open <strong>Evaluate</strong>, pick a bundle, and mark each question. Marks <strong>auto-save</strong> as you type, a timer tracks effort, and the running total updates live. Use <strong>Finish Paper</strong> when done, or <strong>Reject / UFM</strong> to flag a bad scan or unfair means.
                </p>
              </div>

              {/* Step 6 */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-5 h-5 flex items-center justify-center bg-slate-600 text-white rounded-none text-[11px] font-bold">6</span>
                  <h3 className="text-[13px] font-bold text-slate-800">Moderation <span className="text-slate-400 font-normal text-[11px]">(optional)</span></h3>
                </div>
                <p className="text-[12px] text-slate-600 pl-7 leading-relaxed">
                  If <strong>Moderation</strong> is enabled on the session, evaluated papers route to the <strong>Moderation</strong> tab for a second-level review. The moderator can adjust scores or finalize papers directly.
                </p>
              </div>

              {/* Step 7 */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-5 h-5 flex items-center justify-center bg-slate-600 text-white rounded-none text-[11px] font-bold">7</span>
                  <h3 className="text-[13px] font-bold text-slate-800">Reports</h3>
                </div>
                <p className="text-[12px] text-slate-600 pl-7 leading-relaxed">
                  The <strong>Reports</strong> tab shows per-session progress, averages, and per-student breakdowns, with a PDF download and an evaluator-performance view. The <strong>Analytics</strong> page provides deeper insights: score distribution histograms, question-wise difficulty analysis, and comparative evaluator statistics.
                </p>
              </div>

            </div>
          </div>

          {/* Side Panel: Right Column (takes 1 col) */}
          <div className="space-y-6">
            
            {/* Good to know Card */}
            <div className="bg-white border border-slate-200 rounded-none shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-4 h-4 text-[#007bff]" />
                <h3 className="text-[13px] font-bold text-slate-800">Good to know</h3>
              </div>
              <ul className="list-disc pl-5 text-[12px] text-slate-600 space-y-3 marker:text-slate-400">
                <li className="leading-relaxed">
                  Pages render on a canvas so you can annotate them — tick, cross, underline, circle, highlight, and text. Notes auto-save and appear on the downloadable <strong>evaluated copy</strong>.
                </li>
                <li className="leading-relaxed">
                  Answer sheet files never have a public URL — every view is authenticated and tenant-scoped.
                </li>
                <li className="leading-relaxed">
                  Anonymous mode hides identity from evaluators; names are revealed only in reports.
                </li>
                <li className="leading-relaxed">
                  Every score change is audit-logged.
                </li>
                <li className="leading-relaxed">
                  Sync to Report Card pushes finalized OSM scores into the exam-marks pipeline for the linked exam/subject.
                </li>
              </ul>
            </div>

            {/* Quick navigation Card */}
            <div className="bg-white border border-slate-200 rounded-none shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <Navigation className="w-4 h-4 text-[#ffc107]" />
                <h3 className="text-[13px] font-bold text-slate-800">Quick navigation</h3>
              </div>
              <ul className="list-disc pl-5 text-[12px] text-slate-600 space-y-3 marker:text-slate-400">
                <li className="leading-relaxed">
                  <strong>Upload:</strong> Sessions &rarr; click a session &rarr; Answer Sheets tab &rarr; upload area at top.
                </li>
                <li className="leading-relaxed">
                  <strong>Evaluate:</strong> Evaluate tab &rarr; pick a bundle &rarr; mark each question.
                </li>
                <li className="leading-relaxed">
                  <strong>PDF download:</strong> Answer Sheets tab &rarr; click the file icon next to a sheet, or use the file icon for the evaluated copy with annotations.
                </li>
              </ul>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
