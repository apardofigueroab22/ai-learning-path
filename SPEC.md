# AI Learning Path — SPEC

> A curated video compendium for ChatGPT-on-the-phone users stepping into the agents world.
> Subsite of `pardofigueroa.org`. Open, no auth, no tracking.

---

## 1. Vision

A small, focused site that asks the visitor 5 questions and recommends a tailored set of YouTube videos to bring them from "I use ChatGPT on my phone" to "I understand agents, automations, loops, and can start imagining what I can build with them."

The site is a **compass**, not a course. It does not teach — it points to the right teachers.

---

## 2. Audience

**Primary**: A person who knows ChatGPT on their phone. They have not heard of agents, RAG, langchain, or Zapier in a technical sense. They may have heard "AI" but not "agentic AI." They want to know what's coming, what's possible, and where to start.

**Secondary**: Anyone in a non-technical role (marketing, operations, HR, sales, education, small business owner) curious about the new AI landscape.

**Tertiary**: The user himself — he circulates this on his work and on social.

The site must never assume prior knowledge beyond ChatGPT-on-the-phone.

---

## 3. Goals

1. **Orient** the visitor in 60 seconds or less (time to first recommendation).
2. **Match** them to videos that match their starting point and intended destination.
3. **Educate** them just enough to start recognizing the vocabulary of the new AI world.
4. **Circulate** well — clean URL, shareable result, no friction.

Non-goals: account creation, progress tracking, certificates, comments, social feeds, monetization.

---

## 4. Experience Flow

```
[ Land ] → [ Hero + Start ] → [ Q1 ] → [ Q2 ] → [ Q3 ] → [ Q4 ] → [ Q5 ] → [ Loading beat ] → [ Personalized recommendations ]
                                                       ↑                                                                       
                                                  Back button available on every step
```

**Single page**, no client-side routing beyond `?q=...` for shareable results.

### Question Set (5 questions)

| # | Question | Answers | Scoring |
|---|----------|---------|---------|
| 1 | **How comfortable are you with ChatGPT or similar AI tools?** | I have never used it / I use it sometimes for basic stuff / I use it daily and write decent prompts | Experience level: 1, 2, 3 |
| 2 | **What is your experience with AI agents (tools that act on their own)?** | I have never heard of them / I have heard of them but never used one / I have tried one or two (AutoGPT, Zapier, etc.) / I am building my own | Agent familiarity: 0, 1, 2, 3 |
| 3 | **What would you most like to get from learning about agents?** | Automate repetitive tasks in my daily life / Use AI to be more effective at work / Understand the technology and possibly build my own / Stay informed about where the world is going / Just curious, no specific goal | Interest: 1, 2, 3, 4, 5 |
| 4 | **What kind of work or life do you want this for?** | Personal productivity / Work or business (any industry) / Software / data / creative work / I'm exploring, not sure yet | Context: 1, 2, 3, 4 |
| 5 | **How much time can you dedicate to learning in a week?** | 30 minutes / 1–2 hours / 3+ hours | Depth: shallow, medium, deep |

### Recommendation Logic

A simple **scoring + path table**:

- **Track** is derived from Q3 (primary) and Q4 (context). Track is one of: `personal`, `work`, `builder`, `informed`, `curious`.
- **Level** is derived from Q1+Q2 (capped at 3): `newcomer`, `intermediate`, `builder`.
- **Depth** is derived from Q5: `shallow` (1–3 videos per topic), `medium` (3–5), `deep` (5+).
- For each combination of `(track, level, depth)`, a curated playlist of 6–14 videos across the 6 topics is selected.

The path table lives in `src/lib/paths.ts` and is fully editable.

---

## 5. Topics (Curriculum)

| # | Topic | Audience purpose |
|---|-------|------------------|
| 1 | **AI Fundamentals** | How LLMs work, prompting, limitations, what ChatGPT actually is |
| 2 | **Agents & Autonomous AI** | What agents are, loops, chains, tool use, planning |
| 3 | **Automation Platforms** | Zapier, Make, n8n, IFTTT, connecting apps |
| 4 | **Building with AI** | APIs, langchain, vector DBs, RAG, no-code AI builders |
| 5 | **Work & Business Use Cases** | Real-world applications by function (marketing, ops, sales, support) |
| 6 | **Philosophy & Implications** | AI safety, jobs, future, the bigger picture |

---

## 6. Information Architecture

```
/                       Home (Hero + "Start" + brief explanation)
/?p=<encoded>           Shows the same page, but pre-fills the path
```

Everything is in `/`. The quiz and results are rendered client-side as state transitions on a single page.

No menu. No footer beyond minimal credit + share button.

---

## 7. Design System

> Inspired by Cal.com (clean neutral) and Vercel (Geist typography) from the awesome-design-md collection.
> Built using the Style 1 — Minimalism & Swiss Style — from ui-ux-pro-max-skill.
> UX rules follow the 99+ guidelines in `ui-ux-pro-max-skill/data/ux-guidelines.csv`.

### Color (Light)

| Token | Hex | Role |
|-------|-----|------|
| `canvas` | `#ffffff` | Page background |
| `surface-soft` | `#fafafa` | Subtle section dividers |
| `surface-card` | `#f5f5f5` | Card backgrounds |
| `surface-strong` | `#e5e7eb` | Borders, hairlines |
| `ink` | `#0a0a0a` | Headlines, primary text |
| `body` | `#404040` | Body text |
| `muted` | `#737373` | Secondary text |
| `primary` | `#0a0a0a` | Primary CTAs (black) |
| `on-primary` | `#ffffff` | Text on primary |
| `accent` | `#6366f1` | Subtle accent for highlights, links |
| `accent-soft` | `#eef2ff` | Accent backgrounds |
| `success` | `#10b981` | Completion, "new to you" |

