import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import { twMerge } from "tailwind-merge";
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism'

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
      remarkPlugins={[remarkMath, remarkParse]}
      components={{
        code(props) {
          const { children, className, ...rest } = props
          const match = /language-(\w+)/.exec(className || '')
          return match ? (
            <SyntaxHighlighter
              PreTag="div"
              children={String(children).replace(/\n$/, '')}
              language={match[1]}
              style={nightOwl}
            />
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          )
        }
      }}
    >
      {md}
    </Markdown>
  </div>
}
