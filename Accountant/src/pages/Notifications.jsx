import React from 'react';
import { Bell, CheckCircle, Info, AlertTriangle, CreditCard } from 'lucide-react';

const Notifications = () => {
  return (
    <div className="min-h-screen bg-[#ecf0f5] text-[#333] p-4 sm:p-6 font-sans">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-[24px] font-bold text-[#333] mb-1">Notifications</h1>
          <p className="text-[13px] text-gray-500">View all recent system alerts and updates.</p>
        </div>
        <button className="text-[13px] text-[#3c8dbc] hover:underline font-medium">Mark all as read</button>
      </div>

      <div className="bg-white rounded-[3px] border border-gray-200 shadow-sm max-w-4xl">
        {[
          { icon: CreditCard, color: 'text-green-500', bg: 'bg-green-50', msg: 'A payment of ₹5,360 was successfully processed for Fees.', time: '2 minutes ago', read: false },
          { icon: AlertTriangle, color: 'text-yellow-500', bg: 'bg-yellow-50', msg: 'System backup is overdue. Please schedule a backup.', time: '1 hour ago', read: false },
          { icon: CheckCircle, color: 'text-[#3c8dbc]', bg: 'bg-blue-50', msg: 'Lead Rahul Sharma marked as "Converted".', time: '3 hours ago', read: true },
          { icon: Info, color: 'text-gray-500', bg: 'bg-gray-100', msg: 'New software update v2.1.0 is available.', time: 'Yesterday', read: true },
        ].map((n, i) => (
          <div key={i} className={`p-4 border-b border-gray-100 flex gap-4 ${n.read ? 'opacity-70' : 'bg-[#fcfdfd]'}`}>
            <div className={`${n.bg} p-2 rounded-full h-fit flex-shrink-0 mt-1`}>
              <n.icon className={`w-5 h-5 ${n.color}`} />
            </div>
            <div className="flex-grow">
              <h4 className={`text-[14px] ${n.read ? 'font-normal' : 'font-semibold text-[#333]'}`}>{n.msg}</h4>
              <p className="text-[12px] text-gray-500 mt-1">{n.time}</p>
            </div>
          </div>
        ))}
        <div className="p-3 text-center bg-gray-50 text-[13px] text-[#3c8dbc] hover:underline cursor-pointer rounded-b-[3px]">
          View Older Notifications
        </div>
      </div>
    </div>
  );
};
export default Notifications;
