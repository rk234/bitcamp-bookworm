
import { BoardBlock as BoardBlockT } from "@/types/workspace"
import { ResizableDelta, DraggableData, Rnd } from "react-rnd"
import { useTransformComponent } from "react-zoom-pan-pinch"

type BoardBlockProps = {
  block: BoardBlockT,
  onClick: (e: React.MouseEvent) => void
  onMouseDown: (e: MouseEvent) => void
  onResize: (delta: ResizableDelta) => void
  onMove: (data: DraggableData) => void
  onDoubleClick: (e: React.MouseEvent) => void
  children?: React.ReactNode
}

export default function BoardBlock({ children, block, onClick, onResize, onMove, onDoubleClick, onMouseDown }: BoardBlockProps) {
  const scale = useTransformComponent(s => s.state.scale)

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
    {children}
  </Rnd>
}
