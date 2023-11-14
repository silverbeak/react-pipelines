import styled from 'styled-components'
import { BlockData } from './utils/BlockUtils'
import { ConnectionCanvas } from './connections/ConnectionLine'
import useConnectionDrag from './hooks/useConnectionDrag'

interface FlowBoardProps {
  id: string
  blockData: BlockData[]
}

const Board = styled.div`
  position: relative;
  background-size: 16px 16px;
  background-color: #151515;
  background-image: radial-gradient(rgba(105, 105, 105, 1) 1px, transparent 1px);
  width: 90vw;
  height: 90vh;
`

const dragStuff = (event: React.DragEvent<HTMLDivElement>) => {
  // console.log('dragStuff', event.clientX, event.clientY)
  event.preventDefault()
}

const dropStuff = (event: React.DragEvent<HTMLDivElement>) => {
  // console.log('dropStuff', event.clientX, event.clientY)
  event.preventDefault()
}

const FlowBoard = (props: FlowBoardProps) => {
  const { blocks, connectionLines } = useConnectionDrag(props.blockData)

  return (
    <Board id={props.id} className="flow-board" onDragOver={dragStuff} onDrop={dropStuff}>
      {blocks}
      <ConnectionCanvas key="connection-canvas" lines={connectionLines} />
    </Board>
  )
}

export default FlowBoard
