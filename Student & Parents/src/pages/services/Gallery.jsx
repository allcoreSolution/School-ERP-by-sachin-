import React from 'react';
import { Camera, Calendar, ArrowRight, Image as ImageIcon } from 'lucide-react';

const albums = [
  { 
    id: 1, 
    title: 'Demo: Independence Day celebration', 
    desc: 'Highlights from our Independence Day programme.', 
    date: 'Aug 01, 2026', 
    count: 0, 
    image: null,
    fallbackBg: 'bg-[#6366f1]' 
  },
  { 
    id: 2, 
    title: 'Lab', 
    desc: '', 
    date: 'Jul 16, 2026', 
    count: 4, 
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop' 
  },
  { 
    id: 3, 
    title: 'Sports', 
    desc: '', 
    date: 'Jul 16, 2026', 
    count: 4, 
    image: 'https://images.unsplash.com/photo-1526676537331-7af2bcf2b774?w=600&h=400&fit=crop' 
  },
  { 
    id: 4, 
    title: 'Auditorium Event', 
    desc: '', 
    date: 'Jun 22, 2026', 
    count: 4, 
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop' 
  },
  { 
    id: 5, 
    title: 'Science Fair', 
    desc: '', 
    date: 'May 10, 2026', 
    count: 2, 
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop' 
  },
  { 
    id: 6, 
    title: 'Campus Tour', 
    desc: '', 
    date: 'Apr 05, 2026', 
    count: 8, 
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop' 
  },
];

export default function Gallery() {
  return (
    <div className="p-4 md:p-6 max-w-[1400px] mx-auto min-h-screen space-y-6 bg-[#f8f9fa]">
      
      {/* Page Title */}
      <div className="flex items-center justify-between mb-2">
         <h1 className="text-[26px] font-bold text-gray-900 tracking-tight">Image Gallery</h1>
      </div>
      
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {albums.map((album) => (
            <div 
               key={album.id} 
               className="bg-white border border-gray-200 rounded-none shadow-sm flex flex-col hover:shadow-md transition-shadow cursor-pointer group"
            >
               {/* Thumbnail Block */}
               <div className={`relative h-[220px] w-full border-b border-gray-100 flex-shrink-0 ${album.fallbackBg || 'bg-gray-100'}`}>
                  
                  {album.image ? (
                     <img 
                        src={album.image} 
                        alt={album.title} 
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 origin-center"
                     />
                  ) : (
                     <div className="w-full h-full flex flex-col items-center justify-center text-white/50">
                        <ImageIcon className="w-16 h-16" strokeWidth={1}/>
                     </div>
                  )}

                  {/* Photo Count Badge */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur shadow-sm px-2.5 py-1 text-gray-800 flex items-center gap-1.5 rounded-none border border-white">
                     <Camera className="w-3.5 h-3.5" strokeWidth={2.5}/>
                     <span className="text-[12px] font-extrabold">{album.count}</span>
                  </div>
                  
               </div>

               {/* Info Block */}
               <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-extrabold text-[15px] text-gray-900 leading-snug mb-1.5 tracking-tight group-hover:text-indigo-600 transition-colors">
                     {album.title}
                  </h3>
                  
                  {album.desc && (
                     <p className="text-[12.5px] text-gray-500 font-medium leading-relaxed mb-4">
                        {album.desc}
                     </p>
                  )}
                  
                  {/* Action / Date Block */}
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50/50">
                     <div className="flex items-center gap-1.5 text-gray-400">
                        <Calendar className="w-3.5 h-3.5" strokeWidth={2.5} />
                        <span className="text-[11.5px] font-bold tracking-wide">{album.date}</span>
                     </div>
                     <span className="flex items-center gap-1 text-[12.5px] font-bold text-indigo-600">
                        View Gallery <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                     </span>
                  </div>
               </div>

            </div>
         ))}
      </div>

    </div>
  );
}
