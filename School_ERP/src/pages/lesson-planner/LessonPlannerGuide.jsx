import React from 'react';
import { 
  LayoutDashboard, BookOpen, Users, CheckSquare, BarChart2, Settings, HelpCircle, 
  Plus, Lightbulb, FileText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LessonPlannerGuide() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-10">
      
      {/* Header */}
      <div className="bg-white px-6 py-4 flex justify-between items-center border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Lesson Planner</h1>
          <p className="text-[11px] text-slate-500 mt-1">Plan the week ahead â€” objectives, methods, syllabus topics â€” submit for approval, then track coverage.</p>
        </div>
        <button 
          onClick={() => navigate('/lesson-planner/new')}
          className="px-4 py-2 bg-[#007bff] hover:bg-[#0056b3] text-white font-bold text-[12px] rounded-none flex items-center gap-2 transition-colors cursor-pointer border-none shadow-sm"
        >
          <Plus className="w-4 h-4" /> New Lesson Plan
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white px-6 border-b border-slate-200 flex items-center gap-6 text-[12px] font-bold overflow-x-auto">
        <button onClick={() => navigate('/lesson-planner/dashboard')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer whitespace-nowrap">
          <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
        </button>
        <button onClick={() => navigate('/lesson-planner/plans')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer whitespace-nowrap">
          <BookOpen className="w-3.5 h-3.5" /> Lesson Plans
        </button>
        <button onClick={() => navigate('/lesson-planner/review')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer whitespace-nowrap">
          <Users className="w-3.5 h-3.5" /> Review (HOD)
        </button>
        <button onClick={() => navigate('/lesson-planner/approvals')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer whitespace-nowrap">
          <CheckSquare className="w-3.5 h-3.5" /> Approvals
        </button>
        <button onClick={() => navigate('/lesson-planner/coverage')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer whitespace-nowrap">
          <FileText className="w-3.5 h-3.5" /> Coverage
        </button>
        <button onClick={() => navigate('/lesson-planner/reports')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer whitespace-nowrap">
          <BarChart2 className="w-3.5 h-3.5" /> Reports
        </button>
        <button onClick={() => navigate('/lesson-planner/settings')} className="flex items-center gap-2 py-3 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer whitespace-nowrap">
          <Settings className="w-3.5 h-3.5" /> Settings
        </button>
        <button className="flex items-center gap-2 py-3 text-slate-800 border-b-2 border-slate-800 cursor-pointer whitespace-nowrap">
          <HelpCircle className="w-3.5 h-3.5" /> Guide
        </button>
      </div>

      <div className="p-6 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Main Guide Content */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white border border-slate-200 rounded-none shadow-sm p-6 space-y-6">
            
            {/* Intro */}
            <div>
              <h2 className="text-[14px] font-bold text-slate-800 mb-2">What is a lesson plan â€” and how is it different from Classwork?</h2>
              <p className="text-[12px] text-slate-600 leading-relaxed">
                A <strong>lesson plan</strong> is what you submit <em>before</em> a teaching week â€” objectives, methods, teaching aids and the syllabus topics you intend to cover. Your <strong>Classwork & Logbook</strong> records what was <em>actually</em> taught. The planner closes the loop: chapters come from the <strong>Syllabus</strong>, the plan is approved, and after the week you mark each topic covered â€” which feeds the logbook and the principal's <strong>syllabus-completion report</strong> (the document CBSE inspections check).
              </p>
            </div>

            {/* Tabs at a glance */}
            <div>
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">The tabs at a glance</h3>
              <ul className="space-y-3 text-[12px] text-slate-600">
                <li className="flex items-start gap-2">
                  <LayoutDashboard className="w-4 h-4 text-[#007bff] shrink-0 mt-0.5" />
                  <span><strong>Dashboard</strong> â€” your at-a-glance counts: drafts, pending review, approved, items needing revision, this week's plans, and overall syllabus coverage.</span>
                </li>
                <li className="flex items-start gap-2">
                  <BookOpen className="w-4 h-4 text-[#007bff] shrink-0 mt-0.5" />
                  <span><strong>Lesson Plans</strong> â€” create, edit, submit and clone your plans. (Admins see every teacher's plans here.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Users className="w-4 h-4 text-[#007bff] shrink-0 mt-0.5" />
                  <span><strong>Review (HOD)</strong> â€” if you are a department head, plans routed to you wait here to be approved (forwarded to the principal) or returned to the teacher with comments.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckSquare className="w-4 h-4 text-[#007bff] shrink-0 mt-0.5" />
                  <span><strong>Approvals</strong> â€” the principal/admin queue of plans awaiting final approval. Approve one at a time (with inline comment) or tick several and Approve selected in bulk.</span>
                </li>
                <li className="flex items-start gap-2">
                  <FileText className="w-4 h-4 text-[#007bff] shrink-0 mt-0.5" />
                  <span><strong>Coverage</strong> â€” after a week ends, mark each planned topic Covered / Partial / Not covered. Covered & partial topics are auto-logged to Classwork & Logbook.</span>
                </li>
                <li className="flex items-start gap-2">
                  <BarChart2 className="w-4 h-4 text-[#007bff] shrink-0 mt-0.5" />
                  <span><strong>Reports</strong> â€” syllabus-completion % by class, subject and teacher, per-plan detail, chronic non-coverage flags, and a one-click PDF for inspections.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Settings className="w-4 h-4 text-[#007bff] shrink-0 mt-0.5" />
                  <span><strong>Settings</strong> (admin) â€” turn the HOD step on/off, map departments to their heads, and set the weekly-reminder day/time and submission deadline.</span>
                </li>
              </ul>
            </div>

            {/* The weekly flow */}
            <div>
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">The weekly flow</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded-none bg-[#007bff] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</div>
                  <p className="text-[12px] text-slate-600"><strong>Plan (teacher).</strong> Create a plan per subject/section/week. Pick chapters & topics from the syllabus, set learning objectives, choose teaching methods and aids, add homework. Planned periods auto-suggest from your timetable. Save as a draft and edit anytime.</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded-none bg-[#007bff] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</div>
                  <p className="text-[12px] text-slate-600"><strong>Submit.</strong> One click sends it for review. If your school uses HODs, it goes to your department head first, then the principal; otherwise straight to the principal. Once submitted you can't edit it unless it's returned.</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded-none bg-[#007bff] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</div>
                  <p className="text-[12px] text-slate-600"><strong>Review (HOD, optional).</strong> The department head approves (forwarding to the principal) or returns it with comments on specific sections.</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded-none bg-[#007bff] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">4</div>
                  <p className="text-[12px] text-slate-600"><strong>Approve (principal).</strong> The principal approves â€” individually with inline comments, or in bulk â€” or returns it for revision.</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded-none bg-[#007bff] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">5</div>
                  <p className="text-[12px] text-slate-600"><strong>Revise & resubmit.</strong> If returned, the reviewer's comments show highlighted on the plan. Fix the flagged parts and resubmit â€” every revision is counted in the audit trail.</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-5 h-5 rounded-none bg-[#007bff] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">6</div>
                  <p className="text-[12px] text-slate-600"><strong>Cover.</strong> After the week ends, open <strong>Coverage</strong> and mark each topic Covered / Partial / Not covered (with a reason). This updates your logbook and the syllabus-completion report automatically.</p>
                </div>
              </div>
            </div>

            {/* Who does what */}
            <div>
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Who does what</h3>
              <div className="space-y-4">
                <div className="pl-3 border-l-2 border-[#007bff]">
                  <h4 className="text-[12px] font-bold text-slate-800 flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-slate-400" /> Teachers</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Create & submit plans for their own classes only, revise returned plans, and mark coverage after the week. They see their own plans and reports.</p>
                </div>
                <div className="pl-3 border-l-2 border-[#fd7e14]">
                  <h4 className="text-[12px] font-bold text-slate-800 flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-slate-400" /> Heads of Department (HOD)</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">A teacher mapped as a department head in Settings. They review plans from their department in the Review tab â€” approve to forward, or return with comments. Only plans routed to them appear.</p>
                </div>
                <div className="pl-3 border-l-2 border-[#28a745]">
                  <h4 className="text-[12px] font-bold text-slate-800 flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-slate-400" /> Principal / Admin</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Final approval (single or bulk), see every plan and the school-wide reports, and configure the module in Settings.</p>
                </div>
              </div>
            </div>

            {/* Coverage & reports */}
            <div>
              <h4 className="text-[13px] font-bold text-[#007bff] flex items-center gap-1.5 mb-2"><BarChart2 className="w-4 h-4" /> Coverage & the syllabus-completion report</h4>
              <p className="text-[12px] text-slate-600 mb-2">
                Marking a topic <strong>Covered</strong> or <strong>Partial</strong> automatically creates a matching entry in <strong>Classwork & Logbook</strong> â€” so you never write the same thing twice, and the "what was taught" record stays truthful. Changing it back to <em>Not covered</em> removes that logbook entry.
              </p>
              <p className="text-[12px] text-slate-600">
                The <strong>Reports</strong> tab rolls this up into a completion percentage (Covered = full, Partial = half) by class, subject and teacher. Anyone consistently below the threshold is flagged as <strong>chronic non-coverage</strong>, and the whole report exports to <strong>PDF</strong> for CBSE inspection.
              </p>
            </div>

            {/* Reminders */}
            <div>
              <h4 className="text-[13px] font-bold text-[#007bff] flex items-center gap-1.5 mb-2"><LayoutDashboard className="w-4 h-4" /> Weekly reminders</h4>
              <p className="text-[12px] text-slate-600">
                Teachers who haven't submitted for the coming week get an automatic reminder on the day/time set in <strong>Settings</strong> (default Friday 3 PM). It lists how many plans are still pending and the submission deadline. Delivery channels (in-app, email, SMS, WhatsApp) are chosen per school in Settings to Notifications.
              </p>
            </div>

          </div>
          
          {/* Tip Box */}
          <div className="bg-[#17a2b8] text-white p-4 rounded-none flex items-start gap-3 shadow-sm">
            <Lightbulb className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-[13px] font-medium leading-relaxed">
              <strong>Tip: use <em>Clone to next week</em> on any plan to carry its structure forward</strong> â€” then just swap the topics. Great for recurring weekly subjects.
            </p>
          </div>

        </div>

        {/* Right Column - Sidebars */}
        <div className="space-y-6">
          
          {/* Status Messages */}
          <div className="bg-white border border-slate-200 rounded-none shadow-sm p-5">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Status Messages</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="px-1.5 py-0.5 bg-slate-500 text-white text-[9px] font-bold rounded-none mt-0.5">Draft</span>
                <span className="text-[11px] text-slate-600">yours to edit, not yet submitted.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="px-1.5 py-0.5 bg-[#17a2b8] text-white text-[9px] font-bold rounded-none mt-0.5 whitespace-nowrap">Pending HOD</span>
                <span className="text-[11px] text-slate-600">waiting on the department head.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="px-1.5 py-0.5 bg-[#007bff] text-white text-[9px] font-bold rounded-none mt-0.5 whitespace-nowrap">Pending Principal</span>
                <span className="text-[11px] text-slate-600">waiting on the principal.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="px-1.5 py-0.5 bg-[#28a745] text-white text-[9px] font-bold rounded-none mt-0.5">Approved</span>
                <span className="text-[11px] text-slate-600">locked and approved.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="px-1.5 py-0.5 bg-[#dc3545] text-white text-[9px] font-bold rounded-none mt-0.5 whitespace-nowrap">Needs revision</span>
                <span className="text-[11px] text-slate-600">returned to you with comments.</span>
              </div>
            </div>
          </div>

          {/* Coverage Labels */}
          <div className="bg-white border border-slate-200 rounded-none shadow-sm p-5">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Coverage Labels</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="px-1.5 py-0.5 bg-[#28a745] text-white text-[9px] font-bold rounded-none mt-0.5">Covered</span>
                <span className="text-[11px] text-slate-600">taught as planned (logged to Classwork).</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="px-1.5 py-0.5 bg-[#ffc107] text-white text-[9px] font-bold rounded-none mt-0.5">Partial</span>
                <span className="text-[11px] text-slate-600">partly taught; add a reason.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="px-1.5 py-0.5 bg-[#dc3545] text-white text-[9px] font-bold rounded-none mt-0.5 whitespace-nowrap">Not covered</span>
                <span className="text-[11px] text-slate-600">missed; add a reason. Counts against completion.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="px-1.5 py-0.5 bg-slate-500 text-white text-[9px] font-bold rounded-none mt-0.5">Pending</span>
                <span className="text-[11px] text-slate-600">not yet reconciled after the week.</span>
              </div>
            </div>
          </div>

          {/* Good to Know */}
          <div className="bg-white border border-slate-200 rounded-none shadow-sm p-5">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Good to know</h3>
            <ul className="list-disc pl-4 space-y-2 text-[11px] text-slate-600">
              <li>Teachers only ever see and plan for <strong>their own allotted classes</strong>.</li>
              <li>The <strong>HOD step is optional</strong> â€” schools without HODs go teacher to principal.</li>
              <li>Topics <em>pulled from the syllabus</em> drive the completion %; you can still add ad-hoc topics.</li>
              <li>Every submit, approval and return is kept in the plan's <strong>audit history</strong>.</li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}
