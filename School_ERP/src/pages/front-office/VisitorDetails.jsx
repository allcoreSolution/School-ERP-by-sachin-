import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const VisitorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data for the view
  const visitor = {
    id: id,
    name: 'Anil Verma (Father)',
    phone: '6263056779',
    purpose: 'principal',
    personToMeet: 'School Staff',
    idCardNumber: 'N/A',
    checkInTime: '11 August 2026, 03:23 PM',
    checkOutTime: '11 August 2026, 03:24 PM',
    notes: 'N/A'
  };

  return (
    <div className="flex flex-col h-full bg-[#f4f6f8] overflow-y-auto">
      
      {/* Header */}
      <div className="px-8 pt-6 pb-6 bg-white border-b border-gray-200 shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/front-office/visitor-book')}
            className="text-gray-500 hover:text-[#5F52FF] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a2e]">Visitor Details: {visitor.name}</h1>
            <p className="text-[13px] text-gray-500 mt-1">Full visitor log entry</p>
          </div>
        </div>
      </div>

      <div className="p-8 w-full">
        
        <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            
            {/* Left side: Details Table */}
            <div className="flex-1 p-6 lg:border-r border-gray-200">
              <table className="w-full text-left text-[13px]">
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-2.5 font-bold text-gray-700 w-1/3">Visitor Name</td>
                    <td className="py-2.5 text-gray-600">{visitor.name}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2.5 font-bold text-gray-700">Phone</td>
                    <td className="py-2.5 text-gray-600">{visitor.phone}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2.5 font-bold text-gray-700">Purpose</td>
                    <td className="py-2.5 text-gray-600">{visitor.purpose}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2.5 font-bold text-gray-700">Person to Meet</td>
                    <td className="py-2.5 text-gray-600">{visitor.personToMeet}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2.5 font-bold text-gray-700">ID Card Number</td>
                    <td className="py-2.5 text-gray-600">{visitor.idCardNumber}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2.5 font-bold text-gray-700">Check-In Time</td>
                    <td className="py-2.5 text-gray-600">{visitor.checkInTime}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2.5 font-bold text-gray-700">Check-Out Time</td>
                    <td className="py-2.5 text-gray-600">{visitor.checkOutTime}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-gray-700">Notes</td>
                    <td className="py-2.5 text-gray-600">{visitor.notes}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Right side: Photo */}
            <div className="w-full lg:w-[400px] bg-gray-50 flex items-center justify-center p-6 shrink-0">
              <div className="w-full max-w-[300px] border-4 border-white shadow-md bg-gray-200 aspect-[3/4] flex items-center justify-center overflow-hidden">
                {/* Fallback avatar if no photo available, but here we just show a placeholder image style */}
                <div className="text-center text-gray-400">
                  <div className="text-4xl mb-2">📸</div>
                  <div className="text-sm font-medium">Visitor Photo</div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default VisitorDetails;
