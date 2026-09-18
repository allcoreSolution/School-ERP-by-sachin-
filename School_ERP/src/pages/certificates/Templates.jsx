import React, { useState, useMemo } from 'react';
import { Search, Edit2, Trash2, User, Users, FileText, Receipt, GraduationCap } from 'lucide-react';

const DUMMY_TEMPLATES = [
  { id: 1, title: 'Bonafide Certificate A12', type: 'Student', image: 'https://placehold.co/600x400/ffffff/cccccc?text=Bonafide+Certificate' },
  { id: 2, title: 'Board Style Admit Card', type: 'Admit Card', image: 'https://placehold.co/600x400/ffffff/cccccc?text=Admit+Card' },
  { id: 3, title: 'Pro | Standard Corporate Fee Receipt', type: 'Fee Receipt', image: 'https://placehold.co/600x400/ffffff/cccccc?text=Fee+Receipt' },
  { id: 4, title: 'Holistic Progress Card', type: 'Student', image: 'https://placehold.co/600x400/ffffff/cccccc?text=Progress+Card' },
  { id: 5, title: 'Marksheet Terminal', type: 'Report Card', image: 'https://placehold.co/600x400/ffffff/cccccc?text=Marksheet' },
  { id: 6, title: 'Annual Result Sheet', type: 'Report Card', image: 'https://placehold.co/600x400/ffffff/cccccc?text=Result+Sheet' },
  { id: 7, title: 'Staff Identity Card', type: 'Staff', image: 'https://placehold.co/600x400/ffffff/cccccc?text=Staff+ID' },
  { id: 8, title: 'Mid-term Report Card', type: 'Report Card', image: 'https://placehold.co/600x400/ffffff/cccccc?text=Mid-term' },
  { id: 9, title: 'Final Admit Card', type: 'Admit Card', image: 'https://placehold.co/600x400/ffffff/cccccc?text=Admit+Card+2' },
  { id: 10, title: 'Character Certificate', type: 'Student', image: 'https://placehold.co/600x400/ffffff/cccccc?text=Character+Certificate' },
];

const TABS = [
  { id: 'All', label: 'All', icon: null },
  { id: 'Student', label: 'Student', icon: User },
  { id: 'Staff', label: 'Staff', icon: Users },
  { id: 'Admit Card', label: 'Admit Card', icon: FileText },
  { id: 'Report Card', label: 'Report Card', icon: GraduationCap },
  { id: 'Fee Receipt', label: 'Fee Receipt', icon: Receipt },
];

export default function Templates() {
  const [templates, setTemplates] = useState(DUMMY_TEMPLATES);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Delete handler
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      setTemplates(templates.filter(t => t.id !== id));
    }
  };

  // Edit handler
  const handleEdit = (id) => {
    alert(`Editing template ID: ${id}`);
  };

  // Filter logic
  const filteredTemplates = useMemo(() => {
    return templates.filter(t => {
      const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab = activeTab === 'All' || t.type === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [templates, activeTab, searchQuery]);

  // Tab counts
  const getTabCount = (tabId) => {
    if (tabId === 'All') return templates.length;
    return templates.filter(t => t.type === tabId).length;
  };

  // Dynamic tag color
  const getTagColor = (type) => {
    switch(type) {
      case 'Student': return 'text-green-600 bg-green-50 border-green-200';
      case 'Admit Card': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Fee Receipt': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'Report Card': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Staff': return 'text-indigo-600 bg-indigo-50 border-indigo-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-[#f4f7fc] min-h-screen font-sans p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[24px] font-semibold text-gray-800">Templates</h1>
        <p className="text-gray-500 text-sm mt-1">Certificates, ID cards & documents</p>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-none shadow-sm border border-gray-200 p-3 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 overflow-x-auto">
        
        {/* Search */}
        <div className="relative w-full md:w-72 flex-shrink-0">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-none text-sm focus:outline-none focus:ring-1 focus:ring-[#5542f6] focus:border-[#5542f6]"
          />
        </div>

        {/* Tabs */}
        <div className="flex items-center space-x-2 whitespace-nowrap">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const count = getTabCount(tab.id);
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-3 py-1.5 rounded-none text-sm font-medium transition-colors border ${
                  isActive
                    ? 'bg-[#5542f6] text-white border-[#5542f6]'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {Icon && <Icon className={`w-3.5 h-3.5 mr-1.5 ${isActive ? 'text-white' : 'text-gray-500'}`} />}
                {tab.label}
                <span 
                  className={`ml-2 px-1.5 py-0.5 rounded-none text-[10px] font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <div key={template.id} className="bg-white rounded-none border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
              {/* Image Preview */}
              <div className="h-48 border-b border-gray-100 p-4 bg-gray-50 flex items-center justify-center relative group">
                <img 
                  src={template.image} 
                  alt={template.title} 
                  className="max-h-full max-w-full object-contain drop-shadow-sm border border-gray-200 bg-white" 
                />
              </div>

              {/* Footer Details */}
              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-1 mb-2" title={template.title}>
                    {template.title}
                  </h3>
                  <span className={`inline-block px-2 py-0.5 rounded-none border text-[11px] font-medium ${getTagColor(template.type)}`}>
                    {template.type}
                  </span>
                </div>
                
                <div className="flex justify-end items-center space-x-3 mt-4 pt-3 border-t border-gray-100">
                  <button 
                    onClick={() => handleEdit(template.id)}
                    className="text-gray-400 hover:text-[#5542f6] transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(template.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-none border border-gray-200 shadow-sm">
          <p className="text-gray-500 text-lg">No templates found.</p>
        </div>
      )}
    </div>
  );
}
