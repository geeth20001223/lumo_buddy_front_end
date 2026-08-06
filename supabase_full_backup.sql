-- ============================================================================
-- LUMO BUDDY - FULL SUPABASE DATABASE BACKUP & SCHEMA EXPORT
-- Generated for Complete Deployment / Restore to Any Supabase Instance
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ----------------------------------------------------------------------------
-- 1. PARENTS TABLE (Syncs with Supabase Auth)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.parents (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 2. CHILDREN TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.children (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_id UUID NOT NULL REFERENCES public.parents(id) ON DELETE CASCADE,
    child_name TEXT NOT NULL,
    age INT NOT NULL,
    gender TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 3. SURVEY QUESTIONS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.survey_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    area TEXT NOT NULL, -- 'emotion', 'cognitive', 'self_awareness', 'mathematical'
    question TEXT NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 4. ASSESSMENTS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    child_id UUID NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
    emotion_score INT NOT NULL DEFAULT 0,
    cognitive_score INT NOT NULL DEFAULT 0,
    self_awareness_score INT NOT NULL DEFAULT 0,
    math_score INT NOT NULL DEFAULT 0,
    total_score INT NOT NULL DEFAULT 0,
    predicted_level INT NOT NULL DEFAULT 1,
    recommendation TEXT,
    emotion_level INT DEFAULT 1,
    cognitive_level INT DEFAULT 1,
    self_awareness_level INT DEFAULT 1,
    math_level INT DEFAULT 1,
    main_support_area TEXT,
    strongest_area TEXT,
    confidence FLOAT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 5. SURVEY RESPONSES TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.survey_responses (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    assessment_id UUID REFERENCES public.assessments(id) ON DELETE CASCADE,
    child_id UUID NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
    question_id UUID REFERENCES public.survey_questions(id) ON DELETE CASCADE,
    answer_score INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 6. GAMES TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.games (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    game_name TEXT NOT NULL,
    game_slug TEXT NOT NULL,
    area TEXT NOT NULL, -- 'emotion', 'cognitive', 'self_awareness', 'mathematical'
    level INT NOT NULL DEFAULT 1,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 7. GAME SCORES TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.game_scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    child_id UUID NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
    game_id UUID REFERENCES public.games(id) ON DELETE CASCADE,
    area TEXT NOT NULL,
    level INT NOT NULL DEFAULT 1,
    correct_answers INT NOT NULL DEFAULT 0,
    wrong_answers INT NOT NULL DEFAULT 0,
    attempts INT NOT NULL DEFAULT 0,
    time_taken INT NOT NULL DEFAULT 0,
    final_score INT NOT NULL DEFAULT 0,
    played_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- INDEXES FOR FAST QUERY PERFORMANCE
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_children_parent_id ON public.children(parent_id);
CREATE INDEX IF NOT EXISTS idx_assessments_child_id ON public.assessments(child_id);
CREATE INDEX IF NOT EXISTS idx_survey_responses_child_id ON public.survey_responses(child_id);
CREATE INDEX IF NOT EXISTS idx_game_scores_child_id ON public.game_scores(child_id);
CREATE INDEX IF NOT EXISTS idx_game_scores_played_at ON public.game_scores(played_at DESC);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE public.parents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.children ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.survey_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.survey_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_scores ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active survey questions & active games
CREATE POLICY "Public can view active survey questions" ON public.survey_questions FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public can view active games" ON public.games FOR SELECT USING (is_active = TRUE);

-- Parent Row-Level Access Policies
CREATE POLICY "Parents can view and edit own profile" ON public.parents FOR ALL USING (auth.uid() = id);
CREATE POLICY "Parents can manage own children" ON public.children FOR ALL USING (auth.uid() = parent_id);
CREATE POLICY "Parents can view and create assessments" ON public.assessments FOR ALL USING (
    EXISTS (SELECT 1 FROM public.children WHERE children.id = assessments.child_id AND children.parent_id = auth.uid())
);
CREATE POLICY "Parents can manage survey responses" ON public.survey_responses FOR ALL USING (
    EXISTS (SELECT 1 FROM public.children WHERE children.id = survey_responses.child_id AND children.parent_id = auth.uid())
);
CREATE POLICY "Parents can manage game scores" ON public.game_scores FOR ALL USING (
    EXISTS (SELECT 1 FROM public.children WHERE children.id = game_scores.child_id AND children.parent_id = auth.uid())
);

-- ============================================================================
-- DEFAULT SEED DATA INSERTION (SURVEY QUESTIONS & GAMES)
-- ============================================================================

-- Seed Games
INSERT INTO public.games (game_name, game_slug, area, level, description, is_active) VALUES
('Emotion Face Match', 'emotion-face-match', 'emotion', 1, 'Match the face expression with the correct feeling.', TRUE),
('Situation Emotion Choice', 'situation-emotion-choice', 'emotion', 2, 'Choose how someone feels in different situations.', TRUE),
('Emotion Story Choice', 'emotion-story-choice', 'emotion', 3, 'Read a short story and select the best emotional response.', TRUE),
('Memory Card Match', 'memory-card-match', 'cognitive', 1, 'Flip cards and match matching pairs.', TRUE),
('Pattern Completion', 'pattern-completion', 'cognitive', 2, 'Identify the pattern sequence and select what comes next.', TRUE),
('Daily Routine Order', 'daily-routine-order', 'self_awareness', 1, 'Arrange daily activities in the correct time sequence.', TRUE),
('Feeling & Need Match', 'feeling-need-choice', 'self_awareness', 2, 'Match how you feel with what helps you feel better.', TRUE),
('Count Objects', 'count-objects', 'mathematical', 1, 'Count the colorful objects on screen.', TRUE),
('Number & Shape Match', 'shape-number-match', 'mathematical', 2, 'Match numbers with the correct quantity of shapes.', TRUE)
ON CONFLICT DO NOTHING;

-- Seed Survey Questions
INSERT INTO public.survey_questions (area, question, sort_order, is_active) VALUES
('emotion', 'Child identifies basic emotions (happy, sad, angry) accurately.', 1, TRUE),
('emotion', 'Child expresses feelings appropriately when overwhelmed.', 2, TRUE),
('emotion', 'Child recognizes emotions in facial expressions of others.', 3, TRUE),
('cognitive', 'Child focuses on an activity for at least 5 minutes.', 4, TRUE),
('cognitive', 'Child recognizes repeating patterns and simple sequences.', 5, TRUE),
('cognitive', 'Child remembers simple instructions given in two steps.', 6, TRUE),
('self_awareness', 'Child identifies daily routines (brushing teeth, bedtime, eating).', 7, TRUE),
('self_awareness', 'Child communicates needs clearly (hunger, tiredness, break).', 8, TRUE),
('mathematical', 'Child counts objects up to 10 accurately.', 9, TRUE),
('mathematical', 'Child matches numbers with correct amounts of items.', 10, TRUE)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- END OF BACKUP FILE
-- ============================================================================
