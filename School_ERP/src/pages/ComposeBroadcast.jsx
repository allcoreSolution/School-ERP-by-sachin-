import React from 'react';
import { 
  Send, Mail, MessageSquare, Phone, Bell,
  Bold, Italic, Underline, Strikethrough, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Link2, Image, Video, Code, HelpCircle, AlertTriangle, Users
} from 'lucide-react';

export default function ComposeBroadcast() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Compose Broadcast Message</h1>
        <p className="text-sm text-gray-500 mt-1">Send one message to a group across email, SMS, WhatsApp or push</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center">
              <Send className="w-5 h-5 text-[#5542f6] mr-2" />
              <h2 className="text-base font-bold text-gray-800">Compose Message</h2>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2">
                  Target Channels <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="border-2 border-[#5542f6] bg-[#f8f9fe] rounded-none p-3 flex items-center justify-between cursor-pointer">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 text-[#5542f6] mr-2" />
                      <span className="text-sm font-bold text-gray-800">Email</span>
                    </div>
                    <div className="w-4 h-4 bg-[#5542f6] rounded-none text-white flex items-center justify-center text-xs font-bold">✓</div>
                  </div>
                  <div className="border border-gray-300 rounded-none p-3 flex items-center cursor-pointer hover:border-gray-400 text-gray-500">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">SMS</span>
                  </div>
                  <div className="border border-gray-300 rounded-none p-3 flex items-center cursor-pointer hover:border-gray-400 text-gray-500">
                    <Phone className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">WhatsApp</span>
                  </div>
                  <div className="border border-gray-300 rounded-none p-3 flex items-center cursor-pointer hover:border-gray-400 text-gray-500">
                    <Bell className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Push Notification</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Select at least one delivery method.</p>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Enter message subject"
                  className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none focus:border-[#5542f6]"
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1">
                  Message Body <span className="text-red-500">*</span>
                </label>
                <div className="border border-gray-300 rounded-none overflow-hidden flex flex-col">
                  {/* Toolbar */}
                  <div className="bg-gray-50/50 border-b border-gray-200 p-2 flex flex-wrap gap-1 items-center">
                    <button className="p-1.5 hover:bg-gray-200 rounded-none text-gray-700"><Send className="w-4 h-4" /></button>
                    <div className="w-px h-5 bg-gray-300 mx-1"></div>
                    <button className="p-1.5 hover:bg-gray-200 rounded-none text-gray-700"><Bold className="w-4 h-4" /></button>
                    <button className="p-1.5 hover:bg-gray-200 rounded-none text-gray-700"><Italic className="w-4 h-4" /></button>
                    <button className="p-1.5 hover:bg-gray-200 rounded-none text-gray-700 underline"><Underline className="w-4 h-4" /></button>
                    <button className="p-1.5 hover:bg-gray-200 rounded-none text-gray-700 line-through"><Strikethrough className="w-4 h-4" /></button>
                    <div className="w-px h-5 bg-gray-300 mx-1"></div>
                    <select className="text-sm bg-transparent border-none outline-none text-gray-700 cursor-pointer hover:bg-gray-200 py-1 px-2 rounded">
                      <option>Segoe UI</option>
                    </select>
                    <div className="w-px h-5 bg-gray-300 mx-1"></div>
                    <button className="p-1.5 hover:bg-gray-200 rounded-none font-bold text-black bg-yellow-200">A</button>
                    <div className="w-px h-5 bg-gray-300 mx-1"></div>
                    <button className="p-1.5 hover:bg-gray-200 rounded-none text-gray-700"><AlignLeft className="w-4 h-4" /></button>
                    <button className="p-1.5 hover:bg-gray-200 rounded-none text-gray-700"><AlignCenter className="w-4 h-4" /></button>
                    <button className="p-1.5 hover:bg-gray-200 rounded-none text-gray-700"><AlignRight className="w-4 h-4" /></button>
                    <button className="p-1.5 hover:bg-gray-200 rounded-none text-gray-700"><AlignJustify className="w-4 h-4" /></button>
                    <div className="w-px h-5 bg-gray-300 mx-1"></div>
                    <button className="p-1.5 hover:bg-gray-200 rounded-none text-gray-700"><Link2 className="w-4 h-4" /></button>
                    <button className="p-1.5 hover:bg-gray-200 rounded-none text-gray-700"><Image className="w-4 h-4" /></button>
                    <button className="p-1.5 hover:bg-gray-200 rounded-none text-gray-700"><Video className="w-4 h-4" /></button>
                    <button className="p-1.5 hover:bg-gray-200 rounded-none text-gray-700"><Code className="w-4 h-4" /></button>
                    <button className="p-1.5 hover:bg-gray-200 rounded-none text-gray-700"><HelpCircle className="w-4 h-4" /></button>
                  </div>
                  {/* Editor Area */}
                  <textarea 
                    className="w-full h-[250px] p-4 text-sm outline-none resize-none"
                  ></textarea>
                  {/* Footer resize handle */}
                  <div className="h-3 bg-gray-50 border-t border-gray-200 flex justify-center items-center cursor-row-resize">
                    <div className="w-8 h-1 bg-gray-300 rounded-none"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center">
              <Code className="w-5 h-5 text-[#5542f6] mr-2" />
              <h2 className="text-base font-bold text-gray-800">Dynamic Placeholders</h2>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-500">Insert dynamic data like student names or class details.</p>
              {/* Placeholders can go here */}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden p-6">
            <div className="flex items-center mb-6">
              <Users className="w-5 h-5 text-[#5542f6] mr-2" />
              <h3 className="text-base font-bold text-gray-800">Select Recipients</h3>
            </div>
            
            <div className="mb-6">
              <label className="block text-[13px] font-bold text-gray-700 mb-1">
                Recipient Group <span className="text-red-500">*</span>
              </label>
              <select className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none focus:border-[#5542f6] bg-white">
                <option>All Parents</option>
                <option>All Staff</option>
                <option>Specific Classes</option>
              </select>
            </div>
            
            <button className="w-full py-3 bg-[#5542f6] text-white rounded-none font-bold hover:bg-[#4a3ae0] shadow-sm flex items-center justify-center">
              <Send className="w-4 h-4 mr-2" /> Dispatch Broadcast
            </button>
          </div>
          
          <div className="bg-white rounded-none border border-[#f5c6cb] shadow-sm overflow-hidden p-6 relative">
            {/* Soft background tint for the warning card like the screenshot shows */}
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-5 h-5 text-[#856404] mr-2" />
              <h3 className="text-sm font-bold text-gray-800">Before you dispatch</h3>
            </div>
            
            <ul className="space-y-4">
              <li className="flex items-start text-[13px] text-gray-600 leading-relaxed border-b border-gray-100 pb-3">
                <div className="w-1 h-1 rounded-none bg-[#5542f6] mt-2 mr-3 flex-shrink-0"></div>
                <div><strong className="text-gray-700 font-bold">Queued, not instant</strong> — dispatching queues the message for background sending. There is no draft step and no way to recall it once queued.</div>
              </li>
              <li className="flex items-start text-[13px] text-gray-600 leading-relaxed border-b border-gray-100 pb-3">
                <div className="w-1 h-1 rounded-none bg-[#5542f6] mt-2 mr-3 flex-shrink-0"></div>
                <div><strong className="text-gray-700 font-bold">Formatting is email-only</strong> — SMS, WhatsApp and push strip the HTML and receive plain text.</div>
              </li>
              <li className="flex items-start text-[13px] text-gray-600 leading-relaxed">
                <div className="w-1 h-1 rounded-none bg-[#5542f6] mt-2 mr-3 flex-shrink-0"></div>
                <div><strong className="text-gray-700 font-bold">Student placeholders</strong> only resolve for parents. For staff recipients they fall back to "Student" / "N/A", so prefer <code className="text-[#dc3545] bg-[#ffebee] px-1 rounded">[recipient_name]</code> in mixed sends.</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
