import React, { useState, useMemo } from "react";
import { 
  Plus, 
  HelpCircle, 
  Edit2, 
  Trash2, 
  User, 
  Search, 
  ChevronUp, 
  ChevronDown, 
  ArrowLeft, 
  Save, 
  CheckSquare, 
  Square,
  Users,
  ShieldAlert,
  Info
} from "lucide-react";

// List of all permissions structured matching the screenshot accordion grids
const ALL_PERMISSIONS_MODULES = [
  {
    key: "academics",
    name: "Academics",
    icon: "🎓",
    permissions: [
      { name: "Manage", slug: "academics.manage" },
      { name: "Session Manage", slug: "academics.session.manage" },
      { name: "Class Manage", slug: "academics.class.manage" },
      { name: "Section Manage", slug: "academics.section.manage" },
      { name: "Subject Manage", slug: "academics.subject.manage" },
      { name: "Assign Subject Manage", slug: "academics.assign_subject.manage" },
      { name: "Assign Teacher Manage", slug: "academics.assign_teacher.manage" },
      { name: "Timetable Manage", slug: "academics.timetable.manage" },
      { name: "Promote Manage", slug: "academics.promote.manage" },
      { name: "Dashboard View", slug: "academics.dashboard.view" },
      { name: "Session Switch", slug: "academics.session.switch" },
      { name: "Timetable View", slug: "academics.timetable.view" },
      { name: "Timetable Setup", slug: "academics.timetable.setup" }
    ]
  },
  {
    key: "student",
    name: "Student",
    icon: "👥",
    permissions: [
      { name: "Manage", slug: "student.manage" },
      { name: "Admission", slug: "student.admission" },
      { name: "View", slug: "student.view" },
      { name: "Attendance", slug: "student.attendance" },
      { name: "Admission Create", slug: "student.admission.create" },
      { name: "List View", slug: "student.list.view" },
      { name: "Profile View", slug: "student.profile.view" },
      { name: "Profile Edit", slug: "student.profile.edit" },
      { name: "Profile Delete", slug: "student.profile.delete" },
      { name: "Attendance View", slug: "student.attendance.view" },
      { name: "Attendance Manage", slug: "student.attendance.manage" },
      { name: "Category Manage", slug: "student.category.manage" },
      { name: "Disable Manage", slug: "student.disable.manage" },
      { name: "Behavior Manage", slug: "student.behavior.manage" },
      { name: "Health View", slug: "student.health.view" },
      { name: "Health Manage", slug: "student.health.manage" },
      { name: "Dashboard View", slug: "student.dashboard.view" },
      { name: "Exit Manage", slug: "student.exit.manage" },
      { name: "Photo Update", slug: "student.photo.update" },
      { name: "Photo Update Own", slug: "student.photo.update.own" }
    ]
  },
  {
    key: "fees",
    name: "Fees",
    icon: "💵",
    permissions: [
      { name: "Manage", slug: "fees.manage" },
      { name: "Collection Manage", slug: "fees.collection.manage" },
      { name: "Setup Manage", slug: "fees.setup.manage" },
      { name: "Assign Manage", slug: "fees.assign.manage" },
      { name: "Due View", slug: "fees.due.view" },
      { name: "Revert Manage", slug: "fees.revert.manage" },
      { name: "Dashboard View", slug: "fees.dashboard.view" },
      { name: "Due View Own", slug: "fees.due.view.own" }
    ]
  },
  {
    key: "exams",
    name: "Examinations",
    icon: "📝",
    permissions: [
      { name: "Manage", slug: "exams.manage" },
      { name: "Entry Marks", slug: "exams.entry.marks" }
    ]
  },
  {
    key: "certificates",
    name: "Certificates",
    icon: "📜",
    permissions: [
      { name: "Manage", slug: "certificates.manage" },
      { name: "Template Manage", slug: "certificates.template.manage" },
      { name: "Generate Manage", slug: "certificates.generate.manage" }
    ]
  },
  {
    key: "communicate",
    name: "Communicate",
    icon: "📢",
    permissions: [
      { name: "Manage", slug: "communicate.manage" },
      { name: "Notice Manage", slug: "communicate.notice.manage" },
      { name: "Event Manage", slug: "communicate.event.manage" }
    ]
  },
  {
    key: "hr",
    name: "Human Resource",
    icon: "💼",
    permissions: [
      { name: "Manage Staff", slug: "hr.manage.staff" },
      { name: "Manage Payroll", slug: "hr.manage.payroll" },
      { name: "Manage Leave", slug: "hr.manage.leave" },
      { name: "Apply Leave", slug: "hr.apply.leave" },
      { name: "Staff View", slug: "hr.staff.view" },
      { name: "Staff Manage", slug: "hr.staff.manage" },
      { name: "Staff Attendance View", slug: "hr.staff_attendance.view" },
      { name: "Staff Attendance Manage", slug: "hr.staff_attendance.manage" },
      { name: "Payroll Manage", slug: "hr.payroll.manage" },
      { name: "Leave Approve", slug: "hr.leave.approve" },
      { name: "Leave Apply", slug: "hr.leave.apply" },
      { name: "Dashboard View", slug: "hr.dashboard.view" },
      { name: "Promotion Manage", slug: "hr.promotion.manage" },
      { name: "Appraisal Manage", slug: "hr.appraisal.manage" },
      { name: "Appraisal Review", slug: "hr.appraisal.review" },
      { name: "Appraisal View", slug: "hr.appraisal.view" }
    ]
  }
];

