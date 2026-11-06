"use client";

import type { Programmer } from "@/data/programmers";
import { useTypewriter } from "@/hooks/useTypewriter";
import { highlight } from "@/lib/highlight";

/** Quantas linhas cabem no monitor. As mais antigas "sobem" e somem. */
const VISIBLE_LINES = 8;

/** O monitor em cima da mesa, com o código sendo digitado sozinho. */
type Props = { programmer: Programmer; paused: boolean };

export function CodeScreen({ programmer, paused }: Props) {
  const typed = useTypewriter(programmer.code, programmer.typingSpeed, paused);
  const lines = typed.split("\n");
  const first = Math.max(0, lines.length - VISIBLE_LINES);

  return (
    <div
      className="absolute left-1/2 top-[0.6cqw] h-[7cqw] w-[16cqw] -translate-x-1/2 overflow-hidden rounded-[0.4cqw] border-[0.2cqw] border-zinc-700 bg-[#0b1020] text-left"
      style={{ boxShadow: `0 0 2.5cqw ${programmer.color}80` }}
    >
      {/* Barra de título do editor */}
      <div className="flex items-center gap-[0.25cqw] bg-zinc-900 px-[0.4cqw] py-[0.2cqw]">
        <span className="size-[0.4cqw] rounded-full bg-red-500" />
        <span className="size-[0.4cqw] rounded-full bg-yellow-400" />
        <span className="size-[0.4cqw] rounded-full bg-green-500" />
        <span className="ml-[0.3cqw] font-mono text-[0.45cqw] text-zinc-400">
          {programmer.fileName}
        </span>
      </div>

      {/* Código */}
      <pre className="px-[0.5cqw] py-[0.2cqw] font-mono text-[0.55cqw] leading-[1.45] text-zinc-200">
        {lines.slice(first).map((line, i) => {
          const number = first + i + 1;
          const isLast = number === lines.length;
          return (
            <div key={number} className="whitespace-pre">
              <span className="mr-[0.5cqw] inline-block w-[0.8cqw] text-right text-zinc-600">
                {number}
              </span>
              {highlight(line)}
              {isLast && (
                <span
                  className="ml-px inline-block h-[0.6cqw] w-[0.3cqw] animate-blink align-middle"
                  style={{ background: programmer.color }}
                />
              )}
            </div>
          );
        })}
      </pre>
    </div>
  );
}
