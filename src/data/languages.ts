// Ícones de linguagem que flutuam sobre as mesas.
// Para adicionar uma linguagem nova: crie uma entrada aqui e use o id em programmers.ts.

export type LanguageId = "js" | "ts" | "react" | "php" | "html" | "css" | "node" | "java";

export type Language = {
  label: string;
  background: string;
  text: string;
};

export const languages: Record<LanguageId, Language> = {
  js: { label: "JS", background: "#f7df1e", text: "#111" },
  ts: { label: "TS", background: "#3178c6", text: "#fff" },
  react: { label: "React", background: "#20232a", text: "#61dafb" },
  php: { label: "PHP", background: "#777bb4", text: "#fff" },
  html: { label: "HTML", background: "#e34f26", text: "#fff" },
  css: { label: "CSS", background: "#1572b6", text: "#fff" },
  node: { label: "Node", background: "#339933", text: "#fff" },
  java: { label: "Java", background: "#f89820", text: "#fff" },
};
