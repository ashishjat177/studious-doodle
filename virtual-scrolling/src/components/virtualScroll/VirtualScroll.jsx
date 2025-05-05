import { useEffect } from "react";

const VirtualScroll = ({count, setCount}) => {
    useEffect(() => {
    let timer;
        const onscroll = () => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                if(window.innerHeight + window.scrollY >= window.document.body.offsetHeight - 30) {
                    setCount((prev) => prev + 50);
                }
            }, 300)
         }

        window.addEventListener('scroll', onscroll);

        return () => window.removeEventListener('scroll', onscroll);
    }, [])
    
    const elements = [];

    for(let i = 0; i < count; i++) {
        elements.push(<div key={i}>{i}</div>);
    }

    return (
        <div>
            {elements}
        </div>
    )
}

export default VirtualScroll;