import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

const eventSource = new window.EventSource('http://localhost:3000/events')

eventSource.onmessage = function (event) {
  console.log('new message', event.data)
}

function App () {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <div>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
