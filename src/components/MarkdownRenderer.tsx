import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import { twMerge } from "tailwind-merge";

type MarkdownRendererProps = {
  md: string,
  className: string
}

export default function MarkdownRenderer({ md, className }: MarkdownRendererProps) {
  return <div className={twMerge(`prose prose-slate leading-snug prose-invert 
            prose-headings:mt-5 prose-headings:mb-2 prose-ul:mt-0 
            prose-pre:bg-transparent prose-pre:p-0 prose-li:my-1`, className)}>
    <Markdown
      rehypePlugins={[rehypeKatex]}
      remarkPlugins={[remarkMath, remarkParse]}>
      {md}
    </Markdown>
  </div>
}
