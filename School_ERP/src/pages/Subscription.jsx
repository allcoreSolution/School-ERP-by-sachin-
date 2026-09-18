import React, { useState } from "react";
import { 
  CreditCard, 
  ArrowUpCircle, 
  Check, 
  Clock, 
  Users, 
  ChevronRight, 
  Lock, 
  AlertCircle,
  HelpCircle,
  X,
  Loader2
} from "lucide-react";

export default function Subscription() {
  // Current active plan state
  const [currentPlan, setCurrentPlan] = useState({
    id: "enterprise",
    name: "Enterprise Plan",
    desc: "This solution is designed for higher strength usage by both students and teachers. It can be installed individually, and for further assistance, please contact our sales team.",
    capacity: "Up to 15,000 students",
    activeStudents: "280",
    status: "Active",
    endDate: "26 Feb, 2027"
  });

  // Modal checkout state
  const [checkoutPlan, setCheckoutPlan] = useState(null);
  const [billingCycle, setBillingCycle] = useState("Yearly"); // Monthly | Yearly
  const [paymentMethod, setPaymentMethod] = useState("upi"); // card | upi | netbanking
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  // List of all subscription plans matching screenshots
  const plans = [
    {
      id: "trial",
      name: "Trial Plan",
      capacity: "Up to 10,000 students",
      desc: "Perfect for new and Testing Demo getting started.",
      priceMonthly: 0,
      priceYearly: 0
    },
    {
      id: "growth",
      name: "Growth Plan",
      capacity: "Up to 5,000 students",
      desc: "Our most popular plan for established and growing schools.",
      priceMonthly: 1000,
      priceYearly: 10000
    },
    {
      id: "enterprise",
      name: "Enterprise Plan",
      capacity: "Up to 15,000 students",
      desc: "This solution is designed for higher strength usage by both students and teachers. It can be installed individually, and for further assistance, please contact our sales team.",
      priceMonthly: 5000,
      priceYearly: 50000
    },
    {
      id: "basic",
      name: "Basic Plan",
      capacity: "Up to 5,000 students",
      desc: "Great standard plan with core modules unlocked.",
      priceMonthly: 10000,
      priceYearly: 100000
    },
    {
      id: "pay_as_you_grow",
      name: "Per Student — Pay As You Grow",
      capacity: "Billed per student",
      desc: "12 per student per month, minimum 100 billed. Never blocks admission. A 340-student school pays 4,080/mo.",
      subText: "₹12.00 per student / month · billed for 280 students",
      priceMonthly: 3360,
      priceYearly: 33600
    }
  ];

  const handlePayClick = (plan, cycle) => {
    if (plan.id === currentPlan.id) {
      alert("This is already your current active plan.");
      return;
    }
    setCheckoutPlan(plan);
    setBillingCycle(cycle);
    setSuccess(false);
    setProcessing(false);
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    
    // Simulate payment processing loader
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      
      // Upgrade left card current state dynamically
      setCurrentPlan({
        id: checkoutPlan.id,
        name: checkoutPlan.name,
        desc: checkoutPlan.desc,
        capacity: checkoutPlan.capacity,
        activeStudents: "280",
        status: "Active",
        endDate: "26 Feb, 2027"
      });

      // Close modal shortly
      setTimeout(() => {
        setCheckoutPlan(null);
      }, 1500);

    }, 2000);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-5 font-sans text-gray-800">
      
      {/* Title */}
      <div>
        <h1 className="text-xl font-bold text-slate-800">Manage Subscription</h1>
      </div>

      {/* Main split grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-start">
        
        {/* Left Side: Current Plan Details Card */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-none overflow-hidden shadow-3xs">
          
          {/* Header */}
          <div className="px-5 py-4 border-b flex justify-between items-center bg-slate-50/30">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-indigo-650" />
              <h2 className="font-bold text-slate-800 text-xs">Current Plan Details</h2>
            </div>
            <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-none text-[10px] font-bold border border-emerald-100/30">
              {currentPlan.status}
            </span>
          </div>

          {/* Details Content body */}
          <div className="p-5 space-y-6">
            
            <div>
              <h3 className="text-lg font-black text-slate-850 tracking-tight">{currentPlan.name}</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed mt-2.5">
                {currentPlan.desc}
              </p>
            </div>

            {/* List block */}
            <div className="space-y-4 border-t pt-4 text-xs font-semibold">
              
              {/* Capacity */}
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Capacity</span>
                <span className="bg-indigo-50 text-indigo-650 px-2 py-0.5 rounded-none text-[10px] font-bold border border-indigo-100/20">
                  {currentPlan.capacity}
                </span>
              </div>

              {/* Active Students */}
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Active Students</span>
                <span className="bg-slate-100 text-indigo-650 px-2 py-0.5 rounded-none text-[10px] font-bold">
                  {currentPlan.activeStudents}
                </span>
              </div>

              {/* Status */}
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Status</span>
                <span className="text-emerald-600 font-bold">{currentPlan.status}</span>
              </div>

              {/* End Date */}
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Subscription Ends On</span>
                <span className="text-orange-500 font-bold">{currentPlan.endDate}</span>
              </div>

            </div>

          </div>

        </div>

        {/* Right Side: Upgrade/Upgrade Options */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-none overflow-hidden shadow-3xs">
          
          {/* Header */}
          <div className="px-5 py-4 border-b flex items-center gap-2 bg-slate-50/30">
            <ArrowUpCircle className="w-4 h-4 text-indigo-650" />
            <h2 className="font-bold text-slate-800 text-xs">Renew or Upgrade Plan</h2>
          </div>

          <div className="p-5 space-y-4">
            
            <p className="text-[11px] text-slate-400 font-bold tracking-wide">
              Select a plan below to proceed to payment.
            </p>

            {/* Plan cards list */}
            <div className="space-y-4">
              {plans.map((plan) => {
                const isCurrent = plan.id === currentPlan.id;
                
                return (
                  <div 
                    key={plan.id}
                    className={`border rounded-none p-4 space-y-3.5 transition-all ${
                      isCurrent 
                        ? "bg-indigo-50/20 border-indigo-200 ring-1 ring-indigo-200" 
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    
                    {/* Upper title header row */}
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-slate-800">{plan.name}</h3>
                          {isCurrent && (
                            <span className="bg-indigo-550 text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-none text-[9px] font-extrabold uppercase">
                              Current
                            </span>
                          )}
                        </div>
                        {plan.desc && (
                          <p className="text-[11px] text-slate-400 font-semibold leading-relaxed mt-1">
                            {plan.desc}
                          </p>
                        )}
                      </div>

                      {/* Capacity badge */}
                      <span className={`px-2 py-0.5 rounded-none text-[9px] font-bold uppercase tracking-wider ${
                        plan.id === "pay_as_you_grow" 
                          ? "bg-blue-50 text-blue-650 border border-blue-100" 
                          : "bg-slate-100 text-slate-500 border"
                      }`}>
                        {plan.capacity}
                      </span>
                    </div>

                    {/* Sub text info for pay-as-you-grow */}
                    {plan.subText && (
                      <p className="text-[10px] text-slate-400 font-semibold italic">{plan.subText}</p>
                    )}

                    {/* Buttons row */}
                    <div className="grid grid-cols-2 gap-3.5">
                      
                      {/* Pay Monthly */}
                      <button
                        onClick={() => handlePayClick(plan, "Monthly")}
                        disabled={isCurrent}
                        className={`py-2 px-3 border text-xs font-extrabold rounded-none text-center transition-all cursor-pointer ${
                          isCurrent 
                            ? "bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed" 
                            : "border-gray-300 text-slate-700 bg-white hover:bg-slate-50 active:scale-98"
                        }`}
                      >
                        Pay Monthly - ₹{plan.priceMonthly.toLocaleString("en-IN")}.00
                      </button>

                      {/* Pay Yearly */}
                      <button
                        onClick={() => handlePayClick(plan, "Yearly")}
                        disabled={isCurrent}
                        className={`py-2 px-3 text-xs font-extrabold rounded-none text-center text-white transition-all cursor-pointer ${
                          isCurrent 
                            ? "bg-slate-250 text-slate-450 border-slate-200 cursor-not-allowed" 
                            : "bg-indigo-600 hover:bg-indigo-755 shadow-sm active:scale-98"
                        }`}
                      >
                        Pay Yearly - ₹{plan.priceYearly.toLocaleString("en-IN")}.00
                      </button>

                    </div>

                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>

      {/* Subscription Checkout Modal */}
      {checkoutPlan && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white border border-slate-200 rounded-none max-w-md w-full overflow-hidden shadow-xl animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div className="flex items-center gap-2 text-indigo-650">
                <CreditCard className="w-5 h-5 animate-pulse" />
                <h3 className="font-bold text-slate-800 text-sm">Upgrade Subscription</h3>
              </div>
              <button 
                onClick={() => setCheckoutPlan(null)}
                disabled={processing}
                className="p-1 hover:bg-slate-100 rounded-none text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Success state */}
            {success ? (
              <div className="p-8 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 rounded-none bg-emerald-50 text-emerald-500 border border-emerald-100 flex items-center justify-center animate-bounce">
                  <Check className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-850">Payment Successful!</h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium">Your subscription is now updated to the {checkoutPlan.name}.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCheckoutSubmit}>
                
                {/* Modal Body */}
                <div className="p-5 space-y-4">
                  
                  {/* Selected Plan Summary info */}
                  <div className="bg-slate-50 border p-3 rounded-none space-y-1.5 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-750">Plan Selected</span>
                      <span className="font-black text-slate-800">{checkoutPlan.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-750">Billing Cycle</span>
                      <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-none text-[10px] font-extrabold uppercase">
                        {billingCycle}
                      </span>
                    </div>
                    <div className="border-t pt-1.5 flex justify-between items-center text-sm font-extrabold">
                      <span className="text-slate-800">Total Amount</span>
                      <span className="text-indigo-650 font-black">
                        ₹{(billingCycle === "Monthly" ? checkoutPlan.priceMonthly : checkoutPlan.priceYearly).toLocaleString("en-IN")}.00
                      </span>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 block">Select Payment Method</label>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold">
                      
                      <div 
                        onClick={() => !processing && setPaymentMethod("upi")}
                        className={`border rounded-none p-2.5 cursor-pointer flex flex-col items-center justify-center gap-1 ${
                          paymentMethod === "upi" ? "border-indigo-650 bg-indigo-50/10 text-indigo-650" : "border-slate-200 text-slate-500 bg-white"
                        }`}
                      >
                        ⚡ UPI (GPay/PhonePe)
                      </div>

                      <div 
                        onClick={() => !processing && setPaymentMethod("card")}
                        className={`border rounded-none p-2.5 cursor-pointer flex flex-col items-center justify-center gap-1 ${
                          paymentMethod === "card" ? "border-indigo-650 bg-indigo-50/10 text-indigo-650" : "border-slate-200 text-slate-500 bg-white"
                        }`}
                      >
                        💳 Debit/Credit Card
                      </div>

                      <div 
                        onClick={() => !processing && setPaymentMethod("netbanking")}
                        className={`border rounded-none p-2.5 cursor-pointer flex flex-col items-center justify-center gap-1 ${
                          paymentMethod === "netbanking" ? "border-indigo-650 bg-indigo-50/10 text-indigo-650" : "border-slate-200 text-slate-500 bg-white"
                        }`}
                      >
                        🏦 Net Banking
                      </div>

                    </div>
                  </div>

                  {/* Secure alert banner */}
                  <div className="flex items-start gap-2 text-[10px] text-slate-400 font-semibold bg-slate-50/40 p-2 rounded-none leading-relaxed">
                    <Lock className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                    <span>Your payments are securely processed. PCI-DSS compliant 256-bit encryption.</span>
                  </div>

                </div>

                {/* Modal Footer */}
                <div className="px-5 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-2">
                  <button 
                    type="button" 
                    onClick={() => setCheckoutPlan(null)}
                    disabled={processing}
                    className="px-4 py-2 border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 font-bold text-xs rounded-none shadow-3xs cursor-pointer active:scale-95"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={processing}
                    className="px-4 py-2 bg-indigo-650 text-white font-bold text-xs rounded-none shadow-sm hover:bg-indigo-700 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 disabled:bg-slate-300 disabled:cursor-not-allowed"
                  >
                    {processing ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Pay & Upgrade
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
