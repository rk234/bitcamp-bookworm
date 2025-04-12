import { twMerge } from "tailwind-merge"
import {
  TransformWrapper,
  TransformComponent,
} from "react-zoom-pan-pinch";
import {
  Resizable
} from "re-resizable"
import MarkdownRenderer from "./MarkdownRenderer";
import { BoardBlock } from "@/types/workspace";
import useCanvasContext from "@/hooks/useCanvasContext";

type CanvasProps = {
  className?: string,
  blocks: BoardBlock[]
}
export default function Canvas({ className }: CanvasProps) {
  const { selectedElement } = useCanvasContext()

  return <div className={twMerge("w-full h-full bg-blue-500", className)}>
    <TransformWrapper limitToBounds={false}>
      <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
        <Resizable className="absolute top-[100px] left-[500px]">
          <MarkdownRenderer className="bg-muted p-4 rounded" md={""}></MarkdownRenderer>
        </Resizable>
        <Resizable className="absolute top-[500px] left-[500px]">
          <MarkdownRenderer className="bg-muted p-4 rounded" md={""}></MarkdownRenderer>
        </Resizable>
      </TransformComponent>
    </TransformWrapper>
  </div>
}
