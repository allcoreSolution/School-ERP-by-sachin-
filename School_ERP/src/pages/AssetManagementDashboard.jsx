import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Plus, Box, IndianRupee, TrendingDown, Wrench, ChevronRight,
  AlertCircle, Activity, BookOpen, List, Filter, Printer, Eye, Edit, Trash2,
  HelpCircle, Shield, Users, ArrowLeftRight, RotateCcw, Download, ArrowDownToLine, CheckCircle, Tag, FileText
} from 'lucide-react';

// --- DUMMY DATA ---
const ASSETS = [];
const CATEGORIES = [];
const ALLOCATIONS = [];
const DEPRECIATION_RECORDS = [];
const MAINTENANCES = [];
const DISPOSALS = [];
const AUDITS = [];

export default function AssetManagementDashboard() {
  const { tab } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isAllocating, setIsAllocating] = useState(false);

  const TAB_URL_MAP = {
    'dashboard': 'Dashboard',
    'guide': 'Guide',
    'register': 'Asset Register',
    'categories': 'Categories',
    'allocations': 'Allocations',
    'assignments': 'Allocations',
    'depreciation': 'Depreciation',
    'maintenance': 'Maintenance',
    'disposals': 'Disposals',
    'audits': 'Audits',
    'reports': 'Reports'
  };

  const URL_TAB_MAP = Object.entries(TAB_URL_MAP).reduce((acc, [key, val]) => {
    acc[val] = key;
    return acc;
  }, {});

  useEffect(() => {
    if (tab && TAB_URL_MAP[tab]) {
      setActiveTab(TAB_URL_MAP[tab]);
      if (tab === 'register' && !isRegistering) {
        // Only set registering to true if they specifically want the register form,
        // but 'register' tab maps to Asset Register list. Let's keep it as the list,
        // the user has to click + Register Asset to open the form, unless instructed otherwise.
        setIsRegistering(false);
      }
    } else if (!tab) {
      navigate('/asset-management/dashboard', { replace: true });
    }
  }, [tab, navigate]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setIsRegistering(false);
    navigate(`/asset-management/${URL_TAB_MAP[tabName] || 'dashboard'}`);
  };

  const TABS = [
    { name: 'Dashboard' },
    { name: 'Guide' },
    { name: 'Asset Register' },
    { name: 'Categories' },
    { name: 'Allocations' },
    { name: 'Depreciation' },
    { name: 'Maintenance' },
    { name: 'Disposals' },
    { name: 'Audits' },
    { name: 'Reports' },
  ];

  const handleRegisterClick = () => {
    navigate('/asset-management/register');
    setActiveTab('Asset Register');
    setIsRegistering(true);
  };

  const handleCancelRegister = () => {
    setIsRegistering(false);
  };

  return (
    <div className="bg-[#f4f7fc] min-h-[calc(100vh-64px)] font-sans p-6 pb-20 relative">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-[22px] font-semibold text-gray-800 leading-tight">Asset Management</h1>
          <p className="text-gray-500 text-[13px] mt-0.5">Register, tag, allocate, depreciate and maintain every fixed asset across the school.</p>
        </div>

        {!isRegistering && (
          <button
            onClick={handleRegisterClick}
            className="flex items-center px-4 py-2 bg-[#5542f6] text-white rounded-none text-sm font-bold hover:bg-[#4a3ae0] transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Register Asset
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex space-x-6 border-b border-gray-200 mb-6 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {TABS.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => handleTabClick(tab.name)}
            className={`pb-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center ${activeTab === tab.name && !isRegistering
              ? 'border-[#5542f6] text-[#5542f6]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
          >
            {tab.name === 'Dashboard' && <Activity className="w-4 h-4 mr-1.5" />}
            {tab.name === 'Guide' && <BookOpen className="w-4 h-4 mr-1.5" />}
            {tab.name === 'Asset Register' && <List className="w-4 h-4 mr-1.5" />}
            {tab.name === 'Categories' && <Tag className="w-4 h-4 mr-1.5" />}
            {tab.name === 'Allocations' && <Users className="w-4 h-4 mr-1.5" />}
            {tab.name === 'Depreciation' && <TrendingDown className="w-4 h-4 mr-1.5" />}
            {tab.name === 'Maintenance' && <Wrench className="w-4 h-4 mr-1.5" />}
            {tab.name === 'Disposals' && <Trash2 className="w-4 h-4 mr-1.5" />}
            {tab.name === 'Audits' && <CheckCircle className="w-4 h-4 mr-1.5" />}
            {tab.name === 'Reports' && <Activity className="w-4 h-4 mr-1.5" />}
            {tab.name}
          </button>
        ))}
      </div>

      {isRegistering ? (
        /* --- Register Asset Form --- */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="bg-white rounded-none border border-gray-200 shadow-sm flex flex-col">
              <div className="p-3 border-b border-gray-100 flex items-center bg-gray-50/50">
                <Box className="w-4 h-4 text-gray-800 mr-2" />
                <h2 className="text-sm font-bold text-gray-800">Identity</h2>
              </div>
              <div className="p-5">
                <div className="mb-4">
                  <label className="block text-[12px] font-bold text-gray-700 mb-1">Asset Name <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none focus:border-[#5542f6]" />
                </div>
                {/* ... other identity fields ... */}
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="bg-white rounded-none border border-gray-200 shadow-sm flex flex-col">
              {/* Status & Location ... */}
              <div className="flex justify-end space-x-3 p-5">
                <button onClick={handleCancelRegister} className="px-6 py-2 bg-gray-500 text-white rounded-none text-sm font-bold hover:bg-gray-600 shadow-sm">Cancel</button>
                <button className="px-6 py-2 bg-[#5542f6] text-white rounded-none text-sm font-bold hover:bg-[#4a3ae0] shadow-sm">Register Asset</button>
              </div>
            </div>
          </div>
        </div>
      ) : activeTab === 'Dashboard' ? (
        /* --- Dashboard View --- */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Assets */}
            <div className="bg-[#6610f2] rounded-none shadow-sm overflow-hidden flex flex-col text-white">
              <div className="p-4 flex justify-between items-start flex-grow">
                <div>
                  <h3 className="text-3xl font-bold">0</h3>
                  <p className="text-sm font-medium mt-1">Total Assets</p>
                </div>
                <Box className="w-12 h-12 opacity-30" />
              </div>
              <div onClick={() => handleTabClick('Asset Register')} className="bg-black/10 py-2 px-4 text-center text-[12px] font-medium cursor-pointer hover:bg-black/20 flex items-center justify-center">
                View register <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>

            {/* Acquisition Value */}
            <div className="bg-[#28a745] rounded-none shadow-sm overflow-hidden flex flex-col text-white">
              <div className="p-4 flex justify-between items-start flex-grow">
                <div>
                  <h3 className="text-3xl font-bold">₹0</h3>
                  <p className="text-sm font-medium mt-1">Acquisition Value</p>
                </div>
                <IndianRupee className="w-12 h-12 opacity-30" />
              </div>
            </div>

            {/* Current Book Value */}
            <div className="bg-[#20c997] rounded-none shadow-sm overflow-hidden flex flex-col text-white">
              <div className="p-4 flex justify-between items-start flex-grow">
                <div>
                  <h3 className="text-3xl font-bold">₹0</h3>
                  <p className="text-sm font-medium mt-1">Current Book Value</p>
                </div>
                <TrendingDown className="w-12 h-12 opacity-30" />
              </div>
              <div className="bg-black/10 py-2 px-4 text-center text-[12px] font-medium">
                After depreciation
              </div>
            </div>

            {/* Under Maintenance */}
            <div className="bg-[#ffc107] rounded-none shadow-sm overflow-hidden flex flex-col text-gray-900">
              <div className="p-4 flex justify-between items-start flex-grow">
                <div>
                  <h3 className="text-3xl font-bold">0</h3>
                  <p className="text-sm font-medium mt-1">Under Maintenance</p>
                </div>
                <Wrench className="w-12 h-12 opacity-30" />
              </div>
              <div onClick={() => handleTabClick('Maintenance')} className="bg-black/10 py-2 px-4 text-center text-[12px] font-medium cursor-pointer hover:bg-black/20 flex items-center justify-center">
                0 open · 0 overdue <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>
          </div>

          {/* Maintenance Due & Overdue */}
          <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-3 border-b border-gray-100 flex items-center justify-between bg-white">
              <div className="flex items-center text-[#ffc107]">
                <Wrench className="w-4 h-4 mr-2" />
                <h2 className="text-sm font-bold text-gray-800">Maintenance Due & Overdue</h2>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 cursor-pointer" onClick={() => handleTabClick('Maintenance')} />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-200">
                    <th className="p-3 text-[12px] font-bold text-gray-800">Asset</th>
                    <th className="p-3 text-[12px] font-bold text-gray-800">Task</th>
                    <th className="p-3 text-[12px] font-bold text-gray-800">Type</th>
                    <th className="p-3 text-[12px] font-bold text-gray-800 text-right">Due</th>
                  </tr>
                </thead>
                <tbody className="text-[13px] text-gray-700">
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-gray-400">No overdue maintenance tasks.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column (Assets by Category & Recently Registered) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Assets by Category */}
              <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-3 border-b border-gray-100 flex items-center bg-white">
                  <Box className="w-4 h-4 text-gray-600 mr-2" />
                  <h2 className="text-sm font-bold text-gray-800">Assets by Category</h2>
                </div>
                <div className="p-0">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="p-3 text-[12px] font-bold text-gray-800">Category</th>
                        <th className="p-3 text-[12px] font-bold text-gray-800 text-right">Assets</th>
                      </tr>
                    </thead>
                    <tbody className="text-[13px] text-gray-600">
                      <tr>
                        <td colSpan="2" className="p-4 text-center text-gray-400 border-b border-gray-100">No categories found.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recently Registered */}
              <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-3 border-b border-gray-100 flex items-center bg-white">
                  <Plus className="w-4 h-4 text-gray-800 mr-2" />
                  <h2 className="text-sm font-bold text-gray-800">Recently Registered</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="p-3 text-[12px] font-bold text-gray-800">Tag</th>
                        <th className="p-3 text-[12px] font-bold text-gray-800">Asset</th>
                        <th className="p-3 text-[12px] font-bold text-gray-800">Category</th>
                        <th className="p-3 text-[12px] font-bold text-gray-800 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-[13px] text-gray-600">
                      <tr>
                        <td colSpan="4" className="p-4 text-center text-gray-400 border-b border-gray-100">No recently registered assets.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Column (Warranty & Recent Activity) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Warranty Expiring */}
              <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-3 border-b border-gray-100 flex items-center bg-white text-[#ffc107]">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  <h2 className="text-sm font-bold text-gray-800">Warranty Expiring (next 30 days)</h2>
                </div>
                <div>
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="p-3 text-[12px] font-bold text-gray-800">Asset</th>
                        <th className="p-3 text-[12px] font-bold text-gray-800">Tag</th>
                        <th className="p-3 text-[12px] font-bold text-gray-800 text-right">Expires</th>
                      </tr>
                    </thead>
                    <tbody className="text-[13px] text-gray-600">
                      <tr>
                        <td colSpan="3" className="p-4 text-center text-gray-400 border-b border-gray-100">No expiring warranties.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full">
                <div className="p-3 border-b border-gray-100 flex items-center bg-white">
                  <Activity className="w-4 h-4 text-gray-600 mr-2" />
                  <h2 className="text-sm font-bold text-gray-800">Recent Activity</h2>
                </div>
                <div className="p-4 flex-grow overflow-y-auto max-h-[250px]">
                  <ul className="space-y-4">
                    <li className="flex justify-center items-center py-4">
                      <span className="text-[12px] text-gray-400">No recent activity.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : activeTab === 'Asset Register' ? (
        /* --- Asset Register View --- */
        <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-800">All Assets</h2>
            <div className="flex space-x-2">
              <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-none text-sm font-bold hover:bg-gray-50 shadow-sm">
                <Printer className="w-4 h-4 mr-2" /> Print Tags
              </button>
              <button onClick={handleRegisterClick} className="flex items-center px-4 py-2 bg-[#5542f6] text-white rounded-none text-sm font-bold hover:bg-[#4a3ae0] shadow-sm">
                <Plus className="w-4 h-4 mr-2" /> Register Asset
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="p-4 border-b border-gray-100 flex gap-4 flex-wrap md:flex-nowrap">
            <input
              type="text"
              placeholder="Search name / tag / serial..."
              className="flex-1 min-w-[200px] border border-gray-300 rounded-none p-2 text-sm outline-none focus:border-[#5542f6]"
            />
            <select className="w-[200px] border border-gray-300 rounded-none p-2 text-sm outline-none bg-white focus:border-[#5542f6]">
              <option>All Categories</option>
              <option>IT Equipment</option>
              <option>Sports Equipment</option>
            </select>
            <select className="w-[200px] border border-gray-300 rounded-none p-2 text-sm outline-none bg-white focus:border-[#5542f6]">
              <option>All Statuses</option>
              <option>In Use</option>
              <option>In Store</option>
            </select>
            <button className="flex items-center justify-center px-6 py-2 bg-gray-600 text-white rounded-none text-sm font-bold hover:bg-gray-700 transition-colors shadow-sm whitespace-nowrap">
              <Filter className="w-4 h-4 mr-2" /> Filter
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-3 text-[12px] font-bold text-gray-800">Tag</th>
                  <th className="p-3 text-[12px] font-bold text-gray-800">Asset</th>
                  <th className="p-3 text-[12px] font-bold text-gray-800">Category</th>
                  <th className="p-3 text-[12px] font-bold text-gray-800 text-center">Status</th>
                  <th className="p-3 text-[12px] font-bold text-gray-800">Condition</th>
                  <th className="p-3 text-[12px] font-bold text-gray-800">Location</th>
                  <th className="p-3 text-[12px] font-bold text-gray-800 text-right">Book Value</th>
                  <th className="p-3 text-[12px] font-bold text-gray-800 text-center w-32">Actions</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-gray-700">
                {ASSETS.map((asset, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/50">
                    <td className="p-3 text-pink-500 font-medium text-[12px]">{asset.tag}</td>
                    <td className="p-3">
                      <div className="text-[#fd7e14] font-medium">{asset.name}</div>
                      <div className="text-[11px] text-gray-400">{asset.desc}</div>
                    </td>
                    <td className="p-3 text-gray-600">{asset.category}</td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-0.5 rounded-none text-[11px] font-bold text-white ${asset.status === 'In Use' ? 'bg-[#17a2b8]' : 'bg-[#20c997]'}`}>
                        {asset.status}
                      </span>
                    </td>
                    <td className="p-3 text-gray-600">{asset.condition}</td>
                    <td className="p-3 text-gray-600">{asset.location}</td>
                    <td className="p-3 text-right font-medium text-gray-800">{asset.bookValue}</td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <button className="p-1 border border-cyan-400 rounded-none text-cyan-600 hover:bg-cyan-50"><Eye className="w-3.5 h-3.5" /></button>
                        <button className="p-1 border border-gray-300 rounded-none text-gray-600 hover:bg-gray-50"><Printer className="w-3.5 h-3.5" /></button>
                        <button className="p-1 border border-blue-400 rounded-none text-blue-600 hover:bg-blue-50"><Edit className="w-3.5 h-3.5" /></button>
                        <button className="p-1 border border-red-400 rounded-none text-red-600 hover:bg-red-50"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : activeTab === 'Guide' ? (
        /* --- Guide View --- */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 flex flex-col gap-6">

            {/* Asset Lifecycle */}
            <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden flex flex-col">
              <div className="p-3 border-b border-gray-100 flex items-center bg-white">
                <Box className="w-4 h-4 text-gray-700 mr-2" />
                <h2 className="text-sm font-bold text-gray-800">The Asset Lifecycle — Step by Step</h2>
              </div>
              <div className="p-5">
                <p className="text-[13px] text-gray-600 mb-6">
                  This module is the school's <strong className="font-bold text-gray-700">fixed asset register</strong> — every durable, capital item (furniture, IT equipment, lab apparatus, vehicles, AV gear, sports kit). It follows each asset from purchase, through daily use and upkeep, to retirement — keeping a complete, audited trail at every stage.
                </p>

                <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-[15px] before:w-px before:bg-indigo-100">

                  {/* Step 1 */}
                  <div className="flex items-start relative">
                    <div className="w-8 h-8 rounded-none bg-[#5542f6] text-white flex items-center justify-center font-bold text-sm z-10 flex-shrink-0 mt-0.5">1</div>
                    <div className="ml-4">
                      <h3 className="text-[15px] font-bold text-gray-800 mb-1">Categorise</h3>
                      <p className="text-[13px] text-gray-600 leading-relaxed">
                        Create <span className="text-[#fd7e14]">categories</span> such as <em className="italic">IT Equipment, Furniture</em> or <em className="italic">Lab Apparatus</em>. Set the <strong className="font-bold text-gray-700">depreciation defaults</strong> (method, useful life, salvage %, rate) on a category once — every asset you add to it inherits those settings automatically, so you don't re-enter them per item.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start relative">
                    <div className="w-8 h-8 rounded-none bg-[#5542f6] text-white flex items-center justify-center font-bold text-sm z-10 flex-shrink-0 mt-0.5">2</div>
                    <div className="ml-4">
                      <h3 className="text-[15px] font-bold text-gray-800 mb-1">Register & Tag</h3>
                      <p className="text-[13px] text-gray-600 leading-relaxed mb-2">
                        <span className="text-[#fd7e14]">Register an asset</span> with its identity (name, brand, model, serial), purchase details (supplier, cost, invoice, funding source), warranty/insurance and depreciation settings. A unique <strong className="font-bold text-gray-700">asset tag</strong> is generated automatically (e.g. <span className="text-pink-500 font-medium">AST-00001</span>) — leave the tag field blank to auto-generate, or type your own.
                      </p>
                      <p className="text-[13px] text-gray-600 leading-relaxed">
                        From the register or an asset's page, open its <strong className="font-bold text-gray-700">QR + barcode label</strong> and print it (single label or a full A4 sheet). Stick it on the item so anyone can scan it for an instant lookup — and so it can be verified during an audit.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start relative">
                    <div className="w-8 h-8 rounded-none bg-[#5542f6] text-white flex items-center justify-center font-bold text-sm z-10 flex-shrink-0 mt-0.5">3</div>
                    <div className="ml-4">
                      <h3 className="text-[15px] font-bold text-gray-800 mb-1">Allocate & Track Movement</h3>
                      <p className="text-[13px] text-gray-600 leading-relaxed mb-2">
                        Use <span className="text-[#fd7e14]">Allocations</span> to issue an in-store asset to a <strong className="font-bold text-gray-700">staff member, department or class/room</strong>. The asset becomes <span className="bg-[#007bff] text-white px-1.5 py-0.5 rounded-none text-[11px] font-bold mx-1">In Use</span>. Use <strong className="font-bold text-gray-700">Transfer</strong> to move it to a new holder in one step, and <strong className="font-bold text-gray-700">Return</strong> to bring it back to store (recording the condition on return).
                      </p>
                      <p className="text-[13px] text-gray-600 leading-relaxed">
                        Every hand-over, return, transfer, repair and location change is written to the asset's <strong className="font-bold text-gray-700">lifecycle timeline</strong> — a permanent, append-only history visible on each asset's page.
                      </p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex items-start relative">
                    <div className="w-8 h-8 rounded-none bg-[#5542f6] text-white flex items-center justify-center font-bold text-sm z-10 flex-shrink-0 mt-0.5">4</div>
                    <div className="ml-4">
                      <h3 className="text-[15px] font-bold text-gray-800 mb-1">Depreciate</h3>
                      <p className="text-[13px] text-gray-600 leading-relaxed mb-2">
                        Open <span className="text-[#fd7e14]">Depreciation</span> and click <strong className="font-bold text-gray-700">Preview</strong> to see exactly what will be posted, then <strong className="font-bold text-gray-700">Confirm</strong>. The engine supports <strong className="font-bold text-gray-700">Straight-Line, Declining-Balance</strong> and <strong className="font-bold text-gray-700">Written-Down-Value (WDV)</strong>, posts one entry per month, never drops below the salvage value, and pro-rates the first partial month. It runs <strong className="font-bold text-gray-700">automatically on the 1st of each month</strong> too, so book values stay current with no effort.
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Asset Statuses */}
            <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden flex flex-col">
              <div className="p-3 border-b border-gray-100 flex items-center bg-white">
                <Box className="w-4 h-4 text-gray-800 mr-2" />
                <h2 className="text-sm font-bold text-gray-800">Asset Statuses</h2>
              </div>
              <div className="p-5">
                <p className="text-[13px] text-gray-600 mb-4">An asset moves through these states automatically as you allocate, maintain and dispose of it:</p>
                <div className="flex flex-wrap gap-2 text-[13px] text-gray-600 leading-loose">
                  <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-none text-[11px] font-bold">In Store</span> available, not allocated
                  <span className="bg-[#007bff] text-white px-2 py-0.5 rounded-none text-[11px] font-bold ml-2">In Use</span> allocated to a holder
                  <span className="bg-[#ffc107] text-gray-900 px-2 py-0.5 rounded-none text-[11px] font-bold ml-2">Under Maintenance</span> out for repair/servicing
                  <span className="bg-gray-500 text-white px-2 py-0.5 rounded-none text-[11px] font-bold ml-2">Retired</span> withdrawn from use
                  <span className="bg-gray-600 text-white px-2 py-0.5 rounded-none text-[11px] font-bold ml-2">Disposed</span> sold/scrapped/etc. (locked)
                  <span className="bg-[#dc3545] text-white px-2 py-0.5 rounded-none text-[11px] font-bold ml-2">Lost</span> unaccounted for (locked)
                </div>
                <div className="mt-4 flex items-center text-[12px] text-gray-500">
                  <Shield className="w-4 h-4 mr-1.5" />
                  <p>Locked assets (Disposed / Retired / Lost) are read-only and can't be allocated, maintained or deleted — they remain on record for the audit trail.</p>
                </div>
              </div>
            </div>

          </div>

          <div className="lg:col-span-4 flex flex-col gap-6">

            {/* Good to Know */}
            <div className="bg-white rounded-none border border-gray-200 shadow-sm flex flex-col">
              <div className="p-3 border-b border-gray-100 flex items-center bg-white">
                <HelpCircle className="w-4 h-4 text-gray-700 mr-2" />
                <h2 className="text-sm font-bold text-gray-800">Good to Know</h2>
              </div>
              <div className="p-4">
                <ul className="space-y-3">
                  <li className="flex items-start text-[12px] text-gray-600">
                    <div className="w-1 h-1 rounded-none bg-[#5542f6] mt-1.5 mr-2 flex-shrink-0"></div>
                    <span>Every change is <strong className="font-bold text-gray-700">audited</strong> — who changed what, and when.</span>
                  </li>
                  <li className="flex items-start text-[12px] text-gray-600">
                    <div className="w-1 h-1 rounded-none bg-[#5542f6] mt-1.5 mr-2 flex-shrink-0"></div>
                    <span>Movement, depreciation and audit histories are <strong className="font-bold text-gray-700">append-only</strong> — they can't be silently edited.</span>
                  </li>
                  <li className="flex items-start text-[12px] text-gray-600">
                    <div className="w-1 h-1 rounded-none bg-[#5542f6] mt-1.5 mr-2 flex-shrink-0"></div>
                    <span>Deleting an asset is a <strong className="font-bold text-gray-700">soft delete</strong> (recoverable); end-of-life is handled by <strong className="font-bold text-gray-700">disposal</strong>, never deletion.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Who Can Do What */}
            <div className="bg-white rounded-none border border-gray-200 shadow-sm flex flex-col">
              <div className="p-3 border-b border-gray-100 flex items-center bg-white">
                <Users className="w-4 h-4 text-gray-700 mr-2" />
                <h2 className="text-sm font-bold text-gray-800">Who Can Do What</h2>
              </div>
              <div className="p-4 text-[12px] text-gray-600">
                <p className="mb-3">Access is controlled per area. Typical roles:</p>
                <ul className="space-y-1.5 list-disc pl-4">
                  <li><strong className="text-gray-700 font-medium">Manage assets</strong> — register, edit, tag, categorise.</li>
                  <li><strong className="text-gray-700 font-medium">Allocations</strong> — issue, return, transfer.</li>
                  <li><strong className="text-gray-700 font-medium">Maintenance</strong> — schedules & work logs.</li>
                  <li><strong className="text-gray-700 font-medium">Depreciation</strong> — run/adjust (sensitive).</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      ) : activeTab === 'Categories' ? (
        /* --- Categories View --- */
        <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-800">All Categories</h2>
            <button className="flex items-center px-4 py-2 bg-[#5542f6] text-white rounded-none text-sm font-bold hover:bg-[#4a3ae0] transition-colors shadow-sm">
              <Plus className="w-4 h-4 mr-1.5" /> Add Category
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-4 text-[12px] font-bold text-gray-800">Name</th>
                  <th className="p-4 text-[12px] font-bold text-gray-800">Code</th>
                  <th className="p-4 text-[12px] font-bold text-gray-800">Depreciation</th>
                  <th className="p-4 text-[12px] font-bold text-gray-800">Life (mo)</th>
                  <th className="p-4 text-[12px] font-bold text-gray-800 text-center">Assets</th>
                  <th className="p-4 text-[12px] font-bold text-gray-800 text-center">Status</th>
                  <th className="p-4 text-[12px] font-bold text-gray-800 text-center w-24">Actions</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-gray-700">
                {CATEGORIES.map((cat, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/50">
                    <td className="p-4 text-gray-600">{cat.name}</td>
                    <td className="p-4 font-medium text-gray-600">{cat.code}</td>
                    <td className="p-4 text-gray-600">{cat.depreciation}</td>
                    <td className="p-4 text-gray-600">{cat.life}</td>
                    <td className="p-4 text-center font-medium text-gray-800">{cat.assets}</td>
                    <td className="p-4 text-center">
                      <span className="bg-[#28a745] text-white px-2 py-0.5 rounded-none text-[11px] font-bold">{cat.status}</span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <button className="p-1 border border-blue-400 rounded-none text-blue-600 hover:bg-blue-50"><Edit className="w-3.5 h-3.5" /></button>
                        <button className="p-1 border border-red-400 rounded-none text-red-600 hover:bg-red-50"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : activeTab === 'Allocations' ? (
        /* --- Allocations View --- */
        <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between flex-wrap gap-4">
            <div className="flex rounded-none border border-gray-300 bg-white shadow-sm overflow-hidden">
              <button className="px-4 py-1.5 bg-[#5542f6] text-white text-[13px] font-bold border-r border-gray-300">Active</button>
              <button className="px-4 py-1.5 text-gray-600 text-[13px] font-medium border-r border-gray-300 hover:bg-gray-50">Returned</button>
              <button className="px-4 py-1.5 text-gray-600 text-[13px] font-medium border-r border-gray-300 hover:bg-gray-50">Transferred</button>
              <button className="px-4 py-1.5 text-gray-600 text-[13px] font-medium hover:bg-gray-50">Lost</button>
            </div>
            <button
              onClick={() => setIsAllocating(true)}
              className="flex items-center px-4 py-2 bg-[#5542f6] text-white rounded-none text-sm font-bold hover:bg-[#4a3ae0] shadow-sm"
            >
              <Plus className="w-4 h-4 mr-1.5" /> New Allocation
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-gray-200">
                  <th className="p-4 text-[12px] font-bold text-gray-800">Asset</th>
                  <th className="p-4 text-[12px] font-bold text-gray-800">Holder</th>
                  <th className="p-4 text-[12px] font-bold text-gray-800">Assigned</th>
                  <th className="p-4 text-[12px] font-bold text-gray-800">Expected Return</th>
                  <th className="p-4 text-[12px] font-bold text-gray-800 text-center">Status</th>
                  <th className="p-4 text-[12px] font-bold text-gray-800 text-center w-40">Actions</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-gray-700">
                {ALLOCATIONS.map((alloc, i) => (
                  <tr key={i} className={`border-b border-gray-100 hover:bg-gray-50/50 ${alloc.overdue ? 'bg-red-50/40' : ''}`}>
                    <td className="p-4">
                      <div className="text-[#fd7e14] font-medium">{alloc.asset}</div>
                      <div className="text-[11px] text-pink-500 font-medium">{alloc.tag}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-gray-700 font-medium">{alloc.holder}</div>
                      <div className="text-[11px] text-gray-500">{alloc.role}</div>
                    </td>
                    <td className="p-4 text-gray-600">{alloc.assigned}</td>
                    <td className="p-4">
                      <span className="text-gray-600 mr-2">{alloc.returnDate}</span>
                      {alloc.overdue && <span className="bg-[#dc3545] text-white px-1.5 py-0.5 rounded-none text-[10px] font-bold">overdue</span>}
                    </td>
                    <td className="p-4 text-center">
                      <span className="bg-[#007bff] text-white px-2 py-0.5 rounded-none text-[11px] font-bold">{alloc.status}</span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <button className="px-2 py-1 flex items-center border border-green-500 rounded-none text-green-600 hover:bg-green-50 text-[11px] font-bold">
                          <RotateCcw className="w-3 h-3 mr-1" /> Return
                        </button>
                        <button className="px-2 py-1 flex items-center border border-cyan-500 rounded-none text-cyan-600 hover:bg-cyan-50 text-[11px] font-bold">
                          <ArrowLeftRight className="w-3 h-3 mr-1" /> Transfer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : activeTab === 'Depreciation' ? (
        /* --- Depreciation View --- */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 rounded-none p-4 flex items-center shadow-sm border-t-4 border-t-[#6610f2]">
              <div className="w-10 h-10 bg-[#6610f2] text-white rounded-none flex items-center justify-center mr-4">
                <Box className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[12px] font-bold text-gray-500">Depreciable Assets</p>
                <h3 className="text-lg font-bold text-gray-800">0</h3>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-none p-4 flex items-center shadow-sm border-t-4 border-t-[#ffc107]">
              <div className="w-10 h-10 bg-[#ffc107] text-gray-900 rounded-none flex items-center justify-center mr-4">
                <ArrowDownToLine className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[12px] font-bold text-gray-500">Accumulated Depreciation</p>
                <h3 className="text-lg font-bold text-gray-800">₹0</h3>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-none p-4 flex items-center shadow-sm border-t-4 border-t-[#20c997]">
              <div className="w-10 h-10 bg-[#20c997] text-white rounded-none flex items-center justify-center mr-4">
                <TrendingDown className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[12px] font-bold text-gray-500">Net Book Value</p>
                <h3 className="text-lg font-bold text-gray-800">₹0</h3>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-none border border-gray-200 shadow-sm flex flex-col">
            <div className="p-3 border-b border-gray-100 flex items-center bg-gray-50/50 font-bold text-sm text-gray-800">
              Run Depreciation
            </div>
            <div className="p-4 flex items-center gap-4 flex-wrap">
              <label className="text-[13px] font-bold text-gray-800">Post depreciation up to</label>
              <input type="text" defaultValue="23-08-2026" className="border border-gray-300 rounded-none p-1.5 text-sm outline-none focus:border-[#5542f6]" />
              <button className="flex items-center px-4 py-1.5 bg-[#5542f6] text-white rounded-none text-sm font-bold hover:bg-[#4a3ae0] shadow-sm">
                <Filter className="w-4 h-4 mr-2" /> Preview
              </button>
              <span className="text-[12px] text-gray-500 ml-2">Posts any missing monthly entries for every eligible asset. You'll confirm before anything is saved.</span>
            </div>
          </div>

          <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-sm font-bold text-gray-800">Depreciation Register</h2>
              <select className="border border-gray-300 rounded-none p-1.5 text-sm outline-none bg-white focus:border-[#5542f6]">
                <option>All Financial Years</option>
              </select>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white border-b border-gray-200">
                    <th className="p-4 text-[12px] font-bold text-gray-800">Asset</th>
                    <th className="p-4 text-[12px] font-bold text-gray-800">Period</th>
                    <th className="p-4 text-[12px] font-bold text-gray-800">FY</th>
                    <th className="p-4 text-[12px] font-bold text-gray-800">Method</th>
                    <th className="p-4 text-[12px] font-bold text-gray-800 text-right">Opening</th>
                    <th className="p-4 text-[12px] font-bold text-gray-800 text-right">Depreciation</th>
                    <th className="p-4 text-[12px] font-bold text-gray-800 text-right">Accumulated</th>
                    <th className="p-4 text-[12px] font-bold text-gray-800 text-right">Closing</th>
                  </tr>
                </thead>
                <tbody className="text-[13px] text-gray-700">
                  {DEPRECIATION_RECORDS.map((rec, i) => (
                    <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/50">
                      <td className="p-4">
                        <div className="text-[#fd7e14] font-medium">{rec.asset}</div>
                        <div className="text-[11px] text-pink-500 font-medium">{rec.tag}</div>
                      </td>
                      <td className="p-4 text-gray-600">{rec.period}</td>
                      <td className="p-4 text-gray-600">{rec.fy}</td>
                      <td className="p-4 text-gray-600">{rec.method}</td>
                      <td className="p-4 text-right font-medium text-gray-800">{rec.opening}</td>
                      <td className="p-4 text-right font-medium text-red-500">{rec.dep}</td>
                      <td className="p-4 text-right font-medium text-gray-800">{rec.acc}</td>
                      <td className="p-4 text-right font-bold text-gray-900">{rec.closing}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : activeTab === 'Maintenance' ? (
        /* --- Maintenance View --- */
        <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-100 flex items-center space-x-3 bg-gray-50/50">
            <button className="flex items-center px-4 py-2 bg-[#5542f6] text-white rounded-none text-sm font-bold hover:bg-[#4a3ae0] shadow-sm">
              <Wrench className="w-4 h-4 mr-2" /> Log Maintenance
            </button>
            <button className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-none text-sm font-bold hover:bg-gray-50 shadow-sm">
              <Plus className="w-4 h-4 mr-2" /> Add Schedule
            </button>
          </div>

          <div className="p-4 border-b border-gray-100">
            <h2 className="text-sm font-bold text-gray-800 flex items-center">
              <BookOpen className="w-4 h-4 mr-2" /> Preventive Schedules
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-gray-200">
                  <th className="p-4 text-[12px] font-bold text-gray-800">Asset</th>
                  <th className="p-4 text-[12px] font-bold text-gray-800">Title</th>
                  <th className="p-4 text-[12px] font-bold text-gray-800">Type</th>
                  <th className="p-4 text-[12px] font-bold text-gray-800">Frequency</th>
                  <th className="p-4 text-[12px] font-bold text-gray-800">Next Due</th>
                  <th className="p-4 text-[12px] font-bold text-gray-800">Assigned</th>
                  <th className="p-4 text-[12px] font-bold text-gray-800 text-center w-32">Actions</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-gray-700">
                {MAINTENANCES.map((mnt, i) => (
                  <tr key={i} className="border-b border-red-100 bg-[#ffebee] hover:bg-[#ffcdd2]">
                    <td className="p-4">
                      <div className="text-[#fd7e14] font-medium">{mnt.asset}</div>
                      <div className="text-[11px] text-pink-500 font-medium">{mnt.tag}</div>
                    </td>
                    <td className="p-4 text-gray-700">{mnt.title}</td>
                    <td className="p-4 text-gray-600">{mnt.type}</td>
                    <td className="p-4 text-gray-600">{mnt.freq}</td>
                    <td className="p-4 text-gray-700">
                      <span className="mr-2">{mnt.due}</span>
                      <span className="bg-[#dc3545] text-white px-1.5 py-0.5 rounded-none text-[10px] font-bold">overdue</span>
                    </td>
                    <td className="p-4 text-gray-600">{mnt.assigned}</td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <button className="px-1.5 py-0.5 flex items-center border border-green-500 rounded-none text-green-600 hover:bg-green-50 text-[10px] font-bold">
                          <Wrench className="w-3 h-3 mr-1" /> Log
                        </button>
                        <button className="p-1 border border-blue-400 rounded-none text-blue-600 hover:bg-blue-50"><Edit className="w-3.5 h-3.5" /></button>
                        <button className="p-1 border border-red-400 rounded-none text-red-600 hover:bg-red-50"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : activeTab === 'Disposals' ? (
        /* --- Disposals View --- */
        <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50">
            <button className="flex items-center px-4 py-2 bg-[#5542f6] text-white rounded-none text-sm font-bold hover:bg-[#4a3ae0] shadow-sm w-fit">
              <RotateCcw className="w-4 h-4 mr-2" /> Request Disposal
            </button>
          </div>
          <div className="p-4 border-b border-gray-100 flex items-center bg-white">
            <h2 className="text-sm font-bold text-gray-800">Disposal Requests</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-gray-200">
                  <th className="p-4 text-[12px] font-bold text-gray-800">Asset</th>
                  <th className="p-4 text-[12px] font-bold text-gray-800">Method</th>
                  <th className="p-4 text-[12px] font-bold text-gray-800">Date</th>
                  <th className="p-4 text-[12px] font-bold text-gray-800 text-center">Realised</th>
                  <th className="p-4 text-[12px] font-bold text-gray-800 text-center">Book Value</th>
                  <th className="p-4 text-[12px] font-bold text-gray-800 text-center">Gain/Loss</th>
                  <th className="p-4 text-[12px] font-bold text-gray-800">Status</th>
                  <th className="p-4 text-[12px] font-bold text-gray-800">Requested</th>
                  <th className="p-4 text-[12px] font-bold text-gray-800 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-gray-700">
                {DISPOSALS.map((disp, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/50">
                    <td className="p-4">
                      <div className="text-[#fd7e14] font-medium">{disp.asset}</div>
                      <div className="text-[11px] text-pink-500 font-medium">{disp.tag}</div>
                    </td>
                    <td className="p-4 text-gray-600">{disp.method}</td>
                    <td className="p-4 text-gray-600">{disp.date}</td>
                    <td className="p-4 text-center font-medium text-gray-700">{disp.realised}</td>
                    <td className="p-4 text-center font-medium text-gray-700">{disp.bookValue}</td>
                    <td className={`p-4 text-center font-medium ${disp.gainLoss !== '—' ? 'text-red-500' : 'text-green-500'}`}>{disp.gainLoss}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-none text-[11px] font-bold ${disp.status === 'Completed' ? 'bg-[#28a745] text-white' : 'bg-[#ffc107] text-gray-900'}`}>
                        {disp.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600">{disp.requested}</td>
                    <td className="p-4 text-right">
                      {disp.status === 'Pending approval' ? (
                        <div className="flex items-center justify-end space-x-1">
                          <button className="px-2 py-1 flex items-center bg-[#28a745] text-white rounded-none text-[11px] font-bold hover:bg-green-600 shadow-sm">
                            <CheckCircle className="w-3 h-3 mr-1" /> Approve
                          </button>
                          <button className="px-1.5 py-1 flex items-center border border-red-200 text-red-500 rounded-none text-[11px] hover:bg-red-50">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : activeTab === 'Audits' ? (
        /* --- Audits View --- */
        <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50">
            <button className="flex items-center px-4 py-2 bg-[#5542f6] text-white rounded-none text-sm font-bold hover:bg-[#4a3ae0] shadow-sm w-fit">
              <Plus className="w-4 h-4 mr-2" /> New Audit Session
            </button>
          </div>
          <div className="p-4 border-b border-gray-100 flex items-center bg-white">
            <h2 className="text-sm font-bold text-gray-800">Physical Verification Sessions</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-gray-200">
                  <th className="p-4 text-[12px] font-bold text-gray-800">Title</th>
                  <th className="p-4 text-[12px] font-bold text-gray-800">Scope</th>
                  <th className="p-4 text-[12px] font-bold text-gray-800 text-center">Assets</th>
                  <th className="p-4 text-[12px] font-bold text-gray-800">Status</th>
                  <th className="p-4 text-[12px] font-bold text-gray-800">Conducted By</th>
                  <th className="p-4 text-[12px] font-bold text-gray-800">Started</th>
                  <th className="p-4 text-[12px] font-bold text-gray-800 text-right"></th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-gray-700">
                {AUDITS.map((audit, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/50">
                    <td className="p-4 font-medium text-[#fd7e14]">{audit.title}</td>
                    <td className="p-4 text-gray-600">{audit.scope}</td>
                    <td className="p-4 text-center font-medium text-gray-700">{audit.assets}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-none text-[11px] font-bold ${audit.status === 'Completed' ? 'bg-[#28a745] text-white' : 'bg-[#ffc107] text-gray-900'}`}>
                        {audit.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600">{audit.by}</td>
                    <td className="p-4 text-gray-600">{audit.started}</td>
                    <td className="p-4 text-right">
                      <button className="px-2 py-1 border border-cyan-400 text-cyan-600 rounded-none text-[11px] font-bold hover:bg-cyan-50">
                        {audit.status === 'Open' ? 'Verify' : 'View'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : activeTab === 'Reports' ? (
        /* --- Reports View --- */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {[
            { title: 'Asset Register', desc: 'Full list of every fixed asset with status and value.', icon: <List className="w-5 h-5 text-[#6610f2]" /> },
            { title: 'Depreciation Register', desc: 'Every posted depreciation period, newest first.', icon: <TrendingDown className="w-5 h-5 text-[#6610f2]" /> },
            { title: 'Custody / Allocation Register', desc: 'Who holds (or held) each asset.', icon: <Users className="w-5 h-5 text-[#6610f2]" /> },
            { title: 'Maintenance History', desc: 'All maintenance work logs and their cost.', icon: <Wrench className="w-5 h-5 text-[#6610f2]" /> },
            { title: 'Warranty Expiry', desc: 'Assets with a warranty, soonest expiry first.', icon: <Shield className="w-5 h-5 text-[#6610f2]" /> },
            { title: 'Disposal Register', desc: 'Disposed / retired assets and gain/loss.', icon: <RotateCcw className="w-5 h-5 text-[#6610f2]" /> },
            { title: 'Movement Ledger', desc: 'The full lifecycle event timeline across all assets.', icon: <ArrowLeftRight className="w-5 h-5 text-[#6610f2]" /> },
          ].map((report, i) => (
            <div key={i} className="bg-white rounded-none border border-gray-200 shadow-sm flex flex-col hover:border-[#5542f6] transition-colors">
              <div className="p-4 flex-grow border-t-2 border-t-[#5542f6] rounded-t-lg">
                <div className="flex items-center mb-1">
                  {report.icon}
                  <h3 className="ml-2 text-[15px] font-bold text-gray-800">{report.title}</h3>
                </div>
                <p className="text-[12px] text-gray-500 mt-2">{report.desc}</p>
              </div>
              <div className="flex border-t border-gray-100 bg-gray-50/50 rounded-b-lg">
                <button className="flex-1 py-2 flex items-center justify-center text-[12px] font-bold text-gray-600 hover:bg-gray-100 border-r border-gray-100 transition-colors">
                  <Box className="w-3.5 h-3.5 mr-1.5" /> View
                </button>
                <button className="flex-1 py-2 flex items-center justify-center text-[12px] font-bold text-red-500 hover:bg-red-50 border-r border-gray-100 transition-colors">
                  <FileText className="w-3.5 h-3.5 mr-1.5" /> PDF
                </button>
                <button className="flex-1 py-2 flex items-center justify-center text-[12px] font-bold text-green-600 hover:bg-green-50 transition-colors">
                  <Download className="w-3.5 h-3.5 mr-1.5" /> CSV
                </button>
              </div>
            </div>
          ))}

        </div>
      ) : (
        /* Other tabs empty placeholder */
        <div className="text-gray-500 text-sm p-4 bg-white rounded-none border">Content for {activeTab} will go here.</div>
      )}

      {/* --- Allocate Asset Modal --- */}
      {isAllocating && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-none shadow-xl w-full max-w-md flex flex-col">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800">Allocate Asset</h2>
              <button onClick={() => setIsAllocating(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            <div className="p-5 overflow-y-auto max-h-[70vh]">
              <div className="mb-4">
                <label className="block text-[12px] font-bold text-gray-700 mb-1">Asset <span className="text-red-500">*</span></label>
                <select className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none focus:border-[#5542f6] bg-white">
                  <option>— Select an in-store asset —</option>
                  <option>AST-00213 - Cricket Kit (Full)</option>
                  <option>AST-00209 - Digital Balance</option>
                </select>
                <p className="text-[11px] text-gray-500 mt-1">Only assets currently <strong className="font-medium text-gray-600">in store</strong> can be allocated.</p>
              </div>

              <div className="mb-4">
                <label className="block text-[12px] font-bold text-gray-700 mb-1">Assign To <span className="text-red-500">*</span></label>
                <div className="flex gap-2">
                  <select className="w-1/3 border border-gray-300 rounded-none p-2 text-sm outline-none focus:border-[#5542f6] bg-white">
                    <option>Staff</option>
                    <option>Student</option>
                    <option>Class</option>
                  </select>
                  <select className="w-2/3 border border-gray-300 rounded-none p-2 text-sm outline-none focus:border-[#5542f6] bg-white">
                    <option>— Select —</option>
                    <option>Sneha Desai</option>
                    <option>Vikram Singh</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1">Assigned Date</label>
                  <input type="text" defaultValue="23-08-2026" className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none focus:border-[#5542f6]" />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-gray-700 mb-1">Expected Return</label>
                  <input type="text" placeholder="dd-mm-yyyy" className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none focus:border-[#5542f6]" />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-[12px] font-bold text-gray-700 mb-1">Condition at Handover</label>
                <select className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none focus:border-[#5542f6] bg-white">
                  <option>Good</option>
                  <option>New</option>
                  <option>Fair</option>
                </select>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-gray-700 mb-1">Remarks</label>
                <textarea rows="3" className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none focus:border-[#5542f6] resize-none"></textarea>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 flex justify-end space-x-3 bg-gray-50/50 rounded-b-lg">
              <button
                onClick={() => setIsAllocating(false)}
                className="px-6 py-2 bg-gray-500 text-white rounded-none text-sm font-bold hover:bg-gray-600 shadow-sm"
              >
                Cancel
              </button>
              <button className="px-6 py-2 bg-[#5542f6] text-white rounded-none text-sm font-bold hover:bg-[#4a3ae0] shadow-sm">
                Allocate
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
