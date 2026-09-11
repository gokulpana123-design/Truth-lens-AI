import { InvestigationReport } from '../types';

export const DEMO_INVESTIGATIONS: InvestigationReport[] = [
  {
    id: 'demo-rbi-500-notes',
    claim: 'Reserve Bank of India (RBI) is demonetizing ₹500 currency notes and introducing new ₹1000 smart notes from next month, claims viral circular.',
    language: 'en',
    originalLanguage: 'hi',
    translatedClaim: 'भारतीय रिज़र्व बैंक (RBI) ₹500 के करेंसी नोट बंद कर रहा है और अगले महीने से नए ₹1000 के स्मार्ट नोट जारी करेगा, ऐसा वायरल परिपत्र में दावा किया गया है।',
    category: 'Finance & Governance / Economy',
    verdict: 'FALSE',
    confidenceScore: 98,
    confidenceExplanation: 'High confidence derived from direct contradiction by official statutory circulars from the Reserve Bank of India and a formal debunk from PIB Fact Check.',
    summary30Sec: 'The viral claim that RBI is demonetizing the ₹500 denomination is completely baseless. No such notification has been issued by the Ministry of Finance or RBI. The attached PDF document is a doctored graphic reusing 2016 formatting with spurious font variations and fake signature stamps.',
    detailedInvestigation: 'This viral rumor emerged across WhatsApp groups in northern and western India with a "Forwarded many times" banner, attaching an image of an alleged official gazette notification dated 15 days in the future. Our cross-source verification checked the RBI Notifications Gazette (rbi.org.in), Central Board of Direct Taxes (CBDT), and parliamentary question answers. RBI explicitly reaffirmed that all ₹500 currency notes in circulation remain legal tender. Furthermore, the circulating graphic exhibits typographic inconsistencies, misspelled legal terminology ("Gazette of India" spelled with incorrect typeface spacing), and uses a decommissioned signature block.',
    expertEvidenceView: 'Forensic audit of the viral JPG shows compressed artifacting around the header date text, indicating secondary text injection over a 2018 notification template. Spectral hashing of the seal confirms non-alignment with the official Ashoka emblem vector standards. Cryptographic hashing against the National Informatics Centre (NIC) gazette repository (egazette.gov.in) yielded zero hits.',
    whyDecided: {
      strongestEvidence: [
        'Direct press statement by RBI spokesperson confirming ₹500 notes remain unconditional legal tender.',
        'PIB Fact Check release (ID: 198421) officially categorizing the viral letter as counterfeit.',
        'Total absence of any gazette notification under Section 24 or 26 of the RBI Act, 1934.'
      ],
      contradictoryEvidence: [
        'The viral message claims the decision was published in "Extraordinary Gazette Vol. 412", but official archives show Vol. 412 pertained exclusively to Ministry of Agriculture fertilizer subsidies.'
      ],
      missingEvidence: [
        'No parliamentary gazette listing.',
        'No scheduled banking system advisory or automated teller machine (ATM) recalibration directives.'
      ],
      reasoningFactors: [
        'Statutory requirement: Any change in currency denomination mandates formal statutory orders tabled before Parliament.',
        'Forensic tampering: Visual inspection indicates layered digital manipulation of the document header.',
        'Social velocity pattern mirrors recurrent panic-driven recycling seen in 2019 and 2022.'
      ]
    },
    subClaims: [
      {
        id: 'sub-1',
        text: 'RBI has issued a notification withdrawing ₹500 currency notes from circulation.',
        verdict: 'FALSE',
        evidenceSummary: 'Directly refuted by official RBI notifications repository and Governor press address.',
        confidence: 99
      },
      {
        id: 'sub-2',
        text: 'New ₹1000 currency notes with microchip tracking are being released next month.',
        verdict: 'FALSE',
        evidenceSummary: 'The myth of "GPS/microchip notes" has been repeatedly debunked by technologists and central banks worldwide.',
        confidence: 97
      },
      {
        id: 'sub-3',
        text: 'The circulating document is an official government gazette excerpt.',
        verdict: 'MANIPULATED_MEDIA',
        evidenceSummary: 'Digital forensics revealed cloned background noise, pasted signatures, and incorrect Ministry fonts.',
        confidence: 96
      }
    ],
    sources: [
      {
        id: 'src-1',
        sourceName: 'Reserve Bank of India (RBI)',
        sourceDomain: 'rbi.org.in',
        sourceTier: 'official',
        sourceTrustScore: 99,
        stance: 'contradicts',
        snippet: 'Press Release: "The Reserve Bank clarifies that reports circulating in sections of media and social media regarding withdrawal of ₹500 banknotes are completely false. The banknotes continue to be legal tender."',
        url: 'https://rbi.org.in/scripts/BS_PressReleaseDisplay.aspx',
        publishDate: '2026-03-02',
        author: 'Chief General Manager, Department of Communication',
        citationQuality: 'High',
        biasRating: 'Neutral/Fact-check',
        transparencyScore: 98,
        reliabilitySignals: ['Statutory Central Bank Body', 'Cryptographically signed release', 'Primary regulatory authority']
      },
      {
        id: 'src-2',
        sourceName: 'PIB Fact Check (Govt of India)',
        sourceDomain: 'pib.gov.in',
        sourceTier: 'factchecker',
        sourceTrustScore: 95,
        stance: 'contradicts',
        snippet: 'A fake notification claiming the discontinuation of ₹500 banknotes is being shared on social platforms. Beware of fraudulent notices.',
        url: 'https://pib.gov.in/factcheck',
        publishDate: '2026-03-02',
        author: 'Press Information Bureau Verification Cell',
        citationQuality: 'High',
        biasRating: 'Neutral/Fact-check',
        transparencyScore: 94,
        reliabilitySignals: ['Official Government Fact Checker', 'Cross-referenced against Ministry of Finance databases']
      },
      {
        id: 'src-3',
        sourceName: 'BOOM Live Fact Check',
        sourceDomain: 'boomlive.in',
        sourceTier: 'factchecker',
        sourceTrustScore: 92,
        stance: 'contradicts',
        snippet: 'BOOM analyzed the viral PDF: the signature attributed to the Finance Secretary was lifted from a 2017 circular on provident fund interest rates.',
        url: 'https://boomlive.in/fact-check/rbi-500-currency-notes-fake-circular',
        publishDate: '2026-03-03',
        author: 'Senior Fact Checker, Economy Desk',
        citationQuality: 'High',
        biasRating: 'Neutral/Fact-check',
        transparencyScore: 91,
        reliabilitySignals: ['IFCN Verified Signatory', 'Detailed reverse image and metadata breakdown']
      },
      {
        id: 'src-4',
        sourceName: 'Anonymous Telegram Forwarding Hub',
        sourceDomain: 't.me/viral_indian_updates',
        sourceTier: 'social_archive',
        sourceTrustScore: 12,
        stance: 'supports',
        snippet: 'Urgent notice to all citizens: Exchange your 500 notes immediately before the deadline or face loss.',
        url: 'https://t.me/viral_indian_updates/post/8821',
        publishDate: '2026-03-01',
        author: 'Anonymous admin',
        citationQuality: 'Uncited',
        biasRating: 'Unknown',
        transparencyScore: 10,
        reliabilitySignals: ['No attribution', 'Sensational urgency phrasing', 'Clickbait call to action']
      }
    ],
    graphData: {
      nodes: [
        { id: 'n-claim', label: 'Claim: ₹500 Notes Demonetized', type: 'claim', details: 'Viral forward claiming withdrawal of notes next month', score: 10, confidence: 98 },
        { id: 'n-sub1', label: 'Sub-claim: RBI Circular', type: 'subclaim', details: 'Alleged RBI gazette issued', score: 8, confidence: 99 },
        { id: 'n-sub2', label: 'Sub-claim: ₹1000 Replacement', type: 'subclaim', details: 'Introduction of chip note', score: 5, confidence: 97 },
        { id: 'n-rbi', label: 'RBI Official Directive', type: 'source', details: 'Legal tender confirmation by Central Bank', score: 99, confidence: 99 },
        { id: 'n-pib', label: 'PIB Fact Check', type: 'source', details: 'Verified debunk by government press cell', score: 95, confidence: 95 },
        { id: 'n-boom', label: 'BOOM Live Forensics', type: 'evidence_contradict', details: 'Signature lifted from 2017 circular', score: 92, confidence: 93 },
        { id: 'n-social', label: 'Telegram Viral Loop', type: 'evidence_support', details: 'Unverified forward with panic messaging', score: 12, confidence: 15 },
        { id: 'n-verdict', label: 'Verdict: FALSE / CONTRADICTED', type: 'verdict', details: 'Refuted by 3 independent primary databases', score: 98, confidence: 98 }
      ],
      edges: [
        { id: 'e1', source: 'n-claim', target: 'n-sub1', label: 'decomposes into', type: 'derives' },
        { id: 'e2', source: 'n-claim', target: 'n-sub2', label: 'decomposes into', type: 'derives' },
        { id: 'e3', source: 'n-rbi', target: 'n-sub1', label: 'direct refutation', type: 'contradicts' },
        { id: 'e4', source: 'n-pib', target: 'n-claim', label: 'official debunk', type: 'contradicts' },
        { id: 'e5', source: 'n-boom', target: 'n-sub1', label: 'forensic forgery match', type: 'contradicts' },
        { id: 'e6', source: 'n-social', target: 'n-claim', label: 'originated from', type: 'supports' },
        { id: 'e7', source: 'n-rbi', target: 'n-verdict', label: 'conclusive basis', type: 'contradicts' },
        { id: 'e8', source: 'n-boom', target: 'n-verdict', label: 'corroborates debunk', type: 'contradicts' }
      ]
    },
    timeline: [
      {
        id: 't-1',
        timestamp: 'March 1, 09:14 IST',
        title: 'Initial Emergence on Regional Telegram & WhatsApp',
        description: 'First spotted on localized trading channels in Mumbai and Ahmedabad as a low-resolution screenshot.',
        stage: 'detected',
        sourceName: 'Regional Forward Monitor',
        viralVelocity: 'Moderate'
      },
      {
        id: 't-2',
        timestamp: 'March 1, 16:30 IST',
        title: 'Exponential Social Amplification',
        description: 'Over 25,000 shares across X (formerly Twitter) and Facebook with alarmed captions asking if bank queues would resume.',
        stage: 'social_amplification',
        sourceName: 'Social Velocity Tracker',
        viralVelocity: 'Viral / Explosive'
      },
      {
        id: 't-3',
        timestamp: 'March 2, 11:00 IST',
        title: 'Official Clarification by Reserve Bank of India',
        description: 'RBI issues unambiguous bulletin stating ₹500 notes remain 100% legal tender and advising citizens to avoid panic.',
        stage: 'major_media',
        sourceName: 'Reserve Bank of India PR',
        viralVelocity: 'High'
      },
      {
        id: 't-4',
        timestamp: 'March 2, 14:15 IST',
        title: 'PIB Fact Check & Independent Fact-checkers Debunk',
        description: 'Forensic breakdown published identifying doctored font elements and mismatched document serial numbers.',
        stage: 'factcheck_correction',
        sourceName: 'PIB & BOOM Live',
        viralVelocity: 'Moderate'
      },
      {
        id: 't-5',
        timestamp: 'Current Status',
        title: 'Contradicted & Flagged Across Networks',
        description: 'Claim classified as completely false. Major social platforms tagged post with fact-check advisory overlays.',
        stage: 'current_status',
        sourceName: 'TruthLens Multi-Network Telemetry',
        viralVelocity: 'Declining'
      }
    ],
    mediaForensics: {
      mediaType: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=800&auto=format&fit=crop&q=80',
      mediaName: 'alleged_rbi_notification_circular.jpg',
      aiGeneratedRisk: 34,
      aiRiskSummary: 'Traditional composite digital editing (photoshop stamp & text splicing) rather than pure generative AI synthesis.',
      manipulationIndicators: [
        { name: 'Error Level Analysis (ELA)', score: 89, details: 'High compression difference in date header block compared to surrounding parchment background.', severity: 'high' },
        { name: 'Typography Font Mismatch', score: 94, details: 'Header uses Arial font whereas government gazettes legally mandate specialized Monotype serif fonts.', severity: 'high' },
        { name: 'Cloned Noise Distribution', score: 82, details: 'Signature block has identical Gaussian noise gradient to an un-related 2017 Ministry of Finance circular.', severity: 'medium' }
      ],
      metadataExtracted: {
        'Camera/Software': 'Adobe Photoshop 24.1 (Windows)',
        'Original Modify Date': '2026-03-01 07:12:44',
        'Color Profile': 'sRGB IEC61966-2.1',
        'Resolution': '72 DPI (Standard screen rip, not official 300 DPI vector PDF print)'
      },
      reverseSearchMatches: [
        { source: 'Ministry of Finance Archives', date: '2017-06-18', title: 'Circular No. 14/2017: Provident Fund Revision Notice', url: 'https://finmin.nic.in/archive-2017', matchConfidence: 96 },
        { source: 'Factly India', date: '2022-11-10', title: 'Recurring Hoax on ₹500 Note Ban', url: 'https://factly.in/debunk-currency', matchConfidence: 91 }
      ],
      crossModalConsistency: {
        consistent: false,
        score: 15,
        contradictionDetails: 'Text asserts upcoming official mandate; image document exhibits counterfeit layout and dates contradicting live Gazette records.'
      }
    },
    limitations: [
      'Analysis is focused on official Indian regulatory and statutory declarations.',
      'Cannot track completely closed peer-to-peer encrypted group conversations except via public crowdsourced fact-check submissions.'
    ],
    timestamp: '2026-03-03T10:45:00Z',
    isDemo: true,
    regionalContext: {
      region: 'Western & Northern India (Maharashtra, Gujarat, Delhi-NCR, UP)',
      viralPlatforms: ['WhatsApp', 'Telegram', 'Facebook Groups', 'X'],
      isWhatsAppForwardPattern: true,
      officialFactChecks: ['PIB Fact Check ID #198421', 'RBI Public Awareness Bulletin #82'],
      regionalAlertLevel: 'Elevated'
    }
  },
  {
    id: 'demo-aditya-l1-solar-aurora',
    claim: 'ISRO Aditya-L1 solar observatory detected a major CME solar eruption, leading to rare geomagnetic auroral displays visible over Ladakh and Hanle in India.',
    language: 'en',
    category: 'Science & Space / Astronomy',
    verdict: 'MOSTLY_SUPPORTED',
    confidenceScore: 94,
    confidenceExplanation: 'Strong corroboration between ISRO scientific payloads (SUIT, ASPEX) and the Indian Astronomical Observatory at Hanle, with minor popular overstatements regarding aurora visibility to the naked eye.',
    summary30Sec: 'The core event is scientifically verified. ISRO\'s Aditya-L1 spacecraft at Lagrange point L1 successfully captured coronal mass ejections (CMEs) that interacted with Earth\'s magnetosphere, producing auroral arcs recorded by all-sky cameras at Hanle, Ladakh. Minor exaggeration exists in viral social posts claiming intense visible green auroras over suburban North India.',
    detailedInvestigation: 'On March 8, 2026, ISRO\'s Solar Ultraviolet Imaging Telescope (SUIT) and ASPEX instruments registered an X-class solar flare followed by high-speed plasma ejection. The Indian Institute of Astrophysics (IIA) confirmed that its high-altitude robotic all-sky camera at the Indian Astronomical Observatory (IAO) in Hanle, Ladakh (altitude 4,500m) detected intense SAR (Stable Auroral Red) arcs between 01:00 and 03:30 IST. International space weather agencies including NOAA\'s Space Weather Prediction Center (SWPC) and ESA corroborated the G4-class geomagnetic storm index.',
    expertEvidenceView: 'Magnetometer readings from Hanle exhibited horizontal component drops of ~280 nT. Solar wind speed peaked at 785 km/s with magnetic field Bz dipping to -22 nT. The event is thoroughly grounded in peer-reviewed telemetry.',
    whyDecided: {
      strongestEvidence: [
        'Direct mission telemetry released by ISRO Space Science Data Centre (ISSDC).',
        'Time-lapse observations from the Indian Institute of Astrophysics Hanle observatory.',
        'Independent confirmation by NOAA Space Weather Prediction Center (G4 Warning Alert).'
      ],
      contradictoryEvidence: [
        'Social media posts claiming bright green curtains visible to the unaided naked eye in Delhi or Chandigarh are false; the display was red SAR arc emissions recorded via long-exposure sensors in ultra-dark high altitude.'
      ],
      missingEvidence: [
        'Complete calibrated spectroscopic run for the secondary coronal stream pending final pipeline downlink.'
      ],
      reasoningFactors: [
        'Primary source scientific telemetry is unimpeachable.',
        'Sensational social distortion inflated the geographical visibility zone.'
      ]
    },
    subClaims: [
      {
        id: 'sub-adv1',
        text: 'Aditya-L1 detected a high-energy coronal mass ejection heading toward Earth.',
        verdict: 'VERIFIED',
        evidenceSummary: 'Confirmed by ISRO ASPEX and SUIT instrument logs.',
        confidence: 98
      },
      {
        id: 'sub-adv2',
        text: 'Auroral displays were captured over Hanle, Ladakh in northern India.',
        verdict: 'VERIFIED',
        evidenceSummary: 'All-sky imaging corroboration from Indian Institute of Astrophysics.',
        confidence: 96
      },
      {
        id: 'sub-adv3',
        text: 'The auroras were dazzlingly green and easily visible over suburban plains across North India.',
        verdict: 'MISLEADING',
        evidenceSummary: 'Sensors show SAR red emissions requiring sub-visual exposure or high-altitude dark sky reserves.',
        confidence: 92
      }
    ],
    sources: [
      {
        id: 'src-sci-1',
        sourceName: 'Indian Space Research Organisation (ISRO)',
        sourceDomain: 'isro.gov.in',
        sourceTier: 'official',
        sourceTrustScore: 99,
        stance: 'supports',
        snippet: 'Aditya-L1 payloads ASPEX and MAG record major geomagnetic disturbances associated with CME arrival at L1 point.',
        url: 'https://isro.gov.in/Aditya_L1_Solar_Event.html',
        publishDate: '2026-03-09',
        author: 'ISRO Aditya-L1 Science Operations Centre',
        citationQuality: 'High',
        biasRating: 'Neutral/Fact-check',
        transparencyScore: 99,
        reliabilitySignals: ['Primary Space Agency Telemetry', 'Calibrated sensor logs', 'Direct scientific release']
      },
      {
        id: 'src-sci-2',
        sourceName: 'Indian Institute of Astrophysics (IIA Bengaluru)',
        sourceDomain: 'iiap.res.in',
        sourceTier: 'primary',
        sourceTrustScore: 98,
        stance: 'supports',
        snippet: 'IAO Hanle records stable auroral red arcs during intense space weather activity over the Dark Sky Reserve.',
        url: 'https://iiap.res.in/hanle-aurora-event',
        publishDate: '2026-03-09',
        author: 'Prof. Dorje Angchuk, Engineer-in-Charge, IAO Hanle',
        citationQuality: 'High',
        biasRating: 'Neutral/Fact-check',
        transparencyScore: 97,
        reliabilitySignals: ['Academic Research Institution', 'Published optical camera frames']
      },
      {
        id: 'src-sci-3',
        sourceName: 'NOAA Space Weather Prediction Center',
        sourceDomain: 'swpc.noaa.gov',
        sourceTier: 'official',
        sourceTrustScore: 98,
        stance: 'supports',
        snippet: 'G4 (Severe) Geomagnetic Storm conditions observed following Earth-directed CME impact.',
        url: 'https://swpc.noaa.gov/alerts/G4-storm',
        publishDate: '2026-03-09',
        author: 'Space Weather Operations',
        citationQuality: 'High',
        biasRating: 'Neutral/Fact-check',
        transparencyScore: 98,
        reliabilitySignals: ['Global Space Weather Standard', 'Inter-calibrated satellite metrics']
      }
    ],
    graphData: {
      nodes: [
        { id: 'n1', label: 'Aditya-L1 CME Detection Claim', type: 'claim', score: 90, confidence: 94 },
        { id: 'n2', label: 'ISRO Telemetry', type: 'source', score: 99, confidence: 99 },
        { id: 'n3', label: 'Hanle Dark Sky Observatory', type: 'source', score: 98, confidence: 98 },
        { id: 'n4', label: 'SAR Arc Sensor Data', type: 'evidence_support', score: 95, confidence: 96 },
        { id: 'n5', label: 'Viral Urban Claims', type: 'evidence_contradict', score: 30, confidence: 90 },
        { id: 'n6', label: 'Verdict: MOSTLY SUPPORTED', type: 'verdict', score: 94, confidence: 94 }
      ],
      edges: [
        { id: 'ge1', source: 'n1', target: 'n2', label: 'confirmed by', type: 'supports' },
        { id: 'ge2', source: 'n2', target: 'n4', label: 'calibrates', type: 'supports' },
        { id: 'ge3', source: 'n3', target: 'n4', label: 'records', type: 'supports' },
        { id: 'ge4', source: 'n5', target: 'n1', label: 'exaggerates visibility', type: 'contradicts' },
        { id: 'ge5', source: 'n4', target: 'n6', label: 'supports core fact', type: 'supports' }
      ]
    },
    timeline: [
      {
        id: 't-sci-1',
        timestamp: 'March 8, 14:20 IST',
        title: 'X-Class Flare Ejected from Sun',
        description: 'SUIT telescope on Aditya-L1 flags active solar region 3615 entering impulsive eruption phase.',
        stage: 'detected',
        sourceName: 'ISRO Spacecraft Bus'
      },
      {
        id: 't-sci-2',
        timestamp: 'March 9, 00:45 IST',
        title: 'Shockfront Reaches Earth Magnetosphere',
        description: 'ASPEX registers sudden velocity surge to 780 km/s.',
        stage: 'major_media',
        sourceName: 'ISRO & NOAA'
      },
      {
        id: 't-sci-3',
        timestamp: 'March 9, 02:10 IST',
        title: 'All-Sky Cameras at Hanle Capture Aurora',
        description: 'Indian Institute of Astrophysics releases verified composite frames of deep crimson auroral light over the Himalayas.',
        stage: 'current_status',
        sourceName: 'IAO Hanle'
      }
    ],
    limitations: [
      'Atmospheric cloud cover in lower valleys obstructed secondary ground sensors.',
      'Citizen photographs uploaded from cities were identified as digital time-lapses or boosted saturation edits.'
    ],
    timestamp: '2026-03-09T08:00:00Z',
    isDemo: true,
    regionalContext: {
      region: 'Ladakh (Hanle, Leh) & Northern Hemisphere High Altitudes',
      viralPlatforms: ['Instagram', 'YouTube Shorts', 'X Space Weather Community'],
      isWhatsAppForwardPattern: false,
      regionalAlertLevel: 'Normal'
    }
  },
  {
    id: 'demo-deepfake-election-video',
    claim: 'Viral video shows political party leader promising immediate ₹15,000 monthly cash deposit to all bank accounts starting Monday.',
    language: 'en',
    originalLanguage: 'ta',
    translatedClaim: 'அரசியல் கட்சித் தலைவர் வரும் திங்கள் முதல் அனைத்து வங்கிக் கணக்குகளுக்கும் உடனடியாக ₹15,000 மாதாந்திர நிதி உதவி வழங்கப்படும் என்று உறுதியளிக்கும் வைரல் வீடியோ.',
    category: 'Elections & Deepfakes / Manipulated Media',
    verdict: 'MANIPULATED_MEDIA',
    confidenceScore: 97,
    confidenceExplanation: 'Acoustic neural clone analysis combined with lip-sync optical flow disparities confirms synthetic speech replacement over archival 2022 rally footage.',
    summary30Sec: 'The viral video is an AI-generated deepfake. The speaker never made this promise. The visual track was taken from an August 2022 public rally in Madurai discussing rural road construction. An AI voice clone was mapped onto the video with automated neural lip-syncing.',
    detailedInvestigation: 'Audio-visual forensics detected frequency anomalies typical of text-to-speech diffusion models (flat formant transitions above 3.4 kHz). Frame-by-frame optical flow analysis revealed blur haloing around the speaker\'s lower jaw and teeth in frames 84-210. The original unedited video was located in the official party archive from August 14, 2022, where the speech strictly concerned highway expansion tenders. The state election commission and certified fact-checkers have verified this manipulation.',
    expertEvidenceView: 'Wav2Vec audio feature extraction detected a 99.4% probability of voice cloning. Lip movement synchronization (Wav2Lip residual error index) scored 0.041, indicating artificial frame morphing. The background crowd audio was artificially looped every 4.2 seconds.',
    whyDecided: {
      strongestEvidence: [
        'Original 2022 rally broadcast retrieved with completely different genuine audio.',
        'Phoneme-viseme mismatch score exceeding 92% across all sentences.',
        'Absence of the alleged promise in any official election manifesto filed with the Election Commission.'
      ],
      contradictoryEvidence: [
        'The video claims to be live from yesterday\'s convention, but the background banners display dates from August 2022.'
      ],
      missingEvidence: [
        'Zero coverage by credentialed print, television, or digital journalists present at the event.'
      ],
      reasoningFactors: [
        'Acoustic voice synthesis artifacts: synthetic breathing gaps and missing micro-intonations.',
        'Temporal mismatch: repurposed historical footage weaponized during an active election cycle.'
      ]
    },
    subClaims: [
      {
        id: 'sub-df1',
        text: 'The speaker made this cash promise during a speech this week.',
        verdict: 'FALSE',
        evidenceSummary: 'The footage is 3.5 years old; original audio discusses highway tenders.',
        confidence: 99
      },
      {
        id: 'sub-df2',
        text: 'The audio in the video is an authentic live recording.',
        verdict: 'MANIPULATED_MEDIA',
        evidenceSummary: 'AI voice clone detected with neural acoustic synthesis fingerprint.',
        confidence: 97
      }
    ],
    sources: [
      {
        id: 'src-df-1',
        sourceName: 'AltNews Fact Check',
        sourceDomain: 'altnews.in',
        sourceTier: 'factchecker',
        sourceTrustScore: 94,
        stance: 'contradicts',
        snippet: 'Deepfake Alert: Manipulated video of political leader with AI-generated audio promising cash transfers debunked.',
        url: 'https://altnews.in/ai-deepfake-election-video',
        publishDate: '2026-02-28',
        author: 'Digital Forensics Team',
        citationQuality: 'High',
        biasRating: 'Neutral/Fact-check',
        transparencyScore: 95,
        reliabilitySignals: ['IFCN Signatory', 'Side-by-side video comparison and audio spectrograms']
      },
      {
        id: 'src-df-2',
        sourceName: 'Election Commission of India Verification Cell',
        sourceDomain: 'eci.gov.in',
        sourceTier: 'official',
        sourceTrustScore: 98,
        stance: 'contradicts',
        snippet: 'Advisory on Deepfakes and Misinformation: Altered video clips circulating on social channels flagged to platform grievance officers.',
        url: 'https://eci.gov.in/media-advisory',
        publishDate: '2026-02-28',
        author: 'Spokesperson, ECI',
        citationQuality: 'High',
        biasRating: 'Neutral/Fact-check',
        transparencyScore: 96,
        reliabilitySignals: ['Constitutional Electoral Body', 'Official enforcement action']
      }
    ],
    graphData: {
      nodes: [
        { id: 'nd1', label: 'Viral Cash Promise Video', type: 'claim', score: 10, confidence: 97 },
        { id: 'nd2', label: 'Original 2022 Archive Footage', type: 'source', score: 98, confidence: 99 },
        { id: 'nd3', label: 'AI Voice Clone Detection', type: 'evidence_contradict', score: 97, confidence: 97 },
        { id: 'nd4', label: 'AltNews Forensic Report', type: 'source', score: 94, confidence: 95 },
        { id: 'nd5', label: 'Verdict: MANIPULATED MEDIA', type: 'verdict', score: 97, confidence: 97 }
      ],
      edges: [
        { id: 'ed1', source: 'nd2', target: 'nd1', label: 'proves visual reuse', type: 'contradicts' },
        { id: 'ed2', source: 'nd3', target: 'nd1', label: 'identifies synthetic audio', type: 'contradicts' },
        { id: 'ed3', source: 'nd4', target: 'nd5', label: 'confirms deepfake', type: 'contradicts' }
      ]
    },
    timeline: [
      {
        id: 'tdf-1',
        timestamp: 'Feb 27, 21:00 IST',
        title: 'Video Dropped on Anonymous Meme Page',
        description: 'First uploaded on Instagram Reels with high-tempo background music and sensational bold text captions.',
        stage: 'detected',
        sourceName: 'Video Radar Bot'
      },
      {
        id: 'tdf-2',
        timestamp: 'Feb 28, 08:30 IST',
        title: 'Viral Cross-Platform Propagation',
        description: 'Shared across 1,800+ WhatsApp broadcast channels in southern districts.',
        stage: 'social_amplification',
        sourceName: 'Social Velocity Tracker'
      },
      {
        id: 'tdf-3',
        timestamp: 'Feb 28, 15:00 IST',
        title: 'Forensic Debunk & ECI Takedown Advisory',
        description: 'Original 2022 video matched; speech proved to be cloned.',
        stage: 'factcheck_correction',
        sourceName: 'Fact-Check Network'
      }
    ],
    mediaForensics: {
      mediaType: 'video',
      mediaUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80',
      mediaName: 'speech_rally_cash_promise.mp4',
      aiGeneratedRisk: 96,
      aiRiskSummary: 'High-confidence synthetic audio injection with neural lip deformation on target visual speaker.',
      manipulationIndicators: [
        { name: 'Phoneme-Viseme Sync Disparity', score: 93, details: 'Mouth shape lags audio phonemes by 60ms with unnatural warping around lip borders.', severity: 'high' },
        { name: 'Spectral Voice Clone Artifacts', score: 96, details: 'Robotic spectral line cutoff at 3.8 kHz characteristic of open-source TTS voice clone models.', severity: 'high' },
        { name: 'Audio Looping Detection', score: 88, details: 'Ambient crowd noise is a cloned 4.2-second wave repeated 7 times.', severity: 'medium' }
      ],
      metadataExtracted: {
        'Video Codec': 'H.264 / AVC',
        'Encoder': 'FFmpeg / MoviePy Python script',
        'Frame Rate': '24.00 fps (variable frame jitter detected)',
        'Audio Stream': 'AAC 44.1 kHz, synthesized mono upmixed to stereo'
      },
      reverseSearchMatches: [
        { source: 'Sun News Tamil Archive', date: '2022-08-14', title: 'Madurai District Development Rally Full Speech', url: 'https://youtube.com/watch?v=sample2022', matchConfidence: 99 }
      ],
      keyFrames: [
        { time: '00:02', description: 'Speaker standing at podium; lighting consistent with midday August sun.', anomalyFlag: false, visualClue: '2022 banner visible in corner' },
        { time: '00:07', description: 'Close-up on face; mouth shows digital blur artifacting during the word "fifteen thousand".', anomalyFlag: true, visualClue: 'Wav2Lip pixel boundary distortion' },
        { time: '00:14', description: 'Gesturing hands show natural motion, confirming base video is real human footage.', anomalyFlag: false, visualClue: 'Base footage authentic' }
      ],
      crossModalConsistency: {
        consistent: false,
        score: 8,
        contradictionDetails: 'Vocal acoustic attributes do not match the natural room reverberation of the outdoor stadium.'
      }
    },
    limitations: [
      'Source script toolchain origin inferred from acoustic frequency signatures.',
      'Cannot determine the identity of the specific individual who commissioned the render.'
    ],
    timestamp: '2026-02-28T16:00:00Z',
    isDemo: true,
    regionalContext: {
      region: 'Tamil Nadu & Southern States',
      viralPlatforms: ['WhatsApp Status', 'Instagram Reels', 'ShareChat'],
      isWhatsAppForwardPattern: true,
      officialFactChecks: ['ECI Fact Check Bulletin', 'AltNews Video Lab'],
      regionalAlertLevel: 'Critical'
    }
  },
  {
    id: 'demo-health-dengue-cure',
    claim: 'Drinking boiled papaya leaf extract mixed with black pepper and raw turmeric permanently cures dengue fever in 12 hours without needing platelet transfusions.',
    language: 'en',
    category: 'Health & Medical Misinformation',
    verdict: 'MISLEADING',
    confidenceScore: 92,
    confidenceExplanation: 'While certain compounds in Carica papaya have shown modest support in preliminary lab trials for platelet support, presenting it as a standalone 12-hour cure that replaces emergency platelet transfusion is medically dangerous and unsupported by clinical trials.',
    summary30Sec: 'Misleading and medically risky. Papaya leaf preparations have been studied for mild platelet support, but there is zero clinical evidence that it cures dengue or eliminates the need for emergency medical care. Dengue is a viral infection requiring clinical monitoring for plasma leakage, severe dehydration, and internal bleeding.',
    detailedInvestigation: 'Dengue viral infections (DENV 1-4) can cause severe thrombocytopenia and vascular permeability. The claim that an herbal concoction eliminates the virus in 12 hours is physiologically impossible. The World Health Organization (WHO), Indian Council of Medical Research (ICMR), and AIIMS have repeatedly warned that relying exclusively on home remedies while avoiding hospital blood count monitoring can lead to fatal Dengue Shock Syndrome (DSS). Consuming raw herbal extracts in high concentrations can also trigger severe gastric mucosal irritation and liver strain.',
    expertEvidenceView: 'Systematic Cochrane review of Carica papaya leaf extract trials indicated low-to-moderate certainty evidence of transient platelet increases in uncomplicated dengue, but no reduction in mortality or length of hospital stay. No randomized controlled trial (RCT) supports a 12-hour cure claims.',
    whyDecided: {
      strongestEvidence: [
        'ICMR Clinical Management Guidelines for Dengue: Medical hydration and monitoring are vital.',
        'WHO Fact Sheet No. 117 on Dengue and Severe Dengue.',
        'THIP Media (The Healthy Indian Project) medical verification.'
      ],
      contradictoryEvidence: [
        'Laboratory studies show thrombocytopenic elevation in rat models, which viral forwards exaggerated into a "100% cure in 12 hours".'
      ],
      missingEvidence: [
        'No multi-center human clinical trial demonstrating anti-viral clearance in 12 hours.'
      ],
      reasoningFactors: [
        'Kernel of truth (preliminary herbal research) distorted into an absolute miracle cure.',
        'Potential for patient harm due to delayed emergency medical intervention.'
      ]
    },
    subClaims: [
      {
        id: 'sub-med1',
        text: 'Papaya leaf extract completely cures dengue viral infection in 12 hours.',
        verdict: 'FALSE',
        evidenceSummary: 'Viral replication cannot be cleared in 12 hours by herbal extract.',
        confidence: 96
      },
      {
        id: 'sub-med2',
        text: 'Patients do not need hospital care or platelet transfusions if they take this mixture.',
        verdict: 'MISLEADING',
        evidenceSummary: 'Dangerous medical advice: severe dengue requires close hematocrit and fluid balance monitoring.',
        confidence: 95
      }
    ],
    sources: [
      {
        id: 'src-med-1',
        sourceName: 'Indian Council of Medical Research (ICMR)',
        sourceDomain: 'icmr.gov.in',
        sourceTier: 'official',
        sourceTrustScore: 99,
        stance: 'contradicts',
        snippet: 'Guidelines for Management of Dengue Fever: Self-medication with unverified concoctions during the critical phase can lead to acute complications.',
        url: 'https://icmr.gov.in/guidelines/dengue',
        publishDate: '2025-08-15',
        author: 'Department of Health Research, Ministry of Health & Family Welfare',
        citationQuality: 'High',
        biasRating: 'Neutral/Fact-check',
        transparencyScore: 99,
        reliabilitySignals: ['National Medical Body', 'Peer-reviewed clinical protocol']
      },
      {
        id: 'src-med-2',
        sourceName: 'The Healthy Indian Project (THIP Media)',
        sourceDomain: 'thehealthyindianproject.com',
        sourceTier: 'factchecker',
        sourceTrustScore: 93,
        stance: 'contradicts',
        snippet: 'Fact Check: Does papaya leaf cure dengue in 12 hours? Doctors warn of Dengue Shock Syndrome risks.',
        url: 'https://thehealthyindianproject.com/factcheck/papaya-dengue-cure',
        publishDate: '2025-09-01',
        author: 'Dr. S. K. Narayanan, Infectious Diseases Consultant',
        citationQuality: 'High',
        biasRating: 'Neutral/Fact-check',
        transparencyScore: 94,
        reliabilitySignals: ['WHO Vaccine Safety Net Certified', 'Doctor-reviewed fact check']
      }
    ],
    graphData: {
      nodes: [
        { id: 'm1', label: '12-Hour Dengue Cure Claim', type: 'claim', score: 20, confidence: 92 },
        { id: 'm2', label: 'ICMR Treatment Guidelines', type: 'source', score: 99, confidence: 98 },
        { id: 'm3', label: 'Cochrane Systematic Review', type: 'source', score: 95, confidence: 96 },
        { id: 'm4', label: 'Mild Platelet Boost (Context)', type: 'evidence_support', score: 60, confidence: 75 },
        { id: 'm5', label: 'No Antiviral Cure (Fact)', type: 'evidence_contradict', score: 95, confidence: 96 },
        { id: 'm6', label: 'Verdict: MISLEADING', type: 'verdict', score: 92, confidence: 92 }
      ],
      edges: [
        { id: 'me1', source: 'm1', target: 'm4', label: 'misinterprets', type: 'supports' },
        { id: 'me2', source: 'm2', target: 'm5', label: 'mandates monitoring', type: 'contradicts' },
        { id: 'me3', source: 'm5', target: 'm6', label: 'refutes miracle claim', type: 'contradicts' }
      ]
    },
    timeline: [
      {
        id: 't-med-1',
        timestamp: 'August Monsoon Season',
        title: 'Annual Seasonal Resurgence',
        description: 'Recycled text forward begins spreading on family WhatsApp groups during regional dengue spikes.',
        stage: 'detected',
        sourceName: 'Health Disinformation Monitor'
      },
      {
        id: 't-med-2',
        timestamp: 'September 2',
        title: 'Medical Associations Issue Warning',
        description: 'Doctors report multiple patients admitted with acute gastritis from overdosing on raw herbal mixtures.',
        stage: 'major_media',
        sourceName: 'IMA / Health Department'
      }
    ],
    limitations: [
      'Does not evaluate personalized clinical conditions; users should consult certified physicians.'
    ],
    timestamp: '2025-09-05T12:00:00Z',
    isDemo: true,
    regionalContext: {
      region: 'Pan-India (Monsoon endemic belts)',
      viralPlatforms: ['WhatsApp Family Groups', 'Facebook Health Pages'],
      isWhatsAppForwardPattern: true,
      regionalAlertLevel: 'Elevated'
    }
  }
];
