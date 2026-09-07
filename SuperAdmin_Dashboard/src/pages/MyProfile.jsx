import React from 'react';
import { Key, Lock, User, Mail, Shield, ShieldCheck, KeyRound } from 'lucide-react';

export default function MyProfile() {
  return (
    <div className="max-w-[1200px]">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[22px] font-bold text-gray-800 tracking-tight">My Profile</h1>
        <p className="text-[12px] text-gray-500 mt-1">Manage your account credentials and details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
        {/* Change Password Card */}
        <div className="bg-white rounded-none border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-6">
          <h2 className="text-[14px] font-bold text-gray-800 flex items-center gap-2 mb-6">
            <Key className="w-4 h-4 text-indigo-700 font-bold" /> Change Password
          </h2>
          
          <div className="space-y-5">
            <div>
              <label className="block text-[12px] font-bold text-gray-600 mb-1.5">Current Password</label>
              <div className="flex rounded-none w-full border border-gray-200 overflow-hidden focus-within:border-gray-300 transition-colors bg-white">
                <div className="flex items-center justify-center bg-gray-100/70 border-r border-gray-200 px-3 text-gray-600 shrink-0">
                  <Lock className="w-4 h-4" />
                </div>
                <input type="password" placeholder="Enter your current password" 
                  className="w-full px-3 py-2 text-[13px] focus:outline-none text-gray-700 placeholder-gray-400 font-medium" />
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-bold text-gray-600 mb-1.5">New Password</label>
              <div className="flex rounded-none w-full border border-gray-200 overflow-hidden focus-within:border-gray-300 transition-colors bg-white">
                <div className="flex items-center justify-center bg-gray-100/70 border-r border-gray-200 px-3 text-gray-600 shrink-0">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input type="password" placeholder="Enter a new, strong password" 
                  className="w-full px-3 py-2 text-[13px] focus:outline-none text-gray-700 placeholder-gray-400 font-medium" />
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-bold text-gray-600 mb-1.5">Confirm New Password</label>
              <div className="flex rounded-none w-full border border-gray-200 overflow-hidden focus-within:border-gray-300 transition-colors bg-white">
                <div className="flex items-center justify-center bg-gray-100/70 border-r border-gray-200 px-3 text-gray-600 shrink-0">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input type="password" placeholder="Confirm the new password" 
                  className="w-full px-3 py-2 text-[13px] focus:outline-none text-gray-700 placeholder-gray-400 font-medium" />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button className="flex items-center gap-2 px-4 py-2 text-[13px] font-semibold text-gray-500 border border-gray-200 rounded-none shrink-0 bg-white shadow-sm cursor-not-allowed">
              <Lock className="w-3.5 h-3.5" /> Update disabled in demo
            </button>
          </div>
        </div>

        {/* Account Information Card */}
        <div className="bg-white rounded-none border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-6">
          <h2 className="text-[14px] font-bold text-gray-800 flex items-center gap-2 mb-6">
            <User className="w-4 h-4 text-indigo-700 font-bold" /> Account Information
          </h2>
          
          <div className="space-y-5">
            <div>
              <label className="block text-[12px] font-bold text-gray-600 mb-1.5">Name</label>
              <div className="flex rounded-none w-full border border-gray-200 overflow-hidden focus-within:border-gray-300 transition-colors bg-white">
                <div className="flex items-center justify-center bg-gray-100/70 border-r border-gray-200 px-3 text-gray-600 shrink-0">
                  <User className="w-4 h-4" />
                </div>
                <input type="text" defaultValue="Super Admin" 
                  className="w-full px-3 py-2 text-[13px] focus:outline-none text-gray-500 font-medium" />
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-bold text-gray-600 mb-1.5">Email Address</label>
              <div className="flex rounded-none w-full border border-gray-200 overflow-hidden focus-within:border-gray-300 transition-colors bg-white">
                <div className="flex items-center justify-center bg-gray-100/70 border-r border-gray-200 px-3 text-gray-600 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <input type="email" defaultValue="superadmin@example.com" 
                  className="w-full px-3 py-2 text-[13px] focus:outline-none text-gray-500 font-medium" />
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-bold text-gray-600 mb-1.5">Role</label>
              <div className="flex rounded-none w-full border border-gray-100 bg-gray-50/40 p-2 items-center gap-3">
                <div className="flex items-center justify-center bg-purple-100/60 p-2.5 rounded-none text-indigo-600 shrink-0 border border-purple-100/50">
                  <ShieldCheck className="w-5 h-5 font-bold" />
                </div>
                <div>
                  <p className="text-[14px] font-extrabold text-gray-900 leading-tight block">Super Admin</p>
                  <p className="text-[11px] text-gray-500 font-medium">Roles are managed by the system administrator.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button className="flex items-center gap-2 px-4 py-2 text-[13px] font-semibold text-gray-500 border border-gray-200 rounded-none shrink-0 bg-white shadow-sm cursor-not-allowed">
              <Lock className="w-3.5 h-3.5" /> Update disabled in demo
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
