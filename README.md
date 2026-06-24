# AI Learning Path

A free, no-signup, no-tracking compendium of YouTube videos that takes a person from "I use ChatGPT on my phone" to "I understand AI agents, automations, loops, and the new world of agentic AI."

The visitor answers 5 questions. The site recommends a tailored set of videos across 6 topics (fundamentals, agents, automation, building, work, philosophy) for their level and interest.

A subsite of [pardofigueroa.org](https://pardofigueroa.org).

## Stack

- **Next.js 15** (App Router, React 19)
- **Tailwind CSS v4**
- **Geist + Inter** typography
- **YouTube `iframe` embeds** (with `youtube-nocookie` for privacy)
- **Vercel** for deployment

No backend, no database, no auth, no tracking. The only "state" lives in the URL (`?p=...`) so anyone can share their path.

## Local Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
npm run typecheck
npm run test     # path-recommendation regression tests
```

## Folder Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout with fonts + metadata
│   ├── page.tsx          # Single-page state machine
│   └── globals.css       # Tailwind v4 + design tokens
├── components/
│   ├── Hero.tsx          # Landing page
│   ├── Quiz.tsx          # 5-question quiz
│   ├── Results.tsx       # Personalized video grid
│   └── VideoCard.tsx     # Single video with YouTube embed
├── lib/
│   ├── quiz.ts           # Question definitions + scoring
│   ├── paths.ts          # Recommendation engine
│   ├── videos.ts         # Curated video catalog
│   └── share.ts          # URL encode/decode
└── types.ts
```

## How the recommendation works

1. The user answers 5 questions about their experience, familiarity with agents, goals, context, and time.
2. We derive an **Experience Level** (`newcomer` | `intermediate` | `builder`) from Q1 + Q2.
3. We derive a **Track** (`personal` | `work` | `builder` | `informed` | `curious`) from Q3.
4. We derive a **Depth** (`shallow` | `medium` | `deep`) from Q5.
5. The combination determines a curated playlist of 6-14 videos across 6 topics, ordered so it makes sense.

The result is encoded as 3 characters in the URL (`?p=XYZ`). Anyone with the link sees the same path.

## Adding Videos

1. Find the video, copy the YouTube ID (the `v=...` parameter).
2. Add a new entry to `src/lib/videos.ts` with:
   - `id` (unique slug, e.g. `fundamentals-newcomer-4`)
   - `title`, `channel`, `youtubeId`, `duration`
   - `level` (`newcomer` | `intermediate` | `builder`)
   - `topics` (array of topic IDs)
   - `description` (1 sentence)
   - `whyItMatters` (1 sentence, the value-prop for the viewer)
3. **Verify the YouTube ID** by opening `https://www.youtube.com/watch?v=<ID>` in a browser. If it plays, add `verified: true,` after the youtubeId line. Until verified, leave the field out (or `verified: false`) — the test suite will not block unverified IDs, but a verified catalog is required before the site is shareable.
4. The path engine picks it up automatically.

## Video catalog status (2026-06-23)

**The site is not ready to circulate yet.** Out of 52 videos, only 7 have been click-verified to point to real YouTube videos. The remaining ~45 entries have YouTube IDs that *look* real (11 characters, valid format) but were generated as placeholders. They will 404 if a user clicks "Open on YouTube".

**Before sharing this site with anyone, replace the placeholder IDs.** The fastest way:

1. `npm run test` — see how many IDs are verified.
2. For each unverified video, find the real talk on YouTube and replace the `youtubeId`.
3. Open each replacement URL in a browser to confirm.
4. Add `verified: true,` to the entry.
5. Re-run `npm run test` — when every video is verified, the catalog is ready.

The verified entries are flagged with `verified: true,` after their `youtubeId` line.

## Deployment

Vercel is the target. Push to a Git repo, import in Vercel, done. The site is fully static and can be served from any CDN.

## License

Videos are linked from YouTube. The site itself is a curated reading list — no video is hosted.

A project by [Pardo de Figueroa](https://pardofigueroa.org).
