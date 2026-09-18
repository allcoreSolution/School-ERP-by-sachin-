import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Shield, AlertTriangle, CheckCircle, ChevronRight, X, Package,
  Download, Trash2, Info, Globe, BookOpen, Flag, School, HelpCircle,
  Save, ToggleLeft, ToggleRight, FolderOpen, FileText, Plus,
  Filter, Search, CheckSquare, Users, Building2, UserCheck, FileDown, FileUp, Grid, Menu, List, CheckCheck, Play, ListFilter, AlertCircle, XCircle, UserX, FileOutput, ClipboardList, Calendar
} from "lucide-react";

/* ─── Shared: Circular Gauge ─── */
function CircleGauge({ pct, color = "#e05a2b", size = 90, label }) {
  const r = 36, circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <svg width={size} height={size} viewBox="0 0 88 88">
        <circle cx="44" cy="44" r={r} fill="none" stroke="#e5e7eb" strokeWidth="8" />
        <circle cx="44" cy="44" r={r} fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          transform="rotate(-90 44 44)" style={{ transition: "stroke-dashoffset 0.5s" }} />
        <text x="44" y="48" textAnchor="middle" fontSize="14" fontWeight="800" fill={color}>{pct}%</text>
      </svg>
      {label && <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">{label}</span>}
    </div>
  );
}

