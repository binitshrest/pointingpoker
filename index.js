const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get('/events', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache'
  })

  res.write('retry: 10000\n\n')

  let count = 0
  setInterval(() => {
    res.write(`data: ${count}\n\n`)
    count++
  }, 1000)

  req.on('close', () => {
    console.log('Connection closed')
  })
})

const port = 3000
app.listen(port, () => {
  console.log(`Running on port ${port}`)
})
