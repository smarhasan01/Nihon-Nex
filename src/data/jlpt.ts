export interface JLPTLevelData {
  level: "N5" | "N4" | "N3" | "N2" | "N1";
  name: string;
  badge: string;
  kanjiCount: number;
  vocabCount: number;
  studyHours: number;
  descriptionEn: string;
  descriptionBn: string;
  targetAudienceEn: string;
  targetAudienceBn: string;
  skills: {
    en: string[];
    bn: string[];
  };
  sampleQuestions: {
    id: string;
    question: string;
    reading?: string;
    options: string[];
    correctIndex: number;
    explanationEn: string;
    explanationBn: string;
  }[];
}

export const JLPT_LEVELS: JLPTLevelData[] = [
  {
    level: "N5",
    name: "Beginner (মৌলিক প্রারম্ভিক)",
    badge: "Level 1",
    kanjiCount: 100,
    vocabCount: 800,
    studyHours: 150,
    descriptionEn: "The ability to understand some basic Japanese. Read typical expressions and sentences written in Hiragana, Katakana, and basic Kanji.",
    descriptionBn: "হিরাগানা, কাতাকানা এবং প্রাথমিক কাঞ্জি দিয়ে লেখা সহজ বাক্য ও প্রাত্যহিক জীবনের ছোট কথোপকথন বোঝার সক্ষমতা।",
    targetAudienceEn: "Absolute beginners, anime fans, and first-time Japanese learners.",
    targetAudienceBn: "একদম প্রারম্ভিক শিক্ষার্থী এবং জাপানি ভাষা শেখার প্রাথমিক পর্যায়ে থাকা যে কেউ।",
    skills: {
      en: [
        "Master Hiragana and Katakana charts",
        "Read basic Kanji (Numbers, Days, Basic Nature)",
        "Greet and introduce yourself politely",
        "Order food, ask directions and tell time",
      ],
      bn: [
        "হিরাগানা ও কাতাকানা সম্পূর্ণ আত্মস্থ করা",
        "প্রাথমিক ১০০টি কাঞ্জি চেনা (সংখ্যা, দিন, প্রকৃতি)",
        "ভদ্রভাবে নিজের পরিচয় দেওয়া এবং কুশল বিনিময়",
        "খাবার অর্ডার করা, দিকনির্দেশনা চাওয়া ও সময় বলা",
      ],
    },
    sampleQuestions: [
      {
        id: "q-n5-1",
        question: "わたしは まいにち ７じに （　）ます。",
        reading: "Watashi wa mainichi shichiji ni ( )masu.",
        options: ["おき", "たべ", "のみ", "いき"],
        correctIndex: 0,
        explanationEn: "'おきます' (okimasu) means to wake up. 'I wake up every day at 7:00'.",
        explanationBn: "'おきます' (ওকিমাসু) অর্থ ঘুম থেকে ওঠা। বাক্যটির অর্থ: 'আমি প্রতিদিন ৭টায় ঘুম থেকে উঠি'。",
      },
      {
        id: "q-n5-2",
        question: "きのうの ばん、なにを （　）か。",
        reading: "Kinou no ban, nani o ( ) ka.",
        options: ["たべます", "たべました", "たべません", "たべたい"],
        correctIndex: 1,
        explanationEn: "'きのう' (yesterday) requires the past tense form 'たべました' (tabemashita).",
        explanationBn: "'きのう' (গতকাল) অতীতকাল নির্দেশ করায় সঠিক রূপ হবে 'たべました' (খেয়েছিলেন)。",
      },
    ],
  },
  {
    level: "N4",
    name: "Elementary (প্রাথমিক অগ্রগতি)",
    badge: "Level 2",
    kanjiCount: 300,
    vocabCount: 1500,
    studyHours: 300,
    descriptionEn: "The ability to understand basic Japanese used in everyday life, understand conversations spoken slowly, and handle daily transactions.",
    descriptionBn: "দৈনন্দিন জীবনে বহুল ব্যবহৃত বাক্য, সাধারণ বিষয়বস্তু এবং ধীরে বলা সংলাপ সহজে উপলব্ধি করার সক্ষমতা।",
    targetAudienceEn: "Learners seeking working holiday visas, technical intern trainees, or language school entrance.",
    targetAudienceBn: "জাপানে উচ্চশিক্ষা বা টেকনিক্যাল ট্রেইনি হিসেবে যাওয়ার প্রস্তুতি গ্রহণকারী শিক্ষার্থী।",
    skills: {
      en: [
        "Use verb forms (Te-form, Ta-form, Nai-form)",
        "Give and receive directions and instructions",
        "Express opinions, desires, and hypothetical situations",
        "Read short daily diary entries and notices",
      ],
      bn: [
        "ক্রিয়ার বিভিন্ন রূপের ব্যবহার (তে-ফর্ম, তা-ফর্ম, নাই-ফর্ম)",
        "নির্দেশনা দেওয়া ও কোনো অনুরোধ বুঝা",
        "নিজের মতামত, ইচ্ছা ও শর্তযুক্ত বাক্য বলা",
        "ছোটখাটো নোটিশ ও ডায়েরি পড়া",
      ],
    },
    sampleQuestions: [
      {
        id: "q-n4-1",
        question: "あした あめが （　）ら、いえに います。",
        reading: "Ashita ame ga ( )ra, ie ni imasu.",
        options: ["ふった", "ふる", "ふり", "ふって"],
        correctIndex: 0,
        explanationEn: "Conditional '〜たら' connects to the past plain form: ふった + ら = ふったら (If it rains).",
        explanationBn: "শর্তসূচক '〜たら' ব্যাকরণের নিয়মে ক্রিয়ার তা-ফর্ম যুক্ত হয়: ふったら (যদি বৃষ্টি হয়)。",
      },
    ],
  },
  {
    level: "N3",
    name: "Intermediate (মধ্যবর্তী দক্ষতা)",
    badge: "Level 3",
    kanjiCount: 650,
    vocabCount: 3750,
    studyHours: 450,
    descriptionEn: "The ability to understand Japanese used in everyday situations to a certain degree. Bridge between everyday conversational Japanese and formal corporate Japanese.",
    descriptionBn: "দৈনন্দিন জীবনের বাইরেও সংবাদপত্র ও সাধারণ নিবন্ধের মূল ভাব এবং স্বাভাবিক গতির কথোপকথন অনুধাবন করার যোগ্যতা।",
    targetAudienceEn: "Students aiming for university admission in Japan or IT/engineering jobs.",
    targetAudienceBn: "জাপানের বিশ্ববিদ্যালয়ে ভর্তি বা আইটি কোম্পানিতে ক্যারিয়ার গড়তে আগ্রহী শিক্ষার্থী।",
    skills: {
      en: [
        "Read articles with summary understanding",
        "Engage in coherent conversations on common topics",
        "Understand nuances of speech and natural flow",
      ],
      bn: [
        "সংবাদ ও বিভিন্ন আর্টিকেলের সারসংক্ষেপ বুঝতে পারা",
        "প্রাত্যহিক সামাজিক বিষয়ে স্বাভাবিকভাবে আলোচনা করা",
        "কথোপকথনের সূক্ষ্ম প্রকাশভঙ্গি উপলব্ধি করা",
      ],
    },
    sampleQuestions: [
      {
        id: "q-n3-1",
        question: "どんなに （　）ても、あきらめません。",
        reading: "Donna ni ( )temo, akiramemasen.",
        options: ["たいへんだっ", "たいへん", "たいへんが", "たいへんで"],
        correctIndex: 1,
        explanationEn: "'どんなに〜ても' takes the te-form of Na-adjectives: たいへんでも (No matter how tough it is, I won't give up).",
        explanationBn: "'কোনো অবস্থাতেই হাল ছাড়ব না' বোঝাতে 'たいへんでも' ব্যবহৃত হয়।",
      },
    ],
  },
  {
    level: "N2",
    name: "Pre-Advanced (উচ্চ মধ্যবর্তী)",
    badge: "Level 4",
    kanjiCount: 1000,
    vocabCount: 6000,
    studyHours: 600,
    descriptionEn: "The ability to understand Japanese used in everyday situations, and in a variety of business circumstances to a good degree.",
    descriptionBn: "জাপানি ব্যবসায়িক পরিবেশ এবং বিভিন্ন সামাজিক ও প্রাতিষ্ঠানিক পরিস্থিতিতে সাবলীলভাবে ভাষা ব্যবহারের দক্ষতা।",
    targetAudienceEn: "Professionals seeking full-time employment in Japanese companies.",
    targetAudienceBn: "জাপানের যেকোনো প্রফেশনাল সেক্টরে বা মাল্টিন্যাশনাল কোম্পানিতে চাকরির প্রধান যোগ্যতা।",
    skills: {
      en: [
        "Business Keigo (honorific & humble speech)",
        "Read editorials, critiques, and workplace memos",
        "Follow news broadcasts and television discussions",
      ],
      bn: [
        "বিজনেস কেইগো (সম্মানসূচক প্রাতিষ্ঠানিক ভাষা)",
        "অফিসিয়াল নথিপত্র ও জটিল নিবন্ধ পাঠ ও বিশ্লেষণ",
        "টিভি নিউজ এবং প্রাতিষ্ঠানিক প্রেজেন্টেশন স্পষ্টভাবে বোঝা",
      ],
    },
    sampleQuestions: [
      {
        id: "q-n2-1",
        question: "この プロジェクトは ぜんりょくを （　） とりくむ べきだ。",
        reading: "Kono purojekuto wa zenryoku o ( ) torikumu beki da.",
        options: ["つくして", "あげて", "こめて", "かけて"],
        correctIndex: 0,
        explanationEn: "The set idiom is '全力を尽くす' (zenryoku o tsukusu), meaning to do one's utmost best.",
        explanationBn: "'全力を尽くす' একটি বহুল প্রচলিত বাক্যধারা, যার অর্থ সর্বোচ্চ প্রচেষ্টা নিয়োজিত করা।",
      },
    ],
  },
  {
    level: "N1",
    name: "Advanced / Native-Level (সর্বোচ্চ স্তর)",
    badge: "Level 5",
    kanjiCount: 2000,
    vocabCount: 10000,
    studyHours: 900,
    descriptionEn: "The ability to understand Japanese used in a variety of complex circumstances. Read abstract philosophy, academic papers, and comprehend fast native dialogue.",
    descriptionBn: "জাপানি ভাষার সর্বোচ্চ স্তর। জটিল দর্শন, গবেষণা প্রবন্ধ এবং যেকোনো দ্রুতগতির স্থানীয় সংলাপ নিখুঁতভাবে অনুধাবনের সক্ষমতা।",
    targetAudienceEn: "Interpreters, translators, researchers, and senior executives in Japan.",
    targetAudienceBn: "দোভাষী, অনুবাদক, শিক্ষক এবং জাপানের শীর্ষস্থানীয় নির্বাহী পদের জন্য অপরিহার্য স্তর।",
    skills: {
      en: [
        "Mastery over 2,000+ Joyo Kanji",
        "Understand literary nuance, satire, and cultural subtext",
        "Debate abstract concepts fluently in academic/legal settings",
      ],
      bn: [
        "২,০০০ এর বেশি কাঞ্জিতে পূর্ণ দখল",
        "সাহিত্য ও সংস্কৃতির সূক্ষ্ম ব্যঞ্জনা ও রূপক অর্থ অনুধাবন",
        "আইনি ও প্রাতিষ্ঠানিক যেকোনো জটিল বিষয়ে বিতর্কের দক্ষতা",
      ],
    },
    sampleQuestions: [
      {
        id: "q-n1-1",
        question: "彼の 発言は 信頼に （　） ものがある。",
        reading: "Kare no hatsugen wa shinrai ni ( ) mono ga aru.",
        options: ["あたいする", "かかわる", "たえる", "こたえる"],
        correctIndex: 0,
        explanationEn: "'信頼に値する' (shinrai ni ataisuru) is a formal phrase meaning 'worthy of trust'.",
        explanationBn: "'信頼に値する' একটি উচ্চমার্গের প্রকাশভঙ্গি, যার অর্থ বিশ্বাসের যোগ্য।",
      },
    ],
  },
];