### Color (Dark)

| Token | Hex | Role |
|-------|-----|------|
| `canvas` | `#0a0a0a` | Page background |
| `surface-soft` | `#171717` | Subtle section dividers |
| `surface-card` | `#1a1a1a` | Card backgrounds |
| `surface-strong` | `#262626` | Borders, hairlines |
| `ink` | `#fafafa` | Headlines, primary text |
| `body` | `#a3a3a3` | Body text |
| `muted` | `#737373` | Secondary text |
| `primary` | `#fafafa` | Primary CTAs (inverted) |
| `accent` | `#818cf8` | Accent |

### Typography

- **Display**: Geist (Vercel), fallback `Inter`, `system-ui`, `sans-serif`. Sizes 48/40/32/24/20. Weight 600, negative letter-spacing.
- **Body**: Inter. Sizes 16/14/13. Weight 400 (body), 500 (UI labels).
- **Mono**: JetBrains Mono. For any technical references.

### Components

- **Button**: 8px radius, 14px text, 600 weight, 10×18 padding. Primary = black bg + white text. Secondary = white bg + black border.
- **Card**: 12px radius, 24px padding, `#f5f5f5` bg, 1px hairline on dark mode.
- **Quiz card**: 16px radius, 32px padding, white card on `surface-soft` background.
- **Video card**: 16px radius, 16px internal padding, 12px thumbnail radius, 16:9 aspect ratio for embed.
- **Pill (tag)**: 9999px radius, 4×12 padding, 13px / 500.

### Layout

- Max content width: 720px (centered) for the quiz, 1100px (centered) for the results.
- Vertical rhythm: 96px between major sections, 24–32px between cards.
- 12-column grid (CSS grid, mobile stacks to single column).

### Motion

- Transitions: 200ms ease-out for hover, 300ms for state changes.
- Honor `prefers-reduced-motion`.

### Accessibility (must pass)

- WCAG AA contrast (4.5:1 minimum, 7:1 for body).
- 44×44px minimum touch targets.
- Visible focus rings (2px solid accent).
- Skip-to-main-content link.
- Semantic HTML (`<main>`, `<nav>`, `<section>`, `<article>`).
- All interactive elements keyboard-reachable.
- ARIA labels on icon-only buttons.
- `prefers-reduced-motion` respected.
- Form labels properly associated.

---

## 8. Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Fonts**: Geist + Inter (via `next/font/google` and `geist` package)
- **State**: React state + URL search params for shareable results
- **Video embeds**: YouTube `iframe` (with `youtube-nocookie` for privacy)
- **Deployment**: Vercel
- **Analytics**: None (or a single, opt-in page view counter — user decision)

### Folder Structure

```
ai-learning-path/
├── SPEC.md
├── DESIGN.md
├── README.md
├── package.json
├── next.config.mjs
├── tsconfig.json
├── postcss.config.mjs
├── tailwind.config.ts
├── public/
│   ├── og-image.png
│   └── favicon.svg
└── src/
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx
    │   └── globals.css
    ├── components/
    │   ├── Hero.tsx
    │   ├── Quiz.tsx
    │   ├── QuizQuestion.tsx
    │   ├── QuizProgress.tsx
    │   ├── Results.tsx
    │   ├── VideoCard.tsx
    │   ├── TopicSection.tsx
    │   ├── ShareButton.tsx
    │   ├── ThemeToggle.tsx
    │   └── icons/
    │       └── (lucide-react)
    ├── lib/
    │   ├── quiz.ts        // Question definitions + scoring
    │   ├── paths.ts       // Path → video playlist table
    │   ├── videos.ts      // Curated video catalog
    │   └── share.ts       // URL encoding/decoding
    └── types.ts
```

---

## 9. Content Curation Strategy

The video catalog will be hand-curated by me (the agent) drawing on widely recognized YouTube channels and talks:

- **3Blue1Brown** — neural net visual explanations
- **Andrej Karpathy** — deep dives on how LLMs work
- **Fireship** — short, sharp technical explainers
- **Kurzgesagt** — philosophy & implications
- **Yannic Kilcher** — paper walkthroughs
- **Sam Witteveen** — agent tutorials
- **Matt Wolfe / AI Explained** — landscape & tools
- **Liam Ottley** — practical AI use
- **Greg Isenberg** — work & business
- **Nate Herk / AI Automation** — Zapier/Make/n8n
- **Dave Shapiro / The AI Advantage** — practical AI

For each topic × level combination, I will pick **3–5 videos** that are:
- Publicly available
- High quality (production, accuracy, clear narration)
- In English
- Reasonable length (under 60 min preferred, except deep-dive sessions)
- Not behind a paywall

The catalog will be stored in `src/lib/videos.ts` as typed objects.

---

## 10. Out of Scope (V1)

- User accounts, login, or saved progress
- Comments, ratings, reviews
- Video hosting (everything is YouTube)
- Multiple languages (English only)
- A mobile app
- Server-side persistence
- Newsletter, email capture
- Analytics beyond a single page view counter (optional)

---

## 11. Open Questions for User

1. Site name / domain slug? Currently using `ai-learning-path` as the working name.
2. Should the site have a tiny "About / Why this exists" page or just credit at the bottom?
3. Any videos you want to include that you already know about?
4. Should there be a "Share my results" feature that encodes the path in the URL?

---

## 12. Success Criteria

A new visitor arrives → understands what the site is in 5 seconds → answers 5 questions in <90 seconds → receives a clear, useful, well-curated playlist → can click into any video immediately. They can also share their path via URL.

If they finish, they should feel: "I have a plan. I know where to start."
