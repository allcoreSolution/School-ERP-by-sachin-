import React, { useState } from "react";
import { 
  Plus, 
  ArrowLeft, 
  Book, 
  Lightbulb, 
  Layers, 
  Globe, 
  Trash2, 
  Edit3, 
  Check, 
  HelpCircle,
  Eye,
  EyeOff,
  Sliders,
  FolderOpen
} from "lucide-react";

// Platform Predefined categories matching Screenshot 1 & 2 details
const PLATFORM_CATEGORIES_DATA = [
  { name: "Getting Started", icon: "🚀", visibility: "Public", articles: 3 },
  { name: "Dashboard & Navigation", icon: "📊", visibility: "Public", articles: 1 },
  { name: "Student Management", icon: "👥", visibility: "Public", articles: 3 },
  { name: "Academics", icon: "📖", visibility: "Public", articles: 1 },
  { name: "Attendance", icon: "📅", visibility: "Public", articles: 1 },
  { name: "Fees & Accounts", icon: "💵", visibility: "Public", articles: 2 },
  { name: "HR & Staff Management", icon: "💼", visibility: "Public", articles: 1 },
  { name: "Timetable", icon: "🗓️", visibility: "Public", articles: 1 },
  { name: "Library", icon: "📚", visibility: "Public", articles: 1 },
  { name: "Transport", icon: "🚌", visibility: "Public", articles: 1 },
  { name: "Hostel", icon: "🏢", visibility: "Public", articles: 1 },
  { name: "Homework", icon: "✍️", visibility: "Public", articles: 1 },
  { name: "Notice Board & Communication", icon: "📢", visibility: "Public", articles: 1 },
  { name: "Study Center", icon: "💻", visibility: "Public", articles: 1 },
  { name: "Documents & Certificates", icon: "📜", visibility: "Public", articles: 1 },
  { name: "Settings & Configuration", icon: "⚙️", visibility: "Public", articles: 1 }
];

