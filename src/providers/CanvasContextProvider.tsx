import Arrow from "@/components/shapes/Arrow";
import { CanvasContext } from "@/contexts/canvasContext";
import { BoardBlock } from "@/types/workspace";
import { ReactNode, useEffect, useState } from "react";

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
  let [blocks, setBlocks] = useState<BoardBlock[]>([
    {
      type: "markdown",
      transform: {
        x: -500,
        y: -500,
        width: 500,
        height: 500,
        rotation: 0,
      },
      id: "woo",
      markdown: "A markdown block, very exciting",
    },
    {
      type: "markdown",
      transform: {
        x: 100,
        y: 100,
        width: 500,
        height: 500,
        rotation: 0,
      },
      id: "foo",
      markdown: "# Header",
    },
    {
      type: "svg",
      transform: {
        x: 100,
        y: 100,
        width: 100,
        height: 100,
        rotation: 0,
      },
      id: "svg",
      svg: Arrow(),
    },
  ]);

  useEffect(() => {
    blocksUpdate(blocks);
  }, [blocks]);

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
