import Arrow from "@/components/shapes/Arrow";
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
    blocksUpdate(blocks);
  }, [blocks]);

  useEffect(() => {
    if(editorContext.board && editorContext.board.blocks != blocks) {
      setBlocks(editorContext.board.blocks);
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
          setBlocks(
            blocks.map((b) => {
              if (b.id == nb.id) return nb;
              else return b;
            })
          );
        },
        setBlocks: (newBlocks: BoardBlock[]) => setBlocks(newBlocks),
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
}
