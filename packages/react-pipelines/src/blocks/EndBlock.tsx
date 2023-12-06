import React from 'react'
import BaseBlock from './BaseBlock'
import { usePipelineDrag } from '../hooks/usePipelineDrag'
import { ErrorInputConnectionPoint, InputConnectionPoint } from '../connections/ConnectionPoint'
import { DragBlockProps, DragConnectionLineProps } from '../utils/BlockParser'
import { TransformData } from '../utils/BlockUtils'

interface EndBlockProps {
  id: string
  children?: React.ReactNode
  draggable?: string
  transformData: TransformData
}

const EndBlock = (props: EndBlockProps & DragConnectionLineProps & DragBlockProps) => {
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
      <InputConnectionPoint
        id={`${props.id}-output`}
        draggable="true"
        onDragStart={props.onConnectionLineDragStart}
        onDrag={props.onConnectionLineDrag}
        onDragEnd={props.onConnectionLineDragEnd}
      />
      <ErrorInputConnectionPoint 
        id={`${props.id}-erroroutput`} 
        draggable="true"
        onDragStart={props.onConnectionLineDragStart}
        onDrag={props.onConnectionLineDrag}
        onDragEnd={props.onConnectionLineDragEnd}
      />
      {props.children}
      This is an EndBlock
    </BaseBlock>
  )
}

export default EndBlock
