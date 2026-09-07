import React, { useState, useMemo } from 'react';
import {
  Users, Search, Eye, Phone, Mail, MapPin,
  Filter, Download, X, ChevronUp, ChevronDown,
  UserCheck, UserX, BookOpen, Calendar, GraduationCap
} from 'lucide-react';

// ── Sample Data ──────────────────────────────────────────────────────────────
const allStudents = [
  { id: 1,  name: 'Ananya Desai',     roll: 'STU-001', class: 'X', sec: 'A', dob: '12 Mar 2010', gender: 'Female', phone: '9876543210', email: 'ananya@example.com', address: 'Delhi', status: 'Active',   attendance: 94, photo: 'https://i.pravatar.cc/100?img=1'  },
  { id: 2,  name: 'Kabir Sharma',     roll: 'STU-002', class: 'X', sec: 'A', dob: '05 Jul 2010', gender: 'Male',   phone: '9876543211', email: 'kabir@example.com',  address: 'Noida', status: 'Active',   attendance: 88, photo: 'https://i.pravatar.cc/100?img=2'  },
  { id: 3,  name: 'Priya Nair',       roll: 'STU-003', class: 'X', sec: 'B', dob: '22 Nov 2010', gender: 'Female', phone: '9876543212', email: 'priya@example.com',  address: 'Gurgaon', status: 'Active',   attendance: 97, photo: 'https://i.pravatar.cc/100?img=5'  },
  { id: 4,  name: 'Rohit Gupta',      roll: 'STU-004', class: 'X', sec: 'B', dob: '14 Feb 2010', gender: 'Male',   phone: '9876543213', email: 'rohit@example.com',  address: 'Delhi', status: 'Inactive', attendance: 62, photo: 'https://i.pravatar.cc/100?img=7'  },
  { id: 5,  name: 'Sanya Mehta',      roll: 'STU-005', class: 'IX', sec: 'A', dob: '08 Sep 2011', gender: 'Female', phone: '9876543214', email: 'sanya@example.com',  address: 'Faridabad', status: 'Active',   attendance: 91, photo: 'https://i.pravatar.cc/100?img=9'  },
  { id: 6,  name: 'Arjun Singh',      roll: 'STU-006', class: 'IX', sec: 'A', dob: '30 Jan 2011', gender: 'Male',   phone: '9876543215', email: 'arjun@example.com',  address: 'Delhi', status: 'Active',   attendance: 85, photo: 'https://i.pravatar.cc/100?img=11' },
  { id: 7,  name: 'Kavya Iyer',       roll: 'STU-007', class: 'IX', sec: 'B', dob: '17 Jun 2011', gender: 'Female', phone: '9876543216', email: 'kavya@example.com',  address: 'Noida', status: 'Active',   attendance: 99, photo: 'https://i.pravatar.cc/100?img=20' },
  { id: 8,  name: 'Ishaan Patel',     roll: 'STU-008', class: 'IX', sec: 'B', dob: '03 Apr 2011', gender: 'Male',   phone: '9876543217', email: 'ishaan@example.com', address: 'Gurgaon', status: 'Active',   attendance: 76, photo: 'https://i.pravatar.cc/100?img=13' },
  { id: 9,  name: 'Aisha Khan',       roll: 'STU-009', class: 'VIII', sec: 'A', dob: '25 Oct 2012', gender: 'Female', phone: '9876543218', email: 'aisha@example.com',  address: 'Delhi', status: 'Active',   attendance: 93, photo: 'https://i.pravatar.cc/100?img=25' },
  { id: 10, name: 'Dev Malhotra',     roll: 'STU-010', class: 'VIII', sec: 'A', dob: '19 Dec 2012', gender: 'Male',   phone: '9876543219', email: 'dev@example.com',    address: 'Noida', status: 'Active',   attendance: 82, photo: 'https://i.pravatar.cc/100?img=15' },
  { id: 11, name: 'Meera Joshi',      roll: 'STU-011', class: 'VIII', sec: 'B', dob: '11 Aug 2012', gender: 'Female', phone: '9876543220', email: 'meera@example.com',  address: 'Delhi', status: 'Inactive', attendance: 54, photo: 'https://i.pravatar.cc/100?img=30' },
  { id: 12, name: 'Rajan Das',        roll: 'STU-012', class: 'VIII', sec: 'B', dob: '02 May 2012', gender: 'Male',   phone: '9876543221', email: 'rajan@example.com',  address: 'Faridabad', status: 'Active',   attendance: 89, photo: 'https://i.pravatar.cc/100?img=17' },
  { id: 13, name: 'Pooja Sharma',     roll: 'STU-013', class: 'XI', sec: 'C', dob: '28 Jul 2009',  gender: 'Female', phone: '9876543222', email: 'pooja@example.com',  address: 'Gurgaon', status: 'Active',   attendance: 96, photo: 'https://i.pravatar.cc/100?img=35' },
  { id: 14, name: 'Vikram Rawat',     roll: 'STU-014', class: 'XI', sec: 'C', dob: '16 Mar 2009',  gender: 'Male',   phone: '9876543223', email: 'vikram@example.com', address: 'Delhi', status: 'Active',   attendance: 78, photo: 'https://i.pravatar.cc/100?img=18' },
  { id: 15, name: 'Disha Verma',      roll: 'STU-015', class: 'XI', sec: 'C', dob: '09 Nov 2009',  gender: 'Female', phone: '9876543224', email: 'disha@example.com',  address: 'Noida', status: 'Active',   attendance: 90, photo: 'https://i.pravatar.cc/100?img=40' },
];

