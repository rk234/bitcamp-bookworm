import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";

type Props = {
  md: string,
}

export default function MarkdownRenderer({ md }: Props) {
  return <div className="prose prose-slate leading-snug my-4 prose-invert 
            prose-headings:mt-5 prose-headings:mb-2 prose-ul:mt-0 
            prose-pre:bg-transparent prose-pre:p-0 prose-li:my-1">
    <Markdown
      rehypePlugins={[rehypeKatex]}
      remarkPlugins={[remarkMath, remarkParse]}>
      {md}
    </Markdown>
  </div>
}
