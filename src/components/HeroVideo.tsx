"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/** Element (rendered by Hero) that the pause/play button is placed into. */
export const VIDEO_CONTROL_ID = "hero-video-control";

/**
 * Background film for the hero.
 *
 * - Starts only when appropriate: never for people who prefer reduced motion
 *   or have data-saver on (they see the still poster, and can press play).
 * - `preload="none"` means nothing is downloaded until playback starts.
 * - Pauses automatically while the hero is scrolled out of view.
 * - Always offers a visible pause/play control (WCAG 2.2.2).
 */
export default function HeroVideo({ poster, posterAlt }: { poster: StaticImageData; posterAlt: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [slot, setSlot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setSlot(document.getElementById(VIDEO_CONTROL_ID));
    const video = videoRef.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduce || saveData) {
      userPaused.current = true;
      return;
    }
    video.play().catch(() => setPlaying(false));

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) video.pause();
      else if (!userPaused.current) video.play().catch(() => {});
    });
    io.observe(video);
    return () => io.disconnect();
  }, []);

  function toggle() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => {});
    } else {
      userPaused.current = true;
      video.pause();
    }
  }

  const control = (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? "Pause background video" : "Play background video"}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-paper/40 text-paper transition-colors hover:border-paper hover:bg-paper hover:text-brand-deep"
    >
      {playing ? (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <rect x="6.5" y="5" width="3.5" height="14" rx="1" />
          <rect x="14" y="5" width="3.5" height="14" rx="1" />
        </svg>
      ) : (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="ml-0.5 h-4 w-4" fill="currentColor">
          <path d="M7 4.8v14.4a.8.8 0 0 0 1.2.7l11.5-7.2a.8.8 0 0 0 0-1.4L8.2 4.1A.8.8 0 0 0 7 4.8z" />
        </svg>
      )}
    </button>
  );

  return (
    <>
      <div className="absolute inset-0 overflow-hidden">
        <div className="hero-drift absolute inset-0">
          <Image src={poster} alt={posterAlt} fill preload placeholder="blur" sizes="100vw" className="object-cover" />
          <video
            ref={videoRef}
            aria-hidden="true"
            muted
            loop
            playsInline
            preload="none"
            disablePictureInPicture
            onPlaying={() => {
              setPlaying(true);
              setReady(true);
            }}
            onPause={() => setPlaying(false)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ${ready ? "opacity-100" : "opacity-0"}`}
          >
            <source src="/video/hero-1080.webm" type="video/webm" media="(min-width: 768px)" />
            <source src="/video/hero-1080.mp4" type="video/mp4" media="(min-width: 768px)" />
            <source src="/video/hero-720.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      {slot && createPortal(control, slot)}
    </>
  );
}
