import { BlockData, ConnectionLineData } from "@trollmoj/react-pipelines"

type PipelineData = {
  id: string
  name: string
  blocks: BlockData[]
  connections: ConnectionLineData[]
}

export { PipelineData }