import { useCallback, useEffect, useState } from 'react'
import Toastr from './Toastr'
import { pubSub } from '../pubsub';

const config = {
    position: "top-right",
    duration: 3000,
    maxToasts: 5,
    maxLimit: 3,
}

export function ToastrContainer({ children }) {
    const [toasts, setToasts] = useState([]);
    const [queue, setQueue] = useState([]);
    

    const removeToasts = useCallback((id) => {
        setToasts((prev) => {   
           const updatedToasts = prev.filter((item) => item.id !== id) 
               setQueue((q) => {
                    if(q.length && (updatedToasts.length < config.maxLimit) ) {
                        const [next, ...rest] = q;
                        updatedToasts.push(next);
                        setTimeout(() => removeToasts(next.id), next.duration || config.duration);
                        return rest;
                    }
                    return q;
               })

            return updatedToasts;
        })
    }, [])

    useEffect(() => {
        const unsubscribe = pubSub.subscribe('toast', ({type, text, duration = config.duration}) => {
            const id = Date.now() + Math.random().toString(36).substr(2, 9);
            const toast = {
                id,
                text,
                type,
                duration
            }
            
            setToasts((prev) => {
                if(prev.length < config.maxLimit) {
                    setTimeout(() => removeToasts(id), duration);
                    return [...prev, toast];
                }
                setQueue((prevQueue) => [...prevQueue, toast]);
                return prev;
            });
        });
        
       return () => unsubscribe();
    }, [removeToasts]);



  return (
    <div>
        {children}
        {toasts.length > 0 && (
            <div className={`toastr-container ${config.position}`}>
                { toasts.map((toast) => (
                    <Toastr key={toast.id} toast={toast} handleClose={removeToasts}/>
                ))}
            </div>
        )}
    </div>
  )
}

export default ToastrContainer;
export default ToastrContainer;
