import React from 'react';
import AcademicsTabs from '../../components/academics/AcademicsTabs';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Book, Layers, GraduationCap, Link2, MonitorPlay, 
  Users, Clock, Calendar, Briefcase, FileText, Settings, ShieldCheck, 
  Plus, Edit2, Eye, LayoutGrid, Monitor, Video, AlertTriangle, ArrowRight
} from 'lucide-react';

const AcademicDashboard = () => {
  const navigate = useNavigate();

  const subNav = [
    { name: 'Dashboard', icon: LayoutDashboard, active: true },
    { name: 'Guide', icon: Book },
    { name: 'Sessions', icon: Layers },
    { name: 'Classes', icon: LayoutGrid },
    { name: 'Sections', icon: LayoutDashboard },
    { name: 'Subjects', icon: Book },
    { name: 'Assign Subjects', icon: Link2 },
    { name: 'Assign Electives', icon: Link2 },
    { name: 'Assign Teacher', icon: Users },
    { name: 'Manage Periods', icon: Clock },
    { name: 'Timetable', icon: Calendar },
    { name: 'Teacher View', icon: Briefcase },
    { name: 'Substitutions', icon: Users },
    { name: 'Promote', icon: ArrowRight },
  ];

  const classes = [
    { name: 'Nursery', sections: 'A, B', teacher: 'Amit Sharma', count: 22 },
    { name: 'KG', sections: 'A', teacher: 'Amit Sharma', count: 0 },
    { name: 'Class I', sections: 'A', teacher: 'Amit Sharma', count: 41 },
    { name: 'Class II', sections: 'A', teacher: null, count: 1 },
    { name: 'Class III', sections: 'A', teacher: null, count: 20 },
    { name: 'Class IV', sections: 'A', teacher: null, count: 19 },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-y-auto">
      
      {/* Header */}
      <div className="px-8 pt-6 pb-2">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a2e]">Academic Management</h1>
            <p className="text-[13px] text-gray-500 mt-1">Configure and manage sessions, classes, sections, subjects, and timetables.</p>
          </div>
          <button 
            onClick={() => navigate('/academics/classes/add')}
            className="bg-[#5F52FF] text-white px-4 py-2 rounded-none text-[13px] font-bold hover:bg-[#4E41E6] shadow-sm flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add New Classes
          </button>
        </div>
        
        {/* Tabs */}
        <AcademicsTabs />
      </div>

      <div className="px-8 py-4">
        {/* Session Badge */}
        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-none text-xs font-bold mb-6 border border-green-100">
          <div className="w-1.5 h-1.5 rounded-none bg-green-500"></div> Current Session: 2026-2027
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white border border-gray-200 rounded-none p-5 flex items-center gap-4 shadow-sm">
            <div className="w-10 h-10 bg-gray-50 rounded-none flex items-center justify-center border border-gray-100">
              <Monitor className="w-5 h-5 text-gray-500" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">TOTAL CLASSES</div>
              <div className="text-2xl font-black text-[#1a1a2e]">21</div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-none p-5 flex items-center gap-4 shadow-sm">
            <div className="w-10 h-10 bg-[#EEEDFF] rounded-none flex items-center justify-center border border-[#E0DEFF]">
              <Book className="w-5 h-5 text-[#5F52FF]" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">ACTIVE SUBJECTS</div>
              <div className="text-2xl font-black text-[#1a1a2e]">72</div>
              <div className="text-[11px] font-semibold text-gray-400 mt-1">Across all sessions</div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-none p-5 flex items-center gap-4 shadow-sm">
            <div className="w-10 h-10 bg-green-50 rounded-none flex items-center justify-center border border-green-100">
              <LayoutGrid className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">TIMETABLE COMPLETION</div>
              <div className="text-2xl font-black text-[#1a1a2e]">13%</div>
              <div className="text-[11px] font-semibold text-green-500 mt-1">14 sections pending</div>
            </div>
          </div>
          <div className="bg-white border-l-4 border-l-amber-500 border-y border-r border-gray-200 rounded-r-lg p-5 flex items-center gap-4 shadow-sm">
            <div className="w-10 h-10 bg-amber-50 rounded-none flex items-center justify-center border border-amber-100">
              <Users className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">STUDENTS TO PROMOTE</div>
              <div className="text-2xl font-black text-[#1a1a2e]">218</div>
              <div className="text-[11px] font-semibold text-amber-500 mt-1">Session ending soon</div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Column (2/3 width) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Class & Section Overview */}
            <div className="bg-white border border-gray-200 rounded-none shadow-sm flex flex-col h-full">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-[13px] font-bold text-[#1a1a2e] flex items-center gap-2">
                  <LayoutGrid className="w-4 h-4" /> Class & Section Overview
                </h2>
                <button className="text-[11px] font-bold text-gray-500 border border-gray-300 px-3 py-1.5 rounded-none bg-gray-50 hover:bg-gray-100 flex items-center gap-1.5">
                  <Monitor className="w-3.5 h-3.5" /> View All
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-[#1a1a2e] text-[10px] font-bold text-white uppercase tracking-wider">
                      <th className="px-5 py-3 rounded-tl">CLASS NAME</th>
                      <th className="px-5 py-3">SECTIONS</th>
                      <th className="px-5 py-3">IN-CHARGE TEACHER</th>
                      <th className="px-5 py-3 text-center">STUDENT COUNT</th>
                      <th className="px-5 py-3 text-center rounded-tr">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px]">
                    {classes.map((cls, i) => (
                      <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-5 py-3 font-bold text-gray-800">{cls.name}</td>
                        <td className="px-5 py-3 text-gray-500">{cls.sections}</td>
                        <td className="px-5 py-3">
                          {cls.teacher ? (
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-none bg-[#5F52FF] text-white flex items-center justify-center text-[10px] font-bold">
                                {cls.teacher.substring(0, 2).toUpperCase()}
                              </div>
                              <span className="text-gray-700 font-semibold">{cls.teacher}</span>
                            </div>
                          ) : (
                            <span className="text-gray-400 italic text-[12px]">Not Assigned</span>
                          )}
                        </td>
                        <td className="px-5 py-3 text-center font-bold text-gray-700">{cls.count}</td>
                        <td className="px-5 py-3 text-center text-gray-400">
                          <button className="hover:text-[#5F52FF] mx-1"><Edit2 className="w-4 h-4" /></button>
                          <button className="hover:text-[#5F52FF] mx-1"><Eye className="w-4 h-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-3 text-[11px] font-semibold text-gray-400 border-t border-gray-100 bg-gray-50">
                Showing all 21 classes
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Teacher Workload */}
              <div className="bg-white border border-gray-200 rounded-none shadow-sm">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-[13px] font-bold text-[#1a1a2e] flex items-center gap-2">
                    <Briefcase className="w-4 h-4" /> Teacher Workload
                  </h2>
                  <Edit2 className="w-3.5 h-3.5 text-gray-400" />
                </div>
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-[#1a1a2e] text-[10px] font-bold text-white uppercase tracking-wider">
                      <th className="px-4 py-2">TEACHER NAME</th>
                      <th className="px-4 py-2 text-center">SUBJECTS</th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px]">
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-3 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-none bg-[#5F52FF] text-white flex items-center justify-center text-[10px] font-bold">AM</div>
                        <span className="font-semibold text-gray-700">Amit Sharma</span>
                      </td>
                      <td className="px-4 py-3 text-center font-bold text-green-500">10</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-none bg-[#9b59b6] text-white flex items-center justify-center text-[10px] font-bold">TE</div>
                        <span className="font-semibold text-gray-700">teacher2</span>
                      </td>
                      <td className="px-4 py-3 text-center font-bold text-green-500">4</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Timetable Alerts */}
              <div className="bg-white border border-red-200 rounded-none shadow-sm overflow-hidden border-t-2 border-t-red-500">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-[13px] font-bold text-[#1a1a2e] flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500" /> Timetable Alerts
                  </h2>
                  <Edit2 className="w-3.5 h-3.5 text-gray-400" />
                </div>
                <div className="p-4">
                  <div className="bg-orange-50 border border-orange-200 text-orange-800 text-[12px] font-semibold px-3 py-2 rounded-none flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-4 h-4" /> 14 section(s) are missing a timetable.
                  </div>
                  <div className="space-y-3 text-[13px]">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">- Nursery - B</span>
                      <button className="text-[10px] font-bold border border-gray-300 rounded-none px-2 py-0.5 hover:bg-gray-50 text-gray-500">Setup</button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">- KG - A</span>
                      <button className="text-[10px] font-bold border border-gray-300 rounded-none px-2 py-0.5 hover:bg-gray-50 text-gray-500">Setup</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>

          {/* Right Column (1/3 width) */}
          <div className="flex flex-col gap-6">
            
            {/* Today's Timetable */}
            <div className="bg-white border border-gray-200 rounded-none shadow-sm">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-[13px] font-bold text-[#1a1a2e] flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Today's Timetable
                </h2>
                <button className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-none uppercase">View Full</button>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex gap-4">
                  <div className="w-12 text-[11px] font-bold text-gray-500 pt-1 text-right">10:00</div>
                  <div className="flex-1 bg-white border-l-2 border-[#5F52FF] p-3 rounded-none shadow-sm border border-gray-100 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-[13px] text-[#1a1a2e]">Mathematics</div>
                      <div className="text-[11px] text-[#5F52FF] font-medium mt-0.5">Amit Sharma</div>
                    </div>
                    <div className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-none font-bold">Nursery A</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 text-[11px] font-bold text-gray-500 pt-1 text-right">11:00</div>
                  <div className="flex-1 bg-white border-l-2 border-[#5F52FF] p-3 rounded-none shadow-sm border border-gray-100 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-[13px] text-[#1a1a2e]">Mathematics</div>
                      <div className="text-[11px] text-[#5F52FF] font-medium mt-0.5">Amit Sharma</div>
                    </div>
                    <div className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-none font-bold">Nursery A</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 text-[11px] font-bold text-gray-500 pt-1 text-right">13:00</div>
                  <div className="flex-1 bg-white border-l-2 border-[#5F52FF] p-3 rounded-none shadow-sm border border-gray-100 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-[13px] text-[#1a1a2e]">Mathematics</div>
                    </div>
                    <div className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-none font-bold">Nursery A</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Promote Batch CTA */}
            <div className="bg-[#e67e22] rounded-none p-6 shadow-sm relative overflow-hidden text-white">
              <div className="relative z-10">
                <div className="flex items-center gap-2 font-bold text-[15px] mb-2">
                  <ArrowRight className="w-5 h-5 bg-white/20 rounded-none p-0.5" /> Promote Batch
                </div>
                <p className="text-sm font-medium mb-4 text-white/90">Start promoting students to the next academic session now.</p>
                <button className="w-full bg-white text-[#e67e22] font-bold py-2 rounded-none text-[13px] flex items-center justify-center gap-2 hover:bg-gray-50 shadow-sm transition-colors">
                  <ArrowRight className="w-4 h-4" /> Initiate Promotion
                </button>
              </div>
            </div>

            {/* Sessions */}
            <div className="bg-white border border-gray-200 rounded-none shadow-sm">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-[13px] font-bold text-[#1a1a2e] flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Sessions
                </h2>
                <Edit2 className="w-3.5 h-3.5 text-gray-400" />
              </div>
              <div className="p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold text-[13px] text-gray-800">2026-2027</div>
                    <div className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5"><Users className="w-3 h-3" /> 282 Students</div>
                  </div>
                  <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-none">CURRENT</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold text-[13px] text-gray-800">2027-2028</div>
                    <div className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5"><Users className="w-3 h-3" /> 102 Students</div>
                  </div>
                  <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-none">PAST</span>
                </div>
              </div>
            </div>

          </div>
        </div>
        
      </div>
    </div>
  );
};

export default AcademicDashboard;
