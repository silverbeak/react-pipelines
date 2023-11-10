import React from 'react'
import BaseBlock from '../blocks/BaseBlock'
import { BlockData } from './BlockUtils'
import StartBlock from '../blocks/StartBlock'

function parseBlockData(input: BlockData): React.ReactElement {
  switch (input.blockType) {
    case 'start':
      return <StartBlock {...input} />
    default:
      return <BaseBlock {...input} />
  }
}

export { parseBlockData }
