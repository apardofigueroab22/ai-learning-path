"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { Hero } from "@/components/Hero";
import { Quiz } from "@/components/Quiz";
import { Results } from "@/components/Results";
import { decodePath, encodeAnswers } from "@/lib/share";
import { getPathFor } from "@/lib/paths";
import type { QuizAnswers, Path, QuizState, ExperienceLevel } from "@/types";
import { useQueryState } from "nuqs";

type Props = {
  initialPathCode: string | null;
};

export function HomeClient({ initialPathCode }: Props) {
  const [pathCode, setPathCode] = useQueryState("p", { defaultValue: initialPathCode ?? "" });

  const initial = useMemo(() => {
    if (!pathCode) return null;
    const decoded = decodePath(pathCode);
    if (!decoded) return null;
    
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
  }, [pathCode]);

  const [state, setState] = useState<QuizState>(
    initial ? "results" : "intro"
  );
  const [answers, setAnswers] = useState<QuizAnswers | null>(
    initial?.answers ?? null
  );
  const [path, setPath] = useState<Path | null>(initial?.path ?? null);

  const handleStart = useCallback(() => {
    setAnswers(null);
    setPath(null);
    setState("quiz");
    setPathCode(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [setPathCode]);

  const handleComplete = useCallback(
    (a: QuizAnswers) => {
      setAnswers(a);
      setState("calculating");
      
      setTimeout(() => {
        const p = getPathFor(a);
        setPath(p);
        setState("results");
        const code = encodeAnswers(a);
        setPathCode(code);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 1500); // slightly longer to allow text to cycle
    },
    [setPathCode]
  );

  const handleRestart = useCallback(() => {
    setAnswers(null);
    setPath(null);
    setState("intro");
    setPathCode(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [setPathCode]);

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
  const [text, setText] = useState("Analyzing your experience...");
  
  useEffect(() => {
    const timer1 = setTimeout(() => setText("Matching to tracks..."), 500);
    const timer2 = setTimeout(() => setText("Building your personalized path..."), 1000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center px-4 py-20 text-center animate-fade-in">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 animate-ping rounded-full bg-ink/10" />
        <div className="absolute inset-2 rounded-full bg-ink/20" />
        <div className="absolute inset-3 animate-pulse rounded-full bg-ink" />
      </div>
      <p className="mt-6 text-base font-medium text-ink transition-opacity duration-300">
        {text}
      </p>
      <p className="mt-1 text-sm text-muted">
        Curating videos tailored to your goals.
      </p>
    </div>
  );
}
