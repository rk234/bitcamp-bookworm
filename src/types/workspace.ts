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
  type: "markdown"
  transform: BoardBlockTransform
  markdown: string
}

export type ArrowBlock = {
  type: "arrow"
  transform: BoardBlockTransform
}

export type DrawingBlock = {
  type: "drawing"
  transform: BoardBlockTransform
  //TODO: idk what to put here lol
}

export type BoardBlock = MarkdownBlock | ArrowBlock | DrawingBlock
