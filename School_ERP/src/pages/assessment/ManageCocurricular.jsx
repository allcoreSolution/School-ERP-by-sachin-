import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ManageCocurricular() {
  const navigate = useNavigate();
  
  const [areas, setAreas] = useState([
    { id: 1, name: 'Activity', classes: ['Nursery', 'KG', 'Class I', 'Class II', 'Class III', 'Class IV', 'Class V', 'Class VI', 'Class IX', 'Class XII'] },
    { id: 2, name: 'General Knowledge', classes: ['Nursery', 'KG', 'Class I', 'Class II', 'Class III', 'Class IV', 'Class V', 'Class VI', 'Class VII', 'Class VIII', 'Class IX', 'Class X', 'Class XI', 'Class XII'] },
    { id: 3, name: 'Value Education', classes: ['Nursery', 'KG', 'Class I', 'Class II', 'Class III', 'Class V', 'Class VI', 'Class VII', 'Class VIII', 'Class IX', 'Class X', 'Class XI', 'Class XII'] },
    { id: 4, name: 'Activity', classes: ['Class 11 science'] },
    { id: 5, name: 'English', classes: ['Class I', 'Class II', 'Class III', 'Class IV', 'Class V', 'Class VI', 'Class VII', 'Class VIII', 'Class IX', 'Class X', 'Class XI', 'Class XII'] },
  ]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this cocurricular area?')) {
      setAreas(areas.filter(a => a.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6f9] font-sans pb-10">
      <div className="bg-white p-6 border-b border-slate-200">
        <h1 className="text-xl font-bold text-slate-800">Manage Cocurricular Areas</h1>
      </div>

      <div className="p-6 max-w-[1400px] mx-auto">
        <div className="bg-white border border-slate-200 rounded-none shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200 flex justify-between items-center">
            <h2 className="text-sm font-bold text-slate-700">Activity & Skill Areas</h2>
            <button 
              onClick={() => navigate('/offline-exams/cocurricular-areas/add')}
              className="px-4 py-2 bg-[#fd7e14] hover:bg-[#e86e10] text-white font-bold text-xs rounded-none shadow-sm transition-colors cursor-pointer border-none"
            >
              Add New Area
            </button>
          </div>

          <div className="p-4 overflow-x-auto">
            <table className="w-full text-left border-collapse border border-slate-200">
              <thead>
                <tr className="bg-[#17a2b8] text-white text-[12px] font-bold tracking-wider">
                  <th className="py-2.5 px-4 border-r border-[#138496] w-12 text-center">#</th>
                  <th className="py-2.5 px-4 border-r border-[#138496] w-[20%]">Area Name</th>
                  <th className="py-2.5 px-4 border-r border-[#138496]">Assigned Classes</th>
                  <th className="py-2.5 px-4 w-[15%]">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-700">
                {areas.map((area, index) => (
                  <tr key={area.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 border-r border-slate-200 text-center">{index + 1}</td>
                    <td className="py-3 px-4 border-r border-slate-200">{area.name}</td>
                    <td className="py-3 px-4 border-r border-slate-200">
                      <div className="flex flex-wrap gap-1.5">
                        {area.classes.map((cls, idx) => (
                          <span key={idx} className="bg-[#007bff] text-white text-[11px] font-bold px-2 py-0.5 rounded">
                            {cls}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => navigate('/offline-exams/cocurricular-areas/edit')}
                          className="px-3 py-1 bg-[#17a2b8] hover:bg-[#138496] text-white text-xs rounded-none cursor-pointer border-none"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(area.id)}
                          className="px-3 py-1 bg-[#dc3545] hover:bg-[#c82333] text-white text-xs rounded-none cursor-pointer border-none"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {areas.length === 0 && (
                  <tr>
                    <td colSpan="4" className="py-6 text-center text-slate-500">No Cocurricular Areas found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
