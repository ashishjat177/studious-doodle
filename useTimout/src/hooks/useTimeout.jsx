import { useEffect } from "react";
import { useRef } from "react";

export default function useTimeout (cb, delay) {
    const ref = useRef(cb) 

    ref.current = cb;
  
    useEffect(() => {
       const timerId = setTimeout(() => ref.current(), delay); 

       return () => { clearTimeout(timerId) };
    }, [delay])
}