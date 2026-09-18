import React, { useState } from 'react';
import { Image as ImageIcon, Plus, Eye, Edit2, Trash2 } from 'lucide-react';

const ALBUMS = [
  { id: 1, title: 'Sports', count: 4, cover: 'https://images.unsplash.com/photo-1574629810360-7efbb6b4904c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', time: '1 month ago' },
  { id: 2, title: 'Culture', count: 4, cover: 'https://images.unsplash.com/photo-1507676184212-d0330a15233c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', time: '1 month ago' },
  { id: 3, title: 'General Gallery', count: 2, cover: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', time: '1 month ago' },
  { id: 4, title: 'Annual Day 2025', desc: 'Annual Day 2025 Events Moments', count: 8, cover: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', time: '3 months ago' },
];

export default function ImageGallery() {
  const [isAdding, setIsAdding] = useState(false);

  if (isAdding) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Create New Album</h1>
          <p className="text-sm text-gray-500 mt-1">Set up the album first, then upload photos into it</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden flex flex-col">
              <div className="p-4 border-b border-gray-100 flex items-center bg-white">
                <ImageIcon className="w-5 h-5 text-[#5542f6] mr-2" />
                <h2 className="text-base font-bold text-gray-800">Album Details</h2>
              </div>
              
              <div className="p-6 space-y-6 flex-1">
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">
                    Album Title <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g., Annual Day 2026"
                    className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none focus:border-[#5542f6]"
                  />
                </div>
                
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea 
                    placeholder="Optional description of this album..."
                    className="w-full h-[100px] border border-gray-300 rounded-none p-3 text-sm outline-none focus:border-[#5542f6] resize-none"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">
                    Cover Image
                  </label>
                  <div className="flex">
                    <div className="flex-1 border border-r-0 border-gray-300 rounded-l p-2 text-sm text-gray-500 bg-white">
                      Choose file...
                    </div>
                    <button className="px-4 border border-gray-300 bg-gray-50 rounded-r text-sm font-bold text-gray-700 hover:bg-gray-100">
                      Browse
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1.5">Max 5 MB. If not set, the first uploaded image will be used as cover.</p>
                </div>
                
                <div className="pt-2">
                  <label className="block text-[13px] font-bold text-gray-700 mb-2">
                    Visibility
                  </label>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-5 bg-[#5542f6] rounded-none relative cursor-pointer">
                      <div className="w-4 h-4 bg-white rounded-none shadow absolute top-0.5 right-0.5"></div>
                    </div>
                    <span className="text-sm font-bold text-gray-800">Published <span className="font-normal text-gray-600">— visible to other roles with view permission</span></span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t border-gray-100 flex justify-end space-x-3 bg-white mt-auto">
                <button 
                  onClick={() => setIsAdding(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-none text-sm font-bold hover:bg-gray-50 shadow-sm"
                >
                  Cancel
                </button>
                <button className="px-6 py-2 bg-[#5542f6] text-white rounded-none text-sm font-bold hover:bg-[#4a3ae0] shadow-sm flex items-center">
                  <ImageIcon className="w-4 h-4 mr-2" /> Create Album
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden p-6">
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 rounded-none bg-[#f3f0ff] flex items-center justify-center mr-3">
                  <span className="text-[#5542f6] font-bold text-sm">💡</span>
                </div>
                <h3 className="text-sm font-bold text-gray-800">How albums work</h3>
              </div>
              
              <ul className="space-y-4">
                <li className="flex items-start text-[13px] text-gray-600 leading-relaxed border-b border-gray-100 pb-3">
                  <div className="w-1 h-1 rounded-none bg-[#5542f6] mt-2 mr-3 flex-shrink-0"></div>
                  <div><strong className="text-gray-700 font-bold">Two steps</strong> — creating the album gets you an empty shell; you upload the photos from the album page afterwards.</div>
                </li>
                <li className="flex items-start text-[13px] text-gray-600 leading-relaxed border-b border-gray-100 pb-3">
                  <div className="w-1 h-1 rounded-none bg-[#5542f6] mt-2 mr-3 flex-shrink-0"></div>
                  <div><strong className="text-gray-700 font-bold">Cover image</strong> — optional. Leave it blank and the first photo you upload becomes the cover.</div>
                </li>
                <li className="flex items-start text-[13px] text-gray-600 leading-relaxed">
                  <div className="w-1 h-1 rounded-none bg-[#5542f6] mt-2 mr-3 flex-shrink-0"></div>
                  <div><strong className="text-gray-700 font-bold">Draft first</strong> — turn Published off while you are still adding photos, then switch it on when the album is ready.</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <div className="flex items-center">
            <ImageIcon className="w-6 h-6 text-gray-800 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">Image Gallery</h1>
          </div>
          <p className="text-sm text-gray-500 mt-1">Photo albums for school events and activities</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center px-4 py-2 bg-[#5542f6] text-white rounded-none text-sm font-bold hover:bg-[#4a3ae0] shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" /> Create Album
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {ALBUMS.map((album) => (
          <div key={album.id} className="bg-white rounded-none border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col group relative">
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-[#28a745] px-2 py-1 rounded-none text-[10px] font-bold flex items-center z-10 shadow-sm">
              <Eye className="w-3 h-3 mr-1" /> Published
            </div>
            
            <div className="h-40 overflow-hidden bg-gray-100">
              <img 
                src={album.cover} 
                alt={album.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-sm font-bold text-gray-800 mb-1">{album.title}</h3>
              {album.desc && <p className="text-[11px] text-gray-500 mb-2 leading-tight">{album.desc}</p>}
              <div className="flex items-center text-[12px] text-gray-500 mt-auto pt-1">
                <ImageIcon className="w-3.5 h-3.5 mr-1" /> {album.count} images
              </div>
            </div>
            
            <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
              <span>{album.time}</span>
              <div className="flex items-center space-x-2">
                <button className="hover:text-[#5542f6]"><Eye className="w-4 h-4" /></button>
                <button className="hover:text-[#5542f6]"><Edit2 className="w-4 h-4" /></button>
                <button className="hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
