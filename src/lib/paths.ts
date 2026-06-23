import type { Path, Track, ExperienceLevel, Depth, QuizAnswers, TopicId } from "@/types";
import { VIDEOS } from "./videos";
import { deriveLevel, deriveTrack, deriveDepth } from "./quiz";

/**
 * Build a path for a given (track, level, depth) tuple.
 *
 * Selection rules:
 *  - Always include the right depth of `fundamentals` (or skip for builder).
 *  - Always include some `agents` content (the heart of the site).
 *  - If track involves doing things, include `automation` and `work`.
 *  - If track is builder, include `building`.
 *  - Always include 1 `philosophy` video.
 *  - Order: fundamentals → agents → track-relevant → philosophy.
 */
function buildPath(
  track: Track,
  level: ExperienceLevel,
  depth: Depth
): Path {
  const limit = depth === "shallow" ? 2 : depth === "medium" ? 3 : 5;
  const includeBuilding = track === "builder";
  const includeAutomation = track !== "curious" && track !== "informed";
  const includeWork = track === "work" || track === "personal" || track === "builder";

  const videoIds: string[] = [];

  // Helper: filter videos by topic.
  // Sort priority: 1) videos where the requested topic is the FIRST topic,
  // 2) videos with fewer total topics, 3) declaration order.
  const filterByTopic = (topic: TopicId) => {
    return VIDEOS.filter(
      (v) => v.topics.includes(topic) && v.level === level
    ).sort((a, b) => {
      // Prefer videos where this topic is the primary (first) topic
      const aPrimary = a.topics[0] === topic ? 0 : 1;
      const bPrimary = b.topics[0] === topic ? 0 : 1;
      if (aPrimary !== bPrimary) return aPrimary - bPrimary;
      // Among non-primary, prefer videos with fewer total topics
      if (a.topics.length !== b.topics.length) {
        return a.topics.length - b.topics.length;
      }
      return 0;
    });
  };

  // 1. Fundamentals
  if (level !== "builder") {
    const f = filterByTopic("fundamentals").slice(
      0,
      depth === "shallow" ? 1 : depth === "medium" ? 2 : 3
    );
    videoIds.push(...f.map((v) => v.id));
  }

  // 2. Agents (the heart of the site — always include, but adapt to level)
  const a = filterByTopic("agents").slice(
    0,
    depth === "shallow" ? 1 : depth === "medium" ? 2 : 3
  );
  videoIds.push(...a.map((v) => v.id));

  // 3. Automation (if doing-things track)
  if (includeAutomation) {
    const aut = filterByTopic("automation").slice(
      0,
      depth === "shallow" ? 1 : 2
    );
    videoIds.push(...aut.map((v) => v.id));
  }

  // 4. Building (only for builder track)
  if (includeBuilding) {
    const b = filterByTopic("building").slice(
      0,
      depth === "shallow" ? 1 : 2
    );
    videoIds.push(...b.map((v) => v.id));
  }

  // 5. Work (if doing-things track)
  if (includeWork) {
    const w = filterByTopic("work").slice(
      0,
      depth === "shallow" ? 1 : 2
    );
    videoIds.push(...w.map((v) => v.id));
  }

  // 6. Philosophy (always one) — prefer videos whose primary topic is philosophy
  const philosophyCandidates = VIDEOS.filter(
    (v) => v.topics.includes("philosophy") && v.level === level
  );
  // Sort so videos tagged ONLY with philosophy come before multi-topic ones
  philosophyCandidates.sort((a, b) => {
    const aPure = a.topics.length === 1 ? 0 : 1;
    const bPure = b.topics.length === 1 ? 0 : 1;
    return aPure - bPure;
  });
  if (philosophyCandidates.length > 0) {
    videoIds.push(philosophyCandidates[0].id);
  }

  // Cap the total
  const capped = videoIds.slice(0, limit * 3 + 2);

  // Dedupe while preserving order
  const seen = new Set<string>();
  const deduped: string[] = [];
  for (const id of capped) {
    if (!seen.has(id)) {
      seen.add(id);
      deduped.push(id);
    }
  }

  return {
    track,
    level,
    depth,
    title: trackLevelTitle(track, level),
    summary: trackLevelSummary(track, level),
    videoIds: deduped,
  };
}

function trackLevelTitle(track: Track, level: ExperienceLevel): string {
  const map: Record<Track, Record<ExperienceLevel, string>> = {
    personal: {
      newcomer: "Your Personal AI On-Ramp",
      intermediate: "Personal AI, Level Up",
      builder: "Build Your Own Personal Agent",
    },
    work: {
      newcomer: "AI for Work — Start Here",
      intermediate: "AI Workflows You Can Ship Monday",
      builder: "AI-Native Workflows for Builders",
    },
    builder: {
      newcomer: "From ChatGPT User to Builder",
      intermediate: "Build Your First AI Agent",
      builder: "Production-Ready AI Systems",
    },
    informed: {
      newcomer: "The Big Picture, Clearly Explained",
      intermediate: "The Technical Landscape in 60 Minutes",
      builder: "AI from First Principles",
    },
    curious: {
      newcomer: "The Best 60 Minutes You'll Spend This Week",
      intermediate: "A Curious Builder's Tour",
      builder: "Everything You Always Wanted to Ask",
    },
  };
  return map[track][level];
}

function trackLevelSummary(track: Track, level: ExperienceLevel): string {
  const map: Record<Track, Record<ExperienceLevel, string>> = {
    personal: {
      newcomer:
        "Start from zero. We will get you from 'ChatGPT on my phone' to 'I have a working personal AI workflow'.",
      intermediate:
        "You already use ChatGPT. Now learn the patterns that turn it into a personal assistant that actually does things.",
      builder:
        "Build a personal agent that handles the work you hate. We will show you the architecture and ship it with you.",
    },
    work: {
      newcomer:
        "The most practical introduction to using AI at work, regardless of your role or industry.",
      intermediate:
        "Ship an AI workflow on Monday morning. We have hand-picked the videos that show you how.",
      builder:
        "Build the AI workflows your team needs. From Zapier to RAG, in the order that makes sense.",
    },
    builder: {
      newcomer:
        "You are about to become dangerous. Start with the foundations, then build your first agent by the end of the week.",
      intermediate:
        "Skip the basics, focus on the parts that actually matter. Build, debug, and ship your first real agent.",
      builder:
        "Production-grade patterns from teams that ship agents at scale. The hard-won lessons, not the toy examples.",
    },
    informed: {
      newcomer:
        "A clear, hype-free tour of where AI is going and why it matters to you. No technical background needed.",
      intermediate:
        "The landscape in 60 minutes: the companies, the techniques, the inflection points, and what to watch next.",
      builder:
        "The first-principles view. Where the technology actually is, where it is going, and what it will take to get there safely.",
    },
    curious: {
      newcomer:
        "A 60-minute on-ramp into the most interesting topic of our time. Bring curiosity, leave with vocabulary.",
      intermediate:
        "You are not a beginner, but you are not sure what to learn next. Here is a curated tour.",
      builder:
        "The most thoughtful corners of the AI world, picked for the kind of mind that asks 'but why' a lot.",
    },
  };
  return map[track][level];
}

export function getPathFor(answers: QuizAnswers): Path {
  const level = deriveLevel(answers);
  const track = deriveTrack(answers);
  const depth = deriveDepth(answers);
  return buildPath(track, level, depth);
}
