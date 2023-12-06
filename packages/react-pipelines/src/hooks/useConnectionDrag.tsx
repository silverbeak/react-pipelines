import { useEffect, useState } from 'react'
import { parseBlockData } from '../utils/BlockParser'
import { BlockData } from '../utils/BlockUtils'
import { ConnectionLineData, TemporaryConnectionLineData } from '../utils/ConnectionUtils'

const useConnectionDrag = (
  blockData: BlockData[],
  connectionLineData: ConnectionLineData[],
  offsetX: number,
  offsetY: number,
  onConnectionLineUpdate: (connectionLineData: ConnectionLineData[]) => void = () => {},
) => {
  const [connectionLinesData, setConnectionLines] = useState<(ConnectionLineData | TemporaryConnectionLineData)[]>([])
  const [currentConnectionLine, setCurrentConnectionLine] = useState<TemporaryConnectionLineData | null>(null)

  const onOutputConnectionPointDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.stopPropagation()
    event.dataTransfer.setData('originConnectionPoint', event.currentTarget.id)
    const originConnectionPointId = event.currentTarget.id
    const originParentBlock = blockData.find((block) => block.id === originConnectionPointId.split('-')[0])!

    const x2 = event.clientX + window.scrollX - offsetX
    const y2 = event.clientY + window.scrollY - offsetY
    
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
    if (currentConnectionLine) {
      const x2 = event.clientX + window.scrollX - offsetX
      const y2 = event.clientY + window.scrollY - offsetY

      const newConnectionLine = Object.assign({}, currentConnectionLine, { x: x2, y: y2 })
      // Filter out old "temporary" connection line and add the updated one
      const filteredConnectionLines = connectionLinesData.filter((connectionLine) => connectionLine.key !== 'xxx')
      setConnectionLines([...filteredConnectionLines, newConnectionLine])
      setCurrentConnectionLine(newConnectionLine)

    }
  }

  const onOutputConnectionPointDragEnd = () => {
    // Remove the current connection line. If it is not dropped on an input connection point, it will be removed
    // If it is dropped on an input connection point, it will be saved in the onInputConnectionLineDrop function
    setConnectionLines((lines) => lines.filter((line) => line.key !== 'xxx'))
    setCurrentConnectionLine(null)
    const newConnectionLines = connectionLinesData.filter((line) => line.key !== 'xxx')
    if (newConnectionLines.length === connectionLinesData.length) {
      onConnectionLineUpdate(newConnectionLines as ConnectionLineData[])
    } else {
      console.log('Not saving connection lines', newConnectionLines)
    }
  }

  const onInputConnectionLineDrop = (event: React.DragEvent<HTMLDivElement>) => {
    // Create a new key for the connection line. We can't know the full key until we know the target connection point
    const newKey = `${event.dataTransfer.getData('originConnectionPoint')}#${event.currentTarget.id}`

    const targetParentBlock = blockData.find((block) => block.id === event.currentTarget.parentElement?.id)!

    // Convert to ConnectionLineData
    const newConnectionLineData = Object.assign({}, currentConnectionLine, {
      id: newKey,
      key: newKey,
      destinationBlockId: targetParentBlock.id,
      destinationConnectionPointId: event.currentTarget.id,
    })

    // Add to connection line data
    setConnectionLines((lines) => {
      const filteredLines = lines.filter((line) => line.key !== 'xxx').filter((line) => line.key !== newKey)
      const newLines = [...filteredLines, newConnectionLineData]
      return newLines
    })
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
    }, {
      onDragBlockStart: () => {},
      onDragBlockEnd: () => {},
    }),
  )

  return { blocks, connectionLinesData }
}

export default useConnectionDrag
