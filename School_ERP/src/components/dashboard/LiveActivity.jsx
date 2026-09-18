import { Maximize2, Check, UserPlus } from "lucide-react";

const LiveActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'payment',
      title: "Atharv Kumar paid ₹25,300 fee",
      time: "21h ago",
      status: "Paid",
      date: "Today",
      timeString: "12:00 AM",
      icon: Check,
      bg: "bg-green-500",
      statusColor: "text-green-600 bg-green-50"
    },
    {
      id: 2,
      type: 'payment',
      title: "Rudra Chauhan paid ₹5,000 fee",
      time: "21h ago",
      status: "Paid",
      date: "Today",
      timeString: "12:00 AM",
      icon: Check,
      bg: "bg-green-500",
      statusColor: "text-green-600 bg-green-50"
    },
    {
      id: 3,
      type: 'payment',
      title: "Sneha Bhatia paid ₹5,000 fee",
      time: "21h ago",
      status: "Paid",
      date: "Today",
      timeString: "12:00 AM",
      icon: Check,
      bg: "bg-green-500",
      statusColor: "text-green-600 bg-green-50"
    },
    {
      id: 4,
      type: 'payment',
      title: "Dhruv Agarwal paid ₹1,000 fee",
      time: "21h ago",
      status: "Paid",
      date: "Today",
      timeString: "12:00 AM",
      icon: Check,
      bg: "bg-green-500",
      statusColor: "text-green-600 bg-green-50"
    },
    {
      id: 5,
      type: 'admission',
      title: "stgunwrnki — admission Pending",
      time: "1w ago",
      status: "Admission",
      date: "11 Aug",
      timeString: "12:50 AM",
      icon: UserPlus,
      bg: "bg-teal-500",
      statusColor: "text-teal-600 bg-teal-50"
    },
    {
      id: 6,
      type: 'admission',
      title: "sxwwonoooj — admission Pending",
      time: "1w ago",
      status: "Admission",
      date: "11 Aug",
      timeString: "12:49 AM",
      icon: UserPlus,
      bg: "bg-teal-500",
      statusColor: "text-teal-600 bg-teal-50"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="font-semibold text-gray-800">Live Activity</h2>
          <p className="text-xs text-gray-500">Real-time updates</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-2 py-1 text-xs font-medium text-indigo-700 bg-indigo-50 rounded">All</button>
          <button className="px-2 py-1 text-xs font-medium text-gray-500 hover:bg-gray-50 rounded">Fees</button>
          <button className="p-1 text-gray-400 hover:text-gray-600 ml-1 border rounded"><Maximize2 className="w-3.5 h-3.5" /></button>
        </div>
      </div>

      {/* Activity List */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {activities.map((activity, index) => (
          <div key={activity.id} className="relative pl-12 pb-4">
            {/* Timeline line */}
            {index !== activities.length - 1 && (
              <div className="absolute left-[19px] top-8 bottom-[-16px] w-0.5 bg-gray-100"></div>
            )}
            
            {/* Icon */}
            <div className={`absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center text-white ${activity.bg} shadow-sm z-10 border-2 border-white`}>
              <activity.icon className="w-5 h-5" />
            </div>
            
            {/* Content */}
            <div className="flex justify-between items-start border-b border-gray-50 pb-4">
              <div>
                <p className="text-sm font-medium text-gray-800">{activity.title}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-xs text-gray-400">{activity.time}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-sm ${activity.statusColor}`}>
                    {activity.status}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-800 font-medium">{activity.date}</p>
                <p className="text-xs text-gray-400 mt-0.5">{activity.timeString}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveActivity;
