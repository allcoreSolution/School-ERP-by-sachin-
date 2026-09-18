import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Book, BookOpen, Video, FileText, ClipboardList, 
  BarChart2, Edit, Trash2, Calendar, LayoutDashboard,
  FolderOpen, List, GraduationCap, ChevronDown, Upload,
  AlertTriangle, Search
} from 'lucide-react';

export default function StudyCenterDashboard({ initialTab = 'Dashboard' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [showClassworkForm, setShowClassworkForm] = useState(false);
  const [showHomeworkForm, setShowHomeworkForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    setShowClassworkForm(false);
    setShowHomeworkForm(false);
  }, [activeTab]);

  const tabs = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Guide', icon: Book },
    { name: 'Manage Syllabus', icon: FolderOpen },
    { name: 'Classwork & Logbook', icon: FileText },
    { name: 'Manage Resources', icon: FolderOpen },
    { name: 'Homework & Assignments', icon: List },
    { name: 'Live Classes', icon: Video },
  ];

  return (
    <div className="bg-[#f4f7fc] min-h-screen font-sans">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-[22px] font-bold text-gray-800">Study Center</h1>
            <p className="text-gray-500 text-sm">Manage syllabus, learning resources, classwork, homework, and live sessions.</p>
          </div>
          <div className="flex space-x-3">
            {activeTab === 'Dashboard' && (
              <>
                <button className="flex items-center px-4 py-2 bg-white border border-blue-400 text-blue-500 rounded-none font-medium text-sm hover:bg-blue-50 transition-colors">
                  <FolderOpen className="w-4 h-4 mr-2" />
                  Manage Syllabus
                </button>
                <button className="flex items-center px-4 py-2 bg-[#0088cc] text-white rounded-none font-medium text-sm hover:bg-blue-600 transition-colors">
                  <Video className="w-4 h-4 mr-2" />
                  New Live Class
                </button>
              </>
            )}
            {activeTab === 'Manage Syllabus' && (
              <button className="flex items-center px-4 py-2 bg-[#0088cc] text-white rounded-none font-medium text-sm hover:bg-blue-600 transition-colors">
                + Add Syllabus Unit
              </button>
            )}
            {activeTab === 'Classwork & Logbook' && (
              <button 
                onClick={() => setShowClassworkForm(!showClassworkForm)}
                className="flex items-center px-4 py-2 bg-[#0088cc] text-white rounded-none font-medium text-sm hover:bg-blue-600 transition-colors">
                {showClassworkForm ? 'Back to List' : '+ Create New Entry'}
              </button>
            )}
            {activeTab === 'Manage Resources' && (
              <button className="flex items-center px-4 py-2 bg-[#0088cc] text-white rounded-none font-medium text-sm hover:bg-blue-600 transition-colors">
                <Upload className="w-4 h-4 mr-2" /> Upload Material
              </button>
            )}
            {activeTab === 'Homework & Assignments' && (
              <button 
                onClick={() => setShowHomeworkForm(!showHomeworkForm)}
                className="flex items-center px-4 py-2 bg-[#0088cc] text-white rounded-none font-medium text-sm hover:bg-blue-600 transition-colors">
                {showHomeworkForm ? 'Back to List' : '+ Create New Homework'}
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-6 border-b border-gray-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.name;
            return (
              <button
                key={tab.name}
                onClick={() => {
                  if (tab.name === 'Live Classes') {
                    navigate('/live-classes/manage');
                  } else {
                    setActiveTab(tab.name);
                  }
                }}
                className={`flex items-center whitespace-nowrap pb-3 text-sm font-medium transition-colors relative ${
                  isActive ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className={`w-4 h-4 mr-2 ${isActive ? 'text-gray-900' : 'text-gray-400'}`} />
                {tab.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'Dashboard' && <DashboardTab />}
        {activeTab === 'Guide' && <GuideTab setActiveTab={setActiveTab} navigate={navigate} />}
        {activeTab === 'Manage Syllabus' && <ManageSyllabusTab />}
        {activeTab === 'Classwork & Logbook' && (showClassworkForm ? <CreateClassworkForm /> : <ClassworkTab />)}
        {activeTab === 'Manage Resources' && <ManageResourcesTab />}
        {activeTab === 'Homework & Assignments' && (showHomeworkForm ? <CreateHomeworkForm /> : <HomeworkTab />)}
        {activeTab === 'Live Classes' && <div className="bg-white p-6 rounded-none shadow-sm">Redirecting...</div>}
      </div>
    </div>
  );
}

// ---------------------------
// Dashboard Tab Component
// ---------------------------
function DashboardTab() {
  return (
    <div className="space-y-6">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-none shadow-sm border border-gray-100 flex items-center">
          <div className="w-12 h-12 bg-blue-50 rounded-none flex items-center justify-center mr-4">
            <BookOpen className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase">Syllabus Items</p>
            <h3 className="text-2xl font-bold text-gray-800">7</h3>
            <p className="text-[10px] text-gray-400">Mapped units & sub-topics</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-none shadow-sm border border-gray-100 flex items-center">
          <div className="w-12 h-12 bg-green-50 rounded-none flex items-center justify-center mr-4">
            <FolderOpen className="w-6 h-6 text-green-500" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase">Study Materials</p>
            <h3 className="text-2xl font-bold text-gray-800">1</h3>
            <div className="flex text-[10px] text-gray-400 space-x-2">
              <span className="flex items-center"><FileText className="w-3 h-3 mr-0.5" /> 0</span>
              <span className="flex items-center"><Video className="w-3 h-3 mr-0.5" /> 0</span>
              <span className="flex items-center"><Book className="w-3 h-3 mr-0.5" /> 0</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-none shadow-sm border border-gray-100 flex items-center">
          <div className="w-12 h-12 bg-yellow-50 rounded-none flex items-center justify-center mr-4">
            <List className="w-6 h-6 text-yellow-500" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase">Active Homework</p>
            <h3 className="text-2xl font-bold text-gray-800">0</h3>
            <p className="text-[10px] text-gray-400">Currently open</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-none shadow-sm border border-gray-100 flex items-center">
          <div className="w-12 h-12 bg-red-50 rounded-none flex items-center justify-center mr-4">
            <Video className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase">Live Classes</p>
            <h3 className="text-2xl font-bold text-gray-800">0</h3>
            <p className="text-[10px] text-gray-400">Scheduled Jitsi sessions</p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Recent Homework */}
        <div className="col-span-2 bg-white rounded-none shadow-sm border border-gray-100">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-800 flex items-center">
              <Edit className="w-4 h-4 mr-2 text-blue-500" /> Recent Homework Assignments
            </h3>
            <button className="text-xs border border-blue-200 text-blue-600 px-3 py-1 rounded-none hover:bg-blue-50">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-[10px] text-gray-600 font-bold uppercase">
                <tr>
                  <th className="px-4 py-3">Homework Title</th>
                  <th className="px-4 py-3">Class & Subject</th>
                  <th className="px-4 py-3">Submission Rate</th>
                  <th className="px-4 py-3">Due Date</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {[
                  { title: 'Demo: Maths worksheet — numbers 1-20', class: 'Nursery - A', subject: 'English', rate: '1/18', due: '04 Aug, 2026' },
                  { title: 'Demo: Drawing — my family', class: 'Nursery - A', subject: 'English', rate: '1/18', due: '05 Aug, 2026' },
                  { title: 'Demo: English — read and summarise', class: 'Nursery - B', subject: 'English', rate: '0/4', due: '03 Aug, 2026' },
                  { title: 'Demo: Maths worksheet — numbers 1-20', class: 'Nursery - B', subject: 'English', rate: '0/4', due: '04 Aug, 2026' },
                  { title: 'Demo: Drawing — my family', class: 'Nursery - B', subject: 'English', rate: '0/4', due: '05 Aug, 2026' },
                ].map((item, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-4 font-medium text-gray-800">{item.title}</td>
                    <td className="px-4 py-4">
                      <div className="text-gray-800">{item.class}</div>
                      <span className="inline-block bg-[#0088cc] text-white text-[10px] px-1.5 rounded">{item.subject}</span>
                    </td>
                    <td className="px-4 py-4 font-semibold text-gray-700 flex items-center">
                      {item.rate} <div className="w-1.5 h-1.5 rounded-none bg-[#0088cc] ml-2"></div>
                    </td>
                    <td className="px-4 py-4 text-red-500 font-medium">{item.due}</td>
                    <td className="px-4 py-4 text-right">
                      <button className="text-blue-500 border border-blue-400 px-3 py-1 rounded-none text-xs flex items-center ml-auto hover:bg-blue-50">
                        <FileText className="w-3 h-3 mr-1" /> Evaluate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column - Upcoming Live Classes */}
        <div className="bg-white rounded-none shadow-sm border border-gray-100">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-800 flex items-center">
              <Video className="w-4 h-4 mr-2 text-red-500" /> Upcoming Live Classes
            </h3>
            <button className="text-xs border border-red-200 text-red-600 px-3 py-1 rounded-none hover:bg-red-50">View All</button>
          </div>
          <div className="p-2 space-y-2 max-h-[420px] overflow-y-auto">
            {[
              { title: 'demo', class: 'English | Nursery - A', time: '09 Aug, 08:00 AM', duration: '40 min' },
              { title: 'demo', class: 'English | Nursery - A', time: '10 Aug, 08:00 AM', duration: '40 min' },
              { title: 'demo', class: 'English | Nursery - A', time: '25 Aug, 08:00 AM', duration: '40 min' },
              { title: 'demo', class: 'English | Nursery - A', time: '27 Aug, 08:00 AM', duration: '40 min' },
            ].map((cls, i) => (
              <div key={i} className="p-3 border-b border-gray-50 flex justify-between items-start hover:bg-gray-50 rounded">
                <div>
                  <h4 className="font-bold text-gray-800">{cls.title}</h4>
                  <p className="text-[11px] text-gray-500 mb-2">{cls.class}</p>
                  <p className="text-[11px] text-gray-500 flex items-center">
                    <Calendar className="w-3 h-3 mr-1" /> {cls.time} <span className="ml-1">({cls.duration})</span>
                  </p>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className="bg-red-100 text-red-600 text-[9px] font-bold px-1.5 py-0.5 rounded-none border border-red-200 flex items-center">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-none mr-1 animate-pulse"></span> LIVE
                  </span>
                  <button className="bg-[#cc292b] text-white text-xs px-3 py-1.5 rounded-none flex items-center hover:bg-red-700">
                    <Video className="w-3 h-3 mr-1" /> Enter
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-none shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 flex items-center mb-1">
            <BarChart2 className="w-4 h-4 mr-2 text-blue-500" /> Homework Submission Rates
          </h3>
          <p className="text-[10px] text-gray-400 mb-6">Percentage of submissions by class in the last 30 days</p>
          <div className="h-48 border-l border-b border-gray-200 relative mt-4 ml-6 flex items-end">
            {/* Dummy y-axis */}
            <div className="absolute -left-6 top-0 bottom-0 flex flex-col justify-between text-[10px] text-gray-400">
              <span>5.2</span><span>4.8</span><span>4.4</span><span>4.0</span><span>3.6</span><span>3.2</span>
            </div>
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              <div className="w-full border-t border-gray-100 h-0"></div>
              <div className="w-full border-t border-gray-100 h-0"></div>
              <div className="w-full border-t border-gray-100 h-0"></div>
              <div className="w-full border-t border-gray-100 h-0"></div>
              <div className="w-full border-t border-gray-100 h-0"></div>
            </div>
            
            {/* Bar */}
            <div className="w-full flex justify-center pb-0 z-10">
              <div className="w-64 bg-[#5eb4f0] h-24 mt-auto"></div>
            </div>
            
            {/* x-axis */}
            <div className="absolute -bottom-6 w-full flex justify-center text-[10px] text-gray-500">
              Nursery
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-none shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 flex items-center mb-1">
            <div className="w-4 h-4 border-2 border-green-500 rounded-none flex items-center justify-center mr-2"><div className="w-1.5 h-1.5 bg-green-500 rounded-none"></div></div> Average Evaluated Marks
          </h3>
          <p className="text-[10px] text-gray-400 mb-6">Average score distribution by subject across assignments</p>
          <div className="h-48 border-l border-b border-gray-200 relative mt-4 ml-8 flex items-end">
            <div className="absolute -left-8 top-0 bottom-0 flex flex-col justify-between text-[10px] text-gray-400">
              <span>19.0</span><span>18.6</span><span>18.2</span><span>17.8</span><span>17.4</span><span>17.0</span>
            </div>
             <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              <div className="w-full border-t border-gray-100 h-0"></div>
              <div className="w-full border-t border-gray-100 h-0"></div>
              <div className="w-full border-t border-gray-100 h-0"></div>
              <div className="w-full border-t border-gray-100 h-0"></div>
              <div className="w-full border-t border-gray-100 h-0"></div>
            </div>
            
            {/* Bar */}
            <div className="w-full flex justify-center pb-0 z-10">
              <div className="w-64 bg-[#69c575] h-20 mt-auto"></div>
            </div>
            
            {/* x-axis */}
            <div className="absolute -bottom-6 w-full flex justify-center text-[10px] text-gray-500">
              English
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------
// Guide Tab Component
// ---------------------------
function GuideTab({ setActiveTab, navigate }) {
  return (
    <div className="bg-white rounded-none shadow-sm border border-gray-100 overflow-hidden flex">
      {/* Left Sidebar */}
      <div className="w-64 border-r border-gray-100 bg-white">
        <div className="p-4 border-b border-gray-100 flex items-center">
          <Book className="w-5 h-5 text-blue-500 mr-2" />
          <div>
            <h2 className="font-bold text-gray-800">Study Center Workflows</h2>
          </div>
        </div>
        <p className="px-4 py-3 text-xs text-gray-500 border-b border-gray-100">
          A comprehensive guide on managing the study center resources and live classes.
        </p>
        <div className="p-4 space-y-2">
          <div 
            onClick={() => setActiveTab('Manage Syllabus')}
            className="bg-[#eaf5ff] text-[#0088cc] font-medium p-3 rounded-none flex items-center text-sm cursor-pointer border border-[#cce8ff]"
          >
            <FolderOpen className="w-4 h-4 mr-3" /> 1. Syllabus
          </div>
          <div 
            onClick={() => setActiveTab('Classwork & Logbook')}
            className="text-gray-600 font-medium p-3 rounded-none flex items-center text-sm cursor-pointer hover:bg-gray-50"
          >
            <FileText className="w-4 h-4 mr-3" /> 2. Classwork
          </div>
          <div 
            onClick={() => setActiveTab('Homework & Assignments')}
            className="text-gray-600 font-medium p-3 rounded-none flex items-center text-sm cursor-pointer hover:bg-gray-50"
          >
            <List className="w-4 h-4 mr-3" /> 3. Homework
          </div>
          <div 
            onClick={() => navigate('/live-classes/manage')}
            className="text-gray-600 font-medium p-3 rounded-none flex items-center text-sm cursor-pointer hover:bg-gray-50"
          >
            <Video className="w-4 h-4 mr-3" /> 4. Live Classes
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 p-8">
        <h2 className="text-xl font-bold text-gray-800 flex items-center mb-6">
          <FolderOpen className="w-6 h-6 mr-3 text-blue-500" /> Manage Syllabus
        </h2>
        
        <p className="text-sm text-gray-700 mb-6">
          The syllabus module allows teachers and administrators to map out the academic curriculum for the session.
        </p>

        <ul className="space-y-4 text-sm text-gray-700">
          <li className="flex items-start">
            <span className="w-1.5 h-1.5 bg-gray-600 rounded-none mt-1.5 mr-3 shrink-0"></span>
            <div><span className="font-bold">Add Units & Topics:</span> Create a hierarchical structure of chapters and topics for each class and subject.</div>
          </li>
          <li className="flex items-start">
            <span className="w-1.5 h-1.5 bg-gray-600 rounded-none mt-1.5 mr-3 shrink-0"></span>
            <div><span className="font-bold">Track Progress:</span> Mark topics as completed as the academic year progresses.</div>
          </li>
          <li className="flex items-start">
            <span className="w-1.5 h-1.5 bg-gray-600 rounded-none mt-1.5 mr-3 shrink-0"></span>
            <div><span className="font-bold">Visibility:</span> Parents and students can view the syllabus structure from their portals.</div>
          </li>
        </ul>
      </div>
    </div>
  );
}

// ---------------------------
// Manage Syllabus Tab Component
// ---------------------------
function ManageSyllabusTab() {
  return (
    <div className="relative">
      <div className="flex gap-6">
        {/* Left Column */}
        <div className="w-1/3">
          <div className="bg-white rounded-none border border-gray-200 overflow-hidden">
            <div className="bg-[#007bff] p-3 text-white font-bold text-sm">
              Select Class & Subject
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Class</label>
                <div className="relative">
                  <select className="w-full border border-gray-300 rounded-none p-2 text-sm appearance-none outline-none focus:border-blue-500">
                    <option>Select Class</option>
                    <option>Nursery - A</option>
                    <option>Nursery - B</option>
                    <option>LKG</option>
                    <option>UKG</option>
                    <option>Class 1</option>
                    <option>Class 2</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2 top-2.5 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-2/3">
           <div className="bg-white rounded-none border border-gray-200 overflow-hidden h-full min-h-[400px] flex flex-col">
            <div className="p-3 border-b border-gray-200 font-bold text-gray-800 text-sm">
              Syllabus Structure
            </div>
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-400">
              <GraduationCap className="w-16 h-16 mb-4 text-gray-300" />
              <h3 className="text-lg font-bold text-gray-500 mb-2">Select Class & Subject</h3>
              <p className="text-sm">Please select a class and subject from the filters to load the syllabus structure.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------
// Classwork & Logbook Tab Component
// ---------------------------
function ClassworkTab() {
  return (
    <div className="bg-white rounded-none border border-gray-200 shadow-sm relative">
      {/* Filters */}
      <div className="p-4 flex gap-6 border-b border-gray-200 bg-gray-50">
        <div className="flex-1">
          <label className="block text-xs font-bold text-gray-700 mb-1">Filter By Class:</label>
          <div className="relative">
            <select className="w-full border border-gray-300 rounded-none p-2 text-sm appearance-none outline-none bg-white">
              <option>All Classes</option>
              <option>Nursery - A</option>
              <option>Nursery - B</option>
              <option>LKG</option>
              <option>UKG</option>
              <option>Class 1</option>
              <option>Class 2</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2 top-2.5 pointer-events-none" />
          </div>
        </div>
        <div className="flex-1">
          <label className="block text-xs font-bold text-gray-700 mb-1">Date:</label>
           <div className="relative">
            <input type="text" placeholder="dd-mm-yyyy" className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none bg-white" />
            <Calendar className="w-4 h-4 text-gray-500 absolute right-2 top-2.5 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Table Header */}
      <div className="bg-[#17a2b8] p-3 text-white flex justify-between items-center">
        <h3 className="font-bold flex items-center text-sm">
          <BookOpen className="w-4 h-4 mr-2" /> Entries List — this session
        </h3>
        <button className="bg-white text-gray-700 text-xs px-3 py-1 rounded-none font-bold flex items-center hover:bg-gray-100">
          <LayoutDashboard className="w-3 h-3 mr-1" /> View all sessions
        </button>
      </div>

      <div className="p-4">
        {/* Table Controls */}
        <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <span>Show</span>
            <select className="mx-2 border border-gray-300 rounded-none p-1 outline-none">
              <option>10</option>
            </select>
            <span>entries</span>
            
            <div className="ml-4 flex space-x-1">
              {['Copy', 'CSV', 'Excel', 'PDF', 'Print', 'Column visibility ▾'].map(btn => (
                <button key={btn} className="border border-gray-300 px-3 py-1 rounded-none hover:bg-gray-50 text-xs font-medium">
                  {btn}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <span className="mr-2">Search:</span>
            <input type="text" className="border border-gray-300 rounded-none p-1 outline-none focus:border-blue-500" />
          </div>
        </div>

        {/* Table */}
        <table className="w-full text-left text-sm border-t border-l border-r border-gray-200">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 font-bold text-gray-800 cursor-pointer">Date <span className="text-gray-300 ml-1">⇅</span></th>
              <th className="px-4 py-3 font-bold text-gray-800 cursor-pointer">Type <span className="text-gray-300 ml-1">⇅</span></th>
              <th className="px-4 py-3 font-bold text-gray-800">Topic</th>
              <th className="px-4 py-3 font-bold text-gray-800 cursor-pointer">Class & Section <span className="text-gray-300 ml-1">⇅</span></th>
              <th className="px-4 py-3 font-bold text-gray-800">Subject</th>
              <th className="px-4 py-3 font-bold text-gray-800 cursor-pointer">Teacher <span className="text-gray-300 ml-1">⇅</span></th>
              <th className="px-4 py-3 font-bold text-gray-800 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {[
              { date: '04 Aug, 2026', type: 'Logbook', topic: 'sfsfsfsfd', class: 'Nursery - A', subject: '—', teacher: 'Amit Sharma' },
              { date: '28 Jun, 2026', type: 'Logbook', topic: 'Focuses on learning counting', class: 'Nursery - A', subject: 'Mathematics', teacher: 'Amit Sharma' },
              { date: '28 Jun, 2026', type: 'Logbook', topic: 'Learning about the shapes and basic mathematical concepts.', class: 'Nursery - A', subject: 'Mathematics', teacher: 'Amit Sharma' },
              { date: '28 Jun, 2026', type: 'Logbook', topic: 'Learning the concept of ascending and descending order.', class: 'Nursery - A', subject: 'Mathematics', teacher: 'Amit Sharma' },
            ].map((row, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-700">{row.date}</td>
                <td className="px-4 py-3">
                  <span className="bg-[#17a2b8] text-white text-[10px] px-2 py-1 rounded">{row.type}</span>
                </td>
                <td className="px-4 py-3 text-gray-700">{row.topic}</td>
                <td className="px-4 py-3 text-gray-700">{row.class}</td>
                <td className="px-4 py-3 text-gray-700">{row.subject}</td>
                <td className="px-4 py-3 text-gray-700">{row.teacher}</td>
                <td className="px-4 py-3 text-center flex justify-center space-x-1">
                  <button className="bg-[#f0ad4e] hover:bg-orange-500 text-white p-1.5 rounded"><Edit className="w-3.5 h-3.5" /></button>
                  <button className="bg-[#dc3545] hover:bg-red-600 text-white p-1.5 rounded"><Trash2 className="w-3.5 h-3.5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------------------------
// Manage Resources Tab Component
// ---------------------------
function ManageResourcesTab() {
  return (
    <div className="relative">
      <div className="flex gap-6">
        <div className="w-1/3">
          <div className="bg-white rounded-none border border-gray-200 overflow-hidden">
            <div className="bg-[#007bff] p-3 text-white font-bold text-sm">
              Select Class & Subject
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Class</label>
                <div className="relative">
                  <select className="w-full border border-gray-300 rounded-none p-2 text-sm appearance-none outline-none focus:border-blue-500">
                    <option>Select Class</option>
                    <option>Nursery - A</option>
                    <option>Nursery - B</option>
                    <option>LKG</option>
                    <option>UKG</option>
                    <option>Class 1</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2 top-2.5 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-2/3">
           <div className="bg-white rounded-none border border-gray-200 overflow-hidden h-full min-h-[400px] flex flex-col">
            <div className="p-3 border-b border-gray-200 font-bold text-[#0088cc] text-sm flex items-center">
              <FolderOpen className="w-4 h-4 mr-2" /> Uploaded Materials
            </div>
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-400">
              <Search className="w-16 h-16 mb-4 text-gray-300" />
              <h3 className="text-lg font-bold text-gray-500 mb-2">Select Class & Subject</h3>
              <p className="text-sm">Please select a class and subject from the filters to view materials.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------
// Homework Tab Component
// ---------------------------
function HomeworkTab() {
  return (
    <div className="relative space-y-6">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-none border border-gray-200 text-center">
          <p className="text-[11px] text-gray-500 font-bold uppercase mb-1">Total Homeworks</p>
          <h3 className="text-3xl font-bold text-blue-600">7</h3>
        </div>
        <div className="bg-white p-4 rounded-none border border-gray-200 text-center border-l-4 border-l-green-500">
          <p className="text-[11px] text-gray-500 font-bold uppercase mb-1">Active Assignments</p>
          <h3 className="text-3xl font-bold text-green-500">0</h3>
        </div>
        <div className="bg-white p-4 rounded-none border border-gray-200 text-center border-l-4 border-l-red-500">
          <p className="text-[11px] text-gray-500 font-bold uppercase mb-1">Overdue / Pending</p>
          <h3 className="text-3xl font-bold text-red-500">7</h3>
        </div>
        <div className="bg-white p-4 rounded-none border border-gray-200 text-center border-l-4 border-l-cyan-500">
          <p className="text-[11px] text-gray-500 font-bold uppercase mb-1">Fully Evaluated</p>
          <h3 className="text-3xl font-bold text-cyan-500">0</h3>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-none border border-gray-200">
        <div className="w-1/3">
          <label className="block text-xs font-bold text-gray-700 mb-1">Filter By Class:</label>
          <div className="relative">
            <select className="w-full border border-gray-300 rounded-none p-2 text-sm appearance-none outline-none">
              <option>All Classes</option>
              <option>Nursery - A</option>
              <option>Nursery - B</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2 top-2.5 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-none border border-gray-200 shadow-sm">
        <div className="bg-[#17a2b8] p-3 text-white flex justify-between items-center">
          <h3 className="font-bold flex items-center text-sm">
            <FileText className="w-4 h-4 mr-2" /> Assignments List — this session
          </h3>
          <button className="bg-white text-gray-700 text-xs px-3 py-1 rounded-none font-bold flex items-center hover:bg-gray-100">
            <LayoutDashboard className="w-3 h-3 mr-1" /> View all sessions
          </button>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
            <div className="flex items-center">
              <span>Show</span>
              <select className="mx-2 border border-gray-300 rounded-none p-1 outline-none">
                <option>10</option>
              </select>
              <span>entries</span>
              
              <div className="ml-4 flex space-x-1">
                {['Copy', 'CSV', 'Excel', 'PDF', 'Print', 'Column visibility ▾'].map(btn => (
                  <button key={btn} className="border border-gray-300 px-3 py-1 rounded-none hover:bg-gray-50 text-xs font-medium">
                    {btn}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <span className="mr-2">Search:</span>
              <input type="text" className="border border-gray-300 rounded-none p-1 outline-none focus:border-blue-500" />
            </div>
          </div>

          <table className="w-full text-left text-sm border-t border-l border-r border-gray-200">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 font-bold text-gray-800">Title <span className="text-gray-300 ml-1">⇅</span></th>
                <th className="px-4 py-3 font-bold text-gray-800">Class & Section <span className="text-gray-300 ml-1">⇅</span></th>
                <th className="px-4 py-3 font-bold text-gray-800">Subject <span className="text-gray-300 ml-1">⇅</span></th>
                <th className="px-4 py-3 font-bold text-gray-800">Due Date <span className="text-gray-300 ml-1">⇅</span></th>
                <th className="px-4 py-3 font-bold text-gray-800">Status</th>
                <th className="px-4 py-3 font-bold text-gray-800">Submissions</th>
                <th className="px-4 py-3 font-bold text-gray-800">Assigned By <span className="text-gray-300 ml-1">⇅</span></th>
                <th className="px-4 py-3 font-bold text-gray-800 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { title: 'Demo: Drawing — my family', class: 'Nursery - A', subject: 'English', due: '05 Aug, 2026', submissions: '1 / 18 (6%)', pct: 6, teacher: 'Amit Sharma' },
                { title: 'Demo: Drawing — my family', class: 'Nursery - B', subject: 'English', due: '05 Aug, 2026', submissions: '0 / 4 (0%)', pct: 0, teacher: 'Amit Sharma' },
                { title: 'Demo: English — read and summarise', class: 'Nursery - B', subject: 'English', due: '03 Aug, 2026', submissions: '0 / 4 (0%)', pct: 0, teacher: 'Amit Sharma' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-700">{row.title}</td>
                  <td className="px-4 py-3 text-gray-700">{row.class}</td>
                  <td className="px-4 py-3 text-gray-700">{row.subject}</td>
                  <td className="px-4 py-3 text-gray-700">{row.due}</td>
                  <td className="px-4 py-3">
                    <span className="bg-[#dc3545] text-white text-[10px] font-bold px-2 py-1 rounded-none flex items-center w-max">
                      <AlertTriangle className="w-3 h-3 mr-1" /> Overdue
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-xs font-bold text-gray-800 mb-1">{row.submissions}</div>
                    <div className="w-full bg-gray-200 h-1.5 rounded-none overflow-hidden">
                      <div className="bg-[#17a2b8] h-full" style={{ width: `${row.pct}%` }}></div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{row.teacher}</td>
                  <td className="px-4 py-3 text-center">
                    <button className="bg-[#17a2b8] hover:bg-cyan-600 text-white text-xs px-3 py-1.5 rounded-none font-bold flex items-center justify-center w-full">
                      Actions <ChevronDown className="w-3 h-3 ml-1" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ---------------------------
// Create Classwork Form Component
// ---------------------------
function CreateClassworkForm() {
  return (
    <div className="bg-white rounded-none border border-gray-200 shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Create Classwork / Logbook Entry</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Entry Type</label>
            <select className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none bg-white">
              <option>Classwork</option>
              <option>Logbook</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Date</label>
            <div className="relative">
              <input type="text" defaultValue="23-08-2026" className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none bg-white" />
              <Calendar className="w-4 h-4 text-gray-500 absolute right-2 top-2.5 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Class</label>
            <select className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none bg-white">
              <option>Select Class</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Section</label>
            <select className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none bg-white">
              <option>Select class first</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Subject</label>
            <select className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none bg-white">
              <option>Select class first</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Teacher</label>
            <select className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none bg-white">
              <option>Select Teacher</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Attachment (Optional)</label>
            <div className="flex">
              <div className="w-full border border-gray-300 rounded-l p-2 text-sm text-gray-500 bg-white border-r-0">Choose file...</div>
              <button className="bg-gray-100 border border-gray-300 rounded-r px-4 text-sm text-gray-700 hover:bg-gray-200">Browse</button>
            </div>
            <p className="text-[10px] text-gray-400 mt-1">You can select a file. (PDF, Word, Images)</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Topic / Title</label>
            <input type="text" className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none bg-white" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Content / Notes</label>
            <div className="border border-gray-300 rounded-none overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-300 p-2 flex space-x-2 items-center">
                <span className="font-bold cursor-pointer px-1">B</span>
                <span className="italic cursor-pointer px-1">I</span>
                <span className="underline cursor-pointer px-1">U</span>
                <span className="line-through cursor-pointer px-1">S</span>
                <div className="w-px h-4 bg-gray-300 mx-1"></div>
                <List className="w-4 h-4 cursor-pointer text-gray-600" />
              </div>
              <textarea className="w-full p-2 h-[350px] outline-none text-sm resize-none"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------
// Create Homework Form Component
// ---------------------------
function CreateHomeworkForm() {
  return (
    <div className="bg-white rounded-none border border-gray-200 shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Create New Homework</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Title</label>
            <input type="text" className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none bg-white" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Class</label>
            <select className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none bg-white">
              <option>Select Class</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Section</label>
            <select className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none bg-white">
              <option>Select class first</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Subject</label>
            <select className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none bg-white">
              <option>Select class first</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Due Date</label>
            <div className="relative">
              <input type="text" placeholder="dd-mm-yyyy" className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none bg-white" />
              <Calendar className="w-4 h-4 text-gray-500 absolute right-2 top-2.5 pointer-events-none" />
            </div>
          </div>
          <div className="pt-4">
            <button className="bg-[#f07b3f] hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-none text-sm transition-colors">
              Create Homework
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
            <textarea className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none bg-white h-24 resize-none"></textarea>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Assigned By (Teacher)</label>
            <select className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none bg-white">
              <option>Select Teacher</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Link a Resource from Library (Optional)</label>
            <select className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none bg-white">
              <option>Select subject first</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Attach a New File (Optional)</label>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <button className="border border-gray-300 bg-gray-100 px-3 py-1 rounded-none text-xs hover:bg-gray-200">Choose file</button>
              <span>No file chosen</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
