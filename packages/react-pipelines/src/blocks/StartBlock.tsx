import React from 'react'
import BaseBlock from './BaseBlock'
import { usePipelineDrag } from '../hooks/usePipelineDrag'

interface StartBlockProps {
  id: string
  children?: React.ReactNode
  draggable?: string
  x?: number
  y?: number
}

const StartBlock = (props: StartBlockProps) => {

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
      This is a StartBlock
      {props.children}
    </BaseBlock>
  )
}

export default StartBlock
