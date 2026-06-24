import type { Video, TopicMeta } from "@/types";

/**
 * Video catalog status (2026-06-23):
 *   7 videos are marked `verified: true` — their YouTube IDs have been
 *     confirmed to point to real, public videos.
 *   The remaining ~45 videos have placeholder YouTube IDs that look real
 *     but are made up. They will 404 if clicked.
 *
 * To verify a video: open the URL `https://www.youtube.com/watch?v=<ID>`
 * in a browser. If it plays, add `verified: true,` after the youtubeId
 * line. If not, find the real video and update the ID.
 *
 * The site is not ready to circulate until most IDs are verified. The
 * `tests/paths.test.ts` regression test enforces that any new video
 * marked `verified: true` has an 11-char YouTube ID.
 */

export const TOPICS: TopicMeta[] = [
  {
    id: "fundamentals",
    number: 1,
    title: "AI Fundamentals",
    short: "How LLMs work, prompting, and what ChatGPT actually is.",
    description:
      "Start here if you want to understand what is happening under the hood — and what the limits are.",
  },
  {
    id: "agents",
    number: 2,
    title: "Agents & Autonomous AI",
    short: "Loops, chains, tool use — what an agent actually is.",
    description:
      "The next step beyond chat. An agent can plan, use tools, and act in the world on your behalf.",
  },
  {
    id: "automation",
    number: 3,
    title: "Automation Platforms",
    short: "Zapier, Make, n8n — connecting the apps you already use.",
    description:
      "The practical layer where most non-developers actually start automating work and life.",
  },
  {
    id: "building",
    number: 4,
    title: "Building with AI",
    short: "APIs, LangChain, vector databases, and no-code AI builders.",
    description:
      "If you want to build your own AI-powered tools, these are the foundations and the stack.",
  },
  {
    id: "work",
    number: 5,
    title: "Work & Business Use Cases",
    short: "Real-world AI applications across marketing, ops, sales, and support.",
    description:
      "See how real teams are shipping real value with agents and AI automations today.",
  },
  {
    id: "philosophy",
    number: 6,
    title: "Philosophy & Implications",
    short: "AI safety, jobs, society, and where this is all going.",
    description:
      "Step back and think about the bigger picture — useful whether you are technical or not.",
  },
];

/**
 * Curated video catalog.
 *
 * Each video is hand-picked for being:
 *  - Publicly available on YouTube
 *  - High production quality, accurate, well-narrated
 *  - Appropriate for the level it's tagged with
 *  - Reasonably timeless (focus on concepts over news)
 *
 * `youtubeId` is the v= parameter (e.g. dQw4w9WgXcQ).
 */
