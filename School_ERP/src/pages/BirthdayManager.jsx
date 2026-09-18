import React, { useState, useMemo } from "react";
import { 
  Settings, 
  User, 
  Image as ImageIcon, 
  Check, 
  ChevronDown, 
  Sliders, 
  X, 
  Clock, 
  Bell, 
  Mail, 
  Smartphone, 
  AlertCircle 
} from "lucide-react";

// Mock templates list that can be sent to students
const BIRTHDAY_CARDS = [
  { name: "Balloon Blue", desc: "Light theme with balloon visuals" },
  { name: "Bold Party", desc: "Dark theme with confetti design" },
  { name: "Pastel Kids", desc: "Soft pastel green theme" },
  { name: "Confetti Cream", desc: "Cream theme with birthday cupcakes" }
];

// Mock data list matching Screenshot
const LOGGED_BIRTHDAYS = [
  { id: 1, name: "Rahul Dubey", type: "Student", sub: "Class I A", date: "25 Aug", age: 5, when: "in 2 days", status: "—", category: "next-7-days" },
  { id: 2, name: "Shlok/Dubey", nameDisplay: "Shlok Dubey", type: "Student", sub: "Class V A", date: "25 Aug", age: 11, when: "in 2 days", status: "—", category: "next-7-days" },
  { id: 3, name: "Dev Dubey", type: "Student", sub: "Class VIII A", date: "25 Aug", age: 14, when: "in 2 days", status: "—", category: "next-7-days" },
  { id: 4, name: "Darsh Dubey", type: "Student", sub: "Class X A", date: "25 Aug", age: 16, when: "in 2 days", status: "—", category: "next-7-days" },
  { id: 5, name: "Ali Dubey", type: "Student", sub: "Class XII A", date: "25 Aug", age: 18, when: "in 2 days", status: "—", category: "next-7-days" },
  { id: 6, name: "Rajat kumar", type: "Staff", sub: "Staff", date: "28 Aug", age: 32, when: "in 5 days", status: "—", category: "next-7-days" },
  { id: 7, name: "Ananya Desai", type: "Student", sub: "Class II A", date: "30 Aug", age: 5, when: "in 7 days", status: "—", category: "next-7-days" },
  { id: 8, name: "Rudra Chauhan", type: "Student", sub: "Class II A", date: "30 Aug", age: 7, when: "in 7 days", status: "—", category: "next-7-days" },
  { id: 9, name: "Sumit Mehta", type: "Student", sub: "KG A", date: "30 Aug", age: 8, when: "in 7 days", status: "—", category: "next-7-days" },
  { id: 10, name: "Shaurya Pandey", type: "Student", sub: "Class III A", date: "30 Aug", age: 9, when: "in 7 days", status: "—", category: "next-7-days" },
  { id: 11, name: "Kabir Desai", type: "Student", sub: "Class IV A", date: "30 Aug", age: 10, when: "in 7 days", status: "—", category: "next-7-days" },
  
  // Extra data mock for "this-month" category
  { id: 12, name: "Priya Sharma", type: "Student", sub: "Class VII B", date: "15 Aug", age: 12, when: "Passed", status: "Sent (Balloon Blue)", category: "this-month" },
  { id: 13, name: "Arjun Verma", type: "Student", sub: "Class IX A", date: "18 Aug", age: 14, when: "Passed", status: "Sent (Bold Party)", category: "this-month" },
  { id: 14, name: "Nisha Patel", type: "Staff", sub: "Staff", date: "22 Aug", age: 29, when: "Passed", status: "—", category: "this-month" }
];

