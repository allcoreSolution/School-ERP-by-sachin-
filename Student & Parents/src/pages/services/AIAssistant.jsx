import React, { useState, useRef, useEffect } from 'react';
import { Send, Plus, Settings, Book, Bot, User, ThumbsUp, ThumbsDown, X, Volume2, ShieldAlert, Monitor, Languages, Database, FileText } from 'lucide-react';

export default function AIAssistant() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isKnowledgeBaseOpen, setIsKnowledgeBaseOpen] = useState(false);
  
  const [messages, setMessages] = useState([
    { role: 'user', text: 'fees?' },
    { 
      role: 'bot', 
      text: '💰 **Fee Status for Kabir Singh** - **Total Fees:** ₹33,300.00 - **Paid:** ✅ ₹33,300.00 - **Pending:** 🟢 All Clear **Status:** All Clear ✅ 📝 **Last Payment:** - Amount: ₹20,000.00 - Date: 02 Sep 2026 - Mode: Cash' 
    }
  ]);
  const [activeSession, setActiveSession] = useState('fees?');
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const botReply = (q) => {
    const lower = q.toLowerCase();
    if (lower.includes('fee')) return '💰 **Fee Status** - All dues are cleared for this quarter. Next payment of ₹12,000 is due on 15 Oct, 2026.';
    if (lower.includes('attendance')) return '📅 Your current attendance is **88%**. You were last marked absent on 05 Sep, 2026.';
    if (lower.includes('exam') || lower.includes('report')) return '📝 The next internal assessment begins on **22 Sep 2026**. Check the Exams section for the detailed schedule.';
    if (lower.includes('hello') || lower.includes('hi')) return 'Hello! How can I assist you with your school activities or records today?';
    return 'I am currently operating in a demo mode. I can answer specific queries related to fees, attendance, or exams based on available mock data.';
  };

  const handleSend = () => {
    const msg = input.trim();
    if (!msg) return;
    setMessages(prev => [...prev, { role: 'user', text: msg }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'bot', text: botReply(msg) }]);
    }, 600);
  };

  const loadSession = (topic) => {
    setActiveSession(topic);
    setMessages([
      { role: 'user', text: topic },
      { role: 'bot', text: `Loading history for "${topic}"... Wait, this is a local simulated demo session! Ask me questions below.` }
    ]);
  };

  // Helper to quickly parse simple markdown bolding
  const renderMarkdown = (text) => {
    return text.split(/(\*\*.*?\*\*)/g).map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-white font-bold">{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="flex h-[calc(100vh-50px)] lg:h-[calc(100vh-57px)] bg-[#0A0710] font-sans text-gray-200">
      
      {/* Sidebar (Chat History) - Hidden on small screens */}
      <div className="hidden lg:flex flex-col w-[280px] bg-[#110E1B] border-r border-[#1D1A2E] flex-shrink-0">
         
         <div className="p-4 border-b border-[#1D1A2E]">
            <button 
               onClick={() => { setActiveSession('New Session'); setMessages([{ role: 'bot', text: 'Hello! I am ready for a new conversation. What can I help you with?' }]); }}
               className="w-full py-2.5 px-4 bg-[#231A47] hover:bg-[#2D2159] text-[#A088FF] font-bold text-[13px] flex items-center gap-2 rounded-none transition-colors border border-[#3E2D7A]"
            >
               <Plus className="w-4 h-4" /> New Chat
            </button>
         </div>

         <div className="flex-1 overflow-y-auto px-2 py-4 space-y-1 custom-scrollbar">
            
            {/* History Nodes */}
            {[
               { id: 1, title: 'my attendance', time: '3 hours ago' },
               { id: 2, title: 'fees?', time: '4 hours ago' },
               { id: 3, title: 'hi', time: '8 hours ago' },
               { id: 4, title: 'My child\'s pending fees', time: '1 day ago' }
            ].map(session => (
               <div 
                  key={session.id} 
                  onClick={() => loadSession(session.title)}
                  className={`px-3 py-2 text-[12.5px] cursor-pointer rounded-none border transition-colors ${
                     activeSession === session.title 
                        ? 'bg-[#1e1b4b] border-[#3E2D7A]/50 text-white' 
                        : 'hover:bg-[#1D1A2E] text-gray-400 border-transparent'
                  }`}
               >
                  <span className={`font-bold block mb-0.5 ${activeSession === session.title ? 'text-white' : 'text-gray-200'}`}>{session.title}</span>
                  <span className={`text-[10px] ${activeSession === session.title ? 'text-gray-400' : 'opacity-60'}`}>{session.time}</span>
               </div>
            ))}
         </div>

         <div className="p-4 border-t border-[#1D1A2E] flex justify-center">
            <button className="text-[11px] uppercase tracking-widest font-black text-[#A088FF] px-4 py-1.5 border border-[#3E2D7A] rounded-full hover:bg-[#231A47] transition-colors">
               Intent Mode
            </button>
         </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative w-full overflow-hidden bg-gradient-to-br from-[#0D0A16] to-[#161229]">
         
         {/* Top Header */}
         <div className="flex items-center justify-between px-6 py-4 border-b border-[#241F3E] bg-[#110E1B]/80 backdrop-blur-sm z-10 shrink-0">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-none bg-gradient-to-tr from-orange-400 via-pink-500 to-purple-500 flex items-center justify-center p-0.5 relative">
                  <div className="w-full h-full bg-[#110E1B] rounded-none flex items-center justify-center">
                     <Bot className="w-4 h-4 text-white hover:animate-pulse" />
                  </div>
                  {/* Online Dot */}
                  <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-emerald-500 border border-[#110E1B] rounded-full"></div>
               </div>
               <div>
                  <h2 className="text-[14px] font-extrabold text-white tracking-wide">AI Assistant</h2>
                  <span className="text-[10.5px] font-bold text-emerald-500 flex items-center gap-1">
                     <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping"></span> Online
                  </span>
               </div>
            </div>
            <div className="flex justify-end gap-2 shrink-0">
               <button onClick={() => setIsSettingsOpen(true)} className="p-2 border border-[#241F3E] bg-[#1A162B] hover:bg-[#241F3E] transition-colors rounded-none text-gray-300">
                  <Settings className="w-4 h-4" />
               </button>
               <button onClick={() => setIsKnowledgeBaseOpen(true)} className="px-3 py-2 border border-[#241F3E] bg-[#1A162B] hover:bg-[#241F3E] transition-colors rounded-none flex items-center gap-2 text-[12px] font-bold text-gray-300">
                  <Book className="w-3.5 h-3.5" /> Knowledge Base
               </button>
            </div>
         </div>

         {/* Chat Feed */}
         <div className="flex-1 overflow-y-auto px-4 lg:px-20 py-8 space-y-8 custom-scrollbar">
            {messages.map((m, i) => (
               <div key={i} className={`flex items-start gap-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  
                  {/* Bot Avatar */}
                  {m.role === 'bot' && (
                     <div className="w-8 h-8 rounded-none bg-gradient-to-tr from-teal-400 to-blue-500 flex items-center justify-center shrink-0 shadow-lg mt-1 relative overflow-hidden">
                        <Bot className="w-4 h-4 text-white z-10" />
                        <div className="absolute inset-0 bg-black/20 mix-blend-overlay"></div>
                     </div>
                  )}

                  {/* Message Bubble (Strictly square `rounded-none`) */}
                  <div className="flex flex-col gap-2 max-w-[85%] lg:max-w-[70%]">
                     <div 
                        className={`px-5 py-4 text-[14px] shadow-sm leading-relaxed rounded-none
                        ${m.role === 'user' 
                           ? 'bg-[#3B82F6] text-white border border-[#2563EB]' 
                           : 'bg-[#1C1833] text-gray-300 border border-[#2A234A]'}`}
                     >
                        {m.role === 'bot' ? renderMarkdown(m.text) : m.text}
                     </div>

                     {/* AI Feedback Actions */}
                     {m.role === 'bot' && (
                        <div className="flex items-center gap-2 px-1">
                           <button className="p-1.5 bg-[#231E3D] hover:bg-[#2D284B] border border-[#302B4D] rounded-none text-gray-400 hover:text-green-400 transition-colors">
                              <ThumbsUp className="w-3.5 h-3.5" />
                           </button>
                           <button className="p-1.5 bg-[#231E3D] hover:bg-[#2D284B] border border-[#302B4D] rounded-none text-gray-400 hover:text-red-400 transition-colors">
                              <ThumbsDown className="w-3.5 h-3.5" />
                           </button>
                        </div>
                     )}
                  </div>

                  {/* User Avatar */}
                  {m.role === 'user' && (
                     <div className="w-8 h-8 rounded-none bg-[#6366F1] flex items-center justify-center shrink-0 shadow-lg mt-1 border border-[#4F46E5]">
                        <User className="w-4 h-4 text-white" />
                     </div>
                  )}

               </div>
            ))}
            <div ref={chatEndRef} />
         </div>

         {/* Footer Input Area */}
         <div className="w-full bg-[#110E1B] border-t border-[#1D1A2E] p-4 lg:px-20 lg:py-6 shrink-0 relative">
            
            {/* Tokens UI Overlay */}
            <div className="absolute -top-7 right-6 lg:right-20 flex items-center gap-2 text-[10.5px] font-bold text-gray-500 bg-[#110E1B] px-3 py-1 border border-[#1D1A2E] border-b-0 rounded-t-none">
               Today: <div className="w-16 h-1.5 bg-[#1D1A2E] rounded-none overflow-hidden"><div className="w-1/12 h-full bg-[#A088FF]"></div></div> 0 / 50.0K tokens
            </div>

            <div className="relative w-full max-w-4xl mx-auto flex items-center bg-[#131120] border border-[#2A234A] rounded-none focus-within:border-[#4F46E5] transition-colors shadow-inner">
               <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..." 
                  className="w-full bg-transparent px-5 py-4 text-[14px] text-white outline-none placeholder-gray-600 font-medium"
               />
               <button 
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="w-10 h-10 mr-2 flex items-center justify-center bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-50 disabled:hover:bg-[#7C3AED] text-white rounded-none cursor-pointer transition-colors shadow-sm"
               >
                  <Send className="w-4 h-4" />
               </button>
            </div>
         </div>

      </div>

      {/* OVERLAY MODALS */}

      {/* Settings Modal */}
      {isSettingsOpen && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#07050A]/80 backdrop-blur-sm p-4">
            <div className="bg-[#110E1B] border border-[#2A234A] rounded-none shadow-2xl w-full max-w-md flex flex-col">
               <div className="flex items-center justify-between px-5 py-4 border-b border-[#2A234A] bg-[#161229]">
                  <h3 className="font-bold text-white text-[15px] flex items-center gap-2">
                     <Settings className="w-4 h-4 text-[#A088FF]" /> AI Settings
                  </h3>
                  <button onClick={() => setIsSettingsOpen(false)} className="p-1 hover:bg-[#2A234A] text-gray-400 hover:text-white transition-colors"><X className="w-4 h-4"/></button>
               </div>
               <div className="p-5 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                     <div className="flex flex-col">
                        <span className="text-[13px] font-bold text-gray-200">Voice Output</span>
                        <span className="text-[11px] text-gray-500">Read responses aloud</span>
                     </div>
                     <div className="w-10 h-5 bg-[#3B82F6] flex justify-end p-0.5 cursor-pointer">
                        <div className="w-4 h-4 bg-white shadow-sm" />
                     </div>
                  </div>
                  <div className="flex items-center justify-between">
                     <div className="flex flex-col">
                        <span className="text-[13px] font-bold text-gray-200">Language Model</span>
                        <span className="text-[11px] text-gray-500">Default reasoning engine</span>
                     </div>
                     <select className="bg-[#1C1833] border border-[#302B4D] text-[12px] px-2 py-1 outline-none text-white w-28">
                        <option>EduPulse v2</option>
                        <option>Standard GPT</option>
                     </select>
                  </div>
                  <div className="flex items-center justify-between">
                     <div className="flex flex-col">
                        <span className="text-[13px] font-bold text-gray-200">Clear Context History</span>
                        <span className="text-[11px] text-gray-500">Reset agent memory</span>
                     </div>
                     <button onClick={() => { setMessages([{ role: 'bot', text: 'Memory cleared. Ready for new context!' }]); setIsSettingsOpen(false); }} className="bg-red-900/30 text-red-400 border border-red-900/50 hover:bg-red-900/60 px-3 py-1 font-bold text-[11px] uppercase transition-colors">Clear</button>
                  </div>
               </div>
            </div>
         </div>
      )}

      {/* Knowledge Base Modal */}
      {isKnowledgeBaseOpen && (
         <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end bg-[#07050A]/40 backdrop-blur-[2px] sm:pr-4">
            <div className="bg-[#110E1B] border border-[#2A234A] rounded-none shadow-2xl h-[50vh] sm:h-[80vh] w-full sm:w-[350px] flex flex-col animate-in slide-in-from-right-8 duration-200">
               <div className="flex items-center justify-between px-5 py-4 border-b border-[#2A234A] bg-[#161229]">
                  <h3 className="font-bold text-white text-[15px] flex items-center gap-2">
                     <Book className="w-4 h-4 text-orange-400" /> Knowledge Base
                  </h3>
                  <button onClick={() => setIsKnowledgeBaseOpen(false)} className="p-1 hover:bg-[#2A234A] text-gray-400 hover:text-white transition-colors"><X className="w-4 h-4"/></button>
               </div>
               <div className="p-4 flex flex-col gap-3 overflow-y-auto custom-scrollbar">
                  <div className="p-3 bg-[#1C1833] border border-[#302B4D] hover:bg-[#241F3E] hover:border-orange-500/30 cursor-pointer transition-colors group">
                     <span className="font-bold text-[13px] text-gray-200 block mb-1 group-hover:text-orange-400">🏫 School Code of Conduct (2026)</span>
                     <span className="text-[11px] text-gray-500">Official rules and regulations document PDF.</span>
                  </div>
                  <div className="p-3 bg-[#1C1833] border border-[#302B4D] hover:bg-[#241F3E] hover:border-orange-500/30 cursor-pointer transition-colors group">
                     <span className="font-bold text-[13px] text-gray-200 block mb-1 group-hover:text-orange-400">💰 Fee Structure Breakdown</span>
                     <span className="text-[11px] text-gray-500">Guidance for term 2 payments and deadlines.</span>
                  </div>
                  <div className="p-3 bg-[#1C1833] border border-[#302B4D] hover:bg-[#241F3E] hover:border-orange-500/30 cursor-pointer transition-colors group">
                     <span className="font-bold text-[13px] text-gray-200 block mb-1 group-hover:text-orange-400">🩺 Health Policies & Vaccinations</span>
                     <span className="text-[11px] text-gray-500">Mandatory medical record updates format.</span>
                  </div>
               </div>
               <div className="mt-auto p-4 border-t border-[#2A234A] bg-[#161229]">
                  <button className="w-full py-2 bg-transparent border border-gray-600 text-[12px] text-gray-300 hover:text-white font-bold transition-colors">
                     Browse Full Catalog
                  </button>
               </div>
            </div>
         </div>
      )}

    </div>
  );
}
