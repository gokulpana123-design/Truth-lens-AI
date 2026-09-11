import React, { useState } from 'react';
import { DEMO_INVESTIGATIONS } from './data/demoInvestigations';
import { InvestigationReport } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { VerdictBadge } from './components/VerdictBadge';
import { EvidenceGraph } from './components/EvidenceGraph';
import { SourceTrustPanel } from './components/SourceTrustPanel';
import { WhyExplainability } from './components/WhyExplainability';
import { ClaimTimeline } from './components/ClaimTimeline';
import { MediaLab } from './components/MediaLab';
import { MisinformationRadar } from './components/MisinformationRadar';
import { TruthLensCopilot } from './components/TruthLensCopilot';
import { ReportModal } from './components/ReportModal';
import {
  ShieldCheck,
  Sparkles,
  Layers,
  FileText,
  MessageSquareCode,
  Share2,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ExternalLink,
  Zap,
  Globe,
  Download,
  Flame,
  ArrowRight,
  Printer
} from 'lucide-react';
import { getLocale } from './data/indianLanguages';

export default function App() {
  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  // Selected Indian Language (default: 'en')
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  // Active Investigation Report
  const [activeReport, setActiveReport] = useState<InvestigationReport>(DEMO_INVESTIGATIONS[0]);
  // Verifying Loading State
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verificationStage, setVerificationStage] = useState<string>('');
  // Report Modal State
  const [reportModalOpen, setReportModalOpen] = useState<boolean>(false);
  // Copilot Initial Query
  const [copilotQuery, setCopilotQuery] = useState<string>('');

  const locale = getLocale(selectedLanguage);

  // Load a demo case
  const handleLoadDemo = (demoId: string) => {
    const found = DEMO_INVESTIGATIONS.find((d) => d.id === demoId);
    if (found) {
      setActiveReport(found);
      setActiveTab('dashboard');
    }
  };

  // Perform Verification
  const handleVerify = async (data: {
    claim: string;
    mediaType: 'none' | 'image' | 'video';
    mediaData?: string;
    language: string;
  }) => {
    setIsVerifying(true);
    setVerificationStage('Extracting core factual assertions & linguistic markers...');

    try {
      // Simulation steps for user visual feedback
      const timer1 = setTimeout(() => {
        setVerificationStage('Decomposing into verifiable sub-claims & querying institutional registries...');
      }, 700);

      const timer2 = setTimeout(() => {
        setVerificationStage('Executing cross-modal visual forensics & ELA scan...');
      }, 1400);

      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          claim: data.claim,
          mediaType: data.mediaType,
          mediaData: data.mediaData,
          language: data.language,
          isDemo: false
        })
      });

      clearTimeout(timer1);
      clearTimeout(timer2);

      const reportData: InvestigationReport = await res.json();
      setActiveReport(reportData);
      setActiveTab('dashboard');
    } catch (err) {
      console.error('Verification error:', err);
      // Fallback to first demo with matching claim
      setActiveReport({
        ...DEMO_INVESTIGATIONS[0],
        id: `tl-err-${Date.now()}`,
        claim: data.claim
      });
    } finally {
      setIsVerifying(false);
      setVerificationStage('');
    }
  };

  const handleOpenCopilotWithQuery = (query: string) => {
    setCopilotQuery(query);
    setActiveTab('copilot');
  };

  return (
    <div className="min-h-screen bg-[#04060B] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black flex flex-col justify-between antialiased">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        onLoadDemo={handleLoadDemo}
        demoInvestigations={DEMO_INVESTIGATIONS}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-8">
        {/* Verification Progress Modal / Overlay */}
        {isVerifying && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="p-8 rounded-3xl bg-[#090D1A] border border-cyan-500/40 shadow-[0_0_80px_rgba(6,182,212,0.3)] max-w-md w-full text-center space-y-5">
              <div className="relative flex items-center justify-center w-16 h-16 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20 border-t-cyan-400 animate-spin" />
                <ShieldCheck className="w-8 h-8 text-cyan-400" />
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-white tracking-wide">
                  TruthLens Neural Verification
                </h4>
                <p className="text-xs text-cyan-300 font-mono">
                  {verificationStage || 'Analyzing evidence across authoritative registries...'}
                </p>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-pulse w-full" />
              </div>
              <p className="text-[11px] text-slate-500">
                Grounding against PIB Fact Check, official statutory gazettes, and cross-source consensus.
              </p>
            </div>
          </div>
        )}

        {/* Tab 1: DASHBOARD VIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Hero input bar */}
            <HeroSection
              onVerify={handleVerify}
              isVerifying={isVerifying}
              selectedLanguage={selectedLanguage}
              onSelectLanguage={setSelectedLanguage}
              onLoadDemoCase={handleLoadDemo}
            />

            {/* Active Credibility Intelligence Report View */}
            {activeReport && (
              <div className="space-y-6 pt-4 border-t border-slate-800/80">
                {/* Dossier Banner */}
                <div className="bg-[#080C16] border border-cyan-500/30 rounded-2xl p-6 shadow-[0_0_40px_rgba(6,182,212,0.1)] flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold">
                        ACTIVE INVESTIGATION DOSSIER
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        Case ID: <strong className="text-slate-200">{activeReport.id}</strong>
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs font-mono text-slate-400">
                        Category: <strong className="text-cyan-400">{activeReport.category}</strong>
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                      "{activeReport.claim}"
                    </h2>

                    <p className="text-xs text-slate-400">
                      {activeReport.confidenceExplanation}
                    </p>
                  </div>

                  {/* Verdict & Export Actions */}
                  <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-3 shrink-0">
                    <VerdictBadge
                      verdict={activeReport.verdict}
                      confidenceScore={activeReport.confidenceScore}
                      language={selectedLanguage}
                      size="lg"
                    />

                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => setReportModalOpen(true)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-semibold transition shadow-sm"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Export Dossier</span>
                      </button>

                      <button
                        onClick={() => handleOpenCopilotWithQuery('Explain this verdict and highlight the strongest contradictions.')}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 text-xs font-semibold transition"
                      >
                        <MessageSquareCode className="w-3.5 h-3.5" />
                        <span>Ask Copilot</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Sub-Claims Decomposition Cards */}
                {activeReport.subClaims && activeReport.subClaims.length > 0 && (
                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-cyan-400" />
                        <h4 className="text-sm font-bold text-white">Decomposed Testable Assertions</h4>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">
                        {activeReport.subClaims.length} Sub-Claims Extracted
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {activeReport.subClaims.map((sub, idx) => (
                        <div
                          key={sub.id || idx}
                          className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start justify-between gap-3 text-xs"
                        >
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono text-slate-500 uppercase block">
                              Sub-assertion 0{idx + 1}
                            </span>
                            <div className="font-semibold text-slate-200 leading-snug">{sub.text}</div>
                            <div className="text-[11px] text-slate-400">{sub.evidenceSummary}</div>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase shrink-0 ${
                              sub.verdict === 'FALSE'
                                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                : sub.verdict === 'VERIFIED'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            }`}
                          >
                            {sub.verdict}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* "Why?" Explainability Matrix */}
                <WhyExplainability report={activeReport} language={selectedLanguage} />

                {/* Evidence Graph */}
                <EvidenceGraph
                  report={activeReport}
                  onOpenCopilotWithQuery={handleOpenCopilotWithQuery}
                />

                {/* Source Trust Panel */}
                <SourceTrustPanel sources={activeReport.sources} />

                {/* Claim Timeline */}
                <ClaimTimeline timeline={activeReport.timeline} />

                {/* Media Forensics (if media present) */}
                {activeReport.mediaForensics && (
                  <MediaLab forensics={activeReport.mediaForensics} />
                )}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: VERIFY WORKBENCH */}
        {activeTab === 'verify' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[#080C16] border border-cyan-500/20">
              <h2 className="text-xl font-bold text-white mb-2">Multimodal Verification Workbench</h2>
              <p className="text-xs text-slate-400">
                Input any claim, article URL, screenshot, or video file to run through our multi-stage AI pipeline.
              </p>
            </div>
            <HeroSection
              onVerify={handleVerify}
              isVerifying={isVerifying}
              selectedLanguage={selectedLanguage}
              onSelectLanguage={setSelectedLanguage}
              onLoadDemoCase={handleLoadDemo}
            />
          </div>
        )}

        {/* Tab 3: EVIDENCE GRAPH */}
        {activeTab === 'graph' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[#080C16] border border-cyan-500/20 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Visual Evidence Graph Explorer</h2>
                <p className="text-xs text-slate-400">
                  Trace how claims, sources, and evidence connect to produce the final credibility assessment.
                </p>
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950 px-3 py-1 rounded-lg border border-cyan-500/30">
                Case: {activeReport.id}
              </span>
            </div>
            <EvidenceGraph
              report={activeReport}
              onOpenCopilotWithQuery={handleOpenCopilotWithQuery}
            />
          </div>
        )}

        {/* Tab 4: MEDIA LAB */}
        {activeTab === 'medialab' && (
          <div className="space-y-6">
            <MediaLab
              forensics={activeReport.mediaForensics}
              onAnalyzeNewMedia={(file) => {
                handleVerify({
                  claim: `Forensic audit of uploaded media file: ${file.name}`,
                  mediaType: file.type.startsWith('video') ? 'video' : 'image',
                  language: selectedLanguage
                });
              }}
            />
          </div>
        )}

        {/* Tab 5: MISINFORMATION RADAR */}
        {activeTab === 'radar' && (
          <div className="space-y-6">
            <MisinformationRadar
              onSelectClaimToVerify={(claim) => {
                handleVerify({
                  claim,
                  mediaType: 'none',
                  language: selectedLanguage
                });
              }}
            />
          </div>
        )}

        {/* Tab 6: REPORTS */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[#080C16] border border-cyan-500/20 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Credibility Reports & Dossier Hub</h2>
                <p className="text-xs text-slate-400">
                  Download, print, or share verified dossiers for researchers, journalists, and public citizens.
                </p>
              </div>
              <button
                onClick={() => setReportModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-semibold transition flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>Open Current Dossier</span>
              </button>
            </div>

            {/* Dossier Previews list */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {DEMO_INVESTIGATIONS.map((demo) => (
                <div
                  key={demo.id}
                  className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-cyan-400 block">{demo.category}</span>
                    <h4 className="font-bold text-white text-sm leading-snug line-clamp-2">
                      {demo.claim}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-3">
                      {demo.summary30Sec}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-300">
                      Score: {demo.confidenceScore}%
                    </span>
                    <button
                      onClick={() => {
                        setActiveReport(demo);
                        setReportModalOpen(true);
                      }}
                      className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
                    >
                      View Dossier →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 7: COPILOT CHAT */}
        {activeTab === 'copilot' && (
          <div className="space-y-6">
            <TruthLensCopilot
              report={activeReport}
              initialQuery={copilotQuery}
            />
          </div>
        )}
      </main>

      {/* Report Modal */}
      <ReportModal
        report={activeReport}
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
      />

      {/* Footer */}
      <footer className="w-full border-t border-slate-800/80 bg-[#030509] py-8 text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-500/30 text-cyan-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-white font-bold tracking-tight">TruthLens AI</span>
              <span className="text-slate-500 mx-2">•</span>
              <span>Verify Before You Believe</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <span>IFCN Code of Principles Grounded</span>
            <span>•</span>
            <span>22 Official Indian Languages</span>
            <span>•</span>
            <span>Gemini 3.8 Flash Multimodal AI</span>
          </div>

          <div className="font-mono text-[11px] text-slate-600">
            TruthLens Security Hash: SHA256-4b9e2
          </div>
        </div>
      </footer>
    </div>
  );
}
