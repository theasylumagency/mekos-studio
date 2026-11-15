"use client";

import { useEffect, useRef } from "react";

/** Silent background loop for the home hero. Stays on the poster frame when the visitor prefers reduced motion. */
export function HeroLoop({ src, poster }: { src: string; poster: string }) {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (reduce.matches) element.pause();
      else element.play().catch(() => {});
    };
    apply();
    reduce.addEventListener("change", apply);
    return () => reduce.removeEventListener("change", apply);
  }, []);

  return (
    <video ref={video} className="hero-loop" autoPlay muted loop playsInline preload="auto" poster={poster} aria-hidden="true">
      <source src={src} type="video/mp4" />
    </video>
  );
}
