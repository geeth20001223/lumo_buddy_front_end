-- ============================================================================
-- LUMO BUDDY: Update Survey Questions & Table Structure in Supabase
-- Run this in your Supabase Dashboard -> SQL Editor
-- This updates rows 1 to 13 with the new questions & options,
-- safely cleans up old questions > 13, and adds the options column.
-- ============================================================================

-- Step 1: Ensure public.survey_questions has options (JSONB) and feature_name (TEXT) columns
ALTER TABLE public.survey_questions ADD COLUMN IF NOT EXISTS options jsonb;
ALTER TABLE public.survey_questions ADD COLUMN IF NOT EXISTS feature_name text;

-- Step 2: Ensure public.survey_responses has answer_text column for storing exact response string
ALTER TABLE public.survey_responses ADD COLUMN IF NOT EXISTS answer_text text;

-- Step 3: Update Foreign Key to ON DELETE CASCADE so old questions can be safely cleaned up
ALTER TABLE public.survey_responses DROP CONSTRAINT IF EXISTS survey_responses_question_id_fkey;
ALTER TABLE public.survey_responses 
    ADD CONSTRAINT survey_responses_question_id_fkey 
    FOREIGN KEY (question_id) REFERENCES public.survey_questions(id) ON DELETE CASCADE;

-- Step 4: Ensure RLS policies allow public read and authenticated management
DROP POLICY IF EXISTS "Allow all update survey_questions" ON public.survey_questions;
CREATE POLICY "Allow all update survey_questions" ON public.survey_questions FOR UPDATE USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all delete survey_questions" ON public.survey_questions;
CREATE POLICY "Allow all delete survey_questions" ON public.survey_questions FOR DELETE USING (true);

DROP POLICY IF EXISTS "Allow public read on survey_questions" ON public.survey_questions;
CREATE POLICY "Allow public read on survey_questions" ON public.survey_questions FOR SELECT USING (true);

-- Step 5: Clean up old questions > 13 (and their responses)
DELETE FROM public.survey_questions WHERE id > 13;

-- Step 6: Update existing rows 1 to 13 with the 13 new questions, areas, and options
UPDATE public.survey_questions SET
    area = 'demographics',
    question = 'Which age group does your child belong to',
    feature_name = 'Which age group does your child belong to',
    sort_order = 1,
    is_active = true,
    options = '["0-3", "4-6", "7-9", "10-12", "12 and above"]'::jsonb
WHERE id = 1;

UPDATE public.survey_questions SET
    area = 'demographics',
    question = 'Sex of child',
    feature_name = 'Sex of child',
    sort_order = 2,
    is_active = true,
    options = '["Male", "Female"]'::jsonb
WHERE id = 2;

UPDATE public.survey_questions SET
    area = 'history',
    question = 'Please what is the age of the Mother when the child was born',
    feature_name = 'Please what is the age of the Mother when the child was born',
    sort_order = 3,
    is_active = true,
    options = '["below 20yrs", "20yrs - 25yrs", "26yrs - 34yrs", "above 35yrs"]'::jsonb
WHERE id = 3;

UPDATE public.survey_questions SET
    area = 'clinical',
    question = 'Is your child Formerly diagnosed',
    feature_name = 'Is your child Formerly diagnosed',
    sort_order = 4,
    is_active = true,
    options = '["Yes", "No"]'::jsonb
WHERE id = 4;

UPDATE public.survey_questions SET
    area = 'clinical',
    question = 'If Diagnosis is yes, what was his/her diagnosis? (DSM 4 Diagnosis)',
    feature_name = 'If Diagnosis is yes , what was his/her diagnosis? (DSM 4 Diagnosis)',
    sort_order = 5,
    is_active = true,
    options = '["Autism", "ADHD", "Aspergers", "PDD Nos", "Infection", "Social pragmatic Communication Disorder"]'::jsonb
WHERE id = 5;

UPDATE public.survey_questions SET
    area = 'history',
    question = 'At what age was the child diagnosed',
    feature_name = 'At what age was the child diagnosed',
    sort_order = 6,
    is_active = true,
    options = '["6 months", "1", "2", "2.5", "3", "4", "5", "6", "7", "8", "16", "After birth", "At birth, now he is 5years", "At 1 year 2 months"]'::jsonb
WHERE id = 6;

UPDATE public.survey_questions SET
    area = 'communication',
    question = 'Is your child',
    feature_name = 'Is your child ',
    sort_order = 7,
    is_active = true,
    options = '["Verbal", "Non- Verbal", "Just Few Words", "lots of words and phrases", "Very verbal", "VERBAL WITH MANY WORDS AND FEW PHRASES"]'::jsonb
WHERE id = 7;

