import { useEffect } from "react"

export default function useClickOutsideClose(elementRef, handler) {

    function cb(e) {
        if(!elementRef.current?.contains(e.target)) {
            handler()
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', cb)

        return () => { 
            document.removeEventListener('mousedown', cb) 
        }
    }, []);
}