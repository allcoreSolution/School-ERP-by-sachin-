import React from 'react';
import { 
  Palette, Cake, Gift, Clock, Save, Lightbulb
} from 'lucide-react';

export default function AutoSendSettings() {
  return (
    <div className="bg-[#f4f7fc] min-h-[calc(100vh-64px)] font-sans p-6 pb-20">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-[22px] font-semibold text-gray-800 leading-tight">Auto-send Settings</h1>
          <p className="text-gray-500 text-[13px] mt-0.5">Send personalised cards automatically on birthdays & festivals</p>
        </div>
        
        <button className="flex items-center px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-none text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
          <Palette className="w-4 h-4 mr-2" />
          Manage designs
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Birthday Cards */}
          <div className="bg-white rounded-none border border-gray-200 shadow-sm flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center bg-white">
              <Cake className="w-4 h-4 text-[#5542f6] mr-2" />
              <h2 className="text-sm font-bold text-gray-800">Birthday cards</h2>
            </div>
            
            <div className="p-5">
              {/* Students */}
              <div className="mb-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-sm font-bold text-gray-800">Students</h3>
                    <p className="text-[12px] text-gray-500">Send a card to parents on a student's birthday</p>
                  </div>
                  {/* Toggle */}
                  <div className="w-10 h-5 bg-gray-300 rounded-none relative cursor-pointer flex-shrink-0 mt-1">
                    <div className="w-4 h-4 bg-white rounded-none absolute top-0.5 left-0.5"></div>
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1">Student birthday design</label>
                  <select className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none bg-white focus:border-[#5542f6]">
                    <option>— None —</option>
                    <option>Modern Birthday Card</option>
                    <option>Classic Balloon Theme</option>
                    <option>Fun Kids Design</option>
                    <option>Elegant Style</option>
                  </select>
                </div>
              </div>

              <hr className="border-gray-100 my-5" />

              {/* Staff */}
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-sm font-bold text-gray-800">Staff</h3>
                    <p className="text-[12px] text-gray-500">Send a card to staff on their birthday</p>
                  </div>
                  {/* Toggle */}
                  <div className="w-10 h-5 bg-gray-300 rounded-none relative cursor-pointer flex-shrink-0 mt-1">
                    <div className="w-4 h-4 bg-white rounded-none absolute top-0.5 left-0.5"></div>
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1">Staff birthday design</label>
                  <select className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none bg-white focus:border-[#5542f6]">
                    <option>— None —</option>
                    <option>Professional Greeting</option>
                    <option>Minimalist White</option>
                    <option>Corporate Blue</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Festival Greetings */}
          <div className="bg-white rounded-none border border-gray-200 shadow-sm flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center bg-white">
              <Gift className="w-4 h-4 text-[#5542f6] mr-2" />
              <h2 className="text-sm font-bold text-gray-800">Festival greetings</h2>
            </div>
            
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-sm font-bold text-gray-800">Festival cards</h3>
                  <p className="text-[12px] text-gray-500">Push a card to all app users on each festival you opt into</p>
                </div>
                {/* Toggle */}
                <div className="w-10 h-5 bg-gray-300 rounded-none relative cursor-pointer flex-shrink-0 mt-1">
                  <div className="w-4 h-4 bg-white rounded-none absolute top-0.5 left-0.5"></div>
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-bold text-gray-700 mb-1">Festival design</label>
                <select className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none bg-white focus:border-[#5542f6]">
                  <option>— None —</option>
                  <option>Diwali Special</option>
                  <option>Holi Colors</option>
                  <option>Christmas Theme</option>
                  <option>Eid Mubarak Style</option>
                  <option>Generic Festive Sparkle</option>
                </select>
                <p className="text-[11px] text-gray-500 mt-1">
                  Choose which festivals to greet in <a href="/engagement/festival-greetings" className="text-[#fd7e14] hover:underline font-medium">Festival Greetings</a>.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Timing */}
          <div className="bg-white rounded-none border border-gray-200 shadow-sm flex flex-col">
            <div className="p-4 border-b border-gray-100 flex items-center bg-white">
              <Clock className="w-4 h-4 text-[#5542f6] mr-2" />
              <h2 className="text-sm font-bold text-gray-800">Timing</h2>
            </div>
            
            <div className="p-5">
              <div className="mb-4">
                <label className="block text-[12px] font-bold text-gray-700 mb-1">Daily send time</label>
                <div className="relative">
                  <input 
                    type="time" 
                    defaultValue="09:00"
                    className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none focus:border-[#5542f6]" 
                  />
                </div>
                <p className="text-[11px] text-gray-400 mt-1">In your school's timezone. Cards go out around this hour.</p>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-100 flex justify-end">
              <button className="flex items-center px-4 py-2 bg-[#5542f6] text-white rounded-none text-sm font-bold hover:bg-[#4a3ae0] shadow-sm">
                <Save className="w-4 h-4 mr-2" /> Save settings
              </button>
            </div>
          </div>

          {/* How it works */}
          <div>
            <div className="flex items-center mb-3 text-gray-800">
              <Lightbulb className="w-4 h-4 text-gray-600 mr-2" />
              <h3 className="text-[13px] font-bold">How it works</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start text-[12px] text-gray-600">
                <div className="w-1 h-1 rounded-none bg-[#5542f6] mt-1.5 mr-2 flex-shrink-0"></div>
                <span>Cards are <strong className="font-bold text-gray-700">personalised</strong> with the student's name, photo and age.</span>
              </li>
              <li className="flex items-start text-[12px] text-gray-600">
                <div className="w-1 h-1 rounded-none bg-[#5542f6] mt-1.5 mr-2 flex-shrink-0"></div>
                <span>Delivered as a <strong className="font-bold text-gray-700">push image</strong> and attached to the birthday email.</span>
              </li>
              <li className="flex items-start text-[12px] text-gray-600">
                <div className="w-1 h-1 rounded-none bg-[#5542f6] mt-1.5 mr-2 flex-shrink-0"></div>
                <span>Each greeting is sent <strong className="font-bold text-gray-700">once per day</strong> — safe against retries.</span>
              </li>
              <li className="flex items-start text-[12px] text-gray-600">
                <div className="w-1 h-1 rounded-none bg-[#5542f6] mt-1.5 mr-2 flex-shrink-0"></div>
                <span>Text birthday messages still send even without a card design.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}
