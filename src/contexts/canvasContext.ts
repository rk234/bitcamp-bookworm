import { WorkspaceElement } from "@/types/workspace"
import { createContext } from "react"

export type CanvasProviderContext = {
  selectedElement?: WorkspaceElement
  editingElement?: WorkspaceElement
}

export const CanvasContext = createContext<CanvasProviderContext>({
  selectedElement: undefined,
  editingElement: undefined
})