UPDATE public.survey_questions SET
    area = 'social',
    question = 'How can you rate your child''s deficits in social communication and social interaction (This serves as the ML target severity metric)',
    feature_name = 'How can you rate your child''s deficits in social communication and social interaction (This serves as the ML target severity metric)',
    sort_order = 8,
    is_active = true,
    options = '["Mild", "Moderate", "Severe"]'::jsonb
WHERE id = 8;

UPDATE public.survey_questions SET
    area = 'communication',
    question = 'How can you rate your Childs nonverbal communicative behaviors capabilities (abnormalities in eye contact, body language or deficits in understanding, use of gestures, total lack of facial expressions and nonverbal communication)',
    feature_name = 'How can you rate your Childs nonverbal communicative behaviors capabilities (i.e abnormalities in eye contact, body language or deficits in understanding, use of gestures, total lack of facial expressions and nonverbal communication)',
    sort_order = 9,
    is_active = true,
    options = '["Good", "Fair", "Poor", "Very good", "he has different strengths in different areas"]'::jsonb
WHERE id = 9;

UPDATE public.survey_questions SET
    area = 'social',
    question = 'Can your Child develop, maintain and understand relationships (as in difficulties in sharing imaginative play or in making friends and absence of interest in peers.)',
    feature_name = 'Can your Child develop, maintain and understand relationships(as in difficulties in sharing imaginative play or in making friends and absence of interest in peers.)',
    sort_order = 10,
    is_active = true,
    options = '["Yes", "No", "Some times"]'::jsonb
WHERE id = 10;

UPDATE public.survey_questions SET
    area = 'behavior',
    question = 'Do your Child has Stereotyped or repetitive motor movements and echolalia',
    feature_name = 'Do your Child has Stereotyped or repetitive motor movements and  echolalia',
    sort_order = 11,
    is_active = true,
    options = '["Yes", "No", "Sometimes"]'::jsonb
WHERE id = 11;

UPDATE public.survey_questions SET
    area = 'sensory',
    question = 'How is his/her Hyporeactivity to sensory aspects of the environment (i.e can he differentiate pain/temperature, respond to specific sounds or textures, do excessive smelling or touching of objects)',
    feature_name = 'How is his/her Hyporeactivity to  sensory aspects of the environment (i.e can he differentiate pain/temperature,  respond to specific sounds or textures, do excessive smelling or touching of objects)',
    sort_order = 12,
    is_active = true,
    options = '["Mild", "Moderate", "Severe"]'::jsonb
WHERE id = 12;

UPDATE public.survey_questions SET
    area = 'clinical',
    question = 'Please what other challenges is your childs diagnosed apart from Autism',
    feature_name = 'Please what other challenges is your childs diagnosed apart from Autism',
    sort_order = 13,
    is_active = true,
    options = '["Attention deficit Hyperactivity Disorder (ADHD)", "Anxiety disorders", "Epilepsy", "Specific learning difficulties", "Speech Delay"]'::jsonb
WHERE id = 13;

-- Step 7: In case any question 1..13 didn't exist yet, insert it
INSERT INTO public.survey_questions (id, area, question, sort_order, is_active, options, feature_name)
SELECT 1, 'demographics', 'Which age group does your child belong to', 1, true, '["0-3", "4-6", "7-9", "10-12", "12 and above"]'::jsonb, 'Which age group does your child belong to'
WHERE NOT EXISTS (SELECT 1 FROM public.survey_questions WHERE id = 1);

INSERT INTO public.survey_questions (id, area, question, sort_order, is_active, options, feature_name)
SELECT 2, 'demographics', 'Sex of child', 2, true, '["Male", "Female"]'::jsonb, 'Sex of child'
WHERE NOT EXISTS (SELECT 1 FROM public.survey_questions WHERE id = 2);

INSERT INTO public.survey_questions (id, area, question, sort_order, is_active, options, feature_name)
SELECT 3, 'history', 'Please what is the age of the Mother when the child was born', 3, true, '["below 20yrs", "20yrs - 25yrs", "26yrs - 34yrs", "above 35yrs"]'::jsonb, 'Please what is the age of the Mother when the child was born'
WHERE NOT EXISTS (SELECT 1 FROM public.survey_questions WHERE id = 3);

INSERT INTO public.survey_questions (id, area, question, sort_order, is_active, options, feature_name)
SELECT 4, 'clinical', 'Is your child Formerly diagnosed', 4, true, '["Yes", "No"]'::jsonb, 'Is your child Formerly diagnosed'
WHERE NOT EXISTS (SELECT 1 FROM public.survey_questions WHERE id = 4);

INSERT INTO public.survey_questions (id, area, question, sort_order, is_active, options, feature_name)
SELECT 5, 'clinical', 'If Diagnosis is yes, what was his/her diagnosis? (DSM 4 Diagnosis)', 5, true, '["Autism", "ADHD", "Aspergers", "PDD Nos", "Infection", "Social pragmatic Communication Disorder"]'::jsonb, 'If Diagnosis is yes , what was his/her diagnosis? (DSM 4 Diagnosis)'
WHERE NOT EXISTS (SELECT 1 FROM public.survey_questions WHERE id = 5);

