import * as React from 'react'

export function usePipelineDrag(startX?: number, startY?: number) {
  const [x, setX] = React.useState(startX || 0)
  const [y, setY] = React.useState(startY || 0)

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
      // console.log('insideBounds', insideBounds, event.currentTarget.id)
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
