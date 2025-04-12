export type Workspace = {
  id: string,
  name: string,
  ownerId: string,
  boardIds: string[]
}

export type Board = {
  id: string,
  name: string,
  workspaceId: string,
  blocks: BoardBlock[]
}

export type BoardBlockTransform = {
  x: number,
  y: number,
  width: number,
  height: number,
  rotation: number
}

export type MarkdownBlock = {
  id: string
  type: "markdown"
  transform: BoardBlockTransform
  markdown: string
}

export type SVGBlock = {
  id: string
  type: "svg"
  svg: React.ReactNode
  transform: BoardBlockTransform
}

export type BoardBlock = MarkdownBlock | SVGBlock
