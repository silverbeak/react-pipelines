export interface ConnectionLineData {
  key: string
  id: string
  originBlockId: string
  originConnectionPointId: string
  destinationBlockId: string
  destinationConnectionPointId: string
}

export interface TemporaryConnectionLineData {
  key: string
  id: string
  originBlockId: string
  originConnectionPointId: string
  x: number
  y: number
}
