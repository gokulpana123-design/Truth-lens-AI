import React, { useState } from 'react';
import { InvestigationReport } from '../types';
import {
  HelpCircle,
  Zap,
  FileSearch,
  Microscope,
  CheckCircle2,
  XCircle,
  AlertOctagon,
  Scale,
  Sparkles,
  AlertTriangle,
  Languages
} from 'lucide-react';

interface Props {
  report: InvestigationReport;
  language?: string;
}

export const WhyExplainability: React.FC<Props> = ({ report, language = 'en' }) => {
  const [activeMode, setActiveMode] = useState<'summary' | 'detailed' | 'expert'>('summary');

  const { whyDecided, regionalContext } = report;

  return (
    <div className="bg-[#080C16] border border-cyan-500/20 rounded-2xl p-6 shadow-[0_0_40px_rgba(6,182,212,0.08)]">
      {/* Header & Mode Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 border-b border-slate-800 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
              Why did TruthLens decide this?
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                Explainability Protocol
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Clear, transparent reasoning factors, evidentiary conflicts, and uncertainty disclosures.
            </p>
          </div>
        </div>

        {/* View Mode Buttons */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveMode('summary')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
              activeMode === 'summary'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>30-Sec Summary</span>
          </button>
          <button
            onClick={() => setActiveMode('detailed')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
              activeMode === 'detailed'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileSearch className="w-3.5 h-3.5" />
            <span>Detailed Investigation</span>
          </button>
          <button
            onClick={() => setActiveMode('expert')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
              activeMode === 'expert'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Microscope className="w-3.5 h-3.5" />
            <span>Expert Forensic View</span>
          </button>
        </div>
      </div>

      {/* Dynamic Mode Narrative Box */}
      <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-950/90 border border-slate-800">
        {activeMode === 'summary' && (
          <div className="space-y-2 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
              <Zap className="w-4 h-4" />
              <span>30-Second Rapid Digest</span>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed font-sans">
              {report.summary30Sec}
            </p>
          </div>
        )}

        {activeMode === 'detailed' && (
          <div className="space-y-3 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-semibold uppercase tracking-wider">
              <FileSearch className="w-4 h-4" />
              <span>In-Depth Evidentiary Investigation</span>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-line">
              {report.detailedInvestigation}
            </p>
          </div>
        )}

        {activeMode === 'expert' && (
          <div className="space-y-3 animate-in fade-in duration-300 font-mono text-xs">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-semibold uppercase tracking-wider">
              <Microscope className="w-4 h-4" />
              <span>Forensic & Spectral Evidence View</span>
            </div>
            <p className="text-slate-300 leading-relaxed bg-black/40 p-4 rounded-xl border border-slate-800 text-[11px]">
              {report.expertEvidenceView}
            </p>
          </div>
        )}
      </div>

      {/* Regional Context Banner (If Indian Language / WhatsApp Forward) */}
      {regionalContext && (
        <div className="mt-4 p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <Languages className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-300">
              <strong className="text-white font-semibold">Indian Regional Pattern:</strong>{' '}
              {regionalContext.region}
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px]">
            {regionalContext.isWhatsAppForwardPattern && (
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Forwarded Many Times Tag Detected
              </span>
            )}
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Alert: {regionalContext.regionalAlertLevel || 'Elevated'}
            </span>
          </div>
        </div>
      )}

      {/* 4 Quadrants: Strongest, Contradictory, Missing, Reasoning */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {/* Strongest Evidence */}
        <div className="p-4 rounded-xl bg-[#0C1222] border border-emerald-500/20 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase font-mono">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Strongest Primary Corroboration</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-300">
            {whyDecided.strongestEvidence.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-400 font-mono font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contradictory Evidence */}
        <div className="p-4 rounded-xl bg-[#140D17] border border-red-500/20 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase font-mono">
            <XCircle className="w-4 h-4 text-red-400" />
            <span>Direct Contradictory Facts</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-300">
            {whyDecided.contradictoryEvidence.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-red-400 font-mono font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Missing Evidence */}
        <div className="p-4 rounded-xl bg-[#161208] border border-amber-500/20 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase font-mono">
            <AlertOctagon className="w-4 h-4 text-amber-400" />
            <span>Missing / Inconclusive Evidence</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-300">
            {whyDecided.missingEvidence.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-400 font-mono font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Reasoning Factors */}
        <div className="p-4 rounded-xl bg-[#0C1222] border border-cyan-500/20 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase font-mono">
            <Scale className="w-4 h-4 text-cyan-400" />
            <span>Algorithmic Reasoning Synthesis</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-300">
            {whyDecided.reasoningFactors.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-cyan-400 font-mono font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
