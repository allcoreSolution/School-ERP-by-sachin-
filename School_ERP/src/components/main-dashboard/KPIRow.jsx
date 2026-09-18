import React from 'react';
import { ArrowUp, Video, Monitor } from 'lucide-react';

const KPICard = ({ title, value, subtext, bgColor, trend, icon }) => {
  return (
    <div className={`${bgColor} rounded-none p-3 text-white relative overflow-hidden flex flex-col justify-between shadow-sm min-h-[80px] border border-black/10`}>
      <div className="flex justify-between items-start mb-1">
        <h3 className="text-[9px] font-bold uppercase tracking-wider opacity-90">{title}</h3>
        {icon && (
          <div className="bg-white/20 p-1 rounded-none">
            {icon}
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-end">
        <div className="text-xl font-extrabold">{value}</div>
        <div className="flex flex-col items-end">
          {trend && (
            <div className="flex items-center text-[10px] font-bold bg-white/20 px-1.5 py-0.5 rounded-none">
              <ArrowUp className="w-2.5 h-2.5 mr-0.5" />
              {trend}
            </div>
          )}
          {subtext && (
            <div className="text-[8px] opacity-80 font-medium mt-1">
              {subtext}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const KPIRow = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-4">
      <KPICard 
        title="STUDENTS (THIS SESSION)" 
        value="278" 
        bgColor="bg-[#152643]" 
        trend="12%"
      />
      <KPICard 
        title="TOTAL STAFF" 
        value="9" 
        bgColor="bg-[#248888]" 
        trend="2%"
      />
      <KPICard 
        title="ATTENDANCE" 
        value="5.8%" 
        bgColor="bg-[#e2945a]" 
        trend="4%"
      />
      <KPICard 
        title="COLLECTED TODAY" 
        value="₹5,600" 
        bgColor="bg-[#cc5666]" 
        icon={<Video className="w-3 h-3" />}
        subtext="LIVE"
      />
      <KPICard 
        title="FEES DUE (ALL YEARS)" 
        value="₹9,370,542" 
        bgColor="bg-[#7a1f28]" 
        trend="1%"
        icon={<span className="text-[8px] font-bold bg-white/20 px-1 py-0.5 rounded-none">CRITICAL</span>}
      />
      <KPICard 
        title="INCOME" 
        value="₹55,500" 
        bgColor="bg-[#4b2361]" 
        trend="8%"
      />
      <KPICard 
        title="LEAVES TODAY" 
        value="0" 
        bgColor="bg-[#a8784d]" 
        trend="2"
      />
      <KPICard 
        title="CAPACITY USED" 
        value="2%" 
        bgColor="bg-[#0b5d69]" 
        trend="-0%"
      />
    </div>
  );
};

export default KPIRow;
