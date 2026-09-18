import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data
  const complaint = {
    id: id || '6',
    complainantName: 'Par (87868767678)',
    date: '13 August, 2026',
    type: 'Academic',
    status: 'In Progress',
    assignedTo: 'Amit Sharma',
    description: 'This is description',
    actionTaken: 'No action taken yet.'
  };

  return (
    <div className="flex flex-col h-full bg-[#f4f6f8] overflow-y-auto">
      
      {/* Header */}
      <div className="px-8 pt-6 pb-6 bg-white border-b border-gray-200 shrink-0">
        <h1 className="text-2xl font-bold text-[#1a1a2e]">Complaint Details #{complaint.id}</h1>
        <p className="text-[13px] text-gray-500 mt-1">Full complaint record</p>
      </div>

      <div className="p-8 w-full max-w-5xl mx-auto">
        
        <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <table className="w-full text-left text-[13px]">
              <tbody>
                <tr>
                  <td className="py-2.5 font-bold text-gray-700 w-1/4">Complainant Name</td>
                  <td className="py-2.5 text-gray-600">{complaint.complainantName}</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold text-gray-700">Complaint Date</td>
                  <td className="py-2.5 text-gray-600">{complaint.date}</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold text-gray-700">Type</td>
                  <td className="py-2.5 text-gray-600">{complaint.type}</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold text-gray-700">Status</td>
                  <td className="py-2.5 text-gray-600">{complaint.status}</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold text-gray-700">Assigned To</td>
                  <td className="py-2.5 text-gray-600">{complaint.assignedTo}</td>
                </tr>
              </tbody>
            </table>

            <hr className="my-4 border-gray-200" />

            <table className="w-full text-left text-[13px]">
              <tbody>
                <tr>
                  <td className="py-2.5 font-bold text-gray-700 w-1/4 align-top">Description</td>
                  <td className="py-2.5 text-gray-600">{complaint.description}</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold text-gray-700 align-top">Action Taken</td>
                  <td className="py-2.5 text-gray-600">{complaint.actionTaken}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-gray-200 bg-white">
            <button 
              onClick={() => navigate('/front-office/complaints')}
              className="px-4 py-2 border border-gray-300 text-gray-600 rounded-none flex items-center gap-2 text-[13px] font-bold hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to List
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ComplaintDetails;
