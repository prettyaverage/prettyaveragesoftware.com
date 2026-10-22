import type { ComponentProps } from "react";
export default function ExternalLink({
  children,
  className = "",
  ...props
}: ComponentProps<"a">) {
  return (
    <a {...props} className={`external-link ${className}`}>
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
          fill="currentColor"
        />
      </svg>
      <span>{children}</span>
    </a>
  );
}
