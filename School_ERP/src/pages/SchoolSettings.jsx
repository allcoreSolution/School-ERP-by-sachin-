import React, { useState, useEffect } from "react";
import { 
  Building, 
  Sliders, 
  Clock, 
  Shield, 
  Plug, 
  Share2, 
  Send, 
  Bell, 
  BookOpen, 
  Info, 
  Paintbrush, 
  Save, 
  Check, 
  ChevronDown,
  LayoutGrid,
  FileText,
  FileSpreadsheet,
  MapPin,
  Fingerprint,
  UserCheck,
  AlertTriangle,
  Lock,
  Eye,
  EyeOff,
  RefreshCw,
  ArrowLeft,
  Search,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Plus,
  MessageSquare,
  Sparkles,
  Edit2
} from "lucide-react";

// Dashboard Theme Options Array
const dashboardThemes = [
  { id: "legacy", name: "Classic Dashboard (Legacy)", visualClass: "classic" },
  { id: "v2-clean", name: "Action V2 (Clean)", visualClass: "clean" },
  { id: "v2-colorful", name: "Action V2 (Colorful)", visualClass: "colorful" },
  { id: "v3-auto", name: "Action V3 (Smart Auto-Arrange) 🌟", visualClass: "smart" },
  { id: "macos", name: "Mac OS Style (Informative & Active) 🍎", visualClass: "macos" },
  { id: "futuristic", name: "Futuristic Command Center (Extreme Data) 🚀", visualClass: "futuristic" },
  { id: "analytics", name: "Analytics Pro (Light & Colorful) 📊", visualClass: "analytics" },
  { id: "executive", name: "Executive Pro (All-in-One Premium) ✦", visualClass: "executive" },
  { id: "executive-x", name: "Executive Pro X (All-in-One Command Suite) ✦✦", visualClass: "executive-x" },
  { id: "warm", name: "Command Center (Warm ERP) 🟠", visualClass: "warm" }
];

