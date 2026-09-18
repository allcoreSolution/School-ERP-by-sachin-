import React, { useState } from 'react';
import {
  Upload, Camera, UserPlus, Info, Search, List, ChevronRight, CheckCircle, Clock, ImageOff, RefreshCw, Wand2, ArrowLeft
} from 'lucide-react';

const SearchByPhoto = () => {
  const [view, setView] = useState('search'); // 'search' | 'enrol'

  // Dummy student data with statuses: 'Pending', 'Enrolled', 'No Photo'
  const [students, setStudents] = useState([
    { id: 1, name: 'Aarav Chaudhary', admNo: 'YISADM-069', status: 'Pending', photo: 'https://i.pravatar.cc/150?u=a1' },
    { id: 2, name: 'Aaryan Mehta', admNo: 'YISADM-263', status: 'Pending', photo: 'https://i.pravatar.cc/150?u=a2' },
    { id: 3, name: 'Aaryan Rao', admNo: 'YISADM-014', status: 'Enrolled', photo: 'https://i.pravatar.cc/150?u=a3' },
    { id: 4, name: 'Aaryan Gowda', admNo: 'YISADM-091', status: 'No Photo', photo: null },
    { id: 5, name: 'Aditi Sharma', admNo: 'YISADM-102', status: 'Pending', photo: 'https://i.pravatar.cc/150?u=a5' },
    { id: 6, name: 'Aryan Khan', admNo: 'YISADM-055', status: 'Enrolled', photo: 'https://i.pravatar.cc/150?u=a6' },
  ]);

  const [activeFilter, setActiveFilter] = useState('All'); // All, Enrolled, Pending, No Photo
  const [searchQuery, setSearchQuery] = useState('');

  // Handle single student generation
  const handleGenerate = (id) => {
    setStudents(students.map(s => s.id === id ? { ...s, status: 'Enrolled' } : s));
  };

  // Handle bulk generate missing
  const handleGenerateAllMissing = () => {
    setStudents(students.map(s => s.status === 'Pending' ? { ...s, status: 'Enrolled' } : s));
  };

  // Handle regenerate all (sets all enrolled back to enrolled just as a dummy action, or all to pending if resetting)
  const handleRegenerateAll = () => {
    // For visual effect, let's reset all Enrolled to Pending so they can be re-generated
    setStudents(students.map(s => s.status === 'Enrolled' ? { ...s, status: 'Pending' } : s));
  };

  // Filter logic
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.admNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' ? true : student.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  // Calculate stats
  const activeStudents = 280; // Hardcoded dummy
  const withPhotoCount = students.filter(s => s.photo !== null).length;
  const enrolledCount = students.filter(s => s.status === 'Enrolled').length;
  const pendingCount = students.filter(s => s.status === 'Pending').length;

  return (
    <div className="p-6 h-full flex flex-col bg-gray-50 overflow-y-auto">

      {/* Top Navigation / Breadcrumbs matching image 1 */}
      <div className="mb-4 flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-gray-800">Student Information</h1>
        <p className="text-sm text-gray-500">Manage admissions, attendance, behavior, categories, and houses across the school.</p>

        {/* Mockup of the top nav bar (not fully functional links, just UI) */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-gray-500 mt-2 border-b border-gray-200 pb-2">
          <div className="hover:text-[#5F52FF] cursor-pointer flex items-center gap-1"><Upload className="w-3.5 h-3.5" /> Dashboard</div>
          <div className="hover:text-[#5F52FF] cursor-pointer flex items-center gap-1"><Upload className="w-3.5 h-3.5" /> Guide</div>
          <div className="hover:text-[#5F52FF] cursor-pointer flex items-center gap-1"><UserPlus className="w-3.5 h-3.5" /> Student Admission</div>
          <div className="hover:text-[#5F52FF] cursor-pointer flex items-center gap-1"><List className="w-3.5 h-3.5" /> Student List</div>
          <div className="text-gray-900 border-b-2 border-gray-900 pb-2 -mb-[10px] cursor-pointer flex items-center gap-1"><Camera className="w-3.5 h-3.5" /> Search by Photo</div>
          <div className="hover:text-[#5F52FF] cursor-pointer flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> Student Attendance</div>
          <div className="hover:text-[#5F52FF] cursor-pointer">... More Menu </div>
        </div>
      </div>

      {view === 'search' && (
        <div className="flex-1 flex flex-col gap-4 animate-in fade-in duration-300">

          {/* Action Row */}
          <div className="flex justify-end">
            <button
              onClick={() => setView('enrol')}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-none bg-white text-gray-700 hover:bg-gray-50 text-sm font-semibold shadow-sm"
            >
              <UserPlus className="w-4 h-4" /> Enrol Faces
            </button>
          </div>

          {/* Info Banner */}
          <div className="bg-white border border-gray-200 rounded-none p-3 flex gap-2 text-gray-600 text-[13px] items-center shadow-sm">
            <Info className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <p>
              Upload or capture a face photo to find the closest matching students. Matching runs <strong>entirely in your browser</strong> against <strong>17</strong> enrolled faces — the photo is never uploaded. Results are ranked suggestions, so <strong>always confirm the identity visually</strong> before acting.
            </p>
          </div>

          {/* Main Content Area (Two Columns) */}
          <div className="flex flex-col lg:flex-row gap-4 flex-1">

            {/* Left Panel - Upload/Webcam */}
            <div className="lg:w-1/2 flex flex-col gap-4">
              <div className="flex gap-2">
                <button className="flex-1 flex justify-center items-center gap-2 bg-[#5F52FF] text-white py-3 rounded-none font-semibold text-sm shadow-sm hover:bg-[#4E41E6]">
                  <Upload className="w-4 h-4" /> Upload
                </button>
                <button className="flex-1 flex justify-center items-center gap-2 bg-white border border-gray-300 text-gray-700 py-3 rounded-none font-semibold text-sm shadow-sm hover:bg-gray-50">
                  <Camera className="w-4 h-4" /> Webcam
                </button>
              </div>

              {/* Dark Placeholder Area */}
              <div className="flex-1 bg-[#1A1F2C] rounded-none border border-gray-800 flex flex-col items-center justify-center text-gray-400 min-h-[400px]">
                <div className="bg-gray-800 p-4 rounded-none mb-4">
                  <Camera className="w-8 h-8" />
                </div>
                <p className="text-sm font-medium">Choose a photo or start the webcam</p>
              </div>
            </div>

            {/* Right Panel - Candidate Matches */}
            <div className="lg:w-1/2 bg-white border border-gray-200 rounded-none shadow-sm flex flex-col">
              <div className="p-4 border-b border-gray-100 font-bold text-gray-800 flex items-center gap-2 text-sm">
                <List className="w-4 h-4" /> Candidate Matches
              </div>
              <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8 min-h-[400px]">
                <Search className="w-12 h-12 mb-4 text-gray-300" />
                <p className="text-sm">Search results will appear here.</p>
              </div>
            </div>

          </div>
        </div>
      )}

      {view === 'enrol' && (
        <div className="flex-1 flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-300">

          {/* Header Row */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setView('search')}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-none bg-white text-gray-600 hover:bg-gray-50 text-xs font-bold shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Search
            </button>
            <div className="flex items-center gap-2 text-lg font-bold text-gray-800">
              <UserPlus className="w-5 h-5 text-gray-600" /> Enrol Student Faces
            </div>
          </div>

          {/* Info Banner */}
          <div className="bg-white border border-gray-200 rounded-none p-3 flex gap-2 text-gray-600 text-[13px] items-start shadow-sm">
            <Info className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
            <p>
              Face vectors are generated <strong>in your browser</strong> from each student's profile photo and stored for search. Students <strong>without a photo cannot be enrolled</strong> — add photos first (Student List <ChevronRight className="w-3 h-3 inline" /> Bulk Photos). Keep this tab open until processing finishes.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border border-gray-200 rounded-none p-4 shadow-sm flex flex-col justify-center">
              <div className="text-3xl font-bold text-gray-800">{activeStudents}</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">Active Students</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-none p-4 shadow-sm flex flex-col justify-center">
              <div className="text-3xl font-bold text-gray-800">{withPhotoCount}</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">With Photo</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-none p-4 shadow-sm flex flex-col justify-center">
              <div className="text-3xl font-bold text-green-500">{enrolledCount}</div>
              <div className="text-[10px] font-bold text-green-600/70 uppercase tracking-wider mt-1">Enrolled</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-none p-4 shadow-sm flex flex-col justify-center">
              <div className="text-3xl font-bold text-amber-500">{pendingCount}</div>
              <div className="text-[10px] font-bold text-amber-600/70 uppercase tracking-wider mt-1">Pending (Has Photo)</div>
            </div>
          </div>

          {/* Toolbar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-3 rounded-none border border-gray-200 shadow-sm">

            <div className="flex items-center gap-3">
              {/* Filter Tabs */}
              <div className="flex border border-gray-200 rounded-none overflow-hidden bg-gray-50 text-xs font-semibold">
                {['All', 'Enrolled', 'Pending', 'No Photo'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveFilter(tab)}
                    className={`px-4 py-2 border-r border-gray-200 last:border-r-0 transition-colors ${activeFilter === tab ? 'bg-[#1A1F2C] text-white' : 'text-gray-600 hover:bg-white'
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search name / admission no..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border border-gray-300 rounded-none pl-3 pr-8 py-1.5 text-sm focus:ring-[#5F52FF] w-64 shadow-sm"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleGenerateAllMissing}
                className="flex items-center gap-2 px-4 py-2 bg-[#5F52FF] text-white rounded-none hover:bg-[#4E41E6] transition-colors text-sm font-semibold shadow-sm"
              >
                <Wand2 className="w-4 h-4" /> Generate All Missing
              </button>
              <button
                onClick={handleRegenerateAll}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-none hover:bg-gray-50 transition-colors text-sm font-semibold shadow-sm"
              >
                <RefreshCw className="w-4 h-4 text-gray-500" /> Re-generate All
              </button>
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden flex-1 flex flex-col min-h-0">
            <div className="overflow-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-700">
                    <th className="px-5 py-3 border-r border-gray-100 w-16">Photo</th>
                    <th className="px-5 py-3 border-r border-gray-100">Name</th>
                    <th className="px-5 py-3 border-r border-gray-100">Admission No</th>
                    <th className="px-5 py-3 border-r border-gray-100">Status</th>
                    <th className="px-5 py-3 border-r border-gray-100">Enrolled</th>
                    <th className="px-5 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-700">
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-5 py-8 text-center text-gray-500">
                        No students found for this filter.
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((student) => (
                      <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-3 border-r border-gray-100">
                          {student.photo ? (
                            <img src={student.photo} alt={student.name} className="w-10 h-10 rounded-none object-cover border border-gray-200" />
                          ) : (
                            <div className="w-10 h-10 rounded-none bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400">
                              <UserPlus className="w-5 h-5" />
                            </div>
                          )}
                        </td>
                        <td className="px-5 py-3 border-r border-gray-100 font-medium text-gray-800">{student.name}</td>
                        <td className="px-5 py-3 border-r border-gray-100 text-gray-500">{student.admNo}</td>
                        <td className="px-5 py-3 border-r border-gray-100">
                          {student.status === 'Pending' && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-400 text-amber-900 text-[11px] font-bold rounded-none shadow-sm">
                              <Clock className="w-3.5 h-3.5" /> Pending
                            </span>
                          )}
                          {student.status === 'Enrolled' && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-500 text-white text-[11px] font-bold rounded-none shadow-sm">
                              <CheckCircle className="w-3.5 h-3.5" /> Enrolled
                            </span>
                          )}
                          {student.status === 'No Photo' && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-500 text-white text-[11px] font-bold rounded-none shadow-sm">
                              <ImageOff className="w-3.5 h-3.5" /> No Photo
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-3 border-r border-gray-100 text-gray-400">
                          {student.status === 'Enrolled' ? <CheckCircle className="w-4 h-4 text-green-500" /> : '—'}
                        </td>
                        <td className="px-5 py-3 text-right">
                          {student.status === 'Pending' && (
                            <button
                              onClick={() => handleGenerate(student.id)}
                              className="inline-flex items-center gap-1.5 px-4 py-1.5 border border-[#5F52FF] text-[#5F52FF] hover:bg-blue-50 rounded-none text-xs font-bold transition-colors"
                            >
                              <Wand2 className="w-3.5 h-3.5" /> Generate
                            </button>
                          )}
                          {student.status === 'Enrolled' && (
                            <button
                              onClick={() => setStudents(students.map(s => s.id === student.id ? { ...s, status: 'Pending' } : s))}
                              className="inline-flex items-center gap-1.5 px-4 py-1.5 border border-[#5F52FF] bg-[#5F52FF] text-white hover:bg-[#4E41E6] rounded-none text-xs font-bold transition-colors"
                            >
                              <RefreshCw className="w-3.5 h-3.5" /> Re-run
                            </button>
                          )}
                          {student.status === 'No Photo' && (
                            <span className="text-gray-400 text-xs font-medium mr-4">—</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default SearchByPhoto;
