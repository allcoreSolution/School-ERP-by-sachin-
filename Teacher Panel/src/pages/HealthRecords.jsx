import React, { useState } from 'react';
import {
  Heart, Plus, Eye, Edit, Trash2, X,
  Activity, Thermometer, Droplet, Weight,
  AlertTriangle, CheckCircle, FileText, Calendar,
  User, Phone, MapPin, Pill, Stethoscope, Shield
} from 'lucide-react';

const healthRecords = [
  { id: 1, date: '01 Sep 2026', type: 'General Checkup', doctor: 'Dr. Meera Kapoor', hospital: 'City Medical Center', bp: '120/80', weight: '72 kg', temp: '98.6°F', sugar: '95 mg/dL', notes: 'Overall health is good. Continue regular exercise.', status: 'Normal' },
  { id: 2, date: '15 Aug 2026', type: 'Blood Test', doctor: 'Dr. Ramesh Shah', hospital: 'LifeCare Lab', bp: '—', weight: '72 kg', temp: '—', sugar: '102 mg/dL', notes: 'Haemoglobin slightly low. Iron supplements recommended.', status: 'Attention' },
  { id: 3, date: '10 Jul 2026', type: 'Eye Checkup', doctor: 'Dr. Priya Nair', hospital: 'Vision Plus Clinic', bp: '—', weight: '—', temp: '—', sugar: '—', notes: 'Power -1.25 (right), -1.00 (left). Glasses recommended.', status: 'Normal' },
  { id: 4, date: '20 Jun 2026', type: 'Dental Checkup', doctor: 'Dr. Arun Joshi', hospital: 'SmileCare Dental', bp: '—', weight: '—', temp: '—', sugar: '—', notes: 'Minor cavity in lower molar. Filling done.', status: 'Treated' },
];

const vaccinations = [
  { name: 'COVID-19 (Booster)', date: '15 Jan 2026', due: '—', status: 'Done' },
  { name: 'Hepatitis B', date: '10 Mar 2023', due: '—', status: 'Done' },
  { name: 'Influenza (Flu)', date: '01 Nov 2025', due: 'Nov 2026', status: 'Due Soon' },
  { name: 'Tetanus (TT)', date: '12 Feb 2021', due: 'Feb 2031', status: 'Done' },
];

const medications = [
  { name: 'Vitamin D3 1000IU', dosage: '1 tablet daily', since: '01 Sep 2026', until: 'Ongoing' },
  { name: 'Iron Supplement', dosage: '1 tablet daily (after meals)', since: '15 Aug 2026', until: '15 Nov 2026' },
];

const statusStyle = {
  Normal:    'bg-green-100 text-green-700 border border-green-200',
  Attention: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
  Treated:   'bg-blue-100 text-blue-600 border border-blue-200',
};
const vacStatus = {
  Done:     'bg-green-100 text-green-700',
  'Due Soon': 'bg-orange-100 text-orange-600',
  Overdue:  'bg-red-100 text-red-600',
};

const vitals = [
  { label: 'Blood Pressure', value: '120/80', unit: 'mmHg', icon: Activity, color: 'text-red-500 bg-red-50', ideal: 'Normal (< 120/80)' },
  { label: 'Blood Sugar', value: '95', unit: 'mg/dL', icon: Droplet, color: 'text-blue-500 bg-blue-50', ideal: 'Normal (70–99)' },
  { label: 'Weight', value: '72', unit: 'kg', icon: Weight, color: 'text-indigo-500 bg-indigo-50', ideal: 'BMI: 22.4 (Healthy)' },
  { label: 'Temperature', value: '98.6', unit: '°F', icon: Thermometer, color: 'text-orange-500 bg-orange-50', ideal: 'Normal (97–99°F)' },
];

