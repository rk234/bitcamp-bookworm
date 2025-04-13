import { CanvasContext } from "@/contexts/canvasContext";
import { EditorContext } from "@/contexts/editorContext";
import { BoardBlock } from "@/types/workspace";
import { ReactNode, useContext, useEffect, useState } from "react";

export default function CanvasContextProvider({
  blocksUpdate,
  children,
}: {
  blocksUpdate: (blocks: BoardBlock[]) => void;
  children: ReactNode;
}) {
  let [selectedElement, setSelectedElement] = useState<BoardBlock | undefined>(
    undefined
  );
  let [editingElement, setEditingElement] = useState<BoardBlock | undefined>(
    undefined
  );
  let [blocks, setBlocks] = useState<BoardBlock[]>([]);

  let editorContext = useContext(EditorContext);

  useEffect(() => {
    console.log("BOARD UPDATED FROM OUTSIDE")
    if(editorContext.board && editorContext.board.blocks != blocks) {
      setBlocks(editorContext.board.blocks);
    } else {
      console.log("returned")
    }
  }, [editorContext?.board]);

  return (
    <CanvasContext.Provider
      value={{
        editingElement: editingElement,
        selectedElement: selectedElement,
        setSelectedElement: setSelectedElement,
        setEditingElement: setEditingElement,
        blocks: blocks,
        setBlock: (nb: BoardBlock) => {
          const newBlocks = blocks.map((b) => {
            if (b.id == nb.id) return nb;
            else return b;
          });
          setBlocks(
            newBlocks
          );
          blocksUpdate(newBlocks)
        },
        setBlocks: (newBlocks: BoardBlock[]) => {
          setBlocks(newBlocks);
          blocksUpdate(newBlocks);
        },
        setLocalBlocks: (newBlocks: BoardBlock[]) => setBlocks(newBlocks)
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
}
