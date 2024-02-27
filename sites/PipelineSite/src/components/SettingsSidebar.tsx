import styled from 'styled-components'
import { BlockProps } from '../renderers/DefaultBlock'

const SettingsBar = styled.div`
  background-color: #eee;
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 10px;
  margin: 10px;
  min-width: 400px;

  background-color: #000;
`

const PrettyInputField = styled.input`
  padding: 10px;
  margin: 10px;
  border-radius: 3px;
  border: 1px solid #ddd;
  background-color: #222;
  color: #bbb;
`

export const SettingsSidebar = function (blockProps: BlockProps) {
  return (
    <SettingsBar>
      <h2>Settings</h2>
      <p>Settings go here for {blockProps.blockContentData.contentType}</p>
      <br />
      <PrettyInputField type="text" placeholder="Enter some text" />
      <br />
      <PrettyInputField type="text" placeholder="Enter some more text" />
      <br />

      <button onClick={() => window.dispatchEvent(new CustomEvent('closeSettingsModal'))}>Close</button>
    </SettingsBar>
  )
}