const HealthRecords = () => {
  const [activeTab, setActiveTab] = useState('Records');
  const [showModal, setShowModal]   = useState(false);
  const [viewRecord, setViewRecord] = useState(null);
  const [form, setForm] = useState({ date: '', type: '', doctor: '', hospital: '', bp: '', weight: '', temp: '', sugar: '', notes: '' });

  const tabs = ['Records', 'Vitals', 'Vaccinations', 'Medications', 'Emergency Info'];

  return (
    <div className="flex-1 overflow-y-auto bg-[#f4f7f6] theme-app-bg">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-red-100 text-red-500 flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Health Records</h1>
              <p className="text-sm text-gray-500">Your complete medical history and health profile</p>
            </div>
          </div>
          {activeTab === 'Records' && (
            <button onClick={() => setShowModal(true)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 flex items-center gap-2 text-sm transition-colors">
              <Plus className="w-4 h-4" /> Add Record
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex items-center mt-4 overflow-x-auto">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${activeTab === tab ? 'text-red-500 border-red-500' : 'text-gray-500 border-transparent hover:text-gray-700'}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto space-y-6">

        {/* ===== RECORDS TAB ===== */}
        {activeTab === 'Records' && (
          <>
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Records', val: healthRecords.length, icon: FileText, color: 'text-indigo-500 bg-indigo-50' },
                { label: 'Normal', val: healthRecords.filter(r => r.status === 'Normal').length, icon: CheckCircle, color: 'text-green-500 bg-green-50' },
                { label: 'Needs Attention', val: healthRecords.filter(r => r.status === 'Attention').length, icon: AlertTriangle, color: 'text-yellow-500 bg-yellow-50' },
                { label: 'Treated', val: healthRecords.filter(r => r.status === 'Treated').length, icon: Shield, color: 'text-blue-500 bg-blue-50' },
              ].map(({ label, val, icon: Icon, color }) => (
                <div key={label} className="bg-white border border-gray-200 shadow-sm p-4 flex items-center gap-4">
                  <div className={`w-11 h-11 flex items-center justify-center flex-shrink-0 ${color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-gray-800">{val}</p>
                    <p className="text-xs text-gray-500 font-medium">{label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Records Table */}
            <div className="bg-white border border-gray-200 shadow-sm overflow-x-auto">
              <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="text-base font-bold text-gray-800">Medical Visit History</h2>
              </div>
              <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr className="bg-gray-50">
                    {['#', 'Date', 'Type', 'Doctor', 'Hospital', 'BP', 'Sugar', 'Status', 'Actions'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider border border-gray-200">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {healthRecords.map((r, i) => (
                    <tr key={r.id} className="hover:bg-red-50/20 transition-colors">
                      <td className="px-4 py-3 border border-gray-200 text-gray-500">{i + 1}</td>
                      <td className="px-4 py-3 border border-gray-200 text-gray-600 whitespace-nowrap">{r.date}</td>
                      <td className="px-4 py-3 border border-gray-200 font-semibold text-gray-800">{r.type}</td>
                      <td className="px-4 py-3 border border-gray-200 text-gray-600">{r.doctor}</td>
                      <td className="px-4 py-3 border border-gray-200 text-gray-500 text-xs">{r.hospital}</td>
                      <td className="px-4 py-3 border border-gray-200 text-gray-700 font-medium">{r.bp}</td>
                      <td className="px-4 py-3 border border-gray-200 text-gray-700">{r.sugar}</td>
                      <td className="px-4 py-3 border border-gray-200">
                        <span className={`text-xs font-bold px-2 py-0.5 ${statusStyle[r.status]}`}>{r.status}</span>
                      </td>
                      <td className="px-4 py-3 border border-gray-200">
                        <div className="flex gap-1">
                          <button onClick={() => setViewRecord(r)} className="p-1.5 bg-blue-50 text-blue-500 border border-blue-200 hover:bg-blue-100"><Eye className="w-3.5 h-3.5" /></button>
                          <button className="p-1.5 bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100"><Edit className="w-3.5 h-3.5" /></button>
                          <button className="p-1.5 bg-red-50 text-red-400 border border-red-100 hover:bg-red-100"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ===== VITALS TAB ===== */}
        {activeTab === 'Vitals' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {vitals.map(({ label, value, unit, icon: Icon, color, ideal }) => (
                <div key={label} className="bg-white border border-gray-200 shadow-sm p-5 text-center">
                  <div className={`w-14 h-14 mx-auto flex items-center justify-center mb-3 ${color}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <p className="text-3xl font-black text-gray-800">{value}</p>
                  <p className="text-sm text-gray-500 font-medium mt-0.5">{unit}</p>
                  <p className="text-xs text-gray-400 mt-2 font-semibold">{label}</p>
                  <p className="text-[10px] text-green-600 font-bold mt-1 uppercase tracking-wider">{ideal}</p>
                </div>
              ))}
            </div>

            <div className="bg-white border border-gray-200 shadow-sm p-5">
              <h3 className="text-sm font-bold text-gray-700 mb-4">Vitals Trend (Last 4 Checkups)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
                  <thead>
                    <tr className="bg-gray-50">
                      {['Date', 'Blood Pressure', 'Sugar', 'Weight', 'Temp', 'Remarks'].map(h => (
                        <th key={h} className="text-left px-4 py-2.5 text-xs font-bold text-gray-500 uppercase border border-gray-200">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {healthRecords.map(r => (
                      <tr key={r.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 border border-gray-200 text-gray-600 whitespace-nowrap">{r.date}</td>
                        <td className="px-4 py-3 border border-gray-200 font-medium text-gray-800">{r.bp}</td>
                        <td className="px-4 py-3 border border-gray-200 text-gray-700">{r.sugar}</td>
                        <td className="px-4 py-3 border border-gray-200 text-gray-700">{r.weight}</td>
                        <td className="px-4 py-3 border border-gray-200 text-gray-700">{r.temp}</td>
                        <td className="px-4 py-3 border border-gray-200">
                          <span className={`text-xs font-bold px-2 py-0.5 ${statusStyle[r.status] || ''}`}>{r.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ===== VACCINATIONS TAB ===== */}
        {activeTab === 'Vaccinations' && (
          <div className="bg-white border border-gray-200 shadow-sm overflow-x-auto">
            <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-base font-bold text-gray-800">Vaccination Record</h2>
              <button className="bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 flex items-center gap-1 transition-colors">
                <Plus className="w-3.5 h-3.5" /> Add Vaccine
              </button>
            </div>
            <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr className="bg-gray-50">
                  {['#', 'Vaccine Name', 'Date Taken', 'Next Due', 'Status'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase border border-gray-200">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {vaccinations.map((v, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-3 border border-gray-200 text-gray-500">{i + 1}</td>
                    <td className="px-4 py-3 border border-gray-200 font-semibold text-gray-800">{v.name}</td>
                    <td className="px-4 py-3 border border-gray-200 text-gray-600">{v.date}</td>
                    <td className="px-4 py-3 border border-gray-200 text-gray-500">{v.due}</td>
                    <td className="px-4 py-3 border border-gray-200">
                      <span className={`text-xs font-bold px-2 py-0.5 ${vacStatus[v.status]}`}>{v.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ===== MEDICATIONS TAB ===== */}
        {activeTab === 'Medications' && (
          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 px-4 py-3 flex items-start gap-2 text-sm text-yellow-800">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>Always inform the school nurse / admin about any ongoing medications that may affect your duties.</span>
            </div>
            <div className="bg-white border border-gray-200 shadow-sm overflow-x-auto">
              <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-base font-bold text-gray-800 flex items-center gap-2"><Pill className="w-4 h-4 text-indigo-500" /> Current Medications</h2>
                <button className="bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> Add</button>
              </div>
              <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr className="bg-gray-50">
                    {['#', 'Medicine Name', 'Dosage', 'Since', 'Until'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase border border-gray-200">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {medications.map((m, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-3 border border-gray-200 text-gray-500">{i + 1}</td>
                      <td className="px-4 py-3 border border-gray-200 font-semibold text-gray-800 flex items-center gap-2"><Pill className="w-4 h-4 text-indigo-400" />{m.name}</td>
                      <td className="px-4 py-3 border border-gray-200 text-gray-600">{m.dosage}</td>
                      <td className="px-4 py-3 border border-gray-200 text-gray-500">{m.since}</td>
                      <td className="px-4 py-3 border border-gray-200">
                        <span className={`text-xs font-bold px-2 py-0.5 ${m.until === 'Ongoing' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-600'}`}>{m.until}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===== EMERGENCY INFO TAB ===== */}
        {activeTab === 'Emergency Info' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Health Info */}
            <div className="bg-white border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
                <Stethoscope className="w-4 h-4 text-red-500" />
                <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Medical Profile</h2>
              </div>
              <div className="p-5 space-y-3 text-sm">
                {[
                  { label: 'Blood Group', value: 'B+' },
                  { label: 'Known Allergies', value: 'None' },
                  { label: 'Chronic Conditions', value: 'None' },
                  { label: 'Previous Surgeries', value: 'None' },
                  { label: 'Disability (if any)', value: 'None' },
                  { label: 'Health Insurance', value: 'Star Health — #SH-20261234' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <span className="text-gray-500 font-medium">{label}</span>
                    <span className="text-gray-800 font-semibold">{value}</span>
                  </div>
                ))}
                <button className="w-full mt-2 border border-dashed border-gray-300 text-gray-400 hover:border-indigo-400 hover:text-indigo-500 py-2 text-xs font-semibold transition-colors flex items-center justify-center gap-1">
                  <Edit className="w-3.5 h-3.5" /> Edit Medical Profile
                </button>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-white border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
                <Phone className="w-4 h-4 text-red-500" />
                <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Emergency Contacts</h2>
              </div>
              <div className="p-5 space-y-4">
                {[
                  { name: 'Sunita Sharma', rel: 'Spouse', phone: '+91 98765 12345', address: '123, Civil Lines, Delhi' },
                  { name: 'Ramesh Sharma', rel: 'Father', phone: '+91 91234 56789', address: '456, Model Town, Delhi' },
                ].map((c, i) => (
                  <div key={i} className="border border-gray-100 bg-gray-50 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-red-100 text-red-500 flex items-center justify-center">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">{c.name}</p>
                        <p className="text-xs text-gray-400">{c.rel}</p>
                      </div>
                    </div>
                    <div className="space-y-1 text-xs text-gray-600">
                      <p className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-gray-400" />{c.phone}</p>
                      <p className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-gray-400" />{c.address}</p>
                    </div>
                  </div>
                ))}
                <button className="w-full border border-dashed border-gray-300 text-gray-400 hover:border-red-400 hover:text-red-500 py-2 text-xs font-semibold transition-colors flex items-center justify-center gap-1">
                  <Plus className="w-3.5 h-3.5" /> Add Emergency Contact
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ===== Add Record Modal ===== */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto" onClick={() => setShowModal(false)}>
          <div className="bg-white w-full max-w-lg shadow-2xl my-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" /> Add Health Record
              </h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 hover:bg-gray-100 text-gray-500"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Date *</label>
                  <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
                    className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Visit Type *</label>
                  <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
                    className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none">
                    {['General Checkup', 'Blood Test', 'Eye Checkup', 'Dental', 'Cardiology', 'Physiotherapy', 'Other'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Doctor Name', key: 'doctor', placeholder: 'Dr. Name' },
                  { label: 'Hospital / Lab', key: 'hospital', placeholder: 'Hospital name' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">{f.label}</label>
                    <input type="text" placeholder={f.placeholder} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                      className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none" />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Blood Pressure', key: 'bp', placeholder: '120/80' },
                  { label: 'Blood Sugar', key: 'sugar', placeholder: '95 mg/dL' },
                  { label: 'Weight', key: 'weight', placeholder: '72 kg' },
                  { label: 'Temperature', key: 'temp', placeholder: '98.6°F' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">{f.label}</label>
                    <input type="text" placeholder={f.placeholder} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                      className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none" />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Doctor's Notes</label>
                <textarea rows={3} placeholder="Notes from the visit..." value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })}
                  className="w-full border border-gray-200 px-3 py-2 text-sm resize-none focus:outline-none" />
              </div>
            </div>
            <div className="flex gap-3 px-6 py-4 border-t border-gray-100">
              <button onClick={() => setShowModal(false)} className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 text-sm transition-colors">Save Record</button>
              <button onClick={() => setShowModal(false)} className="px-5 border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ===== View Record Modal ===== */}
      {viewRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setViewRecord(null)}>
          <div className="bg-white w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-base font-bold text-gray-800">Record Details</h2>
              <button onClick={() => setViewRecord(null)} className="p-1.5 hover:bg-gray-100 text-gray-500"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{viewRecord.type}</h3>
                  <p className="text-sm text-gray-500">{viewRecord.date}</p>
                </div>
                <span className={`text-xs font-bold px-2 py-1 ${statusStyle[viewRecord.status]}`}>{viewRecord.status}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  { label: 'Doctor', val: viewRecord.doctor },
                  { label: 'Hospital', val: viewRecord.hospital },
                  { label: 'Blood Pressure', val: viewRecord.bp },
                  { label: 'Blood Sugar', val: viewRecord.sugar },
                  { label: 'Weight', val: viewRecord.weight },
                  { label: 'Temperature', val: viewRecord.temp },
                ].map(({ label, val }) => (
                  <div key={label} className="bg-gray-50 border border-gray-100 p-3">
                    <p className="text-xs text-gray-400 font-semibold mb-1">{label}</p>
                    <p className="text-sm font-semibold text-gray-800">{val || 'N/A'}</p>
                  </div>
                ))}
              </div>
              <div className="bg-gray-50 border border-gray-100 p-4">
                <p className="text-xs text-gray-400 font-semibold mb-2">DOCTOR'S NOTES</p>
                <p className="text-sm text-gray-700 leading-relaxed">{viewRecord.notes}</p>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
              <button onClick={() => setViewRecord(null)} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2 text-sm font-semibold">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthRecords;
