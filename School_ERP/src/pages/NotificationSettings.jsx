import React, { useState, useMemo } from "react";
import { 
  Bell, 
  Search, 
  HelpCircle, 
  Sliders, 
  Check, 
  Lock, 
  MessageCircle, 
  Edit2, 
  X, 
  Info,
  Mail,
  Smartphone,
  CheckCircle,
  AlertTriangle,
  ChevronRight,
  Settings
} from "lucide-react";

export default function NotificationSettings() {
  // Search input state
  const [searchQuery, setSearchQuery] = useState("");

  // Modals state
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [editingAlert, setEditingAlert] = useState(null);
  
  // Custom template state for the editing modal
  const [tempSubject, setTempSubject] = useState("");
  const [tempBody, setTempBody] = useState("");

  // Notification alerts data state matching the screenshot
  const [alerts, setAlerts] = useState([
    { 
      id: 1, 
      title: "Parent Fee Paid", 
      desc: "Sent to parent when an online fee payment is successful.", 
      status: "Active", 
      email: false, 
      sms: false, 
      whatsapp: true, 
      push: true,
      hasEdit: false,
      iconBg: "bg-blue-50 text-blue-500",
      subject: "Fee Payment Received Successfully",
      body: "Dear Parent, We have received your payment of {fee_amount} for your ward {student_name} on {date}. Thank you!"
    },
    { 
      id: 2, 
      title: "Exam Result", 
      desc: "Sent when exam results are published.", 
      status: "Active", 
      email: false, 
      sms: false, 
      whatsapp: true, 
      push: true,
      hasEdit: true,
      iconBg: "bg-emerald-50 text-emerald-500",
      subject: "Exam Results Published",
      body: "Dear Parent, The results of {exam_name} for {student_name} have been published. Ward's Rank: {rank}, Percentage: {percentage}%. Log in to check details."
    },
    { 
      id: 3, 
      title: "Behaviour Incident", 
      desc: "Sent when a behaviour incident is assigned.", 
      status: "Active", 
      email: false, 
      sms: false, 
      whatsapp: true, 
      push: true,
      hasEdit: true,
      iconBg: "bg-emerald-50 text-emerald-500",
      subject: "Behaviour Incident Notification",
      body: "Dear Parent, A behaviour incident ({incident_title}) has been logged for {student_name} on {date}. Action Taken: {action_taken}."
    },
    { 
      id: 4, 
      title: "Student Leave Apply", 
      desc: "Sent to staff/guardian when leave is applied.", 
      status: "Active", 
      email: false, 
      sms: false, 
      whatsapp: true, 
      push: true,
      hasEdit: false,
      iconBg: "bg-rose-50 text-rose-500",
      subject: "New Student Leave Application",
      body: "Hello, {student_name} has requested leave from {start_date} to {end_date} due to {reason}. Status: Pending review."
    },
    { 
      id: 5, 
      title: "Online Admission Submit", 
      desc: "Sent when online admission form is submitted.", 
      status: "Active", 
      email: false, 
      sms: false, 
      whatsapp: true, 
      push: true,
      hasEdit: true,
      iconBg: "bg-blue-50 text-blue-500",
      subject: "Admission Application Received",
      body: "Dear Applicant, Your application for admission to grade {grade} has been submitted successfully. Your reference code is {reference_number}."
    },
    { 
      id: 6, 
      title: "Fee Submission", 
      desc: "Sent when fees are successfully paid.", 
      status: "Active", 
      email: false, 
      sms: false, 
      whatsapp: true, 
      push: true,
      hasEdit: true,
      iconBg: "bg-blue-50 text-blue-500",
      subject: "School Fee Recieved Confirmation",
      body: "Dear Parent, Your payment of {fee_amount} for receipt {receipt_id} has been recorded successfully."
    },
    { 
      id: 7, 
      title: "Fee Reminder Due", 
      desc: "Sent via Cron Job for pending fees.", 
      status: "Active", 
      email: false, 
      sms: false, 
      whatsapp: true, 
      push: true,
      hasEdit: true,
      iconBg: "bg-blue-50 text-blue-500",
      subject: "URGENT: Outstanding School Fee Reminder",
      body: "Dear Parent, This is a gentle reminder that the school fee of {fee_amount} for {student_name} is overdue. Please settle before {due_date} to avoid late charges."
    },
    { 
      id: 8, 
      title: "Student Absent", 
      desc: "Sent when a student is marked absent.", 
      status: "Active", 
      email: false, 
      sms: false, 
      whatsapp: true, 
      push: true,
      hasEdit: true,
      iconBg: "bg-blue-50 text-blue-500",
      subject: "Absent Notification Alert",
      body: "Dear Parent, Your ward {student_name} was marked absent during attendance taking on {date}."
    }
  ]);

  // Channel credentials settings state (for channel configuration drawer/modal)
  const [smtpHost, setSmtpHost] = useState("smtp.mailtrap.io");
  const [smtpPort, setSmtpPort] = useState("2525");
  const [smtpUser, setSmtpUser] = useState("projectworlds_dev");
  const [twilioSid, setTwilioSid] = useState("ACxxxxxxxxxxxxxxxxxxxxxxxx");
  const [whatsappApiUrl, setWhatsappApiUrl] = useState("https://api.telegram.org/bot59/sendMessage");

  // Toggle dynamic switches
  const handleToggleChannel = (id, channel) => {
    setAlerts(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, [channel]: !item[channel] };
      }
      return item;
    }));
  };

  // Stats derivation
  const totalAlerts = alerts.length;
  const activeAlerts = alerts.filter(a => a.status === "Active").length;
  const whatsappEnabled = alerts.filter(a => a.whatsapp).length;

  // Search filtering
  const filteredAlerts = useMemo(() => {
    if (!searchQuery.trim()) return alerts;
    return alerts.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, alerts]);

  // Open edit template modal
  const handleEditClick = (item) => {
    setEditingAlert(item);
    setTempSubject(item.subject || "");
    setTempBody(item.body || "");
  };

  // Save edited template text
  const handleSaveTemplate = () => {
    setAlerts(prev => prev.map(item => {
      if (item.id === editingAlert.id) {
        return { ...item, subject: tempSubject, body: tempBody };
      }
      return item;
    }));
    setEditingAlert(null);
    alert("Alert template updated successfully!");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-5 font-sans text-gray-800">
      
      {/* 1. HEADER ROW */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-none bg-indigo-600 flex items-center justify-center text-white shadow-sm">
            <Bell className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Notification Center</h1>
            <p className="text-[11px] text-slate-400 font-semibold mt-0.5">Manage how and when you receive automated alerts</p>
          </div>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-2">
          <div className="relative flex items-center">
            <input 
              type="text" 
              placeholder="Search notifications..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 border border-gray-300 rounded-none text-xs font-semibold focus:outline-none focus:border-indigo-500 w-56 bg-white"
            />
            <Search className="absolute left-2.5 w-3.5 h-3.5 text-slate-400" />
          </div>
          <button
            onClick={() => alert("Learn how templates and webhooks process notifications dynamically in settings.")}
            className="px-3.5 py-1.5 border border-gray-300 text-slate-700 bg-white font-semibold text-xs rounded-none hover:bg-slate-50 transition-all flex items-center gap-1.5 shadow-3xs cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
            How it Works
          </button>
        </div>
      </div>

      {/* 2. STATS CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Total Alerts */}
        <div className="bg-white border border-slate-200 rounded-none p-4 flex items-center justify-between shadow-3xs">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Alerts</span>
            <div className="text-2xl font-black text-slate-800">{totalAlerts}</div>
          </div>
          <div className="w-9 h-9 rounded-none bg-slate-50 flex items-center justify-center text-slate-500 border">
            <Bell className="w-4 h-4" />
          </div>
        </div>

        {/* Active Alerts */}
        <div className="bg-white border border-slate-200 rounded-none p-4 flex items-center justify-between shadow-3xs">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Active Alerts</span>
            <div className="text-2xl font-black text-slate-800">{activeAlerts}</div>
          </div>
          <div className="w-9 h-9 rounded-none bg-emerald-50 flex items-center justify-center text-emerald-500 border border-emerald-100">
            <CheckCircle className="w-4 h-4" />
          </div>
        </div>

        {/* SMS Available */}
        <div className="bg-white border border-slate-200 rounded-none p-4 flex items-center justify-between shadow-3xs">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">SMS Available</span>
            <div className="text-2xl font-black text-red-500">0</div>
          </div>
          <div className="w-9 h-9 rounded-none bg-rose-50 flex items-center justify-center text-rose-500 border border-rose-100">
            <Lock className="w-4 h-4" />
          </div>
        </div>

        {/* WhatsApp Enabled */}
        <div className="bg-white border border-slate-200 rounded-none p-4 flex items-center justify-between shadow-3xs">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">WhatsApp Enabled</span>
            <div className="text-2xl font-black text-slate-800">{whatsappEnabled}</div>
          </div>
          <div className="w-9 h-9 rounded-none bg-teal-50 flex items-center justify-center text-teal-650 border border-teal-100">
            <MessageCircle className="w-4 h-4 fill-current" />
          </div>
        </div>

      </div>

      {/* 3. SHOW CHANNEL CONFIGURATION TOOLBAR ROW */}
      <div className="flex justify-end pr-1">
        <button
          onClick={() => setShowConfigModal(true)}
          className="px-4 py-2 border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 font-bold text-xs rounded-none flex items-center gap-1.5 shadow-3xs cursor-pointer transition-all active:scale-95"
        >
          <Sliders className="w-4 h-4 text-slate-500" />
          Show Channel Configuration
        </button>
      </div>

      {/* 4. NOTIFICATION CENTER TABLE CARD */}
      <div className="bg-white border border-slate-200 rounded-none overflow-hidden shadow-3xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-5 text-center w-12 border-r border-slate-200 font-bold text-slate-500">#</th>
                <th className="py-3 px-5 border-r border-slate-200 w-1/3">Alert & Description</th>
                <th className="py-3 px-5 border-r border-slate-200 text-center w-24">Status</th>
                <th className="py-3 px-5 border-r border-slate-200 text-center w-24">✉ Email</th>
                <th className="py-3 px-5 border-r border-slate-200 text-center w-24">💬 SMS</th>
                <th className="py-3 px-5 border-r border-slate-200 text-center w-24">💬 Whatsapp</th>
                <th className="py-3 px-5 border-r border-slate-200 text-center w-24">🔔 Push</th>
                <th className="py-3 px-5 text-center w-28">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-650 font-semibold">
              {filteredAlerts.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-slate-400 font-medium">
                    No matching notification alerts found.
                  </td>
                </tr>
              ) : (
                filteredAlerts.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-50/30 transition-colors">
                    
                    {/* Index */}
                    <td className="py-4 px-5 text-center text-slate-400 border-r border-slate-100">{idx + 1}</td>
                    
                    {/* Alert Info details */}
                    <td className="py-4 px-5 border-r border-slate-100">
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-none flex items-center justify-center flex-shrink-0 text-sm font-bold ${item.iconBg}`}>
                          {item.title.substring(0, 1)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-800 text-[12px]">{item.title}</div>
                          <p className="text-[10px] text-slate-400 leading-normal font-medium mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-5 border-r border-slate-100 text-center">
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-bold">
                        <span className="w-1.5 h-1.5 rounded-none bg-emerald-500"></span>
                        {item.status}
                      </span>
                    </td>

                    {/* Email Toggle */}
                    <td className="py-4 px-5 border-r border-slate-100 text-center">
                      <button
                        onClick={() => handleToggleChannel(item.id, "email")}
                        className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-none border-2 border-transparent transition-colors duration-150 ease-in-out focus:outline-none mx-auto ${item.email ? 'bg-indigo-600' : 'bg-slate-200'}`}
                      >
                        <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-none bg-white transition duration-150 ease-in-out ${item.email ? 'translate-x-4' : 'translate-x-0'}`} />
                      </button>
                    </td>

                    {/* SMS Toggle */}
                    <td className="py-4 px-5 border-r border-slate-100 text-center">
                      <button
                        onClick={() => handleToggleChannel(item.id, "sms")}
                        className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-none border-2 border-transparent transition-colors duration-150 ease-in-out focus:outline-none mx-auto ${item.sms ? 'bg-indigo-600' : 'bg-slate-200'}`}
                      >
                        <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-none bg-white transition duration-150 ease-in-out ${item.sms ? 'translate-x-4' : 'translate-x-0'}`} />
                      </button>
                    </td>

                    {/* WhatsApp Toggle */}
                    <td className="py-4 px-5 border-r border-slate-100 text-center">
                      <button
                        onClick={() => handleToggleChannel(item.id, "whatsapp")}
                        className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-none border-2 border-transparent transition-colors duration-150 ease-in-out focus:outline-none mx-auto ${item.whatsapp ? 'bg-indigo-650' : 'bg-slate-200'}`}
                      >
                        <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-none bg-white transition duration-150 ease-in-out ${item.whatsapp ? 'translate-x-4' : 'translate-x-0'}`} />
                      </button>
                    </td>

                    {/* Push Toggle */}
                    <td className="py-4 px-5 border-r border-slate-100 text-center">
                      <button
                        onClick={() => handleToggleChannel(item.id, "push")}
                        className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-none border-2 border-transparent transition-colors duration-150 ease-in-out focus:outline-none mx-auto ${item.push ? 'bg-indigo-650' : 'bg-slate-200'}`}
                      >
                        <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-none bg-white transition duration-150 ease-in-out ${item.push ? 'translate-x-4' : 'translate-x-0'}`} />
                      </button>
                    </td>

                    {/* Actions button */}
                    <td className="py-4 px-5 text-center">
                      {item.hasEdit ? (
                        <button 
                          onClick={() => handleEditClick(item)}
                          className="px-3 py-1 border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 font-bold text-xs rounded-none shadow-3xs flex items-center gap-1 cursor-pointer mx-auto transition-all active:scale-95"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-slate-500" />
                          Edit
                        </button>
                      ) : (
                        <span className="text-slate-300 font-bold">—</span>
                      )}
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. CHANNEL CONFIGURATION DRAWER / MODAL */}
      {showConfigModal && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white border border-slate-200 rounded-none max-w-2xl w-full overflow-hidden shadow-xl animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div className="flex items-center gap-2 text-indigo-650">
                <Settings className="w-5 h-5" />
                <h3 className="font-bold text-slate-800 text-sm">Channel Configuration Setup</h3>
              </div>
              <button 
                onClick={() => setShowConfigModal(false)}
                className="p-1 hover:bg-slate-100 rounded-none text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-5 max-h-[480px] overflow-y-auto">
              
              {/* SMTP Settings */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 border-b pb-1">
                  <Mail className="w-4 h-4 text-indigo-500" />
                  Email Configuration (SMTP)
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-650">SMTP Host</label>
                    <input 
                      type="text" 
                      value={smtpHost} 
                      onChange={(e) => setSmtpHost(e.target.value)} 
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-none text-xs font-semibold focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-650">SMTP Port</label>
                    <input 
                      type="text" 
                      value={smtpPort} 
                      onChange={(e) => setSmtpPort(e.target.value)} 
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-none text-xs font-semibold focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-650">SMTP User</label>
                    <input 
                      type="text" 
                      value={smtpUser} 
                      onChange={(e) => setSmtpUser(e.target.value)} 
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-none text-xs font-semibold focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Twilio Settings */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 border-b pb-1">
                  <Smartphone className="w-4 h-4 text-indigo-500" />
                  SMS Configuration (Twilio Gateway)
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-650">Account SID</label>
                    <input 
                      type="text" 
                      value={twilioSid} 
                      onChange={(e) => setTwilioSid(e.target.value)} 
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-none text-xs font-semibold focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-650">Auth Token</label>
                    <input 
                      type="password" 
                      value="••••••••••••••••••••••••" 
                      disabled
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-none text-xs font-semibold focus:outline-none bg-slate-50 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              {/* WhatsApp Business Webhook */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 border-b pb-1">
                  <MessageCircle className="w-4 h-4 text-indigo-500 fill-current" />
                  WhatsApp Gateway Integration
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-650">Webhook Dispatcher URL</label>
                  <input 
                    type="text" 
                    value={whatsappApiUrl} 
                    onChange={(e) => setWhatsappApiUrl(e.target.value)} 
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-none text-xs font-semibold focus:outline-none"
                  />
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-5 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-2">
              <button 
                type="button" 
                onClick={() => setShowConfigModal(false)}
                className="px-4 py-2 border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 font-bold text-xs rounded-none shadow-3xs cursor-pointer"
              >
                Close
              </button>
              <button 
                type="button" 
                onClick={() => {
                  setShowConfigModal(false);
                  alert("Gateway configuration parameters updated successfully!");
                }}
                className="px-4 py-2 bg-indigo-650 text-white font-bold text-xs rounded-none shadow-sm hover:bg-indigo-700 transition-all cursor-pointer"
              >
                Save Integration Keys
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 6. EDIT TEMPLATE MODAL */}
      {editingAlert && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white border border-slate-200 rounded-none max-w-xl w-full overflow-hidden shadow-xl animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h3 className="font-bold text-slate-800 text-sm">Edit Template: {editingAlert.title}</h3>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Customize automated notification messaging content</p>
              </div>
              <button 
                onClick={() => setEditingAlert(null)}
                className="p-1 hover:bg-slate-100 rounded-none text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4">
              
              {/* Alert Warning Box */}
              <div className="bg-[#f0f4f9] border-l-4 border-indigo-600 rounded-r text-[10px] text-indigo-750 p-3 leading-relaxed font-semibold">
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  <Info className="w-4 h-4 text-indigo-650" />
                  SUPPORTED MERGE VARIABLES
                </div>
                You can insert parameters like: <span className="font-mono text-slate-700 font-bold">{`{student_name}`}</span>, <span className="font-mono text-slate-700 font-bold">{`{fee_amount}`}</span>, <span className="font-mono text-slate-700 font-bold">{`{date}`}</span>, or <span className="font-mono text-slate-700 font-bold">{`{exam_name}`}</span> which compile dynamically on send.
              </div>

              {/* Template Subject */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Notification Title / Email Subject</label>
                <input 
                  type="text" 
                  value={tempSubject} 
                  onChange={(e) => setTempSubject(e.target.value)} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-none text-xs text-slate-800 font-semibold focus:outline-none focus:border-indigo-600"
                />
              </div>

              {/* Template Message Body */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Message Body Content</label>
                <textarea 
                  rows="4"
                  value={tempBody} 
                  onChange={(e) => setTempBody(e.target.value)} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-none text-xs text-slate-800 font-semibold focus:outline-none focus:border-indigo-600 resize-none min-h-[100px]"
                />
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-5 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-2">
              <button 
                type="button" 
                onClick={() => setEditingAlert(null)}
                className="px-4 py-2 border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 font-bold text-xs rounded-none shadow-3xs cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="button" 
                onClick={handleSaveTemplate}
                className="px-4 py-2 bg-indigo-650 text-white font-bold text-xs rounded-none shadow-sm hover:bg-indigo-700 transition-all cursor-pointer"
              >
                Update Template
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
