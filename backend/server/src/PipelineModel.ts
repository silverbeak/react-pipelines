import { BlockData, ConnectionLineData } from "react-pipelines"

type PipelineData = {
  id: string
  name: string
  blocks: BlockData[]
  connections: ConnectionLineData[]
}

export { PipelineData }