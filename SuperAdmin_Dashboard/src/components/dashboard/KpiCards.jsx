import React from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { Landmark, CheckCircle2, Users, FileText, Banknote, ReceiptText } from 'lucide-react';
import { initSchools } from '../../data/schoolsData';

const totalSchools = initSchools.length;
const activeSchools = initSchools.filter(s => s.status === 'Active').length;
const totalStudents = initSchools.reduce((sum, s) => sum + Number(s.students), 0);
const pendingSchools = initSchools.filter(s => s.status === 'Pending').length;

const sparkData = {
  schools:  [{ v:1 },{ v:2 },{ v:3 },{ v:4 },{ v:5 },{ v:6 },{ v:7 },{ v:totalSchools }],
  active:   [{ v:1 },{ v:2 },{ v:3 },{ v:3 },{ v:4 },{ v:4 },{ v:4 },{ v:activeSchools }],
  students: [{ v:100 },{ v:200 },{ v:300 },{ v:400 },{ v:500 },{ v:600 },{ v:700 },{ v:totalStudents }],
  online:   [{ v:3 },{ v:5 },{ v:2 },{ v:8 },{ v:4 },{ v:6 },{ v:3 },{ v:1 }],
  pending:  [{ v:1 },{ v:1 },{ v:1 },{ v:2 },{ v:2 },{ v:2 },{ v:2 },{ v:pendingSchools }],
};

const cards = [
  {
    title: 'Schools on Platform',
    value: '449',
    icon: Landmark,
    stroke: '#3b82f6',
    iconBg: '#3b82f6',
    iconColor: '#ffffff',
    spark: sparkData.schools,
  },
  {
    title: 'Active Subscriptions',
    value: '193',
    icon: Banknote, // Looks like green cash icon or similar
    stroke: '#22c55e',
    iconBg: '#22c55e',
    iconColor: '#ffffff',
    spark: sparkData.active,
  },
  {
    title: 'Revenue This Month',
    value: '₹0',
    icon: ReceiptText, // Or Banknote
    stroke: '#16a34a',
    iconBg: '#16a34a',
    iconColor: '#ffffff',
    spark: sparkData.students,
  },
  {
    title: 'Online Right Now',
    value: '4',
    isLive: true,
    icon: Users,
    stroke: '#a855f7',
    iconBg: '#a855f7',
    iconColor: '#ffffff',
    spark: sparkData.online,
  },
  {
    title: 'Pending Orders',
    value: '44',
    icon: FileText,
    stroke: '#ef4444',
    iconBg: '#ef4444',
    iconColor: '#ffffff',
    spark: sparkData.pending,
  },
];

const KpiCard = ({ title, value, trend, trendUp, isLive, sub, icon: Icon, gradient, glow, stroke, fill, iconBg, iconColor, spark }) => (
  <div className="bg-white rounded-none] shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-100/60 flex h-[110px] relative overflow-hidden">
    <div className="flex flex-col justify-between p-4 w-[60%] relative z-10 bg-gradient-to-r from-white via-white to-transparent">
      <div
        className="w-[32px] h-[32px] rounded-none] flex items-center justify-center shadow-sm"
        style={{ background: iconBg }}
      >
        <Icon size={16} style={{ color: iconColor }} />
      </div>
      <div>
        <div className="text-[24px] font-extrabold text-[#0f172a] leading-none tracking-tight">{value}</div>
        <div className="text-[11px] font-medium text-slate-400 mt-1 whitespace-nowrap">{title}</div>
      </div>
    </div>
    
    {isLive && (
      <div className="absolute top-4 right-4 z-20">
        <span className="flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-none bg-[#ecfdf5] text-[#10b981] capitalize shadow-sm">
          <span className="w-1.5 h-1.5 rounded-none bg-[#10b981] animate-pulse" />
          Live
        </span>
      </div>
    )}

    <div className="absolute bottom-0 right-0 w-[55%] h-[55%] z-0">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={spark} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`g-${title.replace(/\s/g,'')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={stroke} stopOpacity={0.25} />
              <stop offset="100%" stopColor={stroke} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="v"
            stroke={stroke}
            strokeWidth={2}
            fill={`url(#g-${title.replace(/\s/g,'')})`}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const KpiCards = () => (
  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
    {cards.map(c => <KpiCard key={c.title} {...c} />)}
  </div>
);

export default KpiCards;
