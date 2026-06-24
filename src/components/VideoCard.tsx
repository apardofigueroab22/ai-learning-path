"use client";

import { useState } from "react";
import { Play, ExternalLink, Clock } from "lucide-react";
import type { Video } from "@/types";

type Props = {
  video: Video;
  index: number;
};

export function VideoCard({ video, index }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const thumbnailUrl = `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`;

  return (
    <article
      className="group relative flex flex-col gap-4 rounded-3xl border border-surface-strong bg-surface-card/60 backdrop-blur-md p-4 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_8px_30px_rgb(139,92,246,0.12)] hover:-translate-y-1 sm:p-5"
      aria-label={`Video ${index + 1}: ${video.title}`}
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-ink/5">
        {isPlaying ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
            loading="lazy"
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            className="group/btn absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors hover:bg-ink/10"
            aria-label={`Play ${video.title}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbnailUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-ink/40 via-ink/10 to-transparent" />
            <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-canvas text-ink shadow-lg transition-transform group-hover/btn:scale-110 sm:h-16 sm:w-16">
              <Play className="h-5 w-5 translate-x-0.5 fill-ink sm:h-6 sm:w-6" />
            </span>
            <span className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1 rounded-md bg-ink/85 px-2 py-1 text-xs font-medium text-canvas backdrop-blur-sm">
              <Clock className="h-3 w-3" />
              {video.duration}
            </span>
          </button>
        )}
      </div>

      <div className="flex flex-col gap-2 px-1 pb-1">
        <div className="flex items-center gap-2 text-xs text-muted">
          <span className="font-medium uppercase tracking-wider text-muted">
            #{index + 1}
          </span>
          <span aria-hidden>·</span>
          <span className="truncate">{video.channel}</span>
        </div>
        <h3 className="text-base font-semibold leading-snug text-ink sm:text-lg">
          {video.title}
        </h3>
        <p className="text-sm leading-relaxed text-body">
          {video.description}
        </p>
        <div className="mt-2 rounded-lg border border-accent/20 bg-accent-soft/60 px-3 py-2.5">
          <p className="text-xs font-medium uppercase tracking-wider text-accent-fg">
            Why watch this
          </p>
          <p className="mt-1 text-sm leading-relaxed text-body">
            {video.whyItMatters}
          </p>
        </div>
        <a
          href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-ink underline-offset-4 hover:underline focus-visible:underline"
        >
          Open on YouTube
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
}
