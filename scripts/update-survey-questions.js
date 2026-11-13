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
    question: "Can your child tell if you are happy, sad, or angry by looking at your face?",
    feature_name: "Recognizes facial expressions",
    sort_order: 1,
    is_active: true,
    options: [
      "Not yet (Doesn't seem to notice)",
      "Sometimes (If I point it out)",
      "Usually (Notices on their own)",
      "Always (Notices and reacts right away)",
    ],
  },
  {
    id: 2,
    area: "emotion",
    question: "Does your child understand why someone is sad (like if a toy breaks or ice cream drops)?",
    feature_name: "Understands causes of feelings",
    sort_order: 2,
    is_active: true,
    options: [
      "Hard to understand",
      "Understands if explained gently",
      "Usually understands why",
      "Easily understands and talks about it",
    ],
  },
  {
    id: 3,
    area: "emotion",
    question: "Can your child recognize feelings like surprise, fear, or excitement?",
    feature_name: "Recognizes more complex emotions",
    sort_order: 3,
    is_active: true,
    options: [
      "Not yet (Only basic feelings)",
      "With a little help",
      "Usually recognizes them",
      "Always recognizes them easily",
    ],
  },
  {
    id: 4,
    area: "emotion",
    question: "Does your child look at you to share excitement when they see something fun?",
    feature_name: "Looks at parent to share joy",
    sort_order: 4,
    is_active: true,
    options: [
      "Rarely (Stays focused on the item)",
      "Only if called by name",
      "Often looks to share the fun",
      "Always shares excitement with a smile",
    ],
  },
  {
    id: 5,
    area: "emotion",
    question: "How does your child react if a family member or friend is crying or hurt?",
    feature_name: "Reacts when someone is crying or hurt",
    sort_order: 5,
    is_active: true,
    options: [
      "Does not notice or keeps playing",
      "Watches quietly or looks confused",
      "Shows concern (gives a hug or toy)",
      "Quickly comforts them with care",
    ],
  },
  {
    id: 6,
    area: "emotion",
    question: "How does your child let you know when they are upset or very happy?",
    feature_name: "Expresses own feelings",
    sort_order: 6,
    is_active: true,
    options: [
      "Cries or screams without words",
      "Points, pulls hands, or uses gestures",
      "Uses simple words to say what's wrong",
      "Clearly talks about how they feel",
    ],
  },

  // ── Category 2: Social & Cognitive ──
  {
    id: 7,
    area: "cognitive",
    question: "Does your child remember where their favorite toys, snacks, or shoes are kept?",
    feature_name: "Remembers where items are kept",
    sort_order: 7,
    is_active: true,
    options: [
      "Always needs help to find them",
      "Finds them with a small reminder",
      "Usually remembers familiar spots",
      "Always remembers where items belong",
    ],
  },
  {
    id: 8,
    area: "cognitive",
    question: "Does your child notice simple patterns (like striped shirts, rhythms, or colored blocks)?",
    feature_name: "Notices repeating patterns",
    sort_order: 8,
    is_active: true,
    options: [
      "Does not notice patterns yet",
      "Notices when shown by an adult",
      "Often spots and likes patterns",
      "Easily makes and continues patterns",
    ],
  },
  {
    id: 9,
    area: "cognitive",
    question: "How does your child handle small changes in routine (like a new road or new food)?",
    feature_name: "Adapts to unexpected changes",
    sort_order: 9,
    is_active: true,
    options: [
      "Gets very upset or resists",
      "Needs extra time and comfort to adjust",
      "Adjusts well after a few minutes",
      "Adapts easily and calmly",
    ],
  },
  {
    id: 10,
    area: "cognitive",
    question: "Can your child focus on a quiet activity (like coloring, puzzles, or blocks) for 5 to 10 minutes?",
    feature_name: "Focuses on quiet activity for 5-10 minutes",
    sort_order: 10,
    is_active: true,
    options: [
      "Loses interest in 1–2 minutes",
      "Stays focused if an adult sits with them",
      "Focuses well for 5 to 10 minutes",
      "Easily stays focused until finished",
    ],
  },
  {
    id: 11,
    area: "cognitive",
    question: "Can your child follow a simple 2-step instruction (like 'wash hands, then come eat')?",
    feature_name: "Follows simple step-by-step instructions",
    sort_order: 11,
    is_active: true,
    options: [
      "Needs help for each single step",
      "Follows with gentle reminders",
      "Usually follows 2 steps easily",
      "Follows multiple steps on their own",
    ],
  },
  {
    id: 12,
    area: "cognitive",
    question: "When a block tower falls or a toy gets stuck, what does your child do?",
    feature_name: "Solves small everyday problems",
    sort_order: 12,
    is_active: true,
    options: [
      "Gives up or gets frustrated right away",
      "Tries again if shown what to do",
      "Tries 2 or 3 ways to fix it",
      "Calmly finds a solution on their own",
    ],
  },

  // ── Category 3: Behavior & Sensory ──
  {
    id: 13,
    area: "self_awareness",
    question: "When you give your child a choice between two snacks or clothes, how do they choose?",
    feature_name: "Makes simple everyday choices",
    sort_order: 13,
    is_active: true,
    options: [
      "Gets confused or overwhelmed",
      "Points or reaches after some time",
      "Easily picks their favorite",
      "Confidently chooses and says why",
    ],
  },
  {
    id: 14,
    area: "self_awareness",
    question: "Does your child know the order of their day (like wake up, brush teeth, eat, and sleep)?",
    feature_name: "Follows daily routine sequence",
    sort_order: 14,
    is_active: true,
    options: [
      "Needs direction for every step",
      "Follows with daily reminders",
      "Knows the general daily routine",
      "Knows the routine and gets ready on their own",
    ],
  },
  {
    id: 15,
    area: "self_awareness",
    question: "How does your child handle loud noises (like blenders) or crowded busy places?",
    feature_name: "Copes with loud noises or busy spaces",
    sort_order: 15,
    is_active: true,
    options: [
      "Gets very scared, cries, or covers ears",
      "Needs an adult to take them to a quiet spot",
      "Says it is too loud and asks for a break",
      "Stays calm or moves to a quiet spot on their own",
    ],
  },
  {
    id: 16,
    area: "self_awareness",
    question: "Does your child walk safely around furniture, doors, and people without bumping into them?",
    feature_name: "Body awareness and spatial navigation",
    sort_order: 16,
    is_active: true,
    options: [
      "Often bumps into things or trips",
      "Needs reminders to watch where they walk",
      "Usually walks safely without bumping",
      "Moves with great balance and control",
    ],
  },
  {
    id: 17,
    area: "self_awareness",
    question: "When it is time to stop playing for dinner or bedtime, how does your child react?",
    feature_name: "Handles stopping play and transitions",
    sort_order: 17,
    is_active: true,
    options: [
      "Cries, throws a tantrum, or refuses",
      "Cooperates if given a 5-minute warning",
      "Stops playing with one gentle reminder",
      "Cleans up and moves on happily",
    ],
  },
  {
    id: 18,
    area: "self_awareness",
    question: "When your child cannot reach a toy or open a box, how do they ask for help?",
    feature_name: "Asks for help when needed",
    sort_order: 18,
    is_active: true,
    options: [
      "Cries or gets mad without asking",
      "Pulls your hand toward the item",
      "Uses simple words or gestures to ask",
      "Clearly asks: 'Can you help me please?'",
    ],
  },

  // ── Category 4: Learning & Logic ──
  {
    id: 19,
    area: "mathematical",
    question: "Can your child count a small row of 3 to 5 objects (like apples or blocks) by touching each one?",
    feature_name: "Counts 3 to 5 items one by one",
    sort_order: 19,
    is_active: true,
    options: [
      "Cannot count items one by one yet",
      "Counts up to 3 with help",
      "Accurately counts 3 to 5 items",
      "Easily counts 10 or more items correctly",
    ],
  },
  {
    id: 20,
    area: "mathematical",
    question: "Can your child identify basic shapes (like a round ball, square box, or star)?",
    feature_name: "Recognizes everyday basic shapes",
    sort_order: 20,
    is_active: true,
    options: [
      "Does not recognize shapes yet",
      "Points to shapes when named",
      "Names basic shapes like circle and square",
      "Easily names many shapes around the house",
    ],
  },
  {
    id: 21,
    area: "mathematical",
    question: "If you ask your child: 'Please give me 2 cookies', do they bring the exact number?",
    feature_name: "Brings exact requested quantity",
    sort_order: 21,
    is_active: true,
    options: [
      "Brings a random handful",
      "Brings the right amount with a little help",
      "Usually brings the exact number up to 3",
      "Always brings the exact count up to 5 or more",
    ],
  },
  {
    id: 22,
    area: "mathematical",
    question: "Does your child know which object is bigger, or which cup has more water?",
    feature_name: "Compares sizes and amounts",
    sort_order: 22,
    is_active: true,
    options: [
      "Finds size and amount comparisons confusing",
      "Notices only when they are side by side",
      "Usually tells which is bigger or has more",
      "Always compares size and amount easily",
    ],
  },
  {
    id: 23,
    area: "mathematical",
    question: "Can your child find an item with two clues (like 'the red ball' or 'the big cup')?",
    feature_name: "Finds items by two traits",
    sort_order: 23,
    is_active: true,
    options: [
      "Only listens to one clue",
      "Finds it if repeated slowly",
      "Usually finds the right item on the first try",
      "Easily finds and sorts items by color and size",
    ],
  },
  {
    id: 24,
    area: "mathematical",
    question: "If your child has 2 blocks and you give 1 more, do they understand they now have 3?",
    feature_name: "Understands adding one more",
    sort_order: 24,
    is_active: true,
    options: [
      "Does not understand adding one more yet",
      "Recounts all the blocks from 1 to find out",
      "Quickly says '3' for small additions (2 + 1)",
      "Easily solves small math questions in their head",
    ],
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
