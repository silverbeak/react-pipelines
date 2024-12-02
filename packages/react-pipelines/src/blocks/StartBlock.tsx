import React from 'react'
import BaseBlock from './BaseBlock'
import { usePipelineDrag } from '../hooks/usePipelineDrag'
import { ErrorOutputConnectionPoint, OutputConnectionPoint } from '../connections/ConnectionPoint'
import { DragBlockProps, DragConnectionLineProps, ConnectionPointProps } from '../utils/BlockParser'
import { TransformData } from '../utils/BlockUtils'

interface StartBlockProps {
  id: string
  children?: React.ReactNode
  draggable?: string
  transformData: TransformData
}

const StartBlock = (props: StartBlockProps & DragConnectionLineProps & DragBlockProps & ConnectionPointProps) => {
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
        id={`${props.id}-output`}
        draggable="true"
        onDragStart={props.onConnectionLineDragStart}
        onDrag={props.onConnectionLineDrag}
        onDragEnd={props.onConnectionLineDragEnd}
        onContextMenu= {(event) => props.onConnectionPointRightClick(`${props.id}-output`, event)}
      />
      <ErrorOutputConnectionPoint 
        id={`${props.id}-erroroutput`} 
        draggable="true"
        onDragStart={props.onConnectionLineDragStart}
        onDrag={props.onConnectionLineDrag}
        onDragEnd={props.onConnectionLineDragEnd}
        onContextMenu= {(event) => props.onConnectionPointRightClick(`${props.id}-erroroutput`, event)}
      />
      {props.children}
    </BaseBlock>
  )
}

export default StartBlock
