import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';

const LanguageDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');
  const dropdownRef = useRef(null);

  const languages = [
    { name: 'English (US)', code: 'en-US', flag: '🇺🇸' },
    { name: 'English (UK)', code: 'en-GB', flag: '🇬🇧' },
    { name: 'Hindi', code: 'hi', flag: '🇮🇳' },
    { name: 'Spanish', code: 'es', flag: '🇪🇸' },
    { name: 'French', code: 'fr', flag: '🇫🇷' },
    { name: 'Arabic', code: 'ar', flag: '🇸🇦' },
    { name: 'German', code: 'de', flag: '🇩🇪' },
    { name: 'Chinese', code: 'zh', flag: '🇨🇳' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg transition-colors ${
          isOpen ? 'bg-slate-100/80 text-slate-900' : 'hover:bg-slate-50 text-slate-600 hover:text-slate-900'
        }`}
      >
        <Globe className="w-4 h-4 text-slate-400" />
        <span className="text-sm font-medium">{selectedLang.split(' ')[0]}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+12px)] right-0 w-[220px] bg-white border border-slate-100 rounded-xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.15)] ring-1 ring-slate-900/5 z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-2 border-b border-slate-100 mb-1">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Select Language</p>
          </div>
          
          <div className="max-h-[300px] overflow-y-auto px-1.5 mt-1 space-y-0.5 custom-scrollbar">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setSelectedLang(lang.name);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  selectedLang === lang.name 
                  ? 'bg-indigo-50/80 text-indigo-700 font-bold' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg leading-none shadow-sm rounded-sm bg-white overflow-hidden">{lang.flag}</span>
                  <span>{lang.name}</span>
                </div>
                {selectedLang === lang.name && <Check className="w-4 h-4 text-indigo-600 stroke-[3]" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
