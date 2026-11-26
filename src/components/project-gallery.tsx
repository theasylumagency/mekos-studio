"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Project = { src: string; width: number; height: number; caption: string };
type Labels = { open: string; close: string; previous: string; next: string };

/** Masonry of finished projects; each photo opens full screen with arrow-key and swipe navigation. */
export function ProjectGallery({ projects, labels }: { projects: Project[]; labels: Labels }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [current, setCurrent] = useState(0);
  const touchX = useRef<number | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  const show = useCallback((index: number) => setCurrent((index + projects.length) % projects.length), [projects.length]);

  function open(index: number, button: HTMLButtonElement) {
    opener.current = button;
    show(index);
    dialog.current?.showModal();
  }

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") setCurrent((index) => (index + 1) % projects.length);
      if (event.key === "ArrowLeft") setCurrent((index) => (index - 1 + projects.length) % projects.length);
    };
    element.addEventListener("keydown", onKey);
    return () => element.removeEventListener("keydown", onKey);
  }, [projects.length]);

  const project = projects[current];

  return (
    <>
      <ul className="project-masonry">
        {projects.map((item, index) => (
          <li key={item.src}>
            <button type="button" className="project-tile" onClick={(event) => open(index, event.currentTarget)} aria-label={`${labels.open}: ${item.caption}`}>
              <Image src={item.src} alt={item.caption} width={item.width} height={item.height}
                sizes="(max-width: 620px) 50vw, (max-width: 1040px) 33vw, 440px" />
            </button>
            <p className="project-caption">{item.caption}</p>
          </li>
        ))}
      </ul>
      <dialog ref={dialog} className="project-viewer" aria-label={project.caption}
        onClick={(event) => { if (event.target === dialog.current) dialog.current?.close(); }}
        onClose={() => opener.current?.focus({ preventScroll: true })}
        onTouchStart={(event) => { touchX.current = event.touches[0].clientX; }}
        onTouchEnd={(event) => {
          if (touchX.current === null) return;
          const delta = event.changedTouches[0].clientX - touchX.current;
          if (Math.abs(delta) > 50) show(current + (delta < 0 ? 1 : -1));
          touchX.current = null;
        }}>
        <figure>
          <Image key={project.src} src={project.src} alt={project.caption} width={project.width} height={project.height} sizes="100vw" />
          <figcaption>
            <span>{project.caption}</span>
            <span className="project-count">{current + 1} / {projects.length}</span>
          </figcaption>
        </figure>
        <button type="button" className="viewer-button viewer-close" onClick={() => dialog.current?.close()} aria-label={labels.close}>×</button>
        <button type="button" className="viewer-button viewer-prev" onClick={() => show(current - 1)} aria-label={labels.previous}>←</button>
        <button type="button" className="viewer-button viewer-next" onClick={() => show(current + 1)} aria-label={labels.next}>→</button>
      </dialog>
    </>
  );
}
