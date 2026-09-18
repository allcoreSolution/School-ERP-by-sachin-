import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { 
  Plus, 
  Menu, 
  Edit2, 
  Trash2, 
  ArrowLeft, 
  Save, 
  Sliders, 
  BookOpen, 
  Check, 
  X,
  PlusCircle,
  FileText,
  ChevronDown
} from "lucide-react";

export default function CustomFields() {
  const location = useLocation();
  // Toggle between "list" and "add"
  const [view, setView] = useState(() => {
    return location.pathname.endsWith("/add") ? "add" : "list";
  });

  // All custom fields list state matching Screenshot 1
  const [fields, setFields] = useState([
    { 
      id: 1, 
      name: "APAR ID", 
      belongsTo: "Student Admission Form", 
      belongsToClass: "bg-indigo-50/70 text-indigo-650 border border-indigo-100/50",
      type: "Textarea", 
      required: "Required",
      requiredClass: "bg-rose-50 text-rose-600 border border-rose-100"
    },
    { 
      id: 2, 
      name: "Jiban Sarkar", 
      belongsTo: "Staff Form", 
      belongsToClass: "bg-emerald-50 text-emerald-650 border border-emerald-100/50",
      type: "Number", 
      required: "Optional",
      requiredClass: "bg-slate-100 text-slate-500 border border-slate-200"
    },
    { 
      id: 3, 
      name: "Staff Custom field", 
      belongsTo: "Staff Form", 
      belongsToClass: "bg-emerald-50 text-emerald-650 border border-emerald-100/50",
      type: "Text", 
      required: "Optional",
      requiredClass: "bg-slate-100 text-slate-500 border border-slate-200"
    },
    { 
      id: 4, 
      name: "TEST1", 
      belongsTo: "Student Admission Form", 
      belongsToClass: "bg-indigo-50/70 text-indigo-650 border border-indigo-100/50",
      type: "Dropdown", 
      typeSub: "Options: A, B, C",
      required: "Optional",
      requiredClass: "bg-slate-100 text-slate-500 border border-slate-200"
    },
    { 
      id: 5, 
      name: "Extra Field", 
      belongsTo: "Student Admission Form", 
      belongsToClass: "bg-indigo-50/70 text-indigo-650 border border-indigo-100/50",
      type: "Text", 
      required: "Optional",
      requiredClass: "bg-slate-100 text-slate-500 border border-slate-200"
    }
  ]);

  // Form Fields for adding new item
  const [fieldName, setFieldName] = useState("");
  const [belongsTo, setBelongsTo] = useState("Student Admission Form");
  const [fieldType, setFieldType] = useState("Short Text");
  const [isRequired, setIsRequired] = useState(false);

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this custom field?")) {
      setFields(fields.filter(f => f.id !== id));
    }
  };

  const handleEdit = (field) => {
    const newName = prompt("Edit field name:", field.name);
    if (newName && newName.trim() !== "") {
      setFields(fields.map(f => f.id === field.id ? { ...f, name: newName } : f));
    }
  };

  const handleSaveField = (e) => {
    e.preventDefault();
    if (!fieldName.trim()) {
      alert("Please enter a field name.");
      return;
    }

    const belongsClass = belongsTo === "Student Admission Form" 
      ? "bg-indigo-50/70 text-indigo-650 border border-indigo-100/50" 
      : "bg-emerald-50 text-emerald-650 border border-emerald-100/50";

    const reqClass = isRequired 
      ? "bg-rose-50 text-rose-600 border border-rose-100" 
      : "bg-slate-100 text-slate-500 border border-slate-200";

    const newField = {
      id: fields.length + 1,
      name: fieldName,
      belongsTo: belongsTo,
      belongsToClass: belongsClass,
      type: fieldType,
      required: isRequired ? "Required" : "Optional",
      requiredClass: reqClass
    };

    setFields([...fields, newField]);
    
    // Reset Form & Switch view
    setFieldName("");
    setBelongsTo("Student Admission Form");
    setFieldType("Short Text");
    setIsRequired(false);
    setView("list");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-4 font-sans text-gray-800">
      
      {/* 1. ALL CUSTOM FIELDS LIST VIEW */}
      {view === "list" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          
          {/* Header row */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Custom Fields</h1>
              <p className="text-slate-500 text-sm">Extra fields for admission & staff forms</p>
            </div>
            
            <button 
              onClick={() => setView("add")}
              className="px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-none hover:bg-indigo-700 transition-all flex items-center gap-1.5 shadow-md cursor-pointer active:scale-95 animate-in slide-in-from-right-4 duration-300"
            >
              <Plus className="w-4 h-4 text-white" />
              Add New Field
            </button>
          </div>

          {/* Table Container card */}
          <div className="bg-white border border-slate-200 rounded-none overflow-hidden shadow-3xs">
            
            {/* Table title banner */}
            <div className="px-5 py-4 border-b flex justify-between items-center bg-slate-50/30">
              <div className="flex items-center gap-2">
                <Menu className="w-4 h-4 text-indigo-650" />
                <h2 className="font-bold text-slate-800 text-sm">All Custom Fields</h2>
              </div>
              <span className="text-xs text-slate-400 font-semibold">{fields.length} fields</span>
            </div>

            {/* Custom fields table grid */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-200 text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                    <th className="py-3 px-5 w-12 text-center border-r border-slate-200">#</th>
                    <th className="py-3 px-5 border-r border-slate-200">Name</th>
                    <th className="py-3 px-5 border-r border-slate-200">Belongs To</th>
                    <th className="py-3 px-5 border-r border-slate-200">Type</th>
                    <th className="py-3 px-5 border-r border-slate-200">Required</th>
                    <th className="py-3 px-5 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-650 font-medium">
                  {fields.map((field, idx) => (
                    <tr key={field.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-5 text-center text-slate-400 border-r border-slate-100">{idx + 1}</td>
                      <td className="py-4 px-5 border-r border-slate-100 font-bold text-slate-800">{field.name}</td>
                      
                      {/* Belongs To Pill badge */}
                      <td className="py-4 px-5 border-r border-slate-100">
                        <span className={`inline-block px-2.5 py-0.5 rounded-none text-[10px] font-bold leading-normal uppercase tracking-wider ${field.belongsToClass}`}>
                          {field.belongsTo}
                        </span>
                      </td>

                      {/* Type format */}
                      <td className="py-4 px-5 border-r border-slate-100">
                        <div className="font-semibold text-slate-800">{field.type}</div>
                        {field.typeSub && (
                          <div className="text-[10px] text-slate-400 font-medium mt-0.5">{field.typeSub}</div>
                        )}
                      </td>

                      {/* Required / Optional pill */}
                      <td className="py-4 px-5 border-r border-slate-100">
                        <span className={`inline-block px-2.5 py-0.5 rounded-none text-[10px] font-bold leading-normal uppercase tracking-wider ${field.requiredClass}`}>
                          {field.required}
                        </span>
                      </td>

                      {/* Action buttons */}
                      <td className="py-4 px-5 text-center">
                        <div className="inline-flex items-center gap-3">
                          <button 
                            onClick={() => handleEdit(field)}
                            className="p-1 text-slate-400 hover:text-indigo-650 transition-colors cursor-pointer"
                            title="Edit Custom Field"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => handleDelete(field.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                            title="Delete Custom Field"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

        </div>
      )}

      {/* 2. ADD NEW CUSTOM FIELD VIEW (Form from Screenshot 2) */}
      {view === "add" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          
          {/* Header */}
          <div className="mb-2">
            <h1 className="text-xl font-bold text-slate-800">Add New Custom Field</h1>
          </div>

          {/* Form grid columns layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
            
            {/* Left Box form: Field configuration */}
            <form onSubmit={handleSaveField} className="lg:col-span-2 bg-white border border-slate-200 rounded-none p-5 shadow-3xs space-y-5">
              
              {/* Card Banner header */}
              <div className="bg-[#f0f4f9] border-l-4 border-[#007bff] text-[#007bff] px-3.5 py-2.5 rounded-r text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-2">
                <PlusCircle className="w-4.5 h-4.5 text-[#007bff] flex-shrink-0" />
                Field Configuration
              </div>

              {/* Input field name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  Field Name <span className="text-rose-500 font-bold">*</span>
                </label>
                <input 
                  type="text" 
                  value={fieldName}
                  onChange={(e) => setFieldName(e.target.value)}
                  placeholder="e.g., Aadhaar Number, Blood Group"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-none text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#007bff] focus:ring-1 focus:ring-[#007bff] bg-white transition-all placeholder-slate-400"
                />
              </div>

              {/* Grid selectors row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Belongs To */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Belongs To <span className="text-rose-500 font-bold">*</span>
                  </label>
                  <div className="relative flex items-center bg-white">
                    <select 
                      value={belongsTo}
                      onChange={(e) => setBelongsTo(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-none text-xs text-slate-700 font-semibold focus:outline-none focus:border-[#007bff] bg-white appearance-none cursor-pointer"
                    >
                      <option value="Student Admission Form">Student Admission Form</option>
                      <option value="Staff Form">Staff Form</option>
                    </select>
                    <ChevronDown className="absolute right-3 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Field Type */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Field Type <span className="text-rose-500 font-bold">*</span>
                  </label>
                  <div className="relative flex items-center bg-white">
                    <select 
                      value={fieldType}
                      onChange={(e) => setFieldType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-none text-xs text-slate-700 font-semibold focus:outline-none focus:border-[#007bff] bg-white appearance-none cursor-pointer"
                    >
                      <option value="Short Text">Short Text</option>
                      <option value="Textarea">Textarea</option>
                      <option value="Number">Number</option>
                      <option value="Dropdown">Dropdown</option>
                      <option value="Date">Date</option>
                      <option value="File">File</option>
                    </select>
                    <ChevronDown className="absolute right-3 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

              </div>

              {/* Separator line */}
              <div className="border-t border-slate-100 my-2"></div>

              {/* Toggle row: Absolutely Required */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsRequired(!isRequired)}
                  className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-none border-2 border-transparent transition-colors duration-150 ease-in-out focus:outline-none ${isRequired ? 'bg-indigo-650' : 'bg-slate-200'}`}
                >
                  <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-none bg-white transition duration-150 ease-in-out ${isRequired ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
                <span className="text-xs font-bold text-slate-700">This field is absolutely required during data entry</span>
              </div>

              {/* Actions Footer */}
              <div className="flex justify-end gap-2.5 pt-4 border-t">
                <button 
                  type="button" 
                  onClick={() => setView("list")}
                  className="px-4 py-2 border border-gray-300 text-slate-700 bg-white hover:bg-slate-50 font-bold text-xs rounded-none shadow-3xs flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
                  Cancel
                </button>
                
                <button 
                  type="submit"
                  className="px-4 py-2 bg-indigo-650 hover:bg-indigo-700 text-white font-bold text-xs rounded-none shadow-sm flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Custom Field
                </button>
              </div>

            </form>

            {/* Right Box Card: Guides */}
            <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs space-y-4">
              
              {/* Card Title */}
              <div className="flex items-center gap-2 text-slate-800 border-b pb-2.5">
                <BookOpen className="w-4 h-4 text-slate-500" />
                <h3 className="font-bold text-xs text-slate-850">Understanding Custom Fields</h3>
              </div>

              {/* Bullet list steps */}
              <ul className="space-y-4 text-[11px] font-semibold text-slate-650 leading-relaxed list-disc pl-4">
                <li>
                  <span className="font-extrabold text-slate-800">What are they?</span> Custom fields dynamically stretch your database, allowing you to collect specialized data beyond standard forms (e.g., Aadhaar Number, Bus Route, Caste).
                </li>
                <li>
                  <span className="font-extrabold text-slate-800">Belongs To (Scope):</span> a <span className="font-bold text-indigo-600">Students</span> field instantly appears on all online and offline Admission Forms; a <span className="font-bold text-emerald-600">Staff</span> field only asks HR during onboarding.
                </li>
                <li>
                  <span className="font-extrabold text-slate-800">Short Text:</span> general details (e.g., Religion). <span className="font-bold text-slate-800">Number:</span> forces strict numeric input. <span className="font-bold text-slate-800">Date:</span> spawns a calendar UI.
                </li>
                <li>
                  <span className="font-extrabold text-slate-800">Text Area:</span> multiline box (e.g., Medical History). <span className="font-bold text-slate-800">Dropdown:</span> select from fixed choices. <span className="font-bold text-slate-800">File:</span> upload a document.
                </li>
              </ul>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
