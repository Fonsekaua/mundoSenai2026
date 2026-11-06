/** Título no canto superior esquerdo. Some quando a câmera aproxima. */
export function Header({ hidden }: { hidden: boolean }) {
  return (
    <header
      className={`pointer-events-none fixed left-[3vmin] top-[3vmin] z-10 transition-all duration-700 ${hidden ? "-translate-y-4 opacity-0" : "opacity-100"}`}
    >
      <p className="text-[1.6vmin] font-bold tracking-[0.35em] text-sky-300/80">MUNDO SENAI 2026</p>
      <h1 className="bg-gradient-to-r from-sky-300 via-fuchsia-300 to-lime-300 bg-clip-text text-[4.5vmin] leading-tight font-black text-transparent">
        Vitrine World Skills
      </h1>
    </header>
  );
}
