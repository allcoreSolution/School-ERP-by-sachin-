import React, { useState, useEffect } from 'react';
import { 
  Calendar, Plus, List, Grid, 
  FileText, FileSpreadsheet, File, Printer, Columns, 
  Search, Edit, Trash2, ChevronLeft, ChevronRight,
  Info
} from 'lucide-react';
import { eventService } from '../api/eventService';

export default function EventsHolidays() {
  const [isAdding, setIsAdding] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newEvent, setNewEvent] = useState({ title: '', type: 'Event', startDate: '', endDate: '', audience: 'All (Entire School)', description: '' });

  useEffect(() => { fetchEvents(); }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await eventService.getEvents();
      const data = (res.data || []).map(e => ({
        id: e._id,
        title: e.title,
        type: e.type || 'Event',
        audience: e.audience || 'Entire School',
        startDate: e.startDate ? new Date(e.startDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '-',
        endDate: e.endDate ? new Date(e.endDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'
      }));
      setEvents(data);
    } catch (err) {
      console.error(err);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async () => {
    if (!newEvent.title) { alert('Title is required!'); return; }
    try {
      await eventService.createEvent(newEvent);
      alert('Event created!');
      setIsAdding(false);
      fetchEvents();
    } catch (err) {
      alert('Error: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDeleteEvent = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    setEvents(events.filter(e => e.id !== id));
  };

  if (isAdding) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Add New Event or Holiday</h1>
          <p className="text-sm text-gray-500 mt-1">Adds an entry to the school calendar in the parent and staff apps</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex items-center">
                <Calendar className="w-5 h-5 text-[#5542f6] mr-2" />
                <h2 className="text-base font-bold text-gray-800">Event Details</h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[13px] font-bold text-gray-700 mb-1">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g., Annual Sports Day"
                      className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none focus:border-[#5542f6]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-gray-700 mb-1">
                      Type <span className="text-red-500">*</span>
                    </label>
                    <select className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none focus:border-[#5542f6] bg-white">
                      <option>Event</option>
                      <option>Holiday</option>
                    </select>
                    <div className="mt-1 flex items-start text-[11px] text-gray-500">
                      <FileText className="w-3.5 h-3.5 mr-1 mt-0.5 flex-shrink-0" />
                      <span>A normal working day for staff — no payroll effect.</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[13px] font-bold text-gray-700 mb-1">
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input 
                        type="text" 
                        defaultValue="23-08-2026"
                        className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none focus:border-[#5542f6]"
                      />
                      <Calendar className="w-4 h-4 text-gray-500 absolute right-3 top-2.5 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-gray-700 mb-1">
                      End Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input 
                        type="text" 
                        defaultValue="23-08-2026"
                        className="w-full border border-gray-300 rounded-none p-2 text-sm outline-none focus:border-[#5542f6]"
                      />
                      <Calendar className="w-4 h-4 text-gray-500 absolute right-3 top-2.5 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">
                    Audience <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full md:w-1/2 border border-gray-300 rounded-none p-2 text-sm outline-none focus:border-[#5542f6] bg-white">
                    <option>All (Entire School)</option>
                    <option>All Parents</option>
                    <option>All Staff</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea 
                    placeholder="Optional details shown with the calendar entry"
                    className="w-full h-[100px] border border-gray-300 rounded-none p-3 text-sm outline-none focus:border-[#5542f6] resize-none"
                  ></textarea>
                </div>
              </div>
              
              <div className="p-4 border-t border-gray-100 flex justify-end space-x-3 bg-white">
                <button 
                  onClick={() => setIsAdding(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-none text-sm font-bold hover:bg-gray-50 shadow-sm"
                >
                  Cancel
                </button>
                <button onClick={handleCreateEvent} className="px-6 py-2 bg-[#5542f6] text-white rounded-none text-sm font-bold hover:bg-[#4a3ae0] shadow-sm">
                  Create Event
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
                <h3 className="text-sm font-bold text-gray-800">Events vs holidays</h3>
              </div>
              
              <ul className="space-y-4">
                <li className="flex items-start text-[13px] text-gray-600 leading-relaxed">
                  <div className="w-1 h-1 rounded-none bg-[#5542f6] mt-2 mr-3 flex-shrink-0"></div>
                  <div><strong className="text-gray-700 font-bold">Event</strong> — anything on the calendar: sports day, PTM, a trip. Attendance carries on as normal.</div>
                </li>
                <li className="border-t border-gray-100 pt-3 flex items-start text-[13px] text-gray-600 leading-relaxed">
                  <div className="w-1 h-1 rounded-none bg-[#5542f6] mt-2 mr-3 flex-shrink-0"></div>
                  <div><strong className="text-gray-700 font-bold">Holiday</strong> — a non-working day. <strong className="text-gray-700 font-bold">Applies To</strong> decides whether students, staff, or both get the day off.</div>
                </li>
                <li className="border-t border-gray-100 pt-3 flex items-start text-[13px] text-gray-600 leading-relaxed">
                  <div className="w-1 h-1 rounded-none bg-[#5542f6] mt-2 mr-3 flex-shrink-0"></div>
                  <div><strong className="text-gray-700 font-bold">Single day</strong> — set the same start and end date.</div>
                </li>
                <li className="border-t border-gray-100 pt-3 flex items-start text-[13px] text-gray-600 leading-relaxed">
                  <div className="w-1 h-1 rounded-none bg-[#5542f6] mt-2 mr-3 flex-shrink-0"></div>
                  <div><strong className="text-gray-700 font-bold">Audience</strong> — pick a class when only that class is affected; everyone else keeps a clear calendar.</div>
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
          <h1 className="text-2xl font-bold text-gray-800">Events & Holidays</h1>
          <p className="text-sm text-gray-500 mt-1">School calendar entries shown to parents and staff</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center px-4 py-2 bg-[#5542f6] text-white rounded-none text-sm font-bold hover:bg-[#4a3ae0] shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" /> Add New Event/Holiday
        </button>
      </div>

      <div className="bg-white rounded-none border border-gray-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 text-[#5542f6] mr-2" />
            <h2 className="text-sm font-bold text-gray-800">Event List</h2>
          </div>
          <div className="flex border border-gray-300 rounded-none overflow-hidden">
            <button className="p-1.5 bg-[#f3f0ff] text-[#5542f6] border-r border-gray-300"><List className="w-4 h-4" /></button>
            <button className="p-1.5 bg-white text-gray-500 hover:bg-gray-50"><Grid className="w-4 h-4" /></button>
          </div>
        </div>
        
        <div className="p-4 border-b border-gray-100 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">Show</span>
              <select className="border border-gray-300 rounded-none px-2 py-1.5 text-sm outline-none focus:border-[#5542f6] bg-white">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
            </div>
            
            <div className="flex space-x-1 ml-2">
              <button className="px-3 py-1.5 border border-gray-300 text-gray-600 rounded-none text-sm hover:bg-gray-50 flex items-center"><FileText className="w-3.5 h-3.5" /></button>
              <button className="px-3 py-1.5 border border-gray-300 text-gray-600 rounded-none text-sm hover:bg-gray-50">CSV</button>
              <button className="px-3 py-1.5 border border-gray-300 text-gray-600 rounded-none text-sm hover:bg-gray-50">Excel</button>
              <button className="px-3 py-1.5 border border-gray-300 text-gray-600 rounded-none text-sm hover:bg-gray-50">PDF</button>
              <button className="px-3 py-1.5 border border-gray-300 text-gray-600 rounded-none text-sm hover:bg-gray-50"><Printer className="w-3.5 h-3.5" /></button>
              <button className="px-3 py-1.5 border border-gray-300 text-gray-600 rounded-none text-sm hover:bg-gray-50 flex items-center ml-1"><Columns className="w-3.5 h-3.5 mr-1.5" /> Columns <ChevronRight className="w-3 h-3 ml-1 rotate-90" /></button>
            </div>
          </div>
          
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search events..." 
              className="pl-3 pr-8 py-1.5 border border-gray-300 rounded-none text-sm outline-none focus:border-[#5542f6] w-[250px]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f8f9fe] border-b border-gray-200">
                <th className="p-3 text-[12px] font-bold text-[#5542f6] w-12 text-center">#</th>
                <th className="p-3 text-[12px] font-bold text-[#5542f6]">TITLE</th>
                <th className="p-3 text-[12px] font-bold text-[#5542f6]">TYPE</th>
                <th className="p-3 text-[12px] font-bold text-[#5542f6]">AUDIENCE</th>
                <th className="p-3 text-[12px] font-bold text-[#5542f6]">START DATE</th>
                <th className="p-3 text-[12px] font-bold text-[#5542f6]">END DATE</th>
                <th className="p-3 text-[12px] font-bold text-[#5542f6]">SOCIAL</th>
                <th className="p-3 text-[12px] font-bold text-[#5542f6] text-center w-24">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-gray-700">
              {loading ? (
                <tr><td colSpan="8" className="p-6 text-center text-gray-500 font-semibold">Loading events from database...</td></tr>
              ) : events.length === 0 ? (
                <tr><td colSpan="8" className="p-6 text-center text-gray-400">No events found. Add one above!</td></tr>
              ) : events.map((event, i) => (
                <tr key={event.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                  <td className="p-4 text-center text-gray-500">{i + 1}</td>
                  <td className="p-4 font-medium text-gray-800">{event.title}</td>
                  <td className="p-4">
                    {event.type === 'Event' ? (
                      <span className="px-2 py-0.5 rounded-none text-[11px] font-bold bg-[#e2f3f9] text-[#17a2b8]">
                        {event.type}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-none text-[11px] font-bold bg-[#ffebee] text-[#dc3545]">
                        {event.type}
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-none text-[11px] font-bold bg-[#f3f0ff] text-[#5542f6]">
                      {event.audience}
                    </span>
                  </td>
                  <td className="p-4 text-gray-800">{event.startDate}</td>
                  <td className="p-4 text-gray-800">{event.endDate}</td>
                  <td className="p-4"></td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button className="text-gray-400 hover:text-[#5542f6]"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDeleteEvent(event.id)} className="text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
