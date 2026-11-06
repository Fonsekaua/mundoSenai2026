"use client";

import { useEffect, useState } from "react";
import type { Programmer } from "@/data/programmers";
import type { LanguageId } from "@/data/languages";
import { playPop } from "@/lib/sounds";
import { LanguageBadge } from "./LanguageBadge";

type Bubble = { key: number; lang: LanguageId; offset: number };

/** De tempos em tempos um ícone de linguagem "salta" da mesa, sobe e desaparece. */
export function FloatingIcons({ programmer }: { programmer: Programmer }) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const { languages, x, y } = programmer;

  useEffect(() => {
    let key = 0;
    let timer: ReturnType<typeof setTimeout>;

    function spawn() {
      const lang = languages[Math.floor(Math.random() * languages.length)];
      const offset = Math.random() * 14 - 7; // posição na horizontal, em cqw
      setBubbles((list) => [...list, { key: key++, lang, offset }]);
      playPop();
      timer = setTimeout(spawn, 2000 + Math.random() * 3000);
    }

    timer = setTimeout(spawn, Math.random() * 2500);
    return () => clearTimeout(timer);
  }, [languages]);

  // Quando a animação de um ícone acaba, ele sai da lista.
  function remove(key: number) {
    setBubbles((list) => list.filter((b) => b.key !== key));
  }

  return (
    <div className="pointer-events-none absolute" style={{ left: `${x}%`, top: `${y}%` }}>
      {bubbles.map((b) => (
        <LanguageBadge
          key={b.key}
          id={b.lang}
          className="absolute -translate-x-1/2 -translate-y-1/2 animate-float-icon"
          style={{ left: `${b.offset}cqw` }}
          onAnimationEnd={() => remove(b.key)}
        />
      ))}
    </div>
  );
}
