import { useState } from 'react'
import './App.css'
import VirtualScroll from './components/virtualScroll/VirtualScroll'
import VirtualScrollWithObservable from './components/virtualScrollingWithObservable/VirtualScrollingWithObservable'
import VirtualScrollFrontendMaster from './components/virtualScrollFrontendMaster/VirtualSCrollFrontendMaster'
import Virtualization from './components/virtualization/Virtualization'
import Virtualization1 from './components/virtualization/Virtualization1'

function App() {
  const [count, setCount] = useState(50);
  const list = Array.from({length: 10000}, ((_, index) => index + 1))

  return (
   <div>
    {/* <VirtualScroll count={count} setCount={setCount}/> */}
    {/* <VirtualScrollWithObservable count={count} setCount={setCount}/> */}
    {/* <VirtualScrollFrontendMaster /> */}
    <Virtualization1 list={list} height={600} itemHeight={30} width={300}/>
    {/* <Virtualization list={list} height={600} itemHeight={20} width={300}/> */}
   </div>
  )
}

export default App

