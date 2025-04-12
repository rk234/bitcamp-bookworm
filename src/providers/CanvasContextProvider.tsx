import { CanvasContext } from "@/contexts/canvasContext";
import { BoardBlock } from "@/types/workspace";
import { ReactNode, useState } from "react";

export default function CanvasContextProvider({ children }: { children: ReactNode }) {
  const [selectedElement, setSelectedElement] = useState<BoardBlock | undefined>(undefined)
  const [editingElement, setEditingElement] = useState<BoardBlock | undefined>(undefined)

  return <CanvasContext.Provider value={{
    editingElement: editingElement,
    selectedElement: selectedElement,
    setSelectedElement: setSelectedElement,
    setEditingElement: setEditingElement
  }}>
    {children}
  </CanvasContext.Provider>
}
