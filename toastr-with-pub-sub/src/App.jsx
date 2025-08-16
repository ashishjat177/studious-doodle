import './App.css'
import { toastr } from './constant'

function App() {

  return (
      <div>
          <button onClick={() => toastr.success('success')}>success</button>
          <button onClick={() => toastr.error('error')}>error</button>
          <button onClick={() => toastr.info('info')}>info</button>
          <button onClick={() => toastr.warning('warning')}>warning</button>
      </div>
  )
}

export default App
