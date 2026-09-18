import React, { useState } from "react";
import { 
  Wallet, 
  Settings as SettingsIcon, 
  TrendingUp, 
  MessageSquare, 
  Landmark, 
  ArrowUpRight, 
  X, 
  Lock, 
  Check, 
  Loader2,
  AlertCircle
} from "lucide-react";

const initialTransactions = [
  { id: 1, date: "Aug 22, 2026 08:14 PM", type: "Credit", channel: "Top-up", amount: 50000, balance: 54550, notes: "Top-up via Razorpay (instant)" },
  { id: 2, date: "Aug 22, 2026 08:13 PM", type: "Credit", channel: "Top-up", amount: 2500, balance: 4550, notes: "Top-up via Razorpay (instant)" },
  { id: 3, date: "Aug 22, 2026 08:13 PM", type: "Credit", channel: "Top-up", amount: 1000, balance: 2050, notes: "Top-up via Razorpay (instant)" },
  { id: 4, date: "Aug 22, 2026 08:12 PM", type: "Credit", channel: "Top-up", amount: 1000, balance: 1050, notes: "Top-up via Razorpay (instant)" },
  { id: 5, date: "Aug 12, 2026 08:27 PM", type: "Credit", channel: "Top-up", amount: 50, balance: 50, notes: "Top-up via Razorpay (instant)" }
];

