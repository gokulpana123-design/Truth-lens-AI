export type VerdictType =
  | 'VERIFIED'
  | 'MOSTLY_SUPPORTED'
  | 'MISLEADING'
  | 'UNVERIFIED'
  | 'FALSE'
  | 'MANIPULATED_MEDIA'
  | 'INSUFFICIENT_EVIDENCE';

export interface VerdictConfig {
  label: string;
  nativeLabels?: Record<string, string>;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  textColor: string;
  glowColor: string;
  icon: string;
  description: string;
}

export interface SubClaim {
  id: string;
  text: string;
  verdict: VerdictType;
  evidenceSummary: string;
  confidence: number;
}

export interface EvidenceItem {
  id: string;
  sourceName: string;
  sourceDomain: string;
  sourceTier: 'primary' | 'secondary' | 'factchecker' | 'official' | 'social_archive';
  sourceTrustScore: number; // 0 - 100
  stance: 'supports' | 'contradicts' | 'neutral' | 'context_only';
  snippet: string;
  url: string;
  publishDate: string;
  author?: string;
  citationQuality: 'High' | 'Moderate' | 'Low' | 'Uncited';
  biasRating: 'Minimal' | 'Leaning' | 'Polarized' | 'Neutral/Fact-check' | 'Unknown';
  transparencyScore: number; // 0 - 100
  reliabilitySignals: string[];
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'claim' | 'subclaim' | 'source' | 'evidence_support' | 'evidence_contradict' | 'verdict';
  details?: string;
  score?: number;
  confidence?: number;
  x?: number;
  y?: number;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  type: 'supports' | 'contradicts' | 'cites' | 'derives';
}

export interface TimelineEvent {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  stage: 'detected' | 'major_media' | 'social_amplification' | 'factcheck_correction' | 'current_status';
  sourceName?: string;
  viralVelocity?: 'Low' | 'Moderate' | 'High' | 'Viral / Explosive' | 'Declining';
}

export interface ManipulationIndicator {
  name: string;
  score: number; // 0 - 100
  details: string;
  severity: 'low' | 'medium' | 'high';
}

export interface MediaForensics {
  mediaType: 'image' | 'video' | 'url_preview' | 'none';
  mediaUrl?: string;
  mediaName?: string;
  aiGeneratedRisk: number; // 0 - 100
  aiRiskSummary: string;
  manipulationIndicators: ManipulationIndicator[];
  metadataExtracted: Record<string, string>;
  reverseSearchMatches: {
    source: string;
    date: string;
    title: string;
    url: string;
    matchConfidence: number;
  }[];
  keyFrames?: {
    time: string;
    description: string;
    anomalyFlag: boolean;
    visualClue: string;
    thumbnailColor?: string;
  }[];
  crossModalConsistency: {
    consistent: boolean;
    score: number; // 0 - 100
    contradictionDetails?: string;
  };
}

export interface RegionalContext {
  region: string;
  viralPlatforms: string[];
  isWhatsAppForwardPattern?: boolean;
  officialFactChecks?: string[];
  regionalAlertLevel?: 'Normal' | 'Elevated' | 'Critical';
}

export interface InvestigationReport {
  id: string;
  claim: string;
  language: string;
  originalLanguage?: string;
  translatedClaim?: string;
  category: string;
  verdict: VerdictType;
  confidenceScore: number; // 0 - 100
  confidenceExplanation: string;
  summary30Sec: string;
  detailedInvestigation: string;
  expertEvidenceView: string;
  whyDecided: {
    strongestEvidence: string[];
    contradictoryEvidence: string[];
    missingEvidence: string[];
    reasoningFactors: string[];
  };
  subClaims: SubClaim[];
  sources: EvidenceItem[];
  graphData: {
    nodes: GraphNode[];
    edges: GraphEdge[];
  };
  timeline: TimelineEvent[];
  mediaForensics?: MediaForensics;
  limitations: string[];
  timestamp: string;
  isDemo: boolean;
  regionalContext?: RegionalContext;
}

export interface IndianLanguage {
  code: string;
  name: string;
  nativeName: string;
  script: string;
  region: string;
  speakersCount: string;
}

export interface RadarItem {
  id: string;
  claim: string;
  category: string;
  verdict: VerdictType;
  confidenceScore: number;
  velocity: 'Explosive' | 'Rapid' | 'Steady' | 'Declining';
  detectedTime: string;
  region: string;
  language: string;
  sharesEstimated: string;
  isManipulatedMedia: boolean;
  sourcePlatforms: string[];
  reportSnippet: string;
}

export interface CopilotMessage {
  id: string;
  sender: 'user' | 'copilot';
  text: string;
  timestamp: string;
  citations?: { sourceName: string; snippet: string }[];
  suggestedFollowUps?: string[];
}
