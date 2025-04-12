import { MarkdownBlock } from "@/types/workspace"
import { DraggableData, ResizableDelta, Rnd } from "react-rnd"
import MarkdownRenderer from "../MarkdownRenderer"

export type MarkdownBlockProps = {
  block: MarkdownBlock,
  onClick: (e: React.MouseEvent) => void
  onResize: (delta: ResizableDelta) => void
  onMove: (data: DraggableData) => void
}

export default function MarkdownBoardBlock({ block, onClick, onResize, onMove }: MarkdownBlockProps) {
  return <Rnd
    position={{ x: block.transform.x, y: block.transform.y }} size={{ width: block.transform.width, height: block.transform.height }}
    onClick={onClick}
    onResizeStop={(e, dir, elem, delta) => onResize(delta)}
    onDragStop={(e, data) => onMove(data)}
  >
    <MarkdownRenderer md={block.markdown} className={"bg-muted rounded p-4 w-full h-full"}></MarkdownRenderer>
  </Rnd>

}
