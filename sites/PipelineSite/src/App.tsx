import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BlockData, ConnectionLineData, FlowBoard } from 'react-pipelines'
import { useEffect, useState } from 'react'

function App() {
  const [blockData, setBlockData] = useState<BlockData[]>()
  const [connectionLineData, setConnectionLineData] = useState<ConnectionLineData[]>()

  function updatePipelineData(newBlockData?: BlockData[], newConnectionLineData?: ConnectionLineData[]) {
    fetch('http://localhost:8000/pipeline/1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        blockData: newBlockData ?? blockData,
        connectionLineData: newConnectionLineData ?? connectionLineData,
      }),
    })

    if (newBlockData) {
      setBlockData(newBlockData)
    }

    if (newConnectionLineData) {
      setConnectionLineData(newConnectionLineData)
    }
  }

  useEffect(() => {
    console.log('App mounted')
    fetch('http://localhost:8000/pipeline/1')
      .then((response) => response.json())
      .then((data) => {
        console.log('Data:', data)
        const blockData = data.blockData as BlockData[]
        blockData.forEach((block: BlockData) => {
          block.children = [<div key={block.id}>Child block</div>]
        })

        const connectionLineData = data.connectionLineData as ConnectionLineData[]

        setBlockData(blockData)
        setConnectionLineData(connectionLineData)
      })
  }, [])

  if (!blockData) {
    return <div>Loading...</div>
  }

  if (!connectionLineData) {
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
        toolBlockDefinitions={[
          { name: 'Start block', blockType: 'start' },
          { name: 'Mid block', blockType: 'mid' },
          { name: 'End block', blockType: 'end' },
        ]}
        onBlockUpdate={(blocks) => updatePipelineData(blocks, undefined)}
        onConnectionLineUpdate={(lines) => updatePipelineData(undefined, lines)}
      />
    </>
  )
}

export default App
