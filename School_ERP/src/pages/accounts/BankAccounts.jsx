import React, { useState } from 'react';
import AccountsTabs from '../../components/accounts/AccountsTabs';
import { Link } from 'react-router-dom';
import { 
  Info, LayoutDashboard, Book, ArrowDownToLine, ArrowUpFromLine, 
  Calendar, FileText, Tags, Wallet, Plus, Edit, Trash2, Building2, Banknote, BookOpen, X, Save
} from 'lucide-react';

const BankAccounts = () => {
  const [editingRecord, setEditingRecord] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newAccountData, setNewAccountData] = useState({
    accountName: '',
    type: 'Bank Account',
    bankName: '',
    accountNo: '',
    branchIfsc: '',
    openingBalance: '0.00'
  });

  const initialData = [
    { 
      id: 1, 
      accountName: 'Cash Account', 
      type: 'Cash', 
      bankBranch: '—', 
      accountNo: '—', 
      currentBalance: '₹ 1,926,231.08' 
    },
    { 
      id: 2, 
      accountName: 'SBI Bank Account', 
      type: 'Bank', 
      bankBranch: 'STATE BANK OF INDIA\nMain Branch', 
      accountNo: '23111313131', 
      currentBalance: '₹ 223,639.75' 
    }
  ];

  const [accountsData, setAccountsData] = useState(initialData);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this account?")) {
      setAccountsData(prev => prev.filter(item => item.id !== id));
      alert("Account deleted successfully!");
    }
  };

  const handleEdit = (record) => {
    setEditingRecord({ ...record });
  };

  const saveEdit = (e) => {
    e.preventDefault();
    setAccountsData(prev => prev.map(item => item.id === editingRecord.id ? editingRecord : item));
    setEditingRecord(null);
    alert("Account updated successfully!");
  };

  const handleAddAccount = (e) => {
    e.preventDefault();
    const newId = accountsData.length > 0 ? Math.max(...accountsData.map(a => a.id)) + 1 : 1;
    
    const typeText = newAccountData.type === 'Bank Account' ? 'Bank' : 'Cash';
    const bankBranchText = typeText === 'Bank' ? `${newAccountData.bankName}\n${newAccountData.branchIfsc}` : '—';
    
    const newAccount = {
      id: newId,
      accountName: newAccountData.accountName,
      type: typeText,
      bankBranch: bankBranchText,
      accountNo: typeText === 'Bank' ? newAccountData.accountNo : '—',
      currentBalance: `₹ ${Number(newAccountData.openingBalance || 0).toLocaleString('en-IN', {minimumFractionDigits: 2})}`
    };
    
    setAccountsData([...accountsData, newAccount]);
    setIsAddModalOpen(false);
    setNewAccountData({
      accountName: '',
      type: 'Bank Account',
      bankName: '',
      accountNo: '',
      branchIfsc: '',
      openingBalance: '0.00'
    });
    alert("New account added successfully!");
  };

  return (
    <div className="p-4 max-w-[1600px] mx-auto bg-gray-50 min-h-screen text-gray-800 pb-20 print:bg-white print:p-0">
      {/* Banner */}
      <div className="bg-[#009b9f] text-white p-2.5 rounded-none text-xs flex items-center gap-2 mb-4 shadow-sm print:hidden">
        <Info className="w-5 h-5 flex-shrink-0" />
        <p>
          <strong>New: academic-session scoping.</strong> Lists and dashboard numbers (students, exams, assessments, homework, notices...) now show the <em>selected academic session</em> only, so totals may look smaller than before — nothing was deleted. Use the session switcher in the top bar to view another year, the "View all sessions" button on lists to see everything, and note that money totals marked "(All Years)" still include every session.
        </p>
      </div>

      {/* Header */}
      <div className="mb-2 flex justify-between items-center print:hidden">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Accounts & Bookkeeping</h1>
          <p className="text-[11px] text-gray-500">Track income, expenses, ledgers and hand audit-ready books to your accountant.</p>
        </div>
      </div>

      {/* Tabs */}
      <AccountsTabs />

      <div className="flex justify-end mb-4 print:hidden">
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-1.5 bg-[#5b5bcf] hover:bg-blue-700 text-white px-5 py-2 rounded-none text-[13px] font-semibold transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add New Account
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden print:border-none print:shadow-none">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center print:hidden">
          <h2 className="text-[15px] font-bold text-[#5b5bcf] flex items-center gap-2">
            <Building2 className="w-4 h-4" /> Bank & Cash Accounts
          </h2>
        </div>

        {/* Print Only Header */}
        <div className="hidden print:block p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-center">Bank & Cash Accounts Report</h2>
          <p className="text-sm text-center text-gray-500">Generated on {new Date().toLocaleDateString()}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f8f9fc] text-[10px] font-bold text-[#5b5bcf] uppercase tracking-wider border-b border-gray-200 print:bg-gray-100">
                <th className="p-4 border-r border-gray-100 print:border-gray-300">ACCOUNT NAME</th>
                <th className="p-4 border-r border-gray-100 print:border-gray-300 w-32">TYPE</th>
                <th className="p-4 border-r border-gray-100 print:border-gray-300">BANK / BRANCH</th>
                <th className="p-4 border-r border-gray-100 print:border-gray-300">ACCOUNT NO</th>
                <th className="p-4 border-r border-gray-100 text-right print:border-gray-300">CURRENT BALANCE</th>
                <th className="p-4 text-center w-36 print:hidden">ACTION</th>
              </tr>
            </thead>
            <tbody className="text-[13px]">
              {accountsData.length > 0 ? (
                accountsData.map((row) => (
                  <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors print:border-gray-300">
                    <td className="p-4 border-r border-gray-100 font-medium text-gray-800 print:border-gray-300">{row.accountName}</td>
                    <td className="p-4 border-r border-gray-100 print:border-gray-300">
                      {row.type === 'Cash' ? (
                        <span className="inline-flex items-center gap-1 text-[10px] bg-blue-50 text-blue-600 px-2.5 py-1 rounded-none font-bold print:bg-transparent print:p-0 print:text-gray-800">
                          <Banknote className="w-3 h-3" /> {row.type}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] bg-green-50 text-green-600 px-2.5 py-1 rounded-none font-bold print:bg-transparent print:p-0 print:text-gray-800">
                          <Building2 className="w-3 h-3" /> {row.type}
                        </span>
                      )}
                    </td>
                    <td className="p-4 border-r border-gray-100 text-gray-600 print:border-gray-300 whitespace-pre-line text-[12px]">{row.bankBranch}</td>
                    <td className="p-4 border-r border-gray-100 text-gray-600 print:border-gray-300 text-[12px]">{row.accountNo}</td>
                    <td className="p-4 border-r border-gray-100 text-right font-medium text-gray-800 print:border-gray-300">{row.currentBalance}</td>
                    <td className="p-4 text-center print:hidden">
                      <div className="flex items-center justify-center gap-3">
                        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-none text-[11px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                          <BookOpen className="w-3.5 h-3.5" /> Ledger
                        </button>
                        <button onClick={() => handleEdit(row)} className="text-gray-400 hover:text-blue-600 transition-colors"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(row.id)} className="text-gray-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-6 text-center text-gray-500">No bank accounts found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Account Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-none shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-[16px] font-bold text-gray-800">Add New Account</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-y-auto flex-1 p-5">
              <form id="add-account-form" onSubmit={handleAddAccount} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    Account Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. SBI Main, Petty Cash"
                    value={newAccountData.accountName}
                    onChange={(e) => setNewAccountData({...newAccountData, accountName: e.target.value})}
                    className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5b5bcf] focus:ring-1 focus:ring-[#5b5bcf]"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    Type <span className="text-red-500">*</span>
                  </label>
                  <select 
                    value={newAccountData.type}
                    onChange={(e) => setNewAccountData({...newAccountData, type: e.target.value})}
                    className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5b5bcf] focus:ring-1 focus:ring-[#5b5bcf]"
                    required
                  >
                    <option value="Bank Account">Bank Account</option>
                    <option value="Cash Account">Cash Account</option>
                  </select>
                </div>

                {newAccountData.type === 'Bank Account' && (
                  <>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">
                        Bank Name <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        placeholder="e.g. State Bank of India"
                        value={newAccountData.bankName}
                        onChange={(e) => setNewAccountData({...newAccountData, bankName: e.target.value})}
                        className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5b5bcf] focus:ring-1 focus:ring-[#5b5bcf]"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">
                        Account Number <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        placeholder="xxxxxxxxxxxx"
                        value={newAccountData.accountNo}
                        onChange={(e) => setNewAccountData({...newAccountData, accountNo: e.target.value})}
                        className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5b5bcf] focus:ring-1 focus:ring-[#5b5bcf]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">
                        Branch / IFSC
                      </label>
                      <input 
                        type="text" 
                        placeholder="Main Branch / SBIN000xxxx"
                        value={newAccountData.branchIfsc}
                        onChange={(e) => setNewAccountData({...newAccountData, branchIfsc: e.target.value})}
                        className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5b5bcf] focus:ring-1 focus:ring-[#5b5bcf]"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">
                    Opening Balance
                  </label>
                  <input 
                    type="number" 
                    placeholder="0.00"
                    step="0.01"
                    value={newAccountData.openingBalance}
                    onChange={(e) => setNewAccountData({...newAccountData, openingBalance: e.target.value})}
                    className="w-full border border-gray-300 rounded-none px-3 py-2 text-[13px] focus:outline-none focus:border-[#5b5bcf] focus:ring-1 focus:ring-[#5b5bcf]"
                  />
                </div>
              </form>
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 shrink-0">
              <button 
                type="button" 
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-none text-[13px] font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button 
                type="submit"
                form="add-account-form"
                className="flex items-center gap-1.5 px-4 py-2 bg-[#5b5bcf] rounded-none text-[13px] font-bold text-white hover:bg-blue-700 transition-colors shadow-sm"
              >
                <Save className="w-4 h-4" /> Save Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingRecord && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-none shadow-xl max-w-md w-full overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="font-bold text-gray-800">Edit Bank Account</h2>
              <button onClick={() => setEditingRecord(null)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={saveEdit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Account Name</label>
                <input 
                  type="text" 
                  value={editingRecord.accountName}
                  onChange={(e) => setEditingRecord({...editingRecord, accountName: e.target.value})}
                  className="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Type</label>
                  <select 
                    value={editingRecord.type}
                    onChange={(e) => setEditingRecord({...editingRecord, type: e.target.value})}
                    className="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="Bank">Bank</option>
                    <option value="Cash">Cash</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Account No</label>
                  <input 
                    type="text" 
                    value={editingRecord.accountNo}
                    onChange={(e) => setEditingRecord({...editingRecord, accountNo: e.target.value})}
                    className="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Bank / Branch</label>
                <textarea 
                  value={editingRecord.bankBranch}
                  onChange={(e) => setEditingRecord({...editingRecord, bankBranch: e.target.value})}
                  className="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  rows="2"
                ></textarea>
              </div>
              <div className="pt-4 flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setEditingRecord(null)}
                  className="px-4 py-2 border border-gray-300 rounded-none text-sm font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-600 rounded-none text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default BankAccounts;
