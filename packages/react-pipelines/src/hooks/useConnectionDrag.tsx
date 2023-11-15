import { useEffect, useState } from 'react'
import { parseBlockData } from '../utils/BlockParser'
import { BlockData } from '../utils/BlockUtils'
import { ConnectionLineData, TemporaryConnectionLineData } from '../utils/ConnectionUtils'

const useConnectionDrag = (
  blockData: BlockData[],
  connectionLineData: ConnectionLineData[],
  offsetX: number,
  offsetY: number,
) => {
  const [connectionLinesData, setConnectionLines] = useState<(ConnectionLineData | TemporaryConnectionLineData)[]>([])
  const [currentConnectionLine, setCurrentConnectionLine] = useState<TemporaryConnectionLineData | null>(null)

  const onOutputConnectionPointDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.stopPropagation()
    event.dataTransfer.setData('originConnectionPoint', event.currentTarget.id)
    const originConnectionPointId = event.currentTarget.id
    const originParentBlock = blockData.find((block) => block.id === originConnectionPointId.split('-')[0])!
    const { x2, y2 } = { x2: event.clientX - offsetX, y2: event.clientY - offsetY }
    const connectionLine: TemporaryConnectionLineData = {
      id: 'xxx',
      key: 'xxx',
      originBlockId: originParentBlock.id,
      originConnectionPointId,
      x: x2,
      y: y2,
    }
    setConnectionLines([...connectionLinesData, connectionLine])
    setCurrentConnectionLine(connectionLine)
  }

  const onOutputConnectionPointDrag = (event: React.DragEvent<HTMLDivElement>) => {
    event.stopPropagation()
    // event.dataTransfer.setData('ConnectionPoint', event.currentTarget.id)
    const originConnectionPointId = event.currentTarget.id
    const originParentBlock = blockData.find((block) => block.id === originConnectionPointId.split('-')[0])!
    if (currentConnectionLine) {
      const { x2, y2 } = { x2: event.clientX - offsetX, y2: event.clientY - offsetY }
      const newConnectionLine: TemporaryConnectionLineData = {
        key: 'xxx',
        id: 'xxx',
        originBlockId: originParentBlock.id,
        originConnectionPointId,
        x: x2,
        y: y2,
      }
      // Filter out old connection line
      const filteredConnectionLines = connectionLinesData.filter((connectionLine) => connectionLine.key !== 'xxx')
      setConnectionLines([...filteredConnectionLines, newConnectionLine])
      setCurrentConnectionLine(newConnectionLine)
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

    // Add to connection line data
    setConnectionLines((lines) => {
      // Remove line from lines, and replace it with our new line
      const filteredLines = lines.filter((line) => line.key !== 'xxx')
      const newLines = [...filteredLines, connectionLineData]
      return newLines
    })

    // TODO: Prevent collision with other connection lines. If there is a collision, remove the new connection line
  }

  useEffect(() => {
    setConnectionLines(connectionLineData)
  }, [connectionLineData])

  const blocks = blockData?.map((block) =>
    parseBlockData(block, {
      onConnectionLineDragStart: onOutputConnectionPointDragStart,
      onConnectionLineDrag: onOutputConnectionPointDrag,
      onConnectionLineDragEnd: onOutputConnectionPointDragEnd,
      onConnectionLineDrop: onInputConnectionLineDrop,
    }),
  )

  return { blocks, connectionLinesData }
}

export default useConnectionDrag
