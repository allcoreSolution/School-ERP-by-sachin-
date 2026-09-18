import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  User, CheckCircle, PhoneCall, PlusCircle, Edit3, ArrowLeft, 
  MessageSquare, FileText, IndianRupee, Hash, ShieldCheck
} from 'lucide-react';

const EnquiryDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data for the view
  const enquiry = {
    id: id,
    studentName: 'stgunwrmki',
    classApplied: 'Nursery',
    parentName: 'stgunwrnki',
    contact: '+1-927-460-2825',
    email: 'sggrgdghs@testhvnsgukusn.edu',
    date: '11 Aug, 2026',
    status: 'Followed-up',
    nextFollowUp: 'Not set',
    assignedStaff: 'Amit Sharma',
    notes: 'dfsafsasangffsnnmggguulnnrt@gnxnnlx',
  };

  return (
    <div className="flex flex-col h-full bg-[#f4f6f8] overflow-y-auto">
      
      {/* Header */}
      <div className="px-8 pt-6 pb-6 bg-white border-b border-gray-200 shrink-0">
        <h1 className="text-2xl font-bold text-[#1a1a2e]">Enquiry Details: {enquiry.studentName}</h1>
      </div>

      <div className="p-8 w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Basic Information */}
          <div className="bg-white border-t-4 border-t-[#fd7e14] shadow-sm overflow-hidden">
            <div className="p-2 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
              <FileText className="w-4 h-4 text-gray-700" />
              <h2 className="text-[13px] font-bold text-gray-800">Basic Information</h2>
            </div>
            
            <div className="p-6">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-[#6c757d] rounded-none flex items-center justify-center text-white">
                  <User className="w-8 h-8" />
                </div>
              </div>

              <table className="w-full text-left text-[13px]">
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-2.5 font-bold text-gray-700 w-1/3">Student Name</td>
                    <td className="py-2.5 text-gray-600">{enquiry.studentName}</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-2.5 font-bold text-gray-700 w-1/3">Class Applied</td>
                    <td className="py-2.5 text-gray-600">{enquiry.classApplied}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2.5 font-bold text-gray-700 w-1/3">Parent Name</td>
                    <td className="py-2.5 text-gray-600">{enquiry.parentName}</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-2.5 font-bold text-gray-700 w-1/3">Contact</td>
                    <td className="py-2.5 text-gray-600">
                      <div>{enquiry.contact}</div>
                      <div className="text-[11px] text-blue-500 mt-1">{enquiry.email}</div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2.5 font-bold text-gray-700 w-1/3">Enquiry Date</td>
                    <td className="py-2.5 text-gray-600">{enquiry.date}</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-2.5 font-bold text-gray-700 w-1/3">Current Status</td>
                    <td className="py-2.5">
                      <span className="bg-[#17a2b8] text-white text-[11px] font-bold px-2 py-1 rounded-none shadow-sm">{enquiry.status}</span>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2.5 font-bold text-gray-700 w-1/3">Next Follow-up</td>
                    <td className="py-2.5 text-gray-400">{enquiry.nextFollowUp}</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="py-2.5 font-bold text-gray-700 w-1/3">Assigned Staff</td>
                    <td className="py-2.5 text-gray-600">{enquiry.assignedStaff}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-gray-700 w-1/3">Address/Notes</td>
                    <td className="py-2.5 text-gray-600">{enquiry.notes}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Payment Details */}
          <div className="bg-white border-t-4 border-t-[#ffc107] shadow-sm overflow-hidden">
            <div className="p-2 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-gray-700" />
              <h2 className="text-[13px] font-bold text-gray-800">Payment Details</h2>
            </div>
            <div className="p-6 flex items-center justify-around text-center">
              <div>
                <div className="text-[15px] font-bold text-[#28a745]">₹0.00</div>
                <div className="text-[10px] font-bold text-gray-400 mt-1">AMOUNT</div>
              </div>
              <div className="w-px h-10 bg-gray-200"></div>
              <div>
                <div className="text-[13px] font-bold text-[#1a1a2e]">N/A</div>
                <div className="text-[10px] font-bold text-gray-400 mt-1">TXN ID</div>
              </div>
              <div className="w-px h-10 bg-gray-200"></div>
              <div>
                <div className="bg-gray-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-none shadow-sm inline-block">N/A</div>
                <div className="text-[10px] font-bold text-gray-400 mt-1">STATUS</div>
              </div>
            </div>
          </div>

          {/* Follow-up History */}
          <div className="bg-white border-t-4 border-t-[#fd7e14] shadow-sm overflow-hidden">
            <div className="p-2 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-gray-700" />
                <h2 className="text-[13px] font-bold text-gray-800">Follow-up History</h2>
              </div>
              <button className="bg-[#fd7e14] text-white text-[11px] font-bold px-3 py-1 rounded-none shadow-sm hover:bg-[#e86f0b] flex items-center gap-1.5">
                <PlusCircle className="w-3.5 h-3.5" /> Add follow-up
              </button>
            </div>
            
            <div className="p-6">
              
              <div className="mb-6 relative">
                <span className="bg-[#17a2b8] text-white text-[10px] font-bold px-2 py-1 rounded-none shadow-sm relative z-10">21 Aug, 2026</span>
                <div className="border border-gray-200 rounded-none p-3 mt-4 ml-2 relative bg-white shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-none bg-[#ffc107] flex items-center justify-center text-white shrink-0 absolute -left-4 shadow-sm border-[3px] border-white">
                      <PhoneCall className="w-3.5 h-3.5" />
                    </div>
                    <div className="ml-5 flex items-center gap-2">
                      <span className="bg-[#ffc107] text-gray-800 text-[11px] font-bold px-2 py-0.5 rounded-none shadow-sm">Call Back</span>
                      <span className="text-[11px] text-gray-400">by school admin</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-gray-400">1 day ago</div>
                </div>
              </div>

              <div className="relative">
                <span className="bg-[#17a2b8] text-white text-[10px] font-bold px-2 py-1 rounded-none shadow-sm relative z-10">21 Aug, 2026</span>
                <div className="border border-gray-200 rounded-none p-3 mt-4 ml-2 relative bg-white shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-none bg-[#28a745] flex items-center justify-center text-white shrink-0 absolute -left-4 shadow-sm border-[3px] border-white">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <div className="ml-5 flex items-center gap-2">
                      <span className="bg-[#28a745] text-white text-[11px] font-bold px-2 py-0.5 rounded-none shadow-sm">Interested</span>
                      <span className="text-[11px] text-gray-400">by school admin</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-gray-400">1 day ago</div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-6">
          
          {/* Additional Data */}
          <div className="bg-white border-t-4 border-t-[#17a2b8] shadow-sm overflow-hidden">
            <div className="p-2 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gray-700" />
              <h2 className="text-[13px] font-bold text-gray-800">Additional Data</h2>
            </div>
            <div className="p-6 text-center text-[12px] text-gray-400">
              No additional data captured.
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button className="w-full bg-[#fd7e14] hover:bg-[#e86f0b] text-white font-bold text-[13px] py-2.5 rounded-none shadow-sm flex justify-center items-center gap-2 transition-colors">
              <Edit3 className="w-4 h-4" /> Edit / Verify Payment
            </button>
            <button className="w-full bg-[#28a745] hover:bg-[#218838] text-white font-bold text-[13px] py-2.5 rounded-none shadow-sm flex justify-center items-center gap-2 transition-colors">
              <PlusCircle className="w-4 h-4" /> Add follow-up
            </button>
            <button 
              onClick={() => navigate('/front-office/admission-enquiries')}
              className="w-full bg-white border border-gray-300 text-gray-700 font-bold text-[13px] py-2.5 rounded-none shadow-sm hover:bg-gray-50 flex justify-center items-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to List
            </button>
          </div>

          {/* Enquiry Stats */}
          <div className="bg-white border-t-4 border-t-gray-400 shadow-sm overflow-hidden">
            <div className="p-2 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
              <Hash className="w-4 h-4 text-gray-700" />
              <h2 className="text-[13px] font-bold text-gray-800">Enquiry Stats</h2>
            </div>
            <div className="p-4">
              <table className="w-full text-left text-[12px]">
                <tbody>
                  <tr>
                    <td className="py-2 text-gray-500">Total Follow-ups</td>
                    <td className="py-2 font-bold text-gray-800 text-right">2</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-500">Days Since Enquiry</td>
                    <td className="py-2 font-bold text-gray-800 text-right">11</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-500">Last Response</td>
                    <td className="py-2 text-right">
                      <span className="bg-[#ffc107] text-gray-800 text-[10px] font-bold px-2 py-0.5 rounded-none shadow-sm">Call Back</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default EnquiryDetails;
