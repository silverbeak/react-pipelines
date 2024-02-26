import express from 'express'
import { getBlockData, getToolBlockDefinitions, setBlockData } from './MockData'

const app = express()
const port = process.env.PORT || '8000'
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.get('/pipeline/1', (req, res) => {
  res.json(getBlockData())
})

app.post('/pipeline/1', (req, res) => {
  // Get the data from the request
  const data = req.body
  // Do something with the data
  console.log('Will set new data on the backend:', data)
  setBlockData(data)
})

app.get('/toolbox', (req, res) => {
  res.json(getToolBlockDefinitions())
})

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`)
})
