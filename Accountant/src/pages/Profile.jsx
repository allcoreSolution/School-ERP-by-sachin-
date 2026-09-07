import React, { useState } from 'react';
import { Fingerprint, Barcode, QrCode } from 'lucide-react';

const DetailRow = ({ label, value, valueClass = "text-[#666]", icon }) => (
  <div className="flex px-4 py-[14px] border-b border-[#f4f4f4] hover:bg-gray-50 transition-colors items-center text-[13px]">
    <div className="w-[30%] lg:w-[40%] font-semibold text-[#333] shrink-0">{label}</div>
    <div className={`w-[70%] lg:w-[60%] font-medium flex items-center justify-end lg:justify-start gap-1 ${valueClass}`}>
      {value}
      {icon}
    </div>
  </div>
);

const RightDetailRow = ({ label, value, valueClass = "text-[#666]" }) => (
  <div className="flex px-4 py-3 border-b border-[#f4f4f4] hover:bg-gray-50 transition-colors items-center text-[13px]">
    <div className="w-[35%] lg:w-[25%] font-bold text-[#333] shrink-0">{label}</div>
    <div className={`w-[65%] lg:w-[75%] font-medium text-[#666] ${valueClass}`}>{value}</div>
  </div>
);

const SectionHeader = ({ title }) => (
  <div className="px-4 pt-6 pb-2 text-[15px] font-bold text-[#666] border-b border-[#f4f4f4]">
    {title}
  </div>
);

