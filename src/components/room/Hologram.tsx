type Props = { x: number; y: number };

/** O "holograma" giratório no centro da sala, com o símbolo de código. */
export function Hologram({ x, y }: Props) {
  return (
    <div
      className="pointer-events-none absolute grid size-[15cqw] -translate-x-1/2 -translate-y-1/2 place-items-center"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      {/* Brilho de fundo */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,#38bdf855,transparent_65%)]" />
      {/* Anéis girando em sentidos opostos */}
      <div className="absolute inset-[0.5cqw] animate-spin-slow rounded-full border-[0.2cqw] border-dashed border-sky-400/60" />
      <div className="absolute inset-[2.5cqw] animate-spin-reverse rounded-full border-[0.15cqw] border-dotted border-fuchsia-400/60" />

      <div className="relative text-center">
        <div className="font-mono text-[3.5cqw] font-black text-sky-300 [text-shadow:0_0_1cqw_#38bdf8]">
          {"</>"}
        </div>
        <div className="text-[0.8cqw] font-bold tracking-[0.4em] text-sky-200/80">WORLD SKILLS</div>
      </div>
    </div>
  );
}
