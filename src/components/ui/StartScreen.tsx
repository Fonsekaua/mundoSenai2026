type Props = { visible: boolean; onStart: () => void };

/**
 * Tela de entrada "Toque para começar".
 * Ela existe porque o navegador só deixa tocar som depois que alguém clica na página.
 * Depois de sumir ela fica `invisible`: assim o navegador para de desenhá-la de vez.
 */
export function StartScreen({ visible, onStart }: Props) {
  return (
    <button
      type="button"
      onClick={onStart}
      className={`fixed inset-0 z-40 grid cursor-pointer place-items-center bg-black/80 transition-[opacity,visibility] duration-1000 ${visible ? "opacity-100" : "invisible opacity-0"}`}
    >
      <div className="text-center">
        <div className="animate-float font-mono text-[14vmin] font-black text-sky-300 [text-shadow:0_0_4vmin_#38bdf8]">
          {"</>"}
        </div>
        <p className="mt-2 text-[2vmin] font-bold tracking-[0.4em] text-sky-200/80">MUNDO SENAI 2026</p>
        <h1 className="mt-2 bg-gradient-to-r from-sky-300 via-fuchsia-300 to-lime-300 bg-clip-text text-[8vmin] leading-tight font-black text-transparent">
          Vitrine World Skills
        </h1>
        <p className="mt-8 animate-pulse text-[2.6vmin] font-semibold text-white">Toque para entrar na sala</p>
      </div>
    </button>
  );
}
