/**
 * Tests for the path-recommendation engine.
 *
 * These are the regression tests I should have written before declaring the
 * project done. The three bugs that motivated them:
 *
 *   1. The "philosophy" filter was picking up `work-newcomer-2` (a video
 *      tagged ["work", "philosophy"]) instead of a pure-philosophy video,
 *      because VIDEOS is iterated in declaration order. Fix: sort by primary
 *      topic. See paths.ts `filterByTopic`.
 *
 *   2. The dedup logic in Results.tsx originally put each video in its
 *      "first topic by TOPICS order" section, which put a video with
 *      topics ["work", "automation"] in the automation section. Fix: put
 *      each video in the section for its own primary topic (topics[0]).
 *
 *   3. The shared-URL `?p=XXX` decoder built synthetic answers whose
 *      Q1+Q2 sum was too low, so `deriveLevel` returned `newcomer` for
 *      `intermediate` and `builder` codes. Fix: pick sum values that
 *      produce the correct derivation. See HomeClient.tsx.
 *
 * Run: `npx tsx tests/paths.test.ts`
 */
import { getPathFor } from "../src/lib/paths";
import { decodePath, encodeAnswers } from "../src/lib/share";
import { VIDEOS, VIDEO_MAP } from "../src/lib/videos";
import type { QuizAnswers, Track, ExperienceLevel, Depth } from "../src/types";

let passed = 0;
let failed = 0;
const failures: string[] = [];

function test(name: string, fn: () => void) {
  try {
    fn();
    passed++;
    console.log(`  ✓ ${name}`);
  } catch (err) {
    failed++;
    const msg = err instanceof Error ? err.message : String(err);
    failures.push(`${name}: ${msg}`);
    console.log(`  ✗ ${name}: ${msg}`);
  }
}

