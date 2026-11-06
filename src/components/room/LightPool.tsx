type Props = { x: number; y: number; color: string };

/** Uma "poça" de luz colorida no chão, como se viesse da tela do computador. */
export function LightPool({ x, y, color }: Props) {
  return (
    <div
      className="pointer-events-none absolute size-[34cqw] -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        background: `radial-gradient(circle, ${color}30, transparent 60%)`,
      }}
    />
  );
}
