import { twMerge } from "tailwind-merge"
import { v4 as uuidv4 } from "uuid"
import {
  TransformWrapper,
  TransformComponent,
} from "react-zoom-pan-pinch";
import { BoardBlock } from "@/types/workspace";
import useCanvasContext from "@/hooks/useCanvasContext";
import MarkdownBoardBlock from "./blocks/MarkdownBlock";
import { Button } from "./ui/button";
import SVGBoardBlock from "./blocks/SVGBoardBlock";
import Arrow from "./shapes/Arrow";
import { Input } from "./ui/input";

type CanvasProps = {
  className?: string,
}

export default function Canvas({ className = "" }: CanvasProps) {
  const { selectedElement, editingElement, setSelectedElement, setEditingElement, blocks, setBlock, setBlocks } = useCanvasContext()

  function renderBlock(block: BoardBlock) {
    if (block.type == "markdown") {
      return <MarkdownBoardBlock
        selected={selectedElement?.id == block.id}
        editing={editingElement?.id == block.id}
        key={block.id}
        onMouseDown={e => {
          e.stopPropagation()
          setSelectedElement(block)
        }}
        onClick={(e) => {
          e.stopPropagation()
          setSelectedElement(block)
        }}
        onDoubleClick={(e) => {
          e.stopPropagation()
          setEditingElement(block)
          console.log("editing... ", block.id)
        }}
        onResize={(delta) => {
          const b = {
            ...block,
            transform: {
              ...block.transform,
              width: block.transform.width + delta.width,
              height: block.transform.height + delta.height
            }
          }
          setBlock(b)
        }}
        onMove={(move) => {
          console.log("Drag!")
          setBlock({
            ...block,
            transform: {
              ...block.transform,
              x: move.x,
              y: move.y
            }
          })
          console.log(move)
        }}
        block={block}></MarkdownBoardBlock>
    } else if (block.type == "svg") {
      return <SVGBoardBlock
        selected={selectedElement?.id == block.id}
        editing={editingElement?.id == block.id}
        key={block.id}
        onMouseDown={e => {
          e.stopPropagation()
          setSelectedElement(block)
        }}
        onClick={(e) => {
          e.stopPropagation()
          setSelectedElement(block)
        }}
        onDoubleClick={(e) => {
          e.stopPropagation()
          setEditingElement(block)
          console.log("editing... ", block.id)
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
          console.log("Drag!")
          setBlock({
            ...block,
            transform: {
              ...block.transform,
              x: move.x,
              y: move.y
            }
          })
        }}
        block={block}></SVGBoardBlock>
    }
  }

  function clearSelection() {
    console.log("clearing selection")
    setSelectedElement(undefined)
    if(editingElement) {
      setBlocks(blocks);
    }
    setEditingElement(undefined)
  }

  function addBlock(type: "md" | "arrow" | "box" | "circle") {
    if (type == "md") {
      setBlocks(
        [...blocks,
        {
          type: "markdown",
          id: uuidv4(),
          transform: {
            x: 0, y: 0, width: 100, height: 200, rotation: 0
          },
          markdown: "This is some markdown text"
        }
        ]
      )
    } else if (type == "arrow") {
      setBlocks(
        [...blocks,
        {
          type: "svg",
          id: uuidv4(),
          transform: {
            x: 0, y: 0, width: 100, height: 100, rotation: 0
          },
          svg: "arrow"
        }
        ]
      )
    } else if (type == "circle") {
      setBlocks(
        [...blocks,
        {
          type: "svg",
          id: uuidv4(),
          transform: {
            x: 0, y: 0, width: 100, height: 100, rotation: 0
          },
          svg: "circle"
        }
        ]
      )
    } else if (type == "box") {
      setBlocks(
        [...blocks,
        {
          type: "svg",
          id: uuidv4(),
          transform: {
            x: 0, y: 0, width: 100, height: 200, rotation: 0
          },
          svg: "box"
        }
        ]
      )

    }
  }

  const selectionMode = selectedElement != undefined || editingElement != undefined;

  return <div onClick={() => clearSelection()} className={twMerge("relative w-full h-full", className)}>
    <TransformWrapper
      disabled={selectionMode}
      limitToBounds={false}
      minScale={0.1}
    >
      <div className="absolute bottom-5 w-full flex items-center justify-center z-100 pr-20">
        <div
          className={`${selectionMode ? 'bg-blue-300 text-background font-bold' : 'bg-muted'}  border-slate-500 border-1 rounded-lg p-2 flex min-w-96 h-14 flex-row items-center justify-center gap-4`}>
          {(selectionMode) ?
            <div className="flex items-center justify-center gap-4 flex-row" onClick={(e) => e.stopPropagation}>
              <p className="grow">Selection Mode</p>
              <Input onClick={e => e.stopPropagation()} className="max-w-32" type="number"
                value={blocks.find(e => e.id == selectedElement?.id)?.transform.rotation}
                step={15}
                onChange={(e) => {
                  const block = {
                    ...selectedElement
                  } as BoardBlock
                  const r = parseInt(e.target.value)
                  if (isNaN(r)) {
                    block.transform.rotation = 0
                  } else {
                    block.transform.rotation = parseInt(e.target.value)
                  }
                  console.log(block)
                  setBlock(block)
                }
                }
              ></Input>
              <Button variant={"secondary"} onClick={() => {
                setBlocks(blocks.filter(b => b.id != selectedElement?.id))
              }}>
                Delete
              </Button>
            </div>
            : (<>
              <Button variant="outline" className="rounded-full"
                onClick={
                  () => addBlock("md")
                }
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
                Add Markdown
              </Button>
              <Button variant="outline" className="rounded-full"
                onClick={
                  () => addBlock("arrow")
                }
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 19.5-15-15m0 0v11.25m0-11.25h11.25" />
                </svg>
                Add arrow
              </Button>
              <Button variant="outline" className="rounded-full"
                onClick={
                  () => addBlock("box")
                }
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6" />
                </svg>
                Add box
              </Button>
              <Button variant="outline" className="rounded-full"
                onClick={
                  () => addBlock("circle")
                }
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Add circle
              </Button>
            </>)}
        </div>
      </div>
      <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
        {blocks.map(b => renderBlock(b))}
      </TransformComponent>
    </TransformWrapper>
  </div>
}
