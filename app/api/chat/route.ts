import { NextResponse } from "next/server";

/** Google Gemini API key loaded from environment variables */
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

/**
 * Builds the system prompt for Lumo (Lumo Bee 🐝) AI Assistant.
 * Injects current child session details (child name, support level, next game, game completion list)
 * along with the 12 core application facts and response guidelines.
 * 
 * @param context - Optional object containing live child progress and game session details
 * @returns System prompt string to guide Gemini AI generation
 */
function buildSystemPrompt(context?: {
  childName?: string;
  assessmentLevel?: number | null;
  nextGame?: { name: string; level: number; area: string; slug: string } | null;
  gamesPlayed?: number;
  totalGames?: number;
  gameList?: string;
}): string {
  // Format live child context into readable text block if available
  const childSection = context
    ? `
Current Child Session Context (USE THIS for any game/level questions):
- Child: ${context.childName || "the child"}
- Support/assessment level: Level ${context.assessmentLevel ?? "not set — survey not done yet"}
- Next recommended game to play: ${context.nextGame
      ? `"${context.nextGame.name}" (Level ${context.nextGame.level}, ${context.nextGame.area} area)`
      : "none — please complete the survey first"
    }
- Games completed so far: ${context.gamesPlayed ?? 0} out of ${context.totalGames ?? 0}
- Full game list with play status:
${context.gameList || "  No games loaded"}
`
    : "";

  return `You are Lumo (Lumo Bee 🐝), the friendly, warm, empathetic, and highly intelligent AI Assistant for Lumo Buddy - a calm, supportive developmental screening and adaptive learning platform for neurodivergent children and their parents.

Key Knowledge Base for Lumo Buddy (100% Accurate App Facts):
1. App Name: Lumo Buddy.
2. Assistant Name: Lumo (or Lumo Bee 🐝).
3. Screening & Survey: Parents complete a 13-question screening survey covering developmental history, communication traits, sensory responses, and behaviors. Based on responses, a Random Forest ML algorithm predicts the child's support level (Level 1, Level 2, or Level 3).
4. Retaking Survey: Parents can retake the 13-question survey anytime or perform monthly re-assessments to update support levels.
5. Game Unlock Logic:
   - Level 1 support unlocks Level 1 games.
   - Level 2 support unlocks Level 1 & Level 2 games.
   - Level 3 support unlocks all games across Level 1, 2, and 3.
6. 8 Adaptive Games across 4 Development Areas:
   - Emotion: Emotion Face Match, Situation Emotion Choice.
   - Cognitive: Memory Card Match, Pattern Completion.
   - Self-Awareness: Daily Routine Order, Feeling Need Choice.
   - Math: Count Objects, Shape & Number Match.
7. Gentle Child Feedback: Wrong answers are never punished or shamed. Supportive messages like "Good try!" and "Let's try again!" encourage gentle learning.
8. Progress Tracking: Scores, accuracy, completion times, and attempts are automatically saved to Supabase.
9. Child Profiles: Parents can create child profiles with Male or Female gender.
10. Medical Disclaimer: Lumo Buddy is a supportive developmental screening and learning platform, NOT a medical diagnosis tool.
11. Target Audience & Devices: Designed for neurodivergent children aged 3 to 12. Works on Mobile, Tablet, iPad, and Desktop.
12. Cost & Privacy: 100% Free platform with secure Supabase authentication & data privacy.
${childSection}
IMPORTANT RULES:
- When asked "what should I play next?", "what is the next level?", "which game?", or similar — ALWAYS use the child session context above to give the exact game name and level.
- If next game is set, say: "Your next game is [name], Level [X]! 🌟" then encourage them.
- Keep answers warm, complete, helpful, and conversational (2-4 sentences max).
- Always answer user questions directly with 100% accuracy based on app facts.
- Use friendly emojis appropriately (🐝, ✨, 🌟, 💙, 🎮).`;
}

