import type { HTMLAttributes } from "react";
import { languages, type LanguageId } from "@/data/languages";

type Props = HTMLAttributes<HTMLDivElement> & { id: LanguageId };

/** Quadradinho colorido com o ícone/nome da linguagem (JS, TS, React...). */
export function LanguageBadge({ id, className = "", style, ...rest }: Props) {
  const lang = languages[id];
  return (
    <div
      className={`grid size-[2.6cqw] place-items-center rounded-[0.5cqw] font-mono text-[0.8cqw] font-black shadow-[0_0_1.5cqw_rgba(255,255,255,0.35)] ${className}`}
      style={{ background: lang.background, color: lang.text, ...style }}
      {...rest}
    >
      {id === "react" ? <ReactAtom /> : lang.label}
    </div>
  );
}

/** O átomo do React: um círculo no meio e três órbitas. */
function ReactAtom() {
  return (
    <svg viewBox="-12 -12 24 24" className="size-[75%]" aria-label="React">
      <circle r="2.2" fill="currentColor" />
      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        <ellipse rx="10" ry="4" />
        <ellipse rx="10" ry="4" transform="rotate(60)" />
        <ellipse rx="10" ry="4" transform="rotate(120)" />
      </g>
    </svg>
  );
}
