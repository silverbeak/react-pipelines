export interface ToolBlockDefinition {
  name: string
  blockType: 'start' | 'mid' | 'end'
  contentType: string
}

export interface ToolBlockProps {
  key: string
  tool: ToolBlockDefinition
}

const ToolBlock = ({ tool, ...props }: ToolBlockProps) => {
  return (
    <div
      key={props.key}
      draggable="true"
      onDrag={(event) => {
        console.log('Dragstart event', event)
      }}
      onDragStart={(event) => {
        event.dataTransfer.setData('blockType', tool.blockType)
        event.dataTransfer.setData('contentType', tool.contentType)
        event.dataTransfer.setData('movedBlockId', 'newBlock')
      }}
      onDragEnd={(event) => {
        console.log('Dragend for', tool.blockType, 'event', event)
      }}
    >
      {tool.contentType}
    </div>
  )
}

export default ToolBlock