export default function CommsWallet() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [balance, setBalance] = useState(54550);
  const [totalRecharged, setTotalRecharged] = useState(54550);
  const [messagesSent, setMessagesSent] = useState(890);
  const [spent30Days, setSpent30Days] = useState(0);

  // Modal states
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  
  // Add money form states
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Razorpay");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [lastCreditedAmount, setLastCreditedAmount] = useState(0);

  // Settings states
  const [lowBalanceAlert, setLowBalanceAlert] = useState(true);
  const [alertThreshold, setAlertThreshold] = useState("500");

  const handleSelectPreset = (amount) => {
    setCustomAmount(amount.toString());
  };

  const handleProceedPay = (e) => {
    e.preventDefault();
    const amountVal = parseFloat(customAmount);
    if (isNaN(amountVal) || amountVal <= 0) {
      alert("Please enter a valid amount greater than zero.");
      return;
    }

    setIsProcessing(true);

    // Simulate payment gateway loading
    setTimeout(() => {
      setIsProcessing(false);
      setShowAddMoneyModal(false);
      
      const newBalance = balance + amountVal;
      const newRecharged = totalRecharged + amountVal;
      
      // Add new transaction to the top of the list
      const newTx = {
        id: transactions.length + 1,
        date: new Date().toLocaleString("en-US", { 
          month: "short", 
          day: "2-digit", 
          year: "numeric", 
          hour: "2-digit", 
          minute: "2-digit", 
          hour12: true 
        }).replace(",", ""),
        type: "Credit",
        channel: "Top-up",
        amount: amountVal,
        balance: newBalance,
        notes: `Top-up via ${paymentMethod} (instant)`
      };

      setBalance(newBalance);
      setTotalRecharged(newRecharged);
      setTransactions([newTx, ...transactions]);
      setLastCreditedAmount(amountVal);
      setCustomAmount("");
      
      // Show success toast
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 4000);
    }, 1500);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 pb-20 font-sans">
      
      {/* Toast Notification */}
      {showSuccessToast && (
        <div className="fixed top-20 right-6 bg-slate-900 text-white px-4 py-3 rounded-none shadow-lg flex items-center gap-2.5 border border-slate-700/50 animate-bounce z-50 text-sm">
          <div className="w-6 h-6 rounded-none bg-emerald-500 flex items-center justify-center flex-shrink-0">
            <Check className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <span className="font-bold text-emerald-400">Success! </span>
            <span>Added ₹{lastCreditedAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })} to your wallet.</span>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Communication Wallet</h1>
        <p className="text-slate-500 text-sm">Prepaid balance for platform SMS & WhatsApp sends.</p>
      </div>

      {/* Balance Summary Card Block */}
      <div className="bg-white border border-slate-200 rounded-none p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        <div className="flex flex-wrap items-center gap-8">
          
          {/* Current balance purple box */}
          <div className="bg-indigo-600 text-white rounded-none p-4 flex items-center gap-4 min-w-[240px] shadow-sm relative overflow-hidden">
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white/10">
              <Wallet className="w-20 h-20" />
            </div>
            <div className="w-10 h-10 bg-white/20 rounded-none flex items-center justify-center text-white">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-indigo-150 font-semibold tracking-wide uppercase">Current balance</p>
              <p className="text-2xl font-extrabold mt-0.5">
                ₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          {/* Column metadata statistics */}
          <div className="flex gap-10">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Spent (30 days)</p>
              <p className="text-lg font-bold text-slate-700 mt-1">
                ₹{spent30Days.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Total recharged</p>
              <p className="text-lg font-bold text-slate-700 mt-1">
                ₹{totalRecharged.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Messages sent</p>
              <p className="text-lg font-bold text-slate-700 mt-1">{messagesSent}</p>
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => setShowAddMoneyModal(true)}
            className="px-5 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-none hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95 shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <span className="text-sm font-light">+</span> Add Money
          </button>
          
          <button 
            onClick={() => setShowSettingsModal(true)}
            className="px-4 py-2.5 border border-slate-350 text-slate-600 bg-white font-bold text-xs rounded-none hover:bg-slate-50 transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
          >
            <SettingsIcon className="w-3.5 h-3.5 text-slate-500" />
            Settings
          </button>
        </div>

      </div>

      {/* Transaction History Table */}
      <div className="bg-white border border-slate-200 rounded-none overflow-hidden shadow-2xs">
        
        {/* Table Header Row */}
        <div className="px-5 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <h2 className="font-bold text-slate-800 text-sm">Transaction history</h2>
          <span className="text-xs text-slate-400 font-semibold">{transactions.length} shown</span>
        </div>

        {/* Table Element */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-55 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-5">Date</th>
                <th className="py-3 px-5">Type</th>
                <th className="py-3 px-5">Channel</th>
                <th className="py-3 px-5">Amount</th>
                <th className="py-3 px-5">Balance</th>
                <th className="py-3 px-5">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-600">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 px-5 font-semibold text-slate-800">{tx.date}</td>
                  <td className="py-3.5 px-5">
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-none text-[10px] font-bold uppercase tracking-wide">
                      {tx.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-2">
                      <Landmark className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-medium text-slate-700">{tx.channel}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-5 font-bold text-emerald-600">
                    +₹{tx.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3.5 px-5 font-semibold text-slate-700">
                    ₹{tx.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3.5 px-5 text-slate-500 font-medium">{tx.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* ADD MONEY DRAWER / MODAL POPUP */}
      {showAddMoneyModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-end z-50 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-300">
            
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
              <div className="flex items-center gap-2 text-indigo-600">
                <Wallet className="w-5 h-5" />
                <h3 className="font-bold text-slate-800 text-sm">Add money to wallet</h3>
              </div>
              <button 
                onClick={() => {
                  setShowAddMoneyModal(false);
                  setCustomAmount("");
                }}
                className="p-1.5 text-slate-400 hover:text-slate-650 hover:bg-slate-100 rounded-none transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Scroll Body */}
            <div className="flex-1 p-6 space-y-6 overflow-y-auto">
              
              {/* Preset Buttons 2x2 grid */}
              <div className="grid grid-cols-2 gap-3">
                {[100, 250, 500, 1000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => handleSelectPreset(amt)}
                    className={`py-3 px-4 border rounded-none text-sm font-semibold transition-all hover:bg-slate-50 active:scale-95 cursor-pointer ${
                      customAmount === amt.toString() 
                        ? 'border-indigo-600 text-indigo-600 bg-indigo-50/20' 
                        : 'border-slate-200 text-slate-700 bg-white'
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>

              {/* Custom amount label and input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Custom amount</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-slate-450 text-sm font-semibold">₹</span>
                  <input 
                    type="number" 
                    placeholder="Enter amount" 
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full pl-7 pr-4 py-2.5 bg-slate-50 text-slate-800 placeholder-slate-400 border border-slate-200 rounded-none text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-semibold"
                  />
                </div>
              </div>

              {/* Pay with method dropdown */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Pay with</label>
                <select 
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-none text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer font-medium"
                >
                  <option value="Razorpay">Razorpay</option>
                  <option value="Stripe">Stripe (International Cards)</option>
                  <option value="Netbanking">Netbanking</option>
                  <option value="UPI">UPI / GPay</option>
                </select>
              </div>

              {/* Proceed Button */}
              <button 
                onClick={handleProceedPay}
                disabled={isProcessing || !customAmount}
                className={`w-full py-3 bg-indigo-600 text-white font-bold text-xs rounded-none shadow-md transition-all hover:bg-indigo-700 flex items-center justify-center gap-2 cursor-pointer ${
                  isProcessing || !customAmount ? 'opacity-60 cursor-not-allowed' : 'hover:scale-102 active:scale-98'
                }`}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5 text-white" />
                    Proceed to Pay
                  </>
                )}
              </button>

              {/* Checkout note details */}
              <p className="text-[11px] text-center text-slate-400 font-medium leading-relaxed max-w-[280px] mx-auto">
                Secure checkout — the balance is credited automatically after payment.
              </p>

            </div>

          </div>
        </div>
      )}

      {/* SETTINGS DRAWER / MODAL */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-md rounded-none shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in duration-200">
            
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-slate-800 text-sm">Wallet Notification Settings</h3>
              <button 
                onClick={() => setShowSettingsModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-650 hover:bg-slate-100 rounded-none transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              
              {/* Alert Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-slate-800">Low Balance Alerts</h4>
                  <p className="text-[10px] text-slate-400">Receive alert notifications when balance goes low.</p>
                </div>
                <button 
                  onClick={() => setLowBalanceAlert(!lowBalanceAlert)}
                  className={`relative inline-flex h-5.5 w-10 flex-shrink-0 cursor-pointer rounded-none border-2 border-transparent transition-colors duration-200 ease-in-out ${lowBalanceAlert ? 'bg-indigo-600' : 'bg-slate-200'}`}
                >
                  <span className={`pointer-events-none inline-block h-4.5 w-4.5 transform rounded-none bg-white transition duration-200 ease-in-out ${lowBalanceAlert ? 'translate-x-4.5' : 'translate-x-0'}`} />
                </button>
              </div>

              {/* Threshold Selection */}
              {lowBalanceAlert && (
                <div className="space-y-2 animate-in slide-in-from-top duration-200">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Alert Threshold</label>
                  <select 
                    value={alertThreshold}
                    onChange={(e) => setAlertThreshold(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-none text-xs text-slate-700"
                  >
                    <option value="100">₹100.00</option>
                    <option value="500">₹500.00</option>
                    <option value="1000">₹1,000.00</option>
                    <option value="5000">₹5,000.00</option>
                  </select>
                </div>
              )}

              {/* API Info alert */}
              <div className="p-3.5 bg-indigo-50/50 border border-indigo-150 rounded-none flex items-start gap-2.5">
                <AlertCircle className="w-4.5 h-4.5 text-indigo-600 mt-0.5 flex-shrink-0" />
                <div className="text-[10px] text-indigo-900 leading-normal font-medium">
                  <span className="font-bold">Rate Information: </span>
                  Standard SMS are debited at ₹0.25 per send. Official WhatsApp notifications are debited at ₹0.48 per template session.
                </div>
              </div>

            </div>

            <div className="p-4 border-t bg-slate-50 flex justify-end">
              <button 
                onClick={() => {
                  setShowSettingsModal(false);
                  alert("Wallet threshold alerts configured successfully.");
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-none text-xs font-bold hover:bg-indigo-700 transition-all shadow-sm active:scale-95"
              >
                Apply Settings
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
