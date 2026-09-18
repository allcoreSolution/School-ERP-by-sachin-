import React, { useState, useRef, useEffect } from "react";
import { 
  Send, 
  Cpu, 
  User, 
  MessageSquare, 
  Trash2, 
  Sparkles, 
  CornerDownLeft, 
  ArrowRight,
  BookOpen,
  DollarSign,
  Camera,
  Layers,
  GraduationCap
} from "lucide-react";

// Mock conversation history list for the sidebar
const INITIAL_CONVERSATIONS = [
  { id: 1, title: "Fee collection issue", active: true, snippet: "How do I check pending fees?" },
  { id: 2, title: "Student enrollment steps", active: false, snippet: "Guide to register new students" },
  { id: 3, title: "Camera wall config support", active: false, snippet: "Setting up 3x3 layout grid" }
];

// Mock bot responses based on input keywords
const BOT_REPLIES = {
  fee: "To view and manage student fees:\n1. Head to **Finance & Fees** in the sidebar.\n2. Use the **Collect Fees** page to record new transactions.\n3. Run a **Fee Dues Report** from the Reports Hub to list pending collections.",
  student: "To add or configure student fields:\n1. Go to **Settings** > **Admission Form Fields** to choose active fields.\n2. Visit **Student List** to search, edit, or view student profiles.\n3. Generate parent app logins inside student details.",
  camera: "To configure CCTV cameras:\n1. Open the **CCTV** > **Camera Wall** section.\n2. Choose between layout grids (**2x2, 3x3, 4x4**) at the top.\n3. To change coverage zones or parent viewing privileges, click **Camera Settings** in the upper right.",
  creative: "To send creatives / birthday wishes:\n1. Open **Engagement** > **Creatives** to rename or preview card designs.\n2. Go to **Birthday Manager** to view upcoming birthdays.\n3. Click **Card** on any row to select a creative card and send it instantly.",
  fallback: "I understand! That relates to our core School ERP workflows. You can browse detailed help articles in the Help Center dashboard, or let me know if you would like to raise a support ticket for the administrator."
};

