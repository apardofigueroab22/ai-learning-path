import type { QuizAnswers, QuizQuestion, Track, ExperienceLevel, Depth } from "@/types";

export const QUESTIONS: QuizQuestion[] = [
  {
    id: "experience",
    number: 1,
    eyebrow: "About you",
    question: "How comfortable are you with ChatGPT or similar AI tools?",
    helper: "Pick the closest fit — there is no wrong answer.",
    options: [
      {
        value: 0,
        label: "I have never used it (or only heard of it)",
      },
      {
        value: 1,
        label: "I use it sometimes for basic stuff",
        description: "Questions, summarizing, drafting texts",
      },
      {
        value: 2,
        label: "I use it regularly and can write decent prompts",
        description: "Role prompting, system messages, iterating",
      },
    ],
  },
  {
    id: "agentFamiliarity",
    number: 2,
    eyebrow: "About agents",
    question: "What is your experience with AI agents?",
    helper:
      "An AI agent can plan and act on its own — it is more than a chatbot.",
    options: [
      {
        value: 0,
        label: "Never heard of them",
      },
      {
        value: 1,
        label: "Heard of them, never used one",
      },
      {
        value: 2,
        label: "Tried one or two (AutoGPT, a Zap, etc.)",
      },
      {
        value: 3,
        label: "I am building or experimenting with my own",
      },
    ],
  },
  {
    id: "goal",
    number: 3,
    eyebrow: "Your goal",
    question: "What would you most like to get from learning about agents?",
    options: [
      {
        value: 0,
        label: "Automate repetitive tasks in my daily life",
        description: "Email, calendar, lists, research, personal workflows",
      },
      {
        value: 1,
        label: "Be more effective at work",
        description: "Marketing, ops, sales, support, research — any industry",
      },
      {
        value: 2,
        label: "Understand the technology and possibly build my own",
        description: "APIs, code, products, no-code AI builders",
      },
      {
        value: 3,
        label: "Stay informed about where the world is going",
        description: "Trends, implications, big-picture thinking",
      },
      {
        value: 4,
        label: "Just curious — no specific goal yet",
      },
    ],
  },
  {
    id: "context",
    number: 4,
    eyebrow: "Your context",
    question: "What context do you want this for?",
    options: [
      {
        value: 0,
        label: "Personal productivity",
      },
      {
        value: 1,
        label: "Work or business (any industry)",
      },
      {
        value: 2,
        label: "Software, data, or creative work",
      },
      {
        value: 3,
        label: "I am exploring — not sure yet",
      },
    ],
  },
  {
    id: "time",
    number: 5,
    eyebrow: "Time",
    question: "How much time can you dedicate to learning in a week?",
    helper: "Roughly — most videos are 10–60 minutes.",
    options: [
      {
        value: 0,
        label: "About 30 minutes",
      },
      {
        value: 1,
        label: "1–2 hours",
      },
      {
        value: 2,
        label: "3 hours or more",
      },
    ],
  },
];

/**
 * Derive the user's experience level from Q1 + Q2.
 * Q1 caps at 2 (no AI experience), Q2 caps at 3 (already building).
 * Sum: 0 → newcomer, 1–2 → newcomer, 3 → intermediate, 4+ → builder.
 */
export function deriveLevel(answers: QuizAnswers): ExperienceLevel {
  const score = answers.experience + answers.agentFamiliarity;
  if (score <= 2) return "newcomer";
  if (score <= 4) return "intermediate";
  return "builder";
}

/**
 * Derive the user's track from Q3 (primary) and Q4 (context).
 * Q3 represents the goal; Q4 nudges the framing.
 */
export function deriveTrack(answers: QuizAnswers): Track {
  // Q3 is dominant. Q4 only reframes in some cases.
  switch (answers.goal) {
    case 0:
      return "personal";
    case 1:
      return "work";
    case 2:
      return "builder";
    case 3:
      return "informed";
    case 4:
    default:
      // 'curious' — if context is builder, lean builder; otherwise informed
      return answers.context === 2 ? "builder" : "curious";
  }
}

/**
 * Derive depth from Q5.
 */
export function deriveDepth(answers: QuizAnswers): Depth {
  switch (answers.time) {
    case 0:
      return "shallow";
    case 1:
      return "medium";
    case 2:
    default:
      return "deep";
  }
}

export const LEVEL_LABEL: Record<ExperienceLevel, string> = {
  newcomer: "New to AI",
  intermediate: "Getting hands-on",
  builder: "Ready to build",
};

export const TRACK_LABEL: Record<Track, string> = {
  personal: "Personal Productivity",
  work: "Work & Business",
  builder: "Builder",
  informed: "Stay Informed",
  curious: "Explorer",
};

export const TRACK_DESCRIPTION: Record<Track, string> = {
  personal:
    "Save time on the stuff that drains you. Daily-life automations and personal AI workflows.",
  work:
    "Be more effective at your job, regardless of industry. Real workflows, real hours saved.",
  builder:
    "Understand the technology deeply and start shipping your own AI-powered things.",
  informed:
    "Stay current on the most important shift in technology in our lifetime. No code required.",
  curious:
    "Just looking around. We will give you the best 60-minute on-ramp we can.",
};
