import { SVGBlock } from "@/types/workspace";
import { DraggableData, ResizableDelta } from "react-rnd";
import BoardBlock from "./BoardBlock";

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

export default function SVGBoardBlock({ block, selected, onClick, onResize, onMove, onDoubleClick, onMouseDown }: SVGBoardBlock) {
  return <BoardBlock
    block={block}
    onDoubleClick={onDoubleClick}
    onMouseDown={onMouseDown}
    onClick={onClick}
    onMove={onMove}
    onResize={onResize}
  >
    <div className={`w-full h-full border-2 ${selected && 'border-blue-400'}`}>
      {block.svg}
    </div>
  </BoardBlock>
}
