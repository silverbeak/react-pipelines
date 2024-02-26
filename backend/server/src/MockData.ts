import { BlockData, ConnectionLineData } from 'react-pipelines'

const initialBlockData: BlockData[] = [
  {
    key: 'startblock1',
    id: 'startblock1',
    blockType: 'start',
    draggable: 'true',
    children: [],
    transformData: {
      translateX: 300,
      translateY: 100,
    },
  },
  {
    key: 'midblock1',
    id: 'midblock1',
    blockType: 'mid',
    draggable: 'true',
    children: [],
    transformData: {
      translateX: 700,
      translateY: 250,
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
  return [
    { name: 'Start block', blockType: 'start' },
    { name: 'Mid block', blockType: 'mid' },
    { name: 'End block', blockType: 'end' },
  ]
}

export { getPipelineData as getBlockData, setPipelineData as setBlockData, getToolBlockDefinitions }
