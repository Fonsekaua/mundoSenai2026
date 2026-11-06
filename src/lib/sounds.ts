// Sons gerados pelo próprio navegador (Web Audio API).
// Não precisa de nenhum arquivo .mp3: cada som é criado na hora.

let context: AudioContext | null = null;
let muted = true;

/** O navegador só libera som depois de um clique do usuário. Chame isto dentro de um clique. */
export function enableSound() {
  context ??= new AudioContext();
  context.resume();
  muted = false;
}

export function setMuted(value: boolean) {
  muted = value;
}

/** Cria um "chiado" curto: é a base do som de tecla e do whoosh. */
function noise(duration: number) {
  const ctx = context!;
  const buffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  return source;
}

/** "Tec" de uma tecla. */
export function playKey() {
  if (muted || !context) return;
  const ctx = context;
  const source = noise(0.03);
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 2500 + Math.random() * 2500;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.08, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
  source.connect(filter).connect(gain).connect(ctx.destination);
  source.start();
}

/** "Plim" suave quando um ícone de linguagem aparece. */
export function playPop() {
  if (muted || !context) return;
  const ctx = context;
  const osc = ctx.createOscillator();
  osc.frequency.setValueAtTime(700, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1300, ctx.currentTime + 0.12);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.04, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.25);
}

/** "Fuuu" da câmera se movendo. */
export function playWhoosh() {
  if (muted || !context) return;
  const ctx = context;
  const source = noise(1);
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(300, ctx.currentTime);
  filter.frequency.exponentialRampToValueAtTime(3000, ctx.currentTime + 0.5);
  filter.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 1);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.001, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 0.4);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1);
  source.connect(filter).connect(gain).connect(ctx.destination);
  source.start();
}
