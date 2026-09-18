import React, { useState } from 'react';
import { 
  LayoutDashboard, Book, UserPlus, List, Image, CheckSquare, 
  Activity, Home, Tag, UserMinus, Upload, MoreHorizontal, 
  Search, Info, CheckCircle, Download, XCircle 
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const TCAndExit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('TC Register');

  // Dummy State for Tabs
  const [exitedStudents, setExitedStudents] = useState([
    { id: 'YISADM-133', name: 'Yash Kaur', standing: 'Withdrawn', leftOn: '18 Aug 2026', lastClass: 'Class V', tcNo: '-', recordedBy: 'school admin' }
  ]);

  const [onHoldStudents, setOnHoldStudents] = useState([
    { id: 'YISADM-007', name: 'Diya Reddy', standing: 'On hold', leftOn: '-', lastClass: '-', tcNo: '-', recordedBy: '-' }
  ]);

  const handleCancelExit = (id) => {
    if (window.confirm("Are you sure you want to cancel the exit for this student?")) {
      setExitedStudents(exitedStudents.filter(s => s.id !== id));
    }
  };

  const handleReEnable = (id) => {
    if (window.confirm("Are you sure you want to re-enable this student's account?")) {
      setOnHoldStudents(onHoldStudents.filter(s => s.id !== id));
    }
  };

  const tabs = [
    { name: 'Pending Exit', count: 0 },
    { name: 'TC Register', count: exitedStudents.length }, // Shared data with Exited for simplicity in dummy, though UI says 1 total
    { name: 'Exited', count: exitedStudents.length },
    { name: 'On Hold', count: onHoldStudents.length },
  ];

  const subNav = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/students/dashboard' },
    { name: 'Guide', icon: Book, path: '#' },
    { name: 'Student Admission', icon: UserPlus, path: '/students/admission' },
    { name: 'Student List', icon: List, path: '/students/list' },
    { name: 'Search by Photo', icon: Image, path: '/students/search-photo' },
    { name: 'Student Attendance', icon: CheckSquare, path: '/students/attendance' },
    { name: 'Behavior Records', icon: Activity, path: '/students/behavior' },
    { name: 'Student Houses', icon: Home, path: '/students/houses' },
    { name: 'Student Categories', icon: Tag, path: '/students/categories' },
    { name: 'TC & Exit', icon: UserMinus, path: '/students/tc', active: true },
    { name: 'Bulk Upload', icon: Upload, path: '/students/attendance/import' },
  ];

  return (
    <div className="flex flex-col h-full bg-white overflow-y-auto">
      
      {/* Top Header Section (Replicating the screenshot's overarching header) */}
      <div className="px-8 pt-8 pb-4">
        <h1 className="text-2xl font-bold text-[#1a1a2e]">Student Information</h1>
        <p className="text-[13px] text-gray-500 mt-1">Manage admissions, attendance, behavior, categories, and houses across the school.</p>
        
        {/* Sub Navigation */}
        <div className="flex items-center gap-6 mt-8 overflow-x-auto border-b border-gray-200 pb-px">
          {subNav.map((item, index) => {
            const Icon = item.icon;
            return (
              <button 
                key={index}
                onClick={() => item.path !== '#' && navigate(item.path)}
                className={`flex items-center gap-2 pb-3 text-[13px] font-bold whitespace-nowrap border-b-2 transition-colors ${
                  item.active 
                    ? 'border-[#1a1a2e] text-[#1a1a2e]' 
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                <Icon className="w-4 h-4" /> {item.name}
              </button>
            )
          })}
          <button className="flex items-center gap-1 pb-3 text-[13px] font-bold text-gray-500 border-b-2 border-transparent ml-auto whitespace-nowrap">
            <MoreHorizontal className="w-4 h-4" /> More Menu
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-4 flex-1 flex flex-col min-h-0">
        
        <div className="flex justify-between items-end mb-6">
          <div className="flex items-baseline gap-2">
            <h2 className="text-xl font-bold text-[#1a1a2e]">TC & Exit</h2>
            <span className="text-xs text-gray-400 font-medium">
              {tabs.reduce((sum, tab) => sum + tab.count, 0)} total
            </span>
          </div>
          {activeTab === 'TC Register' && (
            <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-none text-[13px] font-semibold text-gray-700 hover:bg-gray-50 shadow-sm">
              <Download className="w-4 h-4" /> Export CSV
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-6 border-b border-gray-200 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`pb-3 text-[13px] font-bold flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === tab.name 
                  ? 'border-[#00a8a8] text-[#00a8a8]' 
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              {tab.name} <span className="text-[10px] text-gray-400 font-normal">{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Search Bar (Changes slightly based on tab) */}
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input 
              type="text" 
              placeholder="Name, admission no. or TC no..."
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-none text-sm focus:outline-none focus:border-[#00a8a8]"
            />
          </div>
          
          {activeTab === 'TC Register' && (
            <select className="border border-gray-300 rounded-none px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#00a8a8] w-40 font-medium">
              <option>All exit types</option>
              <option>Transfer Out</option>
              <option>Withdrawn</option>
              <option>Passed Out</option>
              <option>Struck Off</option>
            </select>
          )}
          
          <button className="px-6 py-2 bg-[#00a8a8] text-white rounded-none text-sm font-semibold hover:bg-[#009090] shadow-sm">
            Search
          </button>
        </div>

        {/* Tab Content Rendering */}
        {activeTab === 'Pending Exit' && (
          <div className="flex-1 flex flex-col animate-in fade-in duration-300">
            <div className="bg-[#00a8a8] text-white px-4 py-3 rounded-none flex items-center gap-3 text-sm mb-6 shadow-sm">
              <Info className="w-5 h-5 flex-shrink-0" />
              <span>A Transfer Certificate was printed for these students, but they are <strong>still on the active roll</strong>. Record the exit so they come off the roster and free a seat on your plan.</span>
            </div>

            <table className="w-full text-left border-collapse border border-gray-200 rounded-none overflow-hidden">
              <thead>
                <tr className="bg-[#F8F7FF] border-b border-gray-200 text-[10px] font-bold text-[#5F52FF] uppercase tracking-wider">
                  <th className="px-5 py-3 border-r border-gray-200">ADM NO.</th>
                  <th className="px-5 py-3 border-r border-gray-200">STUDENT</th>
                  <th className="px-5 py-3 border-r border-gray-200">CURRENT CLASS</th>
                  <th className="px-5 py-3 border-r border-gray-200">CERTIFICATE PRINTED</th>
                  <th className="px-5 py-3">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="5" className="px-5 py-12 text-center text-sm text-gray-500 border-b border-gray-200">
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Nothing to reconcile — every printed certificate has a recorded exit.</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'TC Register' && (
          <div className="flex-1 flex flex-col animate-in fade-in duration-300">
            
            {/* Summary Cards */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="border border-gray-200 rounded-none p-4 bg-white shadow-sm flex flex-col justify-center">
                <div className="text-2xl font-bold text-[#1a1a2e]">0</div>
                <div className="text-xs text-gray-500 mt-1">Transfer Out</div>
              </div>
              <div className="border border-gray-200 rounded-none p-4 bg-white shadow-sm flex flex-col justify-center border-l-4 border-l-blue-400">
                <div className="text-2xl font-bold text-[#1a1a2e]">1</div>
                <div className="text-xs text-gray-500 mt-1">Withdrawn</div>
              </div>
              <div className="border border-gray-200 rounded-none p-4 bg-white shadow-sm flex flex-col justify-center">
                <div className="text-2xl font-bold text-[#1a1a2e]">0</div>
                <div className="text-xs text-gray-500 mt-1">Passed Out</div>
              </div>
              <div className="border border-gray-200 rounded-none p-4 bg-white shadow-sm flex flex-col justify-center">
                <div className="text-2xl font-bold text-red-500">0</div>
                <div className="text-xs text-gray-500 mt-1">Struck Off</div>
              </div>
            </div>

            <table className="w-full text-left border-collapse border border-gray-200 rounded-t-lg overflow-hidden">
              <thead>
                <tr className="bg-[#F8F7FF] border-b border-gray-200 text-[10px] font-bold text-[#5F52FF] uppercase tracking-wider">
                  <th className="px-5 py-3 border-r border-gray-200">ADM NO.</th>
                  <th className="px-5 py-3 border-r border-gray-200">STUDENT</th>
                  <th className="px-5 py-3 border-r border-gray-200">STANDING</th>
                  <th className="px-5 py-3 border-r border-gray-200">LEFT ON</th>
                  <th className="px-5 py-3 border-r border-gray-200">LAST CLASS</th>
                  <th className="px-5 py-3 border-r border-gray-200">TC NO.</th>
                  <th className="px-5 py-3 border-r border-gray-200">RECORDED BY</th>
                  <th className="px-5 py-3 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-[#1a1a2e]">
                {exitedStudents.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-5 py-8 text-center text-gray-500 border-b border-gray-200">No records found.</td>
                  </tr>
                ) : (
                  exitedStudents.map(student => (
                    <tr key={student.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4 border-r border-gray-200">{student.id}</td>
                      <td className="px-5 py-4 border-r border-gray-200 font-bold">{student.name}</td>
                      <td className="px-5 py-4 border-r border-gray-200">
                        <span className="bg-gray-500 text-white px-2 py-0.5 rounded-none text-[11px] font-semibold">{student.standing}</span>
                      </td>
                      <td className="px-5 py-4 border-r border-gray-200">{student.leftOn}</td>
                      <td className="px-5 py-4 border-r border-gray-200">{student.lastClass}</td>
                      <td className="px-5 py-4 border-r border-gray-200">{student.tcNo}</td>
                      <td className="px-5 py-4 border-r border-gray-200 text-gray-500">{student.recordedBy}</td>
                      <td className="px-5 py-4 text-right">
                        <button 
                          onClick={() => handleCancelExit(student.id)}
                          className="flex items-center gap-2 ml-auto px-3 py-1.5 border border-gray-300 rounded-none text-xs font-semibold text-gray-600 hover:bg-gray-50 shadow-sm"
                        >
                          <XCircle className="w-3.5 h-3.5" /> Cancel Exit
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'Exited' && (
          <div className="flex-1 flex flex-col animate-in fade-in duration-300">
            <table className="w-full text-left border-collapse border border-gray-200 rounded-t-lg overflow-hidden">
              <thead>
                <tr className="bg-[#F8F7FF] border-b border-gray-200 text-[10px] font-bold text-[#5F52FF] uppercase tracking-wider">
                  <th className="px-5 py-3 border-r border-gray-200">ADM NO.</th>
                  <th className="px-5 py-3 border-r border-gray-200">STUDENT</th>
                  <th className="px-5 py-3 border-r border-gray-200">STANDING</th>
                  <th className="px-5 py-3 border-r border-gray-200">LEFT ON</th>
                  <th className="px-5 py-3 border-r border-gray-200">LAST CLASS</th>
                  <th className="px-5 py-3 border-r border-gray-200">TC NO.</th>
                  <th className="px-5 py-3 border-r border-gray-200">RECORDED BY</th>
                  <th className="px-5 py-3 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-[#1a1a2e]">
                {exitedStudents.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-5 py-8 text-center text-gray-500 border-b border-gray-200">No exited students found.</td>
                  </tr>
                ) : (
                  exitedStudents.map(student => (
                    <tr key={student.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4 border-r border-gray-200">{student.id}</td>
                      <td className="px-5 py-4 border-r border-gray-200 font-bold">{student.name}</td>
                      <td className="px-5 py-4 border-r border-gray-200">
                        <span className="bg-gray-500 text-white px-2 py-0.5 rounded-none text-[11px] font-semibold">{student.standing}</span>
                      </td>
                      <td className="px-5 py-4 border-r border-gray-200">{student.leftOn}</td>
                      <td className="px-5 py-4 border-r border-gray-200">{student.lastClass}</td>
                      <td className="px-5 py-4 border-r border-gray-200">{student.tcNo}</td>
                      <td className="px-5 py-4 border-r border-gray-200 text-gray-500">{student.recordedBy}</td>
                      <td className="px-5 py-4 text-right">
                        <button 
                          onClick={() => handleCancelExit(student.id)}
                          className="flex items-center gap-2 ml-auto px-3 py-1.5 border border-gray-300 rounded-none text-xs font-semibold text-gray-600 hover:bg-gray-50 shadow-sm"
                        >
                          <XCircle className="w-3.5 h-3.5" /> Cancel Exit
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'On Hold' && (
          <div className="flex-1 flex flex-col animate-in fade-in duration-300">
            <table className="w-full text-left border-collapse border border-gray-200 rounded-t-lg overflow-hidden">
              <thead>
                <tr className="bg-[#F8F7FF] border-b border-gray-200 text-[10px] font-bold text-[#5F52FF] uppercase tracking-wider">
                  <th className="px-5 py-3 border-r border-gray-200">ADM NO.</th>
                  <th className="px-5 py-3 border-r border-gray-200">STUDENT</th>
                  <th className="px-5 py-3 border-r border-gray-200">STANDING</th>
                  <th className="px-5 py-3 border-r border-gray-200">LEFT ON</th>
                  <th className="px-5 py-3 border-r border-gray-200">LAST CLASS</th>
                  <th className="px-5 py-3 border-r border-gray-200">TC NO.</th>
                  <th className="px-5 py-3 border-r border-gray-200">RECORDED BY</th>
                  <th className="px-5 py-3 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-[#1a1a2e]">
                {onHoldStudents.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-5 py-8 text-center text-gray-500 border-b border-gray-200">No on-hold students found.</td>
                  </tr>
                ) : (
                  onHoldStudents.map(student => (
                    <tr key={student.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4 border-r border-gray-200">{student.id}</td>
                      <td className="px-5 py-4 border-r border-gray-200 font-bold">{student.name}</td>
                      <td className="px-5 py-4 border-r border-gray-200">
                        <span className="bg-amber-400 text-white px-2 py-0.5 rounded-none text-[11px] font-semibold">{student.standing}</span>
                      </td>
                      <td className="px-5 py-4 border-r border-gray-200 text-gray-400 font-bold">{student.leftOn}</td>
                      <td className="px-5 py-4 border-r border-gray-200 text-gray-400 font-bold">{student.lastClass}</td>
                      <td className="px-5 py-4 border-r border-gray-200 text-gray-400 font-bold">{student.tcNo}</td>
                      <td className="px-5 py-4 border-r border-gray-200 text-gray-400 font-bold">{student.recordedBy}</td>
                      <td className="px-5 py-4 text-right">
                        <button 
                          onClick={() => handleReEnable(student.id)}
                          className="flex items-center gap-2 ml-auto px-3 py-1.5 border border-gray-300 rounded-none text-xs font-semibold text-gray-600 hover:bg-gray-50 shadow-sm"
                        >
                          <CheckCircle className="w-3.5 h-3.5" /> Re-Enable
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
};

export default TCAndExit;
