import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Network, Star, ListChecks, FileSpreadsheet, Activity, Lightbulb, 
  Globe2, Layers, ShieldCheck, CheckCircle2, FileText, Settings, Rocket, FileQuestion
} from 'lucide-react';

const CbcDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-[#f4f6f8] overflow-y-auto">
      
      {/* Header */}
      <div className="px-8 pt-6 pb-2 bg-white">
        <h1 className="text-2xl font-bold text-[#1a1a2e] flex items-center gap-2">
          <Network className="w-6 h-6 text-[#5F52FF]" /> Competency-Based Curriculum (CBC)
        </h1>
      </div>

      <div className="p-8 w-full max-w-7xl mx-auto flex flex-col gap-6">
        
        {/* Intro Banner */}
        <div className="bg-[#eef2ff] rounded-none shadow-sm border border-blue-100 overflow-hidden relative">
          <div className="absolute right-0 top-0 w-64 h-64 bg-blue-200/40 rounded-none blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute left-1/2 bottom-0 w-64 h-64 bg-blue-200/30 rounded-none blur-3xl -mb-32"></div>
          
          <div className="p-8 relative z-10">
            <h2 className="text-xl font-bold text-[#1a1a2e] flex items-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5 text-[#5F52FF]" /> Competency-Based Assessment System
            </h2>
            <p className="text-[13px] text-gray-600 mb-6 max-w-3xl leading-relaxed">
              Move beyond rote memorization. Assess what students <strong>can do</strong>, not just what they know. This module supports competency-based education frameworks used across the world — whether your country calls it CBC, CBT, CBE, or OBA.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <span className="bg-white border border-gray-200 text-gray-700 text-[11px] font-bold px-3 py-1.5 rounded-none shadow-sm flex items-center gap-1.5"><span className="text-base">🇰🇪</span> Kenya - CBC</span>
              <span className="bg-white border border-gray-200 text-gray-700 text-[11px] font-bold px-3 py-1.5 rounded-none shadow-sm flex items-center gap-1.5"><span className="text-base">🇳🇬</span> Nigeria - CBT</span>
              <span className="bg-white border border-gray-200 text-gray-700 text-[11px] font-bold px-3 py-1.5 rounded-none shadow-sm flex items-center gap-1.5"><span className="text-base">🇮🇳</span> India - CBE / NEP 2020</span>
              <span className="bg-white border border-gray-200 text-gray-700 text-[11px] font-bold px-3 py-1.5 rounded-none shadow-sm flex items-center gap-1.5"><span className="text-base">🇬🇭</span> Ghana - SBA</span>
              <span className="bg-white border border-gray-200 text-gray-700 text-[11px] font-bold px-3 py-1.5 rounded-none shadow-sm flex items-center gap-1.5"><span className="text-base">🇿🇦</span> South Africa - OBE / CAPS</span>
              <span className="bg-white border border-gray-200 text-gray-700 text-[11px] font-bold px-3 py-1.5 rounded-none shadow-sm flex items-center gap-1.5"><span className="text-base">🇷🇼</span> Rwanda - CBC</span>
              <span className="bg-white border border-gray-200 text-gray-700 text-[11px] font-bold px-3 py-1.5 rounded-none shadow-sm flex items-center gap-1.5"><span className="text-base">🇹🇿</span> Tanzania - CBC</span>
              <span className="bg-white border border-gray-200 text-gray-700 text-[11px] font-bold px-3 py-1.5 rounded-none shadow-sm flex items-center gap-1.5"><span className="text-base">🇵🇭</span> Philippines - K-12</span>
            </div>
          </div>
          
          <div className="bg-white border-t border-blue-100 p-4 grid grid-cols-3 divide-x divide-gray-100 relative z-10">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#5F52FF]">12</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">STRANDS DEFINED</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">20</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">COMPETENCIES</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">7</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">ASSESSMENTS</div>
            </div>
          </div>
        </div>

        {/* Setup Workflow */}
        <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-[14px] font-bold text-[#5F52FF] flex items-center gap-2">
              <Settings className="w-4 h-4" /> Setup Workflow — Follow These Steps
            </h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              
              {/* Step 1 */}
              <div className="border border-gray-200 rounded-none p-5 flex flex-col items-center text-center relative group hover:border-[#5F52FF] transition-colors">
                <div className="absolute top-2 left-3 text-[10px] font-bold text-gray-400">STEP 1</div>
                <div className="w-12 h-12 rounded-none bg-blue-50 flex items-center justify-center mb-3 group-hover:bg-blue-100 transition-colors">
                  <Layers className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-[13px] font-bold text-gray-800 mb-2">Strands & Outcomes</h3>
                <p className="text-[11px] text-gray-500 mb-4 flex-1">Define broad learning areas (Strands) and specific topics (Sub-strands) for each subject. These map to curriculum standards.</p>
                <button 
                  onClick={() => navigate('/cbc/strands-outcomes')}
                  className="bg-white border border-orange-500 text-orange-500 px-4 py-1.5 rounded-none text-[12px] font-bold hover:bg-orange-50 transition-colors w-full"
                >
                  Setup Strands
                </button>
                <div className="hidden md:block absolute -right-2.5 top-1/2 -translate-y-1/2 text-gray-300 z-10 bg-white">
                  &rsaquo;
                </div>
              </div>

              {/* Step 2 */}
              <div className="border border-gray-200 rounded-none p-5 flex flex-col items-center text-center relative group hover:border-teal-500 transition-colors">
                <div className="absolute top-2 left-3 text-[10px] font-bold text-gray-400">STEP 2</div>
                <div className="w-12 h-12 rounded-none bg-teal-50 flex items-center justify-center mb-3 group-hover:bg-teal-100 transition-colors">
                  <Star className="w-6 h-6 text-teal-500" />
                </div>
                <h3 className="text-[13px] font-bold text-gray-800 mb-2">Core Competencies</h3>
                <p className="text-[11px] text-gray-500 mb-4 flex-1">Establish cross-cutting skills like Critical Thinking, Communication, and Digital Literacy that every student must develop.</p>
                <button 
                  onClick={() => navigate('/cbc/core-competencies')}
                  className="bg-white border border-teal-500 text-teal-500 px-4 py-1.5 rounded-none text-[12px] font-bold hover:bg-teal-50 transition-colors w-full"
                >
                  Setup Competencies
                </button>
                <div className="hidden md:block absolute -right-2.5 top-1/2 -translate-y-1/2 text-gray-300 z-10 bg-white">
                  &rsaquo;
                </div>
              </div>

              {/* Step 3 */}
              <div className="border border-gray-200 rounded-none p-5 flex flex-col items-center text-center relative group hover:border-green-500 transition-colors">
                <div className="absolute top-2 left-3 text-[10px] font-bold text-gray-400">STEP 3</div>
                <div className="w-12 h-12 rounded-none bg-green-50 flex items-center justify-center mb-3 group-hover:bg-green-100 transition-colors">
                  <ListChecks className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-[13px] font-bold text-gray-800 mb-2">Assessments</h3>
                <p className="text-[11px] text-gray-500 mb-4 flex-1">Create strand-linked assessments and grade students on a rubric scale (1-4). Supports formative, summative, and project-based assessments.</p>
                <button 
                  onClick={() => navigate('/cbc/assessments')}
                  className="bg-white border border-green-500 text-green-500 px-4 py-1.5 rounded-none text-[12px] font-bold hover:bg-green-50 transition-colors w-full"
                >
                  Manage Assessments
                </button>
                <div className="hidden md:block absolute -right-2.5 top-1/2 -translate-y-1/2 text-gray-300 z-10 bg-white">
                  &rsaquo;
                </div>
              </div>

              {/* Step 4 */}
              <div className="border border-gray-200 rounded-none p-5 flex flex-col items-center text-center relative group hover:border-amber-500 transition-colors">
                <div className="absolute top-2 left-3 text-[10px] font-bold text-gray-400">STEP 4</div>
                <div className="w-12 h-12 rounded-none bg-amber-50 flex items-center justify-center mb-3 group-hover:bg-amber-100 transition-colors">
                  <FileSpreadsheet className="w-6 h-6 text-amber-500" />
                </div>
                <h3 className="text-[13px] font-bold text-gray-800 mb-2">CBC Reports</h3>
                <p className="text-[11px] text-gray-500 mb-4 flex-1">Generate detailed competency report cards and progress portfolios that parents can understand — replacing simple letter grades.</p>
                <button 
                  onClick={() => navigate('/cbc/reports')}
                  className="bg-white border border-amber-500 text-amber-500 px-4 py-1.5 rounded-none text-[12px] font-bold hover:bg-amber-50 transition-colors w-full"
                >
                  View Reports
                </button>
              </div>

            </div>

            {/* Advanced Step */}
            <div className="border border-dashed border-gray-300 rounded-none p-5 flex flex-col items-center text-center bg-gray-50 relative">
              <div className="absolute top-2 left-3 text-[10px] font-bold text-gray-400">ADVANCED</div>
              <div className="w-10 h-10 rounded-none bg-purple-100 flex items-center justify-center mb-2">
                <Network className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-[13px] font-bold text-gray-800 mb-1">Senior Pathways & Subject Tracks</h3>
              <p className="text-[11px] text-gray-500 mb-3 max-w-xl mx-auto">For senior secondary levels, define Pathways (e.g., STEM, Arts & Sports) with specialized Tracks containing compulsory and elective subjects.</p>
              <button 
                onClick={() => navigate('/cbc/pathways-tracks')}
                className="bg-white border border-gray-300 text-gray-700 px-4 py-1.5 rounded-none text-[12px] font-bold hover:bg-gray-100 transition-colors shadow-sm"
              >
                Manage Pathways
              </button>
            </div>
          </div>
        </div>

        {/* Info & Tables Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* What is CBC */}
          <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-[14px] font-bold text-[#5F52FF] flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-500" /> What is Competency-Based Education?
              </h2>
              <p className="text-[11px] text-gray-500 mt-1">Understanding the shift from traditional grading</p>
            </div>
            <div className="p-6">
              <p className="text-[12px] text-gray-700 mb-3">
                <span className="font-bold">Traditional education</span> asks: "Did the student pass the exam?"<br/>
                <span className="font-bold">Competency-based education</span> asks: "Can the student actually do it?"
              </p>
              <p className="text-[12px] text-gray-700 mb-4">
                Instead of ranking students by marks, CBC assesses <strong>what a learner can demonstrate</strong> — practical skills, critical thinking, creativity, and real-world application. Students progress when they show mastery, not when a calendar says so.
              </p>
              
              <div className="bg-gray-50 border border-gray-200 rounded-none p-4">
                <h4 className="text-[12px] font-bold text-gray-800 mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> Key Principles
                </h4>
                <ul className="text-[12px] text-gray-600 space-y-1.5 ml-5 list-disc">
                  <li><strong>Strands</strong> = Major learning areas within a subject (like topics/units)</li>
                  <li><strong>Sub-strands</strong> = Specific objectives within each strand</li>
                  <li><strong>Rubrics</strong> = Grading scale (1-4) measuring mastery level</li>
                  <li><strong>Competencies</strong> = Cross-cutting life skills assessed across all subjects</li>
                  <li><strong>Formative Assessment</strong> = Ongoing evaluation, not just final exams</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Names Worldwide */}
          <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-[14px] font-bold text-[#5F52FF] flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-blue-500" /> Known By Different Names Worldwide
              </h2>
              <p className="text-[11px] text-gray-500 mt-1">Same philosophy, different terminology across countries</p>
            </div>
            <div className="p-0 overflow-x-auto">
              <table className="w-full text-left text-[12px]">
                <thead>
                  <tr className="bg-[#1a1a2e] text-white">
                    <th className="py-2 px-4 font-bold rounded-tl-sm w-40">COUNTRY</th>
                    <th className="py-2 px-4 font-bold">TERM USED</th>
                    <th className="py-2 px-4 font-bold rounded-tr-sm">FULL NAME</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2.5 px-4 font-medium flex items-center gap-2">🇰🇪 Kenya</td>
                    <td className="py-2.5 px-4"><span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded">CBC</span></td>
                    <td className="py-2.5 px-4 text-gray-600">Competency-Based Curriculum</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2.5 px-4 font-medium flex items-center gap-2">🇳🇬 Nigeria</td>
                    <td className="py-2.5 px-4"><span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded">CBT / CBE</span></td>
                    <td className="py-2.5 px-4 text-gray-600">Competency-Based Training / Education</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2.5 px-4 font-medium flex items-center gap-2">🇮🇳 India</td>
                    <td className="py-2.5 px-4"><span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded">CBE / NEP</span></td>
                    <td className="py-2.5 px-4 text-gray-600">Competency-Based Education (NEP 2020)</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2.5 px-4 font-medium flex items-center gap-2">🇬🇭 Ghana</td>
                    <td className="py-2.5 px-4"><span className="bg-cyan-100 text-cyan-700 text-[10px] font-bold px-2 py-0.5 rounded">SBA</span></td>
                    <td className="py-2.5 px-4 text-gray-600">Standards-Based Assessment</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2.5 px-4 font-medium flex items-center gap-2">🇿🇦 South Africa</td>
                    <td className="py-2.5 px-4"><span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded">OBE / CAPS</span></td>
                    <td className="py-2.5 px-4 text-gray-600">Outcomes-Based Education / CAPS</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2.5 px-4 font-medium flex items-center gap-2">🇷🇼 Rwanda</td>
                    <td className="py-2.5 px-4"><span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded">CBC</span></td>
                    <td className="py-2.5 px-4 text-gray-600">Competency-Based Curriculum</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2.5 px-4 font-medium flex items-center gap-2">🇹🇿 Tanzania</td>
                    <td className="py-2.5 px-4"><span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded">CBC</span></td>
                    <td className="py-2.5 px-4 text-gray-600">Competency-Based Curriculum</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2.5 px-4 font-medium flex items-center gap-2">🇵🇭 Philippines</td>
                    <td className="py-2.5 px-4"><span className="bg-teal-100 text-teal-700 text-[10px] font-bold px-2 py-0.5 rounded">K-12 BEC</span></td>
                    <td className="py-2.5 px-4 text-gray-600">K-12 Competency-Based Curriculum</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-3 bg-gray-50 border-t border-gray-200 text-[10px] text-gray-500 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> This module adapts to your country's framework. Seed sample data below to get started with pre-configured competencies.
            </div>
          </div>

        </div>

        {/* Module Capabilities */}
        <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-[14px] font-bold text-[#5F52FF] flex items-center gap-2">
              <Activity className="w-4 h-4 text-red-500" /> Module Capabilities
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <div className="border border-blue-200 bg-blue-50/50 p-4 rounded-none flex items-start gap-3">
                <div className="mt-1"><Layers className="w-5 h-5 text-blue-500" /></div>
                <div>
                  <h4 className="text-[12px] font-bold text-gray-800">Multi-Level Strand Hierarchy</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">Organize curriculum into Strands &rarr; Sub-strands &rarr; Learning Outcomes with unlimited nesting depth.</p>
                </div>
              </div>

              <div className="border border-green-200 bg-green-50/50 p-4 rounded-none flex items-start gap-3">
                <div className="mt-1"><ListChecks className="w-5 h-5 text-green-500" /></div>
                <div>
                  <h4 className="text-[12px] font-bold text-gray-800">Rubric-Based Grading (1-4)</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">Replace percentage marks with mastery levels: Exceeding (4), Meeting (3), Approaching (2), Below (1).</p>
                </div>
              </div>

              <div className="border border-amber-200 bg-amber-50/50 p-4 rounded-none flex items-start gap-3">
                <div className="mt-1"><Star className="w-5 h-5 text-amber-500" /></div>
                <div>
                  <h4 className="text-[12px] font-bold text-gray-800">Cross-Cutting Competencies</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">Track life-skills (Communication, Critical Thinking, Digital Literacy) across all subjects globally.</p>
                </div>
              </div>

              <div className="border border-purple-200 bg-purple-50/50 p-4 rounded-none flex items-start gap-3">
                <div className="mt-1"><Network className="w-5 h-5 text-purple-500" /></div>
                <div>
                  <h4 className="text-[12px] font-bold text-gray-800">Senior Pathways & Tracks</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">Define STEM, Arts, Business pathways with compulsory and elective subjects for senior school levels.</p>
                </div>
              </div>

              <div className="border border-cyan-200 bg-cyan-50/50 p-4 rounded-none flex items-start gap-3">
                <div className="mt-1"><FileText className="w-5 h-5 text-cyan-500" /></div>
                <div>
                  <h4 className="text-[12px] font-bold text-gray-800">Competency Report Cards</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">Generate parent-friendly reports showing competency levels, progress details, and teacher remarks per strand.</p>
                </div>
              </div>

              <div className="border border-pink-200 bg-pink-50/50 p-4 rounded-none flex items-start gap-3">
                <div className="mt-1"><Globe2 className="w-5 h-5 text-pink-500" /></div>
                <div>
                  <h4 className="text-[12px] font-bold text-gray-800">Country-Specific Presets</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">One-click seed data for Kenya (CBC), Nigeria (CBT) and Generic frameworks — customize for any country.</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Quick Start Seed Data */}
        <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-[14px] font-bold text-[#5F52FF] flex items-center gap-2">
              <Rocket className="w-4 h-4 text-teal-500" /> Quick Start — Seed Sample Data
            </h2>
            <p className="text-[11px] text-gray-500 mt-1">New to competency-based education? Seed your system with pre-configured competencies aligned to your country's framework. You can always modify or delete them later.</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              
              <div className="border border-gray-200 rounded-none p-6 text-center flex flex-col hover:border-orange-500 transition-colors">
                <div className="text-2xl mb-2">🇰🇪</div>
                <h3 className="text-[13px] font-bold text-gray-800 mb-2">Kenya — CBC Framework</h3>
                <p className="text-[11px] text-gray-500 flex-1 mb-4">7 core competencies from Kenya's KICD curriculum: Communication, Critical Thinking, Citizenship, Digital Literacy, and more.</p>
                <button 
                  onClick={() => {
                    if(window.confirm('Are you sure you want to seed Kenya CBC framework data?')) {
                      alert('Successfully seeded 7 core competencies for Kenya CBC!');
                    }
                  }}
                  className="bg-white border border-orange-500 text-orange-500 px-4 py-1.5 rounded-none text-[12px] font-bold hover:bg-orange-50 transition-colors w-full flex items-center justify-center gap-1.5"
                >
                  <Globe2 className="w-3.5 h-3.5" /> Seed Kenya CBC
                </button>
              </div>

              <div className="border border-gray-200 rounded-none p-6 text-center flex flex-col hover:border-green-600 transition-colors">
                <div className="text-2xl mb-2">🇳🇬</div>
                <h3 className="text-[13px] font-bold text-gray-800 mb-2">Nigeria — CBT Framework</h3>
                <p className="text-[11px] text-gray-500 flex-1 mb-4">Competencies from Nigeria's NERDC standards: Leadership, Entrepreneurship, ICT, Core Values, and more.</p>
                <button 
                  onClick={() => {
                    if(window.confirm('Are you sure you want to seed Nigeria CBT framework data?')) {
                      alert('Successfully seeded core competencies for Nigeria CBT!');
                    }
                  }}
                  className="bg-white border border-green-600 text-green-600 px-4 py-1.5 rounded-none text-[12px] font-bold hover:bg-green-50 transition-colors w-full flex items-center justify-center gap-1.5"
                >
                  <Globe2 className="w-3.5 h-3.5" /> Seed Nigeria CBT
                </button>
              </div>

              <div className="border border-gray-200 rounded-none p-6 text-center flex flex-col hover:border-blue-600 transition-colors">
                <div className="text-2xl mb-2">🌐</div>
                <h3 className="text-[13px] font-bold text-gray-800 mb-2">Universal / Generic</h3>
                <p className="text-[11px] text-gray-500 flex-1 mb-4">7 globally recognized competencies adaptable to any country: Communication, Critical Thinking, Creativity, Digital Literacy.</p>
                <button 
                  onClick={() => {
                    if(window.confirm('Are you sure you want to seed Generic framework data?')) {
                      alert('Successfully seeded Universal/Generic competencies!');
                    }
                  }}
                  className="bg-white border border-blue-600 text-blue-600 px-4 py-1.5 rounded-none text-[12px] font-bold hover:bg-blue-50 transition-colors w-full flex items-center justify-center gap-1.5"
                >
                  <Globe2 className="w-3.5 h-3.5" /> Seed Generic
                </button>
              </div>

            </div>

            {/* Seed Everything */}
            <div className="border border-dashed border-blue-300 bg-blue-50/50 rounded-none p-8 text-center flex flex-col items-center">
              <div className="text-2xl mb-2">🚀</div>
              <h3 className="text-[14px] font-bold text-gray-800 mb-2">Seed Full Demo Data — Everything</h3>
              <p className="text-[12px] text-gray-500 mb-6 max-w-2xl">Seeds all CBC data at once: 7 Competencies + Strands with rubrics (Math, English, Science) + Assessments with student grades + Competency scores + Senior Pathways & Tracks. <span className="font-bold">Perfect for demo or testing.</span></p>
              <button 
                onClick={() => {
                  if(window.confirm('WARNING: Doing this will seed complete demo data including Strands, Assessments, and Pathways across all classes. Continue?')) {
                    alert('Complete Demo Data has been successfully seeded!');
                  }
                }}
                className="bg-orange-500 text-white px-8 py-2.5 rounded-none text-[13px] font-bold hover:bg-orange-600 shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <Rocket className="w-4 h-4" /> Seed Complete Demo Data
              </button>
            </div>

          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-[14px] font-bold text-[#5F52FF] flex items-center gap-2">
              <FileQuestion className="w-4 h-4 text-gray-500" /> Traditional Exams vs Competency-Based — What Changes?
            </h2>
          </div>
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left text-[12px]">
              <thead>
                <tr className="bg-gray-50 text-gray-700">
                  <th className="py-3 px-6 font-bold border-r border-gray-200 w-1/4">Aspect</th>
                  <th className="py-3 px-6 font-bold border-r border-gray-200 w-3/8 text-red-600 flex items-center gap-1.5"><div className="w-2 h-2 rounded-none bg-red-500"></div> Traditional System</th>
                  <th className="py-3 px-6 font-bold w-3/8 text-green-600 flex items-center gap-1.5"><div className="w-2 h-2 rounded-none bg-green-500"></div> Competency-Based (CBC)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-6 font-bold text-gray-700 border-r border-gray-200">Assessment Focus</td>
                  <td className="py-3 px-6 text-gray-600 border-r border-gray-200">How many marks scored</td>
                  <td className="py-3 px-6 font-medium text-gray-800">What the student can demonstrate</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <td className="py-3 px-6 font-bold text-gray-700 border-r border-gray-200">Grading</td>
                  <td className="py-3 px-6 text-gray-600 border-r border-gray-200">Percentage / Letter grades (A, B, C)</td>
                  <td className="py-3 px-6 font-medium text-gray-800">Rubric levels (Exceeding, Meeting, Approaching, Below)</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-6 font-bold text-gray-700 border-r border-gray-200">Curriculum Structure</td>
                  <td className="py-3 px-6 text-gray-600 border-r border-gray-200">Subjects &rarr; Chapters &rarr; Exams</td>
                  <td className="py-3 px-6 font-medium text-gray-800">Subjects &rarr; Strands &rarr; Sub-strands &rarr; Outcomes</td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <td className="py-3 px-6 font-bold text-gray-700 border-r border-gray-200">Life Skills</td>
                  <td className="py-3 px-6 text-gray-600 border-r border-gray-200">Not formally assessed</td>
                  <td className="py-3 px-6 font-medium text-gray-800">Tracked as Core Competencies across all subjects</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-6 font-bold text-gray-700 border-r border-gray-200">Report Card</td>
                  <td className="py-3 px-6 text-gray-600 border-r border-gray-200">Marks and rank</td>
                  <td className="py-3 px-6 font-medium text-gray-800">Competency levels, progress narrative, and rubric scores</td>
                </tr>
                <tr>
                  <td className="py-3 px-6 font-bold text-gray-700 border-r border-gray-200">Student Progression</td>
                  <td className="py-3 px-6 text-gray-600 border-r border-gray-200">Pass/fail based on total marks</td>
                  <td className="py-3 px-6 font-medium text-gray-800">Based on demonstrated mastery of competencies</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CbcDashboard;
