"use client";

import { useState, useCallback, useEffect } from "react";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { QUESTIONS } from "@/lib/quiz";
import type { QuizAnswers } from "@/types";

type Props = {
  onComplete: (answers: QuizAnswers) => void;
  onCancel: () => void;
};

const INITIAL: QuizAnswers = {
  experience: 0 as QuizAnswers["experience"],
  agentFamiliarity: 0 as QuizAnswers["agentFamiliarity"],
  goal: 0 as QuizAnswers["goal"],
  context: 0 as QuizAnswers["context"],
  time: 0 as QuizAnswers["time"],
};

export function Quiz({ onComplete, onCancel }: Props) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>(INITIAL);

  const current = QUESTIONS[step];
  const isLast = step === QUESTIONS.length - 1;
  const currentAnswer = answers[current.id];
  const canAdvance = currentAnswer !== undefined && currentAnswer !== null;

  const handleSelect = useCallback(
    (value: number) => {
      setAnswers((prev) => ({ ...prev, [current.id]: value as never }));
    },
    [current.id]
  );

  const handleNext = useCallback(() => {
    if (!canAdvance) return;
    if (isLast) {
      onComplete(answers);
    } else {
      setStep((s) => s + 1);
    }
  }, [canAdvance, isLast, answers, onComplete]);

  const handleBack = useCallback(() => {
    if (step === 0) {
      onCancel();
    } else {
      setStep((s) => s - 1);
    }
  }, [step, onCancel]);

  // Keyboard: 1-9 to select, Enter to advance, Backspace to go back
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" && canAdvance) {
        e.preventDefault();
        handleNext();
        return;
      }
      if (e.key === "Backspace" && (e.metaKey || e.altKey)) {
        e.preventDefault();
        handleBack();
        return;
      }
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= current.options.length) {
        handleSelect(current.options[num - 1].value);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [canAdvance, handleNext, handleBack, current.options, handleSelect]);

  const progress = ((step + 1) / QUESTIONS.length) * 100;

  return (
    <div
      className="mx-auto w-full max-w-2xl animate-fade-in px-4 sm:px-6"
      role="region"
      aria-label="Quiz"
    >
      <div className="mb-6 flex items-center justify-between">
        <button
          type="button"
          onClick={handleBack}
          className="btn btn-ghost"
          aria-label={step === 0 ? "Cancel quiz" : "Go to previous question"}
        >
          <ArrowLeft className="h-4 w-4" />
          {step === 0 ? "Cancel" : "Back"}
        </button>
        <div className="text-sm text-muted">
          <span className="font-medium text-ink">{step + 1}</span>
          <span className="mx-1 text-muted">of</span>
          <span>{QUESTIONS.length}</span>
        </div>
      </div>

      <div
        className="mb-8 h-1 w-full overflow-hidden rounded-full bg-surface-card"
        role="progressbar"
        aria-valuenow={step + 1}
        aria-valuemin={1}
        aria-valuemax={QUESTIONS.length}
        aria-label={`Question ${step + 1} of ${QUESTIONS.length}`}
      >
        <div
          className="h-full rounded-full bg-ink transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div
        key={current.id}
        className="rounded-2xl border border-surface-strong bg-surface-card p-6 shadow-sm sm:p-10 animate-fade-in"
      >
        <p className="eyebrow mb-3">
          {current.eyebrow} · Question {current.number}
        </p>
        <h2 className="display-md mb-2">{current.question}</h2>
        {current.helper && (
          <p className="mb-8 text-sm text-muted">{current.helper}</p>
        )}
        {!current.helper && <div className="mb-6" />}

        <fieldset>
          <legend className="sr-only">{current.question}</legend>
          <div className="flex flex-col gap-3" role="radiogroup">
            {current.options.map((opt, i) => {
              const isSelected = currentAnswer === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => handleSelect(opt.value)}
                  className={`group relative flex w-full items-start gap-4 rounded-xl border-2 p-4 text-left transition-all sm:p-5 ${
                    isSelected
                      ? "border-ink bg-canvas shadow-sm"
                      : "border-surface-strong bg-canvas hover:border-ink/30 hover:bg-surface-soft"
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                      isSelected
                        ? "border-ink bg-ink text-on-primary"
                        : "border-surface-strong bg-canvas text-transparent"
                    }`}
                    aria-hidden
                  >
                    {isSelected ? (
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    ) : (
                      <span className="text-xs font-medium text-muted group-hover:text-ink">
                        {i + 1}
                      </span>
                    )}
                  </span>
                  <span className="flex flex-col gap-1">
                    <span
                      className={`text-base font-medium leading-snug ${
                        isSelected ? "text-ink" : "text-ink"
                      }`}
                    >
                      {opt.label}
                    </span>
                    {opt.description && (
                      <span className="text-sm leading-relaxed text-muted">
                        {opt.description}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="hidden text-xs text-muted sm:block">
          Press <kbd className="rounded bg-surface-card px-1.5 py-0.5 font-mono text-[10px]">1-{current.options.length}</kbd> to choose,{" "}
          <kbd className="rounded bg-surface-card px-1.5 py-0.5 font-mono text-[10px]">Enter</kbd> to continue
        </p>
        <p className="text-xs text-muted sm:hidden">Tap to choose</p>
        <button
          type="button"
          onClick={handleNext}
          disabled={!canAdvance}
          className="btn btn-primary btn-lg ml-auto"
        >
          {isLast ? "See my path" : "Continue"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
