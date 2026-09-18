import React from 'react';
import { Upload, Download, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function BulkQuestionUpload() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-10">
      
      {/* Header */}
      <div className="bg-white px-6 py-5 border-b border-slate-200">
        <h1 className="text-2xl font-bold text-slate-800">Bulk Question Upload</h1>
        <p className="text-[11px] text-slate-500 mt-1">Import many questions from a CSV or Excel file</p>
      </div>

      <div className="p-6 max-w-[1400px] mx-auto space-y-6">
        
        {/* Upload Form */}
        <div className="bg-white border border-slate-200 rounded-none shadow-sm">
          <div className="px-5 py-3 border-b border-slate-200 text-[#6f42c1] font-bold text-sm flex items-center gap-2">
            <Upload className="w-4 h-4" /> Upload Question Data
          </div>
          
          <div className="p-6">
            <div className="mb-4">
              <label className="block text-[11px] font-bold text-slate-700 mb-2">Upload CSV or Excel file <span className="text-red-500">*</span></label>
              <div className="flex w-full">
                <div className="flex-1 border border-slate-300 rounded-l px-3 py-1.5 text-xs text-slate-400 bg-white">Choose file</div>
                <button className="px-4 border border-l-0 border-slate-300 rounded-r bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-colors">Browse</button>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Supported formats: .csv, .xls, .xlsx</p>
            </div>
            
            <div className="flex items-start gap-2 mt-5">
              <input type="checkbox" className="w-3.5 h-3.5 mt-0.5 accent-[#6f42c1] cursor-pointer" />
              <div>
                <span className="text-xs text-slate-800 font-bold block">Publish these questions immediately</span>
                <span className="text-[10px] text-slate-400">Leave this off to import as <strong>drafts</strong>. Drafts are saved in the bank but cannot be added to a paper or served in practice until you publish them.</span>
              </div>
            </div>
          </div>
          
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3 rounded-b-lg">
            <button 
              onClick={() => navigate('/online-exams/question-bank')}
              className="px-5 py-2 bg-white border border-slate-300 text-slate-700 font-bold text-[11px] rounded-none hover:bg-slate-100 transition-colors cursor-pointer shadow-sm"
            >
              Cancel
            </button>
            <button className="px-5 py-2 bg-[#6f42c1] hover:bg-[#5a32a3] text-white font-bold text-[11px] rounded-none shadow-sm flex items-center gap-2 transition-colors border-none cursor-pointer">
              <CheckCircle2 className="w-3.5 h-3.5" /> Process Upload
            </button>
          </div>
        </div>

        {/* Instructions Table */}
        <div className="bg-white border border-slate-200 rounded-none shadow-sm">
          <div className="px-5 py-3 border-b border-slate-200 text-[#6f42c1] font-bold text-sm flex items-center gap-2">
            <span className="flex items-center justify-center w-4 h-4 rounded-none bg-[#6f42c1] text-white text-[10px] font-black italic">i</span>
            Instructions & Template
          </div>
          
          <div className="p-6">
            <p className="text-xs text-slate-700 mb-4">
              The template carries <strong>one worked example per question type</strong> — the fastest way to learn the format is to open it and copy the row you need.
            </p>
            
            <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-bold text-[11px] rounded-none flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm mb-6">
              <Download className="w-3.5 h-3.5" /> Download CSV Template
            </button>

            <div className="space-y-6 text-xs text-slate-700">
              
              {/* Always required */}
              <div>
                <h3 className="font-bold mb-2">Always required</h3>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li><code className="text-pink-600 bg-pink-50 px-1 py-0.5 rounded-none text-[11px]">question_type</code> — one of: <code className="text-pink-600 bg-pink-50 px-1 py-0.5 rounded-none text-[11px]">mcq_single</code>, <code className="text-pink-600 bg-pink-50 px-1 py-0.5 rounded-none text-[11px]">mcq_multi</code>, <code className="text-pink-600 bg-pink-50 px-1 py-0.5 rounded-none text-[11px]">true_false</code>, <code className="text-pink-600 bg-pink-50 px-1 py-0.5 rounded-none text-[11px]">match_following</code>, <code className="text-pink-600 bg-pink-50 px-1 py-0.5 rounded-none text-[11px]">ordering</code>, <code className="text-pink-600 bg-pink-50 px-1 py-0.5 rounded-none text-[11px]">fill_blanks</code>, <code className="text-pink-600 bg-pink-50 px-1 py-0.5 rounded-none text-[11px]">short_answer</code>, <code className="text-pink-600 bg-pink-50 px-1 py-0.5 rounded-none text-[11px]">paragraph</code>, <code className="text-pink-600 bg-pink-50 px-1 py-0.5 rounded-none text-[11px]">comprehension</code></li>
                  <li><code className="text-pink-600 bg-pink-50 px-1 py-0.5 rounded-none text-[11px]">class_name</code> and <code className="text-pink-600 bg-pink-50 px-1 py-0.5 rounded-none text-[11px]">subject_name</code> — must <strong>exactly match</strong> existing class and subject names, and the subject must be assigned to that class.</li>
                  <li><code className="text-pink-600 bg-pink-50 px-1 py-0.5 rounded-none text-[11px]">question</code> and <code className="text-pink-600 bg-pink-50 px-1 py-0.5 rounded-none text-[11px]">marks</code>.</li>
                </ul>
              </div>

              {/* HTML Table */}
              <div>
                <h3 className="font-bold mb-2">The answer column depends on the type</h3>
                <table className="w-full text-left border-collapse border border-slate-200">
                  <thead>
                    <tr className="bg-[#f8f9fa] border-b border-slate-200">
                      <th className="py-2 px-3 border-r border-slate-200 font-bold">Type</th>
                      <th className="py-2 px-3 border-r border-slate-200 font-bold">Columns to fill</th>
                      <th className="py-2 px-3 font-bold">Example</th>
                    </tr>
                  </thead>
                  <tbody className="text-[11px]">
                    <tr className="border-b border-slate-200">
                      <td className="py-2 px-3 border-r border-slate-200"><code>mcq_single</code></td>
                      <td className="py-2 px-3 border-r border-slate-200 text-pink-600">choices, answer</td>
                      <td className="py-2 px-3"><code>3 | 4 | 5</code> and <code>2</code> <span className="text-slate-400">(the 2nd option)</span></td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-2 px-3 border-r border-slate-200"><code>mcq_multi</code></td>
                      <td className="py-2 px-3 border-r border-slate-200 text-pink-600">choices, answer</td>
                      <td className="py-2 px-3"><code>2 | 3 | 4 | 5</code> and <code>1,3</code></td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-2 px-3 border-r border-slate-200"><code>true_false</code></td>
                      <td className="py-2 px-3 border-r border-slate-200 text-pink-600">answer</td>
                      <td className="py-2 px-3"><code>True</code> Or <code>False</code></td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-2 px-3 border-r border-slate-200"><code>match_following</code></td>
                      <td className="py-2 px-3 border-r border-slate-200 text-pink-600">pairs</td>
                      <td className="py-2 px-3"><code>Dog=Puppy | Cat=Kitten</code></td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-2 px-3 border-r border-slate-200"><code>ordering</code></td>
                      <td className="py-2 px-3 border-r border-slate-200 text-pink-600">sequence</td>
                      <td className="py-2 px-3"><code>One | Two | Three</code> <span className="text-slate-400">(correct order)</span></td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-2 px-3 border-r border-slate-200"><code>fill_blanks</code></td>
                      <td className="py-2 px-3 border-r border-slate-200 text-pink-600">question, blanks</td>
                      <td className="py-2 px-3">Question: <code>The capital of {"{1}"} is {"{2}"}.</code><br/>Blanks: <code>1: France | 2: Paris, paris</code></td>
                    </tr>
                    <tr className="border-b border-slate-200">
                      <td className="py-2 px-3 border-r border-slate-200"><code>short_answer</code></td>
                      <td className="py-2 px-3 border-r border-slate-200 text-pink-600">accepted</td>
                      <td className="py-2 px-3"><code>Newton, Isaac Newton</code> — <strong>leave empty to grade by hand</strong></td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 border-r border-slate-200"><code>paragraph</code></td>
                      <td className="py-2 px-3 border-r border-slate-200 text-slate-400">—</td>
                      <td className="py-2 px-3 font-bold text-slate-700">Always graded by hand.</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-[10px] text-pink-600 mt-2"><code>|</code> separates items, <code>,</code> separates alternatives within one item.</p>
              </div>

              {/* Optional */}
              <div>
                <h3 className="font-bold mb-2">Optional on every row</h3>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li><code className="text-pink-600 bg-pink-50 px-1 py-0.5 rounded-none text-[11px]">difficulty</code> — <code>easy</code>, <code>medium</code>, <code>hard</code>. Defaults to the middle level. It drives paper blueprints, automatic marks and adaptive practice, so it is worth filling in.</li>
                  <li><code className="text-pink-600 bg-pink-50 px-1 py-0.5 rounded-none text-[11px]">topic</code> — created automatically if it does not exist yet. Write a path to file it properly: <code className="text-pink-600">Algebra {'>'} Quadratics {'>'} Factorising</code> creates the chapter, the topic and the sub-topic. A bare name becomes a chapter.</li>
                  <li><code className="text-pink-600 bg-pink-50 px-1 py-0.5 rounded-none text-[11px]">negative_marks</code>, <code className="text-pink-600 bg-pink-50 px-1 py-0.5 rounded-none text-[11px]">solution</code>, <code className="text-pink-600 bg-pink-50 px-1 py-0.5 rounded-none text-[11px]">tags</code> (comma-separated).</li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
