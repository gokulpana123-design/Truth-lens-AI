import { VerdictConfig, VerdictType } from '../types';

export const VERDICT_CONFIGS: Record<VerdictType, VerdictConfig> = {
  VERIFIED: {
    label: 'VERIFIED',
    nativeLabels: {
      hi: 'पुष्ट / सत्य',
      bn: 'যাচাইকৃত সত্য',
      ta: 'உறுதிப்படுத்தப்பட்டது',
      te: 'ధృవీకరించబడింది',
      mr: 'पडताळणी झालेले सत्य',
      gu: 'ચકાસાયેલ / સાચું',
      kn: 'ದೃಢೀಕರಿಸಲಾಗಿದೆ',
      ml: 'സ്ഥിരീകരിച്ചത്',
      pa: 'ਤਸਦੀਕਸ਼ੁਦਾ',
      ur: 'تصدیق شدہ',
      or: 'ପ୍ରମାଣିତ',
      as: 'প্ৰমাণিত সত্য'
    },
    color: '#10B981', // Emerald green
    badgeBg: 'bg-emerald-500/15',
    badgeBorder: 'border-emerald-500/40',
    textColor: 'text-emerald-400',
    glowColor: 'shadow-[0_0_25px_rgba(16,185,129,0.35)]',
    icon: 'CheckCircle2',
    description: 'Corroborated by multiple authoritative primary sources, direct official archives, and consistent factual timelines.'
  },
  MOSTLY_SUPPORTED: {
    label: 'MOSTLY SUPPORTED',
    nativeLabels: {
      hi: 'अधिकांशतः समर्थित',
      bn: 'অধিকাংশ ক্ষেত্রে সমর্থিত',
      ta: 'பெரும்பாலும் உண்மை',
      te: 'ఎక్కువగా సమర్థించబడింది',
      mr: 'मुख्यतः सत्य',
      gu: 'મોટાભાગે સમર્થિત',
      kn: 'ಹೆಚ್ಚಾಗಿ ಬೆಂಬಲಿತವಾಗಿದೆ',
      ml: 'ഭൂരിഭാഗവും ശരിയാണ്',
      pa: 'ਬਹੁਤਾ ਸੱਚ',
      ur: 'اکثر درست',
      or: 'ମୁଖ୍ୟତଃ ସତ୍ୟ',
      as: 'বেছিভাগেই সমৰ্থিত'
    },
    color: '#06B6D4', // Cyan
    badgeBg: 'bg-cyan-500/15',
    badgeBorder: 'border-cyan-500/40',
    textColor: 'text-cyan-400',
    glowColor: 'shadow-[0_0_25px_rgba(6,182,212,0.35)]',
    icon: 'CheckCheck',
    description: 'The core claim is factually accurate, with minor peripheral imprecisions or secondary nuances missing.'
  },
  MISLEADING: {
    label: 'MISLEADING / OUT OF CONTEXT',
    nativeLabels: {
      hi: 'भ्रामक / संदर्भहीन',
      bn: 'বিভ্রান্তিকর / অপ্রাসঙ্গিক',
      ta: 'தவறாக வழிநடத்துகிறது / தவறான சூழல்',
      te: 'తప్పుదారి పట్టించే సమాచారం',
      mr: 'दिशाभूल करणारे / संदर्भाबाहेर',
      gu: 'ગેરમાર્ગે દોરનારું',
      kn: 'ದಾರಿ ತಪ್ಪಿಸುವಂತಿದೆ',
      ml: 'തെറ്റിദ്ധരിപ്പിക്കുന്നത്',
      pa: 'ਗੁੰਮਰਾਹਕੁੰਨ',
      ur: 'گمراہ کن / سیاق و سباق سے ہٹ کر',
      or: 'ଭ୍ରାନ୍ତିକର / ପ୍ରସଙ୍ଗ ବାହାରେ',
      as: 'বিভ্ৰান্তিকৰ'
    },
    color: '#F59E0B', // Amber / Gold
    badgeBg: 'bg-amber-500/15',
    badgeBorder: 'border-amber-500/40',
    textColor: 'text-amber-400',
    glowColor: 'shadow-[0_0_25px_rgba(245,158,11,0.35)]',
    icon: 'AlertTriangle',
    description: 'Elements of truth presented with altered dates, swapped locations, or deliberate cherry-picking to induce false conclusions.'
  },
  UNVERIFIED: {
    label: 'UNVERIFIED',
    nativeLabels: {
      hi: 'अपुष्ट / असत्यापित',
      bn: 'অযাচাইকৃত',
      ta: 'சரிபார்க்கப்படாதது',
      te: 'ధృవీకరించబడలేదు',
      mr: 'अपुष्ट / खात्री न पटलेले',
      gu: 'ચકાસાયેલ નથી',
      kn: 'ದೃಢೀಕರಿಸಲಾಗಿಲ್ಲ',
      ml: 'സ്ഥിരീകരിക്കാത്തത്',
      pa: 'ਅਣਪੜਤਾਲਿਆ',
      ur: 'غیر مصدقہ',
      or: 'ଅପ୍ରମାଣିତ',
      as: 'অনিশ্চিত'
    },
    color: '#F97316', // Orange
    badgeBg: 'bg-orange-500/15',
    badgeBorder: 'border-orange-500/40',
    textColor: 'text-orange-400',
    glowColor: 'shadow-[0_0_25px_rgba(249,115,22,0.35)]',
    icon: 'HelpCircle',
    description: 'Circulating hearsay without verifiable paper trails, primary witness corroboration, or on-record attribution.'
  },
  FALSE: {
    label: 'FALSE / CONTRADICTED',
    nativeLabels: {
      hi: 'असत्य / खंडित',
      bn: 'মিথ্যা / সম্পূর্ণ খণ্ডন',
      ta: 'தவறானது / மறுக்கப்பட்டது',
      te: 'తప్పు / ఖండించబడింది',
      mr: 'असत्य / खोटे वृत्त',
      gu: 'ખોટું / રદિયો અપાયેલ',
      kn: 'ಸುಳ್ಳು / ತಿರಸ್ಕೃತ',
      ml: 'വ്യാജം / തള്ളിക്കളഞ്ഞത്',
      pa: 'ਝੂਠ / ਰੱਦ ਕੀਤਾ',
      ur: 'جھوٹا / تردید شدہ',
      or: 'ଅସତ୍ୟ / ପ୍ରତ୍ୟାଖ୍ୟାତ',
      as: 'মিছা / খণ্ডিত'
    },
    color: '#EF4444', // Red
    badgeBg: 'bg-red-500/15',
    badgeBorder: 'border-red-500/40',
    textColor: 'text-red-400',
    glowColor: 'shadow-[0_0_25px_rgba(239,68,68,0.35)]',
    icon: 'XCircle',
    description: 'Directly refuted by official records, eyewitness documentation, chronological impossibilities, or primary data.'
  },
  MANIPULATED_MEDIA: {
    label: 'MANIPULATED MEDIA',
    nativeLabels: {
      hi: 'छेड़छाड़ किया गया मीडिया / डीपफेक',
      bn: 'বিকৃত মিডিয়া / ডিপফেক',
      ta: 'திரிக்கப்பட்ட ஊடகம் / டீப்ஃபேக்',
      te: 'మార్చబడిన మీడియా / డీప్‌ఫేక్',
      mr: 'छेडछाड केलेला मीडिया / डीपफेक',
      gu: 'ચેડાં કરેલ મીડિયા / ડીપફેક',
      kn: 'ತಿರುಚಲಾದ ಮಾಧ್ಯಮ / ಡೀಪ್‌ಫೇಕ್',
      ml: 'കൃത്രിമം കാണിച്ച മീഡിയ',
      pa: 'ਛੇੜਛਾੜ ਕੀਤਾ ਮੀਡੀਆ',
      ur: 'تبدیل شدہ میڈیا / ڈیپ فیک',
      or: 'ବିକୃତ ମିଡିଆ',
      as: 'বিকৃত মিডিয়া / ডিপফেক'
    },
    color: '#A855F7', // Purple
    badgeBg: 'bg-purple-500/15',
    badgeBorder: 'border-purple-500/40',
    textColor: 'text-purple-400',
    glowColor: 'shadow-[0_0_25px_rgba(168,85,247,0.35)]',
    icon: 'Sparkles',
    description: 'Synthetic generative AI artifacts detected, acoustic voice cloning, spliced video frames, or metadata tampering.'
  },
  INSUFFICIENT_EVIDENCE: {
    label: 'INSUFFICIENT EVIDENCE',
    nativeLabels: {
      hi: 'अपर्याप्त साक्ष्य',
      bn: 'অপর্যাপ্ত প্রমাণ',
      ta: 'போதிய ஆதாரமின்மை',
      te: 'సరిపడా ఆధారాలు లేవు',
      mr: 'अपुरा पुरावा',
      gu: 'અપૂરતા પુરાવા',
      kn: 'ಸಾಕಷ್ಟು ಪುರಾವೆಗಳಿಲ್ಲ',
      ml: 'മതിയായ തെളിവുകളില്ല',
      pa: 'ਅਧੂਰੇ ਸਬੂਤ',
      ur: 'ناکافی شواہد',
      or: 'ଅପର୍ଯ୍ୟାପ୍ତ ପ୍ରମାଣ',
      as: 'অপৰ্যাপ্ত প্ৰমাণ'
    },
    color: '#64748B', // Slate / Dark grey
    badgeBg: 'bg-slate-500/15',
    badgeBorder: 'border-slate-500/40',
    textColor: 'text-slate-300',
    glowColor: 'shadow-[0_0_20px_rgba(100,116,139,0.35)]',
    icon: 'Slash',
    description: 'Current publicly verifiable databases and primary archives do not contain adequate records to establish or deny validity.'
  }
};
