import React from 'react'
import BaseBlock from './BaseBlock'
import { usePipelineDrag } from '../hooks/usePipelineDrag'
import {
  ErrorInputConnectionPoint,
  ErrorOutputConnectionPoint,
  InputConnectionPoint,
  OutputConnectionPoint,
} from '../connections/ConnectionPoint'

interface MidBlockProps {
  id: string
  children?: React.ReactNode
  draggable?: string
  x?: number
  y?: number
}

const onConnectionLineDrop = (event: React.DragEvent<HTMLDivElement>) => {
  console.log('onConnectionLineDrop', event.currentTarget.id)
  console.log('onConnectionLineDrop', event.dataTransfer.getData('text/plain'))
  event.stopPropagation()
  event.preventDefault()
}

const MidBlock = (props: MidBlockProps) => {
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
      <OutputConnectionPoint id={`${props.id}-connection-point`} />
      <ErrorOutputConnectionPoint id={`${props.id}-error-connection-point`} />
      <InputConnectionPoint
        onDrop={onConnectionLineDrop}
        id={`${props.id}-input-connection-point`}
       />
      <ErrorInputConnectionPoint id={`${props.id}-error-input-connection-point`} />
      {props.children}
      This is a MidBlock
    </BaseBlock>
  )
}

export default MidBlock
