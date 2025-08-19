import { useState } from 'react'
import './App.css'
import Modal from './components/Modal'

function App() {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  }

  return (
    <>
    <button onClick={() => setIsOpen(true)}>showModal</button>
      <Modal isOpen={isOpen} handleClose={handleClose} title={'modal title'}/>
    </>
  )
}

export default App
