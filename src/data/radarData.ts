import { RadarItem } from '../types';

export const RADAR_ITEMS: RadarItem[] = [
  {
    id: 'rad-1',
    claim: 'Viral audio clip claiming new telecom regulation records all calls and monitors social chats under cyber security code 404.',
    category: 'Cybersecurity & Tech',
    verdict: 'FALSE',
    confidenceScore: 99,
    velocity: 'Explosive',
    detectedTime: '12 mins ago',
    region: 'Delhi, Maharashtra, Karnataka',
    language: 'Hindi / English / Marathi',
    sharesEstimated: '240,000+',
    isManipulatedMedia: true,
    sourcePlatforms: ['WhatsApp', 'X', 'ShareChat'],
    reportSnippet: 'Department of Telecommunications (DoT) clarified that code numbers like 404 are standard HTTP server error responses, not surveillance acts.'
  },
  {
    id: 'rad-2',
    claim: 'Viral photo claiming UNESCO declared the national anthem of India as the best national anthem in the world.',
    category: 'National Heritage & Culture',
    verdict: 'FALSE',
    confidenceScore: 99,
    velocity: 'Declining',
    detectedTime: '2 hours ago',
    region: 'Pan-India',
    language: 'English / Hindi / Bengali / Tamil',
    sharesEstimated: '1.2M+ (Recycled since 2008)',
    isManipulatedMedia: false,
    sourcePlatforms: ['WhatsApp Forwards', 'Facebook'],
    reportSnippet: 'UNESCO confirmed multiple times since 2008 that it does not hold contests or rank national anthems of sovereign countries.'
  },
  {
    id: 'rad-3',
    claim: 'Satellite imagery shows unseasonal glacial lake outburst flood threat near Chamoli sector.',
    category: 'Climate & Environment',
    verdict: 'MOSTLY_SUPPORTED',
    confidenceScore: 91,
    velocity: 'Rapid',
    detectedTime: '3 hours ago',
    region: 'Uttarakhand, Himalayas',
    language: 'English / Hindi',
    sharesEstimated: '85,000+',
    isManipulatedMedia: false,
    sourcePlatforms: ['X', 'Telegram Geology Channels'],
    reportSnippet: 'ISRO National Remote Sensing Centre (NRSC) monitoring confirms seasonal ice thaw expansion with controlled sluice discharge.'
  },
  {
    id: 'rad-4',
    claim: 'AI deepfake video of regional film star endorsing an unregulated offshore online gambling application.',
    category: 'E-Fraud & Deepfakes',
    verdict: 'MANIPULATED_MEDIA',
    confidenceScore: 98,
    velocity: 'Explosive',
    detectedTime: '4 hours ago',
    region: 'Andhra Pradesh & Telangana',
    language: 'Telugu',
    sharesEstimated: '520,000+',
    isManipulatedMedia: true,
    sourcePlatforms: ['Instagram Reels', 'YouTube Shorts', 'Telegram'],
    reportSnippet: 'Acoustic waveform analysis and face-swap seam boundary confirms synthetic generation. The actor issued a public legal warning.'
  },
  {
    id: 'rad-5',
    claim: 'Government scheme providing ₹5,000 monthly allowance for students passing 10th standard under new digital literacy portal.',
    category: 'Government Schemes & Welfare',
    verdict: 'FALSE',
    confidenceScore: 96,
    velocity: 'Rapid',
    detectedTime: '6 hours ago',
    region: 'Uttar Pradesh, Bihar, Madhya Pradesh',
    language: 'Hindi',
    sharesEstimated: '310,000+',
    isManipulatedMedia: false,
    sourcePlatforms: ['WhatsApp', 'Facebook Pages', 'YouTube Tutorials'],
    reportSnippet: 'Phishing domain attempting to harvest Aadhaar numbers and bank credentials. Flagged by Indian Cyber Crime Coordination Centre (I4C).'
  },
  {
    id: 'rad-6',
    claim: 'New strain of seasonal respiratory virus detected in southern coastal belts causing atypical symptoms.',
    category: 'Public Health',
    verdict: 'INSUFFICIENT_EVIDENCE',
    confidenceScore: 68,
    velocity: 'Steady',
    detectedTime: '8 hours ago',
    region: 'Kerala, Coastal Karnataka',
    language: 'Malayalam / English / Kannada',
    sharesEstimated: '42,000+',
    isManipulatedMedia: false,
    sourcePlatforms: ['WhatsApp Groups', 'Local Portals'],
    reportSnippet: 'ICMR and State Health Department genomic surveillance samples are currently undergoing sequencing; no conclusive alert issued.'
  },
  {
    id: 'rad-7',
    claim: 'Old video from 2019 earthquake in Indonesia recirculated as live visuals of recent tremor in North-East India.',
    category: 'Disaster & Weather Hoaxes',
    verdict: 'MISLEADING',
    confidenceScore: 97,
    velocity: 'Steady',
    detectedTime: '11 hours ago',
    region: 'Assam, Meghalaya, West Bengal',
    language: 'Assamese / Bengali / English',
    sharesEstimated: '115,000+',
    isManipulatedMedia: true,
    sourcePlatforms: ['X', 'Facebook', 'Moj'],
    reportSnippet: 'Reverse video frame search traces footage to Palu, Indonesia tsunami & liquefaction disaster from September 2018.'
  }
];

