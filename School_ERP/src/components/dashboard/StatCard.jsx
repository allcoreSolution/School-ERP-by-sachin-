import { ResponsiveContainer, AreaChart, Area } from "recharts";
import { GraduationCap, Wallet, ClipboardCheck, AlertCircle } from "lucide-react";

const StatCard = ({ title, value, iconColor, icon, trend, trendColor, data, color, fill }) => {
  // Mock data mapping for sparkline
  const chartData = data.map((val, index) => ({ name: index, value: val }));

  const IconComponent = () => {
    switch (icon) {
      case 'student': return <GraduationCap className="w-5 h-5 text-white" />;
      case 'money': return <Wallet className="w-5 h-5 text-white" />;
      case 'attendance': return <ClipboardCheck className="w-5 h-5 text-white" />;
      case 'pending': return <AlertCircle className="w-5 h-5 text-white" />;
      default: return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col justify-between h-36 relative overflow-hidden group hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start z-10">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-sm ${iconColor}`}>
          <IconComponent />
        </div>
        
        {trend && (
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-sm ${trendColor}`}>
            {trend}
          </span>
        )}
      </div>
      
      <div className="mt-4 z-10">
        <h3 className="text-2xl font-bold text-gray-800 tracking-tight">{value}</h3>
        <p className="text-xs text-gray-500 font-medium">{title}</p>
      </div>

      {/* Background Sparkline Chart */}
      <div className="absolute bottom-0 right-0 left-1/4 h-20 opacity-50 z-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id={`color-${icon}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={fill || color} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={fill || color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={color} 
              strokeWidth={2}
              fillOpacity={1} 
              fill={`url(#color-${icon})`} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatCard;
