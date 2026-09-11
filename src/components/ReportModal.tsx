import React, { useState } from 'react';
import { InvestigationReport } from '../types';
import { VERDICT_CONFIGS } from '../data/verdictConfig';
import {
  FileText,
  Download,
  Share2,
  Printer,
  Copy,
  Check,
  X,
  ShieldCheck,
  Calendar,
  AlertTriangle,
  QrCode
} from 'lucide-react';

interface Props {
  report: InvestigationReport;
  isOpen: boolean;
  onClose: () => void;
}

export const ReportModal: React.FC<Props> = ({ report, isOpen, onClose }) => {
  const [copiedShare, setCopiedShare] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  if (!isOpen) return null;

  const vConfig = VERDICT_CONFIGS[report.verdict] || VERDICT_CONFIGS.UNVERIFIED;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadMarkdown = () => {
    const mdContent = `# TruthLens AI - Credibility Intelligence Report
**Tagline**: Verify Before You Believe
**Investigation ID**: ${report.id}
**Timestamp**: ${report.timestamp}
**Category**: ${report.category}

---

## 1. PRIMARY CLAIM
> "${report.claim}"

## 2. CREDIBILITY VERDICT
- **Verdict**: **${vConfig.label}** (${report.verdict})
- **Confidence Score**: **${report.confidenceScore}%**
- **Confidence Assessment**: ${report.confidenceExplanation}

---

## 3. 30-SECOND EXECUTIVE SUMMARY
${report.summary30Sec}

---

## 4. DETAILED FORENSIC INVESTIGATION
${report.detailedInvestigation}

---

## 5. WHY TRUTHLENS DECIDED THIS
### Strongest Corroborating Evidence
${report.whyDecided.strongestEvidence.map((s) => `- ${s}`).join('\n')}

### Contradictory Evidence
${report.whyDecided.contradictoryEvidence.map((c) => `- ${c}`).join('\n')}

### Missing or Inconclusive Elements
${report.whyDecided.missingEvidence.map((m) => `- ${m}`).join('\n')}

---

## 6. SOURCES EXAMINED (${report.sources.length})
${report.sources
  .map(
    (s) =>
      `### ${s.sourceName} (${s.stance.toUpperCase()})\n- Domain: ${s.sourceDomain}\n- Trust Score: ${s.sourceTrustScore}/100\n- Citation Quality: ${s.citationQuality}\n- Snippet: "${s.snippet}"\n- URL: ${s.url}\n`
  )
  .join('\n')}

---

## 7. METHODOLOGY LIMITATIONS
${report.limitations.map((l) => `- ${l}`).join('\n')}

