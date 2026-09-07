import React, { useState } from 'react';
import { Lock, MessageCircle, Save, Check } from 'lucide-react';
import SettingsLayout from '../../components/SettingsLayout';

export default function WhatsAppGatewaySettings() {
  const [apiUrl, setApiUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [senderNumber, setSenderNumber] = useState('');
  const [saved, setSaved] = useState(false);
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <SettingsLayout activeTab="whatsapp">
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto p-6 max-w-[1150px] mx-auto w-full">

          {/* Demo Banner */}
          <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-2.5 rounded-none-none text-xs font-medium flex items-center gap-2 mb-6">
            <Lock className="w-3.5 h-3.5 flex-shrink-0" />
            <span><strong>Demo mode:</strong> settings are read-only — changes are disabled for security.</span>
          </div>

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-1">
              <MessageCircle className="w-5 h-5 text-green-500" /> WhatsApp Gateway
            </h1>
            <p className="text-sm text-gray-500">Platform WhatsApp API URL, key and sender for OTP &amp; alerts.</p>
          </div>

          {/* Card */}
          <div className="bg-white border border-gray-200 rounded-none-none shadow-sm overflow-hidden">
            <div className="border-b border-gray-100 px-5 py-3.5">
              <h3 className="font-semibold text-gray-800 text-sm flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-gray-400" /> Platform WhatsApp Gateway
              </h3>
            </div>
            <div className="p-5 space-y-4">
              <p className="text-xs text-gray-500 leading-relaxed">
                Used for registration notifications and system alerts when a school hasn't configured their own gateway.
              </p>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">WhatsApp API URL</label>
                <input
                  value={apiUrl}
                  onChange={e => setApiUrl(e.target.value)}
                  placeholder="https://api.example.com/send-message"
                  className="w-full border border-gray-200 rounded-none-none px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">API Key</label>
                  <input
                    value={apiKey}
                    onChange={e => setApiKey(e.target.value)}
                    type="password"
                    placeholder="Enter API key..."
                    className="w-full border border-gray-200 rounded-none-none px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Sender Number</label>
                  <input
                    value={senderNumber}
                    onChange={e => setSenderNumber(e.target.value)}
                    placeholder="+91XXXXXXXXXX"
                    className="w-full border border-gray-200 rounded-none-none px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-gray-100 px-6 py-3 flex justify-end flex-shrink-0">
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-none-none transition-all text-white ${saved ? 'bg-emerald-500' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {saved ? <><Check className="w-3.5 h-3.5" /> Saved!</> : <><Save className="w-3.5 h-3.5" /> Save WhatsApp Settings</>}
          </button>
        </div>
      </div>
    </SettingsLayout>
  );
}
