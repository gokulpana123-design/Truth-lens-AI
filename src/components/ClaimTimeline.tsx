import React from 'react';
import { TimelineEvent } from '../types';
import {
  Clock,
  Radio,
  Share2,
  AlertTriangle,
  CheckCircle2,
  Repeat,
  Zap,
  Flame,
  ArrowRight
} from 'lucide-react';

interface Props {
  timeline: TimelineEvent[];
}

export const ClaimTimeline: React.FC<Props> = ({ timeline = [] }) => {
  const getStageIcon = (stage: TimelineEvent['stage']) => {
    switch (stage) {
      case 'detected':
        return { icon: Radio, color: 'text-cyan-400', bg: 'bg-cyan-500/15 border-cyan-500/30' };
      case 'major_media':
        return { icon: Zap, color: 'text-blue-400', bg: 'bg-blue-500/15 border-blue-500/30' };
      case 'social_amplification':
        return { icon: Flame, color: 'text-orange-400', bg: 'bg-orange-500/15 border-orange-500/30' };
      case 'factcheck_correction':
        return { icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/15 border-emerald-500/30' };
      case 'current_status':
        return { icon: Clock, color: 'text-purple-400', bg: 'bg-purple-500/15 border-purple-500/30' };
      default:
        return { icon: Clock, color: 'text-slate-400', bg: 'bg-slate-500/15 border-slate-500/30' };
    }
  };

  return (
    <div className="bg-[#080C16] border border-cyan-500/20 rounded-2xl p-6 shadow-[0_0_40px_rgba(6,182,212,0.08)]">
      {/* Header */}
      <div className="flex items-center justify-between pb-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
              Claim Evolution & Chronological Timeline
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
                Temporal Forensics
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Tracing narrative trajectory from initial dark web / messaging seed to social virality and verified debunk.
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 font-mono">
          <Repeat className="w-3.5 h-3.5 text-cyan-400" />
          <span>Recycled Narrative Detection: Active</span>
        </div>
      </div>

      {/* Timeline Steps */}
      <div className="relative mt-8">
        {/* Connecting Vertical Track for mobile / stacked view */}
        <div className="absolute top-4 left-6 bottom-4 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-emerald-500 hidden sm:block -z-0" />

        <div className="space-y-6 sm:space-y-8 relative z-10">
          {timeline.map((event, idx) => {
            const { icon: StageIcon, color, bg } = getStageIcon(event.stage);

            return (
              <div key={event.id || idx} className="flex items-start gap-4 sm:gap-6 group">
                {/* Milestone Node Badge */}
                <div
                  className={`relative flex items-center justify-center w-12 h-12 rounded-2xl border ${bg} ${color} shrink-0 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition duration-300`}
                >
                  <StageIcon className="w-5 h-5" />
                  <span className="absolute -bottom-1 -right-1 text-[9px] font-mono font-bold px-1 rounded bg-slate-900 border border-slate-700 text-slate-300">
                    0{idx + 1}
                  </span>
                </div>

                {/* Event Card */}
                <div className="flex-1 p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 group-hover:border-slate-700 transition">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                    <h4 className="font-bold text-white text-sm sm:text-base group-hover:text-cyan-300 transition">
                      {event.title}
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-cyan-400">
                        {event.timestamp}
                      </span>
                      {event.viralVelocity && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-500/15 text-orange-400 border border-orange-500/30">
                          {event.viralVelocity}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-2">
                    {event.description}
                  </p>

                  {event.sourceName && (
                    <div className="text-[11px] text-slate-400 font-mono">
                      Source Vector: <span className="text-slate-200 font-semibold">{event.sourceName}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
