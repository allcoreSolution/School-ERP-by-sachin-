import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, X } from 'lucide-react';

const GateTerminal = () => {
  const navigate = useNavigate();
  const [scanInput, setScanInput] = useState('');

  return (
    <div className="flex flex-col h-screen bg-[#111418] text-white overflow-hidden">
      
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-800 bg-[#161a20]">
        <div className="flex items-center gap-4">
          <span className="font-bold text-[14px]">YUG-SCHOOL</span>
          <span className="text-gray-400 text-[12px]">- signed in as school admin</span>
        </div>
        <div className="flex items-center gap-4">
          <select className="bg-[#2a2f36] border-none text-white text-[12px] rounded-none px-3 py-1.5 focus:outline-none">
            <option>Main Gate</option>
          </select>
          <div className="flex gap-4 text-[14px] font-bold">
            <div className="text-center">3</div>
            <div className="text-center">0</div>
          </div>
          <button 
            onClick={() => navigate('/front-office/gate-passes')}
            className="text-gray-400 hover:text-white flex items-center gap-1 text-[12px]"
          >
            <X className="w-4 h-4" /> Exit
          </button>
        </div>
      </div>

      <div className="flex flex-1 p-6 gap-6 h-[calc(100vh-64px)] overflow-hidden">
        
        {/* Left Side: Camera & Input */}
        <div className="w-1/2 flex flex-col gap-4">
          
          {/* Camera Frame */}
          <div className="flex-1 bg-[#1a1f26] rounded-none border border-gray-700 relative overflow-hidden flex items-center justify-center">
            {/* Mock Camera Feed Background */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544717302-de2939b7ef71?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
            
            {/* Scanning Overlay Box */}
            <div className="relative w-64 h-64 border-2 border-white/80 rounded-none z-10 flex flex-col justify-between">
              {/* Corner brackets for scanner effect */}
              <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-white"></div>
              <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-white"></div>
              <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-white"></div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-white"></div>
            </div>
            
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded">LIVE</span>
            </div>
            <div className="absolute top-4 right-4 z-10 opacity-50">
              <span className="font-bold tracking-widest">OUR CLIENT'S</span>
            </div>
          </div>

          {/* Input Area */}
          <div className="bg-[#1a1f26] p-4 rounded-none border border-gray-700">
            <label className="block text-[11px] font-bold text-[#5c7cfa] mb-2 uppercase tracking-wide">
              OR SCAN / TYPE THE CODE
            </label>
            <input 
              type="text" 
              placeholder="Pass QR, or the student's ID card" 
              value={scanInput}
              onChange={(e) => setScanInput(e.target.value)}
              className="w-full bg-[#111418] border border-[#5c7cfa] rounded-none px-4 py-3 text-[14px] text-white focus:outline-none focus:ring-1 focus:ring-[#5c7cfa] shadow-[0_0_8px_rgba(92,124,250,0.3)]"
            />
            <p className="text-[11px] text-gray-400 mt-2">
              A USB scanner types the code and presses Enter. Works with the printed pass QR or the person's existing ID card.
            </p>
          </div>
          
        </div>

        {/* Right Side: Status Display */}
        <div className="w-1/2 flex flex-col gap-4">
          
          <div className="flex-1 bg-[#161a20] rounded-none border border-gray-800 p-8 flex flex-col">
            
            <div className="flex items-start gap-4 mb-16">
              <div className="bg-[#2a2f36] p-2 rounded">
                <QrCode className="w-8 h-8 text-gray-300" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-300 tracking-wide">READY</h2>
                <p className="text-gray-400 text-[13px] mt-1">Scan a gate pass or an ID card.</p>
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
              <QrCode className="w-16 h-16 opacity-30 mb-4" />
              <p className="text-[14px]">Waiting for a scan.</p>
            </div>
            
          </div>

          <div>
            <button 
              onClick={() => setScanInput('')}
              className="bg-transparent border border-gray-600 text-gray-300 px-6 py-2.5 rounded-none hover:bg-gray-800 transition-colors text-[14px] font-bold"
            >
              Clear
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default GateTerminal;
