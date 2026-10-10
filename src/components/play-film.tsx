"use client";

import { useRef } from "react";
import type { HeroVideo } from "@/content/home";
import { track } from "@/lib/analytics";

/** Reference-style "Play film" pill that opens the full film in a modal player. */
export function PlayFilm({ film, className }: { film: HeroVideo; className?: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const open = () => {
    dialogRef.current?.showModal();
    void videoRef.current?.play();
    track("film_play");
  };
  const close = () => {
    videoRef.current?.pause();
    dialogRef.current?.close();
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        className={`group inline-flex min-h-12 items-center gap-3 rounded-full bg-white/90 px-6 text-[0.8125rem] font-semibold tracking-[0.08em] text-navy uppercase backdrop-blur-sm transition-colors hover:bg-white ${className ?? ""}`}
      >
        <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden="true">
          <path d="M4 2.5v11l9-5.5z" fill="currentColor" />
        </svg>
        Play film
      </button>
      <dialog
        ref={dialogRef}
        onCancel={close}
        onClick={(e) => e.target === e.currentTarget && close()}
        aria-label="MAR Technology film"
        className="m-auto w-[min(92vw,80rem)] bg-transparent p-0 backdrop:bg-carbon/85"
      >
        <video ref={videoRef} controls playsInline preload="none" className="aspect-video w-full bg-black">
          <source src={film.src} type={film.type} />
        </video>
        <button type="button" onClick={close} className="mt-4 ml-auto block rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-navy">
          Close
        </button>
      </dialog>
    </>
  );
}
