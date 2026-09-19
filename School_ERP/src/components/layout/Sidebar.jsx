import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  Search, 
  LayoutDashboard, 
  Compass, 
  Headset, 
  Wallet, 
  Calculator, 
  Users, 
  BookOpen, 
  Monitor, 
  TrendingUp, 
  FileText, 
  ClipboardList, 
  MonitorPlay, 
  UserCog, 
  Calendar, 
  BookMarked,
  ChevronLeft,
  ChevronDown,
  PenTool,
  QrCode,
  Fingerprint,
  ClipboardCheck,
  BarChart2,
  ShieldCheck,
  LayoutGrid,
  Video,
  Award,
  IdCard,
  Megaphone,
  Library,
  Warehouse,
  Bus,
  Network,
  Building,
  HelpCircle,
  Package,
  Cctv,
  PieChart,
  Settings,
  HardDrive,
  MessageCircle,
  MessageSquare,
  User,
  ChevronsRight,
  LogOut
} from "lucide-react";

const Sidebar = ({ isCollapsed }) => {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (name) => {
    setOpenMenu(prev => (prev === name ? null : name));
  };

  const mainNav = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/" },
    { name: "Lead Management", icon: TrendingUp, path: "/leads/dashboard" },
    { name: "Competency-Based (CBC)", icon: Network, path: "/cbc/dashboard" },
    { name: "ERP Navigator", icon: Compass, path: "/erp-navigator" },
    { name: "Contact Support", icon: Headset, path: "/contact-support" },
  ];

  const managementNav = [
    { 
      name: "Finance & Fees", 
      icon: Wallet, 
      path: "#",
      children: [
        { name: "Fees Dashboard", path: "/finance/dashboard" },
        { name: "Collect Fees", path: "/finance/collect" },
        { name: "Search Due Fees", path: "/finance/search-due-fees" },
        { name: "All Transactions", path: "/finance/transactions" },
        { name: "Online Transactions", path: "/finance/online-transactions" },
        { name: "Fee Challans", path: "/finance/challans" },
        { name: "Assign Fees", path: "/finance/assign" },
        { name: "Fees Carry Forward", path: "/finance/carry-forward" },

        { name: "Fee Groups", path: "/finance/groups" },
        { name: "Fees Discount", path: "/finance/discount" },
        { name: "Fee Types", path: "/finance/types" },
        { name: "Generate Due Slip", path: "/finance/generate-slip" },
        { name: "Due Slip History", path: "/finance/slip-history" },
        { name: "Fee Data Audit", path: "/finance/audit" },
      ]
    },
    { 
      name: "Accounts", 
      icon: Calculator, 
      path: "#",
      children: [
        { name: "Accounts Dashboard", path: "/accounts/dashboard" },
        { name: "Income", path: "/accounts/income" },
        { name: "Expense", path: "/accounts/expense" },
        { name: "Income Heads", path: "/accounts/income-heads" },
        { name: "Expense Heads", path: "/accounts/expense-heads" },
        { name: "Bank Accounts", path: "/accounts/bank-accounts" },
      ]
    },
    { 
      name: "Student Information", 
      icon: Users, 
      path: "#",
      children: [
        { name: "Student Dashboard", path: "/students/dashboard" },
        { name: "Student Admission", path: "/students/admission" },
        { name: "Student List", path: "/students/list" },
        { name: "Search by Photo", path: "/students/search-photo" },
        { name: "Parents & Guardians", path: "/students/parents" },
        { name: "Student Attendance", path: "/students/attendance" },
        { name: "Behavior Records", path: "/students/behavior" },
        { name: "Student Houses", path: "/students/houses" },
        { name: "Student Categories", path: "/students/categories" },
        { name: "TC & Exit", path: "/students/tc" },
        { name: "Health Records", path: "/students/health" },
      ]
    },
    { 
      name: "Academics", 
      icon: BookOpen, 
      path: "#",
      children: [
        { name: "Academic Dashboard", path: "/academics/dashboard" },
        { name: "Academic Sessions", path: "/academics/sessions" },
        { name: "Classes", path: "/academics/classes" },
        { name: "Sections", path: "/academics/sections" },
        { name: "Subjects", path: "/academics/subjects" },
        { name: "Assign Subjects", path: "/academics/assign-subjects" },
        { name: "Assign Electives", path: "/academics/assign-electives" },
        { name: "Assign Class Teacher", path: "/academics/assign-class-teacher" },
        { name: "Manage Periods", path: "/academics/manage-periods" },
        { name: "Class Timetable", path: "/academics/timetable" },
        { name: "Promote Students", path: "/academics/promote" },
      ]
    },
    { 
      name: "Front Office", 
      icon: Monitor, 
      path: "#",
      children: [
        { name: "Front Office Dashboard", path: "/front-office/dashboard" },
        { name: "Admission Enquiries", path: "/front-office/admission-enquiries" },
        { name: "Visitor Book", path: "/front-office/visitor-book" },
        { name: "Complaints", path: "/front-office/complaints" },
        { name: "Postal Records", path: "/front-office/postal-records" },
        { name: "Gate Passes", path: "/front-office/gate-passes" },
        { name: "Gate Terminal", path: "/front-office/gate-passes/terminal" },
        { name: "Campus Workers", path: "/front-office/campus-workers" },
      ]
    },
    { 
      name: "Lead Management", 
      icon: TrendingUp, 
      path: "#",
      children: [
        { name: "Lead Dashboard", path: "/leads/dashboard" },
        { name: "Lead Pipeline Board", path: "/leads/pipeline" },
        { name: "All Leads", path: "/leads/all" },
        { name: "Follow-ups", path: "/leads/follow-ups" },
        { name: "Lead Sources & Stages", path: "/leads/sources-stages" },
      ]
    },
    { 
      name: "Offline Examinations", 
      icon: FileText, 
      path: "#",
      children: [
        { name: "Exam Dashboard", path: "/offline-exams/dashboard" },
        { name: "Manage Offline Exams", path: "/offline-exams/manage" },
        { name: "Exam Types", path: "/offline-exams/types" },
        { name: "Schedule & Marks Setup", path: "/offline-exams/schedule-marks" },
        { name: "Enter Marks", path: "/offline-exams/enter-marks" },
        { name: "Cocurricular Areas", path: "/offline-exams/cocurricular-areas" },
        { name: "Cocurricular Grades", path: "/offline-exams/cocurricular-grades" },
        { name: "Manage Grades", path: "/offline-exams/manage-grades" },
        { name: "Report Card Setups", path: "/offline-exams/report-card-setups" },
        { name: "Generate Marksheet", path: "/offline-exams/generate-marksheet" },
        { name: "Upload Marksheet", path: "/offline-exams/upload-marksheet" },
        { name: "Manage Uploads", path: "/offline-exams/manage-uploads" },
        { name: "Teacher Remarks", path: "/offline-exams/teacher-remarks" },
        { name: "Datesheet", path: "/offline-exams/datesheet" },
      ]
    },
    { 
      name: "CBC Academics", 
      icon: ClipboardList, 
      path: "#",
      children: [
        { name: "CBC Dashboard", path: "/cbc-academics/dashboard" },
        { name: "Strands & Outcomes", path: "/cbc-academics/strands-outcomes" },
        { name: "CBC Assessments", path: "/cbc-academics/assessments" },
        { name: "Core Competencies", path: "/cbc-academics/core-competencies" },
        { name: "Pathways & Tracks", path: "/cbc-academics/pathways-tracks" },
        { name: "CBC Reports", path: "/cbc-academics/reports" },
      ]
    },
    { 
      name: "Online Examinations", 
      icon: MonitorPlay, 
      path: "#",
      children: [
        { name: "Online Exam Dashboard", path: "/online-exams/dashboard" },
        { name: "Manage Online Exams", path: "/online-exams/manage" },
        { name: "Question Bank", path: "/online-exams/question-bank" },
        { name: "Chapters & Topics", path: "/online-exams/chapters-topics" },
      ]
    },
    { 
      name: "Human Resource", 
      icon: UserCog, 
      path: "#",
      children: [
        { name: "HR Dashboard", path: "/hr/dashboard" },
        { name: "Add New Staff", path: "/hr/staff/new" },
        { name: "Staff Directory", path: "/hr/staff" },
        { name: "Staff Attendance", path: "/hr/staff-attendance" },
        { name: "Payroll", path: "/hr/payroll" },
        { name: "Set Salary", path: "/hr/set-salary" },
        { name: "Approve Leave", path: "/hr/approve-leave" },
        { name: "Leave Types", path: "/hr/leave-types" },
        { name: "Departments", path: "/hr/departments" },
        { name: "Designations", path: "/hr/designations" },
        { name: "Staff ID Card", path: "/hr/id-cards" },
        { name: "HR Settings", path: "/hr/settings" },
        { name: "Manage Staff Loans", path: "/hr/manage-loans" },
        { name: "Salary Templates", path: "/hr/salary-templates" },
        { name: "Appraisal Cycles", path: "/hr/appraisal-cycles" },
        { name: "Appraisal Criteria", path: "/hr/appraisal-criteria" },
        { name: "Appraisals", path: "/hr/appraisals" },
      ]
    },
    { 
      name: "PTM Meetings", 
      icon: Calendar, 
      path: "#",
      children: [
        { name: "PTM Dashboard", path: "/ptm/dashboard" },
        { name: "PTM Schedule Meetings", path: "/ptm/schedule" },
        { name: "PTM Guide", path: "/ptm/guide" },
        { name: "PTM Attendance & Remarks", path: "/ptm/attendance-remarks" },
        { name: "PTM Follow-ups", path: "/ptm/follow-ups" },
        { name: "PTM Reports", path: "/ptm/reports" },
      ]
    },
    { 
      name: "Lesson Planner", 
      icon: BookMarked, 
      path: "#",
      children: [
        { name: "Lesson Planner Dashboard", path: "/lesson-planner/dashboard" },
        { name: "Lesson Plans", path: "/lesson-planner/plans" },
        { name: "Lesson Planner Guide", path: "/lesson-planner/guide" },
        { name: "Lesson Plan Review", path: "/lesson-planner/review" },
        { name: "Lesson Plan Approvals", path: "/lesson-planner/approvals" },
        { name: "Lesson Plan Coverage", path: "/lesson-planner/coverage" },
        { name: "Lesson Plan Reports", path: "/lesson-planner/reports" },
        { name: "Lesson Planner Settings", path: "/lesson-planner/settings" },
      ]
    },
    { 
      name: "OSM Module", 
      icon: PenTool, 
      path: "#",
      children: [
        { name: "OSM Dashboard", path: "/osm-module/dashboard" },
        { name: "OSM Sessions", path: "/osm-module/sessions" },
        { name: "OSM Evaluate", path: "/osm-module/evaluate" },
        { name: "OSM Reports", path: "/osm-module/reports" },
        { name: "OSM Guide", path: "/osm-module/guide" },
        { name: "OSM Moderation", path: "/osm-module/moderation" },
      ]
    },
    { 
      name: "QR Code Attendance", 
      icon: QrCode, 
      path: "#",
      children: [
        { name: "QR Attendance", path: "/qr-attendance/attendance" },
        { name: "QR Attendance Setting", path: "/qr-attendance/setting" },
        { name: "QR Attendance Report", path: "/qr-attendance/report" },
        { name: "QR Scan Audit", path: "/qr-attendance/scan-audit" },
      ]
    },
    { 
      name: "Biometric Devices", 
      icon: Fingerprint, 
      path: "#",
      children: [
        { name: "All Devices", path: "/biometric/all-devices" },
        { name: "Attendance Logs", path: "/biometric/attendance-logs" },
        { name: "Face Monitoring", path: "/biometric/face-monitoring" },
        { name: "Agent Logs", path: "/biometric/agent-logs" },
      ]
    },
    { 
      name: "Assessment", 
      icon: ClipboardCheck, 
      path: "#",
      children: [
        { name: "Assessment Dashboard", path: "/assessment/dashboard" },
        { name: "Assessments", path: "/assessment/list" },
        { name: "Assessment Guide", path: "/assessment/guide" },
        { name: "Assessment Reports", path: "/assessment/reports" },
      ]
    },
    { 
      name: "Surveys & Feedback", 
      icon: BarChart2, 
      path: "#",
      children: [
        { name: "Survey Dashboard", path: "/surveys/dashboard" },
        { name: "All Surveys", path: "/surveys/all" },
        { name: "My Surveys", path: "/surveys/my-surveys" },
        { name: "Feedback Triage", path: "/surveys/feedback-triage" },
        { name: "Survey Guide", path: "/surveys/guide" },
      ]
    },
    { 
      name: "Compliance & Governance", 
      icon: ShieldCheck, 
      path: "#",
      children: [
        { name: "Compliance Overview", path: "/compliance/overview" },
        { name: "School Profile", path: "/compliance/school-profile" },
        { name: "Compliance Packs", path: "/compliance/packs" },
        { name: "Field Settings", path: "/compliance/field-settings" },
        { name: "Document Vault", path: "/compliance/document-vault" },
        { name: "Compliance Checklist", path: "/compliance/checklist" },
        { name: "Data Records", path: "/compliance/data-records" },
        { name: "Data Validator", path: "/compliance/data-validator" },
        { name: "Government Reports", path: "/compliance/government-reports" },
        { name: "Inspections", path: "/compliance/inspections" },
        { name: "Compliance Calendar", path: "/compliance/calendar" },
      ]
    },
  ];

  const modulesNav = [
    { name: "Apps Center", icon: LayoutGrid, path: "/apps-center" },
    { 
      name: "Live Classes", 
      icon: Video, 
      path: "#",
      children: [
        { name: "Manage Live Classes", path: "/live-classes/manage" },
        { name: "Live Class Settings", path: "/live-classes/settings" },
      ]
    },
    { 
      name: "Study Center", 
      icon: BookOpen, 
      path: "#",
      children: [
        { name: "Dashboard", path: "/study-center/dashboard" },
        { name: "Classwork & Logbook", path: "/study-center/classwork-logbook" },
        { name: "Manage Syllabus", path: "/study-center/manage-syllabus" },
        { name: "Manage Resources", path: "/study-center/manage-resources" },
        { name: "Homework & Assignments", path: "/study-center/homework-assignments" },
      ]
    },
    { 
      name: "Certificates", 
      icon: Award, 
      path: "#",
      children: [
        { name: "Certificate Templates", path: "/certificates/templates" },
        { name: "Certificates & Document", path: "/certificates/documents" },
      ]
    },
    { 
      name: "ID Cards", 
      icon: IdCard, 
      path: "#",
      children: [
        { name: "Student ID Cards", path: "/id-cards/student" },
        { name: "Staff ID Cards", path: "/id-cards/staff" },
        { name: "Card Designs", path: "/id-cards/designs" },
      ]
    },
    { 
      name: "Communicate", 
      icon: Megaphone, 
      path: "#",
      children: [
        { name: "Notice Board", path: "/communicate/notice-board" },
        { name: "Events & Holidays", path: "/communicate/events-holidays" },
        { name: "Compose Broadcast", path: "/communicate/compose-broadcast" },
        { name: "Broadcast History", path: "/communicate/broadcast-history" },
        { name: "Image Gallery", path: "/communicate/image-gallery" },
      ]
    },
    { 
      name: "Library", 
      icon: Library, 
      path: "#",
      children: [
        { name: "Library Dashboard", path: "/library/dashboard" },
        { name: "Issue/Return Book", path: "/library/issue-return" },
        { name: "Manage Books", path: "/library/manage" },
        { name: "Book Categories", path: "/library/categories" },
      ]
    },

    { 
      name: "Transport", 
      icon: Bus, 
      path: "#",
      children: [
        { name: "Transport Dashboard", path: "/transport/dashboard" },
        { name: "Live Operations", path: "/transport/live-operations" },
        { name: "Manage Vehicles", path: "/transport/manage-vehicles" },
        { name: "Manage Routes", path: "/transport/manage-routes" },
        { name: "Live Vehicle Tracking", path: "/transport/live-tracking" },
        { name: "Drivers", path: "/transport/drivers" },
      ]
    },
    { 
      name: "Hostel", 
      icon: Building, 
      path: "#",
      children: [
        { name: "Hostel Dashboard", path: "/hostel/dashboard" },
        { name: "Student Allocation", path: "/hostel/student-allocation" },
        { name: "Manage Rooms", path: "/hostel/manage-rooms" },
        { name: "Room Types", path: "/hostel/room-types" },
        { name: "Manage Hostels", path: "/hostel/manage-hostels" },
      ]
    },
    { 
      name: "Help Center", 
      icon: HelpCircle, 
      path: "#",
      children: [
        { name: "Manage Categories", path: "/help-center/categories" },
        { name: "Browse Articles", path: "/help-center/articles" },
      ]
    },
    { 
      name: "Asset Management", 
      icon: Package, 
      path: "#",
      children: [
        { name: "Asset Dashboard", path: "/asset-management/dashboard" },
        { name: "Asset Register", path: "/asset-management/register" },
        { name: "Asset Categories", path: "/asset-management/categories" },
        { name: "Asset Assignments", path: "/asset-management/assignments" },
        { name: "Asset Depreciation", path: "/asset-management/depreciation" },
        { name: "Asset Maintenance", path: "/asset-management/maintenance" },
        { name: "Asset Disposals", path: "/asset-management/disposals" },
        { name: "Asset Audits", path: "/asset-management/audits" },
        { name: "Asset Reports", path: "/asset-management/reports" },
      ]
    },
    { 
      name: "Engagement", 
      icon: Megaphone, 
      path: "#",
      children: [
        { name: "Creatives", path: "/engagement/creatives" },
        { name: "Birthday Manager", path: "/engagement/birthday-manager" },
        { name: "Festival Greetings", path: "/engagement/festival-greetings" },
        { name: "Auto-send Settings", path: "/engagement/auto-send-settings" },
      ]
    },
    { 
      name: "CCTV", 
      icon: Cctv, 
      path: "#",
      children: [
        { name: "Camera Wall", path: "/cctv/camera-wall" },
        { name: "CCTV Cameras", path: "/cctv/cameras" },
        { name: "CCTV Access Log", path: "/cctv/access-log" },
      ]
    },
    { name: "Reports & Analytics", icon: PieChart, path: "/reports" },
  ];

  const systemNav = [
    { 
      name: "Settings & Billing", 
      icon: Settings, 
      path: "#",
      children: [
        { name: "School Settings", path: "/settings/school-settings" },
        { name: "Custom Fields", path: "/settings/custom-fields" },
        { name: "Roles & Permissions", path: "/settings/roles-permissions" },
        { name: "Payment Gateway", path: "/settings/payment-gateway" },
        { name: "Notification Settings", path: "/settings/notification-settings" },
        { name: "Admission Settings", path: "/settings/admission-settings" },
        { name: "Admission Form Fields", path: "/settings/admission-form-fields" },
        { name: "Audit Trail", path: "/settings/audit-trail" },
        { name: "Subscription", path: "/settings/subscription" },
        { name: "Subscription History", path: "/settings/subscription-history" },
        { name: "Module Settings", path: "/settings/module-settings" },
        { name: "Content Safety", path: "/settings/content-safety" },
      ]
    },
    { name: "Backup Management", icon: HardDrive, path: "/backup" },
  ];

  const communicationNav = [
    { name: "Comms Wallet", icon: Wallet, path: "/comms-wallet" },
    { name: "Chat Moderation", icon: MessageSquare, path: "/chat-moderation" },
    { name: "Messages", icon: MessageCircle, path: "/messages" },
  ];

  const accountNav = [
    { name: "My Profile", icon: User, path: "/profile" },
    { name: "Sign Out", icon: LogOut, path: "/logout" },
  ];

  useEffect(() => {
    const allGroups = [...managementNav, ...modulesNav, ...systemNav, ...communicationNav, ...accountNav];
    for (const group of allGroups) {
      if (group.children && group.children.some(child => location.pathname === child.path || location.pathname.startsWith(child.path + '/'))) {
        setOpenMenu(group.name);
        break;
      }
    }
  }, [location.pathname]);


  const renderNavSection = (title, items) => (
    <div className="mb-6">
      {!isCollapsed && (
        <h3 className="px-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 mt-4">{title}</h3>
      )}
      <ul className="space-y-1">
        {items.map((item) => {
          const isActiveGroup = openMenu === item.name;
          return (
          <li key={item.name} title={isCollapsed ? item.name : undefined}>
            {item.children ? (
              <div className="flex flex-col">
                <button 
                  onClick={() => !isCollapsed && toggleMenu(item.name)}
                  className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-5 py-2.5 text-sm transition-colors duration-150 border-l-[3px] ${
                    isActiveGroup && !isCollapsed ? 'bg-[#2E3338] text-white font-semibold border-[#f97316]' : 'text-slate-300 hover:text-white border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={`w-[18px] h-[18px] ${isActiveGroup ? 'text-orange-500' : 'text-slate-400'}`} />
                    {!isCollapsed && <span className="font-medium">{item.name}</span>}
                  </div>
                  {!isCollapsed && (
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isActiveGroup ? 'rotate-180 text-indigo-400' : 'text-slate-500'}`} />
                  )}
                </button>
                {/* Dropdown Items */}
                {!isCollapsed && (
                  <div className={`grid transition-all duration-300 ease-in-out ${isActiveGroup ? 'grid-rows-[1fr] opacity-100 mt-1.5 mb-1.5' : 'grid-rows-[0fr] opacity-0'}`}>
                    <ul className="overflow-hidden">
                      <div className="bg-[#0a0f1d]/50 space-y-0.5 pb-2 border-l-4 border-transparent">
                      {item.children.map((child) => (
                        <li key={child.name}>
                          <NavLink
                            to={child.path}
                            className={() => {
                              const isActiveLink = location.pathname === child.path || location.pathname.startsWith(child.path + '/');
                              return `flex items-center gap-3 pl-12 pr-5 py-2 text-[13px] transition-colors duration-150 border-l-[3px] ${
                                isActiveLink ? 'text-white border-[#f97316] bg-[#2E3338]' : 'text-slate-400 hover:text-white border-transparent'
                              }`
                            }}
                          >
                            {() => {
                              const isActiveLink = location.pathname === child.path || location.pathname.startsWith(child.path + '/');
                              return (
                              <>
                                <span className={`w-1.5 h-1.5 rounded-full ${isActiveLink ? 'bg-orange-500' : 'bg-slate-500'} transition-colors`} />

                                {child.name}
                              </>
                              );
                            }}
                          </NavLink>
                        </li>
                      ))}
                      </div>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <NavLink 
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-5 py-2.5 text-sm transition-colors duration-150 border-l-[3px] ${
                    isActive ? 'bg-[#2E3338] text-white font-semibold border-[#f97316]' : 'text-slate-300 hover:text-white border-transparent'
                  }`
                }
              >
                {({ isActive }) => (
                  <div className="flex items-center gap-3">
                    <item.icon className={`w-[18px] h-[18px] ${isActive ? 'text-orange-500' : 'text-slate-400'}`} />
                    {!isCollapsed && <span>{item.name}</span>}
                  </div>
                )}
              </NavLink>
            )}
          </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-[240px]'} transition-all duration-300 bg-[#353A40] border-r border-[#2a2e33] h-screen flex flex-col overflow-y-auto flex-shrink-0 shadow-lg [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-600 hover:[&::-webkit-scrollbar-thumb]:bg-slate-500 [&::-webkit-scrollbar-thumb]:rounded-full`}>
      {/* Logo Area */}
      <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-4 px-5'} py-6 sticky top-0 bg-[#353A40] z-10 border-b border-[#2a2e33] min-h-[84px]`}>
        <div className="w-[38px] h-[38px] flex items-center justify-center flex-shrink-0 relative">
          <svg viewBox="0 0 100 100" className="w-[120%] h-[120%] object-contain drop-shadow-md">
            <path d="M50 50 L20 20 A40 40 0 0 1 50 10 Z" fill="#f97316" />
            <path d="M50 50 L90 50 A40 40 0 1 1 20 20" fill="none" stroke="#f97316" strokeWidth="2.5" />
            <path d="M50 50 L50 90" stroke="#f97316" strokeWidth="1" strokeDasharray="3,3" />
          </svg>
        </div>
        {!isCollapsed && (
          <div className="flex flex-col">
            <span className="text-white font-medium text-[19px] tracking-wide leading-tight">YIS</span>
          </div>
        )}
      </div>

      {/* Search Menu */}
      {!isCollapsed && (
        <div className="px-5 py-4 mb-2">
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Search Menu..." 
              className="w-full bg-[#2E3338] text-sm text-slate-200 placeholder-slate-400 border border-[#40464f] rounded pl-3 pr-10 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-all font-normal"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-slate-400 group-focus-within:text-slate-300 transition-colors duration-300" />
            </div>
          </div>
        </div>
      )}

      {/* Navigation Sections */}
      <div className="flex-1 pb-10">
        {/* Main Navigation */}
        <div className={`mb-4 ${isCollapsed ? 'mt-4' : ''}`}>
          {!isCollapsed && <h3 className="px-5 text-[11px] font-medium text-slate-400 uppercase tracking-wide mb-1">Main Navigation</h3>}
          <ul className="space-y-1">
            {mainNav.map((item) => (
              <li key={item.name} title={isCollapsed ? item.name : undefined}>
                <NavLink 
                  to={item.path}
                  className={({ isActive }) => 
                    `flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-5'} py-2.5 text-sm transition-colors duration-150 border-l-[3px] ${
                      isActive && item.path !== "/erp-navigator"
                        ? 'bg-[#2E3338] text-white font-semibold border-[#f97316]' 
                        : 'text-slate-300 hover:text-white border-transparent'
                    }`
                  }
                >
                  <item.icon className={`w-[18px] h-[18px] flex-shrink-0 ${item.path === '/' || item.path === '/leads/dashboard' || item.path === '/cbc/dashboard' ? (window.location.pathname === item.path ? 'text-orange-500' : 'text-orange-400') : 'text-slate-400'}`} />
                  {!isCollapsed && <span className="whitespace-nowrap">{item.name}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {renderNavSection("Management", managementNav)}
        {renderNavSection("Workspaces", modulesNav)}
        {renderNavSection("System Config", systemNav)}
        {renderNavSection("Communication", communicationNav)}
        {renderNavSection("Account Info", accountNav)}
      </div>

      {/* Developer Credit */}
      {!isCollapsed && (
        <div className="px-4 py-3 border-t border-white/5 text-center flex-shrink-0">
          <p className="text-[9px] text-slate-500">Developed by <span className="text-orange-400 font-bold">Sachin</span></p>
          <p className="text-[9px] text-slate-500">@ALLCORE SOLUTION</p>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
