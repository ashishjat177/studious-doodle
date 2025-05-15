import './App.css'
import ToastContainer, { useToast } from './components/ToastContainer'

function App() {
  const { showToast } = useToast();

  return (
    <div>
      <div className='btn-container'>
         <button className='success' onClick={() => showToast('success')}>Success toast</button>
         <button className='error' onClick={() => showToast('error')}>Error toast</button>
         <button className='info' onClick={() => showToast('info')}>Info toast</button>
         <button className='warning' onClick={() => showToast('warning')}>Warning toast</button>
      </div>
      <ToastContainer/>
      
    </div>
  )
}

export default App
