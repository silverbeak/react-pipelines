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
            key: 'start-block1',
            id: 'start-block1',
            blockType: 'start',
            draggable: 'true',
            x: 100,
            y: 100,
          },
          {
            key: 'start-block2',
            id: 'start-block2',
            blockType: 'start',
            draggable: 'true',
            x: 300,
            y: 300,
          },
        ]}
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