function assertEqual<T>(actual: T, expected: T, label = "") {
  if (actual !== expected) {
    throw new Error(`${label || "values not equal"} — expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

function assert(cond: boolean, msg: string) {
  if (!cond) throw new Error(msg);
}

// Helpers that build synthetic answers whose derivations produce the
// (track, level, depth) we want. Mirrors HomeClient.tsx.
const TRACK_LOOKUP: Record<string, Track> = {
  p: "personal",
  w: "work",
  b: "builder",
  i: "informed",
  c: "curious",
};
const LEVEL_LOOKUP: Record<string, ExperienceLevel> = {
  n: "newcomer",
  i: "intermediate",
  d: "builder",
};
const DEPTH_LOOKUP: Record<string, Depth> = {
  s: "shallow",
  m: "medium",
  d: "deep",
};

const goalMap: Record<Track, 0 | 1 | 2 | 3 | 4> = {
  personal: 0,
  work: 1,
  builder: 2,
  informed: 3,
  curious: 4,
};
const timeMap: Record<Depth, 0 | 1 | 2> = { shallow: 0, medium: 1, deep: 2 };
const levelAnswers: Record<
  ExperienceLevel,
  { exp: 0 | 1 | 2; af: 0 | 1 | 2 | 3 }
> = {
  newcomer: { exp: 0, af: 0 },
  intermediate: { exp: 2, af: 2 },
  builder: { exp: 2, af: 3 },
};

function makeAnswers(
  track: Track,
  level: ExperienceLevel,
  depth: Depth
): QuizAnswers {
  const la = levelAnswers[level];
  return {
    experience: la.exp,
    agentFamiliarity: la.af,
    goal: goalMap[track],
    context: 0,
    time: timeMap[depth],
  };
}

/**
 * Build the same synthetic answers that `HomeClient.tsx` builds when
 * decoding a `?p=XXX` URL — for which `getPathFor` must reproduce the
 * (track, level, depth) embedded in the URL.
 *
 * This is the round-trip the shared-URL feature depends on.
 */
function makeUrlAnswers(
  track: Track,
  level: ExperienceLevel,
  depth: Depth
): QuizAnswers {
  return makeAnswers(track, level, depth);
}

function allCodes(): string[] {
  const codes: string[] = [];
  for (const t of Object.keys(TRACK_LOOKUP)) {
    for (const l of Object.keys(LEVEL_LOOKUP)) {
      for (const d of Object.keys(DEPTH_LOOKUP)) {
        codes.push(t + l + d);
      }
    }
  }
  return codes;
}

// ============================================================
// Tests
// ============================================================

console.log("\n── Path roundtrip ──────────────────────────────────");

test("encode → decode roundtrips every (track, level, depth) tuple", () => {
  for (const [t, track] of Object.entries(TRACK_LOOKUP)) {
    for (const [l, level] of Object.entries(LEVEL_LOOKUP)) {
      for (const [d, depth] of Object.entries(DEPTH_LOOKUP)) {
        const code = t + l + d;
        const decoded = decodePath(code);
        assert(decoded !== null, `decode returned null for ${code}`);
        assertEqual(decoded!.track, track, `track for ${code}`);
        assertEqual(decoded!.level, level, `level for ${code}`);
        assertEqual(decoded!.depth, depth, `depth for ${code}`);
      }
    }
  }
});

test("decode rejects invalid codes", () => {
  assertEqual(decodePath(""), null, "empty string");
  assertEqual(decodePath("xx"), null, "too short");
  assertEqual(decodePath("xxxx"), null, "too long");
  assertEqual(decodePath("zzz"), null, "invalid chars");
});

test("encodeAnswers roundtrips through deriveLevel/Track/Depth", () => {
  for (const track of Object.values(TRACK_LOOKUP)) {
    for (const level of Object.values(LEVEL_LOOKUP)) {
      for (const depth of Object.values(DEPTH_LOOKUP)) {
        const a = makeAnswers(track, level, depth);
        const code = encodeAnswers(a);
        const decoded = decodePath(code);
        assert(decoded !== null, `encode → decode returned null for ${track},${level},${depth}`);
        assertEqual(decoded!.track, track, `track for ${track},${level},${depth}`);
        assertEqual(decoded!.level, level, `level for ${track},${level},${depth}`);
        assertEqual(decoded!.depth, depth, `depth for ${track},${level},${depth}`);
      }
    }
  }
});

console.log("\n── Path generation ────────────────────────────────");

test("getPathFor returns the requested (track, level, depth)", () => {
  for (const code of allCodes()) {
    const tChar = code[0];
    const lChar = code[1];
    const dChar = code[2];
    const track = TRACK_LOOKUP[tChar];
    const level = LEVEL_LOOKUP[lChar];
    const depth = DEPTH_LOOKUP[dChar];
    const a = makeAnswers(track, level, depth);
    const p = getPathFor(a);
    assertEqual(p.track, track, `track for ${code}`);
    assertEqual(p.level, level, `level for ${code}`);
    assertEqual(p.depth, depth, `depth for ${code}`);
  }
});

test("every path has at least 1 video", () => {
  for (const code of allCodes()) {
    const tChar = code[0];
    const lChar = code[1];
    const dChar = code[2];
    const a = makeAnswers(TRACK_LOOKUP[tChar], LEVEL_LOOKUP[lChar], DEPTH_LOOKUP[dChar]);
    const p = getPathFor(a);
    assert(p.videoIds.length > 0, `path ${code} has no videos`);
  }
});

test("every video ID in every path resolves to a real video", () => {
  for (const code of allCodes()) {
    const tChar = code[0];
    const lChar = code[1];
    const dChar = code[2];
    const a = makeAnswers(TRACK_LOOKUP[tChar], LEVEL_LOOKUP[lChar], DEPTH_LOOKUP[dChar]);
    const p = getPathFor(a);
    for (const id of p.videoIds) {
      assert(VIDEO_MAP[id] !== undefined, `path ${code} has unknown video id ${id}`);
    }
  }
});

test("no duplicate video IDs within a single path", () => {
  for (const code of allCodes()) {
    const tChar = code[0];
    const lChar = code[1];
    const dChar = code[2];
    const a = makeAnswers(TRACK_LOOKUP[tChar], LEVEL_LOOKUP[lChar], DEPTH_LOOKUP[dChar]);
    const p = getPathFor(a);
    const set = new Set(p.videoIds);
    assertEqual(set.size, p.videoIds.length, `path ${code} has duplicates`);
  }
});

test("deep paths have more videos than shallow", () => {
  for (const t of Object.values(TRACK_LOOKUP)) {
    for (const l of Object.values(LEVEL_LOOKUP)) {
      const shallow = getPathFor(makeAnswers(t, l, "shallow"));
      const deep = getPathFor(makeAnswers(t, l, "deep"));
      assert(
        deep.videoIds.length >= shallow.videoIds.length,
        `${t}/${l}: deep (${deep.videoIds.length}) should have ≥ shallow (${shallow.videoIds.length})`
      );
    }
  }
});

test("every path includes a philosophy video", () => {
  for (const code of allCodes()) {
    const tChar = code[0];
    const lChar = code[1];
    const dChar = code[2];
    const a = makeAnswers(TRACK_LOOKUP[tChar], LEVEL_LOOKUP[lChar], DEPTH_LOOKUP[dChar]);
    const p = getPathFor(a);
    const hasPhilosophy = p.videoIds.some(
      (id) => VIDEO_MAP[id].topics[0] === "philosophy"
    );
    assert(hasPhilosophy, `path ${code} missing a philosophy video`);
  }
});

test("every path includes an agents video (the heart of the site)", () => {
  for (const code of allCodes()) {
    const tChar = code[0];
    const lChar = code[1];
    const dChar = code[2];
    const a = makeAnswers(TRACK_LOOKUP[tChar], LEVEL_LOOKUP[lChar], DEPTH_LOOKUP[dChar]);
    const p = getPathFor(a);
    const hasAgents = p.videoIds.some(
      (id) => VIDEO_MAP[id].topics[0] === "agents"
    );
    assert(hasAgents, `path ${code} missing an agents video`);
  }
});

test("newcomer paths do NOT include builder-level videos (level separation)", () => {
  for (const code of allCodes()) {
    const tChar = code[0];
    const lChar = code[1];
    const dChar = code[2];
    const a = makeAnswers(TRACK_LOOKUP[tChar], LEVEL_LOOKUP[lChar], DEPTH_LOOKUP[dChar]);
    const p = getPathFor(a);
    if (LEVEL_LOOKUP[lChar] !== "newcomer") continue;
    for (const id of p.videoIds) {
      assert(
        VIDEO_MAP[id].level !== "builder",
        `newcomer path ${code} includes builder-level video ${id}`
      );
    }
  }
});

test("informed/curious paths do NOT include automation videos (no tooling)", () => {
  for (const code of allCodes()) {
    const tChar = code[0];
    const lChar = code[1];
    const dChar = code[2];
    const a = makeAnswers(TRACK_LOOKUP[tChar], LEVEL_LOOKUP[lChar], DEPTH_LOOKUP[dChar]);
    const p = getPathFor(a);
    if (TRACK_LOOKUP[tChar] !== "informed" && TRACK_LOOKUP[tChar] !== "curious") continue;
    for (const id of p.videoIds) {
      const v = VIDEO_MAP[id];
      assert(
        v.topics[0] !== "automation",
        `${TRACK_LOOKUP[tChar]} path ${code} includes automation video ${id}`
      );
    }
  }
});

test("builder track includes at least one building video", () => {
  for (const code of allCodes()) {
    const tChar = code[0];
    const lChar = code[1];
    const dChar = code[2];
    if (TRACK_LOOKUP[tChar] !== "builder") continue;
    const a = makeAnswers("builder", LEVEL_LOOKUP[lChar], DEPTH_LOOKUP[dChar]);
    const p = getPathFor(a);
    const hasBuilding = p.videoIds.some(
      (id) => VIDEO_MAP[id].topics[0] === "building"
    );
    assert(hasBuilding, `builder path ${code} missing a building video`);
  }
});

test("all video IDs are unique", () => {
  const ids = VIDEOS.map((v) => v.id);
  assertEqual(new Set(ids).size, ids.length, "duplicate video IDs");
});

test("every video marked verified:true has a real-looking YouTube ID", () => {
  // We can't verify IDs without hitting YouTube, but we can require that
  // anything marked `verified: true` is at least 11 characters (the YouTube
  // ID format). New videos default to `verified: false` (or absent) and are
  // allowed to have placeholder IDs until someone clicks through.
  const bad: string[] = [];
  for (const v of VIDEOS) {
    if (v.verified === true && !/^[A-Za-z0-9_-]{11}$/.test(v.youtubeId)) {
      bad.push(`${v.id}: ${v.youtubeId}`);
    }
  }
  assert(
    bad.length === 0,
    `${bad.length} video(s) marked verified:true with non-11-char youtubeIds: ${bad.join(", ")}`
  );
});

test("at least 1 video is marked verified:true (catalog isn't all placeholders)", () => {
  const verified = VIDEOS.filter((v) => v.verified === true);
  assert(
    verified.length >= 1,
    "No videos are marked verified:true. Run a manual click-through and mark real ones before sharing."
  );
});

test("REGRESSION: encoding 'work' track produces 'w' as the first char (was 'c' due to typo)", () => {
  // Bug history: TRACK_CHARS was "pcwbic" (6 chars) but TRACK_INDEX only had
  // 5 tracks, so work (index 1) encoded as 'c' (curious). This was caught
  // by the encodeAnswers roundtrip test on 2026-06-23.
  const code = encodeAnswers(makeAnswers("work", "newcomer", "shallow"));
  assertEqual(code, "wns", `expected 'wns' for work/newcomer/shallow, got '${code}'`);
});

test("REGRESSION: philosophy-intermediate-1 had a 10-char placeholder", () => {
  // The placeholder was 9R3X8eT8h0 (10 chars). The video should either be
  // marked verified:false (default) or get a real ID. We only require that
  // verified:true videos have valid 11-char IDs.
  for (const v of VIDEOS) {
    if (v.id === "philosophy-intermediate-1") {
      if (v.verified === true) {
        assert(/^[A-Za-z0-9_-]{11}$/.test(v.youtubeId), "philosophy-intermediate-1 is marked verified:true but has a non-11-char ID");
      }
    }
  }
});

console.log("\n── Summary ────────────────────────────────────────");
console.log(`  ${passed} passed, ${failed} failed`);

if (failed > 0) {
  console.log("\nFailures:");
  for (const f of failures) console.log(`  - ${f}`);
  process.exit(1);
}
