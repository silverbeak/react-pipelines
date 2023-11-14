import React from 'react'
import BaseBlock from './BaseBlock'
import { usePipelineDrag } from '../hooks/usePipelineDrag'
import {
  ErrorInputConnectionPoint,
  ErrorOutputConnectionPoint,
  InputConnectionPoint,
  OutputConnectionPoint,
} from '../connections/ConnectionPoint'
import { DragConnectionLineProps } from '../utils/BlockParser'
import { TransformData } from '../utils/BlockUtils'

interface MidBlockProps {
  id: string
  children?: React.ReactNode
  draggable?: string
  transformData: TransformData
}

const MidBlock = (props: MidBlockProps & DragConnectionLineProps) => {
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
      <OutputConnectionPoint id={`${props.id}-connection-point`} />
      <ErrorOutputConnectionPoint id={`${props.id}-error-connection-point`} />
      <InputConnectionPoint onDrop={props.onConnectionLineDrop} id={`${props.id}-input-connection-point`} />
      <ErrorInputConnectionPoint id={`${props.id}-error-input-connection-point`} />
      {props.children}
      This is a MidBlock
    </BaseBlock>
  )
}

export default MidBlock
