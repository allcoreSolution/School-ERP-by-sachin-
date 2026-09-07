import React, { useState } from 'react';
import {
  Lock, Plus, Eye, Edit, Trash2, LayoutList, LayoutGrid,
  FileText, FileSpreadsheet, Printer, Columns, Search
} from 'lucide-react';

const initPosts = [
  { id: 1, title: 'Mastering Revenue with the ProjectWorlds Finance & Fee Management Ecosystem', readTime: '2 min read', category: 'School Management', categoryColor: 'bg-blue-100 text-blue-700', author: 'Super Admin', status: 'Published', views: 144, published: 'Feb 18, 2026' },
  { id: 2, title: 'Native Architectural Support for the Kenyan CBC (Competency Based Curriculum) Assessment System', readTime: '2 min read', category: 'Product Updates', categoryColor: 'bg-purple-100 text-purple-700', author: 'Super Admin', status: 'Published', views: 107, published: 'Feb 21, 2026' },
  { id: 3, title: 'Streamline Your School HR: Intelligent Leave Workflows and Automated Payroll Processing', readTime: '2 min read', category: 'School Management', categoryColor: 'bg-blue-100 text-blue-700', author: 'Super Admin', status: 'Published', views: 96, published: 'Feb 28, 2026' },
  { id: 4, title: 'The Future of Education Technology in Sub-Saharan Africa', readTime: '3 min read', category: 'Technology', categoryColor: 'bg-green-100 text-green-700', author: 'Super Admin', status: 'Published', views: 210, published: 'Mar 05, 2026' },
  { id: 5, title: 'How Digital Attendance Saves Time for School Administrators', readTime: '2 min read', category: 'School Management', categoryColor: 'bg-blue-100 text-blue-700', author: 'Admin', status: 'Published', views: 88, published: 'Mar 10, 2026' },
  { id: 6, title: 'Fee Management Best Practices for Multi-Branch Schools', readTime: '4 min read', category: 'Finance', categoryColor: 'bg-yellow-100 text-yellow-700', author: 'Admin', status: 'Published', views: 155, published: 'Mar 15, 2026' },
  { id: 7, title: 'Understanding WhatsApp Notifications in School ERP', readTime: '2 min read', category: 'Product Updates', categoryColor: 'bg-purple-100 text-purple-700', author: 'Super Admin', status: 'Published', views: 72, published: 'Mar 20, 2026' },
  { id: 8, title: 'Parent Portal: Bridging the Gap Between Schools and Families', readTime: '3 min read', category: 'Technology', categoryColor: 'bg-green-100 text-green-700', author: 'Super Admin', status: 'Published', views: 190, published: 'Mar 25, 2026' },
  { id: 9, title: 'Top 10 Tips for Better Classroom Management', readTime: '5 min read', category: 'Teaching Tips', categoryColor: 'bg-orange-100 text-orange-700', author: 'Admin', status: 'Draft', views: 0, published: '-' },
  { id: 10, title: 'Introducing AI-Powered Student Performance Analytics', readTime: '3 min read', category: 'Product Updates', categoryColor: 'bg-purple-100 text-purple-700', author: 'Super Admin', status: 'Published', views: 321, published: 'Apr 01, 2026' },
  { id: 11, title: 'How to Configure SMS Gateways in School ERP', readTime: '2 min read', category: 'Technology', categoryColor: 'bg-green-100 text-green-700', author: 'Super Admin', status: 'Published', views: 65, published: 'Apr 05, 2026' },
  { id: 12, title: 'School Library Management: A Digital Approach', readTime: '3 min read', category: 'School Management', categoryColor: 'bg-blue-100 text-blue-700', author: 'Admin', status: 'Published', views: 43, published: 'Apr 10, 2026' },
  { id: 13, title: 'Exam Scheduling Made Easy with Multi School ERP', readTime: '2 min read', category: 'School Management', categoryColor: 'bg-blue-100 text-blue-700', author: 'Super Admin', status: 'Published', views: 98, published: 'Apr 15, 2026' },
  { id: 14, title: 'Driving School Revenue with Smart Subscription Plans', readTime: '4 min read', category: 'Finance', categoryColor: 'bg-yellow-100 text-yellow-700', author: 'Super Admin', status: 'Draft', views: 0, published: '-' },
];

const PAGE_SIZES = [10, 25, 50, 100];

