import React, { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { 
  Settings, 
  User, 
  Maximize2, 
  VideoOff, 
  Grid, 
  Trash2, 
  Filter, 
  RefreshCw, 
  Eye, 
  EyeOff, 
  Edit3,
  Calendar,
  AlertCircle,
  Video,
  FileText,
  Lock,
  Check,
  Save,
  Sliders,
  Clock
} from "lucide-react";

// Initial Camera feeds data matching Screenshots 1, 2, and 4
const INITIAL_CAMERAS = [
  { id: 1, name: "Fds", covers: "Common area", zone: "—", parents: "CLOSED", hours: "—", eyeVisible: false },
  { id: 2, name: "Nursery A", covers: "Nursery - A", zone: "Class Nursery A", parents: "CAN VIEW", hours: "01:00 – 23:50", eyeVisible: true },
  { id: 3, name: "IPCAMERA2", covers: "Common area", zone: "—", parents: "CLOSED", hours: "—", eyeVisible: false },
  { id: 4, name: "IPCAMERA3", covers: "Class I - A", zone: "—", parents: "CAN VIEW", hours: "03:53 – 15:53", eyeVisible: true },
  { id: 5, name: "IPCAMERA4", covers: "Common area", zone: "—", parents: "CLOSED", hours: "—", eyeVisible: false },
  { id: 6, name: "IPCAMERA5", covers: "Office Lobby", zone: "—", parents: "CAN VIEW", hours: "08:00 – 18:00", eyeVisible: true },
  { id: 7, name: "IPCAMERA6", covers: "Playground", zone: "Playground Area", parents: "CAN VIEW", hours: "08:00 – 16:30", eyeVisible: true },
  { id: 8, name: "IPCAMERA7", covers: "Gate 1 Entrance", zone: "Security Gate", parents: "CLOSED", hours: "—", eyeVisible: false }
];

// Initial mock CCTV access logs matching Screenshot 3
const INITIAL_ACCESS_LOGS = [
  { id: 1, started: "2026-08-23 10:15", camera: "IPCAMERA3 (Class I - A)", viewer: "Ramesh Patel (Parent)", child: "Diya Patel", duration: "12 mins", ip: "192.168.1.45", isParent: true },
  { id: 2, started: "2026-08-23 09:30", camera: "IPCAMERA2", viewer: "Admin Staff", child: "-", duration: "45 mins", ip: "192.168.1.10", isParent: false },
  { id: 3, started: "2026-08-22 14:20", camera: "Fds", viewer: "Principal Room", child: "-", duration: "1 hr 15 mins", ip: "192.168.1.12", isParent: false },
  { id: 4, started: "2026-08-22 11:05", camera: "IPCAMERA4", viewer: "Sunita Sharma (Parent)", child: "Aarav Sharma", duration: "5 mins", ip: "192.168.1.88", isParent: true },
  { id: 5, started: "2026-08-21 16:40", camera: "IPCAMERA5 (Office Lobby)", viewer: "Security Guard", child: "-", duration: "2 hrs 10 mins", ip: "192.168.1.14", isParent: false }
];

export default function CameraWall() {
  const location = useLocation();
  const [activeView, setActiveView] = useState("wall"); // "wall", "log", or "settings"
  const [layoutGrid, setLayoutGrid] = useState("2x2"); // "2x2", "3x3", or "4x4"
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (location.pathname === "/cctv/cameras") {
      setActiveView("settings");
    } else if (location.pathname === "/cctv/camera-wall") {
      setActiveView("wall");
    } else if (location.pathname === "/cctv/access-log") {
      setActiveView("log");
    }
  }, [location.pathname]);

  // Success Toast popups
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  // Cameras State
  const [cameras, setCameras] = useState(INITIAL_CAMERAS);

  // Camera Settings modal state
  const [configuringCamera, setConfiguringCamera] = useState(null);
  const [modalCovers, setModalCovers] = useState("Common area");
  const [modalZone, setModalZone] = useState("");
  const [modalParents, setModalParents] = useState("CLOSED");
  const [modalHours, setModalHours] = useState("");

  // Parent Policy Switch toggles
  const [allowViewLive, setAllowViewLive] = useState(true);
  const [requirePolicyAccept, setRequirePolicyAccept] = useState(true);

  // Filters State for Access Log
  const [cameraFilter, setCameraFilter] = useState("All cameras");
  const [viewerFilter, setViewerFilter] = useState("Anyone");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [activeLogs, setActiveLogs] = useState(INITIAL_ACCESS_LOGS);

  // Return limited cameras list depending on layout selection
  const visibleCameras = useMemo(() => {
    let limit = 4;
    if (layoutGrid === "3x3") limit = 9;
    if (layoutGrid === "4x4") limit = 16;
    
    // Fallback padding if cameras list is shorter than limit
    const list = [...cameras];
    while (list.length < limit) {
      const nextId = list.length + 1;
      list.push({
        id: nextId,
        name: `IPCAMERA${nextId}`,
        covers: "Common area",
        zone: "—",
        parents: "CLOSED",
        hours: "—",
        eyeVisible: false
      });
    }
    return list.slice(0, limit);
  }, [layoutGrid, cameras]);

  // Open edit modal for specific camera configuration
  const handleOpenConfig = (cam) => {
    setConfiguringCamera(cam);
    setModalCovers(cam.covers);
    setModalZone(cam.zone === "—" ? "" : cam.zone);
    setModalParents(cam.parents);
    setModalHours(cam.hours === "—" ? "" : cam.hours);
  };

  // Save changes from configurations modal
  const handleSaveConfig = (e) => {
    e.preventDefault();
    if (!configuringCamera) return;

    setCameras(prev => prev.map(c => {
      if (c.id === configuringCamera.id) {
        return {
          ...c,
          covers: modalCovers,
          zone: modalZone.trim() === "" ? "—" : modalZone,
          parents: modalParents,
          hours: modalHours.trim() === "" ? "—" : modalHours,
          eyeVisible: modalParents === "CAN VIEW"
        };
      }
      return c;
    }));

    setConfiguringCamera(null);
    setToastMsg(`Configuration for ${configuringCamera.name} updated successfully!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Parent policy save trigger
  const handleSavePolicy = () => {
    setToastMsg("Parent viewing policies saved successfully!");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Filter Access Logs
  const handleFilterLogs = (e) => {
    e.preventDefault();
    const filtered = INITIAL_ACCESS_LOGS.filter(log => {
      const matchCamera = cameraFilter === "All cameras" || 
                          (cameraFilter === "IPCAMERA3" && log.camera.includes("IPCAMERA3")) ||
                          (cameraFilter === "IPCAMERA2" && log.camera === "IPCAMERA2") ||
                          (cameraFilter === "Fds" && log.camera === "Fds") ||
                          (cameraFilter === "IPCAMERA4" && log.camera === "IPCAMERA4");

      const matchViewer = viewerFilter === "Anyone" || 
                          (viewerFilter === "Parents" && log.isParent) ||
                          (viewerFilter === "Staff" && !log.isParent);

      return matchCamera && matchViewer;
    });
    setActiveLogs(filtered);
  };

  const handleResetLogs = () => {
    setCameraFilter("All cameras");
    setViewerFilter("Anyone");
    setFromDate("");
    setToDate("");
    setActiveLogs(INITIAL_ACCESS_LOGS);
  };

  const logStats = useMemo(() => {
    return {
      views: activeLogs.length,
      parents: activeLogs.filter(l => l.isParent).length,
      activeNow: activeLogs.length > 0 ? 1 : 0
    };
  }, [activeLogs]);

  return (
    <div className={`p-6 max-w-7xl mx-auto space-y-5 font-sans text-gray-800 transition-all relative ${isFullscreen ? "bg-slate-900 text-white min-h-screen animate-in fade-in" : ""}`}>
      
      {/* Dynamic Action Toast popups */}
      {showToast && (
        <div className="fixed top-20 right-6 bg-slate-900 text-white px-4 py-3 rounded-none shadow-lg flex items-center gap-2 border border-slate-700/50 animate-bounce z-50 text-xs">
          <Check className="w-4 h-4 text-emerald-400" />
          <span className="font-bold">{toastMsg}</span>
        </div>
      )}

      {/* 3. CAMERA SETTINGS CONFIGURATION MODAL */}
      {configuringCamera && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white text-gray-800 rounded-none p-5 shadow-lg max-w-md w-full space-y-4 border border-slate-200">
            
            <div className="border-b pb-2 flex justify-between items-center">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                Configure {configuringCamera.name}
              </h3>
              <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded">
                In CCTV
              </span>
            </div>

            <form onSubmit={handleSaveConfig} className="space-y-3 text-xs">
              
              {/* Covers selector */}
              <div className="space-y-1">
                <label className="font-bold text-slate-650">Covers / Location</label>
                <select 
                  value={modalCovers} 
                  onChange={(e) => setModalCovers(e.target.value)}
                  className="w-full px-3 py-2 border rounded-none bg-white font-semibold text-slate-800 focus:outline-none focus:border-indigo-650"
                >
                  <option value="Common area">Common area</option>
                  <option value="Nursery - A">Nursery - A</option>
                  <option value="Class I - A">Class I - A</option>
                  <option value="Office Lobby">Office Lobby</option>
                  <option value="Playground">Playground</option>
                  <option value="Gate 1 Entrance">Gate 1 Entrance</option>
                  <option value="Library">Library</option>
                </select>
              </div>

              {/* Zone Input */}
              <div className="space-y-1">
                <label className="font-bold text-slate-650">Zone Name</label>
                <input 
                  type="text" 
                  value={modalZone} 
                  placeholder="e.g. Class Nursery A"
                  onChange={(e) => setModalZone(e.target.value)}
                  className="w-full px-3 py-2 border rounded-none font-semibold text-slate-800 focus:outline-none focus:border-indigo-650"
                />
              </div>

              {/* Parents Access */}
              <div className="space-y-1">
                <label className="font-bold text-slate-650">Parents Viewing Access</label>
                <select 
                  value={modalParents} 
                  onChange={(e) => setModalParents(e.target.value)}
                  className="w-full px-3 py-2 border rounded-none bg-white font-semibold text-slate-800 focus:outline-none focus:border-indigo-650"
                >
                  <option value="CAN VIEW">👁️ CAN VIEW</option>
                  <option value="CLOSED">👁️ CLOSED</option>
                </select>
              </div>

              {/* Hours Limit input */}
              <div className="space-y-1">
                <label className="font-bold text-slate-650">Viewing Hours Limit</label>
                <input 
                  type="text" 
                  value={modalHours} 
                  placeholder="e.g. 03:53 – 15:53"
                  onChange={(e) => setModalHours(e.target.value)}
                  className="w-full px-3 py-2 border rounded-none font-semibold text-slate-800 focus:outline-none focus:border-indigo-650"
                />
              </div>

              {/* Action buttons */}
              <div className="flex justify-end gap-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setConfiguringCamera(null)}
                  className="px-3 py-1.5 border border-slate-200 hover:bg-slate-100 rounded-none font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-1.5 bg-indigo-650 hover:bg-indigo-750 text-white rounded-none font-bold cursor-pointer"
                >
                  Save Settings
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* 1. CAMERA WALL VIEW */}
      {activeView === "wall" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          
          {/* Header Row */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className={`text-2xl font-bold tracking-tight ${isFullscreen ? "text-white" : "text-slate-800"}`}>Camera Wall</h1>
              <p className="text-slate-500 text-sm">Live view of every IP camera in your school — control-room monitoring in one place</p>
            </div>
            
            {/* Top Right Actions */}
            <div className="flex items-center gap-2.5">
              <button 
                onClick={() => setActiveView("settings")}
                className="px-3 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-650 text-xs font-bold rounded-none flex items-center gap-1.5 shadow-3xs cursor-pointer select-none active:scale-95"
              >
                <Settings className="w-3.5 h-3.5 text-slate-500" />
                Camera Settings
              </button>

              <button 
                onClick={() => setActiveView("log")}
                className="px-3 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-650 text-xs font-bold rounded-none flex items-center gap-1.5 shadow-3xs cursor-pointer select-none active:scale-95"
              >
                <User className="w-3.5 h-3.5 text-slate-500" />
                Access Log
              </button>
            </div>
          </div>

          {/* Sub Header layout bar */}
          <div className={`border border-slate-200 rounded-none p-3.5 flex justify-between items-center shadow-3xs ${isFullscreen ? "bg-slate-850/80 border-slate-700" : "bg-white"}`}>
            <div className="flex items-center gap-3">
              <span className={`text-[10px] font-extrabold uppercase tracking-wider ${isFullscreen ? "text-slate-400" : "text-slate-500"}`}>Layout</span>
              <div className="flex items-center border border-slate-200/90 rounded-none bg-slate-50/50 p-0.5">
                {["2x2", "3x3", "4x4"].map((lay) => {
                  const isActive = layoutGrid === lay;
                  return (
                    <button
                      key={lay}
                      onClick={() => setLayoutGrid(lay)}
                      className={`px-3 py-1 font-bold text-xs rounded-none transition-all cursor-pointer select-none ${
                        isActive ? "bg-indigo-600 text-white shadow-3xs" : `text-slate-500 hover:bg-slate-100 ${isFullscreen ? "hover:bg-slate-800" : ""}`
                      }`}
                    >
                      {lay}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className={`px-3 py-1.5 border border-slate-200/90 hover:bg-slate-50 rounded-none text-xs font-bold flex items-center gap-1.5 shadow-3xs cursor-pointer select-none ${
                isFullscreen ? "bg-slate-800 text-white hover:bg-slate-700 border-slate-700" : "bg-white text-slate-650"
              }`}
            >
              <Maximize2 className="w-3.5 h-3.5" />
              {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            </button>
          </div>

          {/* CCTV Feed Grid */}
          <div className={`grid gap-4 ${
            layoutGrid === "2x2" ? "grid-cols-1 md:grid-cols-2" : layoutGrid === "3x3" ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-4"
          }`}>
            {visibleCameras.map((cam) => (
              <div 
                key={cam.id} 
                className={`bg-white border rounded-none overflow-hidden shadow-3xs flex flex-col justify-between ${
                  isFullscreen ? "border-slate-800 bg-slate-850" : "border-slate-200"
                }`}
              >
                <div className="bg-[#0e1726] aspect-video relative flex flex-col items-center justify-center text-center p-4">
                  <span className="absolute top-3 left-3 bg-red-50 text-red-600 text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-none border border-red-100/50 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-none bg-red-500 animate-pulse"></span>
                    Offline
                  </span>
                  <VideoOff className="w-8 h-8 text-slate-650/80 mb-1" />
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Camera offline</span>
                </div>

                <div className={`p-4 flex justify-between items-center ${
                  isFullscreen ? "bg-slate-850 text-white" : "bg-white text-gray-800"
                }`}>
                  <div>
                    <h3 className="font-extrabold text-xs leading-tight">{cam.name}</h3>
                    <p className="text-[10px] text-slate-400 font-semibold mt-1 flex items-center gap-1.5">
                      {cam.covers}
                      {cam.eyeVisible && <Eye className="w-3.5 h-3.5 text-[#007bff] inline-block" />}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* 2. ACCESS LOG VIEW */}
      {activeView === "log" && (
        <div className="space-y-5 animate-in fade-in duration-200">
          
          {/* Header Row */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">CCTV Access Log</h1>
              <p className="text-slate-500 text-sm">Every live view of every camera — who watched, what, and for how long</p>
            </div>
            
            <div className="flex items-center gap-2.5">
              <button 
                onClick={() => setActiveView("wall")}
                className="px-3 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-650 text-xs font-bold rounded-none flex items-center gap-1.5 shadow-3xs cursor-pointer select-none active:scale-95"
              >
                <Grid className="w-3.5 h-3.5 text-slate-500" />
                Camera Wall
              </button>

              <button 
                onClick={() => setActiveView("settings")}
                className="px-3 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-650 text-xs font-bold rounded-none flex items-center gap-1.5 shadow-3xs cursor-pointer select-none active:scale-95"
              >
                <Settings className="w-3.5 h-3.5 text-slate-500" />
                Camera Settings
              </button>
            </div>
          </div>

          {/* Stats Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white border border-slate-200 rounded-none p-4 flex flex-col justify-between shadow-3xs min-h-[90px]">
              <span className="text-2xl font-extrabold text-slate-850 leading-none">{logStats.views}</span>
              <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest mt-2 block">Views - Last 7 Days</span>
            </div>
            <div className="bg-white border border-slate-200 rounded-none p-4 flex flex-col justify-between shadow-3xs min-h-[90px]">
              <span className="text-2xl font-extrabold text-slate-850 leading-none">{logStats.parents}</span>
              <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest mt-2 block">By Parents - Last 7 Days</span>
            </div>
            <div className="bg-white border border-slate-200 rounded-none p-4 flex flex-col justify-between shadow-3xs min-h-[90px]">
              <span className="text-2xl font-extrabold text-slate-850 leading-none">{logStats.activeNow}</span>
              <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest mt-2 block">Watching Right Now</span>
            </div>
          </div>

          {/* Filters Card */}
          <div className="bg-white border border-slate-200 rounded-none p-4 shadow-3xs">
            <form onSubmit={handleFilterLogs} className="grid grid-cols-1 md:grid-cols-6 gap-3.5 items-end">
              <div className="space-y-1 md:col-span-2">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Camera</label>
                <select 
                  value={cameraFilter} 
                  onChange={(e) => setCameraFilter(e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-none text-xs text-slate-800 font-semibold focus:outline-none focus:border-indigo-650 bg-white cursor-pointer"
                >
                  <option value="All cameras">All cameras</option>
                  <option value="IPCAMERA3">IPCAMERA3</option>
                  <option value="IPCAMERA2">IPCAMERA2</option>
                  <option value="Fds">Fds</option>
                  <option value="IPCAMERA4">IPCAMERA4</option>
                </select>
              </div>
              <div className="space-y-1 md:col-span-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Viewer</label>
                <select 
                  value={viewerFilter} 
                  onChange={(e) => setViewerFilter(e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-none text-xs text-slate-800 font-semibold focus:outline-none focus:border-indigo-650 bg-white cursor-pointer"
                >
                  <option value="Anyone">Anyone</option>
                  <option value="Parents">Parents</option>
                  <option value="Staff">Staff</option>
                </select>
              </div>
              <div className="space-y-1 md:col-span-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">From</label>
                <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="w-full px-2.5 py-1.2 border border-gray-300 rounded-none text-xs text-slate-800 font-semibold focus:outline-none" />
              </div>
              <div className="space-y-1 md:col-span-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">To</label>
                <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="w-full px-2.5 py-1.2 border border-gray-300 rounded-none text-xs text-slate-800 font-semibold focus:outline-none" />
              </div>
              <div className="flex gap-2 w-full justify-end md:col-span-1">
                <button type="submit" className="px-3.5 py-1.5 bg-indigo-650 hover:bg-indigo-755 text-white font-bold text-xs rounded-none shadow-sm flex items-center gap-1 cursor-pointer"><Filter className="w-3.5 h-3.5" />Filter</button>
                <button type="button" onClick={handleResetLogs} className="px-3.5 py-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-650 font-bold text-xs rounded-none shadow-3xs cursor-pointer">Reset</button>
              </div>
            </form>
          </div>

          {/* Access Logs Table */}
          <div className="bg-white border border-slate-200 rounded-none overflow-hidden shadow-3xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-200 text-[10px] font-extrabold text-indigo-650 uppercase tracking-wider">
                    <th className="py-3 px-5 border-r border-slate-200">Started</th>
                    <th className="py-3 px-5 border-r border-slate-200">Camera</th>
                    <th className="py-3 px-5 border-r border-slate-200">Viewer</th>
                    <th className="py-3 px-5 border-r border-slate-200">For Child</th>
                    <th className="py-3 px-5 border-r border-slate-200">Duration</th>
                    <th className="py-3 px-5">IP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-650 font-semibold">
                  {activeLogs.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-12 text-center text-slate-400">No views recorded.</td>
                    </tr>
                  ) : (
                    activeLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50/20 transition-colors">
                        <td className="py-3.5 px-5 border-r border-slate-100 font-mono text-slate-500">{log.started}</td>
                        <td className="py-3.5 px-5 border-r border-slate-100 font-extrabold text-slate-800">{log.camera}</td>
                        <td className="py-3.5 px-5 border-r border-slate-100 text-slate-700">{log.viewer}</td>
                        <td className="py-3.5 px-5 border-r border-slate-100 font-bold text-slate-800">{log.child}</td>
                        <td className="py-3.5 px-5 border-r border-slate-100 text-slate-600">{log.duration}</td>
                        <td className="py-3.5 px-5 font-mono text-slate-500">{log.ip}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-start gap-2 text-[10px] font-semibold text-slate-400 leading-relaxed max-w-4xl">
            <AlertCircle className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
            <p>Sessions that end because a tab was closed are recorded from the viewer's last heartbeat, so a duration here is the shortest defensible figure rather than an optimistic one.</p>
          </div>
        </div>
      )}

      {/* 4. CCTV CAMERAS CONFIGURATION SETTINGS VIEW (Screenshot 4) */}
      {activeView === "settings" && (
        <div className="space-y-5 animate-in fade-in duration-200">
          
          {/* Header Row */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">CCTV Cameras</h1>
              <p className="text-slate-500 text-sm">Assign each camera to a room and decide who may look through it</p>
            </div>
            
            {/* Top Right Action toggles */}
            <div className="flex items-center gap-2.5">
              <button 
                onClick={() => setActiveView("wall")}
                className="px-3 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-650 text-xs font-bold rounded-none flex items-center gap-1.5 shadow-3xs cursor-pointer select-none active:scale-95"
              >
                <Grid className="w-3.5 h-3.5 text-slate-500" />
                Camera Wall
              </button>

              <button 
                onClick={() => setActiveView("log")}
                className="px-3 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-650 text-xs font-bold rounded-none flex items-center gap-1.5 shadow-3xs cursor-pointer select-none active:scale-95"
              >
                <User className="w-3.5 h-3.5 text-slate-500" />
                Access Log
              </button>
            </div>
          </div>

          {/* Parent viewing policy card panel */}
          <div className="bg-white border border-slate-200 rounded-none overflow-hidden shadow-3xs">
            
            <div className="px-5 py-4 border-b flex items-center gap-2 bg-slate-50/20">
              <Lock className="w-4 h-4 text-indigo-650" />
              <h2 className="font-bold text-slate-850 text-xs uppercase tracking-wider">Parent viewing policy</h2>
            </div>

            <div className="p-5 space-y-4">
              
              {/* Option switch 1 */}
              <div className="flex items-start gap-4">
                <button
                  type="button"
                  onClick={() => setAllowViewLive(!allowViewLive)}
                  className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-none border-2 border-transparent transition-colors duration-150 ease-in-out mt-1 focus:outline-none ${allowViewLive ? 'bg-indigo-650' : 'bg-slate-200'}`}
                >
                  <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-none bg-white transition duration-150 ease-in-out ${allowViewLive ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-xs text-slate-800">Allow parents to view live cameras</h4>
                  <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                    Master switch. While this is off no parent can open any camera, whatever the individual camera settings say. Turning it off also ends any parent session currently running.
                  </p>
                </div>
              </div>

              {/* Option switch 2 */}
              <div className="flex items-start gap-4 border-t pt-4">
                <button
                  type="button"
                  onClick={() => setRequirePolicyAccept(!requirePolicyAccept)}
                  className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-none border-2 border-transparent transition-colors duration-150 ease-in-out mt-1 focus:outline-none ${requirePolicyAccept ? 'bg-indigo-650' : 'bg-slate-200'}`}
                >
                  <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-none bg-white transition duration-150 ease-in-out ${requirePolicyAccept ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-xs text-slate-800">Require parents to accept the viewing policy first</h4>
                  <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                    Each parent acknowledges — once — that viewing is live only, is never recordable or downloadable by them, and that every view is logged. Recommended: a classroom camera also shows other families' children.
                  </p>
                </div>
              </div>

              {/* Save policy trigger */}
              <div className="flex justify-end pt-3">
                <button
                  onClick={handleSavePolicy}
                  className="px-4 py-2 bg-indigo-650 hover:bg-indigo-755 text-white font-bold text-xs rounded-none flex items-center gap-1.5 shadow-md cursor-pointer select-none active:scale-95 border-none"
                >
                  <Save className="w-3.5 h-3.5 text-white" />
                  Save policy
                </button>
              </div>

            </div>

          </div>

          {/* Camera Configuration Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {cameras.map((cam) => {
              const isClosed = cam.parents === "CLOSED";
              
              return (
                <div 
                  key={cam.id} 
                  className="bg-white border border-slate-200 rounded-none p-4 flex flex-col justify-between shadow-3xs space-y-4"
                >
                  
                  {/* Card Header row */}
                  <div className="flex justify-between items-center border-b pb-2">
                    <div className="flex items-center gap-2 text-indigo-650">
                      <Video className="w-4 h-4 text-indigo-650" />
                      <h3 className="font-extrabold text-xs text-slate-800 leading-tight">{cam.name}</h3>
                    </div>
                    <span className="bg-emerald-50 text-emerald-600 border border-emerald-100/50 text-[9px] font-bold px-2 py-0.5 rounded">
                      In CCTV
                    </span>
                  </div>

                  {/* Detail Parameter rows */}
                  <div className="space-y-2 text-[10px] font-semibold text-slate-500">
                    
                    <div className="flex justify-between items-center">
                      <span>Covers</span>
                      <span className="font-extrabold text-slate-800 text-right">{cam.covers}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>Zone</span>
                      <span className="font-extrabold text-slate-800 text-right">{cam.zone}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>Parents</span>
                      <span className={`font-extrabold text-right flex items-center gap-1 ${
                        isClosed ? "text-slate-400" : "text-emerald-600"
                      }`}>
                        {isClosed ? <EyeOff className="w-3 h-3 text-slate-400" /> : <Eye className="w-3 h-3 text-emerald-500" />}
                        {cam.parents}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>Hours</span>
                      <span className="font-extrabold text-slate-800 text-right">{cam.hours}</span>
                    </div>

                  </div>

                  {/* Settings modal trigger */}
                  <button
                    onClick={() => handleOpenConfig(cam)}
                    className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-650 text-white font-bold text-xs rounded-none flex items-center justify-center gap-1.5 shadow-3xs cursor-pointer select-none active:scale-95 border-none"
                  >
                    <Sliders className="w-3.5 h-3.5 text-white" />
                    Settings
                  </button>

                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
}
