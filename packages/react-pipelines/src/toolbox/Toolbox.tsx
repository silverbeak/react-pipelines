const Toolbox = ({ children }: { children: React.ReactNode }) => {
  // console.log('Toolbox children', children)

  return (
    <div>
      {children}
      <div>Toolbox</div>
      <div
        draggable="true"
        onDrag={(event) => {
          console.log('Drag event', event)
        }}
        onDragStart={(event) => {
          console.log('Drag start event', event)
          event.dataTransfer.setData('blockType', 'start')
          event.dataTransfer.setData('movedBlockId', 'newBlock')
        }}
        onDragEnd={(event) => {
          console.log('Drag end event', event)
        }}
      >
        Start block
      </div>

      <div
        draggable="true"
        onDrag={(event) => {
          console.log('Drag event', event)
        }}
        onDragStart={(event) => {
          console.log('Drag start event', event)
          event.dataTransfer.setData('blockType', 'mid')
          event.dataTransfer.setData('movedBlockId', 'newBlock')
        }}
        onDragEnd={(event) => {
          console.log('Drag end event', event)
        }}
      >
        Mid block
      </div>

      <div
        draggable="true"
        onDrag={(event) => {
          console.log('Drag event', event)
        }}
        onDragStart={(event) => {
          console.log('Drag start event', event)
          event.dataTransfer.setData('blockType', 'end')
          event.dataTransfer.setData('movedBlockId', 'newBlock')
        }}
        onDragEnd={(event) => {
          console.log('Drag end event', event)
        }}
      >
        End block
      </div>
    </div>
  )
}

export default Toolbox