export default function BlogPosts() {
  const [posts, setPosts] = useState(initPosts);
  const [search, setSearch] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'grid'

  // Stats
  const totalPosts = posts.length;
  const published = posts.filter(p => p.status === 'Published').length;
  const drafts = posts.filter(p => p.status === 'Draft').length;
  const totalViews = posts.reduce((acc, p) => acc + p.views, 0).toLocaleString();

  // Filter
  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase()) ||
    p.author.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const displayed = filtered.slice(startIndex, startIndex + pageSize);

  // Delete
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(prev => prev.filter(p => p.id !== id));
      if (displayed.length === 1 && currentPage > 1) setCurrentPage(p => p - 1);
    }
  };

  // Export stubs
  const handleExport = (type) => alert(`${type} export coming soon.`);

  const statCards = [
    { icon: '📝', label: 'TOTAL POSTS', value: totalPosts, color: 'text-blue-600' },
    { icon: '✅', label: 'PUBLISHED', value: published, color: 'text-green-600' },
    { icon: '✏️', label: 'DRAFTS', value: drafts, color: 'text-orange-500' },
    { icon: '👁️', label: 'TOTAL VIEWS', value: totalViews, color: 'text-gray-700' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-sm text-gray-500 mt-0.5">Public website articles &amp; product updates</p>
        </div>
        <button
          onClick={() => alert('New Blog Post form coming soon.')}
          className="flex items-center gap-2 px-4 py-2 bg-[#6610f2] text-white rounded-none hover:bg-purple-700 text-sm font-semibold transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" strokeWidth={3} />
          New Blog Post
        </button>
      </div>

      {/* Demo Warning */}
      <div className="flex items-center gap-2 bg-[#fff8e1] border border-[#fde68a] rounded-none p-3 mb-5 text-sm text-[#854d0e]">
        <Lock className="w-4 h-4 text-[#ca8a04] flex-shrink-0" />
        <p><strong>Demo mode:</strong> this is public website content — read-only in demo mode: saving, publishing and deleting are disabled for security.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {statCards.map((s, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-none p-4 shadow-sm flex items-center gap-3">
            <span className="text-2xl">{s.icon}</span>
            <div>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table Container */}
      <div className="bg-white border border-gray-200 rounded-none shadow-sm">
        {/* Section Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold text-gray-800 flex items-center gap-1.5">
              📝 All Blog Posts
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-none ${viewMode === 'list' ? 'bg-gray-200 text-gray-800' : 'text-gray-400 hover:bg-gray-100'}`}
              title="List view"
            >
              <LayoutList className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-none ${viewMode === 'grid' ? 'bg-gray-200 text-gray-800' : 'text-gray-400 hover:bg-gray-100'}`}
              title="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 text-sm text-gray-700">
              <span>Show</span>
              <select
                value={pageSize}
                onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
                className="border border-gray-300 rounded-none px-2 py-1 text-sm focus:outline-none focus:border-gray-400"
              >
                {PAGE_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            {/* Export Buttons */}
            <div className="flex items-center gap-1">
              {[
                { label: 'CSV', icon: <FileText className="w-3 h-3" /> },
                { label: 'Excel', icon: <FileSpreadsheet className="w-3 h-3" /> },
                { label: 'PDF', icon: <FileText className="w-3 h-3" /> },
                { label: '', icon: <Printer className="w-3.5 h-3.5" /> },
              ].map((btn, i) => (
                <button
                  key={i}
                  onClick={() => handleExport(btn.label || 'Print')}
                  className="flex items-center gap-1 px-2 py-1 text-xs font-medium border border-gray-300 bg-white rounded-none hover:bg-gray-100 text-gray-600 transition-colors"
                >
                  {btn.icon}{btn.label}
                </button>
              ))}
              <button
                onClick={() => alert('Column visibility settings coming soon.')}
                className="flex items-center gap-1 px-2 py-1 text-xs font-medium border border-gray-300 bg-white rounded-none hover:bg-gray-100 text-gray-600 transition-colors"
              >
                <Columns className="w-3 h-3" /> Columns ▾
              </button>
            </div>
          </div>
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              placeholder="Search posts..."
              className="pl-8 pr-3 py-1.5 border border-gray-300 rounded-none text-sm focus:outline-none focus:border-blue-400 w-52"
            />
          </div>
        </div>

        {/* LIST VIEW */}
        {viewMode === 'list' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-300">
                  <th className="px-3 py-2.5 text-xs font-bold text-gray-600 uppercase border-r border-gray-200 w-10">#</th>
                  <th className="px-3 py-2.5 text-xs font-bold text-gray-600 uppercase border-r border-gray-200">TITLE</th>
                  <th className="px-3 py-2.5 text-xs font-bold text-gray-600 uppercase border-r border-gray-200">CATEGORY</th>
                  <th className="px-3 py-2.5 text-xs font-bold text-gray-600 uppercase border-r border-gray-200">AUTHOR</th>
                  <th className="px-3 py-2.5 text-xs font-bold text-gray-600 uppercase border-r border-gray-200 text-center">STATUS</th>
                  <th className="px-3 py-2.5 text-xs font-bold text-gray-600 uppercase border-r border-gray-200 text-center">VIEWS</th>
                  <th className="px-3 py-2.5 text-xs font-bold text-gray-600 uppercase border-r border-gray-200">PUBLISHED</th>
                  <th className="px-3 py-2.5 text-xs font-bold text-gray-600 uppercase text-right pr-4">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {displayed.length > 0 ? displayed.map((post, idx) => (
                  <tr key={post.id} className="hover:bg-blue-50 transition-colors">
                    <td className="px-3 py-3 text-sm text-gray-500 border-r border-gray-100 text-center">{startIndex + idx + 1}</td>
                    <td className="px-3 py-3 border-r border-gray-100 max-w-xs">
                      <p className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2">{post.title}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-1">
                        <span>⏱</span> {post.readTime}
                      </p>
                    </td>
                    <td className="px-3 py-3 border-r border-gray-100">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-none text-xs font-semibold ${post.categoryColor}`}>
                        {post.category}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-700 border-r border-gray-100 whitespace-nowrap">{post.author}</td>
                    <td className="px-3 py-3 border-r border-gray-100 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-none text-xs font-bold text-white ${
                        post.status === 'Published' ? 'bg-[#22c55e]' : 'bg-[#6c757d]'
                      }`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-700 border-r border-gray-100 text-center">{post.views}</td>
                    <td className="px-3 py-3 text-sm text-gray-600 border-r border-gray-100 whitespace-nowrap">{post.published}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 rounded-none hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors" title="Preview">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-none hover:bg-blue-50 text-gray-500 hover:text-blue-600 transition-colors" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="p-1.5 rounded-none hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="8" className="px-4 py-10 text-center text-sm text-gray-400">
                      No matching posts found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* GRID VIEW */}
        {viewMode === 'grid' && (
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayed.length > 0 ? displayed.map(post => (
              <div key={post.id} className="border border-gray-200 rounded-none p-4 hover:shadow-md transition-shadow bg-white">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-none text-xs font-semibold mb-2 ${post.categoryColor}`}>
                  {post.category}
                </span>
                <p className="text-sm font-semibold text-gray-800 mb-1 line-clamp-3 leading-snug">{post.title}</p>
                <p className="text-[11px] text-gray-400 mb-3">⏱ {post.readTime} • {post.author}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-none text-white ${post.status === 'Published' ? 'bg-green-500' : 'bg-gray-500'}`}>
                    {post.status}
                  </span>
                  <div className="flex items-center gap-0.5">
                    <button className="p-1.5 rounded-none hover:bg-gray-100 text-gray-400 hover:text-gray-600"><Eye className="w-3.5 h-3.5" /></button>
                    <button className="p-1.5 rounded-none hover:bg-blue-50 text-gray-400 hover:text-blue-600"><Edit className="w-3.5 h-3.5" /></button>
                    <button onClick={() => handleDelete(post.id)} className="p-1.5 rounded-none hover:bg-red-50 text-gray-400 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </div>
            )) : (
              <p className="col-span-3 text-center py-8 text-sm text-gray-400">No matching posts found.</p>
            )}
          </div>
        )}

        {/* Pagination */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 px-4 py-3 border-t border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-600">
            Showing {filtered.length > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + pageSize, filtered.length)} of {filtered.length} entries
            {search && ` (filtered from ${posts.length} total)`}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="px-2 py-1 text-xs border border-gray-300 rounded-none bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >«</button>
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border border-gray-300 rounded-none bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >Previous</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
              .reduce((acc, p, i, arr) => {
                if (i > 0 && p - arr[i - 1] > 1) acc.push('...');
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                p === '...' ? (
                  <span key={`ellipsis-${i}`} className="px-2 text-gray-400">…</span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`px-3 py-1 text-sm border rounded-none ${currentPage === p ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'}`}
                  >{p}</button>
                )
              )}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm border border-gray-300 rounded-none bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >Next</button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-2 py-1 text-xs border border-gray-300 rounded-none bg-white text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >»</button>
          </div>
        </div>
      </div>
    </div>
  );
}