export default function AiChatbot() {
  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: "bot", 
      text: "Hello! I am your ACS School AI Assistant. I can help you navigate the ERP, manage settings, search logs, and guide you through daily school operations. What can I do for you today?", 
      time: "Just now" 
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages list updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Quick Action triggers
  const handleQuickAction = (actionText) => {
    sendMessage(actionText);
  };

  // Main sending handler
  const sendMessage = (textToSend) => {
    const text = textToSend || inputText;
    if (text.trim() === "") return;

    // 1. Add User message
    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText("");
    
    // 2. Trigger Bot Typing loader simulation
    setIsTyping(true);

    setTimeout(() => {
      // Analyze text for keywords
      const query = text.toLowerCase();
      let replyText = BOT_REPLIES.fallback;

      if (query.includes("fee") || query.includes("payment") || query.includes("collection")) {
        replyText = BOT_REPLIES.fee;
      } else if (query.includes("student") || query.includes("admission") || query.includes("enroll")) {
        replyText = BOT_REPLIES.student;
      } else if (query.includes("camera") || query.includes("cctv") || query.includes("live")) {
        replyText = BOT_REPLIES.camera;
      } else if (query.includes("creative") || query.includes("birthday") || query.includes("wish")) {
        replyText = BOT_REPLIES.creative;
      }

      const botMsg = {
        id: Date.now() + 1,
        sender: "bot",
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Clear current conversation log
  const handleClearChat = () => {
    if (confirm("Reset current chat conversation history?")) {
      setMessages([
        { 
          id: 1, 
          sender: "bot", 
          text: "Hello! Conversation reset. How can I help you manage your school database now?", 
          time: "Just now" 
        }
      ]);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-4 font-sans text-gray-800 h-[calc(100vh-100px)] flex flex-col justify-between">
      
      {/* Upper header section */}
      <div className="flex justify-between items-center flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <Cpu className="w-6 h-6 text-indigo-650" />
            AI Chatbot & Support
          </h1>
          <p className="text-slate-500 text-sm">Ask questions about School ERP workflows and get immediate setup guides</p>
        </div>
        
        <button
          onClick={handleClearChat}
          className="px-3.5 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-650 text-xs font-bold rounded-none flex items-center gap-1.5 shadow-3xs cursor-pointer select-none active:scale-95"
        >
          <Trash2 className="w-3.5 h-3.5 text-slate-550" />
          Clear Conversation
        </button>
      </div>

      {/* Main chat window layout grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 flex-grow overflow-hidden h-full items-stretch">
        
        {/* Left Side: Previous Topics panel */}
        <div className="hidden lg:flex flex-col bg-white border border-slate-200 rounded-none p-4 shadow-3xs space-y-3.5 overflow-y-auto">
          <div className="border-b pb-2 flex items-center gap-2 text-indigo-650">
            <MessageSquare className="w-4 h-4 text-indigo-650" />
            <h3 className="font-extrabold text-xs text-slate-850 uppercase tracking-wider">Conversations</h3>
          </div>

          <div className="space-y-2 flex-grow">
            {conversations.map((chat) => (
              <button
                key={chat.id}
                onClick={() => alert("Loading past conversation logs...")}
                className={`w-full p-3 rounded-none border text-left transition-all flex flex-col gap-1 cursor-pointer select-none group ${
                  chat.active 
                    ? "bg-indigo-50/20 border-indigo-250 shadow-3xs" 
                    : "bg-white border-slate-100 hover:border-slate-300"
                }`}
              >
                <h4 className={`font-extrabold text-xs ${
                  chat.active ? "text-indigo-650" : "text-slate-700"
                }`}>
                  {chat.title}
                </h4>
                <p className="text-[10px] text-slate-400 font-semibold truncate leading-none">
                  {chat.snippet}
                </p>
              </button>
            ))}
          </div>

          <div className="bg-indigo-50/20 border border-indigo-100/50 rounded-none p-3.5 text-[10px] font-semibold text-indigo-750 leading-relaxed flex items-start gap-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0 mt-0.5" />
            <span>AI Assistant learns from ERP updates. Ask how to set up modules, custom forms, or reports.</span>
          </div>
        </div>

        {/* Right Side: Chat box feed panel */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-none shadow-3xs flex flex-col overflow-hidden h-full">
          
          {/* Chat box body messages list */}
          <div className="flex-grow p-5 overflow-y-auto space-y-4 bg-slate-50/20 min-h-[300px]">
            {messages.map((msg) => {
              const isBot = msg.sender === "bot";
              
              return (
                <div 
                  key={msg.id}
                  className={`flex gap-3 max-w-[85%] ${
                    isBot ? "mr-auto items-start" : "ml-auto flex-row-reverse items-start"
                  }`}
                >
                  {/* Icon Avatar */}
                  <div className={`w-8 h-8 rounded-none flex items-center justify-center flex-shrink-0 shadow-3xs text-xs font-bold ${
                    isBot ? "bg-indigo-50 text-indigo-650 border border-indigo-100" : "bg-slate-900 text-white"
                  }`}>
                    {isBot ? <Cpu className="w-4 h-4 text-indigo-650" /> : <User className="w-4 h-4 text-white" />}
                  </div>

                  {/* Message bubble card */}
                  <div className="space-y-1">
                    <div className={`p-3.5 rounded-none text-xs font-semibold leading-relaxed shadow-3xs whitespace-pre-line ${
                      isBot 
                        ? "bg-white text-slate-750 border border-slate-200/90 rounded-tl-none" 
                        : "bg-indigo-650 text-white rounded-tr-none"
                    }`}>
                      {msg.text}
                    </div>
                    <p className={`text-[9px] text-slate-400 font-semibold px-1 ${
                      isBot ? "text-left" : "text-right"
                    }`}>
                      {msg.time}
                    </p>
                  </div>

                </div>
              );
            })}

            {/* Typing status loader */}
            {isTyping && (
              <div className="flex gap-3 max-w-[80%] mr-auto items-start">
                <div className="w-8 h-8 rounded-none bg-indigo-50 text-indigo-650 border border-indigo-100 flex items-center justify-center flex-shrink-0 shadow-3xs">
                  <Cpu className="w-4 h-4 text-indigo-650 animate-spin" />
                </div>
                <div className="bg-white border border-slate-250/90 p-3.5 rounded-none rounded-tl-none shadow-3xs flex items-center gap-1.5 py-2.5">
                  <span className="w-1.5 h-1.5 rounded-none bg-slate-400 animate-bounce delay-100"></span>
                  <span className="w-1.5 h-1.5 rounded-none bg-slate-400 animate-bounce delay-200"></span>
                  <span className="w-1.5 h-1.5 rounded-none bg-slate-400 animate-bounce delay-300"></span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick prompt templates area (displays when chat has only default message) */}
          {messages.length === 1 && !isTyping && (
            <div className="p-4 border-t bg-slate-50/20 space-y-2">
              <h4 className="text-[10px] font-extrabold text-slate-450 uppercase tracking-widest pl-1">Suggested Prompts</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                
                <button
                  onClick={() => handleQuickAction("How to collect pending fees")}
                  className="p-3 bg-white border border-slate-200 hover:border-indigo-600 rounded-none text-left cursor-pointer transition-all flex items-center justify-between group shadow-3xs"
                >
                  <div className="space-y-0.5">
                    <span className="font-extrabold text-[10px] text-slate-700 group-hover:text-indigo-650 flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-indigo-500" />
                      Collect Fees
                    </span>
                    <p className="text-[9px] text-slate-400 font-semibold">How do I register payments?</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                </button>

                <button
                  onClick={() => handleQuickAction("How to customize student admission fields")}
                  className="p-3 bg-white border border-slate-200 hover:border-indigo-600 rounded-none text-left cursor-pointer transition-all flex items-center justify-between group shadow-3xs"
                >
                  <div className="space-y-0.5">
                    <span className="font-extrabold text-[10px] text-slate-700 group-hover:text-indigo-650 flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-indigo-500" />
                      Admission Fields
                    </span>
                    <p className="text-[9px] text-slate-400 font-semibold">Add customize input parameters</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                </button>

                <button
                  onClick={() => handleQuickAction("How to set up CCTV cameras layouts")}
                  className="p-3 bg-white border border-slate-200 hover:border-indigo-600 rounded-none text-left cursor-pointer transition-all flex items-center justify-between group shadow-3xs"
                >
                  <div className="space-y-0.5">
                    <span className="font-extrabold text-[10px] text-slate-700 group-hover:text-indigo-650 flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5 text-indigo-500" />
                      CCTV Cameras Wall
                    </span>
                    <p className="text-[9px] text-slate-400 font-semibold">Configure 2x2 or 3x3 feeds</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                </button>

              </div>
            </div>
          )}

          {/* Typing input box area */}
          <div className="p-4 border-t bg-white flex items-center gap-2.5">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask AI Assistant something... (e.g. 'how to collect fees')"
              rows="1"
              className="flex-grow px-3.5 py-2.5 border border-slate-250 rounded-none text-xs font-semibold focus:outline-none focus:border-indigo-650 bg-white resize-none max-h-16"
            />
            <button
              onClick={() => sendMessage()}
              disabled={inputText.trim() === ""}
              className="w-9 h-9 bg-indigo-650 hover:bg-indigo-755 disabled:bg-slate-100 disabled:text-slate-400 text-white rounded-none flex items-center justify-center flex-shrink-0 shadow-3xs cursor-pointer select-none transition-all active:scale-95 disabled:cursor-not-allowed border-none"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
