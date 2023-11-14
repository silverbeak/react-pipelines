interface BlockData {
  id: string
  blockType: string
  transformData: TransformData
  [key: string]: string | number | boolean | TransformData | undefined
}

interface TransformData {
  translateX: number
  translateY: number
}

export { type BlockData, type TransformData }
