import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Printer, ArrowLeft, Info } from 'lucide-react';

const PrintChallan = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data matching the screenshot
  const challan = {
    status: 'Paid',
    challanNo: 'VCH/YIS/2026/00001',
    student: 'Krish Yadav',
    admissionNo: 'YISADM-012',
    class: 'Nursery (A)',
    guardian: 'Mukesh Yadav',
    issueDate: '05 Aug, 2026',
    payBefore: '20 Aug, 2026',
    items: [
      { desc: '2nd Installment Fees (Apr 2026)', amount: 5000 },
      { desc: '3rd Installment Fees (Aug 2026)', amount: 5000 },
      { desc: '4th Installment Fees (Dec 2026)', amount: 5000 }
    ],
    totalAmount: 15000,
    amountInWords: 'Fifteen Thousand Only'
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans pb-10">
      {/* Top Action Bar (Hidden on print) */}
      <div className="bg-white border-b border-gray-200 py-4 px-6 flex justify-center gap-6 items-center print:hidden shadow-sm">
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 bg-[#1a237e] text-white px-6 py-2.5 rounded-none shadow-sm hover:bg-[#121858] font-bold transition-colors"
        >
          <Printer className="w-5 h-5" /> Print Fee Challan
        </button>
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Details
        </button>
      </div>

      {/* Printable Document Container */}
      <div className="max-w-[800px] mx-auto mt-8 bg-white border border-gray-300 shadow-md relative overflow-hidden print:shadow-none print:border-none print:mt-0">
        
        {/* Paid Watermark (if status is Paid) */}
        {challan.status === 'Paid' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-10">
            <span className="text-[120px] font-bold text-green-500 tracking-widest transform -rotate-45">PAID</span>
          </div>
        )}

        <div className="relative z-10">
          {/* Header */}
          <div className="bg-[#1a237e] text-center text-white py-6 px-4">
            <h1 className="text-2xl font-bold tracking-wider mb-1">YUG-SCHOOL</h1>
            <p className="text-sm opacity-90 mb-0.5">Marine Drive Road, Raipur (Chhattisgarh)</p>
            <p className="text-[11px] opacity-80">Ph: +916263056779 | Email: contact@projectworlds.com</p>
          </div>

          {/* Subheader */}
          <div className="bg-[#e8ebf5] text-center py-3 border-y border-gray-300">
            <h2 className="text-[15px] font-bold text-[#1a237e] tracking-[0.2em] mb-1">—— FEE CHALLAN ——</h2>
            <p className="text-[11px] text-gray-600 italic">Please deposit the following amount</p>
          </div>

          {/* Meta Data */}
          <div className="flex justify-between px-6 py-4 border-b border-gray-300 text-sm text-gray-800">
            <div>
              <span className="text-gray-500">Challan No:</span> <span className="font-bold">{challan.challanNo}</span>
            </div>
            <div className="text-right">
              <div className="mb-1">
                <span className="text-gray-500">Issue Date:</span> <span className="font-bold">{challan.issueDate}</span>
              </div>
              <div className="text-red-600">
                <span className="opacity-80">Pay Before:</span> <span className="font-bold text-red-600">{challan.payBefore}</span>
              </div>
            </div>
          </div>

          {/* Student Details */}
          <div className="grid grid-cols-2 gap-y-2 px-6 py-4 border-b border-gray-300 text-[13px] text-gray-800 bg-gray-50/50">
            <div>
              <span className="text-gray-500 w-16 inline-block">Student:</span> <span className="font-bold">{challan.student}</span>
            </div>
            <div>
              <span className="text-gray-500 w-24 inline-block">Admission No:</span> <span className="font-bold">{challan.admissionNo}</span>
            </div>
            <div>
              <span className="text-gray-500 w-16 inline-block">Class:</span> <span>{challan.class}</span>
            </div>
            <div>
              <span className="text-gray-500 w-24 inline-block">Father/Guardian:</span> <span className="font-bold">{challan.guardian}</span>
            </div>
          </div>

          {/* Fees Table */}
          <div className="px-6 py-4 border-b border-gray-300">
            <h3 className="text-xs font-bold text-[#1a237e] uppercase mb-2">Fees Due</h3>
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-[10px] font-bold tracking-wider">
                  <th className="py-2.5 px-3 text-left">Particulars</th>
                  <th className="py-2.5 px-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {challan.items.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 px-3 text-gray-800">{item.desc}</td>
                    <td className="py-3 px-3 text-right font-medium">₹{item.amount.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-[#1a237e] text-white">
                  <td className="py-3 px-3 font-bold text-center">★ TOTAL AMOUNT TO PAY</td>
                  <td className="py-3 px-3 text-right font-bold text-base">₹{challan.totalAmount.toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Amount In Words */}
          <div className="px-6 py-3 border-b border-gray-300 text-[12px]">
            <span className="text-gray-400 uppercase tracking-wide text-[10px] mr-2">In Words:</span>
            <span className="font-bold italic text-gray-800">{challan.amountInWords}</span>
          </div>

          {/* How To Pay */}
          <div className="px-6 py-4">
            <h3 className="text-xs font-bold text-[#1a237e] uppercase mb-2">How To Pay</h3>
            <ul className="list-disc pl-5 text-[12px] text-gray-700 space-y-1 mb-4">
              <li>School Fee Counter (Cash / Card / UPI)</li>
              <li>Bank Deposit: SBI Bank Account — A/C: 23111313131, STATE BANK OF INDIA</li>
            </ul>

            {/* Warning Alert */}
            <div className="bg-[#fff3cd] border border-[#ffeeba] text-[#856404] px-4 py-2.5 flex items-center justify-center gap-2 text-xs font-semibold rounded-none mb-16">
              <Info className="w-4 h-4 text-orange-500" /> This is a demand slip, NOT a payment receipt. A receipt will be issued upon payment.
            </div>

            {/* Signatures */}
            <div className="flex justify-between items-end mt-12 mb-4 px-4 text-gray-500 text-[10px] uppercase font-semibold">
              <div className="w-40 text-center border-t border-gray-400 pt-2">Issued By</div>
              <div className="w-40 text-center border-t border-gray-400 pt-2">School Stamp</div>
              <div className="w-48 text-center border-t border-gray-400 pt-2">Parent/Guardian Signature</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintChallan;
