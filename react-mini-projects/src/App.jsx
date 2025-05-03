import { useState } from 'react'
import './App.css'
import Popover from './components/popover/Popover'

function App() {
  const [showPage, setShowPage] = useState(0)

  return (
    <div>
      <Popover>
        <Popover.Action>click me</Popover.Action>
        <Popover.Content>hello content</Popover.Content>
      </Popover>
    </div>
  )
}

export default App
