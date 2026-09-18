import React, { useState, useMemo } from "react";
import { 
  Search, 
  HelpCircle, 
  ArrowRight, 
  ArrowLeft, 
  Folder, 
  Calendar, 
  FileText, 
  BookOpen, 
  Settings, 
  Globe, 
  Edit3, 
  Package, 
  Tag, 
  Cpu, 
  MessageSquare, 
  Monitor, 
  Video, 
  DollarSign, 
  Building, 
  ListTodo, 
  Volume2, 
  FileQuestion, 
  Fingerprint, 
  Award, 
  Heart, 
  Grid, 
  Handshake, 
  BookOpenCheck, 
  PenTool,
  Clock,
  UserCheck,
  CheckSquare,
  Users,
  SearchIcon,
  ChevronRight,
  TrendingUp,
  XCircle,
  FileSpreadsheet
} from "lucide-react";

// Mock student database for generation filter matching Screenshot 4 dropdown options
const MOCK_STUDENTS = [
  { admNo: "SSHS-1024", name: "Aarav Sharma", class: "Class 5", section: "Section A", category: "General", gender: "Male", rollNo: "01", mobile: "+91 98765 43210" },
  { admNo: "SSHS-1025", name: "Diya Patel", class: "Class 5", section: "Section B", category: "OBC", gender: "Female", rollNo: "02", mobile: "+91 98765 43211" },
  { admNo: "SSHS-1026", name: "Kabir Singh", class: "Class 6", section: "Section A", category: "General", gender: "Male", rollNo: "01", mobile: "+91 98765 43212" },
  { admNo: "SSHS-1027", name: "Meera Nair", class: "Class 6", section: "Section A", category: "General", gender: "Female", rollNo: "02", mobile: "+91 98765 43213" },
  { admNo: "SSHS-1028", name: "Rohan Verma", class: "Class 5", section: "Section A", category: "SC", gender: "Male", rollNo: "03", mobile: "+91 98765 43214" },
  { admNo: "SSHS-1029", name: "Sneha Rao", class: "Class 6", section: "Section B", category: "General", gender: "Female", rollNo: "03", mobile: "+91 98765 43215" },
  { admNo: "SSHS-1030", name: "Amit Kujur", class: "Class 5", section: "Section B", category: "ST", gender: "Male", rollNo: "04", mobile: "+91 98765 43216" },
  { admNo: "SSHS-1031", name: "Tanvi Joshi", class: "Class 6", section: "Section A", category: "OBC", gender: "Female", rollNo: "04", mobile: "+91 98765 43217" }
];

