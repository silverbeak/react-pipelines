import React from 'react'
import BaseBlock from './BaseBlock'
import { usePipelineDrag } from '../hooks/usePipelineDrag'
import { ErrorOutputConnectionPoint, OutputConnectionPoint } from '../connections/ConnectionPoint'
import { DragConnectionLineProps } from '../utils/BlockParser'

interface StartBlockProps {
  id: string
  children?: React.ReactNode
  draggable?: string
  x?: number
  y?: number
}

const StartBlock = (props: StartBlockProps & DragConnectionLineProps) => {
  const { transformData, onDragStart, onDragEnd } = usePipelineDrag(props.x, props.y)

  return (
    <BaseBlock
      key={props.id}
      id={props.id}
      draggable={props.draggable === 'true'}
      $transformData={transformData}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <OutputConnectionPoint
        id={`${props.id}-connection-point`}
        draggable="true"
        onDragStart={props.onConnectionLineDraw}
        onDrag={props.onConnectionLineDrag}
        onDragEnd={props.onConnectionLineDragEnd}
      />
      <ErrorOutputConnectionPoint id={`${props.id}-error-connection-point`} />
      {props.children}
      This is a StartBlock
    </BaseBlock>
  )
}

export default StartBlock