INSERT INTO public.survey_questions (id, area, question, sort_order, is_active, options, feature_name)
SELECT 6, 'history', 'At what age was the child diagnosed', 6, true, '["6 months", "1", "2", "2.5", "3", "4", "5", "6", "7", "8", "16", "After birth", "At birth, now he is 5years", "At 1 year 2 months"]'::jsonb, 'At what age was the child diagnosed'
WHERE NOT EXISTS (SELECT 1 FROM public.survey_questions WHERE id = 6);

INSERT INTO public.survey_questions (id, area, question, sort_order, is_active, options, feature_name)
SELECT 7, 'communication', 'Is your child', 7, true, '["Verbal", "Non- Verbal", "Just Few Words", "lots of words and phrases", "Very verbal", "VERBAL WITH MANY WORDS AND FEW PHRASES"]'::jsonb, 'Is your child '
WHERE NOT EXISTS (SELECT 1 FROM public.survey_questions WHERE id = 7);

INSERT INTO public.survey_questions (id, area, question, sort_order, is_active, options, feature_name)
SELECT 8, 'social', 'How can you rate your child''s deficits in social communication and social interaction (This serves as the ML target severity metric)', 8, true, '["Mild", "Moderate", "Severe"]'::jsonb, 'How can you rate your child''s deficits in social communication and social interaction (This serves as the ML target severity metric)'
WHERE NOT EXISTS (SELECT 1 FROM public.survey_questions WHERE id = 8);

INSERT INTO public.survey_questions (id, area, question, sort_order, is_active, options, feature_name)
SELECT 9, 'communication', 'How can you rate your Childs nonverbal communicative behaviors capabilities (abnormalities in eye contact, body language or deficits in understanding, use of gestures, total lack of facial expressions and nonverbal communication)', 9, true, '["Good", "Fair", "Poor", "Very good", "he has different strengths in different areas"]'::jsonb, 'How can you rate your Childs nonverbal communicative behaviors capabilities (i.e abnormalities in eye contact, body language or deficits in understanding, use of gestures, total lack of facial expressions and nonverbal communication)'
WHERE NOT EXISTS (SELECT 1 FROM public.survey_questions WHERE id = 9);

INSERT INTO public.survey_questions (id, area, question, sort_order, is_active, options, feature_name)
SELECT 10, 'social', 'Can your Child develop, maintain and understand relationships (as in difficulties in sharing imaginative play or in making friends and absence of interest in peers.)', 10, true, '["Yes", "No", "Some times"]'::jsonb, 'Can your Child develop, maintain and understand relationships(as in difficulties in sharing imaginative play or in making friends and absence of interest in peers.)'
WHERE NOT EXISTS (SELECT 1 FROM public.survey_questions WHERE id = 10);

INSERT INTO public.survey_questions (id, area, question, sort_order, is_active, options, feature_name)
SELECT 11, 'behavior', 'Do your Child has Stereotyped or repetitive motor movements and echolalia', 11, true, '["Yes", "No", "Sometimes"]'::jsonb, 'Do your Child has Stereotyped or repetitive motor movements and  echolalia'
WHERE NOT EXISTS (SELECT 1 FROM public.survey_questions WHERE id = 11);

INSERT INTO public.survey_questions (id, area, question, sort_order, is_active, options, feature_name)
SELECT 12, 'sensory', 'How is his/her Hyporeactivity to sensory aspects of the environment (i.e can he differentiate pain/temperature, respond to specific sounds or textures, do excessive smelling or touching of objects)', 12, true, '["Mild", "Moderate", "Severe"]'::jsonb, 'How is his/her Hyporeactivity to  sensory aspects of the environment (i.e can he differentiate pain/temperature,  respond to specific sounds or textures, do excessive smelling or touching of objects)'
WHERE NOT EXISTS (SELECT 1 FROM public.survey_questions WHERE id = 12);

INSERT INTO public.survey_questions (id, area, question, sort_order, is_active, options, feature_name)
SELECT 13, 'clinical', 'Please what other challenges is your childs diagnosed apart from Autism', 13, true, '["Attention deficit Hyperactivity Disorder (ADHD)", "Anxiety disorders", "Epilepsy", "Specific learning difficulties", "Speech Delay"]'::jsonb, 'Please what other challenges is your childs diagnosed apart from Autism'
WHERE NOT EXISTS (SELECT 1 FROM public.survey_questions WHERE id = 13);

-- Step 8: Reset sequence so next ID is 14
SELECT setval('public.survey_questions_id_seq', 13, true);