// List of all report configurations matching Screenshots 1, 2, and 3
const REPORT_CARDS = [
  // Finance Category
  { id: "day_sheet", title: "Day Sheet", desc: "One day, one page: income, expenditure and every account balance.", category: "Finance", iconColor: "text-white bg-slate-900", icon: "📖" },
  { id: "daily_collection", title: "Daily Collection", desc: "View total daily fee collections with payment modes.", category: "Finance", iconColor: "text-white bg-emerald-500", icon: "📅" },
  { id: "fee_type_collection", title: "Fee Type Collection", desc: "Breakdown of collected fees by specific fee types.", category: "Finance", iconColor: "text-white bg-purple-650", icon: "🏷️" },
  { id: "class_wise_collection", title: "Class Wise Collection", desc: "Fee collection summaries grouped by classes.", category: "Finance", iconColor: "text-white bg-teal-500", icon: "💻" },
  { id: "fee_dues", title: "Fee Dues Report", desc: "Detailed list of pending fee dues for students.", category: "Finance", iconColor: "text-white bg-amber-500", icon: "📄" },
  { id: "defaulters_list", title: "Defaulters List", desc: "Identify students with long-standing pending dues.", category: "Finance", iconColor: "text-white bg-rose-500", icon: "👤" },
  { id: "student_ledger", title: "Student Ledger", desc: "Comprehensive fee transaction history for individual students.", category: "Finance", iconColor: "text-white bg-blue-500", icon: "📋" },
  { id: "income_report", title: "Income Report", desc: "Track all other sources of income and revenue.", category: "Finance", iconColor: "text-white bg-emerald-600", icon: "⬇️" },
  { id: "expense_report", title: "Expense Report", desc: "Track all school expenditures and financial outflows.", category: "Finance", iconColor: "text-white bg-red-600", icon: "⬆️" },
  { id: "income_vs_expense", title: "Income vs. Expense", desc: "Compare total income against total expenses over time.", category: "Finance", iconColor: "text-white bg-blue-650", icon: "⚖️" },
  { id: "payroll_report", title: "Payroll Report", desc: "View total salary disbursements and payroll records.", category: "Finance", iconColor: "text-white bg-indigo-650", icon: "📜" },
  { id: "monthly_summary", title: "Monthly Summary", desc: "A consolidated month-end financial overview.", category: "Finance", iconColor: "text-white bg-slate-850", icon: "🗓️" },
  { id: "cancelled_receipts", title: "Cancelled Receipts", desc: "Audit log of fee receipts that were subsequently cancelled.", category: "Finance", iconColor: "text-white bg-red-500", icon: "🗑️" },
  { id: "concession_report", title: "Concession Report", desc: "Head-wise list of fee discounts and concessions granted.", category: "Finance", iconColor: "text-white bg-emerald-500", icon: "％" },
  { id: "head_wise_fee", title: "Head-wise Fee Report", desc: "Macro snapshot of dues, concessions, and collection per fee head.", category: "Finance", iconColor: "text-white bg-purple-600", icon: "💰" },
  { id: "fees_analysis", title: "Fees Analysis", desc: "Dynamic excel-like report of student payments grouped by Month or Fee Heads.", category: "Finance", iconColor: "text-white bg-teal-500", icon: "📊" },
  
  // Academics Category
  { id: "exam_marks", title: "Exam Marks", desc: "Subject-wise marks and grades across different examinations.", category: "Academics", iconColor: "text-white bg-[#007bff]", icon: "✍️" },
  { id: "student_progress", title: "Student Progress", desc: "Track individual student performance across multiple terms.", category: "Academics", iconColor: "text-white bg-emerald-550", icon: "📈" },
  { id: "class_performance", title: "Class Performance", desc: "Aggregate performance and statistics for an entire class.", category: "Academics", iconColor: "text-white bg-[#28a745]", icon: "🏅" },
  { id: "consolidated_performance", title: "Consolidated Performance", desc: "School-wide academic standing and comparative analytics.", category: "Academics", iconColor: "text-white bg-purple-500", icon: "📚" },
  { id: "cbc_assessment", title: "CBC Assessment Report", desc: "Generate and download Competency Based Curriculum (CBC) reports.", category: "Academics", iconColor: "text-white bg-emerald-650", icon: "🎖️" },

  // Student Info Category
  { id: "student_list", title: "Student List Report", desc: "Comprehensive list of students with advanced filtering.", category: "Student Info", iconColor: "text-white bg-teal-550", icon: "👥" },
  { id: "attendance_percentage", title: "Attendance Percentage", desc: "Monthly attendance percentage per student.", category: "Student Info", iconColor: "text-white bg-indigo-500", icon: "📊" },
  { id: "admission_report", title: "Admission Report", desc: "Track new student enrollments over any period.", category: "Student Info", iconColor: "text-white bg-blue-600", icon: "👤" }
];

