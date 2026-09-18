import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, Users, Bell, Layers, Book, Columns, LayoutDashboard, 
  Save, Trash2, Plus, Target, CheckCircle, Smartphone, FolderCheck, User
} from 'lucide-react';

const SourcesAndStages = () => {
  const navigate = useNavigate();

  const subNav = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/leads/dashboard' },
    { name: 'Pipeline Board', icon: Columns, path: '/leads/pipeline' },
    { name: 'All Leads', icon: Users, path: '/leads/all' },
    { name: 'Follow-ups', icon: Bell, path: '/leads/follow-ups' },
    { name: 'Sources & Stages', icon: Layers, path: '/leads/sources-stages', active: true },
    { name: 'Guide', icon: Book, path: '/leads/guide' },
  ];

  const [stages, setStages] = useState([
    { id: 1, name: 'New Enquiry', color: 'bg-slate-500', kind: 'Lead (entry)', active: true },
    { id: 2, name: 'Contacted / Qualified', color: 'bg-[#3b82f6]', kind: 'Contact', active: true },
    { id: 3, name: 'Application Received', color: 'bg-[#8b5cf6]', kind: 'Application', active: true },
    { id: 4, name: 'Document Verification', color: 'bg-[#a855f7]', kind: 'Documents', active: true },
    { id: 5, name: 'Entrance Test', color: 'bg-[#f59e0b]', kind: 'Entrance test', active: true },
    { id: 6, name: 'Counselling / Interview', color: 'bg-[#ec4899]', kind: 'Counselling', active: true },
    { id: 7, name: 'Offer / Selected', color: 'bg-[#06b6d4]', kind: 'Offer', active: true },
    { id: 8, name: 'Enrolled', color: 'bg-[#10b981]', kind: 'Won (enrolled)', active: true },
    { id: 9, name: 'Lost / Rejected', color: 'bg-[#ef4444]', kind: 'Lost', active: true },
  ]);

  const [sources, setSources] = useState([
    { id: 1, name: 'Walk-in', category: 'Walk-in', active: true },
    { id: 2, name: 'Website', category: 'Website', active: true },
    { id: 3, name: 'Referral', category: 'Referral', active: true },
    { id: 4, name: 'Sibling / Existing', category: 'Sibling', active: true },
    { id: 5, name: 'Social Media', category: 'Social Media', active: true },
    { id: 6, name: 'Google / Search', category: 'Search', active: true },
    { id: 7, name: 'Newspaper / Print', category: 'Print', active: true },
    { id: 8, name: 'Event / Fair', category: 'Event', active: true },
    { id: 9, name: 'Agent', category: 'Agent', active: true },
    { id: 10, name: 'Other', category: 'Other', active: true },
  ]);

  const [documents, setDocuments] = useState([
    { id: 1, name: 'Aadhar Card', class: 'All classes', required: true, active: true },
    { id: 2, name: 'Parent Aadhar Card', class: 'All classes', required: true, active: true },
  ]);

  const handleSave = () => {
    alert('Item saved successfully!');
  };

  const handleDelete = (type, id) => {
    if(window.confirm('Are you sure you want to delete this item?')) {
      if(type === 'stage') setStages(stages.filter(s => s.id !== id));
      if(type === 'source') setSources(sources.filter(s => s.id !== id));
      if(type === 'document') setDocuments(documents.filter(s => s.id !== id));
      alert('Item deleted successfully!');
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f4f6f8] overflow-y-auto">
      
      {/* Header */}
      <div className="px-8 pt-6 pb-2 bg-white shrink-0">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a2e] flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-[#5F52FF]" /> Lead Management
            </h1>
            <p className="text-[13px] text-gray-500 mt-1">Capture every admission lead, work it through the pipeline, and convert the winners into students.</p>
          </div>
          <button 
            onClick={() => navigate('/leads/pipeline')}
            className="bg-[#5F52FF] text-white px-4 py-2 rounded-none text-[13px] font-bold hover:bg-[#4E41E6] shadow-sm flex items-center gap-2 transition-colors"
          >
            <Columns className="w-4 h-4" /> Pipeline Board
          </button>
        </div>
        
        {/* Sub Nav */}
        <div className="flex items-center gap-6 mt-6 overflow-x-auto border-b border-gray-200 pb-px">
          {subNav.map((item, index) => {
            const Icon = item.icon;
            return (
              <button 
                key={index}
                onClick={() => item.path !== '#' && navigate(item.path)}
                className={`flex items-center gap-2 pb-3 text-[12px] font-bold whitespace-nowrap border-b-2 transition-colors ${
                  item.active 
                    ? 'border-[#5F52FF] text-[#5F52FF]' 
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" /> {item.name}
              </button>
            )
          })}
        </div>
      </div>

      <div className="p-8 w-full max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Top Section: Stages & Sources */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Pipeline Stages */}
          <div className="w-full lg:w-1/2 bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-[14px] font-bold text-[#5F52FF] flex items-center gap-2">
                <Columns className="w-4 h-4" /> Pipeline stages
              </h2>
              <p className="text-[11px] text-gray-500 mt-1">Rename, recolour, activate or add stages. The <span className="font-bold text-gray-700">kind</span> is fixed once created — it drives what the module does at that stage (the Won kind unlocks conversion).</p>
            </div>
            
            <div className="p-5 flex flex-col gap-3">
              {stages.map((stage) => (
                <div key={stage.id} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-none ${stage.color} shrink-0`}></div>
                  <input 
                    type="text" 
                    value={stage.name} 
                    onChange={() => {}}
                    className="flex-1 border border-gray-300 rounded-none px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#5F52FF]" 
                  />
                  <div className="w-24 text-[10px] text-gray-400 font-bold text-right shrink-0">
                    {stage.kind}
                  </div>
                  <label className="flex items-center gap-1.5 text-[12px] font-bold text-gray-700 cursor-pointer shrink-0 w-16">
                    <input type="checkbox" checked={stage.active} onChange={() => {}} className="rounded text-[#5F52FF] focus:ring-[#5F52FF]" />
                    Active
                  </label>
                  <button onClick={handleSave} className="p-1.5 text-gray-600 hover:bg-gray-100 border border-gray-300 rounded-none transition-colors" title="Save">
                    <Save className="w-3.5 h-3.5" />
                  </button>
                  {/* Assuming you can't easily delete fixed stages, but matching UI */}
                </div>
              ))}
              
              {/* Add New Stage */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-end gap-3">
                <div className="flex-1">
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">New stage name</label>
                  <input type="text" placeholder="e.g. Home Visit" className="w-full border border-gray-300 rounded-none px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#5F52FF]" />
                </div>
                <div className="w-32">
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Kind</label>
                  <select className="w-full border border-gray-300 rounded-none px-2 py-1.5 text-[12px] focus:outline-none focus:border-[#5F52FF] bg-white">
                    <option>Lead (entry)</option>
                    <option>Contact</option>
                    <option>Counselling</option>
                  </select>
                </div>
                <div className="w-24">
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Colour</label>
                  <div className="w-full h-[30px] rounded-none bg-[#8b5cf6] cursor-pointer"></div>
                </div>
                <button className="bg-[#5F52FF] text-white p-1.5 h-[30px] w-[30px] rounded-none hover:bg-[#4E41E6] flex items-center justify-center transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Legend visually representing stages */}
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                {stages.map((stage) => (
                  <div key={stage.id} className="flex items-center gap-1.5">
                    <div className={`w-2.5 h-2.5 rounded-none ${stage.color}`}></div>
                    <span className="text-[10px] font-bold text-gray-600">{stage.name}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Lead Sources */}
          <div className="w-full lg:w-1/2 bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-[14px] font-bold text-[#5F52FF] flex items-center gap-2">
                <Target className="w-4 h-4" /> Lead sources
              </h2>
              <p className="text-[11px] text-gray-500 mt-1">Where leads come from — used for source attribution and funnel analytics.</p>
            </div>
            
            <div className="p-5 flex flex-col gap-3">
              {sources.map((source) => (
                <div key={source.id} className="flex items-center gap-3">
                  <input 
                    type="text" 
                    value={source.name} 
                    onChange={() => {}}
                    className="flex-1 border border-gray-300 rounded-none px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#5F52FF]" 
                  />
                  <select className="w-32 border border-gray-300 rounded-none px-2 py-1.5 text-[12px] focus:outline-none focus:border-[#5F52FF] bg-white text-gray-700 shrink-0">
                    <option>{source.category}</option>
                  </select>
                  <label className="flex items-center gap-1 text-[12px] font-bold text-gray-700 cursor-pointer shrink-0 w-6 justify-center">
                    <input type="checkbox" checked={source.active} onChange={() => {}} className="rounded text-[#5F52FF] focus:ring-[#5F52FF]" />
                  </label>
                  <button onClick={handleSave} className="p-1.5 text-gray-600 hover:bg-gray-100 border border-gray-300 rounded-none transition-colors shrink-0" title="Save">
                    <Save className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete('source', source.id)} className="p-1.5 text-red-500 hover:bg-red-50 border border-red-200 rounded-none transition-colors shrink-0" title="Delete">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              {/* Add New Source */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-end gap-3">
                <div className="flex-1">
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">New source</label>
                  <input type="text" placeholder="e.g. Instagram Ads" className="w-full border border-gray-300 rounded-none px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#5F52FF]" />
                </div>
                <div className="w-32">
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Category</label>
                  <select className="w-full border border-gray-300 rounded-none px-2 py-1.5 text-[12px] focus:outline-none focus:border-[#5F52FF] bg-white">
                    <option>Walk-in</option>
                    <option>Social Media</option>
                  </select>
                </div>
                <button className="bg-[#5F52FF] text-white p-1.5 h-[30px] w-[30px] rounded-none hover:bg-[#4E41E6] flex items-center justify-center transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
          
        </div>

        {/* Required Documents Section */}
        <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-[14px] font-bold text-[#5F52FF] flex items-center gap-2">
              <FolderCheck className="w-4 h-4" /> Required documents
            </h2>
            <p className="text-[11px] text-gray-500 mt-1">The files blind applicants must submit. Leave Class as "All classes" to request it everywhere, or assign it to one class (e.g. a previous year marksheet for Class 11).</p>
          </div>
          <div className="p-5 flex flex-col gap-3">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center gap-3">
                <input 
                  type="text" 
                  value={doc.name} 
                  onChange={() => {}}
                  className="flex-1 border border-gray-300 rounded-none px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#5F52FF]" 
                />
                <select className="w-40 border border-gray-300 rounded-none px-2 py-1.5 text-[12px] focus:outline-none focus:border-[#5F52FF] bg-white text-gray-700 shrink-0">
                  <option>{doc.class}</option>
                </select>
                <label className="flex items-center gap-1.5 text-[12px] font-bold text-gray-700 cursor-pointer shrink-0">
                  <input type="checkbox" checked={doc.required} onChange={() => {}} className="rounded text-[#5F52FF] focus:ring-[#5F52FF]" />
                  Req
                </label>
                <label className="flex items-center gap-1.5 text-[12px] font-bold text-gray-700 cursor-pointer shrink-0">
                  <input type="checkbox" checked={doc.active} onChange={() => {}} className="rounded text-[#5F52FF] focus:ring-[#5F52FF]" />
                  Active
                </label>
                <button onClick={handleSave} className="p-1.5 text-gray-600 hover:bg-gray-100 border border-gray-300 rounded-none transition-colors shrink-0" title="Save">
                  <Save className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleDelete('document', doc.id)} className="p-1.5 text-red-500 hover:bg-red-50 border border-red-200 rounded-none transition-colors shrink-0" title="Delete">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            
            {/* Add New Document */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-end gap-3">
              <div className="flex-1">
                <label className="block text-[11px] font-bold text-gray-700 mb-1">New document</label>
                <input type="text" placeholder="e.g. Birth Certificate" className="w-full border border-gray-300 rounded-none px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#5F52FF]" />
              </div>
              <div className="w-64">
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Class</label>
                <select className="w-full border border-gray-300 rounded-none px-2 py-1.5 text-[12px] focus:outline-none focus:border-[#5F52FF] bg-white">
                  <option>All classes</option>
                  <option>Nursery</option>
                </select>
              </div>
              <div className="mb-2">
                 <label className="flex items-center gap-1.5 text-[12px] font-bold text-gray-700 cursor-pointer shrink-0">
                  <input type="checkbox" defaultChecked className="rounded text-[#5F52FF] focus:ring-[#5F52FF]" />
                  Required
                </label>
              </div>
              <button className="bg-[#5F52FF] text-white px-8 h-[30px] rounded-none hover:bg-[#4E41E6] flex items-center justify-center transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Conversion Section */}
        <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-[14px] font-bold text-[#5F52FF] flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Conversion
            </h2>
          </div>
          <div className="p-5">
            <label className="flex items-start gap-2.5 cursor-pointer mb-2">
              <input type="checkbox" defaultChecked className="mt-0.5 rounded-none text-[#5F52FF] focus:ring-[#5F52FF]" />
              <div>
                <span className="text-[13px] font-bold text-gray-800">Trust the paid admission fee to the student's fee ledger on conversion</span>
                <p className="text-[11px] text-gray-500 mt-0.5">Only applies to applications whose fee is Verified — a real receipt is created and it appears in your collection reports. Untick this off if you account for admission fees outside the fee ledger.</p>
              </div>
            </label>
            <button onClick={handleSave} className="mt-4 bg-[#5F52FF] text-white px-4 py-2 rounded-none text-[13px] font-bold hover:bg-[#4E41E6] shadow-sm flex items-center gap-2 transition-colors">
              <Save className="w-4 h-4" /> Save
            </button>
          </div>
        </div>

        {/* Application Form Section */}
        <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-[14px] font-bold text-[#5F52FF] flex items-center gap-2">
              <Smartphone className="w-4 h-4" /> Application form (what parents see)
            </h2>
            <p className="text-[11px] text-gray-500 mt-1">These are the fields on the self-service application page you send to applicants. Unticking a field only hides it from parents — your staff can still fill it in on the lead. <span className="font-bold text-gray-700">Required</span> means the parent cannot submit without it, which is not the same as the * fields, which are the ones needed before the child can be admitted.</p>
          </div>
          
          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              
              {/* Student Details */}
              <div>
                <h3 className="text-[13px] font-bold text-[#5F52FF] flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
                  <User className="w-4 h-4" /> Student details
                </h3>
                <div className="space-y-2">
                  {['First name *', 'Middle name', 'Last name', 'Gender *', 'Date of birth *', 'Place of birth', 'Nationality', 'Religion', 'Category', 'Caste', 'Sub-caste', 'Mother tongue', 'Aadhaar / national ID', 'PEN number', 'BPL', 'EWS', 'Student mobile number', 'Student email (login)'].map((field, i) => (
                    <div key={i} className="flex items-center justify-between group">
                      <label className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-700">
                        <input type="checkbox" defaultChecked={i < 5 || i > 15} className="rounded text-[#5F52FF] focus:ring-[#5F52FF]" />
                        <span className={field.includes('*') ? "font-bold text-gray-800" : ""}>{field}</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        <input type="checkbox" defaultChecked={i < 5} className="rounded text-gray-400" />
                        Required
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Parents */}
              <div>
                <h3 className="text-[13px] font-bold text-[#5F52FF] flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
                  <Users className="w-4 h-4" /> Parents
                </h3>
                <div className="space-y-2">
                  {['Father name *', 'Father middle name', 'Father mobile number *', 'Father occupation', 'Father qualification', 'Father annual income', 'Father Aadhaar', 'Mother name', 'Mother middle name', 'Mother mobile number', 'Mother occupation', 'Mother qualification', 'Mother Aadhaar', 'Parent login email', 'Primary guardian is', 'Guardian name', 'Guardian relation', 'Guardian mobile number', 'Guardian occupation'].map((field, i) => (
                    <div key={i} className="flex items-center justify-between group">
                      <label className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-700">
                        <input type="checkbox" defaultChecked={i === 0 || i === 2 || i === 7} className="rounded text-[#5F52FF] focus:ring-[#5F52FF]" />
                        <span className={field.includes('*') ? "font-bold text-gray-800" : ""}>{field}</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        <input type="checkbox" defaultChecked={field.includes('*')} className="rounded text-gray-400" />
                        Required
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Address */}
              <div>
                <h3 className="text-[13px] font-bold text-[#5F52FF] flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
                  <Layers className="w-4 h-4" /> Address & emergency contact
                </h3>
                <div className="space-y-2">
                  {['Current address', 'Permanent address', 'Guardian address', 'Emergency contact name', 'Emergency contact number'].map((field, i) => (
                    <div key={i} className="flex items-center justify-between group">
                      <label className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-700">
                        <input type="checkbox" defaultChecked className="rounded text-[#5F52FF] focus:ring-[#5F52FF]" />
                        <span>{field}</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        <input type="checkbox" className="rounded text-gray-400" />
                        Required
                      </label>
                    </div>
                  ))}
                </div>
                
                {/* Previous school */}
                <h3 className="text-[13px] font-bold text-[#5F52FF] flex items-center gap-2 mb-4 mt-8 border-b border-gray-100 pb-2">
                  <Book className="w-4 h-4" /> Previous school
                </h3>
                <div className="space-y-2">
                  {['School name', 'Board', 'Last class attended', 'Last result (% or grade)', 'Transfer certificate no.', 'Transfer certificate date', 'Reason for leaving', 'Anything else'].map((field, i) => (
                    <div key={i} className="flex items-center justify-between group">
                      <label className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-700">
                        <input type="checkbox" defaultChecked className="rounded text-[#5F52FF] focus:ring-[#5F52FF]" />
                        <span>{field}</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        <input type="checkbox" className="rounded text-gray-400" />
                        Required
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Health */}
              <div>
                <h3 className="text-[13px] font-bold text-[#5F52FF] flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
                  <CheckCircle className="w-4 h-4" /> Health
                </h3>
                <div className="space-y-2">
                  {['Blood group', 'Height', 'Weight', 'Medical history / allergies'].map((field, i) => (
                    <div key={i} className="flex items-center justify-between group">
                      <label className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-700">
                        <input type="checkbox" defaultChecked className="rounded text-[#5F52FF] focus:ring-[#5F52FF]" />
                        <span>{field}</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        <input type="checkbox" className="rounded text-gray-400" />
                        Required
                      </label>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <button onClick={handleSave} className="bg-[#5F52FF] text-white px-5 py-2 rounded-none text-[13px] font-bold hover:bg-[#4E41E6] shadow-sm flex items-center gap-2 transition-colors">
                <Save className="w-4 h-4" /> Save application form
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default SourcesAndStages;
