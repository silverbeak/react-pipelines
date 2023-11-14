import React from 'react'
import BaseBlock from '../blocks/BaseBlock'
import { BlockData } from './BlockUtils'
import StartBlock from '../blocks/StartBlock'
import MidBlock from '../blocks/MidBlock'

export interface DragConnectionLineProps {
  onConnectionLineDraw: (event: React.DragEvent<HTMLDivElement>) => void
  onConnectionLineDrag: (event: React.DragEvent<HTMLDivElement>) => void
  onConnectionLineDragEnd: (event: React.DragEvent<HTMLDivElement>) => void
}

function parseBlockData(input: BlockData, connectionLinesProps: DragConnectionLineProps): React.ReactElement {
  switch (input.blockType) {
    case 'start':
      return <StartBlock {...input} {...connectionLinesProps} />
    case 'mid':
      return <MidBlock {...input} />
    default:
      return <BaseBlock {...input} />
  }
}

export { parseBlockData }
