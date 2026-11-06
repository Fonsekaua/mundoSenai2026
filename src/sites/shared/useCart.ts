import { useState } from "react";
import { products } from "./menu";

type Order = { number: number; total: number };

/**
 * A lógica do carrinho. É exatamente a mesma nos três sites:
 * cada pessoa só muda a aparência (cores, fontes e animações).
 */
export function useCart() {
  const [items, setItems] = useState<Record<string, number>>({}); // id do produto → quantidade
  const [order, setOrder] = useState<Order | null>(null);

  const count = Object.values(items).reduce((sum, quantity) => sum + quantity, 0);
  const total = products.reduce((sum, p) => sum + p.price * (items[p.id] ?? 0), 0);

  function add(id: string) {
    setItems((current) => ({ ...current, [id]: (current[id] ?? 0) + 1 }));
  }

  /** Fecha o pedido: guarda o número e o total, e esvazia o carrinho. */
  function checkout() {
    if (count === 0) return;
    setOrder({ number: Math.floor(100 + Math.random() * 900), total });
    setItems({});
  }

  function restart() {
    setOrder(null);
  }

  return { items, count, total, order, add, checkout, restart };
}
