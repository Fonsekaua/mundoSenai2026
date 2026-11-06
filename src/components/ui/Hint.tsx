/** Convite piscando embaixo da tela: "toque em um programador". */
export function Hint({ hidden }: { hidden: boolean }) {
  return (
    <div
      className={`pointer-events-none fixed bottom-[3vmin] left-1/2 z-10 -translate-x-1/2 transition-opacity duration-700 ${hidden ? "opacity-0" : "opacity-100"}`}
    >
      <div className="flex animate-glow items-center gap-3 rounded-full border border-sky-400/40 bg-black/75 px-6 py-3 text-[2vmin] font-semibold text-sky-100">
        <span className="size-3 animate-ping rounded-full bg-sky-400" />
        Toque em um programador para ver o site dele
      </div>
    </div>
  );
}
