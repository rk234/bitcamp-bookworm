import { MarkdownBlock } from "@/types/workspace"
import { Resizable } from "re-resizable"

export type MarkdownBlockProps = {
  block: MarkdownBlock
}

export default function MarkdownBoardBlock({ block }: MarkdownBlockProps) {
  return <Resizable className={`top-[]`}>

  </Resizable>

}