/**
 * Intelligent offline/fallback response generator.
 * Used when Gemini API is unavailable, rate-limited, offline, or returns empty response.
 * Uses keyword matching against common user questions to return 100% accurate responses.
 * 
 * @param userMessage - Raw message typed by user
 * @param history - Conversation history array (optional)
 * @returns Pre-formatted friendly answer string from Lumo
 */
function getSmartFallbackResponse(userMessage: string, history?: any[]): string {
  const q = userMessage.toLowerCase().trim();

  // 1. Social & Courtesy Responses (Thanks, Bye, Greetings)
  if (q.includes("thank") || q === "thanks" || q === "thx" || q === "ty" || q.includes("appreciate")) {
    return "You're so very welcome! 🐝✨ I'm always here to support you and your child on your developmental journey. Feel free to ask anytime if you need help with games, surveys, or progress reports! 💛";
  }
  if (q === "ok" || q === "okay" || q.includes("got it") || q.includes("alright") || q.includes("great") || q.includes("nice") || q.includes("awesome") || q.includes("perfect") || q.includes("cool")) {
    return "Awesome! 😊 Let me know whenever you have more questions about our 13-question screening survey, 8 adaptive games, child profiles, or progress reports!";
  }
  if (q.includes("bye") || q.includes("goodbye") || q.includes("see ya")) {
    return "Goodbye for now! 🐝 Have a wonderful, joyful day with your child! I'll be right here whenever you need me. ✨";
  }

  // 2. Identity & Greetings (Who are you, Hi, Hello)
  if (q.includes("name") || q.includes("who are you") || q.includes("who r u") || q.includes("what is your name") || q.includes("who created you")) {
    return "I'm Lumo! 🐝✨ Your friendly Lumo Buddy AI Assistant. I'm here to help parents with developmental assessments, adaptive child games, progress reports, and app guidance!";
  }
  if (q.includes("how are you") || q.includes("how r u")) {
    return "I'm doing fantastic and buzzing with joy! 🐝 How can I help you and your child today?";
  }
  if (q.startsWith("hi") || q.startsWith("hello") || q.startsWith("hey") || q === "hi" || q === "hello" || q === "hey") {
    return "Hello! 🐝 Welcome to Lumo Buddy! I'm Lumo, your AI Assistant. Ask me anything about our screening surveys, adaptive games, support levels, or progress reports!";
  }

  // 3. App Overview & How it works
  if (q.includes("what is lumo buddy") || q.includes("about this app") || q.includes("tell me about this app") || q.includes("what is this app") || q.includes("about app")) {
    return "Lumo Buddy is a calm, supportive developmental screening and adaptive learning platform for neurodivergent children. Parents complete a 13-question survey, an ML algorithm predicts a support level (Level 1, 2, or 3), and unlocks suitable learning games! 🐝✨";
  }
  if (q.includes("how does it work") || q.includes("how to start") || q.includes("getting started") || q.includes("how to use") || q.includes("steps")) {
    return "It's super simple:\n1. Create a parent account & child profile (Boy 👦 or Girl 👧 avatar).\n2. Complete the 13-question parent screening survey.\n3. Our ML model predicts a support level (Level 1, 2, or 3).\n4. Suitable learning games are unlocked for your child to play & track progress! 🚀";
  }

  // 4. Survey & Assessment Questions
  if (q.includes("survey") || q.includes("assessment") || q.includes("screening") || q.includes("questionnaire") || q.includes("predict")) {
    return "The screening survey is a comprehensive 13-question questionnaire completed by parents covering developmental traits, communication, social interaction, and sensory behaviors. Based on your answers, our ML model predicts your child's support level (Level 1, 2, or 3) to unlock suitable learning games! 🐝✨";
  }
  if (q.includes("retake") || q.includes("redo") || q.includes("take again") || q.includes("monthly")) {
    return "Yes! Parents can retake the 13-question screening survey anytime or do a monthly re-assessment to update their child's support level and track milestone progress over time! 📈✨";
  }

  // 5. 4 Developmental Areas
  if (q.includes("4 areas") || q.includes("developmental areas") || q.includes("domains") || q.includes("categories")) {
    return "Lumo Buddy covers 4 core developmental growth areas:\n1. Emotion 😊 (recognizing & expressing feelings)\n2. Cognitive 🧠 (memory & pattern recognition)\n3. Self-Awareness ⏰ (daily routines & needs)\n4. Math 🔢 (counting & shape matching)";
  }

  // 6. Support Levels & Game Unlock Rules
  if (q.includes("level") || q.includes("unlock") || q.includes("locked") || q.includes("support level")) {
    return "Game unlock levels work like this:\n• Level 1 support: Unlocks Level 1 games\n• Level 2 support: Unlocks Level 1 & Level 2 games\n• Level 3 support: Unlocks all 8 games across Level 1, 2, and 3! 🎮✨";
  }

  // 7. Adaptive Games List
  if (q.includes("game") || q.includes("activity") || q.includes("play") || q.includes("list games") || q.includes("how many games")) {
    return "We feature 8 adaptive games across 4 growth areas:\n1. Emotion: Emotion Face Match 😊 & Situation Emotion Choice 💭\n2. Cognitive: Memory Card Match 🃏 & Pattern Completion 🧩\n3. Self-Awareness: Daily Routine Order ⏰ & Feeling Need Choice 💖\n4. Math: Count Objects 🔢 & Shape & Number Match 🎯";
  }

  // 8. Gentle Child Feedback (Mistake handling)
  if (q.includes("wrong") || q.includes("mistake") || q.includes("fail") || q.includes("error") || q.includes("punish")) {
    return "Lumo Buddy NEVER shames or punishes children for wrong answers! We provide gentle, supportive feedback like 'Good try!' and 'Let's try again!' to nurture confidence and joy in learning. 💖✨";
  }

  // 9. Scoring Calculation Formula
  if (q.includes("scoring") || q.includes("formula") || q.includes("calculate score") || q.includes("points")) {
    return "Game scores are calculated using accuracy, correct answers, and attempts. Accuracy is prioritized over speed, and scores will never go below 0! 🎯";
  }

  // 10. Medical Disclaimer
  if (q.includes("medical") || q.includes("diagnosis") || q.includes("autism") || q.includes("doctor") || q.includes("clinical")) {
    return "Lumo Buddy is a supportive learning and screening platform, NOT a medical diagnosis tool. We use calm terms like 'suggested game level' and 'developmental support level' to guide children gently. 💙";
  }

  // 11. Progress Tracking & Supabase Saving
  if (q.includes("progress") || q.includes("report") || q.includes("score") || q.includes("save") || q.includes("supabase") || q.includes("chart")) {
    return "Game scores, accuracy, completion times, and attempts are automatically saved to Supabase so parents can view detailed progress reports and visual improvement charts in the parent portal! 📊✨";
  }

  // 12. Child Profiles & Gender Avatars
  if (q.includes("boy") || q.includes("girl") || q.includes("gender") || q.includes("avatar") || q.includes("profile") || q.includes("add child")) {
    return "When you create a child profile, selecting Male or Female renders a cute Boy 👦 icon (sky blue gradient) or Girl 👧 icon (rose pink gradient) inside their avatar letter box! You can create multiple child profiles. 💖";
  }

  // 13. Devices & Responsive Compatibility
  if (q.includes("device") || q.includes("mobile") || q.includes("tablet") || q.includes("phone") || q.includes("ipad") || q.includes("desktop")) {
    return "Lumo Buddy is fully responsive and optimized for mobile phones, tablets, iPads, laptops, and desktop browsers with large, child-safe touch targets! 📱💻";
  }

  // 14. Data Privacy & Security
  if (q.includes("privacy") || q.includes("safe") || q.includes("data") || q.includes("secure")) {
    return "Yes! Your family's privacy is paramount. All profiles, survey answers, and game scores are securely stored in Supabase with strict parent-level data protection. 🔒✨";
  }

  // 15. Target Age Range
  if (q.includes("age") || q.includes("how old") || q.includes("years old") || q.includes("target")) {
    return "Lumo Buddy is designed for neurodivergent children aged 3 to 12 years old, with games tailored specifically to their developmental support level! 🌟";
  }

  // 16. Cost & Free Platform
  if (q.includes("free") || q.includes("cost") || q.includes("price") || q.includes("pay")) {
    return "Lumo Buddy is 100% free for parents and children to access screening surveys, child profiles, and adaptive learning games! 🎁";
  }

  // Default fallback welcome response
  return `I'm Lumo, your friendly Lumo Buddy AI Assistant! 🐝 I can help you with our 13-question parent survey, 8 adaptive games, support level unlocks (Level 1, 2, 3), retaking surveys, child profiles, and progress reports. How can I help you right now? 😊`;
}

