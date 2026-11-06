import { useEffect } from "react";
import { playKey } from "@/lib/sounds";

/**
 * Toca cliques de teclado em ritmo aleatório, com pausas de vez em quando,
 * para parecer gente digitando de verdade. Com `enabled = false` fica em silêncio.
 */
export function useTypingSounds(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    let timer: ReturnType<typeof setTimeout>;

    function next() {
      playKey();
      const pause = Math.random() < 0.08;
      const delay = pause ? 600 + Math.random() * 1200 : 60 + Math.random() * 130;
      timer = setTimeout(next, delay);
    }

    next();
    return () => clearTimeout(timer);
  }, [enabled]);
}
