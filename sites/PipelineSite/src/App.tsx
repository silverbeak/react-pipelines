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
            transformData: {
              translateX: 100,
              translateY: 100,
            },
          },
          {
            key: 'mid-block',
            id: 'mid-block',
            blockType: 'mid',
            draggable: 'true',
            transformData: {
              translateX: 400,
              translateY: 300,
            },
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
