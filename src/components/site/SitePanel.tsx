"use client";

import { useEffect } from "react";
import type { Programmer } from "@/data/programmers";
import { sites } from "@/sites";

type Props = {
  programmer: Programmer | null;
  open: boolean;
  onClose: () => void;
};

/** Uma "janela de navegador" que abre por cima da sala mostrando o site da pessoa. */
export function SitePanel({ programmer, open, onClose }: Props) {
  // A tecla Esc também fecha o site
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!programmer) return null;
  const Site = sites[programmer.id];

  return (
    <div
      className={`fixed inset-[3vmin] z-30 flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 transition-[opacity,scale] duration-500 ease-out ${open ? "scale-100 opacity-100" : "pointer-events-none scale-90 opacity-0"}`}
      style={{ boxShadow: `0 0 80px ${programmer.color}66` }}
    >
      <BrowserBar url={programmer.siteUrl} color={programmer.color} onClose={onClose} />
      <div className="flex-1 overflow-auto bg-white">
        <Site />
      </div>
    </div>
  );
}

type BarProps = { url: string; color: string; onClose: () => void };

/** A barra de cima: bolinhas, endereço do site e botão de voltar. */
function BrowserBar({ url, color, onClose }: BarProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <button
        type="button"
        onClick={onClose}
        className="rounded-full px-4 py-2 text-sm font-bold text-black transition hover:brightness-110 active:scale-95"
        style={{ background: color }}
      >
        ← Voltar para a sala
      </button>
      <div className="flex-1 truncate rounded-full bg-zinc-800 px-4 py-2 font-mono text-sm text-zinc-300">
        https://{url}
      </div>
      <div className="hidden gap-2 sm:flex">
        <span className="size-3 rounded-full bg-red-500" />
        <span className="size-3 rounded-full bg-yellow-400" />
        <span className="size-3 rounded-full bg-green-500" />
      </div>
    </div>
  );
}
