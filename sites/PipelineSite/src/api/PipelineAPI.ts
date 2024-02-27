import { BlockData, ConnectionLineData, ToolBlockDefinition } from 'react-pipelines'

export async function getPipelineData(): Promise<{ blockData: BlockData[]; connectionLineData: ConnectionLineData[] }> {
  return fetch('http://localhost:8000/pipeline/1')
    .then((response) => response.json())
    .then((data) => {
      const blockData = data.blockData as BlockData[]
      const connectionLineData = data.connectionLineData as ConnectionLineData[]
      return { blockData, connectionLineData }
    })
}

export async function getToolBlockDefinitions(): Promise<ToolBlockDefinition[]> {
  const response = await fetch('http://localhost:8000/toolbox')
  const data = await response.json()
  const toolBlockDefinitions = data as ToolBlockDefinition[]
  return toolBlockDefinitions
}

export async function setPipelineData(data: { blockData: BlockData[]; connectionLineData: ConnectionLineData[] }) {
  await fetch('http://localhost:8000/pipeline/1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}
