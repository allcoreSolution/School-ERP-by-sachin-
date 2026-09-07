import React, { useState } from 'react';
import { Key, Lock, User, Mail, ShieldAlert } from 'lucide-react';

const Profile = () => {
  const [passwordForm, setPasswordForm] = useState({
    current: '',
    newPass: '',
    confirm: ''
  });

  const [accountForm, setAccountForm] = useState({
    name: 'Branch Admin',
    email: 'branchAdmin@example.com',
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-1 tracking-tight">My Profile</h1>
        <p className="text-[14px] text-gray-500 font-medium">Manage your account credentials and details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Change Password Card */}
        <div className="bg-white rounded-[3px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col h-full">
          <div className="p-5 border-b border-gray-50/50">
            <h3 className="text-[16px] font-bold text-[#301053] flex items-center gap-2">
              <Key className="w-5 h-5 text-[#5F52FF]" /> Change Password
            </h3>
          </div>
          
          <div className="p-6 flex-1 space-y-5">
            <div>
              <label className="block text-[13px] font-bold text-[#111] mb-1.5 tracking-tight">Current Password</label>
              <div className="flex rounded-[3px] shadow-sm border border-gray-200 overflow-hidden focus-within:ring-1 focus-within:ring-[#5F52FF] focus-within:border-[#5F52FF] transition-all">
                <div className="bg-gray-100 px-3.5 py-2.5 flex items-center justify-center border-r border-gray-200">
                  <Lock className="w-4.5 h-4.5 text-gray-500" />
                </div>
                <input 
                  type="password"
                  placeholder="Enter your current password"
                  value={passwordForm.current}
                  onChange={(e) => setPasswordForm({...passwordForm, current: e.target.value})}
                  className="w-full text-[14px] px-4 py-2.5 outline-none text-gray-700 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-bold text-[#111] mb-1.5 tracking-tight">New Password</label>
              <div className="flex rounded-[3px] shadow-sm border border-gray-200 overflow-hidden focus-within:ring-1 focus-within:ring-[#5F52FF] focus-within:border-[#5F52FF] transition-all">
                <div className="bg-gray-100 px-3.5 py-2.5 flex items-center justify-center border-r border-gray-200">
                  <Key className="w-4.5 h-4.5 text-gray-500" />
                </div>
                <input 
                  type="password"
                  placeholder="Enter a new, strong password"
                  value={passwordForm.newPass}
                  onChange={(e) => setPasswordForm({...passwordForm, newPass: e.target.value})}
                  className="w-full text-[14px] px-4 py-2.5 outline-none text-gray-700 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-bold text-[#111] mb-1.5 tracking-tight">Confirm New Password</label>
              <div className="flex rounded-[3px] shadow-sm border border-gray-200 overflow-hidden focus-within:ring-1 focus-within:ring-[#5F52FF] focus-within:border-[#5F52FF] transition-all">
                <div className="bg-gray-100 px-3.5 py-2.5 flex items-center justify-center border-r border-gray-200">
                  <Key className="w-4.5 h-4.5 text-gray-500" />
                </div>
                <input 
                  type="password"
                  placeholder="Confirm the new password"
                  value={passwordForm.confirm}
                  onChange={(e) => setPasswordForm({...passwordForm, confirm: e.target.value})}
                  className="w-full text-[14px] px-4 py-2.5 outline-none text-gray-700 bg-white"
                />
              </div>
            </div>
          </div>
          
          <div className="p-5 border-t border-gray-50/50 bg-[#f9fafc] flex justify-end gap-3 rounded-b-[3px] mt-auto">
            <button className="flex items-center justify-center gap-2 px-6 py-2 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 text-gray-700 rounded-[3px] font-bold text-[13px] shadow-sm transition-all cursor-pointer">
              Cancel
            </button>
            <button className="flex items-center justify-center gap-2 px-6 py-2 bg-[#1b8c56] hover:bg-[#157145] text-white rounded-[3px] font-bold text-[13px] shadow-sm transition-all focus:ring-2 focus:ring-[#1b8c56]/50 cursor-pointer">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg> Update Password
            </button>
          </div>
        </div>

        {/* Account Information Card */}
        <div className="bg-white rounded-[3px] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col h-full">
          <div className="p-5 border-b border-gray-50/50">
            <h3 className="text-[16px] font-bold text-[#301053] flex items-center gap-2">
              <User className="w-5 h-5 text-[#5F52FF]" /> Account Information
            </h3>
          </div>
          
          <div className="p-6 flex-1 space-y-5">
            {/* Avatar Upload */}
            <div className="flex items-center gap-5 pb-4 border-b border-gray-100">
              <div className="relative group cursor-pointer shrink-0">
                <div className="w-20 h-20 rounded-[3px] bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden shadow-sm">
                   <User className="w-10 h-10 text-gray-400" />
                </div>
                <div className="absolute inset-0 bg-black/50 rounded-[3px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-[13.5px] font-bold text-gray-800">Profile Picture</h4>
                <p className="text-[11.5px] text-gray-500 mt-0.5 mb-2.5">Upload a new avatar. Format: JPG or PNG.</p>
                <div className="flex gap-2.5">
                   <input type="file" id="avatar" className="hidden" accept="image/jpeg, image/png" />
                   <label htmlFor="avatar" className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-bold bg-[#301053] hover:bg-[#200a38] text-white px-4 py-2 rounded-[3px] transition-colors shadow-sm cursor-pointer">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                      Choose File
                   </label>
                   <button className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-bold bg-[#dc3545]/10 text-[#dc3545] hover:bg-[#dc3545] hover:text-white px-4 py-2 rounded-[3px] transition-colors">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      Remove
                   </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-bold text-[#111] mb-1.5 tracking-tight">Name</label>
              <div className="flex rounded-[3px] shadow-sm border border-gray-200 overflow-hidden focus-within:ring-1 focus-within:ring-[#5F52FF] focus-within:border-[#5F52FF] transition-all">
                <div className="bg-gray-100 px-3.5 py-2.5 flex items-center justify-center border-r border-gray-200">
                  <User className="w-4.5 h-4.5 text-gray-500" />
                </div>
                <input 
                  type="text"
                  value={accountForm.name}
                  onChange={(e) => setAccountForm({...accountForm, name: e.target.value})}
                  className="w-full text-[14px] px-4 py-2.5 outline-none text-gray-700 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-bold text-[#111] mb-1.5 tracking-tight">Email Address</label>
              <div className="flex rounded-[3px] shadow-sm border border-gray-200 overflow-hidden focus-within:ring-1 focus-within:ring-[#5F52FF] focus-within:border-[#5F52FF] transition-all">
                <div className="bg-gray-100 px-3.5 py-2.5 flex items-center justify-center border-r border-gray-200">
                  <Mail className="w-4.5 h-4.5 text-gray-500" />
                </div>
                <input 
                  type="email"
                  value={accountForm.email}
                  onChange={(e) => setAccountForm({...accountForm, email: e.target.value})}
                  className="w-full text-[14px] px-4 py-2.5 outline-none text-gray-700 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-bold text-[#111] mb-1.5 tracking-tight">Role</label>
              <div className="flex rounded-[3px] border border-gray-200 bg-[#fafafa] p-3 items-center gap-4">
                <div className="bg-purple-100 rounded-[3px] p-2 flex items-center justify-center text-[#5F52FF]">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-gray-800">Super Admin</h4>
                  <p className="text-[12px] text-gray-500 tracking-tight mt-0.5">Roles are managed by the system administrator.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-5 border-t border-gray-50/50 bg-[#f9fafc] flex justify-end gap-3 rounded-b-[3px] mt-auto">
            <button className="flex items-center justify-center gap-2 px-6 py-2 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 text-gray-700 rounded-[3px] font-bold text-[13px] shadow-sm transition-all cursor-pointer">
              Discard Changes
            </button>
            <button className="flex items-center justify-center gap-2 px-6 py-2 bg-[#fd7e14] hover:bg-[#e86e04] text-white rounded-[3px] font-bold text-[13px] shadow-sm transition-all focus:ring-2 focus:ring-[#fd7e14]/50 cursor-pointer">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg> Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
