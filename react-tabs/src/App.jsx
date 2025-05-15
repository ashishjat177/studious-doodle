import { useState } from 'react'
import './App.css'
import Tabs from './components/Tabs'
import { data } from './constant'
import { useEffect } from 'react';

function App() {
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    const url = new URLSearchParams(window.location.search);
    const tabId = url.get('tabId');
    if(tabId) {
      setSelectedTab(parseInt(tabId));
    }

  }, []);

  return (
    <>
      <Tabs tabsData={data} onChangeTabHandler={() => {}} selectedTab={selectedTab}/>
    </>
  )
}

export default App
