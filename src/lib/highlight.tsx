// "Pinta" uma linha de código com cores, como um editor de verdade.
// É propositalmente simples: só reconhece comentários, textos, variáveis do PHP,
// palavras-chave e nomes com letra maiúscula.

const KEYWORDS = new Set([
  "import", "from", "export", "function", "const", "let", "return",
  "class", "if", "else", "for", "in", "new", "echo", "true", "false",
]);

// Pedaços que queremos reconhecer: comentário, texto entre aspas, variável ($nome) ou palavra.
const TOKEN = /(\/\/.*|\/\*.*|#\s.*|"[^"]*"?|'[^']*'?|\$\w+|\w+)/;

function colorOf(token: string) {
  if (/^(\/\/|\/\*|#\s)/.test(token)) return "#6b7280"; // comentário
  if (/^["']/.test(token)) return "#86efac"; // texto
  if (/^\$/.test(token)) return "#7dd3fc"; // variável do PHP
  if (KEYWORDS.has(token)) return "#f472b6"; // palavra-chave
  if (/^\d/.test(token)) return "#fdba74"; // número
  if (/^[A-Z]/.test(token)) return "#fcd34d"; // componente / classe
  return undefined; // cor normal
}

export function highlight(line: string) {
  return line.split(TOKEN).map((part, i) => (
    <span key={i} style={{ color: colorOf(part) }}>
      {part}
    </span>
  ));
}
