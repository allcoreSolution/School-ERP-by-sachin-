import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Info, Settings, Search, Plus, Edit2, Trash2, 
  FileText, Printer, Columns, ChevronDown, List, Grid,
  Percent, HelpCircle, AlertTriangle, Tag
} from 'lucide-react';
import FinanceTabs from '../../components/finance/FinanceTabs';
import { feeCollectionService } from '../../api/feeCollectionService';

const FeesDiscount = () => {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDiscounts();
  }, []);

  const fetchDiscounts = async () => {
    try {
      setLoading(true);
      const res = await feeCollectionService.getDiscounts();
      setDiscounts(res.data || []);
    } catch(err) {
      console.error(err);
      setDiscounts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Delete this discount?")) return;
    try {
      await feeCollectionService.deleteDiscount(id);
      fetchDiscounts();
    } catch(err) {
      console.error(err);
      alert("Error deleting discount.");
    }
  };

  return (
    <div className="p-4 max-w-[1600px] mx-auto bg-gray-50 min-h-screen text-gray-800 pb-20">
      <div className="bg-[#009b9f] text-white p-2.5 rounded-none text-xs flex items-center gap-2 mb-4 shadow-sm">
        <Info className="w-5 h-5 flex-shrink-0" />
        <p>
          <strong>New: academic-session scoping.</strong> Lists and dashboard numbers now show the <em>selected academic session</em> only.
        </p>
      </div>

      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Finance & Fees</h1>
          <p className="text-[11px] text-gray-500">Manage fee types, groups, collection, challans, and reports across the school.</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-none shadow-sm hover:bg-gray-50 transition-colors">
          <Settings className="w-3.5 h-3.5" /> Quick Setup
        </button>
      </div>

      <FinanceTabs />

      <div className="flex justify-end mb-4">
        <Link to="/finance/discount/add" className="flex items-center gap-1.5 bg-[#5b5bcf] hover:bg-blue-700 text-white px-5 py-2 rounded-none text-sm font-semibold transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Add New Discount
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-[17px] font-bold text-[#5b5bcf] flex items-center gap-2">
              <span className="text-xl leading-none font-black">%</span> Fees Discounts
            </h2>
            <div className="flex bg-gray-100 rounded-none p-0.5">
              <button className="p-1.5 bg-white shadow-sm rounded-none text-gray-700"><List className="w-4 h-4" /></button>
              <button className="p-1.5 text-gray-500 hover:text-gray-700"><Grid className="w-4 h-4" /></button>
            </div>
          </div>

          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Show</span>
                <select className="border border-gray-300 rounded-none text-xs px-2 py-1.5 text-gray-700 focus:outline-none focus:border-blue-500">
                  <option>10</option>
                </select>
                <div className="flex bg-white rounded-none border border-gray-300 overflow-hidden ml-2">
                  <button className="px-2.5 py-1.5 text-gray-600 hover:bg-gray-50 border-r border-gray-300 transition-colors" title="Copy"><FileText className="w-4 h-4" /></button>
                  <button className="px-3 py-1.5 text-[11px] font-medium text-gray-600 hover:bg-gray-50 border-r border-gray-300 transition-colors">CSV</button>
                  <button className="px-3 py-1.5 text-[11px] font-medium text-gray-600 hover:bg-gray-50 border-r border-gray-300 transition-colors">Excel</button>
                  <button className="px-3 py-1.5 text-[11px] font-medium text-gray-600 hover:bg-gray-50 border-r border-gray-300 transition-colors">PDF</button>
                  <button className="px-2.5 py-1.5 text-gray-600 hover:bg-gray-50 border-r border-gray-300 transition-colors" title="Print"><Printer className="w-4 h-4" /></button>
                  <button className="flex items-center gap-1 px-3 py-1.5 text-[11px] font-medium text-gray-600 hover:bg-gray-50 transition-colors"><Columns className="w-3.5 h-3.5" /> Columns</button>
                </div>
              </div>
              <div className="relative">
                <input type="text" placeholder="Search discounts..." className="border border-gray-300 rounded-none pl-3 pr-8 py-1.5 text-sm w-64 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8f9fc] text-[10px] font-bold text-[#5b5bcf] uppercase tracking-wider border-b border-gray-200">
                  <th className="p-4 border-r border-gray-100 w-16 text-center">#</th>
                  <th className="p-4 border-r border-gray-100">NAME</th>
                  <th className="p-4 border-r border-gray-100">CODE</th>
                  <th className="p-4 border-r border-gray-100">TYPE</th>
                  <th className="p-4 border-r border-gray-100">AMOUNT / PERCENTAGE</th>
                  <th className="p-4 text-center w-32">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {loading ? (
                  <tr><td colSpan="6" className="p-4 text-center text-gray-500 font-semibold">Loading discounts...</td></tr>
                ) : discounts.length === 0 ? (
                  <tr><td colSpan="6" className="p-4 text-center text-gray-400">No discounts available.</td></tr>
                ) : discounts.map((d, i) => (
                  <tr key={d._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="p-4 border-r border-gray-100 text-center text-gray-500">{i+1}</td>
                    <td className="p-4 border-r border-gray-100 font-medium text-gray-700">{d.name}</td>
                    <td className="p-4 border-r border-gray-100"><span className="bg-gray-100 text-gray-600 border border-gray-200 px-2 py-1 rounded-none text-xs font-semibold uppercase">{d.discountCode}</span></td>
                    <td className="p-4 border-r border-gray-100"><span className="bg-blue-50 text-blue-600 border border-blue-100 px-2.5 py-0.5 rounded-none text-[11px] font-semibold">{d.type}</span></td>
                    <td className="p-4 border-r border-gray-100 font-bold text-gray-800">{d.type === 'Percentage' ? `${d.amount}%` : `₹${d.amount}`}</td>
                    <td className="p-4 text-center align-middle">
                      <div className="flex justify-center items-center gap-3 text-gray-400">
                        <button className="hover:text-blue-600 transition-colors"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(d._id)} className="hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 flex justify-between items-center text-sm text-gray-500">
            <div>Showing {discounts.length} entries</div>
          </div>
        </div>

        <div className="w-full lg:w-[35%]">
          <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-purple-100 text-purple-600 p-1 rounded-none"><HelpCircle className="w-4 h-4" /></div>
                <h3 className="font-bold text-gray-800 text-[15px]">How Fee Discounts work</h3>
              </div>
              <ul className="space-y-5 mb-6">
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-none mt-2 flex-shrink-0"></div>
                  <p className="text-[13px] text-gray-600 leading-relaxed"><strong>Create the rule</strong> — define the discount here, e.g. a "Sibling Discount" of 10%.</p>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-none mt-2 flex-shrink-0"></div>
                  <p className="text-[13px] text-gray-600 leading-relaxed"><strong>Assign it</strong> — go to Assign Fees and link this discount code to specific students.</p>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-none mt-2 flex-shrink-0"></div>
                  <p className="text-[13px] text-gray-600 leading-relaxed"><strong>Auto calculation</strong> — when you collect fees, the system deducts it from the total bill automatically.</p>
                </li>
              </ul>
              <div className="bg-[#fff9e6] border border-[#f0e3ad] p-4 rounded-none flex gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <p className="text-[12px] text-yellow-800 leading-relaxed"><strong>Percentage (%)</strong> discounts scale with the total fee, while <strong>Fixed</strong> discounts deduct an exact flat amount.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeesDiscount;
