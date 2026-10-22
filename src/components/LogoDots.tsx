export default function LogoDots() {
  return (
    <svg
      className="logo-dots"
      viewBox="0 0 160 32"
      width="90"
      height="18"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="2.5">
        {[16, 48, 80, 112, 144].map((x, i) => (
          <circle
            key={x}
            className={i === 0 ? "dot-left" : i === 4 ? "dot-right" : undefined}
            cx={x}
            cy="16"
            r="10"
            fill={i === 2 ? "none" : "currentColor"}
          />
        ))}
      </g>
    </svg>
  );
}
