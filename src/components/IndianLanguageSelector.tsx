import React, { useState } from 'react';
import { INDIAN_LANGUAGES } from '../data/indianLanguages';
import { IndianLanguage } from '../types';
import { Globe, Search, X, Check, Sparkles } from 'lucide-react';

interface Props {
  selectedLanguage: string;
  onSelectLanguage: (code: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const IndianLanguageSelector: React.FC<Props> = ({
  selectedLanguage,
  onSelectLanguage,
  isOpen,
  onClose
}) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filtered = INDIAN_LANGUAGES.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.nativeName.toLowerCase().includes(search.toLowerCase()) ||
      l.region.toLowerCase().includes(search.toLowerCase())
  );

  const currentLang = INDIAN_LANGUAGES.find((l) => l.code === selectedLanguage) || INDIAN_LANGUAGES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0B0F19] border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800/80 bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold tracking-wide text-white">Select Indian Language</h3>
                <span className="px-2 py-0.5 text-xs font-mono rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  22 Official + English
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Full multilingual AI verification, local fact-checking, and report translation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-slate-800/60 bg-slate-950/40">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by language (e.g. Hindi, Tamil, বাংলা, Telugu, Marathi)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
              autoFocus
            />
          </div>
          <div className="flex items-center gap-1.5 mt-2.5 text-[11px] text-cyan-300/80">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Currently Active: <strong className="text-white font-semibold">{currentLang.name} ({currentLang.nativeName})</strong></span>
          </div>
        </div>

        {/* List of Languages */}
        <div className="p-4 overflow-y-auto space-y-2 flex-1 divide-y divide-slate-800/40">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {filtered.map((lang) => {
              const isSelected = selectedLanguage === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    onSelectLanguage(lang.code);
                    onClose();
                  }}
                  className={`flex items-start justify-between p-3 rounded-xl border text-left transition group ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-500/60 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                      : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-800/60 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-white group-hover:text-cyan-300 transition">
                        {lang.name}
                      </span>
                      <span className="text-xs text-cyan-400/90 font-medium">
                        {lang.nativeName}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 line-clamp-1">
                      {lang.region}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      Script: {lang.script} • {lang.speakersCount}
                    </div>
                  </div>
                  {isSelected && (
                    <div className="p-1 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-sm text-slate-500">
              No matching Indian language found for "{search}".
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span>TruthLens Indian Multilingual Neural Pipeline</span>
          <span className="text-cyan-400">Eighth Schedule Recognized</span>
        </div>
      </div>
    </div>
  );
};
