type Props = { x: number; y: number };

/** Um vaso de planta visto de cima (folhas são círculos verdes sobrepostos). */
export function Plant({ x, y }: Props) {
  return (
    <div
      className="pointer-events-none absolute size-[6cqw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3f2a1d] shadow-[0_0_1.5cqw_rgba(0,0,0,0.7)]"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <div className="absolute left-[0.5cqw] top-[0.8cqw] size-[3cqw] rounded-full bg-green-700" />
      <div className="absolute right-[0.4cqw] top-[0.6cqw] size-[3cqw] rounded-full bg-green-600" />
      <div className="absolute bottom-[0.4cqw] left-[1.4cqw] size-[3.2cqw] rounded-full bg-green-500" />
      <div className="absolute left-[2cqw] top-[2cqw] size-[2cqw] rounded-full bg-lime-400/80" />
    </div>
  );
}
