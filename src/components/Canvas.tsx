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
  blocks: BoardBlock[]
}

export default function Canvas({ className, blocks }: CanvasProps) {
  const { selectedElement, editingElement, setSelectedElement, setEditingElement } = useCanvasContext()

  function renderBlock(block: BoardBlock) {
    if (block.type == "markdown") {
      return <MarkdownBoardBlock
        key={block.id}
        onClick={(e) => {
          e.stopPropagation()
          console.log(block)
          setSelectedElement(block)
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
        <p>{JSON.stringify(selectedElement)}</p>
      </TransformComponent>
    </TransformWrapper>
  </div>
}
