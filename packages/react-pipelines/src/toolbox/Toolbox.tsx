import ToolBlock, { ToolBlockDefinition } from "./ToolBlock"

interface ToolboxProps {
  toolblocks: ToolBlockDefinition[]
}

const Toolbox = (props: ToolboxProps) => {
  return (
    <div>
      {
        props.toolblocks.map((toolblock) => {
          return <ToolBlock key={toolblock.name} tool={toolblock} />
        })
      }
    </div>
  )
}

export default Toolbox
