import { programmers } from "@/data/programmers";
import { Hologram } from "./Hologram";
import { LightPool } from "./LightPool";
import { Plant } from "./Plant";
import { ServerRack } from "./ServerRack";

/** Toda a decoração da sala junta. Apague uma linha para tirar um enfeite. */
export function RoomDecor() {
  return (
    <>
      {programmers.map((p) => (
        <LightPool key={p.id} x={p.x} y={p.y} color={p.color} />
      ))}
      <Hologram x={50} y={66} />
      <ServerRack x={7} y={15} />
      <ServerRack x={93} y={15} />
      <Plant x={6} y={89} />
      <Plant x={94} y={89} />
    </>
  );
}
