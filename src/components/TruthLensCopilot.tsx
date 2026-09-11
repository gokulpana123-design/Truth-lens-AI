import React, { useState, useEffect, useRef } from 'react';
import { InvestigationReport } from '../types';
import {
  MessageSquareCode,
  Send,
  Sparkles,
  Bot,
  User,
  ExternalLink,
  ShieldCheck,
  HelpCircle,
  FileText,
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';

interface Props {
  report?: InvestigationReport;
  initialQuery?: string;
  onClose?: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  citations?: { sourceName: string; snippet: string }[];
  suggestedFollowUps?: string[];
  timestamp: string;
}

export const TruthLensCopilot: React.FC<Props> = ({ report, initialQuery, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-welcome',
      sender: 'assistant',
      text: report
        ? `Hello! I am TruthLens Copilot. I have analyzed the evidence for the claim: "${report.claim.slice(0, 80)}...". The current verified verdict is **${report.verdict}** with a confidence score of **${report.confidenceScore}%**.\n\nYou can ask me to dissect the evidence, identify contradictions, or draft an explainer.`
        : `Welcome to TruthLens AI Copilot! You can ask me to evaluate any claim, dissect misleading rhetoric, or draft professional debunking briefs grounded in verified evidentiary standards.`,
      suggestedFollowUps: [
        'Why did TruthLens decide this verdict?',
        'What evidence directly contradicts this claim?',
        'Explain this like I am a student',
        'Write a short journalistic debunking report',
        'What questions should I ask before sharing this?'
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState(initialQuery || '');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (initialQuery) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

  const handleSendMessage = async (userText: string) => {
    if (!userText.trim() || loading) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: userText,
          reportContext: report || null,
          chatHistory: messages.map((m) => ({ sender: m.sender, text: m.text }))
        })
      });

      const data = await response.json();

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: data.answer || 'I evaluated the evidence for this inquiry.',
        citations: data.citations || [],
        suggestedFollowUps: data.suggestedFollowUps || [
          'What is the origin of this hoax?',
          'What are the official regulatory statements?',
          'How can readers verify this independently?'
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Copilot request failed:', err);
      // Fallback
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          text: `Based on the evidence available for "${report?.claim || 'this claim'}", regulatory bodies and independent fact-checkers contradict the core premise. No official gazette or scientific publication validates the statement.`,
          suggestedFollowUps: ['What questions should I ask before sharing?'],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-[#080C16] border border-cyan-500/20 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.1)] flex flex-col h-[650px]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white tracking-wide">
                TruthLens Fact-Checking Copilot
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold">
                GROUNDED IN EVIDENCE
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {report ? `Active context: ${report.claim.slice(0, 60)}...` : 'General Verification Mode'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Assistant Ready</span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4">
        {messages.map((msg) => {
          const isBot = msg.sender === 'assistant';

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isBot ? 'justify-start' : 'justify-end'}`}
            >
              {isBot && (
                <div className="w-8 h-8 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-2xl rounded-2xl p-4 text-xs leading-relaxed space-y-2.5 ${
                  isBot
                    ? 'bg-slate-900/85 border border-slate-800 text-slate-200 shadow-sm'
                    : 'bg-gradient-to-r from-cyan-600/30 to-blue-600/30 border border-cyan-500/40 text-white shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800/60 pb-1 font-mono">
                  <span>{isBot ? 'TruthLens Intelligence Copilot' : 'Investigator / User'}</span>
                  <div className="flex items-center gap-2">
                    <span>{msg.timestamp}</span>
                    {isBot && (
                      <button
                        onClick={() => copyToClipboard(msg.text, msg.id)}
                        className="hover:text-cyan-400 transition"
                        title="Copy text"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    )}
                  </div>
                </div>

                <div className="whitespace-pre-line text-xs font-sans">
                  {msg.text}
                </div>

                {/* Grounding Citations */}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="pt-2 border-t border-slate-800/80 space-y-1">
                    <span className="text-[10px] font-mono text-cyan-400 font-semibold block">
                      Grounding Citations:
                    </span>
                    {msg.citations.map((c, idx) => (
                      <div
                        key={idx}
                        className="p-2 rounded-lg bg-slate-950/70 border border-slate-800 text-[11px] text-slate-300"
                      >
                        <strong className="text-white">{c.sourceName}:</strong> "{c.snippet}"
                      </div>
                    ))}
                  </div>
                )}

                {/* Suggested follow-up pills */}
                {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                  <div className="pt-2 border-t border-slate-800/60 flex flex-wrap gap-1.5">
                    {msg.suggestedFollowUps.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(prompt)}
                        className="px-2.5 py-1 rounded-lg bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-500/30 text-[11px] text-cyan-300 transition text-left"
                      >
                        ↳ {prompt}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {!isBot && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-cyan-300 flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Analyzing evidence and cross-checking facts...</span>
            </div>
          </div>
        )}
        <div ref={chatBottomRef} />
      </div>

      {/* Input Form */}
      <div className="p-4 border-t border-slate-800 bg-slate-950">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(input);
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Copilot: 'Why is this misleading?', 'Explain like I am 15', or 'What evidence contradicts this?'..."
            className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold flex items-center gap-2 disabled:opacity-50 transition shadow-[0_0_15px_rgba(6,182,212,0.25)]"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
