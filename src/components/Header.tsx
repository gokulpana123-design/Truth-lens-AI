import React, { useState } from 'react';
import {
  ShieldCheck,
  Globe,
  Radio,
  Share2,
  Sparkles,
  Layers,
  Activity,
  FileText,
  MessageSquareCode,
  Image as ImageIcon,
  Menu,
  X,
  Zap,
  ChevronDown
} from 'lucide-react';
import { INDIAN_LANGUAGES, getLocale } from '../data/indianLanguages';
import { IndianLanguageSelector } from './IndianLanguageSelector';

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
  onLoadDemo: (demoId: string) => void;
  demoInvestigations: any[];
}

export const Header: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  selectedLanguage,
  setSelectedLanguage,
  onLoadDemo,
  demoInvestigations
}) => {
  const [langModalOpen, setLangModalOpen] = useState(false);
  const [demoMenuOpen, setDemoMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentLang = INDIAN_LANGUAGES.find((l) => l.code === selectedLanguage) || INDIAN_LANGUAGES[0];
  const locale = getLocale(selectedLanguage);

  const navItems = [
    { id: 'dashboard', label: locale.navDashboard, icon: Activity },
    { id: 'verify', label: locale.navVerify, icon: ShieldCheck },
    { id: 'graph', label: locale.navEvidenceGraph, icon: Layers },
    { id: 'medialab', label: locale.navMediaLab, icon: ImageIcon },
    { id: 'radar', label: locale.navRadar, icon: Radio },
    { id: 'reports', label: locale.navReports, icon: FileText },
    { id: 'copilot', label: locale.navCopilot, icon: MessageSquareCode, isAi: true },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-cyan-500/20 bg-[#06080F]/85 backdrop-blur-xl transition-all">
        {/* Top Intelligence Status Bar */}
        <div className="hidden lg:flex items-center justify-between px-6 py-1.5 bg-slate-950/80 border-b border-slate-800/60 text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-semibold tracking-wide">TRUTHLENS NEURAL ENGINE: OPERATIONAL</span>
            </div>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Model: Gemini 3.8 Flash + Deep Multimodal NLP</span>
            <span className="text-slate-600">|</span>
            <span className="text-cyan-400/90 font-sans">Pan-India 22 Official Languages Grounding</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setDemoMenuOpen(!demoMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-900/50 hover:text-white transition text-[11px]"
              >
                <Zap className="w-3 h-3 text-cyan-400" />
                <span>Load Real-world Case</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {demoMenuOpen && (
                <div className="absolute right-0 mt-1 w-72 bg-[#0B0F19] border border-cyan-500/30 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-2 py-1 text-[10px] uppercase tracking-wider text-slate-500 font-mono">
                    Pre-investigated Forensic Cases
                  </div>
                  {demoInvestigations.map((demo) => (
                    <button
                      key={demo.id}
                      onClick={() => {
                        onLoadDemo(demo.id);
                        setDemoMenuOpen(false);
                      }}
                      className="w-full text-left p-2 rounded-lg hover:bg-slate-800/80 transition text-xs text-slate-300 hover:text-cyan-200"
                    >
                      <div className="font-medium text-white truncate">{demo.claim}</div>
                      <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                        <span className="text-cyan-400">{demo.category.split('/')[0]}</span>
                        <span>•</span>
                        <span className="text-slate-400">{demo.verdict}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Latency: 142ms</span>
          </div>
        </div>

        {/* Main Nav Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          {/* Logo & Tagline */}
          <div
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-purple-600/20 border border-cyan-500/40 text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition">
              <ShieldCheck className="w-6 h-6 text-cyan-400 group-hover:scale-105 transition" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-white font-['Syne']">
                  Truth<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Lens</span>
                </span>
                <span className="px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono tracking-wider font-semibold">
                  AI v2.4
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wide font-medium">
                {locale.tagline}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800/80">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.isAi && (
                    <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right actions: Indian Language switcher & Mobile Hamburger */}
          <div className="flex items-center gap-2.5">
            {/* Language Switcher Trigger */}
            <button
              onClick={() => setLangModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700/80 hover:border-cyan-500/50 hover:bg-slate-800/90 text-xs text-slate-200 transition group shadow-sm"
              title="Change language (All 22 Indian Languages Supported)"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-45 transition duration-300" />
              <span className="font-semibold text-white">{currentLang.nativeName}</span>
              <span className="text-[10px] text-slate-400 hidden sm:inline">({currentLang.name})</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-[#0B0F19] px-4 py-4 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-medium text-left transition ${
                      isActive
                        ? 'bg-cyan-950/60 border border-cyan-500/40 text-cyan-300'
                        : 'bg-slate-900/60 border border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile demo cases */}
            <div className="pt-2 border-t border-slate-800 mt-2">
              <span className="text-[11px] text-slate-400 font-mono block mb-1.5">Load Forensic Case:</span>
              <div className="flex flex-wrap gap-1.5">
                {demoInvestigations.map((demo) => (
                  <button
                    key={demo.id}
                    onClick={() => {
                      onLoadDemo(demo.id);
                      setMobileMenuOpen(false);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700/80 text-[11px] text-slate-300 hover:text-cyan-300"
                  >
                    {demo.category.split('/')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Indian Language Selector Modal */}
      <IndianLanguageSelector
        isOpen={langModalOpen}
        onClose={() => setLangModalOpen(false)}
        selectedLanguage={selectedLanguage}
        onSelectLanguage={setSelectedLanguage}
      />
    </>
  );
};
