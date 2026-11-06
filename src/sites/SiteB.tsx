"use client";

import { useState } from "react";
import { pixelFont } from "./shared/fonts";
import { formatPrice, products, restaurant } from "./shared/menu";
import { useCart } from "./shared/useCart";

/**
 * Site da Pessoa B — identidade "terminal" (Back-end · PHP).
 * Quem faz back-end pensa em pedidos e respostas do servidor, então tudo aqui parece um console.
 * Cada clique "treme" (glitch) e escreve uma linha no log, como uma requisição de verdade.
 * O sistema (cardápio + carrinho) é o mesmo dos outros dois sites.
 */
export default function SiteB() {
  const cart = useCart();
  const [logs, setLogs] = useState(["$ php -S localhost:8000", "Servidor rodando. Aguardando pedidos..."]);
  // Qual produto acabou de ser clicado (o "n" muda a cada clique para a animação repetir)
  const [flash, setFlash] = useState({ id: "", n: 0 });

  function log(line: string) {
    setLogs((list) => [...list.slice(-7), line]);
  }

  function add(id: string) {
    cart.add(id);
    setFlash((f) => ({ id, n: f.n + 1 }));
    log(`> POST /carrinho {"item":"${id}"} → 201 Created`);
  }

  function checkout() {
    log("> POST /pedidos → 200 OK");
    cart.checkout();
  }

  if (cart.order) {
    return (
      <div className="relative grid min-h-full place-items-center bg-[#050805] p-6 font-mono text-lime-300">
        <Scanlines />
        <div className="w-full max-w-lg animate-glitch border border-lime-400/50 bg-black/60 p-8">
          <p className="text-lime-500">$ curl -X POST /pedidos</p>
          <p className={`${pixelFont.className} mt-4 text-6xl`}>200 OK</p>
          <p className="mt-2">
            pedido #{cart.order.number} criado · total {formatPrice(cart.order.total)}
          </p>
          <button
            type="button"
            onClick={cart.restart}
            className="mt-6 border border-lime-400 px-4 py-2 transition hover:bg-lime-400 hover:text-black active:animate-glitch"
          >
            [ novo pedido ]
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-full bg-[#050805] font-mono text-lime-300">
      <Scanlines />

      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-lime-500/30 px-6 py-4 sm:px-10">
        <span className={`${pixelFont.className} text-4xl`}>
          &gt; {restaurant.name.toLowerCase().replace(" ", "_")}
          <span className="animate-blink">_</span>
        </span>
        <span className="text-sm text-lime-500">
          [itens: {cart.count}] [total: {formatPrice(cart.total)}]
        </span>
      </header>

      {/* minmax(0, 1fr) deixa a coluna encolher; sem isso as descrições longas esticariam a tela */}
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <section>
          <p className="text-sm text-lime-600">{"// GET /api/cardapio → 200 OK"}</p>
          <h1 className={`${pixelFont.className} mt-2 text-5xl leading-none sm:text-6xl`}>{restaurant.slogan}</h1>
          <p className="mt-3 text-lime-500/80">{restaurant.description}</p>

          <ul className="mt-8 divide-y divide-lime-500/20 border-y border-lime-500/20">
            {products.map((p) => {
              const flashing = flash.id === p.id;
              return (
                // Mudar a key recria a linha, e assim a animação toca de novo a cada clique
                <li
                  key={flashing ? `${p.id}-${flash.n}` : p.id}
                  className={`flex items-center gap-4 py-4 ${flashing ? "animate-flash" : ""}`}
                >
                  <span className="text-2xl">{p.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-lime-200">
                      {p.name} <span className="text-lime-600">x{cart.items[p.id] ?? 0}</span>
                    </p>
                    <p className="truncate text-sm text-lime-600">{p.description}</p>
                  </div>
                  <span className="whitespace-nowrap">{formatPrice(p.price)}</span>
                  <button
                    type="button"
                    onClick={() => add(p.id)}
                    className={`border border-lime-400 px-3 py-1 text-sm transition hover:bg-lime-400 hover:text-black ${flashing ? "animate-glitch" : ""}`}
                  >
                    [ + ]
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <aside className="h-fit border border-lime-500/40 bg-black/50 p-5 lg:sticky lg:top-6">
          <p className="text-lime-500">$ tail -f pedidos.log</p>
          <div className="mt-3 h-48 space-y-1 overflow-hidden text-xs text-lime-400/90">
            {logs.map((line, i) => (
              <p key={i} className="break-all">
                {line}
              </p>
            ))}
            <span className="animate-blink">█</span>
          </div>
          <div className="mt-4 flex justify-between border-t border-dashed border-lime-500/40 pt-4 text-lg">
            <span>TOTAL</span>
            <span>{formatPrice(cart.total)}</span>
          </div>
          <button
            type="button"
            onClick={checkout}
            disabled={cart.count === 0}
            className="mt-4 w-full bg-lime-400 py-3 font-bold text-black transition hover:bg-lime-300 active:animate-glitch disabled:cursor-not-allowed disabled:opacity-30"
          >
            $ checkout --confirm
          </button>
        </aside>
      </div>

      <p className="pb-8 text-center text-xs text-lime-700">versão da pessoa_b · php · visual de terminal</p>
    </div>
  );
}

/** Linhas de monitor antigo por cima de tudo (só enfeite, não pega cliques). */
function Scanlines() {
  return (
    <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0_2px,rgba(0,0,0,0.25)_2px_3px)]" />
  );
}
