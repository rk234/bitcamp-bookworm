import { MarkdownBlock } from "@/types/workspace"
import { DraggableData, ResizableDelta, Rnd } from "react-rnd"
import MarkdownRenderer from "../MarkdownRenderer"
import { twMerge } from "tailwind-merge"
import useCanvasContext from "@/hooks/useCanvasContext"
import { useTransformComponent } from "react-zoom-pan-pinch"

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
  const scale = useTransformComponent(s => s.state.scale)

  const classes = `
    bg-muted text-lg overflow-hidden  rounded p-4 absolute top-0 left-0 bottom-0 right-0 border-2
  `

  return <Rnd
    scale={scale}
    position={{ x: block.transform.x, y: block.transform.y }} size={{ width: block.transform.width, height: block.transform.height }}
    onDoubleClick={onDoubleClick}
    onMouseDown={onMouseDown}
    onClick={onClick}
    className={"relative"}
    onResizeStop={(e, dir, elem, delta) => {
      e.stopPropagation()
      onResize(delta)
    }}
    onDrag={e => e.stopPropagation()}
    onDragStart={e => e.stopPropagation()}
    onDragStop={(e, data) => {
      e.stopPropagation()
      onMove(data)
    }}
  >
    {
      editing ?
        <textarea onChange={e => setBlock({ ...block, markdown: e.target.value })} className={twMerge(classes, selected && "border-2 border-green-400")} value={block.markdown}></textarea>
        :
        <MarkdownRenderer md={block.markdown} className={twMerge(classes, selected && "border-2 border-green-400")}></MarkdownRenderer>
    }
  </Rnd>

}
