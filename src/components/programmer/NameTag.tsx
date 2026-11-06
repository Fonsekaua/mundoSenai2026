import type { Programmer } from "@/data/programmers";

type Props = { programmer: Programmer; hidden: boolean };

/** Etiqueta com o nome e a especialidade, sempre "em pé" (não gira com a mesa). */
export function NameTag({ programmer, hidden }: Props) {
  const { x, y, rotation, color, name, role } = programmer;
  // Mesas viradas de lado ficam mais compridas na vertical, então a etiqueta desce mais.
  const distance = rotation === 0 ? 11 : 12.5;

  return (
    <div
      className="pointer-events-none absolute -translate-x-1/2 text-center transition-opacity duration-500"
      style={{ left: `${x}%`, top: `calc(${y}% + ${distance}cqw)`, opacity: hidden ? 0 : 1 }}
    >
      <div
        className="rounded-full border-[0.12cqw] bg-black/80 px-[1cqw] py-[0.3cqw] text-[1cqw] font-bold whitespace-nowrap text-white"
        style={{ borderColor: color, boxShadow: `0 0 1.2cqw ${color}80` }}
      >
        {name}
      </div>
      <div className="mt-[0.3cqw] text-[0.75cqw] whitespace-nowrap" style={{ color }}>
        {role}
      </div>
    </div>
  );
}
