import { useCallback, useEffect, useState } from 'react'
import { parseBlockData } from '../utils/BlockParser'
import { ConnectionSvgLineProps } from '../connections/ConnectionLine'
import { BlockData } from '../utils/BlockUtils'
import { ConnectionLineData } from '../utils/ConnectionUtils'

const identifyConnectionBlock = (blockData: BlockData[], connectionLineData: ConnectionLineData) => {
  const originBlock = blockData.find((block) => block.id === connectionLineData.originBlockId)!
  const destinationBlock = blockData.find((block) => block.id === connectionLineData.destinationBlockId)!
  return { originBlock, destinationBlock }
}

type CalculatePositionSign = (
  originConnection: HTMLElement,
  baseX: number,
  baseY: number,
) => {
  x1: number
  y1: number
}

const useConnectionDrag = (blockData: BlockData[], connectionLineData: ConnectionLineData[]) => {
  const [connectionLines, setConnectionLines] = useState<ConnectionSvgLineProps[]>([])
  const [currentConnectionLine, setCurrentConnectionLine] = useState<ConnectionSvgLineProps | null>(null)

  const calculatePosition = useCallback(
    (originConnection: HTMLElement, baseX: number, baseY: number) => {
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
    },
    [blockData],
  )

  const calculateOriginPosition = (event: React.DragEvent<HTMLDivElement>) => {
    const originConnection = event.currentTarget
    const position = calculatePosition(
      originConnection,
      originConnection.getBoundingClientRect().x,
      originConnection.getBoundingClientRect().y,
    )

    return { x1: position.x1, y1: position.y1, x2: position.x1, y2: position.y1 }
  }

  const calculateUpdatedPosition = (event: React.DragEvent<HTMLDivElement>) => {
    const position = calculatePosition(event.currentTarget, event.clientX, event.clientY)
    return { x2: position.x1, y2: position.y1 }
  }

  const onOutputConnectionPointDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.stopPropagation()
    event.dataTransfer.setData('originConnectionPoint', event.currentTarget.id)
    const { x1, y1, x2, y2 } = calculateOriginPosition(event)
    const connectionLine = { x1: x1, y1: y1, x2: x2, y2: y2, key: 'xxx' }
    setConnectionLines([...connectionLines, connectionLine])
    setCurrentConnectionLine(connectionLine)
  }

  const drawConnectionLine = (
    connectionLine: ConnectionLineData,
    calculatePosition: CalculatePositionSign,
    blockData: BlockData[],
  ) => {
    const { originBlock, destinationBlock } = identifyConnectionBlock(blockData, connectionLine)
    const outputType = connectionLine.originConnectionPointId.split('-')[1]
    const inputType = connectionLine.destinationConnectionPointId.split('-')[1]
    const originConnection = document.getElementById(`${originBlock.id}-${outputType}`)
    const destinationConnection = document.getElementById(`${destinationBlock.id}-${inputType}`)
    console.log('drawConnectionLine', originConnection, destinationConnection)
    if (originConnection && destinationConnection) {
      const originPosition = calculatePosition(
        originConnection,
        originConnection.getBoundingClientRect().x,
        originConnection.getBoundingClientRect().y,
      )

      const destinationPosition = calculatePosition(
        destinationConnection,
        destinationConnection.getBoundingClientRect().x,
        destinationConnection.getBoundingClientRect().y,
      )

      const line = {
        x1: originPosition.x1,
        y1: originPosition.y1,
        x2: destinationPosition.x1,
        y2: destinationPosition.y1,
        key: connectionLine.id,
      }

      // setConnectionLineData((lines) => {
      //   // Remove line from lines, and replace it with our new line
      //   const filteredLines = lines.filter((line) => line.key !== connectionLine.id)
      //   const newLines = [...filteredLines, connectionLine]
      //   return newLines
      // })

      setConnectionLines((lines) => {
        console.log('adding connection line', line)
        // Remove line from lines, and replace it with our new line
        const filteredLines = lines
          .filter((line) => line.key !== connectionLine.id)
          .filter((line) => line.key !== 'xxx')
        const newLines = [...filteredLines, line]
        console.log('newLines', newLines)
        return newLines
      })
    }
  }

  useEffect(() => {
    connectionLineData.forEach((connectionLine) => drawConnectionLine(connectionLine, calculatePosition, blockData))
  }, [blockData, calculatePosition, connectionLineData])

  const onOutputConnectionPointDrag = (event: React.DragEvent<HTMLDivElement>) => {
    console.log('onOutputConnectionPointDrag')
    event.stopPropagation()
    // event.dataTransfer.setData('ConnectionPoint', event.currentTarget.id)
    if (currentConnectionLine) {
      const { x2, y2 } = calculateUpdatedPosition(event)
      const { x1, y1 } = currentConnectionLine
      const newConnectionLine = {
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        key: 'xxx',
      }
      // Filter out old connection line
      const filteredConnectionLines = connectionLines.filter((connectionLine) => connectionLine.key !== 'xxx')
      setConnectionLines([...filteredConnectionLines, newConnectionLine])
    }
  }

  const onOutputConnectionPointDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    // event.preventDefault()
    event.dataTransfer.getData('ConnectionPoint')
    // Remove the current connection line. If it is not dropped on an input connection point, it will be removed
    // If it is dropped on an input connection point, it will be saved in the onInputConnectionLineDrop function
    setConnectionLines((lines) => lines.filter((line) => line.key !== 'xxx'))
    setCurrentConnectionLine(null)
  }

  const onInputConnectionLineDrop = (event: React.DragEvent<HTMLDivElement>) => {
    console.log('onConnectionLineDrop', event.currentTarget.id)
    console.log('onConnectionLineDrop', event.dataTransfer.getData('originConnectionPoint'))

    // Create a new key for the connection line
    // TODO: Investigate if this is the best key to use.
    const newKey = `${event.dataTransfer.getData('originConnectionPoint')}#${event.currentTarget.id}`

    const originConnectionPointId = event.dataTransfer.getData('originConnectionPoint')
    const originParentBlock = blockData.find((block) => block.id === originConnectionPointId.split('-')[0])!
    const targetParentBlock = blockData.find((block) => block.id === event.currentTarget.parentElement?.id)!

    // Convert to ConnectionLineData
    const connectionLineData: ConnectionLineData = {
      id: newKey,
      key: newKey,
      originBlockId: originParentBlock.id, // TODO: This is not right!
      originConnectionPointId: originConnectionPointId,
      destinationBlockId: targetParentBlock.id,
      destinationConnectionPointId: event.currentTarget.id,
    }

    drawConnectionLine(connectionLineData, calculatePosition, blockData)

    // TODO: Prevent collision with other connection lines. If there is a collision, remove the new connection line
  }

  const blocks = blockData?.map((block) =>
    parseBlockData(block, {
      onConnectionLineDragStart: onOutputConnectionPointDragStart,
      onConnectionLineDrag: onOutputConnectionPointDrag,
      onConnectionLineDragEnd: onOutputConnectionPointDragEnd,
      onConnectionLineDrop: onInputConnectionLineDrop,
    }),
  )

  return { blocks, connectionLines, connectionLineData }
}

export default useConnectionDrag
