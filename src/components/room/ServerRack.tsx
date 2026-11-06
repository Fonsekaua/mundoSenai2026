type Props = { x: number; y: number };

/** Um rack de servidores visto de cima, com luzinhas piscando. */
export function ServerRack({ x, y }: Props) {
  const leds = Array.from({ length: 12 });

  return (
    <div
      className="pointer-events-none absolute grid h-[8cqw] w-[5cqw] -translate-x-1/2 -translate-y-1/2 grid-cols-3 content-center gap-[0.5cqw] rounded-[0.4cqw] border-[0.2cqw] border-zinc-700 bg-zinc-900 p-[0.6cqw] shadow-[0_0_2cqw_rgba(0,0,0,0.8)]"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      {leds.map((_, i) => (
        <span
          key={i}
          className="size-[0.5cqw] animate-led rounded-full"
          // Cada luz tem cor e ritmo diferentes para não piscarem todas juntas
          style={{
            background: i % 3 === 0 ? "#22c55e" : i % 3 === 1 ? "#38bdf8" : "#f59e0b",
            animationDelay: `${(i * 0.37) % 2}s`,
            animationDuration: `${1 + (i % 4) * 0.4}s`,
          }}
        />
      ))}
    </div>
  );
}
