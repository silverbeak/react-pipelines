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
        blockData={[
          {
            key: 'startblock1',
            id: 'startblock1',
            blockType: 'start',
            draggable: 'true',
            transformData: {
              translateX: 100,
              translateY: 100,
            },
          },
          {
            key: 'midblock1',
            id: 'midblock1',
            blockType: 'mid',
            draggable: 'true',
            transformData: {
              translateX: 500,
              translateY: 150,
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
        onBlockUpdate={(blocks) => console.log('Block update', blocks)}
        onConnectionLineUpdate={(lines) => console.log('Connection line update', lines)}
      />
      <div className="card">
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  )
}

export default App
