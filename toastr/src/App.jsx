import { useRef, useState } from 'react'
import './App.css'
import Toastr from './components/Toastr'

function App() {
  const [toastList, setToastList] = useState([])
  const toastRef = useRef({});

  const handleClose = (id) => {
    setToastList((prev) => prev.filter((item) => item.id !== id));
    clearTimeout(toastRef.current[id]);
    delete toastRef.current[id];
  }

  const handleAddToast = (type, message) => {
    const id = new Date().getTime();
    setToastList((prev) => [...prev, {id, type, message: type}]);
    toastRef.current[id] = setTimeout(() => {
      handleClose(id)
    }, 3000);
  }

  return (
    <div>
      <div className='btn-container'>
         <button className='success' onClick={() => handleAddToast('success')}>Success toast</button>
         <button className='error' onClick={() => handleAddToast('error')}>Error toast</button>
         <button className='info' onClick={() => handleAddToast('info')}>Info toast</button>
         <button className='warning' onClick={() => handleAddToast('warning')}>Warning toast</button>
      </div>
      <div className='toast-container'>
      {toastList?.map(({type, message, id}) => (
            <Toastr id={id} type={type} messagText={message} handleClose={handleClose}/>
      ))}
      </div>
    </div>
  )
}

export default App