/* ─── Shared: Progress Bar ─── */
function ProgressBar({ pct, color = "#e05a2b" }) {
  return (
    <div className="w-full bg-slate-100 rounded-none h-1.5 overflow-hidden">
      <div className="h-1.5 rounded-none transition-all" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

/* ─── Shared: Toggle Switch ─── */
function Toggle({ on, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      className={`relative inline-flex h-5 w-9 items-center rounded-none transition-colors cursor-pointer border-none shrink-0 ${on ? "bg-indigo-600" : "bg-slate-300"}`}
    >
      <span className={`inline-block h-3.5 w-3.5 transform rounded-none bg-white shadow transition-transform ${on ? "translate-x-4" : "translate-x-0.5"}`} />
    </button>
  );
}

/* ─── Packs data ─── */
const INITIAL_PACKS = [
  { id: "india-cbse", icon: "🏫", name: "India — CBSE / UDISE+", desc: "UDISE+, SARAS, OASIS, SQAAF, APAAR ID, Aadhaar, CWSN and CBSE statutory documents. The flagship pack for CBSE affiliated schools.", installed: false },
  { id: "india-state", icon: "🏫", name: "India — State Board / UDISE+", desc: "UDISE+ student, teacher and school fields plus common statutory documents, without CBSE-only affiliation (SARAS/OASIS).", installed: false },
  { id: "kenya-cbc", icon: "🚩", name: "Kenya — CBC / NEMIS", desc: "NEMIS UPI / assessment number, county and CBC learner fields for Kenyan schools. Hides India-only columns.", installed: false },
  { id: "generic", icon: "🌐", name: "Generic / International", primary: true, desc: "No country-specific statutory fields. Hides India-only columns (caste, BPL, RTE, Aadhaar). Safe default for schools outside India/Kenya.", installed: true },
];

function getView(pathname) {
  if (pathname.includes("school-profile")) return "school-profile";
  if (pathname.includes("field-settings")) return "field-settings";
  if (pathname.includes("document-vault")) return "document-vault";
  if (pathname.includes("checklist")) return "checklist";
  if (pathname.includes("packs")) return "packs";
  if (pathname.includes("data-records")) return "data-records";
  if (pathname.includes("data-validator")) return "data-validator";
  if (pathname.includes("government-reports")) return "government-reports";
  if (pathname.includes("inspections")) return "inspections";
  if (pathname.includes("calendar")) return "calendar";
  return "overview";
}

export default function ComplianceDashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const view = getView(location.pathname);

  const [packs, setPacks] = useState(INITIAL_PACKS);
  const [toast, setToast] = useState(null);

  // School Profile state
  const [profile, setProfile] = useState({
    udiseCode: "", recognitionNo: "", recognitionDate: "",
    managementType: "Private Unaided", schoolCategory: "Higher Secondary (I–XII)",
    board: "State Board", minorityGroup: "", yearEstablished: "",
    medEnglish: false, medHindi: false, medRegional: false, medOther: false,
  });

  // Field Settings state
  const [fieldTab, setFieldTab] = useState("Student");
  const [coreFields, setCoreFields] = useState({
    Caste: false, "Sub Caste": false, BPL: false,
    RTE: false, "Father Aadhaar": true, "Mother Aadhaar": true,
    "Blood Group": true, Religion: true,
  });

  // Document Vault state
  const [docTab, setDocTab] = useState("School");
  const [docView, setDocView] = useState("list"); // "list" | "add"
  const [documents, setDocuments] = useState([]);
  const [docSearch, setDocSearch] = useState("");
  const [docCategory, setDocCategory] = useState("All categories");
  const [newDoc, setNewDoc] = useState({
    ownerType: "School", category: "Other", title: "", docNo: "",
    issuingAuthority: "", issueDate: "", expiryDate: "",
    remind60: false, remind30: true, remind14: false, remind7: true,
    notes: "",
  });

  // Data Records state
  const [recordRole, setRecordRole] = useState("Students");
  const [recordView, setRecordView] = useState("List");
  const [isBulkEntry, setIsBulkEntry] = useState(false);

  // Data Validator state
  const [validatorRole, setValidatorRole] = useState("Students");
  const [isValidated, setIsValidated] = useState(false);
  const [validatorSearch, setValidatorSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All checks");

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const handleInstall = (id) => { setPacks(prev => prev.map(p => p.id === id ? { ...p, installed: true } : p)); showToast("Pack installed!"); };
  const handleUninstall = (id) => { setPacks(prev => prev.map(p => p.id === id ? { ...p, installed: false } : p)); showToast("Pack uninstalled."); };

  const handleSaveProfile = (e) => { e.preventDefault(); showToast("School profile saved!"); };
  const handleSaveFields = (e) => { e.preventDefault(); showToast("Field settings saved!"); };

  const handleSaveDoc = (e) => {
    e.preventDefault();
    if (!newDoc.title.trim()) return;
    setDocuments(prev => [...prev, { ...newDoc, id: Date.now(), status: "Valid", verified: false }]);
    setNewDoc({ ownerType: "School", category: "Other", title: "", docNo: "", issuingAuthority: "", issueDate: "", expiryDate: "", remind60: false, remind30: true, remind14: false, remind7: true, notes: "" });
    setDocView("list");
    showToast("Document saved successfully!");
  };

  const goBack = () => navigate("/compliance/overview");

  // Sync docView when navigating away
  useEffect(() => { if (view !== "document-vault") setDocView("list"); }, [view]);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-5 font-sans text-gray-800 relative">

      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 bg-emerald-600 text-white font-bold text-xs px-4 py-3 rounded-none shadow-xl z-50 flex items-center gap-2">
          <CheckCircle className="w-4 h-4" /><span>{toast}</span>
        </div>
      )}

      {/* ══════════════ OVERVIEW ══════════════ */}
      {view === "overview" && (
        <div className="space-y-5 animate-in fade-in duration-150">
          <div className="flex flex-wrap justify-between items-start gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-indigo-600" />
                <h1 className="text-2xl font-bold text-slate-850 tracking-tight">Compliance &amp; Governance</h1>
              </div>
              <p className="text-slate-450 text-xs font-semibold mt-0.5 ml-8">Inspection-readiness, statutory documents and government reporting — one place.</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-none flex items-center gap-1.5 cursor-pointer shadow-sm">
                <HelpCircle className="w-3.5 h-3.5" /> Why this module?
              </button>
              <button onClick={() => navigate("/compliance/packs")} className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-none flex items-center gap-1.5 shadow-md cursor-pointer border-none active:scale-95 transition-all">
                <Package className="w-4 h-4" /> Manage Compliance Packs
              </button>
            </div>
          </div>

          {/* What to do next */}
          <div className="bg-white border border-slate-200 rounded-none shadow-3xs overflow-hidden">
            <div className="flex justify-between items-center px-5 py-3 border-b bg-amber-50/50">
              <div className="flex items-center gap-2 text-amber-700 font-bold text-xs"><span>⚡</span><span>What to do next</span></div>
              <span className="text-[10px] text-orange-500 font-extrabold">2 open item(s) 🔄</span>
            </div>
            <div className="flex items-center justify-between px-5 py-4 border-b hover:bg-slate-50/20">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-none bg-red-50 flex items-center justify-center shrink-0 mt-0.5"><AlertTriangle className="w-4 h-4 text-red-500" /></div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Fix 249 data validation error(s)</h3>
                  <p className="text-[11px] mt-0.5"><span className="text-red-500 font-extrabold">Critical</span><span className="text-slate-400 font-semibold ml-2">These block a clean government export — invalid Aadhaar, duplicate APAAR, bad dates.</span></p>
                </div>
              </div>
              <button className="px-4 py-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-[11px] font-bold rounded-none cursor-pointer flex items-center gap-1 whitespace-nowrap">Open validator <ChevronRight className="w-3.5 h-3.5" /></button>
            </div>
            <div className="flex items-center justify-between px-5 py-4 hover:bg-slate-50/20">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-none bg-blue-50 flex items-center justify-center shrink-0 mt-0.5"><School className="w-4 h-4 text-blue-500" /></div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Complete the school compliance profile</h3>
                  <p className="text-[11px] mt-0.5"><span className="text-amber-500 font-extrabold">Medium</span><span className="text-slate-400 font-semibold ml-2">3 of 6 key fields are still blank (udise code, established year, recognition no).</span></p>
                </div>
              </div>
              <button onClick={() => navigate("/compliance/school-profile")} className="px-4 py-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-[11px] font-bold rounded-none cursor-pointer flex items-center gap-1 whitespace-nowrap">Edit profile <ChevronRight className="w-3.5 h-3.5" /></button>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs flex flex-col items-center space-y-2">
              <div className="flex items-center gap-1 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider self-start"><BookOpen className="w-3 h-3" /> UDISE READY</div>
              <CircleGauge pct={29} color="#e05a2b" label="READY" />
            </div>
            <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs flex flex-col items-center space-y-2">
              <div className="flex items-center gap-1 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider self-start"><BookOpen className="w-3 h-3" /> CBSE READY</div>
              <div className="flex flex-col items-center gap-2 py-2">
                <div className="w-20 h-20 rounded-none border-4 border-slate-200 flex items-center justify-center"><span className="text-slate-400 font-extrabold text-lg">N/A</span></div>
                <button onClick={() => navigate("/compliance/packs")} className="text-[11px] text-indigo-500 hover:underline font-bold cursor-pointer bg-transparent border-none">Install the CBSE pack</button>
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs flex flex-col items-center space-y-2">
              <div className="flex items-center gap-1 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider self-start">❤️ SCHOOL HEALTH</div>
              <CircleGauge pct={62} color="#e07a2b" label="READY" />
            </div>
            <div className="bg-red-50 border border-red-200 rounded-none p-5 shadow-3xs flex flex-col justify-center space-y-2">
              <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">RISK</div>
              <div className="flex items-center gap-2"><Shield className="w-5 h-5 text-red-500" /><span className="text-red-600 font-extrabold text-lg">High</span></div>
              <p className="text-[11px] text-slate-500 font-semibold">• 249 data validation error(s)</p>
            </div>
          </div>

          {/* UDISE readiness */}
          <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs space-y-4">
            <div className="flex items-center gap-2 border-b pb-3"><BookOpen className="w-4 h-4 text-indigo-500" /><h3 className="font-bold text-slate-800 text-sm">How UDISE readiness is calculated</h3></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-semibold">
              <div className="space-y-2">
                <div className="flex justify-between"><span className="text-slate-700 font-bold">School profile</span><span className="text-orange-500 font-extrabold">50%</span></div>
                <ProgressBar pct={50} color="#e05a2b" />
                <p className="text-[10px] text-slate-400 font-semibold">1/6 key fields filled</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between"><span className="text-slate-700 font-bold">Data quality</span><span className="text-red-500 font-extrabold">14%</span></div>
                <ProgressBar pct={14} color="#ef4444" />
                <p className="text-[10px] text-slate-400 font-semibold">249 validation error(s)</p>
              </div>
            </div>
          </div>

          {/* Installed Packs */}
          <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs space-y-4">
            <div className="flex items-center gap-2 border-b pb-3"><Package className="w-4 h-4 text-indigo-500" /><h3 className="font-bold text-slate-800 text-sm">Installed Packs</h3></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold">
              {packs.filter(p => p.installed).map(p => (
                <div key={p.id} className="border border-slate-200 rounded-none p-4 space-y-2 hover:border-indigo-300 transition-all">
                  <div className="flex items-start justify-between">
                    <h4 className="font-bold text-slate-800 text-[11px] leading-tight">{p.icon} {p.name}</h4>
                    {p.primary && <span className="bg-teal-50 text-teal-600 border border-teal-200 text-[9px] font-extrabold px-1.5 py-0.5 rounded-none shrink-0">Primary</span>}
                  </div>
                  <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════ COMPLIANCE PACKS ══════════════ */}
      {view === "packs" && (
        <div className="space-y-5 animate-in fade-in duration-150">
          <div className="flex justify-between items-start gap-3">
            <div>
              <div className="flex items-center gap-2"><Package className="w-6 h-6 text-indigo-600" /><h1 className="text-2xl font-bold text-slate-850 tracking-tight">Compliance Packs</h1></div>
              <p className="text-slate-450 text-xs font-semibold mt-0.5 ml-8">Install the country/board pack for your school. Uninstalling never deletes saved field values.</p>
            </div>
            <button onClick={goBack} className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-none flex items-center gap-1.5 cursor-pointer">← Back</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {packs.map(pack => (
              <div key={pack.id} className={`bg-white border rounded-none p-5 shadow-3xs space-y-3 flex flex-col transition-all ${pack.primary ? "border-teal-300 bg-teal-50/20" : "border-slate-200 hover:border-indigo-300 hover:shadow-md"}`}>
                <div className="flex items-start justify-between">
                  <span className="text-2xl">{pack.icon}</span>
                  {pack.primary && <span className="bg-teal-50 text-teal-600 border border-teal-200 text-[9px] font-extrabold px-1.5 py-0.5 rounded-none">Primary</span>}
                </div>
                <h3 className="font-bold text-slate-800 text-sm leading-snug">{pack.name}</h3>
                <p className="text-[11px] text-slate-500 font-semibold leading-relaxed flex-1">{pack.desc}</p>
                <div className="pt-2">
                  {pack.installed
                    ? <button onClick={() => handleUninstall(pack.id)} className="flex items-center gap-1.5 px-4 py-2 border border-slate-300 bg-white hover:bg-red-50 hover:border-red-300 hover:text-red-600 text-slate-600 text-xs font-bold rounded-none cursor-pointer transition-all"><X className="w-3.5 h-3.5" /> Uninstall</button>
                    : <button onClick={() => handleInstall(pack.id)} className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-none cursor-pointer border-none shadow active:scale-95 transition-all"><Download className="w-3.5 h-3.5" /> + Install</button>
                  }
                </div>
              </div>
            ))}
          </div>
          <div className="bg-indigo-50 border border-indigo-200 rounded-none p-4 flex items-start gap-3 text-[11px] text-indigo-700 font-semibold">
            <Info className="w-4 h-4 shrink-0 mt-0.5 text-indigo-500" />
            <div><strong>Only one pack can be Primary at a time.</strong> Installing a country-specific pack over Generic will not delete any existing field data — all values are preserved.</div>
          </div>
        </div>
      )}

      {/* ══════════════ SCHOOL PROFILE ══════════════ */}
      {view === "school-profile" && (
        <div className="space-y-5 animate-in fade-in duration-150">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2"><School className="w-6 h-6 text-indigo-600" /><h1 className="text-2xl font-bold text-slate-850 tracking-tight">School Compliance Profile</h1></div>
              <p className="text-slate-450 text-xs font-semibold mt-0.5 ml-8">Institutional data for UDISE+, SARAS/OASIS and SQAAF. Sections shown depend on your installed pack.</p>
            </div>
            <button onClick={goBack} className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-none flex items-center gap-1.5 cursor-pointer">← Back</button>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs space-y-5 text-xs font-semibold">
              {/* Section header */}
              <div className="flex items-center gap-2 border-b pb-3 text-[11px] font-extrabold text-indigo-600 uppercase tracking-wider">
                <Shield className="w-4 h-4" /> Identity &amp; Recognition
              </div>

              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-600 font-bold">UDISE+ Code</label>
                  <input type="text" value={profile.udiseCode} onChange={e => setProfile(p => ({ ...p, udiseCode: e.target.value }))} className="w-full px-3 py-2.5 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white text-xs" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-600 font-bold">Recognition No.</label>
                  <input type="text" value={profile.recognitionNo} onChange={e => setProfile(p => ({ ...p, recognitionNo: e.target.value }))} className="w-full px-3 py-2.5 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white text-xs" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-600 font-bold">Recognition Date</label>
                  <input type="date" value={profile.recognitionDate} onChange={e => setProfile(p => ({ ...p, recognitionDate: e.target.value }))} className="w-full px-3 py-2.5 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white text-xs" />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-600 font-bold">Management Type</label>
                  <select value={profile.managementType} onChange={e => setProfile(p => ({ ...p, managementType: e.target.value }))} className="w-full px-3 py-2.5 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white text-xs">
                    {["Private Unaided", "Private Aided", "Government", "Government Aided", "Central Government"].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-600 font-bold">School Category</label>
                  <select value={profile.schoolCategory} onChange={e => setProfile(p => ({ ...p, schoolCategory: e.target.value }))} className="w-full px-3 py-2.5 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white text-xs">
                    {["Primary (I–V)", "Upper Primary (I–VIII)", "Secondary (I–X)", "Higher Secondary (I–XII)", "Higher Secondary (VI–XII)"].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-600 font-bold">Board</label>
                  <select value={profile.board} onChange={e => setProfile(p => ({ ...p, board: e.target.value }))} className="w-full px-3 py-2.5 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white text-xs">
                    {["State Board", "CBSE", "ICSE", "IB", "NIOS", "Other"].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-600 font-bold">Minority Group</label>
                  <input type="text" value={profile.minorityGroup} onChange={e => setProfile(p => ({ ...p, minorityGroup: e.target.value }))} className="w-full px-3 py-2.5 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white text-xs" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-600 font-bold">Year Established</label>
                  <input type="text" value={profile.yearEstablished} onChange={e => setProfile(p => ({ ...p, yearEstablished: e.target.value }))} className="w-full px-3 py-2.5 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white text-xs" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-600 font-bold">Medium(s) of Instruction</label>
                  <div className="flex flex-wrap items-center gap-4 pt-1.5">
                    {[["English", "medEnglish"], ["Hindi", "medHindi"], ["Regional", "medRegional"], ["Other", "medOther"]].map(([label, key]) => (
                      <div key={key} className="flex items-center gap-1.5">
                        <Toggle on={profile[key]} onChange={v => setProfile(p => ({ ...p, [key]: v }))} />
                        <span className="text-slate-600 font-semibold">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button type="submit" className="flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-none cursor-pointer border-none shadow active:scale-95 transition-all">
                <Save className="w-3.5 h-3.5" /> Save Profile
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ══════════════ FIELD SETTINGS ══════════════ */}
      {view === "field-settings" && (
        <div className="space-y-5 animate-in fade-in duration-150">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2"><Filter className="w-6 h-6 text-indigo-600" /><h1 className="text-2xl font-bold text-slate-850 tracking-tight">Field Settings</h1></div>
              <p className="text-slate-450 text-xs font-semibold mt-0.5 ml-8">Show, hide, require or rename compliance and core fields for your school.</p>
            </div>
            <button onClick={goBack} className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-none flex items-center gap-1.5 cursor-pointer">← Back</button>
          </div>

          {/* Tab row */}
          <div className="flex items-center gap-0 border border-slate-200 rounded-none overflow-hidden w-fit text-xs font-bold">
            {["Student", "Staff", "School"].map(tab => (
              <button key={tab} onClick={() => setFieldTab(tab)}
                className={`px-6 py-2 cursor-pointer border-none transition-colors ${fieldTab === tab ? "bg-indigo-600 text-white" : "bg-white text-slate-600 hover:bg-slate-50"}`}>
                {tab}
              </button>
            ))}
          </div>

          <form onSubmit={handleSaveFields} className="space-y-4">
            {/* Core Columns */}
            <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs space-y-4 text-xs font-semibold">
              <div className="border-b pb-3 space-y-1">
                <div className="flex items-center gap-2 text-[11px] font-extrabold text-indigo-600 uppercase tracking-wider">
                  <Shield className="w-4 h-4" /> Core Columns
                </div>
                <p className="text-[10px] text-indigo-400 font-semibold">Existing built-in fields. Hide the ones your school does not use.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-4">
                {Object.entries(coreFields).map(([field, val]) => (
                  <div key={field} className="flex items-center gap-3">
                    <Toggle on={val} onChange={v => setCoreFields(p => ({ ...p, [field]: v }))} />
                    <span className="text-slate-700 font-semibold">{field}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <button type="submit" className="flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-none cursor-pointer border-none shadow active:scale-95 transition-all">
                <Save className="w-3.5 h-3.5" /> Save Field Settings
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ══════════════ DOCUMENT VAULT ══════════════ */}
      {view === "document-vault" && docView === "list" && (
        <div className="space-y-5 animate-in fade-in duration-150">
          <div className="flex justify-between items-start gap-3">
            <div>
              <div className="flex items-center gap-2"><FileText className="w-6 h-6 text-indigo-600" /><h1 className="text-2xl font-bold text-slate-850 tracking-tight">Document Vault</h1></div>
              <p className="text-slate-450 text-xs font-semibold mt-0.5 ml-8">Statutory documents with expiry tracking. Files are stored privately.</p>
            </div>
            <button onClick={() => setDocView("add")} className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-none flex items-center gap-1.5 shadow-md cursor-pointer border-none active:scale-95 transition-all">
              <Plus className="w-4 h-4" /> + Add Document
            </button>
          </div>

          {/* Doc tabs */}
          <div className="flex items-center gap-0 border border-slate-200 rounded-none overflow-hidden w-fit text-xs font-bold">
            {["School", "Staff"].map(tab => (
              <button key={tab} onClick={() => setDocTab(tab)} className={`px-6 py-2 cursor-pointer border-none transition-colors ${docTab === tab ? "bg-indigo-600 text-white" : "bg-white text-slate-600 hover:bg-slate-50"}`}>{tab}</button>
            ))}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200 rounded-none p-4 shadow-3xs flex items-center gap-3">
              <div className="w-8 h-8 rounded-none bg-red-50 flex items-center justify-center"><X className="w-4 h-4 text-red-500" /></div>
              <div><div className="text-2xl font-black text-red-500">0</div><div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Expired</div></div>
            </div>
            <div className="bg-white border border-slate-200 rounded-none p-4 shadow-3xs flex items-center gap-3">
              <div className="w-8 h-8 rounded-none bg-amber-50 flex items-center justify-center"><AlertTriangle className="w-4 h-4 text-amber-500" /></div>
              <div><div className="text-2xl font-black text-amber-500">0</div><div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Expiring</div></div>
            </div>
            <div className="bg-white border border-slate-200 rounded-none p-4 shadow-3xs flex items-center gap-3">
              <div className="w-8 h-8 rounded-none bg-emerald-50 flex items-center justify-center"><CheckCircle className="w-4 h-4 text-emerald-500" /></div>
              <div><div className="text-2xl font-black text-emerald-500">{documents.length}</div><div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Valid</div></div>
            </div>
          </div>

          {/* Search + Filter */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input type="text" value={docSearch} onChange={e => setDocSearch(e.target.value)} placeholder="Title, document no. or authority..." className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-none text-xs font-semibold focus:outline-none focus:border-indigo-600 bg-white" />
            </div>
            <div className="space-y-0">
              <select value={docCategory} onChange={e => setDocCategory(e.target.value)} className="px-3 py-2.5 border border-slate-300 rounded-none text-xs font-semibold focus:outline-none focus:border-indigo-600 bg-white">
                <option>All categories</option><option>Other</option><option>Affiliation</option><option>NOC</option>
              </select>
            </div>
            <button className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-none cursor-pointer border-none flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" /> Filter
            </button>
          </div>

          {/* Documents table */}
          <div className="bg-white border border-slate-200 rounded-none overflow-hidden shadow-3xs">
            <div className="flex items-center justify-between px-5 py-3 border-b">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700"><FileText className="w-4 h-4 text-indigo-500" /><span>School Documents</span></div>
              <span className="text-[10px] text-slate-400 font-semibold">{documents.length} document(s)</span>
            </div>
            {documents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 space-y-3">
                <div className="w-12 h-12 rounded-none bg-indigo-50 flex items-center justify-center text-2xl">📂</div>
                <h3 className="font-bold text-slate-700 text-sm">No documents yet</h3>
                <p className="text-[11px] text-slate-400 font-semibold text-center">Add your first school document to start tracking <span className="text-indigo-500">expiry</span>.</p>
                <button onClick={() => setDocView("add")} className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-none cursor-pointer border-none shadow active:scale-95 transition-all">Add Document</button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-indigo-50 border-b border-slate-200 text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider">
                      <th className="py-3 px-4 border-r">Title</th><th className="py-3 px-4 border-r">Category</th><th className="py-3 px-4 border-r">Doc No.</th>
                      <th className="py-3 px-4 border-r">Issue</th><th className="py-3 px-4 border-r">Expiry</th><th className="py-3 px-4 border-r">Status</th>
                      <th className="py-3 px-4 border-r">Verified</th><th className="py-3 px-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-semibold">
                    {documents.filter(d => !docSearch || d.title.toLowerCase().includes(docSearch.toLowerCase())).map(d => (
                      <tr key={d.id} className="hover:bg-slate-50/5">
                        <td className="py-3 px-4 border-r font-bold text-slate-800">{d.title}</td>
                        <td className="py-3 px-4 border-r text-slate-500">{d.category}</td>
                        <td className="py-3 px-4 border-r text-slate-500">{d.docNo || "—"}</td>
                        <td className="py-3 px-4 border-r text-slate-500">{d.issueDate || "—"}</td>
                        <td className="py-3 px-4 border-r text-slate-500">{d.expiryDate || "Never"}</td>
                        <td className="py-3 px-4 border-r"><span className="bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-extrabold px-2 py-0.5 rounded-none">Valid</span></td>
                        <td className="py-3 px-4 border-r text-slate-400">—</td>
                        <td className="py-2.5 px-4 text-center"><button onClick={() => setDocuments(prev => prev.filter(x => x.id !== d.id))} className="text-red-400 hover:text-red-600 cursor-pointer border-none bg-transparent p-1"><Trash2 className="w-3.5 h-3.5" /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ══════════════ ADD DOCUMENT ══════════════ */}
      {view === "document-vault" && docView === "add" && (
        <div className="space-y-5 animate-in fade-in duration-150">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2"><Plus className="w-6 h-6 text-indigo-600" /><h1 className="text-xl font-bold text-slate-850 tracking-tight">+ Add Document</h1></div>
            </div>
            <button onClick={() => setDocView("list")} className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-none flex items-center gap-1.5 cursor-pointer">← Back</button>
          </div>

          <form onSubmit={handleSaveDoc} className="space-y-0">
            <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs space-y-5 text-xs font-semibold">

              {/* Row 1: Owner type + Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-600 font-bold">Owner Type</label>
                  <select value={newDoc.ownerType} onChange={e => setNewDoc(p => ({ ...p, ownerType: e.target.value }))} className="w-full px-3 py-2.5 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white">
                    <option>School</option><option>Staff</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-600 font-bold">Category</label>
                  <select value={newDoc.category} onChange={e => setNewDoc(p => ({ ...p, category: e.target.value }))} className="w-full px-3 py-2.5 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white">
                    <option>Other</option><option>Affiliation</option><option>NOC</option><option>Registration</option>
                  </select>
                  <p className="text-[10px] text-indigo-400 font-semibold">Categories come from your installed Compliance Pack.</p>
                </div>
              </div>

              {/* Row 2: Title, Doc No, Issuing Authority */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-600 font-bold">Title <span className="text-red-500">*</span></label>
                  <input type="text" required value={newDoc.title} onChange={e => setNewDoc(p => ({ ...p, title: e.target.value }))} className="w-full px-3 py-2.5 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-600 font-bold">Document No.</label>
                  <input type="text" value={newDoc.docNo} onChange={e => setNewDoc(p => ({ ...p, docNo: e.target.value }))} className="w-full px-3 py-2.5 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-600 font-bold">Issuing Authority</label>
                  <input type="text" value={newDoc.issuingAuthority} onChange={e => setNewDoc(p => ({ ...p, issuingAuthority: e.target.value }))} className="w-full px-3 py-2.5 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white" />
                </div>
              </div>

              {/* Row 3: Issue Date, Expiry Date, Remind toggles */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                <div className="space-y-1.5">
                  <label className="text-slate-600 font-bold">Issue Date</label>
                  <input type="date" value={newDoc.issueDate} onChange={e => setNewDoc(p => ({ ...p, issueDate: e.target.value }))} className="w-full px-3 py-2.5 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-600 font-bold">Expiry Date</label>
                  <input type="date" value={newDoc.expiryDate} onChange={e => setNewDoc(p => ({ ...p, expiryDate: e.target.value }))} className="w-full px-3 py-2.5 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white" />
                  <p className="text-[10px] text-slate-400 font-semibold">Leave blank if it never expires.</p>
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-600 font-bold">Remind me (days before expiry)</label>
                  <div className="flex items-center gap-3 pt-1">
                    {[["60d", "remind60"], ["30d", "remind30"], ["14d", "remind14"], ["7d", "remind7"]].map(([label, key]) => (
                      <div key={key} className="flex items-center gap-1">
                        <Toggle on={newDoc[key]} onChange={v => setNewDoc(p => ({ ...p, [key]: v }))} />
                        <span className="text-slate-600 font-semibold text-[10px]">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 4: File upload */}
              <div className="space-y-1.5">
                <label className="text-slate-600 font-bold">File (PDF / image / doc, max 10 MB)</label>
                <input type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" className="text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:border file:border-slate-300 file:rounded file:text-xs file:font-semibold file:bg-white file:text-slate-700 file:cursor-pointer hover:file:bg-slate-50" />
              </div>

              {/* Row 5: Notes */}
              <div className="space-y-1.5">
                <label className="text-slate-600 font-bold">Notes</label>
                <textarea value={newDoc.notes} onChange={e => setNewDoc(p => ({ ...p, notes: e.target.value }))} rows={4} className="w-full px-3 py-2.5 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white resize-none" />
              </div>

              <div className="pt-1">
                <button type="submit" className="flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-none cursor-pointer border-none shadow active:scale-95 transition-all">
                  <Save className="w-3.5 h-3.5" /> Save Document
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* ══════════════ COMPLIANCE CHECKLIST ══════════════ */}
      {view === "checklist" && (
        <div className="space-y-5 animate-in fade-in duration-150">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2"><CheckSquare className="w-6 h-6 text-indigo-600" /><h1 className="text-2xl font-bold text-slate-850 tracking-tight">Compliance Checklist</h1></div>
              <p className="text-slate-450 text-xs font-semibold mt-0.5 ml-8">Every document your installed pack expects, matched against what is on file.</p>
            </div>
            <button onClick={() => navigate("/compliance/document-vault")} className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-none flex items-center gap-1.5 cursor-pointer">
              <FileText className="w-3.5 h-3.5" /> Document Vault
            </button>
          </div>

          {/* Readiness card */}
          <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-sm">School Document Readiness</h3>
              <span className="text-red-500 font-extrabold text-sm">0%</span>
            </div>
            <p className="text-[10px] text-slate-400 font-semibold">0 on file · 0 expiring · 0 expired · 0 missing (of 0)</p>
          </div>

          {/* Empty state */}
          <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs">
            <div className="flex flex-col items-center justify-center py-16 space-y-3">
              <div className="w-12 h-12 rounded-none bg-indigo-50 flex items-center justify-center">
                <CheckSquare className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="font-bold text-slate-700 text-sm">No document categories</h3>
              <p className="text-[11px] text-indigo-400 font-semibold text-center">Your installed pack defines no document categories.</p>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════ DATA RECORDS ══════════════ */}
      {view === "data-records" && (
        <div className="space-y-5 animate-in fade-in duration-150">
          <div className="flex justify-between items-start gap-3">
            <div>
              {!isBulkEntry ? (
                <>
                  <div className="flex items-center gap-2"><UserCheck className="w-6 h-6 text-slate-850" /><h1 className="text-2xl font-bold text-slate-850 tracking-tight">Compliance Data Records</h1></div>
                  <p className="text-slate-450 text-xs font-semibold mt-0.5 ml-8">Capture pack fields (APAAR, CWSN, TET ...) on each student and staff record.</p>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2"><Grid className="w-6 h-6 text-slate-850" /><h1 className="text-2xl font-bold text-slate-850 tracking-tight">Bulk Compliance Entry</h1></div>
                  <p className="text-slate-450 text-xs font-semibold mt-0.5 ml-8">Fill pack fields for a whole class at once, or round-trip the data through Excel.</p>
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              {!isBulkEntry ? (
                <button onClick={() => setIsBulkEntry(true)} className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-none flex items-center gap-1.5 shadow-md cursor-pointer border-none active:scale-95 transition-all">
                  <Grid className="w-4 h-4" /> Bulk entry
                </button>
              ) : (
                <>
                  <button onClick={() => setIsBulkEntry(false)} className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-none flex items-center gap-1.5 cursor-pointer shadow-sm">
                    <FileDown className="w-3.5 h-3.5" /> Download CSV
                  </button>
                  <button className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-none flex items-center gap-1.5 cursor-pointer shadow-sm">
                    <FileUp className="w-3.5 h-3.5" /> Import CSV
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Roles Toggle */}
            <div className="flex items-center border border-slate-200 rounded-none p-1 bg-white">
              <button 
                onClick={() => setRecordRole("Students")}
                className={`px-4 py-1.5 rounded-none text-xs font-bold transition-colors cursor-pointer border-none ${recordRole === "Students" ? "bg-indigo-600 text-white" : "bg-transparent text-slate-600 hover:bg-slate-50"}`}
              >
                Students
              </button>
              <button 
                onClick={() => setRecordRole("Staff")}
                className={`px-4 py-1.5 rounded-none text-xs font-bold transition-colors cursor-pointer border-none ${recordRole === "Staff" ? "bg-indigo-600 text-white" : "bg-transparent text-slate-600 hover:bg-slate-50"}`}
              >
                Staff
              </button>
            </div>

            {/* View Toggle */}
            <div className="flex items-center border border-slate-200 rounded-none p-1 bg-white">
              <button 
                onClick={() => setRecordView("List")}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-none text-xs font-bold transition-colors cursor-pointer border-none ${recordView === "List" ? "bg-indigo-600 text-white" : "bg-transparent text-slate-600 hover:bg-slate-50"}`}
              >
                <Menu className="w-3.5 h-3.5" /> List
              </button>
              <button 
                onClick={() => setRecordView("Grid")}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-none text-xs font-bold transition-colors cursor-pointer border-none ${recordView === "Grid" ? "bg-indigo-600 text-white" : "bg-transparent text-slate-600 hover:bg-slate-50"}`}
              >
                <Grid className="w-3.5 h-3.5" /> Grid
              </button>
            </div>
          </div>

          {/* Info Banner */}
          <div className="bg-indigo-50/50 border border-indigo-100 rounded-none p-3 flex items-center gap-2 text-[11px] text-indigo-500 font-semibold">
            <Info className="w-4 h-4 shrink-0" />
            Showing students on the current session roster (excludes left / passed-out / disabled students).
          </div>

          {/* Empty State */}
          <div className="bg-white border border-slate-200 rounded-none p-8 shadow-3xs">
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <div className="w-10 h-10 rounded-none bg-indigo-50 flex items-center justify-center">
                <Filter className="w-5 h-5 text-indigo-400" />
              </div>
              <div className="text-center space-y-1">
                <h3 className="font-bold text-slate-700 text-sm">No compliance fields active for student</h3>
                <p className="text-[11px] text-slate-500 font-semibold">
                  <button onClick={() => navigate("/compliance/packs")} className="text-orange-500 hover:underline bg-transparent border-none cursor-pointer">Install a pack</button> or enable fields in <button onClick={() => navigate("/compliance/field-settings")} className="text-orange-500 hover:underline bg-transparent border-none cursor-pointer">Field Settings</button>.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════ DATA VALIDATOR ══════════════ */}
      {view === "data-validator" && (
        <div className="space-y-5 animate-in fade-in duration-150">
          {/* Success Banner */}
          {isValidated && (
            <div className="bg-emerald-500 text-white px-5 py-3 rounded-none text-sm font-bold flex items-center justify-between">
              <span>Validation passed — no issues found.</span>
              <button onClick={() => setIsValidated(false)} className="text-white hover:text-emerald-100 cursor-pointer bg-transparent border-none p-1">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Header */}
          <div className="flex justify-between items-start gap-3">
            <div>
              <div className="flex items-center gap-2"><CheckCheck className="w-6 h-6 text-slate-850" /><h1 className="text-2xl font-bold text-slate-850 tracking-tight">Data Validator</h1></div>
              <p className="text-slate-450 text-xs font-semibold mt-0.5 ml-8">Catches missing/duplicate APAAR, invalid Aadhaar checksum, DOB/age, IFSC and category issues before you file.</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-none flex items-center gap-1.5 cursor-pointer shadow-sm">
                <FileDown className="w-3.5 h-3.5" /> Export worklist
              </button>
              <button onClick={() => setIsValidated(true)} className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-none flex items-center gap-1.5 shadow-md cursor-pointer border-none active:scale-95 transition-all">
                <Play className="w-4 h-4" /> Run validation
              </button>
            </div>
          </div>

          {/* Role Toggles (Full width bar) */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <button 
              onClick={() => setValidatorRole("Students")}
              className={`px-6 py-1.5 rounded-none text-xs font-bold transition-colors cursor-pointer border-none ${validatorRole === "Students" ? "bg-indigo-600 text-white" : "bg-transparent text-slate-600 hover:text-indigo-600"}`}
            >
              Students
            </button>
            <button 
              onClick={() => setValidatorRole("Staff")}
              className={`px-6 py-1.5 rounded-none text-xs font-bold transition-colors cursor-pointer border ${validatorRole === "Staff" ? "bg-indigo-600 text-white border-transparent" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`}
            >
              Staff
            </button>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-none p-4 shadow-3xs flex items-center gap-4">
              <div className="w-10 h-10 rounded-none bg-red-50 flex items-center justify-center shrink-0"><XCircle className="w-5 h-5 text-red-500" /></div>
              <div>
                <div className="text-2xl font-black text-slate-800">{isValidated ? "0" : "249"}</div>
                <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">OPEN ERRORS</div>
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-none p-4 shadow-3xs flex items-center gap-4">
              <div className="w-10 h-10 rounded-none bg-amber-50 flex items-center justify-center shrink-0"><AlertCircle className="w-5 h-5 text-amber-500" /></div>
              <div>
                <div className="text-2xl font-black text-slate-800">{isValidated ? "0" : "284"}</div>
                <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">OPEN WARNINGS</div>
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-none p-4 shadow-3xs flex items-center gap-4">
              <div className="w-10 h-10 rounded-none bg-indigo-50 flex items-center justify-center shrink-0"><UserX className="w-5 h-5 text-indigo-500" /></div>
              <div>
                <div className="text-2xl font-black text-slate-800">0</div>
                <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">ACCEPTED EXCEPTIONS</div>
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-none p-4 shadow-3xs flex flex-col justify-center gap-1">
              <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">
                Last run {isValidated ? "0 seconds" : "16 hours"} ago over {isValidated ? "283" : "282"} record(s) by school admin.<br/>
                Active checks: none (install a pack).
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
            {[
              { id: "All checks", label: `All checks (${isValidated ? 0 : 533})` },
              { id: "aadhaar_verhoeff", label: `aadhaar_verhoeff (${isValidated ? 0 : 249})` },
              { id: "dob_age_mismatch", label: `dob_age_mismatch (${isValidated ? 0 : 4})` },
              { id: "invalid_ifsc", label: `invalid_ifsc (${isValidated ? 0 : 1})` },
              { id: "missing_apaar", label: `missing_apaar (${isValidated ? 0 : 279})` }
            ].map(f => (
              <button 
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-4 py-1.5 rounded-none text-[11px] font-bold transition-colors cursor-pointer border ${activeFilter === f.id ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Find a student</label>
            <div className="flex gap-2">
              <div className="relative flex-1 max-w-sm">
                <input 
                  type="text" 
                  value={validatorSearch}
                  onChange={e => setValidatorSearch(e.target.value)}
                  placeholder="Name or admission no..." 
                  className="w-full px-3 py-2 border border-slate-300 rounded-none text-xs font-semibold focus:outline-none focus:border-indigo-600 bg-white" 
                />
              </div>
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-none cursor-pointer border-none flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5" /> Search
              </button>
            </div>
          </div>

          {/* Findings Table */}
          <div className="bg-white border border-slate-200 rounded-none overflow-hidden shadow-3xs">
            <div className="flex items-center justify-between px-5 py-3 border-b bg-slate-50/50">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700"><ListFilter className="w-4 h-4 text-indigo-500" /><span>Findings</span></div>
              <span className="text-[10px] text-slate-400 font-semibold">{isValidated ? "0" : "533"} finding(s)</span>
            </div>
            
            {isValidated ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-3">
                <div className="w-10 h-10 rounded-none bg-indigo-50 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-indigo-500" />
                </div>
                <div className="text-center space-y-1">
                  <h3 className="font-bold text-slate-700 text-sm">No issues — this data is clean.</h3>
                  <p className="text-[11px] text-slate-500 font-semibold">Last checked 0 seconds ago.</p>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-indigo-50 border-b border-slate-200 text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider">
                      <th className="py-3 px-4 border-r">STUDENT</th>
                      <th className="py-3 px-4 border-r">SEVERITY</th>
                      <th className="py-3 px-4 border-r">CHECK</th>
                      <th className="py-3 px-4 border-r w-1/2">ISSUE</th>
                      <th className="py-3 px-4 text-center">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-semibold">
                    {[
                      "Aarav Chaudhary (YISADM-069)",
                      "Aaryan Mehta (YISADM-263)",
                      "Aaryan Pandey (YISADM-143)",
                      "Aaryan Patel (YISADM-203)",
                      "Aaryan Prakash (YISADM-191)"
                    ].map((name, i) => (
                      <tr key={i} className="hover:bg-slate-50/50">
                        <td className="py-3 px-4 border-r text-slate-800">{name}</td>
                        <td className="py-3 px-4 border-r"><span className="text-red-500 font-extrabold">Error</span></td>
                        <td className="py-3 px-4 border-r text-slate-700">Aadhaar Verhoeff</td>
                        <td className="py-3 px-4 border-r text-slate-500">Failed Aadhaar checksum: National ID / Aadhaar.</td>
                        <td className="py-3 px-4 text-center space-x-2">
                          <button className="px-3 py-1.5 border border-slate-300 rounded-none text-[11px] font-bold text-slate-600 bg-white hover:bg-slate-50 cursor-pointer">Fix</button>
                          <button className="px-3 py-1.5 border border-slate-300 rounded-none text-[11px] font-bold text-slate-600 bg-white hover:bg-slate-50 cursor-pointer">Accept</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ══════════════ GOVERNMENT REPORTS ══════════════ */}
      {view === "government-reports" && (
        <div className="space-y-5 animate-in fade-in duration-150">
          <div className="flex items-start gap-3">
            <div>
              <div className="flex items-center gap-2">
                <FileOutput className="w-6 h-6 text-slate-850" />
                <h1 className="text-2xl font-bold text-slate-850 tracking-tight">Government Reports</h1>
              </div>
              <p className="text-slate-450 text-xs font-semibold mt-0.5 ml-8">One-click UDISE+ exports. Data is validated first — errors are flagged before you download.</p>
            </div>
          </div>

          <div className="bg-indigo-50/50 border border-indigo-100 rounded-none p-3 flex items-center gap-2 text-[11px] text-indigo-500 font-semibold">
            <Info className="w-4 h-4 shrink-0" />
            These are UDISE-format exports for you to verify against the current official template. Official layouts change each year; this is not a live government submission.
          </div>

          <div className="bg-white border border-slate-200 rounded-none p-8 shadow-3xs">
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <div className="w-10 h-10 rounded-none bg-indigo-50 flex items-center justify-center">
                <FileOutput className="w-5 h-5 text-indigo-400" />
              </div>
              <div className="text-center space-y-1">
                <h3 className="font-bold text-slate-700 text-sm">No government reports enabled</h3>
                <p className="text-[11px] text-slate-500 font-semibold">
                  <button onClick={() => navigate("/compliance/packs")} className="text-orange-500 hover:underline bg-transparent border-none cursor-pointer">Install a pack</button> (e.g. India — CBSE) to enable UDISE+ exports.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════ INSPECTION CHECKLISTS ══════════════ */}
      {view === "inspections" && (
        <div className="space-y-5 animate-in fade-in duration-150">
          <div className="flex items-start gap-3">
            <div>
              <div className="flex items-center gap-2">
                <ClipboardList className="w-6 h-6 text-slate-850" />
                <h1 className="text-2xl font-bold text-slate-850 tracking-tight">Inspection Checklists</h1>
              </div>
              <p className="text-slate-450 text-xs font-semibold mt-0.5 ml-8">Work through inspection and affiliation-renewal checklists and track progress.</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-none p-8 shadow-3xs mt-4">
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <div className="w-10 h-10 rounded-none bg-indigo-50 flex items-center justify-center">
                <ClipboardList className="w-5 h-5 text-indigo-400" />
              </div>
              <div className="text-center space-y-1">
                <h3 className="font-bold text-slate-700 text-sm">No inspection checklists enabled</h3>
                <p className="text-[11px] text-slate-500 font-semibold">
                  <button onClick={() => navigate("/compliance/packs")} className="text-orange-500 hover:underline bg-transparent border-none cursor-pointer">Install a pack</button> (e.g. India — CBSE) to enable them.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════ COMPLIANCE CALENDAR ══════════════ */}
      {view === "calendar" && (
        <div className="space-y-5 animate-in fade-in duration-150">
          <div className="flex items-start gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Calendar className="w-6 h-6 text-slate-850" />
                <h1 className="text-2xl font-bold text-slate-850 tracking-tight">Compliance Calendar</h1>
              </div>
              <p className="text-slate-450 text-xs font-semibold mt-0.5 ml-8">Upcoming statutory dates — document expiries, affiliation validity and reporting windows.</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-none overflow-hidden shadow-3xs mt-4">
            <div className="flex items-center justify-between px-5 py-3 border-b bg-slate-50/50">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-600"><Calendar className="w-4 h-4 text-indigo-500" /><span>Upcoming Dates</span></div>
              <span className="text-[10px] text-slate-400 font-semibold">2 event(s)</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-indigo-50 border-b border-slate-200 text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider">
                    <th className="py-3 px-4 border-r">DATE</th>
                    <th className="py-3 px-4 border-r">IN</th>
                    <th className="py-3 px-4 border-r">TYPE</th>
                    <th className="py-3 px-4">EVENT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-semibold">
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 border-r text-slate-700">30 Sep 2026</td>
                    <td className="py-3 px-4 border-r text-slate-700">38d</td>
                    <td className="py-3 px-4 border-r"><span className="px-2.5 py-0.5 rounded-none bg-slate-100 text-slate-500 text-[10px] border border-slate-200 font-bold">Statutory</span></td>
                    <td className="py-3 px-4 text-slate-600">UDISE+ data collection freeze (indicative)</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 border-r text-slate-700">31 Jul 2027</td>
                    <td className="py-3 px-4 border-r text-slate-700">342d</td>
                    <td className="py-3 px-4 border-r"><span className="px-2.5 py-0.5 rounded-none bg-slate-100 text-slate-500 text-[10px] border border-slate-200 font-bold">Statutory</span></td>
                    <td className="py-3 px-4 text-slate-600">SARAS / OASIS annual update window (indicative)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
