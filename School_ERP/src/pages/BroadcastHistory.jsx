import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Layers, Plus } from 'lucide-react';

export default function BroadcastHistory() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Broadcast History</h1>
          <p className="text-sm text-gray-500 mt-1">This session — messages sent to parents and staff</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-none text-sm font-bold hover:bg-gray-50 shadow-sm">
            <Layers className="w-4 h-4 mr-2" /> View all sessions
          </button>
          <button 
            onClick={() => navigate('/communicate/compose-broadcast')}
            className="flex items-center px-4 py-2 bg-[#5542f6] text-white rounded-none text-sm font-bold hover:bg-[#4a3ae0] shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" /> Compose New Broadcast
          </button>
        </div>
      </div>

      <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden flex flex-col min-h-[400px]">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center">
            <Send className="w-4 h-4 text-[#5542f6] mr-2 -rotate-45" />
            <h2 className="text-sm font-bold text-gray-800">Previously Sent Messages</h2>
          </div>
          <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-none">
            0 broadcasts
          </span>
        </div>
        
        <div className="overflow-x-auto border-b border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f8f9fe]">
                <th className="p-3 text-[12px] font-bold text-[#5542f6] w-12 text-center">#</th>
                <th className="p-3 text-[12px] font-bold text-[#5542f6]">DATE</th>
                <th className="p-3 text-[12px] font-bold text-[#5542f6]">SUBJECT</th>
                <th className="p-3 text-[12px] font-bold text-[#5542f6]">CHANNELS</th>
                <th className="p-3 text-[12px] font-bold text-[#5542f6]">TARGET</th>
                <th className="p-3 text-[12px] font-bold text-[#5542f6] text-center">ANALYTICS (S/D/O)</th>
                <th className="p-3 text-[12px] font-bold text-[#5542f6]">STATUS</th>
                <th className="p-3 text-[12px] font-bold text-[#5542f6] text-right">ACTION</th>
              </tr>
            </thead>
          </table>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center p-10 bg-gray-50/30">
          <div className="w-12 h-12 bg-[#f3f0ff] rounded-none flex items-center justify-center mb-4">
            <Send className="w-5 h-5 text-[#5542f6] -rotate-45" />
          </div>
          <h3 className="text-sm font-bold text-gray-800 mb-1">No broadcasts yet</h3>
          <p className="text-sm text-gray-500 text-center">Messages you send appear here with their delivery stats.</p>
        </div>
      </div>
    </div>
  );
}
