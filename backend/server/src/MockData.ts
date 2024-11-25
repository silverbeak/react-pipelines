import { ToolBlockDefinition } from '@trollmoj/react-pipelines'
import { BlockData, ConnectionLineData } from '@trollmoj/react-pipelines'

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
  { name: 'Start block', blockType: 'start', contentType: 'Main Input', icon: '<svg viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#cccccc" d="M4 0v6h1.7l0.2 0.7 0.2 0.6c0 0 0.1 0 0.1 0l1.2-0.6 1.8 1.8-0.6 1.2c0 0 0 0.1 0 0.1l0.6 0.2 0.7 0.2v0.2l6.1-3.4-12-7z"></path> <path fill="#cccccc" d="M4.5 10.5c-0.2 0-0.4 0.1-0.5 0.2-0.3 0.2-0.5 0.5-0.5 0.8s0.2 0.7 0.5 0.8c0.1 0.1 0.3 0.2 0.5 0.2 0.6 0 1-0.4 1-1s-0.4-1-1-1z"></path> <path fill="#cccccc" d="M9 12v-1l-1.1-0.4c-0.1-0.3-0.2-0.6-0.4-0.9l0.5-1-0.7-0.7-1 0.5c-0.3-0.2-0.6-0.3-0.9-0.4l-0.4-1.1h-1l-0.4 1.1c-0.3 0.1-0.6 0.2-0.9 0.4l-1-0.5-0.7 0.7 0.5 1.1c-0.2 0.3-0.3 0.6-0.4 0.9l-1.1 0.3v1l1.1 0.4c0.1 0.3 0.2 0.6 0.4 0.9l-0.5 1 0.7 0.7 1.1-0.5c0.3 0.2 0.6 0.3 0.9 0.4l0.3 1.1h1l0.4-1.1c0.3-0.1 0.6-0.2 0.9-0.4l1 0.5 0.7-0.7-0.5-1.1c0.2-0.3 0.3-0.6 0.4-0.9l1.1-0.3zM4.5 13.5c-1.1 0-2-0.9-2-2s0.9-2 2-2 2 0.9 2 2c0 1.1-0.9 2-2 2z"></path> </g></svg>' },
  { name: 'Mid block', blockType: 'mid', contentType: 'Pipeline Block', icon: '<svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1.5 0C0.671573 0 0 0.671573 0 1.5C0 2.32843 0.671573 3 1.5 3C2.15311 3 2.70873 2.5826 2.91465 2H4.5C5.88071 2 7 3.11929 7 4.5V10.5C7 12.433 8.567 14 10.5 14H12.0854C12.2913 14.5826 12.8469 15 13.5 15C14.3284 15 15 14.3284 15 13.5C15 12.6716 14.3284 12 13.5 12C12.8469 12 12.2913 12.4174 12.0854 13H10.5C9.11929 13 8 11.8807 8 10.5V4.5C8 2.567 6.433 1 4.5 1H2.91465C2.70873 0.417404 2.15311 0 1.5 0Z" fill="#cccccc"></path> </g></svg>'},
  { name: 'End block', blockType: 'end', contentType: 'Main Output', icon: '<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="1" y="1" width="14" height="14" fill="#cccccc"></rect> </g></svg>'},
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
