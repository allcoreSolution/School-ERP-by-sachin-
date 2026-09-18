import React, { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  Plus, 
  Building, 
  DoorOpen, 
  Bed, 
  CheckCircle, 
  Eye, 
  Trash2,
  Filter, 
  X, 
  Check, 
  Info,
  Calendar,
  User,
  Sliders,
  DollarSign
} from "lucide-react";
import { hostelService } from "../../api/hostelService";

// Mock Room Status List matching Screenshot
const INITIAL_ROOMS_STATUS = [
  { id: 1, hostel: "ABC Hostel", roomNo: "1", type: "AC", capacity: "5/50", capacityNum: 50, occupiedNum: 5, status: "Partially Available" },
  { id: 2, hostel: "ABC Hostel", roomNo: "2", type: "AC", capacity: "1/50", capacityNum: 50, occupiedNum: 1, status: "Partially Available" },
  { id: 3, hostel: "ganesh", roomNo: "103", type: "Non-AC", capacity: "0/5", capacityNum: 5, occupiedNum: 0, status: "Vacant" },
  { id: 4, hostel: "ganesh", roomNo: "1", type: "Non-AC", capacity: "0/1", capacityNum: 1, occupiedNum: 0, status: "Vacant" },
  { id: 5, hostel: "ganesh", roomNo: "2", type: "Non-AC", capacity: "0/3", capacityNum: 3, occupiedNum: 0, status: "Vacant" },
  { id: 6, hostel: "ABC Hostel", roomNo: "123", type: "Non-AC", capacity: "0/5", capacityNum: 5, occupiedNum: 0, status: "Vacant" },
  { id: 7, hostel: "ABC Hostel", roomNo: "12", type: "Non-AC", capacity: "0/2", capacityNum: 2, occupiedNum: 0, status: "Vacant" }
];

// Mock Recent Allocations list matching Screenshot
const RECENT_ALLOCATIONS_DATA = [
  { id: 1, name: "Krish Yadav", details: "1 • AC", date: "Allocated 1 week ago" },
  { id: 2, name: "Dev Rajput", details: "1 • AC", date: "Allocated 2 weeks ago" },
  { id: 3, name: "Rohan Reddy", details: "1 • AC", date: "Allocated 2 weeks ago" },
  { id: 4, name: "Kiara Soni", details: "2 • AC", date: "Allocated 3 weeks ago" }
];

