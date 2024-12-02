import styled from 'styled-components'
import { BlockContentData, BlockData } from './utils/BlockUtils'
import { ConnectionCanvas } from './connections/ConnectionLine'
import useConnectionDrag from './hooks/useConnectionDrag'
import { ConnectionLineData } from './utils/ConnectionUtils'
import useConnectionDraw from './hooks/useConnectionDraw'
import Toolbox from './toolbox/Toolbox'
import { parseBlockData } from './utils/BlockParser'
import { ToolBlockDefinition } from './toolbox/ToolBlock'
import React from 'react'
import useConnectionRightClick from './hooks/useConnectionClick'

interface FlowBoardProps {
  id: string
  blockData: BlockData[]
  toolBlockDefinitions: ToolBlockDefinition[]
  connectionLineData: ConnectionLineData[]
  onConnectionLineUpdate: (connectionLineData: ConnectionLineData[]) => void
  onBlockUpdate: (blockData: BlockData[]) => void
  renderBlock: (blockContentData: BlockContentData) => JSX.Element[]
  renderTool: (toolBlockDefinition: ToolBlockDefinition) => JSX.Element[]
  showToolbox: boolean
}

const Board = styled.div`
  position: relative;
  background-size: 16px 16px;
  background-color: #151515;
  background-image: radial-gradient(rgba(105, 105, 105, 1) 1px, transparent 1px);
  width: 90vw;
  height: 100%;
`

const FlowBoard = ({ blockData, ...props }: FlowBoardProps) => {
  const mainBoardRef = React.useRef<HTMLDivElement | null>(null)

  const {
    connectionLinesData,
    onOutputConnectionPointDragStart,
    onOutputConnectionPointDrag,
    onOutputConnectionPointDragEnd,
    onInputConnectionLineDrop,
  } = useConnectionDrag(
    blockData,
    props.connectionLineData,
    mainBoardRef.current?.getBoundingClientRect()?.x || 0,
    mainBoardRef.current?.getBoundingClientRect()?.y || 0,
    props.onConnectionLineUpdate,
  )

  const { svgConnectionLines } = useConnectionDraw(connectionLinesData, blockData)

  const {
    handleConnectionLineRightClick,
  } = useConnectionRightClick(
    props.connectionLineData,
    props.onConnectionLineUpdate
  )

  const dragBlock = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const dropBlock = (event: React.DragEvent<HTMLDivElement>) => {
    const movedBlockId = event.dataTransfer.getData('movedBlockId')

    if (movedBlockId === 'newBlock') {
      // BlockType is either "start", "mid" or "end". Here, we create a new block of that type. The block will be
      // positioned where the user dropped it, compensating for the scroll position.
      const blockType = event.dataTransfer.getData('blockType')
      const contentType = event.dataTransfer.getData('contentType')

      const scrollX = window.scrollX
      const scrollY = window.scrollY

      const newBlockId = Math.random().toString(36).substring(7)


      const blockContentData = {
        id: newBlockId,
        contentType: contentType,
      }

      const newBlock: BlockData = {
        id: newBlockId,
        key: newBlockId,
        draggable: 'true',
        blockType,
        blockContentData,
        renderer: () => props.renderBlock(blockContentData), //renderChild(blockContentData),
        transformData: {
          translateX: event.clientX - (mainBoardRef.current?.getBoundingClientRect()?.x || 0) - scrollX,
          translateY: event.clientY - (mainBoardRef.current?.getBoundingClientRect()?.y || 0) - scrollY,
        },
      }

      const newBlocks = [...blockData, newBlock]
      props.onBlockUpdate(newBlocks)
    } else {
      const originalX = event.dataTransfer.getData('originX')
      const originalY = event.dataTransfer.getData('originY')
      const newBlocks = blockData.map((block) => {
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
      })
      props.onBlockUpdate(newBlocks)
    }
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
        onDragBlockStart: () => { },
        onDragBlockEnd: () => { },
      },
    ),
  )

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      height: '100%',
      width: '100%',
      minHeight: 0,
    }}>
      <div style={{
        flex: '1',
        overflowY: 'scroll',
        height: '95%',
        overflow: 'scroll',
        minHeight: 0,
      }}>
        {props.showToolbox && <Toolbox toolblocks={props.toolBlockDefinitions} renderer={props.renderTool} />}
      </div>
      <div style={{
        flex: '5',
        overflow: 'hidden',
        height: '95%',
      }}>
        <Board
          id={props.id}
          className="flow-board"
          onDragOver={dragBlock}
          onDrop={dropBlock}
          ref={el => mainBoardRef.current = el}
        >
          {blocks}
          <ConnectionCanvas key="connection-canvas" lines={svgConnectionLines} onLineRightClick={handleConnectionLineRightClick}/>
        </Board>
      </div>

    </div>
  )
}

export default FlowBoard
