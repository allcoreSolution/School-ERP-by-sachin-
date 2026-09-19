import React, { useState, useEffect } from 'react';
import AccountsTabs from '../../components/accounts/AccountsTabs';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Info, ArrowUpFromLine, Save, X
} from 'lucide-react';
import { financeService } from '../../api/financeService';

const AddNewExpense = () => {
  const navigate = useNavigate();
  const [heads, setHeads] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    expenseHead: '',
    date: new Date().toISOString().split('T')[0],
    amount: '',
    invoiceNumber: '',
    description: ''
  });

  useEffect(() => {
    const fetchHeads = async () => {
      try {
        const res = await financeService.getExpenseHeads();
        setHeads(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHeads();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.expenseHead || !formData.date || !formData.amount) {
      alert("Please fill all required fields");
      return;
    }
    
    try {
      await financeService.createExpense({
        name: formData.name,
        expenseHeadId: formData.expenseHead,
        date: formData.date,
        amount: Number(formData.amount),
        invoiceNumber: formData.invoiceNumber,
        description: formData.description
      });
      alert("Expense recorded successfully!");
      navigate('/accounts/expense');
    } catch (err) {
      alert("Failed to save expense");
    }
  };

  return (
    <div className="p-4 max-w-[1600px] mx-auto bg-gray-50 min-h-screen text-gray-800 pb-20">
      {/* Banner */}
      <div className="bg-[#009b9f] text-white p-2.5 rounded-none text-xs flex items-center gap-2 mb-6 shadow-sm">
        <Info className="w-5 h-5 flex-shrink-0" />
        <p>
          <strong>New: academic-session scoping.</strong> Lists and dashboard numbers (students, exams, assessments, homework, notices...) now show the <em>selected academic session</em> only, so totals may look smaller than before — nothing was deleted. Use the session switcher in the top bar to view another year, the "View all sessions" button on lists to see everything, and note that money totals marked "(All Years)" still include every session.
        </p>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[22px] font-bold text-gray-900">Record New Expense</h1>
        <p className="text-[12px] text-gray-500 mt-1">Log money spent from the school books</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Column - Form */}
        <div className="flex-1">
          <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex items-center gap-2">
              <ArrowUpFromLine className="w-4 h-4 text-[#5b5bcf]" />
              <h2 className="text-[14px] font-bold text-[#5b5bcf]">New Expense Record</h2>
            </div>
            
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Row 1 */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1.5">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Electricity bill" 
                    className="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#5b5bcf] focus:border-[#5b5bcf]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1.5">
                    Expense Head <span className="text-red-500">*</span>
                  </label>
                  <select 
                    value={formData.expenseHead}
                    onChange={(e) => setFormData({...formData, expenseHead: e.target.value})}
                    className="w-full border border-gray-300 rounded-none px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#5b5bcf] focus:border-[#5b5bcf]"
                    required
                  >
                    <option value="">Select Head</option>
                    {heads.map(h => (
                      <option key={h._id} value={h._id}>{h.name}</option>
                    ))}
                  </select>
                </div>

                {/* Row 2 */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1.5">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="date" 
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full border border-gray-300 rounded-none px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#5b5bcf] focus:border-[#5b5bcf]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1.5">
                    Amount <span className="text-red-500">*</span>
                  </label>
                  <div className="flex border border-gray-300 rounded-none overflow-hidden focus-within:ring-1 focus-within:ring-[#5b5bcf] focus-within:border-[#5b5bcf]">
                    <span className="bg-gray-100 text-gray-600 px-3 py-2 border-r border-gray-300 flex items-center text-sm">
                      ₹
                    </span>
                    <input 
                      type="number" 
                      value={formData.amount}
                      onChange={(e) => setFormData({...formData, amount: e.target.value})}
                      placeholder="0.00" 
                      className="w-full px-3 py-2 text-sm focus:outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Row 3 */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1.5">
                    Invoice Number
                  </label>
                  <input 
                    type="text" 
                    value={formData.invoiceNumber}
                    onChange={(e) => setFormData({...formData, invoiceNumber: e.target.value})}
                    className="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#5b5bcf] focus:border-[#5b5bcf]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1.5">
                    Bank Account <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <select className="w-full border border-gray-300 rounded-none px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#5b5bcf] focus:border-[#5b5bcf]">
                    <option value="">-- None (Cash / Other) --</option>
                    <option value="sbi">SBI Primary</option>
                  </select>
                </div>
              </div>

              {/* Row 4 */}
              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1.5">
                  Attachment <span className="text-gray-400 font-normal">(PDF, JPG, PNG)</span>
                </label>
                <div className="flex items-center gap-2">
                  <input 
                    type="file" 
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-1.5 file:px-3
                      file:rounded file:border file:border-gray-300
                      file:text-xs file:font-semibold
                      file:bg-gray-50 file:text-gray-700
                      hover:file:bg-gray-100"
                  />
                </div>
              </div>

              {/* Row 5 */}
              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1.5">
                  Description
                </label>
                <textarea 
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Optional notes for your records"
                  className="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#5b5bcf] focus:border-[#5b5bcf]"
                ></textarea>
              </div>
            </div>

            {/* Form Actions */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
              <button 
                type="button"
                onClick={() => navigate('/accounts/expense')}
                className="px-4 py-2 border border-gray-300 rounded-none text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 rounded-none text-sm font-bold text-white bg-[#5b5bcf] hover:bg-blue-700 transition-colors shadow-sm"
              >
                <Save className="w-4 h-4" /> Record Expense
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Info Card */}
        <div className="w-full lg:w-[350px]">
          <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 flex items-center gap-2">
              <div className="bg-purple-50 p-1.5 rounded-none">
                <Info className="w-4 h-4 text-purple-600" />
              </div>
              <h2 className="text-[14px] font-bold text-gray-800">Recording expense</h2>
            </div>
            <div className="p-4 pt-2 text-[12px] text-gray-600">
              <ul className="space-y-4">
                <li className="flex gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Pick the right <strong>Expense Head</strong> — it drives your reports and ledgers.</span>
                </li>
                <li className="flex gap-2 border-t border-gray-100 pt-4">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Link a <strong>Bank Account</strong> if paid from the bank; leave blank for cash.</span>
                </li>
                <li className="flex gap-2 border-t border-gray-100 pt-4">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Attach the bill or invoice to keep your books <strong>audit-ready</strong>.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
      </div>
      </form>
    </div>
  );
};

export default AddNewExpense;
