import React, { useState } from 'react';
import {
  UserCircle, Key, Lock, GraduationCap, Contact, User, UserCheck,
  MapPin, HeartPulse, Landmark, Building
} from 'lucide-react';

// Reuseable Field component for grid layouts
const Field = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">{label}</span>
    <span className="text-sm font-medium text-gray-800">{value || 'N/A'}</span>
  </div>
);

// Reuseable Section Header
const SectionHeader = ({ icon: Icon, title, iconColor = 'text-blue-600' }) => (
  <div className="flex items-center gap-2 mb-4">
    <div className={`p-1.5 rounded-none bg-gray-50 flex items-center justify-center ${iconColor}`}>
      <Icon className="w-4 h-4" />
    </div>
    <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">{title}</h3>
  </div>
);

const STUDENT_PROFILES = {
  1: { 
     name: 'Kabir Singh', class: 'Class V (A)', avatar: 'K', 
     admn: 'YISADMA-10', roll: '5121401', dob: '15 Aug, 2012', 
     gender: 'Male', bloodGroup: 'B+', category: 'General', admnDate: '01 June, 2023',
     guardian: 'Rahul Singh (Father)' 
  },
  2: { 
     name: 'Shlok Verma', class: 'Class III (B)', avatar: 'S', 
     admn: 'YISADMA-05', roll: '4122108', dob: '22 Jan, 2014', 
     gender: 'Male', bloodGroup: 'O+', category: 'OBC', admnDate: '10 July, 2024',
     guardian: 'Aryan Verma (Father)' 
  },
  3: { 
     name: 'Rajesh Singh', class: 'Class II (A)', avatar: 'R', 
     admn: 'YISADMA-01', roll: '3121212', dob: '01 Apr, 2015', 
     gender: 'Male', bloodGroup: 'A+', category: 'OBC', admnDate: '01 April, 2026',
     guardian: 'Anil Verma (Father)' 
  },
};

