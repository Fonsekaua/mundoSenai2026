"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { roundFont } from "./shared/fonts";
import { formatPrice, products, restaurant, type Product } from "./shared/menu";
import { useCart } from "./shared/useCart";

/**
 * Site da Pessoa C — identidade "divertida" (Web Design · CSS).
 * Quem faz design pensa em emoção: cores vivas, letras redondas, cards tortinhos
 * e um confete de emojis a cada clique.
 * O sistema (cardápio + carrinho) é o mesmo dos outros dois sites.
 */
export default function SiteC() {
  const cart = useCart();

  if (cart.order) {
    return (
      <div className={`${roundFont.className} grid min-h-full place-items-center bg-gradient-to-br from-pink-300 via-fuchsia-300 to-amber-200 p-6 text-fuchsia-950`}>
        <div className="animate-jelly rounded-[2.5rem] border-4 border-fuchsia-900 bg-white p-10 text-center shadow-[8px_8px_0_#701a75]">
          <p className="text-7xl">🛵</p>
          <h1 className="mt-4 text-4xl font-bold">Eba! Pedido #{cart.order.number}</h1>
          <p className="mt-2 text-lg">Total de {formatPrice(cart.order.total)} · já está a caminho!</p>
          <div className="mt-6">
            <PopButton onClick={cart.restart}>Pedir de novo 🍔</PopButton>
          </div>
        </div>
      </div>
    );
  }

  // A última palavra do slogan ganha destaque ("programa")
  const words = restaurant.slogan.split(" ");
  const lastWord = words.pop();

  return (
    <div className={`${roundFont.className} relative min-h-full overflow-clip bg-gradient-to-br from-pink-200 via-fuchsia-200 to-amber-100 text-fuchsia-950`}>
      {/* Bolhas de cor no fundo */}
      <div className="pointer-events-none absolute -top-24 -left-24 size-80 rounded-full bg-pink-300/60" />
      <div className="pointer-events-none absolute top-1/3 -right-20 size-72 rounded-full bg-amber-200/70" />

      <header className="relative flex items-center justify-between px-6 py-6 sm:px-10">
        <span className="text-3xl font-bold">
          {restaurant.name} <span className="text-pink-500">♥</span>
        </span>
        {/* A key muda a cada item: o carrinho balança de novo */}
        <span key={cart.count} className="animate-wiggle rounded-full border-2 border-fuchsia-900 bg-white px-4 py-2 font-semibold shadow-[3px_3px_0_#701a75]">
          🛒 {cart.count}
        </span>
      </header>

      <section className="relative px-6 pt-6 pb-14 text-center sm:px-10">
        <h1 className="text-5xl leading-tight font-bold sm:text-7xl">
          {words.join(" ")}{" "}
          <span className="inline-block -rotate-3 rounded-2xl bg-white px-4 text-pink-500 shadow-[4px_4px_0_#701a75]">
            {lastWord}
          </span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-xl">{restaurant.description}</p>
      </section>

      <main className="relative mx-auto grid max-w-6xl gap-8 px-6 sm:grid-cols-2 sm:px-10 lg:grid-cols-3">
        {products.map((p, i) => (
          <ProductCard
            key={p.id}
            product={p}
            tilt={i % 2 === 0 ? "-rotate-2" : "rotate-2"}
            quantity={cart.items[p.id] ?? 0}
            onAdd={() => cart.add(p.id)}
          />
        ))}
      </main>

      <p className="relative pt-12 pb-6 text-center text-sm text-fuchsia-800/70">Versão da Pessoa C · CSS · visual divertido</p>

      <div className="sticky bottom-6 z-10 flex justify-center px-6 pb-6">
        <div className="flex items-center gap-4 rounded-full border-2 border-fuchsia-900 bg-fuchsia-900 py-2 pr-2 pl-6 text-white shadow-[4px_4px_0_#f472b6]">
          <span className="font-semibold whitespace-nowrap">
            {cart.count} {cart.count === 1 ? "item" : "itens"} · {formatPrice(cart.total)}
          </span>
          <PopButton onClick={cart.checkout} disabled={cart.count === 0}>
            Finalizar 🎉
          </PopButton>
        </div>
      </div>
    </div>
  );
}

type CardProps = { product: Product; tilt: string; quantity: number; onAdd: () => void };

/** Card tortinho que "endireita" e cresce com um pulinho quando o mouse passa por cima. */
function ProductCard({ product, tilt, quantity, onAdd }: CardProps) {
  return (
    <article
      className={`${tilt} flex flex-col items-center rounded-[2rem] border-4 border-fuchsia-900 bg-white p-6 text-center shadow-[6px_6px_0_#701a75] transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-105 hover:rotate-0`}
    >
      <span className="text-7xl">{product.emoji}</span>
      <h2 className="mt-3 text-2xl font-bold">{product.name}</h2>
      <p className="mt-1 flex-1">{product.description}</p>
      <p className="mt-4 text-xl font-bold text-pink-500">{formatPrice(product.price)}</p>
      <div className="mt-5">
        <PopButton onClick={onAdd}>{quantity ? `Mais um! (${quantity})` : "Quero! +"}</PopButton>
      </div>
    </article>
  );
}

type Particle = { id: number; x: number; y: number; emoji: string };
type ButtonProps = { onClick: () => void; disabled?: boolean; children: ReactNode };

const CONFETTI = ["✨", "💖", "🍔", "⭐", "🎉", "🍟"];

/** Botão "gelatina": ao clicar ele balança e solta um confete de emojis para todos os lados. */
function PopButton({ onClick, disabled, children }: ButtonProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [jelly, setJelly] = useState(0);

  function handleClick() {
    const now = Date.now();
    const burst = CONFETTI.map((emoji, i) => {
      const angle = (i / CONFETTI.length) * Math.PI * 2 + Math.random() * 0.5;
      const distance = 50 + Math.random() * 40;
      return { id: now + i, emoji, x: Math.cos(angle) * distance, y: Math.sin(angle) * distance };
    });
    setParticles((list) => [...list, ...burst]);
    setJelly((n) => n + 1);
    onClick();
  }

  return (
    <span className="relative inline-block">
      {/* A key muda a cada clique: o botão é recriado e a animação de gelatina toca de novo */}
      <button
        key={jelly}
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className={`rounded-full border-2 border-fuchsia-900 bg-pink-400 px-6 py-2 text-lg font-bold text-white shadow-[3px_3px_0_#701a75] transition hover:bg-pink-500 disabled:cursor-not-allowed disabled:opacity-40 ${jelly ? "animate-jelly" : ""}`}
      >
        {children}
      </button>
      {particles.map((p) => (
        <span
          key={p.id}
          className="pointer-events-none absolute top-1/2 left-1/2 animate-burst text-xl"
          style={{ "--x": `${p.x}px`, "--y": `${p.y}px` } as CSSProperties}
          onAnimationEnd={() => setParticles((list) => list.filter((item) => item.id !== p.id))}
        >
          {p.emoji}
        </span>
      ))}
    </span>
  );
}
