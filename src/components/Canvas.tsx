import { twMerge } from "tailwind-merge"
import {
  TransformWrapper,
  TransformComponent,
} from "react-zoom-pan-pinch";
import {
  Resizable
} from "re-resizable"
import MarkdownRenderer from "./MarkdownRenderer";

type CanvasProps = {
  className?: string
}
export default function Canvas({ className }: CanvasProps) {

  const md = `
  # Header
  
  Some text

  An equation $f(x) = \\frac{1}{x}$.

  ![alt text](https://picsum.photos/200/300)
`
  return <div className={twMerge("w-full h-full bg-blue-500", className)}>
    <TransformWrapper limitToBounds={false}>
      <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
        <Resizable >
          <MarkdownRenderer className="bg-muted p-4 rounded" md={md}></MarkdownRenderer>
        </Resizable>
      </TransformComponent>
    </TransformWrapper>
  </div>
}
