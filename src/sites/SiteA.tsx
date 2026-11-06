"use client";

import { useState, type MouseEvent, type ReactNode } from "react";
import { formatPrice, products, restaurant } from "./shared/menu";
import { useCart } from "./shared/useCart";

/**
 * Site da Pessoa A — identidade "limpa e moderna" (Front-end · React).
 * Fundo claro, azul, cantos arredondados e uma "onda" (ripple) em cada clique.
 * O sistema (cardápio + carrinho) é o mesmo dos outros dois sites.
 */
export default function SiteA() {
  const cart = useCart();

  if (cart.order) {
    return (
      <div className="grid min-h-full place-items-center bg-gradient-to-b from-sky-50 to-white p-6 font-sans text-slate-800">
        <div className="animate-rise rounded-3xl border border-sky-100 bg-white p-10 text-center shadow-xl shadow-sky-100">
          <div className="mx-auto grid size-16 place-items-center rounded-full bg-sky-500 text-3xl text-white">✓</div>
          <h1 className="mt-5 text-3xl font-bold">Pedido #{cart.order.number} confirmado!</h1>
          <p className="mt-2 text-slate-500">
            Total de {formatPrice(cart.order.total)}. Seu lanche já está sendo preparado.
          </p>
          <div className="mt-6">
            <RippleButton onClick={cart.restart}>Fazer outro pedido</RippleButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gradient-to-b from-sky-50 to-white font-sans text-slate-800">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-sky-100 bg-white/90 px-6 py-4 sm:px-10">
        <span className="text-xl font-bold tracking-tight">
          <span className="text-sky-500">{"{ "}</span>
          {restaurant.name}
          <span className="text-sky-500">{" }"}</span>
        </span>
        <span className="flex items-center gap-3 rounded-full bg-sky-500 py-2 pr-2 pl-4 text-sm font-semibold text-white">
          Carrinho
          {/* A key muda a cada item: o número "pula" de novo */}
          <span key={cart.count} className="grid size-7 animate-pop place-items-center rounded-full bg-white text-sky-600">
            {cart.count}
          </span>
        </span>
      </header>

      <section className="mx-auto max-w-5xl px-6 pt-16 pb-12 text-center sm:px-10">
        <p className="text-sm font-semibold tracking-[0.3em] text-sky-500 uppercase">Peça em poucos cliques</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">{restaurant.slogan}</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-slate-500">{restaurant.description}</p>
      </section>

      <main className="mx-auto grid max-w-5xl gap-6 px-6 sm:grid-cols-2 sm:px-10 lg:grid-cols-3">
        {products.map((p) => (
          <article
            key={p.id}
            className="flex flex-col rounded-2xl border border-sky-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-100"
          >
            <div className="grid size-16 place-items-center rounded-2xl bg-sky-50 text-4xl">{p.emoji}</div>
            <h2 className="mt-4 text-lg font-semibold">{p.name}</h2>
            <p className="mt-1 flex-1 text-sm text-slate-500">{p.description}</p>
            <div className="mt-5 flex items-center justify-between">
              <span className="text-lg font-bold">{formatPrice(p.price)}</span>
              <RippleButton onClick={() => cart.add(p.id)}>
                {cart.items[p.id] ? `Adicionar (${cart.items[p.id]})` : "Adicionar"}
              </RippleButton>
            </div>
          </article>
        ))}
      </main>

      <p className="pt-10 pb-6 text-center text-xs text-slate-400">Versão da Pessoa A · React · visual limpo e moderno</p>

      <footer className="sticky bottom-0 border-t border-sky-100 bg-white/95">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4 sm:px-10">
          <div>
            <p className="text-sm text-slate-500">
              {cart.count} {cart.count === 1 ? "item" : "itens"}
            </p>
            <p className="text-xl font-bold">{formatPrice(cart.total)}</p>
          </div>
          <RippleButton onClick={cart.checkout} disabled={cart.count === 0}>
            Finalizar pedido
          </RippleButton>
        </div>
      </footer>
    </div>
  );
}

type ButtonProps = { onClick: () => void; disabled?: boolean; children: ReactNode };

/** Botão com "onda": cada clique cria um círculo que cresce a partir do ponto clicado. */
function RippleButton({ onClick, disabled, children }: ButtonProps) {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    const box = e.currentTarget.getBoundingClientRect();
    setRipples((list) => [...list, { id: e.timeStamp, x: e.clientX - box.left, y: e.clientY - box.top }]);
    onClick();
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className="relative overflow-hidden rounded-xl bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-600 active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-300"
    >
      {children}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="pointer-events-none absolute size-8 -translate-x-1/2 -translate-y-1/2 animate-ripple rounded-full bg-white/60"
          style={{ left: r.x, top: r.y }}
          onAnimationEnd={() => setRipples((list) => list.filter((item) => item.id !== r.id))}
        />
      ))}
    </button>
  );
}