export default function SchoolSettings() {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState("profile"); // Default to profile
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("School settings saved and updated successfully!");

  // --- Profile Form states ---
  const [schoolName, setSchoolName] = useState("YUG-SCHOOL");
  const [shortName, setShortName] = useState("YUG-SCHOOL");
  const [email, setEmail] = useState("contact@projectworlds.com");
  const [phone, setPhone] = useState("+91623056779");
  const [principalName, setPrincipalName] = useState("Yug Verma");
  const [country, setCountry] = useState("India (+91)");
  const [address, setAddress] = useState("Marine Drive Road , Raipur (Chhattisgarh)");
  const [schoolLogo, setSchoolLogo] = useState("https://multischoolv2.projectworlds.com/storage/logos/OTBpQVROwAnRW22dbZmBk3IGQbtQtvg1r4S3v08o.png");
  const [favicon, setFavicon] = useState("https://multischoolv2.projectworlds.com/storage/favicons/nDKPaL5d1xhzaZtV4TFgmGgKq2QrigwWwphXUrYw.png");

  // --- System & Formats Form states ---
  const [schoolCode, setSchoolCode] = useState("YIS");
  const [affiliatedBy, setAffiliatedBy] = useState("C.B.S.E");
  const [selectedTheme, setSelectedTheme] = useState("warm");
  const [currency, setCurrency] = useState("Indian Rupee (₹)");
  const [receiptTemplate, setReceiptTemplate] = useState("Pro | Standard Corporate Fee Receipt (A4 Portrait)");
  const [mobileReceiptTemplate, setMobileReceiptTemplate] = useState("Default Fee Receipt (Auto-Generated)");
  
  // Tax Settings
  const [taxLabel, setTaxLabel] = useState("GST");
  const [taxIdLabel, setTaxIdLabel] = useState("GSTIN");

  // Fee Receipt Numbering Setup
  const [feePrefix, setFeePrefix] = useState("SSHS");
  const [feeSeparator, setFeeSeparator] = useState("-");
  const [feePadding, setFeePadding] = useState("4");
  const [feeIncludeSession, setFeeIncludeSession] = useState(true);
  const [feeSessionFormat, setFeeSessionFormat] = useState("Full (2026-2027)");
  const [feeIncludeDate, setFeeIncludeDate] = useState(true);
  const [feeDateFormat, setFeeDateFormat] = useState("APR26 (Month + Year)");
  const [feeNextNumber, setFeeNextNumber] = useState(5);

  // Student Admission Numbering Setup
  const [admPrefix, setAdmPrefix] = useState("SSHSADM");
  const [admSeparator, setAdmSeparator] = useState("-");
  const [admPadding, setAdmPadding] = useState("4");
  const [admIncludeSession, setAdmIncludeSession] = useState(true);
  const [admSessionFormat, setAdmSessionFormat] = useState("Short (26-27)");
  const [admIncludeYear, setAdmIncludeYear] = useState(true);
  const [admDateFormat, setAdmDateFormat] = useState("2026 (Year Only)");
  const [admNextNumber, setAdmNextNumber] = useState(232324);

  // Roll Number Formatting Setup
  const [rollPrefix, setRollPrefix] = useState("ROLL");
  const [rollSeparator, setRollSeparator] = useState("-");
  const [rollPadding, setRollPadding] = useState("3");
  const [rollIncludeSession, setRollIncludeSession] = useState(true);
  const [rollSessionFormat, setRollSessionFormat] = useState("Short (26-27)");

  // --- Attendance Settings States ---
  const [geoRestricted, setGeoRestricted] = useState(false);
  const [latitude, setLatitude] = useState("21.20497330");
  const [longitude, setLongitude] = useState("81.62549160");
  const [radius, setRadius] = useState("1000");

  const [punchInStart, setPunchInStart] = useState("01:00");
  const [punchInEnd, setPunchInEnd] = useState("21:00");
  const [punchOutStart, setPunchOutStart] = useState("01:00");
  const [punchOutEnd, setPunchOutEnd] = useState("21:00");

  const [punchDirectionMode, setPunchDirectionMode] = useState("Automatic (recommended) — first punch = in, last = out");
  const [bioPunchInStart, setBioPunchInStart] = useState("01:00");
  const [bioPunchInEnd, setBioPunchInEnd] = useState("17:00");
  const [bioPunchOutStart, setBioPunchOutStart] = useState("21:00");
  const [bioPunchOutEnd, setBioPunchOutEnd] = useState("12:00");

  const [schoolStartTime, setSchoolStartTime] = useState("15:00");
  const [gracePeriod, setGracePeriod] = useState("30");

  const [matchThreshold, setMatchThreshold] = useState("0.40 (default)");
  const [secondBestMargin, setSecondBestMargin] = useState("0.06 (default)");
  const [antiSpoof, setAntiSpoof] = useState("Hold for review (recommended)");

  // --- Security Settings States ---
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // --- Integrations Settings States ---
  const [apiKey, setApiKey] = useState("pw_api_8849bfa8a329d20c3a2f903820a1993ccb1192");
  const [showApiKey, setShowApiKey] = useState(false);

  // --- Telegram Bot Settings States ---
  const [telegramActive, setTelegramActive] = useState(true);
  const [botToken, setBotToken] = useState("12222");
  const [telegramChatId, setTelegramChatId] = useState("12222");

  // --- Notification Center Alert States ---
  const [notificationSearch, setNotificationSearch] = useState("");
  const [notifications, setNotifications] = useState([
    { id: 1, name: "Parent Fee Paid", desc: "Sent to parent when an online fee payment is successful.", status: "Active", email: false, sms: false, whatsapp: true, push: true, type: "billing", edit: false },
    { id: 2, name: "Exam Result", desc: "Sent when exam results are published.", status: "Active", email: false, sms: false, whatsapp: true, push: true, type: "academic", edit: true },
    { id: 3, name: "Behaviour Incident", desc: "Sent when a behaviour incident is assigned.", status: "Active", email: false, sms: false, whatsapp: true, push: true, type: "discipline", edit: true },
    { id: 4, name: "Student Leave Apply", desc: "Sent to staff/guardian when leave is applied.", status: "Active", email: false, sms: false, whatsapp: true, push: true, type: "leave", edit: false },
    { id: 5, name: "Online Admission Submit", desc: "Sent when online admission form is submitted.", status: "Active", email: false, sms: false, whatsapp: true, push: true, type: "admission", edit: true },
    { id: 6, name: "Fee Submission", desc: "Sent when fees are successfully paid.", status: "Active", email: false, sms: false, whatsapp: true, push: true, type: "billing", edit: true }
  ]);

  // Previews calculated states
  const [feePreview, setFeePreview] = useState("");
  const [admPreview, setAdmPreview] = useState("");
  const [rollPreview, setRollPreview] = useState("");

  // Update Live Previews Dynamically
  useEffect(() => {
    let parts = [feePrefix];
    if (feeIncludeSession) parts.push("2026-2027");
    if (feeIncludeDate) parts.push("AUG26");
    const paddedNum = String(feeNextNumber).padStart(Number(feePadding), "0");
    parts.push(paddedNum);
    setFeePreview(parts.filter(Boolean).join(feeSeparator));
  }, [feePrefix, feeSeparator, feePadding, feeIncludeSession, feeIncludeDate, feeNextNumber]);

  useEffect(() => {
    let parts = [admPrefix];
    if (admIncludeSession) parts.push("26-27");
    if (admIncludeYear) parts.push("2026");
    parts.push(String(admNextNumber));
    setAdmPreview(parts.filter(Boolean).join(admSeparator));
  }, [admPrefix, admSeparator, admIncludeSession, admIncludeYear, admNextNumber]);

  useEffect(() => {
    let parts = [rollPrefix];
    if (rollIncludeSession) parts.push("26-27");
    const paddedNum = "1".padStart(Number(rollPadding), "0");
    parts.push(paddedNum);
    setRollPreview(parts.filter(Boolean).join(rollSeparator));
  }, [rollPrefix, rollSeparator, rollPadding, rollIncludeSession]);

  const handleSave = (e) => {
    e.preventDefault();
    setToastMessage("School settings saved and updated successfully!");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleGenerateKey = () => {
    const chars = "abcdef0123456789";
    let newKey = "pw_api_";
    for (let i = 0; i < 32; i++) {
      newKey += chars[Math.floor(Math.random() * chars.length)];
    }
    setApiKey(newKey);
    alert("New Biometric API Key generated successfully!");
  };

  const handleValidateBot = () => {
    alert(`Validating Telegram Bot Token: ${botToken}... Status: Token is Online and Active.`);
  };

  const handleSendTestTelegram = () => {
    alert(`Sent a test message to Telegram Chat ID: ${telegramChatId}. Please check your bot chat!`);
  };

  const handleToggleNotificationChannel = (id, channel) => {
    setNotifications(prev => prev.map(notif => {
      if (notif.id === id) {
        return { ...notif, [channel]: !notif[channel] };
      }
      return notif;
    }));
  };

  // Determine dynamic title for header
  const getHeaderTitle = () => {
    switch (activeTab) {
      case "social": return "Social Media Autopost";
      case "telegram": return "Telegram Bot Monitoring";
      case "notifications": return "Notification Center";
      default: return "School Settings";
    }
  };

  return (
    <div className="p-5 h-[calc(100vh-56px)] flex flex-col font-sans text-gray-800 overflow-hidden">
      
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 right-6 bg-slate-900 text-white px-4 py-3 rounded-none shadow flex items-center gap-2 border border-slate-700/50 animate-bounce z-50 text-xs">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Dynamic Header - Styled to match screenshot headers */}
      <div className="mb-4 flex-shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {activeTab === "social" && (
            <div className="w-10 h-10 rounded-none bg-[#1877f2]/10 flex items-center justify-center text-[#1877f2]">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
          )}
          {activeTab === "telegram" && (
            <div className="w-10 h-10 rounded-none bg-[#0088cc]/10 flex items-center justify-center text-[#0088cc]">
              <Send className="w-6 h-6 fill-current rotate-[-25deg]" />
            </div>
          )}
          {activeTab === "notifications" && (
            <div className="w-10 h-10 rounded-none bg-indigo-600 flex items-center justify-center text-white">
              <Bell className="w-5 h-5 fill-current" />
            </div>
          )}
          <div>
            <h1 className="text-xl font-bold text-slate-800">{getHeaderTitle()}</h1>
            {activeTab === "notifications" && (
              <p className="text-[11px] text-slate-400 font-semibold mt-0.5">Manage how and when you receive automated alerts</p>
            )}
          </div>
        </div>

        {/* Back to Notifications button for Social and Telegram */}
        {["social", "telegram"].includes(activeTab) && (
          <button
            onClick={() => setActiveTab("notifications")}
            className="px-3.5 py-1.5 border border-gray-300 text-slate-700 bg-white font-semibold text-xs rounded-none hover:bg-slate-50 transition-all flex items-center gap-1.5 shadow-3xs cursor-pointer active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
            Back to Notifications
          </button>
        )}

        {/* Search & Help block for Notification Center */}
        {activeTab === "notifications" && (
          <div className="flex items-center gap-2">
            <div className="relative flex items-center">
              <input 
                type="text" 
                placeholder="Search notifications..." 
                value={notificationSearch}
                onChange={(e) => setNotificationSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 border border-gray-300 rounded-none text-xs font-semibold focus:outline-none focus:border-indigo-500 w-52 bg-white"
              />
              <Search className="absolute left-2.5 w-3.5 h-3.5 text-slate-400" />
            </div>
            <button
              onClick={() => alert("Notification Center Help Center Guide is loading...")}
              className="px-3 py-1.5 border border-gray-300 text-slate-700 bg-white font-semibold text-xs rounded-none hover:bg-slate-50 transition-all flex items-center gap-1.5 shadow-3xs cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
              How it Works
            </button>
          </div>
        )}
      </div>

      {/* Main split grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-5 items-start overflow-hidden">
        
        {/* Left Side Sidebar Buttons */}
        <div className="space-y-4 lg:col-span-1 flex-shrink-0">
          
          <div className="space-y-2">
            
            {/* School Profile */}
            <button 
              type="button"
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-none text-xs font-bold transition-all text-left cursor-pointer border ${
                activeTab === "profile" 
                  ? "bg-[#007bff] text-white border-[#007bff]" 
                  : "bg-white text-slate-700 border-gray-200/80 hover:bg-slate-50"
              }`}
            >
              <Building className="w-4 h-4 flex-shrink-0" />
              School Profile
            </button>

            {/* System & Formats */}
            <button 
              type="button"
              onClick={() => setActiveTab("system")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-none text-xs font-bold transition-all text-left cursor-pointer border ${
                activeTab === "system" 
                  ? "bg-[#007bff] text-white border-[#007bff]" 
                  : "bg-white text-slate-700 border-gray-200/80 hover:bg-slate-50"
              }`}
            >
              <Sliders className="w-4 h-4 flex-shrink-0" />
              System & Formats
            </button>

            {/* Attendance */}
            <button 
              type="button"
              onClick={() => setActiveTab("attendance")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-none text-xs font-bold transition-all text-left cursor-pointer border ${
                activeTab === "attendance" 
                  ? "bg-[#007bff] text-white border-[#007bff]" 
                  : "bg-white text-slate-700 border-gray-200/80 hover:bg-slate-50"
              }`}
            >
              <Clock className="w-4 h-4 flex-shrink-0" />
              Attendance
            </button>

            {/* Security */}
            <button 
              type="button"
              onClick={() => setActiveTab("security")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-none text-xs font-bold transition-all text-left cursor-pointer border ${
                activeTab === "security" 
                  ? "bg-[#007bff] text-white border-[#007bff]" 
                  : "bg-white text-slate-700 border-gray-200/80 hover:bg-slate-50"
              }`}
            >
              <Shield className="w-4 h-4 flex-shrink-0" />
              Security
            </button>

            {/* Integrations */}
            <button 
              type="button"
              onClick={() => setActiveTab("integrations")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-none text-xs font-bold transition-all text-left cursor-pointer border ${
                activeTab === "integrations" 
                  ? "bg-[#007bff] text-white border-[#007bff]" 
                  : "bg-white text-slate-700 border-gray-200/80 hover:bg-slate-50"
              }`}
            >
              <Plug className="w-4 h-4 flex-shrink-0" />
              Integrations
            </button>

          </div>

          {/* External Channels */}
          <div className="space-y-2">
            <h4 className="px-1 text-[9px] font-bold text-slate-400 tracking-wider uppercase">External Channels</h4>
            
            {/* Social Media */}
            <button 
              type="button"
              onClick={() => setActiveTab("social")}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-none text-xs font-bold transition-all text-left cursor-pointer border ${
                activeTab === "social" 
                  ? "bg-[#007bff] text-white border-[#007bff]" 
                  : "bg-white text-slate-755 border-gray-200/80 hover:bg-slate-50"
              }`}
            >
              <span className="flex items-center gap-3">
                <Share2 className="w-4 h-4 text-slate-400" />
                Social Media
              </span>
              <svg className="w-3 h-3 text-slate-405" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>

            {/* Telegram Bot */}
            <button 
              type="button"
              onClick={() => setActiveTab("telegram")}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-none text-xs font-bold transition-all text-left cursor-pointer border ${
                activeTab === "telegram" 
                  ? "bg-[#007bff] text-white border-[#007bff]" 
                  : "bg-white text-slate-755 border-gray-200/80 hover:bg-slate-50"
              }`}
            >
              <span className="flex items-center gap-3">
                <Send className="w-4 h-4 text-slate-400" />
                Telegram Bot
              </span>
              <svg className="w-3 h-3 text-slate-405" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>

            {/* Notifications */}
            <button 
              type="button"
              onClick={() => setActiveTab("notifications")}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-none text-xs font-bold transition-all text-left cursor-pointer border ${
                activeTab === "notifications" 
                  ? "bg-[#007bff] text-white border-[#007bff]" 
                  : "bg-white text-slate-755 border-gray-200/80 hover:bg-slate-50"
              }`}
            >
              <span className="flex items-center gap-3">
                <Bell className="w-4 h-4 text-slate-400" />
                Notifications
              </span>
              <svg className="w-3 h-3 text-slate-405" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          </div>

          {/* Quick Guide */}
          <div className="bg-white border border-gray-200 rounded-none p-4 space-y-2 border-t-2 border-[#009b9f]">
            <div className="flex items-center gap-2 text-[#009b9f]">
              <BookOpen className="w-4 h-4" />
              <h4 className="font-bold text-xs">Quick Guide</h4>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
              Acronyms: Short names (e.g. "YIS") are used heavily in automated templates. Double check prefixes before printing receipts or registers.
            </p>
          </div>

        </div>

        {/* Right Settings Form Box - Scrollable */}
        <div className="lg:col-span-3 h-full overflow-y-auto pr-1 pb-16">
          
          {/* PROFILE, SYSTEM, ATTENDANCE, SECURITY, INTEGRATIONS FORM WRAPPER */}
          {!["social", "telegram", "notifications"].includes(activeTab) && (
            <form onSubmit={handleSave} className="bg-white border border-gray-200 rounded-none p-5 space-y-6 shadow-2xs">
              
              {/* SCHOOL PROFILE TAB */}
              {activeTab === "profile" && (
                <>
                  <div className="space-y-4">
                    <div className="bg-[#f0f4f9] border-l-4 border-[#007bff] text-[#007bff] px-3.5 py-2.5 rounded-r text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-2">
                      <Info className="w-4.5 h-4.5 text-[#007bff] flex-shrink-0" />
                      General Information
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">School Name *</label>
                        <input 
                          type="text" 
                          value={schoolName}
                          onChange={(e) => setSchoolName(e.target.value)}
                          required
                          className="w-full px-3 py-1.5 border border-gray-300 rounded-none text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#007bff] bg-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">Short Name / Acronym</label>
                        <input 
                          type="text" 
                          value={shortName}
                          onChange={(e) => setShortName(e.target.value)}
                          className="w-full px-3 py-1.5 border border-gray-300 rounded-none text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#007bff] bg-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">School Email *</label>
                        <input 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full px-3 py-1.5 border border-gray-300 rounded-none text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#007bff] bg-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">Phone Number</label>
                        <input 
                          type="text" 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-3 py-1.5 border border-gray-300 rounded-none text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#007bff] bg-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">Principal Name</label>
                        <input 
                          type="text" 
                          value={principalName}
                          onChange={(e) => setPrincipalName(e.target.value)}
                          className="w-full px-3 py-1.5 border border-gray-300 rounded-none text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#007bff] bg-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">Country</label>
                        <div className="relative flex items-center bg-white">
                          <select 
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="w-full px-3 py-1.5 border border-gray-300 rounded-none text-xs text-slate-700 font-semibold focus:outline-none focus:border-[#007bff] bg-white appearance-none"
                          >
                            <option value="India (+91)">India (+91)</option>
                            <option value="United States (+1)">United States (+1)</option>
                          </select>
                          <ChevronDown className="absolute right-3 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">Address</label>
                      <textarea 
                        rows="2"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-3 py-1.5 border border-gray-300 rounded-none text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#007bff] bg-white resize-none min-h-[60px]"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <div className="bg-[#f0f4f9] border-l-4 border-[#007bff] text-[#007bff] px-3.5 py-2.5 rounded-r text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-2">
                      <Paintbrush className="w-4.5 h-4.5 text-[#007bff] flex-shrink-0" />
                      Branding & Appearance
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="flex flex-col items-center space-y-2">
                        <span className="text-xs font-semibold text-gray-800">School Logo</span>
                        <div className="w-48 h-20 bg-white border border-gray-200 rounded-none flex items-center justify-center p-2 shadow-2xs overflow-hidden">
                          <img src={schoolLogo} alt="Logo" className="max-h-full max-w-full object-contain" />
                        </div>
                        <div className="flex w-48 rounded-none border border-gray-300 bg-white overflow-hidden text-[11px]">
                          <div className="flex-1 bg-white text-gray-400 py-1.5 px-3 select-none truncate font-semibold">Choose a file...</div>
                          <button type="button" className="bg-[#e9ecef] text-slate-700 py-1.5 px-4 font-bold border-l border-gray-300 hover:bg-slate-200">Browse</button>
                        </div>
                      </div>
                      <div className="flex flex-col items-center space-y-2">
                        <span className="text-xs font-semibold text-gray-800">Favicon (.ico, .png)</span>
                        <div className="w-48 h-20 bg-white border border-gray-200 rounded-none flex items-center justify-center p-2 shadow-2xs overflow-hidden">
                          <img src={favicon} alt="Favicon" className="h-10 w-10 object-contain" />
                        </div>
                        <div className="flex w-48 rounded-none border border-gray-300 bg-white overflow-hidden text-[11px]">
                          <div className="flex-1 bg-white text-gray-400 py-1.5 px-3 select-none truncate font-semibold">Choose a file...</div>
                          <button type="button" className="bg-[#e9ecef] text-slate-700 py-1.5 px-4 font-bold border-l border-gray-300 hover:bg-slate-200">Browse</button>
                        </div>
                      </div>
                      <div className="flex flex-col items-center space-y-2">
                        <span className="text-xs font-semibold text-gray-800">Principal Signature</span>
                        <div className="w-48 h-20 bg-[#f4f6f9] border border-gray-200 rounded-none flex items-center justify-center p-1.5 shadow-2xs overflow-hidden">
                          <svg className="w-24 h-12 text-slate-800" viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M10,25 Q25,5 35,30 T55,10 T70,32 T90,15" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M15,20 L85,20" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
                          </svg>
                        </div>
                        <div className="flex w-48 rounded-none border border-gray-300 bg-white overflow-hidden text-[11px]">
                          <div className="flex-1 bg-white text-gray-400 py-1.5 px-3 select-none truncate font-semibold">Choose a file...</div>
                          <button type="button" className="bg-[#e9ecef] text-slate-700 py-1.5 px-4 font-bold border-l border-gray-300 hover:bg-slate-200">Browse</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* SYSTEM & FORMATS TAB */}
              {activeTab === "system" && (
                <>
                  <div className="space-y-4">
                    <div className="bg-[#f0f4f9] border-l-4 border-[#007bff] text-[#007bff] px-3.5 py-2.5 rounded-r text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-2">
                      <Sliders className="w-4.5 h-4.5 text-[#007bff] flex-shrink-0" />
                      System & Academic Settings
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">School Code / UDISE</label>
                        <input 
                          type="text" 
                          value={schoolCode}
                          onChange={(e) => setSchoolCode(e.target.value)}
                          className="w-full px-3 py-1.5 border border-gray-300 rounded-none text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#007bff] bg-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">Affiliated By</label>
                        <input 
                          type="text" 
                          value={affiliatedBy}
                          onChange={(e) => setAffiliatedBy(e.target.value)}
                          className="w-full px-3 py-1.5 border border-gray-300 rounded-none text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#007bff] bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <h3 className="text-xs font-bold text-slate-800 block">Dashboard Design Theme</h3>
                      <p className="text-[10px] text-slate-500 font-medium">Choose the visual layout of your administration dashboard.</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5 pt-1.5">
                        {dashboardThemes.map((theme) => {
                          const isSelected = selectedTheme === theme.id;
                          return (
                            <div 
                              key={theme.id}
                              onClick={() => setSelectedTheme(theme.id)}
                              className={`border rounded-none overflow-hidden cursor-pointer bg-white transition-all group flex flex-col justify-between ${
                                isSelected 
                                  ? "border-[#007bff] ring-1 ring-[#007bff]" 
                                  : "border-gray-200 hover:border-gray-300 hover:shadow-3xs"
                              }`}
                            >
                              <div className="p-1 bg-slate-50 border-b border-gray-100 h-16 flex flex-col justify-between overflow-hidden">
                                {theme.visualClass === "warm" ? (
                                  <div className="h-full flex gap-1 p-0.5">
                                    <div className="w-3 bg-purple-900/10 rounded-xs flex flex-col gap-0.5 p-0.5">
                                      <div className="h-1.5 bg-purple-950/20 rounded-2xs"></div>
                                      <div className="h-1.5 bg-purple-950/20 rounded-2xs"></div>
                                    </div>
                                    <div className="flex-1 flex flex-col gap-1">
                                      <div className="h-3 bg-slate-100 rounded-xs border-b border-purple-500/20 flex items-center px-1"><div className="w-1.5 h-1.5 rounded-none bg-orange-500"></div></div>
                                      <div className="flex-1 grid grid-cols-3 gap-0.5">
                                        <div className="bg-orange-500/10 rounded-2xs border border-orange-500/20"></div>
                                        <div className="bg-purple-500/5 rounded-2xs border border-purple-500/10"></div>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="h-full flex gap-1 p-1">
                                    <div className="w-3 bg-indigo-50 rounded-xs"></div>
                                    <div className="flex-1 flex flex-col gap-1">
                                      <div className="h-2 bg-slate-100 rounded-xs"></div>
                                      <div className="flex-1 bg-slate-50 border rounded-xs"></div>
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div className="p-2 text-center flex flex-col items-center justify-center flex-1 bg-white min-h-[46px]">
                                <span className="text-[10px] font-bold text-gray-800 leading-tight block group-hover:text-indigo-650 transition-colors">
                                  {theme.name}
                                </span>
                                {isSelected && (
                                  <div className="w-1.5 h-1.5 rounded-none bg-[#ff5c0a] mt-1"></div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4 pt-3">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">Currency *</label>
                        <div className="relative flex items-center bg-white">
                          <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full px-3 py-1.5 border border-gray-300 rounded-none text-xs text-slate-700 font-semibold focus:outline-none bg-white appearance-none">
                            <option value="Indian Rupee (₹)">Indian Rupee (₹)</option>
                          </select>
                          <ChevronDown className="absolute right-3 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">Default Fee Receipt Template</label>
                        <div className="relative flex items-center bg-white">
                          <select value={receiptTemplate} onChange={(e) => setReceiptTemplate(e.target.value)} className="w-full px-3 py-1.5 border border-gray-300 rounded-none text-xs text-slate-750 font-semibold focus:outline-none bg-white appearance-none">
                            <option value="Pro | Standard Corporate Fee Receipt (A4 Portrait)">Pro | Standard Corporate Fee Receipt (A4 Portrait)</option>
                          </select>
                          <ChevronDown className="absolute right-3 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">Mobile App Receipt Template</label>
                        <div className="relative flex items-center bg-white">
                          <select value={mobileReceiptTemplate} onChange={(e) => setMobileReceiptTemplate(e.target.value)} className="w-full px-3 py-1.5 border border-gray-300 rounded-none text-xs text-slate-750 font-semibold focus:outline-none bg-white appearance-none">
                            <option value="Default Fee Receipt (Auto-Generated)">Default Fee Receipt (Auto-Generated)</option>
                          </select>
                          <ChevronDown className="absolute right-3 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <div className="bg-[#f0f4f9] border-l-4 border-[#007bff] text-[#007bff] px-3.5 py-2.5 rounded-r text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-2">
                      <FileSpreadsheet className="w-4.5 h-4.5 text-[#007bff] flex-shrink-0" />
                      Inventory Tax Settings
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">Tax Label (e.g. GST, VAT, Tax)</label>
                        <input type="text" value={taxLabel} onChange={(e) => setTaxLabel(e.target.value)} className="w-full px-3 py-1.5 border border-gray-300 rounded-none text-xs text-slate-800 font-semibold focus:outline-none bg-white" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">Tax ID Label (e.g. GSTIN, VAT No.)</label>
                        <input type="text" value={taxIdLabel} onChange={(e) => setTaxIdLabel(e.target.value)} className="w-full px-3 py-1.5 border border-gray-300 rounded-none text-xs text-slate-800 font-semibold focus:outline-none bg-white" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <div className="bg-[#f0f4f9] border-l-4 border-[#007bff] text-[#007bff] px-3.5 py-2.5 rounded-r text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-2">
                      <FileText className="w-4.5 h-4.5 text-[#007bff] flex-shrink-0" />
                      Fee Receipt Numbering
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-none text-xs font-semibold">
                      Live Preview: <span className="text-[#007bff] font-bold font-mono">{feePreview}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">Receipt Prefix</label>
                        <input type="text" value={feePrefix} onChange={(e) => setFeePrefix(e.target.value)} className="w-full px-3 py-1.5 border border-gray-300 rounded-none text-xs text-slate-800 font-semibold focus:outline-none bg-white" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">Separator</label>
                        <select value={feeSeparator} onChange={(e) => setFeeSeparator(e.target.value)} className="w-full px-3 py-1.5 border border-gray-300 rounded-none text-xs text-slate-700 font-semibold focus:outline-none bg-white">
                          <option value="-">- (Dash)</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">Number Padding</label>
                        <select value={feePadding} onChange={(e) => setFeePadding(e.target.value)} className="w-full px-3 py-1.5 border border-gray-300 rounded-none text-xs text-slate-700 font-semibold focus:outline-none bg-white">
                          <option value="4">4 digits (0001)</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 block">Include Academic Session</label>
                        <div className="flex border border-gray-300 rounded-none w-24 overflow-hidden text-xs text-center font-bold">
                          <button type="button" onClick={() => setFeeIncludeSession(true)} className={`flex-1 py-1.5 ${feeIncludeSession ? 'bg-[#17a2b8] text-white' : 'bg-white text-slate-500'}`}>YES</button>
                          <button type="button" onClick={() => setFeeIncludeSession(false)} className={`flex-1 py-1.5 border-l ${!feeIncludeSession ? 'bg-[#17a2b8] text-white' : 'bg-white text-slate-500'}`}>NO</button>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">Session Format</label>
                        <select value={feeSessionFormat} onChange={(e) => setFeeSessionFormat(e.target.value)} className="w-full px-3 py-1.5 border border-gray-300 rounded-none text-xs text-slate-700 font-semibold focus:outline-none bg-white">
                          <option value="Full (2026-2027)">Full (2026-2027)</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 block">Include Payment Date</label>
                        <div className="flex border border-gray-300 rounded-none w-24 overflow-hidden text-xs text-center font-bold">
                          <button type="button" onClick={() => setFeeIncludeDate(true)} className={`flex-1 py-1.5 ${feeIncludeDate ? 'bg-[#17a2b8] text-white' : 'bg-white text-slate-500'}`}>YES</button>
                          <button type="button" onClick={() => setFeeIncludeDate(false)} className={`flex-1 py-1.5 border-l ${!feeIncludeDate ? 'bg-[#17a2b8] text-white' : 'bg-white text-slate-500'}`}>NO</button>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">Date Format</label>
                        <select value={feeDateFormat} onChange={(e) => setFeeDateFormat(e.target.value)} className="w-full px-3 py-1.5 border border-gray-300 rounded-none text-xs text-slate-700 font-semibold focus:outline-none bg-white">
                          <option value="APR26 (Month + Year)">APR26 (Month + Year)</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">Next Receipt Number *</label>
                        <input type="number" value={feeNextNumber} onChange={(e) => setFeeNextNumber(Number(e.target.value))} required className="w-full px-3 py-1.5 border border-gray-300 rounded-none text-xs text-slate-800 font-semibold bg-white" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <div className="bg-[#f0f4f9] border-l-4 border-[#007bff] text-[#007bff] px-3.5 py-2.5 rounded-r text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-2">
                      <Building className="w-4.5 h-4.5 text-[#007bff] flex-shrink-0" />
                      Student Admission Numbering
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-none text-xs font-semibold">
                      Live Preview: <span className="text-[#16a34a] font-bold font-mono">{admPreview}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">Admission Prefix</label>
                        <input type="text" value={admPrefix} onChange={(e) => setAdmPrefix(e.target.value)} className="w-full px-3 py-1.5 border border-gray-300 rounded-none text-xs text-slate-800 font-semibold bg-white" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">Separator</label>
                        <select value={admSeparator} onChange={(e) => setAdmSeparator(e.target.value)} className="w-full px-3 py-1.5 border border-gray-300 rounded-none text-xs text-slate-700 font-semibold focus:outline-none bg-white">
                          <option value="-">- (Dash)</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">Number Padding</label>
                        <select value={admPadding} onChange={(e) => setAdmPadding(e.target.value)} className="w-full px-3 py-1.5 border border-gray-300 rounded-none text-xs text-slate-700 font-semibold focus:outline-none bg-white">
                          <option value="4">4 digits (0001)</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 block">Include Academic Session</label>
                        <div className="flex border border-gray-300 rounded-none w-24 overflow-hidden text-xs text-center font-bold">
                          <button type="button" onClick={() => setAdmIncludeSession(true)} className={`flex-1 py-1.5 ${admIncludeSession ? 'bg-[#17a2b8] text-white' : 'bg-white text-slate-500'}`}>YES</button>
                          <button type="button" onClick={() => setAdmIncludeSession(false)} className={`flex-1 py-1.5 border-l ${!admIncludeSession ? 'bg-[#17a2b8] text-white' : 'bg-white text-slate-500'}`}>NO</button>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">Session Format</label>
                        <select value={admSessionFormat} onChange={(e) => setAdmSessionFormat(e.target.value)} className="w-full px-3 py-1.5 border border-gray-300 rounded-none text-xs text-slate-700 font-semibold focus:outline-none bg-white">
                          <option value="Short (26-27)">Short (26-27)</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 block">Include Year</label>
                        <div className="flex border border-gray-300 rounded-none w-24 overflow-hidden text-xs text-center font-bold">
                          <button type="button" onClick={() => setAdmIncludeYear(true)} className={`flex-1 py-1.5 ${admIncludeYear ? 'bg-[#17a2b8] text-white' : 'bg-white text-slate-500'}`}>YES</button>
                          <button type="button" onClick={() => setAdmIncludeYear(false)} className={`flex-1 py-1.5 border-l ${!admIncludeYear ? 'bg-[#17a2b8] text-white' : 'bg-white text-slate-500'}`}>NO</button>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">Date Format</label>
                        <select value={admDateFormat} onChange={(e) => setAdmDateFormat(e.target.value)} className="w-full px-3 py-1.5 border border-gray-300 rounded-none text-xs text-slate-700 font-semibold focus:outline-none bg-white">
                          <option value="2026 (Year Only)">2026 (Year Only)</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">Next Admission Number *</label>
                        <input type="number" value={admNextNumber} onChange={(e) => setAdmNextNumber(Number(e.target.value))} required className="w-full px-3 py-1.5 border border-gray-300 rounded-none text-xs text-slate-800 font-semibold bg-white" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <div className="bg-[#f0f4f9] border-l-4 border-[#007bff] text-[#007bff] px-3.5 py-2.5 rounded-r text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-2">
                      <LayoutGrid className="w-4.5 h-4.5 text-[#007bff] flex-shrink-0" />
                      Roll Number Formatting
                    </div>
                    <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-none text-xs font-semibold">
                      Live Preview: <span className="text-[#007bff] font-bold font-mono">{rollPreview}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">Roll Prefix</label>
                        <input type="text" value={rollPrefix} onChange={(e) => setRollPrefix(e.target.value)} className="w-full px-3 py-1.5 border border-gray-300 rounded-none text-xs text-slate-800 font-semibold bg-white" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">Separator</label>
                        <select value={rollSeparator} onChange={(e) => setRollSeparator(e.target.value)} className="w-full px-3 py-1.5 border border-gray-300 rounded-none text-xs text-slate-700 font-semibold focus:outline-none bg-white">
                          <option value="-">- (Dash)</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">Number Padding</label>
                        <select value={rollPadding} onChange={(e) => setRollPadding(e.target.value)} className="w-full px-3 py-1.5 border border-gray-300 rounded-none text-xs text-slate-700 font-semibold focus:outline-none bg-white">
                          <option value="3">3 digits (001)</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 block">Include Academic Session</label>
                        <div className="flex border border-gray-300 rounded-none w-24 overflow-hidden text-xs text-center font-bold">
                          <button type="button" onClick={() => setRollIncludeSession(true)} className={`flex-1 py-1.5 ${rollIncludeSession ? 'bg-[#17a2b8] text-white' : 'bg-white text-slate-500'}`}>YES</button>
                          <button type="button" onClick={() => setRollIncludeSession(false)} className={`flex-1 py-1.5 border-l ${!rollIncludeSession ? 'bg-[#17a2b8] text-white' : 'bg-white text-slate-500'}`}>NO</button>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block">Session Format</label>
                        <select value={rollSessionFormat} onChange={(e) => setRollSessionFormat(e.target.value)} className="w-full px-3 py-1.5 border border-gray-300 rounded-none text-xs text-slate-700 font-semibold focus:outline-none bg-white">
                          <option value="Short (26-27)">Short (26-27)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* ATTENDANCE TAB */}
              {activeTab === "attendance" && (
                <>
                  <div className="space-y-4">
                    <div className="bg-[#f0f4f9] border-l-4 border-[#007bff] text-[#007bff] px-3.5 py-2.5 rounded-r text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-2">
                      <MapPin className="w-4.5 h-4.5 text-[#007bff] flex-shrink-0" />
                      Staff Geolocation & Time Settings
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-800 block">Enable Geolocation Restrictions for Staff App Punch In/Out</label>
                      <button type="button" onClick={() => setGeoRestricted(!geoRestricted)} className={`rounded px-3 py-1.5 text-xs font-bold text-white transition-all w-20 cursor-pointer ${geoRestricted ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-[#dc3545] hover:bg-red-700'}`}>
                        <span className="w-full text-center">{geoRestricted ? "ON" : "OFF"}</span>
                      </button>
                      <p className="text-[10px] text-slate-500 font-medium">Toggle whether mobile app attendance relies on physical GPS distance to the school.</p>
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-slate-800 border-b pb-1.5">Global Campus Coordinates</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 block">Latitude</label>
                          <input type="text" value={latitude} onChange={(e) => setLatitude(e.target.value)} className="w-full px-3 py-1.5 border border-gray-300 rounded-none text-xs text-slate-800 font-semibold focus:outline-none" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 block">Longitude</label>
                          <input type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)} className="w-full px-3 py-1.5 border border-gray-300 rounded-none text-xs text-slate-800 font-semibold focus:outline-none" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 block">Radius (Meters)</label>
                          <input type="text" value={radius} onChange={(e) => setRadius(e.target.value)} className="w-full px-3 py-1.5 border border-gray-300 rounded-none text-xs text-slate-800 font-semibold focus:outline-none" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-slate-800 border-b pb-1.5">Allowed Punch Time Windows</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 block">Punch In Start</label>
                          <input type="text" value={punchInStart} onChange={(e) => setPunchInStart(e.target.value)} className="w-full px-3 py-1.5 border border-gray-300 rounded-none text-xs focus:outline-none" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 block">Punch In End</label>
                          <input type="text" value={punchInEnd} onChange={(e) => setPunchInEnd(e.target.value)} className="w-full px-3 py-1.5 border border-gray-300 rounded-none text-xs focus:outline-none" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 block">Punch Out Start</label>
                          <input type="text" value={punchOutStart} onChange={(e) => setPunchOutStart(e.target.value)} className="w-full px-3 py-1.5 border border-gray-300 rounded-none text-xs focus:outline-none" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 block">Punch Out End</label>
                          <input type="text" value={punchOutEnd} onChange={(e) => setPunchOutEnd(e.target.value)} className="w-full px-3 py-1.5 border border-gray-300 rounded-none text-xs focus:outline-none" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <div className="bg-[#f0f4f9] border-l-4 border-[#007bff] text-[#007bff] px-3.5 py-2.5 rounded-r text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-2">
                      <Fingerprint className="w-4.5 h-4.5 text-[#007bff] flex-shrink-0" />
                      Biometric Attendance Settings
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">Punch Direction Mode</label>
                      <select value={punchDirectionMode} onChange={(e) => setPunchDirectionMode(e.target.value)} className="w-full max-w-xl px-3 py-1.5 border border-gray-300 rounded-none text-xs text-slate-700 font-semibold focus:outline-none bg-white">
                        <option value="Automatic (recommended) — first punch = in, last = out">Automatic (recommended) — first punch = in, last = out</option>
                      </select>
                    </div>
                    <div className="space-y-3 opacity-60">
                      <h4 className="text-xs font-bold text-slate-400 border-b pb-1.5">Biometric Punch Time Windows</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <input type="text" disabled value={bioPunchInStart} className="w-full px-3 py-1.5 border border-gray-250 bg-slate-50 text-slate-405 rounded-none text-xs" />
                        <input type="text" disabled value={bioPunchInEnd} className="w-full px-3 py-1.5 border border-gray-250 bg-slate-50 text-slate-405 rounded-none text-xs" />
                        <input type="text" disabled value={bioPunchOutStart} className="w-full px-3 py-1.5 border border-gray-250 bg-slate-50 text-slate-405 rounded-none text-xs" />
                        <input type="text" disabled value={bioPunchOutEnd} className="w-full px-3 py-1.5 border border-gray-250 bg-slate-50 text-slate-405 rounded-none text-xs" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-slate-800 border-b pb-1.5">Late Detection</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 block">School Start Time</label>
                          <input type="text" value={schoolStartTime} onChange={(e) => setSchoolStartTime(e.target.value)} className="w-64 px-3 py-1.5 border border-gray-300 rounded-none text-xs focus:outline-none" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 block">Grace Period (Minutes)</label>
                          <input type="text" value={gracePeriod} onChange={(e) => setGracePeriod(e.target.value)} className="w-48 px-3 py-1.5 border border-gray-300 rounded-none text-xs focus:outline-none" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3 pt-2">
                      <h4 className="text-xs font-bold text-slate-800 border-b pb-1.5 flex items-center gap-1.5"><UserCheck className="w-4 h-4 text-indigo-650" />Face Recognition Safety</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 block">Match Threshold</label>
                          <input type="text" value={matchThreshold} onChange={(e) => setMatchThreshold(e.target.value)} className="w-full px-3 py-1.5 border border-gray-300 rounded-none text-xs bg-white" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 block">Second-best Margin</label>
                          <input type="text" value={secondBestMargin} onChange={(e) => setSecondBestMargin(e.target.value)} className="w-full px-3 py-1.5 border border-gray-300 rounded-none text-xs bg-white" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 block">Anti-spoof Failures</label>
                          <select value={antiSpoof} onChange={(e) => setAntiSpoof(e.target.value)} className="w-full px-3 py-1.5 border border-gray-300 rounded-none text-xs bg-white">
                            <option value="Hold for review (recommended)">Hold for review (recommended)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* SECURITY TAB */}
              {activeTab === "security" && (
                <>
                  <div className="space-y-4">
                    <div className="bg-[#f0f4f9] border-l-4 border-[#007bff] text-[#007bff] px-3.5 py-2.5 rounded-r text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-2">
                      <Lock className="w-4.5 h-4.5 text-[#007bff] flex-shrink-0" />
                      Admin Account Security
                    </div>
                    <div className="p-4 border border-gray-250 rounded-none bg-slate-50/50 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-none bg-slate-100 border flex items-center justify-center text-slate-650 flex-shrink-0"><Shield className="w-5 h-5" /></div>
                      <div>
                        <h4 className="font-bold text-xs text-slate-800">Administrator Password & Profile</h4>
                        <p className="text-[10px] text-slate-500 font-semibold">Update your personal login password, profile picture, and account details.</p>
                        <button type="button" onClick={() => alert("Redirecting...")} className="px-3.5 py-1.5 bg-[#17a2b8] hover:bg-cyan-700 text-white rounded-none text-[11px] font-bold shadow-3xs cursor-pointer mt-1">Manage My Account</button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <div className="bg-amber-50 border-l-4 border-amber-500 text-amber-800 px-3.5 py-2 rounded-r text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-2">
                      <AlertTriangle className="w-4.5 h-4.5 text-amber-600 flex-shrink-0" />
                      Portal Status (Maintenance Mode)
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-800 block">Enable Maintenance Mode</label>
                      <button type="button" onClick={() => setMaintenanceMode(!maintenanceMode)} className={`rounded px-3 py-1.5 text-xs font-bold text-white transition-all w-20 cursor-pointer ${maintenanceMode ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-[#dc3545] hover:bg-red-700'}`}>
                        <span className="w-full text-center">{maintenanceMode ? "ON" : "OFF"}</span>
                      </button>
                      <p className="text-[10px] text-slate-500 font-medium mt-1">When active, Students and Parents will be blocked from accessing the portal and mobile app.</p>
                    </div>
                  </div>
                </>
              )}

              {/* INTEGRATIONS TAB */}
              {activeTab === "integrations" && (
                <>
                  <div className="space-y-4">
                    <div className="bg-[#f0f4f9] border-l-4 border-[#007bff] text-[#007bff] px-3.5 py-2.5 rounded-r text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-2">
                      <Plug className="w-4.5 h-4.5 text-[#007bff] flex-shrink-0" />
                      Biometric API Access
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">Current API Key</label>
                      <div className="flex max-w-3xl rounded-none border border-gray-300 bg-white overflow-hidden text-xs">
                        <input type={showApiKey ? "text" : "password"} value={apiKey} readOnly className="flex-1 bg-slate-50/50 px-3 py-1.5 font-mono text-slate-700 outline-none" />
                        <button type="button" onClick={() => setShowApiKey(!showApiKey)} className="px-3 border-l bg-white hover:bg-slate-50 text-slate-500 cursor-pointer">{showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                        <button type="button" onClick={handleGenerateKey} className="px-4 bg-[#ff5c0a] hover:bg-orange-600 border-l text-white font-bold flex items-center gap-1.5 cursor-pointer">Generate New Key</button>
                      </div>
                    </div>
                    <div className="bg-[#ffc107] border-l-4 border-amber-600 text-amber-950 p-3.5 rounded-r text-xs flex items-start gap-2.5 shadow-3xs leading-relaxed max-w-4xl">
                      <AlertTriangle className="w-5 h-5 text-amber-900 flex-shrink-0 mt-0.5" />
                      <p className="font-semibold text-[11px]">Warning: <span className="font-normal text-slate-900">Generating a new key will instantly disconnect any Windows Agents using the old key. You must update the appsettings.json file.</span></p>
                    </div>
                  </div>
                </>
              )}

              {/* SAVE PREFERENCES FOOTER */}
              <div className="flex justify-end pt-3.5 border-t border-gray-200 bg-white">
                <button 
                  type="submit"
                  className="px-4 py-2 bg-[#ff5c0a] hover:bg-orange-600 text-white font-bold text-xs rounded-none transition-all hover:scale-103 active:scale-97 shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5 text-white" />
                  Save Settings
                </button>
              </div>

            </form>
          )}

          {/* SOCIAL MEDIA AUTOPOST TAB */}
          {activeTab === "social" && (
            <div className="space-y-5 animate-in fade-in duration-250">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                
                {/* Left Card: Connect Facebook */}
                <div className="lg:col-span-2 bg-white border border-gray-250 rounded-none p-6 flex flex-col items-center justify-center text-center space-y-4 shadow-3xs min-h-[380px]">
                  <div className="bg-indigo-50/50 border-l-4 border-indigo-600 text-indigo-750 px-4 py-2 w-full text-left rounded-r text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#1877f2] fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Connect Your Facebook Page
                  </div>

                  <div className="flex-1 flex flex-col items-center justify-center space-y-4 py-8">
                    <div className="w-16 h-16 rounded-none bg-[#1877f2]/10 flex items-center justify-center text-[#1877f2] shadow-2xs">
                      <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-slate-850">Automatically share school content to Facebook & Instagram</h2>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-lg mt-2 mx-auto">
                        Connect your school's Facebook Page to automatically share notices, events, and gallery photos. If your Page has a linked Instagram Business account, those will be cross-posted too.
                      </p>
                    </div>

                    {/* Alert Banner */}
                    <div className="bg-[#fff9e6] border border-amber-250 rounded-none p-3 text-[11px] text-amber-900 font-medium max-w-xl flex items-center gap-2 text-left leading-relaxed">
                      <AlertTriangle className="w-4.5 h-4.5 text-amber-700 flex-shrink-0" />
                      <span>
                        <span className="font-bold text-amber-850">Not Available:</span> Meta App credentials are not configured by the platform administrator. Contact support to enable this feature.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Card: Setup Guide */}
                <div className="bg-white border border-gray-250 rounded-none p-5 shadow-3xs space-y-5 flex flex-col">
                  
                  {/* Card title */}
                  <div className="flex items-center gap-2 text-indigo-600 border-b pb-2.5">
                    <Info className="w-4.5 h-4.5" />
                    <h3 className="font-bold text-xs text-slate-800">Setup Guide</h3>
                  </div>

                  {/* Steps list */}
                  <div className="flex-1 space-y-4 text-xs font-semibold text-slate-700 leading-relaxed">
                    <p><span className="text-slate-850 font-bold">Step 1:</span> Click "Connect with Facebook" to authorize your school's Facebook Page.</p>
                    <p><span className="text-slate-850 font-bold">Step 2:</span> Log in with the Facebook account that <span className="font-bold text-slate-800">manages your school's Page</span>.</p>
                    <p><span className="text-slate-850 font-bold">Step 3:</span> Grant all requested permissions (Page management, posting, etc.)</p>
                    <p><span className="text-slate-850 font-bold">Step 4:</span> Select the Facebook Page to connect if you manage multiple pages.</p>
                    <p><span className="text-slate-850 font-bold">Step 5:</span> Done! When creating notices, events, or uploading gallery photos, you'll see checkboxes to auto-post to social media.</p>
                    
                    <div className="pt-2 border-t text-[11px] text-slate-450 font-medium">
                      📸 <span className="font-bold text-slate-600">Instagram:</span> Your Facebook Page must have a linked <span className="text-[#ff5c0a] font-bold">Instagram Business Account</span> for IG posting to work.
                    </div>
                  </div>

                  {/* Security footer banner */}
                  <div className="bg-[#fff9e6] border border-amber-250 rounded-none p-3 text-[10px] text-amber-900 font-medium flex items-start gap-2 leading-normal mt-auto">
                    <Shield className="w-4 h-4 text-amber-800 flex-shrink-0 mt-0.5" />
                    <p><span className="font-bold">Security:</span> Your tokens are encrypted at rest. Only this school's admin can manage the connection. Tokens auto-refresh before expiry.</p>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* TELEGRAM BOT MONITORING TAB */}
          {activeTab === "telegram" && (
            <div className="space-y-5 animate-in fade-in duration-250">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                
                {/* Left Card: Bot Configuration */}
                <div className="lg:col-span-2 bg-white border border-gray-250 rounded-none p-5 shadow-3xs space-y-5 min-h-[380px]">
                  
                  {/* Section Title */}
                  <div className="flex items-center gap-2 text-[#0088cc] border-b pb-2.5">
                    <Send className="w-4.5 h-4.5 rotate-[-25deg] fill-current" />
                    <h3 className="font-bold text-xs text-slate-800">Bot Configuration</h3>
                  </div>

                  {/* Config Fields */}
                  <div className="space-y-4">
                    
                    {/* Active toggle */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-850 block">Enable Telegram Monitoring</label>
                      <button 
                        type="button" 
                        onClick={() => setTelegramActive(!telegramActive)}
                        className={`rounded px-3 py-1 flex items-center gap-1.5 text-xs font-bold text-white transition-all w-24 cursor-pointer ${
                          telegramActive ? 'bg-[#dc3545] hover:bg-red-700' : 'bg-slate-400 hover:bg-slate-500'
                        }`}
                      >
                        <span className="w-full text-center">{telegramActive ? "Active" : "Inactive"}</span>
                      </button>
                      <p className="text-[10px] text-slate-500 font-medium">Receive real-time alerts for your school via Telegram.</p>
                    </div>

                    {/* Bot Token input */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">Bot Token</label>
                      <div className="flex rounded-none border border-gray-300 overflow-hidden bg-white text-xs max-w-xl">
                        <input 
                          type="text" 
                          value={botToken}
                          onChange={(e) => setBotToken(e.target.value)}
                          className="flex-1 px-3 py-1.5 font-semibold text-slate-850 outline-none" 
                        />
                        <button 
                          type="button" 
                          onClick={handleValidateBot}
                          className="bg-[#f8f9fa] border-l border-gray-300 px-3 hover:bg-gray-200 text-slate-700 font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5 text-slate-500" />
                          Validate
                        </button>
                      </div>
                    </div>

                    {/* Chat ID input */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">Chat ID</label>
                      <input 
                        type="text" 
                        value={telegramChatId}
                        onChange={(e) => setTelegramChatId(e.target.value)}
                        className="w-full max-w-xl px-3 py-1.5 border border-gray-300 rounded-none text-xs text-slate-800 font-semibold focus:outline-none focus:border-indigo-500 bg-white" 
                      />
                      <p className="text-[10px] text-slate-450 font-medium">Your personal Chat ID or group Chat ID. Get it from <span className="text-[#0088cc] font-semibold">@userinfobot</span>.</p>
                    </div>

                  </div>

                  {/* Actions Footer */}
                  <div className="flex justify-end gap-2.5 pt-4 border-t">
                    <button 
                      type="button" 
                      onClick={handleSendTestTelegram}
                      className="px-4 py-2 border border-gray-350 text-slate-700 bg-white hover:bg-slate-50 font-bold text-xs rounded-none shadow-3xs flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                    >
                      <Send className="w-3.5 h-3.5 rotate-[-25deg] text-slate-500 fill-current" />
                      Send Test Message
                    </button>
                    
                    <button 
                      type="button"
                      onClick={() => alert("Telegram Bot configuration updated successfully!")}
                      className="px-4 py-2 bg-indigo-650 hover:bg-indigo-700 text-white font-bold text-xs rounded-none shadow-sm flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                    >
                      <Save className="w-3.5 h-3.5" />
                      Save Settings
                    </button>
                  </div>

                </div>

                {/* Right Card: Guides & Alerts list */}
                <div className="space-y-4">
                  
                  {/* Setup Guide */}
                  <div className="bg-white border border-gray-250 rounded-none p-4 shadow-3xs space-y-4">
                    <div className="flex items-center gap-2 text-indigo-600 border-b pb-2">
                      <Info className="w-4 h-4" />
                      <h3 className="font-bold text-xs text-slate-800">Setup Guide</h3>
                    </div>
                    <div className="space-y-2 text-xs font-semibold text-slate-750 leading-relaxed">
                      <p><span className="text-slate-850 font-bold">Step 1:</span> Open Telegram and message <span className="text-[#ff5c0a] font-bold">@BotFather</span>.</p>
                      <p><span className="text-slate-850 font-bold">Step 2:</span> Send <code className="bg-slate-100 px-1 py-0.5 rounded-none text-rose-600 font-bold">/newbot</code> and follow prompts. Copy the <span className="font-bold">Token</span>.</p>
                      <p><span className="text-slate-850 font-bold">Step 3:</span> Start chatting with your bot (search by username ➔ Start).</p>
                      <p><span className="text-slate-850 font-bold">Step 4:</span> Message <span className="text-[#0088cc] font-semibold">@userinfobot</span> to get your <span className="font-bold">Chat ID</span>.</p>
                      <p><span className="text-slate-850 font-bold">Step 5:</span> Paste both values here and Save!</p>
                    </div>
                  </div>

                  {/* Alerts Lists */}
                  <div className="bg-white border border-gray-250 rounded-none p-4 shadow-3xs space-y-3">
                    <div className="flex items-center gap-2 text-indigo-600 border-b pb-2">
                      <Bell className="w-4 h-4" />
                      <h3 className="font-bold text-xs text-slate-800">Alerts you'll receive</h3>
                    </div>
                    <ul className="space-y-2 text-xs font-bold text-slate-650">
                      <li className="flex items-center gap-2.5">💸 <span className="font-semibold">Fee collections (real-time)</span></li>
                      <li className="flex items-center gap-2.5">✅ <span className="font-semibold">Attendance summaries</span></li>
                      <li className="flex items-center gap-2.5">🎓 <span className="font-semibold">New student admissions</span></li>
                      <li className="flex items-center gap-2.5">📝 <span className="font-semibold">Leave requests</span></li>
                      <li className="flex items-center gap-2.5">📚 <span className="font-semibold">Homework assignments</span></li>
                      <li className="flex items-center gap-2.5">🔑 <span className="font-semibold">Staff logins</span></li>
                      <li className="flex items-center gap-2.5">📊 <span className="font-semibold">Daily summary (9 PM)</span></li>
                    </ul>
                  </div>

                  {/* Warn Footer card */}
                  <div className="bg-[#fff9e6] border border-amber-250 rounded-none p-3 text-[10px] text-amber-900 font-medium flex items-start gap-2 leading-normal">
                    <Lock className="w-4 h-4 text-amber-850 flex-shrink-0 mt-0.5" />
                    <p><span className="font-bold">For group monitoring:</span> Add the bot to your Telegram group. The Chat ID will be a negative number (e.g. <code className="bg-amber-100/50 px-0.5 font-bold text-rose-700">-123456789</code>).</p>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* NOTIFICATION CENTER TAB */}
          {activeTab === "notifications" && (
            <div className="space-y-5 animate-in fade-in duration-250">
              
              {/* Statistic Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                
                {/* Total Alerts */}
                <div className="bg-white border border-gray-250 rounded-none p-4 flex items-center gap-4 shadow-3xs">
                  <div className="w-10 h-10 rounded-none bg-slate-50 border flex items-center justify-center text-slate-700 shadow-3xs"><Bell className="w-5 h-5" /></div>
                  <div>
                    <span className="text-xl font-extrabold text-slate-850 block leading-tight">29</span>
                    <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider">Total Alerts</span>
                  </div>
                </div>

                {/* Active Alerts */}
                <div className="bg-white border border-gray-250 rounded-none p-4 flex items-center gap-4 shadow-3xs">
                  <div className="w-10 h-10 rounded-none bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-3xs"><CheckCircle2 className="w-5 h-5" /></div>
                  <div>
                    <span className="text-xl font-extrabold text-emerald-600 block leading-tight">22</span>
                    <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider">Active Alerts</span>
                  </div>
                </div>

                {/* SMS Available */}
                <div className="bg-white border border-gray-250 rounded-none p-4 flex items-center gap-4 shadow-3xs">
                  <div className="w-10 h-10 rounded-none bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shadow-3xs"><Lock className="w-5 h-5" /></div>
                  <div>
                    <span className="text-xl font-extrabold text-slate-800 block leading-tight font-mono">0</span>
                    <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider">SMS Available</span>
                  </div>
                </div>

                {/* WhatsApp Enabled */}
                <div className="bg-white border border-gray-250 rounded-none p-4 flex items-center gap-4 shadow-3xs">
                  <div className="w-10 h-10 rounded-none bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shadow-3xs">
                    <MessageSquare className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <span className="text-xl font-extrabold text-teal-600 block leading-tight">10</span>
                    <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider">WhatsApp Enabled</span>
                  </div>
                </div>

              </div>

              {/* Main alert table */}
              <div className="bg-white border border-gray-250 rounded-none overflow-hidden shadow-3xs">
                
                {/* Header configuration controller banner */}
                <div className="px-5 py-3 border-b flex justify-between items-center bg-slate-50/50">
                  <span className="text-xs font-bold text-slate-700">Notification Alerts Routing Map</span>
                  <button 
                    onClick={() => alert("Channel Configurations drawer opening...")}
                    className="px-3.5 py-1.5 bg-white border border-gray-300 text-slate-700 hover:bg-slate-50 rounded-none text-[10px] font-bold flex items-center gap-1.5 shadow-3xs transition-all cursor-pointer active:scale-95"
                  >
                    <Sliders className="w-3 h-3 text-slate-500" />
                    Show Channel Configuration
                  </button>
                </div>

                {/* Configurations Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/50 border-b border-gray-250 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        <th className="py-3 px-5 w-12 text-center">#</th>
                        <th className="py-3 px-5">Alert & Description</th>
                        <th className="py-3 px-5">Status</th>
                        <th className="py-3 px-5 w-24 text-center">✉ Email</th>
                        <th className="py-3 px-5 w-24 text-center">💬 SMS</th>
                        <th className="py-3 px-5 w-24 text-center">✆ Whatsapp</th>
                        <th className="py-3 px-5 w-24 text-center">🔔 Push</th>
                        <th className="py-3 px-5 w-24 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-750">
                      {notifications
                        .filter(n => n.name.toLowerCase().includes(notificationSearch.toLowerCase()) || n.desc.toLowerCase().includes(notificationSearch.toLowerCase()))
                        .map((notif, idx) => (
                          <tr key={notif.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="py-4.5 px-5 text-center text-slate-400 font-medium">{idx + 1}</td>
                            <td className="py-4.5 px-5">
                              <div className="flex items-start gap-3">
                                {/* Small specific Icon colored block */}
                                <div className={`w-8 h-8 rounded-none flex items-center justify-center text-white mt-0.5 flex-shrink-0 shadow-3xs ${
                                  notif.type === "billing" ? "bg-indigo-500" :
                                  notif.type === "academic" ? "bg-emerald-500" :
                                  notif.type === "discipline" ? "bg-[#198754]" :
                                  notif.type === "leave" ? "bg-rose-400" : "bg-[#0d6efd]"
                                }`}>
                                  {notif.type === "billing" ? <FileText className="w-4 h-4" /> :
                                   notif.type === "academic" ? <Sliders className="w-4 h-4" /> :
                                   notif.type === "discipline" ? <Shield className="w-4 h-4" /> :
                                   notif.type === "leave" ? <Clock className="w-4 h-4" /> : <Building className="w-4 h-4" />}
                                </div>
                                <div>
                                  <h4 className="font-bold text-slate-850 leading-tight text-[13px]">{notif.name}</h4>
                                  <p className="text-[10px] text-slate-450 leading-relaxed mt-0.5 font-medium">{notif.desc}</p>
                                </div>
                              </div>
                            </td>
                            
                            {/* Status label with green active dot */}
                            <td className="py-4.5 px-5">
                              <span className="flex items-center gap-1.5 text-xs text-slate-700">
                                <span className="w-1.5 h-1.5 rounded-none bg-emerald-500"></span>
                                {notif.status}
                              </span>
                            </td>

                            {/* Email Toggle */}
                            <td className="py-4.5 px-5 text-center">
                              <button
                                type="button"
                                onClick={() => handleToggleNotificationChannel(notif.id, "email")}
                                className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-none border-2 border-transparent transition-colors duration-150 ease-in-out focus:outline-none ${notif.email ? 'bg-indigo-650' : 'bg-slate-200'}`}
                              >
                                <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-none bg-white transition duration-150 ease-in-out ${notif.email ? 'translate-x-4' : 'translate-x-0'}`} />
                              </button>
                            </td>

                            {/* SMS Toggle */}
                            <td className="py-4.5 px-5 text-center">
                              <button
                                type="button"
                                onClick={() => handleToggleNotificationChannel(notif.id, "sms")}
                                className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-none border-2 border-transparent transition-colors duration-150 ease-in-out focus:outline-none ${notif.sms ? 'bg-indigo-650' : 'bg-slate-200'}`}
                              >
                                <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-none bg-white transition duration-150 ease-in-out ${notif.sms ? 'translate-x-4' : 'translate-x-0'}`} />
                              </button>
                            </td>

                            {/* WhatsApp Toggle */}
                            <td className="py-4.5 px-5 text-center">
                              <button
                                type="button"
                                onClick={() => handleToggleNotificationChannel(notif.id, "whatsapp")}
                                className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-none border-2 border-transparent transition-colors duration-150 ease-in-out focus:outline-none ${notif.whatsapp ? 'bg-indigo-650' : 'bg-slate-200'}`}
                              >
                                <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-none bg-white transition duration-150 ease-in-out ${notif.whatsapp ? 'translate-x-4' : 'translate-x-0'}`} />
                              </button>
                            </td>

                            {/* Push Toggle */}
                            <td className="py-4.5 px-5 text-center">
                              <button
                                type="button"
                                onClick={() => handleToggleNotificationChannel(notif.id, "push")}
                                className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-none border-2 border-transparent transition-colors duration-150 ease-in-out focus:outline-none ${notif.push ? 'bg-indigo-650' : 'bg-slate-200'}`}
                              >
                                <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-none bg-white transition duration-150 ease-in-out ${notif.push ? 'translate-x-4' : 'translate-x-0'}`} />
                              </button>
                            </td>

                            {/* Edit Action Button */}
                            <td className="py-4.5 px-5 text-right">
                              {notif.edit ? (
                                <button 
                                  type="button"
                                  onClick={() => alert(`Opening alert edit setup page for: ${notif.name}`)}
                                  className="px-2.5 py-1 border border-gray-300 text-slate-700 bg-white hover:bg-slate-50 font-bold text-[10px] rounded-none shadow-3xs flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95 ml-auto"
                                >
                                  <Edit2 className="w-3 h-3 text-slate-500" />
                                  Edit
                                </button>
                              ) : (
                                <span className="text-slate-400 mr-4">—</span>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
