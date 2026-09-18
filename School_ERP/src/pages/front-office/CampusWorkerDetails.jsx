import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User, LogOut, Edit, Trash2, Printer, ShieldCheck } from 'lucide-react';

const CampusWorkerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-[#f4f6f8] overflow-y-auto">
      
      {/* Header */}
      <div className="px-8 pt-6 pb-6 bg-white border-b border-gray-200 shrink-0 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a2e]">CW/YIS/2026/00001</h1>
          <p className="text-[13px] text-gray-500 mt-1">Campus Worker Details</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-[#dc3545] text-white text-[12px] font-bold px-3 py-1 rounded-none shadow-sm">
            Expired
          </span>
          <span className="bg-[#ffc107] text-gray-900 text-[12px] font-bold px-3 py-1 rounded-none shadow-sm">
            Police Check Not Verified
          </span>
        </div>
      </div>

      <div className="p-8 w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
        
        {/* Left Column */}
        <div className="w-full md:w-2/3 flex flex-col gap-6">
          
          <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-3 border-b border-gray-200 bg-white">
              <h2 className="text-[13px] font-bold text-[#5F52FF] flex items-center gap-2">
                <User className="w-4 h-4" /> Rahul Singh
              </h2>
            </div>
            <div className="p-5 flex flex-col md:flex-row gap-6">
              <div className="w-32 h-32 border border-dashed border-gray-300 rounded-none flex items-center justify-center bg-gray-50 text-[11px] text-gray-400 shrink-0">
                No photo
              </div>
              <table className="w-full text-left text-[13px]">
                <tbody>
                  <tr>
                    <td className="py-2 text-gray-500 w-1/3">Type of work</td>
                    <td className="py-2 text-gray-800 font-medium">Housekeeping</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-500">Mobile number</td>
                    <td className="py-2 text-gray-800">9876543210</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-500">Agency / contractor</td>
                    <td className="py-2 text-gray-800">Clean Sweep Services</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-500">Agency contact</td>
                    <td className="py-2 text-gray-800">Mr. Sharma - 9988776655</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-500">ID proof</td>
                    <td className="py-2 text-gray-800">Aadhaar ending 5678</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-500">Valid From</td>
                    <td className="py-2 text-gray-800">02 Aug 2026</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-500">Valid Until</td>
                    <td className="py-2 text-gray-800">02 Aug 2026</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-3 border-b border-gray-200 bg-white">
              <h2 className="text-[13px] font-bold text-[#5F52FF] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> Police Verification
              </h2>
            </div>
            <div className="p-5">
              <table className="w-full text-left text-[13px]">
                <tbody>
                  <tr>
                    <td className="py-2 text-gray-500 w-1/3">Verification on record</td>
                    <td className="py-2 text-[#dc3545] font-bold">No</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-500">Verified on</td>
                    <td className="py-2 text-gray-800">--</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-500">Document</td>
                    <td className="py-2 text-gray-800">None attached</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-500 align-top">Notes</td>
                    <td className="py-2 text-gray-800">Waiting for agency to send documents.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="w-full md:w-1/3 flex flex-col gap-6">
          
          <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-3 border-b border-gray-200 bg-white">
              <h2 className="text-[13px] font-bold text-[#5F52FF] flex items-center gap-2">
                <LogOut className="w-4 h-4" /> Actions
              </h2>
            </div>
            <div className="p-4 flex flex-col gap-3">
              <button 
                onClick={() => navigate(`/front-office/campus-workers/edit/${id}`)}
                className="w-full bg-[#fd7e14] hover:bg-[#e86f0b] text-white py-2 rounded-none text-[13px] font-bold flex justify-center items-center gap-2 shadow-sm transition-colors"
              >
                <Edit className="w-4 h-4" /> Edit Worker
              </button>
              <button 
                onClick={() => window.print()}
                className="w-full border border-gray-300 bg-white text-gray-700 py-2 rounded-none text-[13px] font-bold flex justify-center items-center gap-2 hover:bg-gray-50 transition-colors"
              >
                <Printer className="w-4 h-4" /> Print Badge
              </button>
              <button 
                onClick={() => { alert('Worker deleted'); navigate('/front-office/campus-workers'); }}
                className="w-full border border-red-300 bg-white text-red-600 py-2 rounded-none text-[13px] font-bold flex justify-center items-center gap-2 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" /> Delete Worker
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CampusWorkerDetails;
