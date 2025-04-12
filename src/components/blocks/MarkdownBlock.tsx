import { MarkdownBlock } from "@/types/workspace"
import { DraggableData, ResizableDelta, Rnd } from "react-rnd"
import MarkdownRenderer from "../MarkdownRenderer"
import { twMerge } from "tailwind-merge"
import useCanvasContext from "@/hooks/useCanvasContext"
import { useTransformComponent } from "react-zoom-pan-pinch"
import BoardBlock from "./BoardBlock"

export type MarkdownBlockProps = {
  block: MarkdownBlock,
  selected: boolean,
  editing: boolean,
  onClick: (e: React.MouseEvent) => void
  onMouseDown: (e: MouseEvent) => void
  onResize: (delta: ResizableDelta) => void
  onMove: (data: DraggableData) => void
  onDoubleClick: (e: React.MouseEvent) => void
}

export default function MarkdownBoardBlock({ block, onClick, onResize, onMove, selected = false, onDoubleClick, editing, onMouseDown }: MarkdownBlockProps) {
  const { setBlock } = useCanvasContext()

  const classes = `
    bg-muted overflow-hidden  rounded p-4 absolute top-0 left-0 bottom-0 right-0 shadow
  `

  return <BoardBlock
    block={block}
    onDoubleClick={onDoubleClick}
    onMouseDown={onMouseDown}
    onClick={onClick}
    onMove={onMove}
    onResize={onResize}
  >
    {
      editing ?
        <textarea onChange={e => setBlock({ ...block, markdown: e.target.value })} className={twMerge(classes, selected && "border-2 border-green-400")} value={block.markdown}></textarea>
        :
        <MarkdownRenderer md={block.markdown} className={twMerge(classes, selected && "border-2 border-blue-400")}></MarkdownRenderer>
    }
  </BoardBlock>

}
