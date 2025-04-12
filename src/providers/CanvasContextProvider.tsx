import { CanvasContext } from "@/contexts/canvasContext";
import { BoardBlock } from "@/types/workspace";
import { ReactNode, useState } from "react";


export default function CanvasContextProvider({ children }: { children: ReactNode }) {
  const [selectedElement, setSelectedElement] = useState<BoardBlock | undefined>(undefined)
  const [editingElement, setEditingElement] = useState<BoardBlock | undefined>(undefined)
  const [blocks, setBlocks] = useState<BoardBlock[]>([
    {
      type: "markdown",
      transform: {
        x: 100,
        y: 100,
        width: 500,
        height: 500,
        rotation: 0
      },
      id: "woo",
      markdown: "# Header"
    }
  ])

  return <CanvasContext.Provider value={{
    editingElement: editingElement,
    selectedElement: selectedElement,
    setSelectedElement: setSelectedElement,
    setEditingElement: setEditingElement,
    blocks: blocks,
    setBlock: (nb: BoardBlock) => {
      setBlocks(blocks.map(b => {
        if (b.id == nb.id) return nb
        else return b
      }))
    },
    setBlocks: (newBlocks: BoardBlock[]) => setBlocks(newBlocks)
  }}>
    {children}
  </CanvasContext.Provider>
}
