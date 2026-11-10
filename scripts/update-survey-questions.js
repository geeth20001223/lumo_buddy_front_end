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
  // ── Category 1: Communication & Emotion ──
  {
    id: 1,
    area: "emotion",
    question: "Does your child notice how you or other family members are feeling by looking at your face (such as when you look happy, sad, or surprised)?",
    feature_name: "Does your child notice how you or other family members are feeling by looking at your face",
    sort_order: 1,
    is_active: true,
    options: ["Does not seem to notice yet", "Notices with a gentle hint", "Usually notices on their own", "Notices and responds right away"],
  },
  {
    id: 2,
    area: "emotion",
    question: "Does your child understand why someone might feel sad or upset (for example, if a favorite toy breaks or an ice cream drops)?",
    feature_name: "Does your child understand why someone might feel sad or upset like if a toy breaks",
    sort_order: 2,
    is_active: true,
    options: ["Finds it difficult to understand", "Understands when gently explained", "Usually understands the reason", "Quickly understands and talks about why"],
  },
  {
    id: 3,
    area: "emotion",
    question: "How easily does your child recognize emotions beyond happy or sad, such as excitement, nervousness, or surprise?",
    feature_name: "How easily does your child recognize emotions beyond happy or sad like excitement or surprise",
    sort_order: 3,
    is_active: true,
    options: ["Mostly notices basic feelings", "Recognizes them with a little help", "Notices quite well in daily life", "Very perceptive to subtle feelings"],
  },
  {
    id: 4,
    area: "emotion",
    question: "Does your child look toward your face to share joy or excitement when they see something interesting or hear a fun sound?",
    feature_name: "Does your child look toward your face to share joy or excitement when they see something interesting",
    sort_order: 4,
    is_active: true,
    options: ["Prefers to stay focused on the object", "Looks over when gently called", "Frequently looks over to share the moment", "Naturally and enthusiastically shares joy"],
  },
  {
    id: 5,
    area: "emotion",
    question: "How does your child typically react when a sibling, friend, or parent is crying or feeling hurt?",
    feature_name: "How does your child typically react when a sibling, friend, or parent is crying or feeling hurt",
    sort_order: 5,
    is_active: true,
    options: ["Keeps playing without noticing", "Watches quietly or seems uncertain", "Offers care, such as a hug or a toy", "Warmly comforts and shows empathy right away"],
  },
  {
    id: 6,
    area: "emotion",
    question: "How does your child express their own feelings when they are feeling upset, overwhelmed, or very happy?",
    feature_name: "How does your child express their own feelings when they are upset, overwhelmed, or very happy",
    sort_order: 6,
    is_active: true,
    options: ["Expresses big distress without words or signs", "Uses gestures, pointing, or leading hands", "Uses simple words or phrases to share feelings", "Comfortably expresses feelings and explains why"],
  },

  // ── Category 2: Social & Cognitive ──
  {
    id: 7,
    area: "cognitive",
    question: "Does your child remember where their everyday belongings (like favorite toys, snacks, or shoes) are kept?",
    feature_name: "Does your child remember where their everyday belongings are kept",
    sort_order: 7,
    is_active: true,
    options: ["Needs help finding them each time", "Finds them with a small reminder", "Remembers familiar spots well", "Always remembers where items belong"],
  },
  {
    id: 8,
    area: "cognitive",
    question: "Does your child notice repeating patterns around the house (such as stripes on clothes, music rhythms, or floor tiles)?",
    feature_name: "Does your child notice repeating patterns around the house like stripes or rhythms",
    sort_order: 8,
    is_active: true,
    options: ["Does not seem to notice patterns", "Notices when pointed out", "Frequently spots and enjoys patterns", "Loves discovering and continuing patterns"],
  },
  {
    id: 9,
    area: "cognitive",
    question: "When an unexpected change occurs in the daily routine (like taking a different route or trying a new food), how does your child adapt?",
    feature_name: "When an unexpected change occurs in the daily routine how does your child adapt",
    sort_order: 9,
    is_active: true,
    options: ["Finds unexpected changes very difficult", "Adjusts with extra reassurance and patience", "Adapts reasonably well after a few minutes", "Adapts smoothly and comfortably"],
  },
  {
    id: 10,
    area: "cognitive",
    question: "How comfortably can your child stay engaged in a quiet tabletop activity (such as coloring, building blocks, or reading) for 5 to 10 minutes?",
    feature_name: "How comfortably can your child stay engaged in a quiet tabletop activity for 5 to 10 minutes",
    sort_order: 10,
    is_active: true,
    options: ["Moves on to something else within 1–2 minutes", "Stays engaged when an adult sits alongside", "Enjoys focusing for 5 to 10 minutes", "Remains happily and deeply focused until finished"],
  },
  {
    id: 11,
    area: "cognitive",
    question: "Does your child follow simple step-by-step routines at home (for example: washing hands, sitting at the table, and having a snack)?",
    feature_name: "Does your child follow simple step-by-step routines at home like wash hands then eat",
    sort_order: 11,
    is_active: true,
    options: ["Needs one step at a time with guidance", "Follows along with gentle reminders", "Comfortably follows familiar 2–3 step routines", "Independently carries out steps with pride"],
  },
  {
    id: 12,
    area: "cognitive",
    question: "When your child encounters a small challenge (such as a tight container lid or a fallen block tower), how do they approach it?",
    feature_name: "When your child encounters a small challenge like a tight lid how do they approach it",
    sort_order: 12,
    is_active: true,
    options: ["Feels discouraged and walks away", "Tries when shown an alternative way", "Tries a couple of different ideas", "Patiently and creatively works out a solution"],
  },

  // ── Category 3: Behavior & Sensory ──
  {
    id: 13,
    area: "self_awareness",
    question: "When you offer your child a choice between two or three options (such as snacks, outfits, or outdoor activities), how do they respond?",
    feature_name: "When you offer your child a choice between two or three options how do they respond",
    sort_order: 13,
    is_active: true,
    options: ["Finds choosing overwhelming or hesitates", "Points or reaches when options are shown", "Easily picks their favorite", "Confidently chooses and explains their preference"],
  },
  {
    id: 14,
    area: "self_awareness",
    question: "How familiar is your child with the natural sequence of daily family routines (such as morning wake-up, meal times, and getting ready for bed)?",
    feature_name: "How familiar is your child with the natural sequence of daily family routines",
    sort_order: 14,
    is_active: true,
    options: ["Relies entirely on step-by-step direction", "Follows with gentle daily reminders", "Knows the general order of the day well", "Confidently anticipates and completes routine steps"],
  },
  {
    id: 15,
    area: "self_awareness",
    question: "When your child is in a setting with bright lights, loud noises, or busy crowds, how do they comfortably cope?",
    feature_name: "When your child is in a setting with bright lights loud noises or crowds how do they cope",
    sort_order: 15,
    is_active: true,
    options: ["Becomes very distressed or covers ears/eyes", "Needs an adult to step away to a quiet place", "Expresses that it is too loud or asks for a break", "Comfortably moves to a calmer spot on their own"],
  },
  {
    id: 16,
    area: "self_awareness",
    question: "How mindfully does your child move their body around furniture, doorways, and other people in familiar spaces?",
    feature_name: "How mindfully does your child move their body around furniture doorways and people",
    sort_order: 16,
    is_active: true,
    options: ["Frequently bumps into things or misjudges space", "Needs occasional reminders to watch their space", "Navigates familiar spaces safely", "Moves with great coordination and spatial awareness"],
  },
  {
    id: 17,
    area: "self_awareness",
    question: "When it is time to wrap up a fun play activity for dinner, clean-up, or bedtime, how does your child handle the transition?",
    feature_name: "When it is time to wrap up play activity for dinner or bedtime how does your child handle transition",
    sort_order: 17,
    is_active: true,
    options: ["Finds stopping play very challenging", "Transitions well with a 5-minute countdown", "Wraps up cooperatively with one gentle reminder", "Transitions happily and smoothly"],
  },
  {
    id: 18,
    area: "self_awareness",
    question: "When your child needs assistance with a hard-to-reach toy or opening a package, how do they request help?",
    feature_name: "When your child needs assistance with hard to reach toy or opening a package how do they ask",
    sort_order: 18,
    is_active: true,
    options: ["Shows distress without seeking help", "Leads an adult by the hand toward the item", "Uses simple words or gestures to ask for help", "Politely asks and describes what they need"],
  },

  // ── Category 4: Learning & Logic ──
  {
    id: 19,
    area: "mathematical",
    question: "When counting a small group of everyday items (such as 3 pieces of fruit or 4 crayons), how does your child count them?",
    feature_name: "When counting a small group of everyday items how does your child count them",
    sort_order: 19,
    is_active: true,
    options: ["Counts without matching each item one by one", "Counts up to 3 items with gentle guidance", "Accurately counts 1 to 5 items one by one", "Easily counts 10 or more items with precision"],
  },
  {
    id: 20,
    area: "mathematical",
    question: "Does your child notice and identify shapes in the world around them (such as a round clock, a square book, or a triangular road sign)?",
    feature_name: "Does your child notice and identify shapes in the world around them",
    sort_order: 20,
    is_active: true,
    options: ["Does not focus on shapes yet", "Points to shapes when prompted", "Names basic shapes like circles and squares", "Enjoys discovering and naming shapes everywhere"],
  },
  {
    id: 21,
    area: "mathematical",
    question: "If you ask your child for a specific quantity (for example, 'Could you please hand me 2 spoons?'), how do they respond?",
    feature_name: "If you ask your child for a specific quantity how do they respond",
    sort_order: 21,
    is_active: true,
    options: ["Hands over a random handful", "Brings the right amount with a little guidance", "Reliably brings the exact count up to 5", "Accurately brings specific quantities up to 10"],
  },
  {
    id: 22,
    area: "mathematical",
    question: "Does your child understand everyday size or amount comparisons (such as who has more juice, or which shoe is bigger)?",
    feature_name: "Does your child understand everyday size or amount comparisons",
    sort_order: 22,
    is_active: true,
    options: ["Finds size and quantity comparisons confusing", "Notices obvious differences when compared side by side", "Usually recognizes which is bigger or has more", "Consistently understands and compares quantities"],
  },
  {
    id: 23,
    area: "mathematical",
    question: "When you ask your child to find an item with two descriptive clues (such as 'the big blue cup' or 'the striped socks'), how do they respond?",
    feature_name: "When you ask your child to find an item with two descriptive clues how do they respond",
    sort_order: 23,
    is_active: true,
    options: ["Focuses on only one clue", "Finds the item when repeated slowly", "Finds the correct item on the first try", "Easily finds and sorts items by multiple traits"],
  },
  {
    id: 24,
    area: "mathematical",
    question: "If your child has 2 treats or blocks and you give them 1 more, do they recognize that they now have 3?",
    feature_name: "If your child has 2 treats or blocks and you give 1 more do they know they have 3",
    sort_order: 24,
    is_active: true,
    options: ["Does not yet understand adding one more", "Recounts all the items together to find the total", "Recognizes simple additions immediately (e.g. 2 + 1 = 3)", "Comfortably figures out small additions in their head"],
  },
];

async function updateQuestions() {
  console.log("Upserting polite parent-facing survey questions to Supabase...");
  try {
    for (const q of QUESTIONS) {
      const { error } = await supabase
        .from("survey_questions")
        .upsert({
          id: q.id,
          area: q.area,
          question: q.question,
          feature_name: q.feature_name,
          sort_order: q.sort_order,
          is_active: q.is_active,
          options: q.options,
        });

      if (error) {
        console.warn(`Upsert notice for question ${q.id}:`, error.message);
      } else {
        console.log(`✓ Upserted question ${q.id} (${q.area})`);
      }
    }
    console.log("Done.");
  } catch (err) {
    console.error("Error during upsert:", err.message);
  }
}

updateQuestions();
