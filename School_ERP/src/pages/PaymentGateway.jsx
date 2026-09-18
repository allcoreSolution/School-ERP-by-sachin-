import React, { useState } from 'react';
import { CreditCard, Zap, Info, Save } from 'lucide-react';

export default function PaymentGateway() {
  const [isOnlineFeeEnabled, setIsOnlineFeeEnabled] = useState(true);

  return (
    <div className="bg-[#f4f7fc] min-h-[calc(100vh-64px)] font-sans p-6">
      <div className="mb-6">
        <h1 className="text-[20px] font-semibold text-gray-800">Payment Gateway Settings</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Panel - Settings */}
        <div className="flex-1 bg-white rounded-none border border-gray-200 shadow-sm flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-100 flex items-center bg-gray-50/50">
            <CreditCard className="w-5 h-5 text-[#5542f6] mr-2" />
            <h2 className="text-sm font-bold text-gray-800">Online Fee Collection</h2>
          </div>

          <div className="p-6 flex-grow space-y-6">
            
            {/* Toggle Switch */}
            <div className="flex items-center">
              <div 
                className={`w-10 h-5 rounded-none mr-3 relative cursor-pointer transition-colors flex-shrink-0 ${isOnlineFeeEnabled ? 'bg-green-500' : 'bg-gray-300'}`}
                onClick={() => setIsOnlineFeeEnabled(!isOnlineFeeEnabled)}
              >
                <div className={`w-4 h-4 bg-white rounded-none absolute top-0.5 transition-all ${isOnlineFeeEnabled ? 'left-5' : 'left-0.5'}`}></div>
              </div>
              <span className="text-[13px] font-medium text-gray-800">
                Allow parents to pay school fees online through the Parent Portal.
              </span>
            </div>

            {/* Payment Provider Dropdown */}
            <div>
              <label className="block text-[11px] font-bold text-gray-600 mb-1">Payment Provider</label>
              <select className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none bg-white focus:border-[#5542f6] focus:ring-1 focus:ring-[#5542f6]">
                <option>UPI QR — India</option>
                <option>Stripe</option>
                <option>Razorpay</option>
                <option>Paytm</option>
              </select>
            </div>

            {/* Live Credentials Section */}
            <div className="border border-gray-200 rounded-none overflow-hidden relative">
              {/* Badge */}
              <div className="absolute top-2 right-2 bg-green-50 text-green-600 border border-green-200 px-2 py-0.5 rounded-none text-[10px] font-bold uppercase">
                Live
              </div>
              
              <div className="p-3 border-b border-gray-100 flex items-center bg-gray-50/50">
                <Zap className="w-4 h-4 text-[#5542f6] mr-2" />
                <h3 className="text-[13px] font-bold text-gray-800">Live Credentials</h3>
              </div>
              
              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">
                    UPI ID (e.g. school@okaxis) <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    defaultValue="projectworlds@axisbank"
                    className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none focus:border-[#5542f6] focus:ring-1 focus:ring-[#5542f6]"
                  />
                  <p className="text-[11px] text-gray-400 mt-1">The VPA that will receive the payment.</p>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">
                    Merchant Name (e.g. Global School) <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    defaultValue="projectworlds"
                    className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none focus:border-[#5542f6] focus:ring-1 focus:ring-[#5542f6]"
                  />
                  <p className="text-[11px] text-gray-400 mt-1">Shown to the parent in their UPI app.</p>
                </div>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Surcharge Section */}
            <div>
              <h3 className="text-sm font-bold text-gray-800 mb-1">Online Payment Surcharge (Optional)</h3>
              <p className="text-[12px] text-gray-500 mb-4">You can add a surcharge to online payments to cover gateway fees. This will be added to the amount the parent pays.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">Charge Type</label>
                  <select className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none bg-white focus:border-[#5542f6] focus:ring-1 focus:ring-[#5542f6]">
                    <option>Percentage (%)</option>
                    <option>Fixed Amount (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">Charge Amount / Percentage</label>
                  <input 
                    type="number" 
                    step="0.01"
                    defaultValue="3.54"
                    className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none focus:border-[#5542f6] focus:ring-1 focus:ring-[#5542f6]"
                  />
                </div>
              </div>
            </div>
            
          </div>
          
          {/* Footer Save Button */}
          <div className="p-4 border-t border-gray-100 flex justify-end bg-gray-50/50 mt-auto rounded-b-lg">
            <button className="flex items-center px-4 py-2 bg-[#5542f6] text-white rounded-none text-sm font-bold hover:bg-[#4a3ae0] transition-colors shadow-sm">
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </button>
          </div>
        </div>

        {/* Right Panel - Instructions */}
        <div className="w-full lg:w-[350px] xl:w-[400px] flex-shrink-0">
          <div className="bg-white rounded-none border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-100 flex items-center bg-gray-50/50">
              <Info className="w-4 h-4 text-[#5542f6] mr-2" />
              <h2 className="text-sm font-bold text-gray-800">Setup Instructions</h2>
            </div>
            <div className="p-5">
              <h3 className="text-sm font-bold text-gray-800 mb-2">UPI QR setup</h3>
              <ol className="text-[13px] text-gray-600 space-y-2 mb-6 list-decimal list-inside">
                <li>Enter your school's UPI ID (VPA) and the display name parents will see.</li>
                <li>A QR code is generated automatically; the parent pays with any UPI app and uploads proof, which you approve under <strong>Fees &rarr; Online Payments</strong>.</li>
              </ol>

              <div>
                <label className="block text-[12px] font-bold text-gray-800 mb-1">Webhook URL:</label>
                <div className="relative">
                  <input 
                    type="text" 
                    readOnly 
                    value="https://demo.multischoolerp.com/school/webhooks/upiqr"
                    className="w-full border border-gray-200 bg-gray-100 rounded-none p-2 text-[11px] text-gray-500 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
