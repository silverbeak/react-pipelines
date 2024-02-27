import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BlockData, ConnectionLineData, FlowBoard, ToolBlockDefinition } from 'react-pipelines'
import { useEffect, useState } from 'react'
import { BlockContentData } from '../../../packages/react-pipelines/dist/utils/BlockUtils'
import { getPipelineData, getToolBlockDefinitions, setPipelineData } from './api/PipelineAPI'

function App() {
  const [blockData, setBlockData] = useState<BlockData[]>()
  const [connectionLineData, setConnectionLineData] = useState<ConnectionLineData[]>()
  const [toolBlockDefinitions, setToolBlockDefinitions] = useState<ToolBlockDefinition[]>()

  function updatePipelineData(newBlockData?: BlockData[], newConnectionLineData?: ConnectionLineData[]) {
    setPipelineData({
      blockData: newBlockData ?? blockData!,
      connectionLineData: newConnectionLineData ?? connectionLineData!,
    })

    if (newBlockData) {
      setBlockData(newBlockData)
    }

    if (newConnectionLineData) {
      setConnectionLineData(newConnectionLineData)
    }
  }

  const renderBlock = function (blockContentData: BlockContentData) {
    switch (blockContentData.contentType) {
      case 'Main Input':
        return [<div>Block with content type {blockContentData.contentType}</div>]
      case 'Pipeline Block':
        return [<div>Block with content type {blockContentData.contentType}</div>]
      case 'Main Output':
        return [<div>Block with content type {blockContentData.contentType}</div>]
      default:
        return [<div>Block with unknown content type {blockContentData.contentType}</div>]
    }
  }

  useEffect(() => {
    async function arrangeToolbox() {
      const toolBlockDefinitions = await getToolBlockDefinitions()
      setToolBlockDefinitions(toolBlockDefinitions)
    }

    async function arrangeData() {
      const pipelineData = await getPipelineData()
      const blockData = pipelineData.blockData as BlockData[]

      blockData.forEach((block: BlockData) => {
        const blockContentData: BlockContentData = {
          id: block.id,
          contentType: block.blockContentData.contentType,
        }
        block.renderer = () => renderBlock(blockContentData)
      })

      const connectionLineData = pipelineData.connectionLineData as ConnectionLineData[]

      setBlockData(blockData)
      setConnectionLineData(connectionLineData)
    }

    arrangeData()
    arrangeToolbox()
  }, [])

  if (!blockData) {
    return <div>Loading...</div>
  }

  if (!connectionLineData) {
    return <div>Loading...</div>
  }

  if (!toolBlockDefinitions) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <FlowBoard
        id="main-flow-board"
        showToolbox={true}
        blockData={blockData}
        connectionLineData={connectionLineData}
        toolBlockDefinitions={toolBlockDefinitions}
        onBlockUpdate={(blocks) => updatePipelineData(blocks, undefined)}
        onConnectionLineUpdate={(lines) => updatePipelineData(undefined, lines)}
        renderBlock={renderBlock}
      />
    </>
  )
}

export default App
