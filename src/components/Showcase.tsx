"use client";

import { useState } from "react";
import { programmers, type Programmer as ProgrammerData } from "@/data/programmers";
import { useTypingSounds } from "@/hooks/useTypingSounds";
import { enableSound, playWhoosh, setMuted } from "@/lib/sounds";
import { Camera, CAMERA_MS } from "./camera/Camera";
import { Programmer } from "./programmer/Programmer";
import { Room } from "./room/Room";
import { RoomDecor } from "./room/RoomDecor";
import { SitePanel } from "./site/SitePanel";
import { Header } from "./ui/Header";
import { Hint } from "./ui/Hint";
import { SoundToggle } from "./ui/SoundToggle";
import { StartScreen } from "./ui/StartScreen";

/**
 * Em que momento a vitrine está:
 * - "room":    vendo a sala inteira, tudo animado
 * - "zoomIn":  a câmera está indo até a pessoa
 * - "site":    a janela do site está aberta
 * - "zoomOut": a janela some e a câmera volta para a sala
 */
type Phase = "room" | "zoomIn" | "site" | "zoomOut";

/**
 * O "cérebro" da vitrine: guarda o estado e junta todos os componentes.
 *
 * Fluxo de um clique:
 * 1. clica na pessoa → fase "zoomIn" → a câmera vai até ela
 * 2. depois de CAMERA_MS → fase "site" → a janela do site aparece
 * 3. clica em voltar → fase "zoomOut" → a janela some e a câmera volta
 * 4. depois de CAMERA_MS → fase "room" de novo
 *
 * Fora da fase "room" a sala fica "congelada" (sem digitar, sem ícones, sem animações).
 * Assim o computador só se preocupa em mover a câmera e o movimento fica liso.
 */
export function Showcase() {
  const [started, setStarted] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [focused, setFocused] = useState<ProgrammerData | null>(null);
  const [phase, setPhase] = useState<Phase>("room");

  const inRoom = phase === "room";

  useTypingSounds(inRoom);

  function start() {
    enableSound();
    setMuted(!soundOn);
    setStarted(true);
  }

  function toggleSound() {
    setSoundOn(!soundOn);
    setMuted(soundOn); // estava ligado → agora fica mudo
  }

  function openSite(programmer: ProgrammerData) {
    if (!inRoom) return;
    playWhoosh();
    setFocused(programmer);
    setPhase("zoomIn");
    setTimeout(() => setPhase("site"), CAMERA_MS);
  }

  function closeSite() {
    if (phase !== "site") return;
    playWhoosh();
    setPhase("zoomOut");
    setTimeout(() => {
      setPhase("room");
      setFocused(null);
    }, CAMERA_MS);
  }

  return (
    <main className="relative flex h-dvh w-full items-center justify-center overflow-hidden bg-black">
      <Camera target={focused} zoomed={phase === "zoomIn" || phase === "site"} frozen={!inRoom}>
        <Room>
          <RoomDecor />
          {programmers.map((p) => (
            <Programmer key={p.id} programmer={p} paused={!inRoom} onSelect={openSite} />
          ))}
        </Room>
      </Camera>

      <Header hidden={!inRoom} />
      <Hint hidden={!inRoom || !started} />
      <SoundToggle on={soundOn} onToggle={toggleSound} />
      <SitePanel programmer={focused} open={phase === "site"} onClose={closeSite} />
      <StartScreen visible={!started} onStart={start} />
    </main>
  );
}
