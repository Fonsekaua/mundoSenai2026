// Tudo o que muda de um programador para outro fica aqui.
// Para mudar nome, cor, posição ou o código que aparece na tela, edite só este arquivo.

import type { LanguageId } from "./languages";

export type HairStyle = "long" | "ponytail" | "curly";

export type Programmer = {
  id: "a" | "b" | "c";
  name: string;
  role: string;
  siteUrl: string;
  /** Posição do centro da mesa na sala, em % (0 = esquerda/topo, 100 = direita/baixo) */
  x: number;
  y: number;
  /** Para onde a mesa está virada (0 = parede de cima, -90 = parede da esquerda, 90 = direita) */
  rotation: number;
  /** Cor de destaque (brilho da tela, etiqueta, site) */
  color: string;
  shirt: string;
  hair: string;
  /** Penteado visto de cima: "long" (solto), "ponytail" (rabo de cavalo) ou "curly" (cacheado) */
  hairStyle: HairStyle;
  skin: string;
  /** Velocidade de digitação em ms por letra (menor = mais rápido) */
  typingSpeed: number;
  languages: LanguageId[];
  /** Nome do arquivo que aparece no topo do monitor */
  fileName: string;
  code: string;
};

export const programmers: Programmer[] = [
  {
    id: "a",
    name: "Pessoa A",
    role: "Front-end · React",
    siteUrl: "pessoa-a.dev",
    x: 50,
    y: 24,
    rotation: 0,
    color: "#38bdf8",
    shirt: "#2563eb",
    hair: "#3b2416",
    hairStyle: "long",
    skin: "#f5d0b5",
    typingSpeed: 45,
    languages: ["react", "js", "ts", "css"],
    fileName: "Cardapio.jsx",
    code: `import { useState } from "react";

// Cardápio do Byte Burger
export function Cardapio({ itens }) {
  const [total, setTotal] = useState(0);

  return itens.map((item) => (
    <button onClick={() => setTotal(total + item.preco)}>
      {item.nome}: R$ {item.preco}
    </button>
  ));
}`,
  },
  {
    id: "b",
    name: "Pessoa B",
    role: "Back-end · PHP",
    siteUrl: "pessoa-b.dev",
    x: 17,
    y: 62,
    rotation: -90,
    color: "#a3e635",
    shirt: "#16a34a",
    hair: "#111111",
    hairStyle: "ponytail",
    skin: "#f1c7a5",
    typingSpeed: 55,
    languages: ["php", "node", "java", "js"],
    fileName: "pedidos.php",
    code: `<?php
// API do Byte Burger
$cardapio = [
    ["nome" => "Cheese Byte", "preco" => 27.5],
    ["nome" => "Batata Bit", "preco" => 12.9],
];

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    echo json_encode(["pedido" => rand(100, 999)]);
} else {
    echo json_encode($cardapio);
}`,
  },
  {
    id: "c",
    name: "Pessoa C",
    role: "Web Design · CSS",
    siteUrl: "pessoa-c.dev",
    x: 83,
    y: 62,
    rotation: 90,
    color: "#f472b6",
    shirt: "#9333ea",
    hair: "#1a1a1a",
    hairStyle: "curly",
    skin: "#eec1a0",
    typingSpeed: 40,
    languages: ["html", "css", "js", "ts"],
    fileName: "index.html",
    code: `<button class="quero">Quero! +</button>

/* Botão gelatina do Byte Burger */
.quero {
  background: #f472b6;
  border-radius: 999px;
  font-family: "Fredoka";
}

.quero:active {
  animation: gelatina 0.5s;
}

@keyframes gelatina {
  50% { transform: scale(1.2, 0.8); }
}`,
  },
];
