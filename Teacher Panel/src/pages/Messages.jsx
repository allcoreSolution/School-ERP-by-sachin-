import React, { useState } from 'react';
import { Plus, X, Paperclip, Send } from 'lucide-react';

const Messages = () => {
  const [isComposing, setIsComposing] = useState(false);
  const [activeChat, setActiveChat] = useState('Parent of Kabir Singh');
  
  const conversations = [
    { id: 1, name: 'Parent of Kabir Singh', msg: 'Hi', unread: 4, avatar: 'P' },
    { id: 2, name: 'Parent of Shlok Verma', msg: "Whats that", unread: 0, avatar: 'P' },
    { id: 3, name: 'Parent of Ali Bansal', msg: 'please you need to bring food', unread: 0, avatar: 'P' },
    { id: 4, name: 'Aaryan Rao', msg: 'Say hello', unread: 0, avatar: 'A' },
    { id: 5, name: 'Parent of Aaryan Rao', msg: 'Say hello', unread: 0, avatar: 'P' },
  ];

  const chatHistory = {
    'Parent of Kabir Singh': [
       { id: 1, type: 'incoming', text: 'Hello', time: '04:02 AM' },
       { id: 2, type: 'outgoing', text: 'Message removed', time: '04:12 AM', deleted: true },
       { id: 3, type: 'outgoing', text: 'hello', time: '04:12 AM' },
       { id: 4, type: 'incoming', text: 'Hello', time: '04:14 AM' },
       { id: 5, type: 'outgoing', text: 'hello', time: '04:43 AM' },
       { id: 6, type: 'outgoing', text: 'hello, how are you?', time: '04:43 AM' },
    ],
    'Parent of Shlok Verma': [
       { id: 1, type: 'incoming', text: 'Good morning teacher, how is Shlok doing?', time: '08:30 AM' },
       { id: 2, type: 'outgoing', text: 'Good morning. He is doing much better in Science now.', time: '09:15 AM' },
       { id: 3, type: 'incoming', text: 'Whats that project he was talking about?', time: '09:20 AM' },
    ],
    'Parent of Ali Bansal': [
       { id: 1, type: 'incoming', text: 'please you need to bring food', time: '12:00 PM' },
       { id: 2, type: 'outgoing', text: 'I think you messaged the wrong number.', time: '12:05 PM' },
    ],
    'Aaryan Rao': [
       { id: 1, type: 'incoming', text: 'Say hello', time: '01:10 PM' },
       { id: 2, type: 'outgoing', text: 'Hello Aaryan! Did you finish homework?', time: '01:12 PM' },
    ],
    'Parent of Aaryan Rao': [
       { id: 1, type: 'incoming', text: 'Let me know his test score', time: 'Yesterday' },
       { id: 2, type: 'outgoing', text: 'His score is 85/100.', time: 'Yesterday' },
       { id: 3, type: 'incoming', text: 'Say hello', time: '10:00 AM' },
    ]
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50/50 theme-app-bg text-sm h-full overflow-hidden">
      <div className="px-6 py-5 md:px-8 shrink-0">
        <h1 className="text-[24px] font-black text-gray-800 tracking-tight">Messages</h1>
      </div>

      <div className="flex flex-1 flex-col md:flex-row gap-6 px-6 md:px-8 pb-6 md:pb-8 mx-auto w-full max-w-6xl overflow-hidden min-h-0">
           
           {/* Left Pane - Conversations */}
           <div className="w-full md:w-[35%] bg-white border border-gray-200 rounded-none shadow-sm flex flex-col overflow-hidden h-full">
              <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-white z-10 shadow-sm shrink-0">
                 <h2 className="font-bold text-gray-800 text-[15px]">Conversations</h2>
                 <button 
                   onClick={() => setIsComposing(true)}
                   className="bg-[#f97316] hover:bg-[#ea580c] text-white px-3 py-1.5 flex items-center gap-1 text-[13px] font-bold transition-all rounded-none shadow-sm shadow-orange-500/20 active:scale-95">
                   <Plus className="w-4 h-4" /> New
                 </button>
              </div>
              
              <div className="flex-1 overflow-y-auto hide-scrollbar z-0 divide-y divide-gray-100/80">
                 {conversations.map((chat) => (
                    <div 
                        key={chat.id} 
                        onClick={() => setActiveChat(chat.name)}
                        className={`p-4 flex items-start gap-4 cursor-pointer transition-colors group border-l-[3px] ${activeChat === chat.name ? 'border-[#4f46e5] bg-[#f0f2ff]' : 'border-transparent hover:bg-gray-50/80'}`}>
                       <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black flex-shrink-0 transition-colors ${activeChat === chat.name ? 'bg-white text-[#4f46e5] border border-indigo-100' : 'bg-indigo-50 border border-indigo-100 text-indigo-600 group-hover:bg-indigo-100'}`}>
                         {chat.avatar}
                       </div>
                       <div className="flex-1 min-w-0 pt-0.5">
                         <div className="flex justify-between items-center mb-1">
                            <h3 className={`font-bold text-[13px] truncate tracking-wide ${activeChat === chat.name ? 'text-indigo-900' : 'text-gray-800'}`}>{chat.name}</h3>
                            {chat.unread > 0 && (
                               <span className="w-5 h-5 bg-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                                 {chat.unread}
                               </span>
                            )}
                         </div>
                         <p className={`text-[12px] truncate font-medium ${activeChat === chat.name ? 'text-indigo-400' : 'text-gray-500'}`}>{chat.msg}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           {/* Right Pane - Content Area */}
           <div className="w-full md:w-[65%] bg-white border border-gray-200 rounded-none shadow-sm flex flex-col">
              
              {activeChat ? (
                 <div className="flex-1 flex flex-col h-full overflow-hidden animate-in fade-in">
                    {/* Chat Header */}
                    <div className="px-6 py-4 border-b border-gray-100 bg-white shadow-sm z-10 shrink-0">
                       <h2 className="font-bold text-gray-800 text-[15px]">{activeChat}</h2>
                    </div>
                    
                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-6 bg-gray-50/30 space-y-4">
                       {(chatHistory[activeChat] || []).map(msg => {
                          if (msg.type === 'incoming') {
                             return (
                                <div key={msg.id} className="flex justify-start animate-in fade-in slide-in-from-left-2 duration-300">
                                   <div className="max-w-[75%]">
                                      <div className="bg-white border border-gray-100 text-gray-800 px-2.5 py-1.5 rounded-[6px] rounded-tl-none shadow-sm flex items-end gap-3 w-fit">
                                         <p className="text-[13px] font-medium leading-tight">{msg.text}</p>
                                         <span className="text-[9px] text-gray-400 font-bold whitespace-nowrap mb-[1px]">{msg.time}</span>
                                      </div>
                                   </div>
                                </div>
                             )
                          } else {
                             return (
                                <div key={msg.id} className="flex justify-end animate-in fade-in slide-in-from-right-2 duration-300">
                                   <div className="max-w-[75%] text-right">
                                      <div className={`px-2.5 py-1.5 rounded-[6px] rounded-tr-none shadow-sm flex items-end gap-3 w-fit ml-auto ${msg.deleted ? 'bg-[#e0e7ff] text-[#4f46e5]' : 'bg-[#4f46e5] text-white'}`}>
                                         <p className={`text-[13px] font-medium leading-tight ${msg.deleted ? 'italic' : ''}`}>{msg.text}</p>
                                         <span className={`text-[9px] font-bold whitespace-nowrap mb-[1px] ${msg.deleted ? 'text-[#818cf8]' : 'text-indigo-200'}`}>{msg.time}</span>
                                      </div>
                                   </div>
                                </div>
                             )
                          }
                       })}
                    </div>

                    {/* Chat Input Footer */}
                    <div className="p-4 border-t border-gray-100 bg-white flex gap-3 items-center shrink-0">
                       <button className="w-10 h-10 rounded shadow-sm border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors shrink-0">
                          <Paperclip className="w-5 h-5" />
                       </button>
                       <input 
                          type="text" 
                          placeholder="Type a message..." 
                          className="flex-1 bg-white border border-gray-200 rounded-none px-4 py-2.5 text-[14px] text-gray-700 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all font-medium placeholder-gray-400 shadow-sm"
                       />
                       <button className="w-10 h-10 rounded-none bg-[#f97316] text-white flex items-center justify-center hover:bg-[#ea580c] transition-colors shadow-sm shrink-0">
                          <Send className="w-4 h-4 ml-0.5" />
                       </button>
                    </div>
                 </div>
              ) : (
                 <div className="flex-1 flex flex-col items-center justify-center bg-gray-50/40">
                    <div className="w-16 h-16 mb-4 text-[#9ca3af] opacity-60">
                       <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                          <path d="M12 2C6.48 2 2 5.92 2 10.75c0 2.8 1.5 5.28 3.82 6.83l-1.07 3.52c-.17.55.38 1.05.9.82l3.86-1.74c.8.21 1.63.32 2.49.32 5.52 0 10-3.92 10-8.75S17.52 2 12 2zm-3 9.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm3 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm3 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm3 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                       </svg>
                    </div>
                    <p className="text-[13px] font-medium text-gray-400 tracking-wide">Pick a conversation on the left, or start a new one.</p>
                 </div>
              )}
              
           </div>
        </div>
      
      {/* New Conversation Modal Overlay */}
      {isComposing && (
         <div className="fixed inset-0 z-50 bg-gray-900/50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-none w-full max-w-2xl shadow-xl flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200">
               {/* Modal Header */}
               <div className="px-6 py-4 flex justify-between items-center bg-white border-b border-gray-100 rounded-none sticky top-0 shrink-0">
                  <h2 className="font-bold text-gray-800 text-[15px]">New Conversation</h2>
                  <button onClick={() => setIsComposing(false)} className="text-gray-400 hover:text-gray-700 transition-colors p-1 hover:bg-gray-100 rounded-none">
                     <X className="w-5 h-5" />
                  </button>
               </div>
               
               {/* Modal Body - Scrollable */}
               <div className="p-4 flex-1 overflow-y-auto space-y-2.5 custom-scrollbar">
                  {[
                     { name: 'KG - A' },
                     { name: 'Nursery - A' },
                     { name: 'Nursery - B' },
                     { name: 'Class I - A' },
                     { name: 'Class I - B' },
                     { name: 'Class I - C' },
                     { name: 'Class I - D' },
                     { name: 'Class I - E' },
                     { name: 'Class VII - A' },
                  ].map((cls, idx) => (
                     <div key={idx} className="bg-[#f0f2ff] hover:bg-[#e2e6fa] text-[#4f46e5] font-bold px-4 py-3 rounded-none cursor-pointer transition-colors shadow-sm text-[13px] flex items-center">
                        {cls.name} <span className="text-gray-500 font-medium ml-2 text-[12px] opacity-80">— 0 students</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      )}
      
    </div>
  );
};

export default Messages;