export interface RegionHotspot {
  id: string;
  name: string;
  code: string;
  lat: number;
  lng: number;
  alertLevel: 'Critical' | 'Elevated' | 'Guarded';
  activeNarrativesCount: number;
  topCategory: string;
  viralLanguage: string;
  primaryPlatform: string;
}

export const REGION_HOTSPOTS: RegionHotspot[] = [
  { id: 'h-1', name: 'Delhi NCR', code: 'DL', lat: 28.6139, lng: 77.2090, alertLevel: 'Elevated', activeNarrativesCount: 42, topCategory: 'Governance & Policy', viralLanguage: 'Hindi / English', primaryPlatform: 'WhatsApp / X' },
  { id: 'h-2', name: 'Maharashtra (Mumbai-Pune)', code: 'MH', lat: 19.0760, lng: 72.8777, alertLevel: 'Critical', activeNarrativesCount: 58, topCategory: 'Finance & Banking scams', viralLanguage: 'Marathi / Hindi', primaryPlatform: 'Telegram / WhatsApp' },
  { id: 'h-3', name: 'Tamil Nadu (Chennai-Madurai)', code: 'TN', lat: 13.0827, lng: 80.2707, alertLevel: 'Elevated', activeNarrativesCount: 36, topCategory: 'Deepfakes & Regional Politics', viralLanguage: 'Tamil', primaryPlatform: 'Reels / ShareChat' },
  { id: 'h-4', name: 'Telangana & AP (Hyderabad)', code: 'TS-AP', lat: 17.3850, lng: 78.4867, alertLevel: 'Critical', activeNarrativesCount: 49, topCategory: 'Celebrity Deepfakes & Betting', viralLanguage: 'Telugu', primaryPlatform: 'YouTube Shorts / WhatsApp' },
  { id: 'h-5', name: 'West Bengal (Kolkata)', code: 'WB', lat: 22.5726, lng: 88.3639, alertLevel: 'Elevated', activeNarrativesCount: 31, topCategory: 'Recycled Disaster Videos', viralLanguage: 'Bengali / Hindi', primaryPlatform: 'Facebook / WhatsApp' },
  { id: 'h-6', name: 'Karnataka (Bengaluru)', code: 'KA', lat: 12.9716, lng: 77.5946, alertLevel: 'Guarded', activeNarrativesCount: 24, topCategory: 'Cyber Phishing & Crypto', viralLanguage: 'Kannada / English', primaryPlatform: 'WhatsApp / LinkedIn' },
  { id: 'h-7', name: 'Gujarat (Ahmedabad-Surat)', code: 'GJ', lat: 23.0225, lng: 72.5714, alertLevel: 'Elevated', activeNarrativesCount: 38, topCategory: 'Gold/Currency Rumors', viralLanguage: 'Gujarati / Hindi', primaryPlatform: 'WhatsApp Business' },
  { id: 'h-8', name: 'Punjab (Amritsar-Chandigarh)', code: 'PB', lat: 31.6340, lng: 74.8723, alertLevel: 'Guarded', activeNarrativesCount: 19, topCategory: 'Immigration & Visa Fraud', viralLanguage: 'Punjabi', primaryPlatform: 'Telegram / WhatsApp' },
  { id: 'h-9', name: 'Assam & North-East', code: 'NE', lat: 26.1445, lng: 91.7362, alertLevel: 'Guarded', activeNarrativesCount: 17, topCategory: 'Recycled Natural Disaster Footage', viralLanguage: 'Assamese / Bengali', primaryPlatform: 'Facebook Groups' }
];
