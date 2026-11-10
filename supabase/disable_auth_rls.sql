-- ==============================================================================
-- Lumo Buddy - Direct Authentication & Open Access SQL Script
-- 
-- Run this script in the Supabase SQL Editor if you want sign-in, sign-up,
-- and child assessments to work directly without Supabase Auth email restrictions
-- or RLS token permission errors.
-- ==============================================================================

-- 1. Disable Row Level Security on core application tables
ALTER TABLE IF EXISTS public.parents DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.children DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.assessments DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.survey_responses DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.game_scores DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.survey_questions DISABLE ROW LEVEL SECURITY;

-- 2. Grant table permissions to anon and authenticated roles
GRANT ALL ON TABLE public.parents TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.children TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.assessments TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.survey_responses TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.game_scores TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.survey_questions TO anon, authenticated, service_role;

-- 3. Grant sequence usage permissions if any exist
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;