const classes  = ['All', 'VIII', 'IX', 'X', 'XI'];
const sections = ['All', 'A', 'B', 'C'];
const statuses = ['All', 'Active', 'Inactive'];

const AttBadge = ({ pct }) => {
  const cls = pct >= 90 ? 'bg-green-100 text-green-700' : pct >= 75 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-600';
  return <span className={`text-xs font-bold px-2 py-0.5 ${cls}`}>{pct}%</span>;
};

const StudentList = () => {
  const [search,     setSearch]     = useState('');
  const [classF,     setClassF]     = useState('All');
  const [sectionF,   setSectionF]   = useState('All');
  const [statusF,    setStatusF]    = useState('All');
  const [sortKey,    setSortKey]    = useState('name');
  const [sortDir,    setSortDir]    = useState('asc');
  const [viewStudent, setView]      = useState(null);
  const [viewMode,   setViewMode]   = useState('table'); // 'table' | 'card'

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const filtered = useMemo(() => {
    return allStudents
      .filter(s =>
        (classF   === 'All' || s.class === classF) &&
        (sectionF === 'All' || s.sec   === sectionF) &&
        (statusF  === 'All' || s.status === statusF) &&
        (s.name.toLowerCase().includes(search.toLowerCase()) ||
         s.roll.toLowerCase().includes(search.toLowerCase()) ||
         s.email.toLowerCase().includes(search.toLowerCase()))
      )
      .sort((a, b) => {
        let va = a[sortKey], vb = b[sortKey];
        if (sortKey === 'attendance') { va = Number(va); vb = Number(vb); }
        if (va < vb) return sortDir === 'asc' ? -1 : 1;
        if (va > vb) return sortDir === 'asc' ?  1 : -1;
        return 0;
      });
  }, [search, classF, sectionF, statusF, sortKey, sortDir]);

  const SortIcon = ({ col }) => sortKey === col
    ? (sortDir === 'asc' ? <ChevronUp className="w-3 h-3 inline ml-0.5" /> : <ChevronDown className="w-3 h-3 inline ml-0.5" />)
    : <ChevronDown className="w-3 h-3 inline ml-0.5 opacity-20" />;

  return (
    <div className="flex-1 overflow-y-auto bg-[#f4f7f6] theme-app-bg">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-teal-100 text-teal-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Student List</h1>
              <p className="text-sm text-gray-500">View and manage all assigned students</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setViewMode('table')} className={`p-2 border text-xs font-bold transition-colors ${viewMode === 'table' ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-gray-500 border-gray-200'}`}>Table</button>
            <button onClick={() => setViewMode('card')}  className={`p-2 border text-xs font-bold transition-colors ${viewMode === 'card'  ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-gray-500 border-gray-200'}`}>Card</button>
            <button className="p-2 border border-gray-200 bg-white text-gray-500 hover:bg-gray-50"><Download className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Students',  val: allStudents.length, icon: Users,     color: 'text-teal-500 bg-teal-50'   },
            { label: 'Active',          val: allStudents.filter(s => s.status === 'Active').length,   icon: UserCheck, color: 'text-green-500 bg-green-50'   },
            { label: 'Inactive',        val: allStudents.filter(s => s.status === 'Inactive').length, icon: UserX,    color: 'text-red-500 bg-red-50'       },
            { label: 'Avg Attendance',  val: Math.round(allStudents.reduce((a, s) => a + s.attendance, 0) / allStudents.length) + '%', icon: BookOpen, color: 'text-indigo-500 bg-indigo-50' },
          ].map(({ label, val, icon: Icon, color }) => (
            <div key={label} className="bg-white border border-gray-200 shadow-sm p-4 flex items-center gap-4">
              <div className={`w-11 h-11 flex items-center justify-center flex-shrink-0 ${color}`}><Icon className="w-5 h-5" /></div>
              <div>
                <p className="text-2xl font-black text-gray-800">{val}</p>
                <p className="text-xs text-gray-500 font-medium">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white border border-gray-200 shadow-sm px-5 py-4 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search by name, roll no or email..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300/40" />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-gray-400" />
            {[
              { label: 'Class', val: classF, set: setClassF, options: classes },
              { label: 'Section', val: sectionF, set: setSectionF, options: sections },
              { label: 'Status', val: statusF, set: setStatusF, options: statuses },
            ].map(({ label, val, set, options }) => (
              <select key={label} value={val} onChange={e => set(e.target.value)}
                className="border border-gray-200 px-3 py-2 text-sm focus:outline-none text-gray-600">
                {options.map(o => <option key={o} value={o}>{label}: {o}</option>)}
              </select>
            ))}
            <button onClick={() => { setSearch(''); setClassF('All'); setSectionF('All'); setStatusF('All'); }}
              className="text-xs text-gray-400 hover:text-red-500 border border-dashed border-gray-200 px-2 py-2 hover:border-red-300 transition-colors flex items-center gap-1">
              <X className="w-3 h-3" /> Clear
            </button>
          </div>
          <p className="text-xs text-gray-400 ml-auto font-semibold">{filtered.length} student(s) found</p>
        </div>

        {/* ===== TABLE VIEW ===== */}
        {viewMode === 'table' && (
          <div className="bg-white border border-gray-200 shadow-sm overflow-x-auto">
            <table className="w-full text-sm min-w-[900px]" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr className="bg-gray-50">
                  {[
                    { label: '#',          key: null },
                    { label: 'Student',    key: 'name' },
                    { label: 'Roll No.',   key: 'roll' },
                    { label: 'Class',      key: 'class' },
                    { label: 'Gender',     key: 'gender' },
                    { label: 'Phone',      key: null },
                    { label: 'Attendance', key: 'attendance' },
                    { label: 'Status',     key: 'status' },
                    { label: 'Actions',    key: null },
                  ].map(({ label, key }) => (
                    <th key={label}
                      onClick={() => key && toggleSort(key)}
                      className={`text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider border border-gray-200 ${key ? 'cursor-pointer hover:bg-gray-100 select-none' : ''}`}>
                      {label}{key && <SortIcon col={key} />}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => (
                  <tr key={s.id} className="hover:bg-teal-50/20 transition-colors">
                    <td className="px-4 py-3 border border-gray-200 text-gray-400 text-xs">{i + 1}</td>
                    <td className="px-4 py-3 border border-gray-200">
                      <div className="flex items-center gap-2.5">
                        <img src={s.photo} alt={s.name} className="w-8 h-8 rounded-full object-cover border border-gray-200 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">{s.name}</p>
                          <p className="text-[10px] text-gray-400">{s.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 border border-gray-200 text-teal-600 font-bold text-xs">{s.roll}</td>
                    <td className="px-4 py-3 border border-gray-200 text-gray-700 font-medium">Class {s.class} – {s.sec}</td>
                    <td className="px-4 py-3 border border-gray-200 text-gray-500">{s.gender}</td>
                    <td className="px-4 py-3 border border-gray-200 text-gray-600 text-xs">{s.phone}</td>
                    <td className="px-4 py-3 border border-gray-200"><AttBadge pct={s.attendance} /></td>
                    <td className="px-4 py-3 border border-gray-200">
                      <span className={`text-xs font-bold px-2 py-0.5 ${s.status === 'Active' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-600 border border-red-200'}`}>{s.status}</span>
                    </td>
                    <td className="px-4 py-3 border border-gray-200">
                      <button onClick={() => setView(s)} className="p-1.5 bg-teal-50 text-teal-600 border border-teal-200 hover:bg-teal-100 transition-colors"><Eye className="w-3.5 h-3.5" /></button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={9} className="text-center py-14 text-gray-400 border border-gray-200">
                    <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <p className="text-sm">No students match the current filters.</p>
                  </td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* ===== CARD VIEW ===== */}
        {viewMode === 'card' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map(s => (
              <div key={s.id} className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow group">
                <div className="bg-gradient-to-br from-teal-50 to-indigo-50 p-4 flex flex-col items-center border-b border-gray-100">
                  <img src={s.photo} alt={s.name} className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md mb-3" />
                  <p className="font-bold text-gray-800 text-sm text-center">{s.name}</p>
                  <p className="text-xs text-teal-600 font-bold">{s.roll}</p>
                </div>
                <div className="p-3 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Class</span>
                    <span className="font-semibold text-gray-700">{s.class} – {s.sec}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Attendance</span>
                    <AttBadge pct={s.attendance} />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status</span>
                    <span className={`font-bold ${s.status === 'Active' ? 'text-green-600' : 'text-red-500'}`}>{s.status}</span>
                  </div>
                </div>
                <div className="px-3 pb-3">
                  <button onClick={() => setView(s)} className="w-full bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 py-1.5 text-xs font-bold transition-colors flex items-center justify-center gap-1">
                    <Eye className="w-3.5 h-3.5" /> View Details
                  </button>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-5 text-center py-14 text-gray-400">
                <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">No students found.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ===== Student Detail Modal ===== */}
      {viewStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setView(null)}>
          <div className="bg-white w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-base font-bold text-gray-800">Student Profile</h2>
              <button onClick={() => setView(null)} className="p-1.5 hover:bg-gray-100 text-gray-500"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-6">
              {/* Top */}
              <div className="flex items-center gap-4 mb-5 pb-5 border-b border-gray-100">
                <img src={viewStudent.photo} alt={viewStudent.name} className="w-20 h-20 rounded-full object-cover border-2 border-teal-200 shadow-md" />
                <div>
                  <h3 className="text-lg font-black text-gray-800">{viewStudent.name}</h3>
                  <p className="text-sm text-teal-600 font-bold">{viewStudent.roll}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Class {viewStudent.class} – Section {viewStudent.sec}</p>
                  <span className={`text-xs font-bold px-2 py-0.5 mt-1 inline-block ${viewStudent.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>{viewStudent.status}</span>
                </div>
              </div>
              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  { label: 'Date of Birth', val: viewStudent.dob,    icon: Calendar    },
                  { label: 'Gender',        val: viewStudent.gender,  icon: Users       },
                  { label: 'Phone',         val: viewStudent.phone,   icon: Phone       },
                  { label: 'Email',         val: viewStudent.email,   icon: Mail        },
                  { label: 'Address',       val: viewStudent.address, icon: MapPin      },
                  { label: 'Attendance',    val: `${viewStudent.attendance}%`, icon: BookOpen },
                ].map(({ label, val, icon: Icon }) => (
                  <div key={label} className="bg-gray-50 border border-gray-100 p-3">
                    <p className="text-xs text-gray-400 flex items-center gap-1 mb-1"><Icon className="w-3 h-3" />{label}</p>
                    <p className="text-sm font-semibold text-gray-800 truncate">{val}</p>
                  </div>
                ))}
              </div>
              {/* Attendance bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Attendance Progress</span>
                  <span className="font-bold">{viewStudent.attendance}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${viewStudent.attendance >= 90 ? 'bg-green-400' : viewStudent.attendance >= 75 ? 'bg-yellow-400' : 'bg-red-400'}`}
                    style={{ width: `${viewStudent.attendance}%` }}></div>
                </div>
                <p className={`text-[10px] font-bold mt-1 ${viewStudent.attendance >= 90 ? 'text-green-600' : viewStudent.attendance >= 75 ? 'text-yellow-600' : 'text-red-500'}`}>
                  {viewStudent.attendance >= 90 ? 'Excellent' : viewStudent.attendance >= 75 ? 'Satisfactory' : 'Below Minimum (75%)'}
                </p>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex gap-2 justify-end">
              <button className="flex items-center gap-1.5 px-4 py-2 bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100 text-sm font-semibold transition-colors">
                <Mail className="w-4 h-4" /> Email
              </button>
              <button className="flex items-center gap-1.5 px-4 py-2 bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 text-sm font-semibold transition-colors">
                <Phone className="w-4 h-4" /> Call
              </button>
              <button onClick={() => setView(null)} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;
