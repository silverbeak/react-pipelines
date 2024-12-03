import { BlockContentData } from '@trollmoj/react-pipelines'
import { DefaultBlock } from './DefaultBlock'

export const renderBlock = function (blockContentData: BlockContentData) {
  switch (blockContentData.contentType) {
    case 'Main Input':
      return [DefaultBlock({ blockContentData })]
    case 'Pipeline Block':
      return [DefaultBlock({ blockContentData })]
    case 'Main Output':
      return [DefaultBlock({ blockContentData })]
    default:
      return [<div>Block with unknown content type {blockContentData.contentType}</div>]
  }
}
