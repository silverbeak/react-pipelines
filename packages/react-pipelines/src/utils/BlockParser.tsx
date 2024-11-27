import React from 'react'
import BaseBlock from '../blocks/BaseBlock'
import { BlockData } from './BlockUtils'
import StartBlock from '../blocks/StartBlock'
import MidBlock from '../blocks/MidBlock'
import EndBlock from '../blocks/EndBlock'

export interface DragConnectionLineProps {
  onConnectionLineDragStart: (event: React.DragEvent<HTMLDivElement>) => void
  onConnectionLineDrag: (event: React.DragEvent<HTMLDivElement>) => void
  onConnectionLineDragEnd: (event: React.DragEvent<HTMLDivElement>) => void
  onConnectionLineDrop: (event: React.DragEvent<HTMLDivElement>) => void,
  removeConnectionLine: (key: string) => void
}

export interface DragBlockProps {
  onDragBlockStart: (event: React.DragEvent<HTMLDivElement>) => void
  onDragBlockEnd: (event: React.DragEvent<HTMLDivElement>) => void
}

function parseBlockData(
  input: BlockData,
  connectionLinesProps: DragConnectionLineProps,
  dragBlockProps: DragBlockProps,
): React.ReactElement {
  switch (input.blockType) {
    case 'start':
      return (
        <StartBlock {...input} {...connectionLinesProps} {...dragBlockProps} key={input.id}>
          {input.renderer && input.renderer()}
        </StartBlock>
      )
    case 'mid':
      return (
        <MidBlock {...input} {...connectionLinesProps} key={input.id}>
          {input.renderer && input.renderer()}
        </MidBlock>
      )
    case 'end':
      return (
        <EndBlock {...input} {...connectionLinesProps} {...dragBlockProps} key={input.id}>
          {input.renderer && input.renderer()}
        </EndBlock>
      )

    default:
      return <BaseBlock {...input} key={input.id}>{input.renderer && input.renderer()}</BaseBlock>
  }
}

export { parseBlockData }
