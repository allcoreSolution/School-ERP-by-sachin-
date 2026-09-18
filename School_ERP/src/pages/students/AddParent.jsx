import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Lightbulb } from 'lucide-react';

const AddParent = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 h-full flex flex-col bg-gray-50 overflow-y-auto">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add Parent / Guardian</h1>
        <p className="text-sm text-gray-500 mt-1">Create a parent login account. You can link children to it afterwards.</p>
      </div>

      {/* Main Layout: 2 Columns */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Column: Form */}
        <div className="flex-1 bg-white border border-gray-200 rounded-none shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100 font-bold text-gray-800 text-[15px] flex items-center gap-2">
            <Users className="w-4 h-4 text-[#5F52FF]" /> New Parent Account
          </div>
          
          <div className="p-5 flex flex-col gap-5">
            {/* Field: Name */}
            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-1.5">
                Parent / Guardian Name <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                placeholder="e.g. Rajesh Singh" 
                className="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#5F52FF] focus:border-[#5F52FF]"
              />
            </div>

            {/* Field: Username / Email */}
            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-1.5">
                Login Username / Email <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                placeholder="e.g. parent@example.com or a mobile number" 
                className="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#5F52FF] focus:border-[#5F52FF]"
              />
              <p className="text-xs text-gray-500 mt-1.5">This is what the parent uses to log in. It must be unique in your school.</p>
            </div>

            {/* Field: Mobile Number */}
            <div>
              <label className="block text-[13px] font-bold text-gray-700 mb-1.5">
                Mobile Number
              </label>
              <input 
                type="text" 
                placeholder="Used to set the initial password" 
                className="w-full border border-gray-300 rounded-none px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#5F52FF] focus:border-[#5F52FF]"
              />
              <p className="text-xs text-gray-500 mt-1.5">If given, the initial password is the digits of this number; otherwise a random one is generated.</p>
            </div>
          </div>
          
          {/* Footer Actions */}
          <div className="px-5 py-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50 rounded-b-lg">
            <button 
              onClick={() => navigate('/students/parents')}
              className="px-4 py-2 border border-gray-300 rounded-none text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 shadow-sm"
            >
              Cancel
            </button>
            <button 
              className="px-4 py-2 bg-[#5F52FF] text-white rounded-none text-sm font-semibold hover:bg-[#4E41E6] shadow-sm flex items-center gap-2"
            >
              <Users className="w-4 h-4" /> Create Parent
            </button>
          </div>
        </div>

        {/* Right Column: Info Card */}
        <div className="lg:w-[400px]">
          <div className="bg-white border border-gray-200 rounded-none shadow-sm">
            <div className="px-5 py-4 border-b border-gray-100 font-bold text-gray-800 text-[15px] flex items-center gap-2">
              <div className="w-6 h-6 rounded-none bg-[#F8F7FF] flex items-center justify-center">
                <Lightbulb className="w-4 h-4 text-[#5F52FF]" />
              </div>
              About parent accounts
            </div>
            <div className="p-5">
              <ul className="space-y-4 text-[13px] text-gray-600 list-disc pl-4">
                <li className="pl-1">
                  A parent account is a <strong>login</strong> a family uses to see their children.
                </li>
                <li className="pl-1">
                  Children link to it by the <strong>guardian email</strong> on the student record.
                </li>
                <li className="pl-1">
                  Create the parent here, then pick this parent while <strong>admitting a student</strong> to link a child.
                </li>
                <li className="pl-1">
                  The generated password is shown <strong>once</strong> after creation — copy it then.
                </li>
              </ul>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default AddParent;
