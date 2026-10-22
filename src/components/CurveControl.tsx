"use client";
import { useEffect, useRef } from "react";
import { curveY } from "./curve-geometry";
const INITIAL = 4.4;
const FLIGHT = 1.85;
const ARRIVAL = 4.4;
const ease = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);
export default function CurveControl() {
  const root = useRef<HTMLDivElement>(null);
  const resident = useRef<SVGGElement>(null);
  const incoming = useRef<SVGGElement>(null);
  const flight = useRef<SVGCircleElement>(null);
  const pulse = useRef<SVGPathElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const target = useRef(400);
  const ready = useRef(false);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0,
      last = 0,
      elapsed = 0,
      x = 0,
      velocity = 0,
      previousCycle = -1,
      previousMerge = -1,
      flashAge = 10,
      visible = true;
    const place = (
      node: SVGGElement | null,
      position: number,
      y = curveY(position),
    ) =>
      node?.setAttribute("transform", `translate(${position - 400} ${y - 65})`);
    let bounds = { left: 0, top: 0, width: 800, height: 340 };
    let source = { x: 64, y: 36, radius: 6 };
    let landing = 0;
    let launchRight = false;
    const measure = () => {
      if (root.current) bounds = root.current.getBoundingClientRect();
      const dot = document.querySelector(
        launchRight ? ".logo-dots .dot-right" : ".logo-dots .dot-left",
      );
      const logo = document.querySelector(".logo-dots");
      if (dot && logo) {
        const rect = dot.getBoundingClientRect();
        source = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          radius: (logo.getBoundingClientRect().width / 160) * 11.25,
        };
      }
      if (launchRight) {
        // The right-hand dot is generated off-screen, above the header.
        source.x = bounds.left + bounds.width - (source.x - bounds.left);
        source = { ...source, y: -24, radius: 6 };
      }
      landing = Math.max(
        0,
        Math.min(800, ((source.x - bounds.left) / bounds.width) * 800),
      );
    };
    const fly = (progress: number, land: number) => {
      const t = Math.max(0, Math.min(1, progress));
      const endY = bounds.top + (curveY(land) / 340) * bounds.height;
      // Accelerating vertical fall, two diminishing rebounds, then a quiet rest.
      const fallEnd = 0.53;
      let py = endY;
      if (t < fallEnd) py = source.y + (endY - source.y) * (t / fallEnd) ** 2;
      else if (t < 0.79) py -= 27 * Math.sin(((t - fallEnd) / 0.26) * Math.PI);
      else if (t < 0.94) py -= 7 * Math.sin(((t - 0.79) / 0.15) * Math.PI);
      const px = source.x;
      const u = Math.min(1, t / fallEnd);
      if (flight.current) {
        flight.current.style.opacity = "1";
        flight.current.setAttribute("cx", String(px));
        flight.current.setAttribute("cy", String(py));
        flight.current.setAttribute(
          "r",
          String(source.radius + (6 - source.radius) * u),
        );
      }
    };
    const hideFlight = () => {
      if (flight.current) flight.current.style.opacity = "0";
    };
    const setReady = () => {
      ready.current = true;
      if (input.current?.disabled) input.current.disabled = false;
    };
    measure();
    const resize = new ResizeObserver(measure);
    if (root.current) resize.observe(root.current);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, { passive: true });
    document.documentElement.dataset.logoPop = "left";
    const draw = (time: number) => {
      const dt = Math.min((time - (last || time)) / 1000, 0.035);
      last = time;
      const paused =
        media.matches || document.documentElement.dataset.motion === "paused";
      if (visible && !document.hidden && !paused) {
        elapsed += dt;
        flashAge += dt;
        if (elapsed < INITIAL) {
          if (elapsed < FLIGHT) {
            if (resident.current) resident.current.style.opacity = "0";
            fly(elapsed / FLIGHT, landing);
          } else {
            hideFlight();
            if (resident.current) resident.current.style.opacity = "1";
            x =
              landing +
              (400 - landing) * ease((elapsed - FLIGHT) / (INITIAL - FLIGHT));
            place(resident.current, x);
          }
          if (elapsed > 1.1) delete document.documentElement.dataset.logoPop;
        } else {
          if (!ready.current) {
            x = 400;
            setReady();
            flashAge = 0;
          }
          const cycle = Math.floor((elapsed - INITIAL) / 9);
          const age = (elapsed - INITIAL) % 9;
          const active = age >= 3 && age < 3 + ARRIVAL;
          const right = cycle % 2 === 0;
          const fromLogo = true;
          if (active && previousCycle !== cycle) {
            previousCycle = cycle;
            launchRight = right;
            measure();
            document.documentElement.dataset.logoPop = right ? "right" : "left";
          }
          if (age > 4.1 || age < 3)
            delete document.documentElement.dataset.logoPop;
          // Keep the resident spring alive during renewal: never snap it to a separate mean.
          velocity += ((target.current - x) * 30 - velocity * 8.5) * dt;
          x = Math.max(40, Math.min(760, x + velocity * dt));
          place(resident.current, x);
          if (incoming.current) {
            incoming.current.style.opacity = active ? "1" : "0";
            if (active) {
              const ageIn = age - 3;
              if (fromLogo && ageIn < FLIGHT) {
                incoming.current.style.opacity = "0";
                fly(ageIn / FLIGHT, landing);
              } else {
                hideFlight();
                const progress = fromLogo
                  ? (ageIn - FLIGHT) / (ARRIVAL - FLIGHT)
                  : ageIn / ARRIVAL;
                const start = landing;
                place(incoming.current, start + (x - start) * ease(progress));
                if (resident.current)
                  resident.current.style.opacity = String(
                    1 - Math.max(0, (progress - 0.91) / 0.09),
                  );
              }
            } else {
              hideFlight();
              if (resident.current) resident.current.style.opacity = "1";
            }
          }
          if (age >= 3 + ARRIVAL && previousMerge !== cycle) {
            previousMerge = cycle;
            flashAge = 0;
          }
        }
        if (pulse.current) {
          pulse.current.setAttribute(
            "transform",
            `translate(${x - 400} ${curveY(x) - 65})`,
          );
          const swell = 1 - (1 - Math.min(flashAge / 1.1, 1)) ** 3;
          pulse.current.setAttribute("stroke-width", `${12 + swell * 34}`);
          pulse.current.style.opacity = `${(1 - swell) * 0.2}`;
        }
      } else if (paused) {
        x = target.current;
        velocity = 0;
        place(resident.current, x);
        if (!ready.current) elapsed = INITIAL;
        hideFlight();
        if (resident.current) resident.current.style.opacity = "1";
        delete document.documentElement.dataset.logoPop;
        setReady();
        incoming.current?.setAttribute("style", "opacity:0");
        if (pulse.current) pulse.current.style.opacity = "0";
      }
      if (!visible || document.hidden) hideFlight();
      frame = requestAnimationFrame(draw);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      last = 0;
    });
    if (root.current) observer.observe(root.current);
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resize.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure);
      delete document.documentElement.dataset.logoPop;
    };
  }, []);
  return (
    <div className="curve-control" ref={root}>
      <svg className="logo-flight" aria-hidden="true">
        <circle
          ref={flight}
          cx="0"
          cy="0"
          r="6"
          fill="currentColor"
          opacity="0"
        />
      </svg>
      <svg viewBox="0 0 800 340" preserveAspectRatio="none" aria-hidden="true">
        <path
          ref={pulse}
          d="M400 65h.01"
          stroke="currentColor"
          strokeWidth="12"
          strokeLinecap="round"
          opacity="0"
          vectorEffect="non-scaling-stroke"
        />
        <g ref={resident} transform="translate(-400 229.77)" opacity="0">
          <path
            d="M400 65h.01"
            stroke="currentColor"
            strokeWidth="28"
            strokeOpacity=".08"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M400 65h.01"
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </g>
        <g ref={incoming} opacity="0">
          <path
            d="M400 65h.01"
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      </svg>
      <input
        ref={input}
        type="range"
        min="0"
        max="800"
        step="4"
        defaultValue="400"
        disabled
        aria-label="Explore the bell curve"
        onChange={(event) => {
          if (ready.current)
            target.current = 400 + (Number(event.target.value) - 400) * 0.12;
        }}
        onPointerMove={(event) => {
          if (
            ready.current &&
            event.pointerType === "mouse" &&
            !event.buttons
          ) {
            const bounds = event.currentTarget.getBoundingClientRect();
            const pos = ((event.clientX - bounds.left) / bounds.width) * 800;
            target.current =
              400 + (Math.max(0, Math.min(800, pos)) - 400) * 0.12;
          }
        }}
        onPointerLeave={() => {
          target.current = 400;
        }}
        onBlur={() => {
          target.current = 400;
          if (input.current) input.current.value = "400";
        }}
      />
    </div>
  );
}
