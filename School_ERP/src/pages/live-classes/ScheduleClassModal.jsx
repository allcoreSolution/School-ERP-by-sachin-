import React from 'react';
import { X, Plus, Calendar } from 'lucide-react';

export default function ScheduleClassModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-start pt-10 overflow-y-auto font-sans">
      <div className="bg-white rounded-none shadow-xl w-full max-w-4xl mb-10 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-[#5542f6] rounded-none flex items-center justify-center mr-3 text-white">
              <Plus className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800 leading-tight">Schedule a Class</h2>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">New Live Class</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 bg-[#f8f9fc] flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            
            {/* Column 1 */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Class Title</label>
                <input type="text" className="w-full border border-gray-300 rounded-none p-2.5 focus:ring-1 focus:ring-[#5542f6] focus:border-[#5542f6] outline-none transition-all bg-white" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Class</label>
                <select className="w-full border border-gray-300 rounded-none p-2.5 focus:ring-1 focus:ring-[#5542f6] outline-none bg-white text-gray-600">
                  <option>Select Class</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Section</label>
                <select className="w-full border border-gray-300 rounded-none p-2.5 focus:ring-1 focus:ring-[#5542f6] outline-none bg-white text-gray-600">
                  <option>Select a class first</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                <select className="w-full border border-gray-300 rounded-none p-2.5 focus:ring-1 focus:ring-[#5542f6] outline-none bg-white text-gray-600">
                  <option>Select a class first</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Teacher</label>
                <select className="w-full border border-gray-300 rounded-none p-2.5 focus:ring-1 focus:ring-[#5542f6] outline-none bg-white text-gray-600">
                  <option>Select Teacher</option>
                </select>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Start Date & Time</label>
                <div className="relative">
                  <input type="text" placeholder="dd-mm-yyyy --:--" className="w-full border border-gray-300 rounded-none p-2.5 focus:ring-1 focus:ring-[#5542f6] outline-none bg-white" />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Duration (in minutes)</label>
                <input type="number" defaultValue="40" className="w-full border border-gray-300 rounded-none p-2.5 focus:ring-1 focus:ring-[#5542f6] outline-none bg-white" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Live Class Provider</label>
                <select className="w-full border border-gray-300 rounded-none p-2.5 focus:ring-1 focus:ring-[#5542f6] outline-none bg-white text-gray-700">
                  <option>External Link (Zoom / Meet / Teams) (Default)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                  Providers requiring credentials (e.g. Zoom) appear here only after they're configured in <a href="#" className="text-[#d97706] hover:underline font-medium">Provider Settings</a>.
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Meeting Link (Zoom, Google Meet, etc.)</label>
                <input type="text" placeholder="https://..." className="w-full border border-gray-300 rounded-none p-2.5 focus:ring-1 focus:ring-[#5542f6] outline-none bg-white" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Description (Optional - e.g., Meeting ID, Passcode)</label>
                <textarea rows="3" className="w-full border border-gray-300 rounded-none p-2.5 focus:ring-1 focus:ring-[#5542f6] outline-none bg-white resize-none"></textarea>
              </div>
            </div>
            
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-100 flex justify-end items-center bg-white">
          <button onClick={onClose} className="text-gray-600 font-medium px-4 py-2 hover:bg-gray-50 rounded-none mr-2 transition-colors">
            Cancel
          </button>
          <button className="bg-[#5542f6] hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-none flex items-center transition-colors shadow-sm">
            <Plus className="w-4 h-4 mr-2" />
            Schedule Class
          </button>
        </div>
        
      </div>
    </div>
  );
}
