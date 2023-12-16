import { useState } from 'react'
import './App.css'

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Welcome to Our Count Home Page</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={() => setCount(0)}>
          clear all counter.
        </button>
      </div>
    </>
  )
}

export default App
