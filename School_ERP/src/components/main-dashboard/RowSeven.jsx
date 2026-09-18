import React from 'react';
import { Link } from 'react-router-dom';
import { PieChart as PieChartIcon, Package, Users, ArrowRight, AlertTriangle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const WidgetHeader = ({ title, icon: Icon, link }) => (
  <div className="flex justify-between items-center mb-4">
    <div className="flex items-center gap-2">
      <div className="bg-[#1e3a5f] p-1.5 rounded-none text-white">
        <Icon className="w-4 h-4" />
      </div>
      <h2 className="text-sm font-bold text-slate-800">{title}</h2>
    </div>
    {link ? (
      <Link to={link} className="text-[11px] font-bold text-[#5F52FF] flex items-center hover:underline">
        View all <ArrowRight className="w-3 h-3 ml-0.5" />
      </Link>
    ) : (
      <button className="text-[11px] font-bold text-[#5F52FF] flex items-center hover:underline">
        View all <ArrowRight className="w-3 h-3 ml-0.5" />
      </button>
    )}
  </div>
);

const data = [
  { name: 'Paid', value: 70 },
  { name: 'Pending', value: 30 },
];
const COLORS = ['#10b981', '#f59e0b'];

const FeeSummaryWidget = () => (
  <div className="bg-white p-4 rounded-none shadow-sm border border-slate-200 h-full flex flex-col">
    <WidgetHeader title="Fee Summary" icon={PieChartIcon}  link="/finance/dashboard" />
    
    <div className="flex-1 flex flex-col items-center justify-center min-h-[200px] relative">
      <div className="flex items-center gap-4 text-xs font-bold mb-2">
        <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-none bg-emerald-500"></div> Paid</span>
        <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-none bg-amber-500"></div> Pending</span>
      </div>
      
      <div className="w-full h-40">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={45}
              outerRadius={65}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ fontWeight: 'bold' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-4 text-[10px] font-bold mt-2">
        <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-none bg-emerald-500"></div> Paid</span>
        <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-none bg-amber-500"></div> Pending</span>
      </div>
    </div>
  </div>
);

const InventoryWidget = () => (
  <div className="bg-white p-4 rounded-none shadow-sm border border-slate-200 h-full flex flex-col">
    <WidgetHeader title="Inventory" icon={Package}  link="/asset-management" />
    
    <div className="grid grid-cols-4 gap-2 mb-4 text-center">
      <div>
        <div className="text-slate-800 font-extrabold text-sm">15</div>
        <div className="text-[9px] font-bold text-slate-500 uppercase">Items</div>
      </div>
      <div>
        <div className="text-red-500 font-extrabold text-sm">5</div>
        <div className="text-[9px] font-bold text-slate-500 uppercase">Low Stock</div>
      </div>
      <div>
        <div className="text-slate-800 font-extrabold text-sm">3</div>
        <div className="text-[9px] font-bold text-slate-500 uppercase">Expired</div>
      </div>
      <div>
        <div className="text-slate-800 font-extrabold text-sm">₹3.57L</div>
        <div className="text-[9px] font-bold text-slate-500 uppercase">Stock Value</div>
      </div>
    </div>

    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-3">Low-Stock Alerts</div>

    <div className="flex-1 space-y-3 mb-4">
      <div className="flex justify-between items-center text-xs border-b border-slate-50 pb-2 border-dotted">
        <div className="text-slate-700 font-medium">Paracetamol Strip</div>
        <div className="text-slate-400 text-[10px]">Qty: 5 / min: 8 <span className="bg-red-50 text-red-600 px-1 py-0.5 rounded-none font-bold ml-1">Low</span></div>
      </div>
      <div className="flex justify-between items-center text-xs border-b border-slate-50 pb-2 border-dotted">
        <div className="text-slate-700 font-medium">Cricket Ball</div>
        <div className="text-slate-400 text-[10px]">Qty: 6 / min: 6 <span className="bg-red-50 text-red-600 px-1 py-0.5 rounded-none font-bold ml-1">Low</span></div>
      </div>
      <div className="flex justify-between items-center text-xs border-b border-slate-50 pb-2 border-dotted">
        <div className="text-slate-700 font-medium">Whiteboard Marker</div>
        <div className="text-slate-400 text-[10px]">Qty: 9 / min: 25 <span className="bg-red-50 text-red-600 px-1 py-0.5 rounded-none font-bold ml-1">Low</span></div>
      </div>
      <div className="flex justify-between items-center text-xs border-b border-slate-50 pb-2 border-dotted">
        <div className="text-slate-700 font-medium">Litmus Paper Pack</div>
        <div className="text-slate-400 text-[10px]">Qty: 14 / min: 15 <span className="bg-red-50 text-red-600 px-1 py-0.5 rounded-none font-bold ml-1">Low</span></div>
      </div>
      <div className="flex justify-between items-center text-xs">
        <div className="text-slate-700 font-medium">House T-Shirt</div>
        <div className="text-slate-400 text-[10px]">Qty: 17 / min: 25 <span className="bg-red-50 text-red-600 px-1 py-0.5 rounded-none font-bold ml-1">Low</span></div>
      </div>
    </div>

    <div className="bg-amber-50 text-amber-700 text-[10px] font-bold px-3 py-2 rounded-none flex items-center gap-1.5 border border-amber-100 mt-auto">
      <AlertTriangle className="w-3 h-3 text-amber-500" />
      5 item(s) at or below minimum stock
    </div>
  </div>
);

const ParentMeetingsWidget = () => (
  <div className="bg-white p-4 rounded-none shadow-sm border border-slate-200 h-full flex flex-col">
    <WidgetHeader title="Parent Meetings" icon={Users}  link="/ptm/dashboard" />
    
    <div className="grid grid-cols-3 gap-2 mb-4 text-center">
      <div>
        <div className="text-slate-800 font-extrabold text-sm">8</div>
        <div className="text-[9px] font-bold text-slate-500 uppercase">Meetings</div>
      </div>
      <div>
        <div className="text-emerald-500 font-extrabold text-sm">1</div>
        <div className="text-[9px] font-bold text-slate-500 uppercase">Upcoming</div>
      </div>
      <div>
        <div className="text-slate-800 font-extrabold text-sm">0</div>
        <div className="text-[9px] font-bold text-slate-500 uppercase">Completed</div>
      </div>
    </div>

    <div className="flex-1 flex flex-col">
      <div className="text-[11px] text-slate-500 mb-1">Attendance <span className="float-right font-bold text-slate-800">1%</span></div>
      <div className="w-full bg-slate-100 h-2 rounded-none mb-6 overflow-hidden">
        <div className="bg-emerald-500 h-full rounded-none" style={{ width: '1%' }}></div>
      </div>

      <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-3">Upcoming Meetings</div>
      
      <div className="flex justify-between items-start">
        <div className="text-xs font-bold text-slate-700">Term 1 PTM</div>
        <div className="text-[10px] text-slate-400">03 Sep · 283 invited</div>
      </div>
    </div>
  </div>
);

const RowSeven = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <FeeSummaryWidget />
      <InventoryWidget />
      <ParentMeetingsWidget />
    </div>
  );
};

export default RowSeven;
