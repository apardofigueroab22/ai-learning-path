"use client";

import { useMemo, useState, useEffect } from "react";
import { ArrowLeft, Share2, Check, RotateCcw, Bookmark } from "lucide-react";
import { VideoCard } from "./VideoCard";
import { TOPICS, VIDEO_MAP } from "@/lib/videos";
import { LEVEL_LABEL, TRACK_LABEL, TRACK_DESCRIPTION } from "@/lib/quiz";
import { encodeAnswers } from "@/lib/share";
import type { Path, QuizAnswers } from "@/types";

type Props = {
  path: Path;
  answers: QuizAnswers;
  onRestart: () => void;
};

export function Results({ path, answers, onRestart }: Props) {
  const [shareState, setShareState] = useState<"idle" | "copied" | "error">(
    "idle"
  );

  const videoList = useMemo(
    () =>
      path.videoIds
        .map((id) => VIDEO_MAP[id])
        .filter((v): v is NonNullable<typeof v> => Boolean(v)),
    [path.videoIds]
  );

  // Group videos by topic for the section display.
  // Each video appears in only ONE topic section — the section for its
  // PRIMARY topic (the first topic in the video's own `topics` array).
  // This is more meaningful than "first topic in TOPICS order" because the
  // video's author tagged it with a specific primary topic.
  // A video tagged with ['work', 'automation'] shows in 'work', not 'automation'.
  const byTopic = useMemo(() => {
    const groups = new Map<string, typeof videoList>();
    for (const v of videoList) {
      const primary = v.topics[0]; // first topic = primary
      if (!groups.has(primary)) {
        groups.set(primary, [] as typeof videoList);
      }
      (groups.get(primary) as typeof videoList).push(v);
    }
    // Filter out empty groups and ensure topic order is preserved
    return new Map(
      TOPICS.filter((t) => groups.has(t.id)).map((t) => [t.id, groups.get(t.id)!])
    );
  }, [videoList]);

  const totalMinutes = useMemo(() => {
    let total = 0;
    for (const v of videoList) {
      const match = v.duration.match(/(\d+)/);
      if (match) total += parseInt(match[1], 10);
    }
    return total;
  }, [videoList]);

  const handleShare = async () => {
    if (typeof window === "undefined") return;
    const code = encodeAnswers(answers);
    const url = `${window.location.origin}${window.location.pathname}?p=${code}`;
    try {
      await navigator.clipboard.writeText(url);
      setShareState("copied");
      setTimeout(() => setShareState("idle"), 2500);
    } catch {
      setShareState("error");
      setTimeout(() => setShareState("idle"), 2500);
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl animate-fade-in px-4 sm:px-6">
      {/* Header */}
      <div className="mb-12">
        <button
          type="button"
          onClick={onRestart}
          className="btn btn-ghost mb-8"
          aria-label="Start over"
        >
          <ArrowLeft className="h-4 w-4" />
          Start over
        </button>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="pill pill-accent">
              <Bookmark className="h-3 w-3" />
              {TRACK_LABEL[path.track]}
            </span>
            <span className="pill">{LEVEL_LABEL[path.level]}</span>
            <span className="pill">
              {path.depth === "shallow"
                ? "~30 min"
                : path.depth === "medium"
                ? "1–2 hours"
                : "3+ hours"}
            </span>
          </div>
          <h1 className="display-xl text-ink">{path.title}</h1>
          <p className="body-lg max-w-2xl">{path.summary}</p>
          <p className="text-sm text-muted">
            {videoList.length} curated videos · ~{totalMinutes} minutes total
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={handleShare}
            className="btn btn-secondary"
          >
            {shareState === "copied" ? (
              <>
                <Check className="h-4 w-4" />
                Link copied
              </>
            ) : shareState === "error" ? (
              <>
                <Share2 className="h-4 w-4" />
                Copy failed — try again
              </>
            ) : (
              <>
                <Share2 className="h-4 w-4" />
                Share my path
              </>
            )}
          </button>
          <a href="#videos" className="btn btn-ghost">
            Jump to videos
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </a>
        </div>
      </div>

      {/* The path explanation */}
      <section className="mb-16 rounded-2xl border border-surface-strong bg-surface-soft p-6 sm:p-8">
        <p className="eyebrow mb-3">Why this path</p>
        <p className="text-base leading-relaxed text-body">
          {TRACK_DESCRIPTION[path.track]}{" "}
          {path.level === "newcomer" &&
            " We have started you off with the most accessible material we could find, and we have skipped anything that assumes a technical background."}
          {path.level === "intermediate" &&
            " You already have the basics, so we have skipped the 101 content and gone straight to the parts that actually move the needle."}
          {path.level === "builder" &&
            " You do not need the basics explained. We have picked the videos that are dense, accurate, and load-bearing for the kind of work you are doing."}
        </p>
      </section>

      {/* Videos grouped by topic */}
      <section id="videos" className="scroll-mt-20">
        {Array.from(byTopic.entries()).map(([topicId, vids]) => {
          const topic = TOPICS.find((t) => t.id === topicId);
          if (!topic) return null;
          return (
            <div key={topicId} className="mb-16">
              <header className="mb-6 flex flex-col gap-2">
                <p className="eyebrow">
                  Topic {topic.number} of {TOPICS.length}
                </p>
                <h2 className="display-md">{topic.title}</h2>
                <p className="max-w-2xl text-body">{topic.description}</p>
              </header>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {vids.map((v, i) => (
                  <VideoCard key={v.id} video={v} index={i} />
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Bottom CTA */}
      <section className="mt-16 rounded-2xl bg-ink p-8 text-on-primary sm:p-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="display-md text-on-primary">
            One last thing
          </h2>
          <p className="mt-4 text-base text-on-primary/80 sm:text-lg">
            The single best thing you can do with this list is{" "}
            <strong>watch the first video, then take one action</strong>. Any
            action. Reply to an email with AI, automate one task, build one
            toy. The point is to break the seal.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleShare}
              className="btn btn-secondary"
            >
              {shareState === "copied" ? (
                <>
                  <Check className="h-4 w-4" />
                  Link copied
                </>
              ) : (
                <>
                  <Share2 className="h-4 w-4" />
                  Share my path
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onRestart}
              className="btn btn-ghost text-on-primary hover:bg-on-primary/10"
            >
              <RotateCcw className="h-4 w-4" />
              Retake the quiz
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 border-t border-surface-strong pt-8">
        <div className="flex flex-col items-start justify-between gap-4 text-sm text-muted sm:flex-row sm:items-center">
          <p>
            A free compendium by{" "}
            <a
              href="https://pardofigueroa.org"
              className="font-medium text-ink underline-offset-4 hover:underline"
            >
              pardofigueroa.org
            </a>
            . No accounts, no tracking, no email.
          </p>
          <p>
            Videos are linked from YouTube. We do not host them.
          </p>
        </div>
      </footer>
    </div>
  );
}
