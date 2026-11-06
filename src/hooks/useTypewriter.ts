import { useEffect, useState } from "react";

/** Quantos "passos" o código fica completo na tela antes de recomeçar. */
const PAUSE_AT_END = 60;

/**
 * Devolve o texto "sendo digitado": a cada `speed` ms aparece mais uma letra.
 * Quando termina, espera um pouco e começa de novo.
 * Com `paused = true` o texto para onde está (e continua dali depois).
 */
export function useTypewriter(text: string, speed: number, paused = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCount((c) => (c >= text.length + PAUSE_AT_END ? 0 : c + 1));
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed, paused]);

  return text.slice(0, count);
}
