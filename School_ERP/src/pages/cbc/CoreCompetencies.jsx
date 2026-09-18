import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Settings } from 'lucide-react';

const CoreCompetencies = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-[#f4f6f8] overflow-y-auto">
      <div className="px-6 py-4 bg-white border-b border-gray-200 flex justify-between items-center shrink-0">
        <h1 className="text-xl font-bold text-[#1a1a2e] flex items-center gap-2">
          <Star className="w-6 h-6 text-teal-600" /> Core Competencies Setup
        </h1>
        <button 
          onClick={() => navigate('/cbc/dashboard')}
          className="bg-white border border-gray-300 text-gray-600 px-3 py-1.5 rounded-none text-[12px] font-bold hover:bg-gray-50 flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white m-6 rounded-none border border-gray-200 shadow-sm">
        <div className="w-20 h-20 rounded-full bg-teal-50 flex items-center justify-center mb-4 relative">
          <Settings className="w-12 h-12 text-teal-200 animate-spin-slow absolute" />
          <Settings className="w-8 h-8 text-teal-500 relative z-10" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Setup Core Competencies</h2>
        <p className="text-[13px] text-gray-500 max-w-lg mb-6">
          This module allows you to define cross-cutting skills like Critical Thinking, Communication, and Digital Literacy that are assessed across all subjects in the CBC framework. The interface is currently being provisioned.
        </p>
        <button 
          onClick={() => navigate('/cbc/dashboard')}
          className="bg-teal-500 text-white px-6 py-2 rounded-none text-[13px] font-bold hover:bg-teal-600 shrink-0 shadow-sm transition-colors"
        >
          Return to Workflow
        </button>
      </div>
    </div>
  );
};

export default CoreCompetencies;
