import { Board } from "@/types/workspace"
import { createContext } from "react"

export type EditorContext = {
    board: Board|undefined,
    setBoard: (board: Board) => void
}

export const EditorContext = createContext<EditorContext>({
  board: undefined,
  setBoard: () => {}
})
