const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

// Load .env.local variables
const envPath = path.resolve(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || "";
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
      process.env[key] = value.trim();
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase URL or Key in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const QUESTIONS = [
  {
    id: 1,
    question: "Which age group does your child belong to",
    area: "demographics",
    feature_name: "Which age group does your child belong to",
    options: ["0-3", "4-6", "7-9", "10-12", "12 and above"],
    sort_order: 1,
  },
  {
    id: 2,
    question: "Sex of child",
    area: "demographics",
    feature_name: "Sex of child",
    options: ["Male", "Female"],
    sort_order: 2,
  },
  {
    id: 3,
    question: "Please what is the age of the Mother when the child was born",
    area: "history",
    feature_name: "Please what is the age of the Mother when the child was born",
    options: ["below 20yrs", "20yrs - 25yrs", "26yrs - 34yrs", "above 35yrs"],
    sort_order: 3,
  },
  {
    id: 4,
    question: "Is your child Formerly diagnosed",
    area: "clinical",
    feature_name: "Is your child Formerly diagnosed",
    options: ["Yes", "No"],
    sort_order: 4,
  },
  {
    id: 5,
    question: "If Diagnosis is yes, what was his/her diagnosis? (DSM 4 Diagnosis)",
    area: "clinical",
    feature_name: "If Diagnosis is yes , what was his/her diagnosis? (DSM 4 Diagnosis)",
    options: [
      "Autism",
      "ADHD",
      "Aspergers",
      "PDD Nos",
      "Infection",
      "Social pragmatic Communication Disorder",
    ],
    sort_order: 5,
  },
  {
    id: 6,
    question: "At what age was the child diagnosed",
    area: "history",
    feature_name: "At what age was the child diagnosed",
    options: [
      "6 months",
      "1",
      "2",
      "2.5",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "16",
      "After birth",
      "At birth, now he is 5years",
      "At 1 year 2 months",
    ],
    sort_order: 6,
  },
  {
    id: 7,
    question: "Is your child",
    area: "communication",
    feature_name: "Is your child ",
    options: [
      "Verbal",
      "Non- Verbal",
      "Just Few Words",
      "lots of words and phrases",
      "Very verbal",
      "VERBAL WITH MANY WORDS AND FEW PHRASES",
    ],
    sort_order: 7,
  },
  {
    id: 8,
    question:
      "How can you rate your child's deficits in social communication and social interaction (This serves as the ML target severity metric)",
    area: "social",
    feature_name:
      "How can you rate your child's deficits in social communication and social interaction (This serves as the ML target severity metric)",
    options: ["Mild", "Moderate", "Severe"],
    sort_order: 8,
  },
  {
    id: 9,
    question:
      "How can you rate your Childs nonverbal communicative behaviors capabilities (abnormalities in eye contact, body language or deficits in understanding, use of gestures, total lack of facial expressions and nonverbal communication)",
    area: "communication",
    feature_name:
      "How can you rate your Childs nonverbal communicative behaviors capabilities (i.e abnormalities in eye contact, body language or deficits in understanding, use of gestures, total lack of facial expressions and nonverbal communication)",
    options: [
      "Good",
      "Fair",
      "Poor",
      "Very good",
      "he has different strengths in different areas",
    ],
    sort_order: 9,
  },
  {
    id: 10,
    question:
      "Can your Child develop, maintain and understand relationships (as in difficulties in sharing imaginative play or in making friends and absence of interest in peers.)",
    area: "social",
    feature_name:
      "Can your Child develop, maintain and understand relationships(as in difficulties in sharing imaginative play or in making friends and absence of interest in peers.)",
    options: ["Yes", "No", "Some times"],
    sort_order: 10,
  },
  {
    id: 11,
    question: "Do your Child has Stereotyped or repetitive motor movements and echolalia",
    area: "behavior",
    feature_name: "Do your Child has Stereotyped or repetitive motor movements and  echolalia",
    options: ["Yes", "No", "Sometimes"],
    sort_order: 11,
  },
  {
    id: 12,
    question:
      "How is his/her Hyporeactivity to sensory aspects of the environment (i.e can he differentiate pain/temperature, respond to specific sounds or textures, do excessive smelling or touching of objects)",
    area: "sensory",
    feature_name:
      "How is his/her Hyporeactivity to  sensory aspects of the environment (i.e can he differentiate pain/temperature,  respond to specific sounds or textures, do excessive smelling or touching of objects)",
    options: ["Mild", "Moderate", "Severe"],
    sort_order: 12,
  },
  {
    id: 13,
    question: "Please what other challenges is your childs diagnosed apart from Autism",
    area: "clinical",
    feature_name: "Please what other challenges is your childs diagnosed apart from Autism",
    options: [
      "Attention deficit Hyperactivity Disorder (ADHD)",
      "Anxiety disorders",
      "Epilepsy",
      "Specific learning difficulties",
      "Speech Delay",
    ],
    sort_order: 13,
  },
];

async function updateQuestions() {
  console.log("Checking Supabase survey_questions...");
  const { data: existing, error: readErr } = await supabase
    .from("survey_questions")
    .select("id, question, is_active")
    .limit(5);

  if (readErr) {
    console.error("Error reading survey_questions:", readErr.message);
  } else {
    console.log(`Connected to Supabase. Found existing questions.`);
  }

  console.log("To update Supabase directly with all 13 questions and options, run the SQL script at:");
  console.log("  supabase/update_survey_questions.sql in your Supabase SQL Editor.");
}

updateQuestions();
