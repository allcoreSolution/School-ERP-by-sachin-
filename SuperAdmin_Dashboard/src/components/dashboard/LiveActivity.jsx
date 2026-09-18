import React, { useState, useEffect } from 'react';
import { User, DollarSign, UserPlus, AlertCircle, LogIn, Maximize2 } from 'lucide-react';

import { tenantService } from '../../api/tenantService';

const TYPE_CONFIG = {
  login:    { icon: LogIn,     bg: 'bg-purple-100', color: 'text-purple-600' },
  register: { icon: UserPlus,  bg: 'bg-blue-100',   color: 'text-blue-600' },
  payment:  { icon: DollarSign,bg: 'bg-green-100',  color: 'text-green-600' },
  alert:    { icon: AlertCircle,bg:'bg-red-100',    color: 'text-red-500' },
};

const formatTime = (minsAgo) => {
  if (minsAgo < 1) return 'just now';
  if (minsAgo < 60) return `${minsAgo}m ago`;
  const h = Math.floor(minsAgo / 60);
  const m = minsAgo % 60;
  return m > 0 ? `${h}h ${m}m ago` : `${h}h ago`;
};

const LiveActivity = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchActivity();
  }, []);

  const fetchActivity = async () => {
    try {
      const res = await tenantService.getTenants();
      if(res.data) {
         const acts = res.data.map(t => {
            const msAgo = Date.now() - new Date(t.createdAt).getTime();
            return {
              action: 'New school registered',
              user: t.schoolName,
              type: 'register',
              minsAgo: Math.floor(msAgo / 60000)
            };
         });
         setActivities(acts.sort((a,b) => a.minsAgo - b.minsAgo));
      }
    } catch(err) {
      console.error(err);
    }
  };

  // Every minute, increment all minsAgo by 1 to simulate live time passing
  useEffect(() => {
    const interval = setInterval(() => {
      setActivities(prev => prev.map(a => ({ ...a, minsAgo: a.minsAgo + 1 })));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-none border border-gray-200 shadow-sm flex flex-col h-full">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-gray-800">Live Activity</h2>
            <span className="flex items-center gap-1 text-[10px] font-semibold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-none border border-green-100">
              <span className="w-1.5 h-1.5 rounded-none bg-green-500 animate-pulse" />
              Live
            </span>
          </div>
          <p className="text-[10px] text-gray-500">Registrations, payments & logins</p>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2 h-[440px]">
        <ul className="space-y-1">
          {activities.length === 0 ? (
            <div className="flex items-center justify-center h-full text-[11px] text-gray-400 font-medium pb-10">No recent activity</div>
          ) : activities.map((item, idx) => {
            const cfg = TYPE_CONFIG[item.type];
            const Icon = cfg.icon;
            return (
              <li key={idx} className="flex items-start p-2 hover:bg-gray-50 rounded-none transition-colors">
                <div className={`w-8 h-8 rounded-none ${cfg.bg} flex items-center justify-center mr-3 mt-0.5 flex-shrink-0`}>
                  <Icon className={`w-4 h-4 ${cfg.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-800">{item.action}</p>
                  <p className="text-[10px] text-gray-500 truncate">{item.user}</p>
                </div>
                <div className="text-[10px] text-gray-400 ml-2 flex-shrink-0">
                  {formatTime(item.minsAgo)}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default LiveActivity;
