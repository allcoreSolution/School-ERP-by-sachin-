import React, { useState } from 'react';
import { ArrowLeft, Video, AlertTriangle, ExternalLink, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LiveClassSettings() {
  const navigate = useNavigate();

  // State for toggles and default provider
  const [providers, setProviders] = useState({
    jitsi: { enabled: false },
    external: { enabled: true },
    zoom: { enabled: false }
  });

  const [defaultProvider, setDefaultProvider] = useState('external');
  const [saveStatus, setSaveStatus] = useState({ jitsi: false, external: false, zoom: false });

  const toggleProvider = (key) => {
    setProviders(prev => ({
      ...prev,
      [key]: { ...prev[key], enabled: !prev[key].enabled }
    }));
  };

  const handleSetDefault = (key) => {
    setDefaultProvider(key);
  };

  const handleSave = (key) => {
    setSaveStatus(prev => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setSaveStatus(prev => ({ ...prev, [key]: false }));
    }, 2000);
  };

  const renderToggle = (key) => {
    const isEnabled = providers[key].enabled;
    return (
      <div className="flex items-center cursor-pointer" onClick={() => toggleProvider(key)}>
        <div className={`w-10 h-5 rounded-none relative mr-2 transition-colors duration-200 ${isEnabled ? 'bg-[#5542f6]' : 'bg-gray-200'}`}>
          <div className={`w-4 h-4 bg-white rounded-none absolute top-0.5 shadow-sm transition-all duration-200 ${isEnabled ? 'left-[22px]' : 'left-0.5'}`}></div>
        </div>
        <span className={`text-xs font-semibold uppercase ${isEnabled ? 'text-[#5542f6]' : 'text-gray-500'}`}>
          {isEnabled ? 'Enabled' : 'Disabled'}
        </span>
      </div>
    );
  };

  const renderSaveBtn = (key) => {
    const isSaving = saveStatus[key];
    return (
      <button
        onClick={() => handleSave(key)}
        className={`font-medium px-6 py-2 rounded-none text-sm transition-colors shadow-sm flex items-center ${isSaving ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-[#5542f6] hover:bg-indigo-700 text-white'}`}
      >
        {isSaving ? <><Check className="w-4 h-4 mr-1.5" /> Saved!</> : 'Save'}
      </button>
    );
  };

  return (
    <div className="p-6 bg-white min-h-screen font-sans">
      {/* Header */}
      <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
        <div className="flex items-center">
          <div className="mr-3 text-gray-700">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Live Class Providers</h1>
            <p className="text-gray-500 text-xs mt-1">Pick who hosts your live classes and store their credentials</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/live-classes/manage')}
          className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-none text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2 text-gray-500" />
          Back to Live Classes
        </button>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-600 max-w-3xl">
          Choose how your live classes are hosted. Enable one or more providers, set a default,
          and provide any credentials the provider needs. Teachers pick from your enabled
          providers when scheduling a class.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

        {/* Jitsi Meet Card */}
        <div className="border border-gray-200 rounded-none overflow-hidden shadow-sm flex flex-col bg-white">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
            <div className="flex items-center">
              <Video className="w-5 h-5 text-[#5542f6] mr-2" />
              <h3 className="font-bold text-gray-800">Jitsi Meet</h3>
              {defaultProvider === 'jitsi' && (
                <span className="ml-2 text-[9px] bg-indigo-50 text-[#5542f6] px-1.5 py-0.5 rounded-none border border-indigo-100 uppercase font-semibold">Default</span>
              )}
            </div>
            {renderToggle('jitsi')}
          </div>

          <div className="p-5 flex-grow space-y-4">
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-semibold rounded-none border border-gray-200 flex items-center">
                <span className="mr-1">🔊</span> Embedded
              </span>
              <span className="px-2 py-1 bg-green-50 text-green-600 text-[10px] font-semibold rounded-none border border-green-100 flex items-center">
                <span className="mr-1">🧑‍🤝‍🧑</span> Auto attendance (events)
              </span>
              <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-semibold rounded-none border border-blue-100 flex items-center">
                <span className="mr-1">⏺️</span> Recordings manual
              </span>
            </div>

            <div className="bg-[#fff9e6] border border-[#f5e6b3] rounded-none p-3 flex items-start">
              <AlertTriangle className="w-4 h-4 text-[#b0703c] mt-0.5 mr-2 shrink-0" />
              <p className="text-[11px] text-[#8c5717]">
                <strong className="text-[#a64010]">Using the shared public Jitsi server (sign-in required, limited).</strong> Add a domain & JaaS keys below for reliable rooms.
              </p>
            </div>

            <ul className="list-disc pl-5 text-[11px] text-gray-600 space-y-2 pt-2 border-t border-gray-100">
              <li>Leave blank to use the shared public server (limited — sign in required).</li>
              <li>For reliable rooms, run a self-hosted Jitsi or use 8x8 JaaS and fill in the domain, App ID and secret.</li>
            </ul>

            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1.5">Server Domain</label>
                <input type="text" className="w-full border border-gray-300 rounded-none p-2 focus:border-[#5542f6] outline-none text-sm transition-colors" />
                <p className="text-[10px] text-gray-400 mt-1">e.g. meet.jit.si or your self-hosted / 8x8 JaaS domain.</p>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1.5">App ID (JaaS)</label>
                <input type="text" className="w-full border border-gray-300 rounded-none p-2 focus:border-[#5542f6] outline-none text-sm transition-colors" />
                <p className="text-[10px] text-gray-400 mt-1">Only for 8x8 JaaS / JWT-secured servers.</p>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1.5">App Secret</label>
                <input type="text" className="w-full border border-gray-300 rounded-none p-2 focus:border-[#5542f6] outline-none text-sm transition-colors" />
                <p className="text-[10px] text-gray-400 mt-1">JWT signing secret for JaaS / secured servers.</p>
              </div>
            </div>

            <a href="#" className="text-[11px] text-[#ea580c] hover:underline flex items-center font-medium pt-2">
              <ExternalLink className="w-3.5 h-3.5 mr-1.5" /> Provider documentation
            </a>
          </div>

          <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50/50">
            <label className="flex items-center text-xs text-gray-600 cursor-pointer hover:text-gray-800 transition-colors">
              <input
                type="checkbox"
                checked={defaultProvider === 'jitsi'}
                onChange={() => handleSetDefault('jitsi')}
                className="mr-2 rounded-none text-[#5542f6] focus:ring-[#5542f6] cursor-pointer"
              />
              Set as default
            </label>
            {renderSaveBtn('jitsi')}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6 flex flex-col">

          {/* External Link Card */}
          <div className="border border-gray-200 rounded-none overflow-hidden shadow-sm flex flex-col bg-white">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
              <div className="flex items-center">
                <Video className="w-5 h-5 text-[#5542f6] mr-2" />
                <h3 className="font-bold text-gray-800">External Link (Zoom / Meet / Teams)</h3>
                {defaultProvider === 'external' && (
                  <span className="ml-2 text-[9px] bg-indigo-50 text-[#5542f6] px-1.5 py-0.5 rounded-none border border-indigo-100 uppercase font-semibold">Default</span>
                )}
              </div>
              {renderToggle('external')}
            </div>

            <div className="p-5 flex-grow space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-semibold rounded-none border border-gray-200 flex items-center">
                  <span className="mr-1">↗️</span> Redirect
                </span>
                <span className="px-2 py-1 bg-orange-50 text-orange-600 text-[10px] font-semibold rounded-none border border-orange-100 flex items-center">
                  <span className="mr-1">🧑‍🤝‍🧑</span> Manual attendance
                </span>
                <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-semibold rounded-none border border-blue-100 flex items-center">
                  <span className="mr-1">⏺️</span> Recordings manual
                </span>
              </div>

              <ul className="list-disc pl-5 text-[11px] text-gray-600 space-y-3 pt-2 border-t border-gray-100">
                <li>When scheduling a class, paste the full meeting URL from Zoom, Google Meet or Teams.</li>
                <li>Attendance for external links is recorded manually (teacher roll or student self-mark).</li>
              </ul>

              <div className="pt-2">
                <span className="inline-flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-none border border-emerald-100">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-none mr-1.5"></span> No credentials required
                </span>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50/50 mt-14">
              <label className="flex items-center text-xs text-gray-600 cursor-pointer hover:text-gray-800 transition-colors">
                <input
                  type="checkbox"
                  checked={defaultProvider === 'external'}
                  onChange={() => handleSetDefault('external')}
                  className="mr-2 rounded-none text-[#5542f6] focus:ring-[#5542f6] cursor-pointer"
                />
                Set as default
              </label>
              {renderSaveBtn('external')}
            </div>
          </div>

          {/* Zoom Card */}
          <div className="border border-gray-200 rounded-none overflow-hidden shadow-sm flex flex-col bg-white">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
              <div className="flex items-center">
                <Video className="w-5 h-5 text-[#5542f6] mr-2" />
                <h3 className="font-bold text-gray-800">Zoom</h3>
                {defaultProvider === 'zoom' && (
                  <span className="ml-2 text-[9px] bg-indigo-50 text-[#5542f6] px-1.5 py-0.5 rounded-none border border-indigo-100 uppercase font-semibold">Default</span>
                )}
              </div>
              {renderToggle('zoom')}
            </div>

            <div className="p-5 flex-grow space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-semibold rounded-none border border-gray-200 flex items-center">
                  <span className="mr-1">↗️</span> Redirect
                </span>
                <span className="px-2 py-1 bg-green-50 text-green-600 text-[10px] font-semibold rounded-none border border-green-100 flex items-center">
                  <span className="mr-1">🧑‍🤝‍🧑</span> Auto attendance (webhook)
                </span>
                <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-semibold rounded-none border border-blue-100 flex items-center">
                  <span className="mr-1">⏺️</span> Recordings api
                </span>
              </div>

              <ul className="list-disc pl-5 text-[11px] text-gray-600 space-y-3 pt-2 border-t border-gray-100">
                <li>In the Zoom Marketplace, create a Server-to-Server OAuth app.</li>
                <li>Grant the meeting:write and meeting:read scopes, then activate the app.</li>
                <li>Copy the Account ID, Client ID and Client Secret into the fields below.</li>
              </ul>

              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1.5">Account ID <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full border border-gray-300 rounded-none p-2 focus:border-[#5542f6] outline-none text-sm transition-colors" />
                  <p className="text-[10px] text-gray-400 mt-1">Server-to-Server OAuth app — App Credentials.</p>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1.5">Client ID <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full border border-gray-300 rounded-none p-2 focus:border-[#5542f6] outline-none text-sm transition-colors" />
                  <p className="text-[10px] text-gray-400 mt-1">Server-to-Server OAuth app — App Credentials.</p>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1.5">Client Secret <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full border border-gray-300 rounded-none p-2 focus:border-[#5542f6] outline-none text-sm transition-colors" />
                  <p className="text-[10px] text-gray-400 mt-1">Server-to-Server OAuth app — App Credentials.</p>
                </div>
              </div>

            </div>

            <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50/50">
              <label className="flex items-center text-xs text-gray-600 cursor-pointer hover:text-gray-800 transition-colors">
                <input
                  type="checkbox"
                  checked={defaultProvider === 'zoom'}
                  onChange={() => handleSetDefault('zoom')}
                  className="mr-2 rounded-none text-[#5542f6] focus:ring-[#5542f6] cursor-pointer"
                />
                Set as default
              </label>
              {renderSaveBtn('zoom')}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
