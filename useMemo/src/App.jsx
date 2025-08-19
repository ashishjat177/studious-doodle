import { useState } from 'react'
import './App.css'
import { useMemo } from 'react'
import useCustomMemo from './hooks/useCustomMemo'

function App() {
  const [count, setCount] = useState(0)
  const [input, setInput] = useState(null)

  const expensiveFunc = () => {
    console.log('start', Date.now())
    for(let i = 0; i < 10000; i++) {}
     console.log('end', Date.now())
    return count*2;
  }

  const doubleCount = useCustomMemo(() => expensiveFunc(), [count]);

  return (
    <div>
      <p>Double Count: {doubleCount}</p>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      <input value={input} type='text' placeholder='type something' onChange={(e) => setInput(e.target.value)}/>
    </div>
  )
}

export default App
