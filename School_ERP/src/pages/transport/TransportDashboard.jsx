import React, { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { transportService } from "../../api/transportService";
import { 
  Plus, 
  Bus, 
  MapPin, 
  Users, 
  Clock, 
  Calendar, 
  Check, 
  X, 
  Sliders, 
  Eye, 
  Trash2,
  Key,
  Wifi,
  Navigation,
  FileText,
  AlertTriangle,
  Info,
  Map
} from "lucide-react";

// Initial Mock Vehicles list
const INITIAL_VEHICLES = [];

export default function TransportDashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  // Map route pathnames to corresponding tab names
  const getTabFromPath = (path) => {
    switch (path) {
      case "/transport/live-operations":
        return "Live Operations";
      case "/transport/manage-vehicles":
        return "Manage Vehicles";
      case "/transport/manage-routes":
        return "Manage Routes";
      case "/transport/live-tracking":
        return "Live Tracking";
      case "/transport/drivers":
        return "Drivers";
      case "/transport/boarding-register":
        return "Boarding Register";
      case "/transport/dashboard":
      default:
        return "Dashboard";
    }
  };

  const getPathFromTab = (tabName) => {
    switch (tabName) {
      case "Live Operations":
        return "/transport/live-operations";
      case "Manage Vehicles":
        return "/transport/manage-vehicles";
      case "Manage Routes":
        return "/transport/manage-routes";
      case "Live Tracking":
        return "/transport/live-tracking";
      case "Drivers":
        return "/transport/drivers";
      case "Boarding Register":
        return "/transport/boarding-register";
      case "Guide":
        return "/transport/dashboard";
      case "Dashboard":
      default:
        return "/transport/dashboard";
    }
  };

  const [activeTab, setActiveTab] = useState(() => getTabFromPath(location.pathname));
  const [viewMode, setViewMode] = useState("dashboard"); // "dashboard" | "add-vehicle" | "add-route" | "trip-timeline"

  useEffect(() => {
    setActiveTab(getTabFromPath(location.pathname));
  }, [location.pathname]);

  // Toast alerts
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  // Vehicles state
  const [vehicles, setVehicles] = useState(INITIAL_VEHICLES);

  // Routes state
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    // Fetch live vehicles and routes
    const loadTransportData = async () => {
      try {
        const [vehiclesRes, routesRes] = await Promise.all([
          transportService.getVehicles(),
          transportService.getRoutes()
        ]);
        
        // Map backend schemas to frontend UI schemas natively
        const formattedVehicles = (vehiclesRes.data || []).map(v => ({
           id: v._id, 
           vehicleNo: v.vehicleNumber, 
           model: v.vehicleModel, 
           capacity: v.capacity, 
           driver: v.driverId ? `${v.driverId.firstName} ${v.driverId.lastName}` : "No Driver", 
           phone: v.driverId?.contactNumber || "--", 
           tracking: v.status === "Active" ? "Enabled" : "Disabled" 
        }));
        setVehicles(formattedVehicles);

        const formattedRoutes = (routesRes.data || []).map(r => ({
           id: r._id,
           name: r.routeName,
           vehicle: r.assignedVehicle?.vehicleNumber || null,
           fare: r.fare || 0,
        }));
        setRoutes(formattedRoutes);

      } catch (err) {
        console.error("Failed to load transport data", err);
      }
    };
    loadTransportData();
  }, []);

  // Add Route form state
  const [newRouteName, setNewRouteName] = useState("");
  const [newRouteFare, setNewRouteFare] = useState("");
  const [newRouteVehicle, setNewRouteVehicle] = useState("None");

  const handleAddRoute = (e) => {
    e.preventDefault();
    if (!newRouteName.trim()) return;
    setRoutes(prev => [...prev, {
      id: Date.now(),
      name: newRouteName,
      vehicle: newRouteVehicle === "None" ? null : newRouteVehicle,
      fare: parseFloat(newRouteFare) || 0
    }]);
    setNewRouteName("");
    setNewRouteFare("");
    setNewRouteVehicle("None");
    setViewMode("dashboard");
    setActiveTab("Manage Routes");
    setToastMsg("Route created successfully!");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Trip Timeline state
  const [timelineVehicle, setTimelineVehicle] = useState("");
  const [timelineDate, setTimelineDate] = useState(new Date().toISOString().split("T")[0].split("-").join("-"));
  const [timelineViewed, setTimelineViewed] = useState(false);

  // Drivers state
  const INITIAL_DRIVERS = [
    { id: 1, name: "RENGARAJAN G", driverId: "7588-4049", mobile: "9005671496", licence: null, licenceExpiry: null, devices: null, status: "Active", lastSeen: null },
    { id: 2, name: "Ramesh Kumar", driverId: "6578-5019", mobile: "6263056776", licence: "AS3535SDSFGF", licenceExpiry: "09 Jun 2035", devices: 17, status: "Active", lastSeen: "7 hours ago" },
  ];
  const [drivers, setDrivers] = useState(INITIAL_DRIVERS);
  const [driverFilter, setDriverFilter] = useState("All");
  const [driverSearch, setDriverSearch] = useState("");

  // Add Driver form state
  const [newDriver, setNewDriver] = useState({ name: "", mobile: "", altMobile: "", licence: "", licenceValid: "", bloodGroup: "", emergency: "", address: "", assignedBus: "", status: "Active", joinedOn: "", leftOn: "", appScreen: "Use school default", note: "" });

  const handleAddDriver = (e) => {
    e.preventDefault();
    if (!newDriver.name.trim()) return;
    const dId = Math.floor(1000 + Math.random() * 9000) + "-" + Math.floor(1000 + Math.random() * 9000);
    setDrivers(prev => [...prev, { id: Date.now(), name: newDriver.name, driverId: dId, mobile: newDriver.mobile, licence: newDriver.licence || null, licenceExpiry: newDriver.licenceValid || null, devices: null, status: newDriver.status, lastSeen: null }]);
    setNewDriver({ name: "", mobile: "", altMobile: "", licence: "", licenceValid: "", bloodGroup: "", emergency: "", address: "", assignedBus: "", status: "Active", joinedOn: "", leftOn: "", appScreen: "Use school default", note: "" });
    setViewMode("dashboard");
    setActiveTab("Drivers");
    setToastMsg("Driver added successfully!");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Boarding Register state
  const [brDate, setBrDate] = useState(new Date().toISOString().split("T")[0]);
  const [brRoute, setBrRoute] = useState("All routes");
  const [brVehicle, setBrVehicle] = useState("All vehicles");
  const [brViewed, setBrViewed] = useState(false);

  // Form states for Add New Vehicle
  const [vehicleNo, setVehicleNo] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [seatingCapacity, setSeatingCapacity] = useState("");
  const [driverName, setDriverName] = useState("");
  const [driverPhone, setDriverPhone] = useState("");
  const [driverPassword, setDriverPassword] = useState("");
  const [imei, setImei] = useState("");
  const [apiToken, setApiToken] = useState("");
  const [liveTrackingEnabled, setLiveTrackingEnabled] = useState(false);
  const [note, setNote] = useState("");

  // Generate API Token helper
  const handleGenerateToken = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let token = "";
    for (let i = 0; i < 32; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setApiToken(token);
  };

  // Submit Handler for Add Vehicle
  const handleAddVehicleSubmit = (e) => {
    e.preventDefault();
    if (vehicleNo.trim() === "") return;

    const newVehicle = {
      id: Date.now(),
      vehicleNo: vehicleNo.toUpperCase(),
      model: vehicleModel || "Van",
      capacity: parseInt(seatingCapacity) || 40,
      driver: driverName || "Unassigned",
      phone: driverPhone || "—",
      tracking: liveTrackingEnabled ? "Enabled" : "Disabled"
    };

    setVehicles(prev => [newVehicle, ...prev]);
    setViewMode("dashboard");

    // Reset fields
    setVehicleNo("");
    setVehicleModel("");
    setSeatingCapacity("");
    setDriverName("");
    setDriverPhone("");
    setDriverPassword("");
    setImei("");
    setApiToken("");
    setLiveTrackingEnabled(false);
    setNote("");

    setToastMsg(`Vehicle ${newVehicle.vehicleNo} added successfully!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Delete vehicle helper
  const handleDeleteVehicle = (id, number) => {
    if (confirm(`Are you sure you want to delete vehicle ${number}?`)) {
      setVehicles(prev => prev.filter(v => v.id !== id));
      setToastMsg(`Vehicle ${number} removed.`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-5 font-sans text-gray-800 relative">
      
      {/* Toast Alert Popups */}
      {showToast && (
        <div className="fixed top-5 right-5 bg-emerald-600 text-white font-bold text-xs px-4 py-3 rounded-none shadow-xl z-50 flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {viewMode === "dashboard" && (
        <>
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-850 tracking-tight">Transport Management</h1>
              <p className="text-slate-450 text-xs font-semibold">Real-time monitoring of campus-wide fleet resources and routing metrics.</p>
            </div>
            
            <button
              onClick={() => setViewMode("add-vehicle")}
              className="px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-none flex items-center gap-1.5 shadow-md cursor-pointer select-none border-none active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4 text-white" />
              Add New Vehicle
            </button>
          </div>

          {/* Navigation horizontal tabs row */}
          <div className="flex flex-wrap gap-5 border-b border-slate-200">
            {["Dashboard", "Guide", "Manage Vehicles", "Manage Routes", "Live Tracking", "Live Operations", "Drivers", "Boarding Register"].map((tab) => {
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
                      ? "text-indigo-655 border-b-2 border-indigo-600" 
                      : "text-slate-500 hover:text-indigo-600"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* TAB CONTENT: DASHBOARD */}
          {activeTab === "Dashboard" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Metrics cards row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                
                <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-none bg-slate-100/70 text-slate-600 flex items-center justify-center">
                    <Bus className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Total Vehicles</div>
                    <div className="text-2xl font-black text-slate-800 font-mono mt-0.5">{vehicles.length}</div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-none bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Navigation className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Active Routes</div>
                    <div className="text-2xl font-black text-slate-800 font-mono mt-0.5">7</div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-none bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Students Using Transport</div>
                    <div className="text-2xl font-black text-slate-800 font-mono mt-0.5">37</div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-none bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Vehicles On Duty</div>
                    <div className="text-2xl font-black text-slate-800 font-mono mt-0.5">5</div>
                  </div>
                </div>

              </div>

              {/* Layout body: Vehicle Inventory & Upcoming Maintenance */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                
                {/* Left Card: Vehicle Inventory */}
                <div className="lg:col-span-2 bg-white border border-slate-200 rounded-none overflow-hidden shadow-3xs">
                  <div className="px-5 py-4 border-b flex justify-between items-center bg-slate-50/20">
                    <h3 className="font-extrabold text-slate-850 text-xs uppercase tracking-wider">Vehicle Inventory & Status</h3>
                    <button 
                      onClick={() => setViewMode("add-vehicle")}
                      className="text-orange-500 hover:text-orange-600 text-xs font-bold flex items-center gap-1 cursor-pointer bg-transparent border-none"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add New Vehicle
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-extrabold text-indigo-650 uppercase tracking-wider">
                          <th className="py-3.5 px-5 border-r border-slate-200">Vehicle No</th>
                          <th className="py-3.5 px-5 border-r border-slate-200">Driver Name</th>
                          <th className="py-3.5 px-5 border-r border-slate-200">Route Name</th>
                          <th className="py-3.5 px-5 border-r border-slate-200 text-center">Capacity</th>
                          <th className="py-3.5 px-5 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs text-slate-655 font-bold">
                        {vehicles.map((v) => {
                          const getRouteName = (no) => {
                            if (no === "CG04HD7250") return "Raipur";
                            if (no === "CG04AB1234") return "Route A — Shankar Nagar";
                            if (no === "CG04CD5678") return "Route B — Telibandha";
                            if (no === "CG04EF9012") return "Route C — Devendra Nagar";
                            return "Unassigned";
                          };
                          return (
                            <tr key={v.id} className="hover:bg-slate-50/10">
                              <td className="py-3.5 px-5 border-r border-slate-100 text-slate-800">{v.vehicleNo}</td>
                              <td className="py-3.5 px-5 border-r border-slate-100 text-slate-500">{v.driver || v.driverName}</td>
                              <td className="py-3.5 px-5 border-r border-slate-100 text-slate-500">{getRouteName(v.vehicleNo)}</td>
                              <td className="py-3.5 px-5 border-r border-slate-100 text-center text-slate-500 font-mono">
                                {typeof v.capacity === "number" ? `${v.capacity} Seater` : v.capacity}
                              </td>
                              <td className="py-2.5 px-5 text-center">
                                <span className={`inline-block border text-[9px] font-extrabold px-2 py-0.5 rounded-none ${
                                  v.tracking === "Disabled" 
                                    ? "bg-slate-100 text-slate-500 border-slate-200" 
                                    : "bg-emerald-50 text-emerald-600 border-emerald-100"
                                }`}>
                                  {v.tracking === "Disabled" ? "OUT OF SERVICE" : "IN SERVICE"}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Right Card: Upcoming Maintenance */}
                <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <h3 className="font-extrabold text-slate-850 text-xs uppercase tracking-wider">Upcoming Maintenance</h3>
                    <Calendar className="w-4 h-4 text-slate-400" />
                  </div>
                  
                  <div className="py-12 text-center text-slate-400 space-y-2">
                    <div className="text-3xl">🛠️</div>
                    <p className="text-[10px] font-semibold text-slate-450 leading-relaxed">No upcoming maintenance scheduled for the fleet.</p>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB CONTENT: GUIDE */}
          {activeTab === "Guide" && (
            <div className="space-y-6 animate-in fade-in duration-200 text-slate-700 text-xs font-semibold">
              
              {/* How the Transport module works */}
              <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs space-y-2">
                <h3 className="font-extrabold text-slate-850 text-base">How the Transport module works</h3>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  {"This module runs your bus fleet end to end: vehicles carry routes, routes have ordered stops, and students are assigned to a stop. That single assignment does two things at once — it puts the child on the bus list and raises their transport fee. On top of that sits live GPS tracking, fed by the driver app, which parents can follow from their own app."}
                </p>
              </div>

              {/* The big picture */}
              <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs space-y-4">
                <div className="flex items-center gap-2 text-indigo-650 font-bold">
                  <span className="w-2.5 h-2.5 rounded-none bg-indigo-600"></span>
                  <h3 className="text-slate-855 text-xs uppercase tracking-wider">The big picture</h3>
                </div>
                
                {/* Flow diagrams */}
                <div className="grid grid-cols-1 sm:grid-cols-9 gap-2 items-center max-w-5xl pt-2">
                  <div className="border border-slate-200 rounded-none p-4 text-center bg-white space-y-1">
                    <div className="w-8 h-8 rounded-none bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto text-xs">🚌</div>
                    <h4 className="font-extrabold text-xs text-slate-800">Vehicles</h4>
                    <p className="text-[10px] text-slate-400 font-semibold">bus + driver</p>
                  </div>
                  <div className="hidden sm:flex items-center justify-center text-slate-350 font-bold">➔</div>
                  
                  <div className="border border-slate-200 rounded-none p-4 text-center bg-white space-y-1">
                    <div className="w-8 h-8 rounded-none bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto text-xs">🗺️</div>
                    <h4 className="font-extrabold text-xs text-slate-800">Routes</h4>
                    <p className="text-[10px] text-slate-400 font-semibold">assigned a vehicle</p>
                  </div>
                  <div className="hidden sm:flex items-center justify-center text-slate-350 font-bold">➔</div>

                  <div className="border border-slate-200 rounded-none p-4 text-center bg-white space-y-1">
                    <div className="w-8 h-8 rounded-none bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto text-xs">📍</div>
                    <h4 className="font-extrabold text-xs text-slate-800">Stops</h4>
                    <p className="text-[10px] text-slate-400 font-semibold">ordered, with fares</p>
                  </div>
                  <div className="hidden sm:flex items-center justify-center text-slate-350 font-bold">➔</div>

                  <div className="border border-slate-200 rounded-none p-4 text-center bg-white space-y-1">
                    <div className="w-8 h-8 rounded-none bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-xs">👥</div>
                    <h4 className="font-extrabold text-xs text-slate-800">Assign Students</h4>
                    <p className="text-[10px] text-slate-400 font-semibold">fee auto-raised</p>
                  </div>
                  <div className="hidden sm:flex items-center justify-center text-slate-355 font-bold">➔</div>

                  <div className="border border-slate-200 rounded-none p-4 text-center bg-white space-y-1">
                    <div className="w-8 h-8 rounded-none bg-amber-50 text-amber-600 flex items-center justify-center mx-auto text-xs">📡</div>
                    <h4 className="font-extrabold text-xs text-slate-800">Track</h4>
                    <p className="text-[10px] text-slate-400 font-semibold">live map + history</p>
                  </div>
                </div>
              </div>

              {/* Step 1 Card: Vehicles & drivers */}
              <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs space-y-3.5">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-none bg-indigo-600 text-white text-[10px] font-extrabold flex items-center justify-center">1</span>
                  <h3 className="font-bold text-slate-850 text-xs uppercase tracking-wider">Vehicles & drivers</h3>
                </div>
                
                <div className="text-xs font-semibold leading-relaxed text-slate-500 space-y-2">
                  <p>A vehicle record is the bus <em>and</em> its driver. Add the registration number, model, seating capacity and driver contact details.</p>
                  <ul className="list-disc list-inside space-y-2 text-slate-655 pl-1">
                    <li>{"Capacity is what you check assignments against — keep it accurate or you'll overfill a bus on paper."}</li>
                    <li>{"Driver login is not on this form. Drivers are their own records under Transport → Drivers, and sign in to the driver app with a Driver ID and PIN — never the school email or a shared bus password. Assign each driver a bus there; a driver with no bus cannot track."}</li>
                    <li>{"Tracking enabled plus an API token are what switch GPS on for that bus. Generate the token from the vehicle form. The token is for hardware GPS units; a driver signing in with a Driver ID does not need it."}</li>
                  </ul>
                </div>
              </div>

              {/* Step 2 Card: Routes & stops */}
              <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-none bg-indigo-600 text-white text-[10px] font-extrabold flex items-center justify-center">2</span>
                  <h3 className="font-bold text-slate-855 text-xs uppercase tracking-wider">Routes & stops</h3>
                </div>

                <div className="text-xs font-semibold leading-relaxed text-slate-500 space-y-4">
                  <p>{"A route is a named run (e.g. \"Raipur\") with a vehicle, a start and end time, and a default fare. Inside it you add the stops in the order the bus visits them."}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center max-w-4xl py-2">
                    <div className="border border-slate-100 rounded-none p-3 text-center bg-slate-50/20 space-y-1">
                      <div className="w-7 h-7 rounded-none bg-slate-100 text-slate-600 flex items-center justify-center mx-auto text-xs">🗺️</div>
                      <h4 className="font-extrabold text-[11px] text-slate-800">Create route</h4>
                      <p className="text-[9px] text-slate-400 font-semibold">name, times, fare</p>
                    </div>
                    <div className="hidden sm:flex items-center justify-center text-slate-350 font-bold">➔</div>
                    <div className="border border-slate-100 rounded-none p-3 text-center bg-slate-50/20 space-y-1">
                      <div className="w-7 h-7 rounded-none bg-slate-100 text-slate-600 flex items-center justify-center mx-auto text-xs">🚌</div>
                      <h4 className="font-extrabold text-[11px] text-slate-800">Attach vehicle</h4>
                      <p className="text-[9px] text-slate-400 font-semibold">which bus runs it</p>
                    </div>
                    <div className="hidden sm:flex items-center justify-center text-slate-355 font-bold">➔</div>
                    <div className="border border-slate-100 rounded-none p-3 text-center bg-slate-50/20 space-y-1">
                      <div className="w-7 h-7 rounded-none bg-slate-100 text-slate-600 flex items-center justify-center mx-auto text-xs">📍</div>
                      <h4 className="font-extrabold text-[11px] text-slate-800">Add stops</h4>
                      <p className="text-[9px] text-slate-400 font-semibold">order + coordinates</p>
                    </div>
                    <div className="hidden sm:flex items-center justify-center text-slate-355 font-bold">➔</div>
                    <div className="border border-slate-100 rounded-none p-3 text-center bg-slate-50/20 space-y-1">
                      <div className="w-7 h-7 rounded-none bg-slate-100 text-slate-600 flex items-center justify-center mx-auto text-xs">⏰</div>
                      <h4 className="font-extrabold text-[11px] text-slate-800">Pickup / drop times</h4>
                      <p className="text-[9px] text-slate-400 font-semibold">per stop</p>
                    </div>
                  </div>

                  <ul className="list-disc list-inside space-y-2 text-slate-655 pl-1">
                    <li>{"Stop order defines the sequence of the run and drives the trip timeline's arrival checks."}</li>
                    <li>{"Latitude / longitude on a stop is what lets the system detect the bus arriving there — fill them in if you want stop-arrival tracking."}</li>
                    <li>{"Fares are two-level: a stop can carry its own fare, and the route fare is the fallback. A stop fare greater than zero always wins."}</li>
                  </ul>
                </div>
              </div>

              {/* Step 3 Card: Assigning students */}
              <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-none bg-indigo-600 text-white text-[10px] font-extrabold flex items-center justify-center">3</span>
                  <h3 className="font-bold text-slate-855 text-xs uppercase tracking-wider">Assigning students — and the fee that follows</h3>
                </div>

                <div className="text-xs font-semibold leading-relaxed text-slate-500 space-y-4">
                  <p>{"Assign a student to a route and a specific stop from the route's page. This is the step that connects transport to fees."}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center max-w-4xl py-2">
                    <div className="border border-slate-100 rounded-none p-3 text-center bg-slate-50/20 space-y-1">
                      <div className="w-7 h-7 rounded-none bg-slate-100 text-slate-600 flex items-center justify-center mx-auto text-xs">👤</div>
                      <h4 className="font-extrabold text-[11px] text-slate-800">Pick student</h4>
                      <p className="text-[9px] text-slate-400 font-semibold">one route each</p>
                    </div>
                    <div className="hidden sm:flex items-center justify-center text-slate-355 font-bold">➔</div>
                    <div className="border border-slate-100 rounded-none p-3 text-center bg-slate-50/20 space-y-1">
                      <div className="w-7 h-7 rounded-none bg-slate-100 text-slate-600 flex items-center justify-center mx-auto text-xs">📍</div>
                      <h4 className="font-extrabold text-[11px] text-slate-800">Pick stop</h4>
                      <p className="text-[9px] text-slate-400 font-semibold">sets the fare</p>
                    </div>
                    <div className="hidden sm:flex items-center justify-center text-slate-355 font-bold">➔</div>
                    <div className="border border-slate-100 rounded-none p-3 text-center bg-slate-50/20 space-y-1">
                      <div className="w-7 h-7 rounded-none bg-slate-100 text-slate-600 flex items-center justify-center mx-auto text-xs">💵</div>
                      <h4 className="font-extrabold text-[11px] text-slate-800">Fee raised</h4>
                      <p className="text-[9px] text-slate-400 font-semibold">monthly instalments</p>
                    </div>
                    <div className="hidden sm:flex items-center justify-center text-slate-355 font-bold">➔</div>
                    <div className="border border-slate-100 rounded-none p-3 text-center bg-slate-50/20 space-y-1">
                      <div className="w-7 h-7 rounded-none bg-slate-100 text-slate-600 flex items-center justify-center mx-auto text-xs">🔔</div>
                      <h4 className="font-extrabold text-[11px] text-slate-800">Parent notified</h4>
                      <p className="text-[9px] text-slate-400 font-semibold">route, stop & fare</p>
                    </div>
                  </div>

                  <ul className="list-disc list-inside space-y-2 text-slate-655 pl-1">
                    <li>{"A student can be on only one transport route at a time — reassigning means removing the existing assignment first."}</li>
                    <li>{"The fee is generated as instalments: effective fare × billing months, due on your configured day of each month."}</li>
                    <li>{"Duplicate protection stops the same student being billed twice for the same route."}</li>
                    <li>{"The parent is notified with the route, stop and amount. A notification failure never blocks the assignment itself."}</li>
                  </ul>
                </div>
              </div>

              {/* Bottom Card Grid: Screens at a glance & Access & related pieces */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                
                {/* Column 1: Screens at a glance */}
                <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs space-y-4">
                  <div className="flex items-center gap-2 text-indigo-650 font-bold border-b pb-2">
                    <span>🧭</span>
                    <h3 className="text-slate-855 text-xs uppercase tracking-wider">Screens at a glance</h3>
                  </div>

                  <div className="border border-slate-100 rounded-none overflow-hidden text-[11px] font-semibold text-slate-650">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider">
                          <th className="py-2.5 px-4 border-r w-1/3">Screen</th>
                          <th className="py-2.5 px-4">What you do there</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y text-slate-655 divide-slate-100">
                        <tr>
                          <td className="py-2 px-4 border-r font-bold text-slate-800">Dashboard</td>
                          <td className="py-2 px-4 text-slate-450">Fleet counts, students using transport, vehicle inventory & status, live fleet map.</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 border-r font-bold text-slate-800">Manage Vehicles</td>
                          <td className="py-2 px-4 text-slate-450 font-semibold">Add buses, driver details & login, capacity, tracking toggle and API token.</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 border-r font-bold text-slate-800">Manage Routes</td>
                          <td className="py-2 px-4 text-slate-455">Create routes, attach a vehicle, add ordered stops with fares and times, assign students.</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 border-r font-bold text-slate-800">Live Tracking</td>
                          <td className="py-2 px-4 text-slate-455">Follow a vehicle on the map; trip timeline replays a past day.</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 border-r font-bold text-slate-800">Boarding Register</td>
                          <td className="py-2 px-4 text-slate-455">What happened on the buses on a chosen day — runs, who boarded, where and when. CSV export, and the one-click attendance shortcut.</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 border-r font-bold text-slate-800">Drivers</td>
                          <td className="py-2 px-4 text-slate-455">Driver records, Driver ID & PIN, bus assignment, QR enrolment and device revoke.</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 border-r font-bold text-slate-800">Live Operations</td>
                          <td className="py-2 px-4 text-slate-455">Today's runs — late starts, declined runs and buses that have stopped reporting.</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 border-r font-bold text-slate-800">Documents</td>
                          <td className="py-2 px-4 text-slate-455 font-semibold">Insurance, fitness, permit and PUC expiry across the fleet, with reminders.</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 border-r font-bold text-slate-800 font-semibold">Fee Settings</td>
                          <td className="py-2 px-4 text-slate-455">The transport fee profile that drives automatic fee generation.</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 border-r font-bold text-slate-800">Student Transport Report</td>
                          <td className="py-2 px-4 text-slate-455">Under <strong>Reports</strong> — who travels on which route/stop, with PDF and Excel export.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Column 2: Access & related pieces */}
                <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs space-y-4">
                  <div className="flex items-center gap-2 text-indigo-650 font-bold border-b pb-2">
                    <span>👤</span>
                    <h3 className="text-slate-855 text-xs uppercase tracking-wider">Access & related pieces</h3>
                  </div>

                  <div className="border border-slate-100 rounded-none overflow-hidden text-[11px] font-semibold text-slate-650">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider">
                          <th className="py-2.5 px-4 border-r w-1/3">Item</th>
                          <th className="py-2.5 px-4">Notes</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y text-slate-655 divide-slate-100">
                        <tr>
                          <td className="py-2 px-4 border-r font-bold text-slate-800 text-red-600 font-mono">transport.manage</td>
                          <td className="py-2 px-4 text-slate-455">Fleet, routes, assignments, tracking, Live Operations and the Boarding Register.</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 border-r font-bold text-slate-800 text-red-655 font-mono">transport.drivers.manage</td>
                          <td className="py-2 px-4 text-slate-455 font-semibold">Separate. Only this grants the Drivers page — creating drivers, reissuing setup QRs, resetting PINs and signing devices out.</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 border-r font-bold text-slate-800 font-semibold">Transport module</td>
                          <td className="py-2 px-4 text-slate-455">Must be enabled for your school, or the menu is hidden entirely.</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 border-r font-bold text-slate-800 font-semibold">Driver app</td>
                          <td className="py-2 px-4 text-slate-455">Separate app; signs in with the <strong>Driver ID and PIN</strong> from <strong>Transport → Drivers</strong>. Never the school email.</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 border-r font-bold text-slate-800 font-semibold font-semibold">Parent app</td>
                          <td className="py-2 px-4 text-slate-455">Shows the child's route, stop and the bus's live position.</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 border-r font-bold text-slate-800">Attendance</td>
                          <td className="py-2 px-4 text-slate-455">Boarding can be turned into <strong>Present</strong> marks for a day nobody took the register. Additive only — see section 6.</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 border-r font-bold text-slate-800 font-semibold">Finance & Fees</td>
                          <td className="py-2 px-4 text-slate-455">Transport fees appear there like any other fee — collect them on the normal fee screens.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="text-[10px] text-slate-450 font-semibold mt-1">
                    {"Grant both to your transport in-charge under Settings → Roles & Permissions. Give a clerk who only maintains routes and fares transport.manage alone — the Drivers tab then disappears for them rather than 403ing. There is no separate read-only transport role."}
                  </p>
                </div>

              </div>

            </div>
          )}

          {/* TAB CONTENT: MANAGE VEHICLES */}
          {activeTab === "Manage Vehicles" && (
            <div className="space-y-4 animate-in fade-in duration-150 text-slate-750">
              
              <div className="flex justify-end items-center">
                <button 
                  onClick={() => setViewMode("add-vehicle")}
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-none flex items-center gap-1.5 shadow-md cursor-pointer select-none active:scale-95 border-none"
                >
                  <Plus className="w-4 h-4 text-white" />
                  Add New Vehicle
                </button>
              </div>

              <div className="bg-white border border-slate-200 rounded-none overflow-hidden shadow-3xs space-y-4 p-5">
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-2">
                    <span>🏢</span>
                    <h3 className="font-bold text-slate-850 text-sm">All Vehicles</h3>
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
                    <span className="text-slate-455">Search:</span>
                    <input 
                      type="text" 
                      placeholder="Search vehicles..."
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
                        <th className="py-3 px-4 border-r">Vehicle Number</th>
                        <th className="py-3 px-4 border-r">Model</th>
                        <th className="py-3 px-4 border-r text-center">Capacity</th>
                        <th className="py-3 px-4 border-r">Driver</th>
                        <th className="py-3 px-4 border-r">Tracking</th>
                        <th className="py-3 px-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs text-slate-655 font-semibold">
                      {vehicles.map((v, idx) => (
                        <tr key={v.id} className="hover:bg-slate-50/10">
                          <td className="py-3 px-4 text-center border-r font-mono">{idx + 1}</td>
                          <td className="py-3 px-4 border-r font-bold text-slate-800">{v.vehicleNo}</td>
                          <td className="py-3 px-4 border-r text-slate-500">{v.model || "—"}</td>
                          <td className="py-3 px-4 border-r text-center font-bold text-slate-700">{v.capacity}</td>
                          <td className="py-3 px-4 border-r font-bold text-slate-700">
                            <div>{v.driver || v.driverName}</div>
                            <div className="text-[10px] text-slate-400 font-semibold">{v.phone || "—"}</div>
                          </td>
                          <td className="py-3 px-4 border-r font-bold">
                            <span className={`inline-block px-2.5 py-0.5 rounded-none text-[10px] font-extrabold border ${
                              v.tracking === "Enabled" 
                                ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                                : "bg-slate-100 text-slate-500 border-slate-200"
                            }`}>
                              {v.tracking || "Enabled"}
                            </span>
                          </td>
                          <td className="py-2.5 px-4 text-center">
                            <div className="flex items-center justify-center gap-1.5 text-slate-400">
                              <button onClick={() => alert("Edit mode is read-only in this demo...")} className="p-1 hover:text-indigo-600 rounded-none cursor-pointer border-none bg-transparent"><Eye className="w-3.5 h-3.5" /></button>
                              <button onClick={() => handleDeleteVehicle(v.id, v.vehicleNo)} className="p-1 hover:text-red-650 rounded-none cursor-pointer border-none bg-transparent"><Trash2 className="w-3.5 h-3.5" /></button>
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

          {/* TAB CONTENT: MANAGE ROUTES */}
          {activeTab === "Manage Routes" && (
            <div className="space-y-4 animate-in fade-in duration-150">

              {/* Action buttons row */}
              <div className="flex justify-end items-center gap-2">
                <button
                  type="button"
                  className="px-4 py-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-none flex items-center gap-1.5 cursor-pointer"
                >
                  ⚙️ Fee Settings
                </button>
                <button
                  onClick={() => setViewMode("add-route")}
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-none flex items-center gap-1.5 shadow-md cursor-pointer select-none active:scale-95 border-none"
                >
                  <Plus className="w-4 h-4" />
                  Add New Route
                </button>
              </div>

              <div className="bg-white border border-slate-200 rounded-none overflow-hidden shadow-3xs p-5 space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-2">
                    <span>🚌</span>
                    <h3 className="font-bold text-slate-850 text-sm">All Transport Routes</h3>
                  </div>
                </div>

                {/* Datatable controls */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-semibold">
                  <div className="flex items-center gap-2 text-slate-500">
                    <span>Show</span>
                    <select className="border border-slate-200 bg-white rounded-none px-2 py-1 text-slate-800">
                      <option>10</option><option>25</option>
                    </select>
                    <span>entries</span>
                    <div className="flex border border-slate-200 rounded-none overflow-hidden divide-x ml-2 text-[10px] font-bold text-slate-600">
                      <button type="button" className="px-2.5 py-1 hover:bg-slate-50 cursor-pointer border-none bg-white">CSV</button>
                      <button type="button" className="px-2.5 py-1 hover:bg-slate-50 cursor-pointer border-none bg-white">Excel</button>
                      <button type="button" className="px-2.5 py-1 hover:bg-slate-50 cursor-pointer border-none bg-white">PDF</button>
                      <button type="button" className="px-2.5 py-1 hover:bg-slate-50 cursor-pointer border-none bg-white">🖨</button>
                      <button type="button" className="px-2.5 py-1 hover:bg-slate-50 cursor-pointer border-none bg-white">⊞ Columns ▾</button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-455">Search:</span>
                    <input type="text" placeholder="Search routes..." className="border border-slate-300 bg-white rounded-none px-3 py-1.5 text-slate-800 text-xs font-semibold focus:outline-none focus:border-indigo-600" />
                  </div>
                </div>

                {/* Routes table */}
                <div className="overflow-x-auto border border-slate-100 rounded-none">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-indigo-50 border-b border-slate-200 text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider">
                        <th className="py-3 px-4 border-r w-10 text-center">#</th>
                        <th className="py-3 px-4 border-r">Route Name</th>
                        <th className="py-3 px-4 border-r">Assigned Vehicle</th>
                        <th className="py-3 px-4 border-r text-right">Fare</th>
                        <th className="py-3 px-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs font-semibold">
                      {routes.map((r, idx) => (
                        <tr key={r.id} className="hover:bg-slate-50/10">
                          <td className="py-3 px-4 border-r text-center text-slate-500 font-mono">{idx + 1}</td>
                          <td className="py-3 px-4 border-r font-bold text-indigo-600 hover:underline cursor-pointer">{r.name}</td>
                          <td className="py-3 px-4 border-r">
                            {r.vehicle
                              ? <span className="text-indigo-500 font-bold font-mono">{r.vehicle}</span>
                              : <span className="text-slate-400 italic font-semibold">Not assigned</span>
                            }
                          </td>
                          <td className="py-3 px-4 border-r text-right font-bold text-slate-700 font-mono">₹{r.fare.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                          <td className="py-2.5 px-4">
                            <div className="flex items-center justify-center gap-2">
                              <button className="flex items-center gap-1 px-2.5 py-1 border border-slate-200 hover:bg-slate-50 text-slate-655 text-[10px] font-bold rounded-none cursor-pointer bg-white">
                                🎓 Students &amp; Stops
                              </button>
                              <button className="p-1 hover:text-indigo-600 text-slate-400 rounded-none cursor-pointer border-none bg-transparent"><Eye className="w-3.5 h-3.5" /></button>
                              <button onClick={() => setRoutes(prev => prev.filter(x => x.id !== r.id))} className="p-1 hover:text-red-600 text-slate-400 rounded-none cursor-pointer border-none bg-transparent"><Trash2 className="w-3.5 h-3.5" /></button>
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

          {/* TAB CONTENT: LIVE TRACKING */}
          {activeTab === "Live Tracking" && (
            <div className="space-y-4 animate-in fade-in duration-150 text-slate-750">

              {/* Header row with Trip Timeline button */}
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-bold text-slate-800 text-sm">Select a vehicle to track</h2>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Only buses with tracking switched on appear here</p>
                </div>
                <button
                  onClick={() => { setTimelineViewed(false); setViewMode("trip-timeline"); }}
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-none flex items-center gap-1.5 shadow-md cursor-pointer select-none border-none active:scale-95 transition-all"
                >
                  🚌 Trip Timeline
                </button>
              </div>

              {/* Vehicle list table */}
              <div className="bg-white border border-slate-200 rounded-none overflow-hidden shadow-3xs">
                <div className="overflow-x-auto border border-slate-100 rounded-none">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-indigo-50 border-b border-slate-200 text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider">
                        <th className="py-3 px-5 border-r w-10 text-center">#</th>
                        <th className="py-3 px-5 border-r">Bus</th>
                        <th className="py-3 px-5 border-r">Driver</th>
                        <th className="py-3 px-5 border-r">Reporting</th>
                        <th className="py-3 px-5 border-r">Trip</th>
                        <th className="py-3 px-5 text-center">Track</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs font-semibold">
                      {vehicles.filter(v => v.tracking === "Enabled" || v.tracking === undefined).map((v, idx) => {
                        const isOnTrip = v.vehicleNo === "CG04HD7250" || v.vehicleNo === "CG04AB1234";
                        const reportingText = v.vehicleNo === "CG04HD7250" ? "370m ago" : "Never reported";
                        const isLate = v.vehicleNo === "CG04HD7250";
                        return (
                          <tr key={v.id} className="hover:bg-slate-50/5">
                            <td className="py-3.5 px-5 border-r text-center text-slate-500 font-mono">{idx + 1}</td>
                            <td className="py-3.5 px-5 border-r">
                              <div className="font-bold text-indigo-600 hover:underline cursor-pointer">{v.vehicleNo}</div>
                              <div className="text-[10px] text-slate-400 font-semibold mt-0.5">{v.model || "Bus"}</div>
                            </td>
                            <td className="py-3.5 px-5 border-r font-bold text-slate-700">
                              {v.driver || v.driverName || "—"}
                            </td>
                            <td className="py-3.5 px-5 border-r">
                              <span className={`font-bold text-[11px] ${isLate ? "text-orange-500" : "text-slate-400"}`}>
                                {reportingText}
                              </span>
                            </td>
                            <td className="py-3.5 px-5 border-r">
                              {isOnTrip
                                ? <span className="bg-indigo-100 text-indigo-600 border border-indigo-200 text-[10px] font-extrabold px-2.5 py-0.5 rounded-none">On a trip</span>
                                : <span className="text-slate-400 font-bold">—</span>
                              }
                            </td>
                            <td className="py-2.5 px-5 text-center">
                              <button className="flex items-center gap-1 px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-[10px] font-bold rounded-none cursor-pointer bg-white mx-auto">
                                📍 Track
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: LIVE OPERATIONS */}
          {activeTab === "Live Operations" && (
            <div className="space-y-4 animate-in fade-in duration-150 text-slate-750">

              {/* Header + Fleet Map btn */}
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-bold text-slate-800 text-sm">Live Operations</h2>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Today's runs, delays and silent buses</p>
                </div>
                <button className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-none flex items-center gap-1.5 cursor-pointer shadow-sm">
                  🚌 Fleet map
                </button>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-4 lg:grid-cols-7 gap-3 text-xs font-semibold">
                {[
                  { label: "Buses", value: vehicles.length, bold: true },
                  { label: "Running now", value: 0, color: "text-slate-400" },
                  { label: "Completed", value: 0, color: "text-slate-400" },
                  { label: "Not started", value: 0, color: "text-slate-400" },
                  { label: "No signal", value: 0, color: "text-slate-400" },
                  { label: "Not running", value: 0, color: "text-slate-400" },
                  { label: "Open incidents", value: 0, color: "text-slate-400", wide: true },
                ].map((s, i) => (
                  <div key={i} className={`bg-white border border-slate-200 rounded-none p-4 shadow-3xs space-y-1 ${s.wide ? "lg:col-span-1" : ""}`}>
                    <div className={`text-xl font-black ${s.color || "text-slate-800"}`}>{s.value}</div>
                    <div className="text-[10px] text-slate-400 font-semibold">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Buses Table */}
              <div className="bg-white border border-slate-200 rounded-none overflow-hidden shadow-3xs">
                <div className="flex items-center justify-between px-5 py-3 border-b">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                    <Bus className="w-4 h-4 text-indigo-500" />
                    <span>Buses</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold">Updated {new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-indigo-50 border-b border-slate-200 text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider">
                        <th className="py-3 px-5 border-r">Bus</th>
                        <th className="py-3 px-5 border-r">Run</th>
                        <th className="py-3 px-5 border-r">Driver</th>
                        <th className="py-3 px-5 border-r">Started</th>
                        <th className="py-3 px-5 border-r">Delay</th>
                        <th className="py-3 px-5 border-r">Last Ping</th>
                        <th className="py-3 px-5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs font-semibold">
                      {vehicles.map((v) => (
                        <tr key={v.id} className="hover:bg-slate-50/5">
                          <td className="py-3 px-5 border-r font-bold text-slate-800">{v.vehicleNo}</td>
                          <td className="py-3 px-5 border-r text-slate-400">—</td>
                          <td className="py-3 px-5 border-r text-slate-400">—</td>
                          <td className="py-3 px-5 border-r text-slate-400">—</td>
                          <td className="py-3 px-5 border-r text-slate-400">—</td>
                          <td className="py-3 px-5 border-r">
                            {v.vehicleNo === "CG04HD7250"
                              ? <span className="text-orange-500 font-bold">377 min ago</span>
                              : <span className="text-slate-400">—</span>
                            }
                          </td>
                          <td className="py-2.5 px-5">
                            {v.tracking === "Disabled"
                              ? <span className="text-[10px] font-bold text-slate-400">Tracking off</span>
                              : <span className="bg-slate-100 text-slate-500 border border-slate-200 text-[10px] font-extrabold px-2.5 py-0.5 rounded-none">Idle</span>
                            }
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: DRIVERS */}
          {activeTab === "Drivers" && (
            <div className="space-y-4 animate-in fade-in duration-150 text-slate-750">

              {/* Header */}
              <div className="flex justify-between items-center">
                <div className="flex items-baseline gap-2">
                  <h2 className="font-bold text-slate-800 text-sm">Drivers</h2>
                  <span className="text-[10px] text-slate-400 font-semibold">{drivers.length} total</span>
                </div>
                <button
                  onClick={() => setViewMode("add-driver")}
                  className="px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-none flex items-center gap-1.5 shadow-md cursor-pointer select-none border-none active:scale-95 transition-all"
                >
                  <Plus className="w-4 h-4" /> Add driver
                </button>
              </div>

              {/* Filter tabs */}
              <div className="flex items-center gap-5 border-b border-slate-200 text-xs font-bold">
                {["All", "Active", "Suspended", "Left"].map((f) => {
                  const count = f === "All" ? drivers.length : f === "Active" ? drivers.filter(d => d.status === "Active").length : 0;
                  return (
                    <button
                      key={f}
                      onClick={() => setDriverFilter(f)}
                      className={`pb-2.5 border-b-2 cursor-pointer bg-transparent border-none text-xs font-bold transition-colors ${
                        driverFilter === f ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      {f} {count}
                    </button>
                  );
                })}
              </div>

              {/* Search bar */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={driverSearch}
                  onChange={(e) => setDriverSearch(e.target.value)}
                  placeholder="Name, mobile number or Driver ID..."
                  className="flex-1 px-4 py-2.5 border border-slate-300 rounded-none text-xs font-semibold focus:outline-none focus:border-indigo-600 bg-white"
                />
                <button className="px-4 py-2.5 bg-teal-500 hover:bg-teal-600 text-white text-xs font-bold rounded-none cursor-pointer border-none">
                  Search
                </button>
              </div>

              {/* Drivers table */}
              <div className="bg-white border border-slate-200 rounded-none overflow-hidden shadow-3xs">
                <div className="flex items-center justify-between px-5 py-3 border-b">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                    <Users className="w-4 h-4 text-indigo-500" />
                    <span>Drivers</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold">{drivers.length} total</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-indigo-50 border-b border-slate-200 text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider">
                        <th className="py-3 px-5 border-r w-10 text-center">#</th>
                        <th className="py-3 px-5 border-r">Driver</th>
                        <th className="py-3 px-5 border-r">Driver ID</th>
                        <th className="py-3 px-5 border-r">Mobile Number</th>
                        <th className="py-3 px-5 border-r">Licence</th>
                        <th className="py-3 px-5 border-r">Devices</th>
                        <th className="py-3 px-5 border-r">Status</th>
                        <th className="py-3 px-5 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs font-semibold">
                      {drivers
                        .filter(d => driverFilter === "All" || d.status === driverFilter)
                        .filter(d => !driverSearch || d.name.toLowerCase().includes(driverSearch.toLowerCase()) || d.mobile.includes(driverSearch) || d.driverId.includes(driverSearch))
                        .map((d, idx) => (
                        <tr key={d.id} className="hover:bg-slate-50/5">
                          <td className="py-3.5 px-5 border-r text-center text-slate-500 font-mono">{idx + 1}</td>
                          <td className="py-3.5 px-5 border-r">
                            <div className="font-bold text-orange-500 hover:underline cursor-pointer">{d.name}</div>
                            {d.lastSeen && <div className="text-[10px] text-slate-400 font-semibold mt-0.5">Last signed in {d.lastSeen}</div>}
                          </td>
                          <td className="py-3.5 px-5 border-r">
                            <div className="font-bold text-slate-800 font-mono">{d.driverId}</div>
                            <div className="text-[10px] text-indigo-500 font-semibold mt-0.5">Setup pending</div>
                          </td>
                          <td className="py-3.5 px-5 border-r font-bold text-slate-700 font-mono">{d.mobile}</td>
                          <td className="py-3.5 px-5 border-r">
                            {d.licence
                              ? <div>
                                  <div className="font-bold text-slate-800">{d.licence}</div>
                                  {d.licenceExpiry && <div className="text-[10px] text-slate-400 font-semibold">Valid till {d.licenceExpiry}</div>}
                                </div>
                              : <span className="text-slate-400">—</span>
                            }
                          </td>
                          <td className="py-3.5 px-5 border-r font-bold text-slate-700">{d.devices ?? "—"}</td>
                          <td className="py-3.5 px-5 border-r">
                            <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-extrabold px-2.5 py-0.5 rounded-none">{d.status}</span>
                          </td>
                          <td className="py-2.5 px-5">
                            <div className="flex items-center justify-center gap-2 text-slate-400">
                              <button className="p-1 hover:text-indigo-600 cursor-pointer border-none bg-transparent">⊞</button>
                              <button className="p-1 hover:text-indigo-600 cursor-pointer border-none bg-transparent"><Eye className="w-3.5 h-3.5" /></button>
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

          {/* TAB CONTENT: BOARDING REGISTER */}
          {activeTab === "Boarding Register" && (
            <div className="space-y-4 animate-in fade-in duration-150 text-slate-750">

              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-bold text-slate-800 text-sm">Boarding Register</h2>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Who the drivers recorded on the bus, run by run</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-none cursor-pointer flex items-center gap-1.5">
                    📋 Export CSV
                  </button>
                  <button
                    onClick={() => { setTimelineViewed(false); setViewMode("trip-timeline"); }}
                    className="px-3 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-none cursor-pointer flex items-center gap-1.5"
                  >
                    🚌 Trip Timeline
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end text-xs font-semibold">
                  <div className="space-y-1.5">
                    <label className="text-slate-600 font-bold">Date</label>
                    <input type="date" value={brDate} onChange={(e) => { setBrDate(e.target.value); setBrViewed(false); }} className="w-full px-3 py-2.5 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-slate-600 font-bold">Route</label>
                    <select value={brRoute} onChange={(e) => { setBrRoute(e.target.value); setBrViewed(false); }} className="w-full px-3 py-2.5 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white">
                      <option>All routes</option>
                      {routes.map(r => <option key={r.id}>{r.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-slate-600 font-bold">Vehicle</label>
                    <select value={brVehicle} onChange={(e) => { setBrVehicle(e.target.value); setBrViewed(false); }} className="w-full px-3 py-2.5 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white">
                      <option>All vehicles</option>
                      {vehicles.map(v => <option key={v.id}>{v.vehicleNo}</option>)}
                    </select>
                  </div>
                  <button
                    onClick={() => setBrViewed(true)}
                    className="w-full px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-none cursor-pointer border-none shadow active:scale-95 transition-all flex items-center justify-center gap-1.5"
                  >
                    🔍 View Register
                  </button>
                </div>

                {/* Stats cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: "🚌", label: "Runs", value: 0 },
                    { icon: "👥", label: "Students on board", value: 0 },
                    { icon: "❌", label: "Marked absent by driver", value: 0 },
                    { icon: "📋", label: "Students recorded", value: 0 },
                  ].map((s, i) => (
                    <div key={i} className="border border-slate-200 rounded-none p-4 flex items-center gap-3 bg-slate-50/30">
                      <div className="w-9 h-9 rounded-none bg-indigo-50 flex items-center justify-center text-base">{s.icon}</div>
                      <div>
                        <div className="text-xl font-black text-slate-700">{s.value}</div>
                        <div className="text-[10px] text-slate-400 font-semibold">{s.label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Empty state */}
                <div className="flex flex-col items-center justify-center py-14 space-y-3">
                  <div className="w-12 h-12 rounded-none bg-indigo-50 flex items-center justify-center text-2xl">🚌</div>
                  <h3 className="font-bold text-slate-700 text-sm">No runs on {new Date(brDate + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</h3>
                  <p className="text-[11px] text-slate-400 font-semibold text-center max-w-xs">
                    A run appears here once a driver starts a trip in the driver app. If you expected one, check{" "}
                    <button onClick={() => setActiveTab("Live Operations")} className="text-orange-500 hover:underline cursor-pointer bg-transparent border-none font-bold">Live Operations</button>.
                  </p>
                </div>
              </div>
            </div>
          )}

        </>
      )}

      {/* ─── ADD VEHICLE SUB-VIEW ─── */}
      {viewMode === "add-vehicle" && (
        <div className="space-y-5 animate-in fade-in duration-200">
          
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-850 tracking-tight">Add New Vehicle</h1>
              <p className="text-slate-450 text-xs font-semibold">Register a vehicle, its driver, and how it reports its location</p>
            </div>
            <button 
              onClick={() => setViewMode("dashboard")}
              className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-655 text-xs font-bold rounded-none cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleAddVehicleSubmit} className="space-y-5 text-xs font-semibold text-slate-750">
            
            {/* Section 1: Vehicle Details */}
            <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs space-y-4">
              <div className="border-b pb-2 flex items-center gap-1.5 text-indigo-650 font-bold uppercase tracking-wider text-[10px]">
                <Bus className="w-4 h-4 text-indigo-600" />
                Vehicle Details
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-600">Vehicle Number / Name *</label>
                  <input 
                    type="text" 
                    value={vehicleNo}
                    onChange={(e) => setVehicleNo(e.target.value)}
                    placeholder="e.g., CG04HD7250"
                    className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-600">Vehicle Model</label>
                  <input 
                    type="text" 
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value)}
                    placeholder="e.g., Van"
                    className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-600">Seating Capacity</label>
                  <input 
                    type="text" 
                    value={seatingCapacity}
                    onChange={(e) => setSeatingCapacity(e.target.value)}
                    placeholder="e.g. 50"
                    className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-600">Driver Name</label>
                  <input 
                    type="text" 
                    value={driverName}
                    onChange={(e) => setDriverName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-600">Driver Mobile Number</label>
                  <input 
                    type="text" 
                    value={driverPhone}
                    onChange={(e) => setDriverPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Driver App Credentials */}
            <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs space-y-4">
              <div className="border-b pb-2 flex items-center gap-1.5 text-indigo-650 font-bold uppercase tracking-wider text-[10px]">
                <Key className="w-4 h-4 text-indigo-600" />
                Driver App Credentials
              </div>

              <div className="bg-indigo-50 border border-indigo-100 rounded-none p-3 text-[11px] text-indigo-750 font-bold flex items-center gap-2">
                <Info className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>The driver signs in to the app with the <strong>Vehicle Number</strong> as the username and the password you set here.</span>
              </div>

              <div className="space-y-1 max-w-md">
                <label className="text-slate-600">Set Driver Password</label>
                <input 
                  type="password" 
                  value={driverPassword}
                  onChange={(e) => setDriverPassword(e.target.value)}
                  placeholder="Set a password for app login"
                  className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white"
                />
              </div>
            </div>

            {/* Section 3: GPS Tracking Settings */}
            <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs space-y-4">
              <div className="border-b pb-2 flex items-center gap-1.5 text-indigo-650 font-bold uppercase tracking-wider text-[10px]">
                <Wifi className="w-4 h-4 text-indigo-600" />
                GPS Tracking Settings
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-slate-600">GPS Device IMEI (optional if using the app)</label>
                  <input 
                    type="text" 
                    value={imei}
                    onChange={(e) => setImei(e.target.value)}
                    placeholder="Enter unique 15-digit ID of the tracker"
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-600">API Token *</label>
                  <div className="flex">
                    <input 
                      type="text" 
                      value={apiToken}
                      onChange={(e) => setApiToken(e.target.value)}
                      placeholder="Click Generate to create a secure token"
                      className="flex-grow px-3 py-2.5 border border-r-0 border-slate-300 rounded-l-lg focus:outline-none focus:border-indigo-600 bg-slate-50 font-mono text-[11px]"
                      required
                      readOnly
                    />
                    <button 
                      type="button" 
                      onClick={handleGenerateToken}
                      className="px-4 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 font-extrabold rounded-r-lg cursor-pointer bg-white"
                    >
                      Generate
                    </button>
                  </div>
                  <p className="text-[9px] text-slate-400 font-semibold mt-0.5">Required for both hardware GPS and the Driver App.</p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 text-[11px]">
                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={liveTrackingEnabled} 
                    onChange={(e) => setLiveTrackingEnabled(e.target.checked)}
                    className="sr-only peer" 
                  />
                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-none peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-none after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-500"></div>
                  <span className="ml-2.5 text-slate-655 font-bold">Enable live tracking for this vehicle</span>
                </label>
              </div>
            </div>

            {/* Note Section */}
            <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs space-y-2">
              <div className="border-b pb-2 flex items-center gap-1.5 text-indigo-650 font-bold uppercase tracking-wider text-[10px]">
                <FileText className="w-4 h-4" />
                Note
              </div>
              <textarea 
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows="3"
                className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white"
                placeholder="Additional specifications or compliance dates..."
              />
            </div>

            {/* Form actions */}
            <div className="flex justify-end gap-2 text-xs font-bold pt-2">
              <button 
                type="button" 
                onClick={() => setViewMode("dashboard")} 
                className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 rounded-none cursor-pointer text-slate-700"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-none cursor-pointer border-none shadow active:scale-95 transition-all"
              >
                Create Vehicle
              </button>
            </div>

          </form>
        </div>
      )}

      {/* ─── ADD NEW ROUTE SUB-VIEW ─── */}
      {viewMode === "add-route" && (
        <div className="space-y-5 animate-in fade-in duration-200 text-slate-750">

          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-slate-850 tracking-tight">Add New Transport Route</h1>
            <p className="text-slate-450 text-xs font-semibold mt-0.5">Name the route and set its fare; stops and students are added afterwards</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">

            {/* Main Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleAddRoute} className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs space-y-5 text-xs font-semibold">
                
                <div className="border-b pb-2 flex items-center gap-1.5 text-indigo-600 font-bold uppercase tracking-wider text-[10px]">
                  <Bus className="w-4 h-4" />
                  Route Details
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Route Name */}
                  <div className="space-y-1">
                    <label className="text-slate-600">Route Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={newRouteName}
                      onChange={(e) => setNewRouteName(e.target.value)}
                      placeholder="e.g., Raipur"
                      required
                      className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white"
                    />
                  </div>

                  {/* Fare */}
                  <div className="space-y-1">
                    <label className="text-slate-600">Fare <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-slate-500 font-bold">₹</span>
                      <input
                        type="number"
                        value={newRouteFare}
                        onChange={(e) => setNewRouteFare(e.target.value)}
                        required
                        className="w-full pl-7 pr-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white"
                      />
                    </div>
                  </div>

                  {/* Assign Vehicle (optional) */}
                  <div className="space-y-1">
                    <label className="text-slate-600">Assign Vehicle <span className="text-slate-400 font-normal">(optional)</span></label>
                    <select
                      value={newRouteVehicle}
                      onChange={(e) => setNewRouteVehicle(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white"
                    >
                      <option value="None">None</option>
                      {vehicles.map(v => (
                        <option key={v.id} value={v.vehicleNo}>{v.vehicleNo}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => { setViewMode("dashboard"); setActiveTab("Manage Routes"); }}
                    className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 rounded-none cursor-pointer text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-none cursor-pointer border-none shadow active:scale-95 transition-all flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Create Route
                  </button>
                </div>

              </form>
            </div>

            {/* Right Tip Card */}
            <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs space-y-3 text-xs font-semibold">
              <div className="flex items-center gap-2 text-indigo-600 font-bold border-b pb-2">
                <span>💡</span>
                <h3 className="uppercase tracking-wider text-[10px]">Setting up a route</h3>
              </div>
              <ul className="space-y-2.5 text-slate-500 list-disc list-inside leading-relaxed pl-1">
                <li><strong className="text-slate-700">Fare</strong> is the amount charged per student assigned to this route.</li>
                <li><strong className="text-slate-700">Vehicle</strong> is optional here — you can create the route first and assign a bus later.</li>
                <li><strong className="text-slate-700">Stops and students</strong> are managed from the route's own page once it exists.</li>
              </ul>
            </div>

          </div>
        </div>
      )}

      {/* ─── TRIP TIMELINE SUB-VIEW ─── */}
      {viewMode === "trip-timeline" && (
        <div className="space-y-5 animate-in fade-in duration-200 text-slate-750">

          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>🚌</span>
              <h1 className="text-xl font-bold text-slate-850 tracking-tight">Trip Timeline</h1>
            </div>
            <button
              onClick={() => { setViewMode("dashboard"); setActiveTab("Live Tracking"); navigate("/transport/live-tracking"); }}
              className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-none flex items-center gap-1.5 cursor-pointer"
            >
              ← Back to Tracking
            </button>
          </div>

          {/* Filter Controls */}
          <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end text-xs font-semibold">
              
              {/* Vehicle Selector */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-slate-600 font-bold">
                  <Bus className="w-3.5 h-3.5 text-slate-500" /> Vehicle
                </label>
                <select
                  value={timelineVehicle}
                  onChange={(e) => { setTimelineVehicle(e.target.value); setTimelineViewed(false); }}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white"
                >
                  <option value="">-- Select Vehicle --</option>
                  {vehicles.map(v => (
                    <option key={v.id} value={v.vehicleNo}>{v.vehicleNo} — {v.model}</option>
                  ))}
                </select>
              </div>

              {/* Date Picker */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-slate-600 font-bold">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" /> Date
                </label>
                <input
                  type="date"
                  value={timelineDate}
                  onChange={(e) => { setTimelineDate(e.target.value); setTimelineViewed(false); }}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white"
                />
              </div>

              {/* View Button */}
              <button
                onClick={() => { if (timelineVehicle) setTimelineViewed(true); }}
                className="w-full px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-none flex items-center justify-center gap-1.5 cursor-pointer border-none shadow active:scale-95 transition-all"
              >
                🔍 View Timeline
              </button>

            </div>

            {/* Timeline Results */}
            {!timelineViewed ? (
              <div className="flex flex-col items-center justify-center py-16 text-slate-400 space-y-3">
                <svg className="w-12 h-12 text-slate-300" viewBox="0 0 48 48" fill="none">
                  <path d="M24 4C13 4 4 13 4 24s9 20 20 20 20-9 20-20S35 4 24 4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M24 14v10l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <h3 className="font-bold text-slate-600 text-sm">Select a vehicle and date to view trip history</h3>
                <p className="text-[11px] text-slate-400 font-semibold">View the complete journey of any school bus on any date — like Google Timeline</p>
              </div>
            ) : (
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-650 border-b pb-3">
                  <Bus className="w-4 h-4 text-indigo-600" />
                  <span>Trip history for <strong className="text-indigo-600">{timelineVehicle}</strong> on <strong>{timelineDate}</strong></span>
                </div>

                {/* Timeline Events */}
                <div className="relative pl-6 space-y-0">
                  {[
                    { time: "07:15 AM", event: "Vehicle started", stop: "School Campus Depot", status: "start", color: "bg-emerald-500" },
                    { time: "07:32 AM", event: "Stop reached", stop: "Shankar Nagar Square", status: "stop", color: "bg-indigo-500" },
                    { time: "07:48 AM", event: "Stop reached", stop: "Telibandha Gate", status: "stop", color: "bg-indigo-500" },
                    { time: "08:05 AM", event: "Stop reached", stop: "Raipur Station", status: "stop", color: "bg-indigo-500" },
                    { time: "08:21 AM", event: "Arrived at school", stop: "YUG School Main Gate", status: "end", color: "bg-orange-500" },
                    { time: "02:10 PM", event: "Return trip started", stop: "YUG School Main Gate", status: "start", color: "bg-emerald-500" },
                    { time: "02:35 PM", event: "Stop reached", stop: "Raipur Station", status: "stop", color: "bg-indigo-500" },
                    { time: "02:52 PM", event: "Stop reached", stop: "Telibandha Gate", status: "stop", color: "bg-indigo-500" },
                    { time: "03:07 PM", event: "Trip completed", stop: "Shankar Nagar Square", status: "end", color: "bg-orange-500" },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 pb-6 relative">
                      {/* Vertical line */}
                      <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-200"></div>
                      {/* Dot */}
                      <div className={`w-3 h-3 rounded-none ${item.color} border-2 border-white shadow z-10 shrink-0 mt-0.5 -ml-1.5`}></div>
                      {/* Content */}
                      <div className="flex-1 -mt-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-[10px] text-slate-400 font-bold">{item.time}</span>
                          <span className="text-xs font-bold text-slate-800">{item.event}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-semibold mt-0.5">{item.stop}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── ADD DRIVER SUB-VIEW ─── */}
      {viewMode === "add-driver" && (
        <div className="space-y-5 animate-in fade-in duration-200 text-slate-750">

          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-850 tracking-tight">Add driver</h1>
              <p className="text-slate-450 text-xs font-semibold mt-0.5">Issues a Driver ID and a setup QR</p>
            </div>
            <button
              onClick={() => { setViewMode("dashboard"); setActiveTab("Drivers"); }}
              className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-none flex items-center gap-1.5 cursor-pointer"
            >
              ← Back to drivers
            </button>
          </div>

          {/* Info banner */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-none px-4 py-3 text-[11px] text-indigo-700 font-semibold flex items-start gap-2">
            <span className="mt-0.5 shrink-0">ℹ️</span>
            <span>A unique <strong>Driver ID</strong> is generated automatically when you save. The driver signs in with that ID and a PIN they choose themselves by scanning a setup QR — they are never given the school's email address.</span>
          </div>

          <form onSubmit={handleAddDriver} className="space-y-4">

            {/* ── DRIVER DETAILS SECTION ── */}
            <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs space-y-4 text-xs font-semibold">
              <div className="border-b pb-2 flex items-center gap-1.5 text-slate-700 font-bold text-[11px] uppercase tracking-wider">
                <Users className="w-4 h-4 text-indigo-500" />
                Driver details
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1 space-y-1.5">
                  <label className="text-slate-600">Driver name <span className="text-red-500">*</span></label>
                  <input type="text" value={newDriver.name} onChange={(e) => setNewDriver(p => ({ ...p, name: e.target.value }))} required className="w-full px-3 py-2.5 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-600">Mobile number</label>
                  <input type="tel" value={newDriver.mobile} onChange={(e) => setNewDriver(p => ({ ...p, mobile: e.target.value }))} className="w-full px-3 py-2.5 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-600">Alternate mobile number</label>
                  <input type="tel" value={newDriver.altMobile} onChange={(e) => setNewDriver(p => ({ ...p, altMobile: e.target.value }))} className="w-full px-3 py-2.5 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-600">Licence number</label>
                  <input type="text" value={newDriver.licence} onChange={(e) => setNewDriver(p => ({ ...p, licence: e.target.value }))} className="w-full px-3 py-2.5 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-600">Licence valid till</label>
                  <input type="date" value={newDriver.licenceValid} onChange={(e) => setNewDriver(p => ({ ...p, licenceValid: e.target.value }))} className="w-full px-3 py-2.5 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-600">Blood group</label>
                  <input type="text" value={newDriver.bloodGroup} onChange={(e) => setNewDriver(p => ({ ...p, bloodGroup: e.target.value }))} placeholder="e.g., O+" className="w-full px-3 py-2.5 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-600">Emergency contact</label>
                  <input type="tel" value={newDriver.emergency} onChange={(e) => setNewDriver(p => ({ ...p, emergency: e.target.value }))} className="w-full px-3 py-2.5 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-600">Address</label>
                <textarea value={newDriver.address} onChange={(e) => setNewDriver(p => ({ ...p, address: e.target.value }))} rows={3} className="w-full px-3 py-2.5 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white resize-none" />
              </div>
            </div>

            {/* ── BUS & APP ACCESS SECTION ── */}
            <div className="bg-white border border-slate-200 rounded-none p-5 shadow-3xs space-y-4 text-xs font-semibold">
              <div className="border-b pb-2 flex items-center gap-1.5 text-slate-700 font-bold text-[11px] uppercase tracking-wider">
                <Bus className="w-4 h-4 text-indigo-500" />
                Bus &amp; app access
              </div>

              {/* Assigned Bus */}
              <div className="space-y-1.5">
                <label className="text-slate-600">Assigned bus</label>
                <select value={newDriver.assignedBus} onChange={(e) => setNewDriver(p => ({ ...p, assignedBus: e.target.value }))} className="w-full px-3 py-2.5 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white">
                  <option value="">Not assigned yet</option>
                  {vehicles.map(v => <option key={v.id} value={v.vehicleNo}>{v.vehicleNo} — {v.model}</option>)}
                </select>
                <p className="text-[10px] text-slate-400 font-semibold">Location updates from this driver's phone are recorded against this bus. Without it the app can sign in but cannot send tracking.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-600">Status <span className="text-red-500">*</span></label>
                  <select value={newDriver.status} onChange={(e) => setNewDriver(p => ({ ...p, status: e.target.value }))} className="w-full px-3 py-2.5 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white">
                    <option>Active</option>
                    <option>Suspended</option>
                    <option>Left</option>
                  </select>
                  <p className="text-[10px] text-slate-400 font-semibold">Suspended or Left signs the driver out of every device immediately.</p>
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-600">Joined on</label>
                  <input type="date" value={newDriver.joinedOn} onChange={(e) => setNewDriver(p => ({ ...p, joinedOn: e.target.value }))} className="w-full px-3 py-2.5 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-600">Left on</label>
                  <input type="date" value={newDriver.leftOn} onChange={(e) => setNewDriver(p => ({ ...p, leftOn: e.target.value }))} className="w-full px-3 py-2.5 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-slate-600">App screen</label>
                  <select value={newDriver.appScreen} onChange={(e) => setNewDriver(p => ({ ...p, appScreen: e.target.value }))} className="w-full px-3 py-2.5 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white">
                    <option>Use school default</option>
                    <option>Boarding mode</option>
                    <option>Tracking only</option>
                  </select>
                  <p className="text-[10px] text-slate-400 font-semibold">Only change for a driver who needs something different.</p>
                </div>
              </div>

              {/* Note */}
              <div className="space-y-1.5">
                <label className="text-slate-600">Note</label>
                <textarea value={newDriver.note} onChange={(e) => setNewDriver(p => ({ ...p, note: e.target.value }))} rows={3} className="w-full px-3 py-2.5 border border-slate-300 rounded-none focus:outline-none focus:border-indigo-600 bg-white resize-none" />
              </div>

              {/* Action buttons */}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => { setViewMode("dashboard"); setActiveTab("Drivers"); }}
                  className="px-5 py-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-none cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-none cursor-pointer border-none shadow active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add driver
                </button>
              </div>
            </div>

          </form>
        </div>
      )}

    </div>
  );
}
