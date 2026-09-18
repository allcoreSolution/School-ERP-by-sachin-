import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Info, FileText, Printer, ArrowLeft, CheckCircle, Receipt
} from 'lucide-react';

const ChallanDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // In a real app, you would fetch details based on `id`
  // Mock data matching the screenshot
  const challan = {
    status: 'Paid',
    challanNo: 'VCH/YIS/2026/00001',
    type: 'Fee Payment',
    student: 'Krish Yadav',
    admissionNo: 'YISADM-012',
    class: 'Nursery (A)',
    guardian: 'Mukesh Yadav',
    created: '05 Aug 2026, 03:51 PM',
    createdBy: 'school admin',
    dueDate: '20 Aug, 2026',
    items: [
      { desc: '2nd Installment Fees (Apr 2026)', amount: 5000 },
      { desc: '3rd Installment Fees (Aug 2026)', amount: 5000 },
      { desc: '4th Installment Fees (Dec 2026)', amount: 5000 }
    ],
    totalAmount: 15000,
    payment: {
      amountPaid: 10000,
      date: '06 Aug, 2026',
      mode: 'Cash',
      recordedBy: 'school admin'
    }
  };

  const handlePrint = () => {
    navigate(`/finance/print-challan/${id}`);
  };

  return (
    <div className="p-4 max-w-[1600px] mx-auto bg-gray-50 min-h-screen text-gray-800 pb-20">
      
      {/* Banner */}
      <div className="bg-[#009b9f] text-white p-2.5 rounded-none text-xs flex items-center gap-2 mb-4 shadow-sm print:hidden">
        <Info className="w-4 h-4 flex-shrink-0" />
        <p>
          <strong>New: academic-session scoping.</strong> Lists and dashboard numbers (students, exams, assessments, homework, notices...) now show the <em>selected academic session</em> only, so totals may look smaller than before — nothing was deleted. Use the session switcher in the top bar to view another year, the "View all sessions" button on lists to see everything, and note that money totals marked "(All Years)" still include every session.
        </p>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6 print:hidden">
        <div className="flex items-center gap-2">
          <div className="bg-gray-800 text-white p-1 rounded">
            <FileText className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Challan Details</h1>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-gray-500 rounded-none shadow-sm hover:bg-gray-600 transition-colors"
          >
            <Printer className="w-4 h-4" /> Print Challan
          </button>
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-none shadow-sm hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white border border-gray-200 rounded-none shadow-sm mb-4 print:border-none print:shadow-none">
        
        {/* Card Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 text-xs font-bold text-white rounded-none shadow-sm ${challan.status === 'Paid' ? 'bg-[#48bb78]' : 'bg-[#ecc94b]'}`}>
              {challan.status}
            </span>
            <span className="text-gray-800 font-bold">{challan.challanNo}</span>
          </div>
          <span className="px-2.5 py-0.5 text-xs font-bold text-white bg-teal-500 rounded-none shadow-sm">
            {challan.type}
          </span>
        </div>

        {/* Info Grid */}
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 border-b border-gray-100 text-sm">
          <div className="grid grid-cols-3 gap-2">
            <span className="text-gray-500">Student:</span>
            <span className="col-span-2 font-bold text-gray-900">{challan.student}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-gray-500">Created:</span>
            <span className="col-span-2 text-gray-800">{challan.created}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-gray-500">Admission No:</span>
            <span className="col-span-2 text-gray-800">{challan.admissionNo}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-gray-500">Created By:</span>
            <span className="col-span-2 text-gray-800">{challan.createdBy}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-gray-500">Class:</span>
            <span className="col-span-2 text-gray-800">{challan.class}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-gray-500">Due Date:</span>
            <span className="col-span-2 text-gray-800">{challan.dueDate}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-gray-500">Father/Guardian:</span>
            <span className="col-span-2 text-gray-800">{challan.guardian}</span>
          </div>
        </div>

        {/* Table */}
        <div className="p-4">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-2 font-bold text-gray-800 w-3/4">Description</th>
                <th className="py-2 font-bold text-gray-800 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {challan.items.map((item, index) => (
                <tr key={index} className="border-b border-gray-100 last:border-b-0">
                  <td className="py-2 text-gray-600">{item.desc}</td>
                  <td className="py-2 text-right text-gray-800">₹{item.amount.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
                </tr>
              ))}
              <tr className="bg-blue-50/30">
                <td className="py-3 text-right font-bold text-gray-800">Total Amount:</td>
                <td className="py-3 text-right font-bold text-blue-600 text-base">
                  ₹{challan.totalAmount.toLocaleString('en-IN', {minimumFractionDigits: 2})}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Payment Recorded Section */}
        {challan.payment && (
          <div className="m-4 mt-0 border border-green-200 rounded-none overflow-hidden">
            <div className="bg-[#38a169] text-white px-3 py-2 flex items-center gap-1.5 text-sm font-bold">
              <CheckCircle className="w-4 h-4" /> Payment Recorded
            </div>
            <div className="p-4 bg-white grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Amount Paid</p>
                <p className="font-bold text-[#38a169]">₹{challan.payment.amountPaid.toLocaleString('en-IN', {minimumFractionDigits: 2})}</p>
                <button 
                  onClick={() => navigate(`/finance/receipt/${id}`)}
                  className="mt-3 flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-green-700 bg-white border border-green-400 rounded-none hover:bg-green-50 transition-colors"
                >
                  <Receipt className="w-3.5 h-3.5" /> View Fee Receipt
                </button>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Date</p>
                <p className="font-bold text-gray-900">{challan.payment.date}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Mode</p>
                <p className="font-bold text-gray-900">{challan.payment.mode}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Recorded By</p>
                <p className="font-bold text-gray-900">{challan.payment.recordedBy}</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ChallanDetails;
