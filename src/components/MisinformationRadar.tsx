import React, { useState } from 'react';
import { RADAR_ITEMS, REGION_HOTSPOTS, RegionHotspot } from '../data/radarData';
import { RadarItem, VerdictType } from '../types';
import { VERDICT_CONFIGS } from '../data/verdictConfig';
import {
  Radio,
  Flame,
  AlertTriangle,
  TrendingUp,
  MapPin,
  Filter,
  Search,
  ArrowUpRight,
  ShieldAlert,
  Sparkles,
  Info,
  CheckCircle2
} from 'lucide-react';

interface Props {
  onSelectClaimToVerify: (claim: string) => void;
}

export const MisinformationRadar: React.FC<Props> = ({ onSelectClaimToVerify }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedHotspot, setSelectedHotspot] = useState<RegionHotspot | null>(REGION_HOTSPOTS[0]);
  const [searchFilter, setSearchFilter] = useState('');

  const categories = [
    'all',
    'Cybersecurity & Tech',
    'Finance, Governance & Welfare',
    'E-Fraud & Deepfakes',
    'Climate & Environment',
    'National Heritage & Culture',
    'Public Health'
  ];

  const filteredItems = RADAR_ITEMS.filter((item) => {
    const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchSearch =
      item.claim.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.region.toLowerCase().includes(searchFilter.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner with Demo Data Notice */}
      <div className="bg-[#080C16] border border-cyan-500/20 rounded-2xl p-6 shadow-[0_0_40px_rgba(6,182,212,0.08)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-wide">
                  Misinformation Radar & Threat Stream
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-mono rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  REAL-TIME SYNTHESIS
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Early-warning telemetry on rapidly spreading digital narratives, deepfake anomalies, and regional hoaxes across India.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-amber-300">
            <Info className="w-3.5 h-3.5 text-amber-400" />
            <span>Simulated Telemetry / Demo Stream Active</span>
          </div>
        </div>

        {/* 4 Metrics Highlight Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Active Hoax Velocity</span>
              <Flame className="w-3.5 h-3.5 text-orange-400" />
            </div>
            <div className="text-xl font-bold font-mono text-white">49 Streams</div>
            <div className="text-[10px] text-orange-400 font-mono mt-0.5">+14% in last 6 hrs</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Deepfake Flags</span>
              <ShieldAlert className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className="text-xl font-bold font-mono text-purple-400">18 Alerts</div>
            <div className="text-[10px] text-purple-300 font-mono mt-0.5">High generative index</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Recycled Narratives</span>
              <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-xl font-bold font-mono text-cyan-400">62% Re-spins</div>
            <div className="text-[10px] text-cyan-300 font-mono mt-0.5">Prior debunks available</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Languages Monitored</span>
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-xl font-bold font-mono text-emerald-400">22 Official</div>
            <div className="text-[10px] text-emerald-300 font-mono mt-0.5">Pan-India coverage</div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout: Regional Hotspot Radar Map & Trending Claims Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Regional Hotspot Map Panel */}
        <div className="lg:col-span-5 bg-[#080C16] border border-cyan-500/20 rounded-2xl p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <h4 className="font-bold text-white text-sm">Geographic Misinformation Hotspots</h4>
              </div>
              <span className="text-[10px] font-mono text-slate-400">India Region</span>
            </div>

            {/* Visual Radar Map Canvas Simulation */}
            <div className="relative mt-4 h-64 rounded-xl bg-slate-950 border border-slate-800/80 overflow-hidden flex items-center justify-center p-4">
              {/* Radar Rings animation */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                <div className="w-52 h-52 rounded-full border border-cyan-500/40 animate-ping duration-1000" />
                <div className="w-36 h-36 rounded-full border border-cyan-500/50" />
                <div className="w-20 h-20 rounded-full border border-cyan-500/60" />
              </div>

              {/* Geographic Hotspot Nodes (Interactive Pins) */}
              <div className="relative w-full h-full">
                {REGION_HOTSPOTS.map((spot, idx) => {
                  // Normalize lat/lng to container %
                  // India approx: lat 8 to 35, lng 68 to 97
                  const topPercent = Math.max(10, Math.min(88, ((35 - spot.lat) / (35 - 8)) * 100));
                  const leftPercent = Math.max(10, Math.min(90, ((spot.lng - 68) / (97 - 68)) * 100));
                  const isSelected = selectedHotspot?.id === spot.id;

                  return (
                    <button
                      key={spot.id}
                      onClick={() => setSelectedHotspot(spot)}
                      style={{ top: `${topPercent}%`, left: `${leftPercent}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 z-10 ${
                        isSelected ? 'scale-125 z-20' : 'hover:scale-115'
                      }`}
                      title={`${spot.name}: ${spot.activeNarrativesCount} active narratives`}
                    >
                      <div
                        className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-lg transition ${
                          spot.alertLevel === 'Critical'
                            ? 'bg-red-500 animate-pulse ring-4 ring-red-500/20'
                            : spot.alertLevel === 'Elevated'
                            ? 'bg-amber-500 ring-4 ring-amber-500/20'
                            : 'bg-cyan-500 ring-4 ring-cyan-500/20'
                        }`}
                      />
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[9px] font-mono text-slate-300 bg-black/80 px-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">
                        {spot.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="absolute bottom-2 left-2 text-[9px] font-mono text-slate-500">
                Click any hotspot to inspect local narrative vectors
              </div>
            </div>

            {/* Selected Hotspot Detail Card */}
            {selectedHotspot && (
              <div className="mt-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">{selectedHotspot.name}</span>
                  <span
                    className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                      selectedHotspot.alertLevel === 'Critical'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : selectedHotspot.alertLevel === 'Elevated'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    }`}
                  >
                    {selectedHotspot.alertLevel} Threat Level
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                  <div>
                    <span className="text-slate-500 block">Active Narratives</span>
                    <span className="text-cyan-400 font-mono font-bold">
                      {selectedHotspot.activeNarrativesCount} tracked hoaxes
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Primary Channels</span>
                    <span className="text-slate-200 font-medium">{selectedHotspot.primaryPlatform}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Dominant Category</span>
                    <span className="text-slate-200">{selectedHotspot.topCategory}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Linguistic Vector</span>
                    <span className="text-slate-200">{selectedHotspot.viralLanguage}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="pt-2 text-[11px] text-slate-500 font-mono">
            Grounding Source: National Cyber Crime Registry & Public Web Telemetry
          </div>
        </div>

        {/* Right: Trending Claims Stream Feed */}
        <div className="lg:col-span-7 bg-[#080C16] border border-cyan-500/20 rounded-2xl p-5 space-y-4">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-400" />
              <h4 className="font-bold text-white text-sm">Emerging Claims Feed</h4>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search claims or region..."
                className="px-3 py-1 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
              />
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition ${
                  selectedCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat === 'all' ? 'All Categories' : cat}
              </button>
            ))}
          </div>

          {/* List of Claims */}
          <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
            {filteredItems.map((item) => {
              const vConfig = VERDICT_CONFIGS[item.verdict] || VERDICT_CONFIGS.UNVERIFIED;

              return (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/90 hover:border-cyan-500/40 transition duration-200 group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-xs font-mono text-cyan-400 font-medium">
                        {item.category}
                      </span>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${vConfig.badgeBg} ${vConfig.textColor} border ${vConfig.badgeBorder}`}
                        >
                          {vConfig.label}
                        </span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                            item.velocity === 'Explosive'
                              ? 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse'
                              : item.velocity === 'Rapid'
                              ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          ⚡ {item.velocity}
                        </span>
                      </div>
                    </div>

                    <h5 className="font-semibold text-white text-sm group-hover:text-cyan-300 transition leading-snug">
                      "{item.claim}"
                    </h5>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.reportSnippet}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 pt-1 font-mono">
                      <span>Region: <strong className="text-slate-300">{item.region}</strong></span>
                      <span>•</span>
                      <span>Languages: <strong className="text-slate-300">{item.language}</strong></span>
                      <span>•</span>
                      <span>Shares: <strong className="text-orange-400">{item.sharesEstimated}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-800/80">
                    <div className="flex items-center gap-1.5">
                      {item.sourcePlatforms.map((plat, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-slate-950 text-[10px] font-mono text-slate-400 border border-slate-800"
                        >
                          {plat}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => onSelectClaimToVerify(item.claim)}
                      className="flex items-center gap-1 px-3 py-1 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 text-xs font-semibold transition"
                    >
                      <span>Investigate in TruthLens</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
