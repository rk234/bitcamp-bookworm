import { SVGBlock } from "@/types/workspace";
import { DraggableData, ResizableDelta } from "react-rnd";
import BoardBlock from "./BoardBlock";
import Arrow from "../shapes/Arrow";

type SVGBoardBlock = {
  block: SVGBlock,
  selected: boolean,
  editing: boolean,
  onClick: (e: React.MouseEvent) => void
  onMouseDown: (e: MouseEvent) => void
  onResize: (delta: ResizableDelta) => void
  onMove: (data: DraggableData) => void
  onDoubleClick: (e: React.MouseEvent) => void
}

function getSVGfromType(type: string) {
  if(type == "arrow") {
    return <>
      <Arrow />
    </>

  } else if(type == "box") {
    return <>
      <div className="size-full border-white border-2"></div>
    </>
  }
  return <>
    <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" strokeWidth={1.5} stroke="currentColor" className="size-full">
              <circle cx="15" cy="15" r="13" />
            </svg>
  </>
}

export default function SVGBoardBlock({ block, selected, onClick, onResize, onMove, onDoubleClick, onMouseDown }: SVGBoardBlock) {
  return <BoardBlock
    block={block}
    onDoubleClick={onDoubleClick}
    onMouseDown={onMouseDown}
    onClick={onClick}
    onMove={onMove}
    onResize={onResize}
  >
    <div className={`w-full h-full border-2 ${selected && 'border-blue-400'}`} style={{
      rotate: `${block.transform.rotation}deg`
    }}>
      {getSVGfromType(block.svg)}
    </div>
  </BoardBlock>
}
