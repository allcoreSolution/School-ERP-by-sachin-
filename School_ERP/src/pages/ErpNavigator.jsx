import React, { useState } from 'react';
import { 
  Search, Book, Settings, Users, Shield, Receipt, Layers, UserCog, MessageSquare, 
  Lightbulb, ChevronRight, GraduationCap, Laptop, Globe,
  Heart, CheckCircle2, Link as LinkIcon, UserPlus, 
  FileText, Calendar, PenTool, Image, FileBadge, Send, Bus, LogOut, Ticket
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ErpNavigator = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeRole, setActiveRole] = useState('School Admin');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeHub, setActiveHub] = useState('Student Information');

  // 1. STATS
  const stats = [
    { value: '39', label: 'Modules', icon: Layers, color: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-100' },
    { value: '237', label: 'Screens you can open', icon: Laptop, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100' },
    { value: '7', label: 'Suites', icon: Layers, color: 'text-purple-600', bg: 'bg-purple-50 border-purple-100' },
  ];

  // 2. SCHOOL JOURNEY
  const journeys = [
    { title: 'Set up the school', sub: 'Profile, branding and the acad...', link: '/settings/school-settings' },
    { title: 'Classes & subjects', sub: 'Classes, sections and the subj...', link: '/academics/subjects' },
    { title: 'Add your staff', sub: 'Teachers and the rest of the te...', link: '/hr/staff/new' },
    { title: 'Admit students', sub: 'Student records and their gua...', link: '/students/admission' },
    { title: 'Build the timetable', sub: 'Periods, and who teaches wha...', link: '/academics/timetable' },
    { title: 'Take attendance', sub: 'Daily student attendance', link: '/students/attendance' },
    { title: 'Set up & collect fees', sub: 'Fee structure, assignment and ...', link: '/finance/dashboard' },
    { title: 'Run exams', sub: 'Schedule, marks entry and res...', link: '/assessment/offline-exams' },
    { title: 'Reach parents', sub: 'Notices, SMS, WhatsApp and ...', link: '/communicate/compose-broadcast' },
    { title: 'Run transport', sub: 'Routes, stops and vehicles', link: '/transport/dashboard' },
    { title: 'Go mobile', sub: 'Parent logins for the mobile a...', link: '/apps-center' }
  ];

  // 3. I AM A...
  const rolesRow1 = ['School Admin', 'Teacher', 'Accountant', 'Librarian', 'Receptionist', 'Accademic Master', 'Principal (Head Of School)', 'Accounts Officer (Payable)', 'Accounts Officer (Cashier)', 'Administrator'];
  const rolesRow2 = ['Biology', 'Chemistry', 'Telugu', 'English', 'Maths', 'Hindi', 'Computer', 'Science', 'Physics', 'P E T', 'Drawing', 'Incharge', 'Office', 'Operator', 'Coordinator', 'Civil', 'IT Engineer', 'Nursery', 'L K G', 'U K G', 'English & E V S', 'E V S', 'Copy & Drawing', 'Senior Teacher', 'Jr. Teacher', 'Social', 'Social / English'];
  const allRoles = [...rolesRow1, ...rolesRow2];

  // 4. TASKS
  const taskIcons = [
    { n: 'Admit a new student', i: UserPlus, link: '/students/admission' },
    { n: 'Collect a fee payment', i: Receipt, link: '/finance/collect' },
    { n: 'Check pending dues', i: FileText, link: '/finance/search-due-fees' },
    { n: 'Assign fees to students', i: Shield, link: '/finance/assign' },
    { n: 'Take attendance', i: CheckCircle2, link: '/students/attendance' },
    { n: 'Enter exam marks', i: PenTool, link: '/offline-exams/enter-marks' },
    { n: 'Schedule an exam', i: Calendar, link: '/offline-exams/datesheet/manage' },
    { n: 'Generate a marksheet', i: FileText, link: '/offline-exams/generate-marksheet' },
    { n: 'Create the timetable', i: Calendar, link: '/academics/timetable' },
    { n: 'Promote students a year', i: ChevronRight, link: '/academics/promote' },
    { n: 'Post a notice', i: MessageSquare, link: '/communicate/notice-board' },
    { n: 'Send a broadcast message', i: Send, link: '/communicate/compose-broadcast' },
    { n: 'Issue a certificate', i: FileBadge, link: '/certificates/document' },
    { n: 'Print student ID cards', i: Image, link: '/id-cards/student' },
    { n: 'Set homework', i: Book, link: '/study-center/homework-assignments' },
    { n: 'Add a staff member', i: UserPlus, link: '/hr/staff/new' },
    { n: 'Manage transport routes', i: Bus, link: '/transport/dashboard' },
    { n: 'Manage parent logins', i: Users, link: '/students/list' },
    { n: 'Record a student exit', i: LogOut, link: '/students/tc' },
    { n: 'Issue or return a book', i: Book, link: '/library/issue-return' },
    { n: 'Log a visitor', i: Users, link: '/front-office/visitor-book' },
    { n: 'Record an admission enquiry', i: Lightbulb, link: '/front-office/admission-enquiries' },
    { n: 'Log a complaint', i: MessageSquare, link: '/front-office/complaints' },
    { n: 'Work the lead pipeline', i: Lightbulb, link: '/leads/pipeline' },
    { n: 'Verify a gate pass', i: Ticket, link: '/front-office/gate-passes/terminal' },
    { n: 'View reports', i: Layers, link: '/reports' }
  ];

  // Map Filter Categories
  const filterCategories = [
    { name: 'All', count: 39, color: 'bg-indigo-600', textColor: 'text-white' },
    { name: 'Students', count: 5, color: 'bg-blue-100', textColor: 'text-blue-700' },
    { name: 'Academics', count: 11, color: 'bg-purple-100', textColor: 'text-purple-700' },
    { name: 'Finance & Fees', count: 2, color: 'bg-emerald-100', textColor: 'text-emerald-700' },
    { name: 'Staff', count: 1, color: 'bg-amber-100', textColor: 'text-amber-700' },
    { name: 'Operations', count: 9, color: 'bg-teal-100', textColor: 'text-teal-700' },
    { name: 'Engagement', count: 6, color: 'bg-pink-100', textColor: 'text-pink-700' },
    { name: 'Admin & Settings', count: 5, color: 'bg-slate-100', textColor: 'text-slate-700' },
  ];

  // Module Grid Content
  const moduleData = [
    {
      categoryId: 'Students',
      categoryTitle: 'Students',
      categoryDesc: 'Admission to alumni — the student record and everything filed against it.',
      categoryScreens: 24,
      theme: {
        bannerBg: 'bg-blue-500',
        cardBg: 'bg-[#f0f6ff]', // soft blue
        cardShadow: 'shadow-[0_4px_0_0_rgba(191,219,254,1)] border border-blue-100', // shadow-blue-200
        iconBg: 'bg-blue-600',
        textDark: 'text-blue-900',
        textLight: 'text-blue-600',
      },
      items: [
        {
          title: 'Student Information',
          icon: Users,
          link: '/students/dashboard',
          core: true, count: 12,
          desc: 'The student record everything else hangs off — admission, profile, sibling mapping, and history.',
          connected: ['Academics', 'Biometric Attendance', 'Certificates & Documents', 'Communications', 'Compliance & Governance', 'Fees Collection', 'Front Office', 'Homework', 'Hostel', 'ID Cards', 'Lead Management', 'Library Management', 'Offline Examinations', 'QR Code Attendance', 'Student Health Records', 'Student-Teacher Chat', 'Transport']
        },
        {
          title: 'Certificates & Documents',
          icon: Shield,
          link: '/certificates/templates',
          core: true, count: 4,
          desc: 'Designed, printable school documents — transfer and bonafide certificates, character certificates...',
          connected: ['Offline Examinations', 'Student Information']
        },
        {
          title: 'ID Cards',
          icon: Image,
          link: '/id-cards/student',
          core: true, count: 4,
          desc: 'Design and batch-print student and staff ID cards from the visual card studio.',
          connected: ['Student Information']
        },
        {
          title: 'Lead Management',
          icon: Lightbulb,
          link: '/leads/dashboard',
          core: false, count: 3,
          desc: 'Track admission enquiries as leads through follow-ups until they convert on the pipeline board.',
          connected: ['Front Office', 'School Website', 'Student Information']
        },
        {
          title: 'Student Health Records',
          icon: Heart,
          link: '/students/health',
          core: false, count: 1,
          desc: 'Medical history, checkups, allergies and clinic visits held against the student profiles.',
          connected: ['Student Information']
        }
      ]
    },
    {
      categoryId: 'Academics',
      categoryTitle: 'Academics',
      categoryDesc: 'Classes and timetable through to exams, marks and report cards.',
      categoryScreens: 63,
      theme: {
        bannerBg: 'bg-purple-500',
        cardBg: 'bg-[#f8f5ff]', // soft purple
        cardShadow: 'shadow-[0_4px_0_0_rgba(233,213,255,1)] border border-purple-100', // shadow-purple-200
        iconBg: 'bg-purple-600',
        textDark: 'text-purple-900',
        textLight: 'text-purple-600',
      },
      items: [
        {
          title: 'Offline Examinations',
          icon: GraduationCap,
          link: '/assessment/offline-exams',
          core: true, count: 12,
          desc: 'Exam setup, datesheets, admit cards, marks entry, grading and printed report cards.',
          connected: ['Academics', 'Assessment', 'CBC / Competency Academics', 'Certificates & Documents', 'Communications', 'Digital Evaluation (OSM)', 'Parent-Teacher Meetings', 'Student Information']
        },
        {
          title: 'Academics',
          icon: Book,
          link: '/academics/dashboard',
          core: true, count: 11,
          desc: 'Classes, sections, subjects, the academic session and the timetable that drives everything.',
          connected: ['Assessment', 'CBC / Competency Academics', 'Compliance & Governance', 'Fees Collection', 'Homework', 'Human Resource', 'Lesson Planner', 'Live Classes', 'Offline Examinations', 'Online Examinations', 'Student Information', 'Study Center']
        },
        {
          title: 'Lesson Planner',
          icon: Calendar,
          link: '/lesson-planner/dashboard',
          core: false, count: 8,
          desc: 'Plan lessons against the syllabus, submit for review and track curriculum completion.',
          connected: ['Academics', 'Human Resource']
        },
        {
          title: 'CBC / Competency Academics',
          icon: Settings,
          link: '/cbc/dashboard',
          core: false, count: 6,
          desc: 'Competency-based curriculum — learning areas, strands, pathways and CBC reports.',
          connected: ['Academics', 'Offline Examinations']
        },
        {
          title: 'Digital Evaluation (OSM)',
          icon: Laptop,
          link: '/osm-module/dashboard',
          core: false, count: 6,
          desc: 'Scan answer sheets and mark them on screen, with moderation and evaluator assignments.',
          connected: ['Offline Examinations']
        },
        {
          title: 'Holistic Progress Card',
          icon: Users,
          link: '/cbc-academics/dashboard',
          core: false, count: 5,
          desc: 'NEP 2020 / PARAKH Holistic Progress Card — competency-based, four-stage holistic reports.',
          connected: []
        },
        {
          title: 'Assessment',
          icon: FileText,
          link: '/assessment/assessments',
          core: false, count: 4,
          desc: 'Continuous and daily-test marks kept separate from the formal exam cycle.',
          connected: ['Academics', 'Offline Examinations']
        },
        {
          title: 'Online Examinations',
          icon: Laptop,
          link: '/online-exams/question-bank',
          core: false, count: 4,
          desc: 'Question banks and timed online tests students sit in the browser or the app.',
          connected: ['Academics']
        },
        {
          title: 'Study Center',
          icon: Layers,
          link: '/study-center/dashboard',
          core: false, count: 4,
          desc: 'Share study material, notes and video lessons with students by class.',
          connected: ['Academics']
        },
        {
          title: 'Live Classes',
          icon: Laptop,
          link: '/live-classes/manage',
          core: false, count: 2,
          desc: 'Schedule and run online classes, with join links pushed to the parent and student apps.',
          connected: ['Academics']
        },
        {
          title: 'Homework',
          icon: PenTool,
          link: '/study-center/homework-assignments',
          core: false, count: 1,
          desc: 'Set homework, collect submissions and review them from the staff app or the web panel.',
          connected: ['Academics', 'Student Information']
        }
      ]
    },
    {
      categoryId: 'Finance & Fees',
      categoryTitle: 'Finance & Fees',
      categoryDesc: 'Collect fees, reconcile payments and keep the books.',
      categoryScreens: 21,
      theme: {
        bannerBg: 'bg-emerald-600',
        cardBg: 'bg-[#ecfdf5]', // soft emerald
        cardShadow: 'shadow-[0_4px_0_0_rgba(167,243,208,1)] border border-emerald-100', // shadow-emerald-200
        iconBg: 'bg-emerald-600',
        textDark: 'text-emerald-900',
        textLight: 'text-emerald-600',
      },
      items: [
        {
          title: 'Fees Collection',
          icon: Receipt,
          link: '/finance/dashboard',
          core: true, count: 14,
          desc: 'Fee structures, assignment, collection, discounts, dues,...',
          connected: ['Academics', 'Accounts & Finance', 'Communications', 'Hostel', 'Student Information', 'Transport']
        },
        {
          title: 'Accounts & Finance',
          icon: FileText,
          link: '/accounts/dashboard',
          core: false, count: 7,
          desc: 'Double-entry bookkeeping — chart of accounts, journals, day...',
          connected: ['Asset Management', 'Fees Collection', 'Human Resource', 'Inventory']
        }
      ]
    },
    {
      categoryId: 'Staff',
      categoryTitle: 'Staff',
      categoryDesc: 'Hiring to payroll, attendance and appraisals.',
      categoryScreens: 15,
      theme: {
        bannerBg: 'bg-amber-600',
        cardBg: 'bg-[#fffbeb]', // soft amber
        cardShadow: 'shadow-[0_4px_0_0_rgba(253,230,138,1)] border border-amber-200', // shadow-amber-200
        iconBg: 'bg-amber-600',
        textDark: 'text-amber-900',
        textLight: 'text-amber-600',
      },
      items: [
        {
          title: 'Human Resource',
          icon: UserCog,
          link: '/hr/dashboard',
          core: true, count: 15,
          desc: 'Staff records, attendance, leave, payroll, appraisals and...',
          connected: ['Academics', 'Accounts & Finance', 'Biometric Attendance', 'Compliance & Governance', 'Lesson Planner']
        }
      ]
    },
    {
      categoryId: 'Operations',
      categoryTitle: 'Operations',
      categoryDesc: 'The day-to-day campus — front desk, transport, library, hostel and devices.',
      categoryScreens: 54,
      theme: {
        bannerBg: 'bg-teal-600',
        cardBg: 'bg-[#f0fdfa]', // soft teal
        cardShadow: 'shadow-[0_4px_0_0_rgba(153,246,228,1)] border border-teal-200', // shadow-teal-200
        iconBg: 'bg-teal-600',
        textDark: 'text-teal-900',
        textLight: 'text-teal-700',
      },
      items: [
        {
          title: 'Inventory',
          icon: Layers,
          link: '/inventory/dashboard',
          core: false, count: 11,
          desc: 'Stock items, suppliers, purchases, issues and the school store.',
          connected: ['Accounts & Finance']
        },
        {
          title: 'Asset Management',
          icon: CheckCircle2,
          link: '/asset-management/dashboard',
          core: false, count: 9,
          desc: 'Fixed-asset register with assignment, maintenance, audit...',
          connected: ['Accounts & Finance']
        },
        {
          title: 'Front Office',
          icon: MessageSquare,
          link: '/front-office/dashboard',
          core: false, count: 8,
          desc: 'The reception desk — admission enquiries, visitors, gate passes,...',
          connected: ['Lead Management', 'Student Information']
        },
        {
          title: 'Transport',
          icon: Bus,
          link: '/transport/dashboard',
          core: false, count: 6,
          desc: 'Routes, stops, vehicles, drivers, transport fees and live bus...',
          connected: ['Fees Collection', 'Student Information']
        },
        {
          title: 'Hostel',
          icon: Users,
          link: '/hostel/dashboard',
          core: false, count: 5,
          desc: 'Hostels, rooms, bed allocation and boarder records.',
          connected: ['Fees Collection', 'Student Information']
        },
        {
          title: 'Biometric Attendance',
          icon: CheckCircle2,
          link: '/cctv/camera-wall',
          core: false, count: 4,
          desc: 'ZKTeco / eSSL device fleet pushing punches straight into...',
          connected: ['CCTV / Live Surveillance', 'Human Resource', 'Student Information']
        },
        {
          title: 'Library Management',
          icon: Book,
          link: '/library/dashboard',
          core: false, count: 4,
          desc: 'Book catalogue, member cards, issue and return, and overdue...',
          connected: ['Student Information']
        },
        {
          title: 'QR Code Attendance',
          icon: CheckCircle2,
          link: '/students/dashboard',
          core: false, count: 4,
          desc: 'Kiosk-mode attendance where students scan a QR badge on...',
          connected: ['Student Information']
        },
        {
          title: 'CCTV / Live Surveillance',
          icon: Laptop,
          link: '/cctv/cameras',
          core: false, count: 3,
          desc: 'Live view of the school camera fleet as a control-room wall, and optionally for...',
          connected: ['Biometric Attendance']
        }
      ]
    },
    {
      categoryId: 'Engagement',
      categoryTitle: 'Engagement',
      categoryDesc: 'Everything that reaches a parent, student or teacher.',
      categoryScreens: 26,
      theme: {
        bannerBg: 'bg-rose-500',
        cardBg: 'bg-[#fff1f2]', // soft rose
        cardShadow: 'shadow-[0_4px_0_0_rgba(254,205,211,1)] border border-rose-100', // shadow-rose-200
        iconBg: 'bg-rose-600',
        textDark: 'text-rose-900',
        textLight: 'text-rose-600',
      },
      items: [
        {
          title: 'Parent-Teacher Meetings',
          icon: Users,
          link: '/ptm/dashboard',
          core: false, count: 6,
          desc: 'Schedule PTMs, record attendance and teacher remarks, and track follow-ups.',
          connected: ['Communications', 'Offline Examinations']
        },
        {
          title: 'Communications',
          icon: Send,
          link: '/communicate/notice-board',
          core: false, count: 5,
          desc: 'Notices, SMS, WhatsApp, email and push — sent to parents, students or...',
          connected: ['Engagement & Creatives', 'Fees Collection', 'Knowledge Base & Chatbot', 'Offline Examinations', 'Parent-Teacher Meetings', 'School Website', 'Student Information', 'Student-Teacher Chat', 'Surveys & Feedback']
        },
        {
          title: 'Engagement & Creatives',
          icon: Image,
          link: '/engagement/creatives',
          core: false, count: 5,
          desc: 'Birthday cards, festival banners and stories published to the parent and sta...',
          connected: ['Communications']
        },
        {
          title: 'Surveys & Feedback',
          icon: CheckCircle2,
          link: '/messages',
          core: false, count: 5,
          desc: 'Build questionnaires for parents, students or staff and read the responses.',
          connected: ['Communications']
        },
        {
          title: 'Knowledge Base & Chatbot',
          icon: MessageSquare,
          link: '/help-center/ai-chatbot',
          core: false, count: 3,
          desc: 'A searchable help library for staff and parents, with a chatbot front end.',
          connected: ['Communications']
        },
        {
          title: 'Student-Teacher Chat',
          icon: MessageSquare,
          link: '/chat-moderation',
          core: false, count: 2,
          desc: 'Moderated messaging between teachers and parents or students.',
          connected: ['Communications', 'Student Information']
        }
      ]
    },
    {
      categoryId: 'Admin & Settings',
      categoryTitle: 'Admin & Settings',
      categoryDesc: 'Configuration, governance, reports and the platform tools behind the school.',
      categoryScreens: 34,
      theme: {
        bannerBg: 'bg-slate-200',
        cardBg: 'bg-slate-100', // light grey
        cardShadow: 'shadow-[0_4px_0_0_rgba(203,213,225,1)] border border-slate-300 flex-1', // shadow-slate-300
        iconBg: 'bg-slate-700',
        textDark: 'text-slate-900',
        textLight: 'text-slate-600',
        isLightBanner: true, // Custom flag to turn banner text dark
      },
      items: [
        {
          title: 'Compliance & Governance',
          icon: Shield,
          link: '/compliance/dashboard',
          core: false, count: 12,
          desc: 'Statutory document vault, readiness scoring and validation of government...',
          connected: ['Academics', 'Human Resource', 'Student Information']
        },
        {
          title: 'School Website',
          icon: Globe, // Adding Globe to lucide-react imports if not present, wait it's not imported let me just use MapPin or Layers or Shield or Monitor. Let's use Book. Let's add Monitor icon if possible. We'll use Laptop. Actually I need to add Globe import if possible (will do). Let's use Layers for now to avoid breaking.
          link: '/school-settings',
          core: false, count: 10,
          desc: 'The school\'s public website — pages, notices, galleries, disclosure and online...',
          connected: ['Communications', 'Lead Management']
        },
        {
          title: 'System & Settings',
          icon: Settings,
          link: '/settings/school-settings',
          core: false, count: 10,
          desc: 'School configuration, roles, backups, audit trail and the tools that keep the...',
          connected: []
        },
        {
          title: 'Apps Center',
          icon: Layers,
          link: '/apps-center',
          core: false, count: 1,
          desc: 'Small built-in utilities — whiteboard, converters and other day-to-day tools.',
          connected: []
        },
        {
          title: 'Reports & Analytics',
          icon: FileText,
          link: '/reports',
          core: false, count: 1,
          desc: 'Cross-module reporting — every register, ledger and summary the scho...',
          connected: []
        }
      ]
    }
  ];

  // Mind map nodes connection simulating logic
  const hubData = {
    'Student Information': {
      icon: Users,
      totalLinks: 17,
      spokes: [
        { name: 'Transport', color: 'border-teal-500 text-teal-700', x: 40, y: 15, link: '/transport/dashboard' },
        { name: 'Academics', color: 'border-purple-500 text-purple-700', x: 60, y: 15, link: '/academics/dashboard' },
        { name: 'Biometric Attendance', color: 'border-teal-700 text-teal-800', x: 75, y: 25, link: '/biometric/all-devices' },
        { name: 'Certificates & Documents', color: 'border-blue-600 text-blue-800', x: 80, y: 35, link: '/certificates/documents' },
        { name: 'Student Health Records', color: 'border-blue-500 text-blue-700', x: 20, y: 35, link: '/students/health' },
        { name: 'Student-Teacher Chat', color: 'border-pink-500 text-pink-700', x: 35, y: 30, link: '/messages' },
        { name: 'Communications', color: 'border-pink-500 text-pink-700', x: 75, y: 50, link: '/communicate/notice-board' },
        { name: 'QR Code Attendance', color: 'border-teal-600 text-teal-700', x: 25, y: 55, link: '/qr-attendance/attendance' },
        { name: 'Compliance & Governance', color: 'border-slate-500 text-slate-700', x: 85, y: 65, link: '/compliance/overview' },
        { name: 'Offline Examinations', color: 'border-purple-500 text-purple-700', x: 20, y: 70, link: '/offline-exams/dashboard' },
        { name: 'Library Management', color: 'border-teal-500 text-teal-700', x: 35, y: 75, link: '/library/dashboard' },
        { name: 'Fees Collection', color: 'border-emerald-500 text-emerald-700', x: 75, y: 75, link: '/finance/dashboard' },
        { name: 'Homework', color: 'border-purple-500 text-purple-700', x: 65, y: 85, link: '/study-center/homework-assignments' },
        { name: 'Front Office', color: 'border-teal-500 text-teal-700', x: 80, y: 85, link: '/front-office/dashboard' },
        { name: 'ID Cards', color: 'border-blue-500 text-blue-700', x: 45, y: 88, link: '/id-cards/student' },
        { name: 'Lead Management', color: 'border-blue-500 text-blue-700', x: 35, y: 92, link: '/leads/dashboard' },
        { name: 'Hostel', color: 'border-teal-500 text-teal-700', x: 60, y: 98, link: '/hostel/dashboard' },
      ],
      openLink: '/students/dashboard'
    },
    'Academics': {
      icon: Book,
      totalLinks: 9,
      spokes: [
        { name: 'Student Information', color: 'border-indigo-500 text-indigo-700', x: 30, y: 20, link: '/students/dashboard' },
        { name: 'Offline Examinations', color: 'border-purple-500 text-purple-700', x: 70, y: 25, link: '/offline-exams/dashboard' },
        { name: 'Compliance', color: 'border-slate-500 text-slate-700', x: 85, y: 50, link: '/compliance/overview' },
        { name: 'Study Center', color: 'border-emerald-500 text-emerald-700', x: 20, y: 60, link: '/study-center/dashboard' },
        { name: 'Live Classes', color: 'border-red-500 text-red-700', x: 40, y: 80, link: '/live-classes/manage' },
        { name: 'Library', color: 'border-teal-500 text-teal-700', x: 80, y: 75, link: '/library/dashboard' },
        { name: 'CBC Academics', color: 'border-orange-500 text-orange-700', x: 60, y: 90, link: '/cbc-academics/dashboard' },
        { name: 'Human Resource', color: 'border-blue-500 text-blue-700', x: 25, y: 85, link: '/hr/dashboard' },
        { name: 'Timetable', color: 'border-indigo-500 text-indigo-700', x: 50, y: 15, link: '/academics/timetable' },
      ],
      openLink: '/academics/dashboard'
    },
    'Fees Collection': {
      icon: Receipt,
      totalLinks: 6,
      spokes: [
        { name: 'Student Information', color: 'border-indigo-500 text-indigo-700', x: 40, y: 20, link: '/students/dashboard' },
        { name: 'Transport (Bus Fees)', color: 'border-teal-500 text-teal-700', x: 70, y: 30, link: '/transport/dashboard' },
        { name: 'Hostel Fees', color: 'border-emerald-500 text-emerald-700', x: 25, y: 50, link: '/hostel/dashboard' },
        { name: 'Accounts Logging', color: 'border-blue-500 text-blue-700', x: 80, y: 60, link: '/accounts/dashboard' },
        { name: 'Online Gateway', color: 'border-purple-500 text-purple-700', x: 35, y: 80, link: '/settings/payment-gateway' },
        { name: 'Reports', color: 'border-slate-500 text-slate-700', x: 65, y: 85, link: '/reports' },
      ],
      openLink: '/finance/dashboard'
    },
    'Offline Examinations': {
      icon: GraduationCap,
      totalLinks: 7,
      spokes: [
        { name: 'Academics', color: 'border-purple-500 text-purple-700', x: 30, y: 25, link: '/academics/dashboard' },
        { name: 'Student Info', color: 'border-indigo-500 text-indigo-700', x: 70, y: 35, link: '/students/dashboard' },
        { name: 'Fees (Admit Cards)', color: 'border-emerald-500 text-emerald-700', x: 80, y: 65, link: '/finance/dashboard' },
        { name: 'Teachers (Grading)', color: 'border-blue-500 text-blue-700', x: 25, y: 60, link: '/hr/dashboard' },
        { name: 'CBC Modules', color: 'border-orange-500 text-orange-700', x: 50, y: 85, link: '/cbc-academics/dashboard' },
        { name: 'Marksheet Gen.', color: 'border-teal-500 text-teal-700', x: 25, y: 85, link: '/offline-exams/generate-marksheet' },
        { name: 'Parent View', color: 'border-slate-500 text-slate-700', x: 75, y: 85, link: '/students/parents' },
      ],
      openLink: '/offline-exams/dashboard'
    },
    'Human Resource': {
      icon: UserCog,
      totalLinks: 8,
      spokes: [
        { name: 'Biometric Devices', color: 'border-teal-500 text-teal-700', x: 35, y: 20, link: '/biometric/all-devices' },
        { name: 'Academics (Teachers)', color: 'border-purple-500 text-purple-700', x: 70, y: 30, link: '/academics/dashboard' },
        { name: 'Accounts (Payroll)', color: 'border-emerald-500 text-emerald-700', x: 25, y: 55, link: '/accounts/dashboard' },
        { name: 'Leave & Attendance', color: 'border-blue-500 text-blue-700', x: 85, y: 60, link: '/hr/staff-attendance' },
        { name: 'Front Office (Gate)', color: 'border-orange-500 text-orange-700', x: 30, y: 80, link: '/front-office/dashboard' },
        { name: 'Transport (Drivers)', color: 'border-teal-500 text-teal-700', x: 70, y: 85, link: '/transport/dashboard' },
        { name: 'Hostel (Wardens)', color: 'border-indigo-500 text-indigo-700', x: 15, y: 70, link: '/hostel/dashboard' },
        { name: 'ID Cards', color: 'border-red-500 text-red-700', x: 50, y: 15, link: '/id-cards/staff' },
      ],
      openLink: '/hr/dashboard'
    }
  };

  const currentHub = hubData[activeHub];
  const ActiveIcon = currentHub.icon;

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-800 font-sans">
      
      {/* Top Banner Section */}
      <div className="px-6 py-8 md:px-10 max-w-[1700px] mx-auto w-full">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Explore Your School ERP</h1>
        <p className="text-[13px] text-slate-500 max-w-3xl mb-8">
          Everything Yug International runs on, grouped the way the school actually works. This is your own view — it lists only what your role can open.
        </p>

        {/* 1. Stats */}
        <div className="flex flex-wrap gap-4 mb-8">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className={`flex items-center gap-4 px-5 py-4 border border-slate-200 rounded-none bg-white min-w-[200px]`}>
                <div className={`w-10 h-10 ${s.bg} rounded-none flex items-center justify-center shrink-0`}>
                  <Icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 leading-none mb-1">{s.value}</h3>
                  <p className="text-[12px] text-slate-500 font-medium">{s.label}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* 2. School Journey Slider */}
        <div className="mb-10 p-5 rounded-none border border-slate-200 bg-white shadow-sm">
          <div className="flex justify-between items-center mb-5">
             <h3 className="text-[13px] font-bold text-slate-800 flex items-center gap-2">
                <div className="text-indigo-600 rotate-90 transform"><LinkIcon className="w-4 h-4" /></div> School journey <span className="font-normal text-slate-400">recommended order — do them in any order you like</span>
             </h3>
             <div className="text-[12px] font-bold text-slate-800 flex items-center gap-3">
                <div className="w-32 h-2 bg-slate-100 rounded-none overflow-hidden flex items-center">
                    <div className="h-full bg-emerald-600 w-[100%] rounded-none"></div>
                </div> 
                11/11
             </div>
          </div>
          <div className="relative">
            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
              <style dangerouslySetInnerHTML={{__html: `.scrollbar-hide::-webkit-scrollbar { display: none; }`}} />
              {journeys.map((j, i) => (
                <div 
                  key={i} 
                  onClick={() => j.link ? navigate(j.link) : null}
                  className="snap-start flex items-start gap-3 shrink-0 w-[270px] bg-[#f0fdf4] p-3 rounded-none border border-emerald-100/60 cursor-pointer hover:bg-[#dcfce7] transition-colors"
                >
                    <div className="w-6 h-6 rounded-none bg-teal-700 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4"/>
                    </div>
                    <div>
                      <h4 className="text-[13px] font-bold text-teal-900 leading-tight mb-1">{j.title}</h4>
                      <p className="text-[11px] text-teal-700/80 leading-tight">{j.sub}</p>
                    </div>
                </div>
              ))}
            </div>
            
            {/* Custom light scrollbar track indicator */}
            <div className="w-full h-1.5 bg-slate-100 rounded-none mt-2 relative">
               <div className="absolute left-0 top-0 h-full w-1/4 bg-slate-400 rounded-none"></div>
            </div>
          </div>
        </div>

        {/* 3. I AM A... */}
        <div className="mb-8">
           <h3 className="text-[12px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4">
             <UserPlus className="w-4 h-4 opacity-70" /> I AM A...
           </h3>
           <div className="flex flex-wrap gap-2.5">
             {allRoles.map((r, i) => {
               const isActive = activeRole === r;
               return (
                <button 
                  key={i} 
                  onClick={() => {
                    setActiveRole(r);
                  }}
                  className={`rounded-none text-[13px] font-bold border transition-colors flex items-center gap-2 ${
                    isActive 
                      ? 'py-1.5 px-4 bg-[#5b3ee8] text-white border-[#5b3ee8] shadow-sm' 
                      : 'py-1.5 px-4 bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-[0_1px_2px_rgba(0,0,0,0.02)]'
                  }`}
                >
                  <UserPlus className={`w-3.5 h-3.5 ${isActive ? 'text-white/90' : 'text-slate-400'}`}/>
                  {r}
                  {isActive && <span className="bg-white/20 text-white px-2 py-0.5 rounded-none text-[9px] uppercase tracking-wider ml-1 border border-white/10">YOU</span>}
                </button>
               )
             })}
           </div>
        </div>

        {/* 4. What can I do... */}
        <div className="mb-14">
           <h3 className="text-[12px] font-bold text-indigo-700 uppercase tracking-widest flex items-center gap-2 mb-4">
             <span className="text-orange-500 text-lg leading-none">⚡</span> WHAT CAN I DO? <span className="font-normal text-slate-400 normal-case tracking-normal">{taskIcons.filter(t => t.n.toLowerCase().includes(searchQuery.toLowerCase())).length} tasks you can start right now</span>
           </h3>
           <div className="flex flex-wrap gap-2.5">
             {taskIcons.filter(t => t.n.toLowerCase().includes(searchQuery.toLowerCase())).map((t, i) => {
               const Icon = t.i;
               return (
                 <button 
                   key={i} 
                   onClick={() => t.link ? navigate(t.link) : null}
                   className="flex items-center gap-2 px-4 py-2.5 rounded-none text-[12px] font-bold bg-white border border-indigo-100 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-300 transition-colors shadow-sm"
                 >
                   <Icon className="w-4 h-4 text-indigo-600" />
                   {t.n}
                 </button>
               )
             })}
           </div>
        </div>

        {/* 5. How everything connects */}
        <div className="mb-16 border rounded-none border-slate-200 bg-slate-50/50 p-6 overflow-hidden">
          <div className="flex justify-between items-start mb-6 border-b border-slate-200 pb-4">
             <div>
               <h3 className="text-[13px] font-bold text-slate-800 flex items-center gap-2 mb-1">
                 <LinkIcon className="w-4 h-4 text-indigo-500" /> How everything connects
               </h3>
               <p className="text-[11px] text-slate-500">53 links between the modules Yug International runs. Pick a hub, then click a spoke to follow it.</p>
             </div>
             <button 
               onClick={() => navigate(currentHub.openLink)}
               className="flex items-center gap-2 text-[11px] font-bold bg-white border border-slate-200 px-3 py-1.5 rounded-none text-slate-700 hover:bg-slate-50 transition-colors"
             >
               <ActiveIcon className="w-3.5 h-3.5" /> Open {activeHub}
             </button>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {Object.keys(hubData).map((hubName) => {
               const HubIcon = hubData[hubName].icon;
               const isActive = activeHub === hubName;
               return (
                 <button 
                   key={hubName}
                   onClick={() => setActiveHub(hubName)}
                   className={`text-[11px] font-bold px-4 py-1.5 rounded-none flex items-center gap-1.5 transition-colors ${
                     isActive 
                       ? 'bg-indigo-600 text-white shadow-sm' 
                       : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                   }`}
                 >
                   <HubIcon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-200' : 'text-slate-400'}`}/> 
                   {hubName}
                 </button>
               )
            })}
          </div>

          <div className="relative w-full h-[400px] border border-slate-200 bg-white rounded-none shadow-inner overflow-hidden">
            {/* Mind Map Canvas Mock */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
              {currentHub.spokes.map((n, i) => (
                <line key={i} x1="50" y1="50" x2={n.x} y2={n.y} stroke="#6366f1" strokeWidth="0.2" />
              ))}
            </svg>
            
            {/* Center Node */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white w-32 h-32 rounded-none flex flex-col items-center justify-center shadow-xl ring-8 ring-indigo-50 z-10 transition-all">
              <span className="font-bold text-[13px] text-center leading-tight px-2">{activeHub}</span>
              <span className="text-[10px] text-indigo-200 mt-1">{currentHub.totalLinks} links</span>
            </div>

            {/* Satellite Nodes */}
            {currentHub.spokes.map((n, i) => (
              <div 
                key={i} 
                onClick={() => navigate(n.link)}
                className={`absolute bg-white px-3 py-1.5 rounded-none border-2 ${n.color} shadow-sm font-bold text-[11px] -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 hover:z-30 transition-all z-20 whitespace-nowrap`} 
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
              >
                {n.name}
              </div>
            ))}
          </div>
        </div>

        {/* Sticky Search and Filter Bar */}
        <div className="sticky top-0 bg-[#f8fafc]/95 backdrop-blur-md z-40 pt-4 pb-4 border-b border-slate-200/80 mb-8 mx-[-24px] px-6 md:mx-[-40px] md:px-10 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)]">
          <div className="relative mb-4 max-w-full">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-none text-[13px] font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all shadow-[0_2px_10px_-5px_rgba(0,0,0,0.05)] text-slate-800"
              placeholder='Search 237 screens — try "promotion", "receipt", "timetable"...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold text-slate-400 border border-slate-200 rounded">
                /
              </kbd>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {filterCategories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-none text-[12px] font-bold whitespace-nowrap transition-all border ${
                  activeCategory === cat.name
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : `bg-white ${cat.textColor} border-slate-200 hover:bg-slate-50`
                }`}
              >
                {activeCategory !== cat.name && <Layers className="w-3 h-3 opacity-60" />}
                {cat.name} 
                <span className={`px-2 py-0.5 rounded-none text-[10px] ${
                  activeCategory === cat.name ? 'bg-indigo-500 text-white' : cat.color
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Category Grids */}
        <div className="space-y-16">
          {moduleData
            .filter(cat => activeCategory === 'All' || cat.categoryId === activeCategory)
            .map((category, idx) => {
              // Filter items within the category by search query
              const filteredItems = category.items.filter(item => 
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                item.desc.toLowerCase().includes(searchQuery.toLowerCase())
              );

              if (filteredItems.length === 0) return null;

              return (
            <div key={idx} className="flex flex-col gap-6">
              
              {/* Massive Category Banner */}
              <div className={`w-full rounded-none ${category.theme.bannerBg} px-6 py-5 flex justify-between items-center shadow-md ${category.theme.isLightBanner ? '' : 'text-white bg-gradient-to-r from-transparent to-black/10'}`}>
                 <div className="flex items-center gap-4">
                   <div className={`w-12 h-12 ${category.theme.isLightBanner ? 'bg-slate-700 text-white' : 'bg-white/20 text-white border border-white/20'} rounded-none flex items-center justify-center backdrop-blur-sm shrink-0`}>
                      <Users className="w-6 h-6" />
                   </div>
                   <div>
                     <h2 className={`text-xl font-bold flex items-center gap-2 mb-0.5 ${category.theme.isLightBanner ? 'text-slate-800' : 'text-white drop-shadow-sm'}`}>
                       {category.categoryTitle}
                     </h2>
                     <p className={`text-[12.5px] font-medium ${category.theme.isLightBanner ? 'text-slate-600' : 'text-white/90'}`}>
                       {category.categoryDesc}
                     </p>
                   </div>
                 </div>
                 <div className={`px-4 py-1.5 rounded-none text-[12px] font-bold shadow-sm whitespace-nowrap ${category.theme.isLightBanner ? 'bg-white text-slate-800' : 'bg-white text-slate-800'}`}>
                   {category.categoryScreens} screens
                 </div>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
                {filteredItems.map((item, itemIdx) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={itemIdx}
                      onClick={() => item.link ? navigate(item.link) : null}
                      className={`rounded-none p-5 cursor-pointer flex flex-col transition-all hover:-translate-y-1 ${category.theme.cardBg} ${category.theme.cardShadow} hover:shadow-md`}
                    >
                      {/* Card Header Row */}
                      <div className="flex items-start gap-4 mb-3">
                        <div className={`w-10 h-10 rounded-none flex items-center justify-center shrink-0 ${category.theme.iconBg} text-white shadow-inner`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1.5">
                             <h3 className={`text-[15px] font-bold leading-tight ${category.theme.textDark}`}>
                               {item.title}
                             </h3>
                             <ChevronRight className={`w-5 h-5 shrink-0 ${category.theme.textLight} opacity-50 block xl:hidden`} />
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            {item.core && <span className={`px-2 py-0.5 rounded-none text-[9px] font-extrabold bg-blue-600 text-white tracking-widest`}>CORE</span>}
                            <span className={`w-6 h-6 flex items-center justify-center rounded-none text-[11px] font-bold bg-white ${category.theme.textLight} shadow-sm border border-black/5`}>
                              {item.count}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className={`text-[12px] mb-4 leading-relaxed ${category.theme.textDark} opacity-90 min-h-[36px] line-clamp-3 font-medium`}>
                        {item.desc}
                      </p>

                      {/* Connections */}
                      <div className="mt-4 relative z-10 w-full pt-3">
                        <div className="flex items-center gap-1.5 mb-2">
                          <LinkIcon className={`w-3.5 h-3.5 ${category.theme.textLight}`} />
                          <span className={`text-[10px] font-extrabold uppercase tracking-widest ${category.theme.textLight}`}>Connected To</span>
                        </div>
                        <div className="bg-white/80 rounded-none p-2.5 border border-white/50 backdrop-blur-md flex flex-wrap gap-1.5 shadow-[0_2px_10px_-5px_rgba(0,0,0,0.1)]">
                          {item.connected.map((conn, cIdx) => (
                            <span key={cIdx} className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-none border border-slate-100 bg-white hover:bg-slate-50 transition-colors text-[10px] font-bold ${category.theme.textLight} shadow-sm whitespace-nowrap`}>
                              <Layers className="w-3 h-3 opacity-60" />
                              {conn}
                            </span>
                          ))}
                          {item.connected.length === 0 && (
                            <span className="text-[11px] text-slate-400 italic font-medium p-1">No dependencies.</span>
                          )}
                        </div>
                      </div>

                    </div>
                  )
                })}
              </div>

            </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default ErpNavigator;
