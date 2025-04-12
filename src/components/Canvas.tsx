import { twMerge } from "tailwind-merge"
import {
  TransformWrapper,
  TransformComponent,
} from "react-zoom-pan-pinch";
import { BoardBlock } from "@/types/workspace";
import useCanvasContext from "@/hooks/useCanvasContext";
import MarkdownBoardBlock from "./blocks/MarkdownBlock";

type CanvasProps = {
  className?: string,
}

export default function Canvas({ className = "" }: CanvasProps) {
  const { selectedElement, editingElement, setSelectedElement, setEditingElement, blocks, setBlock } = useCanvasContext()

  function renderBlock(block: BoardBlock) {
    if (block.type == "markdown") {
      return <MarkdownBoardBlock
        key={block.id}
        onClick={(e) => {
          e.stopPropagation()
          console.log(block)
          setSelectedElement(block)
        }}
        onResize={(delta) => {
          setBlock({
            ...block,
            transform: {
              ...block.transform,
              width: block.transform.width + delta.width,
              height: block.transform.height + delta.height
            }
          })
        }}
        onMove={(move) => {
          setBlock({
            ...block,
            transform: {
              ...block.transform,
              x: move.x,
              y: move.y
            }
          })
        }}
        block={block}></MarkdownBoardBlock>
    }
  }

  function clearSelection() {
    console.log("clearing selection")
    setSelectedElement(undefined)
    setEditingElement(undefined)
  }

  return <div onClick={() => clearSelection()} className={twMerge("w-full h-full bg-blue-500", className)}>
    <TransformWrapper
      disabled={selectedElement != undefined || editingElement != undefined}
      limitToBounds={false}
    >
      <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
        {blocks.map(b => renderBlock(b))}
      </TransformComponent>
    </TransformWrapper>
  </div>
}