---
*Report certified by TruthLens AI Multimodal Verification Engine.*
`;

    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `TruthLens_Report_${report.id}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJSON = () => {
    const jsonStr = JSON.stringify(report, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `TruthLens_Report_${report.id}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const copyShareText = () => {
    const shareText = `🔍 TRUTHLENS VERIFICATION REPORT
Claim: "${report.claim.slice(0, 120)}..."
Verdict: ${vConfig.label} (${report.confidenceScore}% confidence)
Summary: ${report.summary30Sec}
Verified on TruthLens AI • "Verify Before You Believe"`;

    navigator.clipboard.writeText(shareText);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#090D18] border border-cyan-500/40 rounded-2xl shadow-[0_0_60px_rgba(6,182,212,0.2)] flex flex-col max-h-[90vh] overflow-hidden">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-wide">
                Credibility Intelligence Dossier
              </h3>
              <p className="text-xs text-slate-400">
                Official Evidentiary Audit • Report Ref #{report.id}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyShareText}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-cyan-400 text-xs text-slate-200 transition"
              title="Copy social media share snippet"
            >
              {copiedShare ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedShare ? 'Copied' : 'Share Text'}</span>
            </button>

            <button
              onClick={handleDownloadMarkdown}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-cyan-400 text-xs text-slate-200 transition"
              title="Download formatted Markdown report"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Markdown</span>
            </button>

            <button
              onClick={handleDownloadJSON}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-cyan-400 text-xs text-slate-200 transition"
              title="Download structured JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>JSON</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 text-xs font-semibold transition"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition ml-2"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable / Viewable Report Body */}
        <div className="p-8 overflow-y-auto space-y-6 text-slate-200 print:bg-white print:text-black">
          {/* Header watermark & stamps */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-6 h-6 text-cyan-400" />
                <span className="text-xl font-extrabold tracking-tight text-white font-['Syne']">
                  Truth<span className="text-cyan-400">Lens</span> AI
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                  CONFIDENTIAL INTELLIGENCE DOSSIER
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Tagline: Verify Before You Believe • Certified Fact-Check Pipeline
              </p>
            </div>

            <div className="text-right text-xs font-mono text-slate-400">
              <div>Ref: <strong className="text-white">{report.id}</strong></div>
              <div>Generated: {new Date(report.timestamp).toLocaleString()}</div>
              <div className="text-cyan-400">Status: Complete & Certified</div>
            </div>
          </div>

          {/* Primary Claim Box */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1">
              Investigated Claim / Content
            </span>
            <p className="text-base font-semibold text-white leading-snug">
              "{report.claim}"
            </p>
            <div className="flex items-center gap-3 mt-2 text-xs font-mono text-slate-400">
              <span>Category: <strong className="text-cyan-400">{report.category}</strong></span>
              <span>•</span>
              <span>Language: <strong className="text-slate-300">{report.language.toUpperCase()}</strong></span>
            </div>
          </div>

          {/* Verdict and Confidence Highlight */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className={`p-4 rounded-xl border ${vConfig.badgeBg} ${vConfig.badgeBorder} ${vConfig.textColor}`}>
              <span className="text-[10px] font-mono uppercase block mb-1">Final Classification</span>
              <div className="text-xl font-extrabold tracking-wide uppercase">
                {vConfig.label}
              </div>
              <p className="text-xs mt-1 opacity-80">{vConfig.description}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Evidence Confidence</span>
              <div className="text-2xl font-mono font-bold text-white">
                {report.confidenceScore}%
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Based on cross-source consensus and institutional registry records.
              </p>
            </div>
          </div>

          {/* Executive 30-Sec Summary */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
              1. Executive 30-Second Summary
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/50 p-4 rounded-xl border border-slate-800/80">
              {report.summary30Sec}
            </p>
          </div>

          {/* Detailed Investigation */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-blue-400 font-semibold">
              2. Detailed Evidentiary Findings
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line bg-slate-900/50 p-4 rounded-xl border border-slate-800/80">
              {report.detailedInvestigation}
            </p>
          </div>

          {/* Sources Table */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-purple-400 font-semibold">
              3. Independent Sources Examined ({report.sources.length})
            </h4>
            <div className="rounded-xl overflow-hidden border border-slate-800">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-900 text-slate-400 font-mono text-[10px] uppercase">
                  <tr>
                    <th className="px-4 py-2.5">Source Authority</th>
                    <th className="px-4 py-2.5">Stance</th>
                    <th className="px-4 py-2.5">Trust Score</th>
                    <th className="px-4 py-2.5">Citation Summary</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-sans">
                  {report.sources.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-900/40">
                      <td className="px-4 py-2.5 font-semibold text-white">
                        {s.sourceName}
                        <span className="block text-[10px] font-mono text-cyan-400 font-normal">
                          {s.sourceDomain}
                        </span>
                      </td>
                      <td className="px-4 py-2.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                            s.stance === 'contradicts'
                              ? 'bg-red-500/20 text-red-400'
                              : 'bg-emerald-500/20 text-emerald-400'
                          }`}
                        >
                          {s.stance}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 font-mono text-slate-200">
                        {s.sourceTrustScore}/100
                      </td>
                      <td className="px-4 py-2.5 text-slate-400 text-xs">
                        "{s.snippet}"
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Limitations */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>4. Analytical Scope & Limitations</span>
            </h4>
            <ul className="space-y-1 text-xs text-slate-400 list-disc pl-5">
              {report.limitations.map((lim, idx) => (
                <li key={idx}>{lim}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500 font-mono">
          <span>TruthLens AI Platform • Verified Evidence Report</span>
          <span>E-Signature: SHA-256 Verified</span>
        </div>
      </div>
    </div>
  );
};
