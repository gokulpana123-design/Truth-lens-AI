import React, { useState } from 'react';
import { EvidenceItem } from '../types';
import {
  ShieldCheck,
  ExternalLink,
  Calendar,
  User,
  Award,
  CheckCircle2,
  XCircle,
  AlertCircle,
  TrendingUp,
  Search,
  Filter
} from 'lucide-react';

interface Props {
  sources: EvidenceItem[];
}

export const SourceTrustPanel: React.FC<Props> = ({ sources = [] }) => {
  const [filterStance, setFilterStance] = useState<'all' | 'supports' | 'contradicts'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = sources.filter((s) => {
    const matchesStance = filterStance === 'all' || s.stance === filterStance;
    const matchesSearch =
      s.sourceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.sourceDomain.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStance && matchesSearch;
  });

  const getTierBadge = (tier: EvidenceItem['sourceTier']) => {
    switch (tier) {
      case 'official':
        return { label: 'Statutory / Official Registry', color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' };
      case 'primary':
        return { label: 'Primary Evidence Source', color: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30' };
      case 'factchecker':
        return { label: 'Certified Fact-Checker (IFCN/PIB)', color: 'bg-blue-500/15 text-blue-400 border-blue-500/30' };
      case 'secondary':
        return { label: 'Secondary News Reporting', color: 'bg-amber-500/15 text-amber-400 border-amber-500/30' };
      case 'social_archive':
        return { label: 'Social Media / Viral Channel', color: 'bg-purple-500/15 text-purple-400 border-purple-500/30' };
      default:
        return { label: 'General Source', color: 'bg-slate-500/15 text-slate-400 border-slate-500/30' };
    }
  };

  return (
    <div className="bg-[#080C16] border border-cyan-500/20 rounded-2xl p-6 shadow-[0_0_40px_rgba(6,182,212,0.08)]">
      {/* Panel Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white tracking-wide">
              Source Trust & Citation Intelligence
            </h3>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold">
              {sources.length} Independent Audits
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            TruthLens evaluates evidentiary validity for the specific claim, rating publication transparency,
            verifiable citations, and cross-source consensus rather than applying permanent domain bans.
          </p>
        </div>

        {/* Filter and search controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs">
            <button
              onClick={() => setFilterStance('all')}
              className={`px-2.5 py-1 rounded-lg transition ${
                filterStance === 'all' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Sources
            </button>
            <button
              onClick={() => setFilterStance('contradicts')}
              className={`px-2.5 py-1 rounded-lg transition ${
                filterStance === 'contradicts' ? 'bg-red-500/20 text-red-300 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Contradicting
            </button>
            <button
              onClick={() => setFilterStance('supports')}
              className={`px-2.5 py-1 rounded-lg transition ${
                filterStance === 'supports' ? 'bg-emerald-500/20 text-emerald-300 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Supporting
            </button>
          </div>
        </div>
      </div>

      {/* Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {filtered.map((source) => {
          const tierInfo = getTierBadge(source.sourceTier);
          const isContradict = source.stance === 'contradicts';
          const isSupport = source.stance === 'supports';

          return (
            <div
              key={source.id}
              className="p-5 rounded-2xl bg-[#0B1020]/90 border border-slate-800 hover:border-cyan-500/40 transition duration-300 flex flex-col justify-between group shadow-sm hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]"
            >
              <div className="space-y-3">
                {/* Top header: name, trust score, stance */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white text-base group-hover:text-cyan-300 transition">
                        {source.sourceName}
                      </h4>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-500 hover:text-cyan-400 transition"
                        title="Visit Source / Document Archive"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                    <span className="text-xs font-mono text-cyan-400/90">{source.sourceDomain}</span>
                  </div>

                  {/* Trust Score & Stance */}
                  <div className="flex flex-col items-end gap-1">
                    <div
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold border ${
                        isContradict
                          ? 'bg-red-500/15 text-red-400 border-red-500/40'
                          : isSupport
                          ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40'
                          : 'bg-slate-500/15 text-slate-300 border-slate-500/40'
                      }`}
                    >
                      {isContradict ? (
                        <XCircle className="w-3.5 h-3.5" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      )}
                      <span className="uppercase">{source.stance}</span>
                    </div>

                    <span className="text-[11px] font-mono text-slate-400">
                      Trust: <strong className="text-white">{source.sourceTrustScore}/100</strong>
                    </span>
                  </div>
                </div>

                {/* Tier Badge */}
                <div>
                  <span
                    className={`inline-block text-[11px] px-2.5 py-0.5 rounded-md border font-medium ${tierInfo.color}`}
                  >
                    {tierInfo.label}
                  </span>
                </div>

                {/* Snippet */}
                <blockquote className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 leading-relaxed italic border-l-2 border-l-cyan-500">
                  "{source.snippet}"
                </blockquote>

                {/* Metadata row: date, author */}
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 pt-1">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>{source.publishDate}</span>
                  </div>
                  {source.author && (
                    <div className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-slate-500" />
                      <span className="line-clamp-1">{source.author}</span>
                    </div>
                  )}
                </div>

                {/* Reliability Signals Chips */}
                {source.reliabilitySignals && source.reliabilitySignals.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {source.reliabilitySignals.map((signal, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-700/80 text-slate-300"
                      >
                        ✓ {signal}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Metrics Bar */}
              <div className="grid grid-cols-3 gap-2 pt-4 mt-4 border-t border-slate-800/80 text-center text-[10px] font-mono">
                <div className="p-1.5 rounded-lg bg-slate-950/50">
                  <span className="text-slate-500 block">Citation</span>
                  <span className="text-white font-semibold">{source.citationQuality}</span>
                </div>
                <div className="p-1.5 rounded-lg bg-slate-950/50">
                  <span className="text-slate-500 block">Bias Rating</span>
                  <span className="text-cyan-300 font-semibold">{source.biasRating}</span>
                </div>
                <div className="p-1.5 rounded-lg bg-slate-950/50">
                  <span className="text-slate-500 block">Transparency</span>
                  <span className="text-emerald-400 font-semibold">{source.transparencyScore}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
