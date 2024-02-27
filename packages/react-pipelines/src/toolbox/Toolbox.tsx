import styled from "styled-components"
import ToolBlock, { ToolBlockDefinition } from "./ToolBlock"

interface ToolboxProps {
  toolblocks: ToolBlockDefinition[]
}

const ToolSection = styled.div`
  display: flex;
  flex-direction: row;
  margin: 5px;
  padding: 5px;
  border: 1px solid #eee;
  border-radius: 3px;
`

const Toolbox = (props: ToolboxProps) => {
  return (
    <ToolSection>
      {
        props.toolblocks.map((toolblock) => {
          return <ToolBlock key={toolblock.name} tool={toolblock} />
        })
      }
    </ToolSection>
  )
}

export default Toolbox
