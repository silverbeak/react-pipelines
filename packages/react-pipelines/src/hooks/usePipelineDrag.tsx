import * as React from 'react'

export function usePipelineDrag(startX: number = 0, startY: number = 0) {
  const [x, setX] = React.useState(startX)
  const [y, setY] = React.useState(startY)

  const transformData = {
    translateX: x,
    translateY: y,
  }

  const [originX, setOriginX] = React.useState(0)
  const [originY, setOriginY] = React.useState(0)

  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('movedBlockId', event.currentTarget.id)
    event.dataTransfer.setData('originX', (x - event.clientX).toString())
    event.dataTransfer.setData('originY', (y - event.clientY).toString())
    setOriginX(event.clientX)
    setOriginY(event.clientY)
  }

  const onDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    // This is not a favourite of mine. Is there a better way to find out if this is a connection drag?
    const target = event.target as HTMLElement
    const isConnectionElement = target.id.includes('output') || target.id.includes('input')

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

    if (insideBounds && !isConnectionElement) {
      const newX = event.clientX - originX + x
      const newY = event.clientY - originY + y
      setX(newX)
      setY(newY)
    } else {
      setX(x)
      setY(y)
    }
  }

  return { transformData, onDragStart, onDragEnd }
}
