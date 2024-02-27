interface BlockContentData {
  id: string
  contentType: string
  [key: string]: string | number | boolean | (() => JSX.Element[]) | undefined
}

interface BlockData {
  id: string
  blockType: string
  transformData: TransformData
  blockContentData: BlockContentData
  renderer?: () => JSX.Element[]
  [key: string]: string | number | boolean | TransformData | BlockContentData | (() => JSX.Element[]) | undefined
}

interface TransformData {
  translateX: number
  translateY: number
}

export { type BlockData, type TransformData, type BlockContentData }
