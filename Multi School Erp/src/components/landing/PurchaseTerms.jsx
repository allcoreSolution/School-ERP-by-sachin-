import React from 'react';

export default function PurchaseTerms() {
  return (
    <section className="py-8 lg:py-10 px-4 sm:px-6 lg:px-12 max-w-6xl mx-auto bg-gray-50/50 border-t border-gray-200">
      
      {/* Clean Header Box */}
      <div className="relative z-10 text-center mb-8 flex flex-col items-center max-w-3xl mx-auto py-2 sm:p-3">
        <span className="inline-block bg-[#E8F8F5] text-[#09B48E] font-black uppercase tracking-widest text-[8px] sm:text-[9px] px-2.5 py-1 mb-2 rounded-full shadow-sm">
          TRANSPARENT & DOCUMENTED
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-[1.1] tracking-tighter mb-2">
          Exactly what you get — and how you get it.
        </h2>
        <p className="text-gray-500 font-[500] text-[11px] sm:text-[13px] max-w-2xl mx-auto">
          No surprises. Pay once, download instantly, and read every term before you buy. Full spec sheet and license below.
        </p>
      </div>

      {/* 3 Steps Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        
        {/* Step 1 */}
        <div className="bg-white border border-gray-200 p-5 sm:p-6 flex flex-col justify-between rounded-xl shadow-sm hover:border-gray-300 hover:shadow-md hover:-translate-y-1 transition-all group">
           <div>
             <div className="text-[#09B48E] font-black uppercase text-[9px] tracking-widest mb-2">STEP 1</div>
             <h3 className="font-bold text-gray-900 text-base mb-2">Pay securely — ₹10,000</h3>
           </div>
           <p className="text-gray-500 font-medium text-[12px] leading-relaxed">
             One-time payment via Razorpay: UPI, cards, net banking or wallet. Bank transfer also available on request.
           </p>
        </div>

        {/* Step 2 */}
        <div className="bg-white border border-gray-200 p-5 sm:p-6 flex flex-col justify-between rounded-xl shadow-sm hover:border-gray-300 hover:shadow-md hover:-translate-y-1 transition-all group">
           <div>
             <div className="text-[#09B48E] font-black uppercase text-[9px] tracking-widest mb-2">STEP 2</div>
             <h3 className="font-bold text-gray-900 text-base mb-2">Instant email + download</h3>
           </div>
           <p className="text-gray-500 font-medium text-[12px] leading-relaxed">
             The moment payment succeeds, we email your client-portal login and download link — usually within a minute. No waiting, no office hours.
           </p>
        </div>

        {/* Step 3 */}
        <div className="bg-white border border-gray-200 p-5 sm:p-6 flex flex-col justify-between rounded-xl shadow-sm hover:border-gray-300 hover:shadow-md hover:-translate-y-1 transition-all group">
           <div>
             <div className="text-[#09B48E] font-black uppercase text-[9px] tracking-widest mb-2">STEP 3</div>
             <h3 className="font-bold text-gray-900 text-base mb-2">1 year updates & support</h3>
           </div>
           <p className="text-gray-500 font-medium text-[12px] leading-relaxed">
             Get the full source, all 3 apps, docs & store-publish guides, plus free install help for one deployment. Any issue → WhatsApp +91 62630 56779.
           </p>
        </div>

      </div>

      {/* 4 Docs Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <a href="#" className="bg-white border border-gray-200 p-4 sm:p-5 flex flex-col items-start rounded-xl shadow-sm hover:border-gray-300 hover:shadow-md hover:-translate-y-1 transition-all group">
           <div className="w-7 h-7 flex items-center justify-center text-xl mb-3 opacity-90 group-hover:scale-110 transition-transform">📄</div>
           <h4 className="font-bold text-gray-900 text-[13px] sm:text-[14px] mb-1.5 leading-tight">Full Quotation <br className="hidden sm:block"/>& Spec</h4>
           <p className="text-gray-500 text-[10px] sm:text-[11px] font-medium leading-relaxed">
             38 modules, deliverables, server requirements & pricing
           </p>
        </a>

        <a href="#" className="bg-white border border-gray-200 p-4 sm:p-5 flex flex-col items-start rounded-xl shadow-sm hover:border-gray-300 hover:shadow-md hover:-translate-y-1 transition-all group">
           <div className="w-7 h-7 flex items-center justify-center text-xl mb-3 opacity-90 group-hover:scale-110 transition-transform">📜</div>
           <h4 className="font-bold text-gray-900 text-[13px] sm:text-[14px] mb-1.5">License & Terms</h4>
           <p className="text-gray-500 text-[10px] sm:text-[11px] font-medium leading-relaxed">
             Perpetual, worldwide, no-royalty license
           </p>
        </a>

        <a href="#" className="bg-white border border-gray-200 p-4 sm:p-5 flex flex-col items-start rounded-xl shadow-sm hover:border-gray-300 hover:shadow-md hover:-translate-y-1 transition-all group">
           <div className="w-7 h-7 flex items-center justify-center text-xl mb-3 opacity-90 group-hover:scale-110 transition-transform">↩️</div>
           <h4 className="font-bold text-gray-900 text-[13px] sm:text-[14px] mb-1.5">Refund Policy</h4>
           <p className="text-gray-500 text-[10px] sm:text-[11px] font-medium leading-relaxed">
             Digital product — read before you buy
           </p>
        </a>

        <a href="#" className="bg-white border border-gray-200 p-4 sm:p-5 flex flex-col items-start rounded-xl shadow-sm hover:border-gray-300 hover:shadow-md hover:-translate-y-1 transition-all group">
           <div className="w-7 h-7 flex items-center justify-center text-xl mb-3 opacity-90 group-hover:scale-110 transition-transform">🔒</div>
           <h4 className="font-bold text-gray-900 text-[13px] sm:text-[14px] mb-1.5">Privacy Policy</h4>
           <p className="text-gray-500 text-[10px] sm:text-[11px] font-medium leading-relaxed">
             How we handle your data
           </p>
        </a>

      </div>

    </section>
  );
}
