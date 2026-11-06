/** A mesa vista de cima: tampo de madeira, teclado, mouse e caneca de café. */
export function Desk() {
  return (
    <div className="absolute inset-x-0 top-0 h-[9.5cqw] rounded-[0.6cqw] border-[0.15cqw] border-[#5b4332] bg-gradient-to-b from-[#4a3627] to-[#3a2a1f] shadow-[0_0.6cqw_1.2cqw_rgba(0,0,0,0.6)]">
      {/* Teclado: o desenho das teclas é um padrão repetido no fundo */}
      <div className="absolute left-1/2 top-[7.9cqw] h-[1.3cqw] w-[8cqw] -translate-x-1/2 rounded-[0.2cqw] bg-zinc-800 bg-[repeating-linear-gradient(90deg,#3f3f46_0_0.45cqw,transparent_0.45cqw_0.55cqw),repeating-linear-gradient(0deg,transparent_0_0.3cqw,#27272a_0.3cqw_0.4cqw)]" />

      {/* Mouse */}
      <div className="absolute right-[4.2cqw] top-[7.9cqw] h-[1.2cqw] w-[0.8cqw] rounded-full bg-zinc-700" />

      {/* Caneca de café (com o café dentro) */}
      <div className="absolute left-[2.2cqw] top-[7.8cqw] grid size-[1.4cqw] place-items-center rounded-full bg-zinc-100">
        <div className="size-[0.9cqw] rounded-full bg-[#4b2e1a]" />
      </div>
    </div>
  );
}