export default function KbCategories() {
  // Page view navigation: "list" = Categories Dashboard; "add" = Add Category form
  const [viewState, setViewState] = useState("list");

  // Success toast alerts
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  // Your Custom Categories List
  const [customCategories, setCustomCategories] = useState([]);

  // Add Category form state variables (Screenshot 3)
  const [catName, setCatName] = useState("");
  const [parentCat, setParentCat] = useState("— None (Root) —");
  const [iconClass, setIconClass] = useState("fas fa-book");
  const [catDescription, setCatDescription] = useState("");
  const [catVisibility, setCatVisibility] = useState("Public");
  const [catSortOrder, setCatSortOrder] = useState(0);
  const [catStatus, setCatStatus] = useState(true);

  // Edit category states
  const [editingCatId, setEditingCatId] = useState(null);

  // Open "Add Category" form page
  const handleOpenAddForm = () => {
    setViewState("add");
    // Reset values
    setCatName("");
    setParentCat("— None (Root) —");
    setIconClass("fas fa-book");
    setCatDescription("");
    setCatVisibility("Public");
    setCatSortOrder(0);
    setCatStatus(true);
    setEditingCatId(null);
  };

  // Submit/Create handler
  const handleCreateCategory = (e) => {
    e.preventDefault();
    if (catName.trim() === "") return;

    if (editingCatId) {
      // Edit mode save
      setCustomCategories(prev => prev.map(c => {
        if (c.id === editingCatId) {
          return {
            ...c,
            name: catName,
            parent: parentCat,
            iconClass: iconClass,
            desc: catDescription,
            visibility: catVisibility,
            sortOrder: catSortOrder,
            status: catStatus ? "Active" : "Inactive"
          };
        }
        return c;
      }));
      setToastMsg(`Category "${catName}" updated successfully!`);
    } else {
      // Create mode save
      const newCat = {
        id: Date.now(),
        sortOrder: catSortOrder,
        name: catName,
        parent: parentCat,
        iconClass: iconClass,
        desc: catDescription,
        visibility: catVisibility,
        articles: 0,
        status: catStatus ? "Active" : "Inactive"
      };
      setCustomCategories(prev => [...prev, newCat]);
      setToastMsg(`Category "${catName}" created successfully!`);
    }

    setViewState("list");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Delete Category handler
  const handleDeleteCategory = (id, name) => {
    if (confirm(`Are you sure you want to delete category "${name}"?`)) {
      setCustomCategories(prev => prev.filter(c => c.id !== id));
      setToastMsg(`Category "${name}" deleted.`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  // Edit Category trigger
  const handleEditCategory = (cat) => {
    setEditingCatId(cat.id);
    setCatName(cat.name);
    setParentCat(cat.parent);
    setIconClass(cat.iconClass);
    setCatDescription(cat.desc || "");
    setCatVisibility(cat.visibility);
    setCatSortOrder(cat.sortOrder);
    setCatStatus(cat.status === "Active");
    setViewState("add");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-5 font-sans text-gray-800 relative">
      
      {/* Toast alert bubble popup */}
      {showToast && (
        <div className="fixed top-20 right-6 bg-slate-900 text-white px-4 py-3 rounded-none shadow-lg flex items-center gap-2 border border-slate-700/50 animate-bounce z-50 text-xs">
          <Check className="w-4 h-4 text-emerald-400" />
          <span className="font-bold">{toastMsg}</span>
        </div>
      )}

      {/* VIEW 1: CATEGORIES LIST VIEW */}
      {viewState === "list" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Header Row */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">KB Categories</h1>
              <p className="text-slate-500 text-sm">Group help articles for staff, parents and admins</p>
            </div>
            
            <button
              onClick={handleOpenAddForm}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-none flex items-center gap-1.5 shadow-md cursor-pointer select-none active:scale-95 border-none"
            >
              <Plus className="w-4 h-4 text-white" />
              Add Category
            </button>
          </div>

          {/* Section 1: Your Categories Card Layout (Screenshot 1) */}
          <div className="bg-white border border-slate-200 rounded-none overflow-hidden shadow-3xs">
            
            {/* Section Header */}
            <div className="px-5 py-4 border-b flex justify-between items-center bg-slate-50/20">
              <div className="flex items-center gap-2">
                <FolderOpen className="w-4.5 h-4.5 text-indigo-650" />
                <h2 className="font-bold text-slate-800 text-sm">Your Categories</h2>
              </div>
              <span className="bg-slate-100 text-slate-500 text-[10px] px-2 py-0.5 rounded-none font-extrabold ml-1">
                {customCategories.length}
              </span>
            </div>

            {/* Custom categories grid table / empty state */}
            {customCategories.length === 0 ? (
              <div className="p-12 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 rounded-none bg-slate-50 border border-slate-200 flex items-center justify-center text-indigo-650 shadow-3xs">
                  <Layers className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-xs text-slate-800">No categories yet</h4>
                  <p className="text-[10px] text-slate-400 font-semibold leading-relaxed max-w-sm">
                    Create your own categories to organise articles written for this school.
                  </p>
                </div>
                <button
                  onClick={handleOpenAddForm}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-none flex items-center gap-1 cursor-pointer select-none shadow-md border-none active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Category
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-200 text-[10px] font-extrabold text-indigo-650 uppercase tracking-wider">
                      <th className="py-3 px-5 border-r border-slate-200 text-center w-16">Order</th>
                      <th className="py-3 px-5 border-r border-slate-200">Name</th>
                      <th className="py-3 px-5 border-r border-slate-200">Visibility</th>
                      <th className="py-3 px-5 border-r border-slate-200 text-center">Articles</th>
                      <th className="py-3 px-5 border-r border-slate-200">Status</th>
                      <th className="py-3 px-5 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs text-slate-650 font-semibold">
                    {customCategories.map((cat) => (
                      <tr key={cat.id} className="hover:bg-slate-50/10 transition-colors">
                        <td className="py-3.5 px-5 text-center text-slate-400 border-r border-slate-100 font-mono">{cat.sortOrder}</td>
                        <td className="py-3.5 px-5 border-r border-slate-100 font-bold text-slate-800">
                          <span className="mr-2">📁</span>
                          {cat.name}
                        </td>
                        <td className="py-3.5 px-5 border-r border-slate-100">
                          <span className={`inline-block px-2 py-0.5 rounded-none text-[10px] font-bold border ${
                            cat.visibility === "Public" 
                              ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                              : cat.visibility === "Staff Only"
                                ? "bg-blue-50 text-blue-650 border-blue-100"
                                : "bg-purple-50 text-purple-650 border-purple-100"
                          }`}>
                            {cat.visibility}
                          </span>
                        </td>
                        <td className="py-3.5 px-5 border-r border-slate-100 text-center font-bold text-slate-700">{cat.articles}</td>
                        <td className="py-3.5 px-5 border-r border-slate-100">
                          <span className={`inline-flex items-center gap-1 text-[10px] font-bold ${
                            cat.status === "Active" ? "text-emerald-600" : "text-slate-450"
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-none ${cat.status === "Active" ? "bg-emerald-500" : "bg-slate-400"}`}></span>
                            {cat.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-5 text-center">
                          <div className="flex items-center justify-center gap-1.5 text-slate-400">
                            <button 
                              onClick={() => handleEditCategory(cat)}
                              className="p-1 hover:bg-slate-50 hover:text-indigo-650 rounded-none cursor-pointer transition-colors"
                              title="Edit"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button 
                              onClick={() => handleDeleteCategory(cat.id, cat.name)}
                              className="p-1 hover:bg-slate-50 hover:text-red-600 rounded-none cursor-pointer transition-colors"
                              title="Delete"
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
            )}

          </div>

          {/* Section 2: Platform Categories Table (Screenshot 1 & 2) */}
          <div className="bg-white border border-slate-200 rounded-none overflow-hidden shadow-3xs">
            
            {/* Header */}
            <div className="px-5 py-4 border-b flex justify-between items-center bg-slate-50/20">
              <div className="flex items-center gap-2">
                <Globe className="w-4.5 h-4.5 text-indigo-650" />
                <h2 className="font-bold text-slate-800 text-sm">Platform Categories</h2>
              </div>
              <span className="bg-slate-50 text-slate-400 text-[9px] font-extrabold uppercase border px-2 py-0.5 rounded">
                Read-only
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-200 text-[10px] font-extrabold text-indigo-650 uppercase tracking-wider">
                    <th className="py-3.5 px-5 border-r border-slate-200">Name</th>
                    <th className="py-3.5 px-5 border-r border-slate-200">Visibility</th>
                    <th className="py-3.5 px-5 text-center">Articles</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-650 font-semibold">
                  {PLATFORM_CATEGORIES_DATA.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/10 transition-colors">
                      
                      {/* Name with icon prefix */}
                      <td className="py-3.5 px-5 border-r border-slate-100 font-bold text-slate-850">
                        <span className="mr-2.5 text-sm">{item.icon}</span>
                        {item.name}
                      </td>

                      {/* Visibility badge */}
                      <td className="py-3.5 px-5 border-r border-slate-100">
                        <span className="inline-block px-2 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-bold rounded">
                          {item.visibility}
                        </span>
                      </td>

                      {/* Article count */}
                      <td className="py-3.5 px-5 text-center font-bold text-slate-700">{item.articles}</td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

        </div>
      )}

      {/* VIEW 2: ADD CATEGORY FORM VIEW (Screenshot 3) */}
      {viewState === "add" && (
        <div className="space-y-5 animate-in fade-in duration-200">
          
          {/* Header row */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                {editingCatId ? "Edit Category" : "Add Category"}
              </h1>
              <p className="text-slate-500 text-sm">Group help articles so readers can find them</p>
            </div>
            
            <button
              onClick={() => setViewState("list")}
              className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-650 text-xs font-bold rounded-none flex items-center gap-1.5 shadow-3xs cursor-pointer select-none active:scale-95"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Categories
            </button>
          </div>

          {/* Form grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
            
            {/* Left Card: Category details form inputs */}
            <form onSubmit={handleCreateCategory} className="lg:col-span-2 bg-white border border-slate-200 rounded-none p-5 shadow-3xs space-y-4">
              
              <div className="border-b pb-2.5 mb-2 flex items-center gap-2 text-indigo-650">
                <Book className="w-4 h-4 text-indigo-650" />
                <h2 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider">Category Details</h2>
              </div>

              {/* Category Name */}
              <div className="space-y-1">
                <label className="text-[11px] font-extrabold text-slate-700 block">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-none text-xs font-semibold focus:outline-none focus:border-indigo-650 bg-white"
                  placeholder="e.g. Exam Management Support"
                  required
                />
              </div>

              {/* Double column input row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Parent Category selector dropdown */}
                <div className="space-y-1">
                  <label className="text-[11px] font-extrabold text-slate-700 block">Parent Category</label>
                  <select 
                    value={parentCat}
                    onChange={(e) => setParentCat(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-350 rounded-none text-xs font-semibold focus:outline-none focus:border-indigo-650 bg-white cursor-pointer"
                  >
                    <option value="— None (Root) —">— None (Root) —</option>
                    <option value="Getting Started">Getting Started</option>
                    <option value="Student Management">Student Management</option>
                    <option value="Academics">Academics</option>
                    {customCategories.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                  <p className="text-[9px] text-slate-400 font-semibold leading-relaxed mt-0.5">
                    Leave as Root unless this sits under another category.
                  </p>
                </div>

                {/* Icon Class input with prefix dummy visual */}
                <div className="space-y-1">
                  <label className="text-[11px] font-extrabold text-slate-700 block">Icon Class</label>
                  <div className="relative flex items-center bg-white">
                    <div className="absolute left-3 text-slate-400 text-[10px] font-bold border-r pr-2 flex items-center gap-1 select-none">
                      📖
                    </div>
                    <input 
                      type="text" 
                      value={iconClass}
                      onChange={(e) => setIconClass(e.target.value)}
                      className="w-full pl-12 pr-3 py-2 border border-slate-350 rounded-none text-xs font-semibold focus:outline-none focus:border-indigo-650 bg-white"
                    />
                  </div>
                  <p className="text-[9px] text-slate-400 font-semibold leading-relaxed mt-0.5">
                    Any FontAwesome class — the preview updates as you type.
                  </p>
                </div>

              </div>

              {/* Description textarea */}
              <div className="space-y-1">
                <label className="text-[11px] font-extrabold text-slate-700 block">Description</label>
                <textarea 
                  value={catDescription}
                  onChange={(e) => setCatDescription(e.target.value)}
                  rows="4"
                  className="w-full px-3 py-2 border border-slate-350 rounded-none text-xs font-semibold focus:outline-none focus:border-indigo-650 bg-white"
                  placeholder="Explain what topics are organized under this help category..."
                />
              </div>

              {/* Bottom controls settings row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                
                {/* Visibility dropdown */}
                <div className="space-y-1">
                  <label className="text-[11px] font-extrabold text-slate-700 block">
                    Visibility <span className="text-red-500">*</span>
                  </label>
                  <select 
                    value={catVisibility}
                    onChange={(e) => setCatVisibility(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-350 rounded-none text-xs font-semibold focus:outline-none focus:border-indigo-650 bg-white cursor-pointer"
                  >
                    <option value="Public">Public</option>
                    <option value="Staff Only">Staff Only</option>
                    <option value="Admin Only">Admin Only</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                {/* Sort Order number input */}
                <div className="space-y-1">
                  <label className="text-[11px] font-extrabold text-slate-700 block">Sort Order</label>
                  <input 
                    type="number" 
                    value={catSortOrder}
                    onChange={(e) => setCatSortOrder(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-slate-350 rounded-none text-xs font-semibold focus:outline-none focus:border-indigo-650 bg-white"
                  />
                  <p className="text-[9px] text-slate-400 font-semibold leading-relaxed mt-0.5">
                    Lower numbers appear first.
                  </p>
                </div>

                {/* Status active switch toggle */}
                <div className="space-y-2 pl-2">
                  <label className="text-[11px] font-extrabold text-slate-700 block">Status</label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCatStatus(!catStatus)}
                      className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-none border-2 border-transparent transition-colors duration-150 ease-in-out focus:outline-none ${catStatus ? 'bg-indigo-600' : 'bg-slate-200'}`}
                    >
                      <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-none bg-white transition duration-150 ease-in-out ${catStatus ? 'translate-x-4' : 'translate-x-0'}`} />
                    </button>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">{catStatus ? "Active" : "Inactive"}</span>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-3 border-t">
                <button 
                  type="button" 
                  onClick={() => setViewState("list")}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-100 rounded-none text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-none text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md border-none"
                >
                  <Check className="w-3.5 h-3.5 text-white" />
                  {editingCatId ? "Save Changes" : "Create"}
                </button>
              </div>

            </form>

            {/* Right Card: Info Help Panel */}
            <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs space-y-4">
              
              <div className="flex items-center gap-2 text-indigo-650 border-b pb-2.5">
                <Lightbulb className="w-4.5 h-4.5 text-indigo-650" />
                <h3 className="font-bold text-xs text-slate-850">About visibility</h3>
              </div>

              <div className="space-y-4 text-[11px] font-semibold leading-relaxed text-slate-400">
                <div>
                  <h4 className="font-extrabold text-slate-850 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-none bg-indigo-500"></span>
                    Public
                  </h4>
                  <p className="pl-2.5 mt-0.5">visible to everyone, including parents in the app.</p>
                </div>
                
                <div>
                  <h4 className="font-extrabold text-slate-850 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-none bg-indigo-500"></span>
                    Staff Only
                  </h4>
                  <p className="pl-2.5 mt-0.5">hidden from parents; useful for internal how-tos.</p>
                </div>

                <div>
                  <h4 className="font-extrabold text-slate-850 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-none bg-indigo-500"></span>
                    Admin Only
                  </h4>
                  <p className="pl-2.5 mt-0.5">restricted to administrators.</p>
                </div>

                <div>
                  <h4 className="font-extrabold text-slate-850 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-none bg-indigo-500"></span>
                    Inactive
                  </h4>
                  <p className="pl-2.5 mt-0.5">inactive categories keep their articles but stop appearing in the knowledge base.</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