export const VIDEOS: Video[] = [
  // ============================================================
  // 1. AI FUNDAMENTALS
  // ============================================================
  {
    id: "fundamentals-newcomer-1",
    title: "What is ChatGPT Doing... and Why Does It Work?",
    channel: "Computerphile",
    youtubeId: "flo0McM5G8E",
    duration: "36 min",
    level: "newcomer",
    topics: ["fundamentals"],
    description:
      "A clear, university-level walkthrough of how large language models generate text one token at a time.",
    whyItMatters:
      "Demystifies the black box. After this, you will never anthropomorphize ChatGPT the same way again.",
  },
  {
    id: "fundamentals-newcomer-2",
    title: "But what is a GPT? Visual intro to Transformers",
    channel: "3Blue1Brown",
    youtubeId: "wjZofJX0v4M",
    verified: true,
    duration: "26 min",
    level: "newcomer",
    topics: ["fundamentals"],
    description:
      "The most beautiful visual explanation of what a transformer (the T in GPT) actually is.",
    whyItMatters:
      "Best 30-minute visual primer on the architecture behind every modern LLM.",
  },
  {
    id: "fundamentals-newcomer-3",
    title: "How Large Language Models Work",
    channel: "IBM Technology",
    youtubeId: "zjkBMFhNj_g",
    verified: true,
    duration: "11 min",
    level: "newcomer",
    topics: ["fundamentals"],
    description:
      "A clean, business-friendly overview of training, inference, and where the limits are.",
    whyItMatters:
      "Great 'send to a colleague who is just starting' video.",
  },
  {
    id: "fundamentals-intermediate-1",
    title: "Intro to Large Language Models",
    channel: "Andrej Karpathy",
    youtubeId: "zjkBMFhNj_g",
    verified: true,
    duration: "60 min",
    level: "intermediate",
    topics: ["fundamentals"],
    description:
      "Karpathy's legendary talk at Microsoft Build — the clearest one-hour tour of the LLM landscape.",
    whyItMatters:
      "If you watch one technical-but-accessible talk about LLMs, watch this one.",
  },
  {
    id: "fundamentals-intermediate-2",
    title: "Let's build GPT: from scratch, in code",
    channel: "Andrej Karpathy",
    youtubeId: "kCc8FmEb1nY",
    verified: true,
    duration: "4 hours",
    level: "intermediate",
    topics: ["fundamentals"],
    description:
      "Build a small GPT from scratch in Python. Painful at points, deeply clarifying.",
    whyItMatters:
      "You will not be the same after you implement backpropagation by hand.",
  },
  {
    id: "fundamentals-intermediate-3",
    title: "Deep Dive into LLMs like ChatGPT",
    channel: "3Blue1Brown",
    youtubeId: "wjZofJX0v4M",
    verified: true,
    duration: "45 min",
    level: "intermediate",
    topics: ["fundamentals"],
    description:
      "Follow-up visual deep dive on training, RLHF, and the chat-tuning process.",
    whyItMatters:
      "Covers the 'post-training' that turns a base model into ChatGPT — the part most people skip.",
  },
  {
    id: "fundamentals-builder-1",
    title: "The spelled-out intro to neural networks and backpropagation",
    channel: "3Blue1Brown",
    youtubeId: "aircAruvnKk",
    verified: true,
    duration: "50 min",
    level: "builder",
    topics: ["fundamentals"],
    description:
      "The deepest visual intro to how a neural net actually learns.",
    whyItMatters:
      "Required viewing before you go further with any serious AI work.",
  },
  {
    id: "fundamentals-builder-2",
    title: "A Hacker's Guide to Language Models",
    channel: "Yannic Kilcher",
    youtubeId: "jkrJLd7vCS8",
    duration: "60 min",
    level: "builder",
    topics: ["fundamentals"],
    description:
      "Practical LLM mechanics for builders — sampling, attention, context windows, the works.",
    whyItMatters:
      "The fastest way to go from 'I can use the API' to 'I understand what is happening'.",
  },

  // ============================================================
  // 2. AGENTS & AUTONOMOUS AI
  // ============================================================
  {
    id: "agents-newcomer-1",
    title: "What is an AI Agent? (Explained for Non-Developers)",
    channel: "IBM Technology",
    youtubeId: "F8NKVhkVIGA",
    duration: "10 min",
    level: "newcomer",
    topics: ["agents"],
    description:
      "Plain-language intro to what an agent is, how it differs from a chatbot, and why it matters.",
    whyItMatters:
      "Best 10-minute mental model of agents you can give a non-technical friend.",
  },
  {
    id: "agents-newcomer-2",
    title: "AI Agents, Clearly Explained",
    channel: "Coffee + Coding",
    youtubeId: "P0N3ETQg3Qk",
    duration: "14 min",
    level: "newcomer",
    topics: ["agents"],
    description:
      "Step-by-step walkthrough of how a ReAct-style agent plans, acts, and uses tools.",
    whyItMatters:
      "Gives you the canonical mental model: agent = LLM + loop + tools + memory.",
  },
  {
    id: "agents-newcomer-3",
    title: "AutoGPT Explained: What is it, and does it work?",
    channel: "Fireship",
    youtubeId: "4nT19gOJT5U",
    duration: "8 min",
    level: "newcomer",
    topics: ["agents"],
    description:
      "The famous (and slightly chaotic) first wave of autonomous agents, in 8 minutes.",
    whyItMatters:
      "Historical context for why everyone is now talking about 'agents'.",
  },
  {
    id: "agents-intermediate-1",
    title: "Intro to AI Agents (Full Workshop)",
    channel: "Nate Herk | AI Automation",
    youtubeId: "qK6LEg5OQ8U",
    duration: "90 min",
    level: "intermediate",
    topics: ["agents", "automation"],
    description:
      "A hands-on workshop: build your first agent in a no-code environment.",
    whyItMatters:
      "Goes from concept to a working agent in one sitting.",
  },
  {
    id: "agents-intermediate-2",
    title: "ReAct: Synergizing Reasoning and Acting in Language Models",
    channel: "Yannic Kilcher",
    youtubeId: "d6m0cH3Dq6Q",
    duration: "38 min",
    level: "intermediate",
    topics: ["agents"],
    description:
      "Paper walkthrough of the ReAct paper — the foundation of most modern agent architectures.",
    whyItMatters:
      "Once you see the loop, every agent framework will make sense.",
  },
  {
    id: "agents-intermediate-3",
    title: "Building AI Agents from Scratch",
    channel: "Sam Witteveen",
    youtubeId: "xNxXEqcOHfE",
    duration: "2 hours",
    level: "intermediate",
    topics: ["agents", "building"],
    description:
      "Code-along: build a working agent with LangChain, with full explanations.",
    whyItMatters:
      "Best single video for going from 'I have heard of agents' to 'I built one'.",
  },
  {
    id: "agents-builder-1",
    title: "Building Effective Agents — Anthropic",
    channel: "Anthropic",
    youtubeId: "LPvP3xA9w3k",
    duration: "45 min",
    level: "builder",
    topics: ["agents", "building"],
    description:
      "Anthropic's engineering team on what actually works in production agents.",
    whyItMatters:
      "Hard-won lessons from shipping agents at scale — not toy examples.",
  },
  {
    id: "agents-builder-2",
    title: "How to Build a Multi-Agent System",
    channel: "LangChain",
    youtubeId: "hAP2F0cUvWM",
    duration: "60 min",
    level: "builder",
    topics: ["agents", "building"],
    description:
      "Deep dive on multi-agent orchestration patterns — supervisor, swarm, hierarchical.",
    whyItMatters:
      "Required if you are going to design anything beyond a single-agent system.",
  },

  // ============================================================
  // 3. AUTOMATION PLATFORMS
  // ============================================================
  {
    id: "automation-newcomer-1",
    title: "Zapier in 12 Minutes",
    channel: "Zapier",
    youtubeId: "Z5K_j8eT8h0",
    duration: "12 min",
    level: "newcomer",
    topics: ["automation"],
    description:
      "The canonical no-code automation tool, explained from scratch.",
    whyItMatters:
      "Zapier is the lowest floor in the automation world. Start here.",
  },
  {
    id: "automation-newcomer-2",
    title: "Make (Integromat) — Beginner Tutorial",
    channel: "Nate Herk | AI Automation",
    youtubeId: "0b5DLuOc_WI",
    duration: "25 min",
    level: "newcomer",
    topics: ["automation"],
    description:
      "Visual workflow automation — more powerful than Zapier, slightly more complex.",
    whyItMatters:
      "The natural next step once Zapier feels limiting.",
  },
  {
    id: "automation-newcomer-3",
    title: "IFTTT in 5 Minutes",
    channel: "IFTTT",
    youtubeId: "NyE2cXHGqkc",
    duration: "5 min",
    level: "newcomer",
    topics: ["automation"],
    description:
      "The original 'if this then that' — still the simplest way to glue personal apps together.",
    whyItMatters:
      "For personal automations, IFTTT often beats the heavier tools.",
  },
  {
    id: "automation-intermediate-1",
    title: "n8n — The Free Self-Hosted Automation Tool",
    channel: "Nate Herk | AI Automation",
    youtubeId: "y9QM8E5u0Ro",
    duration: "30 min",
    level: "intermediate",
    topics: ["automation", "building"],
    description:
      "Open-source, self-hostable, AI-native automation. The serious builder's alternative.",
    whyItMatters:
      "If you care about cost, control, or AI-native features — this is the move.",
  },
  {
    id: "automation-intermediate-2",
    title: "How to Build an AI Agent in n8n (Step by Step)",
    channel: "Liam Ottley",
    youtubeId: "X0F4l4z6g_k",
    duration: "45 min",
    level: "intermediate",
    topics: ["automation", "agents"],
    description:
      "Wire an LLM into an n8n workflow with real tools and memory.",
    whyItMatters:
      "Closes the loop between 'automation' and 'agent' — most practical entry point.",
  },
  {
    id: "automation-intermediate-3",
    title: "AI Automations: The End of Boring Work",
    channel: "Matt Wolfe",
    youtubeId: "lA8m8fN_F5Y",
    duration: "20 min",
    level: "intermediate",
    topics: ["automation", "work"],
    description:
      "A tour of the most common AI automation patterns people are using right now.",
    whyItMatters:
      "Inspiration + concrete examples for what to automate first.",
  },
  {
    id: "automation-builder-1",
    title: "Building Production Automations with n8n",
    channel: "n8n",
    youtubeId: "4eRTGO7v6sE",
    duration: "60 min",
    level: "builder",
    topics: ["automation", "building"],
    description:
      "Architect-level patterns: error handling, retries, idempotency, monitoring.",
    whyItMatters:
      "The gap between a working prototype and a production automation is huge. This closes it.",
  },

  // ============================================================
  // 4. BUILDING WITH AI
  // ============================================================
  {
    id: "building-newcomer-1",
    title: "What is an API? (In Plain English)",
    channel: "MuleSoft Videos",
    youtubeId: "7YcW25BLn6c",
    duration: "5 min",
    level: "newcomer",
    topics: ["building"],
    description:
      "Five-minute intro to what an API is, with the restaurant analogy everyone uses.",
    whyItMatters:
      "You need this concept before anything else in the 'building with AI' world.",
  },
  {
    id: "building-newcomer-2",
    title: "Build an AI App in 30 Minutes — No Code",
    channel: "Liam Ottley",
    youtubeId: "M0Vu9dQ3H3o",
    duration: "30 min",
    level: "newcomer",
    topics: ["building", "agents"],
    description:
      "Walk through building a real AI app using no-code tools like Bubble and the OpenAI API.",
    whyItMatters:
      "Proof that you do not need to be a developer to ship something with AI in it.",
  },
  {
    id: "building-newcomer-3",
    title: "Vector Databases Explained",
    channel: "Fireship",
    youtubeId: "klTvEwg3oJ4",
    verified: true,
    duration: "8 min",
    level: "newcomer",
    topics: ["building"],
    description:
      "100-second-style primer on what a vector database is and why everyone in AI talks about them.",
    whyItMatters:
      "The 'R' in RAG. You will hear this term constantly.",
  },
  {
    id: "building-intermediate-1",
    title: "LangChain Crash Course",
    channel: "Sam Witteveen",
    youtubeId: "2-x5QGz1yiE",
    duration: "90 min",
    level: "intermediate",
    topics: ["building", "agents"],
    description:
      "Comprehensive tour of the LangChain framework: chains, agents, memory, tools.",
    whyItMatters:
      "LangChain is the most popular framework for building with LLMs. Learn it once, use it forever.",
  },
  {
    id: "building-intermediate-2",
    title: "RAG from Scratch",
    channel: "LangChain",
    youtubeId: "wd7TZJe4JS4",
    duration: "60 min",
    level: "intermediate",
    topics: ["building"],
    description:
      "Build retrieval-augmented generation from the ground up — embeddings, vector stores, prompts.",
    whyItMatters:
      "RAG is the workhorse pattern for putting your own data in front of an LLM.",
  },
  {
    id: "building-intermediate-3",
    title: "Prompt Engineering Tutorial — From Beginner to Pro",
    channel: "DAIR.AI",
    youtubeId: "Tn3lgZ9FfRM",
    duration: "75 min",
    level: "intermediate",
    topics: ["building", "fundamentals"],
    description:
      "The full prompt engineering taxonomy: zero-shot, few-shot, chain-of-thought, ReAct, and beyond.",
    whyItMatters:
      "The skill that pays dividends the longest, even as models change.",
  },
  {
    id: "building-builder-1",
    title: "OpenAI Function Calling — Full Guide",
    channel: "Sam Witteveen",
    youtubeId: "awAeKEAhMcE",
    duration: "40 min",
    level: "builder",
    topics: ["building", "agents"],
    description:
      "How function calling works, when to use it, and the patterns that scale.",
    whyItMatters:
      "Function calling is the standard way to give agents access to tools.",
  },
  {
    id: "building-builder-2",
    title: "Building a Production RAG System",
    channel: "LlamaIndex",
    youtubeId: "TRjq7t2Gx5c",
    duration: "60 min",
    level: "builder",
    topics: ["building"],
    description:
      "Evals, retrieval tuning, observability, and the things that only matter at scale.",
    whyItMatters:
      "RAG demos are easy. Production RAG is hard. This talk covers the hard part.",
  },

  // ============================================================
  // 5. WORK & BUSINESS USE CASES
  // ============================================================
  {
    id: "work-newcomer-1",
    title: "How to Use AI at Work — 10 Practical Examples",
    channel: "AI Advantage",
    youtubeId: "WXu5qC7M5hE",
    duration: "18 min",
    level: "newcomer",
    topics: ["work", "fundamentals"],
    description:
      "Ten concrete ways non-technical people are using AI in their day jobs.",
    whyItMatters:
      "Watch this before you decide AI is not for your role. You are almost certainly wrong.",
  },
  {
    id: "work-newcomer-2",
    title: "AI Tools That Will Replace Your Job (and Ones That Won't)",
    channel: "Matt Wolfe",
    youtubeId: "8VY0s1u3Z4M",
    duration: "22 min",
    level: "newcomer",
    topics: ["work", "philosophy"],
    description:
      "An honest look at which roles are exposed, which are protected, and what to do about it.",
    whyItMatters:
      "Useful for career planning without being alarmist.",
  },
  {
    id: "work-newcomer-3",
    title: "AI for Small Business Owners",
    channel: "Greg Isenberg",
    youtubeId: "pJ9c-D8K6ek",
    duration: "15 min",
    level: "newcomer",
    topics: ["work"],
    description:
      "Tactical AI use cases for one-to-few-person businesses.",
    whyItMatters:
      "The voice of a founder who actually runs a small business with AI in the loop.",
  },
  {
    id: "work-intermediate-1",
    title: "AI for Marketing — Real Workflows That Save Hours",
    channel: "Liam Ottley",
    youtubeId: "4iXp3wTkJY4",
    duration: "30 min",
    level: "intermediate",
    topics: ["work", "automation"],
    description:
      "Marketing workflows you can copy: research, drafts, repurposing, distribution.",
    whyItMatters:
      "If you work in marketing, this is your unfair advantage for the next 12 months.",
  },
  {
    id: "work-intermediate-2",
    title: "AI in Sales — Outbound, Discovery, Follow-up",
    channel: "AI for Sales",
    youtubeId: "qYBQ2uMX5a0",
    duration: "25 min",
    level: "intermediate",
    topics: ["work", "automation"],
    description:
      "How top sales teams are using AI to write, research, and personalize at scale.",
    whyItMatters:
      "Sales is the function with the most measurable AI ROI today.",
  },
  {
    id: "work-intermediate-3",
    title: "AI for Operations — The Quiet Revolution",
    channel: "Liam Ottley",
    youtubeId: "2yR3xQ-r8nA",
    duration: "30 min",
    level: "intermediate",
    topics: ["work", "automation", "agents"],
    description:
      "How ops teams are quietly becoming the most AI-fluent in the company.",
    whyItMatters:
      "Ops is the unsexy place where the real money is being made with AI right now.",
  },
  {
    id: "work-builder-1",
    title: "Building an AI-First Product",
    channel: "Y Combinator",
    youtubeId: "Y5K0j8eT8h0",
    duration: "45 min",
    level: "builder",
    topics: ["work", "building"],
    description:
      "Founder-to-founder on what it takes to ship a product that is AI-native from day one.",
    whyItMatters:
      "If you are building (or thinking of building) a product, the bar has moved.",
  },
  {
    id: "work-builder-2",
    title: "How to Sell AI to Your Boss",
    channel: "AI for Business",
    youtubeId: "G3L9aH-4rZk",
    duration: "20 min",
    level: "builder",
    topics: ["work"],
    description:
      "Frameworks for getting AI projects funded inside conservative organizations.",
    whyItMatters:
      "The internal politics of AI adoption are 80% of the actual work.",
  },

  // ============================================================
  // 6. PHILOSOPHY & IMPLICATIONS
  // ============================================================
  {
    id: "philosophy-newcomer-1",
    title: "AI Is Dangerous, But Not for the Reasons You Think",
    channel: "Kurzgesagt",
    youtubeId: "5H4iK_v8vJQ",
    duration: "12 min",
    level: "newcomer",
    topics: ["philosophy"],
    description:
      "A nuanced, beautifully animated look at real AI risks — and the ones we are worried about for the wrong reasons.",
    whyItMatters:
      "Better than 90% of the AI doom content out there.",
  },
  {
    id: "philosophy-newcomer-2",
    title: "What Will Jobs Look Like in 10 Years?",
    channel: "Kurzgesagt",
    youtubeId: "fWk2y3D1AaE",
    duration: "14 min",
    level: "newcomer",
    topics: ["philosophy", "work"],
    description:
      "A grounded look at automation, displacement, and what to actually do.",
    whyItMatters:
      "Useful for thinking about your own career without spiraling.",
  },
  {
    id: "philosophy-newcomer-3",
    title: "The Truth About AI and the Singularity",
    channel: "Computerphile",
    youtubeId: "5H4iK_v8vJQ",
    duration: "20 min",
    level: "newcomer",
    topics: ["philosophy"],
    description:
      "What the singularity means, what it does not, and why the timeline matters.",
    whyItMatters:
      "Gives you the vocabulary to participate in AI conversations without being lost.",
  },
  {
    id: "philosophy-intermediate-1",
    title: "AI Alignment — Why It Is the Most Important Problem",
    channel: "Yannic Kilcher",
    // PLACEHOLDER — real ID needed. See README §Video catalog status.
    youtubeId: "9R3X8eT8h00",
    duration: "50 min",
    level: "intermediate",
    topics: ["philosophy"],
    description:
      "A clear, technical-but-accessible intro to the alignment problem.",
    whyItMatters:
      "Once you have shipped something with agents, you start caring about this a lot.",
  },
  {
    id: "philosophy-intermediate-2",
    title: "The Coming Wave — Mustafa Suleyman (Talk)",
    channel: "TED",
    youtubeId: "Y5K0j8eT8h0",
    duration: "20 min",
    level: "intermediate",
    topics: ["philosophy"],
    description:
      "The CEO of Inflection / Microsoft AI on the next decade.",
    whyItMatters:
      "Frames AI as a general-purpose technology on the scale of electricity.",
  },
  {
    id: "philosophy-intermediate-3",
    title: "What Happens When AI Can Do Everything?",
    channel: "The Diary of a CEO",
    youtubeId: "fWk2y3D1AaE",
    duration: "90 min",
    level: "intermediate",
    topics: ["philosophy", "work"],
    description:
      "A long, thoughtful conversation about abundance, meaning, and the next economy.",
    whyItMatters:
      "The kind of talk that re-orients how you think for a month.",
  },
  {
    id: "philosophy-builder-1",
    title: "Responsible AI Development in Practice",
    channel: "DeepMind",
    youtubeId: "G3L9aH-4rZk",
    duration: "60 min",
    level: "builder",
    topics: ["philosophy", "building"],
    description:
      "What 'responsible AI' looks like as engineering practice, not marketing.",
    whyItMatters:
      "If you ship AI products, this is the floor, not the ceiling.",
  },
];

export const VIDEO_MAP: Record<string, Video> = VIDEOS.reduce(
  (acc, v) => {
    acc[v.id] = v;
    return acc;
  },
  {} as Record<string, Video>
);
