"use client";

import { useRef, useState } from "react";

const film = "/studio/studio-film.mp4";

export function StudioFilm({ watch, close, fallback }: { watch: string; close: string; fallback: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [playing, setPlaying] = useState(false);

  return (
    <>
      <button className="film-trigger" type="button" onClick={() => {
        dialog.current?.showModal();
        setPlaying(true);
      }}>
        <span className="play-icon" aria-hidden="true">▶</span>{watch}
      </button>
      <dialog className="film-dialog" aria-label={watch} ref={dialog} onClose={() => setPlaying(false)}>
        <div className="film-dialog-bar">
          <span>{watch}</span>
          <form method="dialog"><button className="film-close" type="submit" aria-label={close}>×</button></form>
        </div>
        {playing && (
          <video controls autoPlay playsInline>
            <source src={film} type="video/mp4" />
            <a href={film}>{fallback}</a>
          </video>
        )}
      </dialog>
    </>
  );
}
