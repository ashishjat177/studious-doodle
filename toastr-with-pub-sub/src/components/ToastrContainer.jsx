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
        const unubscribe = pubSub.subscribe('toast', ({type, text, duration = 3000}) => {
            const id = new Date() + Math.random();
            const toast = {
                id,
                text,
                type
            }
            
            setToasts((prev) => {
                if(prev.length < config.maxLimit) {
                    setTimeout(() => removeToasts(id), duration);
                    const updated = [...prev, toast];
                    return updated;
                } else {
                    setQueue((prev) => ([...prev, toast]));
                    return prev;
                }
            })
        })
        
       return () => unubscribe();
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
