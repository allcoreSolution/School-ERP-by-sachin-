import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Mail, Phone, MapPin, Briefcase, Calendar, Shield, Bell, 
  Lock, Camera, Edit3, Save, Key, CheckCircle, LogOut, Clock
} from 'lucide-react';
import Swal from 'sweetalert2';

export default function MyProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Personal Info');
  const [isEditing, setIsEditing] = useState(false);

  // Profile Form State
  const [profileData, setProfileData] = useState({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@schoolerp.com',
    phone: '+91 9876543210',
    department: 'Management / IT',
    localAddress: 'Block C, Tech Park, Vasant Kunj',
    city: 'New Delhi',
    postalCode: '110070'
  });

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = () => {
    // Mimic API save
    Swal.fire({
      title: 'Success!',
      text: 'Profile updated successfully.',
      icon: 'success',
      confirmButtonColor: '#3085d6',
      timer: 2000
    });
    setIsEditing(false);
  };

  // Password State
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleUpdatePassword = () => {
    if (!passwords.currentPassword || !passwords.newPassword || !passwords.confirmPassword) {
      Swal.fire('Error', 'Please fill all password fields', 'error');
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      Swal.fire('Error', 'New passwords do not match!', 'error');
      return;
    }
    // Success Fake API Call
    Swal.fire('Success', 'Password updated successfully.', 'success');
    setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  // 2FA action
  const handleSetup2FA = () => {
    Swal.fire({
      title: 'Setup 2FA',
      text: 'An OTP has been sent to your email to configure 2FA.',
      icon: 'info',
      confirmButtonText: 'OK',
      confirmButtonColor: '#3085d6',
    });
  };

  // Notifications State
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'System Alerts', desc: 'Critical system updates and maintenance.', enabled: true },
    { id: 2, title: 'Security Alerts', desc: 'Unrecognized logins or suspicious activities.', enabled: true },
    { id: 3, title: 'Daily Summaries', desc: 'A daily email summary of school activities.', enabled: false },
    { id: 4, title: 'Support Tickets', desc: 'When a new high-priority support ticket is opened.', enabled: true },
    { id: 5, title: 'New Admissions', desc: 'When a new student admission is finalized.', enabled: false },
  ]);

  const toggleNotification = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, enabled: !n.enabled } : n
    ));
    // Optional fake toast
    const settingName = notifications.find(n => n.id === id).title;
    const currentState = notifications.find(n => n.id === id).enabled;
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      icon: 'success',
      title: `${settingName} ${!currentState ? 'Enabled' : 'Disabled'}`
    });
  };

  const tabs = [
    { id: 'Personal Info', icon: User, desc: 'Your basic profile information' },
    { id: 'Security', icon: Shield, desc: 'Passwords and authentication' },
    { id: 'Notifications', icon: Bell, desc: 'Manage alerts and emails' },
    { id: 'Activity Log', icon: Clock, desc: 'Recent account activity' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans pt-2">
      
      {/* Classic Page Header */}
      <div className="bg-white border-b border-slate-200 mt-2">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-5">
              <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-none overflow-hidden bg-slate-100 border border-slate-300 flex items-center justify-center">
                  <img 
                    src={`https://ui-avatars.com/api/?name=${profileData.firstName}+${profileData.lastName}&background=0f172a&color=fff&size=128`} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-white border border-slate-300 shadow-sm rounded-none flex items-center justify-center text-slate-500 hover:text-slate-800 cursor-pointer transition-colors" onClick={() => Swal.fire('Profile Picture', 'Feature coming soon!', 'info')}>
                  <Camera className="w-3 h-3" />
                </button>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">{profileData.firstName} {profileData.lastName}</h1>
                <div className="text-sm text-slate-500 flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> System Administrator</span>
                  <span className="text-slate-300 hidden sm:inline">|</span>
                  <span className="items-center gap-1.5 hidden sm:flex"><MapPin className="w-3.5 h-3.5" /> {profileData.city}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {!isEditing ? (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-none shadow-sm flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Edit3 className="w-4 h-4" /> Edit Profile
                </button>
              ) : (
                <>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-white border border-transparent hover:bg-slate-100 text-slate-600 text-sm font-medium rounded-none cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSaveProfile}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-sm font-medium rounded-none shadow-sm flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <Save className="w-4 h-4" /> Save Changes
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-6 md:py-8">
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Classic Sidebar Tabs */}
          <div className="lg:w-64 shrink-0">
            <nav className="flex flex-col gap-1">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-none flex items-start gap-3 transition-colors cursor-pointer border-none bg-transparent ${
                      isActive 
                        ? 'bg-slate-100/80 text-slate-900 shadow-[inset_2px_0_0_0_#334155]' 
                        : 'text-slate-600 hover:bg-slate-50 font-medium'
                    }`}
                  >
                    <Icon className={`w-4 h-4 mt-0.5 ${isActive ? 'text-slate-800' : 'text-slate-400'}`} />
                    <div>
                      <div className={`text-[13px] ${isActive ? 'font-semibold' : 'font-medium'}`}>{tab.id}</div>
                      <div className={`text-[11px] font-normal mt-0.5 ${isActive ? 'text-slate-500' : 'text-slate-400'}`}>{tab.desc}</div>
                    </div>
                  </button>
                );
              })}

              <div className="h-px bg-slate-200 my-4"></div>
              
              <button 
                onClick={() => {
                  Swal.fire({
                    title: 'Are you sure?',
                    text: 'You will be logged out of your session.',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, log out!'
                  }).then((result) => {
                    if (result.isConfirmed) {
                      localStorage.removeItem('token');
                      localStorage.removeItem('user');
                      window.location.href = '/login';
                    }
                  });
                }} 
                className="w-full text-left px-3 py-2.5 rounded-none flex items-start gap-3 transition-colors cursor-pointer border-none bg-transparent text-red-600 hover:bg-red-50 font-medium"
              >
                <LogOut className="w-4 h-4 mt-0.5 text-red-500" />
                <div>
                  <div className="text-[13px] font-semibold">Sign Out</div>
                  <div className="text-[11px] font-normal text-red-400 mt-0.5">Securely log out</div>
                </div>
              </button>
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 max-w-[800px]">
            
            {activeTab === 'Personal Info' && (
              <div className="space-y-6">
                <div className="bg-white border border-slate-200 rounded-none shadow-sm">
                  <div className="px-5 py-3 border-b border-slate-200 bg-slate-50/50">
                    <h3 className="font-semibold text-slate-800 text-[13px]">Basic Information</h3>
                  </div>
                  <div className="p-5 md:p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">First Name</label>
                        <input 
                          type="text" 
                          name="firstName"
                          value={profileData.firstName}
                          onChange={handleProfileChange}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 rounded-none text-[13px] border ${isEditing ? 'border-slate-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 bg-white' : 'border-slate-200 bg-slate-50 text-slate-600'} outline-none transition-colors disabled:opacity-75`} 
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">Last Name</label>
                        <input 
                          type="text" 
                          name="lastName"
                          value={profileData.lastName}
                          onChange={handleProfileChange}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 rounded-none text-[13px] border ${isEditing ? 'border-slate-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 bg-white' : 'border-slate-200 bg-slate-50 text-slate-600'} outline-none transition-colors disabled:opacity-75`} 
                        />
                      </div>
                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">Email Address</label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input 
                            type="email" 
                            name="email"
                            value={profileData.email}
                            onChange={handleProfileChange}
                            disabled={!isEditing}
                            className={`w-full pl-9 pr-3 py-2 rounded-none text-[13px] border ${isEditing ? 'border-slate-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 bg-white' : 'border-slate-200 bg-slate-50 text-slate-600'} outline-none transition-colors disabled:opacity-75`} 
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">Phone Number</label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input 
                            type="text" 
                            name="phone"
                            value={profileData.phone}
                            onChange={handleProfileChange}
                            disabled={!isEditing}
                            className={`w-full pl-9 pr-3 py-2 rounded-none text-[13px] border ${isEditing ? 'border-slate-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 bg-white' : 'border-slate-200 bg-slate-50 text-slate-600'} outline-none transition-colors disabled:opacity-75`} 
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">Department</label>
                        <input 
                          type="text" 
                          name="department"
                          value={profileData.department}
                          onChange={handleProfileChange}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 rounded-none text-[13px] border ${isEditing ? 'border-slate-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 bg-white' : 'border-slate-200 bg-slate-50 text-slate-600'} outline-none transition-colors disabled:opacity-75`} 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-none shadow-sm">
                  <div className="px-5 py-3 border-b border-slate-200 bg-slate-50/50">
                    <h3 className="font-semibold text-slate-800 text-[13px]">Address Information</h3>
                  </div>
                  <div className="p-5 md:p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">Local Address</label>
                        <textarea 
                          rows={2}
                          name="localAddress"
                          value={profileData.localAddress}
                          onChange={handleProfileChange}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 rounded-none text-[13px] border ${isEditing ? 'border-slate-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 bg-white' : 'border-slate-200 bg-slate-50 text-slate-600'} outline-none transition-colors resize-none disabled:opacity-75`} 
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">City</label>
                        <input 
                          type="text" 
                          name="city"
                          value={profileData.city}
                          onChange={handleProfileChange}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 rounded-none text-[13px] border ${isEditing ? 'border-slate-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 bg-white' : 'border-slate-200 bg-slate-50 text-slate-600'} outline-none transition-colors disabled:opacity-75`} 
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">Postal Code</label>
                        <input 
                          type="text" 
                          name="postalCode"
                          value={profileData.postalCode}
                          onChange={handleProfileChange}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 rounded-none text-[13px] border ${isEditing ? 'border-slate-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 bg-white' : 'border-slate-200 bg-slate-50 text-slate-600'} outline-none transition-colors disabled:opacity-75`} 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Security' && (
              <div className="space-y-6">
                <div className="bg-white border border-slate-200 rounded-none shadow-sm">
                  <div className="px-5 py-3 border-b border-slate-200 bg-slate-50/50">
                    <h3 className="font-semibold text-slate-800 text-[13px]">Change Password</h3>
                  </div>
                  <div className="p-5 md:p-6">
                    <div className="max-w-sm space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">Current Password</label>
                        <input type="password" name="currentPassword" value={passwords.currentPassword} onChange={handlePasswordChange} placeholder="••••••••" className="w-full px-3 py-2 rounded-none text-[13px] border border-slate-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 bg-white outline-none" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">New Password</label>
                        <input type="password" name="newPassword" value={passwords.newPassword} onChange={handlePasswordChange} placeholder="••••••••" className="w-full px-3 py-2 rounded-none text-[13px] border border-slate-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 bg-white outline-none" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">Confirm New Password</label>
                        <input type="password" name="confirmPassword" value={passwords.confirmPassword} onChange={handlePasswordChange} placeholder="••••••••" className="w-full px-3 py-2 rounded-none text-[13px] border border-slate-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 bg-white outline-none" />
                      </div>
                      <div className="pt-2">
                        <button onClick={handleUpdatePassword} className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-[13px] font-medium rounded-none shadow-sm cursor-pointer transition-colors border-none">
                          Update Password
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-none shadow-sm">
                  <div className="px-5 py-3 border-b border-slate-200 bg-slate-50/50">
                    <h3 className="font-semibold text-slate-800 text-[13px]">Two-Factor Authentication (2FA)</h3>
                  </div>
                  <div className="p-5 md:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-200 p-4 rounded-none bg-slate-50/50">
                      <div>
                        <div className="font-semibold text-slate-800 text-[13px] mb-1">Protect your administrator account</div>
                        <p className="text-[13px] text-slate-500">Require an extra security code during login.</p>
                      </div>
                      <div className="shrink-0">
                        <button onClick={handleSetup2FA} className="px-4 py-2 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 text-[13px] font-medium rounded-none cursor-pointer transition-colors border border-slate-300 shadow-sm">
                          Set Up 2FA
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Notifications' && (
              <div className="space-y-6">
                <div className="bg-white border border-slate-200 rounded-none shadow-sm overflow-hidden">
                  <div className="px-5 py-3 border-b border-slate-200 bg-slate-50/50">
                    <h3 className="font-semibold text-slate-800 text-[13px]">Notification Preferences</h3>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {notifications.map((item) => (
                      <div key={item.id} className="p-5 flex items-start justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                        <div>
                          <div className="font-medium text-slate-800 text-[13px]">{item.title}</div>
                          <div className="text-[12px] text-slate-500 mt-0.5">{item.desc}</div>
                        </div>
                        <div 
                          onClick={() => toggleNotification(item.id)}
                          className={`relative inline-flex h-[18px] w-8 mt-0.5 items-center rounded-none shrink-0 cursor-pointer transition-colors duration-200 ease-in-out ${item.enabled ? 'bg-slate-800' : 'bg-slate-200'}`}
                        >
                          <span className={`inline-block h-3.5 w-3.5 transform rounded-none bg-white shadow transition-transform duration-200 ease-in-out ${item.enabled ? 'translate-x-[15px]' : 'translate-x-0.5'}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Activity Log' && (
              <div className="space-y-6">
                <div className="bg-white border border-slate-200 rounded-none shadow-sm overflow-hidden">
                  <div className="px-5 py-3 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
                    <h3 className="font-semibold text-slate-800 text-[13px]">Recent Activity</h3>
                    <span className="text-[11px] font-medium text-slate-500 border border-slate-200 px-2 py-0.5 rounded-none bg-white">Last 7 Days</span>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {[
                      { text: 'Successfully signed in to the system', time: 'Today, 10:24 AM', meta: 'Delhi, India (192.168.1.1)' },
                      { text: 'Updated Global Exam Configuration settings', time: 'Yesterday, 04:15 PM' },
                      { text: 'Changed Administrator Role Permissions', time: 'Aug 24, 2026, 11:30 AM' },
                      { text: 'Successfully signed in to the system', time: 'Aug 23, 2026, 09:05 AM', meta: 'Mumbai, India (103.45.2.19)' },
                    ].map((log, i) => (
                      <div key={i} className="px-5 py-4 hover:bg-slate-50/50 transition-colors flex gap-3">
                        <div className="mt-1.5">
                          <div className="w-1.5 h-1.5 rounded-none bg-slate-400"></div>
                        </div>
                        <div>
                          <p className="text-[13px] font-medium text-slate-800">{log.text}</p>
                          <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-1">
                            <span>{log.time}</span>
                            {log.meta && (
                              <>
                                <span className="w-0.5 h-0.5 rounded-none bg-slate-300"></span>
                                <span>{log.meta}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}
