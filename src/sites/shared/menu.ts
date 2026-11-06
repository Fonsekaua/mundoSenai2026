// O "sistema" que os três estão fazendo: o mesmo restaurante, os mesmos produtos e os mesmos preços.
// Só a aparência muda de um site para o outro.

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  emoji: string;
};

export const restaurant = {
  name: "Byte Burger",
  slogan: "O lanche oficial de quem programa",
  description: "Escolha seu lanche, monte o pedido e finalize em poucos cliques.",
};

export const products: Product[] = [
  { id: "classico", name: "Clássico.js", description: "Pão brioche, carne, queijo e o molho da casa.", price: 22.9, emoji: "🍔" },
  { id: "cheese", name: "Cheese Byte", description: "Duas carnes e cheddar derretido em cada camada.", price: 27.5, emoji: "🧀" },
  { id: "hotdog", name: "Hot Dog.exe", description: "Salsicha, purê e batata palha. Roda em qualquer fome.", price: 15.9, emoji: "🌭" },
  { id: "batata", name: "Batata Bit", description: "Crocante por fora, macia por dentro.", price: 12.9, emoji: "🍟" },
  { id: "refri", name: "Refri Overflow", description: "Tão gelado que transborda.", price: 7.5, emoji: "🥤" },
  { id: "shake", name: "Milk Stack", description: "Milkshake em camadas de chocolate e baunilha.", price: 16.9, emoji: "🍨" },
];

/** 22.9 → "R$ 22,90" */
export function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
