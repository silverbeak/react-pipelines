import React from 'react'
import BaseBlock from './BaseBlock'

interface StartBlockProps {
  id: string
  children?: React.ReactNode
  draggable?: string
  x?: number
  y?: number
}

const StartBlock = (props: StartBlockProps) => {
  const [x, setX] = React.useState(props.x || 0)
  const [y, setY] = React.useState(props.y || 0)

  const transformData = {
    translateX: x,
    translateY: y,
  }

  const [originX, setOriginX] = React.useState(0)
  const [originY, setOriginY] = React.useState(0)

  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    setOriginX(event.clientX)
    setOriginY(event.clientY)
  }

  const onDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    // This is basically reverse collision detection. If we drop the block outside the designated area, we reset the position.
    const parentRect = event.currentTarget.parentElement?.getClientRects()[0]

    const upperBound = parentRect?.top || 0
    const lowerBound = parentRect?.bottom || 0
    const leftBound = parentRect?.left || 0
    const rightBound = parentRect?.right || 0

    const insideBounds =
      event.clientX > leftBound &&
      event.clientX < rightBound &&
      event.clientY > upperBound &&
      event.clientY < lowerBound

    if (insideBounds) {
      console.log('insideBounds', insideBounds, event.currentTarget.id)
      const newX = event.clientX - originX + x
      const newY = event.clientY - originY + y
      setX(newX)
      setY(newY)
    } else {
      setX(x)
      setY(y)
    }
  }

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
