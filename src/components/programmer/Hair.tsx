import type { HairStyle } from "@/data/programmers";

type Props = { style: HairStyle; color: string };

/**
 * O cabelo visto de cima. Fica dentro da cabeça (3,4cqw), e "para baixo" é a nuca.
 * - long: cabelo solto caindo pelas costas
 * - ponytail: rabo de cavalo com elástico
 * - curly: vários cachinhos em volta da cabeça
 */
export function Hair({ style, color }: Props) {
  if (style === "curly") return <CurlyHair color={color} />;

  return (
    <>
      {style === "long" && (
        // Cabelo comprido descendo pelas costas, por cima dos ombros
        <div
          className="absolute left-1/2 top-[1.2cqw] h-[4cqw] w-[4.2cqw] -translate-x-1/2 rounded-t-full rounded-b-[2cqw]"
          style={{ background: color }}
        />
      )}

      {style === "ponytail" && (
        <>
          {/* Rabo de cavalo */}
          <div
            className="absolute left-1/2 top-[3cqw] h-[3.2cqw] w-[1.4cqw] -translate-x-1/2 rounded-full"
            style={{ background: color }}
          />
          {/* Elástico */}
          <div className="absolute left-1/2 top-[2.9cqw] size-[0.8cqw] -translate-x-1/2 rounded-full bg-pink-400" />
        </>
      )}

      {/* Topo da cabeça */}
      <div className="absolute inset-0 rounded-full" style={{ background: color }} />
    </>
  );
}

/** Quantos cachinhos ficam em volta da cabeça. */
const CURLS = 12;
/** Centro da cabeça e distância dos cachos até ele (em cqw). */
const CENTER = 1.7;
const RADIUS = 1.55;

function CurlyHair({ color }: { color: string }) {
  return (
    <>
      {Array.from({ length: CURLS }, (_, i) => {
        // Espalha os cachos num círculo: cada um num ângulo diferente.
        // O toFixed(2) arredonda o número para servidor e navegador escreverem igual.
        const angle = (i / CURLS) * Math.PI * 2;
        const left = (CENTER + Math.cos(angle) * RADIUS).toFixed(2);
        const top = (CENTER + Math.sin(angle) * RADIUS).toFixed(2);
        return (
          <div
            key={i}
            className="absolute size-[1.4cqw] -translate-x-1/2 -translate-y-1/2 rounded-full border-[0.1cqw] border-black/20"
            style={{ backgroundColor: color, left: `${left}cqw`, top: `${top}cqw` }}
          />
        );
      })}
      {/* Miolo do cabelo, com um brilho para dar volume */}
      <div
        className="absolute inset-[0.3cqw] rounded-full bg-[radial-gradient(circle_at_40%_35%,rgba(255,255,255,0.25),transparent_60%)]"
        style={{ backgroundColor: color }}
      />
    </>
  );
}
