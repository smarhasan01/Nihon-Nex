export type KanaType = "hiragana" | "katakana";

export interface KanaCharacter {
  char: string;
  romaji: string;
  bangla: string;
  group: string; // "a-row", "ka-row", "sa-row", etc.
  exampleWord: string;
  exampleReading: string;
  exampleMeaningEn: string;
  exampleMeaningBn: string;
  strokeCount: number;
  mnemonic: {
    en: string;
    bn: string;
  };
}

export type VocabularyCategory =
  | "daily"
  | "greetings"
  | "numbers"
  | "family"
  | "food"
  | "travel"
  | "education"
  | "business"
  | "verbs"
  | "adjectives";

export interface VocabularyItem {
  id: string;
  japanese: string;
  reading: string;
  kanji?: string;
  romaji: string;
  meaningEn: string;
  meaningBn: string;
  category: VocabularyCategory;
  jlptLevel: "N5" | "N4" | "N3" | "N2" | "N1";
  exampleSentenceJp: string;
  exampleSentenceEn: string;
  exampleSentenceBn: string;
}

export interface GrammarPattern {
  id: string;
  pattern: string;
  titleEn: string;
  titleBn: string;
  meaningEn: string;
  meaningBn: string;
  structure: string;
  explanationEn: string;
  explanationBn: string;
  jlptLevel: "N5" | "N4" | "N3";
  examples: {
    jp: string;
    reading: string;
    en: string;
    bn: string;
  }[];
}

export interface KanjiItem {
  id: string;
  kanji: string;
  meaningEn: string;
  meaningBn: string;
  onyomi: string[];
  kunyomi: string[];
  strokeCount: number;
  jlptLevel: "N5" | "N4" | "N3";
  examples: {
    word: string;
    reading: string;
    meaningEn: string;
    meaningBn: string;
  }[];
}

export type QuizType = "multiple-choice" | "recognition" | "matching" | "fill-blank" | "listening";

export interface QuizQuestion {
  id: string;
  type: QuizType;
  prompt: string;
  promptBn?: string;
  audioText?: string;
  options: string[];
  correctAnswer: string;
  explanationEn: string;
  explanationBn: string;
}

export interface Achievement {
  id: string;
  titleEn: string;
  titleBn: string;
  descEn: string;
  descBn: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

export interface DailyMission {
  id: string;
  titleEn: string;
  titleBn: string;
  xpReward: number;
  completed: boolean;
  current: number;
  target: number;
}

export interface GamificationState {
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: string; // YYYY-MM-DD
  hearts: number;
  maxHearts: number;
  completedLessons: string[];
  achievements: Achievement[];
  dailyMissions: DailyMission[];
}

export interface UserProfile {
  id: string;
  email?: string;
  name?: string;
  avatar?: string;
  targetJLPT: "N5" | "N4" | "N3" | "N2" | "N1";
  role: "student" | "admin";
  created_at?: string;
}
