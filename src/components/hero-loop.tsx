"use client";

import { useEffect, useRef } from "react";

type Clip = { src: string; poster: string };

const phone = "(max-width: 760px)";

/**
 * Silent background loop for the home hero: a landscape cut for wide screens and a
 * vertical cut for phones. The browser picks the right <source>, so a phone never
 * downloads the landscape file. Stays on the poster frame when the visitor prefers reduced motion.
 */
export function HeroLoop({ wide, tall }: { wide: Clip; tall: Clip }) {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const small = window.matchMedia(phone);
    const apply = () => {
      element.poster = small.matches ? tall.poster : wide.poster;
      if (reduce.matches) element.pause();
      else element.play().catch(() => {});
    };
    apply();
    reduce.addEventListener("change", apply);
    return () => reduce.removeEventListener("change", apply);
  }, [tall.poster, wide.poster]);

  return (
    <video ref={video} className="hero-loop" autoPlay muted loop playsInline preload="auto" aria-hidden="true">
      {/* Wide first: a browser that ignores `media` falls back to the landscape cut. */}
      <source media="(min-width: 761px)" src={wide.src} type="video/mp4" />
      <source src={tall.src} type="video/mp4" />
    </video>
  );
}
