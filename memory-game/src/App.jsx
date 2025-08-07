import { useEffect, useState } from 'react'
import './App.css'

const generateData = () => {
  let memoryData = Array.from({length: 18}, (_, index) => index + 1);
  memoryData = [...memoryData, ...memoryData].sort(() => Math.random() - 0.5);
  return memoryData.map((item, index) => (
    {
      isFlipped: false,
      id: index,
      num: item,
    }
  ));
}

function App() {
  const [data, setData] = useState(generateData());
  const [flippedCards, setFlippedCards] = useState([]);
  const [isLocked, setIsLocked] = useState(false);

  const handleClick = (id, num, isFlipped) => {
    if(flippedCards.includes(id) || isLocked) {
      return;
    }
    setData((prev) => {
      const updatedData = [...prev];
      updatedData[id] = {...updatedData[id], isFlipped: true}
      return updatedData;
    }) 
    setFlippedCards((prev) => [...prev, id]);
  }

  useEffect(() => {
    if(flippedCards.length === 2) {
      setIsLocked(true);
      setTimeout(() => {
        setIsLocked(false);
        if(flippedCards[0] )
        setFlippedCards([])
      }, 3000);
    }
  }, [flippedCards])

  return (
    <div className='memory-game-container'>
      {data?.map(({isFlipped, id, num}, index) => (
        <button onClick={() => handleClick(id, num, isFlipped, index)} aria-label='hidden-cards' className='box' key={id}>
          { isFlipped ? num : '?' }
        </button>
      ))}
    </div>
  )
}

export default App
