interface BlockData {
  id: string
  blockType: string
  transformData: TransformData
  children: JSX.Element[]
  [key: string]: string | number | boolean | TransformData | JSX.Element[] | undefined
}

interface TransformData {
  translateX: number
  translateY: number
}

export { type BlockData, type TransformData }
