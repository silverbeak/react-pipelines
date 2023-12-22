import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { FlowBoard } from 'react-pipelines'

function App() {
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
        blockData={[
          {
            key: 'startblock1',
            id: 'startblock1',
            blockType: 'start',
            draggable: 'true',
            children: [<div key="abc">Pre-defined start block</div>],
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
            children: [<div key="xyz">Pre-defined mid block</div>],
            transformData: {
              translateX: 700,
              translateY: 250,
            },
          },
        ]}
        connectionLineData={[
          {
            key: 'startblock1-erroroutput#midblock1-errorinput',
            id: 'startblock1-erroroutput#midblock1-errorinput',
            originBlockId: 'startblock1',
            originConnectionPointId: 'startblock1-erroroutput',
            destinationBlockId: 'midblock1',
            destinationConnectionPointId: 'midblock1-errorinput',
          },
        ]}
        toolBlockDefinitions={[
          { name: 'Start block', blockType: 'start' },
          { name: 'Mid block', blockType: 'mid' },
          { name: 'End block', blockType: 'end' },
        ]}
        onBlockUpdate={(blocks) => console.log('Block update', blocks)}
        onConnectionLineUpdate={(lines) => console.log('Connection line update', lines)}
      />
    </>
  )
}

export default App
