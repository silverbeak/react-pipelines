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

export { calculatePosition }
