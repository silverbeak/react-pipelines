import { ToolBlockDefinition } from 'react-pipelines'
import { BlockData, ConnectionLineData } from 'react-pipelines'

const initialBlockData: BlockData[] = [
  {
    key: 'startblock1',
    id: 'startblock1',
    blockType: 'start',
    draggable: 'true',
    transformData: {
      translateX: 300,
      translateY: 100,
    },
    blockContentData: {
      id: 'input1',
      contentType: 'Main Input',
    },
  },
  {
    key: 'midblock1',
    id: 'midblock1',
    blockType: 'mid',
    draggable: 'true',
    transformData: {
      translateX: 700,
      translateY: 250,
    },
    blockContentData: {
      id: 'pipeline1',
      contentType: 'Pipeline Block',
    },
  },
]

const initialConnectionLineData: ConnectionLineData[] = [
  {
    key: 'startblock1-erroroutput#midblock1-errorinput',
    id: 'startblock1-erroroutput#midblock1-errorinput',
    originBlockId: 'startblock1',
    originConnectionPointId: 'startblock1-erroroutput',
    destinationBlockId: 'midblock1',
    destinationConnectionPointId: 'midblock1-errorinput',
  },
]

const initialToolBlockDefinitions: ToolBlockDefinition[] = [
  { name: 'Start block', blockType: 'start', contentType: 'Main Input' },
  { name: 'Mid block', blockType: 'mid', contentType: 'Pipeline Block'},
  { name: 'End block', blockType: 'end', contentType: 'Main Output'},
]

let blockData: BlockData[] = initialBlockData
let connectionLineData: ConnectionLineData[] = initialConnectionLineData

type PipelineData = {
  blockData: BlockData[]
  connectionLineData: ConnectionLineData[]
}

function getPipelineData(): PipelineData {
  return { blockData, connectionLineData }
}

function setPipelineData(newBlockData: PipelineData) {
  blockData = newBlockData.blockData
  connectionLineData = newBlockData.connectionLineData
}

function getToolBlockDefinitions() {
  return initialToolBlockDefinitions
}

export { getPipelineData as getBlockData, setPipelineData as setBlockData, getToolBlockDefinitions }
