import styled from "styled-components"

export interface ToolBlockDefinition {
  name: string
  blockType: 'start' | 'mid' | 'end'
  contentType: string
}

export interface ToolBlockProps {
  key: string
  tool: ToolBlockDefinition
}

const Tool = styled.div`
  display: flex;
  flex-direction: row;
  margin: 5px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 3px;
`

const ToolBlock = ({ tool, ...props }: ToolBlockProps) => {
  return (
    <Tool
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
    </Tool>
  )
}

export default ToolBlock
