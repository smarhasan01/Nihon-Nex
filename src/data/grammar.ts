import { GrammarPattern } from "@/types";

export const GRAMMAR_PATTERNS: GrammarPattern[] = [
  {
    id: "grammar-1",
    pattern: "A は B です (A wa B desu)",
    titleEn: "Basic Equational Sentence (A is B)",
    titleBn: "মৌলিক বাক্য গঠন: 'A হলো B'",
    meaningEn: "A is B (Topic marker 'wa' + copula 'desu')",
    meaningBn: "A হলো B ('は' টপিক মার্কার এবং 'です' বাক্য সমাপ্তিসূচক রূপ)",
    structure: "[Noun A] + は + [Noun B] + です",
    explanationEn:
      "The particle は (written as 'ha' but pronounced 'wa') marks the topic of the sentence—what you are talking about. です (desu) works similarly to 'is/am/are' in English and makes the sentence polite.",
    explanationBn:
      "জাপানি ভাষায় 'は' কণাটি (লেখা হয় 'হা' কিন্তু উচ্চারণ হয় 'ওয়া') বাক্যের মূল বিষয় বা সাবজেক্টকে নির্দেশ করে। আর 'です' (দেশু) ইংরেজি 'am/is/are'-এর মতো কাজ করে এবং বাক্যটিকে ভদ্র ও মার্জিত করে তোলে।",
    jlptLevel: "N5",
    examples: [
      {
        jp: "わたしはがくせいです。",
        reading: "Watashi wa gakusei desu.",
        en: "I am a student.",
        bn: "আমি একজন শিক্ষার্থী।",
      },
      {
        jp: "ラハマンさんはエンジニアです。",
        reading: "Rahman-san wa enjinia desu.",
        en: "Mr. Rahman is an engineer.",
        bn: "জনাব রহমান একজন প্রকৌশলী।",
      },
      {
        jp: "これはにほんごのほんです。",
        reading: "Kore wa nihongo no hon desu.",
        en: "This is a Japanese language book.",
        bn: "এটি একটি জাপানি ভাষার বই।",
      },
    ],
  },
  {
    id: "grammar-2",
    pattern: "A は B ではありません (A wa B dewa arimasen)",
    titleEn: "Polite Negative Sentences (A is not B)",
    titleBn: "না-বোধক বাক্য গঠন: 'A, B নয়'",
    meaningEn: "A is not B",
    meaningBn: "A, B নয় (ভদ্র না-বোধক রূপ)",
    structure: "[Noun A] + は + [Noun B] + ではありません (বা じゃありません)",
    explanationEn:
      "To say that A is NOT B in polite Japanese, replace です (desu) with ではありません (dewa arimasen) in formal speech, or じゃありません (ja arimasen) in standard polite conversation.",
    explanationBn:
      "যদি আপনি বলতে চান 'A, B নয়', তাহলে বাক্যের শেষের 'です' তুলে দিয়ে 'ではありません' (দেওয়া আরিমাসেন) অথবা মুখে বলার সময় 'じゃありません' (জা আরিমাসেন) ব্যবহার করতে হয়।",
    jlptLevel: "N5",
    examples: [
      {
        jp: "わたしわせんせいではありません。",
        reading: "Watashi wa sensei dewa arimasen.",
        en: "I am not a teacher.",
        bn: "আমি শিক্ষক নই।",
      },
      {
        jp: "かれはにほんじんじゃありません。",
        reading: "Kare wa nihonjin ja arimasen.",
        en: "He is not Japanese.",
        bn: "তিনি জাপানি নন।",
      },
    ],
  },
  {
    id: "grammar-3",
    pattern: "〜ですか (ka question particle)",
    titleEn: "Asking Questions (Is it ...?)",
    titleBn: "প্রশ্নবোধক বাক্য গঠন: '... কি?'",
    meaningEn: "Adding 'ka' at the end turns any statement into a question",
    meaningBn: "বাক্যের শেষে 'か' (কা) যুক্ত করে সহজেই প্রশ্ন তৈরি করা যায়",
    structure: "[Sentence] + か？",
    explanationEn:
      "In Japanese, you do not need to change the word order to ask a question. Simply attach the question particle か (ka) to the very end of the sentence.",
    explanationBn:
      "জাপানি ভাষায় প্রশ্ন তৈরি করা অত্যন্ত সহজ। শব্দের ক্রম পরিবর্তন না করেই বাক্যের শেষে শুধুমাত্র 'か' (কা) যোগ করলেই তা প্রশ্নবোধক হয়ে যায়।",
    jlptLevel: "N5",
    examples: [
      {
        jp: "あなたはがくせいですか？",
        reading: "Anata wa gakusei desu ka?",
        en: "Are you a student?",
        bn: "আপনি কি একজন শিক্ষার্থী?",
      },
      {
        jp: "これわおちゃですか？",
        reading: "Kore wa ocha desu ka?",
        en: "Is this green tea?",
        bn: "এটি কি সবুজ চা?",
      },
    ],
  },
  {
    id: "grammar-4",
    pattern: "A の B (Possessive Particle 'no')",
    titleEn: "Connecting Nouns & Possession (A's B)",
    titleBn: "মালিকানা ও সম্পর্কসূচক কণা: 'A-এর B'",
    meaningEn: "A's B or B of A",
    meaningBn: "A-এর B (মালিকানা বা বৈশিষ্ট্য)",
    structure: "[Noun A] + の + [Noun B]",
    explanationEn:
      "The particle の (no) links two nouns together. It acts like the apostrophe-s ('s) or 'of' in English, showing ownership, nationality, or affiliation.",
    explanationBn:
      "'の' (নো) কণাটি দুটি বিশেষ্যকে (Noun) যুক্ত করে এবং বাংলায় 'র' বা 'এর' বিভক্তির মতো কাজ করে। যেমন: আমার বই, জাপানের গাড়ি ইত্যাদি।",
    jlptLevel: "N5",
    examples: [
      {
        jp: "わたしのなまえはサキブです。",
        reading: "Watashi no namae wa Sakib desu.",
        en: "My name is Sakib.",
        bn: "আমার নাম সাকিব।",
      },
      {
        jp: "これはにほんのくるまです。",
        reading: "Kore wa nihon no kuruma desu.",
        en: "This is a car made in Japan.",
        bn: "এটি জাপানের তৈরি গাড়ি।",
      },
    ],
  },
  {
    id: "grammar-5",
    pattern: "[Noun] を [Verb-ます] (Object Marker 'o')",
    titleEn: "Direct Object Marker 'o'",
    titleBn: "কর্মকারক নির্দেশক কণা 'を' (ও) ও ক্রিয়াপদ",
    meaningEn: "Indicates the object that receives the action",
    meaningBn: "ক্রিয়া যার ওপর সম্পাদিত হয় সেই কর্মপদ নির্দেশ করে",
    structure: "[Object] + を + [Verb (ます form)]",
    explanationEn:
      "The particle を (written 'wo' but pronounced 'o') marks the direct object of a transitive verb—what you eat, what you drink, or what you read.",
    explanationBn:
      "'を' কণাটি (লেখা হয় wo কিন্তু উচ্চারণ হয় 'ও') নির্দেশ করে কোনো কাজের মূল অবজেক্টকে। যেমন: ভাত খাওয়া, পানি পান করা, বই পড়া।",
    jlptLevel: "N5",
    examples: [
      {
        jp: "みずをのみます。",
        reading: "Mizu o nomimasu.",
        en: "I drink water.",
        bn: "আমি পানি পান করি।",
      },
      {
        jp: "すしをたべます。",
        reading: "Sushi o tabemasu.",
        en: "I eat sushi.",
        bn: "আমি সুশি খাই।",
      },
      {
        jp: "ほんをよみます。",
        reading: "Hon o yomimasu.",
        en: "I read a book.",
        bn: "আমি বই পড়ি।",
      },
    ],
  },
];
