import type { QuizAnswers, Track, ExperienceLevel, Depth } from "@/types";
import { deriveLevel, deriveTrack, deriveDepth } from "./quiz";

/**
 * Encode a path (track, level, depth) as a compact URL-safe string.
 * 1 char for track, 1 char for level, 1 char for depth.
 * Total: 3 chars.
 */
const TRACK_CHARS = "pcwbic"; // personal, work, builder, informed, builder (re-use 'b'), informed, curious
// mapping by index
const TRACK_INDEX: Track[] = ["personal", "work", "builder", "informed", "curious"];
const TRACK_LOOKUP: Record<string, Track> = {
  p: "personal",
  w: "work",
  b: "builder",
  i: "informed",
  c: "curious",
};

const LEVEL_CHARS = "nid"; // newcomer, intermediate, builder
const LEVEL_LOOKUP: Record<string, ExperienceLevel> = {
  n: "newcomer",
  i: "intermediate",
  d: "builder",
};

const DEPTH_CHARS = "smd"; // shallow, medium, deep
const DEPTH_LOOKUP: Record<string, Depth> = {
  s: "shallow",
  m: "medium",
  d: "deep",
};

export function encodePath(
  track: Track,
  level: ExperienceLevel,
  depth: Depth
): string {
  const t = TRACK_INDEX.indexOf(track);
  const l = ["newcomer", "intermediate", "builder"].indexOf(level);
  const d = ["shallow", "medium", "deep"].indexOf(depth);
  return `${TRACK_CHARS[t]}${LEVEL_CHARS[l]}${DEPTH_CHARS[d]}`;
}

export function decodePath(code: string): {
  track: Track;
  level: ExperienceLevel;
  depth: Depth;
} | null {
  if (!code || code.length !== 3) return null;
  const t = TRACK_LOOKUP[code[0]];
  const l = LEVEL_LOOKUP[code[1]];
  const d = DEPTH_LOOKUP[code[2]];
  if (!t || !l || !d) return null;
  return { track: t, level: l, depth: d };
}

export function encodeAnswers(answers: QuizAnswers): string {
  const level = deriveLevel(answers);
  const track = deriveTrack(answers);
  const depth = deriveDepth(answers);
  return encodePath(track, level, depth);
}

export function buildShareUrl(answers: QuizAnswers, baseUrl: string): string {
  const code = encodeAnswers(answers);
  const url = new URL(baseUrl);
  url.searchParams.set("p", code);
  return url.toString();
}
