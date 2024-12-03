import { ToolBlockDefinition } from "@trollmoj/react-pipelines"

function BlockBase(tool: ToolBlockDefinition): JSX.Element {
  return (
    <div>
      <h5>
        {tool.contentType}
      </h5>
      <div>
        {tool.icon &&
          <img height={50} width={50} src={`data:image/svg+xml;utf8,${encodeURIComponent(tool.icon!)}`} />
        }
      </div>
      <div>
        {tool.name}
      </div>
    </div>
  )
}


export const renderTool = function (tool: ToolBlockDefinition): JSX.Element[] {
  return [BlockBase(tool)]
}