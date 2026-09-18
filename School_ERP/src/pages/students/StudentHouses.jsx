import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Plus, Edit2, Trash2 } from 'lucide-react';

const StudentHouses = () => {
  const navigate = useNavigate();

  const [houses, setHouses] = useState([
    { id: 1, name: 'Yellow', students: 1 },
    { id: 2, name: 'Green', students: 1 },
    { id: 3, name: 'Blue', students: 1 },
    { id: 4, name: 'Red', students: 3 },
  ]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this house?')) {
      setHouses(houses.filter(h => h.id !== id));
    }
  };

  const handleEdit = (house) => {
    navigate('/students/houses/add', { state: { editData: house } });
  };

  return (
    <div className="p-6 h-full flex flex-col bg-gray-50 overflow-y-auto">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Student Houses</h1>
          <p className="text-sm text-gray-500 mt-1">Group students into houses for sports & activities</p>
        </div>
        <div>
          <button 
            onClick={() => navigate('/students/houses/add')}
            className="flex items-center gap-2 px-4 py-2 bg-[#5F52FF] text-white rounded-none font-semibold text-sm hover:bg-[#4E41E6] shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" /> Add New House
          </button>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-none shadow-sm border border-gray-200 flex flex-col flex-1 min-h-0">
        
        {/* Card Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
          <div className="font-bold text-[14px] text-gray-800 flex items-center gap-2">
            <Home className="w-4 h-4 text-[#5F52FF]" /> All Houses
          </div>
          <div className="text-xs font-semibold text-gray-500">
            {houses.length} houses
          </div>
        </div>

        {/* Table Area */}
        <div className="flex-1 overflow-auto bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8F7FF] border-b border-gray-200 text-[11px] font-bold text-[#5F52FF] uppercase tracking-wider">
                <th className="px-5 py-3 border-r border-gray-200 w-16 text-center">#</th>
                <th className="px-5 py-3 border-r border-gray-200">NAME</th>
                <th className="px-5 py-3 border-r border-gray-200">STUDENTS</th>
                <th className="px-5 py-3 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {houses.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-5 py-8 text-center text-gray-500">
                    No houses found.
                  </td>
                </tr>
              ) : (
                houses.map((house) => (
                  <tr key={house.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4 border-r border-gray-100 text-center text-gray-500 text-[13px]">{house.id}</td>
                    <td className="px-5 py-4 border-r border-gray-100 font-medium text-gray-800 text-[13px]">{house.name}</td>
                    <td className="px-5 py-4 border-r border-gray-100">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-none bg-[#EEEDFF] text-[#5F52FF] text-[11px] font-bold">
                        {house.students}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-3 text-gray-400">
                        <Edit2 
                          onClick={() => handleEdit(house)} 
                          className="w-4 h-4 hover:text-[#5F52FF] cursor-pointer transition-colors" 
                        />
                        <Trash2 
                          onClick={() => handleDelete(house.id)} 
                          className="w-4 h-4 hover:text-red-500 cursor-pointer transition-colors" 
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default StudentHouses;
