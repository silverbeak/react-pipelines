import { BlockData } from './BlockUtils'

const calculatePosition = (originConnection: HTMLElement, blockData: BlockData[], baseX: number, baseY: number) => {
  const parentBlock = blockData.find((block) => block.id === originConnection.parentElement?.id)!
  const { translateX, translateY } = parentBlock.transformData || { translateX: 0, translateY: 0 }

  const x1 =
    baseX -
    (originConnection.offsetParent?.getBoundingClientRect().x || 0) +
    originConnection.offsetHeight / 2 +
    translateX!

  const y1 =
    baseY -
    (originConnection.offsetParent?.getBoundingClientRect().y || 0) +
    originConnection.offsetHeight / 2 +
    translateY!

  return { x1, y1 }
}

const calculateOriginPosition = (event: React.DragEvent<HTMLDivElement>, blockData: BlockData[]) => {
  const originConnection = event.currentTarget
  const position = calculatePosition(
    originConnection,
    blockData,
    originConnection.getBoundingClientRect().x,
    originConnection.getBoundingClientRect().y,
  )

  return { x1: position.x1, y1: position.y1, x2: position.x1, y2: position.y1 }
}

const calculateUpdatedPosition = (event: React.DragEvent<HTMLDivElement>, blockData: BlockData[]) => {
  const position = calculatePosition(event.currentTarget, blockData, event.clientX, event.clientY)
  return { x2: position.x1, y2: position.y1 }
}

export { calculatePosition, calculateOriginPosition, calculateUpdatedPosition }
