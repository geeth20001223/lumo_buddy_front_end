-- Enable public read permissions on children, parents, assessments, and game_scores
-- Run this in Supabase SQL Editor to allow live database reading in Inspector mode

DROP POLICY IF EXISTS "Allow public select children" ON public.children;
CREATE POLICY "Allow public select children" ON public.children FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public select parents" ON public.parents;
CREATE POLICY "Allow public select parents" ON public.parents FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public select assessments" ON public.assessments;
CREATE POLICY "Allow public select assessments" ON public.assessments FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public select game_scores" ON public.game_scores;
CREATE POLICY "Allow public select game_scores" ON public.game_scores FOR SELECT USING (true);
