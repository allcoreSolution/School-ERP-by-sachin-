import React, { useState } from 'react';
import { 
  Stethoscope, 
  Info, 
  FileText, 
  Syringe, 
  AlertTriangle, 
  ClipboardPaste, 
  Pill, 
  Accessibility, 
  Ambulance,
  User
} from 'lucide-react';

export default function HealthRecords() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="p-4 md:p-6 max-w-[1400px] mx-auto min-h-screen bg-[#f8f9fa] space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
         <div className="flex items-center gap-3">
            <Stethoscope className="w-7 h-7 text-red-600" strokeWidth={2.5}/>
            <h1 className="text-[24px] font-bold text-[#1f2937] tracking-tight">Health Records</h1>
         </div>
         <div className="text-[13px] font-medium text-gray-500">
            <span className="text-orange-500 cursor-pointer hover:underline">Home</span> <span className="mx-1">/</span> <span>Health Records</span>
         </div>
      </div>

      {/* Main Layout Grid */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
         
         {/* LEFT COLUMN: Profile info */}
         <div className="w-full lg:w-[320px] flex flex-col gap-4 flex-shrink-0">
            
            {/* Student Card */}
            <div className="bg-white border border-gray-200 rounded-none shadow-sm flex flex-col">
               
               <div className="p-8 pb-6 flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-gray-100 border-[3px] border-indigo-50 flex items-center justify-center rounded-none shadow-sm overflow-hidden mb-4 relative group">
                     {/* Using a square placeholder image mimicking the screenshot */}
                     <img 
                        src="https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" 
                        alt="Kabir Singh"
                        className="w-full h-full object-cover rounded-none filter hover:brightness-110 transition-all"
                     />
                  </div>
                  <h2 className="text-[18px] font-extrabold text-gray-900 tracking-tight">Kabir Singh</h2>
                  <p className="text-[13px] text-gray-500 font-medium mt-0.5">Nursery - A</p>
               </div>

               <div className="px-6 pb-6">
                  <div className="flex items-center justify-between py-3 border-t border-gray-100">
                     <span className="text-[13px] font-bold text-gray-600">Blood Group</span>
                     <span className="text-[12px] font-extrabold text-red-500 bg-red-50 border border-red-100 px-2 py-0.5 rounded-none">O-</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-t border-gray-100">
                     <span className="text-[13px] font-bold text-gray-600">Height</span>
                     <span className="text-[13px] font-extrabold text-gray-800">105 cm</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-t border-gray-100">
                     <span className="text-[13px] font-bold text-gray-600">Weight</span>
                     <span className="text-[13px] font-extrabold text-gray-800">17 kg</span>
                  </div>
               </div>

            </div>

            {/* Note Card */}
            <div className="bg-[#f5f3ff] border border-[#ede9fe] rounded-none p-4 flex items-start gap-3 shadow-sm">
               <Info className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
               <p className="text-[12px] text-indigo-800 font-medium leading-relaxed">
                  To update health records or allergies, please contact the school administration or nurse.
               </p>
            </div>

         </div>

         {/* RIGHT COLUMN: Tabs & Info */}
         <div className="flex-1 w-full flex flex-col">
            
            {/* Tabs */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
               <button 
                  onClick={() => setActiveTab('Overview')}
                  className={`px-5 py-2.5 flex items-center gap-2 text-[13px] font-bold rounded-none border shadow-sm transition-colors
                     ${activeTab === 'Overview' 
                        ? 'bg-indigo-600 border-indigo-600 text-white' 
                        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
               >
                  <FileText className="w-4 h-4"/> Health Overview
               </button>
               <button 
                  onClick={() => setActiveTab('Checkups')}
                  className={`px-5 py-2.5 flex items-center gap-2 text-[13px] font-bold rounded-none border shadow-sm transition-colors
                     ${activeTab === 'Checkups' 
                        ? 'bg-indigo-600 border-indigo-600 text-white' 
                        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
               >
                  <Stethoscope className="w-4 h-4"/> Checkups
               </button>
               <button 
                  onClick={() => setActiveTab('Vaccinations')}
                  className={`px-5 py-2.5 flex items-center gap-2 text-[13px] font-bold rounded-none border shadow-sm transition-colors
                     ${activeTab === 'Vaccinations' 
                        ? 'bg-indigo-600 border-indigo-600 text-white' 
                        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
               >
                  <Syringe className="w-4 h-4"/> Vaccinations
               </button>
            </div>

            {/* Tab Contents */}
            {activeTab === 'Overview' && (
               <div className="space-y-4 animate-in fade-in duration-200">
                  {/* Grid 2x2 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     
                     <div className="bg-white border border-gray-200 p-5 flex items-center gap-4 rounded-none shadow-sm hover:border-red-200 transition-colors">
                        <div className="w-[48px] h-[48px] flex items-center justify-center bg-red-50 border border-red-100 flex-shrink-0 rounded-none">
                           <AlertTriangle className="w-[22px] h-[22px] text-red-500" strokeWidth={2.5}/>
                        </div>
                        <div className="flex flex-col gap-0.5">
                           <h3 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest">Known Allergies</h3>
                           <p className="text-[13.5px] font-medium text-gray-500">None reported</p>
                        </div>
                     </div>
                     
                     <div className="bg-white border border-gray-200 p-5 flex items-center gap-4 rounded-none shadow-sm hover:border-orange-200 transition-colors">
                        <div className="w-[48px] h-[48px] flex items-center justify-center bg-amber-50 border border-amber-100 flex-shrink-0 rounded-none">
                           <ClipboardPaste className="w-[22px] h-[22px] text-amber-600" strokeWidth={2.5}/>
                        </div>
                        <div className="flex flex-col gap-0.5">
                           <h3 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest">Chronic Conditions</h3>
                           <p className="text-[13.5px] font-medium text-gray-500">None reported</p>
                        </div>
                     </div>

                     <div className="bg-white border border-gray-200 p-5 flex items-center gap-4 rounded-none shadow-sm hover:border-blue-200 transition-colors">
                        <div className="w-[48px] h-[48px] flex items-center justify-center bg-blue-50 border border-blue-100 flex-shrink-0 rounded-none">
                           <Pill className="w-[22px] h-[22px] text-blue-500" strokeWidth={2.5}/>
                        </div>
                        <div className="flex flex-col gap-0.5">
                           <h3 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest">Regular Medications</h3>
                           <p className="text-[13.5px] font-medium text-gray-500">None reported</p>
                        </div>
                     </div>

                     <div className="bg-white border border-gray-200 p-5 flex items-center gap-4 rounded-none shadow-sm hover:border-purple-200 transition-colors">
                        <div className="w-[48px] h-[48px] flex items-center justify-center bg-[#faf5ff] border border-[#f3e8ff] flex-shrink-0 rounded-none">
                           <Accessibility className="w-[22px] h-[22px] text-purple-600" strokeWidth={2.5}/>
                        </div>
                        <div className="flex flex-col gap-0.5">
                           <h3 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest">Special Needs</h3>
                           <p className="text-[13.5px] font-medium text-gray-500">None reported</p>
                        </div>
                     </div>

                  </div>

                  {/* Emergency Box */}
                  <div className="bg-[#fef2f2] border border-red-200 border-l-4 border-l-red-500 p-6 rounded-none shadow-sm mt-2">
                     <h3 className="text-[12.5px] font-extrabold text-red-600 uppercase tracking-wider flex items-center gap-2.5 mb-2">
                        <Ambulance className="w-[18px] h-[18px]" strokeWidth={2.5} /> Emergency Medical Instructions
                     </h3>
                     <p className="text-[13.5px] text-gray-700 font-medium">
                        No specific emergency instructions provided by parent/guardian.
                     </p>
                  </div>
               </div>
            )}

            {activeTab === 'Checkups' && (
               <div className="bg-white border border-gray-200 rounded-none shadow-sm flex flex-col p-5 min-h-[300px] animate-in fade-in duration-200">
                  <h3 className="text-[15px] font-bold text-gray-800 mb-4 border-b border-gray-100 pb-3">Recent Health Checkups</h3>
                  <p className="text-[13px] text-gray-500 font-medium italic">No checkup records found for the current academic session.</p>
               </div>
            )}

            {activeTab === 'Vaccinations' && (
               <div className="bg-white border border-gray-200 rounded-none shadow-sm flex flex-col p-5 min-h-[300px] animate-in fade-in duration-200">
                  <h3 className="text-[15px] font-bold text-gray-800 mb-4 border-b border-gray-100 pb-3">Vaccination History</h3>
                  <table className="w-full text-left border-collapse border-b border-gray-200">
                     <thead>
                        <tr className="bg-[#f2f4ff]">
                           <th className="px-4 py-3 border border-gray-200 text-left text-[10px] uppercase font-bold text-[#4f46e5] tracking-widest">Vaccine Name</th>
                           <th className="px-4 py-3 border border-gray-200 text-left text-[10px] uppercase font-bold text-[#4f46e5] tracking-widest">Date Administered</th>
                           <th className="px-4 py-3 border border-gray-200 text-left text-[10px] uppercase font-bold text-[#4f46e5] tracking-widest">Status</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <td colSpan="3" className="px-4 py-8 text-center text-[13px] text-gray-500 border border-gray-200">No vaccination data available</td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            )}

         </div>
      </div>
    </div>
  );
}
