"use client";

import { ArrowRight, Sparkles, Compass, Layers, Telescope } from "lucide-react";

type Props = {
  onStart: () => void;
};

const HIGHLIGHTS = [
  {
    icon: Sparkles,
    title: "Five questions",
    description: "Takes about 60 seconds. No account, no email.",
  },
  {
    icon: Compass,
    title: "Curated, not exhaustive",
    description: "Hand-picked videos, in the right order, for your level.",
  },
  {
    icon: Layers,
    title: "Six topics",
    description: "From how LLMs work to what it means for your job.",
  },
  {
    icon: Telescope,
    title: "Built for non-developers",
    description: "If you can use ChatGPT on your phone, this is for you.",
  },
];

export function Hero({ onStart }: Props) {
  return (
    <div className="relative mx-auto w-full max-w-5xl animate-fade-in px-4 sm:px-6">
      {/* Decorative Background Blobs */}
      <div className="absolute top-0 left-1/2 -z-10 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 opacity-50 blur-[100px]" />
      <div className="absolute top-40 left-1/4 -z-10 h-[300px] w-[400px] -translate-x-1/2 rounded-full bg-accent/20 opacity-50 blur-[80px]" />
      <div className="flex flex-col items-center text-center">
        <span className="pill pill-accent mb-6">
          <Sparkles className="h-3 w-3" />
          A free compendium
        </span>

        <h1 className="display-2xl mx-auto max-w-4xl text-transparent bg-clip-text bg-gradient-to-br from-ink to-primary pb-2">
          From ChatGPT on your phone to understanding{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">the agents world</span>
            <span
              className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-accent/30 sm:bottom-2 sm:h-4"
              aria-hidden
            />
          </span>
          .
        </h1>

        <p className="body-lg mx-auto mt-6 max-w-2xl">
          Answer five short questions. We will give you a curated set of
          YouTube videos that takes you from where you are to a level where
          the words <em>agent</em>, <em>automation</em>, <em>loop</em>, and{" "}
          <em>RAG</em> actually mean something — and where you can start
          imagining what to do with them.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onStart}
            className="btn btn-primary btn-lg"
          >
            Start the quiz
            <ArrowRight className="h-4 w-4" />
          </button>
          <a
            href="#how-it-works"
            className="btn btn-ghost btn-lg"
          >
            How it works
          </a>
        </div>

        <p className="mt-4 text-xs text-muted">
          5 questions · 60 seconds · No signup · No tracking
        </p>
      </div>

      {/* Highlight cards */}
      <section
        id="how-it-works"
        className="mt-24 scroll-mt-20 sm:mt-32"
        aria-labelledby="how-it-works-title"
      >
        <h2 id="how-it-works-title" className="sr-only">
          How it works
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col gap-2 rounded-2xl border border-surface-strong bg-surface-card/60 backdrop-blur-xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-transform hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 text-primary ring-1 ring-primary/20">
                <Icon className="h-4 w-4" />
              </span>
              <h3 className="mt-1 text-sm font-semibold text-ink">{title}</h3>
              <p className="text-sm leading-relaxed text-body">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Curriculum preview */}
      <section className="mt-24 sm:mt-32" aria-labelledby="curriculum-title">
        <div className="mb-10 max-w-2xl">
          <p className="eyebrow mb-3">The curriculum</p>
          <h2
            id="curriculum-title"
            className="display-lg text-ink"
          >
            Six topics, ordered so it makes sense
          </h2>
          <p className="mt-4 text-base text-body">
            You will not watch every video. The quiz picks the ones that
            matter for where you are and where you want to go. Here is the
            full topic list, in order:
          </p>
        </div>

        <ol className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {[
            ["AI Fundamentals", "How LLMs work, prompting, and what ChatGPT actually is."],
            ["Agents & Autonomous AI", "Loops, chains, tool use — what an agent actually is."],
            ["Automation Platforms", "Zapier, Make, n8n — connecting the apps you already use."],
            ["Building with AI", "APIs, LangChain, vector databases, and no-code AI builders."],
            ["Work & Business Use Cases", "Real-world AI applications across marketing, ops, sales, and support."],
            ["Philosophy & Implications", "AI safety, jobs, society, and where this is all going."],
          ].map(([title, description], i) => (
            <li
              key={title}
              className="group flex items-start gap-4 rounded-xl border border-surface-strong bg-surface-card/60 backdrop-blur-md p-5 transition-all hover:border-primary/30 hover:shadow-lg hover:-translate-y-1"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent font-mono text-sm font-semibold text-on-primary shadow-md">
                {i + 1}
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-semibold text-ink">{title}</h3>
                <p className="text-sm leading-relaxed text-body">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Final CTA */}
      <section className="mt-24 text-center sm:mt-32">
        <h2 className="display-md mx-auto max-w-xl text-ink">
          Ready to see your path?
        </h2>
        <p className="body-lg mx-auto mt-3 max-w-md">
          Five questions, one minute, and you will have a plan.
        </p>
        <button
          type="button"
          onClick={onStart}
          className="btn btn-primary btn-lg mt-8"
        >
          Start the quiz
          <ArrowRight className="h-4 w-4" />
        </button>
      </section>

      {/* Footer */}
      <footer className="mt-24 border-t border-surface-strong pt-8 sm:mt-32">
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
          <p>Videos are linked from YouTube. We do not host them.</p>
        </div>
      </footer>
    </div>
  );
}
