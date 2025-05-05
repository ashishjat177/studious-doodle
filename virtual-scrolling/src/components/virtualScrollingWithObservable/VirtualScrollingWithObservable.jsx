import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

const VirtualScrollWithObservable = ({count, setCount, totalCount = 500}) => {
    const loaderRef = useRef(null);

    const [isLoading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(totalCount > count);

    useEffect(() => {
         const observer = new IntersectionObserver((entries) => {
            const target = entries[0];
            if(target.isIntersecting && !isLoading && hasMore) {
                setLoading(true);
                setTimeout(() => {
                    setCount((prev) => {
                        const nextCount = prev + 50;
                        if(nextCount >= totalCount) {
                            setHasMore(false);
                            setLoading(false);
                            return totalCount
                        } else {
                            return nextCount;
                        }
                    })   
                }, 500);
            }
         }, {
            root: window.document.querySelector('.scroll-container'), // null if if you want to scroll it in respective to dom, or give querySelected for your container.
            rootMargin: '0px', // to check when you have to call the callback function (it will have that much of marging)
            threshold: 1,  // percentage of item height visible (100% of last element then only call)
         });

         observer.observe(loaderRef.current);

         return () => {
            if(loaderRef.current) { 
                observer.unobserve(loaderRef.current);
            }
        }

        
    }, [])
    
    const elements = [];

    for(let i = 0; i < count; i++) {
        elements.push(<div key={i}>{i}</div>);
    }

    return (
        <div className="scroll-container">
            {elements}
             {isLoading && <div>...loading</div>}
            <div style={{height: '40px'}} ref={loaderRef}></div>
        </div>
    )
}

export default VirtualScrollWithObservable;