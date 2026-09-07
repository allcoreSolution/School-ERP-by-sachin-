import React, { useState } from 'react';
import { Folder, FileImage, FileText, Eye, Download, X, FileSearch } from 'lucide-react';

const documents = [
  { 
    id: 1, 
    name: 'image', 
    type: 'PNG', 
    date: 'Uploaded on 13 Jul, 2026', 
    icon: FileImage,
    fakeImgUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  },
  { 
    id: 2, 
    name: 'Aadhar Card (Father)', 
    type: 'PDF', 
    date: 'Uploaded on 10 May, 2026', 
    icon: FileText,
  },
  { 
    id: 3, 
    name: 'Previous Year Marksheet', 
    type: 'PDF', 
    date: 'Uploaded on 02 Apr, 2026', 
    icon: FileText,
  }
];

export default function Documents() {
  const [previewDoc, setPreviewDoc] = useState(null);

  const handleDownload = (e) => {
    e.stopPropagation();
    alert("Download triggered.");
  };

  return (
    <div className="p-4 md:p-6 max-w-[1400px] mx-auto min-h-screen bg-[#f8f9fa] space-y-6">
      
      {/* Page Title */}
      <div className="flex items-center justify-between mb-2">
         <h1 className="text-[26px] font-bold text-gray-800 tracking-tight">Documents for Kabir Singh</h1>
      </div>
      
      {/* Main Card */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-none w-full max-w-[1100px] flex flex-col relative z-0">
         
         {/* Card Header */}
         <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200 bg-[#fdfdfd]">
            <Folder className="w-5 h-5 text-indigo-700 fill-indigo-700/10" strokeWidth={2.5}/>
            <h2 className="text-[17px] font-extrabold text-gray-900 tracking-tight">Uploaded Documents</h2>
         </div>

         {/* Document List */}
         <div className="flex flex-col bg-white">
            {documents.map((doc, index) => (
              <div 
                 key={doc.id} 
                 className={`flex flex-col sm:flex-row sm:items-center justify-between px-6 py-5 hover:bg-[#f8f9fa] transition-colors gap-4
                  ${index !== documents.length - 1 ? 'border-b border-gray-100' : ''}`}
              >
                 
                 {/* Left Info Area */}
                 <div className="flex items-center gap-4">
                    {/* Icon Box */}
                    <div className="w-[50px] h-[50px] flex-shrink-0 bg-indigo-50 flex items-center justify-center rounded-none border border-indigo-100 shadow-sm">
                       <doc.icon className="w-6 h-6 text-indigo-600" strokeWidth={2}/>
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-col">
                       <h3 className="font-bold text-[15px] text-gray-900 tracking-tight">{doc.name}</h3>
                       <span className="text-[12.5px] font-medium text-gray-500 tracking-wide mt-0.5">
                          {doc.type} &bull; {doc.date}
                       </span>
                    </div>
                 </div>

                 {/* Action Button */}
                 <button 
                    onClick={() => setPreviewDoc(doc)}
                    className="flex items-center gap-2.5 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[13.5px] rounded-none shadow-sm transition-colors focus:ring-2 focus:ring-indigo-100"
                 >
                    <Eye className="w-[18px] h-[18px]" strokeWidth={2.5}/> View / Download
                 </button>

              </div>
            ))}
            
            {/* Empty State Fallback (Not shown if array is full, but just for architectural completeness) */}
            {documents.length === 0 && (
               <div className="py-12 flex flex-col items-center justify-center text-center">
                  <Folder className="w-12 h-12 text-gray-300 mb-3" />
                  <p className="font-bold text-gray-500">No documents uploaded</p>
               </div>
            )}
         </div>

      </div>

      {/* OVERLAY MODAL FOR PREVIEW */}
      {previewDoc && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div 
               className="bg-white rounded-none shadow-2xl w-full max-w-4xl h-[85vh] sm:h-[80vh] flex flex-col border border-gray-300"
               onClick={(e) => e.stopPropagation()}
            >
               {/* Modal Header */}
               <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-gray-50/80">
                  <div className="flex items-center gap-3">
                     <previewDoc.icon className="w-5 h-5 text-indigo-600" />
                     <div className="flex flex-col">
                        <h3 className="font-extrabold text-[15px] text-gray-900 tracking-tight">{previewDoc.name}</h3>
                        <span className="text-[11.5px] font-bold text-gray-500 uppercase tracking-widest">{previewDoc.type} DOCUMENT</span>
                     </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                     <button onClick={handleDownload} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 transition-colors text-white text-[12.5px] font-bold rounded-none shadow-sm">
                        <Download className="w-4 h-4" strokeWidth={2.5} /> Download
                     </button>
                     <div className="w-[1px] h-6 bg-gray-300 mx-2"></div>
                     <button onClick={() => setPreviewDoc(null)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors rounded-none">
                        <X className="w-5 h-5" strokeWidth={2.5}/>
                     </button>
                  </div>
               </div>

               {/* Modal Viewer Body */}
               <div className="flex-1 overflow-hidden bg-gray-100 flex items-center justify-center p-6 relative">
                  
                  {previewDoc.type === 'PNG' || previewDoc.type === 'JPEG' ? (
                     // Image Viewer Simulator
                     <div className="relative max-w-full max-h-full p-2 bg-white shadow-lg border border-gray-200">
                        {previewDoc.fakeImgUrl ? (
                           <img src={previewDoc.fakeImgUrl} alt={previewDoc.name} className="max-h-[60vh] object-contain block" />
                        ) : (
                           <div className="w-[300px] h-[400px] bg-gray-50 flex flex-col items-center justify-center text-gray-400">
                              <FileImage className="w-12 h-12 mb-2 opacity-50" />
                              <span className="text-sm font-medium">Image Preview Unavailable</span>
                           </div>
                        )}
                     </div>
                  ) : (
                     // PDF Viewer Simulator
                     <div className="w-full h-full max-w-3xl bg-white shadow-xl border border-gray-300 flex flex-col">
                        <div className="h-10 bg-gray-800 flex items-center px-4 justify-between text-gray-300 text-[12px] font-medium shrink-0">
                           <span>{previewDoc.name}.pdf</span>
                           <span>Page 1 / 1</span>
                        </div>
                        <div className="flex-1 p-12 flex flex-col items-center bg-white overflow-y-auto">
                           {/* Fake PDF Data Content */}
                           <div className="w-full max-w-md border-b-2 border-gray-800 pb-4 mb-8 flexitems-center justify-center text-center">
                              <h2 className="text-2xl font-black text-gray-800 tracking-tight uppercase">{previewDoc.name}</h2>
                           </div>
                           <div className="w-full space-y-4 text-gray-600">
                              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                              <div className="h-3 bg-gray-200 rounded w-full"></div>
                              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                              <br/>
                              <div className="h-3 bg-gray-200 rounded w-full"></div>
                              <div className="h-3 bg-gray-200 rounded w-full"></div>
                              <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                           </div>
                           
                           <div className="mt-16 p-6 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center opacity-70 w-full max-w-xs mx-auto">
                              <FileSearch className="w-10 h-10 text-indigo-300 mb-2" />
                              <span className="text-[13px] font-bold text-gray-400">SECURE PREVIEW RENDERER</span>
                           </div>
                        </div>
                     </div>
                  )}

               </div>
            </div>
         </div>
      )}

    </div>
  );
}
