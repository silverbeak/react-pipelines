import styled from "styled-components"
import ToolBlock, { ToolBlockDefinition } from "./ToolBlock"

interface ToolboxProps {
  toolblocks: ToolBlockDefinition[]
  renderer: (tool: ToolBlockDefinition) => JSX.Element[]
}

const ToolSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;
  padding: 3px;
  border: 1px solid #eee;
  border-radius: 3px;
  scrollbar-width: thin;
`

const Toolbox = (props: ToolboxProps) => {
  return (
    <ToolSection>
      {
        props.toolblocks.map((toolblock) => {
          return (
            <ToolBlock key={toolblock.name} tool={toolblock} >
              {props.renderer(toolblock)}
            </ToolBlock>
          )
        })
      }
    </ToolSection>
  )
}

export default Toolbox
