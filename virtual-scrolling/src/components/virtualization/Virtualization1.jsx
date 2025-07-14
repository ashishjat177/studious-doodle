import { useEffect, useState } from "react";

const Virtualization1 = ({list, height, itemHeight, width}) => {
    const [indices, setIndices] = useState([0, height/itemHeight]);
    const visibleContentList = list.slice(indices[0], indices[1]);


    const handleScroll = (e) => {
        const { scrollTop } = e.target;
        console.log(scrollTop)
        setIndices([Math.floor(scrollTop/itemHeight), height/itemHeight + scrollTop/itemHeight ]);
    }

    return (
        <div style={{width: width, height: height, overflow: 'auto', background: 'grey', position: 'relative'}} onScroll={handleScroll}>
            <div style={{ height: list.length*itemHeight }}>
                <div style={{transform: `translateY(${indices[0]*itemHeight}px)`}}>
                    {visibleContentList.map((item, index) => (
                        <div key={`${item}-${index}`} style={{ borderTop: '3px solid black', height: itemHeight, width: width, display: 'block' }}>
                            item {item}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Virtualization1;