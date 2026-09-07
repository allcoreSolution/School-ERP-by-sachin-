import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-[#fdfdfd] border-b-2 border-gray-900 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-12 mx-auto">
        <div className="flex justify-between items-center h-[80px]">
          
          {/* Logo Section (Left) */}
          <div className="flex items-center gap-3 cursor-pointer group flex-1">
            {/* Square 3D Logo Concept with brutalist offset shadow */}
            <div className="flex-shrink-0 relative transition-transform duration-300 group-hover:-translate-y-1 group-hover:-translate-x-1">
              {/* Offset base shadow */}
              <div className="absolute inset-0 bg-gray-900 translate-y-1.5 translate-x-1.5 transition-all duration-300 group-hover:translate-y-2.5 group-hover:translate-x-2.5" />
              
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="relative z-10 bg-white border-2 border-gray-900" xmlns="http://www.w3.org/2000/svg">
                {/* Yellow Block */}
                <rect x="4" y="4" width="8" height="8" fill="#F59E0B" />
                {/* Dark Blue Block */}
                <rect x="12" y="12" width="8" height="8" fill="#0F172A" />
                {/* Outline details */}
                <path d="M4 12H20M12 4V20" stroke="#0F172A" strokeWidth="2" />
              </svg>
            </div>
            
            <div className="flex items-center text-[26px] font-black tracking-tighter text-gray-900 leading-none mt-1 ml-2">
              <span className="uppercase">Multi</span>
              <span className="text-amber-500 mx-1.5 uppercase underline decoration-4 underline-offset-4 decoration-amber-500 transition-all duration-300 group-hover:decoration-gray-900">
                School
              </span>
              <span className="uppercase">ERP</span>
            </div>
          </div>

          {/* Nav Links (Center) */}
          <div className="hidden lg:flex items-center justify-center gap-8 flex-shrink-0">
            {[
              { name: 'Home', path: '/' },
              { name: 'Modules', path: '/modules' },
              { name: 'Pricing', path: '/pricing' },
              { name: 'Live Demo', path: '/#demo' },
              { name: 'Docs', path: '/#docs' }
            ].map((item) => (
              <Link 
                key={item.name} 
                to={item.path} 
                className="relative text-[14px] font-black uppercase tracking-wider text-gray-600 hover:text-gray-900 transition-colors duration-200 group py-2"
              >
                {item.name}
                {/* Square underline that slides in from left to right */}
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-amber-500 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-in-out" />
              </Link>
            ))}
          </div>
            
          {/* Square Neo-Brutalist CTA Button (Right) */}
          <div className="flex flex-1 justify-end">
            <button className="relative group focus:outline-none">
              {/* Hard shadow layer */}
              <div className="absolute inset-0 bg-gray-900 translate-x-[4px] translate-y-[4px] transition-transform duration-200 group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-active:translate-x-0 group-active:translate-y-0" />
              
              {/* Button face */}
              <div 
                className="relative flex items-center bg-amber-400 border-2 border-gray-900 px-6 py-3 transition-transform duration-200 group-hover:-translate-x-[2px] group-hover:-translate-y-[2px] group-active:translate-x-0 group-active:translate-y-0 liquid-btn"
                style={{ '--liquid-bg': '#0F172A', '--liquid-text': '#ffffff' }}
              >
                <div className="flex items-center w-full z-10 relative pointer-events-none">
                  <span className="text-gray-900 font-black text-[13px] uppercase tracking-widest flex items-center gap-2 transition-colors duration-300">
                  <span>Start Engine</span>
                  <span className="w-1.5 h-1.5 bg-gray-900 animate-ping" />
                </span>
                
                {/* Price block attached to button */}
                <div className="ml-4 pl-4 border-l-2 border-gray-900 flex items-center gap-1.5">
                  <span className="text-gray-900 font-bold text-[11px] line-through decoration-2 opacity-60">₹15K</span>
                  <span className="text-gray-900 font-black text-[14px] transition-colors duration-300">₹10K</span>
                </div>
                </div>{/* Close z-10 inner div */}
              </div>{/* Close button face div */}
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}
