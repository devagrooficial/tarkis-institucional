/**
 * Logo component — Tarkis brand mark + wordmark
 * Variants:
 *   white    → white mark + white text (for dark backgrounds)
 *   dark     → dark mark + dark text   (for light backgrounds)
 *   gradient → gradient mark + dark text (for light backgrounds, full brand)
 */

interface LogoProps {
  variant?: 'white' | 'dark' | 'gradient';
  /** Controls the mark height in px; text scales proportionally */
  height?: number;
  /** Show only the mark (no wordmark) */
  markOnly?: boolean;
  className?: string;
}

export default function Logo({
  variant = 'white',
  height = 36,
  markOnly = false,
  className = '',
}: LogoProps) {
  const markH   = height;
  const markW   = markH * (62 / 82); // mark natural aspect ratio ≈ 0.756
  const gap     = markH * 0.28;
  const fontSize = markH * 0.72;
  const textY   = markH * 0.76;
  const wordmarkW = markH * 2.4;
  const totalW  = markOnly ? markW : markW + gap + wordmarkW;

  const markFill = variant === 'gradient' ? 'url(#tarkis-grad)' : variant === 'dark' ? '#0A2E36' : 'white';
  const textFill = variant === 'dark' ? '#0A2E36' : 'white';

  return (
    <svg
      viewBox={`0 0 ${totalW} ${markH}`}
      height={markH}
      width={totalW}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Tarkis"
      role="img"
      className={className}
    >
      {variant === 'gradient' && (
        <defs>
          <linearGradient id="tarkis-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#00C4AF" />
            <stop offset="45%"  stopColor="#00A896" />
            <stop offset="100%" stopColor="#0A3D4A" />
          </linearGradient>
        </defs>
      )}

      {/* ── Mark ──────────────────────────────────────── */}
      {/*
         The Tarkis mark is made of connected rounded modules:
         sq_tl (top-left)  ── bridge ──  sq_tr (top-right, raised)
               │ bridge_v
         main (large center rect)  ── bridge_r ── sat (right satellite)
               │ overlap
         base (wide bottom bar, extends right)
      */}
      <g transform={`scale(${markH / 82})`}>
        {/* top-left node */}
        <rect x="0"  y="10" width="23" height="23" rx="6"  fill={markFill} />
        {/* top-right node (raised) */}
        <rect x="30" y="4"  width="20" height="20" rx="5"  fill={markFill} />
        {/* horizontal bridge between top nodes */}
        <rect x="17" y="12" width="17" height="10" rx="3"  fill={markFill} />
        {/* vertical bridge: top-left → main */}
        <rect x="4"  y="29" width="13" height="13" rx="4"  fill={markFill} />
        {/* main central node */}
        <rect x="0"  y="37" width="37" height="37" rx="9"  fill={markFill} />
        {/* bridge: main → right satellite */}
        <rect x="34" y="46" width="12" height="14" rx="3"  fill={markFill} />
        {/* right satellite node */}
        <rect x="43" y="42" width="21" height="21" rx="5"  fill={markFill} />
        {/* wide bottom base (extends full width, overlaps main bottom) */}
        <rect x="0"  y="71" width="62" height="11" rx="5"  fill={markFill} />
      </g>

      {/* ── Wordmark ───────────────────────────────────── */}
      {!markOnly && (
        <text
          x={markW + gap}
          y={textY}
          fontFamily="'Plus Jakarta Sans', 'Nunito', 'Trebuchet MS', system-ui, sans-serif"
          fontWeight="800"
          fontSize={fontSize}
          fill={textFill}
          letterSpacing="-0.02em"
        >
          Tarkis
        </text>
      )}
    </svg>
  );
}
