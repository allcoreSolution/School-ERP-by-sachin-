import React from 'react';
import { Link } from 'react-router-dom';

export default function FooterLanding() {
  return (
    <footer className="w-full bg-slate-950 text-white relative overflow-hidden flex flex-col items-center border-t border-gray-800">
      
      {/* Background massive typography stamp */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-white/[0.02] whitespace-nowrap pointer-events-none select-none">
         MULTISCHOOL
      </div>
      
      {/* Absolute Ambient Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none transform translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#09B48E]/10 blur-[150px] rounded-full pointer-events-none transform -translate-x-1/2 translate-y-1/2" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      {/* Top CTA Block */}
      <div className="max-w-4xl mx-auto px-4 text-center z-10 w-full pt-32 pb-24">
         <span className="inline-flex items-center gap-2 bg-transparent text-emerald-400 font-bold uppercase tracking-widest text-[10px] px-4 py-1.5 border border-emerald-500/40 mb-6 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(16,185,129,1)]" />
            Ready to Launch
         </span>
         
         <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-black tracking-tighter mb-6 text-white leading-tight">
           Your EdTech empire <br />
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">starts here.</span>
         </h2>
         <p className="text-gray-400 font-medium text-base sm:text-lg mb-12 max-w-xl mx-auto">
           Complete 100% unencrypted source code. 38 robust modules. 3 native mobile apps. Deploy on unlimited domains today.
         </p>
         
         <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/pricing" className="relative group w-full sm:w-auto liquid-btn" style={{ '--liquid-bg': '#0f172a', '--liquid-text': '#ffffff' }}>
              <div className="absolute inset-0 bg-white translate-x-1.5 translate-y-1.5 transition-transform group-hover:translate-x-2 group-hover:translate-y-2" />
              <div className="relative bg-amber-500 border-[2px] border-white px-10 py-4 flex items-center justify-center transition-transform hover:-translate-y-0.5">
                 <span className="text-gray-900 font-black text-sm uppercase tracking-widest z-10 relative">
                   Buy Now — ₹10,000
                 </span>
              </div>
            </Link>
            
            <a href="https://wa.me/916263056779" target="_blank" rel="noreferrer" className="w-full sm:w-auto relative group">
               <div className="absolute inset-0 bg-emerald-500 blur-md opacity-20 group-hover:opacity-40 transition-opacity" />
               <div className="relative bg-slate-900 border border-gray-700 hover:border-emerald-500 text-gray-200 px-8 py-4 font-bold text-sm tracking-wider uppercase transition-colors flex items-center justify-center gap-3">
                  <span className="text-emerald-400 text-lg">📱</span> WhatsApp Us
               </div>
            </a>
         </div>
      </div>

      {/* Footer Navigation & Trademark */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 z-10 border-t border-gray-800 pt-12 pb-8">
         <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-12 lg:gap-24 mb-16">
            
            {/* Branding Column */}
            <div className="flex flex-col items-start gap-4">
               <div className="font-black text-2xl tracking-tighter flex items-center gap-2">
                 <span className="text-white">MultiSchool</span> 
                 <span className="text-amber-500">ERP</span>
               </div>
               <p className="text-gray-400 font-medium text-sm leading-relaxed max-w-sm">
                 The definitive open-source architecture for modern educational administration, engineered for IT agencies & edtech founders.
               </p>
               <div className="flex items-center gap-2 bg-slate-800/50 border border-slate-700/50 rounded-full px-4 py-2 w-fit mt-2">
                 <span className="w-2 h-2 rounded-full bg-green-500" />
                 <span className="text-xs font-bold text-gray-300">V3.6.0 Available</span>
               </div>
            </div>

            {/* Product Links */}
            <div className="flex flex-col gap-4">
               <h4 className="text-white font-black uppercase tracking-widest text-xs mb-2">Product</h4>
               <Link to="/" className="text-gray-400 hover:text-white transition-colors text-[13px] font-semibold">Overview</Link>
               <Link to="/modules" className="text-gray-400 hover:text-white transition-colors text-[13px] font-semibold">Module Catalog</Link>
               <Link to="/pricing" className="text-gray-400 hover:text-white transition-colors text-[13px] font-semibold">Pricing & Licenses</Link>
               <a href="#demo" className="text-gray-400 hover:text-amber-400 transition-colors text-[13px] font-semibold flex items-center gap-2">Live Demo <span className="text-[10px]">↗</span></a>
            </div>

            {/* Support Links */}
            <div className="flex flex-col gap-4">
               <h4 className="text-white font-black uppercase tracking-widest text-xs mb-2">Legal & Support</h4>
               <a href="mailto:contact@projectworlds.com" className="text-gray-400 hover:text-white transition-colors text-[13px] font-semibold">contact@projectworlds.com</a>
               <a href="#" className="text-gray-400 hover:text-white transition-colors text-[13px] font-semibold">Privacy Policy</a>
               <a href="#" className="text-gray-400 hover:text-white transition-colors text-[13px] font-semibold">Terms & Conditions</a>
               <a href="#" className="text-gray-400 hover:text-white transition-colors text-[13px] font-semibold">Refund Policy</a>
            </div>
         </div>
         
         <div className="w-full pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <div className="text-gray-500 font-medium text-[11px] sm:text-xs">
               © 2026 ProjectWorlds. All rights reserved. Registered Trademark.
            </div>
            <div className="flex items-center gap-4 text-gray-500 font-medium text-[11px] sm:text-xs">
               <span>Engineered with Node.js & React</span>
            </div>
         </div>
      </div>

    </footer>
  );
}
