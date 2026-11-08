-- ========================================================================
-- NIHON NEX 🇯🇵 - MASTER DATABASE SCHEMA & MIGRATIONS
-- Supabase PostgreSQL with Row Level Security (RLS)
-- ========================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (Linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  target_jlpt TEXT DEFAULT 'N5' CHECK (target_jlpt IN ('N5', 'N4', 'N3', 'N2', 'N1')),
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'admin')),
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak INTEGER DEFAULT 1,
  hearts INTEGER DEFAULT 5,
  max_hearts INTEGER DEFAULT 5,
  last_active_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. LESSONS TABLE
CREATE TABLE IF NOT EXISTS public.lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  module TEXT NOT NULL CHECK (module IN ('hiragana', 'katakana', 'vocabulary', 'grammar', 'kanji', 'listening', 'speaking', 'jlpt')),
  level TEXT DEFAULT 'N5' CHECK (level IN ('N5', 'N4', 'N3', 'N2', 'N1', 'beginner')),
  order_index INTEGER DEFAULT 0,
  bangla_title TEXT,
  bangla_summary TEXT,
  content_markdown TEXT,
  audio_url TEXT,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. USER LESSON PROGRESS TABLE
CREATE TABLE IF NOT EXISTS public.lesson_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  xp_earned INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, lesson_id)
);

-- 4. VOCABULARY TABLE
CREATE TABLE IF NOT EXISTS public.vocabulary (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  japanese TEXT NOT NULL,
  reading TEXT NOT NULL,
  romaji TEXT NOT NULL,
  meaning_en TEXT NOT NULL,
  meaning_bn TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  jlpt_level TEXT DEFAULT 'N5' CHECK (jlpt_level IN ('N5', 'N4', 'N3', 'N2', 'N1')),
  example_sentence_jp TEXT,
  example_sentence_en TEXT,
  example_sentence_bn TEXT,
  audio_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. GRAMMAR TABLE
CREATE TABLE IF NOT EXISTS public.grammar (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pattern TEXT NOT NULL,
  title_en TEXT NOT NULL,
  title_bn TEXT NOT NULL,
  structure TEXT NOT NULL,
  explanation_en TEXT NOT NULL,
  explanation_bn TEXT NOT NULL,
  jlpt_level TEXT DEFAULT 'N5' CHECK (jlpt_level IN ('N5', 'N4', 'N3', 'N2', 'N1')),
  examples JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. KANJI TABLE
CREATE TABLE IF NOT EXISTS public.kanji (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  kanji TEXT NOT NULL UNIQUE,
  meaning_en TEXT NOT NULL,
  meaning_bn TEXT NOT NULL,
  onyomi TEXT[] DEFAULT ARRAY[]::TEXT[],
  kunyomi TEXT[] DEFAULT ARRAY[]::TEXT[],
  stroke_count INTEGER DEFAULT 1,
  jlpt_level TEXT DEFAULT 'N5' CHECK (jlpt_level IN ('N5', 'N4', 'N3', 'N2', 'N1')),
  compounds JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. QUIZZES TABLE
CREATE TABLE IF NOT EXISTS public.quizzes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  passing_score INTEGER DEFAULT 70,
  xp_reward INTEGER DEFAULT 15,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. QUIZ QUESTIONS TABLE
CREATE TABLE IF NOT EXISTS public.quiz_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
  type TEXT DEFAULT 'multiple-choice' CHECK (type IN ('multiple-choice', 'recognition', 'matching', 'fill-blank', 'listening')),
  prompt_en TEXT NOT NULL,
  prompt_bn TEXT,
  audio_text TEXT,
  options JSONB NOT NULL DEFAULT '[]'::jsonb,
  correct_answer TEXT NOT NULL,
  explanation_en TEXT,
  explanation_bn TEXT,
  order_index INTEGER DEFAULT 0
);

-- 9. QUIZ ATTEMPTS TABLE
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  passed BOOLEAN DEFAULT FALSE,
  xp_earned INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. ACHIEVEMENTS TABLE
CREATE TABLE IF NOT EXISTS public.achievements (
  id TEXT PRIMARY KEY,
  title_en TEXT NOT NULL,
  title_bn TEXT NOT NULL,
  desc_en TEXT NOT NULL,
  desc_bn TEXT NOT NULL,
  icon TEXT NOT NULL,
  max_progress INTEGER DEFAULT 1,
  xp_reward INTEGER DEFAULT 50
);

-- 11. USER ACHIEVEMENTS TABLE
CREATE TABLE IF NOT EXISTS public.user_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  achievement_id TEXT NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
  unlocked BOOLEAN DEFAULT FALSE,
  progress INTEGER DEFAULT 0,
  unlocked_at TIMESTAMPTZ,
  UNIQUE(user_id, achievement_id)
);

-- ========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vocabulary ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grammar ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kanji ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

-- Educational materials: Everyone can READ
CREATE POLICY "Public read for lessons" ON public.lessons FOR SELECT USING (true);
CREATE POLICY "Public read for vocabulary" ON public.vocabulary FOR SELECT USING (true);
CREATE POLICY "Public read for grammar" ON public.grammar FOR SELECT USING (true);
CREATE POLICY "Public read for kanji" ON public.kanji FOR SELECT USING (true);
CREATE POLICY "Public read for quizzes" ON public.quizzes FOR SELECT USING (true);
CREATE POLICY "Public read for quiz_questions" ON public.quiz_questions FOR SELECT USING (true);
CREATE POLICY "Public read for achievements" ON public.achievements FOR SELECT USING (true);

-- User Private Data: Users manage their own records
CREATE POLICY "Users can read own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can read own progress" ON public.lesson_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON public.lesson_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON public.lesson_progress FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can read own attempts" ON public.quiz_attempts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own attempts" ON public.quiz_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own achievements" ON public.user_achievements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert/update own achievements" ON public.user_achievements FOR ALL USING (auth.uid() = user_id);

-- Admin Full Access: Admin role can perform all mutations
CREATE POLICY "Admins full access to lessons" ON public.lessons FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins full access to vocabulary" ON public.vocabulary FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ========================================================================
-- AUTOMATIC PROFILE CREATION TRIGGER (When user signs up via Supabase Auth)
-- ========================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    COALESCE(new.raw_user_meta_data->>'avatar_url', ''),
    COALESCE(new.raw_user_meta_data->>'role', 'student')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
