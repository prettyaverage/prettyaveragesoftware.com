"use client";
import { useEffect, useRef } from "react";
export default function DisplayControls() {
  const themeButton = useRef<HTMLButtonElement>(null);
  const motionButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: dark)");
    const labels = () => {
      themeButton.current?.setAttribute(
        "aria-label",
        document.documentElement.dataset.theme === "dark"
          ? "Switch to light mode"
          : "Switch to dark mode",
      );
      const paused = document.documentElement.dataset.motion === "paused";
      motionButton.current?.setAttribute(
        "aria-label",
        paused ? "Resume motion" : "Pause motion",
      );
      motionButton.current?.setAttribute("aria-pressed", String(paused));
    };
    const system = () => {
      let saved = "system";
      try {
        saved = localStorage.getItem("site-theme-v1") || "system";
      } catch {}
      if (saved === "system")
        document.documentElement.dataset.theme = media.matches
          ? "dark"
          : "light";
      labels();
    };
    labels();
    media.addEventListener("change", system);
    const observer = new MutationObserver(labels);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "data-motion"],
    });
    return () => {
      media.removeEventListener("change", system);
      observer.disconnect();
    };
  }, []);
  return (
    <div className="display-controls" aria-label="Display settings">
      <button
        ref={themeButton}
        className="theme-button"
        type="button"
        aria-label="Switch to dark mode"
        onClick={() => {
          const next =
            document.documentElement.dataset.theme === "dark"
              ? "light"
              : "dark";
          document.documentElement.dataset.theme = next;
          try {
            localStorage.setItem("site-theme-v1", next);
          } catch {}
        }}
      >
        <svg
          className="moon-icon"
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M20.5 14.1A8.5 8.5 0 0 1 9.9 3.5 8.5 8.5 0 1 0 20.5 14.1Z" />
        </svg>
        <svg
          className="sun-icon"
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19M5 19l1.4-1.4M17.6 6.4L19 5" />
        </svg>
      </button>
      <div className="motion-control">
        <button
          ref={motionButton}
          type="button"
          className="motion-button"
          aria-label="Pause motion"
          aria-pressed="false"
          aria-describedby="motion-hint"
          onClick={() => {
            const next =
              document.documentElement.dataset.motion === "paused"
                ? "running"
                : "paused";
            document.documentElement.dataset.motion = next;
            try {
              localStorage.setItem("site-motion-v1", next);
            } catch {}
          }}
        >
          <svg
            className="pause-icon"
            width="14"
            height="14"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M7 4v12m6-12v12" />
          </svg>
          <svg
            className="play-icon"
            width="14"
            height="14"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 4l10 6-10 6Z" />
          </svg>
        </button>
        <span id="motion-hint" role="tooltip" className="motion-tooltip">
          <span className="pause-help">Pause decorative motion</span>
          <span className="resume-help">Resume decorative motion</span>
        </span>
      </div>
    </div>
  );
}
