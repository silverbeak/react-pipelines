import styled from 'styled-components'
import { BlockData } from './utils/BlockUtils'
import { ConnectionCanvas } from './connections/ConnectionLine'
import useConnectionDrag from './hooks/useConnectionDrag'
import { useState } from 'react'
import { ConnectionLineData } from './utils/ConnectionUtils'
import useConnectionDraw from './hooks/useConnectionDraw'
import Toolbox from './toolbox/Toolbox'
import { parseBlockData } from './utils/BlockParser'
import { ToolBlockDefinition } from './toolbox/ToolBlock'

interface FlowBoardProps {
  id: string
  blockData: BlockData[]
  toolBlockDefinitions: ToolBlockDefinition[]
  connectionLineData: ConnectionLineData[]
  onConnectionLineUpdate: (connectionLineData: ConnectionLineData[]) => void
  onBlockUpdate: (blockData: BlockData[]) => void
  showToolbox: boolean
}

const Board = styled.div`
  position: relative;
  background-size: 16px 16px;
  background-color: #151515;
  background-image: radial-gradient(rgba(105, 105, 105, 1) 1px, transparent 1px);
  width: 90vw;
  height: 90vh;
`

const FlowBoard = (props: FlowBoardProps) => {
  const [blockData, setBlockData] = useState<BlockData[]>(props.blockData)
  const [boundaryRect, setBoundaryRect] = useState<{ x: number; y: number } | null>(null)

  const {
    connectionLinesData,
    onOutputConnectionPointDragStart,
    onOutputConnectionPointDrag,
    onOutputConnectionPointDragEnd,
    onInputConnectionLineDrop,
  } = useConnectionDrag(
    blockData,
    props.connectionLineData,
    boundaryRect?.x || 0,
    boundaryRect?.y || 0,
    props.onConnectionLineUpdate,
  )

  const { svgConnectionLines } = useConnectionDraw(connectionLinesData, blockData)

  const dragBlock = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const dropBlock = (event: React.DragEvent<HTMLDivElement>) => {
    const movedBlockId = event.dataTransfer.getData('movedBlockId')

    if (movedBlockId === 'newBlock') {
      const blockType = event.dataTransfer.getData('blockType')
      // BlockType is either "start", "mid" or "end". Here, we create a new block of that type. The block will be
      // positioned where the user dropped it, compensating for the scroll position.

      const scrollX = window.scrollX
      const scrollY = window.scrollY

      const newBlockId = Math.random().toString(36).substring(7)

      // TODO: This should have a key, right?
      const children = [<div>Dropped {blockType} block</div>]

      const newBlock: BlockData = {
        id: newBlockId,
        key: newBlockId,
        draggable: 'true',
        blockType,
        children: children,
        transformData: {
          translateX: event.clientX - boundaryRect!.x - scrollX,
          translateY: event.clientY - boundaryRect!.y - scrollY,
        },
      }

      setBlockData((blocks) => [...blocks, newBlock])
    } else {
      const originalX = event.dataTransfer.getData('originX')
      const originalY = event.dataTransfer.getData('originY')
      setBlockData((blocks) =>
        blocks.map((block) => {
          if (block.id === movedBlockId) {
            const newX = event.clientX + parseInt(originalX)
            const newY = event.clientY + parseInt(originalY)
            return {
              ...block,
              transformData: {
                translateX: newX,
                translateY: newY,
              },
            }
          }
          return block
        }),
      )
    }

    props.onBlockUpdate(blockData)
  }

  const blocks = blockData?.map((block) =>
    parseBlockData(
      block,
      {
        onConnectionLineDragStart: onOutputConnectionPointDragStart,
        onConnectionLineDrag: onOutputConnectionPointDrag,
        onConnectionLineDragEnd: onOutputConnectionPointDragEnd,
        onConnectionLineDrop: onInputConnectionLineDrop,
      },
      {
        onDragBlockStart: () => {},
        onDragBlockEnd: () => {},
      },
    ),
  )

  return (
    <div>
      {props.showToolbox && <Toolbox toolblocks={props.toolBlockDefinitions} />}

      <Board
        id={props.id}
        className="flow-board"
        onDragOver={dragBlock}
        onDrop={dropBlock}
        ref={(el) => {
          if (!!el && !boundaryRect) {
            const rect = el.getBoundingClientRect()
            const x = rect.left
            const y = rect.top
            setBoundaryRect({ x, y })
          }
        }}
      >
        {blocks}
        <ConnectionCanvas key="connection-canvas" lines={svgConnectionLines} />
      </Board>
    </div>
  )
}

export default FlowBoard
