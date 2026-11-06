import type { ReactNode } from "react";
import type { Programmer } from "@/data/programmers";

/** Quanto tempo a câmera leva para ir até a pessoa (em ms). */
export const CAMERA_MS = 1400;
/** Quanto a câmera aproxima (2.6 = 2,6 vezes maior). */
const ZOOM = 2.6;
/** Curva do movimento: começa a andar logo após o clique e freia devagar no final. */
const EASING = "cubic-bezier(0.3, 0, 0.15, 1)";

type Props = {
  /** Pessoa que a câmera visita (continua aqui enquanto a câmera volta) */
  target: Programmer | null;
  /** true = perto da pessoa, false = vendo a sala inteira */
  zoomed: boolean;
  /** true = pausa todas as animações CSS de dentro da sala */
  frozen: boolean;
  children: ReactNode;
};

/**
 * A "câmera" que olha a sala de cima. Na verdade quem se move é a sala:
 * - `transformOrigin` fica em cima da pessoa, então o zoom e o giro acontecem em volta dela;
 * - `translate` arrasta a pessoa em linha reta até o centro da tela.
 * O CSS faz a transição suave entre "sala inteira" e "perto da pessoa".
 *
 * Também define o tamanho da sala (16:9, ocupando a tela) e o "cqw":
 * 1cqw = 1% da largura da sala. Por isso tudo lá dentro cresce junto com a tela.
 */
export function Camera({ target, zoomed, frozen, children }: Props) {
  const transform =
    target && zoomed
      ? `translate(${50 - target.x}%, ${50 - target.y}%) rotate(${-target.rotation}deg) scale(${ZOOM})`
      : "translate(0%, 0%) rotate(0deg) scale(1)";

  return (
    <div
      className={`relative aspect-video w-[min(100vw,177.78vh)] [container-type:inline-size]${frozen ? " [&_*]:[animation-play-state:paused]" : ""}`}
      style={{
        transform,
        transformOrigin: target ? `${target.x}% ${target.y}%` : "center",
        transition: `transform ${CAMERA_MS}ms ${EASING}`,
      }}
    >
      {children}
    </div>
  );
}
