import React from 'react'
import BaseBlock from './BaseBlock'
import { usePipelineDrag } from '../hooks/usePipelineDrag'
import { ErrorOutputConnectionPoint, OutputConnectionPoint } from '../connections/ConnectionPoint'
import { DragConnectionLineProps } from '../utils/BlockParser'
import { TransformData } from '../utils/BlockUtils'

interface StartBlockProps {
  id: string
  children?: React.ReactNode
  draggable?: string
  transformData: TransformData
}

const StartBlock = (props: StartBlockProps & DragConnectionLineProps) => {
  const { transformData, onDragStart, onDragEnd } = usePipelineDrag(
    props.transformData.translateX,
    props.transformData.translateY,
  )

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
