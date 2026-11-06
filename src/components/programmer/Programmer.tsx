import type { Programmer as ProgrammerData } from "@/data/programmers";
import { CodeScreen } from "./CodeScreen";
import { Desk } from "./Desk";
import { FloatingIcons } from "./FloatingIcons";
import { NameTag } from "./NameTag";
import { Person } from "./Person";

type Props = {
  programmer: ProgrammerData;
  /** true enquanto a câmera não está na sala: para de digitar, de soltar ícones e de aceitar cliques */
  paused: boolean;
  onSelect: (programmer: ProgrammerData) => void;
};

/**
 * Um posto de trabalho completo: mesa + monitor + pessoa + ícones + etiqueta.
 * O posto inteiro é um botão: clicar nele leva a câmera até a pessoa.
 */
export function Programmer({ programmer, paused, onSelect }: Props) {
  const { x, y, rotation, color, name } = programmer;

  return (
    <>
      <button
        type="button"
        aria-label={`Ver o site de ${name}`}
        onClick={() => onSelect(programmer)}
        disabled={paused}
        className="group absolute h-[19cqw] w-[22cqw] cursor-pointer transition-[scale] duration-500 hover:scale-[1.04] disabled:cursor-default disabled:hover:scale-100"
        style={{
          left: `${x}%`,
          top: `${y}%`,
          translate: "-50% -50%",
          rotate: `${rotation}deg`,
        }}
      >
        {/* Contorno brilhante que aparece ao passar o mouse */}
        <div
          className="absolute -inset-[1cqw] rounded-[1.5cqw] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-disabled:opacity-0"
          style={{ boxShadow: `0 0 0 0.2cqw ${color}, 0 0 3cqw ${color}` }}
        />
        <Desk />
        <CodeScreen programmer={programmer} paused={paused} />
        <Person
          shirt={programmer.shirt}
          hair={programmer.hair}
          hairStyle={programmer.hairStyle}
          skin={programmer.skin}
        />
      </button>

      {!paused && <FloatingIcons programmer={programmer} />}
      <NameTag programmer={programmer} hidden={paused} />
    </>
  );
}
