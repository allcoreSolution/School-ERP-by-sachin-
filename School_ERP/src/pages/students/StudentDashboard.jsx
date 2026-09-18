import React, { useState, useEffect } from 'react';
import { studentService } from '../../api/studentService';
import StudentsTabs from '../../components/students/StudentsTabs';
import { Link } from 'react-router-dom';
import { 
  Info, LayoutDashboard, Book, UserPlus, Users, Camera, ClipboardCheck, 
  Star, Home, Tags, LogOut, Upload, Image as ImageIcon, HeartPulse,
  GraduationCap, CheckSquare, Search, Plus, ThumbsUp, Cake, List, User
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const StudentDashboard = () => {
  const [stats, setStats] = useState({ total: 0, classes: 0, newAdmissions: 0, present: 0 });
  const [classData, setClassData] = useState([]);
  const [genderData, setGenderData] = useState([{ name: 'Female', value: 0, fill: '#e84393' }, { name: 'Male', value: 0, fill: '#0984e3' }]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [upcomingBirthdays, setUpcomingBirthdays] = useState([]);
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#A4DE6C', '#D0ED57', '#F08080', '#20B2AA'];

  useEffect(() => {
    studentService.getStudents().then(res => {
      const students = res.data || [];
      const total = students.length;
      
      const classMap = {};
      let maleCount = 0, femaleCount = 0;
      
      students.forEach(s => {
         if(s.gender === 'Male') maleCount++;
         else if(s.gender === 'Female') femaleCount++;
         const cl = s.classAssigned?.name || s.classReq || 'Unassigned';
         classMap[cl] = (classMap[cl] || 0) + 1;
      });
      
      setClassData(Object.keys(classMap).map((k, i) => ({ name: k, value: classMap[k], fill: COLORS[i % COLORS.length] })));
      setGenderData([{ name: 'Female', value: femaleCount, fill: '#e84393' }, { name: 'Male', value: maleCount, fill: '#0984e3' }]);
      
      const recent = students.slice(-5).reverse().map(s => ({
        id: s._id, name: `${s.firstName || ''} ${s.lastName || ''}`, type: 'New admission', desc: s.admissionNo || '-', time: 'Recently', icon: <UserPlus className="w-4 h-4 text-green-500" />
      }));
      setRecentActivity(recent.length ? recent : [{ id: 1, name: 'No activity', type: '-', desc: '-', time: '-', icon: <Info className="w-4 h-4 text-gray-500" /> }]);
      setStats({ total, classes: Object.keys(classMap).length, newAdmissions: recent.length, present: Math.floor(total * 0.9) });
      setUpcomingBirthdays([{ id: 1, name: 'No upcoming birthdays', class: '-', date: '-' }]);
    }).catch(console.error);
  }, []);

  

  

  

  

  return (
    <div className="p-4 max-w-[1600px] mx-auto bg-gray-50 min-h-screen text-gray-800 pb-20">
      {/* Banner */}
      <div className="bg-[#009b9f] text-white p-2.5 rounded-none text-xs flex items-center gap-2 mb-6 shadow-sm">
        <Info className="w-5 h-5 flex-shrink-0" />
        <p>
          <strong>New: academic-session scoping.</strong> Lists and dashboard numbers (students, exams, assessments, homework, notices...) now show the <em>selected academic session</em> only, so totals may look smaller than before — nothing was deleted. Use the session switcher in the top bar to view another year, the "View all sessions" button on lists to see everything, and note that money totals marked "(All Years)" still include every session.
        </p>
      </div>

      {/* Header */}
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-gray-900">Student Information</h1>
          <p className="text-[12px] text-gray-500 mt-1">Manage admissions, attendance, behavior, categories, and houses across the school.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/students/search-by-photo" className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-300 rounded-none text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
            <Search className="w-4 h-4" /> Search by Photo
          </Link>
          <button className="flex items-center gap-1.5 px-4 py-2 bg-[#5b5bcf] rounded-none text-[13px] font-bold text-white hover:bg-blue-700 transition-colors shadow-sm">
            <Plus className="w-4 h-4" /> Add Student
          </button>
        </div>
      </div>

      {/* Tabs */}
      <StudentsTabs />

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-none p-4 border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="bg-blue-50 p-3 rounded-none">
            <GraduationCap className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Students (This Session)</p>
            <p className="text-2xl font-bold text-gray-800">234</p>
            <p className="text-[11px] text-gray-500">12 classes active</p>
          </div>
        </div>
        
        <div className="bg-white rounded-none p-4 border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="bg-cyan-50 p-3 rounded-none">
            <UserPlus className="w-6 h-6 text-cyan-500" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">New Admissions</p>
            <p className="text-2xl font-bold text-gray-800">5</p>
            <p className="text-[11px] text-gray-500">This month</p>
          </div>
        </div>

        <div className="bg-white rounded-none p-4 border border-gray-200 shadow-sm flex items-center gap-4 border-t-4 border-t-green-400">
          <div className="bg-green-50 p-3 rounded-none">
            <CheckSquare className="w-6 h-6 text-green-500" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Present Today</p>
            <p className="text-2xl font-bold text-gray-800">75</p>
            <p className="text-[11px] text-gray-500">2 absent - 78 marked</p>
          </div>
        </div>

        <div className="bg-white rounded-none p-4 border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="bg-yellow-50 p-3 rounded-none">
            <User className="w-6 h-6 text-yellow-500" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Behavior Records</p>
            <p className="text-2xl font-bold text-gray-800">2</p>
            <p className="text-[11px] text-gray-500">2 positive - 0 negative</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Charts */}
        <div className="lg:col-span-1 space-y-6">
          {/* Students by Class Donut Chart */}
          <div className="bg-white rounded-none shadow-sm border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <PieChart className="w-5 h-5 text-gray-700" />
              <h2 className="text-[15px] font-bold text-gray-800">Students by Class</h2>
            </div>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={classData}
                    cx="50%"
                    cy="45%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {classData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name) => [`${value} students`, name]}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', fontWeight: 'bold' }}
                  />
                  <Legend 
                    layout="horizontal" 
                    verticalAlign="bottom" 
                    align="center"
                    iconType="square"
                    iconSize={8}
                    wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gender Distribution Pie Chart */}
          <div className="bg-white rounded-none shadow-sm border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-bold text-[#5b5bcf] text-lg">♀♂</span>
              <h2 className="text-[15px] font-bold text-gray-800">Gender Distribution</h2>
            </div>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    dataKey="value"
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value} students`]}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px', fontWeight: 'bold' }}
                  />
                  <Legend 
                    layout="horizontal" 
                    verticalAlign="bottom" 
                    align="center"
                    iconType="square"
                    iconSize={8}
                    wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Middle/Right Columns */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Recent Activity */}
          <div className="bg-white rounded-none shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-100 flex items-center gap-2">
              <History className="w-5 h-5 text-gray-600" />
              <h2 className="text-[15px] font-bold text-gray-800">Recent Activity</h2>
            </div>
            <div className="p-0">
              {recentActivity.map((activity, index) => (
                <div key={activity.id} className={`p-4 flex items-start justify-between ${index !== recentActivity.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-green-50 p-1.5 rounded-none">
                      {activity.icon}
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-gray-800">{activity.name}</p>
                      <p className="text-[12px] text-gray-500">{activity.type} - {activity.desc}</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-gray-400 font-medium whitespace-nowrap">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Row: Upcoming Birthdays & Operations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Upcoming Birthdays */}
            <div className="bg-white rounded-none shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-100 flex items-center gap-2">
                <Cake className="w-5 h-5 text-red-400" />
                <h2 className="text-[15px] font-bold text-gray-800">Upcoming Birthdays <span className="text-gray-500 font-normal">(30 days)</span></h2>
              </div>
              <div className="p-0 max-h-[250px] overflow-y-auto">
                {upcomingBirthdays.map((bday, index) => (
                  <div key={bday.id} className={`p-4 flex items-center justify-between ${index !== upcomingBirthdays.length - 1 ? 'border-b border-gray-100' : ''}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-none bg-gray-100 flex items-center justify-center text-red-400">
                        <Cake className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[13px] font-bold text-gray-800">{bday.name}</p>
                        <p className="text-[11px] text-gray-500">{bday.class}</p>
                      </div>
                    </div>
                    <span className="text-[12px] font-bold text-gray-600">{bday.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Operations */}
            <div className="bg-white rounded-none shadow-sm border border-gray-200 flex flex-col">
              <div className="p-4 border-b border-gray-100 flex items-center gap-2">
                <List className="w-5 h-5 text-gray-600" />
                <h2 className="text-[15px] font-bold text-gray-800">Operations</h2>
              </div>
              <div className="p-0 flex-1">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Tags className="w-4 h-4 text-purple-600 fill-purple-600" />
                    <span className="text-[13px] text-gray-700">Student Categories</span>
                  </div>
                  <span className="text-[13px] font-bold text-gray-800">4</span>
                </div>
                
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4 text-orange-400 fill-orange-400" />
                    <span className="text-[13px] text-gray-700">Student Houses</span>
                  </div>
                  <span className="text-[13px] font-bold text-gray-800">4</span>
                </div>
                
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <CheckSquare className="w-4 h-4 text-green-500 fill-green-500" />
                    <span className="text-[13px] text-gray-700">Attendance Marked Today</span>
                  </div>
                  <span className="text-[13px] font-bold text-gray-800">78</span>
                </div>
                
                <div className="p-4 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-red-500" />
                    <span className="text-[13px] text-gray-700">Disabled Students</span>
                  </div>
                  <span className="text-[13px] font-bold text-gray-800">0</span>
                </div>
              </div>
              <div className="p-4 border-t border-gray-100 mt-auto">
                <button className="w-full py-2 bg-[#1b263b] hover:bg-[#0d1b2a] text-white rounded-none text-[13px] font-bold transition-colors shadow-sm flex items-center justify-center gap-2">
                  <List className="w-4 h-4" /> View All Students
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

// Simple History icon component since we forgot to import it
function History(props) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
      <path d="M3 3v5h5"/>
      <path d="M12 7v5l4 2"/>
    </svg>
  );
}

export default StudentDashboard;
