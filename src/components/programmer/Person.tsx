import type { Programmer } from "@/data/programmers";
import { Hair } from "./Hair";

type Props = Pick<Programmer, "shirt" | "hair" | "hairStyle" | "skin">;

/**
 * A pessoa vista de cima, sentada na cadeira.
 * De cima a gente vê: cadeira, ombros, cabeça (cabelo) e os braços indo até o teclado.
 * Os braços sobem e descem um pouco (animação "type-tap") para parecer que estão digitando.
 */
export function Person({ shirt, hair, hairStyle, skin }: Props) {
  return (
    <div className="absolute left-1/2 top-[7.4cqw] h-[10cqw] w-[9cqw] -translate-x-1/2">
      {/* Cadeira */}
      <div className="absolute left-[0.75cqw] top-[2.4cqw] size-[7.5cqw] rounded-full border-[0.3cqw] border-zinc-700 bg-zinc-800" />

      {/* Braços (cada um num ritmo diferente) */}
      <Arm side="left" shirt={shirt} skin={skin} duration="0.3s" />
      <Arm side="right" shirt={shirt} skin={skin} duration="0.36s" />

      {/* Ombros */}
      <div
        className="absolute left-[0.5cqw] top-[3cqw] h-[3.2cqw] w-[8cqw] rounded-full"
        style={{ background: shirt }}
      />

      {/* Cabeça: orelhas + cabelo, balançando de leve */}
      <div className="absolute left-1/2 top-[2.2cqw] size-[3.4cqw] -translate-x-1/2 animate-head-bob">
        <div className="absolute -left-[0.25cqw] top-[1.3cqw] size-[0.8cqw] rounded-full" style={{ background: skin }} />
        <div className="absolute -right-[0.25cqw] top-[1.3cqw] size-[0.8cqw] rounded-full" style={{ background: skin }} />
        <Hair style={hairStyle} color={hair} />
      </div>
    </div>
  );
}

type ArmProps = {
  side: "left" | "right";
  shirt: string;
  skin: string;
  duration: string;
};

function Arm({ side, shirt, skin, duration }: ArmProps) {
  const isLeft = side === "left";
  return (
    <div
      className={`absolute top-0 h-[3.8cqw] w-[1.1cqw] origin-bottom rounded-full ${isLeft ? "left-[2.3cqw] rotate-[18deg]" : "right-[2.3cqw] -rotate-[18deg]"}`}
      style={{ background: shirt }}
    >
      {/* Mão, que fica "batendo" no teclado */}
      <div
        className="absolute -top-[0.2cqw] left-1/2 size-[1.2cqw] -translate-x-1/2 animate-type-tap rounded-full"
        style={{ background: skin, animationDuration: duration }}
      />
    </div>
  );
}
