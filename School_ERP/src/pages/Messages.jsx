import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Search, 
  Send, 
  Paperclip, 
  Smile, 
  MoreVertical, 
  Phone, 
  Video, 
  Info, 
  CheckCheck, 
  MessageSquare, 
  AlertCircle,
  User,
  Users,
  Circle,
  Lock,
  MessageCircle,
  Settings
} from "lucide-react";

const initialChats = [
  {
    id: 1,
    name: "Grade 10-A General",
    avatar: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=100",
    role: "Class Group",
    isGroup: true,
    unread: 3,
    online: true,
    lastMsg: "Please submit your Math assignments by tomorrow morning.",
    time: "10:24 AM",
    messages: [
      { id: 1, sender: "Mrs. Sarah Jenkins (Maths)", content: "Good morning everyone. Reminding you about the math worksheets.", isSelf: false, time: "09:00 AM", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" },
      { id: 2, sender: "You", content: "Thanks for the reminder. I will upload it tonight.", isSelf: true, time: "09:15 AM" },
      { id: 3, sender: "Rohan Gupta (Student)", content: "Ma'am, is exercise 4.2 compulsory?", isSelf: false, time: "10:20 AM", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100" },
      { id: 4, sender: "Mrs. Sarah Jenkins (Maths)", content: "Yes Rohan, all questions are compulsory.", isSelf: false, time: "10:24 AM", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" }
    ]
  },
  {
    id: 2,
    name: "Dr. Aris Vance (Principal)",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100",
    role: "Administration",
    isGroup: false,
    unread: 0,
    online: true,
    lastMsg: "Let's discuss the annual budget plans in the afternoon meeting.",
    time: "Yesterday",
    messages: [
      { id: 1, sender: "Dr. Aris Vance", content: "Hello. I reviewed the science lab reports.", isSelf: false, time: "04:15 PM", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100" },
      { id: 2, sender: "You", content: "Perfect. Do we need any modifications?", isSelf: true, time: "04:22 PM" },
      { id: 3, sender: "Dr. Aris Vance", content: "Let's discuss the annual budget plans in the afternoon meeting.", isSelf: false, time: "05:01 PM", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100" }
    ]
  },
  {
    id: 3,
    name: "Parent-Teacher Council",
    avatar: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=100",
    role: "Community",
    isGroup: true,
    unread: 0,
    online: false,
    lastMsg: "The upcoming cultural fest planning is scheduled for Friday.",
    time: "Yesterday",
    messages: [
      { id: 1, sender: "Mr. Robert Watson", content: "Do we have updates on the schedule?", isSelf: false, time: "11:30 AM", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" },
      { id: 2, sender: "You", content: "The draft schedule will be sent out tomorrow.", isSelf: true, time: "11:45 AM" }
    ]
  }
];

const Messages = () => {
  // Read state from localStorage, default to false (disabled) if not set
  const [isChatEnabled, setIsChatEnabled] = useState(() => {
    return localStorage.getItem("chatEnabled") === "true";
  });

  const [chats, setChats] = useState(initialChats);
  const [activeChatId, setActiveChatId] = useState(1);
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const messagesEndRef = useRef(null);

  const activeChat = chats.find(chat => chat.id === activeChatId) || chats[0];

  // Listener to track changes from other pages (localStorage updates)
  useEffect(() => {
    const handleStorageChange = () => {
      setIsChatEnabled(localStorage.getItem("chatEnabled") === "true");
    };
    window.addEventListener("storage", handleStorageChange);
    // Also poll occasionally or run on focus
    const interval = setInterval(handleStorageChange, 1000);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Scroll to bottom when message list changes
  useEffect(() => {
    if (isChatEnabled) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeChat?.messages, isChatEnabled]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = {
      id: activeChat.messages.length + 1,
      sender: "You",
      content: inputText,
      isSelf: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChats(prevChats => prevChats.map(chat => {
      if (chat.id === activeChatId) {
        return {
          ...chat,
          lastMsg: inputText,
          time: "Just Now",
          messages: [...chat.messages, newMessage]
        };
      }
      return chat;
    }));

    setInputText("");
  };

  const filteredChats = chats.filter(chat => {
    const matchesSearch = chat.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          chat.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          chat.lastMsg.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    if (activeTab === "groups") return chat.isGroup;
    if (activeTab === "direct") return !chat.isGroup;
    return true;
  });

  return (
    <div className="flex flex-col h-[calc(100vh-56px)] bg-slate-50/30 font-sans">
      {isChatEnabled ? (
        // ACTIVE CHAT LAYOUT
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar - Chat List */}
          <div className="w-80 border-r bg-white flex flex-col flex-shrink-0">
            <div className="p-4 border-b">
              <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                Messages
                <span className="bg-rose-500 text-white text-[11px] font-bold px-1.5 py-0.5 rounded-none">
                  {chats.reduce((acc, c) => acc + c.unread, 0)}
                </span>
              </h1>
              
              <div className="mt-3 relative">
                <input 
                  type="text" 
                  placeholder="Search conversations..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 text-slate-800 placeholder-slate-400 border border-slate-200 rounded-none text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              </div>
            </div>

            <div className="flex px-2 border-b gap-1 bg-slate-50/50 py-1">
              {["all", "groups", "direct"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-none transition-all capitalize ${activeTab === tab ? 'bg-white text-indigo-600 shadow-xs border border-slate-100' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
              {filteredChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => {
                    setActiveChatId(chat.id);
                    setChats(prev => prev.map(c => c.id === chat.id ? { ...c, unread: 0 } : c));
                  }}
                  className={`w-full text-left p-4 flex gap-3 hover:bg-slate-50/80 transition-all border-l-3 relative ${activeChatId === chat.id ? 'bg-indigo-50/40 border-indigo-600' : 'border-transparent'}`}
                >
                  <div className="relative flex-shrink-0">
                    <img src={chat.avatar} alt={chat.name} className="w-11 h-11 rounded-none object-cover border border-slate-200" />
                    {chat.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-none"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-semibold text-slate-800 text-sm truncate">{chat.name}</h3>
                      <span className="text-[10px] text-slate-400">{chat.time}</span>
                    </div>
                    <p className="text-xs text-slate-450 font-medium truncate mb-1">{chat.role}</p>
                    <p className={`text-xs truncate ${chat.unread > 0 ? 'text-slate-800 font-bold' : 'text-slate-500'}`}>
                      {chat.lastMsg}
                    </p>
                  </div>
                  {chat.unread > 0 && (
                    <div className="absolute right-4 bottom-4 w-5 h-5 bg-rose-500 rounded-none flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
                      {chat.unread}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right Panel - Active Chat Window */}
          <div className="flex-1 flex flex-col bg-slate-50">
            <div className="h-16 px-6 border-b bg-white flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <img src={activeChat.avatar} alt={activeChat.name} className="w-10 h-10 rounded-none object-cover border" />
                <div>
                  <h2 className="font-bold text-slate-800 text-sm leading-tight">{activeChat.name}</h2>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Circle className={`w-1.5 h-1.5 fill-current ${activeChat.online ? 'text-emerald-500' : 'text-slate-400'}`} />
                    <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                      {activeChat.online ? 'Online' : 'Offline'} • {activeChat.role}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-slate-500">
                <button className="p-2 hover:bg-slate-100 rounded-none hover:text-indigo-600 transition-colors"><Phone className="w-4 h-4" /></button>
                <button className="p-2 hover:bg-slate-100 rounded-none hover:text-indigo-600 transition-colors"><Video className="w-4 h-4" /></button>
                <button className="p-2 hover:bg-slate-100 rounded-none hover:text-indigo-600 transition-colors"><Info className="w-4 h-4" /></button>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {activeChat.messages.map((msg) => (
                <div key={msg.id} className={`flex items-end gap-2.5 ${msg.isSelf ? 'justify-end' : 'justify-start'}`}>
                  {!msg.isSelf && (
                    <img src={msg.avatar || activeChat.avatar} alt="sender" className="w-8 h-8 rounded-none object-cover border border-slate-200 flex-shrink-0 mb-1" />
                  )}
                  <div className="max-w-[70%]">
                    {!msg.isSelf && activeChat.isGroup && (
                      <p className="text-[10px] font-bold text-slate-600 ml-1.5 mb-1">{msg.sender}</p>
                    )}
                    <div className={`p-3.5 rounded-none text-[13px] leading-relaxed shadow-xs ${
                      msg.isSelf ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white text-slate-700 border border-slate-200/80 rounded-bl-none'
                    }`}>
                      {msg.content}
                    </div>
                    <div className={`flex items-center gap-1 mt-1 text-[9px] text-slate-450 ${msg.isSelf ? 'justify-end mr-1' : 'justify-start ml-1.5'}`}>
                      <span>{msg.time}</span>
                      {msg.isSelf && <CheckCheck className="w-3.5 h-3.5 text-indigo-500 font-bold" />}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t flex items-center gap-3">
              <button type="button" className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-none transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>
              <div className="flex-1 relative flex items-center">
                <input 
                  type="text" 
                  placeholder="Type your message here..." 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full pl-4 pr-11 py-2.5 bg-slate-50 text-slate-850 placeholder-slate-400 border border-slate-200 rounded-none text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium"
                />
                <button type="button" className="absolute right-3 text-slate-400 hover:text-amber-500 transition-colors">
                  <Smile className="w-5 h-5" />
                </button>
              </div>
              <button type="submit" disabled={!inputText.trim()} className="p-2.5 bg-indigo-600 text-white rounded-none shadow-md transition-all hover:bg-indigo-700 flex items-center justify-center">
                <Send className="w-4.5 h-4.5" />
              </button>
            </form>
          </div>
        </div>
      ) : (
        // EXACT SCREEN MATCH TO USER'S DISABLED CHAT SCREENSHOT
        <div className="p-6 flex flex-col h-full bg-slate-50/50">
          {/* Header Title */}
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-slate-800">Messages</h1>
          </div>

          {/* Centered Large Card */}
          <div className="flex-1 flex items-start justify-center pt-8">
            <div className="w-full max-w-7xl bg-white border border-slate-200/80 rounded-none shadow-2xs p-16 flex flex-col items-center justify-center text-center">
              
              {/* Crossed Speech Icon */}
              <div className="relative mb-4 flex items-center justify-center text-slate-500">
                {/* Speech Bubble Icon */}
                <svg className="w-10 h-10 text-[#5f6368]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
                {/* Strike-through diagonal line */}
                <div className="absolute w-12 h-0.5 bg-slate-400 rotate-[-45deg] rounded-none border border-white"></div>
              </div>

              {/* Title Text */}
              <h2 className="text-[17px] font-bold text-slate-800">Chat is not enabled for your school</h2>
              
              {/* Description subtext */}
              <p className="mt-1 text-[13px] text-slate-500 font-medium">
                An administrator can turn it on under <Link to="/chat-moderation" className="text-indigo-650 hover:underline">Chat Moderation</Link>.
              </p>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