export default function BirthdayManager() {
  const [activeTab, setActiveTab] = useState("next-7-days"); // "today", "next-7-days", or "this-month"
  const [birthdays, setBirthdays] = useState(LOGGED_BIRTHDAYS);

  // Auto-send Settings Modal
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [autoSendToday, setAutoSendToday] = useState(true);
  const [notifyTeacher, setNotifyTeacher] = useState(true);
  const [selectedDefaultCard, setSelectedDefaultCard] = useState("Balloon Blue");
  const [autoSendTime, setAutoSendTime] = useState("08:00");

  // Dropdown card selector modal
  const [cardSelectForUser, setCardSelectForUser] = useState(null);

  // Success Toast popups
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  // Counts block metrics for tabs
  const tabCounts = useMemo(() => {
    return {
      today: birthdays.filter(b => b.category === "today").length,
      "next-7-days": birthdays.filter(b => b.category === "next-7-days").length,
      "this-month": birthdays.filter(b => b.category === "next-7-days" || b.category === "this-month").length
    };
  }, [birthdays]);

  // Displayed records filtered by tab
  const displayedBirthdays = useMemo(() => {
    if (activeTab === "today") {
      return birthdays.filter(b => b.category === "today");
    }
    if (activeTab === "next-7-days") {
      return birthdays.filter(b => b.category === "next-7-days");
    }
    // "this-month" includes both upcoming 7-day items and month logs
    return birthdays.filter(b => b.category === "next-7-days" || b.category === "this-month");
  }, [activeTab, birthdays]);

  // Save Settings Modal
  const handleSaveSettings = (e) => {
    e.preventDefault();
    setShowSettingsModal(false);
    setToastMsg("Auto-send birthday settings saved successfully!");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Select card template and set status to "Sent"
  const handleSendCard = (cardName) => {
    if (!cardSelectForUser) return;
    
    setBirthdays(prev => prev.map(b => {
      if (b.id === cardSelectForUser.id) {
        return { ...b, status: `Sent (${cardName})` };
      }
      return b;
    }));

    setCardSelectForUser(null);
    setToastMsg(`Birthday greeting "${cardName}" sent to ${cardSelectForUser.name}!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-5 font-sans text-gray-800 relative">
      
      {/* Toast Notification alert */}
      {showToast && (
        <div className="fixed top-20 right-6 bg-slate-900 text-white px-4 py-3 rounded-none shadow-lg flex items-center gap-2 border border-slate-700/50 animate-bounce z-50 text-xs">
          <Check className="w-4 h-4 text-emerald-400" />
          <span className="font-bold">{toastMsg}</span>
        </div>
      )}

      {/* Auto-send Settings Modal Panel */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white text-gray-800 rounded-none p-5 shadow-lg max-w-md w-full space-y-4 border border-slate-200">
            
            <div className="border-b pb-2 flex justify-between items-center">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500">Auto-send Birthday Settings</h3>
              <button 
                onClick={() => setShowSettingsModal(false)}
                className="text-slate-400 hover:text-slate-650 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs font-semibold">
              
              {/* Toggle switch 1 */}
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => setAutoSendToday(!autoSendToday)}
                  className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-none border-2 border-transparent transition-colors duration-150 ease-in-out mt-0.5 focus:outline-none ${autoSendToday ? 'bg-indigo-650' : 'bg-slate-200'}`}
                >
                  <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-none bg-white transition duration-150 ease-in-out ${autoSendToday ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
                <div className="space-y-0.5">
                  <h4 className="text-slate-800 font-extrabold">Automatically send birthday cards</h4>
                  <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                    System will automatically send default birthday cards to students and staff on their birthdays.
                  </p>
                </div>
              </div>

              {/* Toggle switch 2 */}
              <div className="flex items-start gap-3 border-t pt-3">
                <button
                  type="button"
                  onClick={() => setNotifyTeacher(!notifyTeacher)}
                  className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-none border-2 border-transparent transition-colors duration-150 ease-in-out mt-0.5 focus:outline-none ${notifyTeacher ? 'bg-indigo-650' : 'bg-slate-200'}`}
                >
                  <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-none bg-white transition duration-150 ease-in-out ${notifyTeacher ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
                <div className="space-y-0.5">
                  <h4 className="text-slate-800 font-extrabold">Notify class teachers</h4>
                  <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                    Send notification alert to class teachers when it's their student's birthday.
                  </p>
                </div>
              </div>

              {/* Default template selector */}
              <div className="space-y-1 pt-2">
                <label className="font-bold text-slate-650">Default Birthday Creative Card</label>
                <select 
                  value={selectedDefaultCard} 
                  onChange={(e) => setSelectedDefaultCard(e.target.value)}
                  className="w-full px-3 py-2 border rounded-none bg-white font-semibold text-slate-800 focus:outline-none focus:border-indigo-650"
                >
                  {BIRTHDAY_CARDS.map((card) => (
                    <option key={card.name} value={card.name}>{card.name} - ({card.desc})</option>
                  ))}
                </select>
              </div>

              {/* Sending time picker */}
              <div className="space-y-1">
                <label className="font-bold text-slate-650">Scheduled Delivery Time</label>
                <div className="relative flex items-center">
                  <input 
                    type="time" 
                    value={autoSendTime}
                    onChange={(e) => setAutoSendTime(e.target.value)}
                    className="w-full px-3 py-2 border rounded-none font-semibold text-slate-800 focus:outline-none focus:border-indigo-650 bg-white"
                  />
                </div>
              </div>

              {/* Form buttons */}
              <div className="flex justify-end gap-2 pt-2 border-t">
                <button 
                  type="button" 
                  onClick={() => setShowSettingsModal(false)}
                  className="px-3 py-1.5 border border-slate-200 hover:bg-slate-100 rounded-none font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-1.5 bg-indigo-650 hover:bg-indigo-750 text-white rounded-none font-bold cursor-pointer"
                >
                  Save Settings
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Select Card Dropdown/Popup selector for specific student */}
      {cardSelectForUser && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white text-gray-800 rounded-none p-5 shadow-lg max-w-sm w-full space-y-4 border border-slate-200">
            
            <div className="border-b pb-2 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500">Send Birthday Card</h3>
                <p className="text-[10px] text-slate-400 font-semibold">Select template for {cardSelectForUser.name}</p>
              </div>
              <button 
                onClick={() => setCardSelectForUser(null)}
                className="text-slate-400 hover:text-slate-650 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              {BIRTHDAY_CARDS.map((card) => (
                <button
                  key={card.name}
                  onClick={() => handleSendCard(card.name)}
                  className="w-full p-3 border hover:border-indigo-600 hover:bg-indigo-50/10 rounded-none text-left transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-800 text-xs group-hover:text-indigo-650">{card.name}</h4>
                    <p className="text-[10px] text-slate-400 font-semibold">{card.desc}</p>
                  </div>
                  <ImageIcon className="w-4 h-4 text-slate-400 group-hover:text-indigo-500" />
                </button>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* Header Row */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Birthday Manager</h1>
          <p className="text-slate-500 text-sm">Upcoming student & staff birthdays and auto-send status</p>
        </div>
        
        {/* Top Right Auto-send button */}
        <button
          onClick={() => setShowSettingsModal(true)}
          className="px-3.5 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-650 text-xs font-bold rounded-none flex items-center gap-1.5 shadow-3xs cursor-pointer select-none active:scale-95"
        >
          <Sliders className="w-3.5 h-3.5 text-slate-500" />
          Auto-send Settings
        </button>
      </div>

      {/* Category count pills row */}
      <div className="flex flex-wrap gap-2 items-center overflow-x-auto w-full pb-1 border-b border-slate-100">
        
        {/* Today Tab */}
        <button
          onClick={() => setActiveTab("today")}
          className={`px-3.5 py-1.5 font-bold text-xs rounded-none cursor-pointer transition-all border flex items-center gap-1.5 select-none ${
            activeTab === "today" 
              ? "bg-indigo-600 text-white border-indigo-600 shadow-3xs" 
              : "bg-white text-slate-550 border-slate-200/90 hover:bg-slate-50"
          }`}
        >
          <span>Today</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-none font-bold ${
            activeTab === "today" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-400"
          }`}>
            {tabCounts.today}
          </span>
        </button>

        {/* Next 7 Days Tab */}
        <button
          onClick={() => setActiveTab("next-7-days")}
          className={`px-3.5 py-1.5 font-bold text-xs rounded-none cursor-pointer transition-all border flex items-center gap-1.5 select-none ${
            activeTab === "next-7-days" 
              ? "bg-indigo-600 text-white border-indigo-600 shadow-3xs" 
              : "bg-white text-slate-550 border-slate-200/90 hover:bg-slate-50"
          }`}
        >
          <span>Next 7 days</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-none font-bold ${
            activeTab === "next-7-days" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-400"
          }`}>
            {tabCounts["next-7-days"]}
          </span>
        </button>

        {/* This Month Tab */}
        <button
          onClick={() => setActiveTab("this-month")}
          className={`px-3.5 py-1.5 font-bold text-xs rounded-none cursor-pointer transition-all border flex items-center gap-1.5 select-none ${
            activeTab === "this-month" 
              ? "bg-indigo-600 text-white border-indigo-600 shadow-3xs" 
              : "bg-white text-slate-550 border-slate-200/90 hover:bg-slate-50"
          }`}
        >
          <span>This month</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-none font-bold ${
            activeTab === "this-month" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-400"
          }`}>
            {tabCounts["this-month"]}
          </span>
        </button>

      </div>

      {/* Birthdays Table Grid layout */}
      <div className="bg-white border border-slate-200 rounded-none overflow-hidden shadow-3xs">
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200 text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider">
                <th className="py-3.5 px-5 border-r border-slate-200">Name</th>
                <th className="py-3.5 px-5 border-r border-slate-200">Who</th>
                <th className="py-3.5 px-5 border-r border-slate-200">Birthday</th>
                <th className="py-3.5 px-5 border-r border-slate-200">Turning</th>
                <th className="py-3.5 px-5 border-r border-slate-200">When</th>
                <th className="py-3.5 px-5 border-r border-slate-200">Status</th>
                <th className="py-3.5 px-5 text-center">Card</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-650 font-semibold">
              
              {displayedBirthdays.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center space-y-1">
                      <AlertCircle className="w-5 h-5 text-slate-300" />
                      <h4 className="font-extrabold text-xs text-slate-700">No birthdays recorded</h4>
                      <p className="text-[10px] font-semibold text-slate-400 leading-relaxed">
                        Nothing matches these filters yet.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                displayedBirthdays.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/10 transition-colors">
                    
                    {/* Name column */}
                    <td className="py-3.5 px-5 border-r border-slate-100 font-bold text-slate-800">
                      {b.nameDisplay || b.name}
                    </td>
                    
                    {/* Who category column */}
                    <td className="py-3.5 px-5 border-r border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className={`inline-block px-2 py-0.5 rounded-none text-[9px] font-extrabold uppercase border ${
                          b.type === "Student" 
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100/50" 
                            : "bg-blue-50 text-blue-650 border-blue-100/50"
                        }`}>
                          {b.type}
                        </span>
                        <span className="text-[11px] text-slate-400 font-semibold">{b.sub}</span>
                      </div>
                    </td>

                    {/* Birthday date column */}
                    <td className="py-3.5 px-5 border-r border-slate-100 text-slate-500 font-mono">
                      {b.date}
                    </td>

                    {/* Turning age column */}
                    <td className="py-3.5 px-5 border-r border-slate-100 font-bold text-slate-700 text-center md:text-left">
                      {b.age}
                    </td>

                    {/* When time column */}
                    <td className="py-3.5 px-5 border-r border-slate-100 text-slate-500">
                      {b.when}
                    </td>

                    {/* Status column */}
                    <td className="py-3.5 px-5 border-r border-slate-100 font-bold">
                      {b.status === "—" ? (
                        <span className="text-slate-350">—</span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-emerald-600">
                          <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                          {b.status}
                        </span>
                      )}
                    </td>

                    {/* Send Card Dropdown trigger button */}
                    <td className="py-2.5 px-5 text-center">
                      <div className="inline-flex rounded-none border border-slate-200 overflow-hidden shadow-3xs hover:border-indigo-650 bg-white">
                        <button
                          onClick={() => setCardSelectForUser(b)}
                          className="px-3.5 py-1.5 text-slate-650 hover:bg-slate-50 hover:text-indigo-650 font-bold text-[10px] flex items-center gap-1 transition-all cursor-pointer select-none"
                        >
                          <ImageIcon className="w-3.5 h-3.5 text-slate-500" />
                          Card
                        </button>
                        <button 
                          onClick={() => setCardSelectForUser(b)}
                          className="px-1.5 border-l border-slate-200 hover:bg-slate-50 text-slate-450 hover:text-indigo-650 cursor-pointer flex items-center justify-center"
                        >
                          <ChevronDown className="w-3 h-3 text-slate-400" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}

            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
