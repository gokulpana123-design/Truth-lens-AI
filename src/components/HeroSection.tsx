import React, { useState } from 'react';
import {
  Search,
  Upload,
  Link as LinkIcon,
  Image as ImageIcon,
  Video,
  FileText,
  HelpCircle,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Zap,
  Globe,
  RefreshCw,
  X
} from 'lucide-react';
import { getLocale, INDIAN_LANGUAGES } from '../data/indianLanguages';

interface Props {
  onVerify: (data: {
    claim: string;
    mediaType: 'none' | 'image' | 'video';
    mediaData?: string;
    language: string;
  }) => void;
  isVerifying: boolean;
  selectedLanguage: string;
  onSelectLanguage: (code: string) => void;
  onLoadDemoCase: (demoId: string) => void;
}

export const HeroSection: React.FC<Props> = ({
  onVerify,
  isVerifying,
  selectedLanguage,
  onSelectLanguage,
  onLoadDemoCase
}) => {
  const [activeInputType, setActiveInputType] = useState<'text' | 'url' | 'image' | 'video' | 'question' | 'multi'>('text');
  const [inputText, setInputText] = useState('');
  const [inputUrl, setInputUrl] = useState('');
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'none' | 'image' | 'video'>('none');
  const [multiClaims, setMultiClaims] = useState<string[]>(['', '']);

  const locale = getLocale(selectedLanguage);

  const quickPresets = [
    {
      id: 'demo-rbi-2000',
      label: 'RBI ₹2,000 Note Status',
      category: 'Finance',
      text: 'Viral message claiming ₹2,000 notes are completely invalid after Dec 31 with zero exchange value.'
    },
    {
      id: 'demo-isro-solar',
      label: 'ISRO Aditya-L1 Solar Flare',
      category: 'Science',
      text: 'ISRO Aditya-L1 captured extreme X-class solar flare triggering minor radio blackouts.'
    },
    {
      id: 'demo-deepfake-speech',
      label: 'Regional Deepfake Video',
      category: 'Deepfake',
      text: 'Viral speech of minister announcing emergency gold tax across all private bank lockers.'
    },
    {
      id: 'hoax-telecom',
      label: 'Telecom Call Recording Rumor',
      category: 'Tech Hoax',
      text: 'New telecom act records all phone calls and monitors WhatsApp messages with 3 blue ticks.'
    }
  ];

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setMediaPreview(reader.result as string);
        setMediaType(type);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveMedia = () => {
    setMediaPreview(null);
    setMediaType('none');
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isVerifying) return;

    let finalClaim = '';
    if (activeInputType === 'text' || activeInputType === 'question') {
      finalClaim = inputText.trim();
    } else if (activeInputType === 'url') {
      finalClaim = inputUrl.trim()
        ? `URL Analysis: ${inputUrl.trim()}${inputText ? ` - Context: ${inputText}` : ''}`
        : '';
    } else if (activeInputType === 'image' || activeInputType === 'video') {
      finalClaim = inputText.trim() || `Investigate uploaded ${activeInputType} for forensic authenticity and manipulated narrative.`;
    } else if (activeInputType === 'multi') {
      const valid = multiClaims.filter((c) => c.trim().length > 0);
      finalClaim = valid.join(' | ');
    }

    if (!finalClaim && !mediaPreview) return;

    onVerify({
      claim: finalClaim || 'Investigate provided digital media',
      mediaType,
      mediaData: mediaPreview || undefined,
      language: selectedLanguage
    });
  };

  return (
    <div className="relative overflow-hidden py-10 sm:py-16">
      {/* Background Cyber Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[250px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
        {/* Top Tagline Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium shadow-[0_0_20px_rgba(6,182,212,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '4s' }} />
          <span>Multimodal Intelligence • Pan-India 22 Languages Supported</span>
        </div>

        {/* Main Cinematic Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-['Syne'] leading-tight">
          Verify Before You <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">Believe</span>.
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans">
          Paste a viral post, upload an image or video, enter a URL, or ask a question.
          TruthLens deconstructs claims into an evidence-based Credibility Intelligence Report with full explainability.
        </p>

        {/* Multimodal Input Container Card */}
        <div className="mt-8 bg-[#080C16]/95 border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.12)] p-4 sm:p-6 text-left transition-all">
          {/* Multimodal Mode Selector Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 pb-4 border-b border-slate-800/90 text-xs">
            {[
              { id: 'text', label: 'Claim / Article', icon: FileText },
              { id: 'url', label: 'Web URL', icon: LinkIcon },
              { id: 'image', label: 'Image / Screenshot', icon: ImageIcon },
              { id: 'video', label: 'Video Clip', icon: Video },
              { id: 'question', label: 'Ask Question', icon: HelpCircle },
              { id: 'multi', label: 'Multi-Claim Batch', icon: Layers }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeInputType === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveInputType(tab.id as any)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-medium transition ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Input Areas */}
          <div className="pt-4 space-y-4">
            {/* Standard Text or Question Input */}
            {(activeInputType === 'text' || activeInputType === 'question') && (
              <div className="relative">
                <textarea
                  rows={4}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={
                    activeInputType === 'question'
                      ? 'e.g. "Is it true that the RBI banned ₹2,000 notes completely?" or "Did WHO declare an emergency?"'
                      : 'Paste claim, WhatsApp forward, news excerpt, or tweet here. Supports Hindi, Tamil, Bengali, Telugu, Marathi, and all Indian scripts...'
                  }
                  className="w-full p-4 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition resize-none leading-relaxed"
                />
              </div>
            )}

            {/* URL Input */}
            {activeInputType === 'url' && (
              <div className="space-y-3">
                <div className="relative">
                  <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400" />
                  <input
                    type="url"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="https://example.com/viral-news-story-or-post"
                    className="w-full pl-11 pr-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                  />
                </div>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Optional: Enter specific claim or headline to verify from this link..."
                  className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800/80 rounded-xl text-xs text-slate-300 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
                />
              </div>
            )}

            {/* Image Upload Input */}
            {activeInputType === 'image' && (
              <div className="space-y-3">
                <div className="border-2 border-dashed border-slate-700 hover:border-cyan-500/50 rounded-2xl p-6 text-center bg-slate-950/60 transition group">
                  {mediaPreview ? (
                    <div className="relative inline-block">
                      <img
                        src={mediaPreview}
                        alt="Uploaded preview"
                        className="max-h-48 rounded-xl border border-slate-700 object-contain shadow-lg"
                      />
                      <button
                        onClick={handleRemoveMedia}
                        className="absolute -top-2 -right-2 p-1 rounded-full bg-red-600 text-white hover:bg-red-500 transition shadow"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center justify-center space-y-2">
                      <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition">
                        <ImageIcon className="w-8 h-8" />
                      </div>
                      <div className="text-xs text-slate-300 font-medium">
                        Drag and drop a screenshot or image, or <span className="text-cyan-400 font-semibold underline">browse file</span>
                      </div>
                      <span className="text-[11px] text-slate-500">Supports PNG, JPG, WebP, or WhatsApp screenshots</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleMediaUpload(e, 'image')}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Optional: Context or claim made by this image..."
                  className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-slate-300 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
                />
              </div>
            )}

            {/* Video Upload Input */}
            {activeInputType === 'video' && (
              <div className="space-y-3">
                <div className="border-2 border-dashed border-slate-700 hover:border-purple-500/50 rounded-2xl p-6 text-center bg-slate-950/60 transition group">
                  {mediaPreview ? (
                    <div className="relative inline-block">
                      <video
                        src={mediaPreview}
                        controls
                        className="max-h-48 rounded-xl border border-slate-700 shadow-lg"
                      />
                      <button
                        onClick={handleRemoveMedia}
                        className="absolute -top-2 -right-2 p-1 rounded-full bg-red-600 text-white hover:bg-red-500 transition shadow"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center justify-center space-y-2">
                      <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition">
                        <Video className="w-8 h-8" />
                      </div>
                      <div className="text-xs text-slate-300 font-medium">
                        Upload video clip to inspect for AI voice clones & face swaps, or <span className="text-purple-400 font-semibold underline">browse</span>
                      </div>
                      <span className="text-[11px] text-slate-500">Supports MP4, WebM, MOV clips</span>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => handleMediaUpload(e, 'video')}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Optional: Claim or person in the video clip..."
                  className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-slate-300 placeholder-slate-500 focus:outline-none focus:border-purple-400 transition"
                />
              </div>
            )}

            {/* Multi-Claim Batch Input */}
            {activeInputType === 'multi' && (
              <div className="space-y-2.5">
                <span className="text-xs text-slate-400 block">
                  Verify multiple interconnected claims simultaneously:
                </span>
                {multiClaims.map((claim, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-xs font-mono text-cyan-400 font-bold px-2 py-1 rounded bg-slate-900 border border-slate-800 shrink-0">
                      0{idx + 1}
                    </span>
                    <input
                      type="text"
                      value={claim}
                      onChange={(e) => {
                        const updated = [...multiClaims];
                        updated[idx] = e.target.value;
                        setMultiClaims(updated);
                      }}
                      placeholder={`Enter claim #${idx + 1}...`}
                      className="flex-1 px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setMultiClaims([...multiClaims, ''])}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-medium pt-1"
                >
                  + Add another claim to verify together
                </button>
              </div>
            )}

            {/* Action Bottom Row: Language Indicator & Verify CTA */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-3 border-t border-slate-800/80 gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>Verification Language:</span>
                <span className="font-semibold text-white">
                  {INDIAN_LANGUAGES.find((l) => l.code === selectedLanguage)?.name || 'English'}
                </span>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isVerifying}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-[0_0_30px_rgba(6,182,212,0.3)] transition duration-300 disabled:opacity-50"
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Executing Multi-Stage Verification...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-cyan-200" />
                    <span>Generate Credibility Intelligence Report</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Quick Demo Case Presets */}
        <div className="pt-2 text-left">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-medium">Or test with real-world viral cases:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickPresets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => {
                  if (preset.id.startsWith('demo-')) {
                    onLoadDemoCase(preset.id);
                  } else {
                    setInputText(preset.text);
                    setActiveInputType('text');
                  }
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 hover:border-cyan-500/40 text-xs text-slate-300 hover:text-white transition flex items-center gap-2 group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:scale-125 transition" />
                <span className="font-medium">{preset.label}</span>
                <span className="text-[10px] text-slate-500 font-mono">({preset.category})</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
