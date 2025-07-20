import { useState, useEffect, useRef } from 'react'
import './App.css'
import CounterField from './components/CounterField'
import { COUNTER_UNITS } from './counter.constant';
import { useCallback } from 'react';

function App() {
  const [isActive, setIsActive] = useState(false)
  const [timerValue, setTimerValue] = useState({hours: '', minutes: '', seconds: ''});
  const stopwatchInterval = useRef(null)
       

  const handleOnChange = useCallback((value, id) => {
    //sanitize for negative value
    value = Math.max(parseInt(value, 10) || 0, 0);
    const counterValue = {...timerValue};
    counterValue[id] = value;
    counterValue['minutes'] += Math.floor(counterValue.seconds /60);
    counterValue['seconds'] = counterValue.seconds % 60;

    counterValue['hours'] += Math.floor(counterValue.minutes / 60);
    counterValue['minutes'] = counterValue.minutes % 60;
    setTimerValue(counterValue);
  }, [])

  useEffect(() => {
      if(!isActive) {
        clearInterval(stopwatchInterval.current);
        return;
      }

      stopwatchInterval.current = setInterval(() => {
        setTimerValue((prev) => {
          const timer = {...prev}
          if(timer.seconds > 0) {
            timer.seconds--;
          } else if(timer.minutes > 0) {
            timer.minutes --;
            timer.seconds = 59;
          } else if(timer.hours > 0) {
            timer.hours--;
            timer.minutes = 59;
            timer.seconds = 59;
          }
          if(timer.minutes === 0 && timer.hours === 0 && timer.seconds === 0) {
            clearInterval(stopwatchInterval.current);
            setIsActive(false);
          }
          return timer
      });
        
      }, 1000);

      return () => { clearInterval(stopwatchInterval.current) }
  }, [isActive])

  const onStartStop = () => {
    setIsActive((prev) => !prev);
  }

  const onReset = () => {
    setTimerValue({hours: 0, minutes: 0, seconds: 0});
    clearInterval(stopwatchInterval.current);
    setIsActive(false);
  }

  const isTimeZero = timerValue.hours === 0 && timerValue.minutes === 0 && timerValue.seconds === 0;

  return (
    <div className='main-container'>
      <CounterField timerValue={timerValue} onChange={handleOnChange}/>
      <div className='action-div'>
        <button disabled={!isActive && isTimeZero} onClick={onStartStop}>{isActive ? 'stop' : 'start'}</button>
        <button onClick={onReset}>reset</button>
      </div>
    </div>
  )
}

export default App
