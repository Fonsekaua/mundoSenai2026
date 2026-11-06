import { Fredoka, VT323 } from "next/font/google";

// Fontes próprias de cada identidade visual.
// A Pessoa A usa a Geist, que o projeto já carrega no layout.
export const pixelFont = VT323({ weight: "400", subsets: ["latin"] }); // Pessoa B: letra de terminal antigo
export const roundFont = Fredoka({ subsets: ["latin"] }); // Pessoa C: letra redonda e divertida