export default function Profile({ activeChild }) {
  const student = STUDENT_PROFILES[activeChild] || STUDENT_PROFILES[3];

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-5">
      <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>

      <div className="flex flex-col lg:flex-row gap-5 items-start">
        
        {/* ── LEFT COLUMN ─────────────────────────────────────── */}
        <div className="w-full lg:w-[320px] xl:w-[360px] flex flex-col gap-5 flex-shrink-0">
          
          {/* Login Information */}
          <div className="bg-white rounded-none border border-gray-200 overflow-hidden shadow-sm">
            <div className="flex items-center gap-2 p-4 border-b border-gray-100">
              <UserCircle className="w-4 h-4 text-indigo-600" />
              <h3 className="font-bold text-gray-800 text-[13px]">Login Information</h3>
            </div>
            <div className="p-4">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Login Username</p>
              <p className="text-sm font-semibold text-gray-800 mb-4">parent@projectworlds.com</p>
              <p className="text-[12.5px] text-gray-600 leading-relaxed">
                You are signed in as a <span className="font-bold text-gray-800">Parent</span> and viewing the profile for <span className="font-bold text-gray-800">{student.name}</span>.
              </p>
            </div>
          </div>

          {/* Change Login Password */}
          <div className="bg-white rounded-none border border-gray-200 overflow-hidden shadow-sm">
            <div className="flex items-center gap-2 p-4 border-b border-gray-100">
              <Key className="w-4 h-4 text-indigo-600" />
              <h3 className="font-bold text-gray-800 text-[13px]">Change Login Password</h3>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1.5">Current Password</label>
                <input 
                  type="password" 
                  placeholder="Enter your current password"
                  className="w-full border border-gray-200 rounded-none p-2 text-sm focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1.5">New Password</label>
                <input 
                  type="password" 
                  placeholder="Enter a new password"
                  className="w-full border border-gray-200 rounded-none p-2 text-sm focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all placeholder-gray-400"
                />
                <p className="text-[10px] text-gray-500 mt-1.5 leading-tight">Must be at least 8 characters long, with numbers and mixed-case letters.</p>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1.5">Confirm New Password</label>
                <input 
                  type="password" 
                  placeholder="Confirm the new password"
                  className="w-full border border-gray-200 rounded-none p-2 text-sm focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all placeholder-gray-400"
                />
              </div>
              <div className="pt-2 flex justify-center lg:justify-start">
                <button className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-none text-[13px] font-semibold transition-colors">
                  <Lock className="w-3.5 h-3.5" />
                  Update Password
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* ── RIGHT COLUMN ────────────────────────────────────── */}
        <div className="flex-1 bg-white rounded-none border border-gray-200 shadow-sm divide-y divide-gray-100">
          
          {/* Header Block */}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
               <GraduationCap className="w-4 h-4 text-indigo-600" />
               <h3 className="font-bold text-gray-800 text-[13px] uppercase tracking-wide">Student Details</h3>
            </div>
            
            <div className="flex items-center gap-5">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-none border-2 border-indigo-100 bg-indigo-500 flex items-center justify-center flex-shrink-0 shadow-inner">
                <span className="text-3xl font-extrabold text-white">{student.avatar}</span>
              </div>
              {/* Info */}
              <div>
                <h2 className="text-xl font-bold text-gray-800 uppercase tracking-tight">{student.name}</h2>
                <p className="text-[13px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 inline-block mb-2.5 rounded-none mt-1">{student.class}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 bg-green-50 z-10 text-green-600 text-[10px] font-bold rounded-none border border-green-200">Active Status</span>
                  <span className="px-2 py-0.5 bg-gray-50 text-gray-700 border border-gray-200 text-[10px] font-bold rounded-none uppercase">ID: {student.admn}</span>
                  <span className="px-2 py-0.5 bg-gray-50 text-gray-700 border border-gray-200 text-[10px] font-bold rounded-none uppercase">Roll: {student.roll}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 1: Academic & Personal */}
          <div className="p-6">
            <SectionHeader icon={GraduationCap} title="Academic & Personal Details" iconColor="text-blue-600" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-5 gap-x-4">
              <Field label="Admission No" value={student.admn} />
              <Field label="Roll Number" value={student.roll} />
              <Field label="Admission Date" value={student.admnDate} />
              
              <Field label="Gender" value={student.gender} />
              <Field label="Date of Birth" value={student.dob} />
              <Field label="Place of Birth" value="" />
              
              <Field label="Nationality" value="Indian" />
              <Field label="Biometric ID" value={`BIO-${student.roll}`} />
              <Field label="Pen Number" value="" />
              
              <Field label="House" value="" />
              <Field label="Category" value={student.category} />
              <Field label="Blood Group" value={student.bloodGroup} />
              
              <Field label="Religion & Caste" value="" />
              <Field label="Mother Tongue" value="" />
              <Field label="National ID" value="" />
              
              <Field label="BPL Status" value="No" />
              <Field label="RTE Status" value="No" />
            </div>
          </div>

          {/* Section 2: Contact Details */}
          <div className="p-6 bg-gray-50/50">
            <SectionHeader icon={Contact} title="Contact Details" iconColor="text-purple-600" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-5 gap-x-4">
              <Field label="Student Mobile Number" value="" />
              <Field label="Student Email" value={`S${student.admn}`} />
              <Field label="Parent Email" value="parent@projectworlds.com" />
            </div>
          </div>

          {/* Section 3: Father's Info */}
          <div className="p-6">
            <SectionHeader icon={User} title="Father's Information" iconColor="text-blue-500" />
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-y-5 gap-x-4">
              <div className="sm:col-span-12 md:col-span-3 flex flex-col">
                 <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">Photo</span>
                 <div className="w-16 h-16 bg-blue-50 text-blue-500 font-bold text-xl flex items-center justify-center rounded-none border border-blue-100 relative overflow-hidden">
                   <User className="absolute inset-x-auto w-8 h-8 opacity-50" />
                 </div>
              </div>
              <div className="sm:col-span-6 md:col-span-4 lg:col-span-3">
                 <Field label="Name" value={student.guardian} />
              </div>
              <div className="sm:col-span-6 md:col-span-5 lg:col-span-6">
                 <Field label="Mobile Number" value="6263056779" />
              </div>
              
              <div className="sm:col-span-12 md:col-span-3">
                 <Field label="Occupation" value="" />
              </div>
              <div className="sm:col-span-6 md:col-span-4 lg:col-span-3">
                 <Field label="Qualification" value="" />
              </div>
              <div className="sm:col-span-6 md:col-span-5 lg:col-span-6">
                 <Field label="Annual Income" value="" />
              </div>

              <div className="sm:col-span-12 md:col-span-3">
                 <Field label="Aadhaar" value="" />
              </div>
            </div>
          </div>

          {/* Section 4: Mother's Info */}
          <div className="p-6 bg-gray-50/50">
            <SectionHeader icon={User} title="Mother's Information" iconColor="text-pink-500" />
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-y-5 gap-x-4">
              <div className="sm:col-span-12 md:col-span-3 flex flex-col">
                 <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">Photo</span>
                 <div className="w-16 h-16 bg-pink-50 text-pink-500 font-bold text-xl flex items-center justify-center rounded-none border border-pink-100 relative overflow-hidden">
                   <User className="absolute inset-x-auto w-8 h-8 opacity-50" />
                 </div>
              </div>
              <div className="sm:col-span-6 md:col-span-4 lg:col-span-3">
                 <Field label="Name" value="Not Provided" />
              </div>
              <div className="sm:col-span-6 md:col-span-5 lg:col-span-6">
                 <Field label="Mobile Number" value="" />
              </div>
              
              <div className="sm:col-span-12 md:col-span-3">
                 <Field label="Occupation" value="" />
              </div>
              <div className="sm:col-span-6 md:col-span-4 lg:col-span-3">
                 <Field label="Qualification" value="" />
              </div>
              <div className="sm:col-span-6 md:col-span-5 lg:col-span-6">
                 <Field label="Aadhaar" value="" />
              </div>
            </div>
          </div>

          {/* Section 5: Guardian's Info */}
          <div className="p-6">
            <SectionHeader icon={UserCheck} title="Guardian Information" iconColor="text-orange-500" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-5 gap-x-4">
              <Field label="Name" value={student.guardian} />
              <Field label="Mobile Number" value="6263056779" />
              <Field label="Email" value="parent@projectworlds.com" />
              <Field label="Occupation" value="Father" />
              <div className="md:col-span-2">
                 <Field label="Address" value="47 W 13th St, New York, NY 10011, USA" />
              </div>
            </div>
          </div>

          {/* Section 6: Address & Emergency */}
          <div className="p-6 bg-gray-50/50">
            <SectionHeader icon={MapPin} title="Address & Emergency" iconColor="text-teal-600" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-5 gap-x-4">
              <Field label="Emergency Contact" value="" />
              <div className="hidden md:block col-span-2"></div>
              
              <div className="md:col-span-3">
                <Field label="Current Address" value="47 W 13th St, New York, NY 10011, USA" />
              </div>
              <div className="md:col-span-3">
                <Field label="Permanent Address" value="Same as current address" />
              </div>
            </div>
          </div>

          {/* Section 7: Health & Medical Details */}
          <div className="p-6">
            <SectionHeader icon={HeartPulse} title="Health & Medical Details" iconColor="text-red-500" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-5 gap-x-4">
              <Field label="Height" value="" />
              <Field label="Weight" value="" />
              <div className="hidden md:block"></div>
              
              <div className="md:col-span-3">
                <Field label="Medical History" value="None" />
              </div>
            </div>
          </div>

          {/* Section 8: Bank Details */}
          <div className="p-6 bg-gray-50/50">
            <SectionHeader icon={Landmark} title="Bank Details" iconColor="text-gray-500" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-5 gap-x-4">
              <Field label="Bank Name" value="" />
              <Field label="Account No" value="" />
              <Field label="IFSC Code" value="" />
            </div>
          </div>

          {/* Section 9: Previous School Details */}
          <div className="p-6">
            <SectionHeader icon={Building} title="Previous School Details" iconColor="text-slate-500" />
            <div className="grid grid-cols-1 gap-y-5">
              <Field label="Details" value="N/A" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
