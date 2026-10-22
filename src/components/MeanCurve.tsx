import { CURVE_PATH } from "./curve-geometry";
import CurveControl from "./CurveControl";
export default function MeanCurve() {
  return (
    <div className="curve">
      <svg
        className="curve-art"
        viewBox="0 0 800 340"
        preserveAspectRatio="none"
        role="img"
        aria-labelledby="curve-title curve-description"
      >
        <title id="curve-title">Finding the middle</title>
        <desc id="curve-description">
          A balanced bell curve. Points follow the line to renew each other.
        </desc>
        <defs>
          <linearGradient id="curve-fill" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="currentColor" stopOpacity=".045" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
          <mask
            id="curve-shimmer-mask"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="800"
            height="340"
          >
            <path d={CURVE_PATH} fill="none" stroke="white" strokeWidth="3" />
          </mask>
          <linearGradient id="curve-shimmer">
            <stop stopColor="white" stopOpacity="0" />
            <stop offset=".5" stopColor="white" stopOpacity=".85" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={CURVE_PATH + " L800 340H0Z"} fill="url(#curve-fill)" />
        <path
          d={CURVE_PATH}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          vectorEffect="non-scaling-stroke"
        />
        <g mask="url(#curve-shimmer-mask)">
          <g className="curve-shimmer">
            <rect
              x="-160"
              y="0"
              width="160"
              height="340"
              fill="url(#curve-shimmer)"
            />
          </g>
        </g>
      </svg>
      <CurveControl />
    </div>
  );
}
