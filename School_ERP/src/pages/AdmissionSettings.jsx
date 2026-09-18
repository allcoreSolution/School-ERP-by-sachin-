import React, { useState } from 'react';
import { 
  CreditCard, List, Share2, HelpCircle, Copy, ExternalLink, 
  Plus, Edit, Trash2, Upload, Info, Image as ImageIcon, Download
} from 'lucide-react';

export default function AdmissionSettings() {
  const [enableFee, setEnableFee] = useState(true);

  const customFields = [
    { order: 0, label: 'Father Photo', type: 'file', required: 'No' },
    { order: 0, label: 'Blood', type: 'text', required: 'No' },
    { order: 0, label: 'CWSN', type: 'select', required: 'No' },
  ];

  return (
    <div className="bg-[#f4f7fc] min-h-[calc(100vh-64px)] font-sans p-6 pb-20">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[22px] font-semibold text-gray-800">Admission Form Configuration</h1>
        <button className="flex items-center px-3 py-1.5 bg-[#17a2b8] text-white rounded-none text-sm font-bold hover:bg-[#138496] transition-colors">
          <HelpCircle className="w-4 h-4 mr-1.5" />
          How it Works
        </button>
      </div>

      {/* Top Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        
        {/* Fee & Payment Settings (Left) */}
        <div className="lg:col-span-4 bg-white rounded-none border-t-2 border-t-[#f39c12] border-x border-b border-gray-200 shadow-sm flex flex-col">
          <div className="p-4 border-b border-gray-100 flex items-center bg-gray-50/50">
            <CreditCard className="w-4 h-4 text-gray-700 mr-2" />
            <h2 className="text-sm font-bold text-gray-800">Fee & Payment Settings</h2>
          </div>
          
          <div className="p-5 flex-grow space-y-5">
            {/* Toggle */}
            <div className="flex items-center">
              <div 
                className={`w-10 h-5 rounded-none mr-3 relative cursor-pointer transition-colors flex-shrink-0 ${enableFee ? 'bg-[#007bff]' : 'bg-gray-300'}`}
                onClick={() => setEnableFee(!enableFee)}
              >
                <div className={`w-4 h-4 bg-white rounded-none absolute top-0.5 transition-all ${enableFee ? 'left-5' : 'left-0.5'}`}></div>
              </div>
              <span className="text-[13px] font-bold text-gray-800">Enable Admission Fee</span>
            </div>

            {/* URL Slug */}
            <div>
              <label className="block text-[12px] font-bold text-gray-700 mb-1">Custom Public URL Slug</label>
              <input 
                type="text" 
                defaultValue="yug-international"
                className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none focus:border-[#5542f6]"
              />
              <p className="text-[10px] text-gray-500 mt-1 leading-tight">
                This will be your admission link: <strong>https://schoola.multischoolerp.com/admission</strong><br/>
                <span className="text-green-600 flex items-center mt-0.5">
                  <div className="w-2 h-2 rounded-none bg-green-500 mr-1"></div>
                  Shown natively on your website — matches your site design.
                </span>
              </p>
            </div>

            {/* Fee Amount */}
            <div>
              <label className="block text-[12px] font-bold text-gray-700 mb-1">Fee Amount (₹)</label>
              <input 
                type="number" 
                step="0.01"
                defaultValue="0.00"
                className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none focus:border-[#5542f6]"
              />
            </div>

            {/* QR Code */}
            <div>
              <label className="block text-[12px] font-bold text-gray-700 mb-1">Payment QR Code (UPI)</label>
              <div className="flex">
                <div className="flex-1 border border-r-0 border-gray-300 rounded-l p-2 text-sm text-gray-500 bg-white">
                  Choose file...
                </div>
                <button className="px-4 py-2 bg-gray-200 border border-gray-300 rounded-r text-sm text-gray-700 hover:bg-gray-300">
                  Browse
                </button>
              </div>
              <p className="text-[10px] text-gray-400 mt-1">Upload your GPay/PhonePe/Paytm QR Code image. (png, jpg - max 2MB)</p>
            </div>
          </div>

          <div className="p-4 bg-white border-t border-gray-100 rounded-b-lg">
            <button className="w-full py-2 bg-[#f39c12] text-white rounded-none text-sm font-bold hover:bg-[#e67e22] transition-colors shadow-sm">
              Save Settings
            </button>
          </div>
        </div>

        {/* Custom Form Fields (Right) */}
        <div className="lg:col-span-8 bg-white rounded-none border-t-2 border-t-[#17a2b8] border-x border-b border-gray-200 shadow-sm flex flex-col">
          <div className="p-4 border-b border-gray-100 flex items-center bg-gray-50/50">
            <List className="w-4 h-4 text-gray-700 mr-2" />
            <h2 className="text-sm font-bold text-gray-800">Custom Form Fields</h2>
          </div>
          
          <div className="p-5 flex-grow">
            
            {/* Add New Field Box */}
            <div className="bg-[#f8f9fa] border border-gray-200 rounded-none p-4 mb-6">
              <h3 className="text-[13px] font-bold text-gray-600 mb-3">Add New Field</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-3">
                <div className="md:col-span-4">
                  <input type="text" placeholder="Field Label (e.g. Blood Group)" className="w-full border border-gray-300 rounded-none px-3 py-1.5 text-sm outline-none focus:border-[#17a2b8]" />
                </div>
                <div className="md:col-span-4">
                  <select className="w-full border border-gray-300 rounded-none px-3 py-1.5 text-sm outline-none bg-white focus:border-[#17a2b8]">
                    <option>Text Input</option>
                    <option>Dropdown Select</option>
                    <option>File Upload</option>
                  </select>
                </div>
                <div className="md:col-span-4">
                  <input type="text" placeholder="Options (comma separated)" className="w-full border border-gray-300 rounded-none px-3 py-1.5 text-sm outline-none focus:border-[#17a2b8]" />
                  <p className="text-[9px] text-gray-400 mt-0.5 ml-1">Only for Dropdown</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                <div className="md:col-span-4 flex items-center">
                  <input type="checkbox" className="mr-2 rounded-none border-gray-300 text-[#17a2b8]" />
                  <span className="text-[13px] text-gray-600 font-medium">Required Field</span>
                </div>
                <div className="md:col-span-4">
                  <input type="text" placeholder="Sort Order (0, 1, 2...)" className="w-full border border-gray-300 rounded-none px-3 py-1.5 text-sm outline-none focus:border-[#17a2b8]" />
                </div>
                <div className="md:col-span-4 flex justify-end">
                  <button className="w-full md:w-auto px-6 py-1.5 bg-[#28a745] text-white rounded-none text-sm font-bold hover:bg-[#218838] shadow-sm flex items-center justify-center">
                    <Plus className="w-4 h-4 mr-1" /> Add
                  </button>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="border border-gray-200 rounded-none overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-[12px]">
                    <th className="p-3 font-semibold w-16">Order</th>
                    <th className="p-3 font-semibold">Label</th>
                    <th className="p-3 font-semibold w-24">Type</th>
                    <th className="p-3 font-semibold w-24">Required</th>
                    <th className="p-3 font-semibold w-24 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="text-[13px]">
                  {customFields.map((field, idx) => (
                    <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50/50">
                      <td className="p-3 text-gray-600">{field.order}</td>
                      <td className="p-3 font-medium text-gray-800">{field.label}</td>
                      <td className="p-3">
                        <span className="bg-[#17a2b8] text-white px-2 py-0.5 rounded-none text-[11px] font-bold">
                          {field.type}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="bg-gray-500 text-white px-2 py-0.5 rounded-none text-[11px] font-bold">
                          {field.required}
                        </span>
                      </td>
                      <td className="p-3 flex justify-center space-x-1">
                        <button className="w-6 h-6 bg-[#17a2b8] text-white rounded-none flex items-center justify-center hover:bg-[#138496]">
                          <Edit className="w-3 h-3" />
                        </button>
                        <button className="w-6 h-6 bg-[#dc3545] text-white rounded-none flex items-center justify-center hover:bg-[#c82333]">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Row - Smart Share & Digital Card */}
      <div className="bg-white rounded-none border-t-2 border-t-[#6f42c1] border-x border-b border-gray-200 shadow-sm">
        <div className="p-4 border-b border-gray-100 flex items-center bg-gray-50/50">
          <Share2 className="w-4 h-4 text-gray-700 mr-2" />
          <h2 className="text-sm font-bold text-gray-800">Smart Share & Digital Card</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          
          {/* Left Side (Links & Instructions) */}
          <div className="flex flex-col border-r border-gray-100 pr-0 md:pr-8">
            
            <div className="mb-4">
              <label className="block text-[12px] font-bold text-gray-800 mb-1">Direct Admission Link</label>
              <div className="flex">
                <input 
                  type="text" 
                  readOnly 
                  value="https://schoola.multischoolerp.com/admission"
                  className="flex-1 border border-gray-300 border-r-0 bg-gray-100 rounded-l p-2 text-sm text-gray-600 outline-none"
                />
                <button className="px-4 py-2 bg-[#6f42c1] text-white rounded-r text-sm font-bold hover:bg-[#5a32a3] flex items-center">
                  <Copy className="w-4 h-4 mr-1" /> Copy
                </button>
              </div>
            </div>

            <button className="w-full py-2 mb-6 border border-[#007bff] text-[#007bff] rounded-none text-sm font-bold hover:bg-[#007bff]/5 flex items-center justify-center transition-colors">
              <ExternalLink className="w-4 h-4 mr-2" /> Preview Admission Form
            </button>

            <div className="bg-white border border-gray-200 border-l-4 border-l-[#17a2b8] rounded-none p-4 shadow-sm">
              <h4 className="flex items-center font-bold text-gray-800 text-[13px] mb-2">
                <Info className="w-4 h-4 mr-1.5" /> Instructions
              </h4>
              <p className="text-[13px] text-gray-700 mb-2">Use the <strong>Digital Card</strong> on the right to promote admissions. You can:</p>
              <ul className="list-disc list-inside text-[13px] text-gray-600 space-y-1">
                <li>Share on WhatsApp Status or Groups.</li>
                <li>Print and stick it on your Notice Board.</li>
                <li>Attach it to your email signature.</li>
              </ul>
            </div>

          </div>

          {/* Right Side (Digital Card) */}
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-[15px] font-medium text-gray-600 mb-4">Digital Admission Card</h3>
            
            {/* Card UI */}
            <div className="w-[280px] bg-white rounded-none shadow-lg border border-gray-200 overflow-hidden flex flex-col mb-4">
              {/* Card Header (Gradient) */}
              <div className="bg-gradient-to-br from-[#6f42c1] to-[#007bff] h-[120px] p-4 flex flex-col items-center justify-center text-white relative">
                <div className="w-12 h-12 bg-white rounded-none mb-2 flex items-center justify-center p-1 shadow-sm">
                  <img src="https://placehold.co/40x40/ffffff/5542f6?text=LOGO" alt="Logo" className="rounded-none" />
                </div>
                <h2 className="font-bold text-[15px]">YUG-SCHOOL</h2>
                <p className="text-[11px] opacity-90">Admissions Open 2026-27</p>
              </div>
              
              {/* QR Code Area */}
              <div className="p-6 flex flex-col items-center bg-white flex-grow">
                <div className="p-2 border border-dashed border-gray-300 rounded-none mb-3">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://schoola.multischoolerp.com/admission" alt="QR Code" className="w-[120px] h-[120px]" />
                </div>
                <h3 className="font-bold text-gray-800 text-sm mb-1">Scan to Apply Online</h3>
                <p className="text-[9px] text-gray-400 text-center">Scan using Camera, Google Lens or UPI App</p>
              </div>

              {/* Card Footer */}
              <div className="bg-gray-100 p-2 text-center border-t border-gray-200">
                <p className="text-[9px] text-gray-400">Powered by School Management System</p>
              </div>
            </div>

            <button className="px-6 py-2 bg-[#28a745] text-white rounded-none text-sm font-bold hover:bg-[#218838] shadow-sm flex items-center">
              <Download className="w-4 h-4 mr-2" /> Download Card Image
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
