import React from 'react';
import { 
  Settings2, AlertTriangle, Calendar, Plus, Image as ImageIcon, Info
} from 'lucide-react';

const FESTIVALS = [
  { id: 1, name: 'Onam', date: '26 Aug 2026', when: 'in 3 days', region: 'KL' },
  { id: 2, name: 'Raksha Bandhan', date: '28 Aug 2026', when: 'in 5 days', region: 'ALL' },
  { id: 3, name: 'Janmashtami', date: '04 Sep 2026', when: 'in 12 days', region: 'ALL' },
  { id: 4, name: "Teachers' Day", date: '05 Sep 2026', when: 'in 13 days', region: 'ALL' },
  { id: 5, name: 'Ganesh Chaturthi', date: '14 Sep 2026', when: 'in 22 days', region: 'ALL' },
  { id: 6, name: 'Gandhi Jayanti', date: '02 Oct 2026', when: 'in 40 days', region: 'ALL' },
  { id: 7, name: 'Navratri (start)', date: '11 Oct 2026', when: 'in 49 days', region: 'ALL' },
  { id: 8, name: 'Dussehra', date: '20 Oct 2026', when: 'in 58 days', region: 'ALL' },
  { id: 9, name: 'Karva Chauth', date: '29 Oct 2026', when: 'in 67 days', region: 'ALL' },
  { id: 10, name: 'Diwali', date: '08 Nov 2026', when: 'in 77 days', region: 'ALL' },
];

export default function FestivalGreetings() {
  return (
    <div className="bg-[#f4f7fc] min-h-[calc(100vh-64px)] font-sans p-6 pb-20">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-[22px] font-semibold text-gray-800 leading-tight">Festival Greetings</h1>
          <p className="text-gray-500 text-[13px] mt-0.5">Upcoming festivals and your own special days</p>
        </div>
        
        <button className="flex items-center px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-none text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
          <Settings2 className="w-4 h-4 mr-2" />
          Auto-send Settings
        </button>
      </div>

      {/* Alert Banner */}
      <div className="bg-[#fff9e6] border border-[#ffecb3] text-[#b38600] rounded-none p-3 mb-6 flex items-start shadow-sm">
        <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5 text-[#d9a300]" />
        <p className="text-[13px]">
          Festival auto-send is off. Turn it on and pick a festival design in <strong className="font-semibold text-[#b38600]">Auto-send Settings</strong> to start greeting.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column - Upcoming Festivals */}
        <div className="lg:col-span-8 bg-white rounded-none border border-gray-200 shadow-sm flex flex-col">
          <div className="p-4 border-b border-gray-100 flex items-center bg-white rounded-t-lg">
            <Calendar className="w-4 h-4 text-[#5542f6] mr-2" />
            <h2 className="text-sm font-bold text-gray-800">Upcoming festivals</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-indigo-50/50 border-b border-gray-200">
                  <th className="p-4 text-[11px] font-bold text-[#5542f6] uppercase">FESTIVAL</th>
                  <th className="p-4 text-[11px] font-bold text-[#5542f6] uppercase w-32">DATE</th>
                  <th className="p-4 text-[11px] font-bold text-[#5542f6] uppercase w-32">WHEN</th>
                  <th className="p-4 text-[11px] font-bold text-[#5542f6] uppercase w-24">REGION</th>
                  <th className="p-4 text-[11px] font-bold text-[#5542f6] uppercase w-24 text-right">CARD</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-gray-600">
                {FESTIVALS.map((fest) => (
                  <tr key={fest.id} className="border-b border-gray-100 hover:bg-gray-50/30">
                    <td className="p-4 text-gray-800">{fest.name}</td>
                    <td className="p-4">{fest.date}</td>
                    <td className="p-4">{fest.when}</td>
                    <td className="p-4">{fest.region}</td>
                    <td className="p-4 text-right">
                      <div className="inline-flex rounded-none shadow-sm" role="group">
                        <button type="button" className="inline-flex items-center px-3 py-1.5 text-[12px] font-medium text-gray-700 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 focus:z-10">
                          <ImageIcon className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
                          Card
                        </button>
                        <button type="button" className="inline-flex items-center px-2 py-1.5 text-sm font-medium text-gray-700 bg-white border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-50 focus:z-10">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column - Add your own day */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          
          <div className="bg-white rounded-none border border-gray-200 shadow-sm flex flex-col">
            <div className="p-4 border-b border-gray-100 flex items-center bg-white rounded-t-lg">
              <Plus className="w-4 h-4 text-[#5542f6] mr-2" />
              <h2 className="text-sm font-bold text-gray-800">Add your own day</h2>
            </div>
            
            <div className="p-5">
              <div className="mb-4">
                <label className="block text-[12px] font-bold text-gray-700 mb-1">Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Founder's Day" 
                  className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none focus:border-[#5542f6]" 
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-[12px] font-bold text-gray-700 mb-1">Date</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="dd-mm-yyyy" 
                    className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none focus:border-[#5542f6]" 
                  />
                  <Calendar className="w-4 h-4 text-gray-400 absolute right-2.5 top-2.5 pointer-events-none" />
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-100 flex justify-end">
              <button className="flex items-center px-6 py-2 bg-[#5542f6] text-white rounded-none text-sm font-bold hover:bg-[#4a3ae0] shadow-sm">
                <Plus className="w-4 h-4 mr-1" /> Add
              </button>
            </div>
          </div>

          <div className="bg-indigo-50/80 border border-indigo-100 rounded-none p-3 flex items-start sm:items-center text-[#5542f6]">
            <Info className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5 sm:mt-0" />
            <p className="text-[12px] font-medium">
              Festival dates are seeded and best-effort — please verify them for your region.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
