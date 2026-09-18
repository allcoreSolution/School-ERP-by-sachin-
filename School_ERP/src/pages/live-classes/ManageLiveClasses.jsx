import React, { useState } from 'react';
import { 
  Settings, Plus, AlertTriangle, Clock, History, Search, 
  Grid, List, Filter, BookOpen, User, Calendar, Hourglass, 
  LogOut, Trash2, Edit2, Users
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ScheduleClassModal from './ScheduleClassModal';

// Mock Data
const liveClasses = [
  {
    id: 1,
    title: 'demo',
    subject: 'English',
    className: 'Nursery - A',
    teacher: 'Amit Sharma',
    date: '25 Aug 2026, 08:00 AM',
    duration: '40 min · 2 days from now',
    status: 'LIVE NOW',
    provider: 'Jitsi'
  },
  {
    id: 2,
    title: 'demo',
    subject: 'English',
    className: 'Nursery - A',
    teacher: 'Amit Sharma',
    date: '27 Aug 2026, 08:00 AM',
    duration: '40 min · 4 days from now',
    status: 'LIVE NOW',
    provider: 'Jitsi'
  }
];

const pastClasses = [
  { id: 1, title: 'demo', provider: 'Jitsi', className: 'Nursery - A', subject: 'English', date: '29 Aug 2026, 08:00 AM', attendance: '0/18' },
  { id: 2, title: 'demo', provider: 'Jitsi', className: 'Nursery - A', subject: 'English', date: '28 Aug 2026, 08:00 AM', attendance: '0/18' },
  { id: 3, title: 'demo', provider: 'Jitsi', className: 'Nursery - A', subject: 'English', date: '26 Aug 2026, 08:00 AM', attendance: '0/18' },
  { id: 4, title: 'demo', provider: 'Jitsi', className: 'Nursery - A', subject: 'English', date: '24 Aug 2026, 08:00 AM', attendance: '0/18' },
  { id: 5, title: 'demo', provider: 'Jitsi', className: 'Nursery - A', subject: 'English', date: '23 Aug 2026, 08:00 AM', attendance: '0/18' },
  { id: 6, title: 'demo', provider: 'Jitsi', className: 'Nursery - A', subject: 'English', date: '17 Aug 2026, 08:00 AM', attendance: '0/18' },
  { id: 7, title: 'demo', provider: 'Jitsi', className: 'Nursery - A', subject: 'English', date: '16 Aug 2026, 08:00 AM', attendance: '0/18' },
];

export default function ManageLiveClasses() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); 
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans relative">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Live Classes</h1>
          <p className="text-gray-500 text-sm mt-1">Schedule, host & track your virtual classrooms</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => navigate('/live-classes/settings')}
            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-none text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Settings className="w-4 h-4 mr-2 text-gray-500" />
            Provider Settings
          </button>
          <button 
            onClick={() => setIsScheduleOpen(true)}
            className="flex items-center px-4 py-2 bg-[#5542f6] text-white rounded-none font-medium text-sm hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Schedule Class
          </button>
        </div>
      </div>

      {/* Warning Alert */}
      <div className="bg-[#fff9e6] border border-[#f5e6b3] rounded-none p-4 mb-6 flex items-start">
        <AlertTriangle className="w-5 h-5 text-[#b0703c] mt-0.5 mr-3 flex-shrink-0" />
        <p className="text-[#8c5717] text-sm">
          <strong className="text-[#a64010]">Jitsi is using the shared public server.</strong> <span className="text-[#e25c5c]">meet.jit.si</span> now requires the host to sign in and limits meetings. For reliable rooms, configure a self-hosted server or 8x8 JaaS in <a href="#" className="underline font-medium hover:text-[#a64010]">Provider Settings</a>, or use the <strong>External Link / Zoom</strong> providers.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-5 rounded-none border border-gray-200 flex items-center shadow-sm">
          <div className="w-10 h-10 rounded-none bg-red-50 flex items-center justify-center mr-4 shrink-0">
            <div className="w-3 h-3 bg-red-500 rounded-none"></div>
          </div>
          <div>
            <div className="text-xl font-bold text-gray-800 leading-none mb-1">2</div>
            <div className="text-gray-500 text-sm">Live now</div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-none border border-gray-200 flex items-center shadow-sm">
          <div className="w-10 h-10 rounded-none bg-indigo-50 flex items-center justify-center mr-4 shrink-0">
            <Clock className="w-5 h-5 text-indigo-500" />
          </div>
          <div>
            <div className="text-xl font-bold text-gray-800 leading-none mb-1">0</div>
            <div className="text-gray-500 text-sm">Upcoming</div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-none border border-gray-200 flex items-center shadow-sm">
          <div className="w-10 h-10 rounded-none bg-gray-50 flex items-center justify-center mr-4 shrink-0">
            <History className="w-5 h-5 text-gray-400" />
          </div>
          <div>
            <div className="text-xl font-bold text-gray-800 leading-none mb-1">15</div>
            <div className="text-gray-500 text-sm">Past classes</div>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-2.5 rounded-none border border-gray-200 mb-6 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by title, teacher or subject..."
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-none focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm text-gray-600 bg-gray-50/50"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex space-x-1 p-1">
             <button className="px-4 py-1.5 bg-[#5542f6] text-white rounded-none text-sm font-medium flex items-center">
               All <span className="ml-2 bg-[#6b5bf7] px-2 py-0.5 rounded-none text-xs">2</span>
             </button>
             <button className="px-4 py-1.5 text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 rounded-none text-sm font-medium flex items-center">
               <div className="w-2 h-2 bg-red-500 rounded-none mr-2"></div>
               Live <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-none text-xs border border-gray-200">2</span>
             </button>
             <button className="px-4 py-1.5 text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 rounded-none text-sm font-medium flex items-center">
               <Clock className="w-3.5 h-3.5 mr-2 text-gray-400" />
               Scheduled <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-none text-xs border border-gray-200">0</span>
             </button>
          </div>
          
          <div className="h-8 w-px bg-gray-200 mx-1"></div>

          <div className="flex bg-gray-50 rounded-none p-1 border border-gray-200">
             <button className="p-1.5 bg-white text-[#5542f6] rounded-none shadow-sm">
               <Grid className="w-4 h-4" />
             </button>
             <button className="p-1.5 text-gray-400 hover:text-gray-600">
               <List className="w-4 h-4" />
             </button>
          </div>

          <button className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-none text-gray-700 text-sm font-medium ml-2 shadow-sm hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2 text-gray-500" />
            All sessions
          </button>
        </div>
      </div>

      {/* Active Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {liveClasses.map((cls) => (
          <div key={cls.id} className="bg-white rounded-none border border-gray-200 shadow-sm relative overflow-hidden flex flex-col hover:shadow-md transition-shadow">
            {/* Red Left Border */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-500"></div>
            
            <div className="p-5 flex-grow pl-6">
              <div className="flex justify-between items-start mb-5">
                <div className="flex items-center space-x-2">
                  <span className="flex items-center text-[10px] font-bold text-red-500 uppercase tracking-wider">
                     <div className="w-2 h-2 bg-red-500 rounded-none mr-1.5"></div>
                     {cls.status}
                  </span>
                  <span className="text-[10px] bg-indigo-50 text-[#5542f6] px-2 py-1 rounded-none font-semibold uppercase tracking-wide">
                    {cls.provider}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button className="text-gray-400 hover:text-[#5542f6] transition-colors"><Edit2 className="w-4 h-4" /></button>
                  <button className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-800 mb-4">{cls.title}</h3>
              
              <div className="space-y-3 text-sm text-gray-500">
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-3 text-gray-400 shrink-0" />
                  <span>{cls.subject} &nbsp;·&nbsp; <span className="font-semibold text-gray-600">{cls.className}</span></span>
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-3 text-gray-400 shrink-0" />
                  <span>{cls.teacher}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-3 text-gray-400 shrink-0" />
                  <span>{cls.date}</span>
                </div>
                <div className="flex items-center">
                  <Hourglass className="w-4 h-4 mr-3 text-gray-400 shrink-0" />
                  <span>{cls.duration}</span>
                </div>
              </div>
            </div>
            
            <div className="p-5 pt-0 pl-6 flex gap-3">
              <button className="flex-1 bg-[#ef4444] hover:bg-red-600 text-white py-2.5 rounded-none flex justify-center items-center font-medium transition-colors shadow-sm">
                 <LogOut className="w-4 h-4 mr-2 transform rotate-180" /> 
                 Resume
              </button>
              <button className="px-4 py-2 border border-gray-200 text-gray-400 rounded-none hover:bg-gray-50 hover:text-red-500 transition-colors shadow-sm">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Past Classes Section */}
      <div className="mt-8">
        <h2 className="text-lg font-bold text-gray-800 flex items-center mb-5">
          <History className="w-5 h-5 mr-2 text-gray-500" /> Past Classes
        </h2>
        
        <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-400 text-xs font-semibold uppercase tracking-wider border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Class</th>
                <th className="px-6 py-4">Subject</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Attendance</th>
                <th className="px-6 py-4">Recording</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pastClasses.map((cls, idx) => (
                <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-6 py-4 flex items-center">
                    <span className="font-semibold text-gray-700 mr-3">{cls.title}</span>
                    <span className="text-[10px] bg-indigo-50 text-[#5542f6] px-1.5 py-0.5 rounded-none font-semibold uppercase tracking-wider">{cls.provider}</span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-600">{cls.className}</td>
                  <td className="px-6 py-4 text-gray-500">{cls.subject}</td>
                  <td className="px-6 py-4 text-gray-500">{cls.date}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 bg-emerald-50/50 text-emerald-600 text-xs font-semibold rounded-none border border-emerald-100/50">
                      <Users className="w-3.5 h-3.5 mr-1.5 text-emerald-500" />
                      {cls.attendance}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">—</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-[#5542f6] transition-colors p-1.5 rounded-none hover:bg-indigo-50">
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <ScheduleClassModal isOpen={isScheduleOpen} onClose={() => setIsScheduleOpen(false)} />
    </div>
  );
}
