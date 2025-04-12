export type Workspace = {
  id: string,
  name: string,
  ownerId: string,
  boardIds: string[]
}

export type Board = {
  id: string,
  name: string,
  workspaceId: string
  blocks: BoardBlock[]
}

export type BoardBlockTransform = {
  position: { x: number, y: number }
  size: { width: number, height: number }
  rotation: number
}

export type MarkdownBlock = {
  transform: BoardBlockTransform
  markdown: string
}

export type ArrowBlock = {
  transform: BoardBlockTransform
}

export type DrawingBlock = {
  transform: BoardBlockTransform
  //TODO: idk what to put here lol
}

export type BoardBlock = MarkdownBlock | ArrowBlock | DrawingBlock
