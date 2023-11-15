import { useCallback, useEffect, useState } from 'react'
import { ConnectionLineData, TemporaryConnectionLineData } from '../utils/ConnectionUtils'
import { BlockData } from '../utils/BlockUtils'
import { ConnectionSvgLineProps } from '../connections/ConnectionLine'
import { calculatePosition } from '../utils/PositionCalculator'

const identifyConnectionBlock = (blockData: BlockData[], connectionLineData: ConnectionLineData) => {
  const originBlock = blockData.find((block) => block.id === connectionLineData.originBlockId)!
  const destinationBlock = blockData.find((block) => block.id === connectionLineData.destinationBlockId)!
  return { originBlock, destinationBlock }
}

type CalculatePositionSign = (
  originConnection: HTMLElement,
  blockData: BlockData[],
  baseX: number,
  baseY: number,
) => {
  x1: number
  y1: number
}

const useConnectionDraw = (
  connectionLineData: (ConnectionLineData | TemporaryConnectionLineData)[],
  blockData: BlockData[],
) => {
  const [svgConnectionLines, setSvgConnectionLines] = useState<ConnectionSvgLineProps[]>([])

  const addLineToCollection = (line: ConnectionSvgLineProps) => {
    setSvgConnectionLines((lines) => {
      // Remove old line from collection, and replace it with our new line
      const filteredLines = lines.filter((oldLine) => oldLine.key !== line.key).filter((line) => line.key !== 'xxx')
      return [...filteredLines, line]
    })
  }

  const drawConnectionLine = useCallback(
    (connectionLine: ConnectionLineData, calculatePosition: CalculatePositionSign, blockData: BlockData[]) => {
      const { originBlock, destinationBlock } = identifyConnectionBlock(blockData, connectionLine)
      const outputType = connectionLine.originConnectionPointId.split('-')[1]
      const inputType = connectionLine.destinationConnectionPointId.split('-')[1]
      const originConnection = document.getElementById(`${originBlock.id}-${outputType}`)
      const destinationConnection = document.getElementById(`${destinationBlock.id}-${inputType}`)
      if (originConnection && destinationConnection) {
        const originPosition = calculatePosition(
          originConnection,
          blockData,
          originConnection.getBoundingClientRect().x,
          originConnection.getBoundingClientRect().y,
        )

        const destinationPosition = calculatePosition(
          destinationConnection,
          blockData,
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

        addLineToCollection(line)
      }
    },
    [],
  )

  const drawTempConnectionLine = useCallback(
    (connectionLine: TemporaryConnectionLineData, calculatePosition: CalculatePositionSign, blockData: BlockData[]) => {
      const originBlock = blockData.find((block) => block.id === connectionLine.originBlockId)!
      const outputType = connectionLine.originConnectionPointId.split('-')[1]
      const originConnection = document.getElementById(`${originBlock.id}-${outputType}`)
      if (originConnection) {
        const originPosition = calculatePosition(
          originConnection,
          blockData,
          originConnection.getBoundingClientRect().x,
          originConnection.getBoundingClientRect().y,
        )

        const line = {
          x1: originPosition.x1,
          y1: originPosition.y1,
          x2: connectionLine.x,
          y2: connectionLine.y,
          key: connectionLine.id,
        }

        addLineToCollection(line)
      }
    },
    [],
  )

  useEffect(() => {
    const savedConnectionLines: ConnectionLineData[] = connectionLineData.filter(
      (connectionLine) => connectionLine.key !== 'xxx',
    ) as ConnectionLineData[]

    const tempConnectionLines: TemporaryConnectionLineData[] = connectionLineData.filter(
      (connectionLine) => connectionLine.key === 'xxx',
    ) as TemporaryConnectionLineData[]

    savedConnectionLines.forEach((connectionLine) => drawConnectionLine(connectionLine, calculatePosition, blockData))
    tempConnectionLines.forEach((connectionLine) =>
      drawTempConnectionLine(connectionLine, calculatePosition, blockData),
    )
  }, [connectionLineData, blockData, drawConnectionLine, drawTempConnectionLine])

  return { svgConnectionLines }
}

export default useConnectionDraw