const Profile = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  const tabs = ['Profile', 'Payroll', 'Leaves', 'Attendance', 'Documents', 'Career', 'Appraisals'];

  return (
    <div className="min-h-screen bg-[#ecf0f5] text-[#333] p-4 font-sans pb-16">
      
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4">
        
        {/* Left Column Profile Card */}
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200">
          <div className="p-6 pb-2 flex flex-col items-center">
            <div className="w-[100px] h-[100px] rounded-full p-1 border-2 border-gray-200 mb-3">
              <img 
                src="https://randomuser.me/api/portraits/men/32.jpg" 
                alt="Profile" 
                className="w-full h-full rounded-full object-cover" 
              />
            </div>
            <h2 className="text-[17px] font-semibold text-[#333] mb-1">Rajesh Kumar</h2>
            <p className="text-[13px] text-[#777] mb-4">Staff</p>
            
            <button className="w-full py-2 bg-[#5a52d7] hover:bg-[#4a42c0] text-white text-[14px] font-medium rounded-[3px] mb-4 transition-colors">
              Profile Settings
            </button>
          </div>
          
          <div className="border-t border-[#f4f4f4]">
            <DetailRow label="Staff ID" value="STF-003" valueClass="text-[#3c8dbc]" />
            <DetailRow 
              label="Biometric ID" 
              value="Not Assigned" 
              valueClass="text-[#17a2b8]"
              icon={<Fingerprint className="w-4 h-4 ml-1" />}
            />
            <DetailRow label="Role" value="Accountant" valueClass="text-[#3c8dbc]" />
            <DetailRow label="Designation" value="Staff" valueClass="text-[#3c8dbc]" />
            <DetailRow label="Department" value="Finance" valueClass="text-[#3c8dbc]" />
            <DetailRow label="Basic Salary" value="â‚¹35,000.00" valueClass="text-[#3c8dbc]" />
            <DetailRow label="Date Of Joining" value="15/06/2020" valueClass="text-[#3c8dbc]" />
          </div>

          <div className="px-4 py-6 border-t border-dashed border-gray-300 flex justify-between items-center">
            <div className="flex gap-2 items-center text-[#3c8dbc]">
              <Barcode className="w-4 h-4" />
              <span className="text-[14px] font-bold">BARCODE</span>
            </div>
            <div className="flex flex-col items-center">
              {/* Fake Barcode */}
              <div className="text-[14px] tracking-[-1.5px] font-mono text-center leading-none text-black h-8 flex items-end overflow-hidden">
                <span className="text-[34px] font-normal leading-[0.5] font-serif">||||||I|ll|l|I|</span>
              </div>
              <span className="text-[11px] text-black mt-1">STF-003</span>
            </div>
          </div>

          <div className="px-4 py-5 border-t border-gray-100 flex justify-between items-center mb-2">
            <div className="flex gap-2 items-center text-[#3c8dbc]">
              <QrCode className="w-4 h-4" />
              <span className="text-[14px] font-bold">QR CODE</span>
            </div>
            <div className="w-[64px] h-[64px] flex items-center justify-center">
              {/* Fake QR using a checkered pattern to look somewhat like a QR code */}
              <div className="w-full h-full bg-white border border-gray-800 p-1">
                <div className="w-full h-full bg-black flex flex-wrap gap-[2px] p-[2px]">
                   <div className="w-[14px] h-[14px] bg-white border-[3px] border-black p-[2px]"><div className="w-full h-full bg-black"></div></div>
                   <div className="w-[14px] h-[14px] bg-black"></div>
                   <div className="w-[14px] h-[14px] bg-white border-[3px] border-black p-[2px]"><div className="w-full h-full bg-black"></div></div>
                   <div className="w-[20px] h-[14px] bg-black"></div>
                   <div className="w-[14px] h-[14px] bg-white border-[3px] border-black p-[2px]"><div className="w-full h-full bg-black"></div></div>
                   <div className="flex-1 bg-black"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column Tabs and Details */}
        <div className="bg-white rounded-[3px] shadow-sm border border-gray-200">
          
          {/* Tabs */}
          <div className="border-b border-[#f4f4f4] p-[10px_10px_0_10px]">
            <ul className="flex flex-wrap text-[13px] font-medium m-0 p-0 list-none gap-1">
              {tabs.map((tab) => (
                <li key={tab}>
                  <button 
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-t-[3px] focus:outline-none transition-colors ${
                      activeTab === tab 
                        ? 'bg-[#5a52d7] text-white' 
                        : 'text-[#666] hover:bg-gray-100'
                    }`}
                  >
                    {tab}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Tab Content */}
          <div className="py-2">
            {activeTab === 'Profile' && (
              <>
                <RightDetailRow label="Phone" value="9876543212" />
                <RightDetailRow label="Email" value="rajesh.k@example.com" />
                <RightDetailRow label="Gender" value="Male" />
                <RightDetailRow label="Date of Birth" value="05/11/1982" />
                <RightDetailRow label="Marital Status" value="N/A" />
                <RightDetailRow label="Father Name" value="N/A" />
                <RightDetailRow label="Mother Name" value="N/A" />
                <RightDetailRow label="Qualification" value="N/A" />
                <RightDetailRow label="Work Experience" value="N/A" />
                <RightDetailRow label="Note" value="N/A" />

                <SectionHeader title="Employment Details" />
                <RightDetailRow label="Employee Code" value="N/A" />
                <RightDetailRow label="Employment Type" value="N/A" />
                <RightDetailRow label="Status" value={<span className="text-[#00a65a] font-bold text-[11px]">Active</span>} />
                <RightDetailRow label="Confirmation Date" value="N/A" />
                <RightDetailRow label="Reporting Manager" value="N/A" />

                <SectionHeader title="Emergency Contact" />
                <RightDetailRow label="Contact Name" value="N/A" />
                <RightDetailRow label="Contact Phone" value="N/A" />
                <RightDetailRow label="Blood Group" value="N/A" />

                <SectionHeader title="Address Details" />
                <RightDetailRow label="Current Address" value="Sector 6, Bhilai" />
                <RightDetailRow label="Permanent Address" value="Sector 6, Bhilai" />

                <SectionHeader title="Bank Account Details" />
                <RightDetailRow label="Account Title" value="N/A" />
                <RightDetailRow label="Bank Name" value="N/A" />
                <RightDetailRow label="Bank Branch Name" value="N/A" />
                <RightDetailRow label="Bank Account Number" value="N/A" />
                <RightDetailRow label="IFSC Code" value="N/A" />

                <SectionHeader title="Social Media Links" />
                <RightDetailRow label="Facebook" value="" />
                <RightDetailRow label="Twitter" value="" />
                <RightDetailRow label="LinkedIn" value="" />
                <RightDetailRow label="Instagram" value="" />
              </>
            )}

            {activeTab !== 'Profile' && (
              <div className="p-8 text-center text-gray-500 text-sm">
                No data available for {activeTab}.
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;
