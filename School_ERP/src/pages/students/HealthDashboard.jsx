import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, Activity, Save, User, Phone, Briefcase, FileText
} from 'lucide-react';

const HealthDashboard = () => {
  const [activeTab, setActiveTab] = useState('Health Overview');

  return (
    <div className="p-6 h-full flex flex-col bg-gray-50 overflow-y-auto">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#e14e4e] flex items-center gap-2">
            <Heart className="w-7 h-7" /> Health Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">Dhruv Agarwal — medical profile, checkups & vaccinations</p>
        </div>
        <div className="text-sm text-gray-500">
          <Link to="/" className="text-orange-500 hover:underline">Home</Link> / <Link to="/students/health" className="text-orange-500 hover:underline">Health Records</Link> / Dhruv Agarwal
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 min-h-0 flex-1">
        
        {/* Left Column (Profile & Contacts) */}
        <div className="w-full lg:w-[320px] flex flex-col gap-6 shrink-0">
          
          {/* Profile Card */}
          <div className="bg-white rounded-none shadow-sm border border-gray-200 p-6 flex flex-col items-center">
            <img 
              src="https://ui-avatars.com/api/?name=Dhruv+Agarwal&background=EEEDFF&color=5F52FF" 
              alt="Dhruv" 
              className="w-24 h-24 rounded-none border border-gray-200 mb-4"
            />
            <h2 className="text-lg font-bold text-gray-800">Dhruv Agarwal</h2>
            <p className="text-sm text-gray-500 mb-6">Nursery - B</p>

            <div className="w-full space-y-4 text-[13px]">
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500 font-medium">Admission No</span>
                <span className="font-bold text-gray-800">YISADM-021</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500 font-medium">Roll No</span>
                <span className="font-bold text-gray-800">1</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500 font-medium">Gender</span>
                <span className="font-bold text-gray-800">Male</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Blood Group</span>
                <span className="font-bold text-[#e14e4e]">B+</span>
              </div>
            </div>

            <button className="mt-6 w-full py-2 bg-gray-50 border border-gray-200 rounded-none text-[13px] font-bold text-gray-700 flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
              <FileText className="w-4 h-4" /> View Full Academic Profile
            </button>
          </div>

          {/* Emergency Contact */}
          <div className="bg-white rounded-none shadow-sm border border-gray-200 p-5">
            <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
              <Phone className="w-4 h-4 text-orange-500" /> Emergency Contact
            </h3>
            <div className="flex items-center gap-2 text-[13px] text-gray-800 font-bold mb-1">
              <User className="w-4 h-4 text-gray-400" /> Mohit Agarwal <span className="text-gray-400 font-normal">(Guardian)</span>
            </div>
            <div className="flex items-center gap-2 text-[13px] text-gray-600 pl-6">
              <Phone className="w-3.5 h-3.5" /> 9876500041
            </div>
          </div>

          {/* Family Doctor */}
          <div className="bg-white rounded-none shadow-sm border border-gray-200 p-5">
            <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
              <Briefcase className="w-4 h-4 text-gray-500" /> Family Doctor
            </h3>
            <p className="text-[13px] text-gray-500">Not specified</p>
          </div>

        </div>

        {/* Right Column (Forms) */}
        <div className="flex-1 bg-white rounded-none shadow-sm border border-gray-200 flex flex-col min-w-0">
          
          {/* Tabs */}
          <div className="flex items-center border-b border-gray-200 px-6 pt-4 gap-4">
            {['Health Overview', 'Regular Checkups', 'Vaccinations'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-2 text-[13px] font-bold flex items-center gap-2 border-b-2 transition-colors ${
                  activeTab === tab 
                    ? 'border-[#5F52FF] text-[#5F52FF]' 
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                {tab === 'Health Overview' && <FileText className="w-4 h-4" />}
                {tab === 'Regular Checkups' && <Activity className="w-4 h-4" />}
                {tab === 'Vaccinations' && <Activity className="w-4 h-4" />}
                {tab}
              </button>
            ))}
          </div>

          {/* Form Content */}
          <div className="p-8 flex-1 overflow-y-auto">
            {activeTab === 'Health Overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Left Form Column */}
                <div className="flex flex-col gap-5">
                  <div>
                    <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Blood Group</label>
                    <select className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF]">
                      <option>B+</option>
                      <option>A+</option>
                      <option>O+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Known Allergies <span className="text-gray-400 font-normal text-[11px]">(Food, Medicine, Environmental)</span></label>
                    <textarea 
                      className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF] min-h-[80px]"
                      placeholder="E.g., Peanuts, Penicillin, Dust"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Chronic Conditions</label>
                    <textarea 
                      className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF] min-h-[80px]"
                      placeholder="E.g., Asthma, Diabetes"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Special/Physical Needs</label>
                    <textarea 
                      className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF] min-h-[80px]"
                      placeholder="E.g., Needs wheelchair access"
                    ></textarea>
                  </div>
                </div>

                {/* Right Form Column */}
                <div className="flex flex-col gap-5">
                  <div>
                    <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Regular Medications</label>
                    <textarea 
                      className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF] min-h-[80px]"
                      placeholder="List any daily medications"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Emergency Medical Instructions</label>
                    <textarea 
                      className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF] min-h-[80px]"
                      placeholder="What to do in case of an emergency episode"
                    ></textarea>
                  </div>
                  <div className="pt-2">
                    <label className="block text-[13px] font-bold text-gray-700 mb-3 border-b border-gray-200 pb-2">Family Doctor / Clinic Details</label>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Doctor/Clinic Name</label>
                        <input type="text" className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF]" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Contact Number</label>
                        <input type="text" className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5F52FF]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="col-span-full pt-4">
                  <button className="bg-[#5F52FF] text-white px-5 py-2.5 rounded-none text-[13px] font-bold hover:bg-[#4E41E6] shadow-sm flex items-center gap-2">
                    <Save className="w-4 h-4" /> Save Health Profile
                  </button>
                </div>
              </div>
            )}
            {activeTab !== 'Health Overview' && (
              <div className="h-full flex items-center justify-center text-gray-400 font-medium text-sm">
                Additional modules for {activeTab} will go here.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default HealthDashboard;
