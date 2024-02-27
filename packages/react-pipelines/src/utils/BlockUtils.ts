interface BlockContentData {
  id: string
  contentType: string
  children?: () => JSX.Element[]
  [key: string]: string | number | boolean | (() => JSX.Element[]) | undefined
}

interface BlockData {
  id: string
  blockType: string
  transformData: TransformData
  blockContentData: BlockContentData
  [key: string]: string | number | boolean | TransformData | BlockContentData | undefined
}

interface TransformData {
  translateX: number
  translateY: number
}

export { type BlockData, type TransformData, type BlockContentData }
