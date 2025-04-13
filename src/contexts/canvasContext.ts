import { BoardBlock } from "@/types/workspace"
import { createContext } from "react"

export type CanvasProviderContext = {
  selectedElement?: BoardBlock
  editingElement?: BoardBlock
  setSelectedElement: (block?: BoardBlock) => void
  setEditingElement: (block?: BoardBlock) => void
  blocks: BoardBlock[],
  setBlocks: (blocks: BoardBlock[]) => void
  setBlock: (block: BoardBlock, pushChanges?: boolean) => void
  setLocalBlocks: (block: BoardBlock[]) => void
}

export const CanvasContext = createContext<CanvasProviderContext>({
  selectedElement: undefined,
  editingElement: undefined,
  setEditingElement: () => { },
  setSelectedElement: () => { },
  blocks: [],
  setBlocks: () => { },
  setBlock: () => { },
  setLocalBlocks: () => { }
})
