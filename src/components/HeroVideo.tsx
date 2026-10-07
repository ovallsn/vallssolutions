"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/site";

export function HeroVideo({ locale }: { locale: Locale }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const explicitlyPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const english = locale === "en";

  useEffect(() => {
    const video = videoRef.current;
    const media = video?.parentElement;
    if (!video || !media) return;

    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const network = navigator as Navigator & {
      connection?: { saveData?: boolean };
    };
    if (motionPreference.matches || network.connection?.saveData) return;

    let resumeAfterVisibility = false;
    let disposed = false;

    const start = async () => {
      if (
        disposed ||
        document.hidden ||
        motionPreference.matches ||
        explicitlyPaused.current ||
        video.src
      )
        return;
      video.src = "/assets/media/hero-paperwork.mp4";
      video.load();
      try {
        await video.play();
        if (!disposed) {
          setPlaying(true);
          setVideoReady(true);
        }
      } catch {
        video.removeAttribute("src");
        video.load();
        setPlaying(false);
      }
    };

    let observer: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer?.disconnect();
          window.setTimeout(() => void start(), 350);
        }
      });
    }

    if (observer) observer.observe(media);
    else window.setTimeout(() => void start(), 350);

    const onMotionChange = () => {
      if (motionPreference.matches) {
        setVideoReady(false);
        video.pause();
        video.removeAttribute("src");
        video.load();
        setPlaying(false);
      }
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        resumeAfterVisibility = !video.paused;
        video.pause();
      } else if (
        resumeAfterVisibility &&
        !explicitlyPaused.current &&
        !motionPreference.matches
      ) {
        resumeAfterVisibility = false;
        void video
          .play()
          .then(() => setPlaying(true))
          .catch(() => setPlaying(false));
      }
    };

    motionPreference.addEventListener("change", onMotionChange);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      disposed = true;
      observer?.disconnect();
      motionPreference.removeEventListener("change", onMotionChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      video.pause();
    };
  }, []);

  const toggle = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      explicitlyPaused.current = false;
      try {
        await video.play();
        setPlaying(true);
        setVideoReady(true);
      } catch {
        setPlaying(false);
      }
    } else {
      explicitlyPaused.current = true;
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <figure className={`hero-visual${playing ? " is-playing" : ""}`}>
      <div className="hero-media" data-hero-media>
        <video
          ref={videoRef}
          className="hero-video"
          poster="/assets/media/hero-paperwork-poster.jpg"
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          onError={() => {
            setPlaying(false);
            setVideoReady(false);
          }}
        />
        <div className="video-shade" aria-hidden="true" />
        {videoReady && (
          <button
            className="video-toggle"
            type="button"
            onClick={toggle}
            aria-label={
              playing
                ? english
                  ? "Pause background video"
                  : "Pausar vídeo de fondo"
                : english
                  ? "Resume background video"
                  : "Reanudar vídeo de fondo"
            }
          >
            {playing
              ? english
                ? "Pause video"
                : "Pausar vídeo"
              : english
                ? "Play video"
                : "Reanudar vídeo"}
          </button>
        )}
        <figcaption className="visual-caption">
          <span className="visual-caption-label">
            {english ? "LLC FORMATION" : "FORMACIÓN DE LLC"}
          </span>
          <strong>
            {english
              ? "From an idea to a U.S. company."
              : "De una idea a una empresa en EE. UU."}
          </strong>
        </figcaption>
      </div>
      <div className="visual-meta">
        <span>
          {english
            ? "One point of contact throughout the process"
            : "Un contacto directo durante el proceso"}
        </span>
      </div>
    </figure>
  );
}
