import { useEffect, useState } from 'react'
import './App.css'


const RADIUS = 25;
const COLORS = ['red', 'black', 'yellow', 'pink', 'gray', 'blue', 'green', 'lightgreen', 'brown', 'white']

function App() {
  const [circles, setCircles] = useState([]);

  const getColor = (x, y, allCircles) => {
      for(const circle of allCircles) {
        const circleX = circle.left + RADIUS;
        const circleY = circle.top + RADIUS;
        const distance = Math.sqrt((circleX - x)**2 + (circleY - y)**2)
        if(distance < RADIUS*2) {
          return 'green';
        } 
     };
     return null;
  }

  const drawCircle = (e) => {
    const {clientX, clientY} = e;
     // for position top - half the hieght of circle
    setCircles((prev) => {
       const color = getColor(clientX, clientY, prev);
       const newCircle = {left: clientX - 25,top: clientY - 25 , color: color || 'white'} 
      return [...prev, newCircle]
    });
  }
 
  useEffect(() => {
    document.addEventListener('click', drawCircle)

    return () => document.removeEventListener('click', drawCircle);
  }, []);
  return (
    <div className='main-container' style={{position: 'relative'}}>
      {circles.map((circle, index) => (
        <div className='circle' style={{ top: circle.top, left: circle.left, backgroundColor: circle.color }}>{index}</div>
      ))}
    </div>
  )
}

export default App