export default function ReportsHub() {
  // Navigation: null = Main dashboard; "student_list" = Student List filter sub-page
  const [selectedReportId, setSelectedReportId] = useState(null);

  // Search input state
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  // Dropdown filter variables for Student List Report (Screenshot 4)
  const [selectedClass, setSelectedClass] = useState("All Classes");
  const [selectedSection, setSelectedSection] = useState("All Sections");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedGender, setSelectedGender] = useState("All Genders");

  // Generated results list state
  const [filteredResults, setFilteredResults] = useState([]);
  const [hasGenerated, setHasGenerated] = useState(false);

  // Counts block metrics for tabs
  const tabCounts = useMemo(() => {
    const counts = {
      All: REPORT_CARDS.length,
      Finance: REPORT_CARDS.filter(r => r.category === "Finance").length,
      Academics: REPORT_CARDS.filter(r => r.category === "Academics").length,
      "Student Info": REPORT_CARDS.filter(r => r.category === "Student Info").length,
      HR: 5,
      Attendance: 4,
      "Module Reports": 5,
      "System Logs": 2
    };
    return counts;
  }, []);

  // Filter dashboard cards by tab & search query
  const displayedCards = useMemo(() => {
    return REPORT_CARDS.filter(item => {
      const matchTab = activeTab === "All" || item.category === activeTab;
      const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchTab && matchSearch;
    });
  }, [activeTab, searchQuery]);

  // Click handler to open report
  const handleOpenReport = (id) => {
    if (id === "student_list") {
      setSelectedReportId("student_list");
      setHasGenerated(false);
      setFilteredResults([]);
      // Reset filter selectors
      setSelectedClass("All Classes");
      setSelectedSection("All Sections");
      setSelectedCategory("All Categories");
      setSelectedGender("All Genders");
    } else {
      alert(`Report "${id}" is opening in a new spreadsheet workbook...`);
    }
  };

  // Generate button action: filter student records (Screenshot 4)
  const handleGenerateReport = (e) => {
    e.preventDefault();
    
    // Filter logic
    const results = MOCK_STUDENTS.filter(student => {
      const matchClass = selectedClass === "All Classes" || student.class === selectedClass;
      const matchSection = selectedSection === "All Sections" || student.section === selectedSection;
      const matchCategory = selectedCategory === "All Categories" || student.category === selectedCategory;
      const matchGender = selectedGender === "All Genders" || student.gender === selectedGender;
      return matchClass && matchSection && matchCategory && matchGender;
    });

    setFilteredResults(results);
    setHasGenerated(true);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-5 font-sans text-gray-800">
      
      {/* 1. REPORTS HUB MAIN VIEW */}
      {selectedReportId === null && (
        <div className="space-y-5 animate-in fade-in duration-200">
          
          {/* Header Row */}
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Reports Hub</h1>
            <p className="text-slate-500 text-sm">Finance, academics, attendance & more — all reports in one place</p>
          </div>

          {/* Search bar & filter pills row */}
          <div className="flex flex-col md:flex-row gap-3 items-center">
            
            {/* Search Input box */}
            <div className="relative flex items-center bg-white w-full md:w-64 flex-shrink-0">
              <input 
                type="text" 
                placeholder="Search reports..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 border border-gray-300 rounded-none text-xs font-semibold focus:outline-none focus:border-indigo-650 w-full"
              />
              <Search className="absolute left-2.5 w-3.5 h-3.5 text-slate-400" />
            </div>

            {/* Filter pills list */}
            <div className="flex flex-wrap gap-2 items-center overflow-x-auto w-full pb-1">
              {Object.keys(tabCounts).map((tabName) => {
                const isActive = activeTab === tabName;
                const count = tabCounts[tabName];
                
                return (
                  <button
                    key={tabName}
                    onClick={() => setActiveTab(tabName)}
                    className={`px-3 py-1.5 font-bold text-xs rounded-none cursor-pointer transition-all border whitespace-nowrap flex items-center gap-1.5 select-none ${
                      isActive 
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-3xs" 
                        : "bg-white text-slate-550 border-slate-200/90 hover:bg-slate-50"
                    }`}
                  >
                    <span>{tabName}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-none font-bold ${
                      isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-400"
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Dashboard cards grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {displayedCards.map((report) => (
              <div 
                key={report.id}
                className="bg-white border border-slate-200 rounded-none flex flex-col justify-between shadow-3xs overflow-hidden transition-all hover:shadow-2xs"
              >
                {/* Details top block */}
                <div className="p-5 flex flex-col items-center justify-center text-center space-y-3.5 flex-grow">
                  
                  {/* Large Icon box */}
                  <div className={`w-14 h-14 rounded-none flex items-center justify-center text-xl font-bold shadow-2xs ${report.iconColor}`}>
                    {report.icon}
                  </div>

                  {/* Title & description */}
                  <div>
                    <h3 className="font-extrabold text-xs text-slate-800 leading-tight">{report.title}</h3>
                    <p className="text-[10px] text-slate-400 font-semibold leading-relaxed mt-2 max-w-[180px] mx-auto">
                      {report.desc}
                    </p>
                  </div>

                  {/* Folder label badge */}
                  <div className="bg-indigo-50/50 text-indigo-650 border border-indigo-100/50 px-2 py-0.5 rounded-none text-[9px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <Folder className="w-2.5 h-2.5 text-indigo-500" />
                    {report.category}
                  </div>

                </div>

                {/* Open Button link */}
                <button
                  onClick={() => handleOpenReport(report.id)}
                  className="py-2.5 border-t border-slate-100 text-indigo-650 hover:bg-indigo-50/20 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer select-none active:bg-indigo-50/30"
                >
                  Open Report
                  <ArrowRight className="w-3.5 h-3.5 text-indigo-500" />
                </button>

              </div>
            ))}
          </div>

        </div>
      )}

      {/* 2. SPECIFIC REPORT: STUDENT LIST FILTER VIEW (Screenshot 4) */}
      {selectedReportId === "student_list" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          
          {/* Quick links purple bar at top */}
          <div className="bg-indigo-600 text-white rounded-none p-2 px-4 flex justify-between items-center shadow-md">
            <div className="flex items-center gap-2">
              <Grid className="w-4.5 h-4.5 text-white/90" />
              <span className="text-xs font-bold uppercase tracking-wider">Quick Report Links</span>
              <span className="bg-white text-indigo-650 px-2 py-0.5 rounded-none text-[10px] font-extrabold ml-1">
                43 Reports
              </span>
            </div>
            
            <button 
              onClick={() => setSelectedReportId(null)}
              className="text-white hover:text-indigo-200 transition-colors font-bold text-xs flex items-center gap-1 cursor-pointer bg-white/10 hover:bg-white/20 p-1.5 px-3 rounded"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Dashboard
            </button>
          </div>

          {/* Title banner */}
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Student List Report</h1>
          </div>

          {/* Filter Card Panel (Orange top border) */}
          <div className="bg-white border-t-2 border-t-orange-500 border border-slate-200 rounded-none p-5 shadow-3xs">
            
            <div className="border-b pb-2.5 mb-4">
              <h2 className="font-bold text-slate-800 text-sm">Filter Records</h2>
            </div>

            <form onSubmit={handleGenerateReport} className="space-y-4">
              
              {/* Dropdowns fields grid matching Screenshot 4 */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                
                {/* Class select dropdown */}
                <div className="space-y-1">
                  <label className="text-[11px] font-extrabold text-slate-700 block">Class</label>
                  <div className="relative flex items-center bg-white">
                    <select 
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-none text-xs text-slate-800 font-semibold focus:outline-none focus:border-orange-500 bg-white appearance-none cursor-pointer"
                    >
                      <option value="All Classes">All Classes</option>
                      <option value="Class 5">Class 5</option>
                      <option value="Class 6">Class 6</option>
                      <option value="Nursery">Nursery</option>
                      <option value="LKG">LKG</option>
                      <option value="UKG">UKG</option>
                    </select>
                    <ChevronRight className="absolute right-3 w-4 h-4 text-slate-400 rotate-90 pointer-events-none" />
                  </div>
                </div>

                {/* Section select dropdown */}
                <div className="space-y-1">
                  <label className="text-[11px] font-extrabold text-slate-700 block">Section</label>
                  <div className="relative flex items-center bg-white">
                    <select 
                      value={selectedSection}
                      onChange={(e) => setSelectedSection(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-none text-xs text-slate-800 font-semibold focus:outline-none focus:border-orange-500 bg-white appearance-none cursor-pointer"
                    >
                      <option value="All Sections">All Sections</option>
                      <option value="Section A">Section A</option>
                      <option value="Section B">Section B</option>
                      <option value="Section C">Section C</option>
                    </select>
                    <ChevronRight className="absolute right-3 w-4 h-4 text-slate-400 rotate-90 pointer-events-none" />
                  </div>
                </div>

                {/* Category select dropdown */}
                <div className="space-y-1">
                  <label className="text-[11px] font-extrabold text-slate-700 block">Category</label>
                  <div className="relative flex items-center bg-white">
                    <select 
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-none text-xs text-slate-800 font-semibold focus:outline-none focus:border-orange-500 bg-white appearance-none cursor-pointer"
                    >
                      <option value="All Categories">All Categories</option>
                      <option value="General">General</option>
                      <option value="OBC">OBC</option>
                      <option value="SC">SC</option>
                      <option value="ST">ST</option>
                    </select>
                    <ChevronRight className="absolute right-3 w-4 h-4 text-slate-400 rotate-90 pointer-events-none" />
                  </div>
                </div>

                {/* Gender select dropdown */}
                <div className="space-y-1">
                  <label className="text-[11px] font-extrabold text-slate-700 block">Gender</label>
                  <div className="relative flex items-center bg-white">
                    <select 
                      value={selectedGender}
                      onChange={(e) => setSelectedGender(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-none text-xs text-slate-800 font-semibold focus:outline-none focus:border-orange-500 bg-white appearance-none cursor-pointer"
                    >
                      <option value="All Genders">All Genders</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <ChevronRight className="absolute right-3 w-4 h-4 text-slate-400 rotate-90 pointer-events-none" />
                  </div>
                </div>

              </div>

              {/* Submit button */}
              <button 
                type="submit"
                className="px-5 py-2.5 bg-orange-500 text-white font-bold text-xs rounded-none shadow-sm hover:bg-orange-650 transition-all flex items-center gap-1.5 cursor-pointer mt-4 active:scale-95 border-none"
              >
                <TrendingUp className="w-3.5 h-3.5" />
                Generate
              </button>

            </form>

          </div>

          {/* Generated Table Output block */}
          {hasGenerated && (
            <div className="bg-white border border-slate-200 rounded-none overflow-hidden shadow-3xs animate-in slide-in-from-top-4 duration-300">
              
              <div className="px-5 py-4 border-b flex justify-between items-center bg-slate-50/30">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-[#ff5c0a]" />
                  <h2 className="font-bold text-slate-800 text-sm">Report Output</h2>
                </div>
                <span className="text-[11px] bg-orange-50 text-orange-500 border border-orange-100 px-2 py-0.5 rounded-none font-bold uppercase tracking-wider">
                  {filteredResults.length} Records found
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-200 text-[10px] font-bold text-orange-500 uppercase tracking-wider">
                      <th className="py-3 px-5 border-r border-slate-200 text-center w-12 font-bold">#</th>
                      <th className="py-3 px-5 border-r border-slate-200">Admission No.</th>
                      <th className="py-3 px-5 border-r border-slate-200">Roll No.</th>
                      <th className="py-3 px-5 border-r border-slate-200">Student Name</th>
                      <th className="py-3 px-5 border-r border-slate-200">Class & Section</th>
                      <th className="py-3 px-5 border-r border-slate-200">Category</th>
                      <th className="py-3 px-5 border-r border-slate-200">Gender</th>
                      <th className="py-3 px-5">Mobile Number</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs text-slate-650 font-semibold">
                    {filteredResults.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="py-8 text-center text-slate-400 font-medium">
                          No student records match the selected filter criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredResults.map((std, idx) => (
                        <tr key={std.admNo} className="hover:bg-slate-50/30 transition-colors">
                          <td className="py-3 px-5 text-center text-slate-400 border-r border-slate-100 font-bold">{idx + 1}</td>
                          <td className="py-3 px-5 border-r border-slate-100 font-bold text-slate-800">{std.admNo}</td>
                          <td className="py-3 px-5 border-r border-slate-100 text-slate-500 font-mono">{std.rollNo}</td>
                          <td className="py-3 px-5 border-r border-slate-100 font-bold text-slate-800">{std.name}</td>
                          <td className="py-3 px-5 border-r border-slate-100">
                            <span className="inline-block bg-slate-100 px-2 py-0.5 rounded-none text-[10px] font-bold text-slate-600 border">
                              {std.class} - {std.section.replace("Section ", "")}
                            </span>
                          </td>
                          <td className="py-3 px-5 border-r border-slate-100">
                            <span className="inline-block bg-indigo-50 text-indigo-650 border border-indigo-100 px-2 py-0.5 rounded-none text-[10px] font-bold">
                              {std.category}
                            </span>
                          </td>
                          <td className="py-3 px-5 border-r border-slate-100">
                            <span className={`inline-block px-2 py-0.5 rounded-none text-[10px] font-bold border ${
                              std.gender === "Male" ? "bg-blue-50 text-blue-650 border-blue-100" : "bg-rose-50 text-rose-650 border-rose-100"
                            }`}>
                              {std.gender}
                            </span>
                          </td>
                          <td className="py-3 px-5 font-mono">{std.mobile}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
