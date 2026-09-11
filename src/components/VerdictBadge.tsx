import React from 'react';
import { VerdictType } from '../types';
import { VERDICT_CONFIGS } from '../data/verdictConfig';
import {
  CheckCircle2,
  CheckCheck,
  AlertTriangle,
  HelpCircle,
  XCircle,
  Sparkles,
  Slash,
  Info,
  ShieldAlert
} from 'lucide-react';

interface Props {
  verdict: VerdictType;
  confidenceScore: number;
  confidenceExplanation?: string;
  language?: string;
  size?: 'sm' | 'md' | 'lg';
  showConfidence?: boolean;
}

const iconMap = {
  CheckCircle2,
  CheckCheck,
  AlertTriangle,
  HelpCircle,
  XCircle,
  Sparkles,
  Slash,
};

export const VerdictBadge: React.FC<Props> = ({
  verdict,
  confidenceScore,
  confidenceExplanation,
  language = 'en',
  size = 'md',
  showConfidence = true,
}) => {
  const config = VERDICT_CONFIGS[verdict] || VERDICT_CONFIGS.UNVERIFIED;
  const IconComponent = iconMap[config.icon as keyof typeof iconMap] || AlertTriangle;

  const nativeLabel = config.nativeLabels?.[language] || config.label;

  const sizeClasses = {
    sm: {
      badge: 'px-2.5 py-1 text-xs gap-1.5',
      icon: 'w-3.5 h-3.5',
      meterSize: 44,
      meterStroke: 3,
    },
    md: {
      badge: 'px-3.5 py-1.5 text-sm gap-2',
      icon: 'w-4 h-4',
      meterSize: 52,
      meterStroke: 4,
    },
    lg: {
      badge: 'px-5 py-2.5 text-base gap-3',
      icon: 'w-6 h-6',
      meterSize: 68,
      meterStroke: 5,
    },
  }[size];

  // Circle parameters
  const radius = (sizeClasses.meterSize - sizeClasses.meterStroke * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (confidenceScore / 100) * circumference;

  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Glow Badge */}
      <div
        className={`inline-flex items-center rounded-xl border font-bold uppercase tracking-wider transition-all duration-300 ${config.badgeBg} ${config.badgeBorder} ${config.textColor} ${config.glowColor} ${sizeClasses.badge}`}
      >
        <IconComponent className={`${sizeClasses.icon} shrink-0 animate-pulse`} />
        <span>{nativeLabel}</span>
        {nativeLabel !== config.label && (
          <span className="text-[10px] font-mono opacity-60 normal-case">
            ({config.label})
          </span>
        )}
      </div>

      {/* Confidence Meter Circular Gauge */}
      {showConfidence && (
        <div className="flex items-center gap-3 bg-slate-900/60 border border-slate-800/80 px-3 py-1.5 rounded-xl">
          <div className="relative flex items-center justify-center">
            <svg
              width={sizeClasses.meterSize}
              height={sizeClasses.meterSize}
              className="-rotate-90"
            >
              {/* Track */}
              <circle
                cx={sizeClasses.meterSize / 2}
                cy={sizeClasses.meterSize / 2}
                r={radius}
                stroke="#1E293B"
                strokeWidth={sizeClasses.meterStroke}
                fill="transparent"
              />
              {/* Progress */}
              <circle
                cx={sizeClasses.meterSize / 2}
                cy={sizeClasses.meterSize / 2}
                r={radius}
                stroke={config.color}
                strokeWidth={sizeClasses.meterStroke}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xs font-mono font-extrabold text-white">
                {confidenceScore}%
              </span>
            </div>
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center gap-1">
              <span className="text-xs font-semibold text-slate-200">Confidence Score</span>
              <div
                className="group relative cursor-pointer text-slate-400 hover:text-cyan-400"
                title="Confidence is calculated from cross-source agreement, source trust tiers, and forensic artifact signals. It does not equal absolute factual certainty."
              >
                <Info className="w-3.5 h-3.5" />
              </div>
            </div>
            <p className="text-[10px] text-slate-400 font-mono">
              Heuristic agreement level
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
