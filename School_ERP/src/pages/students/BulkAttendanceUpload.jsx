import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, Download, Info } from 'lucide-react';

const BulkAttendanceUpload = () => {
  const navigate = useNavigate();

  const downloadTemplate = () => {
    // Generate dummy template content
    const header = "Admission No,Date (YYYY-MM-DD),Attendance Status,Remarks\n";
    const data = "ADM1001,2026-08-22,Present,On time\nADM1002,2026-08-22,Absent,Sick leave\nADM1003,2026-08-22,Late,Bus delayed\nADM1004,2026-08-22,Half Day,Doctor appointment\n";
    
    // Create Blob and trigger download
    const blob = new Blob([header + data], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'attendance_template.csv'); // Also asked for excel, CSV opens in Excel
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 h-full flex flex-col bg-gray-50 overflow-y-auto">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Bulk Student Attendance Upload</h1>
        <p className="text-sm text-gray-500 mt-1">Import a completed attendance list from a CSV file</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        
        {/* Left Column: Upload Form */}
        <div className="flex-1 bg-white rounded-none shadow-sm border border-gray-200 flex flex-col">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2 font-bold text-[14px] text-gray-800">
            <UploadCloud className="w-4 h-4 text-[#5F52FF]" /> Upload Completed Attendance List
          </div>
          
          <div className="p-5 flex-1">
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Upload CSV File <span className="text-red-500">*</span>
            </label>
            <div className="flex">
              <input 
                type="text" 
                placeholder="Choose file" 
                readOnly
                className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
              />
              <button className="px-4 py-2 border-y border-r border-gray-300 rounded-r-md bg-gray-100 text-sm font-semibold text-gray-700 hover:bg-gray-200">
                Browse
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">Please ensure the file follows the required format shown alongside.</p>
          </div>
          
          <div className="px-5 py-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50 rounded-b-lg mt-auto">
            <button 
              onClick={() => navigate('/students/attendance')}
              className="px-4 py-2 border border-gray-300 rounded-none text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 shadow-sm"
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-[#5F52FF] text-white rounded-none text-sm font-semibold hover:bg-[#4E41E6] shadow-sm flex items-center gap-2">
              <UploadCloud className="w-4 h-4" /> Process Attendance Batch
            </button>
          </div>
        </div>

        {/* Right Column: Instructions & Template */}
        <div className="lg:w-[450px] bg-white rounded-none shadow-sm border border-gray-200 h-fit">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2 font-bold text-[14px] text-gray-800">
            <Info className="w-4 h-4 text-[#5F52FF]" /> Instructions & Template
          </div>
          <div className="p-5">
            <p className="text-[13px] text-gray-600 mb-5 leading-relaxed">
              The easiest way to bulk upload is the <strong>Template</strong> button on the main Attendance page — it gives you a pre-populated file with all active students for that Class/Section. Otherwise, download a blank template below.
            </p>
            <button 
              onClick={downloadTemplate}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-none text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm"
            >
              <Download className="w-4 h-4 text-gray-500" /> Download Blank Template
            </button>
          </div>
        </div>
        
      </div>

      {/* Field Requirements Table */}
      <div className="bg-white rounded-none shadow-sm border border-gray-200">
        <div className="px-5 py-4 border-b border-gray-100 font-bold text-[14px] text-gray-800">
          Field Requirements
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#F8F7FF] border-b border-gray-200 text-xs font-bold text-gray-600 uppercase">
                <th className="px-5 py-3 w-1/4">Field Name</th>
                <th className="px-5 py-3 w-1/6">Required</th>
                <th className="px-5 py-3">Format / Notes</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-gray-700">
              <tr className="border-b border-gray-100">
                <td className="px-5 py-3 font-medium">Admission No</td>
                <td className="px-5 py-3 text-red-500 font-semibold text-xs">Yes</td>
                <td className="px-5 py-3 text-gray-600">The exact Admission ID of the active student. (e.g. ADM1001)</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="px-5 py-3 font-medium">Date (YYYY-MM-DD)</td>
                <td className="px-5 py-3 text-red-500 font-semibold text-xs">Yes</td>
                <td className="px-5 py-3 text-gray-600">The date the attendance applies to. <strong>Format: YYYY-MM-DD</strong> (e.g. 2026-03-01)</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="px-5 py-3 font-medium">Attendance Status</td>
                <td className="px-5 py-3 text-red-500 font-semibold text-xs">Yes</td>
                <td className="px-5 py-3 text-gray-600">Must literally match one: <strong>Present, Absent, Late, Half Day</strong></td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium">Remarks</td>
                <td className="px-5 py-3 text-gray-400 font-semibold text-xs">No</td>
                <td className="px-5 py-3 text-gray-600">Optional comments</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default BulkAttendanceUpload;
