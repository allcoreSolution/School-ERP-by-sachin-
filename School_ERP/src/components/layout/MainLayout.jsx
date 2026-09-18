import { useState, useEffect, useRef } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { BotMessageSquare, X } from "lucide-react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const MainLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const location = useLocation();
  const mainRef = useRef(null);

  // Close sidebar on mobile when navigating and scroll to top
  useEffect(() => {
    setIsMobileOpen(false);
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [location.pathname]);

  const handleToggleSidebar = () => {
    if (window.innerWidth < 768) {
      setIsMobileOpen(!isMobileOpen);
    } else {
      setIsDesktopCollapsed(!isDesktopCollapsed);
    }
  };

  // Determine if the sidebar is in a collapsed state for the UI
  // On mobile, if it's open, it's always full width (never collapsed)
  const isCollapsed = window.innerWidth >= 768 ? isDesktopCollapsed : false;

  // Re-evaluate window width on resize so state aligns correctly
  useEffect(() => {
    const handleResize = () => {
      // Force a re-render to update the isCollapsed derived value
      setIsMobileOpen((prev) => prev);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } print:hidden h-full`}
      >
        <Sidebar isCollapsed={isCollapsed} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50 print:bg-white w-full">
        <div className="print:hidden relative z-20">
          <Header toggleSidebar={handleToggleSidebar} />
        </div>
        
        {/* Teal Banner */}
        {showBanner && (
          <div className="bg-[#14b8a6] text-white px-6 py-2.5 text-[13px] font-medium flex items-start gap-3 relative shadow-sm z-10 w-full overflow-hidden">
            <div className="mt-0.5 shrink-0"><svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>
            <div className="flex-1 leading-snug">
              <span className="font-bold">New: academic-session scoping.</span> Lists and dashboard numbers (students, exams, assessments, homework, notices...) now show the <i>selected academic session</i> only, so totals may look smaller than before — nothing was deleted. Use the session switcher in the top bar to view another year, the "<i>View all sessions</i>" button on lists to see everything, and note that money totals marked "(All Years)" still include every session.
            </div>
            <button onClick={() => setShowBanner(false)} className="text-white/80 hover:text-white p-0.5 shrink-0 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
        )}
        
        {/* Dynamic Page Content */}
        <main ref={mainRef} className="flex-1 overflow-y-auto w-full relative">
          <Outlet />
          
          {/* Floating AI Chatbot Button */}
          <div className="fixed bottom-6 right-6 z-50">
            <Link to="/help-center/ai-chatbot" className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#ff3366] shadow-[0_5px_20px_rgb(0,0,0,0.15)] border border-gray-100 hover:scale-105 transition-transform group relative cursor-pointer">
              <BotMessageSquare className="w-7 h-7" />
              <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