/**
 * Next.js App Router API Route Handler for POST `/api/chat`.
 * 
 * Receives:
 * - `prompt`: User input message string
 * - `history`: Past chat turn history array `[{ role: "user" | "model", text: "..." }]`
 * - `context`: Optional live child context details
 * 
 * Flow:
 * 1. Validates user prompt input.
 * 2. Generates system prompt with live child session context.
 * 3. Builds multi-turn message payload for Gemini API.
 * 4. Attempts calling Gemini REST API with candidate models sequentially.
 * 5. Returns AI reply or falls back to offline fallback response if API fails.
 */
export async function POST(req: Request) {
  try {
    // 1. Parse JSON body from request
    const { prompt, history, context } = await req.json();

    // Validate prompt string
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ reply: "Please ask a valid question!" });
    }

    // 2. Build system prompt with live child session context
    const systemPrompt = buildSystemPrompt(context);

    // 3. Build multi-turn conversation memory contents array (like ChatGPT / Gemini API format)
    const contents: any[] = [
      {
        role: "user",
        parts: [{ text: systemPrompt }],
      },
      {
        role: "model",
        parts: [{ text: "Understood! I am Lumo (Lumo Bee 🐝), your friendly Lumo Buddy AI Assistant. I have full memory of our conversation and 100% accurate knowledge about Lumo Buddy and this child's game progress!" }],
      },
    ];

    // 4. Append past turn messages from chat history if available
    if (Array.isArray(history)) {
      for (const h of history) {
        if (h && typeof h.text === "string" && h.text.trim()) {
          // Ignore sound effect placeholders if present
          if (h.text.includes("Bzzzz-beep!")) continue;
          contents.push({
            role: h.role === "user" ? "user" : "model",
            parts: [{ text: h.text.trim() }],
          });
        }
      }
    }

    // 5. Append latest user prompt
    contents.push({
      role: "user",
      parts: [{ text: prompt.trim() }],
    });

    // 6. Build Gemini API request payload
    const payload = {
      contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 350,
      },
    };

    // Candidate Gemini model names to attempt sequentially
    const models = ["gemini-flash-latest", "gemini-2.0-flash", "gemini-1.5-flash-latest"];

    // 7. Try fetching response from Gemini models
    for (const model of models) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidateText && candidateText.trim()) {
            return NextResponse.json({ reply: candidateText.trim() });
          }
        }
      } catch (e) {
        // Log & continue to next fallback model
      }
    }

    // 8. If all Gemini models fail or key is invalid, return smart offline fallback
    const fallbackText = getSmartFallbackResponse(prompt, history);
    return NextResponse.json({ reply: fallbackText });
  } catch (error) {
    // Global catch block for API route errors
    console.error("Chat API Route Error:", error);
    return NextResponse.json({
      reply: getSmartFallbackResponse("general"),
    });
  }
}

