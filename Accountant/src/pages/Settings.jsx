import React from 'react';
import { Settings as SettingsIcon, Shield, Bell, User, Layout, Database } from 'lucide-react';

const Settings = () => {
  return (
    <div className="min-h-screen bg-[#ecf0f5] text-[#333] p-4 sm:p-6 font-sans">
      <div className="mb-6">
        <h1 className="text-[24px] font-bold text-[#333] mb-1">System Settings</h1>
        <p className="text-[13px] text-gray-500">Configure global application preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: User, title: 'My Account', desc: 'Update profile and password' },
          { icon: Bell, title: 'Notifications', desc: 'Email and push alerts' },
          { icon: Shield, title: 'Security', desc: '2FA and login history' },
          { icon: Layout, title: 'Appearance', desc: 'Theme and display options' },
          { icon: Database, title: 'Data Management', desc: 'Exports and backups' },
          { icon: SettingsIcon, title: 'Advanced', desc: 'System configuration' }
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-5 rounded-[3px] border-t-[3px] border-t-gray-400 shadow-sm hover:border-t-[#3c8dbc] transition-colors cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 p-3 rounded-full text-gray-600 group-hover:bg-[#3c8dbc] group-hover:text-white transition-colors">
                <item.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-[#333]">{item.title}</h3>
                <p className="text-[12px] text-gray-500 mt-0.5">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Settings;
