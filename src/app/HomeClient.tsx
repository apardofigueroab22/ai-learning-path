"use client";

import { useState, useCallback, useMemo } from "react";
import { Hero } from "@/components/Hero";
import { Quiz } from "@/components/Quiz";
import { Results } from "@/components/Results";
import { decodePath, encodeAnswers } from "@/lib/share";
import { getPathFor } from "@/lib/paths";
import type { QuizAnswers, Path, QuizState, ExperienceLevel } from "@/types";

type Props = {
  initialPathCode: string | null;
};

export function HomeClient({ initialPathCode }: Props) {
  // Compute the initial state from the URL (server-rendered, no flash)
  const initial = useMemo(() => {
    if (!initialPathCode) return null;
    const decoded = decodePath(initialPathCode);
    if (!decoded) return null;
    // Build a synthetic answers object whose derivations match the URL.
    // Q1 (experience): 0, 1, 2
    // Q2 (agentFamiliarity): 0, 1, 2, 3
    // Sum: 0–2 newcomer, 3–4 intermediate, 5+ builder
    // Q3 (goal): 0..4 → personal, work, builder, informed, curious
    // Q5 (time): 0, 1, 2 → shallow, medium, deep
    const goalMap = {
      personal: 0,
      work: 1,
      builder: 2,
      informed: 3,
      curious: 4,
    } as const;
    const timeMap = { shallow: 0, medium: 1, deep: 2 } as const;
    const levelAnswers: Record<ExperienceLevel, { exp: 0 | 1 | 2; af: 0 | 1 | 2 | 3 }> = {
      newcomer: { exp: 0, af: 0 },
      intermediate: { exp: 2, af: 2 },
      builder: { exp: 2, af: 3 },
    };
    const la = levelAnswers[decoded.level];
    const a: QuizAnswers = {
      experience: la.exp,
      agentFamiliarity: la.af,
      goal: goalMap[decoded.track],
      context: 0,
      time: timeMap[decoded.depth],
    };
    return { answers: a, path: getPathFor(a) };
  }, [initialPathCode]);

  const [state, setState] = useState<QuizState>(
    initial ? "results" : "intro"
  );
  const [answers, setAnswers] = useState<QuizAnswers | null>(
    initial?.answers ?? null
  );
  const [path, setPath] = useState<Path | null>(initial?.path ?? null);

  const updateUrl = useCallback((code: string | null) => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (code) {
      url.searchParams.set("p", code);
    } else {
      url.searchParams.delete("p");
    }
    window.history.replaceState({}, "", url.toString());
  }, []);

  const handleStart = useCallback(() => {
    setAnswers(null);
    setPath(null);
    setState("quiz");
    updateUrl(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [updateUrl]);

  const handleComplete = useCallback(
    (a: QuizAnswers) => {
      setAnswers(a);
      setState("calculating");
      // Short beat to show the "thinking" UI
      setTimeout(() => {
        const p = getPathFor(a);
        setPath(p);
        setState("results");
        const code = encodeAnswers(a);
        updateUrl(code);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 900);
    },
    [updateUrl]
  );

  const handleRestart = useCallback(() => {
    setAnswers(null);
    setPath(null);
    setState("intro");
    updateUrl(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [updateUrl]);

  return (
    <main id="main" className="min-h-dvh">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-20 lg:py-24">
        {state === "intro" && <Hero onStart={handleStart} />}
        {state === "quiz" && (
          <Quiz onComplete={handleComplete} onCancel={handleRestart} />
        )}
        {state === "calculating" && <Calculating />}
        {state === "results" && path && answers && (
          <Results path={path} answers={answers} onRestart={handleRestart} />
        )}
      </div>
    </main>
  );
}

function Calculating() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center px-4 py-20 text-center animate-fade-in">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 animate-ping rounded-full bg-ink/10" />
        <div className="absolute inset-2 rounded-full bg-ink/20" />
        <div className="absolute inset-3 animate-pulse rounded-full bg-ink" />
      </div>
      <p className="mt-6 text-base font-medium text-ink">
        Building your path...
      </p>
      <p className="mt-1 text-sm text-muted">
        Matching videos to where you are and where you want to go.
      </p>
    </div>
  );
}
