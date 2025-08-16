import { useState } from 'react';
import data from '../data.json';
import { useEffect } from 'react';
import { useRef } from 'react';

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const ref = useRef(null);

    const handleNext = () => {
        
        setCurrentIndex((prev) => {
            const nextIndex =  prev === data.length - 1 ? 0 : prev + 1;
            return nextIndex;
        });
    }

    const handlePrev = () => {
       
       setCurrentIndex((prev) => {
            const nextIndex =  prev === 0 ? data.length - 1 : prev - 1; 
            return nextIndex;
       });
    }

    useEffect(() => {
       ref.current = setInterval(() => {
            handleNext();
        }, 1000);

        return () => {
            clearInterval(ref.current);
        }
    }, []);
    console.log(`${currentIndex} ref`, ref.current)
    return (
        <div onMouseEnter={() => clearInterval(ref.current)} onMouseLeave={() => {ref.current = setInterval(handleNext, 1000)}} className='carousel-container'>
            <button onClick={handlePrev} className='button-left'>{'<'}</button>
            <img src={data[currentIndex].download_url} alt={data[currentIndex].author}/>
            <button onClick={handleNext} className='button-right'>{'>'}</button>
        </div>
    )
}

export default Carousel;