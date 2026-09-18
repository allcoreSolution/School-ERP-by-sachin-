import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Network, Route } from 'lucide-react';

const PathwaysTracks = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-[#f4f6f8] overflow-y-auto">
      <div className="px-6 py-4 bg-white border-b border-gray-200 flex justify-between items-center shrink-0">
        <h1 className="text-xl font-bold text-[#1a1a2e] flex items-center gap-2">
          <Network className="w-6 h-6 text-purple-600" /> Pathways & Tracks Config
        </h1>
        <button 
          onClick={() => navigate('/cbc/dashboard')}
          className="bg-white border border-gray-300 text-gray-600 px-3 py-1.5 rounded-none text-[12px] font-bold hover:bg-gray-50 flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white m-6 rounded-none border border-gray-200 shadow-sm">
        <div className="w-20 h-20 rounded-full bg-purple-50 flex items-center justify-center mb-4 border border-purple-100">
          <Route className="w-10 h-10 text-purple-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Senior Secondary Pathways</h2>
        <p className="text-[13px] text-gray-500 max-w-lg mb-6">
          Define educational Pathways (e.g., STEM, Arts, Sports) and specialized Tracks containing compulsory and elective subjects. This complex mapping interface is currently actively under development.
        </p>
        <button 
          onClick={() => navigate('/cbc/dashboard')}
          className="bg-purple-600 text-white px-6 py-2 rounded-none text-[13px] font-bold hover:bg-purple-700 shrink-0 shadow-sm transition-colors"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PathwaysTracks;
