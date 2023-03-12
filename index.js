import express from 'express'
import cors from 'cors'

class Observable {
  constructor () {
    this.observers = new Set()
  }

  subscribe (func) {
    this.observers.add(func)

    return () => {
      this.observers.delete(func)
    }
  }

  publish (data) {
    for (const func of this.observers) {
      func(data)
    }
  }
}

const app = express()
const observable = new Observable()

app.use(cors())

let count = 0

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.post('/count', (req, res) => {
  count += 1
  observable.publish(count)
  res.sendStatus(200)
})

app.get('/events', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache'
  })

  res.write('retry: 10000\n\n')

  const func = (data) => {
    res.write(`data: ${data}\n\n`)
  }
  func(count)

  const unsubscribe = observable.subscribe(func)

  req.on('close', () => {
    unsubscribe()
    console.log('Connection closed')
  })
})

const port = 3000
app.listen(port, () => {
  console.log(`Running on port ${port}`)
})
