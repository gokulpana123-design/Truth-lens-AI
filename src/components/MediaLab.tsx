import React, { useState } from 'react';
import { MediaForensics, ManipulationIndicator } from '../types';
import {
  Sparkles,
  Upload,
  Image as ImageIcon,
  Video,
  Scan,
  ShieldAlert,
  Layers,
  Search,
  ExternalLink,
  Cpu,
  FileCode,
  AlertTriangle,
  CheckCircle2,
  Eye,
  Sliders,
  Play
} from 'lucide-react';

interface Props {
  forensics?: MediaForensics;
  onAnalyzeNewMedia?: (file: File) => void;
}

export const MediaLab: React.FC<Props> = ({ forensics, onAnalyzeNewMedia }) => {
  const [activeForensicTab, setActiveForensicTab] = useState<'indicators' | 'metadata' | 'keyframes' | 'reverse'>('indicators');
  const [elaViewMode, setElaViewMode] = useState<boolean>(false);
  const [previewMediaUrl, setPreviewMediaUrl] = useState<string | null>(
    forensics?.mediaUrl || 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=800&auto=format&fit=crop&q=80'
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewMediaUrl(url);
      if (onAnalyzeNewMedia) {
        onAnalyzeNewMedia(file);
      }
    }
  };

  const aiRisk = forensics?.aiGeneratedRisk ?? 84;
  const indicators = forensics?.manipulationIndicators || [
    { name: 'Compression Artifact Inconsistency', score: 91, details: 'Localized high frequency quant table variance around face/text perimeter.', severity: 'high' as const },
    { name: 'Neural Diffusion Texture Fingerprint', score: 86, details: 'Laplacian filter shows synthetic micro-noise typical of Latent Diffusion models.', severity: 'high' as const },
    { name: 'Metadata Provenance Gap', score: 78, details: 'EXIF camera serial numbers and sensor exposure tags stripped by processing tool.', severity: 'medium' as const },
    { name: 'Lighting & Shadow Angle Mismatch', score: 65, details: 'Incident vector of main light source deviates by 28° from background shadow angles.', severity: 'medium' as const }
  ];

  const metadata = forensics?.metadataExtracted || {
    'File Format': 'JPEG Extended JFIF',
    'Color Profile': 'sRGB IEC61966-2.1',
    'Resolution': '1920 x 1080 (72 DPI)',
    'Software': 'Adobe Photoshop 24.1 / Generative Fill',
    'Original Timestamp': '2026-03-01 07:12:44 IST',
    'Camera Model': 'Unknown (Synthesized or stripped)'
  };

  const reverseMatches = forensics?.reverseSearchMatches || [
    { source: 'Ministry Archive 2017', date: '2017-06-18', title: 'Unrelated official document template reused for hoax', url: 'https://archive.org', matchConfidence: 96 },
    { source: 'Factly India Debunk Index', date: '2022-11-10', title: 'Recycled viral screenshot previously flagged in 2022', url: 'https://factly.in', matchConfidence: 92 }
  ];

  const keyFrames = forensics?.keyFrames || [
    { time: '00:01', description: 'Speaker standing at podium with authentic background banner.', anomalyFlag: false, visualClue: 'Original 2022 video frame baseline' },
    { time: '00:04', description: 'Lower jaw boundary exhibits pixel blending & warped teeth borders.', anomalyFlag: true, visualClue: 'Wav2Lip neural morphing artifact' },
    { time: '00:09', description: 'Speech audio finishes while facial mouth movement continues for 240ms.', anomalyFlag: true, visualClue: 'Desynchronized audio-video track' }
  ];

  return (
    <div className="bg-[#080C16] border border-cyan-500/20 rounded-2xl p-6 shadow-[0_0_40px_rgba(6,182,212,0.08)] space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 border-b border-slate-800 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
            <Scan className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
              Multimodal Media Forensics Lab
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
                Deepfake & Tampering Detector
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Pixel-level Error Level Analysis (ELA), AI diffusion noise detection, reverse visual search, and keyframe inspection.
            </p>
          </div>
        </div>

        {/* Upload Trigger */}
        <label className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 text-xs font-semibold cursor-pointer transition shadow-sm">
          <Upload className="w-4 h-4" />
          <span>Upload Image / Video to Inspect</span>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Main Inspection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Media Preview & ELA simulation toggle */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-black/60 aspect-video flex items-center justify-center group shadow-md">
            {previewMediaUrl ? (
              <img
                src={previewMediaUrl}
                alt="Analyzed Media"
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover transition duration-300 ${
                  elaViewMode ? 'invert contrast-200 hue-rotate-180 brightness-125' : ''
                }`}
              />
            ) : (
              <div className="text-center p-6 text-slate-500">
                <ImageIcon className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <span className="text-xs">No media loaded for analysis</span>
              </div>
            )}

            {/* Simulated ELA overlay grid */}
            {elaViewMode && (
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-purple-500/20 to-transparent pointer-events-none mix-blend-overlay flex items-center justify-center">
                <span className="text-[11px] font-mono px-3 py-1 bg-black/80 rounded border border-cyan-400 text-cyan-300">
                  ELA Mode: 95% JPEG Resave Delta
                </span>
              </div>
            )}

            {/* Media Overlay Badge */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-mono text-cyan-300 border border-slate-700">
                {forensics?.mediaType?.toUpperCase() || 'IMAGE'} FORENSIC FRAME
              </span>
            </div>
          </div>

          {/* Toggle buttons below preview */}
          <div className="flex items-center justify-between bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 font-mono text-[11px]">Spectral Analysis Filter:</span>
            <button
              onClick={() => setElaViewMode(!elaViewMode)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-mono text-xs transition ${
                elaViewMode
                  ? 'bg-cyan-500 text-black font-bold'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{elaViewMode ? 'Exit ELA Mode' : 'Toggle ELA Filter'}</span>
            </button>
          </div>

          {/* AI Risk Score Bar */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-purple-400" />
                Synthetic AI Generation Risk
              </span>
              <span
                className={`font-mono font-bold text-sm ${
                  aiRisk > 70 ? 'text-purple-400' : aiRisk > 40 ? 'text-amber-400' : 'text-emerald-400'
                }`}
              >
                {aiRisk}% RISK
              </span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ${
                  aiRisk > 70 ? 'bg-gradient-to-r from-purple-500 to-red-500' : 'bg-gradient-to-r from-cyan-500 to-purple-500'
                }`}
                style={{ width: `${aiRisk}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400">
              {forensics?.aiRiskSummary ||
                'High probability of neural generative modification, voice clone synthesis, or digital text replacement.'}
            </p>
          </div>
        </div>

        {/* Right: Forensic Tabs (Indicators, Metadata, Keyframes, Reverse Search) */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Tab navigation */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setActiveForensicTab('indicators')}
                className={`flex-1 py-1.5 rounded-lg text-center font-medium transition ${
                  activeForensicTab === 'indicators'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Tampering Indicators
              </button>
              <button
                onClick={() => setActiveForensicTab('keyframes')}
                className={`flex-1 py-1.5 rounded-lg text-center font-medium transition ${
                  activeForensicTab === 'keyframes'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Keyframe Analysis
              </button>
              <button
                onClick={() => setActiveForensicTab('metadata')}
                className={`flex-1 py-1.5 rounded-lg text-center font-medium transition ${
                  activeForensicTab === 'metadata'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                EXIF Metadata
              </button>
              <button
                onClick={() => setActiveForensicTab('reverse')}
                className={`flex-1 py-1.5 rounded-lg text-center font-medium transition ${
                  activeForensicTab === 'reverse'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Reverse Index
              </button>
            </div>

            {/* Tab 1: Tampering Indicators */}
            {activeForensicTab === 'indicators' && (
              <div className="space-y-2.5 animate-in fade-in duration-200">
                {indicators.map((ind, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-white">{ind.name}</span>
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold uppercase ${
                            ind.severity === 'high'
                              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                              : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          }`}
                        >
                          {ind.severity} severity
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {ind.details}
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold text-purple-400 shrink-0">
                      {ind.score}%
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 2: Keyframes */}
            {activeForensicTab === 'keyframes' && (
              <div className="space-y-2.5 animate-in fade-in duration-200">
                <span className="text-[11px] text-slate-400 block mb-1">
                  Temporal Video Frame Decomposition:
                </span>
                {keyFrames.map((kf, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border flex items-start justify-between gap-3 ${
                      kf.anomalyFlag
                        ? 'bg-red-950/20 border-red-500/30 text-slate-200'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="px-2 py-1 rounded bg-black/60 font-mono text-xs text-cyan-400 border border-slate-700 shrink-0">
                        {kf.time}
                      </span>
                      <div>
                        <div className="text-xs font-semibold text-white">{kf.description}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          Visual Clue: <strong className="text-cyan-300">{kf.visualClue}</strong>
                        </div>
                      </div>
                    </div>
                    {kf.anomalyFlag ? (
                      <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/40 text-[10px] font-mono shrink-0">
                        ANOMALY
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-mono shrink-0">
                        NATURAL
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Tab 3: Metadata */}
            {activeForensicTab === 'metadata' && (
              <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950/60 animate-in fade-in duration-200">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-900/80 text-slate-400 font-mono text-[10px] uppercase">
                    <tr>
                      <th className="px-4 py-2.5">Attribute</th>
                      <th className="px-4 py-2.5">Extracted Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {Object.entries(metadata).map(([key, val], idx) => (
                      <tr key={idx} className="hover:bg-slate-900/40">
                        <td className="px-4 py-2 text-cyan-400">{key}</td>
                        <td className="px-4 py-2 text-slate-300">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Tab 4: Reverse Search */}
            {activeForensicTab === 'reverse' && (
              <div className="space-y-2.5 animate-in fade-in duration-200">
                {reverseMatches.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-semibold text-xs text-white">{m.title}</div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                        <span className="text-cyan-400">{m.source}</span>
                        <span>•</span>
                        <span>Date: {m.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-emerald-400 font-bold">
                        {m.matchConfidence}% match
                      </span>
                      <a
                        href={m.url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 rounded text-slate-400 hover:text-cyan-400 transition"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cross-Modal Consistency Footer */}
          {forensics?.crossModalConsistency && (
            <div className="mt-4 p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span className="text-slate-300">
                  Cross-Modal Text-vs-Media Consistency:
                </span>
              </div>
              <span
                className={`font-mono font-bold text-xs px-2 py-0.5 rounded ${
                  forensics.crossModalConsistency.consistent
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-red-500/20 text-red-400'
                }`}
              >
                {forensics.crossModalConsistency.score}% ({forensics.crossModalConsistency.consistent ? 'Consistent' : 'Contradiction Detected'})
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
