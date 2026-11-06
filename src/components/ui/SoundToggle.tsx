type Props = { on: boolean; onToggle: () => void };

/** Botão de ligar/desligar o som, no canto superior direito. */
export function SoundToggle({ on, onToggle }: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="fixed right-[3vmin] top-[3vmin] z-20 rounded-full border border-white/15 bg-black/75 px-4 py-2 text-[1.8vmin] font-semibold text-white transition hover:bg-white/10 active:scale-95"
    >
      {on ? "🔊 Som ligado" : "🔇 Som desligado"}
    </button>
  );
}