export default function RolesPermissions() {
  // Current view: "list" | "add" | "edit"
  const [view, setView] = useState("list");

  // State to manage list of roles
  const [roles, setRoles] = useState([
    { id: 1, name: "Social", permissions: { academics: 13, accounts: 1, exams: 2, ptm: 2, student: 20 } },
    { id: 2, name: "Jr. Teacher", permissions: { academics: 13, exams: 2, student: 20 } },
    { id: 3, name: "Senior Teacher", permissions: { academics: 13, exams: 2, student: 20 } },
    { id: 4, name: "Copy & drawing", permissions: { academics: 13, exams: 2, student: 20 } },
    { id: 5, name: "EVS", permissions: { academics: 13, student: 20 } },
    { id: 6, name: "English & E V S", permissions: { academics: 13, student: 20 } },
    { id: 7, name: "UKG", permissions: { academics: 13, exams: 2, student: 20 } },
    { id: 8, name: "LKG", permissions: { academics: 13, student: 20 } },
    { id: 9, name: "Nursery", permissions: { academics: 13, student: 20 } }
  ]);

  // Form active state
  const [editingRole, setEditingRole] = useState(null);
  const [roleName, setRoleName] = useState("");
  const [filterQuery, setFilterQuery] = useState("");

  // Keep track of accordion expand states: key -> boolean
  const [accordions, setAccordions] = useState({
    academics: true,
    student: true,
    fees: true,
    exams: true,
    certificates: true,
    communicate: true,
    hr: true
  });

  // Track checked permission slug strings: Set of slugs
  const [selectedPermissions, setSelectedPermissions] = useState(new Set());

  // Count total permissions in the system (219 mock total count)
  const TOTAL_SYSTEM_PERMS = 219;

  // Toggle single permission checked state
  const handleTogglePermission = (slug) => {
    setSelectedPermissions(prev => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  };

  // Toggle all permissions inside a category
  const handleToggleCategory = (moduleKey, permList) => {
    const slugs = permList.map(p => p.slug);
    const allChecked = slugs.every(slug => selectedPermissions.has(slug));

    setSelectedPermissions(prev => {
      const next = new Set(prev);
      if (allChecked) {
        // Deselect all
        slugs.forEach(slug => next.delete(slug));
      } else {
        // Select all
        slugs.forEach(slug => next.add(slug));
      }
      return next;
    });
  };

  // Expand / Collapse all accordions
  const handleToggleAllAccordions = (expand) => {
    setAccordions({
      academics: expand,
      student: expand,
      fees: expand,
      exams: expand,
      certificates: expand,
      communicate: expand,
      hr: expand
    });
  };

  const handleAddRoleClick = () => {
    setEditingRole(null);
    setRoleName("");
    setSelectedPermissions(new Set());
    setView("add");
  };

  const handleEditRoleClick = (role) => {
    setEditingRole(role);
    setRoleName(role.name);
    
    // Auto-check permissions according to mock numbers
    const prefill = new Set();
    
    // Fill pre-selected items to make it look active
    if (role.permissions.academics) {
      ALL_PERMISSIONS_MODULES.find(m => m.key === "academics").permissions.forEach(p => prefill.add(p.slug));
    }
    if (role.permissions.student) {
      ALL_PERMISSIONS_MODULES.find(m => m.key === "student").permissions.forEach(p => prefill.add(p.slug));
    }
    if (role.permissions.exams) {
      ALL_PERMISSIONS_MODULES.find(m => m.key === "exams").permissions.forEach(p => prefill.add(p.slug));
    }
    if (role.permissions.fees) {
      ALL_PERMISSIONS_MODULES.find(m => m.key === "fees").permissions.forEach(p => prefill.add(p.slug));
    }
    
    setSelectedPermissions(prefill);
    setView("edit");
  };

  const handleDeleteRole = (id) => {
    if (confirm("Are you sure you want to delete this Role?")) {
      setRoles(roles.filter(r => r.id !== id));
    }
  };

  const handleSaveRole = (e) => {
    e.preventDefault();
    if (!roleName.trim()) {
      alert("Please enter a Role Name.");
      return;
    }

    // Calculate pill sizes for display
    const moduleCounts = {};
    ALL_PERMISSIONS_MODULES.forEach(mod => {
      const checkedInModule = mod.permissions.filter(p => selectedPermissions.has(p.slug)).length;
      if (checkedInModule > 0) {
        moduleCounts[mod.key] = checkedInModule;
      }
    });

    if (editingRole) {
      // Edit mode
      setRoles(roles.map(r => r.id === editingRole.id ? { ...r, name: roleName, permissions: moduleCounts } : r));
      alert("Role permissions updated successfully!");
    } else {
      // Add mode
      const newRole = {
        id: roles.length + 1,
        name: roleName,
        permissions: moduleCounts
      };
      setRoles([...roles, newRole]);
      alert("New Role created successfully!");
    }

    setView("list");
  };

  // Filter permissions based on user query
  const filteredModules = useMemo(() => {
    if (!filterQuery.trim()) return ALL_PERMISSIONS_MODULES;
    return ALL_PERMISSIONS_MODULES.map(module => {
      const matchPerms = module.permissions.filter(
        p => p.name.toLowerCase().includes(filterQuery.toLowerCase()) || 
             p.slug.toLowerCase().includes(filterQuery.toLowerCase())
      );
      return { ...module, permissions: matchPerms };
    }).filter(module => module.permissions.length > 0);
  }, [filterQuery]);

  const areAllExpanded = Object.values(accordions).every(v => v === true);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-4 font-sans text-gray-800">
      
      {/* HEADER SECTION */}
      {view === "list" && (
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Roles & Permissions</h1>
            <p className="text-slate-500 text-sm">Create and assign access levels for school administrative staff</p>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => alert("Roles & Permissions Guide Loading...")}
              className="px-4 py-2 border border-slate-350 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-none flex items-center gap-1.5 shadow-3xs cursor-pointer active:scale-95"
            >
              <HelpCircle className="w-4 h-4 text-slate-500" />
              How it Works
            </button>
            
            <button 
              onClick={handleAddRoleClick}
              className="px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-none hover:bg-indigo-700 transition-all flex items-center gap-1.5 shadow-md cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4 text-white" />
              Add New Role
            </button>
          </div>
        </div>
      )}

      {/* 1. LIST VIEW OF ALL ROLES */}
      {view === "list" && (
        <div className="bg-white border border-slate-200 rounded-none overflow-hidden shadow-3xs animate-in fade-in duration-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200 text-[10px] font-bold text-indigo-650 uppercase tracking-wider">
                  <th className="py-3 px-5 border-r border-slate-200 w-64">Role Name</th>
                  <th className="py-3 px-5 border-r border-slate-200">Permissions</th>
                  <th className="py-3 px-5 text-center w-36">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-650 font-medium">
                {roles.map((role) => (
                  <tr key={role.id} className="hover:bg-slate-50/30 transition-colors">
                    
                    {/* Role name */}
                    <td className="py-4 px-5 border-r border-slate-100 font-bold text-slate-800">{role.name}</td>
                    
                    {/* Permissions pill list */}
                    <td className="py-4 px-5 border-r border-slate-100">
                      <div className="flex flex-wrap gap-1.5">
                        {role.permissions.academics && (
                          <span className="px-2 py-0.5 border border-slate-200 rounded-none text-[10px] text-slate-600 font-semibold bg-white">
                            Academics {role.permissions.academics}
                          </span>
                        )}
                        {role.permissions.student && (
                          <span className="px-2 py-0.5 border border-slate-200 rounded-none text-[10px] text-slate-600 font-semibold bg-white">
                            Student {role.permissions.student}
                          </span>
                        )}
                        {role.permissions.fees && (
                          <span className="px-2 py-0.5 border border-slate-200 rounded-none text-[10px] text-slate-600 font-semibold bg-white">
                            Fees {role.permissions.fees}
                          </span>
                        )}
                        {role.permissions.exams && (
                          <span className="px-2 py-0.5 border border-slate-200 rounded-none text-[10px] text-slate-600 font-semibold bg-white">
                            Examinations {role.permissions.exams}
                          </span>
                        )}
                        {role.permissions.certificates && (
                          <span className="px-2 py-0.5 border border-slate-200 rounded-none text-[10px] text-slate-600 font-semibold bg-white">
                            Certificates {role.permissions.certificates}
                          </span>
                        )}
                        {role.permissions.communicate && (
                          <span className="px-2 py-0.5 border border-slate-200 rounded-none text-[10px] text-slate-600 font-semibold bg-white">
                            Communicate {role.permissions.communicate}
                          </span>
                        )}
                        {role.permissions.hr && (
                          <span className="px-2 py-0.5 border border-slate-200 rounded-none text-[10px] text-slate-600 font-semibold bg-white">
                            Human Resource {role.permissions.hr}
                          </span>
                        )}
                        {/* Static mockup accounts/ptm tags for matching exactly */}
                        {role.name === "Social" && (
                          <>
                            <span className="px-2 py-0.5 border border-slate-200 rounded-none text-[10px] text-slate-600 font-semibold bg-white">
                              Accounts 1
                            </span>
                            <span className="px-2 py-0.5 border border-slate-200 rounded-none text-[10px] text-slate-600 font-semibold bg-white">
                              PTM 2
                            </span>
                          </>
                        )}
                      </div>
                    </td>

                    {/* Action buttons */}
                    <td className="py-4 px-5 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => handleEditRoleClick(role)}
                          className="px-3 py-1 border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 font-bold text-xs rounded-none shadow-3xs flex items-center gap-1 cursor-pointer"
                        >
                          <Edit2 className="w-3 h-3 text-slate-500" />
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteRole(role.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-slate-50 rounded-none transition-colors cursor-pointer"
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
      )}

      {/* 2. ADD / EDIT ROLE VIEW (Accordion panels matching screenshots) */}
      {(view === "add" || view === "edit") && (
        <div className="space-y-4 animate-in fade-in duration-200">
          
          {/* Header title */}
          <div>
            <h1 className="text-xl font-bold text-slate-800">
              {view === "edit" ? "Edit Role & Permissions" : "Add New Role"}
            </h1>
          </div>

          <form onSubmit={handleSaveRole} className="space-y-4">
            
            {/* Top Config Card */}
            <div className="bg-white border border-slate-200 rounded-none overflow-hidden shadow-3xs">
              
              {/* Header card blue banner */}
              <div className="bg-[#f0f4f9] border-l-4 border-indigo-650 text-indigo-650 px-4 py-3 text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-2">
                <User className="w-4.5 h-4.5 text-indigo-650" />
                New Role
              </div>

              {/* Form Input fields block */}
              <div className="p-5 space-y-4">
                
                {/* Role Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Role Name</label>
                  <input 
                    type="text" 
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    required
                    placeholder="Enter role name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-none text-xs text-slate-800 font-semibold focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">Permissions:</label>
                  
                  {/* Permissions Filter Toolbar block */}
                  <div className="border border-slate-200 rounded-none p-3 bg-slate-50/50 flex flex-col md:flex-row justify-between items-center gap-3">
                    
                    {/* Search Field */}
                    <div className="relative flex items-center bg-white w-full md:w-80">
                      <input 
                        type="text" 
                        placeholder="Filter permissions..." 
                        value={filterQuery}
                        onChange={(e) => setFilterQuery(e.target.value)}
                        className="pl-8 pr-3 py-1.5 border border-gray-300 rounded-none text-xs font-semibold focus:outline-none focus:border-indigo-600 w-full"
                      />
                      <Search className="absolute left-2.5 w-3.5 h-3.5 text-slate-400" />
                    </div>

                    {/* Dynamic counter + Collapse buttons */}
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
                      <span>{selectedPermissions.size} of {TOTAL_SYSTEM_PERMS} selected</span>
                      
                      <button
                        type="button"
                        onClick={() => handleToggleAllAccordions(!areAllExpanded)}
                        className="px-3 py-1.5 border border-gray-300 text-slate-700 bg-white font-bold rounded-none hover:bg-slate-50 transition-all flex items-center gap-1.5 cursor-pointer shadow-3xs text-[11px]"
                      >
                        {areAllExpanded ? (
                          <>
                            <ChevronUp className="w-3.5 h-3.5 text-slate-500" />
                            Collapse all
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                            Expand all
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                </div>

                {/* ACCORDION PANELS */}
                <div className="space-y-3.5">
                  {filteredModules.map((module) => {
                    const isExpanded = !!accordions[module.key];
                    const moduleSlugs = module.permissions.map(p => p.slug);
                    const checkedInModule = module.permissions.filter(p => selectedPermissions.has(p.slug)).length;
                    const isAllCheckedInModule = module.permissions.length > 0 && checkedInModule === module.permissions.length;

                    return (
                      <div key={module.key} className="border border-slate-200 rounded-none overflow-hidden shadow-3xs bg-white">
                        
                        {/* Accordion Header */}
                        <div 
                          className="px-4 py-3 bg-slate-50/50 flex justify-between items-center cursor-pointer select-none"
                          onClick={() => setAccordions({ ...accordions, [module.key]: !isExpanded })}
                        >
                          <div className="flex items-center gap-3">
                            
                            {/* Accordion Master Checkbox */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleCategory(module.key, module.permissions);
                              }}
                              className="text-slate-500 hover:text-indigo-650 transition-colors"
                            >
                              {isAllCheckedInModule ? (
                                <CheckSquare className="w-4.5 h-4.5 text-indigo-650 fill-indigo-50" />
                              ) : checkedInModule > 0 ? (
                                <div className="w-4.5 h-4.5 border border-indigo-600 rounded-none bg-indigo-50 flex items-center justify-center">
                                  <div className="w-2.5 h-0.5 bg-indigo-650"></div>
                                </div>
                              ) : (
                                <Square className="w-4.5 h-4.5 text-slate-350" />
                              )}
                            </button>

                            {/* Icon & Title */}
                            <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                              <span>{module.icon}</span>
                              <span>{module.name}</span>
                            </span>

                            {/* Counter badge */}
                            <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-none font-extrabold">
                              {checkedInModule} / {module.permissions.length}
                            </span>

                          </div>

                          {/* Chevron icon */}
                          {isExpanded ? (
                            <ChevronUp className="w-4.5 h-4.5 text-slate-400" />
                          ) : (
                            <ChevronDown className="w-4.5 h-4.5 text-slate-400" />
                          )}
                        </div>

                        {/* Accordion Content Grid (3 Columns) */}
                        {isExpanded && (
                          <div className="p-4 border-t divide-y divide-slate-100 max-h-[380px] overflow-y-auto">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 py-2">
                              {module.permissions.map((perm) => {
                                const isChecked = selectedPermissions.has(perm.slug);
                                return (
                                  <div 
                                    key={perm.slug} 
                                    onClick={() => handleTogglePermission(perm.slug)}
                                    className="flex items-start gap-2.5 cursor-pointer group p-1 rounded-none hover:bg-slate-50/50"
                                  >
                                    <button
                                      type="button"
                                      className="text-slate-450 mt-0.5 group-hover:text-indigo-650 transition-all flex-shrink-0"
                                    >
                                      {isChecked ? (
                                        <CheckSquare className="w-4.5 h-4.5 text-indigo-650" />
                                      ) : (
                                        <Square className="w-4.5 h-4.5 text-slate-300" />
                                      )}
                                    </button>
                                    <div className="leading-tight">
                                      <span className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                                        {perm.name}
                                      </span>
                                      <div className="text-[10px] text-slate-400 font-mono mt-0.5 font-medium">
                                        {perm.slug}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                      </div>
                    );
                  })}
                </div>

              </div>

              {/* Actions Footer */}
              <div className="flex justify-end gap-2.5 p-4 bg-slate-50 border-t">
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
                  Save Role Permissions
                </button>
              </div>

            </div>

          </form>

        </div>
      )}

    </div>
  );
}
