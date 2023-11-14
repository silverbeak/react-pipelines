import { useState } from 'react'
import { parseBlockData } from '../utils/BlockParser'
import { ConnectionSvgLineProps } from '../connections/ConnectionLine'
import { BlockData } from '../utils/BlockUtils'

const useConnectionDrag = (blockData: BlockData[]) => {
  const [connectionLines, setConnectionLines] = useState<ConnectionSvgLineProps[]>([])
  const [currentConnectionLine, setCurrentConnectionLine] = useState<ConnectionSvgLineProps | null>(null)
  const [currentLineId, setCurrentLineId] = useState<number>(1)

  const calculatePosition = (event: React.DragEvent<HTMLDivElement>, baseX: number, baseY: number) => {
    const originConnection = event.currentTarget
    const parentBlock = blockData.find((block) => block.id === originConnection.parentElement?.id)!
    const {translateX, translateY} = parentBlock.transformData || {translateX: 0, translateY: 0}

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

  const calculateOriginPosition = (event: React.DragEvent<HTMLDivElement>) => {
    const originConnection = event.currentTarget
    const position = calculatePosition(
      event,
      originConnection.getBoundingClientRect().x,
      originConnection.getBoundingClientRect().y,
    )

    return { x1: position.x1, y1: position.y1, x2: position.x1, y2: position.y1 }
  }

  const calculateUpdatedPosition = (event: React.DragEvent<HTMLDivElement>) => {
    const position = calculatePosition(event, event.clientX, event.clientY)
    return { x2: position.x1, y2: position.y1 }
  }

  const onOutputConnectionPointDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('originConnectionPoint', event.currentTarget.id)
    const { x1, y1, x2, y2 } = calculateOriginPosition(event)
    const connectionLine = { x1: x1, y1: y1, x2: x2, y2: y2, key: currentLineId.toString() }
    setConnectionLines([...connectionLines, connectionLine])
    setCurrentConnectionLine(connectionLine)
  }

  const onOutputConnectionPointDrag = (event: React.DragEvent<HTMLDivElement>) => {
    if (currentConnectionLine) {
      const { x2, y2 } = calculateUpdatedPosition(event)
      const { x1, y1 } = currentConnectionLine
      const newConnectionLine = {
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        key: currentLineId.toString(),
      }
      // Filter out old connection line
      const filteredConnectionLines = connectionLines.filter(
        (connectionLine) => connectionLine.key !== currentLineId.toString(),
      )
      setConnectionLines([...filteredConnectionLines, newConnectionLine])
    }
  }

  const onOutputConnectionPointDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    event.stopPropagation()

    setCurrentConnectionLine(null)
    setCurrentLineId(currentLineId + 1)
  }

  const onInputConnectionLineDrop = (event: React.DragEvent<HTMLDivElement>) => {
    console.log('onConnectionLineDrop', event.currentTarget.id)
    console.log('onConnectionLineDrop', event.dataTransfer.getData('originConnectionPoint'))
    // TODO: This is where we need to create a connection and save it somehow
    // event.stopPropagation()
    // event.preventDefault()
  }

  const blocks = blockData?.map((block) =>
    parseBlockData(block, {
      onConnectionLineDraw: onOutputConnectionPointDragStart,
      onConnectionLineDrag: onOutputConnectionPointDrag,
      onConnectionLineDragEnd: onOutputConnectionPointDragEnd,
      onConnectionLineDrop: onInputConnectionLineDrop,
    }),
  )

  return { blocks, connectionLines }
}

export default useConnectionDrag
