import { useState } from "react";

const Virtualization = ({list, itemHeight, height, width}) => {
    const [indices, setIndices] = useState([0, Math.floor(height/itemHeight)]);
    const data = list.slice(indices[0], indices[1]);

    const onScroll = (e) => {
        const {scrollTop} = e.target;
        const startIndices = Math.floor(scrollTop/itemHeight);
        const endIndices = startIndices + Math.floor(height/itemHeight);
        setIndices([startIndices, endIndices]);
    }

    return (
        <div onScroll={onScroll} style={{height, width, background: 'gray', overflow: "auto", position: 'relative'}} className="virtualization-container">
            <div 
                style={{
                    height: list.length*itemHeight,
                    position: 'absolute',
                    top: indices[0]*itemHeight,
                    width: '100%',
                }}
                >
                {data.map((item, index) => (
                    <div key={indices[0] + index} style={{height: itemHeight, border: '1px solid'}}> 
                        {item}
                    </div>
                ))}
            </div>
        </div>
    )

}

export default Virtualization;