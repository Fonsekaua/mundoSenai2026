import type { ReactNode } from "react";

/**
 * A sala vista de cima: chão quadriculado e paredes com uma faixa de luz.
 * Tudo que for colocado dentro (`children`) aparece em cima do chão.
 */
export function Room({ children }: { children: ReactNode }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0b0f17] bg-[linear-gradient(rgba(56,189,248,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.07)_1px,transparent_1px)] bg-[size:4cqw_4cqw]">
      {/* Paredes: borda grossa + linha de neon por dentro.
          Vem antes de tudo para ficar por baixo e não pesar na animação. */}
      <div className="pointer-events-none absolute inset-0 border-[1.2cqw] border-[#161c2a] shadow-[inset_0_0_0_0.15cqw_#38bdf855]" />

      {children}
    </div>
  );
}
