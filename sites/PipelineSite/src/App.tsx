import './App.css'
import { BlockData, ConnectionLineData, FlowBoard, ToolBlockDefinition } from 'react-pipelines'
import { useEffect, useState } from 'react'
import { BlockContentData } from '../../../packages/react-pipelines/dist/utils/BlockUtils'
import { getPipelineData, getToolBlockDefinitions, setPipelineData } from './api/PipelineAPI'
import { renderBlock } from './renderers/DefaultBlockRenderer'
import { SettingsSidebar } from './components/SettingsSidebar'
import styled from 'styled-components'
import { OpenSettingsModalEvent } from './renderers/DefaultBlock'

function App() {
  const [blockData, setBlockData] = useState<BlockData[]>()
  const [connectionLineData, setConnectionLineData] = useState<ConnectionLineData[]>()
  const [toolBlockDefinitions, setToolBlockDefinitions] = useState<ToolBlockDefinition[]>()
  const [settingsSidebar, setSettingsSidebar] = useState<JSX.Element>()

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

  window.addEventListener('openSettingsModal', (event: unknown) => {
    const eventDetail = event as OpenSettingsModalEvent
    setSettingsSidebar(<SettingsSidebar blockContentData={eventDetail.detail} />)
  })

  window.addEventListener('closeSettingsModal', () => {
    setSettingsSidebar(undefined)
  })

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
    return <div>Loading... (block data)</div>
  }

  if (!connectionLineData) {
    return <div>Loading... (connection line data)</div>
  }

  if (!toolBlockDefinitions) {
    return <div>Loading... (tool block definitions)</div>
  }

  const BoardWithExpandableSettings = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
  `

  return (
    <>
      <BoardWithExpandableSettings>
        <div
          style={{
            flex: '1',
            overflow: 'hidden',
          }}
        >
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
        </div>

        {settingsSidebar}
      </BoardWithExpandableSettings>
    </>
  )
}

export default App