export default function HostelDashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const getTabFromPath = (path) => {
    switch (path) {
      case "/hostel/student-allocation":
        return "Student Allocation";
      case "/hostel/manage-rooms":
        return "Manage Rooms";
      case "/hostel/room-types":
        return "Room Types";
      case "/hostel/manage-hostels":
        return "Manage Hostels";
      case "/hostel/dashboard":
      default:
        return "Dashboard";
    }
  };

  const getPathFromTab = (tabName) => {
    switch (tabName) {
      case "Student Allocation":
        return "/hostel/student-allocation";
      case "Manage Rooms":
        return "/hostel/manage-rooms";
      case "Room Types":
        return "/hostel/room-types";
      case "Manage Hostels":
        return "/hostel/manage-hostels";
      case "Guide":
        return "/hostel/dashboard";
      case "Dashboard":
      default:
        return "/hostel/dashboard";
    }
  };

  const [activeTab, setActiveTab] = useState(() => getTabFromPath(location.pathname));

  useEffect(() => {
    setActiveTab(getTabFromPath(location.pathname));
  }, [location.pathname]);

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const res = await hostelService.getHostels();
        if (res?.data) {
          const mapped = res.data.map(h => ({
            id: h._id,
            name: h.hostelName,
            type: h.type || 'Combined',
            roomsCount: 0,
            address: h.address || h.description || '—'
          }));
          setHostels(mapped.length ? mapped : hostels);
        }
      } catch (err) {
        console.error("Failed to load hostels", err);
      }
    };
    fetchHostels();
  }, []);
  const [rooms, setRooms] = useState(INITIAL_ROOMS_STATUS);
  const [showAddRoomModal, setShowAddRoomModal] = useState(false);

  // Student Allocations State (Screenshot 1)
  const [allocations, setAllocations] = useState({
    room1: ["Kabir Singh", "Kiara Soni", "Dev Rajput", "Rohan Reddy", "Krish Yadav"],
    room2: ["Yug Nair"],
    room3: []
  });
  const [showAllocateModal, setShowAllocateModal] = useState(null); // "room1", "room2", "room3"
  const [allocateStudentName, setAllocateStudentName] = useState("");

  // Room Types State (Screenshot 2 & 3)
  const [roomTypes, setRoomTypes] = useState([
    { id: 1, name: "AC", fare: 5000, desc: "—" },
    { id: 2, name: "ganesh", fare: 20000, desc: "asdfghjnmbcb vb" },
    { id: 3, name: "Non AC", fare: 2000, desc: "—" }
  ]);
  const [showAddTypeModal, setShowAddTypeModal] = useState(false);
  const [typeName, setTypeName] = useState("");
  const [typeFare, setTypeFare] = useState("");
  const [typeDesc, setTypeDesc] = useState("");

  // Hostels State (Screenshot 4 & 5)
  const [hostels, setHostels] = useState([
    { id: 1, name: "ABC Hostel", type: "Combined", roomsCount: 3, address: "TEST address" },
    { id: 2, name: "ganesh", type: "Boys", roomsCount: 0, address: "789 Pine Rd" }
  ]);
  const [hostelViewMode, setHostelViewMode] = useState("list"); // "list" or "add"
  const [newHostelName, setNewHostelName] = useState("");
  const [newHostelType, setNewHostelType] = useState("For Boys");
  const [newHostelAddress, setNewHostelAddress] = useState("");
  const [newHostelNote, setNewHostelNote] = useState("");

  // Add Room form state variables
  const [roomNumber, setRoomNumber] = useState("");
  const [hostelName, setHostelName] = useState("ABC Hostel");
  const [roomType, setRoomType] = useState("AC");
  const [bedCapacity, setBedCapacity] = useState(4);
  const [roomRent, setRoomRent] = useState(5000);

  // Success toast alerts
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  // Calculate stats values dynamically based on rooms list state
  const stats = useMemo(() => {
    const totalRooms = rooms.length;
    const occupiedBeds = rooms.reduce((acc, r) => acc + r.occupiedNum, 0);
    const totalBeds = rooms.reduce((acc, r) => acc + r.capacityNum, 0);
    const availableBeds = totalBeds - occupiedBeds;

    return {
      hostelsCount: hostels.length,
      roomsCount: totalRooms,
      occupiedBeds: occupiedBeds,
      availableBeds: availableBeds
    };
  }, [rooms]);

  // Click handler for "+ Add Room" button
  const handleAddRoomClick = () => {
    // 1. Move/Navigate to Manage Rooms tab
    setActiveTab("Manage Rooms");
    navigate("/hostel/manage-rooms");
    // 2. Open modal popup
    setShowAddRoomModal(true);
  };

  // Submit Handler for Add Room Form
  const handleAddRoomSubmit = (e) => {
    e.preventDefault();
    if (roomNumber.trim() === "") return;

    const newRoom = {
      id: Date.now(),
      hostel: hostelName,
      roomNo: roomNumber,
      type: roomType,
      capacity: `0/${bedCapacity}`,
      capacityNum: parseInt(bedCapacity) || 1,
      occupiedNum: 0,
      status: "Vacant"
    };

    setRooms(prev => [newRoom, ...prev]);
    setShowAddRoomModal(false);
    
    // Clear inputs
    setRoomNumber("");
    setHostelName("ABC Hostel");
    setRoomType("AC");
    setBedCapacity(4);
    setRoomRent(5000);

    // Toast alert popup
    setToastMsg(`Room ${roomNumber} added under ${hostelName} successfully!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Student Allocation actions
  const handleDeallocate = (roomKey, studentName) => {
    if (confirm(`Are you sure you want to de-allocate ${studentName}?`)) {
      setAllocations(prev => ({
        ...prev,
        [roomKey]: prev[roomKey].filter(name => name !== studentName)
      }));

      // Update occupancy metric in rooms status table
      setRooms(prev => prev.map(r => {
        const matchNo = roomKey === "room1" ? "1" : roomKey === "room2" ? "2" : "103";
        if (r.roomNo === matchNo && r.hostel === "ABC Hostel") {
          const newOccupied = Math.max(0, r.occupiedNum - 1);
          return {
            ...r,
            occupiedNum: newOccupied,
            capacity: `${newOccupied}/${r.capacityNum}`,
            status: newOccupied === 0 ? "Vacant" : "Partially Available"
          };
        }
        return r;
      }));

      setToastMsg(`De-allocated ${studentName} successfully.`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleAllocateSubmit = (e) => {
    e.preventDefault();
    if (!showAllocateModal || allocateStudentName.trim() === "") return;

    setAllocations(prev => ({
      ...prev,
      [showAllocateModal]: [...prev[showAllocateModal], allocateStudentName]
    }));

    // Update occupancy metrics inside Rooms table
    setRooms(prev => prev.map(r => {
      const matchNo = showAllocateModal === "room1" ? "1" : showAllocateModal === "room2" ? "2" : "103";
      if (r.roomNo === matchNo && r.hostel === "ABC Hostel") {
        const newOccupied = r.occupiedNum + 1;
        return {
          ...r,
          occupiedNum: newOccupied,
          capacity: `${newOccupied}/${r.capacityNum}`,
          status: newOccupied === r.capacityNum ? "Fully Occupied" : "Partially Available"
        };
      }
      return r;
    }));

    setToastMsg(`Allocated student "${allocateStudentName}" successfully!`);
    setShowAllocateModal(null);
    setAllocateStudentName("");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Add Room Type action
  const handleAddTypeSubmit = (e) => {
    e.preventDefault();
    if (typeName.trim() === "") return;

    const newType = {
      id: Date.now(),
      name: typeName,
      fare: parseFloat(typeFare) || 0,
      desc: typeDesc.trim() || "—"
    };

    setRoomTypes(prev => [...prev, newType]);
    setShowAddTypeModal(false);
    setTypeName("");
    setTypeFare("");
    setTypeDesc("");

    setToastMsg(`Room type "${typeName}" created successfully!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Delete Room Type
  const handleDeleteType = (id, name) => {
    if (confirm(`Delete room type "${name}"?`)) {
      setRoomTypes(prev => prev.filter(t => t.id !== id));
      setToastMsg(`Room type "${name}" deleted.`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  // Add Hostel action
  const handleAddHostelSubmit = async (e) => {
    e.preventDefault();
    if (newHostelName.trim() === "") return;

    try {
      const created = await hostelService.createHostel({
        hostelName: newHostelName,
        type: newHostelType.replace("For ", ""),
        description: newHostelAddress.trim() || "—"
      });
      const newHostel = {
        id: created.data?._id || Date.now(),
        name: created.data?.hostelName || newHostelName,
        type: created.data?.type || newHostelType.replace("For ", ""),
        roomsCount: 0,
        address: created.data?.description || newHostelAddress.trim() || "—"
      };

      setHostels(prev => [...prev, newHostel]);
      setHostelViewMode("list");
      setNewHostelName("");
      setNewHostelType("For Boys");
      setNewHostelAddress("");
      setNewHostelNote("");

      setToastMsg(`Hostel building "${newHostelName}" registered successfully!`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error(err);
      alert('Error creating hostel.');
    }
  };



  // Delete Hostel
  const handleDeleteHostel = async (id, name) => {
    if (confirm(`Delete hostel building "${name}"?`)) {
      try {
        await hostelService.deleteHostel(id);
      } catch (err) {
        console.error("Error deleting hostel", err);
      }
      setHostels(prev => prev.filter(h => h.id !== id));
      setToastMsg(`Hostel "${name}" deleted.`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };


  return (
    <div className="p-6 max-w-7xl mx-auto space-y-5 font-sans text-gray-800 relative">
      
      {/* Success Toast popups */}
      {showToast && (
        <div className="fixed top-20 right-6 bg-slate-900 text-white px-4 py-3 rounded-none shadow-lg flex items-center gap-2 border border-slate-700/50 animate-bounce z-50 text-xs">
          <Check className="w-4 h-4 text-emerald-450" />
          <span className="font-bold">{toastMsg}</span>
        </div>
      )}

      {/* RENDER ADD ROOM OVERLAY MODAL */}
      {showAddRoomModal && activeTab === "Manage Rooms" && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white text-gray-850 rounded-none p-5 shadow-xl max-w-md w-full space-y-4 border border-slate-200">
            
            <div className="border-b pb-2.5 flex justify-between items-center">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-550 flex items-center gap-1.5">
                <DoorOpen className="w-4 h-4 text-orange-500" />
                Add New Room
              </h3>
              <button 
                onClick={() => setShowAddRoomModal(false)}
                className="text-slate-400 hover:text-slate-650 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddRoomSubmit} className="space-y-4 text-xs font-semibold">
              
              {/* Room Number */}
              <div className="space-y-1">
                <label className="text-slate-600 block">Room Number *</label>
                <input 
                  type="text" 
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                  className="w-full px-3 py-2 border rounded-none focus:outline-none focus:border-orange-500 bg-white"
                  placeholder="e.g. 104"
                  required
                />
              </div>

              {/* Double column rows */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Hostel Selector */}
                <div className="space-y-1">
                  <label className="text-slate-600 block">Select Hostel</label>
                  <select 
                    value={hostelName}
                    onChange={(e) => setHostelName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-none focus:outline-none focus:border-orange-500 bg-white cursor-pointer"
                  >
                    <option value="ABC Hostel">ABC Hostel</option>
                    <option value="ganesh">ganesh</option>
                  </select>
                </div>

                {/* Room Type */}
                <div className="space-y-1">
                  <label className="text-slate-600 block">Room Type</label>
                  <select 
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="w-full px-3 py-2 border rounded-none focus:outline-none focus:border-orange-500 bg-white cursor-pointer"
                  >
                    <option value="AC">AC</option>
                    <option value="Non-AC">Non-AC</option>
                  </select>
                </div>

              </div>

              {/* Double column rows 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Beds capacity */}
                <div className="space-y-1">
                  <label className="text-slate-600 block">Total Beds *</label>
                  <input 
                    type="number" 
                    value={bedCapacity}
                    onChange={(e) => setBedCapacity(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 border rounded-none focus:outline-none focus:border-orange-500 bg-white"
                    min="1"
                    required
                  />
                </div>

                {/* Monthly Rent */}
                <div className="space-y-1">
                  <label className="text-slate-600 block">Monthly Rent (₹) *</label>
                  <input 
                    type="number" 
                    value={roomRent}
                    onChange={(e) => setRoomRent(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border rounded-none focus:outline-none focus:border-orange-500 bg-white"
                    min="0"
                    required
                  />
                </div>

              </div>

              {/* Form buttons */}
              <div className="flex justify-end gap-2 pt-2 border-t">
                <button 
                  type="button" 
                  onClick={() => setShowAddRoomModal(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-100 rounded-none font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 bg-orange-550 hover:bg-orange-600 text-white rounded-none font-bold cursor-pointer"
                >
                  Create Room
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Title Row */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Hostel Management</h1>
          <p className="text-slate-500 text-sm">Live overview of all hostel accommodation inventory and allocations.</p>
        </div>
        
        {/* Top Right Orange button */}
        <button
          onClick={handleAddRoomClick}
          className="px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-none flex items-center gap-1.5 shadow-md cursor-pointer select-none active:scale-95 border-none"
        >
          <Plus className="w-4 h-4 text-white" />
          Add Room
        </button>
      </div>

      {/* Navigation horizontal tabs row */}
      <div className="flex flex-wrap gap-5 border-b border-slate-200">
        {["Dashboard", "Guide", "Student Allocation", "Manage Rooms", "Room Types", "Manage Hostels"].map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                navigate(getPathFromTab(tab));
              }}
              className={`py-3.5 px-1 font-bold text-xs relative cursor-pointer whitespace-nowrap transition-all ${
                isActive 
                  ? "text-indigo-650 border-b-2 border-indigo-600" 
                  : "text-slate-500 hover:text-indigo-600"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* TAB PANEL 1: DASHBOARD */}
      {activeTab === "Dashboard" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Stat metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* Total Hostels card */}
            <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs flex items-center gap-4">
              <div className="w-11 h-11 rounded-none bg-indigo-50 flex items-center justify-center text-indigo-600">
                <Building className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Total Hostels</span>
                <span className="text-2xl font-bold text-slate-800">{stats.hostelsCount}</span>
              </div>
            </div>

            {/* Total Rooms card */}
            <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs flex items-center gap-4">
              <div className="w-11 h-11 rounded-none bg-yellow-50 flex items-center justify-center text-yellow-600">
                <DoorOpen className="w-5 h-5 text-yellow-650" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Total Rooms</span>
                <span className="text-2xl font-bold text-slate-800">{stats.roomsCount}</span>
              </div>
            </div>

            {/* Occupied Beds card */}
            <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs flex items-center gap-4">
              <div className="w-11 h-11 rounded-none bg-red-50 flex items-center justify-center text-red-650">
                <Bed className="w-5 h-5 text-red-650" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Occupied Beds</span>
                <span className="text-2xl font-bold text-slate-800">{stats.occupiedBeds}</span>
              </div>
            </div>

            {/* Available Beds card */}
            <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs flex items-center gap-4">
              <div className="w-11 h-11 rounded-none bg-purple-50 flex items-center justify-center text-purple-650">
                <CheckCircle className="w-5 h-5 text-purple-650" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Available Beds</span>
                <span className="text-2xl font-bold text-slate-800">{stats.availableBeds}</span>
              </div>
            </div>

          </div>

          {/* Main Content Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
            
            {/* Left side: Room Status panel */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-none overflow-hidden shadow-3xs">
              
              {/* Header inside container */}
              <div className="px-5 py-4 border-b flex flex-wrap justify-between items-center bg-slate-50/20 gap-3">
                <div>
                  <h3 className="font-bold text-slate-850 text-sm">Room Status</h3>
                  <p className="text-[10px] text-slate-450 font-semibold">Live overview of all hostel accommodation inventory</p>
                </div>
                
                {/* Actions row inside container header */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => alert("Filters applied...")}
                    className="px-3.5 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-650 font-bold text-[10px] rounded-none flex items-center gap-1 cursor-pointer select-none"
                  >
                    <Filter className="w-3.5 h-3.5 text-slate-500" />
                    Filter
                  </button>
                  <button 
                    onClick={handleAddRoomClick}
                    className="px-3.5 py-1.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-[10px] rounded-none flex items-center gap-1 cursor-pointer select-none border-none active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5 text-white" />
                    Add Room
                  </button>
                </div>
              </div>

              {/* Room Status Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-200 text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider">
                      <th className="py-3 px-5 border-r border-slate-200">Hostel Name</th>
                      <th className="py-3 px-5 border-r border-slate-200">Room No.</th>
                      <th className="py-3 px-5 border-r border-slate-200">Room Type</th>
                      <th className="py-3 px-5 border-r border-slate-200">Capacity</th>
                      <th className="py-3 px-5 border-r border-slate-200">Status</th>
                      <th className="py-3 px-5 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs text-slate-650 font-semibold">
                    {rooms.map((room) => (
                      <tr key={room.id} className="hover:bg-slate-50/10 transition-colors">
                        <td className="py-3 px-5 border-r border-slate-100 font-bold text-slate-800">{room.hostel}</td>
                        <td className="py-3 px-5 border-r border-slate-100 font-bold text-slate-700">{room.roomNo}</td>
                        <td className="py-3 px-5 border-r border-slate-100">
                          <span className={`inline-block px-2 py-0.5 rounded-none text-[10px] font-extrabold border ${
                            room.type === "AC" 
                              ? "bg-blue-50 text-blue-650 border-blue-100/50" 
                              : "bg-slate-100 text-slate-500 border-slate-200"
                          }`}>
                            {room.type}
                          </span>
                        </td>
                        <td className="py-3 px-5 border-r border-slate-100 text-slate-600 font-mono">{room.capacity}</td>
                        <td className="py-3 px-5 border-r border-slate-100">
                          <span className={`inline-block px-2.5 py-0.5 text-[9px] font-extrabold rounded-none border ${
                            room.status === "Vacant" 
                              ? "bg-emerald-50 text-emerald-600 border-emerald-100/50" 
                              : "bg-orange-50 text-orange-600 border-orange-100/50"
                          }`}>
                            {room.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-5 text-center">
                          <button 
                            onClick={() => alert(`Showing room details for room ${room.roomNo}...`)}
                            className="p-1 hover:bg-slate-50 text-slate-400 hover:text-indigo-650 rounded-none cursor-pointer transition-all"
                            title="Preview Room"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>

            {/* Right side: Occupancy & Allocations */}
            <div className="space-y-5">
              
              {/* Card 1: Occupancy stats */}
              <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs space-y-4">
                <h3 className="font-bold text-slate-850 text-sm">Occupancy by Hostel</h3>
                
                <div className="space-y-4 text-xs font-semibold">
                  
                  {/* Progress 1 */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-slate-650">
                      <span>ABC Hostel</span>
                      <span className="font-bold text-slate-850">5%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-none overflow-hidden">
                      <div className="bg-orange-500 h-full rounded-none" style={{ width: "5%" }} />
                    </div>
                  </div>

                  {/* Progress 2 */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-slate-650">
                      <span>ganesh</span>
                      <span className="font-bold text-slate-850">0%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-none overflow-hidden">
                      <div className="bg-orange-500 h-full rounded-none" style={{ width: "0%" }} />
                    </div>
                  </div>

                  <button 
                    onClick={() => alert("Redirecting to reports...")}
                    className="w-full py-2 border border-blue-600 hover:bg-blue-50/10 text-blue-600 font-bold text-xs rounded-none transition-colors cursor-pointer text-center"
                  >
                    View Detailed Report
                  </button>

                </div>
              </div>

              {/* Card 2: Recent Allocations */}
              <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs space-y-4">
                <h3 className="font-bold text-slate-850 text-sm">Recent Allocations</h3>
                
                <div className="space-y-3">
                  {RECENT_ALLOCATIONS_DATA.map((alloc) => (
                    <div key={alloc.id} className="flex items-center gap-3 border-b pb-2.5 last:border-0 last:pb-0">
                      <div className="w-8 h-8 rounded-none bg-slate-100 flex items-center justify-center text-slate-450 shadow-3xs flex-shrink-0 text-xs">
                        👤
                      </div>
                      <div className="text-xs font-semibold flex-grow">
                        <h4 className="font-extrabold text-slate-800 leading-tight">{alloc.name}</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">{alloc.details} • {alloc.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* TAB PANEL 2: GUIDE */}
      {activeTab === "Guide" && (
        <div className="space-y-6 animate-in fade-in duration-200 text-slate-700">
          
          {/* How the Hostel module works */}
          <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs space-y-2">
            <h3 className="font-extrabold text-slate-850 text-base">How the Hostel module works</h3>
            <p className="text-xs text-slate-500 font-semibold leading-relaxed">
              {"This module manages accommodation inventory and who sleeps where. The structure is a simple three-level hierarchy — hostel → room → bed — and one action on top of it: allocating a student to a room. Occupancy figures on the dashboard are derived live from those allocations, so they're always current without any manual upkeep."}
            </p>
          </div>

          {/* The big picture */}
          <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs space-y-4">
            <div className="flex items-center gap-2 text-indigo-650 font-bold">
              <span className="w-2.5 h-2.5 rounded-none bg-indigo-600"></span>
              <h3 className="text-slate-850 text-xs uppercase tracking-wider">The big picture</h3>
            </div>
            
            {/* Diagram row */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center max-w-4xl pt-2">
              
              <div className="border border-slate-200 rounded-none p-4 text-center bg-white space-y-1">
                <div className="w-8 h-8 rounded-none bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto text-xs">🏢</div>
                <h4 className="font-extrabold text-xs text-slate-800">Hostels</h4>
                <p className="text-[10px] text-slate-400 font-semibold">the buildings</p>
              </div>

              <div className="hidden sm:flex items-center justify-center text-slate-300 font-bold">➔</div>

              <div className="border border-slate-200 rounded-none p-4 text-center bg-white space-y-1">
                <div className="w-8 h-8 rounded-none bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto text-xs">🏷️</div>
                <h4 className="font-extrabold text-xs text-slate-800">Room Types</h4>
                <p className="text-[10px] text-slate-400 font-semibold">AC, Non-AC, Dorm</p>
              </div>

              <div className="hidden sm:flex items-center justify-center text-slate-300 font-bold">➔</div>

              <div className="border border-slate-200 rounded-none p-4 text-center bg-white space-y-1">
                <div className="w-8 h-8 rounded-none bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto text-xs">🚪</div>
                <h4 className="font-extrabold text-xs text-slate-800">Rooms</h4>
                <p className="text-[10px] text-slate-400 font-semibold">number + capacity</p>
              </div>

              <div className="hidden sm:flex items-center justify-center text-slate-300 font-bold">➔</div>

              <div className="border border-slate-200 rounded-none p-4 text-center bg-white space-y-1">
                <div className="w-8 h-8 rounded-none bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-xs">🛏️</div>
                <h4 className="font-extrabold text-xs text-slate-800">Allocate</h4>
                <p className="text-[10px] text-slate-400 font-semibold">student → room</p>
              </div>

            </div>

            <p className="text-[10px] text-slate-400 font-semibold italic mt-2">
              {"Set these up in order — a room needs a hostel and a room type before it can exist, and a student needs a room before they can be allocated."}
            </p>
          </div>

          {/* Section 1: Hostels */}
          <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs space-y-3.5">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-none bg-indigo-600 text-white text-[10px] font-extrabold flex items-center justify-center">1</span>
              <h3 className="font-bold text-slate-850 text-xs uppercase tracking-wider">Hostels — the buildings</h3>
            </div>
            
            <div className="text-xs font-semibold leading-relaxed text-slate-500 space-y-3">
              <p>Each hostel is a building or block with a name, address and note. The important field is <strong>type</strong>:</p>
              
              <div className="flex gap-2 py-1">
                <span className="inline-block bg-blue-50 text-blue-650 border border-blue-100 text-[10px] font-extrabold px-2 py-0.5 rounded-none">For Boys</span>
                <span className="inline-block bg-pink-50 text-pink-650 border border-pink-100 text-[10px] font-extrabold px-2 py-0.5 rounded-none">For Girls</span>
                <span className="inline-block bg-purple-50 text-purple-650 border border-purple-100 text-[10px] font-extrabold px-2 py-0.5 rounded-none">Combined</span>
              </div>

              <ul className="list-disc list-inside space-y-2 text-slate-650 pl-1">
                <li>{"Type is descriptive — it documents intent for your staff, and drives how the hostel reads on reports and the parent app. It does not by itself block an allocation, so check the hostel before allocating."}</li>
                <li>{"Most schools have two or three hostels; the dashboard shows occupancy per hostel as a percentage bar."}</li>
              </ul>
            </div>
          </div>

          {/* Section 2: Room Types & Rooms */}
          <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-none bg-indigo-600 text-white text-[10px] font-extrabold flex items-center justify-center">2</span>
              <h3 className="font-bold text-slate-850 text-xs uppercase tracking-wider">Room Types & Rooms</h3>
            </div>

            <div className="text-xs font-semibold leading-relaxed text-slate-500 space-y-4">
              <p>{"A room type is a reusable category — AC, Non-AC, Dormitory, Deluxe — carrying a name, a description and a fare. A room then belongs to one hostel and one room type."}</p>

              {/* Sub flow */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center max-w-4xl py-2">
                <div className="border border-slate-100 rounded-none p-3 text-center bg-slate-50/20 space-y-1">
                  <div className="w-7 h-7 rounded-none bg-slate-100 text-slate-600 flex items-center justify-center mx-auto text-xs">🏷️</div>
                  <h4 className="font-extrabold text-[11px] text-slate-800">Define type</h4>
                  <p className="text-[9px] text-slate-400 font-semibold">name + fare</p>
                </div>
                <div className="hidden sm:flex items-center justify-center text-slate-300 font-bold">➔</div>
                <div className="border border-slate-100 rounded-none p-3 text-center bg-slate-50/20 space-y-1">
                  <div className="w-7 h-7 rounded-none bg-slate-100 text-slate-600 flex items-center justify-center mx-auto text-xs">🚪</div>
                  <h4 className="font-extrabold text-[11px] text-slate-800">Add room</h4>
                  <p className="text-[9px] text-slate-400 font-semibold">pick hostel & type</p>
                </div>
                <div className="hidden sm:flex items-center justify-center text-slate-300 font-bold">➔</div>
                <div className="border border-slate-100 rounded-none p-3 text-center bg-slate-50/20 space-y-1">
                  <div className="w-7 h-7 rounded-none bg-slate-100 text-slate-600 flex items-center justify-center mx-auto text-xs">#</div>
                  <h4 className="font-extrabold text-[11px] text-slate-800">Room number</h4>
                  <p className="text-[9px] text-slate-400 font-semibold">how staff identify it</p>
                </div>
                <div className="hidden sm:flex items-center justify-center text-slate-300 font-bold">➔</div>
                <div className="border border-slate-100 rounded-none p-3 text-center bg-slate-55/10 space-y-1">
                  <div className="w-7 h-7 rounded-none bg-slate-100 text-slate-600 flex items-center justify-center mx-auto text-xs">🛏️</div>
                  <h4 className="font-extrabold text-[11px] text-slate-800">Capacity</h4>
                  <p className="text-[9px] text-slate-400 font-semibold">beds in that room</p>
                </div>
              </div>

              <ul className="list-disc list-inside space-y-2 text-slate-650 pl-1">
                <li><strong>Capacity is the bed count</strong>, {"and it's the number every occupancy figure is measured against. Getting it right matters more than any other field in this module."}</li>
                <li>{"Room types are shared across hostels, so define them once."}</li>
              </ul>

              {/* Yellow Alert Box */}
              <div className="bg-amber-50 border border-amber-250/60 rounded-none p-3.5 text-[11px] text-amber-800 leading-relaxed font-bold flex items-start gap-2 shadow-3xs">
                <span>₹</span>
                <p>
                  {"The room-type fare is a reference figure. Unlike transport, allocating a student to a room does not raise a hostel fee automatically. The fare is there to document the rate — bill hostel charges through Finance & Fees as a normal fee type."}
                </p>
              </div>

            </div>
          </div>

          {/* Section 3: Student Allocation */}
          <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-none bg-indigo-600 text-white text-[10px] font-extrabold flex items-center justify-center">3</span>
              <h3 className="font-bold text-slate-850 text-xs uppercase tracking-wider">Student Allocation</h3>
            </div>

            <div className="text-xs font-semibold leading-relaxed text-slate-500 space-y-4">
              <p>{"Allocation is the one operational action here: pick a student, pick a room, and the bed is taken from that moment."}</p>

              {/* Flow */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center max-w-4xl py-2">
                <div className="border border-slate-100 rounded-none p-3 text-center bg-slate-50/20 space-y-1">
                  <div className="w-7 h-7 rounded-none bg-slate-100 text-slate-600 flex items-center justify-center mx-auto text-xs">👤</div>
                  <h4 className="font-extrabold text-[11px] text-slate-800">Pick student</h4>
                  <p className="text-[9px] text-slate-400 font-semibold">unallocated only</p>
                </div>
                <div className="hidden sm:flex items-center justify-center text-slate-300 font-bold">➔</div>
                <div className="border border-slate-100 rounded-none p-3 text-center bg-slate-50/20 space-y-1">
                  <div className="w-7 h-7 rounded-none bg-slate-100 text-slate-600 flex items-center justify-center mx-auto text-xs">🚪</div>
                  <h4 className="font-extrabold text-[11px] text-slate-800">Pick room</h4>
                  <p className="text-[9px] text-slate-400 font-semibold">must have a free bed</p>
                </div>
                <div className="hidden sm:flex items-center justify-center text-slate-300 font-bold">➔</div>
                <div className="border border-slate-100 rounded-none p-3 text-center bg-slate-50/20 space-y-1">
                  <div className="w-7 h-7 rounded-none bg-slate-100 text-slate-600 flex items-center justify-center mx-auto text-xs">🛏️</div>
                  <h4 className="font-extrabold text-[11px] text-slate-800">Allocated</h4>
                  <p className="text-[9px] text-slate-400 font-semibold">date stamped</p>
                </div>
                <div className="hidden sm:flex items-center justify-center text-slate-300 font-bold">➔</div>
                <div className="border border-slate-100 rounded-none p-3 text-center bg-slate-50/20 space-y-1">
                  <div className="w-7 h-7 rounded-none bg-slate-100 text-slate-600 flex items-center justify-center mx-auto text-xs">🚪</div>
                  <h4 className="font-extrabold text-[11px] text-slate-800">De-allocate</h4>
                  <p className="text-[9px] text-slate-400 font-semibold">bed freed</p>
                </div>
              </div>

              <ul className="list-disc list-inside space-y-2 text-slate-650 pl-1">
                <li>{"A student can hold only one hostel allocation at a time. The student picker only offers unallocated students, so moving someone to a different room means de-allocating first."}</li>
                <li>{"A full room is refused — if allocations already equal capacity you'll get \"This room is already full.\""}</li>
                <li>{"The allocation date is stamped automatically and shown in Recent Allocations on the dashboard."}</li>
                <li>{"De-allocating removes the record and frees the bed immediately. It is not a checkout history — if you need to know who stayed where last term, take the occupancy report before de-allocating."}</li>
              </ul>
            </div>
          </div>

          {/* Reading the dashboard */}
          <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs space-y-4">
            <div className="flex items-center gap-2 text-indigo-650 font-bold">
              <span className="w-2.5 h-2.5 rounded-none bg-indigo-600"></span>
              <h3 className="text-slate-850 text-xs uppercase tracking-wider">Reading the dashboard</h3>
            </div>
            
            <p className="text-xs text-slate-500 font-semibold">
              {"Everything on the dashboard is computed from rooms and their live allocations — nothing is entered by hand."}
            </p>

            <div className="border border-slate-200 rounded-none overflow-hidden max-w-4xl text-xs font-semibold">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider">
                    <th className="py-2.5 px-4 border-r w-1/3">Figure</th>
                    <th className="py-2.5 px-4">How it's derived</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-slate-655 divide-slate-100">
                  <tr>
                    <td className="py-2.5 px-4 border-r font-bold text-slate-800">Total Hostels / Rooms</td>
                    <td className="py-2.5 px-4 text-slate-500">{"Straight counts of what you've set up."}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 border-r font-bold text-slate-800">Occupied Beds</td>
                    <td className="py-2.5 px-4 text-slate-500">{"Number of active allocations."}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 border-r font-bold text-slate-800">Available Beds</td>
                    <td className="py-2.5 px-4 text-slate-500">{"Total capacity across all rooms, minus occupied."}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 border-r font-bold text-slate-800">Occupancy by Hostel</td>
                    <td className="py-2.5 px-4 text-slate-500">{"Occupied ÷ capacity for that building, as a percentage bar."}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Room status badges */}
            <div className="space-y-2 pt-2 text-xs font-semibold">
              <h4 className="font-extrabold text-slate-800">Room status badges</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="inline-block bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-extrabold px-2 py-0.5 rounded">Vacant</span>
                  <span className="text-slate-500">nobody allocated yet.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-block bg-orange-50 text-orange-600 border border-orange-100 text-[10px] font-extrabold px-2 py-0.5 rounded">Partially Available</span>
                  <span className="text-slate-500">some beds taken, some free.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-block bg-red-50 text-red-600 border border-red-100 text-[10px] font-extrabold px-2 py-0.5 rounded">Fully Occupied</span>
                  <span className="text-slate-500">at capacity — it will refuse further allocations.</span>
                </li>
              </ul>
            </div>

            {/* Light yellow alert box */}
            <div className="bg-amber-50 border border-amber-200/60 rounded-none p-3.5 text-[11px] text-amber-800 leading-relaxed font-bold flex items-start gap-2 shadow-3xs max-w-4xl">
              <span>💡</span>
              <p>
                {"Low occupancy percentage? Check your room capacity values first. A room entered as 50 beds when it really holds 4 will make a full hostel look almost empty — capacity is the denominator in every one of these numbers."}
              </p>
            </div>
          </div>

          {/* Bottom columns grid: Tabs at a glance & Access & related screens */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            
            {/* Column 1: Tabs at a glance */}
            <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs space-y-4">
              <div className="flex items-center gap-2 text-indigo-650 font-bold border-b pb-2">
                <span>🧭</span>
                <h3 className="text-slate-850 text-xs uppercase tracking-wider">Tabs at a glance</h3>
              </div>

              <div className="border border-slate-100 rounded-none overflow-hidden text-xs font-semibold">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider">
                      <th className="py-2.5 px-4 border-r w-1/3">Tab</th>
                      <th className="py-2.5 px-4">What you do there</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-slate-650 divide-slate-100">
                    <tr>
                      <td className="py-2.5 px-4 border-r font-bold text-slate-800">Dashboard</td>
                      <td className="py-2.5 px-4 text-slate-400">Hostel/room counts, occupied vs available beds, room status list, occupancy per hostel, recent allocations.</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 border-r font-bold text-slate-800">Student Allocation</td>
                      <td className="py-2.5 px-4 text-slate-400">Allocate a student to a room, view current occupants, de-allocate.</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 border-r font-bold text-slate-800">Manage Rooms</td>
                      <td className="py-2.5 px-4 text-slate-400">Add rooms with a hostel, room type, room number and bed capacity.</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 border-r font-bold text-slate-800">Room Types</td>
                      <td className="py-2.5 px-4 text-slate-400 font-semibold">Define reusable categories (AC, Non-AC, Dorm) with a fare and description.</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 border-r font-bold text-slate-800">Manage Hostels</td>
                      <td className="py-2.5 px-4 text-slate-400">Create buildings with type (boys / girls / combined), address and notes.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Column 2: Access & related screens */}
            <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs space-y-4">
              <div className="flex items-center gap-2 text-indigo-650 font-bold border-b pb-2">
                <span>👤</span>
                <h3 className="text-slate-850 text-xs uppercase tracking-wider">Access & related screens</h3>
              </div>

              <div className="border border-slate-100 rounded-none overflow-hidden text-xs font-semibold">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider">
                      <th className="py-2.5 px-4 border-r w-1/3">Item</th>
                      <th className="py-2.5 px-4">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-slate-655 divide-slate-100">
                    <tr>
                      <td className="py-2.5 px-4 border-r font-bold text-slate-800">hostel.manage</td>
                      <td className="py-2.5 px-4 text-slate-400">Single permission covering the whole module — hostels, rooms, types and allocations.</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 border-r font-bold text-slate-800">Hostel module</td>
                      <td className="py-2.5 px-4 text-slate-400">Must be enabled for your school, or the menu is hidden entirely.</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 border-r font-bold text-slate-800">Hostel Occupancy Report</td>
                      <td className="py-2.5 px-4 text-slate-400">Under <strong>Reports</strong> — detailed occupancy with export.</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 border-r font-bold text-slate-800">Finance & Fees</td>
                      <td className="py-2.5 px-4 text-slate-400 font-semibold">Where hostel charges are actually billed and collected.</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 border-r font-bold text-slate-800">Parent app</td>
                      <td className="py-2.5 px-4 text-slate-400">Families can see their child's allocated hostel and room.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-[10px] text-slate-400 font-semibold mt-1">
                {"Grant hostel.manage to your hostel warden under Settings → Roles & Permissions. There is no separate read-only hostel role."}
              </p>
            </div>

          </div>

        </div>
      )}

      {/* TAB PANEL 3: STUDENT ALLOCATION */}
      {activeTab === "Student Allocation" && (
        <div className="space-y-4 animate-in fade-in duration-200 text-slate-700">
          <h4 className="text-xs font-bold text-blue-600">ABC Hostel (combined)</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Card Room 1 AC */}
            <div className="bg-white border border-slate-200 rounded-none shadow-3xs flex flex-col justify-between overflow-hidden">
              <div className="p-4 border-b flex justify-between items-center bg-slate-50/20">
                <h4 className="font-extrabold text-xs text-slate-800">Room: 1</h4>
                <span className="bg-blue-50 text-blue-650 border border-blue-100 text-[9px] font-extrabold px-2 py-0.2 rounded">AC</span>
              </div>
              
              <div className="p-4 flex-grow space-y-2">
                <div className="text-[11px] font-semibold text-slate-450 mb-2">Occupancy: {allocations.room1.length} / 50</div>
                {allocations.room1.map((student, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2.5 border border-slate-100 rounded-none text-xs font-bold text-slate-800 bg-white">
                    <span>{student}</span>
                    <button 
                      onClick={() => handleDeallocate("room1", student)}
                      className="w-4.5 h-4.5 rounded-none bg-red-50 hover:bg-red-100 text-red-650 flex items-center justify-center cursor-pointer text-[10px] font-bold border-none active:scale-90"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-slate-50/20 border-t flex justify-end">
                <button 
                  onClick={() => setShowAllocateModal("room1")}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] rounded-none cursor-pointer border-none"
                >
                  Allocate Student
                </button>
              </div>
            </div>

            {/* Card Room 2 AC */}
            <div className="bg-white border border-slate-200 rounded-none shadow-3xs flex flex-col justify-between overflow-hidden">
              <div className="p-4 border-b flex justify-between items-center bg-slate-50/20">
                <h4 className="font-extrabold text-xs text-slate-800">Room: 2</h4>
                <span className="bg-blue-50 text-blue-650 border border-blue-100 text-[9px] font-extrabold px-2 py-0.2 rounded">AC</span>
              </div>
              
              <div className="p-4 flex-grow space-y-2">
                <div className="text-[11px] font-semibold text-slate-450 mb-2">Occupancy: {allocations.room2.length} / 50</div>
                {allocations.room2.map((student, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2.5 border border-slate-100 rounded-none text-xs font-bold text-slate-800 bg-white">
                    <span>{student}</span>
                    <button 
                      onClick={() => handleDeallocate("room2", student)}
                      className="w-4.5 h-4.5 rounded-none bg-red-50 hover:bg-red-100 text-red-655 flex items-center justify-center cursor-pointer text-[10px] font-bold border-none active:scale-90"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-slate-50/20 border-t flex justify-end">
                <button 
                  onClick={() => setShowAllocateModal("room2")}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] rounded-none cursor-pointer border-none"
                >
                  Allocate Student
                </button>
              </div>
            </div>

            {/* Card Room 3 Non AC */}
            <div className="bg-white border border-slate-200 rounded-none shadow-3xs flex flex-col justify-between overflow-hidden">
              <div className="p-4 border-b flex justify-between items-center bg-slate-50/20">
                <h4 className="font-extrabold text-xs text-slate-800">Room: 1</h4>
                <span className="bg-teal-50 text-teal-600 border border-teal-100 text-[9px] font-extrabold px-2 py-0.2 rounded">Non AC</span>
              </div>
              
              <div className="p-4 flex-grow space-y-2">
                <div className="text-[11px] font-semibold text-slate-450 mb-2">Occupancy: {allocations.room3.length} / 10</div>
                {allocations.room3.length === 0 ? (
                  <div className="py-6 text-center text-slate-400 font-semibold text-[11px]">No students allocated.</div>
                ) : (
                  allocations.room3.map((student, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2.5 border border-slate-100 rounded-none text-xs font-bold text-slate-800 bg-white">
                      <span>{student}</span>
                      <button 
                        onClick={() => handleDeallocate("room3", student)}
                        className="w-4.5 h-4.5 rounded-none bg-red-50 hover:bg-red-100 text-red-655 flex items-center justify-center cursor-pointer text-[10px] font-bold border-none active:scale-90"
                      >
                        ×
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className="p-4 bg-slate-50/20 border-t flex justify-end">
                <button 
                  onClick={() => setShowAllocateModal("room3")}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] rounded-none cursor-pointer border-none"
                >
                  Allocate Student
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB PANEL 4: MANAGE ROOMS */}
      {activeTab === "Manage Rooms" && (
        <div className="bg-white border border-slate-200 rounded-none overflow-hidden shadow-3xs animate-in fade-in duration-150">
          
          {/* Header */}
          <div className="px-5 py-4 border-b flex justify-between items-center bg-slate-50/20">
            <div>
              <h3 className="font-bold text-slate-850 text-sm">Rooms Register</h3>
              <p className="text-[10px] text-slate-450 font-semibold">List of all active hostel rooms and pricing</p>
            </div>
            
            <button 
              onClick={() => setShowAddRoomModal(true)}
              className="px-3.5 py-1.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-[10px] rounded-none flex items-center gap-1 cursor-pointer select-none border-none active:scale-95"
            >
              <Plus className="w-3.5 h-3.5 text-white" />
              Add Room
            </button>
          </div>

          {/* Rooms Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200 text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider">
                  <th className="py-3 px-5 border-r border-slate-200">Room No.</th>
                  <th className="py-3 px-5 border-r border-slate-200">Hostel Building</th>
                  <th className="py-3 px-5 border-r border-slate-200">Room Type</th>
                  <th className="py-3 px-5 border-r border-slate-200 text-center">Beds Capacity</th>
                  <th className="py-3 px-5 border-r border-slate-200 text-right">Rent (Per Month)</th>
                  <th className="py-3 px-5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-650 font-semibold">
                {rooms.map((room) => (
                  <tr key={room.id} className="hover:bg-slate-50/10 transition-colors">
                    <td className="py-3.5 px-5 border-r border-slate-100 font-bold text-slate-800">{room.roomNo}</td>
                    <td className="py-3.5 px-5 border-r border-slate-100 text-slate-650">{room.hostel}</td>
                    <td className="py-3.5 px-5 border-r border-slate-100">
                      <span className={`inline-block px-2 py-0.5 rounded-none text-[10px] font-extrabold border ${
                        room.type === "AC" 
                          ? "bg-blue-50 text-blue-650 border-blue-100/50" 
                          : "bg-slate-100 text-slate-550 border-slate-200"
                      }`}>
                        {room.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 border-r border-slate-100 text-center font-mono">{room.capacity}</td>
                    <td className="py-3.5 px-5 border-r border-slate-100 text-right text-slate-700 font-mono">
                      ₹{(room.id > 10 ? 5000 : 7500).toLocaleString("en-IN")}
                    </td>
                    <td className="py-2.5 px-5 text-center">
                      <span className={`inline-block px-2 py-0.5 text-[10px] font-extrabold rounded-none border ${
                        room.status === "Vacant" 
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                          : "bg-orange-50 text-orange-655 border-orange-100"
                      }`}>
                        {room.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* TAB PANEL 5: ROOM TYPES */}
      {activeTab === "Room Types" && (
        <div className="space-y-4 animate-in fade-in duration-150 text-slate-750">
          
          <div className="flex justify-end items-center">
            <button 
              onClick={() => setShowAddTypeModal(true)}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-none flex items-center gap-1.5 shadow-md cursor-pointer select-none active:scale-95 border-none"
            >
              <Plus className="w-4 h-4 text-white" />
              Add New Room Type
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-none overflow-hidden shadow-3xs space-y-4 p-5">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-2">
                <span>🛏️</span>
                <h3 className="font-bold text-slate-800 text-sm">All Room Types</h3>
              </div>
            </div>

            {/* Datatable controls row */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-semibold">
              <div className="flex items-center gap-2 text-slate-500">
                <span>Show</span>
                <select className="border border-slate-200 bg-white rounded-none px-2 py-1 text-slate-800">
                  <option value="10">10</option>
                  <option value="25">25</option>
                </select>
                <span>entries</span>
                <div className="flex border border-slate-200 rounded-none overflow-hidden divide-x ml-2 text-[10px] font-bold text-slate-600">
                  <button type="button" className="px-2.5 py-1 hover:bg-slate-50 cursor-pointer border-none bg-white">CSV</button>
                  <button type="button" className="px-2.5 py-1 hover:bg-slate-50 cursor-pointer border-none bg-white">Excel</button>
                  <button type="button" className="px-2.5 py-1 hover:bg-slate-50 cursor-pointer border-none bg-white">PDF</button>
                  <button type="button" className="px-2.5 py-1 hover:bg-slate-50 cursor-pointer border-none bg-white">Print</button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-450">Search:</span>
                <input 
                  type="text" 
                  placeholder="Search room types..."
                  className="border border-slate-300 bg-white rounded-none px-3 py-1.5 text-slate-800 text-xs font-semibold focus:outline-none focus:border-indigo-600"
                />
              </div>
            </div>

            {/* Room Types Table */}
            <div className="overflow-x-auto border border-slate-100 rounded-none">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider">
                    <th className="py-3 px-4 border-r w-12 text-center">#</th>
                    <th className="py-3 px-4 border-r">Room Type Name</th>
                    <th className="py-3 px-4 border-r">Fare</th>
                    <th className="py-3 px-4 border-r">Description</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-650 font-semibold">
                  {roomTypes.map((type, idx) => (
                    <tr key={type.id} className="hover:bg-slate-50/10">
                      <td className="py-3 px-4 text-center border-r font-mono">{idx + 1}</td>
                      <td className="py-3 px-4 border-r font-bold text-slate-800">{type.name}</td>
                      <td className="py-3 px-4 border-r font-mono text-slate-700">₹{type.fare.toLocaleString("en-IN")}.00</td>
                      <td className="py-3 px-4 border-r text-slate-450 font-semibold">{type.desc}</td>
                      <td className="py-2.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5 text-slate-400">
                          <button onClick={() => alert("Edit mode is read-only in this demo...")} className="p-1 hover:text-indigo-600 rounded-none cursor-pointer border-none bg-transparent"><Eye className="w-3.5 h-3.5" /></button>
                          <button onClick={() => handleDeleteType(type.id, type.name)} className="p-1 hover:text-red-650 rounded-none cursor-pointer border-none bg-transparent"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB PANEL 6: MANAGE HOSTELS */}
      {activeTab === "Manage Hostels" && (
        <div className="space-y-4 animate-in fade-in duration-150 text-slate-750">
          
          {hostelViewMode === "list" ? (
            <div className="space-y-4">
              <div className="flex justify-end items-center">
                <button 
                  onClick={() => setHostelViewMode("add")}
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-none flex items-center gap-1.5 shadow-md cursor-pointer select-none active:scale-95 border-none"
                >
                  <Plus className="w-4 h-4 text-white" />
                  Add New Hostel
                </button>
              </div>

              <div className="bg-white border border-slate-200 rounded-none overflow-hidden shadow-3xs space-y-4 p-5">
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-2">
                    <span>🏢</span>
                    <h3 className="font-bold text-slate-800 text-sm">All Hostels</h3>
                  </div>
                </div>

                {/* Datatable controls row */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-semibold">
                  <div className="flex items-center gap-2 text-slate-500">
                    <span>Show</span>
                    <select className="border border-slate-200 bg-white rounded-none px-2 py-1 text-slate-800">
                      <option value="10">10</option>
                      <option value="25">25</option>
                    </select>
                    <span>entries</span>
                    <div className="flex border border-slate-200 rounded-none overflow-hidden divide-x ml-2 text-[10px] font-bold text-slate-600">
                      <button type="button" className="px-2.5 py-1 hover:bg-slate-50 cursor-pointer border-none bg-white">CSV</button>
                      <button type="button" className="px-2.5 py-1 hover:bg-slate-50 cursor-pointer border-none bg-white">Excel</button>
                      <button type="button" className="px-2.5 py-1 hover:bg-slate-50 cursor-pointer border-none bg-white">PDF</button>
                      <button type="button" className="px-2.5 py-1 hover:bg-slate-50 cursor-pointer border-none bg-white">Print</button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-slate-450">Search:</span>
                    <input 
                      type="text" 
                      placeholder="Search hostels..."
                      className="border border-slate-300 bg-white rounded-none px-3 py-1.5 text-slate-800 text-xs font-semibold focus:outline-none focus:border-indigo-600"
                    />
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto border border-slate-100 rounded-none">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider">
                        <th className="py-3 px-4 border-r w-12 text-center">#</th>
                        <th className="py-3 px-4 border-r">Hostel Name</th>
                        <th className="py-3 px-4 border-r">Type</th>
                        <th className="py-3 px-4 border-r text-center">Rooms</th>
                        <th className="py-3 px-4 border-r">Address</th>
                        <th className="py-3 px-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs text-slate-655 font-semibold">
                      {hostels.map((h, idx) => (
                        <tr key={h.id} className="hover:bg-slate-50/10">
                          <td className="py-3 px-4 text-center border-r font-mono">{idx + 1}</td>
                          <td className="py-3 px-4 border-r font-bold text-slate-800">{h.name}</td>
                          <td className="py-3 px-4 border-r">
                            <span className={`inline-block px-2 py-0.5 rounded-none text-[10px] font-extrabold border ${
                              h.type === "Combined" 
                                ? "bg-purple-50 text-purple-650 border-purple-100" 
                                : "bg-blue-50 text-blue-655 border-blue-100"
                            }`}>
                              {h.type}
                            </span>
                          </td>
                          <td className="py-3 px-4 border-r text-center font-bold text-slate-700">{h.roomsCount}</td>
                          <td className="py-3 px-4 border-r text-slate-450">{h.address}</td>
                          <td className="py-2.5 px-4 text-center">
                            <div className="flex items-center justify-center gap-1.5 text-slate-400">
                              <button onClick={() => alert("Edit mode is read-only in this demo...")} className="p-1 hover:text-indigo-600 rounded-none cursor-pointer border-none bg-transparent"><Eye className="w-3.5 h-3.5" /></button>
                              <button onClick={() => handleDeleteHostel(h.id, h.name)} className="p-1 hover:text-red-650 rounded-none cursor-pointer border-none bg-transparent"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          ) : (
            // Add Hostel layout matching Screenshot 5
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-xl font-bold text-slate-850 tracking-tight">Add New Hostel</h1>
                  <p className="text-slate-450 text-[11px] font-semibold">Create the hostel first, then add its rooms and allocate students</p>
                </div>
                <button 
                  onClick={() => setHostelViewMode("list")}
                  className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-655 text-xs font-bold rounded-none flex items-center gap-1.5 cursor-pointer"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start text-xs font-semibold">
                
                {/* Form column */}
                <form onSubmit={handleAddHostelSubmit} className="lg:col-span-2 bg-white border border-slate-200 rounded-none p-5 shadow-3xs space-y-4">
                  <div className="border-b pb-2 flex items-center gap-1.5 text-indigo-650 font-bold uppercase tracking-wider text-[10px]">
                    <span>🏢</span>
                    Hostel Details
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-slate-600">Hostel Name *</label>
                      <input 
                        type="text" 
                        value={newHostelName} 
                        onChange={(e) => setNewHostelName(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white"
                        placeholder="e.g., ABC Hostel"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-650">Hostel Type *</label>
                      <select 
                        value={newHostelType} 
                        onChange={(e) => setNewHostelType(e.target.value)}
                        className="w-full px-3 py-2.5 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white cursor-pointer"
                      >
                        <option value="For Boys">For Boys</option>
                        <option value="For Girls">For Girls</option>
                        <option value="Combined">Combined</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-655">Address</label>
                    <input 
                      type="text" 
                      value={newHostelAddress} 
                      onChange={(e) => setNewHostelAddress(e.target.value)}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white"
                      placeholder="e.g. Campus Building Block C"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-655">Note</label>
                    <textarea 
                      value={newHostelNote} 
                      onChange={(e) => setNewHostelNote(e.target.value)}
                      rows="3"
                      className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white"
                      placeholder="Warden info or building guidelines..."
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t">
                    <button type="button" onClick={() => setHostelViewMode("list")} className="px-4 py-2 border border-slate-200 hover:bg-slate-100 rounded-none cursor-pointer">
                      Cancel
                    </button>
                    <button type="submit" className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-none cursor-pointer flex items-center gap-1 border-none font-bold">
                      <Check className="w-3.5 h-3.5" />
                      Create Hostel
                    </button>
                  </div>
                </form>

                {/* Info Column */}
                <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs space-y-4">
                  <div className="border-b pb-2 flex items-center gap-1.5 text-indigo-650 font-bold uppercase tracking-wider text-[10px]">
                    <span>💡</span>
                    Setting up accommodation
                  </div>

                  <div className="space-y-3.5 text-[11px] leading-relaxed text-slate-400 font-bold">
                    <p>• <strong>Hostel type</strong> decides who can be allocated here — boys, girls, or a combined block.</p>
                    <p>• <strong>Rooms</strong> are added from the Manage Rooms tab once the hostel exists, each with its own capacity.</p>
                    <p>• <strong>Room types</strong> (AC, Non AC...) carry the fare, so set those up before adding rooms.</p>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      )}

      {/* OVERLAY MODAL: ALLOCATE STUDENT */}
      {showAllocateModal && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white text-gray-850 rounded-none p-5 shadow-xl max-w-sm w-full space-y-4 border border-slate-200">
            <div className="border-b pb-2 flex justify-between items-center">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500">Allocate Student to {showAllocateModal === "room1" ? "Room 1" : showAllocateModal === "room2" ? "Room 2" : "Room 1 (Non AC)"}</h3>
              <button onClick={() => setShowAllocateModal(null)} className="text-slate-400 hover:text-slate-650 cursor-pointer border-none bg-transparent">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleAllocateSubmit} className="space-y-4 text-xs font-semibold">
              <div className="space-y-1">
                <label className="text-slate-600">Student Name *</label>
                <select 
                  value={allocateStudentName} 
                  onChange={(e) => setAllocateStudentName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-none focus:outline-none focus:border-indigo-600 bg-white font-semibold text-slate-800"
                  required
                >
                  <option value="">— Select Student —</option>
                  <option value="Aarav Sharma">Aarav Sharma</option>
                  <option value="Siddharth Roy">Siddharth Roy</option>
                  <option value="Tanya Sen">Tanya Sen</option>
                  <option value="Sameer Deshmukh">Sameer Deshmukh</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t">
                <button type="button" onClick={() => setShowAllocateModal(null)} className="px-3.5 py-1.5 border border-slate-200 hover:bg-slate-100 rounded-none font-bold cursor-pointer">
                  Close
                </button>
                <button type="submit" className="px-4 py-1.5 bg-indigo-650 hover:bg-indigo-750 text-white rounded-none font-bold cursor-pointer border-none">
                  Allocate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* OVERLAY MODAL: ADD ROOM TYPE */}
      {showAddTypeModal && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white text-gray-850 rounded-none p-5 shadow-xl max-w-sm w-full space-y-4 border border-slate-200">
            <div className="border-b pb-2 flex justify-between items-center">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-505 flex items-center gap-1.5">
                🛏️ Add New Room Type
              </h3>
              <button onClick={() => setShowAddTypeModal(false)} className="text-slate-400 hover:text-slate-650 cursor-pointer border-none bg-transparent">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleAddTypeSubmit} className="space-y-4 text-xs font-semibold">
              <div className="space-y-1">
                <label className="text-slate-650">Name *</label>
                <input 
                  type="text" 
                  value={typeName} 
                  onChange={(e) => setTypeName(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white"
                  placeholder="e.g., AC, Non AC"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-slate-650">Fare *</label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 text-slate-450 border-r pr-2">₹</div>
                  <input 
                    type="number" 
                    value={typeFare} 
                    onChange={(e) => setTypeFare(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white"
                    placeholder="e.g. 5000"
                    required
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-slate-655">Description</label>
                <textarea 
                  value={typeDesc} 
                  onChange={(e) => setTypeDesc(e.target.value)}
                  rows="3"
                  className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white"
                  placeholder="Additional details..."
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t text-xs font-bold">
                <button type="button" onClick={() => setShowAddTypeModal(false)} className="px-4 py-2 border border-slate-200 hover:bg-slate-100 rounded-none cursor-pointer">
                  Close
                </button>
                <button type="submit" className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-none cursor-pointer border-none">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
